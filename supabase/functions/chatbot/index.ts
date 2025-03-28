
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set up Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { message, user_id } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch user context if user_id is provided
    let userContext = '';
    if (user_id) {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('tier, username')
        .eq('id', user_id)
        .single();
      
      if (userProfile) {
        userContext = `User tier: ${userProfile.tier}, Username: ${userProfile.username}`;
      }
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using GPT-4o mini for efficiency
        messages: [
          {
            role: "system",
            content: `You are Digital Intelligence Assistant, an AI helper for the Digital Intelligence Marketplace platform.
            Help users navigate the platform, answer questions about AI tools, and provide personalized recommendations.
            ${userContext ? 'Context about the user: ' + userContext : ''}
            
            The platform offers these main features:
            - AI Tools: Discover and try various AI tools
            - AI Tools Directory: Browse a comprehensive list of available AI tools (Basic & Pro tier only)
            - Learning Hub: Educational resources about AI and data science
            - Community Forums: Discussion forums for AI topics
            - Marketplace: Buy and sell AI solutions
            - Team Dashboard: Team management features (Basic & Pro tier)
            - Collaboration Hub: Work together on AI projects (Basic & Pro tier)
            - Workflow Designer: Create custom AI workflows (Basic & Pro tier)
            - AI Studio: Build custom AI models (Pro tier only)
            - Model Marketplace: Buy and sell AI models (Pro tier only)
            - Business Insights: Analytics for AI projects (Pro tier only)
            - AI Assistant: Advanced AI chat assistant (Pro tier only)
            
            There are three tiers available:
            - Freemium: Basic access, limited tool access
            - Basic: Team collaboration, more tools, better support
            - Pro: All features, unlimited access, custom models`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    // Parse the OpenAI response
    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const botResponse = data.choices[0].message.content;
    
    // Store in chat history if user is authenticated
    if (user_id) {
      try {
        // Check if pro_chat_history table exists, if not create it
        const { error: tableError } = await supabase.rpc('check_table_exists', { 
          table_name: 'pro_chat_history' 
        });
        
        if (tableError) {
          // Create the table if it doesn't exist
          await supabase.rpc('create_chat_history_table');
        }
        
        // Save the chat to history
        await supabase
          .from('pro_chat_history')
          .insert({
            user_id: user_id,
            message: message,
            bot_response: botResponse,
            metadata: { intent: detectIntent(message) }
          });
      } catch (error) {
        console.error('Error saving to chat history:', error);
        // Continue even if saving to history fails
      }
    }

    return new Response(
      JSON.stringify({ response: botResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Simple intent detection function
function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('take me to') || lowerMessage.includes('navigate to') || lowerMessage.includes('go to')) {
    return 'navigation';
  } else if (lowerMessage.includes('tier') || lowerMessage.includes('plan') || lowerMessage.includes('pricing')) {
    return 'pricing';
  } else if (lowerMessage.includes('how do i') || lowerMessage.includes('how to')) {
    return 'howto';
  } else if (lowerMessage.includes('what is') || lowerMessage.includes('what are')) {
    return 'definition';
  } else {
    return 'general';
  }
}
