import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="section bg-light flex items-center justify-center min-h-[70vh]">
      <div className="container-custom text-center">
        <FaExclamationTriangle className="text-accent text-7xl mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <FaArrowLeft className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
