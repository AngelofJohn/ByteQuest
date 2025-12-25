// ByteQuest Encounter System
// Dynamic encounters that integrate French learning into travel/quests
// Version 1.0

// =====================================================
// ENCOUNTER VOCABULARY DATA
// =====================================================

const ENCOUNTER_VOCABULARY = {
  travel: {
    directions: [
      { french: "à gauche", english: "to the left", hint: "Left side" },
      { french: "à droite", english: "to the right", hint: "Right side" },
      { french: "tout droit", english: "straight ahead", hint: "Keep going" },
      { french: "le nord", english: "north", hint: "Up on map" },
      { french: "le sud", english: "south", hint: "Down on map" },
      { french: "l'est", english: "east", hint: "Right on map" },
      { french: "l'ouest", english: "west", hint: "Left on map" },
      { french: "devant", english: "in front", hint: "Ahead" },
      { french: "derrière", english: "behind", hint: "Back" }
    ],
    signs: [
      { french: "Danger", english: "Danger", hint: "Warning!" },
      { french: "Attention", english: "Caution", hint: "Be careful" },
      { french: "Interdit", english: "Forbidden", hint: "Not allowed" },
      { french: "Entrée", english: "Entry", hint: "Way in" },
      { french: "Sortie", english: "Exit", hint: "Way out" },
      { french: "Arrêt", english: "Stop", hint: "Halt" },
      { french: "Passage", english: "Passage", hint: "Way through" },
      { french: "Route", english: "Road", hint: "Path" },
      { french: "Pont", english: "Bridge", hint: "Over water" },
      { french: "Village", english: "Village", hint: "Small town" }
    ],
    numbers: [
      { french: "un", english: "one", hint: "1" },
      { french: "deux", english: "two", hint: "2" },
      { french: "trois", english: "three", hint: "3" },
      { french: "quatre", english: "four", hint: "4" },
      { french: "cinq", english: "five", hint: "5" },
      { french: "dix", english: "ten", hint: "10" },
      { french: "vingt", english: "twenty", hint: "20" },
      { french: "cent", english: "hundred", hint: "100" }
    ]
  },

  social: {
    greetings: [
      { french: "Bonjour", english: "Hello/Good day", hint: "Daytime greeting" },
      { french: "Bonsoir", english: "Good evening", hint: "Evening greeting" },
      { french: "Au revoir", english: "Goodbye", hint: "Farewell" },
      { french: "Merci", english: "Thank you", hint: "Gratitude" },
      { french: "S'il vous plaît", english: "Please", hint: "Polite request" },
      { french: "Pardon", english: "Excuse me", hint: "Apology" },
      { french: "Oui", english: "Yes", hint: "Affirmative" },
      { french: "Non", english: "No", hint: "Negative" }
    ],
    questions: [
      { french: "Comment allez-vous?", english: "How are you?", hint: "Asking about wellbeing" },
      { french: "Où allez-vous?", english: "Where are you going?", hint: "Asking destination" },
      { french: "D'où venez-vous?", english: "Where do you come from?", hint: "Asking origin" },
      { french: "Combien?", english: "How much/many?", hint: "Asking quantity" },
      { french: "Pourquoi?", english: "Why?", hint: "Asking reason" },
      { french: "Quand?", english: "When?", hint: "Asking time" }
    ]
  }
};

// =====================================================
// ENCOUNTER SCENARIOS
// =====================================================

