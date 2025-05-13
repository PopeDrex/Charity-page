const express = require('express');
const router = express.Router();

// Sample data - in a real app this would come from a database
let blogPosts = [
  {
    id: 1,
    title: 'Community Outreach Success in Downtown Area',
    excerpt: 'Our recent community outreach program has exceeded expectations with record attendance.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget turpis consectetur efficitur. Nullam eget felis eget turpis consectetur efficitur.',
    category: 'Community',
    author: 'Sarah Johnson',
    date: '2025-05-10',
    status: 'published',
    featured: true,
    views: 234
  },
  {
    id: 2,
    title: 'New Educational Program Launches Next Month',
    excerpt: 'We are excited to announce our new educational initiative starting next month.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget turpis consectetur efficitur. Nullam eget felis eget turpis consectetur efficitur.',
    category: 'Education',
    author: 'Mike Peterson',
    date: '2025-04-28',
    status: 'published',
    featured: false,
    views: 156
  },
  {
    id: 3,
    title: 'Annual Fundraiser Exceeds Donation Goals',
    excerpt: 'Thanks to our generous donors, we\'ve exceeded our annual fundraising target.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget turpis consectetur efficitur. Nullam eget felis eget turpis consectetur efficitur.',
    category: 'Fundraising',
    author: 'Sarah Johnson',
    date: '2025-04-15',
    status: 'published',
    featured: true,
    views: 319
  },
  {
    id: 4,
    title: 'Volunteer Spotlight: Meet John Davis',
    excerpt: 'This month we highlight the incredible contributions of long-time volunteer John Davis.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget turpis consectetur efficitur. Nullam eget felis eget turpis consectetur efficitur.',
    category: 'Volunteers',
    author: 'Emma Wilson',
    date: '2025-04-08',
    status: 'published',
    featured: false,
    views: 92
  },
  {
    id: 5,
    title: 'Upcoming Changes to Our Housing Program',
    excerpt: 'Learn about the exciting enhancements coming to our housing assistance initiative.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget turpis consectetur efficitur. Nullam eget felis eget turpis consectetur efficitur.',
    category: 'Housing',
    author: 'Mike Peterson',
    date: '2025-03-30',
    status: 'draft',
    featured: false,
    views: 0
  }
];

// Get all blog posts
router.get('/', (req, res) => {
  res.json(blogPosts);
});

// Get a single blog post by ID
router.get('/:id', (req, res) => {
  const post = blogPosts.find(post => post.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  
  res.json(post);
});

// Create a new blog post
router.post('/', (req, res) => {
  const {
    title,
    excerpt,
    content,
    category,
    featured
  } = req.body;
  
  // Validate required fields
  if (!title || !excerpt || !content || !category) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  // Create new post object
  const newPost = {
    id: blogPosts.length > 0 ? Math.max(...blogPosts.map(post => post.id)) + 1 : 1,
    title,
    excerpt,
    content,
    category,
    author: req.user ? req.user.name : 'Admin User', // In real app, get from authenticated user
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    featured: featured || false,
    views: 0
  };
  
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Update an existing blog post
router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  
  const updatedPost = {
    ...blogPosts[postIndex],
    ...req.body,
    id: postId // Ensure ID doesn't change
  };
  
  blogPosts[postIndex] = updatedPost;
  res.json(updatedPost);
});

// Delete a blog post
router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  
  const deletedPost = blogPosts[postIndex];
  blogPosts = blogPosts.filter(post => post.id !== postId);
  
  res.json({ message: 'Blog post deleted successfully', deletedPost });
});

// Publish/unpublish a blog post
router.patch('/:id/status', (req, res) => {
  const postId = parseInt(req.params.id);
  const { status } = req.body;
  
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  
  if (!['published', 'draft'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  
  blogPosts[postIndex].status = status;
  res.json(blogPosts[postIndex]);
});

// Toggle featured status
router.patch('/:id/featured', (req, res) => {
  const postId = parseInt(req.params.id);
  const { featured } = req.body;
  
  const postIndex = blogPosts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  
  blogPosts[postIndex].featured = featured;
  res.json(blogPosts[postIndex]);
});

module.exports = router;
