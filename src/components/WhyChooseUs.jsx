// src/components/WhyChooseUs.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faGlobe, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    return (
        <div className="why-choose-us">
            <h2>WHY CHOOSE US?</h2>
            <p>Your Trusted Travel Partner</p>
            <div className="reasons">
                <div className="reason">
                    <FontAwesomeIcon icon={faWallet} className="why-icon" />
                    <h3>Affordable Price Guarantee</h3>
                </div>
                <div className="reason">
                    <FontAwesomeIcon icon={faGlobe} className="why-icon" />
                    <h3>Wide Variety of Destinations</h3>
                </div>
                <div className="reason">
                    <FontAwesomeIcon icon={faThumbsUp} className="why-icon" />
                    <h3>Highly Qualified Service</h3>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;