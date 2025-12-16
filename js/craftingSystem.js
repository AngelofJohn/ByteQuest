// ByteQuest - Crafting System
// Cooking and Leatherworking professions
// Works alongside alchemySystem.js and smithingSystem.js

// =====================================================
// Constants
// =====================================================

const CraftingProfession = {
  COOKING: 'cooking',
  LEATHERWORKING: 'leatherworking'
};

const CraftingSkillTiers = {
  NOVICE: { name: 'Novice', minLevel: 1, maxLevel: 25 },
  APPRENTICE: { name: 'Apprentice', minLevel: 26, maxLevel: 50 },
  JOURNEYMAN: { name: 'Journeyman', minLevel: 51, maxLevel: 75 },
  EXPERT: { name: 'Expert', minLevel: 76, maxLevel: 100 },
  MASTER: { name: 'Master', minLevel: 101, maxLevel: 150 }
};

const ProfessionInfo = {
  [CraftingProfession.COOKING]: {
    name: 'Cooking',
    description: 'Prepare food for HP recovery and temporary stat buffs.',
    icon: '🍳',
    primaryResource: 'fish',
    secondaryResource: 'herb',
    outputTypes: ['food']
  },
  [CraftingProfession.LEATHERWORKING]: {
    name: 'Leatherworking',
    description: 'Craft cloaks, boots, and accessories from hides.',
    icon: '🧵',
    primaryResource: 'hide',
    secondaryResource: 'herb',
    outputTypes: ['cloak', 'boots', 'accessory']
  }
};

// =====================================================
// Recipe Definitions - Cooking
// =====================================================

const COOKING_RECIPES = {
  // -------------------------------------------------
  // Tier 1 - Basic Meals (Novice)
  // -------------------------------------------------
  grilled_perch: {
    id: 'grilled_perch',
    name: 'Grilled Perch',
    profession: CraftingProfession.COOKING,
    category: 'food',
    description: 'A simple grilled fish. Restores 15 HP.',
    icon: '🍽️',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'fish', item: 'river_perch', amount: 1 }
    ],

    output: { item: 'grilled_perch', amount: 1 },
    xpReward: 10,

    effect: {
      type: 'heal',
      value: 15,
      description: 'Restores 15 HP'
    }
  },

  herb_salad: {
    id: 'herb_salad',
    name: 'Herb Salad',
    profession: CraftingProfession.COOKING,
    category: 'food',
    description: 'A fresh salad. Restores 10 HP.',
    icon: '🥗',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'herb', item: 'meadow_leaf', amount: 2 }
    ],

    output: { item: 'herb_salad', amount: 1 },
    xpReward: 8,

    effect: {
      type: 'heal',
      value: 10,
      description: 'Restores 10 HP'
    }
  },

  fishermans_stew: {
    id: 'fishermans_stew',
    name: "Fisherman's Stew",
    profession: CraftingProfession.COOKING,
    category: 'food',
    description: 'Hearty stew. Restores 25 HP.',
    icon: '🍲',

    levelRequired: 10,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'river_perch', amount: 2 },
      { type: 'herb', item: 'meadow_leaf', amount: 1 }
    ],

    output: { item: 'fishermans_stew', amount: 1 },
    xpReward: 20,

    effect: {
      type: 'heal',
      value: 25,
      description: 'Restores 25 HP'
    }
  },

  // -------------------------------------------------
  // Tier 2 - Stat Buff Foods (Apprentice)
  // -------------------------------------------------
  trout_fillet: {
    id: 'trout_fillet',
    name: 'Trout Fillet',
    profession: CraftingProfession.COOKING,
    category: 'food',
    description: 'Delicate fillet. Restores 35 HP.',
    icon: '🐟',

    levelRequired: 20,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'lake_trout', amount: 1 }
    ],

    output: { item: 'trout_fillet', amount: 1 },
    xpReward: 25,

    effect: {
      type: 'heal',
      value: 35,
      description: 'Restores 35 HP'
    }
  },

  scholars_meal: {
    id: 'scholars_meal',
    name: "Scholar's Meal",
    profession: CraftingProfession.COOKING,
    category: 'buff_food',
    description: 'Brain food. +1 Knowledge for 10 lessons.',
    icon: '📖',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'lake_trout', amount: 1 },
      { type: 'herb', item: 'sunpetal', amount: 2 }
    ],

    output: { item: 'scholars_meal', amount: 1 },
    xpReward: 40,

    effect: {
      type: 'tempStatBuff',
      stat: 'knowledge',
      value: 1,
      duration: 10,
      description: '+1 Knowledge for 10 lessons'
    }
  },

  fortifying_feast: {
    id: 'fortifying_feast',
    name: 'Fortifying Feast',
    profession: CraftingProfession.COOKING,
    category: 'buff_food',
    description: 'Strengthening meal. +10 Max HP for 10 lessons.',
    icon: '🍖',

    levelRequired: 30,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'lake_trout', amount: 2 },
      { type: 'herb', item: 'sunpetal', amount: 1 }
    ],

    output: { item: 'fortifying_feast', amount: 1 },
    xpReward: 45,

    effect: {
      type: 'tempStatBuff',
      stat: 'maxHp',
      value: 10,
      duration: 10,
      description: '+10 Max HP for 10 lessons'
    }
  },

  // -------------------------------------------------
  // Tier 3 - Premium Foods (Journeyman+)
  // -------------------------------------------------
  moonlit_sashimi: {
    id: 'moonlit_sashimi',
    name: 'Moonlit Sashimi',
    profession: CraftingProfession.COOKING,
    category: 'buff_food',
    description: 'Exquisite dish. +2 Wisdom for 10 lessons.',
    icon: '🌙',

    levelRequired: 45,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'sea_bass', amount: 2 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'moonlit_sashimi', amount: 1 },
    xpReward: 70,

    effect: {
      type: 'tempStatBuff',
      stat: 'wisdom',
      value: 2,
      duration: 10,
      description: '+2 Wisdom for 10 lessons'
    }
  },

  grand_banquet: {
    id: 'grand_banquet',
    name: 'Grand Banquet',
    profession: CraftingProfession.COOKING,
    category: 'buff_food',
    description: 'A feast fit for royalty. Restores 75 HP and +5% XP for 5 lessons.',
    icon: '👑',

    levelRequired: 50,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'fish', item: 'sea_bass', amount: 2 },
      { type: 'herb', item: 'moonblossom', amount: 2 },
      { type: 'herb', item: 'sunpetal', amount: 2 }
    ],

    output: { item: 'grand_banquet', amount: 1 },
    xpReward: 90,

    effect: {
      type: 'compound',
      effects: [
        { type: 'heal', value: 75, description: 'Restores 75 HP' },
        { type: 'xpMultiplier', value: 1.05, duration: 5, description: '+5% XP for 5 lessons' }
      ],
      description: 'Restores 75 HP and +5% XP for 5 lessons'
    }
  }
};

