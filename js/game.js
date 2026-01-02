// ByteQuest - Main Game Engine
// Phase 1: Dawnmere Vertical Slice

// =====================================================
// Game State Management
// =====================================================

const GameState = {
  // Player data
  player: {
    name: "Traveler",
    class: null,
    language: null,
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    gold: 0,
    inventory: [],
    equipment: {
      helm: null,
      armor: null,
      weapon: null,
      accessory: null,
      ring: null
    },
    // Stats (managed by StatsManager)
    stats: null,
    bonusStats: {},
    // Progression tracking
    reputation: {},
    completedQuests: [],
    activeQuests: [],
    failedQuests: [],
    archivedQuests: [],
    questCompletions: {}, // Track completion counts and timestamps for repeatable quests
    discoveredLocations: ["dawnmere"],
    metNpcs: [],
    // Titles and achievements
    titles: [],
    activeTitle: null,
    unlockedAchievements: [],
    claimedMilestones: {},
    // Learning stats
    vocabulary: {},
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    lessonsCompleted: 0,
    perfectLessons: 0,
    currentStreak: 0,
    longestStreak: 0,
    // Economy tracking
    totalGoldEarned: 0,
    totalGoldSpent: 0,
    // Special tracking
    reviewRecoveries: 0,
    hiddenQuestsFound: 0,
    seasonalQuestsCompleted: 0,
    studiedAfterMidnight: false,
    studiedBeforeSix: false,
    freeReviveUsed: false,
    // Spellbook
    spellbook: {
      unlockedPages: ["pronouns"],
      lastViewed: null
    },
    // Feature unlocks (alchemy, smithing, etc.)
    unlockedFeatures: [],
    // Skills (gathering and crafting)
    skills: {
      mining: { level: 1, xp: 0 },
      woodcutting: { level: 1, xp: 0 },
      herbalism: { level: 1, xp: 0 },
      fishing: { level: 1, xp: 0 },
      hunting: { level: 1, xp: 0 },
      alchemy: { level: 1, xp: 0 },
      smithing: { level: 1, xp: 0 },
      enchanting: { level: 1, xp: 0 }
    },
    // Unlocked gathering/crafting professions per location
    // Format: { location: [skills] } - skills must be unlocked in each zone
    unlockedGathering: {
      dawnmere: ["mining", "herbalism"]
    },
    unlockedCrafting: [],
    // Meta
    createdAt: null,
    playTime: 0
  },

  // Game progress
  currentLocation: "dawnmere",
  currentScreen: "title", // title, game, lesson, inventory, map, questlog
  activeDialog: null,
  selectedQuest: null,
  questFilter: "all", // all, active, available, completed, daily, weekly

  // Lesson state
  lessonState: {
    active: false,
    questId: null,
    objectiveId: null,
    vocabulary: [],
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    currentMultiplier: 1.0,
    totalBonusXP: 0,
    totalBonusGold: 0,
    usedStreakProtection: false
  },

  // Settings
  settings: {
    // Audio
    masterVolume: 80,
    musicVolume: 60,
    sfxVolume: 80,
    muteAll: false,
    // Display
    textSpeed: "normal", // slow, normal, fast
    fontSize: "medium", // small, medium, large
    uiTheme: "art", // art, pixel
    screenShake: true,
    animations: true,
    // Gameplay
    hintAutoShow: false,
    confirmActions: true,
    autoSave: true,
    // Learning
    questionCount: 1, // 1, 3, 5, 8, 10
    showHints: "request", // always, request, never
    reviewReminders: true,
    keyboardShortcuts: true,
    // Accessibility
    highContrast: false,
    dyslexiaFont: false,
    colorBlindMode: "off" // off, deuteranopia, protanopia, tritanopia
  },
  
  // Settings tab tracking
  settingsTab: "audio",

  // Tutorial state (tracks first-time events for arrival tutorial)
  tutorial: {
    completed: {
      intro: false,           // Saw intro narrator dialogue
      clickedNpc: false,      // Clicked first NPC
      acceptedQuest: false,   // Accepted first quest
      startedLesson: false,   // Started first lesson
      answeredQuestion: false,// Answered first question
      wrongAnswer: false,     // Got first wrong answer
      completedLesson: false, // Completed first lesson
      completedQuest: false,  // Completed first quest
      usedInventory: false,   // Opened inventory
      usedMap: false,         // Opened map
      gainedReputation: false, // Gained reputation for first time
      viewedStats: false,     // Viewed stats/profile screen
      viewedReputation: false // Viewed reputation tab
    },
    skipAll: false,           // User chose to skip tutorials
    currentTip: null          // Currently showing tip
  }
};

// =====================================================
// Security Utilities
// =====================================================

/**
 * Escape HTML special characters to prevent XSS
 * Use for any dynamic content inserted via innerHTML
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize Quest Manager (after GAME_DATA loads)
let questManager = null;

// Initialize Spaced Repetition Manager
let srManager = null;

// Initialize Stats Manager
let statsManager = null;

// Initialize Reputation Manager
let reputationManager = null;

// Initialize Item Manager
let itemManager = null;

// Initialize Shop Manager
let shopManager = null;

// Initialize Hint Manager
let hintManager = null;

// Initialize Location Manager
let locationManager = null;

// Initialize Boss Exam Manager
let bossExamManager = null;

// Initialize Title Manager
let titleManager = null;

// Initialize Alchemy Manager
let alchemyManager = null;

// Initialize Smithing Manager
let smithingManager = null;

// Initialize Enchanting Manager
let enchantingManager = null;

// Initialize Village Projects Manager
let villageProjectsManager = null;

// =====================================================
// Bonus Calculator - Idleon-style Visible Stacking
// =====================================================

/**
 * BonusCalculator - Tracks and displays all bonus sources
 * Shows: Base + Additive Bonuses × Multiplicative Bonuses = Total
 */
const BonusCalculator = {
  /**
   * Calculate XP with full breakdown
   * @param {number} baseXP - Base XP before bonuses
   * @param {object} context - Context for bonus calculation (streak, lessonType, etc.)
   * @returns {object} - { total, breakdown: [{source, type, value, formatted}] }
   */
  calculateXP(baseXP, context = {}) {
    const breakdown = [];
    let additive = 0;
    let multiplicative = 1.0;

    // Start with base
    breakdown.push({
      source: 'Base XP',
      type: 'base',
      value: baseXP,
      formatted: `${baseXP}`
    });

    // Streak bonus (multiplicative) - requires streak_xp_bonus unlock from Village Well project
    const hasStreakUnlock = villageProjectsManager?.hasUnlock('streak_xp_bonus') || false;
    if (hasStreakUnlock && context.streak && context.streak > 0) {
      const streakMultiplier = getMultiplierForStreak(context.streak);
      if (streakMultiplier > 1) {
        multiplicative *= streakMultiplier;
        breakdown.push({
          source: `${context.streak} Answer Streak`,
          type: 'multiplier',
          value: streakMultiplier,
          formatted: `×${streakMultiplier.toFixed(1)}`
        });
      }
    }

    // Account progression XP multiplier
    if (typeof accountProgression !== 'undefined' && accountProgression) {
      const effects = accountProgression.getActiveEffects();
      if (effects.xpMultiplier && effects.xpMultiplier > 1) {
        multiplicative *= effects.xpMultiplier;
        breakdown.push({
          source: 'Account Mastery',
          type: 'multiplier',
          value: effects.xpMultiplier,
          formatted: `×${effects.xpMultiplier.toFixed(2)}`
        });
      }
      // Flat XP bonus from account upgrades
      if (effects.xpBonus && effects.xpBonus > 0) {
        additive += effects.xpBonus;
        breakdown.push({
          source: 'Quick Learner',
          type: 'additive',
          value: effects.xpBonus,
          formatted: `+${effects.xpBonus}`
        });
      }
    }

    // Equipment XP bonuses (additive percentage converted to flat)
    const equipBonuses = this.getEquipmentBonuses('xp');
    if (equipBonuses.total > 0) {
      const equipFlat = Math.floor(baseXP * equipBonuses.total);
      additive += equipFlat;
      breakdown.push({
        source: 'Equipment',
        type: 'additive',
        value: equipFlat,
        formatted: `+${equipFlat}`,
        details: equipBonuses.sources
      });
    }

    // Title bonuses (if any XP-related titles exist)
    const titleBonus = this.getTitleBonus('xp');
    if (titleBonus.value > 0) {
      const titleFlat = Math.floor(baseXP * titleBonus.value);
      additive += titleFlat;
      breakdown.push({
        source: titleBonus.source,
        type: 'additive',
        value: titleFlat,
        formatted: `+${titleFlat}`
      });
    }

    // Perfect lesson bonus (additive)
    if (context.isPerfect) {
      const perfectBonus = Math.floor(baseXP * 0.25); // 25% bonus for perfect
      additive += perfectBonus;
      breakdown.push({
        source: 'Perfect Lesson',
        type: 'additive',
        value: perfectBonus,
        formatted: `+${perfectBonus}`
      });
    }

    // Calculate total: (base + additive) × multiplicative
    const subtotal = baseXP + additive;
    const total = Math.floor(subtotal * multiplicative);

    return {
      base: baseXP,
      additive,
      multiplicative,
      subtotal,
      total,
      breakdown
    };
  },

  /**
   * Calculate gathering yield with full breakdown
   * @param {number} baseYield - Base resource amount
   * @param {string} skillType - mining, fishing, herbalism, etc.
   * @param {object} context - Additional context
   */
  calculateGathering(baseYield, skillType, context = {}) {
    const breakdown = [];
    let additive = 0;
    let multiplicative = 1.0;

    breakdown.push({
      source: 'Base Yield',
      type: 'base',
      value: baseYield,
      formatted: `${baseYield}`
    });

    // Skill level bonus (additive)
    const skills = GameState.player.skills?.[skillType];
    if (skills && skills.level > 1) {
      const skillBonus = Math.floor((skills.level - 1) * 0.1 * baseYield);
      if (skillBonus > 0) {
        additive += skillBonus;
        breakdown.push({
          source: `${this.capitalize(skillType)} Lv.${skills.level}`,
          type: 'additive',
          value: skillBonus,
          formatted: `+${skillBonus}`
        });
      }
    }

    // Equipment bonuses for gathering
    const equipBonuses = this.getEquipmentBonuses(skillType);
    if (equipBonuses.total > 0) {
      const equipBonus = Math.floor(baseYield * equipBonuses.total);
      additive += equipBonus;
      breakdown.push({
        source: 'Equipment',
        type: 'additive',
        value: equipBonus,
        formatted: `+${equipBonus}`,
        details: equipBonuses.sources
      });
    }

    // Account progression gathering bonus (flat additive)
    if (typeof accountProgression !== 'undefined' && accountProgression) {
      const effects = accountProgression.getActiveEffects();
      if (effects.gatheringBonus && effects.gatheringBonus > 0) {
        additive += effects.gatheringBonus;
        breakdown.push({
          source: 'Bountiful Harvest',
          type: 'additive',
          value: effects.gatheringBonus,
          formatted: `+${effects.gatheringBonus}`
        });
      }
    }

    // Lucky proc (multiplicative chance-based)
    if (context.luckyProc) {
      multiplicative *= 2;
      breakdown.push({
        source: 'Lucky Find!',
        type: 'multiplier',
        value: 2,
        formatted: '×2'
      });
    }

    const subtotal = baseYield + additive;
    const total = Math.floor(subtotal * multiplicative);

    return {
      base: baseYield,
      additive,
      multiplicative,
      subtotal,
      total,
      breakdown
    };
  },

  /**
   * Get all XP/stat bonuses from equipped items
   */
  getEquipmentBonuses(bonusType) {
    const sources = [];
    let total = 0;

    if (!GameState.player.equipment) return { total: 0, sources: [] };

    Object.entries(GameState.player.equipment).forEach(([slot, itemId]) => {
      if (!itemId) return;

      const item = GAME_DATA.items?.[itemId];
      if (!item || !item.stats) return;

      // Check for relevant bonus
      let bonus = 0;
      if (bonusType === 'xp' && item.stats.xpBonus) {
        bonus = item.stats.xpBonus;
      } else if (item.stats[bonusType + 'Bonus']) {
        bonus = item.stats[bonusType + 'Bonus'];
      }

      if (bonus > 0) {
        total += bonus;
        sources.push({ name: item.name, value: bonus });
      }
    });

    return { total, sources };
  },

  /**
   * Get bonus from active title
   */
  getTitleBonus(bonusType) {
    if (!GameState.player.activeTitle) return { value: 0, source: null };

    const title = GAME_DATA.titles?.[GameState.player.activeTitle];
    if (!title || !title.effects) return { value: 0, source: null };

    if (bonusType === 'xp' && title.effects.xpBonus) {
      return { value: title.effects.xpBonus, source: title.name };
    }

    return { value: 0, source: null };
  },

  /**
   * Format a breakdown for display in UI
   */
  formatBreakdownHTML(calculation) {
    let html = '<div class="bonus-breakdown">';

    calculation.breakdown.forEach((item, index) => {
      const typeClass = `breakdown-${item.type}`;
      const prefix = index === 0 ? '' : (item.type === 'multiplier' ? '' : '');

      html += `<div class="breakdown-row ${typeClass}">`;
      html += `<span class="breakdown-source">${item.source}</span>`;
      html += `<span class="breakdown-value">${item.formatted}</span>`;
      html += '</div>';

      // Show details if present (e.g., individual equipment pieces)
      if (item.details && item.details.length > 0) {
        item.details.forEach(detail => {
          html += `<div class="breakdown-detail">`;
          html += `<span class="detail-source">  └ ${detail.name}</span>`;
          html += `<span class="detail-value">+${Math.floor(detail.value * 100)}%</span>`;
          html += '</div>';
        });
      }
    });

    // Show total
    html += '<div class="breakdown-total">';
    html += '<span class="breakdown-source">Total</span>';
    html += `<span class="breakdown-value">${calculation.total}</span>`;
    html += '</div>';

    html += '</div>';
    return html;
  },

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

// =====================================================
// Save/Load System
// =====================================================

function saveGame() {
  try {
    const saveData = {
      player: GameState.player,
      currentLocation: GameState.currentLocation,
      tutorial: GameState.tutorial,
      timestamp: Date.now()
    };
    localStorage.setItem('bytequest_save', JSON.stringify(saveData));
    showNotification("Game Saved!");
  } catch (error) {
    console.error('Save failed:', error);
    showNotification("Failed to save game!", 'error');
  }
}

// Auto-save respects settings - use this for automatic saves
function autoSave() {
  if (GameState.settings?.autoSave !== false) {
    try {
      const saveData = {
        player: GameState.player,
        currentLocation: GameState.currentLocation,
        tutorial: GameState.tutorial,
        timestamp: Date.now()
      };
      localStorage.setItem('bytequest_save', JSON.stringify(saveData));
      // Silent save - no notification for auto-saves
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }
}

function loadGame() {
  try {
    const saveData = localStorage.getItem('bytequest_save');
    if (saveData) {
      const data = JSON.parse(saveData);
      GameState.player = { ...GameState.player, ...data.player };
      GameState.currentLocation = data.currentLocation;

      // Sync player.locations.current with currentLocation for locationManager compatibility
      if (!GameState.player.locations) {
        GameState.player.locations = {
          current: data.currentLocation || 'dawnmere',
          discovered: GameState.player.discoveredLocations || ['dawnmere'],
          unlocked: GameState.player.discoveredLocations || ['dawnmere']
        };
      } else {
        GameState.player.locations.current = data.currentLocation || 'dawnmere';
      }

      // Load tutorial state if it exists
      if (data.tutorial) {
        GameState.tutorial = { ...GameState.tutorial, ...data.tutorial };
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Load failed:', error);
    showNotification("Failed to load save data!", 'error');
    return false;
  }
}

function resetGame() {
  localStorage.removeItem('bytequest_save');
  location.reload();
}

// =====================================================
// UI Rendering Functions
// =====================================================

function renderHUD() {
  const player = GameState.player;
  
  // Player name and level
  const playerName = document.querySelector('.player-name');
  const playerLevel = document.querySelector('.player-level');
  if (playerName) playerName.textContent = player.name;
  if (playerLevel) playerLevel.textContent = `Level ${player.level} ${player.class ? player.class.charAt(0).toUpperCase() + player.class.slice(1) : ''}`;
  
  // HP Bar
  const hpPercent = (player.hp / player.maxHp) * 100;
  const hpFill = document.querySelector('.hp-bar .bar-fill');
  const hpValue = document.querySelector('.hp-bar .stat-value');
  if (hpFill) hpFill.style.width = `${hpPercent}%`;
  if (hpValue) hpValue.textContent = `${player.hp}/${player.maxHp}`;
  
  // XP Bar
  const xpPercent = (player.xp / player.xpToNext) * 100;
  const xpFill = document.querySelector('.xp-bar .bar-fill');
  const xpValue = document.querySelector('.xp-bar .stat-value');
  if (xpFill) xpFill.style.width = `${xpPercent}%`;
  if (xpValue) xpValue.textContent = `${player.xp}/${player.xpToNext}`;
  
  // Gold
  const goldValue = document.querySelector('.gold .currency-value');
  if (goldValue) goldValue.textContent = player.gold;
}

/**
 * Update visibility of nav buttons based on unlocked features
 */
function updateNavButtonVisibility() {
  const unlockedFeatures = GameState.player.unlockedFeatures || [];

  // Find all nav buttons with data-feature attribute
  document.querySelectorAll('.nav-btn[data-feature]').forEach(btn => {
    const feature = btn.getAttribute('data-feature');
    if (unlockedFeatures.includes(feature)) {
      btn.style.display = '';
      btn.classList.remove('feature-locked');
    } else {
      btn.style.display = 'none';
      btn.classList.add('feature-locked');
    }
  });
}

function renderLocation() {
  // Get current location ID from multiple sources for robustness
  let locationId = GameState.currentLocation;
  if (locationManager) {
    locationId = locationManager.getCurrentLocationId();
  } else if (GameState.player.locations?.current) {
    locationId = GameState.player.locations.current;
  }

  // Get location data - try locationManager first, then GAME_DATA
  let location;
  if (locationManager) {
    location = locationManager.getLocation(locationId);
  }
  if (!location) {
    location = GAME_DATA.locations[locationId];
  }
  if (!location) {
    location = LOCATION_DEFINITIONS?.[locationId];
  }

  if (!location) {
    console.warn('No location found for:', locationId);
    return;
  }

  // Update location header
  const locName = document.querySelector('.location-name');
  const locDesc = document.querySelector('.location-desc');
  if (locName) locName.textContent = location.name;
  if (locDesc) locDesc.textContent = location.description;

  // Render NPCs in scene
  renderNPCs(location);

  // Render hotspots in scene
  renderHotspots(location);
}

// =====================================================
// NPC State Resolution
// =====================================================

/**
 * Get NPC data with stateOverrides applied based on current game state.
 * Resolves dynamic NPC properties like location and dialogue based on quest progress.
 */
function getNPC(npcId) {
  const baseNPC = GAME_DATA.npcs[npcId];
  if (!baseNPC) return null;

  // If no state overrides, return base NPC
  if (!baseNPC.stateOverrides || baseNPC.stateOverrides.length === 0) {
    return baseNPC;
  }

  // Create a copy to modify
  const npc = { ...baseNPC };

  // Find the first matching state override (order matters - first match wins)
  for (const override of baseNPC.stateOverrides) {
    if (checkStateCondition(override.when)) {
      // Apply override properties (dialogue, location, title, etc.)
      if (override.dialogue) {
        npc.dialogue = { ...npc.dialogue, ...override.dialogue };
      }
      if (override.location) {
        npc.location = override.location;
      }
      if (override.title) {
        npc.title = override.title;
      }
      if (override.hidden !== undefined) {
        npc.hidden = override.hidden;
      }
      // First matching override wins
      break;
    }
  }

  return npc;
}

/**
 * Check if a state condition is met.
 * Supports: quest (completed), questActive, questNotStarted
 */
function checkStateCondition(condition) {
  if (!condition) return false;

  // Check all conditions in the object (all must match)
  for (const [key, value] of Object.entries(condition)) {
    switch (key) {
      case 'quest':
        // Quest must be completed
        if (!GameState.player.completedQuests.includes(value)) {
          return false;
        }
        break;
      case 'questActive':
        // Quest must be currently active
        if (!GameState.player.activeQuests.some(q => q.id === value)) {
          return false;
        }
        break;
      case 'questNotStarted':
        // Quest must NOT be active or completed
        if (GameState.player.completedQuests.includes(value) ||
            GameState.player.activeQuests.some(q => q.id === value)) {
          return false;
        }
        break;
      case 'reputation':
        // Check reputation threshold: { reputation: { faction: minValue } }
        if (typeof value === 'object') {
          for (const [faction, minRep] of Object.entries(value)) {
            const currentRep = GameState.player.reputation?.[faction] || 0;
            if (currentRep < minRep) return false;
          }
        }
        break;
      default:
        // Unknown condition type
        console.warn('Unknown state condition:', key);
        break;
    }
  }

  return true;
}

function renderNPCs(location) {
  const scene = document.getElementById('game-scene');
  if (!scene) return;

  // Clear existing NPCs
  scene.querySelectorAll('.npc-sprite').forEach(el => el.remove());
  
  // Add NPCs for this location - expanded positions to avoid overlap
  const npcPositions = [
    { x: 8, y: 60 },
    { x: 20, y: 52 },
    { x: 32, y: 64 },
    { x: 44, y: 56 },
    { x: 56, y: 62 },
    { x: 68, y: 54 },
    { x: 80, y: 60 },
    { x: 92, y: 56 },
    { x: 14, y: 48 },
    { x: 38, y: 48 },
    { x: 62, y: 48 },
    { x: 86, y: 48 }
  ];
  
  // Collect all NPCs that should be in this location
  // This includes: NPCs in location.npcs whose resolved location is here,
  // AND NPCs from other locations who have moved here via stateOverrides
  const npcsToShow = new Set();

  // Check location's default NPCs
  if (location.npcs) {
    location.npcs.forEach(npcId => {
      const npc = getNPC(npcId);
      if (npc && npc.location === location.id) {
        npcsToShow.add(npcId);
      }
    });
  }

  // Check all NPCs for any that have moved to this location via stateOverrides
  Object.keys(GAME_DATA.npcs).forEach(npcId => {
    const baseNPC = GAME_DATA.npcs[npcId];
    if (baseNPC.stateOverrides && baseNPC.stateOverrides.length > 0) {
      const resolvedNPC = getNPC(npcId);
      if (resolvedNPC && resolvedNPC.location === location.id) {
        npcsToShow.add(npcId);
      }
    }
  });

  // Filter to only visible NPCs
  let visibleIndex = 0;
  npcsToShow.forEach((npcId) => {
    const npc = getNPC(npcId);
    if (!npc) return;

    // Check visibility using new system
    if (typeof isNPCVisible === 'function' && !isNPCVisible(npc, GameState)) {
      return;
    }
    
    const pos = npcPositions[visibleIndex % npcPositions.length];
    const sprite = document.createElement('div');
    sprite.className = 'npc-sprite';
    sprite.setAttribute('data-npc', npcId);
    sprite.setAttribute('data-emoji', getNPCEmoji(npc));
    sprite.style.left = `${pos.x}%`;
    sprite.style.bottom = `${pos.y}%`;
    // Z-index based on vertical position (lower = closer = higher z-index)
    sprite.style.zIndex = Math.floor(100 - pos.y);
    
    // Add name tag
    const nameTag = document.createElement('div');
    nameTag.className = 'npc-name';
    nameTag.textContent = npc.name;
    sprite.appendChild(nameTag);
    
    // Add quest marker if NPC has available quest or quest ready to turn in
    if (hasAvailableQuest(npcId)) {
      const marker = document.createElement('div');
      marker.className = 'quest-marker';
      marker.textContent = '❗';
      sprite.appendChild(marker);
    } else if (hasQuestReadyToTurnIn(npcId)) {
      // Only show ❓ when quest objectives are ALL complete (ready to turn in)
      const marker = document.createElement('div');
      marker.className = 'quest-marker quest-marker-turnin';
      marker.textContent = '❓';
      sprite.appendChild(marker);
    }
    // No marker for in-progress quests - this was causing confusion
    
    sprite.addEventListener('click', () => interactWithNPC(npcId));
    scene.appendChild(sprite);
    visibleIndex++;
  });
}

function getNPCEmoji(npc) {
  const emojiMap = {
    'urma': '👵',
    'rega': '👨‍🌾',
    'merchant': '🧳',
    'dave': '🌿',
    'lyra': '👩‍🌾',
    'baker': '👨‍🍳',
    'sage_aldric': '🧙',
    'old_pieron': '👴',
    // Filler NPCs - Dawnmere
    'yris': '🎣',
    'brother_varek': '⛪',
    'tommen': '👦',
    'widow_senna': '🧵',
    'old_jorel': '🍺',
    // Filler NPCs - Haari Fields
    'venn': '🎵',
    'rask': '🏹',
    'the_veiled_one': '🔮'
  };
  return emojiMap[npc.id] || '👤';
}

function renderHotspots(location) {
  const scene = document.getElementById('game-scene');
  if (!scene) return;

  // Clear existing hotspots
  scene.querySelectorAll('.hotspot-sprite').forEach(el => el.remove());

  // Check if location has hotspots
  if (!location.hotspots || location.hotspots.length === 0) return;

  // Initialize searched hotspots tracking if needed
  if (!GameState.player.searchedHotspots) {
    GameState.player.searchedHotspots = [];
  }

  // Hotspot positions (different from NPC positions)
  const hotspotPositions = [
    { x: 15, y: 30 },
    { x: 75, y: 35 },
    { x: 45, y: 25 }
  ];

  let visibleIndex = 0;
  location.hotspots.forEach((hotspot) => {
    // Check if already searched
    const isSearched = GameState.player.searchedHotspots.includes(hotspot.id);

    // Check reputation requirement
    let canAccess = true;
    if (hotspot.requiredRep) {
      const currentRep = GameState.player.reputation?.[hotspot.requiredRep.faction] || 0;
      canAccess = currentRep >= hotspot.requiredRep.amount;
    }

    // Check quest requirement
    if (hotspot.requiredQuest) {
      const hasQuest = GameState.player.activeQuests?.some(q => q.id === hotspot.requiredQuest) ||
                       GameState.player.completedQuests?.includes(hotspot.requiredQuest);
      if (!hasQuest) canAccess = false;
    }

    // Check repeatable hotspot cooldown
    if (hotspot.repeatable && hotspot.cooldown) {
      const lastUsed = GameState.player.hotspotCooldowns?.[hotspot.id];
      if (lastUsed) {
        const elapsed = Date.now() - lastUsed;
        if (elapsed < hotspot.cooldown) {
          canAccess = false; // Still on cooldown
        }
      }
    }

    // Don't show if already searched (unless repeatable and off cooldown)
    if (isSearched && !hotspot.repeatable) return;

    // Don't show if can't access yet
    if (!canAccess) return;

    const pos = hotspotPositions[visibleIndex % hotspotPositions.length];
    const sprite = document.createElement('div');
    sprite.className = 'hotspot-sprite';
    sprite.setAttribute('data-hotspot', hotspot.id);
    sprite.style.left = `${pos.x}%`;
    sprite.style.bottom = `${pos.y}%`;
    sprite.style.zIndex = Math.floor(100 - pos.y);

    // Hotspot icon (sparkle to indicate something interesting)
    const icon = document.createElement('div');
    icon.className = 'hotspot-icon';
    icon.textContent = '✨';
    sprite.appendChild(icon);

    // Name tag
    const nameTag = document.createElement('div');
    nameTag.className = 'hotspot-name';
    nameTag.textContent = hotspot.name;
    sprite.appendChild(nameTag);

    sprite.addEventListener('click', () => interactWithHotspot(hotspot.id));
    scene.appendChild(sprite);
    visibleIndex++;
  });
}

function interactWithHotspot(hotspotId) {
  // Find the hotspot in current location
  const location = GAME_DATA.locations[GameState.currentLocation];
  if (!location || !location.hotspots) return;

  const hotspot = location.hotspots.find(h => h.id === hotspotId);
  if (!hotspot) return;

  // Check if already searched
  if (GameState.player.searchedHotspots?.includes(hotspotId)) {
    showNotification('You\'ve already searched here.', 'info');
    return;
  }

  // Check reputation requirement
  if (hotspot.requiredRep) {
    const currentRep = GameState.player.reputation?.[hotspot.requiredRep.faction] || 0;
    if (currentRep < hotspot.requiredRep.amount) {
      showNotification('Something tells you this isn\'t the right time...', 'info');
      return;
    }
  }

  // Show hotspot interaction modal
  showHotspotModal(hotspot);
}

function showHotspotModal(hotspot) {
  // Create modal content
  const modalHtml = `
    <div class="modal-overlay active" id="hotspot-modal">
      <div class="modal-content hotspot-modal">
        <div class="modal-header">
          <h3>✨ ${hotspot.name}</h3>
        </div>
        <div class="modal-body">
          <p class="hotspot-description">${hotspot.description}</p>
          <div class="hotspot-actions">
            <button class="btn btn-primary" onclick="searchHotspot('${hotspot.id}')">Search</button>
            <button class="btn btn-secondary" onclick="closeHotspotModal()">Leave</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeHotspotModal() {
  const modal = document.getElementById('hotspot-modal');
  if (modal) modal.remove();
}

function searchHotspot(hotspotId) {
  // Find the hotspot
  const location = GAME_DATA.locations[GameState.currentLocation];
  const hotspot = location?.hotspots?.find(h => h.id === hotspotId);
  if (!hotspot) {
    closeHotspotModal();
    return;
  }

  // Mark as searched
  if (!GameState.player.searchedHotspots) {
    GameState.player.searchedHotspots = [];
  }
  GameState.player.searchedHotspots.push(hotspotId);

  // Close the initial modal
  closeHotspotModal();

  // Show discovery text
  const discoveryHtml = `
    <div class="modal-overlay active" id="hotspot-discovery-modal">
      <div class="modal-content hotspot-modal">
        <div class="modal-header">
          <h3>🔍 Discovery</h3>
        </div>
        <div class="modal-body">
          <p class="hotspot-search-text">${hotspot.searchText}</p>
          <div class="hotspot-actions">
            <button class="btn btn-primary" onclick="claimHotspotArtifact('${hotspot.id}')">Take It</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', discoveryHtml);
}

function claimHotspotArtifact(hotspotId) {
  // Find the hotspot
  const location = GAME_DATA.locations[GameState.currentLocation];
  const hotspot = location?.hotspots?.find(h => h.id === hotspotId);

  // Close discovery modal
  const modal = document.getElementById('hotspot-discovery-modal');
  if (modal) modal.remove();

  if (!hotspot) return;

  // Unlock artifact if present
  if (hotspot.artifactId && typeof unlockArtifact === 'function') {
    unlockArtifact(hotspot.artifactId);
  }

  // Give item reward if present
  if (hotspot.itemReward) {
    const itemId = hotspot.itemReward.id;
    const count = hotspot.itemReward.count || 1;
    addToInventory(itemId, count);
    const itemData = GAME_DATA.items[itemId];
    showNotification(`Found ${count}x ${itemData?.name || itemId}!`, 'success');

    // Track repeatable hotspot cooldowns
    if (hotspot.repeatable) {
      if (!GameState.player.hotspotCooldowns) {
        GameState.player.hotspotCooldowns = {};
      }
      GameState.player.hotspotCooldowns[hotspotId] = Date.now();
      // Remove from searched so it can be searched again after cooldown
      const searchedIndex = GameState.player.searchedHotspots?.indexOf(hotspotId);
      if (searchedIndex > -1) {
        GameState.player.searchedHotspots.splice(searchedIndex, 1);
      }
    }
  }

  // Re-render to remove/update the hotspot in scene
  renderLocation();

  // Auto-save
  autoSave();
}

function renderQuestPanel() {
  const panel = document.querySelector('#right-sidebar .panel-content');
  if (!panel) {
    console.warn('Quest panel element not found');
    return;
  }
  
  const filter = GameState.questFilter || 'all';
  
  // Build filter tabs
  let filterHtml = `
    <div class="quest-filters">
      <button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
      <button class="filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active</button>
      <button class="filter-btn ${filter === 'available' ? 'active' : ''}" data-filter="available">New</button>
      <button class="filter-btn ${filter === 'daily' ? 'active' : ''}" data-filter="daily">Daily</button>
      <button class="filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Done</button>
    </div>
  `;
  
  let html = filterHtml;
  
  // Get quests based on filter
  const activeQuests = questManager ? questManager.getActiveQuests() : getActiveQuests();
  const availableQuests = questManager ? questManager.getAvailableQuests() : getAvailableQuests();
  const completedQuests = questManager ? questManager.getCompletedQuests() : [];
  const failedQuests = questManager ? questManager.getFailedQuests() : [];
  
  // Filter logic
  let showActive = filter === 'all' || filter === 'active';
  let showAvailable = filter === 'all' || filter === 'available';
  let showCompleted = filter === 'completed';
  let showDaily = filter === 'daily';
  
  // Active quests
  if (showActive && activeQuests.length > 0) {
    html += '<div class="quest-section"><h3 class="quest-section-header">⚔️ ACTIVE</h3>';
    activeQuests.forEach(quest => {
      html += renderQuestItem(quest, QuestStatus.ACTIVE);
    });
    html += '</div>';
  }
  
  // Available quests
  if (showAvailable) {
    let quests = availableQuests;
    if (quests.length > 0) {
      html += '<div class="quest-section"><h3 class="quest-section-header">❗ AVAILABLE</h3>';
      quests.forEach(quest => {
        html += renderQuestItem(quest, QuestStatus.AVAILABLE);
      });
      html += '</div>';
    }
  }
  
  // Daily/Weekly quests filter
  if (showDaily) {
    const dailyQuests = [...activeQuests, ...availableQuests].filter(q => 
      q.type === QuestType.DAILY || q.type === QuestType.WEEKLY
    );
    if (dailyQuests.length > 0) {
      html += '<div class="quest-section"><h3 class="quest-section-header">📅 DAILY & WEEKLY</h3>';
      dailyQuests.forEach(quest => {
        html += renderQuestItem(quest, quest.status);
      });
      html += '</div>';
    } else {
      html += '<div class="quest-section"><p class="no-quests">No daily or weekly quests available</p></div>';
    }
  }
  
  // Completed quests
  if (showCompleted && completedQuests.length > 0) {
    html += '<div class="quest-section"><h3 class="quest-section-header">✅ COMPLETED</h3>';
    completedQuests.slice(0, 10).forEach(quest => { // Show last 10
      html += renderQuestItem(quest, QuestStatus.COMPLETED);
    });
    html += '</div>';
  }
  
  // Failed quests
  if (showCompleted && failedQuests.length > 0) {
    html += '<div class="quest-section"><h3 class="quest-section-header">❌ FAILED</h3>';
    failedQuests.forEach(quest => {
      html += renderQuestItem(quest, QuestStatus.FAILED);
    });
    html += '</div>';
  }
  
  // Empty state
  if (html === filterHtml) {
    html += '<p class="no-quests">No quests to display</p>';
  }
  
  panel.innerHTML = html;
  
  // Add filter click handlers
  panel.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      GameState.questFilter = btn.dataset.filter;
      renderQuestPanel();
    });
  });
  
  // Add quest click handlers
  panel.querySelectorAll('.quest-item').forEach(item => {
    item.addEventListener('click', () => {
      const questId = item.dataset.quest;
      selectQuest(questId);
    });
  });
}

