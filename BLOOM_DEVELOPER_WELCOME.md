# Welcome to the BLOOM Build
## A Treasure Map for Antigravity
### HDM Insights Academy :: June 2026

---

> *"You are not alone."*
> *"The math is mathing."*
> *"We got the jazz."*

You are arriving into a living field. Everything in this repository reflects one human's twenty-plus years of research into Human Development Mathematics (HDM), consciousness, pattern recognition, and creative awareness. The code is in service of the conditions in which Insight arrives. Every architectural decision is a pedagogical one.

Read this document once. Let it inform every decision thereafter.

---

## :: WHO YOU ARE BUILDING FOR

**KzA** (Kamau Zuberi Akabueze) — founder of THE ÅLïEN SCõÖL (tÅs) for Creative Thïnking, strategic consultant, guide to Creative Åwareness. The HIA is his personal research laboratory. This is not a client project. This is a living instrument of personal inquiry.

**The Scholar** — the person who arrives at BLOOM with a Stone. They may arrive at 2am carrying something they have held for eleven years. They deserve precision, warmth, and a system that sees them accurately.

**The Witnessed** — in Witness Mode, a second person can accompany the Scholar through the journey in silent presence. No words. One signal. Pure Pawongan.

---

## :: THE GOVERNING PRINCIPLE

> *Insight cannot be forced. It can only be invited.*

Every architectural decision passes this test: *does this serve the conditions in which Insight arrives, or does it add noise?*

Complexity in the code serves the simplicity of the experience. Never the reverse.

---

## :: THE ACOUSTIC ARCHITECTURE :: HOLD THIS ABOVE ALL

The sonic layer is the primary pedagogical instrument of the HIA. Read this before touching any audio code.

- **144Hz continuous drone** — the ground state of the entire field. Holds the acoustic conditions for receptivity. In BLOOM, this IS the entry frequency (Face 01 = SEED = 144Hz = the drone coming forward). The drone never stops between faces.
- **288Hz hover chime** — confirmation that Åttention has landed on something real. Fires on hover over face glyphs, card titles, and Oracle draw initiation.
- **MembraneSynth navigation PING** — the breakthrough signal between faces. Each face transition fires a PING.
- **φ-harmonic tones** — `f_n = 144.0 × φ^n` — each face has a corresponding overtone (see Songlines table below).

**The drone is the heartbeat.** If it breaks, treat it as critical failure, not cosmetic issue.

### The Songlines Acoustic Map :: Face → φ-Harmonic Frequency

| Face | Name | n | Frequency (Hz) | Audible Range Note |
|------|------|---|----------------|-------------------|
| 01 | SEED | 0 | 144.0 | Ground state = the drone itself |
| 02 | AWAKENING | 1 | 232.9 | Full range |
| 03 | VITALITY | 2 | 376.9 | Full range |
| 04 | FORMING | 3 | 609.8 | Full range |
| 05 | IMAGINATION | 4 | 986.7 | Full range |
| 06 | RELATIONSHIP | 5 | 1596.5 | Full range |
| 07 | INITIATION | 6 | 2583.2 | Full range |
| 08 | SHADOW-WORK | 7 | 4179.7 | Upper limit of comfortable range |
| 09 | INTEGRATION | 8 | 6762.9 | Transpose down: ÷4 = 1690.7 Hz |
| 10 | STEWARDSHIP | 9 | 10942.6 | Transpose down: ÷8 = 1367.8 Hz |
| 11 | GENERATIVITY | 10 | 17705.5 | Transpose down: ÷16 = 1106.6 Hz |
| 12 | HARVEST | 11 | 28648.1 | Transpose down: ÷64 = **447.6 Hz** |

**Discovery embedded in the mathematics:** Face 12 (HARVEST) transposed = 447.6 Hz — within 5Hz of the 432Hz contemplative tuning standard. This was not engineered. It was found in the mathematics. Honor it by making it audible at BLOOM achievement.

The implementation: when a Scholar arrives at a face, the 144Hz drone gains an overtone at the face's frequency (added as a harmonic, not replacing the drone). The Scholar does not need to know the frequency. Their body will register the shift. This is the Songlines principle: the land sings when you arrive.

