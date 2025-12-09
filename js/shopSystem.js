// ByteQuest - Shop System
// Phase 1: Buy-only, NPC shops, static inventory

// =====================================================
// Constants
// =====================================================

const ShopType = {
  GENERAL: 'general',
  EQUIPMENT: 'equipment',
  CONSUMABLES: 'consumables',
  SPECIALTY: 'specialty',
  ACCOUNT_UPGRADES: 'account_upgrades'
};

const ShopTypeInfo = {
  [ShopType.GENERAL]: {
    name: 'General Store',
    description: 'Sells a variety of common goods',
    icon: '🏪'
  },
  [ShopType.EQUIPMENT]: {
    name: 'Equipment Shop',
    description: 'Sells weapons and armor',
    icon: '⚔️'
  },
  [ShopType.CONSUMABLES]: {
    name: 'Consumables',
    description: 'Sells potions and food',
    icon: '🧪'
  },
  [ShopType.SPECIALTY]: {
    name: 'Specialty Shop',
    description: 'Sells unique or rare items',
    icon: '✨'
  },
  [ShopType.ACCOUNT_UPGRADES]: {
    name: 'Permanent Upgrades',
    description: 'Upgrades that persist across all saves',
    icon: '⭐'
  }
};

// =====================================================
// Shop Definitions
// =====================================================

const SHOP_DEFINITIONS = {
  rega_shop: {
    id: 'rega_shop',
    name: "Rega's Supplies",
    type: ShopType.GENERAL,
    npcId: 'rega',
    description: 'Basic supplies for travelers and settlers.',
    icon: '🏪',
    
    // Static inventory
    inventory: [
      { itemId: 'health_potion', price: 25 },
      { itemId: 'bread', price: 5 }
    ],
    
    // Shop dialogue
    dialogue: {
      greeting: "Welcome! Take a look at what I have.",
      purchase: "Pleasure doing business with you!",
      cantAfford: "Hmm, looks like you're a bit short on gold.",
      empty: "Sorry, I'm all out of that."
    }
  },
  
  merchant_shop: {
    id: 'merchant_shop',
    name: "Traveling Merchant",
    type: ShopType.GENERAL,
    npcId: 'merchant',
    description: 'Wares from across Turuem.',
    icon: '🧳',
    
    inventory: [
      { itemId: 'health_potion', price: 20 },
      { itemId: 'bread', price: 5 },
      { itemId: 'empty_bottle', price: 5 },
      { itemId: 'basic_helm', price: 50 },
      { itemId: 'leather_vest', price: 75 },
      { itemId: 'lucky_charm', price: 100 }
    ],
    
    dialogue: {
      greeting: "Looking to trade? I've got wares from across Turuem!",
      purchase: "A wise purchase, friend!",
      cantAfford: "Come back when you've got more coin.",
      empty: "Fresh out of those, I'm afraid."
    }
  },
  
  baker_shop: {
    id: 'baker_shop',
    name: "Marta's Bakery",
    type: ShopType.GENERAL,
    npcId: 'baker',
    description: 'Fresh bread and baked goods.',
    icon: '🍞',

    inventory: [
      { itemId: 'bread', price: 3 }
    ],

    dialogue: {
      greeting: "Welcome! The bread is fresh!",
      purchase: "Enjoy!",
      cantAfford: "Oh dear, not enough coin?",
      empty: "The oven is cooling, come back later."
    }
  },

  // =====================================================
  // Account Upgrade Shops (Permanent Upgrades)
  // =====================================================

  sage_upgrades: {
    id: 'sage_upgrades',
    name: "Sage's Wisdom",
    type: ShopType.ACCOUNT_UPGRADES,
    npcId: 'sage_aldric',
    description: 'Ancient knowledge that transcends time itself.',
    icon: '📜',

    // Account upgrades sold here (by upgrade ID)
    accountUpgrades: [
      'xp_multiplier_1',
      'xp_multiplier_2',
      'xp_multiplier_3',
      'quest_xp_boost',
      'faster_dialect_unlock',
      'dialect_bonus_xp'
    ],

    dialogue: {
      greeting: "Seeking knowledge that lasts forever? These teachings will stay with you across all your journeys.",
      purchase: "This wisdom is now part of your very soul.",
      cantAfford: "The cost of knowledge is not insignificant. Return when you have more gold.",
      alreadyOwned: "You have already learned this wisdom."
    }
  },

  merchant_upgrades: {
    id: 'merchant_upgrades',
    name: "Traveler's Blessings",
    type: ShopType.ACCOUNT_UPGRADES,
    npcId: 'merchant',
    description: 'Enchantments from distant lands.',
    icon: '✨',

    accountUpgrades: [
      'gold_multiplier_1',
      'gold_multiplier_2',
      'starting_gold',
      'double_loot_chance',
      'inventory_space'
    ],

    dialogue: {
      greeting: "I've collected rare enchantments from my travels. These blessings persist across all your adventures!",
      purchase: "May fortune favor you in all your journeys!",
      cantAfford: "These blessings don't come cheap, friend.",
      alreadyOwned: "You already carry this blessing."
    }
  },

  elder_upgrades: {
    id: 'elder_upgrades',
    name: "Elder's Legacy",
    type: ShopType.ACCOUNT_UPGRADES,
    npcId: 'urma',
    description: 'Blessings passed down through generations.',
    icon: '🌟',

    accountUpgrades: [
      'max_health_boost_1',
      'max_health_boost_2',
      'starting_level_boost',
      'fast_travel',
      'quest_tracker',
      'auto_sell_junk'
    ],

    dialogue: {
      greeting: "The elders have always shared their blessings with worthy travelers. These gifts will follow you always.",
      purchase: "The blessing is yours. May it serve you well.",
      cantAfford: "Even blessings require sacrifice. Gather more gold.",
      alreadyOwned: "This blessing already flows through you."
    }
  }

  // Additional shops can be added here
  // Example structure for future shops:
  /*
  blacksmith_shop: {
    id: 'blacksmith_shop',
    name: "Kolpa's Forge",
    type: ShopType.EQUIPMENT,
    npcId: 'kolpa',
    description: 'Quality weapons and armor from the Miners Guild.',
    icon: '⚒️',
    inventory: [
      { itemId: 'iron_sword', price: 100 },
      { itemId: 'iron_helm', price: 75 }
    ],
    dialogue: {
      greeting: "Need something sturdy? You've come to the right place.",
      purchase: "Treat it well, and it'll treat you well.",
      cantAfford: "Come back when you've got the coin.",
      empty: "I'll need to forge more of those."
    }
  }
  */
};