function renderQuestItem(quest, status) {
  if (!quest || !quest.id) {
    console.warn('Invalid quest passed to renderQuestItem');
    return '';
  }
  
  const isSelected = GameState.selectedQuest === quest.id;
  const questData = getQuest(quest.id) || quest;
  
  if (!questData.type) {
    console.warn('Quest missing type:', quest.id);
    return '';
  }
  
  // Get type and category info
  const typeInfo = getQuestTypeInfo(questData.type);
  const categoryInfo = getQuestCategoryInfo(questData.category);

  // Build objectives HTML if selected
  let objectivesHtml = '';
  if (isSelected && questData.objectives) {
    objectivesHtml = '<div class="quest-objectives">';
    questData.objectives.forEach(obj => {
      const progress = quest.objectives?.find(o => o.id === obj.id);
      const completed = progress?.completed || false;
      const count = progress?.count || 0;
      
      let objText = obj.text;
      if (obj.target) {
        objText = obj.text.replace(/\(.*\)/, '') + ` (${count}/${obj.target})`;
      }
      
      objectivesHtml += `
        <div class="objective ${completed ? 'completed' : ''}">
          <div class="objective-check">${completed ? '✓' : ''}</div>
          <span>${objText}</span>
        </div>
      `;
    });
    objectivesHtml += '</div>';
  }
  
  // Build timing info (for daily/weekly/timed quests)
  let timingHtml = '';
  if (questData.type === QuestType.TIMED && quest.startedAt && questData.timeLimit) {
    const remaining = questManager ? questManager.getTimeRemaining(quest.id) : null;
    if (remaining !== null) {
      timingHtml = `<div class="quest-timing">⏱️ ${formatTimeRemaining(remaining)}</div>`;
    }
  } else if ((questData.type === QuestType.DAILY || questData.type === QuestType.WEEKLY) && status === QuestStatus.COMPLETED) {
    const cooldown = questManager ? questManager.getCooldownRemaining(quest.id) : null;
    if (cooldown !== null && cooldown > 0) {
      timingHtml = `<div class="quest-timing">🔄 Resets in ${formatTimeRemaining(cooldown)}</div>`;
    }
  }
  
  // Repeat indicator
  let repeatHtml = '';
  if (quest.isRepeat) {
    repeatHtml = '<span class="repeat-badge">🔄 REPEAT</span>';
  }
  
  // Chain progress
  let chainHtml = '';
  if (questData.chainId) {
    const chainProgress = questManager ? questManager.getChainProgress(questData.chainId) : null;
    if (chainProgress) {
      chainHtml = `<div class="chain-progress">🔗 Part ${questData.chainOrder} of ${chainProgress.total}</div>`;
    }
  }
  
  return `
    <div class="quest-item ${status} ${isSelected ? 'selected' : ''}" data-quest="${quest.id}">
      <div class="quest-header">
        <span class="quest-type-badge" style="background: ${typeInfo.color}">${typeInfo.icon} ${typeInfo.label}</span>
        <span class="quest-category">${categoryInfo.icon}</span>
        ${repeatHtml}
      </div>
      <div class="quest-name">${questData.name}</div>
      <div class="quest-desc">${questData.description}</div>
      ${chainHtml}
      ${timingHtml}
      ${objectivesHtml}
      ${isSelected && status === QuestStatus.AVAILABLE ? `
        <button class="pixel-btn pixel-btn-gold quest-accept-btn" data-quest="${quest.id}" style="margin-top: 8px; font-size: 10px; padding: 8px 12px;">
          Accept Quest
        </button>
      ` : ''}
      ${isSelected && status === QuestStatus.ACTIVE && quest.objectives?.every(o => o.completed) ? `
        <button class="pixel-btn pixel-btn-green quest-complete-btn" data-quest="${quest.id}" style="margin-top: 8px; font-size: 10px; padding: 8px 12px;">
          Complete Quest
        </button>
      ` : ''}
    </div>
  `;
}

// =====================================================
// Quest System
// =====================================================

/**
 * Get quest definition from GAME_DATA.quests or GRAMMAR_QUESTS
 * @param {string} questId - Quest ID to look up
 * @returns {object|null} Quest definition or null if not found
 */
function getQuest(questId) {
  // Check GAME_DATA.quests first
  if (GAME_DATA.quests[questId]) {
    return GAME_DATA.quests[questId];
  }
  // Check GRAMMAR_QUESTS
  if (typeof GRAMMAR_QUESTS !== 'undefined' && GRAMMAR_QUESTS[questId]) {
    return GRAMMAR_QUESTS[questId];
  }
  return null;
}

function getActiveQuests() {
  return GameState.player.activeQuests.map(q => ({
    ...q,
    ...getQuest(q.id)
  }));
}

function getAvailableQuests() {
  const location = GAME_DATA.locations[GameState.currentLocation];
  if (!location || !location.quests) {
    return [];
  }
  
  const available = [];
  
  location.quests.forEach(questId => {
    const quest = getQuest(questId);
    if (!quest) return;
    
    // Check if already active or completed
    if (GameState.player.activeQuests.find(q => q.id === questId)) return;
    if (GameState.player.completedQuests.includes(questId)) return;
    
    // Check prerequisites
    const prereqsMet = quest.prerequisites.every(prereq => 
      GameState.player.completedQuests.includes(prereq)
    );
    
    // Check level requirement
    if (quest.levelRequired && GameState.player.level < quest.levelRequired) return;
    
    if (prereqsMet) {
      available.push({ id: questId, ...quest });
    }
  });
  
  return available;
}

function hasAvailableQuest(npcId) {
  const available = getAvailableQuests();
  return available.some(q => q.giver === npcId);
}

function hasActiveQuest(npcId) {
  return GameState.player.activeQuests.some(q => {
    const questData = getQuest(q.id);
    return questData?.giver === npcId;
  });
}

function hasQuestReadyToTurnIn(npcId) {
  return GameState.player.activeQuests.some(q => {
    const questData = getQuest(q.id);
    if (questData?.giver !== npcId) return false;
    // Check if all objectives are complete
    return q.objectives.every(obj => obj.completed);
  });
}

function selectQuest(questId) {
  GameState.selectedQuest = GameState.selectedQuest === questId ? null : questId;
  renderQuestPanel();
}

function acceptQuest(questId) {
  const quest = getQuest(questId);
  if (!quest) return;

  const questState = {
    id: questId,
    objectives: quest.objectives.map(obj => ({
      id: obj.id,
      completed: false,
      count: 0
    })),
    startedAt: Date.now()
  };

  GameState.player.activeQuests.push(questState);
  showNotification(`Quest Accepted: ${quest.name}`);

  // Show helpful hint about next step based on first objective
  const firstObj = quest.objectives[0];
  if (firstObj) {
    setTimeout(() => {
      let hint = '';
      if (firstObj.type === 'talk') {
        hint = `Talk to ${firstObj.target || 'the NPC'} to continue`;
      } else if (firstObj.type === 'lesson') {
        hint = 'Check the Quest panel (Q) to start your lesson';
      } else if (firstObj.type === 'travel') {
        hint = 'Open the Map (M) to travel';
      } else if (firstObj.type === 'gather') {
        hint = 'Use the Gather menu to collect resources';
      }
      if (hint) {
        showNotification(hint, 'info');
      }
    }, 1500);
  }

  // Handle onAccept rewards (things unlocked immediately when quest starts)
  if (quest.onAccept) {
    // Unlock gathering skills on accept (needed for quests that require gathering)
    if (quest.onAccept.gatheringUnlock) {
      const skills = Array.isArray(quest.onAccept.gatheringUnlock)
        ? quest.onAccept.gatheringUnlock
        : [quest.onAccept.gatheringUnlock];

      skills.forEach(skill => {
        if (unlockGatheringSkill(skill)) {
          const skillNames = {
            mining: 'Mining',
            woodcutting: 'Woodcutting',
            herbalism: 'Herbalism',
            fishing: 'Fishing',
            hunting: 'Hunting'
          };
          showNotification(`Learned: ${skillNames[skill] || skill}!`, 'success');
        }
      });
    }
  }

  // Discover travel destinations so player can travel to complete objectives
  if (quest.objectives && locationManager) {
    quest.objectives.forEach(obj => {
      if (obj.type === 'travel' && obj.target) {
        if (!locationManager.isDiscovered(obj.target)) {
          locationManager.discoverLocation(obj.target);
        }
        if (!locationManager.isUnlocked(obj.target) && locationManager.meetsLevelRequirement(obj.target)) {
          locationManager.unlockLocation(obj.target);
        }
      }
    });
  }

  // Check gather objectives immediately (in case player already has items)
  checkGatherObjectives();

  renderQuestPanel();
  renderLocation();  // This properly handles location and NPC rendering
}

function updateQuestProgress(questId, objectiveId, increment = 1, deferCompletion = false) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const objective = quest.objectives.find(o => o.id === objectiveId);
  const questDef = getQuest(questId);
  const objectiveData = questDef?.objectives.find(o => o.id === objectiveId);

  if (!objective || objective.completed || !objectiveData) return;

  if (objectiveData.target) {
    objective.count += increment;
    if (objective.count >= objectiveData.target) {
      objective.completed = true;
      showNotification(`Objective Complete: ${objectiveData.text}`);
    }
  } else {
    objective.completed = true;
    showNotification(`Objective Complete: ${objectiveData.text}`);
  }

  // Check if all objectives are complete
  // Pass deferCompletion to delay quest rewards until after lesson screen
  checkQuestCompletion(questId, deferCompletion);
  renderQuestPanel();
}

// Track pending quest completions to show after lesson screen
let pendingQuestCompletion = null;

function checkQuestCompletion(questId, defer = false) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const allComplete = quest.objectives.every(o => o.completed);
  if (allComplete) {
    if (defer) {
      // Defer completion until after lesson screen closes
      pendingQuestCompletion = questId;
    } else {
      completeQuest(questId);
    }
  }
}

function processPendingQuestCompletion() {
  if (pendingQuestCompletion) {
    const questId = pendingQuestCompletion;
    pendingQuestCompletion = null;
    completeQuest(questId);
  }
}

// Auto-complete task objectives when lesson is completed
// Task objectives are narrative flavor (e.g., "sing along", "find tracks")
function autoCompleteTaskObjectives(questId, deferCompletion = true) {
  if (!questId) return;

  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;

  const questDef = getQuest(questId);
  if (!questDef) return;

  for (const obj of quest.objectives) {
    const objDef = questDef.objectives.find(o => o.id === obj.id);
    if (objDef?.type === 'task' && !obj.completed) {
      obj.completed = true;
      showNotification(`Objective Complete: ${objDef.text}`);
    }
  }

  // Defer completion check - quest rewards shown after lesson screen
  checkQuestCompletion(questId, deferCompletion);
}

/**
 * Start an encounter from a quest objective
 * @param {string} questId - Quest ID
 * @param {string} objectiveId - Objective ID with encounter config
 */
function startQuestEncounter(questId, objectiveId) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  const questData = getQuest(questId);

  if (!quest || !questData) {
    console.error('Quest not found for encounter:', questId);
    return;
  }

  const objDef = questData.objectives.find(o => o.id === objectiveId);
  if (!objDef || objDef.type !== 'encounter') {
    console.error('Invalid encounter objective:', objectiveId);
    return;
  }

  if (typeof encounterManager === 'undefined') {
    console.error('Encounter manager not loaded');
    showNotification('Error: Encounter system not available', 'error');
    return;
  }

  // Start the encounter
  encounterManager.startEncounter(
    objDef.encounterType,
    objDef.encounterId,
    (result) => {
      // Encounter completed - update quest progress
      if (result.success) {
        updateQuestProgress(questId, objectiveId);

        // Show summary based on results
        if (result.results) {
          const { correct, wrong } = result.results;
          const total = correct + wrong;
          if (total > 0) {
            const accuracy = Math.round((correct / total) * 100);
            showNotification(`Encounter complete! ${accuracy}% accuracy`, accuracy >= 80 ? 'success' : 'info');
          }
        }
      }

      renderQuestPanel();
    }
  );
}

function completeQuest(questId) {
  const questData = getQuest(questId);
  const questIndex = GameState.player.activeQuests.findIndex(q => q.id === questId);

  if (questIndex === -1) return;

  // Tutorial: First quest complete - track for cutscene
  const isFirstQuestComplete = shouldShowTutorial('completedQuest');
  if (isFirstQuestComplete) {
    markTutorialComplete('completedQuest');
  }

  // Remove from active
  GameState.player.activeQuests.splice(questIndex, 1);

  // Add to completed (avoid duplicates for repeatable quests)
  if (!GameState.player.completedQuests.includes(questId)) {
    GameState.player.completedQuests.push(questId);
  }

  // Track completion timestamp for repeatable/daily/weekly quests
  if (!GameState.player.questCompletions) {
    GameState.player.questCompletions = {};
  }
  if (!GameState.player.questCompletions[questId]) {
    GameState.player.questCompletions[questId] = { count: 0 };
  }
  GameState.player.questCompletions[questId].count++;
  GameState.player.questCompletions[questId].lastCompletedAt = Date.now();

  // Consume items for gather objectives marked with consumeOnComplete
  if (questData.objectives) {
    questData.objectives.forEach(obj => {
      if (obj.type === 'gather' && obj.consumeOnComplete && obj.itemId) {
        const amount = obj.target || 1;
        if (typeof itemManager !== 'undefined' && itemManager) {
          itemManager.removeItem(obj.itemId, amount);
        }
      }
    });
  }

  // Collect reward data for display
  const rewardData = {
    questName: questData.name,
    questType: questData.type,
    xp: 0,
    gold: 0,
    items: [],
    reputation: [],
    spellbookPages: [],
    leveledUp: false,
    newLevel: null,
    rankUps: []
  };
  
  // Give rewards
  if (questData.rewards) {
    // XP
    if (questData.rewards.xp) {
      const oldLevel = GameState.player.level;
      addXPSilent(questData.rewards.xp);
      rewardData.xp = questData.rewards.xp;
      if (GameState.player.level > oldLevel) {
        rewardData.leveledUp = true;
        rewardData.newLevel = GameState.player.level;
      }
    }
    
    // Gold (with account progression multiplier)
    if (questData.rewards.gold) {
      const actualGold = addGoldSilent(questData.rewards.gold);
      rewardData.gold = actualGold;
      rewardData.baseGold = questData.rewards.gold;
    }

    // Items
    if (questData.rewards.items) {
      questData.rewards.items.forEach(itemId => {
        addItemToInventorySilent(itemId);
        const itemData = GAME_DATA.items[itemId];
        if (itemData) {
          rewardData.items.push({
            id: itemId,
            name: itemData.name,
            icon: itemData.icon,
            stats: itemData.stats
          });
        }
      });
    }
    
    // Reputation
    if (questData.rewards.reputation) {
      Object.entries(questData.rewards.reputation).forEach(([factionId, amount]) => {
        const oldRep = GameState.player.reputation[factionId] || 0;
        let finalAmount = amount;
        
        // Apply Devotion bonus
        if (typeof statsManager !== 'undefined' && statsManager) {
          const multiplier = statsManager.calculateReputationMultiplier();
          finalAmount = Math.floor(amount * multiplier);
        }
        
        const newRep = oldRep + finalAmount;
        GameState.player.reputation[factionId] = newRep;
        
        // Get faction info
        const faction = GAME_DATA.factions?.[factionId];
        const factionName = faction?.name || factionId;
        
        // Check for rank up
        let oldRank = null;
        let newRank = null;
        if (faction?.ranks) {
          oldRank = [...faction.ranks].reverse().find(r => oldRep >= r.threshold);
          newRank = [...faction.ranks].reverse().find(r => newRep >= r.threshold);
        }
        
        const rankUp = oldRank && newRank && oldRank.title !== newRank.title;
        
        rewardData.reputation.push({
          factionId,
          factionName,
          amount: finalAmount,
          baseAmount: amount,
          devotionBonus: finalAmount - amount,
          newTotal: newRep,
          rankUp,
          newRankTitle: rankUp ? newRank.title : null,
          nextRank: faction?.ranks?.find(r => r.threshold > newRep),
          maxRank: faction?.ranks?.[faction.ranks.length - 1]?.threshold || 1000
        });
        
        if (rankUp) {
          rewardData.rankUps.push({
            factionName,
            newRank: newRank.title
          });
        }

        // Check for reputation-based artifact unlocks
        checkReputationArtifacts(factionId, newRep);
      });
    }

    // Spellbook pages
    if (questData.rewards.spellbookUnlock && typeof unlockSpellbookPages === 'function') {
      unlockSpellbookPages(questData.rewards.spellbookUnlock);
      rewardData.spellbookPages = questData.rewards.spellbookUnlock;
    }

    // Artifacts
    if (questData.rewards.artifactUnlock && typeof unlockArtifact === 'function') {
      const artifactIds = Array.isArray(questData.rewards.artifactUnlock)
        ? questData.rewards.artifactUnlock
        : [questData.rewards.artifactUnlock];
      artifactIds.forEach(artifactId => {
        unlockArtifact(artifactId);
      });
      rewardData.artifacts = artifactIds;
    }

    // Feature unlocks (e.g., alchemy, smithing)
    if (questData.rewards.unlocks) {
      if (!GameState.player.unlockedFeatures) {
        GameState.player.unlockedFeatures = [];
      }
      questData.rewards.unlocks.forEach(feature => {
        if (!GameState.player.unlockedFeatures.includes(feature)) {
          GameState.player.unlockedFeatures.push(feature);
          showNotification(`Unlocked: ${feature.charAt(0).toUpperCase() + feature.slice(1)}!`, 'success');
        }
      });
      rewardData.unlocks = questData.rewards.unlocks;
      // Update nav buttons visibility
      updateNavButtonVisibility();
    }

    // Gathering skill unlocks (e.g., mining, herbalism, fishing)
    if (questData.rewards.gatheringUnlock) {
      const skills = Array.isArray(questData.rewards.gatheringUnlock)
        ? questData.rewards.gatheringUnlock
        : [questData.rewards.gatheringUnlock];

      skills.forEach(skill => {
        if (unlockGatheringSkill(skill)) {
          const skillNames = {
            mining: 'Mining',
            woodcutting: 'Woodcutting',
            herbalism: 'Herbalism',
            fishing: 'Fishing',
            hunting: 'Hunting'
          };
          showNotification(`Learned: ${skillNames[skill] || skill}! Check the Gather menu.`, 'success');
        }
      });
      rewardData.gatheringSkills = skills;
    }
  }

  // Show rewards screen
  // Show first quest complete cutscene after rewards modal
  const onRewardsClosed = isFirstQuestComplete
    ? () => triggerCutscene('first_quest_complete')
    : null;

  showRewardsScreen(rewardData, onRewardsClosed);

  // Unlock next quests
  unlockDependentQuests(questId);

  // Re-render location (NPC visibility may have changed)
  renderLocation();

  renderHUD();
  renderQuestPanel();
  autoSave();
}

/**
 * Check and unlock any artifacts that are tied to reputation thresholds
 */
function checkReputationArtifacts(factionId, currentRep) {
  if (!GAME_DATA.artifacts || typeof unlockArtifact !== 'function' || typeof isArtifactUnlocked !== 'function') {
    return;
  }

  // Find all artifacts that unlock via reputation for this faction
  Object.values(GAME_DATA.artifacts).forEach(artifact => {
    if (artifact.discoveryMethod !== 'reputation') return;
    if (artifact.faction !== factionId) return;
    if (isArtifactUnlocked(artifact.id)) return;

    // Check if player has reached the threshold
    if (currentRep >= artifact.threshold) {
      unlockArtifact(artifact.id);
    }
  });
}

// Silent versions that don't show notifications (for rewards screen)
function addXPSilent(amount) {
  // Apply account progression XP multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.xpMultiplier && effects.xpMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.xpMultiplier);
    }
  }

  GameState.player.xp += finalAmount;

  while (GameState.player.xp >= GameState.player.xpToNext) {
    levelUpSilent();
  }

  renderHUD();
  return finalAmount; // Return actual amount for display
}

function addGold(amount) {
  // Apply account progression gold multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.goldMultiplier && effects.goldMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.goldMultiplier);
    }
  }

  GameState.player.gold += finalAmount;
  GameState.player.totalGoldEarned = (GameState.player.totalGoldEarned || 0) + finalAmount;

  if (finalAmount > amount) {
    showNotification(`+${finalAmount} gold (${amount} + bonus)`, 'success');
  } else {
    showNotification(`+${finalAmount} gold`, 'success');
  }

  renderHUD();
  return finalAmount;
}

function addGoldSilent(amount) {
  // Apply account progression gold multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.goldMultiplier && effects.goldMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.goldMultiplier);
    }
  }

  GameState.player.gold += finalAmount;
  GameState.player.totalGoldEarned = (GameState.player.totalGoldEarned || 0) + finalAmount;

  renderHUD();
  return finalAmount;
}

// Store pending level ups to show after lesson/quest completion screens
let pendingLevelUps = [];

function levelUpSilent() {
  GameState.player.xp -= GameState.player.xpToNext;
  GameState.player.level++;

  const nextLevel = GAME_DATA.levelTable.find(l => l.level === GameState.player.level + 1);
  GameState.player.xpToNext = nextLevel ? nextLevel.xpRequired : Math.floor(GameState.player.xpToNext * 1.5);

  // Stat increase from statsManager
  let statResult = null;
  if (statsManager) {
    statResult = statsManager.handleLevelUp(GameState.player.level);
    // Recalculate max HP based on new Stamina
    GameState.player.maxHp = statsManager.calculateMaxHp();
  } else {
    // Fallback if stats manager not ready
    GameState.player.maxHp += 2;
  }

  // Restore HP on level up
  GameState.player.hp = GameState.player.maxHp;

  // Check for newly unlockable locations
  if (locationManager) {
    locationManager.checkQuestBasedDiscovery();
    locationManager.checkLevelUnlocks();
  }

  // Store level up data to show later
  pendingLevelUps.push({
    level: GameState.player.level,
    statResult: statResult
  });

  recalculateStats();
}

// Show any pending level up screens one by one
function showPendingLevelUps() {
  if (pendingLevelUps.length === 0) return;

  // Get the first pending level up
  const levelUpData = pendingLevelUps.shift();

  // Show the full level up screen
  showLevelUpScreen(levelUpData.level, levelUpData.statResult);

  // Check achievements and milestones after showing level up
  checkAchievements();
  checkMilestones();
}

function addItemToInventorySilent(itemId, count = 1) {
  const itemData = GAME_DATA.items[itemId];
  if (!itemData) return;

  if (itemData.stackable) {
    const existing = GameState.player.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      GameState.player.inventory.push({ id: itemId, count });
    }
  } else {
    for (let i = 0; i < count; i++) {
      GameState.player.inventory.push({ id: itemId, count: 1 });
    }
  }

  // Check gather objectives after adding item
  checkGatherObjectives(itemId);
}

/**
 * Check and update gather-type quest objectives based on current inventory
 * Called when items are added to inventory
 */
function checkGatherObjectives(itemId = null) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      // Skip non-gather objectives or already completed ones
      if (!objData || objData.type !== 'gather' || objProgress.completed) continue;

      let currentCount = 0;
      const targetCount = objData.target || 1;

      // Handle category-based gathering (e.g., itemCategory: "ore")
      if (objData.itemCategory) {
        // Count all items in this category
        for (const invItem of GameState.player.inventory) {
          const itemData = GAME_DATA.items[invItem.id];
          if (itemData && itemData.category === objData.itemCategory) {
            currentCount += invItem.count || 1;
          }
        }
      } else if (objData.itemId) {
        // Skip if we're checking a specific item and it doesn't match
        if (itemId && objData.itemId !== itemId) continue;
        currentCount = getItemCount(objData.itemId);
      }

      // Update progress
      objProgress.count = Math.min(currentCount, targetCount);

      // Check if objective is complete
      if (currentCount >= targetCount && !objProgress.completed) {
        objProgress.completed = true;
        showNotification(`Objective complete: ${objData.text}`, 'success');

        // Check if quest is now completable
        const allComplete = questProgress.objectives.every(o => o.completed);
        if (allComplete) {
          showNotification(`Quest "${questData.name}" ready to turn in!`, 'success');
        }
      }
    }
  }

  // Update quest panel to reflect changes
  renderQuestPanel();
}

/**
 * Check quest objectives for equipping items
 */
function checkEquipObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'equip' || objProgress.completed) continue;

      // Check if specific item required or any item in slot
      if (objData.itemId && objData.itemId !== itemId) continue;
      if (objData.slot) {
        const itemData = GAME_DATA.items[itemId];
        if (!itemData || itemData.type !== objData.slot) continue;
      }

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for using consumable items
 */
function checkUseItemObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'use_item' || objProgress.completed) continue;

      // Check if specific item or any consumable
      if (objData.itemId && objData.itemId !== itemId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for crafting items
 */
function checkCraftObjectives(profession, recipeId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'craft' || objProgress.completed) continue;

      // Check profession match
      if (objData.profession && objData.profession !== profession) continue;

      // Check recipe match if specified
      if (objData.recipeId && objData.recipeId !== recipeId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for contributing to village projects
 */
function checkContributeObjectives(projectId, itemId, amount) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'contribute' || objProgress.completed) continue;

      // Check project match if specified
      if (objData.projectId && objData.projectId !== projectId) continue;

      // Update count if tracking amount
      if (objData.target) {
        objProgress.count = (objProgress.count || 0) + amount;
        if (objProgress.count >= objData.target) {
          objProgress.completed = true;
          showNotification(`Objective complete: ${objData.text}`, 'success');
        }
      } else {
        objProgress.completed = true;
        showNotification(`Objective complete: ${objData.text}`, 'success');
      }

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Check quest objectives for buying from shops
 */
function checkBuyObjectives(itemId) {
  if (!GameState.player.activeQuests) return;

  for (const questProgress of GameState.player.activeQuests) {
    const questData = getQuest(questProgress.id);
    if (!questData) continue;

    for (let i = 0; i < questProgress.objectives.length; i++) {
      const objProgress = questProgress.objectives[i];
      const objData = questData.objectives[i];

      if (objData.type !== 'buy' || objProgress.completed) continue;

      // Check if specific item required
      if (objData.itemId && objData.itemId !== itemId) continue;

      objProgress.completed = true;
      showNotification(`Objective complete: ${objData.text}`, 'success');

      checkQuestCompletion(questProgress.id);
    }
  }
  renderQuestPanel();
}

/**
 * Get count of an item in player's inventory
 */
function getItemCount(itemId) {
  if (typeof itemManager !== 'undefined' && itemManager) {
    return itemManager.getItemCount(itemId);
  }

  // Fallback to direct inventory check
  const invItem = GameState.player.inventory?.find(i => i.id === itemId);
  return invItem ? invItem.count : 0;
}

// =====================================================
// Rewards Screen
// =====================================================

function showRewardsScreen(rewardData, onClose = null) {
  // Build items HTML
  let itemsHtml = '';
  if (rewardData.items.length > 0) {
    const itemsList = rewardData.items.map(item => {
      const statsText = item.stats
        ? `<span class="reward-item-stats">(${Object.entries(item.stats).map(([k,v]) => `+${v} ${k}`).join(', ')})</span>`
        : '';
      return `
        <div class="reward-item" data-item-tooltip="${item.id}">
          <span class="reward-item-icon">${item.icon}</span>
          <span class="reward-item-name">${item.name}</span>
          ${statsText}
        </div>
      `;
    }).join('');
    
    itemsHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">📦 ITEMS RECEIVED</div>
        <div class="rewards-items-list">
          ${itemsList}
        </div>
      </div>
    `;
  }
  
  // Build reputation HTML
  let reputationHtml = '';
  if (rewardData.reputation.length > 0) {
    const repList = rewardData.reputation.map(rep => {
      const progress = Math.min(100, (rep.newTotal / rep.maxRank) * 100);
      const nextThreshold = rep.nextRank?.threshold || rep.maxRank;
      const devotionText = rep.devotionBonus > 0 ? ` <span class="devotion-bonus">(+${rep.devotionBonus} Devotion)</span>` : '';
      
      return `
        <div class="reward-reputation">
          <div class="reward-rep-header">
            <span class="reward-rep-name">${rep.factionName}</span>
            <span class="reward-rep-amount">+${rep.amount}${devotionText}</span>
          </div>
          <div class="reward-rep-bar">
            <div class="reward-rep-fill" style="width: ${progress}%"></div>
          </div>
          <div class="reward-rep-progress">${rep.newTotal} / ${nextThreshold}</div>
          ${rep.rankUp ? `<div class="reward-rank-up">🎉 Rank Up: ${rep.newRankTitle}!</div>` : ''}
        </div>
      `;
    }).join('');
    
    reputationHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">🏛️ REPUTATION</div>
        ${repList}
      </div>
    `;
  }
  
  // Build spellbook HTML
  let spellbookHtml = '';
  if (rewardData.spellbookPages && rewardData.spellbookPages.length > 0) {
    // Get page titles from SPELLBOOK_PAGES if available
    const getPageTitle = (pageId) => {
      if (typeof SPELLBOOK_PAGES !== 'undefined' && SPELLBOOK_PAGES[pageId]) {
        return SPELLBOOK_PAGES[pageId].title;
      }
      // Fallback: format the ID nicely
      return pageId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    spellbookHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">📖 NEW LORE UNLOCKED</div>
        <div class="rewards-spellbook">
          ${rewardData.spellbookPages.map(p => `<span class="spellbook-page-unlock">${getPageTitle(p)}</span>`).join(', ')}
        </div>
      </div>
    `;
  }

  // Build gathering skills HTML
  let gatheringHtml = '';
  if (rewardData.gatheringSkills && rewardData.gatheringSkills.length > 0) {
    const skillNames = {
      mining: { name: 'Mining', icon: '⛏️' },
      woodcutting: { name: 'Woodcutting', icon: '🪓' },
      herbalism: { name: 'Herbalism', icon: '🌿' },
      fishing: { name: 'Fishing', icon: '🎣' },
      hunting: { name: 'Hunting', icon: '🏹' }
    };

    const skillsList = rewardData.gatheringSkills.map(skill => {
      const info = skillNames[skill] || { name: skill, icon: '✨' };
      return `<span class="gathering-skill-unlock">${info.icon} ${info.name}</span>`;
    }).join(', ');

    gatheringHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">🛠️ SKILL LEARNED</div>
        <div class="rewards-gathering">
          ${skillsList}
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
            Access from the Gather menu
          </div>
        </div>
      </div>
    `;
  }
  
  // Build level up HTML
  let levelUpHtml = '';
  if (rewardData.leveledUp) {
    levelUpHtml = `
      <div class="rewards-level-up">
        🎊 LEVEL UP! You are now Level ${rewardData.newLevel}!
      </div>
    `;
  }
  
  // Quest type badge
  const typeBadge = {
    main: '⭐ MAIN',
    side: '📋 SIDE',
    daily: '🌅 DAILY',
    weekly: '📅 WEEKLY',
    hidden: '🔍 HIDDEN',
    seasonal: '🌸 SEASONAL',
    chain: '🔗 CHAIN',
    timed: '⏱️ TIMED',
    repeatable: '🔄 REPEATABLE'
  }[rewardData.questType] || '📜 QUEST';
  
  showModal('rewards-modal', `
    <div class="rewards-screen">
      <div class="rewards-header">
        <div class="rewards-badge">${typeBadge}</div>
        <div class="rewards-title">QUEST COMPLETE!</div>
        <div class="rewards-quest-name">"${rewardData.questName}"</div>
      </div>
      
      ${levelUpHtml}
      
      <div class="rewards-main">
        <div class="rewards-xp-gold">
          <div class="reward-xp">
            <span class="reward-icon">⭐</span>
            <span class="reward-value">+${rewardData.xp} XP</span>
          </div>
          <div class="reward-gold">
            <span class="reward-icon">💰</span>
            <span class="reward-value">+${rewardData.gold} Gold</span>
          </div>
        </div>
        
        ${itemsHtml}
        ${reputationHtml}
        ${spellbookHtml}
        ${gatheringHtml}
      </div>
      
      <div class="rewards-footer">
        <button class="pixel-btn pixel-btn-gold" id="rewards-continue-btn">Continue</button>
      </div>
    </div>
  `);

  // Bind continue button
  setTimeout(() => {
    const continueBtn = document.getElementById('rewards-continue-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        hideModal('rewards-modal');
        if (onClose) onClose();
        // Show any pending level ups after rewards screen closes
        setTimeout(() => {
          showPendingLevelUps();
        }, 300);
      });
    }

    // Bind tooltips to reward items
    const modal = document.getElementById('rewards-modal');
    if (modal && typeof TooltipSystem !== 'undefined') {
      TooltipSystem.bindAllInContainer(modal);
    }
  }, 0);
}

// =====================================================
// Lesson Completion Screen
// =====================================================

function showLessonCompletionScreen(data) {
  const {
    lessonType,      // 'regular', 'review', 'exam'
    passed,
    successRate,
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    xpEarned,
    xpBreakdown,     // optional - BonusCalculator result for visible stacking
    hpRecovered,
    hpLost,
    isPerfect,
    questObjective,  // optional - quest this was for
    essenceEarned,   // optional - { type, amount }
    leveledUp,
    newLevel
  } = data;

  const percentage = Math.floor(successRate * 100);

  // Determine header based on lesson type and outcome
  let headerIcon, headerTitle, headerClass;
  if (lessonType === 'exam') {
    headerIcon = passed ? '🏆' : '📝';
    headerTitle = passed ? 'EXAM PASSED!' : 'EXAM FAILED';
    headerClass = passed ? 'success' : 'failed';
  } else if (lessonType === 'review') {
    headerIcon = '💚';
    headerTitle = 'REVIEW COMPLETE';
    headerClass = 'review';
  } else {
    headerIcon = passed ? '📚' : '📖';
    headerTitle = passed ? 'LESSON COMPLETE!' : 'LESSON FAILED';
    headerClass = passed ? 'success' : 'failed';
  }

  // Build score display
  const scoreHtml = `
    <div class="lesson-score ${isPerfect ? 'perfect' : ''}">
      <div class="score-circle ${headerClass}">
        <span class="score-value">${percentage}%</span>
      </div>
      ${isPerfect ? '<div class="perfect-badge">⭐ PERFECT!</div>' : ''}
    </div>
  `;

  // Build stats breakdown
  const statsHtml = `
    <div class="lesson-stats-grid">
      <div class="lesson-stat correct">
        <span class="stat-icon">✓</span>
        <span class="stat-value">${correctAnswers}</span>
        <span class="stat-label">Correct</span>
      </div>
      <div class="lesson-stat wrong">
        <span class="stat-icon">✗</span>
        <span class="stat-value">${wrongAnswers}</span>
        <span class="stat-label">Wrong</span>
      </div>
      <div class="lesson-stat total">
        <span class="stat-icon">📝</span>
        <span class="stat-value">${totalQuestions}</span>
        <span class="stat-label">Questions</span>
      </div>
    </div>
  `;

  // Build rewards section
  let rewardsHtml = '';
  if (passed) {
    let rewardItems = [];

    if (xpEarned > 0) {
      // Use breakdown if available for Idleon-style visible stacking
      if (xpBreakdown && xpBreakdown.breakdown && xpBreakdown.breakdown.length > 1) {
        let breakdownHtml = '<div class="xp-breakdown-container">';
        breakdownHtml += '<div class="xp-breakdown-header"><span class="reward-icon">⭐</span>Experience Gained</div>';
        breakdownHtml += '<div class="xp-breakdown-list">';

        xpBreakdown.breakdown.forEach((item, index) => {
          const rowClass = item.type === 'base' ? 'breakdown-base' :
                          item.type === 'multiplier' ? 'breakdown-multiplier' : 'breakdown-additive';
          breakdownHtml += `<div class="xp-breakdown-row ${rowClass}">`;
          breakdownHtml += `<span class="breakdown-label">${item.source}</span>`;
          breakdownHtml += `<span class="breakdown-value">${item.formatted}</span>`;
          breakdownHtml += '</div>';
        });

        breakdownHtml += '</div>';
        breakdownHtml += `<div class="xp-breakdown-total">`;
        breakdownHtml += `<span class="breakdown-label">Total XP</span>`;
        breakdownHtml += `<span class="breakdown-value total-value">+${xpBreakdown.total}</span>`;
        breakdownHtml += '</div>';
        breakdownHtml += '</div>';

        rewardItems.push(breakdownHtml);
      } else {
        // Fallback to simple display
        rewardItems.push(`<div class="reward-item xp"><span class="reward-icon">⭐</span>+${xpEarned} XP</div>`);
      }
    }

    if (hpRecovered > 0) {
      rewardItems.push(`<div class="reward-item hp"><span class="reward-icon">💚</span>+${hpRecovered} HP Restored</div>`);
    }

    if (essenceEarned && essenceEarned.amount > 0) {
      const essenceIcons = { faded: '🔮', clear: '💎', vivid: '✨', brilliant: '🌟' };
      const icon = essenceIcons[essenceEarned.type] || '🔮';
      rewardItems.push(`<div class="reward-item essence"><span class="reward-icon">${icon}</span>+${essenceEarned.amount} ${essenceEarned.type} essence</div>`);
    }

    if (rewardItems.length > 0) {
      rewardsHtml = `
        <div class="lesson-rewards">
          <div class="rewards-title">Rewards</div>
          ${rewardItems.join('')}
        </div>
      `;
    }
  }

  // Build HP lost warning (for failed lessons)
  let hpWarningHtml = '';
  if (hpLost > 0) {
    hpWarningHtml = `
      <div class="lesson-hp-warning">
        <span class="warning-icon">💔</span>
        <span>Lost ${hpLost} HP from wrong answers</span>
      </div>
    `;
  }

  // Level up celebration
  let levelUpHtml = '';
  if (leveledUp) {
    levelUpHtml = `
      <div class="lesson-level-up">
        🎊 LEVEL UP! You are now Level ${newLevel}!
      </div>
    `;
  }

  // Quest objective progress
  let questHtml = '';
  if (questObjective && passed) {
    questHtml = `
      <div class="lesson-quest-progress">
        <span class="quest-icon">📜</span>
        <span>Quest objective completed!</span>
      </div>
    `;
  }

  // Failure message
  let failureHtml = '';
  if (!passed) {
    const threshold = lessonType === 'exam' ? 70 : 60;
    failureHtml = `
      <div class="lesson-failure-msg">
        <p>You need ${threshold}% to pass.</p>
        <p>Keep practicing - you'll get it!</p>
      </div>
    `;
  }

  showModal('lesson-complete-modal', `
    <div class="lesson-complete-screen ${headerClass}">
      <div class="lesson-complete-header">
        <div class="lesson-complete-icon">${headerIcon}</div>
        <div class="lesson-complete-title">${headerTitle}</div>
      </div>

      ${levelUpHtml}
      ${scoreHtml}
      ${statsHtml}
      ${rewardsHtml}
      ${hpWarningHtml}
      ${questHtml}
      ${failureHtml}

      <div class="lesson-complete-footer">
        <button class="pixel-btn ${passed ? 'pixel-btn-gold' : ''}" onclick="closeLessonComplete()">Continue</button>
      </div>
    </div>
  `);
}

