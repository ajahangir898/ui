
import React from 'react';
import { Mail, Phone, MapPin, Facebook, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-12 md:mt-20 pt-12 md:pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-pink-500 flex items-center justify-center text-white font-bold text-xl rounded-none">CK</div>
              <div>
                <h1 className="text-xl font-black text-pink-600 leading-none">COCO KIDS</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Every Smile Matters</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium italic">
              "We provide the best care for your little ones because every smile really does matter."
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm rounded-none">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm rounded-none">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 border-b-2 border-blue-500 pb-1 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-blue-50 p-2 group-hover:bg-blue-500 transition-colors rounded-none">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-semibold group-hover:text-pink-600 transition-colors pt-1.5">info@cocokids.com.bd</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-blue-50 p-2 group-hover:bg-blue-500 transition-colors rounded-none">
                  <Phone className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-semibold group-hover:text-pink-600 transition-colors pt-1.5">09638-866300</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-blue-50 p-2 group-hover:bg-blue-500 transition-colors rounded-none">
                  <MapPin className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-semibold leading-relaxed group-hover:text-pink-600 transition-colors pt-1.5">
                  25, Sarker Tower, Sector 7, Uttara, Dhaka-1230
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 border-b-2 border-blue-500 pb-1 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              {['Refund Policy', 'Privacy Policy', 'Terms of Service', 'About Cocokids'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm md:text-base text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all inline-block font-semibold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 border-b-2 border-blue-500 pb-1 inline-block">Useful Links</h3>
            <ul className="space-y-3">
              {['Why Choose Us', 'Payment Methods', 'Customer Support', 'Faq & Help'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm md:text-base text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all inline-block font-semibold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">
          <p>© 2024 CocoKids. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="hover:text-pink-600 transition-colors cursor-pointer">Security</span>
            <span className="hover:text-pink-600 transition-colors cursor-pointer">Powered by Innovative Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
