
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const openAIKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, userId, previousMessages = [] } = await req.json()

    // Create API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant for the Digital Intelligence Marketplace (DIM) platform. 
            Your role is to help users navigate the platform, learn about AI tools, and understand different features.
            You should be helpful, friendly, and concise in your responses. If you don't know something, admit it.
            Focus on helping with:
            1. Explaining platform features (AI Tools, Learning Hub, Community features)
            2. Explaining differences between tiers (Freemium, Basic, Pro)
            3. Navigating to different sections
            4. Understanding AI concepts and tools
            5. Providing learning resources
            
            Current user information:
            - User ID: ${userId || 'Guest'}
            
            Today's date is ${new Date().toISOString().split('T')[0]}.`
          },
          ...previousMessages,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response from OpenAI')
    }

    const botResponse = data.choices[0].message.content

    // If we have a user ID, store the chat history
    // We'll implement this in the frontend
    
    return new Response(
      JSON.stringify({ 
        response: botResponse,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in chatbot function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during the request',
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
