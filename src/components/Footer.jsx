import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111", color: "#fff", padding: "50px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "30px" }}>
          {/* Logo and About Section */}
          <div style={{ flex: "1 1 300px" }}>
            <img src="https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-1/468174268_122095899428647260_7092652061405083872_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=DE22UaqGSYQQ7kNvgHIRylE&_nc_oc=Adh4HeKOZOm9LwEwnpXiUyp8_U8SJOhX0acXZxzrOIKPhz1HXeftyngWDCQ8r-pYdaU&_nc_zt=24&_nc_ht=scontent.fcok4-1.fna&_nc_gid=A8v7xK7238AcFjhNbHEKAll&oh=00_AYBtQdCj4BaB2jLGSPWQIahBb_kvVNtfpPpucTqSN48hmA&oe=67C1691E" alt="Ebra Holidays" style={{ width: "100px", marginBottom: "15px" }} />
            <p>
              Ebra Holidays offers curated travel experiences, providing exceptional holiday packages tailored to your needs.
            </p>
            <a href="/book-tour" style={{ backgroundColor: "#ff5722", color: "#fff", padding: "10px 20px", border: "none", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
              Book a Tour
            </a>
          </div>
          
          {/* Quick Links */}
          <div style={{ flex: "1 1 150px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "15px", fontWeight: "bold" }}>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a></li>
              <li><a href="/packages" style={{ color: "#fff", textDecoration: "none" }}>Packages</a></li>
              <li><a href="/about" style={{ color: "#fff", textDecoration: "none" }}>About Us</a></li>
              <li><a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact Us</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div style={{ flex: "1 1 200px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "15px", fontWeight: "bold" }}>Contact Us</h3>
            <p>📍 <a href="https://maps.app.goo.gl/vqNsWnh9V1gVi91g8" target="_blank" style={{ color: "#fff", textDecoration: "none" }}>Changanassery Road, Kottayam, Kerala 686001</a></p>
            <p>📞 <a href="tel:+910123456789" style={{ color: "#fff", textDecoration: "none" }}>9497080904</a></p>
            <p>📧 <a href="mailto:info@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>info@gmail.com</a></p>
          </div>
        </div>
        
        <hr style={{ borderColor: "#444", margin: "30px 0" }} />
        
        {/* Social Media */}
        <div style={{ textAlign: "center" }}>
          <p>Follow us:</p>
          <a href="https://www.facebook.com/profile.php?id=61569417806592" target="_blank" style={{ margin: "0 10px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: "24px" }} />
          </a>
          <a href="https://www.instagram.com/ebra_holidays/" target="_blank" style={{ margin: "0 10px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: "24px" }} />
          </a>
          <a href="https://youtube.com" target="_blank" style={{ margin: "0 10px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube" style={{ width: "24px" }} />
          </a>
          <a href="https://wa.me/9497080904" target="_blank" style={{ margin: "0 10px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: "24px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
