const express = require('express');
const router = express.Router();

// Sample data - in a real app this would come from a database
let programs = [
  {
    id: 1,
    title: 'Education Support',
    shortDescription: 'Providing educational resources, scholarships and tutoring to underprivileged children.',
    longDescription: 'Our Education Support program provides comprehensive resources to help underprivileged children succeed academically. We offer scholarships, tutoring services, school supplies, and mentorship opportunities designed to break the cycle of educational inequality.',
    category: 'Education',
    active: true,
    featured: true,
    beneficiaries: 120,
    volunteers: 15
  },
  {
    id: 2,
    title: 'Housing Assistance',
    shortDescription: 'Helping families find safe, affordable housing and emergency shelter services.',
    longDescription: 'The Housing Assistance program works to ensure everyone has access to safe and affordable housing. We provide emergency shelter services, rental assistance, and connections to affordable housing options, while advocating for housing equality in our community.',
    category: 'Housing',
    active: true,
    featured: true,
    beneficiaries: 45,
    volunteers: 8
  },
  {
    id: 3,
    title: 'Community Outreach',
    shortDescription: 'Building stronger communities through local events, workshops and support groups.',
    longDescription: 'Through our Community Outreach program, we strive to build stronger, more connected neighborhoods. We organize community events, skill-building workshops, and support groups that foster relationships and create a sense of belonging for everyone.',
    category: 'Community',
    active: true,
    featured: true,
    beneficiaries: 310,
    volunteers: 25
  },
  {
    id: 4,
    title: 'Crisis Relief',
    shortDescription: 'Providing immediate assistance during natural disasters and emergency situations.',
    longDescription: 'Our Crisis Relief program responds swiftly to emergencies and natural disasters, providing immediate aid to those affected. We distribute essential supplies, coordinate temporary housing, and offer support services to help individuals and families recover.',
    category: 'Emergency',
    active: true,
    featured: true,
    beneficiaries: 78,
    volunteers: 32
  },
  {
    id: 5,
    title: 'Health Services',
    shortDescription: 'Access to basic healthcare services for those in need.',
    longDescription: 'The Health Services program focuses on improving health outcomes for underserved populations. We connect individuals to medical care, organize health screenings, provide health education, and work to address health disparities in our community.',
    category: 'Health',
    active: false,
    featured: false,
    beneficiaries: 0,
    volunteers: 0
  }
];

// Get all programs
router.get('/', (req, res) => {
  res.json(programs);
});

// Get a single program by ID
router.get('/:id', (req, res) => {
  const program = programs.find(program => program.id === parseInt(req.params.id));
  
  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  res.json(program);
});

// Create a new program
router.post('/', (req, res) => {
  const {
    title,
    shortDescription,
    longDescription,
    category,
    active,
    featured
  } = req.body;
  
  // Validate required fields
  if (!title || !shortDescription || !longDescription || !category) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  // Create new program object
  const newProgram = {
    id: programs.length > 0 ? Math.max(...programs.map(program => program.id)) + 1 : 1,
    title,
    shortDescription,
    longDescription,
    category,
    active: active !== undefined ? active : true,
    featured: featured || false,
    beneficiaries: 0,
    volunteers: 0
  };
  
  programs.push(newProgram);
  res.status(201).json(newProgram);
});

// Update an existing program
router.put('/:id', (req, res) => {
  const programId = parseInt(req.params.id);
  const programIndex = programs.findIndex(program => program.id === programId);
  
  if (programIndex === -1) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  // Preserve stats if not provided
  const { beneficiaries, volunteers } = programs[programIndex];
  
  const updatedProgram = {
    ...programs[programIndex],
    ...req.body,
    id: programId, // Ensure ID doesn't change
    beneficiaries: req.body.beneficiaries !== undefined ? req.body.beneficiaries : beneficiaries,
    volunteers: req.body.volunteers !== undefined ? req.body.volunteers : volunteers
  };
  
  programs[programIndex] = updatedProgram;
  res.json(updatedProgram);
});

// Delete a program
router.delete('/:id', (req, res) => {
  const programId = parseInt(req.params.id);
  const programIndex = programs.findIndex(program => program.id === programId);
  
  if (programIndex === -1) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  const deletedProgram = programs[programIndex];
  programs = programs.filter(program => program.id !== programId);
  
  res.json({ message: 'Program deleted successfully', deletedProgram });
});

// Toggle active status
router.patch('/:id/status', (req, res) => {
  const programId = parseInt(req.params.id);
  const { active } = req.body;
  
  const programIndex = programs.findIndex(program => program.id === programId);
  
  if (programIndex === -1) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  programs[programIndex].active = active;
  res.json(programs[programIndex]);
});

// Toggle featured status
router.patch('/:id/featured', (req, res) => {
  const programId = parseInt(req.params.id);
  const { featured } = req.body;
  
  const programIndex = programs.findIndex(program => program.id === programId);
  
  if (programIndex === -1) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  programs[programIndex].featured = featured;
  res.json(programs[programIndex]);
});

// Update program statistics
router.patch('/:id/stats', (req, res) => {
  const programId = parseInt(req.params.id);
  const { beneficiaries, volunteers } = req.body;
  
  const programIndex = programs.findIndex(program => program.id === programId);
  
  if (programIndex === -1) {
    return res.status(404).json({ message: 'Program not found' });
  }
  
  if (beneficiaries !== undefined) {
    programs[programIndex].beneficiaries = parseInt(beneficiaries);
  }
  
  if (volunteers !== undefined) {
    programs[programIndex].volunteers = parseInt(volunteers);
  }
  
  res.json(programs[programIndex]);
});

module.exports = router;
