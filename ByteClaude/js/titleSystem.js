// ByteQuest - Title System
// Phase 2: Equip and display earned titles

// =====================================================
// Title Definitions
// =====================================================

const TITLE_DEFINITIONS = {
  // Milestone titles
  novice_learner: {
    id: 'novice_learner',
    name: 'Novice Learner',
    description: 'Completed your first lesson',
    source: 'milestone',
    color: '#ffffff'
  },
  vocabulary_apprentice: {
    id: 'vocabulary_apprentice',
    name: 'Vocabulary Apprentice',
    description: 'Learned 25 words',
    source: 'milestone',
    color: '#4a90d9'
  },
  word_collector: {
    id: 'word_collector',
    name: 'Word Collector',
    description: 'Learned 50 words',
    source: 'milestone',
    color: '#4a90d9'
  },
  linguist: {
    id: 'linguist',
    name: 'Linguist',
    description: 'Learned 100 words',
    source: 'milestone',
    color: '#9b59b6'
  },
  polyglot: {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Learned 200 words',
    source: 'milestone',
    color: '#ffd700'
  },
  dedicated_student: {
    id: 'dedicated_student',
    name: 'Dedicated Student',
    description: 'Completed 10 lessons',
    source: 'milestone',
    color: '#4a90d9'
  },
  scholar: {
    id: 'scholar',
    name: 'Scholar',
    description: 'Completed 25 lessons',
    source: 'milestone',
    color: '#9b59b6'
  },
  master_student: {
    id: 'master_student',
    name: 'Master Student',
    description: 'Completed 50 lessons',
    source: 'milestone',
    color: '#ffd700'
  },
  
  // Achievement titles
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieved 5 perfect lessons',
    source: 'achievement',
    color: '#ffd700'
  },
  streak_master: {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Achieved a 10+ answer streak',
    source: 'achievement',
    color: '#e67e22'
  },
  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Recovered from 0 HP through review',
    source: 'achievement',
    color: '#2ecc71'
  },
  
  // Reputation titles (examples - tied to faction rank 5)
  dawnmere_local: {
    id: 'dawnmere_local',
    name: 'Dawnmere Local',
    description: 'Reached Ally rank with Dawnmere Settlers',
    source: 'reputation',
    faction: 'dawnmere_settlers',
    color: '#a0785a'
  },
  old_guard_champion: {
    id: 'old_guard_champion',
    name: 'Champion of the Old Guard',
    description: 'Reached Exalted with The Old Guard',
    source: 'reputation',
    faction: 'old_guard',
    color: '#7a8b99'
  },
  
  // Boss exam titles
  exam_conqueror: {
    id: 'exam_conqueror',
    name: 'Exam Conqueror',
    description: 'Passed your first boss exam',
    source: 'exam',
    color: '#e74c3c'
  },
  perfect_exam: {
    id: 'perfect_exam',
    name: 'Perfect Scholar',
    description: 'Achieved 100% on a boss exam',
    source: 'exam',
    color: '#ffd700'
  },
  
  // Special titles
  founder: {
    id: 'founder',
    name: 'Founder',
    description: 'Played during early access',
    source: 'special',
    color: '#ffd700'
  }
};

// =====================================================
// Title Manager Class
// =====================================================

class TitleManager {
  constructor(gameState) {
    this.state = gameState;
    this.titles = { ...TITLE_DEFINITIONS };
    this.initializePlayerTitles();
  }

  // ===================================================
  // Initialization
  // ===================================================

  /**
   * Initialize player title tracking
   */
  initializePlayerTitles() {
    if (!this.state.player.titles) {
      this.state.player.titles = {
        earned: [],
        equipped: null
      };
    }
  }

  // ===================================================
  // Title Access
  // ===================================================

  /**
   * Get title definition by ID
   */
  getTitle(titleId) {
    return this.titles[titleId] || null;
  }

  /**
   * Get all title definitions
   */
  getAllTitles() {
    return Object.values(this.titles);
  }

  /**
   * Get titles by source
   */
  getTitlesBySource(source) {
    return Object.values(this.titles).filter(title => title.source === source);
  }

  // ===================================================
  // Earned Titles
  // ===================================================

  /**
   * Check if player has earned a title
   */
  hasTitle(titleId) {
    return this.state.player.titles?.earned?.includes(titleId) || false;
  }

