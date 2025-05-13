import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuestionCircle, FaCheckCircle, FaClock } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: 'general'
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // FAQ state
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  // Contact information
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      details: 'info@detourcharity.org',
      description: 'For general inquiries',
      link: 'mailto:info@detourcharity.org'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Monday-Friday, 9AM-5PM CET',
      link: 'tel:+15551234567'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      details: '123 Charity Lane, Amsterdam',
      description: 'Netherlands, 1000 AB',
      link: 'https://maps.google.com'
    }
  ];
  
  // Contact reasons
  const contactReasons = [
    { id: 'general', label: 'General Inquiry' },
    { id: 'donation', label: 'Donation Questions' },
    { id: 'volunteer', label: 'Volunteering Opportunities' },
    { id: 'partnership', label: 'Partnership Proposals' },
    { id: 'media', label: 'Media Inquiries' }
  ];
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How are donations to Detour Charity used?',
      answer: 'Donations to Detour Charity directly support our programs for families in crisis. We allocate resources to emergency relief, travel experiences for disadvantaged families, respite breaks for caregivers, and other humanitarian initiatives. We maintain administrative costs below 15% to ensure the majority of donations reach those in need. Detailed financial reports are published annually on our website.'
    },
    {
      id: 2,
      question: 'How can I volunteer with Detour Charity?',
      answer: 'We offer various volunteering opportunities both in-person and remotely. In-person roles include event support, family experience coordination, and administrative assistance. Remote opportunities include translation services, graphic design, and digital marketing support. To become a volunteer, complete our volunteer application form and our team will contact you about available opportunities matching your skills.'
    },
    {
      id: 3,
      question: 'How can my company partner with Detour Charity?',
      answer: 'We welcome corporate partnerships in various forms, including financial donations, in-kind support, employee volunteering programs, and cause marketing initiatives. Our partnerships team works with each business to develop meaningful collaborations that align with your CSR goals while supporting our mission. Contact us at partnerships@detourcharity.org to discuss partnership opportunities.'
    },
    {
      id: 4,
      question: 'How do you select families for your programs?',
      answer: 'We work with a network of referring partners including humanitarian organizations, healthcare providers, and social services to identify families in need. Selection criteria vary by program but typically focus on families affected by crisis situations (war, natural disasters, serious illness) with limited financial resources. Our process ensures we reach those most in need while maintaining dignity and fairness.'
    },
    {
      id: 5,
      question: 'Is my donation tax-deductible?',
      answer: 'Detour Charity is a registered 501(c)(3) organization in the United States and holds equivalent charitable status in several European countries. Donations are generally tax-deductible, but regulations vary by country. We provide donation receipts for all contributions. Please consult with your tax advisor regarding specific deduction eligibility in your jurisdiction.'
    },
    {
      id: 6,
      question: 'How can I receive updates about your work?',
      answer: 'Subscribe to our newsletter at the bottom of our homepage to receive quarterly updates on our programs, success stories, and upcoming events. You can also follow us on social media platforms for more frequent updates and behind-the-scenes content from our initiatives around the world.'
    }
  ];
  
  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          reason: 'general'
        });
      }, 5000);
    }, 1500);
  };
  
  // FAQ toggle handler
  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
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
              Contact Us
            </h1>
            <p className="lead fs-4 mb-0 mx-auto" style={{ maxWidth: '800px' }}>
              Get in touch with our team for any questions, support, or partnership opportunities
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Cards */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="col">
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 p-xl-5">
                  <div className="card-body">
                    <div className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #1a2a6c, #b21f1f)',
                      color: 'white',
                      fontSize: '2rem'
                    }}>
                      {info.icon}
                    </div>
                    
                    <h3 className="h4 fw-bold mb-3">{info.title}</h3>
                    
                    <a 
                      href={info.link} 
                      className="text-decoration-none d-block mb-2" 
                      style={{ 
                        color: 'var(--primary)',
                        fontWeight: '500',
                        fontSize: '1.1rem'
                      }}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {info.details}
                    </a>
                    
                    <p className="text-muted mb-0">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="section py-5 bg-white">
        <div className="container-custom">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Send Us a Message</h2>
              
              <p className="text-muted mb-4">
                We'd love to hear from you! Whether you have a question about our programs, want to get involved, or need assistance, our team is here to help.
              </p>
              
              {submitted ? (
                <div className="card border-0 shadow-sm p-4 rounded-4 bg-success text-white">
                  <div className="d-flex align-items-center">
                    <FaCheckCircle className="me-3 fs-1" />
                    <div>
                      <h3 className="h4 mb-2">Thank You!</h3>
                      <p className="mb-0">Your message has been sent successfully. We'll get back to you shortly.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4 rounded-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label fw-medium">Reason for Contact</label>
                    <select 
                      className="form-select" 
                      id="reason" 
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      {contactReasons.map(reason => (
                        <option key={reason.id} value={reason.id}>{reason.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-medium">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-medium">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn py-3 px-4"
                    style={{ 
                      background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', 
                      border: 'none', 
                      color: 'white',
                      fontWeight: '600',
                      boxShadow: '0 4px 10px rgba(255, 126, 95, 0.3)'
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4" style={{ 
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>Frequently Asked Questions</h2>
              
              <p className="text-muted mb-4">
                Find quick answers to common questions about our organization, programs, and how you can get involved.
              </p>
              
              <div className="accordion accordion-flush" id="faqAccordion">
                {faqs.map(faq => (
                  <div key={faq.id} className="accordion-item border-0 mb-3">
                    <div className="accordion-header">
                      <button 
                        className={`accordion-button ${activeQuestion === faq.id ? '' : 'collapsed'} shadow-sm`}
                        style={{ 
                          backgroundColor: activeQuestion === faq.id ? '#f8f9fa' : 'white',
                          borderRadius: '8px',
                          fontWeight: '600',
                          color: activeQuestion === faq.id ? 'var(--primary)' : '#212529'
                        }}
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <FaQuestionCircle className="me-2 text-primary" />
                        {faq.question}
                      </button>
                    </div>
                    
                    <div className={`accordion-collapse collapse ${activeQuestion === faq.id ? 'show' : ''}`}>
                      <div className="accordion-body text-muted p-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="section py-5 bg-light">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>Our Location</h2>
            <div className="mx-auto mb-4" style={{ 
              width: '120px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)' 
            }}></div>
            <p className="text-dark mx-auto mb-5" style={{ maxWidth: '800px', fontSize: '1.1rem', opacity: 0.8 }}>
              Visit our headquarters in Amsterdam
            </p>
          </div>
          
          <div className="row">
            <div className="col">
              <div className="card border-0 shadow rounded-4 overflow-hidden">
                {/* Replace with actual map or external map embed */}
                <div className="bg-secondary text-white p-5 text-center" style={{ height: '400px' }}>
                  <h3 className="mb-3">Map Placeholder</h3>
                  <p>Interactive map would be embedded here</p>
                </div>
                
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h3 className="h5 fw-bold mb-3">Amsterdam Office</h3>
                      <p className="text-muted mb-0">
                        123 Charity Lane<br />
                        Amsterdam, 1000 AB<br />
                        Netherlands
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h3 className="h5 fw-bold mb-3">Office Hours</h3>
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="me-2 text-primary" />
                        <span className="text-muted">Monday-Friday: 9:00 AM - 5:00 PM CET</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaClock className="me-2 text-primary" />
                        <span className="text-muted">Saturday-Sunday: Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="section py-5 text-white" style={{ background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }}>
        <div className="container-custom">
          <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            <h2 className="display-5 fw-bold mb-3">
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

export default Contact;
