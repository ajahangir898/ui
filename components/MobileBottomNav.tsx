
import React from 'react';
import { Home, Grid, ShoppingCart, User, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 px-4 z-50 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'home' ? 'text-pink-500 scale-110' : 'text-gray-400'}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-[11px] font-black uppercase tracking-wider">Home</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1.5 text-gray-400"
      >
        <Grid className="w-6 h-6" />
        <span className="text-[11px] font-black uppercase tracking-wider">Cats</span>
      </button>
      <button 
        onClick={() => onNavigate('checkout')}
        className={`flex flex-col items-center gap-1.5 relative transition-all ${currentView === 'checkout' ? 'text-blue-500 scale-110' : 'text-gray-400'}`}
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[9px] w-5 h-5 flex items-center justify-center font-black border-2 border-white rounded-none">1</span>
        <span className="text-[11px] font-black uppercase tracking-wider">Cart</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-gray-400">
        <Heart className="w-6 h-6" />
        <span className="text-[11px] font-black uppercase tracking-wider">Wishlist</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-gray-400">
        <User className="w-6 h-6" />
        <span className="text-[11px] font-black uppercase tracking-wider">Account</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;