// Close lesson complete modal and show any pending quest completions/level ups
function closeLessonComplete() {
  hideModal('lesson-complete-modal');
  // Process pending quest completion first, then level ups
  setTimeout(() => {
    // Check if there's a pending quest completion
    const hasQuestPending = pendingQuestCompletion !== null;

    // Show quest completion screen if a quest was completed during this lesson
    processPendingQuestCompletion();

    // Show pending level ups only if no quest screen was shown
    // (quest screen will handle level ups after it closes)
    if (!hasQuestPending) {
      showPendingLevelUps();
    }

    // Show spellbook tutorial after first lesson
    if (GameState.player.lessonsCompleted === 1) {
      setTimeout(() => {
        showTutorialTip('spellbook', '[data-screen="spellbook"]', () => {});
      }, 500);
    }
  }, 300);
}

function unlockDependentQuests(completedQuestId) {
  Object.values(GAME_DATA.quests).forEach(quest => {
    if (quest.prerequisites.includes(completedQuestId)) {
      // Quest is now potentially available
      renderQuestPanel();
    }
  });
}

// =====================================================
// XP and Leveling
// =====================================================

function addXP(amount) {
  // Apply account progression XP multiplier
  let finalAmount = amount;
  if (typeof accountProgression !== 'undefined' && accountProgression) {
    const effects = accountProgression.getActiveEffects();
    if (effects.xpMultiplier && effects.xpMultiplier > 1) {
      finalAmount = Math.floor(amount * effects.xpMultiplier);
    }
  }

  GameState.player.xp += finalAmount;

  if (finalAmount > amount) {
    showNotification(`+${finalAmount} XP (${amount} + bonus)`);
  } else {
    showNotification(`+${finalAmount} XP`);
  }

  // Check for level up
  while (GameState.player.xp >= GameState.player.xpToNext) {
    levelUp();
  }

  renderHUD();
  return finalAmount;
}

function levelUp() {
  GameState.player.xp -= GameState.player.xpToNext;
  GameState.player.level++;

  // Update XP requirement
  const nextLevel = GAME_DATA.levelTable.find(l => l.level === GameState.player.level + 1);
  GameState.player.xpToNext = nextLevel ? nextLevel.xpRequired : GameState.player.xpToNext * 1.5;

  // Handle stat increase via stats manager
  let statResult = null;
  if (statsManager) {
    statResult = statsManager.handleLevelUp(GameState.player.level);
    // Recalculate max HP based on new Stamina
    GameState.player.maxHp = statsManager.calculateMaxHp();
  } else {
    // Fallback if stats manager not ready
    GameState.player.maxHp += 2; // Reduced from 10 to 2 per level
  }

  // Restore HP on level up
  GameState.player.hp = GameState.player.maxHp;

  // Check for newly unlockable locations
  if (locationManager) {
    // First discover connected locations the player can now access
    locationManager.checkQuestBasedDiscovery();
    // Then unlock any discovered locations the player now meets requirements for
    locationManager.checkLevelUnlocks();
  }

  // Show level up screen
  showLevelUpScreen(GameState.player.level, statResult);

  // Check for new achievements and milestones
  checkAchievements();
  checkMilestones();
}

function showLevelUpScreen(newLevel, statResult) {
  // Find newly available quests at this level
  const newQuests = [];
  Object.values(GAME_DATA.quests).forEach(quest => {
    if (quest.levelRequired === newLevel &&
        quest.type !== 'hidden' &&
        quest.type !== 'daily' &&
        quest.type !== 'weekly') {
      newQuests.push(quest);
    }
  });

  // Find newly accessible locations at this level
  const newLocations = [];
  Object.values(GAME_DATA.locations).forEach(loc => {
    if (loc.levelRequired === newLevel && !loc.discovered) {
      newLocations.push(loc);
    }
  });

  // Build stat gain HTML
  let statHtml = '';
  if (statResult) {
    const statIcon = {
      'Strength': '💪',
      'Agility': '🏃',
      'Wisdom': '📚',
      'Charisma': '💬',
      'Luck': '🍀',
      'Stamina': '❤️'
    }[statResult.statName] || '⬆️';

    statHtml = `
      <div class="levelup-stat-gain">
        <span class="stat-icon">${statIcon}</span>
        <span class="stat-text">+1 ${statResult.statName}</span>
        <span class="stat-total">(now ${statResult.newValue})</span>
      </div>
    `;
  }

  // Build HP restore HTML
  const hpHtml = `
    <div class="levelup-hp-restore">
      <span class="hp-icon">❤️</span>
      <span class="hp-text">HP Fully Restored!</span>
      <span class="hp-value">${GameState.player.hp}/${GameState.player.maxHp}</span>
    </div>
  `;

  // Build unlocks HTML
  let unlocksHtml = '';
  if (newQuests.length > 0 || newLocations.length > 0) {
    unlocksHtml = '<div class="levelup-unlocks"><div class="unlocks-title">🔓 New Opportunities</div>';

    if (newLocations.length > 0) {
      unlocksHtml += '<div class="unlock-category">Areas accessible:</div>';
      newLocations.forEach(loc => {
        unlocksHtml += `<div class="unlock-item">📍 ${loc.name}</div>`;
      });
    }

    if (newQuests.length > 0 && newQuests.length <= 5) {
      unlocksHtml += '<div class="unlock-category">New quests available:</div>';
      newQuests.slice(0, 3).forEach(quest => {
        unlocksHtml += `<div class="unlock-item">📜 ${quest.name}</div>`;
      });
      if (newQuests.length > 3) {
        unlocksHtml += `<div class="unlock-item">...and ${newQuests.length - 3} more!</div>`;
      }
    } else if (newQuests.length > 5) {
      unlocksHtml += `<div class="unlock-category">${newQuests.length} new quests available!</div>`;
    }

    unlocksHtml += '</div>';
  }

  // XP to next level
  const xpHtml = `
    <div class="levelup-xp-next">
      Next level: ${GameState.player.xpToNext} XP
    </div>
  `;

  const modalContent = `
    <div class="levelup-screen">
      <div class="levelup-celebration">🎊</div>
      <div class="levelup-title">LEVEL UP!</div>
      <div class="levelup-level">Level ${newLevel}</div>

      <div class="levelup-rewards">
        ${statHtml}
        ${hpHtml}
      </div>

      ${unlocksHtml}
      ${xpHtml}

      <button class="pixel-btn pixel-btn-gold levelup-continue" onclick="closeLevelUpScreen()">
        Continue Your Journey
      </button>
    </div>
  `;

  showModal('levelup-modal', modalContent);
}

// Close level up modal and show any additional pending level ups
function closeLevelUpScreen() {
  hideModal('levelup-modal');
  // Check for more pending level ups (in case player gained multiple levels)
  setTimeout(() => {
    showPendingLevelUps();
  }, 300);
}

// =====================================================
// HP System
// =====================================================

function damagePlayer(amount) {
  // Check Luck - chance to avoid damage entirely
  if (statsManager && statsManager.rollLuckAvoidDamage()) {
    showNotification("Lucky! Damage avoided!", 'success');
    return;
  }
  
  let finalDamage = amount;
  
  // Apply Strength - reduces damage taken
  if (statsManager) {
    finalDamage = statsManager.calculateDamageTaken(finalDamage);
  }
  
  GameState.player.hp = Math.max(0, GameState.player.hp - finalDamage);
  
  // Visual feedback (respects screenShake setting)
  if (GameState.settings?.screenShake !== false) {
    const hpBar = document.querySelector('.hp-bar .bar-container');
    if (hpBar) {
      hpBar.classList.add('hp-damage');
      setTimeout(() => {
        hpBar.classList.remove('hp-damage');
      }, 500);
    }
  }
  
  renderHUD();
  
  if (GameState.player.hp <= 0) {
    handlePlayerDeath();
  }
}

function healPlayer(amount) {
  GameState.player.hp = Math.min(GameState.player.maxHp, GameState.player.hp + amount);
  renderHUD();
}

function handlePlayerDeath() {
  // Check for free revive (first death is free)
  if (!GameState.player.freeReviveUsed) {
    GameState.player.freeReviveUsed = true;
    GameState.player.hp = GameState.player.maxHp;
    renderHUD();
    showModal('free-revive-modal', `
      <div style="text-align: center;">
        <h2 style="font-family: var(--font-display); font-size: 20px; color: var(--accent-gold); margin-bottom: 16px;">
          ✨ Second Chance!
        </h2>
        <p style="margin-bottom: 16px;">
          The spirits of Dawnmere have granted you another chance. Your health has been fully restored!
        </p>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">
          This was your free revival. Next time you fall, you'll need to review vocabulary to recover.
        </p>
        <button class="art-btn art-btn-gold" onclick="hideModal('free-revive-modal')">
          Continue Adventure
        </button>
      </div>
    `);
    autoSave();
    return;
  }

  // Get vocabulary stats if available
  let statsHtml = '';
  if (srManager) {
    const stats = srManager.getMasteryStats();
    if (stats.total > 0) {
      statsHtml = `
        <div style="margin: 16px 0; padding: 12px; background: var(--bg-medium); border: 2px solid var(--border-pixel);">
          <div style="font-family: var(--font-display); font-size: 10px; color: var(--accent-gold); margin-bottom: 8px;">VOCABULARY STATUS</div>
          <div style="font-size: 14px; color: var(--text-muted);">
            ${stats.total} words learned • ${stats.dueCount} due for review
          </div>
        </div>
      `;
    }
  }

  const canReview = srManager && srManager.canReview(4);
  const reviewButtonText = canReview ? 'Review Vocabulary (Free)' : 'Rest & Recover (Free)';
  const reviewButtonDesc = canReview
    ? 'Practice words you\'ve learned. HP restored based on performance.'
    : 'Not enough vocabulary yet. Partial HP restored.';

  showModal('death-modal', `
    <div style="text-align: center;">
      <h2 style="font-family: var(--font-display); font-size: 20px; color: var(--accent-red); margin-bottom: 16px;">
        💀 You've Fallen!
      </h2>
      <p style="margin-bottom: 16px;">
        Your health has been depleted. Time to recover your strength.
      </p>
      ${statsHtml}
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px; margin: 0 auto;">
        <div>
          <button class="pixel-btn pixel-btn-green" onclick="reviewLessons()" style="width: 100%;">
            ${reviewButtonText}
          </button>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            ${reviewButtonDesc}
          </div>
        </div>
      </div>
    </div>
  `);
}

function reviewLessons() {
  hideModal('death-modal');
  
  // Check if player has enough words to review
  if (!srManager || !srManager.canReview(4)) {
    // Not enough words learned yet - give partial HP and explain
    GameState.player.hp = Math.floor(GameState.player.maxHp * 0.5);
    renderHUD();
    showNotification("Not enough vocabulary learned yet. HP partially restored.", 'info');
    return;
  }
  
  // Build review session (4 questions for quicker recovery)
  const reviewWords = srManager.buildReviewSession(4);

  if (reviewWords.length < 4) {
    // Fallback if not enough words
    GameState.player.hp = Math.floor(GameState.player.maxHp * 0.5);
    renderHUD();
    showNotification("Not enough vocabulary for review. HP partially restored.", 'info');
    return;
  }
  
  // Generate questions from review words
  const allVocab = getAllVocabularyFlat();
  const questions = srManager.generateReviewQuestions(reviewWords, allVocab);
  
  if (questions.length < 4) {
    // Fallback
    GameState.player.hp = Math.floor(GameState.player.maxHp * 0.5);
    renderHUD();
    showNotification("Could not generate review. HP partially restored.", 'info');
    return;
  }
  
  // Initialize hint system for review
  let hintInfo = { charges: 0, maxCharges: 0 };
  if (hintManager) {
    hintInfo = hintManager.initializeForLesson();
  }
  
  // Start review lesson
  GameState.lessonState = {
    active: true,
    questId: null,
    objectiveId: null,
    vocabulary: reviewWords,
    questions: questions,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    currentMultiplier: 1.0,
    totalBonusXP: 0,
    totalBonusGold: 0,
    isReview: true,
    hintCharges: hintInfo.charges,
    maxHintCharges: hintInfo.maxCharges,
    isBossExam: false
  };
  
  // Update lesson modal title
  const lessonTitle = document.querySelector('.lesson-title');
  if (lessonTitle) {
    lessonTitle.innerHTML = '📖 REVIEW SESSION';
  }
  
  showLessonModal();
}

// =====================================================
// Inventory System
// =====================================================

function addItemToInventory(itemId, count = 1) {
  const itemData = GAME_DATA.items[itemId];
  if (!itemData) return;

  if (itemData.stackable) {
    const existing = GameState.player.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      GameState.player.inventory.push({ id: itemId, count });
    }
  } else {
    for (let i = 0; i < count; i++) {
      GameState.player.inventory.push({ id: itemId, count: 1 });
    }
  }

  showNotification(`Received: ${itemData.name}${count > 1 ? ` x${count}` : ''}`);

  // Check gather objectives after adding item
  checkGatherObjectives(itemId);
}

function useItem(itemId) {
  const itemData = GAME_DATA.items[itemId];
  const inventoryItem = GameState.player.inventory.find(i => i.id === itemId);

  if (!itemData || !inventoryItem) return;

  if (itemData.type === 'consumable') {
    if (itemData.effect.hp) {
      healPlayer(itemData.effect.hp);
      showNotification(`Used ${itemData.name}: +${itemData.effect.hp} HP`);
    }

    inventoryItem.count--;
    if (inventoryItem.count <= 0) {
      const index = GameState.player.inventory.indexOf(inventoryItem);
      GameState.player.inventory.splice(index, 1);
    }

    // Check quest objectives for using items
    checkUseItemObjectives(itemId);
  } else if (['helm', 'armor', 'weapon', 'accessory', 'ring'].includes(itemData.type)) {
    equipItem(itemId);
  }

  renderHUD();
}

function equipItem(itemId) {
  const itemData = GAME_DATA.items[itemId];
  if (!itemData) return;

  const slot = itemData.type;

  // Unequip current item if any
  if (GameState.player.equipment[slot]) {
    addItemToInventory(GameState.player.equipment[slot]);
  }

  // Remove from inventory
  const index = GameState.player.inventory.findIndex(i => i.id === itemId);
  if (index > -1) {
    GameState.player.inventory.splice(index, 1);
  }

  // Equip new item
  GameState.player.equipment[slot] = itemId;

  // Apply stat bonuses
  recalculateStats();

  showNotification(`Equipped: ${itemData.name}`);

  // Check quest objectives for equipping items
  checkEquipObjectives(itemId);
}

function unequipItem(slot) {
  const itemId = GameState.player.equipment[slot];
  if (!itemId) return;
  
  const itemData = GAME_DATA.items[itemId];
  
  // Add item back to inventory
  addItemToInventory(itemId);
  
  // Clear equipment slot
  GameState.player.equipment[slot] = null;
  
  // Recalculate stats (bonuses will be removed)
  recalculateStats();
  
  showNotification(`Unequipped: ${itemData?.name || 'item'}`);
}

function recalculateStats() {
  // Collect all stat bonuses from equipment
  const bonusStats = {};
  let bonusHp = 0; // Legacy support for items with direct maxHp
  
  Object.values(GameState.player.equipment).forEach(itemId => {
    if (itemId) {
      const item = GAME_DATA.items[itemId];
      if (item?.stats) {
        // Handle each stat type
        Object.entries(item.stats).forEach(([statName, value]) => {
          if (statName === 'maxHp') {
            // Legacy: direct HP bonus
            bonusHp += value;
          } else {
            // New: proper stat bonuses (stamina, strength, etc.)
            bonusStats[statName] = (bonusStats[statName] || 0) + value;
          }
        });
      }
    }
  });
  
  // Update bonus stats in statsManager
  if (statsManager) {
    statsManager.setBonusStats(bonusStats);
    // Calculate max HP (includes Stamina from base + bonus)
    GameState.player.maxHp = statsManager.calculateMaxHp();
  } else {
    // Fallback if statsManager not initialized
    const baseHp = 50 + (GameState.player.level - 1) * 2; // Base 50, +2 per level
    GameState.player.maxHp = baseHp;
  }
  
  // Add legacy direct HP bonuses
  GameState.player.maxHp += bonusHp;
  GameState.player.hp = Math.min(GameState.player.hp, GameState.player.maxHp);
  
  renderHUD();
}

// =====================================================
// NPC Interaction & Dialog
// =====================================================

function interactWithNPC(npcId) {
  const npc = getNPC(npcId);
  if (!npc) return;

  // Tutorial: First NPC click
  if (shouldShowTutorial('clickedNpc')) {
    markTutorialComplete('clickedNpc');
    hideTutorialTip();
  }

  // Track met NPCs for quest objectives
  if (!GameState.player.metNpcs.includes(npcId)) {
    GameState.player.metNpcs.push(npcId);

    // Discover faction if this NPC belongs to one
    if (npc.faction && typeof reputationManager !== 'undefined') {
      const discovery = reputationManager.discoverFaction(npc.faction);
      if (discovery) {
        showNotification(discovery.message, 'reputation');
      }
    }

    // Update "meet settlers" type objectives
    GameState.player.activeQuests.forEach(quest => {
      quest.objectives.forEach(obj => {
        if (obj.id.includes('meet') && !obj.completed) {
          updateQuestProgress(quest.id, obj.id, 1);
        }
      });
    });
  }
  
  // Determine dialog based on quest state
  let dialogText = npc.dialogue.greeting;
  let options = [];

  // PRIORITY 1: Check for active quest with this NPC (already accepted quests take priority)
  if (hasActiveQuest(npcId)) {
    const activeQuest = GameState.player.activeQuests.find(q => 
      getQuest(q.id)?.giver === npcId
    );
    if (activeQuest) {
      const questData = getQuest(activeQuest.id);
      const allComplete = activeQuest.objectives.every(o => o.completed);
      
      if (allComplete) {
        dialogText = questData?.dialogue?.complete || "Quest complete!";
        options.push({
          text: "Complete Quest",
          action: () => {
            completeQuest(activeQuest.id);
            hideDialog();
          }
        });
      } else {
        dialogText = questData?.dialogue?.progress || "Keep working on it!";

        // Auto-complete "task" type objectives when talking to quest giver
        // (e.g., "listen to gossip" - talking to them IS the task)
        activeQuest.objectives.forEach(obj => {
          if (obj.completed) return;
          const objDef = questData?.objectives?.find(o => o.id === obj.id);
          if (objDef && objDef.type === 'task' && !objDef.target) {
            obj.completed = true;
            showNotification(`Objective Complete: ${objDef.text}`);
          }
        });

        // Auto-complete "interact" type objectives when talking to target NPC
        activeQuest.objectives.forEach(obj => {
          if (obj.completed) return;
          const objDef = questData?.objectives?.find(o => o.id === obj.id);
          if (objDef && objDef.type === 'interact' && objDef.target === npcId) {
            obj.completed = true;
            showNotification(`Objective Complete: ${objDef.text}`);
          }
        });

        // Check if all objectives are now complete after auto-completing tasks
        const nowComplete = activeQuest.objectives.every(o => o.completed);
        if (nowComplete) {
          dialogText = questData?.dialogue?.complete || "Quest complete!";
          options.push({
            text: "Complete Quest",
            action: () => {
              completeQuest(activeQuest.id);
              hideDialog();
            }
          });
          options.push({
            text: "Not yet",
            action: hideDialog
          });
          showDialog(npc.name, dialogText, options);
          return;
        }

        // Check for lesson objectives (vocabulary or grammar)
        const lessonObjective = activeQuest.objectives.find(o => {
          if (o.completed) return false;
          const objDef = questData?.objectives?.find(obj => obj.id === o.id);
          return objDef && (objDef.type === 'lesson' || objDef.type === 'grammar_lesson');
        });

        if (lessonObjective) {
          const objDef = questData?.objectives?.find(obj => obj.id === lessonObjective.id);
          const isGrammar = objDef?.type === 'grammar_lesson';

          options.push({
            text: isGrammar ? "Start Grammar Lesson" : "Start Lesson",
            action: () => {
              hideDialog();
              if (isGrammar) {
                startGrammarLesson(activeQuest.id, lessonObjective.id);
              } else {
                startLesson(activeQuest.id, lessonObjective.id);
              }
            }
          });
        }

        // Check for encounter objectives (journey encounters)
        const encounterObjective = activeQuest.objectives.find(o => {
          if (o.completed) return false;
          const objDef = questData?.objectives?.find(obj => obj.id === o.id);
          return objDef && objDef.type === 'encounter';
        });

        if (encounterObjective && typeof encounterManager !== 'undefined') {
          const objDef = questData?.objectives?.find(obj => obj.id === encounterObjective.id);

          // Check if previous objectives are complete
          const objIndex = questData.objectives.findIndex(obj => obj.id === encounterObjective.id);
          const previousObjectivesComplete = activeQuest.objectives
            .slice(0, objIndex)
            .every(o => o.completed);

          if (previousObjectivesComplete) {
            const encounterLabel = objDef.optional ? `${objDef.text} (Optional)` : objDef.text;
            options.push({
              text: `Begin: ${encounterLabel}`,
              action: () => {
                hideDialog();
                startQuestEncounter(activeQuest.id, encounterObjective.id);
              }
            });
          }
        }

        // Check for special objectives (like Order selection)
        const specialObjective = activeQuest.objectives.find(o => {
          if (o.completed) return false;
          const objDef = questData?.objectives?.find(obj => obj.id === o.id);
          return objDef && objDef.type === 'special';
        });

        if (specialObjective) {
          const objDef = questData?.objectives?.find(obj => obj.id === specialObjective.id);

          // Check if previous objectives are complete (for Order selection, need to speak first)
          const objIndex = questData.objectives.findIndex(obj => obj.id === specialObjective.id);
          const previousObjectivesComplete = activeQuest.objectives
            .slice(0, objIndex)
            .every(o => o.completed);

          if (previousObjectivesComplete && objDef?.target === 'order_selection') {
            options.push({
              text: "Choose Your Order",
              action: () => {
                hideDialog();
                showOrderSelection();
              }
            });
          }
        }

        // Allow shop access during active quests if NPC has shop
        if (npcHasAnyShop(npcId)) {
          options.push({
            text: "Browse Wares",
            action: () => openShop(npcId)
          });
        }

        options.push({
          text: "Goodbye",
          action: hideDialog
        });
      }
    }
  }
  // PRIORITY 2: Check for available quest from this NPC
  else {
    const availableQuest = getAvailableQuests().find(q => q.giver === npcId);
    if (availableQuest) {
      const questDef = getQuest(availableQuest.id);
      dialogText = questDef?.dialogue?.intro || npc.dialogue.quest_intro || dialogText;
      options.push({
        text: "Accept Quest",
        action: () => {
          // Tutorial: First quest accept - check before marking complete
          const isFirstQuest = shouldShowTutorial('acceptedQuest');
          if (isFirstQuest) {
            markTutorialComplete('acceptedQuest');
          }
          acceptQuest(availableQuest.id);
          hideDialog();
          // Show quest panel tutorial after accepting first quest
          if (isFirstQuest) {
            setTimeout(() => {
              showTutorialTip('questPanel', '[data-screen="quests"]', () => {});
            }, 500);
          }
        }
      });
      options.push({
        text: "Not now",
        action: hideDialog
      });
    }
    // PRIORITY 3: Check if NPC has shop (no active or available quest)
    else if (npcHasAnyShop(npcId)) {
      options.push({
        text: "Browse Wares",
        action: () => openShop(npcId)
      });
      options.push({
        text: "Goodbye",
        action: hideDialog
      });
    }
    // PRIORITY 4: Idle dialog
    else {
      const idle = npc.dialogue.idle;
      if (idle && idle.length > 0) {
        dialogText = idle[Math.floor(Math.random() * idle.length)];
      }
      options.push({
        text: "Goodbye",
        action: hideDialog
      });
    }
  }

  showDialog(npc.name, dialogText, options);
}

function showDialog(speaker, text, options = []) {
  const dialogBox = document.getElementById('dialog-box');
  dialogBox.querySelector('.dialog-speaker').textContent = speaker;
  dialogBox.querySelector('.dialog-text').textContent = text;
  
  const optionsContainer = dialogBox.querySelector('.dialog-options');
  optionsContainer.innerHTML = '';
  
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'pixel-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', opt.action);
    optionsContainer.appendChild(btn);
  });
  
  dialogBox.classList.add('active');
  GameState.activeDialog = { speaker, text, options };
}

function hideDialog() {
  const dialogBox = document.getElementById('dialog-box');
  dialogBox.classList.remove('active');
  GameState.activeDialog = null;
}

// =====================================================
// Streak & Multiplier System
// =====================================================

const MULTIPLIER_TABLE = [
  { minStreak: 0, multiplier: 1.0 },
  { minStreak: 3, multiplier: 1.25 },
  { minStreak: 5, multiplier: 1.5 },
  { minStreak: 7, multiplier: 1.75 },
  { minStreak: 10, multiplier: 2.0 },
  { minStreak: 15, multiplier: 2.5 },
  { minStreak: 20, multiplier: 3.0 }  // Cap
];

function getMultiplierForStreak(streak) {
  let multiplier = 1.0;
  for (const tier of MULTIPLIER_TABLE) {
    if (streak >= tier.minStreak) {
      multiplier = tier.multiplier;
    } else {
      break;
    }
  }
  return multiplier;
}

function getNextMultiplierThreshold(streak) {
  for (const tier of MULTIPLIER_TABLE) {
    if (streak < tier.minStreak) {
      return tier.minStreak;
    }
  }
  return null; // Already at max
}

// =====================================================
// Achievement & Milestone Checking
// =====================================================

function checkAchievements() {
  if (!statsManager) return;
  
  const newlyUnlocked = statsManager.checkAllAchievements();
  
  for (const result of newlyUnlocked) {
    // Use WoW-style achievement toast instead of regular notification
    showAchievementToast(result.achievement, result.rewards);
  }
  
  return newlyUnlocked;
}

function checkMilestones() {
  if (!statsManager) return [];

  const allProgress = statsManager.getAllMilestoneProgress();
  const claimable = allProgress.filter(p => p.hasUnclaimedReward);

  // Auto-claim and notify for each claimable milestone
  for (const progress of claimable) {
    const rewards = statsManager.claimMilestoneReward(progress.milestone.id);
    if (rewards && rewards.length > 0) {
      // Show milestone toast (similar to achievement)
      showAchievementToast({
        icon: progress.milestone.icon || '🎯',
        name: `${progress.milestone.name}: ${progress.currentTier.label}`,
        description: progress.milestone.description || 'Milestone reached!'
      }, rewards);
    }
  }

  return claimable;
}

function checkStudyTime() {
  const hour = new Date().getHours();
  
  // Night owl: after midnight (0-4 AM)
  if (hour >= 0 && hour < 5) {
    if (!GameState.player.studiedAfterMidnight) {
      GameState.player.studiedAfterMidnight = true;
      checkAchievements();
    }
  }
  
  // Early bird: before 6 AM (5-6 AM)
  if (hour >= 5 && hour < 6) {
    if (!GameState.player.studiedBeforeSix) {
      GameState.player.studiedBeforeSix = true;
      checkAchievements();
    }
  }
}

function trackLongestStreak(currentStreak) {
  if (currentStreak > GameState.player.longestStreak) {
    GameState.player.longestStreak = currentStreak;
    checkAchievements();
  }
}

function renderStreakDisplay() {
  const state = GameState.lessonState;
  const streakDisplay = document.querySelector('.streak-display');

  if (!streakDisplay) return;

  // Check if streak XP bonus is unlocked (from Village Well project)
  const hasStreakUnlock = villageProjectsManager?.hasUnlock('streak_xp_bonus') || false;

  if (!hasStreakUnlock) {
    // Show locked state - hint at the feature
    streakDisplay.innerHTML = `
      <div class="streak-counter locked">
        <span class="streak-flame">🔒</span>
        <span class="streak-number">?</span>
      </div>
      <div class="multiplier-display locked" title="Complete a Village Project to unlock streak bonuses!">
        <span class="multiplier-value">1x</span>
        <span class="multiplier-progress">Locked</span>
      </div>
    `;
    streakDisplay.classList.remove('has-bonus');
    return;
  }

  const nextThreshold = getNextMultiplierThreshold(state.streak);
  const progressToNext = nextThreshold
    ? `${state.streak}/${nextThreshold}`
    : 'MAX';

  streakDisplay.innerHTML = `
    <div class="streak-counter ${state.streak >= 3 ? 'active' : ''}">
      <span class="streak-flame">${state.streak >= 3 ? '🔥' : '💫'}</span>
      <span class="streak-number">${state.streak}</span>
    </div>
    <div class="multiplier-display ${state.currentMultiplier > 1 ? 'active' : ''}">
      <span class="multiplier-value">${state.currentMultiplier}x</span>
      ${nextThreshold ? `<span class="multiplier-progress">${progressToNext}</span>` : '<span class="multiplier-max">MAX!</span>'}
    </div>
  `;

  // Add animation class if multiplier just increased
  if (state.currentMultiplier > 1) {
    streakDisplay.classList.add('has-bonus');
  } else {
    streakDisplay.classList.remove('has-bonus');
  }
}

function animateMultiplierIncrease() {
  const multiplierDisplay = document.querySelector('.multiplier-display');
  if (multiplierDisplay) {
    multiplierDisplay.classList.add('multiplier-up');
    setTimeout(() => multiplierDisplay.classList.remove('multiplier-up'), 500);
  }
}

function animateStreakBreak() {
  const streakDisplay = document.querySelector('.streak-display');
  if (streakDisplay) {
    streakDisplay.classList.add('streak-break');
    setTimeout(() => streakDisplay.classList.remove('streak-break'), 500);
  }
}

// =====================================================
// Lesson System
// =====================================================

function startLesson(questId, objectiveId) {
  const quest = GAME_DATA.quests[questId];
  if (!quest) {
    console.error('Quest not found:', questId);
    showNotification('Error: Quest not found!', 'error');
    return;
  }

  // Find the specific objective to check for lessonId
  const objective = quest.objectives?.find(o => o.id === objectiveId);

  const questionCount = GameState.settings?.questionCount || 5;
  let questions = [];
  let allVocab = [];
  let lessonData = null;

  // Check if objective or quest uses new lesson system (lessonId)
  // Objective-level lessonId takes priority over quest-level
  const lessonId = objective?.lessonId || quest.lessonId;

  if (lessonId && LESSONS[lessonId]) {
    lessonData = LESSONS[lessonId];
    allVocab = lessonData.words;

    // Generate questions from the lesson
    questions = generateLessonQuestions(lessonId, questionCount);

    // Mark questions with lesson metadata for pattern display
    questions.forEach(q => {
      q.lessonTitle = lessonData.title;
      q.lessonPattern = lessonData.pattern;
      q.patternExplanation = lessonData.patternExplanation;
    });
  } else {
    // Fall back to old vocabulary category system
    const vocabCategories = quest.vocabulary || [];

    vocabCategories.forEach(cat => {
      const [category, subcategory] = cat.split('.');
      const vocab = VOCABULARY[category]?.[subcategory] || [];
      allVocab = allVocab.concat(vocab);
    });

    // Check if we have enough vocabulary
    if (allVocab.length < 4) {
      console.error('Not enough vocabulary for lesson. Found:', allVocab.length, 'words');
      showNotification(`Error: Not enough vocabulary for this lesson (found ${allVocab.length}, need at least 4)`, 'error');
      return;
    }

    questions = generateQuestionsFromVocab(allVocab, questionCount, vocabCategories);
  }

  if (questions.length === 0) {
    showNotification('Error: Could not generate questions!', 'error');
    return;
  }
  
  // Initialize hint system for this lesson
  let hintInfo = { charges: 0, maxCharges: 0 };
  if (hintManager) {
    hintInfo = hintManager.initializeForLesson();
  }
  
  GameState.lessonState = {
    active: true,
    questId,
    objectiveId,
    vocabulary: allVocab,
    questions,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    currentMultiplier: 1.0,
    totalBonusXP: 0,
    totalBonusGold: 0,
    hintCharges: hintInfo.charges,
    maxHintCharges: hintInfo.maxCharges,
    isBossExam: false,
    // New lesson system data
    lessonData: lessonData,
    isStructuredLesson: !!lessonData
  };

  // Show lesson modal first
  showLessonModal();

  // Tutorial: First lesson - show after modal is visible
  if (shouldShowTutorial('startedLesson')) {
    markTutorialComplete('startedLesson');
    setTimeout(() => {
      showTutorialTip('startLesson', '.question-container', () => {});
    }, 500);
  }
}

function generateQuestionsFromVocab(vocab, count, categories = []) {
  const questions = [];
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);

  // Determine how many special questions to include
  // ~15% sentence reorder, ~15% syllable reorder, ~70% vocab
  const specialCount = Math.max(2, Math.floor(count * 0.3));
  const sentenceReorderCount = Math.ceil(specialCount / 2);
  const syllableCount = Math.floor(specialCount / 2);
  const vocabCount = count - sentenceReorderCount - syllableCount;

  // Generate vocabulary translation questions
  for (let i = 0; i < Math.min(vocabCount, shuffled.length); i++) {
    const word = shuffled[i];
    const questionType = Math.random() > 0.5 ? 'to_english' : 'to_french';

    // Get wrong answers
    const wrongAnswers = vocab
      .filter(w => w.french !== word.french)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => questionType === 'to_english' ? w.english : w.french);

    const correctAnswer = questionType === 'to_english' ? word.english : word.french;
    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    questions.push({
      type: questionType,
      word: questionType === 'to_english' ? word.french : word.english,
      prompt: questionType === 'to_english'
        ? 'What does this mean?'
        : 'How do you say this in French?',
      correctAnswer,
      options: allAnswers,
      hint: word.hint
    });
  }

  // Generate sentence reorder questions if REORDER_SENTENCES is available
  if (typeof REORDER_SENTENCES !== 'undefined' && typeof generateReorderQuestion === 'function') {
    // Determine which category to use for reorder sentences
    let reorderCategory = 'greetings'; // default
    if (categories.length > 0) {
      // Extract base category from first vocab category (e.g., "family.beginner" -> "family")
      const baseCategory = categories[0].split('.')[0];
      if (REORDER_SENTENCES[baseCategory]) {
        reorderCategory = baseCategory;
      }
    }

    for (let i = 0; i < sentenceReorderCount; i++) {
      const reorderQ = generateReorderQuestion(reorderCategory);
      questions.push(reorderQ);
    }
  }

  // Generate syllable reorder questions if SYLLABLE_WORDS is available
  if (typeof SYLLABLE_WORDS !== 'undefined' && typeof generateSyllableQuestion === 'function') {
    for (let i = 0; i < syllableCount; i++) {
      // Use beginner tier by default, could be enhanced to match lesson difficulty
      const syllableQ = generateSyllableQuestion('beginner');
      questions.push(syllableQ);
    }
  }

  // Shuffle all questions so special questions are mixed in
  return questions.sort(() => Math.random() - 0.5);
}

// =====================================================
// Grammar Lesson System
// =====================================================

/**
 * Start a grammar lesson from a quest
 * @param {string} questId - Quest ID
 * @param {string} objectiveId - Objective ID with grammar_lesson type
 */
function startGrammarLesson(questId, objectiveId) {
  // Try to find quest in GRAMMAR_QUESTS first, then GAME_DATA.quests
  const quest = (typeof GRAMMAR_QUESTS !== 'undefined' && GRAMMAR_QUESTS[questId]) 
    || GAME_DATA.quests[questId];
    
  if (!quest) {
    console.error('Grammar quest not found:', questId);
    showNotification('Error: Quest not found!', 'error');
    return;
  }
  
  // Find the objective with grammar config
  const objective = quest.objectives?.find(obj => obj.id === objectiveId);
  if (!objective || !objective.grammarConfig) {
    console.error('Grammar config not found for objective:', objectiveId);
    showNotification('Error: Grammar configuration not found!', 'error');
    return;
  }
  
  // Generate questions from grammar config
  const questions = generateGrammarQuestions(objective.grammarConfig);
  
  if (questions.length === 0) {
    showNotification('Error: Could not generate grammar questions!', 'error');
    return;
  }

  // Initialize hint system
  let hintInfo = { charges: 0, maxCharges: 0 };
  if (hintManager) {
    hintInfo = hintManager.initializeForLesson();
  }
  
  GameState.lessonState = {
    active: true,
    questId,
    objectiveId,
    isGrammarLesson: true,
    vocabulary: [],
    questions,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    currentMultiplier: 1.0,
    totalBonusXP: 0,
    totalBonusGold: 0,
    hintCharges: hintInfo.charges,
    maxHintCharges: hintInfo.maxCharges,
    usedStreakProtection: false,
    isBossExam: false
  };

  // Show lesson modal first
  showLessonModal();

  // Tutorial: First lesson - show after modal is visible
  if (shouldShowTutorial('startedLesson')) {
    markTutorialComplete('startedLesson');
    setTimeout(() => {
      showTutorialTip('startLesson', '.question-container', () => {});
    }, 500);
  }
}

