# HDM API: Essential Code and Architectural Designs

**Author:** Manus AI  
**Date:** March 23, 2026

This document provides the essential code scaffolding and database architecture required to bring the reimagined HDM API to life. It follows the lean, agent-first methodology [1], utilizing Next.js, Supabase, and Vercel.

## 1. Database Architecture (Supabase SQL)

The foundation of an API-first business is robust key management and usage tracking. The following SQL creates the necessary tables to issue keys, track consumption, and bill partners.

```sql
-- Table: api_keys
-- Purpose: Stores the hashed API keys for B2B partners.
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix VARCHAR(12) NOT NULL, -- e.g., 'hdm_live_...'
    name VARCHAR(255) DEFAULT 'Default Key',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: usage_logs
-- Purpose: Tracks every API call for per-credit billing and analytics.
CREATE TABLE usage_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    endpoint VARCHAR(255) NOT NULL,
    status_code INTEGER NOT NULL,
    tokens_consumed INTEGER DEFAULT 1,
    request_duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast usage aggregation
CREATE INDEX idx_usage_logs_api_key_id_created_at ON usage_logs(api_key_id, created_at);
```

## 2. Core Endpoint Logic (Next.js App Router)

This is the central nervous system of the HDM API: the `/v1/profile/generate` endpoint. It validates the API key, processes the text (simulated here, but this is where the proprietary HDM NLP pipeline connects), logs the usage, and returns the Development State Profile.

**File:** `app/api/v1/profile/generate/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    // 1. Authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }

    const apiKey = authHeader.split(' ')[1];
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

    // Verify key in Supabase
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, user_id, is_active')
      .eq('key_hash', keyHash)
      .single();

    if (keyError || !keyData || !keyData.is_active) {
      return NextResponse.json({ error: 'Invalid or inactive API key' }, { status: 401 });
    }

    // 2. Parse Request Body
    const body = await req.json();
    const { user_id, text_input, context } = body;

    if (!text_input || typeof text_input !== 'string') {
      return NextResponse.json({ error: 'text_input is required and must be a string' }, { status: 400 });
    }

    // 3. HDM Computation Engine (The Proprietary Core)
    // In production, this calls the internal ML model. Here we simulate the deterministic output.
    const profile = await computeHDMProfile(text_input);

    // 4. Log Usage for Billing
    const duration = Date.now() - startTime;
    await supabase.from('usage_logs').insert({
      api_key_id: keyData.id,
      endpoint: '/v1/profile/generate',
      status_code: 200,
      tokens_consumed: 1, // Or base this on text length
      request_duration_ms: duration
    });

    // 5. Return Agent-Optimized Response
    return NextResponse.json(profile, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Simulated HDM Logic
async function computeHDMProfile(text: string) {
  // A placeholder for the Ethnomathematics NLP pipeline
  const isStuck = text.toLowerCase().includes('but') || text.toLowerCase().includes('hesitate');
  
  const surfaceTension = isStuck ? 0.85 : 0.30;
  const trustVelocity = isStuck ? -0.20 : 0.75;
  const creativeResonance = isStuck ? 0.45 : 0.90;
  
  const dominantOctave = isStuck ? 1 : 4;
  const octaveName = isStuck ? "Stillness" : "Creative Resonance";
  
  // Trigger tÅs pathway if surface tension is high and trust velocity is negative
  const triggerTas = surfaceTension > 0.8 && trustVelocity < 0;

  return {
    id: `dsp_${crypto.randomBytes(8).toString('hex')}`,
    object: "development_state_profile",
    created: Math.floor(Date.now() / 1000),
    metrics: {
      surface_tension: surfaceTension,
      trust_velocity: trustVelocity,
      creative_resonance: creativeResonance
    },
    dominant_octave: dominantOctave,
    octave_name: octaveName,
    tas_pathway_triggered: triggerTas,
    recommended_action: triggerTas 
      ? "Acknowledge the resistance to beginning. Do not force output; observe the boundary."
      : "Momentum is high. Proceed to next structural challenge."
  };
}
```

## 3. OpenAPI Specification (The Agent's Resume)

To ensure AI agents (like Lovable or Cursor) know exactly how to use the HDM API, we must provide an `openapi.yaml` file. This is how the API achieves structural lock-in.

**File:** `public/openapi.yaml`

```yaml
openapi: 3.0.0
info:
  title: HDM API
  description: The operating system for human growth. Calculate the developmental state of any user based on unstructured text and behavioral metadata.
  version: 1.0.0
servers:
  - url: https://api.hdm.io/v1
    description: Production Server
paths:
  /profile/generate:
    post:
      summary: Generate a Development State Profile
      description: Analyzes text input to calculate Surface Tension, Trust Velocity, and Creative Resonance.
      operationId: generateProfile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - text_input
              properties:
                user_id:
                  type: string
                  description: Unique identifier for the user in your system.
                text_input:
                  type: string
                  description: The raw text (journal entry, chat log) to analyze.
                context:
                  type: string
                  description: The context of the text (e.g., 'journal_entry', 'slack_message').
      responses:
        '200':
          description: Successful profile generation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DevelopmentStateProfile'
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
  schemas:
    DevelopmentStateProfile:
      type: object
      properties:
        id:
          type: string
        object:
          type: string
          example: development_state_profile
        metrics:
          type: object
          properties:
            surface_tension:
              type: number
              format: float
            trust_velocity:
              type: number
              format: float
            creative_resonance:
              type: number
              format: float
        dominant_octave:
          type: integer
        octave_name:
          type: string
        tas_pathway_triggered:
          type: boolean
          description: If true, the user is ready for premium mentorship.
```

## 4. The Flywheel in Action

By deploying this code, the HDM API achieves exactly what the agent economy demands [1]:
1. **Zero-Friction Integration:** A developer drops the API key into their `.env` file.
2. **Agent Legibility:** An AI agent reads the `openapi.yaml` and instantly understands how to pass data to the endpoint.
3. **Compounding Revenue:** Every time the agent calls `/v1/profile/generate`, the Supabase `usage_logs` table increments, and Stripe bills the partner. The API becomes a silent, indispensable utility deep within their codebase.

---

### References
[1] Oliver (broell.dev). "Why APIs are the most profitable business model for SaaS in 2026." YouTube, 2026.
