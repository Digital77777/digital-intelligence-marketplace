
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
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

    // Extract user ID from the JWT token
    const token = authHeader.replace('Bearer ', '')
    let userId: string | null = null
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      userId = payload.sub
    } catch (e) {
      console.error('Failed to decode JWT:', e)
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

    if (!userId) {
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

    console.log('Fetching collaboration data for user:', userId)

    // Get user's teams
    const { data: teamMemberships, error: teamsError } = await supabaseClient
      .from('team_memberships')
      .select('team_id, role')
      .eq('user_id', userId)

    if (teamsError) {
      console.error('Teams error:', teamsError)
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

    // Fetch all data with proper error handling
    const [teamsResult, discussionsResult, filesResult, membersResult, tasksResult, activitiesResult] = await Promise.allSettled([
      supabaseClient.from('teams').select('id, name, description, created_by, created_at').in('id', teamIds),
      supabaseClient.from('discussions').select('*').in('team_id', teamIds).is('parent_id', null).order('created_at', { ascending: false }).limit(10),
      supabaseClient.from('files').select('*').in('team_id', teamIds).order('created_at', { ascending: false }).limit(20),
      supabaseClient.from('team_memberships').select('*').in('team_id', teamIds),
      supabaseClient.from('tasks').select('*').in('team_id', teamIds).order('created_at', { ascending: false }).limit(15),
      supabaseClient.from('team_activity').select('*').in('team_id', teamIds).order('created_at', { ascending: false }).limit(20)
    ])

    const teams = teamsResult.status === 'fulfilled' ? teamsResult.value.data || [] : []
    const discussions = discussionsResult.status === 'fulfilled' ? discussionsResult.value.data || [] : []
    const files = filesResult.status === 'fulfilled' ? filesResult.value.data || [] : []
    const teamMembers = membersResult.status === 'fulfilled' ? membersResult.value.data || [] : []
    const tasks = tasksResult.status === 'fulfilled' ? tasksResult.value.data || [] : []
    const activities = activitiesResult.status === 'fulfilled' ? activitiesResult.value.data || [] : []

    const responseData = {
      discussions,
      files,
      teamMembers,
      tasks,
      activities,
      teams
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
})
