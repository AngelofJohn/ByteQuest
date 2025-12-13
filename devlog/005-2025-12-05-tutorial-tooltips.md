# Dev Log #005 - Tutorial & Tooltips

**Date:** December 5, 2025
**Version:** 0.3.5 → 0.4.0
**Session Type:** Polish & Completion (Backfilled)

---

## Phase 1 Finish Line

Today was about polish. Making the game teachable and discoverable. The tutorial system and enhanced tooltips turned a functional game into one that guides new players.

---

## Tutorial System (0.3.5)

### The Arrival Flow
First-time players now get guided through:

1. **Click on NPC** - Pulsing highlight on Elder Miriam
2. **Read Dialogue** - Tip explaining dialogue system
3. **Accept Quest** - Highlight on accept button
4. **Start Lesson** - Explanation of the lesson screen
5. **Answer Questions** - How multiple choice works
6. **Wrong Answer** - What happens when you lose HP
7. **Complete Lesson** - Rewards explanation
8. **Quest Panel** - Where to track progress

### Tutorial State Tracking
```javascript
GameState.tutorial = {
  enabled: true,
  completed: {
    clickedNPC: false,
    readDialogue: false,
    acceptedQuest: false,
    startedLesson: false,
    answeredQuestion: false,
    wrongAnswer: false,
    completedLesson: false,
    openedQuestPanel: false
  }
};
```

Each tutorial tip shows only once. Persists across saves.

### Visual Design
- **Pulse animation** - Draws attention to interactive elements
- **Tip popups** - Positioned near the relevant UI element
- **Semi-transparent overlay** - Focus without blocking
- **Dismiss on action** - Tips close when you do the thing

### The "Wrong Answer" Decision
Originally planned a popup for first wrong answer. Changed to a notification instead - less disruptive during the flow of a lesson.

---

## Enhanced Tooltips (0.4.0)

### Tooltips Everywhere
Added hover tooltips to:
- **Inventory items** - Name, description, stats
- **Equipment slots** - What's equipped and its effects
- **Quest rewards** - What you'll earn
- **Stats in Profile** - What each stat does
- **Resource items** - New section in inventory

### Dynamic Binding
Tooltips rebind after content changes:
```javascript
// After rendering inventory...
document.querySelectorAll('.inventory-slot[data-item]').forEach(slot => {
  TooltipSystem.bindItem(slot, slot.dataset.item);
});
```

This was crucial - static tooltips broke when inventory changed.

### Stat Tooltips
Hovering stats now shows:
- Current value and effect
- What the stat actually does
- Bonus from equipment

Example: "Wisdom: 12 → +24% XP from lessons"

---

## Phase 1 Complete

### The Checklist
All 62 Phase 1 features marked complete:
- Core game loop ✓
- Stats system (7 stats, all wired) ✓
- Grammar system ✓
- Spellbook ✓
- Settings (6 tabs) ✓
- Tooltips ✓
- Resource minigames (8 types) ✓
- Tutorial ✓
- Rewards screen ✓
- Map/travel ✓
- Shop ✓
- Reputation/titles ✓
- Save/load ✓

### What "Complete" Means
Phase 1 complete doesn't mean perfect. It means:
- All planned features exist
- Core loop is playable
- No blocking bugs (that we know of)
- Ready for playtesting

---

## Technical Debt Acknowledged

Things to clean up in Phase 2:
- `game.js` is 4,200 lines (too big)
- Some unused variables
- CSS organization
- Comments to remove/update

Not fixing now - ship it, test it, then clean.

---

## How It Felt

[Your memories]

- How did it feel to mark Phase 1 complete?
- Was the tutorial harder or easier than expected?
- Any last-minute bugs that almost derailed things?
- What's the first thing you want to fix/add in Phase 2?

---

## End of Entry

*Phase 1: Done. The foundation is laid. Now we find out if it's fun.*
