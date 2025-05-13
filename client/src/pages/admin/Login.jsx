import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaHeart, FaHome } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Mock login for now - would be replaced with actual API call
      // Example: const response = await axios.post('/api/auth/login', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be handled by the backend
      if (formData.email === 'admin@detour-charity.org' && formData.password === 'admin123') {
        // Store auth token or user info in localStorage/sessionStorage
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({ 
          name: 'Admin User', 
          email: formData.email,
          role: 'admin'
        }));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            {/* Top navigation bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Link to="/" className="text-decoration-none d-flex align-items-center">
                <FaHome className="me-2" />
                <span>Return to Website</span>
              </Link>
              <div>
                <span style={{ color: 'var(--primary)' }}>Admin Portal</span>
              </div>
            </div>
            
            <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
              <div className="card-header bg-primary text-white text-center py-4">
                <div className="mb-3">
                  <FaHeart className="fs-1" />
                </div>
                <h3 className="mb-0 fw-bold">
                  <span>Detour</span> Charity CMS
                </h3>
              </div>
              
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <p className="text-muted">Sign in to manage your content</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaUser className="text-muted" />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control border-start-0"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <a href="#" className="text-decoration-none small" style={{ color: 'var(--primary)' }}>
                        Forgot password?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control border-start-0"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="remember" 
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary py-3"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : 'Sign In'}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="card-footer bg-light py-3 text-center">
                <p className="text-muted mb-0 small">© {new Date().getFullYear()} Detour Charity. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
