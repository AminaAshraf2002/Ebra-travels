import React from 'react';
import './HolidayPlanner.css';
import { FaCity, FaLandmark, FaUmbrellaBeach, FaHiking, FaShip } from 'react-icons/fa';
// Import images
import image1 from '../assets/planner/city-image.jpeg';
import image2 from '../assets/planner/museum-image.jpeg';
import image3 from '../assets/planner/beach-image.jpeg';
import image4 from '../assets/planner/hiking-image.jpeg';
import image5 from '../assets/planner/cruise-image.jpeg';

const HolidayPlanner = () => {
    const tours = [
        { title: 'City Tours', icon: <FaCity />, image: image1 },
        { title: 'Museum Tours', icon: <FaLandmark />, image: image2},
        { title: 'Beaches', icon: <FaUmbrellaBeach />, image: image3 },
        { title: 'Hiking', icon: <FaHiking />, image: image4 },
        { title: 'Cruises', icon: <FaShip />, image: image5 }
    ];

    return (
        <div className="holiday-planner">
            <div className="title-section">
                <h3 className="subheading">Plan your trip</h3>
                <h2 className="main-heading">Let us plan you a perfect Holiday</h2>
            </div>
            <div className="tour-list">
                {tours.map((tour, index) => (
                    <div key={index} className="tour-card">
                        <div className="image-container">
                            <img src={tour.image} alt={tour.title} className="tour-image" />
                            <div className="icon-container">
                                {tour.icon}
                            </div>
                        </div>
                        <h3 className="tour-title">{tour.title}</h3>
                        <p className="tour-details">{tour.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HolidayPlanner;
