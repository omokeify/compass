import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Compass is currently running in localStorage mode.');
}

/**
 * Compass Governance Client
 * This client serves as the primary bridge between the UI and the Supabase Cloud.
 * It handles all signal broadcasts, member registry, and vision updates.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Global Hub Synchronizer
 * Helper to determine if we should use Supabase or fallback to localStorage
 */
export const useSupabase = !!supabaseUrl && !!supabaseAnonKey;
