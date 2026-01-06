
import React from 'react';
import { SpecialOfferConfig } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SpecialOfferProps {
  config: SpecialOfferConfig;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ config }) => {
  return (
    <section className="container mx-auto px-4 mt-12 md:mt-16">
      <div className={`bg-[#00AEEF] p-8 md:p-20 relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,174,239,0.3)] rounded-[3rem] border-8 border-white`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-white/10 -translate-y-1/2 translate-x-1/2 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-pink-500/10 translate-y-1/2 -translate-x-1/2 blur-[40px] md:blur-[80px] rounded-full" />

        <div className="relative z-10 text-white max-w-2xl">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 text-xs md:text-sm font-black tracking-widest uppercase mb-8 inline-block rounded-full border border-white/30">
            <Sparkles className="w-4 h-4" /> {config.badge}
          </div>
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight drop-shadow-lg">{config.title}</h2>
          <p className="text-blue-50 text-base md:text-2xl mb-8 md:mb-12 font-medium leading-relaxed opacity-95">{config.subtitle}</p>
          <button className="group flex items-center gap-4 bg-white text-[#00AEEF] font-black px-10 md:px-14 py-4 md:py-6 hover:bg-[#E91E63] hover:text-white transition-all shadow-2xl shadow-blue-900/40 active:scale-95 text-sm md:text-lg uppercase tracking-widest rounded-full">
            {config.buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        
        {/* Image - hidden on mobile for cleaner look */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-2/5 p-8 pointer-events-none">
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
            <img 
              src={config.image} 
              alt="Promo" 
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
