
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className="container mx-auto mt-4 px-4">
      <div className="flex justify-between items-end mb-4">
        <div className="border-b-4 border-blue-500 pb-1">
          <h2 className="text-lg md:text-2xl font-black text-gray-800">Categories</h2>
        </div>
        <button className="flex items-center gap-1.5 text-blue-600 font-bold hover:text-pink-600 transition-all text-sm md:text-base">
          View All <ChevronRight className="w-4.5 h-4.5 md:w-5 md:h-5 bg-blue-600 text-white p-0.5 rounded-none" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className="flex-shrink-0 min-w-[110px] md:min-w-[150px] bg-white border border-gray-100 p-4 flex flex-col md:flex-row items-center gap-3 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group rounded-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-125 transition-transform rounded-none">
              {cat.icon}
            </div>
            <span className="text-sm md:text-base font-bold text-gray-700 whitespace-nowrap group-hover:text-blue-600">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
