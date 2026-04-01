import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // tslib এবং supabase কে force include করা
      chunkSizeWarningLimit: 1000,
    include: ['tslib', '@supabase/supabase-js'],
  },
  build: {
    commonjsOptions: {
      include: [/tslib/, /node_modules/],
    },
  },
})