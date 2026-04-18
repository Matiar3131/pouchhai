import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    // tslib এবং supabase কে force include করা
    include: ['tslib', '@supabase/supabase-js'],
  },

  build: {
    // ১ মেগাবাইটের বড় চাঙ্ক সাইজ ওয়ার্নিং লিমিট সেট করা
    chunkSizeWarningLimit: 1000,
    
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
    },

    rollupOptions: {
      output: {
        // node_modules এর বড় ফাইলগুলোকে আলাদা আলাদা চাঙ্কে ভাগ করা
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
})