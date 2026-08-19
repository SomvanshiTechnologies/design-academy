import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { course as courses } from "../data/course";

// Animation variant for card entrance
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      type: "spring",
      stiffness: 80,
    },
  }),
};

const Course = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen py-14 px-4 sm:px-6 lg:px-20 mt-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Explore Our <span className="text-blue-600">Courses</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Learn from industry experts with hands-on projects and real-world skills.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <CourseCard {...course} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Course;

const CourseCard = ({ title, years, image, link, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const courseName = link.replace("/", "");
    navigate(`/courses/${courseName}`);
  };

  return (
    <motion.div
      className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md transition-transform duration-500"
      onClick={handleClick}
      whileHover={{ scale: 1.025 }}
    >
      {/* Glass effect container */}
      <div className="relative rounded-3xl overflow-hidden glass-blue shadow-md border border-blue-200/50 group-shadow-lg transition-all duration-500">

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{years}</p>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-between pt-4 border-t border-blue-100"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Quick Start</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md group-hover:shadow-md transition-all duration-300 flex items-center gap-2">
              Explore
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
