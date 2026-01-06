
import React from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface DealOfTheDayProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ products, onProductClick, onAddToCart }) => {
  return (
    <section className="container mx-auto mt-4 px-4">
      <div className="flex justify-between items-end mb-3 md:mb-5">
        <div className="border-b-2 border-pink-500 pb-0.5">
          <h2 className="text-base md:text-xl font-bold text-gray-800">Deal of The Day</h2>
        </div>
        <button className="flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all text-sm">
          View All <ChevronRight className="w-4 h-4 bg-blue-600 text-white rounded-md p-0.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">
        {[...products].reverse().map(product => (
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