/**
 * Generate grammar questions from config
 * @param {Array} grammarConfig - Array of { type, topic, count }
 * @returns {Array} Array of question objects
 */
function generateGrammarQuestions(grammarConfig) {
  const questions = [];

  grammarConfig.forEach(config => {
    const { type, topic, count } = config;

    switch (type) {
      case 'conjugation':
        questions.push(...generateConjugationQuestions(topic, count));
        break;
      case 'fill_in_blank':
        questions.push(...generateFillInBlankQuestions(topic, count));
        break;
      case 'gender_match':
        questions.push(...generateGenderMatchQuestions(count));
        break;
      default:
        console.warn('Unknown grammar question type:', type);
    }
  });

  // Shuffle all questions
  const shuffled = questions.sort(() => Math.random() - 0.5);

  // Respect questionCount setting (limit total questions)
  const questionCount = GameState.settings?.questionCount || 5;
  return shuffled.slice(0, questionCount);
}

/**
 * Generate conjugation questions (e.g., "Conjugate être for 'je'")
 */
function generateConjugationQuestions(verbId, count) {
  const questions = [];
  
  if (typeof GRAMMAR === 'undefined' || !GRAMMAR.verbs[verbId]) {
    console.warn('Verb not found:', verbId);
    return questions;
  }
  
  const verb = GRAMMAR.verbs[verbId];
  const pronouns = Object.keys(verb.present);
  const shuffledPronouns = [...pronouns].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffledPronouns.length); i++) {
    const pronoun = shuffledPronouns[i];
    const correctAnswer = verb.present[pronoun];
    
    // Get wrong answers from other conjugations
    const wrongAnswers = Object.values(verb.present)
      .filter(v => v !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    questions.push({
      type: 'conjugation',
      grammarType: 'conjugation',
      verb: verb.infinitive,
      verbId: verbId,
      pronoun: pronoun,
      word: `${pronoun} ___ (${verb.infinitive})`,
      prompt: `Conjugate "${verb.infinitive}" (${verb.english}) for "${pronoun}"`,
      correctAnswer,
      options: allAnswers,
      hint: verb.hint || `${verb.infinitive} - ${verb.english}`,
      translation: `${pronoun} ${correctAnswer}`
    });
  }
  
  return questions;
}

/**
 * Generate fill-in-the-blank questions
 */
function generateFillInBlankQuestions(topicId, count) {
  const questions = [];
  
  if (typeof GRAMMAR === 'undefined' || !GRAMMAR.fillInBlank[topicId]) {
    console.warn('Fill-in-blank topic not found:', topicId);
    return questions;
  }
  
  const topic = GRAMMAR.fillInBlank[topicId];
  const shuffledQuestions = [...topic.questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffledQuestions.length); i++) {
    const q = shuffledQuestions[i];
    
    questions.push({
      type: 'fill_in_blank',
      grammarType: 'fill_in_blank',
      word: q.sentence,
      prompt: 'Fill in the blank',
      correctAnswer: q.answer,
      options: [...q.options].sort(() => Math.random() - 0.5),
      hint: q.hint,
      translation: q.translation
    });
  }
  
  return questions;
}

/**
 * Generate gender match questions (le/la/un/une)
 */
function generateGenderMatchQuestions(count) {
  const questions = [];
  
  if (typeof GRAMMAR === 'undefined' || !GRAMMAR.nouns) {
    console.warn('Nouns not found in GRAMMAR');
    return questions;
  }
  
  // Combine masculine and feminine nouns with their genders
  const allNouns = [
    ...GRAMMAR.nouns.masculine.map(n => ({ ...n, gender: 'masculine', article: 'le' })),
    ...GRAMMAR.nouns.feminine.map(n => ({ ...n, gender: 'feminine', article: 'la' }))
  ].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, allNouns.length); i++) {
    const noun = allNouns[i];
    
    questions.push({
      type: 'gender_match',
      grammarType: 'gender_match',
      word: noun.french,
      prompt: `What is the correct article for "${noun.french}" (${noun.english})?`,
      correctAnswer: noun.article,
      options: ['le', 'la'].sort(() => Math.random() - 0.5),
      hint: noun.hint,
      translation: `${noun.article} ${noun.french} = the ${noun.english}`
    });
  }
  
  return questions;
}

/**
 * Check if a quest objective is a grammar lesson
 */
function isGrammarObjective(quest, objectiveId) {
  const objective = quest.objectives?.find(obj => obj.id === objectiveId);
  return objective?.type === 'grammar_lesson';
}

// =====================================================
// Boss Exam Functions
// =====================================================

function startBossExam(locationId) {
  if (!bossExamManager) {
    showNotification("Exam system not initialized!", 'error');
    return;
  }
  
  const result = bossExamManager.startExam(locationId);
  
  if (!result.success) {
    showNotification(result.message, 'error');
    return;
  }
  
  // Set the lesson state
  GameState.lessonState = result.lessonState;
  
  // Update lesson modal title for exam
  const lessonTitle = document.querySelector('.lesson-title');
  if (lessonTitle) {
    lessonTitle.innerHTML = '📜 BOSS EXAM';
  }
  
  showLessonModal();
}

function showExamInfo(locationId) {
  if (!bossExamManager) return;
  
  const examInfo = bossExamManager.getExamInfo(locationId);
  if (!examInfo) {
    showNotification("No exam at this location.", 'info');
    return;
  }
  
  const history = examInfo.history;
  const config = examInfo.config;
  
  let historyHtml = '';
  if (history.attempts > 0) {
    historyHtml = `
      <div style="margin: 16px 0; padding: 12px; background: var(--bg-medium); border: 2px solid var(--border-pixel);">
        <div style="font-family: var(--font-display); font-size: 10px; color: var(--accent-gold); margin-bottom: 8px;">YOUR HISTORY</div>
        <div style="font-size: 14px;">Attempts: ${history.attempts}</div>
        <div style="font-size: 14px;">Best Score: ${history.bestScore}%</div>
        <div style="font-size: 14px;">Status: ${history.passed ? '<span style="color: var(--accent-green);">PASSED</span>' : '<span style="color: var(--accent-red);">Not Passed</span>'}</div>
      </div>
    `;
  }
  
  showModal('exam-info-modal', `
    <div style="text-align: center; max-width: 400px;">
      <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px;">
        📜 ${examInfo.locationName} Exam
      </h2>
      
      <div style="text-align: left; margin-bottom: 16px;">
        <p style="margin-bottom: 8px;"><strong>Questions:</strong> ${config.questionCount}</p>
        <p style="margin-bottom: 8px;"><strong>Pass Threshold:</strong> ${config.passThreshold}%</p>
        <p style="margin-bottom: 8px;"><strong>HP Penalty:</strong> ${config.hpPenalty} per wrong answer</p>
        <p style="margin-bottom: 8px;"><strong>Hints:</strong> ${config.hintMultiplier === 0 ? 'Disabled' : 'Limited'}</p>
      </div>
      
      ${historyHtml}
      
      ${examInfo.canAttempt 
        ? `<button class="pixel-btn pixel-btn-gold" onclick="hideModal('exam-info-modal'); startBossExam('${locationId}');">
            Begin Exam
          </button>`
        : `<p style="color: var(--accent-red); margin-bottom: 16px;">${examInfo.canAttemptReason}</p>`
      }
      
      <button class="pixel-btn" onclick="hideModal('exam-info-modal')" style="margin-left: 8px;">
        Close
      </button>
    </div>
  `);
}

function showLessonModal() {
  const modal = document.getElementById('lesson-modal');
  modal.classList.add('active');

  const state = GameState.lessonState;

  // For structured lessons, show intro first
  if (state.isStructuredLesson && state.lessonData) {
    renderLessonIntro();
  } else {
    renderQuestion();
    renderStreakDisplay();
  }
}

function renderLessonIntro() {
  const state = GameState.lessonState;
  const lesson = state.lessonData;

  // Update lesson title
  const lessonTitle = document.querySelector('.lesson-title');
  if (lessonTitle) {
    lessonTitle.innerHTML = `📚 ${lesson.title}`;
  }

  // Hide streak display during intro
  const streakDisplay = document.querySelector('.streak-display');
  if (streakDisplay) streakDisplay.style.display = 'none';

  // Hide progress dots during intro
  const progressBar = document.querySelector('.lesson-progress');
  if (progressBar) progressBar.style.display = 'none';

  // Render intro content in the question container
  const questionContainer = document.querySelector('.question-container');

  // Handle "none" pattern - show friendly text for non-cognate lessons
  const patternDisplay = lesson.pattern === 'none' ? 'Core Vocabulary' : lesson.pattern.toUpperCase();

  questionContainer.innerHTML = `
    <div class="lesson-intro">
      <div class="lesson-intro-pattern">${patternDisplay}</div>
      <p class="lesson-intro-description">${lesson.description}</p>
      <div class="lesson-intro-explanation">${lesson.patternExplanation}</div>
      <div class="lesson-intro-preview">
        <span class="preview-label">Words you'll learn:</span>
        <span class="preview-words">${lesson.words.slice(0, 4).map(w => w.french).join(', ')}...</span>
      </div>
      <button class="pixel-btn lesson-start-btn" onclick="startLessonQuestions()">Begin Lesson</button>
    </div>
  `;

  // Hide other elements during intro
  const feedback = document.querySelector('.lesson-feedback');
  if (feedback) feedback.style.display = 'none';

  const answerOptions = document.querySelector('.answer-options');
  if (answerOptions) answerOptions.style.display = 'none';

  const hintBox = document.querySelector('.hint-box');
  if (hintBox) hintBox.style.display = 'none';
}

function startLessonQuestions() {
  // Show elements hidden during intro
  const streakDisplay = document.querySelector('.streak-display');
  if (streakDisplay) streakDisplay.style.display = '';

  const progressBar = document.querySelector('.lesson-progress');
  if (progressBar) progressBar.style.display = '';

  const feedback = document.querySelector('.lesson-feedback');
  if (feedback) feedback.style.display = '';

  const answerOptions = document.querySelector('.answer-options');
  if (answerOptions) answerOptions.style.display = '';

  const hintBox = document.querySelector('.hint-box');
  if (hintBox) hintBox.style.display = '';

  // Restore question container structure (was replaced by intro)
  const questionContainer = document.querySelector('.question-container');
  questionContainer.innerHTML = `
    <div class="question-prompt">What does this mean?</div>
    <div class="question-word">le mot</div>
  `;

  // Start questions
  renderQuestion();
  renderStreakDisplay();
}

function confirmExitLesson() {
  const state = GameState.lessonState;
  if (!state.active) return;

  // Show confirmation dialog
  const progress = state.currentQuestion;
  const total = state.questions.length;
  const correct = state.correctAnswers;

  showModal('exit-lesson-modal', `
    <div style="text-align: center; max-width: 400px;">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px;">
        ⚠️ Exit Lesson?
      </h2>
      <p style="margin-bottom: 16px; color: var(--text-light);">
        Progress: ${progress}/${total} questions (${correct} correct)
      </p>
      <p style="margin-bottom: 20px; color: var(--text-muted); font-size: 12px;">
        Progress will be lost and you'll need to restart this lesson.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="pixel-btn" onclick="hideModal('exit-lesson-modal')">Continue Lesson</button>
        <button class="pixel-btn" style="background: var(--accent-red);" onclick="exitLesson()">Exit</button>
      </div>
    </div>
  `);
}

function exitLesson() {
  hideModal('exit-lesson-modal');
  document.getElementById('lesson-modal').classList.remove('active');

  // Reset lesson title
  const lessonTitle = document.querySelector('.lesson-title');
  if (lessonTitle) {
    lessonTitle.innerHTML = '📚 FRENCH LESSON';
  }

  resetLessonState();
  showNotification('Lesson abandoned', 'info');
}

function renderQuestion() {
  const state = GameState.lessonState;
  
  // Guard against empty questions
  if (!state.questions || state.questions.length === 0) {
    console.error('No questions generated for lesson');
    showNotification('Error: No vocabulary found for this lesson!', 'error');
    document.getElementById('lesson-modal').classList.remove('active');
    resetLessonState();
    return;
  }
  
  const question = state.questions[state.currentQuestion];
  
  // Guard against undefined question
  if (!question) {
    console.error('Question not found at index:', state.currentQuestion);
    completeLessonSession();
    return;
  }
  
  // Update progress dots
  const progressHtml = state.questions.map((_, i) => {
    let className = 'progress-dot';
    if (i < state.currentQuestion) {
      className += state.questions[i].wasCorrect ? ' completed' : ' wrong';
    } else if (i === state.currentQuestion) {
      className += ' current';
    }
    return `<div class="${className}"></div>`;
  }).join('');

  document.querySelector('.lesson-progress').innerHTML = progressHtml;

  // Update question
  document.querySelector('.question-prompt').textContent = question.prompt;
  document.querySelector('.question-word').textContent = question.word;

  // Handle sentence reorder questions differently
  if (question.type === 'sentence_reorder') {
    renderSentenceReorderQuestion(question);
  } else if (question.type === 'syllable_reorder') {
    renderSyllableReorderQuestion(question);
  } else {
    // Standard multiple choice answers
    const answersHtml = question.options.map((opt, i) =>
      `<button class="answer-btn" data-answer="${opt}"><span class="key-hint">${i + 1}</span>${opt}</button>`
    ).join('');
    document.querySelector('.answer-options').innerHTML = answersHtml;

    // Add click handlers for standard questions
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn.dataset.answer));
    });
  }

  // Update hint display with new system
  renderHintBox(question);

  // Clear feedback
  document.querySelector('.lesson-feedback').textContent = '';
  document.querySelector('.lesson-feedback').className = 'lesson-feedback';
}

// =====================================================
// Unified Reorder System (words and syllables)
// =====================================================

const reorderSystem = {
  state: {
    selected: [],
    available: [],
    correctOrder: [],
    type: 'word', // 'word' or 'syllable'
    joiner: ' '   // ' ' for words, '' for syllables
  },

  init(items, correctOrder, type) {
    this.state = {
      selected: [],
      available: [...items],
      correctOrder: correctOrder,
      type: type,
      joiner: type === 'syllable' ? '' : ' '
    };
  },

  render() {
    const s = this.state;
    const prefix = s.type === 'syllable' ? 'syllable' : 'reorder';
    const itemName = s.type === 'syllable' ? 'syllables' : 'words';
    const placeholder = s.type === 'syllable'
      ? 'Click syllables to build the word...'
      : 'Click words to build the sentence...';

    const answersContainer = document.querySelector('.answer-options');
    answersContainer.innerHTML = `
      <div class="${prefix}-container">
        <div class="${prefix}-selected" id="${prefix}-selected">
          <span class="${prefix}-placeholder">${placeholder}</span>
        </div>
        <div class="${prefix}-available" id="${prefix}-available">
          ${s.available.map((item, idx) =>
            `<button class="${prefix}-btn ${prefix}-word-btn" data-item="${item}" data-index="${idx}">${item}</button>`
          ).join('')}
        </div>
        <div class="${prefix}-actions">
          <button class="pixel-btn ${prefix}-clear-btn" onclick="reorderSystem.clear()">Clear</button>
          <button class="pixel-btn ${prefix}-submit-btn" onclick="reorderSystem.submit()">Submit</button>
        </div>
      </div>
    `;

    // Add click handlers
    document.querySelectorAll(`.${prefix}-btn`).forEach(btn => {
      btn.addEventListener('click', () => this.select(btn));
    });

    this.updateDisplay();
  },

  select(btn) {
    const item = btn.dataset.item;
    const index = parseInt(btn.dataset.index);

    this.state.selected.push({ item, originalIndex: index });
    btn.classList.add('used');
    btn.disabled = true;

    this.updateDisplay();
  },

  remove(selectedIndex) {
    const removed = this.state.selected.splice(selectedIndex, 1)[0];
    const prefix = this.state.type === 'syllable' ? 'syllable' : 'reorder';
    const btn = document.querySelector(`.${prefix}-btn[data-index="${removed.originalIndex}"]`);
    if (btn) {
      btn.classList.remove('used');
      btn.disabled = false;
    }
    this.updateDisplay();
  },

  updateDisplay() {
    const s = this.state;
    const prefix = s.type === 'syllable' ? 'syllable' : 'reorder';
    const selectedContainer = document.getElementById(`${prefix}-selected`);
    const placeholder = s.type === 'syllable'
      ? 'Click syllables to build the word...'
      : 'Click words to build the sentence...';

    if (s.selected.length === 0) {
      selectedContainer.innerHTML = `<span class="${prefix}-placeholder">${placeholder}</span>`;
    } else if (s.type === 'syllable') {
      selectedContainer.innerHTML = s.selected.map((item, idx) =>
        `<span class="syllable-selected-part" onclick="reorderSystem.remove(${idx})">${item.item}</span>`
      ).join('<span class="syllable-connector">·</span>');
    } else {
      selectedContainer.innerHTML = s.selected.map((item, idx) =>
        `<span class="reorder-selected-word" onclick="reorderSystem.remove(${idx})">${item.item}</span>`
      ).join('');
    }
  },

  clear() {
    const prefix = this.state.type === 'syllable' ? 'syllable' : 'reorder';
    document.querySelectorAll(`.${prefix}-btn`).forEach(btn => {
      btn.classList.remove('used');
      btn.disabled = false;
    });
    this.state.selected = [];
    this.updateDisplay();
  },

  submit() {
    const s = this.state;
    const userAnswer = s.selected.map(item => item.item);
    const userAnswerStr = userAnswer.join(s.joiner);
    const itemName = s.type === 'syllable' ? 'syllables' : 'words';

    if (userAnswer.length !== s.correctOrder.length) {
      showNotification(`Use all the ${itemName}!`, 'warning');
      return;
    }

    const isCorrect = userAnswer.every((item, idx) => item === s.correctOrder[idx]);
    handleAnswer(userAnswerStr, isCorrect);
  }
};

// Legacy function wrappers for compatibility
function renderSentenceReorderQuestion(question) {
  reorderSystem.init(question.shuffledWords, question.correctOrder, 'word');
  reorderSystem.render();
}

function renderSyllableReorderQuestion(question) {
  reorderSystem.init(question.shuffledSyllables, question.correctOrder, 'syllable');
  reorderSystem.render();
  showTutorialTip('syllableQuestion', '.syllable-container', () => {});
}

// Legacy functions that redirect to unified system
function selectReorderWord(btn) { reorderSystem.select(btn); }
function removeReorderWord(idx) { reorderSystem.remove(idx); }
function updateReorderDisplay() { reorderSystem.updateDisplay(); }
function clearReorderSelection() { reorderSystem.clear(); }
function submitReorderAnswer() { reorderSystem.submit(); }
function selectSyllable(btn) { reorderSystem.select(btn); }
function removeSyllable(idx) { reorderSystem.remove(idx); }
function updateSyllableDisplay() { reorderSystem.updateDisplay(); }
function clearSyllableSelection() { reorderSystem.clear(); }
function submitSyllableAnswer() { reorderSystem.submit(); }

function renderHintBox(question) {
  const hintBox = document.querySelector('.hint-box');
  const showHintsSetting = GameState.settings?.showHints || 'request';
  const autoShow = GameState.settings?.hintAutoShow || false;
  
  // If hints are set to "never", hide the entire hint box
  if (showHintsSetting === 'never') {
    hintBox.style.display = 'none';
    return;
  }
  hintBox.style.display = '';
  
  // Get word data for hint checking
  const wordData = {
    french: question.type === 'to_english' ? question.word : question.correctAnswer,
    english: question.type === 'to_english' ? question.correctAnswer : question.word,
    hint: question.hint
  };
  
  // Check hint availability
  if (!hintManager) {
    // Fallback if no hint manager
    hintBox.innerHTML = `<span class="hint-locked">💡 Hints unavailable</span>`;
    return;
  }
  
  const status = hintManager.getHintStatus(wordData);
  const progress = hintManager.getUnlockProgress(wordData);
  const state = GameState.lessonState;
  
  // Boss exam mode - no hints
  if (state.isBossExam && state.maxHintCharges === 0) {
    hintBox.innerHTML = `<span class="hint-locked">🚫 Hints disabled for exam</span>`;
    return;
  }
  
  // If hints set to "always" or autoShow is on, show hint immediately if available
  if ((showHintsSetting === 'always' || autoShow) && status.available && question.hint) {
    hintBox.innerHTML = `<span class="hint-text">💡 ${question.hint}</span>`;
    hintBox.className = 'hint-box hint-revealed';
    return;
  }
  
  // Render hint charges display
  const chargesDisplay = `<span class="hint-charges">Hints: ${hintManager.lessonCharges}/${hintManager.maxCharges} 💡</span>`;

  if (status.available) {
    // Hint available - show button to reveal
    hintBox.innerHTML = `
      ${chargesDisplay}
      <button class="hint-reveal-btn" onclick="revealHint()">
        Reveal Hint (costs 1 charge)
      </button>
    `;
    hintBox.className = 'hint-box hint-available';

    // Show tutorial on first hint availability
    showTutorialTip('useHint', '.hint-reveal-btn', () => {});
  } else if (!status.unlocked) {
    // Hint locked for this word
    hintBox.innerHTML = `
      ${chargesDisplay}
      <span class="hint-locked">🔒 Word hint locked</span>
      <span class="hint-progress">(${progress.current}/${progress.required} correct to unlock)</span>
    `;
    hintBox.className = 'hint-box hint-locked-state';
  } else {
    // Hint unlocked but no charges
    hintBox.innerHTML = `
      ${chargesDisplay}
      <span class="hint-no-charges">No charges remaining</span>
    `;
    hintBox.className = 'hint-box hint-no-charges-state';
  }
}

function revealHint() {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];
  
  const wordData = {
    french: question.type === 'to_english' ? question.word : question.correctAnswer,
    english: question.type === 'to_english' ? question.correctAnswer : question.word,
    hint: question.hint
  };
  
  if (!hintManager) return;
  
  const result = hintManager.useHint(wordData, question.hint);
  
  if (result.success) {
    // Show the hint
    const hintBox = document.querySelector('.hint-box');
    const chargesDisplay = `<span class="hint-charges">${result.chargesRemaining}/${hintManager.maxCharges} 💡</span>`;
    
    hintBox.innerHTML = `
      ${chargesDisplay}
      <span class="hint-revealed">💡 ${result.hint || 'No hint available'}</span>
    `;
    hintBox.className = 'hint-box hint-revealed-state';
    
    // Update lesson state
    state.hintCharges = result.chargesRemaining;
  } else {
    showNotification(result.message, 'error');
  }
}

function handleAnswer(answer, isCorrectOverride = null) {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];

  // Use override if provided (for sentence reorder), otherwise compare answers
  const isCorrect = isCorrectOverride !== null ? isCorrectOverride : (answer === question.correctAnswer);

  const previousMultiplier = state.currentMultiplier;

  // Handle UI feedback based on question type
  if (question.type === 'sentence_reorder') {
    // Disable reorder buttons and show result
    document.querySelectorAll('.reorder-word-btn').forEach(btn => btn.disabled = true);
    document.querySelector('.reorder-submit-btn').disabled = true;
    document.querySelector('.reorder-clear-btn').disabled = true;

    const selectedContainer = document.getElementById('reorder-selected');
    if (isCorrect) {
      selectedContainer.classList.add('correct');
    } else {
      selectedContainer.classList.add('wrong');
      // Show correct answer below
      selectedContainer.innerHTML += `<div class="reorder-correct-answer">Correct: ${question.correctAnswer}</div>`;
    }
  } else if (question.type === 'syllable_reorder') {
    // Disable syllable buttons and show result
    document.querySelectorAll('.syllable-btn').forEach(btn => btn.disabled = true);
    document.querySelector('.syllable-submit-btn').disabled = true;
    document.querySelector('.syllable-clear-btn').disabled = true;

    const selectedContainer = document.getElementById('syllable-selected');
    if (isCorrect) {
      selectedContainer.classList.add('correct');
    } else {
      selectedContainer.classList.add('wrong');
      // Show correct answer below
      selectedContainer.innerHTML += `<div class="syllable-correct-answer">Correct: ${question.correctAnswer}</div>`;
    }
  } else {
    // Standard multiple choice - disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === question.correctAnswer) {
        btn.classList.add('correct');
      } else if (btn.dataset.answer === answer && !isCorrect) {
        btn.classList.add('wrong');
      }
    });
  }
  
  // Track word in spaced repetition system
  const wordData = question.wordData || {
    french: question.type === 'to_english' ? question.word : question.correctAnswer,
    english: question.type === 'to_english' ? question.correctAnswer : question.word,
    hint: question.hint
  };
  
  if (srManager) {
    srManager.recordWordSeen(wordData);
  }
  
  // Show feedback
  const feedback = document.querySelector('.lesson-feedback');
  if (isCorrect) {
    // Track correct in SR system
    let srResult = null;
    if (srManager) {
      srResult = srManager.recordCorrect(wordData);
    }
    
    // Increase streak
    state.streak++;
    state.correctAnswers++;
    question.wasCorrect = true;
    
    // Update multiplier
    state.currentMultiplier = getMultiplierForStreak(state.streak);
    
    // Build feedback message
    let feedbackMsg = '✓ Correct!';
    
    // Check if multiplier increased
    if (state.currentMultiplier > previousMultiplier) {
      animateMultiplierIncrease();
      feedbackMsg = `✓ Correct! <span class="multiplier-increase">🔥 ${state.currentMultiplier}x MULTIPLIER!</span>`;
    } else if (state.streak >= 3) {
      feedbackMsg = `✓ Correct! <span class="streak-bonus">🔥 ${state.streak} streak!</span>`;
    }
    
    // Add mastery level up notification
    if (srResult && srResult.leveledUp) {
      feedbackMsg += ` <span class="mastery-up">📈 ${srResult.levelName}!</span>`;
    }
    
    feedback.innerHTML = feedbackMsg;
    feedback.className = 'lesson-feedback correct';
    
    // Track player stats
    GameState.player.totalCorrectAnswers++;
    
    // Track longest streak
    trackLongestStreak(state.streak);
    
    // Track study time for achievements
    checkStudyTime();
    
  } else {
    // Track wrong in SR system
    let srResult = null;
    if (srManager) {
      srResult = srManager.recordWrong(wordData);
    }
    
    // Check Agility streak protection
    let streakProtected = false;
    if (state.streak >= 3 && !state.usedStreakProtection) {
      if (statsManager && statsManager.hasStreakProtection()) {
        streakProtected = true;
        state.usedStreakProtection = true;
      }
    }
    
    // Break streak (unless protected)
    const hadStreak = state.streak >= 3;
    if (!streakProtected) {
      state.streak = 0;
      state.currentMultiplier = 1.0;
    }
    state.wrongAnswers++;
    question.wasCorrect = false;
    
    // Build feedback message
    let feedbackMsg = `✗ The answer was: <strong>${question.correctAnswer}</strong>`;

    if (streakProtected) {
      feedbackMsg = `✗ <span class="streak-protected">💨 Agility saved your streak!</span> The answer was: <strong>${question.correctAnswer}</strong>`;
    } else if (hadStreak) {
      animateStreakBreak();
      feedbackMsg = `✗ Streak lost! The answer was: <strong>${question.correctAnswer}</strong>`;
    }

    // Add pattern explanation for structured lessons (fail-then-learn)
    if (question.patternExplanation) {
      feedbackMsg += `<div class="pattern-hint">${question.patternExplanation}</div>`;
    }

    feedback.innerHTML = feedbackMsg;
    feedback.className = 'lesson-feedback wrong';

    // HP penalty
    damagePlayer(10);

    // Tutorial: First wrong answer - just mark complete, show notification
    // (Don't show a tip popup during lesson - it's disruptive)
    if (shouldShowTutorial('wrongAnswer')) {
      markTutorialComplete('wrongAnswer');
      // Show a brief notification instead of full tutorial tip
      showNotification('💡 Tip: Wrong answers cost HP!', 'info');
    }
    
    // Track player stats
    GameState.player.totalWrongAnswers++;
  }
  
  // Update streak display
  renderStreakDisplay();

  // Move to next question after delay (longer for wrong answers so player can study correct answer)
  const feedbackDelay = isCorrect ? 1500 : 4000;
  setTimeout(() => {
    state.currentQuestion++;

    if (state.currentQuestion >= state.questions.length) {
      completeLessonSession();
    } else {
      renderQuestion();
    }
  }, feedbackDelay);
}

function completeLessonSession() {
  const state = GameState.lessonState;
  const successRate = state.correctAnswers / state.questions.length;
  const isReview = state.isReview || false;
  const isBossExam = state.isBossExam || false;
  
  // Hide lesson modal
  document.getElementById('lesson-modal').classList.remove('active');
  
  // Reset lesson title for next time
  const lessonTitle = document.querySelector('.lesson-title');
  if (lessonTitle) {
    lessonTitle.innerHTML = '📚 FRENCH LESSON';
  }
  
  // Reset hint manager
  if (hintManager) {
    hintManager.resetLesson();
  }
  
  // Handle boss exam completion
  if (isBossExam && bossExamManager) {
    const result = bossExamManager.completeExam(state);
    
    // Update player stats
    GameState.player.lessonsCompleted++;
    if (successRate === 1) {
      GameState.player.perfectLessons++;
    }
    
    if (result.passed) {
      // Award XP with multiplier
      const xpReward = result.rewards?.xp || 100;
      addXP(xpReward);
      
      showNotification(`🎉 EXAM PASSED! ${result.scorePercent}%`, 'success');
      
      if (result.rewards?.gold) {
        setTimeout(() => {
          showNotification(`+${result.rewards.gold} gold!`, 'success');
        }, 500);
      }
      
      if (result.rewards?.unlockedLocations?.length > 0) {
        setTimeout(() => {
          result.rewards.unlockedLocations.forEach(loc => {
            showNotification(`🗺️ Unlocked: ${loc.name}!`, 'success');
          });
        }, 1000);
      }
      
      // Award exam title if first pass
      if (!result.wasAlreadyPassed && titleManager) {
        titleManager.awardTitle('exam_conqueror');
        if (result.scorePercent === 100) {
          titleManager.awardTitle('perfect_exam');
        }
      }

      // Award higher tier essence for boss exams
      if (typeof alchemyManager !== 'undefined' && alchemyManager) {
        if (result.scorePercent === 100) {
          // Perfect exam: 3 vivid + 1 brilliant
          alchemyManager.addEssence('vivid', 3);
          alchemyManager.addEssence('brilliant', 1);
        } else {
          // Passed exam: 2 clear + 1 vivid
          alchemyManager.addEssence('clear', 2);
          alchemyManager.addEssence('vivid', 1);
        }
      }
    } else {
      showNotification(`Exam Failed. ${result.scorePercent}% (need ${result.passThreshold}%)`, 'error');
      setTimeout(() => {
        showNotification('Complete a review session to retry.', 'info');
      }, 500);
    }
    
    // Check achievements
    checkAchievements();
    
    renderHUD();
    autoSave();
    resetLessonState();
    return;
  }
  
  // Handle review session completion
  if (isReview) {
    // HP recovery based on performance
    const hpRecovery = Math.floor(GameState.player.maxHp * successRate);
    GameState.player.hp = Math.min(GameState.player.maxHp, GameState.player.hp + hpRecovery);

    // Track review recovery for achievement
    GameState.player.reviewRecoveries++;

    // Small XP reward for reviewing
    const reviewXP = Math.floor(15 * successRate);
    if (reviewXP > 0) {
      addXP(reviewXP);
    }

    // Update player stats
    GameState.player.lessonsCompleted++;

    // Track perfect lesson
    const isPerfect = successRate === 1;
    if (isPerfect) {
      GameState.player.perfectLessons++;
    }

    // Check achievements and milestones
    checkAchievements();
    checkMilestones();

    renderHUD();
    autoSave();

    // Show completion screen
    showLessonCompletionScreen({
      lessonType: 'review',
      passed: true,
      successRate,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      totalQuestions: state.questions.length,
      xpEarned: reviewXP,
      bonusXP: 0,
      hpRecovered: hpRecovery,
      hpLost: 0,
      isPerfect
    });

    // Reset lesson state
    resetLessonState();
    return;
  }

  // Regular lesson completion
  const passThreshold = 0.6; // 60% to pass
  const passed = successRate >= passThreshold;
  const isPerfect = successRate === 1;

  // Calculate HP lost from wrong answers (tracked during lesson)
  const hpLost = state.wrongAnswers * 10; // Assuming 10 HP per wrong answer

  // Track level before XP award to detect level up
  const levelBefore = GameState.player.level;

  let totalXP = 0;
  let xpCalculation = null;
  let essenceEarned = null;

  if (passed) {
    // Update quest progress - defer quest completion until after lesson screen
    updateQuestProgress(state.questId, state.objectiveId, 1, true);

    // Auto-complete any task objectives in the same quest
    autoCompleteTaskObjectives(state.questId);

    // Calculate base XP
    const baseXP = 25 + Math.floor(successRate * 50);

    // Use BonusCalculator for full breakdown
    xpCalculation = BonusCalculator.calculateXP(baseXP, {
      streak: state.correctAnswers,
      isPerfect
    });
    totalXP = xpCalculation.total;

    // Award XP (without double-applying account multipliers since BonusCalculator handles it)
    GameState.player.xp += totalXP;
    while (GameState.player.xp >= GameState.player.xpToNext) {
      levelUpSilent();
    }

    // Update player lesson stats
    GameState.player.lessonsCompleted++;

    // Track perfect lesson
    if (isPerfect) {
      GameState.player.perfectLessons++;
    }

    // Check for hidden quest triggers
    checkHiddenQuestTriggers();

    // Check achievements and milestones
    checkAchievements();
    checkMilestones();

    // Award linguistic essence based on performance
    if (typeof alchemyManager !== 'undefined' && alchemyManager) {
      if (isPerfect) {
        // Perfect: 3 faded + 1 clear
        alchemyManager.addEssence('faded', 3);
        alchemyManager.addEssence('clear', 1);
        essenceEarned = { type: 'faded', amount: 3 };
      } else if (successRate >= 0.8) {
        // Good: 2 faded
        alchemyManager.addEssence('faded', 2);
        essenceEarned = { type: 'faded', amount: 2 };
      } else {
        // Passed: 1 faded
        alchemyManager.addEssence('faded', 1);
        essenceEarned = { type: 'faded', amount: 1 };
      }
    }
  }

  // Detect level up
  const leveledUp = GameState.player.level > levelBefore;

  renderHUD();
  autoSave();

  // Show completion screen
  showLessonCompletionScreen({
    lessonType: 'regular',
    passed,
    successRate,
    correctAnswers: state.correctAnswers,
    wrongAnswers: state.wrongAnswers,
    totalQuestions: state.questions.length,
    xpEarned: totalXP,
    xpBreakdown: xpCalculation, // Full breakdown for display
    hpRecovered: 0,
    hpLost,
    isPerfect,
    questObjective: passed ? state.objectiveId : null,
    essenceEarned,
    leveledUp,
    newLevel: GameState.player.level
  });

  // Reset lesson state
  resetLessonState();
}

function resetLessonState() {
  GameState.lessonState = {
    active: false,
    questId: null,
    objectiveId: null,
    vocabulary: [],
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    currentMultiplier: 1.0,
    totalBonusXP: 0,
    totalBonusGold: 0,
    isReview: false
  };
}

function checkHiddenQuestTriggers() {
  // Check if any hidden quests should now be revealed
  if (questManager) {
    const location = GAME_DATA.locations[GameState.currentLocation];
    if (location && location.quests) {
      location.quests.forEach(questId => {
        const quest = GAME_DATA.quests[questId];
        if (quest && quest.type === 'hidden') {
          if (questManager.checkHiddenTrigger(questId)) {
            // Quest is now available!
            showNotification(`Something new has appeared...`, 'info');
            renderQuestPanel();
            renderNPCs(location);
          }
        }
      });
    }
  }
}

// =====================================================
// Utility Functions
// =====================================================

