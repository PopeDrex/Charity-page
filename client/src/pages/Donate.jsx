import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCreditCard, FaPaypal, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isRecurring, setIsRecurring] = useState(false);
  const [anonymousDonation, setAnonymousDonation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Suggested donation amounts
  const suggestedAmounts = [10, 25, 50, 100, 250];
  
  const handleDonationAmount = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setDonationAmount('custom');
  };
  
  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate final donation amount
    const finalAmount = donationAmount === 'custom' ? parseFloat(customAmount) : parseFloat(donationAmount);
    
    // In a real app, you would process the payment here using the selected payment processor
    console.log('Processing donation:', {
      amount: finalAmount,
      recurring: isRecurring,
      anonymous: anonymousDonation,
      paymentMethod,
      donorInfo: anonymousDonation ? 'Anonymous' : donorInfo
    });
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Reset form (in a real app you might redirect to a thank-you page instead)
    setTimeout(() => {
      setDonationAmount('');
      setCustomAmount('');
      setDonorInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
      });
      setPaymentMethod('creditCard');
      setIsRecurring(false);
      setAnonymousDonation(false);
      setShowSuccessMessage(false);
    }, 5000);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-dark py-20 md:py-32 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/harold.jpg)' }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Your <span className="text-primary">Support</span> Makes a Difference
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Every donation helps us create lasting positive change in our communities. 
              Your generosity transforms lives and builds brighter futures.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Donation Form Section */}
      <section className="section bg-light py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {showSuccessMessage ? (
              <div className="p-10 text-center">
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Thank You for Your Donation!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your support means the world to us and to those we serve. 
                  A confirmation has been sent to your email.
                </p>
                <button 
                  onClick={() => setShowSuccessMessage(false)}
                  className="btn bg-primary hover:bg-primary/90"
                >
                  Make Another Donation
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Form */}
                <div className="md:w-8/12 p-8">
                  <h2 className="text-2xl font-heading font-bold mb-6">Make a Donation</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Donation Amount */}
                    <div className="mb-8">
                      <label className="block text-gray-700 font-bold mb-3">
                        Select Donation Amount
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                        {suggestedAmounts.map(amount => (
                          <button
                            key={amount}
                            type="button"
                            className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
                              donationAmount === amount.toString()
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleDonationAmount(amount.toString())}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          className={`flex-1 py-3 px-4 border rounded-lg font-medium transition-colors ${
                            donationAmount === 'custom'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setDonationAmount('custom')}
                        >
                          Custom Amount
                        </button>
                        
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-3 text-gray-500">$</span>
                          <input
                            type="number"
                            min="1"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder="Enter amount"
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={donationAmount !== 'custom'}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Recurring Donation */}
                    <div className="mb-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isRecurring}
                          onChange={() => setIsRecurring(!isRecurring)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">Make this a monthly recurring donation</span>
                      </label>
                    </div>
                    
                    {/* Anonymous Donation */}
                    <div className="mb-8">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={anonymousDonation}
                          onChange={() => setAnonymousDonation(!anonymousDonation)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">Make this an anonymous donation</span>
                      </label>
                    </div>
                    
                    {!anonymousDonation && (
                      <>
                        {/* Donor Information */}
                        <div className="mb-8">
                          <h3 className="text-lg font-bold mb-4">Donor Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="firstName">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={donorInfo.firstName}
                                onChange={handleDonorInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastName">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={donorInfo.lastName}
                                onChange={handleDonorInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={donorInfo.email}
                                onChange={handleDonorInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={donorInfo.phone}
                                onChange={handleDonorInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Address Information */}
                        <div className="mb-8">
                          <h3 className="text-lg font-bold mb-4">Billing Address</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="address">
                                Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={donorInfo.address}
                                onChange={handleDonorInfoChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="city">
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  value={donorInfo.city}
                                  onChange={handleDonorInfoChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="state">
                                  State/Province
                                </label>
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  value={donorInfo.state}
                                  onChange={handleDonorInfoChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="zipCode">
                                  Zip/Postal Code
                                </label>
                                <input
                                  type="text"
                                  id="zipCode"
                                  name="zipCode"
                                  value={donorInfo.zipCode}
                                  onChange={handleDonorInfoChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="country">
                                  Country
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  value={donorInfo.country}
                                  onChange={handleDonorInfoChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                  <option value="US">United States</option>
                                  <option value="CA">Canada</option>
                                  <option value="UK">United Kingdom</option>
                                  <option value="AU">Australia</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Payment Method */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={() => setPaymentMethod('creditCard')}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <span className="ml-2 flex items-center">
                            <FaCreditCard className="text-gray-700 mr-2" />
                            Credit/Debit Card
                          </span>
                        </label>
                        
                        <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <span className="ml-2 flex items-center">
                            <FaPaypal className="text-blue-500 mr-2" />
                            PayPal
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      disabled={!donationAmount || (donationAmount === 'custom' && !customAmount)}
                    >
                      Complete Donation
                    </button>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Your donation is secure and encrypted. Thank you for your support!
                    </p>
                  </form>
                </div>
                
                {/* Sidebar */}
                <div className="md:w-4/12 bg-gray-50 p-8 border-l">
                  <div className="space-y-6">
                    <div className="text-center mb-4">
                      <div className="inline-block p-3 bg-primary/10 rounded-full">
                        <FaHeart className="text-primary text-3xl" />
                      </div>
                      <h3 className="text-xl font-bold mt-3">Why Donate?</h3>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-700 mb-2">Your Impact</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex">
                          <span className="text-primary mr-2">•</span>
                          <span>$10 provides school supplies for a child</span>
                        </li>
                        <li className="flex">
                          <span className="text-primary mr-2">•</span>
                          <span>$25 provides a week of meals for a family in need</span>
                        </li>
                        <li className="flex">
                          <span className="text-primary mr-2">•</span>
                          <span>$50 supports housing assistance for the homeless</span>
                        </li>
                        <li className="flex">
                          <span className="text-primary mr-2">•</span>
                          <span>$100 funds educational workshops for a month</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-700 mb-2">Tax Benefits</h4>
                      <p className="text-sm text-gray-600">
                        Your donation is tax-deductible. We'll send you a receipt for your records.
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-700 mb-2">Donation Safety</h4>
                      <p className="text-sm text-gray-600 flex items-start">
                        <FaInfoCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <span>All transactions are secured with 256-bit SSL encryption. Your information is never shared with third parties.</span>
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-700 mb-2">Questions?</h4>
                      <p className="text-sm text-gray-600">
                        For donation related questions, contact us at:
                        <a href="mailto:donations@detour-charity.org" className="block text-primary hover:underline">
                          donations@detour-charity.org
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your donations help us make a real difference in the lives of those we serve. 
              Here's how your support is transforming our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-light p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">5,000+</h3>
              <p className="text-xl font-medium text-gray-800 mb-3">Individuals Served</p>
              <p className="text-gray-600">
                Over five thousand individuals have received direct assistance through our programs.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-light p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">$1.2M</h3>
              <p className="text-xl font-medium text-gray-800 mb-3">Funds Distributed</p>
              <p className="text-gray-600">
                Your donations have provided over $1.2 million in direct financial assistance.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-light p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">12</h3>
              <p className="text-xl font-medium text-gray-800 mb-3">Community Programs</p>
              <p className="text-gray-600">
                We've established 12 ongoing programs addressing critical community needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section bg-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Voices of Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from those whose lives have been touched by our programs, made possible by generous donors like you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/harold.jpg" 
                    alt="Emily Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emily Johnson</h3>
                  <p className="text-gray-500">Housing Program Recipient</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The housing assistance program changed everything for me and my children. For the first time in years, 
                we have a safe, stable home. I'm now able to work and pursue my education, building a better future for my family."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/images/harold.jpg" 
                    alt="Marcus Williams" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Marcus Williams</h3>
                  <p className="text-gray-500">Education Program Graduate</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The scholarship and mentoring I received through Detour Charity's education program opened doors I never 
                thought possible. I'm now the first in my family to graduate college and have started a career I love."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Together, We Can Make a Difference
            </h2>
            <p className="text-xl mb-8">
              Your donation, no matter the size, helps us continue our mission and create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#donate-form" className="btn bg-white text-primary hover:bg-gray-100">
                Donate Today
              </a>
              <a href="/contact" className="btn bg-dark hover:bg-dark/90">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
