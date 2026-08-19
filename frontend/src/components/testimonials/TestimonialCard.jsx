import { motion } from "framer-motion";
import StarRating from "../ui/StarRating.jsx"
const TestimonialCard = ({
  testimonial,
  index,
  isActive,
  animationPhase,
  variants,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      key={testimonial.id}
      custom={index}
      variants={variants}
      initial="initial"
      animate={animationPhase}
      className="absolute -mt-20 md:mt-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <motion.div
        className={`bg-white rounded-2xl sm:rounded-3xl  p-4 sm:p-6 md:p-8 border-2 ${
          isActive && animationPhase === "carousel"
            ? "border-orange-300"
            : "border-orange-100"
        }`}
        whileHover={{
          scale: animationPhase === "carousel" && isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <StarRating
          rating={testimonial.rating}
          isActive={isActive}
          animationPhase={animationPhase}
        />

        <motion.blockquote
          className={`text-gray-700 ${
            isActive
              ? "text-sm sm:text-base md:text-lg lg:text-xl"
              : "text-xs sm:text-sm md:text-base"
          } leading-relaxed text-center mb-4 sm:mb-6 italic font-light ${
            animationPhase === "carousel" && !isActive ? "opacity-70" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          "{testimonial.testimonial}"
        </motion.blockquote>

        <motion.div
          className={`flex items-center justify-center space-x-2 sm:space-x-3 ${
            animationPhase === "carousel" && !isActive ? "opacity-70" : ""
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className={`${
                isActive
                  ? "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  : "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              } rounded-full object-cover border-2 sm:border-4 border-orange-200`}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="text-center min-w-0 flex-1">
            <h4
              className={`${
                isActive
                  ? "text-sm sm:text-base md:text-lg"
                  : "text-xs sm:text-sm md:text-base"
              } font-bold text-gray-900 truncate`}
            >
              {testimonial.name}
            </h4>
            <p
              className={`text-orange-600 font-semibold ${
                isActive ? "text-xs sm:text-sm" : "text-xs"
              } truncate`}
            >
              {testimonial.role}
            </p>
            <p
              className={`text-gray-500 ${
                isActive ? "text-xs sm:text-sm" : "text-xs"
              } truncate`}
            >
              {testimonial.course}
            </p>
          </div>
        </motion.div>

      
        {/* <motion.div
          className={`mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 ${
            animationPhase === "carousel" && !isActive ? "opacity-70" : ""
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center bg-orange-50 rounded-xl sm:rounded-2xl p-2 sm:p-3">
            <div
              className={`${
                isActive
                  ? "text-base sm:text-lg md:text-xl"
                  : "text-sm sm:text-base md:text-lg"
              } font-bold text-orange-600`}
            >
              {testimonial.salary}
            </div>
            <div className="text-xs text-gray-600">Starting Salary</div>
          </div>
          <div className="text-center bg-green-50 rounded-xl sm:rounded-2xl p-2 sm:p-3">
            <div
              className={`${
                isActive
                  ? "text-base sm:text-lg md:text-xl"
                  : "text-sm sm:text-base md:text-lg"
              } font-bold text-green-600`}
            >
              {testimonial.duration}
            </div>
            <div className="text-xs text-gray-600">Completion Time</div>
          </div>
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
