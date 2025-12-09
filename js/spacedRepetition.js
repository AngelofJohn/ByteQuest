// ByteQuest - Spaced Repetition System
// Tracks vocabulary mastery and schedules reviews

// =====================================================
// Constants
// =====================================================

const MasteryLevel = {
  NEW: 0,
  LEARNING: 1,
  FAMILIAR: 2,
  PRACTICED: 3,
  KNOWN: 4,
  MASTERED: 5
};

const MasteryNames = {
  [MasteryLevel.NEW]: 'New',
  [MasteryLevel.LEARNING]: 'Learning',
  [MasteryLevel.FAMILIAR]: 'Familiar',
  [MasteryLevel.PRACTICED]: 'Practiced',
  [MasteryLevel.KNOWN]: 'Known',
  [MasteryLevel.MASTERED]: 'Mastered'
};

const MasteryColors = {
  [MasteryLevel.NEW]: '#8d99ae',
  [MasteryLevel.LEARNING]: '#e63946',
  [MasteryLevel.FAMILIAR]: '#f4a261',
  [MasteryLevel.PRACTICED]: '#e9c46a',
  [MasteryLevel.KNOWN]: '#2a9d8f',
  [MasteryLevel.MASTERED]: '#ffd700'
};

// Review intervals in milliseconds
const REVIEW_INTERVALS = {
  [MasteryLevel.NEW]: 0,                          // Immediate
  [MasteryLevel.LEARNING]: 60 * 60 * 1000,        // 1 hour
  [MasteryLevel.FAMILIAR]: 24 * 60 * 60 * 1000,   // 1 day
  [MasteryLevel.PRACTICED]: 3 * 24 * 60 * 60 * 1000,  // 3 days
  [MasteryLevel.KNOWN]: 7 * 24 * 60 * 60 * 1000,      // 1 week
  [MasteryLevel.MASTERED]: 14 * 24 * 60 * 60 * 1000   // 2 weeks
};

// =====================================================
// Spaced Repetition Manager Class
// =====================================================

class SpacedRepetitionManager {
  constructor(gameState) {
    this.state = gameState;
    
    // Initialize vocabulary tracking if not present
    if (!this.state.player.vocabulary) {
      this.state.player.vocabulary = {};
    }
  }

  // ===================================================
  // Word Tracking
  // ===================================================

  /**
   * Get or create a word's tracking data
   */
  getWordData(wordKey) {
    if (!this.state.player.vocabulary[wordKey]) {
      this.state.player.vocabulary[wordKey] = {
        level: MasteryLevel.NEW,
        correctStreak: 0,
        totalSeen: 0,
        totalCorrect: 0,
        lastReviewed: null,
        nextReview: null,
        firstSeen: Date.now()
      };
    }
    return this.state.player.vocabulary[wordKey];
  }

  /**
   * Create a unique key for a vocabulary word
   */
  createWordKey(word) {
    // Use the French word as the key (lowercase, trimmed)
    return word.french.toLowerCase().trim();
  }

  /**
   * Record that a word was seen (shown in a question)
   */
  recordWordSeen(word) {
    const key = this.createWordKey(word);
    const data = this.getWordData(key);
    data.totalSeen++;
    data.lastReviewed = Date.now();
    
    // Store the full word data for reference
    data.french = word.french;
    data.english = word.english;
    data.hint = word.hint;
  }

  /**
   * Record a correct answer
   */
  recordCorrect(word) {
    const key = this.createWordKey(word);
    const data = this.getWordData(key);
    
    data.totalCorrect++;
    data.correctStreak++;
    
    // Level up if streak threshold met
    if (data.correctStreak >= 1 && data.level < MasteryLevel.MASTERED) {
      data.level = Math.min(data.level + 1, MasteryLevel.MASTERED);
    }
    
    // Calculate next review time
    data.nextReview = Date.now() + REVIEW_INTERVALS[data.level];
    data.lastReviewed = Date.now();
    
    return {
      leveledUp: data.correctStreak === 1 && data.level > MasteryLevel.NEW,
      newLevel: data.level,
      levelName: MasteryNames[data.level]
    };
  }

