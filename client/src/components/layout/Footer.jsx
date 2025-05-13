import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPlaneDeparture } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="section bg-dark text-white pt-5 pb-4" style={{ background: 'linear-gradient(to bottom, #1f2937, #111827)' }}>
      <div className="container-custom">
        <div className="row mb-5">
          {/* About Column */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <Link to="/" className="d-flex align-items-center mb-4 text-decoration-none">
              <FaHeart style={{ color: 'var(--accent)' }} className="me-2 fs-3" />
              <span className="fw-bold fs-3">
                <span style={{ color: 'var(--primary)' }}>Detour</span>
                <span className="text-white">Charity</span>
              </span>
            </Link>
            <p className="text-white-50 mb-3">
              An initiative by <a href="https://secretdetours.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: 'var(--primary)' }}>SecretDetours Travel Company</a> dedicated to providing aid for families in crisis, including those affected by the conflict in Ukraine and other humanitarian emergencies.
            </p>
            <div className="d-flex gap-2 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm text-white p-2 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm text-white p-2 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm text-white p-2 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm text-white p-2 rounded-circle" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <FaLinkedinIn />
              </a>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ color: 'var(--accent)' }}>
              <FaPlaneDeparture />
              <span className="small">A SecretDetours Initiative</span>
            </div>
          </div>
          
          {/* Quick Links & Programs */}
          <div className="col-lg-4 d-flex">
            <div className="w-50 pe-3">
              <h5 className="mb-3 text-white fw-bold pb-2 position-relative">
                Quick Links
                <span className="position-absolute start-0 bottom-0" style={{ height: '2px', width: '40px', backgroundColor: 'var(--primary)' }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/about" className="text-white-50 text-decoration-none hover-text-primary">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/programs" className="text-white-50 text-decoration-none hover-text-primary">
                    Our Programs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/events" className="text-white-50 text-decoration-none hover-text-primary">
                    Events
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/donate" className="text-white-50 text-decoration-none hover-text-primary">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="w-50 ps-3">
              <h5 className="mb-3 text-white fw-bold pb-2 position-relative">
                Crisis Support
                <span className="position-absolute start-0 bottom-0" style={{ height: '2px', width: '40px', backgroundColor: 'var(--primary)' }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/programs/ukraine" className="text-white-50 text-decoration-none hover-text-primary">
                    Ukraine Relief
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/programs/emergency" className="text-white-50 text-decoration-none hover-text-primary">
                    Emergency Aid
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/programs/families" className="text-white-50 text-decoration-none hover-text-primary">
                    Family Support
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/volunteer" className="text-white-50 text-decoration-none hover-text-primary">
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="col-lg-4">
            <h5 className="mb-3 text-white fw-bold pb-2 position-relative">
              Contact Us
              <span className="position-absolute start-0 bottom-0" style={{ height: '2px', width: '40px', backgroundColor: 'var(--primary)' }}></span>
            </h5>
            <ul className="list-unstyled mb-4">
              <li className="mb-3 d-flex">
                <div className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <FaMapMarkerAlt className="text-white-50" />
                </div>
                <span className="text-white-50">123 Travel Way, Adventure City, 12345</span>
              </li>
              <li className="mb-3 d-flex">
                <div className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <FaPhone className="text-white-50" />
                </div>
                <a href="tel:+1234567890" className="text-white-50 text-decoration-none">+1 (234) 567-890</a>
              </li>
              <li className="mb-3 d-flex">
                <div className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <FaEnvelope className="text-white-50" />
                </div>
                <a href="mailto:support@secretdetours.com" className="text-white-50 text-decoration-none">support@secretdetours.com</a>
              </li>
            </ul>
            
            <div className="d-flex flex-column gap-2">
              <Link to="/contact" className="btn btn-outline-light">
                <FaEnvelope className="me-2" /> Get in Touch
              </Link>
              <Link to="/events" className="btn btn-outline-light">
                <FaPlaneDeparture className="me-2" /> Upcoming Events
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-top border-secondary pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-white-50 text-center text-md-start mb-3 mb-md-0 small">
            © {currentYear} <span style={{ color: 'var(--primary)' }}>Detour Charity</span> by SecretDetours. Together for families in crisis.
          </div>
          <div className="text-center text-md-center mb-2 mb-md-0">
            <a href="https://mccullagh-labs.com" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none" style={{ fontSize: '0.8rem', opacity: 0.7 }}>Made by McCullagh LABS</a>
          </div>
          <div className="d-flex gap-4 small">
            <Link to="/privacy-policy" className="text-white-50 text-decoration-none">Privacy</Link>
            <Link to="/terms" className="text-white-50 text-decoration-none">Terms</Link>
            <a href="https://secretdetours.com" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">SecretDetours.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
