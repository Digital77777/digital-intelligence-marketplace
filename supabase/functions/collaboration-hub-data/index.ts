
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

    // Get user's teams
    const { data: teamMemberships, error: teamsError } = await supabaseClient
      .from('team_memberships')
      .select(`
        team_id,
        teams!inner(id, name, description)
      `)
      .eq('user_id', (await supabaseClient.auth.getUser()).data.user?.id)

    if (teamsError) {
      throw teamsError
    }

    const teamIds = teamMemberships?.map(tm => tm.team_id) || []

    // Get discussions with author info
    const { data: discussions, error: discussionsError } = await supabaseClient
      .from('discussions')
      .select(`
        *,
        user_profiles!discussions_author_id_fkey(username, full_name, avatar_url),
        file_attachments(
          files(id, name, original_name, file_type, size_bytes)
        )
      `)
      .in('team_id', teamIds)
      .is('parent_id', null)
      .order('created_at', { ascending: false })
      .limit(10)

    if (discussionsError) {
      throw discussionsError
    }

    // Get team files
    const { data: files, error: filesError } = await supabaseClient
      .from('files')
      .select(`
        *,
        user_profiles!files_uploaded_by_fkey(username, full_name)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    if (filesError) {
      throw filesError
    }

    // Get team members with presence info
    const { data: teamMembers, error: membersError } = await supabaseClient
      .from('team_memberships')
      .select(`
        *,
        user_profiles!team_memberships_user_id_fkey(id, username, full_name, avatar_url)
      `)
      .in('team_id', teamIds)

    if (membersError) {
      throw membersError
    }

    // Get tasks for team collaboration
    const { data: tasks, error: tasksError } = await supabaseClient
      .from('tasks')
      .select(`
        *,
        assignee_profile:user_profiles!tasks_assigned_to_fkey(username, full_name)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(15)

    if (tasksError) {
      throw tasksError
    }

    // Get recent team activity
    const { data: activities, error: activitiesError } = await supabaseClient
      .from('team_activity')
      .select(`
        *,
        user_profiles!team_activity_user_id_fkey(username, full_name, avatar_url)
      `)
      .in('team_id', teamIds)
      .order('created_at', { ascending: false })
      .limit(20)

    if (activitiesError) {
      throw activitiesError
    }

    return new Response(
      JSON.stringify({
        discussions: discussions || [],
        files: files || [],
        teamMembers: teamMembers || [],
        tasks: tasks || [],
        activities: activities || [],
        teams: teamMemberships?.map(tm => tm.teams) || []
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error fetching collaboration data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
