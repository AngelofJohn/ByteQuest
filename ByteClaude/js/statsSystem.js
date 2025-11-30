// ByteQuest - Stats, Milestones, and Achievements System
// Phase 1: Skeleton with placeholder values

// =====================================================
// Stat Definitions
// =====================================================

const StatType = {
  // Major Stats
  STAMINA: 'stamina',
  STRENGTH: 'strength',
  WISDOM: 'wisdom',
  AGILITY: 'agility',
  INSIGHT: 'insight',
  // Minor Stats
  LUCK: 'luck',
  DEVOTION: 'devotion',
  KNOWLEDGE: 'knowledge'
};

const STAT_DEFINITIONS = {
  // Major Stats
  [StatType.STAMINA]: {
    id: StatType.STAMINA,
    name: 'Stamina',
    type: 'major',
    icon: '❤️',
    description: 'Affects max HP and lesson endurance.',
    color: '#e63946',
    active: true // Has mechanical effect in Phase 1
  },
  [StatType.STRENGTH]: {
    id: StatType.STRENGTH,
    name: 'Strength',
    type: 'major',
    icon: '⚔️',
    description: 'Affects combat and task completion.',
    color: '#e76f51',
    active: false // Display only for now
  },
  [StatType.WISDOM]: {
    id: StatType.WISDOM,
    name: 'Wisdom',
    type: 'major',
    icon: '📚',
    description: 'Affects XP gains and retention.',
    color: '#7209b7',
    active: true
  },
  [StatType.AGILITY]: {
    id: StatType.AGILITY,
    name: 'Agility',
    type: 'major',
    icon: '💨',
    description: 'Affects streaks and timers.',
    color: '#4cc9f0',
    active: false
  },
  [StatType.INSIGHT]: {
    id: StatType.INSIGHT,
    name: 'Insight',
    type: 'major',
    icon: '👁️',
    description: 'Affects hint quality and hidden discovery.',
    color: '#f4a261',
    active: true
  },
  // Minor Stats
  [StatType.LUCK]: {
    id: StatType.LUCK,
    name: 'Luck',
    type: 'minor',
    icon: '🍀',
    description: 'Affects rare drops and random events.',
    color: '#2a9d8f',
    active: false
  },
  [StatType.DEVOTION]: {
    id: StatType.DEVOTION,
    name: 'Devotion',
    type: 'minor',
    icon: '✨',
    description: 'Ties to light/church lore and seasonal events.',
    color: '#ffd700',
    active: false
  },
  [StatType.KNOWLEDGE]: {
    id: StatType.KNOWLEDGE,
    name: 'Knowledge',
    type: 'minor',
    icon: '📖',
    description: 'Affects cookbook and world history unlocks.',
    color: '#90be6d',
    active: false
  }
};

// Starting stat values (placeholder - to be balanced later)
const STARTING_STATS = {
  [StatType.STAMINA]: 5,
  [StatType.STRENGTH]: 5,
  [StatType.WISDOM]: 5,
  [StatType.AGILITY]: 5,
  [StatType.INSIGHT]: 5,
  [StatType.LUCK]: 3,
  [StatType.DEVOTION]: 3,
  [StatType.KNOWLEDGE]: 3
};

// Stat gains per level (automatic assignment)
// Rotates through major stats each level
const LEVEL_UP_STAT_ORDER = [
  StatType.STAMINA,
  StatType.WISDOM,
  StatType.INSIGHT,
  StatType.AGILITY,
  StatType.STRENGTH
];

// =====================================================
// Milestone Definitions
// =====================================================

const MilestoneType = {
  WORDS_MASTERED: 'words_mastered',
  LESSONS_COMPLETED: 'lessons_completed',
  QUESTS_COMPLETED: 'quests_completed',
  ACCURACY: 'accuracy',
  BEST_STREAK: 'best_streak',
  GOLD_EARNED: 'gold_earned',
  REPUTATION: 'reputation'
};

const MILESTONE_DEFINITIONS = {
  [MilestoneType.WORDS_MASTERED]: {
    id: MilestoneType.WORDS_MASTERED,
    name: 'Word Master',
    description: 'Master vocabulary words',
    icon: '📝',
    tiers: [
      { threshold: 25, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Novice' },
      { threshold: 50, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Apprentice' },
      { threshold: 100, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Adept' },
      { threshold: 200, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Expert' }
    ],
    getValue: (state) => {
      if (!state.player.vocabulary) return 0;
      return Object.values(state.player.vocabulary).filter(w => w.level >= 5).length;
    }
  },
  [MilestoneType.LESSONS_COMPLETED]: {
    id: MilestoneType.LESSONS_COMPLETED,
    name: 'Dedicated Student',
    description: 'Complete lessons',
    icon: '🎓',
    tiers: [
      { threshold: 10, reward: { stat: StatType.KNOWLEDGE, amount: 1 }, label: 'Beginner' },
      { threshold: 25, reward: { stat: StatType.KNOWLEDGE, amount: 1 }, label: 'Student' },
      { threshold: 50, reward: { stat: StatType.KNOWLEDGE, amount: 1 }, label: 'Scholar' },
      { threshold: 100, reward: { stat: StatType.KNOWLEDGE, amount: 1 }, label: 'Sage' }
    ],
    getValue: (state) => state.player.lessonsCompleted || 0
  },
  [MilestoneType.QUESTS_COMPLETED]: {
    id: MilestoneType.QUESTS_COMPLETED,
    name: 'Adventurer',
    description: 'Complete quests',
    icon: '📜',
    tiers: [
      { threshold: 5, reward: { stat: StatType.INSIGHT, amount: 1 }, label: 'Errand Runner' },
      { threshold: 15, reward: { stat: StatType.INSIGHT, amount: 1 }, label: 'Adventurer' },
      { threshold: 30, reward: { stat: StatType.INSIGHT, amount: 1 }, label: 'Veteran' },
      { threshold: 50, reward: { stat: StatType.INSIGHT, amount: 1 }, label: 'Legend' }
    ],
    getValue: (state) => state.player.completedQuests?.length || 0
  },
  [MilestoneType.ACCURACY]: {
    id: MilestoneType.ACCURACY,
    name: 'Precise Mind',
    description: 'Achieve high lifetime accuracy',
    icon: '🎯',
    tiers: [
      { threshold: 70, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Careful' },
      { threshold: 80, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Precise' },
      { threshold: 90, reward: { stat: StatType.WISDOM, amount: 1 }, label: 'Masterful' }
    ],
    getValue: (state) => {
      const total = (state.player.totalCorrectAnswers || 0) + (state.player.totalWrongAnswers || 0);
      if (total === 0) return 0;
      return Math.round((state.player.totalCorrectAnswers / total) * 100);
    }
  },
  [MilestoneType.BEST_STREAK]: {
    id: MilestoneType.BEST_STREAK,
    name: 'On Fire',
    description: 'Achieve answer streaks',
    icon: '🔥',
    tiers: [
      { threshold: 10, reward: { stat: StatType.AGILITY, amount: 1 }, label: 'Warm' },
      { threshold: 25, reward: { stat: StatType.AGILITY, amount: 1 }, label: 'Hot' },
      { threshold: 50, reward: { stat: StatType.AGILITY, amount: 1 }, label: 'Blazing' }
    ],
    getValue: (state) => state.player.longestStreak || 0
  },
  [MilestoneType.GOLD_EARNED]: {
    id: MilestoneType.GOLD_EARNED,
    name: 'Prosperous',
    description: 'Earn gold throughout your journey',
    icon: '💰',
    tiers: [
      { threshold: 100, reward: { stat: StatType.LUCK, amount: 1 }, label: 'Coin Collector' },
      { threshold: 500, reward: { stat: StatType.LUCK, amount: 1 }, label: 'Wealthy' },
      { threshold: 1000, reward: { stat: StatType.LUCK, amount: 1 }, label: 'Rich' }
    ],
    getValue: (state) => state.player.totalGoldEarned || 0
  },
  [MilestoneType.REPUTATION]: {
    id: MilestoneType.REPUTATION,
    name: 'Renowned',
    description: 'Build reputation with factions',
    icon: '🏛️',
    tiers: [
      { threshold: 2, reward: { stat: StatType.DEVOTION, amount: 1 }, label: 'Known' },
      { threshold: 3, reward: { stat: StatType.DEVOTION, amount: 1 }, label: 'Respected' },
      { threshold: 4, reward: { stat: StatType.DEVOTION, amount: 1 }, label: 'Honored' },
      { threshold: 5, reward: { stat: StatType.DEVOTION, amount: 1 }, label: 'Exalted' }
    ],
    getValue: (state) => {
      // Returns highest reputation rank achieved with any faction
      const reps = state.player.reputation || {};
      if (Object.keys(reps).length === 0) return 0;
      return Math.max(...Object.values(reps).map(r => Math.floor(r / 100) + 1));
    }
  }
};

// =====================================================
// Achievement Definitions
// =====================================================

const ACHIEVEMENT_DEFINITIONS = {
  // Getting Started
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first quest',
    icon: '👣',
    hidden: false,
    reward: { stat: StatType.INSIGHT, amount: 1, title: 'Apprentice' },
    check: (state) => (state.player.completedQuests?.length || 0) >= 1
  },
  word_collector: {
    id: 'word_collector',
    name: 'Word Collector',
    description: 'Learn 10 words',
    icon: '📚',
    hidden: false,
    reward: { stat: StatType.KNOWLEDGE, amount: 1 },
    check: (state) => Object.keys(state.player.vocabulary || {}).length >= 10
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% on a lesson',
    icon: '💯',
    hidden: false,
    reward: { stat: StatType.WISDOM, amount: 1 },
    check: (state) => state.player.perfectLessons >= 1
  },
  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Recover from 0 HP via review',
    icon: '💪',
    hidden: false,
    reward: { stat: StatType.STAMINA, amount: 1 },
    check: (state) => state.player.reviewRecoveries >= 1
  },
  streak_starter: {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Reach a 5 answer streak',
    icon: '⚡',
    hidden: false,
    reward: { stat: StatType.AGILITY, amount: 1 },
    check: (state) => (state.player.longestStreak || 0) >= 5
  },
  big_spender: {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Spend 100 gold',
    icon: '🛒',
    hidden: false,
    reward: { stat: StatType.LUCK, amount: 1 },
    check: (state) => (state.player.totalGoldSpent || 0) >= 100
  },
  friendly_face: {
    id: 'friendly_face',
    name: 'Friendly Face',
    description: 'Meet all NPCs in Dawnmere',
    icon: '🤝',
    hidden: false,
    reward: { stat: StatType.INSIGHT, amount: 1 },
    check: (state) => {
      const dawnmereNpcs = ['urma', 'rega', 'dave'];
      return dawnmereNpcs.every(npc => state.player.metNpcs?.includes(npc));
    }
  },
  secret_finder: {
    id: 'secret_finder',
    name: 'Secret Finder',
    description: 'Discover a hidden quest',
    icon: '🔍',
    hidden: true, // Hidden until unlocked
    reward: { stat: StatType.INSIGHT, amount: 1, title: 'Seeker' },
    check: (state) => (state.player.hiddenQuestsFound || 0) >= 1
  },
  devoted: {
    id: 'devoted',
    name: 'Devoted',
    description: 'Complete a seasonal quest',
    icon: '🌟',
    hidden: false,
    reward: { stat: StatType.DEVOTION, amount: 1 },
    check: (state) => (state.player.seasonalQuestsCompleted || 0) >= 1
  },
  // Class Achievements
  scholars_path: {
    id: 'scholars_path',
    name: "Scholar's Path",
    description: 'Begin your journey as a Scholar',
    icon: '📖',
    hidden: false,
    reward: { title: 'Scholar' },
    check: (state) => state.player.class === 'scholar'
  },
  warriors_path: {
    id: 'warriors_path',
    name: "Warrior's Path",
    description: 'Begin your journey as a Warrior',
    icon: '⚔️',
    hidden: false,
    reward: { title: 'Warrior' },
    check: (state) => state.player.class === 'warrior'
  },
  travelers_path: {
    id: 'travelers_path',
    name: "Traveler's Path",
    description: 'Begin your journey as a Traveler',
    icon: '🗺️',
    hidden: false,
    reward: { title: 'Traveler' },
    check: (state) => state.player.class === 'traveler'
  },
  // Hidden Achievements
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after midnight',
    icon: '🦉',
    hidden: true,
    reward: { stat: StatType.WISDOM, amount: 1 },
    check: (state) => state.player.studiedAfterMidnight || false
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 6 AM',
    icon: '🐦',
    hidden: true,
    reward: { stat: StatType.AGILITY, amount: 1 },
    check: (state) => state.player.studiedBeforeSix || false
  },
  the_struggle: {
    id: 'the_struggle',
    name: 'The Struggle',
    description: 'Get 15 wrong answers',
    icon: '😅',
    hidden: true,
    reward: { stat: StatType.STAMINA, amount: 1 },
    check: (state) => (state.player.totalWrongAnswers || 0) >= 15
  }
};

// =====================================================
// Stats Manager Class
// =====================================================

class StatsManager {
  constructor(gameState) {
    this.state = gameState;
    this.initializeStats();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeStats() {
    if (!this.state.player.stats) {
      this.state.player.stats = { ...STARTING_STATS };
    }
    if (!this.state.player.bonusStats) {
      this.state.player.bonusStats = {}; // From gear
    }
    if (!this.state.player.unlockedAchievements) {
      this.state.player.unlockedAchievements = [];
    }
    if (!this.state.player.claimedMilestones) {
      this.state.player.claimedMilestones = {}; // { milestoneId: tierIndex }
    }
    if (!this.state.player.titles) {
      this.state.player.titles = [];
    }
    if (!this.state.player.activeTitle) {
      this.state.player.activeTitle = null;
    }
  }

  // ===================================================
  // Stat Getters
  // ===================================================

  getBaseStat(statId) {
    return this.state.player.stats[statId] || 0;
  }

  getBonusStat(statId) {
    return this.state.player.bonusStats[statId] || 0;
  }

  getTotalStat(statId) {
    return this.getBaseStat(statId) + this.getBonusStat(statId);
  }

  getAllStats() {
    const stats = {};
    for (const statId of Object.values(StatType)) {
      stats[statId] = {
        base: this.getBaseStat(statId),
        bonus: this.getBonusStat(statId),
        total: this.getTotalStat(statId),
        definition: STAT_DEFINITIONS[statId]
      };
    }
    return stats;
  }

  getMajorStats() {
    return Object.values(StatType)
      .filter(id => STAT_DEFINITIONS[id].type === 'major')
      .map(id => ({
        id,
        ...this.getAllStats()[id]
      }));
  }

  getMinorStats() {
    return Object.values(StatType)
      .filter(id => STAT_DEFINITIONS[id].type === 'minor')
      .map(id => ({
        id,
        ...this.getAllStats()[id]
      }));
  }

  // ===================================================
  // Stat Modification
  // ===================================================

  addBaseStat(statId, amount) {
    if (!this.state.player.stats[statId]) {
      this.state.player.stats[statId] = 0;
    }
    this.state.player.stats[statId] += amount;
    return this.state.player.stats[statId];
  }

  setBonusStats(bonusStats) {
    // Called when equipment changes
    this.state.player.bonusStats = bonusStats;
  }

  // ===================================================
  // Level Up
  // ===================================================

  handleLevelUp(newLevel) {
    // Automatic stat assignment based on level
    const statIndex = (newLevel - 1) % LEVEL_UP_STAT_ORDER.length;
    const statToIncrease = LEVEL_UP_STAT_ORDER[statIndex];
    this.addBaseStat(statToIncrease, 1);
    
    return {
      stat: statToIncrease,
      statName: STAT_DEFINITIONS[statToIncrease].name,
      newValue: this.getBaseStat(statToIncrease)
    };
  }

  // ===================================================
  // Milestones
  // ===================================================

  getMilestoneProgress(milestoneId) {
    const milestone = MILESTONE_DEFINITIONS[milestoneId];
    if (!milestone) return null;

    const currentValue = milestone.getValue(this.state);
    const claimedTier = this.state.player.claimedMilestones[milestoneId] ?? -1;
    
    // Find current tier and next tier
    let currentTierIndex = -1;
    let nextTierIndex = -1;
    
    for (let i = 0; i < milestone.tiers.length; i++) {
      if (currentValue >= milestone.tiers[i].threshold) {
        currentTierIndex = i;
      }
      if (nextTierIndex === -1 && currentValue < milestone.tiers[i].threshold) {
        nextTierIndex = i;
      }
    }

    const nextTier = nextTierIndex >= 0 ? milestone.tiers[nextTierIndex] : null;
    const currentTier = currentTierIndex >= 0 ? milestone.tiers[currentTierIndex] : null;
    
    return {
      milestone,
      currentValue,
      currentTier,
      currentTierIndex,
      nextTier,
      nextTierIndex,
      claimedTier,
      hasUnclaimedReward: currentTierIndex > claimedTier,
      isMaxed: currentTierIndex === milestone.tiers.length - 1,
      progressToNext: nextTier 
        ? Math.min(100, (currentValue / nextTier.threshold) * 100)
        : 100
    };
  }

  getAllMilestoneProgress() {
    return Object.keys(MILESTONE_DEFINITIONS).map(id => this.getMilestoneProgress(id));
  }

  claimMilestoneReward(milestoneId) {
    const progress = this.getMilestoneProgress(milestoneId);
    if (!progress || !progress.hasUnclaimedReward) {
      return null;
    }

    // Claim all unclaimed tiers up to current
    const rewards = [];
    for (let i = progress.claimedTier + 1; i <= progress.currentTierIndex; i++) {
      const tier = progress.milestone.tiers[i];
      if (tier.reward.stat) {
        this.addBaseStat(tier.reward.stat, tier.reward.amount);
        rewards.push({
          type: 'stat',
          stat: tier.reward.stat,
          statName: STAT_DEFINITIONS[tier.reward.stat].name,
          amount: tier.reward.amount,
          tierLabel: tier.label
        });
      }
      if (tier.reward.title) {
        this.unlockTitle(tier.reward.title);
        rewards.push({
          type: 'title',
          title: tier.reward.title,
          tierLabel: tier.label
        });
      }
    }

    this.state.player.claimedMilestones[milestoneId] = progress.currentTierIndex;
    return rewards;
  }

  // ===================================================
  // Achievements
  // ===================================================

  checkAchievement(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return false;
    
    // Already unlocked?
    if (this.state.player.unlockedAchievements.includes(achievementId)) {
      return false;
    }

    // Check condition
    return achievement.check(this.state);
  }

  unlockAchievement(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return null;
    
    if (this.state.player.unlockedAchievements.includes(achievementId)) {
      return null; // Already unlocked
    }

    this.state.player.unlockedAchievements.push(achievementId);
    
    const rewards = [];
    
    // Grant rewards
    if (achievement.reward) {
      if (achievement.reward.stat) {
        this.addBaseStat(achievement.reward.stat, achievement.reward.amount);
        rewards.push({
          type: 'stat',
          stat: achievement.reward.stat,
          statName: STAT_DEFINITIONS[achievement.reward.stat].name,
          amount: achievement.reward.amount
        });
      }
      if (achievement.reward.title) {
        this.unlockTitle(achievement.reward.title);
        rewards.push({
          type: 'title',
          title: achievement.reward.title
        });
      }
    }

    return {
      achievement,
      rewards
    };
  }

  checkAllAchievements() {
    const newlyUnlocked = [];
    
    for (const achievementId of Object.keys(ACHIEVEMENT_DEFINITIONS)) {
      if (this.checkAchievement(achievementId)) {
        const result = this.unlockAchievement(achievementId);
        if (result) {
          newlyUnlocked.push(result);
        }
      }
    }
    
    return newlyUnlocked;
  }

  getAchievementStatus(achievementId) {
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) return null;
    
    const unlocked = this.state.player.unlockedAchievements.includes(achievementId);
    
    return {
      achievement,
      unlocked,
      visible: unlocked || !achievement.hidden
    };
  }

  getAllAchievements() {
    return Object.keys(ACHIEVEMENT_DEFINITIONS).map(id => this.getAchievementStatus(id));
  }

  getVisibleAchievements() {
    return this.getAllAchievements().filter(a => a.visible);
  }

  getUnlockedAchievements() {
    return this.getAllAchievements().filter(a => a.unlocked);
  }

  // ===================================================
  // Titles
  // ===================================================

  unlockTitle(title) {
    if (!this.state.player.titles.includes(title)) {
      this.state.player.titles.push(title);
    }
  }

  setActiveTitle(title) {
    if (this.state.player.titles.includes(title) || title === null) {
      this.state.player.activeTitle = title;
    }
  }

  getActiveTitle() {
    return this.state.player.activeTitle;
  }

  getAllTitles() {
    return this.state.player.titles;
  }

  // ===================================================
  // Stat Effects (Phase 1 Active Stats)
  // ===================================================

  /**
   * Calculate max HP based on Stamina
   * Base 100 + (Stamina * 5)
   */
  calculateMaxHp() {
    const stamina = this.getTotalStat(StatType.STAMINA);
    const baseHp = 100;
    const staminaBonus = stamina * 5;
    const levelBonus = (this.state.player.level - 1) * 10;
    return baseHp + staminaBonus + levelBonus;
  }

  /**
   * Calculate XP multiplier based on Wisdom
   * Base 1.0 + (Wisdom * 0.02) = e.g., 10 Wisdom = 1.2x XP
   */
  calculateXpMultiplier() {
    const wisdom = this.getTotalStat(StatType.WISDOM);
    return 1.0 + (wisdom * 0.02);
  }

  /**
   * Calculate hint quality based on Insight
   * Higher insight = better hints
   * Returns a tier: 0 = basic, 1 = good, 2 = great
   */
  calculateHintTier() {
    const insight = this.getTotalStat(StatType.INSIGHT);
    if (insight >= 15) return 2;
    if (insight >= 8) return 1;
    return 0;
  }
}

// =====================================================
// Helper Functions
// =====================================================

function getStatDefinition(statId) {
  return STAT_DEFINITIONS[statId];
}

function getMilestoneDefinition(milestoneId) {
  return MILESTONE_DEFINITIONS[milestoneId];
}

function getAchievementDefinition(achievementId) {
  return ACHIEVEMENT_DEFINITIONS[achievementId];
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StatType,
    STAT_DEFINITIONS,
    STARTING_STATS,
    MilestoneType,
    MILESTONE_DEFINITIONS,
    ACHIEVEMENT_DEFINITIONS,
    StatsManager,
    getStatDefinition,
    getMilestoneDefinition,
    getAchievementDefinition
  };
}
