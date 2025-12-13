// ByteQuest - Smithing System
// Crafting weapons and armor from ore and bars

// =====================================================
// Constants
// =====================================================

const SmithingSkillTiers = {
  INITIATE: { name: 'Initiate', minLevel: 1, maxLevel: 25 },
  APPRENTICE: { name: 'Apprentice', minLevel: 26, maxLevel: 50 },
  JOURNEYMAN: { name: 'Journeyman', minLevel: 51, maxLevel: 75 },
  EXPERT: { name: 'Expert', minLevel: 76, maxLevel: 100 },
  MASTER: { name: 'Master', minLevel: 101, maxLevel: 150 }
};

// =====================================================
// Recipe Definitions
// =====================================================

const SMITHING_RECIPES = {
  // -------------------------------------------------
  // Smelting (Ore -> Bars)
  // -------------------------------------------------
  copper_bar: {
    id: 'copper_bar',
    name: 'Copper Bar',
    category: 'smelting',
    description: 'Smelt copper chunks into a usable bar.',
    icon: '🔶',

    levelRequired: 1,
    unlockMethod: 'known',

    ingredients: [
      { type: 'ore', item: 'copper_chunk', amount: 3 }
    ],

    output: { item: 'copper_bar', amount: 1 },
    xpReward: 10
  },

  iron_bar: {
    id: 'iron_bar',
    name: 'Iron Bar',
    category: 'smelting',
    description: 'Smelt iron ore into a sturdy bar.',
    icon: '🔷',

    levelRequired: 20,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'ore', item: 'iron_ore', amount: 3 }
    ],

    output: { item: 'iron_bar', amount: 1 },
    xpReward: 25
  },

  silver_bar: {
    id: 'silver_bar',
    name: 'Silver Bar',
    category: 'smelting',
    description: 'Smelt silver vein into a gleaming bar.',
    icon: '⬜',

    levelRequired: 40,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'ore', item: 'silver_vein', amount: 3 }
    ],

    output: { item: 'silver_bar', amount: 1 },
    xpReward: 40
  },

  // -------------------------------------------------
  // Copper Tier Weapons
  // -------------------------------------------------
  copper_dagger: {
    id: 'copper_dagger',
    name: 'Copper Dagger',
    category: 'weapons',
    description: 'A simple but effective blade.',
    icon: '🗡️',

    levelRequired: 5,
    unlockMethod: 'known',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 2 },
      { type: 'wood', item: 'pine_log', amount: 1 }
    ],

    output: { item: 'copper_dagger', amount: 1 },
    xpReward: 20
  },

  copper_sword: {
    id: 'copper_sword',
    name: 'Copper Sword',
    category: 'weapons',
    description: 'A balanced copper blade.',
    icon: '⚔️',

    levelRequired: 10,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 4 },
      { type: 'wood', item: 'pine_log', amount: 1 },
      { type: 'hide', item: 'boar_hide', amount: 1 }
    ],

    output: { item: 'copper_sword', amount: 1 },
    xpReward: 35
  },

  // -------------------------------------------------
  // Iron Tier Weapons
  // -------------------------------------------------
  iron_dagger: {
    id: 'iron_dagger',
    name: 'Iron Dagger',
    category: 'weapons',
    description: 'A sharp iron blade.',
    icon: '🗡️',

    levelRequired: 25,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 2 },
      { type: 'wood', item: 'oak_timber', amount: 1 }
    ],

    output: { item: 'iron_dagger', amount: 1 },
    xpReward: 45
  },

  iron_sword: {
    id: 'iron_sword',
    name: 'Iron Sword',
    category: 'weapons',
    description: 'A reliable iron sword.',
    icon: '⚔️',

    levelRequired: 35,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 4 },
      { type: 'wood', item: 'oak_timber', amount: 1 },
      { type: 'hide', item: 'wolf_pelt', amount: 1 }
    ],

    output: { item: 'iron_sword', amount: 1 },
    xpReward: 60
  },

  // -------------------------------------------------
  // Copper Tier Armor
  // -------------------------------------------------
  copper_helm: {
    id: 'copper_helm',
    name: 'Copper Helm',
    category: 'armor',
    description: 'Basic head protection.',
    icon: '🪖',

    levelRequired: 8,
    unlockMethod: 'known',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 3 }
    ],

    output: { item: 'copper_helm', amount: 1 },
    xpReward: 25
  },

  copper_chestplate: {
    id: 'copper_chestplate',
    name: 'Copper Chestplate',
    category: 'armor',
    description: 'Torso protection for the novice smith.',
    icon: '🛡️',

    levelRequired: 15,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'copper_bar', amount: 5 },
      { type: 'hide', item: 'boar_hide', amount: 2 }
    ],

    output: { item: 'copper_chestplate', amount: 1 },
    xpReward: 45
  },

  // -------------------------------------------------
  // Iron Tier Armor
  // -------------------------------------------------
  iron_helm: {
    id: 'iron_helm',
    name: 'Iron Helm',
    category: 'armor',
    description: 'Sturdy iron head protection.',
    icon: '🪖',

    levelRequired: 30,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 3 }
    ],

    output: { item: 'iron_helm', amount: 1 },
    xpReward: 50
  },

  iron_chestplate: {
    id: 'iron_chestplate',
    name: 'Iron Chestplate',
    category: 'armor',
    description: 'Heavy iron armor for serious protection.',
    icon: '🛡️',

    levelRequired: 45,
    unlockMethod: 'skill',

    ingredients: [
      { type: 'bar', item: 'iron_bar', amount: 5 },
      { type: 'hide', item: 'wolf_pelt', amount: 2 }
    ],

    output: { item: 'iron_chestplate', amount: 1 },
    xpReward: 70
  }
};

