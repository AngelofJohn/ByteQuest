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
      levelRequired: 1,
      discovered: true,
      hasBossExam: true,  // Zone mastery test
      npcs: ["urma", "rega", "merchant", "baker", "brother_varek", "tommen", "old_jorel", "settlers_rep"],
      hotspots: [
        {
          id: "shrine_alcove",
          name: "Dusty Alcove",
          description: "A small alcove behind the shrine's altar, barely visible in the flickering candlelight.",
          searchText: "You carefully reach into the alcove and find something wrapped in old cloth...",
          artifactId: "faith_forbidden_text",
          requiredRep: { faction: "order_of_dawn", amount: 100 }
        },
        {
          id: "old_bookshelf",
          name: "Weathered Bookshelf",
          description: "An old bookshelf in the village hall, its bottom shelf warped from years of river flooding.",
          searchText: "Behind the warped wood, you discover papers that were hidden long ago...",
          artifactId: "exile_rewritten_history",
          requiredRep: null
        },
        {
          id: "riverside_debris",
          name: "River Debris",
          description: "A pile of debris washed up by the river, tangled with old roots and forgotten things.",
          searchText: "Digging through the debris, your fingers close around something that doesn't belong here...",
          artifactId: "dran_hermeau_journal",
          requiredRep: null
        }
      ],
      quests: [
        "meeting_family",
        "choose_your_path",
        "slime_farming",
        "bakers_dozen",
        "daily_practice",
        "weekly_challenge",
        "herb_delivery",
        "festival_feast",
        // NPC mini-arcs
        "tending_the_flame",
        "doubt_and_faith",
        "big_dreams",
        "rounds_on_me",
        "memories_of_renque",
        // Gathering skill quests
        "learn_woodcutting",
        "learn_fishing",
        "learn_hunting",
        // System tutorial quests
        "first_purchase",
        "gear_up",
        "community_spirit"
      ],
      connections: ["haari_fields"],
      atmosphere: "hopeful",
      music: null
    },
    haari_fields: {
      id: "haari_fields",
      name: "The Haari Fields",
      description: "Golden wheat-colored fields stretch north toward Lurenium. Boar-like creatures roam the wild edges.",
      type: "wilderness",
      levelRequired: 2,
      discovered: false,
      hasBossExam: true,  // Zone mastery test
      npcs: ["dave", "lyra", "venn", "rask", "the_veiled_one", "sage_aldric"],
      hotspots: [
        {
          id: "old_battlefield",
          name: "Overgrown Battlefield",
          description: "The grass grows thick here, but underneath... bones. And other things left behind.",
          searchText: "Your foot catches on something half-buried. A soldier's satchel, the leather cracked with age...",
          artifactId: "war_soldiers_letter",
          requiredRep: null
        },
        {
          id: "abandoned_cart",
          name: "Abandoned Merchant Cart",
          description: "A cart that never made it to market. Weather-beaten but not empty.",
          searchText: "Hidden in a false bottom, you find documents that someone wanted to smuggle out...",
          artifactId: "golden_trade_manifest",
          requiredRep: null
        },
        {
          id: "ancient_stones",
          name: "Standing Stones",
          description: "Ancient stones that predate the fields. Farmers avoid them, but you notice markings...",
          searchText: "Beneath one tilted stone, protected from centuries of weather, something waits...",
          artifactId: "silence_bone_carving",
          requiredRep: null
        },
        {
          id: "blighted_grove",
          name: "Blighted Grove",
          description: "A patch of dead trees and blackened plants. The corruption is visible here.",
          searchText: "The plants here are twisted and dark. You carefully collect samples of the corrupted vegetation...",
          itemReward: { id: "corrupted_sample", count: 2 },
          repeatable: true,
          cooldown: 300000,
          requiredQuest: "corruption_rises"
        }
      ],
      quests: [
        // Main quests
        "harvest_time",
        "lyras_garden",
        "secrets_of_the_soil",  // Alchemy unlock quest
        "corruption_rises",
        // Grammar quests (Sage Aldric)
        "grammar_etre_intro",
        "grammar_avoir_intro",
        "grammar_gender_intro",
        "grammar_aller_intro",
        "grammar_regular_er",
        "grammar_mixed_practice_1",
        // Filler quests - NPC mini-arcs
        "songs_of_the_road",
        "the_rhyming_trick",
        "signs_in_the_grass",
        "what_stalks_the_fields",
        "shadows_of_light",
        // System tutorial quests
        "first_brew"
      ],
      connections: ["dawnmere", "lurenium"],
      atmosphere: "pastoral",
      music: null
    },
    lurenium: {
      id: "lurenium",
      name: "Lurenium",
      description: "An ancient city of gold, built before the time of the current world. Its citizens preserve foundations they no longer understand.",
      type: "city",
      levelRequired: 10,
      discovered: false,
      hasBossExam: true,
      npcs: ["magistrate_corinne", "archivist_thelon", "captain_varro", "merchant_liselle", "brother_cassius", "old_jorel"],
      hotspots: [
        {
          id: "ancient_foundation",
          name: "Ancient Foundation Stone",
          description: "A massive stone at the base of the city walls, covered in symbols that predate Lurenium itself.",
          searchText: "You trace the weathered symbols with your fingers. One stone is loose... behind it, something glints in the darkness.",
          artifactId: "ancient_seal_fragment",
          requiredRep: null
        },
        {
          id: "archive_vault",
          name: "Sealed Archive Vault",
          description: "A section of the archives that hasn't been opened in generations. The archivist pretends it doesn't exist.",
          searchText: "The old lock crumbles at your touch. Inside, documents that were never meant to be forgotten...",
          artifactId: "founding_charter_fragment",
          requiredRep: { faction: "see_of_lurenium", amount: 150 }
        },
        {
          id: "royal_memorial",
          name: "Forgotten Royal Memorial",
          description: "A small memorial in a neglected corner of the palace district. The inscription has been deliberately obscured.",
          searchText: "Behind the memorial's false back, hidden for centuries, you find what the first kings wanted their heirs to remember...",
          artifactId: "founding_first_kings_decree",
          requiredRep: { faction: "old_guard", amount: 200 }
        }
      ],
      quests: [
        "archives_of_lurenium",
        "words_of_law",
        "songs_of_old",
        "ledgers_of_the_guild",
        "orders_from_above",
        "hymns_of_light"
      ],
      connections: ["haari_fields"],
      atmosphere: "ancient",
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
          id: "learn_cognates",
          type: "lesson",
          text: "Discover words you already know",
          lessonId: "lesson_1",
          target: null
        },
        {
          id: "learn_greetings",
          type: "lesson",
          text: "Learn essential greetings",
          lessonId: "lesson_8",
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
        intro: "Bonjour, traveler! Before you meet everyone, let me share a secret: you already know more French than you think! Words like 'table', 'animal', 'restaurant' - they're the same! Let me show you.",
        progress: "Learning that French and English share so many words? Now learn to say hello!",
        complete: "Wonderful! You already knew dozens of French words and didn't even realize it. Now go meet the others!"
      },
      
      // Rewards
      rewards: {
        xp: 70,  // was 100
        gold: 15,
        items: ["traveler_cloak"],
        reputation: { dawnmere_settlers: 50 }
      },
      repeatRewardMultiplier: null, // Not repeatable
      
      // Learning content
      vocabulary: ["basics.greetings", "basics.introductions", "family.beginner"],
      
      // Flags
      cannotAbandon: true,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // CLASS SELECTION - Choose your Order
    // -------------------------------------------------
    choose_your_path: {
      id: "choose_your_path",
      name: "Choose Your Path",
      giver: "brother_varek",
      location: "dawnmere",

      type: "main",
      category: "social",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "cleric_origin",
      chainOrder: 1,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Brother Varek senses your calling and offers guidance. It is time to choose which Order you will serve.",
      objectives: [
        {
          id: "speak_varek",
          type: "interact",
          text: "Speak with Brother Varek about your path",
          target: "brother_varek"
        },
        {
          id: "choose_order",
          type: "special",
          text: "Choose your Order",
          target: "order_selection"
        }
      ],
      dialogue: {
        intro: "Ah, a fellow servant of the Light! I sensed your arrival. You carry the mark of faith, but your path is not yet set. The Light manifests in many ways—through Knowledge, Protection, or Shadow. Come, let us discover which calling speaks to your soul.",
        progress: "Take your time with this decision. Your Order will shape your journey in this land.",
        complete: "Your path is chosen. May the Light guide your steps, Brother/Sister. Your Order welcomes you."
      },

      rewards: {
        xp: 50,
        gold: 0,
        items: [],
        reputation: { order_of_dawn: 25 }
      },
      repeatRewardMultiplier: null,

      vocabulary: null, // No lesson

      cannotAbandon: true,
      hiddenTrigger: null,

      // Special flag for class selection quest
      isClassSelection: true
    },

    slime_farming: {
      id: "slime_farming",
      name: "Situation at the Farm",
      giver: "rega",
      location: "dawnmere",

      type: "main",
      category: "lesson",
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

      description: "Rega is worried about strange creatures near his farm. Help calm his nerves by learning useful vocabulary.",
      objectives: [
        {
          id: "learn_tion_pattern",
          type: "lesson",
          text: "Learn the -tion pattern",
          lessonId: "lesson_2",
          target: null
        },
        {
          id: "return_rega",
          type: "interact",
          text: "Report back to Rega",
          target: "rega"
        }
      ],
      dialogue: {
        intro: "Strange situation at my farm! I need information about what's happening. But first, let me share an observation: words ending in -tion are identical in French. Nation, situation, action, solution... Pay attention to this pattern!",
        progress: "Learning those -tion words? Remember: they need no translation!",
        complete: "Thanks for listening! Your dedication deserves compensation. That's another -tion word you now know!"
      },
      
      rewards: {
        xp: 105,  // was 150
        gold: 25,
        items: ["broken_shovel"],
        reputation: { dawnmere_settlers: 75 }
      },
      repeatRewardMultiplier: null,
      
      vocabulary: ["farming.beginner", "farming.creatures", "farming.phrases"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // SIDE QUESTS - Optional, One-time
    // -------------------------------------------------

    // Crafting-gated quest - requires crafted copper_dagger
    farm_defense: {
      id: "farm_defense",
      name: "Farm Defense",
      giver: "rega",
      location: "dawnmere",

      type: "side",
      category: "crafting",
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

      description: "Rega wants protection against future slime invasions. Craft a copper dagger for her.",
      objectives: [
        {
          id: "craft_dagger",
          type: "gather",
          text: "Craft a Copper Dagger",
          target: 1,
          itemId: "copper_dagger",
          consumeOnComplete: true  // Dagger is given to Rega
        },
        {
          id: "deliver_dagger",
          type: "interact",
          text: "Bring the dagger to Rega",
          target: "rega"
        }
      ],
      dialogue: {
        intro: "Those slimes... what if they come back? I need some protection - something sharp! Could you forge me a dagger at the smithy? You'll need copper bars and some pine wood for the handle.",
        progress: "Have you made that dagger yet? I can't sleep knowing those creatures might return.",
        complete: "A real copper dagger! Oh, this is wonderful. Now I can defend my crops in peace. Here, take this as thanks - my grandmother's recipe book. Maybe you'll find something useful inside!"
      },

      rewards: {
        xp: 50,
        gold: 20,
        items: ["empty_bottle", "empty_bottle"],
        reputation: { dawnmere_settlers: 30 },
        unlocks: ["basic_smithing_tutorial"]
      },
      repeatRewardMultiplier: null,

      vocabulary: ["tools.basic"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

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
          id: "learn_able_pattern",
          type: "lesson",
          text: "Learn the -able/-ible pattern",
          lessonId: "lesson_4",
          target: null
        }
      ],
      dialogue: {
        intro: "Hello traveler! Learning a language can feel impossible at first, but it's actually quite possible! Let me show you a comfortable pattern that makes things more acceptable to your brain.",
        progress: "Words ending in -able and -ible are nearly identical in French!",
        complete: "Magnifique! You've learned an incredible pattern. Here, have some bread as thanks!"
      },
      
      rewards: {
        xp: 35,  // was 50  // was 75
        gold: 10,
        items: ["bread", "bread", "bread"],
        reputation: { dawnmere_settlers: 25 }
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
          text: "Review: Close cousins",
          lessonId: "lesson_5",
          target: null
        }
      ],
      dialogue: {
        intro: "Back for more practice? That's the spirit! Consistency is key to learning.",
        progress: "Take your time with the lesson. No rush.",
        complete: "Well done! See you tomorrow for more practice!"
      },
      
      rewards: {
        xp: 20,  // was 25
        gold: 5,
        items: [],
        reputation: { dawnmere_settlers: 5 }
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
          text: "Learn the -ique pattern",
          lessonId: "lesson_6",
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
        xp: 140,  // was 200
        gold: 50,
        items: ["health_potion", "health_potion"],
        reputation: { dawnmere_settlers: 100 }
      },
      repeatRewardMultiplier: 1.0,
      
      vocabulary: ["basics.greetings", "basics.introductions", "family.beginner", "family.intermediate", "farming.beginner"],
      
      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // REPEATABLE QUESTS - Can redo after cooldown
    // -------------------------------------------------

    // Resource request quest - gives gathering immediate purpose
    herb_delivery: {
      id: "herb_delivery",
      name: "Fresh Herbs for the Baker",
      giver: "baker",
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
      cooldown: 1800000, // 30 minutes cooldown
      seasonalWindow: null,

      description: "Marta needs fresh herbs for her baking. Gather meadow leaves and bring them to her.",
      objectives: [
        {
          id: "gather_herbs",
          type: "gather",
          text: "Gather 5 Meadow Leaves",
          target: 5,
          itemId: "meadow_leaf",
          consumeOnComplete: true
        },
        {
          id: "deliver_herbs",
          type: "interact",
          text: "Deliver herbs to Marta",
          target: "baker"
        }
      ],
      dialogue: {
        intro: "Oh, perfect timing! I've run out of meadow leaves for my herb bread. Could you gather some fresh ones for me? They grow all around the village.",
        progress: "Have you gathered those herbs yet? My customers are waiting for their herb bread!",
        complete: "These are perfect! So fresh and fragrant. Here's your payment, and take some bread for the road!"
      },

      rewards: {
        xp: 25,
        gold: 15,
        items: ["bread", "bread"],
        reputation: { dawnmere_settlers: 15 }
      },
      repeatRewardMultiplier: 0.8, // 80% rewards on repeat

      vocabulary: null, // No lesson component

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
          target: "old_pieron"
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
        xp: 105,  // was 150
        gold: 0,
        items: ["scholars_note"],
        reputation: { dawnmere_settlers: 50 }
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
        xp: 85,  // was 125
        gold: 30,
        items: [],
        reputation: { dawnmere_settlers: 75 }
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
        xp: 70,  // was 100
        gold: 25,
        items: ["solstice_lantern"],
        reputation: { dawnmere_settlers: 50 },
        spellbookUnlock: ["founding"]
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
          text: "Learn sound-alike words",
          lessonId: "lesson_7",
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
        xp: 35,  // was 50
        gold: 10,
        items: [],
        reputation: { dawnmere_settlers: 25 },
        spellbookUnlock: ["silence"]
      },
      repeatRewardMultiplier: null,

      vocabulary: ["nature.landscape", "nature.wildlife"],

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
          id: "learn_articles",
          type: "lesson",
          text: "Learn le and la (articles)",
          lessonId: "lesson_9",
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
        intro: "The lights are getting brighter. To understand what lies beneath, you must first learn to name things properly. In French, every noun has a gender - le or la. Le soleil, la lune... the sun, the moon. Let me teach you.",
        progress: "Le is masculine, la is feminine. It sounds strange, but you'll get used to it.",
        complete: "Now you can name what you see. Le livre, la porte, le jardin... The river holds many secrets, but at least you have the words for them."
      },

      rewards: {
        xp: 35,  // was 50  // was 75
        gold: 15,
        items: ["river_stone"],
        reputation: { dawnmere_settlers: 50 },
        spellbookUnlock: ["ancients"],
        artifactUnlock: "ancient_warning_stone"
      },
      repeatRewardMultiplier: null,

      vocabulary: ["nature.weather", "nature.plants"],

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
          id: "learn_family",
          type: "lesson",
          text: "Learn family vocabulary",
          lessonId: "lesson_10",
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
        intro: "Ah, a traveler! The flame welcomes all. You know, faith is like family - la mère, le père, les enfants. We care for each other. Let me teach you the words for family while we tend the shrine together.",
        progress: "Family words are important. La mère is mother, le père is father... you'll remember.",
        complete: "You have a gentle touch. Now you know the words for those you love - and for those who watch over this flame. Thank you."
      },

      rewards: {
        xp: 35,  // was 50
        gold: 5,
        items: [],
        reputation: { dawnmere_settlers: 25, order_of_dawn: 25 },
        spellbookUnlock: ["faith"]
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
          target: "brother_varek"
        }
      ],
      dialogue: {
        intro: "You've been kind to me. Perhaps... perhaps I can trust you with something. The grand temples, the gold, the power—that's not what the Light meant. Hermeau claims to serve, but true faith needs no crown.",
        progress: "Forgive me. These are dangerous thoughts.",
        complete: "Thank you for listening. Few do. Remember: the Light lives in simple flames, not golden thrones. Whatever happens... remember that."
      },

      rewards: {
        xp: 70,  // was 100
        gold: 0,
        items: ["shrine_blessing"],
        reputation: { dawnmere_settlers: 50, order_of_dawn: 50 },
        spellbookUnlock: ["golden_age"],
        artifactUnlock: "faith_schism_letter"
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
          target: "tommen"
        }
      ],
      dialogue: {
        intro: "You've traveled, haven't you? What's it like out there? The desert? The mountains? I'm going to leave someday. I just need to learn enough words first!",
        progress: "Tell me more! What about Lurenium? Is it really made of gold?",
        complete: "That sounds amazing! I've been practicing the words you taught me. Someday I'll see it all for myself. Thanks for not laughing at my dreams."
      },

      rewards: {
        xp: 20,  // was 30  // was 40
        gold: 5,
        items: [],
        reputation: { dawnmere_settlers: 20 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["basics.introductions"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // GATHERING SKILL QUESTS - Unlocks remaining skills
    // -------------------------------------------------

    // TOMMEN teaches Woodcutting (eager farmhand)
    learn_woodcutting: {
      id: "learn_woodcutting",
      name: "A Cut Above",
      giver: "tommen",
      location: "dawnmere",

      type: "side",
      category: "gathering",
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

      description: "Tommen wants to show you his woodcutting skills.",

      onAccept: {
        gatheringUnlock: ["woodcutting"]
      },

      objectives: [
        {
          id: "gather_wood",
          type: "gather",
          text: "Gather 3 wood from woodcutting",
          target: 3,
          itemCategory: "wood"
        }
      ],
      dialogue: {
        intro: "Hey! I saw you learning to mine and gather herbs. Want to try woodcutting? Rega makes me do it ALL the time, but it's actually pretty fun!",
        progress: "Keep swinging! The wood words will stick if you practice while chopping.",
        complete: "See? You're a natural! Now we both know woodcutting. Maybe someday we can travel together and build our own camp in the wild!"
      },

      rewards: {
        xp: 40,
        gold: 10,
        items: [],
        reputation: { dawnmere_settlers: 25 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // OLD JOREL teaches Fishing (village drunk, surprising skill)
    learn_fishing: {
      id: "learn_fishing",
      name: "Old Timer's Secret",
      giver: "old_jorel",
      location: "dawnmere",

      type: "side",
      category: "gathering",
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

      description: "Old Jorel offers to teach you an unexpected skill.",

      onAccept: {
        gatheringUnlock: ["fishing"]
      },

      objectives: [
        {
          id: "catch_fish",
          type: "gather",
          text: "Catch 3 fish",
          target: 3,
          itemCategory: "fish"
        }
      ],
      dialogue: {
        intro: "*hic* Before I was... this... I was the best fisherman in Renque. You want to learn? Patience, timing, and knowing the right words. The fish respond to French, you know. *laughs* Just kidding. But learning while fishing... that works.",
        progress: "Feel the line... wait for the tug... and practice your vocabulary while you wait.",
        complete: "Not bad! *actually smiles* That's the first time I've fished since... well. Thank you for reminding this old drunk he still knows a few things."
      },

      rewards: {
        xp: 40,
        gold: 5,
        items: ["old_fishing_lure"],
        reputation: { dawnmere_settlers: 25 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // BRAM teaches Hunting (settlers rep, practical skills)
    learn_hunting: {
      id: "learn_hunting",
      name: "Frontier Skills",
      giver: "settlers_rep",
      location: "dawnmere",

      type: "side",
      category: "gathering",
      status: "locked",

      levelRequired: 3,
      prerequisites: ["slime_farming"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Bram offers to teach you hunting skills essential for frontier life.",

      onAccept: {
        gatheringUnlock: ["hunting"]
      },

      objectives: [
        {
          id: "gather_hides",
          type: "gather",
          text: "Obtain 3 hides from hunting",
          target: 3,
          itemCategory: "hide"
        }
      ],
      dialogue: {
        intro: "Friend of the settlers! On the frontier, everyone needs to contribute. Hunting keeps us fed and clothed. I'll teach you the proper way. Knowledge is survival out here.",
        progress: "Track your prey... and practice those animal names. The words and the hunt go together.",
        complete: "Excellent work! You've proven yourself capable. The settlers will remember your contribution. These hides will serve the village well."
      },

      rewards: {
        xp: 50,
        gold: 15,
        items: [],
        reputation: { dawnmere_settlers: 40 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // SYSTEM TUTORIAL QUESTS - Hands-on learning
    // -------------------------------------------------

    // MERCHANT teaches shopping - First purchase tutorial
    first_purchase: {
      id: "first_purchase",
      name: "Trading Basics",
      giver: "merchant",
      location: "dawnmere",

      type: "side",
      category: "tutorial",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["meeting_family"],
      classRequired: null,
      reputationRequired: null,

      chainId: "system_tutorials",
      chainOrder: 1,
      chainNext: "gear_up",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "The Traveling Merchant offers to teach you about trading and shops.",

      objectives: [
        {
          id: "buy_bread",
          type: "buy",
          text: "Purchase bread from the merchant",
          itemId: "bread"
        },
        {
          id: "use_bread",
          type: "use_item",
          text: "Eat the bread to restore HP",
          itemId: "bread"
        }
      ],
      dialogue: {
        intro: "Traveler! You look like you could use some supplies. Let me show you how trading works in these parts. First, buy some bread from my shop - you'll need food to keep your strength up on your journey!",
        progress: "Did you buy the bread? Now eat it! Click the bread in your inventory to use it. Food restores your health when you make mistakes in lessons.",
        complete: "Perfect! Now you know how to shop and use items. Remember: bread heals a little, potions heal more. Come back anytime you need supplies!"
      },

      rewards: {
        xp: 30,
        gold: 20,
        items: ["health_potion"],
        reputation: { dawnmere_settlers: 15 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // URMA teaches equipment - Equip your first gear
    gear_up: {
      id: "gear_up",
      name: "Gear Up",
      giver: "urma",
      location: "dawnmere",

      type: "side",
      category: "tutorial",
      status: "locked",

      levelRequired: 1,
      prerequisites: ["first_purchase"],
      classRequired: null,
      reputationRequired: null,

      chainId: "system_tutorials",
      chainOrder: 2,
      chainNext: "community_spirit",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Urma wants to make sure you're properly equipped for your journey.",

      objectives: [
        {
          id: "equip_cloak",
          type: "equip",
          text: "Equip your Traveler's Cloak",
          itemId: "traveler_cloak"
        },
        {
          id: "check_profile",
          type: "task",
          text: "View your Profile to see your stats",
          target: null
        }
      ],
      dialogue: {
        intro: "That cloak I gave you - have you put it on yet? Equipment makes you stronger! Open your Inventory and click the cloak to equip it. Then check your Profile to see how it boosts your stats.",
        progress: "Click the cloak in your inventory to wear it. Then visit your Profile screen to see your stats!",
        complete: "Much better! Equipment gives you stat bonuses that help in lessons and exploration. As you find better gear, you'll grow stronger. Now you're ready for real adventures!"
      },

      rewards: {
        xp: 25,
        gold: 10,
        items: ["wooden_sword"],
        reputation: { dawnmere_settlers: 15 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // SETTLERS_REP teaches village projects - First contribution
    community_spirit: {
      id: "community_spirit",
      name: "Community Spirit",
      giver: "settlers_rep",
      location: "dawnmere",

      type: "side",
      category: "tutorial",
      status: "locked",

      levelRequired: 2,
      prerequisites: ["gear_up"],
      classRequired: null,
      reputationRequired: null,

      chainId: "system_tutorials",
      chainOrder: 3,
      chainNext: "first_brew",

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Bram explains how settlers work together on village projects.",

      objectives: [
        {
          id: "contribute_any",
          type: "contribute",
          text: "Contribute to any village project",
          target: null
        }
      ],
      dialogue: {
        intro: "Ah, a fellow contributor! Here in Dawnmere, we work together on big projects. Open the Village Projects menu - you'll see what we're building. Contribute any resources you've gathered to help!",
        progress: "Check the Village Projects from the main menu. Any resources you contribute help the whole settlement!",
        complete: "That's the spirit! Village projects unlock special bonuses for everyone when completed. The more you contribute, the stronger our settlement becomes. Keep gathering and helping out!"
      },

      rewards: {
        xp: 40,
        gold: 15,
        items: [],
        reputation: { dawnmere_settlers: 35 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // LYRA teaches alchemy basics - First potion craft
    first_brew: {
      id: "first_brew",
      name: "The Alchemist's Art",
      giver: "lyra",
      location: "haari_fields",

      type: "side",
      category: "tutorial",
      status: "locked",

      levelRequired: 3,
      prerequisites: ["secrets_of_the_soil"],
      classRequired: null,
      reputationRequired: null,

      chainId: "system_tutorials",
      chainOrder: 4,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Lyra offers to teach you how to brew your first potion.",

      objectives: [
        {
          id: "gather_herbs",
          type: "gather",
          text: "Gather 3 herbs for the potion",
          target: 3,
          itemCategory: "herb"
        },
        {
          id: "craft_potion",
          type: "craft",
          text: "Craft a Health Potion",
          profession: "alchemy",
          recipeId: "health_potion"
        }
      ],
      dialogue: {
        intro: "You've learned about herbs, but do you know what to DO with them? Alchemy transforms raw ingredients into potions! First, gather some herbs. Then open the Crafting menu and brew a Health Potion.",
        progress: "Collect herbs from herbalism, then visit the Crafting screen to brew your potion. Alchemy is under the Crafting menu!",
        complete: "Your first potion! Alchemy is essential for any adventurer. You can brew potions that heal, boost XP, protect against mistakes, and more. Keep gathering herbs and experimenting!"
      },

      rewards: {
        xp: 50,
        gold: 20,
        items: ["empty_bottle", "empty_bottle"],
        reputation: { dawnmere_settlers: 25, order_of_dawn: 15 }
      },
      repeatRewardMultiplier: null,

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // WIDOW SENNA - Seamstress (gossipy, observant) - DEFERRED TO LATER ZONE
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
        xp: 35,  // was 50
        gold: 10,
        items: ["mended_clothes"],
        reputation: { dawnmere_settlers: 30 }
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
          target: "widow_senna"
        }
      ],
      dialogue: {
        intro: "You came back. Good. I need to tell someone. That merchant—he's not just traveling through. And Marta's extra bread? She's been leaving it at the edge of the forest. Someone's hiding out there. Someone she doesn't want us to know about.",
        progress: "Promise you won't tell anyone I told you.",
        complete: "You believe me? Good. Something's wrong in Dawnmere. I can feel it in my stitches. Watch yourself, dear. And watch the others too."
      },

      rewards: {
        xp: 35,  // was 50  // was 75
        gold: 15,
        items: [],
        reputation: { dawnmere_settlers: 50 }
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
          target: "old_jorel"
        }
      ],
      dialogue: {
        intro: "*hic* A new face! Perfect. Everyone else here... they've heard my stories too many times. Buy you a drink? Actually... let me buy you a drink. I insist.",
        progress: "Don't leave yet. The night's still young... youngish.",
        complete: "Hah! You're a good listener. Most people just see the old drunk. But you... you look at people, don't you? Like you're actually seeing them. That's rare. That's good."
      },

      rewards: {
        xp: 20,  // was 30  // was 40
        gold: 0,
        items: ["jorels_flask"],
        reputation: { dawnmere_settlers: 20 }
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
          target: "old_jorel"
        }
      ],
      dialogue: {
        intro: "I was at Renque, you know. Before the corruption took it. Everyone says Hermeau saved us. *laughs bitterly* Saved us. I saw what he did. What he really did. The corruption didn't start there. It started in the hearts of men who wanted power.",
        progress: "Are you sure you want to hear this? Some truths... they change you.",
        complete: "Now you know. The hero-king... he's no hero. He's just better at hiding what he is. Be careful who you trust out there. And be careful what you become."
      },

      rewards: {
        xp: 70,  // was 100
        gold: 0,
        items: ["renque_medal"],
        reputation: { dawnmere_settlers: 75 },
        spellbookUnlock: ["king_dran"],
        artifactUnlock: "dran_private_letter"
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
          lessonId: "lesson_14",
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
        xp: 70,  // was 100
        gold: 25,
        items: ["fresh_vegetables"],
        reputation: { horticulturists: 50 }
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
          lessonId: "lesson_15",
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
        xp: 55,  // was 80
        gold: 20,
        items: ["herb_bundle"],
        reputation: { horticulturists: 30 }
      },
      repeatRewardMultiplier: null,

      vocabulary: ["agriculture.herbs"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // DAVE - Alchemy Introduction (unlocks crafting system)
    secrets_of_the_soil: {
      id: "secrets_of_the_soil",
      name: "Secrets of the Soil",
      giver: "dave",
      location: "haari_fields",

      type: "side",
      category: "unlock",
      status: "locked",

      levelRequired: 3,
      prerequisites: ["lyras_garden"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Dave offers to teach you the ancient art of combining herbs and essences into potions.",
      objectives: [
        {
          id: "gather_herbs",
          type: "gather",
          text: "Gather 3 Meadow Leaves",
          target: 3,
          itemId: "meadow_leaf"
        },
        {
          id: "learn_basics",
          type: "lesson",
          lessonId: "lesson_17",
          text: "Learn the basics of alchemy",
          target: 1
        }
      ],
      dialogue: {
        intro: "You've shown respect for the plants. Now I'll teach you something special — how to transform herbs into powerful remedies. The old ways call it 'l'alchimie'. Bring me some meadow leaves to begin.",
        progress: "Gather the herbs first. Then we'll begin the lesson.",
        complete: "Excellent! You now understand the fundamentals. The Alchemy Workbench is yours to use. Combine what you gather to create potions that will aid your journey."
      },

      rewards: {
        xp: 60,
        gold: 20,
        items: ["health_potion"],
        reputation: { horticulturists: 40 },
        unlocks: ["alchemy"]
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
          lessonId: "lesson_16",
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
        xp: 20,  // was 30  // was 40  // was 60
        gold: 15,
        items: [],
        reputation: { horticulturists: 30 }
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
          lessonId: "lesson_13",
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
        xp: 70,  // was 100
        gold: 25,
        items: ["bards_token"],
        reputation: { horticulturists: 50 }
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
          lessonId: "lesson_20",
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
        xp: 35,  // was 50  // was 75
        gold: 20,
        items: [],
        reputation: { horticulturists: 40 }
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
          lessonId: "lesson_19",
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
        xp: 70,  // was 100
        gold: 0,
        items: ["corrupted_sample"],
        reputation: { horticulturists: 75 },
        spellbookUnlock: ["exile"],
        artifactUnlock: "war_commanders_confession"
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
          lessonId: "lesson_12",
          text: "Learn abstract and philosophical vocabulary",
          target: null
        },
        {
          id: "hear_truth",
          type: "interact",
          text: "Listen to the Veiled One's revelation",
          target: "the_veiled_one"
        }
      ],
      dialogue: {
        intro: "You see me now? Interesting. Most cannot. Perhaps you're ready to see other things too. The Light casts shadows—remember that. Everything casts shadows.",
        progress: "Patience. Truth is not for the impatient.",
        complete: "The corruption is not what they tell you. It is older. Hungrier. Hermeau knows—why do you think he fears it so? Now you know too. Use this knowledge wisely. Or foolishly. The choice, as always, is yours."
      },

      rewards: {
        xp: 105,  // was 150
        gold: 0,
        items: ["veiled_insight"],
        reputation: {},
        spellbookUnlock: ["the_war"],
        artifactUnlock: "founding_builders_journal"
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
      reputationRequired: { dawnmere_settlers: 100 },

      chainId: "corruption_arc",
      chainOrder: 1,
      chainNext: null,  // TODO: Create corruption_spreads quest to continue arc

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Strange blight spreads across the Haari Fields. Dave the Herbalist needs your help investigating.",
      objectives: [
        {
          id: "learn_about_blight",
          type: "lesson",
          text: "Study the nature of the corruption",
          lessonType: "vocabulary",
          lessonId: "farming.intermediate"
        },
        {
          id: "collect_samples",
          type: "gather",
          text: "Collect corrupted samples",
          target: 5,
          itemId: "corrupted_sample",
          consumeOnComplete: true
        },
        {
          id: "report_dave",
          type: "interact",
          text: "Report findings to Dave",
          target: "dave"
        }
      ],
      dialogue: {
        intro: "Something is wrong with the land. Plants are dying, turning black. This isn't natural. I need someone to investigate the affected areas.",
        progress: "Be careful out there. Whatever is causing this... it feels wrong.",
        complete: "This is worse than I feared. These samples... there's dark magic at work here. This is only the beginning."
      },
      
      rewards: {
        xp: 140,  // was 200
        gold: 40,
        items: ["herbalist_pouch"],
        reputation: { dawnmere_settlers: 50, old_guard: 25 },
        artifactUnlock: "exile_spread_of_corruption"
      },
      repeatRewardMultiplier: null,

      vocabulary: ["farming.intermediate", "farming.creatures"],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // -------------------------------------------------
    // LURENIUM - Ancient City Quests
    // -------------------------------------------------

    // ARCHIVIST THELON - Scholarly intro quest
    archives_of_lurenium: {
      id: "archives_of_lurenium",
      name: "The Archives of Lurenium",
      giver: "archivist_thelon",
      location: "lurenium",

      type: "main",
      category: "lesson",
      status: "locked",

      levelRequired: 10,
      prerequisites: ["corruption_rises"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "The Archivist needs help cataloging ancient texts. Complete sentences from fragmented manuscripts.",
      objectives: [
        {
          id: "fill_blanks_cognates",
          type: "fill_blank",
          text: "Complete the fragmented texts",
          target: 5,
          category: "cognates"
        },
        {
          id: "catalog_texts",
          type: "interact",
          text: "Help Thelon catalog the manuscripts",
          target: 1
        }
      ],
      dialogue: {
        intro: "Ah, a traveler with educated eyes! These ancient texts are damaged—words missing, sentences incomplete. Help me fill in the gaps, and I'll share what the archives have taught me.",
        progress: "The old language flows through these pages. Can you see the patterns?",
        complete: "Remarkable! You have a scholar's intuition. These texts speak of times before Lurenium—before the Light, even. Return when you're ready for deeper mysteries."
      },

      rewards: {
        xp: 120,
        gold: 50,
        items: ["archivist_seal"],
        reputation: { lurenium_citizens: 50, see_of_lurenium: 25 }
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // MAGISTRATE CORINNE - City governance quest
    words_of_law: {
      id: "words_of_law",
      name: "Words of Law",
      giver: "magistrate_corinne",
      location: "lurenium",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 11,
      prerequisites: ["archives_of_lurenium"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "The Magistrate needs help interpreting legal documents written in the old formal style.",
      objectives: [
        {
          id: "fill_blanks_articles",
          type: "fill_blank",
          text: "Complete the legal phrases",
          target: 5,
          category: "articles"
        },
        {
          id: "review_documents",
          type: "interact",
          text: "Present your interpretations to the Magistrate",
          target: 1
        }
      ],
      dialogue: {
        intro: "Lurenium's laws are written in the formal tongue. Many young clerks struggle with the articles—le, la, les. Help me test these documents and I'll see you're properly rewarded.",
        progress: "Precision matters in law. Every word carries weight.",
        complete: "Your command of the articles is commendable. The law is built on such foundations—small words that change everything."
      },

      rewards: {
        xp: 100,
        gold: 60,
        items: [],
        reputation: { lurenium_citizens: 40 }
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // OLD JOREL - Elder's wisdom quest
    songs_of_old: {
      id: "songs_of_old",
      name: "Songs of Old",
      giver: "old_jorel",
      location: "lurenium",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 11,
      prerequisites: ["archives_of_lurenium"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Old Jorel remembers songs from his grandmother's time. Help him complete the forgotten verses.",
      objectives: [
        {
          id: "fill_blanks_family",
          type: "fill_blank",
          text: "Complete the old family songs",
          target: 4,
          category: "family"
        },
        {
          id: "learn_melody",
          type: "task",
          text: "Learn the melody from Jorel",
          target: 1
        }
      ],
      dialogue: {
        intro: "My grandmother sang these songs when I was small. Now the words slip away like water through fingers. Will you help an old man remember?",
        progress: "That's it... la mère, le père... the old words are coming back.",
        complete: "You've given me back something precious. These songs—they're not just words. They're who we were, before all this gold and glory. Thank you, young one."
      },

      rewards: {
        xp: 80,
        gold: 30,
        items: ["jorels_pendant"],
        reputation: { lurenium_citizens: 30 },
        spellbookUnlock: ["founding_before_the_light"]
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // MERCHANT LISELLE - Trade quest
    ledgers_of_the_guild: {
      id: "ledgers_of_the_guild",
      name: "Ledgers of the Guild",
      giver: "merchant_liselle",
      location: "lurenium",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 12,
      prerequisites: ["archives_of_lurenium"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Merchant Liselle needs help auditing old trade ledgers with number discrepancies.",
      objectives: [
        {
          id: "fill_blanks_numbers",
          type: "fill_blank",
          text: "Complete the numerical entries",
          target: 4,
          category: "numbers"
        },
        {
          id: "fill_blanks_food",
          type: "fill_blank",
          text: "Identify the trade goods",
          target: 4,
          category: "food"
        },
        {
          id: "balance_ledger",
          type: "interact",
          text: "Present the balanced ledger to Liselle",
          target: 1
        }
      ],
      dialogue: {
        intro: "These ledgers go back generations—quantities, goods, all in the old notation. My clerks can't make sense of them. Someone with knowledge of the old tongue could help me balance these books.",
        progress: "Trois crates of café, sept barrels of... what's that word?",
        complete: "The books balance! And look—someone was skimming from the guild for decades. Long dead now, but the truth matters. Here's your payment, plus a bonus for honesty."
      },

      rewards: {
        xp: 130,
        gold: 100,
        items: ["guild_recommendation"],
        reputation: { lurenium_citizens: 50, merchant_coalition: 75 }
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // CAPTAIN VARRO - Military quest
    orders_from_above: {
      id: "orders_from_above",
      name: "Orders from Above",
      giver: "captain_varro",
      location: "lurenium",

      type: "side",
      category: "lesson",
      status: "locked",

      levelRequired: 13,
      prerequisites: ["words_of_law"],
      classRequired: null,
      reputationRequired: null,

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Captain Varro received encoded orders but the cipher key uses weather terminology he doesn't recognize.",
      objectives: [
        {
          id: "fill_blanks_weather",
          type: "fill_blank",
          text: "Decode the weather cipher",
          target: 4,
          category: "weather"
        },
        {
          id: "deliver_decoded",
          type: "interact",
          text: "Deliver the decoded message to Varro",
          target: 1
        }
      ],
      dialogue: {
        intro: "These orders came from the capital, but the cipher... it uses old weather terms as code words. 'When the tempête arrives at the soleil's setting...' I need someone who knows these words.",
        progress: "The code is becoming clearer. Keep working.",
        complete: "The orders... they're about troop movements near Renque. Something is happening at the border. You've done Lurenium a great service. This information could save lives."
      },

      rewards: {
        xp: 150,
        gold: 75,
        items: ["military_commendation"],
        reputation: { lurenium_citizens: 60, old_guard: 50 },
        artifactUnlock: "war_border_intelligence"
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

      cannotAbandon: false,
      hiddenTrigger: null
    },

    // BROTHER CASSIUS - Religious quest
    hymns_of_light: {
      id: "hymns_of_light",
      name: "Hymns of Light",
      giver: "brother_cassius",
      location: "lurenium",

      type: "hidden",
      category: "lore",
      status: "locked",

      levelRequired: 14,
      prerequisites: ["songs_of_old"],
      classRequired: null,
      reputationRequired: { see_of_lurenium: 100 },

      chainId: null,
      chainOrder: null,
      chainNext: null,

      timeLimit: null,
      cooldown: null,
      seasonalWindow: null,

      description: "Brother Cassius has found hymns that predate the Church of Light. The verses are incomplete.",
      objectives: [
        {
          id: "fill_blanks_colors",
          type: "fill_blank",
          text: "Complete the symbolic color references",
          target: 5,
          category: "colors"
        },
        {
          id: "fill_blanks_body",
          type: "fill_blank",
          text: "Complete the body metaphors",
          target: 3,
          category: "body"
        },
        {
          id: "contemplate_meaning",
          type: "interact",
          text: "Discuss the hymns' meaning with Brother Cassius",
          target: 1
        }
      ],
      dialogue: {
        intro: "I found these hymns in the oldest chapel—hidden beneath the altar stone. They speak of Light, yes, but also of... something before. Colors have meaning here: blanc for purity, noir for what came before. Help me understand.",
        progress: "The heart... le cœur... it appears again and again. What were they trying to say?",
        complete: "These hymns... they don't worship the Light. They warn of it. 'When blanc consumes noir, the yeux will close forever.' The Church has hidden this for centuries. I... I need time to think about what this means."
      },

      rewards: {
        xp: 200,
        gold: 0,
        items: ["heretical_text"],
        reputation: { see_of_lurenium: -50 },
        spellbookUnlock: ["the_light", "the_war"],
        artifactUnlock: "founding_heretical_hymns"
      },
      repeatRewardMultiplier: null,

      vocabulary: [],

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

    // Quest Items
    corrupted_sample: {
      id: "corrupted_sample",
      name: "Corrupted Sample",
      type: "resource",
      category: "quest",
      description: "A sample of blighted plant matter. Dark veins pulse within.",
      value: 0,
      stackable: true,
      icon: "🦠"
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

    // =====================================================
    // Metal Bars (Smithing Intermediates)
    // =====================================================
    copper_bar: {
      id: "copper_bar",
      name: "Copper Bar",
      type: "resource",
      category: "bar",
      description: "A refined copper bar. Used for basic smithing.",
      value: 8,
      stackable: true,
      icon: "🔶"
    },
    iron_bar: {
      id: "iron_bar",
      name: "Iron Bar",
      type: "resource",
      category: "bar",
      description: "A sturdy iron bar. The backbone of metalworking.",
      value: 20,
      stackable: true,
      icon: "🔷"
    },
    silver_bar: {
      id: "silver_bar",
      name: "Silver Bar",
      type: "resource",
      category: "bar",
      description: "A gleaming silver bar. Prized for fine work.",
      value: 50,
      stackable: true,
      icon: "⬜"
    },

    // =====================================================
    // Enchanting Materials
    // =====================================================
    fire_shard: {
      id: "fire_shard",
      name: "Fire Shard",
      type: "resource",
      category: "enchanting",
      description: "A crystallized fragment of elemental fire.",
      value: 30,
      stackable: true,
      icon: "🔥"
    },
    frost_shard: {
      id: "frost_shard",
      name: "Frost Shard",
      type: "resource",
      category: "enchanting",
      description: "A crystallized fragment of elemental frost.",
      value: 30,
      stackable: true,
      icon: "❄️"
    },
    wisdom_dust: {
      id: "wisdom_dust",
      name: "Wisdom Dust",
      type: "resource",
      category: "enchanting",
      description: "Fine powder infused with knowledge.",
      value: 25,
      stackable: true,
      icon: "✨"
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
    settlers_hat: {
      id: "settlers_hat",
      name: "Settler's Hat",
      type: "helm",
      description: "A wide-brimmed hat worn by Dawnmere settlers. A symbol of the frontier spirit.",
      stats: {},
      value: 50,
      stackable: false,
      icon: "👒"
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

    // =====================================================
    // Smithed Weapons (Copper Tier)
    // =====================================================
    copper_dagger: {
      id: "copper_dagger",
      name: "Copper Dagger",
      type: "weapon",
      description: "A simple copper blade. +3 Strength",
      stats: { strength: 3 },
      value: 25,
      stackable: false,
      icon: "🗡️"
    },
    copper_sword: {
      id: "copper_sword",
      name: "Copper Sword",
      type: "weapon",
      description: "A basic copper sword. +4 Strength",
      stats: { strength: 4 },
      value: 40,
      stackable: false,
      icon: "⚔️"
    },

    // Smithed Weapons (Iron Tier)
    iron_dagger: {
      id: "iron_dagger",
      name: "Iron Dagger",
      type: "weapon",
      description: "A sharp iron blade. +5 Strength",
      stats: { strength: 5 },
      value: 60,
      stackable: false,
      icon: "🗡️"
    },
    iron_sword: {
      id: "iron_sword",
      name: "Iron Sword",
      type: "weapon",
      description: "A reliable iron sword. +7 Strength",
      stats: { strength: 7 },
      value: 100,
      stackable: false,
      icon: "⚔️"
    },

    // =====================================================
    // Smithed Armor (Copper Tier)
    // =====================================================
    copper_helm: {
      id: "copper_helm",
      name: "Copper Helm",
      type: "helm",
      description: "A copper helmet. +2 Stamina",
      stats: { stamina: 2 },
      value: 30,
      stackable: false,
      icon: "🪖"
    },
    copper_chestplate: {
      id: "copper_chestplate",
      name: "Copper Chestplate",
      type: "armor",
      description: "Basic copper armor. +3 Stamina",
      stats: { stamina: 3 },
      value: 50,
      stackable: false,
      icon: "🛡️"
    },

    // Smithed Armor (Iron Tier)
    iron_helm: {
      id: "iron_helm",
      name: "Iron Helm",
      type: "helm",
      description: "An iron helmet. +4 Stamina",
      stats: { stamina: 4 },
      value: 70,
      stackable: false,
      icon: "🪖"
    },
    iron_chestplate: {
      id: "iron_chestplate",
      name: "Iron Chestplate",
      type: "armor",
      description: "Sturdy iron armor. +6 Stamina",
      stats: { stamina: 6 },
      value: 120,
      stackable: false,
      icon: "🛡️"
    },

    // =====================================================
    // Enchanted Equipment
    // =====================================================
    copper_sword_fire: {
      id: "copper_sword_fire",
      name: "Copper Sword (Fire)",
      type: "weapon",
      description: "A copper sword burning with elemental fire. +4 Strength, +1 Insight",
      stats: { strength: 4, insight: 1 },
      value: 80,
      stackable: false,
      icon: "🔥",
      enchantment: "fire",
      baseItem: "copper_sword"
    },
    copper_sword_frost: {
      id: "copper_sword_frost",
      name: "Copper Sword (Frost)",
      type: "weapon",
      description: "A copper sword chilled with elemental frost. +4 Strength, +1 Agility",
      stats: { strength: 4, agility: 1 },
      value: 80,
      stackable: false,
      icon: "❄️",
      enchantment: "frost",
      baseItem: "copper_sword"
    },
    iron_sword_fire: {
      id: "iron_sword_fire",
      name: "Iron Sword (Fire)",
      type: "weapon",
      description: "An iron sword burning with elemental fire. +7 Strength, +2 Insight",
      stats: { strength: 7, insight: 2 },
      value: 180,
      stackable: false,
      icon: "🔥",
      enchantment: "fire",
      baseItem: "iron_sword"
    },
    iron_sword_frost: {
      id: "iron_sword_frost",
      name: "Iron Sword (Frost)",
      type: "weapon",
      description: "An iron sword chilled with elemental frost. +7 Strength, +2 Agility",
      stats: { strength: 7, agility: 2 },
      value: 180,
      stackable: false,
      icon: "❄️",
      enchantment: "frost",
      baseItem: "iron_sword"
    },
    copper_helm_wisdom: {
      id: "copper_helm_wisdom",
      name: "Copper Helm (Wisdom)",
      type: "helm",
      description: "A copper helm inscribed with runes of learning. +2 Stamina, +2 Knowledge",
      stats: { stamina: 2, knowledge: 2 },
      value: 70,
      stackable: false,
      icon: "📚",
      enchantment: "wisdom",
      baseItem: "copper_helm"
    },
    iron_helm_wisdom: {
      id: "iron_helm_wisdom",
      name: "Iron Helm (Wisdom)",
      type: "helm",
      description: "An iron helm inscribed with runes of learning. +4 Stamina, +3 Knowledge",
      stats: { stamina: 4, knowledge: 3 },
      value: 150,
      stackable: false,
      icon: "📚",
      enchantment: "wisdom",
      baseItem: "iron_helm"
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

    // =====================================================
    // Crafted Armor - Smithing
    // =====================================================
    copper_chainmail: {
      id: "copper_chainmail",
      name: "Copper Chainmail",
      type: "armor",
      description: "Light copper chain armor. +2 Defense, +5 Max HP",
      stats: { defense: 2, maxHp: 5 },
      value: 45,
      stackable: false,
      icon: "🛡️",
      craftedFrom: "smithing"
    },
    iron_platemail: {
      id: "iron_platemail",
      name: "Iron Platemail",
      type: "armor",
      description: "Heavy iron plate armor. +4 Defense, +10 Max HP",
      stats: { defense: 4, maxHp: 10 },
      value: 110,
      stackable: false,
      icon: "🛡️",
      craftedFrom: "smithing"
    },
    silver_crown: {
      id: "silver_crown",
      name: "Silver Crown",
      type: "helm",
      description: "An elegant silver crown. +3 Wisdom, +2 Knowledge",
      stats: { wisdom: 3, knowledge: 2 },
      value: 200,
      stackable: false,
      icon: "👑",
      craftedFrom: "smithing"
    },

    // =====================================================
    // Crafted Boots - Leatherworking
    // =====================================================
    leather_boots: {
      id: "leather_boots",
      name: "Leather Boots",
      type: "boots",
      description: "Sturdy boots for traveling. +1 Luck",
      stats: { luck: 1 },
      value: 35,
      stackable: false,
      icon: "👢",
      craftedFrom: "leatherworking"
    },
    wolf_fur_boots: {
      id: "wolf_fur_boots",
      name: "Wolf Fur Boots",
      type: "boots",
      description: "Warm, comfortable boots. +2 Luck, +1 Defense",
      stats: { luck: 2, defense: 1 },
      value: 75,
      stackable: false,
      icon: "👢",
      craftedFrom: "leatherworking"
    },
    bear_fur_boots: {
      id: "bear_fur_boots",
      name: "Bear Fur Boots",
      type: "boots",
      description: "Luxurious, warm boots. +3 Luck, +2 Defense, +5 Max HP",
      stats: { luck: 3, defense: 2, maxHp: 5 },
      value: 150,
      stackable: false,
      icon: "👢",
      craftedFrom: "leatherworking"
    },

    // =====================================================
    // Crafted Cloaks - Leatherworking
    // =====================================================
    travelers_cloak: {
      id: "travelers_cloak",
      name: "Traveler's Cloak",
      type: "cloak",
      description: "A warm cloak for the road. +1 Defense, +1 Devotion",
      stats: { defense: 1, devotion: 1 },
      value: 40,
      stackable: false,
      icon: "🧥",
      craftedFrom: "leatherworking"
    },
    rangers_cloak: {
      id: "rangers_cloak",
      name: "Ranger's Cloak",
      type: "cloak",
      description: "A fine cloak favored by scouts. +2 Defense, +1 Knowledge, +1 Luck",
      stats: { defense: 2, knowledge: 1, luck: 1 },
      value: 90,
      stackable: false,
      icon: "🧥",
      craftedFrom: "leatherworking"
    },
    masters_cloak: {
      id: "masters_cloak",
      name: "Master's Cloak",
      type: "cloak",
      description: "A magnificent cloak of superior craftsmanship. +3 Defense, +2 Wisdom, +1 Knowledge",
      stats: { defense: 3, wisdom: 2, knowledge: 1 },
      value: 180,
      stackable: false,
      icon: "🧥",
      craftedFrom: "leatherworking"
    },

    // =====================================================
    // Crafting Materials - Leatherworking
    // =====================================================
    cured_boar_hide: {
      id: "cured_boar_hide",
      name: "Cured Boar Hide",
      type: "resource",
      category: "leather",
      description: "Properly treated hide ready for crafting.",
      value: 8,
      stackable: true,
      icon: "🟫"
    },
    cured_wolf_pelt: {
      id: "cured_wolf_pelt",
      name: "Cured Wolf Pelt",
      type: "resource",
      category: "leather",
      description: "Premium treated wolf leather.",
      value: 18,
      stackable: true,
      icon: "🐺"
    },
    cured_bear_fur: {
      id: "cured_bear_fur",
      name: "Cured Bear Fur",
      type: "resource",
      category: "leather",
      description: "The finest treated leather.",
      value: 35,
      stackable: true,
      icon: "🐻"
    },

    // =====================================================
    // Crafted Food - Cooking
    // =====================================================
    grilled_perch: {
      id: "grilled_perch",
      name: "Grilled Perch",
      type: "consumable",
      category: "food",
      description: "A simple grilled fish. Restores 15 HP.",
      effect: { type: "heal", value: 15 },
      value: 5,
      stackable: true,
      icon: "🍽️",
      craftedFrom: "cooking"
    },
    herb_salad: {
      id: "herb_salad",
      name: "Herb Salad",
      type: "consumable",
      category: "food",
      description: "A fresh salad. Restores 10 HP.",
      effect: { type: "heal", value: 10 },
      value: 4,
      stackable: true,
      icon: "🥗",
      craftedFrom: "cooking"
    },
    fishermans_stew: {
      id: "fishermans_stew",
      name: "Fisherman's Stew",
      type: "consumable",
      category: "food",
      description: "Hearty stew. Restores 25 HP.",
      effect: { type: "heal", value: 25 },
      value: 12,
      stackable: true,
      icon: "🍲",
      craftedFrom: "cooking"
    },
    trout_fillet: {
      id: "trout_fillet",
      name: "Trout Fillet",
      type: "consumable",
      category: "food",
      description: "Delicate fillet. Restores 35 HP.",
      effect: { type: "heal", value: 35 },
      value: 18,
      stackable: true,
      icon: "🐟",
      craftedFrom: "cooking"
    },
    scholars_meal: {
      id: "scholars_meal",
      name: "Scholar's Meal",
      type: "consumable",
      category: "buff_food",
      description: "Brain food. +1 Knowledge for 10 lessons.",
      effect: { type: "tempStatBuff", stat: "knowledge", value: 1, duration: 10 },
      value: 35,
      stackable: true,
      icon: "📖",
      craftedFrom: "cooking"
    },
    fortifying_feast: {
      id: "fortifying_feast",
      name: "Fortifying Feast",
      type: "consumable",
      category: "buff_food",
      description: "Strengthening meal. +10 Max HP for 10 lessons.",
      effect: { type: "tempStatBuff", stat: "maxHp", value: 10, duration: 10 },
      value: 40,
      stackable: true,
      icon: "🍖",
      craftedFrom: "cooking"
    },
    moonlit_sashimi: {
      id: "moonlit_sashimi",
      name: "Moonlit Sashimi",
      type: "consumable",
      category: "buff_food",
      description: "Exquisite dish. +2 Wisdom for 10 lessons.",
      effect: { type: "tempStatBuff", stat: "wisdom", value: 2, duration: 10 },
      value: 70,
      stackable: true,
      icon: "🌙",
      craftedFrom: "cooking"
    },
    grand_banquet: {
      id: "grand_banquet",
      name: "Grand Banquet",
      type: "consumable",
      category: "buff_food",
      description: "A feast fit for royalty. Restores 75 HP and +5% XP for 5 lessons.",
      effect: { type: "compound", effects: [
        { type: "heal", value: 75 },
        { type: "xpMultiplier", value: 1.05, duration: 5 }
      ]},
      value: 120,
      stackable: true,
      icon: "👑",
      craftedFrom: "cooking"
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
    },
    gathering_pouch: {
      id: "gathering_pouch",
      name: "Gatherer's Satchel",
      type: "accessory",
      description: "A sturdy satchel for collecting resources. +1 Stamina, +1 Agility",
      stats: { stamina: 1, agility: 1 },
      value: 20,
      stackable: false,
      icon: "🎒"
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
  // Classes - Player starts as Cleric, chooses Order later
  // =====================================================
  classes: {
    // Base class - everyone starts here
    cleric: {
      id: "cleric",
      name: "Cleric",
      description: "A servant of the Light, sent from distant lands to investigate strange happenings.",
      flavor: "You carry the teachings of your homeland, but much remains to learn in this foreign tongue.",
      startingStats: { maxHp: 90 },
      startingItems: [],
      bonus: "Balanced starting stats",
      bonusDesc: "90 HP",
      icon: "✝️",
      isBaseClass: true
    },
    // Specializations - chosen later via quest
    sage: {
      id: "sage",
      name: "Order of Knowledge",
      description: "Devoted to preserving and uncovering sacred wisdom.",
      flavor: "Knowledge is the truest power. You seek wisdom in dusty tomes and forgotten lore.",
      startingStats: { maxHp: 80 },
      startingItems: ["scholars_cap"],
      bonus: "Scholar's Cap (+2 Wisdom)",
      bonusDesc: "-10 HP, +Scholar's Cap",
      icon: "📚",
      isBaseClass: false
    },
    protector: {
      id: "protector",
      name: "Order of Protection",
      description: "Guardians who shield the faithful from corruption and harm.",
      flavor: "Strength protects. You've trained your body to endure what others cannot.",
      startingStats: { maxHp: 100 },
      startingItems: ["basic_helm"],
      bonus: "Higher HP",
      bonusDesc: "+10 HP, +Helm",
      icon: "🛡️",
      isBaseClass: false
    },
    pathfinder: {
      id: "pathfinder",
      name: "Order of Pilgrimage",
      description: "Wanderers who walk the sacred paths and guide others through the unknown.",
      flavor: "Every journey reveals truth. You read the land as easily as others read books.",
      startingStats: { maxHp: 90 },
      startingItems: ["health_potion"],
      bonus: "Health Potion for survival",
      bonusDesc: "+Health Potion",
      icon: "🧭",
      isBaseClass: false
    }
  },

  // =====================================================
  // Artifacts - Hidden items that reveal true history
  // =====================================================
  artifacts: {
    // -------------------------------------------------
    // THE ANCIENTS (2 fragments)
    // -------------------------------------------------
    ancient_seal_fragment: {
      id: "ancient_seal_fragment",
      name: "Broken Seal Fragment",
      era: "ancients",
      order: 1,
      category: "relic",
      description: "A piece of an ancient seal, covered in symbols no scholar can read.",
      loreText: "The symbols predate all known languages. Whatever civilization created this seal was sealing something away—not keeping something in, but keeping something out. The craftsmanship suggests they knew exactly what they were doing.",
      icon: "🔮",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Hidden among the oldest stones of the capital"
    },
    ancient_warning_stone: {
      id: "ancient_warning_stone",
      name: "Warning Stone",
      era: "ancients",
      order: 2,
      category: "relic",
      description: "A small stone tablet with a single repeated symbol.",
      loreText: "The same symbol, carved over and over. Whatever it means, whoever carved it wanted to make absolutely certain the message would survive. It has. The meaning has not.",
      icon: "🪨",
      discoveryMethod: "quest",
      questId: "lights_below",
      hint: "Yris knows of old things beneath the water"
    },

    // -------------------------------------------------
    // THE SILENCE (2 fragments)
    // -------------------------------------------------
    silence_bone_carving: {
      id: "silence_bone_carving",
      name: "Bone Carving",
      era: "silence",
      order: 1,
      category: "personal_item",
      description: "A crude carving made from bone, depicting figures fleeing something.",
      loreText: "No written records survive from the Silence. Only carvings like this—desperate images scratched into bone by people who had no other way to record what they saw. The figures are running. What they're running from has been worn away by time.",
      icon: "🦴",
      discoveryMethod: "hotspot",
      location: "haari_fields",
      hint: "Buried in the old fields, where farmers sometimes find strange things"
    },
    silence_empty_shrine: {
      id: "silence_empty_shrine",
      name: "Miniature Shrine",
      era: "silence",
      order: 2,
      category: "relic",
      description: "A tiny shrine, its central figure deliberately removed.",
      loreText: "People worshipped something during the Silence—but whatever idol once stood in this shrine was removed. Not broken, not lost. Carefully, intentionally taken out. Someone wanted to forget.",
      icon: "🏛️",
      discoveryMethod: "reputation",
      faction: "order_of_dawn",
      threshold: 200,
      hint: "The Order of Dawn keeps old relics in their care"
    },

    // -------------------------------------------------
    // THE FOUNDING (3 fragments)
    // -------------------------------------------------
    founding_charter_fragment: {
      id: "founding_charter_fragment",
      name: "Original Charter Fragment",
      era: "founding",
      order: 1,
      category: "official_document",
      description: "A scrap of the original founding charter of Verandum.",
      loreText: "The official histories say Verandum was founded to 'bring order to chaos.' This fragment tells a different story: '...and should the seal ever weaken, let the kingdom stand as the second line...' Second line against what?",
      icon: "📜",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Somewhere in the archives of the capital"
    },
    founding_builders_journal: {
      id: "founding_builders_journal",
      name: "Builder's Journal Page",
      era: "founding",
      order: 2,
      category: "correspondence",
      description: "A page from a journal kept by one of Lurenium's original builders.",
      loreText: "We build upon the bones of the old city. The foreman says not to dig too deep. I asked why. He said some foundations are meant to stay buried. I do not think he meant the stones.",
      icon: "📖",
      discoveryMethod: "quest",
      questId: "shadows_of_light",
      hint: "Those who see through veils know where old things hide"
    },
    founding_first_kings_decree: {
      id: "founding_first_kings_decree",
      name: "First King's Private Decree",
      era: "founding",
      order: 3,
      category: "official_document",
      description: "A decree never meant for public eyes.",
      loreText: "Let it be known only to my successors: the crown exists not to rule, but to watch. We are guardians first, kings second. Should any heir forget this duty, may the Light forgive them—for history will not.",
      icon: "👑",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Hidden in the royal quarters, passed down through generations"
    },

    // -------------------------------------------------
    // THE FAITH (3 fragments)
    // -------------------------------------------------
    faith_original_prayer: {
      id: "faith_original_prayer",
      name: "Original Prayer Scroll",
      era: "faith",
      order: 1,
      category: "religious",
      description: "A prayer from before the church became powerful.",
      loreText: "The original prayers speak of vigilance and sacrifice. 'Keep us watchful, keep us humble, let us never forget what sleeps beneath.' Modern prayers mention none of this. What changed?",
      icon: "📿",
      discoveryMethod: "reputation",
      faction: "order_of_dawn",
      threshold: 350,
      hint: "Earn the deep trust of the Order of Dawn"
    },
    faith_schism_letter: {
      id: "faith_schism_letter",
      name: "Letter of Schism",
      era: "faith",
      order: 2,
      category: "correspondence",
      description: "A letter between two priests, debating a great divide.",
      loreText: "Brother, I cannot follow the new teachings. They speak of the Light as comfort, but comfort was never our purpose. We were meant to GUARD. The See has forgotten. The Order must remember, even if we must hide to do so.",
      icon: "✉️",
      discoveryMethod: "quest",
      questId: "doubt_and_faith",
      hint: "Brother Varek struggles with questions of faith"
    },
    faith_forbidden_text: {
      id: "faith_forbidden_text",
      name: "Forbidden Text Fragment",
      era: "faith",
      order: 3,
      category: "religious",
      description: "A page from a text the church ordered destroyed.",
      loreText: "The Light and the Dark are not opposites. They are... [text damaged] ...and the Ancients knew this. The seal requires both to... [text damaged] ...which is why the corruption cannot simply be destroyed. It must be...",
      icon: "🚫",
      discoveryMethod: "hotspot",
      location: "dawnmere",
      hint: "Hidden in the old shrine, where Varek tends the flame"
    },

    // -------------------------------------------------
    // THE GOLDEN AGE (3 fragments)
    // -------------------------------------------------
    golden_trade_manifest: {
      id: "golden_trade_manifest",
      name: "Suspicious Trade Manifest",
      era: "golden_age",
      order: 1,
      category: "official_document",
      description: "A trade record with unusual entries.",
      loreText: "Most entries are normal—grain, cloth, iron. But hidden among them: 'Containment materials - Lurenium depths.' Every year, the same entry. Someone was maintaining something beneath the capital, even during peacetime.",
      icon: "📋",
      discoveryMethod: "hotspot",
      location: "haari_fields",
      hint: "Old merchant records sometimes end up in strange places"
    },
    golden_royal_diary: {
      id: "golden_royal_diary",
      name: "Royal Diary Page",
      era: "golden_age",
      order: 2,
      category: "personal_item",
      description: "A page from a long-dead queen's diary.",
      loreText: "My husband speaks in his sleep. Names I do not know. Places beneath the castle. He carries a burden he cannot share, not even with me. I fear what our sons will inherit is not a kingdom, but a prison sentence.",
      icon: "📔",
      discoveryMethod: "quest",
      questId: null,
      hint: "Lost to time, waiting to be found"
    },
    golden_architects_note: {
      id: "golden_architects_note",
      name: "Architect's Hidden Note",
      era: "golden_age",
      order: 3,
      category: "correspondence",
      description: "A note hidden in the walls by a castle architect.",
      loreText: "I have built the passage as requested. No one will find it unless they know to look. But I must ask: what requires a secret path to the depths? And why must it be hidden even from the royal guard?",
      icon: "🏗️",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Builders leave their secrets in the stones"
    },

    // -------------------------------------------------
    // KING DRAN'S REIGN (4 fragments)
    // -------------------------------------------------
    dran_private_letter: {
      id: "dran_private_letter",
      name: "King Dran's Private Letter",
      era: "king_dran",
      order: 1,
      category: "correspondence",
      description: "A letter King Dran never sent.",
      loreText: "My sons, if you read this, I have failed to tell you in person. The crown is not power—it is a chain. Beneath Lurenium lies our true duty. Hermeau, you are clever. Layne, you are kind. You will need both traits for what comes.",
      icon: "💌",
      discoveryMethod: "quest",
      questId: "memories_of_renque",
      hint: "Old Jorel remembers more than he first lets on"
    },
    dran_inspection_report: {
      id: "dran_inspection_report",
      name: "Seal Inspection Report",
      era: "king_dran",
      order: 2,
      category: "official_document",
      description: "A classified report on something called 'the Seal.'",
      loreText: "Year 47 of Dran's reign. Seal integrity: stable. Corruption levels: minimal. Recommendation: continue current containment. Note: Prince Hermeau has been asking questions. Advise increased security on archive access.",
      icon: "📊",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Deep in the restricted archives"
    },
    dran_hermeau_journal: {
      id: "dran_hermeau_journal",
      name: "Young Hermeau's Journal",
      era: "king_dran",
      order: 3,
      category: "personal_item",
      description: "A journal kept by Hermeau as a young prince.",
      loreText: "Father treats Layne as the heir, though I am firstborn. He says I am 'too ambitious.' I have found references to something beneath the castle. If father won't share the family secrets, I will find them myself.",
      icon: "📓",
      discoveryMethod: "hotspot",
      location: "dawnmere",
      hint: "Discarded belongings sometimes wash far from their origin"
    },
    dran_layne_confession: {
      id: "dran_layne_confession",
      name: "Layne's Confession",
      era: "king_dran",
      order: 4,
      category: "correspondence",
      description: "A letter from Prince Layne to a trusted friend.",
      loreText: "I know what Hermeau found. I know what he plans. Father is dying, and my brother's ambition has twisted into something I do not recognize. He speaks of 'freeing' us from our 'chains.' He does not understand—the chains protect everyone.",
      icon: "😔",
      discoveryMethod: "reputation",
      faction: "haari_fields",
      threshold: 400,
      hint: "Those who tend the fields sometimes find buried truths"
    },

    // -------------------------------------------------
    // THE WAR (5 fragments)
    // -------------------------------------------------
    war_soldiers_letter: {
      id: "war_soldiers_letter",
      name: "Soldier's Unsent Letter",
      era: "the_war",
      order: 1,
      category: "correspondence",
      description: "A letter found on a fallen soldier, never delivered.",
      loreText: "My love, they tell us we fight the corruption, but I have seen things. The corruption comes FROM our camp, not toward it. Prince Hermeau's personal guard—their eyes are wrong. Something is very wrong. If I don't return, know that I",
      icon: "⚔️",
      discoveryMethod: "hotspot",
      location: "haari_fields",
      hint: "The fields were battlegrounds once"
    },
    war_commanders_confession: {
      id: "war_commanders_confession",
      name: "Commander's Confession",
      era: "the_war",
      order: 2,
      category: "correspondence",
      description: "A confession written by a military commander.",
      loreText: "I followed orders. I tell myself that. But I saw Hermeau open the seal. I saw what came out. I saw him SMILE. And then he told us to blame the enemy. There was no enemy. There was only him. God forgive me for my silence.",
      icon: "🎖️",
      discoveryMethod: "quest",
      questId: "what_stalks_the_fields",
      hint: "Rask knows the corruption is spreading from somewhere"
    },
    war_healers_record: {
      id: "war_healers_record",
      name: "Healer's Medical Record",
      era: "the_war",
      order: 3,
      category: "official_document",
      description: "Medical records from a war healer.",
      loreText: "The corruption wounds are unlike anything in our texts. They do not come from outside the body—they emerge from within. As if something was placed inside these soldiers. Several of Hermeau's elite show early signs. They do not seek treatment. They seem... pleased.",
      icon: "🏥",
      discoveryMethod: "reputation",
      faction: "order_of_dawn",
      threshold: 450,
      hint: "The Order kept records of the war's true horrors"
    },
    war_assassination_truth: {
      id: "war_assassination_truth",
      name: "Witness Account",
      era: "the_war",
      order: 4,
      category: "personal_item",
      description: "A hidden account of King Dran's death.",
      loreText: "I served King Dran for thirty years. He was not killed by assassins. I saw Prince Hermeau enter the chamber. I heard the argument. 'You would doom us all to be jailers forever,' Hermeau said. Then silence. Then Hermeau emerged alone, wearing the crown.",
      icon: "👁️",
      discoveryMethod: "hotspot",
      location: "lurenium",
      hint: "Someone in the castle saw everything"
    },
    war_laynes_evidence: {
      id: "war_laynes_evidence",
      name: "Layne's Hidden Evidence",
      era: "the_war",
      order: 5,
      category: "official_document",
      description: "Documents Layne hid before his exile.",
      loreText: "Whoever finds this: my brother Hermeau murdered our father. He broke the ancient seal deliberately. The corruption is his weapon, not his enemy. I am being exiled for 'cowardice,' but the truth is I refused to help him. Find the other witnesses. Expose him. Save Verandum.",
      icon: "📦",
      discoveryMethod: "quest",
      questId: null,
      hint: "Hidden before the exile, waiting for someone worthy"
    },

    // -------------------------------------------------
    // THE EXILE (4 fragments)
    // -------------------------------------------------
    exile_rewritten_history: {
      id: "exile_rewritten_history",
      name: "Original vs. Revised History",
      era: "exile",
      order: 1,
      category: "official_document",
      description: "Two versions of the same historical record.",
      loreText: "The original reads: 'Prince Layne opposed his brother's use of forbidden arts.' The revision reads: 'Prince Layne fled in cowardice when the enemy attacked.' Someone kept both versions. Someone wanted the truth preserved.",
      icon: "📚",
      discoveryMethod: "hotspot",
      location: "dawnmere",
      hint: "The village has a small collection of old books"
    },
    exile_resistance_code: {
      id: "exile_resistance_code",
      name: "Resistance Codebook",
      era: "exile",
      order: 2,
      category: "official_document",
      description: "A codebook used by those who resist Hermeau.",
      loreText: "We communicate in the old language—the one Hermeau banned from schools. Every word we preserve is an act of rebellion. Every child we teach is a soldier for truth. The king fears knowledge more than swords. That tells you everything.",
      icon: "🔐",
      discoveryMethod: "quest",
      questId: null,
      hint: "Those who resist leave messages for those who seek"
    },
    exile_spread_of_corruption: {
      id: "exile_spread_of_corruption",
      name: "Corruption Spread Map",
      era: "exile",
      order: 3,
      category: "official_document",
      description: "A map tracking the corruption's spread over twenty years.",
      loreText: "The pattern is clear when you see it mapped. The corruption spreads from Lurenium outward. Not randomly—deliberately. As if someone is... releasing it in stages. The dates correspond to political events: a rebellion here, an execution there. Hermeau uses it as a weapon.",
      icon: "🗺️",
      discoveryMethod: "quest",
      questId: "corruption_rises",
      hint: "Dave's investigation reveals a larger pattern"
    },
    exile_sealed_letter_layne: {
      id: "exile_sealed_letter_layne",
      name: "Layne's Sealed Letter",
      era: "exile",
      order: 4,
      category: "correspondence",
      description: "A letter sealed with Layne's personal sigil.",
      loreText: "To whoever breaks this seal: I am alive. I am gathering allies. The truth cannot stay buried forever. If you have found the other evidence, you know what my brother truly is. Find me. The resistance needs people who can see through lies. We need YOU.",
      icon: "🔏",
      discoveryMethod: "reputation",
      faction: "haari_fields",
      threshold: 500,
      hint: "Become a true friend of the fields"
    }
  },

  // =====================================================
  // Level Progression
  // =====================================================
  // XP Balance v2: ~50% increase in requirements to allow more lessons per level
  levelTable: [
    { level: 1, xpRequired: 0, totalXp: 0 },
    { level: 2, xpRequired: 150, totalXp: 150 },      // was 100
    { level: 3, xpRequired: 375, totalXp: 525 },      // was 250
    { level: 4, xpRequired: 675, totalXp: 1200 },     // was 450
    { level: 5, xpRequired: 1050, totalXp: 2250 },    // was 700
    { level: 6, xpRequired: 1500, totalXp: 3750 },    // was 1000
    { level: 7, xpRequired: 2100, totalXp: 5850 },    // was 1400
    { level: 8, xpRequired: 2850, totalXp: 8700 },    // was 1900
    { level: 9, xpRequired: 3750, totalXp: 12450 },   // was 2500
    { level: 10, xpRequired: 4800, totalXp: 17250 }   // was 3200
  ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_DATA };
}
