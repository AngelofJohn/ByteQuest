# ByteQuest Patch Notes

**Last Updated:** December 7, 2025
**Version:** 0.4.0 (Phase 1 Complete)

This document tracks bugs, fixes, cleanup tasks, open questions, and ideas for ByteQuest development.

---

## Table of Contents

1. [Version History](#version-history)
2. [Bug Tracker](#bug-tracker)
3. [Cleanup Checklist](#cleanup-checklist)
4. [Open Questions](#open-questions)
5. [Ideas Backlog](#ideas-backlog)
6. [File Status](#file-status)

**Reference Documents:**
- [Testing Reference](#appendix-testing-reference)

---

## Version History

| Version | Date | Major Additions |
|---------|------|-----------------|
| 0.4.0 | Dec 5 | **PHASE 1 COMPLETE** - Tutorial system, tooltips enhanced |
| 0.3.5 | Dec 5 | Arrival tutorial system, stat/reward tooltips |
| 0.3.4 | Dec 4 | Gather screen, minigame modal fix |
| 0.3.3 | Dec 4 | Inventory tooltips, lesson exit, bug fixes |
| 0.3.2 | Dec 4 | Resource Minigames (8 types), Tier 1-3 vocabulary |
| 0.3.1 | Dec 4 | Settings screen, World Bible, Tutorial Design |
| 0.3.0 | Dec 3 | Rewards screen, shop fixes, spellbook |
| 0.2.0 | Nov 30 | Quest system, NPC interactions |
| 0.1.0 | Nov 28 | Initial game framework |

---

## Bug Tracker

### Open (Medium/Low Priority)

| Bug # | Severity | Description | Location |
|-------|----------|-------------|----------|
| 30 | Medium | `levelReached` hidden trigger not implemented in checkAppearCondition | npcs.js checkAppearCondition() |
| 31 | Medium | `corruption_spreads` quest referenced but not defined | gamedata.js:1516 chainNext |
| 32 | Medium | `harvest_time` quest referenced but not defined | gamedata.js:74 haari_fields quests |
| 33 | Medium | locationSystem.js has placeholder quest IDs | locationSystem.js:20 |
| 34 | Low | `traveler` class achievement but class doesn't exist | statsSystem.js:377 |
| 35 | Low | Missing null check in updateObjective | questSystem.js:405 |

### Fixed (28 total)

<details>
<summary><strong>Bug #1: System Initialization Errors</strong></summary>

**Location:** `js/game.js:2516` - initGame()
**Problem:** Systems were being initialized without checking if they exist, causing crashes if any script failed to load.

**Fix:**
- Added try-catch error handling around all system initialization
- Added `typeof` checks before initializing each manager
- Made all optional systems gracefully degrade if unavailable
- Added dependency checks (e.g., shopManager needs itemManager)
</details>

<details>
<summary><strong>Bug #2: NPC Dialog Not Showing</strong></summary>

**Location:** `js/game.js:741-770` - interactWithNPC()
**Problem:** Calling removed functions `getAvailableQuests()`, `acceptQuest()`, and `completeQuest()` that were deleted during cleanup.

**Fix:**
- Changed to `questManager.getAvailableQuests()`
- Changed to `handleAcceptQuest()`
- Changed to `handleCompleteQuest()`
</details>

<details>
<summary><strong>Bug #3: Lesson Interface Not Opening</strong></summary>

**Location:** `data/vocabulary.js`
**Problem:** Quests referenced vocabulary categories that didn't exist: `food.beginner`, `time.basic`

**Fix:**
- Added `food.beginner` category with 12 food-related words
- Added `time.basic` category with 10 time-related words
</details>

<details>
<summary><strong>Bug #4: Unused Variable Warnings</strong></summary>

**Location:** Various locations in game.js
**Problem:** IDE warnings about unused variables

**Fix:**
- Removed unused `statusInfo` variable (line 380)
- Removed unused `srResult` variable (line 1638)
- Removed unused `stats` variable (line 2059)
</details>

<details>
<summary><strong>Bug #5: Missing Script Loading</strong></summary>

**Location:** `index.html`
**Problem:** `spacedRepetition.js` was not being loaded

**Fix:**
- Added `<script src="js/spacedRepetition.js"></script>` to HTML
</details>

<details>
<summary><strong>Bug #6: Traveler's Cloak Duplication</strong></summary>

**Location:** `data/gamedata.js:958` - Scholar class startingItems
**Problem:** Traveler's cloak appeared twice - once in scholar class starting items and again as a reward from the meeting_family quest.

**Fix:**
- Removed "traveler_cloak" from scholar class startingItems array
- Kept it only as a unique quest reward from meeting_family quest
</details>

<details>
<summary><strong>Bug #7: Redundant Profile Button</strong></summary>

**Location:** `index.html:79-82` and `js/game.js:2586-2588`
**Problem:** Profile button in navigation sidebar was redundant when player avatar already exists in top-left.

**Fix:**
- Removed profile nav button from left sidebar in HTML
- Added click event listener to `.player-avatar` element
- Player avatar now opens profile screen when clicked
</details>

<details>
<summary><strong>Bug #8: Notification Stacking</strong></summary>

**Location:** `js/game.js:2490` - showNotification()
**Problem:** Multiple notifications appeared on top of each other at the same fixed position (top: 80px, right: 20px).

**Fix:**
- Created a notification container with flexbox layout
- Notifications now stack vertically with 8px gap
- Each notification appends to the container instead of fixed positioning
</details>

<details>
<summary><strong>Bug #9: Grammar Quests Not Working</strong></summary>

**Location:** `data/grammarQuests.js`, `js/game.js`, `index.html`
**Problem:** Grammar quests were defined but not integrated into the game.

**Fix:**
- Added `<script src="data/grammarQuests.js"></script>` to index.html
- Added Sage Aldric NPC to GAME_DATA.npcs
- Added `sage_aldric` to dawnmere location npcs array
- Added runtime merge of GRAMMAR_QUESTS, GRAMMAR_ITEMS into GAME_DATA
- Created `startGrammarLesson()` function with question generators
</details>

<details>
<summary><strong>Bug #10: Shop Purchase Not Working</strong></summary>

**Location:** `js/itemSystem.js:246` - getInventory()
**Problem:** When `player.inventory` was undefined/null, `getInventory()` returned a new empty array instead of the actual player inventory reference.

**Fix:**
- Changed `getInventory()` to initialize `player.inventory = []` if it doesn't exist
- Now returns the actual reference so `push()` operations persist
</details>

<details>
<summary><strong>Bug #11: Shop Item Missing Category</strong></summary>

**Location:** `js/itemSystem.js:291` - addItem()
**Problem:** Items in `gamedata.js` use `type: "consumable"` but `ItemManager.addItem()` expected a `category` field.

**Fix:**
- Added category derivation logic in `addItem()`:
  - `type: "consumable"` → `ItemCategory.CONSUMABLE`
  - `type: "helm/armor/weapon/accessory/ring"` → `ItemCategory.EQUIPMENT`
  - Default fallback to `CONSUMABLE`
</details>

<details>
<summary><strong>Bug #12: Shop Item ID Mismatch</strong></summary>

**Location:** `js/shopSystem.js:77`
**Problem:** Merchant shop referenced `standard_helm` but the item is defined as `basic_helm` in gamedata.js.

**Fix:**
- Changed shop inventory from `standard_helm` to `basic_helm`
</details>

<details>
<summary><strong>Bug #13: UI Cleanup - World Button</strong></summary>

**Location:** `index.html`
**Problem:** World button in sidebar was redundant (users return to game view by closing modals).

**Fix:**
- Removed World button from sidebar
- Moved Profile to top of sidebar navigation
- Added onclick to player avatar to open profile
</details>

<details>
<summary><strong>Bug #14: Undefined Quest Objective</strong></summary>

**Location:** `data/gamedata.js:259`
**Problem:** The objective `{ id: "help_bake", type: "task", target: 13 }` had no gameplay mechanic.

**Fix:**
- Removed the undefined "help_bake" task objective
- Quest now only has the "learn_food" lesson objective
- Updated dialogue to match single-objective flow
</details>

<details>
<summary><strong>Bug #15: Grammar Quest Category Mismatch</strong></summary>

**Location:** `data/grammarQuests.js`
**Problem:** Grammar quests used `category: "grammar"` but `QuestCategory` only defines `LESSON`.

**Fix:**
- Changed all grammar quests from `category: "grammar"` to `category: "lesson"`
</details>

<details>
<summary><strong>Bug #16: Settings Not Wired</strong></summary>

**Location:** `js/game.js`
**Problem:** Many settings existed in GameState but weren't actually used.

**Fix:**
- Wired `keyboardShortcuts` - 1-4 keys now select answers in lessons
- Wired `autoSave` - automatic saves respect the setting
- Wired `screenShake` - HP damage effect respects setting
- Wired `showHints` - "never" hides hints, "always" auto-shows
- Wired `hintAutoShow` - auto-reveals hints when available
- Wired `confirmActions` - shows confirm dialog before accepting quests
- Created `autoSave()` function for silent automatic saves
</details>

<details>
<summary><strong>Bug #17: Spellbook Not Working After Character Creation</strong></summary>

**Location:** `js/game.js` - GameState.player, `js/spellbookSystem.js` - show()
**Problem:** After creating a new character, clicking the Spellbook button did nothing.

**Fix:**
- Added `spellbook` property to default `GameState.player` object with `unlockedPages: ["pronouns"]`
- Added defensive check in `SpellbookManager.show()` to initialize spellbook if missing
</details>

<details>
<summary><strong>Bug #18: Quest Modal Not Displaying</strong></summary>

**Location:** `js/game.js` - showQuestsScreen()
**Problem:** Clicking the Quests button in sidebar showed nothing. The `showModal()` function was called with parameters in wrong order.

**Fix:**
- Changed from `showModal(content, 'quests-modal')` to `showModal('quests-modal', content)`
</details>

<details>
<summary><strong>Bug #19: UI Reorganization</strong></summary>

**Location:** `index.html`, `js/game.js`
**Problem:** Sidebar menu order was inconsistent, quest panel on right side was redundant.

**Fix:**
- Reordered sidebar: Profile, Spellbook, Inventory, Progress, Map, Quests
- Removed right sidebar quest panel entirely
- Created dedicated `showQuestsScreen()` modal function
- Added CSS for `.quests-screen` styling
</details>

<details>
<summary><strong>Bug #20: Quest Log Missing Close Button</strong></summary>

**Location:** `js/game.js` - showQuestsScreen()
**Problem:** Quest log modal had no way to close/exit.

**Fix:**
- Added close button to quest log modal
</details>

<details>
<summary><strong>Bug #21: Traveler's Cloak Still Duplicating</strong></summary>

**Location:** `data/gamedata.js:933` - Scholar class
**Problem:** Bug #6 fix was documented but never actually applied.

**Fix:**
- Changed Scholar starting item from `traveler_cloak` to `scholars_cap`
- Now each class has unique starting gear:
  - Scholar: `scholars_cap`
  - Warrior: `basic_helm`
  - Rogue: `health_potion`
</details>

<details>
<summary><strong>Bug #22: Grammar Lessons Ignoring Question Count</strong></summary>

**Location:** `js/game.js` - generateGrammarQuestions()
**Problem:** Grammar lessons used hardcoded question counts instead of respecting `GameState.settings.questionCount`.

**Fix:**
- Added `slice(0, questionCount)` after shuffling to limit grammar questions
</details>

<details>
<summary><strong>Bug #23: No Way to Exit Lessons</strong></summary>

**Location:** `index.html`, `js/game.js`, `css/style.css`
**Problem:** Once a lesson started, there was no way to exit/abandon it.

**Fix:**
- Added exit button (✕) to lesson modal header
- Created `confirmExitLesson()` function with confirmation dialog
- Shows current progress before abandoning
- Added CSS styling for `.lesson-exit-btn`
</details>

<details>
<summary><strong>Bug #24: Hidden Quest Trigger Typo</strong></summary>

**Location:** `js/questSystem.js:136` - checkHiddenTrigger()
**Problem:** Property name mismatch - uses `trigger.npcsmet` (lowercase) but checks against `trigger.npcsMet` (camelCase).

**Fix:** (Dec 7, 2025)
- Changed `trigger.npcsmet` to `trigger.npcsMet`
</details>

<details>
<summary><strong>Bug #25: Achievement NPC List Mismatch</strong></summary>

**Location:** `js/statsSystem.js:324-327` - friendly_face achievement
**Problem:** "friendly_face" achievement only checked original 5 NPCs but Dawnmere now has 10 non-hidden NPCs.

**Fix:** (Dec 8, 2025)
- Updated NPC list to include all 10 non-hidden Dawnmere NPCs
- Excludes old_pieron (hidden NPC)
</details>

<details>
<summary><strong>Bug #26: NPC ID Typo in locationSystem</strong></summary>

**Location:** `js/locationSystem.js:19`
**Problem:** Location definition used `'old_pierre'` but NPC is defined as `old_pieron`.

**Fix:** (Dec 8, 2025)
- Changed `'old_pierre'` to `'old_pieron'`
</details>

<details>
<summary><strong>Bug #27: Quest Giver NPC ID Undefined</strong></summary>

**Location:** `data/gamedata.js:475` - secret_student quest
**Problem:** Quest referenced `giver: "tutor"` but no NPC with that ID exists. Should be `old_pieron`.

**Fix:** (Dec 8, 2025)
- Changed giver to `"old_pieron"`
- Updated objective text from "Old Pierre" to "Old Pieron"
</details>

<details>
<summary><strong>Bug #28: order_of_dawn Faction Not Defined</strong></summary>

**Location:** `data/gamedata.js` - factions object
**Problem:** Brother Varek's quests grant reputation to `order_of_dawn` faction, but it wasn't defined.

**Fix:** (Dec 8, 2025)
- Added `order_of_dawn` faction with 5 ranks (Outsider → Blessed of the Light)
</details>

<details>
<summary><strong>Bug #29: horticulturists Faction Not Defined</strong></summary>

**Location:** `data/gamedata.js` - factions object
**Problem:** NPCs Dave and Lyra reference `horticulturists` faction, but it wasn't defined.

**Fix:** (Dec 8, 2025)
- Added `horticulturists` faction with 5 ranks (Uninitiated → Master Horticulturist)
</details>

---

## Cleanup Checklist

### Phase 1: COMPLETE

#### Script Integration
- [x] Add `grammar.js` to index.html script includes
- [x] Add `grammarQuests.js` to index.html script includes
- [x] Add `npcs.js` to index.html script includes
- [x] Add `spellbookSystem.js` to index.html script includes
- [x] Verify script load order is correct

#### NPC/Quest Integration
- [x] Create new NPC system with defaults and tags (npcs.js)
- [x] Add Sage Aldric NPC
- [x] Add NPC visibility system (appearsWhen/disappearsWhen)
- [x] Update renderNPCs to use visibility checks
- [x] Add grammar quests to Dawnmere location
- [x] Create `getQuest()` helper to look up quests from both sources

#### Grammar System
- [x] Create `startGrammarLesson()` function in game.js
- [x] Create `generateConjugationQuestions()` function
- [x] Create `generateFillInBlankQuestions()` function
- [x] Create `generateGenderMatchQuestions()` function
- [x] Handle `grammar_lesson` objective type in quest system
- [x] Update NPC interaction to handle grammar lessons

#### Stat Effects Wiring
- [x] Wire Vitality → max HP calculation
- [x] Wire Wisdom → XP bonus calculation
- [x] Wire Fortune → Gold bonus calculation
- [x] Wire Precision → auto-correct chance
- [x] Wire Agility → streak protection into streak break logic

#### Spellbook System
- [x] Create SpellbookManager class
- [x] Create Spellbook UI modal with two-panel layout
- [x] Track unlocked pages in player state
- [x] Display grammar reference tables (conjugations, articles, gender)
- [x] Wire spellbook unlocks into quest rewards
- [x] Add nav button to left sidebar
- [x] Add keyboard shortcut (S key)
- [x] Add CSS styles for spellbook

#### Settings System
- [x] Create comprehensive settings structure in GameState
- [x] Create tabbed settings screen (6 tabs)
- [x] Audio settings (volume sliders, mute toggle)
- [x] Display settings (text speed, font size, animations)
- [x] Gameplay settings (difficulty, hints, auto-save)
- [x] Learning settings (question count, hint mode, shortcuts)
- [x] Accessibility settings (high contrast, dyslexia font, color blind modes)
- [x] Data settings (export/import saves, reset/delete)
- [x] Settings persistence in localStorage
- [x] Apply settings on load (font size, contrast, etc.)
- [x] Add Settings button to sidebar
- [x] Add to navigation handler
- [x] CSS for settings UI
- [x] Wire keyboardShortcuts (1-4 keys for answers)
- [x] Wire autoSave (silent auto-save function)
- [x] Wire screenShake (HP damage effect)
- [x] Wire showHints (never/request/always)
- [x] Wire hintAutoShow (auto-reveal hints)
- [x] Wire confirmActions (quest accept confirmation)

#### Rewards Screen
- [x] Create showRewardsScreen() function
- [x] Animated reward items display
- [x] XP, Gold, Items, Reputation, Spellbook unlocks
- [x] Celebration effects and styling

#### Tooltips
- [x] TooltipSystem class created
- [x] Basic tooltip functionality working
- [x] Add tooltips to inventory items dynamically
- [x] Add tooltips to equipment slots in inventory modal
- [x] Add tooltips to quest rewards
- [x] Add tooltips to stats in Profile screen
- [x] Verify tooltip refresh after dynamic content

#### Profile/Progress Screens
- [x] Profile screen renders correctly
- [x] Progress screen tabs work (Milestones, Achievements, Reputation, Learning)
- [x] Stats display in Profile

#### Map Screen
- [x] Basic map screen implemented
- [x] Location connections displayed
- [x] Travel functionality working
- [x] Locked/unlocked location indicators

### Phase 2: Deferred

#### Code Cleanup (Low Priority)
- [ ] Remove "Phase 1: Skeleton with placeholder values" comments
- [ ] Remove "TBD after playtesting" comments or make them consistent
- [ ] Consolidate duplicate code patterns
- [ ] Add consistent error handling

#### Legal Documents (Pre-Launch)
> Legal documents contain placeholder text. Fill in before public release.
- [ ] Replace `[COMPANY NAME]` placeholders with actual company name
- [ ] Replace `[YOUR ADDRESS]` placeholders
- [ ] Replace `[YOUR EMAIL]` placeholders
- [ ] Replace `[YOUR JURISDICTION]` placeholders
- [ ] Review and finalize all legal text

#### CSS Cleanup (Low Priority)
- [ ] Review unused CSS classes
- [ ] Ensure consistent naming conventions
- [ ] Test responsive breakpoints

---

## Open Questions

### Answer Validation

| Question | Options | Status |
|----------|---------|--------|
| Virtual keyboard | Provide accent buttons? Always visible or toggle? | Pending |
| Capitalization | Same teach-then-strict progression? Or always lenient? | Pending |
| Multiple valid answers | Accept translation variants? (e.g., "hi"/"hello" for "salut") | Pending |

### Art Direction

| Question | Options | Status |
|----------|---------|--------|
| Art style | Classic pixel? Modern pixel? HD-2D? Hybrid? | Pending |
| Scene interaction model | Static backgrounds + hotspots? Tile-based movement? Hybrid? | Pending |
| Spellbook visual redesign | Keep current modal? Physical book aesthetic? Magical effects? | Pending |
| HUD redesign | Keep text sidebar? Icon-based bottom bar with golden frames? | Pending |
| Character representation | Emoji → Pixel art sprites? AI-generated portraits as intermediate? | Pending |
| Faction crests | Custom pixel art crests for each faction? Size/resolution? | Decided: Yes |
| Crest usage | Where shown? Reputation panel, items, NPC dialogue, banners, player profile? | Pending |
| Crest unlocks | Earn crest cosmetics at reputation milestones? Display on player card? | Pending |
| Asset packs | Which packs to evaluate from itch.io/GameDev Market? | Pending |
| Art budget | $0? $100-500? More? | Pending |
| Commissioned artist | Who to hire for sprites/key assets? | Pending |

### Resource & Crafting

| Question | Options | Status |
|----------|---------|--------|
| Gathering skill count | 5 gathering skills (Mining, Woodcutting, Hunting, Herbalism, Fishing). More/fewer? | Pending |
| Resource variety | 3 tiers per resource. Add more tiers? | Pending |
| Crafting UI | Separate screen per profession? Unified crafting UI? | Pending |
| Crafting professions | How many? Alchemy only? Add Smithing, Cooking, Leatherworking, Carpentry? | Pending |
| Smithing (Mining → Equipment) | Craft helmets, armor, weapons with stat bonuses? | Pending |
| Cooking (Fishing → Food) | Craft meals for HP recovery and temp stat buffs? | Pending |
| Leatherworking (Hunting → Light gear) | Craft cloaks, boots, bags, accessories? | Pending |
| Carpentry (Woodcutting → ???) | What does wood craft? Staves? Tools? Furniture? | Pending |
| Profession progression | Separate skill levels per profession? Or unified crafting level? | Pending |
| Recipe unlocks | Skill-based? Quest rewards? Shop purchases? Mix? | Pending |
| Cross-crafting | Allow resources from one profession in another? (e.g., wood handles for smithed weapons) | Pending |
| Cross-craft examples | Smithing needs wood (handles), Alchemy needs fish (oils), Cooking needs herbs (spices)? | Pending |
| Resource sink variety | Resources used for: crafting, upgrades, NPC gifts, quest turn-ins? All of these? | Pending |

### Endgame Resource Sinks

| Question | Options | Status |
|----------|---------|--------|
| Infinite scaling upgrades | IdleOn-style: spend 1000 iron for +0.1% XP, scales infinitely? | Pending |
| Scaling upgrade types | Which bonuses? XP%, Gold%, HP, Crit chance, Resource yield? | Pending |
| Scaling cost curve | Linear (1000 → 2000 → 3000)? Exponential (1000 → 2000 → 4000)? | Pending |
| Resource-to-gold conversion | NPC that buys excess resources for gold? | Pending |
| Prestige/reset system | Consume stockpiles for permanent multipliers on reset? | Pending |
| Cosmetic unlocks | Spend rare resources on titles, portraits, UI themes? | Pending |
| Resource donations | Faction reputation from donating resources? | Pending |
| Building/upgrades | Spend resources to upgrade buildings (faster crafting, better yields)? | Pending |

### Equipment & Armor

| Question | Options | Status |
|----------|---------|--------|
| Equipment variety | Currently 13 items total. Expand for Smithing? How many per slot? | Pending |
| Tier progression | No rarity tiers. Material-based tiers instead? (Bronze → Iron → Steel) | Pending |
| Armor slot | Only 1 armor piece exists. Add light/medium/heavy variants? | Pending |
| New equipment slots | Add boots, gloves, shields? Or keep current 5 slots? | Pending |
| Stat distribution | Current items give +1 to +2 stats. Scale higher for crafted gear? | Pending |
| Class restrictions | Some equipment class-locked? Or all usable by everyone? | Pending |
| Set bonuses | Equipment sets with matching bonuses? Or individual pieces only? | Pending |

### Quest Reward Items

| Question | Options | Status |
|----------|---------|--------|
| Filler quest reward philosophy | Pure lore items (no stats, flavor text)? Minor utility (small buffs)? Key items (unlock content)? Mix? | Pending |
| river_stone (Yris) | Decorative/lore? +luck near water? Crafting material? | Pending |
| shrine_blessing (Varek) | Consumable +XP buff? +rep with Order of Dawn? Permanent unlock? | Pending |
| mended_clothes (Senna) | Minor armor? Cosmetic? Just flavor? | Pending |
| jorels_flask (Jorel) | Consumable HP restore? Lore item? Dialogue unlock? | Pending |
| renque_medal (Jorel) | Key item for future quests? Dialogue unlocks? Sellable? | Pending |
| bards_token (Venn) | +XP on vocab lessons? Hint consumable? Cosmetic? | Pending |
| corrupted_sample (Rask) | Key item for corruption questline? Sell for gold? Alchemy ingredient? | Pending |
| veiled_insight (Veiled One) | Reveal hidden NPCs/quests? Lore unlock? Permanent buff? | Pending |

### Quest Design

| Question | Options | Status |
|----------|---------|--------|
| Timed quests | Include them? Some players find them stressful. | Pending |
| Choice consequences | How much do choices affect story/reputation? Reversible? | Pending |

### Technical

| Question | Options | Status |
|----------|---------|--------|
| IndexedDB | Switch from localStorage for larger saves? | Pending |
| Mobile support | Priority for responsive design? Native app later? | Pending |
| Audio system | Background music? Sound effects? Voice pronunciation? | Pending |

### Gameplay Balance

| Question | Options | Status |
|----------|---------|--------|
| HP penalty amount | Current: -10 HP per wrong answer. Too harsh? Too lenient? | Pending |
| XP curve | Current level table appropriate? Adjust for content length? | Pending |
| Gold economy | Prices balanced? Gold sinks sufficient? | Pending |
| Lesson length | 8 questions per lesson appropriate? Variable by difficulty? | Pending |
| Luck stat shop discount display | Show strikethrough original + discounted price? Just discounted? Tooltip explaining discount? | Pending |

### Player Classes

| Question | Options | Status |
|----------|---------|--------|
| Class design philosophy | RPG-style (stat differences)? Learning-style based? Cosmetic only? | Pending |
| Class bonuses | Currently claimed but not implemented. Implement as-is? Redesign? Remove? | Pending |
| Class names | Scholar/Warrior/Rogue feel combat-focused. Rename to fit learning theme? | Pending |
| Traveler vs Rogue | Docs say "Traveler", code has "Rogue" - which to keep? | Pending |
| Attack stat | Currently unused (no combat). Remove from classes? Repurpose? | Pending |
| Class-specific content | Unique quests/dialogue per class? Or purely mechanical difference? | Pending |

### Content

| Question | Options | Status |
|----------|---------|--------|
| Vocabulary scope | How many words per language before "complete"? | Pending |
| Grammar depth | How advanced? (A1 → C1 range?) | Pending |
| Story length | Hours of content per zone? Total game length target? | Pending |
| Second language | After French is complete, which language next? | Pending |

### Achievements

| Question | Options | Status |
|----------|---------|--------|
| Achievement rewards | Titles only? Or also XP/Gold/Items? | Pending |
| Display | Separate achievements screen? Integrated into profile? | Pending |
| Rarity tiers | Common/Rare/Epic/Legendary? Or flat list? | Pending |
| Hidden achievements | Show locked with "???"? Or completely hidden until earned? | Pending |
| Quantity | Target number? (25? 50? 100?) | Pending |
| Notifications | Pop-up when earned? Sound effect? | Pending |

### Content Pipeline

| Question | Options | Status |
|----------|---------|--------|
| Data entry method | Spreadsheets? Direct JSON? Admin panel? | Pending |
| Content contributors | Solo? Collaborators? Community submissions? | Pending |
| Validation priority | What errors matter most? (duplicates, typos, translations) | Pending |
| Build timeline | Now? Before beta? Before launch? | Pending |
| Native speaker review | Required? Nice to have? How to find reviewers? | Pending |

### Audio & Music

| Question | Options | Status |
|----------|---------|--------|
| Music style | Chiptune? Folk? Orchestral? Hybrid? | Pending |
| Pronunciation audio | Include French word audio? Defer? What technology? | Pending |
| Ambient sounds | Important? Or music only? | Pending |
| Asset source | Royalty-free? Commission? AI-generated? Hybrid? | Pending |
| Audio budget | $0? $100-500? More? | Pending |
| Audio priority | Phase 2? Phase 3? Post-launch? | Pending |

### Business & Monetization

| Question | Options | Status |
|----------|---------|--------|
| Monetization model | One-time purchase? Subscription? Freemium? | Pending |
| Target price | $15? $20? $25? | Pending |
| Primary platform | Steam? itch.io? Both? | Pending |
| Target audience | Age range? Prior French experience? Gaming experience? | Pending |
| Content scope for launch | How many locations? Vocabulary words? Grammar topics? | Pending |
| Definition of success | Break even? Side income? Full-time? | Pending |
| Target launch date | When? | Pending |
| Current spending | How much spent so far? | Pending |
| Art/music budget | $0? $100-500? More? | Pending |

### Social & Multiplayer

| Question | Options | Status |
|----------|---------|--------|
| Multiplayer/social features | Design doc says "no multiplayer" but has "friends list" - reconcile? | Pending |
| Community pages | Include? What form? | Pending |
| Leaderboards | Optional competitive element? Global vs friends? | Pending |

### Infrastructure & Platform

| Question | Options | Status |
|----------|---------|--------|
| Backend requirements | User authentication? Cloud save? Cross-device sync? | Pending |
| Platform targets | Web only? Mobile app? Desktop app? | Pending |
| Offline support | Full offline play? Sync when online? | Pending |

### Language & Localization

| Question | Options | Status |
|----------|---------|--------|
| Other languages beyond French | Timeline? Which languages next? | Pending |
| Dialect support | Design doc mentions minority dialects - which ones? When? | Pending |

### Course Design

| Question | Options | Status |
|----------|---------|--------|
| Grammar introduction pace | Current (slow) vs accelerated | Pending |
| Free input threshold | When to allow typing answers | Pending |
| Review session frequency | Daily? On demand? | Pending |
| Difficulty auto-adjustment | Static per zone or adaptive | Pending |
| Multi-language support | French only or expandable | Pending |
| Audio pronunciation | Add TTS? Record native? | Phase 4+ |

### Account Progression

| Question | Options | Status |
|----------|---------|--------|
| Tier 2 unlock requirements | Quests completed? Level reached? NPCs met? Vocabulary mastered? | Pending |
| Tier 3 unlock requirements | Story complete? Boss exams passed? Reputation ranks? | Pending |
| Upgrade cost range | Current: 500-5000 gold. Too cheap? Too expensive? | Pending |
| Resource costs for upgrades | Some upgrades cost resources instead of/alongside gold? | Pending |
| Resource-based upgrade examples | Vitality needs herbs, Inventory needs leather, XP boost needs essence? | Pending |
| NPC vendor distribution | All upgrades from one NPC? Spread across locations? Thematic grouping? | Pending |
| Standalone UI vs shop integration | Keep separate upgrade shop? Or integrate into existing shopSystem? | Pending |
| Upgrade visibility | Show locked upgrades? Or only show purchasable ones? | Pending |

### Tutorial & Onboarding

| Question | Options | Status |
|----------|---------|--------|
| Tutorial style | Forced walkthrough? Optional? Skippable? | Pending |
| Tutorial length | How many steps before "free play"? | Pending |
| Mechanics introduction | All at once? Gradually unlock systems? | Pending |
| Return player experience | Skip tutorial on subsequent saves? Remember preferences? | Pending |
| Help system | In-game help menu? Tooltips only? External wiki? | Pending |
| First quest design | Current "Meeting the Family" appropriate? Too simple? Too complex? | Pending |

### Save System

| Question | Options | Status |
|----------|---------|--------|
| Save slot count | Current: 3 slots. More? Unlimited? | Pending |
| Auto-save frequency | After each quest? After each lesson? On location change? | Pending |
| Save file size limits | localStorage has 5MB limit. Monitor size? Warn user? | Pending |
| Export/import format | JSON readable? Compressed? Encrypted? | Pending |
| Cloud save priority | Phase 2? Phase 3? Post-launch? Never? | Pending |
| Save corruption recovery | Backup saves? Rollback points? | Pending |

### Difficulty & Accessibility

| Question | Options | Status |
|----------|---------|--------|
| Difficulty modes | Easy/Normal/Hard? Or single balanced experience? | Pending |
| HP recovery options | Potions only? Rest at locations? Time-based regen? | Pending |
| Hint cost | Current: charges based on Insight stat. Free hints option? | Pending |
| Skip lesson option | Allow skipping with penalty? Or mandatory completion? | Pending |
| Colorblind modes | Which types to support? (Protanopia, Deuteranopia, Tritanopia) | Pending |
| Screen reader support | Priority level? Implementation approach? | Pending |
| Reduced motion option | Disable animations for vestibular disorders? | Pending |

### World & Lore

| Question | Options | Status |
|----------|---------|--------|
| Lore delivery | In-game books? NPC dialogue? Collectibles? Loading screens? | Pending |
| Map scope | How many total locations planned? | Pending |
| Faction depth | All factions equal content? Or some more developed? | Pending |
| Story tone | Lighthearted? Serious? Mix? | Pending |
| Player agency in story | Linear narrative? Branching paths? Multiple endings? | Pending |
| Time/calendar system | Day/night cycle? Seasons? Holidays? Or static world? | Pending |

### NPC & Dialogue

| Question | Options | Status |
|----------|---------|--------|
| Dialogue depth | Simple greetings? Or full conversation trees? | Pending |
| NPC schedules | Static locations? Or move around based on time/events? | Pending |
| Relationship system | Track individual NPC friendships? Or faction-only? | Pending |
| Gift giving | Allow giving items to NPCs? Effects on relationship? | Pending |
| NPC portraits | Emoji only? Art portraits? Animated? | Pending |
| Voice acting | Never? Key lines only? Full dialogue? | Pending |

### Minigame Design

| Question | Options | Status |
|----------|---------|--------|
| Minigame variety | 8 types currently. Add more? Which ones? | Pending |
| Minigame difficulty scaling | Static? Scale with player level? Adaptive? | Pending |
| Minigame rewards | Current resource drops balanced? Add rare drops? | Pending |
| Minigame vocabulary | Dedicated word lists per activity? Or shared pool? | Pending |
| Minigame unlock progression | All available from start? Or unlock gradually? | Pending |
| Minigame leaderboards | Per-minigame high scores? Rewards for records? | Pending |

### Economy & Shops

| Question | Options | Status |
|----------|---------|--------|
| Gold sinks | Enough ways to spend gold? Need more? | Pending |
| Item pricing curve | Linear with progression? Exponential? | Pending |
| Rare item availability | Shop rotation? Always available? Quest-only? | Pending |
| Haggling/bartering | Include negotiation mechanic? Or fixed prices? | Pending |
| Multiple currencies | Gold only? Or add special currencies for specific vendors? | Pending |
| Sellback ratio | Current: sell for less than buy. What percentage? | Pending |
| Faction vendors | WoW-style quartermasters? Unique items per faction requiring reputation? | Pending |
| Faction currency | Faction-specific tokens? Or gold + reputation requirement? | Pending |
| Reputation discounts | Higher rep = lower prices at faction vendors? Percentage per rank? | Pending |

### Testing & Quality

| Question | Options | Status |
|----------|---------|--------|
| Beta testing scope | Friends only? Open beta? Closed signups? | Pending |
| Bug reporting | In-game form? External tracker? Discord? | Pending |
| Analytics | Track user behavior? Privacy implications? | Pending |
| A/B testing | Test different balancing? Requires infrastructure | Pending |
| Playtest session length | Target 20-30 min? Longer? | Pending |
| Feedback collection method | Questionnaire? Interview? Both? | Pending |

### Legal & Compliance

| Question | Options | Status |
|----------|---------|--------|
| GDPR compliance | EU users - data handling, deletion requests | Pending |
| COPPA compliance | Under-13 users - parental consent, data limits | Pending |
| Age rating | Target ESRB/PEGI rating? | Pending |
| Terms of service | Current draft sufficient? Legal review needed? | Pending |
| Content licensing | All content original? Any licensed assets? | Pending |

### Marketing & Launch

| Question | Options | Status |
|----------|---------|--------|
| Launch announcement timing | How far in advance? | Pending |
| Demo availability | Free demo? What content included? | Pending |
| Press/influencer outreach | Which outlets? Which content creators? | Pending |
| Social media presence | Which platforms? Posting frequency? | Pending |
| Community building | Discord server? Forum? Subreddit? | Pending |
| Launch discount | Percentage? Duration? | Pending |
| Wishlist/mailing list | How to collect interested users pre-launch? | Pending |

#### Product Scope & Positioning (Decision Made - Dec 9)

**What ByteQuest Teaches:**
- ✅ Vocabulary fundamentals
- ✅ Basic grammar
- ✅ Sentence structure
- ✅ Confidence with French basics
- ✅ Reduced intimidation

**What ByteQuest Does NOT Promise:**
- ❌ Fluency
- ❌ Conversational ability
- ❌ Advanced proficiency

**Positioning Statement:**
> "Learn French fundamentals through an RPG story" — NOT "Become fluent through gaming"

**Competitive Edge:**
| vs. Competitor | ByteQuest Advantage |
|----------------|---------------------|
| Duolingo | More engaging (story, RPG mechanics) |
| "Play French games" | More structured (pedagogy built-in) |
| Fluency-promising apps | More honest (realistic scope) |
| Subscription apps | Better value (one-time purchase) |

**Core Loop (Complete):**
- ✅ Learn vocabulary through quests
- ✅ Practice grammar through lessons
- ✅ Review through Alchemy system
- ✅ RPG progression keeps it engaging
- ✅ Story provides context
- ✅ One-time purchase, no predatory tactics

**Action Item:** Make scope crystal clear to players ("teaches fundamentals, not fluency") so expectations are appropriate and players don't feel misled.

**Total Open Questions: 145**

---

## Ideas Backlog

Raw ideas that haven't been fully considered. Capture first, evaluate later.

### Gameplay Ideas
| Idea | Notes | Added |
|------|-------|-------|
| WoW-style quest tracker | Draggable/collapsible overlay showing active quest objectives in corner of screen | Dec 6 |
| Minigame tutorials | In-context tutorial popups for each gather minigame type explaining mechanics on first play | Dec 6 |
| Review sessions unlock lore | Completing review sessions earns "Research Points" that unlock hidden lore entries, NPC backstories, world secrets. Creates proactive reason to review. | Dec 7 |
| Review sessions earn reputation | Review completions grant small faction reputation bonuses. Balance carefully to not devalue normal reputation grind. | Dec 7 |

### UI/UX Ideas
| Idea | Notes | Added |
|------|-------|-------|
| | | |

### Content Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Filler Quests Design | **Decision made.** Character-first approach. Quest types: vocab reinforcement, world-building flavor, pacing/leveling gates, side character mini-arcs. Lengths: micro (1-2 steps, ~2min), short (3-5 steps, ~5-10min), mini-arcs (2-4 connected quests, ~20-30min). NPCs ready: Dawnmere (Yris, Brother Varek, Tommen, Widow Senna, Old Jorel), Haari Fields (Venn, Rask, The Veiled One), Special (Old Pieron). Philosophy: "Anti-Duolingo" means no meaningless repetition - filler quests build world, develop characters, make Elorath feel lived-in. | Dec 8 |
| Tiered Crafting by Zone | **Decision made.** Zone-based progression for gathering/crafting systems. **Dawnmere (Starter):** Gathering only - mining, herbalism, woodcutting, fishing. Uses existing 8 resource minigames. Sells raw materials to vendors. Simple, immediate rewards. **Haari Fields (Zone 2):** Crafting unlocks - smithing, alchemy, cooking. Uses materials from Dawnmere + Haari. Recipes, skill progression. Dave teaches basic smithing after harvest quest. **Later Zones:** Advanced crafting (enchanting, legendary recipes), specializations (master smith vs master alchemist), cross-profession synergies. **Benefits:** Reduces new player complexity, natural tutorial pacing, content pipeline matches dev work, zone identity (Dawnmere = gathering hub, Haari = crafting hub). | Dec 9 |

### Story/Narrative Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Fractal patterns in story | Self-similar patterns at different scales. Thematic: division (kingdom→city→church→families), truth vs propaganda at every level. Structural: nested betrayals (Hermeau→Dave→Pardu's friend). Character: Pardu mirrors Hermeau in reverse, player mirrors Layne. Visual: Lurenium patterns repeated elsewhere, Corruption as fractal growth. Narrative: NPCs tell smaller versions of kingdom's story through family histories. | Dec 7 |

### Expansion Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Second Continent | Where did the player come from? Return journey storyline. | Dec 7 |
| The Churches' Corruption | Are some clergy aware of Hermeau's dark magic? Internal church conflict. | Dec 7 |
| Ancient Lurenium | Who built it and why? Pre-civilization mystery. | Dec 7 |
| The Barriers | How does Light magic protect regions like Lurenium? Magic system expansion. | Dec 7 |
| Post-Hermeau | What happens after the main conflict resolves? Sequel/endgame content. | Dec 7 |
| Dave's Cult | Full Horticulturist storyline expansion. | Dec 7 |
| Corruption's Source | Deeper threat beyond Hermeau - what is the true origin? | Dec 7 |

### Playtesting Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Questionnaire expansion | Add questions based on dev vs playtester framework. **Playtester areas:** Does it feel good? (pacing, difficulty, reward satisfaction), Is it clear? (UI, tutorials, navigation), Emotional impact (story, characters, world-building), Balance (rewards, XP rates, costs). **Specific additions:** "Do side quests feel worthwhile or like filler?", "Does world feel populated/alive?", "Are rewards satisfying for effort?", "Which quests felt meaningful vs busywork?" | Dec 8 |

### Technical Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Vocabulary data normalization | Flat storage, query engine, ~33% size reduction. Implement when vocab exceeds ~200 words. | Dec 6 |
| Reverse word→quest index | Track which quests use each word for SRS scheduling and analytics | Dec 6 |
| Save file encryption | AES-256-GCM encryption. Implement when leaderboards/cloud saves added. | Dec 6 |
| Collect/Deliver quest objectives | New objective types for item gathering and delivery quests. Requires inventory integration, item spawning system, NPC delivery handlers. | Dec 7 |
| Timed quest system | Quest timer display, failure handling, time extension items. Festival_feast originally designed as timed. | Dec 7 |

### Relic System + Reading Comprehension (Design Discussion - Dec 9)

#### Core Concept

Relics are collectible items that tie into language practice through reading comprehension:

```
Find Relic → Read French Inscription → Answer Comprehension Questions → Unlock Lore/Reward
```

This creates a natural progression after vocabulary + grammar, testing understanding in context rather than isolated memorization. Builds real-world confidence and makes relics feel meaningful rather than pure collectible fluff.

#### Existing Relic References (from WORLD_BIBLE)

| Category | Source | Examples |
|----------|--------|----------|
| Royal Relics | Story rewards | Crown, Scepter, Royal Seal |
| Faction Pinnacles | Max reputation | Dawn Amulet, Guard Banner |
| Ancient Lurenium | Exploration | Builder artifacts, golden relics |
| Forged Legends | Crafting | Player-made unique gear |

Design note: 5-10 total relics keeps them feeling special. Named items with lore connections (King Dran's Crown, Layne's Exile Blade).

#### Difficulty Tiers (matching "fundamentals" scope)

| Tier | French Level | Example |
|------|--------------|---------|
| Common | Single sentences | "Le roi habite dans le château." |
| Uncommon | 2-3 sentences | Short description of a place or person |
| Rare | Short paragraph | A brief story or historical note |
| Legendary | Full passage | Lore entry with multiple details |

#### Text Length Recommendations

| Tier | Words | Sentences | Reading Time |
|------|-------|-----------|--------------|
| Common | 10-20 | 1-2 | ~10 sec |
| Uncommon | 25-40 | 3-4 | ~20 sec |
| Rare | 50-75 | 5-7 | ~45 sec |
| Legendary | 80-120 | 8-12 | ~90 sec |

**Why shorter texts:**
- Builds confidence (completable)
- Respects player time
- Quality over quantity
- Matches vocabulary they actually know
- Feels like a reward, not homework

#### Text Examples at Each Tier

**Common (15 words):**
> "Le chat noir dort sur la chaise. Il est très fatigué."

**Uncommon (35 words):**
> "Marie habite dans une petite maison près de la forêt. Chaque matin, elle marche jusqu'au village pour acheter du pain. Les villageois l'aiment beaucoup."

**Rare (60 words):**
> A short scene or lore snippet - maybe 2 small paragraphs

**Legendary (100 words):**
> A meaningful lore reveal - still under 1 minute of reading

#### Question Format: Multiple Choice

Multiple choice is the chosen format because:
- Accessible for beginners
- Clear feedback (right/wrong)
- Reduces frustration vs free-text input
- Can test comprehension without requiring production
- Matches existing lesson format

**Answer Structure:**
- 4 choices (like current lessons)
- 1 correct, 3 plausible distractors
- Distractors test common misreadings

#### Question Types

| Type | Tests | Example |
|------|-------|---------|
| Main Idea | Overall understanding | "What is this passage about?" |
| Detail | Specific information | "Where did the sage live?" |
| Vocabulary | Word meaning in context | "What does 'aidait' mean here?" |
| Inference | Reading between lines | "How did the villagers feel about the sage?" |
| Translation | Direct comprehension | "What does this say?" |
| True/False | Comprehension verification | "The sage lived near the river. True or false?" |

#### Example Flow

```
🏺 You found: Ancient Tablet

"Le vieux sage habitait près de la rivière.
Il aidait les voyageurs perdus."

Q1: Where did the sage live?
  A) Near the mountain
  B) Near the river ✓
  C) In the castle
  D) In the forest

Q2: What did he do?
  A) Helped lost travelers ✓
  B) Sold potions
  C) Guarded the king
  D) Taught children

→ Tablet Activated! Lore unlocked.
```

#### Scoring Ideas

- Pass threshold (e.g., 3/4 correct to "unlock" the relic)
- Or: Each correct answer charges the relic partially
- Perfect score = bonus reward?

#### Replay Value

- Once unlocked, relic lore is readable anytime
- Or: Relics can be "studied" again for XP/essence

#### Open Questions

1. Should the French text use only vocabulary the player has already learned?
2. Allow hints/word lookups during reading, or pure comprehension test?
3. How does this fit the relic "find" experience - exploration? Quest rewards? Both?
4. How many comprehension questions per relic? (2-4 feels right?)
5. Should wrong answers have consequences (HP loss like lessons, or just retry)?
6. Should this be a separate "Examine Relic" screen, or integrated into the lesson modal?
7. Should relics be permanent stat boosts, cosmetic, or unlock features?
8. One-time find, or ongoing engagement (charge/feed them)?
9. Tied to specific vocabulary sets, or general practice?

#### Alternative Ideas Considered (for reference)

1. **Relics as Mastery Rewards** - Earn relic fragments by mastering vocabulary categories. "Master all Greetings words → Relic of First Words". Encourages deep learning over rushing through content.

2. **Relics Require Translation to Unlock** - Find a relic → Must translate inscription to activate it. Higher tier relics = harder French passages. Combines exploration reward with language practice.

3. **Relics Power Up Through Practice** - Relic starts "dormant". Feed it with review sessions / correct answers to charge it. Creates ongoing reason to practice even after "completing" content.

4. **Relic + Alchemy Integration** - Combine Linguistic Essence (from reviews) with relic fragments. Creates crafting loop tied to language practice.

### Language Selection System (New - Dec 9)
| Item | Notes | Status |
|------|-------|--------|
| **Testing Checklist** | | |
| New game flow | Verify screen appears after name/class selection, before game start | Pending |
| French selection | Click French card, verify it highlights, Continue button enables | Pending |
| Locked languages | Spanish/German/Italian should not be selectable, show "Coming Soon" | Pending |
| Continue button | Should be disabled until a language is selected | Pending |
| GameState storage | Verify `GameState.player.language` is set to 'french' after selection | Pending |
| Save/Load | Verify language persists in saved games | Pending |
| Existing saves | Test loading saves created before this feature (should default to null/french) | Pending |
| **Known Issues** | | |
| No back button | Cannot return to character creation from language screen | Low |
| Keyboard nav | No keyboard support for language selection (mouse only) | Low |
| **Future Work** | | |
| Add more languages | Set `available: true` for new languages in `showLanguageSelection()` | When content ready |
| Language-specific vocabulary | Route to different vocabulary files based on selected language | Phase 3+ |
| UI localization | Separate from learning language - game interface translation | Phase 4+ |
| **Files** | | |
| js/game.js:4297-4349 | `showLanguageSelection()` function | Complete |
| js/game.js:13 | `GameState.player.language` field | Complete |
| css/style.css:1657-1721 | Language card styles | Complete |

### Account Progression System (Integrated - Dec 9)
| Item | Notes | Status |
|------|-------|--------|
| **Implementation Tasks** | | |
| Hook XP multipliers into rewards | `addXP()` and `addXPSilent()` apply multipliers from account upgrades | ✅ Complete |
| Hook gold multipliers into rewards | New `addGold()` and `addGoldSilent()` functions with multiplier support | ✅ Complete |
| Quest rewards integration | Quest gold rewards use `addGoldSilent()` for consistent multiplier application | ✅ Complete |
| Integrate into shop system | Account upgrades sold through existing shopSystem.js | ✅ Complete |
| Add NPC upgrade vendors | 3 vendors: Sage Aldric (learning), Merchant (resources), Urma (gameplay) | ✅ Complete |
| Shop UI for account upgrades | Full `renderAccountUpgradeShop()` with categories, owned status, prerequisites | ✅ Complete |
| **Balance Questions** | | |
| Gold costs per upgrade | Current: 500-5000 gold range. Need playtesting | TBD |
| Tier 2/3 unlock requirements | Currently placeholder - define achievement triggers | TBD |
| Stackable upgrade max stacks | Current values set, may need adjustment | TBD |
| Effect strength values | XP/gold multipliers, health bonuses, inventory slots | TBD |
| **Testing Checklist** | | |
| Buy upgrade from Sage Aldric | Test XP multiplier purchase and effect | Pending |
| Buy upgrade from Merchant | Test gold multiplier purchase and effect | Pending |
| Verify bonus notifications | Should show "+55 XP (50 + bonus)" when multiplier active | Pending |
| Quest rewards with multiplier | Complete quest, verify gold shows bonus amount | Pending |
| Lesson XP with multiplier | Complete lesson, verify XP shows bonus amount | Pending |
| **Playtesting Required** | | |
| Full system playtest | Verify multipliers work correctly and balance gold costs | Pending |
| **Files** | | |
| js/accountProgression.js | Core infrastructure | Complete |
| js/accountProgressionConfig.js | Upgrade definitions (17 upgrades, 5 categories) | Complete |
| js/gameIntegration.js | Game hooks and debug helpers | Complete |
| js/shopSystem.js:121-194 | 3 NPC upgrade shop definitions | Complete |
| js/game.js:887-925 | addGold/addGoldSilent functions | Complete |
| js/game.js:1113-1137 | addXP with multiplier | Complete |

### Monetization Ideas
| Idea | Notes | Added |
|------|-------|-------|
| Accept cryptocurrency payments | Use Coinbase Commerce or BitPay (~1% fee). Simple integration, no blockchain dev needed. | Dec 7 |

### Expansion System Architecture (Pending Decision)
| Model | Technical Implications | Notes | Added |
|-------|------------------------|-------|-------|
| Free-to-Play with Progression | Simple content gating via boss exams/levels. No ownership tracking needed. Revenue from cosmetics/boosters. | Simplest implementation - works with existing LocationManager and BossExamManager. | Dec 9 |
| Paid Expansions / DLC | Needs ownership flags, purchase validation, possibly server-side checks. Expansion bundles and sales support. | Requires account system and payment integration. | Dec 9 |
| Subscription Model | All content unlocked while subscribed. Needs account system, payment integration, subscription status checks. | Continuous content updates expected by subscribers. | Dec 9 |
| Hybrid (Freemium) | Base zone(s) free, later zones paid. Or free with ads, paid removes ads + unlocks. Mix of above systems. | Most flexible but most complex to implement. | Dec 9 |

**Architecture Options Considered:**
- **Zone-Based**: Each zone as self-contained expansion file. Aligns with existing location/boss exam systems. Natural for educational progression (vocab/grammar per zone).
- **Content Module**: Modular packs with manifests and dependencies. Better for user-generated content or complex DLC. More infrastructure needed.
- **Phase/Chapter**: Story-driven chapters gating content. Similar to zone-based but more narrative focus.

**Decision:** Pending - architecture depends on chosen financial/monetization model.

### Social/Community Ideas
| Idea | Notes | Added |
|------|-------|-------|
| | | |

> **How to use:** Dump ideas here without overthinking. When ready to seriously consider, move to Open Questions or ROADMAP.md.

---

## File Status

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| **HTML** |
| index.html | ~235 | Complete | Settings button added |
| **CSS** |
| css/style.css | 3,787 | Complete | Settings + Minigame styles |
| **Data Files** |
| data/vocabulary.js | 210 | Complete | |
| data/gamedata.js | 909 | Complete | |
| data/grammar.js | 886 | Complete | |
| data/grammarQuests.js | 462 | Complete | |
| data/npcs.js | 453 | Complete | |
| **JS Systems** |
| js/game.js | 4,200 | Complete | Settings system added |
| js/statsSystem.js | 840 | Complete | |
| js/spellbookSystem.js | 712 | Complete | |
| js/questSystem.js | 815 | Complete | |
| js/itemSystem.js | 706 | Complete | |
| js/reputationSystem.js | 542 | Complete | |
| js/spacedRepetition.js | 495 | Complete | |
| js/tooltipSystem.js | 447 | Complete | |
| js/bossExamSystem.js | 442 | Complete | |
| js/shopSystem.js | 429 | Complete | |
| js/locationSystem.js | 428 | Complete | |
| js/titleSystem.js | 416 | Complete | |
| js/hintSystem.js | 298 | Complete | |
| js/resourceMinigames.js | 1,450 | Complete | Tier 1-3 minigames |
| js/alchemySystem.js | ~700 | Complete | Crafting system |
| js/accountProgression.js | ~300 | Draft | Account upgrades core |
| js/accountProgressionConfig.js | ~340 | Draft | Upgrade definitions |
| js/gameIntegration.js | ~190 | Draft | Game event hooks |
| js/accountProgressionUI.js | ~265 | Draft | Upgrade shop UI |
| **Legal** |
| legal/*.md | 5 files | Needs Updates | Placeholder text |

---

## Progress Summary

| Category | Complete | Total | % |
|----------|----------|-------|---|
| High Priority | 51 | 51 | 100% |
| Medium Priority | 11 | 11 | 100% |
| Bugs Fixed | 24 | 25 | 96% |
| Deferred | 0 | 13 | Phase 2 |
| Testing | 0 | 38 | Phase 2 |
| **Phase 1 Features** | **62** | **62** | **100%** |

---

## Testing Notes

- `questionCount` is set to 3 in `js/game.js:113` for testing
- TODO: Change back to 5 for launch

---

## Changelog

| Date | Changes |
|------|---------|
| Dec 8, 2025 | Fixed Bugs #26-29 (NPC typos, missing factions). Added 2 new factions: order_of_dawn, horticulturists |
| Dec 8, 2025 | Added filler quest design decisions, playtesting questionnaire ideas to Ideas Backlog |
| Dec 8, 2025 | Fixed Bug #25 (friendly_face achievement NPC list - added 5 new Dawnmere NPCs) |
| Dec 7, 2025 | Consolidated BUG_REPORT + CLEANUP_CHECKLIST + OPEN_QUESTIONS into PATCH_NOTES |
| Dec 6, 2025 | Fixed Bug #24 (npcsmet typo), documented Bug #25 |
| Dec 4, 2025 | Bug fixes: notification stacking, shop/inventory, grammar questions, lesson exit |
| Dec 4, 2025 | Added Resource Minigames (8 types), version 0.3.2 |
| Dec 4, 2025 | Settings wiring complete, README/ROADMAP complete |
| Dec 3, 2025 | All high priority items complete, spellbook tasks |
| Nov 30, 2025 | Initial checklist created |

---

*When a question is resolved, document the decision in SYSTEMS_DESIGN.md and mark as Done here.*

---

# Appendix: Testing Reference

> **Note:** This section is a reference for manual testing, not a task list. Use during QA passes.

## Core Flow

| Test | Expected Result |
|------|-----------------|
| New game → Character creation → Start game | Player appears in Dawnmere |
| Talk to NPC → Accept quest → Complete quest | Quest rewards granted |
| Vocabulary lesson → Answer questions → Gain XP | XP bar increases |
| Wrong answer → Lose HP → HP reaches 0 | Game over / recovery flow |
| Level up | Stats increase, notification shown |
| Save/Load game | State preserved correctly |

## Stats Effects

| Stat | Effect | How to Test |
|------|--------|-------------|
| Stamina | +5 Max HP per point | Check max HP in profile |
| Strength | Reduces damage taken | Take wrong answer, check damage |
| Agility | Streak protection at 5+ | Miss once, check if streak breaks |
| Insight | +0.5 hint charges | Check hints available in lesson |
| Luck | 2% damage avoidance, shop discount | Multiple tests needed |
| Devotion | +5% reputation gain | Complete quest, check rep gained |
| Knowledge | 10% mastery decay prevention | Miss mastered word, check if decays |

## Grammar System

| Test | Expected Result |
|------|-----------------|
| Sage Aldric visibility | Appears after "meeting_family" quest |
| Grammar quest acceptance | Quest added to active quests |
| Conjugation questions | Verb forms displayed correctly |
| Fill-in-blank questions | Sentence with blank, options shown |
| Gender match questions | Noun with le/la options |
| Quest completion | Spellbook pages unlock |

## Spellbook

| Test | Expected Result |
|------|-----------------|
| Nav button | Opens spellbook modal |
| S key | Opens spellbook modal |
| X button / Escape | Closes modal |
| Pronouns page | Always accessible |
| Locked pages | Show lock icon and unlock hint |
| Conjugation tables | Render correctly formatted |

## Settings Screen

| Test | Expected Result |
|------|-----------------|
| All 6 tabs | Render without errors |
| Sliders | Update values in real-time |
| Toggles | Switch on/off |
| Settings persistence | Preserved after reload |
| Export save | Downloads JSON file |
| Import save | Loads state correctly |
| Reset progress | Clears with confirmation |

## UI Screens

| Screen | What to Check |
|--------|---------------|
| Profile | Stats, equipment, level display |
| Progress | All tabs render (Milestones, Achievements, Reputation, Learning) |
| Inventory | Items display, equip/use works |
| Quest panel | Updates on accept/complete |
| Tooltips | Appear on hover |
| Map | Locations shown, travel works |
| Titles | Display and equip work |
