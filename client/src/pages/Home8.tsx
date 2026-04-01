import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

/* ─── tiny Windows-style icon SVGs ─── */
const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="5" width="8" height="7" fill="#4080c0" stroke="#000" strokeWidth="0.5"/>
    <polygon points="9,6 13,8 13,12 9,12" fill="#6090d0" stroke="#000" strokeWidth="0.5"/>
    <circle cx="3.5" cy="12.5" r="1.5" fill="#202020"/>
    <circle cx="11" cy="12.5" r="1.5" fill="#202020"/>
    <rect x="2" y="6" width="5" height="3" fill="#a0c8ff"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polygon points="8,2 14,8 14,14 2,14 2,8" fill="#d4a017" stroke="#000" strokeWidth="0.5"/>
    <rect x="6" y="9" width="4" height="5" fill="#8b6914"/>
    <polygon points="8,1 15,8 1,8" fill="#f0c030" stroke="#000" strokeWidth="0.5"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="4" width="12" height="11" fill="#8090a0" stroke="#000" strokeWidth="0.5"/>
    <rect x="4" y="6" width="2" height="2" fill="#c8e0f8"/>
    <rect x="7" y="6" width="2" height="2" fill="#c8e0f8"/>
    <rect x="10" y="6" width="2" height="2" fill="#c8e0f8"/>
    <rect x="4" y="9" width="2" height="2" fill="#c8e0f8"/>
    <rect x="7" y="9" width="2" height="2" fill="#c8e0f8"/>
    <rect x="10" y="9" width="2" height="2" fill="#c8e0f8"/>
    <rect x="6" y="12" width="4" height="3" fill="#604020"/>
    <rect x="2" y="2" width="12" height="2" fill="#6080a0" stroke="#000" strokeWidth="0.5"/>
  </svg>
);

const AmbuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="5" width="10" height="7" fill="#f5f5f5" stroke="#000" strokeWidth="0.5"/>
    <polygon points="11,6 14,8 14,12 11,12" fill="#f5f5f5" stroke="#000" strokeWidth="0.5"/>
    <rect x="4" y="7" width="4" height="0.8" fill="red"/>
    <rect x="5.6" y="5.5" width="0.8" height="4" fill="red"/>
    <circle cx="3.5" cy="12.5" r="1.5" fill="#202020"/>
    <circle cx="11.5" cy="12.5" r="1.5" fill="#202020"/>
    <rect x="11" y="4" width="1.5" height="1.5" fill="#ff0" stroke="orange" strokeWidth="0.3"/>
  </svg>
);

const CarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="7" width="12" height="5" fill="#c03820" stroke="#000" strokeWidth="0.5"/>
    <polygon points="4,7 5,4 11,4 12,7" fill="#e04030" stroke="#000" strokeWidth="0.5"/>
    <rect x="5" y="4.5" width="2.5" height="2" fill="#90c8f0"/>
    <rect x="8.5" y="4.5" width="2.5" height="2" fill="#90c8f0"/>
    <circle cx="4.5" cy="12.5" r="1.5" fill="#202020"/>
    <circle cx="11.5" cy="12.5" r="1.5" fill="#202020"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polygon points="8,1 14,4 14,10 8,15 2,10 2,4" fill="#004080" stroke="#000" strokeWidth="0.5"/>
    <polyline points="5,8 7,10 11,6" stroke="#fff" strokeWidth="1.5" fill="none"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" fill="#f5f5f5" stroke="#000" strokeWidth="0.8"/>
    <line x1="8" y1="8" x2="8" y2="3.5" stroke="#000" strokeWidth="1.2"/>
    <line x1="8" y1="8" x2="11" y2="8" stroke="#000" strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="1" fill="#000"/>
  </svg>
);

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="6" width="12" height="8" fill="#c08040" stroke="#000" strokeWidth="0.5"/>
    <polygon points="2,6 8,2 14,6" fill="#d09050" stroke="#000" strokeWidth="0.5"/>
    <line x1="8" y1="6" x2="8" y2="14" stroke="#000" strokeWidth="0.5"/>
    <rect x="5.5" y="7" width="5" height="1.5" fill="#e0b070"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polygon points="2,2 9,2 14,8 9,14 2,14" fill="#f0d020" stroke="#000" strokeWidth="0.5"/>
    <circle cx="5" cy="5" r="1.2" fill="#000"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13 C8 13 2 9 2 5.5 C2 3.5 3.5 2 5.5 2 C6.5 2 7.5 2.5 8 3.5 C8.5 2.5 9.5 2 10.5 2 C12.5 2 14 3.5 14 5.5 C14 9 8 13 8 13Z" fill="#e02020" stroke="#000" strokeWidth="0.5"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <line x1="2" y1="6" x2="10" y2="6" stroke="#000" strokeWidth="1.5"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <line x1="6" y1="2" x2="6" y2="10" stroke="#000" strokeWidth="1.5"/>
    <line x1="2" y1="6" x2="10" y2="6" stroke="#000" strokeWidth="1.5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#00aa00" stroke="#006600" strokeWidth="2"/>
    <polyline points="12,24 20,32 36,16" stroke="#fff" strokeWidth="3" fill="none"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" fill="#ee0000" stroke="#990000" strokeWidth="1"/>
    <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="serif">✕</text>
  </svg>
);

