// ByteQuest - Enchanting System
// Enhancing equipment with magical properties

// =====================================================
// Constants
// =====================================================

const EnchantingSkillTiers = {
  INITIATE: { name: 'Initiate', minLevel: 1, maxLevel: 25 },
  APPRENTICE: { name: 'Apprentice', minLevel: 26, maxLevel: 50 },
  JOURNEYMAN: { name: 'Journeyman', minLevel: 51, maxLevel: 75 },
  EXPERT: { name: 'Expert', minLevel: 76, maxLevel: 100 },
  MASTER: { name: 'Master', minLevel: 101, maxLevel: 150 }
};

const EnchantmentTypes = {
  FIRE: { name: 'Fire', icon: '🔥', color: '#ff4500' },
  FROST: { name: 'Frost', icon: '❄️', color: '#87ceeb' },
  WISDOM: { name: 'Wisdom', icon: '📚', color: '#9370db' }
};

// =====================================================
// Recipe Definitions
// =====================================================

const ENCHANTING_RECIPES = {
  // -------------------------------------------------
  // Fire Enchantments
  // -------------------------------------------------
  fire_weapon: {
    id: 'fire_weapon',
    name: 'Fire Enchantment (Weapon)',
    category: 'weapon_enchants',
    description: 'Imbue a weapon with the power of fire. Adds +1-2 Insight.',
    icon: '🔥',

    levelRequired: 1,
    unlockMethod: 'known',

    // Valid base items that can receive this enchantment
    validBaseItems: ['copper_sword', 'copper_dagger', 'iron_sword', 'iron_dagger'],
    enchantmentType: 'fire',
    outputSuffix: '_fire',

    // Materials required (in addition to base item)
    ingredients: [
      { type: 'essence', item: 'vivid', amount: 2 },
      { type: 'material', item: 'fire_shard', amount: 1 }
    ],

    xpReward: 30
  },

  // -------------------------------------------------
  // Frost Enchantments
  // -------------------------------------------------
  frost_weapon: {
    id: 'frost_weapon',
    name: 'Frost Enchantment (Weapon)',
    category: 'weapon_enchants',
    description: 'Imbue a weapon with the chill of frost. Adds +1-2 Agility.',
    icon: '❄️',

    levelRequired: 10,
    unlockMethod: 'skill',

    validBaseItems: ['copper_sword', 'copper_dagger', 'iron_sword', 'iron_dagger'],
    enchantmentType: 'frost',
    outputSuffix: '_frost',

    ingredients: [
      { type: 'essence', item: 'vivid', amount: 2 },
      { type: 'material', item: 'frost_shard', amount: 1 }
    ],

    xpReward: 30
  },

  // -------------------------------------------------
  // Wisdom Enchantments
  // -------------------------------------------------
  wisdom_armor: {
    id: 'wisdom_armor',
    name: 'Wisdom Enchantment (Helm)',
    category: 'armor_enchants',
    description: 'Inscribe a helm with runes of knowledge. Adds +2-3 Knowledge.',
    icon: '📚',

    levelRequired: 15,
    unlockMethod: 'skill',

    validBaseItems: ['copper_helm', 'iron_helm'],
    enchantmentType: 'wisdom',
    outputSuffix: '_wisdom',

    ingredients: [
      { type: 'essence', item: 'clear', amount: 3 },
      { type: 'material', item: 'wisdom_dust', amount: 2 }
    ],

    xpReward: 40
  }
};

// =====================================================
// Enchanting Manager Class
// =====================================================

class EnchantingManager {
  constructor(gameState) {
    this.state = gameState;
    this.recipes = ENCHANTING_RECIPES;
    this.initializeEnchanting();
  }

  // ===================================================
  // Initialization
  // ===================================================

