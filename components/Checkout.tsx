
import React from 'react';
import { ChevronLeft, ShieldCheck, Truck, CreditCard } from 'lucide-react';

interface CheckoutProps {
  onConfirm: () => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onConfirm, onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 font-bold mb-8 transition-colors rounded-none"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shipping Form */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-none">
              <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                <Truck className="w-7 h-7 text-blue-500" /> Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-3 border-2 border-slate-100 focus:border-blue-400 outline-none transition-all rounded-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                  <input type="tel" placeholder="017XXXXXXXX" className="w-full px-5 py-3 border-2 border-slate-100 focus:border-blue-400 outline-none transition-all rounded-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Delivery Address</label>
                  <textarea rows={3} placeholder="House, Road, Area..." className="w-full px-5 py-3 border-2 border-slate-100 focus:border-blue-400 outline-none transition-all resize-none rounded-none"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                  <select className="w-full px-5 py-3 border-2 border-slate-100 focus:border-blue-400 outline-none transition-all bg-white appearance-none rounded-none">
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-none">
              <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                <CreditCard className="w-7 h-7 text-pink-500" /> Payment Method
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'bKash', logo: '💰' },
                  { name: 'Nagad', logo: '💳' },
                  { name: 'Cash on Delivery', logo: '🚚' },
                  { name: 'Card', logo: '🏦' }
                ].map((method) => (
                  <label key={method.name} className="relative group cursor-pointer">
                    <input type="radio" name="payment" className="sr-only peer" />
                    <div className="p-4 border-2 border-slate-100 text-center peer-checked:border-pink-500 peer-checked:bg-pink-50 transition-all hover:bg-slate-50 rounded-none">
                      <div className="text-3xl mb-2">{method.logo}</div>
                      <div className="text-xs font-black text-gray-700 uppercase">{method.name}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 shadow-sm border border-gray-100 sticky top-32 rounded-none">
              <h2 className="text-2xl font-black text-gray-800 mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">৳ 1,280</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="font-medium">Shipping Fee</span>
                  <span className="font-bold">৳ 60</span>
                </div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex justify-between text-gray-900 text-xl font-black">
                  <span>Total</span>
                  <span className="text-blue-600">৳ 1,340</span>
                </div>
              </div>
              
              <button 
                onClick={onConfirm}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 font-black text-lg shadow-lg shadow-pink-200 transition-all active:scale-95 mb-6 rounded-none"
              >
                Place Order Now
              </button>

              <div className="flex items-center gap-2 justify-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Safe & Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
