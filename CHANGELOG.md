# Changelog

All notable changes to ByteQuest will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Full testing pass
- Bug fixes (#30-35)
- Lurenium zone (third zone)

---

## [0.5.1] - 2025-12-11

### Added
- **Artifact System** - 26 collectible artifacts that reveal the true history of Verandum
  - 8 eras of history, each with 2-5 artifacts to collect
  - Artifacts contain lore text that contradicts the "official" propaganda in Lore pages
  - Collection UI in Spellbook under new "Artifacts" tab
  - Achievements for completing each era's collection

- **Artifact Discovery Methods**
  - Quest rewards: 6 quests now unlock artifacts on completion
  - Reputation thresholds: 5 artifacts unlock at certain faction rep levels
  - Location hotspots: Sparkle icons in locations that can be searched

- **Hotspot System** - Interactive discovery points in locations
  - Dawnmere: 3 hotspots (Dusty Alcove, Weathered Bookshelf, River Debris)
  - Haari Fields: 3 hotspots (Overgrown Battlefield, Abandoned Cart, Standing Stones)
  - Some hotspots require reputation to access
  - Search interaction with narrative discovery text

- **Lore Page Quest Unlocks** - 8 quests now unlock corresponding lore pages:
  - winter_solstice → The Founding
  - river_whispers → The Silence
  - lights_below → The Ancients
  - tending_the_flame → The Faith
  - doubt_and_faith → The Golden Age
  - memories_of_renque → King Dran's Reign
  - what_stalks_the_fields → The Exile
  - shadows_of_light → The War

- **10 New Achievements** for artifact collection:
  - Truth Seeker (first artifact)
  - One achievement per era completion (8 total)
  - Master Historian (all 26 artifacts, hidden)

### Changed
- Rewards screen now shows "NEW LORE UNLOCKED" with page titles instead of IDs
- Spellbook categories expanded: Verbs, Grammar, Reference, Lore, Artifacts

---

## [0.5.0] - 2025-12-11

### Added
- **Alchemy Unlock Quest** - "Secrets of the Soil" quest from Dave in Haari Fields unlocks the Alchemy nav button
- **Feature Unlock System** - Nav buttons can now be hidden until unlocked via quest rewards

### Changed
- **HP System Rebalanced** - Base HP reduced from 100 to 50, level scaling from +10 to +2 per level, stamina bonus from +5 to +3 per point. Wrong answers (10 damage) now feel meaningful.
- Alchemy button now hidden by default, unlocked through gameplay

### Fixed
- **Quest Markers** - NPCs now only show `❓` when a quest is ready to turn in (all objectives complete), not for any active quest
- **Lesson Tutorial** - Added tutorial tip explaining users must answer correctly to progress
- **Urma Shop Access** - Fixed account upgrade shop not being accessible through dialog
- **NPC Disappearance Bug** - Fixed NPCs not appearing after discovery

---

## [0.4.5] - 2025-12-10

### Added
- **Spellbook Lore Pages** - 8 new lore pages covering the full historical timeline:
  - The Ancients (1000+ years ago)
  - The Silence (1000-500 years ago)
  - The Founding (~500 years ago)
  - The Faith (~400 years ago)
  - Golden Age (400-100 years ago)
  - King Dran's Reign (100-30 years ago)
  - The War (~20 years ago)
  - The Exile (20 years ago - Present)
- New "lore" category in Spellbook with documentary-style writing

### Changed
- Spellbook now has 36 pages total (15 verbs, 11 grammar, 2 reference, 8 lore)
- WORLD_BIBLE.md updated to v1.4 with complete timeline

---

## [0.4.4] - 2025-12-09

### Added
- **Language Selection Screen** - New players choose target language after character creation
  - French available, Spanish/German/Italian marked "Coming Soon"
  - Card-based UI with selection highlighting
  - Language stored in GameState.player.language
- **Account Progression Integration** - XP and gold multipliers now fully wired:
  - `addXP()` and `addGold()` functions apply multipliers
  - Bonus shown in notifications: "+55 XP (50 + bonus)"
- **Relic System Design** - Reading comprehension through French inscriptions (documented, not implemented)

### Changed
- Product scope clarified: "Learn language fundamentals through an RPG story"
- Tiered crafting by zone: Dawnmere = gathering, Haari Fields = crafting unlocks

---

## [0.4.3] - 2025-12-08

### Added
- **Haari Fields Zone** - Second zone (level 5-10) fully built out:
  - 2 main quests: `harvest_time` (Dave), `lyras_garden` (Lyra)
  - New faction: Haari Fields Farmers (4 ranks)
  - Agricultural theme with farming vocabulary
- **Vocabulary Expansion** - 90+ new words:
  - Agriculture: crops (12), herbs (10), tools (8), actions (8), phrases (5)
  - Nature: weather (8), landscape (8), wildlife (8), plants (8), phrases (5)
- **Grammar Expansion** - 5 new -er verbs: planter, cultiver, arroser, récolter, travailler
- **Reorder Sentences** - 16 new sentences for agriculture and nature

---

## [0.4.2] - 2025-12-08

### Added
- **Filler Quests** - 14 new character-driven side quests:
  - Dawnmere (9): Yris (2), Brother Varek (2), Tommen (1), Widow Senna (2), Old Jorel (2)
  - Haari Fields (5): Venn (2), Rask (2), The Veiled One (1 hidden)
- 6 quest chains with narrative depth
- Story threads woven in: corruption foreshadowing, Hermeau doubt, village secrets

### Design
- Character-first quest design: quests emerge from NPC personalities
- Anti-Duolingo philosophy: filler quests have narrative purpose

---

## [0.4.1] - 2025-12-07

### Added
- **Account Progression System** - Permanent upgrades persisting across saves:
  - 17 upgrades across 5 categories (Learning, Resources, Gameplay, Language, QoL)
  - Uses regular game gold (no premium currencies)
  - Achievement-based tier unlocks (TBD)
- **Account Upgrade Shops** - 3 NPC vendors:
  - Sage's Wisdom (Sage Aldric): XP upgrades
  - Traveler's Blessings (Merchant): Gold upgrades
  - Elder's Legacy (Elder Urma): Health, inventory, QoL
- **Starter Upgrade** - Gatherer's Blessing: costs resources (no gold), +5% XP, +10% gold
- **New NPCs** - 9 added:
  - Dawnmere (6): Old Pieron, Yris, Brother Varek, Tommen, Widow Senna, Old Jorel
  - Haari Fields (3): Venn, Rask, The Veiled One
- Marta's Bakery shop

### Fixed
- Bug #25: `friendly_face` achievement now checks all 10 Dawnmere NPCs

### Changed
- Merged STORY_SKELETON.md into WORLD_BIBLE.md (v1.3)
- Merged 3 account progression docs into SYSTEMS_DESIGN.md Section 27

---

## [0.4.0] - 2025-12-05 - PHASE 1 COMPLETE

### Milestone: Feature Complete
ByteQuest Phase 1 is now feature complete. All core systems are implemented and functional.

### Phase 1 Features Summary:
- **Core Loop**: Quests, vocabulary lessons, XP/gold rewards
- **Stats System**: 7 stats (Stamina, Strength, Agility, Insight, Luck, Devotion, Knowledge) all wired
- **Grammar System**: Conjugation, fill-in-blank, and gender match questions
- **Spellbook**: Reference system with unlockable pages
- **Settings**: 6 tabs with 17+ configurable options
- **Tooltips**: Dynamic tooltips for items, stats, equipment
- **Resource Minigames**: 8 minigame types across 3 difficulty tiers
- **Tutorial**: Arrival tutorial for new players
- **Rewards Screen**: Animated reward display
- **Map & Travel**: Location-based navigation
- **Shop System**: Buy/sell items with reputation discounts
- **Reputation & Titles**: Faction standing and player titles

### Fixed
- Missing `#right-sidebar` element in HTML (quest panel wasn't rendering)
- Tutorial bug fixes (wrong selectors, logic errors)

---

## [0.3.5] - 2025-12-05

### Added
- **Arrival Tutorial System** - Contextual tips for new players:
  - Tutorial state tracking in GameState (persisted in saves)
  - Visual highlight/pulse animation on key elements
  - Positioned tip popups with skip option
  - Triggers: First NPC click, first quest accept, first lesson, first wrong answer, first quest complete
- **Enhanced Tooltips** - Added tooltips to quest rewards and Profile stats

---

## [0.3.4] - 2025-12-04

### Added
- **Gather Screen** - New sidebar button to access all 8 resource minigames

### Fixed
- Resource minigames now display properly (was missing modal overlay CSS)

---

## [0.3.3] - 2025-12-04

### Added
- **Inventory Tooltips** - Rich tooltips on inventory and equipped items showing stats, description, and sell value
- **Lesson Exit Button** - Exit lessons mid-progress with confirmation dialog
- **Quest Log Close Button** - Close button added to quest log modal

### Fixed
- Grammar lessons now respect questionCount setting (was ignoring it)
- Scholar class starting item changed to `scholars_cap` (was duplicating traveler's cloak)
- Quest log modal now has proper close button

---

## [0.3.2] - 2025-12-04

### Added
- **Resource Minigames System** (1,450 lines) - 8 minigame types for resource gathering:
  - Mining: Timed Quiz (60s timer)
  - Woodcutting: Streak Challenge
  - Hunting: Speed Round
  - Herbalism: Matching Pairs
  - Fishing: Reaction + Question
  - Word Scramble: Letter Unscramble
  - Memory Cards: Classic pair matching
  - Hangman: Word guessing
- Themed vocabulary for each resource type (Mining, Fishing, Herbalism, Woodcutting, Hunting)
- RESOURCE_MINIGAMES.md design document

### Changed
- Updated SYSTEMS_DESIGN.md to v3.7 with Resource Minigames documentation
- CSS expanded with 800+ lines for minigame styling

---

## [0.3.1] - 2025-12-04

### Added
- **Settings System** - Comprehensive 6-tab settings screen:
  - Audio: Volume sliders, mute toggle
  - Display: Text speed, font size, animations
  - Gameplay: Difficulty, hints, auto-save
  - Learning: Question count, hint mode, keyboard shortcuts
  - Accessibility: High contrast, dyslexia font, color blind modes
  - Data: Export/import saves, reset/delete progress
- **WORLD_BIBLE.md** - Lore document for the game world
- **TUTORIAL_DESIGN.md** - Tutorial flow planning
- Keyboard shortcuts (1-4 keys) for answering lesson questions
- Screen shake effect on HP damage (respects settings)
- Auto-save functionality (respects settings)
- Confirm dialog before accepting quests (respects settings)

### Changed
- Settings now persist in localStorage
- Font size and high contrast applied on load

---

## [0.3.0] - 2025-12-03

### Added
- **Rewards Screen** - Modal popup showing XP, gold, items, and reputation gains on quest completion
- **Art Direction Document** - Comprehensive visual design guide with reference analysis
- **Shop Definitions** - Merchant, Baker, and Rega shops now fully functional
- Devotion bonus display in rewards screen
- Rank-up celebration in rewards screen
- Level-up notification in rewards screen
- Quest type badges (Main, Side, Daily, Weekly, Hidden, etc.)

### Changed
- Quest completion now shows rewards screen instead of multiple notifications
- Reduced lesson questions to 3 (testing mode, was 8)
- Reduced boss exam questions to 5 (testing mode, was 15)

### Fixed
- "Browse Wares" button now opens shop correctly
- Added merchant_shop and baker_shop definitions
- Added defensive null checks to renderQuestPanel
- Added defensive null checks to showProfileScreen
- Added defensive null checks to renderProgressScreen
- Fixed getAvailableQuests to handle missing location data

---

## [0.2.0] - 2025-12-03

### Added
- **Spellbook System** (712 lines) - Grammar reference UI with 8 pages
- **Grammar System** - Conjugation, fill-in-blank, and gender matching questions
- **Grammar Quests** - 6-quest chain with Sage Aldric
- **NPC Visibility System** - NPCs appear/disappear based on quest progress
- **Stat Effects Wiring** - All 7 stats now affect gameplay
- Profile screen with major/minor stats display
- Progress screen with milestones, achievements, learning tabs
- Spellbook navigation button and keyboard shortcut (S key)

### Changed
- Updated SYSTEMS_DESIGN.md to v3.0 with grammar and spellbook documentation
- Equipment items now use proper stat names (stamina, strength, etc.)
- recalculateStats() now properly applies equipment bonuses

### Fixed
- Equipment stat bonuses now correctly apply to statsManager
- Added ring slot to equipment system
- Added unequip functionality to inventory screen
- Fixed stat effect calculations for all 7 stats

---

## [0.1.1] - 2025-12-01

### Added
- Notification stacking (notifications no longer overlap)
- Grammar data file with verb conjugations
- grammarQuests.js with quest definitions
- npcs.js with tag-based NPC system

### Fixed
- Shop purchases now correctly add items to inventory
- Item category derivation for shop items
- Standard helm ID mismatch (standard_helm → basic_helm)
- Traveler's Cloak duplication removed from Scholar class
- Profile button redundancy (now click avatar to open)
- Removed redundant World button from sidebar

---

## [0.1.0] - 2025-11-28

### Added
- **Core Game Engine** - Main game loop, state management, save/load
- **Quest System** - 9 quest types, objectives, rewards, chains
- **Lesson System** - Vocabulary lessons with multiple choice
- **Stats System** - 7 stats with milestone progression
- **Reputation System** - Faction standing with ranks and perks
- **Item System** - Equipment, consumables, inventory management
- **Shop System** - NPC merchants with buy/sell
- **Title System** - Achievement titles with display
- **Boss Exam System** - Location-based knowledge tests
- **Hint System** - Lesson hints with charge management
- **Location System** - World map with travel
- **Spaced Repetition** - SRS algorithm for vocabulary mastery
- **Tooltip System** - Hover tooltips for UI elements

### Content
- Dawnmere location with 6 NPCs
- 10 quests (main, side, daily, weekly, hidden, seasonal, chain)
- 8 vocabulary categories (greetings, family, food, time, colors, numbers, verbs, places)
- 12 equipment items
- 2 factions (Dawnmere Settlers, Old Guard)
- 3 player classes (Scholar, Warrior, Traveler)

### Documentation
- SYSTEMS_DESIGN.md - Technical architecture
- ROADMAP.md - Development phases
- CLEANUP_CHECKLIST.md - Task tracking
- BUG_REPORT.md - Issue tracking
- Legal document templates

---

## [0.0.1] - 2025-11-25

### Added
- Initial project structure
- Basic HTML/CSS framework
- Title screen and character creation
- Placeholder game systems

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| **0.5.0** | **Dec 11, 2025** | HP rebalance, quest markers fix, alchemy unlock |
| 0.4.5 | Dec 10, 2025 | Spellbook lore pages (8 eras) |
| 0.4.4 | Dec 9, 2025 | Language selection, account progression wiring |
| 0.4.3 | Dec 8, 2025 | Haari Fields zone, 90+ vocabulary words |
| 0.4.2 | Dec 8, 2025 | 14 filler quests, 6 quest chains |
| 0.4.1 | Dec 7, 2025 | Account progression system, 9 new NPCs |
| **0.4.0** | **Dec 5, 2025** | **🎉 PHASE 1 COMPLETE** |
| 0.3.5 | Dec 5, 2025 | Arrival tutorial system, enhanced tooltips |
| 0.3.4 | Dec 4, 2025 | Gather screen, minigame modal fix |
| 0.3.3 | Dec 4, 2025 | Inventory tooltips, lesson exit, bug fixes |
| 0.3.2 | Dec 4, 2025 | Resource minigames (8 types) |
| 0.3.1 | Dec 4, 2025 | Settings system, lore docs |
| 0.3.0 | Dec 3, 2025 | Rewards screen, art direction, shop fixes |
| 0.2.0 | Dec 3, 2025 | Spellbook, grammar system, stat wiring |
| 0.1.1 | Dec 1, 2025 | Bug fixes, notification stacking |
| 0.1.0 | Nov 28, 2025 | Initial playable version |
| 0.0.1 | Nov 25, 2025 | Project scaffolding |

---

## Upcoming Milestones (Phase 2)

### v0.5.0 (Testing & Polish)
- [ ] Full playthrough testing (38 scenarios)
- [ ] Bug fixes from testing
- [ ] Code cleanup
- [ ] Legal documents (pre-launch)

### v0.6.0 (Content Expansion)
- [ ] Haari Fields location
- [ ] New NPCs (Dave, Mary)
- [ ] Agricultural vocabulary
- [ ] Past tense grammar

### v1.0.0 (Public Release)
- [ ] All Phase 1-3 content complete
- [ ] Art assets integrated
- [ ] Sound/music added
- [ ] Full French A1 curriculum
- [ ] Mobile responsive

---

*Changelog maintained as part of ByteQuest development.*
