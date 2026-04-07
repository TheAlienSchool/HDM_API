# HDM API PLATFORM
## Developer Brief v1.0
### Prepared by Manus AI for THE ÅĻÏEN SCÖÕL (tÅs) | March 2026

---

## DOCUMENT OVERVIEW

This brief defines the technical architecture, product scope, integration model, and development roadmap for the **Human Development Mathematics (HDM) API Platform** :: the infrastructure layer of the tÅs ecosystem. It is intended for the lead developer, technical co-founder, or engineering team responsible for building the platform from the ground up.

---

## 1. PRODUCT VISION

The HDM API Platform is a **development intelligence infrastructure** that enables any digital product :: a journaling app, a writing tool, a coaching platform, a corporate L&D system :: to understand where its users are in their personal development arc and serve them accordingly.

The platform exposes the intellectual framework of Human Development Mathematics as a set of computable, API-accessible signals. These signals are derived from user inputs (text, behavioral patterns, self-assessments) and mapped against the HDM framework to produce a **Development State Profile (DSP)** :: a structured representation of where a user currently sits across the seven dimensions of the HDM model.

The DSP is the core output of the API. Everything else :: content recommendations, intervention triggers, threshold signals, growth trajectory projections :: is derived from it.

---

## 2. THE HDM FRAMEWORK (TECHNICAL TRANSLATION)

The HDM framework, as developed by KzA and THE ÅĻÏEN SCÖÕL, maps human development across seven primary dimensions, each corresponding to one of the Seven Octaves of Relational Living. For the purposes of the API, these dimensions are expressed as **quantifiable axes** with defined scoring ranges and behavioral/linguistic markers.

| Dimension | Octave | API Axis | Signal Type |
|---|---|---|---|
| Stillness | Octave 1 | `stillness_index` | Linguistic pattern analysis |
| Curiosity | Octave 2 | `curiosity_velocity` | Query depth + novelty seeking |
| Relational Coherence | Octave 3 | `relational_resonance` | Dialogue pattern analysis |
| Creative Resonance | Octave 4 | `creative_frequency` | Expression diversity + originality |
| Trust Velocity | Octave 5 | `trust_gradient` | Consistency + vulnerability markers |
| Purpose Alignment | Octave 6 | `purpose_coherence` | Goal-language alignment |
| Emergent Coherence | Octave 7 | `emergence_signal` | Integration across all axes |

The **Surface Tension Index** (`surface_tension_score`) is a composite signal derived from the gap between a user's `purpose_coherence` score and their `trust_gradient` score. A high Surface Tension score indicates a user who knows where they want to go but is experiencing significant resistance in getting there :: the precise condition that CREÅTIVE STEEPING and direct mentorship are designed to address.

---

## 3. CORE API ARCHITECTURE

### 3.1 Input Layer

The API accepts three types of input:

**Type A: Text Analysis Input**
Raw text submitted by the user (journal entries, writing samples, chat transcripts, self-assessments). The API processes this text through an NLP pipeline trained on HDM-annotated datasets to extract linguistic markers associated with each of the seven development dimensions.

```json
POST /api/v1/analyze/text
{
  "user_id": "string (required)",
  "text": "string (required, max 10,000 chars)",
  "context": "journal | writing | assessment | conversation",
  "timestamp": "ISO 8601"
}
```

**Type B: Behavioral Signal Input**
Structured behavioral data submitted by the integrating application (session duration, feature usage patterns, completion rates, return frequency). These signals are mapped to HDM dimensions using a behavioral translation layer.

```json
POST /api/v1/analyze/behavior
{
  "user_id": "string (required)",
  "signals": {
    "session_duration_minutes": "number",
    "sessions_last_30_days": "number",
    "completion_rate": "float (0-1)",
    "feature_depth_score": "float (0-1)",
    "return_interval_days": "number"
  }
}
```

**Type C: Self-Assessment Input**
Structured responses to HDM-designed assessment prompts. The API provides a library of validated assessment prompts that integrating applications can surface to users. Responses are scored and mapped to the HDM framework.

```json
POST /api/v1/analyze/assessment
{
  "user_id": "string (required)",
  "assessment_id": "string (from /api/v1/assessments library)",
  "responses": [
    { "prompt_id": "string", "response": "string", "response_time_ms": "number" }
  ]
}
```

---

### 3.2 Processing Layer

The processing layer consists of three components:

**Component 1: HDM Signal Engine**
The core NLP and behavioral analysis engine, trained on HDM-annotated datasets. This engine maps all three input types to the seven HDM dimensions and produces raw dimension scores (0–100 scale for each axis).

*Technology stack:* Python 3.11+, FastAPI, Hugging Face Transformers (fine-tuned on HDM corpus), PostgreSQL for user state persistence, Redis for session caching.

**Component 2: Development State Profiler**
Takes raw dimension scores and constructs the Development State Profile (DSP) :: a structured object representing the user's current development position, their trajectory (direction of change over time), and their Surface Tension score.

