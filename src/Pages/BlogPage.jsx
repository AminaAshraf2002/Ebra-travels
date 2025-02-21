import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { blogService } from '../services/blogService';
import { FaSpinner } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllBlogs({
        page: 1,
        limit: 10,
        status: 'Published'
      });
      
      console.log('Fetched blogs:', response);
      if (response && response.blogs) {
        setBlogs(response.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  // Format image URL
  const formatImageUrl = (image) => {
    if (!image) return '/placeholder.jpg';
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    return `https://ebra-travels-server.onrender.com/uploads/blogs/${image.replace(/^\/uploads\/blogs\//, '')}`;
  };

  return (
    <div>
      <header className="blog-page-header" data-aos="fade-down">
        <img
          src="https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_1280.jpg"
          alt="Hero"
          className="blog-page-hero-image"
        />
        <div className="blog-page-header-content">
          <h1 data-aos="fade-down">Blogs</h1>
          <p data-aos="fade-up">
            Explore our travel blog for expert tips, destination guides, and inspiring stories to help you plan your next unforgettable journey.
          </p>
        </div>
      </header>

      <section className="blog-page-section">
        {loading ? (
          <div className="loading-spinner">
            <FaSpinner className="spinner" />
            <p>Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="blog-page-grid">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="blog-page-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="blog-image">
                    <img
                      src={formatImageUrl(blog.image)}
                      alt={blog.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="blog-page-content">
                    <span className="blog-page-date">
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                    <span className="blog-category">{blog.category}</span>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="no-blogs">No blogs available at the moment.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
