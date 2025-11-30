# ByteQuest Systems Design Document

**Version:** 2.0  
**Last Updated:** Phase 2 Complete  
**Status:** Implementation Complete

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Game State](#core-game-state)
3. [Player Systems](#player-systems)
4. [Quest System](#quest-system)
5. [Lesson System](#lesson-system)
6. [Hint System](#hint-system)
7. [Location System](#location-system)
8. [Boss Exam System](#boss-exam-system)
9. [Item & Inventory System](#item--inventory-system)
10. [Shop System](#shop-system)
11. [Reputation System](#reputation-system)
12. [Title System](#title-system)
13. [Spaced Repetition System](#spaced-repetition-system)
14. [Statistics & Analytics](#statistics--analytics)
15. [Achievement System](#achievement-system)
16. [Save/Load System](#saveload-system)

---

## Architecture Overview

### File Structure

```
bytequest/
├── index.html              # Main HTML structure
├── css/
│   └── style.css           # All styles (~50KB)
├── js/
│   ├── game.js             # Core game engine (~91KB)
│   ├── questSystem.js      # Quest management (~25KB)
│   ├── itemSystem.js       # Items & inventory (~17KB)
│   ├── shopSystem.js       # NPC shops (~10KB)
│   ├── reputationSystem.js # Faction reputation (~14KB)
│   ├── spacedRepetition.js # SRS algorithm (~13KB)
│   ├── statsSystem.js      # Analytics & stats (~23KB)
│   ├── hintSystem.js       # Hint management (~8KB)
│   ├── locationSystem.js   # Location/travel (~12KB)
│   ├── bossExamSystem.js   # Boss exams (~12KB)
│   └── titleSystem.js      # Player titles (~9KB)
└── data/
    ├── vocabulary.js       # French vocabulary
    └── gamedata.js         # Game content data
```

### System Initialization Order

```javascript
// In initGame():
1. spacedRepetitionSystem  // Word tracking
2. itemManager             // Items & inventory
3. shopManager             // NPC shops
4. reputationManager       // Faction rep
5. questManager            // Quest logic
6. statsManager            // Analytics
7. hintManager             // Lesson hints
8. locationManager         // Travel system
9. bossExamManager         // Exams
10. titleManager           // Player titles
```

### Global Managers

| Manager | Global Variable | Purpose |
|---------|-----------------|---------|
| SpacedRepetitionSystem | `spacedRepetitionSystem` | Word learning tracking |
| ItemManager | `itemManager` | Inventory operations |
| ShopManager | `shopManager` | NPC shop transactions |
| ReputationManager | `reputationManager` | Faction standing |
| QuestManager | `questManager` | Quest state & progression |
| StatsManager | `statsManager` | Analytics & history |
| HintManager | `hintManager` | Lesson hint charges |
| LocationManager | `locationManager` | Travel & discovery |
| BossExamManager | `bossExamManager` | Zone exams |
| TitleManager | `titleManager` | Player titles |

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
    examLocationId: null
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

| Class | Max HP | XP Modifier | Description |
|-------|--------|-------------|-------------|
| Scholar | 90 | +10% | Higher XP gains |
| Warrior | 120 | Normal | More forgiving with mistakes |
| Traveler | 100 | Normal | Balanced stats |

### Leveling

```javascript
// XP Requirements (cumulative)
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
| Wrong answer (lesson) | -10 |
| Wrong answer (exam) | -15 |
| Health Potion | +30 |
| Bread | +10 |
| Rest at Inn | Full restore (10 gold) |
| Review Session | +% based on score |
| Level Up | Full restore |

### Death/Recovery

When HP reaches 0:
1. Modal prompts review or rest
2. Review restores HP based on performance
3. Inn costs 10 gold for full restore
4. Cannot attempt exams at 0 HP

---

## Quest System

### Quest Types

| Type | Icon | Description |
|------|------|-------------|
| main | 📜 | Story progression |
| side | 📋 | Optional content |
| lesson | 📚 | Language learning |
| daily | 🔄 | Repeatable (future) |
| reputation | ⭐ | Faction-specific |

### Quest States

```
available → active → completed
              ↓
           failed (rare)
```

### Objective Types

| Type | Description |
|------|-------------|
| talk | Speak with NPC |
| meet | Meet X settlers |
| lesson | Complete vocabulary lesson |
| collect | Gather items |
| deliver | Bring item to NPC |
| explore | Discover location |

### Quest Data Structure

```javascript
{
  id: "quest_id",
  name: "Quest Name",
  type: "main",
  description: "Quest description",
  giver: "npc_id",
  prerequisites: ["other_quest_id"],
  levelRequirement: 1,
  objectives: [
    {
      id: "obj_1",
      type: "lesson",
      text: "Complete the lesson",
      target: 1
    }
  ],
  rewards: {
    xp: 100,
    gold: 50,
    items: ["item_id"],
    reputation: { faction: 10 }
  },
  vocabulary: ["greetings.basic"],
  dialogue: {
    intro: "...",
    progress: "...",
    complete: "..."
  }
}
```

---

## Lesson System

### Question Generation

1. Gather vocabulary from quest categories
2. Shuffle and select question count (default 8)
3. Generate question types:
   - `to_english`: French → English
   - `to_french`: English → French
4. Create 4 options (1 correct, 3 random wrong)

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

// Reset on wrong answer
```

### Review Sessions

- Available when HP is low or after death
- Uses previously learned vocabulary
- HP recovery = maxHP × successRate
- Small XP reward (15 × successRate)
- Required before retrying failed exams

---

## Hint System

### Hybrid Charge + Unlock Model

**Charges:**
- Base charges per lesson: 2
- Bonus from Insight stat: floor(insight × 0.5)
- Replenish each lesson
- Consumed when viewing hint

**Word Unlock:**
- New words: locked
- Unlock threshold: 3 correct answers
- Insight reduces threshold: max(1, 3 - floor(insight × 0.3))
- Must be unlocked AND have charge to see hint

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

### UI States

| State | Display |
|-------|---------|
| Locked, no charges | "🔒 Hint locked (need X more correct)" |
| Locked, has charges | "🔒 Hint locked (X more correct to unlock)" |
| Unlocked, no charges | "💡 No hint charges remaining" |
| Unlocked, has charges | "💡 [Click to reveal] (X charges)" |
| Revealed | "💡 [hint text]" |

### Boss Exam Override

- Hints disabled during exams (configurable per exam)
- Display: "📜 Hints disabled for exam"

---

## Location System

### Location Data Structure

```javascript
{
  id: "location_id",
  name: "Location Name",
  description: "Description text",
  type: "town",              // town, city, wilderness, dungeon
  levelRequirement: 1,
  region: "dawnmere_region",
  
  // Discovery
  discovered: false,         // Player has found it
  unlocked: true,            // Player can travel there
  
  // Content
  npcs: ["npc_id", ...],
  quests: ["quest_id", ...],
  
  // Connections
  connections: ["other_location_id", ...],
  
  // Boss Exam
  hasBossExam: false,
  bossExamId: null
}
```

### Location States

| State | Can See | Can Travel |
|-------|---------|------------|
| Undiscovered | ❌ | ❌ |
| Discovered, Locked | ✅ (grayed) | ❌ |
| Discovered, Unlocked | ✅ | ✅ |
| Current | ✅ (highlighted) | N/A |

### Travel System

```javascript
locationManager.travelTo(locationId)
// Returns: {success, message, newLocation}

// Checks:
// 1. Location exists
// 2. Location discovered
// 3. Location unlocked
// 4. Level requirement met
```

### Discovery Triggers

- Quest completion
- NPC dialogue
- Exploration objectives
- Boss exam completion

---

## Boss Exam System

### Exam Configuration

```javascript
defaultExamConfig = {
  questionCount: 15,
  passThreshold: 80,          // Percent required
  hpPenalty: 15,              // Per wrong answer
  allowHints: false,
  hintMultiplier: 0,
  timeLimit: null,            // Future: timed exams
  xpMultiplier: 2.0,
  goldMultiplier: 2.0
}
```

### Exam Flow

```
1. Player initiates exam
2. Check prerequisites (HP > 0, review if failed before)
3. Generate questions from location vocabulary
4. Run lesson with exam settings
5. Calculate results
6. Award/deny rewards
7. Track history
```

### Exam Rewards

| Reward | Calculation |
|--------|-------------|
| XP | baseXP × xpMultiplier × scorePercent |
| Gold | baseGold × goldMultiplier |
| Location Unlock | Specific locations per exam |
| Title | First-time completion |

### Exam History

```javascript
examHistory[locationId] = {
  attempts: 0,
  bestScore: 0,
  passed: false,
  lastAttempt: null,
  firstPassDate: null
}
```

### Retry Requirements

- Must complete review session after failure
- HP must be > 0
- No cooldown timer (future consideration)

---

## Item & Inventory System

### Item Types

| Type | Slot | Stackable |
|------|------|-----------|
| consumable | N/A | Yes |
| helm | helm | No |
| armor | armor | No |
| weapon | weapon | No |
| accessory | accessory | No |
| ring | ring | No |
| material | N/A | Yes |
| quest | N/A | No |

### Item Data Structure

```javascript
{
  id: "item_id",
  name: "Item Name",
  type: "consumable",
  icon: "🧪",
  description: "Description",
  rarity: "common",
  stackable: true,
  maxStack: 99,
  value: 10,                  // Sell price
  
  // For equipment
  stats: {
    maxHp: 10,
    insight: 1
  },
  
  // For consumables
  effect: {
    hp: 30
  }
}
```

### Rarity Tiers

| Tier | Color | Drop Rate |
|------|-------|-----------|
| common | white | 60% |
| uncommon | green | 25% |
| rare | blue | 10% |
| epic | purple | 4% |
| legendary | gold | 1% |

### Equipment Stats

| Stat | Effect |
|------|--------|
| maxHp | Increases maximum HP |
| insight | Improves hint system |
| xpBonus | Percentage XP increase |
| goldBonus | Percentage gold increase |

---

## Shop System

### Shop Data Structure

```javascript
{
  npcId: "rega",
  name: "Rega's Farm Goods",
  inventory: [
    {
      itemId: "bread",
      stock: -1,              // -1 = unlimited
      priceMultiplier: 1.0
    }
  ],
  buyMultiplier: 1.0,         // Price to buy
  sellMultiplier: 0.5,        // Price when selling
  reputationRequired: null,
  reputationDiscount: {
    faction: "farmers",
    perLevel: 0.05            // 5% discount per rep level
  }
}
```

### Transaction Flow

```javascript
shopManager.buyItem(npcId, itemId, quantity)
// Checks: gold, stock, inventory space
// Applies: reputation discounts
// Returns: {success, message, cost}

shopManager.sellItem(itemId, quantity)
// Checks: item in inventory
// Applies: sell multiplier
// Returns: {success, message, gold}
```

---

## Reputation System

### Faction Data

```javascript
{
  id: "faction_id",
  name: "Faction Name",
  description: "Description",
  icon: "🌾",
  levels: [
    { name: "Stranger", threshold: 0 },
    { name: "Acquaintance", threshold: 100 },
    { name: "Friendly", threshold: 300 },
    { name: "Honored", threshold: 600 },
    { name: "Revered", threshold: 1000 },
    { name: "Exalted", threshold: 1500 }
  ],
  rewards: {
    300: { type: "unlock_shop", data: "special_vendor" },
    600: { type: "discount", data: 0.1 },
    1000: { type: "title", data: "faction_champion" }
  }
}
```

### Reputation Sources

| Source | Amount |
|--------|--------|
| Quest completion | 10-50 |
| Daily activities | 5-15 |
| Special events | 25-100 |
| Reputation items | 25-50 |

### Reputation Effects

| Level | Typical Benefits |
|-------|------------------|
| Friendly | Basic shop access |
| Honored | 5% discount |
| Revered | Special items, 10% discount |
| Exalted | Unique title, 15% discount |

---

## Title System

### Title Data Structure

```javascript
{
  id: "title_id",
  name: "The Learned",
  description: "Completed 10 lessons",
  source: "milestone",        // milestone, achievement, reputation, exam, special
  color: "#ffd700",
  rarity: "uncommon",
  requirement: {
    type: "lessons_completed",
    value: 10
  }
}
```

### Title Sources

| Source | Examples |
|--------|----------|
| milestone | Lesson count, level reached |
| achievement | Perfect lessons, streaks |
| reputation | Faction exalted |
| exam | Boss exam completion |
| special | Events, secrets |

### Title Display

- Shown under player name in HUD
- Color-coded by rarity
- Optional display (can hide)

### Available Titles

| ID | Name | Requirement |
|----|------|-------------|
| novice | Novice | Start game |
| apprentice | Apprentice | Level 5 |
| adept | Adept | Level 10 |
| scholar | Scholar | 25 lessons |
| master_scholar | Master Scholar | 100 lessons |
| perfectionist | Perfectionist | 10 perfect lessons |
| unstoppable | Unstoppable | 20 streak |
| polyglot | Polyglot | 100 words |
| exam_conqueror | Exam Conqueror | Pass any exam |
| flawless | Flawless | 100% on exam |

---

## Spaced Repetition System

### Algorithm (SM-2 Based)

```javascript
// After each review:
if (correct) {
  repetitions++
  if (repetitions === 1) interval = 1
  else if (repetitions === 2) interval = 3
  else interval = Math.round(interval * easeFactor)
  
  easeFactor += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  easeFactor = Math.max(1.3, easeFactor)
} else {
  repetitions = 0
  interval = 1
  easeFactor = Math.max(1.3, easeFactor - 0.2)
}

nextReview = now + (interval * 24 * 60 * 60 * 1000)
```

### Word States

| State | Criteria |
|-------|----------|
| New | Never seen |
| Learning | 1-2 repetitions |
| Reviewing | 3-5 repetitions |
| Mastered | 6+ repetitions, ease > 2.0 |

### Quality Scoring

| Performance | Quality | Description |
|-------------|---------|-------------|
| Perfect (no hints) | 5 | Best retention |
| Correct (with hint) | 4 | Good retention |
| Hesitant correct | 3 | Moderate |
| Wrong then correct | 2 | Weak |
| Wrong | 1 | Needs work |

---

## Statistics & Analytics

### Tracked Metrics

**Session Stats:**
- Lessons completed
- Questions answered
- Correct/wrong ratio
- Time spent
- XP earned

**Cumulative Stats:**
- Total lessons
- Total words learned
- Mastery progress
- Quest completion rate
- Gold economy

**Streaks:**
- Current streak
- Best streak
- Daily login streak (future)

### Stats Display

```javascript
statsManager.getOverview()
// Returns formatted stats for UI

statsManager.getSessionStats()
// Returns current session data

statsManager.exportStats()
// Returns JSON for backup
```

---

## Achievement System

### Achievement Categories

| Category | Examples |
|----------|----------|
| Learning | Lessons, words, mastery |
| Progression | Levels, quests, locations |
| Social | NPCs met, reputation |
| Challenge | Streaks, perfect scores |
| Collection | Items, titles |

### Achievement Structure

```javascript
{
  id: "achievement_id",
  name: "Achievement Name",
  description: "How to earn",
  icon: "🏆",
  category: "learning",
  hidden: false,
  requirement: {
    type: "lessons_completed",
    value: 10
  },
  rewards: {
    xp: 50,
    title: "title_id"
  }
}
```

### Check Triggers

Achievements checked after:
- Lesson completion
- Quest completion
- Level up
- Item acquisition
- Reputation change

---

## Save/Load System

### Save Data Structure

```javascript
{
  version: "2.0",
  timestamp: Date.now(),
  player: GameState.player,
  currentLocation: GameState.currentLocation,
  
  // System states
  wordProgress: spacedRepetitionSystem.exportData(),
  reputationData: reputationManager.exportData(),
  questData: questManager.exportData(),
  examHistory: bossExamManager.exportHistory(),
  
  // Settings
  settings: GameState.settings
}
```

### Storage

- **Method:** localStorage
- **Key:** `bytequest_save`
- **Auto-save:** After significant events

### Save Triggers

- Quest completion
- Lesson completion
- Level up
- Manual save button
- Location change

---

## Future Considerations

### Phase 3 Planned Features

- [ ] Crafting system (professions)
- [ ] Cooking recipes (consumables)
- [ ] Weather system (visual)
- [ ] Day/night cycle
- [ ] Companions/pets
- [ ] PvE combat (vocabulary battles)
- [ ] Unlockable dialects/languages

### Technical Debt

- Consider IndexedDB for larger saves
- Audio system integration
- Mobile responsive improvements
- Keyboard navigation
- Accessibility features

---

## Appendix: Event Flow Diagrams

### Lesson Flow

```
Start Lesson
    ↓
Generate Questions
    ↓
[Loop] Show Question
    ↓
    ├── Correct → Update streak, SRS, continue
    │
    └── Wrong → Reset streak, HP damage, SRS update
    ↓
All Questions Done
    ↓
Calculate Results
    ↓
    ├── Pass (≥60%) → Award XP, update quest
    │
    └── Fail → Encourage review
    ↓
Update Stats & Save
```

### Boss Exam Flow

```
Initiate Exam
    ↓
Check Prerequisites
    ├── HP = 0 → Block
    ├── Review required → Block
    └── OK → Continue
    ↓
Generate Exam Questions (15)
    ↓
[Loop] Answer Questions
    ↓
    ├── Correct → Continue
    └── Wrong → -15 HP
    ↓
Calculate Score
    ↓
    ├── Pass (≥80%) → Unlock rewards
    │   ├── XP × 2
    │   ├── Gold × 2
    │   ├── Unlock locations
    │   └── Award title
    │
    └── Fail → Mark retry required
    ↓
Update History & Save
```

---

*Document maintained as part of ByteQuest development.*
