import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Wunschgemäß ist das Dashboard/Supabase vorerst stillgelegt (Offline-Modus erzwungen)
export const istOffline = true;

export const supabase = createClient(
  supabaseUrl && !istOffline ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey && !istOffline ? supabaseAnonKey : 'placeholder-key'
);
