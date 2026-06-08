# Implementation Plan :: The φ Ocean Phase 1 & Infusions

This plan outlines the steps to prepare the Phi Explorer, infuse the HIA ecosystem with golden ratios, and build five touchable interactive blog gateways on the index page.

## VesselVerse Primer Integration

The VesselVerse Editorial Protocol 3.1 serves as the active creative filter for all copy, visual hierarchy, and interactive flows developed under this plan. It governs our execution through three core mandates:

1.  **De-Encabulation (Experience First, Term Second, Depth Third):**
    Each touchable card sequences its delivery. The scholar is located in a tactile, somatic coordinate (holding, dragging, breathing) before encountering mathematical terms or system descriptions. The interface reveals the mechanism directly rather than hiding it behind conceptual complexity.
2.  **Affirmative Architecture (Refusal of Deficit Coding and Copy):**
    All card copy, error states, and code comments are constructed using affirmative coordinates. The system speaks entirely to what is present, what is possible, and what is ready, releasing all forms of negation.
3.  **The Three Registers of the Voice:**
    *   **Invitational Register (Register 3):** Deployed on card kickers at the Index to invite entry with spacious clarity.
    *   **Somatic Register (Register 1):** Deployed in the interactive widgets and breathing circles to speak to the body's intelligence.
    *   **Observational Register (Register 2):** Deployed in the final formula reveals and 0.10 Hz coherence explanations to state the physics of the system.

## User Review Required

Please review the proposed visual and sonic alterations to the index page and individual explorers.

## Open Questions

How should the visual particle layouts in "The Metronome of Safety" behave on mobile viewports to preserve performance? We propose bounding the particle count to 50 active nodes on mobile devices.

## Proposed Changes

### 1. Staging the Vestibule (Phi Explorer Preparation)

#### [NEW] [phi-ocean-shared.js](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/explorers/js/phi-ocean-shared.js)
*   Create a shared JavaScript module containing the persistent `SCHOLAR` state machine (using `localStorage` keyed as `phi_scholar_v1`).
*   Implement the `revealFormula` character animation function governed by $\phi$-ratio delays.
*   Centralize the `PRELUDE_COPY` data structure to store copy constants.

#### [MODIFY] [phi-explorer.html](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/explorers/phi-explorer.html)
*   Inject the shared `js/phi-ocean-shared.js` module.
*   Relocate the three bottom links (Dodecahedron, Platonic Solids, De Jong) to the top navigation bar.
*   Prepare the bottom canvas area to host the Ocean Map navigation element.
*   Incorporate transparent text overlays for the scroll-reactive "Stream Whisper" quotes.

### 2. HIA Ecosystem Infusions (Sound & Physics Calibration)

#### [MODIFY] [dodecahedron-explorer.html](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/explorers/dodecahedron-explorer.html)
*   Calibrate the Web Audio overtones using exact $\phi$ ($1.61803$) and $\phi - 1$ ($0.61803$) frequency multipliers on hover.
*   Establish the continuous $144\text{ Hz}$ drone layer in the background.

#### [MODIFY] [magnet-theater.html](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/explorers/magnet-theater.html)
*   Calibrate the guide portal hover detection to use the gravity physics engine with a threshold of $3.56$ seconds.
*   Integrate the $144\text{ Hz}$ and $288\text{ Hz}$ base soundscapes on user entry gesture.

#### [MODIFY] [resonance-library.html](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/resonance-library.html)
*   Create placeholder links for the upcoming Lineage Hall timeline.
*   Integrate hooks for the persistent `SCHOLAR` visited sequence array.

### 3. Touchable Gateway Cards (Index Page)

#### [MODIFY] [index.html](file:///c:/Users/Kzaka/Documents/GitHub/HDM_API/index.html)
*   Add the $0.10\text{ Hz}$ breathing background CSS animation (PING Radar pulse) in terra and gold.
*   Implement five interactive blog card modules with touch-responsive widgets:
    1.  *The Physics of the Conscious Pause:* A somatic hold-slider that unlocks warm gold illumination at the $\phi$-voltage threshold.
    2.  *Thinking with Your Hands:* A 3-strand interactive braiding widget with custom polyrhythmic feedback on touch.
    3.  *Shadows of a Richer Structure:* A wireframe shape with a light-direction slider casting shifting 2D shadows.
    4.  *The Architecture of Preference:* A theme toggle showing the somatic expansion of $\phi$ versus the contraction of $\psi$.
    5.  *The Metronome of Safety:* An interactive breathing card pulsing at $0.10\text{ Hz}$ (a 10-second breath cycle). The scholar attunes to the rhythm, aligning scattered nodes into a coherent golden spiral, establishing an intuitive, sensory understanding of the $0.10\text{ Hz}$ coherence frequency.

## Verification Plan

### Automated Tests
*   Run local syntax checks and static file validations.

### Manual Verification
*   Verify that all pages load with the unified styling, remaining free of runtime console errors.
*   Verify that `localStorage` correctly records the sequence of visited chambers in the `SCHOLAR` state.
*   Verify that the 0.10 Hz breathing circle operates smoothly, remaining free of layout stutter on mobile.