function showNotification(message, type = 'info') {
  // Get or create notification container for proper stacking
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 3000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Type-specific styling
  const typeStyles = {
    success: {
      bg: 'linear-gradient(135deg, rgba(42, 157, 143, 0.95), rgba(32, 127, 113, 0.95))',
      border: 'var(--accent-green)',
      glow: '0 0 20px rgba(42, 157, 143, 0.4)',
      icon: '✓'
    },
    error: {
      bg: 'linear-gradient(135deg, rgba(230, 57, 70, 0.95), rgba(180, 47, 60, 0.95))',
      border: 'var(--accent-red)',
      glow: '0 0 20px rgba(230, 57, 70, 0.4)',
      icon: '✗'
    },
    info: {
      bg: 'linear-gradient(135deg, rgba(15, 52, 96, 0.95), rgba(22, 33, 62, 0.95))',
      border: 'var(--accent-blue)',
      glow: '0 0 15px rgba(67, 97, 238, 0.3)',
      icon: 'ℹ'
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: ${style.bg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid ${style.border};
    border-radius: 8px;
    font-family: var(--font-display);
    font-size: 14px;
    color: var(--text-light);
    box-shadow: ${style.glow}, 0 4px 20px rgba(0, 0, 0, 0.3);
    pointer-events: auto;
    min-width: 220px;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
    cursor: pointer;
  `;

  notification.innerHTML = `
    <span style="font-size: 18px; flex-shrink: 0;">${style.icon}</span>
    <span style="flex: 1;">${message}</span>
  `;

  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => notification.remove(), 300);
  });

  container.appendChild(notification);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

/**
 * WoW-style Achievement Toast - Special dramatic notification for achievements
 */
function showAchievementToast(achievement, rewards = []) {
  // Remove any existing achievement toast
  const existing = document.getElementById('achievement-toast');
  if (existing) existing.remove();

  // Format rewards text
  let rewardsHtml = '';
  if (rewards.length > 0) {
    const rewardTexts = rewards.map(r => {
      if (r.type === 'stat') return `+${r.amount} ${r.statName}`;
      if (r.type === 'title') return `Title: ${r.title}`;
      if (r.type === 'gold') return `+${r.amount} Gold`;
      return '';
    }).filter(Boolean);
    if (rewardTexts.length > 0) {
      rewardsHtml = `<div class="achievement-toast-rewards">${rewardTexts.join(' • ')}</div>`;
    }
  }

  const toast = document.createElement('div');
  toast.id = 'achievement-toast';
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-glow"></div>
    <div class="achievement-toast-frame">
      <div class="achievement-toast-header">
        <span class="achievement-toast-label">Achievement Unlocked</span>
      </div>
      <div class="achievement-toast-content">
        <div class="achievement-toast-icon">${achievement.icon || '🏆'}</div>
        <div class="achievement-toast-info">
          <div class="achievement-toast-name">${achievement.name}</div>
          <div class="achievement-toast-desc">${achievement.description || ''}</div>
          ${rewardsHtml}
        </div>
      </div>
      <div class="achievement-toast-shine"></div>
    </div>
  `;

  document.body.appendChild(toast);

  // Play sound if available
  if (typeof AudioManager !== 'undefined' && AudioManager.playSFX) {
    AudioManager.playSFX('achievement');
  }

  // Auto-remove after animation
  setTimeout(() => {
    toast.classList.add('achievement-toast-exit');
    setTimeout(() => toast.remove(), 500);
  }, 5000);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.classList.add('achievement-toast-exit');
    setTimeout(() => toast.remove(), 500);
  });
}

/**
 * Show title unlock toast - similar to achievement but for titles
 */
function showTitleUnlockToast(titleName, effects = null) {
  showAchievementToast({
    icon: '👑',
    name: titleName,
    description: effects ? `${formatTitleEffects(effects)}` : 'New title available!'
  }, []);
}

// =====================================================
// Tutorial System
// =====================================================

const TutorialTips = {
  clickNpc: {
    icon: '👆',
    title: 'Talk to NPCs',
    content: 'Click on characters to interact with them. Try talking to Urma, the village elder!',
    position: 'right'
  },
  acceptQuest: {
    icon: '📜',
    title: 'Accept Quests',
    content: 'Quests give you goals and rewards. Click "Accept" to take on this quest!',
    position: 'left'
  },
  questPanel: {
    icon: '📋',
    title: 'Quest Log',
    content: 'Click the Quests button to view your active quests and objectives.',
    position: 'right'
  },
  startLesson: {
    icon: '📚',
    title: 'How Lessons Work',
    content: 'Answer questions correctly to progress. You must get each question right before moving on. Wrong answers cost HP, but you can try again! Tip: Use number keys 1-4 to answer quickly.',
    position: 'bottom'
  },
  wrongAnswer: {
    icon: '❤️',
    title: 'Watch Your Health!',
    content: 'Wrong answers cost HP. If you run out, you\'ll need to review words to recover.',
    position: 'top'
  },
  questComplete: {
    icon: '🎉',
    title: 'Quest Complete!',
    content: 'You earned XP, gold, and reputation. Keep completing quests to level up and unlock new areas!',
    position: 'bottom'
  },
  viewStats: {
    icon: '📊',
    title: 'Your Stats',
    content: 'Stats affect your gameplay! Stamina adds HP, Strength reduces damage, Agility protects streaks, Insight grants hints, Luck gives shop discounts, Devotion boosts reputation, Knowledge retains mastery.',
    position: 'bottom'
  },
  viewReputation: {
    icon: '🏛️',
    title: 'Reputation',
    content: 'Build reputation with factions by completing quests. Higher standing unlocks shop discounts, special quests, unique items, and titles!',
    position: 'bottom'
  },
  syllableQuestion: {
    icon: '🔤',
    title: 'Syllable Puzzle',
    content: 'Click the syllables in the correct order to spell the French word. Click a syllable in your answer to remove it.',
    position: 'top'
  },
  encounter: {
    icon: '🛤️',
    title: 'Road Encounter',
    content: 'During your journey, you\'ll face challenges like reading signs and speaking with travelers. Answer correctly to proceed safely!',
    position: 'bottom'
  },
  mapTravel: {
    icon: '🗺️',
    title: 'World Map',
    content: 'Click on unlocked locations to travel. New areas unlock as you complete quests and build reputation.',
    position: 'bottom'
  },
  useHint: {
    icon: '💡',
    title: 'Hints Available',
    content: 'Stuck on a question? Click the hint button to reveal part of the answer. Your Insight stat gives you more hint charges!',
    position: 'top'
  },
  villageProjects: {
    icon: '🏗️',
    title: 'The Game Loop',
    content: 'This is the core of ByteQuest: Complete lessons to practice French, then gather resources using what you learned. Contribute resources to village projects to unlock permanent bonuses for everyone!',
    position: 'bottom'
  },
  gathering: {
    icon: '⛏️',
    title: 'Gathering Resources',
    content: 'Gathering minigames use French vocabulary! The better you know the words, the more resources you collect. Use these resources for crafting and village projects.',
    position: 'bottom'
  },
  spellbook: {
    icon: '📖',
    title: 'Your Spellbook',
    content: 'The Spellbook contains grammar references and lore pages you unlock through quests. Press S or click the Spellbook button in the sidebar to review what you\'ve learned!',
    position: 'right'
  }
};

function showTutorialTip(tipId, targetSelector, onComplete) {
  // Skip if tutorials disabled
  if (GameState.tutorial.skipAll) return;

  // Skip if this tip was already shown (check shownTips array)
  if (!GameState.tutorial.shownTips) {
    GameState.tutorial.shownTips = [];
  }
  if (GameState.tutorial.shownTips.includes(tipId)) return;

  const tip = TutorialTips[tipId];
  if (!tip) return;

  // Mark tip as shown
  GameState.tutorial.shownTips.push(tipId);

  // Remove any existing tip
  hideTutorialTip();

  GameState.tutorial.currentTip = tipId;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.id = 'tutorial-overlay';
  document.body.appendChild(overlay);

  // Find and highlight target
  const target = targetSelector ? document.querySelector(targetSelector) : null;
  if (target) {
    target.classList.add('tutorial-highlight');
  }

  // Create tip popup
  const tipEl = document.createElement('div');
  tipEl.className = 'tutorial-tip';
  tipEl.id = 'tutorial-tip';
  tipEl.setAttribute('data-position', tip.position);
  tipEl.innerHTML = `
    <div class="tutorial-tip-header">
      <span class="tutorial-tip-icon">${tip.icon}</span>
      <span class="tutorial-tip-title">${tip.title}</span>
    </div>
    <div class="tutorial-tip-content">${tip.content}</div>
    <div class="tutorial-tip-footer">
      <button class="tutorial-tip-skip" onclick="skipAllTutorials()">Skip tutorials</button>
      <button class="tutorial-tip-btn" onclick="dismissTutorialTip()">Got it!</button>
    </div>
  `;
  document.body.appendChild(tipEl);

  // Position the tip near target
  if (target) {
    positionTutorialTip(tipEl, target, tip.position);
  } else {
    // Center on screen
    tipEl.style.left = '50%';
    tipEl.style.top = '50%';
    tipEl.style.transform = 'translate(-50%, -50%)';
  }

  // Store callback
  tipEl._onComplete = onComplete;
}

function positionTutorialTip(tipEl, target, position) {
  const targetRect = target.getBoundingClientRect();
  const tipRect = tipEl.getBoundingClientRect();
  const padding = 16;

  let left, top;

  switch (position) {
    case 'bottom':
      left = targetRect.left + (targetRect.width / 2) - (tipRect.width / 2);
      top = targetRect.bottom + padding;
      break;
    case 'top':
      left = targetRect.left + (targetRect.width / 2) - (tipRect.width / 2);
      top = targetRect.top - tipRect.height - padding;
      break;
    case 'left':
      left = targetRect.left - tipRect.width - padding;
      top = targetRect.top + (targetRect.height / 2) - (tipRect.height / 2);
      break;
    case 'right':
      left = targetRect.right + padding;
      top = targetRect.top + (targetRect.height / 2) - (tipRect.height / 2);
      break;
    default:
      left = targetRect.left;
      top = targetRect.bottom + padding;
  }

  // Keep on screen
  left = Math.max(10, Math.min(left, window.innerWidth - tipRect.width - 10));
  top = Math.max(10, Math.min(top, window.innerHeight - tipRect.height - 10));

  tipEl.style.left = `${left}px`;
  tipEl.style.top = `${top}px`;
}

function hideTutorialTip() {
  const tip = document.getElementById('tutorial-tip');
  const overlay = document.getElementById('tutorial-overlay');

  // Remove highlight from any elements
  document.querySelectorAll('.tutorial-highlight').forEach(el => {
    el.classList.remove('tutorial-highlight');
  });

  if (tip) {
    if (tip._onComplete) tip._onComplete();
    tip.remove();
  }
  if (overlay) overlay.remove();

  GameState.tutorial.currentTip = null;
}

function dismissTutorialTip() {
  hideTutorialTip();
}

function skipAllTutorials() {
  GameState.tutorial.skipAll = true;
  hideTutorialTip();
  showNotification('Tutorials disabled. You can re-enable them in Settings.', 'info');
}

function markTutorialComplete(step) {
  if (GameState.tutorial.completed[step] !== undefined) {
    GameState.tutorial.completed[step] = true;
  }
}

function shouldShowTutorial(step) {
  return !GameState.tutorial.skipAll &&
         GameState.tutorial.completed[step] !== undefined &&
         !GameState.tutorial.completed[step];
}

function showTutorialHighlight(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.classList.add('tutorial-highlight');
  }
}

function removeTutorialHighlight(selector) {
  if (selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.remove('tutorial-highlight');
  } else {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });
  }
}

// =====================================================
// Reputation Tutorial System
// =====================================================

/**
 * Show the reputation tutorial modal when player gains reputation for the first time
 * @param {Object} reputationResult - Result object from ReputationManager.addReputation()
 */
function showReputationTutorial(reputationResult) {
  // Skip if tutorials disabled
  if (GameState.tutorial.skipAll) return;

  // Mark tutorial as complete immediately to prevent re-triggering
  markTutorialComplete('gainedReputation');

  const { factionName, change, newRep, newRank } = reputationResult;

  // Step 1: Initial reputation gain notification
  showReputationTutorialStep1(factionName, change);
}

