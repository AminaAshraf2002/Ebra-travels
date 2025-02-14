import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { blogService } from '../services/blogService';
import { FaTimes, FaImage, FaSave } from 'react-icons/fa';
import './BlogForm.css';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Draft',
    image: null
  });

  // Categories for dropdown
  const categories = [
    'Travel Guide',
    'Travel Tips', 
    'Destination Highlights', 
    'Adventure', 
    'Cultural Experiences',
    'Food & Cuisine',
    'Accommodation',
    'Local Experiences'
  ];

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogByIdAdmin(id);
      
      setFormData({
        title: blog.title,
        category: blog.category,
        date: new Date(blog.date).toISOString().split('T')[0],
        description: blog.description,
        status: blog.status,
        image: blog.image
      });
      
      // Improved image preview logic
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      setImagePreview(
        blog.image 
          ? (blog.image.startsWith('http') 
              ? blog.image 
              : `${baseUrl}/uploads/blogs/${blog.image.replace(/^\/uploads\/blogs\//, '')}`)
          : null
      );
    } catch (error) {
      console.error('Failed to fetch blog details:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch blog details');
      navigate('/admin/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size and type
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
        return;
      }

      if (file.size > maxSize) {
        toast.error('File size exceeds 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (!formData.title.trim()) {
      toast.error('Title is required');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      setLoading(false);
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      if (id) {
        await blogService.updateBlog(id, submitData);
        toast.success('Blog updated successfully');
      } else {
        await blogService.createBlog(submitData);
        toast.success('Blog created successfully');
      }
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Failed to save blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-overlay">
      <div className="blog-form-container">
        <div className="blog-form-header">
          <h2>{id ? 'Edit Blog' : 'Add New Blog'}</h2>
          <button 
            className="close-btn" 
            onClick={() => navigate('/admin/blogs')}
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="blog-form">
          {/* Image Upload */}
          <div className="form-group">
            <label>Blog Image</label>
            <div 
              className="image-upload"
              onClick={() => document.getElementById('imageInput').click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <FaImage />
                  <span>Click to upload image</span>
                </div>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                disabled={loading}
              />
            </div>
          </div>

          {/* Rest of the form remains the same */}
          {/* Title, Category, Date, Description, Status inputs */}
          
          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/admin/blogs')}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={loading}
            >
              <FaSave />
              {loading ? 'Saving...' : (id ? 'Update Blog' : 'Save Blog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;