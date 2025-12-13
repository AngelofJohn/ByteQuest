# ByteQuest Systems Index

**Quick Reference:** December 10, 2025
**Full Docs:** [SYSTEMS_DESIGN.md](SYSTEMS_DESIGN.md)

---

## Quick Navigation

| System | File | Lines | Section |
|--------|------|-------|---------|
| **Core Engine** | game.js | ~3,300 | [Architecture](#architecture-overview) |
| **Quest System** | questSystem.js | ~815 | [Quest System](#quest-system) |
| **Stats System** | statsSystem.js | ~840 | [Stats System](#stats-system) |
| **Spellbook** | spellbookSystem.js | ~712 | [Spellbook System](#spellbook-system) |
| **Items/Inventory** | itemSystem.js | ~706 | [Item System](#item--inventory-system) |
| **Reputation** | reputationSystem.js | ~542 | [Reputation System](#reputation-system) |
| **Spaced Repetition** | spacedRepetition.js | ~495 | [SRS System](#spaced-repetition-system) |
| **Tooltips** | tooltipSystem.js | ~447 | [Tooltip System](#tooltip-system) |
| **Boss Exams** | bossExamSystem.js | ~442 | [Boss Exam System](#boss-exam-system) |
| **Shops** | shopSystem.js | ~429 | [Shop System](#shop-system) |
| **Locations** | locationSystem.js | ~428 | [Location System](#location-system) |
| **Titles** | titleSystem.js | ~416 | [Title System](#title-system) |
| **Hints** | hintSystem.js | ~298 | [Hint System](#hint-system) |

---

## By Category

### Core Systems (Implemented)
- Architecture Overview → game.js initialization, file structure
- Core Game State → GameState object, save/load
- Player Systems → HP, XP, leveling, classes
- Stats System → 7 stats, effects, allocation

### Learning Systems (Implemented)
- Lesson System → vocabulary questions, streaks, scoring
- Grammar System → conjugation, fill-in-blank, gender match
- Spellbook System → 36 pages (15 verbs, 11 grammar, 2 ref, 8 lore)
- Hint System → charges, word unlock, Insight stat
- Spaced Repetition → mastery levels, review scheduling

### World Systems (Implemented)
- Quest System → types, prerequisites, rewards, chains
- NPC System → tags, visibility, dialogue, stateOverrides
- Location System → travel, zone requirements
- Reputation System → factions, ranks, Devotion bonus

### Economy Systems (Implemented)
- Item & Inventory → equipment slots, consumables
- Shop System → buy/sell, Luck discount, NPC vendors
- Account Progression → XP/Gold multipliers, upgrade tiers

### Challenge Systems (Implemented)
- Boss Exam System → zone exams, multi-question
- Title System → 25+ titles, unlock conditions

### Future Systems (Phase 3+)
- Resource & Skill Infrastructure → professions, gathering
- Resource Minigames → 8 types designed
- Endgame Content → NG+, prestige, competitive
- Endgame Lore Bosses → narrative challenges
- Tutorial System → onboarding flow

---

## Key Data Files

| File | Content | Records |
|------|---------|---------|
| gamedata.js | Quests, items, locations | ~900 lines |
| grammar.js | French grammar rules | ~886 lines |
| grammarQuests.js | Grammar quest definitions | ~462 lines |
| npcs.js | NPC definitions | ~453 lines |
| vocabulary.js | French vocabulary | ~210 lines (~65 words) |

---

## System Initialization Order

```
1. questManager        → Quest logic
2. srManager           → Spaced repetition
3. statsManager        → Player stats
4. reputationManager   → Faction reputation
5. itemManager         → Items & inventory
6. shopManager         → NPC shops
7. hintManager         → Lesson hints
8. locationManager     → Travel system
9. bossExamManager     → Zone exams
10. titleManager       → Player titles
11. spellbookManager   → Grammar reference
```

---

## Common Lookups

### Stats Effects
| Stat | Primary Effect | Secondary |
|------|---------------|-----------|
| STA | +5 Max HP per point | - |
| STR | Reduces damage (10→5-10) | - |
| AGI | Streak protection (5+) | - |
| INS | +0.5 hint charges | - |
| LCK | 2% dodge damage | 1% shop discount |
| DEV | +5% reputation gains | - |
| KNW | 10% prevent mastery decay | - |

### Mastery Levels
```
NEW → LEARNING → FAMILIAR → PRACTICED → MASTERED
```

### Equipment Slots
```
helm, armor, weapon, accessory, ring
```

### Reputation Ranks
```
Stranger → Known → Friendly → Respected → Honored → Exalted
```

---

## Where to Find Things

| Looking for... | Check |
|----------------|-------|
| Bug list | PATCH_NOTES.md → Known Bugs |
| Open questions | PATCH_NOTES.md → Open Questions |
| Feature ideas | PATCH_NOTES.md → Ideas Backlog |
| Test scenarios | PATCH_NOTES.md → Testing Reference |
| Lore/story | WORLD_BIBLE.md |
| Art/audio specs | CREATIVE_DIRECTION.md |
| Business/pricing | BUSINESS_PLAN.md |
| Dev phases | ROADMAP.md |

---

*This index provides quick reference. For full technical details, see [SYSTEMS_DESIGN.md](SYSTEMS_DESIGN.md).*
