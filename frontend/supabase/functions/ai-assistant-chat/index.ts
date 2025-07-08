
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-ASSISTANT-CHAT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      logStep("ERROR: OpenAI API key not configured");
      return new Response(JSON.stringify({ 
        error: "OpenAI API key not configured. Please set the OPENAI_API_KEY secret in Supabase." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Validate API key format
    if (!openAIApiKey.startsWith('sk-') || openAIApiKey.length < 20) {
      logStep("ERROR: Invalid OpenAI API key format", { keyPrefix: openAIApiKey.substring(0, 10) });
      return new Response(JSON.stringify({ 
        error: "Invalid OpenAI API key format. Please check your OPENAI_API_KEY secret." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const { messages } = await req.json();
    
    if (!Array.isArray(messages) || messages.length === 0) {
      logStep("ERROR: Invalid messages format");
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Sending request to OpenAI", { messageCount: messages.length });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logStep("OpenAI API error", { status: response.status, error: errorText });
      
      if (response.status === 401) {
        return new Response(JSON.stringify({ 
          error: "OpenAI API authentication failed. Please check your API key." 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        });
      }
      
      return new Response(JSON.stringify({ 
        error: "OpenAI API error",
        details: errorText 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: response.status,
      });
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "I'm having trouble generating a response right now.";

    logStep("Response generated successfully");

    return new Response(JSON.stringify({ content: generatedText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    logStep("ERROR in ai-assistant-chat", { message: error instanceof Error ? error.message : String(error) });
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
