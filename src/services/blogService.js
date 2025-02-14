import api from './api';
import { toast } from 'react-toastify';

export const blogService = {
    // Get all blogs (admin view)
    getAllBlogsAdmin: async (params = {}) => {
        try {
            const response = await api.get('/blogs/admin/all', {
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
        // Validate input
        if (!blogData) {
            toast.error('Blog data is required');
            throw new Error('Blog data is required');
        }

        try {
            // Ensure blogData is a FormData object
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            // Predefined required fields with default values
            const requiredFields = [
                { key: 'title', defaultValue: 'Untitled Blog' },
                { key: 'category', defaultValue: 'Uncategorized' },
                { key: 'description', defaultValue: 'No description provided' },
                { key: 'date', defaultValue: () => new Date().toISOString() },
                { key: 'status', defaultValue: 'Draft' }
            ];

            // Add fields to FormData if not already present
            requiredFields.forEach(field => {
                if (!formData.get(field.key)) {
                    const value = typeof field.defaultValue === 'function' 
                        ? field.defaultValue() 
                        : field.defaultValue;
                    formData.append(field.key, value);
                }
            });

            // If not a FormData, manually add fields from object
            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.post('/blogs', formData, {
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
        // Validate input
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }
        if (!blogData) {
            toast.error('Blog data is required');
            throw new Error('Blog data is required');
        }

        try {
            // Ensure blogData is a FormData object
            const formData = blogData instanceof FormData 
                ? blogData 
                : new FormData();

            // Predefined required fields with default values
            const requiredFields = [
                { key: 'title', defaultValue: 'Untitled Blog' },
                { key: 'category', defaultValue: 'Uncategorized' },
                { key: 'description', defaultValue: 'No description provided' },
                { key: 'date', defaultValue: () => new Date().toISOString() },
                { key: 'status', defaultValue: 'Draft' }
            ];

            // Add fields to FormData if not already present
            requiredFields.forEach(field => {
                if (!formData.get(field.key)) {
                    const value = typeof field.defaultValue === 'function' 
                        ? field.defaultValue() 
                        : field.defaultValue;
                    formData.append(field.key, value);
                }
            });

            // If not a FormData, manually add fields from object
            if (!(blogData instanceof FormData)) {
                Object.keys(blogData).forEach(key => {
                    if (blogData[key] !== null && blogData[key] !== undefined) {
                        formData.append(key, blogData[key]);
                    }
                });
            }

            const response = await api.put(`/blogs/${id}`, formData, {
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
        // Validate input
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.get(`/blogs/admin/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog details';
            toast.error(errorMessage);
            console.error('Fetch blog by ID error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Get single published blog (public view)
    getBlogById: async (id) => {
        // Validate input
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.get(`/blogs/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog details';
            toast.error(errorMessage);
            console.error('Fetch public blog by ID error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Delete a blog
    deleteBlog: async (blogData) => {
        // Extensive logging for debugging
        console.log('Delete Blog Input:', blogData);

        // Comprehensive ID extraction
        const extractId = (data) => {
            if (!data) return null;

            // Direct string ID
            if (typeof data === 'string') return data;

            // Object with multiple possible ID fields
            if (typeof data === 'object') {
                const possibleIds = [
                    data._id, 
                    data.id, 
                    data.blogId, 
                    data?._doc?._id,
                    data?.toObject?.()._id
                ];

                // Find first valid ID
                const validId = possibleIds.find(
                    id => id && String(id).trim() !== ''
                );

                return validId ? String(validId).trim() : null;
            }

            return null;
        };

        // Extract and validate ID
        const id = extractId(blogData);

        if (!id) {
            toast.error('Failed to extract blog ID');
            console.error('Failed to extract blog ID. Input data:', blogData);
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.delete(`/blogs/${id}`);
            toast.success('Blog deleted successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete blog';
            toast.error(errorMessage);
            console.error('Delete blog error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Get blog statistics
    getBlogStats: async () => {
        try {
            const response = await api.get('/blogs/stats');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog stats';
            toast.error(errorMessage);
            console.error('Fetch blog stats error:', error.response?.data || error.message);
            throw error;
        }
    }
};