
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartProps {
  itemCount: number;
  totalPrice: number;
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ itemCount, totalPrice, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] cursor-pointer group flex flex-col items-stretch shadow-2xl transition-all hover:-translate-x-1"
    >
      {/* Top Part: Pink Item Count */}
      <div className="bg-[#FFF1F2] border border-gray-200 border-r-0 flex flex-col items-center justify-center p-3 md:p-4 min-w-[70px] md:min-w-[85px] transition-colors group-hover:bg-pink-50">
        <span className="text-gray-800 text-[10px] md:text-xs font-bold whitespace-nowrap mb-1">
          {itemCount} Items
        </span>
        <ShoppingCart className="w-5 h-5 md:w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform" />
      </div>

      {/* Bottom Part: Black Price */}
      <div className="bg-black text-white py-2 px-1 flex items-center justify-center border-t border-gray-800">
        <span className="text-xs md:text-sm font-black flex items-baseline gap-0.5">
          <span className="text-[10px] md:text-xs">৳</span>
          {totalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default FloatingCart;
