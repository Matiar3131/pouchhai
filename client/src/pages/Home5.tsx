import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Plus, Minus, Zap, Camera, Calendar, Clock, ShieldCheck, Info } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home5 = () => {
  const [loading, setLoading] = useState(false);
  
  // মালামাল ও তাদের বেস প্রাইস (উদাহরণস্বরূপ)
  const ITEM_PRICES: any = { bed: 800, sofa: 500, fridge: 1000, tv: 400, box: 150 };
  const SERVICE_PRICES: any = { 'প্যাকিং': 1500, 'এসি ফিটিং': 2500, 'ইলেকট্রিশিয়ান': 1000, 'প্লাম্বার': 800, 'ক্লিনিং': 2000 };

  const [items, setItems] = useState({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [totalEstimate, setTotalEstimate] = useState(2500); // বেস ফেয়ার (ট্রাক ভাড়া হিসেবে)

  const [formData, setFormData] = useState({ 
    current_location: '', 
    destination: '', 
    floor: '১ম তলা', 
    has_lift: 'হ্যাঁ',
    road_type: 'মেইন রোড (ট্রাক ঢুকবে)',
    moving_date: '',
    moving_time: 'সকাল ১০টা - দুপুর ১টা'
  });

  // লাইভ এস্টিমেট ক্যালকুলেশন
  useEffect(() => {
    let itemCost = Object.keys(items).reduce((sum, key) => sum + (items[key as keyof typeof items] * ITEM_PRICES[key]), 0);
    let serviceCost = extraServices.reduce((sum, name) => sum + (SERVICE_PRICES[name] || 0), 0);
    let roadExtra = formData.road_type.includes('সরু') ? 1000 : 0;
    
    setTotalEstimate(2500 + itemCost + serviceCost + roadExtra);
  }, [items, extraServices, formData.road_type]);

  const updateItem = (item: string, val: number) => {
    setItems(prev => ({ ...prev, [item]: Math.max(0, prev[item as keyof typeof items] + val) }));
  };

  const toggleService = (service: string) => {
    setExtraServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const handleEstimate = async () => {
    if (!formData.current_location || !formData.destination || !formData.moving_date) {
      return alert("লোকেশ ও তারিখ ইনপুট দিন!");
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{ 
        ...formData, 
        items_json: items,
        extra_services: extraServices,
        estimated_cost: totalEstimate,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("অভিনন্দন! আপনার স্মার্ট বুকিং সফল হয়েছে।");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans relative pb-20">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-600/10 to-transparent" />
      
      <main className="relative z-10 px-6 md:px-[10%] pt-16 grid lg:grid-cols-12 gap-10">
        
        {/* Left: Selection Area (Col 7) */}
        <div className="lg:col-span-7 space-y-8">
          <header>
            <h1 className="text-4xl font-black italic mb-2">Pouchhai <span className="text-indigo-500">Smart V5</span></h1>
            <p className="text-slate-400">লাইভ কোটেশন এবং শিডিউলিং ফিচারসহ প্রিমিয়াম অভিজ্ঞতা।</p>
          </header>

          {/* মালামালের তালিকা */}
          <section className="bg-white/5 p-6 rounded-[32px] border border-white/10">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Truck size={20} className="text-indigo-400"/> মালামাল যুক্ত করুন</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(items).map((item) => (
                <div key={item} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <div className="text-sm">
                    <p className="capitalize font-bold">{item === 'box' ? 'কার্টন' : item}</p>
                    <p className="text-[10px] text-slate-500">৳{ITEM_PRICES[item]} / unit</p>
                  </div>
                  <div className="flex items-center gap-4 bg-[#0F172A] p-1.5 rounded-xl border border-white/10">
                    <button onClick={() => updateItem(item, -1)} className="p-1 hover:text-indigo-400"><Minus size={16}/></button>
                    <span className="w-5 text-center font-bold">{items[item as keyof typeof items]}</span>
                    <button onClick={() => updateItem(item, 1)} className="p-1 hover:text-indigo-400"><Plus size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* শিডিউলিং ও ছবি */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4">
              <h3 className="text-md font-bold flex items-center gap-2"><Calendar size={18} className="text-emerald-400"/> শিডিউল করুন</h3>
              <input type="date" className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 text-sm" onChange={e => setFormData({...formData, moving_date: e.target.value})} />
              <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 text-sm" onChange={e => setFormData({...formData, moving_time: e.target.value})}>
                <option>সকাল ৮টা - ১২টা</option>
                <option>দুপুর ২টা - ৫টা</option>
                <option>রাত ৯টা - ১২টা</option>
              </select>
            </div>
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white/10 transition border-dashed">
              <Camera size={32} className="text-slate-500" />
              <p className="text-xs text-slate-400 font-medium">মালামালের ছবি আপলোড করুন <br/><span className="text-[10px] opacity-50">(ঐচ্ছিক)</span></p>
            </div>
          </section>
        </div>

        {/* Right: Price Card (Col 5) */}
        <div className="lg:col-span-5">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] sticky top-24 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[50px] -mr-16 -mt-16" />
            
            <h3 className="text-xl font-bold mb-8 italic">এস্টিমেটেড কস্ট</h3>
            
            <div className="text-center mb-8">
              <span className="text-5xl font-black text-indigo-400">৳{totalEstimate.toLocaleString()}</span>
              <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">ভাউচার কোড প্রযোজ্য হতে পারে</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-500" />
                <input type="text" placeholder="বর্তমান ঠিকানা" className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-sm focus:border-indigo-500 transition" value={formData.current_location} onChange={e => setFormData({...formData, current_location: e.target.value})} />
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-500" />
                <input type="text" placeholder="গন্তব্য ঠিকানা" className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-sm focus:border-indigo-500 transition" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase">অতিরিক্ত সেবা</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(SERVICE_PRICES).map(s => (
                  <button key={s} onClick={() => toggleService(s)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition border cursor-pointer ${extraServices.includes(s) ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleEstimate} disabled={loading} className="w-full py-5 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 border-none text-white cursor-pointer">
              {loading ? 'লোড হচ্ছে...' : 'বুকিং নিশ্চিত করুন'}
              <ShieldCheck size={20} />
            </button>
            
            <div className="mt-6 flex items-start gap-2 text-[10px] text-slate-500 italic leading-relaxed">
              <Info size={12} className="flex-shrink-0" />
              <p>এটি একটি প্রাথমিক ধারণা। দূরত্বের ওপর ভিত্তি করে দাম পরিবর্তন হতে পারে। আমাদের প্রতিনিধি আপনাকে কল করে কনফার্ম করবেন।</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home5;