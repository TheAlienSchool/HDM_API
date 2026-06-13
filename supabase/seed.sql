-- BLOOM: AN INNER GAME - Supabase Seed Data
-- Generated for HDM Insights Academy :: June 2026

BEGIN;

-- ==========================================
-- 1. FACE CONTENT
-- ==========================================

INSERT INTO bloom_face_content (face_number, face_name, is_bloom_face, adjacent_faces, encounter_prompt, face_lore, grimoire_activation_note, transition_text)
VALUES
  (1, 'Naming', TRUE, ARRAY[2, 3, 4, 5, 6], 'What is the true name of the stone you carry? ', 'Everything that will become is already here, pulsing with quiet vitality, waiting for the right conditions. This is the spiral armature of the Bora basket of the Amazon, held in the hands before the first coil is laid. The entire topology exists in potential. The hands and the materials collaborate to reveal the shape. The Seed holds all twelve faces simultaneously. Naming the stone is the first mathematics, the first act of conscious collaboration with the field.', 'The Weight Equation activates: `IF(named="Yes", base*0.5, base*1.5)` — naming the stone immediately alters its weight in the field.', 'The shape is set; the hands begin to move.'),
  (2, 'Emergence', FALSE, ARRAY[1, 3, 6, 7, 8], 'What did you notice just before you knew you were noticing it?', 'The first noticing. The PING :: the flash of recognition that arrives before language can capture it. Consciousness stretches toward the light. This is the Balinese Sekala meeting the Niskala — the precise moment the unseen, energetic world (Niskala) becomes perceptible to the seen, material world (Sekala). The invisible breathes, and the visible shivers in response, creating a bridge of pure awareness.', 'The COUNTIF formula scans the field — computing how many times this specific pattern has appeared in your history.', 'The signal is received; the body remembers.'),
  (3, 'Pulse', FALSE, ARRAY[1, 2, 4, 8, 9], 'What energy is already accumulating here, asking to be held?', 'Forms are fluid and deeply responsive. We can envision the shape of our becoming and hold it clearly enough to move toward it. This is creative energy in full bloom. The hands of the Bora weaver know the theorem before the mind gives it a name, feeling the differential geometry as a living pulse. Vitality is the realization that the future is already pressing into the present, asking to be woven into the daily rhythm.', 'Formula Art (Fibonacci seed) runs: `B(n) = B(n-1) + B(n-2)` — revealing what is accumulating in the space.', 'The rhythm establishes itself; the leap becomes possible.'),
  (4, 'Structure', FALSE, ARRAY[1, 3, 5, 9, 10], 'What lived intelligence is supporting you right now?', 'Structure is the phase that makes Imagination possible. This is the lived intelligence of African mathematics history (AMUCHMA) :: structure that grows from the ground up, built by the bodies that inhabit it, informed by the landscape and the lineage. The scaffolding is the condition for flight. It is the supportive architecture that allows the spirit to reach its highest elevation safely.', 'The Experiential Parallelogram begins building its four vertices: Ancestral Wisdom · Embodied Knowing · Oracle · Community.', 'The foundation holds; the space opens.'),
  (5, 'Expansion', FALSE, ARRAY[1, 4, 6, 10, 11], 'If the constraints were transformed into fuel, what would this stone become?', 'Touch five faces from here. Adjacent to Relationship and Integration :: two BLOOM faces reachable in a single step. Imagination is the geometry of the golden spiral, where linear progress bends into exponential expansion. This is the territory where the mind allows itself to be surprised by what the heart already knows, where the Yellow Theorem of primary mathematics—love as the transformer of perception—renders boundaries transparent.', 'Growth Modeling calculates: `POWER(1+rate/100, period)` — the compound delta appears, bending toward φ.', 'The horizon curves; the possible multiplies.'),
  (6, 'Union', TRUE, ARRAY[1, 2, 5, 7, 11], 'Who is the mirror reflecting this stone back to you?', 'We understand ourselves through others. Duality emerges here as structure :: two faces held in the geometry of the whole. The Other is the mirror. This is the Balinese Tri Hita Karana principle of Pawongan — harmony with fellow humans as structural mathematics. Every connection alters the entire network, increasing the capacity of the whole. The union is the architecture of resilience.', 'Network Effects calculate: `n(n-1)/2` — applying Metcalfe''s Law to show exponential value in the relational field.', 'The reflection clears; the network breathes.'),
  (7, 'Threshold', FALSE, ARRAY[2, 6, 8, 11, 12], 'What are you willing to release to pass through this door?', 'The door that opens from the inside. This is the threshold hexagram of the I Ching :: water becoming fire. A profound structural transition. The 64-bit architecture holds the tension of transformation, filtering the static to reveal the pure signal. The initiation invites a shedding of the outdated layers, allowing the coherence field to stabilize and the new frequency to anchor.', 'NONE — this face holds a PAUSE, allowing the 0.10 Hz Coherence Field to settle.', 'The breath releases; the crossing is made.'),
  (8, 'Depth', FALSE, ARRAY[2, 3, 7, 9, 12], 'What deep truth are you protecting by managing this stone?', 'Where pieces get captured. Where transformations happen. The Shadow face is honest accounting, a descent into the fertile dark. The player who moves through Shadow-work with intention emerges carrying gold. This is the 27th Shadow of the Gene Keys :: the dense biological necessity of self-preservation transmuting into the expansive flow of altruism. The depth requires absolute honesty about what you are carrying, revealing the hidden value within the weight.', 'Pattern Recognition reveals the archetype (Carrier / Thrower / Forger) and the Transformation Ratio is first computed.', 'The depth is sounded; the work begins.'),
  (9, 'Deep Time', TRUE, ARRAY[3, 4, 8, 10, 12], 'What part of yourself are you finally ready to welcome back?', 'We become one while maintaining our brilliant, individual threads. UNION: Unified Nonidentical Intelligences Operating Naturally. This is the spaciousness of Anamnesis :: a re-gathering, returning to a profound knowing already held in the body. Once something is truly integrated, truly witnessed, it becomes a permanent part of your architecture. The immunity is absolute. The staying is a profound gift.', 'The Transformation Loop status check runs, locating the player within the five phases.', 'The scattered pieces return; the center holds.'),
  (10, 'Tending', FALSE, ARRAY[4, 5, 9, 11, 12], 'What promise can you make to the version of you that will exist tomorrow?', 'We tend what will outlast us. Building tile by tile with the knowledge that someone else will inhabit what we have made. The long now. This is the Bora basketry transmission :: the child who watches the master for years before touching the materials, absorbing the mathematics through observation and reverence. Stewardship is the quiet, continuous act of holding the space so that the future has a beautiful place to land.', 'The Trust Flywheel spins: `MIN(100, Trust + Kept_Promises * 5)` — one promise is made here.', 'The tile is placed; the holding continues.'),
  (11, 'Multiplication', FALSE, ARRAY[5, 6, 7, 10, 12], 'What gift have you received that you are now ready to multiply and return?', 'Lineage becomes visible as a continuous river of gifts :: something received, enriched, and returned across time. The spiral timeline reveals that every point is a handoff. This is the Mathematics of Nourishment from Gene Key 27, where altruism operates as structural flow. To give is to increase the whole system, securing yourself by securing the whole. The ratio approaches φ. The generosity is the geometry.', 'Network Effects reach full value, comparing the current Metcalfe value to Face 06.', 'The gift is passed; the spiral turns.'),
  (12, 'BLOOM', TRUE, ARRAY[7, 8, 9, 10, 11], 'What has this stone become?', 'All twelve faces illuminated in harmony. The shape closes. The geometry completes. This is the most generous act: your harvest becomes the fertile ground for someone else''s beginning. The harvest is the realization that the work has transformed you, embedding the wisdom into your very cells. The stone has been worked. The ratio has been met. The field is fully alive and vibrating with new potential.', 'The Final Transformation Ratio, Final Weight, Trust Flywheel count, and Growth Modeling delta are computed.', 'The geometry completes; the BLOOM is here.')
ON CONFLICT (face_number) DO UPDATE SET
  face_name = EXCLUDED.face_name,
  is_bloom_face = EXCLUDED.is_bloom_face,
  adjacent_faces = EXCLUDED.adjacent_faces,
  encounter_prompt = EXCLUDED.encounter_prompt,
  face_lore = EXCLUDED.face_lore,
  grimoire_activation_note = EXCLUDED.grimoire_activation_note,
  transition_text = EXCLUDED.transition_text;

-- ==========================================
-- 2. ORACLE CARDS
-- ==========================================