/* ─── Win2K style dialog / message box overlay ─── */
const WinDialog = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div
    style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    <div className="win-panel" style={{ minWidth: 320, maxWidth: 480, boxShadow: '4px 4px 10px rgba(0,0,0,0.5)' }}>
      <div className="win-titlebar">
        <span>🖥️ {title}</span>
        <button className="win-titlebar-btn" onClick={onClose}>✕</button>
      </div>
      <div style={{ padding: '16px 16px 12px', fontFamily: 'Tahoma, Arial, sans-serif', fontSize: '11px' }}>
        {children}
      </div>
    </div>
  </div>
);

/* ─── Main Component ─── */
const Home8 = () => {
  const [loading, setLoading] = useState(false);
  const [activeService, setActiveService] = useState<'shifting' | 'logistics' | 'emergency' | 'rental' | null>(null);
  const [shiftType, setShiftType] = useState<'home' | 'office'>('home');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dialogMsg, setDialogMsg] = useState<string | null>(null);

  const ITEM_PRICES: Record<string, Record<string, number>> = {
    home: { bed: 800, sofa: 500, fridge: 1000, tv: 400, box: 150 },
    office: { workstation: 500, server_rack: 3000, office_chair: 200, conference_table: 1500, file_cabinet: 600 },
  };
  const SERVICE_PRICES: Record<string, number> = {
    'প্যাকিং': 1500, 'এসি/আইটি ফিটিং': 2500, 'ইলেকট্রিশিয়ান': 1000, 'প্লাম্বার/নেটওয়ার্কিং': 1200, 'ক্লিনিং': 2000,
  };

  const [items, setItems] = useState<Record<string, number>>({ bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 });
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [disposalOptions, setDisposalOptions] = useState({ sell: false, donate: false });
  const [totalEstimate, setTotalEstimate] = useState(2500);
  const [formData, setFormData] = useState<Record<string, string>>({
    current_location: '', destination: '', moving_date: '', moving_time: 'সকাল ১০টা - দুপুর ১টা',
  });

  const serviceCards = [
    { id: 'shifting', title: 'শিফটিং', icon: <HomeIcon />, desc: 'বাসা বা অফিস বদল', letter: '🏠' },
    { id: 'logistics', title: 'লজিস্টিকস', icon: <TruckIcon />, desc: 'মালামাল পরিবহন', letter: '🚛' },
    { id: 'emergency', title: 'অ্যাম্বুলেন্স', icon: <AmbuIcon />, desc: 'জরুরি রোগী সেবা', letter: '🚑' },
    { id: 'rental', title: 'রেন্টাল', icon: <CarIcon />, desc: 'গাড়ি/মাইক্রোবাস', letter: '🚗' },
  ];

  useEffect(() => {
    const newItems = shiftType === 'home'
      ? { bed: 0, sofa: 0, fridge: 0, tv: 0, box: 0 }
      : { workstation: 0, server_rack: 0, office_chair: 0, conference_table: 0, file_cabinet: 0 };
    setItems(newItems);
  }, [shiftType]);

  useEffect(() => {
    const itemCost = Object.keys(items).reduce((s, k) => s + items[k] * (ITEM_PRICES[shiftType][k] || 0), 0);
    const serviceCost = extraServices.reduce((s, n) => s + (SERVICE_PRICES[n] || 0), 0);
    setTotalEstimate((shiftType === 'home' ? 2500 : 5000) + itemCost + serviceCost);
  }, [items, extraServices, shiftType]);

  const updateItem = (item: string, val: number) =>
    setItems((prev) => ({ ...prev, [item]: Math.max(0, prev[item] + val) }));

  const toggleService = (s: string) =>
    setExtraServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const tableName = `bookings_${activeService || 'shifting'}`;
      const payload = (activeService === 'shifting' || !activeService)
        ? { ...formData, shift_type: shiftType, items_json: items, extra_services: extraServices, sell_old_items: disposalOptions.sell, donate_items: disposalOptions.donate, estimated_cost: totalEstimate, status: 'pending' }
        : { ...formData, status: 'pending' };
      const { error } = await supabase.from(tableName).insert([payload]);
      if (error) throw error;
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setActiveService(null); setFormData({}); }, 3000);
    } catch (err: any) {
      setDialogMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── Win2K label ── */
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ fontFamily: 'Tahoma, Arial, sans-serif', fontSize: '11px', display: 'block', marginBottom: 2 }}>
      {children}
    </label>
  );

  /* ── Item counter row ── */
  const ItemRow = ({ item, price }: { item: string; price: number }) => (
    <div
      className="win-inset"
      style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', marginBottom: 4 }}
    >
      <span style={{ fontSize: '11px', textTransform: 'capitalize' }}>
        <BoxIcon /> {item.replace('_', ' ')}
      </span>
      <span style={{ fontSize: '10px', color: '#666' }}>৳{price}/unit</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button className="win-btn" style={{ padding: '0 4px', minWidth: 20, height: 20 }} onClick={() => updateItem(item, -1)}>
          <MinusIcon />
        </button>
        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 'bold', color: '#000080' }}>{items[item]}</span>
        <button className="win-btn" style={{ padding: '0 4px', minWidth: 20, height: 20 }} onClick={() => updateItem(item, 1)}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#3a6ea5', minHeight: '100vh', padding: '12px', fontFamily: 'Tahoma, Arial, sans-serif' }}>

      {/* ── Error Dialog ── */}
      {dialogMsg && (
        <WinDialog title="Error" onClose={() => setDialogMsg(null)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <ErrorIcon />
            <p style={{ margin: 0, fontSize: '11px' }}>{dialogMsg}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="win-btn win-btn-default" onClick={() => setDialogMsg(null)}>OK</button>
          </div>
        </WinDialog>
      )}

      {/* ── Success Dialog ── */}
      {isSubmitted && (
        <WinDialog title="Booking Confirmed" onClose={() => { setIsSubmitted(false); setActiveService(null); }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <CheckIcon />
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold', fontSize: '12px' }}>বুকিং সফল হয়েছে!</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#444' }}>আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button className="win-btn win-btn-default" onClick={() => { setIsSubmitted(false); setActiveService(null); }}>OK</button>
          </div>
        </WinDialog>
      )}

      {/* ── Main Window ── */}
      <div className="win-panel" style={{ maxWidth: 1100, margin: '0 auto', boxShadow: '4px 4px 12px rgba(0,0,0,0.6)' }}>

        {/* Title Bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TruckIcon />
            <span>Pouchhai Logistics - Service Booking Portal v2.0</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            <span className="win-titlebar-btn">_</span>
            <span className="win-titlebar-btn">□</span>
            <span className="win-titlebar-btn" style={{ fontWeight: 'bold' }}>✕</span>
          </div>
        </div>

        {/* Marquee ticker */}
        <div
          style={{
            background: '#000080', color: '#fff', padding: '2px 0', fontSize: '11px',
            borderTop: '1px solid #4040a0', borderBottom: '1px solid #000040',
          }}
          className="win-marquee"
        >
          <span>
            🚛 Pouchhai Logistics — বাংলাদেশের সেরা শিফটিং সার্ভিস! 📦 বিশ্বস্ত প্যাকিং ও ট্র্যাকিং সেবা 🛡️ ১০০% নিরাপত্তার নিশ্চয়তা সহ ✅ আজই বুক করুন!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>

        {/* Content Area */}
        <div style={{ padding: 12, background: '#d4d0c8' }}>

          {/* ── Heading as dialog header ── */}
          <div style={{ marginBottom: 12 }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: 'top', width: 48 }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="2" y="14" width="28" height="22" fill="#4080c0" stroke="#000"/>
                      <polygon points="30,17 42,23 42,36 30,36" fill="#6090d0" stroke="#000"/>
                      <circle cx="10" cy="37" r="4.5" fill="#202020"/>
                      <circle cx="34" cy="37" r="4.5" fill="#202020"/>
                      <rect x="5" y="17" width="16" height="9" fill="#a0c8ff"/>
                      <rect x="4" y="10" width="8" height="4" fill="#f0c030"/>
                    </svg>
                  </td>
                  <td style={{ paddingLeft: 12, verticalAlign: 'middle' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                      POUCHHAI Logistics
                    </div>
                    <div style={{ fontSize: '11px', color: '#444', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                      আপনার জীবনকে সহজ করতে আমরা নিয়ে এসেছি স্মার্ট ট্রান্সপোর্ট সলিউশন।
                      নিচের তালিকা থেকে আপনার প্রয়োজনীয় সেবাটি বেছে নিন।
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="win-separator" style={{ margin: '8px 0' }} />

          {/* ── 4 Service Buttons ── */}
          <div
            className="win-groupbox"
            style={{ position: 'relative', border: '1px solid #808080', padding: '16px 10px 10px', marginBottom: 12 }}
          >
            <span className="win-groupbox-label">আপনার সার্ভিস বেছে নিন</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {serviceCards.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveService(s.id as any); setIsSubmitted(false); }}
                  style={{
                    background: activeService === s.id ? '#000080' : '#d4d0c8',
                    color: activeService === s.id ? '#fff' : '#000',
                    fontFamily: 'Tahoma, Arial, sans-serif',
                    fontSize: '11px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    borderTop: activeService === s.id ? '2px solid #000040' : '2px solid #fff',
                    borderLeft: activeService === s.id ? '2px solid #000040' : '2px solid #fff',
                    borderRight: activeService === s.id ? '2px solid #fff' : '2px solid #606060',
                    borderBottom: activeService === s.id ? '2px solid #fff' : '2px solid #606060',
                    outline: activeService === s.id ? '1px dotted #fff' : 'none',
                    outlineOffset: -3,
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: 4 }}>{s.letter}</div>
                  <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: '10px', opacity: 0.8 }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Shifting / Default Panel ── */}
          {(activeService === 'shifting' || !activeService) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12 }}>

              {/* Left: Inventory */}
              <div>
                {/* Tab control: home/office */}
                <div style={{ display: 'flex', borderBottom: '1px solid #808080', marginBottom: -1 }}>
                  <button
                    className={`win-tab ${shiftType === 'home' ? 'active' : ''}`}
                    onClick={() => setShiftType('home')}
                    style={{
                      background: shiftType === 'home' ? '#d4d0c8' : '#b8b4ac',
                      fontWeight: shiftType === 'home' ? 'bold' : 'normal',
                      borderBottom: shiftType === 'home' ? '1px solid #d4d0c8' : '1px solid #808080',
                    }}
                  >
                    🏠 বাসা শিফটিং
                  </button>
                  <button
                    className={`win-tab ${shiftType === 'office' ? 'active' : ''}`}
                    onClick={() => setShiftType('office')}
                    style={{
                      background: shiftType === 'office' ? '#d4d0c8' : '#b8b4ac',
                      fontWeight: shiftType === 'office' ? 'bold' : 'normal',
                      borderBottom: shiftType === 'office' ? '1px solid #d4d0c8' : '1px solid #808080',
                    }}
                  >
                    🏢 অফিস শিফটিং
                  </button>
                </div>

                <div className="win-tab-body" style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TruckIcon /> Inventory List ({shiftType === 'home' ? 'Residential' : 'Office'})
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {Object.keys(items).map((item) => (
                      <ItemRow key={item} item={item} price={ITEM_PRICES[shiftType][item]} />
                    ))}
                  </div>
                </div>

                {/* Disposal options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div
                    className="win-inset"
                    onClick={() => setDisposalOptions((p) => ({ ...p, sell: !p.sell }))}
                    style={{
                      background: disposalOptions.sell ? '#ffffc0' : '#fff',
                      padding: '8px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <input type="checkbox" className="win-checkbox" checked={disposalOptions.sell} readOnly />
                      <span style={{ fontWeight: 'bold', fontSize: '11px', display: 'flex', gap: 4, alignItems: 'center' }}>
                        <TagIcon /> পুরাতন মালামাল বিক্রি
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#555', paddingLeft: 20 }}>
                      অপ্রয়োজনীয় মালামাল আমরা কিনে নেব।
                    </p>
                  </div>
                  <div
                    className="win-inset"
                    onClick={() => setDisposalOptions((p) => ({ ...p, donate: !p.donate }))}
                    style={{
                      background: disposalOptions.donate ? '#c0ffc0' : '#fff',
                      padding: '8px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <input type="checkbox" className="win-checkbox" checked={disposalOptions.donate} readOnly />
                      <span style={{ fontWeight: 'bold', fontSize: '11px', display: 'flex', gap: 4, alignItems: 'center' }}>
                        <HeartIcon /> মালামাল দান করুন
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#555', paddingLeft: 20 }}>
                      অব্যবহৃত ফার্নিচার চ্যারিটিতে দিন।
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Quote Panel */}
              <div className="win-panel" style={{ padding: 2, boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)' }}>
                <div className="win-titlebar" style={{ fontSize: '10px' }}>
                  <span>💰 Estimated Quote</span>
                </div>
                <div style={{ padding: '10px 12px' }}>

                  {/* Big price */}
                  <div
                    className="win-sunken"
                    style={{ background: '#fff', padding: '8px 12px', textAlign: 'center', marginBottom: 10 }}
                  >
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: 2 }}>Total Estimate</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000080', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                      ৳{totalEstimate.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '10px', color: '#888' }}>VAT ও অন্যান্য চার্জ প্রযোজ্য</div>
                  </div>

                  {/* Location inputs */}
                  <div style={{ marginBottom: 6 }}>
                    <Label>🚩 পিকআপ লোকেশন:</Label>
                    <input
                      className="win-input"
                      placeholder="যেমন: উত্তরা, ঢাকা"
                      value={formData.current_location}
                      onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                    />
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <Label>🏁 ড্রপ-অফ লোকেশন:</Label>
                    <input
                      className="win-input"
                      placeholder="যেমন: বনানী, ঢাকা"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
                    <div>
                      <Label>📅 তারিখ:</Label>
                      <input
                        type="date"
                        className="win-input"
                        onChange={(e) => setFormData({ ...formData, moving_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>⏰ সময়:</Label>
                      <select
                        className="win-select"
                        onChange={(e) => setFormData({ ...formData, moving_time: e.target.value })}
                      >
                        <option>সকাল ১০টা - দুপুর ১টা</option>
                        <option>বিকাল ৪টা - সন্ধ্যা ৭টা</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div
                    className="win-groupbox"
                    style={{ border: '1px solid #808080', padding: '12px 8px 8px', marginBottom: 10 }}
                  >
                    <span className="win-groupbox-label">Premium Add-ons</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {Object.keys(SERVICE_PRICES).map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleService(s)}
                          className="win-btn"
                          style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            background: extraServices.includes(s) ? '#000080' : '#d4d0c8',
                            color: extraServices.includes(s) ? '#fff' : '#000',
                            borderTop: extraServices.includes(s) ? '2px solid #000040' : '2px solid #fff',
                            borderLeft: extraServices.includes(s) ? '2px solid #000040' : '2px solid #fff',
                            borderRight: extraServices.includes(s) ? '2px solid #fff' : '2px solid #606060',
                            borderBottom: extraServices.includes(s) ? '2px solid #fff' : '2px solid #606060',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="win-btn win-btn-default"
                    onClick={() => handleBookingSubmit()}
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: loading ? '#b0b0b0' : '#000080',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      padding: '6px',
                      borderTop: '2px solid #4040c0',
                      borderLeft: '2px solid #4040c0',
                      borderRight: '2px solid #000040',
                      borderBottom: '2px solid #000040',
                    }}
                  >
                    {loading ? '⏳ প্রসেসিং...' : '✅ শিফটিং কনফার্ম করুন'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Other service modal ── */}
          {activeService && activeService !== 'shifting' && !isSubmitted && (
            <WinDialog
              title={`${activeService.charAt(0).toUpperCase() + activeService.slice(1)} Service Booking`}
              onClose={() => setActiveService(null)}
            >
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeService === 'logistics' && (
                  <>
                    <div>
                      <Label>মালামালের ধরণ:</Label>
                      <input className="win-input" placeholder="যেমন: চালের বস্তা" required onChange={(e) => setFormData({ ...formData, load_type: e.target.value })} />
                    </div>
                    <div>
                      <Label>গাড়ির ধরণ:</Label>
                      <input className="win-input" placeholder="পিকআপ/ট্রাক" required onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })} />
                    </div>
                  </>
                )}
                {activeService === 'emergency' && (
                  <>
                    <div>
                      <Label>রোগীর অবস্থা:</Label>
                      <input className="win-input" placeholder="রোগীর অবস্থা লিখুন" required onChange={(e) => setFormData({ ...formData, patient_condition: e.target.value })} />
                    </div>
                    <div>
                      <Label>হাসপাতালের নাম:</Label>
                      <input className="win-input" placeholder="হাসপাতাল" required onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })} />
                    </div>
                  </>
                )}
                {activeService === 'rental' && (
                  <>
                    <div>
                      <Label>গাড়ির ধরণ:</Label>
                      <select className="win-select" onChange={(e) => setFormData({ ...formData, car_type: e.target.value })}>
                        <option>হাইয়েস মাইক্রোবাস</option>
                        <option>নোয়া (Noah)</option>
                        <option>সেডান কার</option>
                      </select>
                    </div>
                    <div>
                      <Label>ভ্রমণের ধরণ:</Label>
                      <input className="win-input" placeholder="ফ্যামিলি ট্যুর" required onChange={(e) => setFormData({ ...formData, trip_type: e.target.value })} />
                    </div>
                  </>
                )}
                <div>
                  <Label>পিকআপ লোকেশন:</Label>
                  <input className="win-input" placeholder="পিকআপ লোকেশন" required onChange={(e) => setFormData({ ...formData, pickup_point: e.target.value })} />
                </div>
                <div>
                  <Label>ফোন নম্বর:</Label>
                  <input className="win-input" type="tel" placeholder="০১XXXXXXXXX" required onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })} />
                </div>
                <hr className="win-separator" />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                  <button type="submit" disabled={loading} className="win-btn win-btn-default"
                    style={{ background: '#000080', color: '#fff', borderTop: '2px solid #4040c0', borderLeft: '2px solid #4040c0', borderRight: '2px solid #000040', borderBottom: '2px solid #000040' }}>
                    {loading ? '⏳ প্রসেসিং...' : '✅ বুকিং নিশ্চিত করুন'}
                  </button>
                  <button type="button" className="win-btn" onClick={() => setActiveService(null)}>বাতিল করুন</button>
                </div>
              </form>
            </WinDialog>
          )}
        </div>

        {/* ── Info Panels ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 12px 12px' }}>
          {[
            { icon: <ShieldIcon />, title: 'নিরাপদ ইন্স্যুরেন্স', desc: 'মালামাল ভাঙলে ১০০% ক্ষতিপূরণের নিশ্চয়তা আমরা দিচ্ছি।', label: '🛡️' },
            { icon: <ClockIcon />, title: 'সঠিক সময়', desc: 'আপনার মূল্যবান সময় বাঁচাতে আমাদের টিম সবসময় অন-টাইম।', label: '⏰' },
            { icon: <BoxIcon />, title: 'স্মার্ট ট্র্যাকিং', desc: 'QR কোডের মাধ্যমে প্রতিটি বক্স ট্র্যাক করুন সরাসরি আমাদের অ্যাপে।', label: '📦' },
          ].map((card) => (
            <div key={card.title} className="win-panel" style={{ padding: 2 }}>
              <div className="win-titlebar" style={{ fontSize: '10px', padding: '3px 6px' }}>
                <span>{card.label} {card.title}</span>
              </div>
              <div style={{ padding: '10px', background: '#d4d0c8' }}>
                <p style={{ margin: 0, fontSize: '11px', color: '#333', lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Status Bar ── */}
        <div className="win-statusbar">
          <div
            style={{
              flex: 1,
              borderRight: '1px solid #808080',
              paddingRight: 8,
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            ✅ Ready — সার্ভিস বুকিং পোর্টাল চালু আছে
          </div>
          <div style={{ width: 80, paddingLeft: 8, borderRight: '1px solid #808080', paddingRight: 8 }}>
            🔒 Secure
          </div>
          <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div className="win-progress" style={{ width: 60 }}>
              <div className="win-progress-fill" style={{ width: '100%' }} />
            </div>
            Online
          </div>
        </div>
      </div>

      {/* ── Taskbar ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          background: '#d4d0c8',
          borderTop: '2px solid #fff',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '0 4px',
          zIndex: 100,
        }}
      >
        {/* Start button */}
        <button
          className="win-raised"
          style={{
            background: '#d4d0c8',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '11px',
            padding: '2px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            border: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" fill="#ff0000"/>
            <rect x="9" y="1" width="6" height="6" fill="#00aa00"/>
            <rect x="1" y="9" width="6" height="6" fill="#0000ff"/>
            <rect x="9" y="9" width="6" height="6" fill="#ffff00"/>
          </svg>
          Start
        </button>
        {/* Divider */}
        <div style={{ width: 1, height: 20, background: '#808080', borderRight: '1px solid #fff' }} />
        {/* Active window button */}
        <button
          className="win-sunken"
          style={{
            background: '#c8c4bc',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '11px',
            padding: '2px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            border: 'none',
            minWidth: 160,
          }}
        >
          <TruckIcon /> Pouchhai Logistics
        </button>
        {/* System tray */}
        <div
          className="win-sunken"
          style={{
            marginLeft: 'auto',
            padding: '2px 8px',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#c8c4bc',
          }}
        >
          <span>🔊</span>
          <span>📶</span>
          <span style={{ fontFamily: 'Tahoma, Arial, sans-serif', fontWeight: 'bold' }}>
            {new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Spacer for taskbar */}
      <div style={{ height: 40 }} />
    </div>
  );
};

export default Home8;
