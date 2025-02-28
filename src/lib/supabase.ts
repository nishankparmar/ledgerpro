
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// These values are automatically injected by Lovable when Supabase is connected
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