  /**
   * Record a wrong answer
   */
  recordWrong(word) {
    const key = this.createWordKey(word);
    const data = this.getWordData(key);
    
    // Reset streak
    data.correctStreak = 0;
    
    // Check Knowledge stat - chance to prevent level drop
    let preventedDecay = false;
    if (typeof statsManager !== 'undefined' && statsManager && data.level > MasteryLevel.NEW) {
      const decayReduction = statsManager.calculateMasteryDecayReduction();
      // decayReduction is 0.1 per Knowledge point
      // At 5 Knowledge = 50% chance to prevent decay
      if (Math.random() < decayReduction) {
        preventedDecay = true;
      }
    }
    
    // Drop one level (gentle penalty) unless prevented by Knowledge
    const oldLevel = data.level;
    if (data.level > MasteryLevel.NEW && !preventedDecay) {
      data.level--;
    }
    
    // Set next review to soon (need to practice this word)
    data.nextReview = Date.now() + REVIEW_INTERVALS[data.level];
    data.lastReviewed = Date.now();
    
    return {
      leveledDown: oldLevel > data.level,
      preventedDecay,
      newLevel: data.level,
      levelName: MasteryNames[data.level]
    };
  }

  // ===================================================
  // Review Selection
  // ===================================================

  /**
   * Get all words that are due for review
   */
  getDueWords() {
    const now = Date.now();
    const due = [];
    
    for (const [key, data] of Object.entries(this.state.player.vocabulary)) {
      if (data.nextReview && data.nextReview <= now) {
        due.push({
          key,
          ...data,
          overdue: now - data.nextReview
        });
      }
    }
    
    // Sort by most overdue first
    due.sort((a, b) => b.overdue - a.overdue);
    
    return due;
  }

  /**
   * Get words the player is struggling with (low accuracy)
   */
  getStrugglingWords() {
    const struggling = [];
    
    for (const [key, data] of Object.entries(this.state.player.vocabulary)) {
      if (data.totalSeen >= 2) { // Need at least 2 attempts to judge
        const accuracy = data.totalCorrect / data.totalSeen;
        if (accuracy < 0.7) { // Below 70% accuracy
          struggling.push({
            key,
            ...data,
            accuracy
          });
        }
      }
    }
    
    // Sort by lowest accuracy first
    struggling.sort((a, b) => a.accuracy - b.accuracy);
    
    return struggling;
  }

  /**
   * Get words by mastery level
   */
  getWordsByLevel(level) {
    const words = [];
    
    for (const [key, data] of Object.entries(this.state.player.vocabulary)) {
      if (data.level === level) {
        words.push({ key, ...data });
      }
    }
    
    return words;
  }