```json
{
  "user_id": "string",
  "dsp_version": "1.0",
  "generated_at": "ISO 8601",
  "dimensions": {
    "stillness_index": 72,
    "curiosity_velocity": 88,
    "relational_resonance": 61,
    "creative_frequency": 79,
    "trust_gradient": 54,
    "purpose_coherence": 83,
    "emergence_signal": 68
  },
  "surface_tension_score": 29,
  "development_arc": "ascending | plateauing | integrating | threshold",
  "dominant_octave": "Octave 6",
  "recommended_intervention_type": "creative_practice | relational_work | stillness | guidance"
}
```

**Component 3: Recommendation Engine**
Maps the DSP to a library of intervention types, content categories, and :: when appropriate :: tÅs product pathways. The recommendation engine is configurable by the integrating developer: they can supply their own content library for mapping, or use the tÅs default library.

---

### 3.3 Output Layer

The API returns three primary output objects:

**Output 1: Development State Profile (DSP)**
The full structured profile as described above. Returned on every `/analyze` call.

**Output 2: Intervention Signal**
A simplified, action-ready signal for the integrating application to use in real-time UX decisions.

```json
{
  "user_id": "string",
  "signal_type": "encourage | deepen | pause | threshold | guide",
  "signal_strength": "low | medium | high",
  "recommended_content_category": "string",
  "surface_tension_alert": "boolean",
  "tas_pathway_eligible": "boolean"
}
```

**Output 3: Growth Trajectory Report**
A longitudinal report generated from a user's DSP history (minimum 30 days of data). This is the premium output :: it shows not just where a user is, but where they are going and at what velocity. Available on Growth and Enterprise tiers only.

---

## 4. INTEGRATION ARCHITECTURE

### 4.1 Authentication
API key authentication for all tiers. OAuth 2.0 available for Enterprise tier. All API keys are scoped to a single application and a single user namespace.

### 4.2 Rate Limits

| Tier | Monthly API Calls | Rate Limit | Price |
|---|---|---|---|
| Starter | 10,000 | 10 req/sec | $99/month |
| Growth | 100,000 | 50 req/sec | $499/month |
| Scale | 1,000,000 | 200 req/sec | $1,999/month |
| Enterprise | Unlimited | Custom | Custom |

### 4.3 SDKs and Libraries
Phase 1 will ship with:
- JavaScript/TypeScript SDK (primary, for web app integration)
- Python SDK (for data science and backend integration)
- React component library (pre-built UI components for assessment prompts and DSP visualization)

Phase 2 will add:
- Swift SDK (iOS)
- Kotlin SDK (Android)
- Zapier integration (no-code access)

### 4.4 Webhook Support
The API supports webhooks for threshold events :: moments when a user's DSP crosses a significant boundary (e.g., Surface Tension score exceeds 40, or `development_arc` transitions from `ascending` to `threshold`). These events can trigger automated workflows in the integrating application.

---

## 5. DATA ARCHITECTURE AND PRIVACY

### 5.1 Data Model
All user data is stored in a multi-tenant PostgreSQL database with row-level security. Each integrating application has its own isolated namespace. User data is never shared across namespaces.

### 5.2 Anonymization and Aggregation
The platform maintains two data layers:
- **Individual layer:** Full DSP history per user, accessible only to the integrating application and the user themselves.
- **Aggregate layer:** Anonymized, aggregated development signals across all users, used for HDM model improvement and the future HDM Index product.

### 5.3 Compliance
- GDPR compliant (EU data residency option available on Enterprise tier)
- CCPA compliant
- SOC 2 Type II certification targeted for Month 18
- HIPAA-adjacent design (not HIPAA certified in Phase 1, but architecture is designed for future certification)

### 5.4 User Data Rights
Users have the right to:
- Export their full DSP history at any time
- Delete their data from the platform
- Opt out of aggregate data inclusion

---

## 6. THE tÅs PATHWAY INTEGRATION

This section defines the built-in tÅs ecosystem integration :: the mechanism by which the HDM API Platform drives awareness and revenue for THE ÅĻÏEN SCÖÕL.

### 6.1 The Threshold Signal
When a user's DSP meets the following criteria, the API flags `tas_pathway_eligible: true`:
- `surface_tension_score` ≥ 35 (significant resistance between purpose and trust)
- `purpose_coherence` ≥ 70 (clear sense of direction)
- `development_arc` = `threshold` (at a significant transition point)

This combination represents the precise profile of the ideal CREÅTIVE STEEPING or direct mentorship candidate: someone who knows where they want to go, is experiencing real resistance in getting there, and is at a natural inflection point.

### 6.2 The Pathway Prompt
When `tas_pathway_eligible: true`, the API returns an optional `tas_pathway` object:

```json
{
  "tas_pathway": {
    "eligible": true,
    "recommended_product": "creative_steeping_journey | direct_mentorship | semester",
    "pathway_url": "https://thealienschool.com/steep?ref=hdm_api&source={app_id}",
    "prompt_copy": "string (KzA-authored, matched to user's dominant octave)",
    "attribution_token": "string (for revenue share tracking)"
  }
}
```