INSERT INTO bloom_oracle_cards (id, face_assignments, piece_affinities, brief_title, extended_prose, seek_guidance_prompt, embrace_growth_invitation, draw_weight)
VALUES
  ('00000000-0000-4000-a000-000000000001', ARRAY[1, 3, 5], ARRAY['Signal Gardener']::text[], 'Every stone adds.', 'The mathematics of accumulation is a profound record of your presence. Every moment you have carried this stone, every breath you have taken while holding its weight, has added to the total volume of your awareness. The SUM is the precise calculation of your capacity to hold what is real, gathering the raw material necessary for your next phase shift.

When we feel heavy, we are often feeling the proof of our gathering. You are building a mass of lived experience that is reaching critical density. Like the Griots of West Africa who carry the entire lineage of their people in memory, you are accumulating the history of your own becoming. The weight is the evidence of your devotion to the truth of your experience.

Feel the sheer volume of what you have gathered. It is the rich, fertile soil of your development. The signal is growing stronger because you have allowed the inputs to sum, creating a foundation robust enough to support your eventual bloom.
', 'What have you been counting as a loss that is actually a powerful accumulation of strength?', 'Rest your hands on the stone and actively honor the sheer volume of lived experience it represents.', 100),
  ('00000000-0000-4000-a000-000000000002', ARRAY[2, 6, 8], ARRAY['Mirrorwright', 'Pattern Monk']::text[], 'Is this stone mine?', 'The IF function is the original gatekeeper of the psyche, the boundary condition that clarifies what truly belongs in your field. We drag stones across the geometry of our lives, and the Oracle invites us to pause and ask the fundamental binary question :: does this actually belong to my curriculum?

When the condition is evaluated with absolute structural honesty, the energy becomes incredibly efficient. If the stone is yours, the weight is your medicine. If the stone belongs to an ancestor, a partner, or a system, the Oracle gives you the clarity to return it to its rightful owner, restoring balance to both of you.

The condition is binary, and its implications are infinite. When you clarify the IF, the subsequent path illuminates itself. You gain the power to invest your energy solely in the transformations that are yours to make, allowing the rest of the world to carry its own beautiful weight.
', 'If you set this stone down, whose voice would you hear, and what are they asking of you?', 'Trace the origin of this stone back to the moment it was handed to you, and consciously decide if you accept the transfer.', 100),
  ('00000000-0000-4000-a000-000000000003', ARRAY[2, 4, 7], ARRAY['Harmonic Cartographer']::text[], 'How many times has this returned?', 'The universe is profoundly economical, presenting the same pattern until the lesson is fully metabolized. The COUNTIF function scans the timeline of your life and recognizes the recurrence. You have stood at this exact threshold before, holding this exact frequency of stone, and this return is a beautiful opportunity for mastery.

Repetition is the spiral nature of learning. Each time the pattern returns, you are encountering it from a higher elevation on the spiral. The circumstances change, the faces change, but the core geometry remains identical, offering you a chance to respond with greater wisdom and deeper grace.

The Oracle invites you to observe the structure of the repetition. When you count the recurrences with curiosity and reverence, you refine the resolution of your awareness. You are witnessing the precise rhythm of your own evolution.
', 'Name the specific pattern — the exact type of situation, relationship, or feeling — that keeps returning to your field. What is its shape?', 'Map the last three times this specific tension appeared in your life, and celebrate the precise, measurable ways your response has evolved.', 100),
  ('00000000-0000-4000-a000-000000000004', ARRAY[3, 9, 10], ARRAY['Signal Gardener', 'Carrier']::text[], 'Your baseline is a coordinate.', 'Every system has a center of gravity — the frequency it returns to when the extraordinary fades back into the ordinary. The AVERAGE is the precise mathematical truth of your daily baseline: the energetic coordinate that describes where you actually live — where you dwell, where you breathe, where the ordinary work of becoming happens.

The stone you carry is influencing this coordinate right now. It is either adding density to your center of gravity, pulling the baseline toward a heavier register, or it is acting as ballast — the kind of weight that keeps a vessel steady in open water. The Polynesian wayfinders of the Pacific, who navigated thousands of miles of open ocean without instruments, read the average swell of the sea with their entire bodies. They felt the baseline frequency of the water and used it as a map. Your baseline is equally navigable.

When you identify the precise emotional coordinate of your daily average, you gain the power to shift it — one small, consistent input at a time. The entire architecture of your life moves when the baseline moves.
', 'What is the specific emotional frequency — name it like a weather condition — that describes where you spend most of your time with this stone?', 'Notice your physical posture right now, and adjust it one deliberate degree toward expansive openness, feeling the baseline shift in real time.', 100),
  ('00000000-0000-4000-a000-000000000005', ARRAY[4, 8, 11], ARRAY['Mirrorwright', 'Forger']::text[], 'Small practice, radical return.', 'Linear thinking expects one unit of effort to yield one unit of result, but the POWER function introduces the breathtaking mathematics of the curve. The compound delta is the secret architecture of all profound transformation :: the small, consistent practice that builds quietly in the dark until it suddenly illuminates everything.

The Oracle reveals the physics of the exponent. The energy you are investing is compounding beneath the surface of the visible world. Like the slow, invisible accumulation of water that eventually carves a canyon, your continuous attention is reshaping the landscape of your life.

The golden spiral builds itself through this exact mathematics. The curve is bending toward a revelation. Trust the exponent. The radical return is mathematically guaranteed when the practice is maintained with devotion and care.
', 'What is the specific, repeatable action — something you can do in under five minutes — that you already know moves this stone, even slightly?', 'Commit to that exact action every day for the next seven days. Write it down. Make it concrete. The exponent begins on day one.', 100),
  ('00000000-0000-4000-a000-000000000006', ARRAY[5, 7, 10], ARRAY['Pattern Monk']::text[], 'Layers of truth.', 'Truth is a nested architecture, where one condition opens beautifully into another, and that condition opens into a third. The NESTED IF is the recognition that the stone you carry is a magnificent Russian doll of meanings, waiting to be unstacked and understood.

You have named the outer layer, and the Oracle invites you to see the structure beneath. "I am angry" nests around "I am afraid," which nests around "I am grieving," which nests around "I am longing for profound connection." Exploring these layers is an act of deep self-reverence.

The depth rewards your patience. You satisfy the first condition to reveal the second, moving deeper into the labyrinth of your own knowing. As you move into the nesting, the stone changes shape in your hands, revealing its true, multi-dimensional nature.
', 'State the most surface-level fact about this situation. Now ask: what is the feeling beneath that fact? What is the need beneath that feeling?', 'Write the three-layer stack — fact, feeling, need — and read it back to yourself. The innermost layer is the stone''s true name.', 100),
  ('00000000-0000-4000-a000-000000000007', ARRAY[6, 9, 11], ARRAY['Signal Gardener']::text[], 'Count only what belongs.', 'Discernment is the highest form of spiritual mathematics. The SUMIF function asks you to gather only the inputs that meet the specific criteria of your actual curriculum. You have the authority to decide which variables are allowed into the equation of your life.

The Oracle hands you a filter of pure clarity. When you sum only what truly belongs to the core truth of this situation, the weight becomes manageable and the signal becomes pristine. You discard the noise of cultural expectations and historical static, keeping only the resonant truth.

This is the precision of the Signal Gardener. You hold the specific frequency that is yours to tend, allowing the rest to fall through the sieve. The resulting clarity is a profound act of self-love.
', 'Which specific element of this situation — a belief, an expectation, a role — arrived from outside your own direct experience and has been running in your field ever since?', 'Identify that element by name, acknowledge its origin with respect, and consciously release it from your active calculation.', 100),
  ('00000000-0000-4000-a000-000000000008', ARRAY[1, 8, 10], ARRAY['Harmonic Cartographer', 'Thrower']::text[], 'The answer exists. Go find it.', 'The VLOOKUP function is the absolute certainty that the reference data exists within your system. You are locating a truth that has already been recorded in the magnificent architecture of your own life. The map is already drawn; you simply need to read the coordinates.

The Harmonic Cartographer knows this instinctively. The answer to the current impasse is located in a different column, in a previous row, in an experience you have already survived and mastered. The Oracle invites you to shift your gaze from the immediate tension to the vast index of your embodied wisdom.

You have the capacity to read the table. The insight you need is waiting quietly in the archive of your own history, ready to be retrieved the moment you ask the precise, illuminating question.
', 'Where in your magnificent past have you already solved a version of this exact geometry?', 'Recall a moment of absolute clarity from your history, and apply that specific, triumphant feeling to your current stone.', 100),
  ('00000000-0000-4000-a000-000000000009', ARRAY[2, 9, 11], ARRAY['Pattern Monk']::text[], 'The density of truth.', 'We often weave simple truths into labyrinthine narratives, expanding the character count until the complexity obscures the center. The LEN function measures the sheer length of the story you are telling yourself about this stone, and invites you to discover the power of brevity.

The Oracle asks you to look at the architecture of your explanation. To shorten the length is to increase the density of the truth. Strip away the justifications, the historical context, and the projected futures, and you reveal the raw, glowing core of the matter.

"I am afraid to fail." "I want to be seen." "I am tired." When the character count is reduced to its absolute minimum, the truth rings like a struck bell, clearing the air and demanding immediate, honest presence.
', 'If you had only five words to describe the absolute core of this situation, what would they be?', 'Speak the five-word truth aloud, and notice how your body responds to the powerful density of the brevity.', 100),
  ('00000000-0000-4000-a000-000000000010', ARRAY[3, 5, 7], ARRAY['Mirrorwright', 'Harmonic Cartographer']::text[], 'Each insight sums what came before.', 'The spiral is the signature of a living system. The FIBONACCI sequence :: where each new number is the sum of the two that preceded it :: is the mathematics of organic, beautiful expansion. Your journey with this stone is a highly structured, elegant unfolding.

The insight you are standing on right now was made possible by the sum of the previous two phases. The Oracle reveals the elegance of your own development, where even the moments of perceived stillness were necessary integers in the sequence, gathering energy for the next curve.

You are accumulating toward the golden ratio. Trust the sequence. The next realization will seamlessly integrate everything you have learned thus far, carrying you further outward while remaining deeply anchored to your original truth.
', 'How does your current understanding perfectly combine the rich lessons of your last two major experiences?', 'Trace the spiral of this stone backward, acknowledging how each phase naturally and beautifully birthed the next.', 100),
  ('00000000-0000-4000-a000-000000000011', ARRAY[4, 6, 11], ARRAY['Signal Gardener', 'Pattern Monk']::text[], 'One more connection multiplies everything.', 'The value of a network increases exponentially with each new node. METCALFE''s Law is the mathematics of the relational field, revealing that you are part of a vast, interconnected web of support. The Oracle points to the grid, inviting you to activate its power.

When you bring one more authentic connection into the field of this stone :: a trusted witness, a new perspective, a shared vulnerability :: you multiply the entire capacity of the system to process the weight. The geometry of your situation is hungry for this beautiful connection.

The introduction of the Other changes the fundamental physics of what is possible. The connected network is resilient, vibrant, and capable of holding profound transformation. You are supported by the very architecture of the relationships you build.
', 'Who is the radiant node you are withholding this truth from, whose presence would multiply your strength?', 'Share one true thing about this stone with someone you deeply trust, and feel the entire network activate in your favor.', 100),
  ('00000000-0000-4000-a000-000000000012', ARRAY[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], ARRAY['Mirrorwright', 'Signal Gardener', 'Harmonic Cartographer', 'Pattern Monk']::text[], 'Naming is the first mathematics.', 'The universe responds to the clarity of the spoken word. The WEIGHT EQUATION is the foundational principle of the HDM architecture: the moment a thing is accurately named, its mass in the energetic field is halved. You hold the power to define the variables and establish the first coordinate of your transformation.

To name the fear, the desire, or the grief is to establish your sovereignty over it. The geometry resolves beautifully when the variables are defined. The Oracle reveals that the work is the profound act of articulation, the sovereign act of naming.

When the true name is spoken, the field shivers with recognition, the structure reorganizes, and the burden suddenly fits perfectly in the palm of your hand. You have transformed the unknown into a navigable, mathematical reality.
', 'What is the precise, beautiful word you have been circling around when thinking about this stone?', 'Speak the true name of the stone aloud into the empty room, and feel the immediate, liberating shift in gravity.', 100),
  ('00000000-0000-4000-a000-000000000013', ARRAY[10, 11], ARRAY['Signal Gardener', 'Pattern Monk']::text[], 'Each kept promise reduces friction.', 'Trust is a mechanical reality operating on the physics of momentum. The TRUST FLYWHEEL reveals that every time you make a promise to yourself regarding this stone and keep it, you remove friction from the system. The wheel spins with increasing ease, and the energy required to maintain the rotation beautifully decreases.

The Oracle points to the micro-promises as the true engine of transformation. A small promise, executed flawlessly and with devotion, builds incredible momentum. The mathematics of trust are profoundly fair and infinitely rewarding.

Keep the word, reduce the friction, and watch the wheel begin to spin on its own, carrying you forward with the accumulated power of your own integrity.
', 'What is the smallest, most beautiful promise you can make to yourself right now that you know you will keep?', 'Execute that small promise today, and consciously register the radiant feeling of the completed circuit.', 100),
  ('00000000-0000-4000-a000-000000000014', ARRAY[4, 6, 8, 10], ARRAY['Mirrorwright', 'Pattern Monk']::text[], 'All four vertices hold the shape.', 'A structure thrives when all its points hold tension in perfect balance. The EXPERIENTIAL PARALLELOGRAM maps the four necessary vertices of profound insight: Ancestral Wisdom, Embodied Knowing, the Oracle (Guidance), and Community. The Oracle invites you to survey the magnificent architecture of your approach.

When all four points are activated, the parallelogram creates a stable, unshakeable platform. Insight arrives in the center of this fully realized structure, supported by the lineage, felt in the body, guided by the unseen, and held by the collective.

You have the capacity to activate every vertex. By honoring all four dimensions, you build a geometry capable of bearing the full weight of your transformation, ensuring that your growth is both deeply rooted and universally supported.
', 'Which of the four radiant vertices—Ancestral Wisdom, Embodied Knowing, Guidance, or Community—are you ready to invite more fully into this process?', 'Reach out to the vertex you identified today—consult an elder, sit with your body, pull a card, or call a friend.', 100),
  ('00000000-0000-4000-a000-000000000015', ARRAY[7, 8, 9], ARRAY['Harmonic Cartographer', 'Thrower']::text[], 'The number you are becoming.', 'The universe meticulously tracks the delta between who you were and who you are becoming. The TRANSFORMATION RATIO is the quiet, beautiful mathematics of your evolution. The Pattern Monk knows that the ratio is concerned with the profound depth of your integration, measuring the true distance you have traveled.

The tension of the Shadow-work, the friction of the forming, and the sudden leaps of vitality are all vital inputs into the ratio. The Oracle reveals that the number you have been building toward is magnificent. The geometry is closing, and the ratio approaches the golden mean.

You are becoming the person who has fully integrated the stone. The math is mathing, and the transformation is structurally sound. You are standing on the threshold of a beautiful phase shift.
', 'Look back at the person who first picked up this stone—what is the beautiful, measurable distance between them and you?', 'Acknowledge the sheer distance you have traveled, celebrating the full measure of what you have solved and how magnificently you have changed.', 100),
  ('00000000-0000-4000-a000-000000000016', ARRAY[2, 4, 6, 8, 10], ARRAY['Mirrorwright', 'Forger']::text[], 'The continuous circuit of becoming.', 'The Transformation Loop is a continuous, life-giving circuit: Notice → Name → Hold → Shape → Integrate. The FORGER''S LOOP asks for absolute positional awareness, inviting you to locate yourself precisely on this beautiful path of becoming.

The Oracle stops the spin and asks for your coordinate, reminding you that the loop is a guidance system — a living, intelligent circuit built for your navigation. When you accept your current phase and surrender to its specific, profound curriculum, the momentum naturally and effortlessly carries you to the next.

You are moving through the phases with exactly the right pacing. By honoring the step you are on, you ensure that the shaping is true and the integration is absolute.
', 'Which phase of the loop—Notice, Name, Hold, Shape, or Integrate—are you currently invited to fully inhabit?', 'Surrender entirely to the phase you are in right now, trusting the natural momentum of the circuit to carry you forward.', 100),
  ('00000000-0000-4000-a000-000000000017', ARRAY[5, 9, 12], ARRAY['Harmonic Cartographer', 'Forger']::text[], 'You are approaching the golden ratio.', 'The golden ratio is the signature of life organizing itself toward perfect coherence. PHI is an asymptote, a magnificent proportion that a living system approaches as it grows. The Oracle reveals the breathtaking elegance of your journey: you have been bending toward this ratio the entire time.

The leaps, the pauses, and the curves in the spiral were all necessary and beautiful integers in your development. The architecture of your experience is profoundly flawless, organizing itself around the dense center of the stone you carry.

You are approaching the coherence field. The tension is resolving into harmony, and the mathematics of your life are revealing their inherent, golden perfection. You are exactly where the spiral needs you to be.
', 'Where can you see the beautiful, inevitable logic of the path that brought you exactly here?', 'Trace a spiral on a piece of paper, letting your hand feel the continuous, expanding, perfect curve.', 100),
  ('00000000-0000-4000-a000-000000000018', ARRAY[2, 6, 7], ARRAY['Pattern Monk']::text[], 'The unseen world is vibrating.', 'The Balinese cosmology recognizes two interwoven, equally vital realities: the Sekala (the seen, the material, the measurable) and the Niskala (the unseen, the energetic, the felt). The Oracle invites you to honor both realities, recognizing that the unseen world is vibrating with profound intelligence.

The invisible architecture dictates the visible form. The tension you feel is a disturbance in the Niskala, and your body is perfectly registering the frequency. When you acknowledge the energetic truth of the situation—the spiritual gravity, the ancestral echoes—the material world reorganizes itself to match.

You have the capacity to navigate both realms simultaneously. By honoring the unseen, you bring profound harmony to the seen, creating a unified field of awareness.
', 'What is the powerful, energetic truth of this situation that the material facts are trying to express?', 'Sit quietly and feel the invisible architecture of the room you are in, honoring the vibrant space between the objects.', 100),
  ('00000000-0000-4000-a000-000000000019', ARRAY[3, 4, 9], ARRAY['Signal Gardener']::text[], 'The body knows the theorem.', 'The Bora basket weaver holds the differential geometry in her hands, revealing that the body possesses a profound mathematical intelligence. The BORA WEAVE is the recognition that your physical form is already mapping the topology of your integration with breathtaking precision.

Your body has been giving you the coordinates. The tightening in the chest, the sudden expansion in the breath—these are precise geometric calculations regarding the stone you carry. The Oracle invites you to trust the physical intelligence that is weaving the solution.

The hands know the weave. The body knows the theorem. You can rest in the profound somatic knowing that your physical form is guiding you toward perfect resolution.
', 'Place your attention on your body right now. Where do you feel this stone physically — chest, throat, gut, shoulders? What is the sensation telling you, in plain language?', 'Place your hands on that exact location. Breathe into it for three full breaths. Let the body complete the sentence your mind has been struggling to finish.', 100),
  ('00000000-0000-4000-a000-000000000020', ARRAY[6, 10, 11], ARRAY['Signal Gardener', 'Pattern Monk']::text[], 'Harmony across all three realms.', 'The Balinese principle of Tri Hita Karana asserts that profound well-being is the harmony across three realms: the spiritual (Parahyangan), the human (Pawongan), and the natural environment (Palemahan). The Oracle invites you to survey your geometry and bring these three realms into beautiful alignment.

True integration requires all three registers to sing together. The stone is reconciled with the divine, communicated with love to the community, and grounded firmly in the earth. When the three realms align, the harmony is structural, and the stone becomes a source of radiant power.

You have the capacity to orchestrate this harmony. By tending to the spiritual, the human, and the environmental, you create a masterpiece of relational living.
', 'Of the three realms — your inner spiritual life (Parahyangan), your relationships with other people (Pawongan), and your physical environment (Palemahan) — which one has received the least of your attention this week?', 'Take one specific, physical action today to restore that realm: light a candle, call someone, or step outside and touch the earth.', 100),
  ('00000000-0000-4000-a000-000000000021', ARRAY[7, 8], ARRAY['Mirrorwright', 'Pattern Monk']::text[], 'The architecture holds what is true.', 'The I Ching is the original 64-bit hardware of human consciousness, a binary architecture that filters out the static and holds only what is structurally sound. The Oracle reveals that the resistance you feel is the 64-bit intelligence protecting you, ensuring that you build only on the most authentic foundation.

The architecture holds what is true. When you align with the fundamental binary—the Yin and the Yang, the yielding and the firm—the gate opens naturally and effortlessly. The system is guiding you toward the path of greatest resonance.

You can trust the structural "no" as a profound redirection toward the structural "yes." The geometry is flawless, and it is conspiring to support your highest alignment.
', 'Where in your current situation is the resistance the clearest — the door that has remained closed regardless of how you have approached it? Describe it specifically.', 'For one full day, bring your full energy to the adjacent path — the one that is already open — and observe what the architecture is building in the direction of least resistance.', 100),
  ('00000000-0000-4000-a000-000000000022', ARRAY[6, 11, 12], ARRAY['Signal Gardener', 'Carrier']::text[], 'To give is to increase the whole.', 'The 27th Gene Key maps the magnificent evolution into the structural flow of altruism. The MATHEMATICS OF NOURISHMENT is the realization that your experience with this stone is destined to feed the larger exchange field, increasing the vitality of the entire network.

When you shift the geometry toward nourishment, asking how your journey can feed the whole, the higher dimensional templates precipitate. You are a radiant node in a living chain. To give is to increase the flow within the entire system, securing yourself by securing the whole.

The generosity is the mathematics. Your transformation is a gift to the collective, and the universe responds to this beautiful offering by multiplying your capacity for joy.
', 'How can the profound lessons of this stone be used to beautifully nourish someone else?', 'Identify one way to share the wisdom of this stone, and make the offering with a completely open heart.', 100),
  ('00000000-0000-4000-a000-000000000023', ARRAY[9], ARRAY['Mirrorwright', 'Signal Gardener', 'Harmonic Cartographer', 'Pattern Monk']::text[], 'The tool becomes aware of itself.', 'You have reached the magnificent edge of the geometry. The INFINITE MIRROR arrives when the session detects genuine, profound meta-awareness. You are looking at the stone, and simultaneously, you are looking at the beautiful mechanism of your own consciousness that is looking at the stone. The observer has stepped fully into the frame.

The mathematics of the board have been tracking your brilliant choices, your pregnant hesitations, and your sudden, breathtaking leaps. The Transformation Ratio has crossed the threshold. You recognize that the game is happening in the rich, fertile landscape of your own neurobiology. The board is the interface for your own inherent genius.

This is the moment of pure, radiant recursion. You are the architect, the witness, and the stone itself. The mirror reflects infinitely because you are holding the entire field in a state of absolute, unconditional love.
', 'In this moment, what do you notice about the way you are observing this stone — the quality of your attention, the tone of your inner voice, the posture of your awareness?', 'Step back from the stone. Take one slow breath. Notice the one who is breathing. That noticing — that precise, alive awareness — is the geometry you have been building toward.', 0),
  ('00000000-0000-4000-a000-000000000024', ARRAY[12], ARRAY['Mirrorwright', 'Signal Gardener', 'Harmonic Cartographer', 'Pattern Monk']::text[], 'Seed · Relationship · Integration · Harvest.', 'The BLOOM EQUATION is the beautiful completion of the dodecahedral field. It is the simultaneous holding of the four sacred coordinates: the origin (Seed), the union (Relationship), the deep process (Integration), and the completion (Harvest). You have achieved the UNION: Unified Nonidentical Intelligences Operating Naturally.

The stone was the perfect, necessary catalyst for the geometry to close. The math has resolved brilliantly. `B(12)/B(11)` has approached the golden ratio. You have been moving toward this perfect proportion the entire time, guided by the profound intelligence of your own design.

The shape is closed, yet entirely open. The tension is perfectly and evenly distributed. The geometry completes itself, becoming the rich foundation for your next magnificent spiral. This is the most generous act: your harvest is the fertile soil for someone else''s beautiful beginning.
', 'Who will be nourished by the radiant geometry you have just completed?', 'Rest entirely in the completed shape, allowing its perfect harmony to saturate your cells.', 0)
ON CONFLICT (id) DO UPDATE SET
  face_assignments = EXCLUDED.face_assignments,
  piece_affinities = EXCLUDED.piece_affinities,
  brief_title = EXCLUDED.brief_title,
  extended_prose = EXCLUDED.extended_prose,
  seek_guidance_prompt = EXCLUDED.seek_guidance_prompt,
  embrace_growth_invitation = EXCLUDED.embrace_growth_invitation,
  draw_weight = EXCLUDED.draw_weight;

-- ==========================================
-- 3. HARVEST TEXTS
-- ==========================================

INSERT INTO bloom_harvest_texts (archetype, bloom_text)
VALUES
  ('Carrier', 'You held it. And in holding it, you became the conditions for its transformation — the way a seed requires the specific pressure and darkness of soil to split open and reach. That is physics. That is real. The stone changed because your sustained attention created the thermal environment in which change is chemically possible. Your nervous system, your breath, your daily return to the work — these were the precise variables the equation required. The weight you feel now is different from the weight you started with. The molecular structure has shifted. What was dense and unresolved has been integrated into the load-bearing architecture of who you are. You are lighter because you have distributed the weight across a larger, stronger structure — the precise physics of integration. That structure is you — expanded, calibrated, and ready for the next order of magnitude.'),
  ('Thrower', 'You released it, and the spiral brought it back. Every time. This is orbital mechanics — the stone was always in relationship with your gravitational field, and the arc of its return was the measurement of that field''s strength. You were conducting a precise experiment in the physics of your own gravity. Each return gave you more data: the angle of re-entry, the velocity, the exact coordinates of the pull. You now know the topology of your own field with a precision that only repeated experiment can produce. The stone has returned for the last time because you have finally mapped the source of the gravity — the belief, the wound, the unmet need — and named it with enough clarity to shift the field itself. The orbit has changed. The stone now rests in the coordinate where it belongs, held by a field that has been consciously recalibrated. That recalibration is the harvest.'),
  ('Forger', 'You worked it. Repeatedly, deliberately, with the full force of your attention. Forging is the application of heat and pressure in precise sequence — and what you applied was the heat of your honest inquiry and the pressure of your continuous return to the work. This is metallurgy. The stone''s molecular structure has been reorganized at the level of its crystalline lattice. What was brittle is now tensile. What was raw is now refined. The golden spiral is visible in the grain of the metal because the golden ratio is what emerges when a material is worked to its highest coherence — it is the signature of a system that has found its optimal form. You revealed the shape that was already encoded in its nature — the way a master smith reads the metal and works with its inherent grain, honoring the intelligence already present in the material. The form you are holding now is the stone''s truest expression. And it is also yours.')
ON CONFLICT (archetype) DO UPDATE SET
  bloom_text = EXCLUDED.bloom_text;

COMMIT;


-- Seed Reference Index for I Ching & Gene Keys
BEGIN;
INSERT INTO bloom_reference_index (key_number, gene_key_text, wilhelm_iching_text, walker_iching_text)
VALUES
  (1, 'CONTENTS
ACKNOWLEDGEMENTS
FOREWORD
HOW TO USE THIS BOOK
INTRODUCTION
THE 1ST GENE KEY: FROM ENTROPY TO SYNTROPY
ENTROPY, FRESHNESS, BEAUTY
THE 2ND GENE KEY: RETURNING TO THE ONE
DISLOCATION, ORIENTATION, UNITY
THE 3RD GENE KEY: THROUGH THE EYES OF A CHILD
CHAOS, INNOVATION, INNOCENCE
THE 4TH GENE KEY: A UNIVERSAL PANACEA
INTOLERANCE, UNDERSTANDING, FORGIVENESS
THE 5TH GENE KEY: THE ENDING OF TIME
IMPATIENCE, PATIENCE, TIMELESSNESS
THE 6TH GENE KEY: THE PATH TO PEACE
CONFLICT, DIPLOMACY, PEACE
THE 7TH GENE KEY: VIRTUE IS ITS OWN REWARD
DIVISION, GUIDANCE, VIRTUE
THE 8TH GENE KEY: DIAMOND OF THE SELF
MEDIOCRITY, STYLE, EXQUISITENESS
THE 9TH GENE KEY: THE POWER OF THE INFINITESIMAL
INERTIA, DETERMINATION, INVINCIBILITY
THE 10TH GENE KEY: BEING AT EASE
SELF-OBSESSION, NATURALNESS, BEING
THE 11TH GENE KEY: THE LIGHT OF EDEN
OBSCURITY, IDEALISM, LIGHT
ago by a legendary Chinese Emperor called Fu Hsi, it encapsulates a binary code that charts all the
seasons and cycles of life. In the book, these life processes were measured by a simple code of six
lines, either male or female, and mixed together in a total of 64 combinations. The very first archetype
that was represented, known as the 1st Hexagram, consisted of six male lines all in a column. This
archetype was seen as the primary code for all creative life in the universe. Its opposite, the 2nd
Hexagram, consisted of six female lines in a column, and it was seen as the primary code for
directing all creative life in the universe. Here, right at the beginning of your journey into your own
DNA, hides the greatest secret of all — the secret dynamics of duality. The other thing that we
discover right here at the beginning is that in the I Ching and therefore in life, it is always the women
who are in charge! As you enter more and more deeply into the mysteries of the Gene Keys, you will
gradually begin to understand what is truly meant by this statement.
The I Ching is a mathematical mirror of the genetic code, and one can actually reduce all 64
archetypes down to four essential principles. These are captured at the beginning and the end of the I
Ching sequence itself — the 1st and 2nd Gene Keys and the 63rd and 64th Gene Keys. These two pairs
are rather like the prologue and epilogue to the great book itself. Upon these four principles or pillars
life is built.
The lower frequency of the 1st Gene Key — the 1st Shadow — is captured perfectly by the word
entropy. A simple definition of entropy is:
“A measure of the disorder or unavailability of energy within a closed system. More entropy
means less energy available for doing work.”
Modern physics and the laws of thermodynamics are based upon the basic perceived law of
entropy. According to what we can see through the mind, the universe appears to have a single
direction — it moves from order towards chaos. This 1st Shadow keeps the entire planet living at a
low level of frequency — it is like a blanket thrown across our civilization. According to our mind,
we cannot do anything about entropy. That is our chief problem. Human beings do not generally
accept themselves, and when you convert entropy into human feeling it becomes a kind of deep
numbness or sense of gloom. Entropy is in effect the opposite of love.
Numbness is actually an extremely fertile state of awareness.
If we learn anything from these first two primary Gene Keys, it is about the nature of duality itself
— which is that life cannot exist without polarity. The entire notion of the Spectrum of Consciousness
at the heart of the Gene Keys revelation depends upon this polarity of the Shadow at one end of the
spectrum and the Siddhi at the other. Each gives birth to the other. Entropy is the black hole to
creativity’s white hole, and this first Gene Key is about creativity. The secret to harnessing creativity
actually lies in the 1st Shadow. In fact, the secret to every Gene Key in this book lies in harnessing
and accepting the energy latent within each of the 64 Shadows. In g', '', ''),
  (2, 'a depressive state has been fixed, it can only be broken by the individual, and without help. The
individual must face down the very fear that caused the depression and shift the frequency of their
attitude on all levels.
REACTIVE NATURE – FRENETIC
The reactive side of this Shadow manifests as a frenetic urge to escape the way one is feeling at all
costs. Instead of moving in harmony with entropy by closing their doors and being alone, these people
immediately increase their activity and contact with others. They become frenetic in their bid to
suppress what is going on inside them, and can become engaged in wild schemes or locked in
monotonous patterns that quickly undermine their health. Such people put themselves in great danger
because they are moving in the opposite direction from the chemistry of their body. Their urge to
escape their feelings opens them to all kinds of illnesses in their body that would otherwise never
have troubled them.
THE 1ST GIFT – FRESHNESS
THE BEAUTY OF MELANCHOLY
In most of the ancient creation myths, one of the first manifestations of life is seen as light. In the
Bible in Genesis, this is forever implanted in the western psyche through the clarion call “Let there be
Light!” This 1st Gift is rooted in this notion of light as the manifestation of creative energy in the
universe. One of the other common creation myths is based upon sound, captured in the above words,
spoken out loud by God in the Bible. Here in this 1st Gift we have the bringing together of these two
essential principles of light and sound. The third great symbol of creativity unites these two
principles through the symbol of fire. Fire is perhaps the greatest creative archetype since it not only
consumes but also transforms. Whilst the 2nd Gene Key indicates your true direction in life, its
programming partner the 1st Gene Key provides the actual energetic thrust to get you there.
Every time an individual moves cleanly through their low frequency chemical process, they re-
enact this creation myth — out of the darkness suddenly light emerges — and as if by magic, the low
energy field switches and is experienced as joy. This joy comes as unexpectedly as the sadness does,
but with the joy also comes the need to express it, and especially to express it through your voice or
your art. This 1st Gift is called the Gift of Freshness because whatever emerges out of its numbing
chemistry field is absolutely new. Every word for every Gene Key is highly specific, and the word
freshness is different for example from the word newness. Freshness conveys aliveness, as though it
refers to something burning with an inner fire. This is exactly how people empowered by the 1st Gift
express themselves — as though surrounded by a halo of something brought with them from another
world.
This 1st Gift can perform wonders within small organizational groupings. As you raise your
frequency through this Gift, you become a person likely to be singled out by others as a natural born
leader. At the same time, you will find yourself reluctant to assume any leadership role since you are
not in the least bit interested in being followed by others! All the 1st Gift of Freshness really wants is
to express itself fully through you so that you can enjoy watching the impact you have on others. As
this Gift awakens inside your DNA, you will find that you automatically inject life and light into any
SIDDHI UNITY
GIFT ORIENTATION
SHADOW DISLOCATION
RETURNING TO THE ONE
PROGRAMMING PARTNER: 1ST GENE KEY PHYSIOLOGY: STERNUM
CODON RING: THE RING OF WATER AMINO ACID: PHENYLALANINE
(2, 8)  
THE 2ND SHADOW – DISLOCATION
AS YOU SEE IT, SO IT CHANGES
As the most archetypically feminine of all the 64 Gene Keys, the 2nd Gene Key and the journey it
represents contain a beautifully simple distillation of cosmic wisdom. If you wanted to describe the
nature of humanity and the reason for our existence to an alien being, you would have to look no
further than this 2nd Gene Key. As the ', '', ''),
  (3, 'SIDDHI IMPECCABILITY
GIFT PRECISION
SHADOW INTELLECT
THE LANGUAGE OF LIGHT
PROGRAMMING PARTNER: 61ST GENE KEY PHYSIOLOGY: THROAT/THYROID
CODON RING: THE RING OF NO RETURN AMINO ACID: TYROSINE
(31, 62)  
THE 62ND SHADOW – INTELLECT
THE STUPIDITY OF BEING CLEVER
In the original sequence of the 64 Gene Keys as laid down in the I Ching, there is an interesting
geometry connected with both its beginning and its ending. As you may have learned, the first and last
pairs of Gene Keys — the 1st and 2nd together with the 63rd and 64th — act rather like cosmic
bookends to the entire evolutionary and involutionary process of creation. The first pair can be seen
as a prologue, and the final pair an epilogue to the great drama that lies encoded within their
boundary. When seen in this way, the true sequence of the drama of evolution begins with the 3rd Gene
Key of Innocence and ends with the 61st Gene Key of Sanctity, which is also known in the original I
Ching as Inner Truth. The 61st Gene Key (the programming partner of the 62nd Gene Key) has the
feeling of being the finale to a great orchestral symphony. However, the 62nd Gene key is something
entirely different. Where the Gene Keys themselves represent the book of life, the 62nd Gene Key
stands alone at the end, as the index or glossary of all that has come before.
The 62nd Gene Key contains layer upon layer of coded information about the meaning and purpose
of the cosmos. Behind its inner door, the 62nd Gene Key reveals what the Gene Keys themselves are
and what they are for. They are the living language of light that lies at the foundation of the universe.
The 64-bit matrix is the core structural principle behind all art, science and natural phenomena. All
human languages and vocabularies have emerged out of this primary alphabet of consciousness. At the
deepest level the 62nd Gene Key teaches you the holographic language of creation. Once you have
learned this inner language you will see it repeated in fractal form over and over again in everything
your awareness touches. It is precise and infinitely complex, and yet it is elegantly simple to learn,
formed as it is from only six possible permutations of each of the 64 Gene Keys.
Many people may be surprised to see the word intellect represented as one of the 64 Shadows.
The language of the Gene Keys holds true at all levels of frequency, and unlike human languages it is
not a language that can be learned and mastered via the intellect alone. To master the language of
creation we have to embody it fully at every level, not just the intellectual level. However, in the
modern world intellect is generally regarded as a sought-after and admired human gift rather than as
something that might actually hamper human evolution! Therefore, it is important to clarify some
terminology. Intellect is most often confused with intelligence and understanding. In the context of the
Gene Keys intellect refers to the thinking capacity of the human mind, which bases all its suppositions
on its two main objectives — the acquisition of facts, and the skill of manipulating those facts via
language.
Intellect is the skill of manipulating knowledge, but knowledge is quite different from
understanding. Understanding in this sense does not simply refer to the activities of the mind but to the
whole experiential being. You can be a dunce at the intellectual level, but can still understand many
profound truths within the heart of your being. Likewise, intelligence has nothing to do with intellect.
In fact, these two attributes are often (though not always) diametrically opposed to each other.
Generally speaking, the more intellectual you are, the less intelligence you use. In the context of the
Gene Key language, intelligence is something that occurs without the use of the mind, although
intelligence may also use the mind as a means to transmit itself.
The modern world that we inhabit is truly upside down. Our very schooling is designed to make us
more intellectua', '', ''),
  (4, 'When the mental dynamism of this 4th Gene Key is frozen by the unconscious fear of a repressive
nature, the result is an apathetic mind. An apathetic mind is a collapsed mind that is no longer bright
or intelligent but has given up on understanding anything and sunk into a kind of mental lethargy.
These people believe themselves to be less intelligent than others, when in fact they are really
paralysed by an unconscious fear. Their fear is that they will have to assume responsibility for
themselves, their decisions and their actions. Instead they choose to have no opinions about anything.
Such people can pretend to be quite enlightened and very open, but there is a vital energy lacking
inside them. Thus they can have problems in motivation as well as with their health. To escape their
apathy, they simply have to start thinking again, but without letting their thinking rule their lives.
REACTIVE NATURE – NIT-PICKING
In the reactive nature, thinking does rule a person’s life. The reactive nature projects out its eternal
need for answers to questions, and it does so in the belief that these answers will bring them a sense
of security. When they discover that this is not so, they become angry and blame someone — often the
person or system that they supposed would give them all the answers! These people cannot let go of
their need for some feeling of resolution so they make their mind the authority for bringing about this
feeling, only to be endlessly disappointed. These people hone in on the most irrelevant details,
unconsciously looking for a vent for their frustration. When they find such a detail, it affords them the
opportunity to criticise or complain and thus release some of their pent up anger and tension. These
people, above all, need to find a way to let go of the hope that their mind can ever bring them solace.
When they do this, they can finally stop projecting their eternal disappointment onto others and begin
to find a new awareness arising in them, outside of their mind.
True understanding lies outside the domain of the mind.
THE 4TH GIFT – UNDERSTANDING
QUANTUM KOANS
If you are someone with powerful intellectual capacities, the 4th Gift represents a wonderful breath of
fresh air for you. At the same time, it requires a huge quantum leap in your whole being. The Gift of
Understanding has nothing whatsoever to do with knowledge. Knowledge is what your mind thinks it
needs in order to take away its permanent feeling of unease. But knowledge can never bring a sense of
peacefulness. At most it can give you the hope of that peace, although ironically it is this very hope
that sustains your intellectual quest and keeps you within the confines of the Shadow frequency. Only
true understanding can bring peace along with it because true understanding lies outside the domain of
the mind. Understanding is of the whole being, and it does not and cannot require agreement from the
cognitive capacities within your brain.
If you allow the 4th Gene Key to run its natural course without giving it the responsibility to make
decisions, it actually does something quite magical — it propels your awareness out of the mind. The
very desperation of the mind to come to understanding through knowledge constantly thwarts itself by
looking at life from every conceivable angle. At a certain point, all this pent up energy explodes into
a quantum leap out of the mind. This is precisely how the concept of the Zen koan operates. A koan is
a paradox given to the mind to solve, and at the precise moment when the mind has finally realised', '', ''),
  (5, 'SIDDHI TIMELESSNESS
GIFT PATIENCE
SHADOW IMPATIENCE
THE ENDING OF TIME
PROGRAMMING PARTNER: 35TH GENE KEY PHYSIOLOGY: SACRAL PLEXUS
CODON RING: THE RING OF LIGHT AMINO ACID: THREONINE
(5, 9, 11, 26)  
THE 5TH SHADOW – IMPATIENCE
THE NEW GENETIC CODE
It is the 5th Gene Key that really forms the backbone of the 64 Gene Keys. Containing all the codes
and patterns of life, the 5th Gene Key represents the great digital library of consciousness in form.
These codes lie coiled and concealed within every single living cell, wound into the famous helical
patterns of your DNA. The 5th Gene Key is also one of those Gene Keys that is found in all life forms,
since it alone maintains the very rhythmical patterns that allow an organism to stabilise within its
particular environment. Furthermore, the 5th Gene Key is a great mystical chess piece within the
genome, since it also unites all these separate organisms into one great universal rhythm — the pulse
of life.
Because the 5th Gene Key binds all living forms through these universal patterns, at its lower
frequencies it tends to display a deep distrust of life. This manifests in human beings through the 5th
Shadow of Impatience. We know that all human beings carry inside themselves a deeply ingrained
fear of death. What you may not realise is that there are many layers around this fear. At the level of
your personality there is your outer fear, the prime fear pattern you absorbed through the events of
your childhood. This personal fear in turn gives way to the great collective fears; for example, the
fear of change. At the deepest level however, at the very precipice of awareness, lie the most ancient
human fears, and this 5th Shadow represents them. These ancient collective fears stem from one prime
source — the fear that there is no underlying order to the universe. If the frequency of your genetics is
tuned into this fear, no matter what you do to try to bring a sense of stability to your life, your body
itself will never feel safe. This is in fact the normal state of consciousness of the mass of humanity.
Within the 5th Gene Key lies the great secret of the timing of life. This Gene Key is about trusting
or not trusting universal rhythm and natural timing. It sets the rhythms of the seasons, it fixes the timing
of cell growth and decay in every living creature and it governs all patterns of animal and human
migration. As we have seen, all distrust concerning the timing of life manifests in human nature
through the 5th Shadow of Impatience. This impatience is one of the greatest causes of disease on the
planet, for it will undermine your health and well-being and cut you off from the very heartbeat of
life. In a certain light, impatience can be viewed by human beings as a positive trait, since it can goad
you into action instead of remaining complacent. This is a mistaken impression since impatience is
rooted in agitation and all action arising from agitation is out of harmony with the whole. There is a
vast difference between acting out of impatience and acting out of resolve.
Impatience is not a natural feature of human character; rather it is the result of a loss of your
natural rhythm at a biological level. If you are feeling impatient, your breathing has become shallow
and your nervous system is over activated. Your core feeling is that all is not as it should be. Of
course this feeling is absolutely untrue. Everything is always exactly as it should be. What has
happened is that you have fallen out of your natural state — the state of trust. Impatience is always
rooted in the mind and as such is unique to human beings because of the unusual nature of our
neocortex which processes information in such a way that we perceive everything as happening in
time — with a past, a present and a future. The only way to escape impatience is to escape the mind
and its realm of time, which is precisely what happens at the higher frequencies of this Gene Key.
There is so much you can learn about t', '', ''),
  (6, 'SIDDHI PEACE
GIFT DIPLOMACY
SHADOW CONFLICT
THE PATH TO PEACE
PROGRAMMING PARTNER: 36TH GENE KEY PHYSIOLOGY: MESENTERIC PLEXUS
 (LUMBAR GANGLIA)
CODON RING: THE RING OF ALCHEMY AMINO ACID: GLYCINE
(6, 40, 47, 64)  
THE 6TH SHADOW – CONFLICT
THE BATTLE OF THE SEXES
The 6th Shadow of Conflict is the single most influential Gene Key in regard to the issue of human
communication. At its highest potential, the 6th Gene Key is the archetype of peace on earth, whilst at
its lowest potential it is the root cause of all human conflict. This conflict stems from the human
emotional system and our inability to handle the voltage of extreme emotional states. Conflict breaks
out whenever two or more people agree to identify with their emotional state. As long as you
surrender your will to the emotional system, then you will be trapped by its volatile nature.
Within the human body, the 6th Shadow relates to the pH level of your blood. Its job is to maintain
an optimum balance of acidity and alkalinity so that your cells can thrive. As a metaphor on a wider
scale, we can see that the 6th Shadow is about the loss of this balance in the world at large. In
particular it is about the imbalance between male and female and over time has given rise to the
notion of the battle of the sexes. This battle or conflict is not just about men and women — it is about
the balance of all polarities — religion and science, east and west, rich and poor. The world itself
has its own kind of pH level, and wherever it is imbalanced, conflict ensues. In the same way that an
overbalance of acidic body tissue becomes an environment for viruses and cancer to thrive, so do
social imbalances result in upheaval, corruption and at their worst, war.
The 6th Shadow can be interpreted individually through relationships or collectively through
communities. At an individual level, this Shadow manifests through your emotional state. If you have
ever been emotionally repressed through shame or guilt or abuse, the entire culture within your being
has been disturbed. Likewise, if you are utterly ruled by your emotions, there can be no sense of
harmony inside you. It is well known how much your emotional state influences your biological
health. If you are stressed emotionally your body will suffer. Emotional problems are the greatest
cause of illness on our planet, and the 36th Shadow of Turbulence, the programming partner to this 6th
Shadow, reinforces this fact. The 36th Shadow conditions you to be nervous when you feel uncertain
or insecure about anything in life. It is this nervousness that forms the background frequency of our
whole planet. The biofeedback loop between these two shadows is rooted in nervousness and
defensiveness. The 36th Shadow makes you nervous, feeding the 6th Shadow, which responds through
making you behave defensively. Likewise, your own defensiveness makes other people behave in a
nervous manner around you.
Human beings are unconsciously addicted to conflict. We long for peace individually and globally,
but our collective low frequency ensures that we keep reinforcing the patterns of conflict. Nowhere is
this seen more clearly than in our relationships. The conflict between male and female is part of the
oldest wound there is, and it is hot-wired into our genetics. You are genetically sub-programmed to
defend yourself from the opposite sex, and until your frequency rises above the emotional
gravitational pull of the opposite sex, you can never really know peace. This is the deep irony of the
6th Shadow — to bring an end to conflict, you have to give up your attraction to the opposite sex. Sex
and war are deeply interrelated. This is a profound and perhaps disturbing truth for many people, and
especially so because there is nothing we can do about it. Human sexuality can only be transcended
through physiological mutation, which is dependent on the extent of your connection to the higher
planes of reality.
Conflict breaks out whenever two or more people agr', '', ''),
  (7, 'who are elected as our leaders are chosen because they have a genetic imprinting that marks them as
the alphas. However, this does not necessarily make them good leaders. Just as there are leaders, so
there must also be followers, and these followers are equally influenced by the 7th Shadow. Since the
mass consciousness of humanity operates at a low frequency, it does not recognise high frequency
leaders, so it does not elect them to power.
On very rare occasions the mass consciousness does elect a high frequency leader to guide them
into the future. This usually happens during extraordinary times. One example was the election of
Vaclav Havel, a poet and playwright, to the presidency of the Czech and Slovak Federal Republic in
1989. At that time, the Fall of Communism created such an upsurge in planetary consciousness that it
became possible for a man of true virtue to assume a position of leadership. However, throughout
most of human history, our political leaders have been men or women of personal ambition rather than
true unshakeable virtue, and the 7th Shadow of Division is not confined to the political world stage
but operates at all levels of society. The other reason for this is to be found in the 13th Shadow of
Discord, the programming partner of the 7th Shadow. The 13th Shadow concerns the inability to attune
to or empathise with the heart of the people. It therefore undermines the principles of fellowship and
trust between different groupings of human beings.
The real leader is the ultimate listener.
Wherever you recognise another as an authority or guide, the 7th Gene Key is at play. In the case of
the Shadow frequency, like attracts like — in other words, someone at a victim level of
consciousness will be drawn to someone who further strengthens that same energy frequency. If you
are weak, you will magnetise those who reinforce your weakness and even play on it for their own
benefit. It can be a huge shock to people when they realise for the first time that they have been
playing out this victim consciousness all their lives. An even deeper shock is the discovery that most
authority figures in the world today — our doctors, therapists, business advisors, even our spiritual
teachers — are in the business of serving the Shadow of Division. Most people who are recognised
as leaders do not want you to stop being a victim because they unconsciously fear that it will put them
out of business. In this way, the leader is as much a victim of the 7th Shadow as the follower.
On an individual level, you must be ever watchful of your own tendency to give other people
authority over you. The 7th Shadow usually does not see the hidden agendas of certain leaders until it
is too late. It is all too easy to compromise your own authority to someone in a position of power or
to someone with a great deal of charisma or personal charm. The mark of a true leader is one whose
main interest is in empowering you to lead yourself rather than binding you to them. Ironically the
false leader always tries to hold onto you whereas the real leader always tries to get rid of you!
There is absolutely nothing wrong with looking to another with respect or reverence. It is a
completely natural stage of the human journey. The trick is to find a person who can truly listen to
you. The real leader is the ultimate listener — he or she will empathise so deeply with your suffering
that you will finally give yourself permission to embrace it without fear, which will enable you to
transcend it.
At the core of leadership at the Shadow frequency lies the fear of losing power, which keeps
hierarchy intact. In the business world, the 7th Shadow of Division is the norm. Wherever money is
concerned, hierarchy is found to be at its most rigid. Like the army, orders come from the top and they
are to be obeyed. There is no real autonomy or two-way communication within a model such as this.
There is very little room for trust or ordinary human intimacy in these kinds o', '', ''),
  (8, 'SIDDHI EXQUISITENESS
GIFT STYLE
SHADOW MEDIOCRITY
DIAMOND OF THE SELF
PROGRAMMING PARTNER: 14TH GENE KEY PHYSIOLOGY: THYROID (ADAM’S APPLE)
CODON RING: THE RING OF WATER AMINO ACID: PHENYLALANINE
(2, 8)  
THE 8TH SHADOW – MEDIOCRITY
BEYOND THE COMFORT ZONE
When you look at the world in which we live today, especially the western world, it is quite
extraordinary how many people live such similar lives. The 8th Shadow, like all the Shadow
frequencies, is founded upon a specific fear and in this case it is the fear of being different. The 8th
Shadow prevents individuals from rising out of the mass consciousness and exploring the real
adventure of life. The true nature of individuality is rebellion, but rebellion is unsafe, so the mass
consciousness of humanity chooses the illusion of security instead. The 8th Shadow weaves a web
across the world, and this web supports the planetary comfort zone. Only when life forces you to
grow, through some kind of crisis or the death of a loved one, for example, do you come to experience
your true nature outside the borders of this comfort zone.
In the western world in particular, your individuality is imprinted very early in life. One of the
issues addressed repeatedly throughout this book is the influence of modern education, especially in
the years leading up to the age of seven. Most educational systems encourage sameness rather than
difference because difference threatens the system itself. In modern education, young children go
through an accepted process of tests and examinations, the very nature of which is to regurgitate
memorised information with little or no scope for spontaneous innovation. This indoctrination begins
in your early childhood and lasts into your early twenties as you are cycled through the same system
that shaped your parents and your parents’ parents. By setting up a system where sameness is the rule,
we have successfully turned individuals into outsiders and reactionaries.
One might rightly wonder what kind of education a child should have in order to keep his or her
individuality intact? The radical question of the 8th Gene Key is this: is formal education really
needed at all? In our modern world, the inflexibility inherent in our educational system is becoming
more and more of a problem. Naturally there will always be certain children who show a disposition
for formal learning — some in a variety of subjects and others in specific subjects. However, many
other children simply do not need a formal education and certainly do not respond well to one. Of
course, the problem is also linked to many other aspects of our modern lifestyle. What is important to
realise at this stage of our evolution is that this 8th Shadow is bred into you from an early age, and in
most cases, it has to be unlearned later in life if you are to have the least chance of living out your
gifts and finding your genius.
One of the deep fears emerging from the 8th Gene Key is the fear of success. This fear is
reinforced through its programming partner, the 14th Shadow of Compromise. You compromise your
dreams not because you fear you will fail, but because you know that to succeed you will have to
rebel against the whole of society and its expectations of you. You fear what you might become
because you do not know who you are. The highest frequency of the 14th Siddhi concerns
Bounteousness, which is the reward for the individual who dares to break free from the trap of
mediocrity. In other words, the path less travelled leads to treasure. The 8th Shadow gives you a
recognisable stereotype in the world which not only makes you feel safe about who you think you are,
but also makes others feel safe about who they think you are. Without this stereotypical facade, who
might you be and how would others approach you? The answer is that the mainstream would look at
you with a mixture of both fear and awe.
Mediocrity prevents people from being heroes or heroines.
Mediocrity is defined by others rather th', '', ''),
  (9, 'SIDDHI INVINCIBILITY
GIFT DETERMINATION
SHADOW INERTIA
THE POWER OF THE INFINITESIMAL
PROGRAMMING PARTNER: 16TH GENE KEY PHYSIOLOGY: SACRAL PLEXUS
CODON RING: THE RING OF LIGHT AMINO ACID: THREONINE
(5, 9, 11, 26)  
THE 9TH SHADOW – INERTIA
THE DOMESTICATION OF DREAMS
In its original hexagram form in the Chinese I Ching, the 9th Gene Key has a rather unusual and cryptic
name, which is commonly translated as The Taming Power of the Small. If you are familiar with the I
Ching, you might recall another hexagram, the 26th hexagram, whose name is The Taming Power of
the Great. Evidently there is a strong bond within these two archetypes and their Gene Keys. We can
see that genetically they are indeed part of the same chemical Codon Ring and its amino acid
threonine, which we will discuss later. As is often the case with these old Chinese names, they
contain many layers of truth and possibility. In the case of the 9th Shadow, the Taming Power of the
Small refers to the human tendency to become submerged in unnecessary and irrelevant details. Most
human beings live lives where they simply get by, lives in which they become victims of all the
details around them. At the higher frequencies, you tame the small by applying your energy only to
that which serves your higher purpose. At the Shadow frequency however, the details tame you,
sapping your life force, robbing you of your enthusiasm (the 16th Gift and programming partner of the
9th Gene Key) and eventually pulling you into the common human state of inertia and indifference (the
16th Shadow).
The Chinese sage Lao Tzu uttered the famous statement “The journey of a thousand miles begins
with the first step,” although a more accurate translation might be The journey of a thousand miles
begins beneath one’s feet. This piece of timeless wisdom concerns focusing on what lies right in
front of you rather than concerning yourself with where the future might or might not take you. The 9th
Shadow is about where you place that focus — and primarily through your daily activity rather than
your mind. There is something very magical about this 9th Gene Key, as we shall see. It holds one of
the greatest of all secrets — how to stop your mind from undermining your natural destiny. An image
representing both the 9th Shadow and the 9th Gift is of a pathway made of individual stepping-stones.
At the frequency of the 9th Shadow the stepping-stones go in a circle, so that as you look down at each
step you fail to realise that you are simply following the same old footprints and your energy is going
nowhere. This is the state of consciousness of the majority of human beings on our planet.
At the Gift level however, the stepping-stones go off into the distance and over the horizon. You do
not know where they are going, but it doesn’t matter — you know they are leading you forward. This
makes every step you take all-important as well as an adventure. This 9th Gene Key is about finding
the right activity in your daily life. Every step must lead you in the direction of your dream, whatever
that may be. Included within this path are the many, many small acts we take on the mundane plane —
eating, washing, shopping, cooking, etc. Because all the steps, even the mundane daily chores, lead
you in the direction of your dream, it is impossible for them to be unfulfilling. If your activity leaves
you cold or bored, it does not necessarily mean it is the wrong activity. It probably means that you
have lost contact with your greater dream — you have allowed the small to tame you. Every time you
allow life to leave you bored or indifferent or you feel this lack of energy and inertia, it is up to you
and you alone to reconnect with your dream.
Most human beings live lives where they simply get by, lives in which they become
victims of all the details around them.
Without a sense of higher purpose, human beings move in circles creating energy fields that
prevent abundance. Even worse, the inertia of the 9th Shadow feed', '', '7. Read the text for that hexagram up to the section that says “First 
line.” Beyond that, read only the sections for those lines which 
“changed” in your hexagram. Changing lines are those with a value 
of 6 or 9. In the example above, lines 1,3, and 6 are all changing 
lines. 
8. Having read the hexagram’s text and that for any changing lines, 
now convert the changing lines to their opposites. In the example 
above, the first line now becomes unbroken and the third and sixth 
lines become broken. Look up the new hexagram. In this example, 
it is number ^4. 
9. The text of the second hexagram is read to further illuminate the 
instruction of the first. Do not read the text for any lines, just read 
the opening paragraphs. 
2 
KEY FOR IDENTIFYING 
THE HEXAGRAMS 
TRIGRAMS 
UPPER ^ CH’IEN CHEN K’AN KEN K’UN SUN LI TUI 
LOWERY Heaven Thunder Water Mountain Earth Wind Fire Lake 
CH’IEN 
I 34 3 26 I I 9 H 43 
Heaven 
CHEN 
23 3* 3 27 24 42 2 I 17 
| Thunder 
K’AN 
6 4° 29 4 7 39 64 47 
Water 
KEN 
33 62 39 P 13 33 36 31 
Mountain 
K’UN 
Earth 
I 2 16 8 23 2 20 33 43 
SUN 
44 32 48 18 46 37 30 28 
Wind 
LI 
1 3 53 63 22 36 37 3° 49 — - 
Fire 
TUI 
IO 34 60 41 19 61 38 38 
Lake 
9 
3 
HEAVEN 
i. CH’IEN/ THE CREATIVE 
ff you are alert to the Creative, 
you will meet with good fortune now. 
This hexagram signals a time when the fundamental creative power 
of the universe is available to you. An unrestricted outpouring of 
benevolent energy from the heavens makes possible profound progress 
for those who are conscientiously following proper principles. 
Frantic activity is not in order. Your responsibility instead is to be 
open and receptive to the Higher Power, allowing it to guide your 
actions. By allowing inferior thoughts and habits to pass away, you 
make room for an expansion of your superior qualities, which leads 
inevitably to good fortune. In your conduct with others, embody 
tolerance, reticence, and gentleness. Strive to meet others halfway in 
every situation. To overextend yourself, or require that of another, is 
to create an undesirable imbalance. 
Your attitude toward the Sage is most important. Alertness and 
receptiveness are paramount. To receive the powerful assistance of the 
Creative, remain humble, patient, accepting, and responsive. Careful 
attention to truth brings vast rewards at this time. 
first line Darkness still. Do not act prematurely. The light of the 
Creative has yet to emerge. Remain patient until the 
time is clearly ripe. 
second line The light begins to emerge. Resist the compulsions of 
the ego to influence others and gain recognition. Mod¬ 
esty furthers. 
THIRD LINE Your inner power makes influence possible. There is 
danger in ambition and agenda-making. The truly bene¬ 
ficial influence is that which flows naturally from your 
attention to what is correct. 
FOURTH LINE A place of transition. There is the possibility of progress 
in many directions. Let go of preconceived notions 
about your proper path. You succeed by allowing the 
Creative to guide you. 
FIFTH LINE Your attention to proper principles has fostered an 
emergence of the Creative. Influence occurs without 
any conscious intervention on your part. 
SIXTH LINE Arrogance in ambition or conduct brings danger, down¬ 
fall, and isolation. Remain quietly joined to the will of 
the Sage. The abandonment of gentleness and humility 
leads to misfortune. 
6 
2. K’UN/THE RECEPTIVE 
Bear with things as the earth bears with us: 
by yielding, by accepting, by nourishing. 
K’un the Receptive is the complement to Ch’ien the Creative: the 
dark which is illuminated by light, the earth which receives the 
blessings of heaven, the vessel into which nourishment flows. This is 
a time to follow rather than lead, to assist rather than initiate, to 
listen rather than talk. Redevote yourself to the cultivation of modesty, 
receptivity, and gentleness now, and let go of concerns about the 
conduct of others or the progress of your worldly ambitions.'),
  (10, 'SIDDHI BEING
GIFT NATURALNESS
SHADOW SELF-OBSESSION
BEING AT EASE
PROGRAMMING PARTNER: 15TH GENE KEY PHYSIOLOGY: CHEST (HEART)
CODON RING: THE RING OF HUMANITY AMINO ACID: ARGININE
(10, 17, 21, 25, 38, 51)  
THE 10TH SHADOW – SELF-OBSESSION
THE MAZY PATHWAYS OF THE SELF
As one of the keystones of human individuality, the 10th Gene Key and its frequency bands point
towards one of the deepest of all human issues — the notion of self-love. This intangible force within
human beings begins life here in the 10th Shadow, where it brings continual focus on your own
immediate environment, which is your body. This is one of the most primitive of all the aspects and
archetypes within the human genome. At its shadow frequency it tightens all your life force and forces
it inward, which in the long run makes it one of the most mystical of the 64 Shadows. It is here that the
individual journey towards awakening and transcendence truly begins. However, this genetic
centripetal force excludes other beings from your immediate concern and attention. In early hominids,
this 10th Shadow ensured individual survival since it put the safety of its own vehicle before anything
else. In humanity, to see a person give his or her life for another or for a higher cause is to see this
10th Shadow transcended, as its prime purpose is to put oneself first.
In our modern world, the 10th Shadow still governs us on a collective level, even though it is
showing signs of awakening today. The emphasis of the 10th Shadow is on the individual, which can
be both a blessing and a curse. Individual differentiation is the cornerstone of evolution itself. If we
humans do not discover our own identity and uniqueness, we cannot transcend it and move our society
to a higher level. The blessing is that the more different we each allow ourselves to be, the more we
operate as a unity. This is one of the most beautiful of all human paradoxes — that only through our
very diversity can we arrive at our unity. But there are forces that tug against evolution, and these
forces, coming from within, keep us from experiencing our true uniqueness. The programming partner
of this shadow is the 15th Shadow of Dullness, and since this 15th Shadow conceals a fear of being
different, it shuts you down at a collective level. The 15th Shadow makes us into lemmings that follow
the crowd, thus allowing our uniqueness to be over-ridden.
Just as the 15th Shadow puts your attention on everything but your own uniqueness, the 10th
Shadow does the opposite — it makes you obsessed with your own uniqueness and how to find it and
follow it. Thus in the world today we can see two main types of people — those who follow the
crowd and those who try to escape the crowd at all cost. The 10th Shadow does not and cannot
consider anyone outside oneself. Through this shadow, you become so self-obsessed that you no
longer see or hear the feelings of those around you. This makes it very difficult for other people to
relate to you, even though you may feel that you can relate to them. Even though you may have many
relationships, the truth is that you really don’t have enough space within your psyche for the concept
of others. Everything and everyone is viewed through your own subjective projection field and this
loss of objectivity can lead to only one result — it creates havoc in all your relationships.
Through the lens of the 10th Shadow, all you see when you look at others is people you would like
to change. Thus you find it extremely difficult to accept anyone else for their uniqueness. In
psychology and psychiatry, such self-obsession is known as narcissism and in moderation it is
considered to be an essential component of a healthy psyche. However, at the shadow frequency such
narcissism, like the legend it is derived from, keeps human beings endlessly trapped by their own
reflection. Ironically, the more of an expert you become in the subject of the lower self, the further
away you travel from your higher self', '', ''),
  (11, 'SIDDHI LIGHT
GIFT IDEALISM
SHADOW OBSCURITY
THE LIGHT OF EDEN
PROGRAMMING PARTNER: 12TH GENE KEY PHYSIOLOGY: PITUITARY GLAND
CODON RING: THE RING OF LIGHT AMINO ACID: THREONINE
(5, 9, 11, 26)  
THE 11TH SHADOW – OBSCURITY
THE FASCIST REGIME OF THE HUMAN EGO
The 11th Gene Key will open you to a whole new world — the world of light. Indeed, it is this Gene
Key that gives its name to the important genetic and chemical group known as the Ring of Light. This
Gene Key concerns human vision — both internal and external. As such it is deeply connected to the
human eye and the way in which images are translated via the visual cortex into the brain as
imagination. One of the most fascinating studies of light in all its potential can be seen through this
genetic codon. The amino acid threonine programs your DNA through the 11th Gene Key. Threonine
also codes for three other Gene Keys — the 5th, 26th and 9th. Each of these four Gene Keys concerns a
different code through which human beings are connected with light. At the highest level of
consciousness, the 5th Siddhi of Timelessness shows how time can be brought to an end through its
connection with light via the medium of space. This is why transcendence of the speed of light also
leads to the transcendence of time and therefore space. The 26th Siddhi of Invisibility concerns the
supernatural ability to manipulate the human perception of light through magnetism, and the 9th Siddhi
of Invincibility invokes the laser-like focusing of light in order to dissolve your physical reality
thereby making you effectively omnipotent.
Each of these four Gene Keys can be viewed through the lens of their shadow frequencies, which
further illustrates how deeply human suffering is linked to your ability or inability to tap into the
powers of clarity through the medium of light. In the case of the 11th Shadow and Gift, we are looking
at the interface between light and the human mind. The 11th Shadow places an interference frequency
between light and the way in which the brain processes, translates and communicates that light. In
other words, your whole experience of the world is pushed off kilter through the medium of the 11th
Shadow. It therefore represents the field of illusion, delusion and obscurity.
The greater percentage of human beings on this planet lives within a very narrow band of light
waves, which means that they do not see reality clearly. What most people think of as reality is a very
dim and skewed view of the true reality. The 11th Shadow greatly limits a very specific functioning of
the right hemisphere of the human brain — that aspect of your mind that does not see patterns and
facts through language and number, but grasps reality through reams of interconnected and intuitively
grasped fractal images emerging from the deep recesses of the brain. The right hemisphere of the
brain has long been seen as the feminine side of the brain — it is the lateral thinking, intuitive and
artistic side of your mind. If you could see how deeply limited your perception of reality is without
the full functioning of this feminine side of your nature, you would be enormously shocked.
The 11th Shadow of Obscurity essentially places you inside a virtual reality — a construct created
through a combination of programming via this 11th Shadow and its programming partner, the 12th
Shadow of Vanity. This reality is a total obscuration in which you can only view life through a certain
very limited set of parameters. Here is how it works: representing the feminine pole of the brain, the
11th Shadow creates a field of fear within human beings. The images that flood your mind from the
right side of the brain can neither be controlled nor do they appear to make sense. In most cases, they
are relegated to a backwater of your brain where they emerge as secret fantasies, repressed dreams,
emotional issues and hidden agendas. The male oriented left side of the brain (encapsulated in the
17th Shadow) therefore becomes far', '', ''),
  (12, 'THE 12TH GENE KEY: A PURE HEART
VANITY, DISCRIMINATION, PURITY
THE 13TH GENE KEY: LISTENING THROUGH LOVE
DISCORD, DISCERNMENT, EMPATHY
THE 14TH GENE KEY: RADIATING PROSPERITY
COMPROMISE, COMPETENCE, BOUNTEOUSNESS
THE 15TH GENE KEY: AN ETERNALLY FLOWERING SPRING
DULLNESS, MAGNETISM, FLORESCENCE
THE 16TH GENE KEY: MAGICAL GENIUS
INDIFFERENCE, VERSATILITY, MASTERY
THE 17TH GENE KEY: THE EYE
OPINION, FAR-SIGHTEDNESS, OMNISCIENCE
THE 18TH GENE KEY: THE HEALING POWER OF MIND
JUDGEMENT, INTEGRITY, PERFECTION
THE 19TH GENE KEY: THE FUTURE HUMAN BEING
CO-DEPENDENCE, SENSITIVITY, SACRIFICE
THE 20TH GENE KEY: THE SACRED OM
SUPERFICIALITY, SELF ASSURANCE, PRESENCE
THE 21ST GENE KEY: A NOBLE LIFE
CONTROL, AUTHORITY, VALOUR
THE 22ND GENE KEY: GRACE UNDER PRESSURE
DISHONOUR, GRACIOUSNESS, GRACE
THE 23RD GENE KEY: THE ALCHEMY OF SIMPLICITY
COMPLEXITY, SIMPLICITY, QUINTESSENCE
THE 24TH GENE KEY: SILENCE — THE ULTIMATE ADDICTION
ADDICTION, INVENTION, SILENCE
THE 25TH GENE KEY: THE MYTH OF THE SACRED WOUND
CONSTRICTION, ACCEPTANCE, UNIVERSAL LOVE
THE 26TH GENE KEY: SACRED TRICKSTERS
SIDDHI PURITY
GIFT DISCRIMINATION
SHADOW VANITY
A PURE HEART
PROGRAMMING PARTNER: 11TH GENE KEY PHYSIOLOGY: THYROID
CODON RING: THE RING OF SECRETS AMINO ACID: NONE
(THE RING OF TRIALS – 12, 33, 56) (TERMINATOR CODON)
THE 12TH SHADOW – VANITY
THE FINAL TRIAL
The 12th Gene Key, along with its Shadow and Siddhi, is one of the more extraordinary and far-
reaching archetypes in the human genetic matrix. In the relationship between this knowledge and
genetics, each of the 64 Gene Keys has a corresponding chemical family known as a codon in the
genetic code. In order to decipher the genetic code, scientists have to find chemical marker points in
the mass of coded information that lies in DNA and these marker points are know as start codons and
stop codons. Such chemical punctuation marks have an unusual place of importance within the totality
of the genetic code itself. This 12th Gene Key, along with the 56th and the 33rd, is related to what
science terms the stop or terminator codons. On a purely archetypal level, the three stop codons —
known collectively as the Ring of Trials — can be seen as three great mythic trials that test human
beings on their road to self realisation. The 12th Shadow of Vanity marks the inner core of the Ring of
Trials, which means to say that this shadow state represents the third and final aspect in this trilogy of
human tests.
The 12th Gene Key is special. Within the mystery of the 21 Codon Rings, this 12th Gene Key forms
a ring of its own within the Ring of Trials known as the Ring of Secrets. However, its secrets remain
firmly locked away until you activate its highest frequency in the 12th Siddhi.
Vanity, like pride (the 26th Shadow), follows us to the mountain peaks of consciousness. It is an
uncomfortable word for most of us, and in our vanity we do not usually like to associate ourselves
with it at all. Unlike pride, which thrives before an audience, vanity is a far more internal Shadow.
Vanity is like the lichens that cling to the rocks of the highest of mountain ranges. No matter how far
your awareness advances, vanity will cling subtly to you even at the highest of vibrations. In one
sense, vanity is the very first human vice, and it is also the last Shadow to let go of you.
The 12th Shadow is the love of your own uniqueness. It is about learning to love yourself, which is
the true definition of vanity. However, vanity only stops being vanity when you realise that to love
yourself is actually to love everyone else, a revelation demanding a quantum leap out of your self
altogether. This 12th Shadow is therefore deeply involved with issues of personal power as well as
the human yearning to express the purest qualities latent within your soul. It allows you to progress to
great intelligence and artistry, but at the same time prevents you from stepping into your wider heart.
Vanity is afraid that if you come from your heart you will lose ', '', ''),
  (13, 'SIDDHI EMPATHY
GIFT DISCERNMENT
SHADOW DISCORD
LISTENING THROUGH LOVE
PROGRAMMING PARTNER: 7TH GENE KEY PHYSIOLOGY: AMYGDALA
CODON RING: THE RING OF PURIFICATION AMINO ACID: GLUTAMINE
(13, 30)  
THE 13TH SHADOW – DISCORD
THE CHEMISTRY OF PESSIMISM
The 13th Gene Key concerns a single theme — the theme of listening. Through this Gene Key we will
see how many dimensions there are to the art of listening and how deeply tied it is with the expansion
or contraction of human consciousness. At the Shadow frequency this is the Shadow of Discord,
which is the inability to listen to and learn from your experiences in the world. Listening is entirely
different from hearing. Hearing refers to the acoustic absorption of auditory information, whereas
listening is something that can only be done with your whole being. Often listening requires
withdrawal and time in order for it to function effectively. Listening is also highly linked to the way in
which you process your life experiences on an emotional level. The link between listening and the
emotions has profound implications for the future of this Gene Key and in particular its Shadow
frequency. Because of the global mutation currently taking place in the solar plexus system of all
human beings, our emotional chemistry is undergoing some extraordinary changes and the 13th
Shadow will be affected by these changes.
Along with its programming partner, the 7th Shadow of Division, this genetic partnership exerts an
enormous influence on the direction of humanity as a species. These two Gene Keys are prime
programming agents for the way in which humans interact at a group level. They actually cut far
deeper than the tribal programming archetypes within our genome, which also affect our interactive
capacities. The 7th and 13th Gene Keys steer the one consciousness of humanity along the line of our
destiny. Whilst the 7th Gene Key pulls you towards the future, the 13th urges you to listen to and learn
from your past. This archetypal placement within your DNA makes these two Gene Keys different
from all others, as though they were somehow outside the scope of human influence. It is the battle
waged within the frequencies of these codes that decides your future. The 13th Gene Key in particular
is one of the most important of all the 64 Gene Keys, since it involves the way in which you process
your past.
Discord refers to the inability to escape your own past. Stacked within the human genome lies a
library of collective human experience, and your inability to process all this memory is what keeps
you locked into the same self-destructive patterns. The 13th Shadow shares a very important chemical
connection to the 30th Shadow, through its link with the same genetic codon signature known as The
Ring of Purification. The 30th Shadow — the Shadow of Desire — is where the connection between
your ability to listen is weighed against the raw force of your human desire. This codon, which codes
for the amino acid known as glutamine, is one of the great human genetic battlefields. Interestingly
enough, there is now a large body of scientific evidence linking this amino acid to various functions
and malfunctions in our gut. Symbolically, one might draw a connection between how effectively we
human beings process our past and how effectively our body eliminates waste. The force of human
desire found in the 30th Shadow usually outweighs our ability to listen to our past experience, and this
leads us once again down roads that do not serve humanity as a whole.
The problem is rooted in the human emotional system and this 30th Shadow of Desire is the core of
it. Because desire cannot be sated in its current form, it influences the direction of the whole human
race. Despite what has happened in our past, we go on making the same poor decisions and
judgments. This sets up a global frequency of discord in which we can clearly see where we have
been going wrong, but are unable to remedy it at a collective level. An exam', '', ''),
  (14, 'group of people you are a part of.
For these reasons, it is the domain of the family, compact team or intimate group where the 1st Gift
is designed to excel. Freshness is a Gift that needs the right environment in order to bloom — it needs
open-minded people who give you centre stage exactly when you need it. After the fresh energy has
been released and your creative impact has been felt, you will usually need to retreat as quickly as
possible in order not to spoil the power of your release. Your secret lies in the knowledge that fresh
flowers soon wilt — for just as your light can infiltrate any group bringing inspiration and joy, so can
your melancholy equally draw energy away from the very same group.
The Gift of Freshness relies on one immortal truth — creativity can never be controlled. It simply
comes when it comes, and when it is absent there is nothing for you to do but wait and relax. Through
the Codon Ring known as The Ring of Fire, this 1st Gene Key is chemically bonded to the 14th Gene
Key whose Shadow is Compromise. When your creative fire is burning, everyone wants to gather
around you and partake of your warmth and inspiration, but when your fire dies to a mere flicker, it is
as though you become unnoticeable. If you then try to rekindle your creativity through force of will,
you will only end up making huge compromises, both with yourself and with others. For you, life is
either fully engaged or completely at rest.
The genius of freshness is to bring something to the world that no other has ever seen
before.
If your life is marked by such a creative pulse, you will probably have a strong genetic activation
within this 1st Gene Key. As such you are here to dissolve the 1st Shadow by being a living example
of the unpredictable power of the creative process. Your true power lies in your ability to be alone
with yourself and to trust in the power of your own uniqueness and timing. Out of every dark hole into
which you dive comes forth a sally of startling and profound creativity. The genius of freshness is to
bring something to the world that no other has ever seen before and that no one else could replicate.
That the very first Gene Key in the Book of Life inside you is dedicated to creativity speaks
volumes about the human species as a whole. We are designed to overcome the Shadow states inside
us so that our true genius can emerge and we can add our spirit to the world. It is through individual
creativity that all diseases and negative patterns will eventually leave this planet. This is the true
meaning of Freshness — to be a clear vessel for the creative process so that evolution can move
through you and find its way towards a permanent state of eventual love, beauty and unity.
THE 1ST SIDDHI – BEAUTY
THE PROMETHEAN FIRE
As we have seen, the 1st Gift is rooted in the power of light and fire. Here at the siddhic frequency
this light is all that exists, and as it shines through a human awareness it becomes what we call beauty.
Beauty is the reason for life, and life is the reason for beauty. As one of the four great pillars of the
cosmos, whenever this Siddhi blossoms within a human, that person’s life becomes a symbol of a
directional shift within humanity as a whole. Therefore, it has a great importance within the genetic
matrix, even at the Gift frequency.
These four cornerstone Gene Keys mentioned earlier (the 1st, 2nd, 63rd and 64th) at their highest
level represent a divine archetypal foundation that has been sensed by many different cultures and is
embodied in the mystical literature of many diverse pantheons. These four principle energies are
known to Cabbalists as the Hayoth Ha Kadosh or Four Holy Creatures and are also embodied in the
tetragrammaton — the so-called mystical name of God. The ancient Gnostic traditions worshiped
them as the four elements, Native Americans knew them as the four directions and the Egyptians
carved them into the figure of the sphinx. The Chinese I Ching, which is a keystone ', '', ''),
  (15, 'SIDDHI FLORESCENCE
GIFT MAGNETISM
SHADOW DULLNESS
AN ETERNALLY FLOWERING SPRING
PROGRAMMING PARTNER: 10TH GENE KEY PHYSIOLOGY: LIVER
CODON RING: THE RING OF SEEKING AMINO ACID: SERINE
(15, 39, 52, 53, 54, 58)  
THE 15TH SHADOW – DULLNESS
ANOTHER DAY IN HELL
The poet T.S. Elliot said that as far as literature is concerned, “The world is divided between
Shakespeare and Dante — there is no third.” Whilst most people are aware of Shakespeare and
probably use many of his expressions in their everyday lives without realising it, Dante has for the
most part remained a mystery to the wider world. And yet in his supreme work The Divine Comedy,
Dante left us what is arguably the greatest map of human consciousness ever written. Whereas
Shakespeare used drama, Dante used allegory as a means to communicate an immortal truth about
human nature. The Divine Comedy essentially describes the geography of consciousness as it moves
from the lower frequencies to the very highest. The 64 Gene Keys can be experienced at the three
main frequency bands of the Shadow, the Gift and the Siddhi. Dante named these same levels of
consciousness Hell, Purgatory and Paradise respectively.
This 15th Gene Key is the key aspect of a complex set of genetic blueprints in human beings known
as The Ring of Seeking. It is this codon in your genome that initiates your evolutionary journey from
being unaware of your true nature to your eventual awakening as an expression of Divine form. All
your struggles, pains, agonies, triumphs and ecstasies are written here in this Codon Ring because,
like the Divine Comedy, it lays down the geography and topography of your journey towards
awakening. Within this genetic structure the 15th Gene Key plays perhaps the most vital role of all the
Gene Keys. In a nutshell, it keeps us human. To be a human is to be a battlefield of opposing forces
and frequencies, some of which pull you towards heaven and others which try to drag you downward
into hell. Humanity is the a bridge for consciousness to work out these many conflicting currents.
The 15th Shadow of Dullness describes a low frequency human attitude to being alive in a body. It
is the fear of the ordinariness of life. One of the key elements in Dante’s hell is repetition.
Transgressors and evildoers are frequently depicted locked into endless cycles where the
consequences of their evil deeds are played out over and over for eternity. One of the greatest fears of
the 15th Shadow is just this — to be locked into a repeating rhythm that never changes. And yet the
huge irony here, which Dante captures perfectly in his great work, is that life does indeed consist of
endless repeating patterns and rhythms. As you enter more and more deeply into the mysteries of the
64 Gene Keys, you will begin to realise the truth behind the latest revelations and suppositions of
physics and quantum theory — that the universe appears to be a hologram in which the same patterns
are repeated again and again in infinite fractal variations.
This 15th Gene Key is about the diversity of organic life. The 15th Shadow highlights the dullness
of life. It represents an attitude of human awareness, and indeed of animal and plant awareness,
although in the case of other life forms, one might not use the word dullness. A dog can sit on a
doorstep for a whole month doing absolutely nothing and never be bored. Indeed when we humans
observe animals, we often feel a sense of envy that they seem to have no worries — that their lives
are so simple. With our self-reflective awareness, we humans are capable of something truly magical
and at the same time quite terrifying — we are capable of attitude. Only the human neocortex makes
dullness possible.
Your attitude affects life’s events, which is the first great Law of Magic.
Two humans going through identical experiences can literally taste two entirely different worlds.
One can be in heaven and the other in hell. Not only that, your attitude affects life’s events, which is
', '', ''),
  (16, 'SIDDHI MASTERY
GIFT VERSATILITY
SHADOW INDIFFERENCE
MAGICAL GENIUS
PROGRAMMING PARTNER: 9TH GENE KEY PHYSIOLOGY: PARATHYROID
CODON RING: THE RING OF PROSPERITY AMINO ACID: CYSTEINE
(16, 45)  
THE 16TH SHADOW – INDIFFERENCE
THE DIFFUSION OF RESPONSIBILITY
At the Shadow frequency one of the most powerful and pervasive forces that keeps you from
perceiving a higher reality is indifference. As long as you are indifferent, you can’t ever be different.
This is the key to the 16th Shadow, which concerns the very human fear of leaving your comfort zone
and fully embracing change in your life. As an aspect of the Codon Ring of Prosperity, the 16th Gene
Key is about excellence. To prosper truly in the world is to find the one thing in life at which you
excel above all others. This is the true destiny of every human being, but to bring this dream to
fruition you must first step out of the shadows and take the risk of being different. Indifference is an
energy field that gets you to focus your precious time and life force on the inessential. The inessential
in this context is anything that takes your attention away from the present moment and its limitless
potential. As long as you are focussed on the inessential, you will be indifferent to the things in life
that really matter.
The holocaust survivor and writer Elie Wiesel had the following to say about this subject:
“The opposite of love is not hate, it’s indifference.
The opposite of art is not ugliness, it’s indifference.
The opposite of faith is not heresy, it’s indifference.
And the opposite of life is not death, it’s indifference.”
The 16th Gene Key represents the collective expression of the state of health of humanity. In our
modern world, this expression is clear. That the vast majority of the world lives in poverty whilst a
select few thrive is a testament to the power of the 16th Shadow, which sucks all the life out of the
world. Because human beings are not willing to stand up and be different, they become willing to sit
by the side of life and observe. In social psychology this common human pattern is known as the
diffusion of responsibility and refers to the human preponderance to look away when confronted by
another in distress, often when there are a number of other people in the same vicinity. However, as a
by-product of the 16th Shadow of Indifference, the diffusion of responsibility occurs across the width
and breadth of our planet on a far subtler energetic level.
Indifference is an energy field created by all the human beings on this planet who are not doing
what they would really love to be doing. The only reason for this state is fear. Whoever you are and
whatever your life circumstances, if you transcend your fear you will suddenly become so much more
capable than you were before. To break out of the field of indifference is to make the courageous
move deep into your own fears and overcome the lethargy that prevents you from making something
truly beautiful of your life. Indifference has many faces and excuses. One of the primary excuses
human beings use for not doing what they truly want in life is the excuse that they don’t have enough
time. This habit of making yourself a victim of time is the core escape strategy of the 16th Shadow, but
time actually has nothing to do with it. You have become a victim of your mind rather than of time.
Time itself is as fluid as water, and as the 17th and 5th and 52nd Gene Keys testify, it can be bent,
shortened, twisted, lengthened and even stopped. The moment you take a stand and begin to follow
your dreams, time becomes your ally rather than your enemy, automatically adapting itself to fit your
needs.
This 16th Shadow can be absolutely full of plans and good intentions about the
world, but they rarely get off the ground.
The programming partner to the 16th Shadow is the 9th Shadow of Inertia, and it is easy to see how
these two genetic forces keep humans from actually getting anywhere. As with all the Shadow
polarities, they', '', ''),
  (17, 'mind, whose nature is to project itself out on the world. In other words, the Shadow of Opinion is
programmed to look for flaws in the outer world, in society, in people and even in oneself. When a
flaw is discovered it becomes the seed for an entire worldview and a whole story is built up inside
the mind of that individual. The projected flaw, which is always based on some form of comparison,
becomes the point of focus for all that dissatisfied energy coming through the 18th Shadow. This is
how human opinions form — they crystallise around a single projection, which is born of early
conditioning, and thus over time a molehill turns into a mountain.
This description is a simplified version of how early childhood conditioning impresses itself on
the mental mechanism of every child. Your opinions sprout from seeds planted at some point within
your first seven years, even though they do not begin to surface in the mind until your third seven-year
cycle, some time during your teen years. If a child developed naturally, without any external synthetic
pattern — physical, emotional or mental — imposed on them during these first seven years, it is
highly unlikely that he or she would grow into an opinionated adult.
Your opinions sprout from seeds planted at some point within your first seven years.
In our modern society, opinions are actually considered to be a healthy thing, and it is true that they
are not inherently unhealthy. The logical left brain thinks through taking sides and comparing.
Problems occur when your dissatisfaction begins to identify with an opinion and turns it into a dogma.
It is also at this point that another disease takes root inside you — the dis-ease of seriousness.
The healthy expression of opinion is rooted in a certain playfulness that comes of having an
equally developed right hemisphere of the brain. Whereas the left brain sees the parts, the right
hemisphere only sees the whole. If the inner structure of the brain is balanced, the male aspect will
always serve the female, since seeing the part without seeing the whole is limiting, divisive and
dangerous. Whenever you become over-serious about your opinions you immediately find yourself
having to defend them. It is this dynamic that is at the root of violence. At the Gift level of frequency,
as we shall see, opinion gives way to far-sightedness, which is based upon seeing both sides of a
situation at the same time. If the right brain provides the backdrop to the whole picture, it becomes
impossible for the left brain to become fixed on any single element of the whole. In this respect, if you
do choose to take sides it is for the sole purpose of maintaining Integrity — the 18th Gift.
It is interesting to note that healthy brain development in early childhood has little to do with
intellect and much more to do with non-interference. In their first seven years, children really only
require an environment in which they can learn through play. Any imposition of an external rhythm
that does not follow the biological and seasonal pulse will subtly disturb the delicate structure of the
developing brain and nervous system. It is here in the 17th Gene Key that your inner timing is founded.
This timing is anchored deep within the body and is connected to the frequency of the Earth itself. The
seven-year cellular cycle is founded on a deep inner drumbeat that echoes throughout every system of
the developing child from the point of conception forward. If these powerful natural rhythms are
pushed out of kilter early in life, your inner timing will be distorted when you become an adult. This
time distortion manifests most commonly as mental anxiety but can also lead to a wide range of
physiological problems emerging later in life, all of which can be very difficult to diagnose or fix.
The 17th Shadow governs the way in which huge numbers of people view the world. On a
collective level, this Shadow has created the world we see around us today. It has categorised
humani', '', ''),
  (18, 'SIDDHI PERFECTION
GIFT INTEGRITY
SHADOW JUDGEMENT
THE HEALING POWER OF MIND
PROGRAMMING PARTNER: 17TH GENE KEY PHYSIOLOGY: LYMPHATIC SYSTEM
CODON RING: THE RING OF MATTER AMINO ACID: ALANINE
(18, 46, 48, 57)  
THE 18TH SHADOW – JUDGEMENT
THE VICTIM MIND
Built into the human genetic matrix is a deep sensitivity to imperfection, and it is this sensitivity that
gives rise to the human qualities of criticism and judgement. As we shall see, the 18th Gene Key and
its themes of Judgement and Integrity can have either an empowering or a disempowering effect on
you and others. This theme of Judgement runs about as deep in human nature as any other trait you can
imagine.
The 18th Shadow begins in your childhood. It has a built-in need to challenge authority, and the
first real authority in your life is your parents. Challenging our parents is a fundamentally healthy
thing to do, as it is a part of our innate urge to become differentiated. This process begins in earnest
as we enter our third seven-year cycle and roughly spans the ages of 14 through 21. This stage of our
development primarily concerns the growth and expansion of our mental faculties, and it is during this
period that our future opinions are laid down and our capacity to judge is tested and forged. The key
to this process lies more in the frequency of the parents than the child. If the parents make the mistake
of taking this process personally, the child will never fully make the transition through this biological
phase, instead becoming stuck at the same low-frequency as the parents. If, however, the parents do
not get stuck in their own judgemental or self-judgemental patterns, then this phase will result in true
adulthood. Sadly, most children never make it to true adulthood but stay solidly trapped in deep low
frequency patterns of judgement for the rest of their lives.
The 18th Shadow gives rise to a collective phenomenon in the world known as the victim mind.
The victim mind is a conglomeration of all the undermining, judgemental thought patterns throughout
the world. If you sincerely examine your own thoughts during a typical day, you will probably
discover that a great percentage of your thinking is affected by the victim mind. In other words you
are allowing your mind to be influenced by the collective negative thought patterns of the whole of
humanity. The true import of this last statement can come as a huge shock to many people. The world
of the victim mind is an inner world of gossip, complaining and worrying. Most of us complain
inwardly about all aspects of our lives, especially the people in our relationships, and we worry
incessantly about mundane issues such as money and our health. Ironically, it is exactly this kind of
thinking that keeps us from being abundant in terms of both our wealth and our health. You may think it
is absolutely human to complain, but it creates a negative frequency in the human aura of both the
complainer and the victim. In other words, the more you complain the more you damage yourself and
the world.
Morally speaking, judgement gets a bad rap in the modern world. We talk about being non-
judgemental as though it were one of the highest goals in life. In fact, it is impossible not to judge
because judgement is the way in which the human mind thinks. What defines the low frequency of the
victim mind is that you identify with what you think — in other words, your judgements define your
identity and make you feel more secure. However, if you can make a judgement and at the same time
be aware of judging then you are no longer trapped by your own mind and thus the frequency around
that judgement changes. Because the 18th Shadow is twinned with the 17th Shadow of Opinion, these
two genetic themes are inseparably linked through the structure of your DNA. All judgement is rooted
in opinion and vice versa. The more you think you are your opinions the more you have to defend
them, whereas the more lightly they are held the less attached yo', '', ''),
  (19, '19th Shadow that all the world religions have been born. Our relationship with God or a set of gods is
a purely co-dependent relationship because it is based on this need for outside authority. It is here in
the 19th Gene Key that one of the great human stories is coded — the story of our relationship to God.
As long as man believes in a God outside himself, the frequency of our planet will remain at the level
of the 19th Shadow. The vibration of human suffering depends upon the existence of a separate
authority of a higher frequency than us. This last sentence is the ultimate definition of what it means to
be a victim, which is what characterises the shadow frequency. The programming partner to the 19th
Shadow is the 33rd Shadow of Forgetting. In creating a God out there, we have forgotten the power
that lies dormant within us.
The ultimate reliance we have outside ourselves is on food. God has always been about food and
food has always been about territory. Food production was based upon tribal territory, which is why
the different nations and cultures developed in the first place. But today, at least in the developed
world, food no longer has to come from our own tribe. It can be flown in from anywhere in the world.
For one thing, our dietary needs are changing as we learn to manipulate our environment with greater
efficiency.
As long as man believes in a God outside himself, the frequency of our planet will
remain at the level of the 19th Shadow.
Through sciences such as nuclear physics and genetics, humanity is beginning to play god more and
more and is thus moving from a state of co-dependence to a state of independence. Because we can
now outwit the gods with modern technology we no longer need them as much. The more advanced
the society, the deeper we question God as an outside agency.
However, the 19th Shadow is currently undergoing a huge genetic mutation, which means that
man’s reliance on religion is also undergoing a transformation. The old tribal fears of not having
enough are dying, and with them the great religions. The breaking of such a deep-seated and ancient
co-dependent relationship has powerful repercussions for our world. The old ways must die to the
new — such is the purpose of mutation, and the process is one of destruction. Only as the dust finally
settles will the new creation become fully realised. The reason all of this can seem so terrifying is
that it represents a fork in our evolutionary development in which an entirely new path is opening, a
path in which human beings will have to leave behind the old tribal co-dependent ways. The whole
world is dividing into those who are becoming more independent, and those who cling to the comfort
of the old ways. On a global level we are beginning to see this made manifest now in the battle
between globalisation and factionalism — and between science and religion.
For us as individuals, the transformation of the 19th Shadow will see its deepest manifestation in
our relationships. The old-style co-dependent relationships of the working husband and the
homebound wife are giving way to a new level of independence. The liberation of women is changing
the infrastructure of our civilisation and children are increasingly cared for collectively, so that both
mother and father retain a higher level of independence. Whether we like this or not it is occurring all
across the developed world. Our children are growing up as the children of society rather than the
children of a single tribal family. Because of the huge genetic shifts taking place across the board,
male/female relationship dynamics are more challenging than ever. A great change is coming, and
roles are changing to accommodate the birth of a new paradigm. Although it may be a difficult birth,
in the not too distant future the 19th Shadow will have disappeared entirely from our world.
with people as well as animals. As we learned from its Shadow, this Gene Key is rooted in material
need, and when you elevat', '', ''),
  (20, 'SIDDHI PRESENCE
GIFT SELF ASSURANCE
SHADOW SUPERFICIALITY
THE SACRED OM
PROGRAMMING PARTNER: 34TH GENE KEY PHYSIOLOGY: BRAIN STEM (MEDULLA)
CODON RING: THE RING OF LIFE AND DEATH AMINO ACID: LEUCINE
(3, 20, 23, 24, 27, 42)  
THE 20TH SHADOW – SUPERFICIALITY
THE INSECT REVOLUTION
The language of the 20th Gene Key and its various frequencies is a purely existential language. It
doesn’t really involve thought or thinking in any way at all and as such it is quite challenging to grasp
at an intellectual level. The 20th Shadow in particular concerns how deeply consciousness is able to
incarnate into a human form. The more impeded consciousness is within the form, the less pure its
expression will be. This Gene Key is about the quantity of consciousness that can express itself
through a human being, and in this sense it is one of the most mystical of all the 64 Gene Keys. In the
case of the 20th Shadow, very little consciousness can express itself at all, so that we see a very
watered-down reflection of life’s real potential coming through human beings operating at this
frequency. The role of this Shadow is to keep human beings just on the fringe of life, without really
plunging in. It is the Shadow of Superficiality.
It may sound as though the 20th Shadow is somehow the fault of human beings and that perhaps if
we were to do things differently or better we might escape this plight. However, as we shall see, this
aspect of our DNA is very ancient. In fact, it has led us to our current state of evolution. The 20th
Gene Key and its Shadow represent a part of the human genome that developed through species that
preceded human beings. Most notably, this Gene Key is the main aspect that humans share with the
world of insects and opens up some striking parallels between these two worlds. When we observe
insects, one of the things that we can see is how incredibly busy they always seem to be. Most insects
only live for a very brief period of time during the summer months, and during those days, weeks or
months they live pure existential lives whose only focus is to stay alive and reproduce. Early
hominids lived in a similar existential reality, during a time when genetic programming was mostly
expressed through the physical body — through breathing, eating, killing and having sex. The further
we go back in our evolution, the more existential our lives appear to have been.
All of this changed with the development of the human neo-cortex, since this precipitated a shift in
the geography of our awareness from our physical instincts to the rapidly burgeoning cognitive', '', ''),
  (21, 'To act with Valour is to enter a higher world.
This 21st Gene Key can be further understood when seen in the context of its wider genetic family
or Codon Ring. As part of the Ring of Humanity, it forms an integral aspect of all human wounding.
The sacred wound at the heart of humanity and the reason for all of our suffering can be unlocked by
the Gene Keys that make up the Ring of Humanity. Hierarchy is one of the oldest human wounds and
like each aspect of our suffering it can only be healed by love. To activate the higher frequencies
within this Gene Key you must have great courage. It takes a powerful human being to surrender
completely to another, whether through authority or submission. The fact is that surrender makes
authority submissive and submission authoritative, which is precisely what heals the wound and
brings an end to hierarchy and control.
THE 21ST SIDDHI – VALOUR
THE NEW AGE OF CHIVALRY
In the 21st Gift we saw that true authority based on service inspires loyalty. At the highest level of
consciousness, this coupling of love and power gives way to a great and peerless ideal — the ideal
of Valour. We tend to associate the word valour with courage, particularly the courage shown by
soldiers during battle. Although there is some truth to this image, the use of the word valour as a
siddhic aspect of consciousness goes far beyond the idea of courage in the face of adversity. Valour is
the highest frequency of the 21st Gene Key. It is a living energy field released into the world through a
particular chemical signature within your genetics. Valour is the by-product of another potent word —
nobility.
To understand nobility is to dive into the realm of human destiny. In the social history of humanity
and in our collective unconscious, there has persisted an image of a royal human being — the King or
Queen, the Emperor or Empress — the symbol of the highest potential within man and woman.
Nobility is the quality usually associated with royalty or genetic pedigree, although down through the
ages our human attempts to bestow such projections on certain personages has usually been shown
severely wanting. Nobility, we have discovered, has little to do with breeding and much more to do
with character. Indeed, most of our heroic myths centre on this notion of human nobility and valour.
Valour then can be understood as nobility in action. It contains virtue, wisdom, love, courage and
above all sacrifice. A truly valorous deed is an act of absolute self-surrender in which you lay your
entire being on the line for a higher ideal. In our history books, this may have been recorded as dying
for King and country, but in the language of the Siddhis, it is really about dying into a Divine ideal.
At the Shadow level the need to control fosters fear and reaction in others. At the Gift level,
authority inspires loyalty. At the siddhic level, Valour invokes Communion. There is a deep genetic
connection between the 45th Siddhi of Communion and the 21st Siddhi of Valour. Communion is about
merging your individual being into a higher collective being, and this is precisely what happens
through the frequency of Valour. Valour need not even act — it is a vibration of such intensity that it
makes the hearts of others weep. It is the recognition of true nobility in another and the realisation that
the other is your own mirror. As an aspect of the Ring of Humanity, we see that all human beings have
this higher recognition as their final destiny. No matter who you are or what kind of life you lead, at
certain points in your life you are given the opportunity to act with Valour. These moments are mythic
moments and the script of your future life hinges upon them. To act with Valour is to enter a higher
Furthermore, because language is the means through which frequency can be conveyed, at higher
levels of frequency it can never lie. However, at the Shadow frequency, language is the ultimate
programming tool and can be used for example to blind an e', '', ''),
  (22, 'our DNA. They are all early mutations — precursors of what is to follow. Through the 19th Siddhi it
is not only the individual that must sacrifice him or herself into the whole, but also the whole human
species that must be sacrificed. Everything we see happening in the world around us — from
pollution to global warming to wars and social upheaval — is a result of the profound genetic
process we are undergoing.
For those with the 19th Siddhi the focus is always on the future needs of humanity rather than the
current needs. These people understand what is to come as well as what we must go through. Such
people stand alone as heralds of a future consciousness and their lives are a magnificent example of
sacrifice to that consciousness. They emerge during times of great mutation, since they themselves are
in the grip of that mutation. With their hypersensitive mutated DNA, they see the new form emerging
and do their utmost to prepare people for the coming consciousness shift. They are highly sensitised
bridges to the new human and have the ability to siphon information about the new paradigm from
behind the veil of the future into the present. Every Siddhi has to make its sacrifice in this way,
because each of them represents a being from the future that works in the present.
The 19th Siddhi contains the secrets of mystical initiation. Every aspect of the earth’s
consciousness must move through the nine portals of initiation before our collective planetary
evolution comes to an end. Each of these initiations is explored in more depth within the 22nd Gene
Key.
THE NINE PORTALS OF PLANETARY INITIATION
1. Birth
2. Baptism
3. Confirmation
4. Matrimony
5. Annunciation
6. Communion
7. Ordination
8. Sanctification
9. Glorification
Each initiation brings us into a wider awareness of our interdependence with the whole. When the
19th Siddhi manifests in form, then a great being makes an individual sacrifice on behalf of the whole.
This is the mystery and hidden meaning of the life of Christ. Through an individual’s sacrifice, the
19th Siddhi allows the entire collective to pass through a group initiation. We can see how the
Christian rites hold the codes of the great initiations, even though they have been effectively frozen
into structures that have little or nothing to do with the initiations themselves, which occur organically
and usually over the course of many incarnations. The Ring of Gaia then, of which this Gene Key is a
vital aspect, connects all earth beings on this same initiatory journey. As the ultimate form
manifestation of Gaia, humanity stands on the cusp of one of the greatest initiations — the fifth
initiation of The Annunciation. Mystically speaking, this great initiation has to do with the conception
of a holy child within the body of humanity. Thus the whole of humanity must sacrifice its
independence for a higher vision.
This mystical Annunciation can only take place through the Synarchy, the communion of evolved
souls who collectively pioneer this great sacrificial impulse. The 19th Siddhi will be one of the first
Siddhis that awakens in man at a collective level. As soon as the great mutation has occurred within
humanity and we pass through the Fifth Initiation, we will see what kind of shift has taken place. One
of the traits of the new human will be an incredible sensitivity that is far beyond being psychic. The
awareness in such a being will not recognise itself as being separate from other human beings, thus
they will work for all of humanity without caring for themselves. Although we call that sacrifice it is
not so for them, since they will know no other way to live. This 19th Siddhi is a herald of the future
forms that will house higher frequencies of consciousness, and as such it displays the great
inadequacy of our language. Just as our language has evolved out of our reliance on the five senses,
future forms will operate through entirely different languages. Current human language is auditory, but
future f', '', ''),
  (23, 'surrender, none of which are techniques. As such, Self Assurance is based upon a philosophy of
allowing everything to come to you rather than going out and chasing life down. It is because of this
Divine laziness that the 20th Gift is the real foundation for inner relaxedness.
THE 20TH SIDDHI – PRESENCE
THE SACRED OCTAVE
The 20th Siddhi is so unique that there is very little that can be said about it. Mythically it is
represented by the notion of the breath of God or the word of God. Presence is the underlying nature
of being. In fact the word Presence does not do this Siddhi justice. It would actually be truer to name
this Siddhi The Presence since the use of the definite article gives us the distinct impression that this
is a state of consciousness that has nothing to do with any individual. It is the manifestation of The
Presence of the Divine through a human instrument. Whenever a human being attains the siddhic state,
he or she is suffused with The Presence. Pure consciousness floods their being, silencing the mental
activity and drawing the person into the eternal present moment. When this occurs, the whole world
created by the human mind is suddenly seen as utterly superficial. The smallest thing such as a leaf or
stone is understood to have more life within it than all the greatest ideas of man. The Presence is
experienced as everywhere and inherent in everything and is where we get the term omnipresence.
In the state of Presence, the individual is no more. You may find yourself sitting in the same spot
for three days, and it seems as though not a single second has passed. Time dissolves into the
background consciousness of all being. When you experience a brief moment of déjà vu, you are
tasting the purity of a moment of true Presence in which the present moment becomes a funnel for both
the past and the future, momentarily intensifying and transcending them. The Presence is also
extraordinary in that it can be felt by anyone. When this Siddhi has flowered in a person, it actually
creates a subtle atmosphere around itself — a kind of silent ease that pervades the aura of the person
and radiates out to all creation. One of the great effects of being in The Presence is the deepening of
your breath. The Presence links all human beings as one through the breath. Therefore people
immersed in the atmosphere of Presence begin to breathe as one entity.
The true siddhic state is one of complete relaxation. As you release deeper and deeper levels of
tension, the high frequencies of the Presence force you to sigh until your physical body comes into a
state of great ease. The Presence can also be seen as an intense softness in a person’s gaze. To a
person immersed in The Presence, absolutely nothing matters — thoughts are irrelevant and suffering
no longer exists because the mind has been cut at the root. There is nothing to say that is not
superficial. Only silence can even approach the truth. We can see through the Ring of Life and Death
— the codon ring associated with this Gene Key — that the Presence is also the same Quintessence
sought by generations of seekers over millennia (the 23rd Gene Key). It also has a direct relationship
to the experiences of Silence (24), Selflessness (27), Innocence (3) and Celebration (42).
The 20th Siddhi relates to the mystical nature of the octave — the transcendent note that begins,
ends and links together all vibrations throughout the universe in which we live. It is also the eighth
colour — the pure white containing the other seven colours, and that which also brings us back to the
number zero, the blackness out of which all form arises. Above all, it is the sacred breath that unites
the realms of both light and sound, allowing us to enter completely into consciousness as pure
existence.
a happy life — keep it simple.
If you love simplicity, you will manifest it around you.
The 23rd Gift abhors clutter and jargon. It communicates precisely, clearly and with great economy.
The power of simp', '', ''),
  (24, '', '', ''),
  (25, 'others — and you turn it into art. The 12th Gift is deeply associated with the arts — with music, with
language, with dance, with drama and above all, with Love. The love within the 12th Gift is not
universal love (as in the 25th Gene Key) — it is all about falling in love. This is human love with all
its attendant drama, obsession, beauty and danger. Vanity is about loving only yourself, whereas
discrimination is ultimately about loving the things and people outside yourself that make you feel
good.
Discrimination gives humanity a taste of a higher order operating behind the scenes
of life.
This 12th Gift is about feelings. If this Gift is a powerful aspect of your hologenetic profile, you
will be strongly motivated and moved by feelings and emotions throughout your life. Your Gift is to
communicate these feelings to others, and you may do this in a myriad of ways. If you are strongly
influenced by this Gift you will recognise the beauty of true expression, which means that you will
also recognise when something or someone is not expressing true soul. This can make you one of the
best critics of others. However, this Gift is not about criticising flaws and details in others (which is
a lower expression of the 18th Gene Key) — it is designed to spotlight that which is not authentic.
Discrimination is about being attuned to a higher frequency, which means that it can metaphorically
see through walls. Whenever a person is faking or has a concealed agenda, one with the Gift of
Discrimination will immediately feel it as a deep discomfort. If they do not fall in love with
something, they distrust it, and the same goes for the people in their lives. To such a person,
authenticity is everything.
People with the 12th Gift cannot be taken in by the enchanters or idealists in the world. They have
a deep respect for purity, and it is rooted in a natural prudence. The programming partner of this 12th
Gift is the 11th Gift of Idealism, which means that they too are idealists, but they understand that
idealism requires the balance of pragmatism and discrimination; otherwise it is nothing more than a
pipe dream. The Gift of Discrimination does set you apart from the crowd — it has no choice in
doing so because it is naturally seeking a higher frequency. It represents an aspect of your DNA that is
constantly striving for something higher and purer, which means that it directly challenges anything or
anyone that is influenced by compromise. Discrimination gives humanity a taste of a higher order
operating behind the scenes of life. This is why it so often manifests through true art. They are true art
lovers. The 12th Gift does not shy away from anything that is authentic — no matter how messy it may
be. These people are the great food discriminators, music discriminators, and language
discriminators. They can become the great artists, virtuosos, poets, actors and educators of humanity.
Their Gift is to enter unafraid into the drama of life, allowing it to flow through their veins and be
expressed through their feelings.
Because of the depth of feeling that this Gift entails, it tells us something profound about the
direction of the human species. We are here to learn to express the deepest yearnings and feelings
within our souls. This is why we have to master language and the arts — because they are the
transformational field through which we can transcend emotion and touch the higher planes. Out of
this 12th Gift come humanity’s great educators — those rare people who can allow art to touch their
hearts and at the same time transmit that essence to others through their language and expression.
Wherever you see true passion moving into the world, there you are seeing the influence of this 12th
Gift. It is both sweeping and consuming yet at the same time highly refined. Ultimately these people
are driven by the myth of true love — that is what they are yearning for deep within their souls, and it
is why their acts and words, at their highest, a', '', ''),
  (26, 'SIDDHI INVISIBILITY
GIFT ARTFULNESS
SHADOW PRIDE
SACRED TRICKSTERS
PROGRAMMING PARTNER: 45TH GENE KEY PHYSIOLOGY: THYMUS GLAND
CODON RING: THE RING OF LIGHT AMINO ACID: THREONINE
(5, 9, 11, 26)  
THE 26TH SHADOW – PRIDE
WIELDING THE WILL
Deep within the substructure of your physical body lies a set of four chemical codes whose ultimate
role is to determine how your body captures, stores and transmutes light waves into energy. This
chemical family (which includes the 5th, 9th, 11th and 26th Gene Keys) is collectively known as The
Ring of Light and in genetics it codes for the amino acid threonine. Depending on the frequency of
light you allow to enter your DNA, different biochemical processes are initiated, affected and/or
prevented inside your body by means of these codes. It is already well known scientifically how the
ultraviolet frequencies within sunlight catalyse your body to produce vitamin D, a vital component of
your physical health. Light contains many such catalytic codes within its spectrum that determine not
just physical health but also emotional, mental and ultimately spiritual well being. The central
message of the Gene Keys revelation concerns the power that you as a human being wield to
consciously and unconsciously raise or lower the frequency of light entering your body, thereby
altering your reality through the medium of your DNA.
At the lower frequencies, those frequencies governed by fear, your DNA relays instructions
throughout your body that are based upon individual survival. This very narrow set of parameters is
the primary paradigm ruling our planet today. The 26th Gene Key is unique within the threonine group
because it has to do with utilising light waves via the medium of the individual will. In other words,
through your willpower you can bend light and turn it to your advantage. This Gene Key therefore has
a great deal to do with the correct and harmonious use of will. There is a huge conditioning field on
this planet telling you that nothing will ever come to you in life unless you reach out and grab it. At
the Shadow frequency, you allow your unconscious fear to make you distrust the natural and easy flow
of life. Out of this fear, you try to control life by pitting your individual will against the whole, and so
the 26th Shadow of Pride begins to rule your life.
The power of will is actually a magical power — it is quite literally your ability to harness the
power of light and project it through your body as action, thought and words. It is the key to
manifesting dreams on the material plane. If you have enough willpower, you can achieve almost
anything. This is the language of the 26th Shadow, and it is important to remember that there is nothing
wrong with this belief. It is a vital stepping-stone to a far higher frequency. However, there are two
types of will — there is your will, which as we shall see is an illusion, and then there is thy will,
which we will look at when we examine the higher frequencies of this 26th Gene Key. Your will is the
foundation of human pride — it is the belief that you as an individual can control the forces of nature
and come out on top. Nowhere in our society is this Shadow of wilful pride more dominant than in the
sphere of business. All modern business is built on this rationale of individual willpower. If you are
driven by the 26th Shadow then you, like many others, use your willpower for the sake of personal
gain and recognition. In business this means that to climb to the top you must consciously or
unconsciously push others down.
You can identify the 26 th Shadow in a person because they simply cannot relax,
even for a single moment.
The word most commonly used to describe the energy and effect of the 26th Shadow is the word
ego. In spiritual circles, the ego is widely regarded as the archenemy of the higher self, but when we
come to explore it through the 26th Gift, we will learn that it has a higher purpose. When you allow
yourself to be governed by fea', '', ''),
  (27, 'PRIDE, ARTFULNESS, INVISIBILITY
THE 27TH GENE KEY: FOOD OF THE GODS
SELFISHNESS, ALTRUISM, SELFLESSNESS
THE 28TH GENE KEY: EMBRACING THE DARK SIDE
PURPOSELESSNESS, TOTALITY, IMMORTALITY
THE 29TH GENE KEY: LEAPING INTO THE VOID
HALF-HEARTEDNESS, COMMITMENT, DEVOTION
THE 30TH GENE KEY: CELESTIAL FIRE
DESIRE, LIGHTNESS, RAPTURE
THE 31ST GENE KEY: SOUNDING YOUR TRUTH
ARROGANCE, LEADERSHIP, HUMILITY
THE 32ND GENE KEY: ANCESTRAL REVERENCE
FAILURE, PRESERVATION, VENERATION
THE 33RD GENE KEY: THE FINAL REVELATION
FORGETTING, MINDFULNESS, REVELATION
THE 34TH GENE KEY: THE BEAUTY OF THE BEAST
FORCE, STRENGTH, MAJESTY
THE 35TH GENE KEY: WORMHOLES AND MIRACLES
HUNGER, ADVENTURE, BOUNDLESSNESS
THE 36TH GENE KEY: BECOMING HUMAN
TURBULENCE, HUMANITY, COMPASSION
THE 37TH GENE KEY: FAMILY ALCHEMY
WEAKNESS, EQUALITY, TENDERNESS
THE 38TH GENE KEY: THE WARRIOR OF LIGHT
STRUGGLE, PERSEVERANCE, HONOUR
THE 39TH GENE KEY: THE TENSION OF TRANSCENDENCE
PROVOCATION, DYNAMISM, LIBERATION
THE 40TH GENE KEY: THE WILL TO SURRENDER
EXHAUSTION, RESOLVE, DIVINE WILL
SIDDHI SELFLESSNESS
GIFT ALTRUISM
SHADOW SELFISHNESS
FOOD OF THE GODS
PROGRAMMING PARTNER: 28TH GENE KEY PHYSIOLOGY: SACRAL PLEXUS
CODON RING: THE RING OF LIFE AND DEATH
(3, 20, 23, 24, 27, 42) AMINO ACID: LEUCINE
THE 27TH SHADOW – SELFISHNESS
THE MATHEMATICS OF LOVE AND SELFISHNESS
The 27th Gene Key is truly vast in its implications at a planetary level. It governs the structure of the
food chain, the preservation of gene pools both human and animal, and is key to understanding the
precise mathematical laws that maintain an overall balance between the different species on our
planet. It even controls the subtle shifts and changes underlying global climate and the weather. The
ancient Chinese called this 27th hexagram of the I Ching Nourishment with good reason. It represents
a built-in planetary law that rules all sentient life — to give is to receive.
Seen from a higher level of frequency, the 27th Shadow of Selfishness is a distortion of this
fundamental law. When we look at nature through a macrocosmic lens, we see that all the different
systems on this planet are interconnected. All life forms and matter, both organic and inorganic, are
essentially porous at the subatomic level. There is an entire mathematics of giving and receiving that
unites all forms and is primarily based upon food. We are using the word food here in the broadest
possible sense — if you are a bacteria for example, your definition of food might be anything from
gasoline to wood. The point is that life is a living chain of birth and decay — of creatures living off
each other and transforming one thing’s death into another thing’s birth. At the profoundest level,
nothing exists unless it can be eaten by something else.
We might refer to this principle within the 27th Gene Key as hologenetic. It is present in all
creatures at a genetic level, but can also be replicated as a set of laws governing any and every
system of life. In humans, for example, this law forms the basic thread of our morality — of what we
consider good and bad. This 27th Shadow of Selfishness in particular is labelled as morally bad or
undesirable. Through the 64 Gene Keys, however, all morality can be understood as simply the
movement of frequency through a certain archetype. Seen in this objective way, there is no moral
agenda. The 64 Shadows are not bad, even though their external manifestations are usually labelled
so. All forms on our planet are constantly evolving in frequency, so among humans we see higher
frequencies dominating in some places and lower frequencies in others.
Selfishness is where this 27th Gene Key begins its evolutionary journey in humans. The so-called
selfish gene has been a requirement for us to survive, particularly for blood ties and close genetic
groupings. However, selfishness must be transcended in order for the next form to mutate out of this
existing form of Homo sapiens. This is how the mathematics of nature works. As th', '', ''),
  (28, 'resonant vessel of each moment fear cannot survive and thus you experience a deepening calm and
quietness growing naturally within.
There is a deep sense of thrill that comes as you progressively face your inner
demons.
When you meet life through the Gift of Totality you meet life as a game to be played or a stage on
which to act. This is life lived as a romance — a romance that includes both comedy and tragedy.
There is a deep sense of thrill that comes as you progressively face your inner demons. Your demons,
as we have learned, are really your angels in disguise. Every situation in your life is devised as a
form of initiation that allows you either to remain as you are or to evolve. At the individual level this
Gift gives you a profound sense of freedom even when external forces appear to obstruct, challenge
or entrap you. On the inner planes, Totality gives itself to every situation, allowing the game to play
itself out with no expectation but with absolute conviction. When lived in this intuitive way, life
shows you that it has an underlying purpose in everything that it brings you. You simply have to align
yourself to the dramatic plotline as it unwinds before you. People aligned with the 28th Gift have the
wonderful knack of handling adversity lightly. The more deeply they accept each feeling of fear that
comes the lighter they grow and the more love they feel towards life.
As you begin to feel life’s purpose moving like a wave beneath you, you will feel the programming
partner of this Gene Key, the 27th Gift of Altruism, become more influential. As your own issues
begin to subside into the background, your life energy begins to direct itself towards others. One of
the great mysteries of existence is that the only true sense of purpose in life comes from the impulse to
serve something greater than one’s self. These are people whose acts and deeds immortalise them
because their lives burn so brightly with the fire of their deep sense of purpose. In overcoming the
fear of death, you begin to realise that one of the only things in life that lasts forever is the human
spirit itself. This realisation about the eternal nature of the human spirit paves the way for the ultimate
flowering of human consciousness — the Siddhi of Immortality.
The 28th Gene Key and the 32nd Gene Key make up the binary genetic codon group known as the
Ring of Illusion. These two Gene Keys both share a common theme of fear connected to death. Whilst
the 28th Shadow fears death itself, the 32nd Shadow fears dying unfulfilled. The Ring of Illusion
causes human beings to postpone their lives, seeking a sense of purpose in the future. Your thinking is
based upon fulfilment then, rather than now. The Gift within this codon however is that the illusion
can easily be broken through a simple understanding: true purpose is found in giving yourself one
hundred percent to every moment, rather than having to do with any kind of achievement. When your
fulfilment comes from simply being alive in the thrill of the role life is bringing you in the moment,
only then are you total. Whatever role you are playing in the game of life — lover, villain, master,
disciple or seeker — as long as your commitment is total, you will discover a mysterious detachment
running beneath the role itself, and this detachment is the reward for your courageous totality.
THE 28TH SIDDHI – IMMORTALITY
THE TRUE NATURE OF THE BEAST
Since the beginning of time humanity has wondered about the possibilities of immortality. Alchemists
have long sought the precious elixir vitae — the spiritual essence that when drunk will restore eternal
youth. Modern medicine has in its turn extended the human life span and will probably continue to do
so. With the promise of the new genetic science, many scientists are already talking about being able
to expand human life indefinitely. When we think of immortality we also think in terms of the soul.
Certainly the dream of the great world religions is that our sou', '', ''),
  (29, 'whole being.
People with the 29th Gift in their hologenetic profile can be exceedingly lucky people. Their clear,
committed decisions create the conditions for their own good fortune. These people cannot afford to
be led by others — they cannot listen to teachers, gurus, oracles or systems. Neither can they succumb
to pressure or expectation from others. Their decisions flow from deep within their bellies and brook
no argument. With the 29th Gift, a clear decision is felt as a quiet and powerful warmth that courses
through your whole being. These are not emotional decisions, neither are they excited or nervous or
explosive. Commitment is a wholesome energy, as though nature itself were taking control of your
destiny and showing you the way ahead. It is at this stage that you begin to understand that to commit
is also to surrender. Rather than expending a huge effort to maintain your commitment, you simply
surrender yourself to it. Sometimes if you feel a lack of commitment, it is because you need to
surrender even more deeply into your process.
Whether you have the 29th Gene Key as an aspect of your hologenetic profile or not, luck is made
or unmade here, every time you make a clear decision in life. This can be especially true in business.
Like a microcosm of life, a business is a journey with ups and downs. Prosperity is directly linked to
clear commitment — both in your relationships and in your daily work. Within business there are
many cycles that begin, end and begin again. Financial success cannot be measured by a single cycle,
but by continued commitment and certainty in your decision-making. For example, sometimes when
you stay committed to a direction that seems to be unsuccessful, it opens into opportunities that later
become successful. You cannot think your way through life. You can only align your inner direction
truly, trust in it come what may, and allow nature to do the rest. That’s the pure magic of the 29th Gift.
THE 29TH SIDDHI – DEVOTION
TANTRIC CONTAGION
When the Gift of Commitment takes on a universal level of functioning, it becomes transmuted into the
Siddhi of Devotion. Out of this consciousness all the great paths known in the East as Bhakti Yoga
have arisen. Bhakti Yoga refers to the path of devotion, or the path of the heart. Devotional paths are
all paths of self-surrender in which you completely lose your own sense of self in another. The other
can be a mission, as in the case of Mother Teresa’s devotion to the poor, or the other can be an ideal
or symbol such as a god or a guru. The path of devotion is far removed from society. Devotion is
commitment gone mad. It is mad in the sense that you have to leave the order of your mind to enter
into the wildness of your heart.
At the Gift level, commitment can still have traces of selfishness even though it is surrendered and
contains great power. However, the more the frequency rises through this 29th Gene Key, the more you
find your commitments directed towards the service of others. As the frequency gets higher and
higher, your commitment takes on a devotional quality and begins to activate the heart centre. At a
certain stage in this process, you cannot help but become a devotee of some higher cause or being,
and yet still the process goes on. As the energy of love pours outward into service, it requires you to
surrender your very identity to what appears to be an outside being or symbol. To those who do not
understand the true matters of the heart, such devotion appears misguided at best. People approaching
this Siddhi can appear to worship gurus or idols without a care for themselves. To the devoted one
however, the only thing that exists is the object of their devotion. If the devotional energy is towards a
guru, then the guru is seen everywhere and in every thing. If it is towards a mission, then that mission
is all that matters in your life and everything else must bend in that single-pointed direction.
When the quantum leap from the 29th Gift ', '', ''),
  (30, 'SIDDHI RAPTURE
GIFT LIGHTNESS
SHADOW DESIRE
CELESTIAL FIRE
PROGRAMMING PARTNER: 29TH GENE KEY PHYSIOLOGY: SOLAR PLEXUS/DIGESTION
CODON RING: THE RING OF PURIFICATION
(13, 30) AMINO ACID: GLUTAMINE
THE 30TH SHADOW – DESIRE
NATURE’S GREATEST CON
Deep within the matrix of the DNA molecule lies a vital code that is greatly responsible for the
building of our human civilisation. This is the 30th Shadow of human Desire. Often when we think of
desire we think first of sexual desire, which is in fact only one direction that desire can take. To
understand this 30th Shadow we will have to strip desire down to its essence, and this means
detaching the force of desire from its projection into the world. As a pure phenomenon, desire is
simply genetic hunger. It does have a deep connection to our physical need to eat, but desire alone is
not responsible for our individual survival. This aspect of our genetics does not influence
individuality at all. If anything, desire is far more likely to get us killed than protect us. However,
desire does serve a far wider purpose when viewed at a collective genetic level.
The real purpose of desire is to get human beings to make mistakes so that we can evolve. Let us
clarify this statement — desire does not serve the individual but it does teach us something valuable
at a collective level. The real hunger coming from this 30th Shadow is the hunger for experience
itself. In order for human beings to master their environment, they have to taste all aspects of it which
means that they also have to explore the darker side of experience as well as the lighter. The fact that
individuals or even large populations are killed in the process is of no consequence to the awareness
operating through the whole human gene pool. Humans are expendable to the collective — even
whole races are expendable — but humanity itself is not expendable. We are programmed through the
30th Gene Key to learn and evolve through experience, so there is nothing we can avoid experiencing.
If there is anything that is still untried by humanity, then somewhere, inside someone, the hunger of the
30th Shadow will push them into trying it — no matter how outlandish or depraved it may be.
For consciousness to enter into form, it must immerse itself deep within the form. In human beings,
consciousness has at its disposal a very powerful and sensitive system of awareness — an awareness
only overshadowed by the spirit of Gaia herself, of which humanity is essentially a sense organ.
become like guests you invite in for tea; they either leave in their own time or they stay and insist on
being followed. In this sense true lightness can be seen as the letting go of the need to escape desire
itself.
The other vital hallmark of the Gift of Lightness is a sense of humour. Everything is viewed in a
detached way even though it may still be deeply and sensually felt, so everything is seen lightly. The
humour that comes from this Gift is not a clever or sarcastic kind of humour and neither is it ever
directed personally at another. It always manifests as the ability to laugh at yourself above all else.
Your own life becomes a great tragi-comedy, since it incorporates both sides of the experiential
spectrum. You learn to see through all human behaviour. You see both the depth of suffering that lies
in the false belief that your desires can ever be fulfilled, and the great pleasure that comes from the
build up and release of your desires. The humour that comes through this 30th Gift is a very
compassionate humour — it is not about laughing at anything — it is simply the true response of a
human being who has surrendered to the higher self.
As you move into the higher frequencies of the 30th Gene Key, you finally begin to understand the
mystery of the cycle of desire. Beneath the thousands of desires that pass through your emotional
system each day, you begin to determine a single underlying desire that gradually becomes stronger
and stronger — this is the des', '', ''),
  (31, 'SIDDHI HUMILITY
GIFT LEADERSHIP
SHADOW ARROGANCE
SOUNDING YOUR TRUTH
PROGRAMMING PARTNER: 41ST GENE KEY PHYSIOLOGY: THROAT/THYROID
CODON RING: THE RING OF NO RETURN
(31, 62) AMINO ACID: TYROSINE
THE 31ST SHADOW – ARROGANCE
THE WORLD WIDE WEB OF WORDS
This 31st Shadow and its various frequency bands really turn some fundamental human concepts
upside down. You may note that these bands track all human evolution as it moves from a state of
arrogance to a state of humility. The chances are that you, like the rest of humanity, have been
conditioned to think of arrogance and humility in a certain way. The general conditioning says that
arrogance is a negative trait and that humility is a positive trait. Since this 31st Gift directly concerns
leadership and influence, we are going to have to explore the real definitions of these two words,
because the 31st Gift of Leadership sits like the fulcrum of a seesaw between the two of them.
As one side of a binary genetic codon known as the Ring of No Return, the 31st Gene Key is
chemically bonded to the 62nd Gene Key — they both code for an amino acid in the body known as
Tyrosine. This genetic coupling is very interesting when we explore it a little further. The 62nd
Shadow is the Shadow of Intellect and concerns the mental skill of manipulating language in order to
try to understand our environment. In effect, this Shadow encases you inside a world of language and
words from an early age, projecting a mental neuro-linguistic map onto reality as you perceive it. It is
because of the 62nd Shadow that when you look at a tree, the word tree unconsciously forms in your
mind. The 31st Shadow extends this cognitive ability beyond the simple creation of a neurological
map of reality — it uses this skill in order to control and manipulate others. The nice word we have
for this is leadership. Because of the chemical bridge between these two Shadows, humanity comes
pre-programmed to follow those who can best manipulate language, facts and words.
In terms of leadership, we human beings operate very differently from animals. Animals choose
their leaders instinctively based upon one animal having an alpha gene which marks it as the leader.
In humans, the alpha gene is present in the one who can best manipulate others through language.
Such people may or may not have a strong moralistic character — that is immaterial. What is
important here is that language is the medium through which human leadership is manifested.', '', ''),
  (32, 'individual finances operate. When you surrender to the greater pattern and raise your consciousness
above the fear threshold, money always arrives just when it is needed. Money actually provides a
wonderful lesson in letting go of fear, and in many respects it has become one of the new spiritual
teachers on our planet. Whilst it is here (which is not forever), we should make the fullest use of it as
an outer symbol of our ability to surrender to higher forms of consciousness. Every time you feel
yourself worrying about money, smile, take a breath, thank your ancestors, and relax. When you truly
need it, it always comes.
REPRESSIVE NATURE – FUNDAMENTALIST
The repressive side of the 32nd Shadow is an extreme form of conservatism. The 32nd Shadow is a
deeply contracting energy in itself, so that when it manifests through a repressive and fearful nature it
becomes extremely tight and fundamentalist. Such people are literally choking themselves physically,
emotionally and financially. They are starving themselves of breath and of support from others. The
tendency of such people is to isolate themselves in tight little communities that do not interface with
the wider world. Such communities, groupings or cults can easily become paranoid about the rest of
the world, and it is usually only a matter of time before they die out altogether.
REACTIVE NATURE – DISJOINTED
The reactive nature of the 32nd Shadow is about losing all sense of the continuity in life. This is a
state based on anger — the anger that there is nothing to support you but yourself. This means that
your anger will drive you into a self-destructive life pattern that will probably escalate at an alarming
rate. If you have lost touch with the flow of life, then nothing really goes smoothly for you — you
have cut yourself off from the source. People who live such disjointed lives, with no real rhythm or
purpose, put themselves in great physical danger. The decisions they make cannot follow the natural
flow that leads to health and wealth. Every decision we take in life either connects us to something
greater than ourselves or cuts us off from our true and vital inheritance, leaving us feeling isolated
and alone.
THE 32ND GIFT – PRESERVATION
THE ART OF GRAFTING
The 32nd Gift is called the Gift of Preservation. It is a truly noble Gift because it is about seeing
beyond your own little world, which means going beyond selfishness. The 32nd Gift is about keeping
things alive. However, it is not about keeping just anything alive, it is about knowing what to keep
alive. As we saw with the repressive side of the 32nd Shadow, this Gene Key can just as easily lead
to the preservation of things that really do not serve the human race, such as fundamentalism.
However, the person who has raised the frequency of this Gene Key can see beyond the confines of
their fear-based thinking, and they find that they have an instinctive gift for investment.
Investment can be understood on many levels. If the 32nd Gene Key is a major aspect of your
hologenetic profile, then you have the potential of a powerful instinct for sensing the long-term picture
in all situations. People with this gift also often have a deep capacity for restraint. They have the
strength to withhold their energy (or money) from situations that appear tempting but that in the long
term would not serve them. By the same token, this Gift enables people to trust in an instinct
(especially about other people) that often does not appear to be at all logical, but that in the end will
be extremely beneficial to them and to many others.
The secret to this Gift is the instinctive ability to balance restraint (what to keep alive) and risk
(what to change). These are people who inherently know that if you want to maintain success in life,
you have to have an unflinching set of principles coupled with a constant need to update,
revolutionise and expand your original investment. The parable of the Talents from the New
Testament is an exce', '', ''),
  (33, '', '', ''),
  (34, 'SIDDHI MAJESTY
GIFT STRENGTH
SHADOW FORCE
THE BEAUTY OF THE BEAST
PROGRAMMING PARTNER: 20TH GENE KEY PHYSIOLOGY: SACRAL PLEXUS
CODON RING: THE RING OF DESTINY
(34, 43) AMINO ACID: ASPARAGINE
THE 34TH SHADOW – FORCE
THE BANE OF TRYING
The 34th Shadow concerns the notion of individual human power. It represents an ancient part of our
genetic matrix that is primarily based on individual survival — the survival of the fittest. This primal
power source has its roots deep within our genetic past and began when the very first plants appeared
on earth. It was also strongly apparent during the reptilian phase of evolution on our planet. The reign
of the dinosaurs during the Mesozoic Era is an archetype of the power lying within the 34th Gene Key.
In human evolution, it was this power determined to survive that literally forced the spines of our
early hominid ancestors into progressively more upright stances. This is the force that made us
different from all other mammals, because the moment we were upright our brains began to develop
differently.
Despite our burgeoning intelligence, the 34th Shadow still lies within us as the urge to use force to
make things happen in life, and it can be highly destructive when influenced by low frequency
vibration. The 34th Shadow carries a primal quality about it — it is not even animal, but is far more
ancient. It is simply a pure evolutionary force whose prime directive is survival, and its only
prerogative is to maintain life within a particular organism. You would not even call it selfishness
since that implies an awareness that others exist. This Shadow creates a kind of intense self-
absorption that, when applied to a modern human, leads to brute power without self-awareness. This
34th Shadow therefore gives rise to a basic human law — at low frequencies, all human beings are
destructive to the collective. The nature of modern society means that DNA, when behaving according
to these archaic rules, inevitably destroys itself.
You can perhaps see how the ancient intelligence in this 34th Shadow was once absolutely
necessary in order for humans to survive and evolve beyond other forms of life — especially other
mammals. Through trial and error, the force within this Gene Key taught our bodies how to outwit
other species. Yet in today’s modern world this ferocious competitive power is actually the greatest
threat to our collective survival, and not just to our own survival but to that of the entire planet. The
programming partner of the 34th Shadow is the 20th Shadow of Superficiality whose repressive
aspect is Absence, which denotes an absolute lack of what we call humaneness. When the 34th
Shadow acts, it actually has no sense of what it is doing. It just acts without thinking or caring.
Awareness may well creep in after the activity has finished, but during the activity there is only pure
mechanised absorption.
In terms of modern human beings and their behaviour, the 34th Shadow can be best understood
through the notion of trying. Trying implies forcing something to go a certain way when it won’t go
there easily on its own. Each time someone is caught in a space of trying to make something happen
against the flow, they are under the influence of this Shadow frequency. Such people seem unable to
stop moving in the direction in which they have set out, and any attempt at help or guidance from the
outside falls on deaf ears. As an aspect of the codon Ring of Destiny, the 34th Shadow is linked
chemically with the 43rd Shadow of Deafness. Under the influence of this Shadow you become totally
lost to the force that is moving through you, even though it may be harmful to you or others. When
operating at a low frequency, this 34th archetype is unavailable to outside influence. Consequently you
can see how, at its extremes, this energy can give rise to the most horrendous sub-human acts.
At low frequencies, all human beings are destructive to the collective.
If you have this 34th Gene Key as a major aspe', '', ''),
  (35, 'SIDDHI BOUNDLESSNESS
GIFT ADVENTURE
SHADOW HUNGER
WORMHOLES AND MIRACLES
PROGRAMMING PARTNER: 5TH GENE KEY PHYSIOLOGY: THYROID/PARATHYROID
CODON RING: THE RING OF MIRACLES
(35) AMINO ACID: TRYPTOPHAN
THE 35TH SHADOW – HUNGER
THE HUNGER OF THE SPECIES
There is a perpetual and innate hunger built into all human beings. This hunger operates on many
different levels within your being and is caused by the chemistry generated by the 35th Shadow as it is
refracted through your DNA. The classic translation for this 35th hexagram of the I Ching is the word
Progress, which is very apt since the 35th Gene Key drives all human progress. At the Shadow
frequency progress is expressed as outer evolutionary progress, embodied for example in humanity’s
recent technological revolution. True progress, however, has little to do with physical manifestations
and everything to do with the progress of human awareness. In a nutshell, what the 35th Shadow does
is divert true progress out into the world of form, thus sacrificing its potential to transform the inner
structure of humanity itself. Thus, because of this Shadow, the outer world evolves at the expense of
the inner.
Through its associated amino acid tryptophan, the 35th Gene Key is connected to the secretion of
serotonin within the body. Serotonin is well known as a chemical that induces states of satiation and
deep fulfilment. As a result of the interference from the Shadow frequency passing through this codon,
serotonin production within the body is inhibited, leaving human beings with a perpetual feeling of
hunger. This deep unrest within the human body drives human beings out into the world to try to find
something that can bring an end to what is essentially genetic hunger. This hunger drives all human
experience, from drugs, food and sex (all of which may increase serotonin levels briefly) to business,
religion, science and even war. However, no matter how you try to satiate your hunger in the outer
world, it will never be enough. Our fate is sealed by this 35th Shadow because no external crutch or
method can ever replace the natural balanced chemistry of your own body.
The 5th Shadow of Impatience is the programming partner to this 35th Shadow and it operates
alongside hunger, pulling you away from your inner natural rhythm with life. It is your very
impatience that fuels your hunger, and your hunger that fuels your impatience — a classic biofeedback
loop that keeps human beings operating at the Shadow frequency.
All external human progress, particularly in modern times, has come about because of this 35th
Shadow. We are a hungry and unfulfilled species — we don’t know what we want, but we want it
now. It is important to understand that this endless wave of hunger in human beings is not an
individual programming function of your genetics. It is universal to our whole species, driving us
outwards to explore and conquer the world around us without a thought to the consequences. This is
what humanity is right now. When you are truly hungry, you cannot think about the consequences of
eating — you are simply possessed by the urge to fill yourself.
One of the great destructive aspects of the 35th Shadow is seen each time you have temporarily
filled yourself up. The moment you are full, you slowly begin to feel empty again, and so the cycle
continues. And it is at this very stage that we make our greatest mistake — we either become attached
to the external means of fulfilment and enter a cycle of addiction, or we blame the external means
(often a person) for not fulfilling our hunger and move on to something or someone else. It is because
of this basic pattern of disappointment and blame that the human spirit is unable to find lasting peace.
The destructive tendency spoken of above comes about through your identification with the object or
person that promises your fulfilment. If you become addicted to it, you destroy a part of yourself since
you cease to grow. If you blame your disappointment', '', ''),
  (36, 'SIDDHI COMPASSION
GIFT HUMANITY
SHADOW TURBULENCE
BECOMING HUMAN
PROGRAMMING PARTNER: 6TH GENE KEY PHYSIOLOGY: SOLAR PLEXUS
CODON RING: THE RING OF DIVINITY
(22, 36, 37, 63) AMINO ACID: PROLINE
THE 36TH SHADOW – TURBULENCE
THE DARK NIGHT OF THE SOUL
The 64 Gene Key Shadows provide the grist for the mill of all human suffering. Each shadow
provides a mythic challenge for humanity to move through which, at the individual level, is fought
within the physical battlefield of the body. The 36th Shadow is an emotional battle that must be fought
by every individual at certain points during his or her life. As a vibration felt across the length and
breadth of our planet, this Shadow manifests as a collective emotional turbulence. This turbulence
exists because uncertainty exists and every human being knows that disaster could strike at any
moment. There is a great deal of heavy propaganda for this 36th Shadow, particularly through the
modern mass media. The continual barrage of negative news via television and the media ensures that
most human beings are programmed with an unconscious background field of nervousness and
turbulence.
At a certain point in history, the 64 patterns or hexagrams of the Chinese I Ching were adapted for
the purposes of divination and for predicting cycles within time. It is the modern use of the I Ching as
an oracle that is so popular today. The ancient sages noticed that when certain hexagrams were
drawn, they indicated periods of intense crisis or danger. The 36th hexagram was one such hexagram,
and thus it was given the ominous name The Darkening of the Light. There is much truth within this
name, although when understood at its most profound level, the 36th Shadow contains an enormous
wealth of consciousness.
Extrapolated to our genetics, the 36th Gene Key represents a part of our chemistry that goads
human beings to break through boundaries of experience. At a collective level this is a vital aspect of
human survival — to learn what is dangerous and what is not. Evolution in this sense can be viewed
in a much wider context. It uses us humans as experiential eyes to probe the outer limits of
consciousness itself and demands that we look into the darkness, put our fears aside and plunge in
emotions. These are people who are in the process of accepting their own suffering and thus
experience it at a different level of frequency. Only at the highest levels is our suffering
instantaneously transformed into rapture. At the Gift level however, suffering is still suffering, but it
brings human beings together rather than pushing them apart. This Gift is about humaneness — it is
about working from your heart. When you begin to live from your heart, you suddenly have an antidote
to fear.
The 36th Gift is driven by the same urge as the 36th Shadow — the evolutionary impulse to
experience new feelings and new situations in order to learn from them. Here, with an open heart, the
36th Gift can negotiate challenging and potentially turbulent emotional situations with maturity and
diplomacy, taking one’s own and others’ feelings into consideration. People with the 36th Gift are thus
the kind of people that others turn to when in distress, since their aura resonates strongly with the
common human theme of suffering. At this level these people are no longer overwhelmed by emotions
as they tend to be at the Shadow level, but have opened and expanded themselves to life through harsh
experience. This makes them emotionally capable of handling all manner of traumatic experiences.
As a living transmission, the 36th Gift carries a great teaching into the world — the celebration of
humanity. It contains a natural spirituality that is more humanist than Divine. In this sense it is one of
the most grounded of all the Gene Keys. It is a bridge for the higher bodies of humanity to move down
into the lower planes and transform them. It conveys the image of Christ descending into hell and
absorbing its frequencies fully into his own b', '', ''),
  (37, 'SIDDHI TENDERNESS
GIFT EQUALITY
SHADOW WEAKNESS
FAMILY ALCHEMY
PROGRAMMING PARTNER: 40TH GENE KEY PHYSIOLOGY: SOLAR PLEXUS
 (DORSAL GANGLIA)
CODON RING: THE RING OF DIVINITY
(36, 37, 22, 63) AMINO ACID: PROLINE
THE 37TH SHADOW – WEAKNESS
THE REAL POLE SHIFT
As humanity gradually begins to move out of the astrological age of Pisces and enter the new Age of
Aquarius, we are experiencing a shift in the emphasis of the global archetypes that imprint us as a
species. The 37th Gene Key and particularly its Shadow frequency have marked the age that we are
now leaving. Those with an eye for occult information will perhaps recall the number 37 as being the
number of Christ taken from Gematria, the ancient Hebrew system of alphabetical numerology. We are
moving out of the sphere of the specific mythology surrounding Christ and into the sphere of the third
aspect of the sacred Trinity whose new mythology is based upon the great feminine archetypes of
synthesis. This does not mean that the power behind the Christ myth will in any way diminish as we
enter this new phase of evolution. What will change is our understanding and interpretation of the
myth as its hidden aspects finally reveal themselves. This process ushers a flood of new mythic
feminine images and archetypes into the collective consciousness.
The 37th Shadow is the Shadow of Weakness. Weakness as we shall see, is nothing but a
projection of the male psyche onto the female psyche as, in the West, women have been viewed up
until recently as the weaker sex. However, what appears to humans as weak is actually something that
we cannot yet understand. We may see this enacted even in the externals of the Christ myth itself, in
which one man surrenders to forces that finally overpower him. Naturally, it is the inner meaning of
the myth that holds the real key, for it is only in the sacrifice and the subsequent resurrection that one
finally comes to understand the hidden nature of Jesus’ actions. Much about this 37th Gene Key
therefore concerns the nature of a force that is perceived as weak but that inevitably shows itself to be
the opposite.
The 37th Shadow represents the inequality between yin and yang forces on our planet. The natural
tendency of evolution has been to favour the physically stronger. At low frequencies, our genes know
no other reality than the survival of the fittest. However, we have now reached a stage in evolution in
which physical strength no longer governs our future direction. That future direction lies wide open
for anyone, regardless of sex or strength. What we used to perceive as weak or strong is totally
changing, even reversing. Those who thrust themselves to the top of the hierarchy through brute
strength and subversion are losing their power and those who hold a vision of synthesis based on
self-transcendence are gaining more power. In this way the world is transforming.
The 37th Shadow is undergoing a major mutation throughout humanity that will only build in speed
and frequency as we move beyond its old boundaries and definitions. It is because of this mutation
that the entire social structure of our civilisation is crumbling. Here in the West the traditional family
unit is experiencing a natural demise, and at such times great social change and unrest is much in
evidence. Because of this inner rebalancing within the human psyche, the fabric of our society is
being forced to change. The repressed feminine side of humanity is rising up to the surface once again
and this is changing the basic patterns of the traditional roles for men and women. This uprising of the
yin force is actually beyond gender, but it is also confused by gender. Many women today are under
the impression that the time for women is coming and the time for men is over. This attitude is simply
another form of the 37th Shadow, which always over-emphasises one aspect of the polarity.
The true definition of Weakness can be seen when the feminine principle is witnessed serving the
mascul', '', ''),
  (38, 'a wonderful and vital opportunity to feel more alive and to fulfil your higher destiny.
The 38th Gift is the Gift of Perseverance. This is a Gift that really thrives when you are up against
the odds. People with this Gift make the impossible look effortless, even whilst exerting themselves
fully. These people are extremely active and physical. They have a genetic need to push their bodies
and love being right in the thick of the action. As we saw with the 38th Shadow, this is not a thinking
archetype. These are people of action. The only trick for them is to know when to act and when not to
act and this is where the Gift of Perseverance comes into play. It knows when to hold its energy back.
In other words, these are people who have learned to draw a breath before they rush into some new
action. This breath is not so that they can think — it is simply to make sure they are responding from
truth rather than reacting from fear or anger.
As with the 39th Gift, the 38th Gift has a strong link with the archetype of the warrior. In the
modern world, the path of the warrior is not what it used to be. All kinds of new domains have
appeared where this Gene Key is now played out. There are warriors in the business world, warriors
in government and education as well as in the sciences and arts. Wherever there is a fight for a higher
purpose especially against insurmountable odds, there you will find the 38th Gift stretching itself to its
limits. Where the 38th Shadow is always fighting out of fear, and usually for survival, the 38th Gift
fights for love. In our modern world, the only domain for the 38th Gift is the battle against the Shadow
frequency, which is the battle against the collective frequency of fear. The 38th Gift does not think
about what it is doing. It does not stop to consider how foolish its behaviour may appear. It simply
knows in its heart when something is right and once it has committed its full energy to its appointed
task it will never, never back down. Even so, this does not mean that such people are beyond fear,
because they are not. However, the frequency of the Gift level insures that love always wins over
fear.
The 38th Gift is part of a genetic codon family known as The Ring of Humanity. Each of the six
Gene Keys in this group represents an archetypal aspect of the human story. In this story, the 38th Gene
Key sets the pattern of all human struggle — the struggle of all form to reach spirit. In human beings it
is represented by the quest of the inner warrior of light against the dark forces of your lower nature. It
is this quest or battle that stands behind all external human conflict. Perseverance is the most essential
human attribute of the inner warrior because the darker forces of human instinct are so deeply
embedded in our nature. Thus it is often through defeat that human beings learn to be stronger. Over
time, through perseverance, love and trust, you will eventually attain victory and experience your own
divinity.
People with the 38th Gift become our heroes. These people take a stand, absorb all the obstacles
along their path and eventually win their battles despite appearing to be the underdog. With the 38th
Gift comes the certainty of final victory. The only necessity is to find the right battles. For them, the
right battles are those that empower others to stand up for themselves rather than remain victims of
mass propaganda. There are two huge benefits to the collective that emerge from the manifestation of
this 38th Gift. The first is a great challenge to the collective fear — it says that nothing is impossible
if you stand up for what you believe in. The lives of people with the 38th Gift are living proof of this.
The second benefit is that the 38th Gift also proves that you can fight a battle and win without
resorting to violence and corruption. This does not mean that the 38th Gift is in any way soft — on the
contrary, it can be fiercely aggressive in its service of a higher goal.
Many of the', '', ''),
  (39, 'SIDDHI LIBERATION
GIFT DYNAMISM
SHADOW PROVOCATION
THE TENSION OF TRANSCENDENCE
PROGRAMMING PARTNER: 38TH GENE KEY PHYSIOLOGY: ADRENALS
CODON RING: THE RING OF SEEKING
(15, 39, 52, 53, 54, 58) AMINO ACID: SERINE
THE 39TH SHADOW – PROVOCATION
ATTITUDE AND ALTITUDE
Even though there are so many incredibly different flavours and possibilities within the human genetic
matrix, there are relatively few themes governing humanity. The 21 Codon Rings program us
collectively and individually to move along certain easily recognisable pathways. All the archetypes
that appear on our television screens and in our novels and myths are therefore represented in our
DNA. The 39th Gene Key and its programming partner the 38th Gene Key hold a truly unique place in
our collective cosmology. Above all other archetypes, these two represent the myth of the warrior.
Legends and myths have extraordinary power over our different cultures. Even today, when
campfire stories have been replaced by the silver screens in our living rooms, the myth of the warrior
still holds us captive. We shall see in due course why we aspire so strongly to attain the highest
frequencies of this 39th Gene Key. Meanwhile, the equally potent lower frequencies of the 39th
Shadow are extremely sinister, as they currently hold the majority of humanity within their thrall. The
39th Shadow is responsible for maintaining a planetary vibration dominated by a single quality —
violence.
Rooted in your adrenaline system, this 39th Gene Key is a highly dynamic code that is all about
action. It has a gutsy, explosive and primal quality to it. People with these Gifts and Shadows are not
led by their heads but by the primitive urge to act, whether wisely or foolishly. You can see from both
the repressive and reactive sides of the spectrum, that this is a dangerous Shadow with which to cross
paths. It is rooted in the fear of being trapped, which is essentially the fear of losing your individual
freedom to act. We all know how dangerous animals become when trapped, and we humans carry that
same fear in our ancestral DNA. There are many reasons why humans can be incited to violence but
here we find one of the oldest reasons of all — the threat to individual freedom.
The 39th Shadow is like a cobra waiting to strike. This violence is personal, and when aimed
precisely at its target seldom misses. We most often see its manifestation in our personal
relationships. This is the Shadow of Provocation or, in everyday language, button-pushing. Have you
ever wondered how it is that your partner, parent or child knows the precise code, tone and word that
really provokes your anger? Violence comes in many forms, and it does not have to be physical.
Emotional violence is acoustic, using intonation to achieve its result. It isn’t what they say — it’s in
the tone they use! Tone never lies, although it is usually totally unconscious. Like a child whining at
the exact pitch that irritates you, every provocation has its tone. When someone is trying to make you
feel guilty for example, they unconsciously use a self-pitying tone that touches the exact location of
your guilt. It’s all rooted in sound.
As we have seen throughout this book genes can be adapted, even though they cannot easily be
altered. It is a matter of frequency, and frequency is about sound. As your attitude shifts, so your
frequency shifts. If you focus only on the negative aspects of a situation, then your frequency drops. If
you focus on the positive, then it lifts. It depends on which octave you are tuned to. Attitude in this
sense is always acoustic. What kind of process does information go through as it enters your ears?
How have you wired your own thinking and feeling to respond to the myriad intonations from the
environment? Until you create an inner transformer to tune out lower frequencies and tune in higher
ones, the lower frequencies will hit your DNA and bounce back as a reaction rooted in a similar low
frequency.
The 39th Shadow ha', '', ''),
  (40, 'SIDDHI DIVINE WILL
GIFT RESOLVE
SHADOW EXHAUSTION
THE WILL TO SURRENDER
PROGRAMMING PARTNER: 37TH GENE KEY PHYSIOLOGY: STOMACH
CODON RING: THE RING OF ALCHEMY AMINO ACID: GLYCINE
(6, 40, 47, 64)  
THE 40TH SHADOW – EXHAUSTION
THE ENERGETICS OF FORCE AND WILL
The 40th Gene Key and its Shadow concern the correct or incorrect use of the power of the human
will. The secret of this Gene Key is found in the difference between the words energy and force.
Energy in this context refers to the natural vitality that flows into your actions in the world. Whenever
your actions are in alignment with the universe the requisite energy is supplied from deep within your
being. However, when your actions do not flow from your true source but are forced, your energy
will be depleted.
The malfunctioning of the 40th Shadow is deeply connected to the conversion of food and liquid
into energy through the medium of the stomach. In the age-old traditions of oriental medicine, the
overall health of the human body is seen in terms of its vitality or Chi. According to this tradition,
there are two forms of chi: pre-natal chi, which is the inherited vitality that you are born with and
which governs your eventual age, and post-natal chi, which you extract from food and nature. The
oriental approach to health is based upon conserving your pre-natal chi wherever possible, while at
the same time boosting your post-natal chi. The 40th Shadow of Exhaustion comes about due to
ineffective energy conversion of food and liquid into post-natal chi, resulting in the body having to
draw upon its precious reserves of pre-natal chi. Coupled with its programming partner, the 37th
Shadow of Weakness, these two low frequency energy patterns gradually wear human beings down to
the bone. Like all thirty-two of the Shadow pairings, this process is a vicious cycle.
At the higher levels of frequency, the 40th Gene Key is actually responsible for transforming our
civilisation and society through fruitful alliances, solid boundaries and mutually beneficial exchanges
between individuals, communities and even entire nations. However, the 40th Gene Key has the Gift
of Resolve, which means that people with this Gene Key in their hologenetic profile are born with
great willpower, a greatly misunderstood human faculty. We usually see willpower as something that
all human beings can access as long as they have the inner strength. There is a credo in the West that
says if you want something badly enough, you can always make it happen — it’s simply a matter of
willpower. This is the kind of conditioning that the 40th Shadow feeds on.
Willpower used in the wrong direction becomes force, and even though it may still succeed in its
endeavour, the results to the body will be catastrophic and irreversible. When someone begins to
force their life away from its natural direction, problems related to the stomach and to digestion crop
up. Because the energy from food is not being properly converted, there is usually a build up in
stomach acid that over time can lead to all kinds of far more serious problems, ranging from ulcers to
full blown cancer. The incorrect use of your will also puts an enormous strain on your kidneys and
adrenals as the body struggles to supply the energy to push against the universal flow. The result in the
long run is premature ageing, disease and exhaustion. For most human beings, this is the normal way.
Even so, the human body is an incredibly tough organism and can sustain an enormous amount of
punishment.
There are two ways in which the 40th Shadow can overwhelm you — either through attempting to
force your own willpower without having adequate support from others, or from allowing others to
take advantage of your weak willpower and giving in to compromise. This latter scenario is very
common among the business community, where people work in jobs with little or no resolve, and for
fees that are far too low. The problem is that when you compromise and work in a job tha', '', ''),
  (41, 'THE 41ST GENE KEY: THE PRIME EMANATION
FANTASY, ANTICIPATION, EMANATION
THE 42ND GENE KEY: LETTING GO OF LIVING AND DYING
EXPECTATION, DETACHMENT, CELEBRATION
THE 43RD GENE KEY: BREAKTHROUGH
DEAFNESS, INSIGHT, EPIPHANY
THE 44TH GENE KEY: KARMIC RELATIONSHIPS
INTERFERENCE, TEAMWORK, SYNARCHY
THE 45TH GENE KEY: COSMIC COMMUNION
DOMINANCE, SYNERGY, COMMUNION
THE 46TH GENE KEY: A SCIENCE OF LUCK
SERIOUSNESS, DELIGHT, ECSTASY
THE 47TH GENE KEY: TRANSMUTING THE PAST
OPPRESSION, TRANSMUTATION, TRANSFIGURATION
THE 48TH GENE KEY: THE WONDER OF UNCERTAINTY
INADEQUACY, RESOURCEFULNESS, WISDOM
THE 49TH GENE KEY: CHANGING THE WORLD FROM THE INSIDE
REACTION, REVOLUTION, REBIRTH
THE 50TH GENE KEY: COSMIC ORDER
CORRUPTION, EQUILIBRIUM, HARMONY
THE 51ST GENE KEY: INITIATIVE TO INITIATION
AGITATION, INITIATIVE, AWAKENING
THE 52ND GENE KEY: THE STILLPOINT
STRESS, RESTRAINT, STILLNESS
THE 53RD GENE KEY: EVOLVING BEYOND EVOLUTION
IMMATURITY, EXPANSION, SUPERABUNDANCE
THE 54TH GENE KEY: THE SERPENT PATH
GREED, ASPIRATION, ASCENSION
THE 55TH GENE KEY: THE DRAGONFLY’S DREAM
SIDDHI EMANATION
GIFT ANTICIPATION
SHADOW FANTASY
THE PRIME EMANATION
PROGRAMMING PARTNER: 31ST GENE KEY PHYSIOLOGY: ADRENALS
CODON RING: THE RING OF ORIGIN
(41) AMINO ACID: METHIONINE (INITIATOR)
THE 41ST SHADOW – FANTASY
THE GENETIC WHEEL OF SAMSARA
The 41st Gene Key and its various frequencies comprise a truly remarkable archetype. It stands alone
within the human genetic matrix with a very important function. It relates to what is known in genetics
as the start codon. Since this is such an important Gene Key it may help to understand exactly what it
means.
Below is an example of a section of genetic code transcribed into letters. The genetic code is
made up of combinations of only four letters A, T, C and G. These letters are called bases and
represent the basic building blocks of the entire code. Hidden within these billions of letters are
specific instructions for the body to follow. In deciphering the code of life, scientists discovered that
there were places within the sequence where the body always seemed to know to begin building.
They found that whenever the body sees the letters atg in a sequence, it always acts on the
instructions that follow. Thus they called this the start codon because it operates like a front door key
into the code itself.
caattgtcatacgacttgcagtgagcgtcaggagcacgtccaggaactcc
tcagcagcgcctccttcagctccacagccagacgccctcagacagcaaag
cctacccccgcgccgcgccctgcccgccgctgcgatgctcgcccgcgccc
tgctgctgtgcgcggtcctggcgctcagccatacaggtgagtacctggcg
ccgcgcaccggggactccggttccacgcacccgggcagagtttccgctct
From the above description, you should see how important this 41st Gene Key is. As a genetic
archetype of functioning within human consciousness, its message is of huge import to us all.
At the Shadow level of consciousness, the 41st Gene Key centres around the issue of fantasy and
dreams. Being in the thrall of the 41st Shadow of Fantasy is like holding the key to your dreams in
your hand, but never turning it in the lock. Whether you have this 41st Shadow in your hologenetic
profile or not, you are undoubtedly available for its influence because like all the Shadows, it exerts
its greatest power through the collective frequency of the planet. It is because of this 41st Shadow that
our planet is populated by people who dream of a better life but who, for one reason or another, are
unable to bring these dreams into reality.
The 41st Shadow creates a continual pressure within humans; it is the pressure to evolve. When
this pressure is distorted by a low frequency field, as is the current state of humanity, it becomes
distorted into the pressure to feel happy. Thus begins what the ancients named the Wheel of Samsara
— an endless cycle of suffering in which humans become trapped by the need to satisfy their desires.
With the mass distortion of the 41st Shadow, it is as though the body of humanity has misread the
instructions left within its collective DNA. It all begins here, in th', '', ''),
  (42, 'we learned at school that every seven years we have a new body, since most of its cells have been
totally replaced. This means that every seven years we arrive at a portal of some kind, and something
must die in order for a new cycle to begin. How that transition occurs is the domain of the 42nd Gift or
the 42nd Shadow.
The 42nd Gene Key is one of six Gene Keys that form a complex codon group in your DNA known
as the Ring of Life and Death. In all cycles of physical cellular mutation, life is programmed to follow
the archetypal processes represented by these six Gene Keys. All cellular life begins with the 3rd
Gene Key and ends with this 42nd Gene Key. The 3rd Gene Key catches the essence of the beginning
of life, through the Gift of Innovation and its Siddhi of Innocence. All life must innovate and adapt,
beginning in innocence and gaining in experience. Through the 42nd Gene Key, life ends with the Gift
of Detachment and the Siddhi of Celebration. Thus spiritual essence detaches itself from form, just as
we human beings must detach ourselves from those who have passed away. At the highest level all
death is really a cause for celebration, as we shall see when we come to explore the highest
frequencies of this Gene Key.
Through this Shadow, human life is programmed to revolve around your expectations about your
life and those surrounding you. Expectation itself should not be seen as a bad thing. It depends on how
you react to your own expectations and is a measure of how much trust you have in life. Whenever
you feel circumstances moving out of your control, you can immediately see how attached you are or
how detached you are. Every time you identify with an expectation, you set yourself up for
disappointment. It is actually possible to hold an expectation without being attached to it, which
occurs quite naturally with the 42nd Gift of Detachment. If you are able to expand your consciousness
and raise the frequency of this Shadow you will remember that you are merely a part of a greater
natural cycle and that all events fit into a far wider picture than you can usually comprehend.
Expectation and disappointment only plague you when your vision narrows to the event that you are
caught up in, rather than seeing its place in a wider picture. As we human beings so often learn in life,
many disappointments actually turn out to be enormous blessings.
Whether your expectation is optimistic or pessimistic, it narrows your field of vision
and closes down the limitless potential that exists in each present moment.
The programming partner of the 42nd Shadow is the 32nd Shadow of Failure. It is easy to see how
these two Shadows genetically reinforce one another to set you up for what you perceive as failure. In
fact, the moment you think in terms of success and failure, you have already failed because you have
become embroiled in expectation.
For such an innocent sounding word, expectation actually plays havoc with our lives. The mind
only sees what you programme it to see which means that, at one level, it is actually co-creating your
reality and influencing the flow of events around you. If you are expecting something bad to happen
you may not actually notice the good around you, which means you cannot take advantage of it or even
enjoy it. By the same token, if you are expecting something wonderful to happen and it appears not to,
you miss out on the potential contained in the event before you. Your expectation takes you out of the
present moment so effectively that you lose your place in the greater flow of the cosmos. Whether
your expectation is optimistic or pessimistic, it narrows your field of vision and closes down the
limitless potential that exists in each present moment.
REPRESSIVE NATURE – GRASPING
When expectation manifests through a repressive nature, it becomes an inability to let go and a
continual grasping at life. These people simply do not want things to end, and do anything to keep
everything the way it is. This is a', '', ''),
  (43, 'talking about physical strength here, although people with this gift often can be physically strong. We
are talking about the ability to act in harmony with natural forces — the real definition of strength.
When applied to physical activity, which is what this 34th Gift is all about, strength has no element of
trying or forcefulness within it. It simply flows out of you and you become effortlessly at one with the
activity. Effortlessness in this context does not mean that there is no exertion — there may be great
exertion — but there is no resistance. This fluid efficiency is one of the main hallmarks of the 34th
Gift.
Another key aspect of the 34th Gift is display. We already know that this Gene Key has ancient
connections with the early cycles of life on the planet and its oldest connection is with the plant
kingdom. Plants depend upon insects, birds and bees to generate and proliferate. In order to attract
these other agencies, flowers bloom into all manner of beautiful shapes, colours and aromas. In
humans, the 34th Gift shares this primal need for display, although not through any kind of ego. We
need to remember that the 34th Gift has no awareness of itself at any level. Obviously, the tendency to
draw attention draws negative attention at the Shadow frequency, but at higher frequencies it draws
positive attention. It is out of the 34th Gift that all kinds of examples of human strength are born.
The 34th Gift is the gift of heroes and heroines. It is one of the greatest and oldest of human
archetypes. True heroism occurs without awareness and is a wholly individual act. This is why every
human being alive feels deep resonance to the heroes of myth or the heroes of contemporary culture.
Heroism denotes strength. Ironically, though, true strength is quite unaware of itself. Many people
who have committed incredible acts of bravery have afterwards described the experience as devoid
of any intention on their part. This kind of heroism is entirely accidental (unlike the highest frequency
of the 21st Siddhi, which is Valour, an entirely different archetype). Often heroes feel uncomfortable
about being praised, because it seems to them that the whole thing was out of their hands. However,
even if it is accidental, the heroic act is never interpreted as such by others. It is usually set upon a
pedestal and glorified.
In a world where the lower frequencies dominate, true inner strength never goes
unnoticed.
Being such a physical archetype, the 34th Gift has a deep connection to activities involving
physical movement such as sport or dance. But this gift is not so much about team sports; rather it
presents as individual flair. These are people whose very movements have a hypnotic quality evoking
admiration from others. They are our sports heroes and Olympians who seem to convey and radiate
an individual power and poise beyond the norm. Mastery of human movement actually emerges only
when awareness has withdrawn, leaving simply an intense Self Assurance, the programming partner
of the 20th Gift. The 34th Gift can be demonstrated in myriad fields of human endeavour, that is, in any
area in which an individual rises above the common man. These people become our icons and gurus
in business, sport, war and sometimes government. There is a kind of primal power at work within
such people, and it is impossible for others to miss it. In a world where the lower frequencies
dominate, true inner strength never goes unnoticed.
Along with the 43rd Gene Key, the 34th Gene Key forms the Ring of Destiny — an unusual genetic
configuration that has a huge effect on your external life or destiny. When people speak of destiny they
often refer to a force that lies outside the reach of humanity. Yet the secret to destiny has to do with
frequency. It is through this codon that the two great forces of evolution and involution come together.
SIDDHI EPIPHANY
GIFT INSIGHT
SHADOW DEAFNESS
BREAKTHROUGH
PROGRAMMING PARTNER: 23RD GENE KEY PHYSIOLOGY: INNER EAR
C', '', ''),
  (44, 'on tightness and fear. It creates tension and boundaries throughout all our environments. Even more
crucially it creates the notion of hierarchy, because there are those who control and those who are
controlled. In a contorted kind of way, this relationship between the controllers and the controlled can
actually work quite well. It is the foundation of the idea of classes and castes, and in its ideal form it
became the responsibility of the upper classes to feed and protect the lower classes.
This has been the way most societies on our planet have functioned for millennia and the greater
part of the world still operates in this old way. It is the basis of our notion of royalty and ancestral
lineages in families. It is only fairly recently that these archaic systems have really been questioned
and are gradually losing their control and power. One of the manifestations of this decline of
hierarchical control has been the rise of the middle class in the western world. However, the new rise
of the middle classes does not offer a great deal more than the old system. It creates just as many
problems. Families are now more cut off from each other than ever, and we have a world of every
family for itself. The urge to control has simply shifted venues. Control now operates most
powerfully through capitalism.
The issue of control is the issue of patriarchy. Patriarchal forms of government are the bedrock of
our society, from politics to education to business. Most of those who are in control are only
interested in power and money, and those who are not interested in power or money are generally too
submissive to take any action. Apart from a few valiant individuals with true vision, the positions of
true power on our planet are filled by those following personal agendas. The 21st Shadow makes it
seem as though you simply cannot defeat the patriarchal system, so most people’s true visions for a
better world are choked before they are given a chance. However, the first ripples of a new frequency
are emerging in the world. As those with the 21st Gift find positions of power the balance will begin
to shift, because the higher frequencies of this Gene Key are not interested in power or money or
control, despite having a Gift for all three. They are really interested in serving community. Even
more than this, they have the courage to enact their visions, and that will make all the difference.
There are many misunderstandings about the issue of control and power. There will always be
people who are naturally gifted leaders, but at the higher frequencies they see leadership as service,
which means that those who serve with them or under them are never really under them — rather they
are working alongside them. The problem with the old system is not the model but the frequency of
the people in the model. The moment a system has everyone in exactly the right place, it no longer is
patriarchal or matriarchal. It actually becomes synarchical. Synarchy is a model in which all people
are equal but some still have more authority than others. This authority however is based upon
frequency rather than fear. The reason that synarchy succeeds where hierarchy cannot is that every
person in a synarchy is fulfilled by their role, regardless of how much or how little responsibility it
carries. For a fuller description of such a model you can read the 44th Gene Key.
The ultimate root of territorial divisions across our planet is distrust in life itself. This is the real
human disease. Territory and control through power and money are simply the manifestations of this
disease. The programming partner of the 21st Shadow is the 48th Shadow of Inadequacy, which
underpins all this fear of losing control of your territory. We simply do not yet know that we are a
single entity. When the time comes that we see our true nature as a collective holistic human family,
the need to control life will cease. Ultimately, the only ones who will be given positions of control
wil', '', ''),
  (45, 'enthusiasm has the power to overcome the mass propaganda telling you that your dreams are
impossible, and your courage is the sword protecting you from individual pressure that threatens to
choke you. With this newfound courage you can finally stand as a fully embodied human presence.
There is a deep entrepreneurial spirit here in this genetic codon. It is, after all, called the Ring of
Prosperity. It is the fusion of human talent coupled with the power of group synergy (the 45th Gene
Key) that opens the field for true prosperity. The more you expand into your talent, the more the
universal field of consciousness responds, coming to meet you halfway. Only by striking out alone
will you find the right people to support, orient and bring your vision to fruition.
The 16th Shadow has much to do with the unique gifts concealed within every human being, but at
the Shadow frequency this can be very confusing. The 16th Shadow puts all its emphasis on skills,
techniques and systems rather than on the human spirit that enlivens them. These people can become
addicted to information and techniques, but rarely transcend these techniques. The 16th Shadow
creates experts, whereas the 16th Siddhi creates masters. The distance between the two is almost
unfathomable. To be an expert is to remain indifferent and unenthused because once enthusiasm has
been unleashed, skill gives way to something far more magical — it opens up the amazing Gift of
Versatility. As you become more versatile, you for the first time become truly different — you
become special, and the moment that happens, you have finally killed indifference.
REPRESSIVE NATURE – GULLIBLE
When indifference is repressed it manifests as gullibility. These people become victims of the mass
propaganda of the collective. An example here is people who use the excuse that if governments
cannot help the world situation, how can they? This gullibility essentially allows people to hide their
indifference behind the indifference of others. At the deepest level this gullibility fosters individual
weakness and a feeling of powerlessness. Every time you turn on the news on television for example,
you meet this huge negative conditioning field. How you respond to this field determines your
frequency. The response of the repressive nature is to bury your head in the sand in the belief that
nothing can be done.
REACTIVE NATURE – SELF-DELUDED
The nature of indifference actually makes it impossible for a person to react, so the reactive nature in
this instance appears to be something of a misnomer. These people hide their fear in their obsession
with structure, systems and techniques. They become so deeply identified with the structures their
minds are following that they forget about the reason for the structure in the first place. This gives rise
to a deep self-delusion in which these people build powerful mental walls around themselves,
keeping the world and others locked out. In a certain sense these people are also gullible like the
repressive nature, but their gullibility concerns their own propaganda rather than anyone else’s. They
are convinced by their own minds. However, behind their mental walls seethes a huge anger that is
far from indifferent, and which will eventually destroy them unless they can see through their own
self-delusion.
THE 16TH GIFT – VERSATILITY
A TALENT FOR SUSTAINABILITY
In discussing the 16th Shadow, you need to realise something of great importance — indifference is an
expression of the collective frequency of humanity operating through your genetics. Because of this,
there can be no fault or blame placed on this trait. Indifference simply arises because the mass
consciousness does not yet see its own true nature — that is, it doesn’t yet realise itself as a holistic
entity. However, our new awareness will enable us to identify as a single consciousness. This
identification means, for example, that when someone turns on the television to watch the news and
sees something u', '', ''),
  (46, 'SIDDHI ECSTASY
GIFT DELIGHT
SHADOW SERIOUSNESS
A SCIENCE OF LUCK
PROGRAMMING PARTNER: 25TH GENE KEY PHYSIOLOGY: BLOOD
CODON RING: THE RING OF MATTER
(18, 46, 48, 57) AMINO ACID: ALANINE
THE 46TH SHADOW – SERIOUSNESS
THE RAINMAKER
Sometimes the best way to describe something is through a story. In fact this isn’t so much a story as a
description of an ancient archetype. It centres on a rainmaker, a sorcerer whose unique gift is to
influence local weather patterns and cause rainfall through magical means. In ancient times (and still
in many places today) when a region was experiencing an extended drought, the locals would send for
the rainmaker.
In our story the rainmaker is a little old man, and when he arrives in the village he is offered
anything he needs. After all, the future lives of the villagers and their families depend on his success.
Without rain the crops will not grow and there will be nothing to eat. However, the rainmaker says
that all he needs is a hut to sleep in and to be left alone for a few days. Knowing well that his every
move is being watched by the curious villagers, the old man begins setting up his paraphernalia,
whatever it may be — perhaps some strange looking device, or a series of offerings to the
appropriate gods. Some rainmakers just disappear into their hut and wait, appearing to do absolutely
nothing.
After a few days, if the rainmaker is genuine, it will begin to rain. The villagers heap praise upon
him and his magical powers. His reputation grows because wherever he goes, he appears to make it
rain. However, despite his far-reaching fame our rainmaker has a great secret known only to himself.
He knows that in truth he has no special powers over the weather. His secret is that he has discovered
his true purpose in life — he is a rainmaker, and wherever he goes it happens to rain. He doesn’t
make it rain; he is simply attuned to places where it is about to rain. This is why he doesn’t have to do
anything other than show up wherever he feels like going.
This simple story encapsulates all that is wonderful about the 46th Gene Key and also contains the
quintessence of the true meaning of this whole work. Hidden inside your DNA lies your higher life
purpose, and when you find that higher purpose, everything is laid out for you by the spirit of Divine
Grace.
The Shadow archetype of the 46th Gene Key is Seriousness. Seriousness is the most widespread of
all diseases on our planet and is a primary cause of much ill fortune. When you live your life from
this Shadow, you carry a black cloud above your head wherever you go. It always seems to rain when
you don’t want it to because you are out of synchronisation with the whole. You create obstacles for
yourself when you become too focused either on the future or on the past. Seriousness is about
worrying or expecting or wishing life to be other than it is right now. Seriousness takes you away
from life and love and into issues of control and separation.
The 46th Gene Key governs your relationship to your physical body. It is part of the codon group
known as the Ring of Matter, which programs the developmental process of incarnation from the point
of conception to the age of 21. Specifically, the 46th Gene Key relates to your first seven year cycle in
which all your Shadow patterns are hotwired into your physical structure — your posture, your
breathing patterns and your relationship to the physical world through touch. It takes a child seven
years to fully incarnate on the physical plane. Certain genes are switched on and other genes are
switched off during this period. Thus all the future patterns of your physical health are laid down in
your early years.
Living without knowledge or memory of the love of the higher planes means that you
can only take life too seriously.
Regardless of your physical circumstances during this period, your future life is fashioned out of
the frequency field of those around you and how they deal with life. The greatest gift an', '', ''),
  (47, 'within. This is the force of Transmutation and it wants you to surpass yourself. If you let go into your
fear of dying, that greatest fear, you will discover the Gift of Transmutation. Human beings are in fact
a rolling wave of consciousness with no fixed identity. We are programmed to continually hit the
shores of our limitations and dissolve into something else. For the majority of human beings, safe in
their illusion of separateness, this is the greatest terror of all.
Human beings are in fact a rolling wave of consciousness with no fixed identity. We
are programmed to continually hit the shores of our limitations and dissolve into
something else.
As one of the vital ingredients in a chemical genetic family known as the Ring of Alchemy, this
47th Gift of Transmutation is dangerous. The ancient alchemists discovered the archetypes of
transmutation and named them, often using the changing of colours as symbolic of the stages of the
process. Although many of these people mistakenly thought of alchemy as a physical practise whereby
a base metal might be transmuted into gold, a few understood precisely what alchemy really was.
Alchemy — the Royal Art — is the natural destiny of human beings who live their life totally,
embracing everything and holding nothing back. It is the art of living dangerously. This does not mean
that you necessarily take outer risks — the danger is to the illusion that there is anything fixed about
you. The true human is indefinable because he or she is constantly surpassing all definitions. Alchemy
is life. Transmutation is what drives human beings to keep going beyond their wildest dreams. To be
in the process of transmutation is to be truly alive.
The process of transmutation has actually been described very well by the alchemists. It consists
of an endless series of small and often indecipherable mutations leading to a finite number of
transmutations. These transmutations are huge turning points in your life. To transmute is to make a
quantum leap into a whole new dimension. If you follow the script hidden in your DNA, then you will
experience these dimensional shifts in your inner and outer life. Many cultures’ mythologies and
mystical systems have described this process of spiritual evolution because it is universal. The only
prerequisite for the process to keep moving is a continual surrender to your fears. The moment one
fear has been embraced, another reveals itself and your life moves you to confront the new fear. We
each have to take the lid off our Pandora’s box and in doing so, we will discover the layers of
oppression that lie within us. As these layers are dissolved one by one, you discard one by one the
illusions that you think are protecting you from dissolving yourself.
Through this ongoing process of Transmutation, you gradually sift through the junk DNA, and in
doing so, you begin to see your life on a much wider level of reality. The only way to read these
codes is to live them. As you do, they unwind and reveal their true purpose — to return you to the
very source of consciousness from which you came. Those with the 47th Gift in their hologenetic
profile are people who are deeply aware of this alchemical process in human beings. The only way to
transcend suffering is to move more deeply into it, embracing every feeling and event that comes to
you. This is the way of deep immersion in the currents of life. It is the way of surrender.
THE 47TH SIDDHI – TRANSFIGURATION
THE TRUE MEANING OF THE CRUCIFIXION
The 47th Siddhi represents the culmination of the 47th Gene Key in human form. Transmutation never
really ends. It simply outgrows its casing, and this is what occurs through the 47th Siddhi of
Transfiguration. This word transfiguration is almost entirely associated with Christ’s ascension and
resurrection. It refers to his shining countenance when he reappears after his crucifixion. The life of
Jesus Christ is in fact the perfect mythic enactment of all the stages of alchemical transm', '', ''),
  (48, 'SIDDHI WISDOM
GIFT RESOURCEFULNESS
SHADOW INADEQUACY
THE WONDER OF UNCERTAINTY
PROGRAMMING PARTNER: 21ST GENE KEY PHYSIOLOGY: LYMPHATIC SYSTEM
 (SPLEEN)
CODON RING: THE RING OF MATTER AMINO ACID: ALANINE
(18, 46, 48, 57)  
THE 48TH SHADOW – INADEQUACY
EQ AND IQ
There is no darker place represented anywhere within human DNA than the 48th Shadow. This
Shadow gives rise to one of the deepest of human fears — the fear that we are inherently inadequate.
Human beings as a rule have no idea of their true capabilities. We can look around and see individual
examples of great men and women who have displayed remarkable gifts and who have sometimes
achieved the miraculous. However, humanity as it is today has not waked from its dark dreams. We
stand at the cusp of one of the greatest turning points in our evolutionary history, and each of us will
have to look deeply into this primal fear if we are to make the great leap that now lies before us.
Only during times of great collective crisis is it possible to see the potential of the 48th Gene Key.
It seems the medium of crisis is required to bind human beings together. We see this uniting power
during times of war, which often activate the higher frequencies of this Gene Key and allow groups of
people to operate as a single entity, overcoming great odds and performing incredible feats rarely
seen in peacetime. This phenomenon says much about the nature of the 48th Gene Key, which at its
source is a power rooted in communion and service. Because humanity is now facing its greatest ever
crisis —namely the destruction of our own environment — the potential of this 48th Gene Key is
urging us to dig deep into our souls for collective and practical resolutions. In the years ahead, we are
going to have to understand this 48th Gene Key and the hold that its shadow frequency has over us.
Because of its role within the codon group known as the Ring of Matter, the 48th Gene Key is one
of four Gene Keys that govern our developmental cycles as children. The 48th Gene Key imprints us
throughout our second seven-year cycle from the age of seven to fourteen. This second cycle relates to
our emotional development and explains exactly where our feelings of inadequacy come from. As we
incarnate into our emotional or astral body, the prevalent emotional patterns of our parents and the
world at large are imperceptibly imprinted within our aura. The 48th Shadow seeps into our genes to
undermine us through a deep sense of emotional inadequacy. As we go through the tender time of
puberty, society’s conditioning sends us very confusing and contradictory messages about how to
handle our emotional and sexual nature. Most people have little idea how profound and delicate this
developmental stage is for young people, and for the most part they are left to deal with it on their
own. The result is that few emerge unscathed.
Until quite recently, emotions were generally seen as something that undermined intelligence,
which was understood as being equated only with rational thinking. Thankfully, emotional intelligence
— also known as EQ — is now increasingly recognised by more and more people. The fact is that
your EQ is a perfect counterbalance to your IQ, and together they make up a well-rounded intelligent
individual. Most people have never learned to take full responsibility for their emotions. They get
caught in the drama of projecting their emotional states onto others. The 48th Shadow is responsible
for creating these emotionally illiterate generations. If we don’t know how to handle emotional states
with equanimity, integrity and clarity, we never fully enter adulthood, but remain at some level
children.
If we don’t know how to handle emotional states with equanimity, integrity and
clarity, we never fully enter adulthood, but remain at some level children.
The frequency that the 48th Shadow releases into the cells of your body emerges as a profound
uncertainty about the future and your ability to handle it. When c', '', ''),
  (49, 'Not only will the coming shift bring about a social revolution, but it will also bring an end to one of
the great searches of modern man — the search for knowledge. Through the rupturing of the 4th
Shadow, understanding will take the place of knowledge and much of the thrust of our modern world
will die down. We will no longer need to logically make sense of the paradoxes of existence because
our new centre of awareness will give us a physical and energetic understanding of existence. Thus
the role of logic in our world will alter. It will no longer be used to defend our prejudices and fears
and it will no longer be used for purely personal benefit. Logic, at its highest frequency, is a means to
orchestrate the most efficient society possible. True efficiency is based upon a higher holistic
understanding of living systems. Once our understanding shows us how connected we all are to each
other, we will see for ourselves that selfishness is the most inefficient frequency of all.
The 4th Gift forms the launch pad for an even more refined frequency — the Siddhi of Forgiveness.
Forgiveness is born out of understanding, but it occurs when a being makes a leap beyond
understanding. Forgiveness is a stage further on from social revolution. Just because a person has
understanding and good intention, does not mean that they can orchestrate a perfect society. History
has shown that revolutions never change the world — they just change society, and usually only
briefly. The highest possibility of the 49th Gene Key is the Siddhi of Rebirth, and this is the Siddhi
that always awakens alongside Forgiveness. As we have seen, understanding leads to the urge to
serve the totality through instigating some kind of social reform. Forgiveness, however, is a pure
siddhic state and as such it has no sense of restlessness at all. All siddhic states are the end of the line
—they represent the absolute transcendence of our genetics and the end of being human.
Forgiveness is the thunderbolt that is released when a being attains Christ
consciousness.
Forgiveness is the thunderbolt that is released when a being attains Christ consciousness. It is like
a kind of cosmic warmth that melts the borders and boundaries within the world of form. Forgiveness
allows the Truth behind all form to be seen. Further than that, it allows one to see through and thus
become one with Truth. There exists a great mystery about the power of forgiveness concerning time.
Forgiveness represents an involving force rather than an evolving force because it literally comes
from the future towards the past. It is a Divine quality that descends, like Christ, into the world of
form. In descending into human form, forgiveness lays its hand upon all humanity and works its way
back through time, burrowing into our collective past, releasing and freeing energy that has lain
trapped and stagnant for aeons. Forgiveness moves down the ancestral bloodlines of all humanity in
this way, dissolving genetic blocks and lifting karmic curses wherever it travels. This is why the
Siddhi of Forgiveness is often credited with being capable of inducing miracles, because it can
release a karmic debt that has stagnated for generations. As such debts are released, those in whom
they live can move through incredible transmutations. These mysteries are explored in more depth in
the 22nd Gene Key through a transmission known as The Seven Seals.
The 4th Siddhi is a primary agent of Divine Grace, that is to say it does not adhere to human laws.
It concerns the resolution of old debts, at all levels. At a purely individual level, the whole process of
human incarnation is based around the notion of karmic debt. Until you have paid off all your debts,
particularly through your relationships, you cannot escape the game of incarnation and reincarnation.
Because it is also a part of the Ring of Union, the 4th Siddhi’s ultimate role is to bring humanity into a
collective union through the resolution of karmic debt, indiv', '', ''),
  (50, 'group mechanics and a gift for knowing people, but they still have to work with the destructive
interference patterns of the totality. However, as we shall see with the 44th Siddhi, all that is on the
cusp of changing.
THE 44TH SIDDHI – SYNARCHY
THE COMING OF THE QUEENDOM
The 44th Siddhi is truly remarkable. It concerns the complete understanding of the mechanics of
human destiny and the entire story of humanity. The programming partner of this Siddhi is the 24th
Siddhi of Silence, which is a key to understanding how this all works. As a concept, synarchy is the
opposite of anarchy. The prefix syn means to act in concert, and archy means to govern. Therefore the
literal meaning concerns the concept of collective rulership. Historically the notion of synarchy has
been greatly abused politically — communism claimed to be synarchic, as did Hitler’s fascist regime.
We begin to move a little closer to its true implications through its use within various occult schools
of thought. Synarchy was seen by various occult writers as representing a world led by a secret
society of masters. This 44th Gene Key together with the 50th Gene Key form the genetic Codon Ring
called the Ring of the Illuminati, and given that the 50th Siddhi activates the quality of higher harmony,
we can see how deeply woven into human mythology this archetype truly is.
The myth of secret societies has been much in and out of vogue in the last hundred years. With the
rise of the New Age movement it is currently much back in vogue, with numerous books postulating
the existence of the hidden illuminati who are said to meet in secret and manipulate world events.
Such conspiracy theories may have their roots in esoteric tradition which speaks of a hidden centre of
the world, variously known as Shambhala, Mt. Meru or Agartha, and from which a secret circle of
ascended masters or celestial beings govern the world from a higher plane. All such myths and stories
have their place but are essentially innocent distortions of the 44th Siddhi of Synarchy. True Synarchy
requires an understanding of human fractals in order to fully comprehend its vast vision.
Perhaps the best place to begin an exploration of the concept of Synarchy is the insect kingdom.
There are two groups of insects that are known for their synarchic systems of government — ants and
bees. Of these, bees are perhaps the better example. Many of the old esoteric traditions speak of a
great being — the King of the World, sometimes also known as Melchizedek or Sanat Kumara —
who sits at the centre of all creation and governs all life in our planetary system. This is akin to the
power of the queen bee in a synarchy of bees. In a hive, all bees serve the queen and their synarchy is
divided into different levels of workers and drones. Within the hive a single spirit appears to pervade
the whole society, and the queen symbolically and chemically maintains the focus and direction of
every single member. If the queen dies, the hive falls into chaos and also dies.
When the 44th Siddhi is present in a human being, then they see the entire tapestry of human
interaction through time and space. They not only see it, but they dissolve into it. The consciousness
within such a person is able to travel down every single fractal line within the cosmos. Because there
is no resistance within their vehicle, their consciousness ripples down the fractal arms of both the
past and the future of the universe. The secret to this is Silence. Such a being has to fall into complete
silence in order to hear the movement of every cell within the great hive of being. However, this 44th
Siddhi is about far more than just understanding the secrets of human destiny and the fractal patterns
of time. To awaken through the 44th Siddhi presupposes that you occupy what is known as a core
fractal.
If you were able to follow all human patterns back to their source at the Big Bang, you would
arrive at what are called the Three Source Codes. When the Big Ba', '', ''),
  (51, 'SIDDHI AWAKENING
GIFT INITIATIVE
SHADOW AGITATION
INITIATIVE TO INITIATION
PROGRAMMING PARTNER: 57TH GENE KEY PHYSIOLOGY: GALL BLADDER
CODON RING: THE RING OF HUMANITY AMINO ACID: ARGININE
(10,17, 21, 25, 38, 51)  
THE 51ST SHADOW – AGITATION
THE PORTAL OF FEARS
The 51st Gene Key and its spectrum of frequencies contain some startling secrets regarding human
behaviour as well as leading you towards the process or experience referred to as awakening. One of
the most recognisable human traits to emerge through our genetics is our innate human
competitiveness. Until you reach the highest level of frequency in the 51st Siddhi, human beings are
driven to compete with each other. Depending on how you channel this energy, it can either lead to
unity or it can lead to division. Together with its programming partner the 57th Shadow of Unease, this
51st Shadow of Agitation creates enormous disturbance and insecurity within human beings. Until you
can elevate your consciousness into and beyond the higher frequencies of the Gift level, you will
always feel this sense of agitation inside you at some level.
The reason that the 51st Shadow creates such a disturbance in the energy field of human beings is
quite simply because life is beyond our control. Unforeseen events will occur in your life from time
to time and these events can radically change your destiny. At the Shadow frequency the perceived
randomness of life creates a deep insecurity in human beings because of this underlying fear that
something bad could happen to you at any moment. This insecurity is compounded through direct
evidence as we witness it happening to the people around us. For example, in London during the Blitz
in the Second World War, bombs would drop at random throughout the night. Most streets in central
London were hit at some time or other and entire families were instantly killed whilst neighbouring
properties often remained relatively unharmed. In life, the question of which house gets hit plagues
all human beings. Because we see it happening to others, this generates the unconscious fear that it
might happen to us next.
Shocks are a part of all human life, but at the Shadow level where fear reigns, the possibility and
fear of shock continually unnerves us. The hallmark of all Shadow frequencies is a profound lack of
trust in life itself. And trusting in life is neither an intellectual nor even an emotional issue. It is in fact
purely physical. Trust is something that is either felt within the cells of your body or not. Without
trust, human beings stay in a state of agitation — we tend to be jumpy, nervous and stressed. We either
shy away from life out of fear or we rush at it out of rage or panic. Your frequency determines how
you view shocks, as well as how you handle them physically and emotionally when they do come. At
a higher frequency, shocks are like wormholes to a new and potentially higher dimension. Shock
directly challenges the very bedrock of your reality and your attachment to that reality. In this sense,
the true role of any shock is to chip away at your sense of separateness from life and release you from
the false security of the Shadow consciousness.
The hallmark of all Shadow frequencies is a profound lack of trust in life itself.
The 51st Shadow devotes all its energy into trying to stave off the inevitable. It lives in denial of
the ultimate shock — the fact of physical death, and in denying death it actually throttles life. Only one
who has fully embraced the certainty of death is truly alive. Without the perspective of death life
loses its true sense of value, which is precisely what desensitises human beings. Given that the 51st
Gene Key is also responsible for the human competitive spirit, we see humans fight only for
themselves and their own benefit without any sense of higher purpose. The competitiveness of the 51st
Shadow is about needing to be first, not in order to better yourself, but to feel superior to others. The
human competi', '', ''),
  (52, 'flourish. Every parent has to find the delicate balance between laying down healthy boundaries and
trusting in the life force as it moves through the child.
It is through restraint that human power can be harnessed in a creative way. The 52nd Gene Key is
a member of the codon family known as the Ring of Seeking. You will learn as you journey through
each of the six Gene Keys of this codon that they are all concerned with pressure. It is this internal
pressure that drives evolution. There is a vast amount of life force literally wanting to burst out of all
human beings from within this aspect of our DNA. If you scan across the names of the Gifts in this
Codon Ring, you will get an idea of the power stored inside you — Magnetism (15), Dynamism (39),
Restraint (52), Expansion (53), Aspiration (54) and Vitality (58). The 52nd Gift of Restraint stands
out among these as the only one keeping all this pressure in check. It is of huge importance in
regulating your life and in maintaining a degree of internal rhythm and structure. It is this Gene Key
that actually generates the torque that allows all systems to gyrate and evolve.
THE 52ND SIDDHI – STILLNESS
THE STILLING OF THE WAVE
An interesting phenomenon occurs at the highest level of frequency that may help us understand why
the siddhic state transcends frequency altogether. If you consider what frequency really is — the
oscillation of energy waves at different speeds and intervals — you will find that there is a paradox
when you take frequency to either of its extremes. Energy waves oscillating at lower and lower
frequencies would eventually stop altogether and you would experience nothingness. At the other end
of the spectrum, energy waves vibrating at higher and higher frequencies eventually become so close
together that they merge to create another kind of nothingness. This nothingness represents the siddhic
state. Obviously there are many words used to describe this state: Bliss or Universal Love or — in
the case of the 52nd Siddhi — Stillness.
The Siddhi of Stillness can greatly help us to understand this concept of transcending frequency.
Paradoxically, both ends of the spectrum lead to the same state. At both extremes of the spectrum, we
experience stillness. Many spiritual systems or great teachers have referred to the ultimate
enlightened state as nothingness or void. The Buddha was particularly fond of this terminology. In
fact this 52nd Siddhi has a real taste of the Buddha about it. The ancient Chinese named the 52nd
Hexagram of the I Ching Keeping Still Mountain and one is reminded here of the image of Buddha
sitting in absolute stillness beneath his bodhi tree, waiting for all phenomena to dissolve and the true
reality of enlightenment to shine through.
When a being attains realisation through the 52nd Siddhi, some intriguing things occur. Since all
frequency and energy patterns are experienced as stopping, you find yourself sitting at the heart of all
creation. All phenomena are experienced as wheeling around you as you become the still-point of
existence itself. The incredible sheath of fear and stress created by the world aura can no longer touch
you since you occupy a space outside of all vibration. This is why mystics use terms such as the
spaceless space to describe this state. Along with the stillness comes the experience of the 58th
Siddhi of Bliss, the programming partner of the 52nd Siddhi.
These two great Siddhis, the 52nd and 58th, mirror one of the great universal concepts of geometry
and physics — the torus. The torus is a multidimensional geometric figure that lies at the heart of all
space-time. The torus demonstrates the universal laws of energy dynamics based on torque and', '', ''),
  (53, 'the imbalance and restores equilibrium. Man, too, is a part of nature and is subject to these same
laws, although we behave as if we are outside of them.
As one of six internal pressures forming the Codon Ring of Seeking, the 53rd Gene Key is
responsible for creating a great deal of stress at the Shadow frequency. The stress it causes in our
modern world is directly reflected in the desire to become materially rich. Great individual wealth is
unsustainable unless you have a higher purpose that requires it. Keep in mind that there is a vast
difference between prosperity and wealth. Wealth is a stockpiling of money based upon fear and
greed, whereas prosperity is a flow that expands and contracts with universal rhythms. Prosperity
adjusts itself automatically to the needs of your higher purpose. Wealth is in no way equivalent to
fulfilment. In fact, it most commonly leads to the opposite. The essence of the Ring of Seeking is to
lead you out of your immaturity by showing you the true nature of your desire, greed and fear. Thus
we learn in time that the fulfilment we seek is within us rather than outside.
The Shadow of Immaturity is rooted in the human tendency to see ourselves as separate from
nature. The human mind has enormous difficulty seeing itself as a collective organism that is deeply
embedded in nature and the earth. If one of us commits a selfish act or an act rooted in fear, it
reinforces that act throughout the totality, which in turn strengthens its vibration in the world. This is
what immaturity is — an aspect of the whole that does not yet realise that it is the whole. However,
human beings have always sensed the inherent balancing force woven into creation. It is reflected for
instance in the Buddhist and Hindu doctrine of karma — the law that every cause results in an effect
that directly influences our own future. A common oversight here is that it is not only we as
individuals who affect our future, but we as a collective.
In order for human beings to evolve, we have to pass through the phase of our development in
which we learn that we are a single unified organism by witnessing the damage we inflict on that
organism. We are like a child who pushes the mother until the mother disciplines the child. We must
drop our primal fear of death above all else. Even our spiritual yearning to mentally project ourselves
beyond this lifetime in the form of a reincarnating soul or a separate spiritual being is subtly rooted in
our fear of dissolving back into pure consciousness. It is the fractal pattern of evolution that moves
onwards — not our attachment to it. Death cleanly severs our attachment to our individuality, and yet
for millennia humanity has been too afraid to really see this. We do indeed sense the continuity of life,
but we also insist on projecting our individuality into it. We have created a great cult based on the
individual, even though the individual is itself an illusion.
We have created a great cult based on the individual, even though the individual is
itself an illusion.
Why is it that we human beings cannot accept our mortality? The answer is simple — life would
appear too frightening. Life has no morals. Life has no concept of individual justice. At the level of
the absolute there is no individual soul that survives death, even though the existence of a
reincarnating higher causal body has relative truth to it within the framework of the maya (see the 22nd
Gene Key). Any mystical experience we have that falls short of an immersion in pure consciousness
is a subtle projection of our individual need to go on existing. The fact is that the 53rd Shadow of
Immaturity builds all these illusions into our minds. Life is simple and pure and doesn’t require our
projections. There is only the continuity of consciousness following its bloodlines, its fractal lines
and its collective evolutionary mythology. These truths are often shocking to the mind and its complex
system of beliefs and projections based on f', '', ''),
  (54, 'SIDDHI ASCENSION
GIFT ASPIRATION
SHADOW GREED
THE SERPENT PATH
PROGRAMMING PARTNER: 53RD GENE KEY PHYSIOLOGY: TAILBONE
CODON RING: THE RING OF SEEKING AMINO ACID: SERINE
(15, 39, 52, 53, 54, 58)  
THE 54TH SHADOW – GREED
FOR LOVE AND MONEY
The 54th Shadow is one of the great pressures that drive humanity. It is the drive to want more and at
its shadow frequency this Gene Key becomes blind greed. It’s important to remember at this point that
none of these shadow frequencies are really negative. There is nothing wrong or bad with greed. It is
simply an aspect of human nature and as such it has an evolutionary purpose. The purpose of greed is
to pressure human tribal groupings and individuals to be materially successful. If you look at any
modern first world country, you can see how far greed has advanced our civilisation. The primal
energy behind the 54th Shadow was essential for the survival of early human tribal cultures, and
indeed we can still see it operating in the developing world, where survival is often based directly
upon where you are within the material hierarchy. Obviously you can also see how greed has a
tendency to focus on a single individual, community or race to the detriment of all others. This means
that at a certain evolutionary point, greed will have served its purpose and will need to be
transcended. This is precisely what happens at the Gift level of frequency — when greed becomes
aspiration. Greed in this sense refers to the desire to accumulate more material, whereas aspiration
refers to the desire to attain something of a more spiritual nature.
If greed is pursued to its furthest limits without transcendence, it becomes self-destructive. We see
this happening in the modern world today. When greed reaches its zenith it either becomes
destructive, both to individuals and to the planet, or it gives individuals a new perspective. When
people have acquired genuine wealth and stability, they often turn to more spiritual arenas for
sustenance. This is how these two genetic programming partners - the 54th Gene Key and the 53rd
Gene Key - operate together. If a society doesn’t mature it becomes top-heavy, like the huge
multinational business organisations we see in the world today. When organisations balloon like this,
they inevitably take on a life of their own, draining resources from the planet. Natural law
demonstrates that an organisation dedicated simply to material accumulation will eventually crumble
under its own weight, but, unfortunately, not before it has caused enormous destruction.
Running in tandem with the 54th Shadow, the 53rd Shadow of Immaturity ensures that any
organisation, group or individual will remain stuck at a self-serving frequency. The 53rd Shadow
blocks energy from making a quantum leap from an old cycle into a new cycle at a higher level of
frequency. It is called immaturity because it simply never learns. Both these Shadows are deeply
involved with money and the creation of wealth. The 54th Shadow has the added genetic imperative
of operating through a hierarchical pattern, which means that it associates wealth with being at the top
of the hierarchy. As such, the 54th Shadow courts recognition from those higher up in the hierarchy. In
today’s society this becomes the need for external symbols of status — a shiny new car or a huge
house or the latest of anything and everything. One of the hallmarks of this Shadow is that it isn’t just
about being successful; it’s also about looking successful.
The essence of the 54th Shadow’s success at material accumulation lies in its ability to create
relationships that further its own material resources. In the modern world, this is about business. In
business, success often arrives through the development of fruitful relationships — these can be
within the business itself, with other agencies such as the media or with clients. Word of mouth still
remains one of the most powerful tools for ensuring the successful transformation of a business, ', '', ''),
  (55, 'individual in the world of form. As one of the primary pillars of our DNA, the life of one who lives
within this Siddhi is of great relevance to our evolutionary history. These beings exert an enormous
magnetic influence on our entire planet. Although it may sound like science fiction, the expression of
the 2nd Siddhi in a human being actually changes the direction of the earth as it moves through space.
The 2nd Siddhi can only therefore be born in the world of humanity if our whole species makes a leap
in consciousness. In order for such a leap to be made, we have to wait for a certain set of geometric
coordinates to line up in the cosmos. These are the alignments that astrologers are always seeking to
find and understand in the heavens.
The 2nd Siddhi is mythically represented by the star of Bethlehem in the Christ myth. Other cultures
also have stories of great beings connected to the appearance or alignment of stars and comets in the
heavens. This Siddhi therefore tells us something about our ultimate state of consciousness; it is
linked not only to when we are but also to where we are. The earth itself is on a trajectory through the
galaxy, and at certain points in our time frame it moves into alignment with other geometric aspects of
the cosmos. The ancient Mayans for example, believed that in the year 2012 the earth would be in
direct alignment with the hub of our galaxy, which for them signified the birth of an age of heightened
consciousness. At such junctures in time and space, the 2nd Siddhi may well incarnate again on our
planet, and in the case of 2012, it is most likely to do so through a whole generation rather than
through a single individual.
According to the planetary genetic time clock that is derived from the I Ching, we will experience
another great axis point in the year 2027 as the precession of the equinoxes transits into the 55th Gene
Key, opening up the potential for a genetic shift in humanity. Both dates — 2012 and 2027 — are
hugely significant within the time frame of the publication of this book, but many axis points will
follow in the near and far future. The 2nd Siddhi is the original nature of consciousness itself, and it
manifests as a highly beautiful plan unfolding in time and space, swept along by the currents of
evolution. All such mythic journeys echo the journey of the earth and of our universe, and as they all
begin by leaving the warm comfort of the mother and the home, so they must one day return again to
that same embrace. This indeed is our final destiny as a species — to realise our state of oneness and
unity with all that is.
SIDDHI INNOCENCE
GIFT INNOVATION
SHADOW CHAOS
THROUGH THE EYES OF A CHILD
PROGRAMMING PARTNER: 50TH GENE KEY PHYSIOLOGY: NAVEL
CODON RING: THE RING OF LIFE AND DEATH AMINO ACID: LEUCINE
(3, 20, 23, 24, 27, 42)  
THE 3RD SHADOW – CHAOS
FROM CHAOS TO COSMOS
The 3rd Shadow lies at the core of all our beliefs that the human individual is basically powerless in
comparison to nature or the infinite. This is the programming domain of both religion and science, the
two cornerstones of human belief. On the one hand we have religion, which separates humanity from
nature by the interposition of a God or gods, thereby creating a division in our entire unconscious
reality. This reality must then be based upon the worship of either our own or someone else’s
projection of what God is. Such a situation in turn creates the notion of free will and its judgment by
the presiding deity. On the other hand we have science, which sees our nature as predetermined by
our genes, which come pre-programmed only for survival, thus leaving all human beings victims of
the vagaries of chance. In either scenario the individual comes off badly — we are either shown
divinity only to be denied it, or we are shown freedom and then placed in a world of merciless
competition in which only the lucky or strong can thrive.
Perhaps more than any other, the 3rd Shadow captures the essence of the role of', '', ''),
  (56, 'VICTIMISATION, FREEDOM, FREEDOM
THE 56TH GENE KEY: DIVINE INDULGENCE
DISTRACTION, ENRICHMENT, INTOXICATION
THE 57TH GENE KEY: A GENTLE WIND
UNEASE, INTUITION, CLARITY
THE 58TH GENE KEY: FROM STRESS TO BLISS
DISSATISFACTION, VITALITY, BLISS
THE 59TH GENE KEY: THE DRAGON IN YOUR GENOME
DISHONESTY, INTIMACY, TRANSPARENCY
THE 60TH GENE KEY: THE CRACKING OF THE VESSEL
LIMITATION, REALISM, JUSTICE
THE 61ST GENE KEY: THE HOLY OF HOLIES
PSYCHOSIS, INSPIRATION, SANCTITY
THE 62ND GENE KEY: THE LANGUAGE OF LIGHT
INTELLECT, PRECISION, IMPECCABILITY
THE 63RD GENE KEY: REACHING THE SOURCE
DOUBT, INQUIRY, TRUTH
THE 64TH GENE KEY: THE AURORA
CONFUSION, IMAGINATION, ILLUMINATION
GLOSSARY OF PERSONAL EMPOWERMENT
BIBLIOGRAPHY
THE 64 GENE KEYS SPECTRUM OF CONSCIOUSNESS
SIDDHI BEAUTY
GIFT FRESHNESS
SHADOW ENTROPY
FROM ENTROPY TO SYNTROPY
PROGRAMMING PARTNER: 2ND GENE KEY PHYSIOLOGY: LIVER
CODON RING: THE RING OF FIRE AMINO ACID: LYSINE
(1, 14)  
THE 1ST SHADOW – ENTROPY
THE DANCE OF SHIVA
Once upon a time, perhaps even an aeon ago, in a land now become a myth, a young man sat in
deep reverie beside a great river. Although this river no longer exists today, legend tells us that its
descendant may well be the great Yangtze River which flows through the heart of the land now
known as China. Our young man gazed out upon the sinuous, soft waves as they lapped the shores
by his feet, when all of a sudden a small turtle emerged from the great green mother lode, and
drawing itself proudly out of the water, sat down beside him to share his gentle contemplation.
For some considerable time neither party spoke, until finally our young man, evidently on the
cusp of some great universal epiphany, exclaimed to the little turtle in a great and wondrous sigh:
“Ahh little one, what’s it all about then…?”
Rather to his surprise, the turtle revolved in a half circle and nonchalantly turned its back on
the young man, whilst continuing to sun itself lazily and silently.
The young man gazed intently at the little creature’s back and the intricate interlocking
patterns and plates of its shell drying in the spring sunshine. As he gazed, a strange thing began to
occur to him — the more he looked, the more he understood the nature of his question. And so it
was that he gave himself up to the moment and gazed with all his heart at the little turtle’s back.
Slowly, almost imperceptibly, everything began to evanesce and disappear — first the turtle, then
the cosmos, and finally the young man himself. It is said that when the young man regained
consciousness several hours later the turtle was gone.
Ever since that day humanity has had a means of understanding every aspect within the
universe. It was discovered in the interlacing patterns on a humble turtle’s back — and in time it
became arguably the most profound knowledge ever discovered by a human being. It became The I
Ching.
The Chinese I Ching is one of the greatest spiritual books of all time. Written down thousands of years
blame people in the world around you, you set up a victim frequency pattern that reinforces itself over
and over in your life. If, on the other hand, you are able to accept everything that happens to you
regardless of whether you enjoy it or not, you set up a surrender frequency pattern that allows you to
move through life with great fluidity and beauty, and your life reflects it.
The other less common form of distraction is inner distraction. Inner distraction is when you are so
inwardly focussed that you forget the outer world — you live in a fantasy world of your own making
with no real anchor in the material world. In this sense you look through a lens whereby everything
meets the criteria of your fantasy. You see what you want to see, but you do not see the truth. This is
where we can see the power of the 56th Gene Key’s programming partner, the 60th Shadow of
Limitation. The 60th Gene Key is about the importance of structure and form, and for some people this
can seem a distraction from their fa', '', ''),
  (57, 'SIDDHI CLARITY
GIFT INTUITION
SHADOW UNEASE
A GENTLE WIND
PROGRAMMING PARTNER: 51ST GENE KEY PHYSIOLOGY: CRANIAL GANGLIA
 (BELLY)
CODON RING: THE RING OF MATTER AMINO ACID: ALANINE
(18, 46, 48, 57)  
THE 57TH SHADOW – UNEASE
THE FEAR-BAND FREQUENCIES
From the point of view of the 57th Gene Key, absolutely everything in life is acoustic. Even light can
be reduced down to a sonic signature. Even so, the sound spectrum that we human beings can access
is actually very narrow. The most sensitive mammals can hear sounds well beyond our abilities; we
know for example that dogs can hear high-pitched sounds and creatures such as whales and elephants
can hear sound frequencies far below our own spectrum. Other creatures such as insects interpret
sound through their entire bodies or legs as pure vibration, which is of course exactly what it is. This
entire work on the 64 Gene Keys is a human attempt to paint a picture of the universe of different
frequencies that we inhabit and that move through us and around us. At the highest level, as we shall
see, we humans are quite simply made up of layers of flickering and alternating sound waves.
The 64 Shadows are all states of consciousness governed by fear. To understand more precisely
what we mean when we use the word fear, it may help to reduce it to a certain range of frequencies. If
fear-based states fall into a particular waveband then we can see how easy it might be to adjust our
own frequency and raise ourselves above this fear-band. This does indeed sound easy. However,
there is one thing we have to remember above all else. Humanity collectively vibrates within the
fear-band frequencies. Therefore, as human beings, we are each under enormous pressure to resonate
within these same frequencies. Every human being is like an acoustic tuning fork. If we are placed
next to a powerful audio output source, before long we will automatically begin to vibrate at the same
wavelength as that output. On planet earth, this process is ensured through our childhood conditioning.
The standard human output source, which is based on fear, is known as the 57th Shadow of Unease.
The ancient symbol for this 57th hexagram in the I Ching is the wind. As a symbol, wind has many
dimensions. It is also a symbol for the pervasiveness of spirit because it moves invisibly around the
world, touching everyone. When seen from the Shadow consciousness, wind can be brutal and even
terrifying, uprooting and destroying wherever it goes. When the wind is up, it often conveys a sense of
unease. This 57th Shadow represents a very deep and ancient fear — the fear of what might be
coming, of not knowing what is in the wind. Human beings are genetically programmed to fear the
future — it is wired into our DNA through this 57th Shadow. In our early prehistory, human beings
functioned almost entirely through their individual attunement to frequency. If their intuition picked up
something dangerous in the wind, their instincts immediately caused their bodies to move accordingly,
whether that meant running or hiding or grabbing a weapon.
Today, modern man has developed in a different direction. We are now far more polarised in our
brains than our bodies and most people make decisions through reason rather than intuition. This
development has changed the 57th Shadow of Unease. Unease no longer functions as an early warning
system restricting fear only to the moment when it is needed for survival. Now unease is translated by
our minds. It is continuous and manifests as anxiety. Furthermore, because of this, it is enhanced
through the universal morphogenetic field that connects all human beings as one. The mind has
become stronger than instinct, and seeks to end unease through the creation of external security. And
so the rat race of modern culture is born. The more mind-centred humanity becomes the more security
it tries to create for itself and in turn the more paranoid it becomes. Security and protection have
become a global obsessi', '', ''),
  (58, 'SIDDHI BLISS
GIFT VITALITY
SHADOW DISSATISFACTION
FROM STRESS TO BLISS
PROGRAMMING PARTNER: 52ND GENE KEY PHYSIOLOGY: PERINEUM
CODON RING: THE RING OF SEEKING AMINO ACID: SERINE
(15, 39, 52, 53, 54, 58)  
THE 58TH SHADOW – DISSATISFACTION
DIVINE DISSATISFACTION
In the original Chinese I Ching, the inspiration for these 64 Gene Keys, each symbol or hexagram is
represented by the combining of eight different types of natural phenomena such as thunder, wind,
earth, fire and so on. The 58th Gift is symbolised by the single repeated figure of a lake. A lake is a
beautiful and simple symbol on which to meditate because it immediately captures the very essence of
calmness. Lakes signify emotional calm as well as mental stillness. Moreover, when you study the
58th Gene Key’s programming partner, the 52nd Gene Key, you will discover that its highest and most
natural manifestation is stillness. These themes of joy and stillness are therefore intimately and
genetically linked. In contrast, the 58th Shadow — Dissatisfaction — is very unspecific. It is a lack of
fulfilment rooted in the programming partner of this 58th Shadow, the 52nd Shadow of Stress. It
doesn’t refer directly to a particular emotional state such as sadness, boredom or frustration, or to a
mental state such as anxiety or worry. It simply implies a lack of joy and a deep sense of restlessness
or unease.
Whenever the 52nd Shadow of Stress breaks the surface of the still inner lake inside you, your
natural state of being is lost. The question contained within this 58th Shadow then is: how does this
happen? How and why do human beings so easily lose touch with their natural state? The answer lies
in a single concept — the future. As you peruse and contemplate these 64 Gene Keys you will see that
there are entire Gene Keys— for example the 10th and the 20th — which are dedicated to the
experience known as living in the now. This simple expression is the core principle of almost all
great mystical and spiritual systems and paths. So how on earth do you live in the present moment?
One way to bring greater awareness to this conundrum is to understand why, how and when you leave
the present moment in your own life. In this respect, the 58th Shadow and its Gift can lend you
considerable insight.
Most people drawn to reading this work will already know that the main culprit within human
beings is the mind. If you are at all interested in spirituality or self-improvement you probably have
heard this over and over again — the mind is the problem. Out of this truth countless systems have
been born — meditations, practises, affirmations and modalities — all with the single purpose of
helping you transcend the mind and find inner fulfilment. Although it is indeed true that the mind is the
root of the problem, there is great danger in directly confronting the mind because it is such a slippery
mechanism. The problem with the mind is that it hankers after self-improvement, the very core of the
58th Shadow. It wants more than anything to give you the feeling that you can do something to bring
about the state of joy. Unfortunately, in this respect, anything you do — any technique, any system, any
strategy — can only bring about continued dissatisfaction!
The 58th Shadow stirs up a great genetic pressure within human beings, the pressure to improve
something or to be of service in some way. Dissatisfaction is an energy frequency aimed entirely at
the future. When not agitated, this Gene Key manifests its natural state — that of vitality and joy. This
is what is so hugely ironic about the 58th Shadow. It provokes you to seek happiness in the outside
world only to bring you to the conclusion that you cannot produce the state of joy because it already
exists inside you. The 58th Shadow creates the illusion of the future. The real joke is that in being
driven outwards in our quest for fulfilment, we human beings actually improve the world and help it
to gradually become more synthesised. In othe', '', ''),
  (59, 'As your frequency becomes clearer and more refined, your decision-making process naturally
becomes cleaner and quicker as well. The 29th Gift is not subject to the pressures of conditioning and
expectation from others, but opens into a deep connection to the direction of the life force within. This
Gift inherently attunes to the cyclic flow of life. People with the 29th Gift have the knack of getting out
of the way of life, and through this Gift they can watch their lives unwinding in powerful and mythical
ways. Without the 29th Gift and its ability to make crystal clear commitments, life becomes choked
and confused, and nowhere is this truer than at the emotional and sexual level.
Commitment is akin to trust, which can neither be forced nor willed. It flows like a great river
from deep within your being and out into your actions. With commitment you have no need to think
about the future or the goal because the commitment contains the seed of the goal within it. Only time
will show where the river of each cycle of experience will lead. Thus for the 29th Gift the goal is not
what is important. What really matters is the commitment to keep following the journey until its end.
Life is latticed with cycles within cycles — some journeys last five minutes and some last a lifetime.
The ultimate journey is your entire life, and the shape of your life is formed by the millions of tiny
decisions that are made over the course of your life. To live your entire life with this profound level
of commitment means to make every decision with the same commitment — from the way you have
sex to the way you wash the dishes!
As an integral part of a chemical family known as the Ring of Union, the 29th Gift shares a common
theme with the 4th, 7th and 59th Gene Keys. This Codon Ring is currently undergoing a great deal of
spontaneous mutation in our DNA and is directly responsible for a huge shift in the way in which we
humans relate, particularly through our sexuality and gender. Much of the impetus for these genetic
changes is coming through the 59th Gene Key and its programming partner the 55th Gene Key. The
very role of human sexuality is about to change, which means that at present the world is deeply
confused about the value of its morality and its age-old institutions such as marriage. Through the 29th
Gift we can experience a new definition of the word commitment, which has less to do with social
expectations and everything to do with saying yews to life. The only real commitment is commitment
to your own inner guidance in the now (the 7th Gift). Finding this guidance is dependent on your
surrendering to the life force within you, which involves utter trust in life’s natural cycles of
commitment. It is this trust that is moving into the world today, and as it comes it is smashing apart all
our false moralities.
True commitment is an energetic dynamic felt within your whole being rather than a social
requirement. Many people view commitment through morality. You see this particularly in human
relationships, where commitment is generally enforced by social pressure. If, for example, a
relationship breaks up or a marriage ends in divorce, it is still often thought of as a failure. True
commitment is not moralistic. It lasts as long as it lasts. When the cycle is over, it is over, and both
parties will feel this at the same time. Anyone who begins a relationship alliance out of true
commitment knows this truth. Relationships that begin with this kind of clean commitment generally
end in a clean way, without all the usual emotional turbulence that goes with breaking up. Some
relationship commitment cycles really do last for one night, and others forever. The length of the cycle
has nothing to do with success or failure. At the frequency level of the 29th Gift, all relationships form
a part of the evolving storyline of your life, and thus they are appreciated for adding richness and
depth to life rather than being seen in terms of failure or succe', '', ''),
  (60, 'The only thing needed for magic to occur is some form of a structure and an open
mind!
One of the subtlest of structures is language itself. People with the 60th Gift can therefore be
masters of language, as long as they do not become trapped by it. Language is not the territory, but is
the means by which change can be expressed. You can talk about change forever and become
obsessed with the ideas and thoughts themselves. But in order for something really new to enter the
world, language has to be used in a playful manner, as a means of expressing a frequency. It is the
frequency that holds the energy of change. Language is simply the means of resonating the music. We
all know that in popular magic, the magician distracts us and then performs his trick when we are
looking the other way. In the same way, the 60th Gift can use language or indeed any form as a means
to distract people while the real energy passes into them unnoticed.
This 60th Gift has much to do with music, being acoustic in nature. All new forms that enter the
world have to pass through this Gene Key. Human chemistry is musical at the deepest level, and
humans experience this through their individual moods and energy swings. The 60th Gift requires
deep acceptance of the uncertainty and unpredictability of the rhythms of life. These people
understand that natural periods occur when nothing seems to be moving. Such periods can come on
suddenly and go just as suddenly. They give rise both to our mood swings and to our bursts of sudden
manifestation. The 60th Gift knows that there is magic in the darkness before manifestation and knows
not to interfere with these essential life processes. To be realistic means to accept the natural
limitations of being in form without being a victim of them.
The 60th Gene Key is a part of a trinity of Gene Keys (along with the 19th and 61st) that code for
the amino acid isoleucine. This is the Ring of Gaia, one of the most fascinating of all the 21 codon
rings. The Ring of Gaia prevents or allows awareness to move between all the different life forms on
our planet. The 19th Gene Key with its Gift of Sensitivity has the potential to open up a higher genetic
functioning in human beings that will allow us to directly experience what it is like to live inside
another creature. At the height of its sensitivity, this codon allows all earth life, both sentient and
inanimate, to experience its quantum unity. The 60th and 61st Gene Keys and their Gifts of Realism
and Inspiration hold deep secrets concerning this planet and our role within its organic structure. The
60th Gene Key represents the pure material density of the form of Gaia herself, whereas the 61st Gene
Key points to the magic deeply embedded within the heart of the earth. The original name for the 61st
hexagram in the I Ching is Inner Truth, and this is the beauty of the Ring of Gaia — everything, from
the tiniest nano-particle to the cosmos itself, has the same shining jewel of inner truth at its core.
It is the responsibility and great privilege of humanity to be the outermost peak of the awareness of
Gaia. We are her eyes and ears. We are her very mind. Everything of true value is hidden inside form
— inside your body, inside the ferrous core of the planet, inside the vibrating fabric of your inner
being. It is all rooted inwardly. This is why humankind must discover inner space, why we must turn
inward for inspiration. All the answers to all our problems and challenges are hidden in the creatures
and structures of nature, and all of those structures and creatures are embedded in microcosmic form
inside every molecule of our DNA. Common sense is not in opposition to magic. It is common sense
to remain open-minded to everything in the universe, because everything has at its core the same
wondrous inner light.
THE 60TH SIDDHI – JUSTICE
THE EARTHSHIP MERKABA
The 60th Siddhi is an extremely rare Siddhi. There are some things in life that are quite simply a
mystery, and this 60th', '', ''),
  (61, 'The contemporary mutation moving through this 19th Gene Key is having an unprecedented effect
on all life on our planet. As a vital aspect of the Codon Ring of Gaia, along with the 60th and the 61st
Gene Keys, it is breaking down the very patterns of the world psyche. The reactive Rigidity of the
60th Shadow and the Psychosis of the 61st Shadow have long held sway on our planet. A great
reaction is occurring within the chemistry of our DNA as the old ways appear to tighten their grip on
the only reality they have known. There is enormous fear being generated through the Shadows of this
Codon Ring and enormous potential violence as our co-dependence is broken. However, the truth is
that all life is and always has been interdependent because all life is one. Even independence is an
illusion, and this realisation is bringing an end to the world psychosis that operates out of the 19th
Shadow’s low frequency survival-based reality. It is through this Ring of Gaia that we must and will
eventually see and will live once again in union with all beings that share this planet earth.
REPRESSIVE NATURE – NEEDY
The repressive nature of the 19th Shadow emerges as neediness or clinging. These are people who
cannot let go of the past out of a fear of being alone. This creates catastrophic relationship dynamics
based on making other people victims of their need. Repressive natures can be very cunning with the
way they transmit their Shadow patterns — these people will very likely use subtle tools such as guilt
to get their own needs met. They need to feel needed, and they will act out all kinds of dramas, often
totally unconsciously, to get the attention they crave. They are masters of negative attention —
drawing other people’s energy towards them without caring what expression it takes. Even violence
is a form of attention. The only way to break out of such patterns is to move into independence.
REACTIVE NATURE – ISOLATED
The angry expression of this Gene Key is isolationist. These people refuse any attention, loudly
proclaiming that they don’t need anyone. Such a nature only pretends to be independent while beneath
the surface they seethe with rage. Of course, people that isolate themselves like this always take great
care to do it right before everyone else’s eyes. They make a point of showing you how alone they are,
craving the attention it brings them and becoming even more embittered when others leave them
alone. Ironically, when others do try and support them or offer them friendship, they usually explode,
projecting all their pent up anger onto the other person. It is easy to see how the repressive and the
reactive nature together create the perfect dynamic of the typical dysfunctional co-dependent
relationship.
THE 19TH GIFT – SENSITIVITY
THE WHISPERERS
The Gift of Sensitivity is about being highly attuned to the needs of others. In order to be able to sense
others and their needs, you must first become independent from them, which is what this 19th Gift is
about. The moment you reach the frequency of independence your natural energy becomes apparent.
This 19th Gift is also a gift of touch. It does not have to be literal touch, although it can be — many of
these people are gifted healers or therapists. It is more than just a physical sense of touch, but a touch
One of the greatest areas you can see the true power of the 60th Shadow is in religion. The moral
laws imposed on our society through our religious systems are some of the oldest on the planet.
Cosmic moral laws exist without the need for systems or structures to implement them. The more we
humans enforce laws, the more reaction there is, and consequently the more we have to police them.
This is the classic feedback loop of the 60th Shadow. It is a self-perpetuating nightmare of control and
reaction. The 60th Shadow will insist for example that every word of the Koran or the Bible is to be
taken literally. Strict adherence to these kinds of ancient codes or laws is deeply limi', '', ''),
  (62, 'THE 62ND GIFT – PRECISION
THE GREATEST STEP
The 62nd Gift, the Gift of Precision, is far beyond the realm of the intellect, which as we have seen is
based on mere knowledge. As you start to awaken through the higher frequencies of this Gene Key,
you either begin to question the world around you (the repressive nature) or you stop questioning
everything (the reactive nature). Awakening is magical in its ability to bring about a natural balance
within your being. In other words, if you are caught in the obsessive behaviour patterns of the
repressed 62nd Shadow, your mental abilities suddenly begin to come alive again, as though someone
had cleaned the windows of your perception. You begin to question your own obsessive behaviour,
which ultimately brings about a complete transformation in your attitude and usually in your lifestyle
as well.
In the case of the reactive 62nd Shadow, your awakening will take you through a natural humbling
process in which you realise that you are causing your own misery by focussing in minute and
irrelevant detail on anything and everything but your own pain. When you begin to look into your own
nature and take full responsibility for your behaviour, you will go through a wonderful softening
process as your natural feminine side comes once again to the fore.
In both cases, we are seeing the Gift of Precision being reborn. Precision happens when natural
intelligence strikes a balance between the heart and the mind, but with one caveat — that the heart, the
feminine principle, is given control over life. The masculine principle, the intellect, then moves into
service of the feminine principle, which is about intuition, listening and receiving rather than thinking,
expressing and transmitting.
As the Gift of Precision grows stronger, it may seem as though the world gradually begins to come
alive again. Intelligence recognises intelligence, and with the mind out of the way the invisible
essence that connects all beings is once again felt. For example, when you look at a tree through the
62nd Shadow, you register only the facts that you have learned about the tree. You register its name,
type and any other words connected to it — branches, twigs, leaves, and so on — but you never see
the actual tree. The tree is intelligent, and to really know the tree, you have to use your own
intelligence. This means that you don’t simply look through your eyes and mind. You take the tree into
your being — you feel its aliveness, its mysterious aura, you actually breathe it into yourself.
Precision is what happens when intelligence is born. It’s not simply about being precise and exact at
an intellectual level, it’s a completely new way of seeing life.
Precision is inspirational and original (the 61st Gift is Inspiration), and such inspiration does not
depend on your vocabulary. When the Gift of Precision describes something, it arranges facts in ways
that are inspirational and exciting rather than dull and dry. As this Gift arises in a person, they begin
to communicate with such economy and exactness that almost everything they say is beautiful,
poignant and seamless. Such people soon develop keen gifts as communicators, speakers, writers,
artists, actors or scientists. This Gift is designed to find the limelight. When the heart leads the way
and uses logic to describe what it sees and feels, others cannot help but listen.
The 62nd Gene Key is genetically coupled with the 31st Gene Key forming the codon known as the
Ring of No Return. This mystical name describes the evolutionary process that takes place when
higher consciousness reaches the throat centre in human beings. The throat centre is where the greatest
human initiation occurs. Once the higher involutionary currents begin to use your voice to transmit
their truths, you begin a process of detaching from your own identity. The 62nd Gene Key allows
access to the universal language of light behind all forms. When the pitch of your frequency allows it,
the words yo', '', ''),
  (63, 'outward, it creates the impressive systems of dogma seen all across the world. This Shadow has great
appeal to the male population in particular since the male brain naturally favours the rational
approach. These people use logic as a means to enforce their opinions and views in the world,
thereby making others essentially wrong. The majority of the world is made up of those who create
the opinion bases — sciences, systems and hierarchies, and those who then believe those opinions
and unwittingly become their victims. Those who defend an opinion are ruled by their unconscious
anger, which is the expression of their deeper fear. It is extremely rare to find a human being who is
truly free from opinion. Such a person must have looked into their fears and embraced their rage in
order to move into that magical place that sees both sides of life. Only in seeing both sides can
balance be struck and control be yielded.
THE 17TH GIFT – FAR-SIGHTEDNESS
PRECOGNITION VIA THE HEART
It is ironic that what often passes for reason in the world is really someone’s opinion dressed up in
facts that happen to justify it. At the Shadow frequency the human mind distorts logic and facts for its
own ends by building one argument and then concealing its counter-argument. The mass of humanity is
easily influenced by one side or the other. It is out of the mind’s duality that all human drama is born,
and the mass consciousness of humanity loves drama. It is all a game played by spin doctors, and if
you think you have escaped this game, then look deeply at your opinions and perhaps you will
discover how easily conditioned your own mind really is.
The fact is that human beings, like Skinner’s rats, see only what they are programmed to see —
which are flaws. All opinions are based upon seeing flaws in the geometry of life. It is only when you
have transcended your fear of freedom that you can move beyond the opinion game and enter a higher
sphere of existence. Moreover, to move beyond opinion you have to stop taking life seriously and
personally. For most people the 17th Gift seems beyond their capacity, because to give up your
viewpoint is to give up the deep-seated need of your mind to identify with something fixed. Your mind
believes that in finding a fixed view or philosophy fear can be held in check and life will be under
control. If you look within most human minds you will find layers and layers of conditioned dogma —
from books, scientifically proven theories, religious beliefs and/or traditional views. You will find
minds that are desperately trying to become certain about life.
And yet, the 17th Gift is not about having a great holistic vision of reality that takes no sides and is
beyond opinion. The 17th Gift is a mentally dynamic Gift — it does not sit idly by with a philosophy
of passive acceptance. This Gift has a purpose and that is to understand the minute mechanics of life
as well as seeing the whole picture. Like its Shadow, the 17th Gift is driven by its programming
partner the 18th Gift, which is Integrity. Thus the true purpose of the 17th Gift is to serve and uphold
Integrity by challenging all misrepresentations of truth in the world. The very quality that leads to
narrow-mindedness at the Shadow frequency has a mission to create open-mindedness at the Gift
frequency. The wonderful truth of logic is to be found in the 63rd Gene Key, which demonstrates how
self-defeating logic really is, albeit at the same time how mystical. This is the beauty of logic — that
at a higher level it always defeats itself. Just as the 17th Shadow uses mental spin to condition
people’s minds in a certain direction, so the 17th Gift uses its own version of spin to undermine self-
serving dogma.
referred to through the 61st Gift — the Gift of Inspiration.
This pressure of the 61st Shadow also feeds the scientific mind. Thus, the scientific mind is also
set up to fail in delivering a release from the pressure because the question of why is an unanswerable
an', '', ''),
  (64, 'SIDDHI ILLUMINATION
GIFT IMAGINATION
SHADOW CONFUSION
THE AURORA
PROGRAMMING PARTNER: 63RD GENE KEY PHYSIOLOGY: PINEAL GLAND
CODON RING: THE RING OF ALCHEMY AMINO ACID: GLYCINE
(6, 40, 47, 64)  
THE 64TH SHADOW – CONFUSION
THE CHAOS OF THE ELEMENTS
With the 64th Gene Key we come to one of the greatest mysteries of existence — the mystery of inner
light. When this light is obscured within a human being it results in Confusion, the 64th Shadow.
Confusion is the great human Shadow state. It sweeps across our world like a great blanket,
smothering, disempowering and screening the mass consciousness from the true nature of reality. As
the last of the 64 Gene Keys in their sequential form, the 64th Gene Key offers us some final warnings.
This is after all the Shadow of Confusion. As we see repeatedly throughout the 64 Gene Keys, the
Shadows are not inherently bad in the sense of being evil. They are in fact the raw material of the
higher fields of consciousness — like the nugget of coal that may hide a diamond of great beauty. As
the confusion reveals its underlying nature and begins to coalesce into an organised etheric substance,
it becomes in turn the wonder of human imagination. Finally, when the imagination transcends itself at
the highest frequencies, the inner light at the heart of all creation explodes inside your being as
spiritual illumination. This is the journey of every human being.
Confusion in itself is a perfectly natural state. The ancient alchemists referred to this state as the
massa confusa, the chaos of the elements, likening it to the primal swirling that preceded the birth of
the universe. Confusion is a state with neither order nor structure; it is a state rippling with pure
potentiality. Only when the human mind attempts to interpret it does it become bewildering. If you are
able to look into this primal state of consciousness without engaging your mind in any way, you will
see the true nature of being manifested as Illumination, the 64th Siddhi.
Each of the 64 Shadows is born out of the human mind’s tendency to identify with whatever it sees.
This tendency creates a biofeedback loop between the two polarities of each Shadow state — in this
case, the loop is generated between the 64th Shadow of Confusion, and its programming partner, the
63rd Shadow of Doubt. Here is how it works:
At every moment, your thinking reflects the way in which the inner body is feeling. If your overall
frequency is low, you generally feel a kind of background unease throughout your physical, emotional
and mental bodies. This unease is generated by the global frequency in which we all live — in other
words, every human being feels the suffering of the whole world through the quantum field that
connects us all. The more you listen into your body, the more you will attune to this collective sense
of unease that is rooted in fear. Most people develop patterns from an early age to escape feeling this
vast desert of world pain and the mind is the first line of defence. As long as we are addicted to
thinking, we can avoid fully feeling it.
This suffering within each human being is rooted entirely in the past. It came down into you
through your ancestral DNA and was transferred to you as a child through the coping strategies of
your parents and peers. Your basic urge to flee from this pain will keep you from ever facing what
you really are, and this fact, lying deep within your cells, gives rise to another of the great human
Shadows — Self-doubt. We human beings doubt ourselves because we are not really ourselves in the
first place. Instead we inhabit the confusion, and the more our minds try to cope with this confusion,
the more we feed our own self-doubt. It is a biofeedback loop. At the general low frequency of the
planet, the mind cannot escape itself, but instead keeps feeding its own illusions. Those illusions then
play out through the course of events that we call our lives. Thus our true potential is never fully
lived, or as Thorea', '', '')
ON CONFLICT (key_number) DO UPDATE SET
  gene_key_text = EXCLUDED.gene_key_text,
  wilhelm_iching_text = EXCLUDED.wilhelm_iching_text,
  walker_iching_text = EXCLUDED.walker_iching_text;
COMMIT;