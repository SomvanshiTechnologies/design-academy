import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import {
  Calendar, MapPin, Users, Clock, ArrowRight,
  Star, Ticket, Rocket, TrendingUp
} from 'lucide-react';

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        const data = await res.json();
        setEvents(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (isInView && events.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".event-card",
          { opacity: 0, y: 100, scale: 0.8, rotateY: -15 },
          {
            opacity: 1, y: 0, scale: 1, rotateY: 0,
            duration: 0.8, ease: "back.out(1.7)",
            stagger: 0.2, delay: 0.3
          });

        gsap.to(".event-float", {
          y: -12, duration: 4, repeat: -1, yoyo: true,
          ease: "power2.inOut", stagger: 0.3
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isInView, events]);

  const eventStats = [
    { icon: Users, value: "500+", label: "Attendees" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Ticket, value: "Free", label: "Entry" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-16 mt-10 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background floating effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="event-float absolute top-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
        <div className="event-float absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming Events
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold font-inter text-gray-900 mb-6">
            Join Our <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Events</span>
          </h2>

          <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Connect with industry professionals, learn from experts, and expand your network through our carefully curated events and workshops.
          </p>

          {/* <div className="flex justify-center gap-8 mb-8">
            {eventStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-lg">{stat.value}</span>
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div> */}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div key={event._id} className="event-card group relative">
              <div className="glass-blue rounded-3xl overflow-hidden shadow-md border border-blue-200/50 group-shadow-lg transition-all duration-500 relative">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <div className="text-white text-6xl font-bold opacity-20">
                        {event.title.charAt(0)}
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      Live Event
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-white text-gray-800 px-3 py-2 rounded-xl text-center shadow-md">
                      <div className="text-xs font-medium text-blue-600">
                        {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "short", day: "numeric",
                          month: "short", year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {event.description?.substring(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">+50 attending</span>
                    </div>

                    <motion.a
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-md transition-all duration-300 flex items-center gap-2 group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="tel:+911234567890"
                    >
                      <Rocket className="w-4 h-4" />
                      Join Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
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
          viewport={{ once: true }}
        >
          <Link to="/events">
            <motion.button
              className="group bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-6 h-6" />
              View All Events
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventSection;
