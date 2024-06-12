// utils/initSupabase.js

// utils/initSupabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or ANON key is not set');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

