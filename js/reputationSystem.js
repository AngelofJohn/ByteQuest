// ByteQuest - Reputation System
// Phase 1: Infrastructure skeleton

// =====================================================
// Constants
// =====================================================

const FactionType = {
  MAJOR: 'major',
  MINOR: 'minor'
};

// Universal rank thresholds
const MAJOR_FACTION_RANKS = [
  { rank: 0, reputation: 0, name: 'Stranger' },
  { rank: 1, reputation: 200, name: 'Recognized' },
  { rank: 2, reputation: 400, name: 'Friendly' },
  { rank: 3, reputation: 600, name: 'Honored' },
  { rank: 4, reputation: 800, name: 'Revered' },
  { rank: 5, reputation: 1000, name: 'Exalted' }
];

const MINOR_FACTION_RANKS = [
  { rank: 0, reputation: 0, name: 'Stranger' },
  { rank: 1, reputation: 200, name: 'Recognized' },
  { rank: 2, reputation: 400, name: 'Friendly' },
  { rank: 3, reputation: 600, name: 'Ally' }
];

// =====================================================
// Faction Definitions
// =====================================================

const FACTION_DEFINITIONS = {
  // ===================================================
  // Major Factions
  // ===================================================
  
  old_guard: {
    id: 'old_guard',
    name: 'The Old Guard',
    type: FactionType.MAJOR,
    description: 'The original army that protected the world before Hermeau\'s rise. They fight for tradition and resist the new regime.',
    icon: '⚔️',
    color: '#7a8b99',
    locations: ['throughout', 'hidden'],
    themes: ['loyalty', 'tradition', 'resistance'],
    unlocks: {
      // Rank: [unlocks] - to be filled in later phases
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  },
  
  loyalists: {
    id: 'loyalists',
    name: 'The Loyalists',
    type: FactionType.MAJOR,
    description: 'Supporters of King Hermeau\'s new regime. They believe in the stability and order he provides.',
    icon: '👑',
    color: '#c9a227',
    locations: ['cities', 'dranmere'],
    themes: ['order', 'stability', 'propaganda'],
    unlocks: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  },
  
  church_of_light: {
    id: 'church_of_light',
    name: 'The Church of Light',
    type: FactionType.MAJOR,
    description: 'The religious institution worshipping the divine light. They maintain cathedrals across the land, hiding secrets of their own.',
    icon: '✨',
    color: '#f4e99b',
    locations: ['cathedrals', 'towns', 'lurenium'],
    themes: ['faith', 'purity', 'secrets'],
    unlocks: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  },
  
  miners_guild: {
    id: 'miners_guild',
    name: 'Miners Guild',
    type: FactionType.MAJOR,
    description: 'Forgotten workers who craft weapons and armor. They struggle for recognition in the new order.',
    icon: '⛏️',
    color: '#8b7355',
    locations: ['mines', 'settlements'],
    themes: ['labor', 'craftsmanship', 'independence'],
    unlocks: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  },
  
  horticulturists: {
    id: 'horticulturists',
    name: 'The Horticulturists',
    type: FactionType.MAJOR,
    description: 'Herbalists and farmers who tend the land. Beneath their peaceful exterior lies a hidden agenda.',
    icon: '🌿',
    color: '#6b8e23',
    locations: ['farmlands', 'haari_fields', 'dawnmere'],
    themes: ['nature', 'sustenance', 'hidden agenda'],
    unlocks: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  },
  
  // ===================================================
  // Minor Factions
  // ===================================================
  
  dawnmere_settlers: {
    id: 'dawnmere_settlers',
    name: 'Dawnmere Settlers',
    type: FactionType.MINOR,
    description: 'The frontier townspeople of Dawnmere, seeking prosperity and a fresh start.',
    icon: '🏘️',
    color: '#a0785a',
    locations: ['dawnmere'],
    themes: ['community', 'new beginnings'],
    unlocks: {
      1: [],
      2: [],
      3: []
    }
  },
  
  fredrois_fishers: {
    id: 'fredrois_fishers',
    name: 'Fredrois Fishers',
    type: FactionType.MINOR,
    description: 'A fishing village along the coast, living simple lives tied to the sea.',
    icon: '🐟',
    color: '#4a90a4',
    locations: ['fredrois'],
    themes: ['trade', 'simplicity'],
    unlocks: {
      1: [],
      2: [],
      3: []
    }
  },
  
  runecarvers: {
    id: 'runecarvers',
    name: 'The Runecarvers',
    type: FactionType.MINOR,
    description: 'Scattered scholars who study ancient relics and forgotten knowledge.',
    icon: '🔮',
    color: '#9b59b6',
    locations: ['scattered'],
    themes: ['knowledge', 'mystery'],
    unlocks: {
      1: [],
      2: [],
      3: []
    }
  },
  
  merchant_coalition: {
    id: 'merchant_coalition',
    name: 'Merchant Coalition',
    type: FactionType.MINOR,
    description: 'Traders and shopkeepers who remain neutral in political conflicts, focused on commerce.',
    icon: '💼',
    color: '#d4a574',
    locations: ['trade_routes', 'cities', 'ingregaard'],
    themes: ['commerce', 'neutrality'],
    unlocks: {
      1: [],
      2: [],
      3: []
    }
  }
};

// =====================================================
// Reputation Manager Class
// =====================================================

class ReputationManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeReputation();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeReputation() {
    if (!this.state.player.reputation) {
      this.state.player.reputation = {};
    }

    // Initialize discovered factions tracker
    if (!this.state.player.discoveredFactions) {
      this.state.player.discoveredFactions = [];
    }

    // Only initialize reputation for discovered factions
    // Factions must be discovered before earning reputation
    for (const factionId of this.state.player.discoveredFactions) {
      if (this.state.player.reputation[factionId] === undefined) {
        this.state.player.reputation[factionId] = 0;
      }
    }
  }

  // ===================================================
  // Faction Discovery
  // ===================================================

  /**
   * Check if a faction has been discovered
   */
  isFactionDiscovered(factionId) {
    return this.state.player.discoveredFactions?.includes(factionId) || false;
  }

  /**
   * Discover a faction (first contact)
   * Called when player first interacts with faction members
   */
  discoverFaction(factionId) {
    if (!FACTION_DEFINITIONS[factionId]) {
      console.warn(`Unknown faction: ${factionId}`);
      return null;
    }

    if (this.isFactionDiscovered(factionId)) {
      return null; // Already discovered
    }

    // Add to discovered list
    if (!this.state.player.discoveredFactions) {
      this.state.player.discoveredFactions = [];
    }
    this.state.player.discoveredFactions.push(factionId);

    // Initialize reputation at 0
    this.state.player.reputation[factionId] = 0;

    const faction = FACTION_DEFINITIONS[factionId];
    console.log(`[REPUTATION] Discovered faction: ${faction.name}`);

    return {
      factionId,
      faction,
      message: `You have discovered ${faction.name}!`
    };
  }

  /**
   * Get all discovered factions
   */
  getDiscoveredFactions() {
    return this.state.player.discoveredFactions || [];
  }

  /**
   * Get count of discovered factions
   */
  getDiscoveredFactionCount() {
    return this.getDiscoveredFactions().length;
  }

  // ===================================================
  // Reputation Getters
  // ===================================================

  /**
   * Get current reputation value for a faction
   */
  getReputation(factionId) {
    return this.state.player.reputation[factionId] || 0;
  }

  /**
   * Get the rank thresholds for a faction based on its type
   */
  getRankThresholds(factionId) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) return MINOR_FACTION_RANKS;
    
    return faction.type === FactionType.MAJOR 
      ? MAJOR_FACTION_RANKS 
      : MINOR_FACTION_RANKS;
  }

  /**
   * Get current rank for a faction
   */
  getRank(factionId) {
    const reputation = this.getReputation(factionId);
    const thresholds = this.getRankThresholds(factionId);
    
    let currentRank = thresholds[0];
    for (const threshold of thresholds) {
      if (reputation >= threshold.reputation) {
        currentRank = threshold;
      } else {
        break;
      }
    }
    
    return currentRank;
  }

  /**
   * Get next rank for a faction (or null if maxed)
   */
  getNextRank(factionId) {
    const reputation = this.getReputation(factionId);
    const thresholds = this.getRankThresholds(factionId);
    
    for (const threshold of thresholds) {
      if (reputation < threshold.reputation) {
        return threshold;
      }
    }
    
    return null; // Already at max rank
  }

  /**
   * Get max rank for a faction
   */
  getMaxRank(factionId) {
    const thresholds = this.getRankThresholds(factionId);
    return thresholds[thresholds.length - 1];
  }

  /**
   * Check if faction is at max rank
   */
  isMaxRank(factionId) {
    return this.getNextRank(factionId) === null;
  }

  /**
   * Get progress to next rank (0-100%)
   */
  getProgressToNextRank(factionId) {
    const reputation = this.getReputation(factionId);
    const currentRank = this.getRank(factionId);
    const nextRank = this.getNextRank(factionId);
    
    if (!nextRank) return 100; // Maxed
    
    const currentThreshold = currentRank.reputation;
    const nextThreshold = nextRank.reputation;
    const range = nextThreshold - currentThreshold;
    const progress = reputation - currentThreshold;
    
    return Math.floor((progress / range) * 100);
  }

  /**
   * Get full status for a faction (only if discovered)
   */
  getFactionStatus(factionId) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) return null;

    // Only return status for discovered factions
    if (!this.isFactionDiscovered(factionId)) {
      return null;
    }

    const reputation = this.getReputation(factionId);
    const currentRank = this.getRank(factionId);
    const nextRank = this.getNextRank(factionId);
    const progress = this.getProgressToNextRank(factionId);

    return {
      faction,
      reputation,
      currentRank,
      nextRank,
      progress,
      isMaxed: nextRank === null
    };
  }

  /**
   * Get all discovered faction statuses
   */
  getAllFactionStatuses() {
    return this.getDiscoveredFactions()
      .map(id => this.getFactionStatus(id))
      .filter(s => s !== null);
  }

  /**
   * Get major faction statuses only (discovered)
   */
  getMajorFactionStatuses() {
    return this.getAllFactionStatuses().filter(s => s.faction.type === FactionType.MAJOR);
  }

  /**
   * Get minor faction statuses only (discovered)
   */
  getMinorFactionStatuses() {
    return this.getAllFactionStatuses().filter(s => s.faction.type === FactionType.MINOR);
  }

  /**
   * Get all factions (for displaying undiscovered as "???")
   */
  getAllFactionsWithDiscoveryStatus() {
    return Object.keys(FACTION_DEFINITIONS).map(id => {
      const faction = FACTION_DEFINITIONS[id];
      const discovered = this.isFactionDiscovered(id);

      if (discovered) {
        return {
          ...this.getFactionStatus(id),
          discovered: true
        };
      } else {
        return {
          faction: {
            id,
            name: '???',
            icon: '❓',
            type: faction.type
          },
          discovered: false
        };
      }
    });
  }

  // ===================================================
  // Reputation Modification
  // ===================================================

  /**
   * Add reputation to a faction
   * Returns info about rank changes
   */
  addReputation(factionId, amount) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) {
      console.warn(`Unknown faction: ${factionId}`);
      return null;
    }

    // Must discover faction before earning reputation
    if (!this.isFactionDiscovered(factionId)) {
      console.warn(`Cannot add reputation: faction ${factionId} not yet discovered`);
      return null;
    }

    // Apply Devotion bonus (if statsManager exists globally)
    let finalAmount = amount;
    if (typeof statsManager !== 'undefined' && statsManager) {
      const multiplier = statsManager.calculateReputationMultiplier();
      finalAmount = Math.floor(amount * multiplier);
    }

    const previousRank = this.getRank(factionId);
    const previousRep = this.getReputation(factionId);

    // Check if this is the first reputation gain (for tutorial)
    const isFirstGain = typeof shouldShowTutorial === 'function' &&
                        shouldShowTutorial('gainedReputation') &&
                        amount > 0;

    // Add reputation (no negative, no cap beyond max rank threshold)
    const maxRep = this.getMaxRank(factionId).reputation;
    const newRep = Math.min(maxRep, Math.max(0, previousRep + finalAmount));
    this.state.player.reputation[factionId] = newRep;

    const newRank = this.getRank(factionId);
    const rankChanged = newRank.rank !== previousRank.rank;

    const result = {
      factionId,
      factionName: faction.name,
      previousRep,
      newRep,
      change: newRep - previousRep,
      previousRank,
      newRank,
      rankChanged,
      rankIncreased: newRank.rank > previousRank.rank,
      isMaxed: this.isMaxRank(factionId),
      devotionBonus: finalAmount > amount ? finalAmount - amount : 0
    };

    // Show reputation tutorial on first gain
    if (isFirstGain && typeof showReputationTutorial === 'function') {
      showReputationTutorial(result);
    }

    return result;
  }

  /**
   * Set reputation to a specific value
   */
  setReputation(factionId, amount) {
    const currentRep = this.getReputation(factionId);
    const difference = amount - currentRep;
    return this.addReputation(factionId, difference);
  }

  // ===================================================
  // Unlock Checking
  // ===================================================

  /**
   * Check if a specific unlock is available
   */
  hasUnlock(factionId, unlockId) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) return false;
    
    const currentRank = this.getRank(factionId).rank;
    
    // Check all ranks up to current
    for (let rank = 1; rank <= currentRank; rank++) {
      const unlocks = faction.unlocks[rank] || [];
      if (unlocks.includes(unlockId)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get all unlocks available for a faction at current rank
   */
  getAvailableUnlocks(factionId) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) return [];
    
    const currentRank = this.getRank(factionId).rank;
    const unlocks = [];
    
    for (let rank = 1; rank <= currentRank; rank++) {
      const rankUnlocks = faction.unlocks[rank] || [];
      unlocks.push(...rankUnlocks.map(u => ({ unlock: u, rank })));
    }
    
    return unlocks;
  }

  /**
   * Get unlocks for the next rank (preview)
   */
  getNextRankUnlocks(factionId) {
    const faction = FACTION_DEFINITIONS[factionId];
    if (!faction) return [];
    
    const nextRank = this.getNextRank(factionId);
    if (!nextRank) return []; // Already maxed
    
    return faction.unlocks[nextRank.rank] || [];
  }

  // ===================================================
  // Utility
  // ===================================================

  /**
   * Get factions present at a location
   */
  getFactionsAtLocation(locationId) {
    return Object.values(FACTION_DEFINITIONS).filter(
      faction => faction.locations.includes(locationId)
    );
  }

  /**
   * Check if player has met reputation requirement
   */
  meetsReputationRequirement(factionId, requiredRank) {
    const currentRank = this.getRank(factionId);
    return currentRank.rank >= requiredRank;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Get faction definition by ID
 */
function getFactionDefinition(factionId) {
  return FACTION_DEFINITIONS[factionId];
}

/**
 * Get all major factions
 */
function getMajorFactions() {
  return Object.values(FACTION_DEFINITIONS).filter(f => f.type === FactionType.MAJOR);
}

/**
 * Get all minor factions
 */
function getMinorFactions() {
  return Object.values(FACTION_DEFINITIONS).filter(f => f.type === FactionType.MINOR);
}

/**
 * Format reputation for display
 */
function formatReputation(reputation, maxReputation) {
  return `${reputation} / ${maxReputation}`;
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FactionType,
    MAJOR_FACTION_RANKS,
    MINOR_FACTION_RANKS,
    FACTION_DEFINITIONS,
    ReputationManager,
    getFactionDefinition,
    getMajorFactions,
    getMinorFactions,
    formatReputation
  };
}
