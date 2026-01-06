
import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface DealOfTheDayProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ products, onProductClick, onAddToCart }) => {
  return (
    <section className="container mx-auto px-4 mt-12 md:mt-20">
      <div className="flex justify-between items-center mb-10">
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-none">Deal of The Day</h2>
          <div className="absolute -bottom-3 left-0 w-16 h-1 bg-[#E91E63] rounded-full"></div>
        </div>
        <button className="flex items-center gap-2 text-[#00AEEF] font-black hover:text-[#E91E63] transition-all text-sm uppercase tracking-widest group">
          View All Deals <ChevronRight className="w-6 h-6 bg-[#00AEEF] group-hover:bg-[#E91E63] text-white rounded-full p-1" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
        {[...products].reverse().slice(0, 5).map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product)} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default DealOfTheDay;
