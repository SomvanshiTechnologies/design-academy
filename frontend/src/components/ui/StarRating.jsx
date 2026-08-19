import { motion } from "framer-motion";

const StarRating = ({ rating, isActive, animationPhase }) => {
  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      {[...Array(rating)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: animationPhase === "carousel" && !isActive ? 0.6 : 1,
            scale: 1,
          }}
          transition={{ delay: i * 0.1 }}
          className="text-orange-400 text-lg sm:text-xl"
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
};

export default StarRating;
