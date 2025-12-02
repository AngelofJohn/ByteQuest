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
    totalBonusGold: 0
  },

  // Settings
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    textSpeed: "normal"
  }
};

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

// =====================================================
// Save/Load System
// =====================================================

function saveGame() {
  const saveData = {
    player: GameState.player,
    currentLocation: GameState.currentLocation,
    timestamp: Date.now()
  };
  localStorage.setItem('bytequest_save', JSON.stringify(saveData));
  showNotification("Game Saved!");
}

function loadGame() {
  const saveData = localStorage.getItem('bytequest_save');
  if (saveData) {
    const data = JSON.parse(saveData);
    GameState.player = { ...GameState.player, ...data.player };
    GameState.currentLocation = data.currentLocation;
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
  document.querySelector('.player-name').textContent = player.name;
  document.querySelector('.player-level').textContent = `Level ${player.level} ${player.class ? player.class.charAt(0).toUpperCase() + player.class.slice(1) : ''}`;
  
  // HP Bar
  const hpPercent = (player.hp / player.maxHp) * 100;
  document.querySelector('.hp-bar .bar-fill').style.width = `${hpPercent}%`;
  document.querySelector('.hp-bar .stat-value').textContent = `${player.hp}/${player.maxHp}`;
  
  // XP Bar
  const xpPercent = (player.xp / player.xpToNext) * 100;
  document.querySelector('.xp-bar .bar-fill').style.width = `${xpPercent}%`;
  document.querySelector('.xp-bar .stat-value').textContent = `${player.xp}/${player.xpToNext}`;
  
  // Gold
  document.querySelector('.gold .currency-value').textContent = player.gold;
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
  
  document.querySelector('.location-name').textContent = location.name;
  document.querySelector('.location-desc').textContent = location.description;
  
  // Render NPCs in scene
  renderNPCs(location);
}

function renderNPCs(location) {
  const scene = document.getElementById('game-scene');
  
  // Clear existing NPCs
  scene.querySelectorAll('.npc-sprite').forEach(el => el.remove());
  
  // Add NPCs for this location
  const npcPositions = [
    { x: 20, y: 60 },
    { x: 40, y: 55 },
    { x: 60, y: 65 },
    { x: 80, y: 58 }
  ];
  
  location.npcs.forEach((npcId, index) => {
    const npc = GAME_DATA.npcs[npcId];
    if (!npc) return;
    
    const pos = npcPositions[index % npcPositions.length];
    const sprite = document.createElement('div');
    sprite.className = 'npc-sprite';
    sprite.setAttribute('data-npc', npcId);
    sprite.setAttribute('data-emoji', getNPCEmoji(npc));
    sprite.style.left = `${pos.x}%`;
    sprite.style.bottom = `${pos.y}%`;
    
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
  });
}

function getNPCEmoji(npc) {
  const emojiMap = {
    'urma': '👵',
    'rega': '👨‍🌾',
    'merchant': '🧳',
    'dave': '🌿',
    'mary': '👩‍🌾',
    'baker': '👨‍🍳'
  };
  return emojiMap[npc.id] || '👤';
}

function renderQuestPanel() {
  const panel = document.querySelector('#right-sidebar .panel-content');
  const filter = GameState.questFilter;
  
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
  const isSelected = GameState.selectedQuest === quest.id;
  const questData = GAME_DATA.quests[quest.id] || quest;
  
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

function getActiveQuests() {
  return GameState.player.activeQuests.map(q => ({
    ...q,
    ...GAME_DATA.quests[q.id]
  }));
}

function getAvailableQuests() {
  const location = GAME_DATA.locations[GameState.currentLocation];
  const available = [];
  
  location.quests.forEach(questId => {
    const quest = GAME_DATA.quests[questId];
    if (!quest) return;
    
    // Check if already active or completed
    if (GameState.player.activeQuests.find(q => q.id === questId)) return;
    if (GameState.player.completedQuests.includes(questId)) return;
    
    // Check prerequisites
    const prereqsMet = quest.prerequisites.every(prereq => 
      GameState.player.completedQuests.includes(prereq)
    );
    
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
    const questData = GAME_DATA.quests[q.id];
    return questData?.giver === npcId;
  });
}

function selectQuest(questId) {
  GameState.selectedQuest = GameState.selectedQuest === questId ? null : questId;
  renderQuestPanel();
}

function acceptQuest(questId) {
  const quest = GAME_DATA.quests[questId];
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
  const objectiveData = GAME_DATA.quests[questId].objectives.find(o => o.id === objectiveId);
  
  if (!objective || objective.completed) return;
  
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
  const questData = GAME_DATA.quests[questId];
  const questIndex = GameState.player.activeQuests.findIndex(q => q.id === questId);
  
  if (questIndex === -1) return;
  
  // Remove from active
  GameState.player.activeQuests.splice(questIndex, 1);
  
  // Add to completed
  GameState.player.completedQuests.push(questId);
  
  // Give rewards
  if (questData.rewards) {
    if (questData.rewards.xp) {
      addXP(questData.rewards.xp);
    }
    if (questData.rewards.gold) {
      GameState.player.gold += questData.rewards.gold;
    }
    if (questData.rewards.items) {
      questData.rewards.items.forEach(itemId => {
        addItemToInventory(itemId);
      });
    }
    if (questData.rewards.reputation) {
      Object.entries(questData.rewards.reputation).forEach(([faction, amount]) => {
        GameState.player.reputation[faction] = (GameState.player.reputation[faction] || 0) + amount;
      });
    }
  }
  
  showNotification(`Quest Complete: ${questData.name}!`, 'success');
  
  // Unlock next quests
  unlockDependentQuests(questId);
  
  renderHUD();
  renderQuestPanel();
  saveGame();
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
  // Apply wisdom multiplier if stats manager is available
  let finalAmount = amount;
  if (statsManager) {
    const multiplier = statsManager.calculateXpMultiplier();
    finalAmount = Math.floor(amount * multiplier);
  }
  
  GameState.player.xp += finalAmount;
  
  if (finalAmount > amount) {
    showNotification(`+${finalAmount} XP (Wisdom bonus!)`);
  } else {
    showNotification(`+${finalAmount} XP`);
  }
  
  // Check for level up
  while (GameState.player.xp >= GameState.player.xpToNext) {
    levelUp();
  }
  
  renderHUD();
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
  GameState.player.hp = Math.max(0, GameState.player.hp - amount);
  
  // Visual feedback
  document.querySelector('.hp-bar .bar-container').classList.add('hp-damage');
  setTimeout(() => {
    document.querySelector('.hp-bar .bar-container').classList.remove('hp-damage');
  }, 500);
  
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
    saveGame();
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
  } else if (['helm', 'armor', 'weapon', 'accessory'].includes(itemData.type)) {
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

function recalculateStats() {
  let bonusHp = 0;
  
  Object.values(GameState.player.equipment).forEach(itemId => {
    if (itemId) {
      const item = GAME_DATA.items[itemId];
      if (item?.stats?.maxHp) {
        bonusHp += item.stats.maxHp;
      }
    }
  });
  
  // Base HP is 100, plus bonuses
  const baseHp = 100 + (GameState.player.level - 1) * 10;
  GameState.player.maxHp = baseHp + bonusHp;
  GameState.player.hp = Math.min(GameState.player.hp, GameState.player.maxHp);
  
  renderHUD();
}

// =====================================================
// NPC Interaction & Dialog
// =====================================================

function interactWithNPC(npcId) {
  const npc = GAME_DATA.npcs[npcId];
  if (!npc) return;
  
  // Track met NPCs for quest objectives
  if (!GameState.player.metNpcs.includes(npcId)) {
    GameState.player.metNpcs.push(npcId);
    
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
    dialogText = GAME_DATA.quests[availableQuest.id].dialogue.intro;
    options.push({
      text: "Accept Quest",
      action: () => {
        acceptQuest(availableQuest.id);
        hideDialog();
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
      GAME_DATA.quests[q.id]?.giver === npcId
    );
    if (activeQuest) {
      const questData = GAME_DATA.quests[activeQuest.id];
      const allComplete = activeQuest.objectives.every(o => o.completed);
      
      if (allComplete) {
        dialogText = questData.dialogue.complete;
        options.push({
          text: "Complete Quest",
          action: () => {
            completeQuest(activeQuest.id);
            hideDialog();
          }
        });
      } else {
        dialogText = questData.dialogue.progress;
        
        // Check for lesson objectives
        const lessonObjective = activeQuest.objectives.find(o => 
          !o.completed && GAME_DATA.quests[activeQuest.id].objectives.find(obj => 
            obj.id === o.id && obj.type === 'lesson'
          )
        );
        
        if (lessonObjective) {
          options.push({
            text: "Start Lesson",
            action: () => {
              hideDialog();
              startLesson(activeQuest.id, lessonObjective.id);
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
  
  // Generate questions
  const questions = generateQuestionsFromVocab(allVocab, 8);
  
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
  
  showLessonModal();
}

function generateQuestionsFromVocab(vocab, count) {
  const questions = [];
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
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
  
  return questions;
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
  
  // Update answers
  const answersHtml = question.options.map(opt => 
    `<button class="answer-btn" data-answer="${opt}">${opt}</button>`
  ).join('');
  document.querySelector('.answer-options').innerHTML = answersHtml;
  
  // Update hint display with new system
  renderHintBox(question);
  
  // Clear feedback
  document.querySelector('.lesson-feedback').textContent = '';
  document.querySelector('.lesson-feedback').className = 'lesson-feedback';
  
  // Add click handlers
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn.dataset.answer));
  });
}

function renderHintBox(question) {
  const hintBox = document.querySelector('.hint-box');
  
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

function handleAnswer(answer) {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];
  const isCorrect = answer === question.correctAnswer;
  
  const previousMultiplier = state.currentMultiplier;
  
  // Disable all buttons
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (btn.dataset.answer === answer && !isCorrect) {
      btn.classList.add('wrong');
    }
  });
  
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
    if (srManager) {
      srManager.recordWrong(wordData);
    }
    
    // Break streak
    const hadStreak = state.streak >= 3;
    state.streak = 0;
    state.currentMultiplier = 1.0;
    state.wrongAnswers++;
    question.wasCorrect = false;
    
    // Build feedback message
    let feedbackMsg = `✗ Wrong! The answer was: <strong>${question.correctAnswer}</strong>`;
    
    if (hadStreak) {
      animateStreakBreak();
      feedbackMsg = `✗ Wrong! Streak lost! The answer was: <strong>${question.correctAnswer}</strong>`;
    }
    
    feedback.innerHTML = feedbackMsg;
    feedback.className = 'lesson-feedback wrong';
    
    // HP penalty
    damagePlayer(10);
    
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
    } else {
      showNotification(`Exam Failed. ${result.scorePercent}% (need ${result.passThreshold}%)`, 'error');
      setTimeout(() => {
        showNotification('Complete a review session to retry.', 'info');
      }, 500);
    }
    
    // Check achievements
    checkAchievements();
    
    renderHUD();
    saveGame();
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
    saveGame();
    
    // Reset lesson state
    resetLessonState();
    return;
  }
  
  // Regular lesson completion
  const passed = successRate >= 0.6;
  
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
    
  } else {
    showNotification(`Need 60% to pass. You got ${Math.floor(successRate * 100)}%. Try again!`, 'error');
  }
  
  // Reset lesson state
  resetLessonState();
  
  // Save progress
  saveGame();
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
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === 'success' ? 'var(--accent-green)' : type === 'error' ? 'var(--accent-red)' : 'var(--bg-light)'};
    border: 3px solid var(--border-pixel);
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-light);
    z-index: 3000;
    animation: slideUp 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
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

function openShop(npcId) {
  hideDialog();
  
  if (!shopManager) {
    showNotification("Shop system not initialized!", 'error');
    return;
  }
  
  // Find shop by NPC
  const shop = shopManager.getShopByNpc(npcId);
  if (!shop) {
    showNotification("This person doesn't have a shop.", 'info');
    return;
  }
  
  // Open the shop
  shopManager.openShop(shop.id);
  
  // Render shop UI
  renderShopScreen(shop.id);
}

function renderShopScreen(shopId) {
  const shop = shopManager.getShop(shopId);
  if (!shop) return;
  
  const inventory = shopManager.getShopInventory(shopId);
  const playerGold = shopManager.getPlayerGold();
  
  let inventoryHtml = '';
  
  if (inventory.length === 0) {
    inventoryHtml = '<p style="color: var(--text-muted); text-align: center;">No items available.</p>';
  } else {
    inventoryHtml = inventory.map(entry => {
      const item = entry.item;
      const canAfford = playerGold >= entry.price;
      const rarityInfo = ItemRarityInfo[item.rarity] || { color: '#ffffff', name: 'Common' };
      
      return `
        <div class="shop-item ${canAfford ? '' : 'cannot-afford'}">
          <div class="shop-item-icon">${item.icon || '❓'}</div>
          <div class="shop-item-info">
            <div class="shop-item-name" style="color: ${rarityInfo.color};">${item.name}</div>
            <div class="shop-item-desc">${item.description || ''}</div>
          </div>
          <div class="shop-item-price">
            <span class="price-value">${entry.price}</span>
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
    saveGame();
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
// Profile Screen
// =====================================================

function showProfileScreen() {
  const player = GameState.player;
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
  
  // Major stats display
  const majorStatsHtml = majorStats.map(stat => `
    <div class="profile-stat">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
    </div>
  `).join('');
  
  // Minor stats display
  const minorStatsHtml = minorStats.map(stat => `
    <div class="profile-stat minor">
      <span class="profile-stat-icon">${stat.definition.icon}</span>
      <span class="profile-stat-name">${stat.definition.name}</span>
      <span class="profile-stat-value">${stat.base}${stat.bonus > 0 ? ` <span class="stat-bonus">+${stat.bonus}</span>` : ''}</span>
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
}

// =====================================================
// Progress Screen (Milestones, Achievements, Learning)
// =====================================================

let progressTab = 'milestones';

function showProgressScreen() {
  renderProgressScreen();
}

function renderProgressScreen() {
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
  
  const majorFactions = reputationManager.getMajorFactionStatuses();
  const minorFactions = reputationManager.getMinorFactionStatuses();
  
  const renderFactionItem = (status) => {
    const faction = status.faction;
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
      ${majorFactions.map(renderFactionItem).join('')}
    </div>
    
    <div class="reputation-section">
      <div class="reputation-section-title">MINOR FACTIONS</div>
      ${minorFactions.map(renderFactionItem).join('')}
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
    saveGame();
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
      <div class="class-icon">${cls.id === 'scholar' ? '📚' : cls.id === 'warrior' ? '⚔️' : '🗡️'}</div>
      <div class="class-name">${cls.name}</div>
      <div class="class-desc">${cls.description}</div>
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
      startNewGame(name, selectedClass);
    }
  });
}

function startNewGame(name, classId) {
  const classData = GAME_DATA.classes[classId];
  
  GameState.player.name = name;
  GameState.player.class = classId;
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
  
  // Show intro dialog
  setTimeout(() => {
    showDialog('Narrator', 
      `You arrive at the small settlement of Dawnmere, a frontier town built along the trade routes of the river. The people here seek opportunity and a fresh start, far from the politics of the great cities. Perhaps you will find what you seek here as well...`,
      [{ text: "Begin exploring", action: hideDialog }]
    );
  }, 500);
}

// =====================================================
// Initialization
// =====================================================

function initGame() {
  try {
    // Initialize Quest Manager
    questManager = new QuestManager(GameState, GAME_DATA);

    // Initialize Spaced Repetition Manager
    if (typeof SpacedRepetitionManager !== 'undefined') {
      srManager = new SpacedRepetitionManager(GameState);
    }

    // Initialize Stats Manager
    if (typeof StatsManager !== 'undefined') {
      statsManager = new StatsManager(GameState);
    }

    // Initialize Reputation Manager
    if (typeof ReputationManager !== 'undefined') {
      reputationManager = new ReputationManager(GameState);
    }

    // Initialize Item Manager
    if (typeof ItemManager !== 'undefined') {
      itemManager = new ItemManager(GameState, GAME_DATA.items);
    }

    // Initialize Shop Manager
    if (typeof ShopManager !== 'undefined' && typeof SHOP_DEFINITIONS !== 'undefined' && itemManager) {
      shopManager = new ShopManager(GameState, SHOP_DEFINITIONS, itemManager);
    }

    // Initialize Hint Manager
    if (typeof HintManager !== 'undefined' && srManager) {
      hintManager = new HintManager(GameState, srManager);
    }

    // Initialize Location Manager
    if (typeof LocationManager !== 'undefined') {
      locationManager = new LocationManager(GameState);
    }

    // Initialize Boss Exam Manager
    if (typeof BossExamManager !== 'undefined' && locationManager && hintManager && srManager) {
      bossExamManager = new BossExamManager(GameState, locationManager, hintManager, srManager);
    }

    // Initialize Title Manager
    if (typeof TitleManager !== 'undefined') {
      titleManager = new TitleManager(GameState);
    }
  } catch (error) {
    console.error('Error initializing game systems:', error);
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

  // Player avatar click to show profile
  document.querySelector('.player-avatar').addEventListener('click', () => {
    showProfileScreen();
  });

  // Check for existing save
  if (localStorage.getItem('bytequest_save')) {
    document.getElementById('continue-btn').style.display = 'block';
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
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
      case 'escape':
        handleNavigation('game');
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
  if (questManager) {
    const result = questManager.acceptQuest(questId);
    if (result.success) {
      showNotification(result.message, 'success');
      GameState.selectedQuest = questId;
      renderQuestPanel();
      renderNPCs(GAME_DATA.locations[GameState.currentLocation]);
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
      saveGame();
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
    case 'quests':
      // Quest panel is always visible, just highlight it
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
  }
}

function showInventoryScreen() {
  const equipment = GameState.player.equipment;
  const inventory = GameState.player.inventory;
  
  let equipmentHtml = ['helm', 'armor', 'weapon', 'accessory'].map(slot => {
    const itemId = equipment[slot];
    const item = itemId ? GAME_DATA.items[itemId] : null;
    return `
      <div class="equip-slot">
        <div class="equip-slot-label">${slot.toUpperCase()}</div>
        <div class="equip-slot-box">${item ? item.icon : ''}</div>
      </div>
    `;
  }).join('');
  
  let inventoryHtml = '';
  for (let i = 0; i < 24; i++) {
    const item = inventory[i];
    if (item) {
      const itemData = GAME_DATA.items[item.id];
      inventoryHtml += `
        <div class="inventory-slot" data-item="${item.id}" title="${itemData?.name || 'Unknown'}">
          <span class="item-icon">${itemData?.icon || '?'}</span>
          ${item.count > 1 ? `<span class="item-count">${item.count}</span>` : ''}
        </div>
      `;
    } else {
      inventoryHtml += '<div class="inventory-slot empty"></div>';
    }
  }
  
  showModal('inventory-modal', `
    <h2 style="font-family: var(--font-display); font-size: 14px; color: var(--accent-gold); margin-bottom: 16px;">
      INVENTORY
    </h2>
    <div class="equipment-slots">
      ${equipmentHtml}
    </div>
    <div class="inventory-grid">
      ${inventoryHtml}
    </div>
    <div style="text-align: right; margin-top: 16px;">
      <button class="pixel-btn" onclick="hideModal('inventory-modal')">Close</button>
    </div>
  `);
  
  // Add item click handlers
  document.querySelectorAll('.inventory-slot[data-item]').forEach(slot => {
    slot.addEventListener('click', () => {
      const itemId = slot.dataset.item;
      useItem(itemId);
      showInventoryScreen(); // Refresh
    });
  });
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
    saveGame();
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
    saveGame();
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
    saveGame();
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
