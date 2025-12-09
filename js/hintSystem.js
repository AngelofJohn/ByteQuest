// ByteQuest - Hint System
// Phase 2: Charges per lesson + unlock per word mastery

// =====================================================
// Constants
// =====================================================

// Number of correct answers needed to unlock hint for a word
// Insight stat reduces this requirement
const BASE_HINT_UNLOCK_THRESHOLD = 3;

// Base hint charges per lesson
// Insight stat increases this
const BASE_HINT_CHARGES = 2;

// How much each Insight point affects the system
const INSIGHT_CHARGE_BONUS = 0.5;      // +0.5 charges per Insight
const INSIGHT_UNLOCK_REDUCTION = 0.2;  // -0.2 threshold per Insight

// =====================================================
// Hint Manager Class
// =====================================================

class HintManager {
  constructor(gameState, spacedRepManager) {
    this.state = gameState;
    this.srManager = spacedRepManager;
    
    // Per-lesson state
    this.lessonCharges = 0;
    this.maxCharges = 0;
    this.hintsUsedThisLesson = 0;
  }

  // ===================================================
  // Lesson Initialization
  // ===================================================

  /**
   * Initialize hints for a new lesson
   * Call this when starting any lesson
   */
  initializeForLesson() {
    this.maxCharges = this.calculateMaxCharges();
    this.lessonCharges = this.maxCharges;
    this.hintsUsedThisLesson = 0;
    
    return {
      charges: this.lessonCharges,
      maxCharges: this.maxCharges
    };
  }

  /**
   * Calculate max hint charges based on Insight stat
   */
  calculateMaxCharges() {
    const insight = this.getInsightStat();
    const bonus = Math.floor(insight * INSIGHT_CHARGE_BONUS);
    return BASE_HINT_CHARGES + bonus;
  }

  /**
   * Get player's Insight stat
   */
  getInsightStat() {
    // Check for Insight in player stats
    if (this.state.player.stats && this.state.player.stats.insight !== undefined) {
      return this.state.player.stats.insight;
    }
    // Fallback to base stats + bonus stats
    const base = this.state.player.baseStats?.insight || 0;
    const bonus = this.state.player.bonusStats?.insight || 0;
    return base + bonus;
  }

  // ===================================================
  // Hint Availability Checking
  // ===================================================

  /**
   * Check if a hint is unlocked for a specific word
   * Based on correct answer count for that word
   */
  isHintUnlockedForWord(word) {
    if (!this.srManager) return false;
    
    const wordKey = this.srManager.createWordKey(word);
    const wordData = this.state.player.vocabulary?.[wordKey];
    
    if (!wordData) {
      // Word never seen before - hint locked
      return false;
    }
    
    const threshold = this.calculateUnlockThreshold();
    return wordData.totalCorrect >= threshold;
  }

  /**
   * Calculate correct answers needed to unlock hint
   * Insight stat reduces this threshold
   */
  calculateUnlockThreshold() {
    const insight = this.getInsightStat();
    const reduction = insight * INSIGHT_UNLOCK_REDUCTION;
    return Math.max(1, Math.ceil(BASE_HINT_UNLOCK_THRESHOLD - reduction));
  }

  /**
   * Check if player has hint charges remaining
   */
  hasChargesRemaining() {
    return this.lessonCharges > 0;
  }

  /**
   * Check if hint can be shown for a word
   * Must have charges AND word hint must be unlocked
   */
  canShowHint(word) {
    return this.hasChargesRemaining() && this.isHintUnlockedForWord(word);
  }

  /**
   * Get full hint status for a word
   */
  getHintStatus(word) {
    const unlocked = this.isHintUnlockedForWord(word);
    const hasCharges = this.hasChargesRemaining();
    
    let reason = null;
    if (!unlocked && !hasCharges) {
      reason = 'Hint locked & no charges';
    } else if (!unlocked) {
      reason = 'Hint not yet unlocked for this word';
    } else if (!hasCharges) {
      reason = 'No hint charges remaining';
    }
    
    return {
      available: unlocked && hasCharges,
      unlocked,
      hasCharges,
      chargesRemaining: this.lessonCharges,
      maxCharges: this.maxCharges,
      reason
    };
  }

  // ===================================================
  // Hint Usage
  // ===================================================

  /**
   * Use a hint charge
   * Returns the hint text if successful
   */
  useHint(word, hintText) {
    if (!this.canShowHint(word)) {
      return {
        success: false,
        message: this.getHintStatus(word).reason
      };
    }
    
    // Consume a charge
    this.lessonCharges--;
    this.hintsUsedThisLesson++;
    
    return {
      success: true,
      hint: hintText,
      chargesRemaining: this.lessonCharges
    };
  }

  /**
   * Get hint progress for a word (how close to unlocking)
   */
  getUnlockProgress(word) {
    if (!this.srManager) {
      return { current: 0, required: BASE_HINT_UNLOCK_THRESHOLD, percentage: 0 };
    }
    
    const wordKey = this.srManager.createWordKey(word);
    const wordData = this.state.player.vocabulary?.[wordKey];
    
    const current = wordData?.totalCorrect || 0;
    const required = this.calculateUnlockThreshold();
    const percentage = Math.min(100, Math.floor((current / required) * 100));
    
    return {
      current,
      required,
      percentage,
      unlocked: current >= required
    };
  }

  // ===================================================
  // Lesson Summary
  // ===================================================

  /**
   * Get summary of hint usage for completed lesson
   */
  getLessonSummary() {
    return {
      hintsUsed: this.hintsUsedThisLesson,
      chargesRemaining: this.lessonCharges,
      maxCharges: this.maxCharges,
      efficiency: this.maxCharges > 0 
        ? Math.round(((this.maxCharges - this.hintsUsedThisLesson) / this.maxCharges) * 100)
        : 100
    };
  }

  /**
   * Reset lesson state (call when lesson ends)
   */
  resetLesson() {
    this.lessonCharges = 0;
    this.maxCharges = 0;
    this.hintsUsedThisLesson = 0;
  }

  // ===================================================
  // Boss/Exam Mode
  // ===================================================

  /**
   * Initialize hints for a boss/exam lesson
   * Reduced or no charges available
   */
  initializeForBossExam(chargeMultiplier = 0) {
    this.maxCharges = Math.floor(this.calculateMaxCharges() * chargeMultiplier);
    this.lessonCharges = this.maxCharges;
    this.hintsUsedThisLesson = 0;
    
    return {
      charges: this.lessonCharges,
      maxCharges: this.maxCharges,
      isBossMode: true
    };
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format hint charges for display
 */
function formatHintCharges(current, max) {
  return `${current}/${max}`;
}

/**
 * Get hint button text based on status
 */
function getHintButtonText(status) {
  if (!status.unlocked) {
    return '🔒 Locked';
  }
  if (!status.hasCharges) {
    return '💡 No Charges';
  }
  return `💡 Use Hint (${status.chargesRemaining})`;
}

/**
 * Get hint unlock tooltip
 */
function getHintUnlockTooltip(progress) {
  if (progress.unlocked) {
    return 'Hint available for this word';
  }
  return `Answer correctly ${progress.required - progress.current} more time(s) to unlock hint`;
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BASE_HINT_UNLOCK_THRESHOLD,
    BASE_HINT_CHARGES,
    INSIGHT_CHARGE_BONUS,
    INSIGHT_UNLOCK_REDUCTION,
    HintManager,
    formatHintCharges,
    getHintButtonText,
    getHintUnlockTooltip
  };
}
