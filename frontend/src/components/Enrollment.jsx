import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3forms from "@web3forms/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

// Mock course data - replace with your actual import
const courses = [
  { title: "Full Stack Web Development" },
  { title: "Data Science & Machine Learning" },
  { title: "Mobile App Development" },
  { title: "UI/UX Design Fundamentals" },
  { title: "Digital Marketing Strategy" }
];

const Enrollments = () => {
  const pageMetaTags = usePageMeta('enrollment');

  const [enrollmentInput, setEnrollmentInput] = useState({
    name: "",
    email: "",
    phNo: "",
    course: "",
    help: "",
    topics: [],
  });

  const [formStatus, setFormStatus] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleEnrollmentInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValue(name, value);
  };

  const courseDropdownContent = courses.map((course) => course.title);

  /* ------------------ React Hook Form & Web3Forms setup ------------------ */
  const { register, handleSubmit, setValue, reset, formState: { isSubmitting, errors } } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phNo: '',
      course: '',
      help: '',
      topics: []
    }
  });

  useEffect(() => {
    register('name', { required: 'Full name is required' });
    register('email', { required: 'Email is required' });
    register('phNo', { required: 'Phone number is required' });
    register('course', { required: 'Course is required' });
    register('help', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } });
    register('topics', {
      validate: value => (value && value.length > 0) || 'Select at least one topic'
    });
  }, [register]);

  const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const { submit: onSubmit } = useWeb3forms({
    access_key: apiKey,
    settings: {
      from_name: 'Skillora',
      subject: 'New Enrollment Inquiry from Skillora Design Academy'
    },
    onSuccess: () => {
      setFormStatus('success');
      reset();
      setEnrollmentInput({
        name: '',
        email: '',
        phNo: '',
        course: '',
        help: '',
        topics: []
      });
      setTimeout(() => setFormStatus(''), 5000);
    },
    onError: () => {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 5000);
    }
  });

  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    setFormStatus('sending');
    e.preventDefault();
    // Include topics selected via UI
    const payload = {
      ...data,
      topics: enrollmentInput.topics.join(', ')
    };
    return onSubmit(payload);
  };

  const TopicsContent = [
    "Course offerings",
    "Enrollment process",
    "Tuition and fees",
    "Career support",
    "Learning materials",
    "Schedule flexibility"
  ];

  // Additional info content
  const benefits = [
    "Expert-led instruction",
    "Hands-on projects",
    "Career support",
    "Flexible schedules",
    "Certificate of completion"
  ];

  const steps = [
    "Submit form",
    "Counsellor call",
    "Reserve seat",
    "Start learning"
  ];

  const faqs = [
    {
      q: "How long will the counsellor take to contact me?",
      a: "Typically within 24 hours on business days."
    },
    {
      q: "Do you provide job placement assistance?",
      a: "Yes, all our diploma programs include dedicated placement support and portfolio reviews."
    },
    {
      q: "Is prior experience required?",
      a: "Most courses start from fundamentals. Some advanced tracks may have prerequisites, which will be mentioned in the syllabus."
    }
  ];

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {pageMetaTags}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br md:py-24 py-20 from-blue-50 via-white to-red-50 flex items-center justify-center p-4"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-black/20"
        >
          <div className="grid lg:grid-cols-5 min-h-[600px]">
            {/* Left Section - Image & Info */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 hidden md:block relative bg-gradient-to-br  from-orange-600 via-orange-500 to-blue-500 overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -left-20 w-40 h-40 border border-white/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -right-20 w-60 h-60 border border-white/10 rounded-full"
                />
              </div>

              <div className="absolute inset-0 bg-black/20" />

              <div className="relative h-full flex flex-col justify-between p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                    Start Your Learning Journey
                  </h2>
                  <p className="text-white/90 text-base leading-relaxed">
                    Join thousands of students who have transformed their careers through our comprehensive courses.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span className="text-sm">Expert-led instruction</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span className="text-sm">Hands-on projects</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span className="text-sm">Career support</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Section - Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 p-4 md:p-8 lg:p-12 relative"
            >
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-500 mr-3" />
                  <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                    Send us an inquiry
                  </h1>
                </div>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  Have questions about our courses? We'd love to help you choose the right path for your learning journey.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                    className="relative"
                  >
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={enrollmentInput.name}
                      onChange={handleEnrollmentInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                  </motion.div>
                  {errors.name && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                    className="relative"
                  >
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={enrollmentInput.email}
                      onChange={handleEnrollmentInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                  </motion.div>
                  {errors.email && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'phone' ? 'focused' : 'unfocused'}
                    className="relative"
                  >
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phNo"
                      placeholder="+1 (555) 000-0000"
                      value={enrollmentInput.phNo}
                      onChange={handleEnrollmentInputChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none text-gray-800 placeholder-gray-400 transition-all duration-300"
                    />
                  </motion.div>
                  {errors.phNo && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.phNo.message}
                    </p>
                  )}
                </motion.div>

                {/* Course Selection */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Course of Interest <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'course' ? 'focused' : 'unfocused'}
                    className="relative"
                  >
                    <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="course"
                      value={enrollmentInput.course}
                      onChange={handleEnrollmentInputChange}
                      onFocus={() => setFocusedField('course')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none text-gray-800 appearance-none cursor-pointer transition-all duration-300"
                    >
                      <option value="" className="text-gray-400">
                        Select a course you're interested in
                      </option>
                      {courseDropdownContent.map((course, index) => (
                        <option key={index} value={course} className="text-gray-800">
                          {course}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  {errors.course && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.course.message}
                    </p>
                  )}
                </motion.div>

                {/* Topics Selection */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    What would you like to know more about? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {TopicsContent.map((topic, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setEnrollmentInput((prev) => {
                            const isSelected = prev.topics.includes(topic);
                            const updatedTopics = isSelected
                              ? prev.topics.filter((t) => t !== topic)
                              : [...prev.topics, topic];
                            setValue('topics', updatedTopics);
                            return {
                              ...prev,
                              topics: updatedTopics,
                            };
                          });
                        }}
                        className={`px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm border-2 ${enrollmentInput.topics.includes(topic)
                          ? "bg-blue-500 border-blue-500 text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                  {errors.topics && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.topics.message}
                    </p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                    className="relative"
                  >
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="help"
                      placeholder="Tell us about your goals, questions, or what you'd like to know more about..."
                      value={enrollmentInput.help}
                      onChange={handleEnrollmentInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      required
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:bg-white focus:outline-none text-gray-800 placeholder-gray-400 resize-none transition-all duration-300"
                    />
                  </motion.div>
                  {errors.help && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.help.message}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-br rounded-lg from-orange-600 via-orange-500 to-blue-500 text-white font-bold py-4 px-8  hover:scale-[1.02] transition-all focus:outline-none focus:ring-4 focus:ring-blue-200 duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Inquiry
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>

              {/* Status Messages */}
              <AnimatePresence>
                {formStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className={`mt-6 p-4 rounded-xl flex items-center ${formStatus === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : formStatus === 'error'
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                      }`}
                  >
                    {formStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">
                      {formStatus === 'success' && "Your inquiry has been submitted successfully! We'll get back to you soon."}
                      {formStatus === 'error' && "There was an error submitting your inquiry. Please try again."}
                      {formStatus === 'validation' && "Please fill in all required fields and select at least one topic."}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Enrollments;