// =====================================================
// Recipe Definitions - Leatherworking
// =====================================================

const LEATHERWORKING_RECIPES = {
  // -------------------------------------------------
  // Tier 1 - Boar Hide (Novice)
  // -------------------------------------------------
  cured_boar_hide: {
    id: 'cured_boar_hide',
    name: 'Cured Boar Hide',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'materials',
    description: 'Properly treated hide ready for crafting.',
    icon: '🟫',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'hide', item: 'boar_hide', amount: 2 },
      { type: 'herb', item: 'meadow_leaf', amount: 1 }
    ],

    output: { item: 'cured_boar_hide', amount: 1 },
    xpReward: 12
  },

  leather_boots: {
    id: 'leather_boots',
    name: 'Leather Boots',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'boots',
    description: 'Sturdy boots for traveling.',
    icon: '👢',

    levelRequired: 5,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'boar_hide', amount: 3 },
      { type: 'wood', item: 'pine_log', amount: 1 }
    ],

    output: { item: 'leather_boots', amount: 1 },
    xpReward: 25,

    craftsEquipment: true,
    equipmentStats: { luck: 1 }
  },

  travelers_cloak: {
    id: 'travelers_cloak',
    name: "Traveler's Cloak",
    profession: CraftingProfession.LEATHERWORKING,
    category: 'cloak',
    description: 'A warm cloak for the road.',
    icon: '🧥',

    levelRequired: 10,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'boar_hide', amount: 4 },
      { type: 'herb', item: 'meadow_leaf', amount: 2 }
    ],

    output: { item: 'travelers_cloak', amount: 1 },
    xpReward: 35,

    craftsEquipment: true,
    equipmentStats: { defense: 1, devotion: 1 }
  },

  // -------------------------------------------------
  // Tier 2 - Wolf Pelt (Apprentice)
  // -------------------------------------------------
  cured_wolf_pelt: {
    id: 'cured_wolf_pelt',
    name: 'Cured Wolf Pelt',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'materials',
    description: 'Premium treated wolf leather.',
    icon: '🐺',

    levelRequired: 20,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'wolf_pelt', amount: 2 },
      { type: 'herb', item: 'sunpetal', amount: 1 }
    ],

    output: { item: 'cured_wolf_pelt', amount: 1 },
    xpReward: 25
  },

  wolf_fur_boots: {
    id: 'wolf_fur_boots',
    name: 'Wolf Fur Boots',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'boots',
    description: 'Warm, comfortable boots.',
    icon: '👢',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'wolf_pelt', amount: 3 },
      { type: 'wood', item: 'oak_timber', amount: 1 }
    ],

    output: { item: 'wolf_fur_boots', amount: 1 },
    xpReward: 45,

    craftsEquipment: true,
    equipmentStats: { luck: 2, defense: 1 }
  },

  rangers_cloak: {
    id: 'rangers_cloak',
    name: "Ranger's Cloak",
    profession: CraftingProfession.LEATHERWORKING,
    category: 'cloak',
    description: 'A fine cloak favored by scouts.',
    icon: '🧥',

    levelRequired: 30,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'wolf_pelt', amount: 4 },
      { type: 'herb', item: 'sunpetal', amount: 2 }
    ],

    output: { item: 'rangers_cloak', amount: 1 },
    xpReward: 55,

    craftsEquipment: true,
    equipmentStats: { defense: 2, knowledge: 1, luck: 1 }
  },

  lucky_charm_crafted: {
    id: 'lucky_charm_crafted',
    name: 'Lucky Charm',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'accessory',
    description: 'A small charm believed to bring fortune.',
    icon: '🍀',

    levelRequired: 35,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'wolf_pelt', amount: 2 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'lucky_charm', amount: 1 },
    xpReward: 50,

    craftsEquipment: true,
    equipmentStats: { luck: 3 }
  },

  // -------------------------------------------------
  // Tier 3 - Bear Fur (Journeyman+)
  // -------------------------------------------------
  cured_bear_fur: {
    id: 'cured_bear_fur',
    name: 'Cured Bear Fur',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'materials',
    description: 'The finest treated leather.',
    icon: '🐻',

    levelRequired: 40,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'bear_fur', amount: 2 },
      { type: 'herb', item: 'moonblossom', amount: 1 }
    ],

    output: { item: 'cured_bear_fur', amount: 1 },
    xpReward: 40
  },

  bear_fur_boots: {
    id: 'bear_fur_boots',
    name: 'Bear Fur Boots',
    profession: CraftingProfession.LEATHERWORKING,
    category: 'boots',
    description: 'Luxurious, warm boots.',
    icon: '👢',

    levelRequired: 45,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'bear_fur', amount: 3 },
      { type: 'wood', item: 'ironwood', amount: 1 }
    ],

    output: { item: 'bear_fur_boots', amount: 1 },
    xpReward: 70,

    craftsEquipment: true,
    equipmentStats: { luck: 3, defense: 2, maxHp: 5 }
  },

  masters_cloak: {
    id: 'masters_cloak',
    name: "Master's Cloak",
    profession: CraftingProfession.LEATHERWORKING,
    category: 'cloak',
    description: 'A magnificent cloak of superior craftsmanship.',
    icon: '🧥',

    levelRequired: 50,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'hide', item: 'bear_fur', amount: 5 },
      { type: 'herb', item: 'moonblossom', amount: 2 }
    ],

    output: { item: 'masters_cloak', amount: 1 },
    xpReward: 90,

    craftsEquipment: true,
    equipmentStats: { defense: 3, wisdom: 2, knowledge: 1 }
  }
};

