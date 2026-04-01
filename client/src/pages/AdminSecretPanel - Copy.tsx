import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Database, RefreshCw, Clock, Package, Truck, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // ইমপোর্ট নিশ্চিত করুন

const AdminSecretPanel = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, newStatus: string, newStep: number) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus, current_step: newStep })
      .eq('id', id);

    if (error) alert("আপডেট ব্যর্থ হয়েছে!");
    else fetchBookings();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
            <Database className="text-indigo-500" size={32} />
            POUCHHAI <span className="text-indigo-500">HQ</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-sans">Corporate Logistics Management Control.</p>
        </div>
        <button 
          onClick={fetchBookings} 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-bold transition shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer text-sm"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 font-sans">
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px]">
          <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Total Orders</p>
          <h3 className="text-3xl font-black">{bookings.length}</h3>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[32px]">
          <p className="text-[10px] text-emerald-500 uppercase font-black mb-2 tracking-widest">Delivered</p>
          <h3 className="text-3xl font-black text-emerald-500">{bookings.filter(b => b.current_step === 4).length}</h3>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-[32px]">
          <p className="text-[10px] text-amber-500 uppercase font-black mb-2 tracking-widest">In Transit</p>
          <h3 className="text-3xl font-black text-amber-500">{bookings.filter(b => b.current_step === 3).length}</h3>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-[32px]">
          <p className="text-[10px] text-indigo-500 uppercase font-black mb-2 tracking-widest">Revenue</p>
          <h3 className="text-3xl font-black text-indigo-400 font-sans">৳{bookings.reduce((acc, b) => acc + (b.estimated_cost || 0), 0).toLocaleString()}</h3>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/10">
              <tr>
                <th className="p-6">Client & Location</th>
                <th className="p-6">Shift Type</th>
                <th className="p-6">Inventory Preview</th>
                <th className="p-6">Total Bill</th>
                <th className="p-6">Manage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition duration-300">
                  <td className="p-6">
                    <Link to={`/admin-secret-panel/${b.id}`} className="hover:text-indigo-400 transition no-underline">
                      <div className="font-bold text-sm text-indigo-300">{b.current_location}</div>
                    </Link>
                    <div 
                      className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter cursor-pointer hover:text-white"
                      onClick={() => navigate(`/admin-secret-panel/${b.id}`)}
                    >
                      View Full Detail ➔
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${b.shift_type === 'office' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                      {b.shift_type || 'Home'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="text-[10px] text-slate-400 max-w-[150px] truncate italic">
                      {JSON.stringify(b.items_json)?.replace(/[{}"]/g, '') || 'No items listed'}
                    </div>
                  </td>
                  <td className="p-6 font-black text-indigo-400">
                    ৳{b.estimated_cost?.toLocaleString()}
                  </td>
                  <td className="p-6">
                    <select 
                      value={b.current_step || 1}
                      onChange={(e) => {
                        const step = parseInt(e.target.value);
                        const statusMap: any = { 1: 'Pending', 2: 'Packing', 3: 'Transit', 4: 'Delivered' };
                        updateStatus(b.id, statusMap[step], step);
                      }}
                      className="bg-[#0F172A] border border-white/10 text-[10px] font-black uppercase p-2 rounded-xl outline-none focus:border-indigo-500 transition cursor-pointer"
                    >
                      <option value="1">🕒 Pending</option>
                      <option value="2">📦 Packing</option>
                      <option value="3">🚚 Transit</option>
                      <option value="4">✅ Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSecretPanel;