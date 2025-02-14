import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Header.css';
import logo from '../assets/ebraholidays.png';
import Popup from './Popup';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate(); // Add this for navigation

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        AOS.init({ duration: 1000 });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleEnquiryClick = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    // Add this function to handle login button click
    const handleLoginClick = () => {
        navigate('/admin'); // Navigate to admin login page
        closeMenu(); // Close the menu if it's open
    };

    return (
        <>
            <header className={`header ${scrolled ? 'scrolled' : ''}`} data-aos="fade-down">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <button
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? '×' : '≡'}
                </button>
                <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/packages" onClick={closeMenu}>Packages</Link>
                        </li>
                        <li>
                            <Link to="/blog" onClick={closeMenu}>Blog</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={closeMenu}>About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
                        </li>
                    </ul>
                    <button className="enquiry-btn" onClick={handleEnquiryClick}>
                        Enquiry Now
                    </button>
                    <button className="login-btn" onClick={handleLoginClick}> {/* Changed this line */}
                        Login
                    </button>
                </nav>
            </header>

            {/* Full page popup */}
            {popupVisible && <Popup onClose={closePopup} />}
        </>
    );
};

export default Header;