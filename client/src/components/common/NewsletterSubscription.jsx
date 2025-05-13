import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const NewsletterSubscription = ({ className = '', variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setLoading(true);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };
  
  // Light variant styles for dark backgrounds
  const isDark = variant === 'light';
  
  return (
    <div className={`newsletter-subscription ${className}`}>
      {!subscribed ? (
        <>
          <div className="flex items-center mb-3">
            <FaEnvelope className={`mr-2 ${isDark ? 'text-white' : 'text-primary'}`} />
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Subscribe to Our Newsletter
            </h3>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
            Stay updated with our latest news, events, and ways to get involved.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('common.emailPlaceholder')}
                  className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    isDark 
                      ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/50'
                      : 'border border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                  isDark 
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {loading ? 'Subscribing...' : t('common.subscribe')}
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <FaCheckCircle className={`text-3xl mx-auto mb-2 ${isDark ? 'text-white' : 'text-green-500'}`} />
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Thank You for Subscribing!
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
            You'll receive our latest updates in your inbox.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NewsletterSubscription;