  initializeEnchanting() {
    if (!this.state.player.skills) {
      this.state.player.skills = {};
    }

    if (!this.state.player.skills.enchanting) {
      this.state.player.skills.enchanting = {
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

  getEnchantingLevel() {
    return this.state.player.skills.enchanting?.level || 1;
  }

  getEnchantingXP() {
    return this.state.player.skills.enchanting?.xp || 0;
  }

  getXPForLevel(level) {
    // XP required scales: 100 * level^1.5
    return Math.floor(100 * Math.pow(level, 1.5));
  }

  getXPToNextLevel() {
    const currentLevel = this.getEnchantingLevel();
    const currentXP = this.getEnchantingXP();
    const requiredXP = this.getXPForLevel(currentLevel);
    return requiredXP - currentXP;
  }

  addEnchantingXP(amount) {
    const skills = this.state.player.skills.enchanting;
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
    const level = this.getEnchantingLevel();
    for (const [key, tier] of Object.entries(EnchantingSkillTiers)) {
      if (level >= tier.minLevel && level <= tier.maxLevel) {
        return tier;
      }
    }
    return EnchantingSkillTiers.INITIATE;
  }

  getSkillProgressPercent() {
    const currentXP = this.getEnchantingXP();
    const requiredXP = this.getXPForLevel(this.getEnchantingLevel());
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
    const level = this.getEnchantingLevel();
    const unlockedRecipes = this.state.player.unlockedRecipes || [];

    return this.getAllRecipes().filter(recipe => {
      if (recipe.levelRequired > level) {
        return false;
      }

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

    const level = this.getEnchantingLevel();
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
  // Enchantable Item Discovery
  // ===================================================

  /**
   * Get items in inventory that can receive a specific enchantment
   */
  getEnchantableItems(recipeId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return [];

    const inventory = this.state.player.inventory || [];
    const enchantableItems = [];

    for (const invItem of inventory) {
      // Check if this item is in the valid base items list
      if (recipe.validBaseItems.includes(invItem.id)) {
        const itemData = GAME_DATA?.items?.[invItem.id];
        if (itemData) {
          // Check that the enchanted version exists
          const enchantedId = invItem.id + recipe.outputSuffix;
          if (GAME_DATA?.items?.[enchantedId]) {
            enchantableItems.push({
              id: invItem.id,
              name: itemData.name,
              icon: itemData.icon,
              count: invItem.count,
              outputId: enchantedId,
              outputName: GAME_DATA.items[enchantedId].name
            });
          }
        }
      }
    }

    return enchantableItems;
  }

  /**
   * Check if player has any items that can be enchanted with this recipe
   */
  hasEnchantableItem(recipeId) {
    return this.getEnchantableItems(recipeId).length > 0;
  }

  // ===================================================
  // Essence Management (shared with Alchemy)
  // ===================================================

  getEssence(tier) {
    return this.state.player.resources?.linguisticEssence?.[tier] || 0;
  }

  removeEssence(tier, amount) {
    if (!this.state.player.resources?.linguisticEssence) return { success: false };

    const current = this.getEssence(tier);
    if (current < amount) {
      return { success: false, message: 'Not enough essence' };
    }

    this.state.player.resources.linguisticEssence[tier] -= amount;
    return { success: true };
  }

  // ===================================================
  // Crafting (Enchanting)
  // ===================================================

  canEnchant(recipeId, baseItemId) {
    const recipe = this.getRecipe(recipeId);
    if (!recipe) {
      return { canEnchant: false, reason: 'Recipe not found' };
    }

    // Check if recipe is unlocked
    if (!this.isRecipeUnlocked(recipeId)) {
      return { canEnchant: false, reason: 'Recipe not unlocked' };
    }

    // Check if base item is valid for this enchantment
    if (!recipe.validBaseItems.includes(baseItemId)) {
      return { canEnchant: false, reason: 'Item cannot receive this enchantment' };
    }

    // Check if player has the base item
    const hasBaseItem = this.getIngredientCount({ item: baseItemId }) >= 1;
    if (!hasBaseItem) {
      return { canEnchant: false, reason: 'You do not have this item' };
    }

    // Check if enchanted output exists
    const outputId = baseItemId + recipe.outputSuffix;
    if (!GAME_DATA?.items?.[outputId]) {
      return { canEnchant: false, reason: 'Enchanted item not defined' };
    }

    // Check materials
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
        canEnchant: false,
        reason: 'Missing materials',
        missingIngredients
      };
    }

    return { canEnchant: true, outputId };
  }

  getIngredientCount(ingredient) {
    // Handle essence separately
    if (ingredient.type === 'essence') {
      return this.getEssence(ingredient.item);
    }

    // Check inventory using item manager if available
    if (typeof itemManager !== 'undefined' && itemManager) {
      return itemManager.getItemCount(ingredient.item);
    }

    // Fallback: check inventory directly
    const inv = this.state.player.inventory || [];
    const item = inv.find(i => i.id === ingredient.item);
    return item ? item.count : 0;
  }

  enchant(recipeId, baseItemId) {
    const canEnchantResult = this.canEnchant(recipeId, baseItemId);
    if (!canEnchantResult.canEnchant) {
      return { success: false, ...canEnchantResult };
    }

    const recipe = this.getRecipe(recipeId);
    const outputId = canEnchantResult.outputId;

    // Remove the base item
    this.removeIngredient({ item: baseItemId, amount: 1 });

    // Remove material ingredients
    for (const ingredient of recipe.ingredients) {
      this.removeIngredient(ingredient);
    }

    // Add the enchanted item
    if (typeof itemManager !== 'undefined' && itemManager) {
      itemManager.addItem(outputId, 1);
    } else {
      const inv = this.state.player.inventory || [];
      const existing = inv.find(i => i.id === outputId);
      if (existing) {
        existing.count += 1;
      } else {
        inv.push({ id: outputId, count: 1 });
      }
    }

    // Award XP
    const xpResult = this.addEnchantingXP(recipe.xpReward);

    const outputItem = GAME_DATA?.items?.[outputId];

    return {
      success: true,
      recipe,
      baseItemId,
      output: { item: outputId, name: outputItem?.name || outputId, amount: 1 },
      xpGained: recipe.xpReward,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel
    };
  }

  removeIngredient(ingredient) {
    if (ingredient.type === 'essence') {
      this.removeEssence(ingredient.item, ingredient.amount);
      return;
    }

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
    // Handle essence
    if (ingredient.type === 'essence') {
      const essenceInfo = {
        faded: { name: 'Faded Essence', icon: '💫' },
        clear: { name: 'Clear Essence', icon: '✨' },
        vivid: { name: 'Vivid Essence', icon: '🌟' },
        brilliant: { name: 'Brilliant Essence', icon: '💎' }
      };
      const info = essenceInfo[ingredient.item] || { name: ingredient.item, icon: '?' };
      const available = this.getEssence(ingredient.item);

      return {
        name: info.name,
        icon: info.icon,
        amount: ingredient.amount,
        have: available,
        sufficient: available >= ingredient.amount
      };
    }

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
      weapon_enchants: '⚔️',
      armor_enchants: '🛡️',
      special: '✨'
    };
    return icons[category] || '✨';
  }

  getCategoryName(category) {
    const names = {
      weapon_enchants: 'Weapon Enchants',
      armor_enchants: 'Armor Enchants',
      special: 'Special'
    };
    return names[category] || category;
  }
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EnchantingSkillTiers,
    EnchantmentTypes,
    ENCHANTING_RECIPES,
    EnchantingManager
  };
}
