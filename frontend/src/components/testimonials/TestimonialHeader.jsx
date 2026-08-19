import { motion } from "framer-motion";
import { headerVariants } from "../../utils/animationVariants";
import { useResponsive } from "../../hooks/useResponsive";

const TestimonialHeader = ({ animationPhase }) => {
  const { isMobile } = useResponsive();

  return (
    <motion.div
      variants={headerVariants}
      custom={isMobile}
      initial="initial"
      animate={animationPhase}
      className="text-center mb-8 sm:mb-12 lg:mb-16 pt-4 sm:pt-6 lg:pt-8"
    >
      <motion.div
        className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-sm font-semibold mb-4 sm:mb-6"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: isMobile ? 0.2 : 0.5, duration: 0.5 }}
      >
        💬 Student Testimonials
      </motion.div>
      <motion.h2
        className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl dm-sans font-bold text-gray-900 mb-4 sm:mb-6 px-4"
        initial={{ opacity: 0, y: isMobile ? -30 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0.4 : 0.7, duration: 0.6 }}
      >
        What Our <span className="text-orange-500 italic">Students</span> Say
      </motion.h2>
      <motion.p
        className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
        initial={{ opacity: 0, y: isMobile ? -20 : 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0.6 : 0.9, duration: 0.5 }}
      >
        Real stories from real students who transformed their careers with us.
      </motion.p>
    </motion.div>
  );
};

export default TestimonialHeader;
