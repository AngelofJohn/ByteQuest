/**
 * ByteQuest Account Progression - Upgrade Shop UI
 *
 * Simplified for gold-only currency system.
 * Styles will be updated to match ByteQuest theme.
 */

class AccountProgressionUI {
  constructor() {
    this.manager = null; // Set after accountProgression is initialized
    this.selectedCategory = 'all';
  }

  init() {
    this.manager = accountProgression;
  }

  // ============================================
  // MAIN SHOP RENDER
  // ============================================

  renderShop() {
    if (!this.manager) this.init();

    const gold = this.manager.getAccountGold();
    const upgrades = this.manager.getPurchasedUpgrades();

    return `
      <div class="account-shop">
        <div class="shop-header">
          <h2>Account Upgrades</h2>
          <p class="shop-subtitle">Permanent improvements across all saves</p>
        </div>

        <!-- Gold Display -->
        <div class="account-gold-display">
          <span class="gold-icon">💰</span>
          <span class="gold-amount">${gold}</span>
          <span class="gold-label">Account Gold</span>
        </div>

        <!-- Category Tabs -->
        <div class="upgrade-tabs">
          <button class="upgrade-tab ${this.selectedCategory === 'all' ? 'active' : ''}"
                  onclick="accountShop.setCategory('all')">All</button>
          <button class="upgrade-tab ${this.selectedCategory === 'learning' ? 'active' : ''}"
                  onclick="accountShop.setCategory('learning')">Learning</button>
          <button class="upgrade-tab ${this.selectedCategory === 'resources' ? 'active' : ''}"
                  onclick="accountShop.setCategory('resources')">Resources</button>
          <button class="upgrade-tab ${this.selectedCategory === 'gameplay' ? 'active' : ''}"
                  onclick="accountShop.setCategory('gameplay')">Gameplay</button>
          <button class="upgrade-tab ${this.selectedCategory === 'language' ? 'active' : ''}"
                  onclick="accountShop.setCategory('language')">Language</button>
          <button class="upgrade-tab ${this.selectedCategory === 'qol' ? 'active' : ''}"
                  onclick="accountShop.setCategory('qol')">QoL</button>
        </div>

        <!-- Active Upgrades -->
        ${this.renderActiveUpgrades(upgrades)}

        <!-- Available Upgrades -->
        ${this.renderAvailableUpgrades(gold)}
      </div>
    `;
  }

  // ============================================
  // ACTIVE UPGRADES
  // ============================================

