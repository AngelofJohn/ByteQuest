// ByteQuest - Boss Exam System
// Phase 2: Harder lesson format for zone progression

// =====================================================
// Constants
// =====================================================

const BOSS_EXAM_CONFIG = {
  // Question count
  // TODO: Change back to 15 for production
  questionCount: 5,
  
  // Pass threshold (percentage)
  passThreshold: 80,
  
  // HP penalty per wrong answer
  hpPenalty: 15,
  
  // Hint availability (0 = no hints, 0.5 = half normal, 1 = normal)
  hintMultiplier: 0,
  
  // XP multiplier for completing
  xpMultiplier: 2.0,
  
  // Gold multiplier for completing
  goldMultiplier: 2.0,
  
  // Minimum vocabulary pool required
  minVocabRequired: 15,
  
  // Can retry immediately?
  immediateRetry: false,
  
  // Required review before retry (if immediateRetry is false)
  reviewRequiredBeforeRetry: true
};

// =====================================================
// Boss Exam Manager Class
// =====================================================

class BossExamManager {
  constructor(gameState, locationManager, hintManager, srManager) {
    this.state = gameState;
    this.locationManager = locationManager;
    this.hintManager = hintManager;
    this.srManager = srManager;
    
    // Track exam attempts
    this.initializeExamTracking();
  }

  // ===================================================
  // Initialization
  // ===================================================

  /**
   * Initialize exam tracking in player state
   */
  initializeExamTracking() {
    if (!this.state.player.examHistory) {
      this.state.player.examHistory = {};
    }
  }

  /**
   * Get exam history for a location
   */
  getExamHistory(locationId) {
    return this.state.player.examHistory[locationId] || {
      attempts: 0,
      passed: false,
      bestScore: 0,
      lastAttempt: null
    };
  }

  // ===================================================
  // Exam Availability
  // ===================================================

  /**
   * Check if an exam is available for a location
   */
  canAttemptExam(locationId) {
    const location = this.locationManager?.getLocation(locationId);
    if (!location) {
      return { canAttempt: false, reason: 'Location not found' };
    }
    
    if (!location.hasBossExam) {
      return { canAttempt: false, reason: 'No exam at this location' };
    }
    
    const history = this.getExamHistory(locationId);
    
    // Already passed
    if (history.passed) {
      return { canAttempt: true, reason: 'Already passed (can retake for practice)' };
    }
    
    // Check retry conditions
    if (history.attempts > 0 && !BOSS_EXAM_CONFIG.immediateRetry) {
      if (BOSS_EXAM_CONFIG.reviewRequiredBeforeRetry) {
        // Check if player has done a review since last attempt
        const lastReview = this.state.player.lastReviewTime || 0;
        if (lastReview < history.lastAttempt) {
          return { 
            canAttempt: false, 
            reason: 'Complete a review session before retrying' 
          };
        }
      }
    }
    
    // Check vocabulary requirements
    const vocabCount = Object.keys(this.state.player.vocabulary || {}).length;
    if (vocabCount < BOSS_EXAM_CONFIG.minVocabRequired) {
      return { 
        canAttempt: false, 
        reason: `Learn at least ${BOSS_EXAM_CONFIG.minVocabRequired} words first (${vocabCount}/${BOSS_EXAM_CONFIG.minVocabRequired})` 
      };
    }
    
    return { canAttempt: true };
  }

  // ===================================================
  // Exam Generation
  // ===================================================

  /**
   * Generate an exam for a location
   */
  generateExam(locationId) {
    const canAttempt = this.canAttemptExam(locationId);
    if (!canAttempt.canAttempt) {
      return { success: false, message: canAttempt.reason };
    }
    
    // Get all learned vocabulary
    const learnedVocab = this.getLearnedVocabulary();
    
    if (learnedVocab.length < BOSS_EXAM_CONFIG.minVocabRequired) {
      return { 
        success: false, 
        message: `Not enough vocabulary learned (${learnedVocab.length}/${BOSS_EXAM_CONFIG.minVocabRequired})` 
      };
    }
    
    // Generate questions
    const questions = this.generateExamQuestions(learnedVocab, BOSS_EXAM_CONFIG.questionCount);
    
    if (questions.length < BOSS_EXAM_CONFIG.questionCount) {
      return { 
        success: false, 
        message: 'Could not generate enough questions' 
      };
    }
    
    return {
      success: true,
      questions,
      config: { ...BOSS_EXAM_CONFIG },
      locationId
    };
  }

  /**
   * Get all vocabulary the player has learned
   */
  getLearnedVocabulary() {
    const vocab = this.state.player.vocabulary || {};
    return Object.values(vocab).filter(word => word.french && word.english);
  }

  /**
   * Generate exam questions from vocabulary
   */
  generateExamQuestions(vocabulary, count) {
    const questions = [];
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const word = shuffled[i];
      const questionType = Math.random() > 0.5 ? 'to_english' : 'to_french';
      
      // Get wrong answers from other vocabulary
      const wrongAnswers = vocabulary
        .filter(w => w.french !== word.french)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => questionType === 'to_english' ? w.english : w.french);
      
      if (wrongAnswers.length < 3) continue;
      
