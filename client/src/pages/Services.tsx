import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Package, Truck, Shield, Clock } from 'lucide-react'; // আইকনগুলোর জন্য

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*');
      
      if (!error) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading) return <div className="text-white text-center pt-20">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-[#020617] pt-24 px-8 md:px-[8%]">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">আমাদের সার্ভিসসমূহ</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Package className="text-indigo-400" size={30} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.name}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
            <div className="text-indigo-400 font-bold text-xl">
              ৳{service.base_price} থেকে শুরু
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;