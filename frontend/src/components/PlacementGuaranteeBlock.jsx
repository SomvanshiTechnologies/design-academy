import React from "react";
import { motion } from "framer-motion";

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

export default function PlacementGuaranteeBlock() {
  return (
    <section className="relative bg-orange-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 leading-tight mb-6">
            SKILLORA DESIGN ACADEMY PROVIDES A <span className="text-gray-800 sm:inline">100% PLACEMENT GUARANTEE!</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We go beyond education. From resume building to mock interviews and final offers Skillora ensures your career kickstarts with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
