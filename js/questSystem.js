// ByteQuest - Quest System
// Comprehensive quest management with types, categories, and states

// =====================================================
// Quest Enums & Constants
// =====================================================

const QuestStatus = {
  LOCKED: 'locked',         // Prerequisites not met, may be invisible
  AVAILABLE: 'available',   // Can be accepted
  ACTIVE: 'active',         // In progress
  COMPLETED: 'completed',   // Finished, rewards claimed
  FAILED: 'failed',         // Expired or conditions failed
  ARCHIVED: 'archived'      // Old completed, hidden from main view
};

const QuestType = {
  MAIN: 'main',             // Story critical, one-time
  SIDE: 'side',             // Optional, one-time  
  REPEATABLE: 'repeatable', // Can redo after cooldown
  DAILY: 'daily',           // Resets every 24 hours
  WEEKLY: 'weekly',         // Resets every 7 days
  HIDDEN: 'hidden',         // Secret until trigger conditions met
  CHAIN: 'chain',           // Part of a sequence
  TIMED: 'timed',           // Must complete within time limit
  SEASONAL: 'seasonal'      // Only available during certain periods
};

const QuestCategory = {
  LESSON: 'lesson',         // Direct vocabulary teaching
  COMBAT: 'combat',         // Battle-focused
  SOCIAL: 'social',         // NPC interaction, introductions
  GATHERING: 'gathering',   // Collection tasks
  COMMERCE: 'commerce',     // Buying/selling/trading
  EXPLORATION: 'exploration', // Discovery, travel
  LORE: 'lore',             // Story/history focused
  CRAFTING: 'crafting'      // Making items
};

const ObjectiveType = {
  LESSON: 'lesson',         // Complete a vocabulary lesson
  INTERACT: 'interact',     // Talk to specific NPC
  MEET: 'meet',             // Meet X number of NPCs
  COMBAT: 'combat',         // Defeat enemies
  COLLECT: 'collect',       // Gather items
  DELIVER: 'deliver',       // Bring item to NPC
  EXPLORE: 'explore',       // Discover a location
  PURCHASE: 'purchase',     // Buy from shop
  CRAFT: 'craft',           // Create an item
  TASK: 'task'              // Generic completion
};

// Time constants
const TIME = {
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000
};

// =====================================================
// Quest Manager Class
// =====================================================

class QuestManager {
  constructor(gameState, gameData) {
    this.state = gameState;
    this.data = gameData;
  }

  // ===================================================
  // Quest Status Checks
  // ===================================================

  /**
   * Check if prerequisites are met for a quest
   */
  checkPrerequisites(questId) {
    const quest = this.data.quests[questId];
    if (!quest) return false;

    // Check completed quest prerequisites
    if (quest.prerequisites && quest.prerequisites.length > 0) {
      const allPrereqsMet = quest.prerequisites.every(prereq => 
        this.state.player.completedQuests.includes(prereq)
      );
      if (!allPrereqsMet) return false;
    }

    // Check level requirement
    if (quest.levelRequired && this.state.player.level < quest.levelRequired) {
      return false;
    }

    // Check reputation requirement
    if (quest.reputationRequired) {
      for (const [faction, amount] of Object.entries(quest.reputationRequired)) {
        if ((this.state.player.reputation[faction] || 0) < amount) {
          return false;
        }
      }
    }

    // Check class requirement
    if (quest.classRequired && quest.classRequired !== this.state.player.class) {
      return false;
    }

    // Check item requirement
    if (quest.itemRequired) {
      const hasItem = this.state.player.inventory.some(i => i.id === quest.itemRequired);
      if (!hasItem) return false;
    }

    return true;
  }

