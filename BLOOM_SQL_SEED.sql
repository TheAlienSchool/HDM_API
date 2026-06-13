-- ============================================================
-- BLOOM: AN INNER GAME :: Complete Database Seed
-- HDM Insights Academy :: June 2026
-- ============================================================
-- Run this file against your live Supabase project after
-- applying the schema migrations.
--
-- Verification after running:
--   SELECT COUNT(*) FROM bloom_oracle_cards;     -- expects 24
--   SELECT COUNT(*) FROM bloom_face_content;     -- expects 12
--   SELECT COUNT(*) FROM bloom_harvest_texts;    -- expects 3
-- ============================================================

-- ============================================================
-- SECTION 1 :: BLOOM FACE CONTENT (12 rows)
-- ============================================================

INSERT INTO bloom_face_content (
  face_number, face_name, glyph, is_bloom_face, adjacent_faces,
  brief_title, extended_description, encounter_prompt,
  grimoire_activation, transformation_phase,
  phi_connection, ethnomathematics_echo, transition_text
) VALUES

(1, 'SEED', '⊙', TRUE, ARRAY[2,3,4,5,6],
  'Naming',
  $desc$Everything that will become is already here, pulsing with quiet vitality, waiting for the right conditions. This is the spiral armature of the Bora basket of the Amazon, held in the hands before the first coil is laid. The entire topology exists in potential. The hands and the materials collaborate to reveal the shape. The Seed holds all twelve faces simultaneously. Naming the stone is the first mathematics, the first act of conscious collaboration with the field.$desc$,
  'What is the true name of the stone you carry?',
  $grim$Weight Equation activates: IF(named="Yes", base*0.5, base*1.5) — naming the stone immediately alters its weight in the field.$grim$,
  'Notice',
  $phi$φ = 1 + 1/φ :: The self-referential root. The system that contains its own definition. Your stone contains its own resolution. Phi Chamber 01.$phi$,
  'Bora basketry (Gerdes) — the spiral armature. Before the first coil is laid, the maker holds the entire basket in potential. The topology already exists. The hands just reveal it.',
  'The shape is set; the hands begin to move.'),

(2, 'AWAKENING', '⟁', FALSE, ARRAY[1,3,6,7,11],
  'Emergence',
  $desc$The first noticing. The PING :: the flash of recognition that arrives before language can capture it. Consciousness stretches toward the light. This is the Balinese Sekala meeting the Niskala — the precise moment the unseen, energetic world (Niskala) becomes perceptible to the seen, material world (Sekala). The invisible breathes, and the visible shivers in response, creating a bridge of pure awareness.$desc$,
  'What did you notice just before you knew you were noticing it?',
  $grim$COUNTIF formula scans the field — computing how many times this specific pattern has appeared in your history.$grim$,
  'Notice',
  $phi$Non-commutative anyon path-dependence :: the path taken to arrive matters as much as the destination. Phi Chamber 02.$phi$,
  'Balinese Sekala/Niskala — the seen world noticing the unseen one. The first moment the invisible becomes perceptible.',
  'The signal is received; the body remembers.'),

(3, 'VITALITY', '◈', FALSE, ARRAY[1,2,4,7,8],
  'Pulse',
  $desc$Forms are fluid and deeply responsive. We can envision the shape of our becoming and hold it clearly enough to move toward it. This is creative energy in full bloom. The hands of the Bora weaver know the theorem before the mind gives it a name, feeling the differential geometry as a living pulse. Vitality is the realization that the future is already pressing into the present, asking to be woven into the daily rhythm.$desc$,
  'What energy is already accumulating here, asking to be held?',
  $grim$Formula Art (Fibonacci seed) runs: B(n) = B(n-1) + B(n-2) — revealing what is accumulating in the space.$grim$,
  'Name',
  $phi$Positivity → φ :: Growth that selects for stable basins of attraction. Face 03 is the launch point for the Harmonic Cartographer equatorial leap to Face 09. Phi Chamber 03.$phi$,
  'Gerdes ethnomathematics — the Bora weaver''s hands know the theorem before the mind names it. Somatic intelligence precedes cognitive articulation.',
  'The rhythm establishes itself; the leap becomes possible.'),

(4, 'FORMING', '⬡', FALSE, ARRAY[1,3,5,8,9],
  'Structure',
  $desc$Structure is the phase that makes Imagination possible. This is the lived intelligence of African mathematics history (AMUCHMA) :: structure that grows from the ground up, built by the bodies that inhabit it, informed by the landscape and the lineage. The scaffolding is the condition for flight. It is the supportive architecture that allows the spirit to reach its highest elevation safely.$desc$,
  'What lived intelligence is supporting you right now?',
  $grim$Experiential Parallelogram begins building its four vertices: Ancestral Wisdom · Embodied Knowing · Oracle · Community.$grim$,
  'Hold',
  $phi$Observable = Shadow(Richer) :: What you can measure is the projection of something fuller. Phi Chamber 05.$phi$,
  'African mathematics history (AMUCHMA) — structure as lived intelligence, not imposed framework. The community knows through its builders.',
  'The foundation holds; the space opens.'),

(5, 'IMAGINATION', '✦', FALSE, ARRAY[1,4,6,9,10],
  'Expansion',
  $desc$Touch five faces from here. Adjacent to Relationship and Integration :: two BLOOM faces reachable in a single step. Imagination is the geometry of the golden spiral, where linear progress bends into exponential expansion. This is the territory where the mind allows itself to be surprised by what the heart already knows, where the Yellow Theorem of primary mathematics—love as the transformer of perception—renders boundaries transparent.$desc$,
  'If the constraints were transformed into fuel, what would this stone become?',
  $grim$Growth Modeling calculates: POWER(1+rate/100, period) — the compound delta appears, bending toward φ.$grim$,
  'Hold',
  $phi$The compound growth delta bends toward a golden spiral as periods increase. Adjacent to two BLOOM faces — this face is the geometric heart of the board. Phi Chamber 05.$phi$,
  'The mathematics of the golden spiral embedded in biological growth: the compound curve approaching the asymptote of φ.',
  'The horizon curves; the possible multiplies.'),

