import axios from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'https://ebra-travels-server.onrender.com/api', // Added /api prefix
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error scenarios
    if (error.response && error.response.status === 401) {
      // Logout user if token is invalid
      authService.logout();
      window.location.href = '/admin'; // Updated to match your admin login route
    }
    toast.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  // Login API
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/admin/login', { email, password }); // Updated path
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login successful!');
      }
      
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  },

  // Change Password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/admin/change-password', { // Updated path
        currentPassword,
        newPassword
      });
      toast.success('Password changed successfully');
      return response.data;
    } catch (error) {
      console.error('Change Password Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to change password');
      throw error;
    }
  },

  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Helper method to get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default api;


