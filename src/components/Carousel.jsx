import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "aos/dist/aos.css"; // Import AOS CSS
import AOS from 'aos'; // Import AOS
import './Carousel.css';
import image1 from '../assets/img1.jpeg';
import image2 from '../assets/img2.jpeg';
import image3 from '../assets/bali.webp';

const CarouselComponent = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Optional: Set duration for animations
    }, []);

    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <div>
                <img src={image1} alt="Destination 1" />
                <div className="carousel-content left" data-aos="fade-right">
                    <h1>Find Your Dream Destination Today</h1>
                </div>
            </div>
            <div>
                <img src={image2} alt="Destination 2" />
                <div className="carousel-content right" data-aos="fade-left">
                    <h1>Explore the World's Most Beautiful Places</h1>
                </div>
            </div>
            <div>
                <img src={image3} alt="Destination 3" />
                <div className="carousel-content left" data-aos="fade-right">
                    <h1>Journey into the Extraordinary</h1>
                </div>
            </div>
        </Carousel>
    );
};

export default CarouselComponent;