import React, { useState, useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import EnquiryCard from "../components/EnquiryCard";
import PopularDestinations from "../components/PopularDestinations";
import OfferZone from "../components/OfferZone";
import TourByTheme from "../components/TourByTheme";
import HolidayPlanner from "../components/HolidayPlanner";
import WhyChooseUs from "../components/WhyChooseUs";
import BlogSection from "../components/BlogSection";
import Popup from "../components/Popup"; // Import the Popup component

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show popup after 10 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <CarouselComponent />
            <EnquiryCard />
            <HolidayPlanner />
            <PopularDestinations />
            <OfferZone />
            <TourByTheme />
            <WhyChooseUs />
            <BlogSection />
            {showPopup && <Popup onClose={handleClosePopup} />} {/* Show Popup */}
        </div>
    );
};

export default Home;