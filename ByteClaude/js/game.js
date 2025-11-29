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
    reputation: {},
    completedQuests: [],
    activeQuests: [],
    failedQuests: [],
    archivedQuests: [],
    questCompletions: {}, // Track completion counts and timestamps for repeatable quests
    discoveredLocations: ["dawnmere"],
    metNpcs: [],
    titles: [],
    
    // Learning stats
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    lessonsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    createdAt: null
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
    wrongAnswers: 0
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
  const location = GAME_DATA.locations[GameState.currentLocation];
  
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
  GameState.player.xp += amount;
  showNotification(`+${amount} XP`);
  
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
  
  // Increase max HP
  GameState.player.maxHp += 10;
  GameState.player.hp = GameState.player.maxHp;
  
  showNotification(`Level Up! You are now level ${GameState.player.level}!`, 'success');
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
  // In language learning context, "death" means reviewing old content
  showModal('death-modal', `
    <div style="text-align: center;">
      <h2 style="font-family: var(--font-display); font-size: 20px; color: var(--accent-red); margin-bottom: 16px;">
        You've Fallen!
      </h2>
      <p style="margin-bottom: 24px;">
        Your health has been depleted. Perhaps it's time to review some earlier lessons to regain your strength.
      </p>
      <button class="pixel-btn pixel-btn-gold" onclick="reviewLessons()">
        Review Lessons
      </button>
      <button class="pixel-btn" onclick="restAtInn()" style="margin-left: 16px;">
        Rest at Inn (10 Gold)
      </button>
    </div>
  `);
}

function reviewLessons() {
  // Reset HP to half
  GameState.player.hp = Math.floor(GameState.player.maxHp / 2);
  hideModal('death-modal');
  renderHUD();
  // TODO: Start a review lesson
}

function restAtInn() {
  if (GameState.player.gold >= 10) {
    GameState.player.gold -= 10;
    GameState.player.hp = GameState.player.maxHp;
    hideModal('death-modal');
    renderHUD();
    showNotification("You feel fully rested!");
  } else {
    showNotification("Not enough gold!", 'error');
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
// Lesson System
// =====================================================

function startLesson(questId, objectiveId) {
  const quest = GAME_DATA.quests[questId];
  if (!quest) return;
  
  // Gather vocabulary for this quest
  const vocabCategories = quest.vocabulary || [];
  let allVocab = [];
  
  vocabCategories.forEach(cat => {
    const [category, subcategory] = cat.split('.');
    const vocab = VOCABULARY[category]?.[subcategory] || [];
    allVocab = allVocab.concat(vocab);
  });
  
  // Generate questions
  const questions = generateQuestionsFromVocab(allVocab, 8);
  
  GameState.lessonState = {
    active: true,
    questId,
    objectiveId,
    vocabulary: allVocab,
    questions,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0
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

function showLessonModal() {
  const modal = document.getElementById('lesson-modal');
  modal.classList.add('active');
  renderQuestion();
}

function renderQuestion() {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];
  
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
  
  // Update hint
  document.querySelector('.hint-box').textContent = `💡 Hint: ${question.hint || 'No hint available'}`;
  
  // Clear feedback
  document.querySelector('.lesson-feedback').textContent = '';
  document.querySelector('.lesson-feedback').className = 'lesson-feedback';
  
  // Add click handlers
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn.dataset.answer));
  });
}

function handleAnswer(answer) {
  const state = GameState.lessonState;
  const question = state.questions[state.currentQuestion];
  const isCorrect = answer === question.correctAnswer;
  
  // Disable all buttons
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (btn.dataset.answer === answer && !isCorrect) {
      btn.classList.add('wrong');
    }
  });
  
  // Show feedback
  const feedback = document.querySelector('.lesson-feedback');
  if (isCorrect) {
    feedback.textContent = '✓ Correct!';
    feedback.className = 'lesson-feedback correct';
    state.correctAnswers++;
    question.wasCorrect = true;
  } else {
    feedback.textContent = `✗ Wrong! The answer was: ${question.correctAnswer}`;
    feedback.className = 'lesson-feedback wrong';
    state.wrongAnswers++;
    question.wasCorrect = false;
    damagePlayer(10); // HP penalty for wrong answer
  }
  
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
  
  // Hide lesson modal
  document.getElementById('lesson-modal').classList.remove('active');
  
  // Show results
  const passed = successRate >= 0.6;
  
  if (passed) {
    // Update quest progress
    updateQuestProgress(state.questId, state.objectiveId);
    
    // Award XP based on performance
    const bonusXP = Math.floor(successRate * 50);
    addXP(25 + bonusXP);
    
    showNotification(`Lesson Complete! ${Math.floor(successRate * 100)}% correct`, 'success');
  } else {
    showNotification(`Need 60% to pass. You got ${Math.floor(successRate * 100)}%. Try again!`, 'error');
  }
  
  // Reset lesson state
  GameState.lessonState = {
    active: false,
    questId: null,
    objectiveId: null,
    vocabulary: [],
    questions: [],
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  };
}

// =====================================================
// Utility Functions
// =====================================================

function showNotification(message, type = 'info') {
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
  // TODO: Implement shop UI
  showNotification("Shop coming soon!");
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
  GameState.player.maxHp = classData.startingStats.maxHp;
  GameState.player.hp = classData.startingStats.maxHp;
  
  // Add starting items
  classData.startingItems.forEach(itemId => {
    addItemToInventory(itemId);
  });
  
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
  // Initialize Quest Manager
  questManager = new QuestManager(GameState, GAME_DATA);
  
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
    case 'quests':
      // Quest panel is always visible, just highlight it
      break;
    case 'map':
      showNotification("Map coming in Phase 2!");
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

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
