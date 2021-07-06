import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://kwosefrhynbuphawdgtq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTE1NzE0MiwiZXhwIjoxOTQwNzMzMTQyfQ.Zu0hC4JGG47TTw5sXbCLaOfKdmRxhRosiOMAkWP_Ugc");


export default supabase;