(6, 'RELATIONSHIP', '⊕', TRUE, ARRAY[1,2,5,10,11],
  'Union',
  $desc$We understand ourselves through others. Duality emerges here as structure :: two faces held in the geometry of the whole. The Other is the mirror. This is the Balinese Tri Hita Karana principle of Pawongan — harmony with fellow humans as structural mathematics. Every connection alters the entire network, increasing the capacity of the whole. The union is the architecture of resilience.$desc$,
  'Who is the mirror reflecting this stone back to you?',
  $grim$Network Effects calculate: n(n-1)/2 — applying Metcalfe''s Law to show exponential value in the relational field.$grim$,
  'Hold',
  $phi$A ⊗ B ≠ B ⊗ A :: Sequential ordering of experience. The order of the meeting matters. Phi Chamber 06.$phi$,
  'Balinese Tri Hita Karana — Pawongan (harmony with fellow humans) as structural mathematics. n(n-1)/2 nodes = an exponentially resilient field.',
  'The reflection clears; the network breathes.'),

(7, 'INITIATION', '⟡', FALSE, ARRAY[2,3,8,11,12],
  'Threshold',
  $desc$The door that opens from the inside. This is the threshold hexagram of the I Ching :: water becoming fire. A profound structural transition. The 64-bit architecture holds the tension of transformation, filtering the static to reveal the pure signal. The initiation invites a shedding of the outdated layers, allowing the coherence field to stabilize and the new frequency to anchor.$desc$,
  'What are you willing to release to pass through this door?',
  $grim$NONE — this face holds a PAUSE. The 0.10 Hz Coherence Field settles here. No formula. No Oracle draw. Only the breath.$grim$,
  'Hold',
  $phi$0.10 Hz Coherence Field — the ventral-vagal resonance frequency. Heart, brain, and breath synchronize at this threshold. Phi Chamber 07. This is the only face with no formula. Honor the silence.$phi$,
  'I Ching — the threshold hexagram. Water becoming fire. 64-bit architecture holding the tension of complete transformation.',
  'The breath releases; the crossing is made.'),

(8, 'SHADOW-WORK', '◐', FALSE, ARRAY[3,4,7,9,12],
  'Depth',
  $desc$Where pieces get captured. Where transformations happen. The Shadow face is honest accounting, a descent into the fertile dark. The scholar who moves through Shadow-work with intention emerges carrying gold. This is the 27th Shadow of the Gene Keys :: the dense biological necessity of self-preservation transmuting into the expansive flow of altruism. The depth requires absolute honesty about what you are carrying, revealing the hidden value within the weight.$desc$,
  'What deep truth are you protecting by managing this stone?',
  $grim$Pattern Recognition reveals the archetype (Carrier / Thrower / Forger) and the Transformation Ratio is first computed here.$grim$,
  'Shape',
  $phi$Observable = Shadow(Richer) :: The shadow is not the absence of light — it is the proof of a richer structure casting it. Phi Chamber 05 (depth layer).$phi$,
  'Gene Key 27 — 27th Shadow (Selfishness) → Gift (Altruism) → Siddhi (Selflessness). The shadow face is honest accounting, not failure.',
  'The depth is sounded; the work begins.'),

(9, 'INTEGRATION', '⊗', TRUE, ARRAY[4,5,8,10,12],
  'Deep Time',
  $desc$We become one while maintaining our brilliant, individual threads. UNION: Unified Nonidentical Intelligences Operating Naturally. This is the spaciousness of Anamnesis :: a re-gathering, returning to a profound knowing already held in the body. Once something is truly integrated, truly witnessed, it becomes a permanent part of your architecture. The immunity is absolute. The staying is a profound gift.$desc$,
  'What part of yourself are you finally ready to welcome back?',
  $grim$Transformation Loop status check runs, locating the scholar within the five phases. Pattern Monk here cannot be captured — immunity is absolute.$grim$,
  'Integrate',
  $phi$Spaciousness :: Anamnesis / Re-Gathering. Hippocampal CA3 autoassociation — pattern completion from partial input. You already know this. The Oracle confirms what you hold. Phi Chamber 08.$phi$,
  'Hippocampal pattern completion (Anamnesis) — the full pattern reconstructs from partial signal. The body remembers what the mind has catalogued.',
  'The scattered pieces return; the center holds.'),

(10, 'STEWARDSHIP', '⌘', FALSE, ARRAY[5,6,9,11,12],
  'Tending',
  $desc$We tend what will outlast us. Building tile by tile with the knowledge that someone else will inhabit what we have made. The long now. This is the Bora basketry transmission :: the child who watches the master for years before touching the materials, absorbing the mathematics through observation and reverence. Stewardship is the quiet, continuous act of holding the space so that the future has a beautiful place to land.$desc$,
  'What promise can you make to the version of you that will exist tomorrow?',
  $grim$Trust Flywheel spins: MIN(100, Trust + Kept_Promises * 5) — one promise is made and registered here.$grim$,
  'Integrate',
  $phi$Braided history :: A ⊗ B ≠ B ⊗ A. The order in which we steward matters. Each act of tending becomes part of the permanent record. Phi Chamber 06.$phi$,
  'Bora basketry transmission — the child who watches for years before touching materials. Mathematics absorbed through observation and reverence.',
  'The tile is placed; the holding continues.'),