  /**
   * Check if a hidden quest should be revealed
   */
  checkHiddenTrigger(questId) {
    const quest = this.data.quests[questId];
    if (!quest || quest.type !== QuestType.HIDDEN) return false;
    if (!quest.hiddenTrigger) return false;

    const trigger = quest.hiddenTrigger;

    // Check various trigger conditions
    if (trigger.wrongAnswers && this.state.player.totalWrongAnswers >= trigger.wrongAnswers) {
      return true;
    }

    if (trigger.lessonsCompleted && this.state.player.lessonsCompleted >= trigger.lessonsCompleted) {
      return true;
    }

    if (trigger.npcsMet && this.state.player.metNpcs.length >= trigger.npcsMet) {
      return true;
    }

    if (trigger.locationDiscovered && this.state.player.discoveredLocations.includes(trigger.locationDiscovered)) {
      return true;
    }

    if (trigger.itemFound && this.state.player.inventory.some(i => i.id === trigger.itemFound)) {
      return true;
    }

    if (trigger.timePlayedMinutes) {
      const timePlayed = (Date.now() - this.state.player.createdAt) / 60000;
      if (timePlayed >= trigger.timePlayedMinutes) return true;
    }

    return false;
  }

  /**
   * Check if a timed quest has expired
   */
  checkTimedExpiration(questProgress) {
    const quest = this.data.quests[questProgress.id];
    if (!quest || quest.type !== QuestType.TIMED) return false;
    if (!quest.timeLimit) return false;

    const elapsed = Date.now() - questProgress.startedAt;
    return elapsed > quest.timeLimit;
  }

  /**
   * Check if a repeatable/daily/weekly quest is available again
   */
  checkCooldownExpired(questId) {
    const quest = this.data.quests[questId];
    if (!quest) return false;

    const completionRecord = this.state.player.questCompletions?.[questId];
    if (!completionRecord) return true; // Never completed

    const lastCompleted = completionRecord.lastCompletedAt;
    const now = Date.now();

    switch (quest.type) {
      case QuestType.DAILY:
        // Check if it's a new day (reset at midnight)
        const lastDate = new Date(lastCompleted).toDateString();
        const todayDate = new Date(now).toDateString();
        return lastDate !== todayDate;

      case QuestType.WEEKLY:
        // Check if it's been 7 days
        return (now - lastCompleted) >= TIME.WEEK;

      case QuestType.REPEATABLE:
        // Use custom cooldown or default 1 hour
        const cooldown = quest.cooldown || TIME.HOUR;
        return (now - lastCompleted) >= cooldown;

      default:
        return false; // Non-repeatable quests don't reset
    }
  }

  /**
   * Check if seasonal quest is in season
   */
  checkSeasonalAvailability(questId) {
    const quest = this.data.quests[questId];
    if (!quest || quest.type !== QuestType.SEASONAL) return true;
    if (!quest.seasonalWindow) return true;

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentDay = now.getDate();

    const { startMonth, startDay, endMonth, endDay } = quest.seasonalWindow;

    // Simple date range check (doesn't handle year wrap perfectly but works for most cases)
    const start = startMonth * 100 + startDay;
    const end = endMonth * 100 + endDay;
    const current = currentMonth * 100 + currentDay;

    if (start <= end) {
      return current >= start && current <= end;
    } else {
      // Wraps around year (e.g., Dec 15 - Jan 15)
      return current >= start || current <= end;
    }
  }

  // ===================================================
  // Quest Retrieval
  // ===================================================

  /**
   * Get all quests for a location with their current status
   */
  getQuestsForLocation(locationId) {
    const location = this.data.locations[locationId];
    if (!location) return [];

    return location.quests.map(questId => this.getQuestWithStatus(questId)).filter(Boolean);
  }

