
import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, ShoppingCart, CheckCircle, MessageSquare, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductViewProps {
  product: Product;
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'White', class: 'bg-white border-gray-200' },
  { name: 'Blue', class: 'bg-blue-500 border-blue-600' },
  { name: 'Pink', class: 'bg-pink-500 border-pink-600' },
  { name: 'Yellow', class: 'bg-yellow-400 border-yellow-500' }
];

const ProductView: React.FC<ProductViewProps> = ({ product, onBuyNow, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('White');

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 md:pb-20 animate-in slide-in-from-right duration-300 font-['Inter']">
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
              {product.oldPrice && (
                <span className="absolute top-3 left-3 bg-blue-100 text-blue-600 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-none">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              )}
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
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-1 md:mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 h-3 fill-current" />)}
                </div>
                <span className="text-gray-400 text-[10px] md:text-xs">({product.soldCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-black text-blue-500">৳ {product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-xs text-orange-500 font-bold">৳ {product.oldPrice - product.price} Off</span>
                  <span className="text-xs md:text-base text-gray-300 line-through">৳ {product.oldPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Variant: Size Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-[44px] flex items-center justify-center font-black text-sm border-2 transition-all rounded-none ${
                      selectedSize === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-slate-100 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant: Color Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 border-2 flex items-center justify-center p-0.5 transition-all rounded-none ${
                      selectedColor === color.name 
                      ? 'border-pink-500' 
                      : 'border-transparent'
                    }`}
                  >
                    <div className={`w-full h-full border ${color.class}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Counter and Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
              <div className="flex items-center justify-between border-2 border-slate-100 overflow-hidden h-12 bg-white rounded-none">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 hover:bg-slate-50 transition-colors text-gray-400 h-full border-r border-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  readOnly 
                  className="w-12 text-center font-black text-gray-800 outline-none text-base"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 hover:bg-slate-50 transition-colors text-gray-400 h-full border-l border-slate-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 flex-grow">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 hover:bg-pink-600 text-white h-12 px-4 font-black flex items-center justify-center gap-2 transition-all active:scale-95 text-[11px] md:text-xs uppercase tracking-widest rounded-none"
                >
                  <ShoppingCart className="w-4 h-4" /> Add To Cart
                </button>
                <button 
                  onClick={onBuyNow}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-12 px-4 font-black flex items-center justify-center gap-2 transition-all active:scale-95 text-[11px] md:text-xs uppercase tracking-widest rounded-none"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-gray-100">
              <p className="text-pink-600 font-black text-sm md:text-base italic">Refer Coin: {product.coinsReward}</p>
              <div className="grid grid-cols-1 gap-1 text-[10px] md:text-xs text-gray-500">
                <p><span className="text-gray-400 font-bold uppercase tracking-widest mr-2">Category:</span> <span className="text-blue-500 font-bold">Baby Care</span></p>
                <p><span className="text-gray-400 font-bold uppercase tracking-widest mr-2">Availability:</span> <span className="text-green-500 font-black">In Stock</span></p>
              </div>
            </div>
          </div>

          {/* Right: Related Products */}
          <div className="lg:col-span-3">
            <div className="bg-white p-3 md:p-5 shadow-sm border border-gray-100 rounded-none">
              <h2 className="text-sm md:text-base font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                Related
                <div className="h-1 flex-1 bg-blue-500 ml-2" />
              </h2>
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-1 no-scrollbar lg:space-y-4">
                {MOCK_PRODUCTS.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex gap-3 group cursor-pointer flex-shrink-0 w-40 lg:w-full">
                    <div className="w-12 h-12 bg-slate-50 p-2 flex-shrink-0 border border-slate-100 rounded-none group-hover:border-blue-200 transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-none" loading="lazy" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <h4 className="text-[10px] md:text-[11px] font-black text-gray-800 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.name}</h4>
                      <p className="text-pink-600 font-black text-[10px] md:text-xs mt-0.5">৳ {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shop Info Card */}
        <div className="mt-4 md:mt-8 bg-white p-4 md:p-6 shadow-sm border border-gray-100 flex flex-row items-center justify-between gap-4 rounded-none">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-pink-100 rounded-none">CK</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-black text-gray-900">Cocokids</h3>
                <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-none text-[9px] md:text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                  <MessageSquare className="w-3 h-3" /> Message
                </button>
                <button className="border-2 border-slate-100 hover:bg-slate-50 px-3 py-1.5 text-[9px] md:text-[11px] font-black text-gray-500 uppercase tracking-widest transition-colors">View Store</button>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 text-gray-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="font-black text-sm text-gray-800">5.0</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Rating</span>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-4 md:mt-8 bg-white overflow-hidden shadow-sm border border-gray-100 rounded-none">
          <div className="flex border-b overflow-x-auto no-scrollbar">
            {['Description', 'Reviews', 'Policy'].map(label => (
              <button
                key={label}
                onClick={() => setActiveTab(label.toLowerCase())}
                className={`flex-1 px-6 py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all rounded-none ${
                  activeTab === label.toLowerCase() 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-10 min-h-[200px]">
            {activeTab === 'description' && (
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p className="font-bold text-gray-900 italic border-l-4 border-pink-500 pl-4">"Carefully chosen for your little ones because every smile matters."</p>
                <p>{product.description}</p>
                <p>Designed with premium quality materials, this product provides the safety and comfort your baby deserves. Whether it's for playtime, sleep, or daily care, Cocokids ensures top-tier standards for every child.</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="flex flex-col items-center justify-center py-10 opacity-40">
                <Star className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-center font-black uppercase tracking-widest text-sm">No reviews yet for this product.</p>
                <p className="text-xs mt-2">Be the first to share your experience!</p>
              </div>
            )}
            {activeTab === 'policy' && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0 rounded-none">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-sm mb-1">Return Policy</h4>
                    <p className="text-sm text-gray-500">7-day hassle-free return policy if the product is defective or does not match its description.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0 rounded-none">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-sm mb-1">Shipping Info</h4>
                    <p className="text-sm text-gray-500">Fast delivery across Bangladesh. Dhaka City: 24h, Outside Dhaka: 48-72h.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
