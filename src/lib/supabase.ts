import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AnalysisRecord {
  id: string;
  patient_id: string;
  image_url: string;
  patient_complaint: string;
  result: string;
  confidence_score: number;
  image_features: Record<string, unknown>;
  text_features: Record<string, unknown>;
  created_at: string;
  notes: string;
}
