import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Packages from './Pages/Packages';
import Blog from './Pages/BlogPage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Footer from './components/Footer';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import AdminBlogs from './Admin/AdminBlogs';
import AdminEnquiries from './Admin/AdminEnquiries';

// Layout component to handle conditional rendering
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
        {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<AdminBlogs />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
