// ===========================================
// COSMETIC SYSTEM
// Manages unlockable cosmetic items (frames, backgrounds, accents, badges)
// ===========================================

class CosmeticManager {
  constructor(state) {
    this.state = state;
    this.data = typeof COSMETIC_DATA !== 'undefined' ? COSMETIC_DATA : {};
  }

  // Initialize cosmetics for a new player
  initializePlayer() {
    if (!this.state.player.cosmetics) {
      this.state.player.cosmetics = {
        unlocked: {
          frames: ['basic'],
          backgrounds: ['default'],
          accents: ['default'],
          badges: []
        },
        equipped: {
          frame: 'basic',
          background: 'default',
          accent: 'default',
          badges: []
        }
      };
    }
    return this.state.player.cosmetics;
  }

  // Ensure cosmetics structure exists (for save compatibility)
  ensureStructure() {
    if (!this.state.player.cosmetics) {
      this.initializePlayer();
    }
    // Ensure all categories exist
    const categories = ['frames', 'backgrounds', 'accents', 'badges'];
    categories.forEach(cat => {
      if (!this.state.player.cosmetics.unlocked[cat]) {
        this.state.player.cosmetics.unlocked[cat] = cat === 'badges' ? [] : [this.getDefaultForCategory(cat)];
      }
    });
    if (!this.state.player.cosmetics.equipped) {
      this.state.player.cosmetics.equipped = {
        frame: 'basic',
        background: 'default',
        accent: 'default',
        badges: []
      };
    }
  }

  getDefaultForCategory(category) {
    const defaults = {
      frames: 'basic',
      backgrounds: 'default',
      accents: 'default',
      badges: null
    };
    return defaults[category];
  }

  // ===========================================
  // UNLOCK METHODS
  // ===========================================

  // Unlock a cosmetic item
  unlock(cosmeticId) {
    this.ensureStructure();
    const cosmetic = this.getCosmetic(cosmeticId);
    if (!cosmetic) {
      return { success: false, message: 'Cosmetic not found' };
    }

    const category = cosmetic.category;
    if (this.isUnlocked(cosmeticId)) {
      return { success: false, message: 'Already unlocked' };
    }

    this.state.player.cosmetics.unlocked[category].push(cosmeticId);

    return {
      success: true,
      message: `Unlocked: ${cosmetic.name}`,
      cosmetic: cosmetic
    };
  }

  // Check if a cosmetic is unlocked
  isUnlocked(cosmeticId) {
    this.ensureStructure();
    const cosmetic = this.getCosmetic(cosmeticId);
    if (!cosmetic) return false;

    const category = cosmetic.category;
    return this.state.player.cosmetics.unlocked[category]?.includes(cosmeticId) || false;
  }

  // Get all unlocked cosmetics for a category
  getUnlocked(category) {
    this.ensureStructure();
    return this.state.player.cosmetics.unlocked[category] || [];
  }

  // Get all unlocked cosmetics across all categories
  getAllUnlocked() {
    this.ensureStructure();
    return this.state.player.cosmetics.unlocked;
  }

  // ===========================================
  // EQUIP METHODS
  // ===========================================

  // Equip a cosmetic item
  equip(cosmeticId) {
    this.ensureStructure();
    const cosmetic = this.getCosmetic(cosmeticId);
    if (!cosmetic) {
      return { success: false, message: 'Cosmetic not found' };
    }

    if (!this.isUnlocked(cosmeticId)) {
      return { success: false, message: 'Cosmetic not unlocked' };
    }

    const category = cosmetic.category;

    if (category === 'badges') {
      // Badges are special - can equip up to 3
      return this.equipBadge(cosmeticId);
    }

    // For other categories, just set the equipped value
    this.state.player.cosmetics.equipped[this.getCategoryKey(category)] = cosmeticId;

    return {
      success: true,
      message: `Equipped: ${cosmetic.name}`,
      cosmetic: cosmetic
    };
  }

