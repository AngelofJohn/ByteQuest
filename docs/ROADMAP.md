# ByteQuest Development Roadmap

**Last Updated:** December 10, 2025
**Current Phase:** Phase 2 - Testing & Polish
**Current Version:** 0.4.1

---

## 🎉 PHASE 1 COMPLETE

**Milestone Achieved:** December 5, 2025
**Version:** 0.4.0

Phase 1 (Dawnmere Vertical Slice) is now **Feature Complete**. All core systems have been implemented and are functional.

---

## Project Vision

An RPG-based language learning platform that makes learning engaging through story, characters, and game mechanics. Launching with French; additional languages planned as expansions. Positioned as an alternative to platforms like Duolingo, with a focus on immersion and narrative-driven learning.

---

## Phase Overview

| Phase | Name | Focus | Status |
|-------|------|-------|--------|
| **Phase 1** | Dawnmere Vertical Slice | Core systems, one complete zone | ✅ **COMPLETE** |
| **Phase 2** | Testing & Polish | Playtest, bug fixes, cleanup | 🟡 In Progress |
| **Phase 3** | Content Expansion | Haari Fields, Lurenium, more quests | ⬜ Planned |
| **Phase 4** | Polish & Features | Audio, achievements, social features | ⬜ Planned |
| **Phase 5** | Launch Prep | Testing, optimization, marketing | ⬜ Planned |

---

# PHASE 1: DAWNMERE VERTICAL SLICE

**Goal:** A fully playable demo with one complete zone demonstrating all core mechanics.

---

## ✅ COMPLETED SYSTEMS

### Core Engine
| Item | Status | Notes |
|------|--------|-------|
| Game state management | ✅ | Save/load working |
| HUD rendering | ✅ | HP, XP, gold display |
| Level progression | ✅ | XP table, level up |
| Character creation | ✅ | 3 classes |

### NPC System
| Item | Status | Notes |
|------|--------|-------|
| Tag-based NPC data | ✅ | Compact format with defaults |
| Visibility conditions | ✅ | appearsWhen/disappearsWhen |
| Dialog system | ✅ | Greeting, quest, idle dialog |
| 8 NPCs defined | ✅ | Dawnmere population |

### Quest System
| Item | Status | Notes |
|------|--------|-------|
| Quest acceptance/completion | ✅ | Full flow working |
| Multiple quest types | ✅ | Main, side, lesson, grammar |
| Prerequisites & chains | ✅ | Quest unlocking |
| Dual quest sources | ✅ | GAME_DATA + GRAMMAR_QUESTS |

### Vocabulary Lessons
| Item | Status | Notes |
|------|--------|-------|
| Question generation | ✅ | French ↔ English |
| Answer handling | ✅ | Correct/wrong tracking |
| Streak system | ✅ | Multipliers, bonuses |
| 8 vocabulary categories | ✅ | ~65 words |

### Grammar Lessons
| Item | Status | Notes |
|------|--------|-------|
| Conjugation questions | ✅ | être, avoir, aller, faire |
| Fill-in-blank questions | ✅ | Sentence completion |
| Gender match questions | ✅ | le/la matching |
| 6 grammar quests | ✅ | Full quest chain |

### Stats System
| Item | Status | Notes |
|------|--------|-------|
| 7 stats defined | ✅ | STA, STR, AGI, INS, LCK, DEV, KNW |
| Stamina → Max HP | ✅ | +5 per point |
| Strength → Damage reduction | ✅ | 10 → 5-10 |
| Agility → Streak protection | ✅ | First wrong doesn't break |
| Insight → Hint charges | ✅ | +0.5 per point |
| Luck → Avoid damage | ✅ | 2% per point |
| Luck → Shop discount | ✅ | 1% per point (max 10%) |
| Devotion → Reputation bonus | ✅ | +5% per point |
| Knowledge → Mastery retention | ✅ | 10% prevent decay |

### Spellbook System
| Item | Status | Notes |
|------|--------|-------|
| Two-panel UI | ✅ | TOC + content |
| 36 pages defined | ✅ | 15 verbs, 11 grammar, 2 reference, 8 lore |
| Unlock via quests | ✅ | spellbookUnlock rewards |
| Conjugation tables | ✅ | Standard format |
| Advanced tenses | ✅ | Passé composé, imparfait, futur, conditionnel, subjonctif |
| Lore/Timeline pages | ✅ | 8 eras: Ancients → Present |
| Nav button + S key | ✅ | Easy access |

