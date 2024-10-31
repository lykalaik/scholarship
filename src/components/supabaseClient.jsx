import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obscdhexpvekqdutdiiy.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ic2NkaGV4cHZla3FkdXRkaWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMDM5NzcsImV4cCI6MjA0NTU3OTk3N30.eqImKiXCEDoSO82NpeMwSUitNJ6jEbsTU4dHusOPSbg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
