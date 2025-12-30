// ByteQuest Main Story Quests
// 60 quests across 6 zones - Pure narrative, no forced vocabulary in dialogue
//
// Structure:
// - Story provides motivation and gates progress
// - Grammar introduced at appropriate points
// - Completing quests unlocks vocabulary lessons
// - Zone exams test accumulated knowledge

const MAIN_STORY_QUESTS = {

  // =====================================================
  // ZONE 1: DAWNMERE (Levels 1-5)
  // Theme: "The Arrival" - New beginnings, finding your place
  // Unlocks: Lessons 1-8 (~200 words)
  // Grammar: être, avoir, gender, articles
  // =====================================================

  ms_1_01_stranger_arrives: {
    id: "ms_1_01_stranger_arrives",
    name: "The Stranger Arrives",
    zone: "dawnmere",
    zoneOrder: 1,

    type: "main",
    category: "social",
    status: "available",

    levelRequired: 1,
    prerequisites: [],

    chainId: "main_story",
    chainOrder: 1,
    chainNext: "ms_1_02_words_of_welcome",

    description: "You wake in an unfamiliar place. A woman named Urma tends to you.",

    objectives: [
      {
        id: "wake_up",
        type: "task",
        text: "Regain consciousness",
        target: 1
      },
      {
        id: "speak_urma",
        type: "interact",
        text: "Speak with Urma",
        target: "urma"
      }
    ],

    dialogue: {
      intro: null, // Quest starts automatically
      progress: "You're still weak. Rest a moment longer.",
      complete: "Good, you're awake. You washed up on the riverbank three days ago. Welcome to Dawnmere."
    },

    rewards: {
      xp: 25,
      gold: 0,
      lessonsUnlocked: ["lesson_1", "lesson_2"], // Identical cognates, -tion pattern
      items: ["settlers_clothes"],
      reputation: { dawnmere: 10 }
    }
  },

  ms_1_02_words_of_welcome: {
    id: "ms_1_02_words_of_welcome",
    name: "Words of Welcome",
    zone: "dawnmere",
    zoneOrder: 2,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 1,
    prerequisites: ["ms_1_01_stranger_arrives"],

    chainId: "main_story",
    chainOrder: 2,
    chainNext: "ms_1_03_choose_your_path",

    description: "The settlers of Dawnmere gather to meet the newcomer.",

    objectives: [
      {
        id: "meet_settlers",
        type: "meet",
        text: "Meet the settlers",
        target: 3
      },
      {
        id: "speak_rega",
        type: "interact",
        text: "Speak with Rega the baker",
        target: "rega"
      }
    ],

    dialogue: {
      intro: "The village wants to meet you. Rega especially - she's been asking about the stranger.",
      progress: "Have you met everyone? Rega is by the ovens.",
      complete: "You're one of us now. Dawnmere takes care of its own."
    },

    rewards: {
      xp: 35,
      gold: 5,
      lessonsUnlocked: ["lesson_3", "lesson_4"], // -ment pattern, -able/-ible
      items: ["bread"],
      reputation: { dawnmere: 15 }
    }
  },

  ms_1_03_choose_your_path: {
    id: "ms_1_03_choose_your_path",
    name: "Choose Your Path",
    zone: "dawnmere",
    zoneOrder: 3,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 2,
    prerequisites: ["ms_1_02_words_of_welcome"],

    chainId: "main_story",
    chainOrder: 3,
    chainNext: "ms_1_04_a_place_to_belong",

    description: "Brother Varek says every soul must find their calling. What will yours be?",

    objectives: [
      {
        id: "speak_varek",
        type: "interact",
        text: "Speak with Brother Varek",
        target: "brother_varek"
      },
      {
        id: "choose_class",
        type: "task",
        text: "Choose your path",
        target: 1,
        triggersClassSelection: true
      }
    ],

    dialogue: {
      intro: "Every person who comes to Dawnmere must decide who they wish to become. The shrine awaits.",
      progress: "Take your time. This choice shapes your journey.",
      complete: "Your path is set. May it lead you to truth."
    },

    rewards: {
      xp: 50,
      gold: 10,
      grammarUnlock: "etre", // Unlocks être lessons with Sage Aldric
      spellbookUnlock: ["etre"],
      reputation: { dawnmere: 20, order_of_dawn: 10 }
    }
  },

  ms_1_04_a_place_to_belong: {
    id: "ms_1_04_a_place_to_belong",
    name: "A Place to Belong",
    zone: "dawnmere",
    zoneOrder: 4,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 2,
    prerequisites: ["ms_1_03_choose_your_path"],

    chainId: "main_story",
    chainOrder: 4,
    chainNext: "ms_1_05_trouble_in_the_fields",

    description: "The village needs every able hand. Help establish your place here.",

    objectives: [
      {
        id: "help_build",
        type: "task",
        text: "Help with village work",
        target: 3
      },
      {
        id: "speak_tommen",
        type: "interact",
        text: "Speak with Tommen",
        target: "tommen"
      }
    ],

    dialogue: {
      intro: "We're building something here. A new start for all of us. Will you help?",
      progress: "The work continues. Every contribution matters.",
      complete: "You've earned your place. This is your home now, if you want it."
    },

    rewards: {
      xp: 45,
      gold: 15,
      lessonsUnlocked: ["lesson_5", "lesson_6"], // Near cognates, -ique pattern
      grammarUnlock: "avoir",
      spellbookUnlock: ["avoir"],
      reputation: { dawnmere: 25 }
    }
  },

  ms_1_05_trouble_in_the_fields: {
    id: "ms_1_05_trouble_in_the_fields",
    name: "Trouble in the Fields",
    zone: "dawnmere",
    zoneOrder: 5,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 2,
    prerequisites: ["ms_1_04_a_place_to_belong"],

    chainId: "main_story",
    chainOrder: 5,
    chainNext: "ms_1_06_the_bakers_trust",

    description: "Something is attacking the crops at night. The village needs a defender.",

    objectives: [
      {
        id: "investigate",
        type: "exploration",
        text: "Investigate the damaged fields",
        target: 1
      },
      {
        id: "defeat_slimes",
        type: "combat",
        text: "Defeat the slimes",
        target: 5
      },
      {
        id: "report_urma",
        type: "interact",
        text: "Report to Urma",
        target: "urma"
      }
    ],

    dialogue: {
      intro: "Something's been at the crops. We can't afford to lose our harvest.",
      progress: "Be careful out there. We don't know what we're dealing with.",
      complete: "Slimes. Harmless enough alone, but they'll strip a field bare if left unchecked. Thank you."
    },

    rewards: {
      xp: 60,
      gold: 20,
      items: ["copper_dagger"],
      reputation: { dawnmere: 30 }
    }
  },

  ms_1_06_the_bakers_trust: {
    id: "ms_1_06_the_bakers_trust",
    name: "The Baker's Trust",
    zone: "dawnmere",
    zoneOrder: 6,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_05_trouble_in_the_fields"],

    chainId: "main_story",
    chainOrder: 6,
    chainNext: "ms_1_07_the_shrines_keeper",

    description: "Rega needs help with something she can't ask anyone else.",

    objectives: [
      {
        id: "speak_rega_private",
        type: "interact",
        text: "Speak with Rega privately",
        target: "rega"
      },
      {
        id: "complete_task",
        type: "task",
        text: "Complete Rega's request",
        target: 1
      }
    ],

    dialogue: {
      intro: "Rega's been looking for you. Says it's private.",
      progress: "Please... I need someone I can trust.",
      complete: "I knew I could count on you. Here - fresh from the oven. And... thank you."
    },

    rewards: {
      xp: 55,
      gold: 15,
      lessonsUnlocked: ["lesson_7"], // Sound-alikes
      grammarUnlock: "gender",
      spellbookUnlock: ["articles", "gender"],
      items: ["regas_special_bread"],
      reputation: { dawnmere: 25 }
    }
  },

  ms_1_07_the_shrines_keeper: {
    id: "ms_1_07_the_shrines_keeper",
    name: "The Shrine's Keeper",
    zone: "dawnmere",
    zoneOrder: 7,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_06_the_bakers_trust"],

    chainId: "main_story",
    chainOrder: 7,
    chainNext: "ms_1_08_echoes_of_before",

    description: "Brother Varek tends the shrine alone. He seems troubled.",

    objectives: [
      {
        id: "visit_shrine",
        type: "exploration",
        text: "Visit the shrine",
        target: 1
      },
      {
        id: "speak_varek_troubled",
        type: "interact",
        text: "Speak with Brother Varek",
        target: "brother_varek"
      },
      {
        id: "help_shrine",
        type: "task",
        text: "Help tend the shrine",
        target: 1
      }
    ],

    dialogue: {
      intro: "The brother at the shrine... he hasn't been himself lately.",
      progress: "The light should bring comfort. Why does it feel so cold?",
      complete: "Thank you for listening. Some burdens are easier shared. The old texts speak of shadows returning... but surely those are just stories."
    },

    rewards: {
      xp: 50,
      gold: 10,
      lessonsUnlocked: ["lesson_8"], // Essential greetings
      items: ["prayer_beads"],
      reputation: { dawnmere: 20, order_of_dawn: 25 }
    }
  },

  ms_1_08_echoes_of_before: {
    id: "ms_1_08_echoes_of_before",
    name: "Echoes of Before",
    zone: "dawnmere",
    zoneOrder: 8,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 4,
    prerequisites: ["ms_1_07_the_shrines_keeper"],

    chainId: "main_story",
    chainOrder: 8,
    chainNext: "ms_1_09_darkness_at_the_edge",

    description: "Old Jorel remembers things others have forgotten. He wants to talk.",

    objectives: [
      {
        id: "find_jorel",
        type: "interact",
        text: "Find Old Jorel",
        target: "old_jorel"
      },
      {
        id: "listen_stories",
        type: "task",
        text: "Listen to his stories",
        target: 1
      }
    ],

    dialogue: {
      intro: "Old Jorel's been asking for you. Says he has something to tell.",
      progress: "Sit, sit. Let an old man ramble a while.",
      complete: "The king's two sons... the war that 'never happened'... the shadows that walked... Remember what I've told you. The truth has a way of surfacing."
    },

    rewards: {
      xp: 65,
      gold: 5,
      loreUnlock: ["founding_hint", "war_hint"],
      reputation: { dawnmere: 15 }
    }
  },

  ms_1_09_darkness_at_the_edge: {
    id: "ms_1_09_darkness_at_the_edge",
    name: "Darkness at the Edge",
    zone: "dawnmere",
    zoneOrder: 9,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 4,
    prerequisites: ["ms_1_08_echoes_of_before"],

    chainId: "main_story",
    chainOrder: 9,
    chainNext: "ms_1_10_the_road_north",

    description: "Something darker than slimes lurks at the village edge. The night watch needs help.",

    objectives: [
      {
        id: "join_watch",
        type: "task",
        text: "Join the night watch",
        target: 1
      },
      {
        id: "defeat_threat",
        type: "combat",
        text: "Defeat the shadow creature",
        target: 1
      },
      {
        id: "report_threat",
        type: "interact",
        text: "Report to Urma",
        target: "urma"
      }
    ],

    dialogue: {
      intro: "The night watch saw something. Something that wasn't slimes.",
      progress: "Stay alert. It comes when the moon is hidden.",
      complete: "A shadow creature... here? This is wrong. These things shouldn't exist anymore. You need to speak with someone who knows more - there's a sage in the Haari Fields."
    },

    rewards: {
      xp: 80,
      gold: 25,
      items: ["shadow_essence"],
      reputation: { dawnmere: 35 }
    }
  },

  ms_1_10_the_road_north: {
    id: "ms_1_10_the_road_north",
    name: "The Road North",
    zone: "dawnmere",
    zoneOrder: 10,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 5,
    prerequisites: ["ms_1_09_darkness_at_the_edge"],

    chainId: "main_story",
    chainOrder: 10,
    chainNext: "ms_2_01_golden_welcome",

    description: "Answers lie beyond Dawnmere. The Haari Fields await.",

    objectives: [
      {
        id: "prepare_journey",
        type: "task",
        text: "Prepare for the journey",
        target: 1
      },
      {
        id: "say_farewells",
        type: "meet",
        text: "Say farewell to the villagers",
        target: 3
      },
      {
        id: "leave_dawnmere",
        type: "exploration",
        text: "Take the road north",
        target: 1
      }
    ],

    dialogue: {
      intro: "If you want answers, you'll need to leave. The sage Aldric lives in the Haari Fields. He may know what these shadows mean.",
      progress: "Don't leave without saying goodbye. These people care about you.",
      complete: "The road is long, but you won't travel it alone. Dawnmere will be here when you return. Now go - find the truth."
    },

    rewards: {
      xp: 100,
      gold: 50,
      items: ["travelers_pack", "dawnmere_token"],
      zoneUnlock: "haari_fields",
      zoneExamUnlock: "dawnmere_exam",
      reputation: { dawnmere: 50 }
    }
  },

  // =====================================================
  // ZONE 2: HAARI FIELDS (Levels 5-10)
  // Theme: "The Growing Shadow" - Hard work, first hints of corruption
  // Unlocks: Lessons 9-16 (~200 words)
  // Grammar: Regular verbs, aller, faire, negation, questions
  // =====================================================

  ms_2_01_golden_welcome: {
    id: "ms_2_01_golden_welcome",
    name: "Golden Welcome",
    zone: "haari_fields",
    zoneOrder: 1,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 5,
    prerequisites: ["ms_1_10_the_road_north"],

    chainId: "main_story",
    chainOrder: 11,
    chainNext: "ms_2_02_hands_in_the_dirt",

    description: "The golden fields stretch before you. A farmer waves you over.",

    objectives: [
      {
        id: "arrive_fields",
        type: "exploration",
        text: "Arrive at the Haari Fields",
        target: 1
      },
      {
        id: "meet_dave",
        type: "interact",
        text: "Speak with Dave",
        target: "dave"
      }
    ],

    dialogue: {
      intro: null, // Continues from previous
      progress: "The fields are just ahead. Someone's waving.",
      complete: "Welcome to the Haari Fields! Always good to see a new face. Looking for work, or just passing through? Either way, you'll find what you need here."
    },

    rewards: {
      xp: 60,
      gold: 10,
      lessonsUnlocked: ["lesson_9"], // Le and La
      reputation: { haari_fields: 15 }
    }
  },

  ms_2_02_hands_in_the_dirt: {
    id: "ms_2_02_hands_in_the_dirt",
    name: "Hands in the Dirt",
    zone: "haari_fields",
    zoneOrder: 2,

    type: "main",
    category: "gathering",
    status: "locked",

    levelRequired: 5,
    prerequisites: ["ms_2_01_golden_welcome"],

    chainId: "main_story",
    chainOrder: 12,
    chainNext: "ms_2_03_the_herbalists_gift",

    description: "Dave could use help with the harvest. Hard work, but honest.",

    objectives: [
      {
        id: "help_harvest",
        type: "gathering",
        text: "Help with the harvest",
        target: 10
      },
      {
        id: "deliver_crops",
        type: "deliver",
        text: "Deliver crops to the storehouse",
        target: 1
      }
    ],

    dialogue: {
      intro: "Harvest season waits for no one. Care to lend a hand?",
      progress: "Good work! Just a bit more to go.",
      complete: "You've got farmer's hands now, whether you wanted them or not. Here's your share."
    },

    rewards: {
      xp: 70,
      gold: 25,
      lessonsUnlocked: ["lesson_10"], // Family
      grammarUnlock: "regular_er",
      spellbookUnlock: ["regular_er_pattern"],
      items: ["harvest_bundle"],
      reputation: { haari_fields: 20 }
    }
  },

  ms_2_03_the_herbalists_gift: {
    id: "ms_2_03_the_herbalists_gift",
    name: "The Herbalist's Gift",
    zone: "haari_fields",
    zoneOrder: 3,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 6,
    prerequisites: ["ms_2_02_hands_in_the_dirt"],

    chainId: "main_story",
    chainOrder: 13,
    chainNext: "ms_2_04_songs_on_the_wind",

    description: "Lyra tends a garden of rare herbs. She's particular about who she teaches.",

    objectives: [
      {
        id: "find_lyra",
        type: "interact",
        text: "Find Lyra's garden",
        target: "lyra"
      },
      {
        id: "prove_worth",
        type: "task",
        text: "Prove your dedication",
        target: 1
      }
    ],

    dialogue: {
      intro: "There's a herbalist on the eastern edge. Keeps to herself, but knows things others don't.",
      progress: "Plants require patience. So do I.",
      complete: "You have steady hands and a quiet mind. I can work with that. Come back when you're ready to learn."
    },

    rewards: {
      xp: 65,
      gold: 15,
      lessonsUnlocked: ["lesson_11"], // -eur pattern
      grammarUnlock: "regular_ir",
      spellbookUnlock: ["regular_ir_pattern"],
      alchemyUnlock: true,
      reputation: { haari_fields: 20, horticulturists: 25 }
    }
  },

  ms_2_04_songs_on_the_wind: {
    id: "ms_2_04_songs_on_the_wind",
    name: "Songs on the Wind",
    zone: "haari_fields",
    zoneOrder: 4,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 6,
    prerequisites: ["ms_2_03_the_herbalists_gift"],

    chainId: "main_story",
    chainOrder: 14,
    chainNext: "ms_2_05_the_trackers_eye",

    description: "A bard camps by the roadside. His songs carry further than the wind.",

    objectives: [
      {
        id: "find_venn",
        type: "interact",
        text: "Meet the bard",
        target: "venn"
      },
      {
        id: "listen_song",
        type: "task",
        text: "Listen to his song",
        target: 1
      }
    ],

    dialogue: {
      intro: "Hear that music? A traveling bard. They always know more than they let on.",
      progress: "Every song is a story. Every story holds truth.",
      complete: "Ah, a listener! So rare these days. I sing of heroes and villains, but the real stories? Those I only share with friends."
    },

    rewards: {
      xp: 55,
      gold: 10,
      lessonsUnlocked: ["lesson_12"], // -té pattern
      loreUnlock: ["songs_of_war"],
      reputation: { haari_fields: 15 }
    }
  },

  ms_2_05_the_trackers_eye: {
    id: "ms_2_05_the_trackers_eye",
    name: "The Tracker's Eye",
    zone: "haari_fields",
    zoneOrder: 5,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 7,
    prerequisites: ["ms_2_04_songs_on_the_wind"],

    chainId: "main_story",
    chainOrder: 15,
    chainNext: "ms_2_06_the_sage_speaks",

    description: "Rask knows every trail and track in the fields. He's noticed something wrong.",

    objectives: [
      {
        id: "find_rask",
        type: "interact",
        text: "Find Rask",
        target: "rask"
      },
      {
        id: "learn_tracking",
        type: "task",
        text: "Learn to read the signs",
        target: 1
      },
      {
        id: "follow_trail",
        type: "exploration",
        text: "Follow the strange trail",
        target: 1
      }
    ],

    dialogue: {
      intro: "Rask's been acting strange. Says there are tracks that don't belong.",
      progress: "See here - the grass bends wrong. Something passed that shouldn't exist.",
      complete: "You learn quick. Those tracks... they lead toward the standing stones. Something old is waking up."
    },

    rewards: {
      xp: 75,
      gold: 20,
      lessonsUnlocked: ["lesson_13"], // -eux pattern
      grammarUnlock: "regular_re",
      spellbookUnlock: ["regular_re_pattern"],
      reputation: { haari_fields: 25 }
    }
  },

  ms_2_06_the_sage_speaks: {
    id: "ms_2_06_the_sage_speaks",
    name: "The Sage Speaks",
    zone: "haari_fields",
    zoneOrder: 6,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 7,
    prerequisites: ["ms_2_05_the_trackers_eye"],

    chainId: "main_story",
    chainOrder: 16,
    chainNext: "ms_2_07_the_blight_begins",

    description: "Sage Aldric has been expecting you. He knows why you've come.",

    objectives: [
      {
        id: "find_aldric",
        type: "interact",
        text: "Find Sage Aldric",
        target: "sage_aldric"
      },
      {
        id: "share_knowledge",
        type: "task",
        text: "Share what you've learned",
        target: 1
      }
    ],

    dialogue: {
      intro: "The sage lives near the standing stones. If anyone knows about shadow creatures, it's him.",
      progress: "Tell me everything. Every detail matters.",
      complete: "Shadow creatures in Dawnmere... strange tracks here... the old magic stirs. I had hoped I was wrong. The patterns of language are not just words - they are power. Learn them well. You will need them."
    },

    rewards: {
      xp: 80,
      gold: 15,
      lessonsUnlocked: ["lesson_14"], // Numbers
      grammarUnlock: "aller",
      spellbookUnlock: ["aller"],
      reputation: { haari_fields: 20 }
    }
  },

  ms_2_07_the_blight_begins: {
    id: "ms_2_07_the_blight_begins",
    name: "The Blight Begins",
    zone: "haari_fields",
    zoneOrder: 7,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 8,
    prerequisites: ["ms_2_06_the_sage_speaks"],

    chainId: "main_story",
    chainOrder: 17,
    chainNext: "ms_2_08_night_terrors",

    description: "Dave's crops are dying. Lyra's herbs wither. Something poisons the land.",

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
        text: "Collect samples of the blight",
        target: 5
      },
      {
        id: "bring_lyra",
        type: "deliver",
        text: "Bring samples to Lyra",
        target: "lyra"
      }
    ],

    dialogue: {
      intro: "The crops... they're turning black. This isn't natural.",
      progress: "Gather what you can. I need to see what we're dealing with.",
      complete: "This is dark magic. Old magic. The kind they said was destroyed after the war. Someone lied."
    },

    rewards: {
      xp: 85,
      gold: 25,
      lessonsUnlocked: ["lesson_15"], // Colors
      grammarUnlock: "faire",
      spellbookUnlock: ["faire"],
      reputation: { haari_fields: 30, horticulturists: 20 }
    }
  },

  ms_2_08_night_terrors: {
    id: "ms_2_08_night_terrors",
    name: "Night Terrors",
    zone: "haari_fields",
    zoneOrder: 8,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 8,
    prerequisites: ["ms_2_07_the_blight_begins"],

    chainId: "main_story",
    chainOrder: 18,
    chainNext: "ms_2_09_the_veiled_warning",

    description: "The creatures come every night now. The farmers can't hold them alone.",

    objectives: [
      {
        id: "defend_farm",
        type: "combat",
        text: "Defend the farmstead",
        target: 8
      },
      {
        id: "protect_farmers",
        type: "task",
        text: "Keep the farmers safe",
        target: 1
      }
    ],

    dialogue: {
      intro: "They come when the sun sets. We need fighters.",
      progress: "Hold the line! Don't let them reach the barn!",
      complete: "We survived, but they'll be back. More each night. We need to stop this at the source."
    },

    rewards: {
      xp: 90,
      gold: 30,
      lessonsUnlocked: ["lesson_16"], // Days
      grammarUnlock: "negation",
      spellbookUnlock: ["negation"],
      items: ["shadow_fang"],
      reputation: { haari_fields: 35 }
    }
  },

  ms_2_09_the_veiled_warning: {
    id: "ms_2_09_the_veiled_warning",
    name: "The Veiled Warning",
    zone: "haari_fields",
    zoneOrder: 9,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 9,
    prerequisites: ["ms_2_08_night_terrors"],

    chainId: "main_story",
    chainOrder: 19,
    chainNext: "ms_2_10_corruption_confirmed",

    description: "A cloaked figure has been watching you. Tonight, they reveal themselves.",

    objectives: [
      {
        id: "wait_nightfall",
        type: "task",
        text: "Wait for nightfall",
        target: 1
      },
      {
        id: "meet_veiled",
        type: "interact",
        text: "Meet the Veiled One",
        target: "the_veiled_one"
      }
    ],

    dialogue: {
      intro: "Someone's been following you. Watching. Waiting.",
      progress: "Come alone. Where the shadows are deepest.",
      complete: "You see what others refuse to see. The blight is only the beginning. The seals are breaking. What was buried is rising. And the one who calls himself king... he knows. He has always known."
    },

    rewards: {
      xp: 100,
      gold: 20,
      grammarUnlock: "questions",
      spellbookUnlock: ["questions"],
      loreUnlock: ["veiled_revelation"],
      reputation: { haari_fields: 25 }
    }
  },

  ms_2_10_corruption_confirmed: {
    id: "ms_2_10_corruption_confirmed",
    name: "Corruption Confirmed",
    zone: "haari_fields",
    zoneOrder: 10,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 10,
    prerequisites: ["ms_2_09_the_veiled_warning"],

    chainId: "main_story",
    chainOrder: 20,
    chainNext: "ms_3_01_the_gates_of_gold",

    description: "The standing stones hold answers. But answers come at a cost.",

    objectives: [
      {
        id: "go_stones",
        type: "exploration",
        text: "Go to the standing stones",
        target: 1
      },
      {
        id: "witness_truth",
        type: "task",
        text: "Witness the truth",
        target: 1
      },
      {
        id: "report_aldric",
        type: "interact",
        text: "Report to Sage Aldric",
        target: "sage_aldric"
      }
    ],

    dialogue: {
      intro: "The Veiled One spoke of seals. The standing stones are ancient seals. Go. See for yourself.",
      progress: "The stone... it's cracked. Something's leaking through.",
      complete: "So it's true. The old magic returns. The answers you seek are in Lurenium - in the archives they pretend don't exist. Go. Find the truth they've hidden. And be careful who you trust."
    },

    rewards: {
      xp: 120,
      gold: 50,
      items: ["seal_fragment", "aldrics_letter"],
      zoneUnlock: "lurenium",
      zoneExamUnlock: "haari_fields_exam",
      reputation: { haari_fields: 50 }
    }
  }

  // =====================================================
  // ZONE 3: LURENIUM (Levels 10-18)
  // Theme: "The Golden Lies" - Civilization's facade, hidden truths
  // Unlocks: Lessons 17-28 (~300 words)
  // Grammar: Passé composé (avoir + être), irregular verbs
  // =====================================================

  ms_3_01_the_gates_of_gold: {
    id: "ms_3_01_the_gates_of_gold",
    name: "The Gates of Gold",
    zone: "lurenium",
    zoneOrder: 1,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 10,
    prerequisites: ["ms_2_10_corruption_confirmed"],

    chainId: "main_story",
    chainOrder: 21,
    chainNext: "ms_3_02_the_archivists_task",

    description: "The ancient city rises before you. Its golden walls hide centuries of secrets.",

    objectives: [
      {
        id: "enter_lurenium",
        type: "exploration",
        text: "Enter Lurenium",
        target: 1
      },
      {
        id: "present_letter",
        type: "interact",
        text: "Present Aldric's letter to the gate captain",
        target: "captain_varro"
      }
    ],

    dialogue: {
      intro: null,
      progress: "State your business in Lurenium.",
      complete: "Aldric sent you? The old sage still meddles in things best left alone. Very well - you may enter. But watch yourself. This city has eyes everywhere."
    },

    rewards: {
      xp: 100,
      gold: 30,
      lessonsUnlocked: ["lesson_17"], // Essential verbs
      grammarUnlock: "passe_compose_avoir",
      spellbookUnlock: ["passe_compose"],
      reputation: { lurenium: 10 }
    }
  },

  ms_3_02_the_archivists_task: {
    id: "ms_3_02_the_archivists_task",
    name: "The Archivist's Task",
    zone: "lurenium",
    zoneOrder: 2,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 11,
    prerequisites: ["ms_3_01_the_gates_of_gold"],

    chainId: "main_story",
    chainOrder: 22,
    chainNext: "ms_3_03_law_and_order",

    description: "Archivist Thelon guards the city's knowledge. He may know what you seek.",

    objectives: [
      {
        id: "find_archives",
        type: "exploration",
        text: "Find the Grand Archives",
        target: 1
      },
      {
        id: "speak_thelon",
        type: "interact",
        text: "Speak with Archivist Thelon",
        target: "archivist_thelon"
      },
      {
        id: "complete_task",
        type: "task",
        text: "Complete his request",
        target: 1
      }
    ],

    dialogue: {
      intro: "The archives are in the old quarter. Ask for Thelon - if he'll see you.",
      progress: "Knowledge must be earned. Prove you're worth my time.",
      complete: "Interesting. You seek records of the Sundering War. Those exist... in theory. But access requires trust. Earn favor with the Magistrate first."
    },

    rewards: {
      xp: 110,
      gold: 25,
      lessonsUnlocked: ["lesson_18"], // Food cognates
      reputation: { lurenium: 15, see_of_lurenium: 10 }
    }
  },

  ms_3_03_law_and_order: {
    id: "ms_3_03_law_and_order",
    name: "Law and Order",
    zone: "lurenium",
    zoneOrder: 3,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 12,
    prerequisites: ["ms_3_02_the_archivists_task"],

    chainId: "main_story",
    chainOrder: 23,
    chainNext: "ms_3_04_coin_and_trade",

    description: "Magistrate Corinne keeps order in Lurenium. Her favor opens doors.",

    objectives: [
      {
        id: "meet_magistrate",
        type: "interact",
        text: "Meet with Magistrate Corinne",
        target: "magistrate_corinne"
      },
      {
        id: "resolve_dispute",
        type: "task",
        text: "Help resolve a trade dispute",
        target: 1
      }
    ],

    dialogue: {
      intro: "The Magistrate holds court in the Hall of Justice. She values results over words.",
      progress: "Justice requires precision. Find the truth.",
      complete: "Efficiently done. You have a useful mind. The archives will be made available to you - to a point. Some records remain sealed by royal decree."
    },

    rewards: {
      xp: 120,
      gold: 40,
      lessonsUnlocked: ["lesson_19"], // Body parts
      grammarUnlock: "passe_compose_etre",
      spellbookUnlock: ["passe_compose_etre"],
      reputation: { lurenium: 25, old_guard: 15 }
    }
  },

  ms_3_04_coin_and_trade: {
    id: "ms_3_04_coin_and_trade",
    name: "Coin and Trade",
    zone: "lurenium",
    zoneOrder: 4,

    type: "main",
    category: "commerce",
    status: "locked",

    levelRequired: 13,
    prerequisites: ["ms_3_03_law_and_order"],

    chainId: "main_story",
    chainOrder: 24,
    chainNext: "ms_3_05_the_temples_light",

    description: "Lurenium thrives on trade. The merchant guilds hold power here.",

    objectives: [
      {
        id: "visit_market",
        type: "exploration",
        text: "Explore the Grand Market",
        target: 1
      },
      {
        id: "meet_liselle",
        type: "interact",
        text: "Meet merchant Liselle",
        target: "merchant_liselle"
      },
      {
        id: "trade_task",
        type: "task",
        text: "Complete a trade run",
        target: 1
      }
    ],

    dialogue: {
      intro: "The market is the city's heart. Gold flows through it like blood.",
      progress: "A fair deal benefits both parties. Remember that.",
      complete: "You understand commerce. Good. The guilds keep records too - trade manifests, shipping logs. Some tell stories the archives won't."
    },

    rewards: {
      xp: 115,
      gold: 60,
      lessonsUnlocked: ["lesson_20"], // Weather
      items: ["merchant_token"],
      reputation: { lurenium: 20 }
    }
  },

  ms_3_05_the_temples_light: {
    id: "ms_3_05_the_temples_light",
    name: "The Temple's Light",
    zone: "lurenium",
    zoneOrder: 5,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 14,
    prerequisites: ["ms_3_04_coin_and_trade"],

    chainId: "main_story",
    chainOrder: 25,
    chainNext: "ms_3_06_the_captains_honor",

    description: "Brother Cassius tends the great temple. The church knows much it doesn't share.",

    objectives: [
      {
        id: "visit_temple",
        type: "exploration",
        text: "Visit the Temple of Light",
        target: 1
      },
      {
        id: "speak_cassius",
        type: "interact",
        text: "Speak with Brother Cassius",
        target: "brother_cassius"
      },
      {
        id: "temple_service",
        type: "task",
        text: "Assist with temple duties",
        target: 1
      }
    ],

    dialogue: {
      intro: "The temple stands at the city's center. They say the priests keep the old prayers.",
      progress: "Faith is service. Serve, and understanding follows.",
      complete: "You carry light within you. The church records speak of a schism, long ago. Brothers who turned to shadow. We were told they were destroyed. But shadows don't die - they hide."
    },

    rewards: {
      xp: 125,
      gold: 35,
      lessonsUnlocked: ["lesson_21"],
      grammarUnlock: "prendre_venir",
      spellbookUnlock: ["prendre", "venir"],
      reputation: { lurenium: 20, order_of_dawn: 30 }
    }
  },

  ms_3_06_the_captains_honor: {
    id: "ms_3_06_the_captains_honor",
    name: "The Captain's Honor",
    zone: "lurenium",
    zoneOrder: 6,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 15,
    prerequisites: ["ms_3_05_the_temples_light"],

    chainId: "main_story",
    chainOrder: 26,
    chainNext: "ms_3_07_whispers_in_stone",

    description: "Captain Varro has a task only an outsider can perform.",

    objectives: [
      {
        id: "summons_varro",
        type: "interact",
        text: "Answer Captain Varro's summons",
        target: "captain_varro"
      },
      {
        id: "investigate_smugglers",
        type: "combat",
        text: "Investigate the smuggling ring",
        target: 5
      },
      {
        id: "report_findings",
        type: "interact",
        text: "Report your findings",
        target: "captain_varro"
      }
    ],

    dialogue: {
      intro: "The captain has requested you specifically. He doesn't do that lightly.",
      progress: "No uniforms. No questions. Just results.",
      complete: "Clean work. These smugglers were moving more than contraband - they carried sealed documents. Old documents. Someone is collecting proof of... something. Keep this between us."
    },

    rewards: {
      xp: 140,
      gold: 50,
      lessonsUnlocked: ["lesson_22"],
      grammarUnlock: "voir_pouvoir",
      spellbookUnlock: ["voir", "pouvoir"],
      items: ["sealed_document"],
      reputation: { lurenium: 30, old_guard: 25 }
    }
  },

  ms_3_07_whispers_in_stone: {
    id: "ms_3_07_whispers_in_stone",
    name: "Whispers in Stone",
    zone: "lurenium",
    zoneOrder: 7,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 16,
    prerequisites: ["ms_3_06_the_captains_honor"],

    chainId: "main_story",
    chainOrder: 27,
    chainNext: "ms_3_08_the_sealed_archives",

    description: "The ancient foundation stones bear markings older than Lurenium itself.",

    objectives: [
      {
        id: "find_foundations",
        type: "exploration",
        text: "Find the ancient foundation stones",
        target: 1
      },
      {
        id: "study_markings",
        type: "task",
        text: "Study the markings",
        target: 1
      },
      {
        id: "discover_artifact",
        type: "collect",
        text: "Discover what's hidden",
        target: 1
      }
    ],

    dialogue: {
      intro: "Old Jorel spoke of things buried. Lurenium was built on older ruins. Much older.",
      progress: "These symbols... they're a warning. Or a seal.",
      complete: "An artifact from before the founding. The same symbols as the standing stones in the fields. Someone built seals across the entire land. And someone is breaking them."
    },

    rewards: {
      xp: 135,
      gold: 45,
      lessonsUnlocked: ["lesson_23"],
      grammarUnlock: "devoir_vouloir",
      spellbookUnlock: ["devoir", "vouloir"],
      items: ["ancient_seal_fragment"],
      loreUnlock: ["ancient_seals"],
      reputation: { lurenium: 25 }
    }
  },

  ms_3_08_the_sealed_archives: {
    id: "ms_3_08_the_sealed_archives",
    name: "The Sealed Archives",
    zone: "lurenium",
    zoneOrder: 8,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 17,
    prerequisites: ["ms_3_07_whispers_in_stone"],

    chainId: "main_story",
    chainOrder: 28,
    chainNext: "ms_3_09_cracks_in_gold",

    description: "Thelon finally grants access to the sealed records. What will you find?",

    objectives: [
      {
        id: "return_thelon",
        type: "interact",
        text: "Return to Archivist Thelon",
        target: "archivist_thelon"
      },
      {
        id: "enter_sealed",
        type: "exploration",
        text: "Enter the sealed archives",
        target: 1
      },
      {
        id: "research_war",
        type: "task",
        text: "Research the Sundering War",
        target: 1
      }
    ],

    dialogue: {
      intro: "You've earned enough favor. Thelon will see you now.",
      progress: "These records were sealed by royal command. Read carefully.",
      complete: "The official history speaks of Hermeau the Savior defeating dark forces. But these records... they speak of two brothers. Both wielding magic. And the 'dark forces' came from within the kingdom, not outside it."
    },

    rewards: {
      xp: 150,
      gold: 40,
      lessonsUnlocked: ["lesson_24"],
      grammarUnlock: "savoir_connaitre",
      spellbookUnlock: ["savoir", "connaitre"],
      loreUnlock: ["war_truth_partial"],
      reputation: { lurenium: 30, see_of_lurenium: 35 }
    }
  },

  ms_3_09_cracks_in_gold: {
    id: "ms_3_09_cracks_in_gold",
    name: "Cracks in Gold",
    zone: "lurenium",
    zoneOrder: 9,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 17,
    prerequisites: ["ms_3_08_the_sealed_archives"],

    chainId: "main_story",
    chainOrder: 29,
    chainNext: "ms_3_10_the_kings_two_sons",

    description: "The contradictions pile up. Someone has been rewriting history.",

    objectives: [
      {
        id: "compare_records",
        type: "task",
        text: "Compare official and sealed records",
        target: 1
      },
      {
        id: "find_discrepancy",
        type: "task",
        text: "Document the discrepancies",
        target: 3
      },
      {
        id: "confront_thelon",
        type: "interact",
        text: "Confront Thelon with evidence",
        target: "archivist_thelon"
      }
    ],

    dialogue: {
      intro: "Something doesn't add up. The dates, the names, the battles - they've been changed.",
      progress: "Look closer. The truth hides in the margins.",
      complete: "You've found it. The erasures, the rewrites. Yes, I knew. We all knew. But speaking truth to power has consequences. The king's historians 'corrected' the records generations ago. The true history survives only in fragments - scattered, hidden, waiting."
    },

    rewards: {
      xp: 145,
      gold: 50,
      lessonsUnlocked: ["lesson_25"],
      loreUnlock: ["history_rewritten"],
      reputation: { lurenium: 25, see_of_lurenium: 40 }
    }
  },

  ms_3_10_the_kings_two_sons: {
    id: "ms_3_10_the_kings_two_sons",
    name: "The King's Two Sons",
    zone: "lurenium",
    zoneOrder: 10,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 18,
    prerequisites: ["ms_3_09_cracks_in_gold"],

    chainId: "main_story",
    chainOrder: 30,
    chainNext: "ms_4_01_city_divided",

    description: "The truth about Hermeau and Layne begins to emerge.",

    objectives: [
      {
        id: "gather_fragments",
        type: "collect",
        text: "Gather the scattered truth",
        target: 3
      },
      {
        id: "piece_together",
        type: "task",
        text: "Piece together what happened",
        target: 1
      },
      {
        id: "decision",
        type: "task",
        text: "Decide what to do with this knowledge",
        target: 1
      }
    ],

    dialogue: {
      intro: "Fragments of truth from archives, temples, and merchant records. Time to see the whole picture.",
      progress: "Two brothers. One throne. And magic that should never have been used.",
      complete: "Hermeau didn't defeat the darkness - he wielded it. Layne tried to stop him and was exiled for his trouble. The 'hero' is the villain. The 'traitor' was the only one who saw the truth. And now, the seals Layne helped create are breaking. You need to find his descendants - they survive in hiding. Go to the Moorings. Find the exiles' network."
    },

    rewards: {
      xp: 180,
      gold: 75,
      lessonsUnlocked: ["lesson_26", "lesson_27", "lesson_28"],
      items: ["exiles_cipher", "lurenium_token"],
      zoneUnlock: "ingregaard",
      zoneExamUnlock: "lurenium_exam",
      loreUnlock: ["brothers_truth"],
      reputation: { lurenium: 40 }
    }
  },

  // =====================================================
  // ZONE 4: INGREGAARD CITY (Levels 15-22)
  // Theme: "The Divided City" - Faction tension, choosing sides, political intrigue
  // Unlocks: Lessons 29-38 (~250 words)
  // Grammar: Imparfait introduction, comparisons
  //
  // Sub-areas:
  //   - Highbridge (quests 1-3): Loyalist territory, official perspective
  //   - The River Crossing (quests 4-6): Neutral ground, meeting both sides
  //   - Lowbridge (quests 7-10): Old Guard contacts, resistance beginnings
  // =====================================================

  ms_4_01_city_divided: {
    id: "ms_4_01_city_divided",
    name: "City Divided",
    zone: "ingregaard",
    subzone: "highbridge",
    zoneOrder: 1,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 15,
    prerequisites: ["ms_3_10_the_kings_two_sons"],

    chainId: "main_story",
    chainOrder: 31,
    chainNext: "ms_4_02_the_golden_order",

    description: "Ingregaard rises before you - a city split in two by more than just a river.",

    objectives: [
      {
        id: "enter_city",
        type: "exploration",
        text: "Enter Ingregaard through the northern gate",
        target: 1
      },
      {
        id: "observe_highbridge",
        type: "exploration",
        text: "Explore Highbridge district",
        target: 1
      },
      {
        id: "notice_divide",
        type: "task",
        text: "Observe the divide between the banks",
        target: 1
      }
    ],

    dialogue: {
      intro: null,
      progress: "The northern bank gleams with order. But look south across the water...",
      complete: "You see it now. Red and gold banners on this side - the king's colors. Across the river, older buildings, quieter streets, blue and silver glimpsed in windows. They say the two sides haven't truly spoken in years. The bridges stand, but few cross them."
    },

    rewards: {
      xp: 130,
      gold: 35,
      lessonsUnlocked: ["lesson_29"],
      grammarUnlock: "imparfait_intro",
      spellbookUnlock: ["imparfait"],
      reputation: { ingregaard: 10 }
    }
  },

  ms_4_02_the_golden_order: {
    id: "ms_4_02_the_golden_order",
    name: "The Golden Order",
    zone: "ingregaard",
    subzone: "highbridge",
    zoneOrder: 2,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 16,
    prerequisites: ["ms_4_01_city_divided"],

    chainId: "main_story",
    chainOrder: 32,
    chainNext: "ms_4_03_cracks_in_marble",

    description: "The Loyalist magistrate welcomes you to 'civilized' Ingregaard.",

    objectives: [
      {
        id: "meet_magistrate",
        type: "interact",
        text: "Meet Magistrate Aldous",
        target: "magistrate_aldous"
      },
      {
        id: "tour_highbridge",
        type: "exploration",
        text: "Take the official tour",
        target: 1
      },
      {
        id: "hear_history",
        type: "task",
        text: "Hear the 'official' history",
        target: 1
      }
    ],

    dialogue: {
      intro: "The magistrate has heard of your arrival. He wishes to welcome you personally.",
      progress: "See how order brings prosperity? The king's peace maintains all this.",
      complete: "Highbridge prospers under the crown's protection. The south bank? Stubborn traditionalists clinging to old ways. They refuse progress, refuse unity. Dangerous ideas fester there. Best stay on this side of the river, friend."
    },

    rewards: {
      xp: 135,
      gold: 40,
      lessonsUnlocked: ["lesson_30"],
      reputation: { ingregaard: 15, loyalists: 20 }
    }
  },

  ms_4_03_cracks_in_marble: {
    id: "ms_4_03_cracks_in_marble",
    name: "Cracks in Marble",
    zone: "ingregaard",
    subzone: "highbridge",
    zoneOrder: 3,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 16,
    prerequisites: ["ms_4_02_the_golden_order"],

    chainId: "main_story",
    chainOrder: 33,
    chainNext: "ms_4_04_bridge_between_worlds",

    description: "Even in Highbridge, not everything is as perfect as it seems.",

    objectives: [
      {
        id: "explore_alleys",
        type: "exploration",
        text: "Explore beyond the main streets",
        target: 1
      },
      {
        id: "find_discontent",
        type: "meet",
        text: "Meet those who whisper",
        target: 2
      },
      {
        id: "witness_enforcement",
        type: "task",
        text: "Witness the king's 'peace' in action",
        target: 1
      }
    ],

    dialogue: {
      intro: "The magistrate showed you the façade. What lies behind it?",
      progress: "Watch. Listen. Not everyone here celebrates.",
      complete: "You saw it. The arrests for 'seditious speech.' The books burned in the square. A woman dragged away for singing an old song. The golden order is maintained by iron fists. Perhaps the south bank deserves a visit after all."
    },

    rewards: {
      xp: 140,
      gold: 45,
      lessonsUnlocked: ["lesson_31"],
      grammarUnlock: "comparisons",
      spellbookUnlock: ["comparisons"],
      loreUnlock: ["loyalist_oppression"],
      reputation: { ingregaard: 10 }
    }
  },

  ms_4_04_bridge_between_worlds: {
    id: "ms_4_04_bridge_between_worlds",
    name: "Bridge Between Worlds",
    zone: "ingregaard",
    subzone: "the_river_crossing",
    zoneOrder: 4,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 17,
    prerequisites: ["ms_4_03_cracks_in_marble"],

    chainId: "main_story",
    chainOrder: 34,
    chainNext: "ms_4_05_the_old_bridge_keeper",

    description: "Cross the river to Lowbridge - if you dare.",

    objectives: [
      {
        id: "approach_bridge",
        type: "exploration",
        text: "Approach the central bridge",
        target: 1
      },
      {
        id: "cross_river",
        type: "task",
        text: "Cross to Lowbridge",
        target: 1
      },
      {
        id: "first_impressions",
        type: "exploration",
        text: "Take in your first impressions",
        target: 1
      }
    ],

    dialogue: {
      intro: "The bridge stands empty. Guards on both sides watch, but no one crosses.",
      progress: "Each step takes you further from the king's direct gaze.",
      complete: "The air is different here. Older. The buildings sag but stand proud. People eye you with suspicion - northerners rarely visit. But they don't turn you away. Blue and silver symbols are tucked into doorframes, hidden but present. The old loyalty survives."
    },

    rewards: {
      xp: 145,
      gold: 40,
      lessonsUnlocked: ["lesson_32"],
      reputation: { ingregaard: 15, old_guard: 10 }
    }
  },

  ms_4_05_the_old_bridge_keeper: {
    id: "ms_4_05_the_old_bridge_keeper",
    name: "The Old Bridge Keeper",
    zone: "ingregaard",
    subzone: "the_river_crossing",
    zoneOrder: 5,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 17,
    prerequisites: ["ms_4_04_bridge_between_worlds"],

    chainId: "main_story",
    chainOrder: 35,
    chainNext: "ms_4_06_memories_of_unity",

    description: "An old man has watched this bridge for fifty years. He remembers when it was busy.",

    objectives: [
      {
        id: "meet_keeper",
        type: "interact",
        text: "Speak with the bridge keeper",
        target: "old_brennan"
      },
      {
        id: "hear_stories",
        type: "task",
        text: "Listen to his stories",
        target: 1
      },
      {
        id: "learn_past",
        type: "task",
        text: "Learn what the city was like before",
        target: 1
      }
    ],

    dialogue: {
      intro: "The old man sits in his booth, watching the empty bridge. He seems eager to talk.",
      progress: "In my father's day, this bridge was so crowded you could barely cross...",
      complete: "Before the war, before the divide, we were one city. North and south, rich and poor, we mingled freely. Then came the 'reforms.' Loyalty tests. Those who questioned the official story were pushed south. Families split. The bridges emptied. Now we stare across the water at our own kin and pretend they're strangers."
    },

    rewards: {
      xp: 140,
      gold: 45,
      lessonsUnlocked: ["lesson_33"],
      loreUnlock: ["city_before_divide"],
      reputation: { ingregaard: 20, old_guard: 15 }
    }
  },

  ms_4_06_memories_of_unity: {
    id: "ms_4_06_memories_of_unity",
    name: "Memories of Unity",
    zone: "ingregaard",
    subzone: "the_river_crossing",
    zoneOrder: 6,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 18,
    prerequisites: ["ms_4_05_the_old_bridge_keeper"],

    chainId: "main_story",
    chainOrder: 36,
    chainNext: "ms_4_07_lowbridge_welcome",

    description: "The bridge keeper has something to show you - if you can be trusted.",

    objectives: [
      {
        id: "earn_trust",
        type: "task",
        text: "Prove your intentions",
        target: 1
      },
      {
        id: "see_hidden",
        type: "exploration",
        text: "See what he's hidden",
        target: 1
      },
      {
        id: "understand_cost",
        type: "task",
        text: "Understand the cost of memory",
        target: 1
      }
    ],

    dialogue: {
      intro: "You've listened. You've questioned. Perhaps you're ready to see.",
      progress: "Follow me. Under the bridge, where they never look.",
      complete: "A hidden chamber under the bridge stones, filled with artifacts from before the divide. Paintings of the united city. Records of families torn apart. Names of those who 'disappeared.' The bridge keeper isn't just a watcher - he's a guardian of memory. And he's not alone."
    },

    rewards: {
      xp: 155,
      gold: 50,
      lessonsUnlocked: ["lesson_34"],
      artifactUnlock: ["divided_city_records"],
      reputation: { ingregaard: 20, old_guard: 25 }
    }
  },

  ms_4_07_lowbridge_welcome: {
    id: "ms_4_07_lowbridge_welcome",
    name: "Lowbridge Welcome",
    zone: "ingregaard",
    subzone: "lowbridge",
    zoneOrder: 7,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 19,
    prerequisites: ["ms_4_06_memories_of_unity"],

    chainId: "main_story",
    chainOrder: 37,
    chainNext: "ms_4_08_the_silver_council",

    description: "The bridge keeper's friends in Lowbridge want to meet you.",

    objectives: [
      {
        id: "follow_contact",
        type: "task",
        text: "Follow the contact into Lowbridge",
        target: 1
      },
      {
        id: "meet_resistance",
        type: "meet",
        text: "Meet the local resistance",
        target: 3
      },
      {
        id: "prove_yourself",
        type: "task",
        text: "Prove you're not a crown spy",
        target: 1
      }
    ],

    dialogue: {
      intro: "The keeper sends word ahead. Someone will meet you at the old fountain.",
      progress: "They're watching. Every stranger is suspect.",
      complete: "You passed their tests. Not a spy - just a truth-seeker. 'We've heard of you,' they say. 'The one asking questions in Lurenium. The one who found the discrepancies.' They have more to show you. But first, the council must approve."
    },

    rewards: {
      xp: 150,
      gold: 55,
      lessonsUnlocked: ["lesson_35"],
      reputation: { ingregaard: 15, old_guard: 35 }
    }
  },

  ms_4_08_the_silver_council: {
    id: "ms_4_08_the_silver_council",
    name: "The Silver Council",
    zone: "ingregaard",
    subzone: "lowbridge",
    zoneOrder: 8,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 20,
    prerequisites: ["ms_4_07_lowbridge_welcome"],

    chainId: "main_story",
    chainOrder: 38,
    chainNext: "ms_4_09_choosing_sides",

    description: "The resistance leaders of Lowbridge gather to hear what you've learned.",

    objectives: [
      {
        id: "attend_council",
        type: "task",
        text: "Attend the Silver Council",
        target: 1
      },
      {
        id: "share_knowledge",
        type: "task",
        text: "Share what you learned in Lurenium",
        target: 1
      },
      {
        id: "hear_plan",
        type: "task",
        text: "Hear their plan",
        target: 1
      }
    ],

    dialogue: {
      intro: "In a cellar beneath an old tavern, blue and silver banners hang. They've waited years for this.",
      progress: "Tell us everything. Hold nothing back.",
      complete: "Your discoveries confirm what they've believed for generations. The lies run deep. But they have connections beyond Ingregaard - to the Moorings, where exiles have built a network. To the Weald, where old magic survives. They can send you further. But first - the magistrate suspects something. He's closing the bridges."
    },

    rewards: {
      xp: 165,
      gold: 60,
      lessonsUnlocked: ["lesson_36"],
      grammarUnlock: "imparfait_usage",
      spellbookUnlock: ["imparfait_usage"],
      reputation: { ingregaard: 25, old_guard: 45 }
    }
  },

  ms_4_09_choosing_sides: {
    id: "ms_4_09_choosing_sides",
    name: "Choosing Sides",
    zone: "ingregaard",
    subzone: "lowbridge",
    zoneOrder: 9,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 21,
    prerequisites: ["ms_4_08_the_silver_council"],

    chainId: "main_story",
    chainOrder: 39,
    chainNext: "ms_4_10_the_escape",

    description: "The crown's soldiers come for Lowbridge. You must choose where you stand.",

    objectives: [
      {
        id: "warning_comes",
        type: "task",
        text: "Receive warning of the raid",
        target: 1
      },
      {
        id: "make_choice",
        type: "task",
        text: "Choose to fight or flee",
        target: 1
      },
      {
        id: "defend_escape",
        type: "combat",
        text: "Help defend the escape route",
        target: 8
      }
    ],

    dialogue: {
      intro: "Bells ring across Lowbridge. The king's soldiers mass at the bridges.",
      progress: "Stand with us or run. There's no middle ground now.",
      complete: "You fought beside them. Lowbridge will remember. The soldiers broke through eventually, but the council escaped - and so did the evidence. The crown controls the city now, but the resistance lives on. And you've made enemies in high places."
    },

    rewards: {
      xp: 175,
      gold: 70,
      lessonsUnlocked: ["lesson_37"],
      items: ["resistance_cloak"],
      reputation: { ingregaard: 30, old_guard: 55, loyalists: -30 }
    }
  },

  ms_4_10_the_escape: {
    id: "ms_4_10_the_escape",
    name: "The Escape",
    zone: "ingregaard",
    subzone: "lowbridge",
    zoneOrder: 10,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 22,
    prerequisites: ["ms_4_09_choosing_sides"],

    chainId: "main_story",
    chainOrder: 40,
    chainNext: "ms_5_01_port_of_secrets",

    description: "Escape Ingregaard through the underground passages before the noose tightens.",

    objectives: [
      {
        id: "find_passage",
        type: "exploration",
        text: "Find the hidden passage",
        target: 1
      },
      {
        id: "navigate_tunnels",
        type: "exploration",
        text: "Navigate the old tunnels",
        target: 1
      },
      {
        id: "emerge_safe",
        type: "task",
        text: "Emerge outside the city",
        target: 1
      }
    ],

    dialogue: {
      intro: "The council has one last gift - a way out of the city unseen.",
      progress: "These tunnels date from before the kingdom. Follow the blue markers.",
      complete: "You emerge at dawn, miles from Ingregaard's walls. The council member with you points toward the coast. 'The Moorings. Our allies there expect you. Show them this token - they'll know you stood with us. The truth you carry is too important to die in a prison cell.'"
    },

    rewards: {
      xp: 185,
      gold: 80,
      lessonsUnlocked: ["lesson_38"],
      items: ["council_token", "tunnel_map"],
      zoneUnlock: "the_moorings",
      zoneExamUnlock: "ingregaard_exam",
      reputation: { ingregaard: 35, old_guard: 60 }
    }
  },

  // =====================================================
  // ZONE 5: THE MOORINGS (Levels 22-28)
  // Theme: "Tides of Change" - Wider world, exile network, global conspiracy
  // Unlocks: Lessons 39-48 (~250 words)
  // Grammar: PC vs imparfait, object pronouns
  // =====================================================

  ms_5_01_port_of_secrets: {
    id: "ms_5_01_port_of_secrets",
    name: "Port of Secrets",
    zone: "the_moorings",
    zoneOrder: 1,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 22,
    prerequisites: ["ms_4_10_the_escape"],

    chainId: "main_story",
    chainOrder: 41,
    chainNext: "ms_5_02_voices_from_afar",

    description: "The coastal hub teems with travelers, traders, and those who wish to disappear.",

    objectives: [
      {
        id: "arrive_moorings",
        type: "exploration",
        text: "Arrive at the Moorings",
        target: 1
      },
      {
        id: "find_contact",
        type: "task",
        text: "Find the exile contact",
        target: 1
      }
    ],

    dialogue: {
      intro: null,
      progress: "Show them the council token. Ask for someone who 'remembers the silver bridge.'",
      complete: "You carry the token. That means our friends in Ingregaard survived. I'm Mira. We've waited generations for someone to connect the scattered pieces. Welcome to the resistance - the true resistance, not just one city's."
    },

    rewards: {
      xp: 160,
      gold: 45,
      lessonsUnlocked: ["lesson_39"],
      grammarUnlock: "pc_vs_imparfait",
      spellbookUnlock: ["pc_vs_imparfait"],
      reputation: { the_moorings: 15, exiles: 25 }
    }
  },

  ms_5_02_voices_from_afar: {
    id: "ms_5_02_voices_from_afar",
    name: "Voices from Afar",
    zone: "the_moorings",
    zoneOrder: 2,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 23,
    prerequisites: ["ms_5_01_port_of_secrets"],

    chainId: "main_story",
    chainOrder: 42,
    chainNext: "ms_5_03_the_smugglers_code",

    description: "Travelers from distant lands gather here. Their stories paint a larger picture.",

    objectives: [
      {
        id: "meet_travelers",
        type: "meet",
        text: "Meet travelers from other lands",
        target: 4
      },
      {
        id: "gather_news",
        type: "task",
        text: "Gather news from abroad",
        target: 1
      }
    ],

    dialogue: {
      intro: "The world is larger than Verandum. Listen to those who've seen it.",
      progress: "Every traveler carries stories. Listen carefully.",
      complete: "The blight spreads beyond our borders. The seals aren't just here - they're everywhere. And everywhere, they're failing. This is bigger than one kingdom's lies."
    },

    rewards: {
      xp: 140,
      gold: 35,
      lessonsUnlocked: ["lesson_30"],
      loreUnlock: ["wider_world"],
      reputation: { the_moorings: 20 }
    }
  },

  ms_5_03_the_smugglers_code: {
    id: "ms_5_03_the_smugglers_code",
    name: "The Smuggler's Code",
    zone: "the_moorings",
    zoneOrder: 3,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 19,
    prerequisites: ["ms_5_02_voices_from_afar"],

    chainId: "main_story",
    chainOrder: 43,
    chainNext: "ms_5_04_treasures_lost",

    description: "The exiles survive through underground networks. Time to learn their ways.",

    objectives: [
      {
        id: "meet_smuggler",
        type: "interact",
        text: "Meet with the smuggler chief",
        target: "chief_brennan"
      },
      {
        id: "prove_worth",
        type: "task",
        text: "Prove your worth to the network",
        target: 1
      }
    ],

    dialogue: {
      intro: "Mira says you need to meet Brennan. He runs the underground routes.",
      progress: "Trust is earned in blood or coin. Which do you offer?",
      complete: "You've got nerve. Good. The network moves more than goods - we move people, information, truth. The crown calls us criminals. We call ourselves survivors."
    },

    rewards: {
      xp: 155,
      gold: 45,
      lessonsUnlocked: ["lesson_31"],
      reputation: { the_moorings: 20, exiles: 30 }
    }
  },

  ms_5_04_treasures_lost: {
    id: "ms_5_04_treasures_lost",
    name: "Treasures Lost",
    zone: "the_moorings",
    zoneOrder: 4,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 20,
    prerequisites: ["ms_5_03_the_smugglers_code"],

    chainId: "main_story",
    chainOrder: 44,
    chainNext: "ms_5_05_the_exiles_network",

    description: "Something precious was stolen from the exiles. Recover it.",

    objectives: [
      {
        id: "investigate_theft",
        type: "exploration",
        text: "Investigate the theft",
        target: 1
      },
      {
        id: "track_thief",
        type: "task",
        text: "Track the thief",
        target: 1
      },
      {
        id: "recover_item",
        type: "collect",
        text: "Recover the stolen artifact",
        target: 1
      }
    ],

    dialogue: {
      intro: "Someone stole Layne's journal - the original, with his own words. We need it back.",
      progress: "The trail leads to the old warehouse district.",
      complete: "You recovered it. This journal... it contains Layne's account of what really happened. His brother's descent into darkness. The rituals. The betrayal. This is the proof we've needed for generations."
    },

    rewards: {
      xp: 165,
      gold: 55,
      lessonsUnlocked: ["lesson_32"],
      grammarUnlock: "pc_vs_imparfait",
      spellbookUnlock: ["pc_vs_imparfait"],
      items: ["laynes_journal"],
      loreUnlock: ["laynes_account"],
      reputation: { the_moorings: 25, exiles: 40 }
    }
  },

  ms_5_05_the_exiles_network: {
    id: "ms_5_05_the_exiles_network",
    name: "The Exiles' Network",
    zone: "the_moorings",
    zoneOrder: 5,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 21,
    prerequisites: ["ms_5_04_treasures_lost"],

    chainId: "main_story",
    chainOrder: 45,
    chainNext: "ms_5_06_messages_in_bottles",

    description: "The descendants of Layne's followers have survived in hiding. Meet their leaders.",

    objectives: [
      {
        id: "attend_meeting",
        type: "task",
        text: "Attend the secret council",
        target: 1
      },
      {
        id: "meet_leaders",
        type: "meet",
        text: "Meet the exile leaders",
        target: 3
      },
      {
        id: "share_knowledge",
        type: "task",
        text: "Share what you've learned",
        target: 1
      }
    ],

    dialogue: {
      intro: "The council meets tonight. You've earned the right to attend.",
      progress: "Speak truly. These people have risked everything for generations.",
      complete: "For the first time in a century, we have hope. The truth is finally coming to light. But exposing Hermeau's legacy means confronting the current king - his descendant. We must be strategic."
    },

    rewards: {
      xp: 160,
      gold: 50,
      lessonsUnlocked: ["lesson_33"],
      grammarUnlock: "direct_pronouns",
      spellbookUnlock: ["direct_pronouns"],
      reputation: { exiles: 50 }
    }
  },

  ms_5_06_messages_in_bottles: {
    id: "ms_5_06_messages_in_bottles",
    name: "Messages in Bottles",
    zone: "the_moorings",
    zoneOrder: 6,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 22,
    prerequisites: ["ms_5_05_the_exiles_network"],

    chainId: "main_story",
    chainOrder: 46,
    chainNext: "ms_5_07_the_captains_past",

    description: "Coded messages travel the sea routes. Intercept and decode the crown's communications.",

    objectives: [
      {
        id: "intercept_messages",
        type: "collect",
        text: "Intercept coded messages",
        target: 3
      },
      {
        id: "decode_messages",
        type: "task",
        text: "Decode the messages",
        target: 1
      }
    ],

    dialogue: {
      intro: "The crown communicates through coded messages. Brennan's people can intercept them.",
      progress: "The cipher is complex, but patterns emerge.",
      complete: "The king knows. He knows the seals are failing. He knows what his ancestor did. And he's trying to cover it up - sending forces to destroy the remaining evidence. We need to move faster."
    },

    rewards: {
      xp: 170,
      gold: 55,
      lessonsUnlocked: ["lesson_34"],
      grammarUnlock: "indirect_pronouns",
      spellbookUnlock: ["indirect_pronouns"],
      loreUnlock: ["crown_conspiracy"],
      reputation: { the_moorings: 30, exiles: 35 }
    }
  },

  ms_5_07_the_captains_past: {
    id: "ms_5_07_the_captains_past",
    name: "The Captain's Past",
    zone: "the_moorings",
    zoneOrder: 7,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 23,
    prerequisites: ["ms_5_06_messages_in_bottles"],

    chainId: "main_story",
    chainOrder: 47,
    chainNext: "ms_5_08_storm_gathering",

    description: "Captain Varro appears at the Moorings. His presence here is no coincidence.",

    objectives: [
      {
        id: "confront_varro",
        type: "interact",
        text: "Confront Captain Varro",
        target: "captain_varro"
      },
      {
        id: "hear_truth",
        type: "task",
        text: "Hear his truth",
        target: 1
      }
    ],

    dialogue: {
      intro: "Varro's here. The Lurenium captain, in exile territory. Something's wrong.",
      progress: "You have every right to distrust me. Hear me out.",
      complete: "My grandfather served the true king - Layne. When he was exiled, my family stayed behind as eyes inside the system. We've waited, watched, protected what we could. I sent you here, to the exiles. It's time for the watching to end."
    },

    rewards: {
      xp: 175,
      gold: 60,
      lessonsUnlocked: ["lesson_35"],
      loreUnlock: ["varro_truth"],
      reputation: { the_moorings: 25, exiles: 45, old_guard: 30 }
    }
  },

  ms_5_08_storm_gathering: {
    id: "ms_5_08_storm_gathering",
    name: "Storm Gathering",
    zone: "the_moorings",
    zoneOrder: 8,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 24,
    prerequisites: ["ms_5_07_the_captains_past"],

    chainId: "main_story",
    chainOrder: 48,
    chainNext: "ms_5_09_the_call_to_arms",

    description: "Crown forces approach the Moorings. The exiles must be warned.",

    objectives: [
      {
        id: "warn_network",
        type: "task",
        text: "Warn the exile network",
        target: 1
      },
      {
        id: "defend_position",
        type: "combat",
        text: "Help defend the safe houses",
        target: 10
      },
      {
        id: "evacuate_people",
        type: "task",
        text: "Help evacuate key people",
        target: 1
      }
    ],

    dialogue: {
      intro: "Ships on the horizon. Crown colors. They're coming for us.",
      progress: "Hold them off! Get the people out!",
      complete: "We survived, but barely. The crown is done pretending. This is open war now. We need to strike at the heart - but first, we need more allies. The Weald holds secrets even older than Layne. And those who remember the old magic."
    },

    rewards: {
      xp: 185,
      gold: 70,
      lessonsUnlocked: ["lesson_36"],
      items: ["resistance_badge"],
      reputation: { the_moorings: 35, exiles: 50 }
    }
  },

  ms_5_09_the_call_to_arms: {
    id: "ms_5_09_the_call_to_arms",
    name: "The Call to Arms",
    zone: "the_moorings",
    zoneOrder: 9,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 24,
    prerequisites: ["ms_5_08_storm_gathering"],

    chainId: "main_story",
    chainOrder: 49,
    chainNext: "ms_5_10_point_of_no_return",

    description: "The scattered forces must unite. Send word to all allies.",

    objectives: [
      {
        id: "contact_allies",
        type: "task",
        text: "Contact all allied factions",
        target: 4
      },
      {
        id: "secure_pledges",
        type: "task",
        text: "Secure pledges of support",
        target: 1
      }
    ],

    dialogue: {
      intro: "We can't win alone. Time to call in every favor, every friendship, every debt.",
      progress: "The messages are sent. Now we wait for responses.",
      complete: "Dawnmere stands with us. The honest guards of Lurenium will turn when the time comes. The merchants see profit in truth. We have an army - of sorts. Now we need the power to match the king's dark magic."
    },

    rewards: {
      xp: 175,
      gold: 65,
      lessonsUnlocked: ["lesson_37", "lesson_38"],
      reputation: { all_factions: 25 }
    }
  },

  ms_5_10_point_of_no_return: {
    id: "ms_5_10_point_of_no_return",
    name: "Point of No Return",
    zone: "the_moorings",
    zoneOrder: 10,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 25,
    prerequisites: ["ms_5_09_the_call_to_arms"],

    chainId: "main_story",
    chainOrder: 50,
    chainNext: "ms_6_01_into_the_wild",

    description: "The path ahead leads to the Weald - and there's no turning back.",

    objectives: [
      {
        id: "final_council",
        type: "task",
        text: "Attend the final war council",
        target: 1
      },
      {
        id: "make_choice",
        type: "task",
        text: "Commit to the path ahead",
        target: 1
      },
      {
        id: "enter_weald",
        type: "exploration",
        text: "Enter the Weald",
        target: 1
      }
    ],

    dialogue: {
      intro: "This is the moment. Once we move against the crown, there's no going back.",
      progress: "Are you certain? This path leads to either victory or death.",
      complete: "Then it's decided. The Weald holds the old magic - magic that might counter what Hermeau unleashed. Find those who remember. Learn what was forgotten. And prepare for war."
    },

    rewards: {
      xp: 200,
      gold: 100,
      lessonsUnlocked: ["lesson_39", "lesson_40"],
      items: ["moorings_token", "old_magic_compass"],
      zoneUnlock: "the_weald",
      zoneExamUnlock: "moorings_exam",
      reputation: { the_moorings: 50, exiles: 60 }
    }
  },

  // =====================================================
  // ZONE 6: THE WEALD (Levels 28-38)
  // Theme: "Heart of Darkness" - Magic, moral complexity, approaching truth
  // Unlocks: Lessons 49-58 (~250 words)
  // Grammar: Subjunctive, relative pronouns
  //
  // Sub-areas:
  //   - The Outer Weald (quests 1-3): Forest entrance, spirits, dark practitioners
  //   - The Deep Weald (quests 4-6): Visions of war, source of corruption, cleansing
  //   - The Grove of Whispers (quests 7-10): Veiled One's revelation, alliance debates
  // =====================================================

  ms_6_01_into_the_wild: {
    id: "ms_6_01_into_the_wild",
    name: "Into the Wild",
    zone: "the_weald",
    subzone: "the_outer_weald",
    zoneOrder: 1,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 25,
    prerequisites: ["ms_5_10_point_of_no_return"],

    chainId: "main_story",
    chainOrder: 51,
    chainNext: "ms_6_02_spirit_voices",

    description: "The ancient forest swallows all who enter. Few return unchanged.",

    objectives: [
      {
        id: "enter_weald",
        type: "exploration",
        text: "Enter the Weald",
        target: 1
      },
      {
        id: "survive_night",
        type: "task",
        text: "Survive the first night",
        target: 1
      },
      {
        id: "find_path",
        type: "exploration",
        text: "Find the hidden path",
        target: 1
      }
    ],

    dialogue: {
      intro: null,
      progress: "The forest watches. Every step is observed.",
      complete: "You survived the testing. The forest accepts you - for now. Deeper within, those who remember the old ways wait. But be warned: the corruption has spread here too. Trust nothing that speaks too sweetly."
    },

    rewards: {
      xp: 190,
      gold: 50,
      lessonsUnlocked: ["lesson_41"],
      grammarUnlock: "subjunctive_intro",
      spellbookUnlock: ["subjunctive"],
      reputation: { the_weald: 20 }
    }
  },

  ms_6_02_spirit_voices: {
    id: "ms_6_02_spirit_voices",
    name: "Spirit Voices",
    zone: "the_weald",
    subzone: "the_outer_weald",
    zoneOrder: 2,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 26,
    prerequisites: ["ms_6_01_into_the_wild"],

    chainId: "main_story",
    chainOrder: 52,
    chainNext: "ms_6_03_the_price_of_power",

    description: "The trees themselves speak to those who listen.",

    objectives: [
      {
        id: "find_grove",
        type: "exploration",
        text: "Find the Speaker's Grove",
        target: 1
      },
      {
        id: "commune_spirits",
        type: "task",
        text: "Commune with the forest spirits",
        target: 1
      }
    ],

    dialogue: {
      intro: "The old ones say the trees remember everything. Perhaps they'll speak to you.",
      progress: "Open your mind. Let go of what you think you know.",
      complete: "They remember Hermeau. They remember the day the magic turned dark. They remember screaming. The forest tried to stop him, and he burned a third of it in response. They remember Layne too - he tried to heal what his brother destroyed. The spirits will help us, if we can prove we mean to restore balance."
    },

    rewards: {
      xp: 185,
      gold: 45,
      lessonsUnlocked: ["lesson_42"],
      grammarUnlock: "subjunctive_desire",
      spellbookUnlock: ["subjunctive_desire"],
      loreUnlock: ["forest_memory"],
      reputation: { the_weald: 30 }
    }
  },

  ms_6_03_the_price_of_power: {
    id: "ms_6_03_the_price_of_power",
    name: "The Price of Power",
    zone: "the_weald",
    subzone: "the_outer_weald",
    zoneOrder: 3,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 27,
    prerequisites: ["ms_6_02_spirit_voices"],

    chainId: "main_story",
    chainOrder: 53,
    chainNext: "ms_6_04_visions_of_war",

    description: "Deep in the Weald, practitioners of dark magic still survive.",

    objectives: [
      {
        id: "find_coven",
        type: "exploration",
        text: "Find the hidden coven",
        target: 1
      },
      {
        id: "observe_ritual",
        type: "task",
        text: "Observe their ritual",
        target: 1
      },
      {
        id: "make_choice",
        type: "task",
        text: "Decide their fate",
        target: 1
      }
    ],

    dialogue: {
      intro: "Not all in the Weald serve the light. Dark practitioners hide in the deepest shadows.",
      progress: "They use the same magic Hermeau wielded. But they claim to use it differently.",
      complete: "The magic itself isn't evil - it's how it's used. These practitioners preserve knowledge that could counter the king's power. But their methods... the cost is steep. We need their knowledge. But at what price?"
    },

    rewards: {
      xp: 200,
      gold: 55,
      lessonsUnlocked: ["lesson_43"],
      grammarUnlock: "subjunctive_emotion",
      spellbookUnlock: ["subjunctive_emotion"],
      reputation: { the_weald: 25 }
    }
  },

  ms_6_04_visions_of_war: {
    id: "ms_6_04_visions_of_war",
    name: "Visions of War",
    zone: "the_weald",
    subzone: "the_deep_weald",
    zoneOrder: 4,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 28,
    prerequisites: ["ms_6_03_the_price_of_power"],

    chainId: "main_story",
    chainOrder: 54,
    chainNext: "ms_6_05_the_source",

    description: "The spirits offer a glimpse of what truly happened during the Sundering War.",

    objectives: [
      {
        id: "prepare_ritual",
        type: "task",
        text: "Prepare for the vision ritual",
        target: 1
      },
      {
        id: "experience_vision",
        type: "task",
        text: "Experience the spirits' memory",
        target: 1
      },
      {
        id: "process_truth",
        type: "task",
        text: "Come to terms with what you saw",
        target: 1
      }
    ],

    dialogue: {
      intro: "The spirits will show you what they witnessed. But be warned - truth can shatter.",
      progress: "Breathe. Let the vision flow through you.",
      complete: "Now you've seen it. Hermeau sacrificing his own soldiers to fuel dark rituals. Layne begging him to stop. The king ordering his own brother executed - and Layne's allies helping him escape. The 'great victory' was slaughter. The 'hero' was a monster. And his bloodline still rules."
    },

    rewards: {
      xp: 210,
      gold: 60,
      lessonsUnlocked: ["lesson_44"],
      grammarUnlock: "subjunctive_doubt",
      spellbookUnlock: ["subjunctive_doubt"],
      loreUnlock: ["war_vision_complete"],
      reputation: { the_weald: 35 }
    }
  },

  ms_6_05_the_source: {
    id: "ms_6_05_the_source",
    name: "The Source",
    zone: "the_weald",
    subzone: "the_deep_weald",
    zoneOrder: 5,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 29,
    prerequisites: ["ms_6_04_visions_of_war"],

    chainId: "main_story",
    chainOrder: 55,
    chainNext: "ms_6_06_cleansing_begins",

    description: "Track the corruption to its source deep in the Weald.",

    objectives: [
      {
        id: "follow_blight",
        type: "exploration",
        text: "Follow the trail of corruption",
        target: 1
      },
      {
        id: "find_source",
        type: "exploration",
        text: "Find the corruption's source",
        target: 1
      },
      {
        id: "understand_threat",
        type: "task",
        text: "Understand what we face",
        target: 1
      }
    ],

    dialogue: {
      intro: "The blight has a center. Find it, and we find our enemy's weakness.",
      progress: "The corruption grows stronger here. We're close.",
      complete: "A breach. The seals Layne created are nearly broken - and this is the largest crack. Through it, the darkness Hermeau summoned is seeping back. If we don't close it, what he unleashed will return in full. But closing it requires... sacrifice."
    },

    rewards: {
      xp: 220,
      gold: 65,
      lessonsUnlocked: ["lesson_45"],
      grammarUnlock: "relative_qui_que",
      spellbookUnlock: ["relative_pronouns"],
      loreUnlock: ["breach_discovered"],
      reputation: { the_weald: 40 }
    }
  },

  ms_6_06_cleansing_begins: {
    id: "ms_6_06_cleansing_begins",
    name: "Cleansing Begins",
    zone: "the_weald",
    subzone: "the_deep_weald",
    zoneOrder: 6,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 30,
    prerequisites: ["ms_6_05_the_source"],

    chainId: "main_story",
    chainOrder: 56,
    chainNext: "ms_6_07_the_veiled_truth",

    description: "Begin the ritual to reinforce the damaged seals.",

    objectives: [
      {
        id: "gather_components",
        type: "collect",
        text: "Gather ritual components",
        target: 5
      },
      {
        id: "defend_ritual",
        type: "combat",
        text: "Defend the ritual site from corruption",
        target: 12
      },
      {
        id: "strengthen_seal",
        type: "task",
        text: "Help strengthen the seal",
        target: 1
      }
    ],

    dialogue: {
      intro: "The spirits know the old rituals. But the darkness will fight back.",
      progress: "Hold the line! The ritual cannot be interrupted!",
      complete: "The seal holds - for now. But this is temporary. The source of the corruption isn't here - it's in Verandum. The king himself maintains the breach. To truly heal the land, we must end his line's grip on that dark power."
    },

    rewards: {
      xp: 230,
      gold: 75,
      lessonsUnlocked: ["lesson_46"],
      grammarUnlock: "relative_ou_dont",
      spellbookUnlock: ["relative_ou_dont"],
      items: ["seal_restorer"],
      reputation: { the_weald: 45 }
    }
  },

  ms_6_07_the_veiled_truth: {
    id: "ms_6_07_the_veiled_truth",
    name: "The Veiled Truth",
    zone: "the_weald",
    subzone: "the_grove_of_whispers",
    zoneOrder: 7,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 31,
    prerequisites: ["ms_6_06_cleansing_begins"],

    chainId: "main_story",
    chainOrder: 57,
    chainNext: "ms_6_08_brothers_betrayal",

    description: "The Veiled One reveals their true identity.",

    objectives: [
      {
        id: "summon_veiled",
        type: "task",
        text: "Summon the Veiled One",
        target: 1
      },
      {
        id: "witness_reveal",
        type: "task",
        text: "Witness their revelation",
        target: 1
      }
    ],

    dialogue: {
      intro: "The Veiled One has followed your journey from the beginning. It's time to know why.",
      progress: "You have earned the truth.",
      complete: "I am the last of Layne's direct bloodline. I have watched over the seals, waiting for one who could understand, who could fight. You are that one. My ancestor's sacrifice must not be in vain. Together, we will end what Hermeau began."
    },

    rewards: {
      xp: 240,
      gold: 70,
      lessonsUnlocked: ["lesson_47"],
      loreUnlock: ["veiled_identity"],
      reputation: { the_weald: 35, exiles: 50 }
    }
  },

  ms_6_08_brothers_betrayal: {
    id: "ms_6_08_brothers_betrayal",
    name: "Brother's Betrayal",
    zone: "the_weald",
    subzone: "the_grove_of_whispers",
    zoneOrder: 8,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 32,
    prerequisites: ["ms_6_07_the_veiled_truth"],

    chainId: "main_story",
    chainOrder: 58,
    chainNext: "ms_6_09_what_is_justice",

    description: "The full truth of the brothers' conflict is revealed.",

    objectives: [
      {
        id: "read_layne_final",
        type: "task",
        text: "Read Layne's final writings",
        target: 1
      },
      {
        id: "understand_sacrifice",
        type: "task",
        text: "Understand his sacrifice",
        target: 1
      }
    ],

    dialogue: {
      intro: "The Veiled One carries Layne's final words. Words never meant to be read until now.",
      progress: "My brother chose power over love, darkness over light.",
      complete: "Layne gave everything to seal away the darkness Hermeau summoned. His magic, his throne, his life - all sacrificed to protect a kingdom that would call him traitor. The seals are his legacy. And the current king - Hermeau's heir - knows exactly what he does when he weakens them."
    },

    rewards: {
      xp: 250,
      gold: 80,
      lessonsUnlocked: ["lesson_48"],
      grammarUnlock: "subjunctive_mastery",
      spellbookUnlock: ["subjunctive_mastery"],
      loreUnlock: ["layne_sacrifice"],
      reputation: { the_weald: 40, exiles: 55 }
    }
  },

  ms_6_09_what_is_justice: {
    id: "ms_6_09_what_is_justice",
    name: "What Is Justice?",
    zone: "the_weald",
    subzone: "the_grove_of_whispers",
    zoneOrder: 9,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 33,
    prerequisites: ["ms_6_08_brothers_betrayal"],

    chainId: "main_story",
    chainOrder: 59,
    chainNext: "ms_6_10_before_the_dawn",

    description: "The alliance debates what to do with the truth.",

    objectives: [
      {
        id: "attend_debate",
        type: "task",
        text: "Attend the alliance debate",
        target: 1
      },
      {
        id: "hear_arguments",
        type: "task",
        text: "Hear all perspectives",
        target: 1
      },
      {
        id: "cast_voice",
        type: "task",
        text: "Add your voice to the decision",
        target: 1
      }
    ],

    dialogue: {
      intro: "We have the truth. Now we must decide what to do with it.",
      progress: "Some want blood. Some want peace. Some want only to survive. What do you want?",
      complete: "The path is set. We march on Verandum not for vengeance, but for truth. The people deserve to know their history. The land deserves to be healed. And the king must answer for centuries of lies - and the lives they cost."
    },

    rewards: {
      xp: 235,
      gold: 70,
      lessonsUnlocked: ["lesson_49"],
      reputation: { all_factions: 30 }
    }
  },

  ms_6_10_before_the_dawn: {
    id: "ms_6_10_before_the_dawn",
    name: "Before the Dawn",
    zone: "the_weald",
    subzone: "the_grove_of_whispers",
    zoneOrder: 10,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 35,
    prerequisites: ["ms_6_09_what_is_justice"],

    chainId: "main_story",
    chainOrder: 60,
    chainNext: "ms_7_01_the_throne_awaits",

    description: "The final night before the march on Verandum.",

    objectives: [
      {
        id: "speak_allies",
        type: "meet",
        text: "Speak with your allies",
        target: 5
      },
      {
        id: "prepare_self",
        type: "task",
        text: "Prepare yourself",
        target: 1
      },
      {
        id: "begin_march",
        type: "exploration",
        text: "Begin the march",
        target: 1
      }
    ],

    dialogue: {
      intro: "Tomorrow, everything changes. Tonight, we remember why we fight.",
      progress: "Rest while you can. Dawn comes soon.",
      complete: "The army moves at first light. Dawnmere's settlers. Lurenium's honest guards. The exiles. The forest's children. All march together against centuries of lies. Whatever happens tomorrow, the truth will finally be spoken."
    },

    rewards: {
      xp: 275,
      gold: 100,
      lessonsUnlocked: ["lesson_50"],
      items: ["weald_blessing", "alliance_banner"],
      zoneUnlock: "cinderaduum",
      zoneExamUnlock: "weald_exam",
      reputation: { the_weald: 60 }
    }
  },

  // =====================================================
  // ZONE 7: CINDERADUUM (Levels 38-50)
  // Theme: "The Reckoning" - Confrontation, resolution, mastery
  // Unlocks: Lessons 59-70 (~300 words)
  // Grammar: Conditionnel, complex tenses, mastery
  //
  // Sub-areas:
  //   - The Outer Walls (quests 1-3): Siege camp, infiltration, breaching walls
  //   - The Inner City (quests 4-6): Street battles, allies, people's uprising
  //   - The Throne Room (quests 7-10): Palace, confrontation, resolution
  // =====================================================

  ms_7_01_the_throne_awaits: {
    id: "ms_7_01_the_throne_awaits",
    name: "The Throne Awaits",
    zone: "cinderaduum",
    subzone: "the_outer_walls",
    zoneOrder: 1,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 35,
    prerequisites: ["ms_6_10_before_the_dawn"],

    chainId: "main_story",
    chainOrder: 61,
    chainNext: "ms_7_02_whispers_in_court",

    description: "The capital city of Verandum rises before the alliance army.",

    objectives: [
      {
        id: "approach_capital",
        type: "exploration",
        text: "Approach the capital",
        target: 1
      },
      {
        id: "assess_defenses",
        type: "task",
        text: "Assess the city's defenses",
        target: 1
      },
      {
        id: "establish_camp",
        type: "task",
        text: "Establish the alliance camp",
        target: 1
      }
    ],

    dialogue: {
      intro: null,
      progress: "The walls are high, but walls can fall.",
      complete: "The king knows we're here. He's sent an emissary - he wants to negotiate. It's likely a trap, but it's also our chance to speak truth to power before any blood is spilled. Will you go?"
    },

    rewards: {
      xp: 260,
      gold: 80,
      lessonsUnlocked: ["lesson_51"],
      grammarUnlock: "conditionnel_intro",
      spellbookUnlock: ["conditionnel"],
      reputation: { cinderaduum: 10 }
    }
  },

  ms_7_02_whispers_in_court: {
    id: "ms_7_02_whispers_in_court",
    name: "Whispers in Court",
    zone: "cinderaduum",
    subzone: "the_outer_walls",
    zoneOrder: 2,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 36,
    prerequisites: ["ms_7_01_the_throne_awaits"],

    chainId: "main_story",
    chainOrder: 62,
    chainNext: "ms_7_03_face_to_face",

    description: "Enter the palace under flag of truce. Navigate the deadly court.",

    objectives: [
      {
        id: "enter_palace",
        type: "exploration",
        text: "Enter the palace",
        target: 1
      },
      {
        id: "navigate_court",
        type: "task",
        text: "Navigate the courtiers",
        target: 1
      },
      {
        id: "find_allies",
        type: "meet",
        text: "Find potential allies within",
        target: 2
      }
    ],

    dialogue: {
      intro: "The palace is a battlefield of whispers. Every smile hides a knife.",
      progress: "Not everyone here supports the king. Find them.",
      complete: "There are cracks in the court's loyalty. Some know the truth. Others suspect. When we expose the king, they will turn - if we give them the courage. The king grants you an audience tomorrow. Be ready."
    },

    rewards: {
      xp: 270,
      gold: 75,
      lessonsUnlocked: ["lesson_52"],
      reputation: { cinderaduum: 20 }
    }
  },

  ms_7_03_face_to_face: {
    id: "ms_7_03_face_to_face",
    name: "Face to Face",
    zone: "cinderaduum",
    subzone: "the_outer_walls",
    zoneOrder: 3,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 38,
    prerequisites: ["ms_7_02_whispers_in_court"],

    chainId: "main_story",
    chainOrder: 63,
    chainNext: "ms_7_04_gathering_allies",

    description: "Stand before the king himself and speak the truth.",

    objectives: [
      {
        id: "enter_throne_room",
        type: "task",
        text: "Enter the throne room",
        target: 1
      },
      {
        id: "speak_truth",
        type: "task",
        text: "Speak the truth to the king",
        target: 1
      },
      {
        id: "survive_response",
        type: "task",
        text: "Survive his response",
        target: 1
      }
    ],

    dialogue: {
      intro: "The moment of truth. The king waits.",
      progress: "Speak clearly. Let him hear what his ancestor truly was.",
      complete: "He laughed. He admitted everything - then claimed it was necessary. 'The darkness would have consumed everything. Hermeau controlled it.' He offers you a place at his side. Power. Wealth. All you have to do is forget the truth. What do you say?"
    },

    rewards: {
      xp: 290,
      gold: 90,
      lessonsUnlocked: ["lesson_53"],
      grammarUnlock: "conditionnel_si",
      spellbookUnlock: ["conditionnel_si"],
      reputation: { cinderaduum: 25 }
    }
  },

  ms_7_04_gathering_allies: {
    id: "ms_7_04_gathering_allies",
    name: "Gathering Allies",
    zone: "cinderaduum",
    subzone: "the_inner_city",
    zoneOrder: 4,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 40,
    prerequisites: ["ms_7_03_face_to_face"],

    chainId: "main_story",
    chainOrder: 64,
    chainNext: "ms_7_05_all_truths_revealed",

    description: "Turn the court against the king from within.",

    objectives: [
      {
        id: "spread_truth",
        type: "task",
        text: "Spread the truth among nobles",
        target: 5
      },
      {
        id: "secure_military",
        type: "interact",
        text: "Secure military support",
        target: "general_theron"
      },
      {
        id: "prepare_revelation",
        type: "task",
        text: "Prepare for the public revelation",
        target: 1
      }
    ],

    dialogue: {
      intro: "The king's offer was refused. Now we do this the hard way.",
      progress: "Every noble who learns the truth is another crack in his power.",
      complete: "General Theron will stand with us. Half the court wavers. The common people whisper of old injustices. Tomorrow is the Founder's Festival - when the entire city gathers. We reveal everything then."
    },

    rewards: {
      xp: 300,
      gold: 100,
      lessonsUnlocked: ["lesson_54"],
      grammarUnlock: "plus_que_parfait",
      spellbookUnlock: ["plus_que_parfait"],
      reputation: { cinderaduum: 35 }
    }
  },

  ms_7_05_all_truths_revealed: {
    id: "ms_7_05_all_truths_revealed",
    name: "All Truths Revealed",
    zone: "cinderaduum",
    subzone: "the_inner_city",
    zoneOrder: 5,

    type: "main",
    category: "lore",
    status: "locked",

    levelRequired: 42,
    prerequisites: ["ms_7_04_gathering_allies"],

    chainId: "main_story",
    chainOrder: 65,
    chainNext: "ms_7_06_the_accusation",

    description: "Assemble all the evidence for the public revelation.",

    objectives: [
      {
        id: "gather_evidence",
        type: "task",
        text: "Gather all collected evidence",
        target: 1
      },
      {
        id: "prepare_presentation",
        type: "task",
        text: "Prepare the presentation of truth",
        target: 1
      },
      {
        id: "veiled_blessing",
        type: "interact",
        text: "Receive the Veiled One's blessing",
        target: "the_veiled_one"
      }
    ],

    dialogue: {
      intro: "Every fragment of truth gathered on this journey. Every witness. Every artifact.",
      progress: "Arrange them carefully. The story must be undeniable.",
      complete: "Layne's journal. The sealed archives. The forest's memories. The artifacts. The testimonies. Centuries of hidden truth, finally assembled. Tomorrow, the kingdom learns who their 'hero' really was."
    },

    rewards: {
      xp: 310,
      gold: 95,
      lessonsUnlocked: ["lesson_55"],
      items: ["complete_evidence"],
      reputation: { cinderaduum: 40 }
    }
  },

  ms_7_06_the_accusation: {
    id: "ms_7_06_the_accusation",
    name: "The Accusation",
    zone: "cinderaduum",
    subzone: "the_inner_city",
    zoneOrder: 6,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 44,
    prerequisites: ["ms_7_05_all_truths_revealed"],

    chainId: "main_story",
    chainOrder: 66,
    chainNext: "ms_7_07_battle_for_truth",

    description: "Stand before the kingdom and speak the truth.",

    objectives: [
      {
        id: "reach_platform",
        type: "task",
        text: "Reach the speaking platform",
        target: 1
      },
      {
        id: "present_evidence",
        type: "task",
        text: "Present the evidence to all",
        target: 1
      },
      {
        id: "weather_response",
        type: "task",
        text: "Weather the king's response",
        target: 1
      }
    ],

    dialogue: {
      intro: "The entire kingdom watches. This is the moment everything changes.",
      progress: "Speak clearly. Speak truly. Let them hear.",
      complete: "The crowd is divided. Some weep. Some rage. The king... the king has fled to the inner sanctum. His loyal guards hold the palace. But his support crumbles by the hour. General Theron moves to arrest him. This ends tonight."
    },

    rewards: {
      xp: 320,
      gold: 110,
      lessonsUnlocked: ["lesson_56"],
      grammarUnlock: "all_tenses_review",
      reputation: { cinderaduum: 50 }
    }
  },

  ms_7_07_battle_for_truth: {
    id: "ms_7_07_battle_for_truth",
    name: "Battle for Truth",
    zone: "cinderaduum",
    subzone: "the_throne_room",
    zoneOrder: 7,

    type: "main",
    category: "combat",
    status: "locked",

    levelRequired: 46,
    prerequisites: ["ms_7_06_the_accusation"],

    chainId: "main_story",
    chainOrder: 67,
    chainNext: "ms_7_08_judgment_day",

    description: "Storm the palace and confront the king.",

    objectives: [
      {
        id: "breach_palace",
        type: "combat",
        text: "Breach the palace defenses",
        target: 15
      },
      {
        id: "reach_sanctum",
        type: "exploration",
        text: "Reach the inner sanctum",
        target: 1
      },
      {
        id: "face_king",
        type: "combat",
        text: "Confront the king",
        target: 1
      }
    ],

    dialogue: {
      intro: "The final battle. For truth. For justice. For those who died for lies.",
      progress: "The king draws on dark power. He is formidable.",
      complete: "The king falls. Not dead - captured. The dark power he wielded sputters and fails. Around the kingdom, the seals stabilize. The corruption begins to recede. But now comes the harder question: what do we do with him?"
    },

    rewards: {
      xp: 350,
      gold: 125,
      lessonsUnlocked: ["lesson_57"],
      items: ["kings_crown", "dark_focus_shattered"],
      reputation: { cinderaduum: 60 }
    }
  },

  ms_7_08_judgment_day: {
    id: "ms_7_08_judgment_day",
    name: "Judgment Day",
    zone: "cinderaduum",
    subzone: "the_throne_room",
    zoneOrder: 8,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 48,
    prerequisites: ["ms_7_07_battle_for_truth"],

    chainId: "main_story",
    chainOrder: 68,
    chainNext: "ms_7_09_a_new_dawn",

    description: "The king must face judgment for his crimes and his ancestors'.",

    objectives: [
      {
        id: "attend_trial",
        type: "task",
        text: "Attend the trial",
        target: 1
      },
      {
        id: "give_testimony",
        type: "task",
        text: "Give your testimony",
        target: 1
      },
      {
        id: "witness_verdict",
        type: "task",
        text: "Witness the verdict",
        target: 1
      }
    ],

    dialogue: {
      intro: "A trial for crimes spanning centuries. The kingdom watches.",
      progress: "Let the evidence speak. Let the truth be heard.",
      complete: "Exile. The same fate his ancestor gave Layne. The Veiled One - Layne's heir - will take the throne, but declines. 'The age of kings is over. Let the people choose their leaders.' A council is formed. The truth is written into law. No more hidden histories."
    },

    rewards: {
      xp: 340,
      gold: 150,
      lessonsUnlocked: ["lesson_58"],
      title: "truth_bringer",
      reputation: { cinderaduum: 70 }
    }
  },

  ms_7_09_a_new_dawn: {
    id: "ms_7_09_a_new_dawn",
    name: "A New Dawn",
    zone: "cinderaduum",
    subzone: "the_throne_room",
    zoneOrder: 9,

    type: "main",
    category: "social",
    status: "locked",

    levelRequired: 49,
    prerequisites: ["ms_7_08_judgment_day"],

    chainId: "main_story",
    chainOrder: 69,
    chainNext: "ms_7_10_the_journey_continues",

    description: "The kingdom heals. The future begins.",

    objectives: [
      {
        id: "healing_ceremony",
        type: "task",
        text: "Attend the healing ceremony",
        target: 1
      },
      {
        id: "visit_allies",
        type: "meet",
        text: "Visit old allies",
        target: 5
      },
      {
        id: "receive_thanks",
        type: "task",
        text: "Receive the people's thanks",
        target: 1
      }
    ],

    dialogue: {
      intro: "The darkness recedes. The land heals. A new era dawns.",
      progress: "So many to thank. So many who helped along the way.",
      complete: "Dawnmere thrives. The Haari Fields bloom again. Lurenium opens its archives to all. The Moorings trades freely. The Weald grows strong. And Verandum learns to lead without shadows. You did this. You brought truth to a kingdom built on lies."
    },

    rewards: {
      xp: 360,
      gold: 200,
      lessonsUnlocked: ["lesson_59"],
      items: ["hero_of_truth_medal"],
      reputation: { all_factions: 50 }
    }
  },

  ms_7_10_the_journey_continues: {
    id: "ms_7_10_the_journey_continues",
    name: "The Journey Continues",
    zone: "cinderaduum",
    subzone: "the_throne_room",
    zoneOrder: 10,

    type: "main",
    category: "exploration",
    status: "locked",

    levelRequired: 50,
    prerequisites: ["ms_7_09_a_new_dawn"],

    chainId: "main_story",
    chainOrder: 70,
    chainNext: null,

    description: "One journey ends. Another awaits.",

    objectives: [
      {
        id: "reflect",
        type: "task",
        text: "Reflect on your journey",
        target: 1
      },
      {
        id: "receive_gift",
        type: "interact",
        text: "Receive a parting gift",
        target: "the_veiled_one"
      },
      {
        id: "look_ahead",
        type: "task",
        text: "Look to the horizon",
        target: 1
      }
    ],

    dialogue: {
      intro: "You came to this land a stranger. You leave it a hero. But you leave it?",
      progress: "The Veiled One wishes to see you one final time.",
      complete: "You've mastered our tongue. You've learned our history. You've changed our future. But the world is vast, and other lands have their own stories, their own words, their own truths waiting to be discovered. Perhaps... you might visit them someday. For now, know that you will always have a home here. Farewell, friend. Until we meet again."
    },

    rewards: {
      xp: 500,
      gold: 500,
      lessonsUnlocked: ["lesson_60"],
      items: ["travelers_compass", "certificate_of_mastery"],
      title: "master_of_tongues",
      zoneExamUnlock: "cinderaduum_exam",
      finalExamUnlock: true,
      reputation: { all_factions: 100 }
    }
  }

};

