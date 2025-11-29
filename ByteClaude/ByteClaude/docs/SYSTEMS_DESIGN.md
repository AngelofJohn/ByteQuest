# ByteQuest Systems Design Document
## Phase 1-3 Technical Architecture

---

## Table of Contents
1. [Core Loop](#1-core-loop)
2. [Player Systems](#2-player-systems)
3. [Language Learning Engine](#3-language-learning-engine)
4. [Quest System](#4-quest-system)
5. [World & Navigation](#5-world--navigation)
6. [NPC & Dialog System](#6-npc--dialog-system)
7. [Combat System](#7-combat-system)
8. [Economy System](#8-economy-system)
9. [Reputation & Factions](#9-reputation--factions)
10. [Progression Systems](#10-progression-systems)
11. [Save/Load & Persistence](#11-saveload--persistence)
12. [UI/UX Systems](#12-uiux-systems)
13. [Audio System](#13-audio-system)
14. [Data Architecture](#14-data-architecture)

---

## 1. Core Loop

### Primary Gameplay Loop
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   EXPLORE ──► INTERACT ──► LEARN ──► PROGRESS ──► EXPLORE  │
│      │            │           │           │                 │
│      ▼            ▼           ▼           ▼                 │
│   Discover    Talk to     Complete    Gain XP/Gold         │
│   Locations    NPCs       Lessons     Level Up              │
│   Find Quests  Get Quests  Answer Qs   Unlock Content       │
│                Shop        Take DMG    New Zones            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Session Flow
```
1. Player loads game
2. Checks quest log for active objectives
3. Travels to relevant location (or explores)
4. Interacts with NPCs
5. Accepts/progresses quests
6. Completes lessons (language learning)
7. Receives rewards
8. Saves progress
9. Repeat or logout
```

### Engagement Mechanics
| Mechanic | Purpose | Implementation |
|----------|---------|----------------|
| Daily Bonus | Retention | Bonus XP/Gold for consecutive days |
| Quest Chains | Long-term goals | Multi-part storylines |
| Collectibles | Exploration reward | Relics hidden in zones |
| Achievements | Milestone celebration | Titles and cosmetics |
| Review Prompts | Spaced repetition | Remind player of old vocab |

---

## 2. Player Systems

### 2.1 Player State Object
```javascript
Player {
  // Identity
  id: string
  name: string
  class: "scholar" | "warrior" | "rogue"
  createdAt: timestamp
  
  // Core Stats
  level: number (1-20+)
  xp: number
  xpToNext: number
  hp: number
  maxHp: number
  
  // Resources
  gold: number
  
  // Equipment
  equipment: {
    helm: itemId | null
    armor: itemId | null
    weapon: itemId | null
    accessory: itemId | null
    ring: itemId | null
  }
  
  // Inventory
  inventory: Array<{ itemId: string, count: number }>
  maxInventorySlots: number (default: 24)
  
  // Progress
  completedQuests: string[]
  activeQuests: QuestProgress[]
  discoveredLocations: string[]
  metNpcs: string[]
  
  // Language Progress
  vocabularyMastery: Map<wordId, MasteryData>
  lessonsCompleted: number
  totalCorrectAnswers: number
  totalWrongAnswers: number
  currentStreak: number
  longestStreak: number
  
  // Reputation
  reputation: Map<factionId, number>
  
  // Cosmetics & Achievements
  titles: string[]
  activeTitle: string | null
  achievements: string[]
  
  // Settings
  settings: PlayerSettings
}
```

### 2.2 Class System

| Class | Base HP | Bonus | Starting Items | Playstyle |
|-------|---------|-------|----------------|-----------|
| Scholar | 80 | Extra hints, +10% XP | Wand, Cloak | Cerebral, study-focused |
| Warrior | 100 | +20 HP, slower HP decay | Shovel, Helm | Forgiving mistakes |
| Rogue | 90 | -10% shop prices | Cloak, Potion | Resource management |

### 2.3 HP System

**Purpose:** Creates stakes for wrong answers without being punitive.

```
HP Mechanics:
├── Base HP: 80-100 (based on class)
├── Per Level: +10 max HP
├── Equipment Bonus: Varies by item
│
├── Damage Sources:
│   ├── Wrong answer in lesson: -10 HP
│   ├── Combat (future): Variable
│   └── Story events