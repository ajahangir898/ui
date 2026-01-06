
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
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
    <section className="container mx-auto mt-6 px-4">
      <div className="relative overflow-hidden h-[220px] md:h-[450px] group shadow-2xl shadow-blue-50 rounded-[2.5rem] border-4 border-white">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center p-8 md:p-20">
              <div className="max-w-2xl text-white">
                <h2 className="text-3xl md:text-6xl font-black mb-3 md:mb-6 drop-shadow-2xl leading-tight tracking-tight">{slide.title}</h2>
                <p className="text-sm md:text-xl mb-6 md:mb-10 opacity-90 drop-shadow-lg font-medium max-w-lg leading-relaxed">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#E91E63] text-white px-8 py-3.5 md:px-10 md:py-4 font-black text-sm md:text-base uppercase tracking-widest shadow-xl shadow-pink-500/30 hover:bg-pink-700 transition-all active:scale-95 rounded-full">
                    Shop Now
                  </button>
                  <div className="bg-white/10 backdrop-blur-xl inline-flex items-center gap-3 px-6 py-3.5 border border-white/30 hover:bg-white/20 transition-all cursor-pointer rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                    <span className="text-sm md:text-lg font-bold">Call: {slide.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#E91E63] hover:border-transparent shadow-xl rounded-full"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#E91E63] hover:border-transparent shadow-xl rounded-full"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
