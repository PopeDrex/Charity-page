import { useState, useEffect } from 'react';
import { FaSave, FaCog, FaGlobe, FaEnvelope, FaKey, FaInfoCircle } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form states for different setting sections
  const [generalSettings, setGeneralSettings] = useState({
    siteName: '',
    tagline: '',
    logo: null,
    favicon: null,
    phoneNumber: '',
    email: '',
    address: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: ''
  });
  
  const [donationSettings, setDonationSettings] = useState({
    paypalClientId: '',
    stripePublicKey: '',
    stripeSecretKey: '',
    currencyCode: 'USD',
    suggestedAmounts: '10,25,50,100',
    allowCustomAmount: true,
    thankYouMessage: ''
  });
  
  useEffect(() => {
    // Simulate fetching settings from API
    const fetchSettings = async () => {
      try {
        // In a real app: const response = await axios.get('/api/settings');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setGeneralSettings({
          siteName: 'Detour Charity',
          tagline: 'Creating Hope & Building Futures',
          logo: null,
          favicon: null,
          phoneNumber: '+1 (234) 567-890',
          email: 'info@detour-charity.org',
          address: '123 Charity Lane, Community City, State 12345',
          socialLinks: {
            facebook: 'https://facebook.com/detour-charity',
            twitter: 'https://twitter.com/detour-charity',
            instagram: 'https://instagram.com/detour-charity',
            linkedin: 'https://linkedin.com/company/detour-charity'
          }
        });
        
        setEmailSettings({
          smtpServer: 'smtp.example.com',
          smtpPort: '587',
          smtpUsername: 'notifications@detour-charity.org',
          smtpPassword: '********',
          senderEmail: 'no-reply@detour-charity.org',
          senderName: 'Detour Charity'
        });
        
        setDonationSettings({
          paypalClientId: 'sandbox_client_id',
          stripePublicKey: 'pk_test_example',
          stripeSecretKey: '********************',
          currencyCode: 'USD',
          suggestedAmounts: '10,25,50,100',
          allowCustomAmount: true,
          thankYouMessage: 'Thank you for your generous donation! Your support helps us make a difference in our community.'
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Handle input changes for general settings
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle input changes for social links
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };
  
  // Handle input changes for email settings
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle input changes for donation settings
  const handleDonationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setGeneralSettings(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    try {
      // In a real app, you would send the data to your API
      // const response = await axios.post('/api/settings', { 
      //   general: generalSettings,
      //   email: emailSettings,
      //   donation: donationSettings
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  // Tabs configuration
  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'email', label: 'Email', icon: <FaEnvelope /> },
    { id: 'donation', label: 'Donation', icon: <FaKey /> }
  ];
  
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
    <div className="card border-0 shadow-sm">
      {/* Tabs */}
      <div className="card-header bg-white p-0">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'general' ? 'active' : ''} d-flex align-items-center`}
              onClick={() => setActiveTab('general')}
            >
              <FaCog className="me-2" />
              General Settings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'email' ? 'active' : ''} d-flex align-items-center`}
              onClick={() => setActiveTab('email')}
            >
              <FaEnvelope className="me-2" />
              Email Configuration
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'donation' ? 'active' : ''} d-flex align-items-center`}
              onClick={() => setActiveTab('donation')}
            >
              <FaKey className="me-2" />
              Donation Settings
            </button>
          </li>
        </ul>
      </div>
      {/* Form */}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <h2 className="text-lg font-bold mb-4">General Settings</h2>
              
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="siteName">
                    Website Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="tagline">
                    Tagline
                  </label>
                  <input
                    type="text"
                    id="tagline"
                    name="tagline"
                    value={generalSettings.tagline}
                    onChange={handleGeneralChange}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="logo">
                    Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={handleFileChange}
                    className="form-control"
                    accept="image/*"
                  />
                  <div className="form-text">Recommended size: 200x50 pixels</div>
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="favicon">
                    Favicon
                  </label>
                  <input
                    type="file"
                    id="favicon"
                    name="favicon"
                    onChange={handleFileChange}
                    className="form-control"
                    accept="image/x-icon, image/png"
                  />
                  <div className="form-text">Recommended size: 32x32 pixels</div>
                </div>
              </div>
              
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={handleGeneralChange}
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={generalSettings.email}
                    onChange={handleGeneralChange}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                  rows="2"
                  className="form-control"
                ></textarea>
              </div>
              
              <h5 className="mb-3">Social Media Links</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="facebook">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={generalSettings.socialLinks.facebook}
                    onChange={handleSocialChange}
                    className="form-control"
                    placeholder="https://facebook.com/your-page"
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="twitter">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={generalSettings.socialLinks.twitter}
                    onChange={handleSocialChange}
                    className="form-control"
                    placeholder="https://twitter.com/your-handle"
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="instagram">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={generalSettings.socialLinks.instagram}
                    onChange={handleSocialChange}
                    className="form-control"
                    placeholder="https://instagram.com/your-profile"
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label" htmlFor="linkedin">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={generalSettings.socialLinks.linkedin}
                    onChange={handleSocialChange}
                    className="form-control"
                    placeholder="https://linkedin.com/company/your-organization"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Email Settings */}
          {activeTab === 'email' && (
            <div>
              <h2 className="text-lg font-bold mb-4">Email Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="smtpServer">
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="smtpPort">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="smtpUsername">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="smtpPassword">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    id="smtpPassword"
                    name="smtpPassword"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderEmail">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderName">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <h3 className="text-md font-bold mb-2 text-blue-800">Test Email Configuration</h3>
                <p className="text-sm text-blue-600 mb-3">
                  Send a test email to verify your configuration is working correctly.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Test
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Donation Settings */}
          {activeTab === 'donation' && (
            <div>
              <h2 className="text-lg font-bold mb-4">Donation Settings</h2>
              
              <h3 className="text-md font-bold mb-3">PayPal</h3>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paypalClientId">
                  PayPal Client ID
                </label>
                <input
                  type="text"
                  id="paypalClientId"
                  name="paypalClientId"
                  value={donationSettings.paypalClientId}
                  onChange={handleDonationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <h3 className="text-md font-bold mb-3">Stripe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stripePublicKey">
                    Stripe Public Key
                  </label>
                  <input
                    type="text"
                    id="stripePublicKey"
                    name="stripePublicKey"
                    value={donationSettings.stripePublicKey}
                    onChange={handleDonationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stripeSecretKey">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    id="stripeSecretKey"
                    name="stripeSecretKey"
                    value={donationSettings.stripeSecretKey}
                    onChange={handleDonationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <h3 className="text-md font-bold mb-3">General Donation Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currencyCode">
                    Currency
                  </label>
                  <select
                    id="currencyCode"
                    name="currencyCode"
                    value={donationSettings.currencyCode}
                    onChange={handleDonationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="suggestedAmounts">
                    Suggested Donation Amounts (comma separated)
                  </label>
                  <input
                    type="text"
                    id="suggestedAmounts"
                    name="suggestedAmounts"
                    value={donationSettings.suggestedAmounts}
                    onChange={handleDonationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowCustomAmount"
                    checked={donationSettings.allowCustomAmount}
                    onChange={handleDonationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Allow custom donation amount</span>
                </label>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thankYouMessage">
                  Thank You Message
                </label>
                <textarea
                  id="thankYouMessage"
                  name="thankYouMessage"
                  value={donationSettings.thankYouMessage}
                  onChange={handleDonationChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Save Button */}
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
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
