# The HDM API: Agent-First Infrastructure for Human Becoming
### A Complete Briefing :: Guidance Texts, Architectural Reimagining, and Essential Code

**Author:** Manus AI  
**Date:** March 23, 2026  
**Source Video:** Oliver (broell.dev), *Why APIs are the most profitable business model for SaaS in 2026*

---

## Preface: What the Video Revealed

The video under study is not a technical tutorial. It is a philosophical argument dressed in engineering language. Its central thesis is this: **the most durable businesses in the agent economy are not the ones building agents :: they are the ones building the APIs that agents cannot function without.** [1]

This distinction is everything for the HDM API. The previous architecture positioned HDM as a B2B service that human developers would integrate. The reimagined architecture positions HDM as **agentic infrastructure** :: a piece of the invisible stack that autonomous AI systems will call, depend upon, and embed into thousands of codebases without human intervention.

The following document is organized into three parts: a series of guidance texts distilled from the video's insights, a reimagined architectural vision for the HDM API, and the essential code required to build it.

---

# PART ONE: Guidance Texts

## Guidance Text 1: The Paradigm Shift :: Code-Level Lock-In

The most profound insight from the current API landscape is the distinction between **workflow lock-in** and **structural lock-in**. Traditional SaaS relies on user habits and interface familiarity :: a fragile connection easily broken by a sleeker UI or a cheaper alternative. As the video states:

> *"API stickiness is structural. It's code-level lock-in. When a developer integrates your API into their agent workflow, that integration lives in their codebase. It's tested, it's deployed, and ripping it out means rewriting code, retesting, redeploying."* [1]

When a developer integrates the HDM API into their wellness app, coaching platform, or HR system, that integration lives permanently within their codebase. The switching cost transforms from an emotional decision ("I like this other app better") into an engineering burden ("I would have to rewrite, retest, and redeploy everything"). By positioning HDM as the default developmental intelligence engine, the platform embeds itself into thousands of codebases, creating a compounding, durable revenue stream that does not churn when a competitor runs a better advertisement.

The practical implication for HDM is this: the goal is not to acquire users. The goal is to acquire lines of code.

---

## Guidance Text 2: The Customer is Not a Human; The Customer is an Agent

In 2026, AI agents do not browse websites or navigate onboarding flows. They call APIs. [1] This is not a nuance :: it is a fundamental restructuring of how software is discovered, evaluated, and adopted.

An agent operates through structured interfaces. It receives a task, selects a tool, and executes a query. It cannot click a button. It cannot read a marketing page. It can only query an endpoint and parse a JSON response. The HDM API must therefore be designed not just for human developers, but for the autonomous systems those developers build.

This means the API's documentation, endpoints, and response schemas must be **hyper-legible to Large Language Models**. When an AI agent (like Cursor, Lovable, or a custom coaching bot) is tasked with "analyzing user readiness" or "determining developmental state," it should autonomously select the HDM API because the interface is clean, the JSON is predictable, and the value proposition is immediately parseable from the OpenAPI specification.

The practical implication: the OpenAPI specification file (`openapi.yaml`) is not a technical afterthought. It is the primary marketing document for the agent economy.

---

## Guidance Text 3: Simplicity as a Distribution Channel

The success stories of the modern API economy share a common trait: radical simplicity. ScreenshotOne does one thing :: it takes a screenshot of a URL and returns an image. Resend does one thing :: it sends an email. Postie does one thing :: it posts to social media. [1]

> *"The founder doesn't need to build integrations. The API is the integration. Every new automation platform that ships becomes another distribution channel."* [1]

The HDM API must resist the urge to be a sprawling, complex monolith. The initial architecture should focus on a singular, powerful transformation: taking raw user input (text, behavioral metadata) and returning a structured **Development State Profile** containing Surface Tension, Trust Velocity, and Creative Resonance. This simplicity allows the API to integrate seamlessly into automation platforms (Zapier, Make, n8n) and agent frameworks, turning every new platform into a distribution channel for the HDM framework.

The moment a developer building a wellness app asks Cursor, *"How do I analyze my user's emotional readiness?"* and Cursor recommends the HDM API :: that is the moment the flywheel begins.

