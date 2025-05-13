import { useState, useEffect } from 'react';
import { FaSave, FaUser, FaEnvelope, FaLock, FaIdCard, FaInfoCircle } from 'react-icons/fa';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [userData, setUserData] = useState(null);
  
  // Form data states
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    role: '',
    bio: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    // Fetch user data (mock data for now)
    const fetchUserData = async () => {
      try {
        // In a real app: const response = await axios.get('/api/users/profile');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data
        const mockUser = {
          id: 1,
          name: 'Admin User',
          email: 'admin@detour-charity.org',
          role: 'admin',
          bio: 'Charity administrator responsible for website content and user management.',
          lastLogin: '2025-05-13 04:15:22',
          createdAt: '2024-01-15',
          loginCount: 42
        };
        
        setUserData(mockUser);
        setGeneralInfo({
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          bio: mockUser.bio || ''
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setErrorMessage('Failed to load profile data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validatePasswordForm = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return false;
    }
    
    if (passwordData.newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setSaveLoading(true);
    
    try {
      if (activeTab === 'password' && !validatePasswordForm()) {
        setSaveLoading(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeTab === 'general') {
        // In a real app: await axios.put('/api/users/profile', generalInfo);
        console.log('Updating profile data:', generalInfo);
        setSuccessMessage('Profile information updated successfully!');
      } else {
        // In a real app: await axios.put('/api/users/password', passwordData);
        console.log('Updating password');
        setSuccessMessage('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="row g-4">
        {/* Sidebar with profile info */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-light text-primary rounded-circle mb-3" style={{ height: '80px', width: '80px', fontSize: '1.75rem' }}>
                  {userData.name.charAt(0)}
                </div>
                <h5 className="fw-bold">{userData.name}</h5>
                <p className="text-muted text-capitalize">{userData.role}</p>
              </div>
              
              <div className="mb-4">
                <h6 className="text-uppercase small fw-bold text-muted mb-2">Contact</h6>
                <p className="d-flex align-items-center">
                  <FaEnvelope className="me-2 text-muted" />
                  {userData.email}
                </p>
              </div>
              
              <div>
                <h6 className="text-uppercase small fw-bold text-muted mb-2">Account Info</h6>
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Member since</span>
                    <span className="text-body">{new Date(userData.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Last login</span>
                    <span className="text-body">{userData.lastLogin}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Total logins</span>
                    <span className="text-body">{userData.loginCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="card border-0 shadow-sm">
            {/* Tabs */}
            <div className="card-header bg-white p-0">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    General Information
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="card-body">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {activeTab === 'general' ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={generalInfo.name}
                          onChange={handleGeneralInfoChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={generalInfo.email}
                          onChange={handleGeneralInfoChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-text d-flex align-items-center">
                        <FaInfoCircle className="me-1" />
                        If you change your email, you'll need to verify it again
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bio">
                        Biography
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={generalInfo.bio}
                        onChange={handleGeneralInfoChange}
                        rows="4"
                        className="form-control"
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label" htmlFor="role">
                        Role
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          id="role"
                          value={generalInfo.role.charAt(0).toUpperCase() + generalInfo.role.slice(1)}
                          className="form-control bg-light"
                          disabled
                        />
                      </div>
                      <div className="form-text">Your role can only be changed by an administrator</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="currentPassword">
                        Current Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label" htmlFor="newPassword">
                        New Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                          required
                          minLength="8"
                        />
                      </div>
                      <div className="form-text">Password must be at least 8 characters long</div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm New Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center"
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        {activeTab === 'general' ? 'Save Changes' : 'Update Password'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
