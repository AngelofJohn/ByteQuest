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
    // Spellbook
    spellbook: {
      unlockedPages: ["pronouns"],
      lastViewed: null
    },
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
    screenShake: true,
    animations: true,
    // Gameplay
    hintAutoShow: false,
    confirmActions: true,
    autoSave: true,
    // Learning
    // TODO: Change back to 5 for launch (currently 3 for testing)
    questionCount: 3, // 3, 5, 8, 10
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
      gainedReputation: false // Gained reputation for first time
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

// =====================================================
// Save/Load System
// =====================================================

function saveGame() {
  const saveData = {
    player: GameState.player,
    currentLocation: GameState.currentLocation,
    tutorial: GameState.tutorial,
    timestamp: Date.now()
  };
  localStorage.setItem('bytequest_save', JSON.stringify(saveData));
  showNotification("Game Saved!");
}

// Auto-save respects settings - use this for automatic saves
function autoSave() {
  if (GameState.settings?.autoSave !== false) {
    const saveData = {
      player: GameState.player,
      currentLocation: GameState.currentLocation,
      tutorial: GameState.tutorial,
      timestamp: Date.now()
    };
    localStorage.setItem('bytequest_save', JSON.stringify(saveData));
    // Silent save - no notification for auto-saves
  }
}

function loadGame() {
  const saveData = localStorage.getItem('bytequest_save');
  if (saveData) {
    const data = JSON.parse(saveData);
    GameState.player = { ...GameState.player, ...data.player };
    GameState.currentLocation = data.currentLocation;
    // Load tutorial state if it exists
    if (data.tutorial) {
      GameState.tutorial = { ...GameState.tutorial, ...data.tutorial };
    }
    return true;
  }
  return false;
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

function renderLocation() {
  // Try to use locationManager first, fallback to GAME_DATA
  let location;
  if (locationManager) {
    location = locationManager.getCurrentLocation();
  } else {
    location = GAME_DATA.locations[GameState.currentLocation];
  }
  
  if (!location) {
    console.warn('No location found');
    return;
  }
  
  const locName = document.querySelector('.location-name');
  const locDesc = document.querySelector('.location-desc');
  if (locName) locName.textContent = location.name;
  if (locDesc) locDesc.textContent = location.description;
  
  // Render NPCs in scene
  renderNPCs(location);
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
  
  // Filter to only visible NPCs
  let visibleIndex = 0;
  location.npcs.forEach((npcId) => {
    const npc = getNPC ? getNPC(npcId) : GAME_DATA.npcs[npcId];
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
    
    // Add quest marker if NPC has available quest
    if (hasAvailableQuest(npcId)) {
      const marker = document.createElement('div');
      marker.className = 'quest-marker';
      marker.textContent = '❗';
      sprite.appendChild(marker);
    } else if (hasActiveQuest(npcId)) {
      const marker = document.createElement('div');
      marker.className = 'quest-marker';
      marker.textContent = '❓';
      sprite.appendChild(marker);
    }
    
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
  const statusInfo = getQuestStatusInfo(status);
  
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
  renderQuestPanel();
  renderNPCs(GAME_DATA.locations[GameState.currentLocation]);
}

function updateQuestProgress(questId, objectiveId, increment = 1) {
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
  checkQuestCompletion(questId);
  renderQuestPanel();
}

function checkQuestCompletion(questId) {
  const quest = GameState.player.activeQuests.find(q => q.id === questId);
  if (!quest) return;
  
  const allComplete = quest.objectives.every(o => o.completed);
  if (allComplete) {
    completeQuest(questId);
  }
}

function completeQuest(questId) {
  const questData = getQuest(questId);
  const questIndex = GameState.player.activeQuests.findIndex(q => q.id === questId);

  if (questIndex === -1) return;

  // Tutorial: First quest complete
  if (shouldShowTutorial('completedQuest')) {
    markTutorialComplete('completedQuest');
  }

  // Remove from active
  GameState.player.activeQuests.splice(questIndex, 1);

  // Add to completed
  GameState.player.completedQuests.push(questId);
  
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
      });
    }
    
    // Spellbook pages
    if (questData.rewards.spellbookUnlock && typeof unlockSpellbookPages === 'function') {
      unlockSpellbookPages(questData.rewards.spellbookUnlock);
      rewardData.spellbookPages = questData.rewards.spellbookUnlock;
    }
  }
  
  // Show rewards screen
  showRewardsScreen(rewardData);
  
  // Unlock next quests
  unlockDependentQuests(questId);
  
  // Re-render NPCs (visibility may have changed)
  renderNPCs(GAME_DATA.locations[GameState.currentLocation]);
  
  renderHUD();
  renderQuestPanel();
  autoSave();
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

