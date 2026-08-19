import { motion } from "framer-motion";
import { RiWhatsappLine } from "react-icons/ri";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo_white.png";
import { course } from "../data/course";
import { adress, phone, email } from "../data/contact";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Academics", path: "/courses" },
    { name: "Events", path: "/events" },
    { name: "Student Work", path: "/blogs" },
    { name: "Placement", path: "/placement" },
  ];

  const courses = course.map((c) => ({
    name: c.title,
    href: `/courses${c.link}`,
  }));

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/people/Skillora-Design-Academy/61572724114316/",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/skillora_design_academy",
    },
    {
      name: "Whatsapp",
      icon: RiWhatsappLine,
      href: "https://wa.me/918600123607?text=Hi%20Skillora%20Team%2C%20I'm%20interested%20in%20learning%20more%20about%20your%20courses%21",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Pattern + Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full opacity-10 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 -ml-24 -mb-24"></div>

      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Info */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <img
                src={logo}
                alt="Skillora Logo"
                className="mx-auto lg:mx-0 mb-4 h-10 md:h-14 lg:h-20 object-contain"
              />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering the next generation of creative professionals through
                innovative education and industry-relevant skills training.
              </p>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-center lg:justify-start">
                  <MapPin className="w-4 h-4 mr-3 text-orange-500" />
                  {adress}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <Phone className="w-4 h-4 mr-3 text-orange-500" />
                  {phone}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <Mail className="w-4 h-4 mr-3 text-orange-500" />
                  {email}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 flex flex-col items-center justify-center lg:items-start">
                {quickLinks.map((link, i) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-gray-300 hover:text-orange-500 text-sm flex items-center justify-center lg:justify-start group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Courses */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
              <ul className="space-y-3">
                {courses.map((course, i) => (
                  <li key={course.name}>
                    <a
                      href={course.href}
                      className="text-gray-300 hover:text-orange-500 text-sm flex items-center justify-center lg:justify-start group"
                    >
                      {course.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-3">
                {socialLinks.map((social, i) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-300 hover:text-orange-500 text-sm flex items-center justify-center lg:justify-start group"
                    >
                      <social.icon className="w-5 h-5 mr-2" />
                      {social.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-3 md:space-y-0 text-sm text-gray-400">
              <p>
                © {currentYear} Skillora. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-orange-500">
                  Privacy Policy
                </button>
                <button onClick={() => navigate('/terms')} className="hover:text-orange-500">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
