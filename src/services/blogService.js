import api from './api';
import { toast } from 'react-toastify';

export const blogService = {
    // Get all blogs (admin view)
    getAllBlogsAdmin: async (params = {}) => {
        try {
            const response = await api.get('/blogs/admin/blogs', { // Updated path
                params: {
                    page: 1,
                    limit: 10,
                    ...params
                }
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blogs';
            toast.error(errorMessage);
            console.error('Fetch blogs error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Get published blogs (public view)
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
            const errorMessage = error.response?.data?.message || 'Failed to fetch public blogs';
            toast.error(errorMessage);
            console.error('Fetch public blogs error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Create a new blog
    createBlog: async (blogData) => {
        if (!blogData) {
            toast.error('Blog data is required');
            throw new Error('Blog data is required');
        }

        try {
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            // Add default fields if not present
            const requiredFields = [
                { key: 'title', defaultValue: 'Untitled Blog' },
                { key: 'category', defaultValue: 'Uncategorized' },
                { key: 'description', defaultValue: 'No description provided' },
                { key: 'date', defaultValue: () => new Date().toISOString() },
                { key: 'status', defaultValue: 'Draft' }
            ];

            requiredFields.forEach(field => {
                if (!formData.get(field.key)) {
                    const value = typeof field.defaultValue === 'function' 
                        ? field.defaultValue() 
                        : field.defaultValue;
                    formData.append(field.key, value);
                }
            });

            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.post('/blogs/admin/blogs', formData, { // Updated path
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog created successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create blog';
            toast.error(errorMessage);
            console.error('Blog creation error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Update an existing blog
    updateBlog: async (id, blogData) => {
        if (!id || !blogData) {
            toast.error('Blog ID and data are required');
            throw new Error('Blog ID and data are required');
        }

        try {
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            // Handle non-FormData input
            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.put(`/blogs/admin/blogs/${id}`, formData, { // Updated path
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog updated successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update blog';
            toast.error(errorMessage);
            console.error('Blog update error:', error.response?.data || error.message);
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
            const response = await api.get(`/blogs/admin/blogs/${id}`); // Updated path
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog details';
            toast.error(errorMessage);
            console.error('Fetch blog by ID error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Delete a blog
    deleteBlog: async (blogData) => {
        const extractId = (data) => {
            if (!data) return null;
            if (typeof data === 'string') return data;
            if (typeof data === 'object') {
                return data._id || data.id || data.blogId || null;
            }
            return null;
        };

        const id = extractId(blogData);
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.delete(`/blogs/admin/blogs/${id}`); // Updated path
            toast.success('Blog deleted successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete blog';
            toast.error(errorMessage);
            console.error('Delete blog error:', error.response?.data || error.message);
            throw error;
        }
    }
};
