import React, { useEffect, useState } from 'react';
import { Truck, MessageCircle, Menu, Search, LogOut, User } from 'lucide-react'; // User আইকন যোগ করা হয়েছে
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient'; 
import { Session } from '@supabase/supabase-js';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // আপনার অফিশিয়াল নম্বরটি এখানে দিন
const whatsappNumber = "8801752226584"; 
const message = "Hello Pouchhai, আমি আমার বাসা/অফিস শিফট করতে চাই। খরচ এবং সার্ভিস সম্পর্কে জানাবেন প্লিজ।";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // বর্তমান সেশন চেক করা
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // অথেনটিকেশন স্টেট পরিবর্তন হ্যান্ডেল করা
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/'); // লগআউটের পর হোম পেজে নিয়ে যাওয়া ভালো
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-[8%] py-4 bg-[#0F172A]/80 backdrop-blur-2xl border-b border-white/5">
      
      {/* লোগো ও হোয়াটসঅ্যাপ সাপোর্ট */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black italic tracking-tighter text-white no-underline group">
          <Truck className="text-indigo-500 group-hover:translate-x-1 transition-transform" size={28} />
          <span>Pouchhai<span className="text-indigo-500">.</span></span>
        </Link>

        {/* Official WhatsApp Support - Desktop */}
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-1.5 rounded-full transition-all no-underline group"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <MessageCircle size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Support
          </span>
        </a>
      </div>

      {/* ডেস্কটপ মেনু */}
      <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/60">
        <Link to="/" className="hover:text-white transition no-underline">Home</Link>
        <Link to="/services" className="hover:text-white transition no-underline">Services</Link>
        
        <Link 
          to="/track" 
          className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition no-underline bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10"
        >
          <Search size={12} />
          Track Order
        </Link>

        {/* কন্ডিশনাল ড্যাশবোর্ড লিঙ্ক */}
        {user && (
          <Link to="/user-dashboard" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition no-underline bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
            <User size={12} />
            My Dashboard
          </Link>
        )}
        
        <div className="h-4 w-[1px] bg-white/10 mx-1" />

        {/* লগইন বনাম লগআউট বাটন */}
        {user ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl font-black transition cursor-pointer border border-red-500/20 text-[10px] uppercase tracking-widest"
          >
            <LogOut size={14} />
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className="bg-white text-black hover:bg-indigo-500 hover:text-white px-6 py-2 rounded-xl font-black transition shadow-xl no-underline text-[10px] uppercase tracking-widest"
          >
            Login
          </Link>
        )}
      </div>

      {/* মোবাইল অ্যাকশন */}
      <div className="flex md:hidden items-center gap-3">
        {user && (
          <Link to="/user-dashboard" className="text-emerald-400 bg-emerald-400/10 p-2 rounded-full">
            <User size={20} />
          </Link>
        )}
        <Link to="/track" className="text-indigo-400 bg-indigo-400/10 p-2 rounded-full">
          <Search size={20} />
        </Link>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-500 bg-emerald-500/10 p-2 rounded-full">
          <MessageCircle size={20} />
        </a>
        <button className="text-white/70 p-1">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;