const ENCOUNTER_SCENARIOS = {
  // Sign reading encounters - player must interpret French signs
  sign_reading: {
    crossroads: {
      id: "crossroads",
      title: "The Crossroads",
      description: "You reach a crossroads. A weathered sign post stands at the center.",
      narrative: "The merchant squints at the signs. 'My eyes aren't what they used to be. Can you read what they say?'",
      type: "sign_reading",
      questions: [
        {
          setup: "The sign pointing left reads:",
          sign: "Danger - Brigands",
          question: "What does this sign warn about?",
          options: ["Dangerous bandits", "Dangerous bridge", "Dangerous animals", "Dangerous weather"],
          correct: "Dangerous bandits",
          consequence_wrong: { damage: 5, narrative: "You take the dangerous path and narrowly escape a bandit ambush!" }
        },
        {
          setup: "The sign pointing right reads:",
          sign: "Route vers Haari - 2 lieues",
          question: "What does this sign indicate?",
          options: ["Road to Haari - 2 leagues", "Road closed", "Road to the river", "Dangerous road"],
          correct: "Road to Haari - 2 leagues",
          consequence_wrong: { delay: true, narrative: "You take the wrong path and lose time backtracking." }
        }
      ]
    },

    warning_post: {
      id: "warning_post",
      title: "Warning Post",
      description: "A wooden post with a painted sign blocks part of the road.",
      narrative: "The merchant slows the cart. 'What does that say? I don't want to drive into trouble.'",
      type: "sign_reading",
      questions: [
        {
          setup: "The sign reads:",
          sign: "Attention - Pont endommagé",
          question: "What is the warning about?",
          options: ["Damaged bridge", "Damaged road", "Wild animals ahead", "Toll required"],
          correct: "Damaged bridge",
          consequence_wrong: { damage: 10, narrative: "The cart nearly falls through the weakened bridge!" }
        }
      ]
    }
  },

  // Dialogue challenges - respond appropriately in French
  dialogue_challenge: {
    toll_gate: {
      id: "toll_gate",
      title: "The Toll Gate",
      description: "A small toll station blocks the road. A bored guard looks up as you approach.",
      narrative: "The guard steps forward and addresses you in formal French.",
      type: "dialogue_challenge",
      questions: [
        {
          setup: "The guard asks:",
          dialogue: "Bonjour, voyageurs. Combien de personnes?",
          question: "How should you respond? (There are 2 of you)",
          options: ["Deux personnes", "Trois personnes", "Bonjour", "Au revoir"],
          correct: "Deux personnes",
          consequence_wrong: { gold: -5, narrative: "The guard fines you for giving incorrect information." }
        },
        {
          setup: "The guard nods and asks:",
          dialogue: "Où allez-vous aujourd'hui?",
          question: "He's asking where you're going. How do you respond?",
          options: ["Nous allons à Haari", "Je viens de Dawnmere", "Il fait beau", "Merci beaucoup"],
          correct: "Nous allons à Haari",
          consequence_wrong: { suspicion: true, narrative: "The guard looks at you suspiciously but waves you through." }
        }
      ]
    },

    lost_traveler: {
      id: "lost_traveler",
      title: "The Lost Traveler",
      description: "A confused-looking traveler waves you down from the roadside.",
      narrative: "She approaches, looking relieved to see other travelers.",
      type: "dialogue_challenge",
      isOptional: true, // Helping is optional but gives bonus
      questions: [
        {
          setup: "The traveler asks:",
          dialogue: "Excusez-moi, où est le village?",
          question: "She's asking for directions. What is she looking for?",
          options: ["The village", "The river", "The road", "The bridge"],
          correct: "The village",
          consequence_wrong: { narrative: "You point vaguely. She looks more confused and wanders off." }
        },
        {
          setup: "You point back toward Dawnmere. She says:",
          dialogue: "Merci beaucoup! Vous êtes très gentil.",
          question: "What did she just say?",
          options: ["Thank you very much! You are very kind.", "The road is dangerous.", "I am lost.", "Goodbye!"],
          correct: "Thank you very much! You are very kind.",
          reward: { reputation: 10, narrative: "She thanks you warmly and gives you a small token of appreciation." }
        }
      ]
    }
  },

  // Quick vocabulary checks during travel
  vocab_check: {
    merchant_lesson: {
      id: "merchant_lesson",
      title: "Road Lessons",
      description: "As you travel, the merchant makes conversation.",
      narrative: "The merchant gestures at the passing scenery. 'Let me teach you some useful words for the road.'",
      type: "vocab_check",
      isPassive: true, // No penalty for wrong, just learning
      questions: [
        {
          setup: "The merchant points at a tree:",
          dialogue: "'That's un arbre. And the road we're on is...'",
          question: "What is the French word for 'road'?",
          options: ["la route", "le pont", "la maison", "le champ"],
          correct: "la route"
        },
        {
          setup: "A bird flies overhead:",
          dialogue: "'Un oiseau! And those fields there...'",
          question: "What is the French word for 'field'?",
          options: ["le champ", "la forêt", "la rivière", "le ciel"],
          correct: "le champ"
        }
      ]
    }
  }
};

// =====================================================
// ENCOUNTER MANAGER CLASS
// =====================================================

class EncounterManager {
  constructor() {
    this.activeEncounter = null;
    this.currentQuestionIndex = 0;
    this.encounterResults = {
      correct: 0,
      wrong: 0,
      damage: 0,
      goldChange: 0,
      reputationChange: 0
    };
    this.modalElement = null;
  }

