// ByteQuest Vocabulary Query Engine
// Provides easy access to normalized vocabulary data

// Import dependencies (for Node.js environments)
let VOCAB, VOCAB_CATEGORIES, VOCAB_SUBCATEGORIES, VOCAB_DIFFICULTY, VOCAB_LESSONS, VOCAB_QUESTS, VOCAB_ZONES;

if (typeof require !== 'undefined') {
  const core = require('./vocab-core.js');
  const meta = require('./vocab-metadata.js');
  VOCAB = core.VOCAB;
  VOCAB_CATEGORIES = meta.VOCAB_CATEGORIES;
  VOCAB_SUBCATEGORIES = meta.VOCAB_SUBCATEGORIES;
  VOCAB_DIFFICULTY = meta.VOCAB_DIFFICULTY;
  VOCAB_LESSONS = meta.VOCAB_LESSONS;
  VOCAB_QUESTS = meta.VOCAB_QUESTS;
  VOCAB_ZONES = meta.VOCAB_ZONES;
}

/**
 * VocabIndex - Query engine for normalized vocabulary
 *
 * Usage:
 *   const index = new VocabIndex();
 *   const familyWords = index.getByCategory('family');
 *   const beginnerWords = index.getByDifficulty(1);
 *   const lesson1Words = index.getForLesson('lesson_1');
 */
class VocabIndex {
  constructor() {
    // Build reverse lookup caches
    this._buildCaches();
  }

  /**
   * Build internal caches for fast lookups
   */
  _buildCaches() {
    // Cache: word ID -> difficulty level
    this._difficultyCache = {};
    for (const [level, wordIds] of Object.entries(VOCAB_DIFFICULTY)) {
      for (const wordId of wordIds) {
        this._difficultyCache[wordId] = parseInt(level);
      }
    }

    // Cache: word ID -> subcategories it belongs to
    this._subcategoryCache = {};
    for (const [subcat, wordIds] of Object.entries(VOCAB_SUBCATEGORIES)) {
      for (const wordId of wordIds) {
        if (!this._subcategoryCache[wordId]) {
          this._subcategoryCache[wordId] = [];
        }
        this._subcategoryCache[wordId].push(subcat);
      }
    }

    // Cache: word ID -> lessons it appears in
    this._lessonCache = {};
    for (const [lessonId, wordIds] of Object.entries(VOCAB_LESSONS)) {
      for (const wordId of wordIds) {
        if (!this._lessonCache[wordId]) {
          this._lessonCache[wordId] = [];
        }
        this._lessonCache[wordId].push(lessonId);
      }
    }
  }

  // =====================================================
  // SINGLE WORD METHODS
  // =====================================================

  /**
   * Get a single vocabulary entry by ID
   * @param {string} wordId - The word ID (e.g., "V_family_mere")
   * @returns {object|null} - Word data or null if not found
   */
  get(wordId) {
    const entry = VOCAB[wordId];
    if (!entry) return null;

    const [french, article, englishArr, partOfSpeech] = entry;
    return {
      id: wordId,
      french: article ? `${article} ${french}` : french,
      frenchBase: french,
      article: article,
      english: englishArr,
      englishPrimary: englishArr[0],
      partOfSpeech: partOfSpeech,
      difficulty: this._difficultyCache[wordId] || 2, // Default to tier 2
      subcategories: this._subcategoryCache[wordId] || [],
      lessons: this._lessonCache[wordId] || []
    };
  }

  /**
   * Get the French word with article
   * @param {string} wordId - The word ID
   * @returns {string} - French word with article (e.g., "la mère")
   */
  getFrench(wordId) {
    const entry = VOCAB[wordId];
    if (!entry) return null;
    const [french, article] = entry;
    return article ? `${article} ${french}` : french;
  }

  /**
   * Get the primary English translation
   * @param {string} wordId - The word ID
   * @returns {string} - Primary English translation
   */
  getEnglish(wordId) {
    const entry = VOCAB[wordId];
    if (!entry) return null;
    return entry[2][0]; // First English translation
  }

