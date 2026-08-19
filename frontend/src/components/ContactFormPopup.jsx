import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactUsForm from './ContactUsForm';

// Overlay fade animation
const overlayVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Modal popup scale animation
const popupVariant = {
  hidden: { opacity: 0, scale: 0.85, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const ContactFormPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center px-4"
          variants={overlayVariant}
          onClick={() => setShowPopup(false)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative min-w-4xl"
            variants={popupVariant}
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              className="absolute -top-4 -right-4 z-50 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
              onClick={() => setShowPopup(false)}
              aria-label="Close contact form"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className=' max-h-[90vh] md:max-h-full overflow-y-auto overflow-hidden rounded-2xl'>
              <ContactUsForm closeModal={setShowPopup} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormPopup;
