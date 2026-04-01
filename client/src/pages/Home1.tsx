import React, { useState } from 'react';
import { Truck, MapPin, ArrowRight, ShieldCheck, Clock, Package, Plus, Minus } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';

const Home1 = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [formData, setFormData] = useState({ current_location: '', destination: '', floor: '১ম তলা', has_lift: 'হ্যাঁ' });

  const updateItem = (item: string, val: number) => {
    setItems(prev => ({ ...prev, [item]: Math.max(0, prev[item as keyof typeof items] + val) }));
  };

  const handleEstimate = async () => {
    if (!formData.current_location || !formData.destination) return alert("লোকেশনে ইনপুট দিন!");
    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([{ ...formData, items_json: items }]);
      if (error) throw error;
      alert("ইনভেন্টরিসহ বুকিং সফল হয়েছে!");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden pb-20">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />
      <main className="relative z-10 px-8 md:px-[8%] pt-16 grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter">স্মার্ট <span className="text-indigo-400">ইনভেন্টরি</span> সিলেকশন</h1>
          <p className="text-slate-400">মালামালের সঠিক সংখ্যা দিন, আমরা দিচ্ছি একদম সঠিক কোটেশন।</p>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(items).map((item) => (
              <div key={item} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="capitalize">{item === 'box' ? 'কার্টন/বক্স' : item}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateItem(item, -1)} className="p-1 bg-white/10 rounded-full hover:bg-white/20"><Minus size={16}/></button>
                  <span className="font-bold text-indigo-400">{items[item as keyof typeof items]}</span>
                  <button onClick={() => updateItem(item, 1)} className="p-1 bg-indigo-600 rounded-full hover:bg-indigo-700"><Plus size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 italic">লোকেশন ডিটেইলস</h3>
          <div className="space-y-4">
            <input type="text" placeholder="বর্তমান লোকেশন" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none" value={formData.current_location} onChange={e => setFormData({...formData, current_location: e.target.value})} />
            <input type="text" placeholder="গন্তব্য" className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 outline-none" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
            <button onClick={handleEstimate} disabled={loading} className="w-full py-4 bg-indigo-600 rounded-2xl font-bold">{loading ? 'প্রসেসিং...' : 'বিস্তারিত খরচ দেখুন'}</button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home1;