import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Search, MapPin, Truck, Package, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const TrackOrder = () => {
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!searchId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', searchId) // অথবা booking_id যদি আলাদা কলাম থাকে
      .single();

    if (error) alert("দুঃখিত, এই আইডি দিয়ে কোনো বুকিং খুঁজে পাওয়া যায়নি।");
    else setOrder(data);
    setLoading(false);
  };

  const steps = [
    { label: 'Pending', icon: <Clock size={18} />, desc: 'আপনার রিকোয়েস্ট যাচাই করা হচ্ছে' },
    { label: 'Packing', icon: <Package size={18} />, desc: 'মালামাল প্যাকিং শুরু হয়েছে' },
    { label: 'On the Way', icon: <Truck size={18} />, desc: 'ট্রাক গন্তব্যের পথে রয়েছে' },
    { label: 'Delivered', icon: <CheckCircle2 size={18} />, desc: 'সফলভাবে পৌঁছে দেওয়া হয়েছে' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans p-6 md:p-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black italic mb-4">Pouchhai <span className="text-indigo-500">Tracker</span></h1>
          <p className="text-slate-400">আপনার বুকিং আইডি দিয়ে মালামালের অবস্থান জানুন</p>
        </header>

        {/* Search Bar */}
        <div className="bg-white/5 p-2 rounded-[32px] border border-white/10 flex items-center mb-12 shadow-2xl">
          <input 
            type="text" 
            placeholder="আপনার বুকিং আইডি (e.g. 550e8400...)" 
            className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm font-sans"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button 
            onClick={handleTrack}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-3xl font-bold transition flex items-center gap-2 cursor-pointer"
          >
            {loading ? 'খোঁজা হচ্ছে...' : 'Track Now'}
            <Search size={18} />
          </button>
        </div>

        {order && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Steps Progress */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const stepNum = index + 1;
                const isCompleted = (order.current_step || 1) >= stepNum;
                return (
                  <div key={index} className={`p-6 rounded-[32px] border transition-all ${isCompleted ? 'bg-indigo-600/10 border-indigo-500' : 'bg-white/5 border-white/10 opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isCompleted ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-500'}`}>
                      {step.icon}
                    </div>
                    <h4 className="font-bold text-sm mb-1">{step.label}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Order Info Card */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 grid md:grid-cols-2 gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={120} /></div>
               <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4 font-sans">Booking Summary</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-red-500 shrink-0 mt-1" />
                      <div>
                        <p className="text-[10px] text-slate-500">From</p>
                        <p className="text-sm font-bold">{order.current_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <p className="text-[10px] text-slate-500">Destination</p>
                        <p className="text-sm font-bold">{order.destination}</p>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="flex flex-col justify-end items-end text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 font-sans">Payment Amount</p>
                  <h3 className="text-4xl font-black text-indigo-400 font-sans">৳{order.estimated_cost?.toLocaleString()}</h3>
                  <div className="mt-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-indigo-300">
                    Status: {order.status}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;