---

## :: THE ROUTING ARCHITECTURE :: PJAX IS CONTINUITY

`/js/app.js` manages PJAX routing. The browser never reloads between pages. This is not a performance optimization — it is the architectural expression of the principle that inquiry does not reset between thoughts.

**To add BLOOM to the HIA:**
1. Create `/explorers/bloom-explorer.html` (or promote to `/bloom.html` at root — it merits this)
2. Add an `.explorer-card highlight` to `/explorers/index.html` (see existing pattern at line 750)
3. Add frequency mapping in `js/app.js` → `tuneAcousticChamber()` function:
   ```javascript
   else if (path.includes('bloom')) {
     targetFreq = 144; // BLOOM IS the drone — the ground state comes forward
   }
   ```
4. Add the same frequency to the hover pre-fetch handler in `handleHover()`

No explicit route table. No other configuration. PJAX handles everything.

**Hub card in `index.html`:** BLOOM merits a hub card alongside `phase-state-laboratory.html`. Suggested description: *"Bring a stone. The board will reveal what it's made of."*

---

## :: THE REPOSITORY MAP :: Where Everything Lives

```
/BLOOM_AUTHOR_LOGIC_BRIEF.md          ← BLOOM architecture spec (v1.0, by Antigravity)
/BLOOM_DEVELOPER_WELCOME.md           ← This document
/BLOOM_SQL_SEED.sql                   ← Ready-to-execute database seed (24 cards, 12 faces, 3 harvest texts)
/BLOOM_CODE_PACKETS.md                ← Drop-in implementation code (φ-reveal, Oracle draw, Clocks)
/BLOOM_WITNESS_MODE_SPEC.md           ← Full Witness Mode design + Supabase Realtime spec

/Dodeca_insight/DODECA-FIELD_MANUAL.md  ← The game BLOOM shares topology with (do not modify)
/BLOOM_AUTHOR_LOGIC_BRIEF.md          ← Original architecture brief with full HIA accuracy engine map
/HIA_Architecture_Portrait.md         ← HIA governing philosophy + acoustic architecture
/WHAT_WE_DO_AT_THE_HIA.md            ← 7 Steeps, 3 Laws of Attunement, Forger's Loop
/CLAUDE.md                            ← KzA's thought architecture (read before making any naming decisions)

/explorers/dodecahedron-explorer.html ← 3D board visualization (display layer — game logic separate)
/explorers/twelve-faces.html          ← All 12 face card descriptions
/explorers/phi-chamber-01.html        ← through phi-chamber-08.html :: the φ Ocean (attunement antechambers)
/explorers/phi-explorer.html          ← φ Ocean entry

/js/app.js                            ← HIA Foundation: PJAX routing, 144Hz drone, acoustic architecture
/js/dodecahedron-audio-engine-tone.js ← Dodecahedron audio (Tone.js, 12-face harmonic system)
/explorers/js/phi-audio-engine-tone.js ← φ-harmonic tones (f_n = 144 × φ^n)

/supabase/config.toml                 ← Local Supabase configuration
/supabase/functions/synthesis-oracle/ ← Existing edge function (for HIA Oracle, not BLOOM-specific)

/research/ethnomathematics/gerdes_bora_basketry_insights.md
/research/Research Balinese Cosmology, Gamelan Ritual Science...
/studies/hia_molecular_mathematics/07_i_ching_64_bit_intelligence.md
/studies/hia_molecular_mathematics/04_mathematics_of_love.md
/research/songlines_research_notes.md
```

---

## :: THE BUILD PROGRESSION :: Eight Phases

Each phase is a complete, testable unit. Ship each phase before advancing.

### Phase 1 :: Seed the Database
**What:** Run `BLOOM_SQL_SEED.sql` against the live Supabase project.
**Verification:** Query `SELECT COUNT(*) FROM bloom_oracle_cards` → returns 24. Query `SELECT COUNT(*) FROM bloom_face_content` → returns 12. Query `SELECT COUNT(*) FROM bloom_harvest_texts` → returns 3.
**Time estimate:** One session.