  /**
   * Get all earned titles
   */
  getEarnedTitles() {
    const earned = this.state.player.titles?.earned || [];
    return earned
      .map(id => this.getTitle(id))
      .filter(title => title !== null);
  }

  /**
   * Get earned titles count
   */
  getEarnedCount() {
    return this.state.player.titles?.earned?.length || 0;
  }

  /**
   * Get total titles count
   */
  getTotalCount() {
    return Object.keys(this.titles).length;
  }

  /**
   * Award a title to the player
   */
  awardTitle(titleId) {
    const title = this.getTitle(titleId);
    if (!title) {
      return { success: false, message: 'Title not found' };
    }
    
    if (this.hasTitle(titleId)) {
      return { success: false, message: 'Title already earned' };
    }
    
    this.state.player.titles.earned.push(titleId);
    
    return {
      success: true,
      message: `Title Earned: ${title.name}`,
      title
    };
  }

  // ===================================================
  // Equipped Title
  // ===================================================

  /**
   * Get currently equipped title
   */
  getEquippedTitle() {
    const equippedId = this.state.player.titles?.equipped;
    if (!equippedId) return null;
    return this.getTitle(equippedId);
  }

  /**
   * Get equipped title ID
   */
  getEquippedTitleId() {
    return this.state.player.titles?.equipped || null;
  }

  /**
   * Equip a title
   */
  equipTitle(titleId) {
    // Allow null/empty to unequip
    if (!titleId) {
      this.state.player.titles.equipped = null;
      return { success: true, message: 'Title unequipped' };
    }
    
    const title = this.getTitle(titleId);
    if (!title) {
      return { success: false, message: 'Title not found' };
    }
    
    if (!this.hasTitle(titleId)) {
      return { success: false, message: 'You have not earned this title' };
    }
    
    this.state.player.titles.equipped = titleId;
    
    return {
      success: true,
      message: `Now displaying: ${title.name}`,
      title
    };
  }

  /**
   * Unequip current title
   */
  unequipTitle() {
    return this.equipTitle(null);
  }

  // ===================================================
  // Title Display
  // ===================================================

  /**
   * Get display name with title
   */
  getDisplayNameWithTitle(playerName) {
    const title = this.getEquippedTitle();
    if (!title) {
      return playerName;
    }
    return `${playerName}, ${title.name}`;
  }

  /**
   * Get title display info for UI
   */
  getTitleDisplayInfo(titleId) {
    const title = this.getTitle(titleId);
    if (!title) return null;
    
    const earned = this.hasTitle(titleId);
    const equipped = this.getEquippedTitleId() === titleId;
    
    return {
      ...title,
      earned,
      equipped,
      canEquip: earned && !equipped
    };
  }

  /**
   * Get all titles with display info
   */
  getAllTitlesWithInfo() {
    return Object.keys(this.titles).map(id => this.getTitleDisplayInfo(id));
  }

  // ===================================================
  // Dynamic Title Management
  // ===================================================

  /**
   * Add a new title definition
   */
  addTitle(titleData) {
    if (!titleData.id) {
      return { success: false, message: 'Title must have an ID' };
    }
    
    if (this.titles[titleData.id]) {
      return { success: false, message: 'Title ID already exists' };
    }
    
    const title = {
      id: titleData.id,
      name: titleData.name || 'Unknown Title',
      description: titleData.description || '',
      source: titleData.source || 'special',
      color: titleData.color || '#ffffff',
      ...titleData
    };
    
    this.titles[title.id] = title;
    
    return { success: true, title };
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format title for display with color
 */
function formatTitleDisplay(title) {
  if (!title) return '';
  return {
    text: title.name,
    color: title.color,
    html: `<span style="color: ${title.color};">${title.name}</span>`
  };
}

/**
 * Get title rarity based on source
 */
function getTitleRarity(title) {
  if (!title) return 'common';
  
  switch (title.source) {
    case 'special':
      return 'legendary';
    case 'exam':
      return 'rare';
    case 'reputation':
      return 'rare';
    case 'achievement':
      return 'uncommon';
    default:
      return 'common';
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TITLE_DEFINITIONS,
    TitleManager,
    formatTitleDisplay,
    getTitleRarity
  };
}
