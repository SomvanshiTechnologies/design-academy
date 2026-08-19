import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-purple-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-32 w-20 h-20 bg-pink-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      {/* Rotating Design Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-blue-300 rounded-lg opacity-30"
        variants={rotateVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-12 h-12 border-4 border-purple-300 rounded-full opacity-30"
        variants={rotateVariants}
        animate="animate"
        transition={{ delay: 5 }}
      />

      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with Animation */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-600 to-blue-600 leading-none"
            variants={pulseVariants}
            animate="animate"
          >
            404
          </motion.h1>
          
          {/* Floating Icons around 404 */}
          <motion.div
            className="absolute -top-4 -left-4"
            variants={floatingVariants}
            animate="animate"
          >
            <BookOpen className="w-8 h-8 text-orange-500 opacity-60" />
          </motion.div>
          <motion.div
            className="absolute -top-8 -right-8"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1.5 }}
          >
            <Search className="w-6 h-6 text-orange-500 opacity-60" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for seems to have taken a creative detour.
          </p>
          <p className="text-md text-gray-500">
            Don't worry, even the best designers sometimes lose their way!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Additional Help Text */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Looking for something specific?
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <motion.button
              onClick={() => navigate('/courses')}
              className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
            >
              Browse Courses
            </motion.button>
            <span className="text-gray-400">•</span>
            <motion.button
              onClick={() => navigate('/blogs')}
              className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
            >
              Read Blogs
            </motion.button>
            <span className="text-gray-400">•</span>
            <motion.button
              onClick={() => navigate('/contact')}
              className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
