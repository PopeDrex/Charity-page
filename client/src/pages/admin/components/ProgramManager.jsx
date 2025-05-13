import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaHandHoldingHeart, FaSearch } from 'react-icons/fa';

const ProgramManager = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  
  // Form state for creating/editing programs
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    category: '',
    active: true,
    featured: false,
    image: null
  });
  
  useEffect(() => {
    // Simulate fetching programs from API
    const fetchPrograms = async () => {
      try {
        // In a real app: const response = await axios.get('/api/programs');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPrograms = [
          {
            id: 1,
            title: 'Education Support',
            shortDescription: 'Providing educational resources, scholarships and tutoring to underprivileged children.',
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
            category: 'Health',
            active: false,
            featured: false,
            beneficiaries: 0,
            volunteers: 0
          }
        ];
        
        setPrograms(mockPrograms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);
  
  // Handle search
  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Open modal for creating/editing a program
  const openProgramModal = (program = null) => {
    if (program) {
      // Edit existing program
      setCurrentProgram(program);
      setFormData({
        title: program.title,
        shortDescription: program.shortDescription,
        longDescription: '', // In a real app, you'd fetch the full description
        category: program.category,
        active: program.active,
        featured: program.featured,
        image: null
      });
    } else {
      // Create new program
      setCurrentProgram(null);
      setFormData({
        title: '',
        shortDescription: '',
        longDescription: '',
        category: '',
        active: true,
        featured: false,
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
    
    // Simulate successful submission
    const newProgram = {
      id: currentProgram ? currentProgram.id : Date.now(),
      title: formData.title,
      shortDescription: formData.shortDescription,
      category: formData.category,
      active: formData.active,
      featured: formData.featured,
      beneficiaries: currentProgram ? currentProgram.beneficiaries : 0,
      volunteers: currentProgram ? currentProgram.volunteers : 0
    };
    
    if (currentProgram) {
      // Update existing program
      setPrograms(programs.map(program => program.id === currentProgram.id ? newProgram : program));
    } else {
      // Add new program
      setPrograms([newProgram, ...programs]);
    }
    
    setShowModal(false);
  };
  
  // Delete a program
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      // In a real app: await axios.delete(`/api/programs/${id}`);
      setPrograms(programs.filter(program => program.id !== id));
    }
  };
  
  // Toggle active status
  const toggleActive = (id) => {
    setPrograms(programs.map(program => 
      program.id === id ? { ...program, active: !program.active } : program
    ));
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
            placeholder="Search programs..."
            className="form-control ps-5"
            style={{ maxWidth: '350px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => openProgramModal()}
          className="btn btn-primary d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          New Program
        </button>
      </div>
      
      {/* Programs List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">
                    Program
                  </th>
                  <th scope="col">
                    Category
                  </th>
                  <th scope="col">
                    Status
                  </th>
                  <th scope="col">
                    Impact
                  </th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className={!program.active ? 'table-light' : ''}>
                    <td>
                      <div>
                        <div className="fw-medium">
                          {program.title}
                          {program.featured && (
                            <span className="ms-2 badge bg-warning text-dark">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="small text-muted text-truncate" style={{ maxWidth: '400px' }}>
                          {program.shortDescription}
                        </div>
                      </div>
                    </td>
                    <td>
                      {program.category}
                    </td>
                    <td>
                      <span className={`badge ${program.active ? 'bg-success' : 'bg-secondary'}`}>
                        {program.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">
                          {program.beneficiaries} beneficiaries
                        </div>
                        <div className="small text-muted">
                          {program.volunteers} volunteers
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                          onClick={() => toggleActive(program.id)}
                          className={`btn btn-sm ${program.active ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                          title={program.active ? 'Deactivate' : 'Activate'}
                        >
                          <FaHandHoldingHeart />
                        </button>
                        <button 
                          onClick={() => openProgramModal(program)}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(program.id)}
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
      
      {/* Empty state */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <FaHandHoldingHeart className="fs-1 text-secondary mb-3" />
          <h3 className="fs-4 fw-bold text-secondary mb-2">No programs found</h3>
          <p className="text-muted">
            {searchTerm 
              ? `No programs matching "${searchTerm}"` 
              : "You haven't created any programs yet"
            }
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="btn btn-link text-primary mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      )}
      
      {/* Create/Edit Program Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }} onClick={() => setShowModal(false)}></div>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentProgram ? 'Edit Program' : 'Create New Program'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">
                      Program Title
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
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Education">Education</option>
                      <option value="Housing">Housing</option>
                      <option value="Community">Community</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Health">Health</option>
                      <option value="Food">Food</option>
                    </select>
                  </div>
                
                  <div className="mb-3">
                    <label className="form-label" htmlFor="shortDescription">
                      Short Description
                    </label>
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows="2"
                      className="form-control"
                      required
                      maxLength="160"
                    ></textarea>
                    <div className="form-text text-end">
                      {formData.shortDescription.length}/160 characters
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="longDescription">
                      Full Description
                    </label>
                    <textarea
                      id="longDescription"
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      rows="8"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Program Image
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
                  
                  <div className="mb-4">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="active">
                        Program is active
                      </label>
                    </div>
                    
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="featured">
                        Feature on homepage
                      </label>
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
                      {currentProgram ? 'Update Program' : 'Create Program'}
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

export default ProgramManager;
