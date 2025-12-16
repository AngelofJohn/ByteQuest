// ByteQuest - Village Projects System
// Resource sinks: One-time projects + Capped reputation turn-ins

// =====================================================
// Constants
// =====================================================

const ProjectStatus = {
  LOCKED: 'locked',       // Prerequisites not met
  AVAILABLE: 'available', // Can be contributed to
  COMPLETED: 'completed'  // Fully funded
};

// =====================================================
// Village Project Definitions
// =====================================================

const VILLAGE_PROJECTS = {
  // -------------------------------------------------
  // DAWNMERE PROJECTS
  // -------------------------------------------------

  // Village Well - Starter project, gold only
  // Unlocks the streak XP bonus system as a reward
  dawnmere_well_repair: {
    id: 'dawnmere_well_repair',
    name: "Village Well Repair",
    location: 'dawnmere',
    description: "The village well needs new rope and a bucket. A small contribution to help Dawnmere. Unlocks streak XP bonuses!",
    icon: '🪣',

    requirements: [
      { item: 'gold', amount: 100, label: 'Gold' }
    ],

    rewards: {
      reputation: { dawnmere_settlers: 25 },
      unlocks: ['streak_xp_bonus'],  // Unlocks streak XP multiplier in lessons
      items: [],
      gold: 0
    },

    prerequisites: [],
    completionText: "The well works perfectly now! The villagers share an old technique: answering correctly in a row builds momentum, granting bonus XP!"
  },

  // Fishing Dock - gives fish a purpose!
  dawnmere_fishing_dock: {
    id: 'dawnmere_fishing_dock',
    name: "Riverside Fishing Dock",
    location: 'dawnmere',
    description: "Build a proper dock for the village fishermen. Unlocks fish-based cooking recipes.",
    icon: '🎣',

    requirements: [
      { item: 'pine_log', amount: 15, label: 'Pine Logs' },
      { item: 'river_perch', amount: 10, label: 'River Perch' },
      { item: 'copper_chunk', amount: 5, label: 'Copper Chunks' }
    ],

    rewards: {
      reputation: { dawnmere_settlers: 50 },
      unlocks: ['cooking_fish'],  // Unlocks fish cooking recipes
      items: [{ id: 'fishermans_hat', amount: 1 }],
      gold: 25
    },

    prerequisites: [],
    completionText: "The dock is complete! Old Jorel can finally fish in comfort, and the village now has access to fresh catches daily."
  },

  // Baker's New Oven
  dawnmere_bakers_oven: {
    id: 'dawnmere_bakers_oven',
    name: "Marta's New Oven",
    location: 'dawnmere',
    description: "Help the baker upgrade her oven. Improves bread quality and unlocks special baked goods.",
    icon: '🍞',

    requirements: [
      { item: 'copper_chunk', amount: 10, label: 'Copper Chunks' },
      { item: 'meadow_leaf', amount: 8, label: 'Meadow Leaves' }
    ],

    rewards: {
      reputation: { dawnmere_settlers: 40 },
      unlocks: ['bakers_discount'],  // 10% off at baker
      items: [{ id: 'fresh_bread', amount: 5 }],
      gold: 15
    },

    prerequisites: [],
    completionText: "The new oven is installed! Marta's bread has never been better. She offers you a permanent discount as thanks."
  },

  // Village Smithy
  dawnmere_smithy_upgrade: {
    id: 'dawnmere_smithy_upgrade',
    name: "Forge Improvements",
    location: 'dawnmere',
    description: "Supply materials to improve the village forge. Reduces smithing material costs.",
    icon: '⚒️',

    requirements: [
      { item: 'copper_chunk', amount: 20, label: 'Copper Chunks' },
      { item: 'pine_log', amount: 10, label: 'Pine Logs' },
      { item: 'boar_hide', amount: 5, label: 'Boar Hides' }
    ],

    rewards: {
      reputation: { dawnmere_settlers: 60, miners_guild: 30 },
      unlocks: ['smithing_efficiency'],  // -10% material costs
      items: [{ id: 'copper_bar', amount: 3 }],
      gold: 30
    },

    prerequisites: [],
    completionText: "The forge burns hotter and cleaner now. Your smithing will be more efficient from here on."
  },

  // Hunter's Lodge
  dawnmere_hunters_lodge: {
    id: 'dawnmere_hunters_lodge',
    name: "Hunter's Lodge",
    location: 'dawnmere',
    description: "Build a lodge for hunters to prepare hides. Improves hide quality from hunting.",
    icon: '🏹',

    requirements: [
      { item: 'pine_log', amount: 20, label: 'Pine Logs' },
      { item: 'boar_hide', amount: 10, label: 'Boar Hides' },
      { item: 'river_perch', amount: 5, label: 'River Perch' }  // For the hunters' meals
    ],

    rewards: {
      reputation: { dawnmere_settlers: 50 },
      unlocks: ['hunting_bonus'],  // +1 hide per hunting session
      items: [{ id: 'leather_pouch', amount: 1 }],
      gold: 20
    },

    prerequisites: [],
    completionText: "The Hunter's Lodge stands proud at the village edge. Hunters can now properly process their catches."
  },

  // Herb Garden
  dawnmere_herb_garden: {
    id: 'dawnmere_herb_garden',
    name: "Community Herb Garden",
    location: 'dawnmere',
    description: "Plant a shared herb garden. Provides bonus herbs and unlocks basic alchemy recipes.",
    icon: '🌿',

    requirements: [
      { item: 'meadow_leaf', amount: 15, label: 'Meadow Leaves' },
      { item: 'pine_log', amount: 5, label: 'Pine Logs' }
    ],

    rewards: {
      reputation: { dawnmere_settlers: 40, horticulturists: 25 },
      unlocks: ['alchemy_basics'],  // Can craft basic potions
      items: [{ id: 'empty_bottle', amount: 3 }],
      gold: 15
    },

    prerequisites: [],
    completionText: "The herb garden flourishes! Fresh ingredients are now readily available for alchemy."
  }
};

