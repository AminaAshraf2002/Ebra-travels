import React, { useState, useEffect } from "react";
import "./OfferZone.css";
import offer1 from "../assets/image1.jpg";
import offer2 from "../assets/image2.jpg";
import offer3 from "../assets/img1.jpeg";
import offer4 from "../assets/family.jpeg";
import offer5 from "../assets/Romantic Stays.jpeg";
import offer6 from "../assets/solo.jpeg";
import Popup from "./Popup";
const offers = [
  { id: 1, image: offer1, discount: "50% Off", title: "Luxury Escapes", description: "Half the price on selected items." },
  { id: 2, image: offer2, discount: "30% Off", title: "Weekend Getaways", description: "Save big on the latest collection." },
  { id: 3, image: offer3, discount: "20% Off", title: "Adventure Awaits", description: "Exclusive discounts for a limited time." },
  { id: 4, image: offer4, discount: "40% Off", title: "Family Packages", description: "Top deals on premium products." },
  { id: 5, image: offer5, discount: "25% Off", title: "Romantic Stays", description: "Shop with amazing discounts." },
  { id: 6, image: offer6, discount: "15% Off", title: "Solo Travels", description: "Special offers just for you." },
];

function OfferZone() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false); // State to handle popup visibility
  const cardsPerRow = 2;

  const totalSlides = Math.ceil(offers.length / cardsPerRow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideOffers = () => {
    const startIndex = currentSlide * cardsPerRow;
    return offers.slice(startIndex, startIndex + cardsPerRow);
  };

  const handleEnquiryClick = () => {
    setPopupVisible(true); // Show the popup when "Enquiry Now" is clicked
  };

  const closePopup = () => {
    setPopupVisible(false); // Close the popup when the close button is clicked
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  return (
    <div className="offer-zone" id="Travel-offers">
      <div className="offer-heading">Top Travel Offers</div>
      <div className="offer-description">Unbeatable deals for your next trip!</div>

      {/* Slider Section */}
      <div className="offer-slider">
        {/* Navigation Controls */}
        <button className="offer-prev-button" onClick={prevSlide}>
          &#10094;
        </button>

        {/* Active Offers Display */}
        <div className="offer-row">
          {getCurrentSlideOffers().map((offer) => (
            <div key={offer.id} className="offer-card">
              {/* Left Content */}
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <h2 className="offer-discount">{offer.discount}</h2>
                <p className="offer-text">{offer.description}</p>
                <button className="offer-button" onClick={handleEnquiryClick}>Enquiry Now</button>
              </div>

              {/* Right Image */}
              <div className="offer-image-wrapper">
                <img src={offer.image} alt={offer.title} className="offer-image" />
              </div>
            </div>
          ))}
        </div>

        <button className="offer-next-button" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Show popup if it's visible */}
      {popupVisible && <Popup onClose={closePopup} />}
    </div>
  );
}

export default OfferZone;