
import React from 'react';
import { CheckCircle2, Package, Calendar, ArrowRight } from 'lucide-react';

interface OrderConfirmedProps {
  onContinue: () => void;
}

const OrderConfirmed: React.FC<OrderConfirmedProps> = ({ onContinue }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="bg-white p-12 shadow-2xl shadow-blue-100 max-w-2xl w-full text-center border-b-[8px] border-blue-500 rounded-none">
          <div className="w-24 h-24 bg-green-100 flex items-center justify-center mx-auto mb-8 animate-bounce rounded-none">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Woohoo! Order Placed!</h1>
          <p className="text-gray-500 text-lg mb-10">We've received your order and we're starting to pack it with love. You'll receive a confirmation SMS shortly.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 p-6 border border-dashed border-slate-200 rounded-none">
              <div className="flex items-center gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest mb-2 justify-center">
                <Package className="w-3 h-3" /> Order ID
              </div>
              <div className="text-xl font-black text-gray-800">#CK-92834</div>
            </div>
            <div className="bg-slate-50 p-6 border border-dashed border-slate-200 rounded-none">
              <div className="flex items-center gap-2 text-pink-500 font-black uppercase text-[10px] tracking-widest mb-2 justify-center">
                <Calendar className="w-3 h-3" /> Est. Delivery
              </div>
              <div className="text-xl font-black text-gray-800">Dec 14-16</div>
            </div>
          </div>

          <button 
            onClick={onContinue}
            className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-blue-600 text-white px-10 py-5 font-black text-lg transition-all shadow-xl hover:shadow-blue-200 active:scale-95 rounded-none"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 text-center text-gray-400 font-bold text-sm uppercase tracking-widest flex items-center gap-4">
          <span className="w-12 h-px bg-slate-200"></span>
          Trusted by 50,000+ Happy Moms
          <span className="w-12 h-px bg-slate-200"></span>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
