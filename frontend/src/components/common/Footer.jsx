import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img src="/logo_manshu.png" alt="Manshu Learning" className="logo-img footer-logo" />
          <p>Premium EdTech Platform</p>
        </div>
        <div className="footer-links">
          <p>&copy; {new Date().getFullYear()} Manshu Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
