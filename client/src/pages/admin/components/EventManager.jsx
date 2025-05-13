import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaSort } from 'react-icons/fa';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  
  // Form state for creating/editing events
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    address: '',
    capacity: '',
    registrationRequired: false,
    image: null
  });
  
  useEffect(() => {
    // Simulate fetching events from API
    const fetchEvents = async () => {
      try {
        // In a real app: const response = await axios.get('/api/events');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockEvents = [
          {
            id: 1,
            title: 'Annual Charity Gala',
            description: 'Join us for an evening of celebration, recognition, and fundraising.',
            date: '2025-06-15',
            time: '19:00',
            location: 'Grand Ballroom, City Center',
            address: '123 Main St, City Center',
            capacity: 200,
            registrationRequired: true,
            attendees: 86,
            status: 'upcoming'
          },
          {
            id: 2,
            title: 'Community Cleanup Day',
            description: 'Help us clean and beautify our local park and community spaces.',
            date: '2025-07-08',
            time: '09:00',
            location: 'Riverside Park',
            address: '45 River Rd, Riverside',
            capacity: 50,
            registrationRequired: true,
            attendees: 23,
            status: 'upcoming'
          },
          {
            id: 3,
            title: 'Back to School Drive',
            description: 'Help us provide school supplies to children in need for the upcoming school year.',
            date: '2025-08-20',
            time: '10:00',
            location: 'Community Center',
            address: '789 Community Way, Downtown',
            capacity: 0,
            registrationRequired: false,
            attendees: 0,
            status: 'upcoming'
          },
          {
            id: 4,
            title: 'Volunteer Appreciation Dinner',
            description: 'A special dinner to recognize and thank our dedicated volunteers.',
            date: '2025-05-05',
            time: '18:00',
            location: 'City Restaurant',
            address: '555 Food Ave, Foodville',
            capacity: 75,
            registrationRequired: true,
            attendees: 75,
            status: 'past'
          },
          {
            id: 5,
            title: 'Health and Wellness Workshop',
            description: 'Learn about health, nutrition, and wellness from our expert speakers.',
            date: '2025-04-12',
            time: '14:00',
            location: 'Wellness Center',
            address: '123 Health St, Wellness District',
            capacity: 30,
            registrationRequired: true,
            attendees: 27,
            status: 'past'
          }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Handle search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Open modal for creating/editing an event
  const openEventModal = (event = null) => {
    if (event) {
      // Edit existing event
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        address: event.address,
        capacity: event.capacity,
        registrationRequired: event.registrationRequired,
        image: null
      });
    } else {
      // Create new event
      setCurrentEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        address: '',
        capacity: '',
        registrationRequired: false,
        image: null
      });
    }
    setShowModal(true);
  };
  
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would upload the image and send the data to your API
    console.log('Form data to submit:', formData);
    
    // Determine if the event is upcoming or past
    const eventDate = new Date(formData.date);
    const today = new Date();
    const status = eventDate > today ? 'upcoming' : 'past';
    
    // Simulate successful submission
    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      address: formData.address,
      capacity: parseInt(formData.capacity) || 0,
      registrationRequired: formData.registrationRequired,
      attendees: currentEvent ? currentEvent.attendees : 0,
      status: status
    };
    
    if (currentEvent) {
      // Update existing event
      setEvents(events.map(event => event.id === currentEvent.id ? newEvent : event));
    } else {
      // Add new event
      setEvents([newEvent, ...events]);
    }
    
    setShowModal(false);
  };
  
  // Delete an event
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // In a real app: await axios.delete(`/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
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
      {/* Header with search and add button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div className="position-relative">
          <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
            <FaSearch className="text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="form-control ps-5"
            style={{ maxWidth: '350px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => openEventModal()}
          className="btn btn-primary d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          New Event
        </button>
      </div>
      
      {/* Events Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSortConfig({ key: 'date', direction: 'asc' })}
            className={`pb-4 font-medium text-sm border-b-2 ${
              sortConfig.key === 'date' && sortConfig.direction === 'asc'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setSortConfig({ key: 'date', direction: 'desc' })}
            className={`pb-4 font-medium text-sm border-b-2 ${
              sortConfig.key === 'date' && sortConfig.direction === 'desc'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past Events
          </button>
        </nav>
      </div>
      
      {/* Events Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th 
                    scope="col" 
                    className="cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="d-flex align-items-center">
                      Event 
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="d-flex align-items-center">
                      Date/Time
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="d-flex align-items-center">
                      Location
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="d-flex align-items-center">
                      Status
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer"
                    onClick={() => handleSort('attendees')}
                  >
                    <div className="d-flex align-items-center">
                      Attendance
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="fw-medium">{event.title}</div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">{event.date}</div>
                        <div className="small text-muted">{event.time}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">{event.location}</div>
                        <div className="small text-muted">{event.address}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${event.status === 'upcoming' ? 'bg-success' : 'bg-secondary'}`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">
                          {event.attendees} {event.registrationRequired ? 'registered' : 'attended'}
                        </div>
                        {event.capacity > 0 && (
                          <div className="small text-muted">
                            {event.attendees}/{event.capacity} capacity
                          </div>
                        )}
                        {event.capacity === 0 && (
                          <div className="small text-muted">Unlimited capacity</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                          onClick={() => openEventModal(event)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }} onClick={() => setShowModal(false)}></div>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentEvent ? 'Edit Event' : 'Create New Event'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="date">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="time">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                
                  <div className="mb-3">
                    <label className="form-label" htmlFor="location">
                      Location Name
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Event Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                    />
                  </div>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="registrationRequired"
                          name="registrationRequired"
                          checked={formData.registrationRequired}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="registrationRequired">
                          Registration required
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="capacity">
                        Capacity (0 for unlimited)
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="0"
                        className="form-control"
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {currentEvent ? 'Update Event' : 'Create Event'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManager;