// =====================================================
// Zone Exam Definitions
// =====================================================

const ZONE_EXAMS = {
  dawnmere_exam: {
    id: "dawnmere_exam",
    name: "Dawnmere Mastery",
    zone: "dawnmere",
    levelRequired: 5,
    prerequisiteQuest: "ms_1_10_the_road_north",

    description: "Prove your mastery of the foundations before moving on.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_1", "lesson_2", "lesson_3", "lesson_4", "lesson_5", "lesson_6", "lesson_7", "lesson_8"], count: 20 },
      { type: "grammar", topics: ["etre", "avoir", "gender", "articles"], count: 10 }
    ],

    passingScore: 0.7,

    rewards: {
      xp: 200,
      gold: 100,
      title: "dawnmere_graduate",
      items: ["dawnmere_badge"]
    }
  },

  haari_fields_exam: {
    id: "haari_fields_exam",
    name: "Haari Fields Mastery",
    zone: "haari_fields",
    levelRequired: 10,
    prerequisiteQuest: "ms_2_10_corruption_confirmed",

    description: "Demonstrate your growing knowledge before entering Lurenium.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_9", "lesson_10", "lesson_11", "lesson_12", "lesson_13", "lesson_14", "lesson_15", "lesson_16"], count: 20 },
      { type: "grammar", topics: ["regular_er", "regular_ir", "regular_re", "aller", "faire", "negation", "questions"], count: 15 }
    ],

    passingScore: 0.7,

    rewards: {
      xp: 300,
      gold: 150,
      title: "fields_wanderer",
      items: ["haari_badge"]
    }
  },

  lurenium_exam: {
    id: "lurenium_exam",
    name: "Lurenium Mastery",
    zone: "lurenium",
    levelRequired: 15,
    prerequisiteQuest: "ms_3_10_the_kings_two_sons",

    description: "Prove your command of the tongue before entering the divided city.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_17", "lesson_18", "lesson_19", "lesson_20", "lesson_21", "lesson_22", "lesson_23", "lesson_24", "lesson_25", "lesson_26", "lesson_27", "lesson_28"], count: 25 },
      { type: "grammar", topics: ["passe_compose_avoir", "passe_compose_etre", "prendre_venir", "voir_pouvoir", "devoir_vouloir", "savoir_connaitre"], count: 20 }
    ],

    passingScore: 0.7,

    rewards: {
      xp: 400,
      gold: 200,
      title: "golden_scholar",
      items: ["lurenium_badge"]
    }
  },

  ingregaard_exam: {
    id: "ingregaard_exam",
    name: "Ingregaard Mastery",
    zone: "ingregaard",
    levelRequired: 22,
    prerequisiteQuest: "ms_4_10_the_escape",

    description: "Demonstrate your understanding before seeking the coastal exiles.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_29", "lesson_30", "lesson_31", "lesson_32", "lesson_33", "lesson_34", "lesson_35", "lesson_36", "lesson_37", "lesson_38"], count: 25 },
      { type: "grammar", topics: ["imparfait_intro", "comparisons", "imparfait_usage"], count: 15 }
    ],

    passingScore: 0.7,

    rewards: {
      xp: 450,
      gold: 225,
      title: "bridge_crosser",
      items: ["ingregaard_badge"]
    }
  },

  moorings_exam: {
    id: "moorings_exam",
    name: "The Moorings Mastery",
    zone: "the_moorings",
    levelRequired: 28,
    prerequisiteQuest: "ms_5_10_point_of_no_return",

    description: "Demonstrate fluency before entering the ancient Weald.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_39", "lesson_40", "lesson_41", "lesson_42", "lesson_43", "lesson_44", "lesson_45", "lesson_46", "lesson_47", "lesson_48"], count: 25 },
      { type: "grammar", topics: ["pc_vs_imparfait", "direct_pronouns", "indirect_pronouns"], count: 20 }
    ],

    passingScore: 0.7,

    rewards: {
      xp: 500,
      gold: 250,
      title: "tide_walker",
      items: ["moorings_badge"]
    }
  },

  weald_exam: {
    id: "weald_exam",
    name: "The Weald Mastery",
    zone: "the_weald",
    levelRequired: 35,
    prerequisiteQuest: "ms_6_10_before_the_dawn",

    description: "Prove your mastery of the deep tongue before confronting the throne.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_41", "lesson_42", "lesson_43", "lesson_44", "lesson_45", "lesson_46", "lesson_47", "lesson_48", "lesson_49", "lesson_50"], count: 25 },
      { type: "grammar", topics: ["subjunctive_intro", "subjunctive_desire", "subjunctive_emotion", "subjunctive_doubt", "relative_qui_que", "relative_ou_dont", "subjunctive_mastery"], count: 20 }
    ],

    passingScore: 0.75,

    rewards: {
      xp: 600,
      gold: 300,
      title: "forest_voice",
      items: ["weald_badge"]
    }
  },

  cinderaduum_exam: {
    id: "cinderaduum_exam",
    name: "Cinderaduum Mastery",
    zone: "cinderaduum",
    levelRequired: 50,
    prerequisiteQuest: "ms_7_10_the_journey_continues",

    description: "The final test of your journey. Prove complete mastery.",

    sections: [
      { type: "vocabulary", lessons: ["lesson_51", "lesson_52", "lesson_53", "lesson_54", "lesson_55", "lesson_56", "lesson_57", "lesson_58", "lesson_59", "lesson_60"], count: 30 },
      { type: "grammar", topics: ["conditionnel_intro", "conditionnel_si", "plus_que_parfait", "all_tenses_review"], count: 25 }
    ],

    passingScore: 0.75,

    rewards: {
      xp: 750,
      gold: 400,
      title: "master_linguist",
      items: ["cinderaduum_badge", "golden_quill"]
    }
  },

  final_exam: {
    id: "final_exam",
    name: "Certificate of Mastery",
    zone: "cinderaduum",
    levelRequired: 50,
    prerequisiteQuest: "ms_7_10_the_journey_continues",

    description: "A comprehensive examination of everything you've learned. Passing certifies B1 proficiency.",

    sections: [
      { type: "vocabulary", lessons: "all", count: 50 },
      { type: "grammar", topics: "all", count: 40 },
      { type: "listening", count: 10 },
      { type: "translation", count: 10 }
    ],

    passingScore: 0.8,

    rewards: {
      xp: 1000,
      gold: 1000,
      title: "certified_speaker",
      items: ["certificate_of_mastery", "polyglot_ring"],
      unlocks: ["new_game_plus", "second_language_hint"]
    }
  }
};

// =====================================================
// Helper Functions
// =====================================================

function getMainQuestsByZone(zoneName) {
  return Object.values(MAIN_STORY_QUESTS).filter(q => q.zone === zoneName);
}

function getNextMainQuest(currentQuestId) {
  const quest = MAIN_STORY_QUESTS[currentQuestId];
  return quest?.chainNext ? MAIN_STORY_QUESTS[quest.chainNext] : null;
}

function getZoneProgress(zoneName, completedQuests) {
  const zoneQuests = getMainQuestsByZone(zoneName);
  const completed = zoneQuests.filter(q => completedQuests.includes(q.id));
  return {
    total: zoneQuests.length,
    completed: completed.length,
    percent: Math.round((completed.length / zoneQuests.length) * 100)
  };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MAIN_STORY_QUESTS,
    ZONE_EXAMS,
    getMainQuestsByZone,
    getNextMainQuest,
    getZoneProgress
  };
}
