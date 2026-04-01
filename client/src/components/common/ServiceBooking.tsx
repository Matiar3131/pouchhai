import React, { useState } from 'react';
import { Truck, Ambulance, Home, Car, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../supabase/supabaseClient';

const ServiceBooking = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const services = [
    { id: 'shifting', title: 'শিফটিং', icon: <Home size={32} />, desc: 'বাসা বা অফিস বদল', color: 'indigo' },
    { id: 'logistics', title: 'লজিস্টিকস', icon: <Truck size={32} />, desc: 'মালামাল পরিবহন', color: 'emerald' },
    { id: 'emergency', title: 'অ্যাম্বুলেন্স', icon: <Ambulance size={32} />, desc: 'জরুরি রোগী সেবা', color: 'red' },
    { id: 'rental', title: 'রেন্টাল', icon: <Car size={32} />, desc: 'গাড়ি বা মাইক্রোবাস', color: 'amber' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tableName = `bookings_${selectedService}`;
    const { error } = await supabase.from(tableName).insert([formData]);

    if (!error) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedService(null);
        setFormData({});
      }, 3000);
    } else {
      alert("বুকিং ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <section className="py-20 px-6 bg-[#020617] text-white font-sans min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">
          আমাদের <span className="text-indigo-500">সেবা সমূহ</span>
        </h2>
        <p className="text-slate-400">আপনার প্রয়োজনীয় সেবাটি নির্বাচন করুন এবং দ্রুত বুকিং নিশ্চিত করুন।</p>
      </div>

      {/* সার্ভিস কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((s) => (
          <div 
            key={s.id}
            onClick={() => setSelectedService(s.id)}
            className="group relative bg-white/5 border border-white/10 p-10 rounded-[40px] cursor-pointer hover:bg-white/10 transition-all duration-500 overflow-hidden"
          >
            <div className={`text-${s.color}-500 mb-6 group-hover:scale-110 transition-transform duration-500`}>{s.icon}</div>
            <h3 className="text-xl font-black uppercase mb-2 tracking-widest">{s.title}</h3>
            <p className="text-xs text-slate-500 font-bold">{s.desc}</p>
            <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="text-indigo-500" />
            </div>
          </div>
        ))}
      </div>

      {/* ডাইনামিক বুকিং ফরম (Modal) */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
          <div className="bg-[#0F172A] border border-white/10 w-full max-w-lg rounded-[40px] p-10 relative shadow-2xl overflow-hidden">
            
            <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white cursor-pointer"><X /></button>

            {isSubmitted ? (
              <div className="text-center py-10 animate-in zoom-in duration-300">
                <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black italic">বুকিং সফল হয়েছে!</h3>
                <p className="text-slate-400 mt-2 text-sm">আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-widest italic flex items-center gap-3">
                  {selectedService} <span className="text-indigo-500">Booking</span>
                </h3>

                {/* লজিক অনুযায়ী আলাদা ইনপুট ফিল্ড */}
                {selectedService === 'logistics' && (
                  <>
                    <input type="text" placeholder="মালামালের ধরণ (যেমন: চালের বস্তা)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, load_type: e.target.value})} />
                    <input type="text" placeholder="গাড়ির ধরণ (পিকআপ/ট্রাক)" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} />
                  </>
                )}

                {selectedService === 'emergency' && (
                  <>
                    <input type="text" placeholder="রোগীর অবস্থা" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, patient_condition: e.target.value})} />
                    <input type="text" placeholder="হাসপাতালের নাম" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, hospital_name: e.target.value})} />
                  </>
                )}

                {/* কমন ফিল্ডস */}
                <input type="text" placeholder="পিকআপ লোকেশন" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, pickup_point: e.target.value || e.target.placeholder})} />
                <input type="tel" placeholder="আপনার ফোন নম্বর" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm" onChange={(e) => setFormData({...formData, contact_number: e.target.value})} />

                <button type="submit" className="w-full bg-indigo-600 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition cursor-pointer">
                  বুকিং নিশ্চিত করুন ➔
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceBooking;