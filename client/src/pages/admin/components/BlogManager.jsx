import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaSort } from 'react-icons/fa';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false,
    image: null
  });
  
  useEffect(() => {
    // Simulate fetching posts from API
    const fetchPosts = async () => {
      try {
        // In a real app: const response = await axios.get('/api/posts');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPosts = [
          {
            id: 1,
            title: 'Community Outreach Success in Downtown Area',
            excerpt: 'Our recent community outreach program has exceeded expectations with record attendance.',
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
            category: 'Education',
            author: 'Mike Peterson',
            date: '2025-04-28',
            status: 'published',
            featured: false,
            views: 187
          },
          {
            id: 3,
            title: 'Fundraising Goals Exceeded for Q2',
            excerpt: 'Thanks to our generous donors, we have exceeded our fundraising goals for the second quarter.',
            category: 'Fundraising',
            author: 'Emma Wilson',
            date: '2025-04-15',
            status: 'published',
            featured: false,
            views: 156
          },
          {
            id: 4,
            title: 'Volunteer Spotlight: Meet John Davis',
            excerpt: 'This month we highlight the exceptional contributions of one of our dedicated volunteers.',
            category: 'Volunteers',
            author: 'Sarah Johnson',
            date: '2025-05-05',
            status: 'published',
            featured: false,
            views: 129
          },
          {
            id: 5,
            title: 'Fall Event Season Planning Underway',
            excerpt: 'Draft of our upcoming fall event season with new initiatives and returning favorites.',
            category: 'Events',
            author: 'Mike Peterson',
            date: '2025-05-12',
            status: 'draft',
            featured: false,
            views: 0
          }
        ];
        
        setPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Handle search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Open modal for creating/editing a post
  const openPostModal = (post = null) => {
    if (post) {
      // Edit existing post
      setCurrentPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content || '',
        category: post.category,
        featured: post.featured,
        image: null
      });
    } else {
      // Create new post
      setCurrentPost(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
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
    
    // In a real app, you would send the data to your API
    console.log('Form data to submit:', formData);
    
    // Mock implementation
    if (currentPost) {
      // Update existing post
      const updatedPosts = posts.map(post => 
        post.id === currentPost.id ? { ...post, ...formData } : post
      );
      setPosts(updatedPosts);
    } else {
      // Create new post
      const newPost = {
        id: posts.length + 1,
        ...formData,
        author: 'Current User',
        date: new Date().toISOString().split('T')[0],
        status: 'draft',
        views: 0
      };
      setPosts([...posts, newPost]);
    }
    
    setShowModal(false);
  };
  
  // Delete a post
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      setPosts(posts.filter(post => post.id !== id));
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
            placeholder="Search posts..."
            className="form-control ps-5"
            style={{ maxWidth: '350px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => openPostModal()}
          className="btn btn-primary d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          New Post
        </button>
      </div>
      
      {/* Posts List */}
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
                      Title
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer"
                    onClick={() => handleSort('category')}
                  >
                    <div className="d-flex align-items-center">
                      Category
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer"
                    onClick={() => handleSort('author')}
                  >
                    <div className="d-flex align-items-center">
                      Author
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="d-flex align-items-center">
                      Date
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
                    onClick={() => handleSort('views')}
                  >
                    <div className="d-flex align-items-center">
                      Views
                      <FaSort className="ms-1" />
                    </div>
                  </th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div>
                        {post.title}
                        {post.featured && (
                          <span className="ms-2 badge bg-warning text-dark">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      {post.category}
                    </td>
                    <td>
                      {post.author}
                    </td>
                    <td>
                      {post.date}
                    </td>
                    <td>
                      <span className={`badge ${post.status === 'published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      {post.views}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openPostModal(post)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
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
      {filteredPosts.length === 0 && (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <FaSearch className="fs-1 text-secondary mb-3" />
          <h3 className="fs-4 fw-bold text-secondary mb-2">No posts found</h3>
          <p className="text-muted">
            {searchTerm 
              ? `No posts matching "${searchTerm}"` 
              : "You haven't created any posts yet"
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
      
      {/* Create/Edit Post Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-backdrop fade show" style={{ opacity: 0.5 }} onClick={() => setShowModal(false)}></div>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentPost ? 'Edit Post' : 'Create New Post'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">
                      Title
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
                      <option value="Community">Community</option>
                      <option value="Education">Education</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Housing">Housing</option>
                      <option value="Volunteers">Volunteers</option>
                      <option value="News">News</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="excerpt">
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows="2"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="content">
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="8"
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Featured Image
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
                        Mark as featured post
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
                      {currentPost ? 'Update Post' : 'Create Post'}
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

export default BlogManager;
