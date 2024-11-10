import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bviuhriolcuvayzbgzum.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
