
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { 
        global: { 
          headers: { Authorization: req.headers.get('Authorization')! } 
        } 
      }
    );

    // Get the authenticated user ID
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header found')
      return new Response(
        JSON.stringify({ tasks: [], teams: [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Extract user ID from the JWT token
    const token = authHeader.replace('Bearer ', '')
    let userId: string | null = null
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      userId = payload.sub
    } catch (e) {
      console.error('Failed to decode JWT:', e)
      return new Response(
        JSON.stringify({ tasks: [], teams: [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ tasks: [], teams: [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    console.log('Fetching team dashboard data for user:', userId)

    // Get user's team IDs first
    const { data: userTeamMemberships, error: membershipError } = await supabaseClient
      .from('team_memberships')
      .select('team_id')
      .eq('user_id', userId)

    if (membershipError) {
      console.error('Error fetching team memberships:', membershipError)
      return new Response(
        JSON.stringify({ tasks: [], teams: [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const teamIds = userTeamMemberships?.map(tm => tm.team_id) || []

    // If user has no teams, return empty data
    if (teamIds.length === 0) {
      return new Response(JSON.stringify({ tasks: [], teams: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Fetch teams and tasks with proper error handling
    const [teamsResult, tasksResult] = await Promise.allSettled([
      supabaseClient.from('teams').select('*').in('id', teamIds),
      supabaseClient.from('tasks').select('*').in('team_id', teamIds).order('created_at', { ascending: false })
    ]);

    const teams = teamsResult.status === 'fulfilled' ? teamsResult.value.data || [] : []
    const tasks = tasksResult.status === 'fulfilled' ? tasksResult.value.data || [] : []

    console.log('Successfully fetched team dashboard data:', {
      teamsCount: teams.length,
      tasksCount: tasks.length
    })

    return new Response(JSON.stringify({ 
      tasks, 
      teams 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in team-dashboard-data function:', error);
    return new Response(JSON.stringify({ 
      tasks: [],
      teams: []
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
