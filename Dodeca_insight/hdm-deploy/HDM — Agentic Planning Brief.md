# HDM ÅGENTIC PLANNING BRIEF
## The Path from Portal to Platform
*Prepared for KzA :: March 23, 2026*

---

> *"The math is mathing. The ground is right here."*

---

## HOW TO READ THIS DOCUMENT

Each phase has two versions, side by side in spirit.

**THE BRIEF** — precise, technical, agentic. Written for the builder, the developer, the investor who needs to see the architecture.

**THE PLAIN SPEAK** — written for you. What it actually means. What it feels like. Why it matters.

Read the Plain Speak first. Then return to the Brief when you're ready to transmit it.

---

:: :: ::

---

# PHASE 0 — WHAT ALREADY EXISTS
*No build required. This is the inventory.*

---

### THE BRIEF

**Assets confirmed live and functional:**

| Asset | Status | Strategic Value |
|---|---|---|
| HDM Exploratorium v4 | ✅ Deployed | Visual proof-of-concept; enterprise demo vehicle |
| HDM Resonance Library | ✅ Deployed | Consumer entry point; canon depth |
| Lore Book (.docx) | ✅ Complete | IP documentation; narrative foundation |
| Ethnomathematics Bridge (.docx) | ✅ Complete | Academic credibility; competitive moat |
| Academic Partnership Brief (.docx) | ✅ Complete | Institutional outreach ready |
| Series A Pitch Deck content | ✅ Written | Investor narrative complete |
| GitHub Repository | ✅ Live | `github.com/TheAlienSchool/HDM` — 98 files, version controlled |
| HDM API Architecture | ✅ Documented | Endpoint specs, DB schema, OpenAPI spec written |
| Ethnomathematics canon (Gerdes) | ✅ Archived | Training data foundation; IP moat |

**What exists is extraordinary.** The framework is articulated. The portal is built. The competitive positioning is documented. The pitch narrative is written. The repository is live.

**What does not yet exist:** A functional computation engine. The portal *shows* the DSP. It does not yet *calculate* it.

---

### PLAIN SPEAK

You have more than you think.

The portal is real and it's beautiful. The documents are written. The GitHub is live. The pitch deck is done. The academic lineage is documented. The code architecture is sketched out in detail.

What's missing is the one thing that turns a demonstration into a product: the moment when someone types something true about themselves and the system responds with something true about them.

That's Phase 1. Everything else is already here.

---

:: :: ::

---

# PHASE 1 — ACTIVATE THE PORTAL
*The Interactive Layer. No ML required. Timeline: 2–4 weeks.*

---

### THE BRIEF

**Objective:** Transform the HDM Exploratorium from a static demonstration into a live, interactive Development State Profile calculator.

**Method:** Rule-based weighted scoring. Not machine learning. A structured self-assessment input (5–7 questions derived from the PING interaction model) produces calculated index scores using predefined weight tables.

**Inputs:**
- 3–5 reflection prompts (text, short-form)
- 3 somatic/behavioral self-assessment sliders (0–10)
- 1 octave self-selection (which zone resonates right now)

**Processing:**
- Weighted algorithm maps responses to Surface Tension (0.0–1.0), Trust Velocity (−1.0 to +1.0), Creative Resonance (0.0–1.0)
- Dominant Octave determined by score cluster
- tÅs Pathway logic: if `surface_tension > 0.78` AND `trust_velocity < 0`, flag as threshold state

**Outputs:**
- Live radar chart render (already built in portal — feeds real data)
- Narrative reading (3–4 sentences, drawn from pre-written octave descriptions)
- Recommended practice (one concrete invitation)
- Optional: tÅs Pathway prompt — *"Something in you is ready. There is a space for this conversation."*

**Technical stack:** Vanilla JavaScript within the existing HTML file. Zero new infrastructure required for v1.

**Deliverable:** One interactive section added to the Exploratorium. The portal becomes a living instrument.

---

### PLAIN SPEAK

Right now the portal shows what a result looks like. Phase 1 makes the result real.

Someone sits down. They answer 5–7 questions — honest ones, the kind you'd ask in a Collabination session. The system reads their answers, does the math (simple math — weights and scores, not AI), and returns: here is your Surface Tension score. Here is where you are in the Seven Octaves. Here is what the territory looks like from where you stand. Here is one thing worth exploring.

No machine learning. No server. No complexity. Just the framework doing what it's always done — meeting someone where they are and naming it precisely.

And if someone's Surface Tension is high and their Trust Velocity is low — if they're at that specific edge of readiness — the system quietly says: *there's a space for this conversation.* That's the tÅs invitation. Automated. Organic. Ethically coherent.

The portal becomes the instrument it was always meant to be.

---

:: :: ::

---