// =====================================================
// NPC Resource Turn-in Definitions
// =====================================================

const RESOURCE_TURNINS = {
  dawnmere: {
    location: 'dawnmere',
    name: "Dawnmere Contributions",
    description: "Help the village by donating resources",

    turnins: [
      {
        id: 'dawnmere_herbs',
        npc: 'baker',
        npcName: 'Marta the Baker',
        resource: 'meadow_leaf',
        resourceName: 'Meadow Leaf',
        icon: '🌿',
        amountPer: 5,           // Turn in 5 at a time
        reputationPer: 15,      // +15 rep per turn-in
        faction: 'dawnmere_settlers',
        maxTurnins: 10,         // Can do this 10 times max
        flavor: "These herbs will make my bread taste wonderful!"
      },
      {
        id: 'dawnmere_ore',
        npc: 'merchant',
        npcName: 'The Merchant',
        resource: 'copper_chunk',
        resourceName: 'Copper Chunk',
        icon: '🪨',
        amountPer: 5,
        reputationPer: 15,
        faction: 'dawnmere_settlers',
        maxTurnins: 10,
        flavor: "Good copper! I can trade this in the cities."
      },
      {
        id: 'dawnmere_wood',
        npc: 'tommen',
        npcName: 'Tommen',
        resource: 'pine_log',
        resourceName: 'Pine Log',
        icon: '🪵',
        amountPer: 5,
        reputationPer: 15,
        faction: 'dawnmere_settlers',
        maxTurnins: 10,
        flavor: "I can use these to build something great someday!"
      },
      {
        id: 'dawnmere_hides',
        npc: 'urma',
        npcName: 'Urma',
        resource: 'boar_hide',
        resourceName: 'Boar Hide',
        icon: '🐗',
        amountPer: 3,
        reputationPer: 15,
        faction: 'dawnmere_settlers',
        maxTurnins: 10,
        flavor: "We can make warm clothes for the winter."
      },
      {
        id: 'dawnmere_fish',
        npc: 'old_jorel',
        npcName: 'Old Jorel',
        resource: 'river_perch',
        resourceName: 'River Perch',
        icon: '🐟',
        amountPer: 5,
        reputationPer: 15,
        faction: 'dawnmere_settlers',
        maxTurnins: 10,
        flavor: "Ah, fresh catch! The village will eat well tonight."
      }
    ]
  }
};

