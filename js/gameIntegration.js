/**
 * ByteQuest Account Progression - Game Integration
 *
 * Permanent upgrades use regular game gold (not a separate currency).
 * Upgrades persist across saves, but you spend gold from your current save.
 */

// ============================================
// INITIALIZATION
// ============================================

const accountProgression = new AccountProgressionManager(
  accountProgressionConfig
);

// ============================================
// APPLY EFFECTS TO NEW GAME
// ============================================

/**
 * Create new game with account progression bonuses applied
 */
function createNewGameWithAccountBonuses(playerName) {
  // Create base game state
  const gameState = {
    playerName,
    level: 1,
    experience: 0,
    gold: 0,
    maxHealth: 100,
    currentHealth: 100,
    inventory: {
      items: [],
      maxSlots: 20
    },
    vocabularyKnown: 0,
    questsCompleted: [],
    unlockedFeatures: [],
    xpMultiplier: 1.0,
    goldMultiplier: 1.0
  };

  // Apply account progression effects
  const enhancedGameState = accountProgression.applyEffectsToGameState(gameState);

  return enhancedGameState;
}

// ============================================
// UI HELPERS
// ============================================

/**
 * Get account status for display
 */
function getAccountStatus() {
  const upgrades = accountProgression.getPurchasedUpgrades();
  const effects = accountProgression.getActiveEffects();

  return {
    upgradeCount: upgrades.length,
    upgrades,
    effects
  };
}

/**
 * Render simple account status HTML
 */
function renderAccountStatus() {
  const status = getAccountStatus();

  return `
    <div class="account-status">
      <h3>Permanent Upgrades</h3>
      <div class="account-upgrades">
        <span>${status.upgradeCount} upgrades purchased</span>
      </div>
    </div>
  `;
}

// ============================================
// DEBUG/TESTING HELPERS (only in dev mode)
// ============================================

// Set to true to enable debug commands in console
const BYTEQUEST_DEBUG = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (BYTEQUEST_DEBUG) {
  window.debugAccountProgression = function() {
    console.log('=== Account Progression Debug ===');
    console.log('Account ID:', accountProgression.accountId);
    console.log('Current Gold:', accountProgression.getGold());
    console.log('Purchased Upgrades:', accountProgression.getPurchasedUpgrades());
    console.log('Active Effects:', accountProgression.getActiveEffects());
  };

  window.testPurchaseUpgrade = async function(upgradeId) {
    try {
      const result = await accountProgression.purchaseUpgrade(upgradeId);
      console.log('✓', result.message);
    } catch (error) {
      console.error('✗ Cannot purchase:', error.message);
    }
  };

  window.testResetAccount = function() {
    accountProgression.resetForTesting();
    console.log('✓ Account upgrades reset for testing');
  };

  window.testNewGame = function() {
    const game = createNewGameWithAccountBonuses('TestPlayer');
    return game;
  };
}
