import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';
import './PopularDestinations.css';

// Import images
import image1 from '../assets/destinations/phuket.jpg';
import image2 from '../assets/destinations/Ella.jpg';
import image3 from '../assets/destinations/vaadhoo.jpg';
import image4 from '../assets/destinations/ubud.jpg';
import image5 from '../assets/destinations/male atoll.jpg';
import image6 from '../assets/destinations/kuta.jpeg';
import image7 from '../assets/destinations/bangaram.jpg';
import image8 from '../assets/destinations/bangkok.jpg';

const destinations = [
    { name: "Phuket", location: "Thailand", image: image1, rating: 4.8, reviews: 324 },
    { name: "Ella", location: "Sri Lanka", image: image2, rating: 4.7, reviews: 210 },
    { name: "Vaadhoo Island", location: "Maldives", image: image3, rating: 4.9, reviews: 450 },
    { name: "Ubud", location: "Bali, Indonesia", image: image4, rating: 4.8, reviews: 360 },
    { name: "Male Atoll", location: "Maldives", image: image5, rating: 4.7, reviews: 190 },
    { name: "Kuta Beach", location: "Bali, Indonesia", image: image6, rating: 4.6, reviews: 280 },
    { name: "Bangaram", location: "Lakshadweep", image: image7, rating: 4.8, reviews: 320 },
    { name: "Bangkok", location: "Thailand", image: image8, rating: 4.9, reviews: 500 },
];

const PopularDestinations = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="popular-destinations" id="Top-picks" data-aos="fade-up">
            <div className="popular-header-row">
                <p>Top Picks for Your Next Adventure</p>
                <h2>Explore Trending Tours</h2>
                <div className="navigation-buttons">
                    <button className="prev-button">❮</button>
                    <button className="next-button">❯</button>
                </div>
            </div>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.next-button',
                    prevEl: '.prev-button',
                }}
                spaceBetween={20}
                breakpoints={{
                    640: { slidesPerView: 2 }, // Phone: Show 2 cards
                    768: { slidesPerView: 3 }, // Tablet: Show 3 cards
                    1024: { slidesPerView: 4 }, // Big screen: Show 4 cards
                }}
            >
                {destinations.map((destination, index) => (
                    <SwiperSlide key={index}>
                        <div className="destination-card">
                            <div className="card-image-container">
                                <img
                                    className="destination-image"
                                    src={destination.image}
                                    alt={destination.name}
                                />
                                <div className="card-badge">Top Picks</div>
                            </div>
                            <p className="destination-location-name">{destination.location}</p>
                            <h3 className="place-name">{destination.name}</h3>
                            <div className="ratings">
                                <span>⭐ {destination.rating}</span>
                                <span>({destination.reviews} reviews)</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularDestinations;