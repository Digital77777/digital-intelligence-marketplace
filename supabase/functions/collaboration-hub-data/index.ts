
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      console.error('Authentication error:', userError?.message || 'No user found')
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    console.log('Fetching collaboration data for user:', user.id)

    // Get user's teams first
    const { data: teamMemberships, error: teamsError } = await supabaseClient
      .from('team_memberships')
      .select(`
        team_id,
        role,
        teams(id, name, description, created_by, created_at)
      `)
      .eq('user_id', user.id)

    if (teamsError) {
      console.error('Teams error:', teamsError)
      throw new Error(`Failed to fetch teams: ${teamsError.message}`)
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

    // Get discussions with author info (fixed foreign key reference)
    const { data: discussions, error: discussionsError } = await supabaseClient
      .from('discussions')
      .select(`
        *,
        user_profiles!author_id(username, full_name, avatar_url),
        file_attachments(
          files(id, name, original_name, file_type, size_bytes)
        )
      `)
      .in('team_id', teamIds)
      .is('parent_id', null)
      .order('created_at', { ascending: false })
      .limit(10)

    if (discussionsError) {
      console.error('Discussions error:', discussionsError)
      // Don't throw, just log and continue with empty discussions
    }

    // Get team files (fixed foreign key reference)
    const { data: files, error: filesError } = await supabaseClient
      .from('files')
      .select(`
        *,
        user_profiles!uploaded_by(username, full_name)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    if (filesError) {
      console.error('Files error:', filesError)
      // Don't throw, just log and continue with empty files
    }

    // Get team members with profiles (fixed foreign key reference)
    const { data: teamMembers, error: membersError } = await supabaseClient
      .from('team_memberships')
      .select(`
        *,
        user_profiles!user_id(id, username, full_name, avatar_url)
      `)
      .in('team_id', teamIds)

    if (membersError) {
      console.error('Members error:', membersError)
      // Don't throw, just log and continue with empty members
    }

    // Get tasks for team collaboration (fixed foreign key reference)
    const { data: tasks, error: tasksError } = await supabaseClient
      .from('tasks')
      .select(`
        *,
        assignee_profile:user_profiles!assigned_to(username, full_name)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(15)

    if (tasksError) {
      console.error('Tasks error:', tasksError)
      // Don't throw, just log and continue with empty tasks
    }

    // Get recent team activity (fixed foreign key reference)
    const { data: activities, error: activitiesError } = await supabaseClient
      .from('team_activity')
      .select(`
        *,
        user_profiles!user_id(username, full_name, avatar_url)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    if (activitiesError) {
      console.error('Activities error:', activitiesError)
      // Don't throw, just log and continue with empty activities
    }

    const responseData = {
      discussions: discussions || [],
      files: files || [],
      teamMembers: teamMembers || [],
      tasks: tasks || [],
      activities: activities || [],
      teams: teamMemberships?.map(tm => tm.teams).filter(Boolean) || []
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