  // Equip a badge (max 3)
  equipBadge(badgeId) {
    this.ensureStructure();
    const badges = this.state.player.cosmetics.equipped.badges || [];

    if (badges.includes(badgeId)) {
      return { success: false, message: 'Badge already equipped' };
    }

    if (badges.length >= 3) {
      return { success: false, message: 'Maximum 3 badges equipped. Unequip one first.' };
    }

    badges.push(badgeId);
    this.state.player.cosmetics.equipped.badges = badges;

    const cosmetic = this.getCosmetic(badgeId);
    return {
      success: true,
      message: `Equipped badge: ${cosmetic?.name || badgeId}`,
      cosmetic: cosmetic
    };
  }

  // Unequip a cosmetic
  unequip(cosmeticId) {
    this.ensureStructure();
    const cosmetic = this.getCosmetic(cosmeticId);
    if (!cosmetic) {
      return { success: false, message: 'Cosmetic not found' };
    }

    const category = cosmetic.category;

    if (category === 'badges') {
      return this.unequipBadge(cosmeticId);
    }

    // Can't unequip non-badge items, only swap them
    return { success: false, message: 'Cannot unequip. Select a different item instead.' };
  }

  // Unequip a badge
  unequipBadge(badgeId) {
    this.ensureStructure();
    const badges = this.state.player.cosmetics.equipped.badges || [];
    const index = badges.indexOf(badgeId);

    if (index === -1) {
      return { success: false, message: 'Badge not equipped' };
    }

    badges.splice(index, 1);
    this.state.player.cosmetics.equipped.badges = badges;

    const cosmetic = this.getCosmetic(badgeId);
    return {
      success: true,
      message: `Unequipped badge: ${cosmetic?.name || badgeId}`,
      cosmetic: cosmetic
    };
  }

  // Get currently equipped cosmetic for a category
  getEquipped(category) {
    this.ensureStructure();
    const key = this.getCategoryKey(category);
    return this.state.player.cosmetics.equipped[key];
  }

  // Get all equipped cosmetics
  getAllEquipped() {
    this.ensureStructure();
    return this.state.player.cosmetics.equipped;
  }

  // Helper to convert category to equipped key
  getCategoryKey(category) {
    const map = {
      frames: 'frame',
      backgrounds: 'background',
      accents: 'accent',
      badges: 'badges'
    };
    return map[category] || category;
  }

  // ===========================================
  // DATA ACCESS
  // ===========================================

  // Get cosmetic definition by ID
  getCosmetic(cosmeticId) {
    if (!this.data.cosmetics) return null;
    return this.data.cosmetics.find(c => c.id === cosmeticId) || null;
  }

  // Get all cosmetics for a category
  getCosmeticsForCategory(category) {
    if (!this.data.cosmetics) return [];
    return this.data.cosmetics.filter(c => c.category === category);
  }

  // Get all cosmetics by source type
  getCosmeticsBySource(sourceType) {
    if (!this.data.cosmetics) return [];
    return this.data.cosmetics.filter(c => c.source === sourceType);
  }

  // Get cosmetics available in shop
  getShopCosmetics() {
    return this.getCosmeticsBySource('shop');
  }

  // Get cosmetics from a specific source ID (e.g., quest ID)
  getCosmeticsFromSourceId(sourceId) {
    if (!this.data.cosmetics) return [];
    return this.data.cosmetics.filter(c => c.sourceId === sourceId);
  }

  // ===========================================
  // STATISTICS
  // ===========================================

  // Get unlock progress for a category
  getCategoryProgress(category) {
    const total = this.getCosmeticsForCategory(category).length;
    const unlocked = this.getUnlocked(category).length;
    return {
      unlocked,
      total,
      percent: total > 0 ? Math.round((unlocked / total) * 100) : 0
    };
  }

  // Get total cosmetic unlock progress
  getTotalProgress() {
    const categories = ['frames', 'backgrounds', 'accents', 'badges'];
    let totalUnlocked = 0;
    let totalCosmetics = 0;

    categories.forEach(cat => {
      const progress = this.getCategoryProgress(cat);
      totalUnlocked += progress.unlocked;
      totalCosmetics += progress.total;
    });

    return {
      unlocked: totalUnlocked,
      total: totalCosmetics,
      percent: totalCosmetics > 0 ? Math.round((totalUnlocked / totalCosmetics) * 100) : 0
    };
  }

