import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHandHoldingHeart, FaHome, FaUsers, FaPlaneDeparture, FaQuoteLeft, FaGlobe } from 'react-icons/fa';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Executive Director',
      image: '/images/harold.jpg',
      bio: 'With over 15 years of experience in humanitarian work, Sarah leads Detour Charity with passion and commitment to helping families in crisis.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Operations Director',
      image: '/images/harold.jpg',
      bio: 'Michael oversees our day-to-day operations and ensures our programs deliver maximum impact to the families we serve.',
    },
    {
      id: 3,
      name: 'Elena Petrova',
      role: 'Ukraine Relief Coordinator',
      image: '/images/harold.jpg',
      bio: 'Born in Kyiv, Elena brings firsthand experience and deep cultural understanding to our Ukraine relief initiatives.',
    },
    {
      id: 4,
      name: 'David Williams',
      role: 'Partnerships Manager',
      image: '/images/harold.jpg',
      bio: 'David develops and maintains relationships with our corporate sponsors and travel industry partners.',
    }
  ];

  // Values data
  const values = [
    {
      id: 1,
      title: 'Compassion',
      description: 'We believe in treating everyone with dignity, respect, and genuine care.',
      icon: <FaHandHoldingHeart />
    },
    {
      id: 2,
      title: 'Integrity',
      description: 'We maintain the highest standards of ethics and transparency in all our operations.',
      icon: <FaUsers />
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'We constantly seek better ways to serve families through creative solutions.',
      icon: <FaGlobe />
    },
    {
      id: 4,
      title: 'Impact',
      description: 'We focus on creating measurable, meaningful change in the lives of those we serve.',
      icon: <FaPlaneDeparture />
    }
  ];

  // Impact stats
  const impactStats = [
    { number: '750+', label: 'Families Supported' },
    { number: '15', label: 'Countries Reached' },
    { number: '120+', label: 'Corporate Partners' },
    { number: '25,000+', label: 'Volunteer Hours' }
  ];

  const milestones = [
    {
      year: 2022,
      title: 'Founding',
      description: 'Detour Charity was established by SecretDetours Travel Company in response to the Ukraine crisis.'
    },
    {
      year: 2022,
      title: 'First 100 Families',
      description: 'Successfully provided emergency support to over 100 Ukrainian families within our first 3 months.'
    },
    {
      year: 2023,
      title: 'Program Expansion',
      description: 'Launched three new core programs: Family Holiday Program, Respite Breaks, and Dream Experiences.'
    },
    {
      year: 2023,
      title: 'European Partnerships',
      description: 'Established key partnerships with European travel and hospitality companies to enhance our impact.'
    },
    {
      year: 2024,
      title: 'International Recognition',
      description: 'Received multiple humanitarian awards for our innovative approach to family support during crisis.'
    },
    {
      year: 2025,
      title: 'Global Expansion',
      description: 'Extended our reach to support families affected by humanitarian crises worldwide.'
    }
  ];

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
              About Us
            </h1>
            <p className="lead fs-4 mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Learn about our mission, our team, and how we're making a difference
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="/images/harold.jpg" 
                alt="Team working together on humanitarian projects" 
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Our Story</h2>
              
              <p className="text-muted mb-4 fs-5">
                <strong>Detour Charity</strong> was founded in 2022 by <strong>SecretDetours Travel Company</strong> in response to the humanitarian crisis in Ukraine. As the conflict unfolded, we witnessed families torn apart and lives disrupted. We knew we had to act.
              </p>
              
              <p className="text-muted mb-4">
                With our established network in the travel industry, we recognized a unique opportunity to leverage these resources to provide meaningful support. What began as emergency relief quickly evolved into a comprehensive initiative aimed at supporting families through the healing power of travel and respite.
              </p>
              
              <p className="text-muted mb-4">
                Today, Detour Charity operates globally, providing vital support to families affected by crises worldwide. Our programs focus on creating moments of relief, joy, and normalcy for those experiencing extraordinary hardship.
              </p>
              
              <div className="d-flex align-items-center mt-4">
                <Link to="/programs" className="btn btn-lg py-3 px-4" style={{ 
                  background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                  border: 'none', 
                  color: 'white',
                  fontWeight: '600',
                  boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                }}>
                  Our Programs
                  <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Values</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              These core principles guide our work and define our organization
            </p>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {values.map(value => (
              <div key={value.id} className="col">
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4">
                  <div className="card-body">
                    <div className="text-center mb-3 fs-1" style={{ color: 'var(--primary)' }}>
                      {value.icon}
                    </div>
                    <h3 className="h4 fw-bold mb-3">{value.title}</h3>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Stats Section */}
      <section className="section py-5" style={{ background: 'linear-gradient(135deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="text-center mb-5 text-white">
            <h2 className="display-5 fw-bold mb-3">Our Impact</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              backgroundColor: 'rgba(255,255,255,0.5)' 
            }}></div>
            <p className="lead mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Through the support of our donors and partners, we've made a meaningful difference
            </p>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="col">
                <div className="card h-100 border-0 shadow text-center p-4" style={{
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div className="card-body">
                    <h3 className="display-4 fw-bold mb-2 text-white">{stat.number}</h3>
                    <p className="text-white-50 mb-0 fs-5">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Team</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              Meet the dedicated professionals behind Detour Charity
            </p>
          </div>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {teamMembers.map(member => (
              <div key={member.id} className="col">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <div style={{ height: '280px', overflow: 'hidden' }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="card-img-top h-100 w-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4 text-center">
                    <h3 className="h5 fw-bold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-muted mb-0 small">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Journey</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              Key milestones in our organization's history
            </p>
          </div>
          
          <div className="position-relative">
            {/* Vertical line */}
            <div className="position-absolute" style={{
              top: 0,
              bottom: 0,
              left: '50%',
              width: '4px',
              backgroundColor: 'rgba(26, 42, 108, 0.2)',
              transform: 'translateX(-50%)'
            }}></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`row mb-5 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className="col-md-5 text-md-end">
                  <div className={`p-4 rounded-4 shadow-sm h-100 ${index % 2 === 0 ? 'me-md-4' : 'ms-md-4'}`} style={{
                    backgroundColor: 'white',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <h3 className="h5 fw-bold">{milestone.title}</h3>
                    <p className="text-muted mb-0">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="col-md-2 text-center">
                  <div className="timeline-badge p-3 rounded-circle mb-3 mb-md-0 mx-auto" style={{
                    background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                    color: 'white',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    zIndex: 1,
                    position: 'relative'
                  }}>
                    {milestone.year}
                  </div>
                </div>
                
                <div className="col-md-5 d-none d-md-block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="section py-5 text-white" style={{ background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">What People Say</h2>
          </div>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4" style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div className="d-flex flex-column align-items-center text-center">
                  <FaQuoteLeft className="display-3 mb-4" style={{ opacity: 0.5 }} />
                  
                  <p className="lead mb-4 fs-4 fst-italic">
                    "The support we received from Detour Charity changed everything for us. After fleeing Ukraine with just a few belongings, we were lost. The team not only helped with immediate needs but gave us hope through their Family Holiday Program. It was the first time we smiled in months."
                  </p>
                  
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src="/images/harold.jpg" 
                      alt="Anna K." 
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div className="text-start">
                      <h4 className="h5 mb-1">Anna K.</h4>
                      <p className="mb-0 text-white-50">Ukrainian refugee family, supported in 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="display-5 fw-bold mb-4" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Join Our Mission</h2>
            <p className="lead mb-5 text-muted mx-auto" style={{ maxWidth: '800px' }}>
              There are many ways to get involved and support our work with families in crisis
            </p>
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/donate" className="btn btn-lg py-3 px-4" style={{ 
                background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                border: 'none', 
                color: 'white',
                fontWeight: '600',
                boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
              }}>
                Donate Now
              </Link>
              <Link to="/contact" className="btn btn-lg py-3 px-4 btn-outline-primary">
                Become a Volunteer
              </Link>
              <Link to="/events" className="btn btn-lg py-3 px-4 btn-outline-secondary">
                Attend an Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
