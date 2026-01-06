
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoriesProps {
  categories: Category[];
  onViewAll?: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, onViewAll }) => {
  return (
    <section className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <h2 className="text-2xl font-black text-gray-900 leading-none">Explore Categories</h2>
          <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#00AEEF] rounded-full"></div>
        </div>
        <button 
          onClick={onViewAll}
          className="flex items-center gap-2 text-[#00AEEF] font-black hover:text-[#E91E63] transition-all text-sm uppercase tracking-widest"
        >
          View All <ChevronRight className="w-5 h-5 bg-[#00AEEF] text-white p-1 rounded-full group-hover:bg-[#E91E63]" />
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={onViewAll}
            className="flex-shrink-0 min-w-[120px] md:min-w-[160px] bg-white border border-gray-100 p-6 flex flex-col items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#00AEEF]/20 transition-all cursor-pointer group rounded-3xl"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 border border-gray-50 flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition-transform rounded-2xl">
              {cat.icon}
            </div>
            <span className="text-sm md:text-base font-bold text-gray-800 whitespace-nowrap group-hover:text-[#00AEEF] transition-colors">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
