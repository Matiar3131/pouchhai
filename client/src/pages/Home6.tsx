import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Plus, Minus, Zap, Camera, Calendar, Clock, ShieldCheck, Info, Tag, Heart, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home6 = () => {
  const [loading, setLoading] = useState(false);
  
  // মালামাল ও তাদের বেস প্রাইস
  const ITEM_PRICES: any = { bed: 800, sofa: 500, fridge: 1000, tv: 400, box: 150 };
  const SERVICE_PRICES: any = { 'প্যাকিং': 1500, 'এসি ফিটিং': 2500, 'ইলেকট্রিশিয়ান': 1000, 'প্লাম্বার': 800, 'ক্লিনিং': 2000 };

  const [items, setItems] = useState({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [disposalOptions, setDisposalOptions] = useState({ sell: false, donate: false });
  const [totalEstimate, setTotalEstimate] = useState(2500);

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
    
    // নোট: পুরনো আইটেম বিক্রির দাম প্রতিনিধি ভিজিট করে ঠিক করবেন, তাই এখানে শুধু বেস ক্যালকুলেশন থাকছে
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
        sell_old_items: disposalOptions.sell,
        donate_items: disposalOptions.donate,
        estimated_cost: totalEstimate,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("অভিনন্দন! আপনার সার্ভিস রিকোয়েস্টটি গ্রহণ করা হয়েছে।");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans relative pb-20">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/10 to-transparent" />
      
      <main className="relative z-10 px-6 md:px-[8%] pt-16 grid lg:grid-cols-12 gap-10">
        
        {/* Left: Configuration Area */}
        <div className="lg:col-span-7 space-y-8">
          <header>
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-indigo-600/20 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/30 uppercase tracking-widest">Version 6.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic">Pouchhai <span className="text-indigo-500">Ultimate</span></h1>
            <p className="text-slate-400 mt-2">আপনার অপ্রয়োজনীয় আইটেম বিক্রি বা দান করার সুবিধাসহ সম্পূর্ণ সলিউশন।</p>
          </header>

          {/* মালামালের তালিকা */}
          <section className="bg-white/5 p-6 rounded-[32px] border border-white/10">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-sans"><Truck size={20} className="text-indigo-400"/> ইনভেন্টরি লিস্ট</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(items).map((item) => (
                <div key={item} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5 hover:border-white/10 transition">
                  <div>
                    <p className="capitalize font-bold text-sm">{item === 'box' ? 'কার্টন/বক্স' : item}</p>
                    <p className="text-[10px] text-slate-500">বেস: ৳{ITEM_PRICES[item]}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-900 p-1.5 rounded-xl border border-white/10">
                    <button onClick={() => updateItem(item, -1)} className="p-1 hover:text-red-400 transition cursor-pointer"><Minus size={16}/></button>
                    <span className="w-5 text-center font-bold text-indigo-400 font-sans">{items[item as keyof typeof items]}</span>
                    <button onClick={() => updateItem(item, 1)} className="p-1 hover:text-green-400 transition cursor-pointer"><Plus size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* পুরাতন আইটেম ও দান (New Feature) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => setDisposalOptions(p => ({...p, sell: !p.sell}))}
              className={`p-6 rounded-[32px] border transition-all cursor-pointer relative overflow-hidden group ${disposalOptions.sell ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className={`p-2 rounded-lg ${disposalOptions.sell ? 'bg-amber-500 text-white' : 'bg-white/5 text-amber-500'}`}><Tag size={20} /></div>
                <h4 className="font-bold text-sm">পুরনো মালামাল বিক্রি</h4>
              </div>
              <p className="text-[11px] text-slate-400 relative z-10 leading-relaxed">আপনার অপ্রয়োজনীয় আইটেম আমরা কিনে নেব। টাকা বিলের সাথে সমন্বয় করা হবে।</p>
              {disposalOptions.sell && <CheckCircle2 className="absolute top-4 right-4 text-amber-500" size={18} />}
            </div>

            <div 
              onClick={() => setDisposalOptions(p => ({...p, donate: !p.donate}))}
              className={`p-6 rounded-[32px] border transition-all cursor-pointer relative overflow-hidden group ${disposalOptions.donate ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className={`p-2 rounded-lg ${disposalOptions.donate ? 'bg-emerald-500 text-white' : 'bg-white/5 text-emerald-500'}`}><Heart size={20} /></div>
                <h4 className="font-bold text-sm">মালামাল দান করুন</h4>
              </div>
              <p className="text-[11px] text-slate-400 relative z-10 leading-relaxed">অব্যবহৃত মালামাল এতিমখানা বা গরিবদের মাঝে পৌঁছে দিয়ে হাসি ফুটান।</p>
              {disposalOptions.donate && <CheckCircle2 className="absolute top-4 right-4 text-emerald-500" size={18} />}
            </div>
          </section>

          {/* শিডিউল ও ছবি */}
          <section className="grid md:grid-cols-2 gap-6 font-sans">
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2"><Calendar size={18} className="text-indigo-400"/> শিফটিং ডেট</h3>
              <input type="date" className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 text-sm outline-none focus:border-indigo-500 transition" onChange={e => setFormData({...formData, moving_date: e.target.value})} />
              <select className="w-full bg-[#0F172A] p-3 rounded-xl border border-white/5 text-sm outline-none" onChange={e => setFormData({...formData, moving_time: e.target.value})}>
                <option>সকাল ৮টা - ১২টা</option>
                <option>দুপুর ২টা - ৫টা</option>
                <option>রাত ৯টা - ১২টা</option>
              </select>
            </div>
            <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 space-y-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white/10 transition border-dashed group">
              <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition duration-300"><Camera size={32} className="text-slate-400" /></div>
              <p className="text-xs text-slate-400">মালামালের ছবি দিন <br/><span className="text-[10px] opacity-40">(সঠিক কোটেশন পেতে সাহায্য করবে)</span></p>
            </div>
          </section>
        </div>

        {/* Right Side: Sticky Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#0F172A]/80 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] sticky top-24 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-xl font-bold italic mb-6">সার্ভিস সামারি</h3>
              <div className="text-center p-8 bg-white/5 rounded-[32px] border border-white/5">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-sans">Estimated Total</p>
                <span className="text-5xl font-black text-indigo-400 font-sans">৳{totalEstimate.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
               <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="বর্তমান ঠিকানা" className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-2xl border border-white/5 text-sm outline-none focus:border-indigo-500 transition" value={formData.current_location} onChange={e => setFormData({...formData, current_location: e.target.value})} />
               </div>
               <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="গন্তব্য ঠিকানা" className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-2xl border border-white/5 text-sm outline-none focus:border-emerald-500 transition" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
               </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">পছন্দসই এড-অন সার্ভিস</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(SERVICE_PRICES).map(s => (
                  <button 
                    key={s} 
                    onClick={() => toggleService(s)} 
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold transition border cursor-pointer ${extraServices.includes(s) ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleEstimate} 
              disabled={loading} 
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl font-bold hover:shadow-indigo-500/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 border-none text-white cursor-pointer active:scale-95"
            >
              {loading ? 'লোড হচ্ছে...' : 'শিফটিং কনফার্ম করুন'}
              <ShieldCheck size={20} />
            </button>
            
            <p className="mt-6 text-[10px] text-slate-500 text-center italic">
              * আমাদের প্রতিনিধি কল করে সব তথ্য যাচাই করবেন।
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home6;