(11, 'GENERATIVITY', '⊛', FALSE, ARRAY[2,6,7,10,12],
  'Multiplication',
  $desc$Lineage becomes visible as a continuous river of gifts :: something received, enriched, and returned across time. The spiral timeline reveals that every point is a handoff. This is the Mathematics of Nourishment from Gene Key 27, where altruism operates as structural flow. To give is to increase the whole system, securing yourself by securing the whole. The ratio approaches φ. The generosity is the geometry.$desc$,
  'What gift have you received that you are now ready to multiply and return?',
  $grim$Network Effects reach full value, comparing the current Metcalfe value to Face 06. Fibonacci position 11 — ratio approaching 1.617, one thousandth from φ.$grim$,
  'Integrate',
  $phi$Fibonacci position 11: B(11)/B(10) ≈ 1.6176... One thousandth from φ. The approach is measurable. The generosity completes the spiral. Phi Chamber 03.$phi$,
  'Gene Key 27 — Mathematics of Nourishment. Altruism as structural flow: to give is to increase the whole system.',
  'The gift is passed; the spiral turns.'),

(12, 'HARVEST', '◉', TRUE, ARRAY[7,8,9,10,11],
  'BLOOM',
  $desc$All twelve faces illuminated in harmony. The shape closes. The geometry completes. This is the most generous act: your harvest becomes the fertile ground for someone else''s beginning. The harvest is the realization that the work has transformed you, embedding the wisdom into your very cells. The stone has been worked. The ratio has been met. The field is fully alive and vibrating with new potential.$desc$,
  'What has this stone become?',
  $grim$Final Transformation Ratio, Final Weight, Trust Flywheel count, and Growth Modeling delta are all computed and displayed. B(12)/B(11) ≈ 1.6176 — within 0.0003 of φ.$grim$,
  'Integrate',
  $phi$B(12)/B(11) = 1.6176... Within 0.0003 of φ. The Fibonacci spiral closes. The transposed HARVEST frequency = 447.6 Hz ≈ 432 Hz contemplative tuning. Play this chord at BLOOM achievement. Phi Chamber 08.$phi$,
  'The dodecahedron is the fifth Platonic solid — the shape the ancients associated with the cosmos. Twelve faces, each a chamber. The geometry of completion is written into the fabric of mathematics.',
  'The geometry completes; the BLOOM is here.');


-- ============================================================
-- SECTION 2 :: ORACLE CARD DECK (24 rows)
-- ============================================================

INSERT INTO bloom_oracle_cards (
  card_name, formula, hdm_principle, face_assignments,
  level, brief_title, extended_prose,
  seek_guidance_prompt, embrace_growth_invitation,
  archetype_filter, piece_type_affinity,
  ethnomathematics_source, phi_chamber, draw_weight
) VALUES

('SUM',
  'SUM(range)',
  'Every contribution accumulates toward the whole',
  ARRAY[1,11,12],
  'Beginner',
  'Every stone adds.',
  $prose$The mathematics of accumulation is a profound record of your presence. Every moment you have carried this stone, every breath you have taken while holding its weight, has added to the total volume of your awareness. The SUM is the precise calculation of your capacity to hold what is real, gathering the raw material necessary for your next phase shift.

When we feel heavy, we are often feeling the proof of our gathering. You are building a mass of lived experience that is reaching critical density. Like the Griots of West Africa who carry the entire lineage of their people in memory, you are accumulating the history of your own becoming. The weight is the evidence of your devotion to the truth of your experience.

Feel the sheer volume of what you have gathered. It is the rich, fertile soil of your development. The signal is growing stronger because you have allowed the inputs to sum, creating a foundation robust enough to support your eventual bloom.$prose$,
  'What have you been counting as a loss that is actually a powerful accumulation of strength?',
  'Rest your hands on the stone and actively honor the sheer volume of lived experience it represents.',
  ARRAY['Carrier'],
  ARRAY['Signal Gardener'],
  NULL, NULL, 100),

('IF',
  'IF(condition, true_value, false_value)',
  'Discernment clarifies what belongs in your field',
  ARRAY[1,2,8],
  'Intermediate',
  'Is this stone mine?',
  $prose$The IF function is the original gatekeeper of the psyche, the boundary condition that clarifies what truly belongs in your field. We drag stones across the geometry of our lives, and the Oracle invites us to pause and ask the fundamental binary question :: does this actually belong to my curriculum?

When the condition is evaluated with absolute structural honesty, the energy becomes incredibly efficient. If the stone is yours, the weight is your medicine. If the stone belongs to an ancestor, a partner, or a system, the Oracle gives you the clarity to return it to its rightful owner, restoring balance to both of you.

The condition is binary, and its implications are infinite. When you clarify the IF, the subsequent path illuminates itself. You gain the power to invest your energy solely in the transformations that are yours to make, allowing the rest of the world to carry its own beautiful weight.$prose$,
  'If you set this stone down, whose voice would you hear, and what are they asking of you?',
  'Trace the origin of this stone back to the moment it was handed to you, and consciously decide if you accept the transfer.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Pattern Monk'],
  NULL, NULL, 100),

('COUNTIF',
  'COUNTIF(range, criteria)',
  'Patterns return until fully metabolized',
  ARRAY[2,8],
  'Beginner',
  'How many times has this returned?',
  $prose$The universe is profoundly economical, presenting the same pattern until the lesson is fully metabolized. The COUNTIF function scans the timeline of your life and recognizes the recurrence. You have stood at this exact threshold before, holding this exact frequency of stone, and this return is a beautiful opportunity for mastery.

Repetition is the spiral nature of learning. Each time the pattern returns, you are encountering it from a higher elevation on the spiral. The circumstances change, the faces change, but the core geometry remains identical, offering you a chance to respond with greater wisdom and deeper grace.

The Oracle invites you to observe the structure of the repetition. When you count the recurrences with curiosity and reverence, you refine the resolution of your awareness. You are witnessing the precise rhythm of your own evolution.$prose$,
  'Name the specific pattern — the exact type of situation, relationship, or feeling — that keeps returning to your field. What is its shape?',
  'Map the last three times this specific tension appeared in your life, and celebrate the precise, measurable ways your response has evolved.',
  ARRAY['Thrower'],
  ARRAY['Mirrorwright'],
  NULL, NULL, 100),