  /**
   * Get a quest with its computed status
   */
  getQuestWithStatus(questId) {
    const quest = this.data.quests[questId];
    if (!quest) return null;

    // Check if already active
    const activeQuest = this.state.player.activeQuests.find(q => q.id === questId);
    if (activeQuest) {
      // Check for timed expiration
      if (this.checkTimedExpiration(activeQuest)) {
        return { ...quest, ...activeQuest, status: QuestStatus.FAILED, failReason: 'expired' };
      }
      return { ...quest, ...activeQuest, status: QuestStatus.ACTIVE };
    }

    // Check if completed (and not repeatable or cooldown not expired)
    if (this.state.player.completedQuests.includes(questId)) {
      if ([QuestType.DAILY, QuestType.WEEKLY, QuestType.REPEATABLE].includes(quest.type)) {
        if (this.checkCooldownExpired(questId)) {
          // Available again
          return { ...quest, id: questId, status: QuestStatus.AVAILABLE, isRepeat: true };
        }
      }
      return { ...quest, id: questId, status: QuestStatus.COMPLETED };
    }

    // Check if failed
    if (this.state.player.failedQuests?.includes(questId)) {
      return { ...quest, id: questId, status: QuestStatus.FAILED };
    }

    // Check hidden quest trigger
    if (quest.type === QuestType.HIDDEN) {
      if (!this.checkHiddenTrigger(questId)) {
        return null; // Don't show hidden quests until triggered
      }
    }

    // Check seasonal availability
    if (quest.type === QuestType.SEASONAL) {
      if (!this.checkSeasonalAvailability(questId)) {
        return null; // Out of season
      }
    }

    // Check prerequisites
    if (this.checkPrerequisites(questId)) {
      return { ...quest, id: questId, status: QuestStatus.AVAILABLE };
    }

    // Locked - prerequisites not met
    return { ...quest, id: questId, status: QuestStatus.LOCKED };
  }

  /**
   * Get active quests
   */
  getActiveQuests() {
    return this.state.player.activeQuests.map(q => {
      const questData = this.data.quests[q.id];
      const status = this.checkTimedExpiration(q) ? QuestStatus.FAILED : QuestStatus.ACTIVE;
      return { ...questData, ...q, status };
    });
  }

  /**
   * Get available quests for current location
   */
  getAvailableQuests() {
    const location = this.data.locations[this.state.currentLocation];
    if (!location) return [];

    return location.quests
      .map(questId => this.getQuestWithStatus(questId))
      .filter(q => q && q.status === QuestStatus.AVAILABLE);
  }

  /**
   * Get completed quests (optionally include archived)
   */
  getCompletedQuests(includeArchived = false) {
    return this.state.player.completedQuests
      .map(questId => this.getQuestWithStatus(questId))
      .filter(q => q && (q.status === QuestStatus.COMPLETED || 
        (includeArchived && q.status === QuestStatus.ARCHIVED)));
  }

  /**
   * Get failed quests
   */
  getFailedQuests() {
    return (this.state.player.failedQuests || [])
      .map(questId => this.getQuestWithStatus(questId))
      .filter(q => q && q.status === QuestStatus.FAILED);
  }

  /**
   * Filter quests by type
   */
  filterByType(quests, type) {
    return quests.filter(q => q.type === type);
  }

  /**
   * Filter quests by category
   */
  filterByCategory(quests, category) {
    return quests.filter(q => q.category === category);
  }

  // ===================================================
  // Quest Actions
  // ===================================================

  /**
   * Accept a quest
   */
  acceptQuest(questId) {
    const questWithStatus = this.getQuestWithStatus(questId);
    
    if (!questWithStatus || questWithStatus.status !== QuestStatus.AVAILABLE) {
      return { success: false, message: "Quest not available" };
    }

    const quest = this.data.quests[questId];

    // Create quest progress object
    const questProgress = {
      id: questId,
      objectives: quest.objectives.map(obj => ({
        id: obj.id,
        completed: false,
        count: obj.target ? 0 : undefined
      })),
      startedAt: Date.now(),
      isRepeat: questWithStatus.isRepeat || false
    };

    // Add to active quests
    this.state.player.activeQuests.push(questProgress);

    // Remove from completed if it's a repeat
    if (questWithStatus.isRepeat) {
      const completedIndex = this.state.player.completedQuests.indexOf(questId);
      if (completedIndex > -1) {
        this.state.player.completedQuests.splice(completedIndex, 1);
      }
    }

    return { success: true, message: `Quest accepted: ${quest.name}` };
  }

