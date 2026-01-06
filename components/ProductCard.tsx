
import React from 'react';
import { Heart, Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div 
      className="group bg-white border border-gray-100/50 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full relative p-2 md:p-4 cursor-pointer isolate rounded-none"
      onClick={onClick}
    >
      {/* Dynamic Badge */}
      {product.oldPrice && product.isSale && (
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-0.5">
          <span className="bg-pink-500 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 shadow-lg shadow-pink-200 rounded-none">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </span>
          <span className="bg-blue-500 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 shadow-lg shadow-blue-200 flex items-center gap-1 rounded-none">
            <TrendingUp className="w-2.5 h-2.5" /> HOT
          </span>
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all z-20 bg-white/90 backdrop-blur-sm p-1.5 shadow-sm border border-gray-100 group/wish rounded-none" 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Heart className="w-4 h-4 md:w-5 h-5 group-hover/wish:fill-pink-500 transition-all" />
      </button>

      {/* Image Container */}
      <div className="aspect-square w-full mb-3 md:mb-4 overflow-hidden bg-slate-50 relative rounded-none">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-1 md:p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content Section */}
      <div className="px-1 flex flex-col flex-grow">
        {/* Rating & Sold Badge */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-1.5 py-0.5 text-[9px] md:text-[11px] font-bold rounded-none">
            <Star className="w-2.5 h-2.5 md:w-3 h-3 fill-orange-500 text-orange-500" />
            <span>{product.rating > 0 ? product.rating : '5.0'}</span>
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {product.soldCount > 0 ? `${product.soldCount} Sold` : 'New'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs md:text-base font-black text-gray-800 line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors leading-tight min-h-[2rem] md:min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Coins Reward Badge */}
        <div className="inline-flex items-center gap-1 mb-3">
          <div className="w-4 h-4 bg-yellow-400 flex items-center justify-center shadow-sm rounded-none">
            <span className="text-white font-black text-[8px]">C</span>
          </div>
          <span className="text-[10px] md:text-xs font-bold text-gray-500">
            Get <span className="text-blue-600 font-black">{product.coinsReward}</span>
          </span>
        </div>

        {/* Pricing Block */}
        <div className="mt-auto pt-1.5 border-t border-gray-50">
          <div className="flex flex-wrap items-baseline gap-1.5 mb-3">
            <span className="text-lg md:text-2xl font-black text-pink-600 leading-none">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-gray-300 line-through text-[10px] md:text-sm font-bold">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 md:gap-2">
            <button 
              onClick={handleAdd}
              className="flex-1 bg-gray-900 hover:bg-pink-600 text-white font-black py-2.5 md:py-3 text-[10px] md:text-sm transition-all active:scale-95 shadow-lg shadow-gray-200 hover:shadow-pink-100 uppercase tracking-widest rounded-none"
            >
              Add To Cart
            </button>
            <button 
              className="w-10 md:w-12 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-100 group/cart rounded-none" 
              onClick={handleAdd}
            >
              <ShoppingCart className="w-5 h-5 md:w-6 h-6 group-hover/cart:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