function levelUpSilent() {
  GameState.player.xp -= GameState.player.xpToNext;
  GameState.player.level++;
  
  const nextLevel = GAME_DATA.levelTable.find(l => l.level === GameState.player.level + 1);
  GameState.player.xpToNext = nextLevel ? nextLevel.xpRequired : Math.floor(GameState.player.xpToNext * 1.5);
  
  // Stat increase from statsManager
  if (statsManager) {
    statsManager.handleLevelUp(GameState.player.level);
  }
  
  recalculateStats();
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
}

// =====================================================
// Rewards Screen
// =====================================================

function showRewardsScreen(rewardData) {
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
    spellbookHtml = `
      <div class="rewards-section">
        <div class="rewards-section-title">📖 SPELLBOOK UPDATED</div>
        <div class="rewards-spellbook">
          ${rewardData.spellbookPages.map(p => `<span class="spellbook-page-unlock">${p}</span>`).join(', ')}
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
      </div>
      
      <div class="rewards-footer">
        <button class="pixel-btn pixel-btn-gold" onclick="hideModal('rewards-modal')">Continue</button>
      </div>
    </div>
  `);

  // Bind tooltips to reward items after modal renders
  setTimeout(() => {
    const modal = document.getElementById('rewards-modal');
    if (modal && typeof TooltipSystem !== 'undefined') {
      TooltipSystem.bindAllInContainer(modal);
    }
  }, 0);
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
    GameState.player.maxHp += 10;
  }
  
  // Restore HP on level up
  GameState.player.hp = GameState.player.maxHp;
  
  // Show notification
  if (statResult) {
    showNotification(`Level Up! You are now level ${GameState.player.level}! +1 ${statResult.statName}`, 'success');
  } else {
    showNotification(`Level Up! You are now level ${GameState.player.level}!`, 'success');
  }
  
  // Check for new achievements
  checkAchievements();
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
        <div>
          <button class="pixel-btn pixel-btn-gold" onclick="restAtInn()" style="width: 100%;">
            🏨 Rest at Inn (50 Gold)
          </button>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            Full HP restored instantly. Premium option.
          </div>
        </div>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: var(--text-muted);">
        Current Gold: <span style="color: var(--accent-gold);">${GameState.player.gold}</span>
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
  
  // Build review session
  const reviewWords = srManager.buildReviewSession(8);
  
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

function restAtInn() {
  if (GameState.player.gold >= 50) {
    GameState.player.gold -= 50;
    GameState.player.hp = GameState.player.maxHp;
    hideModal('death-modal');
    renderHUD();
    showNotification("You feel fully rested!", 'success');
    autoSave();
  } else {
    showNotification("Not enough gold! You need 50 gold.", 'error');
  }
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
    const baseHp = 100 + (GameState.player.level - 1) * 10;
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
  const npc = GAME_DATA.npcs[npcId];
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
  
  // Check for available quest from this NPC
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
  // Check for active quest with this NPC
  else if (hasActiveQuest(npcId)) {
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
        
        options.push({
          text: "Goodbye",
          action: hideDialog
        });
      }
    }
  }
  // Check if NPC has shop
  else if (npc.shop) {
    options.push({
      text: "Browse Wares",
      action: () => openShop(npcId)
    });
    options.push({
      text: "Goodbye",
      action: hideDialog
    });
  }
  else {
    // Random idle dialog
    const idle = npc.dialogue.idle;
    if (idle && idle.length > 0) {
      dialogText = idle[Math.floor(Math.random() * idle.length)];
    }
    options.push({
      text: "Goodbye",
      action: hideDialog
    });
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
    showNotification(`🏆 Achievement: ${result.achievement.name}!`, 'success');
    
    // Show reward notifications
    for (const reward of result.rewards) {
      if (reward.type === 'stat') {
        setTimeout(() => {
          showNotification(`+${reward.amount} ${reward.statName}`, 'info');
        }, 500);
      }
      if (reward.type === 'title') {
        setTimeout(() => {
          showNotification(`Title Unlocked: ${reward.title}`, 'info');
        }, 500);
      }
    }
  }
  
  return newlyUnlocked;
}

