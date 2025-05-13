import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMapMarkerAlt, FaFilter, FaSearch, FaHandHoldingHeart, FaHome, FaUsers, FaPlaneDeparture, FaGlobe } from 'react-icons/fa';

const Programs = () => {
  // State for programs data
  const [programs, setPrograms] = useState([]);
  const [featuredPrograms, setFeaturedPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'family-support', name: 'Family Support' },
    { id: 'children', name: 'Children Programs' },
  ];
  
  // Region filters
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'ukraine', name: 'Ukraine' },
    { id: 'europe', name: 'Europe' },
    { id: 'global', name: 'Global' },
    { id: 'local', name: 'Local' }
  ];

  // Mock program data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockPrograms = [
        {
          id: 1,
          title: 'Family Holiday Program',
          description: 'Providing all-expenses-paid vacation packages to families in financial hardship who could never afford a holiday. These breaks offer much-needed respite and the chance to create positive memories during difficult times.',
          longDescription: 'Our Family Holiday Program is designed to provide families facing significant financial hardship with a complete vacation experience they could otherwise never afford. Each family receives a custom-tailored trip package that includes accommodation, travel, meals, and activities. Beyond just a vacation, these experiences provide crucial mental health benefits, strengthening family bonds during times of stress and creating positive memories that can sustain families through ongoing challenges. Working with our network of travel partners and donors, we maximize the impact of every contribution to deliver transformative experiences.',
          icon: <FaPlaneDeparture className="fs-1 mb-3" />,
          image: '/images/harold.jpg',
          category: 'family-support',
          region: 'global',
          isFeatured: true,
          impact: '150 families supported',
          goal: 'Provide 200 family vacations by 2026',
          link: '/programs/family-holidays'
        },
        {
          id: 2,
          title: 'Respite Breaks',
          description: 'Offering short hotel stays and relaxing getaways for parents and caregivers of children with serious illnesses or disabilities. These breaks provide essential rest and renewal for those providing round-the-clock care.',
          longDescription: 'Designed specifically for parents and caregivers of children with serious illnesses or disabilities, our Respite Breaks program provides short but critical periods of rest. These carefully arranged hotel stays and getaways allow caregivers to recharge while knowing their loved ones are receiving professional care. By partnering with healthcare providers and specialized care services, we ensure that each respite break meets the unique needs of the families we serve. This program acknowledges the immense challenges faced by caregivers and offers them the support they need to continue their vital role with renewed energy and perspective.',
          icon: <FaHome className="fs-1 mb-3" />,
          image: '/images/harold.jpg',
          category: 'family-support',
          region: 'local',
          isFeatured: true,
          impact: '75 caregivers supported',
          goal: 'Expand program to serve 150 families annually',
          link: '/programs/respite-breaks'
        },
        {
          id: 3,
          title: 'Dream Experiences',
          description: 'Creating memorable excursions and special experiences for children from disadvantaged backgrounds or facing serious health challenges. These custom adventures bring joy and hope to children who need it most.',
          longDescription: 'The Dream Experiences program creates custom adventures for children facing serious health challenges or coming from severely disadvantaged backgrounds. Working closely with healthcare providers, social workers, and child development specialists, we design experiences that address each child\'s specific interests and needs. From meeting heroes to visiting dream destinations, these experiences provide powerful psychological benefits, boosting morale during treatment and creating moments of normalcy and joy. Our network of volunteers and corporate partners helps make these dreams possible, with each experience carefully documented so families can revisit these special memories.',
          icon: <FaHandHoldingHeart className="fs-1 mb-3" />,
          image: '/images/harold.jpg',
          category: 'children',
          region: 'global',
          isFeatured: true,
          impact: '120 children served',
          goal: 'Create 500 dream experiences by 2027',
          link: '/programs/dream-experiences'
        },
        {
          id: 4,
          title: 'Ukraine Emergency Relief',
          description: 'Providing immediate assistance to families affected by the crisis in Ukraine, including emergency accommodation, transportation to safe locations, and essential supplies for displaced families.',
          longDescription: 'Our Ukraine Emergency Relief program delivers critical support to families impacted by the ongoing crisis. Working with local partners on the ground, we provide immediate assistance including emergency housing, safe transportation away from conflict zones, and essential supplies such as food, medicine, and hygiene products. We coordinate with international aid organizations to maximize our reach and effectiveness, ensuring resources go directly to those in most critical need. Our travel industry connections allow us to arrange safe passage for families seeking to leave dangerous areas, and we provide ongoing support for those adapting to new circumstances in unfamiliar locations.',
          icon: <FaGlobe className="fs-1 mb-3" />,
          image: '/images/harold.jpg',
          category: 'emergency-relief',
          region: 'ukraine',
          isFeatured: false,
          impact: '350 families received emergency support',
          goal: 'Maintain capacity to assist 500 families annually',
          link: '/programs/ukraine-relief'
        },
        {
          id: 5,
          title: 'Holiday Sponsorship',
          description: 'Partnering with donors and travel industry supporters to sponsor vacation opportunities for families who could otherwise not afford them, creating meaningful experiences and lasting memories.',
          longDescription: 'The Holiday Sponsorship program creates a direct connection between donors and families in need, allowing supporters to make a tangible difference in the lives of those facing hardship. Through our partnerships with travel industry leaders, we leverage donations to maximize their impact, securing significant discounts and added benefits that enhance each sponsored holiday. Donors receive updates about the families they\'ve helped, including stories and photos (with appropriate privacy measures) that demonstrate the meaningful impact of their contribution. This program creates a meaningful way for individuals and businesses to make a concrete difference while giving families experiencing hardship the chance to enjoy restorative, memory-building holidays.',
          icon: <FaUsers className="fs-1 mb-3" />,
          image: '/images/harold.jpg',
          category: 'family-support',
          region: 'global',
          isFeatured: false,
          impact: '85 holidays sponsored',
          goal: 'Secure sponsorships for 500 family holidays by 2027',
          link: '/programs/sponsorship'
        },
      ];

      setPrograms(mockPrograms);
      setFeaturedPrograms(mockPrograms.filter(program => program.isFeatured));
      setFilteredPrograms(mockPrograms);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter programs based on search, category, and region
  useEffect(() => {
    if (programs.length === 0) return;
    
    let filtered = [...programs];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(program => 
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(program => program.category === categoryFilter);
    }
    
    // Apply region filter
    if (regionFilter !== 'all') {
      filtered = filtered.filter(program => program.region === regionFilter);
    }
    
    setFilteredPrograms(filtered);
  }, [programs, searchTerm, categoryFilter, regionFilter]);

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
              Our Programs
            </h1>
            <p className="lead fs-4 mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Supporting families in crisis through humanitarian initiatives and travel experiences
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Programs Section */}
      {featuredPrograms.length > 0 && (
        <section className="section py-5 bg-light">
          <div className="container-custom">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Featured Programs</h2>
              <div className="mx-auto mb-4" style={{ 
                width: '120px', 
                height: '4px', 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
              }}></div>
              <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
                Our core initiatives making an immediate difference in the lives of families affected by crisis
              </p>
            </div>
            
            <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
              {featuredPrograms.map((program) => (
                <div key={program.id} className="col">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img 
                        src={program.image} 
                        alt={program.title} 
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
                          {categories.find(cat => cat.id === program.category)?.name}
                        </span>
                      </div>
                      
                      <div className="mb-3 text-center" style={{ color: 'var(--primary)' }}>
                        {program.icon}
                      </div>
                      
                      <h3 className="card-title h4 fw-bold mb-3 text-center">{program.title}</h3>
                      <p className="card-text text-muted mb-3" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.5rem',
                        height: '6rem'
                      }}>{program.description}</p>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <span className="badge bg-success py-2 px-3">
                            {program.impact}
                          </span>
                        </div>
                      </div>
                      
                      <div className="d-grid">
                        <Link 
                          to={program.link} 
                          className="btn py-2" 
                          style={{ 
                            background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                            border: 'none', 
                            color: 'white',
                            fontWeight: '600',
                            boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                          }}
                        >
                          Learn More
                          <FaArrowRight className="ms-2" />
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
      
      {/* Program Finder Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="row g-4">
            <div className="col-lg-3">
              {/* Filter Sidebar */}
              <div className="card border-0 shadow-sm rounded-4 mb-4 sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-4">Find Programs</h3>
                  
                  {/* Search */}
                  <div className="mb-4">
                    <label htmlFor="searchPrograms" className="form-label fw-medium">Search</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="searchPrograms"
                        className="form-control"
                        placeholder="Search programs..."
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
                  
                  {/* Region Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-medium">Region</label>
                    <div className="d-grid gap-2">
                      {regions.map(region => (
                        <button
                          key={region.id}
                          className={`btn text-start py-2 ${regionFilter === region.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => setRegionFilter(region.id)}
                        >
                          {region.name}
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
                      setRegionFilter('all');
                    }}
                  >
                    <FaFilter className="me-2" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-9">
              {/* Programs List */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="h3 fw-bold mb-0">All Programs</h2>
                <span className="text-muted">Showing {filteredPrograms.length} programs</span>
              </div>
              
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredPrograms.length === 0 ? (
                <div className="text-center py-5">
                  <h3 className="h4 text-muted">No programs found matching your criteria</h3>
                  <p>Try adjusting your filters to find more programs.</p>
                </div>
              ) : (
                <div className="row row-cols-1 g-4" style={{ maxWidth: '100%' }}>
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className="col">
                      <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{
                        borderRadius: '16px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}>
                        <div className="row g-0 h-100">
                          <div className="col-md-4" style={{ maxHeight: '100%', minHeight: '250px' }}>
                            <img 
                              src={program.image} 
                              alt={program.title} 
                              className="h-100 w-100" 
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4 d-flex flex-column h-100" style={{ maxWidth: '100%' }}>
                              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <span className="badge mb-2" style={{ 
                                  backgroundColor: 'rgba(26, 42, 108, 0.1)', 
                                  color: '#1a2a6c',
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  borderRadius: '50px'
                                }}>
                                  {categories.find(cat => cat.id === program.category)?.name}
                                </span>
                                
                                <span className="badge mb-2" style={{ 
                                  backgroundColor: 'rgba(178, 31, 31, 0.1)', 
                                  color: '#b21f1f',
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  borderRadius: '50px'
                                }}>
                                  {regions.find(reg => reg.id === program.region)?.name}
                                </span>
                              </div>
                              
                              <h3 className="card-title h4 fw-bold mb-3">{program.title}</h3>
                              <p className="card-text text-muted mb-3">{program.description}</p>
                              
                              <div className="row mb-3">
                                <div className="col-12 mb-2">
                                  <div className="d-flex align-items-center">
                                    <span className="badge bg-success py-2 px-3" style={{ fontSize: '0.85rem', whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2' }}>
                                      {program.impact}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 mb-2">
                                  <div className="d-flex align-items-center">
                                    <span className="badge bg-primary py-2 px-3" style={{ fontSize: '0.85rem', whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2', width: '100%' }}>
                                      Goal: {program.goal}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-auto">
                                <Link 
                                  to={program.link} 
                                  className="btn py-2" 
                                  style={{ 
                                    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                                    border: 'none', 
                                    color: 'white',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                                  }}
                                >
                                  Learn More
                                  <FaArrowRight className="ms-2" />
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
      
      {/* Donation CTA Section */}
      <section className="section py-5 text-white" style={{ background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="row align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <h2 className="display-5 fw-bold mb-3">Support Our Programs</h2>
              <p className="lead mb-0">Your donation helps us provide critical assistance to families affected by crisis situations worldwide.</p>
            </div>
            <div className="col-lg-4 text-center text-lg-end mt-4 mt-lg-0">
              <Link 
                to="/donate" 
                className="btn btn-lg py-3 px-4" 
                style={{ 
                  background: 'white', 
                  color: '#1a2a6c',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
              >
                Donate Now
                <FaArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Partners</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              We collaborate with these organizations to maximize our impact and reach
            </p>
          </div>
          
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
            {[1, 2, 3, 4, 5].map((partner) => (
              <div key={partner} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center justify-content-center p-4">
                    <img 
                      src="/images/harold.jpg" 
                      alt={`Partner ${partner}`} 
                      className="img-fluid" 
                      style={{ maxHeight: '80px', filter: 'grayscale(100%)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/partners" className="btn btn-outline-primary">
              View All Partners
              <FaArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
