/**
 * ByteQuest Account Progression Manager
 *
 * Handles:
 * - Upgrade purchasing (uses regular game gold)
 * - Effect application
 * - Persistent upgrade storage (localStorage)
 *
 * Note: Upgrades persist across saves, but gold comes from current save.
 * All game balance is in accountProgressionConfig.js
 */

class AccountProgressionManager {
  constructor(configModule) {
    this.config = configModule;
    this.accountId = this.getOrCreateAccountId();
    this.purchasedUpgrades = this.loadPurchasedUpgrades();
  }

  // ============================================
  // Gold Access (uses GameState)
  // ============================================

  /**
   * Get current gold from active save
   */
  getGold() {
    if (typeof GameState !== 'undefined' && GameState.player) {
      return GameState.player.gold || 0;
    }
    return 0;
  }

  /**
   * Spend gold from active save
   */
  spendGold(amount) {
    if (typeof GameState === 'undefined' || !GameState.player) {
      throw new Error('No active save file');
    }

    if (GameState.player.gold < amount) {
      throw new Error(
        `Insufficient gold: need ${amount}, have ${GameState.player.gold}`
      );
    }

    GameState.player.gold -= amount;

    // Trigger save and UI update
    if (typeof saveGame === 'function') {
      saveGame();
    }
    if (typeof updateHUD === 'function') {
      updateHUD();
    }
  }

  // ============================================
  // Upgrade Purchasing
  // ============================================

  async purchaseUpgrade(upgradeId) {
    const upgrade = this.config.getUpgrade(upgradeId);
    if (!upgrade) {
      throw new Error(`Upgrade not found in config: ${upgradeId}`);
    }

    // Check prerequisites
    if (upgrade.requires) {
      if (!this.hasUpgrade(upgrade.requires)) {
        throw new Error(`Missing prerequisite: ${upgrade.requires}`);
      }
    }

    // Check gold cost
    const cost = upgrade.cost.gold || 0;
    const currentGold = this.getGold();
    if (currentGold < cost) {
      throw new Error(
        `Insufficient gold: need ${cost}, have ${currentGold}`
      );
    }

    // Check if already purchased (for one-time upgrades)
    if (upgrade.oneTime && this.hasUpgrade(upgradeId)) {
      throw new Error('This upgrade can only be purchased once');
    }

    // Check stacking limits
    if (upgrade.maxStacks) {
      const count = this.getUpgradeCount(upgradeId);
      if (count >= upgrade.maxStacks) {
        throw new Error(
          `This upgrade has reached max stacks (${upgrade.maxStacks})`
        );
      }
    }

    // Deduct gold from current save
    this.spendGold(cost);

    // Record purchase (persists across saves)
    this.recordUpgradePurchase(upgradeId);

    return {
      success: true,
      upgrade: upgrade,
      message: `✓ ${upgrade.name} purchased!`
    };
  }

  hasUpgrade(upgradeId) {
    return this.purchasedUpgrades.some(u => u.id === upgradeId);
  }

  getUpgradeCount(upgradeId) {
    return this.purchasedUpgrades.filter(u => u.id === upgradeId).length;
  }

  getPurchasedUpgrades() {
    return this.purchasedUpgrades.map(purchased => {
      const upgrade = this.config.getUpgrade(purchased.id);
      return {
        ...upgrade,
        purchasedAt: purchased.purchasedAt,
        count: this.getUpgradeCount(purchased.id)
      };
    });
  }

  getAllUpgrades() {
    return this.config.getAllUpgrades();
  }

  // ============================================
  // Effect Application
  // ============================================

  getActiveEffects() {
    const effects = this.config.getDefaultEffects();

    for (const upgrade of this.getPurchasedUpgrades()) {
      if (!upgrade.effect) continue;

      // Multiplicative effects
      for (const [key, value] of Object.entries(upgrade.effect)) {
        if (key.includes('Multiplier') || key.includes('Percent')) {
          if (typeof effects[key] === 'number') {
            effects[key] *= value;
          }
        }
      }

      // Additive effects
      for (const [key, value] of Object.entries(upgrade.effect)) {
        if (
          key.includes('Bonus') ||
          key.includes('Slots') ||
          (key.includes('Gold') && !key.includes('Multiplier'))
        ) {
          if (typeof effects[key] === 'number') {
            effects[key] += value;
          }
        }
      }

      // Boolean/feature unlocks
      for (const [key, value] of Object.entries(upgrade.effect)) {
        if (typeof value === 'boolean' && value === true) {
          if (!effects.unlockedFeatures) {
            effects.unlockedFeatures = [];
          }
          effects.unlockedFeatures.push(key);
        }
      }
    }

    return effects;
  }

  applyEffectsToGameState(gameState) {
    const effects = this.getActiveEffects();

    // Apply numeric multipliers
    if (effects.xpMultiplier) {
      gameState.xpMultiplier = (gameState.xpMultiplier || 1.0) * effects.xpMultiplier;
    }
    if (effects.goldMultiplier) {
      gameState.goldMultiplier = (gameState.goldMultiplier || 1.0) * effects.goldMultiplier;
    }

    // Apply numeric bonuses
    if (effects.maxHealthBonus) {
      gameState.maxHealth = (gameState.maxHealth || 100) + effects.maxHealthBonus;
      gameState.currentHealth = gameState.maxHealth;
    }
    if (effects.inventorySlots) {
      if (!gameState.inventory) gameState.inventory = { maxSlots: 10 };
      gameState.inventory.maxSlots += effects.inventorySlots;
    }
    if (effects.startingGold) {
      gameState.gold = (gameState.gold || 0) + effects.startingGold;
    }
    if (effects.startingLevel) {
      gameState.level = Math.max(gameState.level || 1, effects.startingLevel);
    }

    // Apply feature unlocks
    if (effects.unlockedFeatures) {
      gameState.unlockedFeatures = [
        ...(gameState.unlockedFeatures || []),
        ...effects.unlockedFeatures
      ];
    }

    return gameState;
  }

  // ============================================
  // Storage (Upgrades persist, not gold)
  // ============================================

  getOrCreateAccountId() {
    let id = localStorage.getItem('bytequest_account_id');
    if (!id) {
      id =
        'account_' +
        Date.now() +
        '_' +
        Math.random().toString(36).substring(2, 11);
      localStorage.setItem('bytequest_account_id', id);
    }
    return id;
  }

  loadPurchasedUpgrades() {
    const stored = localStorage.getItem('bytequest_account_upgrades');
    return stored ? JSON.parse(stored) : [];
  }

  recordUpgradePurchase(upgradeId) {
    this.purchasedUpgrades.push({
      id: upgradeId,
      purchasedAt: new Date().toISOString()
    });
    localStorage.setItem(
      'bytequest_account_upgrades',
      JSON.stringify(this.purchasedUpgrades)
    );
  }

  // ============================================
  // Utilities
  // ============================================

  resetForTesting() {
    localStorage.removeItem('bytequest_account_upgrades');
    this.purchasedUpgrades = [];
    console.warn('[DEBUG] Account upgrades reset for testing');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AccountProgressionManager };
}
