import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwpxssdyoxewcngbqxxf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cHhzc2R5b3hld2NuZ2JxeHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NzQ5MDYsImV4cCI6MjA3MzE1MDkwNn0.RwPIp0FmxnoGugv-YJjZ9TzExTeZgDUypiyzHn-kSfE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 
