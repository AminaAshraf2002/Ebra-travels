import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { enquiryService } from '../services/enquiryService';
import { 
  FaEnvelope, 
  FaSearch, 
  FaTrash, 
  FaCheck, 
  FaSpinner 
} from 'react-icons/fa';
import './AdminEnquiries.css';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus, searchTerm, pagination.currentPage]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await enquiryService.getAllEnquiries({
        page: pagination.currentPage,
        limit: 10,
        status: filterStatus === 'all' ? undefined : filterStatus,
        search: searchTerm
      });

      setEnquiries(response.enquiries);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages
      });
    } catch (error) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await enquiryService.updateEnquiryStatus(id, newStatus);
      
      setEnquiries(enquiries.map(enquiry => 
        enquiry._id === id ? { ...enquiry, status: newStatus } : enquiry
      ));
      
      toast.success('Enquiry status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await enquiryService.deleteEnquiry(id);
        
        setEnquiries(enquiries.filter(enquiry => enquiry._id !== id));
        toast.success('Enquiry deleted');
      } catch (error) {
        toast.error('Failed to delete enquiry');
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const { currentPage, totalPages } = pagination;

    // Show up to 5 page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // First page button
    if (startPage > 1) {
      pageNumbers.push(
        <button 
          key="first" 
          onClick={() => handlePageChange(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    // Last page button
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new': return 'status-new';
      case 'contacted': return 'status-contacted';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="admin-enquiries">
      {/* Header */}
      <div className="enquiries-header">
        <div className="header-title">
          <FaEnvelope className="header-icon" />
          <h1>Enquiries Management</h1>
        </div>
        <div className="enquiry-stats">
          <div className="stat-item">
            <span>Total: {enquiries.length}</span>
          </div>
          <div className="stat-item">
            <span>New: {enquiries.filter(e => e.status === 'new').length}</span>
          </div>
          <div className="stat-item">
            <span>Contacted: {enquiries.filter(e => e.status === 'contacted').length}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="enquiries-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'new' ? 'active' : ''}`}
            onClick={() => setFilterStatus('new')}
          >
            New
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'contacted' ? 'active' : ''}`}
            onClick={() => setFilterStatus('contacted')}
          >
            Contacted
          </button>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="enquiries-list">
        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="no-enquiries">
            <p>No enquiries found</p>
          </div>
        ) : (
          enquiries.map(enquiry => (
            <div key={enquiry._id} className="enquiry-card">
              <div className="enquiry-header">
                <h3>{enquiry.name}</h3>
                <span className={`status-badge ${getStatusBadgeClass(enquiry.status)}`}>
                  {enquiry.status}
                </span>
              </div>

              <div className="enquiry-content">
                <div className="enquiry-details">
                  <p><strong>Email:</strong> {enquiry.email}</p>
                  <p><strong>Phone:</strong> {enquiry.phone}</p>
                  <p><strong>Place:</strong> {enquiry.place}</p>
                  <p><strong>Date:</strong> {new Date(enquiry.date).toLocaleDateString()}</p>
                </div>

                <div className="enquiry-actions">
                  <button 
                    className="action-btn email-btn"
                    onClick={() => sendEmail(enquiry.email)}
                    title="Send Email"
                  >
                    <FaEnvelope />
                  </button>
                  {enquiry.status !== 'completed' && (
                    <button 
                      className="action-btn complete-btn"
                      onClick={() => handleStatusChange(enquiry._id, 'completed')}
                      title="Mark as Completed"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(enquiry._id)}
                    title="Delete Enquiry"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {enquiry.status === 'new' && (
                <div className="enquiry-footer">
                  <button 
                    className="contact-btn"
                    onClick={() => handleStatusChange(enquiry._id, 'contacted')}
                  >
                    Mark as Contacted
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="enquiries-pagination">
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="prev-btn"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {renderPageNumbers()}
          </div>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="next-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;