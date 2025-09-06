import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import { toast } from "react-toastify";
import api from "../../api/axios"; // Import your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Memoized secureStorage (keeping for fallback/offline use)
  const secureStorage = useMemo(() => ({
    setItem: (key, value) => {
      try {
        const encryptedValue = btoa(JSON.stringify(value));
        localStorage.setItem(key, encryptedValue);
      } catch (error) {
        console.error("Storage error:", error);
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (fallbackError) {
          console.error("Fallback storage error:", fallbackError);
        }
      }
    },
    getItem: (key) => {
      try {
        const value = localStorage.getItem(key);
        if (!value) return null;

        try {
          const decoded = atob(value);
          return JSON.parse(decoded);
        } catch (decodeErr) {
          console.warn("Base64 decode failed, trying fallback JSON parse");
          return JSON.parse(value);
        }
      } catch (error) {
        console.error("Storage error:", error);
        return null;
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Storage error:", error);
      }
    }
  }), []);

  // Set up axios interceptors
  useEffect(() => {
    // Request interceptor to add token to requests
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
          toast.error("Session expired. Please log in again.", {
            toastId: "session-expired",
            position: "top-right",
            autoClose: 5000
          });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const isSessionExpired = useCallback((userData) => {
    if (!userData || !userData.lastLogin) return true;

    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    const lastLogin = new Date(userData.lastLogin).getTime();
    const now = Date.now();

    return now - lastLogin > sessionDuration;
  }, []);

  // Updated login function to use backend
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Store token
        localStorage.setItem("token", token);
        
        // Create enhanced user data
        const enhancedUserData = {
          ...userData,
          token,
          lastLogin: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 15),
          loginIp: "127.0.0.1", // In production, get from backend
          userAgent: navigator.userAgent
        };

        // Store user data
        secureStorage.setItem("user", enhancedUserData);
        secureStorage.setItem("authToken", token);
        secureStorage.setItem("sessionExpiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

        setUser(enhancedUserData);
        console.log(`User ${userData.email} logged in successfully`);
        
        return { success: true, user: enhancedUserData };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Authentication failed";
      throw new Error(errorMessage);
    }
  };

  // Updated register function to use backend
  const register = async (credentials) => {
    try {
      const response = await api.post("/auth/register", credentials);
      
      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Store token
        localStorage.setItem("token", token);
        
        // Create enhanced user data
        const enhancedUserData = {
          ...userData,
          token,
          lastLogin: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 15),
          loginIp: "127.0.0.1",
          userAgent: navigator.userAgent
        };

        // Store user data
        secureStorage.setItem("user", enhancedUserData);
        secureStorage.setItem("authToken", token);
        secureStorage.setItem("sessionExpiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

        setUser(enhancedUserData);
        console.log(`User ${userData.email} registered successfully`);
        
        return { success: true, user: enhancedUserData };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const logout = useCallback(() => {
    try {
      // Remove token and user data
      localStorage.removeItem("token");
      secureStorage.removeItem("user");
      secureStorage.removeItem("authToken");
      secureStorage.removeItem("sessionExpiry");
      secureStorage.removeItem("authLockout");

      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  }, [secureStorage]);

  // Updated checkAuth function
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        logout();
        return false;
      }

      // Verify token with backend
      const response = await api.get("/auth/me");
      
      if (response.data.success) {
        const userData = response.data.user;
        
        // Create enhanced user data
        const enhancedUserData = {
          ...userData,
          token,
          lastLogin: secureStorage.getItem("user")?.lastLogin || new Date().toISOString(),
          sessionId: secureStorage.getItem("user")?.sessionId || Math.random().toString(36).substr(2, 15),
          loginIp: "127.0.0.1",
          userAgent: navigator.userAgent
        };

        setUser(enhancedUserData);
        return true;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      logout();
      return false;
    }
  }, [secureStorage, logout]);

  const setupInactivityLogout = useCallback(() => {
    let inactivityTimer;
    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (user) {
          toast.warning(
            "Session expired due to inactivity. Please log in again.",
            {
              toastId: "session-expired",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            }
          );
          logout();
        }
      }, inactivityTimeout);
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [user, logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Initial auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      const cleanup = setupInactivityLogout();
      return cleanup;
    }
  }, [user, setupInactivityLogout]);

  const refreshSession = async () => {
    if (user) {
      try {
        await checkAuth(); // Re-verify with backend
        const updatedUser = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        secureStorage.setItem("user", updatedUser);
        secureStorage.setItem(
          "sessionExpiry",
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        );
        setUser(updatedUser);
      } catch (error) {
        console.error("Session refresh error:", error);
        logout();
      }
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    const permissions = {
      admin: ["read", "write", "delete", "admin"],
      user: ["read", "write"]
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
    refreshSession,
    hasPermission,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};