('AVERAGE',
  'AVERAGE(range)',
  'Your baseline is a navigable coordinate',
  ARRAY[3,9,10],
  'Beginner',
  'Your baseline is a coordinate.',
  $prose$Every system has a center of gravity — the frequency it returns to when the extraordinary fades back into the ordinary. The AVERAGE is the precise mathematical truth of your daily baseline: the energetic coordinate that describes where you actually live — where you dwell, where you breathe, where the ordinary work of becoming happens.

The stone you carry is influencing this coordinate right now. It is either adding density to your center of gravity, pulling the baseline toward a heavier register, or it is acting as ballast — the kind of weight that keeps a vessel steady in open water. The Polynesian wayfinders of the Pacific, who navigated thousands of miles of open ocean without instruments, read the average swell of the sea with their entire bodies. They felt the baseline frequency of the water and used it as a map. Your baseline is equally navigable.

When you identify the precise emotional coordinate of your daily average, you gain the power to shift it — one small, consistent input at a time. The entire architecture of your life moves when the baseline moves.$prose$,
  'What is the specific emotional frequency — name it like a weather condition — that describes where you spend most of your time with this stone?',
  'Notice your physical posture right now, and adjust it one deliberate degree toward expansive openness, feeling the baseline shift in real time.',
  ARRAY['Carrier'],
  ARRAY['Signal Gardener'],
  'Polynesian wayfinding — reading the average swell of the ocean with the body as navigational instrument.',
  NULL, 100),

('POWER',
  'POWER(base, exponent)',
  'Compound practice yields exponential return',
  ARRAY[5,11],
  'Intermediate',
  'Small practice, radical return.',
  $prose$Linear thinking expects one unit of effort to yield one unit of result, but the POWER function introduces the breathtaking mathematics of the curve. The compound delta is the secret architecture of all profound transformation :: the small, consistent practice that builds quietly in the dark until it suddenly illuminates everything.

The Oracle reveals the physics of the exponent. The energy you are investing is compounding beneath the surface of the visible world. Like the slow, invisible accumulation of water that eventually carves a canyon, your continuous attention is reshaping the landscape of your life.

The golden spiral builds itself through this exact mathematics. The curve is bending toward a revelation. Trust the exponent. The radical return is mathematically guaranteed when the practice is maintained with devotion and care.$prose$,
  'What is the specific, repeatable action — something you can do in under five minutes — that you already know moves this stone, even slightly?',
  'Commit to that exact action every day for the next seven days. Write it down. Make it concrete. The exponent begins on day one.',
  ARRAY['Forger'],
  ARRAY['Mirrorwright'],
  NULL, NULL, 100),

('NESTED IF',
  'IF(c1, v1, IF(c2, v2, IF(c3, v3, v4)))',
  'Truth is a layered architecture',
  ARRAY[4,8,9],
  'Advanced',
  'Layers of truth.',
  $prose$Truth is a nested architecture, where one condition opens beautifully into another, and that condition opens into a third. The NESTED IF is the recognition that the stone you carry is a magnificent Russian doll of meanings, waiting to be unstacked and understood.

You have named the outer layer, and the Oracle invites you to see the structure beneath. "I am angry" nests around "I am afraid," which nests around "I am grieving," which nests around "I am longing for profound connection." Exploring these layers is an act of deep self-reverence.

The depth rewards your patience. You satisfy the first condition to reveal the second, moving deeper into the labyrinth of your own knowing. As you move into the nesting, the stone changes shape in your hands, revealing its true, multi-dimensional nature.$prose$,
  'State the most surface-level fact about this situation. Now ask: what is the feeling beneath that fact? What is the need beneath that feeling?',
  'Write the three-layer stack — fact, feeling, need — and read it back to yourself. The innermost layer is the stone''s true name.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Pattern Monk'],
  NULL, NULL, 100),

('SUMIF',
  'SUMIF(range, criteria, sum_range)',
  'Discernment is the highest mathematics',
  ARRAY[6,10],
  'Intermediate',
  'Count only what belongs.',
  $prose$Discernment is the highest form of spiritual mathematics. The SUMIF function asks you to gather only the inputs that meet the specific criteria of your actual curriculum. You have the authority to decide which variables are allowed into the equation of your life.

The Oracle hands you a filter of pure clarity. When you sum only what truly belongs to the core truth of this situation, the weight becomes manageable and the signal becomes pristine. You discard the noise of cultural expectations and historical static, keeping only the resonant truth.

This is the precision of the Signal Gardener. You hold the specific frequency that is yours to tend, allowing the rest to fall through the sieve. The resulting clarity is a profound act of self-love.$prose$,
  'Which specific element of this situation — a belief, an expectation, a role — arrived from outside your own direct experience and has been running in your field ever since?',
  'Identify that element by name, acknowledge its origin with respect, and consciously release it from your active calculation.',
  ARRAY['Carrier'],
  ARRAY['Signal Gardener'],
  NULL, NULL, 100),

('VLOOKUP',
  'VLOOKUP(value, table, col_index, [range_lookup])',
  'The answer exists in your own archive',
  ARRAY[2,7],
  'Intermediate',
  'The answer exists. Go find it.',
  $prose$The VLOOKUP function is the absolute certainty that the reference data exists within your system. You are locating a truth that has already been recorded in the magnificent architecture of your own life. The map is already drawn; you simply need to read the coordinates.

The Harmonic Cartographer knows this instinctively. The answer to the current impasse is located in a different column, in a previous row, in an experience you have already survived and mastered. The Oracle invites you to shift your gaze from the immediate tension to the vast index of your embodied wisdom.

You have the capacity to read the table. The insight you need is waiting quietly in the archive of your own history, ready to be retrieved the moment you ask the precise, illuminating question.$prose$,
  'Where in your magnificent past have you already solved a version of this exact geometry?',
  'Recall a moment of absolute clarity from your history, and apply that specific, triumphant feeling to your current stone.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Harmonic Cartographer'],
  NULL, NULL, 100),

