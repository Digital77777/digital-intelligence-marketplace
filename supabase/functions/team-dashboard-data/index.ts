
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // RLS policies now handle security, so we can query directly.
    // This is simpler and more performant.
    const teamsPromise = supabaseClient.from('teams').select('*');
    const tasksPromise = supabaseClient.from('tasks').select('*').order('created_at', { ascending: false });

    const [{ data: teams, error: teamsError }, { data: tasks, error: tasksError }] = await Promise.all([
      teamsPromise,
      tasksPromise,
    ]);

    if (teamsError) throw new Error(`Failed to fetch teams: ${teamsError.message}`);
    if (tasksError) throw new Error(`Failed to fetch tasks: ${tasksError.message}`);

    return new Response(JSON.stringify({ tasks: tasks ?? [], teams: teams ?? [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in team-dashboard-data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
