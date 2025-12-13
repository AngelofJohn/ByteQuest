# Dev Log #013 - Artifact System

**Date:** December 11, 2025
**Version:** 0.5.1
**Session Type:** Major Feature Implementation

---

## Summary

Built a complete artifact collection system that reveals the true history of Verandum. Players find hidden artifacts that contradict the "official" lore pages, creating a dual-narrative experience where propaganda and truth coexist.

---

## Design Philosophy

The lore pages present the **official history** - propaganda that the current regime wants people to believe. Artifacts are **primary sources** - letters, journals, documents that reveal what actually happened.

This creates:
- Cognitive tension for the player
- A reason to explore and complete quests
- A meta-narrative about truth vs official records
- Meaningful collectibles tied to story

---

## What We Built

### Artifact Data Structure

26 artifacts across 8 historical eras:

| Era | Artifacts | Theme |
|-----|-----------|-------|
| The Ancients | 2 | The seal, warnings |
| The Silence | 2 | Lost civilization |
| The Founding | 3 | Kingdom's true purpose |
| The Faith | 3 | Church schism, hidden teachings |
| The Golden Age | 3 | Royal secrets |
| King Dran's Reign | 4 | Hermeau's ambition, family conflict |
| The War | 5 | The truth about the corruption |
| The Exile | 4 | Resistance, Layne's survival |

Each artifact has:
- Name, description, icon
- `loreText` - the truth it reveals (displayed as quoted text)
- `discoveryMethod` - how the player finds it
- `hint` - clue for locked artifacts

---

### Discovery Methods

**Quest Rewards (6 artifacts)**
- Added `artifactUnlock` to quest reward data
- Processed in `completeQuest()` alongside other rewards

**Reputation Thresholds (5 artifacts)**
- Created `checkReputationArtifacts(factionId, currentRep)`
- Called whenever reputation changes
- Auto-unlocks artifacts when threshold reached

**Location Hotspots (15 artifacts)**
- Sparkle icons (✨) appear in game scene
- Click to investigate → modal with description
- "Search" button → discovery narrative
- "Take It" → artifact unlocked

---

### Hotspot Implementation

Added `hotspots` array to location data:

```javascript
hotspots: [
  {
    id: "shrine_alcove",
    name: "Dusty Alcove",
    description: "A small alcove behind the shrine's altar...",
    searchText: "You carefully reach in and find something wrapped in old cloth...",
    artifactId: "faith_forbidden_text",
    requiredRep: { faction: "order_of_dawn", amount: 100 }
  }
]
```

**Dawnmere (3 hotspots):**
- Dusty Alcove → faith_forbidden_text (requires rep)
- Weathered Bookshelf → exile_rewritten_history
- River Debris → dran_hermeau_journal

**Haari Fields (3 hotspots):**
- Overgrown Battlefield → war_soldiers_letter
- Abandoned Merchant Cart → golden_trade_manifest
- Standing Stones → silence_bone_carving

---

### Spellbook UI

New "Artifacts" tab in spellbook showing:
- Each era as a clickable entry
- Progress counter (e.g., "2/5")
- Locked eras show "???" until first artifact found
- Era completion banner when all artifacts collected

Artifact detail view:
- Grid of artifact cards
- Selected artifact shows full description
- Lore quote styled with gold border

---

### Achievements

10 new achievements in `statsSystem.js`:

| Achievement | Trigger | Reward |
|-------------|---------|--------|
| Truth Seeker | First artifact | +1 Insight |
| Ancient Historian | Complete Ancients | +2 Knowledge, "Historian" title |
| Silence Breaker | Complete Silence | +2 Insight |
| Founding Scholar | Complete Founding | +2 Knowledge |
| Keeper of Faith | Complete Faith | +2 Devotion |
| Golden Archivist | Complete Golden Age | +2 Luck |
| Dran's Legacy | Complete King Dran | +2 Insight, "Rememberer" title |
| War Chronicler | Complete War | +2 Stamina, "Chronicler" title |
| Exile's Ally | Complete Exile | +2 Agility, "Layne's Friend" title |
| Master Historian | All 26 artifacts | +5 Knowledge, +5 Insight, "Master Historian" title |

---

### Lore Page Quest Unlocks

Also implemented lore page unlocks (separate from artifacts):

| Quest | Lore Page |
|-------|-----------|
| winter_solstice | The Founding |
| river_whispers | The Silence |
| lights_below | The Ancients |
| tending_the_flame | The Faith |
| doubt_and_faith | The Golden Age |
| memories_of_renque | King Dran's Reign |
| what_stalks_the_fields | The Exile |
| shadows_of_light | The War |

---

## Technical Notes

### Files Modified

| File | Changes |
|------|---------|
| data/gamedata.js | 26 artifacts, hotspot data for 2 locations, artifactUnlock on quests |
| js/spellbookSystem.js | Artifact tab, ARTIFACT_ERAS, unlockArtifact(), showArtifactEra() |
| js/game.js | renderHotspots(), hotspot interaction functions, checkReputationArtifacts() |
| js/statsSystem.js | 10 new artifact achievements |
| css/style.css | Hotspot sprites, artifact UI, modal styles |
| CHANGELOG.md | v0.5.1 entry |

### New Functions

```javascript
// Spellbook System
unlockArtifact(artifactId)
isArtifactUnlocked(artifactId)
getArtifactsForEra(eraId)
isEraComplete(eraId)
showArtifactEra(eraId)
showArtifactDetail(artifactId)

// Game.js
renderHotspots(location)
interactWithHotspot(hotspotId)
showHotspotModal(hotspot)
searchHotspot(hotspotId)
claimHotspotArtifact(hotspotId)
checkReputationArtifacts(factionId, currentRep)
```

### Player State Additions

```javascript
GameState.player.spellbook.unlockedArtifacts = []  // Array of artifact IDs
GameState.player.searchedHotspots = []  // Array of hotspot IDs
```

---

## The Narrative Design

The artifact system tells a story through primary sources:

**The Official Story (Lore Pages):**
- External enemies attacked Verandum
- King Dran died heroically
- Hermeau saved the kingdom
- Layne fled like a coward
- The corruption came from outside

**The Truth (Artifacts):**
- The kingdom was built to guard an ancient seal
- Hermeau found forbidden knowledge
- Hermeau murdered his father
- Hermeau deliberately broke the seal
- The corruption is Hermeau's weapon
- Layne was exiled for refusing to participate
- Layne is alive and leading a resistance

Players who only read lore pages get propaganda. Players who find artifacts learn the truth.

---

## What's Next

1. **Lurenium Zone** - Third zone needs to be built with remaining 9 hotspot artifacts
2. **Playtest artifact flow** - Verify hotspots work correctly
3. **Consider artifact hints** - Maybe show hints for undiscovered artifacts somewhere?
4. **Balance reputation requirements** - Are they achievable?

---

## Session Stats

| Metric | Value |
|--------|-------|
| Artifacts Created | 26 |
| Hotspots Created | 6 |
| Achievements Added | 10 |
| Discovery Methods | 3 (quest, rep, hotspot) |
| New Functions | 12 |
| Files Modified | 6 |

---

*"History is written by the victors. The truth is found by those who search."*
