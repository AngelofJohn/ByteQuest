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
      npcs: ["urma", "rega", "merchant", "baker", "sage_aldric", "old_pieron", "yris", "brother_varek", "tommen", "widow_senna", "old_jorel"],
      quests: [
        "meeting_family",
        "slime_farming",
        "bakers_dozen",
        "daily_practice",
        "weekly_challenge",
        "helping_hand",
        "secret_student",
        "festival_feast",
        // Grammar quests
        "grammar_etre_intro",
        "grammar_avoir_intro",
        "grammar_gender_intro",
        "grammar_aller_intro",
        "grammar_regular_er",
        "grammar_mixed_practice_1",
        // Filler quests - NPC mini-arcs
        "river_whispers",
        "lights_below",
        "tending_the_flame",
        "doubt_and_faith",
        "big_dreams",
        "village_threads",
        "secrets_and_stitches",
        "rounds_on_me",
        "memories_of_renque"
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
      npcs: ["dave", "lyra", "venn", "rask", "the_veiled_one"],
      quests: [
        // Main quests
        "harvest_time",
        "lyras_garden",
        "corruption_rises",
        // Filler quests - NPC mini-arcs
        "songs_of_the_road",
        "the_rhyming_trick",
        "signs_in_the_grass",
        "what_stalks_the_fields",
        "shadows_of_light"
      ],
      connectedTo: ["dawnmere", "lurenium"],
      atmosphere: "pastoral",
      music: null
    }
  },

  // =====================================================
  // NPCs - Now managed in npcs.js
  // Use getNPC(id), getNPCsInLocation(loc, state), etc.
  // =====================================================
  
  // Legacy reference - points to NPCS from npcs.js
  // This allows existing code to still use GAME_DATA.npcs
  get npcs() {
    return typeof NPCS !== 'undefined' ? NPCS : {};
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
      
      description: "Help Marta prepare bread for the upcoming festival by learning about food.",
      objectives: [
        { 
          id: "learn_food", 
          type: "lesson",
          text: "Learn food vocabulary", 
          target: null
        }
      ],
      dialogue: {
        intro: "Hello traveler! I'm trying to bake bread for the upcoming festival. To help me, you'll need to know the names of ingredients. Would you like to learn?",
        progress: "Ready to learn about food? It'll help you understand my recipes!",
        complete: "Magnifique! Now you know your food vocabulary. Here, have some bread as thanks!"
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
      giver: "old_pieron",
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
          text: "Speak with Old Pieron",
          target: null
        },
        {
          id: "special_lesson",
          type: "lesson",
          text: "Complete Pieron's special lesson",
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

      type: "standard",
      category: "commerce",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["bakers_dozen"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Help Marta prepare for the village festival by learning essential baking ingredients!",
      objectives: [
        {
          id: "learn_ingredients",
          type: "lesson",
          text: "Learn festival baking ingredients",
          target: null
        }
      ],
      dialogue: {
        intro: "The festival is coming up and I need to teach you about the essential ingredients! Flour (la farine), eggs (les œufs), butter (le beurre), sugar (le sucre), and milk (le lait) - these are the heart of any good feast!",
        progress: "Let's continue learning those ingredients!",
        complete: "Wonderful! Now you know all the baking essentials. The festival will be a success!"
      },

      rewards: {
        xp: 125,
        gold: 30,
        items: [],
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
    // FILLER QUESTS - Dawnmere NPCs
    // World-building, character development, vocab reinforcement
    // -------------------------------------------------

    // YRIS - River Watcher (dreamy, mysterious)
    river_whispers: {
      id: "river_whispers",
      name: "River Whispers",
      giver: "yris",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "yris_river",
      chainOrder: 1,
      chainNext: "lights_below",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Yris wants to teach you how to listen to the river's stories.",
      objectives: [
        {
          id: "learn_nature",
          type: "lesson",
          text: "Learn nature vocabulary with Yris",
          target: null
        },
        {
          id: "watch_river",
          type: "task",
          text: "Sit by the river and observe",
          target: null
        }
      ],
      dialogue: {
        intro: "You're new here, aren't you? The river knows. It remembers everyone who passes. Come, I'll teach you how to listen.",
        progress: "Patience. The river doesn't speak to those who rush.",
        complete: "You heard it, didn't you? That gentle voice beneath the current. Now you'll never forget."
      },

      rewards: {
        xp: 50,
        gold: 10,
        items: [],
        reputation: { dawnmere: 25 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["nature.beginner"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    lights_below: {
      id: "lights_below",
      name: "Lights Below",
      giver: "yris",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["river_whispers"],
      classRequired: null,
      reputationRequired: null,

      chainId: "yris_river",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Yris has seen strange lights beneath the water. She wants you to know the words for what dwells in darkness.",
      objectives: [
        {
          id: "learn_colors",
          type: "lesson",
          text: "Learn colors and light vocabulary",
          target: null
        },
        {
          id: "night_watch",
          type: "task",
          text: "Watch the river at night with Yris",
          target: null
        }
      ],
      dialogue: {
        intro: "The lights are getting brighter. My mother said they were spirits of the drowned. But I think... I think they're something else. Something older.",
        progress: "Stay until dark. You need to see this.",
        complete: "Beautiful and terrible, like I said. Whatever they are, they're waking up. The river is changing."
      },

      rewards: {
        xp: 75,
        gold: 15,
        items: ["river_stone"],
        reputation: { dawnmere: 50 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["colors.beginner"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // BROTHER VAREK - Shrine Keeper (devout, philosophical)
    tending_the_flame: {
      id: "tending_the_flame",
      name: "Tending the Flame",
      giver: "brother_varek",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "varek_shrine",
      chainOrder: 1,
      chainNext: "doubt_and_faith",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Brother Varek needs help with the morning shrine rituals and wants to teach you the sacred words.",
      objectives: [
        {
          id: "learn_religious",
          type: "lesson",
          text: "Learn religious and spiritual vocabulary",
          target: null
        },
        {
          id: "help_shrine",
          type: "task",
          text: "Help Varek tend the shrine flame",
          target: null
        }
      ],
      dialogue: {
        intro: "Ah, a traveler seeking the Light? Or perhaps just curious? Either way, the flame welcomes all. Help me with the morning rituals, and I'll teach you the old words.",
        progress: "The flame never sleeps. Neither does faith.",
        complete: "You have a gentle touch. The Light sees kindness, traveler, even in those who don't believe. Thank you."
      },

      rewards: {
        xp: 50,
        gold: 5,
        items: [],
        reputation: { dawnmere: 25, order_of_dawn: 25 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.greetings"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    doubt_and_faith: {
      id: "doubt_and_faith",
      name: "Doubt and Faith",
      giver: "brother_varek",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["tending_the_flame"],
      classRequired: null,
      reputationRequired: null,

      chainId: "varek_shrine",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Brother Varek shares his doubts about the Church and Hermeau. A conversation about truth and belief.",
      objectives: [
        {
          id: "learn_emotions",
          type: "lesson",
          text: "Learn words for feelings and beliefs",
          target: null
        },
        {
          id: "conversation",
          type: "interact",
          text: "Have a deep conversation with Varek",
          target: null
        }
      ],
      dialogue: {
        intro: "You've been kind to me. Perhaps... perhaps I can trust you with something. The grand temples, the gold, the power—that's not what the Light meant. Hermeau claims to serve, but true faith needs no crown.",
        progress: "Forgive me. These are dangerous thoughts.",
        complete: "Thank you for listening. Few do. Remember: the Light lives in simple flames, not golden thrones. Whatever happens... remember that."
      },

      rewards: {
        xp: 100,
        gold: 0,
        items: ["shrine_blessing"],
        reputation: { dawnmere: 50, order_of_dawn: 50 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // TOMMEN - Farmhand (eager, young, dreamer)
    big_dreams: {
      id: "big_dreams",
      name: "Big Dreams",
      giver: "tommen",
      location: "dawnmere",

      type: "side",
      category: "social",
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
      seasonalWindow: null,

      description: "Tommen wants to hear about the world beyond Dawnmere and practice his words with you.",
      objectives: [
        {
          id: "learn_places",
          type: "lesson",
          text: "Learn place and direction vocabulary",
          target: null
        },
        {
          id: "share_stories",
          type: "interact",
          text: "Share stories with Tommen",
          target: null
        }
      ],
      dialogue: {
        intro: "You've traveled, haven't you? What's it like out there? The desert? The mountains? I'm going to leave someday. I just need to learn enough words first!",
        progress: "Tell me more! What about Lurenium? Is it really made of gold?",
        complete: "That sounds amazing! I've been practicing the words you taught me. Someday I'll see it all for myself. Thanks for not laughing at my dreams."
      },

      rewards: {
        xp: 40,
        gold: 5,
        items: [],
        reputation: { dawnmere: 20 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // WIDOW SENNA - Seamstress (gossipy, observant)
    village_threads: {
      id: "village_threads",
      name: "Village Threads",
      giver: "widow_senna",
      location: "dawnmere",

      type: "side",
      category: "social",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "senna_gossip",
      chainOrder: 1,
      chainNext: "secrets_and_stitches",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Widow Senna offers to mend your clothes in exchange for a listening ear.",
      objectives: [
        {
          id: "learn_clothing",
          type: "lesson",
          text: "Learn clothing and fabric vocabulary",
          target: null
        },
        {
          id: "listen_gossip",
          type: "task",
          text: "Listen to Senna's village gossip",
          target: null
        }
      ],
      dialogue: {
        intro: "Those clothes! Traveler, you can't walk around like that. Sit, sit! I'll mend while we talk. You can tell me everything about yourself... and I'll tell you everything about everyone else.",
        progress: "Hold still! And did you hear about the merchant? Strange hours he keeps...",
        complete: "There! Good as new. Now you know everyone's business, and I know yours. That's fair, isn't it? Come back anytime, dear."
      },

      rewards: {
        xp: 50,
        gold: 10,
        items: ["mended_clothes"],
        reputation: { dawnmere: 30 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.greetings"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    secrets_and_stitches: {
      id: "secrets_and_stitches",
      name: "Secrets and Stitches",
      giver: "widow_senna",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["village_threads"],
      classRequired: null,
      reputationRequired: null,

      chainId: "senna_gossip",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Senna has noticed things that don't add up. She wants someone trustworthy to listen.",
      objectives: [
        {
          id: "learn_describing",
          type: "lesson",
          text: "Learn descriptive vocabulary",
          target: null
        },
        {
          id: "hear_concerns",
          type: "interact",
          text: "Listen to Senna's concerns",
          target: null
        }
      ],
      dialogue: {
        intro: "You came back. Good. I need to tell someone. That merchant—he's not just traveling through. And Marta's extra bread? She's been leaving it at the edge of the forest. Someone's hiding out there. Someone she doesn't want us to know about.",
        progress: "Promise you won't tell anyone I told you.",
        complete: "You believe me? Good. Something's wrong in Dawnmere. I can feel it in my stitches. Watch yourself, dear. And watch the others too."
      },

      rewards: {
        xp: 75,
        gold: 15,
        items: [],
        reputation: { dawnmere: 50 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // OLD JOREL - Village Drunk (melancholy, hidden depths)
    rounds_on_me: {
      id: "rounds_on_me",
      name: "Round's On Me",
      giver: "old_jorel",
      location: "dawnmere",

      type: "side",
      category: "social",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "jorel_past",
      chainOrder: 1,
      chainNext: "memories_of_renque",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Old Jorel offers to buy you a drink if you'll keep him company.",
      objectives: [
        {
          id: "learn_food",
          type: "lesson",
          text: "Learn food and drink vocabulary",
          target: null
        },
        {
          id: "drink_together",
          type: "interact",
          text: "Share a drink with Jorel",
          target: null
        }
      ],
      dialogue: {
        intro: "*hic* A new face! Perfect. Everyone else here... they've heard my stories too many times. Buy you a drink? Actually... let me buy you a drink. I insist.",
        progress: "Don't leave yet. The night's still young... youngish.",
        complete: "Hah! You're a good listener. Most people just see the old drunk. But you... you look at people, don't you? Like you're actually seeing them. That's rare. That's good."
      },

      rewards: {
        xp: 40,
        gold: 0,
        items: ["jorels_flask"],
        reputation: { dawnmere: 20 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["food.beginner"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    memories_of_renque: {
      id: "memories_of_renque",
      name: "Memories of Renque",
      giver: "old_jorel",
      location: "dawnmere",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["rounds_on_me"],
      classRequired: null,
      reputationRequired: null,

      chainId: "jorel_past",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Jorel is ready to talk about Renque and what really happened there.",
      objectives: [
        {
          id: "learn_emotions",
          type: "lesson",
          text: "Learn words for emotions and memories",
          target: null
        },
        {
          id: "listen_truth",
          type: "interact",
          text: "Listen to Jorel's story",
          target: null
        }
      ],
      dialogue: {
        intro: "I was at Renque, you know. Before the corruption took it. Everyone says Hermeau saved us. *laughs bitterly* Saved us. I saw what he did. What he really did. The corruption didn't start there. It started in the hearts of men who wanted power.",
        progress: "Are you sure you want to hear this? Some truths... they change you.",
        complete: "Now you know. The hero-king... he's no hero. He's just better at hiding what he is. Be careful who you trust out there. And be careful what you become."
      },

      rewards: {
        xp: 100,
        gold: 0,
        items: ["renque_medal"],
        reputation: { dawnmere: 75 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // HAARI FIELDS - Main Quests
    // -------------------------------------------------

    // DAVE - Head Horticulturist (intro quest)
    harvest_time: {
      id: "harvest_time",
      name: "Harvest Time",
      giver: "dave",
      location: "haari_fields",

      type: "main",
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
      cooldown: null,
      seasonalWindow: null,

      description: "Dave needs help with the harvest. Learn about crops and farming while lending a hand.",
      objectives: [
        {
          id: "learn_crops",
          type: "lesson",
          text: "Learn crop vocabulary from Dave",
          target: 1
        },
        {
          id: "help_harvest",
          type: "interact",
          text: "Help gather the ripe crops",
          target: 1
        },
        {
          id: "deliver_lyra",
          type: "interact",
          text: "Deliver samples to Lyra",
          target: 1
        }
      ],
      dialogue: {
        intro: "Ah, a traveler from Dawnmere! The harvest waits for no one. Would you help us gather crops? I'll teach you what each one is called.",
        progress: "The fields are generous this season. Keep gathering!",
        complete: "Excellent work! You learn quickly. Lyra will be pleased with these samples. The Haari Fields welcome you, friend."
      },

      rewards: {
        xp: 100,
        gold: 25,
        items: ["fresh_vegetables"],
        reputation: { haari_fields: 50 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["agriculture.crops"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // LYRA - Apprentice Herbalist (follow-up quest)
    lyras_garden: {
      id: "lyras_garden",
      name: "Lyra's Garden",
      giver: "lyra",
      location: "haari_fields",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["harvest_time"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Lyra wants to teach you about the herbs and plants she cultivates.",
      objectives: [
        {
          id: "learn_herbs",
          type: "lesson",
          text: "Learn herb vocabulary from Lyra",
          target: 1
        },
        {
          id: "identify_plants",
          type: "lesson",
          text: "Identify plants in her garden",
          target: 1
        }
      ],
      dialogue: {
        intro: "Dave said you're a quick learner! Would you like to see my garden? I grow herbs for medicine and cooking.",
        progress: "Each plant has its purpose. Some heal, some flavor food, and some... well, Dave says some are special.",
        complete: "You have a good memory! Come back anytime—there's always more to learn about nature."
      },

      rewards: {
        xp: 80,
        gold: 20,
        items: ["herb_bundle"],
        reputation: { haari_fields: 30 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["agriculture.herbs"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // FILLER QUESTS - Haari Fields NPCs
    // -------------------------------------------------

    // VENN - Wandering Bard (whimsical, helpful)
    songs_of_the_road: {
      id: "songs_of_the_road",
      name: "Songs of the Road",
      giver: "venn",
      location: "haari_fields",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: null,

      chainId: "venn_songs",
      chainOrder: 1,
      chainNext: "the_rhyming_trick",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Venn the bard offers to teach you vocabulary through song and rhyme.",
      objectives: [
        {
          id: "learn_music",
          type: "lesson",
          text: "Learn music and sound vocabulary",
          target: null
        },
        {
          id: "sing_along",
          type: "task",
          text: "Learn Venn's memory song",
          target: null
        }
      ],
      dialogue: {
        intro: "A fellow wanderer! Words are like seeds—plant them with care, and they'll grow into something beautiful. Let me teach you a trick I learned on the road.",
        progress: "♪ Once more, from the top! ♪",
        complete: "You've got a good ear! Now those words will never leave you. Music is the oldest magic, you know. Older than the Light, older than the corruption."
      },

      rewards: {
        xp: 60,
        gold: 15,
        items: [],
        reputation: { haari_fields: 30 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.greetings"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    the_rhyming_trick: {
      id: "the_rhyming_trick",
      name: "The Rhyming Trick",
      giver: "venn",
      location: "haari_fields",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 3,
      prerequisites: ["songs_of_the_road"],
      classRequired: null,
      reputationRequired: null,

      chainId: "venn_songs",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Venn shares his secret technique for remembering difficult words.",
      objectives: [
        {
          id: "advanced_vocab",
          type: "lesson",
          text: "Learn advanced vocabulary with Venn's method",
          target: null
        },
        {
          id: "create_rhyme",
          type: "task",
          text: "Create your own memory rhyme",
          target: null
        }
      ],
      dialogue: {
        intro: "Ready for the advanced technique? The trick isn't just rhyming—it's making the words mean something to YOU. A personal connection beats repetition every time.",
        progress: "Think about what these words remind you of...",
        complete: "Now you've got it! You're not just memorizing anymore—you're making memories. Those words are part of your story now. Safe travels, friend."
      },

      rewards: {
        xp: 100,
        gold: 25,
        items: ["bards_token"],
        reputation: { haari_fields: 50 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // RASK - Tracker (wary, observant)
    signs_in_the_grass: {
      id: "signs_in_the_grass",
      name: "Signs in the Grass",
      giver: "rask",
      location: "haari_fields",

      type: "side",
      category: "exploration",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: null,

      chainId: "rask_tracking",
      chainOrder: 1,
      chainNext: "what_stalks_the_fields",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Rask wants to teach you how to read the signs of danger in the wilderness.",
      objectives: [
        {
          id: "learn_animals",
          type: "lesson",
          text: "Learn animal and tracking vocabulary",
          target: null
        },
        {
          id: "find_tracks",
          type: "task",
          text: "Find three different types of tracks",
          target: 3
        }
      ],
      dialogue: {
        intro: "Keep your voice down. Something's been stalking these fields, and you need to know the signs. The boars aren't the problem—it's what's driving them south.",
        progress: "Look closer. The grass doesn't lie.",
        complete: "Good eyes. You'll survive out here now. But remember what I said—those tracks I showed you? The wrong ones? If you see those... run. Don't fight. Run."
      },

      rewards: {
        xp: 75,
        gold: 20,
        items: [],
        reputation: { haari_fields: 40 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["nature.beginner"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    what_stalks_the_fields: {
      id: "what_stalks_the_fields",
      name: "What Stalks the Fields",
      giver: "rask",
      location: "haari_fields",

      type: "side",
      category: "lore",
      status: "locked",

      levelRequired: 3,
      prerequisites: ["signs_in_the_grass"],
      classRequired: null,
      reputationRequired: null,

      chainId: "rask_tracking",
      chainOrder: 2,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Rask has found something troubling and needs a second witness.",
      objectives: [
        {
          id: "learn_danger",
          type: "lesson",
          text: "Learn words for danger and warning",
          target: null
        },
        {
          id: "witness_evidence",
          type: "task",
          text: "Examine what Rask has found",
          target: null
        }
      ],
      dialogue: {
        intro: "I found something. Something bad. I need someone else to see it—to know I'm not going mad. The corruption... it's not just in Renque anymore. It's spreading. Slowly, but spreading.",
        progress: "This way. Stay quiet.",
        complete: "You saw it too. Good. I'm not mad. The corruption spreads like rot through wood—slow, but certain. We need to warn someone. But who would believe us? Who would even listen?"
      },

      rewards: {
        xp: 100,
        gold: 0,
        items: ["corrupted_sample"],
        reputation: { haari_fields: 75 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["nature.beginner"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // THE VEILED ONE - Hermit (cryptic, hidden)
    // Only appears when player reaches level 5
    shadows_of_light: {
      id: "shadows_of_light",
      name: "Shadows of Light",
      giver: "the_veiled_one",
      location: "haari_fields",

      type: "hidden",
      category: "lore",
      status: "locked",

      levelRequired: 5,
      prerequisites: [],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "A mysterious hermit has appeared to those who can see. They speak of truths hidden in plain sight.",
      objectives: [
        {
          id: "learn_abstract",
          type: "lesson",
          text: "Learn abstract and philosophical vocabulary",
          target: null
        },
        {
          id: "hear_truth",
          type: "interact",
          text: "Listen to the Veiled One's revelation",
          target: null
        }
      ],
      dialogue: {
        intro: "You see me now? Interesting. Most cannot. Perhaps you're ready to see other things too. The Light casts shadows—remember that. Everything casts shadows.",
        progress: "Patience. Truth is not for the impatient.",
        complete: "The corruption is not what they tell you. It is older. Hungrier. Hermeau knows—why do you think he fears it so? Now you know too. Use this knowledge wisely. Or foolishly. The choice, as always, is yours."
      },

      rewards: {
        xp: 150,
        gold: 0,
        items: ["veiled_insight"],
        reputation: {}
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: {
        wrongAnswers: null,
        lessonsCompleted: null,
        npcsMet: null,
        locationDiscovered: null,
        itemFound: null,
        timePlayedMinutes: null,
        levelReached: 5
      }
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

    // Tiered Health Potions (craftable via Alchemy)
    health_potion_t2: {
      id: "health_potion_t2",
      name: "Health Potion",
      type: "consumable",
      description: "A stronger restorative. Restores 50 HP.",
      effect: { hp: 50 },
      value: 40,
      stackable: true,
      icon: "🧪"
    },
    health_potion_t3: {
      id: "health_potion_t3",
      name: "Greater Health Potion",
      type: "consumable",
      description: "A powerful restorative. Restores 100 HP.",
      effect: { hp: 100 },
      value: 80,
      stackable: true,
      icon: "🧪"
    },

    // =====================================================
    // Cognitive Potions (Alchemy - Linguistic Essence)
    // =====================================================
    clarity_draught: {
      id: "clarity_draught",
      name: "Clarity Draught",
      type: "consumable",
      category: "cognitive",
      description: "Sharpens the mind for learning. +10% XP for 5 lessons.",
      effect: { xpMultiplier: 1.1, duration: 5 },
      value: 25,
      stackable: true,
      icon: "🔮"
    },
    memory_tonic: {
      id: "memory_tonic",
      name: "Memory Tonic",
      type: "consumable",
      category: "cognitive",
      description: "Soothes the sting of mistakes. -50% wrong answer penalty for 5 lessons.",
      effect: { penaltyReduction: 0.5, duration: 5 },
      value: 35,
      stackable: true,
      icon: "🧠"
    },
    focus_elixir: {
      id: "focus_elixir",
      name: "Focus Elixir",
      type: "consumable",
      category: "cognitive",
      description: "Grants additional clarity. +1 hint per lesson for 3 lessons.",
      effect: { bonusHints: 1, duration: 3 },
      value: 50,
      stackable: true,
      icon: "🎯"
    },
    scholars_brew: {
      id: "scholars_brew",
      name: "Scholar's Brew",
      type: "consumable",
      category: "cognitive",
      description: "Accelerates mastery progress. 2x mastery for next 10 words.",
      effect: { masteryBoost: 2, duration: 10 },
      value: 75,
      stackable: true,
      icon: "📚"
    },
    insight_potion: {
      id: "insight_potion",
      name: "Insight Potion",
      type: "consumable",
      category: "cognitive",
      description: "Reveals the optimal path. Highlights correct answer for 1 lesson.",
      effect: { revealAnswer: true, duration: 1 },
      value: 100,
      stackable: true,
      icon: "👁️"
    },
    linguists_draught: {
      id: "linguists_draught",
      name: "Linguist's Draught",
      type: "consumable",
      category: "cognitive",
      description: "A masterful blend. +25% XP for 10 lessons.",
      effect: { xpMultiplier: 1.25, duration: 10 },
      value: 120,
      stackable: true,
      icon: "📖"
    },
    retention_brew: {
      id: "retention_brew",
      name: "Retention Brew",
      type: "consumable",
      category: "cognitive",
      description: "Preserves knowledge. Words do not decay for 7 days.",
      effect: { preventDecay: true, duration: 7 },
      value: 150,
      stackable: true,
      icon: "🔒"
    },
    polyglots_elixir: {
      id: "polyglots_elixir",
      name: "Polyglot's Elixir",
      type: "consumable",
      category: "cognitive",
      description: "Reveals word origins. Hints show etymology for 5 lessons.",
      effect: { showEtymology: true, duration: 5 },
      value: 175,
      stackable: true,
      icon: "🌍"
    },
    comprehension_tonic: {
      id: "comprehension_tonic",
      name: "Comprehension Tonic",
      type: "consumable",
      category: "cognitive",
      description: "Instant understanding. French text shows inline glosses for 5 lessons.",
      effect: { inlineGloss: true, duration: 5 },
      value: 200,
      stackable: true,
      icon: "💡"
    },

    // =====================================================
    // Resources - Gathered from minigames
    // =====================================================

    // Mining Resources
    copper_chunk: {
      id: "copper_chunk",
      name: "Copper Chunk",
      type: "resource",
      category: "ore",
      description: "A rough chunk of copper ore. Used in basic crafting.",
      value: 2,
      stackable: true,
      icon: "🪨"
    },
    iron_ore: {
      id: "iron_ore",
      name: "Iron Ore",
      type: "resource",
      category: "ore",
      description: "Quality iron ore. Essential for metalworking.",
      value: 5,
      stackable: true,
      icon: "\u26CF\uFE0F"
    },
    silver_vein: {
      id: "silver_vein",
      name: "Silver Vein",
      type: "resource",
      category: "ore",
      description: "Precious silver ore. Highly valuable.",
      value: 12,
      stackable: true,
      icon: "💎"
    },

    // Woodcutting Resources
    pine_log: {
      id: "pine_log",
      name: "Pine Log",
      type: "resource",
      category: "wood",
      description: "A sturdy pine log. Good for basic construction.",
      value: 2,
      stackable: true,
      icon: "🪵"
    },
    oak_timber: {
      id: "oak_timber",
      name: "Oak Timber",
      type: "resource",
      category: "wood",
      description: "Strong oak wood. Preferred by craftsmen.",
      value: 5,
      stackable: true,
      icon: "🪵"
    },
    ironwood: {
      id: "ironwood",
      name: "Ironwood",
      type: "resource",
      category: "wood",
      description: "Extremely dense wood. Almost as hard as metal.",
      value: 12,
      stackable: true,
      icon: "🪵"
    },

    // Hunting Resources
    boar_hide: {
      id: "boar_hide",
      name: "Boar Hide",
      type: "resource",
      category: "hide",
      description: "Tough boar leather. Used for basic armor.",
      value: 3,
      stackable: true,
      icon: "🐗"
    },
    wolf_pelt: {
      id: "wolf_pelt",
      name: "Wolf Pelt",
      type: "resource",
      category: "hide",
      description: "A warm wolf pelt. Prized by tailors.",
      value: 7,
      stackable: true,
      icon: "🐺"
    },
    bear_fur: {
      id: "bear_fur",
      name: "Bear Fur",
      type: "resource",
      category: "hide",
      description: "Luxurious bear fur. The finest material.",
      value: 15,
      stackable: true,
      icon: "🐻"
    },

    // Herbalism Resources
    meadow_leaf: {
      id: "meadow_leaf",
      name: "Meadow Leaf",
      type: "resource",
      category: "herb",
      description: "A common healing herb found in meadows.",
      value: 2,
      stackable: true,
      icon: "🌿"
    },
    sunpetal: {
      id: "sunpetal",
      name: "Sunpetal",
      type: "resource",
      category: "herb",
      description: "Golden petals that bloom at noon. Medicinal properties.",
      value: 6,
      stackable: true,
      icon: "🌻"
    },
    moonblossom: {
      id: "moonblossom",
      name: "Moonblossom",
      type: "resource",
      category: "herb",
      description: "A rare flower that blooms under moonlight. Magical.",
      value: 14,
      stackable: true,
      icon: "🌸"
    },

    // Linguistic Essence (from review sessions)
    faded_essence: {
      id: "faded_essence",
      name: "Faded Essence",
      type: "resource",
      category: "essence",
      description: "A dim wisp of linguistic energy. Basic essence from simple reviews.",
      value: 5,
      stackable: true,
      icon: "💫"
    },
    clear_essence: {
      id: "clear_essence",
      name: "Clear Essence",
      type: "resource",
      category: "essence",
      description: "A bright mote of comprehension. Generated from mixed vocabulary reviews.",
      value: 12,
      stackable: true,
      icon: "✨"
    },
    vivid_essence: {
      id: "vivid_essence",
      name: "Vivid Essence",
      type: "resource",
      category: "essence",
      description: "A radiant spark of fluency. Earned through challenging reviews.",
      value: 25,
      stackable: true,
      icon: "🌟"
    },
    brilliant_essence: {
      id: "brilliant_essence",
      name: "Brilliant Essence",
      type: "resource",
      category: "essence",
      description: "A dazzling core of mastery. The reward of true linguistic dedication.",
      value: 50,
      stackable: true,
      icon: "💎"
    },

    // Crafting Materials
    empty_bottle: {
      id: "empty_bottle",
      name: "Empty Bottle",
      type: "resource",
      category: "crafting",
      description: "A clean glass bottle. Used for brewing potions.",
      value: 2,
      stackable: true,
      icon: "🫙"
    },

    // Fishing Resources
    river_perch: {
      id: "river_perch",
      name: "River Perch",
      type: "resource",
      category: "fish",
      description: "A common freshwater fish. Tasty when cooked.",
      value: 2,
      stackable: true,
      icon: "🐟"
    },
    lake_trout: {
      id: "lake_trout",
      name: "Lake Trout",
      type: "resource",
      category: "fish",
      description: "A prized catch from deep lake waters.",
      value: 6,
      stackable: true,
      icon: "🐟"
    },
    sea_bass: {
      id: "sea_bass",
      name: "Sea Bass",
      type: "resource",
      category: "fish",
      description: "A large saltwater fish. A chef's delight.",
      value: 14,
      stackable: true,
      icon: "🐠"
    },

    // =====================================================
    // Equipment - Helms
    // =====================================================
    basic_helm: {
      id: "basic_helm",
      name: "Standard Helm",
      type: "helm",
      description: "A simple iron helm. +1 Stamina",
      stats: { stamina: 1 },
      value: 20,
      stackable: false,
      icon: "🪖"
    },
    scholars_cap: {
      id: "scholars_cap",
      name: "Scholar's Cap",
      type: "helm",
      description: "A cap worn by learned folk. +1 Knowledge, +1 Insight",
      stats: { knowledge: 1, insight: 1 },
      value: 35,
      stackable: false,
      icon: "🎓"
    },
    
    // Equipment - Weapons
    broken_shovel: {
      id: "broken_shovel",
      name: "Broken Shovel",
      type: "weapon",
      description: "A rusted shovel with a broken edge. +1 Strength",
      stats: { strength: 1 },
      value: 5,
      stackable: false,
      icon: "🔧"
    },
    wooden_sword: {
      id: "wooden_sword",
      name: "Wooden Sword",
      type: "weapon",
      description: "A practice sword. +2 Strength",
      stats: { strength: 2 },
      value: 15,
      stackable: false,
      icon: "🗡️"
    },
    
    // Equipment - Armor
    leather_vest: {
      id: "leather_vest",
      name: "Leather Vest",
      type: "armor",
      description: "Basic leather protection. +2 Stamina",
      stats: { stamina: 2 },
      value: 30,
      stackable: false,
      icon: "🦺"
    },
    
    // Equipment - Accessories
    traveler_cloak: {
      id: "traveler_cloak",
      name: "Traveler's Cloak",
      type: "accessory",
      description: "A worn but comfortable cloak. +1 Agility",
      stats: { agility: 1 },
      value: 10,
      stackable: false,
      icon: "🧥"
    },
    lucky_charm: {
      id: "lucky_charm",
      name: "Lucky Charm",
      type: "accessory",
      description: "A small trinket that brings good fortune. +2 Luck",
      stats: { luck: 2 },
      value: 25,
      stackable: false,
      icon: "🍀"
    },
    prayer_beads: {
      id: "prayer_beads",
      name: "Prayer Beads",
      type: "accessory",
      description: "Blessed beads from the church. +2 Devotion",
      stats: { devotion: 2 },
      value: 25,
      stackable: false,
      icon: "📿"
    },
    
    // Equipment - Rings
    ring_of_insight: {
      id: "ring_of_insight",
      name: "Ring of Insight",
      type: "ring",
      description: "A ring that sharpens the mind. +2 Insight",
      stats: { insight: 2 },
      value: 40,
      stackable: false,
      icon: "💍"
    },
    ring_of_knowledge: {
      id: "ring_of_knowledge",
      name: "Ring of Knowledge",
      type: "ring",
      description: "Ancient ring inscribed with runes. +2 Knowledge",
      stats: { knowledge: 2 },
      value: 40,
      stackable: false,
      icon: "💎"
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
      description: "A small lantern that glows with warm light. +1 Insight, +1 Devotion",
      stats: { insight: 1, devotion: 1 },
      value: 25,
      stackable: false,
      icon: "🏮"
    },
    herbalist_pouch: {
      id: "herbalist_pouch",
      name: "Herbalist's Pouch",
      type: "accessory",
      description: "A pouch filled with useful herbs. +2 Knowledge, +1 Stamina",
      stats: { knowledge: 2, stamina: 1 },
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
    },
    order_of_dawn: {
      id: "order_of_dawn",
      name: "Order of the Dawn",
      description: "A religious order devoted to the Light. They maintain shrines and tend sacred flames across the land.",
      hidden: false,
      ranks: [
        { threshold: 0, title: "Outsider", perks: [] },
        { threshold: 50, title: "Pilgrim", perks: ["shrine_blessings"] },
        { threshold: 150, title: "Faithful", perks: ["light_prayers", "shop_discount_5"] },
        { threshold: 300, title: "Devotee", perks: ["sacred_knowledge", "special_quests"] },
        { threshold: 500, title: "Blessed of the Light", perks: ["divine_favor", "title_display"] }
      ]
    },
    horticulturists: {
      id: "horticulturists",
      name: "The Horticulturists",
      description: "A secretive group who study the corruption and claim to understand its true nature. Led by the enigmatic Dave.",
      hidden: true,
      ranks: [
        { threshold: 0, title: "Uninitiated", perks: [] },
        { threshold: 100, title: "Seedling", perks: ["corruption_knowledge"] },
        { threshold: 300, title: "Cultivator", perks: ["special_quests", "herb_gathering"] },
        { threshold: 600, title: "Gardener", perks: ["dark_recipes", "unique_items"] },
        { threshold: 1000, title: "Master Horticulturist", perks: ["dave_secrets", "title_display"] }
      ]
    },
    haari_fields: {
      id: "haari_fields",
      name: "Haari Fields Farmers",
      description: "The hardworking farmers and settlers of the golden Haari Fields. They value honest labor and community.",
      hidden: false,
      ranks: [
        { threshold: 0, title: "Stranger", perks: [] },
        { threshold: 50, title: "Visitor", perks: ["basic_trade"] },
        { threshold: 150, title: "Farmhand", perks: ["shop_discount_5", "harvest_bonus"] },
        { threshold: 300, title: "Neighbor", perks: ["special_quests", "seed_access"] },
        { threshold: 500, title: "Friend of the Fields", perks: ["advanced_recipes", "title_display"] }
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
      startingItems: ["scholars_cap"],
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
