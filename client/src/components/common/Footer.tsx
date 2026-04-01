import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#d4d0c8',
        borderTop: '2px solid #808080',
        fontFamily: 'Tahoma, Arial, sans-serif',
        fontSize: '11px',
        color: '#000',
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          background: '#000080',
          color: '#fff',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Mini logo icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="5" width="8" height="7" fill="#4080c0" stroke="#fff" strokeWidth="0.5"/>
            <polygon points="9,6 13,8 13,12 9,12" fill="#6090d0" stroke="#fff" strokeWidth="0.5"/>
            <circle cx="3.5" cy="12.5" r="1.5" fill="#eee"/>
            <circle cx="11" cy="12.5" r="1.5" fill="#eee"/>
          </svg>
          <span style={{ fontWeight: 'bold' }}>Pouchhai Logistics</span>
        </div>
        <span style={{ fontSize: '10px', opacity: 0.8 }}>আমরা শুধু মালামাল নয়, আপনার ভরসা পৌঁছে দেই।</span>
      </div>

      {/* ── Main footer content ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: 0,
          padding: 0,
          borderBottom: '1px solid #808080',
        }}
      >
        {/* Company Info */}
        <div
          style={{
            padding: '12px 16px',
            borderRight: '1px solid #808080',
            borderBottom: '1px solid #fff',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '11px',
              padding: '3px 8px',
              marginBottom: 8,
            }}
          >
            🚛 Pouchhai
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: '#333', lineHeight: 1.7 }}>
            আমরা শুধু মালামাল নয়, আপনার ভরসা পৌঁছে দেই সঠিক সময়ে এবং সর্বোচ্চ নিরাপত্তায়।
          </p>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="win-btn" style={{ fontSize: '13px', padding: '2px 6px' }}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="win-btn" style={{ fontSize: '13px', padding: '2px 6px' }}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="win-btn" style={{ fontSize: '13px', padding: '2px 6px' }}>
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div
          style={{
            padding: '12px 16px',
            borderRight: '1px solid #808080',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '11px',
              borderBottom: '1px solid #808080',
              paddingBottom: 4,
              marginBottom: 6,
              color: '#000080',
            }}
          >
            Quick Links
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              { label: '📖 আমাদের সম্পর্কে', to: '/about' },
              { label: '📦 সার্ভিসসমূহ', to: '/services' },
              { label: '💲 প্রাইসিং প্ল্যান', to: '/pricing' },
            ].map((item) => (
              <li key={item.to} style={{ marginBottom: 4 }}>
                <Link
                  to={item.to}
                  style={{ color: '#000080', textDecoration: 'none', fontSize: '11px' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#cc0000'; (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#000080'; (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div
          style={{
            padding: '12px 16px',
            borderRight: '1px solid #808080',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '11px',
              borderBottom: '1px solid #808080',
              paddingBottom: 4,
              marginBottom: 6,
              color: '#000080',
            }}
          >
            Support
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginBottom: 4, fontSize: '11px' }}>📞 +880 1XXX-XXXXXX</li>
            <li style={{ marginBottom: 4, fontSize: '11px' }}>✉️ support@pouchhai.com</li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/privacy"
                style={{ color: '#000080', textDecoration: 'none', fontSize: '11px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
              >
                🔒 প্রাইভেসি পলিসি
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div style={{ padding: '12px 16px' }}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '11px',
              borderBottom: '1px solid #808080',
              paddingBottom: 4,
              marginBottom: 6,
              color: '#000080',
            }}
          >
            Newsletter
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#555' }}>
            নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন:
          </p>
          <div
            className="win-sunken"
            style={{ background: '#fff', display: 'flex', marginBottom: 6 }}
          >
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '11px',
                padding: '3px 6px',
                flex: 1,
                color: '#000',
              }}
            />
          </div>
          <button className="win-btn win-btn-default" style={{ width: '100%', fontWeight: 'bold', background: '#000080', color: '#fff', borderTop: '2px solid #4040c0', borderLeft: '2px solid #4040c0', borderRight: '2px solid #000040', borderBottom: '2px solid #000040' }}>
            ✉️ Subscribe
          </button>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="win-statusbar"
        style={{ justifyContent: 'space-between', padding: '4px 12px' }}
      >
        <span style={{ fontSize: '10px' }}>
          © {new Date().getFullYear()} Pouchhai Logistics. All rights reserved. | Built with Windows 2000 aesthetic
        </span>
        <span style={{ fontSize: '10px', color: '#555' }}>
          Version 2.0.0 Build 2195
        </span>
      </div>
    </footer>
  );
};

export default Footer;
