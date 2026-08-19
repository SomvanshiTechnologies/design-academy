import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { User, Settings, Lightbulb, Award, Target, ArrowRight, Play, CheckCircle, Rocket } from "lucide-react";
import InfiniteScroll from "./reactBits/InfiniteScroll";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate in cards
        gsap.fromTo(".stat-item",
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1,
            delay: 0.8
          }
        );

        // Animate counters (manually formatted)
        achievements.forEach((achievement, i) => {
          const el = counterRefs.current[i];
          if (!el) return;

          const raw = achievement.number;
          const numericPart = parseFloat(raw.replace(/[^\d.]/g, ""));
          const isK = raw.includes("K");
          const isPlus = raw.includes("+");
          const isPercent = raw.includes("%");
          const isRating = raw.includes("/");

          const finalValue = isK ? numericPart * 1000 : numericPart;

          gsap.to({ val: 0 }, {
            val: finalValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const value = Math.floor(this.targets()[0].val);
              let formatted = value.toLocaleString();

              if (isK) formatted = `${Math.round(value / 1000)}K`;
              if (isPlus) formatted += "+";
              if (isPercent) formatted += "%";
              if (isRating) formatted = raw; // use original for ratings like 4.9/5

              el.textContent = formatted;
            },
            delay: 1 + i * 0.1
          });
        });

      }, containerRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  const navigate = useNavigate();


  const features = [
    {
      icon: <User className="w-7 h-7 text-blue-600" />,
      bg: "from-blue-100 to-blue-200",
      title: "Personalized Learning",
      desc: "Hands-on education tailored to each student's creative journey with AI-powered recommendations.",
      stats: "1:8 Ratio",
      highlight: "Individual Attention"
    },
    {
      icon: <Settings className="w-7 h-7 text-indigo-600" />,
      bg: "from-indigo-100 to-indigo-200",
      title: "Industry-Focused Training",
      desc: "Led by professionals with real-world experience and live industry projects.",
      stats: "95% Placement",
      highlight: "Industry Ready"
    },
    {
      icon: <Lightbulb className="w-7 h-7 text-purple-600" />,
      bg: "from-purple-100 to-purple-200",
      title: "Future-Ready Skills",
      desc: "Innovative curriculum designed for evolving design careers and emerging technologies.",
      stats: "200+ Skills",
      highlight: "Future Proof"
    },
  ];

  const achievements = [
    { number: "1500+", label: "Students Trained", icon: "👥" },
    { number: "95%", label: "Placement Rate", icon: "🎯" },
    { number: "130+", label: "Industry Partners", icon: "🤝" },
    { number: "4.9/5", label: "Student Rating", icon: "⭐" },
  ];
  const counterRefs = useRef([]);

  const items = achievements.map((achievement, index) => ({
    content: (
      <motion.div
        key={index}
        className="stat-item w-full glass-blue rounded-2xl p-6 text-center shadow-md border border-blue-200/50 shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-3xl mb-2">{achievement.icon}</div>
        <motion.div
          className="text-2xl font-bold text-gray-900 mb-1"
          ref={(el) => (counterRefs.current[index] = el)}
        >
          0
        </motion.div>
        <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
      </motion.div>
    ),
  }));


  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="my-14 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 relative z-10">

        {/* Header Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md"
            >
              <Award className="w-5 h-5 mr-2" />
              Excellence in Education Since 2019
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold font-inter text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                Skillora
              </span> Institute!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                We nurture tomorrow's design leaders with personalized mentorship,
                real-world projects, and a hands-on, industry-focused learning
                experience.
              </p>
              <div className="flex items-center gap-3 text-blue-600 font-semibold">
                <Target className="w-5 h-5" />
                <span>Empowering creative thinkers for future-driven careers</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-md shadow-lg transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate("/student-work")}

            >
              <Rocket className="w-5 h-5" />
              View Student Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="bg-transparent relative" style={{ height: '400px', position: 'relative' }}>

            <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white z-[5] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-white z-[5] to-transparent"></div>


            <InfiniteScroll
              items={items}
              negativeMargin="-0.2em"
              isTilted={true}
              tiltDirection='right'
              autoplay={true}
              autoplaySpeed={2}
              autoplayDirection="down"
              pauseOnHover={true}
            />
          </div>
        </motion.div>

        {/* Features + Video Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center pt-24">

          {/* Features List */}
          <div className="space-y-8">
            <motion.h2
              className="text-3xl font-bold text-center md:text-left text-gray-900 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Why Choose <span className="text-blue-600">Skillora?</span>
            </motion.h2>

            {features.map((item, i) => (
              <motion.div
                key={i}
                className="group relative transition-all duration-300"
              >
                <div className="flex flex-col gap-y-6 items-center md:flex-row md:items-start space-x-6 p-6 rounded-2xl shadow-md border border-blue-200/50 transition-all duration-300 group-hover:bg-blue-600 group-shadow-lg">

                  {/* Icon Container */}
                  <motion.div
                    className={`w-20 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.bg} shadow-md group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 transition-colors duration-300">
                    <div className="flex flex-col gap-y-2 md:flex-row items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="bg-accent-400 text-blue-600 px-3 py-1 rounded-full text-xs font-bold group-hover:bg-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.stats}
                      </span>
                    </div>
                    <p className="text-gray-600 text-center md:text-start group-hover:text-blue-50 leading-relaxed mb-3 transition-colors duration-300">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-white transition-colors duration-300">
                      <CheckCircle className="w-4 h-4" />
                      {item.highlight}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">

              {/* Video Container */}
              <div className="relative">
                <video
                  ref={videoRef}
                  src="https://videos.pexels.com/video-files/5200349/5200349-uhd_3840_2160_25fps.mp4"
                  // autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[400px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>

                {/* Interactive Play Button */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer text-blue-600  hover:text-blue-600 hover:bg-accent-400 transition-all duration-300"
                  >
                    <Play className="w-8 h-8  ml-1" fill="currentColor" />
                  </button>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-4 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="bg-white rounded-2xl px-4 py-2 shadow-md">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">Certified</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-md border border-accent-400"
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-xs text-gray-600">Hours of Content</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVideoModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
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
              className="absolute aspect-square top-4 right-4 text-white z-10 bg-blue-600 hover:bg-blue-500 transition-all duration-100 p-2 rounded-full shadow-md"
              onClick={() => setShowVideoModal(false)}
            >
              <CgClose className="w-6 h-6" />
            </button>
            <video
              src="https://videos.pexels.com/video-files/5200349/5200349-uhd_3840_2160_25fps.mp4"
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default AboutUs;