export const cardStackVariants = {
  initial: {
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
    scale: 0.8,
  },
  stacked: (index, totalItems) => {
    const getResponsiveStackedPosition = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 768) {
          return {
            x: 0,
            y: 50 + index * 15,
          };
        } else {
          return {
            x: -200,
            y: -100 + index * 8,
          };
        }
      }
      return {
        x: -200,
        y: -100 + index * 8,
      };
    };

    const position = getResponsiveStackedPosition();

    return {
      ...position,
      opacity: 1,
      rotate: -5 + index * 2,
      scale: 0.9 - index * 0.05,
      zIndex: totalItems - index,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      },
    };
  },
  carousel: (index, currentIndex, totalItems, isManual = false) => {
    const offset = index - currentIndex;
    const isActive = index === currentIndex;
    const isPrev = index === (currentIndex - 1 + totalItems) % totalItems;
    const isNext = index === (currentIndex + 1) % totalItems;
    const isPrev2 = index === (currentIndex - 2 + totalItems) % totalItems;
    const isNext2 = index === (currentIndex + 2) % totalItems;

    const getResponsiveX = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          return isActive
            ? 0
            : isPrev
            ? -200
            : isNext
            ? 200
            : isPrev2
            ? -350
            : isNext2
            ? 350
            : offset < 0
            ? -450
            : 450;
        } else if (width < 1024) {
          return isActive
            ? 0
            : isPrev
            ? -250
            : isNext
            ? 250
            : isPrev2
            ? -450
            : isNext2
            ? 450
            : offset < 0
            ? -550
            : 550;
        } else {
          return isActive
            ? 0
            : isPrev
            ? -300
            : isNext
            ? 300
            : isPrev2
            ? -550
            : isNext2
            ? 550
            : offset < 0
            ? -700
            : 700;
        }
      }
      return isActive
        ? 0
        : isPrev
        ? -300
        : isNext
        ? 300
        : isPrev2
        ? -550
        : isNext2
        ? 550
        : offset < 0
        ? -700
        : 700;
    };

    return {
      x: getResponsiveX(),
      y: isActive ? 0 : isPrev || isNext ? 30 : isPrev2 || isNext2 ? 60 : 80,
      opacity: isActive
        ? 1
        : isPrev || isNext
        ? 0.7
        : isPrev2 || isNext2
        ? 0.4
        : 0,
      rotate: isActive
        ? 0
        : isPrev
        ? -2
        : isNext
        ? 2
        : isPrev2
        ? -4
        : isNext2
        ? 4
        : 0,
      scale: isActive
        ? 1
        : isPrev || isNext
        ? 0.85
        : isPrev2 || isNext2
        ? 0.7
        : 0.6,
      zIndex: isActive ? 10 : isPrev || isNext ? 8 : isPrev2 || isNext2 ? 6 : 1,
      transition: {
        duration: isManual ? 0.6 : 0.7, 
        ease: isManual ? "easeOut" : "easeInOut", 
        delay: 0, 
      },
    };
  },
};

export const headerVariants = {
  initial: (isMobile) => ({
    x: isMobile ? 0 : 100,
    y: isMobile ? 1 : 0,
    opacity: 0,
    scale: isMobile ? 0.9 : 1,
  }),
  carousel: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.5 },
  },
};

export const ctaVariants = {
  initial: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 2, duration: 0.8 },
  },
};
