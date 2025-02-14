import React, { useState, useEffect } from 'react';
import {
    FaBlog,
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch,
    FaTimes,
    FaImage,
    FaSave,
    FaSpinner
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { blogService } from '../services/blogService';
import './AdminBlogs.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ebra-travels.onrender.com';

const AdminBlogs = () => {
    // Categories for dropdown
    const categories = [
        'Travel Guide',
        'Travel Tips', 
        'Destination Highlights', 
        'Adventure', 
        'Cultural Experiences',
        'Food & Cuisine',
        'Accommodation',
        'Local Experiences',
        'Leisure',
        'Budget Travel'
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 0
    });

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        status: 'Draft',
        image: null
    });

    // Fetch Blogs
    const fetchBlogs = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const response = await blogService.getAllBlogsAdmin({
                page,
                limit: 10,
                search
            });

            setBlogs(response.blogs);
            setPagination({
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                totalBlogs: response.total
            });
        } catch (error) {
            toast.error('Failed to fetch blogs');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Initial Data Fetch
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Delete Blog Handler
    const handleDelete = async (blog) => {
        if (!blog) {
            toast.error('Invalid blog selected');
            return;
        }

        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await blogService.deleteBlog(blog);
                toast.success('Blog deleted successfully');
                fetchBlogs(pagination.currentPage);
            } catch (error) {
                console.error('Delete error:', error);
                toast.error(error.message || 'Failed to delete blog');
            }
        }
    };

    // Edit Blog Handler
    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            date: new Date(blog.date).toISOString().split('T')[0],
            description: blog.description || '',
            status: blog.status,
            image: blog.image
        });
        setImagePreview(
            blog.image
                ? (blog.image.startsWith('http')
                    ? blog.image
                    : `${API_BASE_URL}/uploads/blogs/${blog.image}`)
                : null
        );
        setShowForm(true);
    };

    // Add New Blog Handler
    const handleAddNew = () => {
        setEditingBlog(null);
        setFormData({
            title: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
            status: 'Draft',
            image: null
        });
        setImagePreview(null);
        setShowForm(true);
    };

    // Close Form Handler
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingBlog(null);
        setImagePreview(null);
    };

    // Image Change Handler
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
                setFormData(prev => ({ ...prev, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Form Submit Handler
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

        try {
            const submitData = new FormData();
            
            // Ensure all fields are added with default values
            submitData.append('title', formData.title.trim() || 'Untitled Blog');
            submitData.append('category', formData.category || 'Uncategorized');
            submitData.append('description', formData.description.trim() || 'No description');
            submitData.append('date', formData.date || new Date().toISOString());
            submitData.append('status', formData.status || 'Draft');
            
            // Add image if exists
            if (formData.image) {
                submitData.append('image', formData.image);
            }

            if (editingBlog) {
                await blogService.updateBlog(editingBlog._id, submitData);
                toast.success('Blog updated successfully');
            } else {
                await blogService.createBlog(submitData);
                toast.success('Blog created successfully');
            }

            fetchBlogs(pagination.currentPage);
            handleCloseForm();
        } catch (error) {
            console.error('Blog submission error:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    // Filtered Blogs
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Image URL Formatter
    const formatImageUrl = (image) => {
        if (!image) return '/placeholder.jpg';
        
        if (image.startsWith('http://') || image.startsWith('https://')) {
            return image;
        }
        
        return `${API_BASE_URL}/uploads/blogs/${image.replace(/^\/uploads\/blogs\//, '')}`;
    };

    // Pagination Handler
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchBlogs(newPage, searchTerm);
        }
    };

    return (
        <div className="admin-blogs">
            <ToastContainer />

            {/* Header Section */}
            <div className="blogs-header">
                <div className="blogs-title">
                    <FaBlog className="blogs-icon" />
                    <h1>Blog Management</h1>
                </div>
                <button 
                    className="add-blog-btn" 
                    onClick={handleAddNew}
                    disabled={loading}
                >
                    <FaPlus /> Add New Blog
                </button>
            </div>

            {/* Search and Stats Section */}
            <div className="blogs-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            fetchBlogs(1, e.target.value);
                        }}
                        disabled={loading}
                    />
                </div>
                <div className="blogs-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total Blogs:</span>
                        <span className="stat-value">{pagination.totalBlogs}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Published:</span>
                        <span className="stat-value">
                            {blogs.filter(blog => blog.status === 'Published').length}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Drafts:</span>
                        <span className="stat-value">
                            {blogs.filter(blog => blog.status === 'Draft').length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Blog List */}
            <div className="blogs-list">
                {loading ? (
                    <div className="loading-spinner">
                        <FaSpinner className="spinner" />
                        <p>Loading blogs...</p>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="no-blogs">
                        <p>No blogs found</p>
                    </div>
                ) : (
                    filteredBlogs.map(blog => (
                        <div key={blog._id} className="blog-card">
                            <div className="admin-blog-image">
                                <img 
                                    src={formatImageUrl(blog.image)} 
                                    alt={blog.title} 
                                />
                            </div>
                            <div className="blog-details">
                                <h3>{blog.title}</h3>
                                <p className="blog-category">{blog.category}</p>
                                <div className="blog-meta">
                                    <span className="blog-date">
                                        {new Date(blog.date).toLocaleDateString()}
                                    </span>
                                    <span className={`blog-status ${blog.status.toLowerCase()}`}>
                                        {blog.status}
                                    </span>
                                </div>
                            </div>
                            <div className="blog-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(blog)}
                                    title="Edit blog"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(blog)}
                                    title="Delete blog"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Blog Form Modal */}
            {showForm && (
                <div className="blog-form-overlay">
                    <div className="blog-form-container">
                        <div className="blog-form-header">
                            <h2>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
                            <button className="close-btn" onClick={handleCloseForm}>
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
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter blog title"
                                />
                            </div>

                            {/* Category */}
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows="4"
                                    placeholder="Enter blog description"
                                ></textarea>
                            </div>

                            {/* Status */}
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </select>
                            </div>

                            {/* Form Actions */}
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={handleCloseForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn">
                                    <FaSave />
                                    {editingBlog ? 'Update Blog' : 'Save Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Pagination */}
            

            <div className="blogs-pagination">
                <button className="page-btn" disabled>Previous</button>
                <span className="page-number">Page 1 of 1</span>
                <button className="page-btn" disabled>Next</button>
            </div>
        </div>
    );
};

export default AdminBlogs;
