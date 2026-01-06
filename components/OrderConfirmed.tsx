
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface OrderConfirmedProps {
  onContinue: () => void;
}

const OrderConfirmed: React.FC<OrderConfirmedProps> = ({ onContinue }) => {
  return (
    <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center p-4 font-['Inter']">
      <div className="bg-white p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 max-w-lg w-full text-center rounded-xl animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-[#3ecf8e] flex items-center justify-center rounded-full shadow-lg shadow-green-100">
            <Check className="w-10 h-10 text-white stroke-[3px]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 mb-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">
            Thank You
          </h4>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            Your Order is Placed
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4">
            We received your order and will begin processing it soon. Your order information appears below.
          </p>
          <p className="text-gray-800 font-medium text-lg pt-2">
            Your order Number <span className="font-bold text-gray-900">#0004</span>
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            onClick={onContinue}
            className="group inline-flex items-center gap-2 bg-[#3ecf8e] hover:bg-green-600 text-white px-8 py-3.5 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-green-100 rounded-lg"
          >
            View Order
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmed;