  renderActiveUpgrades(upgrades) {
    // Deduplicate upgrades (show each only once with count)
    const uniqueUpgrades = [];
    const seen = new Set();
    for (const u of upgrades) {
      if (!seen.has(u.id)) {
        seen.add(u.id);
        uniqueUpgrades.push(u);
      }
    }

    if (uniqueUpgrades.length === 0) {
      return `
        <div class="active-upgrades-section">
          <h3>Active Upgrades</h3>
          <p class="empty-message">No upgrades purchased yet</p>
        </div>
      `;
    }

    return `
      <div class="active-upgrades-section">
        <h3>Active Upgrades (${uniqueUpgrades.length})</h3>
        <div class="active-upgrades-list">
          ${uniqueUpgrades.map(u => `
            <div class="active-upgrade-item">
              <span class="upgrade-name">${u.name}</span>
              ${u.count > 1 ? `<span class="upgrade-count">×${u.count}</span>` : ''}
              <span class="upgrade-status">✓</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ============================================
  // AVAILABLE UPGRADES
  // ============================================

  renderAvailableUpgrades(gold) {
    const allUpgrades = this.manager.getAllUpgrades();
    const purchased = this.manager.getPurchasedUpgrades();

    // Filter by category
    let filtered = allUpgrades;
    if (this.selectedCategory !== 'all') {
      filtered = allUpgrades.filter(u => u.category === this.selectedCategory);
    }

    // Sort by tier
    filtered.sort((a, b) => (a.tier || 1) - (b.tier || 1));

    return `
      <div class="available-upgrades-section">
        <h3>Available Upgrades</h3>
        <div class="upgrades-grid">
          ${filtered.map(upgrade => this.renderUpgradeCard(upgrade, gold, purchased)).join('')}
        </div>
      </div>
    `;
  }

  renderUpgradeCard(upgrade, gold, purchased) {
    const isPurchased = purchased.some(p => p.id === upgrade.id);
    const purchaseCount = this.manager.getUpgradeCount(upgrade.id);
    const goldCost = upgrade.cost.gold || 0;
    const canAffordGold = gold >= goldCost;
    const hasItemCost = upgrade.cost.items && Object.keys(upgrade.cost.items).length > 0;
    const itemCostStatus = hasItemCost ? this.checkItemCosts(upgrade.cost.items) : { canAfford: true, missing: [] };
    const canAfford = canAffordGold && itemCostStatus.canAfford;
    const canPurchase = this.canPurchaseUpgrade(upgrade);
    const isMaxed = upgrade.maxStacks && purchaseCount >= upgrade.maxStacks;
    const isOneTimePurchased = upgrade.oneTime && isPurchased;

    let statusClass = '';
    if (isOneTimePurchased || isMaxed) statusClass = 'owned';
    else if (!canPurchase) statusClass = 'locked';
    else if (!canAfford) statusClass = 'unaffordable';

    // Build cost display
    let costHtml = '';
    if (goldCost > 0) {
      costHtml += `
        <div class="upgrade-cost">
          <span class="cost-icon">💰</span>
          <span class="cost-amount ${canAffordGold ? 'affordable' : 'unaffordable'}">${goldCost}</span>
        </div>
      `;
    }
    if (hasItemCost) {
      costHtml += this.renderItemCosts(upgrade.cost.items);
    }
    if (!goldCost && !hasItemCost) {
      costHtml = '<div class="upgrade-cost"><span class="cost-amount affordable">Free</span></div>';
    }

    // Determine button text
    let buttonText = 'Purchase';
    if (isOneTimePurchased) buttonText = '✓ Owned';
    else if (isMaxed) buttonText = 'Maxed';
    else if (!canPurchase) buttonText = 'Locked';
    else if (!canAffordGold && goldCost > 0) buttonText = 'Need gold';
    else if (!itemCostStatus.canAfford) buttonText = 'Need items';

    return `
      <div class="upgrade-card ${statusClass}">
        <div class="upgrade-card-header">
          <span class="upgrade-tier">Tier ${upgrade.tier || 1}</span>
          ${upgrade.stackable ? `<span class="stackable-tag">Stackable</span>` : ''}
        </div>

        <h4 class="upgrade-title">${upgrade.name}</h4>
        <p class="upgrade-desc">${upgrade.description}</p>

        ${costHtml}

        ${upgrade.requires ? `
          <div class="upgrade-requires">
            Requires: ${this.getUpgradeName(upgrade.requires)}
          </div>
        ` : ''}

        ${upgrade.stackable && !isMaxed ? `
          <div class="upgrade-stacks">
            ${purchaseCount}/${upgrade.maxStacks || '∞'} owned
          </div>
        ` : ''}

        <button
          class="upgrade-buy-btn"
          onclick="accountShop.purchaseUpgrade('${upgrade.id}')"
          ${!canPurchase || !canAfford || isOneTimePurchased || isMaxed ? 'disabled' : ''}
        >
          ${buttonText}
        </button>
      </div>
    `;
  }

  /**
   * Check if player has required items
   */
  checkItemCosts(itemCosts) {
    const missing = [];
    let canAfford = true;

    for (const [itemId, needed] of Object.entries(itemCosts)) {
      let have = 0;
      if (typeof itemManager !== 'undefined' && itemManager) {
        have = itemManager.getItemCount(itemId);
      } else if (typeof GameState !== 'undefined' && GameState.player?.inventory) {
        const invItem = GameState.player.inventory.find(i => i.id === itemId);
        have = invItem ? invItem.count : 0;
      }

      if (have < needed) {
        canAfford = false;
        missing.push({ itemId, need: needed, have });
      }
    }

    return { canAfford, missing };
  }

  /**
   * Render item cost display
   */
  renderItemCosts(itemCosts) {
    const items = Object.entries(itemCosts).map(([itemId, needed]) => {
      let itemDef = null;
      let have = 0;

      if (typeof itemManager !== 'undefined' && itemManager) {
        itemDef = itemManager.getDefinition(itemId);
        have = itemManager.getItemCount(itemId);
      } else if (typeof GAME_DATA !== 'undefined' && GAME_DATA.items) {
        itemDef = GAME_DATA.items[itemId];
        if (typeof GameState !== 'undefined' && GameState.player?.inventory) {
          const invItem = GameState.player.inventory.find(i => i.id === itemId);
          have = invItem ? invItem.count : 0;
        }
      }

      const canAffordThis = have >= needed;
      const icon = itemDef?.icon || '📦';
      const name = itemDef?.name || itemId;

      return `
        <div class="item-cost ${canAffordThis ? 'affordable' : 'unaffordable'}">
          <span class="item-icon">${icon}</span>
          <span class="item-amount">${have}/${needed}</span>
          <span class="item-name">${name}</span>
        </div>
      `;
    }).join('');

    return `<div class="upgrade-item-costs">${items}</div>`;
  }

  // ============================================
  // PURCHASE HANDLING
  // ============================================

  async purchaseUpgrade(upgradeId) {
    try {
      const result = await this.manager.purchaseUpgrade(upgradeId);

      // Show success message
      if (typeof showNotification === 'function') {
        showNotification(`${result.upgrade.name} purchased!`, 'success');
      } else {
        console.log('✓', result.message);
      }

      // Refresh UI
      this.refresh();
    } catch (error) {
      if (typeof showNotification === 'function') {
        showNotification(error.message, 'error');
      } else {
        console.error('✗ Cannot purchase:', error.message);
      }
    }
  }

  // ============================================
  // UTILITIES
  // ============================================

  canPurchaseUpgrade(upgrade) {
    // Check prerequisite
    if (upgrade.requires && !this.manager.hasUpgrade(upgrade.requires)) {
      return false;
    }

    // Check one-time purchase
    if (upgrade.oneTime && this.manager.hasUpgrade(upgrade.id)) {
      return false;
    }

    // Check max stacks
    if (upgrade.maxStacks) {
      const count = this.manager.getUpgradeCount(upgrade.id);
      if (count >= upgrade.maxStacks) {
        return false;
      }
    }

    // TODO: Check tier requirements when implemented

    return true;
  }

  getUpgradeName(upgradeId) {
    const upgrade = this.manager.config.getUpgrade(upgradeId);
    return upgrade ? upgrade.name : upgradeId;
  }

  setCategory(category) {
    this.selectedCategory = category;
    this.refresh();
  }

  refresh() {
    const container = document.getElementById('account-shop-container');
    if (container) {
      container.innerHTML = this.renderShop();
    }
  }
}

// Initialize
const accountShop = new AccountProgressionUI();

// Note: Add <div id="account-shop-container"></div> to HTML where shop should appear
// Then call: accountShop.refresh() to render
