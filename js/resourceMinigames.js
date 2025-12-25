// ByteQuest Resource Minigames System
// Tier 1-3 Minigames for resource gathering
// Version 1.0

// =====================================================
// VOCABULARY DATA FOR RESOURCE GATHERING
// =====================================================

const RESOURCE_VOCABULARY = {
  mining: {
    tier1: [
      { french: "le fer", english: "iron", hint: "Common metal" },
      { french: "le cuivre", english: "copper", hint: "Reddish metal" },
      { french: "la pierre", english: "stone", hint: "Rock" },
      { french: "le métal", english: "metal", hint: "Same as English" },
      { french: "la roche", english: "rock", hint: "Hard material" },
      { french: "dur", english: "hard", hint: "Not soft" },
      { french: "lourd", english: "heavy", hint: "Has weight" },
      { french: "creuser", english: "to dig", hint: "Make a hole" }
    ],
    tier2: [
      { french: "l'argent", english: "silver", hint: "Precious white metal" },
      { french: "l'or", english: "gold", hint: "Precious yellow metal" },
      { french: "la mine", english: "mine", hint: "Underground excavation" },
      { french: "le tunnel", english: "tunnel", hint: "Underground passage" },
      { french: "profond", english: "deep", hint: "Far down" },
      { french: "sombre", english: "dark", hint: "No light" },
      { french: "briller", english: "to shine", hint: "Emit light" },
      { french: "précieux", english: "precious", hint: "Valuable" }
    ],
    tier3: [
      { french: "le marteau", english: "hammer", hint: "Hitting tool" },
      { french: "la pioche", english: "pickaxe", hint: "Mining tool" },
      { french: "le minerai", english: "ore", hint: "Raw metal" },
      { french: "fondre", english: "to melt", hint: "Turn solid to liquid" },
      { french: "le cristal", english: "crystal", hint: "Clear stone" },
      { french: "la gemme", english: "gem", hint: "Precious stone" },
      { french: "extraire", english: "to extract", hint: "Remove from" },
      { french: "le gisement", english: "deposit", hint: "Where ore is found" }
    ]
  },

  woodcutting: {
    tier1: [
      { french: "l'arbre", english: "tree", hint: "Large plant" },
      { french: "le bois", english: "wood", hint: "Tree material" },
      { french: "la forêt", english: "forest", hint: "Many trees" },
      { french: "la branche", english: "branch", hint: "Tree arm" },
      { french: "vert", english: "green", hint: "Leaf color" },
      { french: "grand", english: "tall/big", hint: "Not small" },
      { french: "la feuille", english: "leaf", hint: "On branches" },
      { french: "couper", english: "to cut", hint: "Separate with blade" }
    ],
    tier2: [
      { french: "le tronc", english: "trunk", hint: "Tree body" },
      { french: "la hache", english: "axe", hint: "Cutting tool" },
      { french: "le chêne", english: "oak", hint: "Strong tree" },
      { french: "le pin", english: "pine", hint: "Evergreen tree" },
      { french: "tomber", english: "to fall", hint: "Go down" },
      { french: "solide", english: "solid", hint: "Strong" },
      { french: "sec", english: "dry", hint: "Not wet" },
      { french: "humide", english: "damp", hint: "Slightly wet" }
    ],
    tier3: [
      { french: "la scie", english: "saw", hint: "Toothed blade" },
      { french: "l'écorce", english: "bark", hint: "Tree skin" },
      { french: "la souche", english: "stump", hint: "After cutting" },
      { french: "la racine", english: "root", hint: "Underground" },
      { french: "ancien", english: "ancient", hint: "Very old" },
      { french: "rare", english: "rare", hint: "Hard to find" },
      { french: "sculpter", english: "to carve", hint: "Shape wood" },
      { french: "le menuisier", english: "carpenter", hint: "Wood worker" }
    ]
  },

  hunting: {
    tier1: [
      { french: "l'animal", english: "animal", hint: "Living creature" },
      { french: "chasser", english: "to hunt", hint: "Pursue prey" },
      { french: "rapide", english: "fast", hint: "Quick" },
      { french: "lent", english: "slow", hint: "Not fast" },
      { french: "courir", english: "to run", hint: "Move fast" },
      { french: "sauter", english: "to jump", hint: "Leap" },
      { french: "fort", english: "strong", hint: "Powerful" },
      { french: "faible", english: "weak", hint: "Not strong" }
    ],
    tier2: [
      { french: "le sanglier", english: "boar", hint: "Wild pig" },
      { french: "le loup", english: "wolf", hint: "Wild dog" },
      { french: "l'arc", english: "bow", hint: "Shoots arrows" },
      { french: "la flèche", english: "arrow", hint: "Projectile" },
      { french: "silencieux", english: "silent", hint: "No sound" },
      { french: "prudent", english: "careful", hint: "Cautious" },
      { french: "suivre", english: "to follow", hint: "Go after" },
      { french: "attendre", english: "to wait", hint: "Be patient" }
    ],
    tier3: [
      { french: "l'ours", english: "bear", hint: "Large animal" },
      { french: "le cerf", english: "deer", hint: "Has antlers" },
      { french: "la piste", english: "track", hint: "Trail" },
      { french: "le piège", english: "trap", hint: "Catches prey" },
      { french: "la proie", english: "prey", hint: "Hunted animal" },
      { french: "le chasseur", english: "hunter", hint: "One who hunts" },
      { french: "sauvage", english: "wild", hint: "Not tame" },
      { french: "dangereux", english: "dangerous", hint: "Could harm" }
    ]
  },

  herbalism: {
    tier1: [
      { french: "la plante", english: "plant", hint: "Grows in soil" },
      { french: "la fleur", english: "flower", hint: "Colorful bloom" },
      { french: "la feuille", english: "leaf", hint: "Green part" },
      { french: "l'herbe", english: "grass", hint: "Ground cover" },
      { french: "rouge", english: "red", hint: "Color" },
      { french: "jaune", english: "yellow", hint: "Color" },
      { french: "parfumé", english: "fragrant", hint: "Smells nice" },
      { french: "cueillir", english: "to pick", hint: "Gather by hand" }
    ],
    tier2: [
      { french: "la racine", english: "root", hint: "Underground" },
      { french: "la tige", english: "stem", hint: "Plant support" },
      { french: "le jardin", english: "garden", hint: "Plant area" },
      { french: "le pétale", english: "petal", hint: "Flower part" },
      { french: "pousser", english: "to grow", hint: "Get bigger" },
      { french: "frais", english: "fresh", hint: "Newly picked" },
      { french: "sécher", english: "to dry", hint: "Remove moisture" },
      { french: "guérir", english: "to heal", hint: "Make better" }
    ],
    tier3: [
      { french: "la graine", english: "seed", hint: "Plant beginning" },
      { french: "le pollen", english: "pollen", hint: "Yellow powder" },
      { french: "la sève", english: "sap", hint: "Plant blood" },
      { french: "le remède", english: "remedy", hint: "Medicine" },
      { french: "le poison", english: "poison", hint: "Harmful" },
      { french: "l'élixir", english: "elixir", hint: "Magic drink" },
      { french: "puissant", english: "powerful", hint: "Strong effect" },
      { french: "l'herboriste", english: "herbalist", hint: "Plant expert" }
    ]
  },

  fishing: {
    tier1: [
      { french: "le poisson", english: "fish", hint: "Swims" },
      { french: "l'eau", english: "water", hint: "Liquid" },
      { french: "la rivière", english: "river", hint: "Flowing water" },
      { french: "le lac", english: "lake", hint: "Still water" },
      { french: "nager", english: "to swim", hint: "Move in water" },
      { french: "mouillé", english: "wet", hint: "Covered in water" },
      { french: "profond", english: "deep", hint: "Far down" },
      { french: "calme", english: "calm", hint: "Peaceful" }
    ],
    tier2: [
      { french: "la mer", english: "sea", hint: "Salt water" },
      { french: "pêcher", english: "to fish", hint: "Catch fish" },
      { french: "le bateau", english: "boat", hint: "Floats" },
      { french: "la canne", english: "fishing rod", hint: "Pole" },
      { french: "l'appât", english: "bait", hint: "Lure" },
      { french: "mordre", english: "to bite", hint: "Fish action" },
      { french: "tirer", english: "to pull", hint: "Bring in" },
      { french: "patient", english: "patient", hint: "Can wait" }
    ],
    tier3: [
      { french: "l'hameçon", english: "hook", hint: "Sharp curve" },
      { french: "le filet", english: "net", hint: "Mesh catcher" },
      { french: "la truite", english: "trout", hint: "Freshwater fish" },
      { french: "le saumon", english: "salmon", hint: "Pink fish" },
      { french: "le pêcheur", english: "fisherman", hint: "One who fishes" },
      { french: "l'écaille", english: "scale", hint: "Fish skin" },
      { french: "glissant", english: "slippery", hint: "Hard to hold" },
      { french: "frétiller", english: "to wriggle", hint: "Fish movement" }
    ]
  }
};

