import { useState, useEffect, useRef } from "react";

import slide1 from "../../assets/6359.jpg";
import slide2 from "../../assets/6358.jpg";
import slide3 from "../../assets/6357.jpg";
import { Header } from "./Header";

export function Section() {
  const slides = [
    { id: 1, src: slide1, alt: "Slide 1" },
    { id: 2, src: slide2, alt: "Slide 2" },
    { id: 3, src: slide3, alt: "Slide 3" },
  ];

  const [current, setCurrent] = useState(0);
  const slideRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  // Touch swipe handlers to add mobile swipe support
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const deltaX = endX.current - startX.current;
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    }
    startX.current = 0;
    endX.current = 0;
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Slides */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div
        ref={slideRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-screen"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/30 text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition touch-manipulation"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/30 text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition touch-manipulation"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === current ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
