
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
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const teamId = formData.get('teamId') as string
    const fileName = formData.get('fileName') as string

    if (!file || !teamId || !fileName) {
      throw new Error('Missing required fields')
    }

    // Verify user is member of the team
    const { data: membership } = await supabaseClient
      .from('team_memberships')
      .select('id')
      .eq('user_id', user.id)
      .eq('team_id', teamId)
      .single()

    if (!membership) {
      throw new Error('User is not a member of this team')
    }

    // Generate unique file path
    const fileExt = file.name.split('.').pop()
    const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${user.id}/${teamId}/${uniqueFileName}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('collaboration-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Determine file type
    const getFileType = (mimeType: string) => {
      if (mimeType.startsWith('image/')) return 'image'
      if (mimeType.startsWith('video/')) return 'video'
      if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document'
      if (mimeType.includes('zip') || mimeType.includes('rar')) return 'archive'
      return 'other'
    }

    // Save file metadata to database
    const { data: fileRecord, error: dbError } = await supabaseClient
      .from('files')
      .insert({
        name: fileName,
        original_name: file.name,
        file_type: getFileType(file.type),
        mime_type: file.type,
        size_bytes: file.size,
        storage_path: filePath,
        uploaded_by: user.id,
        team_id: teamId
      })
      .select()
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabaseClient.storage
        .from('collaboration-files')
        .remove([filePath])
      throw dbError
    }

    return new Response(
      JSON.stringify({ file: fileRecord }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error uploading file:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
