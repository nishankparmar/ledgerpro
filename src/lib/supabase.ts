
import { createClient } from '@supabase/supabase-js';

// Use the Supabase project ID and anon key that we've connected
const supabaseUrl = 'https://orbbxvibqgvcdzruqxkm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yYmJ4dmlicWd2Y2R6cnVxeGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzUxOTcsImV4cCI6MjA1NjMxMTE5N30.Nf0FFO9WbgtVMXD5H42ZUCSVciWRwhljVsANbJL6thk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
