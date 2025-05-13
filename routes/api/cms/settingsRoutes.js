const express = require('express');
const router = express.Router();

// Sample data - in a real app this would come from a database
let settings = {
  general: {
    siteName: 'Detour Charity',
    tagline: 'Creating Hope & Building Futures',
    logo: null,
    favicon: null,
    phoneNumber: '+1 (234) 567-890',
    email: 'info@detour-charity.org',
    address: '123 Charity Lane, Community City, State 12345',
    socialLinks: {
      facebook: 'https://facebook.com/detour-charity',
      twitter: 'https://twitter.com/detour-charity',
      instagram: 'https://instagram.com/detour-charity',
      linkedin: 'https://linkedin.com/company/detour-charity'
    }
  },
  email: {
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@detour-charity.org',
    smtpPassword: 'password123',
    senderEmail: 'no-reply@detour-charity.org',
    senderName: 'Detour Charity'
  },
  donation: {
    paypalClientId: 'sandbox_client_id',
    stripePublicKey: 'pk_test_example',
    stripeSecretKey: 'sk_test_example',
    currencyCode: 'USD',
    suggestedAmounts: '10,25,50,100',
    allowCustomAmount: true,
    thankYouMessage: 'Thank you for your generous donation! Your support helps us make a difference in our community.'
  }
};

// Get all settings
router.get('/', (req, res) => {
  // Hide sensitive information
  const safeSettings = {
    ...settings,
    email: {
      ...settings.email,
      smtpPassword: '********'
    },
    donation: {
      ...settings.donation,
      stripeSecretKey: '********************'
    }
  };
  
  res.json(safeSettings);
});

// Get specific settings section
router.get('/:section', (req, res) => {
  const { section } = req.params;
  
  if (!settings[section]) {
    return res.status(404).json({ message: 'Settings section not found' });
  }
  
  // Hide sensitive information
  let safeSection = { ...settings[section] };
  
  if (section === 'email') {
    safeSection.smtpPassword = '********';
  } else if (section === 'donation') {
    safeSection.stripeSecretKey = '********************';
  }
  
  res.json(safeSection);
});

// Update settings
router.post('/', (req, res) => {
  const { general, email, donation } = req.body;
  
  // Update general settings if provided
  if (general) {
    settings.general = {
      ...settings.general,
      ...general,
      socialLinks: {
        ...settings.general.socialLinks,
        ...(general.socialLinks || {})
      }
    };
  }
  
  // Update email settings if provided
  if (email) {
    settings.email = {
      ...settings.email,
      ...email
    };
  }
  
  // Update donation settings if provided
  if (donation) {
    settings.donation = {
      ...settings.donation,
      ...donation
    };
  }
  
  // Return updated settings with sensitive info hidden
  const safeSettings = {
    ...settings,
    email: {
      ...settings.email,
      smtpPassword: '********'
    },
    donation: {
      ...settings.donation,
      stripeSecretKey: '********************'
    }
  };
  
  res.json({ message: 'Settings updated successfully', settings: safeSettings });
});

// Update specific settings section
router.post('/:section', (req, res) => {
  const { section } = req.params;
  
  if (!settings[section]) {
    return res.status(404).json({ message: 'Settings section not found' });
  }
  
  // Update the specific section
  settings[section] = {
    ...settings[section],
    ...req.body
  };
  
  // If updating social links, handle them specially
  if (section === 'general' && req.body.socialLinks) {
    settings.general.socialLinks = {
      ...settings.general.socialLinks,
      ...req.body.socialLinks
    };
  }
  
  // Return updated section with sensitive info hidden
  let safeSection = { ...settings[section] };
  
  if (section === 'email') {
    safeSection.smtpPassword = '********';
  } else if (section === 'donation') {
    safeSection.stripeSecretKey = '********************';
  }
  
  res.json({ message: `${section} settings updated successfully`, [section]: safeSection });
});

// Test email configuration
router.post('/email/test', (req, res) => {
  const { testEmail } = req.body;
  
  if (!testEmail) {
    return res.status(400).json({ message: 'Test email address is required' });
  }
  
  // In a real implementation, this would send an actual test email
  // using the configured SMTP settings
  
  // Simulate successful email sending
  setTimeout(() => {
    res.json({ message: `Test email sent successfully to ${testEmail}` });
  }, 1500);
});

module.exports = router;
