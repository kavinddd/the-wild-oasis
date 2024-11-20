import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yzozqdgpgysvdjighkkp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6b3pxZGdwZ3lzdmRqaWdoa2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTEyMDYsImV4cCI6MjA0NTc4NzIwNn0.EZZo3OFOO57hDv0I8oQ7FOZAK_LO7WkYCX5SrssGY5I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
