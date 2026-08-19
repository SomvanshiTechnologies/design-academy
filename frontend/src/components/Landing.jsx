import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import SplitText from "../components/reactBits/SplitText";
import { IoMdArrowForward } from "react-icons/io";
import {
  Sparkles,
  Handshake,
  Star,
  Zap,
  Award,
  Users,
  BookOpen,
  Play,
  Rocket,
} from "lucide-react";
import Aurora from "./reactBits/Aurora";
import heroImg from "../assets/heroimage.jpg";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Books from "../assets/animations/Animation - 1750682641239.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navigate = useNavigate();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".bg-element", { scale: 0, rotation: 0 });
      gsap.to(".bg-element", {
        scale: 1,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2,
      });

      gsap.set(".particle", { y: 100, opacity: 0 });
      gsap.to(".particle", {
        y: -100,
        opacity: 1,
        duration: 4,
        repeat: -1,
        ease: "power2.out",
        stagger: {
          each: 0.5,
          repeat: -1,
        },
      });

      const magneticElements = document.querySelectorAll(".magnetic");
      magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: "1000+", label: "Students", color: "text-blue-300" },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      color: "text-green-500",
    },
    {
      icon: BookOpen,
      value: "40+",
      label: "Courses",
      color: "text-purple-500",
    },
    { icon: Handshake, value: "130 +", label: "Industry Partners", color: "text-yellow-500" },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="relative bg-dark-950 min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-hidden flex justify-center items-center"
    >
      <div className="absolute inset-0 w-full">
        <Aurora
          colorStops={["#FF7E38", "#FF7E38", "#FF7E38"]}
          blend={0.8}
          amplitude={0.2}
          speed={1.2}
        />
      </div>

      <div className="max-w-7xl my-24 mx-auto relative z-20">
        <div className="text-center mb-16 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-10 mb-4">
            <div className="flex-1 w-full text-center md:text-left">
              <motion.div
                className="inline-flex items-center justify-center md:justify-start mb-6 px-6 py-2 border-2 text-white border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-sm font-medium shadow-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
              <Zap className="w-5 h-5 mr-2 " />
                 ISO Certified
              </motion.div>

              <div className="relative">
                <h1 className="relative z-10">
                  <SplitText
                    text="Turn your passion "
                    className="text-2xl md:text-4xl text-start font-inter font-bold text-dark-100 mb-2"
                    delay={100}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, rotateX: -90 }}
                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                  <br />
                  <SplitText
                    text="into profession"
                    className="text-2xl md:text-4xl text-start font-inter font-bold text-dark-100 mb-2"
                    delay={100}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, rotateX: -90 }}
                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                  <br />
                  <SplitText
                    text="explore creative courses "
                    className="text-2xl md:text-4xl text-start font-inter font-bold text-dark-100 mb-2"
                    delay={80}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, scale: 0.5 }}
                    to={{ opacity: 1, y: 0, scale: 1 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                  <br />
                  <SplitText
                    text="that shape tomorrow."
                    className="text-2xl md:text-4xl text-start font-inter font-bold text-dark-100 mb-2"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, rotateY: 90 }}
                    to={{ opacity: 1, y: 0, rotateY: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                </h1>
              </div>

              <motion.p
                className="text-dark-100 text-base md:text-xl max-w-2xl mt-6 mx-auto md:mx-0 px-4 md:px-0 mb-12 leading-relaxed font-medium"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
                variants={fadeInUp}
              >
                A revolutionary learning platform based on practical knowledge
                with
                <span className="text-blue-500 font-bold">
                  {" "}
                  interactive experiences
                </span>{" "}
                and
                <span className="text-blue-500 font-bold">
                  {" "}
                  industry mentorship
                </span>
                .
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center md:items-start mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                variants={fadeInUp}
              >
                <motion.button
                  className="btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contact")}
                >
                  <div className="relative flex items-center gap-3 z-10">
                    <Rocket className="w-5 h-5" />
                    Enroll Now
                    <IoMdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>

                <motion.button
                  className="btn-secondary group hover:bg-blue-50 hover:text-blue-700 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/courses")}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    Explore Courses
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center  items-center mb-8 md:mb-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ rotate: 2, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-[300px] md:w-[360px] rounded-[120px] overflow-hidden">
                <img
                  src={heroImg}
                  alt="Hero"
                  className=" object-cover aspect-square w-full "
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5,
                },
              },
            }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="group glass relative transition-all duration-300 rounded-2xl p-6 shadow-md border border-blue-200/50 shadow-lg hover:bg-dark-100 magnetic"
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.8 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    border: "1px solid rgba(25, 84, 212, 0.2)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <motion.div transition={{ duration: 0.6 }}>
                      <IconComponent
                        className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </motion.div>
                    <motion.div
                      className="text-2xl font-bold text-gray-50 group-hover:text-dark-950 mb-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm group-hover:text-dark-900 text-dark-100 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;
  