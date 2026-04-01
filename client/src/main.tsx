import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


// গ্লোবাল ভ্যারিয়েবল হিসেবে root এলিমেন্টটি ধরা
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. HTML ফাইলে id='root' আছে কি না চেক করুন।");
}

// যদি আগে থেকেই root তৈরি করা থাকে তবে সেটি ব্যবহার করবে, নয়তো নতুন তৈরি করবে
// এটি ডাবল রেন্ডারিং এরর (Warning) বন্ধ করে দেয়
const root = (rootElement as any)._reactRootContainer 
  ? (rootElement as any)._reactRootContainer 
  : ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);