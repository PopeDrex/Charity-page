import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaHeart, FaEdit, FaClock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [donations, setDonations] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState([]);
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: { pathname: '/profile' } }} />;
  }
  
  // Mock data for demonstration purposes
  useEffect(() => {
    // Simulated API call to get user donations
    setDonations([
      { id: 1, date: '2025-04-25', amount: 50.00, campaign: 'Education Fund' },
      { id: 2, date: '2025-03-12', amount: 25.00, campaign: 'Emergency Relief' },
      { id: 3, date: '2025-02-01', amount: 100.00, campaign: 'Medical Aid' }
    ]);
    
    // Simulated API call to get volunteer hours
    setVolunteerHours([
      { id: 1, date: '2025-05-01', hours: 3, program: 'Food Distribution' },
      { id: 2, date: '2025-04-15', hours: 2, program: 'Community Outreach' }
    ]);
  }, []);
  
  return (
    <section className="bg-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-white p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                    <FaUser className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                    <p className="text-white/80">{currentUser.email}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b">
              <nav className="flex flex-wrap">
                <button
                  className={`px-6 py-3 text-gray-700 font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="inline mr-2" />
                  Profile
                </button>
                <button
                  className={`px-6 py-3 text-gray-700 font-medium ${activeTab === 'donations' ? 'border-b-2 border-primary text-primary' : ''}`}
                  onClick={() => setActiveTab('donations')}
                >
                  <FaHeart className="inline mr-2" />
                  Donations
                </button>
                <button
                  className={`px-6 py-3 text-gray-700 font-medium ${activeTab === 'volunteer' ? 'border-b-2 border-primary text-primary' : ''}`}
                  onClick={() => setActiveTab('volunteer')}
                >
                  <FaClock className="inline mr-2" />
                  Volunteer Hours
                </button>
              </nav>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={currentUser.name}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={currentUser.email}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                        disabled
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button className="flex items-center text-primary">
                        <FaEdit className="mr-2" />
                        Edit Profile Information
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailUpdates"
                          className="mr-3 h-5 w-5 text-primary"
                          defaultChecked
                        />
                        <label htmlFor="emailUpdates">Email updates about our programs and initiatives</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="donationReceipts"
                          className="mr-3 h-5 w-5 text-primary"
                          defaultChecked
                        />
                        <label htmlFor="donationReceipts">Donation receipts and acknowledgements</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="eventReminders"
                          className="mr-3 h-5 w-5 text-primary"
                          defaultChecked
                        />
                        <label htmlFor="eventReminders">Event reminders and volunteer opportunities</label>
                      </div>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'donations' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Donation History</h2>
                    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                      Make a Donation
                    </button>
                  </div>
                  
                  {donations.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Campaign</th>
                            <th className="py-3 px-6 text-right">Amount</th>
                            <th className="py-3 px-6 text-center">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600">
                          {donations.map(donation => (
                            <tr key={donation.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-6 text-left whitespace-nowrap">
                                {new Date(donation.date).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {donation.campaign}
                              </td>
                              <td className="py-3 px-6 text-right">
                                ${donation.amount.toFixed(2)}
                              </td>
                              <td className="py-3 px-6 text-center">
                                <button className="text-blue-500 hover:underline">Download</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaHistory className="mx-auto text-4xl text-gray-300 mb-2" />
                      <p className="text-gray-500">No donation history yet.</p>
                      <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                        Make Your First Donation
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'volunteer' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Volunteer Activity</h2>
                    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                      Sign Up to Volunteer
                    </button>
                  </div>
                  
                  {volunteerHours.length > 0 ? (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Total Hours: {volunteerHours.reduce((total, record) => total + record.hours, 0)}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">35% to your next achievement badge</p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                              <th className="py-3 px-6 text-left">Date</th>
                              <th className="py-3 px-6 text-left">Program</th>
                              <th className="py-3 px-6 text-right">Hours</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600">
                            {volunteerHours.map(record => (
                              <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                  {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-6 text-left">
                                  {record.program}
                                </td>
                                <td className="py-3 px-6 text-right">
                                  {record.hours}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaHistory className="mx-auto text-4xl text-gray-300 mb-2" />
                      <p className="text-gray-500">No volunteer history yet.</p>
                      <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                        Find Volunteer Opportunities
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
