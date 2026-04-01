import React, { useState } from 'react';
import { Truck, MapPin, Plus, Minus, Wrench, PackageCheck, Zap, Droplets, Info } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home4 = () => {
  const [loading, setLoading] = useState(false);
  
  // মালামালের স্টেট
  const [items, setItems] = useState({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  
  // এক্সট্রা সার্ভিস স্টেট
  const [extraServices, setExtraServices] = useState<string[]>([]);
  
  // বেসিক ফর্ম এবং রাস্তার কন্ডিশন স্টেট
  const [formData, setFormData] = useState({ 
    current_location: '', 
    destination: '', 
    floor: '১ম তলা', 
    has_lift: 'হ্যাঁ',
    road_type: 'মেইন রোড (ট্রাক ঢুকবে)',
    walking_distance: '০-২০ ফুট'
  });

  const updateItem = (item: string, val: number) => {
    setItems(prev => ({ ...prev, [item]: Math.max(0, prev[item as keyof typeof items] + val) }));
  };

  const toggleService = (service: string) => {
    setExtraServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleEstimate = async () => {
    if (!formData.current_location || !formData.destination) return alert("লোকেশনে ইনপুট দিন!");
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{ 
        ...formData, 
        items_json: items,
        extra_services: extraServices, // নিশ্চিত করুন ডাটাবেসে এই কলামটি আছে
        has_lift: formData.has_lift === 'হ্যাঁ'
      }]);
      
      if (error) throw error;
      alert("বিস্তারিত তথ্যসহ আপনার বুকিং সফল হয়েছে!");
    } catch (err: any) { 
      alert(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden pb-20">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />
      
      <main className="relative z-10 px-8 md:px-[8%] pt-16 grid md:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Inventory & Extra Services */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">ডিটেইলস <span className="text-indigo-400">এস্টিমেটর</span></h1>
            <p className="text-slate-400">সঠিক তথ্য দিন, আমরা দিচ্ছি আপনার বাজেটের মধ্যে সেরা সার্ভিস।</p>
          </div>

          {/* মালামালের তালিকা */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 italic"><Truck size={20}/> মালামালের সংখ্যা</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(items).map((item) => (
                <div key={item} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                  <span className="capitalize text-sm font-medium">{item === 'box' ? 'কার্টন/বক্স' : item}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateItem(item, -1)} className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer"><Minus size={14}/></button>
                    <span className="font-bold text-indigo-400">{items[item as keyof typeof items]}</span>
                    <button onClick={() => updateItem(item, 1)} className="p-1 bg-indigo-600 rounded-full hover:bg-indigo-700 transition cursor-pointer"><Plus size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* এক্সট্রা সার্ভিস সেকশন */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-xl font-bold flex items-center gap-2 italic"><Zap size={20} className="text-amber-400"/> অতিরিক্ত সেবা</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'প্যাকিং', icon: <PackageCheck size={14}/> },
                { name: 'এসি ফিটিং', icon: <Droplets size={14}/> },
                { name: 'ইলেকট্রিশিয়ান', icon: <Zap size={14}/> },
                { name: 'প্লাম্বার', icon: <Wrench size={14}/> },
                { name: 'ক্লিনিং', icon: <Plus size={14}/> }
              ].map(service => (
                <button 
                  key={service.name}
                  onClick={() => toggleService(service.name)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition cursor-pointer ${extraServices.includes(service.name) ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                >
                  {service.icon} {service.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Location & Site Condition Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl sticky top-24">
          <h3 className="text-2xl font-bold mb-6 italic">লোকেশন ও রাস্তার অবস্থা</h3>
          <div className="space-y-5">
            <div className="space-y-4">
              <input type="text" placeholder="বর্তমান লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 transition" value={formData.current_location} onChange={e => setFormData({...formData, current_location: e.target.value})} />
              <input type="text" placeholder="গন্তব্য" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-emerald-500 transition" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select className="bg-[#0F172A] p-4 rounded-2xl border border-white/5 outline-none text-xs" value={formData.floor} onChange={e => setFormData({...formData, floor: e.target.value})}>
                <option>১ম তলা</option><option>৩য় তলা</option><option>৫ম তলা</option><option>১০ম তলা</option>
              </select>
              <select className="bg-[#0F172A] p-4 rounded-2xl border border-white/5 outline-none text-xs" value={formData.has_lift} onChange={e => setFormData({...formData, has_lift: e.target.value})}>
                <option>লিফট আছে?</option><option>হ্যাঁ</option><option>না</option>
              </select>
            </div>

            {/* রাস্তার কন্ডিশন (Logistics Details) */}
            <div className="p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-50 flex items-center gap-1"><Info size={12}/> রাস্তার ধরন (গন্তব্য)</label>
                <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 outline-none text-xs" onChange={e => setFormData({...formData, road_type: e.target.value})}>
                  <option>মেইন রোড (ট্রাক ঢুকবে)</option>
                  <option>মাঝারি গলি (পিকআপ ঢুকবে)</option>
                  <option>সরু গলি (ভ্যান বা মাথায় নিতে হবে)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-50">মেইন রোড থেকে দূরত্ব</label>
                <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 outline-none text-xs" onChange={e => setFormData({...formData, walking_distance: e.target.value})}>
                  <option>০-২০ ফুট (খুবই কাছে)</option>
                  <option>২০-১০০ ফুট (হাঁটা দূরত্ব)</option>
                  <option>১০০ ফুট+ (দীর্ঘ দূরত্ব)</option>
                </select>
              </div>
            </div>

            <button onClick={handleEstimate} disabled={loading} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-600/20 text-white cursor-pointer">
              {loading ? 'প্রসেসিং...' : 'ফাইনাল কোটেশন দেখুন'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home4;