  /**
   * Update quest objective progress
   */
  updateObjective(questId, objectiveId, increment = 1) {
    const questProgress = this.state.player.activeQuests.find(q => q.id === questId);
    if (!questProgress) return { success: false, message: "Quest not active" };

    const objective = questProgress.objectives.find(o => o.id === objectiveId);
    const objectiveData = this.data.quests[questId].objectives.find(o => o.id === objectiveId);
    
    if (!objective || objective.completed) {
      return { success: false, message: "Objective not found or already completed" };
    }

    // Update progress
    if (objectiveData.target) {
      objective.count = (objective.count || 0) + increment;
      if (objective.count >= objectiveData.target) {
        objective.completed = true;
      }
    } else {
      objective.completed = true;
    }

    // Check if all objectives complete
    const allComplete = questProgress.objectives.every(o => o.completed);
    
    return { 
      success: true, 
      objectiveComplete: objective.completed,
      questComplete: allComplete,
      message: objective.completed ? `Objective complete: ${objectiveData.text}` : null
    };
  }

  /**
   * Complete a quest
   */
  completeQuest(questId) {
    const questIndex = this.state.player.activeQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) {
      return { success: false, message: "Quest not active" };
    }

    const questProgress = this.state.player.activeQuests[questIndex];
    const quest = this.data.quests[questId];

    // Verify all objectives complete
    const allComplete = questProgress.objectives.every(o => o.completed);
    if (!allComplete) {
      return { success: false, message: "Not all objectives completed" };
    }

    // Remove from active
    this.state.player.activeQuests.splice(questIndex, 1);

    // Add to completed
    if (!this.state.player.completedQuests.includes(questId)) {
      this.state.player.completedQuests.push(questId);
    }

    // Track completion for repeatable quests
    if (!this.state.player.questCompletions) {
      this.state.player.questCompletions = {};
    }
    if (!this.state.player.questCompletions[questId]) {
      this.state.player.questCompletions[questId] = { count: 0 };
    }
    this.state.player.questCompletions[questId].count++;
    this.state.player.questCompletions[questId].lastCompletedAt = Date.now();

    // Calculate rewards (reduced for repeats)
    const rewards = this.calculateRewards(quest, questProgress.isRepeat);

