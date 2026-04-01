import React from 'react';
import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 md:px-[8%] py-5 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10">
      {/* লোগো */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white no-underline">
        <Truck className="text-indigo-500" size={32} />
        <span>Pouchhai</span>
      </Link>

      {/* মেনু সেকশন */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        <Link to="/" className="hover:text-indigo-400 transition no-underline">Home</Link>
        
        <Link to="/services" className="hover:text-indigo-400 transition no-underline cursor-pointer">
          Services
        </Link>
        
        <Link to="/user-dashboard" className="hover:text-indigo-400 transition no-underline">
          My Bookings
        </Link>
        <Link to="/pricing" className="hover:text-indigo-400 transition no-underline cursor-pointer">Pricing</Link>
        <Link to="/dashboard" className="hover:text-indigo-400 transition no-underline">
          Admin
        </Link>

        {/* লগইন বাটনকে Link এ রূপান্তর করা হয়েছে */}
        <Link 
          to="/login" 
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-xl font-bold text-white transition shadow-lg shadow-indigo-600/20 no-underline cursor-pointer"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;