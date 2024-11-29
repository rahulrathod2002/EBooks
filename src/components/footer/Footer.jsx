import React from 'react';
import './Footer.css';

import instagramLogo from '../../assets/design.jpg';
import faceBookLogo from '../../assets/horror.jpg';
import linkedinLogo from '../../assets/TheGreat.jpg';
import CompanySignature from './CompanySignature';

function Footer() {
  return (
    <>
      <div className="books-footer-container">
        {/* Social Media Section */}
        <div className="books-footer-social-media">
          <h2>Follow Us</h2>
          <ul>
            <li>
              <img src={instagramLogo} alt="Instagram" className="footer-icon" /> Instagram
            </li>
            <li>
              <img src={faceBookLogo} alt="Facebook" className="footer-icon" /> Facebook
            </li>
            <li>
              <img src={linkedinLogo} alt="LinkedIn" className="footer-icon" /> LinkedIn
            </li>
          </ul>
        </div>

        {/* Library Section */}
        <div className="books-footer-library">
          <h2>Library</h2>
          <ul>
            <li>UI Design</li>
            <li>Mind Luster</li>
            <li>Code Simplified</li>
            <li>React Handbook</li>
            <li>Design Principles</li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="books-footer-community">
          <h2>Community</h2>
          <ul>
            <li>Discussion Forums</li>
            <li>Book Clubs</li>
            <li>Events</li>
            <li>Workshops</li>
            <li>Webinars</li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="books-footer-company">
          <h2>Company</h2>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>
      <CompanySignature />
    </>
  );
}

export default Footer;
