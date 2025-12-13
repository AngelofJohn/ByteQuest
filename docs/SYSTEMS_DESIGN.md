# ByteQuest Systems Design Document

**Version:** 3.16
**Last Updated:** December 10, 2025
**Status:** Phase 2 - Testing & Polish

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
│   └── PATCH_NOTES.md      # Bugs, cleanup, testing, ideas
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
getNPCsInLocation(loc, state)     // Get visible NPCs in location (with overrides)
getNPCsByTag(tag, state)          // Filter by tag
getQuestGivers(state)             // All NPCs with quests
getMerchants(state)               // All NPCs with shops
getNPCWithState(id, state)        // Get single NPC with state overrides applied
applyNPCStateOverrides(npc, state) // Apply overrides to NPC object
```

### State Overrides (Dynamic NPC Properties)

NPCs can change location, dialogue, or other properties based on quest state using `stateOverrides`. This keeps all NPC states in a single definition rather than duplicating entries.

```javascript
pardu: {
  name: "Pardu",
  title: "Wandering Guide",
  location: "dawnmere",           // Default location
  dialogue: {
    greeting: "Ready to head out?",
    idle: ["The road calls to me."]
  },
  stateOverrides: [
    {
      when: { questActive: "journey_to_haari" },
      location: "haari_fields",   // Moves during quest
      dialogue: { greeting: "These fields remind me of home..." }
    },
    {
      when: { quest: "journey_to_haari" },
      location: "haari_fields",   // Stays after quest complete
      dialogue: { greeting: "Good to settle here for a while." }
    }
  ]
}
```

**Override Conditions:** Same as visibility conditions (`quest`, `questActive`, `level`, `flag`, `reputation`)

**Priority:** Later overrides take precedence (last matching wins)

**Mergeable Properties:**
- `location` - NPC appears in different location
- `dialogue` - Greeting/idle changes (merges with base dialogue)
- `disposition` - Attitude changes
- Any other NPC property

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

#### Secondary Resources (Tiered)

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

#### Equipment Slots (Smithing)

| Slot | Types | Notes |
|------|-------|-------|
| Weapon | Dagger, Sword, Greatsword | Greatswords are 2H |
| Off-hand | Shield | HP + block chance |
| Head | Helm | HP focus |
| Body | Chestplate | Primary defense |

#### Material Progression

| Tier | Metal | Skill Range | Zone |
|------|-------|-------------|------|
| T1 | Copper | 1-75 | Dawnmere |
| T2 | Iron/Steel | 75-150 | Haari Fields |
| T3 | Mythril | 150-225 | Lurenium |
| T4 | Lurenium | 225-300 | Ancient Ruins |

> **Note:** Detailed recipe lists (30+ Smithing, 15+ Alchemy) to be defined in data files during Phase 3 implementation.

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

| Step | Requirements | Result |
|------|--------------|--------|
| Floor Challenge | 8-12 questions, ≥70% | Advance + rewards + lore |
| Fail | <70% | Return to surface, keep partial rewards |
| Boss Floor | Every 5 floors, 15-20 questions, ≥80% | Checkpoint unlocked |

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

| Floor Range | Questions | Timing | Notes |
|-------------|-----------|--------|-------|
| 1-9 | 5 | Generous | Warm-up |
| 10-19 | 8 | Strict | Challenge begins |
| 20-49 | 10 | Very strict | Advanced |
| 50+ | 10+ | Expert | Typo-strict, no hints, mixed content |

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

| Step | Action | Outcomes |
|------|--------|----------|
| 1 | Start Lesson | Generate questions (vocab or grammar) |
| 2 | Show Question | Wait for answer |
| 3a | Correct Answer | Update streak, SRS, continue |
| 3b | Wrong Answer | HP damage (Strength/Luck reduce), reset streak (Agility may protect) |
| 4 | All Questions Done | Calculate results |
| 5a | Pass (≥60%) | Award XP, update quest, unlock Spellbook pages |
| 5b | Fail | Encourage review |
| 6 | End | Update stats & save |

### Grammar Quest Flow

| Step | Trigger | Result |
|------|---------|--------|
| 1 | Complete prerequisite (e.g., meeting_family) | Sage Aldric appears |
| 2 | Talk to Sage Aldric | Accept grammar quest |
| 3 | Talk again | "Start Grammar Lesson" button |
| 4 | Start lesson | Generate: Conjugation, Fill-in-blank, Gender match |
| 5 | Complete lesson | Quest complete, Spellbook pages unlocked |

---

> **Note:** Art direction specs moved to CREATIVE_DIRECTION.md

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| Dec 10, 2025 | 3.16 | Slimmed professions section: condensed recipe tables (~90 lines → notes), merged resource tier tables |
| Dec 10, 2025 | 3.15 | Cleanup: Removed Art Direction section (→ CREATIVE_DIRECTION.md), removed vocabulary word lists (→ data files) |
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

### Stats Tutorial

**Trigger:** Level 2 with unspent stat points

**Flow:** Level up celebration → Stats overview (5 stats) → Detailed breakdown (optional) → First allocation → Confirmation

**Key Learnings:**
- 5 stats: Vitality (HP), Wisdom (XP%), Fortune (Gold%), Precision (auto-correct), Agility (streaks)
- 3 points per level, all builds viable
- Manage in Profile screen

---

### Reputation Tutorial

**Trigger:** First reputation gain (after "Meet the Settlers")

**Flow:** Reputation notification → Benefits explanation → Faction ranks preview → Multiple factions teaser

**Key Learnings:**
- Multiple factions with independent ranks
- Earned through quests/actions
- Higher ranks = discounts, quests, items
- Some factions conflict
- Check in Progress → Reputation tab

---

### Tutorial Quests

| Quest | Trigger | Teaches |
|-------|---------|---------|
| Welcome to Dawnmere | Game start | Basic interaction, quests |
| Meet the Settlers | After welcome | Exploration, NPCs, Reputation |
| Learning the Basics | First lesson | Lessons, HP, answering |
| Understanding Your Strengths | Level 2 | Stats system |
| A Place in the Community | After settlers | Reputation system |

---

### Tutorial State

```javascript
tutorialState: {
  completed: { basicInteraction, questSystem, lessonMechanics,
               statsSystem, reputationSystem, inventorySystem,
               spellbookSystem, titleSystem },
  currentTutorial: null,
  tutorialStep: 0,
  skipAll: false
}
```

**Implementation:** TutorialManager class, "first time" flags, skip option, Settings toggle

> **Note:** Detailed UI mockups archived in dev notes.

---

### Tutorial Dialogue Scripts

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

| Step | Content | Actions |
|------|---------|---------|
| 1 | First Reputation Gain | Shows "+X Reputation with [Faction]" notification with [What is Reputation?] button |
| 2 | Reputation Explanation | Explains factions, shows benefits: shop discounts, special quests, unique items, titles |
| 3 | Faction Ranks | Shows rank progression (Stranger → Visitor → Friend → Honored → Champion) with benefits |
| 4 | Factions Preview | Lists major factions: Dawnmere Settlers, Horticulturists, Miners Guild, Old Guard, Loyalists |

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

### Extended NPC Dialogue Scripts

#### Sage Aldric - Stats Dialogue (Extended)

**First Meeting (post-Level 2):**
> "Greetings, young learner. I am Aldric, keeper of knowledge in these parts. I sense potential within you—but potential must be shaped. Have you considered how to develop your abilities?"

**If player hasn't allocated points:**
> "I see you have untapped potential. Three points of growth, waiting to be directed. Shall I explain the paths before you?"

**After tutorial:**
> "Remember: there is no single path to mastery. A warrior may value Vitality, a scholar may prize Wisdom, but the greatest among us find their own balance."

#### Elder Urma - Reputation Dialogue (Extended)

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

**Concept:** Answer vocabulary questions before time runs out. Each correct = 1 ore.

| Element | Value |
|---------|-------|
| Timer | 60 seconds (countdown) |
| Correct answer | +1 resource |
| Wrong answer | -3 second penalty |
| Speed bonus | <2 seconds = chance for bonus ore |

**UI Elements:** Timer bar, question display, 4 answer buttons, gathered resource counter

---

#### Woodcutting: Streak Challenge

**Concept:** Build answer streaks. Streak determines wood quality/quantity.

| Element | Value |
|---------|-------|
| Questions | 15 total |
| Base reward | 1 log per 3 correct |
| Streak bonuses | 5 streak = +1, 10 = +2, 15 = +3 |
| Wrong answer | Resets streak |

**UI Elements:** Streak counter with fire icons, best streak display, milestone indicators

---

#### Hunting: Speed Round

**Concept:** Answer 10 questions fast. Total time determines hide quality.

| Element | Value |
|---------|-------|
| Questions | 10 total |
| Timer | Counts up (cumulative) |
| Wrong answer | +5 second penalty |
| Star ratings | 3-star <30s, 2-star <45s, 1-star <60s |
| Perfect bonus | No mistakes + <30s = rare hide |

**UI Elements:** Question counter, cumulative timer, star target display

---

### Tier 2 Minigames

#### Herbalism: Matching Pairs

**Concept:** Match French words to English meanings. Calm, methodical gameplay.

| Element | Value |
|---------|-------|
| Pairs | 6-8 to match |
| Mechanic | Click French, then English |
| Correct match | Pair fades, +1 herb |
| Wrong match | +1 mistake |
| Bonus | 0-1 mistakes = extra herbs |
| Timer | None (relaxed pace) |

**UI Elements:** Two-column display (French/English), selection highlighting, mistake counter

**State:** `{ pairs[], selectedFrench, selectedEnglish, mistakes, matched }`

---

#### Fishing: Reaction + Question

**Concept:** Wait for bite → react quickly → answer question to catch fish.

| Phase | Duration | Action |
|-------|----------|--------|
| Waiting | 2-6s random | Watch for bite |
| Bite | 1.5s window | Press SPACE |
| Question | Until answer | 4-choice vocab |
| Result | Instant | Caught or escaped |

| Element | Value |
|---------|-------|
| Attempts | 5 per session |
| Miss reaction | Fish escapes |
| Wrong answer | Fish escapes |
| Fast reaction + correct | Chance for rare fish |

**States:** WAITING → BITE → QUESTION → CAUGHT/ESCAPED

---

### Tier 3 Minigames (Future)

| Minigame | Concept | Key Mechanic |
|----------|---------|--------------|
| **Word Scramble** | Unscramble letters for French word | Click tiles to build word |
| **Memory Cards** | Match French/English pairs | Flip 2 cards, find matches |
| **Rhythm Mining** | Hit keys as notes scroll | Timing + vocab question |
| **Hangman** | Guess French word by letters | Classic hangman rules |

---

### Tier 4 Minigames (Future)

*High complexity. Consider only after core game is polished.*

| Minigame | Concept | Technical Challenge |
|----------|---------|---------------------|
| **Typing Race** | Type translations as words scroll | Real-time input, scrolling |
| **Word Grid** | Place tiles to form French words | Grid system, word validation |
| **Conversation** | Dynamic NPC dialogue in French | Branching dialogue |
| **Pronunciation** | Speak French words | Web Speech API |

> **Note:** Resource vocabulary lists in data/vocabulary.js

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

> **Note:** Full lore, dialogue, and narrative details in **WORLD_BIBLE.md → Appendix E**.

### Overview

| System | Type | Purpose |
|--------|------|---------|
| Corruption Incursions | Repeated encounters | Corruption manifestation bosses |
| Ruins of the Ancients | Dungeon | Environmental puzzles + lore |
| Spire of Trials | Endless tower | Philosophical/scaling challenges |

### Boss Roster

| # | Boss | Difficulty | Type | Key Mechanic |
|---|------|------------|------|--------------|
| 1 | Hollow Shepherd | Medium | Corruption | Charm livestock, vulnerable when grounded |
| 2 | Magistrate's Echo | Medium-High | Corruption | Summons minions, weak to truth dialogue |
| 3 | Rotting Prophet | High | Corruption | Corrupted healing, mercy/redemption options |
| 4 | Archivist Prime | Medium | Guardian | Riddle-based, puzzle immunity |
| 5 | Last Regent | High | Spectral | Mid-fight dialogue, befriend option |
| 6 | Truthseeker's Doubt | Scales | Mirror | Adapts to player, damages both sides |
| 7 | Corrupted Idealist | Very High | Mage | Light+Dark magic, can be reformed |
| 8 | Apotheosis | Extreme | Final | 3 phases: Truth → Seduction → Hunger |

### Difficulty Scaling

| Boss | Level | Solo | Party |
|------|-------|------|-------|
| Hollow Shepherd | 15+ | Yes | 1-3 |
| Magistrate's Echo | 18+ | Yes | 1-3 |
| Rotting Prophet | 20+ | Hard | 2-4 |
| Archivist Prime | 22+ | No | 1-4 |
| Last Regent | 25+ | Hard | 2-4 |
| Truthseeker's Doubt | 28+ | Varies | 1-4 |
| Corrupted Idealist | 30+ | Hard | 2-4 |
| Apotheosis | 35+ | Very Hard | 3-4 |

### Encounter Triggers

| Boss | Location | Trigger Condition | Availability |
|------|----------|-------------------|--------------|
| Hollow Shepherd | Corrupted farmland | Random spawn post-story | Repeatable weekly |
| Magistrate's Echo | Abandoned courthouse | Quest chain completion | Once per playthrough |
| Rotting Prophet | Defiled temple | Reputation + quest flag | Once per playthrough |
| Archivist Prime | Ancient archive entrance | Solve entry puzzle | Once per playthrough |
| Last Regent | Archive inner sanctum | Defeat Archivist Prime | Once per playthrough |
| Truthseeker's Doubt | Spire floor 50 | Reach floor 50 | Each Spire run |
| Corrupted Idealist | Spire floor 75 | Reach floor 75 | Each Spire run |
| Apotheosis | Spire floor 100 | Reach floor 100 | Each Spire run |

### Combat Phases

#### Corruption Incursion Bosses

**Hollow Shepherd (3 phases)**
| Phase | HP Threshold | Mechanic | Counter |
|-------|--------------|----------|---------|
| 1 | 100-60% | Summons corrupted sheep (distractions) | Answer vocab to dispel |
| 2 | 60-30% | Levitates, AoE corruption spread | Ground him with nature vocab |
| 3 | 30-0% | Desperate charges, erratic patterns | Maintain streak for damage |

**Magistrate's Echo (3 phases)**
| Phase | HP Threshold | Mechanic | Counter |
|-------|--------------|----------|---------|
| 1 | 100-70% | Summons bureaucrat minions | Clear minions first |
| 2 | 70-40% | Legal immunity shield | Use "truth" dialogue options |
| 3 | 40-0% | Rapid-fire accusations | Perfect answers break shield |

**Rotting Prophet (4 phases)**
| Phase | HP Threshold | Mechanic | Counter |
|-------|--------------|----------|---------|
| 1 | 100-75% | Corrupted prayers (healing self) | Interrupt with quick answers |
| 2 | 75-50% | Spreads doubt (player debuff) | Religious vocab removes debuff |
| 3 | 50-25% | Desperate plea phase | Mercy option unlocks here |
| 4 | 25-0% | Full corruption unleashed | DPS race or complete mercy path |

#### Ruins Bosses

**Archivist Prime (Puzzle boss)**
| Phase | Mechanic | Requirement |
|-------|----------|-------------|
| Entry | Archive riddle | Solve 3 riddles to start fight |
| Combat | Immunity cycles | Only damageable after correct answer |
| Enrage | Speed increase | Must complete within time limit |

**Last Regent (Dialogue boss)**
| Phase | Mechanic | Outcome |
|-------|----------|---------|
| Intro | Extended dialogue | Choices affect difficulty |
| Combat | Mid-fight conversations | Correct responses reduce HP |
| Resolution | Final choice | Befriend = ally, Defeat = equipment |

#### Spire Bosses

**Truthseeker's Doubt (Mirror boss)**
| Mechanic | Description |
|----------|-------------|
| Mirroring | Copies player's stats and abilities |
| Reflection damage | Wrong answers hurt both combatants |
| Adaptation | Changes tactics based on player patterns |
| Victory condition | Maintain conviction (streak) while taking damage |

**Corrupted Idealist (Mage boss)**
| Phase | Magic Type | Counter |
|-------|------------|---------|
| 1 | Light magic attacks | Dark vocab answers |
| 2 | Dark magic attacks | Light vocab answers |
| 3 | Combined assault | Mixed vocab mastery |
| Reform path | Extended dialogue | 80%+ correct unlocks redemption |

**Apotheosis (Final boss - 3 distinct phases)**
| Phase | Name | Mechanic | Victory Condition |
|-------|------|----------|-------------------|
| 1 | Truth | Tests knowledge breadth | Answer from all categories |
| 2 | Seduction | Temptation choices | Resist shortcuts, stay honest |
| 3 | Hunger | Endurance challenge | Survive 20-question gauntlet |

### Resolution Types

| Boss | Defeat | Mercy/Befriend | Special |
|------|--------|----------------|---------|
| Hollow Shepherd | Standard loot | Release spirit (+rep) | - |
| Magistrate's Echo | Evidence documents | - | Expose corruption quest |
| Rotting Prophet | Standard loot | Redemption (+major rep) | Unlocks priest ally |
| Archivist Prime | Archive access | - | Lore documents |
| Last Regent | Ancient equipment | Title + ally + quests | Unlocks secret area |
| Truthseeker's Doubt | Conviction artifact | Balance artifact | Different stat bonuses |
| Corrupted Idealist | Mage equipment | Ally recruitment | Intel on Hermeau |
| Apotheosis | Destruction ending | Acceptance ending | Understanding ending |

### Language Challenge Integration

| Boss | Primary Category | Secondary Category |
|------|------------------|-------------------|
| Hollow Shepherd | Nature, Animals | Agriculture |
| Magistrate's Echo | Government, Law | Formal speech |
| Rotting Prophet | Religion, Faith | Emotions |
| Archivist Prime | History, Time | Academic |
| Last Regent | Royalty, Legacy | Ancient terms |
| Truthseeker's Doubt | Self, Identity | Philosophy |
| Corrupted Idealist | Politics, Morality | Persuasion |
| Apotheosis | All categories | Mixed difficulty |

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
