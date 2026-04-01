import React, { useState } from 'react';
import { Truck, MapPin, ArrowRight, ShieldCheck, Clock, Package } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home = () => {
  // ফর্ম ডাটা হ্যান্ডেল করার জন্য স্টেট
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_location: '',
    destination: '',
    floor: '১ম তলা',
    has_lift: 'হ্যাঁ'
  });

  // সুপাবেসে ডাটা পাঠানোর ফাংশন
  const handleEstimate = async () => {
    if (!formData.current_location || !formData.destination) {
      alert("দয়া করে লোকেশনগুলো ইনপুট দিন!");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          current_location: formData.current_location,
          destination: formData.destination,
          floor: formData.floor,
          has_lift: formData.has_lift === 'হ্যাঁ'
        }
      ]);

      if (error) throw error;
      alert("আপনার রিকোয়েস্টটি সফলভাবে গ্রহণ করা হয়েছে!");
      setFormData({ current_location: '', destination: '', floor: '১ম তলা', has_lift: 'হ্যাঁ' });
    } catch (err: any) {
      alert("এরর: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden">
      
      {/* Background Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />

      {/* 2. Hero Section */}
      <main className="relative z-10 px-8 md:px-[8%] pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            নিশ্চিন্তে গন্তব্যে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              পৌঁছাই
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            আপনার বাসার মূল্যবান মালামাল এখন ডিজিটাল ট্র্যাকিং এবং প্রিমিয়াম প্যাকিংয়ের মাধ্যমে শিফট হবে সব থেকে সহজে। আমরা শুধু মালামাল নয়, আপনার ভরসা পৌঁছাই।
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-indigo-600/20 border-none cursor-pointer text-white">
              বুকিং করুন <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition text-white cursor-pointer">
              কীভাবে কাজ করে?
            </button>
          </div>
        </div>

        {/* Right Side: Glass Estimator Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">দ্রুত এস্টিমেট নিন</h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider opacity-50">বর্তমান লোকেশন</label>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500 transition">
                <MapPin className="text-indigo-500" size={20} />
                <input 
                  type="text" 
                  placeholder="উত্তরা, ঢাকা" 
                  className="bg-transparent border-none outline-none w-full text-white placeholder:opacity-30"
                  value={formData.current_location}
                  onChange={(e) => setFormData({...formData, current_location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider opacity-50">গন্তব্য</label>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-emerald-500 transition">
                <MapPin className="text-emerald-500" size={20} />
                <input 
                  type="text" 
                  placeholder="বনানী, ঢাকা" 
                  className="bg-transparent border-none outline-none w-full text-white placeholder:opacity-30"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider opacity-50">তলা (Floor)</label>
                <select 
                  className="w-full bg-[#0F172A] p-4 rounded-2xl border border-white/5 outline-none text-white appearance-none cursor-pointer"
                  value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                >
                  <option>১ম তলা</option>
                  <option>৫ম তলা</option>
                  <option>১০ম তলা</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider opacity-50">লিফট আছে?</label>
                <select 
                  className="w-full bg-[#0F172A] p-4 rounded-2xl border border-white/5 outline-none text-white appearance-none cursor-pointer"
                  value={formData.has_lift}
                  onChange={(e) => setFormData({...formData, has_lift: e.target.value})}
                >
                  <option>হ্যাঁ</option>
                  <option>না</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleEstimate}
              disabled={loading}
              className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-bold hover:opacity-90 transition border-none text-white cursor-pointer shadow-lg shadow-blue-600/20"
            >
              {loading ? 'প্রসেসিং...' : 'খরচ দেখুন'}
            </button>
          </div>
        </div>
      </main>

      {/* 3. Stats/Trust Section - এখানে ID="services" দেওয়া হয়েছে */}
      <section id="services" className="px-8 md:px-[8%] py-12 grid md:grid-cols-3 gap-6 relative z-10 scroll-mt-24">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-indigo-500/30 transition">
          <div className="p-4 bg-indigo-500/10 rounded-2xl">
            <ShieldCheck className="text-indigo-400" size={32} />
          </div>
          <h4 className="text-xl font-bold">নিরাপদ ইন্স্যুরেন্স</h4>
          <p className="text-sm opacity-50 leading-relaxed">মালামাল ভাঙলে ১০০% ক্ষতিপূরণের নিশ্চয়তা আমরা দিচ্ছি।</p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-emerald-500/30 transition">
          <div className="p-4 bg-emerald-500/10 rounded-2xl">
            <Clock className="text-emerald-400" size={32} />
          </div>
          <h4 className="text-xl font-bold">সঠিক সময়</h4>
          <p className="text-sm opacity-50 leading-relaxed">আপনার মূল্যবান সময় বাঁচাতে আমাদের টিম সবসময় অন-টাইম।</p>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:border-cyan-500/30 transition">
          <div className="p-4 bg-cyan-500/10 rounded-2xl">
            <Package className="text-cyan-400" size={32} />
          </div>
          <h4 className="text-xl font-bold">স্মার্ট ট্র্যাকিং</h4>
          <p className="text-sm opacity-50 leading-relaxed">QR কোডের মাধ্যমে প্রতিটি বক্স ট্র্যাক করুন সরাসরি আমাদের অ্যাপে।</p>
        </div>
      </section>
    </div>
  );
};

export default Home;