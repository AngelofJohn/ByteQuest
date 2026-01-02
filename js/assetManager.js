/**
 * ByteQuest Asset Manager
 *
 * Centralized asset loading, caching, and fallback handling.
 * Works with asset-manifest.json to track required assets.
 */

class AssetManager {
  constructor() {
    this.manifest = null;
    this.cache = new Map();
    this.loadedAssets = new Set();
    this.missingAssets = new Set();
    this.basePath = 'assets/';
    this.initialized = false;
  }

  // ============================================
  // Initialization
  // ============================================

  async initialize() {
    if (this.initialized) return true;

    try {
      const response = await fetch('assets/asset-manifest.json');
      this.manifest = await response.json();
      this.initialized = true;
      console.log('[AssetManager] Initialized with manifest v' + this.manifest.version);
      return true;
    } catch (error) {
      console.warn('[AssetManager] Could not load manifest, using fallback mode:', error);
      this.manifest = this.getDefaultManifest();
      this.initialized = true;
      return false;
    }
  }

  getDefaultManifest() {
    return {
      version: 'fallback',
      categories: {},
      specs: {
        sizes: {
          portrait: { width: 128, height: 128 },
          sprite: { width: 64, height: 64 },
          item: { width: 32, height: 32 },
          icon: { width: 24, height: 24 }
        }
      }
    };
  }

  // ============================================
  // Asset Path Resolution
  // ============================================

  /**
   * Get the path for an asset
   * @param {string} category - e.g., 'characters', 'items', 'locations'
   * @param {string} id - Asset ID
   * @param {string} type - Asset type (e.g., 'portrait', 'sprite', 'file')
   * @returns {string|null} Asset path or null if not found
   */
  getAssetPath(category, id, type = 'file') {
    if (!this.manifest?.categories?.[category]) {
      return null;
    }

    const cat = this.manifest.categories[category];
    const basePath = cat.basePath || `assets/${category}/`;

    // Check direct assets
    if (cat.assets?.[id]) {
      const asset = cat.assets[id];
      if (type === 'file' && asset.file) {
        return basePath + asset.file;
      }
      if (asset[type]) {
        return basePath + asset[type];
      }
    }

    // Check subcategories
    if (cat.subcategories) {
      for (const subcat of Object.values(cat.subcategories)) {
        if (subcat.assets?.[id]) {
          const asset = subcat.assets[id];
          if (type === 'file' && asset.file) {
            return basePath + asset.file;
          }
          if (asset[type]) {
            return basePath + asset[type];
          }
        }
      }
    }

    return null;
  }

  /**
   * Get asset definition including fallback info
   */
  getAssetDef(category, id) {
    if (!this.manifest?.categories?.[category]) {
      return null;
    }

    const cat = this.manifest.categories[category];

    // Check direct assets
    if (cat.assets?.[id]) {
      return cat.assets[id];
    }

    // Check subcategories
    if (cat.subcategories) {
      for (const subcat of Object.values(cat.subcategories)) {
        if (subcat.assets?.[id]) {
          return subcat.assets[id];
        }
      }
    }

    return null;
  }

  // ============================================
  // Icon/Emoji Resolution
  // ============================================

  /**
   * Get icon for display - returns image path or emoji fallback
   * @param {string} category - Asset category
   * @param {string} id - Asset ID
   * @param {boolean} preferEmoji - Force emoji even if image exists
   * @returns {object} { type: 'image'|'emoji', value: string }
   */
  getIcon(category, id, preferEmoji = false) {
    const def = this.getAssetDef(category, id);

    if (!def) {
      return { type: 'emoji', value: '❓' };
    }

    // If preferEmoji or asset not available, use emoji
    if (preferEmoji || !this.isAssetAvailable(category, id)) {
      return {
        type: 'emoji',
        value: def.emojiIcon || '❓'
      };
    }

    // Try to get image path
    const path = this.getAssetPath(category, id, 'file') ||
                 this.getAssetPath(category, id, 'icon');

    if (path && this.loadedAssets.has(path)) {
      return { type: 'image', value: path };
    }

    // Fallback to emoji
    return {
      type: 'emoji',
      value: def.emojiIcon || '❓'
    };
  }

  /**
   * Get emoji icon for an asset (always returns emoji, useful for text contexts)
   */
  getEmoji(category, id) {
    const def = this.getAssetDef(category, id);
    return def?.emojiIcon || '❓';
  }

  // ============================================
  // NPC Icons (convenience methods)
  // ============================================

  /**
   * Get NPC display icon
   */
  getNpcIcon(npcId) {
    return this.getIcon('characters', `npc_${npcId}`);
  }

  /**
   * Get NPC emoji (always)
   */
  getNpcEmoji(npcId) {
    return this.getEmoji('characters', `npc_${npcId}`);
  }

  /**
   * Get NPC portrait path
   */
  getNpcPortrait(npcId) {
    return this.getAssetPath('characters', `npc_${npcId}`, 'portrait');
  }

  // ============================================
  // Item Icons (convenience methods)
  // ============================================

  /**
   * Get item display icon
   */
  getItemIcon(itemId) {
    return this.getIcon('items', itemId);
  }

  /**
   * Get item emoji (always)
   */
  getItemEmoji(itemId) {
    return this.getEmoji('items', itemId);
  }

  // ============================================
  // Location Icons (convenience methods)
  // ============================================

  /**
   * Get location display icon
   */
  getLocationIcon(locationId) {
    return this.getIcon('locations', locationId);
  }

  /**
   * Get location emoji (always)
   */
  getLocationEmoji(locationId) {
    return this.getEmoji('locations', locationId);
  }

  /**
   * Get location background path
   */
  getLocationBackground(locationId) {
    return this.getAssetPath('locations', locationId, 'background');
  }

