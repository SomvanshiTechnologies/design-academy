import { useState, useEffect } from "react";

export const useTestimonialAnimation = (isVisible) => {
  const [animationPhase, setAnimationPhase] = useState("initial");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setAnimationPhase("stacked"), 300);
      setTimeout(() => setAnimationPhase("carousel"), 1200);
    }
  }, [isVisible]);

  return { animationPhase };
};
