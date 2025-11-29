// ByteQuest - Game Data
// Phase 1: Dawnmere Vertical Slice

const GAME_DATA = {
  // Player Classes
  classes: {
    scholar: {
      id: "scholar",
      name: "Scholar",
      description: "Masters language through study and practice. Higher XP gains.",
      startingStats: {
        maxHp: 90,
      },
      startingItems: ["book", "quill"]
    },
    warrior: {
      id: "warrior",
      name: "Warrior",
      description: "Learns through action and repetition. More forgiving with mistakes.",
      startingStats: {
        maxHp: 120,
      },
      startingItems: ["sword", "shield"]
    },
    traveler: {
      id: "traveler",
      name: "Traveler",
      description: "Balanced approach to learning. Well-rounded stats.",
      startingStats: {
        maxHp: 100,
      },
      startingItems: ["map", "compass"]
    }
  },

  // Locations
  locations: {
    dawnmere: {
      id: "dawnmere",
      name: "Dawnmere",
      description: "A small frontier settlement seeking prosperity.",
      npcs: ["urma", "rega", "dave"],
      quests: ["welcome_to_dawnmere", "meet_the_settlers", "learning_basics"]
    }
  },

  // NPCs
  npcs: {
    urma: {
      id: "urma",
      name: "Elder Urma",
      role: "Village Elder",
      dialogue: {
        greeting: "Welcome, traveler. Our settlement could use someone with your skills.",
        idle: [
          "The old ways are not forgotten here.",
          "We built this place with our own hands.",
          "Times are hard, but we persevere."
        ]
      }
    },
    rega: {
      id: "rega",
      name: "Rega",
      role: "Farmer",
      dialogue: {
        greeting: "Bonjour! Another mouth to feed, eh? Just kidding!",
        idle: [
          "The harvest has been good this year.",
          "These crops won't plant themselves!",
          "Hard work is the key to success."
        ]
      },
      shop: true
    },
    dave: {
      id: "dave",
      name: "Dave the Herbalist",
      role: "Herbalist",
      dialogue: {
        greeting: "Ah, a new face! I can teach you much about the herbs of this land.",
        idle: [
          "These plants have many uses.",
          "Nature provides all we need.",
          "Every herb has its purpose."
        ]
      }
    }
  },

  // Quests
  quests: {
    welcome_to_dawnmere: {
      id: "welcome_to_dawnmere",
      name: "Welcome to Dawnmere",
      type: "main",
      description: "Learn about your new home and meet the village elder.",
      giver: "urma",
      prerequisites: [],
      objectives: [
        {
          id: "meet_urma",
          type: "talk",
          text: "Speak with Elder Urma",
          target: 1
        }
      ],
      rewards: {
        xp: 50,
        gold: 10
      },
      vocabulary: ["greetings.basic"],
      dialogue: {
        intro: "Welcome to Dawnmere, traveler. I am Elder Urma. We are a small community, but we look after our own. To truly become one of us, you must learn our language.",
        progress: "Have you completed what I asked?",
        complete: "Excellent! You are making good progress. Continue to learn, and you will thrive here."
      }
    },

    meet_the_settlers: {
      id: "meet_the_settlers",
      name: "Meet the Settlers",
      type: "side",
      description: "Introduce yourself to the people of Dawnmere.",
      giver: "urma",
      prerequisites: ["welcome_to_dawnmere"],
      objectives: [
        {
          id: "meet_settlers",
          type: "meet",
          text: "Meet the settlers (0/3)",
          target: 3
        }
      ],
      rewards: {
        xp: 75,
        gold: 15,
        reputation: { dawnmere: 10 }
      },
      vocabulary: ["greetings.basic"],
      dialogue: {
        intro: "Get to know the people here. They will appreciate a friendly face. Speak with at least three settlers.",
        progress: "Keep meeting people. They're friendly, I promise!",
        complete: "Well done! The people speak highly of you already."
      }
    },

    learning_basics: {
      id: "learning_basics",
      name: "Learning the Basics",
      type: "lesson",
      description: "Master basic French greetings to communicate with the locals.",
      giver: "dave",
      prerequisites: ["welcome_to_dawnmere"],
      objectives: [
        {
          id: "learn_greetings",
          type: "lesson",
          text: "Complete the greetings lesson",
          target: 1
        }
      ],
      rewards: {
        xp: 100,
        gold: 20,
        items: ["health_potion"]
      },
      vocabulary: ["greetings.basic", "numbers.basic"],
      dialogue: {
        intro: "Language is the key to understanding, my friend. Let me teach you some basic greetings. Are you ready to learn?",
        progress: "Ready for your lesson? I promise it won't hurt... much!",
        complete: "Magnifique! You're a natural. Keep practicing, and you'll be fluent in no time!"
      }
    }
  },

  // Items
  items: {
    // Starting items
    book: {
      id: "book",
      name: "Scholar's Tome",
      type: "accessory",
      icon: "📖",
      description: "A well-worn book of knowledge.",
      stackable: false,
      stats: { maxHp: 5 }
    },
    quill: {
      id: "quill",
      name: "Writing Quill",
      type: "accessory",
      icon: "🪶",
      description: "For taking notes during lessons.",
      stackable: false
    },
    sword: {
      id: "sword",
      name: "Iron Sword",
      type: "weapon",
      icon: "⚔️",
      description: "A sturdy blade for protection.",
      stackable: false,
      stats: { maxHp: 10 }
    },
    shield: {
      id: "shield",
      name: "Wooden Shield",
      type: "armor",
      icon: "🛡️",
      description: "Offers basic protection.",
      stackable: false,
      stats: { maxHp: 15 }
    },
    map: {
      id: "map",
      name: "Traveler's Map",
      type: "accessory",
      icon: "🗺️",
      description: "Shows the lands you've explored.",
      stackable: false
    },
    compass: {
      id: "compass",
      name: "Bronze Compass",
      type: "accessory",
      icon: "🧭",
      description: "Helps you find your way.",
      stackable: false,
      stats: { maxHp: 5 }
    },

    // Consumables
    health_potion: {
      id: "health_potion",
      name: "Health Potion",
      type: "consumable",
      icon: "🧪",
      description: "Restores 30 HP.",
      stackable: true,
      effect: { hp: 30 }
    },
    bread: {
      id: "bread",
      name: "Bread",
      type: "consumable",
      icon: "🍞",
      description: "Restores 10 HP.",
      stackable: true,
      effect: { hp: 10 }
    }
  },

  // Level progression table
  levelTable: [
    { level: 1, xpRequired: 0 },
    { level: 2, xpRequired: 100 },
    { level: 3, xpRequired: 250 },
    { level: 4, xpRequired: 450 },
    { level: 5, xpRequired: 700 },
    { level: 6, xpRequired: 1000 },
    { level: 7, xpRequired: 1350 },
    { level: 8, xpRequired: 1750 },
    { level: 9, xpRequired: 2200 },
    { level: 10, xpRequired: 2700 }
  ]
};