function checkMilestones() {
  if (!statsManager) return [];
  
  const allProgress = statsManager.getAllMilestoneProgress();
  const claimable = allProgress.filter(p => p.hasUnclaimedReward);
  
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
  
  // Gather vocabulary for this quest
  const vocabCategories = quest.vocabulary || [];
  let allVocab = [];
  
  console.log('Starting lesson for quest:', questId, 'with vocabulary categories:', vocabCategories);
  
  vocabCategories.forEach(cat => {
    const [category, subcategory] = cat.split('.');
    const vocab = VOCABULARY[category]?.[subcategory] || [];
    console.log(`Vocabulary category ${cat}: found ${vocab.length} words`);
    allVocab = allVocab.concat(vocab);
  });
  
  // Check if we have enough vocabulary
  if (allVocab.length < 4) {
    console.error('Not enough vocabulary for lesson. Found:', allVocab.length, 'words');
    showNotification(`Error: Not enough vocabulary for this lesson (found ${allVocab.length}, need at least 4)`, 'error');
    return;
  }
  
  // Generate questions based on settings
  const questionCount = GameState.settings?.questionCount || 5;
  const questions = generateQuestionsFromVocab(allVocab, questionCount, vocabCategories);
  
  console.log('Generated', questions.length, 'questions');
  
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
    isBossExam: false
  };

  // Tutorial: First lesson
  if (shouldShowTutorial('startedLesson')) {
    markTutorialComplete('startedLesson');
    hideTutorialTip();
  }

  showLessonModal();
}

