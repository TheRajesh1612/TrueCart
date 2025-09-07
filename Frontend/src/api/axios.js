import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://truecart.onrender.com/api",
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                data: config.data,
                headers: config.headers
            });
        }
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle common responses
api.interceptors.response.use(
    (response) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                status: response.status,
                data: response.data
            });
        }
        
        return response;
    },
    (error) => {
        // Log errors in development
        if (process.env.NODE_ENV === 'development') {
            console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
                data: error.response?.data
            });
        }
        
        // Handle specific error cases
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { status, data } = error.response;
            
            switch (status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    console.log('Unauthorized access - redirecting to login');
                    localStorage.removeItem('token');
                    // Don't redirect here, let the AuthContext handle it
                    break;
                    
                case 403:
                    // Forbidden - user doesn't have permission
                    console.log('Access forbidden');
                    break;
                    
                case 404:
                    // Not found
                    console.log('Resource not found');
                    break;
                    
                case 422:
                    // Validation error
                    console.log('Validation error:', data);
                    break;
                    
                case 500:
                    // Server error
                    console.log('Server error');
                    break;
                    
                default:
                    console.log(`HTTP ${status} error:`, data?.message || 'Unknown error');
            }
            
            // Return a consistent error format
            return Promise.reject({
                status,
                message: data?.message || `HTTP ${status} Error`,
                data: data,
                response: error.response
            });
            
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error - no response received:', error.request);
            return Promise.reject({
                message: 'Network error - please check your connection',
                type: 'network_error'
            });
            
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
            return Promise.reject({
                message: error.message || 'Request failed',
                type: 'setup_error'
            });
        }
    }
);

// Helper functions for common API calls
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout') // In case you add logout endpoint later
};

// Generic API helpers
export const apiHelpers = {
    get: (url, config) => api.get(url, config),
    post: (url, data, config) => api.post(url, data, config),
    put: (url, data, config) => api.put(url, data, config),
    patch: (url, data, config) => api.patch(url, data, config),
    delete: (url, config) => api.delete(url, config)
};

export default api;