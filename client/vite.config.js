import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // public ফোল্ডারে থাকা বাড়তি অ্যাসেটগুলো এখানে দিন
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Pouchhai - Shifting Solution',
        short_name: 'Pouchhai',
        description: 'নিশ্চিন্তে গন্তব্যে পৌঁছাই - Best Shifting Service in Bangladesh',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // এটি অ্যান্ড্রয়েড ডিভাইসে আইকনকে সুন্দর করে অ্যাডজাস্ট করে
          }
        ]
      }
    })
  ],
  
  optimizeDeps: {
    include: ['tslib', '@supabase/supabase-js'],
  },

  build: {
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
    },
    
    chunkSizeWarningLimit: 1000, 

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
   },
})