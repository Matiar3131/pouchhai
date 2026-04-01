import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Truck, Ambulance, Home, Car, RefreshCw } from 'lucide-react';

const AdminSecretPanel = () => {
  const [activeTab, setActiveTab] = useState('shifting'); 
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async (tabName: string) => {
    setLoading(true);
    let tableName = `bookings_${tabName}`;
    const { data: result, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData(activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 font-sans">
      <h1 className="text-3xl font-black italic mb-10 tracking-tighter">POUCHHAI <span className="text-indigo-500">CONTROL CENTER</span></h1>

      {/* Modular Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white/5 p-3 rounded-[30px] border border-white/10 w-fit">
        <TabButton id="shifting" label="Shifting" icon={<Home size={14}/>} activeTab={activeTab} onClick={setActiveTab} />
        <TabButton id="logistics" label="Logistics" icon={<Truck size={14}/>} activeTab={activeTab} onClick={setActiveTab} />
        <TabButton id="emergency" label="Ambulance" icon={<Ambulance size={14}/>} activeTab={activeTab} onClick={setActiveTab} />
        <TabButton id="rental" label="Rental" icon={<Car size={14}/>} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* Dynamic Data Display */}
      <div className="bg-white/5 rounded-[40px] border border-white/10 p-6 backdrop-blur-3xl overflow-x-auto">
        {loading ? (
          <div className="p-20 text-center animate-pulse text-indigo-500 font-black">FETCHING {activeTab.toUpperCase()} DATA...</div>
        ) : (
          <table className="w-full text-left">
             {/* Ekhane activeTab onujayi table row and header logic thakbe */}
             <thead className="text-[10px] uppercase font-black text-slate-500 border-b border-white/10">
                <tr>
                   <th className="p-4">ID & Info</th>
                   <th className="p-4">Route/Details</th>
                   <th className="p-4">Status</th>
                </tr>
             </thead>
             <tbody>
                {data.map(item => (
                   <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4 font-bold text-indigo-300 text-sm">#{item.id.slice(0,8)}</td>
                      <td className="p-4 text-xs text-slate-400">
                         {activeTab === 'shifting' && `${item.current_location} ➔ ${item.destination}`}
                         {activeTab === 'logistics' && `${item.vehicle_type} | ${item.load_type}`}
                         {activeTab === 'emergency' && `${item.patient_condition} | ${item.hospital_name}`}
                         {activeTab === 'rental' && `${item.car_type} | ${item.trip_type}`}
                      </td>
                      <td className="p-4">
                         <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[9px] font-black uppercase">
                            {item.status}
                         </span>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Helper Component for Tabs
const TabButton = ({ id, label, icon, activeTab, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition cursor-pointer ${
      activeTab === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-500 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminSecretPanel;