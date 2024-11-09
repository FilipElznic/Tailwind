import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "your-supabase-url"; // Replace with your Supabase URL
const supabaseAnonKey = "your-anon-key"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