function generateQuestionsFromVocab(vocab, count, categories = []) {
  const questions = [];
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);

  // Determine how many sentence reorder questions to include (~20% of total)
  const reorderCount = Math.max(1, Math.floor(count * 0.2));
  const vocabCount = count - reorderCount;

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

    for (let i = 0; i < reorderCount; i++) {
      const reorderQ = generateReorderQuestion(reorderCategory);
      questions.push(reorderQ);
    }
  }

  // Shuffle all questions so reorder questions are mixed in
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
  
  console.log('Generated', questions.length, 'grammar questions');
  
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
  
  showLessonModal();
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
  } else {
    // Standard multiple choice answers
    const answersHtml = question.options.map(opt =>
      `<button class="answer-btn" data-answer="${opt}">${opt}</button>`
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

// Sentence Reorder Question State
let reorderState = {
  selectedWords: [],
  availableWords: [],
  correctOrder: []
};

function renderSentenceReorderQuestion(question) {
  // Initialize reorder state
  reorderState = {
    selectedWords: [],
    availableWords: [...question.shuffledWords],
    correctOrder: question.correctOrder
  };

  const answersContainer = document.querySelector('.answer-options');

  // Build the reorder UI
  answersContainer.innerHTML = `
    <div class="reorder-container">
      <div class="reorder-selected" id="reorder-selected">
        <span class="reorder-placeholder">Click words to build the sentence...</span>
      </div>
      <div class="reorder-available" id="reorder-available">
        ${reorderState.availableWords.map((word, idx) =>
          `<button class="reorder-word-btn" data-word="${word}" data-index="${idx}">${word}</button>`
        ).join('')}
      </div>
      <div class="reorder-actions">
        <button class="pixel-btn reorder-clear-btn" onclick="clearReorderSelection()">Clear</button>
        <button class="pixel-btn reorder-submit-btn" onclick="submitReorderAnswer()">Submit</button>
      </div>
    </div>
  `;

  // Add click handlers for word buttons
  document.querySelectorAll('.reorder-word-btn').forEach(btn => {
    btn.addEventListener('click', () => selectReorderWord(btn));
  });

  // Add click handlers for selected words (to remove them)
  updateReorderDisplay();
}

function selectReorderWord(btn) {
  const word = btn.dataset.word;
  const index = parseInt(btn.dataset.index);

  // Add to selected words
  reorderState.selectedWords.push({ word, originalIndex: index });

  // Remove from available
  btn.classList.add('used');
  btn.disabled = true;

  updateReorderDisplay();
}

function removeReorderWord(selectedIndex) {
  // Get the word being removed
  const removed = reorderState.selectedWords.splice(selectedIndex, 1)[0];

  // Re-enable the original button
  const btn = document.querySelector(`.reorder-word-btn[data-index="${removed.originalIndex}"]`);
  if (btn) {
    btn.classList.remove('used');
    btn.disabled = false;
  }

  updateReorderDisplay();
}

function updateReorderDisplay() {
  const selectedContainer = document.getElementById('reorder-selected');

  if (reorderState.selectedWords.length === 0) {
    selectedContainer.innerHTML = '<span class="reorder-placeholder">Click words to build the sentence...</span>';
  } else {
    selectedContainer.innerHTML = reorderState.selectedWords.map((item, idx) =>
      `<span class="reorder-selected-word" onclick="removeReorderWord(${idx})">${item.word}</span>`
    ).join('');
  }
}

function clearReorderSelection() {
  // Reset all buttons
  document.querySelectorAll('.reorder-word-btn').forEach(btn => {
    btn.classList.remove('used');
    btn.disabled = false;
  });

  // Clear selected words
  reorderState.selectedWords = [];
  updateReorderDisplay();
}

function submitReorderAnswer() {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];

  // Build the answer from selected words
  const userAnswer = reorderState.selectedWords.map(item => item.word);
  const userAnswerStr = userAnswer.join(' ');

  // Check if all words were used
  if (userAnswer.length !== reorderState.correctOrder.length) {
    showNotification('Use all the words!', 'warning');
    return;
  }

  // Check if correct
  const isCorrect = userAnswer.every((word, idx) => word === reorderState.correctOrder[idx]);

  // Use the standard answer handler with the constructed answer
  handleAnswer(userAnswerStr, isCorrect);
}

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
  const chargesDisplay = `<span class="hint-charges">${hintManager.lessonCharges}/${hintManager.maxCharges} 💡</span>`;
  
  if (status.available) {
    // Hint available - show button to reveal
    hintBox.innerHTML = `
      ${chargesDisplay}
      <button class="hint-reveal-btn" onclick="revealHint()">
        Reveal Hint (costs 1 charge)
      </button>
    `;
    hintBox.className = 'hint-box hint-available';
  } else if (!status.unlocked) {
    // Hint locked for this word
    hintBox.innerHTML = `
      ${chargesDisplay}
      <span class="hint-locked">🔒 Hint locked</span>
      <span class="hint-progress">${progress.current}/${progress.required} correct to unlock</span>
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
    let feedbackMsg = `✗ Wrong! The answer was: <strong>${question.correctAnswer}</strong>`;
    
    if (streakProtected) {
      feedbackMsg = `✗ Wrong! <span class="streak-protected">💨 Agility saved your streak!</span> The answer was: <strong>${question.correctAnswer}</strong>`;
    } else if (hadStreak) {
      animateStreakBreak();
      feedbackMsg = `✗ Wrong! Streak lost! The answer was: <strong>${question.correctAnswer}</strong>`;
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
  
  // Move to next question after delay
  setTimeout(() => {
    state.currentQuestion++;
    
    if (state.currentQuestion >= state.questions.length) {
      completeLessonSession();
    } else {
      renderQuestion();
    }
  }, 1500);
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
    if (successRate === 1) {
      GameState.player.perfectLessons++;
    }
    
    // Show results
    showNotification(`Review Complete! ${Math.floor(successRate * 100)}%`, 'success');
    setTimeout(() => {
      showNotification(`💚 Restored ${hpRecovery} HP`, 'success');
    }, 500);
    
    // Check achievements
    checkAchievements();
    
    renderHUD();
    autoSave();
    
    // Reset lesson state
    resetLessonState();
    return;
  }
  
  // Regular lesson completion
  const passThreshold = 0.6; // 60% to pass
  const passed = successRate >= passThreshold;
  
  if (passed) {
    // Update quest progress
    updateQuestProgress(state.questId, state.objectiveId);
    
    // Calculate base XP
    const baseXP = 25 + Math.floor(successRate * 50);
    
    // Calculate average multiplier earned (simplified: use final streak's worth)
    const bestMultiplier = getMultiplierForStreak(state.correctAnswers);
    const bonusXP = Math.floor(baseXP * (bestMultiplier - 1));
    const totalXP = baseXP + bonusXP;
    
    // Award XP
    addXP(totalXP);
    
    // Update player lesson stats
    GameState.player.lessonsCompleted++;
    
    // Track perfect lesson
    if (successRate === 1) {
      GameState.player.perfectLessons++;
    }
    
    // Show completion message
    if (bonusXP > 0) {
      showNotification(`Lesson Complete! ${Math.floor(successRate * 100)}%`, 'success');
      setTimeout(() => {
        showNotification(`🔥 Streak Bonus: +${bonusXP} XP!`, 'success');
      }, 500);
    } else {
      showNotification(`Lesson Complete! ${Math.floor(successRate * 100)}% correct`, 'success');
    }
    
    // Check for hidden quest triggers
    checkHiddenQuestTriggers();

    // Check achievements
    checkAchievements();

    // Award linguistic essence based on performance
    if (typeof alchemyManager !== 'undefined' && alchemyManager) {
      if (successRate === 1) {
        // Perfect: 3 faded + 1 clear
        alchemyManager.addEssence('faded', 3);
        alchemyManager.addEssence('clear', 1);
      } else if (successRate >= 0.8) {
        // Good: 2 faded
        alchemyManager.addEssence('faded', 2);
      } else {
        // Passed: 1 faded
        alchemyManager.addEssence('faded', 1);
      }
    }

  } else {
    const thresholdPercent = Math.floor(difficultySettings.passThreshold * 100);
    showNotification(`Need ${thresholdPercent}% to pass. You got ${Math.floor(successRate * 100)}%. Try again!`, 'error');
  }
  
  // Reset lesson state
  resetLessonState();
  
  // Save progress
  autoSave();
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
      gap: 8px;
      z-index: 3000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    padding: 12px 24px;
    background: ${type === 'success' ? 'var(--accent-green)' : type === 'error' ? 'var(--accent-red)' : 'var(--bg-light)'};
    border: 3px solid var(--border-pixel);
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-light);
    animation: slideUp 0.3s ease;
    pointer-events: auto;
  `;
  notification.textContent = message;
  container.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
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
    title: 'Learning Time!',
    content: 'Lessons teach you French vocabulary. Answer questions to earn XP and complete quest objectives.',
    position: 'bottom'
  },
  wrongAnswer: {
    icon: '❤️',
    title: 'Watch Your Health!',
    content: 'Wrong answers cost HP. If you run out, you\'ll need to rest at an inn or review words to recover.',
    position: 'top'
  },
  questComplete: {
    icon: '🎉',
    title: 'Quest Complete!',
    content: 'You earned XP, gold, and reputation. Keep completing quests to level up and unlock new areas!',
    position: 'bottom'
  }
};

