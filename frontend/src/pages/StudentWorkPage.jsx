import { useState, useEffect, use } from 'react';
import { motion, useInView } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from '../hooks/usePageMeta.jsx';



const StudentWorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const pageMetaTags = usePageMeta('studentWork');

      useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const studentProjects = [
    {
      id: 1,
      title: 'Urban Living Redesigned',
      student: 'Rahul Sharma',
      course: 'Interior Design',
      year: 2024,
      image: '/images/interior-design-project.jpg',
      description: 'A modern apartment design focusing on sustainable materials and space optimization.',
      tags: ['Residential', 'Modern', 'Sustainable']
    },
    {
      id: 2,
      title: 'Eco-Friendly Brand Identity',
      student: 'Priya Patel',
      course: 'Graphic Design',
      year: 2023,
      image: '/images/graphic-design-project.webp',
      description: 'Complete brand identity package for an organic skincare startup.',
      tags: ['Branding', 'Packaging', 'Logo']
    },
    {
      id: 3,
      title: 'Fitness App UI/UX',
      student: 'Arjun Mehta',
      course: 'UI/UX Design',
      year: 2024,
      image: '/images/uiux-project.jpeg',
      description: 'Mobile application design for a personalized fitness coaching platform.',
      tags: ['Mobile', 'Wireframes', 'Prototype']
    },
    {
      id: 4,
      title: 'Fantasy Game Characters',
      student: 'Neha Gupta',
      course: 'Game Design & Development',
      year: 2023,
      image: '/images/game-design-project.jpeg',
      description: '3D character designs and animations for an RPG game.',
      tags: ['3D Modeling', 'Texturing', 'Rigging']
    },
    {
      id: 5,
      title: 'Sustainable Fashion Collection',
      student: 'Ananya Joshi',
      course: 'Fashion Design',
      year: 2024,
      image: '/images/fashion-design-project.jpeg',
      description: 'Zero-waste clothing line using upcycled materials.',
      tags: ['Sustainable', 'Womenswear', 'Pattern Making']
    },
    {
      id: 6,
      title: 'Product Animation',
      student: 'Vikram Singh',
      course: 'Animation & VFX',
      year: 2023,
      image: '/images/animation-project.gif',
      description: '3D product animation for a smart home device commercial.',
      tags: ['3D Animation', 'Lighting', 'Rendering']
    },
    {
      id: 7,
      title: 'Music Festival Motion Graphics',
      student: 'Divya Nair',
      course: 'Motion Graphics Pro',
      year: 2024,
      image: '/images/motion-graphics-project.jpg',
      description: 'Title sequences and promotional content for a music festival.',
      tags: ['After Effects', 'Typography', 'Visual Effects']
    },
    {
      id: 8,
      title: 'Short Film VFX',
      student: 'Aditya Rao', 
      course: 'VFX & Video Editing',
      year: 2023,
      image: '/images/vfx-project.jpeg',
      description: 'Visual effects compositing for an independent short film.',
      tags: ['Compositing', 'Color Grading', 'Tracking']
    }
  ];

  const courses = ['All', 'Graphic Design', 'UI/UX Design', 'Fashion Design', 'Interior Design', 'Animation & VFX', 'VFX & Video Editing', 'Game Design & Development', 'Motion Graphics Pro'];

  const filteredProjects = activeFilter === 'All' 
    ? studentProjects
    : studentProjects.filter(project => project.course === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {pageMetaTags}
      {/* Hero Section */}
      <div className="relative pt-32 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-500 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Student Work</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Showcasing exceptional projects from our talented students across all design disciplines
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => setActiveFilter(course)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === course
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              {course}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="relative rounded-3xl overflow-hidden glass-blue shadow-md border border-blue-200/50 group-shadow-lg transition-all duration-500"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 h-full bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-blue-900">{project.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {project.course}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {project.student}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-24 mb-16">
          <div className="relative rounded-3xl overflow-hidden glass-blue shadow-md border border-blue-200/50 p-8 md:p-12 bg-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="relative rounded-2xl overflow-hidden h-64">
                  <img 
                    src="/images/student-testimonial.jpg" 
                    alt="Siddhesh K"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                  "The 3D animation course at Skillora is simply outstanding. The faculty helped me build a strong portfolio, and now I've landed an internship at a leading studio. It's not just learning here — it's a full transformation!"
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="font-bold text-blue-900">Siddhesh K</p>
                    <p className="text-gray-600">Animation & VFX</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Ready to showcase your work here?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join Skillora Design Academy and turn your creative passion into exceptional projects that get noticed.
          </p>
           <motion.button
            className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/courses")}
          >
            <Target className="w-6 h-6" />
            View All Courses
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StudentWorkPage;