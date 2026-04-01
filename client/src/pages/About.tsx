import React from 'react';
import { ShieldCheck, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-8 md:px-[8%] text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pouchhai</h1>
          <p className="text-slate-400 text-lg">আমরা শুধু মালামাল নয়, আপনার ভরসা পৌঁছাই।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <Target className="mx-auto text-indigo-400 mb-4" size={40} />
            <h3 className="font-bold mb-2">লক্ষ্য</h3>
            <p className="text-sm text-slate-500">বাংলাদেশের শিফটিং ইন্ডাস্ট্রিকে ডিজিটাল এবং স্মার্ট করা।</p>
          </div>
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <ShieldCheck className="mx-auto text-emerald-400 mb-4" size={40} />
            <h3 className="font-bold mb-2">নিরাপত্তা</h3>
            <p className="text-sm text-slate-500">আপনার প্রতিটি মালামালের ১০০% সুরক্ষা নিশ্চিত করা আমাদের দায়িত্ব।</p>
          </div>
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <Users className="mx-auto text-cyan-400 mb-4" size={40} />
            <h3 className="font-bold mb-2">টিম</h3>
            <p className="text-sm text-slate-500">দক্ষ এবং অভিজ্ঞ লোকবল নিয়ে আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;