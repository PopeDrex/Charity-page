import { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };
  
  // Get current language name
  const currentLanguage = availableLanguages.find(lang => lang.code === language)?.name || 'English';
  
  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        type="button"
        className="d-flex align-items-center justify-content-center rounded-circle"
        style={{ 
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.9)',
          width: '36px',
          height: '36px'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGlobeAmericas size={14} />
      </button>
      
      {isOpen && (
        <div className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow-lg" style={{ minWidth: '120px', zIndex: 1050 }}>
          {availableLanguages.map(lang => (
            <button
              key={lang.code}
              className="d-block w-100 text-start border-0 bg-transparent px-3 py-2 text-dark"
              style={{ 
                fontWeight: language === lang.code ? '600' : 'normal',
                color: language === lang.code ? 'var(--primary)' : 'inherit'
              }}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