### 6.3 Revenue Share Program
Integrating developers who surface the tÅs pathway prompt to eligible users receive a 20% revenue share on any resulting tÅs product purchase. This creates a financial incentive for developers to surface the prompt, turning every integrated application into an active distribution channel for tÅs.

---

## 7. DEVELOPMENT ROADMAP

### Phase 1: Foundation (Months 1–4)
**Goal:** Ship a working API with text analysis input and DSP output. Onboard 10 beta developer partners.

- [ ] HDM Signal Engine v1 (text analysis only)
- [ ] Development State Profiler v1
- [ ] Core API endpoints (`/analyze/text`, `/dsp/get`, `/dsp/history`)
- [ ] JavaScript/TypeScript SDK
- [ ] Developer documentation portal
- [ ] Stripe billing integration (Starter and Growth tiers)
- [ ] 10 beta developer partners onboarded (target: journaling apps, writing tools, coaching platforms)
- [ ] tÅs Pathway integration (basic)

**Team required:** 1 lead backend engineer, 1 ML engineer (NLP), 1 frontend engineer (docs portal), KzA (HDM framework annotation and validation)

### Phase 2: Expansion (Months 5–9)
**Goal:** Add behavioral and assessment inputs. Launch publicly. Reach 100 paying developer accounts.

- [ ] HDM Signal Engine v2 (behavioral and assessment inputs)
- [ ] Recommendation Engine v1
- [ ] Python SDK
- [ ] React component library (assessment prompts + DSP visualization)
- [ ] Webhook support
- [ ] Growth Trajectory Report (premium output)
- [ ] Public launch (Product Hunt, developer community outreach)
- [ ] 100 paying developer accounts

**Team required:** Add 1 data engineer, 1 developer relations engineer

### Phase 3: Enterprise and Scale (Months 10–18)
**Goal:** Close 5 enterprise licenses. Reach 500 paying developer accounts. Begin HDM Index development.

- [ ] Enterprise tier (OAuth 2.0, custom rate limits, dedicated support)
- [ ] White-label HDM Engine for enterprise
- [ ] SOC 2 Type II audit
- [ ] Swift and Kotlin SDKs
- [ ] HDM Index v0.1 (internal research product)
- [ ] 5 enterprise licenses closed
- [ ] 500 paying developer accounts

**Team required:** Add 1 enterprise sales engineer, 1 security engineer

---

## 8. TECHNICAL STACK SUMMARY

| Layer | Technology |
|---|---|
| API Framework | FastAPI (Python 3.11+) |
| NLP Engine | Hugging Face Transformers (fine-tuned) |
| Database | PostgreSQL (Supabase) |
| Cache | Redis |
| Auth | Supabase Auth + custom API key management |
| Billing | Stripe |
| Hosting | AWS (us-east-1 primary, eu-west-1 for GDPR) |
| CDN | Cloudflare |
| Monitoring | Datadog |
| Docs | Mintlify |
| CI/CD | GitHub Actions |

---

## 9. ANNOTATION AND VALIDATION PROTOCOL

The HDM Signal Engine requires a proprietary training dataset :: a corpus of text and behavioral data annotated according to the HDM framework. This is the most critical and most defensible component of the platform.

### 9.1 Annotation Process
KzA will serve as the primary annotator for the initial training dataset, working with the ML engineer to:
1. Define the linguistic and behavioral markers for each of the seven HDM dimensions
2. Annotate a minimum of 500 text samples per dimension (3,500 total for Phase 1)
3. Establish inter-rater reliability protocols for future annotation by trained annotators
4. Define the scoring rubric for each dimension (0–100 scale with defined anchor points)

### 9.2 Validation Protocol
The HDM Signal Engine will be validated against:
- KzA's direct assessment of real users in CREÅTIVE STEEPING and Collabination programs
- Longitudinal tracking of users whose DSP predictions are compared against their actual development outcomes
- External validation by academic partners in the fields of positive psychology, developmental psychology, and organizational behavior

### 9.3 Continuous Improvement
The engine will be retrained quarterly using:
- New annotated data from the tÅs user base
- Aggregate feedback from integrating developers
- Longitudinal outcome data from the Growth Trajectory Report

---

## 10. OPEN QUESTIONS FOR KzA

The following questions require KzA's direct input before development begins:

1. **Framework Formalization:** The Seven Octaves and their corresponding HDM dimensions need to be formally documented as a technical specification :: not just a philosophical framework. This is the most critical pre-development task.

2. **Annotation Priority:** Which of the seven dimensions has the most developed linguistic and behavioral marker set? This should be the starting point for Phase 1 NLP training.

3. **tÅs Pathway Prompt Copy:** The pathway prompts need to be written in KzA's voice, matched to each dominant octave. This is a content task that only KzA can complete.

4. **Beta Developer Partners:** Who are the 10 developers or product teams that KzA has existing relationships with who would be ideal beta partners? The Sonnet Engine community is the obvious starting point.

5. **Data Ethics Framework:** What are KzA's non-negotiables around user data, consent, and the use of development data for model training? This needs to be codified before any user data is collected.

---

*End of Developer Brief v1.0*
*Next document: Series A Pitch Deck Content*