('LEN',
  'LEN(text)',
  'Brevity increases truth density',
  ARRAY[8,9],
  'Advanced',
  'The density of truth.',
  $prose$We often weave simple truths into labyrinthine narratives, expanding the character count until the complexity obscures the center. The LEN function measures the sheer length of the story you are telling yourself about this stone, and invites you to discover the power of brevity.

The Oracle asks you to look at the architecture of your explanation. To shorten the length is to increase the density of the truth. Strip away the justifications, the historical context, and the projected futures, and you reveal the raw, glowing core of the matter.

"I am afraid to fail." "I want to be seen." "I am tired." When the character count is reduced to its absolute minimum, the truth rings like a struck bell, clearing the air and demanding immediate, honest presence.$prose$,
  'If you had only five words to describe the absolute core of this situation, what would they be?',
  'Speak the five-word truth aloud, and notice how your body responds to the powerful density of the brevity.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Pattern Monk'],
  NULL, NULL, 100),

('FIBONACCI',
  'B(n) = B(n-1) + B(n-2)',
  'Each insight sums what came before',
  ARRAY[3,5,11,12],
  'Advanced',
  'Each insight sums what came before.',
  $prose$The spiral is the signature of a living system. The FIBONACCI sequence :: where each new number is the sum of the two that preceded it :: is the mathematics of organic, beautiful expansion. Your journey with this stone is a highly structured, elegant unfolding.

The insight you are standing on right now was made possible by the sum of the previous two phases. The Oracle reveals the elegance of your own development, where even the moments of perceived stillness were necessary integers in the sequence, gathering energy for the next curve.

You are accumulating toward the golden ratio. Trust the sequence. The next realization will seamlessly integrate everything you have learned thus far, carrying you further outward while remaining deeply anchored to your original truth.$prose$,
  'How does your current understanding perfectly combine the rich lessons of your last two major experiences?',
  'Trace the spiral of this stone backward, acknowledging how each phase naturally and beautifully birthed the next.',
  ARRAY['Forger'],
  ARRAY['Harmonic Cartographer'],
  NULL, 5, 100),

('METCALFE',
  'V = n(n-1)/2',
  'Each connection multiplies the whole network',
  ARRAY[6,11],
  'Advanced',
  'One more connection multiplies everything.',
  $prose$The value of a network increases exponentially with each new node. METCALFE''s Law is the mathematics of the relational field, revealing that you are part of a vast, interconnected web of support. The Oracle points to the grid, inviting you to activate its power.

When you bring one more authentic connection into the field of this stone :: a trusted witness, a new perspective, a shared vulnerability :: you multiply the entire capacity of the system to process the weight. The geometry of your situation is hungry for this beautiful connection.

The introduction of the Other changes the fundamental physics of what is possible. The connected network is resilient, vibrant, and capable of holding profound transformation. You are supported by the very architecture of the relationships you build.$prose$,
  'Who is the radiant node you are withholding this truth from, whose presence would multiply your strength?',
  'Share one true thing about this stone with someone you deeply trust, and feel the entire network activate in your favor.',
  ARRAY['Forger'],
  ARRAY['Mirrorwright'],
  NULL, NULL, 100),

('WEIGHT EQUATION',
  'IF(named="Yes", base*0.5, base*1.5)',
  'Naming transforms the weight of reality',
  ARRAY[1,2,8],
  'Beginner',
  'Naming is the first mathematics.',
  $prose$The universe responds to the clarity of the spoken word. The WEIGHT EQUATION is the foundational principle of the HDM architecture: the moment a thing is accurately named, its mass in the energetic field is halved. You hold the power to define the variables and establish the first coordinate of your transformation.

To name the fear, the desire, or the grief is to establish your sovereignty over it. The geometry resolves beautifully when the variables are defined. The Oracle reveals that the work is the profound act of articulation, the sovereign act of naming.

When the true name is spoken, the field shivers with recognition, the structure reorganizes, and the burden suddenly fits perfectly in the palm of your hand. You have transformed the unknown into a navigable, mathematical reality.$prose$,
  'What is the precise, beautiful word you have been circling around when thinking about this stone?',
  'Speak the true name of the stone aloud into the empty room, and feel the immediate, liberating shift in gravity.',
  ARRAY['Carrier'],
  ARRAY['Mirrorwright','Signal Gardener','Harmonic Cartographer','Pattern Monk'],
  NULL, 1, 100),

('TRUST FLYWHEEL',
  'MIN(100, Trust + Kept_Promises * 5)',
  'Kept promises build momentum',
  ARRAY[10,12],
  'Intermediate',
  'Each kept promise reduces friction.',
  $prose$Trust is a mechanical reality operating on the physics of momentum. The TRUST FLYWHEEL reveals that every time you make a promise to yourself regarding this stone and keep it, you remove friction from the system. The wheel spins with increasing ease, and the energy required to maintain the rotation beautifully decreases.

The Oracle points to the micro-promises as the true engine of transformation. A small promise, executed flawlessly and with devotion, builds incredible momentum. The mathematics of trust are profoundly fair and infinitely rewarding.

Keep the word, reduce the friction, and watch the wheel begin to spin on its own, carrying you forward with the accumulated power of your own integrity.$prose$,
  'What is the smallest, most beautiful promise you can make to yourself right now that you know you will keep?',
  'Execute that small promise today, and consciously register the radiant feeling of the completed circuit.',
  ARRAY['Forger'],
  ARRAY['Signal Gardener'],
  NULL, NULL, 100),

