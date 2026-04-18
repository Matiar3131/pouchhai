import React, { useEffect, useState } from 'react';
import { 
  Truck, Minus, Plus, Calendar, ShieldCheck, Tag, Heart, 
  Building2, Home, Ambulance, Car, ArrowRight, X, CheckCircle2, Clock 
} from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home8 = () => {
  const [loading, setLoading] = useState(false);
  const [activeService, setActiveService] = useState<'shifting' | 'logistics' | 'emergency' | 'rental'>('shifting');
  const [shiftType, setShiftType] = useState<'home' | 'office'>('home');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const serviceCards = [
    { id: 'shifting', title: 'শিফটিং', icon: <Home size={18} />, color: 'indigo' },
    { id: 'logistics', title: 'লজিস্টিকস', icon: <Truck size={18} />, color: 'emerald' },
    { id: 'emergency', title: 'অ্যাম্বুলেন্স', icon: <Ambulance size={18} />, color: 'red' },
    { id: 'rental', title: 'রেন্টাল', icon: <Car size={18} />, color: 'amber' },
  ];

  useEffect(() => {
    const newItems = shiftType === 'home' 
      ? { bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 }
      : { workstation: 0, server_rack: 0, office_chair: 0, conference_table: 0, file_cabinet: 0 };
    setItems(newItems);
  }, [shiftType]);

  useEffect(() => {
    let itemCost = Object.keys(items).reduce((sum, key) => sum + (items[key] * (ITEM_PRICES[shiftType][key] || 0)), 0);
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
      const tableName = `bookings_${activeService}`;
      const payload = {
        ...formData,
        shift_type: activeService === 'shifting' ? shiftType : null,
        items_json: activeService === 'shifting' ? items : null,
        extra_services: activeService === 'shifting' ? extraServices : null,
        estimated_cost: activeService === 'shifting' ? totalEstimate : 0,
        status: 'pending'
      };
      const { error } = await supabase.from(tableName).insert([payload]);
      if (error) throw error;
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setActiveService('shifting'); }, 3000);
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-10">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Compact Header & Service Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/5 pb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">
              POUCHHAI <span className="text-indigo-500">Logistics</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mt-1">Smart Moving Solutions</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
            {serviceCards.map((s) => (
              <button 
                key={s.id}
                onClick={() => { setActiveService(s.id as any); setIsSubmitted(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeService === s.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>
        </div>

        {isSubmitted ? (
          <div className="max-w-md mx-auto text-center py-20 animate-in zoom-in duration-500">
            <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
            <h3 className="text-3xl font-black italic uppercase">বুকিং সফল হয়েছে!</h3>
            <p className="text-slate-400 mt-3">আমাদের প্রতিনিধি খুব শীঘ্রই আপনার ফোনে কল করবেন।</p>
          </div>
        ) : (
          <>
            {activeService === 'shifting' ? (
              <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                
                {/* Left: Inventory Section */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-6 rounded-[32px] border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                      <Tag size={18} className="text-indigo-400" /> Select Items
                    </h3>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                      <button onClick={() => setShiftType('home')} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${shiftType === 'home' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Home</button>
                      <button onClick={() => setShiftType('office')} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${shiftType === 'office' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Office</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(items).map((item) => (
                      <div key={item} className="bg-white/5 p-5 rounded-[28px] border border-white/5 hover:border-indigo-500/20 transition-all flex justify-between items-center group">
                        <div>
                          <p className="capitalize font-black text-xs tracking-wide mb-1">{item.replace('_', ' ')}</p>
                          <p className="text-[10px] text-slate-500 font-sans tracking-tighter">৳{ITEM_PRICES[shiftType][item]}/unit</p>
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-xl border border-white/5">
                          <button onClick={() => updateItem(item, -1)} className="p-1 hover:bg-white/10 text-slate-400"><Minus size={14}/></button>
                          <span className="w-5 text-center font-black text-indigo-400 text-sm">{items[item]}</span>
                          <button onClick={() => updateItem(item, 1)} className="p-1 hover:bg-white/10 text-indigo-400"><Plus size={14}/></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div onClick={() => setDisposalOptions(p => ({...p, sell: !p.sell}))} className={`p-5 rounded-[28px] border cursor-pointer transition-all ${disposalOptions.sell ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/10'}`}>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-amber-500 mb-1">Sell Old Items</h4>
                      <p className="text-[9px] text-slate-500">অপ্রয়োজনীয় মালামাল আমরা কিনে নেব</p>
                    </div>
                    <div onClick={() => setDisposalOptions(p => ({...p, donate: !p.donate}))} className={`p-5 rounded-[28px] border cursor-pointer transition-all ${disposalOptions.donate ? 'bg-emerald-500/10 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-emerald-500 mb-1">Donate Items</h4>
                      <p className="text-[9px] text-slate-500">অব্যবহৃত জিনিস চ্যারিটিতে দিন</p>
                    </div>
                  </div>
                </div>

                {/* Right: Summary & Form */}
                <div className="lg:col-span-5">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] sticky top-8 shadow-2xl backdrop-blur-md">
                    <div className="text-center mb-8 border-b border-white/5 pb-8">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-2">Estimated Amount</span>
                      <h2 className="text-5xl font-black italic">৳{totalEstimate.toLocaleString()}</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="grid gap-3">
                        <input type="text" placeholder="পিকআপ লোকেশন" className="w-full bg-black/20 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 text-xs" onChange={e => setFormData({...formData, current_location: e.target.value})} />
                        <input type="text" placeholder="ড্রপ-অফ লোকেশন" className="w-full bg-black/20 p-4 rounded-2xl border border-white/5 outline-none focus:border-indigo-500 text-xs" onChange={e => setFormData({...formData, destination: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                           <Calendar size={14} className="absolute left-4 top-4 text-slate-500" />
                           <input type="date" className="w-full bg-black/20 p-4 pl-10 rounded-2xl border border-white/5 text-[10px] outline-none font-bold" onChange={e => setFormData({...formData, moving_date: e.target.value})} />
                        </div>
                        <div className="relative">
                           <Clock size={14} className="absolute left-4 top-4 text-slate-500" />
                           <select className="w-full bg-black/20 p-4 pl-10 rounded-2xl border border-white/5 text-[10px] outline-none font-bold appearance-none" onChange={e => setFormData({...formData, moving_time: e.target.value})}>
                              <option>সকাল ১০টা - ১টা</option>
                              <option>বিকাল ৪টা - ৭টা</option>
                           </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-4 tracking-widest">Premium Add-ons</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(SERVICE_PRICES).map(s => (
                          <button key={s} onClick={() => toggleService(s)} className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase transition-all border ${extraServices.includes(s) ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}>{s}</button>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleBookingSubmit} disabled={loading} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                      {loading ? 'প্রসেসিং...' : 'শিফটিং কনফার্ম করুন'} <ShieldCheck size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Other Services Form (Logistics, Emergency, Rental) */
              <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
                <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl">
                  <h3 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4">
                    {activeService} <span className="text-indigo-500">Request</span>
                  </h3>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    {activeService === 'logistics' && (
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="মালামালের ধরণ" required className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-emerald-500 transition" onChange={(e) => setFormData({...formData, load_type: e.target.value})} />
                        <input type="text" placeholder="গাড়ির ধরণ" required className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-emerald-500 transition" onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} />
                      </div>
                    )}
                    {activeService === 'emergency' && (
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="রোগীর অবস্থা" required className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-red-500 transition" onChange={(e) => setFormData({...formData, patient_condition: e.target.value})} />
                        <input type="text" placeholder="হাসপাতালের নাম" required className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-red-500 transition" onChange={(e) => setFormData({...formData, hospital_name: e.target.value})} />
                      </div>
                    )}
                    {activeService === 'rental' && (
                      <div className="grid grid-cols-2 gap-4">
                        <select className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none font-bold" onChange={(e) => setFormData({...formData, car_type: e.target.value})}>
                          <option>হাইয়েস মাইক্রোবাস</option>
                          <option>নোয়া (Noah)</option>
                          <option>সেডান কার</option>
                        </select>
                        <input type="text" placeholder="ভ্রমণের ধরণ" required className="bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-amber-500 transition" onChange={(e) => setFormData({...formData, trip_type: e.target.value})} />
                      </div>
                    )}

                    <input type="text" placeholder="পিকআপ লোকেশন" required className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-indigo-500 transition" onChange={(e) => setFormData({...formData, pickup_point: e.target.value})} />
                    <input type="tel" placeholder="আপনার ফোন নম্বর" required className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:border-indigo-500 transition" onChange={(e) => setFormData({...formData, contact_number: e.target.value})} />

                    <button type="submit" disabled={loading} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition mt-4">
                      {loading ? 'প্রসেসিং...' : 'বুকিং নিশ্চিত করুন ➔'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home8;