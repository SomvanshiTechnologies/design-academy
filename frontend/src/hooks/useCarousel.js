import { useState, useEffect } from "react";

export const useCarousel = (totalItems, autoPlayInterval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  const next = () => {
    setIsManualNavigation(true);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    
    setTimeout(() => setIsManualNavigation(false), 600);
  };

  const previous = () => {
    setIsManualNavigation(true);
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
   
    setTimeout(() => setIsManualNavigation(false), 600);
  };

  const goTo = (index) => {
    setIsManualNavigation(true);
    setCurrentIndex(index);
   
    setTimeout(() => setIsManualNavigation(false), 600);
  };

  useEffect(() => {
    if (isActive && !isPaused && !isManualNavigation) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isActive, isPaused, autoPlayInterval, totalItems, isManualNavigation]);

  return {
    currentIndex,
    isPaused,
    isActive,
    isManualNavigation,
    setIsPaused,
    setIsActive,
    next,
    previous,
    goTo,
  };
};
