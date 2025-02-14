// src/components/BlogSection.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './BlogSection.css';

// Import images
import Image from '../assets/parallax1.jpeg';
import italyImage from '../assets/des1.jpeg';
import indonesiaImage from '../assets/ella.jpg';
import desertIslandImage from '../assets/blog3.jpg';

const BlogSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const blogs = [
        {
            title: "Rumah Pohan Tree House!",
            description: "A tranquil escape in Bali’s lush jungle, offering breathtaking views and a peaceful connection with nature.",
            image: italyImage,
        },
        {
            title: " Lakshadweep: Paradise Awaits",
            description: "Crystal-clear waters and peaceful beaches—Lakshadweep is a true tropical escape!",
            image: Image,
        },
        {
            title: "Try new experiences in there!",
            description: "Sri Lanka is a true gem! From its beautiful beaches to the rich culture, every moment was unforgettable. A perfect place to relax and explore!",
            image: indonesiaImage,
        },
        {
            title: "A Magical Experience on Vaadhoo Island",
            description: "Vaadhoo Island is breathtaking! The glowing bioluminescent beach at night is pure magic. A must-see in the Maldives!",
            image: desertIslandImage,
        },
    ];

    return (
        <div className="blog-section">
            <h2>Our Blogs</h2>
            <p>An insight to the incredible experiences in the world</p>
            <div className="blog-content">
                <div className="large-blog-card" data-aos="fade-right">
                    <img src={blogs[0].image} alt={blogs[0].title} />
                    <div className="blog-details">
                        <h3>{blogs[0].title}</h3>
                        <p>{blogs[0].description}</p>
                    </div>
                </div>
                <div className="small-blog-cards" data-aos="fade-left">
                    {blogs.slice(1).map((blog, index) => (
                        <div className="small-blog-card" key={index}>
                            <img src={blog.image} alt={blog.title} />
                            <div className="small-blog-details">
                                <h3>{blog.title}</h3>
                                <p>{blog.description}</p>
                                <a href="/blog">Read More &gt;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSection;