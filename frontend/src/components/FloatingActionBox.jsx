import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Instagram , MessageCircle  } from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";

import { motion } from "framer-motion";

const FloatingActionBox = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    // If we're already on the home page, scroll directly
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCoursesClick = (e) => {
    e.preventDefault();
    scrollToSection("education-directions");
  };

  const actionButtons = [
    {
      id: "contact",
      label: "Whatsapp",
      icon: RiWhatsappLine,
      link: "https://wa.me/918600123607?text=Hi%20Skillora%20Team%2C%20I'm%20interested%20in%20learning%20more%20about%20your%20courses%21",
      isExternal: true,
    },
    {
      id: "inquiry",
      label: "Instagram",
      icon: Instagram  ,
      link: "https://www.instagram.com/skillora_design_academy",
      isExternal: true,
    },
    {
      id: "courses",
      label: "Email",
      icon: Mail,
      link: "mailto:admissions@skilloraacademy.com",
      isExternal: true,
      onClick: handleCoursesClick,
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-3">
        {actionButtons.map((button, index) => {
          const IconComponent = button.icon;

          // Render different components based on whether it's external link or scroll action
          const ButtonContent = (
            <motion.div
              className="w-10 h-10 md:w-14 md:h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-l-2xl shadow-md flex items-center justify-center transition-all duration-300 border-2 border-orange-400 hover:border-orange-500 "
              // whileHover={{ scale: 1.1, x: -4 }}
              // whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="w-6 h-6" />
            </motion.div>
          );

          const TooltipContent = (
            <div
              className={`absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-md transition-all duration-200 ${
                hoveredButton === button.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              {button.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-orange-500 border-y-4 border-y-transparent"></div>
            </div>
          );

          return (
            <motion.div
              key={button.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
            >
              {button.isExternal ? (
                <a
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative block"
                >
                  {ButtonContent}
                  {TooltipContent}
                </a>
              ) : (
                <button
                  onClick={button.onClick}
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative block"
                >
                  {ButtonContent}
                  {TooltipContent}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingActionBox;