function showTutorialTip(tipId, targetSelector, onComplete) {
  // Skip if tutorials disabled or already completed
  if (GameState.tutorial.skipAll) return;

  const tip = TutorialTips[tipId];
  if (!tip) return;

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

function renderShopScreen(shopId) {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;
  
  const inventory = shopManager.getShopInventory(shopId);
  const playerGold = shopManager.getPlayerGold();
  
  let inventoryHtml = '';
  
  // Calculate discount from Luck stat
  let discount = 0;
  if (typeof statsManager !== 'undefined' && statsManager) {
    discount = statsManager.calculateShopDiscount();
  }

  if (inventory.length === 0) {
    inventoryHtml = '<p style="color: var(--text-muted); text-align: center;">No items available.</p>';
  } else {
    inventoryHtml = inventory.map(entry => {
      const item = entry.item;
      const discountedPrice = Math.floor(entry.price * (1 - discount));
      const canAfford = playerGold >= discountedPrice;
      const rarityInfo = ItemRarityInfo[item.rarity] || { color: '#ffffff', name: 'Common' };
      const hasDiscount = discount > 0;

      return `
        <div class="shop-item ${canAfford ? '' : 'cannot-afford'}">
          <div class="shop-item-icon">${item.icon || '❓'}</div>
          <div class="shop-item-info">
            <div class="shop-item-name" style="color: ${rarityInfo.color};">${item.name}</div>
            <div class="shop-item-desc">${item.description || ''}</div>
          </div>
          <div class="shop-item-price">
            ${hasDiscount ? `<span class="price-original" style="text-decoration: line-through; color: var(--text-muted); font-size: 10px;">${entry.price}</span> ` : ''}
            <span class="price-value">${discountedPrice}</span>
            <span class="price-icon">💰</span>
          </div>
          <button class="pixel-btn shop-buy-btn"
                  onclick="buyFromShop('${shopId}', '${entry.itemId}')"
                  ${canAfford ? '' : 'disabled'}>
            Buy
          </button>
        </div>
      `;
    }).join('');
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
      
      <div class="shop-inventory">
        ${inventoryHtml}
      </div>
      
      <div class="shop-footer">
        <button class="pixel-btn" onclick="closeShopScreen()">Close</button>
      </div>
    </div>
  `);
}

function buyFromShop(shopId, itemId) {
  if (!shopManager) return;
  
  const result = shopManager.purchaseItem(shopId, itemId, 1);
  
  if (result.success) {
    showNotification(`Purchased: ${result.item.name}`, 'success');
    
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
      const canAfford = playerGold >= entry.price;
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

      return `
        <div class="upgrade-item ${statusClass} ${canAfford && isPurchasable ? '' : 'cannot-afford'}">
          <div class="upgrade-info">
            <div class="upgrade-name">${upgrade.name}${stackInfo}</div>
            <div class="upgrade-desc">${upgrade.description}</div>
            ${statusText ? `<div class="upgrade-status">${statusText}</div>` : ''}
          </div>
          <div class="upgrade-price">
            <span class="price-value">${entry.price}</span>
            <span class="price-icon">💰</span>
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
  const classIcons = { scholar: '📚', warrior: '⚔️', traveler: '🗺️' };
  const classIcon = classIcons[player.class] || '👤';
  
  showModal('profile-modal', `
    <div class="profile-screen">
      <div class="profile-header">
        <div class="profile-avatar">${classIcon}</div>
        <div class="profile-identity">
          <div class="profile-name">${player.name}</div>
          <div class="profile-title">${activeTitle || player.class?.charAt(0).toUpperCase() + player.class?.slice(1) || 'Adventurer'}</div>
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
}

function renderMilestonesTab() {
  if (!statsManager) return '<p>Stats system not initialized.</p>';
  
  const milestones = statsManager.getAllMilestoneProgress();
  
  return milestones.map(progress => {
    const milestone = progress.milestone;
    const currentTier = progress.currentTier;
    const nextTier = progress.nextTier;
    
    // Calculate progress bar
    let progressPercent = 0;
    let progressText = '';
    
    if (progress.isMaxed) {
      progressPercent = 100;
      progressText = 'MAXED';
    } else if (nextTier) {
      progressPercent = Math.min(100, (progress.currentValue / nextTier.threshold) * 100);
      progressText = `${progress.currentValue} / ${nextTier.threshold}`;
    }
    
    const claimable = progress.hasUnclaimedReward;
    
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
  
  if (rewards && rewards.length > 0) {
    rewards.forEach(reward => {
      if (reward.type === 'stat') {
        showNotification(`+${reward.amount} ${reward.statName}!`, 'success');
      }
      if (reward.type === 'title') {
        showNotification(`Title Unlocked: ${reward.title}!`, 'success');
      }
    });
    
    // Refresh the screen
    renderProgressScreen();
    autoSave();
  }
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
    }
  }
  
  return result;
}

// =====================================================
// Character Creation
// =====================================================

function showCharacterCreation() {
  document.getElementById('title-screen').style.display = 'none';
  
  const classOptions = Object.values(GAME_DATA.classes).map(cls => `
    <div class="class-card" data-class="${cls.id}">
      <div class="class-icon">${cls.icon || '🗡️'}</div>
      <div class="class-name">${cls.name}</div>
      <div class="class-desc">${cls.description}</div>
      <div class="class-flavor">${cls.flavor || ''}</div>
      <div class="class-stats">
        <span class="stat-hp">❤️ ${cls.startingStats.maxHp} HP</span>
        <span class="stat-atk">⚔️ ${cls.startingStats.attack} ATK</span>
      </div>
      <div class="class-bonus">✨ ${cls.bonusDesc || cls.bonus}</div>
    </div>
  `).join('');
  
  showModal('character-creation', `
    <h2 style="font-family: var(--font-display); font-size: 16px; color: var(--accent-gold); margin-bottom: 24px; text-align: center;">
      Create Your Character
    </h2>
    <div style="margin-bottom: 24px; text-align: center;">
      <label style="display: block; font-family: var(--font-display); font-size: 10px; margin-bottom: 8px;">Your Name</label>
      <input type="text" class="name-input" id="player-name-input" placeholder="Enter name..." maxlength="20">
    </div>
    <label style="display: block; font-family: var(--font-display); font-size: 10px; margin-bottom: 8px; text-align: center;">Choose Your Path</label>
    <div class="class-options">
      ${classOptions}
    </div>
    <div style="text-align: center; margin-top: 24px;">
      <button class="pixel-btn pixel-btn-gold" id="start-adventure-btn" disabled>
        Begin Adventure
      </button>
    </div>
  `);
  
  // Add class selection handlers
  let selectedClass = null;
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedClass = card.dataset.class;
      checkCanStart();
    });
  });
  
  const nameInput = document.getElementById('player-name-input');
  nameInput.addEventListener('input', checkCanStart);
  
  function checkCanStart() {
    const name = nameInput.value.trim();
    const btn = document.getElementById('start-adventure-btn');
    btn.disabled = !name || !selectedClass;
  }
  
  document.getElementById('start-adventure-btn').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name && selectedClass) {
      hideModal('character-creation');
      showLanguageSelection(name, selectedClass);
    }
  });
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
      <button class="pixel-btn pixel-btn-gold" id="confirm-language-btn" disabled>
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

  GameState.player.name = name;
  GameState.player.class = classId;
  GameState.player.language = language;
  GameState.player.createdAt = Date.now();
  
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

  renderHUD();
  renderLocation();
  renderQuestPanel();

  // Only show intro dialog for new games (intro not yet completed)
  if (shouldShowTutorial('intro')) {
    setTimeout(() => {
      showDialog('Narrator',
        `You arrive at the small settlement of Dawnmere, a frontier town built along the trade routes of the river. The people here seek opportunity and a fresh start, far from the politics of the great cities. Perhaps you will find what you seek here as well...`,
        [{
          text: "Begin exploring",
          action: () => {
            hideDialog();
            markTutorialComplete('intro');
            // Show first tutorial tip after a brief delay
            if (shouldShowTutorial('clickedNpc')) {
              setTimeout(() => {
                showTutorialTip('clickNpc', '.npc-sprite', () => {
                  // Highlight stays until they click an NPC
                });
              }, 800);
            }
          }
        }]
      );
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

  // Initialize Spellbook Manager
  if (typeof SpellbookManager !== 'undefined') {
    spellbookManager = new SpellbookManager(GameState);
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
      renderNPCs(GAME_DATA.locations[GameState.currentLocation]);
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
      renderNPCs(GAME_DATA.locations[GameState.currentLocation]);
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
      openAlchemy();
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
  let filterHtml = `
    <div class="quest-filters">
      <button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
      <button class="filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active</button>
      <button class="filter-btn ${filter === 'available' ? 'active' : ''}" data-filter="available">New</button>
      <button class="filter-btn ${filter === 'daily' ? 'active' : ''}" data-filter="daily">Daily</button>
      <button class="filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Done</button>
    </div>
  `;

  let questsHtml = '';

  // Filter logic
  const showActive = filter === 'all' || filter === 'active';
  const showAvailable = filter === 'all' || filter === 'available';
  const showCompleted = filter === 'completed';
  const showDaily = filter === 'daily';

  // Active quests
  if (showActive && activeQuests.length > 0) {
    questsHtml += '<div class="quest-section"><h3 class="quest-section-header">⚔️ ACTIVE</h3>';
    activeQuests.forEach(quest => {
      questsHtml += renderQuestItem(quest, QuestStatus.ACTIVE);
    });
    questsHtml += '</div>';
  }

  // Available quests
  if (showAvailable && availableQuests.length > 0) {
    questsHtml += '<div class="quest-section"><h3 class="quest-section-header">❗ AVAILABLE</h3>';
    availableQuests.forEach(quest => {
      questsHtml += renderQuestItem(quest, QuestStatus.AVAILABLE);
    });
    questsHtml += '</div>';
  }

  // Daily quests
  if (showDaily) {
    const dailyQuests = [...activeQuests, ...availableQuests].filter(q =>
      q.type === QuestType.DAILY || q.type === QuestType.WEEKLY
    );
    if (dailyQuests.length > 0) {
      questsHtml += '<div class="quest-section"><h3 class="quest-section-header">📅 DAILY & WEEKLY</h3>';
      dailyQuests.forEach(quest => {
        questsHtml += renderQuestItem(quest, quest.status || QuestStatus.AVAILABLE);
      });
      questsHtml += '</div>';
    } else {
      questsHtml += '<div class="quest-section"><p class="no-quests">No daily or weekly quests available</p></div>';
    }
  }

  // Completed quests
  if (showCompleted && completedQuests.length > 0) {
    questsHtml += '<div class="quest-section"><h3 class="quest-section-header">✅ COMPLETED</h3>';
    completedQuests.slice(0, 10).forEach(quest => {
      questsHtml += renderQuestItem(quest, QuestStatus.COMPLETED);
    });
    questsHtml += '</div>';
  }

  // No quests message
  if (!questsHtml) {
    questsHtml = '<div class="quest-section"><p class="no-quests">No quests to display</p></div>';
  }

  const content = `
    <div class="screen-content quests-screen">
      <h2 class="screen-title">📜 Quest Log</h2>
      ${filterHtml}
      <div class="quests-list">
        ${questsHtml}
      </div>
      <div style="text-align: right; margin-top: 16px;">
        <button class="pixel-btn" onclick="hideModal('quests-modal')">Close</button>
      </div>
    </div>
  `;

  showModal('quests-modal', content);

  // Add filter button handlers
  document.querySelectorAll('.quest-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      GameState.questFilter = btn.dataset.filter;
      showQuestsScreen();
    });
  });

  // Add quest click handlers
  document.querySelectorAll('.quest-item').forEach(item => {
    item.addEventListener('click', () => {
      const questId = item.dataset.questId;
      toggleQuestDetails(questId);
    });
  });
}

function showInventoryScreen() {
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

  let inventoryHtml = '';
  for (let i = 0; i < 24; i++) {
    const item = inventory[i];
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
    <div style="text-align: right; margin-top: 16px;">
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
// Gather Screen (Resource Minigames)
// =====================================================

function showGatherScreen() {
  if (typeof resourceMinigameManager === 'undefined') {
    showNotification("Gathering system not available!", 'error');
    return;
  }

  const minigameTypes = [
    { id: 'mining', name: 'Mining', icon: '⛏️', desc: 'Timed Quiz - Answer quickly!', resource: 'ore' },
    { id: 'woodcutting', name: 'Woodcutting', icon: '🪓', desc: 'Streak Challenge - Build combos!', resource: 'wood' },
    { id: 'hunting', name: 'Hunting', icon: '🏹', desc: 'Speed Round - Race the clock!', resource: 'hide' },
    { id: 'herbalism', name: 'Herbalism', icon: '🌿', desc: 'Matching Pairs - Find matches!', resource: 'herb' },
    { id: 'fishing', name: 'Fishing', icon: '🎣', desc: 'Reaction Game - Quick reflexes!', resource: 'fish' },
    { id: 'scramble', name: 'Word Scramble', icon: '🔤', desc: 'Unscramble letters to spell words', resource: 'knowledge' },
    { id: 'memory', name: 'Memory Cards', icon: '🃏', desc: 'Match French/English pairs', resource: 'knowledge' },
    { id: 'hangman', name: 'Hangman', icon: '📝', desc: 'Guess the word letter by letter', resource: 'knowledge' }
  ];

  const minigamesHtml = minigameTypes.map(mg => `
    <div class="gather-option" onclick="startGatherMinigame('${mg.id}')">
      <div class="gather-icon">${mg.icon}</div>
      <div class="gather-info">
        <div class="gather-name">${mg.name}</div>
        <div class="gather-desc">${mg.desc}</div>
      </div>
    </div>
  `).join('');

  showModal('gather-modal', `
    <div class="gather-screen">
      <h2 style="font-family: var(--font-display); color: var(--accent-gold); margin-bottom: 8px;">
        ⛏️ GATHER RESOURCES
      </h2>
      <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 16px;">
        Practice French vocabulary while gathering crafting materials!
      </p>
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
    fishing: 'fish',
    scramble: 'ore',  // Word games use mining vocab by default
    memory: 'herb',   // Memory uses herbalism vocab
    hangman: 'wood'   // Hangman uses woodcutting vocab
  };

  const resourceType = resourceMap[type] || 'ore';
  const tier = 1; // Start with tier 1

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
    
    return `
      <div class="map-location ${statusClass}" data-location="${loc.id}">
        <div class="map-location-icon" style="background: ${loc.color};">${loc.icon}</div>
        <div class="map-location-info">
          <div class="map-location-name">${loc.name}</div>
          <div class="map-location-desc">${loc.description}</div>
          <div class="map-location-level">Level ${loc.levelRequired}+</div>
        </div>
        <div class="map-location-action">
          ${canTravel 
            ? `<button class="pixel-btn pixel-btn-gold" onclick="travelToLocation('${loc.id}')">Travel</button>`
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
}

function travelToLocation(locationId) {
  if (!locationManager) return;
  
  const result = locationManager.travelTo(locationId);
  
  if (result.success) {
    hideModal('map-modal');
    showNotification(result.message, 'success');
    
    // Update game view for new location
    renderLocation();
    renderQuestPanel();
    autoSave();
  } else {
    showNotification(result.message, 'error');
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
      <div class="settings-note" style="color: var(--text-muted); font-size: 12px; margin-bottom: 16px; font-style: italic;">
        🔇 Audio not yet implemented - settings saved for future use
      </div>
      
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
  const saveExists = localStorage.getItem('bytequest_save') !== null;
  
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
  localStorage.setItem('bytequest_settings', JSON.stringify(GameState.settings));
}

function loadSettings() {
  const saved = localStorage.getItem('bytequest_settings');
  if (saved) {
    const parsed = JSON.parse(saved);
    GameState.settings = { ...GameState.settings, ...parsed };
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

// Get difficulty settings for gameplay
// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
