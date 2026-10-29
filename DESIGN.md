---
name: For Angel — The Birthday Tape
description: "A recovered home-video broadcast site: pitch-black CRT world measuring a love letter in timecodes."
colors:
  ground: "#08070a"
  ground-raise: "#100e12"
  tape-warm: "#f2ece1"
  tape-dim: "rgba(242, 236, 225, 0.56)"
  tape-faint: "rgba(242, 236, 225, 0.16)"
  signal-amber: "#ffb352"
  rec-red: "#e2402c"
  chroma-cyan: "#57d6c8"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(4.2rem, 6rem + 18vw, 24rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  osd:
    fontFamily: "VT323, Courier New, monospace"
    fontSize: "clamp(1rem, 0.95rem + 0.5vw, 1.6rem)"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  frame: "12px"
  button: "8px"
  chip: "5px"
spacing:
  page-x: "clamp(1.25rem, 4vw, 4.5rem)"
  section: "clamp(3rem, 8vh, 8rem)"
components:
  frame-still:
    backgroundColor: "{colors.ground-raise}"
    textColor: "{colors.tape-dim}"
    rounded: "{rounded.frame}"
  replay-button:
    backgroundColor: "transparent"
    textColor: "{colors.tape-warm}"
    rounded: "{rounded.button}"
---

# Design System: For Angel — The Birthday Tape

## Overview

**Creative North Star: "A recovered home-video tape playing on a CRT that still remembers."**

This is an Experience-mode system: the artifact (the tape) leads, the interface recedes. The whole page is one continuous broadcast on black — the visitor scrubs through someone's memories the way you fast-forward a VHS. Depth is conveyed by dark tonal layers and soft wide shadows on floating frame cards, never by lines or outlines on light ground. The human voice (Instrument Serif, cream, italic at emotional beats) lives inside machine chrome (VT323 timecodes, track counters, REC lights) — emotion arrives as evidence.

**Key Characteristics:**
- Pitch-black ground everywhere (100% of surface); amber is the single accent, used only where the tape machine itself would light up.
- OSD chrome is a design material: REC dots, timecodes, TRACK counters, REW/PLAY chips are measurement, not decoration.
- Photos are video stills: rounded 12px frame cards, floating, hand-plastered tilts ±7°, stamped with frame numbers and times.
- Ghosting artifacts (cyan/red text-shadows) belong to the CRT subject, applied to human-voice display type only.
- Scroll is a tape transport: scrubbed parallax, rolling year counter, live timecode, hairline tape progress.

## Colors

A monochrome tape world with one living accent. Roles are fixed: black grounds carry everything, warm white is the ink, amber is the light the machine emits, and red/cyan exist only as chroma artifacts.

### Primary

- **Signal Amber** (#ffb352): The machine's light. Year numerals in the rail, progress hairlines and bars, the drawn heart flourish, the italic "Birthday"/"Brownso" emotional beats, focus rings, selection fill, REPLAY hover fill. Never on body copy.

### Secondary

- **REC Red** (#e2402c): Only as the record-light dot and in ghosting shadows on display type. If it appears as a surface or border, it has left its role.

### Tertiary

- **Chroma Cyan** (#57d6c8): Only in ghosting shadows paired with REC red (the CRT chroma-bleed pair). Never alone, never as UI.

### Neutral

- **Tape Warm** (#f2ece1): All body/display ink. 100% — never as a background fill except the REPLAY hover (where ink flips to ground).
- **Tape Dim** (rgba(242, 236, 225, 0.56) on black ≈ 5.6:1): OSD chrome, stamps, notes. Minimum legible welfare for measurement text.
- **Tape Faint** (rgba(242, 236, 225, 0.16): non-text only — 1px borders on raised frames, hairline track behind progress bars.
- **Ground** (#08070a): page background. **Ground Raise** (#100e12): still-card surfaces, wipe panel variation.
- Preloader/hero placeholder tints (9 radial-gradient plates, #14121a-family darks) are honest "SIGNAL LOST" carriers until real photos load; they retire automatically.

### Named Rules (optional, powerful)

**The Machine-Light Rule.** Amber appears at ≤10% of any screen and always where the tape machine itself lights up (counters, progress, record-adjacent beats). Its rarity is what makes it read as light.

**The Measurement-Not-Decoration Rule.** VT323 exists only for things the machine measures (timecode, tracks, counts, frame numbers, EJECT). A feeling is never set in VT323; a measurement is never set in Instrument Serif.

**The Chroma-Pair Rule.** Cyan and red ghosting shadows travel together, ±2–3px horizontal offsets on serif display type, opacity ≤0.28. They never tint fills or borders.

## Typography

**Display Font:** Instrument Serif (with Georgia serif fallback)
**Body Font:** Instrument Sans (with Helvetica Neue fallback)
**Label/OSD Font:** VT323 (with Courier New monospace fallback)

**Character:** A soft humanist serif carrying the love letter inside televisual measurement. The serif does the remembering; the OSD font does the noticing.

### Hierarchy

- **Display** (400, clamp(4.2rem→24rem), lh 0.82, -0.03em): ANGEL, signature "love, Brownso" (~clamp(3rem→7.5rem)), epilogue lines (clamp(1.75rem→3.4rem), lh 1.18). Emotional beats go italic + amber.
- **Title / Narrative** (Instrument Serif 400, clamp(1.15rem→1.5rem), lh 1.35): frame side-notes in tape-dim italic; panel-note measure ~16rem–24rem.
- **Body** (Instrument Sans 400–600, clamp(1→1.125rem), lh 1.6): sparse; the site is mostly chrome and serif.
- **OSD / Label** (VT323, clamp(0.75→1.6rem), 0.06–0.16em letter-spacing): all measurement and wayfinding. Trailing tabular digits everywhere counters roll.

### Named Rules (optional)

**The Serif-Carries-Sentiment Rule.** Italic + amber marks exactly the sentimental peaks (Happy *Birthday*, love, *Brownso*, "Happy birthday, Angel."). Never italicize OSD chrome.

## Layout

The page is one vertical tape, not a grid of sections. Desktop: fluid rail/panels grid (minmax(13rem, 20rem) sticky transport rail + 1fr panel column), page-x gutters clamp(1.25rem, 4vw, 4.5rem). Panels min-height 110svh, photos flex row alternating side-l/side-r with pair sizes min(44%, 440px) large / min(26%, 280px) small portrait; generous black is intentional density, not emptiness. Mobile ≤900px: single column; the transport rail becomes a sticky bar seated 2.6rem below the fixed HUD (year 3.2rem + SIDE A/timecode on one row, nowrap); panels stack photos then note (note order 2 for left-side panels); ≤480px counters stack. Spacing rhythm: more space above every note than below (0.1em only between epilogue lines).

## Elevation & Depth

Depth is layered darkness plus soft structural shadow, no hard offsets, no glass glow. Frame cards float slightly above ground so the hand-plastered collage reads as objects taped to a screen.

### Shadow Vocabulary

- **Frame float** (`box-shadow: 0 14px 34px rgba(0,0,0,0.55), 0 3px 8px rgba(0,0,0,0.4)`): every still card at rest.
- **Frame lift** (`box-shadow: 0 26px 48px rgba(0,0,0,0.6), 0 6px 14px rgba(0,0,0,0.5)`): hover/state response only.
- **Emitters** (`box-shadow: 0 0 10px rgba(226,64,44,0.7)` / `0 0 14px rgba(255,179,82,0.45)`): the REC dot and the progress hairline — light emission from machine elements only, never on text or surfaces.

### Named Rules (optional)

**The Dark-By-Default Rule.** Surfaces are flat ground until an element is a physical object (a frame card) or a light source (dot, bar). Glow is emission, not decoration.

## Shapes

Rounded tape-card language: 12px on every frame card (with matching clip-path reveal masks rounded to var(--radius)), 8px on the replay button, 5px on play chips. 1px warm-faint borders on raised cards. Cutting/clipping is the reveal mechanism: photos breathe through rounded inset clip-paths (12%→46% windows) and wipe panels flash with a blurred tracking-noise edge. CRT surface overlay (repeating 1px scanline gradient fading past 55% toward a 0.42 alpha vignette) carries the screen texture; colored block borders and offset hard shadows are foreign to this world.

## Components

### Frame Card (.still)
- **Shape:** 12px radius, aspect-ratio per role (5/6 collage, 4/3 large, 3/4 small, 16/9 tape shell).
- **Colors:** ground-raise base, tinted radial-gradient placeholder plates, warm-faint 1px border, frame-float shadow.
- **States:** rest tilt from the rotation vocabulary (±2–7°); hover lifts straight (rotate 0, -6px, 1.02 scale, frame-lift shadow); GSAP scrub parallax ±34–70px; reveal = rounded clip-path window + opacity/stagger; tilt re-plastering on the collage shuffler.
- **OSD:** stamp strip bottom (frame label + timecode, gradient ground-to-transparent), SIGNAL LOST / STANDBY center label in VT323 that retires when real media loads.

### Transport Rail
- **Desktop:** sticky 100svh column; REEL LOG cap, rolling year (VT323 clamp(5.5rem→10rem), amber, chroma ghosting), SIDE A / timecode, 2px tape hairline (faint track + amber fill).
- **Mobile ≤900px:** horizontal sticky bar 2.6rem below the HUD, ground→transparent gradient backdrop, year 3.2rem, tc nowrap, hairline hidden.

### OSD HUD
- **Fixed top bar:** REC dot (pulsing) + tape identity left, tc counter right; VT323, tape-dim, mix-blend difference, pointer-events none.

### Replay Button
- **Shape:** 8px radius, transparent fill, 1px warm border (0.22 alpha), VT323 0.12em tracked uppercase "↻ REPLAY TAPE", padding 0.7em 1.5em.
- **Hover / Focus:** full amber fill, ground text, amber border; amber 2px focus ring offset 3px page-wide.
- **Behavior:** location.reload() — the tape rewinds honestly.

### Preloader
- **Full-screen ground lock:** REC SP / SP TRACK 00 corners, italic serif "Happy Birthday Angel" center (amber *Birthday* with chroma ghost), VT323 counter clamp(4.5rem→13rem) bottom-left at full-width 3px amber hairline, TRACKING read bottom-right; GSAP 0→100 in 2.6s power2.inOut; exit = fade content, two ground panels flash up 0.55s power3.in offset 0.13s.

## Do's and Don'ts

### Do:
- **Do** keep 100% black ground commitment — this world is Drenched-dark; a light section would break the CRT.
- **Do** pair every counter with tabular VT323 digits and keep them rolling (yPercent strip, stepped has a skew glitch).
- **Do** stamp every frame card with its frame label + timecode before shipping any state.
- **Do** wire reveals as ys-owned-by-scrub, opacity/clip owned by entrance (two tweens must never fight one property).
- **Do** honor prefers-reduced-motion (static everything) and the no-GSAP `.no-motion` static fallback.

### Don't:
- **Don't** put emotion in VT323 or measurement in Instrument Serif — the two-voice rule is the system's spine.
- **Don't** use amber beyond the ≤10% machine-light band; it is a light source, not a theme color.
- **Don't** draw flat shadowed cards, colored left/right borders, or rounded-rectangle stand-ins for content — the floating tape frame with real shadow lift is the only card.
- **Don't** place red or cyan anywhere except the REC dot, its glow, and paired ghosting shadows.
- **Don't** fake imagery: an unfilled frame stays SIGNAL LOST; a claimed memory needs the user's real file behind it.
