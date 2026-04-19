import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar'; 
import Footer from './components/common/Footer';
import UserDashboard from './pages/UserDashboard';
import Auth from './pages/Auth';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Pricing from './pages/Pricing';
// পেজগুলো ইমপোর্ট করুন (নিশ্চিত করুন এই ফাইলগুলো আপনি তৈরি করেছেন)
//import Home from './pages/Home';
//import Home1 from './pages/Home1'; // ইনভেন্টরি ভার্সন
import Home2 from './pages/Home2'; // প্যাকেজ ভার্সন
import Home3 from './pages/Home3'; // মিডিয়া ভার্সন
import Home4 from './pages/Home4'; // মিডিয়া ভার্সন
import Home5 from './pages/Home5'; // মিডিয়া ভার্সন
import Home6 from './pages/Home6'; // মিডিয়া ভার্সন
import Home7 from './pages/Home7'; // মিডিয়া ভার্সন
import Home8 from './pages/Home8'; // মিডিয়া ভার্সন
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import AdminSecretPanel from './pages/AdminSecretPanel';
import TrackOrder from './pages/TrackOrder';
import BookingDetail from './pages/BookingDetail';

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToHash />
      <div className="flex flex-col min-h-screen bg-[#020617]">
        <Navbar /> 
        <main className="flex-grow">
          <Routes>
            {/* মেইন হোম পেজ */}
           {/* <Route path="/" element={<Home />} />*/}
            
            {/* আলাদা আলাদা টেস্টিং ভার্সন */}
            <Route path="/" element={<Home7 />} /> 
          {/*  <Route path="/v2" element={<Home2 />} /> */}
           {/* <Route path="/v3" element={<Home3 />} /> */}
            
            {/* অন্যান্য পেজ */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/about" element={<About />} />
<Route path="/privacy" element={<Privacy />} />
<Route path="/pricing" element={<Pricing />} />
<Route path="/admin-secret-panel" element={<AdminSecretPanel />} />
<Route path="/track" element={<TrackOrder />} />
<Route path="/admin-secret-panel/:id" element={<BookingDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;