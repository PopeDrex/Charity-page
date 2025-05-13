const express = require('express');
const router = express.Router();

// Import CMS route handlers
const blogRoutes = require('./blogRoutes');
const eventRoutes = require('./eventRoutes');
const programRoutes = require('./programRoutes');
const settingsRoutes = require('./settingsRoutes');

// Mount CMS routes
router.use('/blogs', blogRoutes);
router.use('/events', eventRoutes);
router.use('/programs', programRoutes);
router.use('/settings', settingsRoutes);

// Get CMS dashboard stats
router.get('/stats', (req, res) => {
  // In a real implementation, fetch data from database
  const stats = {
    posts: 24,
    events: 8,
    programs: 4,
    donations: 156
  };
  
  res.json(stats);
});

// Get recent activity for dashboard
router.get('/recent-activity', (req, res) => {
  // In a real implementation, fetch from database
  const recentActivity = [
    { id: 1, type: 'post', title: 'Community Outreach Success', action: 'created', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, type: 'donation', title: '$500 donation received', action: 'processed', user: 'System', time: '5 hours ago' },
    { id: 3, type: 'event', title: 'Annual Charity Gala', action: 'updated', user: 'Mike Peterson', time: '1 day ago' },
    { id: 4, type: 'comment', title: 'New comment on "Educational Programs"', action: 'received', user: 'Visitor', time: '1 day ago' },
    { id: 5, type: 'program', title: 'Housing Assistance', action: 'updated', user: 'Sarah Johnson', time: '2 days ago' },
    { id: 6, type: 'post', title: 'New Educational Initiative', action: 'created', user: 'Sarah Johnson', time: '3 days ago' }
  ];
  
  res.json(recentActivity);
});

module.exports = router;
