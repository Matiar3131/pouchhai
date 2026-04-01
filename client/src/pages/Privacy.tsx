import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-8 md:px-[8%] text-white">
      <div className="max-w-3xl mx-auto bg-white/5 p-10 rounded-[40px] border border-white/10">
        <h1 className="text-3xl font-bold mb-8">প্রাইভেসি পলিসি</h1>
        <div className="space-y-6 text-slate-400 leading-relaxed text-sm">
          <section>
            <h3 className="text-white font-bold mb-2">১. তথ্য সংগ্রহ</h3>
            <p>আমরা আপনার নাম, ফোন নম্বর এবং লোকেশন সংগ্রহ করি শুধুমাত্র সার্ভিস প্রদানের উদ্দেশ্যে।</p>
          </section>
          <section>
            <h3 className="text-white font-bold mb-2">২. তথ্যের ব্যবহার</h3>
            <p>আপনার ব্যক্তিগত তথ্য অন্য কোনো থার্ড-পার্টি অ্যাপের কাছে বিক্রি বা শেয়ার করা হয় না।</p>
          </section>
          <section>
            <h3 className="text-white font-bold mb-2">৩. কুকিজ (Cookies)</h3>
            <p>ইউজার এক্সপেরিয়েন্স ভালো করতে আমরা বেসিক ব্রাউজার কুকিজ ব্যবহার করতে পারি।</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;