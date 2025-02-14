import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from '../services/api';
import { 
  FaLock, 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash, 
  FaSignInAlt 
} from 'react-icons/fa';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await authService.login(formData.email, formData.password);
      
      if (userData.token) {
        toast.success('Login Successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 3000);
      } 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                           err.message || 
                           'Login failed. Please try again.';
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <ToastContainer />
      <div className="admin-box-container">
        <div className="admin-header-section">
          <div className="admin-logo-circle">
            <FaLock className="admin-lock-icon" />
          </div>
          <h1 className="admin-title">Ebra Holidays</h1>
          <h2 className="admin-subtitle">Admin Login</h2>
          <p className="admin-description">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-container">
          <div className="admin-input-group">
            <label htmlFor="email" className="admin-label">
              Email Address
            </label>
            <div className="admin-input-field">
              <FaEnvelope className="admin-field-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="password" className="admin-label">
              Password
            </label>
            <div className="admin-input-field">
              <FaLock className="admin-field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="admin-input"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-eye-button"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="admin-spinner">Loading...</div>
            ) : (
              <>
                <FaSignInAlt className="admin-submit-icon" />
                <span>Sign In</span>
              </>
            )}
          </button>

          <p className="admin-footer-text">
            Protected access for Ebra Holidays administrators only
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;