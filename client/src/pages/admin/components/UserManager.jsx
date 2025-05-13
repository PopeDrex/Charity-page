import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaLock, FaUserShield, FaUserCog, FaUserAlt } from 'react-icons/fa';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Form state for creating/editing users
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'editor',
    password: '',
    confirmPassword: '',
    active: true
  });
  
  useEffect(() => {
    // Simulate fetching users from API
    const fetchUsers = async () => {
      try {
        // In a real app: const response = await axios.get('/api/users');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers = [
          {
            id: 1,
            name: 'Admin User',
            email: 'admin@detour-charity.org',
            role: 'admin',
            lastLogin: '2025-05-12 14:23',
            active: true
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@detour-charity.org',
            role: 'editor',
            lastLogin: '2025-05-10 09:15',
            active: true
          },
          {
            id: 3,
            name: 'Mike Peterson',
            email: 'mike@detour-charity.org',
            role: 'editor',
            lastLogin: '2025-05-11 16:08',
            active: true
          },
          {
            id: 4,
            name: 'Emma Wilson',
            email: 'emma@detour-charity.org',
            role: 'contributor',
            lastLogin: '2025-05-08 11:35',
            active: true
          },
          {
            id: 5,
            name: 'John Davis',
            email: 'john@detour-charity.org',
            role: 'contributor',
            lastLogin: '2025-04-30 08:22',
            active: false
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Handle search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Open modal for creating/editing a user
  const openUserModal = (user = null) => {
    if (user) {
      // Edit existing user
      setCurrentUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: '',
        active: user.active
      });
    } else {
      // Create new user
      setCurrentUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'editor',
        password: '',
        confirmPassword: '',
        active: true
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
  
  // Validate form
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    
    if (!currentUser && formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, you would send the data to your API
    console.log('Form data to submit:', formData);
    
    // Simulate successful submission
    const newUser = {
      id: currentUser ? currentUser.id : Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      lastLogin: currentUser ? currentUser.lastLogin : 'Never',
      active: formData.active
    };
    
    if (currentUser) {
      // Update existing user
      setUsers(users.map(user => user.id === currentUser.id ? newUser : user));
    } else {
      // Add new user
      setUsers([...users, newUser]);
    }
    
    setShowModal(false);
  };
  
  // Delete a user
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app: await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  // Toggle active status
  const toggleActive = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };
  
  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaUserShield className="text-red-500" />;
      case 'editor':
        return <FaUserCog className="text-blue-500" />;
      case 'contributor':
        return <FaUserAlt className="text-green-500" />;
      default:
        return <FaUserAlt className="text-gray-500" />;
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
            placeholder="Search users..."
            className="form-control ps-5"
            style={{ maxWidth: '350px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => openUserModal()}
          className="btn btn-primary d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          New User
        </button>
      </div>
      
      {/* Users List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">
                    Name
                  </th>
                  <th scope="col">
                    Role
                  </th>
                  <th scope="col">
                    Status
                  </th>
                  <th scope="col">
                    Last Login
                  </th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={!user.active ? 'table-light' : ''}>
                    <td>
                      <div>
                        <div className="fw-medium">
                          {user.name}
                        </div>
                        <div className="small text-muted">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {getRoleIcon(user.role)}
                        </span>
                        <span className="text-capitalize">
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${user.active ? 'bg-success' : 'bg-secondary'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="text-muted">
                      {user.lastLogin}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                          onClick={() => toggleActive(user.id)}
                          className={`btn btn-sm ${user.active ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                          title={user.active ? 'Deactivate' : 'Activate'}
                        >
                          <FaLock />
                        </button>
                        <button 
                          onClick={() => openUserModal(user)}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
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
      
      {/* Create/Edit User Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }} onClick={() => setShowModal(false)}></div>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentUser ? 'Edit User' : 'Create New User'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="contributor">Contributor</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      {currentUser ? 'New Password (leave blank to keep current)' : 'Password'}
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-control"
                      required={!currentUser}
                      minLength={8}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-control"
                      required={!currentUser}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="active">
                        User is active
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
                      {currentUser ? 'Update User' : 'Create User'}
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

export default UserManager;
