import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaSearch, FaFilter, FaTag, FaUser, FaClock, FaComment } from 'react-icons/fa';

const Blog = () => {
  // State for blog data
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'stories', name: 'Impact Stories' },
    { id: 'updates', name: 'Program Updates' },
    { id: 'ukraine', name: 'Ukraine Crisis' },
    { id: 'travel', name: 'Travel & Experiences' },
    { id: 'events', name: 'Events & News' }
  ];
  
  // Mock blog data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          title: 'Making Dreams Come True: The Story of the Petrova Family',
          excerpt: 'Read about how our Dream Experiences program helped bring joy to the Petrova family after they fled Ukraine during the crisis. A heartwarming story of resilience and hope.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Maria Williams',
          authorRole: 'Program Coordinator',
          date: '2025-04-25',
          readTime: '6 min read',
          category: 'stories',
          tags: ['Ukraine', 'Family Support', 'Dream Experiences'],
          isFeatured: true,
          comments: 12
        },
        {
          id: 2,
          title: 'Expanding Our Reach: New Programs for Families in Crisis',
          excerpt: 'Detour Charity is proud to announce the expansion of our programs to include more comprehensive support for families affected by humanitarian crises worldwide.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'David Chen',
          authorRole: 'Executive Director',
          date: '2025-04-12',
          readTime: '4 min read',
          category: 'updates',
          tags: ['Programs', 'Expansion', 'Global Reach'],
          isFeatured: true,
          comments: 8
        },
        {
          id: 3,
          title: 'Annual Charity Gala Raises Record Funds for Ukraine Relief',
          excerpt: 'Our recent charity gala surpassed expectations, raising over €250,000 for our ongoing Ukraine relief efforts. Read about the evening and the impact these funds will make.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Sarah Johnson',
          authorRole: 'Events Manager',
          date: '2025-03-29',
          readTime: '5 min read',
          category: 'events',
          tags: ['Fundraising', 'Events', 'Ukraine Relief'],
          isFeatured: true,
          comments: 15
        },
        {
          id: 4,
          title: 'The Healing Power of Travel: How Vacations Help Families Recover',
          excerpt: 'Research shows that travel experiences can have significant psychological benefits for families recovering from trauma. Learn how our programs leverage these benefits.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Dr. Elena Kovalenko',
          authorRole: 'Program Psychologist',
          date: '2025-03-15',
          readTime: '8 min read',
          category: 'travel',
          tags: ['Mental Health', 'Travel Benefits', 'Research'],
          isFeatured: false,
          comments: 20
        },
        {
          id: 5,
          title: 'Update on Ukraine: One Year Later',
          excerpt: 'As we mark one year since the escalation of the crisis in Ukraine, we reflect on the challenges, progress, and ongoing needs of affected families.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Oleksandr Petrenko',
          authorRole: 'Ukraine Operations Manager',
          date: '2025-02-24',
          readTime: '10 min read',
          category: 'ukraine',
          tags: ['Ukraine Crisis', 'Updates', 'Humanitarian Aid'],
          isFeatured: false,
          comments: 32
        },
        {
          id: 6,
          title: 'Meet the Volunteers: Stories from the Field',
          excerpt: 'Our dedicated volunteers are the backbone of our operations. In this post, we highlight some of their extraordinary contributions and personal stories.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Thomas Wright',
          authorRole: 'Volunteer Coordinator',
          date: '2025-02-10',
          readTime: '7 min read',
          category: 'stories',
          tags: ['Volunteers', 'Impact Stories', 'Behind the Scenes'],
          isFeatured: false,
          comments: 18
        },
        {
          id: 7,
          title: 'New Partnership with European Travel Alliance Announced',
          excerpt: 'We are excited to announce a new strategic partnership with the European Travel Alliance that will significantly expand our ability to provide respite breaks.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Emma Roberts',
          authorRole: 'Partnerships Director',
          date: '2025-01-30',
          readTime: '4 min read',
          category: 'updates',
          tags: ['Partnerships', 'Travel Industry', 'Expansion'],
          isFeatured: false,
          comments: 6
        },
        {
          id: 8,
          title: 'How Your Donations Make a Difference: Impact Report 2024',
          excerpt: 'Our annual impact report details how donor contributions translated into real support for families in crisis during 2024. See the numbers and stories behind your generosity.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec ultricies nisl nisl nec nisl.',
          image: '/images/harold.jpg',
          author: 'Financial Transparency Team',
          authorRole: 'Detour Charity',
          date: '2025-01-15',
          readTime: '9 min read',
          category: 'updates',
          tags: ['Donations', 'Impact Report', 'Transparency'],
          isFeatured: false,
          comments: 14
        }
      ];

      setPosts(mockPosts);
      setFeaturedPosts(mockPosts.filter(post => post.isFeatured));
      setFilteredPosts(mockPosts);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    if (posts.length === 0) return;
    
    let filtered = [...posts];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }
    
    setFilteredPosts(filtered);
  }, [posts, searchTerm, categoryFilter]);

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
              Our Blog
            </h1>
            <p className="lead fs-4 mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Stories of impact, program updates, and insights from our work with families in crisis
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="section py-5 bg-light">
          <div className="container-custom">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Featured Articles</h2>
              <div className="mx-auto mb-4" style={{ 
                width: '120px', 
                height: '4px', 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
              }}></div>
              <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
                Our most important stories and updates
              </p>
            </div>
            
            <div className="row g-4">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className={index === 0 ? 'col-12' : 'col-md-6'}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <div className="row g-0 h-100">
                      <div className={index === 0 ? 'col-md-6' : 'col-md-12'} style={{ maxHeight: index === 0 ? 'none' : '240px' }}>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="h-100 w-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className={index === 0 ? 'col-md-6' : 'col-md-12'}>
                        <div className="card-body p-4 d-flex flex-column h-100">
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="badge rounded-pill" style={{ 
                              backgroundColor: 'rgba(26, 42, 108, 0.1)', 
                              color: '#1a2a6c',
                              padding: '0.5rem 1rem',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                          </div>
                          
                          <h3 className={`card-title fw-bold mb-3 ${index === 0 ? 'h3' : 'h4'}`}>{post.title}</h3>
                          
                          <p className="card-text text-muted mb-3" style={index === 0 ? {} : { 
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>{post.excerpt}</p>
                          
                          <div className="d-flex align-items-center mb-3 mt-auto">
                            <div className="d-flex align-items-center me-3">
                              <FaCalendarAlt className="me-2 text-primary" />
                              <span className="text-muted small">{formatDate(post.date)}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <FaClock className="me-2 text-primary" />
                              <span className="text-muted small">{post.readTime}</span>
                            </div>
                          </div>
                          
                          <Link 
                            to={`/blog/${post.id}`} 
                            className="btn py-2" 
                            style={{ 
                              background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                              border: 'none', 
                              color: 'white',
                              fontWeight: '600',
                              boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                            }}
                          >
                            Read Article
                            <FaArrowRight className="ms-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Post Finder Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="sticky-top" style={{ top: '20px', zIndex: 10, maxHeight: '85vh', overflowY: 'auto', paddingBottom: '20px' }}>
                {/* Filter Sidebar */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-body p-4">
                    <h3 className="h4 fw-bold mb-4">Find Articles</h3>
                    
                    {/* Search */}
                    <div className="mb-4">
                      <label htmlFor="searchPosts" className="form-label fw-medium">Search</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="searchPosts"
                          className="form-control"
                          placeholder="Search articles..."
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
                    
                    {/* Reset Filters */}
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('all');
                      }}
                    >
                      <FaFilter className="me-2" />
                      Reset Filters
                    </button>
                  </div>
                </div>
                
                {/* Recent Posts */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-3">Recent Articles</h3>
                    
                    <div className="d-grid gap-3">
                      {posts.slice(0, 4).map(post => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="text-decoration-none">
                          <div className="d-flex align-items-center">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="rounded me-3"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <div>
                              <h4 className="h6 fw-medium mb-1 text-dark">{post.title}</h4>
                              <span className="text-muted small">{formatDate(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-9">
              {/* Blog Posts List */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 fw-bold mb-0">All Articles</h2>
                <span className="text-muted">Showing {filteredPosts.length} articles</span>
              </div>
              
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <h3 className="h4 text-muted">No articles found matching your criteria</h3>
                  <p>Try adjusting your filters to find more articles.</p>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="col">
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="card-img-top h-100 w-100"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="badge rounded-pill" style={{ 
                              backgroundColor: 'rgba(26, 42, 108, 0.1)', 
                              color: '#1a2a6c',
                              padding: '0.5rem 1rem',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                          </div>
                          
                          <h3 className="card-title h5 fw-bold mb-3">{post.title}</h3>
                          
                          <p className="card-text text-muted mb-3" style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '4.5rem'
                          }}>{post.excerpt}</p>
                          
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                              <img 
                                src="/images/harold.jpg" 
                                alt={post.author} 
                                className="rounded-circle me-2"
                                style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                              />
                              <span className="text-muted small">{post.author}</span>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-1 text-primary" size={12} />
                                <span className="text-muted small">{formatDate(post.date)}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <FaComment className="me-1 text-primary" size={12} />
                                <span className="text-muted small">{post.comments}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="d-grid">
                            <Link 
                              to={`/blog/${post.id}`} 
                              className="btn py-2" 
                              style={{ 
                                background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                                border: 'none', 
                                color: 'white',
                                fontWeight: '600',
                                boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                              }}
                            >
                              Read Article
                            </Link>
                          </div>
                        </div>
                        
                        <div className="card-footer bg-white p-3 border-0">
                          <div className="d-flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="badge rounded-pill"
                                style={{ 
                                  backgroundColor: 'rgba(178, 31, 31, 0.1)', 
                                  color: '#b21f1f',
                                  padding: '0.5rem 0.75rem',
                                  fontSize: '0.75rem'
                                }}
                              >
                                <FaTag className="me-1" size={10} />
                                {tag}
                              </span>
                            ))}
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
      
      {/* Newsletter Section */}
      <section className="section py-5 text-white" style={{ background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="display-5 fw-bold mb-3">
              Subscribe to Our Blog
            </h2>
            <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'white', opacity: '0.7' }}></div>
            <p className="lead mb-5">
              Get the latest articles, impact stories, and updates delivered straight to your inbox.
            </p>
            
            <form className="mx-auto p-4 rounded" style={{ maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="row g-3">
                <div className="col-md-8">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="form-control form-control-lg border-0 shadow-sm"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-lg w-100 shadow" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
