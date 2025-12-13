# Dev Log #012 - Balance & Systems Polish

**Date:** December 11, 2025
**Version:** 0.5.0
**Session Type:** Balance Tuning + Bug Fixes + Feature Implementation

---

## Summary

Major balance pass on HP system, fixed several quest-related bugs, implemented gather objectives, added boss exams to zones, and updated changelog.

---

## What We Built

### HP System Rebalance

The HP system felt meaningless - players had so much health that wrong answers didn't matter.

**Before:**
- Base HP: 100
- Per level: +10
- Per stamina: +5
- Level 10 player: ~190 HP
- Wrong answers: 10 damage (19 mistakes before death)

**After:**
- Base HP: 50
- Per level: +2
- Per stamina: +3
- Level 10 player: ~68 HP
- Wrong answers: 10 damage (5-7 mistakes before death)

Now wrong answers sting. Stamina investment becomes meaningful.

---

### Quest Marker Fix

**Bug:** All NPCs showed `❓` even when they had no quests ready to turn in.

**Fix:** Changed logic to only show `❓` when a quest has ALL objectives complete (ready for turn-in), not just any active quest.

Added `hasQuestReadyToTurnIn(npcId)` helper function.

---

### Gather Objectives System

**Problem:** The "Secrets of the Soil" quest had a gather objective (`type: "gather"`) but no system to track it.

**Solution:** Implemented `checkGatherObjectives()` function that:
- Scans all active quests for gather-type objectives
- Checks player inventory for required items
- Updates objective progress automatically
- Shows notification when objective completes

Hooked into:
- `addItemToInventory()` - regular item adds
- `addItemToInventorySilent()` - silent adds (minigame rewards)
- `itemManager.addItem()` - item system adds
- `acceptQuest()` - immediate check when quest accepted

---

### Boss Exams for All Zones

Added `hasBossExam: true` to both locations:
- Dawnmere
- Haari Fields

Updated map screen to show:
- Exam status indicator ("Available" or "Passed")
- "Take Exam" button when at a location with an exam

---

### Alchemy Feature Unlock

**Quest:** "Secrets of the Soil" from Dave in Haari Fields
- Prerequisites: `lyras_garden` complete, level 3
- Objectives: Gather 3 Meadow Leaves, complete 1 lesson
- Reward: Unlocks Alchemy nav button

**Implementation:**
- Added `unlockedFeatures` array to GameState
- Added `updateNavButtonVisibility()` function
- Alchemy button hidden by default with `data-feature="alchemy"`
- Quest completion adds "alchemy" to unlockedFeatures

---

### Lesson Tutorial

Added tutorial tip explaining that users must answer questions correctly to progress. Shows after lesson modal appears.

---

### Urma Shop Access Fix

**Bug:** Elder Urma's account upgrade shop wasn't accessible through dialog.

**Fix:** Added `npcHasAnyShop(npcId)` helper that checks both `npc.shop` property AND `shopManager.getShopsByNpc()`.

---

### Changelog Update

Updated CHANGELOG.md with 6 new versions (0.4.1 through 0.5.0) covering all work since December 5th.

---

## Technical Notes

### Files Modified

| File | Changes |
|------|---------|
| js/game.js | HP scaling, gather objectives, quest markers, feature unlocks, boss exam UI |
| js/statsSystem.js | HP calculation formula |
| js/itemSystem.js | Gather objective hook |
| data/gamedata.js | hasBossExam flags, secrets_of_the_soil quest |
| CHANGELOG.md | Full update through 0.5.0 |

### New Functions

```javascript
// Check gather objectives when items collected
checkGatherObjectives(itemId = null)

// Get item count from inventory
getItemCount(itemId)

// Check if NPC has any shop (direct or via shopManager)
npcHasAnyShop(npcId)

// Check if NPC has quest ready to turn in
hasQuestReadyToTurnIn(npcId)

// Update nav button visibility based on unlocked features
updateNavButtonVisibility()
```

---

## Balance Philosophy

The HP rebalance follows a key principle: **mechanics should matter**.

If players can make 15+ mistakes without consequence, why have HP at all? By reducing HP, every wrong answer creates tension. Players must:
- Pay attention to questions
- Use hints strategically
- Consider healing items
- Value Stamina stat investment

The game becomes harder but more meaningful.

---

## Session Stats

| Metric | Value |
|--------|-------|
| Bugs Fixed | 4 (quest markers, Urma shop, NPC disappearance, gather objectives) |
| Features Added | 3 (gather system, boss exams, feature unlocks) |
| Balance Changes | 1 (HP system) |
| Files Modified | 6 |
| New Functions | 5 |

---

## What's Next

1. **Playtest the gather quest** - Verify Secrets of the Soil works end-to-end
2. **Test boss exams** - Ensure both zones' exams function
3. **Continue bug fixes** - #30-35 still open
4. **Content expansion** - More quests, vocabulary

---

*"Make every mechanic matter. If it doesn't affect decisions, why is it there?"*
