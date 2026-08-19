import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowForward } from 'react-icons/io';
import { CalendarDays, MapPin } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const EventSkeleton = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-100/50 to-orange-200/50 rounded-3xl overflow-hidden shadow-md border border-orange-300/40 animate-pulse">
      <div className="w-full h-56 bg-orange-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-orange-300 rounded w-3/4"></div>
        <div className="h-4 bg-orange-200 rounded w-full"></div>
        <div className="h-4 bg-orange-200 rounded w-5/6"></div>
        <div className="space-y-2 pt-4">
          <div className="h-4 bg-orange-300 w-1/2 rounded"></div>
          <div className="h-4 bg-orange-300 w-2/3 rounded"></div>
        </div>
      </div>
    </div>
  );
};


const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageMetaTags = usePageMeta('allEvents');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        const data = await response.json();
        setEvents(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      {pageMetaTags}
      <div className="max-w-7xl mx-auto px-4 py-20 mt-4">
        <motion.h1
          className="text-4xl font-bold text-center text-dark-900 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Upcoming <span className="text-orange-500">Events</span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <motion.div key={i} variants={fadeInUp} custom={i}>
                  <EventSkeleton />
                </motion.div>
              ))
            : events.map((event, index) => (
                <motion.div
                  key={event._id}
                  className="relative w-fit bg-gradient-to-br from-orange-100/50 to-orange-200/50 rounded-3xl overflow-hidden shadow-md border border-orange-300/40 hover:scale-[1.03] transition-all duration-300 backdrop-blur-lg group"
                  variants={fadeInUp}
                  custom={index}
                >
                  <div className="relative">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    <a
                      href="tel:+911234567890"
                      className="absolute bottom-4 right-4 bg-orange-500 text-dark-100 text-xs sm:text-sm px-4 py-2 rounded-full opacity-90 group-hover:opacity-100 shadow-md hover:bg-orange-600 transition-all duration-300"
                    >
                      Register Now <IoMdArrowForward className="inline ml-1" />
                    </a>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-dark-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4">
                      {event.description?.substring(0, 120)}...
                    </p>

                    <div className="text-sm space-y-1 font-medium text-gray-500">
                      <p className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-orange-400" />
                        {new Date(event.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </>
  );
};


export default AllEvents;