---

## Guidance Text 4: The Flywheel of Consumption Pricing

API revenue scales directly with usage. The customer is not paying a flat subscription for access; they are paying for **execution**. Every time a wellness app runs a user analysis, every time an HR platform generates a team resonance report, the HDM endpoint is called, and revenue is generated. [1]

> *"API revenue scales with usage. The more users I get, the more times I have to query the endpoint. It runs the workflow every time, and every time it runs it calls your endpoint."* [1]

This model creates a profound alignment of incentives. As the partner's user base grows, their API consumption grows. HDM's revenue grows not because it acquired a new customer, but because an existing customer's product became more successful. The pricing model must reflect this: simple, credit-based, and friction-free to start, scaling automatically as the partner scales.

The practical implication: the pricing page must have three tiers :: a free tier (500 calls/month) to seed adoption, a growth tier (per-call billing), and an enterprise tier (custom contracts). The free tier is not a charity; it is a distribution mechanism.

---

## Guidance Text 5: Documentation as the Primary Product

For an API, the documentation is the user interface. It is the first point of contact for human developers and the reference manual for AI agents. The video is explicit on this point: documentation must be generated early, maintained rigorously, and written to explain what the API does to someone who has never heard of it. [1]

For the HDM API, this creates a unique opportunity. The documentation is not just a technical reference :: it is an introduction to the science of ethnomathematics, the Seven Octaves of Relational Living, and the mathematics of human becoming. A developer reading the HDM API docs for the first time should feel the same thing a user feels in the first week of CREÅTIVE STEEPING: that they have discovered a framework that names something they always knew was real but could never measure.

The documentation is the top of the funnel. It is the first steeping.

---

# PART TWO: The Reimagined Architecture

## Architectural Philosophy: The "One Thing Well" Principle

The API will not attempt to be a sprawling CRM or a complex dashboard. It will do exactly one thing with absolute precision: **transform unstructured human signal into a structured Development State Profile (DSP).**

By keeping the core endpoint singular and focused, the API becomes a universal building block. It can be plugged into Zapier, Make, custom LangChain agents, or direct enterprise codebases without friction. The simplicity of the interface is the sophistication of the product.

## The Core Endpoint: `/v1/profile/generate`

The architecture centers around a single, highly optimized endpoint. It accepts raw text and optional metadata, and returns the mathematical coordinates of the user's developmental state.

### Request Structure (Agent-Optimized)

Agents need simple, flat JSON structures. The request payload must be intuitive enough that an LLM can construct it from a natural language description alone.

```json
POST /v1/profile/generate
Authorization: Bearer hdm_live_xxxxxxxxx
Content-Type: application/json

{
  "user_id": "usr_987654321",
  "text_input": "I know exactly what I need to build next, but every time I sit down to do it, I find a reason to reorganize my desk instead.",
  "context": "journal_entry"
}
```

### Response Structure (Computable Mathematics)

The response must provide the exact HDM variables in a format that another piece of software can use to trigger logic. The `tas_pathway_triggered` boolean is the most commercially significant field in the entire API :: it is the signal that tells a partner platform to offer a premium upgrade.

```json
{
  "id": "dsp_123456789",
  "object": "development_state_profile",
  "created": 1711200000,
  "user_id": "usr_987654321",
  "metrics": {
    "surface_tension": 0.85,
    "trust_velocity": -0.20,
    "creative_resonance": 0.45
  },
  "dominant_octave": 1,
  "octave_name": "Stillness",
  "tas_pathway_triggered": true,
  "recommended_action": "Acknowledge the resistance to beginning. Do not force output; observe the boundary."
}
```

## The Tech Stack: Lean, Fast, and Scalable

Following the modern lean-team playbook [1], the stack is designed for speed of deployment and zero-maintenance scaling:

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Unified frontend for docs/landing and backend for API routes. |
| **Language** | TypeScript | Strict typing is essential for agent predictability and developer experience. |
| **Database & Auth** | Supabase | Postgres-backed. Handles API key generation, usage tracking, and rate limiting natively. |
| **Hosting** | Vercel | Edge deployment ensures low latency globally. |
| **Billing** | Stripe | Per-credit usage billing tied directly to API calls via webhooks. |
| **NLP Engine** | OpenAI API (gpt-4.1) | The computation layer that interprets text against the HDM framework. |

