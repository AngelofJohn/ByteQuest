// ByteQuest - Tooltip System
// Hover tooltips for stats, items, and UI elements

const TooltipSystem = {
  // Tooltip element reference
  element: null,
  
  // Delay timer
  showTimer: null,
  hideTimer: null,
  
  // Configuration
  config: {
    showDelay: 300,       // ms before showing
    hideDelay: 100,       // ms before hiding
    offsetX: 15,          // pixels from cursor
    offsetY: 15
  },
  
  // =====================================================
  // Initialization
  // =====================================================
  
  init() {
    // Create tooltip element if it doesn't exist
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.id = 'tooltip';
      this.element.className = 'tooltip';
      document.body.appendChild(this.element);
    }
    
    // Add global mouse move listener for positioning
    document.addEventListener('mousemove', (e) => this.updatePosition(e));
    
    // Initialize all tooltips
    this.bindTooltips();
    
    console.log('TooltipSystem initialized');
  },
  
  // =====================================================
  // Tooltip Content Definitions
  // =====================================================
  
  definitions: {
    // HUD Stats
    'hp-bar': {
      title: '❤️ Health Points',
      content: [
        { label: 'Current', value: () => `${GameState.player.hp}/${GameState.player.maxHp}` },
        { type: 'divider' },
        { text: 'Wrong answers cost 10 HP' },
        { text: 'Boss exams cost 15 HP per mistake' },
        { text: 'Rest at inn or review lessons to heal' },
        { text: 'Reach 0 HP = must recover before continuing' }
      ]
    },
    
    'xp-bar': {
      title: '⭐ Experience Points',
      content: [
        { label: 'Current', value: () => `${GameState.player.xp}/${GameState.player.xpToNext}` },
        { label: 'Level', value: () => GameState.player.level },
        { type: 'divider' },
        { text: 'Earn XP by completing lessons and quests' },
        { text: 'Streaks multiply XP earned' },
        { text: 'Level up to unlock new quests and areas' }
      ]
    },
    
    'gold-display': {
      title: '💰 Gold',
      content: [
        { label: 'Current', value: () => GameState.player.gold },
        { type: 'divider' },
        { text: 'Spend at shops for items and equipment' },
        { text: 'Earn from quests and selling items' },
        { text: 'Rest at inn costs 10 gold' }
      ]
    },
    
    'player-level': {
      title: '📊 Level',
      content: [
        { label: 'Current Level', value: () => GameState.player.level },
        { label: 'Class', value: () => GameState.player.class ? GameState.player.class.charAt(0).toUpperCase() + GameState.player.class.slice(1) : 'None' },
        { type: 'divider' },
        { text: 'Higher levels unlock new quests' },
        { text: 'Each level grants +10 Max HP' },
        { text: 'Level up fully restores HP' }
      ]
    },
    
    'player-avatar': {
      title: '👤 Character',
      content: [
        { label: 'Name', value: () => GameState.player.name },
        { label: 'Class', value: () => GameState.player.class ? GameState.player.class.charAt(0).toUpperCase() + GameState.player.class.slice(1) : 'None' },
        { label: 'Level', value: () => GameState.player.level },
        { label: 'Title', value: () => GameState.player.equippedTitle || 'None' },
        { type: 'divider' },
        { label: 'Lessons Completed', value: () => GameState.player.lessonsCompleted || 0 },
        { label: 'Quests Completed', value: () => GameState.player.completedQuests?.length || 0 }
      ]
    },
    
    // Equipment Slots
    'equip-helm': {
      title: '🪖 Helm Slot',
      content: [
        { label: 'Equipped', value: () => TooltipSystem.getEquippedItemName('helm') },
        { type: 'divider' },
        { text: 'Helms provide defensive bonuses' },
        { text: 'Click to view or change equipment' }
      ]
    },
    
    'equip-armor': {
      title: '🛡️ Armor Slot',
      content: [
        { label: 'Equipped', value: () => TooltipSystem.getEquippedItemName('armor') },
        { type: 'divider' },
        { text: 'Armor increases Max HP' },
        { text: 'Click to view or change equipment' }
      ]
    },
    
    'equip-weapon': {
      title: '⚔️ Weapon Slot',
      content: [
        { label: 'Equipped', value: () => TooltipSystem.getEquippedItemName('weapon') },
        { type: 'divider' },
        { text: 'Weapons can provide various bonuses' },
        { text: 'Click to view or change equipment' }
      ]
    },
    
    'equip-accessory': {
      title: '📿 Accessory Slot',
      content: [
        { label: 'Equipped', value: () => TooltipSystem.getEquippedItemName('accessory') },
        { type: 'divider' },
        { text: 'Accessories grant special effects' },
        { text: 'Click to view or change equipment' }
      ]
    },
    
    'equip-ring': {
      title: '💍 Ring Slot',
      content: [
        { label: 'Equipped', value: () => TooltipSystem.getEquippedItemName('ring') },
        { type: 'divider' },
        { text: 'Rings can boost Insight and other stats' },
        { text: 'Click to view or change equipment' }
      ]
    },
    
    // Lesson UI
    'streak-display': {
      title: '🔥 Streak',
      content: [
        { label: 'Current Streak', value: () => GameState.lessonState?.streak || 0 },
        { label: 'Multiplier', value: () => `${GameState.lessonState?.currentMultiplier || 1.0}×` },
        { type: 'divider' },
        { text: '3+ correct: 1.25× XP' },
        { text: '5+ correct: 1.5× XP' },
        { text: '7+ correct: 1.75× XP' },
        { text: '10+ correct: 2.0× XP' },
        { text: 'Wrong answer resets streak' }
      ]
    },
    
    'hint-display': {
      title: '💡 Hints',
      content: [
        { label: 'Charges', value: () => `${GameState.lessonState?.hintCharges || 0}/${GameState.lessonState?.maxHintCharges || 0}` },
        { type: 'divider' },
        { text: 'Hints help with difficult words' },
        { text: 'Charges reset each lesson' },
        { text: 'Insight stat grants bonus charges' },
        { text: 'Some words require unlocking first' }
      ]
    },
    
    // Stats (for stats panel)
    'stat-insight': {
      title: '💡 Insight',
      content: [
        { label: 'Current', value: () => TooltipSystem.getPlayerInsight() },
        { type: 'divider' },
        { text: 'Grants bonus hint charges per lesson' },
        { text: 'Reduces correct answers needed to unlock hints' },
        { text: 'Gained from equipment like Scholar\'s Ring' }
      ]
    },
    
    'stat-max-hp': {
      title: '❤️ Max HP',
      content: [
        { label: 'Total', value: () => GameState.player.maxHp },
        { label: 'Base', value: () => TooltipSystem.getBaseMaxHp() },
        { label: 'From Equipment', value: () => TooltipSystem.getEquipmentHpBonus() },
        { type: 'divider' },
        { text: 'Base HP depends on class' },
        { text: 'Each level grants +10 Max HP' },
        { text: 'Equipment can increase Max HP' }
      ]
    },

    // Character Stats (from STAT_DEFINITIONS)
    'stat-stamina': {
      title: '❤️ Stamina',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('stamina') },
        { type: 'divider' },
        { text: '+5 Max HP per point' },
        { text: 'Lets you endure more mistakes' }
      ]
    },
    'stat-strength': {
      title: '⚔️ Strength',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('strength') },
        { type: 'divider' },
        { text: 'Reduces HP lost on wrong answers' },
        { text: 'Base damage: 10 HP' },
        { text: '-0.5 HP per point (min 5)' }
      ]
    },
    'stat-agility': {
      title: '💨 Agility',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('agility') },
        { type: 'divider' },
        { text: 'Protects your answer streak' },
        { text: 'At 5+ points: one mistake per lesson won\'t break streak' }
      ]
    },
    'stat-insight': {
      title: '👁️ Insight',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('insight') },
        { type: 'divider' },
        { text: '+1 hint charge per 3 points' },
        { text: 'Improves hint quality' }
      ]
    },
    'stat-luck': {
      title: '🍀 Luck',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('luck') },
        { type: 'divider' },
        { text: '2% chance per point to avoid HP loss' },
        { text: 'Better prices at shops' }
      ]
    },
    'stat-devotion': {
      title: '✨ Devotion',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('devotion') },
        { type: 'divider' },
        { text: '+5% reputation gain per point' },
        { text: 'Affects all factions' }
      ]
    },
    'stat-knowledge': {
      title: '📖 Knowledge',
      content: [
        { label: 'Current', value: () => TooltipSystem.getStatValue('knowledge') },
        { type: 'divider' },
        { text: 'Words stay mastered longer' },
        { text: 'Reduces review frequency' }
      ]
    }
  },
  
  // =====================================================
  // Helper Functions
  // =====================================================
  
  getEquippedItemName(slot) {
    const itemId = GameState.player.equipment?.[slot];
    if (!itemId) return 'Empty';
    const item = GAME_DATA.items?.[itemId];
    return item ? item.name : 'Unknown';
  },
  
  getPlayerInsight() {
    let insight = 0;
    // Check equipment for insight bonuses
    if (GameState.player.equipment) {
      Object.values(GameState.player.equipment).forEach(itemId => {
        if (itemId) {
          const item = GAME_DATA.items?.[itemId];
          if (item?.stats?.insight) {
            insight += item.stats.insight;
          }
        }
      });
    }
    return insight;
  },
  
  getBaseMaxHp() {
    const classData = GAME_DATA.classes?.[GameState.player.class];
    const baseFromClass = classData?.startingStats?.maxHp || 100;
    const levelBonus = (GameState.player.level - 1) * 10;
    return baseFromClass + levelBonus;
  },
  
  getEquipmentHpBonus() {
    let bonus = 0;
    if (GameState.player.equipment) {
      Object.values(GameState.player.equipment).forEach(itemId => {
        if (itemId) {
          const item = GAME_DATA.items?.[itemId];
          if (item?.stats?.maxHp) {
            bonus += item.stats.maxHp;
          }
        }
      });
    }
    return bonus;
  },

  getStatValue(statId) {
    if (typeof statsManager !== 'undefined' && statsManager) {
      const stat = statsManager.getStat(statId);
      if (stat) {
        const bonus = stat.bonus > 0 ? ` (+${stat.bonus})` : '';
        return `${stat.total}${bonus}`;
      }
    }
    return GameState.player?.stats?.[statId] || 0;
  },

  // =====================================================
  // Dynamic Item Tooltip
  // =====================================================
  
  getItemTooltip(itemId) {
    const item = GAME_DATA.items?.[itemId];
    if (!item) return null;
    
    const content = [
      { label: 'Type', value: () => item.type.charAt(0).toUpperCase() + item.type.slice(1) }
    ];
    
    // Add rarity if present
    if (item.rarity) {
      content.push({ label: 'Rarity', value: () => item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1) });
    }
    
    content.push({ type: 'divider' });
    content.push({ text: item.description });
    
    // Add stats
    if (item.stats) {
      content.push({ type: 'divider' });
      if (item.stats.maxHp) {
        content.push({ label: 'Max HP', value: () => `+${item.stats.maxHp}` });
      }
      if (item.stats.insight) {
        content.push({ label: 'Insight', value: () => `+${item.stats.insight}` });
      }
      if (item.stats.xpBonus) {
        content.push({ label: 'XP Bonus', value: () => `+${item.stats.xpBonus}%` });
      }
    }
    
    // Add effects for consumables
    if (item.effect) {
      content.push({ type: 'divider' });
      if (item.effect.hp) {
        content.push({ label: 'Restores', value: () => `${item.effect.hp} HP` });
      }
    }
    
    // Add value
    if (item.value) {
      content.push({ type: 'divider' });
      content.push({ label: 'Sell Value', value: () => `${item.value} gold` });
    }
    
    return {
      title: `${item.icon || '📦'} ${item.name}`,
      content: content
    };
  },
  
  // =====================================================
  // Rendering
  // =====================================================
  
  render(definition) {
    if (!definition) return '';
    
    let html = `<div class="tooltip-title">${definition.title}</div>`;
    html += '<div class="tooltip-body">';
    
    definition.content.forEach(item => {
      if (item.type === 'divider') {
        html += '<div class="tooltip-divider"></div>';
      } else if (item.label) {
        const value = typeof item.value === 'function' ? item.value() : item.value;
        html += `<div class="tooltip-row">
          <span class="tooltip-label">${item.label}:</span>
          <span class="tooltip-value">${value}</span>
        </div>`;
      } else if (item.text) {
        html += `<div class="tooltip-text">${item.text}</div>`;
      }
    });
    
    html += '</div>';
    return html;
  },
  
  // =====================================================
  // Show/Hide Logic
  // =====================================================
  
  show(tooltipId, element) {
    // Clear any pending hide
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    
    // Get definition
    let definition;
    
    // Check if it's an item tooltip
    if (tooltipId.startsWith('item-')) {
      const itemId = tooltipId.replace('item-', '');
      definition = this.getItemTooltip(itemId);
    } else {
      definition = this.definitions[tooltipId];
    }
    
    if (!definition) return;
    
    // Set content
    this.element.innerHTML = this.render(definition);
    
    // Show after delay
    this.showTimer = setTimeout(() => {
      this.element.classList.add('visible');
    }, this.config.showDelay);
  },
  
  hide() {
    // Clear any pending show
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    
    // Hide after delay
    this.hideTimer = setTimeout(() => {
      this.element.classList.remove('visible');
    }, this.config.hideDelay);
  },
  
  updatePosition(e) {
    if (!this.element || this.element.style.display === 'none') return;

    const rect = this.element.getBoundingClientRect();
    const tooltipWidth = rect.width || 200;  // Fallback width
    const tooltipHeight = rect.height || 100; // Fallback height

    let x = e.clientX + this.config.offsetX;
    let y = e.clientY + this.config.offsetY;

    // Keep tooltip on screen - adjust if it would overflow right edge
    if (x + tooltipWidth > window.innerWidth - 10) {
      x = e.clientX - tooltipWidth - this.config.offsetX;
    }

    // Keep tooltip on screen - adjust if it would overflow bottom edge
    if (y + tooltipHeight > window.innerHeight - 10) {
      y = e.clientY - tooltipHeight - this.config.offsetY;
    }

    // Ensure it doesn't go off left or top edge
    x = Math.max(10, x);
    y = Math.max(10, y);

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  },
  
  // =====================================================
  // Binding
  // =====================================================
  
  bindTooltips() {
    // Bind static tooltips (defined in HTML with data-tooltip attribute)
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      const tooltipId = element.getAttribute('data-tooltip');
      
      element.addEventListener('mouseenter', () => this.show(tooltipId, element));
      element.addEventListener('mouseleave', () => this.hide());
    });
  },
  
  // Bind a single element dynamically
  bind(element, tooltipId) {
    element.setAttribute('data-tooltip', tooltipId);
    element.addEventListener('mouseenter', () => this.show(tooltipId, element));
    element.addEventListener('mouseleave', () => this.hide());
  },
  
  // Bind item tooltip dynamically
  bindItem(element, itemId) {
    const tooltipId = `item-${itemId}`;
    element.setAttribute('data-tooltip', tooltipId);
    element.addEventListener('mouseenter', () => this.show(tooltipId, element));
    element.addEventListener('mouseleave', () => this.hide());
  },

  // Bind stat tooltips (for profile screen stats)
  bindStats(container) {
    if (!container) container = document;
    container.querySelectorAll('[data-stat-tooltip]').forEach(element => {
      const statId = element.getAttribute('data-stat-tooltip');
      const tooltipId = `stat-${statId}`;
      if (this.definitions[tooltipId]) {
        element.addEventListener('mouseenter', () => this.show(tooltipId, element));
        element.addEventListener('mouseleave', () => this.hide());
      }
    });
  },

  // Bind all dynamic tooltips in a container (items, stats, etc.)
  bindAllInContainer(container) {
    if (!container) return;

    // Bind data-tooltip attributes
    container.querySelectorAll('[data-tooltip]').forEach(element => {
      const tooltipId = element.getAttribute('data-tooltip');
      element.addEventListener('mouseenter', () => this.show(tooltipId, element));
      element.addEventListener('mouseleave', () => this.hide());
    });

    // Bind stat tooltips
    this.bindStats(container);

    // Bind item tooltips (data-item-tooltip attribute)
    container.querySelectorAll('[data-item-tooltip]').forEach(element => {
      const itemId = element.getAttribute('data-item-tooltip');
      const tooltipId = `item-${itemId}`;
      element.addEventListener('mouseenter', () => this.show(tooltipId, element));
      element.addEventListener('mouseleave', () => this.hide());
    });
  },

  // Rebind all tooltips (call after dynamic content changes)
  refresh() {
    this.bindTooltips();
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TooltipSystem.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TooltipSystem;
}
