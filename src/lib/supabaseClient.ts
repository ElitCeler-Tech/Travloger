import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These should be replaced with your actual Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})

// Listen for auth state changes to handle session refresh gracefully
if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.access_token) {
                localStorage.setItem('access_token', session.access_token);
            }
        } else if (event === 'SIGNED_OUT') {
            localStorage.removeItem('access_token');
        }
    });
}

