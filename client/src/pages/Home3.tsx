import React, { useState } from 'react';
import { Camera, Upload, Send } from 'lucide-react';

const Home3 = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-8">
      <div className="max-w-2xl w-full bg-white/5 border border-white/10 p-12 rounded-[50px] text-center backdrop-blur-3xl relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 p-6 rounded-full shadow-xl shadow-indigo-600/40">
          <Camera size={40} className="text-white" />
        </div>
        
        <h2 className="text-4xl font-bold mt-8 mb-4">ছবি তুলেই <span className="text-cyan-400">কোটেশন</span> নিন</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">আপনার রুমের মালামালের একটি ছবি বা ভিডিও আপলোড করুন। আমাদের এক্সপার্টরা ১০ মিনিটের মধ্যে আপনাকে এস্টিমেট পাঠিয়ে দেবে।</p>

        <div className="border-2 border-dashed border-white/20 rounded-[32px] p-12 hover:border-indigo-500/50 transition cursor-pointer bg-white/5 group">
          <Upload size={48} className="mx-auto mb-4 text-slate-500 group-hover:text-indigo-400 transition" />
          <p className="font-medium">ক্লিক করে ছবি আপলোড করুন</p>
          <span className="text-xs text-slate-500 mt-2 block">Supports: JPG, PNG, MP4 (Max 50MB)</span>
        </div>

        <div className="mt-8 flex gap-4">
          <input type="text" placeholder="আপনার ফোন নম্বর" className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-indigo-500" />
          <button className="bg-indigo-600 p-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
            পাঠিয়ে দিন <Send size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home3;