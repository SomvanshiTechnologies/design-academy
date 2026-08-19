import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialNavigation = ({ isVisible, onPrevious, onNext }) => {
  if (!isVisible) return null;

  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        onClick={handlePrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-orange-50 text-orange-500 p-2 sm:p-3 rounded-full shadow-md border border-orange-200 transition-all duration-300 hover:scale-110 z-20"
        whileHover={{
          scale: 1.1,
          backgroundColor: "#fff7ed",
          boxShadow: "0 8px 25px rgba(255, 154, 52, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={16} className="sm:w-6 sm:h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-orange-50 text-orange-500 p-2 sm:p-3 rounded-full shadow-md border border-orange-200 transition-all duration-300 hover:scale-110 z-20"
        whileHover={{
          scale: 1.1,
          backgroundColor: "#fff7ed",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={16} className="sm:w-6 sm:h-6" />
      </motion.button>
    </>
  );
};

export default TestimonialNavigation;
