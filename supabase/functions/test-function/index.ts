// Simple test function to verify Edge Function environment
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    // Create a Supabase client using environment variables directly
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // Simple test query
    const { data: users, error } = await supabaseClient
      .from('User')
      .select('id, email, name')
      .limit(5);
      
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({
        message: 'Function is working',
        userCount: users ? users.length : 0,
        envCheck: {
          hasResendKey: !!resendApiKey,
          hasSupabaseUrl: !!supabaseUrl,
          hasSupabaseAnonKey: !!supabaseAnonKey
        }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ 
        error: String(error),
        stack: error.stack,
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
