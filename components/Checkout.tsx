
import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Truck, CreditCard, ShoppingBag, MapPin, Check, Info, User, Phone, Home, ArrowRight, Lock } from 'lucide-react';
import { Product } from '../types';

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  onConfirm: () => void;
  onBack: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  allProducts: Product[];
}

const Checkout: React.FC<CheckoutProps> = ({ onConfirm, onBack, cartItems, totalPrice, allProducts }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const shippingFee = cartItems.length > 0 ? 60 : 0;
  const grandTotal = totalPrice + shippingFee;

  // Enhance cart items with product details
  const enhancedCartItems = cartItems.map(item => {
    const product = allProducts.find(p => p.id === item.id);
    return { ...item, product };
  });

  return (
    <div className="bg-[#fcfcfd] min-h-screen py-8 md:py-16 font-['Inter'] selection:bg-blue-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all w-fit group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm uppercase tracking-[0.2em]">Return to Shop</span>
          </button>

          {/* Premium Stepper */}
          <div className="flex items-center gap-3 md:gap-6 bg-white px-6 py-3 shadow-sm border border-gray-100 rounded-none">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-blue-600 text-white flex items-center justify-center font-black text-[10px] rounded-none shadow-lg shadow-blue-100">01</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Shipping</span>
            </div>
            <div className="w-8 h-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-slate-100 text-gray-400 flex items-center justify-center font-black text-[10px] rounded-none">02</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Checkout Section */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipping Address Section */}
            <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-blue-50 text-blue-600">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Delivery Details</h2>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Provide your shipping information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
                    <User className="w-3.5 h-3.5" /> Recipient Name
                  </label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="e.g. Abdullah Al Mamun" 
                      className="w-full px-5 py-4.5 bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all rounded-none font-bold text-gray-800 placeholder:text-gray-300 text-base" 
                    />
                  </div>
                </div>

                {/* Contact Number Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
                    <Phone className="w-3.5 h-3.5" /> Mobile Number
                  </label>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      placeholder="017XXXXXXXX" 
                      className="w-full px-5 py-4.5 bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all rounded-none font-bold text-gray-800 placeholder:text-gray-300 text-base" 
                    />
                  </div>
                </div>

                {/* Detailed Address Input */}
                <div className="md:col-span-2 space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
                    <Home className="w-3.5 h-3.5" /> Full Address
                  </label>
                  <div className="relative group">
                    <textarea 
                      rows={3} 
                      placeholder="Flat No, House, Road, Area, Landmark..." 
                      className="w-full px-5 py-4.5 bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none rounded-none font-bold text-gray-800 placeholder:text-gray-300 text-base leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                {/* City Selection */}
                <div className="md:col-span-2 space-y-3">
                  <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
                    <MapPin className="w-3.5 h-3.5" /> Delivery Zone
                  </label>
                  <div className="relative">
                    <select className="w-full px-5 py-4.5 bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none rounded-none font-black text-gray-800 uppercase tracking-widest text-sm cursor-pointer">
                      <option>Inside Dhaka City (৳60)</option>
                      <option>Chittagong (৳120)</option>
                      <option>Sylhet (৳120)</option>
                      <option>Outside Dhaka - All Areas (৳150)</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronLeft className="w-5 h-5 rotate-[270deg]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-pink-500"></div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-pink-50 text-pink-500">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Payment Method</h2>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Select your preferred gateway</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'cod', name: 'Cash On Delivery', logo: '🚚', color: 'blue' },
                  { id: 'bkash', name: 'bKash Pay', logo: '💰', color: 'pink' },
                  { id: 'nagad', name: 'Nagad Pay', logo: '💳', color: 'orange' },
                  { id: 'card', name: 'Debit Card', logo: '🏦', color: 'slate' }
                ].map((method) => (
                  <label key={method.id} className="relative group cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="sr-only peer" 
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <div className={`h-full p-5 border-2 border-slate-100 bg-slate-50/30 text-center peer-checked:border-gray-900 peer-checked:bg-white transition-all hover:bg-white hover:border-slate-300 rounded-none flex flex-col items-center justify-center`}>
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform grayscale peer-checked:grayscale-0">{method.logo}</div>
                      <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-tight">{method.name}</div>
                      {paymentMethod === method.id && (
                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-none z-10">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            
            <div className="bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-10 rounded-none">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                <h3 className="font-black text-gray-900 uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-blue-600" /> 
                  Your Order
                </h3>
                <span className="bg-slate-100 px-3 py-1 text-[10px] font-black text-gray-600 uppercase tracking-widest">{cartItems.length} items</span>
              </div>

              {/* Enhanced Cart Preview */}
              <div className="space-y-6 max-h-[350px] overflow-y-auto no-scrollbar mb-8 pr-2">
                {enhancedCartItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-5 items-center group">
                    <div className="w-16 h-16 bg-slate-50 p-2 border border-slate-100 flex-shrink-0 group-hover:border-blue-200 transition-colors rounded-none relative">
                      <img src={item.product?.image} alt="" className="w-full h-full object-contain" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white flex items-center justify-center text-[10px] font-black rounded-none">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-black text-gray-800 uppercase tracking-tight leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                        {item.product?.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                         Unit: ৳{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Totals Section */}
              <div className="space-y-4 bg-slate-50/50 p-6 mb-8 border border-slate-100">
                <div className="flex justify-between items-center text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">
                  <span>Subtotal Amount</span>
                  <span className="text-gray-900">৳ {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-1.5">
                    <span>Delivery Charge</span>
                    <Info className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                  <span className="text-gray-900">৳ {shippingFee}</span>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-2">Grand Total</span>
                    <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">৳{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <span className="bg-green-500 text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-none mb-2 flex items-center gap-1.5 shadow-lg shadow-green-100">
                       <Lock className="w-3 h-3" /> Encrypted
                     </span>
                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Taxes Included</p>
                  </div>
                </div>
              </div>
              
              {/* The "More Beautiful" Complete Order Button */}
              <button 
                onClick={onConfirm}
                disabled={cartItems.length === 0}
                className="relative w-full group overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-blue-600 transition-transform duration-500 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-transparent to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative flex items-center justify-center gap-4 py-6 md:py-7 px-8 text-white">
                  <span className="text-lg md:text-xl font-black uppercase tracking-[0.25em]">Complete Purchase</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  SSL Certified
                </div>
                <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Trusted Express
                </div>
              </div>
            </div>

            {/* Support Message */}
            <div className="bg-gray-900 p-8 text-white rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-pink-500/20 transition-colors"></div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-pink-500">
                <Info className="w-4 h-4" /> Live Assistance
              </h4>
              <p className="text-[12px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                Any issues with your checkout? Contact <span className="text-white">09638-866300</span> (10 AM - 10 PM). 
                We're here to help you 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