  /**
   * Get all English translations for a word
   * @param {string} wordId - The word ID
   * @returns {string[]} - All English translations
   */
  getAllEnglish(wordId) {
    const entry = VOCAB[wordId];
    if (!entry) return [];
    return entry[2];
  }

  /**
   * Get difficulty level for a word (1-4)
   * @param {string} wordId - The word ID
   * @returns {number} - Difficulty level (1=beginner, 4=advanced)
   */
  getDifficulty(wordId) {
    return this._difficultyCache[wordId] || 2; // Default to tier 2
  }

  // =====================================================
  // CATEGORY/SUBCATEGORY METHODS
  // =====================================================

  /**
   * Get all word IDs in a category
   * @param {string} categoryName - Category name (e.g., "family", "farming")
   * @returns {string[]} - Array of word IDs
   */
  getByCategory(categoryName) {
    const category = VOCAB_CATEGORIES[categoryName];
    if (!category) return [];

    const wordIds = new Set();
    for (const subcat of category.subcategories) {
      const ids = VOCAB_SUBCATEGORIES[subcat] || [];
      ids.forEach(id => wordIds.add(id));
    }
    return Array.from(wordIds);
  }

  /**
   * Get all word IDs in a subcategory
   * @param {string} subcategoryName - Subcategory name (e.g., "family_beginner")
   * @returns {string[]} - Array of word IDs
   */
  getBySubcategory(subcategoryName) {
    return VOCAB_SUBCATEGORIES[subcategoryName] || [];
  }

  /**
   * Get full word data for a category
   * @param {string} categoryName - Category name
   * @returns {object[]} - Array of word objects
   */
  getCategoryWords(categoryName) {
    return this.getByCategory(categoryName).map(id => this.get(id)).filter(w => w);
  }

  /**
   * Get full word data for a subcategory
   * @param {string} subcategoryName - Subcategory name
   * @returns {object[]} - Array of word objects
   */
  getSubcategoryWords(subcategoryName) {
    return this.getBySubcategory(subcategoryName).map(id => this.get(id)).filter(w => w);
  }

  // =====================================================
  // DIFFICULTY METHODS
  // =====================================================

  /**
   * Get all word IDs at a specific difficulty level
   * @param {number} level - Difficulty level (1-4)
   * @returns {string[]} - Array of word IDs
   */
  getByDifficulty(level) {
    return VOCAB_DIFFICULTY[level] || [];
  }

  /**
   * Get all word IDs at or below a difficulty level
   * @param {number} maxLevel - Maximum difficulty level (1-4)
   * @returns {string[]} - Array of word IDs
   */
  getUpToDifficulty(maxLevel) {
    const wordIds = [];
    for (let level = 1; level <= maxLevel; level++) {
      wordIds.push(...(VOCAB_DIFFICULTY[level] || []));
    }
    return wordIds;
  }

  /**
   * Get full word data at a difficulty level
   * @param {number} level - Difficulty level (1-4)
   * @returns {object[]} - Array of word objects
   */
  getDifficultyWords(level) {
    return this.getByDifficulty(level).map(id => this.get(id)).filter(w => w);
  }

  // =====================================================
  // LESSON METHODS
  // =====================================================

  /**
   * Get all word IDs for a lesson
   * @param {string} lessonId - Lesson ID (e.g., "lesson_1")
   * @returns {string[]} - Array of word IDs
   */
  getForLesson(lessonId) {
    return VOCAB_LESSONS[lessonId] || [];
  }

  /**
   * Get full word data for a lesson
   * @param {string} lessonId - Lesson ID
   * @returns {object[]} - Array of word objects
   */
  getLessonWords(lessonId) {
    return this.getForLesson(lessonId).map(id => this.get(id)).filter(w => w);
  }

  /**
   * Get all lessons a word appears in
   * @param {string} wordId - The word ID
   * @returns {string[]} - Array of lesson IDs
   */
  getLessonsForWord(wordId) {
    return this._lessonCache[wordId] || [];
  }

  // =====================================================
  // QUEST METHODS
  // =====================================================

  /**
   * Get all word IDs for a quest
   * @param {string} questId - Quest ID (e.g., "meeting_family")
   * @returns {string[]} - Array of word IDs
   */
  getForQuest(questId) {
    return VOCAB_QUESTS[questId] || [];
  }