// Resource types and their outputs by tier
const RESOURCE_OUTPUTS = {
  mining: {
    tier1: { id: 'copper_chunk', name: 'Copper Chunk', icon: '🪨' },
    tier2: { id: 'iron_ore', name: 'Iron Ore', icon: '�ite' },
    tier3: { id: 'silver_vein', name: 'Silver Vein', icon: '💎' }
  },
  woodcutting: {
    tier1: { id: 'pine_log', name: 'Pine Log', icon: '🪵' },
    tier2: { id: 'oak_timber', name: 'Oak Timber', icon: '🪵' },
    tier3: { id: 'ironwood', name: 'Ironwood', icon: '🪵' }
  },
  hunting: {
    tier1: { id: 'boar_hide', name: 'Boar Hide', icon: '🐗' },
    tier2: { id: 'wolf_pelt', name: 'Wolf Pelt', icon: '🐺' },
    tier3: { id: 'bear_fur', name: 'Bear Fur', icon: '🐻' }
  },
  herbalism: {
    tier1: { id: 'meadow_leaf', name: 'Meadow Leaf', icon: '🌿' },
    tier2: { id: 'sunpetal', name: 'Sunpetal', icon: '🌻' },
    tier3: { id: 'moonblossom', name: 'Moonblossom', icon: '🌸' }
  },
  fishing: {
    tier1: { id: 'river_perch', name: 'River Perch', icon: '🐟' },
    tier2: { id: 'lake_trout', name: 'Lake Trout', icon: '🐟' },
    tier3: { id: 'sea_bass', name: 'Sea Bass', icon: '🐠' }
  }
};

// =====================================================
// BASE MINIGAME CLASS
// =====================================================

class ResourceMinigame {
  constructor(resourceType, tier = 1) {
    this.resourceType = resourceType;
    this.tier = tier;
    this.vocabulary = this.loadVocabulary();
    this.score = 0;
    this.resources = 0;
    this.isActive = false;
    this.modalElement = null;
  }

  loadVocabulary() {
    const tierKey = `tier${this.tier}`;
    const vocab = RESOURCE_VOCABULARY[this.resourceType]?.[tierKey] || [];
    // Include lower tier vocabulary for variety
    let allVocab = [...vocab];
    for (let i = 1; i < this.tier; i++) {
      const lowerTier = RESOURCE_VOCABULARY[this.resourceType]?.[`tier${i}`] || [];
      allVocab = allVocab.concat(lowerTier);
    }
    return allVocab;
  }

  getResourceOutput() {
    const tierKey = `tier${this.tier}`;
    return RESOURCE_OUTPUTS[this.resourceType]?.[tierKey] || { id: 'unknown', name: 'Unknown', icon: '❓' };
  }

  generateQuestion() {
    if (this.vocabulary.length < 4) return null;

    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    const word = shuffled[0];
    const questionType = Math.random() > 0.5 ? 'to_english' : 'to_french';

    const wrongAnswers = shuffled
      .slice(1, 4)
      .map(w => questionType === 'to_english' ? w.english : w.french);

    const correctAnswer = questionType === 'to_english' ? word.english : word.french;
    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    return {
      type: questionType,
      word: questionType === 'to_english' ? word.french : word.english,
      prompt: questionType === 'to_english'
        ? 'What does this mean?'
        : 'How do you say this in French?',
      correctAnswer,
      options: allAnswers,
      hint: word.hint
    };
  }

  start() {
    this.isActive = true;
    this.score = 0;
    this.resources = 0;
  }

  end() {
    this.isActive = false;
    // Note: showResults() calls grantResources() internally for proper breakdown display
    this.showResults();
  }

  grantResources() {
    if (this.resources > 0 && typeof itemManager !== 'undefined') {
      const output = this.getResourceOutput();

      // Calculate final yield with bonuses using BonusCalculator
      if (typeof BonusCalculator !== 'undefined') {
        this.yieldBreakdown = BonusCalculator.calculateGathering(this.resources, this.resourceType, {});
        const finalYield = this.yieldBreakdown.total;
        for (let i = 0; i < finalYield; i++) {
          itemManager.addItem(output.id, 1);
        }
      } else {
        // Fallback without breakdown
        this.yieldBreakdown = null;
        for (let i = 0; i < this.resources; i++) {
          itemManager.addItem(output.id, 1);
        }
      }

      // Grant gathering skill XP
      this.grantSkillXP();
    }
  }

  /**
   * Grant XP to the gathering skill
   */
  grantSkillXP() {
    if (typeof GameState === 'undefined' || !GameState.player) return;

    // Initialize skills if needed
    if (!GameState.player.skills) {
      GameState.player.skills = {};
    }
    if (!GameState.player.skills[this.resourceType]) {
      GameState.player.skills[this.resourceType] = { level: 1, xp: 0 };
    }

    const skill = GameState.player.skills[this.resourceType];
    const MAX_LEVEL = 50;

    // Already maxed
    if (skill.level >= MAX_LEVEL) return;

    // XP based on resources gathered and tier
    const baseXP = 10 + (this.resources * 5) + (this.tier * 10);
    skill.xp += baseXP;

    // Check for level up
    const xpNeeded = skill.level * 100;
    if (skill.xp >= xpNeeded) {
      skill.xp -= xpNeeded;
      skill.level = Math.min(skill.level + 1, MAX_LEVEL);

      if (typeof showNotification !== 'undefined') {
        const skillName = this.resourceType.charAt(0).toUpperCase() + this.resourceType.slice(1);
        showNotification(`${skillName} leveled up to ${skill.level}!`, 'success');
      }
    }
  }

