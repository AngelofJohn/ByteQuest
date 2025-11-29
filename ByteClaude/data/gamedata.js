// ByteQuest Game Data
// Phase 1: Dawnmere Vertical Slice - Updated with Quest Classifications

// =====================================================
// World Information
// =====================================================

const GAME_DATA = {
  world: {
    name: "Turuem",
    currentRegion: "Dawnmere",
    lore: {
      established: `The world was united under the kingdom of Verandum. The king's two sons, 
        Hermeau and Layne, grew apart as they aged. When an evil threat plagued the lands and 
        the king was assassinated, House A (Hermeau) took control. The second son was exiled. 
        Peace was restored... or so the story goes.`,
      hidden: `The truth remains buried beneath propaganda. Dark magic, forbidden and forgotten, 
        was wielded in the fog of war. The churches speak of light, but shadows move unseen...`
    }
  },

  // =====================================================
  // Locations
  // =====================================================
  locations: {
    dawnmere: {
      id: "dawnmere",
      name: "Dawnmere",
      description: "A small wooden settlement on the trade routes of the river. New settlers seek opportunity here, away from the great cities.",
      type: "town",
      level: 1,
      discovered: true,
      npcs: ["urma", "rega", "merchant", "baker"],
      quests: [
        "meeting_family", 
        "slime_farming", 
        "bakers_dozen",
        "daily_practice",
        "weekly_challenge",
        "helping_hand",
        "secret_student",
        "festival_feast"
      ],
      connectedTo: ["haari_fields"],
      atmosphere: "hopeful",
      music: null
    },
    haari_fields: {
      id: "haari_fields",
      name: "The Haari Fields",
      description: "Golden wheat-colored fields stretch north toward Lurenium. Boar-like creatures roam the wild edges.",
      type: "wilderness",
      level: 2,
      discovered: false,
      npcs: ["dave", "mary"],
      quests: ["corruption_rises", "harvest_time"],
      connectedTo: ["dawnmere", "lurenium"],
      atmosphere: "pastoral",
      music: null
    }
  },

  // =====================================================
  // NPCs
  // =====================================================
  npcs: {
    urma: {
      id: "urma",
      name: "Urma",
      title: "Village Elder",
      location: "dawnmere",
      portrait: null,
      disposition: "friendly",
      dialogue: {
        greeting: "Ah, a traveler! Welcome to Dawnmere. We don't get many visitors from beyond the known kingdoms.",
        quest_intro: "You look capable. Perhaps you could help some of our settlers?",
        quest_complete: "You've done well, traveler. Dawnmere is lucky to have you.",
        idle: [
          "The river brings trade, but lately... darker things too.", 
          "Have you visited the shrine? The light protects us here.", 
          "Hermeau's banners fly in the cities, but we simple folk just want peace."
        ]
      },
      quests: ["meeting_family", "weekly_challenge"],
      shop: null
    },
    rega: {
      id: "rega",
      name: "Rega",
      title: "Farmer",
      location: "dawnmere",
      portrait: null,
      disposition: "worried",
      dialogue: {
        greeting: "Oh! You startled me. These old bones aren't what they used to be.",
        quest_intro: "Slimes! Can you believe it? Never seen the like in all my years.",
        quest_complete: "Bless you, traveler! Here, take this.",
        idle: [
          "I came to Dawnmere for a fresh start after... well, after the troubles.", 
          "The soil here is good. Or it was, before those creatures showed up.", 
          "My family farmed near Renque once. That was before the war."
        ]
      },
      quests: ["slime_farming", "daily_practice", "helping_hand"],
      shop: null
    },
    merchant: {
      id: "merchant",
      name: "Traveling Merchant",
      title: "Wanderer",
      location: "dawnmere",
      portrait: null,
      disposition: "neutral",
      dialogue: {
        greeting: "Looking to trade? I've got wares from across Turuem!",
        idle: [
          "The roads aren't as safe as they used to be.", 
          "Prices are higher in the cities. Better deals out here.", 
          "I heard strange rumors from the Haari Fields..."
        ]
      },
      quests: [],
      shop: {
        items: ["health_potion", "bread", "basic_helm"],
        currency: "gold"
      }
    },
    baker: {
      id: "baker",
      name: "Marta",
      title: "Baker",
      location: "dawnmere",
      portrait: null,
      disposition: "friendly",
      dialogue: {
        greeting: "Welcome! The bread is fresh, and so is the gossip!",
        quest_intro: "I'm preparing for the festival but there's so much to do!",
        quest_complete: "You're a lifesaver! Here, have some fresh bread.",
        idle: [
          "Nothing beats the smell of fresh bread in the morning.",
          "My grandmother taught me to bake. She came from Lurenium.",
          "The festival is the highlight of our year here."
        ]
      },
      quests: ["bakers_dozen", "festival_feast"],
      shop: {
        items: ["bread"],
        currency: "gold"
      }
    },
    tutor: {
      id: "tutor",
      name: "Old Pierre",
      title: "Retired Scholar",
      location: "dawnmere",
      portrait: null,
      disposition: "wise",
      hidden: true, // Only appears after secret quest triggers
      dialogue: {
        greeting: "Ah, I see you've been struggling. That's nothing to be ashamed of.",
        quest_intro: "Let me share some techniques that helped me learn languages long ago.",
        quest_complete: "Knowledge is a journey, not a destination. You're doing well.",
        idle: [
          "I taught at the academy in Lurenium once. Seems like another life.",
          "The old ways of learning have their merits.",
          "Everyone struggles. The wise ones seek help."
        ]
      },
      quests: ["secret_student"],
      shop: null
    }
  },

  // =====================================================
  // Quests - Complete Classification System
  // =====================================================
  quests: {
    // -------------------------------------------------
    // MAIN QUESTS - Story Critical
    // -------------------------------------------------
    meeting_family: {
      id: "meeting_family",
      name: "Meeting the Family",
      giver: "urma",
      location: "dawnmere",
      
      // Classification
      type: "main",
      category: "social",
      status: "available",
      
      // Requirements
      levelRequired: 1,
      prerequisites: [],
      classRequired: null,
      reputationRequired: null,
      
      // Chain info (null if standalone)
      chainId: "dawnmere_intro",
      chainOrder: 1,
      chainNext: "slime_farming",
      
      // Timing
      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,
      
      // Content
      description: "Learn to introduce yourself and meet the settlers of Dawnmere.",
      objectives: [
        { 
          id: "learn_greetings", 
          type: "lesson",
          text: "Learn basic French greetings", 
          target: null
        },
        { 
          id: "learn_family", 
          type: "lesson",
          text: "Learn family vocabulary", 
          target: null
        },
        { 
          id: "meet_settlers", 
          type: "meet",
          text: "Introduce yourself to settlers", 
          target: 3
        }
      ],
      dialogue: {
        intro: "Well hello there! I want you to meet everyone here. There are many of us, so I hope you can remember it all! We will be happy to get to know you.",
        progress: "Have you met everyone yet? Don't be shy!",
        complete: "Wonderful! You're picking up our ways quickly. The people here will remember your kindness."
      },
      
      // Rewards
      rewards: {
        xp: 100,
        gold: 15,
        items: ["traveler_cloak"],
        reputation: { dawnmere: 50 }
      },
      repeatRewardMultiplier: null, // Not repeatable
      
      // Learning content
      vocabulary: ["basics.greetings", "basics.introductions", "family.beginner"],
      
      // Flags
      cannotAbandon: true,
      hiddenTrigger: null
    },

    slime_farming: {
      id: "slime_farming",
      name: "Slime Farming",
      giver: "rega",
      location: "dawnmere",
      
      type: "main",
      category: "combat",
      status: "locked",
      
      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: "dawnmere_intro",
      chainOrder: 2,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,
      
      description: "Help Rega defend his farm from mysterious slime creatures.",
      objectives: [
        { 
          id: "learn_farming", 
          type: "lesson",
          text: "Learn farming vocabulary", 
          target: null
        },
        { 
          id: "defeat_slimes", 
          type: "combat",
          text: "Defeat the slimes", 
          target: 5
        },
        { 
          id: "return_rega", 
          type: "interact",
          text: "Return to Rega", 
          target: null
        }
      ],
      dialogue: {
        intro: "You're just in time! This is the first time I've seen this happen to my farm, but there are slimes—well, sliming all around my crops! Would you be so kind as to remove some of them for me?",
        progress: "How goes the hunt? Those slimes won't clear themselves!",
        complete: "Thanks! I'm sure I'll survive this season now. Here, I hope this is enough compensation."
      },
      
      rewards: {
        xp: 150,
        gold: 25,
        items: ["broken_shovel"],
        reputation: { dawnmere: 75 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["farming.beginner", "farming.creatures", "farming.phrases"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // SIDE QUESTS - Optional, One-time
    // -------------------------------------------------
    bakers_dozen: {
      id: "bakers_dozen",
      name: "A Baker's Dozen",
      giver: "baker",
      location: "dawnmere",
      
      type: "side",
      category: "commerce",
      status: "available",
      
      levelRequired: 1,
      prerequisites: [],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,
      
      description: "Help Marta prepare bread for the upcoming festival.",
      objectives: [
        { 
          id: "learn_food", 
          type: "lesson",
          text: "Learn food vocabulary", 
          target: null
        },
        { 
          id: "help_bake", 
          type: "task",
          text: "Help bake bread", 
          target: 13
        }
      ],
      dialogue: {
        intro: "Hello traveler! I'm trying to bake bread for the upcoming festival, but I don't have enough time. Could you help me?",
        progress: "Keep at it! We need a baker's dozen!",
        complete: "Thank you so much! Here, have a loaf of bread as your reward."
      },
      
      rewards: {
        xp: 75,
        gold: 10,
        items: ["bread", "bread", "bread"],
        reputation: { dawnmere: 25 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["food.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // DAILY QUESTS - Reset every 24 hours
    // -------------------------------------------------
    daily_practice: {
      id: "daily_practice",
      name: "Daily Practice",
      giver: "rega",
      location: "dawnmere",
      
      type: "daily",
      category: "lesson",
      status: "available",
      
      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null, // Daily resets at midnight
      seasonalWindow: null,
      
      description: "Practice your vocabulary with the settlers. A little each day goes a long way!",
      objectives: [
        { 
          id: "complete_review", 
          type: "lesson",
          text: "Complete a vocabulary review", 
          target: null
        }
      ],
      dialogue: {
        intro: "Back for more practice? That's the spirit! Consistency is key to learning.",
        progress: "Take your time with the lesson. No rush.",
        complete: "Well done! See you tomorrow for more practice!"
      },
      
      rewards: {
        xp: 25,
        gold: 5,
        items: [],
        reputation: { dawnmere: 5 }
      },
      repeatRewardMultiplier: 1.0, // Full rewards each day
      
      vocabulary: ["basics.greetings", "family.beginner", "farming.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // WEEKLY QUESTS - Reset every 7 days
    // -------------------------------------------------
    weekly_challenge: {
      id: "weekly_challenge",
      name: "Elder's Challenge",
      giver: "urma",
      location: "dawnmere",
      
      type: "weekly",
      category: "lesson",
      status: "locked",
      
      levelRequired: 2,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null, // Weekly reset
      seasonalWindow: null,
      
      description: "Urma challenges you to prove your knowledge with a comprehensive test.",
      objectives: [
        { 
          id: "complete_challenge", 
          type: "lesson",
          text: "Complete the Elder's vocabulary challenge", 
          target: null
        },
        { 
          id: "perfect_score", 
          type: "task",
          text: "Score at least 80%", 
          target: null
        }
      ],
      dialogue: {
        intro: "You've been here a while now. Let's see how much you've truly learned. This won't be easy.",
        progress: "The challenge awaits. Are you prepared?",
        complete: "Impressive! You honor our village with your dedication to learning."
      },
      
      rewards: {
        xp: 200,
        gold: 50,
        items: ["health_potion", "health_potion"],
        reputation: { dawnmere: 100 }
      },
      repeatRewardMultiplier: 1.0,
      
      vocabulary: ["basics.greetings", "basics.introductions", "family.beginner", "family.intermediate", "farming.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // REPEATABLE QUESTS - Can redo after cooldown
    // -------------------------------------------------
    helping_hand: {
      id: "helping_hand",
      name: "A Helping Hand",
      giver: "rega",
      location: "dawnmere",
      
      type: "repeatable",
      category: "gathering",
      status: "locked",
      
      levelRequired: 1,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: 3600000, // 1 hour in milliseconds
      seasonalWindow: null,
      
      description: "Help around the farm. There's always work to be done.",
      objectives: [
        { 
          id: "farm_tasks", 
          type: "task",
          text: "Complete farm tasks", 
          target: 5
        }
      ],
      dialogue: {
        intro: "More work has piled up. You know how it is on a farm—never ends!",
        progress: "Keep at it! Almost done.",
        complete: "You're a reliable one. Come back anytime you want to help."
      },
      
      rewards: {
        xp: 30,
        gold: 8,
        items: [],
        reputation: { dawnmere: 10 }
      },
      repeatRewardMultiplier: 0.75, // 75% rewards on repeat
      
      vocabulary: ["farming.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // HIDDEN QUESTS - Secret until trigger condition met
    // -------------------------------------------------
    secret_student: {
      id: "secret_student",
      name: "The Struggling Student",
      giver: "tutor",
      location: "dawnmere",
      
      type: "hidden",
      category: "lesson",
      status: "locked",
      
      levelRequired: 1,
      prerequisites: [],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,
      
      description: "A retired scholar notices your struggles and offers to help.",
      objectives: [
        { 
          id: "meet_tutor", 
          type: "interact",
          text: "Speak with Old Pierre", 
          target: null
        },
        { 
          id: "special_lesson", 
          type: "lesson",
          text: "Complete Pierre's special lesson", 
          target: null
        }
      ],
      dialogue: {
        intro: "I've been watching you, young one. Struggling with the language? There's no shame in that. I struggled too, once. Let me teach you some tricks that helped me.",
        progress: "Take your time. Learning isn't a race.",
        complete: "You see? Everyone struggles. What matters is that you kept trying. That's the real lesson."
      },
      
      rewards: {
        xp: 150,
        gold: 0,
        items: ["scholars_note"],
        reputation: { dawnmere: 50 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["basics.greetings", "basics.introductions"],
      
      cannotAbandon: false,
      hiddenTrigger: {
        wrongAnswers: 15, // Triggers after 15 wrong answers total
        lessonsCompleted: null,
        npcsMet: null,
        locationDiscovered: null,
        itemFound: null,
        timePlayedMinutes: null
      }
    },

    // -------------------------------------------------
    // TIMED QUESTS - Must complete within time limit
    // -------------------------------------------------
    festival_feast: {
      id: "festival_feast",
      name: "Festival Feast",
      giver: "baker",
      location: "dawnmere",
      
      type: "timed",
      category: "commerce",
      status: "locked",
      
      levelRequired: 2,
      prerequisites: ["bakers_dozen"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: 600000, // 10 minutes in milliseconds
      cooldown: null,
      seasonalWindow: null,
      
      description: "The festival is starting! Help prepare the feast before time runs out!",
      objectives: [
        { 
          id: "gather_ingredients", 
          type: "collect",
          text: "Gather ingredients", 
          target: 5
        },
        { 
          id: "deliver_food", 
          type: "deliver",
          text: "Deliver food to the festival", 
          target: null
        }
      ],
      dialogue: {
        intro: "The festival starts soon and I'm not ready! Please, help me gather everything quickly!",
        progress: "Hurry! Time is running out!",
        complete: "We made it! The festival is saved thanks to you!",
        failed: "Oh no... the festival has started without the feast. Maybe next time..."
      },
      
      rewards: {
        xp: 125,
        gold: 30,
        items: ["festival_token"],
        reputation: { dawnmere: 75 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["food.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // SEASONAL QUESTS - Only available during certain times
    // -------------------------------------------------
    winter_solstice: {
      id: "winter_solstice",
      name: "Solstice Celebration",
      giver: "urma",
      location: "dawnmere",
      
      type: "seasonal",
      category: "lore",
      status: "locked",
      
      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,
      
      chainId: null,
      chainOrder: null,
      chainNext: null,
      
      timeLimit: null,
      cooldown: null,
      seasonalWindow: {
        startMonth: 12,
        startDay: 15,
        endMonth: 1,
        endDay: 5
      },
      
      description: "Join the village in celebrating the winter solstice with traditional festivities.",
      objectives: [
        { 
          id: "learn_holiday", 
          type: "lesson",
          text: "Learn holiday vocabulary", 
          target: null
        },
        { 
          id: "participate", 
          type: "task",
          text: "Participate in solstice traditions", 
          target: 3
        }
      ],
      dialogue: {
        intro: "The longest night approaches. In Dawnmere, we celebrate with lights and song. Will you join us?",
        progress: "The celebration continues! Join in!",
        complete: "Thank you for celebrating with us. May the returning light bring you wisdom."
      },
      
      rewards: {
        xp: 100,
        gold: 25,
        items: ["solstice_lantern"],
        reputation: { dawnmere: 50 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["time.basic", "basics.greetings"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // CHAIN QUESTS - Part of larger storyline (Haari Fields)
    // -------------------------------------------------
    corruption_rises: {
      id: "corruption_rises",
      name: "Corruption Rises",
      giver: "dave",
      location: "haari_fields",
      
      type: "chain",
      category: "lore",
      status: "locked",
      
      levelRequired: 3,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: { dawnmere: 100 },
      
      chainId: "corruption_arc",
      chainOrder: 1,
      chainNext: "corruption_spreads",
      
      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,
      
      description: "Strange blight spreads across the Haari Fields. Dave the Herbalist needs your help investigating.",
      objectives: [
        { 
          id: "investigate_blight", 
          type: "exploration",
          text: "Investigate the blighted areas", 
          target: 3
        },
        { 
          id: "collect_samples", 
          type: "collect",
          text: "Collect corrupted samples", 
          target: 5
        },
        { 
          id: "report_dave", 
          type: "interact",
          text: "Report findings to Dave", 
          target: null
        }
      ],
      dialogue: {
        intro: "Something is wrong with the land. Plants are dying, turning black. This isn't natural. I need someone to investigate the affected areas.",
        progress: "Be careful out there. Whatever is causing this... it feels wrong.",
        complete: "This is worse than I feared. These samples... there's dark magic at work here. This is only the beginning."
      },
      
      rewards: {
        xp: 200,
        gold: 40,
        items: ["herbalist_pouch"],
        reputation: { dawnmere: 50, old_guard: 25 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["farming.intermediate", "farming.creatures"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    }
  },

  // =====================================================
  // Items
  // =====================================================
  items: {
    // Consumables
    health_potion: {
      id: "health_potion",
      name: "Health Potion",
      type: "consumable",
      description: "Restores 20 HP",
      effect: { hp: 20 },
      value: 15,
      stackable: true,
      icon: "🧪"
    },
    bread: {
      id: "bread",
      name: "Bread",
      type: "consumable",
      description: "Restores 5 HP. Fresh from the oven.",
      effect: { hp: 5 },
      value: 3,
      stackable: true,
      icon: "🍞"
    },
    
    // Equipment - Helms
    basic_helm: {
      id: "basic_helm",
      name: "Standard Helm",
      type: "helm",
      description: "A simple iron helm.",
      stats: { maxHp: 1 },
      value: 20,
      stackable: false,
      icon: "🪖"
    },
    
    // Equipment - Weapons
    broken_shovel: {
      id: "broken_shovel",
      name: "Broken Shovel",
      type: "weapon",
      description: "A rusted shovel with a broken edge. Could be dangerous.",
      stats: { attack: 2 },
      value: 5,
      stackable: false,
      icon: "🔧"
    },
    
    // Equipment - Accessories
    traveler_cloak: {
      id: "traveler_cloak",
      name: "Traveler's Cloak",
      type: "accessory",
      description: "A worn but comfortable cloak. Marks you as a wanderer.",
      stats: { maxHp: 1 },
      value: 10,
      stackable: false,
      icon: "🧥"
    },
    
    // Quest Items
    scholars_note: {
      id: "scholars_note",
      name: "Scholar's Note",
      type: "quest_item",
      description: "A note with language learning tips from Old Pierre.",
      effect: null,
      value: 0,
      stackable: false,
      icon: "📝"
    },
    festival_token: {
      id: "festival_token",
      name: "Festival Token",
      type: "quest_item",
      description: "A commemorative token from the festival.",
      effect: null,
      value: 0,
      stackable: false,
      icon: "🎪"
    },
    solstice_lantern: {
      id: "solstice_lantern",
      name: "Solstice Lantern",
      type: "accessory",
      description: "A small lantern that glows with warm light. A gift from the solstice celebration.",
      stats: { maxHp: 2 },
      value: 25,
      stackable: false,
      icon: "🏮"
    },
    herbalist_pouch: {
      id: "herbalist_pouch",
      name: "Herbalist's Pouch",
      type: "accessory",
      description: "A pouch filled with useful herbs. Given by Dave.",
      stats: { maxHp: 3 },
      value: 30,
      stackable: false,
      icon: "👝"
    }
  },

  // =====================================================
  // Factions
  // =====================================================
  factions: {
    dawnmere: {
      id: "dawnmere",
      name: "Dawnmere Settlers",
      description: "The hopeful people building a new life in this frontier town.",
      hidden: false,
      ranks: [
        { threshold: 0, title: "Stranger", perks: [] },
        { threshold: 100, title: "Visitor", perks: ["shop_discount_5"] },
        { threshold: 250, title: "Friend", perks: ["shop_discount_10", "special_quests"] },
        { threshold: 500, title: "Honored", perks: ["shop_discount_15", "unique_items"] },
        { threshold: 1000, title: "Champion of Dawnmere", perks: ["shop_discount_25", "title_display"] }
      ]
    },
    old_guard: {
      id: "old_guard",
      name: "The Old Guard",
      description: "Remnants of the original army that protected Verandum before Hermeau's rise.",
      hidden: true,
      ranks: [
        { threshold: 0, title: "Unknown", perks: [] },
        { threshold: 100, title: "Sympathizer", perks: [] },
        { threshold: 500, title: "Ally", perks: ["old_guard_quests"] },
        { threshold: 1000, title: "Brother/Sister in Arms", perks: ["special_equipment"] }
      ]
    }
  },

  // =====================================================
  // Classes
  // =====================================================
  classes: {
    scholar: {
      id: "scholar",
      name: "Scholar",
      description: "You came to study the divine light and the cathedrals.",
      startingStats: { maxHp: 80, attack: 3 },
      startingItems: ["traveler_cloak"],
      bonus: "Extra hints during lessons",
      icon: "📚"
    },
    warrior: {
      id: "warrior",
      name: "Warrior",
      description: "You seek the expertise of blade crafting and fighting skills.",
      startingStats: { maxHp: 100, attack: 5 },
      startingItems: ["basic_helm"],
      bonus: "Extra HP recovery between battles",
      icon: "⚔️"
    },
    rogue: {
      id: "rogue",
      name: "Rogue",
      description: "You wish to be one with society and learn their every move.",
      startingStats: { maxHp: 90, attack: 4 },
      startingItems: ["health_potion"],
      bonus: "Better shop prices",
      icon: "🗡️"
    }
  },

  // =====================================================
  // Level Progression
  // =====================================================
  levelTable: [
    { level: 1, xpRequired: 0, totalXp: 0 },
    { level: 2, xpRequired: 100, totalXp: 100 },
    { level: 3, xpRequired: 250, totalXp: 350 },
    { level: 4, xpRequired: 450, totalXp: 800 },
    { level: 5, xpRequired: 700, totalXp: 1500 },
    { level: 6, xpRequired: 1000, totalXp: 2500 },
    { level: 7, xpRequired: 1400, totalXp: 3900 },
    { level: 8, xpRequired: 1900, totalXp: 5800 },
    { level: 9, xpRequired: 2500, totalXp: 8300 },
    { level: 10, xpRequired: 3200, totalXp: 11500 }
  ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_DATA };
}
