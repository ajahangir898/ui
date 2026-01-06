
import React from 'react';
import { Search, ShoppingCart, User, Bell, Phone, Mail, Gift, Users, Menu } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
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

          {/* Search Bar - Responsive width */}
          <div className="flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search for baby products..." 
              className="w-full pl-5 pr-12 md:pr-14 py-2.5 md:py-3.5 border-2 border-blue-50 md:border-blue-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-sm md:text-base placeholder:text-gray-400 rounded-none"
            />
            <button className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-blue-500 hover:scale-110 transition-transform">
              <Search className="w-5 h-5 md:w-6 h-6" />
            </button>
          </div>

          {/* Desktop Actions - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative cursor-pointer group">
              <div className="bg-gray-50 p-3 group-hover:bg-blue-100 group-hover:scale-110 transition-all rounded-none">
                <ShoppingCart className="w-7 h-7 text-gray-600 group-hover:text-blue-600" />
              </div>
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center font-bold border-2 border-white rounded-none">1</span>
            </div>
            
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
