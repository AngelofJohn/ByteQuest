# Dev Log #007 - Account Progression System

**Date:** December 7, 2025
**Version:** 0.4.1
**Session Type:** Feature Implementation

---

## What We Built

### Account Progression System (IdleOn-Inspired)

Added a permanent upgrade system that persists across all save files. Players earn account gold through gameplay and spend it on upgrades that apply to every playthrough.

**Core Concept:**
```
Regular saves: Start fresh each time
Account progression: Upgrades carry over forever

Save 1: Level 1 → 30 (with +10% XP bonus)
Save 2: Level 1 → 30 (with +10% XP bonus)
All saves benefit from account upgrades
```

---

## Files Created

| File | Lines | Purpose |
|------|-------|---------|
| accountProgression.js | ~300 | Core infrastructure (currency, purchasing, effects) |
| accountProgressionConfig.js | ~340 | All upgrade definitions and costs |
| gameIntegration.js | ~190 | Hooks for awarding gold and applying effects |
| accountProgressionUI.js | ~265 | Upgrade shop UI (temporary - will merge into shop) |

---

## Design Decisions

### Single Gold Currency
Originally drafted with 4 premium currencies (Celestial Stars, Heritage Tokens, etc.) and later a separate "account gold". **Simplified further** - permanent upgrades now cost regular game gold. No separate currencies at all.

- Upgrades persist across saves (stored in localStorage)
- Gold spent comes from current save file
- Players use the same gold for shops AND permanent upgrades

### Achievement-Based Tier Unlocks (TBD)
Upgrades are organized into tiers:
- **Tier 1:** Always available
- **Tier 2:** Unlocked by mid-game achievements (TBD)
- **Tier 3:** Unlocked by late-game achievements (TBD)

Requirements left as placeholders for future balancing.

### No Vocabulary Headstart
Originally included upgrades to start with pre-learned vocabulary. **Removed** to preserve the spaced repetition system's integrity. Learning should happen through gameplay, not be skipped.

### Integrated Into Existing Systems
Account upgrades won't have a standalone title screen shop. Instead:
- Sold through existing NPC shops
- Some NPCs offer one-time upgrade purchases
- Rewards exploration and NPC interaction

---

## Upgrades Defined (17 Total)

### Learning (4)
- Knowledge Seeker I/II/III (+10/20/30% XP)
- Quest Mastery (+25% quest XP)

### Resources (4)
- Golden Touch I/II (+25/50% gold)
- Inheritance (500 starting gold)
- Luck of the Draw (10% double loot)

### Gameplay (4)
- Battle Hardened (start at level 3)
- Vitality I/II (+20/50 max HP)
- Bottomless Pack (+10 inventory slots)

### Language (2)
- Linguistic Prodigy (+30% dialect unlock speed)
- Accent Master (+20% dialect XP)

### Quality of Life (3)
- Waystones (fast travel)
- Quest Compass (quest tracker on screen)
- Merchant's Bargain (auto-sell junk)

---

## Technical Notes

### Effect Types
```javascript
// Multiplicative (multiply when stacked)
xpMultiplier, goldMultiplier, questXpMultiplier

// Additive (add when stacked)
maxHealthBonus, inventorySlots, startingGold

// Boolean (feature unlocks)
fastTravelUnlocked, questTrackerUnlocked
```

### Storage
Uses localStorage with keys:
- `bytequest_account_id` - Unique account identifier
- `bytequest_account_upgrades` - [{ id, purchasedAt }, ...]

Gold is stored in the save file, not separately.

---

## Documentation Updates

### Merged Into SYSTEMS_DESIGN.md
Three separate account progression documents were merged into a single section in SYSTEMS_DESIGN.md:
- ACCOUNT_PROGRESSION_SYSTEM.md (deleted)
- ACCOUNT_PROGRESSION_DRAFT_INFRASTRUCTURE.md (deleted)
- ACCOUNT_PROGRESSION_INTEGRATION.md (deleted)

Now documented as Section 27 in SYSTEMS_DESIGN.md.

---

## What's Left

| Task | Status |
|------|--------|
| Integrate upgrades into shopSystem.js | Done |
| Map which NPCs sell which upgrades | Done |
| Balance gold costs (500-3000 range) | TBD |
| Define tier unlock requirements | TBD |

---

## Later This Session

### Shop Integration Complete
Account upgrades now sold through existing NPC shops:
- **Sage's Wisdom** (Sage Aldric): XP upgrades, dialect bonuses
- **Traveler's Blessings** (Merchant): Gold upgrades, loot bonuses
- **Elder's Legacy** (Urma): Health boosts, QoL features

Also added Marta's Bakery as a standard shop.

### Bug Fix
- **Bug #25 Fixed:** `friendly_face` achievement NPC list updated to include all 10 non-hidden Dawnmere NPCs (was only checking original 5)

### NPC Additions
Added 9 new NPCs across two locations:
- **Dawnmere (6):** Old Pieron (hidden tutor), Yris, Brother Varek, Tommen, Widow Senna, Old Jorel
- **Haari Fields (3):** Venn (bard), Rask (tracker), The Veiled One (hidden hermit)

### Documentation Consolidation
Merged STORY_SKELETON.md into WORLD_BIBLE.md (now v1.3). Added Ideas Backlog sections to PATCH_NOTES with expansion hooks and fractal patterns idea.

---

## Reflections

The original 4-currency design felt overwrought. Premium currencies work in games like IdleOn because they have years of content and complex economies. For ByteQuest, gold-only is cleaner.

Keeping vocabulary headstart upgrades would have undermined the core learning loop. Sometimes the best feature is the one you remove.

The tier unlock system being TBD is intentional - balance should come from playtesting, not guessing.

---

## Stats Snapshot

| Metric | Value |
|--------|-------|
| New JS Files | 4 |
| New Lines | ~1,100+ |
| Upgrades Defined | 17 |
| Documents Merged | 4 → 2 (account docs + STORY_SKELETON) |
| NPCs Added | 9 |
| Bugs Fixed | 1 (#25) |
| Shops Added | 4 (3 upgrade + 1 bakery) |

---

**Next Entry:** Playtesting or content expansion
