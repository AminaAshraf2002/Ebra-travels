import React, { useState } from "react";
import { toast } from 'react-toastify';
import { enquiryService } from '../services/enquiryService';
import "./Popup.css";
import holidayImage from "../assets/poster.jpeg";

const Popup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        place: "",
        consent: false,
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Valid 10-digit phone number is required";
        }
        if (!formData.place.trim()) {
            newErrors.place = "Place to visit is required";
        }
        if (!formData.consent) {
            newErrors.consent = "You must authorize us to contact you.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            try {
                // Submit enquiry to backend
                await enquiryService.createEnquiry(formData);

                // Show success toast
                toast.success('Enquiry submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Reset the form data
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    place: "",
                    consent: false,
                });

                // Clear errors
                setErrors({});

                // Show submitted state
                setSubmitted(true);

                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 3000);
            } catch (error) {
                // Show error toast
                toast.error('Failed to submit enquiry. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
            setIsLoading(false);
        }
    };

    return (
        <div className="popup-overlay" data-aos="fade-up">
            <div className="popup-container" data-aos="zoom-in">
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                <div className="popup-left" data-aos="fade-right">
                    <h3>HOW TO BOOK YOUR HOLIDAY</h3>
                    <ul>
                        <li>Fill the Form & Get Free Quote</li>
                        <li>Our Team Helps You to Offer Best Trip</li>
                        <li>Enjoy Your Holidays</li>
                    </ul>
                    <h3>QUERY FOR YOUR HOLIDAY PLAN</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}

                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}

                        <input
                            type="text"
                            name="place"
                            placeholder="Place to Visit"
                            value={formData.place}
                            onChange={handleInputChange}
                        />
                        {errors.place && <span className="error">{errors.place}</span>}

                        <label>
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleInputChange}
                            />
                            You authorize us to contact you with offers.
                        </label>
                        {errors.consent && <span className="error">{errors.consent}</span>}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>

                    {/* Show success message after form submission */}
                    {submitted && <div className="success-message">Form submitted successfully!</div>}
                </div>
                <div className="popup-right" data-aos="fade-left">
                    <img
                        src={holidayImage}
                        alt="Holiday"
                        className="popup-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default Popup;