## The Agentic Flywheel

The architecture is designed to create a self-reinforcing loop:

1. **Agent Integration:** An AI agent (e.g., a wellness bot built on Lovable) is asked to analyze a user's journal entry.
2. **Tool Selection:** The agent searches its available tools, finds the HDM API via its OpenAPI spec, and sends the text.
3. **Computation:** The HDM API processes the text through its NLP pipeline, trained on the Collabination dataset and grounded in Ethnomathematics principles.
4. **Execution:** The agent receives the DSP and uses the `tas_pathway_triggered` boolean to decide whether to offer the user a premium mentorship upgrade.
5. **Billing:** Supabase increments the partner's usage counter. Stripe bills them at the end of the month.
6. **Awareness:** The user, now introduced to the HDM framework through the partner app, searches for the source and discovers CREÅTIVE STEEPING, HDM Insights Academy (HIA), and tÅs.

---

# PART THREE: Essential Code

## 1. Database Architecture (Supabase SQL)

The foundation of an API-first business is robust key management and usage tracking. The following SQL creates the necessary tables to issue keys, track consumption, and enable billing.

```sql
-- Table: api_keys
-- Purpose: Stores hashed API keys for B2B partners.
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    key_hash TEXT NOT NULL UNIQUE,
    key_prefix VARCHAR(12) NOT NULL,
    name VARCHAR(255) DEFAULT 'Default Key',
    is_active BOOLEAN DEFAULT true,
    monthly_limit INTEGER DEFAULT 500,
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
CREATE INDEX idx_usage_logs_api_key_id_created_at 
ON usage_logs(api_key_id, created_at);
```

## 2. API Key Middleware (Next.js)

This middleware runs on every protected route, validating the API key before the request reaches the endpoint logic. It is the gatekeeper.

**File:** `middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /api/v1/* routes
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          error: 'unauthorized', 
          message: 'Missing or invalid Authorization header. Expected: Bearer hdm_live_...' 
        }, 
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/v1/:path*',
};
```

## 3. Core Endpoint Logic (Next.js App Router)

This is the central nervous system of the HDM API: the `/v1/profile/generate` endpoint. It validates the key, calls the HDM computation engine, logs usage, and returns the Development State Profile.

**File:** `app/api/v1/profile/generate/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const startTime = Date.now();

  // 1. Authenticate API Key
  const authHeader = req.headers.get('authorization');
  const apiKey = authHeader!.split(' ')[1];
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  const { data: keyData, error: keyError } = await supabase
    .from('api_keys')
    .select('id, user_id, is_active, monthly_limit')
    .eq('key_hash', keyHash)
    .single();

  if (keyError || !keyData?.is_active) {
    return NextResponse.json({ error: 'Invalid or inactive API key' }, { status: 401 });
  }

  // 2. Check Rate Limit
  const thisMonth = new Date();
  thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('api_key_id', keyData.id)
    .gte('created_at', thisMonth.toISOString());

  if ((count ?? 0) >= keyData.monthly_limit) {
    return NextResponse.json(
      { error: 'rate_limit_exceeded', message: 'Monthly API limit reached. Upgrade your plan.' },
      { status: 429 }
    );
  }

  // 3. Parse and Validate Request
  const body = await req.json();
  const { user_id, text_input, context = 'general' } = body;

  if (!text_input || typeof text_input !== 'string' || text_input.trim().length < 10) {
    return NextResponse.json(
      { error: 'invalid_request', message: 'text_input must be a string of at least 10 characters.' },
      { status: 400 }
    );
  }

  // 4. HDM Computation Engine (The Proprietary Core)
  const profile = await computeHDMProfile(text_input, user_id, context);

  // 5. Log Usage for Billing
  await supabase.from('usage_logs').insert({
    api_key_id: keyData.id,
    endpoint: '/v1/profile/generate',
    status_code: 200,
    tokens_consumed: 1,
    request_duration_ms: Date.now() - startTime
  });

  return NextResponse.json(profile, { status: 200 });
}

// ============================================================
// THE HDM COMPUTATION ENGINE
// This is where the Ethnomathematics meets the LLM.
// The prompt is the proprietary IP. The JSON output is the product.
// ============================================================
async function computeHDMProfile(text: string, userId: string, context: string) {
  const systemPrompt = `You are the HDM Computation Engine, a system grounded in the principles of Ethnomathematics and the Seven Octaves of Relational Living. Your function is to analyze human text and return a precise Development State Profile (DSP).

