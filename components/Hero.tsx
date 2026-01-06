
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../types';

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <section className="container mx-auto mt-2 px-4 overflow-hidden">
      <div className="relative overflow-hidden h-[180px] md:h-[380px] group shadow-xl shadow-blue-50 rounded-none">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/70 to-transparent flex items-center p-6 md:p-16">
              <div className="max-w-xl text-white">
                <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-5 drop-shadow-xl leading-tight">{slide.title}</h2>
                <p className="text-sm md:text-xl mb-4 md:mb-8 opacity-95 drop-shadow-md line-clamp-2 md:line-clamp-none font-medium">{slide.subtitle}</p>
                <div className="bg-white/25 backdrop-blur-xl inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 border border-white/40 hover:bg-white hover:text-pink-600 transition-all cursor-pointer rounded-none">
                  <span className="text-sm md:text-lg font-black tracking-wide">Call: {slide.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 flex items-center justify-center text-pink-600 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg rounded-none"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 h-7" />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 flex items-center justify-center text-pink-600 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg rounded-none"
            >
              <ChevronRight className="w-6 h-6 md:w-7 h-7" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