  // ============================================
  // Asset Loading & Checking
  // ============================================

  /**
   * Check if an asset file exists (async)
   */
  async checkAssetExists(path) {
    if (this.loadedAssets.has(path)) return true;
    if (this.missingAssets.has(path)) return false;

    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        this.loadedAssets.add(path);
        return true;
      } else {
        this.missingAssets.add(path);
        return false;
      }
    } catch (error) {
      this.missingAssets.add(path);
      return false;
    }
  }

  /**
   * Check if asset is available (sync, based on cache)
   */
  isAssetAvailable(category, id, type = 'file') {
    const path = this.getAssetPath(category, id, type);
    if (!path) return false;
    return this.loadedAssets.has(path) && !this.missingAssets.has(path);
  }

  /**
   * Preload an image and cache it
   */
  async preloadImage(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(path, img);
        this.loadedAssets.add(path);
        resolve(img);
      };
      img.onerror = () => {
        this.missingAssets.add(path);
        reject(new Error(`Failed to load: ${path}`));
      };
      img.src = path;
    });
  }

  /**
   * Preload multiple images
   */
  async preloadImages(paths) {
    const results = await Promise.allSettled(
      paths.map(path => this.preloadImage(path))
    );

    const loaded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`[AssetManager] Preloaded ${loaded}/${paths.length} images (${failed} failed)`);
    return { loaded, failed, total: paths.length };
  }

  /**
   * Preload all assets for a category
   */
  async preloadCategory(category) {
    const cat = this.manifest?.categories?.[category];
    if (!cat) return { loaded: 0, failed: 0, total: 0 };

    const paths = [];
    const basePath = cat.basePath || `assets/${category}/`;

    // Collect all asset paths
    const collectAssets = (assets) => {
      for (const asset of Object.values(assets)) {
        if (asset.file) paths.push(basePath + asset.file);
        if (asset.portrait) paths.push(basePath + asset.portrait);
        if (asset.sprite) paths.push(basePath + asset.sprite);
        if (asset.icon) paths.push(basePath + asset.icon);
      }
    };

    if (cat.assets) collectAssets(cat.assets);
    if (cat.subcategories) {
      for (const subcat of Object.values(cat.subcategories)) {
        if (subcat.assets) collectAssets(subcat.assets);
      }
    }

    return this.preloadImages(paths);
  }

  // ============================================
  // Asset Status Reporting
  // ============================================

  /**
   * Get report of all missing assets
   */
  getMissingAssetsReport() {
    const report = {
      categories: {},
      totalMissing: 0,
      totalDefined: 0
    };

    if (!this.manifest?.categories) return report;

    for (const [catName, cat] of Object.entries(this.manifest.categories)) {
      const catReport = {
        status: cat.status,
        missing: [],
        total: 0
      };

      const checkAssets = (assets, basePath) => {
        for (const [id, asset] of Object.entries(assets)) {
          catReport.total++;
          report.totalDefined++;

          // Check if any required file is missing
          const filesToCheck = [];
          if (asset.file) filesToCheck.push(basePath + asset.file);
          if (asset.portrait) filesToCheck.push(basePath + asset.portrait);
          if (asset.sprite) filesToCheck.push(basePath + asset.sprite);

          for (const file of filesToCheck) {
            if (this.missingAssets.has(file) || !this.loadedAssets.has(file)) {
              catReport.missing.push({ id, file });
              report.totalMissing++;
            }
          }
        }
      };

      const basePath = cat.basePath || `assets/${catName}/`;
      if (cat.assets) checkAssets(cat.assets, basePath);
      if (cat.subcategories) {
        for (const subcat of Object.values(cat.subcategories)) {
          if (subcat.assets) checkAssets(subcat.assets, basePath);
        }
      }

      report.categories[catName] = catReport;
    }

    return report;
  }

  /**
   * Get category status summary
   */
  getCategoryStatus() {
    if (!this.manifest?.categories) return {};

    const status = {};
    for (const [name, cat] of Object.entries(this.manifest.categories)) {
      status[name] = cat.status || 'unknown';
    }
    return status;
  }

  // ============================================
  // HTML Generation Helpers
  // ============================================

  /**
   * Generate HTML for an icon (image or emoji)
   * @param {string} category - Asset category
   * @param {string} id - Asset ID
   * @param {string} className - CSS class to apply
   * @returns {string} HTML string
   */
  renderIcon(category, id, className = 'asset-icon') {
    const icon = this.getIcon(category, id);

    if (icon.type === 'image') {
      return `<img src="${icon.value}" class="${className}" alt="${id}" onerror="this.outerHTML='${this.getEmoji(category, id)}'">`;
    } else {
      return `<span class="${className} emoji-icon">${icon.value}</span>`;
    }
  }

  /**
   * Generate HTML for NPC icon
   */
  renderNpcIcon(npcId, className = 'npc-icon') {
    return this.renderIcon('characters', `npc_${npcId}`, className);
  }

  /**
   * Generate HTML for item icon
   */
  renderItemIcon(itemId, className = 'item-icon') {
    return this.renderIcon('items', itemId, className);
  }

  // ============================================
  // Spec Helpers
  // ============================================

  /**
   * Get recommended size for an asset type
   */
  getRecommendedSize(sizeType) {
    return this.manifest?.specs?.sizes?.[sizeType] || { width: 32, height: 32 };
  }

  /**
   * Get all size specifications
   */
  getAllSizeSpecs() {
    return this.manifest?.specs?.sizes || {};
  }
}

// ============================================
// Global Instance
// ============================================

const assetManager = new AssetManager();

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    assetManager.initialize().then(success => {
      if (success) {
        console.log('[AssetManager] Ready');
      }
    });
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AssetManager, assetManager };
}