  /**
   * Get all tracked words
   */
  getAllWords() {
    return Object.entries(this.state.player.vocabulary).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  /**
   * Build a review session with prioritized words
   */
  buildReviewSession(count = 8) {
    const session = [];
    const used = new Set();
    
    // Priority 1: Due words
    const dueWords = this.getDueWords();
    for (const word of dueWords) {
      if (session.length >= count) break;
      if (!used.has(word.key)) {
        session.push(word);
        used.add(word.key);
      }
    }
    
    // Priority 2: Struggling words
    if (session.length < count) {
      const strugglingWords = this.getStrugglingWords();
      for (const word of strugglingWords) {
        if (session.length >= count) break;
        if (!used.has(word.key)) {
          session.push(word);
          used.add(word.key);
        }
      }
    }
    
    // Priority 3: Low mastery level words
    if (session.length < count) {
      for (let level = MasteryLevel.NEW; level <= MasteryLevel.FAMILIAR; level++) {
        const levelWords = this.getWordsByLevel(level);
        // Shuffle to add variety
        levelWords.sort(() => Math.random() - 0.5);
        
        for (const word of levelWords) {
          if (session.length >= count) break;
          if (!used.has(word.key)) {
            session.push(word);
            used.add(word.key);
          }
        }
        if (session.length >= count) break;
      }
    }
    
    // Priority 4: Any remaining words (random selection for variety)
    if (session.length < count) {
      const allWords = this.getAllWords();
      allWords.sort(() => Math.random() - 0.5);
      
      for (const word of allWords) {
        if (session.length >= count) break;
        if (!used.has(word.key)) {
          session.push(word);
          used.add(word.key);
        }
      }
    }
    
    // Shuffle the final session so it's not always hardest first
    session.sort(() => Math.random() - 0.5);
    
    return session;
  }

  /**
   * Check if player has enough words for a review
   */
  canReview(minWords = 4) {
    return Object.keys(this.state.player.vocabulary).length >= minWords;
  }

  /**
   * Get count of words at each mastery level
   */
  getMasteryStats() {
    const stats = {
      [MasteryLevel.NEW]: 0,
      [MasteryLevel.LEARNING]: 0,
      [MasteryLevel.FAMILIAR]: 0,
      [MasteryLevel.PRACTICED]: 0,
      [MasteryLevel.KNOWN]: 0,
      [MasteryLevel.MASTERED]: 0,
      total: 0,
      dueCount: 0,
      averageAccuracy: 0
    };
    
    let totalAccuracy = 0;
    let wordsWithAccuracy = 0;
    const now = Date.now();
    
    for (const data of Object.values(this.state.player.vocabulary)) {
      stats[data.level]++;
      stats.total++;
      
      if (data.nextReview && data.nextReview <= now) {
        stats.dueCount++;
      }
      
      if (data.totalSeen > 0) {
        totalAccuracy += data.totalCorrect / data.totalSeen;
        wordsWithAccuracy++;
      }
    }
    
    if (wordsWithAccuracy > 0) {
      stats.averageAccuracy = Math.round((totalAccuracy / wordsWithAccuracy) * 100);
    }
    
    return stats;
  }

  // ===================================================
  // Question Generation for Review
  // ===================================================

  /**
   * Generate questions from tracked vocabulary
   */
  generateReviewQuestions(words, allVocabulary = null) {
    const questions = [];
    
    for (const word of words) {
      // Need the full word data for generating wrong answers
      const wordData = {
        french: word.french,
        english: word.english,
        hint: word.hint
      };
      
      const questionType = Math.random() > 0.5 ? 'to_english' : 'to_french';
      
      // Get wrong answers from other tracked vocabulary or provided vocabulary
      let wrongAnswerPool = [];
      
      // First try to use other tracked words
      const otherWords = Object.values(this.state.player.vocabulary)
        .filter(w => w.french !== word.french);
      
      if (otherWords.length >= 3) {
        wrongAnswerPool = otherWords;
      } else if (allVocabulary) {
        // Fall back to provided vocabulary pool
        wrongAnswerPool = allVocabulary.filter(w => w.french !== word.french);
      }
      
      // Generate wrong answers
      const wrongAnswers = wrongAnswerPool
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => questionType === 'to_english' ? w.english : w.french);
      
      // If we still don't have enough wrong answers, skip this word
      if (wrongAnswers.length < 3) continue;
      
      const correctAnswer = questionType === 'to_english' ? wordData.english : wordData.french;
      const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      
      questions.push({
        type: questionType,
        word: questionType === 'to_english' ? wordData.french : wordData.english,
        wordData: wordData, // Keep reference for tracking
        prompt: questionType === 'to_english' 
          ? 'What does this mean?' 
          : 'How do you say this in French?',
        correctAnswer,
        options: allAnswers,
        hint: wordData.hint,
        masteryLevel: word.level,
        isReview: true
      });
    }
    
    return questions;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Format mastery level for display
 */
function formatMasteryLevel(level) {
  return {
    name: MasteryNames[level],
    color: MasteryColors[level],
    level: level,
    maxLevel: MasteryLevel.MASTERED
  };
}

/**
 * Calculate time until next review
 */
function getTimeUntilReview(nextReview) {
  if (!nextReview) return null;
  
  const now = Date.now();
  const diff = nextReview - now;
  
  if (diff <= 0) return 'Due now';
  
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return 'Soon';
}

/**
 * Get all vocabulary from VOCABULARY constant (for wrong answer generation)
 */
function getAllVocabularyFlat() {
  const all = [];
  
  for (const category of Object.values(VOCABULARY)) {
    for (const subcategory of Object.values(category)) {
      if (Array.isArray(subcategory)) {
        all.push(...subcategory);
      }
    }
  }
  
  return all;
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MasteryLevel,
    MasteryNames,
    MasteryColors,
    REVIEW_INTERVALS,
    SpacedRepetitionManager,
    formatMasteryLevel,
    getTimeUntilReview,
    getAllVocabularyFlat
  };
}