  /**
   * Get full word data for a quest
   * @param {string} questId - Quest ID
   * @returns {object[]} - Array of word objects
   */
  getQuestWords(questId) {
    return this.getForQuest(questId).map(id => this.get(id)).filter(w => w);
  }

  // =====================================================
  // ZONE METHODS
  // =====================================================

  /**
   * Get all word IDs for a zone
   * @param {string} zoneName - Zone name (e.g., "dawnmere", "haari_fields")
   * @returns {string[]} - Array of word IDs
   */
  getForZone(zoneName) {
    const zone = VOCAB_ZONES[zoneName];
    if (!zone) return [];

    const wordIds = new Set();
    for (const subcat of zone.subcategories) {
      const ids = VOCAB_SUBCATEGORIES[subcat] || [];
      ids.forEach(id => wordIds.add(id));
    }
    return Array.from(wordIds);
  }

  /**
   * Get full word data for a zone
   * @param {string} zoneName - Zone name
   * @returns {object[]} - Array of word objects
   */
  getZoneWords(zoneName) {
    return this.getForZone(zoneName).map(id => this.get(id)).filter(w => w);
  }

  // =====================================================
  // PART OF SPEECH METHODS
  // =====================================================

  /**
   * Get all word IDs of a specific part of speech
   * @param {string} partOfSpeech - Part of speech (e.g., "noun", "verb", "adjective")
   * @returns {string[]} - Array of word IDs
   */
  getByPartOfSpeech(partOfSpeech) {
    const wordIds = [];
    for (const [id, entry] of Object.entries(VOCAB)) {
      if (entry[3] === partOfSpeech) {
        wordIds.push(id);
      }
    }
    return wordIds;
  }

  /**
   * Get all nouns
   * @returns {string[]} - Array of noun word IDs
   */
  getNouns() {
    return this.getByPartOfSpeech('noun');
  }

  /**
   * Get all verbs
   * @returns {string[]} - Array of verb word IDs
   */
  getVerbs() {
    return this.getByPartOfSpeech('verb');
  }

  /**
   * Get all adjectives
   * @returns {string[]} - Array of adjective word IDs
   */
  getAdjectives() {
    return this.getByPartOfSpeech('adjective');
  }

  /**
   * Get all phrases
   * @returns {string[]} - Array of phrase word IDs
   */
  getPhrases() {
    return this.getByPartOfSpeech('phrase');
  }

  // =====================================================
  // FILTERED QUERY METHODS
  // =====================================================

  /**
   * Get words matching multiple filters
   * @param {object} filters - Filter options
   * @param {string} [filters.category] - Category name
   * @param {string} [filters.subcategory] - Subcategory name
   * @param {number} [filters.difficulty] - Exact difficulty level
   * @param {number} [filters.maxDifficulty] - Maximum difficulty level
   * @param {string} [filters.partOfSpeech] - Part of speech
   * @param {string} [filters.zone] - Zone name
   * @param {string} [filters.lesson] - Lesson ID
   * @param {string} [filters.quest] - Quest ID
   * @returns {string[]} - Array of word IDs matching all filters
   */
  getFiltered(filters) {
    let wordIds = null; // null means "all words"

    // Apply each filter, intersecting results
    if (filters.category) {
      wordIds = this._intersect(wordIds, new Set(this.getByCategory(filters.category)));
    }
    if (filters.subcategory) {
      wordIds = this._intersect(wordIds, new Set(this.getBySubcategory(filters.subcategory)));
    }
    if (filters.difficulty !== undefined) {
      wordIds = this._intersect(wordIds, new Set(this.getByDifficulty(filters.difficulty)));
    }
    if (filters.maxDifficulty !== undefined) {
      wordIds = this._intersect(wordIds, new Set(this.getUpToDifficulty(filters.maxDifficulty)));
    }
    if (filters.partOfSpeech) {
      wordIds = this._intersect(wordIds, new Set(this.getByPartOfSpeech(filters.partOfSpeech)));
    }
    if (filters.zone) {
      wordIds = this._intersect(wordIds, new Set(this.getForZone(filters.zone)));
    }
    if (filters.lesson) {
      wordIds = this._intersect(wordIds, new Set(this.getForLesson(filters.lesson)));
    }
    if (filters.quest) {
      wordIds = this._intersect(wordIds, new Set(this.getForQuest(filters.quest)));
    }

    // If no filters applied, return all word IDs
    if (wordIds === null) {
      return Object.keys(VOCAB);
    }

    return Array.from(wordIds);
  }

