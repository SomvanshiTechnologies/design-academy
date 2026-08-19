import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useCarousel } from "../../hooks/useCarousel";
import { useTestimonialAnimation } from "../../hooks/useTestimonialAnimation";
import { cardStackVariants } from "../../utils/animationVariants";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialCard from "./TestimonialCard";
import TestimonialNavigation from "./TestimonialNavigation";
import { testimonialData as testimonials } from "../../data/testimonialData";

const Testimonials = () => {
  const { isVisible, elementRef } = useIntersectionObserver();
  const { animationPhase } = useTestimonialAnimation(isVisible);

  const {
    currentIndex,
    isActive,
    isManualNavigation,
    setIsPaused,
    setIsActive,
    next,
    previous,
  } = useCarousel(testimonials.length);

  React.useEffect(() => {
    if (animationPhase === "carousel") {
      setIsActive(true);
    }
  }, [animationPhase, setIsActive]);

  const getCardVariants = (index) => ({
    ...cardStackVariants,
    stacked: (customIndex) =>
      cardStackVariants.stacked(customIndex, testimonials.length),
    carousel: (customIndex) =>
      cardStackVariants.carousel(
        customIndex,
        currentIndex,
        testimonials.length,
        isManualNavigation
      ),
  });

  return (
    <div
      ref={elementRef}
      className=" px-2 sm:px-4 relative overflow-hidden"
    >
      <div className="mx-auto ">
        <TestimonialHeader animationPhase={animationPhase} />

        <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
          {testimonials.map((testimonial, index) => {
            const isCardActive = index === currentIndex;

            return (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isActive={isCardActive}
                animationPhase={animationPhase}
                variants={getCardVariants(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            );
          })}

          <TestimonialNavigation
            isVisible={isActive}
            onPrevious={previous}
            onNext={next}
          />
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
