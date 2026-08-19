import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowRight, Rocket, TrendingUp, Target } from "lucide-react";
import { course as courses } from "../data/course";

const EducationDirections = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".course-card",
          { opacity: 0, y: 100, scale: 0.8, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.15,
            delay: 0.5,
          }
        );

        gsap.to(".float-element", {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.2,
        });

        gsap.set(".stat-badge", { scale: 0 });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  const handleCourseClick = (courseLink) => {
    const courseName = courseLink.replace("/", "");
    navigate(`/courses/${courseName}`);
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-blue-600 to-white rounded-t-[60px] md:rounded-t-[100px] px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-20 items-center text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-inter">
              Directions of <span className="">Education</span>
            </h2>

            <motion.p
              className="text-white text-base sm:text-lg leading-relaxed mt-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              At our institution, we offer an extensive array of learning
              pathways and specialized disciplines, encompassing
              <span className="font-bold text-white"> Graphic Design Fundamentals,</span>
              <span className="font-bold text-white"> Digital Illustration,</span> and cutting-edge technologies.
            </motion.p>

            <motion.div
              className="mt-6 inline-flex items-center gap-2 bg-white text-blue-600 py-1 px-4 rounded-xl font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Industry-Leading Curriculum</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((card, index) => (
            <motion.div
              key={index}
              className="course-card group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-md transition-all duration-500 cursor-pointer"
              onClick={() => handleCourseClick(card.link)}
              onHoverStart={() => {
                gsap.to(`.stat-badge-${index}`, {
                  scale: 1,
                  duration: 0.3,
                  ease: "back.out(1.7)",
                });
              }}
              onHoverEnd={() => {
                gsap.to(`.stat-badge-${index}`, {
                  scale: 0,
                  duration: 0.2,
                  ease: "power2.in",
                });
              }}
            >
              <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.years}</p>

                <motion.div
                  className="flex items-center justify-between pt-4 border-t border-blue-100"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      Quick Start
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow group-hover:shadow-md transition-all duration-300 flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-8 py-3 sm:px-12 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-md transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/courses")}
          >
            <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            View All Courses
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationDirections;