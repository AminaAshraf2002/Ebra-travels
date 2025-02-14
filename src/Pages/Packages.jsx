import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS
import { Carousel } from "react-responsive-carousel";
import Popup from "../components/Popup";
import "./Packages.css";

const Packages = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [popupVisible, setPopupVisible] = useState(false); // State to handle popup visibility

  const handleEnquiryClick = () => {
    setPopupVisible(true); // Show the popup when "Enquiry Now" is clicked
  };

  const closePopup = () => {
    setPopupVisible(false); // Close the popup when the close button is clicked
  };
  const heroImage =
    "https://burst.shopifycdn.com/photos/calm-water-in-european-city.jpg?width=1000&format=pjpg&exif=0&iptc=0"; // Replace with your actual hero image URL

  const packages = [
    {
      id: 1,
      name: "Bali",
      price: "$500 / 3 days",
      images: [
        "https://shewandersabroad.com/wp-content/uploads/2019/05/Rumah-Pohon-Tree-House-Nusa-Penida-1.jpg",
        "https://media2.thrillophilia.com/images/photos/000/084/783/original/1556011667_shutterstock_631736717.jpg?width=975&height=600",
        "https://media2.thrillophilia.com/images/photos/000/163/984/original/1625578378_swing.jpg?w=753&h=450&dpr=1.5",
      ],
      description: "Experience the beauty of Bali's beaches and culture.",
      rating: 5,
    },
    {
      id: 2,
      name: "Thailand",
      price: "$450 / 3 days",
      images: [
        "https://img.freepik.com/free-photo/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand_335224-1094.jpg?semt=ais_hybrid",
        "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1620250316/10-Best-Attractions-Thailand-Floating-Markets/10-Best-Attractions-Thailand-Floating-Markets.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSK5k2u8EnTIa7FtVAt_z7j7SZKaBpoaF3Fg&s",
      ],
      description: "Discover the vibrant life and cuisine of Thailand.",
      rating: 4,
    },
    {
      id: 3,
      name: "Lakshadweep",
      price: "$400 / 3 days",
      images: [
        "https://www.aryavrittravels.com/wp-content/uploads/2024/01/Water-Sports.jpg",
        "https://www.tripplannersindia.com/assets/blog/images/Bestplacestovisitinlakshadweep/Thinnakara.webp",
        "https://sharpholidays.wordpress.com/wp-content/uploads/2020/05/lakshwadeep-tourist-places.jpg",
      ],
      description: "Relax in the pristine islands of Lakshadweep.",
      rating: 4,
    },
    {
      id: 4,
      name: "Sri Lanka",
      price: "$550 / 3 days",
      images: [
        "https://tripjive.com/wp-content/uploads/2024/09/best-places-to-visit-in-Sri-Lanka-1024x585.jpg",
        "https://www.specialholidays.com/blog/wp-content/uploads/2020/07/srilanka.jpg",
        "https://media.istockphoto.com/id/1125634321/photo/the-couple-greets-the-sunrise-in-the-mountains-man-and-woman-in-the-mountains-wedding-travel.jpg?s=612x612&w=0&k=20&c=jjhQC3kov9D9onL1_2Ny7Z6Vg9zr75MfcLsuWibKsJ8=",
      ],
      description: "Explore the serene landscapes of Sri Lanka.",
      rating: 5,
    },
    {
      id: 5,
      name: "Maldives",
      price: "$600 / 3 days",
      images: [
        "https://maldives-magazine.com/pictures/hard-rock-maldives-rock-star-villa-exterior.jpg",
        "https://www.inspiringtravel.co.uk/other-shores/wp-content/uploads/2022/03/milaidhoo-2.jpg",
        "https://mvhotels.travel/wp-content/uploads/2024/05/milaidhoo-island-maldives-mvhotels-travel.jpg",
      ],
      description: "Enjoy the luxurious islands of Maldives.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div data-aos="fade-down"
        className="hero-section"
        style={{
          backgroundImage: ` url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 data-aos="fade-down" className="hero-title" >
          Travel Packages
        </h1>

      </div>

      {/* Packages Section */}
      <div className="packages-container" style={{ padding: "40px" }}>
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card" data-aos="fade-up">
              {/* Carousel */}
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
              >
                {pkg.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={pkg.name} />
                  </div>
                ))}
              </Carousel>

              {/* Package Info */}
              <div className="package-info">
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p className="price">{pkg.price}</p>
                <div className="rating">
                  {"⭐".repeat(pkg.rating)}{" "}
                  {Array(5 - pkg.rating)
                    .fill("☆")
                    .join("")}
                </div>
                <button className="enquiry-btn" onClick={handleEnquiryClick}>
                  Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show Popup when isPopupOpen is true */}
      {popupVisible && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Packages;