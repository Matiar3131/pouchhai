import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Clock, Package, Calendar, MessageSquare, Phone } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom'; // ১. useNavigate ইমপোর্ট করুন

const Home = () => {
  const navigate = useNavigate(); // ২. হুকটি ইনিশিয়ালাইজ করুন
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: '', 
    current_location: '',
    destination: '',
    booking_date: '',
    booking_time: '',
    remarks: ''
  });

  const handleEstimate = async () => {
    if (!formData.phone_number || !formData.current_location || !formData.destination || !formData.booking_date) {
      Swal.fire({
        icon: 'warning',
        title: 'অসম্পূর্ণ তথ্য',
        text: 'দয়া করে মোবাইল নম্বর, লোকেশন এবং তারিখ ইনপুট দিন!',
        confirmButtonColor: '#4f46e5'
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          phone_number: formData.phone_number,
          origin: formData.current_location,
          destination: formData.destination,
          booking_date: formData.booking_date,
          booking_time: formData.booking_time,
          remarks: formData.remarks,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      // ৩. সাকসেস মেসেজ এবং রিডাইরেক্ট লজিক
      Swal.fire({
        icon: 'success',
        title: 'বুকিং সফল হয়েছে!',
        text: 'আমরা আপনার রিকোয়েস্টটি পেয়েছি। ড্যাশবোর্ড থেকে বিস্তারিত দেখুন।',
        confirmButtonColor: '#4f46e5',
        confirmButtonText: 'ড্যাশবোর্ডে যান'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user-dashboard'); // ইউজারকে ড্যাশবোর্ডে পাঠিয়ে দিবে
        }
      });
      
      setFormData({ 
        phone_number: '',
        current_location: '', 
        destination: '', 
        booking_date: '', 
        booking_time: '', 
        remarks: '' 
      });

    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'ভুল হয়েছে',
        text: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden">
      <main className="relative z-10 px-8 md:px-[8%] pt-16 pb-24 grid md:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
           <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            নিশ্চিন্তে গন্তব্যে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">পৌঁছাই</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            আপনার বাসার মূল্যবান মালামাল এখন ডিজিটাল ট্র্যাকিং এবং প্রিমিয়াম প্যাকিংয়ের মাধ্যমে শিফট হবে সব থেকে সহজে।
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">দ্রুত বুক করুন</h3>
          <div className="space-y-4">
            
            {/* মোবাইল নম্বর */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider opacity-50">মোবাইল নম্বর</label>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 focus-within:border-indigo-500 transition">
                <Phone className="text-indigo-400" size={18} />
                <input 
                  type="tel" 
                  placeholder="017XXXXXXXX" 
                  className="bg-transparent border-none outline-none w-full text-white text-sm"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider opacity-50">বর্তমান লোকেশন</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 focus-within:border-indigo-500 transition">
                  <MapPin className="text-indigo-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="বর্তমান ঠিকানা" 
                    className="bg-transparent border-none outline-none w-full text-white text-sm"
                    value={formData.current_location}
                    onChange={(e) => setFormData({...formData, current_location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider opacity-50">গন্তব্য</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 focus-within:border-emerald-500 transition">
                  <MapPin className="text-emerald-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="গন্তব্য ঠিকানা" 
                    className="bg-transparent border-none outline-none w-full text-white text-sm"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider opacity-50">তারিখ</label>
                <input 
                  type="date" 
                  className="bg-white/5 border border-white/5 p-3 rounded-xl w-full text-sm [color-scheme:dark]"
                  value={formData.booking_date}
                  onChange={(e) => setFormData({...formData, booking_date: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider opacity-50">সময়</label>
                <input 
                  type="time" 
                  className="bg-white/5 border border-white/5 p-3 rounded-xl w-full text-sm [color-scheme:dark]"
                  value={formData.booking_time}
                  onChange={(e) => setFormData({...formData, booking_time: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider opacity-50">রিমার্কস (ঐচ্ছিক)</label>
              <textarea 
                placeholder="কি কি মালামাল আছে বা অন্য কিছু..." 
                rows={2}
                className="bg-white/5 border border-white/5 p-3 rounded-xl w-full text-sm resize-none"
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              />
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
              <p className="text-[12px] text-indigo-200">
                বাসার সব কিছুর একটি ভিডিও আমাদের হোয়াটসঅ্যাপে পাঠান। প্রতিনিধি দ্রুত যোগাযোগ করবেন।
              </p>
            </div>

            <button 
              onClick={handleEstimate}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? 'প্রসেসিং...' : 'বুক করুন'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;