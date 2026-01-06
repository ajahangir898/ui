
import React, { useState, useEffect } from 'react';
import { Star, Heart, Plus, Minus, ShoppingCart, CheckCircle, MessageSquare, ChevronRight, ShoppingBag, Eye, User, BadgeCheck } from 'lucide-react';
import { Product } from '../types.ts';
import { fetchRelatedProducts } from '../api.ts';
import { CATEGORIES } from '../constants.tsx';
import Skeleton from './Skeleton.tsx';

interface ProductViewProps {
  product: Product;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onProductClick: (product: Product) => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, onBuyNow, onAddToCart, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [product.id]);

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-500 font-['Inter']">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <span className="hover:text-pink-600 cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 1. Left: Product Image Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 relative shadow-sm group">
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="absolute top-4 left-4 bg-blue-100 text-[#00AEEF] text-[10px] font-black px-3 py-1 rounded-lg">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
              )}
              <button className="absolute top-4 right-4 text-blue-500 hover:scale-110 transition-transform bg-white shadow-sm p-2 rounded-full border border-gray-50">
                <Heart className="w-6 h-6" />
              </button>
              
              <div className="aspect-square flex items-center justify-center">
                <img 
                  src={galleryImages[activeImageIndex]} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 bg-white border-2 p-2 rounded-xl transition-all ${
                      activeImageIndex === idx ? 'border-[#00AEEF]' : 'border-gray-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Center: Product Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex text-gray-200">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-gray-400 text-sm font-medium">(0 reviews)</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-5xl font-black text-[#00AEEF]">৳{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-orange-400">৳ {product.oldPrice - product.price} Off</span>
                  <span className="text-xl text-gray-300 line-through">৳ {product.oldPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Counter */}
              <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-[#00AEEF] hover:bg-blue-50 h-full border-r border-blue-500"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="w-12 text-center font-bold text-gray-800 text-lg">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-[#00AEEF] hover:bg-blue-50 h-full border-l border-blue-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={onAddToCart}
                className="flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0092c9] text-white px-8 h-12 font-bold rounded-lg shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" /> Add to cart
              </button>
              <button 
                onClick={onBuyNow}
                className="flex items-center gap-2 bg-[#E91E63] hover:bg-pink-700 text-white px-8 h-12 font-bold rounded-lg shadow-lg shadow-pink-100 transition-all active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" /> Buy Now
              </button>
            </div>

            {/* Metadata List */}
            <div className="space-y-3 pt-6">
              <p className="text-[#E91E63] font-bold text-lg">Refer Coin: {product.coinsReward}</p>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-[#00AEEF] font-semibold cursor-pointer hover:underline">Bath & Skin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Brand:</span>
                  <span className="text-[#00AEEF] font-semibold cursor-pointer hover:underline">{product.brand || 'N/A'}</span>
                </div>
                <div className="flex flex-wrap items-start gap-1">
                  <span className="text-gray-500 whitespace-nowrap">Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(product.tags || []).map((tag, i) => (
                      <span key={i} className="text-[#00AEEF] font-semibold cursor-pointer hover:underline">
                        {tag}{i < (product.tags?.length || 0) - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right: Category Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-28">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 inline-block relative">
                  Category
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#00AEEF] rounded-full"></div>
                </h3>
              </div>

              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-blue-100 rounded-xl flex items-center justify-center bg-white group-hover:border-[#00AEEF] transition-colors">
                        <span className="text-xl">{cat.icon}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 capitalize group-hover:text-[#00AEEF]">{cat.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Row: Shop Info */}
        <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-2 border-gray-50 rounded-full flex items-center justify-center p-2 shadow-sm">
              <div className="bg-[#E91E63] text-white w-full h-full rounded-full flex items-center justify-center font-black text-lg">CK</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">Cocokids</h3>
                <BadgeCheck className="w-6 h-6 text-blue-500 fill-blue-500 text-white" />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-2 bg-[#00AEEF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-50">
                  <MessageSquare className="w-4 h-4" /> Message Now
                </button>
                <button className="flex items-center gap-2 border-2 border-blue-400 text-blue-500 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-bold transition-all">
                  <Eye className="w-4 h-4" /> View Shop
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Star className="w-5 h-5" />
              <span className="text-lg font-bold">Ratings 0</span>
            </div>
          </div>
        </div>

        {/* 5. Tab Buttons */}
        <div className="mt-10 flex flex-wrap gap-3">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-8 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide ${
              activeTab === 'description' ? 'bg-[#E91E63] text-white shadow-lg shadow-pink-100' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'
            }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide ${
              activeTab === 'reviews' ? 'bg-[#E91E63] text-white shadow-lg shadow-pink-100' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'
            }`}
          >
            Reviews(0)
          </button>
          <button 
            onClick={() => setActiveTab('policy')}
            className={`px-8 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide ${
              activeTab === 'policy' ? 'bg-[#E91E63] text-white shadow-lg shadow-pink-100' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'
            }`}
          >
            Return & Refund Policy
          </button>
        </div>

        {/* Content Area for Tabs */}
        <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-50 min-h-[300px]">
          {activeTab === 'description' && (
            <div className="text-gray-600 leading-relaxed text-lg">
              <p>{product.description}</p>
              <div className="mt-6 p-6 bg-blue-50/50 rounded-2xl border-l-4 border-[#00AEEF]">
                <p className="font-semibold italic text-blue-800">"Safe, gentle, and carefully selected for your baby's needs."</p>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
              <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-xl font-bold uppercase tracking-widest">Be the first to review!</p>
            </div>
          )}
          {activeTab === 'policy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50/30 p-8 rounded-3xl border border-pink-100">
                <h4 className="text-[#E91E63] font-black uppercase tracking-widest text-sm mb-4">Refund Policy</h4>
                <p className="text-gray-600 leading-relaxed">Easy 7-day return policy for unused products in their original packaging.</p>
              </div>
              <div className="bg-blue-50/30 p-8 rounded-3xl border border-blue-100">
                <h4 className="text-[#00AEEF] font-black uppercase tracking-widest text-sm mb-4">Shipping Info</h4>
                <p className="text-gray-600 leading-relaxed">Fast delivery across Bangladesh. Orders are shipped within 24-48 hours.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
