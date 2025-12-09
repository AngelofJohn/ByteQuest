// ByteQuest - Alchemy System
// Crafting potions from gathered resources and linguistic essence

// =====================================================
// Constants
// =====================================================

const AlchemySkillTiers = {
  INITIATE: { name: 'Initiate', minLevel: 1, maxLevel: 25 },
  APPRENTICE: { name: 'Apprentice', minLevel: 26, maxLevel: 50 },
  JOURNEYMAN: { name: 'Journeyman', minLevel: 51, maxLevel: 75 },
  EXPERT: { name: 'Expert', minLevel: 76, maxLevel: 100 },
  MASTER: { name: 'Master', minLevel: 101, maxLevel: 150 }
};

const EssenceTier = {
  FADED: 'faded',
  CLEAR: 'clear',
  VIVID: 'vivid',
  BRILLIANT: 'brilliant'
};

const EssenceInfo = {
  [EssenceTier.FADED]: {
    name: 'Faded Essence',
    tier: 1,
    description: 'A dim wisp of linguistic energy. Basic essence from simple reviews.',
    icon: '💫',
    color: '#a0a0a0'
  },
  [EssenceTier.CLEAR]: {
    name: 'Clear Essence',
    tier: 2,
    description: 'A bright mote of comprehension. Generated from mixed vocabulary reviews.',
    icon: '✨',
    color: '#87ceeb'
  },
  [EssenceTier.VIVID]: {
    name: 'Vivid Essence',
    tier: 3,
    description: 'A radiant spark of fluency. Earned through challenging reviews.',
    icon: '🌟',
    color: '#ffd700'
  },
  [EssenceTier.BRILLIANT]: {
    name: 'Brilliant Essence',
    tier: 4,
    description: 'A dazzling core of mastery. The reward of true linguistic dedication.',
    icon: '💎',
    color: '#ff69b4'
  }
};

// =====================================================
// Recipe Definitions
// =====================================================

