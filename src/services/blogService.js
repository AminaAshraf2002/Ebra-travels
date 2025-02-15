import api from './api';
import { toast } from 'react-toastify';

export const blogService = {
    // Get all blogs (admin view)
    getAllBlogsAdmin: async (params = {}) => {
        try {
            const response = await api.get('/blogs/admin/blogs', { // Matches router.get('/admin/blogs')
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
            const response = await api.get('/blogs', { // Matches router.get('/')
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
            const response = await api.get(`/blogs/${id}`); // Matches router.get('/:id')
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
            const response = await api.get(`/blogs/admin/blogs/${id}`); // Matches router.get('/admin/blogs/:id')
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch blog details';
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

            const response = await api.post('/blogs/admin/blogs', formData, { // Matches router.post('/admin/blogs')
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

            const response = await api.put(`/blogs/admin/blogs/${id}`, formData, { // Matches router.put('/admin/blogs/:id')
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
            const response = await api.delete(`/blogs/admin/blogs/${id}`); // Matches router.delete('/admin/blogs/:id')
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
