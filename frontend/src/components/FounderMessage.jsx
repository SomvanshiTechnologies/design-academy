import React from "react";
import { motion } from "framer-motion";
import founder from '../assets/founder/founder.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
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

export default function FounderMessageBlock() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* === Left Image with Decorative Frame === */}
          <motion.div
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="relative group max-w-sm mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-60"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-200 to-orange-100 rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500 opacity-80"></div>

              <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-shadow-lg transition-all duration-500">
                <div className="relative overflow-hidden w-full rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent rounded-2xl"></div>
                  <img
                    src={founder}
                    alt="Pooja M - Founder & Director"
                    className="w-full h-80 sm:h-[400px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1 w-1 h-1 bg-orange-500 rounded-full animate-pulse delay-700"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-b-3xl"></div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-orange-500 text-white p-2.5 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* === Right Content === */}
          <div className="flex order-1 lg:order-2 flex-col items-center lg:items-start justify-center w-full">
            <motion.div
              className="space-y-6 order-1 lg:order-2 w-full max-w-3xl px-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="inline-block mx-auto lg:mx-0">
                <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
                  Since 2019
                </p>
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Meet Our Visionary Leader{" "}
                  <span className="text-orange-500 block sm:inline"> - Founder & Director</span>
                </h2>

                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  Pooja M.
                </h3>
              </div>

              <div className="prose prose-lg max-w-none text-center lg:text-left">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Pooja M, the driving force behind Skillora Design Academy, is a
                  seasoned design educator with over 10 years of experience. She has
                  mentored 3500+ aspiring designers, combining human-centered
                  mentorship with a forward-thinking approach.
                </p>

                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  For Pooja, design is a tool for innovation and transformation. Her vision has made
                  Skillora a launchpad for future-ready creatives, ensuring students
                  are not only skilled but strategically prepared. She's driven by a
                  belief that every student has a unique spark — and her mission is
                  to help them ignite it and turn it into a meaningful career.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
                <div className="border-l-4 border-orange-500 pl-4 mb-4">
                  <p className="text-gray-800 font-semibold text-lg">
                    Director, Skillora Design Academy
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center bg-white rounded-xl p-3 shadow-md">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">10+</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center bg-white rounded-xl p-3 shadow-md">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">3500+</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Students Mentored</div>
                  </div>
                  <div className="text-center bg-white rounded-xl p-3 shadow-md">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">2019</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Since Founded</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