### Spaced Repetition
| Item | Status | Notes |
|------|--------|-------|
| Mastery levels | ✅ | NEW → MASTERED |
| Review scheduling | ✅ | Interval-based |
| Decay prevention | ✅ | Knowledge stat integration |

### Reputation System
| Item | Status | Notes |
|------|--------|-------|
| Faction definitions | ✅ | Dawnmere, Horticulturists, etc. |
| Rank progression | ✅ | 6 ranks per faction |
| Devotion bonus | ✅ | Stat integration |

### Shop System
| Item | Status | Notes |
|------|--------|-------|
| Buy/sell mechanics | ✅ | Working |
| Luck discount | ✅ | Stat integration |
| Reputation discounts | ✅ | Planned hooks |

### Item System
| Item | Status | Notes |
|------|--------|-------|
| Equipment slots | ✅ | Helm, armor, weapon, accessory, ring |
| Consumables | ✅ | Health potions, bread |
| Stat bonuses | ✅ | From equipment |

### Other Systems
| Item | Status | Notes |
|------|--------|-------|
| Hint System | ✅ | Charges + word unlock |
| Title System | ✅ | 25+ titles defined |
| Boss Exam System | ✅ | Zone exams |
| Location System | ✅ | Travel structure |
| Tooltip System | ✅ | Created, needs integration |
| Settings System | ✅ | 6 tabs, all options wired |

---

## ✅ PHASE 1 COMPLETE

All Phase 1 features have been implemented.

---

## 📊 PHASE 1 FINAL METRICS

| Metric | Target | Achieved |
|--------|--------|----------|
| Systems complete | 15 | 17 ✅ |
| Vocabulary words | 50+ | ~65 ✅ |
| Grammar topics | 5+ | 28 ✅ |
| Spellbook pages | 8 | 36 ✅ |
| Lore entries | N/A | 8 eras ✅ |
| Quests | 10+ | 12+ ✅ |
| NPCs | 5+ | 17+ ✅ |
| Playtime | 30+ min | Est. 45 min ✅ |
| Tutorial | Basic | Arrival flow ✅ |
| Resource Minigames | N/A | 8 types ✅ |

---

# PHASE 2: TESTING & POLISH

**Goal:** Ensure all systems work correctly through comprehensive testing.
**Started:** December 6, 2025

---

## ✅ BUGS FIXED (Phase 2)

| Bug # | Description | Status |
|-------|-------------|--------|
| 24 | Hidden quest trigger typo (`npcsmet` → `npcsMet`) | ✅ Fixed |

## ⏳ BUGS PENDING

| Bug # | Description | Location | Priority |
|-------|-------------|----------|----------|
| 25 | Achievement NPC list mismatch (friendly_face) | statsSystem.js:324-327 | Medium |

---

## ⬜ PHASE 2 CHECKLIST

