import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const userDropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define navigation links with proper translations
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Translate navigation links if translations exist
  const translatedNavLinks = navLinks.map(link => ({
    ...link,
    name: link.name === 'Home' && t('common.home') ? t('common.home') :
          link.name === 'About' && t('common.aboutUs') ? t('common.aboutUs') :
          link.name === 'Programs' && t('common.programs') ? t('common.programs') :
          link.name === 'Events' && t('common.events') ? t('common.events') :
          link.name === 'Blog' && t('common.blog') ? t('common.blog') :
          link.name === 'Partners' && t('common.partners') ? t('common.partners') :
          link.name === 'Contact' && t('common.contact') ? t('common.contact') :
          link.name
  }));

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`${isHomePage ? 'fixed-top' : ''} ${isScrolled || !isHomePage ? 'bg-white shadow py-2' : 'bg-transparent py-3'}`}
      style={{ transition: 'all 0.3s ease', zIndex: 1030 }}
    >
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          {/* Logo - Far Left */}
          <div className="col-md-2 text-md-start">
            <Link to="/" className="navbar-brand fs-3 fw-bold d-flex align-items-center">
              <span style={{ color: 'var(--primary)' }} className="me-1">
                <FaHeart className="me-1" />Detour
              </span>
              <span className={isScrolled || !isHomePage ? 'text-dark' : 'text-white'}>Charity</span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <div className="col-md-8 d-none d-md-block">
            <div className="d-flex justify-content-center">
              {translatedNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-decoration-none position-relative mx-4 ${isActive(link.path) ? 'fw-semibold' : ''}`}
                  style={{ 
                    color: isActive(link.path) ? 'var(--primary)' : (isScrolled || !isHomePage ? 'var(--dark)' : '#fff'),
                    transition: 'color 0.3s ease',
                    fontSize: '16px'
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span 
                      className="position-absolute start-0 bottom-0 w-100"
                      style={{
                        height: '2px',
                        backgroundColor: 'var(--primary)',
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Language & Auth - Far Right */}
          <div className="col-md-2 d-none d-md-flex justify-content-end align-items-center">
            <div className="me-3">
              <LanguageSelector />
            </div>
            
            {currentUser ? (
              <div className="position-relative" ref={userDropdownRef}>
                <button
                  className="d-flex align-items-center justify-content-center rounded-circle p-2"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: isScrolled || !isHomePage ? 'var(--dark)' : '#fff',
                    width: '40px',
                    height: '40px'
                  }}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <FaUser />
                </button>
                
                {showUserDropdown && (
                  <div className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow-lg" style={{ minWidth: '200px', zIndex: 1050 }}>
                    <div className="px-3 py-2 border-bottom">
                      <div className="fw-medium">{currentUser.name}</div>
                      <div className="small text-muted">{currentUser.email}</div>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="d-block px-3 py-2 text-decoration-none text-dark hover-bg-light"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Your Profile
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="d-block w-100 text-start border-0 bg-transparent px-3 py-2 text-dark hover-bg-light"
                    >
                      <FaSignOutAlt className="me-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex">
                <Link 
                  to="/login" 
                  className="btn btn-outline-primary btn-sm me-2"
                  style={{ 
                    color: isScrolled || !isHomePage ? 'var(--primary)' : '#fff',
                    borderColor: isScrolled || !isHomePage ? 'var(--primary)' : '#fff'
                  }}
                >
                  {t('common.login') || 'Login'}
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-outline-primary btn-sm"
                  style={{ 
                    color: isScrolled || !isHomePage ? 'var(--primary)' : '#fff',
                    borderColor: isScrolled || !isHomePage ? 'var(--primary)' : '#fff'
                  }}
                >
                  {t('common.register') || 'Register'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="col-2 d-md-none text-end">
            <button
              className="btn p-2 rounded-circle"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                color: isScrolled || !isHomePage ? 'var(--dark)' : '#fff'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`position-absolute bg-white w-100 shadow overflow-hidden ${isMenuOpen ? 'show' : ''}`}
        style={{
          top: isMenuOpen ? (isScrolled || !isHomePage ? '56px' : '72px') : '0',
          maxHeight: isMenuOpen ? '500px' : '0',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'all 0.3s ease',
          zIndex: 1000,
          visibility: isMenuOpen ? 'visible' : 'hidden'
        }}
      >
        <div className="container-fluid py-4">
          <div className="d-flex flex-column">
            {translatedNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 text-decoration-none fw-medium ${isActive(link.path) ? 'fw-semibold' : ''}`}
                style={{ color: isActive(link.path) ? 'var(--primary)' : 'var(--dark)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/donate" 
              className="btn btn-primary py-2 mt-3 shadow"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.donate') || 'Donate Now'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
