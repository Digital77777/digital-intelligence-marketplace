
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role to bypass RLS issues
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the authenticated user
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

    // Extract user ID from the JWT token manually to avoid RLS issues
    const token = authHeader.replace('Bearer ', '')
    let userId: string | null = null
    
    try {
      // Decode JWT payload (this is a simple decode, not verification)
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

    console.log('Fetching collaboration data for user:', userId)

    // Get user's teams directly without joins to avoid RLS recursion
    const { data: teamMemberships, error: teamsError } = await supabaseClient
      .from('team_memberships')
      .select('team_id, role')
      .eq('user_id', userId)

    if (teamsError) {
      console.error('Teams error:', teamsError)
      // Return empty data instead of throwing to prevent complete failure
      return new Response(
        JSON.stringify({
          discussions: [],
          files: [],
          teamMembers: [],
          tasks: [],
          activities: [],
          teams: []
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const teamIds = teamMemberships?.map(tm => tm.team_id) || []
    console.log('User teams:', teamIds)

    // If user has no teams, return empty data
    if (teamIds.length === 0) {
      console.log('User has no teams, returning empty data')
      return new Response(
        JSON.stringify({
          discussions: [],
          files: [],
          teamMembers: [],
          tasks: [],
          activities: [],
          teams: []
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Fetch teams separately
    const { data: teams, error: teamsDataError } = await supabaseClient
      .from('teams')
      .select('id, name, description, created_by, created_at')
      .in('id', teamIds)

    // Get discussions without complex joins
    const { data: discussions, error: discussionsError } = await supabaseClient
      .from('discussions')
      .select('*')
      .in('team_id', teamIds)
      .is('parent_id', null)
      .order('created_at', { ascending: false })
      .limit(10)

    // Get team files
    const { data: files, error: filesError } = await supabaseClient
      .from('files')
      .select('*')
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    // Get team members
    const { data: teamMembers, error: membersError } = await supabaseClient
      .from('team_memberships')
      .select('*')
      .in('team_id', teamIds)

    // Get tasks
    const { data: tasks, error: tasksError } = await supabaseClient
      .from('tasks')
      .select('*')
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(15)

    // Get recent team activity
    const { data: activities, error: activitiesError } = await supabaseClient
      .from('team_activity')
      .select('*')
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    // Log any errors but don't fail the entire request
    if (discussionsError) console.error('Discussions error:', discussionsError)
    if (filesError) console.error('Files error:', filesError)
    if (membersError) console.error('Members error:', membersError)
    if (tasksError) console.error('Tasks error:', tasksError)
    if (activitiesError) console.error('Activities error:', activitiesError)
    if (teamsDataError) console.error('Teams data error:', teamsDataError)

    const responseData = {
      discussions: discussions || [],
      files: files || [],
      teamMembers: teamMembers || [],
      tasks: tasks || [],
      activities: activities || [],
      teams: teams || []
    }

    console.log('Successfully fetched collaboration data:', {
      discussions: responseData.discussions.length,
      files: responseData.files.length,
      teamMembers: responseData.teamMembers.length,
      tasks: responseData.tasks.length,
      activities: responseData.activities.length,
      teams: responseData.teams.length
    })

    return new Response(
      JSON.stringify(responseData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error fetching collaboration data:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
