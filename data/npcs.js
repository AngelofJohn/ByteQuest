// ByteQuest - NPC System
// Handles NPC defaults, creation, and visibility

// =====================================================
// NPC Defaults
// =====================================================

const NPC_DEFAULTS = {
  portrait: null,
  disposition: "neutral",
  hidden: false,
  shop: null,
  faction: null,
  quests: [],
  tags: [],
  appearsWhen: null,
  disappearsWhen: null,
  dialogue: {
    greeting: "Hello, traveler.",
    quest_intro: null,
    quest_complete: null,
    idle: []
  },
  // State overrides allow NPC properties to change based on conditions
  // Each override has a "when" condition and properties to apply
  // Later overrides take priority (last match wins)
  stateOverrides: []
};

// =====================================================
// NPC Definitions (Compact Format)
// =====================================================

const NPC_DATA = {
  
  // -------------------------------------------------
  // Dawnmere NPCs
  // -------------------------------------------------
  
  urma: {
    name: "Urma",
    title: "Village Elder",
    location: "dawnmere",
    disposition: "friendly",
    tags: ["elder", "quest_giver", "main_story"],
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
    quests: ["meeting_family", "weekly_challenge"]
  },

  rega: {
    name: "Rega",
    title: "Farmer",
    location: "dawnmere",
    disposition: "worried",
    tags: ["farmer", "quest_giver", "vocabulary"],
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
    quests: ["slime_farming", "daily_practice", "helping_hand"]
  },

  merchant: {
    name: "Traveling Merchant",
    title: "Wanderer",
    location: "dawnmere",
    tags: ["merchant", "shop", "quest_giver"],
    dialogue: {
      greeting: "Looking to trade? I've got wares from across Turuem!",
      idle: [
        "The roads aren't as safe as they used to be.",
        "Prices are higher in the cities. Better deals out here.",
        "I heard strange rumors from the Haari Fields..."
      ]
    },
    quests: ["road_to_haari"],
    shop: {
      items: ["health_potion", "bread", "basic_helm"],
      currency: "gold"
    },
    // Merchant travels to Haari Fields during quest chain
    stateOverrides: [
      {
        // During active travel quest - still in Dawnmere preparing
        when: { questActive: "road_to_haari" },
        dialogue: {
          greeting: "Ready to set out? I've packed what we need.",
          idle: [
            "The journey shouldn't take long if we're careful.",
            "I hope the farmers there need supplies.",
            "Together we'll be safer on the road."
          ]
        }
      },
      {
        // After road_to_haari complete, during haari_arrival - now in Haari
        when: { quest: "road_to_haari" },
        location: "haari_fields",
        dialogue: {
          greeting: "Ah, the fresh air of the fields! Much better than dusty roads.",
          idle: [
            "These farmers seem like honest folk.",
            "Good soil here. Good for business too!",
            "Thank you again for the safe journey."
          ]
        }
      },
      {
        // After all travel quests complete - settled in Haari
        when: { quest: "merchant_thanks" },
        location: "haari_fields",
        title: "Field Merchant",
        dialogue: {
          greeting: "My friend! What can I get you today? Special prices for my traveling companion!",
          idle: [
            "Business is good here. The farmers needed a proper merchant.",
            "I think I'll stay a while. These fields feel like home now.",
            "You should visit Dave - he's been asking about you."
          ]
        }
      }
    ]
  },

  baker: {
    name: "Marta",
    title: "Baker",
    location: "dawnmere",
    disposition: "friendly",
    tags: ["villager", "shop", "quest_giver"],
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

  sage_aldric: {
    name: "Sage Aldric",
    title: "Grammar Teacher",
    location: "dawnmere",
    disposition: "wise",
    tags: ["teacher", "grammar", "quest_giver"],
    appearsWhen: { quest: "meeting_family" },
    dialogue: {
      greeting: "Ah, a seeker of knowledge. The patterns of language hold great power for those who understand them.",
      quest_intro: "The verb 'être' - to be - is the foundation of all expression. Are you ready to learn?",
      quest_complete: "Excellent! The Spellbook has been updated with this knowledge.",
      idle: [
        "Words are like spells - use them correctly, and you can accomplish anything.",
        "The verb 'être'... to be. Such a small word, yet it carries the weight of existence.",
        "In our tongue, even the moon and sun have different natures.",
        "Study the patterns, and the language will reveal itself to you."
      ]
    },
    quests: [
      "grammar_etre_intro",
      "grammar_avoir_intro",
      "grammar_gender_intro",
      "grammar_aller_intro",
      "grammar_regular_er",
      "grammar_mixed_practice_1"
    ]
  },

  old_pieron: {
    name: "Old Pieron",
    title: "Retired Scholar",
    location: "dawnmere",
    disposition: "wise",
    hidden: true,
    tags: ["teacher", "review", "hidden"],
    appearsWhen: { flag: "struggled_in_lesson" },
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
    quests: ["secret_student"]
  },

  // -------------------------------------------------
  // Dawnmere Filler NPCs
  // -------------------------------------------------

  yris: {
    name: "Yris",
    title: "River Watcher",
    location: "dawnmere",
    disposition: "dreamy",
    tags: ["villager", "flavor"],
    dialogue: {
      greeting: "The river tells stories, if you know how to listen...",
      idle: [
        "The fish have been acting strange lately. Swimming in circles.",
        "My mother used to say the river connects all the kingdoms.",
        "Sometimes I see lights beneath the water at night. Beautiful and terrible."
      ]
    }
  },

  brother_varek: {
    name: "Brother Varek",
    title: "Shrine Keeper",
    location: "dawnmere",
    disposition: "devout",
    faction: "order_of_dawn",
    tags: ["religious", "flavor", "lore"],
    dialogue: {
      greeting: "The Light welcomes all who seek its warmth, traveler.",
      idle: [
        "The shrine has stood here since before Dawnmere was settled.",
        "In the cities, they build grand temples. Here, we tend a simple flame.",
        "Hermeau claims to serve the Light, but true faith needs no crown."
      ]
    }
  },

  tommen: {
    name: "Tommen",
    title: "Farmhand",
    location: "dawnmere",
    disposition: "eager",
    tags: ["villager", "flavor", "young", "quest_giver"],
    quests: ["big_dreams"],
    dialogue: {
      greeting: "Oh! A traveler! Are you an adventurer? You look like one!",
      idle: [
        "Rega says I talk too much and work too little. He's probably right.",
        "I'm going to leave Dawnmere someday. See Lurenium, maybe even the desert!",
        "The words here are so different from back home. I keep mixing them up."
      ]
    }
  },

  widow_senna: {
    name: "Widow Senna",
    title: "Seamstress",
    location: "dawnmere",
    disposition: "gossipy",
    tags: ["villager", "flavor", "gossip"],
    dialogue: {
      greeting: "Come in, come in! Let me look at you. Those clothes have seen better days.",
      idle: [
        "Urma thinks she runs this village, but nothing happens without me knowing.",
        "The merchant? Charming, but I don't trust anyone who won't say where they're from.",
        "Marta's been baking extra bread lately. I wonder who it's really for..."
      ]
    }
  },

  old_jorel: {
    name: "Old Jorel",
    title: "Village Drunk",
    location: "dawnmere",
    disposition: "melancholy",
    tags: ["villager", "flavor", "lore", "hidden_hints"],
    dialogue: {
      greeting: "*hic* Another new face... we get so many these days...",
      idle: [
        "I was at Renque, you know. Before the... before everything.",
        "The corruption didn't start there. It started in the hearts of men.",
        "They say Hermeau saved us. Saved us! *laughs bitterly*"
      ]
    }
  },

  // -------------------------------------------------
  // Haari Fields NPCs
  // -------------------------------------------------

  dave: {
    name: "Dave",
    title: "Head Horticulturist",
    location: "haari_fields",
    disposition: "friendly",
    tags: ["horticulturist", "quest_giver", "faction_leader"],
    faction: "horticulturists",
    dialogue: {
      greeting: "Ah, a new face! I can teach you much about the plants of this land.",
      quest_intro: "The fields need tending, and we need capable hands.",
      quest_complete: "Nature rewards those who respect her.",
      idle: [
        "These plants have many uses.",
        "Nature provides all we need.",
        "Every herb has its purpose."
      ]
    },
    quests: ["harvest_time", "corruption_rises"]
  },

  lyra: {
    name: "Lyra",
    title: "Apprentice Herbalist",
    location: "haari_fields",
    disposition: "friendly",
    tags: ["horticulturist", "villager", "vocabulary", "quest_giver"],
    faction: "horticulturists",
    dialogue: {
      greeting: "Hello! Are you here to learn about fruits and vegetables too?",
      quest_intro: "I've been cultivating a special garden. Would you like to see it?",
      quest_complete: "You're a natural! The plants seem to like you.",
      idle: [
        "Dave is teaching me so much about the plants.",
        "Did you know some herbs can heal wounds?",
        "The Haari Fields have the best soil in the region."
      ]
    },
    quests: ["lyras_garden"]
  },

  // -------------------------------------------------
  // Haari Fields Filler NPCs
  // -------------------------------------------------

  venn: {
    name: "Venn",
    title: "Wandering Bard",
    location: "haari_fields",
    disposition: "whimsical",
    tags: ["traveler", "flavor", "tips"],
    dialogue: {
      greeting: "A fellow wanderer! Stay a while and listen to a song?",
      idle: [
        "♪ Words are like seeds, plant them with care... ♪",
        "I've traveled from the desert to the mountains. The fields are my favorite.",
        "The best way to remember is to make it a rhyme. Trust me!"
      ]
    }
  },

  rask: {
    name: "Rask",
    title: "Tracker",
    location: "haari_fields",
    disposition: "wary",
    tags: ["hunter", "flavor", "warnings"],
    dialogue: {
      greeting: "Keep your voice down. Something's been stalking these fields.",
      idle: [
        "The boars aren't the problem. It's what's driving them south.",
        "I've seen tracks I don't recognize. Too large. Wrong shape.",
        "The corruption spreads like rot through wood. Slow, but certain."
      ]
    }
  },

  the_veiled_one: {
    name: "The Veiled One",
    title: "Hermit",
    location: "haari_fields",
    disposition: "cryptic",
    hidden: true,
    tags: ["mysterious", "lore", "hidden"],
    appearsWhen: { level: 5 },
    dialogue: {
      greeting: "You see me now? Interesting. Most cannot.",
      idle: [
        "The corruption is not what they tell you. It is older. Hungrier.",
        "Hermeau knows. Why do you think he fears it so?",
        "The Light casts shadows. Remember that."
      ]
    }
  }
};

// =====================================================
// NPC Factory Function
// =====================================================

/**
 * Creates a complete NPC object by merging with defaults
 * @param {string} id - NPC identifier
 * @param {object} data - NPC data (compact format)
 * @returns {object} Complete NPC object
 */
function createNPC(id, data) {
  return {
    id,
    name: data.name,
    title: data.title || "Villager",
    location: data.location,
    portrait: data.portrait ?? NPC_DEFAULTS.portrait,
    disposition: data.disposition ?? NPC_DEFAULTS.disposition,
    hidden: data.hidden ?? NPC_DEFAULTS.hidden,
    faction: data.faction ?? NPC_DEFAULTS.faction,
    tags: data.tags ?? NPC_DEFAULTS.tags,
    appearsWhen: data.appearsWhen ?? NPC_DEFAULTS.appearsWhen,
    disappearsWhen: data.disappearsWhen ?? NPC_DEFAULTS.disappearsWhen,
    dialogue: {
      greeting: data.dialogue?.greeting ?? NPC_DEFAULTS.dialogue.greeting,
      quest_intro: data.dialogue?.quest_intro ?? NPC_DEFAULTS.dialogue.quest_intro,
      quest_complete: data.dialogue?.quest_complete ?? NPC_DEFAULTS.dialogue.quest_complete,
      idle: data.dialogue?.idle ?? NPC_DEFAULTS.dialogue.idle
    },
    quests: data.quests ?? NPC_DEFAULTS.quests,
    shop: data.shop ?? NPC_DEFAULTS.shop
  };
}

/**
 * Build complete NPC registry from compact data
 */
function buildNPCRegistry() {
  const registry = {};
  for (const [id, data] of Object.entries(NPC_DATA)) {
    registry[id] = createNPC(id, data);
  }
  return registry;
}

// =====================================================
// NPC Visibility System
// =====================================================

/**
 * Check if an NPC should be visible based on conditions
 * @param {object} npc - NPC object
 * @param {object} gameState - Current game state
 * @returns {boolean}
 */
function isNPCVisible(npc, gameState) {
  // Check if explicitly hidden
  if (npc.hidden && !checkAppearCondition(npc.appearsWhen, gameState)) {
    return false;
  }
  
  // Check disappear conditions
  if (npc.disappearsWhen && checkAppearCondition(npc.disappearsWhen, gameState)) {
    return false;
  }
  
  // Check appear conditions (if not hidden but has conditions)
  if (npc.appearsWhen && !npc.hidden) {
    return checkAppearCondition(npc.appearsWhen, gameState);
  }
  
  return true;
}

/**
 * Check a single appearance condition
 * @param {object} condition - Condition object
 * @param {object} gameState - Current game state
 * @returns {boolean}
 */
function checkAppearCondition(condition, gameState) {
  if (!condition) return true;
  
  const player = gameState.player;
  
  // Quest completion check
  if (condition.quest) {
    if (!player.completedQuests?.includes(condition.quest)) {
      return false;
    }
  }
  
  // Quest active check
  if (condition.questActive) {
    if (!player.activeQuests?.some(q => q.id === condition.questActive)) {
      return false;
    }
  }
  
  // Level check
  if (condition.level) {
    if (player.level < condition.level) {
      return false;
    }
  }
  
  // Flag check
  if (condition.flag) {
    if (!player.flags?.[condition.flag]) {
      return false;
    }
  }
  
  // Reputation check
  if (condition.reputation) {
    const rep = player.reputation?.[condition.reputation.faction] || 0;
    if (rep < condition.reputation.amount) {
      return false;
    }
  }
  
  return true;
}

/**
 * Apply state overrides to an NPC based on current game state
 * Returns a new NPC object with overrides applied (does not mutate original)
 * Overrides are checked in order; later matching overrides take priority
 *
 * @param {object} npc - NPC object with potential stateOverrides
 * @param {object} gameState - Current game state
 * @returns {object} NPC with applicable overrides merged in
 *
 * @example
 * // NPC definition:
 * pardu: {
 *   name: "Pardu",
 *   location: "dawnmere",
 *   dialogue: { greeting: "Ready to travel?" },
 *   stateOverrides: [
 *     {
 *       when: { questActive: "journey_to_haari" },
 *       location: "haari_fields",
 *       dialogue: { greeting: "The fields are peaceful..." }
 *     },
 *     {
 *       when: { quest: "journey_to_haari" },
 *       location: "haari_fields",
 *       dialogue: { greeting: "Good to be here at last." }
 *     }
 *   ]
 * }
 */
function applyNPCStateOverrides(npc, gameState) {
  if (!npc.stateOverrides || npc.stateOverrides.length === 0) {
    return npc;
  }

  // Start with a shallow copy
  let result = { ...npc };

  // Check each override in order
  for (const override of npc.stateOverrides) {
    if (override.when && checkAppearCondition(override.when, gameState)) {
      // Merge the override properties (excluding 'when')
      const { when, ...properties } = override;

      // Deep merge for dialogue object
      if (properties.dialogue && result.dialogue) {
        properties.dialogue = { ...result.dialogue, ...properties.dialogue };
      }

      result = { ...result, ...properties };
    }
  }

  return result;
}

/**
 * Get NPC's current effective location (accounting for state overrides)
 * @param {object} npc - NPC object
 * @param {object} gameState - Current game state
 * @returns {string} Current location ID
 */
function getNPCCurrentLocation(npc, gameState) {
  const effectiveNPC = applyNPCStateOverrides(npc, gameState);
  return effectiveNPC.location;
}

// =====================================================
// NPC Query Functions
// =====================================================

/**
 * Get all NPCs in a location (accounts for state overrides)
 * @param {string} locationId - Location identifier
 * @param {object} gameState - Current game state
 * @param {boolean} visibleOnly - Filter by visibility
 * @returns {array} Array of NPC objects with overrides applied
 */
function getNPCsInLocation(locationId, gameState, visibleOnly = true) {
  const registry = buildNPCRegistry();

  return Object.values(registry)
    .map(npc => applyNPCStateOverrides(npc, gameState))
    .filter(npc => {
      if (npc.location !== locationId) return false;
      if (visibleOnly && !isNPCVisible(npc, gameState)) return false;
      return true;
    });
}

/**
 * Get all NPCs with specific tag
 * @param {string} tag - Tag to search for
 * @param {object} gameState - Current game state
 * @param {boolean} visibleOnly - Filter by visibility
 * @returns {array} Array of NPC objects
 */
function getNPCsByTag(tag, gameState, visibleOnly = true) {
  const registry = buildNPCRegistry();
  
  return Object.values(registry).filter(npc => {
    if (!npc.tags.includes(tag)) return false;
    if (visibleOnly && !isNPCVisible(npc, gameState)) return false;
    return true;
  });
}

/**
 * Get all NPCs with multiple tags (AND)
 * @param {array} tags - Tags to search for
 * @param {object} gameState - Current game state
 * @param {boolean} visibleOnly - Filter by visibility
 * @returns {array} Array of NPC objects
 */
function getNPCsByTags(tags, gameState, visibleOnly = true) {
  const registry = buildNPCRegistry();
  
  return Object.values(registry).filter(npc => {
    if (!tags.every(tag => npc.tags.includes(tag))) return false;
    if (visibleOnly && !isNPCVisible(npc, gameState)) return false;
    return true;
  });
}

/**
 * Get a single NPC by ID
 * @param {string} id - NPC identifier
 * @returns {object|null} NPC object or null
 */
function getNPC(id) {
  const data = NPC_DATA[id];
  if (!data) return null;
  return createNPC(id, data);
}

/**
 * Get a single NPC by ID with state overrides applied
 * Use this when you need the NPC's current state (location, dialogue, etc.)
 * @param {string} id - NPC identifier
 * @param {object} gameState - Current game state
 * @returns {object|null} NPC object with overrides applied, or null
 */
function getNPCWithState(id, gameState) {
  const npc = getNPC(id);
  if (!npc) return null;
  return applyNPCStateOverrides(npc, gameState);
}

/**
 * Get all NPCs that give quests
 * @param {object} gameState - Current game state
 * @param {boolean} visibleOnly - Filter by visibility
 * @returns {array} Array of NPC objects
 */
function getQuestGivers(gameState, visibleOnly = true) {
  const registry = buildNPCRegistry();
  
  return Object.values(registry).filter(npc => {
    if (npc.quests.length === 0) return false;
    if (visibleOnly && !isNPCVisible(npc, gameState)) return false;
    return true;
  });
}

/**
 * Get all merchants
 * @param {object} gameState - Current game state
 * @param {boolean} visibleOnly - Filter by visibility
 * @returns {array} Array of NPC objects
 */
function getMerchants(gameState, visibleOnly = true) {
  const registry = buildNPCRegistry();
  
  return Object.values(registry).filter(npc => {
    if (!npc.shop) return false;
    if (visibleOnly && !isNPCVisible(npc, gameState)) return false;
    return true;
  });
}

// =====================================================
// Export
// =====================================================

// Build the registry for use by other systems
const NPCS = buildNPCRegistry();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NPC_DEFAULTS,
    NPC_DATA,
    NPCS,
    createNPC,
    buildNPCRegistry,
    isNPCVisible,
    checkAppearCondition,
    getNPCsInLocation,
    getNPCsByTag,
    getNPCsByTags,
    getNPC,
    getQuestGivers,
    getMerchants
  };
}
