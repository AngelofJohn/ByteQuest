// ByteQuest - Item System
// Phase 1: Infrastructure skeleton

// =====================================================
// Constants
// =====================================================

const ItemCategory = {
  EQUIPMENT: 'equipment',
  CONSUMABLE: 'consumable',
  QUEST_ITEM: 'quest_item',
  COLLECTIBLE: 'collectible',
  CRAFTING_MATERIAL: 'crafting_material'
};

const ItemCategoryInfo = {
  [ItemCategory.EQUIPMENT]: {
    name: 'Equipment',
    description: 'Equippable items that go in gear slots',
    stackable: false,
    canDrop: true,
    canSell: true
  },
  [ItemCategory.CONSUMABLE]: {
    name: 'Consumable',
    description: 'One-time use items',
    stackable: true,
    canDrop: true,
    canSell: true
  },
  [ItemCategory.QUEST_ITEM]: {
    name: 'Quest Item',
    description: 'Items needed for specific quests',
    stackable: false,
    canDrop: false,
    canSell: false
  },
  [ItemCategory.COLLECTIBLE]: {
    name: 'Collectible',
    description: 'Rare items for achievements and lore',
    stackable: false,
    canDrop: false,
    canSell: false
  },
  [ItemCategory.CRAFTING_MATERIAL]: {
    name: 'Crafting Material',
    description: 'Materials used for crafting',
    stackable: true,
    canDrop: true,
    canSell: true
  }
};

const EquipmentSlot = {
  HELM: 'helm',
  ARMOR: 'armor',
  WEAPON: 'weapon',
  ACCESSORY: 'accessory',
  RING: 'ring'
};

const EquipmentSlotInfo = {
  [EquipmentSlot.HELM]: {
    name: 'Helm',
    icon: '🪖',
    description: 'Head protection'
  },
  [EquipmentSlot.ARMOR]: {
    name: 'Armor',
    icon: '🛡️',
    description: 'Body protection'
  },
  [EquipmentSlot.WEAPON]: {
    name: 'Weapon',
    icon: '⚔️',
    description: 'Primary weapon'
  },
  [EquipmentSlot.ACCESSORY]: {
    name: 'Accessory',
    icon: '📿',
    description: 'Accessory item'
  },
  [EquipmentSlot.RING]: {
    name: 'Ring',
    icon: '💍',
    description: 'Finger ring'
  }
};

const ItemRarity = {
  COMMON: 'common',
  RARE: 'rare',
  LEGENDARY: 'legendary'
};

const ItemRarityInfo = {
  [ItemRarity.COMMON]: {
    name: 'Common',
    color: '#ffffff',
    order: 0
  },
  [ItemRarity.RARE]: {
    name: 'Rare',
    color: '#4a90d9',
    order: 1
  },
  [ItemRarity.LEGENDARY]: {
    name: 'Legendary',
    color: '#ffd700',
    order: 2
  }
};

// =====================================================
// Item Template
// =====================================================

/**
 * Creates a new item definition
 * This is the structure all items should follow
 */
function createItemTemplate(overrides = {}) {
  return {
    // Identity
    id: '',
    name: '',
    description: '',
    icon: '❓',
    
    // Classification
    category: ItemCategory.CONSUMABLE,
    rarity: ItemRarity.COMMON,
    
    // Equipment-specific (only if category is EQUIPMENT)
    equipmentSlot: null, // EquipmentSlot value
    
    // Stats (all optional, values TBD after playtesting)
    stats: {
      stamina: 0,
      strength: 0,
      wisdom: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    },
    
    // Consumable effects (only if category is CONSUMABLE)
    effects: {
      hp: 0,           // HP restored
      maxHp: 0,        // Temporary max HP boost
      xpBonus: 0,      // Bonus XP (flat)
      xpMultiplier: 0, // Bonus XP (percentage)
      // Future effects can be added here
    },
    
    // Quest item specifics
    questId: null, // Associated quest ID
    
    // Collectible specifics
    collectibleSet: null, // Set this collectible belongs to
    loreText: null,       // Lore/flavor text
    
    // Crafting material specifics
    craftingTier: 0, // Tier of crafting material
    
    // Stacking
    stackable: false,
    maxStack: 1,
    
    // Economy (for future shop system)
    buyPrice: 0,
    sellPrice: 0,
    
    // Requirements
    levelRequired: 0,
    classRequired: null, // null = any class
    reputationRequired: null, // { factionId, rank }
    
    // Flags
    unique: false,     // Can only have one
    soulbound: false,  // Cannot be traded/sold
    hidden: false,     // Not shown in normal inventory views
    
    // Apply overrides
    ...overrides
  };
}