const ALCHEMY_RECIPES = {
  // -------------------------------------------------
  // Known Recipes (available from start)
  // -------------------------------------------------

  // Basic Health Potion (existing in game, now craftable)
  health_potion_t1: {
    id: 'health_potion_t1',
    name: 'Minor Health Potion',
    category: 'healing',
    description: 'A simple restorative draught.',
    icon: '🧪',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'herb', item: 'meadow_leaf', amount: 2 },
      { type: 'bottle', item: 'empty_bottle', amount: 1 }
    ],

    output: { item: 'health_potion', amount: 1 },
    xpReward: 10,

    craftTime: 0 // Instant
  },

  // Cognitive Potions (Linguistic Essence recipes)
  clarity_draught: {
    id: 'clarity_draught',
    name: 'Clarity Draught',
    category: 'cognitive',
    description: 'Sharpens the mind for learning. +10% XP for 5 lessons.',
    icon: '🔮',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'essence', item: EssenceTier.FADED, amount: 3 },
      { type: 'herb', item: 'meadow_leaf', amount: 1 }
    ],

    output: { item: 'clarity_draught', amount: 1 },
    xpReward: 15,

    effect: {
      type: 'xpMultiplier',
      value: 1.1,
      duration: 5, // lessons
      description: '+10% XP for 5 lessons'
    }
  },

  memory_tonic: {
    id: 'memory_tonic',
    name: 'Memory Tonic',
    category: 'cognitive',
    description: 'Soothes the sting of mistakes. Reduces wrong answer penalty by 50%.',
    icon: '🧠',

    levelRequired: 5,
    unlockMethod: 'known',

    ingredients: [
      { type: 'essence', item: EssenceTier.CLEAR, amount: 2 },
      { type: 'herb', item: 'sunpetal', amount: 1 }
    ],

    output: { item: 'memory_tonic', amount: 1 },
    xpReward: 20,

    effect: {
      type: 'penaltyReduction',
      value: 0.5,
      duration: 5,
      description: '-50% wrong answer penalty for 5 lessons'
    }
  },

  focus_elixir: {
    id: 'focus_elixir',
    name: 'Focus Elixir',
    category: 'cognitive',
    description: 'Grants additional clarity. +1 hint use per lesson for 3 lessons.',
    icon: '🎯',

    levelRequired: 10,
    unlockMethod: 'known',

    ingredients: [
      { type: 'essence', item: EssenceTier.VIVID, amount: 3 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'focus_elixir', amount: 1 },
    xpReward: 30,

    effect: {
      type: 'bonusHints',
      value: 1,
      duration: 3,
      description: '+1 hint per lesson for 3 lessons'
    }
  },

  // -------------------------------------------------
  // Skill-Gated Recipes
  // -------------------------------------------------

  scholars_brew: {
    id: 'scholars_brew',
    name: "Scholar's Brew",
    category: 'cognitive',
    description: 'Accelerates mastery progress. Double mastery progress for 10 words.',
    icon: '📚',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'essence', item: EssenceTier.CLEAR, amount: 5 },
      { type: 'herb', item: 'sunpetal', amount: 2 }
    ],

    output: { item: 'scholars_brew', amount: 1 },
    xpReward: 40,

    effect: {
      type: 'masteryBoost',
      value: 2,
      duration: 10, // words
      description: '2x mastery progress for next 10 words'
    }
  },

  insight_potion: {
    id: 'insight_potion',
    name: 'Insight Potion',
    category: 'cognitive',
    description: 'Reveals the optimal path. Shows best answer for 1 lesson.',
    icon: '👁️',

    levelRequired: 40,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'essence', item: EssenceTier.BRILLIANT, amount: 2 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'insight_potion', amount: 1 },
    xpReward: 50,

    effect: {
      type: 'revealAnswer',
      value: true,
      duration: 1,
      description: 'Highlights correct answer for 1 lesson'
    }
  },

  // -------------------------------------------------
  // Unlockable Recipes (shops, reputation, quests)
  // -------------------------------------------------

  linguists_draught: {
    id: 'linguists_draught',
    name: "Linguist's Draught",
    category: 'cognitive',
    description: 'A masterful blend. +25% XP for 10 lessons.',
    icon: '📖',

    levelRequired: 30,
    unlockMethod: 'shop',
    unlockSource: 'lurenium_alchemist',
    unlockCost: 200,

    ingredients: [
      { type: 'essence', item: EssenceTier.VIVID, amount: 4 },
      { type: 'herb', item: 'moonblossom', amount: 2 }
    ],

    output: { item: 'linguists_draught', amount: 1 },
    xpReward: 45,

    effect: {
      type: 'xpMultiplier',
      value: 1.25,
      duration: 10,
      description: '+25% XP for 10 lessons'
    }
  },

  retention_brew: {
    id: 'retention_brew',
    name: 'Retention Brew',
    category: 'cognitive',
    description: 'Preserves knowledge. Words do not decay for 7 days.',
    icon: '🔒',

    levelRequired: 35,
    unlockMethod: 'shop',
    unlockSource: 'miners_deep_shop',
    unlockCost: 250,

    ingredients: [
      { type: 'essence', item: EssenceTier.CLEAR, amount: 6 },
      { type: 'herb', item: 'sunpetal', amount: 3 }
    ],

    output: { item: 'retention_brew', amount: 1 },
    xpReward: 50,

    effect: {
      type: 'preventDecay',
      value: true,
      duration: 7, // days
      description: 'Words do not decay for 7 days'
    }
  },

  polyglots_elixir: {
    id: 'polyglots_elixir',
    name: "Polyglot's Elixir",
    category: 'cognitive',
    description: 'Reveals word origins. Hints show etymology.',
    icon: '🌍',

    levelRequired: 45,
    unlockMethod: 'reputation',
    unlockSource: 'horticulturists',
    unlockRank: 3, // Honored

    ingredients: [
      { type: 'essence', item: EssenceTier.BRILLIANT, amount: 3 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'polyglots_elixir', amount: 1 },
    xpReward: 60,

    effect: {
      type: 'showEtymology',
      value: true,
      duration: 5,
      description: 'Hints show word etymology for 5 lessons'
    }
  },

  comprehension_tonic: {
    id: 'comprehension_tonic',
    name: 'Comprehension Tonic',
    category: 'cognitive',
    description: 'Instant understanding. French text shows inline glosses.',
    icon: '💡',

    levelRequired: 50,
    unlockMethod: 'reputation',
    unlockSource: 'church_of_light', // Order of the Dawn
    unlockRank: 2, // Friend

    ingredients: [
      { type: 'essence', item: EssenceTier.BRILLIANT, amount: 4 },
      { type: 'herb', item: 'moonblossom', amount: 2 }
    ],

    output: { item: 'comprehension_tonic', amount: 1 },
    xpReward: 70,

    effect: {
      type: 'inlineGloss',
      value: true,
      duration: 5,
      description: 'French text shows inline translations for 5 lessons'
    }
  },

  // -------------------------------------------------
  // Traditional Potions (non-cognitive)
  // -------------------------------------------------

  health_potion_t2: {
    id: 'health_potion_t2',
    name: 'Health Potion',
    category: 'healing',
    description: 'A stronger restorative. Restores 50 HP.',
    icon: '🧪',

    levelRequired: 20,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'herb', item: 'sunpetal', amount: 3 },
      { type: 'bottle', item: 'empty_bottle', amount: 1 }
    ],

    output: { item: 'health_potion_t2', amount: 1 },
    xpReward: 25,

    effect: {
      type: 'heal',
      value: 50,
      duration: null,
      description: 'Restores 50 HP'
    }
  },

  health_potion_t3: {
    id: 'health_potion_t3',
    name: 'Greater Health Potion',
    category: 'healing',
    description: 'A powerful restorative. Restores 100 HP.',
    icon: '🧪',

    levelRequired: 40,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'herb', item: 'moonblossom', amount: 3 },
      { type: 'bottle', item: 'empty_bottle', amount: 1 }
    ],

    output: { item: 'health_potion_t3', amount: 1 },
    xpReward: 40,

    effect: {
      type: 'heal',
      value: 100,
      duration: null,
      description: 'Restores 100 HP'
    }
  }
};

