
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Note: In a real project, you would import this from a shared file.
// For this example, we define it here.
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

    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    const { data: teamMemberships, error: teamsError } = await supabaseClient
      .from('team_memberships')
      .select('team_id')
      .eq('user_id', user.id);

    if (teamsError) throw teamsError;

    const teamIds = teamMemberships.map((tm) => tm.team_id);

    if (teamIds.length === 0) {
      return new Response(JSON.stringify({ tasks: [], teams: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    
    const { data: teams, error: teamDetailsError } = await supabaseClient
      .from('teams')
      .select('*')
      .in('id', teamIds);

    if (teamDetailsError) throw teamDetailsError;

    const { data: tasks, error: tasksError } = await supabaseClient
      .from('tasks')
      .select('*')
      .in('team_id', teamIds)
      .order('created_at', { ascending: false });

    if (tasksError) throw tasksError;

    return new Response(JSON.stringify({ tasks, teams }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
