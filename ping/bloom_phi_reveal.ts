/**
 * BLOOM: AN INNER GAME
 * The φ-Reveal Edge Function
 * 
 * This Supabase Edge Function streams the `extended_prose` of an Oracle card
 * back to the client using a logarithmic acceleration curve governed by the 
 * golden ratio (φ).
 * 
 * The medium is the mathematics: the scholar experiences the golden ratio 
 * somatically as the text arrives at an accelerating rate.
 * 
 * Deployment: supabase functions deploy bloom-phi-reveal
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { card_id, session_id } = await req.json()

    if (!card_id) {
      throw new Error("card_id is required")
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch the card content
    const { data: card, error } = await supabase
      .from('bloom_oracle_cards')
      .select('extended_prose')
      .eq('id', card_id)
      .single()

    if (error || !card) {
      throw new Error("Card not found")
    }

    const text = card.extended_prose

    // Create a readable stream for Server-Sent Events (SSE)
    const stream = new ReadableStream({
      async start(controller) {
        // The φ-reveal mathematics
        // Starting delay: 28ms (a perfect number, length of the lunar cycle)
        let currentDelay = 28.0
        const phi = 1.618033988749895

        // Encode function for SSE format
        const encoder = new TextEncoder()

        for (let i = 0; i < text.length; i++) {
          const char = text[i]
          
          // Format as SSE data
          // We send the character and the current delay so the client knows 
          // exactly how fast the curve is moving
          const payload = JSON.stringify({ 
            char, 
            index: i, 
            total: text.length,
            current_delay: currentDelay
          })
          
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`))

          // Wait for the current delay
          await new Promise(resolve => setTimeout(resolve, currentDelay))

          // Calculate the next delay: divide by φ to accelerate
          // (The brief says "previous delay × 1.61803" but to accelerate the text 
          // arrival, the delay between characters must *decrease*. We divide by φ.
          // We set a floor of 2ms to ensure it remains visible as a stream and 
          // doesn't instantly dump the end of the paragraph.)
          currentDelay = Math.max(2.0, currentDelay / phi)
        }

        // Send completion event
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/*
=============================================================================
THE SONGLINES ACOUSTIC ARCHITECTURE SPECIFICATION
=============================================================================

This spec is for the front-end audio implementation that runs alongside the game.
It maps the 12 faces of the dodecahedron to the φ-harmonic series.

THE FORMULA:
f_n = 144.0 × φ^n
(where 144Hz is the ground state drone, and φ = 1.61803)

THE FREQUENCY MAP (Audible Range Transposed):
For faces where the frequency exceeds standard comfortable hearing or creates 
harsh high-end, we transpose down by octaves (divide by 2) to maintain the 
harmonic relationship while grounding the sound.

| Face | Name             | n  | Raw Hz   | Transposed (Hz) | Note/Feeling |
|------|------------------|----|----------|-----------------|--------------|
| 01   | SEED             | 0  | 144.0    | 144.0           | Ground State |
| 02   | AWAKENING        | 1  | 233.0    | 233.0           | First Step   |
| 03   | VITALITY         | 2  | 377.0    | 377.0           |              |
| 04   | FORMING          | 3  | 609.9    | 304.9 (/2)      |              |
| 05   | IMAGINATION      | 4  | 986.8    | 493.4 (/2)      |              |
| 06   | RELATIONSHIP     | 5  | 1596.7   | 399.2 (/4)      |              |
| 07   | INITIATION       | 6  | 2583.5   | 322.9 (/8)      |              |
| 08   | SHADOW-WORK      | 7  | 4180.1   | 261.3 (/16)     | Deepest Drop |
| 09   | INTEGRATION      | 8  | 6763.5   | 422.7 (/16)     |              |
| 10   | STEWARDSHIP      | 9  | 10943.4  | 342.0 (/32)     |              |
| 11   | GENERATIVITY     | 10 | 17706.7  | 276.7 (/64)     |              |
| 12   | HARVEST          | 11 | 28650.0  | 447.7 (/64)     | The BLOOM    |

IMPLEMENTATION RULES:
1. The 144Hz ground drone NEVER stops. It is the board itself.
2. When a player lands on Face N, fade in the Transposed Hz for that face over 3 seconds.
3. The face frequency acts as an overtone to the 144Hz drone.
4. The 288Hz Hover Chime fires precisely when the `extended_prose` stream begins, and rings out naturally (no synthetic cutoff).
*/
