
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  
  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, verify the user token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the user's tier from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'User profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user has Pro tier access
    if (profile.tier !== 'pro' && url.pathname.includes('/pro-chat')) {
      return new Response(JSON.stringify({ error: 'Pro tier required for this feature' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the request body
    const body = await req.json();
    
    if (url.pathname === '/pro-chat/query') {
      if (req.method === 'POST') {
        const { message } = body;
        
        if (!message) {
          return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // First, check for any exact matches in the knowledge base
        const { data: knowledgeMatches, error: knowledgeError } = await supabase
          .from('platform_knowledge')
          .select('*')
          .textSearch('question', message, {
            type: 'websearch',
            config: 'english'
          });

        // Call OpenAI API
        const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
        
        if (!OPENAI_API_KEY) {
          return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Prepare the system message
        let systemMessage = `You are DIM's AI assistant for the Digital Intelligence Marketplace. Help users navigate the platform, answer questions about AI tools, and provide personalized recommendations. 
User tier: ${profile.tier}
Current time: ${new Date().toISOString()}`;

        // If we have knowledge base matches, add them to the system message
        if (knowledgeMatches && knowledgeMatches.length > 0) {
          systemMessage += "\n\nHere is some specific information that might help answer the query:\n\n";
          knowledgeMatches.forEach(item => {
            systemMessage += `Q: ${item.question}\nA: ${item.answer}\n\n`;
          });
        }

        // Call OpenAI API using fetch (no SDK in Deno)
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemMessage },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 1024
          })
        });

        const openaiData = await openaiResponse.json();

        // Check for OpenAI API errors
        if (openaiData.error) {
          console.error('OpenAI API error:', openaiData.error);
          return new Response(JSON.stringify({ error: 'Error calling OpenAI API' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const botResponse = openaiData.choices[0].message.content;

        // Save to chat history
        const { error: insertError } = await supabase
          .from('pro_chat_history')
          .insert({
            user_id: user.id,
            message,
            bot_response: botResponse,
            metadata: {
              intent: detectIntent(message),
              model: "gpt-4o-mini",
              matches: knowledgeMatches ? knowledgeMatches.length : 0
            }
          });

        if (insertError) {
          console.error('Error saving to chat history:', insertError);
        }

        // Return the response
        return new Response(JSON.stringify({ response: botResponse }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else if (url.pathname === '/pro-chat/history') {
      if (req.method === 'GET') {
        // Get the chat history for the user
        const { data, error } = await supabase
          .from('pro_chat_history')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .limit(50);

        if (error) throw error;

        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Default response for unsupported methods/paths
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Simple intent detection function
function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('navigate') || lowerMessage.includes('take me to') || lowerMessage.includes('go to') || lowerMessage.includes('open')) {
    return 'navigation';
  } else if (lowerMessage.includes('how do i') || lowerMessage.includes('how to')) {
    return 'instruction';
  } else if (lowerMessage.includes('what is') || lowerMessage.includes('explain')) {
    return 'explanation';
  } else if (lowerMessage.includes('difference between') || lowerMessage.includes('compare')) {
    return 'comparison';
  } else {
    return 'general';
  }
}