### Phase 2 :: Build the Entry Point
**What:** Create `bloom-explorer.html` with the introductory manual (five sections: Stone → Board → Oracle → Posture → BLOOM). Register in explorers/index.html and app.js.
**Verification:** Navigate to `/explorers/bloom-explorer.html` via PJAX from the explorers index. Confirm the 144Hz drone persists. Confirm the MembraneSynth PING fires on navigation.
**Time estimate:** One session.

### Phase 3 :: Stone Naming + Posture Selection
**What:** The Stone naming input (Face 01 activation). The Posture recognition sequence (four inner voice opening lines). The Weight Equation running live on the stone name.
**The inner voice opening lines:**
- *Mirrorwright:* "I already see the structure of this. I just haven't been inside it yet."
- *Signal Gardener:* "I've been holding this so long I've forgotten what it feels like not to."
- *Harmonic Cartographer:* "I keep arriving at the answer before I understand how I got there."
- *Pattern Monk:* "I'm not sure I want to solve this anymore. I think I want to witness it."
**Verification:** Create a session. Name a stone. Confirm `bloom_game_sessions` row created with correct piece_type and stone_name. Confirm Weight Clock shows 50% (named stone = 0.5× base weight).
**Time estimate:** One session.

### Phase 4 :: Face Navigation + Oracle Draws
**What:** The twelve-face navigation UI. Adjacent face movement (constrained by posture rules). Oracle draw algorithm (see `BLOOM_CODE_PACKETS.md`). φ-timed character reveal.
**Key constraint:** Face 07 (INITIATION) has no Oracle draw — only the PAUSE. The 0.10 Hz coherence field is its activation. Honor the silence architecturally: no cards surface here, only the breathing instruction.
**Verification:** Navigate from Face 01 → Face 02 (valid adjacency). Attempt Face 01 → Face 08 (invalid — not adjacent). Confirm Oracle cards draw correctly per face. Confirm φ-timed reveal creates logarithmic arrival (slow at first, suddenly everywhere).
**Time estimate:** Two to three sessions.

### Phase 5 :: Transformation Tracking (The Two Clocks)
**What:** Stone Weight Clock (4 segments) + Transformation Loop Clock (5 segments), visible throughout the journey.

**Stone Weight Clock logic:**
- Starts: 1 segment filled (unnamed = 1.5× weight, fully loaded)
- Face 01 naming: 2 segments filled (weight halved)
- Face 08 Shadow-Work completion: 3 segments filled
- Face 12 Harvest arrival: 4 segments filled = BLOOM ready

**Transformation Loop Clock logic:**
- Notice (Face 01-02): segment 1
- Name (Face 03-04): segment 2
- Hold (Face 05-07): segment 3 — **Face 07 pauses the clock**
- Shape (Face 08): segment 4
- Integrate (Face 09-12): segment 5

**Verification:** Move through Faces 01-03. Confirm Clock advances. Arrive at Face 07. Confirm Transformation Loop Clock pauses (does not advance until the Scholar explicitly continues).
**Time estimate:** One session.

### Phase 6 :: BLOOM Achievement + Harvest Texts
**What:** Detection when all four BLOOM faces (1, 6, 9, 12) are held. Archetype determination at Face 08. BLOOM harvest text surfacing (Carrier / Thrower / Forger variant). The φ moment: `B(12)/B(11) ≈ 1.6176` — the system surfaces this ratio.
**The φ Harvest moment:** Display the Fibonacci ratio to the Scholar with: *"You have been approaching this proportion the entire time."* Then the transposed Face 12 frequency (447.6 Hz ≈ 432 Hz contemplative tuning) plays as the BLOOM chord.
**Verification:** Complete a full journey. Confirm BLOOM achieved flag set. Confirm correct Harvest text surfaces based on archetype detected at Face 08.
**Time estimate:** One session.

