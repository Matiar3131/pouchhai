import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Truck, CheckCircle, Clock, Trash2, LayoutDashboard, LogOut } from 'lucide-react';

interface Booking {
  id: string;
  created_at: string;
  origin: string;
  destination: string;
  floor: string;
  has_lift: boolean;
  estimated_cost: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. সুপাবেস থেকে ডাটা ফেচ করা
  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error.message);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ২. স্ট্যাটাস আপডেট করা (যেমন: Pending -> Completed)
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) fetchBookings();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex">
      
      {/* Sidebar Section */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Truck className="text-indigo-500" />
          <span>Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-indigo-600/20 text-indigo-400 rounded-xl cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 p-3 opacity-50 hover:opacity-100 transition cursor-pointer">
            <LogOut size={20} /> Logout
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">বুকিং ম্যানেজমেন্ট</h1>
          <button 
            onClick={fetchBookings}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
          >
            Refresh Data
          </button>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
            <p className="opacity-50 text-sm">মোট বুকিং</p>
            <h2 className="text-3xl font-bold">{bookings.length}</h2>
          </div>
          <div className="bg-emerald-600/10 p-6 rounded-3xl border border-emerald-500/20 backdrop-blur-md">
            <p className="text-emerald-400 text-sm">কমপ্লিট হয়েছে</p>
            <h2 className="text-3xl font-bold text-emerald-500">
              {bookings.filter(b => b.status === 'completed').length}
            </h2>
          </div>
          <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20 backdrop-blur-md">
            <p className="text-indigo-400 text-sm">মোট রেভিনিউ</p>
            <h2 className="text-3xl font-bold text-indigo-500">
              ৳ {bookings.reduce((sum, b) => sum + (Number(b.estimated_cost) || 0), 0)}
            </h2>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white/5 rounded-[30px] border border-white/10 overflow-hidden backdrop-blur-2xl">
          {loading ? (
            <div className="p-20 text-center opacity-50 italic">Loading bookings...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider opacity-50">
                <tr>
                  <th className="p-5">Location (From - To)</th>
                  <th className="p-5">Details</th>
                  <th className="p-5">Cost</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-5">
                      <div className="text-sm font-medium">{booking.origin}</div>
                      <div className="text-xs opacity-40">to {booking.destination}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-xs">Floor: {booking.floor} | Lift: {booking.has_lift ? 'Yes' : 'No'}</div>
                    </td>
                    <td className="p-5 font-bold text-indigo-400">৳ {booking.estimated_cost}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        booking.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {booking.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-5 flex gap-2">
                      {booking.status !== 'completed' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition"
                          title="Mark as Completed"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="p-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;