// =====================================================
// Combined Recipe Registry
// =====================================================

const ALL_CRAFTING_RECIPES = {
  ...COOKING_RECIPES,
  ...LEATHERWORKING_RECIPES
};

// =====================================================
// Crafting Manager Class
// =====================================================

class CraftingManager {
  constructor(gameState) {
    this.state = gameState;
    this.recipes = ALL_CRAFTING_RECIPES;
    this.initializeCrafting();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeCrafting() {
    if (!this.state.player.skills) {
      this.state.player.skills = {};
    }

    // Initialize each profession
    for (const profession of Object.values(CraftingProfession)) {
      if (!this.state.player.skills[profession]) {
        this.state.player.skills[profession] = {
          level: 1,
          xp: 0
        };
      }
    }

    // Initialize unlocked recipes list if not exists
    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }

    // Initialize active food buffs
    if (!this.state.player.activeEffects) {
      this.state.player.activeEffects = {};
    }

    if (!this.state.player.activeEffects.foodBuffs) {
      this.state.player.activeEffects.foodBuffs = {
        active: null,
        remainingDuration: 0,
        bonuses: {}
      };
    }
  }

  // ===================================================
  // Skill Management
  // ===================================================

  getSkillLevel(profession) {
    return this.state.player.skills[profession]?.level || 1;
  }

