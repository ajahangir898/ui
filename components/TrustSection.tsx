
import React from 'react';
import { TrustItem } from '../types';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

interface TrustSectionProps {
  items: TrustItem[];
}

const TrustSection: React.FC<TrustSectionProps> = ({ items }) => {
  const icons = [
    <ShieldCheck className="w-8 h-8 text-[#E91E63]" />,
    <CreditCard className="w-8 h-8 text-[#00AEEF]" />,
    <Truck className="w-8 h-8 text-green-500" />,
    <RotateCcw className="w-8 h-8 text-orange-500" />
  ];

  return (
    <section className="container mx-auto px-4 mt-16 md:mt-24 mb-16 md:mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-8 border border-gray-50 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 group rounded-[2.5rem]">
            <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform rounded-2xl">
              {icons[i] || <ShieldCheck className="w-8 h-8" />}
            </div>
            <h4 className={`text-lg md:text-xl font-black mb-2 text-gray-900 uppercase tracking-tight`}>{item.title}</h4>
            <p className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-[0.15em] opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