    return { 
      success: true, 
      message: `Quest complete: ${quest.name}`,
      rewards 
    };
  }

  /**
   * Fail a quest
   */
  failQuest(questId, reason = 'unknown') {
    const questIndex = this.state.player.activeQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) {
      return { success: false, message: "Quest not active" };
    }

    const quest = this.data.quests[questId];

    // Remove from active
    this.state.player.activeQuests.splice(questIndex, 1);

    // Add to failed (if not repeatable)
    if (![QuestType.DAILY, QuestType.WEEKLY, QuestType.REPEATABLE].includes(quest.type)) {
      if (!this.state.player.failedQuests) {
        this.state.player.failedQuests = [];
      }
      if (!this.state.player.failedQuests.includes(questId)) {
        this.state.player.failedQuests.push(questId);
      }
    }

    return { 
      success: true, 
      message: `Quest failed: ${quest.name}`,
      reason 
    };
  }

  /**
   * Abandon a quest (voluntary)
   */
  abandonQuest(questId) {
    const questIndex = this.state.player.activeQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) {
      return { success: false, message: "Quest not active" };
    }

    const quest = this.data.quests[questId];

    // Check if quest can be abandoned
    if (quest.cannotAbandon) {
      return { success: false, message: "This quest cannot be abandoned" };
    }

    // Remove from active (but don't mark as failed)
    this.state.player.activeQuests.splice(questIndex, 1);

    return { success: true, message: `Quest abandoned: ${quest.name}` };
  }

  /**
   * Archive a completed quest
   */
  archiveQuest(questId) {
    if (!this.state.player.completedQuests.includes(questId)) {
      return { success: false, message: "Quest not completed" };
    }

    if (!this.state.player.archivedQuests) {
      this.state.player.archivedQuests = [];
    }

    // Move from completed to archived
    const index = this.state.player.completedQuests.indexOf(questId);
    this.state.player.completedQuests.splice(index, 1);
    this.state.player.archivedQuests.push(questId);

    return { success: true, message: "Quest archived" };
  }

  // ===================================================
  // Rewards
  // ===================================================

  /**
   * Calculate rewards (with repeat penalty if applicable)
   */
  calculateRewards(quest, isRepeat = false) {
    const rewards = { ...quest.rewards };
    
    if (isRepeat && quest.repeatRewardMultiplier !== undefined) {
      // Apply repeat multiplier (e.g., 0.5 for 50% rewards on repeat)
      const multiplier = quest.repeatRewardMultiplier;
      if (rewards.xp) rewards.xp = Math.floor(rewards.xp * multiplier);
      if (rewards.gold) rewards.gold = Math.floor(rewards.gold * multiplier);
      // Items typically not reduced, but could be
    }

    return rewards;
  }

  /**
   * Grant rewards to player
   */
  grantRewards(rewards) {
    const granted = {
      xp: 0,
      gold: 0,
      items: [],
      reputation: {}
    };

    if (rewards.xp) {
      this.state.player.xp += rewards.xp;
      granted.xp = rewards.xp;
      // Level up check would go here
    }

    if (rewards.gold) {
      this.state.player.gold += rewards.gold;
      granted.gold = rewards.gold;
    }

    if (rewards.items) {
      rewards.items.forEach(itemId => {
        // Add to inventory logic
        const existing = this.state.player.inventory.find(i => i.id === itemId);
        if (existing && this.data.items[itemId]?.stackable) {
          existing.count++;
        } else {
          this.state.player.inventory.push({ id: itemId, count: 1 });
        }
        granted.items.push(itemId);
      });
    }

    if (rewards.reputation) {
      Object.entries(rewards.reputation).forEach(([faction, amount]) => {
        this.state.player.reputation[faction] = (this.state.player.reputation[faction] || 0) + amount;
        granted.reputation[faction] = amount;
      });
    }

    return granted;
  }

  // ===================================================
  // Chain Quest Helpers
  // ===================================================

  /**
   * Get next quest in a chain
   */
  getNextInChain(questId) {
    const quest = this.data.quests[questId];
    if (!quest || !quest.chainNext) return null;
    return this.data.quests[quest.chainNext];
  }

  /**
   * Get all quests in a chain
   */
  getChain(chainId) {
    return Object.values(this.data.quests)
      .filter(q => q.chainId === chainId)
      .sort((a, b) => (a.chainOrder || 0) - (b.chainOrder || 0));
  }

  /**
   * Get chain progress
   */
  getChainProgress(chainId) {
    const chain = this.getChain(chainId);
    const completed = chain.filter(q => this.state.player.completedQuests.includes(q.id));
    return {
      total: chain.length,
      completed: completed.length,
      current: chain.find(q => !this.state.player.completedQuests.includes(q.id)),
      percent: Math.floor((completed.length / chain.length) * 100)
    };
  }

  // ===================================================
  // Time-based Updates
  // ===================================================

  /**
   * Check all active quests for expiration
   */
  checkExpirations() {
    const expired = [];
    
    this.state.player.activeQuests.forEach(questProgress => {
      if (this.checkTimedExpiration(questProgress)) {
        expired.push(questProgress.id);
      }
    });

    expired.forEach(questId => {
      this.failQuest(questId, 'expired');
    });

    return expired;
  }

  /**
   * Get time remaining on a timed quest
   */
  getTimeRemaining(questId) {
    const questProgress = this.state.player.activeQuests.find(q => q.id === questId);
    const quest = this.data.quests[questId];
    
    if (!questProgress || !quest || quest.type !== QuestType.TIMED) {
      return null;
    }

    const elapsed = Date.now() - questProgress.startedAt;
    const remaining = quest.timeLimit - elapsed;
    
    return Math.max(0, remaining);
  }

  /**
   * Get cooldown remaining for repeatable quest
   */
  getCooldownRemaining(questId) {
    const quest = this.data.quests[questId];
    if (!quest) return null;

    const completionRecord = this.state.player.questCompletions?.[questId];
    if (!completionRecord) return 0;

    const lastCompleted = completionRecord.lastCompletedAt;
    const now = Date.now();

    let cooldown;
    switch (quest.type) {
      case QuestType.DAILY:
        // Time until midnight
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);
        return tomorrow.getTime() - now;

      case QuestType.WEEKLY:
        cooldown = TIME.WEEK;
        break;

      case QuestType.REPEATABLE:
        cooldown = quest.cooldown || TIME.HOUR;
        break;

      default:
        return null;
    }

    const remaining = cooldown - (now - lastCompleted);
    return Math.max(0, remaining);
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format time remaining as human readable string
 */