function showReputationTutorialStep1(factionName, amount) {
  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#127969;</span>
      <span class="tutorial-modal-title">Reputation Gained</span>
    </div>
    <div class="tutorial-modal-body">
      <p class="reputation-gain-text">+${amount} Reputation with ${escapeHtml(factionName)}</p>
      <p>The people are starting to trust you!</p>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep2()">What is Reputation?</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">OK</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep2() {
  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#129309;</span>
      <span class="tutorial-modal-title">Reputation</span>
    </div>
    <div class="tutorial-modal-body">
      <p>As you help people and complete quests, you build <strong>REPUTATION</strong> with different factions.</p>
      <p style="margin-top: 12px;">Higher reputation unlocks:</p>
      <ul class="reputation-benefits-list">
        <li><span class="benefit-icon">&#128722;</span> Shop discounts</li>
        <li><span class="benefit-icon">&#128220;</span> Special quests</li>
        <li><span class="benefit-icon">&#127873;</span> Unique items</li>
        <li><span class="benefit-icon">&#127942;</span> Titles and rewards</li>
      </ul>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep3()">Show Me More</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Got It</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep3() {
  // Get current faction status for Dawnmere Settlers (typically first faction)
  let factionHtml = '';
  if (typeof reputationManager !== 'undefined' && reputationManager) {
    const status = reputationManager.getFactionStatus('dawnmere_settlers');
    if (status) {
      const ranks = MINOR_FACTION_RANKS;
      factionHtml = `
        <p style="margin-bottom: 8px;"><strong>${escapeHtml(status.faction.name)}</strong> - Ranks:</p>
        <div class="rank-list">
          ${ranks.map(r => {
            const isCurrent = status.currentRank.rank === r.rank;
            return `<div class="rank-item ${isCurrent ? 'current' : ''}">
              <span class="rank-marker">${isCurrent ? '&#9679;' : '&#9675;'}</span>
              <span class="rank-name">${escapeHtml(r.name)}</span>
              <span class="rank-threshold">(${r.reputation})</span>
            </div>`;
          }).join('')}
        </div>
        <div class="reputation-progress">
          <p>Your standing: ${escapeHtml(status.currentRank.name)} (${status.reputation}${status.nextRank ? '/' + status.nextRank.reputation : ''})</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${status.progress}%"></div>
          </div>
          <span class="progress-text">${status.progress}%</span>
        </div>
      `;
    }
  }

  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#128202;</span>
      <span class="tutorial-modal-title">Faction Ranks</span>
    </div>
    <div class="tutorial-modal-body">
      ${factionHtml || '<p>Help the community to build your standing!</p>'}
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-secondary" onclick="showReputationTutorialStep4()">View All Factions</button>
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Close</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showReputationTutorialStep4() {
  // Build faction preview list
  let factionsHtml = '';
  if (typeof FACTION_DEFINITIONS !== 'undefined') {
    const majorFactions = Object.values(FACTION_DEFINITIONS).filter(f => f.type === 'major').slice(0, 5);
    const minorFactions = Object.values(FACTION_DEFINITIONS).filter(f => f.type === 'minor').slice(0, 2);
    const allFactions = [...minorFactions.slice(0, 1), ...majorFactions.slice(0, 4)];

    factionsHtml = allFactions.map(f => `
      <div class="faction-preview-item">
        <span class="faction-icon">${f.icon}</span>
        <span class="faction-name">${escapeHtml(f.name)}</span>
        <span class="faction-desc">- ${escapeHtml(f.description.split('.')[0])}</span>
      </div>
    `).join('');
  }

  const content = `
    <div class="tutorial-modal-header">
      <span class="tutorial-modal-icon">&#127759;</span>
      <span class="tutorial-modal-title">Factions of Turuem</span>
    </div>
    <div class="tutorial-modal-body">
      <p>You will encounter many groups on your journey:</p>
      <div class="faction-preview-list">
        ${factionsHtml}
        <div class="faction-preview-item">
          <span class="faction-icon">...</span>
          <span class="faction-name">and more to discover</span>
        </div>
      </div>
      <p class="faction-warning"><span class="warning-icon">&#128161;</span> Some factions have conflicting goals. Choose wisely!</p>
    </div>
    <div class="tutorial-modal-footer">
      <button class="btn btn-primary" onclick="hideModal('reputation-tutorial-modal')">Close</button>
    </div>
  `;
  showModal('reputation-tutorial-modal', content);
}

function showModal(id, content) {
  let modal = document.getElementById(id);
  if (!modal) {
    modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal-content pixel-border">${content}</div>`;
    document.body.appendChild(modal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal(id);
      }
    });
  } else {
    modal.querySelector('.modal-content').innerHTML = content;
  }

  setTimeout(() => modal.classList.add('active'), 10);
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Check if NPC has any shop (either in NPC definition or in shopManager)
 */
function npcHasAnyShop(npcId) {
  const npc = GAME_DATA.npcs[npcId];

  // Check old-style NPC-defined shop
  if (npc?.shop) {
    return true;
  }

  // Check shopManager for shops associated with this NPC
  if (typeof shopManager !== 'undefined' && shopManager) {
    const shops = shopManager.getShopsByNpc(npcId);
    if (shops && shops.length > 0) {
      return true;
    }
  }

  return false;
}

function openShop(npcId, shopType = null) {
  hideDialog();

  if (!shopManager) {
    showNotification("Shop system not initialized!", 'error');
    return;
  }

  // Get all shops for this NPC
  const shops = shopManager.getShopsByNpc(npcId);
  if (shops.length === 0) {
    showNotification("This person doesn't have a shop.", 'info');
    return;
  }

  // If shopType specified, find that specific shop
  if (shopType) {
    const shop = shops.find(s => s.type === shopType);
    if (shop) {
      shopManager.openShop(shop.id);
      if (shop.type === ShopType.ACCOUNT_UPGRADES) {
        renderAccountUpgradeShop(shop.id);
      } else {
        renderShopScreen(shop.id);
      }
      return;
    }
  }

  // If NPC has only one shop, open it directly
  if (shops.length === 1) {
    const shop = shops[0];
    shopManager.openShop(shop.id);
    if (shop.type === ShopType.ACCOUNT_UPGRADES) {
      renderAccountUpgradeShop(shop.id);
    } else {
      renderShopScreen(shop.id);
    }
    return;
  }

  // NPC has multiple shops - show shop selection
  renderShopSelection(npcId, shops);
}

function renderShopSelection(npcId, shops) {
  const npc = GAME_DATA.npcs[npcId];
  const npcName = npc?.name || 'Merchant';

  const shopButtons = shops.map(shop => {
    const typeInfo = ShopTypeInfo[shop.type] || { icon: '🏪', name: 'Shop' };
    return `
      <button class="pixel-btn shop-select-btn" onclick="openShop('${npcId}', '${shop.type}')">
        <span class="shop-select-icon">${shop.icon || typeInfo.icon}</span>
        <span class="shop-select-name">${shop.name}</span>
      </button>
    `;
  }).join('');

  showModal('shop-modal', `
    <div class="shop-screen">
      <div class="shop-header">
        <div class="shop-title">
          <h2>${npcName}'s Services</h2>
          <p>What would you like to browse?</p>
        </div>
      </div>

      <div class="shop-selection">
        ${shopButtons}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

// Track current shop tab (buy or sell)
let currentShopTab = 'buy';

function renderShopScreen(shopId, tab = 'buy') {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;

  currentShopTab = tab;
  const playerGold = shopManager.getPlayerGold();

  // Calculate discount from Luck stat
  let discount = 0;
  if (typeof statsManager !== 'undefined' && statsManager) {
    discount = statsManager.calculateShopDiscount();
  }

  // Build tab buttons
  const tabsHtml = `
    <div class="shop-tabs">
      <button class="shop-tab ${tab === 'buy' ? 'active' : ''}" onclick="renderShopScreen('${shopId}', 'buy')">
        🛒 Buy
      </button>
      <button class="shop-tab ${tab === 'sell' ? 'active' : ''}" onclick="renderShopScreen('${shopId}', 'sell')">
        💰 Sell
      </button>
    </div>
  `;

  let contentHtml = '';

  if (tab === 'buy') {
    // BUY TAB - existing shop inventory
    const inventory = shopManager.getShopInventory(shopId);

    if (inventory.length === 0) {
      contentHtml = '<p style="color: var(--text-muted); text-align: center;">No items available.</p>';
    } else {
      contentHtml = inventory.map(entry => {
        const item = entry.item;
        const discountedPrice = Math.floor(entry.price * (1 - discount));
        const canAfford = playerGold >= discountedPrice;
        const meetsRep = entry.meetsRepRequirement;
        const canBuy = canAfford && meetsRep;
        const rarityInfo = ItemRarityInfo[item.rarity] || { color: '#ffffff', name: 'Common' };
        const hasDiscount = discount > 0;

        // Reputation requirement display
        const repDisplay = entry.repRequired > 0
          ? `<div class="shop-item-rep ${meetsRep ? 'met' : 'unmet'}">
               ${meetsRep ? '✓' : '🔒'} Rep: ${entry.playerRep}/${entry.repRequired}
             </div>`
          : '';

        return `
          <div class="shop-item ${canBuy ? '' : 'cannot-afford'}">
            <div class="shop-item-icon">${item.icon || '❓'}</div>
            <div class="shop-item-info">
              <div class="shop-item-name" style="color: ${rarityInfo.color};">${item.name}</div>
              <div class="shop-item-desc">${item.description || ''}</div>
              ${repDisplay}
            </div>
            <div class="shop-item-price">
              ${hasDiscount ? `<span class="price-original" style="text-decoration: line-through; color: var(--text-muted); font-size: 10px;">${entry.price}</span> ` : ''}
              <span class="price-value">${discountedPrice}</span>
              <span class="price-icon">💰</span>
            </div>
            <button class="pixel-btn shop-buy-btn"
                    onclick="buyFromShop('${shopId}', '${entry.itemId}')"
                    ${canBuy ? '' : 'disabled'}>
              ${meetsRep ? 'Buy' : '🔒'}
            </button>
          </div>
        `;
      }).join('');
    }
  } else {
    // SELL TAB - player's sellable items
    const sellableItems = getSellableItems();

    if (sellableItems.length === 0) {
      contentHtml = '<p style="color: var(--text-muted); text-align: center;">You have no items to sell.</p>';
    } else {
      contentHtml = sellableItems.map(entry => {
        const sellPrice = Math.floor(entry.value * 0.5); // Sell at 50% of value
        const rarityInfo = ItemRarityInfo[entry.item.rarity] || { color: '#ffffff', name: 'Common' };

        return `
          <div class="shop-item sellable">
            <div class="shop-item-icon">${entry.item.icon || '❓'}</div>
            <div class="shop-item-info">
              <div class="shop-item-name" style="color: ${rarityInfo.color};">${entry.item.name}</div>
              <div class="shop-item-desc">${entry.item.description || ''}</div>
              <div class="shop-item-count">Owned: ${entry.count}</div>
            </div>
            <div class="shop-item-price sell-price">
              <span class="price-value">+${sellPrice}</span>
              <span class="price-icon">💰</span>
            </div>
            <button class="pixel-btn shop-sell-btn"
                    onclick="sellItem('${shopId}', '${entry.itemId}')">
              Sell
            </button>
          </div>
        `;
      }).join('');
    }
  }

  showModal('shop-modal', `
    <div class="shop-screen">
      <div class="shop-header">
        <div class="shop-icon">${shop.icon || '🏪'}</div>
        <div class="shop-title">
          <h2>${shop.name}</h2>
          <p>${shop.description || ''}</p>
        </div>
        <div class="shop-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-value">${playerGold}</span>
        </div>
      </div>

      ${tabsHtml}

      <div class="shop-inventory">
        ${contentHtml}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

// Get items player can sell (resources and consumables with value)
function getSellableItems() {
  const sellable = [];

  if (!GameState.player.inventory) return sellable;

  GameState.player.inventory.forEach(invItem => {
    const item = GAME_DATA.items[invItem.id];
    if (!item) return;

    // Can sell resources and consumables that have a value
    if ((item.type === 'resource' || item.type === 'consumable') && item.value > 0) {
      sellable.push({
        itemId: invItem.id,
        item: item,
        count: invItem.count || 1,
        value: item.value
      });
    }
  });

  return sellable;
}

// Sell an item for gold
function sellItem(shopId, itemId) {
  const item = GAME_DATA.items[itemId];
  if (!item || !item.value) {
    showNotification('Cannot sell this item', 'error');
    return;
  }

  // Find item in inventory
  const invItem = GameState.player.inventory.find(i => i.id === itemId);
  if (!invItem || invItem.count < 1) {
    showNotification('Item not in inventory', 'error');
    return;
  }

  // Calculate sell price (50% of value)
  const sellPrice = Math.floor(item.value * 0.5);

  // Remove item from inventory
  if (invItem.count > 1) {
    invItem.count--;
  } else {
    const index = GameState.player.inventory.indexOf(invItem);
    GameState.player.inventory.splice(index, 1);
  }

  // Add gold
  GameState.player.gold += sellPrice;

  showNotification(`Sold ${item.name} for ${sellPrice} gold`, 'success');

  // Refresh shop UI
  renderShopScreen(shopId, 'sell');

  // Update HUD
  renderHUD();

  // Auto-save
  autoSave();
}

function buyFromShop(shopId, itemId) {
  if (!shopManager) return;

  const result = shopManager.purchaseItem(shopId, itemId, 1);

  if (result.success) {
    showNotification(`Purchased: ${result.item.name}`, 'success');

    // Check quest objectives for buying items
    checkBuyObjectives(itemId);

    // Check achievements (for spending gold)
    checkAchievements();

    // Refresh shop UI
    renderShopScreen(shopId);

    // Update HUD (gold changed)
    renderHUD();

    // Save game
    autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

function closeShopScreen() {
  if (shopManager) {
    shopManager.closeShop();
  }
  hideModal('shop-modal');
}

// =====================================================
// Account Upgrade Shop
// =====================================================

function renderAccountUpgradeShop(shopId) {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;

  const upgrades = shopManager.getAccountUpgradeInventory(shopId);
  const playerGold = shopManager.getPlayerGold();

  // Group upgrades by category
  const categories = {};
  upgrades.forEach(entry => {
    const cat = entry.upgrade.category || 'other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(entry);
  });

  const categoryNames = {
    starter: 'Starter Blessings',
    learning: 'Learning',
    resources: 'Resources',
    gameplay: 'Gameplay',
    language: 'Language',
    qol: 'Quality of Life',
    other: 'Other'
  };

  let upgradesHtml = '';

  for (const [category, items] of Object.entries(categories)) {
    upgradesHtml += `<div class="upgrade-category">
      <div class="upgrade-category-title">${categoryNames[category] || category}</div>`;

    upgradesHtml += items.map(entry => {
      const upgrade = entry.upgrade;
      const isPurchasable = entry.canPurchase;
      const isOwned = entry.owned && upgrade.oneTime;
      const stackInfo = upgrade.maxStacks ? ` (${entry.ownedCount}/${upgrade.maxStacks})` : '';

      let statusClass = '';
      let statusText = '';
      if (isOwned) {
        statusClass = 'owned';
        statusText = 'OWNED';
      } else if (!isPurchasable && entry.reason) {
        statusClass = 'locked';
        statusText = entry.reason;
      }

      // Build price display (gold and/or items)
      let priceHtml = '';
      const hasGoldCost = entry.price > 0;
      const hasItemCosts = upgrade.cost?.items && Object.keys(upgrade.cost.items).length > 0;

      if (hasGoldCost) {
        priceHtml += `<div class="upgrade-gold-cost">
          <span class="price-value">${entry.price}</span>
          <span class="price-icon">💰</span>
        </div>`;
      }

      if (hasItemCosts) {
        const itemCostsHtml = Object.entries(upgrade.cost.items).map(([itemId, amount]) => {
          const itemDef = GAME_DATA.items?.[itemId] || { name: itemId, icon: '📦' };
          const playerHas = typeof itemManager !== 'undefined' ? itemManager.getItemCount(itemId) : 0;
          const canAffordItem = playerHas >= amount;
          return `<div class="item-cost ${canAffordItem ? 'affordable' : 'unaffordable'}">
            <span class="item-icon">${itemDef.icon || '📦'}</span>
            <span class="item-amount">${amount}x ${itemDef.name || itemId}</span>
            <span class="item-have">(${playerHas})</span>
          </div>`;
        }).join('');
        priceHtml += `<div class="upgrade-item-costs">${itemCostsHtml}</div>`;
      }

      if (!hasGoldCost && !hasItemCosts) {
        priceHtml = '<div class="upgrade-gold-cost"><span class="price-value">Free</span></div>';
      }

      return `
        <div class="upgrade-item ${statusClass} ${isPurchasable ? '' : 'cannot-afford'}">
          <div class="upgrade-info">
            <div class="upgrade-name">${upgrade.name}${stackInfo}</div>
            <div class="upgrade-desc">${upgrade.description}</div>
            ${statusText ? `<div class="upgrade-status">${statusText}</div>` : ''}
          </div>
          <div class="upgrade-price">
            ${priceHtml}
          </div>
          <button class="pixel-btn shop-buy-btn"
                  onclick="buyAccountUpgrade('${shopId}', '${entry.upgradeId}')"
                  ${isPurchasable ? '' : 'disabled'}>
            ${isOwned ? '✓' : 'Buy'}
          </button>
        </div>
      `;
    }).join('');

    upgradesHtml += '</div>';
  }

  if (upgrades.length === 0) {
    upgradesHtml = '<p style="color: var(--text-muted); text-align: center;">No upgrades available.</p>';
  }

  showModal('shop-modal', `
    <div class="shop-screen account-upgrade-shop">
      <div class="shop-header">
        <div class="shop-icon">${shop.icon || '⭐'}</div>
        <div class="shop-title">
          <h2>${shop.name}</h2>
          <p>${shop.description || 'Permanent upgrades that persist across all saves.'}</p>
        </div>
        <div class="shop-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-value">${playerGold}</span>
        </div>
      </div>

      <div class="account-upgrade-notice">
        <span class="notice-icon">⭐</span>
        <span>These upgrades are <strong>permanent</strong> and apply to all your save files!</span>
      </div>

      <div class="shop-inventory upgrade-list">
        ${upgradesHtml}
      </div>

      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

async function buyAccountUpgrade(shopId, upgradeId) {
  if (!shopManager) return;

  const result = await shopManager.purchaseAccountUpgrade(shopId, upgradeId);

  if (result.success) {
    showNotification(`Purchased: ${result.upgrade.name}`, 'success');

    // Check achievements
    checkAchievements();

    // Refresh shop UI
    renderAccountUpgradeShop(shopId);

    // Update HUD (gold changed)
    renderHUD();

    // Save game
    autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Alchemy System
// =====================================================

function openAlchemy() {
  if (!alchemyManager) {
    showNotification("Alchemy system not available!", 'error');
    return;
  }

  renderAlchemyScreen();
}

function renderAlchemyScreen(selectedCategory = 'all') {
  if (!alchemyManager) return;

  const level = alchemyManager.getAlchemyLevel();
  const tier = alchemyManager.getSkillTier();
  const xpProgress = alchemyManager.getSkillProgressPercent();
  const essence = alchemyManager.getAllEssence();
  const recipes = selectedCategory === 'all'
    ? alchemyManager.getAvailableRecipes()
    : alchemyManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  // Essence display
  const essenceHtml = `
    <div class="alchemy-essence">
      <div class="essence-item" title="Faded Essence - Basic reviews">
        <span class="essence-icon">💫</span>
        <span class="essence-count">${essence.faded}</span>
      </div>
      <div class="essence-item" title="Clear Essence - Mixed reviews">
        <span class="essence-icon">✨</span>
        <span class="essence-count">${essence.clear}</span>
      </div>
      <div class="essence-item" title="Vivid Essence - Challenging reviews">
        <span class="essence-icon">🌟</span>
        <span class="essence-count">${essence.vivid}</span>
      </div>
      <div class="essence-item" title="Brilliant Essence - Mastery challenges">
        <span class="essence-icon">💎</span>
        <span class="essence-count">${essence.brilliant}</span>
      </div>
    </div>
  `;

  // Category tabs
  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'healing', name: 'Healing', icon: '❤️' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="alchemy-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderAlchemyScreen('${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  // Recipe list
  let recipesHtml = '';
  if (recipes.length === 0) {
    recipesHtml = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No recipes available in this category.</p>';
  } else {
    recipesHtml = recipes.map(recipe => {
      const canCraftResult = alchemyManager.canCraft(recipe.id);
      const canCraft = canCraftResult.canCraft;

      // Format ingredients
      const ingredientsHtml = recipe.ingredients.map(ing => {
        const formatted = alchemyManager.formatIngredient(ing);
        const hasEnough = formatted.have >= ing.amount;
        return `
          <span class="ingredient ${hasEnough ? '' : 'missing'}">
            ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
          </span>
        `;
      }).join('');

      return `
        <div class="alchemy-recipe ${canCraft ? '' : 'cannot-craft'}">
          <div class="recipe-header">
            <span class="recipe-icon">${recipe.icon}</span>
            <span class="recipe-name">${recipe.name}</span>
            <span class="recipe-level">Lv.${recipe.levelRequired}</span>
          </div>
          <div class="recipe-description">${recipe.description}</div>
          <div class="recipe-ingredients">${ingredientsHtml}</div>
          <div class="recipe-footer">
            <span class="recipe-xp">+${recipe.xpReward} XP</span>
            <button class="pixel-btn craft-btn"
                    onclick="craftRecipe('${recipe.id}')"
                    ${canCraft ? '' : 'disabled'}>
              Craft
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Active cognitive potion display
  let activePotionHtml = '';
  if (alchemyManager.hasActiveCognitivePotion()) {
    const active = alchemyManager.getActiveCognitivePotion();
    const potionData = GAME_DATA.items[active.active];
    if (potionData) {
      activePotionHtml = `
        <div class="active-potion-banner">
          <span class="active-potion-icon">${potionData.icon}</span>
          <span class="active-potion-text">
            <strong>${potionData.name}</strong> active
            <span class="remaining">(${active.remainingDuration} lessons remaining)</span>
          </span>
        </div>
      `;
    }
  }

  showModal('alchemy-modal', `
    <div class="alchemy-screen">
      <div class="alchemy-header">
        <div class="alchemy-title">
          <span class="alchemy-icon">⚗️</span>
          <span>Alchemy Workbench</span>
        </div>
        <button class="close-btn" onclick="hideModal('alchemy-modal')">✕</button>
      </div>

      <div class="alchemy-skill-info">
        <div class="skill-level">
          <span class="skill-tier">${tier.name}</span>
          <span class="skill-number">Level ${level}</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
        </div>
      </div>

      ${activePotionHtml}

      <div class="alchemy-essence-section">
        <div class="section-label">Linguistic Essence</div>
        ${essenceHtml}
      </div>

      <div class="alchemy-tabs">
        ${tabsHtml}
      </div>

      <div class="alchemy-recipes">
        ${recipesHtml}
      </div>
    </div>
  `);
}

function craftRecipe(recipeId) {
  if (!alchemyManager) return;

  const result = alchemyManager.craft(recipeId);

  if (result.success) {
    let message = `Crafted ${result.recipe.name}!`;
    if (result.leveledUp) {
      message += ` Alchemy leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');

    // Re-render to update ingredient counts
    renderAlchemyScreen();

    // Auto-save
    autoSave();
  } else {
    showNotification(result.reason || 'Cannot craft this recipe', 'error');
  }
}

function useCognitivePotion(itemId) {
  if (!alchemyManager) {
    showNotification("Alchemy system not available!", 'error');
    return;
  }

  // Check if another potion is active
  if (alchemyManager.hasActiveCognitivePotion()) {
    const active = alchemyManager.getActiveCognitivePotion();
    const currentPotion = GAME_DATA.items[active.active];

    // Confirm replacement
    if (!confirm(`You already have ${currentPotion?.name || 'a potion'} active (${active.remainingDuration} uses remaining). Replace it?`)) {
      return;
    }

    // Clear current potion
    GameState.player.activeEffects.cognitivePotions = {
      active: null,
      remainingDuration: 0,
      bonuses: {}
    };
  }

  const result = alchemyManager.useCognitivePotion(itemId);

  if (result.success) {
    showNotification(result.message, 'success');
    autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

// =====================================================
// Unified Crafting System (Alchemy, Smithing, Enchanting)
// =====================================================

function openCrafting(profession = 'alchemy') {
  const validProfessions = ['alchemy', 'smithing', 'enchanting'];
  if (!validProfessions.includes(profession)) {
    profession = 'alchemy';
  }

  renderCraftingScreen(profession);
}

function renderCraftingScreen(profession, selectedCategory = 'all') {
  // Build profession tabs
  const professionTabs = [
    { id: 'alchemy', name: 'Alchemy', icon: '⚗️', manager: alchemyManager },
    { id: 'smithing', name: 'Smithing', icon: '🔨', manager: smithingManager },
    { id: 'enchanting', name: 'Enchanting', icon: '✨', manager: enchantingManager }
  ];

  const profTabsHtml = professionTabs.map(prof => `
    <button class="profession-tab ${profession === prof.id ? 'active' : ''}"
            onclick="renderCraftingScreen('${prof.id}', 'all')"
            ${!prof.manager ? 'disabled title="Coming soon"' : ''}>
      <span class="prof-icon">${prof.icon}</span>
      <span class="prof-name">${prof.name}</span>
    </button>
  `).join('');

  // Render the appropriate profession content
  let contentHtml = '';
  switch (profession) {
    case 'alchemy':
      contentHtml = renderAlchemyContent(selectedCategory);
      break;
    case 'smithing':
      contentHtml = renderSmithingContent(selectedCategory);
      break;
    case 'enchanting':
      contentHtml = renderEnchantingContent(selectedCategory);
      break;
  }

  showModal('crafting-modal', `
    <div class="crafting-screen">
      <div class="crafting-header">
        <div class="crafting-title">Crafting Workshop</div>
        <button class="close-btn" onclick="hideModal('crafting-modal')">✕</button>
      </div>

      <div class="profession-tabs">
        ${profTabsHtml}
      </div>

      <div class="profession-content">
        ${contentHtml}
      </div>
    </div>
  `);
}

function renderAlchemyContent(selectedCategory = 'all') {
  if (!alchemyManager) {
    return '<p class="no-manager">Alchemy system not available.</p>';
  }

  const level = alchemyManager.getAlchemyLevel();
  const tier = alchemyManager.getSkillTier();
  const xpProgress = alchemyManager.getSkillProgressPercent();
  const essence = alchemyManager.getAllEssence();
  const recipes = selectedCategory === 'all'
    ? alchemyManager.getAvailableRecipes()
    : alchemyManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const essenceHtml = `
    <div class="crafting-resources">
      <div class="resource-item" title="Faded Essence">
        <span class="resource-icon">💫</span>
        <span class="resource-count">${essence.faded}</span>
      </div>
      <div class="resource-item" title="Clear Essence">
        <span class="resource-icon">✨</span>
        <span class="resource-count">${essence.clear}</span>
      </div>
      <div class="resource-item" title="Vivid Essence">
        <span class="resource-icon">🌟</span>
        <span class="resource-count">${essence.vivid}</span>
      </div>
      <div class="resource-item" title="Brilliant Essence">
        <span class="resource-icon">💎</span>
        <span class="resource-count">${essence.brilliant}</span>
      </div>
    </div>
  `;

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'healing', name: 'Healing', icon: '❤️' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('alchemy', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildRecipeList(recipes, 'alchemy');

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">⚗️</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="resources-section">
      <div class="section-label">Linguistic Essence</div>
      ${essenceHtml}
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function renderSmithingContent(selectedCategory = 'all') {
  if (!smithingManager) {
    return '<p class="no-manager">Smithing system not available.</p>';
  }

  const level = smithingManager.getSmithingLevel();
  const tier = smithingManager.getSkillTier();
  const xpProgress = smithingManager.getSkillProgressPercent();
  const recipes = selectedCategory === 'all'
    ? smithingManager.getAvailableRecipes()
    : smithingManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'smelting', name: 'Smelting', icon: '🔥' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('smithing', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildRecipeList(recipes, 'smithing');

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">🔨</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function renderEnchantingContent(selectedCategory = 'all') {
  if (!enchantingManager) {
    return '<p class="no-manager">Enchanting system not available.</p>';
  }

  const level = enchantingManager.getEnchantingLevel();
  const tier = enchantingManager.getSkillTier();
  const xpProgress = enchantingManager.getSkillProgressPercent();
  const recipes = selectedCategory === 'all'
    ? enchantingManager.getAvailableRecipes()
    : enchantingManager.getAvailableRecipes().filter(r => r.category === selectedCategory);

  const essence = alchemyManager ? alchemyManager.getAllEssence() : { faded: 0, clear: 0, vivid: 0, brilliant: 0 };

  const essenceHtml = `
    <div class="crafting-resources">
      <div class="resource-item" title="Vivid Essence">
        <span class="resource-icon">🌟</span>
        <span class="resource-count">${essence.vivid}</span>
      </div>
      <div class="resource-item" title="Clear Essence">
        <span class="resource-icon">✨</span>
        <span class="resource-count">${essence.clear}</span>
      </div>
    </div>
  `;

  const categories = [
    { id: 'all', name: 'All', icon: '📋' },
    { id: 'weapon_enchants', name: 'Weapons', icon: '⚔️' },
    { id: 'armor_enchants', name: 'Armor', icon: '🛡️' }
  ];

  const tabsHtml = categories.map(cat => `
    <button class="category-tab ${selectedCategory === cat.id ? 'active' : ''}"
            onclick="renderCraftingScreen('enchanting', '${cat.id}')">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  let recipesHtml = buildEnchantingRecipeList(recipes);

  return `
    <div class="skill-header">
      <div class="skill-info">
        <span class="skill-icon">✨</span>
        <span class="skill-tier">${tier.name}</span>
        <span class="skill-level">Level ${level}</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: ${xpProgress}%"></div>
      </div>
    </div>

    <div class="resources-section">
      <div class="section-label">Essence (shared with Alchemy)</div>
      ${essenceHtml}
    </div>

    <div class="category-tabs">
      ${tabsHtml}
    </div>

    <div class="recipe-list">
      ${recipesHtml}
    </div>
  `;
}

function buildRecipeList(recipes, profession) {
  if (recipes.length === 0) {
    return '<p class="no-recipes">No recipes available in this category.</p>';
  }

  const manager = profession === 'alchemy' ? alchemyManager : smithingManager;

  return recipes.map(recipe => {
    const canCraftResult = manager.canCraft(recipe.id);
    const canCraft = canCraftResult.canCraft;

    const ingredientsHtml = recipe.ingredients.map(ing => {
      const formatted = manager.formatIngredient(ing);
      const hasEnough = formatted.have >= ing.amount;
      return `
        <span class="ingredient ${hasEnough ? '' : 'missing'}">
          ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
        </span>
      `;
    }).join('');

    const outputHtml = recipe.output ? `
      <div class="recipe-output">
        Creates: ${GAME_DATA.items[recipe.output.item]?.icon || '?'} ${GAME_DATA.items[recipe.output.item]?.name || recipe.output.item} x${recipe.output.amount}
      </div>
    ` : '';

    return `
      <div class="crafting-recipe ${canCraft ? '' : 'cannot-craft'}">
        <div class="recipe-header">
          <span class="recipe-icon">${recipe.icon}</span>
          <span class="recipe-name">${recipe.name}</span>
          <span class="recipe-level">Lv.${recipe.levelRequired}</span>
        </div>
        <div class="recipe-description">${recipe.description}</div>
        ${outputHtml}
        <div class="recipe-ingredients">${ingredientsHtml}</div>
        <div class="recipe-footer">
          <span class="recipe-xp">+${recipe.xpReward} XP</span>
          <button class="pixel-btn craft-btn"
                  onclick="craftItem('${profession}', '${recipe.id}')"
                  ${canCraft ? '' : 'disabled'}>
            Craft
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function buildEnchantingRecipeList(recipes) {
  if (recipes.length === 0) {
    return '<p class="no-recipes">No enchanting recipes available.</p>';
  }

  return recipes.map(recipe => {
    const enchantableItems = enchantingManager.getEnchantableItems(recipe.id);
    const hasItems = enchantableItems.length > 0;

    const ingredientsHtml = recipe.ingredients.map(ing => {
      const formatted = enchantingManager.formatIngredient(ing);
      const hasEnough = formatted.have >= ing.amount;
      return `
        <span class="ingredient ${hasEnough ? '' : 'missing'}">
          ${formatted.icon} ${formatted.name} (${formatted.have}/${ing.amount})
        </span>
      `;
    }).join('');

    const itemSelectHtml = hasItems ? `
      <div class="enchant-item-select">
        <label>Base Item:</label>
        <select id="enchant-item-${recipe.id}" class="enchant-select">
          ${enchantableItems.map(item => `
            <option value="${item.id}">${item.icon} ${item.name} (x${item.count}) → ${item.outputName}</option>
          `).join('')}
        </select>
      </div>
    ` : '<div class="no-enchantable-items">No enchantable items in inventory</div>';

    const canEnchant = hasItems && recipe.ingredients.every(ing => {
      const formatted = enchantingManager.formatIngredient(ing);
      return formatted.have >= ing.amount;
    });

    return `
      <div class="crafting-recipe enchanting-recipe ${canEnchant ? '' : 'cannot-craft'}">
        <div class="recipe-header">
          <span class="recipe-icon">${recipe.icon}</span>
          <span class="recipe-name">${recipe.name}</span>
          <span class="recipe-level">Lv.${recipe.levelRequired}</span>
        </div>
        <div class="recipe-description">${recipe.description}</div>
        ${itemSelectHtml}
        <div class="recipe-ingredients">${ingredientsHtml}</div>
        <div class="recipe-footer">
          <span class="recipe-xp">+${recipe.xpReward} XP</span>
          <button class="pixel-btn craft-btn"
                  onclick="enchantItem('${recipe.id}')"
                  ${canEnchant ? '' : 'disabled'}>
            Enchant
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function craftItem(profession, recipeId) {
  let manager, result;

  switch (profession) {
    case 'alchemy':
      manager = alchemyManager;
      result = manager.craft(recipeId);
      break;
    case 'smithing':
      manager = smithingManager;
      result = manager.craft(recipeId);
      break;
    default:
      showNotification('Unknown crafting profession', 'error');
      return;
  }

  if (result.success) {
    let message = `Crafted ${result.recipe.name}!`;
    if (result.leveledUp) {
      message += ` ${profession.charAt(0).toUpperCase() + profession.slice(1)} leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');
    renderCraftingScreen(profession);

    // Check quest objectives for crafting
    checkCraftObjectives(profession, recipeId);

    autoSave();
  } else {
    showNotification(result.reason || 'Cannot craft this recipe', 'error');
  }
}

function enchantItem(recipeId) {
  if (!enchantingManager) {
    showNotification('Enchanting system not available', 'error');
    return;
  }

  const selectElement = document.getElementById(`enchant-item-${recipeId}`);
  if (!selectElement) {
    showNotification('Please select an item to enchant', 'error');
    return;
  }

  const baseItemId = selectElement.value;
  const result = enchantingManager.enchant(recipeId, baseItemId);

  if (result.success) {
    let message = `Enchanted ${result.output.name}!`;
    if (result.leveledUp) {
      message += ` Enchanting leveled up to ${result.newLevel}!`;
    }
    showNotification(message, 'success');
    renderCraftingScreen('enchanting');
    autoSave();
  } else {
    showNotification(result.reason || 'Cannot enchant this item', 'error');
  }
}

// =====================================================
// Profile Screen
// =====================================================

function showProfileScreen() {
  const player = GameState.player;
  if (!player) {
    showNotification('Player data not available', 'error');
    return;
  }

  const stats = statsManager ? statsManager.getAllStats() : {};
  const majorStats = statsManager ? statsManager.getMajorStats() : [];
  const minorStats = statsManager ? statsManager.getMinorStats() : [];
  const activeTitle = statsManager ? statsManager.getActiveTitle() : null;

  // Get earned titles for dropdown
  const earnedTitles = titleManager ? titleManager.getEarnedTitles() : [];
  const equippedTitleId = titleManager ? titleManager.getEquippedTitleId() : null;
  
  // Equipment display
  const equipSlots = ['helm', 'armor', 'weapon', 'accessory', 'ring'];
  const equipmentHtml = equipSlots.map(slot => {
    const itemId = player.equipment[slot];
    const item = itemId ? GAME_DATA.items[itemId] : null;
    return `
      <div class="profile-equip-slot">
        <div class="profile-equip-icon">${item ? item.icon : '—'}</div>
        <div class="profile-equip-name">${item ? item.name : slot.charAt(0).toUpperCase() + slot.slice(1)}</div>
      </div>
    `;
  }).join('');
  
  // Major stats display with tooltips
  const majorStatsHtml = majorStats.map(stat => `
    <div class="profile-stat" data-stat-tooltip="${stat.definition.id}">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
      <div class="profile-stat-desc">${stat.definition.description || ''}</div>
    </div>
  `).join('');
  
  // Minor stats display with tooltips
  const minorStatsHtml = minorStats.map(stat => `
    <div class="profile-stat minor" data-stat-tooltip="${stat.definition.id}">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
      <div class="profile-stat-desc">${stat.definition.description || ''}</div>
    </div>
  `).join('');
  
  // Class icon
  const classIcons = { sage: '📚', protector: '🛡️', pathfinder: '🧭', cleric: '✝️' };
  const classIcon = classIcons[player.class] || '👤';
  
  // Build title dropdown options
  const defaultTitle = player.class?.charAt(0).toUpperCase() + player.class?.slice(1) || 'Adventurer';
  let titleOptionsHtml = `<option value="">< ${defaultTitle} ></option>`;
  earnedTitles.forEach(title => {
    const selected = title.id === equippedTitleId ? 'selected' : '';
    const effectText = title.effects ? ` (${formatTitleEffects(title.effects)})` : '';
    titleOptionsHtml += `<option value="${title.id}" ${selected}>${title.name}${effectText}</option>`;
  });

  const hasTitles = earnedTitles.length > 0;

  showModal('profile-modal', `
    <div class="profile-screen">
      <div class="profile-header">
        <div class="profile-avatar">${classIcon}</div>
        <div class="profile-identity">
          <div class="profile-name">${player.name}</div>
          <div class="profile-title-container">
            ${hasTitles ? `
              <select class="profile-title-dropdown" id="title-dropdown" onchange="changeActiveTitle(this.value)">
                ${titleOptionsHtml}
              </select>
            ` : `
              <div class="profile-title">${activeTitle || defaultTitle}</div>
            `}
          </div>
          <div class="profile-level">Level ${player.level}</div>
        </div>
      </div>
      
      <div class="profile-sections">
        <div class="profile-section">
          <div class="profile-section-title">MAJOR STATS</div>
          <div class="profile-stats-grid">
            ${majorStatsHtml}
          </div>
        </div>
        
        <div class="profile-section">
          <div class="profile-section-title">MINOR STATS</div>
          <div class="profile-stats-grid minor">
            ${minorStatsHtml}
          </div>
        </div>
        
        <div class="profile-section">
          <div class="profile-section-title">EQUIPMENT</div>
          <div class="profile-equipment">
            ${equipmentHtml}
          </div>
        </div>
      </div>
      
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="showCosmeticsScreen()">Cosmetics</button>
        <button class="pixel-btn" onclick="hideModal('profile-modal')">Close</button>
      </div>
    </div>
  `);

  // Bind tooltips to stats after modal renders
  setTimeout(() => {
    const modal = document.getElementById('profile-modal');
    if (modal && typeof TooltipSystem !== 'undefined') {
      TooltipSystem.bindStats(modal);
    }
  }, 0);

  // Tutorial: First time viewing stats
  if (shouldShowTutorial('viewedStats')) {
    markTutorialComplete('viewedStats');
    setTimeout(() => {
      showTutorialTip('viewStats', '.profile-stats-grid', () => {});
    }, 300);
  }
}

/**
 * Change the player's active title
 */
function changeActiveTitle(titleId) {
  if (!titleManager) {
    showNotification('Title system not available', 'error');
    return;
  }

  const result = titleManager.equipTitle(titleId || null);

  if (result.success) {
    const titleName = titleId ? titleManager.getTitle(titleId)?.name : 'default title';
    showNotification(titleId ? `Equipped: ${titleName}` : 'Title unequipped', 'success');
    renderHUD(); // Update HUD if title is shown there
    autoSave();
  } else {
    showNotification(result.message || 'Failed to change title', 'error');
  }
}

/**
 * Format title effects for display in dropdown
 */
function formatTitleEffects(effects) {
  if (!effects) return '';

  const parts = [];

  if (effects.xpBonus) {
    parts.push(`+${Math.floor(effects.xpBonus * 100)}% XP`);
  }
  if (effects.goldBonus) {
    parts.push(`+${Math.floor(effects.goldBonus * 100)}% Gold`);
  }
  if (effects.reputationBonus) {
    parts.push(`+${Math.floor(effects.reputationBonus * 100)}% Rep`);
  }
  if (effects.hintBonus) {
    parts.push(`+${effects.hintBonus} Hints`);
  }
  if (effects.statBonus) {
    Object.entries(effects.statBonus).forEach(([stat, value]) => {
      parts.push(`+${value} ${stat.charAt(0).toUpperCase() + stat.slice(1)}`);
    });
  }

  return parts.join(', ');
}

// =====================================================
// Progress Screen (Milestones, Achievements, Learning)
// =====================================================

let progressTab = 'milestones';

function showProgressScreen() {
  renderProgressScreen();
}

function renderProgressScreen() {
  if (!GameState.player) {
    showModal('progress-modal', '<p>Player data not available</p>');
    return;
  }
  
  const tabsHtml = `
    <div class="progress-tabs">
      <button class="progress-tab ${progressTab === 'milestones' ? 'active' : ''}" onclick="setProgressTab('milestones')">Milestones</button>
      <button class="progress-tab ${progressTab === 'achievements' ? 'active' : ''}" onclick="setProgressTab('achievements')">Achievements</button>
      <button class="progress-tab ${progressTab === 'reputation' ? 'active' : ''}" onclick="setProgressTab('reputation')">Reputation</button>
      <button class="progress-tab ${progressTab === 'skills' ? 'active' : ''}" onclick="setProgressTab('skills')">Skills</button>
      <button class="progress-tab ${progressTab === 'learning' ? 'active' : ''}" onclick="setProgressTab('learning')">Learning</button>
    </div>
  `;

  let contentHtml = '';

  switch (progressTab) {
    case 'milestones':
      contentHtml = renderMilestonesTab();
      break;
    case 'achievements':
      contentHtml = renderAchievementsTab();
      break;
    case 'reputation':
      contentHtml = renderReputationTab();
      break;
    case 'skills':
      contentHtml = renderSkillsTab();
      break;
    case 'learning':
      contentHtml = renderLearningTab();
      break;
  }
  
  showModal('progress-modal', `
    <div class="progress-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
        PROGRESS
      </h2>
      ${tabsHtml}
      <div class="progress-content">
        ${contentHtml}
      </div>
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('progress-modal')">Close</button>
      </div>
    </div>
  `);
}

function setProgressTab(tab) {
  progressTab = tab;
  renderProgressScreen();

  // Tutorial: First time viewing reputation tab
  if (tab === 'reputation' && shouldShowTutorial('viewedReputation')) {
    markTutorialComplete('viewedReputation');
    setTimeout(() => {
      showTutorialTip('viewReputation', '.reputation-item', () => {});
    }, 300);
  }
}

function renderMilestonesTab() {
  if (!statsManager) return '<p>Stats system not initialized.</p>';
  
  const milestones = statsManager.getAllMilestoneProgress();
  
  return milestones.map(progress => {
    const milestone = progress.milestone;
    const currentTier = progress.currentTier;
    const nextTier = progress.nextTier;
    
    // Calculate progress bar
    // If there's an unclaimed reward, show progress toward the UNCLAIMED tier (not next tier)
    // This makes the bar fill to 100% when reward is ready
    let progressPercent = 0;
    let progressText = '';
    let claimable = progress.hasUnclaimedReward;

    if (claimable) {
      // Show the completed tier's progress (100% since we reached it)
      const unclaimedTierIndex = progress.claimedTier + 1;
      const unclaimedTier = milestone.tiers[unclaimedTierIndex];
      if (unclaimedTier) {
        progressPercent = 100;
        progressText = `${progress.currentValue} / ${unclaimedTier.threshold} ✓`;
      }
    } else if (progress.isMaxed) {
      progressPercent = 100;
      progressText = 'MAXED';
    } else if (nextTier) {
      progressPercent = Math.min(100, (progress.currentValue / nextTier.threshold) * 100);
      progressText = `${progress.currentValue} / ${nextTier.threshold}`;
    }
    
    return `
      <div class="milestone-item ${claimable ? 'claimable' : ''}">
        <div class="milestone-header">
          <span class="milestone-icon">${milestone.icon}</span>
          <span class="milestone-name">${milestone.name}</span>
          ${currentTier ? `<span class="milestone-tier">${currentTier.label}</span>` : ''}
        </div>
        <div class="milestone-desc">${milestone.description}</div>
        <div class="milestone-progress-bar">
          <div class="milestone-progress-fill" style="width: ${progressPercent}%"></div>
          <span class="milestone-progress-text">${progressText}</span>
        </div>
        ${claimable ? `<button class="pixel-btn pixel-btn-gold milestone-claim-btn" onclick="claimMilestoneReward('${milestone.id}')">Claim Reward</button>` : ''}
      </div>
    `;
  }).join('');
}

function renderAchievementsTab() {
  if (!statsManager) return '<p>Stats system not initialized.</p>';
  
  const achievements = statsManager.getVisibleAchievements();
  
  return `
    <div class="achievements-grid">
      ${achievements.map(a => {
        const achievement = a.achievement;
        return `
          <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${a.unlocked ? achievement.icon : '❓'}</div>
            <div class="achievement-info">
              <div class="achievement-name">${a.unlocked ? achievement.name : '???'}</div>
              <div class="achievement-desc">${a.unlocked ? achievement.description : 'Keep playing to discover...'}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderLearningTab() {
  const player = GameState.player;
  const vocabCount = Object.keys(player.vocabulary || {}).length;
  
  // Get mastery breakdown if srManager exists
  let masteryBreakdown = '';
  if (srManager) {
    const stats = srManager.getMasteryStats();
    masteryBreakdown = `
      <div class="learning-mastery">
        <div class="mastery-row"><span class="mastery-label">New</span><span class="mastery-value">${stats[0] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Learning</span><span class="mastery-value">${stats[1] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Familiar</span><span class="mastery-value">${stats[2] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Practiced</span><span class="mastery-value">${stats[3] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Known</span><span class="mastery-value">${stats[4] || 0}</span></div>
        <div class="mastery-row"><span class="mastery-label">Mastered</span><span class="mastery-value">${stats[5] || 0}</span></div>
      </div>
    `;
  }
  
  // Calculate accuracy
  const totalAnswers = player.totalCorrectAnswers + player.totalWrongAnswers;
  const accuracy = totalAnswers > 0 ? Math.round((player.totalCorrectAnswers / totalAnswers) * 100) : 0;
  
  return `
    <div class="learning-stats">
      <div class="learning-stat-card">
        <div class="learning-stat-value">${vocabCount}</div>
        <div class="learning-stat-label">Words Learned</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${player.lessonsCompleted || 0}</div>
        <div class="learning-stat-label">Lessons Completed</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${accuracy}%</div>
        <div class="learning-stat-label">Accuracy</div>
      </div>
      <div class="learning-stat-card">
        <div class="learning-stat-value">${player.longestStreak || 0}</div>
        <div class="learning-stat-label">Best Streak</div>
      </div>
    </div>
    
    <div class="learning-section-title">MASTERY BREAKDOWN</div>
    ${masteryBreakdown}
  `;
}

function renderSkillsTab() {
  const player = GameState.player;
  const MAX_SKILL_LEVEL = 50;

  // Define all skills with their icons and categories
  const gatheringSkills = [
    { id: 'mining', name: 'Mining', icon: '⛏️' },
    { id: 'woodcutting', name: 'Woodcutting', icon: '🪓' },
    { id: 'herbalism', name: 'Herbalism', icon: '🌿' },
    { id: 'fishing', name: 'Fishing', icon: '🎣' },
    { id: 'hunting', name: 'Hunting', icon: '🏹' }
  ];

  const craftingSkills = [
    { id: 'alchemy', name: 'Alchemy', icon: '⚗️' },
    { id: 'smithing', name: 'Smithing', icon: '🔨' },
    { id: 'enchanting', name: 'Enchanting', icon: '✨' }
  ];

  const renderSkillRow = (skill) => {
    const skillData = player.skills?.[skill.id] || { level: 1, xp: 0 };
    const level = skillData.level || 1;
    const xp = skillData.xp || 0;
    const isMaxed = level >= MAX_SKILL_LEVEL;
    const progressPercent = isMaxed ? 100 : Math.min(100, (xp / getSkillXPForLevel(level)) * 100);

    return `
      <div class="skill-row ${isMaxed ? 'maxed' : ''}">
        <div class="skill-row-icon">${skill.icon}</div>
        <div class="skill-row-info">
          <div class="skill-row-name">${skill.name}</div>
          <div class="skill-row-progress">
            <div class="skill-row-bar">
              <div class="skill-row-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>
        <div class="skill-row-level ${isMaxed ? 'maxed' : ''}">
          ${isMaxed ? '★ ' : ''}${level}
        </div>
      </div>
    `;
  };

  return `
    <div class="skills-section">
      <div class="skills-category-title">⛏️ GATHERING</div>
      <div class="skills-list">
        ${gatheringSkills.map(renderSkillRow).join('')}
      </div>
    </div>

    <div class="skills-section">
      <div class="skills-category-title">🔨 CRAFTING</div>
      <div class="skills-list">
        ${craftingSkills.map(renderSkillRow).join('')}
      </div>
    </div>

    <div class="skills-note">
      Skills increase as you practice. Max level: ${MAX_SKILL_LEVEL}
    </div>
  `;
}

// Helper for skill XP requirements
function getSkillXPForLevel(level) {
  // Same formula as crafting skills: 100 * level
  return 100 * level;
}

function renderReputationTab() {
  if (!reputationManager) return '<p>Reputation system not initialized.</p>';

  const allFactions = reputationManager.getAllFactionsWithDiscoveryStatus();
  const majorFactions = allFactions.filter(s => s.faction.type === 'major');
  const minorFactions = allFactions.filter(s => s.faction.type === 'minor');

  const renderFactionItem = (status) => {
    const faction = status.faction;

    // Undiscovered faction - show mystery entry
    if (!status.discovered) {
      return `
        <div class="reputation-item reputation-undiscovered">
          <div class="reputation-header">
            <span class="reputation-icon" style="background: #444;">❓</span>
            <div class="reputation-info">
              <div class="reputation-name">???</div>
              <div class="reputation-rank">Not Yet Discovered</div>
            </div>
          </div>
          <div class="reputation-bar-container">
            <div class="reputation-bar-fill" style="width: 0%; background: #444;"></div>
            <span class="reputation-bar-text">? / ?</span>
          </div>
        </div>
      `;
    }

    // Discovered faction - show full details
    const maxRep = reputationManager.getMaxRank(faction.id).reputation;

    return `
      <div class="reputation-item">
        <div class="reputation-header">
          <span class="reputation-icon" style="background: ${faction.color};">${faction.icon}</span>
          <div class="reputation-info">
            <div class="reputation-name">${faction.name}</div>
            <div class="reputation-rank">${status.currentRank.name}</div>
          </div>
        </div>
        <div class="reputation-bar-container">
          <div class="reputation-bar-fill" style="width: ${status.isMaxed ? 100 : status.progress}%; background: ${faction.color};"></div>
          <span class="reputation-bar-text">${status.reputation} / ${status.isMaxed ? maxRep : status.nextRank.reputation}</span>
        </div>
        ${status.isMaxed ? '<div class="reputation-maxed">MAX RANK</div>' : ''}
      </div>
    `;
  };

  return `
    <div class="reputation-section">
      <div class="reputation-section-title">MAJOR FACTIONS</div>
      ${majorFactions.length > 0 ? majorFactions.map(renderFactionItem).join('') : '<p class="no-factions">No major factions discovered yet.</p>'}
    </div>

    <div class="reputation-section">
      <div class="reputation-section-title">MINOR FACTIONS</div>
      ${minorFactions.length > 0 ? minorFactions.map(renderFactionItem).join('') : '<p class="no-factions">No minor factions discovered yet.</p>'}
    </div>
  `;
}

function claimMilestoneReward(milestoneId) {
  if (!statsManager) return;

  const rewards = statsManager.claimMilestoneReward(milestoneId);

  // If claim returned null, nothing to do
  if (rewards === null) return;

  // Show notifications for each reward
  if (rewards.length > 0) {
    rewards.forEach(reward => {
      if (reward.type === 'stat') {
        showNotification(`+${reward.amount} ${reward.statName}!`, 'success');
      }
      if (reward.type === 'title') {
        const titleDef = typeof TITLE_DEFINITIONS !== 'undefined' ? TITLE_DEFINITIONS[reward.title] : null;
        const titleName = titleDef ? titleDef.name : reward.title;
        showNotification(`Title Unlocked: ${titleName}!`, 'success');
      }
    });
  }

  // Always refresh and save after successful claim (even if rewards array was empty)
  renderProgressScreen();
  autoSave();
}

// =====================================================
// Reputation Helpers
// =====================================================

function addReputationWithNotification(factionId, amount) {
  if (!reputationManager) return null;
  
  const result = reputationManager.addReputation(factionId, amount);
  
  if (result) {
    // Show reputation gain notification
    showNotification(`+${result.change} ${result.factionName} reputation`, 'info');
    
    // Show rank up notification if applicable
    if (result.rankIncreased) {
      setTimeout(() => {
        showNotification(`🎉 ${result.factionName}: ${result.newRank.name}!`, 'success');
      }, 500);

      // Check if this triggers any achievements or milestones
      checkAchievements();
      checkMilestones();
    }

    // Check for reputation-based artifact unlocks
    checkReputationArtifacts(factionId, result.newTotal);
  }

  return result;
}

// =====================================================
// Character Creation
// =====================================================

function showCharacterCreation() {
  document.getElementById('title-screen').style.display = 'none';

  // Get base cleric class info
  const clericClass = GAME_DATA.classes.cleric;

  showModal('character-creation', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
      Create Your Character
    </h2>
    <div style="text-align: center; margin-bottom: 20px; padding: 16px; background: rgba(0,0,0,0.2); border-radius: 8px;">
      <div style="font-size: 32px; margin-bottom: 8px;">${clericClass.icon}</div>
      <div style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold);">${clericClass.name}</div>
      <div style="font-size: 11px; color: var(--text-dim); margin-top: 8px; font-style: italic;">
        ${clericClass.flavor}
      </div>
    </div>
    <div style="margin-bottom: 24px; text-align: center;">
      <label style="display: block; font-family: var(--font-display); font-size: 14px; margin-bottom: 8px;">Your Name</label>
      <input type="text" class="name-input" id="player-name-input" placeholder="Enter name..." maxlength="20">
      <div id="name-error" class="validation-message" style="display: none;">
        <span class="validation-icon">⚠️</span> Please enter a name to continue
      </div>
    </div>
    <div style="text-align: center; font-size: 11px; color: var(--text-dim); margin-bottom: 16px;">
      Your Order specialization will be chosen later in your journey.
    </div>
    <div style="text-align: center; margin-top: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <button class="art-btn art-btn-large art-btn-gold" id="start-adventure-btn" disabled>
        Begin Adventure
      </button>
      <button class="art-btn art-btn-small" id="back-to-menu-btn">
        Back
      </button>
    </div>
  `);

  // Back button handler
  document.getElementById('back-to-menu-btn').addEventListener('click', () => {
    hideModal('character-creation');
    document.getElementById('title-screen').style.display = 'flex';
  });

  const nameInput = document.getElementById('player-name-input');
  const nameError = document.getElementById('name-error');

  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    const btn = document.getElementById('start-adventure-btn');
    btn.disabled = !name;
    if (name) {
      nameError.style.display = 'none';
    }
  });

  nameInput.addEventListener('focus', () => {
    nameError.style.display = 'none';
  });

  document.getElementById('start-adventure-btn').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameError.style.display = 'block';
      nameInput.focus();
      return;
    }
    hideModal('character-creation');
    // Default to cleric class - specialization chosen later
    showLanguageSelection(name, 'cleric');
  });
}

// =====================================================
// Order Selection (Mid-game class choice)
// =====================================================

function showOrderSelection() {
  // Get the specialization classes (not the base cleric)
  const orders = Object.values(GAME_DATA.classes).filter(cls => !cls.isBaseClass);

  const orderCards = orders.map(order => `
    <div class="order-card" data-order="${order.id}">
      <div class="order-icon">${order.icon}</div>
      <div class="order-name">${order.name}</div>
      <div class="order-desc">${order.description}</div>
      <div class="order-flavor">${order.flavor}</div>
      <div class="order-bonus">
        <span class="bonus-label">Blessing:</span> ${order.bonus}
      </div>
    </div>
  `).join('');

  showModal('order-selection', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 8px; text-align: center;">
      Choose Your Order
    </h2>
    <p style="text-align: center; font-size: 11px; color: var(--text-dim); margin-bottom: 20px;">
      This choice will shape your abilities and your role in the Light's service.
    </p>
    <div class="order-options">
      ${orderCards}
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <button class="art-btn art-btn-large art-btn-gold" id="confirm-order-btn" disabled>
        Commit to This Path
      </button>
    </div>
  `);

  let selectedOrder = null;

  document.querySelectorAll('.order-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.order-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOrder = card.dataset.order;
      document.getElementById('confirm-order-btn').disabled = false;
    });
  });

  document.getElementById('confirm-order-btn').addEventListener('click', () => {
    if (!selectedOrder) return;
    applyOrderSelection(selectedOrder);
    hideModal('order-selection');
  });
}

function applyOrderSelection(orderId) {
  const orderData = GAME_DATA.classes[orderId];
  if (!orderData) {
    console.error('Order not found:', orderId);
    return;
  }

  const baseStats = GAME_DATA.classes.cleric.startingStats;
  const orderStats = orderData.startingStats;

  // Calculate HP difference from base cleric
  const hpDiff = orderStats.maxHp - baseStats.maxHp;

  // Apply stat changes
  GameState.player.maxHp += hpDiff;
  GameState.player.hp = Math.min(GameState.player.hp + Math.max(0, hpDiff), GameState.player.maxHp);

  // Update player class
  GameState.player.class = orderId;

  // Grant starting items for the order
  if (orderData.startingItems && orderData.startingItems.length > 0) {
    orderData.startingItems.forEach(itemId => {
      addItemToInventory(itemId);
    });
  }

  // Complete the quest objective
  const activeQuest = GameState.player.activeQuests.find(q => q.id === 'choose_your_path');
  if (activeQuest) {
    const objective = activeQuest.objectives.find(o => o.id === 'choose_order');
    if (objective) {
      objective.completed = true;
      showNotification(`Objective Complete: Choose your Order`);
      checkQuestCompletion('choose_your_path');
    }
  }

  // Show confirmation
  showNotification(`You have joined the ${orderData.name}!`, 'success');

  // Update UI
  renderHUD();
  renderQuestPanel();

  // Save
  autoSave();
}

// Check if player needs to choose an order (for quest system)
function playerNeedsOrderSelection() {
  return GameState.player.class === 'cleric';
}

// Language Selection Screen
function showLanguageSelection(playerName, classId) {
  const languages = [
    { id: 'french', name: 'French', nativeName: 'Français', icon: '🇫🇷', available: true },
    { id: 'spanish', name: 'Spanish', nativeName: 'Español', icon: '🇪🇸', available: false },
    { id: 'german', name: 'German', nativeName: 'Deutsch', icon: '🇩🇪', available: false },
    { id: 'italian', name: 'Italian', nativeName: 'Italiano', icon: '🇮🇹', available: false }
  ];

  const languageCards = languages.map(lang => `
    <div class="language-card ${lang.available ? '' : 'locked'}" data-language="${lang.id}" ${!lang.available ? 'title="Coming Soon"' : ''}>
      <div class="language-icon">${lang.icon}</div>
      <div class="language-name">${lang.name}</div>
      <div class="language-native">${lang.nativeName}</div>
      ${!lang.available ? '<div class="language-locked-badge">Coming Soon</div>' : ''}
    </div>
  `).join('');

  showModal('language-selection', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 8px; text-align: center;">
      Choose Your Language
    </h2>
    <p style="font-family: var(--font-body); font-size: 10px; color: var(--text-dim); margin-bottom: 24px; text-align: center;">
      Select the language you want to learn
    </p>
    <div class="language-options">
      ${languageCards}
    </div>
    <div style="text-align: center; margin-top: 24px;">
      <button class="art-btn art-btn-large art-btn-gold" id="confirm-language-btn" disabled>
        Continue
      </button>
    </div>
  `);

  let selectedLanguage = null;

  document.querySelectorAll('.language-card:not(.locked)').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.language-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedLanguage = card.dataset.language;
      document.getElementById('confirm-language-btn').disabled = false;
    });
  });

  document.getElementById('confirm-language-btn').addEventListener('click', () => {
    if (selectedLanguage) {
      hideModal('language-selection');
      startNewGame(playerName, classId, selectedLanguage);
    }
  });
}

function startNewGame(name, classId, language = 'french') {
  const classData = GAME_DATA.classes[classId];

  // Reset permanent upgrades for new game
  if (typeof accountProgression !== 'undefined' && accountProgression.resetForTesting) {
    accountProgression.resetForTesting();
  }

  GameState.player.name = name;
  GameState.player.class = classId;
  GameState.player.language = language;
  GameState.player.createdAt = Date.now();
  GameState.player.freeReviveUsed = false; // First death is free
  
  // Initialize stats system
  if (statsManager) {
    statsManager.initializeStats();
    // Calculate max HP based on stats
    GameState.player.maxHp = statsManager.calculateMaxHp();
  } else {
    GameState.player.maxHp = classData.startingStats.maxHp;
  }
  GameState.player.hp = GameState.player.maxHp;
  
  // Add starting items
  classData.startingItems.forEach(itemId => {
    addItemToInventory(itemId);
  });
  
  // Check class achievement
  checkAchievements();
  
  hideModal('character-creation');
  startGame();
}

function startGame() {
  GameState.currentScreen = 'game';
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';

  // Check for locations that should be discovered based on completed quests
  // This is a recovery for saves before location discovery was implemented
  if (locationManager) {
    locationManager.checkQuestBasedDiscovery();
  }

  renderHUD();
  renderLocation();
  renderQuestPanel();
  updateNavButtonVisibility();

  // Only show intro cutscene for new games (intro not yet completed)
  if (shouldShowTutorial('intro')) {
    setTimeout(() => {
      CutsceneManager.play('intro_dawnmere', () => {
        markTutorialComplete('intro');
        // Show first tutorial tip after a brief delay
        if (shouldShowTutorial('clickedNpc')) {
          setTimeout(() => {
            showTutorialTip('clickNpc', '.npc-sprite', () => {
              // Highlight stays until they click an NPC
            });
          }, 800);
        }
      });
    }, 500);
  }
}

// =====================================================
// Initialization
// =====================================================

function initGame() {
  // Load settings first (before any visual setup)
  loadSettings();
  applySettings();
  
  // Initialize Quest Manager
  questManager = new QuestManager(GameState, GAME_DATA);
  
  // Initialize Spaced Repetition Manager
  srManager = new SpacedRepetitionManager(GameState);
  
  // Initialize Stats Manager
  statsManager = new StatsManager(GameState);
  
  // Initialize Reputation Manager
  reputationManager = new ReputationManager(GameState);
  
  // Initialize Item Manager
  itemManager = new ItemManager(GameState, GAME_DATA.items);
  
  // Initialize Shop Manager
  shopManager = new ShopManager(GameState, SHOP_DEFINITIONS, itemManager);
  
  // Initialize Hint Manager
  hintManager = new HintManager(GameState, srManager);
  
  // Initialize Location Manager
  locationManager = new LocationManager(GameState);
  
  // Initialize Boss Exam Manager
  bossExamManager = new BossExamManager(GameState, locationManager, hintManager, srManager);
  
  // Initialize Title Manager
  titleManager = new TitleManager(GameState);

  // Initialize Alchemy Manager
  if (typeof AlchemyManager !== 'undefined') {
    alchemyManager = new AlchemyManager(GameState);
  }

  // Initialize Smithing Manager
  if (typeof SmithingManager !== 'undefined') {
    smithingManager = new SmithingManager(GameState);
  }

  // Initialize Enchanting Manager
  if (typeof EnchantingManager !== 'undefined') {
    enchantingManager = new EnchantingManager(GameState);
  }

  // Initialize Village Projects Manager
  if (typeof VillageProjectsManager !== 'undefined') {
    villageProjectsManager = new VillageProjectsManager(GameState);
  }

  // Initialize Spellbook Manager
  if (typeof SpellbookManager !== 'undefined') {
    spellbookManager = new SpellbookManager(GameState);
  }

  // Initialize Cosmetic Manager
  if (typeof CosmeticManager !== 'undefined') {
    cosmeticManager = new CosmeticManager(GameState);
  }

  // Title screen buttons
  document.getElementById('new-game-btn').addEventListener('click', showCharacterCreation);
  document.getElementById('continue-btn').addEventListener('click', () => {
    if (loadGame()) {
      document.getElementById('title-screen').style.display = 'none';
      startGame();
    } else {
      showNotification("No save file found!", 'error');
    }
  });
  
  // Navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      handleNavigation(screen);
    });
  });
  
  // Check for existing save
  if (localStorage.getItem('bytequest_save')) {
    document.getElementById('continue-btn').style.display = 'block';
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Don't process shortcuts until character is created
    if (!GameState.player.createdAt) {
      return;
    }

    // Check if in lesson and keyboard shortcuts enabled
    if (GameState.lessonState?.active && GameState.settings?.keyboardShortcuts !== false) {
      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const answerBtns = document.querySelectorAll('.answer-btn:not(:disabled)');
        const index = parseInt(key) - 1;
        if (answerBtns[index]) {
          answerBtns[index].click();
          return;
        }
      }
    }

    if (GameState.activeDialog) {
      if (e.key === 'Escape') hideDialog();
      return;
    }

    switch(e.key.toLowerCase()) {
      case 'i':
        handleNavigation('inventory');
        break;
      case 'q':
        handleNavigation('quests');
        break;
      case 'm':
        handleNavigation('map');
        break;
      case 's':
        handleNavigation('spellbook');
        break;
      case 'escape':
        handleNavigation('game');
        hideSpellbook(); // Also close spellbook on escape
        break;
    }
  });
  
  // Delegate click handler for quest accept/complete buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quest-accept-btn')) {
      const questId = e.target.dataset.quest;
      handleAcceptQuest(questId);
    }
    if (e.target.classList.contains('quest-complete-btn')) {
      const questId = e.target.dataset.quest;
      handleCompleteQuest(questId);
    }
  });
  
  // Start periodic checks for timed quests
  setInterval(checkTimedQuests, 1000);
}

function handleAcceptQuest(questId) {
  const quest = getQuest(questId);
  const questName = quest?.name || 'this quest';
  
  // Check if confirmation is required
  if (GameState.settings?.confirmActions) {
    if (!confirm(`Accept quest: "${questName}"?`)) {
      return;
    }
  }
  
  if (questManager) {
    const result = questManager.acceptQuest(questId);
    if (result.success) {
      showNotification(result.message, 'success');
      GameState.selectedQuest = questId;
      renderQuestPanel();
      renderLocation();
      autoSave();
    } else {
      showNotification(result.message, 'error');
    }
  } else {
    acceptQuest(questId);
  }
}

function handleCompleteQuest(questId) {
  if (questManager) {
    const result = questManager.completeQuest(questId);
    if (result.success) {
      // Grant rewards
      const granted = questManager.grantRewards(result.rewards);
      
      // Show completion notification
      showNotification(result.message, 'success');
      
      // Show rewards
      if (granted.xp > 0) showNotification(`+${granted.xp} XP`);
      if (granted.gold > 0) showNotification(`+${granted.gold} Gold`);
      granted.items.forEach(itemId => {
        const item = GAME_DATA.items[itemId];
        if (item) showNotification(`Received: ${item.name}`);
      });
      
      // Check for level up
      checkLevelUp();
      
      // Update UI
      GameState.selectedQuest = null;
      renderHUD();
      renderQuestPanel();
      renderLocation();
      autoSave();
    } else {
      showNotification(result.message, 'error');
    }
  } else {
    completeQuest(questId);
  }
}

function checkTimedQuests() {
  if (!questManager) return;
  
  const expired = questManager.checkExpirations();
  expired.forEach(questId => {
    const quest = GAME_DATA.quests[questId];
    if (quest) {
      showNotification(`Quest expired: ${quest.name}`, 'error');
    }
  });
  
  if (expired.length > 0) {
    renderQuestPanel();
  }
}

function checkLevelUp() {
  while (GameState.player.xp >= GameState.player.xpToNext) {
    levelUp();
  }
}

function handleNavigation(screen) {
  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen);
  });
  
  // Handle screen change
  switch(screen) {
    case 'inventory':
      showInventoryScreen();
      break;
    case 'profile':
      showProfileScreen();
      break;
    case 'progress':
      showProgressScreen();
      break;
    case 'spellbook':
      showSpellbook();
      break;
    case 'quests':
      showQuestsScreen();
      break;
    case 'map':
      showMapScreen();
      break;
    case 'titles':
      showTitlesScreen();
      break;
    case 'save':
      saveGame();
      break;
    case 'settings':
      showSettingsScreen();
      break;
    case 'gather':
      showGatherScreen();
      break;
    case 'alchemy':
      openCrafting('alchemy');
      break;
    case 'smithing':
      openCrafting('smithing');
      break;
    case 'enchanting':
      openCrafting('enchanting');
      break;
    case 'crafting':
      openCrafting('alchemy');
      break;
    case 'projects':
      showVillageProjectsScreen();
      break;
  }
}

