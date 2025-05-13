import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaNewspaper, FaCalendarAlt, FaHandHoldingHeart, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaChartBar } from 'react-icons/fa';
import Loader from '../../components/common/Loader';

// Lazy-loaded admin components
const Overview = lazy(() => import('./components/Overview'));
const BlogManager = lazy(() => import('./components/BlogManager'));
const EventManager = lazy(() => import('./components/EventManager'));
const ProgramManager = lazy(() => import('./components/ProgramManager'));
const UserManager = lazy(() => import('./components/UserManager'));
const Settings = lazy(() => import('./components/Settings'));
const Profile = lazy(() => import('./components/Profile'));
const Statistics = lazy(() => import('./components/Statistics'));

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check authentication status
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken || !storedUser) {
      // If not authenticated, redirect to login
      navigate('/admin/login');
      return;
    }
    
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // Handle window resize for mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };
  
  // Navigation items
  const navigationItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Blog Posts', path: '/admin/dashboard/blogs', icon: <FaNewspaper /> },
    { name: 'Events', path: '/admin/dashboard/events', icon: <FaCalendarAlt /> },
    { name: 'Programs', path: '/admin/dashboard/programs', icon: <FaHandHoldingHeart /> },
    { name: 'Users', path: '/admin/dashboard/users', icon: <FaUsers /> },
    { name: 'Statistics', path: '/admin/dashboard/statistics', icon: <FaChartBar /> },
    { name: 'Settings', path: '/admin/dashboard/settings', icon: <FaCog /> },
    { name: 'My Profile', path: '/admin/dashboard/profile', icon: <FaUserCircle /> },
  ];
  
  // If not authenticated, show loading
  if (!user) {
    return <Loader />;
  }
  
  return (
    <div className="min-vh-100 bg-light">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button 
          className="position-fixed top-0 start-0 mt-4 ms-4 btn btn-primary z-index-dropdown rounded-circle p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ zIndex: 1050 }}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-dark text-white position-fixed start-0 top-0 h-100 overflow-auto transition-all d-flex flex-column`}
        style={{ 
          width: '280px', 
          zIndex: 1030,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div className="p-4 border-bottom border-secondary">
          <h2 className="fw-bold text-center mb-0">
            <span style={{ color: 'var(--primary)' }}>Detour</span> CMS
          </h2>
        </div>
        
        <div className="p-3 flex-grow-1 d-flex flex-column">
          <div className="mb-4 p-3 bg-secondary bg-opacity-25 rounded">
            <p className="text-muted small mb-1">Logged in as</p>
            <p className="fw-medium mb-1">{user.name}</p>
            <p className="text-muted small mb-2">{user.email}</p>
            <Link to="/admin/dashboard/profile" className="text-decoration-none small" style={{ color: 'var(--primary)' }}>
              View profile
            </Link>
          </div>
          
          <nav className="flex-grow-1">
            <div className="nav flex-column gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link d-flex align-items-center rounded py-2 px-3 ${isActive ? 'active bg-primary text-white' : 'text-white-50'}`}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <hr className="my-3 border-secondary" />
            
            <button
              onClick={handleLogout}
              className="nav-link text-white-50 d-flex align-items-center rounded py-2 px-3 w-100 text-start border-0 bg-transparent"
            >
              <span className="me-3"><FaSignOutAlt /></span>
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div 
        className="transition-all"
        style={{ 
          marginLeft: sidebarOpen && !isMobile ? '280px' : '0',
          transition: 'margin 0.3s ease'
        }}
      >
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3">
            <div className="container-fluid">
              <h1 className="h3 fw-bold mb-0">
                {navigationItems.find(item => 
                  item.path === location.pathname
                )?.name || 'Dashboard'}
              </h1>
            </div>
          </div>
        </header>
        
        <main className="p-4">
          <div className="container-fluid">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/blogs" element={<BlogManager />} />
                <Route path="/events" element={<EventManager />} />
                <Route path="/programs" element={<ProgramManager />} />
                <Route path="/users" element={<UserManager />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1020 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
