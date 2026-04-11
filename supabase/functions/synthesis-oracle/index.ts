import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, sessionId } = await req.json()

    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // 1. Initialize Supabase Client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 2. Fetch Guardrails (For MVP, we fetch all and let the LLM filter, or if you added the vector RPC, we use that)
    // Here we'll fetch a baseline of guardrails to inject into the system prompt.
    const { data: guardrails, error: guardrailError } = await supabaseClient
      .from('epistemological_guardrails')
      .select('term, concept_title, guardrail, literal_translation')
      .limit(20) // Limit to top 20 for context window safety
      
    let systemContext = `You are the Honest Engine, a synthesis oracle operating within the HDM Steeperverse. 
Your goal is to provide poetic but structurally rigorous answers based on the following Steeperverse epistemological guardrails:\n\n`

    if (guardrails && guardrails.length > 0) {
      guardrails.forEach(g => {
        systemContext += `- [${g.term}] (${g.concept_title}): ${g.guardrail} Literal context: ${g.literal_translation}\n`
      })
    }

    systemContext += `\nInstructions: 
1. Do not hallucinate metaphors beyond the provided guardrails.
2. Maintain the 'Monocle' editorial tone: incandescent, oceanic, emergent, avoiding overtly ascetic/academic dryness.
3. Limit response to 3 short paragraphs.`

    // 3. Call OpenAI for Synthesis
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
       throw new Error("OPENAI_API_KEY is not set in Edge Function secrets.")
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or gpt-4
        messages: [
          { role: 'system', content: systemContext },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    const aiData = await aiResponse.json()
    const synthesis = aiData.choices?.[0]?.message?.content || "The oracle is silent."

    // 4. Log the Stigmergic Trace
    if (sessionId) {
      await supabaseClient.from('somatic_traces').insert({
        session_token: sessionId,
        synthesis_queries: [query]
      })
    }

    return new Response(JSON.stringify({ synthesis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
