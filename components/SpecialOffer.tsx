
import React from 'react';
import { SpecialOfferConfig } from '../types';

interface SpecialOfferProps {
  config: SpecialOfferConfig;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ config }) => {
  return (
    <section className="container mx-auto px-4 mt-4 md:mt-8">
      <div className={`${config.bgColor} p-6 md:p-14 relative overflow-hidden group shadow-xl shadow-blue-100 rounded-none`}>
        <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-white/10 -translate-y-1/2 translate-x-1/2 blur-[80px] md:blur-[120px] rounded-none" />
        <div className="relative z-10 text-white max-w-2xl text-center md:text-left">
          <span className="bg-pink-500 px-3 py-1.5 text-xs md:text-sm font-black tracking-widest uppercase mb-4 inline-block shadow-lg rounded-none">{config.badge}</span>
          <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">{config.title}</h2>
          <p className="text-blue-50 text-sm md:text-xl mb-6 md:mb-10 font-semibold line-clamp-3 md:line-clamp-none opacity-90">{config.subtitle}</p>
          <button className="bg-white text-blue-600 font-black px-8 md:px-12 py-3.5 md:py-5 hover:bg-pink-500 hover:text-white transition-all shadow-2xl shadow-blue-900/20 active:scale-95 text-sm md:text-lg uppercase tracking-wider rounded-none">
            {config.buttonText}
          </button>
        </div>
        <img 
          src={config.image} 
          alt="Promo" 
          className="hidden lg:block absolute right-0 top-0 h-full w-1/3 object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 rounded-none"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default SpecialOffer;
