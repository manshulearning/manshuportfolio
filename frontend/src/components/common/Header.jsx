import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header glass-panel">
        <div className="container header-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/logo_manshu.png" alt="Manshu Learning" className="logo-img" />
          </Link>
          
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="desktop-actions">
             <div className="nav-links">
              {user && user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Dashboard</Link>
              )}
            </div>
            
            <div className="auth-actions">
              {user ? (
                <div className="user-menu">
                  <span className="user-name"><User size={18}/> {user.name}</span>
                  <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/admin" className="btn btn-primary">Admin Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-links">
          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link" onClick={closeMenu}>Dashboard</Link>
          )}
        </div>
        
        <div className="auth-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name"><User size={18}/> {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/admin" className="btn btn-primary" onClick={closeMenu}>Admin Login</Link>
          )}
        </div>
      </nav>
      
      {/* Backdrop for mobile drawer */}
      {isMenuOpen && <div className="header-backdrop" onClick={closeMenu}></div>}
    </>
  );
};

export default Header;
