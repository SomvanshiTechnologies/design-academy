import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.6, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.7, y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute aspect-square top-4 right-4 text-white z-10 bg-blue-600 hover:bg-blue-500 transition-all duration-100 p-2 rounded-full shadow-md"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Responsive Video Wrapper */}
        <div className="relative pt-[56.25%] w-full">
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoModal;