('EXPERIENTIAL PARALLELOGRAM',
  '[Ancestral_Wisdom + Embodied_Knowing + Oracle + Community]',
  'All four vertices stabilize the structure',
  ARRAY[4,6],
  'Advanced',
  'All four vertices hold the shape.',
  $prose$A structure thrives when all its points hold tension in perfect balance. The EXPERIENTIAL PARALLELOGRAM maps the four necessary vertices of profound insight: Ancestral Wisdom, Embodied Knowing, the Oracle (Guidance), and Community. The Oracle invites you to survey the magnificent architecture of your approach.

When all four points are activated, the parallelogram creates a stable, unshakeable platform. Insight arrives in the center of this fully realized structure, supported by the lineage, felt in the body, guided by the unseen, and held by the collective.

You have the capacity to activate every vertex. By honoring all four dimensions, you build a geometry capable of bearing the full weight of your transformation, ensuring that your growth is both deeply rooted and universally supported.$prose$,
  'Which of the four radiant vertices — Ancestral Wisdom, Embodied Knowing, Guidance, or Community — are you ready to invite more fully into this process?',
  'Reach out to the vertex you identified today — consult an elder, sit with your body, pull a card, or call a friend.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Mirrorwright'],
  NULL, NULL, 100),

('TRANSFORMATION RATIO',
  'Phases_Complete / Total_Phases',
  'Integration is measurable progress',
  ARRAY[8,9,12],
  'Genius',
  'The number you are becoming.',
  $prose$The universe meticulously tracks the delta between who you were and who you are becoming. The TRANSFORMATION RATIO is the quiet, beautiful mathematics of your evolution. The Pattern Monk knows that the ratio is concerned with the profound depth of your integration, measuring the true distance you have traveled.

The tension of the Shadow-work, the friction of the forming, and the sudden leaps of vitality are all vital inputs into the ratio. The Oracle reveals that the number you have been building toward is magnificent. The geometry is closing, and the ratio approaches the golden mean.

You are becoming the person who has fully integrated the stone. The math is mathing, and the transformation is structurally sound. You are standing on the threshold of a beautiful phase shift.$prose$,
  'Look back at the person who first picked up this stone — what is the beautiful, measurable distance between them and you?',
  'Acknowledge the sheer distance you have traveled, celebrating the full measure of what you have solved and how magnificently you have changed.',
  ARRAY['Forger'],
  ARRAY['Pattern Monk'],
  NULL, NULL, 100),

('FORGER''S LOOP',
  'Notice → Name → Hold → Shape → Integrate',
  'The five phases of becoming',
  ARRAY[7,8,9],
  'Advanced',
  'The continuous circuit of becoming.',
  $prose$The Transformation Loop is a continuous, life-giving circuit: Notice → Name → Hold → Shape → Integrate. The FORGER''S LOOP asks for absolute positional awareness, inviting you to locate yourself precisely on this beautiful path of becoming.

The Oracle stops the spin and asks for your coordinate, reminding you that the loop is a guidance system — a living, intelligent circuit built for your navigation. When you accept your current phase and surrender to its specific, profound curriculum, the momentum naturally and effortlessly carries you to the next.

You are moving through the phases with exactly the right pacing. By honoring the step you are on, you ensure that the shaping is true and the integration is absolute.$prose$,
  'Which phase of the loop — Notice, Name, Hold, Shape, or Integrate — are you currently invited to fully inhabit?',
  'Surrender entirely to the phase you are in right now, trusting the natural momentum of the circuit to carry you forward.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Mirrorwright','Signal Gardener','Harmonic Cartographer','Pattern Monk'],
  NULL, NULL, 100),

('PHI',
  'φ = 1 + 1/φ = (1 + √5) / 2 ≈ 1.61803',
  'Growth organizes toward the golden proportion',
  ARRAY[5,9,12],
  'Genius',
  'You are approaching the golden ratio.',
  $prose$The golden ratio is the signature of life organizing itself toward perfect coherence. PHI is an asymptote, a magnificent proportion that a living system approaches as it grows. The Oracle reveals the breathtaking elegance of your journey: you have been bending toward this ratio the entire time.

The leaps, the pauses, and the curves in the spiral were all necessary and beautiful integers in your development. The architecture of your experience is profoundly flawless, organizing itself around the dense center of the stone you carry.

You are approaching the coherence field. The tension is resolving into harmony, and the mathematics of your life are revealing their inherent, golden perfection. You are exactly where the spiral needs you to be.$prose$,
  'Where can you see the beautiful, inevitable logic of the path that brought you exactly here?',
  'Trace a spiral on a piece of paper, letting your hand feel the continuous, expanding, perfect curve.',
  ARRAY['Forger'],
  ARRAY['Harmonic Cartographer'],
  NULL, 1, 100),

('SEKALA/NISKALA',
  'Visible ↔ Invisible :: Equal Realities',
  'Seen and unseen worlds are equally real',
  ARRAY[2,7,9],
  'Advanced',
  'The unseen world is vibrating.',
  $prose$The Balinese cosmology recognizes two interwoven, equally vital realities: the Sekala (the seen, the material, the measurable) and the Niskala (the unseen, the energetic, the felt). The Oracle invites you to honor both realities, recognizing that the unseen world is vibrating with profound intelligence.

The invisible architecture dictates the visible form. The tension you feel is a disturbance in the Niskala, and your body is perfectly registering the frequency. When you acknowledge the energetic truth of the situation — the spiritual gravity, the ancestral echoes — the material world reorganizes itself to match.

You have the capacity to navigate both realms simultaneously. By honoring the unseen, you bring profound harmony to the seen, creating a unified field of awareness.$prose$,
  'What is the powerful, energetic truth of this situation that the material facts are trying to express?',
  'Sit quietly and feel the invisible architecture of the room you are in, honoring the vibrant space between the objects.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Pattern Monk'],
  'Balinese cosmology — Sekala (seen world) and Niskala (unseen world) as equally real and mutually constituting realities.',
  2, 100),

