// ByteQuest - Shop System
// Phase 1: Buy-only, NPC shops, static inventory

// =====================================================
// Constants
// =====================================================

const ShopType = {
  GENERAL: 'general',
  EQUIPMENT: 'equipment',
  CONSUMABLES: 'consumables',
  SPECIALTY: 'specialty'
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
   * Get shop by NPC ID
   */
  getShopByNpc(npcId) {
    return Object.values(this.shops).find(shop => shop.npcId === npcId) || null;
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

    // Get price
    const unitPrice = this.getItemPrice(shopId, itemId);
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