// =====================================================
// Shop Manager Class
// =====================================================

class ShopManager {
  constructor(gameState, shopDefinitions, itemManager) {
    this.state = gameState;
    this.shops = shopDefinitions || SHOP_DEFINITIONS;
    this.itemManager = itemManager;
    this.currentShop = null;
  }

  // ===================================================
  // Shop Access
  // ===================================================

  /**
   * Get shop definition by ID
   */
  getShop(shopId) {
    return this.shops[shopId] || null;
  }

  /**
   * Get shop by NPC ID (returns first match - use getShopsByNpc for all)
   */
  getShopByNpc(npcId) {
    return Object.values(this.shops).find(shop => shop.npcId === npcId) || null;
  }

  /**
   * Get all shops for an NPC (some NPCs have multiple shops)
   */
  getShopsByNpc(npcId) {
    return Object.values(this.shops).filter(shop => shop.npcId === npcId);
  }

  /**
   * Check if NPC has an account upgrade shop
   */
  npcHasAccountUpgradeShop(npcId) {
    return Object.values(this.shops).some(
      shop => shop.npcId === npcId && shop.type === ShopType.ACCOUNT_UPGRADES
    );
  }

  /**
   * Get account upgrade shop for an NPC (if exists)
   */
  getAccountUpgradeShopByNpc(npcId) {
    return Object.values(this.shops).find(
      shop => shop.npcId === npcId && shop.type === ShopType.ACCOUNT_UPGRADES
    ) || null;
  }