  /**
   * Get full word data matching filters
   * @param {object} filters - Filter options (see getFiltered)
   * @returns {object[]} - Array of word objects
   */
  getFilteredWords(filters) {
    return this.getFiltered(filters).map(id => this.get(id)).filter(w => w);
  }

  /**
   * Intersect two sets (helper for filtering)
   * @private
   */
  _intersect(setA, setB) {
    if (setA === null) return setB;
    return new Set([...setA].filter(x => setB.has(x)));
  }

  // =====================================================
  // RANDOM SELECTION METHODS
  // =====================================================

  /**
   * Get random word IDs from a set
   * @param {string[]} wordIds - Array of word IDs to select from
   * @param {number} count - Number of words to select
   * @returns {string[]} - Random selection of word IDs
   */
  getRandom(wordIds, count) {
    const shuffled = [...wordIds].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Get random word IDs matching filters
   * @param {object} filters - Filter options (see getFiltered)
   * @param {number} count - Number of words to select
   * @returns {string[]} - Random selection of word IDs
   */
  getRandomFiltered(filters, count) {
    const matching = this.getFiltered(filters);
    return this.getRandom(matching, count);
  }

  /**
   * Get random full word data matching filters
   * @param {object} filters - Filter options (see getFiltered)
   * @param {number} count - Number of words to select
   * @returns {object[]} - Random selection of word objects
   */
  getRandomFilteredWords(filters, count) {
    return this.getRandomFiltered(filters, count).map(id => this.get(id)).filter(w => w);
  }

  // =====================================================
  // STATISTICS METHODS
  // =====================================================

  /**
   * Get total vocabulary count
   * @returns {number} - Total number of words
   */
  getTotalCount() {
    return Object.keys(VOCAB).length;
  }

  /**
   * Get count by category
   * @returns {object} - Object with category names as keys and counts as values
   */
  getCountByCategory() {
    const counts = {};
    for (const categoryName of Object.keys(VOCAB_CATEGORIES)) {
      counts[categoryName] = this.getByCategory(categoryName).length;
    }
    return counts;
  }

  /**
   * Get count by difficulty
   * @returns {object} - Object with difficulty levels as keys and counts as values
   */
  getCountByDifficulty() {
    const counts = {};
    for (const level of [1, 2, 3, 4]) {
      counts[level] = (VOCAB_DIFFICULTY[level] || []).length;
    }
    return counts;
  }

  /**
   * Get count by part of speech
   * @returns {object} - Object with parts of speech as keys and counts as values
   */
  getCountByPartOfSpeech() {
    const counts = {};
    for (const entry of Object.values(VOCAB)) {
      const pos = entry[3];
      counts[pos] = (counts[pos] || 0) + 1;
    }
    return counts;
  }

  /**
   * Get all category names
   * @returns {string[]} - Array of category names
   */
  getCategoryNames() {
    return Object.keys(VOCAB_CATEGORIES);
  }

  /**
   * Get all subcategory names
   * @returns {string[]} - Array of subcategory names
   */
  getSubcategoryNames() {
    return Object.keys(VOCAB_SUBCATEGORIES);
  }

  /**
   * Get all lesson IDs
   * @returns {string[]} - Array of lesson IDs
   */
  getLessonIds() {
    return Object.keys(VOCAB_LESSONS);
  }

  /**
   * Get all quest IDs
   * @returns {string[]} - Array of quest IDs
   */
  getQuestIds() {
    return Object.keys(VOCAB_QUESTS);
  }

  /**
   * Get all zone names
   * @returns {string[]} - Array of zone names
   */
  getZoneNames() {
    return Object.keys(VOCAB_ZONES);
  }
}

// Create singleton instance for browser use
const vocabIndex = new VocabIndex();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VocabIndex, vocabIndex };
}