  getSkillXP(profession) {
    return this.state.player.skills[profession]?.xp || 0;
  }

  getXPForLevel(level) {
    // XP required scales: 100 * level^1.5
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  getXPToNextLevel(profession) {
    const currentLevel = this.getSkillLevel(profession);
    const currentXP = this.getSkillXP(profession);
    const requiredXP = this.getXPForLevel(currentLevel);
    return requiredXP - currentXP;
  }

  addSkillXP(profession, amount) {
    const skills = this.state.player.skills[profession];
    if (!skills) return { xpGained: 0, leveledUp: false };

    skills.xp += amount;

    const result = {
      xpGained: amount,
      leveledUp: false,
      newLevel: skills.level,
      profession
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

  getSkillTier(profession) {
    const level = this.getSkillLevel(profession);
    for (const [key, tier] of Object.entries(CraftingSkillTiers)) {
      if (level >= tier.minLevel && level <= tier.maxLevel) {
        return tier;
      }
    }
    return CraftingSkillTiers.NOVICE;
  }

  getSkillProgressPercent(profession) {
    const currentXP = this.getSkillXP(profession);
    const neededXP = this.getXPForLevel(this.getSkillLevel(profession));
    return Math.floor((currentXP / neededXP) * 100);
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

  getRecipesByProfession(profession) {
    return this.getAllRecipes().filter(r => r.profession === profession);
  }

  getAvailableRecipes(profession = null) {
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    return this.getAllRecipes().filter(recipe => {
      // Filter by profession if specified
      if (profession && recipe.profession !== profession) {
        return false;
      }

      const level = this.getSkillLevel(recipe.profession);

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

  getLockedRecipes(profession = null) {
    const available = this.getAvailableRecipes(profession);
    const availableIds = new Set(available.map(r => r.id));

    return this.getAllRecipes().filter(r => {
      if (profession && r.profession !== profession) return false;
      return !availableIds.has(r.id);
    });
  }

  isRecipeUnlocked(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return false;

    const level = this.getSkillLevel(recipe.profession);
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
    // Check inventory using item manager if available
    if (typeof itemManager !== 'undefined' && itemManager) {
      return itemManager.getItemCount(ingredient.item);
    }
    // Fallback: check inventory directly
    const inv = this.state.player.inventory || [];
    const item = inv.find(i => i.id === ingredient.item);
    return item ? item.count : 0;
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
    const xpResult = this.addSkillXP(recipe.profession, recipe.xpReward);

    return {
      success: true,
      recipe,
      output: recipe.output,
      xpGained: recipe.xpReward,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      profession: recipe.profession
    };
  }

  removeIngredient(ingredient) {
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

  // ===================================================
  // Food Buff Management
  // ===================================================

  getActiveFoodBuff() {
    return this.state.player.activeEffects?.foodBuffs || null;
  }

  hasActiveFoodBuff() {
    const active = this.getActiveFoodBuff();
    return active && active.active !== null && active.remainingDuration > 0;
  }

  useFood(itemId) {
    // Find the recipe that produces this item
    const recipe = Object.values(this.recipes).find(r => r.output.item === itemId);
    if (!recipe) {
      return { success: false, message: 'Item not found' };
    }

    // Check if player has the food
    const hasFood = typeof itemManager !== 'undefined' && itemManager
      ? itemManager.hasItem(itemId)
      : (this.state.player.inventory || []).some(i => i.id === itemId);

    if (!hasFood) {
      return { success: false, message: 'You do not have this item' };
    }

    // Handle immediate heal effects
    if (recipe.effect?.type === 'heal') {
      // Remove the food from inventory
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

      // Apply heal
      const healAmount = recipe.effect.value;
      const currentHp = this.state.player.hp || 0;
      const maxHp = this.state.player.maxHp || 100;
      const newHp = Math.min(currentHp + healAmount, maxHp);
      this.state.player.hp = newHp;

      return {
        success: true,
        message: `${recipe.name} consumed! Restored ${newHp - currentHp} HP.`,
        healAmount: newHp - currentHp,
        newHp
      };
    }

    // Handle buff foods
    if (recipe.effect?.type === 'tempStatBuff' || recipe.effect?.type === 'compound') {
      // Check if another buff is already active
      if (this.hasActiveFoodBuff()) {
        return {
          success: false,
          message: 'A food buff is already active',
          currentBuff: this.getActiveFoodBuff()
        };
      }

      // Remove the food from inventory
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

      // Handle compound effects (heal + buff)
      if (recipe.effect.type === 'compound') {
        let healResult = null;
        for (const eff of recipe.effect.effects) {
          if (eff.type === 'heal') {
            const currentHp = this.state.player.hp || 0;
            const maxHp = this.state.player.maxHp || 100;
            const newHp = Math.min(currentHp + eff.value, maxHp);
            this.state.player.hp = newHp;
            healResult = { healed: newHp - currentHp };
          } else if (eff.type === 'tempStatBuff' || eff.type === 'xpMultiplier') {
            this.state.player.activeEffects.foodBuffs = {
              active: itemId,
              remainingDuration: eff.duration,
              bonuses: {
                [eff.type === 'xpMultiplier' ? 'xpMultiplier' : eff.stat]: eff.value
              }
            };
          }
        }
        return {
          success: true,
          message: `${recipe.name} consumed!`,
          effect: recipe.effect,
          healResult
        };
      }

      // Activate the buff
      this.state.player.activeEffects.foodBuffs = {
        active: itemId,
        remainingDuration: recipe.effect.duration,
        bonuses: {
          [recipe.effect.stat]: recipe.effect.value
        }
      };

      return {
        success: true,
        message: `${recipe.name} consumed! ${recipe.effect.description}`,
        effect: recipe.effect
      };
    }

    return { success: false, message: 'Unknown food effect type' };
  }

  decrementFoodBuffDuration() {
    const active = this.state.player.activeEffects?.foodBuffs;
    if (!active || !active.active) return null;

    active.remainingDuration--;

    if (active.remainingDuration <= 0) {
      const expiredFood = active.active;
      active.active = null;
      active.bonuses = {};

      return {
        expired: true,
        food: expiredFood
      };
    }

    return {
      expired: false,
      remaining: active.remainingDuration
    };
  }

  getFoodBonus(bonusType) {
    const active = this.state.player.activeEffects?.foodBuffs;
    if (!active || !active.active) return null;

    return active.bonuses[bonusType] || null;
  }

  // ===================================================
  // UI Helpers
  // ===================================================

  getRecipesByCategory(profession) {
    const recipes = this.getAvailableRecipes(profession);
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

  getProfessionInfo(profession) {
    return ProfessionInfo[profession] || null;
  }

  getAllProfessions() {
    return Object.values(CraftingProfession);
  }
}

// =====================================================
// Helper Functions
// =====================================================

function getCraftingProfessionInfo(profession) {
  return ProfessionInfo[profession];
}

function getAllCraftingProfessions() {
  return Object.values(CraftingProfession);
}

function getCraftingCategories(profession) {
  const recipes = Object.values(ALL_CRAFTING_RECIPES).filter(r => r.profession === profession);
  return [...new Set(recipes.map(r => r.category))];
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CraftingProfession,
    CraftingSkillTiers,
    ProfessionInfo,
    COOKING_RECIPES,
    LEATHERWORKING_RECIPES,
    ALL_CRAFTING_RECIPES,
    CraftingManager,
    getCraftingProfessionInfo,
    getAllCraftingProfessions,
    getCraftingCategories
  };
}
