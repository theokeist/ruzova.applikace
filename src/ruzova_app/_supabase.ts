import { createClient } from '@supabase/supabase-js'

const supabase_url = "https://kwosefrhynbuphawdgtq.supabase.co";
const supabase_anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTE1NzE0MiwiZXhwIjoxOTQwNzMzMTQyfQ.Zu0hC4JGG47TTw5sXbCLaOfKdmRxhRosiOMAkWP_Ugc";

const supabase = createClient(supabase_url, supabase_anon);

export default supabase;