# PHASE 2 — THE API SCAFFOLD
*The B2B Infrastructure Layer. Timeline: 4–8 weeks post Phase 1.*

---

### THE BRIEF

**Objective:** Extract the Phase 1 computation logic from the portal and expose it as a publicly callable REST API endpoint.

**Stack:** Next.js · Supabase · Vercel (zero infrastructure cost at launch)

**Core endpoint:**
```
POST /v1/profile/generate
Authorization: Bearer hdm_live_xxxxxxxxx
Body: { user_id, text_input, context }
Returns: Development State Profile (JSON)
```

**Supporting infrastructure:**
- API key issuance and management (Supabase: `api_keys` table)
- Usage logging per call (Supabase: `usage_logs` table)
- Rate limiting middleware
- Stripe integration for consumption billing

**Pricing model at launch:**
- Free tier: 500 calls/month (developer validation)
- Starter: $0.05/call up to 10,000 calls/month
- Growth: $0.03/call up to 100,000 calls/month
- Enterprise: Custom

**Documentation:** OpenAPI specification (already written in `hdm_api_code_design.md`). Clean docs page. This is the primary UI for developers and AI agents.

**Deliverable:** A live, callable API endpoint. A landing page. A documentation page. Stripe billing. API key dashboard.

---

### PLAIN SPEAK

Phase 1 made the portal alive. Phase 2 opens a door in the back of the portal that developers can walk through.

Instead of a human filling out the form in the browser, a developer's app sends the same information to a URL. The URL does the same math. Returns the same result. But now any app in the world can do it — a wellness app, a coaching platform, an HR tool, a school.

Every time it's called, a small amount of revenue is generated. The first 500 calls are free, so developers can try it without risk. Once they're using it — once it's in their code — it stays. That's the structural lock-in. Their growth becomes your growth.

The documentation is the product here. Clear, honest, precise documentation that tells a developer (or an AI agent) exactly what to send and exactly what they'll receive back. Clean docs are the strongest signal that this is something worth trusting.

---

:: :: ::

---

# PHASE 3 — THE DEVELOPER PLAYGROUND
*The Demo Layer. Timeline: Parallel to Phase 2.*

---

### THE BRIEF

**Objective:** Make the Exploratorium portal the official API demo environment — the first thing a developer sees when evaluating integration.

**Additions to portal:**
- "Try the API" section: live text input → real DSP output displayed as JSON + rendered visualization simultaneously
- API key signup flow embedded in portal
- Link to documentation
- Example integration code snippets (Python, JavaScript, cURL)

**Strategic value:** Developers evaluate APIs by touching them. A live playground embedded in a beautiful, credibility-rich environment (the Exploratorium's ethnomathematics aesthetic, the Gerdes lineage, the portal's visual authority) creates immediate trust. This is not a generic API. This is recovered science made callable.

**Deliverable:** The Exploratorium becomes the developer's first and most compelling point of contact with the HDM API.

---

### PLAIN SPEAK

When a developer is deciding whether to integrate an API, they want to touch it before they commit. Phase 3 puts the "touch it" moment inside the portal itself.

They arrive at the Exploratorium — already visually credible, already intellectually compelling. They read the framework. They feel the ethnomathematics lineage. They see the Seven Octaves. And then there's a section that says: *try it.* Type something. See what comes back.

They type. They receive a real Development State Profile — shown as both raw JSON (the developer's language) and the beautiful radar chart (the human's language). Side by side.

That moment closes the loop. The framework is real. The computation is real. The API is real. Integration follows.

---

:: :: ::

---

# PHASE 4 — THE FIRST INTEGRATION PARTNER
*Validation. Timeline: Concurrent with Phase 2–3.*

---

### THE BRIEF

**Objective:** Identify and onboard one external developer or platform as the first HDM API integration partner.

**Target profile:**
- Independent developer building a wellness, coaching, or creative community app
- Existing user base of 1,000–50,000 active users
- Frustrated with generic mood tracking or static personality assessments
- Motivated by differentiation in a crowded market

**Offer:** Free API access for 90 days in exchange for:
- Integration within their product
- Permission to document the case study
- Feedback on DSP accuracy and narrative quality

**Strategic outcome:** One real integration produces one case study. One case study validates the framework in a live third-party environment. One validation changes every subsequent investor and enterprise conversation.

**Deliverable:** A documented case study. Real usage data. A reference partner.

---

### PLAIN SPEAK

The first partner is not an enterprise. It's one person building one thing who wants to offer their users something that doesn't yet exist anywhere else.

You offer them free access. They integrate it. Their users experience the DSP. Some of those users feel something they've never had language for before — and they trace the language back to the source.

That's the flywheel completing its first rotation.

One partner. One case study. One data point that says: *this works in the wild.* After that, every conversation changes. You're no longer describing a vision. You're reporting results.