  /**
   * Start an encounter by ID
   * @param {string} category - Category (sign_reading, dialogue_challenge, etc.)
   * @param {string} encounterId - Specific encounter ID
   * @param {Function} onComplete - Callback when encounter ends
   */
  startEncounter(category, encounterId, onComplete) {
    const scenario = ENCOUNTER_SCENARIOS[category]?.[encounterId];
    if (!scenario) {
      console.error(`Encounter not found: ${category}/${encounterId}`);
      if (onComplete) onComplete({ success: false, error: 'Encounter not found' });
      return;
    }

    this.activeEncounter = {
      ...scenario,
      category,
      onComplete
    };

    this.currentQuestionIndex = 0;
    this.encounterResults = {
      correct: 0,
      wrong: 0,
      damage: 0,
      goldChange: 0,
      reputationChange: 0
    };

    this.showEncounterIntro();

    // Show tutorial on first encounter
    if (typeof showTutorialTip === 'function') {
      showTutorialTip('encounter', '.encounter-modal', () => {});
    }
  }

  showEncounterIntro() {
    const enc = this.activeEncounter;

    const content = `
      <div class="encounter-intro">
        <div class="encounter-scene">
          <p class="encounter-description">${enc.description}</p>
          <p class="encounter-narrative"><em>${enc.narrative}</em></p>
        </div>
        <button class="btn primary-btn" onclick="encounterManager.beginQuestions()">
          Continue
        </button>
      </div>
    `;

    this.createModal(`🗺️ ${enc.title}`, content);
  }

  beginQuestions() {
    this.showNextQuestion();
  }