  /**
   * Get all shops
   */
  getAllShops() {
    return Object.values(this.shops);
  }

  /**
   * Get shops by type
   */
  getShopsByType(type) {
    return Object.values(this.shops).filter(shop => shop.type === type);
  }

  // ===================================================
  // Shop State
  // ===================================================

  /**
   * Open a shop (set as current)
   */
  openShop(shopId) {
    const shop = this.getShop(shopId);
    if (!shop) {
      return { success: false, message: 'Shop not found' };
    }
    
    this.currentShop = shop;
    return { success: true, shop };
  }

  /**
   * Close current shop
   */
  closeShop() {
    this.currentShop = null;
  }

  /**
   * Get current open shop
   */
  getCurrentShop() {
    return this.currentShop;
  }

  /**
   * Check if a shop is open
   */
  isShopOpen() {
    return this.currentShop !== null;
  }

  // ===================================================
  // Inventory & Pricing
  // ===================================================

  /**
   * Get shop inventory with item details
   */
  getShopInventory(shopId) {
    const shop = this.getShop(shopId);
    if (!shop) return [];

    return shop.inventory.map(entry => {
      const itemDef = this.itemManager ? this.itemManager.getDefinition(entry.itemId) : null;
      
      return {
        itemId: entry.itemId,
        price: entry.price,
        item: itemDef,
        available: true // Static inventory is always available
      };
    }).filter(entry => entry.item !== null);
  }

  /**
   * Get price of an item in a shop
   */
  getItemPrice(shopId, itemId) {
    const shop = this.getShop(shopId);
    if (!shop) return null;

    const entry = shop.inventory.find(e => e.itemId === itemId);
    return entry ? entry.price : null;
  }

  /**
   * Check if shop has an item
   */
  shopHasItem(shopId, itemId) {
    const shop = this.getShop(shopId);
    if (!shop) return false;

    return shop.inventory.some(e => e.itemId === itemId);
  }

  // ===================================================
  // Purchasing
  // ===================================================

  /**
   * Get player's current gold
   */
  getPlayerGold() {
    return this.state.player.gold || 0;
  }

  /**
   * Check if player can afford a price
   */
  canAfford(price) {
    return this.getPlayerGold() >= price;
  }

  /**
   * Check if player can afford an item from a shop
   */
  canAffordItem(shopId, itemId, quantity = 1) {
    const price = this.getItemPrice(shopId, itemId);
    if (price === null) return false;
    
    return this.canAfford(price * quantity);
  }

  /**
   * Purchase an item from a shop
   */
  purchaseItem(shopId, itemId, quantity = 1) {
    const shop = this.getShop(shopId);
    if (!shop) {
      return { success: false, message: 'Shop not found' };
    }

    // Check if item is in shop
    if (!this.shopHasItem(shopId, itemId)) {
      return { success: false, message: 'Item not available in this shop' };
    }

    // Get price with Luck discount
    let unitPrice = this.getItemPrice(shopId, itemId);
    let discount = 0;
    if (typeof statsManager !== 'undefined' && statsManager) {
      discount = statsManager.calculateShopDiscount();
      unitPrice = Math.floor(unitPrice * (1 - discount));
    }
    const totalPrice = unitPrice * quantity;

    // Check if player can afford
    if (!this.canAfford(totalPrice)) {
      return { 
        success: false, 
        message: shop.dialogue?.cantAfford || 'Not enough gold',
        shortfall: totalPrice - this.getPlayerGold()
      };
    }

    // Get item definition
    const itemDef = this.itemManager ? this.itemManager.getDefinition(itemId) : null;
    if (!itemDef) {
      return { success: false, message: 'Item definition not found' };
    }

    // Deduct gold
    this.state.player.gold -= totalPrice;

    // Add item to inventory
    let addResult = { success: true };
    if (this.itemManager) {
      addResult = this.itemManager.addItem(itemId, quantity);
    } else {
      // Fallback if no item manager
      this.addItemFallback(itemId, quantity);
    }

    // Track gold spent for achievements
    if (this.state.player.totalGoldSpent !== undefined) {
      this.state.player.totalGoldSpent += totalPrice;
    }

    return {
      success: true,
      message: shop.dialogue?.purchase || 'Purchase complete',
      item: itemDef,
      quantity,
      totalPrice,
      discount: discount > 0 ? Math.round(discount * 100) : 0,
      remainingGold: this.getPlayerGold()
    };
  }

