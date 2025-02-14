import axios from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'https://ebra-travels-server.onrender.com', 
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  // Login API
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Change Password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change Password Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default api;