function showQuestsScreen() {
  const filter = GameState.questFilter || 'all';

  // Get quests
  const activeQuests = questManager ? questManager.getActiveQuests() : [];
  const availableQuests = questManager ? questManager.getAvailableQuests() : [];
  const completedQuests = questManager ? questManager.getCompletedQuests() : [];

  // Build filter tabs
  const filterHtml = `
    <div class="ql-filters">
      <button class="ql-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
      <button class="ql-filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active</button>
      <button class="ql-filter-btn ${filter === 'available' ? 'active' : ''}" data-filter="available">Available</button>
      <button class="ql-filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Completed</button>
    </div>
  `;

  // Filter logic
  const showActive = filter === 'all' || filter === 'active';
  const showAvailable = filter === 'all' || filter === 'available';
  const showCompleted = filter === 'completed';

  // Build quest list (left panel)
  let questListHtml = '';

  if (showActive && activeQuests.length > 0) {
    questListHtml += '<div class="ql-section"><div class="ql-section-header">⚔️ Active</div>';
    activeQuests.forEach(quest => {
      questListHtml += renderQuestListItem(quest, QuestStatus.ACTIVE);
    });
    questListHtml += '</div>';
  }

  if (showAvailable && availableQuests.length > 0) {
    questListHtml += '<div class="ql-section"><div class="ql-section-header">❗ Available</div>';
    availableQuests.forEach(quest => {
      questListHtml += renderQuestListItem(quest, QuestStatus.AVAILABLE);
    });
    questListHtml += '</div>';
  }

  if (showCompleted && completedQuests.length > 0) {
    questListHtml += '<div class="ql-section"><div class="ql-section-header">✅ Completed</div>';
    completedQuests.slice(0, 20).forEach(quest => {
      questListHtml += renderQuestListItem(quest, QuestStatus.COMPLETED);
    });
    questListHtml += '</div>';
  }

  if (!questListHtml) {
    questListHtml = '<div class="ql-empty">No quests to display</div>';
  }

  // Build detail panel (right side)
  const detailHtml = GameState.selectedQuest
    ? renderQuestDetail(GameState.selectedQuest)
    : '<div class="ql-detail-empty"><div class="ql-detail-empty-icon">📜</div><div>Select a quest to view details</div></div>';

  const content = `
    <div class="quest-log-container">
      <div class="ql-header">
        <h2 class="ql-title">📜 Quest Log</h2>
        ${filterHtml}
      </div>
      <div class="ql-body">
        <div class="ql-list-panel">
          ${questListHtml}
        </div>
        <div class="ql-detail-panel">
          ${detailHtml}
        </div>
      </div>
      <div class="ql-footer">
        <button class="pixel-btn" onclick="hideModal('quests-modal')">Close</button>
      </div>
    </div>
  `;

  showModal('quests-modal', content);

  // Add filter button handlers
  document.querySelectorAll('.ql-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      GameState.questFilter = btn.dataset.filter;
      showQuestsScreen();
    });
  });

  // Add quest click handlers
  document.querySelectorAll('.ql-quest-item').forEach(item => {
    item.addEventListener('click', () => {
      const questId = item.dataset.quest;
      GameState.selectedQuest = questId;
      showQuestsScreen();
    });
  });

  // Add action button handlers
  document.querySelectorAll('.ql-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const questId = btn.dataset.quest;
      const action = btn.dataset.action;
      if (action === 'accept') {
        acceptQuest(questId);
        showQuestsScreen();
      } else if (action === 'abandon') {
        abandonQuest(questId);
        showQuestsScreen();
      }
    });
  });
}

// Render a compact quest item for the list (left panel)
function renderQuestListItem(quest, status) {
  const questData = getQuest(quest.id) || quest;
  const isSelected = GameState.selectedQuest === quest.id;
  const typeInfo = getQuestTypeInfo(questData.type);

  // Calculate completion for active quests
  let progressHtml = '';
  if (status === QuestStatus.ACTIVE && quest.objectives) {
    const total = quest.objectives.length;
    const completed = quest.objectives.filter(o => o.completed).length;
    const percent = Math.round((completed / total) * 100);
    progressHtml = `<div class="ql-progress"><div class="ql-progress-bar" style="width: ${percent}%"></div></div>`;
  }

  // Status indicator
  let statusIcon = '';
  if (status === QuestStatus.ACTIVE) {
    const allComplete = quest.objectives?.every(o => o.completed);
    statusIcon = allComplete ? '✓' : '';
  } else if (status === QuestStatus.AVAILABLE) {
    statusIcon = '!';
  } else if (status === QuestStatus.COMPLETED) {
    statusIcon = '✓';
  }

  return `
    <div class="ql-quest-item ${status} ${isSelected ? 'selected' : ''}" data-quest="${quest.id}">
      <span class="ql-quest-icon" style="color: ${typeInfo.color}">${typeInfo.icon}</span>
      <span class="ql-quest-name">${questData.name}</span>
      ${statusIcon ? `<span class="ql-quest-status ${status}">${statusIcon}</span>` : ''}
      ${progressHtml}
    </div>
  `;
}

// Render detailed quest info (right panel)
function renderQuestDetail(questId) {
  const activeQuest = GameState.player.activeQuests.find(q => q.id === questId);
  const questData = getQuest(questId);

  if (!questData) {
    return '<div class="ql-detail-empty">Quest not found</div>';
  }

  const isActive = !!activeQuest;
  const isCompleted = GameState.player.completedQuests.includes(questId);
  const isAvailable = !isActive && !isCompleted;

  const typeInfo = getQuestTypeInfo(questData.type);
  const categoryInfo = getQuestCategoryInfo(questData.category);

  // Quest giver info
  const giver = questData.giver ? (typeof getNPC === 'function' ? getNPC(questData.giver) : null) : null;
  const giverName = giver?.name || questData.giver || 'Unknown';

  // Build objectives HTML
  let objectivesHtml = '<div class="ql-objectives">';
  if (questData.objectives) {
    questData.objectives.forEach(obj => {
      const progress = activeQuest?.objectives?.find(o => o.id === obj.id);
      const completed = progress?.completed || isCompleted;
      const count = progress?.count || 0;

      let objText = obj.text;
      if (obj.target && !isCompleted) {
        objText += ` (${count}/${obj.target})`;
      }

      objectivesHtml += `
        <div class="ql-objective ${completed ? 'completed' : ''}">
          <span class="ql-obj-check">${completed ? '✓' : '○'}</span>
          <span class="ql-obj-text">${objText}</span>
        </div>
      `;
    });
  }
  objectivesHtml += '</div>';

  // Build rewards HTML
  let rewardsHtml = '';
  if (questData.rewards) {
    rewardsHtml = '<div class="ql-rewards"><div class="ql-rewards-title">Rewards</div><div class="ql-rewards-list">';
    if (questData.rewards.xp) {
      rewardsHtml += `<span class="ql-reward">⭐ ${questData.rewards.xp} XP</span>`;
    }
    if (questData.rewards.gold) {
      rewardsHtml += `<span class="ql-reward">💰 ${questData.rewards.gold} Gold</span>`;
    }
    if (questData.rewards.items?.length > 0) {
      questData.rewards.items.forEach(itemId => {
        const item = GAME_DATA.items[itemId];
        if (item) {
          rewardsHtml += `<span class="ql-reward">${item.icon} ${item.name}</span>`;
        }
      });
    }
    if (questData.rewards.reputation) {
      Object.entries(questData.rewards.reputation).forEach(([faction, amount]) => {
        rewardsHtml += `<span class="ql-reward">🏛️ +${amount} Rep</span>`;
      });
    }
    rewardsHtml += '</div></div>';
  }

  // Chain info
  let chainHtml = '';
  if (questData.chainId && questManager) {
    const chainProgress = questManager.getChainProgress(questData.chainId);
    if (chainProgress) {
      chainHtml = `<div class="ql-chain">🔗 Part ${questData.chainOrder} of ${chainProgress.total}</div>`;
    }
  }

  // Action buttons
  let actionsHtml = '<div class="ql-actions">';
  if (isAvailable) {
    actionsHtml += `<button class="pixel-btn pixel-btn-gold ql-action-btn" data-quest="${questId}" data-action="accept">Accept Quest</button>`;
  } else if (isActive) {
    const allComplete = activeQuest.objectives?.every(o => o.completed);
    if (allComplete) {
      actionsHtml += `<div class="ql-ready">✓ Ready to turn in - speak to ${giverName}</div>`;
    }
    if (!questData.cannotAbandon) {
      actionsHtml += `<button class="pixel-btn ql-action-btn ql-abandon-btn" data-quest="${questId}" data-action="abandon">Abandon Quest</button>`;
    }
  } else if (isCompleted) {
    actionsHtml += `<div class="ql-completed-badge">✓ Quest Completed</div>`;
  }
  actionsHtml += '</div>';

  return `
    <div class="ql-detail">
      <div class="ql-detail-header">
        <span class="ql-detail-type" style="background: ${typeInfo.color}">${typeInfo.icon} ${typeInfo.label}</span>
        <span class="ql-detail-category">${categoryInfo.icon} ${categoryInfo.label}</span>
      </div>
      <h3 class="ql-detail-title">${questData.name}</h3>
      <div class="ql-detail-giver">Quest Giver: <span>${giverName}</span></div>
      ${chainHtml}
      <div class="ql-detail-desc">${questData.description}</div>
      <div class="ql-detail-section">
        <div class="ql-section-label">Objectives</div>
        ${objectivesHtml}
      </div>
      ${rewardsHtml}
      ${actionsHtml}
    </div>
  `;
}

function abandonQuest(questId) {
  const questData = getQuest(questId);
  if (questData?.cannotAbandon) {
    showNotification("This quest cannot be abandoned", 'error');
    return;
  }

  const index = GameState.player.activeQuests.findIndex(q => q.id === questId);
  if (index > -1) {
    GameState.player.activeQuests.splice(index, 1);
    GameState.selectedQuest = null;
    showNotification(`Quest abandoned: ${questData?.name || questId}`);
    renderQuestPanel();
    autoSave();
  }
}

