import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, Home, ChevronDown, ChevronRight } from "lucide-react";
import { course as courses } from "../data/course";
import { useRef } from "react";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setMobileDropdownOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Academics", path: "/course", hasDropdown: true },
    { name: "Blogs", path: "/blogs" },
    { name: "Student Work", path: "/student-work" },
    { name: "Connect Us", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-dark-50 shadow-md" : "bg-dark-50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Home */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Skillora Logo"
                  className="h-8 md:h-10 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4 relative">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      clearTimeout(dropdownTimeout.current);
                      setShowDropdown(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) {
                      dropdownTimeout.current = setTimeout(() => {
                        setShowDropdown(false);
                      }, 200); // 200ms delay
                    }
                  }}
                >
                  {item?.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-md `}
                    >
                      {item.name}
                      <span>
                        <ChevronDown
                          className={`w-4 h-4 transition-all duration-200 ${
                            showDropdown ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-md 
                      ${
                        isActive(item.path)
                          ? "text-blue-600"
                          : "text-dark-900 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && showDropdown && (
                    <div
                      className="absolute top-10 left-0 w-60 bg-white border border-gray-200 rounded shadow-md z-50"
                      onMouseEnter={() => {
                        clearTimeout(dropdownTimeout.current);
                        setShowDropdown(true);
                      }}
                      onMouseLeave={() => {
                        dropdownTimeout.current = setTimeout(() => {
                          setShowDropdown(false);
                        }, 200);
                      }}
                    >
                      {courses.map((course, idx) => (
                        <Link
                          key={idx}
                          to={"/courses" + course.link}
                          className="block px-4 py-2 text-dark-900 hover:bg-blue-50 hover:text-blue-600 text-sm transition-colors duration-200"
                        >
                          {course.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  // whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-2 relative overflow-hidden rounded-full px-6 py-2 font-semibold transition-all duration-300 
        ${
          scrolled
            ? "bg-gradient-to-br from-orange-600 via-orange-500 to-blue-500 text-white shadow-md"
            : "bg-gradient-to-br from-orange-600 via-orange-500 to-blue-500 text-white  border border-blue-100 shadow-md"
        }`}
                  onClick={() => navigate("/contact")}
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />

                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl text-dark-900 hover:text-blue-600 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white text-dark-900 border-t border-gray-200 shadow-md overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 py-3 space-y-1">
                {navItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                          className={`w-full flex justify-between items-center px-4 py-4 rounded-lg font-medium transition-all duration-300 ${
                            isActive(item.path)
                              ? "text-blue-600 bg-blue-50"
                              : "text-dark-900 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                          aria-expanded={mobileDropdownOpen}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              mobileDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 space-y-1"
                            >
                              {courses.map((course, idx) => (
                                <Link
                                  key={idx}
                                  to={"/courses" + course.link}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileDropdownOpen(false);
                                  }}
                                  className="block px-4 py-3 text-sm text-dark-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" />
                                    {course.title}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-4 rounded-lg font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? "text-blue-600 bg-blue-50"
                            : "text-dark-900 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="px-2 pt-2 pb-4">
                  <button
                    onClick={() => {
                      navigate("/contact");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition active:scale-95"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
