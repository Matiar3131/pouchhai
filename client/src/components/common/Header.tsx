import React from 'react';
import { Truck, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition no-underline">
          <Truck className="text-indigo-500" size={32} />
          <span>Pouchhai</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition no-underline">Home</Link>
          
          {/* এখানে কোনোভাবেই href="#services" রাখা যাবে না, সরাসরি /services দিতে হবে */}
          <Link to="/services" className="hover:text-indigo-400 transition no-underline cursor-pointer">
            Services
          </Link>
          
          <Link to="/dashboard" className="hover:text-indigo-400 transition no-underline">Admin Dashboard</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition bg-transparent border-none cursor-pointer">
            <User size={20} />
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition shadow-lg shadow-indigo-600/20 border-none cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;