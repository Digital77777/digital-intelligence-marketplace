
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});
const openai = new OpenAIApi(configuration);

// Initialize Supabase client
const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  try {
    // Get JWT token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify the JWT and get the user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token or user not found" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if this is a query or history request
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    if (path === 'history') {
      // Return chat history for the user
      const { data, error } = await supabaseClient
        .from('pro_chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      
    } else {
      // Process a chat query
      const { message } = await req.json();
      
      if (!message) {
        return new Response(JSON.stringify({ error: "Missing message parameter" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Check if we need to navigate
      const navigationIntent = checkNavigationIntent(message);
      
      // Get user profile info for context
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      // Setup system message with user context
      const systemMessage = `You are a Pro-tier AI Assistant for the Digital Intelligence Marketplace (DIM). 
      Help users navigate the platform, answer questions about AI tools, and provide personalized recommendations. 
      User tier: ${profile?.tier || 'Unknown'}.`;
      
      // Send to OpenAI
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message }
        ],
      });
      
      const responseContent = completion.data.choices[0].message?.content || "I'm sorry, I couldn't generate a response";
      
      // Save to chat history
      await supabaseClient
        .from('pro_chat_history')
        .insert({
          user_id: user.id,
          message: message,
          bot_response: responseContent,
          metadata: navigationIntent ? { intent: 'navigation', destination: navigationIntent } : null
        });
      
      return new Response(JSON.stringify({
        response: responseContent,
        navigation_intent: navigationIntent
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Helper function to check for navigation intent in the message
function checkNavigationIntent(message: string): string | null {
  const lowerMessage = message.toLowerCase();
  
  // Map keywords to routes
  const navigationMappings: Record<string, string> = {
    'ai studio': '/ai-studio',
    'ai tools': '/ai-tools',
    'tools directory': '/ai-tools-directory',
    'marketplace': '/marketplace',
    'learning hub': '/learning-hub',
    'take me to': '',  // Special case handled below
    'navigate to': '', // Special case handled below
    'open': '', // Special case handled below
  };
  
  // First check for specific navigation phrases
  for (const [phrase, route] of Object.entries(navigationMappings)) {
    if (route && lowerMessage.includes(phrase)) {
      return route;
    }
  }
  
  // Then handle special cases with more complex parsing
  const specialPhrases = ['take me to', 'navigate to', 'open'];
  for (const phrase of specialPhrases) {
    if (lowerMessage.includes(phrase)) {
      // Extract what comes after the phrase
      const parts = lowerMessage.split(phrase);
      if (parts.length > 1 && parts[1].trim()) {
        const destination = parts[1].trim();
        
        // Map common destinations
        if (destination.includes('profile')) return '/profile';
        if (destination.includes('studio')) return '/ai-studio';
        if (destination.includes('tools')) return '/ai-tools';
        if (destination.includes('learning')) return '/learning-hub';
        if (destination.includes('community')) return '/community';
        if (destination.includes('marketplace')) return '/marketplace';
        if (destination.includes('pricing')) return '/pricing';
        if (destination.includes('discovery')) return '/discovery';
      }
    }
  }
  
  return null;
}
