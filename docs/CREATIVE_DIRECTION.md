# ByteQuest Creative Direction

**Status:** Phase 2 - Testing & Polish
**Last Updated:** December 10, 2025
**Priority:** Phase 2-3

---

## Table of Contents

1. [Overview](#overview)
2. [Game Name](#game-name)
3. [Art Direction](#art-direction)
4. [Audio Direction](#audio-direction)
5. [Implementation Plan](#implementation-plan)
6. [Open Questions](#open-questions)

---

## Overview

This document consolidates all creative direction for ByteQuest: visual identity, audio design, and branding.

### Goals

- Create a **cozy, inviting world** that players want to spend time in
- **Support language learning** without visual distraction
- Establish **consistent visual and audio language** across all elements
- Define **brand identity** through name and aesthetic

---

# GAME NAME

## Current Working Title: ByteQuest

### Top Name Candidates

| Name | Why |
|------|-----|
| **Verandum** | Already your world - unique, ownable, mysterious |
| **Lightspoken** | Ties to lore, evocative, implies "spoken language" |
| **Spell & Sword** | Double meaning (spelling/magic), catchy |
| **Inkborn** | Memorable, fantasy feel, relates to written word |
| **Parlons** | French, inviting, simple |

### All Name Ideas

**Language Learning + RPG:**
LinguaQuest, WordForge, TongueQuest, LexiconLands, VerbVenture, ParleyPath, FluentRealm, SpeakStone, GrammarGuild, DialogueDungeon

**Fantasy/World-Focused:**
Verandum, Realm of Words, The Turuem Chronicles, Dawnmere, Lightspoken, Tongues of Turuem, The Scholar's Path, Inkborn, Runeword, Scrollbound

**Simple/Memorable:**
Parlay, Fluent, Motley, Lexica, Lingua, Vox, Dicta, Verba

**Playful/Unique:**
Babelize, Polyglot Tavern, The Word Smithy, Spell & Sword, Quest for Fluency, Tongue & Blade, The Rosetta Realm

**French-Inspired:**
Parlons ("Let's speak"), Mot a Mot ("Word by word"), Belle Langue ("Beautiful language"), Aventure de Mots ("Adventure of words")

### Evaluation Criteria

| Criteria | Weight |
|----------|--------|
| **Memorable** | Easy to remember and spell? |
| **Unique** | Searchable? Not confused with other products? |
| **Available** | Domain, social handles, trademark? |
| **Scalable** | Works beyond French? Beyond one game? |
| **Evocative** | Does it hint at the experience? |

### Availability Check Tools

- namechk.com - Social handle availability
- namecheckr.com - Domain + social
- instantdomainsearch.com - Quick domain check
- trademarkia.com - Trademark search

---

# ART DIRECTION

## Target Aesthetic

### Core Visual Identity

| Attribute | Description |
|-----------|-------------|
| **Era Feel** | 16-bit / SNES-era with modern refinements |
| **Mood** | Warm, inviting, adventurous |
| **Pixel Density** | Visible but refined pixelation |
| **Color Approach** | Rich, saturated, harmonious |

### Reference Games

| Game | What to Learn |
|------|---------------|
| **Stardew Valley** | Cozy pixel art, warm colors |
| **Octopath Traveler** | HD-2D style, lighting, depth |
| **Eastward** | Detailed pixel environments |
| **CrossCode** | UI design, polished pixel art |
| **Celeste** | Clean pixel art, expressive characters |

---

## Art Style Options

### Option A: Classic Pixel Art (16-bit)
- Resolution: 320x180 base, scaled up
- Character Size: 16x24 to 32x48 pixels
- Reference: Stardew Valley, classic SNES

### Option B: HD-2D Style
- Modern lighting, depth of field, particles
- Reference: Octopath Traveler
- Pros: Stunning. Cons: Complex, expensive

### Option C: Modern Pixel Art
- Resolution: 480x270 or similar
- Character Size: 32x48 to 48x64 pixels
- Reference: Eastward, CrossCode

### Option D: Hybrid (Recommended for Retro Feel)
- Backgrounds: Detailed pixel art or AI-generated
- Characters: Clean 32x48 pixel sprites
- UI: Modern pixel-styled with polish

### Option E: Vector Art
- SVG-based graphics, infinitely scalable
- Reference: Hollow Knight, Gris, Hades
- Best for: UI elements, icons, portraits

---

## Color Palette

### Primary Colors

| Color | Hex | Use |
|-------|-----|-----|
| Teal/Cyan | #4ECDC4 | Roofs, water, magical accents |
| Warm Brown | #8B7355 | Wood, buildings, earth |
| Forest Green | #228B22 | Grass, trees, nature |
| Golden Yellow | #FFD700 | UI accents, important items |
| Sky Blue | #87CEEB | Sky, peaceful elements |
| Sunset Orange | #FF6B35 | Warmth, fire, energy |

### UI Colors (Current)

| Color | Hex | Use |
|-------|-----|-----|
| Dark Background | #1a1a2e | Main backdrop |
| Panel Background | #1f2833 | Panels, modals |
| Gold Accent | #ffd700 | Headers, important |
| Text Light | #edf2f4 | Primary text |
| Accent Red | #e63946 | HP, errors |
| Accent Green | #2a9d8f | Success, XP |
| Accent Blue | #4361ee | Links, interactive |

### Faction Colors

| Faction | Primary | Secondary |
|---------|---------|-----------|
| The Light | Gold #FFD700 | White #FFFAF0 |
| The Corruption | Purple #4A0E4E | Black #1a1a1a |
| Old Guard | Blue #2E5090 | Silver #C0C0C0 |
| Loyalists | Red #8B0000 | Gold #DAA520 |
| Order of the Dawn | Soft Gold #F0E68C | Cream #FFFDD0 |

---

## Character Design

### Player Classes

| Class | Visual Theme | Key Elements |
|-------|--------------|--------------|
| Scholar | Academic, wise | Robes, book, glasses |
| Warrior | Strong, practical | Light armor, sword |
| Traveler | Adventurous | Cloak, backpack, map |

### Sprite Specifications

| Element | Size | Notes |
|---------|------|-------|
| Base Sprite | 32x48 pixels | Standing idle |
| Animation Frames | 4-8 per action | Walk, idle, talk |
| Portrait | 64x64 or 96x96 | Dialogue close-up |
| Emotion Variants | 3-5 per character | Happy, sad, angry |

### Animation Requirements

**Currently Implemented (CSS):**
- UI transitions (buttons, hovers, 0.1-0.3s ease)
- Feedback animations (correct/wrong pulse, shake)
- Streak effects (pulse-glow, streak-break)
- Level up pulse
- Damage flash (red overlay)
- Quest marker bounce
- Tutorial highlight pulse
- Minigame feedback (fishing bite alert, etc.)

**Priority Animations Needed:**

| Priority | Animation | Purpose | Implementation |
|----------|-----------|---------|----------------|
| **High** | NPC talking indicator | Shows active speaker | CSS pulse on portrait or speech bubble |
| **High** | Zone travel transition | Zone-to-zone feels meaningful | Fade/slide transition, ~0.5s |
| **High** | Reward pop-up | Gold/XP/items feel impactful | Scale + fade, particle optional |
| **Medium** | Quest complete fanfare | Satisfying completion | Banner slide + glow effect |
| **Medium** | Dialogue typewriter | Text appears letter-by-letter | JS interval, skippable |
| **Low** | NPC idle sway | Scene feels alive | Subtle CSS transform loop |
| **Low** | Weather effects | Zone atmosphere | CSS particles (rain, dust) |
| **Low** | Background parallax | Depth on scroll/movement | CSS transform layers |

**Animation Principles:**
- Keep durations short (0.2-0.5s for feedback, 1-2s max for ambient)
- All animations should be skippable or non-blocking
- Respect `prefers-reduced-motion` accessibility setting
- Use CSS transforms over position changes (GPU accelerated)
- Easing: `ease-out` for entrances, `ease-in` for exits

**Sprite Animation (Future):**
- Idle: 2-4 frames, 0.5s loop
- Walk: 4-8 frames, synced to movement
- Talk: 2-3 frames, loop while dialogue open
- Emote: 3-5 frames, one-shot on trigger

---

## Typography / Fonts

### Font Categories Needed

| Category | Purpose | Current | Notes |
|----------|---------|---------|-------|
| **Display** | Headers, titles, quest names | Press Start 2P? | Pixel style, bold |
| **Body** | Dialogue, descriptions | System/Pixel | Readable at small sizes |
| **UI** | Buttons, labels, stats | Same as body? | Clear, compact |
| **French Text** | Vocabulary, lessons | Must support accents | é è ê ë ç à â î ï ô û ù œ |

### Font Style Options

| Option | Fonts | Pros | Cons |
|--------|-------|------|------|
| **A: Pure Pixel** | Press Start 2P, Silkscreen | Authentic retro | Hard to read, limited chars |
| **B: Modern Pixel** | Pixelify Sans, VT323 | Readable, retro feel | Less authentic |
| **C: Hybrid** | Pixel headers + clean body | Best of both | Inconsistent? |
| **D: Clean Modern** | Inter, Nunito, system fonts | Very readable | Not retro |

### Font Considerations

| Factor | Notes |
|--------|-------|
| **French Support** | Must render all French accents correctly |
| **Readability** | Body text must be comfortable for extended reading |
| **Pixel Density** | Should match art style (16-bit vs modern) |
| **Loading** | Web fonts add latency; consider font-display: swap |
| **Fallbacks** | System font stack for reliability |
| **Accessibility** | Support font size scaling in settings |

### Potential Font Choices

**Pixel/Retro:**
- Press Start 2P (Google Fonts) - Classic 8-bit
- Silkscreen (Google Fonts) - Clean pixel
- VT323 (Google Fonts) - Terminal style
- Pixelify Sans (Google Fonts) - Modern pixel
- 04b03, 04b11 (free) - Tiny pixel fonts

**Readable Body:**
- Inter (Google Fonts) - Modern, excellent French support
- Nunito (Google Fonts) - Rounded, friendly
- Source Sans Pro - Adobe, professional
- System UI stack - No loading time

**Fantasy/RPG:**
- Cinzel (Google Fonts) - Roman capitals, elegant
- MedievalSharp (Google Fonts) - Fantasy feel
- Almendra (Google Fonts) - Medieval inspired

### Current CSS Font Stack

```css
--font-display: 'Press Start 2P', cursive;  /* Headers */
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

---

## Number Formatting

### Why This Matters

Large numbers appear throughout the game: gold, XP, damage, stats. How we display them affects readability and game feel.

### Formatting Options

| Option | Example (1,234,567) | Example (1.5 billion) | Pros | Cons |
|--------|---------------------|----------------------|------|------|
| **A: Raw** | 1234567 | 1500000000 | Precise | Hard to read at scale |
| **B: Commas** | 1,234,567 | 1,500,000,000 | Familiar (US/UK) | Long strings, locale issues |
| **C: Spaces** | 1 234 567 | 1 500 000 000 | International (EU) | Unfamiliar to some |
| **D: K/M/B Suffix** | 1.23M | 1.5B | Compact, readable | Less precise |
| **E: Abbreviated** | 1.2M | 1.5B | Very compact | Precision loss |
| **F: Hybrid** | 1,234,567 / 1.23M | Switches at threshold | Best of both | More complex |
| **G: IdleOn Style** | 1.23M | 1.5B → Qa, Qi, Sx... | Handles huge numbers | Learning curve |

### IdleOn Number System

IdleOn (idle game) uses an extended suffix system for very large numbers common in incremental games:

| Suffix | Name | Value |
|--------|------|-------|
| K | Thousand | 10^3 |
| M | Million | 10^6 |
| B | Billion | 10^9 |
| T | Trillion | 10^12 |
| Qa | Quadrillion | 10^15 |
| Qi | Quintillion | 10^18 |
| Sx | Sextillion | 10^21 |
| Sp | Septillion | 10^24 |
| Oc | Octillion | 10^27 |
| No | Nonillion | 10^30 |
| Dc | Decillion | 10^33 |
| Ud | Undecillion | 10^36 |
| Dd | Duodecillion | 10^39 |
| ... | (continues) | ... |

**Example displays:**
- 1,500 → 1.5K
- 2,340,000 → 2.34M
- 5,670,000,000,000 → 5.67T
- 1.2e18 → 1.2Qi

**Best for:** Games with exponential growth, prestige mechanics, or idle elements where numbers can grow very large.

### Recommendation

**Hybrid approach (Option F)** for most cases:
- Show full numbers with commas under 10,000
- Switch to K/M/B suffix above 10,000
- Consider IdleOn extended suffixes if account progression leads to very large numbers

### Number Display Contexts

| Context | Recommended Format | Notes |
|---------|-------------------|-------|
| Gold display | Hybrid (commas → K/M) | Players want to see exact gold for purchases |
| XP display | Hybrid | Progress feels better with exact numbers early |
| Damage numbers | Abbreviated (1.2K) | Quick readability during combat |
| Shop prices | Full with commas | Clarity for purchasing decisions |
| Stats panel | Hybrid | Balance precision and readability |
| Leaderboards | Abbreviated | Compact display |

---

## UI Design

### Target UI Style

- Golden ornate frames on panels
- Parchment textures for book elements
- Icon-based navigation
- Character portraits in dialogue
- Warm dark theme

### UI Elements Needed

| Category | Icons Needed |
|----------|--------------|
| Navigation | World, Quests, Inventory, Map, Settings, Save |
| Stats | Heart, Star, Sword, Shield, Book, Coin |
| Items | Potions, weapons, armor, food, keys, scrolls |
| Actions | Accept, Decline, Talk, Shop, Learn |
| Status | Quest marker (!), Turn-in (?), New, Locked |

---

## Asset Sources

### Recommended Hybrid Approach

| Content | Source | Rationale |
|---------|--------|-----------|
| Backgrounds | AI-generated + editing | Volume needed |
| Player Sprites | Commissioned | Core identity |
| Key NPCs | Commissioned | Story importance |
| Generic NPCs | Asset packs | Less critical |
| UI Icons | Asset pack + custom | Mix for coverage |
| Effects | Asset packs | Common elements |

### Asset Pack Sources

| Source | Price | Notes |
|--------|-------|-------|
| itch.io | $5-50 | Great indie selection |
| GameDev Market | $10-100 | Professional quality |
| OpenGameArt | Free | Check licenses |
| Kenney.nl | Free | High quality, CC0 |

---

# AUDIO DIRECTION

## Audio Categories

| Category | Purpose | Priority |
|----------|---------|----------|
| Background Music | Atmosphere, immersion | High |
| Sound Effects | Feedback, interaction | High |
| Ambient Sound | World feels alive | Medium |
| Voice/Pronunciation | Language learning | Low (defer) |

---

## Music Style Options

### Option A: Chiptune / 8-bit
- Retro, nostalgic, matches pixel art
- Reference: Undertale, Shovel Knight

### Option B: Orchestral Fantasy
- Epic, immersive, cinematic
- Reference: Final Fantasy, Octopath Traveler

### Option C: Folk / Acoustic (Recommended)
- Warm, European, grounded, cozy
- Reference: Stardew Valley, Spiritfarer

### Option D: Lo-fi / Ambient
- Relaxed, study-friendly, modern
- Reference: Coffee Talk, A Short Hike

### Option E: Hybrid
- Orchestral core + chiptune accents
- Flexibility, matches both pixel art and epic story

---

## Location Themes

| Location | Mood | Instruments | Tempo |
|----------|------|-------------|-------|
| Dawnmere | Hopeful | Acoustic guitar, flute | Moderate |
| Haari Fields | Pastoral | Fiddle, woodwinds | Slow-moderate |
| Lurenium | Ancient, grand | Orchestra, bells | Slow, building |
| Frue Desert | Harsh, lonely | Sparse percussion | Slow |
| Renque | Somber | Minimal, dissonant | Very slow |
| Dranmere | Oppressive | Dark orchestral | Moderate |

---

## Sound Effects - Full Inventory

### Priority 1: Core Loop (Must Have)

| Category | Action | Sound Type | Notes |
|----------|--------|------------|-------|
| **Lessons** | Correct answer | Positive chime | Satisfying, not annoying on repeat |
| | Wrong answer | Soft thud/buzz | Not harsh - learning is OK |
| | Streak milestone (5, 10...) | Ascending chimes | Builds excitement |
| | Lesson complete | Short fanfare | Celebratory |
| | Perfect lesson | Special fanfare | Extra rewarding |
| **UI** | Button click | Soft click | Subtle |
| | Menu open | Soft whoosh | Quick |
| | Menu close | Reverse whoosh | Quick |
| | Tab switch | Light tap | Different from button |
| | Error/invalid | Soft buzz | Not jarring |

### Priority 2: Progression (Should Have)

| Category | Action | Sound Type |
|----------|--------|------------|
| **XP/Leveling** | XP tick up | Soft ding |
| | Level up | Grand fanfare |
| | Skill point earned | Sparkle |
| **Gold** | Coins received | Coin clink |
| | Purchase made | Cash register/clink |
| | Can't afford | Dull thud |
| **Quests** | Quest accepted | Paper unfold |
| | Quest progress | Subtle chime |
| | Quest complete | Triumphant stinger |

### Priority 3: World/Social (Nice to Have)

| Category | Action | Sound Type |
|----------|--------|------------|
| **NPCs** | Dialogue open | Page turn / soft chime |
| | Dialogue advance | Soft click |
| | Dialogue close | Paper fold |
| | New NPC met | Discovery chime |
| **Reputation** | Rep gained | Positive tone |
| | Rep lost | Minor chord |
| | Rank up | Fanfare variant |
| | Faction discovered | Mystery chime |
| **Shop** | Shop open | Door bell / coins |
| | Item purchased | Coin exchange |
| | Item sold | Different clink |
| | Shop closed | Door close |

### Priority 4: Polish (Later)

| Category | Action | Sound Type |
|----------|--------|------------|
| **Achievements** | Achievement unlocked | Trophy sound + chime |
| | Bronze tier | Simple ding |
| | Silver tier | Brighter chime |
| | Gold tier | Triumphant note |
| | Platinum tier | Epic fanfare |
| **Inventory** | Item acquired | Pick up sound |
| | Item equipped | Equip swoosh |
| | Item used | Context-dependent |
| **Notifications** | Toast appear | Soft pop |
| | Important alert | Attention chime |
| **Travel** | Location change | Transition whoosh |
| | Fast travel | Magic whoosh |

### SFX Design Guidelines

| Guideline | Rationale |
|-----------|-----------|
| **Keep it subtle** | Players hear these hundreds of times |
| **Vary pitch slightly** | Prevents monotony (especially coins, clicks) |
| **Match the mood** | Cozy/warm sounds for a cozy game |
| **Distinct but cohesive** | Each sound identifiable, but same "family" |
| **Test at low volume** | Many players play with reduced SFX |

### SFX Count Summary

| Priority | Category | Count |
|----------|----------|-------|
| P1 | Core Loop | ~10 sounds |
| P2 | Progression | ~9 sounds |
| P3 | World/Social | ~12 sounds |
| P4 | Polish | ~11 sounds |
| **Total** | | **~42 sounds** |

---

## Audio Sources

### Recommended Hybrid Approach

| Content | Source | Rationale |
|---------|--------|-----------|
| Main Theme | Commissioned | Memorable, unique |
| Location Music | Asset packs or AI | Volume needed |
| Jingles | Commissioned or packs | Quality matters |
| Sound Effects | Free sources + packs | Variety needed |

### Audio Sources

| Source | Type | Notes |
|--------|------|-------|
| OpenGameArt.org | Free | Variable quality |
| Freesound.org | Free | Great for SFX |
| itch.io | $5-50 | Good indie music |
| AIVA | AI | Orchestral, clear licensing |

---

## Voice & Pronunciation (Deferred)

**Current Status:** Not included - would significantly increase scope.

**Future Options:**
- Text-to-Speech (easy, robotic)
- Recorded Native Speaker (authentic, expensive)
- AI Voice Generation (scalable, licensing unclear)

**Recommendation:** Defer to post-launch or Phase 4+

---

# IMPLEMENTATION PLAN

## Phase A: Foundation (Current)
- [x] Define creative direction document
- [ ] Choose art style (pixel vs vector vs hybrid)
- [ ] Define final color palette
- [ ] Decide on game name

## Phase B: Asset Collection
- [ ] Research and bookmark asset packs
- [ ] Get quotes for commissioned work
- [ ] Generate AI background concepts
- [ ] Create style guide

## Phase C: UI Implementation
- [ ] Replace emoji icons with pixel art
- [ ] Add panel frame graphics
- [ ] Create spellbook visual redesign
- [ ] Add character portraits

## Phase D: Audio Implementation
- [ ] Source/create UI sound effects
- [ ] Implement music system
- [ ] Add title screen music
- [ ] Add lesson/quiz music

## Phase E: Polish
- [ ] Particle effects
- [ ] Loading screens
- [ ] Title screen redesign
- [ ] Ambient animations

---

# OPEN QUESTIONS

| Question | Options | Status |
|----------|---------|--------|
| Final game name | ByteQuest? Verandum? Lightspoken? | Pending |
| Art style | Classic pixel? Modern pixel? Vector? | Pending |
| Music style | Chiptune? Folk? Orchestral? Hybrid? | Pending |
| Art budget | $0? $100-500? More? | Pending |
| Pronunciation audio | Include? Defer? What technology? | Pending |
| **Typography** | | |
| Display font | Press Start 2P? Pixelify Sans? Custom pixel? | Pending |
| Body font | System fonts? Inter? Nunito? Pixel font? | Pending |
| Font approach | Pure pixel? Hybrid? Clean modern? | Pending |
| French accent rendering | Which fonts handle œ, ç, accents best? | Pending |
| Font loading strategy | Google Fonts CDN? Self-hosted? System only? | Pending |
| Font size scaling | Settings option? Fixed sizes? CSS rem units? | Pending |
| Faction crests | Custom pixel art for each faction? Size/resolution? | Decided: Yes |
| Crest display locations | Reputation panel? Items? NPC dialogue? Banners? | Pending |
| Crest cosmetic unlocks | Earn crest cosmetics at rep milestones? Player card? | Pending |
| **Number Formatting** | | |
| Number format style | Raw? Commas? K/M/B suffix? Hybrid? IdleOn extended? | Pending |
| Format threshold | At what value switch from full to abbreviated? (1K? 10K? 100K?) | Pending |
| Large number support | Will account progression need IdleOn-style extended suffixes? | Pending |

---

## Changelog

| Date | Changes |
|------|---------|
| Dec 7, 2025 | Consolidated ART_DIRECTION, AUDIO_DIRECTION, NAME_IDEAS into single document |
| Dec 6, 2025 | Added vector art options |
| Dec 4, 2025 | Original documents created |

---

*This document defines the creative direction for ByteQuest. Update as decisions are made.*
