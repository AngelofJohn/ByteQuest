# Dev Log #010 - Systems Integration & Product Scope

**Date:** December 9, 2025
**Version:** 0.4.4
**Session Type:** Systems Implementation + Strategic Planning

---

## What We Built

### Language Selection System

New players now choose their target language after character creation.

**Flow:**
```
Name → Class → Language → Start Game
```

**Implementation:**
- `showLanguageSelection()` function in game.js
- French available, Spanish/German/Italian locked ("Coming Soon")
- Language stored in `GameState.player.language`
- Card-based UI with selection highlighting

**Files:**
- js/game.js:4297-4349
- css/style.css:1657-1721

---

### Account Progression Integration

The account upgrade system is now fully wired into the game economy.

**XP Multipliers:**
- `addXP()` and `addXPSilent()` now check for active multipliers
- Bonus shown in notifications: "+55 XP (50 + bonus)"

**Gold Multipliers:**
- New `addGold()` and `addGoldSilent()` functions
- Quest rewards use `addGoldSilent()` for consistent application

**NPC Vendors (3):**
| NPC | Location | Upgrade Category |
|-----|----------|------------------|
| Sage Aldric | Dawnmere | Learning (XP boosts) |
| Merchant | Dawnmere | Resources (gold boosts) |
| Elder Urma | Dawnmere | Gameplay (health, inventory) |

**Files:**
- js/game.js:887-925 (gold functions)
- js/game.js:1113-1137 (XP with multiplier)
- js/shopSystem.js:121-194 (NPC shops)

---

## Strategic Decisions Made

### Product Scope & Positioning

**What ByteQuest IS:**
- Vocabulary fundamentals
- Basic grammar
- Sentence structure
- Confidence builder
- Intimidation reducer

**What ByteQuest IS NOT:**
- Fluency trainer
- Conversational ability
- Advanced proficiency

**Positioning Statement:**
> "Learn language fundamentals through an RPG story" — NOT "Become fluent through gaming"

**Why this matters:** Honest scope = appropriate expectations = satisfied players

---

### Tiered Crafting by Zone

**Decision:** Zone-based progression for gathering/crafting.

| Zone | Systems Available |
|------|-------------------|
| Dawnmere | Gathering only (mining, herbalism, woodcutting, fishing) |
| Haari Fields | Crafting unlocks (smithing, alchemy, cooking) |
| Later Zones | Advanced crafting, specializations, cross-profession |

**Benefits:**
- Reduces new player complexity
- Natural tutorial pacing
- Content pipeline matches dev work
- Zone identity (Dawnmere = gathering, Haari = crafting)

---

## Design Work: Relic System

Full design spec for reading comprehension through relics.

**Core Loop:**
```
Find Relic → Read French Inscription → Answer Questions → Unlock Lore
```

**Difficulty Tiers:**
| Tier | Words | Sentences | Reading Time |
|------|-------|-----------|--------------|
| Common | 10-20 | 1-2 | ~10 sec |
| Uncommon | 25-40 | 3-4 | ~20 sec |
| Rare | 50-75 | 5-7 | ~45 sec |
| Legendary | 80-120 | 8-12 | ~90 sec |

**Lore Direction:** Relics as counter-propaganda
- Pre-War relics: How things really were
- War-era relics: What actually happened
- Exile relics: Layne's hidden truth
- Ancient relics: Deeper mysteries

**Example Relics:**
| Relic | Era | Location | Reveals |
|-------|-----|----------|---------|
| Farmer's Journal | War | Haari Fields | Dark magic attack account |
| Layne's Letter | Exile | Hidden cave | Why he was exiled |
| Dawn Prayer Book | Pre-War | Old chapel | Original teachings |
| Royal Seal Document | Pre-War | Lurenium | Succession plan |
| Ancient Tablet | Ancient | Ruins | What Lurenium seals |

---

## Design Work: Historical Timeline

Expanded timeline to support relic system and fill WORLD_BIBLE gaps.

| Era | Years Ago | Key Event |
|-----|-----------|-----------|
| The Ancients | 1000+ | Lurenium built as a seal |
| The Silence | 1000-500 | Ancient civilization falls |
| The Founding | ~500 | Verandum established |
| The Faith | ~400 | Order of Dawn founded |
| Golden Age | 400-100 | Prosperity, scholarship |
| King Dran's Reign | 100-30 | Stability, princes born |
| The Divide | 30-20 | Tensions rise |
| The War | ~20 | Corruption unleashed |
| The Exile | 20-Present | Layne flees, history rewritten |

---

## Expansion Architecture (Pending)

Documented 4 potential models:

| Model | Complexity | Revenue |
|-------|------------|---------|
| Free-to-Play + Progression | Simplest | Cosmetics/boosters |
| Paid Expansions/DLC | Medium | One-time purchases |
| Subscription | Complex | Recurring |
| Hybrid (Freemium) | Most complex | Mixed |

**Decision:** Pending - depends on financial/monetization choice.

---

## Testing Checklists Added

### Language Selection
- [ ] New game flow (appears after class selection)
- [ ] French selection highlights
- [ ] Locked languages show "Coming Soon"
- [ ] Continue button disabled until selection
- [ ] GameState.player.language persists
- [ ] Existing saves default to french

### Account Progression
- [ ] Buy upgrade from Sage Aldric
- [ ] Buy upgrade from Merchant
- [ ] Verify bonus notifications
- [ ] Quest rewards with multiplier
- [ ] Lesson XP with multiplier

---

## Session Summary

| Category | Items |
|----------|-------|
| Code Implemented | Language Selection, Account Progression Integration |
| Design Documented | Relic System, Historical Timeline, Expansion Architecture |
| Decisions Made | Product Scope, Tiered Crafting |
| Testing Added | 12 new checklist items |

---

## What's Next

1. **Playtest the new systems** - Language selection, account upgrades
2. **Fix remaining bugs** - #30-35 still open
3. **Choose expansion model** - Drives architecture decisions
4. **Relic system implementation** - When ready for Phase 3

---

*"Learn language fundamentals through an RPG story" — honest scope, happy players.*
