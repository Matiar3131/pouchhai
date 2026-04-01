import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        alert("আপনার ইমেইল চেক করুন (Verification Link পাঠানো হয়েছে)!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/user-dashboard');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-[450px] bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'নতুন অ্যাকাউন্ট' : 'আবার স্বাগতম!'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'আমাদের সাথে আপনার যাত্রা শুরু করুন' : 'আপনার ড্যাশবোর্ডে লগইন করুন'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">নাম</label>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500 transition">
                <User className="text-slate-500" size={20} />
                <input 
                  type="text" placeholder="মাতিয়ার রহমান" 
                  className="bg-transparent border-none outline-none w-full text-white"
                  value={fullName} onChange={(e) => setFullName(e.target.value)} required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">ইমেইল</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500 transition">
              <Mail className="text-slate-500" size={20} />
              <input 
                type="email" placeholder="example@mail.com" 
                className="bg-transparent border-none outline-none w-full text-white"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 ml-1">পাসওয়ার্ড</label>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500 transition">
              <Lock className="text-slate-500" size={20} />
              <input 
                type="password" placeholder="••••••••" 
                className="bg-transparent border-none outline-none w-full text-white"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold text-white transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            {loading ? 'প্রসেসিং...' : isSignUp ? 'সাইনআপ করুন' : 'লগইন করুন'} 
            {!loading && <ArrowRight size={18}/>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'অ্যাকাউন্ট নেই?'} 
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-indigo-400 font-bold hover:underline bg-transparent border-none cursor-pointer"
            >
              {isSignUp ? 'লগইন করুন' : 'নতুন তৈরি করুন'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;