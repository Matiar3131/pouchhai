import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { ArrowLeft, MapPin, Phone, Calendar, CreditCard, CheckCircle2, Truck, Info, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setBooking(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  // PDF জেনারেট করার ফাংশন
  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: '#020617',
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Pouchhai_Invoice_${booking.id.slice(0, 8)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-indigo-500 font-bold uppercase tracking-widest animate-pulse font-sans">Loading Details...</div>;
  if (!booking) return <div className="text-white font-sans p-20 text-center">বুকিং পাওয়া যায়নি!</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-16 font-sans">
      
      {/* Navigation */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition group cursor-pointer">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Summary */}
        <div className="lg:col-span-8 space-y-8">
          <header className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Truck size={150} /></div>
            <div className="relative z-10">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.shift_type === 'office' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-emerald-600/20 border-emerald-500 text-emerald-400'}`}>
                {booking.shift_type} Shifting
              </span>
              <h1 className="text-4xl font-black mt-4 italic tracking-tighter">Booking ID: <span className="text-indigo-500">#{booking.id.slice(0, 8)}</span></h1>
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2 text-slate-400"><Calendar size={16}/> <span className="text-xs font-bold font-sans">{booking.moving_date}</span></div>
                <div className="flex items-center gap-2 text-slate-400"><Phone size={16}/> <span className="text-xs font-bold font-sans">{booking.phone || '+880 1XXX-XXXXXX'}</span></div>
              </div>
            </div>
          </header>

          {/* Route & Inventory */}
          <section className="bg-white/5 border border-white/10 p-8 rounded-[40px] grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-dashed border-indigo-500/30 py-2">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Pickup From</p>
                <h3 className="font-bold text-lg mt-1">{booking.current_location}</h3>
              </div>
              <div className="relative pl-8 py-2">
                <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Destination</p>
                <h3 className="font-bold text-lg mt-1">{booking.destination}</h3>
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <h4 className="text-xs font-black uppercase text-slate-500 mb-4 tracking-widest">Inventory List</h4>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(booking.items_json || {}).map(([key, val]: any) => (
                        val > 0 && (
                            <div key={key} className="flex justify-between items-center bg-[#020617] p-3 rounded-xl border border-white/5">
                                <span className="capitalize text-[11px] font-bold text-indigo-300">{key.replace(/_/g, ' ')}</span>
                                <span className="font-sans font-black text-indigo-500">x{val}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
          </section>
        </div>

        {/* Right Side: Payment & Invoice */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-indigo-600 p-8 rounded-[40px] shadow-2xl shadow-indigo-600/20">
              <div className="flex justify-between items-start mb-6">
                <CreditCard size={32} />
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full font-sans">Invoice Summary</span>
              </div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Total Amount</p>
              <h2 className="text-5xl font-black italic font-sans mt-2">৳{booking.estimated_cost?.toLocaleString()}</h2>
              
              <button 
                onClick={handleDownloadInvoice}
                disabled={isGenerating}
                className="w-full mt-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : <>Download Invoice PDF <Download size={16}/></>}
              </button>
           </div>

           <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
              <h4 className="text-xs font-black uppercase text-slate-500 mb-6 tracking-widest flex items-center gap-2">
                <Info size={14} /> Additional Services
              </h4>
              <div className="space-y-3">
                {booking.extra_services?.map((s: string) => (
                    <div key={s} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase">{s}</span>
                    </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* --- Hidden Invoice Template for PDF Generation --- */}
      <div className="absolute -left-[9999px] top-0">
        <div ref={invoiceRef} className="w-[800px] p-16 bg-[#020617] text-white font-sans border-4 border-indigo-600/20">
          <div className="flex justify-between items-start border-b border-white/10 pb-10 mb-10">
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter text-white">POUCHHAI<span className="text-indigo-500">.</span></h1>
              <p className="text-slate-400 mt-2 text-sm">Your Trusted Shifting Partner</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-black uppercase tracking-widest text-indigo-500">Invoice</h2>
              <p className="text-slate-500 mt-1">#{booking.id.slice(0, 8)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20 mb-16">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Customer Detail</p>
              <p className="text-lg font-bold">{booking.current_location}</p>
              <p className="text-slate-400 text-sm mt-1">Phone: {booking.phone || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Moving Details</p>
              <p className="text-sm font-bold">Date: {booking.moving_date}</p>
              <p className="text-sm text-slate-400">Target: {booking.destination}</p>
            </div>
          </div>

          <table className="w-full mb-16">
            <thead className="border-b border-white/10 text-left">
              <tr>
                <th className="py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Service Description</th>
                <th className="py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-6">
                  <p className="font-bold text-lg">{booking.shift_type.toUpperCase()} SHIFTING</p>
                  <p className="text-xs text-slate-500 mt-1">Comprehensive logistics and equipment handling</p>
                </td>
                <td className="py-6 text-right font-black text-2xl text-indigo-400 font-sans">৳{booking.estimated_cost?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
            <p className="text-sm text-slate-400 italic">"Thank you for choosing Pouchhai. We ensure a smooth and safe move for your legacy."</p>
            <div className="mt-6 flex justify-center gap-10 opacity-50 grayscale">
               <span className="text-[10px] font-bold uppercase tracking-tighter">Verified Logistics</span>
               <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Move</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;