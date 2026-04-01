import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const whatsappNumber = "+8801XXXXXXXXX";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=Hello Pouchhai, I need a shifting quote.`;

  const menus: Record<string, { label: string; href: string }[]> = {
    File: [
      { label: 'Home', href: '/' },
      { label: 'New Booking...', href: '/' },
      { label: 'Track Order', href: '/track' },
      { label: 'Exit', href: '/' },
    ],
    View: [
      { label: 'Services', href: '/services' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About Us', href: '/about' },
    ],
    Account: [
      { label: 'Login', href: '/login' },
      { label: 'My Bookings', href: '/user-dashboard' },
      { label: 'Admin Panel', href: '/dashboard' },
    ],
    Help: [
      { label: 'WhatsApp Support', href: whatsappLink },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'About Pouchhai...', href: '/about' },
    ],
  };

  return (
    <div className="select-none" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* ── Title Bar ── */}
      <div
        className="win-titlebar"
        style={{ padding: '4px 6px', background: 'linear-gradient(to right, #000080, #1084d0)' }}
      >
        <div className="flex items-center gap-2">
          {/* tiny truck icon placeholder */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="5" width="9" height="7" fill="#c8d8ff" stroke="#fff" strokeWidth="0.5"/>
            <polygon points="10,6 14,8 14,12 10,12" fill="#a0c0ff" stroke="#fff" strokeWidth="0.5"/>
            <circle cx="4" cy="12" r="1.5" fill="#fff"/>
            <circle cx="12" cy="12" r="1.5" fill="#fff"/>
            <rect x="2" y="7" width="5" height="3" fill="#4080ff"/>
          </svg>
          <span className="text-white font-bold text-xs">Pouchhai Logistics - [Main Window]</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="win-titlebar-btn">_</span>
          <span className="win-titlebar-btn">□</span>
          <span className="win-titlebar-btn font-bold">✕</span>
        </div>
      </div>

      {/* ── Menu Bar ── */}
      <div className="win-menubar" style={{ position: 'relative' }}>
        {Object.entries(menus).map(([name, items]) => (
          <div key={name} style={{ position: 'relative' }}>
            <button
              className="win-menubar-item"
              style={{
                background: activeMenu === name ? '#000080' : 'transparent',
                color: activeMenu === name ? '#fff' : '#000',
                border: 'none',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '11px',
                cursor: 'pointer',
                padding: '2px 8px',
                textDecoration: 'none',
              }}
              onMouseDown={() => setActiveMenu(activeMenu === name ? null : name)}
              onBlur={() => setTimeout(() => setActiveMenu(null), 200)}
            >
              <u>{name[0]}</u>{name.slice(1)}
            </button>
            {activeMenu === name && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 9999,
                  background: '#d4d0c8',
                  borderTop: '1px solid #fff',
                  borderLeft: '1px solid #fff',
                  borderRight: '1px solid #404040',
                  borderBottom: '1px solid #404040',
                  minWidth: '160px',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                {items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    style={{
                      display: 'block',
                      padding: '4px 20px',
                      fontSize: '11px',
                      color: '#000',
                      textDecoration: 'none',
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#000080';
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#000';
                    }}
                    onClick={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Right side: clock-style branding */}
        <div className="ml-auto flex items-center gap-3 pr-2" style={{ fontSize: '11px', color: '#000' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="win-btn"
            style={{ fontSize: '10px', padding: '1px 8px' }}
          >
            📞 WhatsApp Support
          </a>
          <Link to="/login" className="win-btn win-btn-default" style={{ textDecoration: 'none', fontSize: '10px', padding: '1px 10px' }}>
            🔑 Login
          </Link>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div
        style={{
          background: '#d4d0c8',
          borderBottom: '1px solid #808080',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
        }}
      >
        <Link to="/" className="win-btn" style={{ textDecoration: 'none', padding: '2px 8px', fontSize: '11px' }}>
          🏠 Home
        </Link>
        <Link to="/services" className="win-btn" style={{ textDecoration: 'none', padding: '2px 8px', fontSize: '11px' }}>
          📦 Services
        </Link>
        <Link to="/track" className="win-btn" style={{ textDecoration: 'none', padding: '2px 8px', fontSize: '11px' }}>
          🔍 Track Order
        </Link>
        <div
          style={{
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #fff',
            width: '2px',
            height: '20px',
            margin: '0 4px',
          }}
        />
        <span style={{ fontSize: '10px', color: '#444' }}>Address:</span>
        <div
          style={{
            flex: 1,
            background: '#fff',
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #fff',
            borderBottom: '1px solid #fff',
            padding: '1px 4px',
            fontSize: '11px',
            color: '#000',
            fontFamily: 'Tahoma, Arial, sans-serif',
          }}
        >
          pouchhai.com/home
        </div>
        <button className="win-btn" style={{ padding: '2px 10px', fontSize: '11px' }}>
          ▶ Go
        </button>
      </div>
    </div>
  );
};

export default Navbar;
