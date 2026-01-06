
import React from 'react';
import { TrustItem } from '../types';

interface TrustSectionProps {
  items: TrustItem[];
}

const TrustSection: React.FC<TrustSectionProps> = ({ items }) => {
  return (
    <section className="container mx-auto px-4 mt-10 md:mt-16 mb-10 md:mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-5 md:p-8 border border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1 rounded-none">
            <h4 className={`text-sm md:text-xl font-black mb-1.5 ${item.color} uppercase tracking-tight`}>{item.title}</h4>
            <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-widest opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