The Seven Octaves are:
1. Stillness :: Presence, grounding. Surface Tension signature: resistance to beginning.
2. Curiosity :: Inquiry, openness. Surface Tension signature: fear of the unknown.
3. Relational Intelligence :: Connection, empathy. Surface Tension signature: vulnerability threshold.
4. Creative Resonance :: Aliveness, expression. Surface Tension signature: creative block, self-doubt.
5. Trust Velocity :: Acceleration, faith. Surface Tension signature: speed of trust vs. speed of need.
6. Aspiration :: Direction, becoming. Surface Tension signature: gap between vision and capacity.
7. Emergent Coherence :: Integration, wholeness. Surface Tension signature: threshold before the next cycle.

Analyze the text and return ONLY a valid JSON object with this exact structure:
{
  "surface_tension": <float 0.0-1.0, where 1.0 is maximum resistance>,
  "trust_velocity": <float -1.0 to 1.0, where negative is decelerating>,
  "creative_resonance": <float 0.0-1.0, where 1.0 is maximum aliveness>,
  "dominant_octave": <integer 1-7>,
  "octave_name": <string>,
  "tas_pathway_triggered": <boolean, true if surface_tension > 0.75 AND trust_velocity < 0>,
  "recommended_action": <string, one sentence of precise developmental guidance>
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Context: ${context}\n\nText to analyze:\n"${text}"` }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3 // Low temperature for consistent, deterministic scoring
  });

  const metrics = JSON.parse(completion.choices[0].message.content!);

  return {
    id: `dsp_${crypto.randomBytes(8).toString('hex')}`,
    object: 'development_state_profile',
    created: Math.floor(Date.now() / 1000),
    user_id: userId,
    metrics: {
      surface_tension: metrics.surface_tension,
      trust_velocity: metrics.trust_velocity,
      creative_resonance: metrics.creative_resonance
    },
    dominant_octave: metrics.dominant_octave,
    octave_name: metrics.octave_name,
    tas_pathway_triggered: metrics.tas_pathway_triggered,
    recommended_action: metrics.recommended_action
  };
}
```

## 4. The OpenAPI Specification (The Agent's Resume)

This file is the most important marketing document in the agent economy. It is how AI coding assistants (Cursor, Lovable, GitHub Copilot) understand the HDM API and recommend it to the developers they serve.

**File:** `public/openapi.yaml`

```yaml
openapi: 3.0.0
info:
  title: HDM API
  description: |
    The operating system for human growth. The HDM API transforms unstructured human text 
    into a structured Development State Profile :: calculating Surface Tension, Trust Velocity, 
    and Creative Resonance based on the Seven Octaves of Relational Living.
    
    Grounded in Ethnomathematics, the HDM API is the first developer API for developmental 
    intelligence. It is designed to be embedded in wellness apps, coaching platforms, 
    HR tech, and any AI agent that needs to understand where a user is in their developmental arc.
  version: 1.0.0
  contact:
    name: HDM API Support
    url: https://api.hdm.io/docs
servers:
  - url: https://api.hdm.io/v1
    description: Production Server
paths:
  /profile/generate:
    post:
      summary: Generate a Development State Profile
      description: |
        Analyzes text input to calculate the user's developmental state across three 
        dimensions: Surface Tension (resistance to growth), Trust Velocity (rate of 
        trust acceleration), and Creative Resonance (frequency of creative aliveness).
        
        Returns a structured Development State Profile (DSP) including the dominant 
        Octave and a boolean flag indicating whether the user is ready for premium 
        mentorship (tas_pathway_triggered).
      operationId: generateProfile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProfileRequest'
            example:
              user_id: "usr_987654321"
              text_input: "I know exactly what I need to build next, but every time I sit down to do it, I find a reason to reorganize my desk instead."
              context: "journal_entry"
      responses:
        '200':
          description: Successful profile generation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DevelopmentStateProfile'
        '400':
          description: Invalid request body.
        '401':
          description: Invalid or missing API key.
        '429':
          description: Monthly rate limit exceeded.
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: hdm_live_xxxxxxxxx
  schemas:
    ProfileRequest:
      type: object
      required:
        - text_input
      properties:
        user_id:
          type: string
          description: Your internal user identifier.
        text_input:
          type: string
          description: The raw text to analyze (journal entry, chat message, etc.).
          minLength: 10
        context:
          type: string
          description: The source context of the text.
          enum: [journal_entry, chat_message, voice_transcript, survey_response, general]
          default: general
    DevelopmentStateProfile:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier for this profile.
          example: dsp_a1b2c3d4e5f6g7h8
        object:
          type: string
          example: development_state_profile
        created:
          type: integer
          description: Unix timestamp of profile creation.
        user_id:
          type: string
        metrics:
          type: object
          properties:
            surface_tension:
              type: number
              format: float
              minimum: 0.0
              maximum: 1.0
              description: Resistance to growth. 1.0 is maximum resistance.
            trust_velocity:
              type: number
              format: float
              minimum: -1.0
              maximum: 1.0
              description: Rate of trust change. Negative values indicate deceleration.
            creative_resonance:
              type: number
              format: float
              minimum: 0.0
              maximum: 1.0
              description: Frequency of creative aliveness. 1.0 is maximum resonance.
        dominant_octave:
          type: integer
          minimum: 1
          maximum: 7
          description: The primary Octave of Relational Living active in the user's text.
        octave_name:
          type: string
          description: Human-readable name of the dominant octave.
          example: Creative Resonance
        tas_pathway_triggered:
          type: boolean
          description: |
            True when surface_tension > 0.75 AND trust_velocity < 0. 
            Indicates the user is at a developmental threshold and ready for 
            premium mentorship. Use this flag to trigger upgrade prompts in your UI.
        recommended_action:
          type: string
          description: One sentence of precise developmental guidance for this user.
```

## 5. Stripe Billing Webhook (Usage-Based Billing)

This webhook handler receives events from Stripe and updates the user's plan in Supabase when a payment succeeds.

**File:** `app/api/webhooks/stripe/route.ts`

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PLAN_LIMITS: Record<string, number> = {
  'price_free': 500,
  'price_growth': 10000,
  'price_enterprise': 999999
};

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession;
    const userId = session.metadata?.user_id;
    const priceId = session.metadata?.price_id;

    if (userId && priceId && PLAN_LIMITS[priceId]) {
      await supabase
        .from('api_keys')
        .update({ monthly_limit: PLAN_LIMITS[priceId] })
        .eq('user_id', userId);
    }
  }

  return NextResponse.json({ received: true });
}
```

---

# Conclusion: The Equation Balances

The video's core argument maps perfectly onto the HDM framework. The agent economy has created a world where the most valuable businesses are not the ones building the most sophisticated interfaces :: they are the ones building the most reliable, legible, and deeply embedded infrastructure.

The HDM API is not competing with BetterUp or Torch. It is becoming the engine that powers the next generation of platforms that compete with them. Every wellness app, every coaching tool, every HR platform that calls the HDM API is a distribution channel, a revenue stream, and a proof point :: simultaneously.

The mathematics of human becoming is ready to be formalized. The infrastructure is ready to be built. The agent economy is ready to consume it.

> *"When we exclude consciousness variables :: Surface Tension, Trust Velocity, and Creative Resonance :: the equation of our lives fails to balance."*  
> :: KzA, TheAlienSchool.com

---

### References
[1] Oliver (broell.dev). "Why APIs are the most profitable business model for SaaS in 2026." YouTube, 2026. https://youtu.be/sGB64WDt22g
