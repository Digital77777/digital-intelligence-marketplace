
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role for better reliability
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
        JSON.stringify({ error: 'Authentication required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
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
        JSON.stringify({ error: 'Invalid authentication token' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID not found in token' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
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
        JSON.stringify({ 
          tasks: [], 
          teams: [],
          error: 'Failed to fetch team memberships' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
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

    // Fetch teams and tasks in parallel
    const teamsPromise = supabaseClient
      .from('teams')
      .select('*')
      .in('id', teamIds)

    const tasksPromise = supabaseClient
      .from('tasks')
      .select('*')
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })

    const [{ data: teams, error: teamsError }, { data: tasks, error: tasksError }] = await Promise.all([
      teamsPromise,
      tasksPromise,
    ]);

    if (teamsError) {
      console.error('Error fetching teams:', teamsError)
      return new Response(JSON.stringify({ 
        error: `Failed to fetch teams: ${teamsError.message}`,
        tasks: tasks || [],
        teams: []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError)
      return new Response(JSON.stringify({ 
        error: `Failed to fetch tasks: ${tasksError.message}`,
        tasks: [],
        teams: teams || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    console.log('Successfully fetched team dashboard data:', {
      teamsCount: teams?.length || 0,
      tasksCount: tasks?.length || 0
    })

    return new Response(JSON.stringify({ 
      tasks: tasks ?? [], 
      teams: teams ?? [] 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in team-dashboard-data function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message,
      tasks: [],
      teams: []
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
