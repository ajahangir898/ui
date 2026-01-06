
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FlashSaleProps {
  products: Product[];
  initialTime: { h: number; m: number; s: number };
  onProductClick: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const FlashSale: React.FC<FlashSaleProps> = ({ products, initialTime, onProductClick, onAddToCart }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="container mx-auto mt-4 px-4">
      <div className="flex flex-row justify-between items-center mb-4 md:mb-6 gap-4">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="border-b-4 border-pink-500 pb-1">
            <h2 className="text-lg md:text-2xl font-black text-gray-800">Flash Sale</h2>
          </div>
          <div className="flex gap-2 items-center">
            {[{v:timeLeft.h, l:'H'}, {v:timeLeft.m, l:'M'}, {v:timeLeft.s, l:'S'}].map((t, i) => (
              <React.Fragment key={t.l}>
                <div className="flex flex-col items-center">
                  <span className="bg-white border-2 border-blue-400 text-blue-600 px-2 py-1 text-sm md:text-lg font-black leading-none shadow-sm rounded-none">{formatNum(t.v)}</span>
                </div>
                {i < 2 && <span className="text-blue-500 font-black text-base md:text-xl">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-blue-600 font-bold hover:text-pink-600 transition-all text-sm md:text-base">
          View All <ChevronRight className="w-4.5 h-4.5 md:w-5 md:h-5 bg-blue-600 text-white p-0.5 rounded-none" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
        {products.map(product => (
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

export default FlashSale;
