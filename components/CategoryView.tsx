
import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, ShoppingCart, Star, Heart, RotateCcw } from 'lucide-react';
import { Product, Category } from '../types';

interface CategoryViewProps {
  allProducts: Product[];
  categories: Category[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ allProducts, categories, onProductClick, onAddToCart, onBack }) => {
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => p.price <= priceRange);
  }, [allProducts, priceRange]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 md:py-10 font-['Inter']">
      <div className="container mx-auto px-4">
        
        {/* Top Bar: Breadcrumb & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <nav className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="hover:text-blue-500 cursor-pointer" onClick={onBack}>Home</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800">Category Page</span>
          </nav>

          <div className="flex items-center gap-3 self-end">
            <span className="text-gray-400 font-bold text-sm flex items-center gap-1">
              <span className="rotate-90 scale-y-[-1] inline-block">⇅</span> Sort by:
            </span>
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border-none text-gray-800 font-black text-sm pr-8 py-1 outline-none appearance-none cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0 space-y-8">
            
            {/* Price Filter */}
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-none">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-1 leading-none">Fill by price</h3>
                <div className="w-12 h-1 bg-blue-500 mt-2"></div>
              </div>

              <div className="space-y-6">
                <div className="relative h-2 bg-blue-50 rounded-full mt-8">
                  <div 
                    className="absolute h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(priceRange / 2100) * 100}%` }}
                  ></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2100" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="absolute top-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute w-5 h-5 bg-blue-500 border-4 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `0%` }}
                  ></div>
                  <div 
                    className="absolute w-5 h-5 bg-blue-500 border-4 border-white shadow-md top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${(priceRange / 2100) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-pink-500 font-bold tracking-tight">From: <span className="font-black">0</span></span>
                  <span className="text-pink-500 font-bold tracking-tight">To: <span className="font-black">{priceRange}</span></span>
                </div>

                <button className="w-24 bg-[#00AEEF] hover:bg-blue-600 text-white font-black py-2.5 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100 rounded-none">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-none">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <h3 className="text-xl font-black text-gray-900 mb-1 leading-none">Category</h3>
                  <div className="w-14 h-1 bg-blue-500 mt-2"></div>
                </div>
                <button 
                  onClick={() => {setSelectedCategory(null); setPriceRange(2100);}}
                  className="text-[10px] font-black uppercase text-pink-600 border border-pink-500 px-2 py-1 flex items-center gap-1 hover:bg-pink-500 hover:text-white transition-all rounded-none"
                >
                  Reset Filters
                </button>
              </div>

              <div className="space-y-3">
                {categories.slice(0, 5).map(cat => (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between p-3 border cursor-pointer transition-all group rounded-none ${
                      selectedCategory === cat.id ? 'border-blue-400 bg-blue-50/30' : 'border-gray-50 hover:border-blue-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 border border-gray-100 flex items-center justify-center text-lg rounded-none group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <span className="text-xs font-black text-blue-500 uppercase tracking-tight">{cat.name}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${selectedCategory === cat.id ? 'bg-pink-500' : 'bg-pink-500/20'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="bg-white border border-gray-100 p-4 relative group flex flex-col hover:shadow-xl transition-all cursor-pointer rounded-none"
                >
                  {/* Badge & Icons */}
                  <div className="absolute top-4 left-4 z-10">
                    <button className="text-pink-500 hover:scale-125 transition-transform bg-white/50 backdrop-blur-sm p-1">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  {product.isSale && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#FF4D4D] text-white text-[10px] font-black px-3 py-1 uppercase rounded-full">SALE</span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square mb-4 overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-blue-500 font-black text-xs">
                        <Star className="w-3.5 h-3.5 fill-blue-500" />
                        <span>({product.rating})</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <span className="text-xs font-bold text-gray-400">{product.soldCount} Sold</span>
                    </div>

                    <h3 className="text-sm font-black text-gray-900 leading-tight group-hover:text-blue-500 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-gray-400 font-medium line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 pt-1">
                      {product.oldPrice && (
                        <span className="text-gray-300 text-xs line-through">৳{product.oldPrice}</span>
                      )}
                      <span className="text-blue-600 font-black text-lg">৳{product.price}</span>
                    </div>

                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest pt-1">
                      Get {product.coinsReward} Coins
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-black py-3 text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-pink-100 rounded-none"
                    >
                      Buy Now
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="w-12 bg-[#00AEEF] hover:bg-blue-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-100 rounded-none"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white border-2 border-dashed border-gray-100 py-20 flex flex-col items-center justify-center text-center px-4">
                <RotateCcw className="w-12 h-12 text-gray-200 mb-4 animate-spin-slow" />
                <h3 className="text-xl font-black text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-400 font-bold max-w-md">We couldn't find any products in this price range. Try resetting your filters to see more baby products.</p>
                <button 
                  onClick={() => {setPriceRange(2100); setSelectedCategory(null);}}
                  className="mt-6 bg-blue-500 text-white px-8 py-3 font-black uppercase tracking-widest hover:bg-pink-500 transition-all rounded-none"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
