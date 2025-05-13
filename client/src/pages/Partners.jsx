import React from 'react';
import { FaHandshake, FaExternalLinkAlt } from 'react-icons/fa';

const Partners = () => {
  // Sample partner organizations
  const partners = [
    {
      id: 1,
      name: 'Ukrainian Aid Foundation',
      description: 'Supporting Ukrainian families with emergency aid and resettlement assistance.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/ukraine-aid',
      primaryFocus: 'Emergency Relief'
    },
    {
      id: 2,
      name: 'Global Hospitality Network',
      description: 'A network of hotels and accommodations offering free stays for refugees and displaced families.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/hospitality',
      primaryFocus: 'Temporary Housing'
    },
    {
      id: 3,
      name: 'International Air Transport Relief',
      description: 'Coordinating emergency flights and transportation for families fleeing crisis zones.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/air-transport',
      primaryFocus: 'Transportation'
    },
    {
      id: 4,
      name: 'Children First Initiative',
      description: 'Providing psychological support and education for children affected by crisis and displacement.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/children-first',
      primaryFocus: 'Child Welfare'
    },
    {
      id: 5,
      name: 'Travel Industry Solidarity Group',
      description: 'Uniting tour operators, hotels, and airlines to contribute resources to humanitarian efforts.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/travel-solidarity',
      primaryFocus: 'Industry Coordination'
    },
    {
      id: 6,
      name: 'Refugee Integration Program',
      description: 'Supporting the integration of refugees into new communities through language and cultural programs.',
      logo: '/images/harold.jpg',
      website: 'https://example.com/integration',
      primaryFocus: 'Resettlement'
    }
  ];

  // Sample ways to partner with us
  const partnershipOptions = [
    {
      title: 'Financial Support',
      description: 'Make a corporate donation or establish a recurring funding partnership to support our programs.',
      icon: <i className="bi bi-cash-coin fs-1 text-primary mb-3"></i>
    },
    {
      title: 'In-Kind Donations',
      description: 'Donate hotel stays, flight tickets, transportation services, or other travel-related resources.',
      icon: <i className="bi bi-gift fs-1 text-primary mb-3"></i>
    },
    {
      title: 'Volunteer Programs',
      description: 'Partner with us to create volunteer opportunities for your employees in our field operations.',
      icon: <i className="bi bi-people fs-1 text-primary mb-3"></i>
    },
    {
      title: 'Joint Initiatives',
      description: 'Collaborate on new programs that leverage our combined expertise and resources.',
      icon: <i className="bi bi-lightbulb fs-1 text-primary mb-3"></i>
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-dark text-white mb-5">
        <div className="container-custom py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Our Partners</h1>
              <p className="lead mb-4">Together we're making a greater impact for families in crisis around the world.</p>
              <p className="mb-5">SecretDetours Charity collaborates with humanitarian organizations, travel industry leaders, and other charities to maximize our effectiveness in providing aid and support to those who need it most.</p>
              <div className="d-flex gap-3">
                <a href="#current-partners" className="btn btn-primary px-4 py-2">Current Partners</a>
                <a href="#become-partner" className="btn btn-outline-light px-4 py-2">Become a Partner</a>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="/images/harold.jpg" 
                alt="Partnership handshake" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners Section */}
      <section id="current-partners" className="py-5 mb-5">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Partner Organizations</h2>
            <div className="mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)' }}></div>
            <p className="text-muted mx-auto mb-5" style={{ maxWidth: '800px' }}>
              We're proud to work alongside these dedicated organizations in our mission to support families in crisis.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            {partners.map(partner => (
              <div key={partner.id} className="col">
                <div className="card h-100 border-0 shadow">
                  <div className="p-3 bg-light text-center">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="img-fluid rounded-circle" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body">
                    <span className="badge bg-primary mb-2">{partner.primaryFocus}</span>
                    <h5 className="card-title">{partner.name}</h5>
                    <p className="card-text text-muted">{partner.description}</p>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <a 
                      href={partner.website} 
                      className="text-decoration-none d-inline-flex align-items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary)' }}
                    >
                      Visit Website
                      <FaExternalLinkAlt className="ms-2 small" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section id="become-partner" className="py-5 bg-light">
        <div className="container-custom">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">Become a Partner</h2>
              <p className="lead mb-4">Join our network of organizations making a difference for families affected by crisis.</p>
              <p className="mb-4">
                We believe in the power of collaboration to create meaningful impact. By partnering with SecretDetours Charity, 
                your organization can play a crucial role in providing transportation, accommodation, and support to families 
                affected by humanitarian crises, particularly those impacted by the situation in Ukraine.
              </p>
              <div className="d-flex align-items-center mb-4">
                <FaHandshake className="fs-1 me-3" style={{ color: 'var(--primary)' }} />
                <div>
                  <h5 className="mb-1">Together we can do more</h5>
                  <p className="mb-0 text-muted">Combining resources, expertise, and networks</p>
                </div>
              </div>
              <a href="/contact" className="btn btn-primary px-4 py-2">
                Contact Us to Partner
              </a>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Partnership Opportunities</h3>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {partnershipOptions.map((option, index) => (
                      <div key={index} className="col">
                        <div className="p-3 h-100">
                          {option.icon}
                          <h5>{option.title}</h5>
                          <p className="text-muted mb-0 small">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-5">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Partnership Success Stories</h2>
            <div className="mx-auto mb-4" style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)' }}></div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <h4 className="mb-3">Emergency Evacuation Program</h4>
                  <p className="text-muted">
                    In collaboration with International Air Transport Relief and several commercial airlines, 
                    we coordinated the evacuation of 230 families from Ukraine in March 2022, providing them 
                    with safe transportation to temporary housing in neighboring countries.
                  </p>
                  <div className="d-flex align-items-center mt-4">
                    <img 
                      src="/images/harold.jpg" 
                      className="rounded-circle me-3"
                      alt="Success story"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="mb-1">230 families</h6>
                      <p className="mb-0 small text-muted">Safely evacuated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <h4 className="mb-3">Hotel Network Initiative</h4>
                  <p className="text-muted">
                    Our partnership with Global Hospitality Network has provided over 5,000 nights of free 
                    accommodation for displaced families, giving them a safe place to stay while they navigate 
                    the challenges of relocation and rebuilding their lives.
                  </p>
                  <div className="d-flex align-items-center mt-4">
                    <img 
                      src="/images/harold.jpg" 
                      className="rounded-circle me-3"
                      alt="Success story"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="mb-1">5,000+ nights</h6>
                      <p className="mb-0 small text-muted">Of safe accommodation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container-custom text-center py-4">
          <h2 className="display-5 fw-bold mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px' }}>
            Contact us today to discuss how your organization can partner with SecretDetours Charity
            to support families affected by crisis.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/contact" className="btn btn-light btn-lg px-4">Contact Us</a>
            <a href="/donate" className="btn btn-outline-light btn-lg px-4">Donate Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