// =====================================================
// Village Projects Manager
// =====================================================

class VillageProjectsManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeState();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeState() {
    if (!this.state.player.villageProjects) {
      this.state.player.villageProjects = {
        completed: [],           // List of completed project IDs
        contributions: {},       // { projectId: { itemId: amountContributed } }
        turnins: {}              // { turninId: count }
      };
    }
  }

  // ===================================================
  // Project Queries
  // ===================================================

  /**
   * Get all projects for a location
   */
  getProjectsForLocation(locationId) {
    return Object.values(VILLAGE_PROJECTS).filter(p => p.location === locationId);
  }

  /**
   * Get project status
   */
  getProjectStatus(projectId) {
    const project = VILLAGE_PROJECTS[projectId];
    if (!project) return null;

    // Check if completed
    if (this.state.player.villageProjects.completed.includes(projectId)) {
      return ProjectStatus.COMPLETED;
    }

    // Check prerequisites
    for (const prereq of project.prerequisites) {
      if (!this.state.player.villageProjects.completed.includes(prereq)) {
        return ProjectStatus.LOCKED;
      }
    }

    return ProjectStatus.AVAILABLE;
  }

  /**
   * Get progress for a project
   */
  getProjectProgress(projectId) {
    const project = VILLAGE_PROJECTS[projectId];
    if (!project) return null;

    const contributions = this.state.player.villageProjects.contributions[projectId] || {};

    const progress = project.requirements.map(req => ({
      item: req.item,
      label: req.label,
      required: req.amount,
      contributed: contributions[req.item] || 0,
      complete: (contributions[req.item] || 0) >= req.amount
    }));

    const totalRequired = project.requirements.reduce((sum, r) => sum + r.amount, 0);
    const totalContributed = progress.reduce((sum, p) => sum + Math.min(p.contributed, p.required), 0);
    const percentage = Math.floor((totalContributed / totalRequired) * 100);

    return {
      project,
      requirements: progress,
      totalRequired,
      totalContributed,
      percentage,
      isComplete: progress.every(p => p.complete)
    };
  }

  // ===================================================
  // Contributions
  // ===================================================

  /**
   * Check if player can contribute an item to a project
   */
  canContribute(projectId, itemId, amount = 1) {
    const project = VILLAGE_PROJECTS[projectId];
    if (!project) return { can: false, reason: 'Project not found' };

    // Check status
    const status = this.getProjectStatus(projectId);
    if (status === ProjectStatus.COMPLETED) {
      return { can: false, reason: 'Project already completed' };
    }
    if (status === ProjectStatus.LOCKED) {
      return { can: false, reason: 'Project prerequisites not met' };
    }

    // Check if item is needed
    const requirement = project.requirements.find(r => r.item === itemId);
    if (!requirement) {
      return { can: false, reason: 'This item is not needed for this project' };
    }

    // Check how much more is needed
    const contributions = this.state.player.villageProjects.contributions[projectId] || {};
    const contributed = contributions[itemId] || 0;
    const stillNeeded = requirement.amount - contributed;

    if (stillNeeded <= 0) {
      return { can: false, reason: 'Already contributed enough of this item' };
    }

    // Check player inventory
    const playerAmount = this.getPlayerItemCount(itemId);
    if (playerAmount < amount) {
      return { can: false, reason: `Not enough ${requirement.label} (have ${playerAmount}, need ${amount})` };
    }

    return { can: true, stillNeeded, maxCanContribute: Math.min(amount, stillNeeded, playerAmount) };
  }

  /**
   * Contribute items to a project
   */
  contribute(projectId, itemId, amount = 1) {
    const check = this.canContribute(projectId, itemId, amount);
    if (!check.can) {
      return { success: false, message: check.reason };
    }

    const actualAmount = check.maxCanContribute;
    const project = VILLAGE_PROJECTS[projectId];
    const requirement = project.requirements.find(r => r.item === itemId);

    // Remove from inventory
    this.removePlayerItems(itemId, actualAmount);

    // Add to contributions
    if (!this.state.player.villageProjects.contributions[projectId]) {
      this.state.player.villageProjects.contributions[projectId] = {};
    }
    const contributions = this.state.player.villageProjects.contributions[projectId];
    contributions[itemId] = (contributions[itemId] || 0) + actualAmount;

    // Check if project is now complete
    const progress = this.getProjectProgress(projectId);
    if (progress.isComplete) {
      return this.completeProject(projectId);
    }

    return {
      success: true,
      message: `Contributed ${actualAmount} ${requirement.label} to ${project.name}`,
      progress: progress.percentage
    };
  }

  /**
   * Complete a project and grant rewards
   */
  completeProject(projectId) {
    const project = VILLAGE_PROJECTS[projectId];
    if (!project) return { success: false, message: 'Project not found' };

    // Mark as completed
    this.state.player.villageProjects.completed.push(projectId);

    // Grant rewards
    const rewards = project.rewards;
    const grantedRewards = [];

    // Reputation
    if (rewards.reputation) {
      for (const [factionId, amount] of Object.entries(rewards.reputation)) {
        if (typeof reputationManager !== 'undefined') {
          // Discover faction if needed
          if (!reputationManager.isFactionDiscovered(factionId)) {
            reputationManager.discoverFaction(factionId);
          }
          reputationManager.addReputation(factionId, amount);
          grantedRewards.push(`+${amount} ${factionId} reputation`);
        }
      }
    }

    // Gold
    if (rewards.gold) {
      this.state.player.gold += rewards.gold;
      grantedRewards.push(`+${rewards.gold} gold`);
    }

    // Items
    if (rewards.items) {
      for (const item of rewards.items) {
        this.addPlayerItem(item.id, item.amount);
        grantedRewards.push(`${item.amount}x ${item.id}`);
      }
    }

    // Unlocks
    if (rewards.unlocks) {
      if (!this.state.player.unlockedFeatures) {
        this.state.player.unlockedFeatures = [];
      }
      for (const unlock of rewards.unlocks) {
        if (!this.state.player.unlockedFeatures.includes(unlock)) {
          this.state.player.unlockedFeatures.push(unlock);
          grantedRewards.push(`Unlocked: ${unlock}`);
        }
      }
    }

    return {
      success: true,
      completed: true,
      message: project.completionText,
      projectName: project.name,
      rewards: grantedRewards
    };
  }

  // ===================================================
  // Resource Turn-ins
  // ===================================================

  /**
   * Get turn-in options for a location
   */
  getTurninsForLocation(locationId) {
    const locationTurnins = RESOURCE_TURNINS[locationId];
    if (!locationTurnins) return null;

    const turnins = locationTurnins.turnins.map(turnin => {
      const count = this.state.player.villageProjects.turnins[turnin.id] || 0;
      const remaining = turnin.maxTurnins - count;
      const playerHas = this.getPlayerItemCount(turnin.resource);

      return {
        ...turnin,
        timesUsed: count,
        remaining,
        canUse: remaining > 0 && playerHas >= turnin.amountPer,
        playerHas,
        maxedOut: remaining <= 0
      };
    });

    return {
      ...locationTurnins,
      turnins
    };
  }

  /**
   * Perform a resource turn-in
   */
  performTurnin(turninId) {
    // Find the turn-in definition
    let turnin = null;
    let locationId = null;

    for (const [locId, locData] of Object.entries(RESOURCE_TURNINS)) {
      const found = locData.turnins.find(t => t.id === turninId);
      if (found) {
        turnin = found;
        locationId = locId;
        break;
      }
    }

    if (!turnin) {
      return { success: false, message: 'Turn-in not found' };
    }

    // Check if maxed out
    const count = this.state.player.villageProjects.turnins[turninId] || 0;
    if (count >= turnin.maxTurnins) {
      return { success: false, message: `${turnin.npcName} doesn't need any more ${turnin.resourceName}` };
    }

    // Check player inventory
    const playerHas = this.getPlayerItemCount(turnin.resource);
    if (playerHas < turnin.amountPer) {
      return { success: false, message: `Not enough ${turnin.resourceName} (need ${turnin.amountPer}, have ${playerHas})` };
    }

    // Remove items
    this.removePlayerItems(turnin.resource, turnin.amountPer);

    // Increment turn-in count
    this.state.player.villageProjects.turnins[turninId] = count + 1;

    // Add reputation
    if (typeof reputationManager !== 'undefined') {
      if (!reputationManager.isFactionDiscovered(turnin.faction)) {
        reputationManager.discoverFaction(turnin.faction);
      }
      reputationManager.addReputation(turnin.faction, turnin.reputationPer);
    }

    const remaining = turnin.maxTurnins - count - 1;

    return {
      success: true,
      message: turnin.flavor,
      npc: turnin.npcName,
      reputation: turnin.reputationPer,
      faction: turnin.faction,
      remaining,
      maxedOut: remaining <= 0
    };
  }

  /**
   * Get total turn-in progress for a location
   */
  getTurninProgress(locationId) {
    const locationTurnins = RESOURCE_TURNINS[locationId];
    if (!locationTurnins) return null;

    let total = 0;
    let completed = 0;

    for (const turnin of locationTurnins.turnins) {
      total += turnin.maxTurnins;
      completed += this.state.player.villageProjects.turnins[turnin.id] || 0;
    }

    return {
      total,
      completed,
      percentage: Math.floor((completed / total) * 100)
    };
  }

  // ===================================================
  // Inventory Helpers (integrate with actual inventory system)
  // ===================================================

  getPlayerItemCount(itemId) {
    // Special case: gold
    if (itemId === 'gold') {
      return this.state.player.gold || 0;
    }
    // Use ItemManager if available
    if (typeof itemManager !== 'undefined' && itemManager) {
      return itemManager.getItemCount(itemId);
    }
    // Fallback to direct inventory check
    const inventory = this.state.player.inventory || [];
    return inventory.filter(item => item?.id === itemId).length;
  }

  removePlayerItems(itemId, amount) {
    // Special case: gold
    if (itemId === 'gold') {
      this.state.player.gold = Math.max(0, (this.state.player.gold || 0) - amount);
      return;
    }
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.removeItem(itemId, amount);
    } else {
      // Fallback
      const inventory = this.state.player.inventory || [];
      let removed = 0;
      this.state.player.inventory = inventory.filter(item => {
        if (item?.id === itemId && removed < amount) {
          removed++;
          return false;
        }
        return true;
      });
    }
  }

  addPlayerItem(itemId, amount) {
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.addItem(itemId, amount);
    } else {
      // Fallback
      if (!this.state.player.inventory) {
        this.state.player.inventory = [];
      }
      for (let i = 0; i < amount; i++) {
        this.state.player.inventory.push({ id: itemId });
      }
    }
  }

  // ===================================================
  // Summary & Statistics
  // ===================================================

  /**
   * Get summary for a location
   */
  getLocationSummary(locationId) {
    const projects = this.getProjectsForLocation(locationId);
    const projectStats = {
      total: projects.length,
      completed: projects.filter(p =>
        this.state.player.villageProjects.completed.includes(p.id)
      ).length,
      available: projects.filter(p =>
        this.getProjectStatus(p.id) === ProjectStatus.AVAILABLE
      ).length
    };

    const turninProgress = this.getTurninProgress(locationId);

    return {
      location: locationId,
      projects: projectStats,
      turnins: turninProgress,
      hasUnfinishedWork: projectStats.available > 0 ||
        (turninProgress && turninProgress.completed < turninProgress.total)
    };
  }

  /**
   * Check if player has a specific unlock from projects
   */
  hasUnlock(unlockId) {
    return this.state.player.unlockedFeatures?.includes(unlockId) || false;
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ProjectStatus,
    VILLAGE_PROJECTS,
    RESOURCE_TURNINS,
    VillageProjectsManager
  };
}
