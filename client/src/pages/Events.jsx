import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaSearch, FaClock, FaUsers } from 'react-icons/fa';

const Events = () => {
  // State for events data
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fundraising', name: 'Fundraising' },
    { id: 'community', name: 'Community' },
    { id: 'volunteer', name: 'Volunteer' },
    { id: 'awareness', name: 'Awareness' }
  ];
  const dateFilters = [
    { id: 'all', name: 'All Upcoming' },
    { id: 'thisMonth', name: 'This Month' },
    { id: 'nextMonth', name: 'Next Month' },
    { id: 'thisYear', name: 'This Year' }
  ];

  // Mock event data later will be an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Annual Charity Gala',
          description: 'Join us for an elegant evening of dinner, dancing, and fundraising to support our humanitarian initiatives for families affected by crisis.',
          date: '2025-06-15',
          time: '7:00 PM - 11:00 PM',
          location: 'Grand Ballroom, City Center',
          image: '/images/harold.jpg',
          category: 'fundraising',
          isFeatured: true,
          attendees: 120,
          registrationUrl: '/events/register/annual-charity-gala'
        },
        {
          id: 2,
          title: 'Community Cleanup Day',
          description: 'Help us make a difference in our local community by participating in our cleanup initiative at Riverside Park.',
          date: '2025-07-08',
          time: '9:00 AM - 1:00 PM',
          location: 'Riverside Park',
          image: '/images/harold.jpg',
          category: 'volunteer',
          isFeatured: true,
          attendees: 45,
          registrationUrl: '/events/register/community-cleanup'
        },
        {
          id: 3,
          title: 'Back to School Drive',
          description: 'Help provide school supplies for children from disadvantaged backgrounds as they prepare for the new academic year.',
          date: '2025-08-20',
          time: '10:00 AM - 4:00 PM',
          location: 'Community Center',
          image: '/images/harold.jpg',
          category: 'community',
          isFeatured: true,
          attendees: 75,
          registrationUrl: '/events/register/back-to-school'
        },
        {
          id: 4,
          title: 'Crisis Response Workshop',
          description: 'Learn essential skills for responding to humanitarian crises and how our organization provides immediate support.',
          date: '2025-06-22',
          time: '2:00 PM - 5:00 PM',
          location: 'Online Webinar',
          image: '/images/harold.jpg',
          category: 'awareness',
          isFeatured: false,
          attendees: 90,
          registrationUrl: '/events/register/crisis-response-workshop'
        },
        {
          id: 5,
          title: 'Volunteer Training Session',
          description: 'Comprehensive training for new volunteers who want to contribute to our humanitarian mission.',
          date: '2025-07-15',
          time: '6:00 PM - 8:00 PM',
          location: 'SecretDetours Office',
          image: '/images/harold.jpg',
          category: 'volunteer',
          isFeatured: false,
          attendees: 30,
          registrationUrl: '/events/register/volunteer-training'
        },
        {
          id: 6,
          title: 'Family Support Fundraiser',
          description: 'A family-friendly event to raise funds for our programs supporting families affected by crises worldwide.',
          date: '2025-08-05',
          time: '11:00 AM - 3:00 PM',
          location: 'City Park Pavilion',
          image: '/images/harold.jpg',
          category: 'fundraising',
          isFeatured: false,
          attendees: 85,
          registrationUrl: '/events/register/family-support-fundraiser'
        },
        {
          id: 7,
          title: 'Ukraine Relief Information Session',
          description: 'Learn about our ongoing efforts to support families affected by the crisis in Ukraine and how you can help.',
          date: '2025-09-10',
          time: '7:00 PM - 8:30 PM',
          location: 'Community Library',
          image: '/images/harold.jpg',
          category: 'awareness',
          isFeatured: false,
          attendees: 60,
          registrationUrl: '/events/register/ukraine-relief-session'
        },
        {
          id: 8,
          title: 'Holiday Gift Drive',
          description: 'Help bring joy to children in crisis during the holiday season by donating gifts and essential items.',
          date: '2025-12-01',
          time: '9:00 AM - 6:00 PM',
          location: 'Multiple Locations',
          image: '/images/harold.jpg',
          category: 'community',
          isFeatured: false,
          attendees: 150,
          registrationUrl: '/events/register/holiday-gift-drive'
        },
      ];

      setEvents(mockEvents);
      setFeaturedEvents(mockEvents.filter(event => event.isFeatured));
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter events based on search, category, and date
  useEffect(() => {
    if (events.length === 0) return;
    
    let filtered = [...events];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        
        if (dateFilter === 'thisMonth') {
          return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        } else if (dateFilter === 'nextMonth') {
          return (eventDate.getMonth() === (currentMonth + 1) % 12) && 
                 (currentMonth === 11 ? eventDate.getFullYear() === currentYear + 1 : eventDate.getFullYear() === currentYear);
        } else if (dateFilter === 'thisYear') {
          return eventDate.getFullYear() === currentYear;
        }
        
        return true;
      });
    }
    
    setFilteredEvents(filtered);
  }, [events, searchTerm, categoryFilter, dateFilter]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section py-5 position-relative d-flex align-items-center justify-content-center" 
        style={{ 
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)'
        }}
      >
        {/* Background patterns */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '30px 30px',
          opacity: 0.6
        }}></div>
        
        {/* Background overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            backgroundImage: 'url(/images/harold.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            opacity: 0.4
          }}
        ></div>
        
        <div className="container-custom position-relative z-2 text-center text-white py-5">
          <div className="bg-blur p-4 p-md-5 rounded-4" style={{ 
            backdropFilter: 'blur(10px)', 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <h1 className="display-3 fw-bold mb-4">
              Upcoming Events
            </h1>
            <p className="lead fs-4 mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Join us in making a difference through our community events and fundraisers
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section className="section py-5 bg-light">
          <div className="container-custom">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Featured Events</h2>
              <div className="mx-auto mb-4" style={{ 
                width: '120px', 
                height: '4px', 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
              }}></div>
              <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
                Our most anticipated upcoming events that you won't want to miss
              </p>
            </div>
            
            <div className="row g-4">
              {featuredEvents.map((event) => (
                <div key={event.id} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="card-img-top h-100 w-100"
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                    </div>
                    
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="badge" style={{ 
                          backgroundColor: 'rgba(26, 42, 108, 0.1)', 
                          color: '#1a2a6c',
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          borderRadius: '50px'
                        }}>
                          {categories.find(cat => cat.id === event.category)?.name}
                        </span>
                        <span className="ms-auto d-flex align-items-center" style={{ fontSize: '0.85rem', color: '#666' }}>
                          <FaUsers className="me-1" size={14} />
                          {event.attendees} attending
                        </span>
                      </div>
                      
                      <h3 className="card-title h4 fw-bold mb-3">{event.title}</h3>
                      <p className="card-text text-muted mb-3" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.5rem',
                        height: '4.5rem'
                      }}>{event.description}</p>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaCalendarAlt className="me-2" style={{ color: '#1a2a6c' }} />
                          <span className="text-muted">{formatDate(event.date)}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <FaClock className="me-2" style={{ color: '#1a2a6c' }} />
                          <span className="text-muted">{event.time}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="me-2" style={{ color: '#1a2a6c' }} />
                          <span className="text-muted">{event.location}</span>
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <Link 
                          to={event.registrationUrl} 
                          className="btn py-2" 
                          style={{ 
                            background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                            border: 'none', 
                            color: 'white',
                            fontWeight: '600',
                            boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                          }}
                        >
                          Register Now
                        </Link>
                        <Link 
                          to={`/events/${event.id}`} 
                          className="btn btn-outline-secondary py-2"
                        >
                          Event Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Event Finder Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="row g-4">
            <div className="col-lg-3">
              {/* Filter Sidebar */}
              <div className="card border-0 shadow-sm rounded-4 mb-4 sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-4">Find Events</h3>
                  
                  {/* Search */}
                  <div className="mb-4">
                    <label htmlFor="searchEvents" className="form-label fw-medium">Search</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="searchEvents"
                        className="form-control"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="input-group-text bg-primary text-white">
                        <FaSearch />
                      </span>
                    </div>
                  </div>
                  
                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Category</label>
                    <div className="d-grid gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`btn text-start py-2 ${categoryFilter === category.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => setCategoryFilter(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Date</label>
                    <div className="d-grid gap-2">
                      {dateFilters.map(filter => (
                        <button
                          key={filter.id}
                          className={`btn text-start py-2 ${dateFilter === filter.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => setDateFilter(filter.id)}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reset Filters */}
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setDateFilter('all');
                    }}
                  >
                    <FaFilter className="me-2" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-9">
              {/* Events List */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 fw-bold mb-0">All Events</h2>
                <span className="text-muted">Showing {filteredEvents.length} events</span>
              </div>
              
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-5">
                  <h3 className="h4 text-muted">No events found matching your criteria</h3>
                  <p>Try adjusting your filters to find more events.</p>
                </div>
              ) : (
                <div className="row row-cols-1 g-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="col">
                      <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{
                        borderRadius: '16px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}>
                        <div className="row g-0 h-100">
                          <div className="col-md-4" style={{ maxHeight: '100%' }}>
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="h-100 w-100" 
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4 d-flex flex-column h-100">
                              <div className="mb-2">
                                <span className="badge" style={{ 
                                  backgroundColor: 'rgba(26, 42, 108, 0.1)', 
                                  color: '#1a2a6c',
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  borderRadius: '50px'
                                }}>
                                  {categories.find(cat => cat.id === event.category)?.name}
                                </span>
                              </div>
                              
                              <h3 className="card-title h4 fw-bold mb-3">{event.title}</h3>
                              <p className="card-text text-muted mb-3">{event.description}</p>
                              
                              <div className="row mb-3 g-3">
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" style={{ color: '#1a2a6c' }} />
                                    <span className="text-muted">{formatDate(event.date)}</span>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <FaClock className="me-2" style={{ color: '#1a2a6c' }} />
                                    <span className="text-muted">{event.time}</span>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-2" style={{ color: '#1a2a6c' }} />
                                    <span className="text-muted">{event.location}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="d-flex mt-auto gap-2">
                                <Link 
                                  to={event.registrationUrl} 
                                  className="btn py-2" 
                                  style={{ 
                                    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                                    border: 'none', 
                                    color: 'white',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                                  }}
                                >
                                  Register
                                </Link>
                                <Link 
                                  to={`/events/${event.id}`} 
                                  className="btn btn-outline-secondary py-2"
                                >
                                  Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Events CTA */}
      <section className="section py-5 text-white" style={{ background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="row align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <h2 className="display-5 fw-bold mb-3">Want to Organize an Event?</h2>
              <p className="lead mb-0">If you're interested in organizing a fundraising event for Detour Charity, we'd love to hear from you!</p>
            </div>
            <div className="col-lg-4 text-center text-lg-end mt-4 mt-lg-0">
              <Link 
                to="/contact" 
                className="btn btn-lg py-3 px-4" 
                style={{ 
                  background: 'white', 
                  color: '#1a2a6c',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
              >
                Contact Us
                <FaArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;