// =====================================================
// Alchemy Manager Class
// =====================================================

class AlchemyManager {
  constructor(gameState) {
    this.state = gameState;
    this.recipes = ALCHEMY_RECIPES;
    this.initializeAlchemy();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeAlchemy() {
    if (!this.state.player.skills) {
      this.state.player.skills = {};
    }

    if (!this.state.player.skills.alchemy) {
      this.state.player.skills.alchemy = {
        level: 1,
        xp: 0
      };
    }

    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }

    // Initialize essence storage
    if (!this.state.player.resources) {
      this.state.player.resources = {};
    }

    if (!this.state.player.resources.linguisticEssence) {
      this.state.player.resources.linguisticEssence = {
        faded: 0,
        clear: 0,
        vivid: 0,
        brilliant: 0
      };
    }

    // Initialize active cognitive potion effects
    if (!this.state.player.activeEffects) {
      this.state.player.activeEffects = {};
    }

    if (!this.state.player.activeEffects.cognitivePotions) {
      this.state.player.activeEffects.cognitivePotions = {
        active: null,
        remainingDuration: 0,
        bonuses: {}
      };
    }
  }

  // ===================================================
  // Skill Management
  // ===================================================

  getAlchemyLevel() {
    return this.state.player.skills.alchemy?.level || 1;
  }

  getAlchemyXP() {
    return this.state.player.skills.alchemy?.xp || 0;
  }

  getXPForLevel(level) {
    // XP required scales: 100 * level^1.5
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  getXPToNextLevel() {
    const currentLevel = this.getAlchemyLevel();
    const currentXP = this.getAlchemyXP();
    const requiredXP = this.getXPForLevel(currentLevel);
    return requiredXP - currentXP;
  }

  addAlchemyXP(amount) {
    const skills = this.state.player.skills.alchemy;
    skills.xp += amount;

    const result = {
      xpGained: amount,
      leveledUp: false,
      newLevel: skills.level
    };

    // Check for level up
    while (skills.xp >= this.getXPForLevel(skills.level)) {
      skills.xp -= this.getXPForLevel(skills.level);
      skills.level++;
      result.leveledUp = true;
      result.newLevel = skills.level;
    }

    return result;
  }

  getSkillTier() {
    const level = this.getAlchemyLevel();
    for (const [key, tier] of Object.entries(AlchemySkillTiers)) {
      if (level >= tier.minLevel && level <= tier.maxLevel) {
        return tier;
      }
    }
    return AlchemySkillTiers.INITIATE;
  }

  // ===================================================
  // Essence Management
  // ===================================================

  getEssence(tier) {
    return this.state.player.resources.linguisticEssence?.[tier] || 0;
  }

  getAllEssence() {
    return this.state.player.resources.linguisticEssence || {
      faded: 0,
      clear: 0,
      vivid: 0,
      brilliant: 0
    };
  }

  addEssence(tier, amount) {
    if (!this.state.player.resources.linguisticEssence) {
      this.state.player.resources.linguisticEssence = {
        faded: 0, clear: 0, vivid: 0, brilliant: 0
      };
    }

    this.state.player.resources.linguisticEssence[tier] += amount;

    return {
      tier,
      amount,
      newTotal: this.state.player.resources.linguisticEssence[tier]
    };
  }

  removeEssence(tier, amount) {
    const current = this.getEssence(tier);
    if (current < amount) {
      return { success: false, message: 'Not enough essence' };
    }

    this.state.player.resources.linguisticEssence[tier] -= amount;
    return { success: true };
  }

  // ===================================================
  // Recipe Management
  // ===================================================

  getRecipe(recipeId) {
    return this.recipes[recipeId] || null;
  }

  getAllRecipes() {
    return Object.values(this.recipes);
  }

  getAvailableRecipes() {
    const level = this.getAlchemyLevel();
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    return this.getAllRecipes().filter(recipe => {
      // Check level requirement
      if (recipe.levelRequired > level) {
        return false;
      }

      // Check unlock method
      switch (recipe.unlockMethod) {
        case 'known':
          return true;
        case 'skill':
          return recipe.levelRequired <= level;
        case 'shop':
        case 'reputation':
        case 'quest':
          return unlockedRecipes.includes(recipe.id);
        default:
          return false;
      }
    });
  }

  getLockedRecipes() {
    const available = this.getAvailableRecipes();
    const availableIds = new Set(available.map(r => r.id));

    return this.getAllRecipes().filter(r => !availableIds.has(r.id));
  }

  isRecipeUnlocked(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return false;

    const level = this.getAlchemyLevel();
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    if (recipe.levelRequired > level) return false;

    switch (recipe.unlockMethod) {
      case 'known':
        return true;
      case 'skill':
        return recipe.levelRequired <= level;
      case 'shop':
      case 'reputation':
      case 'quest':
        return unlockedRecipes.includes(recipe.id);
      default:
        return false;
    }
  }

  unlockRecipe(recipeId) {
    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }

    if (!this.state.player.unlockedRecipes.includes(recipeId)) {
      this.state.player.unlockedRecipes.push(recipeId);
      return { success: true, message: `Recipe unlocked: ${this.recipes[recipeId]?.name}` };
    }

    return { success: false, message: 'Recipe already unlocked' };
  }

