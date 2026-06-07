import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const fallbackUrl = 'https://ickzxgsqsnymwnrdneyh.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlja3p4Z3Nxc255bXducmRuZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTEyMzcsImV4cCI6MjA5NDg4NzIzN30.ahF5V9wv26DQqomxx_HBUDg-m4JmwkAgMmMJwIZ8lpg';

// Build-safe initialization: use environment variables if present, otherwise use verified project fallbacks
export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
);
