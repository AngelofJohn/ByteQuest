# ByteQuest: Upgrade System & Mini-Game Design Document

**Version:** 1.0 DRAFT
**Last Updated:** 2026-01-02
**Status:** Design Phase

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Upgrade System Overview](#upgrade-system-overview)
3. [Full Upgrade Tables](#full-upgrade-tables)
4. [Resource-Scaling System](#resource-scaling-system)
5. [Economy Balancing](#economy-balancing)
6. [Mini-Game Concepts](#mini-game-concepts)
7. [Implementation Priority](#implementation-priority)

---

## Design Philosophy

### Core Principles

1. **Visible Progress** - Players should SEE their upgrades working, not just trust invisible multipliers
2. **Meaningful Choices** - Upgrades should create build diversity and strategic decisions
3. **Layered Complexity** - Simple early game, deep late game
4. **Learning Integration** - Upgrades should enhance, not bypass, the language learning

### Upgrade Progression Model

```
TIER 1: ADDITIVE
├── Flat bonuses (+5g, +10 XP)
├── Immediately visible in reward breakdowns
├── "I can see exactly what this gives me"
└── Target: First 0-2 hours

TIER 2: HYBRID
├── Higher additives + low multipliers
├── Stacking begins to feel powerful
├── "My build is taking shape"
└── Target: 2-10 hours

TIER 3: MULTIPLICATIVE
├── Percentage-based scaling
├── Rewards investment in base stats
├── "I'm becoming powerful"
└── Target: 10-30 hours

TIER 4: RESOURCE-SCALING
├── Bonuses scale with materials held
├── Creates hold vs use decisions
├── "I'm optimizing my build"
└── Target: 30+ hours (endgame)
```

### Why This Structure?

| Problem with Pure Multipliers | Solution with Tiered Approach |
|------------------------------|------------------------------|
| Early game: +10% of 20g = +2g (invisible) | Early game: +5g flat (visible) |
| No "aha moment" when purchasing | Immediate feedback on every reward |
| Abstract math, not tangible | Concrete numbers in breakdown |
| Late game: multipliers scale well | Late game: we use multipliers there |

---

## Upgrade System Overview

### Categories

| Category | Focus | Example Upgrades |
|----------|-------|------------------|
| Gold & Economy | Earning and spending | Golden Touch, Haggler |
| XP & Learning | Experience gains | Scholar's Bonus, Quick Learner |
| Gathering | Resource collection | Gatherer's Haul, Efficient Harvest |
| Crafting | Item creation | Apprentice Crafter, Quality Control |
| Combat & Survival | HP and defense | Vitality, Damage Reduction |
| Inventory & Storage | Capacity | Bigger Pockets, Pack Mule |
| Language & Mastery | Learning speed | Memory Aid, Polyglot's Path |
| Quality of Life | Convenience | Fast Travel, Auto-Loot |
| Class-Specific | Class bonuses | Per-class upgrade trees |

### Reward Breakdown Display

When completing a quest, show exactly where rewards come from:

```
╔═══════════════════════════════════════╗
║         QUEST COMPLETE!               ║
╠═══════════════════════════════════════╣
║                                       ║
║  Base Reward           20g            ║
║  Golden Touch I       + 5g            ║
║  Golden Touch II      +10g            ║
║  Herbalist's Wisdom   + 4g  (4%)      ║
║  ─────────────────────────────────    ║
║  TOTAL                 39g            ║
║                                       ║
║  Base XP               50 XP          ║
║  Scholar's Bonus I    +10 XP          ║
║  Stone Resonance      + 3 XP (6%)     ║
║  ─────────────────────────────────    ║
║  TOTAL                 63 XP          ║
║                                       ║
╚═══════════════════════════════════════╝
```

This makes every upgrade feel impactful and visible.

---

## Full Upgrade Tables

### 1. Gold & Economy

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| gold_add_1 | Golden Touch I | 150g | +5g per quest |
| gold_add_2 | Golden Touch II | 400g | +10g per quest |
| gold_add_3 | Golden Touch III | 800g | +20g per quest |
| haggle_add_1 | Haggler I | 200g | -5% shop prices |
| sell_add_1 | Vendor's Friend | 300g | +10% sell prices |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| gold_mult_1 | Merchant's Eye | 750g | +10% gold earned | gold_add_2 |
| gold_mult_2 | Fortune's Favor | 1500g | +25% gold earned | gold_mult_1 |
| gold_mult_3 | Golden Empire | 3000g | +50% gold earned | gold_mult_2 |
| haggle_mult_1 | Master Haggler | 1000g | -15% shop prices | haggle_add_1 |
| sell_mult_1 | Trade Baron | 2000g | +25% sell prices | sell_add_1 |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| gold_scale_herb | Herbalist's Wisdom | 500g | +1% gold per 25 herbs held |
| gold_scale_gem | Gem Hoarder | 800g | +2% gold per 10 gems held |
| gold_scale_total | Deep Pockets | 1000g | +1g per quest per 100 total resources |

---

### 2. XP & Learning

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| xp_add_1 | Scholar's Bonus I | 100g | +10 XP per quest |
| xp_add_2 | Scholar's Bonus II | 300g | +25 XP per quest |
| xp_add_3 | Scholar's Bonus III | 700g | +50 XP per quest |
| xp_perfect | Perfect Practice | 250g | +15 XP on perfect scores |
| xp_combo | Combo Learner | 200g | +2 XP per correct answer |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| xp_mult_1 | Quick Learner | 600g | +10% XP | xp_add_2 |
| xp_mult_2 | Enlightenment | 1500g | +25% XP | xp_mult_1 |
| xp_mult_3 | Mastery Ascension | 3000g | +50% XP | xp_mult_2 |
| xp_grammar | Grammar Focus | 800g | +20% XP from grammar quests | - |
| xp_vocab | Vocab Focus | 800g | +20% XP from vocabulary quests | - |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| xp_scale_stone | Stone Resonance | 500g | +1% XP per 50 stone held |
| xp_scale_crystal | Crystal Insight | 1000g | +2% XP per 25 crystals held |
| xp_scale_scroll | Scroll Collector | 750g | +1% XP per 10 scrolls held |

---

### 3. Gathering

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| gather_add_1 | Gatherer's Haul I | 150g | +1 resource per gather |
| gather_add_2 | Gatherer's Haul II | 400g | +2 resources per gather |
| gather_lucky | Lucky Find I | 300g | +5% chance for bonus resource |
| gather_rare | Keen Eye | 250g | +1 rare material per 10 gathers |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| gather_mult_1 | Efficient Harvest | 600g | +15% gathering yield | gather_add_1 |
| gather_mult_2 | Master Gatherer | 1200g | +30% gathering yield | gather_mult_1 |
| gather_mult_3 | Bountiful Harvest | 2500g | +50% gathering yield | gather_mult_2 |
| gather_speed | Swift Hands | 800g | +20% gathering speed | - |
| gather_rare_mult | Nature's Bounty | 1500g | 2x rare material chance | gather_rare |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| gather_scale_ore | Ore Affinity | 600g | +1% gather speed per 30 ore held |
| gather_scale_wood | Timber Mastery | 600g | +1% wood yield per 40 wood held |
| gather_scale_herb | Botanical Bond | 700g | +1% herb yield per 20 herbs held |

---

### 4. Crafting

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| craft_add_1 | Apprentice Crafter | 200g | -1 material cost (min 1) |
| craft_bulk | Bulk Basics | 350g | +1 item per craft (basic items) |
| craft_salvage | Salvage Novice | 300g | +1 material when salvaging |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| craft_eff_1 | Efficient Crafting | 750g | -10% material costs | craft_add_1 |
| craft_eff_2 | Master Efficiency | 1500g | -25% material costs | craft_eff_1 |
| craft_qual_1 | Quality Control | 1000g | +15% chance for higher quality | - |
| craft_qual_2 | Artisan's Touch | 2000g | +30% chance for higher quality | craft_qual_1 |
| craft_speed | Swift Crafting | 800g | -20% crafting time | - |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| craft_scale_ore | Smith's Stockpile | 800g | +1% craft quality per 50 ore held |
| craft_scale_fiber | Weaver's Cache | 800g | +1% cloth craft quality per 30 fiber held |
| craft_scale_herb | Alchemist's Reserve | 900g | +1% potion potency per 25 herbs held |

---

### 5. Combat & Survival

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| hp_add_1 | Vitality I | 150g | +10 max HP |
| hp_add_2 | Vitality II | 400g | +25 max HP |
| hp_add_3 | Vitality III | 800g | +50 max HP |
| def_add_1 | Thick Skin | 300g | -2 damage taken |
| combat_start | Battle Ready | 350g | +5 HP at combat start |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| hp_mult_1 | Resilience | 750g | +15% max HP | hp_add_2 |
| hp_mult_2 | Ironclad | 1500g | +30% max HP | hp_mult_1 |
| regen_mult | Regeneration | 1000g | +10% HP regen between fights | - |
| def_mult_1 | Damage Reduction | 1200g | -10% damage taken | def_add_1 |
| def_crit | Critical Defense | 1800g | -25% critical damage taken | - |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| hp_scale_wood | Timber Strength | 600g | +1 max HP per 20 wood held |
| def_scale_stone | Stone Fortitude | 700g | +1% damage reduction per 75 stone held |
| regen_scale_herb | Herbal Vitality | 600g | +1% HP regen per 30 herbs held |

---

### 6. Inventory & Storage

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| inv_add_1 | Bigger Pockets I | 200g | +5 inventory slots |
| inv_add_2 | Bigger Pockets II | 500g | +10 inventory slots |
| inv_add_3 | Bigger Pockets III | 1000g | +20 inventory slots |
| inv_material | Material Pouch | 300g | +10 slots (materials only) |
| gold_keep | Secure Wallet | 250g | Keep 10% gold on death |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| inv_mult_1 | Pack Mule | 1200g | +50% inventory capacity | inv_add_2 |
| inv_mult_2 | Weightless Bags | 2000g | +100% inventory capacity | inv_mult_1 |
| gold_keep_2 | Death's Reprieve | 800g | Keep 25% gold on death | gold_keep |
| gold_keep_3 | Soul Bind | 1500g | Keep 50% gold on death | gold_keep_2 |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| inv_scale_total | Hoarder's Blessing | 1000g | +1 inventory slot per 200 total resources held |

---

### 7. Language & Mastery

#### Tier 1: Additive
| ID | Name | Cost | Effect |
|----|------|------|--------|
| hint_add_1 | Memory Aid I | 200g | +1 hint per quiz |
| hint_add_2 | Memory Aid II | 500g | +2 hints per quiz |
| review_add | Review Bonus | 300g | +5 XP per word reviewed |
| mastery_gold | Mastery Milestone | 400g | +25g per word mastered |

#### Tier 2-3: Multiplicative
| ID | Name | Cost | Effect | Requires |
|----|------|------|--------|----------|
| retention_mult | Accelerated Learning | 1000g | +20% vocabulary retention | - |
| mastery_mult | Polyglot's Path | 2000g | +30% faster mastery progress | retention_mult |
| grammar_mult | Grammar Intuition | 1200g | +25% grammar XP | - |
| dialect_mult | Dialect Affinity | 1500g | +25% dialect unlock speed | - |

#### Tier 4: Resource-Scaling
| ID | Name | Cost | Effect |
|----|------|------|--------|
| xp_scale_scroll_lang | Scroll Wisdom | 800g | +1% XP per 15 scrolls held |
| mastery_scale_ink | Inkwell Knowledge | 900g | +1% mastery speed per 20 ink held |

---

### 8. Quality of Life

#### Flat Unlocks (One-Time Purchases)
| ID | Name | Cost | Effect |
|----|------|------|--------|
| qol_fast_travel | Waystones | 500g | Unlock fast travel between visited locations |
| qol_quest_track | Quest Compass | 300g | Quest objectives displayed on screen |
| qol_auto_loot | Auto-Loot | 400g | Automatically collect nearby drops |
| qol_bulk_sell | Bulk Sell | 350g | Sell all junk items with one click |
| qol_favorites | Favorites | 250g | Mark items as favorites (prevents accidental sell) |
| qol_tooltips | Extended Tooltips | 200g | Show detailed item statistics |
| qol_night | Night Vision | 600g | No penalties in dark/night areas |

---

### 9. Class-Specific Upgrades

#### Mage
| ID | Name | Cost | Effect |
|----|------|------|--------|
| mage_mana_1 | Arcane Reserves I | 300g | +10 max mana |
| mage_mana_2 | Arcane Reserves II | 700g | +25 max mana |
| mage_eff | Spell Efficiency | 600g | -10% mana costs |
| mage_dmg | Arcane Mastery | 1200g | +20% spell damage |

#### Warrior
| ID | Name | Cost | Effect |
|----|------|------|--------|
| war_hp_1 | Battle Hardened I | 300g | +15 max HP |
| war_hp_2 | Battle Hardened II | 700g | +35 max HP |
| war_armor | Armor Expertise | 600g | +15% armor effectiveness |
| war_dmg | Weapon Mastery | 1200g | +20% physical damage |

#### Rogue
| ID | Name | Cost | Effect |
|----|------|------|--------|
| rog_gather | Quick Fingers I | 300g | +10% gathering speed |
| rog_gather_2 | Quick Fingers II | 700g | +25% gathering speed |
| rog_crit | Lucky Streak | 600g | +10% critical chance |
| rog_combo | Shadow Mastery | 1200g | +20% bonus from combos |

#### Scholar
| ID | Name | Cost | Effect |
|----|------|------|--------|
| sch_xp_1 | Keen Mind I | 300g | +15 XP per quest |
| sch_xp_2 | Keen Mind II | 700g | +35 XP per quest |
| sch_xp_mult | Research Bonus | 600g | +15% XP from all sources |
| sch_retention | Academic Mastery | 1200g | +25% vocabulary retention |

---

## Resource-Scaling System

### How It Works

Resource-scaling upgrades provide bonuses based on materials currently held in inventory/storage.

```javascript
// Example calculation
playerResources = {
  stone: 200,
  herbs: 100,
  ore: 150,
  crystals: 50
};

// With Stone Resonance (+1% XP per 50 stone held)
stoneBonus = Math.floor(200 / 50) * 0.01; // = 4% XP

// With Herbalist's Wisdom (+1% gold per 25 herbs held)
herbBonus = Math.floor(100 / 25) * 0.01; // = 4% gold

// With Crystal Insight (+2% XP per 25 crystals held)
crystalBonus = Math.floor(50 / 25) * 0.02; // = 4% XP

// Total XP bonus from resource-scaling: 8%
// Total gold bonus from resource-scaling: 4%
```

### Strategic Implications

| Decision | Trade-off |
|----------|-----------|
| Use stone for crafting | Lose XP bonus from Stone Resonance |
| Sell herbs for gold | Lose gold% bonus from Herbalist's Wisdom |
| Hoard everything | Run out of inventory space |
| Focus on one resource | Miss bonuses from other scaling upgrades |

### UI Display

Show resource-scaling bonuses in character stats:

```
╔═══════════════════════════════════════╗
║       RESOURCE BONUSES                ║
╠═══════════════════════════════════════╣
║                                       ║
║  Stone Resonance                      ║
║  └─ 200 stone → +4% XP                ║
║                                       ║
║  Herbalist's Wisdom                   ║
║  └─ 100 herbs → +4% gold              ║
║                                       ║
║  Crystal Insight                      ║
║  └─ 50 crystals → +4% XP              ║
║                                       ║
║  ─────────────────────────────────    ║
║  TOTAL: +8% XP, +4% gold              ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## Economy Balancing

### Current Problem

| Issue | Impact |
|-------|--------|
| First upgrade costs 500g | Takes 2-5 hours to afford |
| Quests give 15-25g average | Slow accumulation |
| Multipliers are invisible | No "aha moment" |
| Inn costs 50g | Drains income |

### Proposed Solution

#### New Quest Rewards (Unchanged Base)
Keep base quest rewards the same, but additives make them feel larger.

#### New Upgrade Costs (Tier 1 Reduced)
| Old Cost Range | New Cost Range |
|----------------|----------------|
| 500-1000g | 100-300g |
| 1500-2000g | 400-800g |
| 2500-3000g | 1000-2000g |
| 3000+ | 2500-3500g |

#### Target Progression Timeline

| Milestone | Time Investment | Gold Earned | Upgrades Owned |
|-----------|-----------------|-------------|----------------|
| First upgrade | 15-30 min | ~150g | 1 |
| Tier 1 complete | 2-3 hours | ~1500g | 5-7 |
| Tier 2 started | 5-6 hours | ~3000g | 10-12 |
| Tier 2 complete | 10-15 hours | ~8000g | 18-22 |
| Tier 3 started | 15-20 hours | ~12000g | 25-30 |
| Tier 3 complete | 30-40 hours | ~25000g | 40-50 |
| Tier 4 optimization | 40+ hours | 30000g+ | 50+ |

---

## Mini-Game Concepts

### Rhythm & Timing

#### Syllable Beat
- **Mechanic:** Guitar Hero-style lanes
- **Language Tie-In:** Tap syllables in rhythm as French words scroll
- **Difficulty Scaling:** Speed increases, longer words
- **Rewards:** XP, gold, pronunciation mastery

#### Conjugation Flow
- **Mechanic:** Beat Saber timing windows
- **Language Tie-In:** Slice correct verb conjugations on beat
- **Difficulty Scaling:** More tenses, irregular verbs
- **Rewards:** Grammar XP, verb mastery

#### Pronunciation Pulse
- **Mechanic:** Rhythm matching patterns
- **Language Tie-In:** Match stress patterns of spoken words
- **Difficulty Scaling:** Longer phrases, subtle stress differences
- **Rewards:** Listening XP, pronunciation badges

---

### Deck Builders & Auto-Battlers

#### Word Warriors
- **Mechanic:** Slay the Spire-style deck building
- **Language Tie-In:** Build deck of vocabulary cards with synergies
- **Synergy Examples:**
  - Food words buff each other
  - Verb + noun combos deal bonus damage
  - Same gender words chain
- **Rewards:** Cards unlock as vocabulary learned

#### Grammar Legion
- **Mechanic:** Auto-battler (TFT/Super Auto Pets style)
- **Language Tie-In:** Place grammar units that auto-construct sentences
- **Unit Types:** Subjects, verbs, objects, adjectives, adverbs
- **Win Condition:** Form grammatically correct sentences faster than opponent
- **Rewards:** Grammar mastery, unit upgrades

#### Spell Duels
- **Mechanic:** Turn-based card combat
- **Language Tie-In:** Play noun + adjective combos for damage
- **Bonus System:** Correct gender agreement = critical hit
- **Rewards:** Vocabulary XP, card unlocks

---

### Merge & Combine

#### Syllable Merge
- **Mechanic:** 2048/Suika Game style
- **Language Tie-In:** Merge syllables into words, words into phrases
- **Progression:** "pa" + "pa" = "papa", "bon" + "jour" = "bonjour"
- **Challenge:** Board fills up if wrong merges
- **Rewards:** Vocabulary discovery, gold

#### Word Alchemy
- **Mechanic:** Doodle God style combining
- **Language Tie-In:** Combine root words to discover new vocabulary
- **Example:** "eau" (water) + "fall" concept = "cascade" (waterfall)
- **Rewards:** Etymology insights, vocabulary expansion

#### Prefix Factory
- **Mechanic:** Merge + light idle elements
- **Language Tie-In:** Attach prefixes/suffixes to base words
- **Example:** "re-" + "faire" = "refaire" (to redo)
- **Rewards:** Word family mastery, morphology XP

---

### Puzzle & Deduction

#### Mot Mystère (Word Mystery)
- **Mechanic:** Wordle clone
- **Language Tie-In:** Guess 5-letter French word
- **Feedback:** Green (correct), Yellow (wrong position), Gray (not in word)
- **Difficulty:** Daily word, varying word lengths
- **Rewards:** Streak bonuses, vocabulary XP

#### Connexions
- **Mechanic:** NYT Connections clone
- **Language Tie-In:** Group 16 French words into 4 categories
- **Categories:** Could be semantic (foods, colors) or grammatical (verb tenses, genders)
- **Rewards:** Categorization mastery, gold

#### Grammar Detective
- **Mechanic:** Logic/deduction puzzle
- **Language Tie-In:** Find grammatical errors in sentences
- **Difficulty:** More subtle errors, longer sentences
- **Rewards:** Grammar XP, detective badges

#### Etymology Trail
- **Mechanic:** Word archaeology/investigation
- **Language Tie-In:** Trace word origins through historical clues
- **Educational:** Learn Latin/Greek roots, word evolution
- **Rewards:** Deep vocabulary understanding, lore unlocks

---

### Spatial & Memory

#### Memory Palace
- **Mechanic:** Place items in 3D/2D room
- **Language Tie-In:** Associate vocabulary with spatial locations
- **Recall Test:** "What word was on the bookshelf?"
- **Rewards:** Retention bonuses, spatial mastery

#### Word Tetris
- **Mechanic:** Falling block puzzle
- **Language Tie-In:** Arrange letters/words to complete sentences
- **Clearing:** Complete sentences clear rows
- **Rewards:** Speed bonuses, grammar XP

#### Phrase Builder
- **Mechanic:** Pipe/flow connection puzzle
- **Language Tie-In:** Connect words in correct grammatical order
- **Challenge:** Multiple valid paths, bonus for efficiency
- **Rewards:** Sentence construction mastery

---

### Action & Reflex

#### Gender Snap
- **Mechanic:** Quick reaction game
- **Language Tie-In:** "Le" or "La"? Snap correct article before timer
- **Difficulty:** Faster timers, trick words
- **Rewards:** Gender mastery, reflex XP

#### Accent Hunter
- **Mechanic:** Whack-a-mole style
- **Language Tie-In:** Tap words with missing/wrong accents (é, è, ê, ë)
- **Difficulty:** More words, faster spawning
- **Rewards:** Accent mastery, gold

#### False Friend Dodge
- **Mechanic:** Endless runner/dodger
- **Language Tie-In:** Dodge faux amis (false cognates), collect true translations
- **Example:** Dodge "actuellement" when "actually" shown (means "currently")
- **Rewards:** False friend awareness, survival streaks

#### Verb Ninja
- **Mechanic:** Fruit Ninja style slicing
- **Language Tie-In:** Slash only correctly conjugated verbs
- **Penalty:** Slicing incorrect conjugation = damage
- **Rewards:** Conjugation speed, combo bonuses

---

### Roguelike & Procedural

#### Dungeon of Words
- **Mechanic:** Roguelike room-by-room
- **Language Tie-In:** Each room = vocabulary challenge
- **Permadeath:** Fail quiz = run ends
- **Meta-progression:** Unlock starting bonuses
- **Rewards:** High-risk high-reward XP, rare items

#### Infinite Grammar Tower
- **Mechanic:** Endless procedural floors
- **Language Tie-In:** Increasingly complex grammar puzzles
- **Scaling:** More tenses, longer sentences, obscure rules
- **Rewards:** Leaderboard position, bragging rights

#### Daily Lexicon
- **Mechanic:** Daily seeded challenge
- **Language Tie-In:** Same puzzle for all players that day
- **Social:** Compare scores, compete with friends
- **Rewards:** Daily streak, competitive badges

---

### Social & Competitive

#### Translation Race
- **Mechanic:** Real-time PvP
- **Language Tie-In:** First to correctly translate wins
- **Matchmaking:** By skill level/vocabulary size
- **Rewards:** Ranking, competitive XP

#### Word Chain Duel
- **Mechanic:** Hot potato word game
- **Language Tie-In:** Each player adds word, must grammatically fit
- **Example:** "Le chat" → "Le chat noir" → "Le chat noir mange"
- **Fail Condition:** Grammatical error or timeout
- **Rewards:** Chain length records, social XP

#### Guild Spelling Bee
- **Mechanic:** Async team competition
- **Language Tie-In:** Guild members contribute accuracy scores
- **Weekly:** Guilds compete for weekly ranking
- **Rewards:** Guild rewards, shared bonuses

---

### AI-Powered (Cutting Edge)

#### NPC Conversation
- **Mechanic:** LLM-driven dialogue
- **Language Tie-In:** Free-form French conversation with NPCs
- **Feedback:** Grammar correction, vocabulary suggestions
- **Rewards:** Conversation XP, NPC relationship

#### Story Co-Author
- **Mechanic:** AI collaborative writing
- **Language Tie-In:** Write story together in French
- **AI Role:** Responds in French, gentle corrections
- **Rewards:** Creative writing XP, story collectibles

#### Adaptive Quiz
- **Mechanic:** ML-powered difficulty scaling
- **Language Tie-In:** Questions adapt to player's weak areas
- **Smart:** Focuses on words you struggle with
- **Rewards:** Efficient learning, mastery tracking

#### Pronunciation Coach
- **Mechanic:** Speech recognition
- **Language Tie-In:** Real-time feedback on spoken French
- **Visual:** Waveform comparison, phoneme breakdown
- **Rewards:** Pronunciation badges, speaking confidence

---

### Idle & Incremental

#### Word Farm
- **Mechanic:** Idle growth simulation
- **Language Tie-In:** Plant vocabulary seeds, harvest when mastered
- **Passive:** Words grow while not playing (requires prior engagement)
- **Rewards:** Vocabulary growth, farming items

#### Translation Factory
- **Mechanic:** Factory automation game
- **Language Tie-In:** Build production lines that process sentences
- **Optimization:** Efficient grammar processing
- **Rewards:** Factory upgrades, gold income

---

### Hybrid Innovations

#### Roguelike Deck Builder
- **Mechanic:** Slay the Spire + vocabulary
- **Language Tie-In:** Build vocabulary deck during run
- **Risk:** Lose deck on fail, keep on success
- **Rewards:** Permanent card unlocks, run rewards

#### Auto-battler Merge
- **Mechanic:** TFT + 2048 hybrid
- **Language Tie-In:** Merge word units mid-combat for stronger sentences
- **Strategy:** Merge vs deploy decisions
- **Rewards:** Unit upgrades, combat mastery

#### Rhythm Roguelike
- **Mechanic:** Crypt of the Necrodancer style
- **Language Tie-In:** Move/answer on beat through vocabulary dungeon
- **Challenge:** Rhythm + language + roguelike
- **Rewards:** Ultimate mastery, rare loot

#### Puzzle Tower Defense
- **Mechanic:** TD with word building
- **Language Tie-In:** Build sentences as barriers against enemies
- **Strategy:** Longer sentences = stronger walls
- **Rewards:** Tower upgrades, defense mastery

---

## Implementation Priority

### Phase 1: Core Upgrades (High Priority)
1. Implement additive upgrade system
2. Create reward breakdown display
3. Add Tier 1 upgrades for Gold, XP, Gathering
4. Rebalance upgrade costs

### Phase 2: Expanded Upgrades (Medium Priority)
1. Add Tier 2-3 multiplicative upgrades
2. Implement resource-scaling system
3. Add class-specific upgrades
4. Add QoL unlocks

### Phase 3: Mini-Games (Prioritized)
| Priority | Game | Reason |
|----------|------|--------|
| High | Mot Mystère (Wordle) | Simple to implement, proven engagement |
| High | Gender Snap | Quick reflex, core learning |
| High | Connexions | Categorization, medium complexity |
| Medium | Word Tetris | Spatial + language |
| Medium | Verb Ninja | Action + conjugation |
| Medium | Grammar Detective | Deduction + grammar |
| Low | Deck Builders | Complex systems |
| Low | AI-Powered | Requires external APIs |
| Low | Social/PvP | Requires multiplayer infrastructure |

### Phase 4: Advanced Systems
1. Roguelike modes
2. Daily challenges
3. Leaderboards
4. Guild systems

---

## Appendix: Upgrade Summary

### Total Upgrades by Category
| Category | Count |
|----------|-------|
| Gold & Economy | 13 |
| XP & Learning | 13 |
| Gathering | 12 |
| Crafting | 11 |
| Combat & Survival | 13 |
| Inventory & Storage | 10 |
| Language & Mastery | 10 |
| Quality of Life | 7 |
| Class-Specific (×4 classes) | 16 |
| **TOTAL** | **105 upgrades** |

### Total Mini-Game Concepts
| Category | Count |
|----------|-------|
| Rhythm & Timing | 3 |
| Deck Builders & Auto-Battlers | 3 |
| Merge & Combine | 3 |
| Puzzle & Deduction | 4 |
| Spatial & Memory | 3 |
| Action & Reflex | 4 |
| Roguelike & Procedural | 3 |
| Social & Competitive | 3 |
| AI-Powered | 4 |
| Idle & Incremental | 2 |
| Hybrid Innovations | 4 |
| **TOTAL** | **36 mini-game concepts** |

---

*Document maintained by development team. All numbers subject to playtesting and balance adjustments.*
