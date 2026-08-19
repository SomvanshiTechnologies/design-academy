import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Play, Users, Quote, Award, TrendingUp, Star, Rocket, Target, Zap } from "lucide-react";
import SpotlightCard from "./reactBits/SpotLightCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Herobox = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate floating elements
        gsap.to(".float-element", {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.3
        });

        // Animate avatar images
        gsap.fromTo(".avatar-img",
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.5
          }
        );

        // Animate stats numbers
        gsap.fromTo(".stat-number",
          { textContent: 0 },
          {
            textContent: 40,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 1
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  const avatars = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQQTS4NPqnCGbJPd4x7O_YJNOJ5gH6KkejH3nhVfIhxwwJPHEotjPs0VCpGg-UcybvxM&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxapDwCeVLL0T69nhwV_BgqH9lztNDYQGhCbUVKHMgITKzGDlPsa55HS-6dqUdC8Qt5VU&usqp=CAU",
    "https://www.pathways.health/wp-content/uploads/2023/08/circle-profile-picgfdgaf.jpg",
  ];

  return (
    <div ref={containerRef} className="bg-white px-4 -mt-10 lg:px-20 py-16 relative overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch relative z-10">
        <motion.div
          className="md:col-span-2 relative rounded-3xl overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://trainingindustry.com/content/uploads/2021/07/8.10.21_Content_Dev_1182967367.jpg"
              alt="Teaching Session"
              className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl"></div>

            {/* Overlay Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="relative z-10 p-8 text-xl font-bold h-full flex flex-col justify-end text-white">
            <motion.div
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-blue-400">Professional Faculty</span>
              </div>
              <p className="text-lg">We have <span className="stat-number text-blue-400">40</span>+ <br /> Professional Teachers</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Center Cards - Enhanced */}
        <div className="md:col-span-2 flex flex-col gap-8">

          {/* Top Card - Community */}

          <SpotlightCard className="!bg-accent-50 rounded-3xl p-8 shadow-md border border-blue-200/50 flex flex-col justify-center h-full relative overflow-hidden group" spotlightColor="#FFA97A">
            <motion.div
              className=""
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
            >
              {/* Background Pattern */}
              {/* <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-dark-50 rounded-3xl"></div>
              </div> */}

              {/* Floating Icons */}
              <div className="absolute top-4 right-4">
                <motion.div
                  // animate={{ rotate: 360 }}
                  // transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-8 h-8 text-blue-600" />
                </motion.div>
              </div>

              <div className="relative z-10">
                <div className="flex mb-6 -space-x-4">
                  {avatars.map((src, idx) => (
                    <motion.div
                      key={idx}
                      className="avatar-img relative"
                    >
                      <img
                        src={src}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full border-3 border-white shadow-md object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </motion.div>
                  ))}
                  <motion.div
                    className="w-12 h-12 rounded-full border-3 border-white bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md"
                  >
                    +10K
                  </motion.div>
                </div>

                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Join Our Community
                </motion.h3>
                <p className="text-gray-700 text-sm">
                  Connect with <span className="font-bold text-blue-600">40+ Professional Teachers</span> and thousands of students
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                  <span className="text-sm text-gray-600 ml-2 font-medium">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Bottom Card - Quote Enhanced */}
          <SpotlightCard className="bg-gradient-to-br from-blue-600 via-blue-700 to-dark-50 rounded-3xl p-8 shadow-2xl flex flex-col justify-center h-full relative overflow-hidden group" spotlightColor="#ffffff">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white rounded-full"></div>
              </div>

              {/* Quote Icon */}
              <motion.div
                className="absolute top-4 left-4"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Quote className="w-8 h-8 text-white/30" />
              </motion.div>

              <div className="relative z-10">
                <motion.p
                  className="text-xl font-bold text-white leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  "Believe in yourself, <br />
                  keep learning, and <br />
                  <span className="text-blue-200">success will follow.</span>"
                </motion.p>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Pooja M.</p>
                    <p className="text-sm text-blue-200">Founder & Director</p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </SpotlightCard>
        </div>

        {/* Right Image - Enhanced */}
        <motion.div
          className="md:col-span-2 relative rounded-3xl overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={fadeUp}
        >
          <div className="relative h-full">
            <img
              src="https://media.istockphoto.com/id/1438634414/photo/business-women-laptop-and-and-happy-team-in-office-for-web-design-collaboration-and-training.jpg?s=612x612&w=0&k=20&c=8e5Wj1tvb4thQCJixGcDRztDtvmuw8x0sO1Fvx8SKyI="
              alt="Student Learning"
              className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-indigo-500/20 rounded-3xl"></div>

            {/* Interactive Elements */}
            <div className="absolute top-4 left-4 z-20">
              <div className="glass rounded-2xl px-4 py-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-800">Live Session</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-dark-100 rounded-2xl p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Interactive Learning</p>
                    <p className="text-xs text-gray-600">Real-time collaboration</p>
                  </div>
                  <div className="flex -space-x-2">
                    {avatars.slice(0, 3).map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Student"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Herobox;