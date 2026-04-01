import React, { useEffect, useState } from 'react';
import { Truck, Minus, Plus, Calendar, ShieldCheck, Info, Tag, Heart, Building2, Home, Ambulance, Car, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home8 = () => {
  const [loading, setLoading] = useState(false);
  const [activeService, setActiveService] = useState<'shifting' | 'logistics' | 'emergency' | 'rental' | null>(null);
  const [shiftType, setShiftType] = useState<'home' | 'office'>('home');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- শিফটিং এর জন্য ডাটা ---
  const ITEM_PRICES: any = {
    home: { bed: 800, sofa: 500, fridge: 1000, tv: 400, box: 150 },
    office: { workstation: 500, server_rack: 3000, office_chair: 200, conference_table: 1500, file_cabinet: 600 }
  };
  const SERVICE_PRICES: any = { 'প্যাকিং': 1500, 'এসি/আইটি ফিটিং': 2500, 'ইলেকট্রিশিয়ান': 1000, 'প্লাম্বার/নেটওয়ার্কিং': 1200, 'ক্লিনিং': 2000 };

  const [items, setItems] = useState<any>({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [disposalOptions, setDisposalOptions] = useState({ sell: false, donate: false });
  const [totalEstimate, setTotalEstimate] = useState(2500);

  const [formData, setFormData] = useState<any>({ 
    current_location: '', 
    destination: '', 
    moving_date: '',
    moving_time: 'সকাল ১০টা - দুপুর ১টা'
  });

  // সার্ভিস কার্ডের তালিকা
  const serviceCards = [
    { id: 'shifting', title: 'শিফটিং', icon: <Home size={28} />, desc: 'বাসা বা অফিস বদল', color: 'indigo' },
    { id: 'logistics', title: 'লজিস্টিকস', icon: <Truck size={28} />, desc: 'মালামাল পরিবহন', color: 'emerald' },
    { id: 'emergency', title: 'অ্যাম্বুলেন্স', icon: <Ambulance size={28} />, desc: 'জরুরি রোগী সেবা', color: 'red' },
    { id: 'rental', title: 'রেন্টাল', icon: <Car size={28} />, desc: 'গাড়ি/মাইক্রোবাস', color: 'amber' },
  ];

  useEffect(() => {
    const newItems = shiftType === 'home' 
      ? { bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 }
      : { workstation: 0, server_rack: 0, office_chair: 0, conference_table: 0, file_cabinet: 0 };
    setItems(newItems);
  }, [shiftType]);

  useEffect(() => {
    let itemCost = Object.keys(items).reduce((sum, key) => sum + (items[key] * ITEM_PRICES[shiftType][key]), 0);
    let serviceCost = extraServices.reduce((sum, name) => sum + (SERVICE_PRICES[name] || 0), 0);
    let baseFare = shiftType === 'home' ? 2500 : 5000;
    setTotalEstimate(baseFare + itemCost + serviceCost);
  }, [items, extraServices, shiftType]);

  const updateItem = (item: string, val: number) => {
    setItems((prev: any) => ({ ...prev, [item]: Math.max(0, prev[item] + val) }));
  };

  const toggleService = (service: string) => {
    setExtraServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const tableName = `bookings_${activeService || 'shifting'}`;
      const payload = activeService === 'shifting' || !activeService ? {
        ...formData,
        shift_type: shiftType,
        items_json: items,
        extra_services: extraServices,
        sell_old_items: disposalOptions.sell,
        donate_items: disposalOptions.donate,
        estimated_cost: totalEstimate,
        status: 'pending'
      } : { ...formData, status: 'pending' };

      const { error } = await supabase.from(tableName).insert([payload]);
      if (error) throw error;
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setActiveService(null);
        setFormData({});
      }, 3000);
    } catch (err: any) { 
      alert(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-20 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-600/15 via-transparent to-transparent" />
      
      <main className="relative z-10 px-6 md:px-[8%] pt-20">
        
        {/* মেইন হেডার */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 uppercase">
            POUCHHAI <span className="text-indigo-500">Logistics</span>
          </h1>
          <p className="text-slate-400 text-lg">আপনার জীবনকে সহজ করতে আমরা নিয়ে এসেছি স্মার্ট ট্রান্সপোর্ট সলিউশন। নিচের তালিকা থেকে আপনার প্রয়োজনীয় সেবাটি বেছে নিন।</p>
        </div>

        {/* ৪টি সার্ভিস কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {serviceCards.map((s) => (
            <div 
              key={s.id}
              onClick={() => { setActiveService(s.id as any); setIsSubmitted(false); }}
              className={`group relative p-8 rounded-[40px] border transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl ${
                activeService === s.id ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`mb-6 transition-transform duration-500 group-hover:scale-110 ${activeService === s.id ? 'text-white' : `text-${s.color}-500`}`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-2">{s.title}</h3>
              <p className={`text-[10px] font-bold ${activeService === s.id ? 'text-white/70' : 'text-slate-500'}`}>{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                বুকিং শুরু করুন <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* ডাইনামিক ইন্টারফেস: যখন কোনো সার্ভিস সিলেক্ট করা নেই বা শিফটিং সিলেক্ট করা */}
        {(activeService === 'shifting' || !activeService) && (
          <div className="grid lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Left Side: Shifting Inventory */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-fit">
                <button onClick={() => setShiftType('home')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${shiftType === 'home' ? 'bg-indigo-600 shadow-lg' : 'text-slate-400'}`}><Home size={14}/>বাসা</button>
                <button onClick={() => setShiftType('office')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${shiftType === 'office' ? 'bg-indigo-600 shadow-lg' : 'text-slate-400'}`}><Building2 size={14}/>অফিস</button>
              </div>
              
              <section className="bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 italic font-sans uppercase tracking-tighter"><Truck size={20} className="text-indigo-400"/> Inventory List ({shiftType})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(items).map((item) => (
                    <div key={item} className="bg-[#0F172A] p-5 rounded-3xl flex justify-between items-center border border-white/5 group hover:border-indigo-500/30 transition-all">
                      <div>
                        <p className="capitalize font-bold text-sm tracking-wide">{item.replace('_', ' ')}</p>
                        <p className="text-[10px] text-slate-500 font-sans italic">Unit: ৳{ITEM_PRICES[shiftType][item]}</p>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl">
                        <button onClick={() => updateItem(item, -1)} className="p-1 hover:bg-white/10 rounded-lg"><Minus size={14}/></button>
                        <span className="w-6 text-center font-bold text-indigo-400 font-sans">{items[item]}</span>
                        <button onClick={() => updateItem(item, 1)} className="p-1 hover:bg-white/10 rounded-lg"><Plus size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onClick={() => setDisposalOptions(p => ({...p, sell: !p.sell}))} className={`p-6 rounded-[35px] border cursor-pointer transition-all ${disposalOptions.sell ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <Tag className="mb-3 text-amber-500" size={24} />
                  <h4 className="font-bold text-sm mb-1 uppercase">পুরাতন মালামাল বিক্রি</h4>
                  <p className="text-[10px] text-slate-500 font-bold">অপ্রয়োজনীয় মালামাল আমরা কিনে নেব।</p>
                </div>
                <div onClick={() => setDisposalOptions(p => ({...p, donate: !p.donate}))} className={`p-6 rounded-[35px] border cursor-pointer transition-all ${disposalOptions.donate ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <Heart className="mb-3 text-emerald-500" size={24} />
                  <h4 className="font-bold text-sm mb-1 uppercase">মালামাল দান করুন</h4>
                  <p className="text-[10px] text-slate-500 font-bold">অব্যবহৃত ফার্নিচার চ্যারিটিতে দিন।</p>
                </div>
              </div>
            </div>

            {/* Right Side: Shifting Quote */}
            <div className="lg:col-span-5">
              <div className="bg-[#0F172A]/90 backdrop-blur-3xl border border-white/10 p-8 rounded-[48px] sticky top-12 shadow-2xl">
                <div className="text-center mb-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 font-black font-sans">Estimated Quote</p>
                  <h2 className="text-6xl font-black text-white font-sans italic">৳{totalEstimate.toLocaleString()}</h2>
                </div>
                <div className="space-y-4 mb-8">
                  <input type="text" placeholder="পিকআপ লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 text-sm" onChange={e => setFormData({...formData, current_location: e.target.value})} />
                  <input type="text" placeholder="ড্রপ-অফ লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 text-sm" onChange={e => setFormData({...formData, destination: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="bg-white/5 p-4 rounded-2xl border border-white/5 text-xs outline-none font-sans" onChange={e => setFormData({...formData, moving_date: e.target.value})} />
                    <select className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[10px] outline-none font-bold" onChange={e => setFormData({...formData, moving_time: e.target.value})}>
                      <option>সকাল ১০টা - দুপুর ১টা</option>
                      <option>বিকাল ৪টা - সন্ধ্যা ৭টা</option>
                    </select>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Premium Add-ons</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(SERVICE_PRICES).map(s => (
                      <button key={s} onClick={() => toggleService(s)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border cursor-pointer ${extraServices.includes(s) ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/30' : 'bg-white/5 border-white/10 text-slate-500'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => handleBookingSubmit()} disabled={loading} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[25px] font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 cursor-pointer">
                  {loading ? 'প্রসেসিং...' : 'শিফটিং কনফার্ম করুন'} <ShieldCheck size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* অন্যান্য সার্ভিসের জন্য মোডাল টাইপ ফরম (Logistics, Emergency, Rental) */}
        {activeService && activeService !== 'shifting' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60 animate-in fade-in duration-300">
            <div className="bg-[#0F172A] border border-white/10 w-full max-w-lg rounded-[48px] p-10 relative shadow-2xl overflow-hidden">
              <button onClick={() => setActiveService(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white cursor-pointer"><X /></button>
              
              {isSubmitted ? (
                <div className="text-center py-10 animate-in zoom-in duration-500">
                  <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">বুকিং সফল হয়েছে!</h3>
                  <p className="text-slate-400 mt-2 text-sm">আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <h3 className="text-3xl font-black uppercase italic flex items-center gap-3 tracking-tighter">
                    {activeService} <span className="text-indigo-500">Service</span>
                  </h3>

                  {activeService === 'logistics' && (
                    <>
                      <input type="text" placeholder="মালামালের ধরণ (যেমন: চালের বস্তা)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500 transition" onChange={(e) => setFormData({...formData, load_type: e.target.value})} />
                      <input type="text" placeholder="গাড়ির ধরণ (পিকআপ/ট্রাক)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500 transition" onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} />
                    </>
                  )}

                  {activeService === 'emergency' && (
                    <>
                      <input type="text" placeholder="রোগীর অবস্থা" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-red-500 transition" onChange={(e) => setFormData({...formData, patient_condition: e.target.value})} />
                      <input type="text" placeholder="হাসপাতালের নাম" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-red-500 transition" onChange={(e) => setFormData({...formData, hospital_name: e.target.value})} />
                    </>
                  )}

                  {activeService === 'rental' && (
                    <>
                      <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none font-bold" onChange={(e) => setFormData({...formData, car_type: e.target.value})}>
                        <option>হাইয়েস মাইক্রোবাস</option>
                        <option>নোয়া (Noah)</option>
                        <option>সেডান কার</option>
                      </select>
                      <input type="text" placeholder="ভ্রমণের ধরণ (যেমন: ফ্যামিলি ট্যুর)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-amber-500 transition" onChange={(e) => setFormData({...formData, trip_type: e.target.value})} />
                    </>
                  )}

                  <input type="text" placeholder="পিকআপ লোকেশন" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-indigo-500 transition" onChange={(e) => setFormData({...formData, pickup_point: e.target.value})} />
                  <input type="tel" placeholder="আপনার ফোন নম্বর" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-indigo-500 transition" onChange={(e) => setFormData({...formData, contact_number: e.target.value})} />

                  <button type="submit" disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition cursor-pointer">
                    {loading ? 'প্রসেসিং...' : 'বুকিং নিশ্চিত করুন ➔'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home8;