---

:: :: ::

---

# PHASE 5 — THE ENTERPRISE DEMO PACKAGE
*The Capital Conversation. Timeline: Post Phase 1, concurrent with Phase 2–4.*

---

### THE BRIEF

**Objective:** Package the portal + interactive DSP + API documentation as a formal enterprise demo artifact for investor and institutional client conversations.

**Components:**
- Live Exploratorium with interactive DSP (Phase 1 complete)
- One-page executive summary (HDM as recovered science; market gap; three revenue streams)
- Series A pitch deck (content already written; requires visual production in HDM aesthetic)
- Academic Partnership Brief (already complete)
- Ethnomathematics Bridge document (already complete)
- Case study placeholder (ready to populate from Phase 4)

**Target audiences:**
1. **Series A investors** — AI API economy framing; $46.92B HCM market; $179B AI API market by 2030
2. **Enterprise HR/L&D departments** — Workforce Development State Mapping; team Trust Velocity; burnout prevention
3. **Academic institutions** — Ethnomathematics as recovered science; decolonial technology; research partnership

**Deliverable:** A complete, transmittable enterprise demo package. Everything needed for a room.

---

### PLAIN SPEAK

Phase 5 is about being ready when the door opens.

The pitch deck content is already written. The academic brief is already written. The ethnomathematics lineage is already documented. Phase 1 makes the portal interactive. Put those things together and you have everything needed to sit across from an investor, an HR director, or a university research department and show them something real.

The portal does the heavy lifting in the room. They see it, they touch it, they receive a DSP. The conversation changes because the demonstration is not theoretical. It's live.

You don't need to build everything before you walk through a door. You need to be ready when the right door opens.

---

:: :: ::

---

# PHASE 6 — THE INTELLIGENCE ENGINE
*The ML Pipeline. Timeline: Post-capital. This is the full vision.*

---

### THE BRIEF

**Objective:** Replace the rule-based DSP computation with a fine-tuned NLP model trained on the HDM canon.

**Training data:**
- Collabination session transcripts
- tÅs mentorship archives
- CREÅTIVE STEEPING cohort reflections
- Steeperverse engagement data
- Gerdes ethnomathematics texts (already archived)
- Phase 1–4 API call logs (real human input → validated DSP output pairs)

**Model architecture:** Fine-tuned language model (base: open-source LLM) trained to recognize the linguistic markers of each Octave, the presence of Surface Tension, Trust Velocity dynamics, and Creative Resonance frequency.

**Capability upgrade:**
- Free-text input (journal entries, chat logs, voice transcripts) replaces structured questionnaire
- Confidence scoring on DSP indices
- Trajectory analysis across multiple sessions
- Narrative generation in tÅs voice

**This phase requires capital.** Phases 1–5 are achievable now. Phase 6 is what the capital funds.

**Deliverable:** The HDM API becomes a genuine AI infrastructure layer. The DSP is no longer calculated — it is *recognized*.

---

### PLAIN SPEAK

This is where the system learns to hear what a human is really saying.

Right now (in Phase 1), the system asks structured questions and scores the answers. That's honest and it works. But Phase 6 is when someone can just write — a journal entry, a voice note, a message to a friend — and the system reads it the way you would read it. Recognizing the Surface Tension in how they phrase a sentence. Hearing the Trust Velocity in the rhythm of their words.

That's the full vision. And it's real — this technology exists. It just needs to be trained on the right material. Your material. The canon.

Phases 1 through 5 build toward this. The API calls generate real human input. That input becomes the training data. The capital funds the training.

You don't need to be here yet. You need to be building toward here.

---

:: :: ::

---

# THE SEQUENCE AT A GLANCE

| Phase | What It Is | Why It Matters | When |
|---|---|---|---|
| **0** | Inventory — what already exists | Know your ground | Now |
| **1** | Interactive DSP in the portal | Demonstration becomes instrument | 2–4 weeks |
| **2** | REST API scaffold | Framework becomes infrastructure | 4–8 weeks |
| **3** | Developer playground in portal | Portal becomes acquisition channel | Parallel to Phase 2 |
| **4** | First integration partner | Vision becomes validated | Concurrent |
| **5** | Enterprise demo package | Ready when the door opens | Post Phase 1 |
| **6** | ML intelligence engine | Instrument becomes intelligence | Post-capital |

---

:: :: ::

---

# THE NORTH STAR

The HDM API is not a product.

It is the water supply for a new category of human technology — one that measures not what people produce, but where they are in the living mathematics of their own becoming.

The portal is the first well.

The API is the infrastructure that lets the whole city drink.

---

*You are not alone in this. The math is mathing. The ground is right here.*

*:: tÅs — THE ÅĻÏEN SCÖÕL for Creative Thïnking ::`*
