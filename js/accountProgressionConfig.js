/**
 * ByteQuest Account Progression Configuration
 * DRAFT - All numbers subject to change for balancing
 *
 * Currency: Gold only (regular game gold)
 * Tier Unlocks: Achievement-based (TBD - placeholders for now)
 */

class AccountProgressionConfig {
  constructor() {
    this.version = '0.2-DRAFT';
    this.lastUpdated = '2025-12-07';
    this.notes = 'DRAFT - Gold currency, achievement unlocks TBD';
  }

  // ============================================
  // TIER UNLOCK REQUIREMENTS (TBD - Placeholders)
  // ============================================

  /**
   * Tier unlock thresholds - to be balanced later
   * These are placeholder values that can be adjusted
   */
  getTierRequirements() {
    return {
      1: null, // Always available
      2: {
        // Placeholder - define requirements later
        // Examples: questsCompleted, level, npcsmet, vocabMastered, etc.
        placeholder: true,
        description: 'TBD - Mid-game milestone'
      },
      3: {
        placeholder: true,
        description: 'TBD - Late-game milestone'
      }
    };
  }

  // ============================================
  // ALL UPGRADES
  // ============================================

  getAllUpgrades() {
    return [
      ...this.getLearningUpgrades(),
      ...this.getResourceUpgrades(),
      ...this.getGameplayUpgrades(),
      ...this.getLanguageUpgrades(),
      ...this.getQolUpgrades()
    ];
  }

  getUpgrade(upgradeId) {
    return this.getAllUpgrades().find(u => u.id === upgradeId);
  }

  // ============================================
  // LEARNING UPGRADES
  // ============================================

  getLearningUpgrades() {
    return [
      {
        id: 'xp_multiplier_1',
        name: 'Knowledge Seeker I',
        description: '+10% XP in all games',
        cost: { gold: 500 },
        effect: { xpMultiplier: 1.10 },
        category: 'learning',
        tier: 1,
        oneTime: true
      },
      {
        id: 'xp_multiplier_2',
        name: 'Knowledge Seeker II',
        description: '+20% XP in all games',
        requires: 'xp_multiplier_1',
        cost: { gold: 1500 },
        effect: { xpMultiplier: 1.20 },
        category: 'learning',
        tier: 2,
        oneTime: true
      },
      {
        id: 'xp_multiplier_3',
        name: 'Knowledge Seeker III',
        description: '+30% XP in all games',
        requires: 'xp_multiplier_2',
        cost: { gold: 3000 },
        effect: { xpMultiplier: 1.30 },
        category: 'learning',
        tier: 3,
        oneTime: true
      },
      {
        id: 'quest_xp_boost',
        name: 'Quest Mastery',
        description: '+25% XP from quests',
        cost: { gold: 2000 },
        effect: { questXpMultiplier: 1.25 },
        category: 'learning',
        tier: 2,
        stackable: true,
        maxStacks: 2
      }
    ];
  }

  // ============================================
  // RESOURCE UPGRADES
  // ============================================

  getResourceUpgrades() {
    return [
      {
        id: 'gold_multiplier_1',
        name: 'Golden Touch I',
        description: '+25% gold earned in all games',
        cost: { gold: 750 },
        effect: { goldMultiplier: 1.25 },
        category: 'resources',
        tier: 1,
        oneTime: true
      },
      {
        id: 'gold_multiplier_2',
        name: 'Golden Touch II',
        description: '+50% gold earned in all games',
        requires: 'gold_multiplier_1',
        cost: { gold: 2000 },
        effect: { goldMultiplier: 1.50 },
        category: 'resources',
        tier: 2,
        oneTime: true
      },
      {
        id: 'starting_gold',
        name: 'Inheritance',
        description: 'Start new games with 500 extra gold',
        cost: { gold: 1500 },
        effect: { startingGold: 500 },
        category: 'resources',
        tier: 2,
        oneTime: true
      },
      {
        id: 'double_loot_chance',
        name: 'Luck of the Draw',
        description: '10% chance to get double item drops',
        cost: { gold: 2500 },
        effect: { doubleLootChance: 0.10 },
        category: 'resources',
        tier: 2,
        stackable: true,
        maxStacks: 3
      }
    ];
  }

  // ============================================
  // GAMEPLAY UPGRADES
  // ============================================

