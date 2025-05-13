import { FaHeart } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center">
        <FaHeart className="text-accent text-5xl animate-bounce mb-4" />
        <h2 className="text-2xl font-heading font-bold text-primary">Loading...</h2>
      </div>
    </div>
  );
};

export default Loader;
