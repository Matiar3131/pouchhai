import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Download } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] text-center shadow-2xl relative z-10">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
          <CheckCircle className="text-emerald-400" size={40} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">বুকিং সফল হয়েছে!</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          আপনার রিকোয়েস্টটি আমাদের কাছে পৌঁছেছে। খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
        </p>

        <div className="space-y-4">
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition">
            <Download size={18} /> ইনভয়েস ডাউনলোড করুন
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft size={18} /> হোম পেজে ফিরুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;