import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // @vitejs/react-refresh এর বদলে এটি ব্যবহার করা আধুনিক স্ট্যান্ডার্ড

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    // ত্বরান্বিত করার জন্য লাইব্রেরিগুলো অন্তর্ভুক্ত করা হলো
    include: ['tslib', '@supabase/supabase-js'],
  },

  build: {
    // কমন জেএস মডিউল হ্যান্ডেল করার জন্য
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
    },
    
    // ৫০০ kB এর বেশি বড় ফাইলের ওয়ার্নিং এড়াতে লিমিট বাড়ানো হলো
    chunkSizeWarningLimit: 1000, 

    rollupOptions: {
      output: {
        // node_modules এর বড় লাইব্রেরিগুলোকে আলাদা আলাদা চাঙ্কে ভাগ করার লজিক
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
})