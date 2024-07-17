import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://edjoiiyfaqcqinrnzhqx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkam9paXlmYXFjcWlucm56aHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExODU0OTMsImV4cCI6MjAzNjc2MTQ5M30.80ylQzUk3e2EuH1uxYuA_RBqH8jwxW-njGyIY3tM1wY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
