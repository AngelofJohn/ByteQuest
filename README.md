# ByteQuest

**Version:** 0.3.1 | **Phase:** 1 - Dawnmere Vertical Slice

A fantasy RPG language-learning game where players explore villages, complete quests, and build reputation with factions. Through dialogue, interactive lessons, and a rich world, players learn French vocabulary and grammar. Progress unlocks equipment, titles, spellbook pages, and reputation rewards.

---

## Quick Start

1. Open `index.html` in a modern web browser
2. Click **New Game** to start (or **Continue** to load a save)
3. Choose your name and class (Scholar, Warrior, or Traveler)
4. Explore Dawnmere, talk to NPCs, and accept quests
5. Complete vocabulary and grammar lessons to progress

---

## Features

### Language Learning
- **Vocabulary Lessons** - Learn French through interactive multiple-choice exercises
- **Grammar Lessons** - Conjugation practice, fill-in-the-blank, and gender matching
- **Spaced Repetition** - Smart review system that tracks mastery and schedules reviews
- **Spellbook** - Reference guide that unlocks as you learn new grammar concepts
- **Hints System** - Unlock hints for difficult words through repeated practice

### RPG Elements
- **Quest System** - Main story, side quests, and quest chains with branching objectives
- **7 Stats** - Stamina, Strength, Agility, Insight, Luck, Devotion, Knowledge
- **Equipment** - Helms, armor, weapons, accessories, and rings with stat bonuses
- **Inventory** - Consumables, quest items, and collectibles
- **Shop System** - Buy items from NPC merchants
- **Reputation** - Build standing with factions to unlock rewards
- **Titles** - Earn and display achievement titles
- **Boss Exams** - Location-based tests to prove your knowledge
- **Account Progression** - Permanent upgrades that persist across all saves (IdleOn-inspired)

### Resource Systems
- **Resource Minigames** - 8 gathering activities (mining, fishing, foraging, etc.) with vocabulary challenges
- **Alchemy System** - Craft potions using gathered ingredients and French vocabulary

### Settings & Accessibility
- **Audio Controls** - Master, music, and SFX volume (audio coming in Phase 2)
- **Display Options** - Font size, text speed, animations toggle
- **Learning Preferences** - Question count, hint behavior, keyboard shortcuts
- **Accessibility** - High contrast, dyslexia-friendly font, colorblind modes
- **Data Management** - Export/import saves, reset progress

### Current Content (Phase 1: Dawnmere)
- **Location:** Dawnmere - A small frontier settlement on the trade routes
- **NPCs:** Elder Urma, Rega the Farmer, Merchant, Baker Marta, Sage Aldric, Old Pierre
- **Vocabulary:** Greetings, family, food, time, colors, numbers, common verbs
- **Grammar:** Verb conjugations (être, avoir, aller, parler), articles, noun gender

---

## Controls

| Key | Action |
|-----|--------|
| **1-4** | Select answer in lessons |
| **I** | Open Inventory |
| **Q** | Open Quest Log |
| **M** | Open Map |
| **S** | Open Spellbook |
| **Esc** | Close modals / Return to game |

---

## Tech Stack

- Vanilla JavaScript (no frameworks)
- HTML5 / CSS3 with pixel-art inspired design
- LocalStorage for save data
- No server required - runs entirely in browser

---

## Project Structure

```
ByteQuest/
├── index.html              # Main game page
├── css/
│   └── style.css           # All styles (~3,000 lines)
├── js/
│   ├── game.js             # Core game logic and UI (~4,200 lines)
│   ├── questSystem.js      # Quest management
│   ├── statsSystem.js      # Player stats and effects
│   ├── itemSystem.js       # Items and inventory
│   ├── shopSystem.js       # NPC shops
│   ├── spellbookSystem.js  # Grammar reference UI
│   ├── spacedRepetition.js # SRS algorithm
│   ├── reputationSystem.js # Faction reputation
│   ├── locationSystem.js   # World map and travel
│   ├── titleSystem.js      # Achievement titles
│   ├── bossExamSystem.js   # Location exams
│   ├── hintSystem.js       # Lesson hints
│   ├── tooltipSystem.js    # UI tooltips
│   ├── resourceMinigames.js # Resource gathering minigames
│   ├── alchemySystem.js    # Potion crafting
│   ├── accountProgression.js # Account-wide upgrades (core)
│   ├── accountProgressionConfig.js # Upgrade definitions
│   ├── gameIntegration.js  # Account system hooks
│   └── accountProgressionUI.js # Upgrade shop UI
├── data/
│   ├── gamedata.js         # Locations, quests, items
│   ├── vocabulary.js       # French word lists by category
│   ├── grammar.js          # Verb conjugations, exercises
│   ├── grammarQuests.js    # Grammar quest chain
│   └── npcs.js             # NPC definitions with visibility rules
├── docs/
│   ├── SYSTEMS_DESIGN.md   # Technical documentation
│   ├── WORLD_BIBLE.md      # Lore and world-building
│   ├── TUTORIAL_DESIGN.md  # Tutorial planning
│   ├── ROADMAP.md          # Development phases
│   ├── CLEANUP_CHECKLIST.md # Task tracking
│   └── BUG_REPORT.md       # Known issues and fixes
└── legal/
    ├── TERMS_OF_SERVICE.md
    ├── PRIVACY_POLICY.md
    ├── EULA.md
    ├── COOKIE_POLICY.md
    └── README.md
```

**Total codebase:** ~17,000 lines

---

## Development Status

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Dawnmere Vertical Slice | 🟡 In Progress |
| Phase 2 | Haari Fields + World Map | ⬜ Planned |
| Phase 3 | Lurenium + Boss System | ⬜ Planned |
| Phase 4 | Audio, Polish, Mobile | ⬜ Planned |

See [docs/ROADMAP.md](docs/ROADMAP.md) for detailed phase breakdowns.

---

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Recommended |
| Firefox | ✅ Supported |
| Edge | ✅ Supported |
| Safari | ⚠️ Untested |
| Mobile | ⚠️ Partial (Phase 4) |

---

## Contributing

ByteQuest is currently in private development. See [docs/SYSTEMS_DESIGN.md](docs/SYSTEMS_DESIGN.md) for technical architecture if you're interested in understanding the codebase.

---

## License

All rights reserved. See [legal/](legal/) for terms of service, privacy policy, and EULA.
