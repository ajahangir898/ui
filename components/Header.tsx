
import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Bell, Phone, Mail, Gift, Menu, X } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  products: Product[];
  onSuggestionClick: (product: Product) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onSearch, products, onSuggestionClick, cartCount }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    onSuggestionClick(product);
    setQuery('');
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 font-['Inter']">
      {/* Top Bar - Hidden on Mobile */}
      <div className="hidden md:block bg-slate-50 border-b py-2.5 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-gray-600">
            <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> info@cocokids.com.bd
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5" /> 09638-866300
            </span>
          </div>
          <div className="flex items-center gap-5 text-gray-700 font-semibold">
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600"><Gift className="w-3.5 h-3.5 text-pink-500" /> Daily Reward</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600">Track Order</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600">Seller Registration</a>
            <button className="text-gray-400 hover:text-blue-500 transition-colors"><Bell className="w-4.5 h-4.5" /></button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-3 md:py-4 px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600">
              <Menu className="w-7 h-7" />
            </button>
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={onLogoClick}>
              <div className="w-11 h-11 md:w-14 md:h-14 bg-pink-500 flex items-center justify-center text-white font-bold text-xl md:text-3xl shadow-lg shadow-pink-100 rounded-none">CK</div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-black text-pink-600 leading-none">COCO KIDS</h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-0.5">Every Smile Matters</p>
              </div>
            </div>
          </div>

          {/* Search Bar with Suggestions */}
          <div className="flex-1 max-w-2xl relative" ref={dropdownRef}>
            <form className="relative" onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Deep Search baby products..." 
                className="w-full pl-5 pr-12 md:pr-14 py-2.5 md:py-3.5 border-2 border-blue-50 md:border-blue-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-sm md:text-base placeholder:text-gray-400 rounded-none"
              />
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {query && (
                  <button 
                    type="button" 
                    onClick={() => setQuery('')}
                    className="text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button type="submit" className="text-blue-500 hover:scale-110 transition-transform">
                  <Search className="w-5 h-5 md:w-6 h-6" />
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border-2 border-t-0 border-blue-400 shadow-2xl z-[60] rounded-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  Quick Suggestions
                </div>
                {suggestions.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-4 p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-12 h-12 bg-gray-100 flex-shrink-0 rounded-none overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-bold text-gray-800 truncate leading-tight">{product.name}</h4>
                      <p className="text-pink-600 font-black text-xs md:text-sm mt-0.5">৳ {product.price.toLocaleString()}</p>
                    </div>
                    <Search className="w-4 h-4 text-gray-300 mr-2" />
                  </div>
                ))}
                <div 
                  onClick={handleSubmit}
                  className="p-3 bg-blue-500 text-white text-center text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  See all results for "{query}"
                </div>
              </div>
            )}
          </div>

          {/* Desktop Actions - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-gray-50 p-3 group-hover:bg-pink-100 group-hover:scale-110 transition-all rounded-none">
                <User className="w-7 h-7 text-gray-600 group-hover:text-pink-600" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                <p className="group-hover:text-pink-600 transition-colors">Login / SignUp</p>
              </div>
            </div>
          </div>

          {/* Mobile Bell Button */}
          <button className="md:hidden text-gray-400">
            <Bell className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