function showInventoryScreen() {
  // Hide any lingering tooltips when refreshing inventory
  if (typeof TooltipSystem !== 'undefined') {
    TooltipSystem.hide();
  }

  const equipment = GameState.player.equipment;
  const inventory = GameState.player.inventory;

  let equipmentHtml = ['helm', 'armor', 'weapon', 'accessory', 'ring'].map(slot => {
    const itemId = equipment[slot];
    const item = itemId ? GAME_DATA.items[itemId] : null;
    const statsText = item?.stats ? Object.entries(item.stats).map(([k,v]) => `+${v} ${k}`).join(', ') : '';
    return `
      <div class="equip-slot ${item ? 'has-item' : ''}" data-slot="${slot}">
        <div class="equip-slot-label">${slot.toUpperCase()}</div>
        <div class="equip-slot-box">${item ? item.icon : ''}</div>
        ${item ? `<div class="equip-slot-name">${item.name}</div>` : ''}
        ${statsText ? `<div class="equip-slot-stats">${statsText}</div>` : ''}
      </div>
    `;
  }).join('');

  // Filter out resources from inventory grid (they display in separate section)
  const nonResourceItems = inventory.filter(item => {
    const itemData = GAME_DATA.items[item.id];
    return itemData && itemData.type !== 'resource';
  });

  let inventoryHtml = '';
  for (let i = 0; i < 24; i++) {
    const item = nonResourceItems[i];
    if (item) {
      const itemData = GAME_DATA.items[item.id];
      inventoryHtml += `
        <div class="inventory-slot" data-item="${item.id}">
          <span class="item-icon">${itemData?.icon || '?'}</span>
          ${item.count > 1 ? `<span class="item-count">${item.count}</span>` : ''}
        </div>
      `;
    } else {
      inventoryHtml += '<div class="inventory-slot empty"></div>';
    }
  }

  // Build resources section (doesn't take inventory slots)
  const resourceCategories = {
    ore: { name: 'Ore', icon: '🪨' },
    wood: { name: 'Wood', icon: '🪵' },
    hide: { name: 'Hides', icon: '🧶' },
    herb: { name: 'Herbs', icon: '🌿' },
    fish: { name: 'Fish', icon: '🐟' }
  };

  // Get all resource items from inventory
  const resources = inventory.filter(item => {
    const itemData = GAME_DATA.items[item.id];
    return itemData && itemData.type === 'resource';
  });

  let resourcesHtml = '';
  if (resources.length > 0) {
    // Group by category
    const grouped = {};
    resources.forEach(item => {
      const itemData = GAME_DATA.items[item.id];
      const cat = itemData.category || 'misc';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ ...item, data: itemData });
    });

    resourcesHtml = `
      <div class="resources-section">
        <h3 style="font-family: var(--font-display); font-size: 12px; color: var(--accent-gold); margin: 16px 0 8px 0; border-top: 1px solid var(--border-color); padding-top: 12px;">
          📦 RESOURCES
        </h3>
        <div class="resources-list">
          ${Object.entries(grouped).map(([cat, items]) => `
            <div class="resource-category">
              <span class="resource-cat-name">${resourceCategories[cat]?.name || cat}:</span>
              ${items.map(item => `
                <span class="resource-item" data-resource="${item.id}">
                  ${item.data.icon} ${item.data.name} ×${item.count}
                </span>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  showModal('inventory-modal', `
    <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px;">
      INVENTORY
    </h2>
    <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Click equipped items to unequip. Click inventory items to use/equip.</p>
    <div class="equipment-slots">
      ${equipmentHtml}
    </div>
    <div class="inventory-grid">
      ${inventoryHtml}
    </div>
    ${resourcesHtml}
    <div style="display: flex; justify-content: space-between; margin-top: 16px;">
      <button class="pixel-btn" onclick="hideModal('inventory-modal'); showSellScreen();">💰 Sell Items</button>
      <button class="pixel-btn" onclick="hideModal('inventory-modal')">Close</button>
    </div>
  `);
  
  // Add equipment slot click handlers (for unequipping)
  document.querySelectorAll('.equip-slot.has-item').forEach(slot => {
    slot.style.cursor = 'pointer';
    slot.addEventListener('click', () => {
      const slotName = slot.dataset.slot;
      unequipItem(slotName);
      showInventoryScreen(); // Refresh
    });
  });
  
  // Add item click handlers
  document.querySelectorAll('.inventory-slot[data-item]').forEach(slot => {
    slot.addEventListener('click', () => {
      const itemId = slot.dataset.item;
      useItem(itemId);
      showInventoryScreen(); // Refresh
    });
  });

  // Bind tooltips to inventory items
  if (typeof TooltipSystem !== 'undefined') {
    document.querySelectorAll('.inventory-slot[data-item]').forEach(slot => {
      const itemId = slot.dataset.item;
      TooltipSystem.bindItem(slot, itemId);
    });

    // Bind tooltips to equipped items
    document.querySelectorAll('.equip-slot.has-item').forEach(slot => {
      const slotName = slot.dataset.slot;
      const itemId = GameState.player.equipment[slotName];
      if (itemId) {
        TooltipSystem.bindItem(slot, itemId);
      }
    });

    // Bind tooltips to resource items
    document.querySelectorAll('.resource-item[data-resource]').forEach(el => {
      const itemId = el.dataset.resource;
      TooltipSystem.bindItem(el, itemId);
    });
  }
}

// =====================================================
// Sell Screen
// =====================================================

function showSellScreen() {
  if (!shopManager) {
    showNotification("Shop system not available!", 'error');
    return;
  }

  const sellableItems = shopManager.getSellableItems();
  const playerGold = shopManager.getPlayerGold();

  let itemsHtml = '';
  if (sellableItems.length === 0) {
    itemsHtml = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No items to sell.</p>';
  } else {
    itemsHtml = sellableItems.map(entry => `
      <div class="sell-item" data-item="${entry.itemId}">
        <div class="sell-item-icon">${entry.item.icon || '?'}</div>
        <div class="sell-item-info">
          <div class="sell-item-name">${entry.item.name}</div>
          <div class="sell-item-count">Owned: ${entry.count}</div>
        </div>
        <div class="sell-item-price">
          <span class="price-value">${entry.sellPrice}</span>
          <span class="price-icon">💰</span>
        </div>
        <div class="sell-item-actions">
          <button class="pixel-btn pixel-btn-small" onclick="sellItemFromScreen('${entry.itemId}', 1)">Sell 1</button>
          ${entry.count > 1 ? `<button class="pixel-btn pixel-btn-small" onclick="sellItemFromScreen('${entry.itemId}', ${entry.count})">Sell All</button>` : ''}
        </div>
      </div>
    `).join('');
  }

  // Calculate total value if selling everything
  const totalValue = sellableItems.reduce((sum, entry) => sum + (entry.sellPrice * entry.count), 0);

  showModal('sell-modal', `
    <div class="sell-screen">
      <div class="sell-header">
        <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold);">SELL ITEMS</h2>
        <div class="sell-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-value">${playerGold}</span>
        </div>
      </div>
      <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Items sell for 50% of their value.</p>
      ${sellableItems.length > 0 ? `
        <div style="margin-bottom: 12px; padding: 8px; background: var(--bg-dark); border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-muted);">Sell all items for <span style="color: var(--accent-gold);">${totalValue} gold</span></span>
          <button class="pixel-btn pixel-btn-small" onclick="sellAllItems()">Sell All Items</button>
        </div>
      ` : ''}
      <div class="sell-items-list">
        ${itemsHtml}
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('sell-modal'); showInventoryScreen();">Back</button>
        <button class="pixel-btn" onclick="hideModal('sell-modal')">Close</button>
      </div>
    </div>
  `);

  // Bind tooltips
  if (typeof TooltipSystem !== 'undefined') {
    document.querySelectorAll('.sell-item[data-item]').forEach(el => {
      const itemId = el.dataset.item;
      TooltipSystem.bindItem(el, itemId);
    });
  }
}

function sellItemFromScreen(itemId, quantity) {
  if (!shopManager) return;

  const result = shopManager.sellItem(itemId, quantity);

  if (result.success) {
    showNotification(result.message, 'success');
    renderHUD();
    autoSave();
    // Refresh sell screen
    showSellScreen();
  } else {
    showNotification(result.message, 'error');
  }
}

function sellAllItems() {
  if (!shopManager) return;

  const sellableItems = shopManager.getSellableItems();
  if (sellableItems.length === 0) {
    showNotification("No items to sell!", 'error');
    return;
  }

  let totalGold = 0;
  let itemsSold = 0;

  // Sell each item stack
  for (const entry of sellableItems) {
    const result = shopManager.sellItem(entry.itemId, entry.count);
    if (result.success) {
      totalGold += entry.sellPrice * entry.count;
      itemsSold += entry.count;
    }
  }

  if (itemsSold > 0) {
    showNotification(`Sold ${itemsSold} items for ${totalGold} gold!`, 'success');
    renderHUD();
    autoSave();
    showSellScreen(); // Refresh
  } else {
    showNotification("Failed to sell items!", 'error');
  }
}

// =====================================================
// Gather Screen (Resource Minigames)
// =====================================================

// Zone-based gathering configuration
// Each zone has specific gathering types available at specific tiers
const ZONE_GATHERING_CONFIG = {
  dawnmere: {
    tier: 1,
    name: "Dawnmere",
    gathering: {
      mining: { available: true, tierName: "Copper Vein" },
      woodcutting: { available: true, tierName: "Pine Forest" },
      hunting: { available: true, tierName: "Boar Territory" },
      herbalism: { available: true, tierName: "Meadow" },
      fishing: { available: true, tierName: "River" }
    }
  },
  haari_fields: {
    tier: 2,
    name: "Haari Fields",
    gathering: {
      mining: { available: true, tierName: "Iron Deposit" },
      woodcutting: { available: true, tierName: "Oak Grove" },
      hunting: { available: true, tierName: "Wolf Den" },
      herbalism: { available: true, tierName: "Wild Garden" },
      fishing: { available: true, tierName: "Lake" }
    }
  },
  lurenium: {
    tier: 3,
    name: "Lurenium",
    gathering: {
      mining: { available: true, tierName: "Silver Mine" },
      woodcutting: { available: true, tierName: "Ironwood Stand" },
      hunting: { available: true, tierName: "Bear Grounds" },
      herbalism: { available: true, tierName: "Moonlit Grove" },
      fishing: { available: true, tierName: "Deep Sea" }
    }
  }
};

// Base minigame definitions
const GATHERING_MINIGAMES = [
  { id: 'mining', name: 'Mining', icon: '⛏️', desc: 'Timed Quiz - Answer quickly!', resource: 'ore' },
  { id: 'woodcutting', name: 'Woodcutting', icon: '🪓', desc: 'Streak Challenge - Build combos!', resource: 'wood' },
  { id: 'hunting', name: 'Hunting', icon: '🏹', desc: 'Speed Round - Race the clock!', resource: 'hide' },
  { id: 'herbalism', name: 'Herbalism', icon: '🌿', desc: 'Matching Pairs - Find matches!', resource: 'herb' },
  { id: 'fishing', name: 'Fishing', icon: '🎣', desc: 'Reaction Game - Quick reflexes!', resource: 'fish' }
];

// Check if a gathering skill is unlocked for the current location
function isGatheringUnlocked(skillId, locationId = null) {
  const location = locationId || GameState.currentLocation || 'dawnmere';
  const unlockedGathering = GameState.player.unlockedGathering || {};

  // Handle legacy array format (convert to new format)
  if (Array.isArray(unlockedGathering)) {
    GameState.player.unlockedGathering = { dawnmere: unlockedGathering };
    return location === 'dawnmere' && unlockedGathering.includes(skillId);
  }

  const locationUnlocks = unlockedGathering[location] || [];
  return locationUnlocks.includes(skillId);
}

// Unlock a gathering skill for a specific location (called from quest rewards)
function unlockGatheringSkill(skillId, locationId = null) {
  const location = locationId || GameState.currentLocation || 'dawnmere';

  if (!GameState.player.unlockedGathering) {
    GameState.player.unlockedGathering = {};
  }

  // Handle legacy array format
  if (Array.isArray(GameState.player.unlockedGathering)) {
    const legacy = GameState.player.unlockedGathering;
    GameState.player.unlockedGathering = { dawnmere: legacy };
  }

  if (!GameState.player.unlockedGathering[location]) {
    GameState.player.unlockedGathering[location] = [];
  }

  if (!GameState.player.unlockedGathering[location].includes(skillId)) {
    GameState.player.unlockedGathering[location].push(skillId);
    return true;
  }
  return false;
}

// Get which NPC teaches each gathering skill per location
function getGatheringTeacher(skillId, locationId = null) {
  const location = locationId || GameState.currentLocation || 'dawnmere';

  const teachers = {
    dawnmere: {
      mining: { npc: 'Rega', quest: null },
      woodcutting: { npc: 'Tommen', quest: 'learn_woodcutting' },
      herbalism: { npc: 'Rega', quest: null },
      fishing: { npc: 'Old Jorel', quest: 'learn_fishing' },
      hunting: { npc: 'Bram', quest: 'learn_hunting' }
    },
    haari_fields: {
      mining: { npc: 'Dave', quest: 'haari_mining' },
      woodcutting: { npc: 'Venn', quest: 'haari_woodcutting' },
      herbalism: { npc: 'Lyra', quest: 'secrets_of_the_soil' },
      fishing: { npc: 'Rask', quest: 'haari_fishing' },
      hunting: { npc: 'Rask', quest: 'haari_hunting' }
    },
    lurenium: {
      mining: { npc: 'a miner', quest: null },
      woodcutting: { npc: 'a lumberjack', quest: null },
      herbalism: { npc: 'an herbalist', quest: null },
      fishing: { npc: 'a fisherman', quest: null },
      hunting: { npc: 'a hunter', quest: null }
    }
  };

  const locationTeachers = teachers[location] || teachers.dawnmere;
  return locationTeachers[skillId] || { npc: 'a local expert', quest: null };
}

function showGatherScreen() {
  if (typeof resourceMinigameManager === 'undefined') {
    showNotification("Gathering system not available!", 'error');
    return;
  }

  // Get current location and zone config
  const currentLocation = GameState.currentLocation || 'dawnmere';
  const zoneConfig = ZONE_GATHERING_CONFIG[currentLocation] || ZONE_GATHERING_CONFIG.dawnmere;
  const zoneTier = zoneConfig.tier;

  // Filter minigames based on location availability
  const locationMinigames = GATHERING_MINIGAMES.filter(mg => {
    const gatherConfig = zoneConfig.gathering[mg.id];
    return gatherConfig && gatherConfig.available;
  }).map(mg => {
    const gatherConfig = zoneConfig.gathering[mg.id];
    return {
      ...mg,
      tierName: gatherConfig.tierName,
      tier: zoneTier,
      unlocked: isGatheringUnlocked(mg.id, currentLocation)
    };
  });

  // Tier indicator colors
  const tierColors = { 1: '#cd7f32', 2: '#c0c0c0', 3: '#ffd700' }; // bronze, silver, gold
  const tierLabels = { 1: 'Tier I', 2: 'Tier II', 3: 'Tier III' };

  const minigamesHtml = locationMinigames.map(mg => {
    if (mg.unlocked) {
      // Unlocked - show clickable option
      return `
        <div class="gather-option" onclick="startGatherMinigame('${mg.id}')">
          <div class="gather-icon">${mg.icon}</div>
          <div class="gather-info">
            <div class="gather-name">${mg.name}</div>
            <div class="gather-desc">${mg.desc}</div>
            <div class="gather-tier" style="font-size: 10px; color: ${tierColors[mg.tier]}; margin-top: 2px;">
              ${mg.tierName} (${tierLabels[mg.tier]})
            </div>
          </div>
        </div>
      `;
    } else {
      // Locked - show locked state with hint
      const teacher = getGatheringTeacher(mg.id, currentLocation);
      return `
        <div class="gather-option gather-locked" style="opacity: 0.5; cursor: not-allowed;">
          <div class="gather-icon" style="filter: grayscale(100%);">🔒</div>
          <div class="gather-info">
            <div class="gather-name" style="color: var(--text-muted);">${mg.name}</div>
            <div class="gather-desc" style="color: var(--text-muted); font-style: italic;">
              Talk to ${teacher.npc} to learn this skill here
            </div>
          </div>
        </div>
      `;
    }
  }).join('');

  // Check if any skills are unlocked
  const hasUnlockedSkills = locationMinigames.some(mg => mg.unlocked);

  showModal('gather-modal', `
    <div class="gather-screen">
      <h2 style="font-family: var(--font-display); color: var(--accent-gold); margin-bottom: 8px;">
        ⛏️ GATHER RESOURCES
      </h2>
      <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 4px;">
        Practice French vocabulary while gathering crafting materials!
      </p>
      <p style="color: ${tierColors[zoneTier]}; font-size: 11px; margin-bottom: 16px;">
        Location: ${zoneConfig.name} - ${tierLabels[zoneTier]} Resources
      </p>
      ${!hasUnlockedSkills ? `
        <div style="background: rgba(255,200,100,0.1); border: 1px solid var(--accent-gold); border-radius: 4px; padding: 12px; margin-bottom: 16px;">
          <p style="color: var(--accent-gold); font-size: 12px; margin: 0;">
            💡 <strong>No skills unlocked yet!</strong><br>
            <span style="color: var(--text-muted);">Talk to villagers in Dawnmere to learn gathering skills.</span>
          </p>
        </div>
      ` : ''}
      <div class="gather-options">
        ${minigamesHtml}
      </div>
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('gather-modal')">Close</button>
      </div>
    </div>
  `);
}

function startGatherMinigame(type) {
  hideModal('gather-modal');

  // Map minigame types to their resource types
  const resourceMap = {
    mining: 'ore',
    woodcutting: 'wood',
    hunting: 'hide',
    herbalism: 'herb',
    fishing: 'fish'
  };

  const resourceType = resourceMap[type] || 'ore';

  // Get tier from current location
  const currentLocation = GameState.currentLocation || 'dawnmere';
  const zoneConfig = ZONE_GATHERING_CONFIG[currentLocation] || ZONE_GATHERING_CONFIG.dawnmere;
  const tier = zoneConfig.tier;

  if (typeof resourceMinigameManager !== 'undefined') {
    resourceMinigameManager.startMinigame(type, resourceType, tier);
  } else {
    showNotification("Minigame system not loaded!", 'error');
  }
}

// =====================================================
// Map Screen
// =====================================================

function showMapScreen() {
  if (!locationManager) {
    showNotification("Map system not initialized!", 'error');
    return;
  }

  const currentLocation = locationManager.getCurrentLocation();
  const allStatuses = locationManager.getAllLocationStatuses();

  // Generate location cards
  const locationsHtml = allStatuses.map(status => {
    const loc = status.location;
    const isCurrent = status.isCurrent;
    const isUnlocked = status.unlocked;
    const isDiscovered = status.discovered;
    
    let statusClass = 'location-undiscovered';
    let statusText = '???';
    let canTravel = false;
    
    if (isDiscovered) {
      if (isUnlocked) {
        statusClass = isCurrent ? 'location-current' : 'location-unlocked';
        statusText = isCurrent ? 'You are here' : 'Travel';
        canTravel = !isCurrent;
      } else {
        statusClass = 'location-locked';
        statusText = status.lockedReason || 'Locked';
      }
    }
    
    // Only show discovered locations (or all for testing)
    if (!isDiscovered) {
      return `
        <div class="map-location ${statusClass}">
          <div class="map-location-icon">❓</div>
          <div class="map-location-info">
            <div class="map-location-name">Undiscovered</div>
            <div class="map-location-status">Explore to discover</div>
          </div>
        </div>
      `;
    }
    
    // Check for boss exam
    const hasExam = loc.hasBossExam;
    const examHistory = hasExam && GameState.player.examHistory?.[loc.id];
    const examPassed = examHistory?.passed;

    return `
      <div class="map-location ${statusClass}" data-location="${loc.id}">
        <div class="map-location-icon" style="background: ${loc.color};">${loc.icon}</div>
        <div class="map-location-info">
          <div class="map-location-name">${loc.name}</div>
          <div class="map-location-desc">${loc.description}</div>
          <div class="map-location-level">Level ${loc.levelRequired}+</div>
          ${hasExam && isCurrent ? `
            <div class="map-location-exam" style="margin-top: 4px; font-size: 12px;">
              📜 Boss Exam: ${examPassed ? '<span style="color: var(--accent-green);">Passed</span>' : '<span style="color: var(--accent-gold);">Available</span>'}
            </div>
          ` : ''}
        </div>
        <div class="map-location-action">
          ${canTravel
            ? `<button class="pixel-btn pixel-btn-gold" onclick="travelToLocation('${loc.id}')">Travel</button>`
            : isCurrent && hasExam
              ? `<button class="pixel-btn" onclick="hideModal('map-modal'); showExamInfo('${loc.id}')">Take Exam</button>`
              : `<span class="map-location-status">${statusText}</span>`
          }
        </div>
      </div>
    `;
  }).join('');
  
  showModal('map-modal', `
    <div class="map-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 8px;">
        🗺️ WORLD MAP
      </h2>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
        Current Location: <span style="color: var(--accent-gold);">${currentLocation.name}</span>
      </p>

      <div class="map-locations">
        ${locationsHtml}
      </div>

      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('map-modal')">Close</button>
      </div>
    </div>
  `);

  // Show tutorial on first map view
  showTutorialTip('mapTravel', '.map-locations', () => {});
}

function travelToLocation(locationId, fastTravel = false) {
  if (!locationManager) return;

  const result = locationManager.travelTo(locationId, fastTravel);

  if (result.success) {
    hideModal('map-modal');

    // Immediate travel - no encounters
    showNotification(result.message, 'success');
    checkTravelObjectives(locationId);
    renderLocation();
    renderQuestPanel();
    autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

function checkTravelObjectives(locationId) {
  if (!questSystem) return;

  const activeQuests = questSystem.getActiveQuests();
  for (const quest of activeQuests) {
    for (const obj of quest.objectives) {
      if (obj.type === 'travel' && obj.target === locationId && !obj.completed) {
        updateQuestProgress(quest.id, obj.id, 1);
      }
    }
  }
}

// =====================================================
// Titles Screen
// =====================================================

function showTitlesScreen() {
  if (!titleManager) {
    showNotification("Title system not initialized!", 'error');
    return;
  }
  
  const earnedTitles = titleManager.getEarnedTitles();
  const equippedTitleId = titleManager.getEquippedTitleId();
  const allTitles = titleManager.getAllTitlesWithInfo();
  
  // Separate earned and locked titles
  const earnedHtml = earnedTitles.length > 0 
    ? earnedTitles.map(title => {
        const isEquipped = title.id === equippedTitleId;
        return `
          <div class="title-item ${isEquipped ? 'equipped' : ''}" data-title="${title.id}">
            <div class="title-name" style="color: ${title.color};">${title.name}</div>
            <div class="title-desc">${title.description}</div>
            <div class="title-action">
              ${isEquipped 
                ? `<button class="pixel-btn" onclick="unequipTitle()">Unequip</button>`
                : `<button class="pixel-btn pixel-btn-gold" onclick="equipTitleById('${title.id}')">Equip</button>`
              }
            </div>
          </div>
        `;
      }).join('')
    : '<p style="color: var(--text-muted);">No titles earned yet. Complete milestones and achievements to earn titles!</p>';
  
  // Show locked titles as preview
  const lockedTitles = allTitles.filter(t => !t.earned);
  const lockedHtml = lockedTitles.length > 0
    ? lockedTitles.slice(0, 5).map(title => `
        <div class="title-item locked">
          <div class="title-name" style="color: var(--text-muted);">🔒 ${title.name}</div>
          <div class="title-desc">${title.description}</div>
        </div>
      `).join('') + (lockedTitles.length > 5 ? `<p style="color: var(--text-muted);">...and ${lockedTitles.length - 5} more to discover</p>` : '')
    : '';
  
  const currentTitle = titleManager.getEquippedTitle();
  const currentDisplay = currentTitle 
    ? `<span style="color: ${currentTitle.color};">${currentTitle.name}</span>` 
    : '<span style="color: var(--text-muted);">None</span>';
  
  showModal('titles-modal', `
    <div class="titles-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 8px;">
        🏆 TITLES
      </h2>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
        Current Title: ${currentDisplay}
      </p>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
        Earned: ${earnedTitles.length} / ${allTitles.length}
      </p>
      
      <div class="titles-section">
        <h3 style="font-family: var(--font-display); font-size: 10px; color: var(--accent-gold); margin-bottom: 8px;">EARNED TITLES</h3>
        <div class="titles-list">
          ${earnedHtml}
        </div>
      </div>
      
      ${lockedHtml ? `
        <div class="titles-section" style="margin-top: 16px;">
          <h3 style="font-family: var(--font-display); font-size: 10px; color: var(--text-muted); margin-bottom: 8px;">LOCKED TITLES</h3>
          <div class="titles-list">
            ${lockedHtml}
          </div>
        </div>
      ` : ''}
      
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('titles-modal')">Close</button>
      </div>
    </div>
  `);
}

function equipTitleById(titleId) {
  if (!titleManager) return;
  
  const result = titleManager.equipTitle(titleId);
  
  if (result.success) {
    showNotification(result.message, 'success');
    showTitlesScreen(); // Refresh
    renderHUD(); // Update display name if shown
    autoSave();
  } else {
    showNotification(result.message, 'error');
  }
}

function unequipTitle() {
  if (!titleManager) return;
  
  const result = titleManager.unequipTitle();
  
  if (result.success) {
    showNotification(result.message, 'info');
    showTitlesScreen(); // Refresh
    renderHUD();
    autoSave();
  }
}

// =====================================================
// Cosmetics Screen
// =====================================================

let cosmeticsTab = 'frames';

function showCosmeticsScreen() {
  if (!cosmeticManager) {
    showNotification("Cosmetic system not available!", 'error');
    return;
  }

  cosmeticManager.ensureStructure();
  renderCosmeticsScreen();
}

function renderCosmeticsScreen() {
  const categories = ['frames', 'backgrounds', 'accents', 'badges'];
  const categoryLabels = {
    frames: 'Frames',
    backgrounds: 'Backgrounds',
    accents: 'Accents',
    badges: 'Badges'
  };

  // Build tabs
  const tabsHtml = categories.map(cat => `
    <button class="cosmetic-tab ${cosmeticsTab === cat ? 'active' : ''}"
            onclick="switchCosmeticsTab('${cat}')">
      ${categoryLabels[cat]}
    </button>
  `).join('');

  // Get cosmetics for current tab
  const allCosmetics = cosmeticManager.getCosmeticsForCategory(cosmeticsTab);
  const unlockedIds = cosmeticManager.getUnlocked(cosmeticsTab);
  const equipped = cosmeticManager.getEquipped(cosmeticsTab);

  // Build cosmetics grid
  let cosmeticsHtml = '';
  if (allCosmetics.length === 0) {
    cosmeticsHtml = '<div class="cosmetics-empty">No cosmetics in this category yet.</div>';
  } else {
    cosmeticsHtml = '<div class="cosmetics-grid">';
    allCosmetics.forEach(cosmetic => {
      const isUnlocked = unlockedIds.includes(cosmetic.id);
      const isEquipped = cosmeticsTab === 'badges'
        ? (equipped || []).includes(cosmetic.id)
        : equipped === cosmetic.id;
      const rarityColor = cosmeticManager.getRarityColor(cosmetic.rarity);

      cosmeticsHtml += `
        <div class="cosmetic-item ${isUnlocked ? 'unlocked' : 'locked'} ${isEquipped ? 'equipped' : ''}"
             onclick="${isUnlocked ? `toggleCosmetic('${cosmetic.id}')` : ''}"
             style="--rarity-color: ${rarityColor}">
          <div class="cosmetic-preview">${cosmetic.preview || '?'}</div>
          <div class="cosmetic-name">${isUnlocked ? cosmetic.name : '???'}</div>
          <div class="cosmetic-rarity" style="color: ${rarityColor};">${cosmetic.rarity}</div>
          ${isEquipped ? '<div class="cosmetic-equipped-badge">✓</div>' : ''}
          ${!isUnlocked ? '<div class="cosmetic-lock">🔒</div>' : ''}
        </div>
      `;
    });
    cosmeticsHtml += '</div>';
  }

  // Progress for this category
  const progress = cosmeticManager.getCategoryProgress(cosmeticsTab);
  const totalProgress = cosmeticManager.getTotalProgress();

  showModal('cosmetics-modal', `
    <div class="cosmetics-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 8px;">
        ✨ COSMETICS
      </h2>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
        Collection: ${totalProgress.unlocked}/${totalProgress.total} (${totalProgress.percent}%)
      </p>

      <div class="cosmetics-tabs">
        ${tabsHtml}
      </div>

      <div class="cosmetics-progress">
        <span>${categoryLabels[cosmeticsTab]}: ${progress.unlocked}/${progress.total}</span>
        <div class="progress-bar-mini">
          <div class="progress-fill" style="width: ${progress.percent}%;"></div>
        </div>
      </div>

      <div class="cosmetics-content">
        ${cosmeticsHtml}
      </div>

      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('cosmetics-modal')">Close</button>
      </div>
    </div>
  `);
}

function switchCosmeticsTab(tab) {
  cosmeticsTab = tab;
  renderCosmeticsScreen();
}

function toggleCosmetic(cosmeticId) {
  if (!cosmeticManager) return;

  const cosmetic = cosmeticManager.getCosmetic(cosmeticId);
  if (!cosmetic) return;

  if (cosmetic.category === 'badges') {
    // Toggle badge equip/unequip
    const equipped = cosmeticManager.getEquipped('badges') || [];
    if (equipped.includes(cosmeticId)) {
      const result = cosmeticManager.unequipBadge(cosmeticId);
      showNotification(result.message, result.success ? 'info' : 'error');
    } else {
      const result = cosmeticManager.equipBadge(cosmeticId);
      showNotification(result.message, result.success ? 'success' : 'error');
    }
  } else {
    // Equip frame/background/accent
    const result = cosmeticManager.equip(cosmeticId);
    showNotification(result.message, result.success ? 'success' : 'error');
  }

  renderCosmeticsScreen();
  autoSave();
}

// =====================================================
// Village Projects Screen
// =====================================================

function showVillageProjectsScreen(preserveScroll = false) {
  if (!villageProjectsManager) {
    showNotification("Village projects not available yet!", 'error');
    return;
  }

  // Preserve scroll position if refreshing
  let scrollTop = 0;
  if (preserveScroll) {
    const existingBody = document.querySelector('.vp-body');
    if (existingBody) {
      scrollTop = existingBody.scrollTop;
    }
  }

  const locationId = GameState.currentLocation;
  const projects = villageProjectsManager.getProjectsForLocation(locationId);
  const turnins = RESOURCE_TURNINS[locationId];

  // Build projects list
  let projectsHtml = '';
  if (projects.length === 0) {
    projectsHtml = '<div class="vp-empty">No projects available in this location.</div>';
  } else {
    projects.forEach(project => {
      const status = villageProjectsManager.getProjectStatus(project.id);
      const progress = villageProjectsManager.getProjectProgress(project.id);

      let statusClass = '';
      let statusIcon = '';
      if (status === ProjectStatus.COMPLETED) {
        statusClass = 'completed';
        statusIcon = '✅';
      } else if (status === ProjectStatus.LOCKED) {
        statusClass = 'locked';
        statusIcon = '🔒';
      } else {
        statusClass = 'available';
        statusIcon = '🔨';
      }

      // Build requirements list
      let requirementsHtml = '';
      if (status !== ProjectStatus.COMPLETED) {
        requirementsHtml = '<div class="vp-requirements">';
        progress.requirements.forEach(req => {
          const playerCount = villageProjectsManager.getPlayerItemCount(req.item);
          const isComplete = req.contributed >= req.required;
          requirementsHtml += `
            <div class="vp-requirement ${isComplete ? 'complete' : ''}">
              <span class="vp-req-label">${req.label}</span>
              <span class="vp-req-progress">${req.contributed}/${req.required}</span>
              ${!isComplete && playerCount > 0 ? `
                <button class="pixel-btn pixel-btn-small vp-contribute-btn"
                  data-project="${project.id}"
                  data-item="${req.item}"
                  data-max="${Math.min(playerCount, req.required - req.contributed)}">
                  + (${playerCount})
                </button>
              ` : ''}
            </div>
          `;
        });
        requirementsHtml += '</div>';
      }

      projectsHtml += `
        <div class="vp-project ${statusClass}">
          <div class="vp-project-header">
            <span class="vp-project-icon">${project.icon}</span>
            <span class="vp-project-name">${project.name}</span>
            <span class="vp-project-status">${statusIcon}</span>
          </div>
          <div class="vp-project-desc">${project.description}</div>
          ${status !== ProjectStatus.COMPLETED ? `
            <div class="vp-progress-bar">
              <div class="vp-progress-fill" style="width: ${progress.percentage}%"></div>
              <span class="vp-progress-text">${progress.percentage}%</span>
            </div>
          ` : `
            <div class="vp-completion-text">${project.completionText}</div>
          `}
          ${requirementsHtml}
        </div>
      `;
    });
  }

  // Build turn-ins section
  let turninsHtml = '';
  if (turnins && turnins.turnins.length > 0) {
    turninsHtml = `
      <div class="vp-turnins-section">
        <h3 class="vp-section-title">📦 Resource Contributions</h3>
        <p class="vp-section-desc">${turnins.description}</p>
        <div class="vp-turnins-list">
    `;

    turnins.turnins.forEach(turnin => {
      const count = villageProjectsManager.state.player.villageProjects?.turnins?.[turnin.id] || 0;
      const remaining = turnin.maxTurnins - count;
      const playerAmount = villageProjectsManager.getPlayerItemCount(turnin.resource);
      const canTurnIn = remaining > 0 && playerAmount >= turnin.amountPer;

      turninsHtml += `
        <div class="vp-turnin ${remaining <= 0 ? 'maxed' : ''}">
          <div class="vp-turnin-header">
            <span class="vp-turnin-icon">${turnin.icon}</span>
            <span class="vp-turnin-name">${turnin.resourceName}</span>
            <span class="vp-turnin-npc">→ ${turnin.npcName}</span>
          </div>
          <div class="vp-turnin-info">
            <span class="vp-turnin-rate">${turnin.amountPer}x for +${turnin.reputationPer} rep</span>
            <span class="vp-turnin-progress">${count}/${turnin.maxTurnins} done</span>
          </div>
          ${remaining > 0 ? `
            <div class="vp-turnin-flavor">"${turnin.flavor}"</div>
            ${canTurnIn ? `
              <button class="pixel-btn pixel-btn-small vp-turnin-btn"
                data-turnin="${turnin.id}"
                data-location="${locationId}">
                Turn In (have ${playerAmount})
              </button>
            ` : `
              <span class="vp-turnin-need">Need ${turnin.amountPer} ${turnin.resourceName}</span>
            `}
          ` : `
            <div class="vp-turnin-maxed">Maximum contributions reached!</div>
          `}
        </div>
      `;
    });

    turninsHtml += '</div></div>';
  }

  const locationName = GAME_DATA.locations[locationId]?.name || locationId;

  const content = `
    <div class="village-projects-container">
      <div class="vp-header">
        <h2 class="vp-title">🏘️ ${locationName} Projects</h2>
      </div>
      <div class="vp-body">
        <div class="vp-projects-section">
          <h3 class="vp-section-title">🔨 Building Projects</h3>
          ${projectsHtml}
        </div>
        ${turninsHtml}
      </div>
      <div class="vp-footer">
        <button class="pixel-btn" onclick="hideModal('village-projects-modal')">Close</button>
      </div>
    </div>
  `;

  showModal('village-projects-modal', content);

  // Restore scroll position after refresh
  if (preserveScroll && scrollTop > 0) {
    const newBody = document.querySelector('.vp-body');
    if (newBody) {
      newBody.scrollTop = scrollTop;
    }
  }

  // Show tutorial on first village projects view
  showTutorialTip('villageProjects', '.vp-content', () => {});

  // Bind contribution buttons
  document.querySelectorAll('.vp-contribute-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.dataset.project;
      const itemId = btn.dataset.item;
      const maxAmount = parseInt(btn.dataset.max);

      // Contribute max by default, or hold shift for 1 at a time
      const amount = event.shiftKey ? 1 : maxAmount;
      const result = villageProjectsManager.contribute(projectId, itemId, amount);

      if (result.success) {
        showNotification(result.message, 'success');

        // Check quest objectives for contributing to projects
        checkContributeObjectives(projectId, itemId, amount);

        renderHUD(); // Update gold display
        showVillageProjectsScreen(true); // Refresh, preserve scroll
        autoSave();
      } else {
        showNotification(result.message, 'error');
      }
    });
  });

  // Bind turn-in buttons
  document.querySelectorAll('.vp-turnin-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const turninId = btn.dataset.turnin;
      const result = villageProjectsManager.performTurnin(turninId);

      if (result.success) {
        showNotification(`${result.npc}: "${result.message}" (+${result.reputation} rep)`, 'success');
        showVillageProjectsScreen(true); // Refresh, preserve scroll
      } else {
        showNotification(result.message, 'error');
      }
    });
  });
}

// =====================================================
// Settings Screen
// =====================================================

function showSettingsScreen() {
  renderSettingsScreen();
}

function setSettingsTab(tab) {
  GameState.settingsTab = tab;
  renderSettingsScreen();
}

function renderSettingsScreen() {
  const settings = GameState.settings;
  const currentTab = GameState.settingsTab || 'audio';
  
  const tabsHtml = `
    <div class="settings-tabs">
      <button class="settings-tab ${currentTab === 'audio' ? 'active' : ''}" onclick="setSettingsTab('audio')">🔊 Audio</button>
      <button class="settings-tab ${currentTab === 'display' ? 'active' : ''}" onclick="setSettingsTab('display')">🖥️ Display</button>
      <button class="settings-tab ${currentTab === 'gameplay' ? 'active' : ''}" onclick="setSettingsTab('gameplay')">🎮 Gameplay</button>
      <button class="settings-tab ${currentTab === 'learning' ? 'active' : ''}" onclick="setSettingsTab('learning')">📚 Learning</button>
      <button class="settings-tab ${currentTab === 'access' ? 'active' : ''}" onclick="setSettingsTab('access')">♿ Access</button>
      <button class="settings-tab ${currentTab === 'data' ? 'active' : ''}" onclick="setSettingsTab('data')">💾 Data</button>
    </div>
  `;
  
  let contentHtml = '';
  
  switch (currentTab) {
    case 'audio':
      contentHtml = renderAudioSettings(settings);
      break;
    case 'display':
      contentHtml = renderDisplaySettings(settings);
      break;
    case 'gameplay':
      contentHtml = renderGameplaySettings(settings);
      break;
    case 'learning':
      contentHtml = renderLearningSettings(settings);
      break;
    case 'access':
      contentHtml = renderAccessibilitySettings(settings);
      break;
    case 'data':
      contentHtml = renderDataSettings();
      break;
  }
  
  showModal('settings-modal', `
    <div class="settings-screen">
      <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px; text-align: center;">
        ⚙️ SETTINGS
      </h2>
      ${tabsHtml}
      <div class="settings-content">
        ${contentHtml}
      </div>
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('settings-modal')">Close</button>
      </div>
    </div>
  `);
}

function renderAudioSettings(settings) {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">Master Volume</label>
        <div class="setting-control">
          <input type="range" min="0" max="100" value="${settings.masterVolume}" 
                 class="setting-slider" onchange="updateSetting('masterVolume', this.value)">
          <span class="setting-value">${settings.masterVolume}%</span>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Music Volume</label>
        <div class="setting-control">
          <input type="range" min="0" max="100" value="${settings.musicVolume}" 
                 class="setting-slider" onchange="updateSetting('musicVolume', this.value)">
          <span class="setting-value">${settings.musicVolume}%</span>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Sound Effects</label>
        <div class="setting-control">
          <input type="range" min="0" max="100" value="${settings.sfxVolume}" 
                 class="setting-slider" onchange="updateSetting('sfxVolume', this.value)">
          <span class="setting-value">${settings.sfxVolume}%</span>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Mute All</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.muteAll ? 'active' : ''}" 
                  onclick="toggleSetting('muteAll')">
            ${settings.muteAll ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderDisplaySettings(settings) {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">Text Speed</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.textSpeed === 'slow' ? 'active' : ''}" 
                    onclick="updateSetting('textSpeed', 'slow')">Slow</button>
            <button class="setting-option ${settings.textSpeed === 'normal' ? 'active' : ''}" 
                    onclick="updateSetting('textSpeed', 'normal')">Normal</button>
            <button class="setting-option ${settings.textSpeed === 'fast' ? 'active' : ''}" 
                    onclick="updateSetting('textSpeed', 'fast')">Fast</button>
          </div>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Font Size</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.fontSize === 'small' ? 'active' : ''}" 
                    onclick="updateSetting('fontSize', 'small')">Small</button>
            <button class="setting-option ${settings.fontSize === 'medium' ? 'active' : ''}" 
                    onclick="updateSetting('fontSize', 'medium')">Medium</button>
            <button class="setting-option ${settings.fontSize === 'large' ? 'active' : ''}" 
                    onclick="updateSetting('fontSize', 'large')">Large</button>
          </div>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Screen Shake</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.screenShake ? 'active' : ''}" 
                  onclick="toggleSetting('screenShake')">
            ${settings.screenShake ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Animations</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.animations ? 'active' : ''}"
                  onclick="toggleSetting('animations')">
            ${settings.animations ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div class="setting-item">
        <label class="setting-label">UI Theme</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.uiTheme === 'art' ? 'active' : ''}"
                    onclick="updateSetting('uiTheme', 'art')">Paper Art</button>
            <button class="setting-option ${settings.uiTheme === 'pixel' ? 'active' : ''}"
                    onclick="updateSetting('uiTheme', 'pixel')">Pixel</button>
          </div>
        </div>
        <div class="setting-desc">Switch between visual styles</div>
      </div>
    </div>
  `;
}

function renderGameplaySettings(settings) {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">Auto-Show Hints</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.hintAutoShow ? 'active' : ''}" 
                  onclick="toggleSetting('hintAutoShow')">
            ${settings.hintAutoShow ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Automatically show hints at start of each question</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Confirm Actions</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.confirmActions ? 'active' : ''}" 
                  onclick="toggleSetting('confirmActions')">
            ${settings.confirmActions ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Ask for confirmation before accepting/abandoning quests</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Auto-Save</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.autoSave ? 'active' : ''}" 
                  onclick="toggleSetting('autoSave')">
            ${settings.autoSave ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Automatically save progress after quests and lessons</div>
      </div>
    </div>
  `;
}

function renderLearningSettings(settings) {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">Questions Per Lesson</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.questionCount === 1 ? 'active' : ''}"
                    onclick="updateSetting('questionCount', 1)">1</button>
            <button class="setting-option ${settings.questionCount === 3 ? 'active' : ''}"
                    onclick="updateSetting('questionCount', 3)">3</button>
            <button class="setting-option ${settings.questionCount === 5 ? 'active' : ''}"
                    onclick="updateSetting('questionCount', 5)">5</button>
            <button class="setting-option ${settings.questionCount === 8 ? 'active' : ''}"
                    onclick="updateSetting('questionCount', 8)">8</button>
            <button class="setting-option ${settings.questionCount === 10 ? 'active' : ''}"
                    onclick="updateSetting('questionCount', 10)">10</button>
          </div>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Hints</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.showHints === 'always' ? 'active' : ''}" 
                    onclick="updateSetting('showHints', 'always')">Always</button>
            <button class="setting-option ${settings.showHints === 'request' ? 'active' : ''}" 
                    onclick="updateSetting('showHints', 'request')">On Request</button>
            <button class="setting-option ${settings.showHints === 'never' ? 'active' : ''}" 
                    onclick="updateSetting('showHints', 'never')">Never</button>
          </div>
        </div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Review Reminders</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.reviewReminders ? 'active' : ''}" 
                  onclick="toggleSetting('reviewReminders')">
            ${settings.reviewReminders ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Notify when vocabulary reviews are due</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Keyboard Shortcuts</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.keyboardShortcuts ? 'active' : ''}" 
                  onclick="toggleSetting('keyboardShortcuts')">
            ${settings.keyboardShortcuts ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Use 1-4 keys to select answers</div>
      </div>
    </div>
  `;
}

function renderAccessibilitySettings(settings) {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">High Contrast</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.highContrast ? 'active' : ''}" 
                  onclick="toggleSetting('highContrast')">
            ${settings.highContrast ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Increase contrast for better visibility</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Dyslexia-Friendly Font</label>
        <div class="setting-control">
          <button class="setting-toggle ${settings.dyslexiaFont ? 'active' : ''}" 
                  onclick="toggleSetting('dyslexiaFont')">
            ${settings.dyslexiaFont ? 'ON' : 'OFF'}
          </button>
        </div>
        <div class="setting-desc">Use OpenDyslexic font (requires font to be loaded)</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Color Blind Mode</label>
        <div class="setting-control">
          <div class="setting-options">
            <button class="setting-option ${settings.colorBlindMode === 'off' ? 'active' : ''}" 
                    onclick="updateSetting('colorBlindMode', 'off')">Off</button>
            <button class="setting-option ${settings.colorBlindMode === 'deuteranopia' ? 'active' : ''}" 
                    onclick="updateSetting('colorBlindMode', 'deuteranopia')">Deut.</button>
            <button class="setting-option ${settings.colorBlindMode === 'protanopia' ? 'active' : ''}" 
                    onclick="updateSetting('colorBlindMode', 'protanopia')">Prot.</button>
            <button class="setting-option ${settings.colorBlindMode === 'tritanopia' ? 'active' : ''}" 
                    onclick="updateSetting('colorBlindMode', 'tritanopia')">Trit.</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDataSettings() {
  return `
    <div class="settings-section">
      <div class="setting-item">
        <label class="setting-label">Export Save File</label>
        <div class="setting-control">
          <button class="pixel-btn" onclick="exportSaveFile()">
            📤 Export
          </button>
        </div>
        <div class="setting-desc">Download your save data as a file</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Import Save File</label>
        <div class="setting-control">
          <input type="file" id="import-save-input" accept=".json" style="display: none;" onchange="importSaveFile(this)">
          <button class="pixel-btn" onclick="document.getElementById('import-save-input').click()">
            📥 Import
          </button>
        </div>
        <div class="setting-desc">Load a previously exported save file</div>
      </div>
      
      <div class="setting-item" style="margin-top: 24px; border-top: 2px solid var(--border-pixel); padding-top: 16px;">
        <label class="setting-label" style="color: var(--accent-red);">⚠️ Danger Zone</label>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Reset Progress</label>
        <div class="setting-control">
          <button class="pixel-btn pixel-btn-red" onclick="confirmResetProgress()">
            🔄 Reset
          </button>
        </div>
        <div class="setting-desc">Start over from the beginning (cannot be undone)</div>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Delete All Data</label>
        <div class="setting-control">
          <button class="pixel-btn pixel-btn-red" onclick="confirmDeleteAllData()">
            🗑️ Delete
          </button>
        </div>
        <div class="setting-desc">Remove all saved data from this browser</div>
      </div>
    </div>
  `;
}

// Settings helper functions
function updateSetting(key, value) {
  // Convert numeric values
  if (key === 'masterVolume' || key === 'musicVolume' || key === 'sfxVolume' || key === 'questionCount') {
    value = parseInt(value);
  }
  
  GameState.settings[key] = value;
  saveSettings();
  renderSettingsScreen();
  
  // Apply certain settings immediately
  applySettings();
}

function toggleSetting(key) {
  GameState.settings[key] = !GameState.settings[key];
  saveSettings();
  renderSettingsScreen();
  applySettings();
}

function saveSettings() {
  try {
    localStorage.setItem('bytequest_settings', JSON.stringify(GameState.settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('bytequest_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      GameState.settings = { ...GameState.settings, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
    // Use defaults if settings are corrupted
  }
}

function applySettings() {
  const settings = GameState.settings;
  
  // Apply font size
  const root = document.documentElement;
  switch (settings.fontSize) {
    case 'small':
      root.style.setProperty('--font-size-base', '14px');
      break;
    case 'large':
      root.style.setProperty('--font-size-base', '20px');
      break;
    default:
      root.style.setProperty('--font-size-base', '18px');
  }
  
  // Apply high contrast
  if (settings.highContrast) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
  
  // Apply dyslexia font
  if (settings.dyslexiaFont) {
    document.body.classList.add('dyslexia-font');
  } else {
    document.body.classList.remove('dyslexia-font');
  }
  
  // Apply color blind mode
  document.body.classList.remove('colorblind-deuteranopia', 'colorblind-protanopia', 'colorblind-tritanopia');
  if (settings.colorBlindMode !== 'off') {
    document.body.classList.add(`colorblind-${settings.colorBlindMode}`);
  }
  
  // Apply animations setting
  if (!settings.animations) {
    document.body.classList.add('reduce-motion');
  } else {
    document.body.classList.remove('reduce-motion');
  }

  // Apply UI theme
  if (settings.uiTheme === 'pixel') {
    document.body.classList.add('theme-pixel');
  } else {
    document.body.classList.remove('theme-pixel');
  }

  // Apply audio settings
  if (typeof AudioManager !== 'undefined') {
    AudioManager.applySettings(settings);
  }
}

// Data management functions
function exportSaveFile() {
  const saveData = localStorage.getItem('bytequest_save');
  if (!saveData) {
    showNotification('No save data to export!', 'error');
    return;
  }
  
  const blob = new Blob([saveData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bytequest_save_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Save file exported!', 'success');
}

function importSaveFile(input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validate it looks like a save file
      if (!data.player || !data.player.name) {
        throw new Error('Invalid save file format');
      }
      
      localStorage.setItem('bytequest_save', JSON.stringify(data));
      showNotification('Save file imported! Reloading...', 'success');
      
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (err) {
      showNotification('Failed to import save file: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

function confirmResetProgress() {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
    if (confirm('Really? All your progress will be lost forever!')) {
      localStorage.removeItem('bytequest_save');
      showNotification('Progress reset. Reloading...', 'info');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }
}

function confirmDeleteAllData() {
  if (confirm('Are you sure you want to delete ALL data? This includes saves and settings!')) {
    if (confirm('This is your last chance. Delete everything?')) {
      localStorage.removeItem('bytequest_save');
      localStorage.removeItem('bytequest_settings');
      showNotification('All data deleted. Reloading...', 'info');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }
}

// =====================================================
// Cutscene System
// =====================================================

const CutsceneManager = {
  isPlaying: false,
  currentCutscene: null,
  currentSlide: 0,
  onComplete: null,

  // Play a cutscene by ID or with custom data
  play(cutsceneIdOrData, onComplete = null) {
    const cutscene = typeof cutsceneIdOrData === 'string'
      ? CUTSCENES[cutsceneIdOrData]
      : cutsceneIdOrData;

    if (!cutscene) {
      console.warn('Cutscene not found:', cutsceneIdOrData);
      if (onComplete) onComplete();
      return;
    }

    this.isPlaying = true;
    this.currentCutscene = cutscene;
    this.currentSlide = 0;
    this.onComplete = onComplete;

    this.render();
    this.bindEvents();
  },

  render() {
    const slide = this.currentCutscene.slides[this.currentSlide];
    if (!slide) {
      this.end();
      return;
    }

    const totalSlides = this.currentCutscene.slides.length;
    const isLastSlide = this.currentSlide === totalSlides - 1;

    // Character portrait (if specified)
    let portraitHtml = '';
    if (slide.speaker) {
      const npc = typeof getNPC === 'function' ? getNPC(slide.speaker) : null;
      const speakerName = npc?.name || slide.speaker;
      const speakerIcon = slide.icon || npc?.icon || '👤';

      portraitHtml = `
        <div class="cs-portrait">
          <div class="cs-portrait-icon">${speakerIcon}</div>
          <div class="cs-portrait-name">${speakerName}</div>
        </div>
      `;
    }

    // Scene description (if any)
    let sceneHtml = '';
    if (slide.scene) {
      sceneHtml = `<div class="cs-scene">${slide.scene}</div>`;
    }

    const html = `
      <div class="cutscene-overlay" id="cutscene-overlay">
        <div class="cs-container">
          ${this.currentCutscene.title ? `<div class="cs-title">${this.currentCutscene.title}</div>` : ''}

          <div class="cs-content">
            ${portraitHtml}
            <div class="cs-dialogue-box">
              ${sceneHtml}
              <div class="cs-text">${slide.text}</div>
            </div>
          </div>

          <div class="cs-controls">
            <div class="cs-progress">${this.currentSlide + 1} / ${totalSlides}</div>
            <div class="cs-buttons">
              <button class="cs-skip-btn" id="cs-skip">Skip</button>
              <button class="cs-continue-btn" id="cs-continue">
                ${isLastSlide ? 'Finish' : 'Continue'} ▶
              </button>
            </div>
          </div>
        </div>
        <div class="cs-hint">Click or press Space to continue</div>
      </div>
    `;

    // Remove existing overlay if any
    const existing = document.getElementById('cutscene-overlay');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', html);

    // Animate text in
    const textEl = document.querySelector('.cs-text');
    if (textEl) {
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        textEl.style.transition = 'all 0.4s ease';
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
      }, 50);
    }
  },

  bindEvents() {
    const overlay = document.getElementById('cutscene-overlay');
    if (!overlay) return;

    const continueBtn = document.getElementById('cs-continue');
    const skipBtn = document.getElementById('cs-skip');

    const advance = (e) => {
      e?.stopPropagation();
      this.nextSlide();
    };

    const skip = (e) => {
      e?.stopPropagation();
      this.end();
    };

    continueBtn?.addEventListener('click', advance);
    skipBtn?.addEventListener('click', skip);
    overlay.addEventListener('click', advance);

    // Keyboard support
    this.keyHandler = (e) => {
      if (!this.isPlaying) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.end();
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  },

  nextSlide() {
    this.currentSlide++;
    if (this.currentSlide >= this.currentCutscene.slides.length) {
      this.end();
    } else {
      this.render();
      this.bindEvents();
    }
  },

  end() {
    this.isPlaying = false;
    const overlay = document.getElementById('cutscene-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    }

    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }

    // Mark cutscene as viewed
    if (this.currentCutscene?.id) {
      if (!GameState.viewedCutscenes) GameState.viewedCutscenes = [];
      if (!GameState.viewedCutscenes.includes(this.currentCutscene.id)) {
        GameState.viewedCutscenes.push(this.currentCutscene.id);
      }
    }

    if (this.onComplete) {
      this.onComplete();
      this.onComplete = null;
    }

    this.currentCutscene = null;
    this.currentSlide = 0;
  },

  // Check if a cutscene has been viewed
  hasViewed(cutsceneId) {
    return GameState.viewedCutscenes?.includes(cutsceneId) || false;
  }
};

// Cutscene definitions
const CUTSCENES = {
  // Opening cutscene when starting a new game
  intro_dawnmere: {
    id: 'intro_dawnmere',
    title: 'Welcome to Dawnmere',
    slides: [
      {
        scene: 'The morning mist rises from the river...',
        text: 'You arrive at Dawnmere, a small settlement on the trade routes. The wooden buildings are simple but sturdy, built by folk who know hard winters.'
      },
      {
        scene: 'Villagers go about their morning routines...',
        text: 'This far from the great cities, people speak the old tongue freely. To survive here, you will need to learn their ways—and their words.'
      },
      {
        speaker: 'urma',
        icon: '👵',
        text: 'Ah, a new face! We don\'t get many travelers these days. Come, let me introduce you to our little family here in Dawnmere.'
      }
    ]
  },

  // After completing first quest
  first_quest_complete: {
    id: 'first_quest_complete',
    slides: [
      {
        scene: 'You\'ve taken your first steps...',
        text: 'The villagers nod approvingly as you complete your first task. Perhaps this outsider will fit in after all.'
      },
      {
        speaker: 'urma',
        icon: '👵',
        text: 'You learn quickly! There is much more to discover here. Speak with the others—Rega knows the land, and the Merchant has seen much of the world.'
      }
    ]
  },

  // Discovering something mysterious
  river_mystery: {
    id: 'river_mystery',
    slides: [
      {
        scene: 'By the riverbank at dusk...',
        text: 'Strange lights flicker beneath the water\'s surface. The locals avoid this stretch of river after dark.'
      },
      {
        speaker: 'yris',
        icon: '🌊',
        text: 'You see them too? Most pretend they don\'t. The river remembers things... things from before Dawnmere existed.'
      },
      {
        text: 'Something stirs in the depths. Whatever secrets this land holds, they run deeper than the river itself.'
      }
    ]
  },

  // Leaving for Haari Fields
  departure_haari: {
    id: 'departure_haari',
    slides: [
      {
        scene: 'At the edge of Dawnmere...',
        text: 'The road stretches north toward golden fields. Beyond them, the spires of Lurenium catch the morning light.'
      },
      {
        speaker: 'merchant',
        icon: '🧳',
        text: 'Ready? The Haari Fields are a day\'s journey. Stick close—the roads aren\'t as safe as they once were.'
      },
      {
        text: 'With one last look at Dawnmere, you set off toward new horizons. This is just the beginning of your journey.'
      }
    ]
  }
};

// Helper function to trigger cutscenes from quests
function triggerCutscene(cutsceneId, onComplete) {
  if (CutsceneManager.hasViewed(cutsceneId)) {
    if (onComplete) onComplete();
    return;
  }
  CutsceneManager.play(cutsceneId, onComplete);
}

// Get difficulty settings for gameplay
// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
