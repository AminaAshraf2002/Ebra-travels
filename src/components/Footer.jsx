import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0d1321", color: "#fff", padding: "40px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: "20px",
          }}
        >
          {/* Logo Section */}
          <div style={{ flex: "1 1 300px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Ebra Holidays</h2>
            <p>
              Ebra Holidays offers curated travel experiences, providing exceptional
              holiday packages tailored to your needs. Explore the world with us and create
              unforgettable memories.
            </p>
            <p style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  backgroundColor: "#ff5722",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <a
                href="https://www.google.com/maps/search/Changanassery+road,+near+passport+seva+Kendra,+Eerayil+Kadavu,+Kottayam,+Kerala+686001"
                target="_blank"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Changanassery Road, Near Passport Seva Kendra, Eerayil Kadavu, Kottayam, Kerala 686001
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bolder",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
              <li>
                <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
              </li>
              <li>
                <a href="/packages" style={{ color: "#fff", textDecoration: "none" }}>Packages</a>
              </li>
              <li>
                <a href="/blog" style={{ color: "#fff", textDecoration: "none" }}>Blog</a>
              </li>
              <li>
                <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>About Us</a>
              </li>
              <li>
                <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Other Pages */}
          <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bolder",
              }}
            >
              Other Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
              <li>
                <a href="#tour-by-theme-section" style={{ color: "#fff", textDecoration: "none" }}>Tour by Theme</a>
              </li>
              <li>
                <a href="#Top-picks" style={{ color: "#fff", textDecoration: "none" }}>Top Picks</a>
              </li>
              <li>
                <a href="#Travel-offers" style={{ color: "#fff", textDecoration: "none" }}>Travel Offers</a>
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ borderColor: "#444", margin: "20px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          {/* Contact Info */}
          <div style={{ flex: "1 1 100%", maxWidth: "600px", marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {/* Phone Section */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    backgroundColor: "#ff5722",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  <i className="fas fa-phone-alt"></i>
                </span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px" }}>Book Your Holiday</h4>
                  <a href="tel:+910123456789" style={{ color: "#fff", textDecoration: "none" }}>
                    <p style={{ margin: 0 }}>9497080904</p>
                  </a>
                </div>
              </div>

              {/* Email Section */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    backgroundColor: "#ff5722",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  <i className="fas fa-envelope"></i>
                </span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px" }}>Email Us</h4>
                  <p style={{ margin: 0 }}>info@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ textAlign: "center" }}>
            <p>Follow us:</p>
            <a
              href="https://www.facebook.com/profile.php?id=61569417806592"
              target="_blank"
              style={{ color: "#fff", marginRight: "15px", fontSize: "20px" }}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/ebra_holidays/"
              target="_blank"
              style={{ color: "#fff", marginRight: "15px", fontSize: "20px" }}
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              style={{ color: "#fff", fontSize: "20px" }}
            >
              <i className="fab fa-youtube"></i>
            </a>
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/9497080904"
              target="_blank"
              style={{ color: "#fff", fontSize: "20px", marginLeft: "15px" }}
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;