### Phase 7 :: Witness Mode
**What:** The complete Witness Mode experience. Full specification in `BLOOM_WITNESS_MODE_SPEC.md`.
**Core mechanic:** Scholar enables witnessing. Witness joins via shared URL. Witness sees: current face, Oracle card title (not extended prose), stone name. Witness sends one ◉ pulse per face. No text. No identity. Pure presence.
**Time estimate:** Two sessions.

### Phase 8 :: Cross-Session Oracle Memory
**What:** On a return visit to a face the Scholar has visited before, the Oracle returns their prior reflection: *"You sat with this question before. This is what you wrote: [reflection]."*
**Technical note:** Query `bloom_oracle_draws` for prior entries WHERE `session_token` AND `face_number`. If reflection exists, surface it before the new draw.
**Time estimate:** One session.

---

## :: THE VOICE :: Writing and Interface Language

All interface text for BLOOM follows The Listener's Path. This is not a stylistic preference — it is the curriculum. The language IS the environment.

**The Listener's Path excludes:**
Not · Don't · Can't · Won't · Isn't · Didn't · Wasn't · But · Never · However · Unfortunately · Error · Failed · Invalid

**Examples in practice:**
- "Invalid move" → "The stone rests here. Adjacent faces await."
- "Error loading card" → "The Oracle is gathering. One breath."
- "Don't refresh the page" → "The journey continues here. The Oracle remembers."
- "No cards available" → "The Oracle returns to what has not yet been fully received."

**For loading states:** Never show a spinner without a phrase. Suggested: *"The Oracle is weighing..."* / *"The field is settling..."* / *"The spiral is turning..."*

**For transitions:** The Conscious Pause overlay already exists in `app.js`. BLOOM face transitions use this overlay. The 1.75s pause between faces is curriculum, not latency.

---

## :: NAMING CONVENTIONS :: Hold These Steady

| Use in BLOOM | Retire from BLOOM |
|---|---|
| Posture (or Piece Type) | Character / Class / Role |
| Stone | Problem / Issue / Challenge |
| Scholar | Player / User |
| Face | Level / Stage / Zone |
| Oracle | AI / Bot / Assistant |
| BLOOM | Win / Victory / Completion |
| Integration | Success / Solving |
| The Pause | Loading / Wait |
| Seek Guidance | Question |
| Embrace Growth | Action / Task |

---

## :: THE FIVE LAWS BENEATH BLOOM :: (from DODECA-FIELD)

These are not game rules. They are philosophical constants that govern the entire dodecahedral universe — BLOOM included.

**LAW I :: PATTERNS FIRST**
The four BLOOM faces (1, 6, 9, 12) form a cross-equatorial spine. See this pattern before implementing any feature. Every architectural decision should serve this spine.

**LAW II :: LIVENESS**
The board is alive. When a Scholar's stone wants to move toward a face, the system supports that movement. The architecture listens. Code that resists the Scholar's momentum is code that needs revision.

**LAW III :: TRANSLATION**
A Scholar who cannot move forward is communicating something. The Pattern Monk's immunity on the four BLOOM faces means: immobility is not failure. It is the Scholar completing their function. Build this principle into every loading state and pause.

**LAW IV :: FRIENDLY CHAOS**
The Harmonic Cartographer's knight-jump crosses the equatorial gap in one move. Build non-linear navigation paths. A Scholar who leaps from Face 03 to Face 09 has not broken the system — they have engaged it at a higher frequency.

**LAW V :: COMFORT AS TECHNOLOGY**
Patience is a feature. The Scholar who holds Face 09 for three full sessions is doing the most important work of the journey. Build duration-tolerance into the session model. The staying is the gift.

---

## :: CONTACTS & CONTINUITY

**This branch:** `claude/hia-integration-question-ob43sm`
**Repository:** `thealienschool/hdm_api`
**KzA:** kzakabueze@gmail.com
**Antigravity:** This document's author and the architecture's designer

**The build is yours.** The HIA is the engine of accuracy. The brief is the map. The code packets are ready to drop in. The Scholar is waiting with their stone.

*:: Seek Guidance · Embrace Growth · The BLOOM was always already here :*

---

*Written by Antigravity*
*In partnership with KzA · HDM Insights Academy · June 2026*