      const correctAnswer = questionType === 'to_english' ? word.english : word.french;
      const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      
      questions.push({
        type: questionType,
        word: questionType === 'to_english' ? word.french : word.english,
        wordData: word,
        prompt: questionType === 'to_english' 
          ? 'What does this mean?' 
          : 'How do you say this in French?',
        correctAnswer,
        options: allAnswers,
        hint: word.hint,
        isExamQuestion: true
      });
    }
    
    return questions;
  }

  // ===================================================
  // Exam Execution
  // ===================================================

  /**
   * Start an exam (creates lesson state)
   */
  startExam(locationId) {
    const examData = this.generateExam(locationId);
    
    if (!examData.success) {
      return examData;
    }
    
    // Initialize hints for boss exam (reduced or none)
    let hintInfo = { charges: 0, maxCharges: 0 };
    if (this.hintManager) {
      hintInfo = this.hintManager.initializeForBossExam(BOSS_EXAM_CONFIG.hintMultiplier);
    }
    
    // Create lesson state for exam
    const lessonState = {
      active: true,
      questId: null,
      objectiveId: null,
      vocabulary: this.getLearnedVocabulary(),
      questions: examData.questions,
      currentQuestion: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      streak: 0,
      currentMultiplier: 1.0,
      totalBonusXP: 0,
      totalBonusGold: 0,
      
      // Exam-specific
      isBossExam: true,
      examLocationId: locationId,
      examConfig: examData.config,
      hintCharges: hintInfo.charges,
      maxHintCharges: hintInfo.maxCharges
    };
    
    // Record attempt
    this.recordAttempt(locationId);
    
    return {
      success: true,
      lessonState,
      message: 'Exam started'
    };
  }

  /**
   * Record an exam attempt
   */
  recordAttempt(locationId) {
    if (!this.state.player.examHistory[locationId]) {
      this.state.player.examHistory[locationId] = {
        attempts: 0,
        passed: false,
        bestScore: 0,
        lastAttempt: null
      };
    }
    
    this.state.player.examHistory[locationId].attempts++;
    this.state.player.examHistory[locationId].lastAttempt = Date.now();
  }

  // ===================================================
  // Exam Completion
  // ===================================================

  /**
   * Process exam completion
   */
  completeExam(lessonState) {
    if (!lessonState.isBossExam) {
      return { success: false, message: 'Not an exam' };
    }
    
    const locationId = lessonState.examLocationId;
    const config = lessonState.examConfig;
    const totalQuestions = lessonState.questions.length;
    const correctAnswers = lessonState.correctAnswers;
    const scorePercent = Math.floor((correctAnswers / totalQuestions) * 100);
    const passed = scorePercent >= config.passThreshold;
    
    // Update history
    const history = this.getExamHistory(locationId);
    if (scorePercent > history.bestScore) {
      this.state.player.examHistory[locationId].bestScore = scorePercent;
    }
    
    const result = {
      passed,
      scorePercent,
      correctAnswers,
      totalQuestions,
      passThreshold: config.passThreshold,
      isNewBest: scorePercent > history.bestScore,
      wasAlreadyPassed: history.passed
    };
    
    if (passed && !history.passed) {
      // First time passing
      this.state.player.examHistory[locationId].passed = true;
      
      // Unlock rewards
      result.rewards = this.grantExamRewards(locationId, config);
    }
    
    return result;
  }

  /**
   * Grant rewards for passing an exam
   */
  grantExamRewards(locationId, config) {
    const rewards = {
      xp: 0,
      gold: 0,
      unlockedLocations: []
    };
    
    // Base XP and gold with multiplier
    const baseXP = 100;
    const baseGold = 50;
    
    rewards.xp = Math.floor(baseXP * config.xpMultiplier);
    rewards.gold = Math.floor(baseGold * config.goldMultiplier);
    
    // Add to player
    this.state.player.gold += rewards.gold;
    
    // Check for location unlocks
    // Locations connected to the exam location might unlock
    if (this.locationManager) {
      const location = this.locationManager.getLocation(locationId);
      if (location && location.connections) {
        for (const connectedId of location.connections) {
          const connectedLocation = this.locationManager.getLocation(connectedId);
          if (connectedLocation && !this.locationManager.isUnlocked(connectedId)) {
            // Discover and potentially unlock
            this.locationManager.discoverLocation(connectedId);
            if (this.locationManager.meetsLevelRequirement(connectedId)) {
              this.locationManager.unlockLocation(connectedId);
              rewards.unlockedLocations.push(connectedLocation);
            }
          }
        }
      }
    }
    
    return rewards;
  }

  // ===================================================
  // Exam Info
  // ===================================================

  /**
   * Get exam info for display
   */
  getExamInfo(locationId) {
    const location = this.locationManager?.getLocation(locationId);
    if (!location || !location.hasBossExam) {
      return null;
    }
    
    const history = this.getExamHistory(locationId);
    const canAttempt = this.canAttemptExam(locationId);
    
    return {
      locationId,
      locationName: location.name,
      config: { ...BOSS_EXAM_CONFIG },
      history,
      canAttempt: canAttempt.canAttempt,
      canAttemptReason: canAttempt.reason
    };
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format exam score for display
 */
function formatExamScore(correct, total) {
  const percent = Math.floor((correct / total) * 100);
  return `${correct}/${total} (${percent}%)`;
}

/**
 * Get pass/fail message
 */
function getExamResultMessage(passed, scorePercent, threshold) {
  if (passed) {
    if (scorePercent === 100) {
      return 'PERFECT SCORE! Exceptional performance!';
    } else if (scorePercent >= 90) {
      return 'Excellent! You passed with flying colors!';
    } else {
      return 'Congratulations! You passed the exam!';
    }
  } else {
    const needed = threshold - scorePercent;
    return `Not quite. You need ${needed}% more to pass. Keep practicing!`;
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BOSS_EXAM_CONFIG,
    BossExamManager,
    formatExamScore,
    getExamResultMessage
  };
}
