import React from 'react';
import { Check, Zap, Building2, Home, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "ব্যাচেলর / স্মল",
      icon: <Truck className="text-indigo-400" size={32} />,
      price: "৩,৫০০",
      description: "১টি রুম বা মেসের মালামাল শিফটিংয়ের জন্য পারফেক্ট।",
      features: ["১ টন পিকআপ", "২ জন দক্ষ হেল্পার", "বেসিক র‍্যাপিং সার্ভিস", "২৪/৭ সাপোর্ট"],
      color: "border-white/10"
    },
    {
      name: "ফ্যামিলি / স্ট্যান্ডার্ড",
      icon: <Home className="text-indigo-400" size={32} />,
      price: "৭,৫০০",
      description: "২-৩ বেডরুমের বাসার মালামাল নিরাপদে শিফট করুন।",
      features: ["৩ টন বড় ট্রাক", "৪ জন দক্ষ হেল্পার", "বাবল র‍্যাপিং ও কার্টন", "ফার্নিচার ডিসমান্টলিং", "মালামাল আনপ্যাকিং"],
      popular: true,
      color: "border-indigo-500 shadow-lg shadow-indigo-600/20"
    },
    {
      name: "কর্পোরেট / প্রিমিয়াম",
      icon: <Building2 className="text-indigo-400" size={32} />,
      price: "১৫,০০০+",
      description: "বড় বাসা বা অফিস শিফটিংয়ের জন্য অল-ইন-ওয়ান সলিউশন।",
      features: ["৫ টন বড় কভার্ড ভ্যান", "৬ জন দক্ষ হেল্পার", "প্রিমিয়াম প্যাকিং ম্যাটেরিয়াল", "এসি ও ইলেকট্রনিক্স ফিটিং", "ইনস্যুরেন্স কভারেজ"],
      color: "border-white/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-6 text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black italic">সেরা <span className="text-indigo-400">প্রাইসিং</span> প্ল্যান</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            আপনার প্রয়োজন অনুযায়ী সেরা প্যাকেজটি বেছে নিন। কোনো লুকানো চার্জ নেই।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white/5 backdrop-blur-xl border p-8 rounded-[40px] flex flex-col transition hover:scale-[1.02] ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Zap size={14} fill="currentColor"/> মোস্ট পপুলার
                </div>
              )}
              
              <div className="mb-6">{plan.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black">৳{plan.price}</span>
                <span className="text-slate-500 text-sm">/ শুরু</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow p-0 list-none">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 italic">
                    <Check size={18} className="text-indigo-500" /> {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/v1" 
                className={`w-full py-4 rounded-2xl font-bold text-center no-underline transition ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                বুকিং শুরু করুন
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-[40px] border border-white/5 text-center">
          <h4 className="text-xl font-bold mb-2">কাস্টম রিকোয়েস্ট আছে?</h4>
          <p className="text-slate-400 mb-6 text-sm italic">যদি আপনার মালামাল অনেক বেশি হয় বা বিশেষ কোনো সার্ভিসের প্রয়োজন হয়, আমাদের কল করুন।</p>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition border-none cursor-pointer">
            +880 1XXX-XXXXXX
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;