import { createClient } from '@supabase/supabase-js';

// Vite-এর স্ট্যান্ডার্ড পদ্ধতিতে ডাটা কল করা
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ভ্যালুগুলো ঠিকমতো আসছে কি না তা চেক করার জন্য এই লগটি দিন (শুধুমাত্র চেক করার জন্য)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Config Error: .env ফাইল থেকে URL বা Key পাওয়া যায়নি।");
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);