import api from './api';
import { toast } from 'react-toastify';

export const blogService = {
    // Get all blogs (public view)
    getAllBlogs: async (params = {}) => {
        try {
            const response = await api.get('/blogs', { 
                params: {
                    page: 1,
                    limit: 10,
                    ...params
                }
            });
            return response.data;
        } catch (error) {
            console.error('Public Blogs Fetch Error:', error);
            toast.error('Failed to fetch blogs');
            throw error;
        }
    },

    // Get all blogs (admin view)
    getAllBlogsAdmin: async (params = {}) => {
        try {
            const response = await api.get('/blog/admin', { 
                params: {
                    page: 1,
                    limit: 10,
                    ...params
                }
            });
            return response.data;
        } catch (error) {
            console.error('Admin Blogs Fetch Error:', error);
            toast.error('Failed to fetch admin blogs');
            throw error;
        }
    },

    // Get single blog by ID (public view)
    getBlogById: async (id) => {
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Blog Details Fetch Error:', error);
            toast.error('Failed to fetch blog details');
            throw error;
        }
    },

    // Get single blog by ID (admin view)
    getBlogByIdAdmin: async (id) => {
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.get(`/blog/admin/${id}`);
            return response.data;
        } catch (error) {
            console.error('Admin Blog Details Fetch Error:', error);
            toast.error('Failed to fetch admin blog details');
            throw error;
        }
    },

    // Create blog (admin)
    createBlog: async (blogData) => {
        try {
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.post('/blog/admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog created successfully');
            return response.data;
        } catch (error) {
            console.error('Blog Creation Error:', error);
            toast.error('Failed to create blog');
            throw error;
        }
    },

    // Update blog (admin)
    updateBlog: async (id, blogData) => {
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.put(`/blog/admin/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog updated successfully');
            return response.data;
        } catch (error) {
            console.error('Blog Update Error:', error);
            toast.error('Failed to update blog');
            throw error;
        }
    },

    // Delete blog (admin)
    deleteBlog: async (id) => {
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.delete(`/blog/admin/${id}`);
            toast.success('Blog deleted successfully');
            return response.data;
        } catch (error) {
            console.error('Blog Delete Error:', error);
            toast.error('Failed to delete blog');
            throw error;
        }
    }
};

export default blogService;
