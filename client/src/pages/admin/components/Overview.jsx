import { useState, useEffect } from 'react';
import { FaNewspaper, FaCalendarAlt, FaHandHoldingHeart, FaUsers, FaEye, FaComments, FaHeart } from 'react-icons/fa';

const Overview = () => {
  // Mock data - would normally be fetched from your API
  const [stats, setStats] = useState({
    posts: 0,
    events: 0,
    programs: 0,
    donations: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const statsResponse = await axios.get('/api/admin/stats');
        // const activityResponse = await axios.get('/api/admin/recent-activity');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStats = {
          posts: 24,
          events: 8,
          programs: 4,
          donations: 156
        };
        
        const mockActivity = [
          { id: 1, type: 'post', title: 'Community Outreach Success', action: 'created', user: 'Sarah Johnson', time: '2 hours ago' },
          { id: 2, type: 'donation', title: '$500 donation received', action: 'processed', user: 'System', time: '5 hours ago' },
          { id: 3, type: 'event', title: 'Annual Charity Gala', action: 'updated', user: 'Mike Peterson', time: '1 day ago' },
          { id: 4, type: 'comment', title: 'New comment on "Educational Programs"', action: 'received', user: 'Visitor', time: '1 day ago' },
          { id: 5, type: 'program', title: 'Housing Assistance', action: 'updated', user: 'Sarah Johnson', time: '2 days ago' },
          { id: 6, type: 'post', title: 'New Educational Initiative', action: 'created', user: 'Sarah Johnson', time: '3 days ago' },
        ];
        
        setStats(mockStats);
        setRecentActivity(mockActivity);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Stats cards data
  const statsCards = [
    { title: 'Blog Posts', value: stats.posts, icon: <FaNewspaper className="text-blue-500" />, bgColor: 'bg-blue-100' },
    { title: 'Events', value: stats.events, icon: <FaCalendarAlt className="text-green-500" />, bgColor: 'bg-green-100' },
    { title: 'Programs', value: stats.programs, icon: <FaHandHoldingHeart className="text-purple-500" />, bgColor: 'bg-purple-100' },
    { title: 'Donations', value: stats.donations, icon: <FaHeart className="text-red-500" />, bgColor: 'bg-red-100' }
  ];
  
  // Function to get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'post': return <FaNewspaper className="text-blue-500" />;
      case 'event': return <FaCalendarAlt className="text-green-500" />;
      case 'program': return <FaHandHoldingHeart className="text-purple-500" />;
      case 'donation': return <FaHeart className="text-red-500" />;
      case 'comment': return <FaComments className="text-yellow-500" />;
      default: return <FaEye className="text-gray-500" />;
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
  
  // Updated background colors for Bootstrap
  const cardStyles = [
    { icon: <FaNewspaper />, bgClass: 'bg-primary bg-opacity-10 text-primary' },
    { icon: <FaCalendarAlt />, bgClass: 'bg-success bg-opacity-10 text-success' },
    { icon: <FaHandHoldingHeart />, bgClass: 'bg-info bg-opacity-10 text-info' },
    { icon: <FaHeart />, bgClass: 'bg-danger bg-opacity-10 text-danger' },
  ];
  
  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statsCards.map((card, index) => (
          <div key={index} className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className={`rounded-circle p-3 me-3 ${cardStyles[index].bgClass}`}>
                    {card.icon}
                  </div>
                  <div>
                    <h6 className="card-subtitle mb-1 text-muted">{card.title}</h6>
                    <h2 className="card-title mb-0 fw-bold">{card.value}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Quick Actions</h5>
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <button className="btn btn-outline-primary d-flex align-items-center justify-content-center w-100 py-2">
                <FaNewspaper className="me-2" />
                Create Blog Post
              </button>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <button className="btn btn-outline-success d-flex align-items-center justify-content-center w-100 py-2">
                <FaCalendarAlt className="me-2" />
                Add Event
              </button>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <button className="btn btn-outline-info d-flex align-items-center justify-content-center w-100 py-2">
                <FaHandHoldingHeart className="me-2" />
                Update Program
              </button>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center w-100 py-2">
                <FaUsers className="me-2" />
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Recent Activity</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">User</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3 text-center" style={{ width: '40px', height: '40px' }}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <div className="fw-medium">{activity.title}</div>
                          <div className="small text-muted">
                            {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {activity.user}
                    </td>
                    <td>
                      <span className="small text-muted">{activity.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
