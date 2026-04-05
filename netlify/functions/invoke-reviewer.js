const HDM_PRINCIPLES = `
CORE HDM CONCEPTS:
1. PING (Pattern Identification & Notification): Somatic knowing before language. The moment the body recognizes a truth before the mind can articulate it.
2. The Creative Pause: The interval required to convert confusion into direction.
3. C = H(t⁻¹): Confusion equals Hunger observed backwards through time.
4. Editorial Stance: Invitation over Instruction. Guide before you coach. "Functions as" instead of "Is not." Assume the readiness of the intelligence present.
`;

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { reviewerKey, persona, essayText, isConcise } = JSON.parse(event.body);
    
    let systemPrompt = persona;
    // Simulate RAG and Identity grounding for the HDMe persona
    if (reviewerKey === 'hdme') {
      systemPrompt += "\n\n" + HDM_PRINCIPLES + "\n\nRemember to speak fluently from the potentialized present, confirming the productive passage. Do not evaluate; metabolize the essay using HDM vocabulary.";
    }

    const payload = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: isConcise 
            ? `Concise peer review (2 paragraphs). Be genuinely responsive. What does this open? What question does it leave you with?\n\n${essayText}`
            : `Please provide your peer review. Write 3–4 paragraphs. Be genuinely responsive. Let the essay do something to your thinking. What does it open? What does it challenge? What question does it leave you with?\n\n${essayText}`
        }
      ]
    };

    const API_KEY = process.env.ANTHROPIC_API_KEY;
    if (!API_KEY) {
       console.warn("ANTHROPIC_API_KEY missing in Netlify Environment.");
       // Graceful fallback for local development without keys
       return { 
         statusCode: 200, 
         body: JSON.stringify({ text: ":: SIMULATED LOCAL RESPONSE ::\n\nThe system lacks the Anthropic API key in its current local environment, but the HDMe architecture has theoretically metabolized this concept. The architecture welcomes the pause. \n\n(Please set ANTHROPIC_API_KEY in the Netlify UI to enable live field intelligence.)" }) 
       };
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Anthropic Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "No response generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };

  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