// =====================================================
// Smithing Manager Class
// =====================================================

class SmithingManager {
  constructor(gameState) {
    this.state = gameState;
    this.recipes = SMITHING_RECIPES;
    this.initializeSmithing();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeSmithing() {
    if (!this.state.player.skills) {
      this.state.player.skills = {};
    }

    if (!this.state.player.skills.smithing) {
      this.state.player.skills.smithing = {
        level: 1,
        xp: 0
      };
    }

    if (!this.state.player.unlockedRecipes) {
      this.state.player.unlockedRecipes = [];
    }
  }

  // ===================================================
  // Skill Management
  // ===================================================

  getSmithingLevel() {
    return this.state.player.skills.smithing?.level || 1;
  }

  getSmithingXP() {
    return this.state.player.skills.smithing?.xp || 0;
  }

  getXPForLevel(level) {
    // XP required scales: 100 * level^1.5
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  getXPToNextLevel() {
    const currentLevel = this.getSmithingLevel();
    const currentXP = this.getSmithingXP();
    const requiredXP = this.getXPForLevel(currentLevel);
    return requiredXP - currentXP;
  }

  addSmithingXP(amount) {
    const skills = this.state.player.skills.smithing;
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
    const level = this.getSmithingLevel();
    for (const [key, tier] of Object.entries(SmithingSkillTiers)) {
      if (level >= tier.minLevel && level <= tier.maxLevel) {
        return tier;
      }
    }
    return SmithingSkillTiers.INITIATE;
  }

  getSkillProgressPercent() {
    const currentXP = this.getSmithingXP();
    const requiredXP = this.getXPForLevel(this.getSmithingLevel());
    return Math.floor((currentXP / requiredXP) * 100);
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
    const level = this.getSmithingLevel();
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

    const level = this.getSmithingLevel();
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

  getRecipesByCategory() {
    const recipes = this.getAvailableRecipes();
    const categories = {};

    for (const recipe of recipes) {
      if (!categories[recipe.category]) {
        categories[recipe.category] = [];
      }
      categories[recipe.category].push(recipe);
    }

    return categories;
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
    const xpResult = this.addSmithingXP(recipe.xpReward);

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
  // UI Helpers
  // ===================================================

  formatIngredient(ingredient) {
    // Get item info
    const itemData = GAME_DATA?.items?.[ingredient.item];
    const available = this.getIngredientCount(ingredient);

    return {
      name: itemData?.name || ingredient.item,
      icon: itemData?.icon || '?',
      amount: ingredient.amount,
      have: available,
      sufficient: available >= ingredient.amount
    };
  }

  getCategoryIcon(category) {
    const icons = {
      smelting: '🔥',
      weapons: '⚔️',
      armor: '🛡️',
      tools: '🔧'
    };
    return icons[category] || '🔨';
  }

  getCategoryName(category) {
    const names = {
      smelting: 'Smelting',
      weapons: 'Weapons',
      armor: 'Armor',
      tools: 'Tools'
    };
    return names[category] || category;
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SmithingSkillTiers,
    SMITHING_RECIPES,
    SmithingManager
  };
}