  // ===========================================
  // INTEGRATION HELPERS
  // ===========================================

  // Award cosmetic from quest completion
  awardFromQuest(questId) {
    const cosmetics = this.getCosmeticsFromSourceId(questId);
    const results = [];

    cosmetics.forEach(cosmetic => {
      if (cosmetic.source === 'quest') {
        const result = this.unlock(cosmetic.id);
        if (result.success) {
          results.push(result);
        }
      }
    });

    return results;
  }

  // Award cosmetic from achievement
  awardFromAchievement(achievementId) {
    const cosmetics = this.getCosmeticsFromSourceId(achievementId);
    const results = [];

    cosmetics.forEach(cosmetic => {
      if (cosmetic.source === 'achievement') {
        const result = this.unlock(cosmetic.id);
        if (result.success) {
          results.push(result);
        }
      }
    });

    return results;
  }

  // Award cosmetic from reputation milestone
  awardFromReputation(factionId, rank) {
    const sourceId = `${factionId}_${rank}`;
    const cosmetics = this.getCosmeticsFromSourceId(sourceId);
    const results = [];

    cosmetics.forEach(cosmetic => {
      if (cosmetic.source === 'reputation') {
        const result = this.unlock(cosmetic.id);
        if (result.success) {
          results.push(result);
        }
      }
    });

    return results;
  }

  // Purchase cosmetic from shop
  purchase(cosmeticId, playerGold) {
    const cosmetic = this.getCosmetic(cosmeticId);
    if (!cosmetic) {
      return { success: false, message: 'Cosmetic not found' };
    }

    if (cosmetic.source !== 'shop') {
      return { success: false, message: 'This cosmetic cannot be purchased' };
    }

    if (this.isUnlocked(cosmeticId)) {
      return { success: false, message: 'Already owned' };
    }

    const price = cosmetic.price || 0;
    if (playerGold < price) {
      return { success: false, message: `Not enough gold. Need ${price} gold.` };
    }

    const unlockResult = this.unlock(cosmeticId);
    if (unlockResult.success) {
      return {
        success: true,
        message: `Purchased: ${cosmetic.name}`,
        cosmetic: cosmetic,
        cost: price
      };
    }

    return unlockResult;
  }

  // ===========================================
  // RENDER HELPERS
  // ===========================================

  // Get CSS class for frame
  getFrameClass(frameId) {
    const frame = this.getCosmetic(frameId);
    return frame?.cssClass || 'frame-basic';
  }

  // Get CSS variables for accent color
  getAccentStyles(accentId) {
    const accent = this.getCosmetic(accentId);
    if (!accent?.colors) return {};

    return {
      '--accent-primary': accent.colors.primary || '#c9a227',
      '--accent-secondary': accent.colors.secondary || '#8b7355'
    };
  }

  // Get background image/color for profile
  getBackgroundStyle(backgroundId) {
    const bg = this.getCosmetic(backgroundId);
    if (!bg) return {};

    if (bg.image) {
      return { backgroundImage: `url(${bg.image})` };
    }
    if (bg.color) {
      return { backgroundColor: bg.color };
    }
    if (bg.gradient) {
      return { background: bg.gradient };
    }
    return {};
  }

  // Get preview emoji/icon for a cosmetic
  getPreview(cosmeticId) {
    const cosmetic = this.getCosmetic(cosmeticId);
    return cosmetic?.preview || '?';
  }

  // Get rarity color
  getRarityColor(rarity) {
    const colors = {
      common: '#9d9d9d',
      uncommon: '#1eff00',
      rare: '#0070dd',
      epic: '#a335ee',
      legendary: '#ff8000'
    };
    return colors[rarity] || colors.common;
  }
}

// Global instance (initialized in game.js)
let cosmeticManager = null;
