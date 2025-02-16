import api from './api';
import { toast } from 'react-toastify';

export const blogService = {
    // Get all blogs (public view)
    getAllBlogs: async (params = {}) => {
        try {
            console.log('Fetching Public Blogs with params:', params);
            
            const response = await api.get('/blogs', { 
                params: {
                    page: 1,
                    limit: 10,
                    ...params
                }
            });
            
            console.log('Public Blogs Fetch Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Detailed Public Blogs Fetch Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message || 'Failed to fetch public blogs';
            toast.error(errorMessage);
            throw error;
        }
    },

    // Get all blogs (admin view)
    getAllBlogsAdmin: async (params = {}) => {
        try {
            console.log('Fetching Admin Blogs with params:', params);
            
            const response = await api.get('/blogs/admin', { 
                params: {
                    page: 1,
                    limit: 10,
                    ...params
                }
            });
            
            console.log('Admin Blogs Fetch Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Detailed Admin Blogs Fetch Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message || 'Failed to fetch admin blogs';
            toast.error(errorMessage);
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
            const response = await api.get(`/blogs/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog details';
            toast.error(errorMessage);
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
            const response = await api.get(`/blogs/admin/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch admin blog details';
            toast.error(errorMessage);
            throw error;
        }
    },

    // Create blog
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

            const response = await api.post('/blogs/admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog created successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create blog';
            toast.error(errorMessage);
            throw error;
        }
    },

    // Update blog
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

            const response = await api.put(`/blogs/admin/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('Blog updated successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update blog';
            toast.error(errorMessage);
            throw error;
        }
    },

    // Delete blog
    deleteBlog: async (id) => {
        if (!id) {
            toast.error('Blog ID is required');
            throw new Error('Blog ID is required');
        }

        try {
            const response = await api.delete(`/blogs/admin/${id}`);
            toast.success('Blog deleted successfully');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete blog';
            toast.error(errorMessage);
            throw error;
        }
    }
};

export default blogService;
