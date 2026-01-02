// ===========================================
// COSMETIC DATA
// Definitions for all cosmetic items
// ===========================================

const COSMETIC_DATA = {
  version: '1.0.0',

  // Category metadata
  categories: {
    frames: {
      name: 'Portrait Frames',
      description: 'Decorative borders for your character portrait',
      icon: '🖼️',
      maxEquipped: 1
    },
    backgrounds: {
      name: 'Profile Backgrounds',
      description: 'Visual themes for your profile screen',
      icon: '🎨',
      maxEquipped: 1
    },
    accents: {
      name: 'UI Accents',
      description: 'Color themes for UI highlights',
      icon: '✨',
      maxEquipped: 1
    },
    badges: {
      name: 'Completion Badges',
      description: 'Achievements displayed on your profile',
      icon: '🏅',
      maxEquipped: 3
    }
  },

  // All cosmetic items
  cosmetics: [
    // ===========================================
    // PORTRAIT FRAMES
    // ===========================================

    // Default/Starting frames
    {
      id: 'basic',
      name: 'Simple Frame',
      category: 'frames',
      rarity: 'common',
      source: 'default',
      description: 'A simple wooden frame.',
      preview: '🪵',
      cssClass: 'frame-basic'
    },
    {
      id: 'frame_scholar',
      name: "Scholar's Seal",
      category: 'frames',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'choose_your_path',
      description: 'Awarded to those who join the Order of Knowledge.',
      preview: '📜',
      cssClass: 'frame-scholar'
    },
    {
      id: 'frame_protector',
      name: "Protector's Guard",
      category: 'frames',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'choose_your_path',
      description: 'Awarded to those who join the Order of Protection.',
      preview: '🛡️',
      cssClass: 'frame-protector'
    },
    {
      id: 'frame_pathfinder',
      name: "Pathfinder's Compass",
      category: 'frames',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'choose_your_path',
      description: 'Awarded to those who join the Order of Pilgrimage.',
      preview: '🧭',
      cssClass: 'frame-pathfinder'
    },
    {
      id: 'frame_dawnmere',
      name: 'Dawnmere Crest',
      category: 'frames',
      rarity: 'rare',
      source: 'reputation',
      sourceId: 'dawnmere_4',
      description: 'Earned by reaching maximum reputation with Dawnmere.',
      preview: '🏘️',
      cssClass: 'frame-dawnmere'
    },
    {
      id: 'frame_haari',
      name: 'Haari Fields Wreath',
      category: 'frames',
      rarity: 'rare',
      source: 'reputation',
      sourceId: 'haari_fields_4',
      description: 'Earned by reaching maximum reputation with Haari Fields.',
      preview: '🌾',
      cssClass: 'frame-haari'
    },
    {
      id: 'frame_gold',
      name: 'Gilded Frame',
      category: 'frames',
      rarity: 'rare',
      source: 'shop',
      price: 500,
      description: 'An ornate golden frame for the discerning collector.',
      preview: '👑',
      cssClass: 'frame-gold'
    },
    {
      id: 'frame_ancient',
      name: 'Ancient Runes',
      category: 'frames',
      rarity: 'epic',
      source: 'achievement',
      sourceId: 'master_historian',
      description: 'Unlocked by collecting all artifacts.',
      preview: '🔮',
      cssClass: 'frame-ancient'
    },

    // ===========================================
    // PROFILE BACKGROUNDS
    // ===========================================

    {
      id: 'default',
      name: 'Parchment',
      category: 'backgrounds',
      rarity: 'common',
      source: 'default',
      description: 'Classic parchment background.',
      preview: '📃',
      color: '#2a2420'
    },
    {
      id: 'bg_dawnmere',
      name: 'Dawnmere Village',
      category: 'backgrounds',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'meeting_the_family',
      description: 'The peaceful village of Dawnmere.',
      preview: '🏡',
      gradient: 'linear-gradient(180deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)'
    },
    {
      id: 'bg_haari',
      name: 'Golden Fields',
      category: 'backgrounds',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'harvest_time',
      description: 'The sun-drenched fields of Haari.',
      preview: '🌻',
      gradient: 'linear-gradient(180deg, #d69e2e 0%, #975a16 50%, #2d3748 100%)'
    },
    {
      id: 'bg_night',
      name: 'Starlit Sky',
      category: 'backgrounds',
      rarity: 'rare',
      source: 'shop',
      price: 300,
      description: 'A peaceful night sky filled with stars.',
      preview: '🌙',
      gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
    },
    {
      id: 'bg_forest',
      name: 'Ancient Woods',
      category: 'backgrounds',
      rarity: 'rare',
      source: 'shop',
      price: 300,
      description: 'The mysterious forest beyond the settlements.',
      preview: '🌲',
      gradient: 'linear-gradient(180deg, #1d4e4e 0%, #134e4a 50%, #0d3d3d 100%)'
    },
    {
      id: 'bg_corruption',
      name: 'Corrupted Lands',
      category: 'backgrounds',
      rarity: 'epic',
      source: 'quest',
      sourceId: 'corruption_rises',
      description: 'The spreading darkness that threatens the land.',
      preview: '💀',
      gradient: 'linear-gradient(180deg, #4a1942 0%, #2d1033 50%, #1a0a1f 100%)'
    },

    // ===========================================
    // UI ACCENTS
    // ===========================================

    {
      id: 'default',
      name: 'Classic Gold',
      category: 'accents',
      rarity: 'common',
      source: 'default',
      description: 'The classic golden accent.',
      preview: '💛',
      colors: {
        primary: '#c9a227',
        secondary: '#8b7355'
      }
    },
    {
      id: 'accent_blue',
      name: 'Scholar Blue',
      category: 'accents',
      rarity: 'uncommon',
      source: 'shop',
      price: 150,
      description: 'A calm blue accent reminiscent of scholarly tomes.',
      preview: '💙',
      colors: {
        primary: '#4299e1',
        secondary: '#2b6cb0'
      }
    },
    {
      id: 'accent_green',
      name: 'Nature Green',
      category: 'accents',
      rarity: 'uncommon',
      source: 'shop',
      price: 150,
      description: 'A vibrant green accent from the fields.',
      preview: '💚',
      colors: {
        primary: '#48bb78',
        secondary: '#276749'
      }
    },
    {
      id: 'accent_purple',
      name: 'Mystic Purple',
      category: 'accents',
      rarity: 'rare',
      source: 'shop',
      price: 250,
      description: 'A mysterious purple accent of ancient magic.',
      preview: '💜',
      colors: {
        primary: '#9f7aea',
        secondary: '#6b46c1'
      }
    },
    {
      id: 'accent_red',
      name: 'Warrior Red',
      category: 'accents',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'protectors_path',
      description: 'The bold red of the Order of Protection.',
      preview: '❤️',
      colors: {
        primary: '#f56565',
        secondary: '#c53030'
      }
    },
    {
      id: 'accent_silver',
      name: 'Moonlit Silver',
      category: 'accents',
      rarity: 'epic',
      source: 'hidden',
      sourceId: 'shadows_of_light',
      description: 'A silvery accent that shimmers like moonlight.',
      preview: '🤍',
      colors: {
        primary: '#e2e8f0',
        secondary: '#a0aec0'
      }
    },

    // ===========================================
    // COMPLETION BADGES
    // ===========================================

    // Zone Completion
    {
      id: 'badge_dawnmere_complete',
      name: 'Dawnmere Champion',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'dawnmere_complete',
      description: 'Completed all quests in Dawnmere.',
      preview: '🏆'
    },
    {
      id: 'badge_haari_complete',
      name: 'Haari Champion',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'haari_complete',
      description: 'Completed all quests in Haari Fields.',
      preview: '🏆'
    },

    // Boss Exam badges
    {
      id: 'badge_exam_dawnmere',
      name: 'Dawnmere Graduate',
      category: 'badges',
      rarity: 'uncommon',
      source: 'achievement',
      sourceId: 'dawnmere_exam_pass',
      description: 'Passed the Dawnmere Boss Exam.',
      preview: '🎓'
    },
    {
      id: 'badge_exam_haari',
      name: 'Haari Graduate',
      category: 'badges',
      rarity: 'uncommon',
      source: 'achievement',
      sourceId: 'haari_exam_pass',
      description: 'Passed the Haari Fields Boss Exam.',
      preview: '🎓'
    },
    {
      id: 'badge_exam_perfect',
      name: 'Perfect Score',
      category: 'badges',
      rarity: 'epic',
      source: 'achievement',
      sourceId: 'perfect_exam',
      description: 'Achieved a perfect score on any Boss Exam.',
      preview: '💯'
    },

    // Learning badges
    {
      id: 'badge_wordmaster',
      name: 'Word Master',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'word_master_4',
      description: 'Mastered 200 vocabulary words.',
      preview: '📖'
    },
    {
      id: 'badge_streak_10',
      name: 'Hot Streak',
      category: 'badges',
      rarity: 'uncommon',
      source: 'achievement',
      sourceId: 'streak_10',
      description: 'Achieved a 10-question streak.',
      preview: '🔥'
    },
    {
      id: 'badge_streak_25',
      name: 'Unstoppable',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'streak_25',
      description: 'Achieved a 25-question streak.',
      preview: '⚡'
    },

    // Collector badges
    {
      id: 'badge_artifact_hunter',
      name: 'Artifact Hunter',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'truth_seeker',
      description: 'Found your first artifact.',
      preview: '🔍'
    },
    {
      id: 'badge_historian',
      name: 'Master Historian',
      category: 'badges',
      rarity: 'legendary',
      source: 'achievement',
      sourceId: 'master_historian',
      description: 'Collected all 26 artifacts.',
      preview: '📚'
    },

    // Special badges
    {
      id: 'badge_helpful',
      name: 'Community Helper',
      category: 'badges',
      rarity: 'uncommon',
      source: 'quest',
      sourceId: 'community_spirit',
      description: 'Contributed to a village project.',
      preview: '🤝'
    },
    {
      id: 'badge_crafter',
      name: 'Master Crafter',
      category: 'badges',
      rarity: 'rare',
      source: 'achievement',
      sourceId: 'craft_50',
      description: 'Crafted 50 items.',
      preview: '⚒️'
    }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COSMETIC_DATA;
}
