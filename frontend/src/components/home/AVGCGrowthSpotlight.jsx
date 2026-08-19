import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import VideoModal from '../ui/VideoModal';
import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AVGCGrowthSpotlight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/0GZBwtArqJ0?si=gqqxO8FKTSn47DLc&autoplay=1";
  const videoTitle = "PM Narendra Modi's Vision for AVGC Sector";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariant}
      >
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Video Thumbnail */}
          <motion.div
            className="relative group cursor-pointer"
            onClick={openModal}
            variants={fadeUpVariant}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-md border border-gray-200 bg-gray-100">
              <img
                src="https://img.youtube.com/vi/0GZBwtArqJ0/maxresdefault.jpg"
                alt={videoTitle}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                <div className="bg-white/90 p-4 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                  <PlayCircle className="w-16 h-16 text-orange-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div className="space-y-6" variants={containerVariant}>
            <motion.div
              variants={fadeUpVariant}
              className="inline-block px-4 py-1.5 rounded-full border-2 border-gray-200 text-sm font-medium text-gray-700 mb-2"
            >
              Government of India
            </motion.div>

            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl font-bold text-gray-900 font-sans"
            >
              AVGC Industry's Growth
            </motion.h2>

            <motion.h3
              variants={fadeUpVariant}
              className="text-2xl font-semibold text-gray-800 font-sans"
            >
              PM Narendra Modi's Vision for Growth
            </motion.h3>

            <motion.p
              variants={fadeUpVariant}
              className="text-gray-600 leading-relaxed"
            >
              The Government of India is committed to the rapid growth of the Animation, Visual Effects, Gaming, and Comics (AVGC) sector, investing time and talent to unlock its full potential. Watch Hon'ble Prime Minister Shri Narendra Modi share his vision and mission for strengthening the Indian AVGC industry, creating employment opportunities, and boosting the nation's economy. Stay informed about the future of India's digital entertainment revolution!
            </motion.p>

            <motion.div variants={fadeUpVariant} className="pt-2">
              <a
                href="https://www.youtube.com/watch?v=0GZBwtArqJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Watch on YouTube
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className=' relative z-[50]'>
          <VideoModal
            isOpen={isModalOpen}
            onClose={closeModal}
            videoUrl={videoUrl}
            title={videoTitle}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AVGCGrowthSpotlight;
