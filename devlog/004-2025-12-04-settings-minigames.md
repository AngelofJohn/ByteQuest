# Dev Log #004 - Settings & Resource Minigames

**Date:** December 4, 2025
**Version:** 0.3.1 → 0.3.2 → 0.3.3 → 0.3.4
**Session Type:** Heavy Feature Day (Backfilled)

---

## The Biggest Day Yet

Four version bumps in one day. This was intense. Two major systems plus a bug fix marathon.

---

## Settings System (0.3.1)

### What Was Built
A comprehensive settings screen with 6 tabs:

| Tab | Settings |
|-----|----------|
| **Audio** | Master volume, music, SFX, mute toggle |
| **Display** | Text speed, font size, animations, screen shake |
| **Gameplay** | Difficulty, auto-save, confirm actions |
| **Learning** | Questions per lesson, hint mode, keyboard shortcuts |
| **Accessibility** | High contrast, dyslexia font, color blind modes, reduce motion |
| **Data** | Export save, import save, reset progress, delete all data |

### Settings That Actually Work
Every setting is wired to actually do something:
- `keyboardShortcuts` - Press 1-4 to answer questions
- `autoSave` - Silent saves after quest completion
- `screenShake` - Visual feedback on HP loss
- `showHints` - Never / On Request / Always
- `fontSize` - Actually changes CSS

### Why So Many Settings?
Accessibility isn't optional. Players have different needs:
- Dyslexia-friendly fonts
- Color blind modes
- Motion sensitivity
- Difficulty preferences

A game about learning should be accessible to learners.

---

## Resource Minigames (0.3.2)

### The Big Addition: 1,450 Lines of New Code

Eight unique minigame types for gathering resources:

| Minigame | Mechanic | Resource |
|----------|----------|----------|
| **Mining** | Timed Quiz | Ore |
| **Woodcutting** | Streak Challenge | Wood |
| **Herbalism** | Matching Pairs | Herbs |
| **Fishing** | Patience Game | Fish |
| **Hunting** | Quick Draw | Hides |
| **Foraging** | Scavenger Hunt | Mixed |
| **Excavation** | Careful Dig | Artifacts |
| **Essence** | Rhythm Match | Magical |

### Three Tiers of Difficulty
Each minigame has vocabulary from three tiers:
- **Tier 1** - Beginner words
- **Tier 2** - Intermediate words
- **Tier 3** - Advanced words

Higher tiers = better resources.

### The Gather Screen
New sidebar button opens the Gather screen showing:
- All available minigame types
- Current location bonuses
- Resource inventory preview

### Design Philosophy
Resource gathering is:
- **Optional** - Not required for main quests
- **Rewarding** - Grants items and vocabulary practice
- **Varied** - Different mechanics keep it fresh
- **Tiered** - Grows with player skill

---

## Bug Fix Marathon (0.3.3)

### Issues Squashed
- **Notification stacking** - Notifications now queue properly
- **Shop display** - Items render correctly
- **Inventory management** - Edge cases fixed
- **Grammar question count** - Now respects settings
- **Lesson exit button** - Added X button to leave lessons
- **Quest log close** - Added close button to quest panel
- **Scholar starting item** - Class bonus item now granted

### The Lesson Exit Problem
Players could get stuck in lessons with no way out. Added:
- X button in lesson header
- Confirmation dialog ("Are you sure? Progress will be lost.")
- Proper state cleanup on exit

---

## More Fixes (0.3.4)

- **Gather screen** - Initial implementation working
- **Minigame modal** - Fixed display issues
- **CSS cleanup** - 800+ lines of new styles

---

## Documentation Created

### World Bible (WORLD_BIBLE.md)
997 lines of lore:
- History of Eldoria
- The five zones
- Factions and politics
- NPC backgrounds
- Magic system

### Tutorial Design (TUTORIAL_DESIGN.md)
585 lines planning:
- Session 1: Arrival flow
- Session 2: Stats introduction
- Session 3: Advanced mechanics
- Trigger conditions

---

## How It Felt

[Your memories]

- How did it feel to add so much in one day?
- Which minigame type is your favorite?
- Were there moments you felt overwhelmed?
- Any features that came together faster than expected?

---

## Stats for the Day

| Metric | Value |
|--------|-------|
| New JS Lines | ~2,500 |
| New CSS Lines | ~800 |
| Version Bumps | 4 |
| Bugs Fixed | 7+ |
| New Systems | 2 major |
| Docs Written | 2 files (~1,500 lines) |

---

## End of Entry

*Some days you sprint. This was a sprint day.*
