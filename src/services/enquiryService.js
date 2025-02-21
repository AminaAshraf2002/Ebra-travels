import api from './api';

export const enquiryService = {
  // Create a new enquiry
  createEnquiry: async (enquiryData) => {
    try {
      const response = await api.post('/', {
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        place: enquiryData.placeToVisit || enquiryData.place
      });
      return response.data;
    } catch (error) {
      console.error('Enquiry submission error:', error);
      throw error;
    }
  },

  // Get all enquiries (for admin)
  getAllEnquiries: async (params) => {
    try {
      const response = await api.get('/enquiries/admin/enquiries', { params });
      return response.data;
    } catch (error) {
      console.error('Fetch enquiries error:', error);
      throw error;
    }
  },

  // Update enquiry status
  updateEnquiryStatus: async (id, status) => {
    try {
      const response = await api.put(`/enquiries/admin/enquiries/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update enquiry status error:', error);
      throw error;
    }
  },

  // Delete an enquiry
  deleteEnquiry: async (id) => {
    try {
      const response = await api.delete(`/enquiries/admin/enquiries/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete enquiry error:', error);
      throw error;
    }
  },

  // Get enquiry statistics
  getEnquiryStats: async () => {
    try {
      const response = await api.get('/enquiries/admin/enquiries/stats');
      return response.data;
    } catch (error) {
      console.error('Fetch enquiry stats error:', error);
      throw error;
    }
  }
};