  // ===================================================
  // Crafting
  // ===================================================

  canCraft(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) {
      return { canCraft: false, reason: 'Recipe not found' };
    }

    // Check if recipe is unlocked
    if (!this.isRecipeUnlocked(recipeId)) {
      return { canCraft: false, reason: 'Recipe not unlocked' };
    }

    // Check ingredients
    const missingIngredients = [];

    for (const ingredient of recipe.ingredients) {
      const available = this.getIngredientCount(ingredient);
      if (available < ingredient.amount) {
        missingIngredients.push({
          ...ingredient,
          have: available,
          need: ingredient.amount
        });
      }
    }

    if (missingIngredients.length > 0) {
      return {
        canCraft: false,
        reason: 'Missing ingredients',
        missingIngredients
      };
    }

    return { canCraft: true };
  }

  getIngredientCount(ingredient) {
    switch (ingredient.type) {
      case 'essence':
        return this.getEssence(ingredient.item);
      case 'herb':
      case 'bottle':
      case 'ore':
      default:
        // Check inventory using item manager if available
        if (typeof itemManager !== 'undefined' && itemManager) {
          return itemManager.getItemCount(ingredient.item);
        }
        // Fallback: check inventory directly
        const inv = this.state.player.inventory || [];
        const item = inv.find(i => i.id === ingredient.item);
        return item ? item.count : 0;
    }
  }

  craft(recipeId) {
    const canCraftResult = this.canCraft(recipeId);
    if (!canCraftResult.canCraft) {
      return { success: false, ...canCraftResult };
    }

    const recipe = this.getRecipe(recipeId);

    // Remove ingredients
    for (const ingredient of recipe.ingredients) {
      this.removeIngredient(ingredient);
    }

    // Add output item
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.addItem(recipe.output.item, recipe.output.amount);
    } else {
      // Fallback: add to inventory directly
      const inv = this.state.player.inventory || [];
      const existing = inv.find(i => i.id === recipe.output.item);
      if (existing) {
        existing.count += recipe.output.amount;
      } else {
        inv.push({ id: recipe.output.item, count: recipe.output.amount });
      }
    }

    // Award XP
    const xpResult = this.addAlchemyXP(recipe.xpReward);

    return {
      success: true,
      recipe,
      output: recipe.output,
      xpGained: recipe.xpReward,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel
    };
  }

  removeIngredient(ingredient) {
    switch (ingredient.type) {
      case 'essence':
        this.removeEssence(ingredient.item, ingredient.amount);
        break;
      case 'herb':
      case 'bottle':
      case 'ore':
      default:
        if (typeof itemManager !== 'undefined' && itemManager) {
          itemManager.removeItem(ingredient.item, ingredient.amount);
        } else {
          const inv = this.state.player.inventory || [];
          const item = inv.find(i => i.id === ingredient.item);
          if (item) {
            item.count -= ingredient.amount;
            if (item.count <= 0) {
              const index = inv.indexOf(item);
              inv.splice(index, 1);
            }
          }
        }
    }
  }

  // ===================================================
  // Cognitive Potion Effects
  // ===================================================

  getActiveCognitivePotion() {
    return this.state.player.activeEffects?.cognitivePotions || null;
  }

  hasActiveCognitivePotion() {
    const active = this.getActiveCognitivePotion();
    return active && active.active !== null && active.remainingDuration > 0;
  }

  useCognitivePotion(itemId) {
    // Find the recipe that produces this item
    const recipe = Object.values(this.recipes).find(r => r.output.item === itemId);
    if (!recipe || recipe.category !== 'cognitive') {
      return { success: false, message: 'Not a cognitive potion' };
    }

    // Check if player has the potion
    const hasPotion = typeof itemManager !== 'undefined' && itemManager
      ? itemManager.hasItem(itemId)
      : (this.state.player.inventory || []).some(i => i.id === itemId);

    if (!hasPotion) {
      return { success: false, message: 'You do not have this potion' };
    }

    // Check if another potion is already active
    if (this.hasActiveCognitivePotion()) {
      return {
        success: false,
        message: 'A cognitive potion is already active',
        currentPotion: this.getActiveCognitivePotion()
      };
    }

    // Remove the potion from inventory
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.removeItem(itemId);
    } else {
      const inv = this.state.player.inventory || [];
      const item = inv.find(i => i.id === itemId);
      if (item) {
        item.count--;
        if (item.count <= 0) {
          const index = inv.indexOf(item);
          inv.splice(index, 1);
        }
      }
    }

    // Activate the effect
    this.state.player.activeEffects.cognitivePotions = {
      active: itemId,
      remainingDuration: recipe.effect.duration,
      bonuses: {
        [recipe.effect.type]: recipe.effect.value
      }
    };

    return {
      success: true,
      message: `${recipe.name} activated!`,
      effect: recipe.effect
    };
  }

  decrementCognitivePotionDuration() {
    const active = this.state.player.activeEffects?.cognitivePotions;
    if (!active || !active.active) return null;

    active.remainingDuration--;

    if (active.remainingDuration <= 0) {
      const expiredPotion = active.active;
      active.active = null;
      active.bonuses = {};

      return {
        expired: true,
        potion: expiredPotion
      };
    }

    return {
      expired: false,
      remaining: active.remainingDuration
    };
  }

  getCognitiveBonus(bonusType) {
    const active = this.state.player.activeEffects?.cognitivePotions;
    if (!active || !active.active) return null;

    return active.bonuses[bonusType] || null;
  }

  // ===================================================
  // UI Helpers
  // ===================================================

  getRecipesByCategory() {
    const recipes = this.getAvailableRecipes();
    const byCategory = {};

    for (const recipe of recipes) {
      if (!byCategory[recipe.category]) {
        byCategory[recipe.category] = [];
      }
      byCategory[recipe.category].push(recipe);
    }

    return byCategory;
  }

  formatIngredient(ingredient) {
    switch (ingredient.type) {
      case 'essence':
        const essenceInfo = EssenceInfo[ingredient.item];
        return {
          name: essenceInfo?.name || ingredient.item,
          icon: essenceInfo?.icon || '✨',
          amount: ingredient.amount,
          have: this.getEssence(ingredient.item)
        };
      default:
        // Get item info from game data
        const itemDef = typeof GAME_DATA !== 'undefined'
          ? GAME_DATA.items[ingredient.item]
          : null;
        return {
          name: itemDef?.name || ingredient.item,
          icon: itemDef?.icon || '❓',
          amount: ingredient.amount,
          have: this.getIngredientCount(ingredient)
        };
    }
  }

  getSkillProgressPercent() {
    const currentXP = this.getAlchemyXP();
    const neededXP = this.getXPForLevel(this.getAlchemyLevel());
    return Math.floor((currentXP / neededXP) * 100);
  }
}

// =====================================================
// Helper Functions
// =====================================================

function getEssenceInfo(tier) {
  return EssenceInfo[tier];
}

function getAllEssenceTypes() {
  return Object.values(EssenceTier);
}

function getRecipeCategories() {
  return ['healing', 'cognitive'];
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AlchemySkillTiers,
    EssenceTier,
    EssenceInfo,
    ALCHEMY_RECIPES,
    AlchemyManager,
    getEssenceInfo,
    getAllEssenceTypes,
    getRecipeCategories
  };
}
