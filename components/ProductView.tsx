
import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, ShoppingCart, CheckCircle, MessageSquare, Store, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductViewProps {
  product: Product;
  onBuyNow: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-slate-50 min-h-screen pb-16 md:pb-20 animate-in slide-in-from-right duration-300">
      <div className="container mx-auto px-4 py-2 md:py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-[9px] md:text-xs text-gray-500 mb-3 md:mb-5 overflow-x-auto whitespace-nowrap pb-1">
          <span className="hover:text-blue-500 cursor-pointer">Home</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="font-bold text-gray-800 truncate max-w-[120px] md:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left: Product Images */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 md:p-6 relative shadow-sm border border-gray-100 rounded-none">
              <span className="absolute top-3 left-3 bg-blue-100 text-blue-600 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-none">-22% OFF</span>
              <button className="absolute top-3 right-3 text-blue-500 hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </button>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full aspect-square object-contain mx-auto max-w-[240px] md:max-w-full rounded-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Center: Product Details */}
          <div className="lg:col-span-4 space-y-3 md:space-y-5">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-1 md:mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 h-3 fill-current" />)}
                </div>
                <span className="text-gray-400 text-[10px] md:text-xs">(0 reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-black text-blue-500">৳ {product.price}</span>
              <div className="flex flex-col">
                <span className="text-[9px] md:text-xs text-orange-500 font-bold">৳ 370 Off</span>
                <span className="text-xs md:text-base text-gray-300 line-through">৳ 1650</span>
              </div>
            </div>

            {/* Counter and Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex items-center justify-between border border-blue-400 overflow-hidden h-10 bg-white rounded-none">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 hover:bg-blue-50 transition-colors text-blue-500 h-full"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  readOnly 
                  className="w-10 text-center font-bold text-gray-800 outline-none text-sm"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 hover:bg-blue-50 transition-colors text-blue-500 h-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-1.5 flex-grow">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-10 px-3 font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 text-[10px] md:text-xs uppercase rounded-none">
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>
                <button 
                  onClick={onBuyNow}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-10 px-3 font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 text-[10px] md:text-xs uppercase rounded-none"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-gray-100">
              <p className="text-pink-600 font-bold text-sm md:text-base italic">Refer Coin: 2000</p>
              <div className="grid grid-cols-1 gap-0.5 text-[10px] md:text-xs text-gray-500">
                <p><span className="text-gray-400">Category:</span> <span className="text-blue-500">Diapers</span></p>
                <p><span className="text-gray-400">Brand:</span> <span className="text-blue-500">Neo Care</span></p>
              </div>
            </div>
          </div>

          {/* Right: Related Products */}
          <div className="lg:col-span-3">
            <div className="bg-white p-3 md:p-5 shadow-sm border border-gray-100 rounded-none">
              <h2 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                Related
                <div className="h-0.5 flex-1 bg-blue-500 ml-1" />
              </h2>
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-1 no-scrollbar lg:space-y-4">
                {MOCK_PRODUCTS.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex gap-2 group cursor-pointer flex-shrink-0 w-40 lg:w-full">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 p-1.5 flex-shrink-0 rounded-none">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-none" loading="lazy" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[9px] md:text-[10px] font-bold text-gray-800 truncate group-hover:text-blue-500 transition-colors">{item.name}</h4>
                      <p className="text-blue-500 font-black text-[10px] md:text-xs">৳ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shop Info Card */}
        <div className="mt-4 md:mt-6 bg-white p-3 md:p-4 shadow-sm border border-gray-100 flex flex-row items-center justify-between gap-3 rounded-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-sm border border-pink-100 rounded-none">CK</div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm md:text-base font-black text-gray-800">Cocokids</h3>
                <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-none text-[8px] md:text-[10px] font-bold flex items-center gap-1">
                  <MessageSquare className="w-2.5 h-2.5" /> Message
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
            <Star className="w-3.5 h-3.5" />
            <span className="font-bold">Ratings <span className="text-blue-500">0</span></span>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-4 md:mt-6 bg-white overflow-hidden shadow-sm border border-gray-100 rounded-none">
          <div className="flex border-b overflow-x-auto no-scrollbar">
            {['Description', 'Reviews', 'Policy'].map(label => (
              <button
                key={label}
                onClick={() => setActiveTab(label.toLowerCase())}
                className={`flex-1 px-4 py-3 text-xs md:text-sm font-bold transition-all rounded-none ${
                  activeTab === label.toLowerCase() 
                  ? 'bg-pink-500 text-white' 
                  : 'text-gray-500 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="p-4 md:p-6 min-h-[150px]">
            {activeTab === 'description' && (
              <div className="text-gray-600 text-xs md:text-sm">
                <p>The Neocare Premium Belt System Baby Diaper is designed for maximum comfort and absorption.</p>
              </div>
            )}
            {activeTab === 'reviews' && <p className="text-center text-gray-400 text-xs">No reviews yet.</p>}
            {activeTab === 'policy' && <p className="text-gray-600 text-xs">7-day hassle-free return policy.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