  getGameplayUpgrades() {
    return [
      {
        id: 'starting_level_boost',
        name: 'Battle Hardened',
        description: 'Start new games at level 3 instead of 1',
        cost: { gold: 2000 },
        effect: { startingLevel: 3 },
        category: 'gameplay',
        tier: 2,
        oneTime: true
      },
      {
        id: 'max_health_boost_1',
        name: 'Vitality I',
        description: '+20 max HP in all games',
        cost: { gold: 500 },
        effect: { maxHealthBonus: 20 },
        category: 'gameplay',
        tier: 1,
        oneTime: true
      },
      {
        id: 'max_health_boost_2',
        name: 'Vitality II',
        description: '+50 max HP in all games',
        requires: 'max_health_boost_1',
        cost: { gold: 1500 },
        effect: { maxHealthBonus: 50 },
        category: 'gameplay',
        tier: 2,
        oneTime: true
      },
      {
        id: 'inventory_space',
        name: 'Bottomless Pack',
        description: '+10 inventory slots',
        cost: { gold: 1000 },
        effect: { inventorySlots: 10 },
        category: 'gameplay',
        tier: 1,
        stackable: true,
        maxStacks: 5
      }
    ];
  }

  // ============================================
  // LANGUAGE UPGRADES
  // ============================================

  getLanguageUpgrades() {
    return [
      {
        id: 'faster_dialect_unlock',
        name: 'Linguistic Prodigy',
        description: 'Unlock dialects 30% faster',
        cost: { gold: 3000 },
        effect: { dialectProgressMultiplier: 1.30 },
        category: 'language',
        tier: 3,
        stackable: true,
        maxStacks: 2
      },
      {
        id: 'dialect_bonus_xp',
        name: 'Accent Master',
        description: '+20% XP gain when learning dialects',
        cost: { gold: 2000 },
        effect: { dialectXpMultiplier: 1.20 },
        category: 'language',
        tier: 2,
        stackable: true,
        maxStacks: 2
      },
    ];
  }

  // ============================================
  // QUALITY OF LIFE UPGRADES
  // ============================================

  getQolUpgrades() {
    return [
      {
        id: 'fast_travel',
        name: 'Waystones',
        description: 'Unlock fast travel between locations',
        cost: { gold: 3000 },
        effect: { fastTravelUnlocked: true },
        category: 'qol',
        tier: 2,
        oneTime: true
      },
      {
        id: 'quest_tracker',
        name: 'Quest Compass',
        description: 'Quest objectives show on screen',
        cost: { gold: 1500 },
        effect: { questTrackerUnlocked: true },
        category: 'qol',
        tier: 1,
        oneTime: true
      },
      {
        id: 'auto_sell_junk',
        name: "Merchant's Bargain",
        description: 'Automatically sell junk items for gold',
        cost: { gold: 2000 },
        effect: { autoSellJunk: true },
        category: 'qol',
        tier: 2,
        oneTime: true
      }
    ];
  }

  // ============================================
  // DEFAULT EFFECTS TEMPLATE
  // ============================================

  getDefaultEffects() {
    return {
      xpMultiplier: 1.0,
      goldMultiplier: 1.0,
      questXpMultiplier: 1.0,
      maxHealthBonus: 0,
      inventorySlots: 0,
      startingLevel: 1,
      startingGold: 0,
      dialectProgressMultiplier: 1.0,
      dialectXpMultiplier: 1.0,
      doubleLootChance: 0,
      unlockedFeatures: []
    };
  }

  // ============================================
  // METADATA
  // ============================================

  getBalanceNotes() {
    return {
      version: this.version,
      lastUpdated: this.lastUpdated,
      notes: this.notes,
      totalUpgrades: this.getAllUpgrades().length,
      categories: {
        learning: this.getLearningUpgrades().length,
        resources: this.getResourceUpgrades().length,
        gameplay: this.getGameplayUpgrades().length,
        language: this.getLanguageUpgrades().length,
        qol: this.getQolUpgrades().length
      },
      tierRequirements: 'TBD - Achievement-based unlocks'
    };
  }
}

// Initialize and export
const accountProgressionConfig = new AccountProgressionConfig();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AccountProgressionConfig,
    accountProgressionConfig
  };
}