function formatTimeRemaining(ms) {
  if (ms <= 0) return "Available now";
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Get quest type display info
 */
function getQuestTypeInfo(type) {
  const typeInfo = {
    [QuestType.MAIN]: { label: 'MAIN', color: '#ffd700', icon: '⚔️' },
    [QuestType.SIDE]: { label: 'SIDE', color: '#8d99ae', icon: '📋' },
    [QuestType.REPEATABLE]: { label: 'REPEATABLE', color: '#2a9d8f', icon: '🔄' },
    [QuestType.DAILY]: { label: 'DAILY', color: '#4361ee', icon: '📅' },
    [QuestType.WEEKLY]: { label: 'WEEKLY', color: '#7209b7', icon: '📆' },
    [QuestType.HIDDEN]: { label: 'SECRET', color: '#e63946', icon: '❓' },
    [QuestType.CHAIN]: { label: 'CHAIN', color: '#f4a261', icon: '🔗' },
    [QuestType.TIMED]: { label: 'TIMED', color: '#e76f51', icon: '⏱️' },
    [QuestType.SEASONAL]: { label: 'SEASONAL', color: '#90be6d', icon: '🌸' }
  };
  return typeInfo[type] || { label: 'QUEST', color: '#8d99ae', icon: '📜' };
}

/**
 * Get quest category display info
 */
function getQuestCategoryInfo(category) {
  const categoryInfo = {
    [QuestCategory.LESSON]: { label: 'Lesson', icon: '📚' },
    [QuestCategory.COMBAT]: { label: 'Combat', icon: '⚔️' },
    [QuestCategory.SOCIAL]: { label: 'Social', icon: '💬' },
    [QuestCategory.GATHERING]: { label: 'Gathering', icon: '🌿' },
    [QuestCategory.COMMERCE]: { label: 'Commerce', icon: '💰' },
    [QuestCategory.EXPLORATION]: { label: 'Exploration', icon: '🗺️' },
    [QuestCategory.LORE]: { label: 'Lore', icon: '📖' },
    [QuestCategory.CRAFTING]: { label: 'Crafting', icon: '🔨' }
  };
  return categoryInfo[category] || { label: 'Quest', icon: '📜' };
}

/**
 * Get status display info
 */
function getQuestStatusInfo(status) {
  const statusInfo = {
    [QuestStatus.LOCKED]: { label: 'Locked', color: '#45475a', icon: '🔒' },
    [QuestStatus.AVAILABLE]: { label: 'Available', color: '#ffd700', icon: '❗' },
    [QuestStatus.ACTIVE]: { label: 'In Progress', color: '#4361ee', icon: '▶️' },
    [QuestStatus.COMPLETED]: { label: 'Completed', color: '#2a9d8f', icon: '✅' },
    [QuestStatus.FAILED]: { label: 'Failed', color: '#e63946', icon: '❌' },
    [QuestStatus.ARCHIVED]: { label: 'Archived', color: '#8d99ae', icon: '📁' }
  };
  return statusInfo[status] || { label: 'Unknown', color: '#8d99ae', icon: '?' };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    QuestStatus, 
    QuestType, 
    QuestCategory, 
    ObjectiveType,
    QuestManager,
    formatTimeRemaining,
    getQuestTypeInfo,
    getQuestCategoryInfo,
    getQuestStatusInfo
  };
}
