import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses = "font-bold rounded-xl transition-all duration-300";

  const variants = {
    primary: "bg-white text-orange-500 shadow-md",
    secondary: "bg-orange-500 text-white shadow-md",
    ghost:
      "bg-white hover:bg-orange-50 text-orange-500 border border-orange-200",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm sm:px-4",
    md: "px-4 py-3 text-sm sm:px-8 sm:py-4 sm:text-base",
    lg: "px-6 py-4 text-base sm:px-12 sm:py-6 sm:text-lg",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
