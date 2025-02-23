import React, { useEffect } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TourByTheme.css';

// Import your images
import familyImage from '../assets/themes/family.jpeg';
import womenImage from '../assets/themes/girls.jpeg';
import seniorImage from '../assets/themes/senior.jpeg';
import groupImage from '../assets/themes/group.jpeg';
import honeymoonImage from '../assets/themes/honeymoon.jpeg';

const themes = [
    { title: "Family Tour Packages", image: familyImage },
    { title: "Women Tour Packages", image: womenImage },
    { title: "Senior Citizen Tour Packages", image: seniorImage },
    { title: "Group Tour Packages", image: groupImage },
    { title: "Honeymoon Tour Packages", image: honeymoonImage }
];

const TourByTheme = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="tour-by-theme-section" id="tour-by-theme-section">
            <h2>Explore Tours by Theme</h2>
            <p className="theme-description">Trips for every interest</p>
            <Slider {...settings}>
                {themes.map((theme, index) => (
                    <div key={index}>
                        <div className="theme-card" data-aos="fade-up">
                            <img src={theme.image} alt={theme.title} />
                            <div className="overlay"></div>
                            <div className="card-content">
                                <h3>{theme.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TourByTheme;
