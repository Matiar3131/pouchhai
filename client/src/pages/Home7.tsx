import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Plus, Minus, Zap, Camera, Calendar, Clock, ShieldCheck, Info, Tag, Heart, CheckCircle2, Building2, Home } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home7 = () => {
  const [loading, setLoading] = useState(false);
  const [shiftType, setShiftType] = useState<'home' | 'office'>('home');

  // প্রাইস লিস্ট (বাসা vs অফিস)
  const ITEM_PRICES: any = {
    home: { bed: 800, sofa: 500, fridge: 1000, tv: 400, box: 150 },
    office: { workstation: 500, server_rack: 3000, office_chair: 200, conference_table: 1500, file_cabinet: 600 }
  };

  const SERVICE_PRICES: any = { 'প্যাকিং': 1500, 'এসি/আইটি ফিটিং': 2500, 'ইলেকট্রিশিয়ান': 1000, 'প্লাম্বার/নেটওয়ার্কিং': 1200, 'ক্লিনিং': 2000 };

  const [items, setItems] = useState<any>({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [disposalOptions, setDisposalOptions] = useState({ sell: false, donate: false });
  const [totalEstimate, setTotalEstimate] = useState(2500);

  const [formData, setFormData] = useState({ 
    current_location: '', 
    destination: '', 
    floor: '১ম তলা', 
    moving_date: '',
    moving_time: 'সকাল ১০টা - দুপুর ১টা'
  });

  // মোড চেঞ্জ হলে ইনভেন্টরি রিসেট
  useEffect(() => {
    const newItems = shiftType === 'home' 
      ? { bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 }
      : { workstation: 0, server_rack: 0, office_chair: 0, conference_table: 0, file_cabinet: 0 };
    setItems(newItems);
  }, [shiftType]);

  // লাইভ এস্টিমেট
  useEffect(() => {
    let itemCost = Object.keys(items).reduce((sum, key) => sum + (items[key] * ITEM_PRICES[shiftType][key]), 0);
    let serviceCost = extraServices.reduce((sum, name) => sum + (SERVICE_PRICES[name] || 0), 0);
    let baseFare = shiftType === 'home' ? 2500 : 5000; // অফিসের বেস ফেয়ার বেশি
    setTotalEstimate(baseFare + itemCost + serviceCost);
  }, [items, extraServices, shiftType]);

  const updateItem = (item: string, val: number) => {
    setItems((prev: any) => ({ ...prev, [item]: Math.max(0, prev[item] + val) }));
  };
// সার্ভিস সিলেকশন হ্যান্ডেলার (এটি যোগ করুন)
const toggleService = (service: string) => {
  setExtraServices(prev => 
    prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
  );
};
  const handleEstimate = async () => {
    if (!formData.current_location || !formData.destination || !formData.moving_date) return alert("সব তথ্য দিন!");
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{ 
        ...formData, 
        shift_type: shiftType,
        items_json: items,
        extra_services: extraServices,
        sell_old_items: disposalOptions.sell,
        donate_items: disposalOptions.donate,
        estimated_cost: totalEstimate,
        status: 'pending'
      }]);
      if (error) throw error;
      alert("বুকিং সফল হয়েছে! আমাদের টিম আপনার সাথে যোগাযোগ করবে।");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-20 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent" />
      
      <main className="relative z-10 px-6 md:px-[8%] pt-16 grid lg:grid-cols-12 gap-10">
        
        {/* Left Side */}
        <div className="lg:col-span-7 space-y-8">
          <header className="space-y-4">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-fit">
              <button onClick={() => setShiftType('home')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${shiftType === 'home' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}><Home size={14}/>বাসা</button>
              <button onClick={() => setShiftType('office')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${shiftType === 'office' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}><Building2 size={14}/>অফিস</button>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">Pouchhai <span className="text-indigo-500">{shiftType === 'home' ? 'Home' : 'Corporate'}</span></h1>
            <p className="text-slate-400 text-lg">আপনার {shiftType === 'home' ? 'বাসার মালামাল' : 'অফিস ও আইটি ইকুইপমেন্ট'} শিফটিং এখন আরও স্মার্ট।</p>
          </header>

          {/* ডাইনামিক ইনভেন্টরি */}
          <section className="bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 italic"><Truck size={20} className="text-indigo-400"/> মালামালের তালিকা ({shiftType})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(items).map((item) => (
                <div key={item} className="bg-[#0F172A] p-5 rounded-3xl flex justify-between items-center border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div>
                    <p className="capitalize font-bold text-sm tracking-wide">{item.replace('_', ' ')}</p>
                    <p className="text-[10px] text-slate-500 font-sans">Unit: ৳{ITEM_PRICES[shiftType][item]}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl">
                    <button onClick={() => updateItem(item, -1)} className="p-1 hover:bg-white/10 rounded-lg transition"><Minus size={14}/></button>
                    <span className="w-6 text-center font-bold text-indigo-400 font-sans">{items[item]}</span>
                    <button onClick={() => updateItem(item, 1)} className="p-1 hover:bg-white/10 rounded-lg transition"><Plus size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Value Added Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => setDisposalOptions(p => ({...p, sell: !p.sell}))} className={`p-6 rounded-[35px] border cursor-pointer transition-all ${disposalOptions.sell ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <Tag className="mb-3 text-amber-500" size={24} />
              <h4 className="font-bold text-sm mb-1">পুরাতন আইটেম বিক্রি</h4>
              <p className="text-[10px] text-slate-500">আপনার অপ্রয়োজনীয় অফিস বা বাসার মালামাল আমরা কিনে নেব।</p>
            </div>
            <div onClick={() => setDisposalOptions(p => ({...p, donate: !p.donate}))} className={`p-6 rounded-[35px] border cursor-pointer transition-all ${disposalOptions.donate ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <Heart className="mb-3 text-emerald-500" size={24} />
              <h4 className="font-bold text-sm mb-1">মালামাল দান করুন</h4>
              <p className="text-[10px] text-slate-500">অব্যবহৃত ফার্নিচার চ্যারিটিতে দিয়ে মানুষের মুখে হাসি ফুটান।</p>
            </div>
          </div>
        </div>

        {/* Right Side: Price Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#0F172A]/90 backdrop-blur-3xl border border-white/10 p-8 rounded-[48px] sticky top-12 shadow-2xl">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 font-bold font-sans">Estimated Quote</p>
              <h2 className="text-6xl font-black text-white font-sans italic">৳{totalEstimate.toLocaleString()}</h2>
            </div>

            <div className="space-y-4 mb-8">
              <input type="text" placeholder="পিকআপ লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 transition text-sm" onChange={e => setFormData({...formData, current_location: e.target.value})} />
              <input type="text" placeholder="ড্রপ-অফ লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 transition text-sm" onChange={e => setFormData({...formData, destination: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4 font-sans">
                <input type="date" className="bg-white/5 p-4 rounded-2xl border border-white/5 text-xs outline-none" onChange={e => setFormData({...formData, moving_date: e.target.value})} />
                <select className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[10px] outline-none" onChange={e => setFormData({...formData, moving_time: e.target.value})}>
                  <option>সকাল ১০টা - দুপুর ১টা</option>
                  <option>বিকাল ৪টা - সন্ধ্যা ৭টা</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Premium Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(SERVICE_PRICES).map(s => (
                  <button key={s} onClick={() => toggleService(s)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border cursor-pointer ${extraServices.includes(s) ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/30' : 'bg-white/5 border-white/10 text-slate-400'}`}>{s}</button>
                ))}
              </div>
            </div>

            <button onClick={handleEstimate} disabled={loading} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[25px] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 cursor-pointer">
              {loading ? 'প্রসেসিং...' : 'শিফটিং কনফার্ম করুন'}
              <ShieldCheck size={20} />
            </button>

            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-3 items-start">
              <Info size={16} className="text-indigo-400 mt-1 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-relaxed italic">অফিস শিফটিংয়ের ক্ষেত্রে আমাদের স্পেশাল আইটি টিম এবং লেবেলিং সার্ভিস অন্তর্ভুক্ত থাকে।</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home7;