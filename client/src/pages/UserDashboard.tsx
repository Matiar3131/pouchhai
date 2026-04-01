import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Package, MapPin, Clock, CheckCircle2, Truck } from 'lucide-react';

const UserDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      // এখানে বর্তমানে আমরা সব বুকিং দেখাচ্ছি, 
      // পরে অথেন্টিকেশন থাকলে .eq('user_id', user.id) যোগ করবেন।
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setBookings(data || []);
      setLoading(false);
    };

    fetchUserBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'processing': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-indigo-400 animate-pulse text-xl">আপনার বুকিং ডাটা লোড হচ্ছে...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-8 md:px-[8%] text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-2">আমার <span className="text-indigo-400">বুকিংসমূহ</span></h1>
            <p className="text-slate-400">আপনার শিফটিং রিকোয়েস্টগুলোর বর্তমান অবস্থা এখানে দেখুন।</p>
          </div>
          <div className="bg-indigo-600/10 px-6 py-3 rounded-2xl border border-indigo-500/20 text-indigo-400 font-bold">
            মোট বুকিং: {bookings.length}
          </div>
        </header>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-slate-400">এখনো কোনো বুকিং করা হয়নি।</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] hover:border-indigo-500/30 transition-all backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  
                  {/* Route Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-1 rounded-full text-xs font-bold border uppercase tracking-widest ${getStatusColor(booking.status || 'pending')}`}>
                        {booking.status || 'Pending'}
                      </div>
                      <span className="text-slate-500 text-sm flex items-center gap-1">
                        <Clock size={14}/> {new Date(booking.created_at).toLocaleDateString('bn-BD')}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg"><MapPin size={18} className="text-indigo-400"/></div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-tighter">থেকে</p>
                          <p className="font-medium">{booking.current_location}</p>
                        </div>
                      </div>
                      <Truck className="hidden md:block text-slate-700" size={24} />
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg"><MapPin size={18} className="text-emerald-400"/></div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-tighter">গন্তব্য</p>
                          <p className="font-medium">{booking.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Details Area */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 min-w-[180px]">
                    <h4 className="text-xs text-slate-500 mb-2 uppercase font-bold">আইটেম সামারি</h4>
                    {booking.items_json ? (
                       <div className="text-sm space-y-1">
                          {Object.entries(booking.items_json).map(([key, val]: any) => (
                            val > 0 && <p key={key} className="flex justify-between uppercase text-[10px]">{key}: <span className="text-indigo-400 font-bold">{val}</span></p>
                          ))}
                       </div>
                    ) : <p className="text-xs italic text-slate-600 underline">কোনো লিস্ট নেই</p>}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;