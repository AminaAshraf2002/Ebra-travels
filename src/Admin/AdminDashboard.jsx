import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBlog, FaEnvelope, FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes, FaPlus } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const stats = [
    { title: 'Total Blogs', count: 6, icon: <FaBlog />, color: 'blue' },
    { title: 'New Enquiries', count: 8, icon: <FaEnvelope />, color: 'green' },
  ];

  const recentBlogs = [
    { title: 'Top 10 Places in Kerala', date: '2 hours ago', status: 'Published' },
    { title: 'Best Time to Visit Goa', date: '5 hours ago', status: 'Draft' },
    { title: 'Manali Travel Guide', date: '1 day ago', status: 'Published' },
  ];

  const recentEnquiries = [
    { name: 'John Doe', package: 'Kerala Package', date: '30 min ago' },
    { name: 'Jane Smith', package: 'Goa Beach Holiday', date: '2 hours ago' },
    { name: 'Mike Johnson', package: 'Kashmir Tour', date: '3 hours ago' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Ebra Holidays</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="/admin/dashboard" className="nav-link active">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="/admin/blog" className="nav-link">
            <FaBlog /> Blogs
          </a>
          <a href="/admin/enquiries" className="nav-link">
            <FaEnvelope /> Enquiries
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="user-info">
            <span>Welcome, Boni Chacko</span>
          </div>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.count}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button onClick={() => navigate('/admin/blog')} className="action-btn">
              <FaPlus /> Add New Blog
            </button>
          </div>

          {/* Recent Activity Section */}
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


