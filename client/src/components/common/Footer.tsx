import React from 'react';
import { Link } from 'react-router-dom';
// Lucide থেকে শুধু সেগুলোই নিন যা এরর দেয় না
import { Truck, Mail, Phone } from 'lucide-react';
// React Icons থেকে ব্র্যান্ড আইকনগুলো নিন
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white no-underline">
            <Truck className="text-indigo-500" size={24} />
            <span>Pouchhai</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            আমরা শুধু মালামাল নয়, আপনার ভরসা পৌঁছে দেই সঠিক সময়ে এবং সর্বোচ্চ নিরাপত্তায়।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm text-slate-400 list-none p-0">
            <li><Link to="/about" className="hover:text-indigo-400 transition no-underline">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/services" className="hover:text-indigo-400 transition no-underline">সার্ভিসসমূহ</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400 transition no-underline">প্রাইসিং প্ল্যান</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
          <ul className="space-y-3 text-sm text-slate-400 list-none p-0">
            <li className="flex items-center gap-2 font-sans"><Phone size={14} className="text-indigo-400" /> +880 1752-226584</li>
            <li className="flex items-center gap-2 font-sans"><Mail size={14} className="text-indigo-400" /> support@pouchhai.com</li>
            <li><Link to="/privacy" className="hover:text-indigo-400 transition text-xs no-underline">প্রাইভেসি পলিসি</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10 focus-within:border-indigo-500 transition">
            <input 
              type="email" 
              placeholder="আপনার ইমেইল" 
              className="bg-transparent border-none outline-none px-3 text-sm w-full text-white placeholder:opacity-30"
            />
            <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition border-none text-white cursor-pointer">Join</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p className="font-sans">© {new Date().getFullYear()} Pouchhai. All rights reserved.</p>
        
        {/* React Icons ব্যবহার করে সোশ্যাল আইকন */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-slate-500">
            <FaFacebook size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-slate-500">
            <FaTwitter size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-slate-500">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;