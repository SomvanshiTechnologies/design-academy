import React, { useEffect } from 'react';
import { Mail, Phone, ArrowRight, MapPin, Send, Clock, Users, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactUsForm from './ContactUsForm';
import { useNavigate } from 'react-router-dom';
import { email, phone, adress } from '../data/contact';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const ContactUs = () => {
  const pageMetaTags = usePageMeta('contact');

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: 'Email us',
      value: email,
      description: 'Send us an email anytime',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: 'Call us',
      value: phone,
      description: 'Mon-Fri from 8am to 5pm',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: 'Visit us',
      value: adress,
      description: 'Come say hello at our office',
      gradient: 'from-purple-500 to-purple-600'
    },
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: 'Expert Team',
      description: 'Learn from industry professionals'
    },
    {
      icon: <Award className="w-6 h-6 text-orange-500" />,
      title: 'Certified Courses',
      description: 'Get recognized certifications'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace'
    }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-12 md:py-20 mt-12 px-4 sm:px-6 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {pageMetaTags}

      <motion.div 
        className="max-w-7xl mx-auto"
        // initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Info Section */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-orange-500 mr-3" />
                <p className="text-sm text-orange-600 uppercase font-bold tracking-wider">
                  We're here to help you
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                <span className="text-orange-500">Discuss</span> Your Educational Needs
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Looking for top-quality training? Let our expert team design a personalized learning
                plan that fits your goals and schedule.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <motion.div className="space-y-4">
              {contactInfo.map(({ icon, title, value, description, gradient }, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  custom={i}
                  className="group relative bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl p-6 shadow-md hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                  
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <motion.div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-r ${gradient} rounded-xl shadow-md`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {icon}
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">{title}</p>
                      <p className="text-base font-semibold text-gray-900 mb-1">{value}</p>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    {/* <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-orange-500" />
                    </motion.div> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-md"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Award className="w-6 h-6 text-orange-500 mr-3" />
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50/50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Ready to Start Learning?</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Join over 10,000 students who have already transformed their careers with our courses.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors duration-200 flex items-center text-sm sm:text-base"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div variants={itemVariants}>
            <ContactUsForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;