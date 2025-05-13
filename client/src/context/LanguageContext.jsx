import { createContext, useState, useContext, useEffect } from 'react';

// Default translations
const translations = {
  en: {
    common: {
      home: 'Home',
      donate: 'Donate',
      login: 'Login',
      register: 'Register',
      aboutUs: 'About Us',
      programs: 'Programs',
      events: 'Events',
      blog: 'Blog',
      contact: 'Contact',
      partners: 'Partners',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Your email address',
      readMore: 'Read More',
      joinUs: 'Join Us',
      learnMore: 'Learn More'
    },
    home: {
      hero: {
        title: 'Making a Difference Together',
        subtitle: 'Join us in creating positive change for communities in need'
      }
    },
    donate: {
      title: 'Your Support Makes a Difference',
      subtitle: 'Every donation helps us create lasting positive change in our communities.',
      donateCta: 'Donate Today',
      amount: 'Amount',
      custom: 'Custom Amount',
      recurring: 'Make this a monthly donation',
      paymentInfo: 'Payment Information',
      donorInfo: 'Donor Information',
      anonymous: 'Make this donation anonymous',
      submit: 'Complete Donation'
    }
  },
  es: {
    common: {
      home: 'Inicio',
      donate: 'Donar',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      aboutUs: 'Sobre Nosotros',
      programs: 'Programas',
      events: 'Eventos',
      blog: 'Blog',
      contact: 'Contacto',
      partners: 'Socios',
      subscribe: 'Suscribirse',
      emailPlaceholder: 'Tu dirección de correo',
      readMore: 'Leer Más',
      joinUs: 'Únete a Nosotros',
      learnMore: 'Saber Más'
    },
    home: {
      hero: {
        title: 'Haciendo una Diferencia Juntos',
        subtitle: 'Únete a nosotros para crear un cambio positivo para comunidades necesitadas'
      }
    },
    donate: {
      title: 'Tu Apoyo Hace la Diferencia',
      subtitle: 'Cada donación nos ayuda a crear un cambio positivo en nuestras comunidades.',
      donateCta: 'Donar Hoy',
      amount: 'Cantidad',
      custom: 'Cantidad Personalizada',
      recurring: 'Hacer de esto una donación mensual',
      paymentInfo: 'Información de Pago',
      donorInfo: 'Información del Donante',
      anonymous: 'Hacer esta donación anónima',
      submit: 'Completar Donación'
    }
  },
  fr: {
    common: {
      home: 'Accueil',
      donate: 'Faire un Don',
      login: 'Connexion',
      register: 'S\'inscrire',
      aboutUs: 'À Propos',
      programs: 'Programmes',
      events: 'Événements',
      blog: 'Blog',
      contact: 'Contact',
      partners: 'Partenaires',
      subscribe: 'S\'abonner',
      emailPlaceholder: 'Votre adresse e-mail',
      readMore: 'Lire Plus',
      joinUs: 'Rejoignez-nous',
      learnMore: 'En Savoir Plus'
    },
    home: {
      hero: {
        title: 'Faire une Différence Ensemble',
        subtitle: 'Rejoignez-nous pour créer un changement positif pour les communautés dans le besoin'
      }
    },
    donate: {
      title: 'Votre Soutien Fait la Différence',
      subtitle: 'Chaque don nous aide à créer un changement positif dans nos communautés.',
      donateCta: 'Faire un Don Aujourd\'hui',
      amount: 'Montant',
      custom: 'Montant Personnalisé',
      recurring: 'Faire de ce don un don mensuel',
      paymentInfo: 'Informations de Paiement',
      donorInfo: 'Informations du Donateur',
      anonymous: 'Faire ce don anonymement',
      submit: 'Finaliser le Don'
    }
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, or use browser language, or default to English
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'es', 'fr'].includes(browserLang) ? browserLang : 'en';
  };
  
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('detourCharityLanguage');
    return storedLanguage || getBrowserLanguage();
  });
  
  // Store language preference in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('detourCharityLanguage', language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);
  
  // Function to change language
  const changeLanguage = (lang) => {
    if (['en', 'es', 'fr'].includes(lang)) {
      setLanguage(lang);
    }
  };
  
  // Function to get translated text
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English if translation is missing
        let fallback = translations['en'];
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey]) {
            fallback = fallback[fbKey];
          } else {
            return key; // Return the key itself if no translation found
          }
        }
        return fallback;
      }
    }
    
    return result;
  };
  
  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' }
    ]
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
