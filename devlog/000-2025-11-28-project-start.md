# Dev Log #000 - Project Start

**Date:** November 28, 2025
**Version:** 0.1.0
**Session Type:** Project Kickoff (Backfilled)

---

## The Beginning

ByteQuest was born. The idea: a language learning RPG where studying French feels like playing a game, not doing homework.

---

## What Was Built

### Initial Game Framework
- Basic HTML structure with title screen
- CSS foundation with pixel art aesthetic
- Game container with HUD layout
- Character creation flow (name, class selection)
- Core GameState object to track everything

### First Systems
- **Vocabulary data structure** - French words organized by category and difficulty
- **Lesson modal** - Multiple choice question interface
- **Basic game loop** - Start game → See location → Answer questions

### Classes Defined
Three starting classes, each with different stat bonuses:
- **Scholar** - Wisdom focus (XP bonus)
- **Merchant** - Fortune focus (Gold bonus)
- **Wanderer** - Balanced stats

---

## Technical Foundation

```javascript
// The GameState object - heart of everything
const GameState = {
  player: {
    name: "",
    class: "",
    level: 1,
    xp: 0,
    gold: 0,
    hp: 100,
    maxHp: 100,
    stats: { ... },
    inventory: [],
    equipment: { ... }
  },
  currentLocation: "dawnmere",
  activeQuests: [],
  completedQuests: [],
  // ... more to come
};
```

### Why This Structure?
- Single source of truth for game state
- Easy to save/load (JSON serialization)
- Clear separation: player data vs world data vs UI state

---

## Design Decisions Made

### Multiple Choice (Not Typed Input)
Started with multiple choice for Phase 1. Reasons:
- Faster to implement
- Mobile-friendly (no keyboard needed)
- Lower friction for beginners
- Typed input planned for Phase 2/3 as "hard mode"

### HP as Stakes
Wrong answers cost HP. This was intentional:
- Creates tension and engagement
- Encourages actually learning vs random guessing
- Ties into RPG fantasy (taking "damage" from mistakes)
- Can be healed with items (gold sink)

### Pixel Art Aesthetic
Chose retro pixel style because:
- Nostalgic RPG feeling
- Emojis work as placeholder "sprites"
- Easier to find/commission consistent assets later
- Fits the "quest" fantasy

---

## How It Felt

[Your memories of starting the project]

- Why did you decide to build this?
- What inspired the concept?
- What were you hoping to create?

---

## End of Entry

*Day 1. The adventure begins.*