  showNextQuestion() {
    const enc = this.activeEncounter;
    if (this.currentQuestionIndex >= enc.questions.length) {
      this.endEncounter();
      return;
    }

    const q = enc.questions[this.currentQuestionIndex];

    let questionHTML = `
      <div class="encounter-question">
        <div class="question-setup">
          <p>${q.setup}</p>
    `;

    // Show sign or dialogue based on type
    if (q.sign) {
      questionHTML += `
        <div class="encounter-sign">
          <span class="sign-text">${q.sign}</span>
        </div>
      `;
    } else if (q.dialogue) {
      questionHTML += `
        <div class="encounter-dialogue">
          <span class="dialogue-text">"${q.dialogue}"</span>
        </div>
      `;
    }

    questionHTML += `
        </div>
        <div class="question-prompt">
          <p><strong>${q.question}</strong></p>
        </div>
        <div class="answer-options">
          ${q.options.map((opt, i) => `
            <button class="btn answer-btn encounter-answer" data-answer="${opt}" onclick="encounterManager.handleAnswer('${opt.replace(/'/g, "\\'")}')">
              <span class="key-hint">${i + 1}</span>
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.updateModal(questionHTML);
  }

  handleAnswer(answer) {
    const enc = this.activeEncounter;
    const q = enc.questions[this.currentQuestionIndex];
    const isCorrect = answer === q.correct;

    if (isCorrect) {
      this.encounterResults.correct++;

      // Check for rewards
      if (q.reward) {
        if (q.reward.reputation) {
          this.encounterResults.reputationChange += q.reward.reputation;
        }
        if (q.reward.gold) {
          this.encounterResults.goldChange += q.reward.gold;
        }
      }

      this.showFeedback(true, q.reward?.narrative || "Correct!", () => {
        this.currentQuestionIndex++;
        this.showNextQuestion();
      });
    } else {
      this.encounterResults.wrong++;

      // Apply consequences
      if (q.consequence_wrong) {
        if (q.consequence_wrong.damage) {
          this.encounterResults.damage += q.consequence_wrong.damage;
        }
        if (q.consequence_wrong.gold) {
          this.encounterResults.goldChange += q.consequence_wrong.gold;
        }
      }

      const feedbackText = q.consequence_wrong?.narrative || `Wrong! The answer was: ${q.correct}`;

      this.showFeedback(false, feedbackText, () => {
        this.currentQuestionIndex++;
        this.showNextQuestion();
      });
    }
  }

  showFeedback(isCorrect, message, onContinue) {
    const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-wrong';
    const icon = isCorrect ? '✓' : '✗';

    const content = `
      <div class="encounter-feedback ${feedbackClass}">
        <div class="feedback-icon">${icon}</div>
        <p class="feedback-message">${message}</p>
        <button class="btn primary-btn" onclick="encounterManager.continueFeedback()">
          Continue
        </button>
      </div>
    `;

    this._feedbackCallback = onContinue;
    this.updateModal(content);
  }

  continueFeedback() {
    if (this._feedbackCallback) {
      this._feedbackCallback();
      this._feedbackCallback = null;
    }
  }

  endEncounter() {
    const enc = this.activeEncounter;
    const results = this.encounterResults;

    // Apply consequences to game state
    if (results.damage > 0 && typeof GameState !== 'undefined') {
      GameState.player.hp = Math.max(1, GameState.player.hp - results.damage);
    }

    if (results.goldChange !== 0 && typeof GameState !== 'undefined') {
      GameState.player.gold = Math.max(0, GameState.player.gold + results.goldChange);
    }

    if (results.reputationChange > 0 && typeof reputationManager !== 'undefined') {
      // Add to current location's faction
      const currentLocation = GameState?.currentLocation || 'dawnmere';
      reputationManager.addReputation(currentLocation, results.reputationChange);
    }

    // Show results
    const totalQuestions = enc.questions.length;
    const accuracy = Math.round((results.correct / totalQuestions) * 100);

    let resultsHTML = `
      <div class="encounter-results">
        <h3>Encounter Complete!</h3>
        <div class="results-stats">
          <div class="result-item">
            <span class="result-label">Correct Answers:</span>
            <span class="result-value">${results.correct}/${totalQuestions}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Accuracy:</span>
            <span class="result-value">${accuracy}%</span>
          </div>
    `;

    if (results.damage > 0) {
      resultsHTML += `
          <div class="result-item negative">
            <span class="result-label">Damage Taken:</span>
            <span class="result-value">-${results.damage} HP</span>
          </div>
      `;
    }

    if (results.goldChange !== 0) {
      const goldClass = results.goldChange > 0 ? 'positive' : 'negative';
      const goldSign = results.goldChange > 0 ? '+' : '';
      resultsHTML += `
          <div class="result-item ${goldClass}">
            <span class="result-label">Gold:</span>
            <span class="result-value">${goldSign}${results.goldChange}</span>
          </div>
      `;
    }

    if (results.reputationChange > 0) {
      resultsHTML += `
          <div class="result-item positive">
            <span class="result-label">Reputation:</span>
            <span class="result-value">+${results.reputationChange}</span>
          </div>
      `;
    }

    resultsHTML += `
        </div>
        <button class="btn primary-btn" onclick="encounterManager.closeEncounter()">
          Continue Journey
        </button>
      </div>
    `;

    this.updateModal(resultsHTML);
  }

  closeEncounter() {
    const onComplete = this.activeEncounter?.onComplete;
    const results = { ...this.encounterResults };

    this.closeModal();
    this.activeEncounter = null;

    if (onComplete) {
      onComplete({
        success: true,
        results
      });
    }
  }

  // Modal management
  createModal(title, content) {
    this.closeModal();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay encounter-modal';
    modal.innerHTML = `
      <div class="modal-container encounter-container">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
        </div>
        <div class="modal-body encounter-body">
          ${content}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;

    // Prevent clicks from closing
    modal.querySelector('.modal-container').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  updateModal(content) {
    if (this.modalElement) {
      const body = this.modalElement.querySelector('.modal-body');
      if (body) {
        body.innerHTML = content;
      }
    }
  }

  closeModal() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.modalElement = null;
    }
  }

  // Keyboard support
  handleKeyPress(key) {
    if (!this.activeEncounter) return false;

    const buttons = document.querySelectorAll('.encounter-answer');
    const keyNum = parseInt(key);

    if (keyNum >= 1 && keyNum <= buttons.length) {
      buttons[keyNum - 1].click();
      return true;
    }

    return false;
  }
}

// =====================================================
// QUEST INTEGRATION
// =====================================================

/**
 * Check and start encounter for a quest objective
 * @param {Object} objective - Quest objective with encounter config
 * @param {Function} onComplete - Callback when encounter completes
 */
function startQuestEncounter(objective, onComplete) {
  if (!objective.encounterType || !objective.encounterId) {
    console.error('Invalid encounter objective:', objective);
    if (onComplete) onComplete({ success: false });
    return;
  }

  encounterManager.startEncounter(
    objective.encounterType,
    objective.encounterId,
    onComplete
  );
}

/**
 * Run a sequence of encounters for a journey
 * @param {Array} encounters - Array of {category, id} objects
 * @param {Function} onAllComplete - Callback when all encounters done
 */
function runEncounterSequence(encounters, onAllComplete) {
  let currentIndex = 0;
  const allResults = [];

  function runNext() {
    if (currentIndex >= encounters.length) {
      if (onAllComplete) {
        onAllComplete({
          success: true,
          encounters: allResults
        });
      }
      return;
    }

    const enc = encounters[currentIndex];
    encounterManager.startEncounter(enc.category, enc.id, (result) => {
      allResults.push(result);
      currentIndex++;

      // Brief pause between encounters
      setTimeout(runNext, 500);
    });
  }

  runNext();
}

// =====================================================
// INITIALIZE
// =====================================================

// Create global instance
const encounterManager = new EncounterManager();

// Add keyboard listener
document.addEventListener('keydown', (e) => {
  if (encounterManager.handleKeyPress(e.key)) {
    e.preventDefault();
  }
});

console.log('Encounter System loaded');
