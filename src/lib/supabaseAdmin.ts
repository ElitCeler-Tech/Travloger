import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client using service role for secure inserts
// Configure via environment variables in your deployment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)



