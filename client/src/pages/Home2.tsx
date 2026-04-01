import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2 } from 'lucide-react';

const Home2 = () => {
  const [selectedTier, setSelectedTier] = useState('Standard');

  const tiers = [
    { name: 'Bachelor', price: '৩,৫০০', features: ['১ টন পিকআপ', '২ জন হেল্পার', 'বেসিক র‍্যাপিং'] },
    { name: 'Standard', price: '৭,৫০০', features: ['৩ টন ট্রাক', '৪ জন হেল্পার', 'বাবল র‍্যাপিং', 'কার্টন সার্ভিস'] },
    { name: 'Premium', price: '১২,০০০+', features: ['৫ টন ট্রাক', '৬ জন হেল্পার', 'ফুল প্যাকিং-আনপ্যাকিং', 'এসি/টিভি ফিটিং'] }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-10 px-8 md:px-[8%]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4">পছন্দ করুন আপনার <span className="text-indigo-400">প্যাকেজ</span></h1>
        <p className="text-slate-400">আপনার প্রয়োজন অনুযায়ী সেরা ডিলটি বেছে নিন</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            onClick={() => setSelectedTier(tier.name)}
            className={`cursor-pointer p-8 rounded-[40px] border-2 transition-all ${selectedTier === tier.name ? 'border-indigo-500 bg-indigo-500/10 scale-105' : 'border-white/5 bg-white/5 opacity-60 hover:opacity-100'}`}
          >
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <div className="text-4xl font-black mb-6">৳{tier.price}</div>
            <ul className="space-y-3 mb-8">
              {tier.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-indigo-400"/> {f}</li>)}
            </ul>
            <button className={`w-full py-3 rounded-2xl font-bold ${selectedTier === tier.name ? 'bg-indigo-600' : 'bg-white/10'}`}>সিলেক্ট করুন</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home2;