// =====================================================
// Item Manager Class
// =====================================================

class ItemManager {
  constructor(gameState, itemDefinitions) {
    this.state = gameState;
    this.definitions = itemDefinitions || {};
  }

  // ===================================================
  // Item Definition Access
  // ===================================================

  /**
   * Get an item definition by ID
   */
  getDefinition(itemId) {
    return this.definitions[itemId] || null;
  }

  /**
   * Get all items of a specific category
   */
  getItemsByCategory(category) {
    return Object.values(this.definitions).filter(
      item => item.category === category
    );
  }

  /**
   * Get all items of a specific rarity
   */
  getItemsByRarity(rarity) {
    return Object.values(this.definitions).filter(
      item => item.rarity === rarity
    );
  }

  /**
   * Get all equipment for a specific slot
   */
  getEquipmentForSlot(slot) {
    return Object.values(this.definitions).filter(
      item => item.category === ItemCategory.EQUIPMENT && item.equipmentSlot === slot
    );
  }

  // ===================================================
  // Inventory Management
  // ===================================================

  /**
   * Get player's inventory
   */
  getInventory() {
    return this.state.player.inventory || [];
  }

  /**
   * Find an item in inventory by ID
   */
  findInInventory(itemId) {
    return this.getInventory().find(item => item.id === itemId);
  }

  /**
   * Check if player has an item
   */
  hasItem(itemId, count = 1) {
    const item = this.findInInventory(itemId);
    return item && item.count >= count;
  }

  /**
   * Get count of an item in inventory
   */
  getItemCount(itemId) {
    const item = this.findInInventory(itemId);
    return item ? item.count : 0;
  }

