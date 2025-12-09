# ByteQuest Systems Design Document

**Version:** 3.13
**Last Updated:** December 7, 2025  
**Status:** Phase 1 - Core Systems Complete

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Game State](#core-game-state)
3. [Player Systems](#player-systems)
4. [Stats System](#stats-system)
5. [Quest System](#quest-system)
6. [Lesson System](#lesson-system)
7. [Grammar System](#grammar-system)
8. [Spellbook System](#spellbook-system)
9. [Hint System](#hint-system)
10. [NPC System](#npc-system)
11. [Location System](#location-system)
12. [Boss Exam System](#boss-exam-system)
13. [Item & Inventory System](#item--inventory-system)
14. [Shop System](#shop-system)
15. [Reputation System](#reputation-system)
16. [Title System](#title-system)
17. [Spaced Repetition System](#spaced-repetition-system)
    - [Review Alchemy System](#review-alchemy-system)
18. [Tooltip System](#tooltip-system)
19. [Save/Load System](#saveload-system)
20. [Endgame Content](#endgame-content-phase-3)
21. [Art Direction & Visual Design](#art-direction--visual-design)
22. [Resource & Skill Infrastructure (Future)](#resource--skill-infrastructure-future)
23. [Future Systems](#future-systems)
24. [Tutorial System](#tutorial-system)
25. [Resource Minigames](#resource-minigames)
26. [Endgame Lore Bosses](#endgame-lore-bosses)
27. [Account Progression System](#account-progression-system)

---

## Architecture Overview

### Current File Structure

```
ByteClaude/
├── index.html              # Main HTML structure
├── css/
│   └── style.css           # All styles (2,526 lines)
├── js/
│   ├── game.js             # Core game engine (3,281 lines)
│   ├── questSystem.js      # Quest management (815 lines)
│   ├── statsSystem.js      # Player stats (840 lines)
│   ├── spellbookSystem.js  # Grammar reference UI (712 lines)
│   ├── itemSystem.js       # Items & inventory (706 lines)
│   ├── reputationSystem.js # Faction reputation (542 lines)
│   ├── spacedRepetition.js # SRS algorithm (495 lines)
│   ├── tooltipSystem.js    # Hover tooltips (447 lines)
│   ├── bossExamSystem.js   # Boss exams (442 lines)
│   ├── shopSystem.js       # NPC shops (429 lines)
│   ├── locationSystem.js   # Location/travel (428 lines)
│   ├── titleSystem.js      # Player titles (416 lines)
│   └── hintSystem.js       # Hint management (298 lines)
├── data/
│   ├── gamedata.js         # Game content data (909 lines)
│   ├── grammar.js          # French grammar data (886 lines)
│   ├── grammarQuests.js    # Grammar quest definitions (462 lines)
│   ├── npcs.js             # NPC definitions (453 lines)
│   └── vocabulary.js       # French vocabulary (210 lines)
├── docs/
│   ├── SYSTEMS_DESIGN.md   # This file
│   ├── ROADMAP.md          # Development roadmap
│   └── CLEANUP_CHECKLIST.md# Task tracking
└── legal/
    ├── TERMS_OF_SERVICE.md
    ├── PRIVACY_POLICY.md
    ├── EULA.md
    ├── COOKIE_POLICY.md
    └── README.md
```

**Total:** ~15,300 lines of code

### System Initialization Order

```javascript
// In initGame():
1. questManager            // Quest logic
2. srManager               // Spaced repetition (word tracking)
3. statsManager            // Player stats
4. reputationManager       // Faction reputation
5. itemManager             // Items & inventory
6. shopManager             // NPC shops
7. hintManager             // Lesson hints
8. locationManager         // Travel system
9. bossExamManager         // Zone exams
10. titleManager           // Player titles
11. spellbookManager       // Grammar reference
```

### Global Managers

| Manager | Global Variable | Purpose | Status |
|---------|-----------------|---------|--------|
| QuestManager | `questManager` | Quest state & progression | ✅ Complete |
| SpacedRepetitionManager | `srManager` | Word learning tracking | ✅ Complete |
| StatsManager | `statsManager` | Player stats & effects | ✅ Complete |
| ReputationManager | `reputationManager` | Faction standing | ✅ Complete |
| ItemManager | `itemManager` | Inventory operations | ✅ Complete |
| ShopManager | `shopManager` | NPC shop transactions | ✅ Complete |
| HintManager | `hintManager` | Lesson hint charges | ✅ Complete |
| LocationManager | `locationManager` | Travel & discovery | ✅ Complete |
| BossExamManager | `bossExamManager` | Zone exams | ✅ Complete |
| TitleManager | `titleManager` | Player titles | ✅ Complete |
| SpellbookManager | `spellbookManager` | Grammar reference | ✅ Complete |

---

## Core Game State

### GameState Object

```javascript
GameState = {
  player: {
    // Identity
    name: "Traveler",
    class: null,                    // scholar, warrior, traveler
    
    // Progression
    level: 1,
    xp: 0,
    xpToNext: 100,
    
    // Resources
    hp: 100,
    maxHp: 100,
    gold: 0,
    
    // Stats (NEW in v3.0)
    stats: {
      stamina: 10,    // Max HP
      strength: 5,    // Damage reduction
      agility: 5,     // Streak protection
      insight: 5,     // Hint charges
      luck: 5,        // Avoid damage, shop discounts
      devotion: 5,    // Reputation bonus
      knowledge: 5    // Mastery retention
    },
    
    // Collections
    inventory: [],                  // [{id, count}, ...]
    equipment: {
      helm: null,
      armor: null,
      weapon: null,
      accessory: null,
      ring: null
    },
    
    // Progress Tracking
    reputation: {},                 // {factionId: amount}
    completedQuests: [],
    activeQuests: [],
    discoveredLocations: ["dawnmere"],
    unlockedLocations: ["dawnmere"],
    metNpcs: [],
    titles: [],                     // Earned titles
    equippedTitle: null,            // Currently displayed title
    
    // Spellbook (NEW in v3.0)
    spellbook: {
      unlockedPages: ["pronouns"],  // Always unlocked
      lastViewed: null
    },
    
    // Statistics
    lessonsCompleted: 0,
    perfectLessons: 0,
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    wordsLearned: 0,
    wordsMastered: 0,
    questsCompleted: 0,
    goldEarned: 0,
    goldSpent: 0,
    reviewRecoveries: 0,
    hintsUsed: 0,
    
    // Exam Tracking
    examHistory: {}                 // {locationId: {attempts, bestScore, passed}}
  },
  
  // Current State
  currentLocation: "dawnmere",
  currentScreen: "title",
  activeDialog: null,
  selectedQuest: null,
  
  // Lesson State
  lessonState: {
    active: false,
    questId: null,
    objectiveId: null,
    vocabulary: [],
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    currentStreak: 0,
    isReview: false,
    isBossExam: false,
    isGrammarLesson: false,        // NEW in v3.0
    examLocationId: null,
    usedStreakProtection: false    // NEW in v3.0 (Agility stat)
  },
  
  // Settings
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    textSpeed: "normal"
  }
}
```

---

## Player Systems

### Classes

| Class | Max HP | Description |
|-------|--------|-------------|
| Scholar | 90 | Masters language through study. Higher XP gains. |
| Warrior | 120 | Learns through action. More forgiving with mistakes. |
| Traveler | 100 | Balanced approach. Well-rounded stats. |

### Leveling

```javascript
// XP Requirements (from GAME_DATA.levelTable)
Level 1:  0 XP
Level 2:  100 XP
Level 3:  250 XP
Level 4:  450 XP
Level 5:  700 XP
Level 6:  1,000 XP
Level 7:  1,350 XP
Level 8:  1,750 XP
Level 9:  2,200 XP
Level 10: 2,700 XP

// Per level gains
+10 Max HP
Full HP restore
```

### HP System

| Event | HP Change |
|-------|-----------|
| Wrong answer (lesson) | -5 to -10 (Strength reduces) |
| Wrong answer (exam) | -15 |
| Health Potion | +30 |
| Bread | +10 |
| Rest at Inn | Full restore (10 gold) |
| Level Up | Full restore |
| Luck proc | Avoid damage entirely (2% per point) |

---

## Stats System

### ✅ IMPLEMENTED - All 7 Stats with Effects

| Stat | Icon | Effect | Implementation |
|------|------|--------|----------------|
| **Stamina** | 💪 | +5 Max HP per point | `recalculateStats()` in game.js |
| **Strength** | ⚔️ | Reduces damage taken (10→5-10) | `damagePlayer()` in game.js |
| **Agility** | 🏃 | At 5+, one wrong per lesson won't break streak | `handleAnswer()` in game.js |
| **Insight** | 👁️ | +0.5 hint charges per point | `HintManager.getHintInfo()` |
| **Luck** | 🍀 | 2% per point to avoid damage; 1% shop discount (max 10%) | `damagePlayer()`, `shopSystem.buyItem()` |
| **Devotion** | 🙏 | +5% reputation gain per point | `reputationSystem.addReputation()` |
| **Knowledge** | 📖 | 10% per point to prevent mastery decay | `spacedRepetition.recordWrong()` |

### Stat Bonuses from Equipment

```javascript
// Equipment can add stat bonuses
item: {
  id: "scholars_ring",
  type: "ring",
  stats: { 
    knowledge: 2,
    insight: 1 
  }
}

// Applied in recalculateStats()
// Total = base + equipment bonuses
```

---

## Quest System

### Quest Types

| Type | Description |
|------|-------------|
| main | Story progression |
| side | Optional content |
| lesson | Vocabulary learning |
| grammar | Grammar learning (NEW) |
| daily | Repeatable (future) |
| reputation | Faction-specific |

### Objective Types

| Type | Description | Status |
|------|-------------|--------|
| talk | Speak with NPC | ✅ |
| meet | Meet X settlers | ✅ |
| lesson | Complete vocabulary lesson | ✅ |
| grammar_lesson | Complete grammar lesson | ✅ NEW |
| collect | Gather items | ✅ |
| deliver | Bring item to NPC | ✅ |
| explore | Discover location | ✅ |

### Quest Lookup

```javascript
// Helper function checks both sources
function getQuest(questId) {
  // Check regular quests first
  if (GAME_DATA.quests[questId]) {
    return GAME_DATA.quests[questId];
  }
  // Fall back to grammar quests
  if (typeof GRAMMAR_QUESTS !== 'undefined' && GRAMMAR_QUESTS[questId]) {
    return GRAMMAR_QUESTS[questId];
  }
  return null;
}
```

---

## Lesson System

### Question Types

| Type | Direction | Example |
|------|-----------|---------|
| to_english | French → English | "bonjour" → ? |
| to_french | English → French | "hello" → ? |

### Scoring

| Metric | Value |
|--------|-------|
| Pass threshold | 60% |
| Base XP | 25 |
| Performance bonus | up to +50 XP |
| Streak multiplier | 1.0× to 2.0× |

### Streak System

```javascript
// Multipliers
0-2 correct:  1.0×
3-4 correct:  1.25×
5-6 correct:  1.5×
7-9 correct:  1.75×
10+ correct:  2.0×

// Agility protection (NEW)
// At 5+ Agility, first wrong answer per lesson doesn't break streak
```

---

## Grammar System

### ✅ IMPLEMENTED - Three Question Types

#### 1. Conjugation Questions
```javascript
generateConjugationQuestions(verbId, count)
// Input: "etre", 4
// Output: "je ___ (être)" with options [suis, es, est, sommes]
```

#### 2. Fill-in-Blank Questions
```javascript
generateFillInBlankQuestions(topicId, count)
// Input: "etre_present", 4
// Output: "Je ___ français." with options from data
```

#### 3. Gender Match Questions
```javascript
generateGenderMatchQuestions(count)
// Output: "pain" → le/la options
```

### Grammar Quest Structure

```javascript
// In grammarQuests.js
{
  id: "grammar_etre_intro",
  name: "The Essence of Being",
  type: "grammar",
  giver: "sage_aldric",
  objectives: [{
    id: "learn_etre",
    type: "grammar_lesson",
    grammarConfig: [
      { type: "conjugation", topic: "etre", count: 4 },
      { type: "fill_in_blank", topic: "etre_present", count: 4 }
    ]
  }],
  rewards: {
    xp: 150,
    gold: 30,
    spellbookUnlock: ["etre"]  // Unlocks Spellbook page
  }
}
```

---

## Spellbook System

### ✅ IMPLEMENTED - Grammar Reference UI

### Access
- Nav button in left sidebar
- Keyboard shortcut: S
- Escape to close

### Page Categories

| Category | Pages | Status |
|----------|-------|--------|
| **Verbs** | être, avoir, aller, faire, -ER pattern | Unlockable |
| **Grammar** | Articles, Gender | Unlockable |
| **Reference** | Pronouns | Always unlocked |

### Page Unlocking

```javascript
// Quest completion triggers unlock
rewards: {
  spellbookUnlock: ["etre", "avoir"]
}

// Calls unlockSpellbookPages() in game.js
// Shows notification: "📖 Spellbook Updated: Être"
```

### Content Types

| Type | Renders |
|------|---------|
| conjugation | Verb conjugation table |
| pattern | Verb pattern with examples |
| articles | Article cards (le/la/les, un/une/des) |
| gender | Two-column masculine/feminine lists |
| pronouns | Pronoun table with notes |

---

## Hint System

### Hybrid Charge + Unlock Model

**Charges:**
- Base charges per lesson: 2
- Bonus from Insight stat: floor(insight × 0.5)
- Replenish each lesson

**Word Unlock:**
- New words start locked
- Unlock after 3 correct answers
- Insight reduces threshold

### Configuration

```javascript
hintConfig = {
  baseChargesPerLesson: 2,
  insightChargeBonus: 0.5,
  baseUnlockThreshold: 3,
  insightUnlockReduction: 0.3,
  minUnlockThreshold: 1
}
```

---

## NPC System

### ✅ IMPLEMENTED - Tag-Based with Visibility Conditions

### NPC Definition (Compact Format)

```javascript
// In npcs.js
sage_aldric: {
  name: "Sage Aldric",
  title: "Grammar Teacher",
  location: "dawnmere",
  disposition: "wise",
  tags: ["teacher", "grammar", "quest_giver"],
  appearsWhen: { quest: "meeting_family" },  // Visibility condition
  dialogue: {
    greeting: "Ah, a new student...",
    idle: ["Knowledge is power.", "..."]
  },
  quests: ["grammar_etre_intro", "grammar_avoir_intro"]
}
```

### Defaults System

```javascript
const NPC_DEFAULTS = {
  portrait: null,
  disposition: "neutral",
  hidden: false,
  shop: null,
  faction: null,
  quests: [],
  tags: [],
  appearsWhen: null,
  disappearsWhen: null
};
```

### Visibility Conditions

| Condition | Example | Description |
|-----------|---------|-------------|
| quest | `{ quest: "quest_id" }` | Appears after quest completed |
| questActive | `{ questActive: "quest_id" }` | Appears while quest active |
| level | `{ level: 5 }` | Appears at level 5+ |
| flag | `{ flag: "flag_name" }` | Appears when flag set |
| reputation | `{ reputation: { faction: "x", min: 100 } }` | Reputation threshold |

### Helper Functions

```javascript
isNPCVisible(npc, gameState)      // Check visibility
getNPCsInLocation(loc, state)     // Get visible NPCs in location
getNPCsByTag(tag, state)          // Filter by tag
getQuestGivers(state)             // All NPCs with quests
getMerchants(state)               // All NPCs with shops
```

---

## Location System

### Current Locations

| Location | Level | Status |
|----------|-------|--------|
| Dawnmere | 1-5 | ✅ Complete |
| Haari Fields | 5-10 | 🔶 Defined, needs content |
| Lurenium | 10-15 | ⬜ Planned |

### Location Structure

```javascript
{
  id: "dawnmere",
  name: "Dawnmere",
  description: "A small frontier settlement...",
  levelRange: [1, 5],
  type: "settlement",
  npcs: ["urma", "rega", "merchant", "baker", "sage_aldric"],
  quests: ["welcome_to_dawnmere", "meet_the_settlers", ...],
  connectedTo: ["haari_fields"],
  examRequired: true,
  environment: {
    theme: "frontier",
    music: "peaceful_village",
    colors: { primary: "#4a6741", accent: "#c9a959" }
  }
}
```

---

## Boss Exam System

### Exam Flow

```
Initiate Exam
    ↓
Check Prerequisites (HP > 0, no review required)
    ↓
Generate 15 Questions (all location vocabulary)
    ↓
Answer Questions (wrong = -15 HP)
    ↓
Calculate Score
    ├── Pass (≥80%) → Unlock next location, rewards
    └── Fail → Mark retry required
```

### Exam Rewards

| Achievement | Reward |
|-------------|--------|
| Pass exam | 2× XP, 2× Gold |
| Perfect score | Title unlock |
| First attempt | Bonus reputation |

---

## Item & Inventory System

### Item Types

| Type | Slot | Stackable |
|------|------|-----------|
| helm | Equipment | No |
| armor | Equipment | No |
| weapon | Equipment | No |
| accessory | Equipment | No |
| ring | Equipment | No |
| consumable | Inventory | Yes |
| material | Inventory | Yes |
| quest | Inventory | No |

### Stat Bonuses

```javascript
// Items can provide stat bonuses
{
  id: "divine_helmet",
  type: "helm",
  stats: { stamina: 2, devotion: 1 }
}
```

---

## Shop System

### Transaction Flow

```javascript
shopManager.buyItem(npcId, itemId, quantity)
// Applies: Luck discount (1% per point, max 10%)
// Returns: {success, message, cost, discount}

shopManager.sellItem(itemId, quantity)
// Applies: sell multiplier (50%)
// Returns: {success, message, gold}
```

---

## Reputation System

### Faction Levels

| Level | Name | Threshold |
|-------|------|-----------|
| 1 | Stranger | 0 |
| 2 | Acquaintance | 100 |
| 3 | Friendly | 300 |
| 4 | Honored | 600 |
| 5 | Revered | 1000 |
| 6 | Exalted | 1500 |

### Devotion Bonus

```javascript
// In reputationSystem.addReputation()
const multiplier = statsManager.calculateReputationMultiplier();
// Returns 1.0 + (devotion * 0.05)
// E.g., Devotion 10 = 1.5× reputation gain
```

---

## Title System

### Title Sources

| Source | Examples |
|--------|----------|
| milestone | Lesson count, level reached |
| achievement | Perfect lessons, streaks |
| reputation | Faction exalted |
| exam | Boss exam completion |

### Current Titles (25+)

| ID | Name | Requirement |
|----|------|-------------|
| novice | Novice | Start game |
| apprentice | Apprentice | Level 5 |
| scholar | Scholar | 25 lessons |
| perfectionist | Perfectionist | 10 perfect lessons |
| unstoppable | Unstoppable | 20 streak |
| exam_conqueror | Exam Conqueror | Pass any exam |

---

## Spaced Repetition System

### Word States

| State | Criteria |
|-------|----------|
| NEW | Never seen |
| LEARNING | 1-2 repetitions |
| REVIEWING | 3-5 repetitions |
| MASTERED | 6+ repetitions |

### Knowledge Stat Integration

```javascript
// In recordWrong()
const decayReduction = statsManager.calculateMasteryDecayReduction();
// Returns 0.0 to 1.0 (10% per Knowledge point)
// Random chance to prevent mastery level drop
```

### Review Alchemy System

**Status:** Design Phase
**Target:** Phase 3
**Purpose:** Create proactive incentive to review vocabulary by generating crafting resources

#### Design Philosophy

Review sessions should feel **rewarding, not punishing**. Instead of only triggering reviews when HP hits 0 (punishment), players proactively choose to review because it generates valuable resources for Alchemy.

| Principle | Implementation |
|-----------|----------------|
| **Proactive Choice** | Players initiate reviews from menu, not just HP=0 |
| **Tangible Rewards** | Reviews produce crafting materials |
| **Scaling Value** | Harder reviews = better rewards |
| **Never Mandatory** | Can still buy potions or skip Alchemy entirely |

#### Linguistic Essence

A new resource type generated exclusively from review sessions:

| Tier | Name | Source |
|------|------|--------|
| T1 | **Faded Essence** | Basic review (Tier 1 vocabulary) |
| T2 | **Clear Essence** | Mixed review (Tier 1-2 vocabulary) |
| T3 | **Vivid Essence** | Challenging review (Tier 2-3 vocabulary) |
| T4 | **Brilliant Essence** | Advanced review (Tier 3-4 vocabulary) |

#### Review Session Types

| Session | Duration | Vocabulary | Reward |
|---------|----------|------------|--------|
| **Quick Review** | 5 questions | Due words only | 1-2 T1 Essence |
| **Standard Review** | 10 questions | Due + recent | 2-3 T1-T2 Essence |
| **Deep Review** | 20 questions | Comprehensive | 4-5 T2-T3 Essence |
| **Mastery Challenge** | 15 questions | Mastered only, harder | 3-4 T3-T4 Essence |

#### Alchemy Integration

Linguistic Essence becomes a key ingredient in Alchemy recipes:

**New Potion Category: Cognitive Potions**

**Known Recipes** (available from start)

| Recipe | Materials | Effect |
|--------|-----------|--------|
| **Clarity Draught** | 3 Faded Essence, 1 Nettle | +10% XP for 5 lessons |
| **Memory Tonic** | 2 Clear Essence, 1 Sage | Reduces wrong answer penalty by 50% |
| **Focus Elixir** | 3 Vivid Essence, 1 Rosemary | +1 hint use per lesson (3 lessons) |

**Skill-Gated Recipes** (unlock via Alchemy level)

| Recipe | Materials | Effect | Alchemy Req |
|--------|-----------|--------|-------------|
| **Scholar's Brew** | 5 Clear Essence, 2 Sage | Double mastery progress (10 words) | 25 |
| **Insight Potion** | 2 Brilliant Essence, 1 Moonpetal | Reveals optimal answers (1 lesson) | 40 |

**Unlockable Recipes** (shops, reputation, quests)

| Recipe | Materials | Effect | Unlock Method |
|--------|-----------|--------|---------------|
| **Linguist's Draught** | 4 Vivid Essence, 2 Rosemary | +25% XP for 10 lessons | Shop: Lurenium Alchemist (200g) |
| **Retention Brew** | 6 Clear Essence, 3 Sage | Words don't decay for 7 days | Shop: Miner's Deep (250g) |
| **Polyglot's Elixir** | 3 Brilliant Essence, 1 Starbloom | Hints show etymology | Horticulturists: Honored |
| **Comprehension Tonic** | 4 Brilliant Essence, 2 Moonpetal | French text shows inline glosses | Order of the Dawn: Friend |
| **Fluency Flask** | 8 Vivid Essence, 1 Starbloom | All bonuses at 50% (5 lessons) | Quest: "The Sage's Legacy" |

#### Recipe Acquisition Summary

| Method | Recipes |
|--------|---------|
| **Known** | Clarity Draught, Memory Tonic, Focus Elixir |
| **Alchemy 25** | Scholar's Brew |
| **Alchemy 40** | Insight Potion |
| **Shop (Lurenium)** | Linguist's Draught (200g) |
| **Shop (Miner's Deep)** | Retention Brew (250g) |
| **Horticulturists Honored** | Polyglot's Elixir |
| **Order of the Dawn Friend** | Comprehension Tonic |
| **Runecarvers Honored** | Advanced Essence Processing (+1 tier yield) |
| **Quest** | Fluency Flask ("The Sage's Legacy") |

#### Access Points

Players can initiate reviews from multiple places:

| Location | Access |
|----------|--------|
| **Main Menu** | "Review" button always visible |
| **Spellbook** | "Review Due Words" button |
| **Alchemy Workbench** | "Generate Essence" option |
| **Inn/Rest Areas** | NPC offers review sessions |

#### Reward Calculation

```javascript
function calculateEssenceReward(session) {
  const baseReward = SESSION_REWARDS[session.type];

  // Bonuses
  let multiplier = 1.0;
  if (session.accuracy >= 0.9) multiplier += 0.25;  // 90%+ accuracy
  if (session.streak >= 5) multiplier += 0.1;       // Streak bonus
  if (session.includesHardWords) multiplier += 0.2; // Challenging vocab

  return {
    amount: Math.floor(baseReward.amount * multiplier),
    tier: baseReward.tier
  };
}
```

#### Why This Works

1. **Player Choice** - Reviews are opt-in, not forced by HP=0
2. **Meaningful Output** - Essence has real crafting value
3. **Supports Playstyles** - Combat-focused players can skip; completionists love it
4. **Natural Loop** - Learn words → Master words → Review for Essence → Craft potions → Learn better
5. **Not Pay-to-Win** - Can't buy Essence; must earn through knowledge

#### Storage & Inventory

Linguistic Essence appears in the **Resources** section of the Inventory tab alongside other crafting materials:

```
┌─ INVENTORY ─────────────────────────┐
│  [Equipment] [Items] [Resources]    │
├─────────────────────────────────────┤
│  RESOURCES                          │
│  ─────────                          │
│  Ore                                │
│    Copper Ore .......... 12         │
│    Iron Ore ............ 5          │
│                                     │
│  Herbs                              │
│    Nettle .............. 8          │
│    Sage ................ 3          │
│                                     │
│  Linguistic Essence                 │
│    Faded Essence ....... 7          │
│    Clear Essence ....... 4          │
│    Vivid Essence ....... 2          │
│    Brilliant Essence ... 0          │
└─────────────────────────────────────┘
```

#### Potion Rules

| Rule | Behavior |
|------|----------|
| **Stacking** | Only one Cognitive Potion active at a time |
| **Overlap** | New potion replaces current (with confirmation) |
| **Activation** | Manual use from inventory before lesson |
| **Duration** | Measured in lessons completed, not real time |
| **Persistence** | Active effects saved with game state |

#### Session Cooldowns & Requirements

| Rule | Value |
|------|-------|
| **Cooldown** | None (review anytime) |
| **Minimum words for Quick** | 5 due words |
| **Minimum words for Standard** | 10 due words |
| **Minimum words for Deep** | 15 due words |
| **Minimum words for Mastery** | 10 mastered words |
| **Low word fallback** | Pads with random learned words if needed |

#### Failure & Partial Rewards

| Accuracy | Reward |
|----------|--------|
| **90%+** | Full reward + 25% bonus |
| **70-89%** | Full reward |
| **50-69%** | 50% reward (rounded down) |
| **Below 50%** | 1 Faded Essence (consolation) |

Player always receives something for completing a review—no zero rewards.

#### Notifications

| Trigger | Message |
|---------|---------|
| **10+ words due** | "You have X words ready for review!" (on login) |
| **25+ words due** | Badge appears on Review button |
| **After lesson** | "Review now to earn Essence?" (optional prompt) |
| **Potion expiring** | "Your [Potion] will expire after this lesson" |

#### Data Structure

```javascript
// In GameState.player.resources
resources: {
  ore: { copper: 12, iron: 5 },
  herbs: { nettle: 8, sage: 3 },
  linguisticEssence: {
    faded: 7,
    clear: 4,
    vivid: 2,
    brilliant: 0
  }
}

// In GameState.player.activeEffects
activeEffects: {
  cognitivePotions: {
    active: "clarity_draught",  // or null
    remainingLessons: 3,
    bonuses: {
      xpMultiplier: 1.1
    }
  }
}

// In GameState.player.reviewStats
reviewStats: {
  totalReviews: 45,
  lastReviewDate: "2025-12-07",
  essenceEarned: { faded: 52, clear: 28, vivid: 12, brilliant: 3 }
}
```

#### UI Mockup - Review Selection

```
┌─────────────────────────────────────┐
│  📚 REVIEW SESSION                  │
├─────────────────────────────────────┤
│  Words Due: 15                      │
│  Last Review: 2 days ago            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Quick Review (5 questions)  │   │
│  │ ⚗️ Reward: 1-2 Faded Essence │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Standard Review (10 questions)│   │
│  │ ⚗️ Reward: 2-3 Clear Essence │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Deep Review (20 questions)  │   │
│  │ ⚗️ Reward: 4-5 Vivid Essence │   │
│  └─────────────────────────────┘   │
│                                     │
│        [ Start Review ]            │
└─────────────────────────────────────┘
```

#### UI Mockup - Review Complete

```
┌─────────────────────────────────────┐
│  ✨ REVIEW COMPLETE!                │
├─────────────────────────────────────┤
│                                     │
│  Accuracy: 85% (8/10 correct)       │
│                                     │
│  Rewards Earned:                    │
│  ┌─────────────────────────────┐   │
│  │  +2 Clear Essence           │   │
│  │  +15 XP                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  Words reviewed: 10                 │
│  Next review due: 3 words tomorrow │
│                                     │
│  [ Continue ]  [ Review Again ]    │
└─────────────────────────────────────┘
```

---

## Tooltip System

### Tooltip Types

| Type | Trigger | Content |
|------|---------|---------|
| stat | `data-stat-tooltip` | Stat description + effect |
| item | `data-item-tooltip` | Item name, stats, description |
| quest | `data-quest-tooltip` | Quest objectives, rewards |

### Configuration

```javascript
tooltipConfig = {
  showDelay: 400,
  hideDelay: 100,
  offset: { x: 15, y: 15 }
}
```

---

## Save/Load System

### Save Data Structure

```javascript
{
  version: "3.0",
  timestamp: Date.now(),
  player: GameState.player,
  currentLocation: GameState.currentLocation,
  settings: GameState.settings
}
```

### Storage
- **Method:** localStorage
- **Key:** `bytequest_save`
- **Auto-save:** After quest completion, lesson completion, level up

---

## Resource & Skill Infrastructure (Future)

**Status:** Design Phase  
**Target:** Phase 2-3  
**Inspiration:** Legends of Idleon - interconnected, scalable systems

### Design Philosophy

The goal is to create a web of interconnected systems where:
1. **Everything connects to everything** - No isolated mechanics
2. **Numbers scale meaningfully** - Long-term progression goals
3. **Multiple paths reinforce each other** - Player choice matters
4. **Language learning remains core** - Systems support, not replace, learning

### Resource Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    RESOURCE FLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LESSONS ──→ XP, Gold, Knowledge, Mastery                   │
│     ↑                      │                                │
│     │                      ▼                                │
│  Consumables ←────── CRAFTING ←────── Materials             │
│     ↑                      │                                │
│     │                      ▼                                │
│  SHOPS ←──── Gold ←── QUESTS ──→ Reputation, Items          │
│     │                      ↑                                │
│     ▼                      │                                │
│  Equipment ──→ Stats ──→ Better Lesson Performance          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Resource Categories

#### Primary Resources (Core Gameplay)

| Resource | Source | Scales To | Primary Use |
|----------|--------|-----------|-------------|
| **Gold** | Quests, lessons, selling | Millions+ | Shops, crafting fees |
| **XP** | Lessons, quests | Billions+ | Levels 1-100+ |
| **Knowledge** | Lessons, research | Thousands | Spellbook unlocks, skill upgrades |
| **Reputation** | Per faction | 0-10,000+ | Faction ranks, special access |

#### Secondary Resources (Gathered/Earned)

| Resource | Category | Example Tiers |
|----------|----------|---------------|
| **Ore** | Mining | Copper → Iron → Gold → Mythril → Celestial |
| **Herbs** | Botanical | Common → Uncommon → Rare → Legendary |
| **Ink** | Scribing | Basic → Fine → Enchanted → Divine |
| **Fragments** | Ancient | Shards → Pieces → Relics → Artifacts |
| **Essence** | Magical | Dim → Glowing → Radiant → Eternal |
| **Linguistic Essence** | Knowledge | Faded → Clear → Vivid → Brilliant |

#### Tiered Resource Names (Complete)

| Tier | Ore | Herbs | Ink | Fragments | Essence | Linguistic Essence |
|------|-----|-------|-----|-----------|---------|-------------------|
| T1 | Copper Ore | Nettle | Basic Ink | Shard | Dim Essence | Faded Essence |
| T2 | Iron Ore | Sage | Fine Ink | Chip | Faint Essence | Clear Essence |
| T3 | Silver Ore | Rosemary | Quality Ink | Piece | Glowing Essence | Vivid Essence |
| T4 | Gold Ore | Moonpetal | Superior Ink | Relic | Radiant Essence | Brilliant Essence |
| T5 | Mythril Ore | Starbloom | Enchanted Ink | Artifact | Brilliant Essence | — |
| T6 | Celestine Ore | Voidroot | Divine Ink | Ancient Core | Eternal Essence | — |

#### Collection Methods (To Be Implemented)

| Method | Description | Best For |
|--------|-------------|----------|
| **Location Gathering** | Clickable nodes in world locations | Ore, Herbs |
| **Quest Rewards** | Specific quests grant materials | Fragments, rare items |
| **NPC Gifts** | Faction NPCs give resources at rep thresholds | Essence, recipes |
| **Crafting Byproducts** | Some crafting produces secondary materials | Ink (from herbs) |
| **Boss Exam Drops** | Rare materials from exam completion | High-tier everything |
| **Exploration** | Hidden caches, discoverable nodes | All types (rare) |
| **Reputation Rewards** | Faction rank-up bonuses | Faction-specific materials |
| **Purchase** | Buy from NPC shops with gold | Common materials |
| **Review Sessions** | Complete vocabulary reviews | Linguistic Essence (exclusive) |

#### Design Philosophy: Separate Systems

Resources exist as a **parallel progression system** distinct from lessons:

```
┌─────────────────────────────────────────────────────────────┐
│                    TWO PROGRESSION PATHS                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PATH 1: LANGUAGE LEARNING (Core)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Lessons → XP → Levels → Stats → Better Performance  │   │
│  │ Lessons → Mastery → Spellbook Unlocks               │   │
│  │ Lessons → Gold → Shop Purchases                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  PATH 2: RESOURCE & CRAFTING (Parallel)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Gathering → Materials → Crafting → Equipment        │   │
│  │ Quests → "Bring X items" → Reputation               │   │
│  │ Exploration → Rare finds → Special recipes          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  INTERSECTION POINTS:                                       │
│  • Crafted equipment improves lesson performance (stats)    │
│  • Some quests require both lesson completion AND items     │
│  • Gathering activities could include vocabulary practice   │
│  • Faction quests may require crafted gifts                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Principles:**
1. **Lessons don't drop resources** - Keeps learning focused and clean
2. **Resources enable crafting** - Separate system for equipment/consumables
3. **Quest integration** - "Collect X" or "Craft Y" objectives add variety
4. **Optional practice hooks** - Gathering/crafting CAN reinforce vocabulary (e.g., naming herbs in French) but this is supplemental, not required
5. **Player agency** - Can focus on lessons OR gathering OR both

#### Quest Integration Examples

| Quest Type | Example | Resources Involved |
|------------|---------|-------------------|
| **Gather Quest** | "Collect 10 Sage for the herbalist" | Herbs (T2) |
| **Craft Quest** | "Forge an Iron Sword for the guard" | Ore (T2), Bars |
| **Delivery Quest** | "Bring 5 Health Potions to the healer" | Crafted potions |
| **Upgrade Quest** | "Improve your armor before the exam" | Player crafts gear |
| **Faction Gift** | "The Miners Guild wants refined bars" | Bars (any tier) |

#### Practice Integration (Optional Future Feature)

Gathering and crafting could include light vocabulary reinforcement:

| Activity | Practice Element |
|----------|------------------|
| **Mining** | Name the ore in French to extract |
| **Herbalism** | Identify plant by French name |
| **Smithing** | Recipe steps use French verbs |
| **Alchemy** | Ingredient lists in French |

**Note:** This is optional enhancement, not core requirement. Players can gather/craft without forced vocabulary if desired.

### Multiplier & Scaling System

#### Design Principle: Fixed Rewards Only

Multipliers and additive bonuses are **rare, one-time rewards** from completing content. They cannot be farmed, repeated, or purchased.

#### Bonus Sources

| Source | Farmable? | Example Reward |
|--------|-----------|----------------|
| **Quest Completion** | ❌ One-time | "Master of the Mines" → +5 base Ore |
| **Reputation Milestones** | ❌ Per rank | Miners Guild Rank 4 → x1.15 Ore |
| **Title Unlocks** | ❌ Achievement | "Herbalist" title → x1.1 Herbs |
| **Story Progression** | ❌ One-time | Finish Lurenium → x1.2 all gathering |
| **Equipment** | ❌ Crafted once | Mythril Pickaxe → +10 Ore |
| **Boss Exam First Clear** | ❌ One-time | First clear Dawnmere → +2 all resources |

#### What Players CANNOT Do

- ❌ Repeat quests for more multipliers
- ❌ Farm enemies/nodes for multiplier drops
- ❌ Buy multipliers from shops
- ❌ Stack infinite temporary buffs
- ❌ Trade or transfer bonuses

#### Calculation Formula

```javascript
// Additive bonuses applied first, then multipliers
function calculateGatherAmount(resourceType) {
  const base = 1;
  const additiveBonus = getAdditiveBonus(resourceType);  // From quests, equipment
  const multiplier = getMultiplier(resourceType);        // From reputation, titles, story
  
  return Math.floor((base + additiveBonus) * multiplier);
}
```

#### Progression Scaling

| Stage | Additive | Multiplier | Result | Source |
|-------|----------|------------|--------|--------|
| **Early** (Lv 1-5) | +0 | x1.0 | 1/action | Base only |
| **Mid** (Lv 10-15) | +5 | x1.3 | 8/action | Early quests + Rep Rank 2 |
| **Late** (Lv 20-30) | +15 | x2.0 | 32/action | Story + Rep Rank 4 + Titles |
| **End Game** (Lv 50+) | +30 | x4.0 | 124/action | All content completed |

#### Quest Requirements Scale With Bonuses

| Quest Level | Tier | Amount | Actions Needed |
|-------------|------|--------|----------------|
| Early (1-5) | T1 | 10-50 | ~30-50 |
| Mid (10-15) | T2-T3 | 100-500 | ~40-60 |
| Late (20-30) | T4-T5 | 1,000-10,000 | ~50-80 |
| End Game (50+) | T5-T6 | 50,000-100,000 | ~60-100 |

**Key Insight:** Time-per-quest stays roughly consistent because bonuses scale with requirements. Numbers get satisfyingly large, but effort remains balanced.

#### Design Benefits

1. **Predictable Balance** - Exact bonuses are known, no RNG exploitation
2. **Content-Driven** - Must progress story/quests to improve gathering
3. **No Exploit Loops** - Economy remains stable
4. **Meaningful Rewards** - Each bonus feels significant and earned
5. **Late Game Viable** - High requirements achievable with full progression

### Crafting System

#### Design Philosophy

The crafting system is **lean and meaningful** - every item feels special. No bloat, no RNG failure, no quality tiers. Players craft specific items they need and customize through enchantments.

#### Core Principles

| Aspect | Decision |
|--------|----------|
| **Success Rate** | 100% (no failure) |
| **Quality Tiers** | None - each item is unique |
| **Cost** | Materials only (no gold/time/energy fees) |
| **Skill Requirement** | Yes - recipes gated by skill level |
| **RNG** | None (except possibly legendary items in future) |
| **Customization** | Via enchantments, not crafting variants |

#### Crafting Skills

| Skill | Inputs | Outputs |
|-------|--------|---------|
| 🔨 **Smithing** | Ore, Bars | Weapons, Armor, Tools |
| ⚗️ **Alchemy** | Herbs, Bottles | Potions, Elixirs |
| ✨ **Enchanting** | Essence, Fragments | Enchantments, Upgrades |

**Target:** 15-20 recipes per skill (flexible, can adjust as content develops)

#### Skill Progression (WoW-Style)

Every craft grants exactly **+1 skill point**. No RNG on skill-ups.

| Tier | Name | Skill Range | Unlocked By |
|------|------|-------------|-------------|
| T1 | **Initiate** | 1-75 | Starting |
| T2 | **Adept** | 76-150 | Quest or Reputation |
| T3 | **Scholar** | 151-225 | Quest or Reputation |
| T4 | **Savant** | 226-300 | Quest or Reputation |
| T5 | **Virtuoso** | 301-375 | Late game content |

Players hit tier caps and must complete content to unlock the next tier - prevents grinding to max without progression.

#### Recipe Structure

```javascript
const recipe = {
  id: "iron_sword",
  name: "Iron Sword",
  skill: "smithing",
  skillRequired: 25,           // Minimum skill to craft
  tier: "initiate",            // Tier requirement
  materials: [
    { id: "iron_bar", amount: 3 },
    { id: "leather_wrap", amount: 1 }
  ],
  output: { id: "iron_sword", amount: 1 },
  skillGain: 1                 // Always +1
};
```

#### Recipe Unlock Methods

| Method | Example |
|--------|---------|
| **Start with basics** | Copper Bar, Minor Health Potion |
| **Skill level unlocks** | Smithing 25 → Iron Sword recipe |
| **Quest rewards** | "The Blacksmith's Secret" → Mythril recipes |
| **Reputation** | Miners Guild Rank 3 → Special pickaxe recipe |
| **Purchase** | Buy recipe scrolls from NPCs |
| **Discovery** | Find ancient recipe scrolls in world |

#### Customization Through Enchanting

Instead of quality tiers or RNG variants, players personalize gear with enchantments:

| Base Item | + Enchantment | Result |
|-----------|---------------|--------|
| Iron Sword | + Fire Essence | Iron Sword (Fire) |
| Iron Sword | + Luck Shard | Iron Sword (Lucky) |
| Leather Armor | + Sage Extract | Leather Armor (Wisdom) |

Same base item, different builds. Player choice drives customization, not RNG.

#### Example Recipes by Tier

**Smithing (Initiate 1-75)**
| Recipe | Skill Req | Materials | Output Stats |
|--------|-----------|-----------|--------------|
| Copper Bar | 1 | 2 Copper Ore | Crafting material |
| Copper Dagger | 10 | 2 Copper Bar | +1 Attack |
| Copper Helm | 20 | 3 Copper Bar | +5 HP |
| Iron Bar | 25 | 3 Iron Ore, 1 Coal | Crafting material |
| Copper Chestplate | 35 | 5 Copper Bar, 1 Leather Wrap | +10 HP |
| Iron Dagger | 40 | 2 Iron Bar | +2 Attack |
| Iron Sword | 50 | 3 Iron Bar, 1 Leather Wrap | +3 Attack |
| Iron Helm | 60 | 4 Iron Bar | +10 HP |
| Iron Chestplate | 70 | 6 Iron Bar, 2 Leather Wrap | +20 HP |

**Smithing (Journeyman 75-150)**
| Recipe | Skill Req | Materials | Output Stats |
|--------|-----------|-----------|--------------|
| Steel Bar | 75 | 2 Iron Bar, 2 Coal | Crafting material |
| Iron Shield | 80 | 5 Iron Bar, 1 Wood Plank | +15 HP, Block chance |
| Steel Dagger | 90 | 2 Steel Bar | +4 Attack |
| Steel Sword | 100 | 3 Steel Bar, 1 Leather Wrap | +5 Attack |
| Steel Helm | 115 | 4 Steel Bar | +15 HP |
| Steel Shield | 125 | 5 Steel Bar, 2 Wood Plank | +25 HP, Block chance |
| Steel Chestplate | 140 | 6 Steel Bar, 3 Leather Wrap | +35 HP |

**Smithing (Expert 150-225)**
| Recipe | Skill Req | Materials | Output Stats |
|--------|-----------|-----------|--------------|
| Mythril Bar | 150 | 3 Mythril Ore, 1 Dim Essence | Crafting material |
| Steel Greatsword | 160 | 5 Steel Bar, 2 Leather Wrap | +7 Attack (2H) |
| Mythril Dagger | 175 | 2 Mythril Bar | +6 Attack, +1 Luck |
| Mythril Sword | 190 | 3 Mythril Bar, 1 Leather Wrap | +8 Attack |
| Mythril Helm | 200 | 4 Mythril Bar, 1 Faint Essence | +20 HP, +1 Insight |
| Mythril Chestplate | 220 | 6 Mythril Bar, 2 Faint Essence | +50 HP |

**Smithing (Master 225-300)**
| Recipe | Skill Req | Materials | Output Stats |
|--------|-----------|-----------|--------------|
| Lurenium Bar | 225 | 3 Lurenium Ore, 1 Glowing Essence | Crafting material |
| Mythril Greatsword | 240 | 5 Mythril Bar, 1 Faint Essence | +10 Attack (2H), +1 Insight |
| Lurenium Dagger | 260 | 2 Lurenium Bar, 1 Glowing Essence | +9 Attack, +2 Luck |
| Lurenium Sword | 275 | 3 Lurenium Bar, 1 Glowing Essence | +12 Attack, +1 Devotion |
| Lurenium Helm | 285 | 4 Lurenium Bar, 1 Radiant Essence | +30 HP, +2 Insight |
| Lurenium Chestplate | 300 | 6 Lurenium Bar, 2 Radiant Essence | +75 HP, +1 All Stats |

#### Smithing Equipment Slots

| Slot | Available Types | Notes |
|------|-----------------|-------|
| **Weapon** | Dagger, Sword, Greatsword | Greatswords are 2H (no shield) |
| **Off-hand** | Shield | Provides HP + block chance |
| **Head** | Helm | HP focus |
| **Body** | Chestplate | Primary defense |
| **Accessory** | (Not smithed) | Rings, amulets from other sources |

#### Material Tiers

| Tier | Metal | Level Range | Source |
|------|-------|-------------|--------|
| T1 | Copper | 1-35 | Dawnmere mines |
| T2 | Iron | 25-75 | Haari Fields deposits |
| T3 | Steel | 75-150 | Crafted from Iron + Coal |
| T4 | Mythril | 150-225 | Lurenium outskirts |
| T5 | Lurenium | 225-300 | Ancient Lurenium ruins |

#### Cross-Craft Requirements

| Material | Source Skill | Used In |
|----------|--------------|---------|
| Leather Wrap | Hunting/Leatherworking | Weapon grips, armor padding |
| Wood Plank | Woodcutting/Carpentry | Shield bases, weapon handles |
| Coal | Mining | Steel smelting |
| Essence | Enchanting/Gathering | High-tier equipment |

#### French Vocabulary Integration (Optional)

Smithing can reinforce French through recipe steps:

| Step | French | English |
|------|--------|---------|
| Heat the forge | Chauffez la forge | Heat the forge |
| Add the ore | Ajoutez le minerai | Add the ore |
| Strike the metal | Frappez le métal | Strike the metal |
| Quench in water | Trempez dans l'eau | Quench in water |
| Polish the blade | Polissez la lame | Polish the blade |

Players who correctly identify/translate steps could receive bonus XP or quality bonuses.

**Alchemy (Initiate 1-75)**
| Recipe | Skill Req | Materials |
|--------|-----------|-----------|
| Minor Health Potion | 1 | 2 Nettle, 1 Empty Bottle |
| Minor Mana Potion | 15 | 2 Sage, 1 Empty Bottle |
| Antidote | 30 | 1 Nettle, 1 Sage, 1 Empty Bottle |
| Health Potion | 50 | 3 Rosemary, 1 Empty Bottle |
| Stamina Elixir | 65 | 2 Sage, 2 Nettle, 1 Empty Bottle |

**Note:** Full recipe lists for Alchemy, Cooking, Leatherworking, and Carpentry to be developed during implementation.

### Quest Design Structures

#### Current Quest Types (Phase 1)

| Type | Example |
|------|---------|
| `talk` | Speak with Elder Urma |
| `lesson` | Complete greetings lesson |
| `meet` | Meet 3 settlers |

#### Expanded Quest Types

**Language-Focused**

| Type | Description | Example |
|------|-------------|---------|
| `lesson` | Complete a vocabulary/grammar lesson | "Learn basic greetings" |
| `review` | Use spaced repetition on X words | "Review 20 mastered words" |
| `mastery` | Reach mastery level on specific vocab | "Master all color words" |
| `translate` | Translate a phrase/document | "Translate the merchant's letter" |
| `dialogue` | Complete conversation with NPC in French | "Order food at the tavern" |
| `dictation` | Listen and write what you hear | "Transcribe the bard's song" |

**Resource & Crafting**

| Type | Description | Example |
|------|-------------|---------|
| `gather` | Collect X resources | "Gather 10 Iron Ore" |
| `craft` | Create specific item | "Forge an Iron Sword" |
| `deliver` | Bring item to NPC | "Deliver 5 Health Potions to the healer" |
| `upgrade` | Improve equipment | "Enchant your weapon" |

**Exploration & Discovery**

| Type | Description | Example |
|------|-------------|---------|
| `discover` | Find a location | "Discover the hidden cave" |
| `explore` | Visit X locations | "Explore 3 areas in The Haari Fields" |
| `find` | Locate hidden object/NPC | "Find the lost artifact" |
| `inspect` | Examine something in world | "Inspect the ancient runes" |

**Social & Reputation**

| Type | Description | Example |
|------|-------------|---------|
| `talk` | Speak with NPC | "Speak with Elder Urma" |
| `meet` | Meet X NPCs | "Meet 3 settlers" |
| `reputation` | Reach rep threshold | "Reach Friendly with Miners Guild" |
| `gift` | Give item to NPC/faction | "Gift 10 Herbs to the Horticulturists" |

**Combat/Exam**

| Type | Description | Example |
|------|-------------|---------|
| `exam` | Complete boss exam | "Pass the Dawnmere Exam" |
| `score` | Achieve X% on exam | "Score 90% on the grammar exam" |
| `streak` | Answer X correct in a row | "Get 10 correct answers in a row" |

**Chain & Conditional**

| Type | Description | Example |
|------|-------------|---------|
| `choice` | Pick between options (affects story) | "Side with the Guild or the Farmers" |
| `timed` | Complete within time limit | "Deliver the medicine before nightfall" |
| `sequential` | Do objectives in order | "First gather, then craft, then deliver" |
| `parallel` | Do objectives in any order | "Help three different NPCs" |

#### Quest Structure Examples

**Simple (Single Objective)**
```javascript
objectives: [
  { id: "gather_ore", type: "gather", target: "iron_ore", amount: 10 }
]
```

**Multi-Step (Sequential)**
```javascript
objectives: [
  { id: "gather", type: "gather", target: "iron_ore", amount: 5, order: 1 },
  { id: "craft", type: "craft", target: "iron_bar", amount: 5, order: 2 },
  { id: "deliver", type: "deliver", target: "blacksmith", item: "iron_bar", amount: 5, order: 3 }
]
```

**Multi-Step (Parallel)**
```javascript
objectives: [
  { id: "help_farmer", type: "talk", target: "rega" },
  { id: "help_herbalist", type: "gather", target: "sage", amount: 5 },
  { id: "help_smith", type: "craft", target: "copper_bar", amount: 3 }
]
// Can complete in any order
```

**Choice-Based**
```javascript
objectives: [
  { 
    id: "choose_side", 
    type: "choice", 
    options: [
      { id: "guild", text: "Support the Guild", reputation: { miners_guild: 50 } },
      { id: "farmers", text: "Support the Farmers", reputation: { horticulturists: 50 } }
    ]
  }
]
```

### Answer Validation & Strictness

#### Design Philosophy

> **Correct is correct. Wrong is wrong. But teach before enforcing.**

Strictness increases with quest progression, not individual word encounters. Early content teaches proper form; later content requires it.

#### Strictness by Quest Stage

| Quest Stage | Accents | Spelling | Behavior |
|-------------|---------|----------|----------|
| **Early** (Lv 1-5) | Lenient | Lenient | Accept, show correct form as tip |
| **Mid** (Lv 6-15) | Warning | Strict | Accept accents with warning, spelling must be exact |
| **Late** (Lv 16+) | Strict | Strict | Everything must be correct |

#### Implementation

```javascript
const quest = {
  id: "learning_basics",
  level: 1,
  strictness: "lenient"  // "lenient" | "warning" | "strict"
};

function validateAnswer(input, correct, strictness) {
  const trimmed = input.trim();
  
  // Exact match always correct
  if (trimmed === correct) return { correct: true };
  
  // Check without accents
  const inputNormalized = removeAccents(trimmed);
  const correctNormalized = removeAccents(correct);
  
  if (inputNormalized.toLowerCase() === correctNormalized.toLowerCase()) {
    switch (strictness) {
      case "lenient":
        return { correct: true, tip: `Proper spelling: "${correct}"` };
      case "warning":
        return { correct: true, warning: `Accents required in advanced lessons: "${correct}"` };
      case "strict":
        return { correct: false, feedback: `Accent required: "${correct}"` };
    }
  }
  
  return { correct: false, feedback: `Correct answer: "${correct}"` };
}
```

#### Feedback Examples

**Lenient (Early):**
```
Your answer: "cafe"
✓ Correct!
Tip: The proper spelling is "café"
```

**Warning (Mid):**
```
Your answer: "cafe"
✓ Correct!
⚠️ In advanced lessons, "café" will require the accent.
```

**Strict (Late):**
```
Your answer: "cafe"
✗ Incorrect
Correct: "café"
```

#### Open Questions

See **[PATCH_NOTES.md](PATCH_NOTES.md#open-questions)** for pending decisions.

### Dialogue Language

#### Decision: English-Only Dialogue

All NPC dialogue is in English. French is taught exclusively through structured activities:

| Learning Context | French Used |
|------------------|-------------|
| Vocabulary lessons | Yes |
| Grammar lessons | Yes |
| Boss exams | Yes |
| Resource minigames | Yes |
| Alchemy crafting | Yes |
| NPC dialogue | **No** |
| Quest descriptions | No |
| UI text | No |

**Rationale:** Progressive dialogue immersion (gradually introducing French into conversations) is out of scope. This keeps the learning experience focused and predictable - players know exactly when they'll be tested. It also avoids overwhelming beginners and simplifies content creation.

---

### Navigation Guidance

#### Decision: Contextual Clarity

Navigation guidance varies based on content type:

| Content Type | Guidance Level | Example |
|--------------|----------------|---------|
| Main quests | **Clear** | Quest markers, explicit NPC names, highlighted objectives |
| Side quests | **Moderate** | General direction, NPC hints in dialogue |
| Secrets/Easter eggs | **Vague** | No markers, discovered through exploration |
| Hidden NPCs | **None** | Appear based on conditions, no indication they exist |

**Rationale:** Main story and learning content should never leave players stuck - frustration distracts from the educational goal. But optional content rewards curiosity and exploration for players who enjoy discovery.

---

### Learning Flow

#### Decision: New Material in Quests, Review in Professions

| Activity | Content Type | Purpose |
|----------|--------------|---------|
| **Quests** | New vocabulary/grammar | Introduction and first exposure |
| **Professions** (Mining, Fishing, Alchemy, etc.) | Previously learned material | Reinforcement and spaced repetition |

**Flow:**
```
Quest → Learn "pomme, orange, banane"
         ↓
Later → Mining minigame uses "pomme, orange, banane" as review
         ↓
Boss Exam → Tests accumulated vocabulary
```

**Rationale:** Quests drive story progression and introduce new concepts. Professions provide low-pressure repetition without blocking progress. This separates "learning mode" (focused, quest-driven) from "practice mode" (casual, profession-driven).

---

### Faction Discovery

#### Decision: Factions Must Be Discovered Before Earning Reputation

Factions are locked until the player makes first contact. This creates progression and prevents reputation display from spoiling unexplored content.

**States:**
- **Undiscovered** - Faction shows as "???" in reputation panel (if shown at all)
- **Discovered** - First contact made, reputation starts at 0 (Stranger rank)

**Discovery triggers:**
- Talking to an NPC with that faction tag
- Entering a faction's primary location
- Quest event that introduces the faction
- Story progression milestone

**Implementation:**
```javascript
// Check if discovered
reputationManager.isFactionDiscovered('horticulturists')

// Discover on first contact
reputationManager.discoverFaction('horticulturists')

// Adding rep fails if not discovered
reputationManager.addReputation('old_guard', 50) // Returns null if not discovered
```

**Storage:** `GameState.player.discoveredFactions = ['dawnmere', 'horticulturists', ...]`

**Rationale:** Players shouldn't see reputation bars for factions they've never encountered. Discovery creates "aha" moments when finding new groups and prevents information overload for new players.

---

### Combat System

#### Decision: No Combat System

ByteQuest does not have a traditional combat system. Language learning IS the core gameplay loop.

| Traditional RPG | ByteQuest Equivalent |
|-----------------|---------------------|
| Random encounters | Lesson quizzes |
| Boss fights | Boss exams |
| Combat stats | Learning stats (HP, XP) |
| Damage dealt | Correct answers |
| Damage taken | Wrong answers (HP loss) |
| Defeating enemies | Completing lessons |
| Loot drops | Quest rewards |

**Rationale:** Adding combat would dilute the game's focus and identity. The lesson/exam system already provides the challenge and progression that combat typically offers in RPGs.

#### Tertiary Resources (Crafted/Refined)

| Resource | Made From | Used For |
|----------|-----------|----------|
| **Bars** | Ore | Equipment crafting |
| **Potions** | Herbs + Bottles | Consumables |
| **Scrolls** | Ink + Parchment | Lesson bonuses |
| **Enchantments** | Essence + Fragments | Gear upgrades |

### Scalability Tiers

| Tier | Name | Number Range | Color Code |
|------|------|--------------|------------|
| T1 | Common | 1-100 | Gray |
| T2 | Uncommon | 100-1K | Green |
| T3 | Rare | 1K-10K | Blue |
| T4 | Epic | 10K-100K | Purple |
| T5 | Legendary | 100K-1M | Orange |
| T6 | Mythic | 1M-10M | Red |
| T7+ | Ascended | 10M+ | Gold (future content) |

#### Scaling Formula

```javascript
// Base value scales exponentially per tier
function getResourceValue(tier) {
  return Math.floor(10 * Math.pow(5, tier - 1));
}

// T1: 10
// T2: 50
// T3: 250
// T4: 1,250
// T5: 6,250
// T6: 31,250
```

### Skill System

#### Gathering Skills

| Skill | Resource | Scaling Benefit | Faction Tie |
|-------|----------|-----------------|-------------|
| ⛏️ **Mining** | Ore | Better ore types | Miners Guild |
| 🌿 **Herbalism** | Herbs | Rarer plants | Horticulturists |
| ✍️ **Scribing** | Ink | More per action | Scholars |
| 📚 **Research** | Knowledge | Faster unlocks | Sages |

#### Crafting Skills

| Skill | Inputs | Outputs | Faction Tie |
|-------|--------|---------|-------------|
| 🔨 **Smithing** | Ore, Bars | Weapons, Armor | Miners Guild |
| ⚗️ **Alchemy** | Herbs, Bottles | Potions | Horticulturists |
| ✨ **Enchanting** | Essence, Fragments | Enchantments | Runecarvers |

### System Connection Matrix

| System | Produces | Consumes |
|--------|----------|----------|
| **Lessons** | XP, Gold, Knowledge, Mastery | Consumables (optional) |
| **Quests** | Gold, XP, Items, Reputation, Materials | Quest items (sometimes) |
| **Crafting** | Equipment, Consumables, Scrolls | Materials, Gold |
| **Gathering** | Materials (Ore, Herbs, etc.) | Time, tools |
| **Shops** | Items, Equipment, Recipes | Gold, Reputation |
| **Factions** | Recipes, Titles, Access | Reputation, Gifts |
| **Stats** | Better performance | Stat points (from levels) |
| **Equipment** | Stat bonuses | Crafted gear |
| **Spellbook** | Grammar reference | Knowledge |

### Interconnection Examples

#### Example 1: Preparing for Boss Exam

```
Goal: Pass Lurenium Boss Exam

Player could:
├── Craft T2 Health Potions (Alchemy + Herbs)
├── Craft Focus Scroll (Scribing + Ink + Knowledge)
├── Upgrade to Iron Armor (Smithing + Ore)
├── Buy hints from shop (Gold)
└── Complete faction quest for exam buff (Reputation)

All paths help → Player has OPTIONS
```

#### Example 2: Unlocking Spellbook Page

```
Goal: Unlock "Advanced Conjugation" page

Requirements:
├── 500 Knowledge (from lessons + research)
├── 10 T2 Ink (from scribing or purchase)
├── 5 Fragments (from quests or archaeology)
└── "Friend" rank with Sage Aldric (reputation)

Multiple systems involved → Meaningful unlock
```

#### Example 3: Faction Progression

```
Goal: Reach "Master" rank with Miners Guild

Methods:
├── Complete mining quests (+rep)
├── Gift refined bars (+rep)
├── Craft items for NPCs (+rep)
├── Discover rare ore veins (+rep)
└── Complete vocabulary about mining/geology (+rep)

Language learning integrated with world systems
```

### Data Structure Proposal

#### Player Resources (Addition to GameState)

```javascript
resources: {
  // Primary
  gold: 0,
  knowledge: 0,
  
  // Materials (by tier)
  ore: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  herbs: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  ink: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  fragments: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  essence: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  
  // Refined (crafted intermediates)
  bars: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 },
  extracts: { t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0 }
}
```

#### Skills Structure

```javascript
skills: {
  // Gathering
  mining: { level: 1, xp: 0 },
  herbalism: { level: 1, xp: 0 },
  scribing: { level: 1, xp: 0 },
  research: { level: 1, xp: 0 },
  
  // Crafting
  smithing: { level: 1, xp: 0 },
  alchemy: { level: 1, xp: 0 },
  enchanting: { level: 1, xp: 0 }
}
```

#### Recipe Structure

```javascript
const RECIPES = {
  // Smithing
  copper_bar: {
    skill: 'smithing',
    level: 1,
    inputs: [{ resource: 'ore', tier: 1, amount: 5 }],
    outputs: [{ resource: 'bars', tier: 1, amount: 1 }],
    xp: 10
  },
  copper_sword: {
    skill: 'smithing',
    level: 5,
    inputs: [
      { resource: 'bars', tier: 1, amount: 3 },
      { resource: 'gold', amount: 50 }
    ],
    outputs: [{ item: 'copper_sword', amount: 1 }],
    xp: 50
  },
  
  // Alchemy
  minor_health_potion: {
    skill: 'alchemy',
    level: 1,
    inputs: [{ resource: 'herbs', tier: 1, amount: 3 }],
    outputs: [{ item: 'health_potion_t1', amount: 1 }],
    xp: 15
  }
};
```

### Implementation Managers (Future)

| Manager | Purpose | Priority |
|---------|---------|----------|
| **ResourceManager** | Track & modify all resources | High |
| **SkillManager** | Skill XP, leveling, unlocks | High |
| **CraftingManager** | Recipe validation, crafting operations | High |
| **GatheringManager** | Gathering actions, skill checks | Medium |

### Integration with Existing Systems

| Current System | New Connection |
|----------------|----------------|
| **Stats** | Affect gathering rates (Fortune → rare finds) |
| **Reputation** | Unlock faction recipes, gathering zones |
| **Quests** | Require crafted items, gathering objectives |
| **Spellbook** | Unlock pages with Knowledge resource |
| **Equipment** | Crafted from gathered materials |
| **Lessons** | Potions/scrolls provide bonuses |
| **Locations** | Different zones have different resources |

### Open Questions

See **[PATCH_NOTES.md](PATCH_NOTES.md#open-questions)** for all pending design decisions.

---

## Future Systems

### Phase 2 Planned

| System | Description | Status |
|--------|-------------|--------|
| Typed Input | Free-text answers with spelling tolerance | ⬜ Planned |
| World Map | Visual travel between locations | ⬜ Planned |
| Day/Night Cycle | NPC schedules, events | ⬜ Planned |
| Crafting | Professions system | ⬜ Planned |
| Collectables | Ancient relics, lore items | ⬜ Planned |

### Phase 3 Planned

| System | Description | Status |
|--------|-------------|--------|
| Audio | Background music, sound effects | ⬜ Planned |
| Achievements | ~50 achievements | ⬜ Planned |
| Daily Challenges | Repeatable content | ⬜ Planned |
| Accessibility | Screen reader, colorblind modes | ⬜ Planned |

### Achievements System (Phase 3)

#### Achievement Tiers

Achievements use a difficulty-based tier system (similar to PlayStation trophies):

| Tier | Icon | Difficulty | XP Reward | Gold Reward | Examples |
|------|------|------------|-----------|-------------|----------|
| **Bronze** | 🥉 | Easy | 25 XP | 10 gold | Tutorial completion, first NPC met |
| **Silver** | 🥈 | Medium | 100 XP | 50 gold | 100 words learned, location discovered |
| **Gold** | 🥇 | Hard | 250 XP | 150 gold | Boss exam passed, faction exalted |
| **Platinum** | 💎 | Very Hard | 500 XP | 500 gold | 100% completion, all achievements |

**Tier Guidelines:**
- **Bronze**: Awarded for natural progression, early milestones, introductory content
- **Silver**: Requires moderate effort, mid-game accomplishments, category mastery
- **Gold**: Significant accomplishments, late-game content, challenging feats
- **Platinum**: Exceptional dedication, completionist goals, rare achievements

**Special Achievement Types:**
| Type | Description | Example |
|------|-------------|---------|
| **Hidden** | Not shown until unlocked | Secret lore discoveries |
| **Progressive** | Track progress (10/100) | "Learn 100 words" shows 47/100 |
| **Cumulative** | Across all saves | Total gold earned account-wide |

#### Achievement Categories

| Category | Focus | Examples |
|----------|-------|----------|
| **Language Mastery** | Learning milestones | Words learned, grammar mastered |
| **Story Progress** | Main quest completion | Chapter completions, major revelations |
| **Exploration** | Discovering the world | Locations found, NPCs met |
| **Reputation** | Faction relationships | Rank milestones with each faction |
| **Crafting** | Creation milestones | Skill tiers, items crafted |
| **Collection** | Gathering completionism | Relics found, resources gathered |
| **Challenge** | Skill-based feats | Perfect exams, streaks, no-damage lessons |
| **Secret** | Hidden discoveries | Easter eggs, hidden lore, rare events |

#### Example Achievements

**Language Mastery**

| Achievement | Tier | Requirement | Reward |
|-------------|------|-------------|--------|
| First Words | 🥉 Bronze | Learn 10 vocabulary words | - |
| Conversational | 🥈 Silver | Learn 100 vocabulary words | Title: "Student" |
| Fluent | 🥇 Gold | Learn 500 vocabulary words | Title: "Linguist" |
| Polyglot | 💎 Platinum | Master all vocabulary | Title: "Polyglot" |
| Grammar Novice | 🥉 Bronze | Complete 5 grammar lessons | - |
| Grammar Master | 🥇 Gold | Master all grammar categories | Title: "Grammarian" |

**Story Progress**

| Achievement | Tier | Requirement | Reward |
|-------------|------|-------------|--------|
| Welcome to Dawnmere | 🥉 Bronze | Complete tutorial | - |
| The Truth Emerges | 🥈 Silver | Discover first lore contradiction | - |
| Hermeau's Secret | 🥈 Silver | Learn about dark magic | - |
| Liberation | 🥇 Gold | Complete main story | Title: "Hero of Verandum" |

**Challenge**

| Achievement | Tier | Requirement | Reward |
|-------------|------|-------------|--------|
| Perfect Lesson | 🥉 Bronze | 100% on any lesson | - |
| Flawless Exam | 🥇 Gold | 100% on boss exam | Title: "Perfectionist" |
| Streak Master | 🥈 Silver | 50 correct answers in a row | - |
| Untouchable | 🥈 Silver | Complete lesson without HP loss | - |
| Iron Will | 🥉 Bronze | Recover from 1 HP to full | - |

#### Open Questions

See **[PATCH_NOTES.md](PATCH_NOTES.md#achievements)** for achievements pending decisions.

### Endgame Content (Phase 3+)

**Purpose:** Give players a reason to continue practicing after completing the main story.

#### The Ruins of the Ancients

**Overview:**
A multi-floor dungeon that unlocks after completing the main story (or reaching a high level). The ruins are remnants of a civilization that predates Verandum — tied to the mysterious origins of Lurenium and the ancient relics scattered throughout the world.

**Structure:**

| Floor | Theme | Vocabulary Focus | Difficulty |
|-------|-------|------------------|------------|
| 1-2 | Entry Chambers | Review: Greetings, Numbers | Easy |
| 3-4 | Living Quarters | Review: Family, Food | Easy-Medium |
| 5-6 | Library Wing | Review: Time, Places | Medium |
| 7-8 | Workshop Halls | Review: Verbs, Colors | Medium-Hard |
| 9-10 | Inner Sanctum | Mixed: All categories | Hard |
| 11+ | The Depths | Cumulative + New content | Very Hard |

**Mechanics:**

```
Enter Ruins
    ↓
Floor Challenge (8-12 questions)
    ↓
    ├── Pass (≥70%) → Advance to next floor
    │                → Earn floor rewards
    │                → Unlock lore fragment
    │
    └── Fail → Return to surface
              → Keep partial rewards
              → Can retry from floor 1
    ↓
Boss Floor (every 5 floors)
    ↓
Major Exam (15-20 questions, 80% to pass)
    ↓
Checkpoint unlocked (can restart from here)
```

**Rewards:**

| Floor | Reward Type | Examples |
|-------|-------------|----------|
| 1-4 | Basic | Gold, consumables |
| 5-9 | Intermediate | Rare materials, equipment |
| 10 | Major | Unique title: "Ruin Delver" |
| 11-14 | Advanced | Ancient equipment, cosmetics |
| 15 | Major | Unique title: "Archaeologist" |
| 20 | Ultimate | Unique title: "Keeper of Secrets", legendary item |

**Lore Integration:**
Each floor reveals fragments of the ancient civilization's history — who they were, why they fell, and their connection to the Light and Dark magic. The deepest floors reveal truths that even the Actual Lore doesn't fully explain.

| Floor | Lore Fragment Example |
|-------|----------------------|
| 5 | "The ancients spoke a tongue before French... before any language we know." |
| 10 | "They built Lurenium not as a city, but as a seal." |
| 15 | "The Light and Dark were not always separate forces." |
| 20 | "The Corruption is not new. It is a return." |

---

#### Corruption Incursions

**Overview:**
Repeatable timed events where the Corruption resurges in a previously cleared location. The player must "cleanse" the area through vocabulary challenges before time expires.

**Trigger:**
- Random chance after completing main story
- Notification: "The Corruption stirs in [Location]..."
- Available for limited time (real-time or in-game)

**Structure:**

| Phase | Challenge | Time Limit |
|-------|-----------|------------|
| Wave 1 | 5 questions (location vocab) | 60 seconds |
| Wave 2 | 7 questions (mixed vocab) | 75 seconds |
| Wave 3 | 10 questions (harder variants) | 90 seconds |
| Boss | Mini-exam (8 questions, 75% pass) | 120 seconds |

**Rewards:**

| Completion | Reward |
|------------|--------|
| Wave 1 | Small gold + XP |
| Wave 2 | Medium gold + XP + material |
| Wave 3 | Large gold + XP + rare material |
| Boss | Bonus XP + reputation + unique drop chance |
| Full Clear | Title progress: "Corruption's Bane" |

**Scaling:**
Difficulty increases based on player level and number of incursions completed. Later incursions introduce:
- Stricter timing
- Harder vocabulary
- Mixed grammar questions
- "Corrupted" questions (reversed — English to French becomes French to English mid-question)

---

#### The Spire of Trials

**Overview:**
An endless tower challenge. See how high you can climb. Each floor gets progressively harder. No checkpoints — fail and start over.

**Structure:**

```
Floor 1: 5 questions, generous timing
Floor 2: 5 questions, slightly harder
...
Floor 10: 8 questions, strict timing
...
Floor 20: 10 questions, very strict timing
...
Floor 50+: Expert mode — typo-strict, no hints, mixed content
```

**Mechanics:**
- One wrong answer = lose a life (start with 3)
- Lose all lives = run ends
- Every 5 floors = bonus life (max 5)
- Every 10 floors = checkpoint reward (gold, items)

**Leaderboard Potential:**
If online features are ever added:
- Weekly leaderboard: highest floor reached
- Personal best tracking
- "This week's champion" title for top player

**Rewards:**

| Floor | Reward |
|-------|--------|
| 10 | Title: "Novice Climber" |
| 25 | Title: "Tower Regular" |
| 50 | Title: "Spire Veteran" |
| 100 | Title: "Ascendant" |
| Personal Best | Bonus XP each time you beat your record |

---

#### Endgame Content Summary

| Content | Type | Replayability | Primary Reward |
|---------|------|---------------|----------------|
| Ruins of the Ancients | Dungeon crawl | Medium (lore is finite) | Lore, unique items |
| Corruption Incursions | Timed event | High (random, scaling) | Materials, reputation |
| Spire of Trials | Endless challenge | High (beat your best) | Titles, bragging rights |
| **Translation Gauntlet Raids** | Boss fights | High (weekly hardmode) | Titles, legendary gear |

**Implementation Priority:**

| Content | Complexity | Suggested Phase |
|---------|------------|-----------------|
| Spire of Trials | Low | Phase 3 |
| Corruption Incursions | Medium | Phase 3 |
| Translation Gauntlet Raids | Medium | Phase 3 |
| Ruins of the Ancients | High | Phase 4 |

---

#### Translation Gauntlet Raid Bosses

> **Note:** This system is separate from the **Lore/Story Bosses** documented in `RAID_BOSSES_DRAFT.md`.
> - **Translation Gauntlet** = Language mastery challenges (repeatable grind)
> - **Lore Bosses** = Narrative encounters tied to Corruption/story (one-time story beats)
>
> Both systems coexist as endgame content with different purposes.

**Overview:**
Three multi-phase boss encounters that test cumulative language mastery. Unlocks after main story completion. Each boss is a "Translation Gauntlet" - a sustained challenge requiring vocabulary recall, grammar application, and full sentence translation. These are *repeatable* challenges focused on language learning rather than story progression.

**Core Mechanics:**

```
Enter Raid
    ↓
Phase 1: Vocabulary Recall
    ├── Rapid-fire word translations
    ├── 80% accuracy required to advance
    └── Builds "momentum" for Phase 2
    ↓
Phase 2: Grammar Application
    ├── Conjugation + grammar questions
    ├── 75% accuracy required to advance
    └── Wrong answers deal HP damage
    ↓
Phase 3: Full Sentence Translation
    ├── Complete English → French sentences
    ├── Multiple valid answers accepted
    ├── 70% accuracy to defeat boss
    └── Streak bonuses deal extra damage
    ↓
Victory → Claim rewards
```

**Visual Feedback:**
- Boss has visible HP bar
- Correct answers = deal damage to boss
- Wrong answers = boss "attacks" (player takes HP damage)
- Streak multipliers = bonus damage
- Phase transitions = boss "enrages" (visual change)

---

##### Boss 1: The Linguist's Trial

**Theme:** Foundations
**Focus:** Core vocabulary + être/avoir/aller

| Phase | Content | Questions | Pass Rate |
|-------|---------|-----------|-----------|
| 1 | Basic vocab (greetings, family, food, time) | 12 | 80% |
| 2 | être/avoir/aller conjugation + usage | 12 | 75% |
| 3 | Full sentences using foundations | 10 | 70% |

**Prerequisites:**
- Complete main story

**Rewards:**
| Type | Reward |
|------|--------|
| Title | "Proven Speaker" |
| Equipment | Linguist's Badge (accessory, +2 Insight) |
| Achievement | "First Blood" |

---

##### Boss 2: The Scholar's Crucible

**Theme:** Grammar Mastery
**Focus:** All grammar patterns + intermediate vocabulary

| Phase | Content | Questions | Pass Rate |
|-------|---------|-----------|-----------|
| 1 | Intermediate vocab (places, verbs, colors) | 15 | 80% |
| 2 | Regular -er verbs + gender/articles | 15 | 75% |
| 3 | Complex sentences with mixed grammar | 12 | 70% |

**Prerequisites:**
- Defeat "The Linguist's Trial"
- Master 100+ vocabulary words

**Rewards:**
| Type | Reward |
|------|--------|
| Title | "Grammar Sage" |
| Equipment | Scholar's Tome (weapon, +3 Knowledge, +2 Insight) |
| Achievement | "Scholar's Honor" |

---

##### Boss 3: The Grand Inquisition

**Theme:** Cumulative Mastery
**Focus:** Everything - the ultimate test

| Phase | Content | Questions | Pass Rate |
|-------|---------|-----------|-----------|
| 1 | All vocabulary categories (random) | 18 | 80% |
| 2 | All grammar types (random) | 18 | 75% |
| 3 | Complex translations (hardest) | 15 | 70% |

**Prerequisites:**
- Defeat "The Scholar's Crucible"
- Master 200+ vocabulary words
- Reach max reputation with at least one faction

**Rewards:**
| Type | Reward |
|------|--------|
| Title | "Grandmaster" |
| Equipment | Inquisitor's Seal (legendary ring, +5 all stats) |
| Achievement | "The Grand Inquisition" (endgame complete) |
| Unlock | Hardmode for all raids |

---

##### Repeat & Scaling System

| Attempt Type | Difficulty | Rewards |
|--------------|------------|---------|
| First clear | Normal | Full rewards (title, equipment, achievement) |
| Repeat clear | Normal | 50% gold/XP, earns Raid Tokens |
| Weekly Hardmode | +20% questions, stricter timing | Bonus Raid Tokens, cosmetic variants |

**Raid Tokens:**
Endgame currency earned from repeat clears. Can be exchanged for:
- Consumables (XP boosters, hint refills)
- Cosmetic titles ("Raid Veteran", "Hardmode Hunter")
- Alternate equipment skins
- Rare materials

**Weekly Reset:**
- Hardmode availability resets weekly
- First Hardmode clear each week grants bonus rewards
- Tracks "weeks completed" for long-term achievement

---

### Technical Debt

- [ ] Consider IndexedDB for larger saves
- [ ] Audio system integration
- [ ] Mobile responsive improvements
- [ ] Full keyboard navigation
- [ ] Accessibility features

---

## Appendix: Event Flow Diagrams

### Lesson Flow

```
Start Lesson
    ↓
Generate Questions (vocabulary or grammar)
    ↓
[Loop] Show Question
    ↓
    ├── Correct → Update streak, SRS, continue
    │   └── Agility may protect streak on first wrong
    │
    └── Wrong → HP damage (Strength/Luck may reduce)
              → Reset streak (unless Agility protected)
    ↓
All Questions Done
    ↓
Calculate Results
    ├── Pass (≥60%) → Award XP, update quest
    │                 → Unlock Spellbook pages if grammar
    └── Fail → Encourage review
    ↓
Update Stats & Save
```

### Grammar Quest Flow

```
Complete prerequisite quest (e.g., meeting_family)
    ↓
Sage Aldric appears (appearsWhen triggered)
    ↓
Talk to Sage Aldric → Accept grammar quest
    ↓
Talk again → "Start Grammar Lesson" button
    ↓
startGrammarLesson() generates questions
    ├── Conjugation (je ___ être)
    ├── Fill-in-blank (Je ___ français)
    └── Gender match (pain → le/la)
    ↓
Complete lesson → Quest complete
    ↓
Spellbook pages unlocked
```

---

## Art Direction & Visual Design

**Status:** Planning Phase  
**Reference Images:** See `/docs/art-reference/` folder (to be created)

### Target Aesthetic

The visual style aims for a **cozy, vibrant pixel-art RPG** aesthetic reminiscent of classic 16-bit era games with modern polish. Key characteristics:

- **Warm, inviting color palette** with teal/blue roofs, warm wood tones, lush greens
- **Detailed pixel art** with visible but refined pixelation
- **Rich environmental storytelling** through visual details (gardens, market stalls, water features)
- **Fantasy RPG atmosphere** that supports the language-learning narrative

### Reference Style Analysis

**Village Scenes (Dawnmere):**
- Isometric or panoramic perspective showing depth
- River with wooden bridges as central feature
- Mix of building types: homes, shops with awnings, church/temple
- Scattered NPCs and environmental details (barrels, crates, flowers)
- Distant views to other zones (fields, mountains, forests)
- Time-of-day lighting variations possible

**Spellbook/Cookbook UI:**
- Physical open book with aged parchment texture
- Categorized pages with visual icons for each grammar topic
- Magical elements (glowing cauldron, mystical symbols)
- Tab navigation at bottom with colored category icons
- Food/cooking metaphor for grammar concepts ("Appetizers" = basics, "Main Courses" = core content)

**UI Framework:**
- Dark panel backgrounds with golden/ornate frame borders
- Bottom HUD bar with icon-based navigation
- Location name display with progress indicators
- Character portrait integration
- Inventory grid with detailed item icons

### Asset Requirements

#### Backgrounds (Per Location)
| Location | Description | Priority |
|----------|-------------|----------|
| Dawnmere | Riverside frontier settlement, wooden buildings, market area | High |
| Haari Fields | Golden wheat fields, scattered farms, boar creatures | Medium |
| Lurenium | Ancient golden city, grand architecture, walls | Medium |
| World Map | Stylized map showing all regions | Low |

#### Character Sprites
| Type | Needed | Priority |
|------|--------|----------|
| Player classes | 3 (Scholar, Warrior, Traveler) | High |
| Dawnmere NPCs | 6 (Urma, Rega, Merchant, Baker, Sage, Pierre) | High |
| Haari Fields NPCs | 2 (Dave, Mary) | Medium |
| Enemy/creature sprites | Slimes, boars | Low |

#### UI Elements
| Element | Description | Priority |
|---------|-------------|----------|
| Icon set | Inventory items, quest markers, stats | High |
| Panel frames | Golden ornate borders for modals | Medium |
| Spellbook texture | Aged book with parchment pages | Medium |
| Button styles | Pixel-art styled buttons | Medium |
| Progress bars | HP, XP, reputation bars | Low (functional exists) |

#### Effects & Polish
| Element | Description | Priority |
|---------|-------------|----------|
| Transition effects | Scene changes, modal opens | Low |
| Particle effects | Level up, quest complete | Low |
| Animated elements | Water, smoke, NPC idle | Low |

### Art Sourcing Options

#### Option 1: AI-Generated Art
- **Pros:** Quick iteration, matches reference style, cost-effective for backgrounds
- **Cons:** Consistency challenges, can't animate, licensing considerations
- **Best for:** Background scenes, concept art, placeholder assets

#### Option 2: Commissioned Pixel Art
- **Pros:** Consistent style, animatable, full ownership, unique to ByteQuest
- **Cons:** Expensive ($50-200+ per asset), time-consuming
- **Best for:** Character sprites, key UI elements, iconic items

#### Option 3: Asset Packs (itch.io, GameDev Market)
- **Pros:** Professional quality, ready-to-use, affordable ($10-50 per pack)
- **Cons:** Not unique, may need multiple packs to cover needs
- **Best for:** Tilesets, generic icons, UI frameworks
- **Recommended packs to evaluate:** (TBD)

#### Option 4: Hybrid Approach (Recommended)
- AI-generated backgrounds for each location
- Asset pack sprites and icons for consistency
- Commissioned custom work for player characters and key NPCs
- Custom UI polish using CSS with asset pack elements

### Color Palette (Derived from References)

```
Primary Colors:
- Teal/Cyan: #4ECDC4 (roofs, water, accents)
- Warm Brown: #8B7355 (wood, buildings)
- Forest Green: #228B22 (grass, trees)
- Golden Yellow: #FFD700 (UI accents, important items)

UI Colors (Current):
- Dark Background: #1a1a2e
- Panel Background: #1f2833
- Gold Accent: #ffd700
- Text Light: #edf2f4

Potential Updates:
- Consider warmer dark tones to match pixel art warmth
- Add parchment/cream color for book interfaces
- Introduce more green tones for nature areas
```

### Open Design Questions

See **[PATCH_NOTES.md](PATCH_NOTES.md#art-direction)** for art direction pending decisions.

### Implementation Phases

**Phase A: Asset Collection (Future)**
- [ ] Create `/docs/art-reference/` folder with reference images
- [ ] Research and bookmark suitable asset packs
- [ ] Get quotes for commissioned work
- [ ] Generate AI background concepts for each location

**Phase B: UI Framework Update (Future)**
- [ ] Implement icon-based navigation (once icons available)
- [ ] Add panel frame graphics
- [ ] Update color scheme to match art direction
- [ ] Create spellbook visual redesign

**Phase C: Scene Integration (Future)**
- [ ] Replace CSS gradient backgrounds with art
- [ ] Add NPC sprite positioning system
- [ ] Implement scene transition effects
- [ ] Add ambient animations

**Phase D: Polish (Future)**
- [ ] Particle effects for rewards/level up
- [ ] Character portrait integration
- [ ] Loading screens with art
- [ ] Title screen redesign

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| Dec 8, 2025 | 3.14 | Expanded Smithing profession - 4 skill tiers, 30+ recipes, equipment slots, material progression, cross-craft requirements, French vocabulary integration |
| Dec 7, 2025 | 3.13 | Completed Review Alchemy - storage, potion rules, cooldowns, failure states, notifications, data structures, UI mockups |
| Dec 7, 2025 | 3.12 | Expanded Review Alchemy - recipe acquisition via shops, reputation, and quests |
| Dec 7, 2025 | 3.11 | Added Review Alchemy System - Linguistic Essence resource, Cognitive Potions, proactive review incentives |
| Dec 7, 2025 | 3.10 | Merged RAID_BOSSES_DRAFT, TUTORIAL_DESIGN, RESOURCE_MINIGAMES into this document |
| Dec 5, 2025 | 3.7 | Added Endgame Content section (Ruins, Incursions, Spire) |
| Dec 4, 2025 | 3.6 | Added Quest Design Structures and Answer Validation/Strictness system |
| Dec 4, 2025 | 3.5 | Added Crafting System - skills, tiers, recipes, enchantment customization |
| Dec 4, 2025 | 3.4 | Added Multiplier & Scaling System - fixed rewards only, no farming, progression scaling |
| Dec 4, 2025 | 3.3 | Added tiered resource names table and collection methods to Resource & Skill Infrastructure |
| Dec 4, 2025 | 3.2 | Added Resource & Skill Infrastructure section for future interconnected systems |
| Dec 3, 2025 | 3.1 | Added Art Direction & Visual Design section with reference analysis |
| Dec 3, 2025 | 3.0 | Added Grammar System, Spellbook System, NPC visibility system, Stats effects wiring, updated file structure |
| Nov 30, 2025 | 2.0 | Added Boss Exam, Title, Location systems |
| Nov 28, 2025 | 1.0 | Initial systems design |

---

## Tutorial System

**Status:** Design Phase - Implementation in Phase 2

### Tutorial Philosophy

#### Core Principles

1. **Learn by Doing** - Teach through gameplay, not text walls
2. **Just-in-Time** - Explain systems when they become relevant
3. **Skippable** - Experienced players can skip or speed through
4. **Contextual** - Information appears where it matters
5. **Reinforced** - Key concepts repeated through quests and dialogue

#### What We Want Players to Feel

- **Empowered** - "My choices matter"
- **Curious** - "I want to explore more"
- **Rewarded** - "My effort is paying off"
- **Not Overwhelmed** - "I understand what's happening"

---

### Systems to Teach

#### Priority 1: Core Gameplay (First Session)
| System | When to Teach | How |
|--------|---------------|-----|
| Moving & Clicking NPCs | Immediate | Visual prompt on first load |
| Dialogue & Options | First NPC interaction | Urma explains |
| Quest Accept/Track | First quest offer | UI highlight |
| Lessons & Answering | First lesson quest | In-lesson tutorial |
| HP & Damage | First wrong answer | Visual feedback + tooltip |
| XP & Leveling | First XP gain | Celebration + explanation |

#### Priority 2: Progression Systems (After Level 2)
| System | When to Teach | How |
|--------|---------------|-----|
| **Stats (5 Attributes)** | Level 2 stat point | Dedicated tutorial popup |
| **Reputation** | First faction interaction | NPC explains benefits |
| Inventory & Equipment | First item reward | Prompt to equip |
| Spellbook | First grammar lesson | NPC reference |

#### Priority 3: Advanced Systems (After Level 5)
| System | When to Teach | How |
|--------|---------------|-----|
| Titles | First title earned | Celebration + equip prompt |
| Milestones & Achievements | First milestone tier | Progress screen tour |
| Boss Exams | Before first exam | NPC warning + preparation |
| Spaced Repetition | After 10+ words learned | Review reminder |

---

### Teaching Order

```
Session 1: Arrival in Dawnmere
├── Click to interact (visual prompt)
├── Talk to Urma (dialogue basics)
├── Accept first quest (quest UI)
├── Complete lesson (lesson mechanics)
├── Wrong answer = HP loss (consequence)
├── Complete quest = XP/Gold (rewards)
└── Save game (persistence)

Session 2: Growing Stronger
├── Level up! (celebration)
├── Stat point available (STATS TUTORIAL)
├── Meet more NPCs
├── Reputation introduced (REPUTATION TUTORIAL)
└── Equipment basics

Session 3: Deeper Systems
├── Spellbook reference
├── Review sessions
├── Multiple quests
└── Shop interactions

Session 4+: Mastery
├── Titles and achievements
├── Boss exam preparation
├── Location travel
└── Advanced strategies
```

---

### Stats System Tutorial

#### When It Triggers

**Trigger:** Player reaches Level 2 and has unspent stat points

#### Tutorial Flow

**Step 1: Level Up Celebration**
```
╔═══════════════════════════════════════════════════════════╗
║  ✨ LEVEL UP! ✨                                          ║
║                                                           ║
║  You are now Level 2!                                     ║
║                                                           ║
║  You have earned 3 STAT POINTS to spend.                  ║
║  These will shape how you learn and grow.                 ║
║                                                           ║
║              [ Learn About Stats ]                        ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 2: Stats Overview Panel**
```
╔═══════════════════════════════════════════════════════════╗
║  📊 YOUR STATS                                            ║
║                                                           ║
║  You have 5 attributes that affect your journey:          ║
║                                                           ║
║  ❤️ VITALITY - Your health and survival                   ║
║  📚 WISDOM - XP gains and learning speed                  ║
║  💰 FORTUNE - Gold rewards and lucky finds                ║
║  🎯 PRECISION - Answer accuracy bonuses                   ║
║  💨 AGILITY - Streak protection and recovery              ║
║                                                           ║
║              [ Tell Me More ] [ Skip ]                    ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 3: Detailed Breakdown (if "Tell Me More")**

*Page 1: Vitality*
```
╔═══════════════════════════════════════════════════════════╗
║  ❤️ VITALITY                                              ║
║  "The strength to endure"                                 ║
║                                                           ║
║  Every point in Vitality gives you:                       ║
║  • +5 Maximum HP                                          ║
║  • More chances to make mistakes and recover              ║
║                                                           ║
║  BEST FOR: Players who want a safety net while learning   ║
║                                                           ║
║  Example: At 10 Vitality, you have 150 HP instead of 100  ║
║                                                           ║
║         [ ← Back ]  [ Next: Wisdom → ]                    ║
╚═══════════════════════════════════════════════════════════╝
```

*Page 2: Wisdom*
```
╔═══════════════════════════════════════════════════════════╗
║  📚 WISDOM                                                ║
║  "Knowledge grows faster for the wise"                    ║
║                                                           ║
║  Every point in Wisdom gives you:                         ║
║  • +2% XP from all sources                                ║
║  • Level up faster                                        ║
║  • Unlock content sooner                                  ║
║                                                           ║
║  BEST FOR: Players who want to progress quickly           ║
║                                                           ║
║  Example: At 10 Wisdom, you earn 20% bonus XP             ║
║                                                           ║
║         [ ← Vitality ]  [ Next: Fortune → ]               ║
╚═══════════════════════════════════════════════════════════╝
```

*Page 3: Fortune*
```
╔═══════════════════════════════════════════════════════════╗
║  💰 FORTUNE                                               ║
║  "Luck favors the prepared"                               ║
║                                                           ║
║  Every point in Fortune gives you:                        ║
║  • +3% Gold from all sources                              ║
║  • Better shop deals                                      ║
║  • More resources for items and equipment                 ║
║                                                           ║
║  BEST FOR: Players who love collecting and shopping       ║
║                                                           ║
║  Example: At 10 Fortune, you earn 30% bonus gold          ║
║                                                           ║
║         [ ← Wisdom ]  [ Next: Precision → ]               ║
╚═══════════════════════════════════════════════════════════╝
```

*Page 4: Precision*
```
╔═══════════════════════════════════════════════════════════╗
║  🎯 PRECISION                                             ║
║  "Accuracy is the path to mastery"                        ║
║                                                           ║
║  Every point in Precision gives you:                      ║
║  • +1% chance to auto-correct wrong answers               ║
║  • Occasionally saves you from mistakes                   ║
║  • Reduces frustration on near-misses                     ║
║                                                           ║
║  BEST FOR: Players who sometimes click too fast           ║
║                                                           ║
║  Example: At 10 Precision, 10% chance to save mistakes    ║
║                                                           ║
║         [ ← Fortune ]  [ Next: Agility → ]                ║
╚═══════════════════════════════════════════════════════════╝
```

*Page 5: Agility*
```
╔═══════════════════════════════════════════════════════════╗
║  💨 AGILITY                                               ║
║  "Swift recovery, unbroken momentum"                      ║
║                                                           ║
║  Every point in Agility gives you:                        ║
║  • Better streak protection                               ║
║  • Once per lesson: save your streak from breaking        ║
║  • Keep your bonus multipliers longer                     ║
║                                                           ║
║  BEST FOR: Players who build long answer streaks          ║
║                                                           ║
║  Example: High Agility = streak survives one mistake      ║
║                                                           ║
║         [ ← Precision ]  [ Finish Tutorial ]              ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 4: First Stat Point Allocation**

```
╔═══════════════════════════════════════════════════════════╗
║  🎮 TRY IT NOW                                            ║
║                                                           ║
║  Let's spend your first stat point!                       ║
║                                                           ║
║  Choose a stat to increase:                               ║
║                                                           ║
║  [ ❤️ VIT ]  [ 📚 WIS ]  [ 💰 FOR ]  [ 🎯 PRE ]  [ 💨 AGI ]║
║                                                           ║
║  Don't worry - you can build any way you like.            ║
║  There's no "wrong" choice!                               ║
║                                                           ║
║  Remaining points: 2                                      ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 5: Confirmation & Tip**

```
╔═══════════════════════════════════════════════════════════╗
║  ✅ Stats Updated!                                        ║
║                                                           ║
║  You increased Wisdom to 2.                               ║
║  You now earn +4% bonus XP!                               ║
║                                                           ║
║  💡 TIP: You can always check your stats in the           ║
║  Profile screen. Click 👤 Profile in the sidebar.         ║
║                                                           ║
║  You still have 2 points to spend - or save them          ║
║  for later!                                               ║
║                                                           ║
║              [ Open Profile ]  [ Continue ]               ║
╚═══════════════════════════════════════════════════════════╝
```

#### Stats Tutorial - NPC Reinforcement

**Sage Aldric** (after tutorial):
> "I see you've begun to develop your abilities. Remember, a scholar who balances their strengths will go far. Wisdom speeds the journey, but Vitality ensures you complete it."

**Traveling Merchant**:
> "Fortune favors those who invest in it, friend! A bit more luck in your pocket means better deals at my shop."

---

### Reputation System Tutorial

#### When It Triggers

**Trigger:** Player gains reputation for the first time (usually after "Meet the Settlers" quest)

#### Tutorial Flow

**Step 1: First Reputation Gain**

```
╔═══════════════════════════════════════════════════════════╗
║  🏘️ REPUTATION GAINED                                     ║
║                                                           ║
║  +10 Reputation with Dawnmere Settlers                    ║
║                                                           ║
║  The people of Dawnmere are starting to trust you!        ║
║                                                           ║
║              [ What is Reputation? ]  [ OK ]              ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 2: Reputation Explanation (if clicked)**

```
╔═══════════════════════════════════════════════════════════╗
║  🤝 REPUTATION                                            ║
║                                                           ║
║  As you help people and complete quests, you build        ║
║  REPUTATION with different factions.                      ║
║                                                           ║
║  Higher reputation unlocks:                               ║
║  • 🛒 Shop discounts                                      ║
║  • 📜 Special quests                                      ║
║  • 🎁 Unique items                                        ║
║  • 🏆 Titles and rewards                                  ║
║                                                           ║
║              [ Show Me More ]  [ Got It ]                 ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 3: Faction Ranks (if "Show Me More")**

```
╔═══════════════════════════════════════════════════════════╗
║  📊 DAWNMERE SETTLERS - RANKS                             ║
║                                                           ║
║  ○ Stranger (0) ......... No special benefits             ║
║  ○ Visitor (100) ........ 5% shop discount                ║
║  ○ Friend (250) ......... 10% discount + special quests   ║
║  ○ Honored (500) ........ 15% discount + unique items     ║
║  ● Champion (1000) ...... 25% discount + exclusive title  ║
║                                                           ║
║  Your current standing: Stranger (10/100 to Visitor)      ║
║  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10%   ║
║                                                           ║
║              [ View All Factions ]  [ Close ]             ║
╚═══════════════════════════════════════════════════════════╝
```

**Step 4: Multiple Factions Preview**

```
╔═══════════════════════════════════════════════════════════╗
║  🌍 FACTIONS OF TURUEM                                    ║
║                                                           ║
║  You will encounter many groups on your journey:          ║
║                                                           ║
║  🏘️ Dawnmere Settlers - The frontier community            ║
║  🌾 Horticulturists - Farmers and plant cultivators       ║
║  ⛏️ Miners Guild - Craftsmen and metalworkers             ║
║  🛡️ The Old Guard - Keepers of the old ways              ║
║  👑 Loyalists - Supporters of King Hermeau                ║
║  ...and more to discover                                  ║
║                                                           ║
║  💡 Some factions have conflicting goals. Choose wisely!  ║
║                                                           ║
║              [ Close ]                                    ║
╚═══════════════════════════════════════════════════════════╝
```

#### Reputation Tutorial - NPC Reinforcement

**Elder Urma** (after reaching Visitor rank):
> "Word spreads quickly in a small settlement. You've proven yourself trustworthy. Rega mentioned he might have better prices for a friend of Dawnmere."

**Rega** (if reputation is high):
> "Ah, my favorite customer! For you, I think I can lower the prices a bit. Friends help friends, non?"

**Rega** (if reputation is low):
> "Hmm, you're still new around here. Full price for now, but help out the community and we'll talk."

---

### Tutorial Quest Integration

#### Existing Quests as Tutorials

| Quest | Teaches |
|-------|---------|
| Welcome to Dawnmere | Basic interaction, quest acceptance |
| Meet the Settlers | Exploration, NPC tracking, **Reputation intro** |
| Learning the Basics | Lesson mechanics, HP system, answering |
| A Helping Hand | Multiple objectives, item rewards |
| Grammar: "To Be" | Spellbook reference, grammar concepts |

#### Proposed Tutorial Quests (New)

**Quest: "Understanding Your Strengths" (Stats Tutorial)**

**Trigger:** Reach Level 2
**Giver:** Sage Aldric
**Type:** Tutorial

**Dialogue - Intro:**
> "Ah, I sense you've grown stronger. But strength means nothing if you don't understand it. Come, let me explain the five aspects of a learner's spirit."

**Objectives:**
1. Open the Profile screen
2. Read about each stat (hover/click)
3. Allocate at least 1 stat point

**Rewards:**
- 25 XP
- Unlocks stat tooltips permanently

**Dialogue - Complete:**
> "Excellent. Now you understand the forces that shape your growth. Vitality keeps you standing, Wisdom speeds your path, Fortune fills your pockets, Precision sharpens your mind, and Agility protects your momentum. Balance them as you see fit."

---

**Quest: "A Place in the Community" (Reputation Tutorial)**

**Trigger:** Complete "Meet the Settlers"
**Giver:** Elder Urma
**Type:** Tutorial

**Dialogue - Intro:**
> "You've met our people, but do you understand what it means to truly belong? Reputation is earned through deeds, not words. Let me explain how trust works in Turuem."

**Objectives:**
1. View the Reputation tab in Progress screen
2. Complete a quest that awards reputation
3. Check your standing with Dawnmere Settlers

**Rewards:**
- 50 Reputation with Dawnmere Settlers
- Unlocks faction tooltips

**Dialogue - Complete:**
> "Now you see. Every action builds—or breaks—trust. Help our people, and doors will open. Ignore them, and they will close. Choose your allies wisely, traveler."

---

### UI Indicators & Tooltips

#### Persistent Tooltips (Always Available)

After tutorials complete, these remain accessible:

**Stat Icons (Profile Screen):**
```
❤️ Vitality
├── Current: 5
├── Bonus: +25 Max HP
└── "Increases your health pool"

📚 Wisdom
├── Current: 3
├── Bonus: +6% XP
└── "Earn experience faster"
```

**Reputation Bar (Progress Screen):**
```
🏘️ Dawnmere Settlers
├── Rank: Visitor
├── Progress: 150/250 to Friend
├── Current Bonus: 5% shop discount
└── Next Rank Bonus: 10% discount + special quests
```

#### Contextual Reminders

**On Level Up (if points unspent):**
```
💡 You have 3 unspent stat points!
   Open Profile to allocate them.
   [ Open Profile ] [ Later ]
```

**On Reputation Rank Up:**
```
🎉 Rank Up! You are now "Friend" with Dawnmere Settlers!
   New benefits: 10% shop discount, new quests available
   [ View Details ] [ OK ]
```

**On Significant Reputation Gain:**
```
+25 Reputation with Miners Guild
Progress: ████████░░ 80% to next rank
```

---

### Tutorial Implementation Notes

#### Phase 2 Implementation Checklist

- [ ] Create TutorialManager class
- [ ] Add tutorial state tracking to GameState
- [ ] Build modal/overlay system for tutorial popups
- [ ] Implement "first time" flags for each system
- [ ] Add skip/dismiss functionality
- [ ] Create tutorial quest definitions
- [ ] Add NPC dialogue variations for tutorial reinforcement
- [ ] Implement persistent tooltips
- [ ] Add tutorial progress tracking
- [ ] Settings option: "Show Tutorials" (on/off)

#### Tutorial State Structure

```javascript
tutorialState: {
  completed: {
    basicInteraction: false,
    questSystem: false,
    lessonMechanics: false,
    statsSystem: false,
    reputationSystem: false,
    inventorySystem: false,
    spellbookSystem: false,
    titleSystem: false
  },
  currentTutorial: null,
  tutorialStep: 0,
  skipAll: false
}
```

#### Accessibility Considerations

- All tutorials should be keyboard-navigable
- Text should respect font size settings
- Animations should respect "reduce motion" setting
- Tutorial text should be concise but complete
- Provide "Read Aloud" option for longer tutorials (future)

---

### Tutorial Key Teaching Points Summary

#### Stats System - Player Should Learn:

1. **5 stats exist** - Vitality, Wisdom, Fortune, Precision, Agility
2. **Stats have tangible effects** - HP, XP%, Gold%, auto-correct, streak protection
3. **Points come from leveling** - 3 points per level
4. **No wrong choices** - All builds are viable
5. **Where to manage** - Profile screen

#### Reputation System - Player Should Learn:

1. **Multiple factions exist** - Each with their own ranks
2. **Reputation is earned** - Through quests and actions
3. **Higher ranks = better benefits** - Discounts, quests, items
4. **Some factions conflict** - Choices matter
5. **Where to check** - Progress screen → Reputation tab

---

### Tutorial Dialogue Scripts

#### Sage Aldric - Stats Dialogue

**First Meeting (post-Level 2):**
> "Greetings, young learner. I am Aldric, keeper of knowledge in these parts. I sense potential within you—but potential must be shaped. Have you considered how to develop your abilities?"

**If player hasn't allocated points:**
> "I see you have untapped potential. Three points of growth, waiting to be directed. Shall I explain the paths before you?"

**After tutorial:**
> "Remember: there is no single path to mastery. A warrior may value Vitality, a scholar may prize Wisdom, but the greatest among us find their own balance."

#### Elder Urma - Reputation Dialogue

**After Meet the Settlers:**
> "You've begun to know our people. But knowing and trusting are different things. In Turuem, reputation is currency more valuable than gold. Earn it carefully."

**On reaching Friend rank:**
> "The whispers have changed, traveler. Once they called you 'stranger.' Now they call you 'friend.' That word carries weight here."

**On reaching Champion rank:**
> "Champion of Dawnmere. I never thought I'd give that title to an outsider. But you've proven that where you come from matters less than what you do. Our doors are always open to you."

---

## Resource Minigames

**Status:** Implemented (Tier 1-3)
**Priority:** Phase 2-3

### Overview

Resource gathering minigames combine language learning with crafting material collection. Each resource type has a themed minigame that tests vocabulary while providing crafting materials.

#### Goals

- Make resource gathering **engaging, not tedious**
- Reinforce **themed vocabulary** per resource type
- Provide **variety** in gameplay beyond standard lessons
- Support the **crafting system** with material flow
- Scale **difficulty** with resource tier

---

### Resource Types

| Tier | Herb | Ore | Wood | Fish | Hide |
|------|------|-----|------|------|------|
| 1 | Meadow Leaf | Copper Chunk | Pine Log | River Perch | Boar Hide |
| 2 | Sunpetal | Iron Ore | Oak Timber | Lake Trout | Wolf Pelt |
| 3 | Moonblossom | Silver Vein | Ironwood | Sea Bass | Bear Fur |
| 4 | Starlight Herb | Mythril Shard | Ancient Oak | Golden Carp | Drake Scale |

#### Gathering Locations

| Resource | Locations |
|----------|-----------|
| **Herbs** | Haari Fields, Northern Forest, Hidden Monastery |
| **Ore** | Miner's Deep, Mountain Pass |
| **Wood** | Northern Forest, Haari Fields |
| **Fish** | Dawnmere, Fredrois, Underground Lake |
| **Hides** | Haari Fields (boar), Northern Forest (wolf, bear) |

---

### Tier 1 Minigames

#### Mining: Timed Quiz

**Concept:** Answer as many vocabulary questions as possible before time runs out. Each correct answer = 1 ore.

**Implementation:** Reuses existing lesson system with timer overlay.

```
┌─────────────────────────────────────────────────────────┐
│  ⛏️ MINING - Copper Vein                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Time Remaining: [████████░░░░] 45s                     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           What does "le fer" mean?              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│    ┌──────────┐  ┌──────────┐                          │
│    │   iron   │  │  copper  │                          │
│    └──────────┘  └──────────┘                          │
│    ┌──────────┐  ┌──────────┐                          │
│    │   gold   │  │  silver  │                          │
│    └──────────┘  └──────────┘                          │
│                                                         │
│  Gathered: 🪨🪨🪨🪨 (4 Copper Chunks)                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 60 second timer
- Each correct answer = 1 resource
- Wrong answers = 3 second penalty
- Speed bonus: Answer in <2 seconds = chance for bonus ore
- Difficulty scales with ore tier

**Code Requirements:**
- Timer countdown display
- Running resource counter
- Speed tracking per question
- End state with results

---

#### Woodcutting: Streak Challenge

**Concept:** Get as many correct answers in a row as possible. Streak determines wood quality/quantity.

**Implementation:** Modified lesson with streak emphasis.

```
┌─────────────────────────────────────────────────────────┐
│  🪓 WOODCUTTING - Pine Forest                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Current Streak: 🔥🔥🔥🔥🔥 5                            │
│  Best Streak: 8                                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │         How do you say "tree" in French?        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│    ┌──────────┐  ┌──────────┐                          │
│    │  arbre   │  │  forêt   │                          │
│    └──────────┘  └──────────┘                          │
│    ┌──────────┐  ┌──────────┐                          │
│    │  bois    │  │  feuille │                          │
│    └──────────┘  └──────────┘                          │
│                                                         │
│  Logs collected: 🪵🪵🪵 (3 Pine Logs)                   │
│                                                         │
│  Streak Bonuses:                                        │
│  5 streak = +1 log | 10 streak = +2 logs               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 15 questions total
- Base: 1 log per 3 correct answers
- Streak bonus at 5, 10, 15
- Wrong answer resets streak
- Final reward based on best streak achieved

**Code Requirements:**
- Streak counter with visual feedback
- Streak milestone rewards
- Streak reset animation
- Best streak tracking

---

#### Hunting: Speed Round

**Concept:** Quick reflexes! Answer 10 questions as fast as possible. Total time determines hide quality.

**Implementation:** Lesson with cumulative timer.

```
┌─────────────────────────────────────────────────────────┐
│  🏹 HUNTING - Boar Territory                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Question 6/10                                          │
│  Total Time: 23.4s                                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │        "rapide" = ?                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│    ┌──────────┐  ┌──────────┐                          │
│    │   fast   │  │   slow   │                          │
│    └──────────┘  └──────────┘                          │
│    ┌──────────┐  ┌──────────┐                          │
│    │  strong  │  │   weak   │                          │
│    └──────────┘  └──────────┘                          │
│                                                         │
│  Time Targets:                                          │
│  ⭐⭐⭐ <30s | ⭐⭐ <45s | ⭐ <60s                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 10 questions, timer counts up
- Wrong answer adds 5 second penalty
- Star rating based on total time
- Stars determine hide quantity (1-3)
- Perfect run (no mistakes, <30s) = bonus rare hide

**Code Requirements:**
- Cumulative timer (counts up)
- Penalty time additions
- Star rating calculation
- Results screen with time breakdown

---

### Tier 2 Minigames

#### Herbalism: Matching Pairs

**Concept:** Match French words to English meanings by clicking pairs. Calm, methodical gameplay fits plant gathering theme.

**Implementation:** New minigame type with pair-matching logic.

```
┌─────────────────────────────────────────────────────────┐
│  🌿 HERBALISM - Meadow Gathering                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Match the French words to their English meanings       │
│                                                         │
│  ┌─────────────────────┐   ┌─────────────────────┐     │
│  │                     │   │                     │     │
│  │  [fleur]  [plante]  │   │  [leaf]   [flower]  │     │
│  │                     │   │                     │     │
│  │  [feuille] [racine] │   │  [root]   [plant]   │     │
│  │                     │   │                     │     │
│  │  [herbe]   [tige]   │   │  [stem]   [grass]   │     │
│  │                     │   │                     │     │
│  └─────────────────────┘   └─────────────────────┘     │
│                                                         │
│  Pairs Found: 3/6                                       │
│  Mistakes: 1                                            │
│                                                         │
│  Herbs gathered: 🌿🌿🌿 (3 Meadow Leaf)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 6-8 pairs to match
- Click French word, then click English meaning
- Correct match = pair disappears, +1 herb
- Wrong match = mistake counter +1
- Bonus herbs for 0-1 mistakes
- No timer (relaxing pace)

**Code Requirements:**
- Two-column word display
- Selection state tracking
- Pair validation
- Match animation (fade out)
- Mistake counter

**Implementation Details:**

```javascript
// Matching game state
const matchingState = {
  pairs: [],           // {french, english, matched}
  selectedFrench: null,
  selectedEnglish: null,
  mistakes: 0,
  matched: 0
};

// Check for match
function checkMatch() {
  if (selectedFrench && selectedEnglish) {
    const pair = pairs.find(p =>
      p.french === selectedFrench &&
      p.english === selectedEnglish
    );
    if (pair) {
      pair.matched = true;
      matched++;
      // Success animation
    } else {
      mistakes++;
      // Shake animation
    }
    // Reset selections
    selectedFrench = null;
    selectedEnglish = null;
  }
}
```

---

#### Fishing: Reaction + Question

**Concept:** Wait for a bite, react quickly, then answer a question to catch the fish.

**Implementation:** New minigame with timing element.

```
┌─────────────────────────────────────────────────────────┐
│  🎣 FISHING - Dawnmere River                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    ~~~~~~~~                             │
│                   ~~~ 🎣 ~~~                            │
│                    ~~~~~~~~                             │
│                                                         │
│            Waiting for a bite...                        │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│  Fish Caught: 🐟🐟 (2 River Perch)                      │
│  Attempts: 3/5                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘

        ↓ After random 2-6 seconds ↓

┌─────────────────────────────────────────────────────────┐
│  🎣 FISHING - Dawnmere River                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    ~~~~~~~~                             │
│                 ~~~ 🎣💥 ~~~                            │
│                    ~~~~~~~~                             │
│                                                         │
│         !! BITE !! Press SPACE quickly!                 │
│                                                         │
│                [████████░░] React!                      │
│                                                         │
│                                                         │
│  Fish Caught: 🐟🐟 (2 River Perch)                      │
│  Attempts: 3/5                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘

        ↓ If reacted in time ↓

┌─────────────────────────────────────────────────────────┐
│  🎣 FISHING - Dawnmere River                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🐟 Fish on the line!                                   │
│                                                         │
│  Quick! What does "poisson" mean?                       │
│                                                         │
│    ┌──────────┐  ┌──────────┐                          │
│    │   fish   │  │   water  │                          │
│    └──────────┘  └──────────┘                          │
│    ┌──────────┐  ┌──────────┐                          │
│    │   boat   │  │   river  │                          │
│    └──────────┘  └──────────┘                          │
│                                                         │
│  Fish Caught: 🐟🐟 (2 River Perch)                      │
│  Attempts: 3/5                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 5 fishing attempts per session
- Wait phase: Random 2-6 seconds
- React phase: 1.5 second window to press SPACE
- Question phase: Answer correctly to catch fish
- Miss reaction = fish escapes (no question)
- Wrong answer = fish escapes
- Rare fish chance on fast reaction + correct answer

**Code Requirements:**
- Random timer for bite
- Reaction window with countdown
- Keyboard listener (spacebar)
- State machine (waiting → bite → question → result)
- Visual feedback animations

**State Machine:**

```javascript
const FishingState = {
  WAITING: 'waiting',
  BITE: 'bite',
  QUESTION: 'question',
  CAUGHT: 'caught',
  ESCAPED: 'escaped'
};

// Fishing flow
function startFishing() {
  state = FishingState.WAITING;
  const biteDelay = 2000 + Math.random() * 4000; // 2-6 seconds
  setTimeout(triggerBite, biteDelay);
}

function triggerBite() {
  state = FishingState.BITE;
  playSound('splash');
  startReactionTimer(1500); // 1.5 second window
}

function onSpacePressed() {
  if (state === FishingState.BITE) {
    state = FishingState.QUESTION;
    showQuestion();
  }
}

function onReactionTimeout() {
  if (state === FishingState.BITE) {
    state = FishingState.ESCAPED;
    showMessage("The fish got away!");
  }
}
```

---

### Tier 3 Minigames (Future)

#### Word Scramble

**Concept:** Unscramble letters to spell the correct French word.

```
┌─────────────────────────────────────────────────────────┐
│  Unscramble the French word for "house"                 │
│                                                         │
│       [ O ] [ S ] [ I ] [ N ] [ A ] [ M ]               │
│                                                         │
│  Your answer: [ M ] [ A ] [ I ] [   ] [   ] [   ]       │
│                                                         │
│        [Clear]              [Submit]                    │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Click letters to add to answer
- Click answer letters to remove
- Submit to check
- Hint: reveal one letter position

**Technical Requirements:**
- Letter tile components
- Drag-and-drop OR click-to-place
- Answer validation
- Hint system

---

#### Memory Card Game

**Concept:** Classic memory game with French/English pairs on cards.

```
┌─────────────────────────────────────────────────────────┐
│  Find the matching pairs!                               │
│                                                         │
│    [???] [cat] [???] [???]                              │
│                                                         │
│    [???] [???] [chat] [???]                             │
│                                                         │
│    [???] [???] [???] [???]                              │
│                                                         │
│  Pairs found: 1/6    Flips: 8                          │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- 12 cards (6 French/English pairs)
- Flip two cards at a time
- Match = cards stay revealed
- No match = cards flip back
- Score based on number of flips

**Technical Requirements:**
- Card flip animation (CSS 3D transform)
- Card state management
- Pair tracking
- Flip counter

---

#### Rhythm Mining

**Concept:** Hit keys in sequence as they scroll, answer question at end.

```
┌─────────────────────────────────────────────────────────┐
│  ⛏️ RHYTHM MINING                                       │
│                                                         │
│     [A]        [S]        [D]        [F]                │
│      ↓          ↓          ↓          ↓                 │
│      ○                                                  │
│                 ○                                       │
│                            ○                            │
│      ●                                ○                 │
│  ────●─────────────────────────────────────             │
│      A          S          D          F                 │
│                                                         │
│  Combo: 12    Score: 2400                               │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Notes fall toward hit line
- Press correct key when note crosses line
- Build combo for multiplier
- After rhythm section, answer vocabulary question
- Rhythm score + correct answer = resources

**Technical Requirements:**
- Game loop with delta time
- Note spawning and movement
- Timing windows (perfect/good/miss)
- Combo tracking
- Sync with beat (optional music)

---

#### Hangman

**Concept:** Classic hangman with French words.

```
┌─────────────────────────────────────────────────────────┐
│  Guess the French word for "butterfly"                  │
│                                                         │
│       ┌───┐                                             │
│       │   O                                             │
│       │  /│\                                            │
│       │                                                 │
│       │                                                 │
│    ───┴───                                              │
│                                                         │
│    _ A _ I _ _ O N                                      │
│                                                         │
│  Used: E, R, T, U                                       │
│  Remaining: 4 guesses                                   │
│                                                         │
│  [A-Z keyboard]                                         │
└─────────────────────────────────────────────────────────┘
```

**Mechanics:**
- Word revealed as letters guessed
- Wrong guesses build hangman
- 6-8 wrong guesses = lose
- Complete word = win + resources

**Technical Requirements:**
- Letter tracking (used/available)
- Hangman drawing stages
- Word reveal animation
- Keyboard input or clickable letters

---

### Tier 4 Minigames (Future)

*High complexity. Consider only after core game is polished.*

#### Typing Race

**Concept:** French words scroll across screen, type translations before they disappear.

```
┌─────────────────────────────────────────────────────────┐
│  ← maison ← chien ← livre ← [          ]               │
│                                                         │
│  Type the English translations!                         │
│                                                         │
│  Score: 1250    Combo: x3    Lives: ♥♥♥                 │
└─────────────────────────────────────────────────────────┘
```

**Technical Challenge:** Continuous scrolling, real-time text input, collision detection.

---

#### Word Grid (Scrabble-lite)

**Concept:** Place letter tiles on grid to form French words.

**Technical Challenge:** Grid system, valid word checking, scoring rules, tile management.

---

#### Conversation Simulation

**Concept:** Dynamic dialogue with NPC, choose responses in French.

**Technical Challenge:** Branching dialogue, context tracking, response validation.

---

#### Pronunciation Game

**Concept:** Use microphone to pronounce French words.

**Technical Challenge:** Web Speech API, accent tolerance, scoring pronunciation.

---

### Vocabulary by Resource

#### Mining Vocabulary

| French | English | Tier |
|--------|---------|------|
| le fer | iron | 1 |
| le cuivre | copper | 1 |
| la pierre | stone | 1 |
| le métal | metal | 1 |
| l'argent | silver | 2 |
| l'or | gold | 2 |
| la mine | mine | 2 |
| creuser | to dig | 2 |
| le marteau | hammer | 3 |
| la pioche | pickaxe | 3 |
| le minerai | ore | 3 |
| fondre | to melt | 3 |

#### Fishing Vocabulary

| French | English | Tier |
|--------|---------|------|
| le poisson | fish | 1 |
| l'eau | water | 1 |
| la rivière | river | 1 |
| le lac | lake | 1 |
| la mer | sea | 2 |
| pêcher | to fish | 2 |
| le bateau | boat | 2 |
| la canne | fishing rod | 2 |
| l'hameçon | hook | 3 |
| le filet | net | 3 |
| la truite | trout | 3 |
| le saumon | salmon | 3 |

#### Herbalism Vocabulary

| French | English | Tier |
|--------|---------|------|
| la plante | plant | 1 |
| la fleur | flower | 1 |
| la feuille | leaf | 1 |
| l'herbe | grass/herb | 1 |
| la racine | root | 2 |
| la tige | stem | 2 |
| le jardin | garden | 2 |
| cueillir | to pick/gather | 2 |
| le pétale | petal | 3 |
| la graine | seed | 3 |
| le pollen | pollen | 3 |
| la sève | sap | 3 |

#### Woodcutting Vocabulary

| French | English | Tier |
|--------|---------|------|
| l'arbre | tree | 1 |
| le bois | wood | 1 |
| la forêt | forest | 1 |
| la branche | branch | 1 |
| le tronc | trunk | 2 |
| couper | to cut | 2 |
| la hache | axe | 2 |
| le chêne | oak | 2 |
| le pin | pine | 3 |
| la scie | saw | 3 |
| l'écorce | bark | 3 |
| la souche | stump | 3 |

#### Hunting Vocabulary

| French | English | Tier |
|--------|---------|------|
| l'animal | animal | 1 |
| chasser | to hunt | 1 |
| rapide | fast | 1 |
| lent | slow | 1 |
| le sanglier | boar | 2 |
| le loup | wolf | 2 |
| l'arc | bow | 2 |
| la flèche | arrow | 2 |
| l'ours | bear | 3 |
| le cerf | deer | 3 |
| la piste | track/trail | 3 |
| le piège | trap | 3 |

---

### Minigame Rewards & Difficulty

#### Difficulty Scaling by Tier

| Resource Tier | Vocabulary Tier | Time Pressure | Questions |
|---------------|-----------------|---------------|-----------|
| Tier 1 | Basic words | Relaxed | 8-10 |
| Tier 2 | Intermediate | Moderate | 10-12 |
| Tier 3 | Advanced | Challenging | 12-15 |
| Tier 4 | Expert | Intense | 15-20 |

#### Reward Structure

| Performance | Reward |
|-------------|--------|
| **Poor** (< 50%) | 1 resource |
| **Okay** (50-69%) | 2 resources |
| **Good** (70-84%) | 3 resources |
| **Great** (85-94%) | 4 resources |
| **Perfect** (95%+) | 5 resources + chance for rare |

#### Bonus Conditions

| Condition | Bonus |
|-----------|-------|
| No mistakes | +1 resource |
| Speed bonus (under time target) | +1 resource |
| Streak bonus (10+ streak) | +1 resource |
| First time completing | +2 resources |
| Daily first gather | +1 resource |

---

### Minigame Implementation Plan

#### Phase 1: Core Minigames

- [x] **Mining: Timed Quiz** - Add timer to existing lesson system
- [x] **Woodcutting: Streak Challenge** - Add streak tracking
- [x] **Hunting: Speed Round** - Add cumulative timer and ratings

#### Phase 2: New Mechanics

- [x] **Herbalism: Matching Pairs** - Build matching game component
- [x] **Fishing: Reaction Game** - Build state machine with timing

#### Phase 3: Polish

- [x] Add themed vocabulary per resource type
- [x] Add visual feedback and animations
- [ ] Add sound effects per minigame
- [ ] Balance rewards and difficulty

#### Phase 4: Expansion (Future)

- [x] Word Scramble
- [x] Memory Card Game
- [ ] Rhythm Mining
- [x] Hangman

---

### Minigame Technical Architecture

#### Minigame Base Class

```javascript
class ResourceMinigame {
  constructor(resourceType, tier) {
    this.resourceType = resourceType;
    this.tier = tier;
    this.vocabulary = this.loadVocabulary();
    this.score = 0;
    this.resources = 0;
  }

  loadVocabulary() {
    // Load themed vocab for this resource type and tier
  }

  start() {
    // Override in subclass
  }

  end() {
    this.calculateRewards();
    this.grantResources();
    this.showResults();
  }

  calculateRewards() {
    // Based on score/performance
  }

  grantResources() {
    // Add to player inventory
  }
}

class TimedQuizMinigame extends ResourceMinigame {
  // Mining implementation
}

class StreakMinigame extends ResourceMinigame {
  // Woodcutting implementation
}

class MatchingMinigame extends ResourceMinigame {
  // Herbalism implementation
}

class ReactionMinigame extends ResourceMinigame {
  // Fishing implementation
}
```

---

### Design Decisions

#### One Minigame Per Resource Type

**Decision:** Each resource type has exactly ONE minigame associated with it. No duplicates.

**Rationale:**
- Clear mental model for players: "Mining = Timed Quiz, always"
- Avoids confusion about which minigame to play
- Simplifies resource flow and balancing
- Each minigame has distinct identity and purpose

**Current Assignments:**

| Resource Type | Minigame | Mechanic |
|---------------|----------|----------|
| Mining | Timed Quiz | Answer questions before time runs out |
| Woodcutting | Streak Challenge | Build consecutive correct answer streaks |
| Hunting | Speed Round | Complete 10 questions as fast as possible |
| Herbalism | Matching Pairs | Match French words to English meanings |
| Fishing | Reaction + Question | React to bite, then answer question |

**Reserved Minigames (Awaiting Future Resource Types):**

| Minigame | Status | Notes |
|----------|--------|-------|
| Word Scramble | Implemented, disabled | Awaiting new resource type |
| Memory Card | Implemented, disabled | Awaiting new resource type |
| Beast Tracker (Hangman variant) | Implemented, disabled | Re-themed with hunting visuals |
| Rhythm Mining | Designed, not implemented | Complex - consider for Phase 4+ |
| Typing Race | Designed, not implemented | Complex - consider for Phase 4+ |

**Code Note:** The disabled minigames exist in `resourceMinigames.js` but their `case` statements in `ResourceMinigameManager.startMinigame()` are commented out until assigned to new resources.

---

### Future Resource Types

These resource types could be added to give the reserved minigames a purpose:

#### Potential New Resources

| Resource Type | Theme | Vocabulary Focus | Possible Minigame |
|---------------|-------|------------------|-------------------|
| **Foraging** | Mushrooms, berries, nuts | Forest foods, seasons | Word Scramble |
| **Archaeology** | Artifacts, relics, fossils | History, ancient objects | Memory Card |
| **Trapping** | Pelts, feathers, claws | Small animals, patience | Beast Tracker |
| **Alchemy Ingredients** | Essences, reagents | Chemistry, transformation | Word Scramble |
| **Runecrafting** | Runes, glyphs, inscriptions | Symbols, magic | Memory Card |
| **Scavenging** | Salvage, parts, scraps | Urban/ruins vocabulary | Beast Tracker |
| **Weaving** | Cloth, thread, silk | Textiles, clothing | Rhythm Mining |
| **Jewelcrafting** | Gems, cut stones | Precious stones, beauty | Typing Race |

#### Implementation Priority

When adding new resource types:

1. **Choose resource that fits world/story** - Does it make sense in ByteQuest's setting?
2. **Match to vocabulary theme** - Each resource should teach distinct vocabulary
3. **Assign to reserved minigame** - Pick the minigame whose mechanic fits the theme
4. **Add vocabulary data** - Create `RESOURCE_VOCABULARY[newType]` entries
5. **Add resource outputs** - Create `RESOURCE_OUTPUTS[newType]` with tier 1-3 items
6. **Uncomment case statement** - Enable the minigame in the manager
7. **Update constructor** - Change `super('oldType', tier)` to `super('newType', tier)`

#### Resource Gathering Locations (Expanded)

When new resources are added, assign them to appropriate zones:

| Zone | Current Resources | Potential Future Resources |
|------|-------------------|---------------------------|
| Dawnmere | Fishing (river), basic herbs | Foraging (gardens) |
| Haari Fields | Herbs, hunting (boar) | Foraging (crops) |
| Fredrois | Fishing (sea) | Scavenging (docks) |
| Northern Forest | Wood, hunting (wolf, bear), herbs | Foraging, Trapping |
| Miner's Deep | Mining (all tiers) | Runecrafting |
| Renque | None (ruins) | Scavenging, Archaeology |
| Lurenium | None (city) | Archaeology (ancient city) |
| Frue Desert | None (wilderness) | Archaeology (buried ruins) |

---

### Minigame Open Questions

| Question | Options | Status |
|----------|---------|--------|
| Gathering cooldowns? | Per location? Per resource? None? | Pending |
| Resource node depletion? | Unlimited? Daily limit? Respawn timer? | Pending |
| Fail state? | Get nothing? Always get minimum? | Pending |
| Minigame skipping? | Allow skip for reduced reward? | Pending |
| Multiplayer consideration? | Leaderboards? Shared nodes? | Pending |

---

## Endgame Lore Bosses

> **Note:** This section covers **Lore/Story Bosses** - narrative encounters with combat, dialogue, and moral choices.
>
> For the **Translation Gauntlet** system (repeatable language mastery challenges), see the "Translation Gauntlet Raid Bosses" section above.
>
> Both systems coexist as endgame content:
> - **Lore Bosses** = One-time story progression, narrative weight
> - **Translation Gauntlet** = Repeatable grind, language mastery testing

### Overview

These raid bosses are designed to escalate the player's understanding of the true conflict. Rather than simple "defeat evil" encounters, each boss represents a facet of Hermeau's rise to power, The Corruption, or the cost of truth-seeking.

**Progression Structure:**
1. **Corruption Incursions** (repeated, escalating) — Random/procedural encounters with Corruption manifestations
2. **Ruins of the Ancients** (dungeon) — Environmental puzzles revealing pre-war knowledge
3. **Spire of Trials** (endless tower) — Increasingly difficult encounters with philosophical weight

---

### Corruption Incursions - Manifestations

These are repeated encounters with different "faces" of The Corruption. Each one is a different aspect of what Hermeau unleashed.

#### Boss 1: The Hollow Shepherd
**Difficulty:** Medium
**Type:** Corruption Manifestation
**Location:** Agricultural regions, farmland ruins

**Lore:**
Once a beloved shepherd who led flocks through the fertile lands during King Dran's reign, this figure was caught in the initial wave of Corruption during Hermeau's war. The Corruption didn't kill him—it hollowed him out, leaving a puppet that still wears his face and voice but moves in unsettling ways.

Players may recognize him from NPC dialogue as someone lost during "the attacks on the farmlands." The shock is realizing he's *still* affecting the region—appearing to contaminate new crops, draw away livestock, and whisper falsehoods to farmers.

**What He Represents:** The Corruption's power to pervert the natural and familiar. The tragedy of individuals lost to it.

**Mechanics Hint:**
- Can temporarily charm livestock/village animals
- Attacks with shepherd's crook (blunt weapon)
- Speaks in fragmented sentences mixing old memories with corrupted whispers
- Vulnerable when grounded (connection to the land)

**Dialogue Example:**
> "The... the flocks were so full. The grass was so green. Now I tend to rot. I tend to the [unintelligible sound] that grows where the green was. Why do you hurt me? I was... I was happy once."

**Reward:** Dropped item hints at his original purpose (shepherd's horn, wool sample). Defeating him provides environmental clues about Corruption's nature.

---

#### Boss 2: The Magistrate's Echo
**Difficulty:** Medium-High
**Type:** Corruption Manifestation
**Location:** Urban centers, administrative districts

**Lore:**
A local magistrate who enforced Hermeau's policies post-war, this official was corrupted not by accident but by choice—seduced by promises of power. Unlike the Hollow Shepherd, the Echo *knows* what it is and actively serves The Corruption.

The Echo embodies bureaucratic cruelty: It enforces Hermeau's laws with twisted logic, hunts dissidents, and corrupts anyone who questions authority. It's become something worse than human—a corruption that understands manipulation.

**What He Represents:** The willing collaboration with darkness. How systems can become corrupted from within. The horror of recognizing that some people *chose* this.

**Mechanics Hint:**
- Summons "loyalty enforcers" (minion adds) that must be convinced or defeated
- Uses twisted legal arguments to confuse players (status effects based on dialogue)
- Armor/shield made of official seals and documents
- Weak to truth-telling (specific dialogue choices during fight reduce defenses)

**Dialogue Example:**
> "You speak of Hermeau as usurper? Nonsense. I have the seals, the stamps, the words of a hundred officials. What have you? Sentiment? The law serves order, and order serves... us. Why would I refuse power when it was offered freely?"

**Moral Complexity:**
Was this person corrupted, or did Corruption simply amplify their worst instincts? Players should feel the ambiguity.

**Reward:** Corrupted official documents revealing some of Hermeau's early policies.

---

#### Boss 3: The Rotting Prophet
**Difficulty:** High
**Type:** Corruption Manifestation
**Location:** Religious sites, temples

**Lore:**
A priest who genuinely believed the Light would protect him—until Hermeau's dark magic proved stronger. The Corruption doesn't possess him; it *lives inside* him, and he's aware of every moment of it.

He speaks sermons mixed with agonized pleas. His faith is shattered, replaced by cosmic horror at discovering that the Light he devoted his life to has limits. This boss is *tragic*—he didn't choose this and suffers from it, but he's also dangerous.

**What He Represents:** The failure of faith when confronted with systemic evil. The realization that protection doesn't come from belief alone.

**Mechanics Hint:**
- Uses "blessing" attacks that are actually corrupted Light magic
- Can heal himself and minions
- Monologues reveal fragments of what happened to the priesthood
- Defeating him without mercy may corrupt the player's reputation with religious factions
- Options for redemption/mercy exist

**Dialogue Example:**
> "I felt the Light leave me. Not gradually—like a door slamming. I called and called, and it did not answer. Something *else* answered. Something that wore the Light's voice. I am... I am still calling. I don't know why. It doesn't listen either."

**Moral Complexity:**
This boss may generate the most player debate: Do you spare him if possible? What does it mean to put someone out of misery when they're also dangerous?

**Reward:** Fragments of forbidden knowledge about the limits of Light magic. Clues about the priesthood's secret doubts.

---

### Ruins of the Ancients - Lore Bosses

These are major encounters within a dungeon exploring pre-Verandum history. The Ruins reveal that Turuem had advanced civilizations before the current age—and they fell because of similar corruptions.

#### Boss 4: The Archivist Prime
**Difficulty:** Medium
**Type:** Guardian (Golem-like construct)
**Location:** Central archive chamber in Ruins

**Lore:**
Before the current age, advanced civilizations kept vast archives of knowledge. The Archivist Prime was constructed to protect and preserve these records. It's not alive and not entirely mechanical—it's something in between, sustained by the same Light magic that built the Ruins themselves.

After centuries, it's begun to degrade. It no longer understands what knowledge it's protecting, only that it *must* protect it. It challenges anyone entering with impossible questions—not maliciously, but because that's what it was programmed to do.

**What He Represents:** The erosion of purpose over time. How systems intended to preserve truth can become obstacles to it. The tragedy of guardianship without context.

**Mechanics:**
- Asks riddle-based questions; answers are correct only if they align with *ancient* knowledge (not modern propaganda)
- Becomes hostile if challenged
- Immune to most damage; vulnerable only by solving the archive's core puzzle
- Teaches the player about pre-Verandum civilizations

**Dialogue Example:**
> "What is truth? Once I knew. I was built to defend it. But centuries have passed, and I have watched truths become lies and lies become accepted. I defend this archive, but I no longer remember: Was I defending wisdom, or was I preserving the seeds of our downfall?"

**Reward:** Access to ancient texts revealing:
- That previous civilizations fell due to similar corruption (cyclical pattern)
- Hints about the true origin of Dark magic
- Knowledge that might help identify Corruption's source

---

#### Boss 5: The Last Regent
**Difficulty:** High
**Type:** Spectral Guardian
**Location:** Throne room in Ruins

**Lore:**
The Ruins contain remnants of a pre-Verandum civilization that was ruled by wise regents. The Last Regent refused to leave when the civilization fell, binding their spirit to the archive to preserve it for future generations. Over ages, they've become something between a ghost and a curse—powerful, lonely, and questioning whether their sacrifice meant anything.

The Regent appears as a figure of Light (not corrupted), but fights with the weariness of someone who has guarded an empty throne for centuries.

**What He Represents:** The cost of loyalty. Sacrifice that may have been meaningless. The question: "Was my duty to my people worth this loneliness?"

**Combat:**
- Uses Light magic defensively
- Creates temporary barriers and zones
- Summons echoes of past regents (minion encounters)
- Can be *talked to* mid-fight; player choices affect the encounter
- Option to convince him that his sacrifice *did* matter (by proving new civilizations learned from the old)

**Dialogue Example (beginning of encounter):**
> "A visitor. How strange. I have not spoken to a living voice in... I have forgotten how long. Are you here to reclaim the archives? Or here to add more rubble to this tomb?"

**Ending Dialogue (if befriended):**
> "Then perhaps I was not foolish to stay. If new peoples learn from our mistakes, my watch was not in vain. But you must promise—do not repeat our fall. Do not let the darkness win as we did."

**Reward:**
- If defeated: Equipment from pre-Verandum era
- If befriended: Title "Keeper of the Archives," access to unique quests, knowledge about how to counter Dark magic specifically

---

### Spire of Trials - Philosophical Bosses

An endless tower where each floor presents increasingly difficult opponents. But the true challenge is philosophical—each boss forces the player to confront the contradictions and costs of truth-seeking.

#### Boss 6: The Truthseeker's Doubt
**Difficulty:** Varies (scales with tower level)
**Type:** Shadow/Mirror Match
**Location:** Mid-levels of Spire

**Lore:**
This boss is a manifestation of the player's own doubts—a shadow created by the Spire's strange magic. It fights like the player and speaks with the player's voice, but it argues the opposite position for every choice the player has made.

If the player has been seeking truth, this manifestation argues that ignorance is peace. If the player has sided with factions, this shadow argues for neutrality. It's not evil—it's compromise personified.

**What He Represents:** The cost of commitment. The validity of doubt. The question: "Am I right to pursue this, or am I being destructively righteous?"

**Mechanics:**
- Adapts to player's build and strategy
- Each hit the player lands damages the shadow but also damages the player (literal internal conflict)
- Can be won through mercy (refusing to fight fully) or through overwhelming conviction
- Different resolutions based on player's ideological consistency

**Dialogue:**
> "Every path you've chosen means abandoning another. How many people have you left behind? How many causes did you ignore? You call this truth-seeking, but maybe it's just... choosing comfortable lies."

**Reward (variable):**
- If defeated: Artifact symbolizing conviction (bonus to willpower-related traits)
- If spared/compromised: Artifact symbolizing balance (recovery benefits)

---

#### Boss 7: The Corrupted Idealist
**Difficulty:** Very High
**Type:** Humanoid, powerful mage
**Location:** Upper levels of Spire

**Lore:**
This was once a prominent member of the Old Guard who truly believed in restoring Layne and returning to the "good old days." But they discovered something horrifying: Layne may not be what the resistance believes. Or perhaps the resistance's methods have become as corrupt as Hermeau's.

Broken by this revelation, they fled to the Spire seeking isolation. But The Corruption followed them there, and they've been consumed by it—not body, but will. They've become a cautionary tale: What happens to idealists who lose their ideals?

**What He Represents:** The danger of ideological purity. How even just causes can corrupt those who pursue them. The tragedy of a good person broken by too much truth.

**Combat:**
- Uses both Light and Dark magic (conflicted)
- Attacks are powerful but sometimes hesitate
- Between attacks, they speak fragmented monologues revealing their disillusionment
- Can be reasoned with; different dialogue checks reveal different aspects of their crisis

**Monologue Example (mid-fight):**
> "I fought for light. For the return of the rightful heir. But what if the heir is no better? What if the resistance is just another Hermeau waiting to seize power? I realized I couldn't trust anyone... so I trusted nothing. And Corruption rewards that perfectly."

**Resolution Options:**
- Defeat them, putting them out of their misery
- Help them see that doubt doesn't require surrender (reform them)
- Absorb their knowledge/burden (player gains understanding of resistance's internal conflicts)

**Reward:**
- Intelligence about Old Guard factions
- Equipment symbolizing "hard truths"
- Potential ally or enemy in later encounters, depending on how the fight resolved

---

#### Boss 8: The Apotheosis of Corruption
**Difficulty:** Extreme (Final Spire Boss)
**Type:** Manifestation of The Corruption itself
**Location:** Tower's peak

**Lore:**
At the Spire's peak, the player encounters The Corruption itself—not as an abstract force, but as a *being*. This isn't Hermeau (he's the *user* of Corruption, not its source). This is what he unleashed: a force of entropy and malice that predates the current kingdom, possibly predates recorded civilization.

It has no true form—it appears differently to each observer. To some, it looks like the plague of their nightmares. To others, it wears a face they trust.

**What It Represents:**
- The danger that evil is often *not* a person but a force amplified by human ambition
- The question: Can you defeat a force by defeating its current user?
- The cost of knowledge: Some truths break people

**Combat:**
This fight has multiple phases representing different aspects of Corruption:

**Phase 1: The Truth**
- Corruption reveals hidden truths about everything the player believes
- Does it lie? Can it lie? Or does it speak only truths that hurt?
- Attacks are based on the player's guilt, regrets, doubts

**Phase 2: The Seduction**
- Corruption offers the player power, answers, peace
- Damage is taken through refusal (constantly saying "no")
- Regenerates if the player accepts its offers

**Phase 3: The Hunger**
- Corruption becomes desperate, violent, trying to consume the player
- All previous attacks combine
- Can be won through understanding rather than pure damage

**Dialogue (constantly shifting):**
> "I am old. Older than your kingdoms. I am hunger. I am the crack in your certainty. I have worn many faces—your leader, your prophet, your doubt. Why do you resist? You carry me already."

**Victory Conditions (multiple paths):**
1. **Pure Destruction:** Defeat it through overwhelming power (requires high stats)
2. **Acceptance & Release:** Accept it exists and choose to limit it rather than destroy it (requires wisdom)
3. **Understanding:** Prove that Corruption's nature can be changed/contained rather than eliminated (requires lore knowledge from previous bosses)

---

### End-Game Lore Integration

#### Connection to Main Story
These bosses serve as the endgame content but also reinforce the main narrative:

1. **Corruption Incursions** reveal that The Corruption is still spreading—Hermeau's control is slipping
2. **Ruins of the Ancients** prove that Hermeau didn't invent Dark magic—he just awakened something older
3. **Spire of Trials** forces the player to confront what they've learned and decide if truth is worth its cost

#### Impact on Final Confrontation
The player's approach to these bosses affects how they confront Hermeau:
- If they understand Corruption's nature, they can potentially turn it against Hermeau
- If they've made allies among the bosses (The Last Regent, The Corrupted Idealist), those relationships matter
- If they've only used force, they may lack the knowledge/allies needed for certain story resolutions

---

### Lore Boss Difficulty Scaling

| Boss | Intended Level | Solo Viable | Recommended Party |
|------|-----------------|------------|-------------------|
| Hollow Shepherd | 15+ | Yes | 1-3 players |
| Magistrate's Echo | 18+ | Yes | 1-3 players |
| Rotting Prophet | 20+ | Challenging | 2-4 players |
| Archivist Prime | 22+ | No (puzzle-based) | 1-4 players |
| Last Regent | 25+ | Challenging | 2-4 players |
| Truthseeker's Doubt | 28+ (scales) | Varies | 1-4 players |
| Corrupted Idealist | 30+ | Challenging | 2-4 players |
| Apotheosis | 35+ | Very Hard | 3-4 players (scaled) |

---

### Lore Boss Open Questions

1. **Corruption's True Nature** — Is it a living entity, a force, or something else? How does it think?
2. **Dark Magic Origins** — Where did Hermeau find it? Did he create it or awaken it?
3. **Multiple Endings** — How much do these boss encounters affect the ending?
4. **Party System** — Is this game solo or multiplayer? How many players affect boss design?
5. **Loot & Progression** — What equipment drops from these bosses? How unique should it be?
6. **Lore Conflicts** — Do some boss paths contradict each other? (Should they? Unreliable narrator approach?)
7. **NPC Cameos** — Should any established NPCs (Pardu, Kolpa, etc.) appear in endgame?
8. **Post-Game Content** — What happens after defeating The Apotheosis?

---

## Account Progression System

### Overview

**Version:** 0.2-DRAFT
**Status:** Infrastructure Complete, Balancing TBD
**Core Concept:** Account-level upgrades that persist across all save files and playthroughs (IdleOn-Inspired)

#### What Is Account Progression?

**Regular Game Progression:** Character gets stronger in one playthrough
```
Save 1: Level 1 → Level 30 → Complete Story
Save 2: Level 1 → Level 30 → Complete Story
(Each save starts from scratch)
```

**Account Progression:** Persistent upgrades across ALL saves
```
Account Level 0: No upgrades
  ↓ (Buy "XP Multiplier +10%")
Account Level 1: +10% XP in ALL saves

Save 1: Levels 1-30 (with +10% XP)
Save 2: Levels 1-30 (with +10% XP)
Save 3: Levels 1-30 (with +10% XP)
(All saves benefit from account upgrade)
```

---

### Architecture

```
ByteClaude/js/
├── accountProgression.js          ← Core infrastructure (DON'T MODIFY)
├── accountProgressionConfig.js    ← Game balance config (EDIT ANYTIME)
├── gameIntegration.js             ← Integration helpers
└── accountProgressionUI.js        ← Shop UI component (TO BE MERGED INTO SHOP)
```

| File | Size | Purpose |
|------|------|---------|
| accountProgression.js | ~300 lines | Core infrastructure |
| accountProgressionConfig.js | ~340 lines | Game balance settings |
| gameIntegration.js | ~190 lines | Integration helpers |
| accountProgressionUI.js | ~265 lines | Shop UI (temporary) |

---

### Currency System

**CURRENT DESIGN:** Gold-only (regular game gold used for account upgrades)

**Note:** Account gold is separate from per-save game gold. Both are called "gold" but tracked differently.

```javascript
// Account Gold - persists across all saves
accountProgression.getAccountGold()    // Check balance
accountProgression.addAccountGold(amount, reason)  // Award gold

// Game Gold - per save file
gameState.gold  // Normal in-game gold
```

**TIER UNLOCK REQUIREMENTS:** TBD - Achievement-based unlocks (to be balanced later)

```javascript
getTierRequirements() {
  return {
    1: null, // Always available
    2: { placeholder: true, description: 'TBD - Mid-game milestone' },
    3: { placeholder: true, description: 'TBD - Late-game milestone' }
  };
}
```

---

### Upgrade Categories

#### Learning Upgrades (4 total)

| ID | Name | Description | Cost | Effect | Tier |
|----|------|-------------|------|--------|------|
| xp_multiplier_1 | Knowledge Seeker I | +10% XP in all games | 500 gold | xpMultiplier: 1.10 | 1 |
| xp_multiplier_2 | Knowledge Seeker II | +20% XP in all games | 1500 gold | xpMultiplier: 1.20 | 2 |
| xp_multiplier_3 | Knowledge Seeker III | +30% XP in all games | 3000 gold | xpMultiplier: 1.30 | 3 |
| quest_xp_boost | Quest Mastery | +25% XP from quests | 2000 gold | questXpMultiplier: 1.25 | 2 |

#### Resource Upgrades (4 total)

| ID | Name | Description | Cost | Effect | Tier |
|----|------|-------------|------|--------|------|
| gold_multiplier_1 | Golden Touch I | +25% gold earned | 750 gold | goldMultiplier: 1.25 | 1 |
| gold_multiplier_2 | Golden Touch II | +50% gold earned | 2000 gold | goldMultiplier: 1.50 | 2 |
| starting_gold | Inheritance | Start with 500 extra gold | 1500 gold | startingGold: 500 | 2 |
| double_loot_chance | Luck of the Draw | 10% double item drops | 2500 gold | doubleLootChance: 0.10 | 2 |

#### Gameplay Upgrades (4 total)

| ID | Name | Description | Cost | Effect | Tier |
|----|------|-------------|------|--------|------|
| starting_level_boost | Battle Hardened | Start at level 3 | 2000 gold | startingLevel: 3 | 2 |
| max_health_boost_1 | Vitality I | +20 max HP | 500 gold | maxHealthBonus: 20 | 1 |
| max_health_boost_2 | Vitality II | +50 max HP | 1500 gold | maxHealthBonus: 50 | 2 |
| inventory_space | Bottomless Pack | +10 inventory slots | 1000 gold | inventorySlots: 10 | 1 |

#### Language Upgrades (2 total)

| ID | Name | Description | Cost | Effect | Tier |
|----|------|-------------|------|--------|------|
| faster_dialect_unlock | Linguistic Prodigy | Unlock dialects 30% faster | 3000 gold | dialectProgressMultiplier: 1.30 | 3 |
| dialect_bonus_xp | Accent Master | +20% XP learning dialects | 2000 gold | dialectXpMultiplier: 1.20 | 2 |

#### Quality of Life Upgrades (3 total)

| ID | Name | Description | Cost | Effect | Tier |
|----|------|-------------|------|--------|------|
| fast_travel | Waystones | Unlock fast travel | 3000 gold | fastTravelUnlocked: true | 2 |
| quest_tracker | Quest Compass | Quest objectives on screen | 1500 gold | questTrackerUnlocked: true | 1 |
| auto_sell_junk | Merchant's Bargain | Auto-sell junk items | 2000 gold | autoSellJunk: true | 2 |

**Total Upgrades:** 17

---

### Effect Types

```javascript
// Multiplicative (multiplied together when stacked)
xpMultiplier, goldMultiplier, questXpMultiplier, dialectProgressMultiplier, dialectXpMultiplier

// Additive (added together when stacked)
maxHealthBonus, inventorySlots, startingGold, startingLevel

// Boolean (feature unlocks)
fastTravelUnlocked, questTrackerUnlocked, autoSellJunk
```

---

### Integration Points

#### Where Upgrades Are Sold

**DESIGN DECISION:** Account upgrades integrated into existing systems, NOT a standalone shop.

1. **Shop System** - Regular NPCs can sell account upgrades as special items
2. **NPC Vendors** - Specific NPCs offer one-time account upgrade purchases
3. **Achievement Rewards** - Some upgrades unlock as achievement rewards

**NOT on title screen.** Players access account upgrades through gameplay.

#### When to Award Account Gold

```javascript
// Quest completion
onQuestComplete(questId)  → Award based on quest difficulty

// Level up
onLevelUp(newLevel)  → Award bonus gold per level

// Achievement unlock
onAchievementUnlock(achievementId)  → Award based on achievement

// Boss defeat
onBossDefeat(bossId)  → Award based on boss difficulty

// Story milestones
onStoryMilestone(milestoneId)  → Award for major story beats
```

#### When Effects Apply

```javascript
// New game starts
createNewGameWithAccountBonuses(courseId, playerName)
// → All purchased upgrades automatically apply to new save

// Game loads
loadGameWithAccountBonuses(saveData)
// → Effects apply to existing save
```

---

### Storage

```javascript
// localStorage keys
'bytequest_account_id'         // Unique account identifier
'bytequest_account_currencies' // { gold: number }
'bytequest_account_upgrades'   // [{ id, purchasedAt }, ...]
```

---

### Testing Commands (Browser Console)

```javascript
// Show account status
debugAccountProgression()

// Add test gold
testAddCurrency('gold', 5000)

// Purchase upgrade
await accountProgression.purchaseUpgrade('xp_multiplier_1')

// Check active effects
accountProgression.getActiveEffects()

// Test new game with bonuses
testNewGame()

// Reset account (testing only)
testResetAccount()
```

---

### Implementation Status

| Task | Status |
|------|--------|
| Core AccountProgressionManager | ✅ Complete |
| AccountProgressionConfig | ✅ Complete |
| Gold-only currency | ✅ Complete |
| Tier unlock placeholders | ✅ Complete |
| 17 upgrades defined | ✅ Complete |
| gameIntegration.js | ✅ Complete |
| accountProgressionUI.js | ✅ Complete (temporary) |
| Hook into quest rewards | ⏳ Pending |
| Hook into level up | ⏳ Pending |
| Hook into achievements | ⏳ Pending |
| Integrate into shopSystem.js | ⏳ Pending |
| Map NPC upgrade vendors | ⏳ Pending |
| Balance gold costs | ⏳ TBD |
| Balance gold earning rates | ⏳ TBD |
| Define tier unlock requirements | ⏳ TBD |

---

### Balance Questions (TBD)

1. **Gold Costs** - Are 500-3000 gold appropriate for upgrades?
2. **Gold Earning Rates** - How much account gold per quest/level/boss?
3. **Tier Requirements** - What achievements unlock Tier 2 and Tier 3?
4. **Stacking Limits** - Should stackable upgrades have caps?
5. **Starting Power** - Is +10% XP at Tier 1 too strong for new players?

---

### Why This System Works

**For Players:**
- ✅ Progression across saves — All playthroughs matter
- ✅ Reward mastery — More you play, stronger you become
- ✅ Endless goals — Always something to work towards
- ✅ Alt-friendly — Easier to do different paths with perks
- ✅ Satisfying milestones — Visible account growth

**For Game Design:**
- ✅ Encourages replayability — Want to use upgrades
- ✅ Extends playtime — More reason to keep playing
- ✅ Power progression — Smooth difficulty curve
- ✅ Engagement hooks — "One more achievement" syndrome
- ✅ Balanceable — Adjust costs/effects as needed

---

### Design Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Currency type | Gold only | Simpler than 4 premium currencies |
| Tier unlocks | Achievement-based (TBD) | Encourages gameplay variety |
| Vocabulary headstart | REMOVED | Preserves spaced repetition integrity |
| Shop location | Integrated into existing shops | Not a standalone title screen feature |
| NPC vendors | One-time upgrade sales | Rewards exploration and NPC interaction |

---

*Document maintained as part of ByteQuest development.*
