import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHandHoldingHeart, FaHome, FaUsers, FaPlaneDeparture } from 'react-icons/fa';

const Home = () => {
  const [stats, setStats] = useState([
    { id: 1, value: 0, target: 150, label: 'Projects Completed' },
    { id: 2, value: 0, target: 1200, label: 'People Helped' },
    { id: 3, value: 0, target: 50, label: 'Dedicated Volunteers' },
    { id: 4, value: 0, target: 10, label: 'Awards Received' }
  ]);

  useEffect(() => {
    // Animate stats numbers counting up
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.value < stat.target) {
            const increment = Math.ceil(stat.target / 30); // Speed of count animation
            const newValue = Math.min(stat.value + increment, stat.target);
            return { ...stat, value: newValue };
          }
          return stat;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const programs = [
    {
      id: 1,
      title: 'Family Holiday Program',
      description: 'Providing all-expenses-paid vacation packages to families in financial hardship who could never afford a holiday.',
      icon: <FaPlaneDeparture className="fs-1 mb-3" />,
      link: '/programs/family-holidays'
    },
    {
      id: 2,
      title: 'Respite Breaks',
      description: 'Offering short hotel stays and relaxing getaways for parents and caregivers of children with serious illnesses or disabilities.',
      icon: <FaHome className="fs-1 mb-3" />,
      link: '/programs/respite-breaks'
    },
    {
      id: 3,
      title: 'Dream Experiences',
      description: 'Creating memorable excursions and special experiences for children from disadvantaged backgrounds or facing serious health challenges.',
      icon: <FaHandHoldingHeart className="fs-1 mb-3" />,
      link: '/programs/dream-experiences'
    },
    {
      id: 4,
      title: 'Holiday Sponsorship',
      description: 'Partnering with donors and travel industry supporters to sponsor vacation opportunities for families who could otherwise not afford them.',
      icon: <FaUsers className="fs-1 mb-3" />,
      link: '/programs/sponsorship'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Charity Gala',
      date: 'June 15, 2025',
      location: 'Grand Ballroom, City Center',
      image: '/images/harold.jpg',
      link: '/events/annual-charity-gala'
    },
    {
      id: 2,
      title: 'Community Cleanup Day',
      date: 'July 8, 2025',
      location: 'Riverside Park',
      image: '/images/harold.jpg',
      link: '/events/community-cleanup'
    },
    {
      id: 3,
      title: 'Back to School Drive',
      date: 'August 20, 2025',
      location: 'Community Center',
      image: '/images/harold.jpg',
      link: '/events/back-to-school'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5 py-md-0 min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' }}>
        {/* Moving background patterns */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px, 90px 90px',
          backgroundPosition: '0 0, 15px 15px'
        }}></div>
        
        {/* Background overlay with opacity */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            backgroundImage: 'url(/images/harold.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            opacity: 0.6
          }}
        ></div>
        
        {/* Decorative shapes */}
        <div className="position-absolute" style={{ 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, rgba(66, 103, 178, 0.3), rgba(66, 103, 178, 0.1))',
          filter: 'blur(60px)',
          top: '-50px',
          left: '-50px',
          zIndex: 0 
        }}></div>
        
        <div className="position-absolute" style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, rgba(239, 83, 80, 0.3), rgba(239, 83, 80, 0.1))',
          filter: 'blur(50px)',
          bottom: '50px',
          right: '100px',
          zIndex: 0 
        }}></div>
        
        <div className="container-custom position-relative hero-content text-center py-5 py-md-0 z-2">
          <div className="bg-blur p-4 p-md-5 rounded-4" style={{ 
            backdropFilter: 'blur(10px)', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <h1 className="display-3 fw-bold mb-4" style={{ 
              background: 'linear-gradient(90deg, #f5f7fa, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Creating <span style={{ color: '#ff7e5f' }}>Hope</span> & Building <span style={{ color: '#00d2ff' }}>Futures</span>
            </h1>
            
            <p className="lead fs-3 mb-3 mx-auto" style={{ maxWidth: '800px', fontWeight: '300' }}>
              Supporting families in crisis through the power of travel
            </p>
            
            <p className="mb-5 mx-auto text-white-90" style={{ maxWidth: '800px', letterSpacing: '0.5px' }}>
              A humanitarian initiative by <strong className="text-warning">SecretDetours Travel Company</strong> dedicated to helping families affected by the crisis in Ukraine and other emergencies worldwide
            </p>
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/donate" className="btn btn-lg py-3 px-4" style={{ 
                background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                border: 'none', 
                boxShadow: '0 4px 15px rgba(255, 126, 95, 0.4)',
                transition: 'all 0.3s ease',
                color: 'white',
                fontWeight: '600'
              }}>
                Donate Now
              </Link>
              <Link to="/contact" className="btn btn-lg py-3 px-4" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(5px)', 
                border: '1px solid rgba(255,255,255,0.3)', 
                color: 'white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}>
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="section py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Impact</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              Through our dedicated work and your generous support, we've made a meaningful difference in our community.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {stats.map(stat => (
              <div key={stat.id} className="col">
                <div className="text-center p-4 rounded-4 h-100" style={{ 
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  transform: 'translateY(0)',
                  ':hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                  }
                }}>
                  <h3 className="display-4 fw-bold mb-2" style={{ 
                    background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent' 
                  }}>{stat.value}+</h3>
                  <p className="fw-medium" style={{ color: '#555' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section bg-light">
        <div className="container-custom">
          <div className="row align-items-center">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="display-5 fw-bold mb-4">Who We Are & What We Do</h2>
              <p className="text-muted mb-4">
                <strong>Detour Charity</strong> was founded in 2022 by <strong>SecretDetours Travel Company</strong> with an urgent mission: to provide support for families affected by the crisis in Ukraine and other humanitarian emergencies worldwide. We believe that the travel industry can be a powerful force for good.
              </p>
              <p className="text-muted mb-4">
                Our team leverages the global network and resources of SecretDetours to deliver aid where it's needed most. With a percentage of every travel booking dedicated to our humanitarian efforts, we're creating a sustainable model for crisis response and long-term support.
              </p>
              <Link to="/about" className="text-decoration-none d-inline-flex align-items-center fw-medium" style={{ color: 'var(--primary)' }}>
                Learn more about our mission
                <FaArrowRight className="ms-2" />
              </Link>
              <img 
                src="/images/harold.jpg" 
                alt="Volunteers working together" 
                className="img-fluid rounded mt-4 d-md-none" 
              />
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img 
                src="/images/harold.jpg" 
                alt="Volunteers working together" 
                className="img-fluid rounded shadow" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Our Programs</h2>
            <div className="mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)' }}></div>
            <p className="text-muted mx-auto mb-5" style={{ maxWidth: '800px' }}>
              Our programs focus on emergency relief, resettlement support, and long-term assistance for families affected by crises in Ukraine and beyond.
            </p>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {programs.map((program) => (
              <div key={program.id} className="col">
                <div className="card h-100 text-center p-4 border-0 shadow">
                  <div className="card-body">
                    <div className="mb-3 text-center" style={{ color: 'var(--primary)' }}>
                      {program.icon}
                    </div>
                    <h3 className="card-title fw-bold mb-3">{program.title}</h3>
                    <p className="card-text text-muted mb-4">{program.description}</p>
                    <Link 
                      to={program.link} 
                      className="text-decoration-none d-inline-flex align-items-center" 
                      style={{ color: 'var(--primary)' }}
                    >
                      Learn more
                      <FaArrowRight className="ms-2 small" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/programs" className="btn btn-primary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="section text-white" style={{ background: 'linear-gradient(120deg, var(--primary), var(--dark))' }}>
        <div className="container-custom">
          <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="display-4 fw-bold mb-3">
              Your Support Makes a Difference
            </h2>
            <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'white', opacity: '0.7' }}></div>
            <p className="lead mb-5">
              Every donation, combined with a portion of every SecretDetours travel booking, helps us provide critical support to families affected by the crisis in Ukraine and other humanitarian emergencies.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/donate" className="btn btn-lg shadow" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                Donate Now
              </Link>
              <Link to="/contact" className="btn btn-light btn-lg text-dark shadow">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section bg-light">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Upcoming Events</h2>
            <div className="mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)' }}></div>
            <p className="text-muted mx-auto mb-5" style={{ maxWidth: '800px' }}>
              Join us at our upcoming events to support our cause, connect with our community, and make a difference together.
            </p>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="col">
                <div className="card h-100 shadow border-0 overflow-hidden">
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="card-img-top h-100 w-100"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="card-title fw-bold mb-3">{event.title}</h3>
                    <p className="card-text text-muted mb-1">
                      <span className="fw-medium">Date:</span> {event.date}
                    </p>
                    <p className="card-text text-muted mb-3">
                      <span className="fw-medium">Location:</span> {event.location}
                    </p>
                    <Link 
                      to={event.link} 
                      className="text-decoration-none d-inline-flex align-items-center fw-medium"
                      style={{ color: 'var(--primary)' }}
                    >
                      Event Details
                      <FaArrowRight className="ms-2 small" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 text-center">
            <Link to="/events" className="btn btn-primary btn-lg mt-4">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section text-white" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="container-custom">
          <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="display-4 fw-bold mb-3">
              Stay Updated
            </h2>
            <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', backgroundColor: 'var(--primary)' }}></div>
            <p className="lead mb-5">
              Subscribe to our newsletter to receive updates on our initiatives, upcoming events, and ways to get involved.
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
                    Subscribe Now
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

export default Home;