### High Priority - Bug Fixes
- [x] Fix hidden quest trigger typo (Bug #24)
- [x] Fix friendly_face achievement NPC list (Bug #25)
- [ ] Change `questionCount` from 3 to 5 for launch (game.js:112)
- [ ] Change boss exam count back to production value
- [x] Audit innerHTML usage for XSS vulnerabilities (48 locations audited - LOW RISK, added escapeHtml utility)

### High Priority - Testing
> Full test scenarios in PATCH_NOTES.md → Testing Reference (38 tests)

- [ ] **Core Flow Testing**
  - [ ] New game → Character creation → Start game
  - [ ] Talk to NPC → Accept quest → Complete quest
  - [ ] Vocabulary lesson → Answer questions → Gain XP
  - [ ] Wrong answer → Lose HP → HP reaches 0 flow
  - [ ] Level up flow
  - [ ] Save/Load game

- [ ] **Stats Effects Testing**
  - [ ] Stamina affects max HP (+5 per point)
  - [ ] Strength reduces damage taken
  - [ ] Agility protects streaks (once per lesson at 5+)
  - [ ] Insight affects hint charges
  - [ ] Luck avoids damage / shop discounts
  - [ ] Devotion affects reputation gains
  - [ ] Knowledge affects mastery retention

- [ ] **Grammar System Testing**
  - [ ] Sage Aldric appears after meeting_family quest
  - [ ] All 6 grammar quests completable
  - [ ] Conjugation questions render correctly
  - [ ] Fill-in-blank questions render correctly
  - [ ] Gender match questions render correctly
  - [ ] Spellbook pages unlock on quest completion

- [ ] **UI Screen Testing**
  - [ ] Profile screen opens and displays correctly
  - [ ] Progress screen tabs all work
  - [ ] Inventory screen works
  - [ ] Quest log updates correctly
  - [ ] Spellbook opens/closes correctly
  - [ ] Settings persist after reload
  - [ ] Map screen shows locations
  - [ ] Tooltips appear on hover

### Medium Priority - Code Cleanup
- [ ] Remove console.log debug statements (15+ locations)
- [ ] Remove "Phase 1: Skeleton" comments
- [ ] Remove "TBD after playtesting" comments
- [ ] Consolidate duplicate code patterns
- [ ] Add consistent error handling
- [ ] Remove unused variables in game.js:
  - [ ] `statusInfo` (line 499)
  - [ ] `srResult` (line 2418)
  - [ ] `stats` (line 3087)
  - [ ] `saveExists` (line 4664)

### Low Priority - Documentation
- [ ] Update BUG_REPORT.md with any new findings
- [ ] Review SYSTEMS_DESIGN.md for accuracy
- [ ] Update version to 0.4.1 after fixes

### Low Priority - Legal (Pre-Launch)
- [ ] Replace `[COMPANY NAME]` placeholders
- [ ] Replace `[YOUR ADDRESS]` placeholders
- [ ] Replace `[YOUR EMAIL]` placeholders
- [ ] Replace `[YOUR JURISDICTION]` placeholders
- [ ] Review and finalize all legal text

---

## 💡 FUTURE IDEAS

> See **PATCH_NOTES.md → Ideas Backlog** for raw feature ideas and brainstorming.

---

# PHASE 3: CONTENT EXPANSION (FUTURE)

**Goal:** Expand to multiple zones with full story progression.

---

## Locations

| Location | Level Range | Vocabulary Focus | Grammar Focus (Spellbook Unlocks) |
|----------|-------------|------------------|-----------------------------------|
| Dawnmere | 1-5 | Greetings, family, numbers | être, avoir, articles, gender, pronouns, contractions |
| Haari Fields | 5-10 | Agriculture, nature, food | aller, faire, -er verbs, prepositions, futur proche, negation |
| Lurenium | 10-15 | City, commerce, directions | -ir/-re verbs, adjectives, possessives, questions, adverbs |
| Frue Desert | 15-20 | Survival, weather, time | Passé composé, imparfait, comparatives, object pronouns |
| Ingregaard City | 20-25 | Politics, society, debate | Futur simple, conditionnel, subjonctif, avoir expressions |

## Story Beats

1. **Dawnmere:** Player arrives, meets settlers, learns basics
2. **Haari Fields:** Corruption threat introduced, meet Horticulturists
3. **Lurenium:** Ancient city, church politics, dark magic hints
4. **Frue Desert:** Survival challenge, lost knowledge
5. **Ingregaard:** Political divide, Old Guard vs Loyalists

## New Systems Needed

| System | Description | Complexity |
|--------|-------------|------------|
| **World Map** | Visual travel between locations | Medium |
| **Day/Night Cycle** | NPC schedules, events | Medium |
| **Crafting** | Professions system from design doc | High |
| **Collectables** | Ancient relics, lore items | Low |
| **Typed Input Mode** | Free-text answers with spelling tolerance | Medium |

## Typed Input Details (When Implemented)

- **Spelling tolerance tiers:** Exact → Accent-stripped → 1 char off → Wrong
- **Partial credit:** 100% / 75% / 50% / 0% points
- **Balance:** HP damage, streak breaks, XP scaling
- **Accents:** On-screen keyboard or accept without
- **Toggle:** Settings option or specific quest types only

---

# PHASE 3: POLISH & FEATURES (FUTURE)

## Audio

| Item | Notes |
|------|-------|
| Background music | Per-location themes |
| Sound effects | UI clicks, correct/wrong, level up |
| French pronunciation | Native speaker audio for vocabulary |

## Visual

| Item | Notes |
|------|-------|
| Character portraits | NPC art |
| Location backgrounds | Pixel art scenes |
| Animations | Sprite movements, effects |
| Logo & branding | Final visual identity |

## Engagement

| Item | Notes |
|------|-------|
| Achievements | ~50 achievements |
| Daily login rewards | Streak bonuses |
| Weekly challenges | Special events |
| Leaderboards | Optional competitive element |

## Quality of Life

| Item | Notes |
|------|-------|
| Keyboard shortcuts | Full keyboard navigation |
| Accessibility | Screen reader support, colorblind modes |
| Mobile responsive | Touch-friendly UI |
| Offline mode | Service worker caching |

---

# PHASE 4: LAUNCH PREP (FUTURE)

## Testing

| Item | Notes |
|------|-------|
| Playtest sessions | External feedback |
| Bug fixing | Priority issues |
| Balance tuning | XP, gold, difficulty curves |
| Performance | Load times, memory usage |

## Legal

| Item | Status |
|------|--------|
| Terms of Service | Draft exists |
| Privacy Policy | Draft exists |
| EULA | Draft exists |
| Cookie Policy | Draft exists |
| Company registration | Not started |

## Marketing

| Item | Notes |
|------|-------|
| Landing page | Marketing website |
| Social media | Twitter, TikTok, Reddit |
| Press kit | Screenshots, description |
| Demo video | Gameplay trailer |

## Infrastructure

| Item | Notes |
|------|-------|
| Hosting | Server setup |
| Database | User accounts, progress |
| Analytics | Usage tracking |
| Payment system | Subscription/purchase |

---

# OPEN QUESTIONS

> See **PATCH_NOTES.md** for all pending design decisions (62 questions across 15 categories).

---

# SUCCESS METRICS

## Phase 1 Complete When:

- [x] Core game loop functional
- [x] All Dawnmere NPCs implemented
- [x] Vocabulary lessons working
- [x] Grammar lessons working
- [x] All stats affect gameplay
- [x] Spellbook functional
- [ ] Profile/Progress screens tested
- [ ] Full playtest passed
- [ ] No critical bugs
- [ ] 30+ minutes of content

## Overall Project Success:

- [ ] Users learn measurable French vocabulary
- [ ] Retention better than traditional apps
- [ ] Positive user feedback on engagement
- [ ] Sustainable business model

---

# IMMEDIATE NEXT STEPS

## Next Session
1. ⬜ Test Profile screen
2. ⬜ Test Progress screen  
3. ⬜ Fix any issues found
4. ⬜ Complete tooltip integration

## This Week
5. ⬜ Full playthrough test
6. ⬜ Bug fixes
7. ⬜ Tutorial/onboarding flow
8. ⬜ Review system UI

## Phase 1 Completion
9. ⬜ External playtest feedback
10. ⬜ Final bug fixes
11. ⬜ Legal document placeholders (if company info available)
12. ⬜ Tag version v0.4.0

---

# CONTENT PIPELINE

## Overview

How vocabulary, quests, and content gets created at scale.

### Pipeline Stages

```
DRAFT → REVIEW → FORMAT → TEST → RELEASE
```

### Scaling Options

| Phase | Approach |
|-------|----------|
| **Now** | Spreadsheet → Converter script |
| **With team** | Simple admin panel |
| **At scale** | Full CMS |

### Minimum Viable Pipeline

| Component | Effort | Status |
|-----------|--------|--------|
| Spreadsheet template | 1-2 hours | Pending |
| Converter script (CSV → JS) | 2-4 hours | Pending |
| Validation script | 2-4 hours | Pending |
| Documentation | 1-2 hours | Pending |

### Validation Rules

| Rule | Severity |
|------|----------|
| No duplicates | Error |
| Required fields present | Error |
| Valid French characters | Error |
| Hint length < 100 chars | Warning |
| Category exists | Error |

### Templates Needed

- Vocabulary spreadsheet (french, english, hint, category, difficulty)
- Quest spreadsheet (id, name, type, objectives, rewards)
- Grammar spreadsheet (id, name, explanation, examples)

---

## Changelog

| Date | Changes |
|------|---------|
| Dec 10, 2025 | Spellbook expanded to 36 pages: 15 verbs, 11 grammar, 2 reference, 8 lore (timeline: Ancients → Exile). Added advanced grammar topics, zone grammar mapping. |
| Dec 9, 2025 | XP balance v2 (+50% requirements, -30% rewards), class descriptions, legal docs (GDPR, Dialect) |
| Dec 7, 2025 | Added Content Pipeline section (consolidated from CONTENT_PIPELINE.md) |
| Dec 4, 2025 | Updated to version 0.3.3, added Resource Minigames system (8 types), fixed 23 bugs total |
| Dec 4, 2025 | Added Settings System to completed, updated metrics (15/15 systems, 0 bugs), updated progress to 90%, removed README from remaining (completed) |
| Dec 3, 2025 | Major update: separated current (Phase 1) from future (Phase 2-4), updated all completion status, added metrics, reorganized structure |
| Nov 30, 2025 | Added typed input to Phase 2 |
| Nov 30, 2025 | Initial roadmap created |

---

*Roadmap maintained as part of ByteQuest development.*
