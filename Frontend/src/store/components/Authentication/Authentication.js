import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Authentication = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Check for lockout on component mount
  useEffect(() => {
    const lockoutUntil = localStorage.getItem("authLockout");
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      if (Date.now() < lockoutTime) {
        setIsLocked(true);
        setLockoutTime(lockoutTime);
      } else {
        localStorage.removeItem("authLockout");
        setAttemptCount(0);
      }
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutTime(0);
          setAttemptCount(0);
          localStorage.removeItem("authLockout");
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutTime]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid:
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar,
      errors: {
        length:
          password.length < minLength
            ? `At least ${minLength} characters`
            : null,
        uppercase: !hasUpperCase ? "At least one uppercase letter" : null,
        lowercase: !hasLowerCase ? "At least one lowercase letter" : null,
        number: !hasNumbers ? "At least one number" : null,
        special: !hasSpecialChar ? "At least one special character" : null,
      },
    };
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = "Password does not meet requirements";
        newErrors.passwordDetails = passwordValidation.errors;
      }
    }

    // Confirm password validation for signup
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      toast.warning(
        `Account temporarily locked. Please try again in ${remaining} seconds.`,
        {
          toastId: "auth-locked",
          position: "top-right",
          autoClose: 5000,
        }
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let result;

      if (isLogin) {
        // Login with backend
        result = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register with backend
        result = await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
      }

      if (result.success) {
        // Reset attempt count on successful authentication
        setAttemptCount(0);
        localStorage.removeItem("authLockout");

        // Show success message
        toast.success(
          isLogin ? "Logged in successfully!" : "Account created successfully!",
          {
            toastId: "auth-success",
            position: "top-right",
            autoClose: 3000,
          }
        );

        // Navigate based on role
        if (result.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/shop");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      // Handle brute force protection
      const currentAttempts = attemptCount + 1;
      setAttemptCount(currentAttempts);

      if (currentAttempts >= 5) {
        const lockoutDuration = 5 * 60 * 1000; // 5 minutes
        const lockoutUntil = Date.now() + lockoutDuration;
        localStorage.setItem("authLockout", lockoutUntil.toString());
        setIsLocked(true);
        setLockoutTime(lockoutUntil);
        setErrors({
          general: "Too many failed attempts. Account locked for 5 minutes.",
        });
      } else {
        setErrors({ general: error.message });

        // Show remaining attempts warning
        const remainingAttempts = 5 - currentAttempts;
        if (remainingAttempts <= 2) {
          toast.warning(
            `${remainingAttempts} attempts remaining before lockout`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  const getLockoutTimeRemaining = () => {
    if (!isLocked) return 0;
    return Math.ceil((lockoutTime - Date.now()) / 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-[#072928] via-[#006663] to-[#072928] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-gradient-to-t from-[#193d3d] to-[#0f3c3f] text-white"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white/85">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-white/60">
            {isLogin ? "Sign in to your account" : "Join us today"}
          </p>
        </div>

        {isLocked && (
          <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <p className="text-center text-red-800">
              Account temporarily locked. Please try again in{" "}
              <span className="font-bold">{getLockoutTimeRemaining()}</span>{" "}
              seconds.
            </p>
          </div>
        )}

        {errors.general && (
          <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <p className="text-center text-red-800">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLocked || isLoading}
              className={` text-white w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              } ${
                isLocked || isLoading
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-transparent"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLocked || isLoading}
                className={`text-white w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } ${
                  isLocked || isLoading
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                disabled={isLocked || isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            {errors.passwordDetails && !isLogin && (
              <div className="p-3 mt-2 border border-yellow-200 rounded-lg bg-yellow-50">
                <p className="mb-2 text-sm font-medium text-yellow-800">
                  Password requirements:
                </p>
                <ul className="space-y-1 text-sm text-yellow-700">
                  {Object.entries(errors.passwordDetails).map(
                    ([key, error]) =>
                      error && (
                        <li key={key} className="flex items-center">
                          <span className="mr-2">•</span>
                          {error}
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Field (Signup only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-white/90"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLocked || isLoading}
                  className={`text-white w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } ${
                    isLocked || isLoading
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-transparent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                  disabled={isLocked || isLoading}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLocked || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              isLocked || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#ffa600] hover:bg-[#ff8400] text-white"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isLogin ? "Signing In..." : "Creating Account..."}
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Toggle Form */}
        <div className="mt-6 text-center">
          <p className="text-sky-50">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleForm}
              disabled={isLocked || isLoading}
              className="ml-1 font-medium text-yellow-500 transition-colors hover:text-orange-500 disabled:opacity-50"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="p-4 mt-8 text-white bg-transparent border-yellow-300 rounded-lg shadow-lg border-1">
          <p className="mb-2 text-sm font-medium text-yellow-300">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-gray-300">
            <p>
              <strong>Admin:</strong> admin@example.com / Admin@123
            </p>
            <p>
              <strong>Note:</strong> You can also create a new account
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;