  /**
   * Fallback method to add item if no ItemManager
   */
  addItemFallback(itemId, quantity) {
    if (!this.state.player.inventory) {
      this.state.player.inventory = [];
    }

    const existing = this.state.player.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += quantity;
    } else {
      this.state.player.inventory.push({ id: itemId, count: quantity });
    }
  }

  // ===================================================
  // Account Upgrade Methods
  // ===================================================

  /**
   * Check if a shop sells account upgrades
   */
  isAccountUpgradeShop(shopId) {
    const shop = this.getShop(shopId);
    return shop && shop.type === ShopType.ACCOUNT_UPGRADES;
  }

  /**
   * Get account upgrades available in a shop
   * Returns upgrade details with purchase status
   */
  getAccountUpgradeInventory(shopId) {
    const shop = this.getShop(shopId);
    if (!shop || shop.type !== ShopType.ACCOUNT_UPGRADES) return [];
    if (!shop.accountUpgrades) return [];

    // Need accountProgression to be available
    if (typeof accountProgression === 'undefined') {
      console.warn('AccountProgression not available');
      return [];
    }

    return shop.accountUpgrades.map(upgradeId => {
      const upgrade = accountProgressionConfig.getUpgrade(upgradeId);
      if (!upgrade) return null;

      const owned = accountProgression.hasUpgrade(upgradeId);
      const ownedCount = accountProgression.getUpgradeCount(upgradeId);
      const canPurchase = this.canPurchaseAccountUpgrade(shopId, upgradeId);

      return {
        upgradeId,
        upgrade,
        price: upgrade.cost?.gold || 0,
        owned,
        ownedCount,
        canPurchase: canPurchase.canPurchase,
        reason: canPurchase.reason
      };
    }).filter(entry => entry !== null);
  }

  /**
   * Check if player can purchase an account upgrade
   */
  canPurchaseAccountUpgrade(shopId, upgradeId) {
    const shop = this.getShop(shopId);
    if (!shop || shop.type !== ShopType.ACCOUNT_UPGRADES) {
      return { canPurchase: false, reason: 'Not an upgrade shop' };
    }

    if (!shop.accountUpgrades?.includes(upgradeId)) {
      return { canPurchase: false, reason: 'Upgrade not sold here' };
    }

    if (typeof accountProgression === 'undefined') {
      return { canPurchase: false, reason: 'System unavailable' };
    }

    const upgrade = accountProgressionConfig.getUpgrade(upgradeId);
    if (!upgrade) {
      return { canPurchase: false, reason: 'Upgrade not found' };
    }

    // Check if already owned (for one-time upgrades)
    if (upgrade.oneTime && accountProgression.hasUpgrade(upgradeId)) {
      return { canPurchase: false, reason: 'Already owned' };
    }

    // Check max stacks
    if (upgrade.maxStacks) {
      const count = accountProgression.getUpgradeCount(upgradeId);
      if (count >= upgrade.maxStacks) {
        return { canPurchase: false, reason: 'Max stacks reached' };
      }
    }

    // Check prerequisites
    if (upgrade.requires && !accountProgression.hasUpgrade(upgrade.requires)) {
      const prereq = accountProgressionConfig.getUpgrade(upgrade.requires);
      return { canPurchase: false, reason: `Requires: ${prereq?.name || upgrade.requires}` };
    }

    // Check gold
    const price = upgrade.cost?.gold || 0;
    if (!this.canAfford(price)) {
      return { canPurchase: false, reason: `Need ${price} gold` };
    }

    return { canPurchase: true, reason: null };
  }

  /**
   * Purchase an account upgrade from a shop
   */
  async purchaseAccountUpgrade(shopId, upgradeId) {
    const shop = this.getShop(shopId);
    if (!shop || shop.type !== ShopType.ACCOUNT_UPGRADES) {
      return { success: false, message: 'Not an upgrade shop' };
    }

    // Validate purchase
    const canPurchase = this.canPurchaseAccountUpgrade(shopId, upgradeId);
    if (!canPurchase.canPurchase) {
      return {
        success: false,
        message: shop.dialogue?.cantAfford || canPurchase.reason
      };
    }

    // Use accountProgression to handle the purchase
    try {
      const result = await accountProgression.purchaseUpgrade(upgradeId);

      // Track gold spent for achievements
      const upgrade = accountProgressionConfig.getUpgrade(upgradeId);
      if (this.state.player.totalGoldSpent !== undefined && upgrade?.cost?.gold) {
        this.state.player.totalGoldSpent += upgrade.cost.gold;
      }

      return {
        success: true,
        message: shop.dialogue?.purchase || result.message,
        upgrade: result.upgrade,
        remainingGold: this.getPlayerGold()
      };
    } catch (error) {
      // Check if it's an "already owned" error
      if (error.message.includes('only be purchased once')) {
        return {
          success: false,
          message: shop.dialogue?.alreadyOwned || error.message
        };
      }
      return { success: false, message: error.message };
    }
  }

  /**
   * Get all shops that sell a specific account upgrade
   */
  getShopsSellingUpgrade(upgradeId) {
    return Object.values(this.shops).filter(shop =>
      shop.type === ShopType.ACCOUNT_UPGRADES &&
      shop.accountUpgrades?.includes(upgradeId)
    );
  }

  /**
   * Get all account upgrade shops
   */
  getAccountUpgradeShops() {
    return this.getShopsByType(ShopType.ACCOUNT_UPGRADES);
  }

  // ===================================================
  // Purchase Validation
  // ===================================================

  /**
   * Validate a potential purchase without executing it
   */
  validatePurchase(shopId, itemId, quantity = 1) {
    const shop = this.getShop(shopId);
    
    const validation = {
      valid: true,
      errors: [],
      warnings: []
    };

    // Shop exists
    if (!shop) {
      validation.valid = false;
      validation.errors.push('Shop not found');
      return validation;
    }

    // Item in shop
    if (!this.shopHasItem(shopId, itemId)) {
      validation.valid = false;
      validation.errors.push('Item not available in this shop');
      return validation;
    }

    // Item definition exists
    const itemDef = this.itemManager ? this.itemManager.getDefinition(itemId) : null;
    if (!itemDef) {
      validation.valid = false;
      validation.errors.push('Item definition not found');
      return validation;
    }

    // Can afford
    const unitPrice = this.getItemPrice(shopId, itemId);
    const totalPrice = unitPrice * quantity;
    
    if (!this.canAfford(totalPrice)) {
      validation.valid = false;
      validation.errors.push(`Not enough gold (need ${totalPrice}, have ${this.getPlayerGold()})`);
    }

    // Check item requirements (level, class, etc.)
    if (this.itemManager && itemDef.levelRequired) {
      if (this.state.player.level < itemDef.levelRequired) {
        validation.warnings.push(`Requires level ${itemDef.levelRequired} to use`);
      }
    }

    // Check if unique and already owned
    if (itemDef.unique && this.itemManager && this.itemManager.hasItem(itemId)) {
      validation.valid = false;
      validation.errors.push('You already own this unique item');
    }

    return validation;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Get shop type info
 */
function getShopTypeInfo(type) {
  return ShopTypeInfo[type];
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return `${price} gold`;
}

/**
 * Format price with icon
 */
function formatPriceWithIcon(price) {
  return `💰 ${price}`;
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ShopType,
    ShopTypeInfo,
    SHOP_DEFINITIONS,
    ShopManager,
    getShopTypeInfo,
    formatPrice,
    formatPriceWithIcon
  };
}