  /**
   * Add item to inventory
   */
  addItem(itemId, count = 1) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      console.warn(`Unknown item: ${itemId}`);
      return { success: false, message: 'Unknown item' };
    }

    // Check if unique and already owned
    if (definition.unique && this.hasItem(itemId)) {
      return { success: false, message: 'You already have this unique item' };
    }

    const inventory = this.getInventory();
    const categoryInfo = ItemCategoryInfo[definition.category];

    if (categoryInfo.stackable && definition.stackable) {
      // Stackable item - find existing stack or create new
      const existing = this.findInInventory(itemId);
      if (existing) {
        const maxStack = definition.maxStack || 99;
        const spaceInStack = maxStack - existing.count;
        const toAdd = Math.min(count, spaceInStack);
        existing.count += toAdd;
        
        // Handle overflow (create new stacks if needed)
        const overflow = count - toAdd;
        if (overflow > 0) {
          // For now, just cap at max stack
          // Future: create additional stacks
        }
      } else {
        inventory.push({
          id: itemId,
          count: Math.min(count, definition.maxStack || 99)
        });
      }
    } else {
      // Non-stackable - add individual entries
      for (let i = 0; i < count; i++) {
        inventory.push({
          id: itemId,
          count: 1,
          instanceId: this.generateInstanceId() // Unique instance for non-stackables
        });
      }
    }

    return {
      success: true,
      message: `Received: ${definition.name}${count > 1 ? ` x${count}` : ''}`,
      item: definition
    };
  }

  /**
   * Remove item from inventory
   */
  removeItem(itemId, count = 1) {
    const inventory = this.getInventory();
    const index = inventory.findIndex(item => item.id === itemId);
    
    if (index === -1) {
      return { success: false, message: 'Item not found' };
    }

    const item = inventory[index];
    
    if (item.count > count) {
      item.count -= count;
    } else {
      inventory.splice(index, 1);
    }

    return { success: true, message: 'Item removed' };
  }

  /**
   * Generate unique instance ID for non-stackable items
   */
  generateInstanceId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ===================================================
  // Equipment Management
  // ===================================================

  /**
   * Get current equipment
   */
  getEquipment() {
    return this.state.player.equipment || {};
  }

  /**
   * Get equipped item in a slot
   */
  getEquippedItem(slot) {
    const equipment = this.getEquipment();
    const itemId = equipment[slot];
    return itemId ? this.getDefinition(itemId) : null;
  }

  /**
   * Equip an item
   */
  equipItem(itemId) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      return { success: false, message: 'Unknown item' };
    }

    if (definition.category !== ItemCategory.EQUIPMENT) {
      return { success: false, message: 'This item cannot be equipped' };
    }

    if (!definition.equipmentSlot) {
      return { success: false, message: 'This item has no equipment slot defined' };
    }

    // Check requirements
    const reqCheck = this.checkRequirements(definition);
    if (!reqCheck.met) {
      return { success: false, message: reqCheck.reason };
    }

    // Check if item is in inventory
    if (!this.hasItem(itemId)) {
      return { success: false, message: 'You do not have this item' };
    }

    const slot = definition.equipmentSlot;
    const equipment = this.getEquipment();

    // Unequip current item in slot (if any)
    if (equipment[slot]) {
      this.unequipItem(slot);
    }

    // Remove from inventory
    this.removeItem(itemId);

    // Equip
    equipment[slot] = itemId;

    // Recalculate stats
    this.recalculateEquipmentStats();

    return {
      success: true,
      message: `Equipped: ${definition.name}`,
      item: definition
    };
  }

  /**
   * Unequip an item from a slot
   */
  unequipItem(slot) {
    const equipment = this.getEquipment();
    const itemId = equipment[slot];

    if (!itemId) {
      return { success: false, message: 'Nothing equipped in this slot' };
    }

    const definition = this.getDefinition(itemId);

    // Add back to inventory
    this.addItem(itemId);

    // Clear slot
    equipment[slot] = null;

    // Recalculate stats
    this.recalculateEquipmentStats();

    return {
      success: true,
      message: `Unequipped: ${definition ? definition.name : itemId}`,
      item: definition
    };
  }

  /**
   * Check if player meets item requirements
   */
  checkRequirements(definition) {
    const player = this.state.player;

    // Level requirement
    if (definition.levelRequired && player.level < definition.levelRequired) {
      return { met: false, reason: `Requires level ${definition.levelRequired}` };
    }

    // Class requirement
    if (definition.classRequired && player.class !== definition.classRequired) {
      return { met: false, reason: `Requires ${definition.classRequired} class` };
    }

    // Reputation requirement
    if (definition.reputationRequired) {
      const { factionId, rank } = definition.reputationRequired;
      const playerRep = player.reputation[factionId] || 0;
      // Would need to convert rank to reputation value
      // For now, just check if they have any reputation
      if (playerRep < rank * 200) {
        return { met: false, reason: `Requires higher reputation` };
      }
    }

    return { met: true };
  }

  /**
   * Recalculate bonus stats from equipment
   */
  recalculateEquipmentStats() {
    const equipment = this.getEquipment();
    const bonusStats = {
      stamina: 0,
      strength: 0,
      wisdom: 0,
      agility: 0,
      insight: 0,
      luck: 0,
      devotion: 0,
      knowledge: 0
    };

    for (const slot of Object.values(EquipmentSlot)) {
      const itemId = equipment[slot];
      if (itemId) {
        const definition = this.getDefinition(itemId);
        if (definition && definition.stats) {
          for (const [stat, value] of Object.entries(definition.stats)) {
            if (bonusStats[stat] !== undefined) {
              bonusStats[stat] += value;
            }
          }
        }
      }
    }

    // Update player bonus stats
    this.state.player.bonusStats = bonusStats;

    return bonusStats;
  }

  // ===================================================
  // Consumable Usage
  // ===================================================

  /**
   * Use a consumable item
   */
  useConsumable(itemId) {
    const definition = this.getDefinition(itemId);
    if (!definition) {
      return { success: false, message: 'Unknown item' };
    }

    if (definition.category !== ItemCategory.CONSUMABLE) {
      return { success: false, message: 'This item cannot be used' };
    }

    if (!this.hasItem(itemId)) {
      return { success: false, message: 'You do not have this item' };
    }

    // Apply effects
    const effects = definition.effects || {};
    const results = [];

    if (effects.hp && effects.hp > 0) {
      const player = this.state.player;
      const oldHp = player.hp;
      player.hp = Math.min(player.maxHp, player.hp + effects.hp);
      const healed = player.hp - oldHp;
      results.push(`+${healed} HP`);
    }

    // Future effects would be handled here

    // Remove item
    this.removeItem(itemId);

    return {
      success: true,
      message: `Used: ${definition.name}`,
      results,
      item: definition
    };
  }

  // ===================================================
  // Inventory Queries
  // ===================================================

  /**
   * Get all items in inventory by category
   */
  getInventoryByCategory(category) {
    return this.getInventory()
      .map(item => ({
        ...item,
        definition: this.getDefinition(item.id)
      }))
      .filter(item => item.definition && item.definition.category === category);
  }

  /**
   * Get all equipment in inventory
   */
  getEquipmentInInventory() {
    return this.getInventoryByCategory(ItemCategory.EQUIPMENT);
  }

  /**
   * Get all consumables in inventory
   */
  getConsumablesInInventory() {
    return this.getInventoryByCategory(ItemCategory.CONSUMABLE);
  }

  /**
   * Get all quest items in inventory
   */
  getQuestItemsInInventory() {
    return this.getInventoryByCategory(ItemCategory.QUEST_ITEM);
  }

  /**
   * Get all collectibles in inventory
   */
  getCollectiblesInInventory() {
    return this.getInventoryByCategory(ItemCategory.COLLECTIBLE);
  }

  /**
   * Get inventory summary (counts by category)
   */
  getInventorySummary() {
    const inventory = this.getInventory();
    const summary = {
      total: inventory.length,
      byCategory: {},
      byRarity: {}
    };

    for (const item of inventory) {
      const definition = this.getDefinition(item.id);
      if (definition) {
        // Count by category
        summary.byCategory[definition.category] = (summary.byCategory[definition.category] || 0) + 1;
        // Count by rarity
        summary.byRarity[definition.rarity] = (summary.byRarity[definition.rarity] || 0) + 1;
      }
    }

    return summary;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Get category info
 */
function getItemCategoryInfo(category) {
  return ItemCategoryInfo[category];
}

/**
 * Get equipment slot info
 */
function getEquipmentSlotInfo(slot) {
  return EquipmentSlotInfo[slot];
}

/**
 * Get rarity info
 */
function getItemRarityInfo(rarity) {
  return ItemRarityInfo[rarity];
}

/**
 * Sort items by rarity (highest first)
 */
function sortByRarity(items) {
  return [...items].sort((a, b) => {
    const rarityA = ItemRarityInfo[a.rarity]?.order || 0;
    const rarityB = ItemRarityInfo[b.rarity]?.order || 0;
    return rarityB - rarityA;
  });
}

/**
 * Format item name with rarity color
 */
function formatItemName(item) {
  const rarityInfo = ItemRarityInfo[item.rarity];
  return {
    name: item.name,
    color: rarityInfo ? rarityInfo.color : '#ffffff'
  };
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ItemCategory,
    ItemCategoryInfo,
    EquipmentSlot,
    EquipmentSlotInfo,
    ItemRarity,
    ItemRarityInfo,
    createItemTemplate,
    ItemManager,
    getItemCategoryInfo,
    getEquipmentSlotInfo,
    getItemRarityInfo,
    sortByRarity,
    formatItemName
  };
}
