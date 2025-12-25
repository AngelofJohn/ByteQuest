// ByteQuest Grammar Quests
// Grammar Quest Chain - Located in Haari Fields (Sage Aldric)

const GRAMMAR_QUESTS = {
  
  // =====================================================
  // Grammar Quest Chain - The Sage's Lessons
  // =====================================================
  
  // Quest 1: Introduction to être
  grammar_etre_intro: {
    id: "grammar_etre_intro",
    name: "The Essence of Being",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "available",
    
    levelRequired: 2,
    prerequisites: ["meeting_family"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: "grammar_foundations",
    chainOrder: 1,
    chainNext: "grammar_avoir_intro",
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "The sage Aldric offers to teach you the most fundamental verb in French - 'être' (to be).",
    
    objectives: [
      {
        id: "learn_etre",
        type: "grammar_lesson",
        text: "Practice the verb 'être'",
        target: null,
        grammarConfig: [
          { type: "conjugation", topic: "etre", count: 4 },
          { type: "fill_in_blank", topic: "etre_present", count: 4 }
        ]
      }
    ],
    
    dialogue: {
      intro: "Greetings, traveler. I sense you wish to truly understand our tongue. The verb 'être' - to be - is the foundation of all expression. Master this, and you master the essence of being itself.",
      progress: "Return when you are ready to practice. The verb 'être' awaits.",
      complete: "Excellent! You now understand how to express existence and identity. The Spellbook has been updated with this knowledge."
    },
    
    rewards: {
      xp: 70,  // was 100
      gold: 20,
      spellbookUnlock: ["etre"],
      reputation: { dawnmere: 25 }
    },
    
    // Grammar content reference
    grammarTopics: ["conjugation.etre", "fillInBlank.etre_present"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  },

  // Quest 2: Introduction to avoir
  grammar_avoir_intro: {
    id: "grammar_avoir_intro",
    name: "The Art of Having",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "locked",
    
    levelRequired: 2,
    prerequisites: ["grammar_etre_intro"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: "grammar_foundations",
    chainOrder: 2,
    chainNext: "grammar_gender_intro",
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "Continue your studies with Aldric, learning the verb 'avoir' (to have) - essential for expressing possession, age, and feelings.",
    
    objectives: [
      {
        id: "learn_avoir",
        type: "grammar_lesson",
        text: "Practice the verb 'avoir'",
        target: null,
        grammarConfig: [
          { type: "conjugation", topic: "avoir", count: 4 },
          { type: "fill_in_blank", topic: "avoir_present", count: 4 }
        ]
      }
    ],
    
    dialogue: {
      intro: "You return eager to learn - good. Now we study 'avoir' - to have. In French, we 'have' hunger, 'have' thirst, 'have' years of age. This verb holds many secrets.",
      progress: "The verb 'avoir' is tricky. Take your time.",
      complete: "Well done! You now understand possession and so much more. Many expressions use 'avoir' where English uses 'to be'."
    },
    
    rewards: {
      xp: 70,  // was 100
      gold: 20,
      spellbookUnlock: ["avoir"],
      reputation: { dawnmere: 25 }
    },
    
    grammarTopics: ["conjugation.avoir", "fillInBlank.avoir_present"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  },

  // Quest 3: Gender and Articles
  grammar_gender_intro: {
    id: "grammar_gender_intro",
    name: "The Nature of Things",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "locked",
    
    levelRequired: 3,
    prerequisites: ["grammar_avoir_intro"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: "grammar_foundations",
    chainOrder: 3,
    chainNext: "grammar_aller_intro",
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "Learn that in French, every noun has a gender - masculine or feminine - and must be paired with the correct article.",
    
    objectives: [
      {
        id: "learn_gender",
        type: "grammar_lesson",
        text: "Practice gender and articles",
        target: null,
        grammarConfig: [
          { type: "gender_match", topic: "definite", count: 5 },
          { type: "gender_match", topic: "indefinite", count: 3 }
        ]
      }
    ],
    
    dialogue: {
      intro: "In our tongue, all things have a nature - masculine or feminine. The sun is 'le soleil' - masculine. The moon is 'la lune' - feminine. You must learn to sense this nature.",
      progress: "Gender is perhaps the hardest concept for outsiders. Patience.",
      complete: "You begin to feel the nature of words. With practice, this will become instinct."
    },
    
    rewards: {
      xp: 85,  // was 120
      gold: 25,
      spellbookUnlock: ["articles", "gender"],
      reputation: { dawnmere: 30 }
    },
    
    grammarTopics: ["genderMatch.definite", "genderMatch.indefinite"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  },

  // Quest 4: Aller (to go)
  grammar_aller_intro: {
    id: "grammar_aller_intro",
    name: "The Path Forward",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "locked",
    
    levelRequired: 3,
    prerequisites: ["grammar_gender_intro"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: "grammar_foundations",
    chainOrder: 4,
    chainNext: "grammar_regular_er",
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "Learn the verb 'aller' (to go) - irregular but essential for movement and expressing the future.",
    
    objectives: [
      {
        id: "learn_aller",
        type: "grammar_lesson",
        text: "Practice the verb 'aller'",
        target: null,
        grammarConfig: [
          { type: "conjugation", topic: "aller", count: 5 },
          { type: "fill_in_blank", topic: "aller_present", count: 3 }
        ]
      }
    ],
    
    dialogue: {
      intro: "A traveler must know how to speak of movement. 'Aller' - to go - will serve you well on your journeys. It is irregular, like the paths of life itself.",
      progress: "Where are you going? 'Où allez-vous?' Practice this verb.",
      complete: "Now you can speak of where you go, where others go. The world opens before you."
    },
    
    rewards: {
      xp: 70,  // was 100
      gold: 20,
      spellbookUnlock: ["aller"],
      reputation: { dawnmere: 25 }
    },
    
    grammarTopics: ["conjugation.aller", "fillInBlank.aller_present"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  },

  // Quest 5: Regular -er verbs
  grammar_regular_er: {
    id: "grammar_regular_er",
    name: "The Common Tongue",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "locked",
    
    levelRequired: 4,
    prerequisites: ["grammar_aller_intro"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: "grammar_foundations",
    chainOrder: 5,
    chainNext: null,
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "Master the pattern for regular -er verbs - the most common verb type in French. Learn one pattern, conjugate hundreds of verbs!",
    
    objectives: [
      {
        id: "learn_regular_er",
        type: "grammar_lesson",
        text: "Practice regular -er verbs",
        target: null,
        grammarConfig: [
          { type: "conjugation", topic: "parler", count: 4 },
          { type: "fill_in_blank", topic: "regular_er", count: 4 }
        ]
      }
    ],
    
    dialogue: {
      intro: "You have learned the irregular verbs that march to their own drum. Now learn the regular soldiers - the -er verbs. Master this pattern, and you unlock hundreds of verbs at once.",
      progress: "Parler, manger, habiter, danser... they all follow the same pattern.",
      complete: "Magnificent! You now hold the key to most French verbs. The Spellbook contains the pattern - use it wisely."
    },
    
    rewards: {
      xp: 105,  // was 150
      gold: 30,
      items: ["scholars_ring"],
      spellbookUnlock: ["regular_er_pattern"],
      reputation: { dawnmere: 40 }
    },
    
    grammarTopics: ["conjugation.parler", "fillInBlank.regular_er"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  },

  // =====================================================
  // Mixed Practice Quests (after foundations)
  // =====================================================
  
  grammar_mixed_practice_1: {
    id: "grammar_mixed_practice_1",
    name: "Trial of Words",
    giver: "sage_aldric",
    location: "haari_fields",
    
    type: "lesson",
    category: "lesson",
    status: "locked",
    
    levelRequired: 5,
    prerequisites: ["grammar_regular_er"],
    classRequired: null,
    reputationRequired: null,
    
    chainId: null,
    chainOrder: null,
    chainNext: null,
    
    timeLimit: null,
    cooldown: null,
    seasonalWindow: null,
    
    description: "Test your mastery with a mixed challenge covering all grammar foundations.",
    
    objectives: [
      {
        id: "mixed_grammar_test",
        type: "grammar_lesson",
        text: "Complete the grammar trial",
        target: null,
        grammarConfig: [
          { type: "conjugation", topic: "etre", count: 2 },
          { type: "conjugation", topic: "avoir", count: 2 },
          { type: "fill_in_blank", topic: "etre_present", count: 2 },
          { type: "fill_in_blank", topic: "avoir_present", count: 2 },
          { type: "gender_match", topic: "definite", count: 2 }
        ]
      }
    ],
    
    dialogue: {
      intro: "You have learned much. Now face the Trial of Words - a test of all you have studied. Are you ready?",
      progress: "The trial awaits. Return when you are prepared.",
      complete: "You have proven yourself a true student of our tongue. I have nothing more to teach you... for now."
    },
    
    rewards: {
      xp: 140,  // was 200
      gold: 50,
      items: ["sages_blessing"],
      title: "grammar_apprentice",
      reputation: { dawnmere: 50 }
    },
    
    grammarTopics: ["mixed"],
    
    cannotAbandon: false,
    hiddenTrigger: null
  }
};

// =====================================================
// Sage NPC Definition
// =====================================================

const GRAMMAR_NPCS = {
  sage_aldric: {
    id: "sage_aldric",
    name: "Sage Aldric",
    role: "Grammar Teacher",
    location: "haari_fields",
    
    dialogue: {
      greeting: "Ah, a seeker of knowledge. The patterns of language hold great power for those who understand them.",
      idle: [
        "Words are like spells - use them correctly, and you can accomplish anything.",
        "The verb 'être'... to be. Such a small word, yet it carries the weight of existence.",
        "In our tongue, even the moon and sun have different natures.",
        "Study the patterns, and the language will reveal itself to you."
      ],
      noQuest: "I have shared all I know for now. Practice what you have learned.",
      lowLevel: "Return when you have more experience. Grammar requires a foundation of vocabulary first."
    },
    
    quests: [
      "grammar_etre_intro",
      "grammar_avoir_intro", 
      "grammar_gender_intro",
      "grammar_aller_intro",
      "grammar_regular_er",
      "grammar_mixed_practice_1"
    ],
    
    shop: null
  }
};

// =====================================================
// Grammar-related Items
// =====================================================

const GRAMMAR_ITEMS = {
  scholars_ring: {
    id: "scholars_ring",
    name: "Scholar's Ring",
    type: "ring",
    icon: "💍",
    description: "A ring worn by dedicated students of language. Grants +1 Insight.",
    rarity: "uncommon",
    stackable: false,
    value: 50,
    stats: {
      insight: 1
    }
  },
  sages_blessing: {
    id: "sages_blessing",
    name: "Sage's Blessing",
    type: "consumable",
    icon: "✨",
    description: "A magical blessing that doubles XP from your next lesson.",
    rarity: "rare",
    stackable: true,
    maxStack: 5,
    value: 100,
    effect: {
      xpMultiplier: 2,
      duration: 1 // Next lesson only
    }
  }
};

// =====================================================
// Grammar Title
// =====================================================

const GRAMMAR_TITLES = {
  grammar_apprentice: {
    id: "grammar_apprentice",
    name: "Grammar Apprentice",
    description: "Completed the Sage's grammar foundations",
    source: "quest",
    color: "#9b59b6",
    rarity: "uncommon"
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    GRAMMAR_QUESTS,
    GRAMMAR_NPCS,
    GRAMMAR_ITEMS,
    GRAMMAR_TITLES
  };
}
