import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta.jsx";
import { courseMetaMapping } from "../../data/metaData";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  CheckCircle,
  ArrowLeft,
  Play,
  Download,
  Globe,
  DownloadIcon
} from 'lucide-react';
import { courseDetails } from "../../data/courseDatails.js";
import { getFaqForCourse } from "../../data/faq.js";

const CourseDetail = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(0);
  const [openFaqAccordion, setOpenFaqAccordion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const course = courseDetails[courseName];
  const metaKey = courseMetaMapping[courseName];
  const pageMetaTags = usePageMeta(metaKey);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
    window.scrollTo(0, 0);
  }, [course]);

  // Transform curriculum to match expected format
  const transformedCurriculum = course?.curriculum.map((levelObj) => {
    const newMonths = levelObj.months.map((month) => ({
      title: month.title,
      description: `Month ${month.month}`,
      weeks: month.topics.reduce((acc, topic, i) => {
        const weekNumber = `Week ${Math.floor(i / 2) + 1}`;
        if (!acc[weekNumber]) {
          acc[weekNumber] = {
            title: weekNumber,
            topics: []
          };
        }
        acc[weekNumber].topics.push(topic);
        return acc;
      }, {})
    }));

    return {
      title: levelObj.level,
      description: `${newMonths.length} Months`,
      duration: `${newMonths.length} Months`,
      level: levelObj.level,
      months: newMonths
    };
  }) || [];

  const toggleAccordion = (index) => {
    setOpenAccordion((prev) => (prev === index ? -1 : index));
  };

  const toggleFaqAccordion = (index) => {
    setOpenFaqAccordion((prev) => (prev === index ? null : index));
  };

  // Get related courses (exclude current course)
  const getRelatedCourses = () => {
    const allCourses = Object.entries(courseDetails);
    return allCourses
      .filter(([key]) => key !== courseName)
      .slice(0, 3)
      .map(([key, courseData]) => ({
        id: key,
        title: courseData.title,
        description: courseData.description,
        image: courseData.image,
        students: courseData.students,
        rating: courseData.rating,
        duration: courseData.duration
      }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </motion.div>
      </div>
    );
  }

  if (!course) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center flex items-center justify-center flex-col">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-12 h-12 text-orange-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/courses")}
            className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const relatedCourses = getRelatedCourses();
  const courseFaqData = getFaqForCourse(courseName);

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {pageMetaTags}
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r rounded-lg from-orange-600 via-orange-500 to-blue-500 overflow-hidden"
      >
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-y-8 gap-x-12">

            {/* Left Text Section */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
                  {course.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">
                  {course.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 items-center justify-start"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/enrollment")}
                  className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold sm:font-bold text-base sm:text-lg shadow-md transition-all duration-300 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Enroll Now
                </motion.button>
                <motion.a
                  href={'/curriculumDocs/' + course.document}
                  download
                  className=" text-dark-50 font-semibold sm:font-bold text-base flex items-center"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  <span className="hidden md:block">Download curriculum</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <div className="w-full">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Curriculum */}
          <div className="lg:col-span-2 space-y-12">
            {/* Curriculum Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="w-6 h-6 text-orange-500 mr-3" />
                Course Curriculum
              </h2>

              <div className="space-y-4">
                {transformedCurriculum.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden"
                  >
                    <motion.button
                      className="w-full flex justify-between items-center bg-blue-50 px-8 py-4 text-left transition-colors duration-200"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                          <p className="text-orange-600 text-sm font-medium">{section.description}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openAccordion === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {openAccordion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 py-4 bg-white">
                            {section.months.map((month, mIdx) => (
                              <motion.div
                                key={mIdx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: mIdx * 0.1 }}
                                className="mb-8 last:mb-0"
                              >
                                <div className="flex items-center mb-4">
                                  <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-orange-600 font-bold text-sm">{mIdx + 1}</span>
                                  </div>
                                  <h4 className="text-base font-bold text-gray-900">
                                    {month.description}: {month.title}
                                  </h4>
                                </div>
                                {Object.values(month.weeks).map((week, wIdx) => (
                                  <div key={wIdx} className="ml-8 mb-4">
                                    <h5 className="text-orange-600 font-semibold text-sm mb-2 flex items-center">
                                      <Globe className="w-4 h-4 mr-2" />
                                      {week.title}
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                      {week.topics.map((topic, tIdx) => (
                                        <motion.div
                                          key={tIdx}
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: tIdx * 0.05 }}
                                          className="flex items-center text-xs "
                                        >
                                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                          {topic}
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            {courseFaqData && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <BookOpen className="w-6 h-6 text-orange-500 mr-3" />
                  Frequently Asked Questions - {courseFaqData.courseName}
                </h2>

                <div className="space-y-4">
                  {courseFaqData.faqs.map((faq, faqIndex) => (
                    <motion.div
                      key={faqIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + faqIndex * 0.1 }}
                      className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden"
                    >
                      <motion.button
                        className="w-full flex justify-between items-center bg-blue-50 px-6 py-4 text-left transition-colors duration-200 hover:bg-blue-100"
                        onClick={() => toggleFaqAccordion(faqIndex)}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-xs">?</span>
                          </div>
                          <h4 className="text-base font-semibold text-gray-900">{faq.question}</h4>
                        </div>
                        <motion.div
                          animate={{ rotate: openFaqAccordion === faqIndex ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {openFaqAccordion === faqIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-white">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Courses */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCourses.map((relatedCourse, index) => (
                  <motion.div
                    key={relatedCourse.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/courses/${relatedCourse.id}`)}
                    className="bg-white rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden border border-gray-200 shadow-md md:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={relatedCourse.image}
                        alt={relatedCourse.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold">{relatedCourse.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedCourse.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedCourse.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 text-orange-500 mr-3" />
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Hands-on training with real-world tools",
                  "Guidance from experienced mentors",
                  "Industry-relevant curriculum",
                  "Project-based learning approach",
                  "Career support & placement guidance",
                  "Build a strong, creative portfolio",
                  "Flexible duration to match your pace",
                  "Certificate of completion",
                ].map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center text-sm"
                  >
                    <CheckCircle className="w-5 h-5 mt-1 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
