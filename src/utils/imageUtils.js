const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const formatImageUrl = (image, placeholder = '/placeholder.jpg') => {
    if (!image) return placeholder;
    
    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }
    
    const cleanImage = image
        .replace(/^\/+/g, '')
        .replace(/^uploads\/blogs\//, '');
    
    return `${API_BASE_URL}/uploads/blogs/${cleanImage}`;
};