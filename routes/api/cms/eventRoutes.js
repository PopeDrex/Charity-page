const express = require('express');
const router = express.Router();

// Sample data - in a real app this would come from a database
let events = [
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

// Get all events
router.get('/', (req, res) => {
  res.json(events);
});

// Get a single event by ID
router.get('/:id', (req, res) => {
  const event = events.find(event => event.id === parseInt(req.params.id));
  
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  res.json(event);
});

// Create a new event
router.post('/', (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    address,
    capacity,
    registrationRequired
  } = req.body;
  
  // Validate required fields
  if (!title || !description || !date || !time || !location || !address) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  // Determine if event is upcoming or past
  const eventDate = new Date(date);
  const today = new Date();
  const status = eventDate > today ? 'upcoming' : 'past';
  
  // Create new event object
  const newEvent = {
    id: events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1,
    title,
    description,
    date,
    time,
    location,
    address,
    capacity: parseInt(capacity) || 0,
    registrationRequired: !!registrationRequired,
    attendees: 0,
    status
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Update an existing event
router.put('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  // Check if date changed and update status accordingly
  let status = events[eventIndex].status;
  if (req.body.date) {
    const eventDate = new Date(req.body.date);
    const today = new Date();
    status = eventDate > today ? 'upcoming' : 'past';
  }
  
  const updatedEvent = {
    ...events[eventIndex],
    ...req.body,
    id: eventId, // Ensure ID doesn't change
    status,
    capacity: req.body.capacity ? parseInt(req.body.capacity) : events[eventIndex].capacity
  };
  
  events[eventIndex] = updatedEvent;
  res.json(updatedEvent);
});

// Delete an event
router.delete('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  const deletedEvent = events[eventIndex];
  events = events.filter(event => event.id !== eventId);
  
  res.json({ message: 'Event deleted successfully', deletedEvent });
});

// Register attendee for an event
router.post('/:id/register', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  const event = events[eventIndex];
  
  // Check if event is in the past
  if (event.status === 'past') {
    return res.status(400).json({ message: 'Cannot register for past events' });
  }
  
  // Check if event is at capacity
  if (event.capacity > 0 && event.attendees >= event.capacity) {
    return res.status(400).json({ message: 'Event is at full capacity' });
  }
  
  // Register attendee
  event.attendees += 1;
  res.json({ message: 'Registration successful', event });
});

module.exports = router;