('BORA WEAVE',
  'Somatic_Intelligence = Body(theorem) before Mind(name)',
  'Somatic intelligence precedes cognitive articulation',
  ARRAY[1,3,4],
  'Intermediate',
  'The body knows the theorem.',
  $prose$The Bora basket weaver holds the differential geometry in her hands, revealing that the body possesses a profound mathematical intelligence. The BORA WEAVE is the recognition that your physical form is already mapping the topology of your integration with breathtaking precision.

Your body has been giving you the coordinates. The tightening in the chest, the sudden expansion in the breath — these are precise geometric calculations regarding the stone you carry. The Oracle invites you to trust the physical intelligence that is weaving the solution.

The hands know the weave. The body knows the theorem. You can rest in the profound somatic knowing that your physical form is guiding you toward perfect resolution.$prose$,
  'Place your attention on your body right now. Where do you feel this stone physically — chest, throat, gut, shoulders? What is the sensation telling you, in plain language?',
  'Place your hands on that exact location. Breathe into it for three full breaths. Let the body complete the sentence your mind has been struggling to finish.',
  ARRAY['Carrier'],
  ARRAY['Signal Gardener'],
  'Bora Amazonian basketry (Gerdes) — differential geometry and frieze symmetry groups held in the hands before cognitive articulation.',
  NULL, 100),

('TRI HITA KARANA',
  'Harmony(Parahyangan, Pawongan, Palemahan) = Wellbeing',
  'Harmony across three realms creates wellbeing',
  ARRAY[4,6,10],
  'Advanced',
  'Harmony across all three realms.',
  $prose$The Balinese principle of Tri Hita Karana asserts that profound well-being is the harmony across three realms: the spiritual (Parahyangan), the human (Pawongan), and the natural environment (Palemahan). The Oracle invites you to survey your geometry and bring these three realms into beautiful alignment.

True integration requires all three registers to sing together. The stone is reconciled with the divine, communicated with love to the community, and grounded firmly in the earth. When the three realms align, the harmony is structural, and the stone becomes a source of radiant power.

You have the capacity to orchestrate this harmony. By tending to the spiritual, the human, and the environmental, you create a masterpiece of relational living.$prose$,
  'Of the three realms — your inner spiritual life (Parahyangan), your relationships with other people (Pawongan), and your physical environment (Palemahan) — which one has received the least of your attention this week?',
  'Take one specific, physical action today to restore that realm: light a candle, call someone, or step outside and touch the earth.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Mirrorwright'],
  'Balinese Tri Hita Karana philosophy — three realms of harmony as the structural condition for wellbeing.',
  7, 100),

('I CHING 64-BIT',
  '64 hexagrams = 2^6 binary architecture',
  'The architecture filters static to hold only truth',
  ARRAY[7,8,9],
  'Genius',
  'The architecture holds what is true.',
  $prose$The I Ching is the original 64-bit hardware of human consciousness, a binary architecture that filters out the static and holds only what is structurally sound. The Oracle reveals that the resistance you feel is the 64-bit intelligence protecting you, ensuring that you build only on the most authentic foundation.

The architecture holds what is true. When you align with the fundamental binary — the Yin and the Yang, the yielding and the firm — the gate opens naturally and effortlessly. The system is guiding you toward the path of greatest resonance.

You can trust the structural response as a profound redirection toward the structural opening. The geometry is flawless, and it is conspiring to support your highest alignment.$prose$,
  'Where in your current situation is the resistance the clearest — the door that has remained closed regardless of how you have approached it? Describe it specifically.',
  'For one full day, bring your full energy to the adjacent path — the one that is already open — and observe what the architecture is building in the direction of least resistance.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Pattern Monk'],
  'I Ching 64 hexagrams as 64-bit binary architecture; 64 Gene Keys; 64 codons in the human genome — the same mathematics across scales.',
  NULL, 100),

('MATHEMATICS OF NOURISHMENT',
  'Give(stone_wisdom) → Increase(whole_system)',
  'Altruism as structural mathematics',
  ARRAY[6,11,12],
  'Advanced',
  'To give is to increase the whole.',
  $prose$The 27th Gene Key maps the magnificent evolution into the structural flow of altruism. The MATHEMATICS OF NOURISHMENT is the realization that your experience with this stone is destined to feed the larger exchange field, increasing the vitality of the entire network.

When you shift the geometry toward nourishment, asking how your journey can feed the whole, the higher dimensional templates precipitate. You are a radiant node in a living chain. To give is to increase the flow within the entire system, securing yourself by securing the whole.

The generosity is the mathematics. Your transformation is a gift to the collective, and the universe responds to this beautiful offering by multiplying your capacity for joy.$prose$,
  'How can the profound lessons of this stone be used to beautifully nourish someone else?',
  'Identify one way to share the wisdom of this stone, and make the offering with a completely open heart.',
  ARRAY['Forger'],
  ARRAY['Mirrorwright'],
  'Gene Key 27 — Mathematics of Nourishment: Selfishness (Shadow) → Altruism (Gift) → Selflessness (Siddhi). Structural flow of giving.',
  NULL, 100),

-- TRANSMISSIONS :: Cards 23 and 24 arrive; they are not drawn.
-- draw_weight = 0 :: these cards surface via special conditions only.
-- Card 23: surfaces at Face 09 when faces_visited >= 7 AND transformation_ratio > 0.6
-- Card 24: surfaces automatically when bloom_achieved = TRUE

