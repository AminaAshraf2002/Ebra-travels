import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-us" data-aos="fade-down">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/09/69/99/62/240_F_969996230_pnfrSP5ZJ6Zogqeg4cjuuLK5NsBng9NF.jpg")`,
        }}
      >
        <div className="hero-overlay">
          <h1 data-aos="fade-down">About Us</h1>
          <p data-aos="fade-up">Bringing you unforgettable travel experiences worldwide</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="intro" data-aos="fade-right">
          <h2>
          Embark on unforgettable journeys with Ebra Holidays – Where your dream vacation begins!
          </h2>
          <p>
            <span>Affordable Prices</span> <span>Prioritize Comfort</span>
          </p>
          <p>
            Ebra Holidays  is your premier travel partner, offering a seamless and unforgettable travel experience for both local and international destinations. Located in the scenic and vibrant town of Kottayam, Kerala, we specialize in crafting personalized holiday packages that cater to your every need, ensuring a stress-free journey from start to finish.
          </p>
          <p>
            At Ebra Holidays , we believe that travel is more than just reaching a destination—it’s about creating memories, exploring new cultures, and enriching your life with unique experiences. Whether you are planning a relaxing getaway, a family vacation, a romantic honeymoon, or an adventurous excursion, we have something special for every type of traveler.
          </p>
          <ul>
            <li><strong>Domestic and International Tours:</strong> Explore exotic destinations across India or venture abroad with our all-inclusive tour packages, including destinations in Southeast Asia, Europe, the Middle East, and more.</li>
            <li><strong>Adventure and Nature Escapes:</strong> For those who love nature and adventure, we curate tours to the lush hills, beaches, wildlife sanctuaries, and trekking trails.</li>
            <li><strong>Customized Packages:</strong> We understand that every traveler is unique. Our customized packages are designed to cater to your personal preferences, whether it’s a luxury trip, a budget-friendly vacation, or a solo adventure.</li>
          </ul>
          <p>
            What sets us apart at Ebra Holidays  is our deep understanding of Kerala’s beauty and culture. Our team offers local expertise, guiding you to hidden gems and authentic experiences in the heart of Kerala and beyond. From the backwaters of Alleppey to the beaches of Varkala, we promise to deliver an exceptional travel experience tailored just for you.
          </p>
          <p>
            Additionally, we offer specialized services such as visa assistance, travel insurance, and customer support throughout your trip. With Ebra Holidays Kottayam, you can rest assured that every detail of your travel is taken care of with the utmost attention and professionalism.
          </p>
          <p>
            Whether you’re looking to relax on serene beaches, immerse yourself in vibrant cultures, or embark on thrilling adventures, Ebra Holidays Kottayam is here to turn your travel dreams into reality.
          </p>
        </div>

      </div>
      
      {/* Features Section */}
      <div className="features" data-aos="fade-up">
        <div className="feature-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDN_SbYyanBODM8XGRZI9_FB_5kbltG6hm3MBisaNNpE6_M-LdCM8ozA2EnjX9dKoXkk&usqp=CAU"
            alt="Tours Guide"
            loading="lazy"
          />
          <h3>Tours Guide</h3>
          <p>
          Experienced tour guides ensuring informative and enjoyable experiences at every destination
          
          </p>
        </div>
        <div className="feature-card">
          <img
            src="data:image/png;base64,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"
            alt="Our Team"
            loading="lazy"
          />
          <h3>Clear Price</h3>
          <p>
          Transparent pricing for all our travel packages, with no hidden fees
          </p>
        </div>
        <div className="feature-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9971/9971528.png"
            alt="Safety Safe"
          />
          <h3>Safety Safe</h3>
          <p>
          Your safety is our priority, ensuring secure and worry-free travel experiences
           
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;