  /**
   * Get formatted breakdown HTML for results screen
   */
  getYieldBreakdownHTML() {
    if (!this.yieldBreakdown || this.yieldBreakdown.breakdown.length <= 1) {
      return '';
    }

    let html = '<div class="yield-breakdown">';
    html += '<div class="yield-breakdown-title">Yield Breakdown</div>';

    this.yieldBreakdown.breakdown.forEach(item => {
      const rowClass = item.type === 'base' ? 'breakdown-base' :
                      item.type === 'multiplier' ? 'breakdown-multiplier' : 'breakdown-additive';
      html += `<div class="yield-breakdown-row ${rowClass}">`;
      html += `<span class="breakdown-label">${item.source}</span>`;
      html += `<span class="breakdown-value">${item.formatted}</span>`;
      html += '</div>';
    });

    if (this.yieldBreakdown.total !== this.yieldBreakdown.base) {
      html += '<div class="yield-breakdown-total">';
      html += '<span class="breakdown-label">Total</span>';
      html += `<span class="breakdown-value">${this.yieldBreakdown.total}</span>`;
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  showResults() {
    // Override in subclass
  }

  createModal(title, content) {
    // Remove any existing minigame modal
    const existing = document.getElementById('minigame-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'minigame-modal';
    modal.className = 'modal minigame-modal';
    modal.innerHTML = `
      <div class="modal-content minigame-content">
        <div class="minigame-header">
          <h2>${title}</h2>
          <button class="close-btn" onclick="resourceMinigameManager.closeMinigame()">&times;</button>
        </div>
        <div class="minigame-body">
          ${content}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;
    return modal;
  }

  updateModal(content) {
    const body = this.modalElement?.querySelector('.minigame-body');
    if (body) {
      body.innerHTML = content;
    }
  }

  closeModal() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.modalElement = null;
    }
  }
}

// =====================================================
// TIER 1: MINING - TIMED QUIZ
// =====================================================

class MiningMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('mining', tier);
    this.timeLimit = 60000; // 60 seconds
    this.timeRemaining = this.timeLimit;
    this.wrongPenalty = 3000; // 3 second penalty
    this.speedBonusThreshold = 2000; // 2 seconds for bonus chance
    this.timerInterval = null;
    this.questionStartTime = 0;
  }

  start() {
    super.start();
    this.timeRemaining = this.timeLimit;
    this.showMinigameUI();
    this.startTimer();
    this.showNextQuestion();
  }

  showMinigameUI() {
    const output = this.getResourceOutput();
    const content = `
      <div class="mining-ui">
        <div class="timer-bar">
          <span class="timer-label">Time Remaining:</span>
          <div class="timer-progress">
            <div class="timer-fill" id="mining-timer-fill" style="width: 100%"></div>
          </div>
          <span class="timer-value" id="mining-timer-value">60s</span>
        </div>

        <div class="question-area" id="mining-question">
          <!-- Question will be inserted here -->
        </div>

        <div class="resource-counter">
          Gathered: <span id="mining-resource-icons"></span>
          <span id="mining-resource-count">(0 ${output.name})</span>
        </div>
      </div>
    `;

    this.createModal(`⛏️ MINING - ${this.getTierName()} Vein`, content);
  }

  getTierName() {
    const names = { 1: 'Copper', 2: 'Iron', 3: 'Silver' };
    return names[this.tier] || 'Unknown';
  }

  startTimer() {
    const updateTimer = () => {
      this.timeRemaining -= 100;
      const seconds = Math.max(0, Math.ceil(this.timeRemaining / 1000));
      const percent = Math.max(0, (this.timeRemaining / this.timeLimit) * 100);

      const timerFill = document.getElementById('mining-timer-fill');
      const timerValue = document.getElementById('mining-timer-value');

      if (timerFill) timerFill.style.width = `${percent}%`;
      if (timerValue) timerValue.textContent = `${seconds}s`;

      if (this.timeRemaining <= 0) {
        this.endMinigame();
      }
    };

    this.timerInterval = setInterval(updateTimer, 100);
  }

  showNextQuestion() {
    const question = this.generateQuestion();
    if (!question) {
      this.endMinigame();
      return;
    }

    this.currentQuestion = question;
    this.questionStartTime = Date.now();

    const questionArea = document.getElementById('mining-question');
    if (!questionArea) return;

    questionArea.innerHTML = `
      <div class="question-prompt">
        <span class="question-word">"${question.word}"</span>
        <span class="question-text">${question.prompt}</span>
      </div>
      <div class="answer-grid">
        ${question.options.map((opt, i) => `
          <button class="answer-btn minigame-answer" data-answer="${opt}" onclick="resourceMinigameManager.handleMiningAnswer('${opt.replace(/'/g, "\\'")}')">
            <span class="key-hint">${i + 1}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  }

  handleAnswer(answer) {
    if (!this.isActive) return;

    const answerTime = Date.now() - this.questionStartTime;
    const isCorrect = answer === this.currentQuestion.correctAnswer;

    if (isCorrect) {
      this.resources++;
      this.score++;

      // Speed bonus check
      if (answerTime < this.speedBonusThreshold && Math.random() < 0.3) {
        this.resources++;
        this.showFeedback('⚡ Speed Bonus! +1 ore', 'bonus');
      } else {
        this.showFeedback('✓ Correct!', 'correct');
      }

      this.updateResourceDisplay();
      this.showNextQuestion();
    } else {
      this.timeRemaining -= this.wrongPenalty;
      this.showFeedback(`✗ Wrong! -3 seconds (Answer: ${this.currentQuestion.correctAnswer})`, 'wrong');

      // Brief delay before next question
      setTimeout(() => {
        if (this.isActive) this.showNextQuestion();
      }, 500);
    }
  }

  showFeedback(message, type) {
    const questionArea = document.getElementById('mining-question');
    if (!questionArea) return;

    const feedback = document.createElement('div');
    feedback.className = `minigame-feedback ${type}`;
    feedback.textContent = message;
    questionArea.appendChild(feedback);

    setTimeout(() => feedback.remove(), 1000);
  }

  updateResourceDisplay() {
    const output = this.getResourceOutput();
    const icons = document.getElementById('mining-resource-icons');
    const count = document.getElementById('mining-resource-count');

    if (icons) {
      icons.textContent = output.icon.repeat(Math.min(this.resources, 10));
      if (this.resources > 10) icons.textContent += '...';
    }
    if (count) count.textContent = `(${this.resources} ${output.name})`;
  }

  endMinigame() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isActive = false;
    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const output = this.getResourceOutput();
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>⛏️ Mining Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Ore Gathered:</span>
            <span class="result-value">${finalYield} ${output.name}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Questions Answered:</span>
            <span class="result-value">${this.score}</span>
          </div>
        </div>
        ${breakdownHTML}
        <div class="results-resources">
          ${output.icon.repeat(Math.min(finalYield, 20))}
        </div>
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 1: WOODCUTTING - STREAK CHALLENGE
// =====================================================

class WoodcuttingMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('woodcutting', tier);
    this.totalQuestions = 15;
    this.currentQuestionIndex = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.streakMilestones = [5, 10, 15];
  }

  start() {
    super.start();
    this.currentQuestionIndex = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.showMinigameUI();
    this.showNextQuestion();
  }

  showMinigameUI() {
    const output = this.getResourceOutput();
    const content = `
      <div class="woodcutting-ui">
        <div class="streak-display">
          <div class="current-streak">
            <span class="streak-label">Current Streak:</span>
            <span class="streak-flames" id="wc-streak-flames"></span>
            <span class="streak-value" id="wc-streak-value">0</span>
          </div>
          <div class="best-streak">
            Best Streak: <span id="wc-best-streak">0</span>
          </div>
        </div>

        <div class="progress-display">
          Question <span id="wc-question-num">1</span>/${this.totalQuestions}
        </div>

        <div class="question-area" id="wc-question">
          <!-- Question will be inserted here -->
        </div>

        <div class="resource-counter">
          Logs collected: <span id="wc-resource-icons"></span>
          <span id="wc-resource-count">(0 ${output.name})</span>
        </div>

        <div class="streak-bonuses">
          <span class="bonus-info">Streak Bonuses: 5 = +1 log | 10 = +2 logs | 15 = +3 logs</span>
        </div>
      </div>
    `;

    this.createModal(`🪓 WOODCUTTING - ${this.getTierName()} Forest`, content);
  }

  getTierName() {
    const names = { 1: 'Pine', 2: 'Oak', 3: 'Ironwood' };
    return names[this.tier] || 'Unknown';
  }

  showNextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.endMinigame();
      return;
    }

    const question = this.generateQuestion();
    if (!question) {
      this.endMinigame();
      return;
    }

    this.currentQuestion = question;
    this.currentQuestionIndex++;

    document.getElementById('wc-question-num').textContent = this.currentQuestionIndex;

    const questionArea = document.getElementById('wc-question');
    if (!questionArea) return;

    questionArea.innerHTML = `
      <div class="question-prompt">
        <span class="question-word">"${question.word}"</span>
        <span class="question-text">${question.prompt}</span>
      </div>
      <div class="answer-grid">
        ${question.options.map((opt, i) => `
          <button class="answer-btn minigame-answer" data-answer="${opt}" onclick="resourceMinigameManager.handleWoodcuttingAnswer('${opt.replace(/'/g, "\\'")}')">
            <span class="key-hint">${i + 1}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  }

  handleAnswer(answer) {
    if (!this.isActive) return;

    const isCorrect = answer === this.currentQuestion.correctAnswer;

    if (isCorrect) {
      this.streak++;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
      }

      // Base resource: 1 log per 3 correct
      if (this.score % 3 === 2) {
        this.resources++;
      }
      this.score++;

      // Check streak milestones
      if (this.streakMilestones.includes(this.streak)) {
        const bonus = this.streakMilestones.indexOf(this.streak) + 1;
        this.resources += bonus;
        this.showFeedback(`🔥 ${this.streak} Streak! +${bonus} logs!`, 'bonus');
      } else {
        this.showFeedback('✓ Correct!', 'correct');
      }

      this.updateStreakDisplay();
      this.updateResourceDisplay();
      this.showNextQuestion();
    } else {
      this.streak = 0;
      this.showFeedback(`✗ Streak broken! (Answer: ${this.currentQuestion.correctAnswer})`, 'wrong');
      this.updateStreakDisplay(true);

      setTimeout(() => {
        if (this.isActive) this.showNextQuestion();
      }, 800);
    }
  }

  updateStreakDisplay(broken = false) {
    const flames = document.getElementById('wc-streak-flames');
    const value = document.getElementById('wc-streak-value');
    const best = document.getElementById('wc-best-streak');

    if (flames) {
      flames.textContent = '🔥'.repeat(Math.min(this.streak, 15));
      if (broken) {
        flames.classList.add('streak-broken');
        setTimeout(() => flames.classList.remove('streak-broken'), 500);
      }
    }
    if (value) value.textContent = this.streak;
    if (best) best.textContent = this.bestStreak;
  }

  updateResourceDisplay() {
    const output = this.getResourceOutput();
    const icons = document.getElementById('wc-resource-icons');
    const count = document.getElementById('wc-resource-count');

    if (icons) {
      icons.textContent = output.icon.repeat(Math.min(this.resources, 10));
      if (this.resources > 10) icons.textContent += '...';
    }
    if (count) count.textContent = `(${this.resources} ${output.name})`;
  }

  showFeedback(message, type) {
    const questionArea = document.getElementById('wc-question');
    if (!questionArea) return;

    const feedback = document.createElement('div');
    feedback.className = `minigame-feedback ${type}`;
    feedback.textContent = message;
    questionArea.appendChild(feedback);

    setTimeout(() => feedback.remove(), 1000);
  }

  endMinigame() {
    this.isActive = false;

    // Bonus for best streak
    if (this.bestStreak >= 15) {
      this.resources += 3;
    } else if (this.bestStreak >= 10) {
      this.resources += 2;
    } else if (this.bestStreak >= 5) {
      this.resources += 1;
    }

    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const output = this.getResourceOutput();
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🪓 Woodcutting Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Logs Gathered:</span>
            <span class="result-value">${finalYield} ${output.name}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Best Streak:</span>
            <span class="result-value">🔥 ${this.bestStreak}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Correct Answers:</span>
            <span class="result-value">${this.score}/${this.totalQuestions}</span>
          </div>
        </div>
        ${breakdownHTML}
        <div class="results-resources">
          ${output.icon.repeat(Math.min(finalYield, 20))}
        </div>
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 1: HUNTING - SPEED ROUND
// =====================================================

class HuntingMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('hunting', tier);
    this.totalQuestions = 10;
    this.currentQuestionIndex = 0;
    this.totalTime = 0;
    this.questionStartTime = 0;
    this.wrongPenalty = 5000; // 5 second penalty
    this.mistakes = 0;
    this.starThresholds = { 3: 30000, 2: 45000, 1: 60000 }; // milliseconds
  }

  start() {
    super.start();
    this.currentQuestionIndex = 0;
    this.totalTime = 0;
    this.mistakes = 0;
    this.showMinigameUI();
    this.showNextQuestion();
  }

  showMinigameUI() {
    const output = this.getResourceOutput();
    const content = `
      <div class="hunting-ui">
        <div class="hunting-header">
          <div class="progress-display">
            Question <span id="hunt-question-num">1</span>/${this.totalQuestions}
          </div>
          <div class="time-display">
            Total Time: <span id="hunt-total-time">0.0s</span>
          </div>
        </div>

        <div class="question-area" id="hunt-question">
          <!-- Question will be inserted here -->
        </div>

        <div class="star-targets">
          <span class="star-target">⭐⭐⭐ &lt;30s</span>
          <span class="star-target">⭐⭐ &lt;45s</span>
          <span class="star-target">⭐ &lt;60s</span>
        </div>
      </div>
    `;

    this.createModal(`🏹 HUNTING - ${this.getTierName()} Territory`, content);
  }

  getTierName() {
    const names = { 1: 'Boar', 2: 'Wolf', 3: 'Bear' };
    return names[this.tier] || 'Unknown';
  }

  showNextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.endMinigame();
      return;
    }

    const question = this.generateQuestion();
    if (!question) {
      this.endMinigame();
      return;
    }

    this.currentQuestion = question;
    this.currentQuestionIndex++;
    this.questionStartTime = Date.now();

    document.getElementById('hunt-question-num').textContent = this.currentQuestionIndex;

    const questionArea = document.getElementById('hunt-question');
    if (!questionArea) return;

    questionArea.innerHTML = `
      <div class="question-prompt hunting-prompt">
        <span class="question-word">"${question.word}" = ?</span>
      </div>
      <div class="answer-grid">
        ${question.options.map((opt, i) => `
          <button class="answer-btn minigame-answer" data-answer="${opt}" onclick="resourceMinigameManager.handleHuntingAnswer('${opt.replace(/'/g, "\\'")}')">
            <span class="key-hint">${i + 1}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  }

  handleAnswer(answer) {
    if (!this.isActive) return;

    const answerTime = Date.now() - this.questionStartTime;
    const isCorrect = answer === this.currentQuestion.correctAnswer;

    if (isCorrect) {
      this.totalTime += answerTime;
      this.score++;
      this.showFeedback(`✓ +${(answerTime / 1000).toFixed(1)}s`, 'correct');
    } else {
      this.totalTime += answerTime + this.wrongPenalty;
      this.mistakes++;
      this.showFeedback(`✗ +${((answerTime + this.wrongPenalty) / 1000).toFixed(1)}s (Answer: ${this.currentQuestion.correctAnswer})`, 'wrong');
    }

    this.updateTimeDisplay();

    setTimeout(() => {
      if (this.isActive) this.showNextQuestion();
    }, isCorrect ? 300 : 800);
  }

  updateTimeDisplay() {
    const timeDisplay = document.getElementById('hunt-total-time');
    if (timeDisplay) {
      timeDisplay.textContent = `${(this.totalTime / 1000).toFixed(1)}s`;
    }
  }

  showFeedback(message, type) {
    const questionArea = document.getElementById('hunt-question');
    if (!questionArea) return;

    const feedback = document.createElement('div');
    feedback.className = `minigame-feedback ${type}`;
    feedback.textContent = message;
    questionArea.appendChild(feedback);

    setTimeout(() => feedback.remove(), 800);
  }

  getStars() {
    if (this.totalTime < this.starThresholds[3]) return 3;
    if (this.totalTime < this.starThresholds[2]) return 2;
    if (this.totalTime < this.starThresholds[1]) return 1;
    return 0;
  }

  endMinigame() {
    this.isActive = false;

    // Calculate resources based on stars
    const stars = this.getStars();
    this.resources = stars;

    // Perfect run bonus
    if (this.mistakes === 0 && stars === 3) {
      this.resources += 1; // Bonus rare hide
    }

    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const output = this.getResourceOutput();
    const stars = this.getStars();
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🏹 Hunt Complete!</h3>
        <div class="star-rating">
          ${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}
        </div>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Total Time:</span>
            <span class="result-value">${(this.totalTime / 1000).toFixed(1)}s</span>
          </div>
          <div class="result-item">
            <span class="result-label">Mistakes:</span>
            <span class="result-value">${this.mistakes}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Hides Gathered:</span>
            <span class="result-value">${finalYield} ${output.name}</span>
          </div>
          ${this.mistakes === 0 && stars === 3 ? '<div class="result-bonus">🎯 Perfect Hunt! +1 Rare Hide</div>' : ''}
        </div>
        ${breakdownHTML}
        <div class="results-resources">
          ${output.icon.repeat(Math.min(finalYield, 10))}
        </div>
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 2: HERBALISM - MATCHING PAIRS
// =====================================================

class HerbalismMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('herbalism', tier);
    this.pairCount = 6;
    this.pairs = [];
    this.selectedFrench = null;
    this.selectedEnglish = null;
    this.matched = 0;
    this.mistakes = 0;
  }

  start() {
    super.start();
    this.matched = 0;
    this.mistakes = 0;
    this.selectedFrench = null;
    this.selectedEnglish = null;
    this.generatePairs();
    this.showMinigameUI();
  }

  generatePairs() {
    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    this.pairs = shuffled.slice(0, this.pairCount).map(word => ({
      french: word.french,
      english: word.english,
      matched: false
    }));
  }

  showMinigameUI() {
    const output = this.getResourceOutput();
    const content = `
      <div class="herbalism-ui">
        <div class="herbalism-instructions">
          Match the French words to their English meanings
        </div>

        <div class="matching-columns">
          <div class="french-column" id="herb-french">
            ${this.renderFrenchWords()}
          </div>
          <div class="english-column" id="herb-english">
            ${this.renderEnglishWords()}
          </div>
        </div>

        <div class="matching-status">
          <span>Pairs Found: <span id="herb-matched">${this.matched}</span>/${this.pairCount}</span>
          <span>Mistakes: <span id="herb-mistakes">${this.mistakes}</span></span>
        </div>

        <div class="resource-counter">
          Herbs gathered: <span id="herb-resource-icons"></span>
          <span id="herb-resource-count">(0 ${output.name})</span>
        </div>
      </div>
    `;

    this.createModal(`🌿 HERBALISM - ${this.getTierName()} Gathering`, content);
  }

  getTierName() {
    const names = { 1: 'Meadow', 2: 'Garden', 3: 'Moonlit' };
    return names[this.tier] || 'Unknown';
  }

  renderFrenchWords() {
    // Shuffle for display
    const shuffled = [...this.pairs].sort(() => Math.random() - 0.5);
    return shuffled.map(pair => `
      <button class="match-word french-word ${pair.matched ? 'matched' : ''}"
              data-french="${pair.french}"
              ${pair.matched ? 'disabled' : ''}
              onclick="resourceMinigameManager.handleHerbalismSelect('french', '${pair.french.replace(/'/g, "\\'")}')">
        ${pair.french}
      </button>
    `).join('');
  }

  renderEnglishWords() {
    // Shuffle for display
    const shuffled = [...this.pairs].sort(() => Math.random() - 0.5);
    return shuffled.map(pair => `
      <button class="match-word english-word ${pair.matched ? 'matched' : ''}"
              data-english="${pair.english}"
              ${pair.matched ? 'disabled' : ''}
              onclick="resourceMinigameManager.handleHerbalismSelect('english', '${pair.english.replace(/'/g, "\\'")}')">
        ${pair.english}
      </button>
    `).join('');
  }

  handleSelect(type, value) {
    if (!this.isActive) return;

    // Clear previous selection of same type
    if (type === 'french') {
      this.selectedFrench = value;
      this.highlightSelection('french', value);
    } else {
      this.selectedEnglish = value;
      this.highlightSelection('english', value);
    }

    // Check for match if both selected
    if (this.selectedFrench && this.selectedEnglish) {
      this.checkMatch();
    }
  }

  highlightSelection(type, value) {
    const column = document.getElementById(type === 'french' ? 'herb-french' : 'herb-english');
    if (!column) return;

    column.querySelectorAll('.match-word').forEach(btn => {
      btn.classList.remove('selected');
      const dataAttr = type === 'french' ? 'french' : 'english';
      if (btn.dataset[dataAttr] === value) {
        btn.classList.add('selected');
      }
    });
  }

  checkMatch() {
    const pair = this.pairs.find(p =>
      p.french === this.selectedFrench &&
      p.english === this.selectedEnglish
    );

    if (pair) {
      // Correct match
      pair.matched = true;
      this.matched++;
      this.resources++;

      this.showMatchFeedback(true);
      this.updateDisplay();

      if (this.matched >= this.pairCount) {
        setTimeout(() => this.endMinigame(), 500);
      }
    } else {
      // Wrong match
      this.mistakes++;
      this.showMatchFeedback(false);

      // Brief shake animation then clear selection
      setTimeout(() => {
        this.clearSelections();
      }, 500);
    }

    // Reset selections after check
    setTimeout(() => {
      this.selectedFrench = null;
      this.selectedEnglish = null;
    }, 300);
  }

  showMatchFeedback(success) {
    const frenchBtn = document.querySelector(`[data-french="${this.selectedFrench}"]`);
    const englishBtn = document.querySelector(`[data-english="${this.selectedEnglish}"]`);

    if (success) {
      frenchBtn?.classList.add('match-success');
      englishBtn?.classList.add('match-success');
      setTimeout(() => {
        frenchBtn?.classList.add('matched');
        englishBtn?.classList.add('matched');
        frenchBtn?.classList.remove('match-success', 'selected');
        englishBtn?.classList.remove('match-success', 'selected');
      }, 300);
    } else {
      frenchBtn?.classList.add('match-fail');
      englishBtn?.classList.add('match-fail');
      setTimeout(() => {
        frenchBtn?.classList.remove('match-fail', 'selected');
        englishBtn?.classList.remove('match-fail', 'selected');
      }, 500);
    }
  }

  clearSelections() {
    document.querySelectorAll('.match-word').forEach(btn => {
      btn.classList.remove('selected', 'match-fail');
    });
  }

  updateDisplay() {
    const output = this.getResourceOutput();

    document.getElementById('herb-matched').textContent = this.matched;
    document.getElementById('herb-mistakes').textContent = this.mistakes;

    const icons = document.getElementById('herb-resource-icons');
    const count = document.getElementById('herb-resource-count');

    if (icons) {
      icons.textContent = output.icon.repeat(Math.min(this.resources, 10));
    }
    if (count) count.textContent = `(${this.resources} ${output.name})`;
  }

  endMinigame() {
    this.isActive = false;

    // Bonus for few mistakes
    if (this.mistakes === 0) {
      this.resources += 2;
    } else if (this.mistakes <= 2) {
      this.resources += 1;
    }

    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const output = this.getResourceOutput();
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🌿 Gathering Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Herbs Gathered:</span>
            <span class="result-value">${finalYield} ${output.name}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Pairs Matched:</span>
            <span class="result-value">${this.matched}/${this.pairCount}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Mistakes:</span>
            <span class="result-value">${this.mistakes}</span>
          </div>
          ${this.mistakes === 0 ? '<div class="result-bonus">🌟 Perfect! +2 bonus herbs</div>' :
            this.mistakes <= 2 ? '<div class="result-bonus">✨ Great job! +1 bonus herb</div>' : ''}
        </div>
        ${breakdownHTML}
        <div class="results-resources">
          ${output.icon.repeat(Math.min(finalYield, 20))}
        </div>
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 2: FISHING - REACTION + QUESTION
// =====================================================

const FishingState = {
  WAITING: 'waiting',
  BITE: 'bite',
  QUESTION: 'question',
  CAUGHT: 'caught',
  ESCAPED: 'escaped',
  COMPLETE: 'complete'
};

class FishingMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('fishing', tier);
    this.maxAttempts = 5;
    this.currentAttempt = 0;
    this.state = FishingState.WAITING;
    this.biteTimeout = null;
    this.reactionTimeout = null;
    this.reactionWindow = 1500; // 1.5 seconds
    this.reactionStartTime = 0;
    this.keyListener = null;
  }

  start() {
    super.start();
    this.currentAttempt = 0;
    this.state = FishingState.WAITING;
    this.showMinigameUI();
    this.setupKeyListener();
    this.startWaiting();
  }

  showMinigameUI() {
    const output = this.getResourceOutput();
    const content = `
      <div class="fishing-ui">
        <div class="fishing-scene" id="fishing-scene">
          <div class="water-animation">
            <span class="wave">~~~~~~~~</span>
            <span class="fishing-pole" id="fishing-pole">🎣</span>
            <span class="wave">~~~~~~~~</span>
          </div>
          <div class="fishing-message" id="fishing-message">
            Waiting for a bite...
          </div>
        </div>

        <div class="fishing-area" id="fishing-question">
          <!-- Question or reaction prompt will appear here -->
        </div>

        <div class="fishing-status">
          <span>Fish Caught: <span id="fish-icons"></span> <span id="fish-count">(0 ${output.name})</span></span>
          <span>Attempts: <span id="fish-attempts">${this.currentAttempt}</span>/${this.maxAttempts}</span>
        </div>
      </div>
    `;

    this.createModal(`🎣 FISHING - ${this.getTierName()} Waters`, content);
  }

  getTierName() {
    const names = { 1: 'River', 2: 'Lake', 3: 'Sea' };
    return names[this.tier] || 'Unknown';
  }

  setupKeyListener() {
    this.keyListener = (e) => {
      if (e.code === 'Space' && this.state === FishingState.BITE) {
        e.preventDefault();
        this.onReaction();
      }
    };
    document.addEventListener('keydown', this.keyListener);
  }

  removeKeyListener() {
    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
      this.keyListener = null;
    }
  }

  startWaiting() {
    if (this.currentAttempt >= this.maxAttempts) {
      this.endMinigame();
      return;
    }

    this.currentAttempt++;
    this.state = FishingState.WAITING;

    document.getElementById('fish-attempts').textContent = this.currentAttempt;

    const scene = document.getElementById('fishing-scene');
    const message = document.getElementById('fishing-message');
    const questionArea = document.getElementById('fishing-question');

    if (scene) scene.className = 'fishing-scene waiting';
    if (message) message.textContent = 'Waiting for a bite...';
    if (questionArea) questionArea.innerHTML = '';

    // Random wait time between 2-6 seconds
    const waitTime = 2000 + Math.random() * 4000;
    this.biteTimeout = setTimeout(() => this.triggerBite(), waitTime);
  }

  triggerBite() {
    this.state = FishingState.BITE;
    this.reactionStartTime = Date.now();

    const scene = document.getElementById('fishing-scene');
    const message = document.getElementById('fishing-message');
    const questionArea = document.getElementById('fishing-question');

    if (scene) scene.className = 'fishing-scene bite';
    if (message) message.innerHTML = '!! BITE !! Press <kbd>SPACE</kbd> quickly!';

    if (questionArea) {
      questionArea.innerHTML = `
        <div class="reaction-bar">
          <div class="reaction-fill" id="reaction-fill"></div>
        </div>
        <button class="reaction-btn" onclick="resourceMinigameManager.handleFishingReaction()">
          ⚡ STRIKE! (or press SPACE)
        </button>
      `;

      // Animate reaction bar
      const fill = document.getElementById('reaction-fill');
      if (fill) {
        fill.style.animation = `reaction-countdown ${this.reactionWindow}ms linear forwards`;
      }
    }

    // Set reaction timeout
    this.reactionTimeout = setTimeout(() => this.onReactionTimeout(), this.reactionWindow);
  }

  onReaction() {
    if (this.state !== FishingState.BITE) return;

    clearTimeout(this.reactionTimeout);
    const reactionTime = Date.now() - this.reactionStartTime;

    this.state = FishingState.QUESTION;
    this.showQuestion(reactionTime);
  }

  onReactionTimeout() {
    if (this.state !== FishingState.BITE) return;

    this.state = FishingState.ESCAPED;
    this.showEscaped('Too slow! The fish got away.');
  }

  showQuestion(reactionTime) {
    const question = this.generateQuestion();
    if (!question) {
      this.startWaiting();
      return;
    }

    this.currentQuestion = question;
    this.currentReactionTime = reactionTime;

    const scene = document.getElementById('fishing-scene');
    const message = document.getElementById('fishing-message');
    const questionArea = document.getElementById('fishing-question');

    if (scene) scene.className = 'fishing-scene hooked';
    if (message) message.textContent = '🐟 Fish on the line!';

    if (questionArea) {
      questionArea.innerHTML = `
        <div class="fishing-question-prompt">
          Quick! What does "${question.word}" mean?
        </div>
        <div class="answer-grid">
          ${question.options.map((opt, i) => `
            <button class="answer-btn minigame-answer" data-answer="${opt}" onclick="resourceMinigameManager.handleFishingAnswer('${opt.replace(/'/g, "\\'")}')">
              <span class="key-hint">${i + 1}</span>
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    }
  }

  handleAnswer(answer) {
    if (this.state !== FishingState.QUESTION) return;

    const isCorrect = answer === this.currentQuestion.correctAnswer;

    if (isCorrect) {
      this.state = FishingState.CAUGHT;
      this.resources++;

      // Rare fish chance for fast reaction + correct answer
      if (this.currentReactionTime < 500 && Math.random() < 0.3) {
        this.resources++;
        this.showCaught(true);
      } else {
        this.showCaught(false);
      }
    } else {
      this.state = FishingState.ESCAPED;
      this.showEscaped(`Wrong! The fish escaped. (Answer: ${this.currentQuestion.correctAnswer})`);
    }
  }

  showCaught(isRare) {
    const output = this.getResourceOutput();
    const message = document.getElementById('fishing-message');
    const questionArea = document.getElementById('fishing-question');
    const scene = document.getElementById('fishing-scene');

    if (scene) scene.className = 'fishing-scene caught';
    if (message) message.textContent = isRare ? '🌟 Rare catch!' : '✓ Fish caught!';

    if (questionArea) {
      questionArea.innerHTML = `
        <div class="catch-result success">
          ${isRare ? '🌟 Rare fish! +2' : '🐟 +1 ' + output.name}
        </div>
      `;
    }

    this.updateFishDisplay();

    setTimeout(() => this.startWaiting(), 1500);
  }

  showEscaped(reason) {
    const message = document.getElementById('fishing-message');
    const questionArea = document.getElementById('fishing-question');
    const scene = document.getElementById('fishing-scene');

    if (scene) scene.className = 'fishing-scene escaped';
    if (message) message.textContent = 'The fish escaped!';

    if (questionArea) {
      questionArea.innerHTML = `
        <div class="catch-result failure">
          ${reason}
        </div>
      `;
    }

    setTimeout(() => this.startWaiting(), 1500);
  }

  updateFishDisplay() {
    const output = this.getResourceOutput();
    const icons = document.getElementById('fish-icons');
    const count = document.getElementById('fish-count');

    if (icons) {
      icons.textContent = output.icon.repeat(Math.min(this.resources, 10));
    }
    if (count) count.textContent = `(${this.resources} ${output.name})`;
  }

  endMinigame() {
    clearTimeout(this.biteTimeout);
    clearTimeout(this.reactionTimeout);
    this.removeKeyListener();
    this.isActive = false;
    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const output = this.getResourceOutput();
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🎣 Fishing Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Fish Caught:</span>
            <span class="result-value">${finalYield} ${output.name}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Attempts:</span>
            <span class="result-value">${this.maxAttempts}</span>
          </div>
        </div>
        ${breakdownHTML}
        <div class="results-resources">
          ${output.icon.repeat(Math.min(finalYield, 10))}
        </div>
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 3: WORD SCRAMBLE
// =====================================================

class WordScrambleMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('mining', tier); // Reuses mining vocab
    this.totalWords = 8;
    this.currentWordIndex = 0;
    this.currentWord = null;
    this.scrambledLetters = [];
    this.selectedLetters = [];
    this.correctWords = 0;
    this.hintsUsed = 0;
  }

  start() {
    super.start();
    this.currentWordIndex = 0;
    this.correctWords = 0;
    this.hintsUsed = 0;
    this.showMinigameUI();
    this.showNextWord();
  }

  showMinigameUI() {
    const content = `
      <div class="scramble-ui">
        <div class="scramble-progress">
          Word <span id="scramble-word-num">1</span>/${this.totalWords}
        </div>

        <div class="scramble-prompt" id="scramble-prompt">
          <!-- Prompt will appear here -->
        </div>

        <div class="scramble-letters" id="scramble-available">
          <!-- Available letters -->
        </div>

        <div class="scramble-answer-area">
          <div class="scramble-answer" id="scramble-answer">
            <!-- Selected letters -->
          </div>
        </div>

        <div class="scramble-controls">
          <button class="btn secondary-btn" onclick="resourceMinigameManager.handleScrambleClear()">Clear</button>
          <button class="btn secondary-btn" onclick="resourceMinigameManager.handleScrambleHint()">Hint 💡</button>
          <button class="btn primary-btn" onclick="resourceMinigameManager.handleScrambleSubmit()">Submit</button>
        </div>

        <div class="scramble-status">
          Correct: <span id="scramble-correct">0</span>/${this.totalWords}
        </div>
      </div>
    `;

    this.createModal('🔤 WORD SCRAMBLE', content);
  }

  showNextWord() {
    if (this.currentWordIndex >= this.totalWords) {
      this.endMinigame();
      return;
    }

    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    const word = shuffled[0];

    this.currentWord = word;
    this.currentWordIndex++;
    this.selectedLetters = [];

    // Scramble the French word
    const letters = word.french.replace(/[^a-zA-ZÀ-ÿ]/g, '').split('');
    this.scrambledLetters = letters.sort(() => Math.random() - 0.5);

    document.getElementById('scramble-word-num').textContent = this.currentWordIndex;
    document.getElementById('scramble-prompt').innerHTML = `
      Unscramble the French word for "<strong>${word.english}</strong>"
    `;

    this.renderLetters();
    this.renderAnswer();
  }

  renderLetters() {
    const container = document.getElementById('scramble-available');
    if (!container) return;

    container.innerHTML = this.scrambledLetters.map((letter, i) => `
      <button class="letter-tile ${this.selectedLetters.includes(i) ? 'used' : ''}"
              data-index="${i}"
              ${this.selectedLetters.includes(i) ? 'disabled' : ''}
              onclick="resourceMinigameManager.handleScrambleSelect(${i})">
        ${letter.toUpperCase()}
      </button>
    `).join('');
  }

  renderAnswer() {
    const container = document.getElementById('scramble-answer');
    if (!container) return;

    const targetLength = this.currentWord.french.replace(/[^a-zA-ZÀ-ÿ]/g, '').length;
    let answerHtml = '';

    for (let i = 0; i < targetLength; i++) {
      if (i < this.selectedLetters.length) {
        const letterIndex = this.selectedLetters[i];
        const letter = this.scrambledLetters[letterIndex];
        answerHtml += `
          <button class="letter-tile answer-tile"
                  onclick="resourceMinigameManager.handleScrambleRemove(${i})">
            ${letter.toUpperCase()}
          </button>
        `;
      } else {
        answerHtml += `<span class="letter-slot">_</span>`;
      }
    }

    container.innerHTML = answerHtml;
  }

  handleSelect(index) {
    if (this.selectedLetters.includes(index)) return;

    this.selectedLetters.push(index);
    this.renderLetters();
    this.renderAnswer();
  }

  handleRemove(answerIndex) {
    if (answerIndex >= this.selectedLetters.length) return;

    this.selectedLetters.splice(answerIndex, 1);
    this.renderLetters();
    this.renderAnswer();
  }

  handleClear() {
    this.selectedLetters = [];
    this.renderLetters();
    this.renderAnswer();
  }

  handleHint() {
    const targetWord = this.currentWord.french.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase();

    // Find next correct letter
    for (let i = this.selectedLetters.length; i < targetWord.length; i++) {
      const targetLetter = targetWord[i];

      // Find this letter in scrambled that isn't used
      for (let j = 0; j < this.scrambledLetters.length; j++) {
        if (!this.selectedLetters.includes(j) &&
            this.scrambledLetters[j].toLowerCase() === targetLetter) {
          this.selectedLetters.push(j);
          this.hintsUsed++;
          this.renderLetters();
          this.renderAnswer();
          return;
        }
      }
    }
  }

  handleSubmit() {
    const answer = this.selectedLetters.map(i => this.scrambledLetters[i]).join('').toLowerCase();
    const target = this.currentWord.french.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase();

    if (answer === target) {
      this.correctWords++;
      this.resources++;

      if (this.hintsUsed === 0) {
        this.resources++; // Bonus for no hints
      }

      this.showFeedback('✓ Correct!', 'correct');
      document.getElementById('scramble-correct').textContent = this.correctWords;

      setTimeout(() => this.showNextWord(), 1000);
    } else {
      this.showFeedback(`✗ Try again! (Hint: ${this.currentWord.hint})`, 'wrong');
    }
  }

  showFeedback(message, type) {
    const prompt = document.getElementById('scramble-prompt');
    if (!prompt) return;

    const feedback = document.createElement('div');
    feedback.className = `minigame-feedback ${type}`;
    feedback.textContent = message;
    prompt.appendChild(feedback);

    setTimeout(() => feedback.remove(), 1000);
  }

  endMinigame() {
    this.isActive = false;
    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🔤 Word Scramble Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Words Solved:</span>
            <span class="result-value">${this.correctWords}/${this.totalWords}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Resources Earned:</span>
            <span class="result-value">${finalYield}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Hints Used:</span>
            <span class="result-value">${this.hintsUsed}</span>
          </div>
        </div>
        ${breakdownHTML}
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 3: MEMORY CARD GAME
// =====================================================

class MemoryCardMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('herbalism', tier); // Reuses herbalism vocab
    this.pairCount = 6;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.flips = 0;
    this.isChecking = false;
  }

  start() {
    super.start();
    this.matchedPairs = 0;
    this.flips = 0;
    this.flippedCards = [];
    this.isChecking = false;
    this.generateCards();
    this.showMinigameUI();
  }

  generateCards() {
    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    const words = shuffled.slice(0, this.pairCount);

    // Create pairs (French card + English card)
    this.cards = [];
    words.forEach((word, i) => {
      this.cards.push({
        id: i * 2,
        pairId: i,
        text: word.french,
        type: 'french',
        matched: false,
        flipped: false
      });
      this.cards.push({
        id: i * 2 + 1,
        pairId: i,
        text: word.english,
        type: 'english',
        matched: false,
        flipped: false
      });
    });

    // Shuffle cards
    this.cards.sort(() => Math.random() - 0.5);
  }

  showMinigameUI() {
    const content = `
      <div class="memory-ui">
        <div class="memory-stats">
          <span>Pairs Found: <span id="memory-pairs">0</span>/${this.pairCount}</span>
          <span>Flips: <span id="memory-flips">0</span></span>
        </div>

        <div class="memory-grid" id="memory-grid">
          ${this.renderCards()}
        </div>
      </div>
    `;

    this.createModal('🃏 MEMORY MATCH', content);
  }

  renderCards() {
    return this.cards.map(card => `
      <div class="memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}"
           data-id="${card.id}"
           onclick="resourceMinigameManager.handleMemoryFlip(${card.id})">
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back ${card.type}">${card.text}</div>
        </div>
      </div>
    `).join('');
  }

  handleFlip(cardId) {
    if (this.isChecking) return;

    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    card.flipped = true;
    this.flippedCards.push(card);
    this.flips++;

    this.updateDisplay();

    if (this.flippedCards.length === 2) {
      this.isChecking = true;
      setTimeout(() => this.checkMatch(), 800);
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.pairId === card2.pairId && card1.type !== card2.type) {
      // Match found
      card1.matched = true;
      card2.matched = true;
      this.matchedPairs++;
      this.resources++;

      if (this.matchedPairs >= this.pairCount) {
        setTimeout(() => this.endMinigame(), 500);
      }
    } else {
      // No match - flip back
      card1.flipped = false;
      card2.flipped = false;
    }

    this.flippedCards = [];
    this.isChecking = false;
    this.updateDisplay();
  }

  updateDisplay() {
    document.getElementById('memory-pairs').textContent = this.matchedPairs;
    document.getElementById('memory-flips').textContent = this.flips;
    document.getElementById('memory-grid').innerHTML = this.renderCards();
  }

  endMinigame() {
    this.isActive = false;

    // Bonus for fewer flips
    const perfectFlips = this.pairCount * 2;
    if (this.flips <= perfectFlips + 2) {
      this.resources += 2;
    } else if (this.flips <= perfectFlips + 6) {
      this.resources += 1;
    }

    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const perfectFlips = this.pairCount * 2;
    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🃏 Memory Match Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Pairs Matched:</span>
            <span class="result-value">${this.matchedPairs}/${this.pairCount}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total Flips:</span>
            <span class="result-value">${this.flips} (Perfect: ${perfectFlips})</span>
          </div>
          <div class="result-item">
            <span class="result-label">Resources Earned:</span>
            <span class="result-value">${finalYield}</span>
          </div>
        </div>
        ${breakdownHTML}
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Resources</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// TIER 3: HANGMAN
// =====================================================

class HangmanMinigame extends ResourceMinigame {
  constructor(tier = 1) {
    super('hunting', tier); // Tier 3 hunting minigame - alternate gameplay style
    this.maxWrong = 6;
    this.wrongGuesses = 0;
    this.guessedLetters = [];
    this.currentWord = null;
    this.wordsCompleted = 0;
    this.totalWords = 5;
    this.keyboardHandler = null;
  }

  start() {
    super.start();
    this.wordsCompleted = 0;
    this.showMinigameUI();
    this.startNewWord();
    this.setupKeyboardInput();
  }

  setupKeyboardInput() {
    // Valid letters for hangman (A-Z and French accented characters)
    const validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÄÉÈÊËÏÎÔÙÛÜÇ'.split('');

    this.keyboardHandler = (e) => {
      // Ignore if minigame is not active or word is complete/failed
      if (!this.isActive) return;
      if (this.isWordComplete() || this.wrongGuesses >= this.maxWrong) return;

      // Get the pressed key, convert to uppercase
      const key = e.key.toUpperCase();

      // Check if it's a valid letter for hangman
      if (validLetters.includes(key)) {
        e.preventDefault();
        this.handleGuess(key);
      }
    };

    document.addEventListener('keydown', this.keyboardHandler);
  }

  removeKeyboardInput() {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }

  showMinigameUI() {
    const content = `
      <div class="tracker-ui">
        <div class="tracker-progress">
          Beast <span id="hangman-word-num">1</span>/${this.totalWords}
        </div>

        <div class="tracker-drawing" id="hangman-drawing">
          ${this.renderTrackingProgress()}
        </div>

        <div class="tracker-prompt" id="hangman-prompt">
          <!-- English word hint -->
        </div>

        <div class="tracker-word" id="hangman-word">
          <!-- Word display -->
        </div>

        <div class="tracker-used" id="hangman-used">
          <!-- Used letters -->
        </div>

        <div class="tracker-keyboard" id="hangman-keyboard">
          ${this.renderKeyboard()}
        </div>

        <div class="tracker-status">
          Trail Clues: <span id="hangman-remaining">${this.maxWrong}</span> remaining
        </div>

        <div class="tracker-keyboard-hint">
          Tip: Type letters on your keyboard!
        </div>
      </div>
    `;

    this.createModal('🏹 BEAST TRACKER', content);
  }

  startNewWord() {
    if (this.wordsCompleted >= this.totalWords) {
      this.endMinigame();
      return;
    }

    const shuffled = [...this.vocabulary].sort(() => Math.random() - 0.5);
    this.currentWord = shuffled[0];
    this.wrongGuesses = 0;
    this.guessedLetters = [];
    this.wordsCompleted++;

    document.getElementById('hangman-word-num').textContent = this.wordsCompleted;
    this.updateDisplay();
  }

  renderTrackingProgress() {
    // Beast escaping visualization - each wrong guess lets the beast escape further
    const escapeProgress = this.wrongGuesses; // 0-6
    const maxEscape = this.maxWrong;

    // Beast position (moves right as it escapes)
    const beastX = 25 + (escapeProgress * 10);

    // Trail/tracks that fade as beast escapes
    const tracks = [];
    for (let i = 0; i < maxEscape; i++) {
      const opacity = i < escapeProgress ? 0.2 : 0.7;
      const trackX = 30 + (i * 10);
      tracks.push(`<text x="${trackX}" y="70" font-size="8" opacity="${opacity}">.</text>`);
    }

    // Beast visibility (fades as it escapes)
    const beastOpacity = Math.max(0.15, 1 - (escapeProgress / maxEscape));
    const escaped = escapeProgress >= maxEscape;

    return `
      <svg viewBox="0 0 100 100" class="tracker-svg">
        <!-- Forest background -->
        <text x="5" y="22" font-size="16" opacity="0.25">T</text>
        <text x="88" y="28" font-size="14" opacity="0.2">T</text>
        <text x="48" y="18" font-size="12" opacity="0.15">T</text>

        <!-- Hunter -->
        <text x="12" y="58" font-size="18">^</text>

        <!-- Tracks/trail -->
        <g fill="var(--text-muted)">
          ${tracks.join('')}
        </g>

        <!-- Beast -->
        <text x="${beastX}" y="55" font-size="20" opacity="${beastOpacity}">${escaped ? '~' : 'W'}</text>

        <!-- Trail strength meter -->
        <rect x="10" y="82" width="80" height="6" fill="var(--bg-dark)" rx="2"/>
        <rect x="10" y="82" width="${80 - (escapeProgress * (80/maxEscape))}" height="6" fill="#8B4513" rx="2"/>
        <text x="50" y="96" font-size="5" fill="var(--text-muted)" text-anchor="middle">Trail Strength</text>
      </svg>
    `;
  }

  renderKeyboard() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    // Add French special characters
    const special = 'ÀÂÄÉÈÊËÏÎÔÙÛÜÇ'.split('');
    const allLetters = [...letters, ...special];

    return allLetters.map(letter => `
      <button class="keyboard-key ${this.guessedLetters.includes(letter.toLowerCase()) ? 'used' : ''}"
              data-letter="${letter}"
              ${this.guessedLetters.includes(letter.toLowerCase()) ? 'disabled' : ''}
              onclick="resourceMinigameManager.handleHangmanGuess('${letter}')">
        ${letter}
      </button>
    `).join('');
  }

  renderWord() {
    const word = this.currentWord.french.toLowerCase();
    return word.split('').map(char => {
      if (char === ' ' || char === '-' || char === "'") {
        return `<span class="word-char special">${char}</span>`;
      }
      const isGuessed = this.guessedLetters.includes(char.toLowerCase());
      return `<span class="word-char ${isGuessed ? 'revealed' : ''}">${isGuessed ? char.toUpperCase() : '_'}</span>`;
    }).join('');
  }

  handleGuess(letter) {
    letter = letter.toLowerCase();
    if (this.guessedLetters.includes(letter)) return;

    this.guessedLetters.push(letter);

    const word = this.currentWord.french.toLowerCase();
    if (!word.includes(letter)) {
      this.wrongGuesses++;
    }

    this.updateDisplay();

    // Check win/lose
    if (this.isWordComplete()) {
      this.resources++;
      if (this.wrongGuesses === 0) this.resources++; // Bonus for perfect

      setTimeout(() => {
        if (this.wordsCompleted < this.totalWords) {
          this.startNewWord();
        } else {
          this.endMinigame();
        }
      }, 1000);
    } else if (this.wrongGuesses >= this.maxWrong) {
      setTimeout(() => {
        if (this.wordsCompleted < this.totalWords) {
          this.startNewWord();
        } else {
          this.endMinigame();
        }
      }, 1500);
    }
  }

  isWordComplete() {
    const word = this.currentWord.french.toLowerCase();
    return word.split('').every(char =>
      char === ' ' || char === '-' || char === "'" ||
      this.guessedLetters.includes(char)
    );
  }

  updateDisplay() {
    document.getElementById('hangman-drawing').innerHTML = this.renderTrackingProgress();
    document.getElementById('hangman-prompt').innerHTML = `
      Track the beast: "<strong>${this.currentWord.english}</strong>"
    `;
    document.getElementById('hangman-word').innerHTML = this.renderWord();
    document.getElementById('hangman-keyboard').innerHTML = this.renderKeyboard();
    document.getElementById('hangman-remaining').textContent = this.maxWrong - this.wrongGuesses;
    document.getElementById('hangman-used').innerHTML = `
      Tried: ${this.guessedLetters.map(l => l.toUpperCase()).join(', ') || 'None'}
    `;

    // Show result if won or lost
    if (this.isWordComplete()) {
      document.getElementById('hangman-prompt').innerHTML += '<div class="minigame-feedback correct">Beast captured!</div>';
    } else if (this.wrongGuesses >= this.maxWrong) {
      document.getElementById('hangman-prompt').innerHTML += `<div class="minigame-feedback wrong">Beast escaped! It was: ${this.currentWord.french}</div>`;
      document.getElementById('hangman-word').innerHTML = this.currentWord.french.split('').map(c =>
        `<span class="word-char revealed">${c.toUpperCase()}</span>`
      ).join('');
    }
  }

  endMinigame() {
    this.isActive = false;
    this.removeKeyboardInput();
    this.showResults();
  }

  showResults() {
    // Grant resources first so breakdown is available
    this.grantResources();

    const finalYield = this.yieldBreakdown ? this.yieldBreakdown.total : this.resources;
    const breakdownHTML = this.getYieldBreakdownHTML();

    const content = `
      <div class="minigame-results">
        <h3>🏹 Hunt Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Beasts Tracked:</span>
            <span class="result-value">${this.wordsCompleted}/${this.totalWords}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Pelts Earned:</span>
            <span class="result-value">${finalYield}</span>
          </div>
        </div>
        ${breakdownHTML}
        <button class="btn primary-btn" onclick="resourceMinigameManager.closeMinigame()">Collect Pelts</button>
      </div>
    `;

    this.updateModal(content);
  }

  end() {
    this.endMinigame();
  }
}

// =====================================================
// MINIGAME MANAGER
// =====================================================

class ResourceMinigameManager {
  constructor() {
    this.currentMinigame = null;
    this.keyListener = null;
  }

  // Start a specific minigame
  // NOTE: 1 minigame per resource type. The classes WordScrambleMinigame, MemoryCardMinigame,
  // and HangmanMinigame exist but are disabled until new resource types are added to the game.
  startMinigame(type, resourceType, tier = 1) {
    if (this.currentMinigame) {
      this.closeMinigame();
    }

    switch (type) {
      case 'mining':
        this.currentMinigame = new MiningMinigame(tier);
        break;
      case 'woodcutting':
        this.currentMinigame = new WoodcuttingMinigame(tier);
        break;
      case 'hunting':
        this.currentMinigame = new HuntingMinigame(tier);
        break;
      case 'herbalism':
        this.currentMinigame = new HerbalismMinigame(tier);
        break;
      case 'fishing':
        this.currentMinigame = new FishingMinigame(tier);
        break;
      // DISABLED: These minigames are reserved for future resource types
      // Each resource type should have exactly 1 minigame
      // case 'scramble':
      //   this.currentMinigame = new WordScrambleMinigame(tier);
      //   break;
      // case 'memory':
      //   this.currentMinigame = new MemoryCardMinigame(tier);
      //   break;
      // case 'hangman':
      //   this.currentMinigame = new HangmanMinigame(tier);
      //   break;
      default:
        console.error('Unknown minigame type:', type);
        return;
    }

    this.setupKeyboardShortcuts();
    this.currentMinigame.start();

    // Show tutorial on first gathering minigame
    if (typeof showTutorialTip === 'function') {
      showTutorialTip('gathering', '.minigame-container', () => {});
    }
  }

  setupKeyboardShortcuts() {
    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
    }

    this.keyListener = (e) => {
      // Number keys for answer selection
      if (e.key >= '1' && e.key <= '4') {
        const buttons = document.querySelectorAll('.minigame-answer');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
          buttons[index].click();
        }
      }

      // Escape to close
      if (e.key === 'Escape') {
        this.closeMinigame();
      }
    };

    document.addEventListener('keydown', this.keyListener);
  }

  closeMinigame() {
    if (this.currentMinigame) {
      if (this.currentMinigame.isActive) {
        this.currentMinigame.end();
      }
      this.currentMinigame.closeModal();
      this.currentMinigame = null;
    }

    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
      this.keyListener = null;
    }
  }

  // Handler methods for minigame interactions
  handleMiningAnswer(answer) {
    if (this.currentMinigame instanceof MiningMinigame) {
      this.currentMinigame.handleAnswer(answer);
    }
  }

  handleWoodcuttingAnswer(answer) {
    if (this.currentMinigame instanceof WoodcuttingMinigame) {
      this.currentMinigame.handleAnswer(answer);
    }
  }

  handleHuntingAnswer(answer) {
    if (this.currentMinigame instanceof HuntingMinigame) {
      this.currentMinigame.handleAnswer(answer);
    }
  }

  handleHerbalismSelect(type, value) {
    if (this.currentMinigame instanceof HerbalismMinigame) {
      this.currentMinigame.handleSelect(type, value);
    }
  }

  handleFishingReaction() {
    if (this.currentMinigame instanceof FishingMinigame) {
      this.currentMinigame.onReaction();
    }
  }

  handleFishingAnswer(answer) {
    if (this.currentMinigame instanceof FishingMinigame) {
      this.currentMinigame.handleAnswer(answer);
    }
  }

  handleScrambleSelect(index) {
    if (this.currentMinigame instanceof WordScrambleMinigame) {
      this.currentMinigame.handleSelect(index);
    }
  }

  handleScrambleRemove(index) {
    if (this.currentMinigame instanceof WordScrambleMinigame) {
      this.currentMinigame.handleRemove(index);
    }
  }

  handleScrambleClear() {
    if (this.currentMinigame instanceof WordScrambleMinigame) {
      this.currentMinigame.handleClear();
    }
  }

  handleScrambleHint() {
    if (this.currentMinigame instanceof WordScrambleMinigame) {
      this.currentMinigame.handleHint();
    }
  }

  handleScrambleSubmit() {
    if (this.currentMinigame instanceof WordScrambleMinigame) {
      this.currentMinigame.handleSubmit();
    }
  }

  handleMemoryFlip(cardId) {
    if (this.currentMinigame instanceof MemoryCardMinigame) {
      this.currentMinigame.handleFlip(cardId);
    }
  }

  handleHangmanGuess(letter) {
    if (this.currentMinigame instanceof HangmanMinigame) {
      this.currentMinigame.handleGuess(letter);
    }
  }
}

// Create global instance
const resourceMinigameManager = new ResourceMinigameManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ResourceMinigameManager,
    MiningMinigame,
    WoodcuttingMinigame,
    HuntingMinigame,
    HerbalismMinigame,
    FishingMinigame,
    WordScrambleMinigame,
    MemoryCardMinigame,
    HangmanMinigame,
    RESOURCE_VOCABULARY,
    RESOURCE_OUTPUTS
  };
}
