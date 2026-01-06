
import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
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
    <section className="container mx-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div className="relative">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Zap className="w-7 h-7 text-[#00AEEF] fill-[#00AEEF]" /> Flash Sale
            </h2>
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#E91E63] rounded-full"></div>
          </div>
          
          <div className="flex gap-3 items-center">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">Ends In</span>
            {[{v:timeLeft.h, l:'H'}, {v:timeLeft.m, l:'M'}, {v:timeLeft.s, l:'S'}].map((t, i) => (
              <React.Fragment key={t.l}>
                <div className="flex flex-col items-center">
                  <span className="bg-[#00AEEF] text-white px-3 py-2 text-base md:text-xl font-black leading-none shadow-lg shadow-blue-100 rounded-xl min-w-[44px] flex items-center justify-center">{formatNum(t.v)}</span>
                </div>
                {i < 2 && <span className="text-[#00AEEF] font-black text-xl">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 text-[#00AEEF] font-black hover:text-[#E91E63] transition-all text-sm uppercase tracking-widest">
          See All Offers <ChevronRight className="w-5 h-5 bg-[#00AEEF] text-white p-1 rounded-full" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
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
