
import React from 'react';
import { Heart, Star, ShoppingCart, TrendingUp } from 'lucide-react';
import { Product } from '../types.ts';

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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div 
      className="group bg-white border border-gray-100/50 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col h-full relative p-3 md:p-4 cursor-pointer isolate rounded-3xl"
      onClick={onClick}
    >
      {/* Dynamic Badge */}
      {product.oldPrice && product.isSale && (
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
          <span className="bg-[#E91E63] text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 shadow-lg shadow-pink-100 rounded-lg">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </span>
          <span className="bg-[#00AEEF] text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 shadow-lg shadow-blue-100 flex items-center gap-1 rounded-lg">
            <TrendingUp className="w-2.5 h-2.5" /> HOT
          </span>
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className="absolute top-4 right-4 text-gray-400 hover:text-[#E91E63] hover:bg-pink-50 transition-all z-20 bg-white/90 backdrop-blur-sm p-2 shadow-sm border border-gray-50 group/wish rounded-full" 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Heart className="w-4 h-4 md:w-5 h-5 group-hover/wish:fill-[#E91E63] transition-all" />
      </button>

      {/* Image Container */}
      <div className="aspect-square w-full mb-3 md:mb-4 overflow-hidden bg-slate-50/50 relative rounded-2xl flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="px-1 flex flex-col flex-grow">
        {/* Rating & Sold Badge */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1 text-orange-400">
            <Star className="w-3.5 h-3.5 fill-orange-400" />
            <span className="text-[11px] font-bold text-gray-600">{product.rating > 0 ? product.rating : '5.0'}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            {product.soldCount > 0 ? `${product.soldCount} Sold` : 'New Arrival'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#00AEEF] transition-colors leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Coins Reward Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-yellow-400 flex items-center justify-center shadow-sm rounded-full">
            <span className="text-white font-black text-[9px]">C</span>
          </div>
          <span className="text-[11px] font-bold text-gray-500">
            Get <span className="text-[#00AEEF] font-black">{product.coinsReward} Coins</span>
          </span>
        </div>

        {/* Pricing Block */}
        <div className="mt-auto">
          <div className="flex flex-wrap items-baseline gap-2 mb-4">
            <span className="text-xl md:text-2xl font-black text-[#E91E63]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-gray-300 line-through text-xs md:text-sm font-bold">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#E91E63] hover:bg-pink-700 text-white font-bold py-3 text-[11px] md:text-sm transition-all active:scale-95 shadow-lg shadow-pink-50 rounded-xl"
            >
              Buy Now
            </button>
            <button 
              className="w-12 bg-[#00AEEF] hover:bg-blue-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-50 group/cart rounded-xl" 
              onClick={handleAdd}
            >
              <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