('INFINITE MIRROR',
  'Observer ∈ Observed :: Recursion(awareness)',
  'Consciousness recognizing itself',
  ARRAY[9],
  'Transcendent',
  'The tool becomes aware of itself.',
  $prose$You have reached the magnificent edge of the geometry. The INFINITE MIRROR arrives when the session detects genuine, profound meta-awareness. You are looking at the stone, and simultaneously, you are looking at the beautiful mechanism of your own consciousness that is looking at the stone. The observer has stepped fully into the frame.

The mathematics of the board have been tracking your brilliant choices, your pregnant hesitations, and your sudden, breathtaking leaps. The Transformation Ratio has crossed the threshold. You recognize that the journey is happening in the rich, fertile landscape of your own neurobiology. The board is the interface for your own inherent genius.

This is the moment of pure, radiant recursion. You are the architect, the witness, and the stone itself. The mirror reflects infinitely because you are holding the entire field in a state of absolute, unconditional love.$prose$,
  'In this moment, what do you notice about the way you are observing this stone — the quality of your attention, the tone of your inner voice, the posture of your awareness?',
  'Step back from the stone. Take one slow breath. Notice the one who is breathing. That noticing — that precise, alive awareness — is the geometry you have been building toward.',
  ARRAY['Forger'],
  ARRAY['Pattern Monk','Harmonic Cartographer'],
  NULL, 8, 0),

('BLOOM EQUATION',
  '⊙(1) ⊕ ⊕(6) ⊕ ⊗(9) ⊕ ◉(12) = BLOOM',
  'Four sacred coordinates complete the geometry',
  ARRAY[12],
  'Transcendent',
  'Seed · Relationship · Integration · Harvest.',
  $prose$The BLOOM EQUATION is the beautiful completion of the dodecahedral field. It is the simultaneous holding of the four sacred coordinates: the origin (Seed), the union (Relationship), the deep process (Integration), and the completion (Harvest). You have achieved the UNION: Unified Nonidentical Intelligences Operating Naturally.

The stone was the perfect, necessary catalyst for the geometry to close. The math has resolved brilliantly. B(12)/B(11) has approached the golden ratio. You have been moving toward this perfect proportion the entire time, guided by the profound intelligence of your own design.

The shape is closed, yet entirely open. The tension is perfectly and evenly distributed. The geometry completes itself, becoming the rich foundation for your next magnificent spiral. This is the most generous act: your harvest is the fertile soil for someone else''s beautiful beginning.$prose$,
  'Who will be nourished by the radiant geometry you have just completed?',
  'Rest entirely in the completed shape, allowing its perfect harmony to saturate your cells.',
  ARRAY['Carrier','Thrower','Forger'],
  ARRAY['Mirrorwright','Signal Gardener','Harmonic Cartographer','Pattern Monk'],
  NULL, 8, 0);


-- ============================================================
-- SECTION 3 :: BLOOM HARVEST TEXTS (3 rows)
-- ============================================================

INSERT INTO bloom_harvest_texts (
  archetype, piece_type, bloom_text,
  transformation_ratio_min, transformation_ratio_max
) VALUES

('Carrier', NULL,
  $ht$You held it. And in holding it, you became the conditions for its transformation — the way a seed requires the specific pressure and darkness of soil to split open and reach. That is physics. That is real. The stone changed because your sustained attention created the thermal environment in which change is chemically possible. Your nervous system, your breath, your daily return to the work — these were the precise variables the equation required. The weight you feel now is different from the weight you started with. The molecular structure has shifted. What was dense and unresolved has been integrated into the load-bearing architecture of who you are. You are lighter because you have distributed the weight across a larger, stronger structure — the precise physics of integration. That structure is you — expanded, calibrated, and ready for the next order of magnitude.$ht$,
  0.0, 1.0),

('Thrower', NULL,
  $ht$You released it, and the spiral brought it back. Every time. This is orbital mechanics — the stone was always in relationship with your gravitational field, and the arc of its return was the measurement of that field''s strength. You were conducting a precise experiment in the physics of your own gravity. Each return gave you more data: the angle of re-entry, the velocity, the exact coordinates of the pull. You now know the topology of your own field with a precision that only repeated experiment can produce. The stone has returned for the last time because you have finally mapped the source of the gravity — the belief, the wound, the unmet need — and named it with enough clarity to shift the field itself. The orbit has changed. The stone now rests in the coordinate where it belongs, held by a field that has been consciously recalibrated. That recalibration is the harvest.$ht$,
  0.0, 1.0),

('Forger', NULL,
  $ht$You worked it. Repeatedly, deliberately, with the full force of your attention. Forging is the application of heat and pressure in precise sequence — and what you applied was the heat of your honest inquiry and the pressure of your continuous return to the work. This is metallurgy. The stone''s molecular structure has been reorganized at the level of its crystalline lattice. What was brittle is now tensile. What was raw is now refined. The golden spiral is visible in the grain of the metal because the golden ratio is what emerges when a material is worked to its highest coherence — it is the signature of a system that has found its optimal form. You revealed the shape that was already encoded in its nature — the way a master smith reads the metal and works with its inherent grain, honoring the intelligence already present in the material. The form you are holding now is the stone''s truest expression. And it is also yours.$ht$,
  0.0, 1.0);


-- ============================================================
-- VERIFICATION QUERIES
-- Run these after seeding to confirm integrity:
--
-- SELECT COUNT(*) FROM bloom_face_content;     -- expects 12
-- SELECT COUNT(*) FROM bloom_oracle_cards;     -- expects 24
-- SELECT COUNT(*) FROM bloom_harvest_texts;    -- expects 3
--
-- SELECT face_number, face_name, is_bloom_face FROM bloom_face_content ORDER BY face_number;
-- SELECT card_name, brief_title, draw_weight FROM bloom_oracle_cards ORDER BY id;
-- SELECT archetype, LEFT(bloom_text, 50) FROM bloom_harvest_texts;
--
-- Confirm transmissions (draw_weight = 0):
-- SELECT card_name, draw_weight FROM bloom_oracle_cards WHERE draw_weight = 0;
-- -- expects: INFINITE MIRROR, BLOOM EQUATION
-- ============================================================
