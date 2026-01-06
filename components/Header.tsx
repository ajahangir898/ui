
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
    <header className="w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-0 z-50 font-['Inter']">
      {/* Top Bar */}
      <div className="hidden md:block bg-slate-50/50 border-b border-gray-100 py-2 px-4 text-[11px] font-semibold text-gray-500">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 hover:text-[#00AEEF] transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> info@cocokids.com.bd
            </span>
            <span className="flex items-center gap-2 hover:text-[#00AEEF] transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5" /> 09638-866300
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1.5 hover:text-[#E91E63]"><Gift className="w-3.5 h-3.5 text-[#E91E63]" /> Daily Reward</a>
            <a href="#" className="hover:text-[#00AEEF]">Track Order</a>
            <a href="#" className="hover:text-[#00AEEF]">Seller Area</a>
            <button className="text-gray-400 hover:text-[#E91E63] transition-colors"><Bell className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogoClick}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#E91E63] flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-pink-100 rounded-full transition-transform group-hover:scale-105">CK</div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black text-[#E91E63] leading-none tracking-tight">COCO KIDS</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Every Smile Matters</p>
            </div>
          </div>

          {/* Search Bar */}
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
                placeholder="Search premium baby products..." 
                className="w-full pl-6 pr-14 py-3 md:py-4 bg-slate-50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm md:text-base font-medium placeholder:text-gray-400 rounded-full shadow-inner"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#00AEEF] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100 rounded-full">
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 shadow-2xl z-[60] rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-4 bg-slate-50 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 border-b border-gray-50">
                  Quick Suggestions
                </div>
                {suggestions.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-4 p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-12 h-12 bg-white border border-gray-100 flex-shrink-0 rounded-xl overflow-hidden p-1">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{product.name}</h4>
                      <p className="text-[#E91E63] font-black text-sm mt-0.5">৳ {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="bg-slate-50 p-3 group-hover:bg-pink-50 transition-colors rounded-full border border-transparent group-hover:border-pink-100">
                <User className="w-6 h-6 text-gray-600 group-hover:text-[#E91E63]" />
              </div>
              <div className="text-sm font-bold">
                <p className="text-gray-900 group-hover:text-[#E91E63] transition-colors leading-none mb-1">Account</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Login / Join</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button className="lg:hidden text-gray-400">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
