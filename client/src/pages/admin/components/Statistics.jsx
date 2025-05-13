import { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaHeart, FaCalendarAlt, FaNewspaper, FaHandHoldingHeart } from 'react-icons/fa';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({
    visitorStats: [],
    donationStats: [],
    eventsStats: [],
    topPages: [],
    totalDonations: 0,
    totalVisitors: 0,
    totalEvents: 0
  });
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // In a real app: const response = await axios.get(`/api/admin/statistics?range=${timeRange}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock data based on selected time range
        let visitorData = [];
        let donationData = [];
        let eventsData = [];
        
        // Different date ranges based on selection
        const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
        
        // Create mock data for the selected range
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          
          // Only include every 5th day for month view, every 30th day for year view to avoid cluttering
          if (
            (timeRange === 'week') || 
            (timeRange === 'month' && i % 5 === 0) || 
            (timeRange === 'year' && i % 30 === 0)
          ) {
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            // Random data
            const visitors = Math.floor(Math.random() * 100) + 20;
            const donations = Math.floor(Math.random() * 1000) + 100;
            const events = Math.floor(Math.random() * 3);
            
            visitorData.push({ date: dateStr, value: visitors });
            donationData.push({ date: dateStr, value: donations });
            eventsData.push({ date: dateStr, value: events });
          }
        }
        
        const mockStats = {
          visitorStats: visitorData,
          donationStats: donationData,
          eventsStats: eventsData,
          topPages: [
            { page: 'Home', views: 1250, percentage: 35 },
            { page: 'Donate', views: 845, percentage: 24 },
            { page: 'Programs', views: 630, percentage: 18 },
            { page: 'Events', views: 425, percentage: 12 },
            { page: 'Blog', views: 320, percentage: 9 },
            { page: 'Contact', views: 75, percentage: 2 }
          ],
          totalDonations: donationData.reduce((sum, item) => sum + item.value, 0),
          totalVisitors: visitorData.reduce((sum, item) => sum + item.value, 0),
          totalEvents: eventsData.reduce((sum, item) => sum + item.value, 0)
        };
        
        setStats(mockStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      }
    };
    
    fetchStatistics();
  }, [timeRange]);
  
  const renderBarChart = (data, title, colorClass) => {
    const maxValue = Math.max(...data.map(item => item.value), 1);
    
    // Map Tailwind colors to Bootstrap
    const colorMap = {
      'bg-blue-500': 'bg-primary',
      'bg-green-500': 'bg-success'
    };
    
    const bsColor = colorMap[colorClass] || 'bg-primary';
    
    return (
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title mb-4">{title}</h5>
          <div className="d-flex flex-column gap-3">
            {data.map((item, index) => (
              <div key={index} className="d-flex align-items-center">
                <div className="small text-muted" style={{ width: '80px' }}>{item.date}</div>
                <div className="flex-grow-1 px-2">
                  <div className="progress" style={{ height: '24px' }}>
                    <div 
                      className={`progress-bar ${bsColor}`}
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                      aria-valuenow={item.value}
                      aria-valuemin="0"
                      aria-valuemax={maxValue}
                    ></div>
                  </div>
                </div>
                <div className="text-end small fw-medium" style={{ width: '70px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold mb-3 mb-sm-0">Performance Statistics</h2>
        
        <div className="btn-group shadow-sm">
          <button
            onClick={() => setTimeRange('week')}
            className={`btn ${timeRange === 'week' ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`btn ${timeRange === 'month' ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`btn ${timeRange === 'year' ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3 text-center" style={{ width: '60px', height: '60px' }}>
                  <FaUsers className="text-primary fs-4" />
                </div>
                <div>
                  <p className="card-subtitle text-muted mb-1">Total Visitors</p>
                  <h3 className="fs-2 fw-bold mb-0">{stats.totalVisitors.toLocaleString()}</h3>
                  <p className="small text-muted mb-0">Last {timeRange}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-success bg-opacity-10 me-3 text-center" style={{ width: '60px', height: '60px' }}>
                  <FaHeart className="text-success fs-4" />
                </div>
                <div>
                  <p className="card-subtitle text-muted mb-1">Total Donations</p>
                  <h3 className="fs-2 fw-bold mb-0">${stats.totalDonations.toLocaleString()}</h3>
                  <p className="small text-muted mb-0">Last {timeRange}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle p-3 bg-info bg-opacity-10 me-3 text-center" style={{ width: '60px', height: '60px' }}>
                  <FaCalendarAlt className="text-info fs-4" />
                </div>
                <div>
                  <p className="card-subtitle text-muted mb-1">Events Held</p>
                  <h3 className="fs-2 fw-bold mb-0">{stats.totalEvents}</h3>
                  <p className="small text-muted mb-0">Last {timeRange}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          {renderBarChart(stats.visitorStats, 'Website Visitors', 'bg-blue-500')}
        </div>
        <div className="col-12 col-lg-6">
          {renderBarChart(stats.donationStats, 'Donation Amounts ($)', 'bg-green-500')}
        </div>
      </div>
      
      {/* Top Pages */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Most Visited Pages</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Page</th>
                  <th scope="col" className="text-end">Views</th>
                  <th scope="col">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.map((page, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3 text-center" style={{ width: '40px', height: '40px' }}>
                          {page.page === 'Home' && <FaChartLine className="text-secondary" />}
                          {page.page === 'Donate' && <FaHeart className="text-danger" />}
                          {page.page === 'Programs' && <FaHandHoldingHeart className="text-info" />}
                          {page.page === 'Events' && <FaCalendarAlt className="text-success" />}
                          {page.page === 'Blog' && <FaNewspaper className="text-primary" />}
                          {page.page === 'Contact' && <FaUsers className="text-warning" />}
                        </div>
                        <div>
                          <div className="fw-medium">/{page.page.toLowerCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-end fw-medium">
                      {page.views.toLocaleString()}
                    </td>
                    <td style={{ width: '40%' }}>
                      <div className="d-flex align-items-center">
                        <div className="progress flex-grow-1" style={{ height: '10px' }}>
                          <div 
                            className="progress-bar bg-primary" 
                            style={{ width: `${page.percentage}%` }}
                            aria-valuenow={page.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span className="ms-2 small text-muted">{page.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Content Overview */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Content Overview</h5>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <FaNewspaper className="text-primary me-2" />
                    <h6 className="card-subtitle mb-0 fw-medium">Blog Posts</h6>
                  </div>
                  <h2 className="display-6 fw-bold mb-1">24</h2>
                  <p className="small text-muted">5 published this {timeRange}</p>
                </div>
              </div>
            </div>
            
            <div className="col-12 col-md-4">
              <div className="card h-100 border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <FaCalendarAlt className="text-success me-2" />
                    <h6 className="card-subtitle mb-0 fw-medium">Events</h6>
                  </div>
                  <h2 className="display-6 fw-bold mb-1">8</h2>
                  <p className="small text-muted">2 upcoming</p>
                </div>
              </div>
            </div>
            
            <div className="col-12 col-md-4">
              <div className="card h-100 border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <FaHandHoldingHeart className="text-info me-2" />
                    <h6 className="card-subtitle mb-0 fw-medium">Programs</h6>
                  </div>
                  <h2 className="display-6 fw-bold mb-1">6</h2>
                  <p className="small text-muted">All active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
