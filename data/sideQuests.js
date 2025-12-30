// ByteQuest Side Quests
// Optional quests that complement the main story
// Organized by zone

const SIDE_QUESTS = {

  // =====================================================
  // ZONE 1: DAWNMERE SIDE QUESTS
  // Available after completing early main story quests
  // =====================================================

  sq_1_01_regas_recipe: {
    id: "sq_1_01_regas_recipe",
    name: "Rega's Recipe",
    zone: "dawnmere",
    giver: "rega",

    type: "side",
    category: "social",
    status: "locked",

    levelRequired: 2,
    prerequisites: ["ms_1_02_words_of_welcome"],

    description: "Rega the baker wants to recreate her grandmother's famous honey bread, but the old recipe card is written in a script she can't read.",

    objectives: [
      {
        id: "examine_recipe",
        type: "task",
        text: "Examine the old recipe card",
        target: 1
      },
      {
        id: "translate_ingredients",
        type: "vocabulary_challenge",
        text: "Identify the ingredients",
        target: 5,
        vocabCategory: "food"
      },
      {
        id: "gather_ingredients",
        type: "collect",
        text: "Gather the ingredients",
        target: 4
      },
      {
        id: "return_to_rega",
        type: "interact",
        text: "Return to Rega",
        target: "rega"
      }
    ],

    dialogue: {
      intro: "Oh, you can read! My grandmother left me this recipe - her honey bread was famous three villages over. But I can't make sense of these old letters. Could you help?",
      progress: "Any luck with the recipe? I've been dreaming of that bread for years.",
      complete: "You've done it! Miel, farine, oeufs... it all makes sense now. Here, take this - the first loaf is yours. And come back anytime, there's always a warm roll waiting for you."
    },

    rewards: {
      xp: 40,
      gold: 15,
      items: ["honey_bread", "regas_friendship"],
      reputation: { dawnmere: 15 }
    }
  },

  sq_1_02_lost_flock: {
    id: "sq_1_02_lost_flock",
    name: "The Lost Flock",
    zone: "dawnmere",
    giver: "shepherd_marcus",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_04_a_place_to_belong"],

    description: "Marcus the shepherd's flock has scattered toward the forest edge. He's too old to chase them himself.",

    objectives: [
      {
        id: "find_sheep_1",
        type: "exploration",
        text: "Find the sheep near the old oak",
        target: 1
      },
      {
        id: "find_sheep_2",
        type: "exploration",
        text: "Find the sheep by the stream",
        target: 1
      },
      {
        id: "find_sheep_3",
        type: "exploration",
        text: "Find the sheep at the forest edge",
        target: 1
      },
      {
        id: "return_flock",
        type: "interact",
        text: "Return the flock to Marcus",
        target: "shepherd_marcus"
      }
    ],

    dialogue: {
      intro: "Blast these old legs! The sheep got spooked by something and scattered. Three of them ran toward the forest - that's no place for them with the blight creeping closer. Please, can you bring them back?",
      progress: "Still looking? Check near the water - Blanchard always did love the stream.",
      complete: "You found them all! Bless you. These sheep are all I have left from my old life, before I came to Dawnmere. Here, take this wool - finest quality, I promise you that."
    },

    rewards: {
      xp: 50,
      gold: 10,
      items: ["fine_wool", "shepherds_crook"],
      reputation: { dawnmere: 20 }
    }
  },

  sq_1_03_tommens_secret: {
    id: "sq_1_03_tommens_secret",
    name: "Tommen's Secret",
    zone: "dawnmere",
    giver: "tommen",

    type: "side",
    category: "social",
    status: "locked",

    levelRequired: 3,
    prerequisites: ["ms_1_04_a_place_to_belong"],

    description: "You've noticed Tommen sneaking off in the evenings. He seems to be hiding something.",

    objectives: [
      {
        id: "follow_tommen",
        type: "exploration",
        text: "Follow Tommen after sunset",
        target: 1
      },
      {
        id: "discover_secret",
        type: "task",
        text: "Discover what he's doing",
        target: 1
      },
      {
        id: "talk_to_tommen",
        type: "interact",
        text: "Speak with Tommen",
        target: "tommen"
      },
      {
        id: "make_choice",
        type: "choice",
        text: "Decide how to help",
        options: ["train_together", "keep_secret", "tell_family"]
      }
    ],

    dialogue: {
      intro: null, // Quest discovered by observation, not given
      progress: "You... you followed me? Please, don't tell anyone.",
      complete_train: "You'll train with me? Really? I've been teaching myself from an old manual I found, but having a partner... thank you. Maybe one day I'll be good enough to protect this village.",
      complete_secret: "You'll keep my secret? Thank you. I just... I need to be ready. For whatever comes. The blight, the corruption - someone needs to stand guard.",
      complete_tell: "You told them? I... I suppose it's for the best. Mother was angry at first, but Father said he understood. He gave me his old sword. Said it was time I learned properly."
    },

    rewards: {
      xp: 45,
      gold: 5,
      items: ["training_sword"],
      reputation: { dawnmere: 15 },
      // Different outcomes based on choice
      outcomeRewards: {
        train_together: { unlocks: "training_partner_tommen" },
        keep_secret: { reputation: { tommen_personal: 25 } },
        tell_family: { items: ["family_heirloom_blade"] }
      }
    }
  },

  sq_1_04_the_old_well: {
    id: "sq_1_04_the_old_well",
    name: "The Old Well",
    zone: "dawnmere",
    giver: "urma",

    type: "side",
    category: "exploration",
    status: "locked",

    levelRequired: 4,
    prerequisites: ["ms_1_06_first_signs"],

    description: "Strange sounds have been coming from the abandoned well at the village edge. The settlers are worried.",

    objectives: [
      {
        id: "investigate_well",
        type: "exploration",
        text: "Investigate the old well",
        target: 1
      },
      {
        id: "descend_well",
        type: "task",
        text: "Descend into the well",
        target: 1
      },
      {
        id: "discover_source",
        type: "task",
        text: "Find the source of the sounds",
        target: 1
      },
      {
        id: "resolve_situation",
        type: "task",
        text: "Resolve the situation",
        target: 1
      },
      {
        id: "report_urma",
        type: "interact",
        text: "Report back to Urma",
        target: "urma"
      }
    ],

    dialogue: {
      intro: "That old well... it's been sealed for years, but lately there's been sounds. Scratching. Whimpering. The children are scared to go near it, and frankly, so am I. Would you take a look?",
      progress: "Did you find anything? The sounds were worse last night.",
      complete: "A fox and her kits? All this worry over a family of foxes! Though I suppose it's good you checked - could have been something worse. Thank you for putting our minds at ease. And for rescuing the little ones."
    },

    rewards: {
      xp: 55,
      gold: 20,
      items: ["fox_charm"], // Lucky charm made by grateful villagers
      loreUnlock: ["old_well_history"],
      reputation: { dawnmere: 25 }
    },

    // Hidden discovery in the well
    hiddenContent: {
      type: "lore_fragment",
      id: "well_inscription",
      description: "Ancient symbols carved into the well stones - too worn to read fully, but they match symbols you'll see again later..."
    }
  }

};

// =====================================================
// Side Quest NPCs (Dawnmere additions)
// =====================================================

const SIDE_QUEST_NPCS = {
  shepherd_marcus: {
    id: "shepherd_marcus",
    name: "Marcus",
    role: "Shepherd",
    location: "dawnmere",

    dialogue: {
      greeting: "Fine day for the flock, wouldn't you say?",
      idle: [
        "Blanchard, Colette, Petit-Jean... I name them all, you know.",
        "In my old village, we had a hundred head. Now just these few.",
        "The sheep know when something's wrong. They've been nervous lately."
      ],
      noQuest: "The flock is content. Thank you again for your help."
    },

    quests: ["sq_1_02_lost_flock"]
  }
};

// =====================================================
// Side Quest Items
// =====================================================

const SIDE_QUEST_ITEMS = {
  honey_bread: {
    id: "honey_bread",
    name: "Rega's Honey Bread",
    type: "consumable",
    icon: "bread",
    description: "A warm loaf of honey bread made from a family recipe. Restores energy and boosts mood.",
    rarity: "common",
    stackable: true,
    maxStack: 5,
    value: 8,
    effect: {
      heal: 20,
      buff: "well_fed",
      duration: 300
    }
  },

  regas_friendship: {
    id: "regas_friendship",
    name: "Rega's Favor",
    type: "key_item",
    icon: "heart",
    description: "Rega considers you a friend. Free bread whenever you visit!",
    rarity: "uncommon",
    stackable: false,
    value: 0,
    effect: {
      unlocks: "free_bread_rega"
    }
  },

  fine_wool: {
    id: "fine_wool",
    name: "Fine Wool",
    type: "material",
    icon: "wool",
    description: "High-quality wool from Marcus's prized sheep. Useful for crafting.",
    rarity: "common",
    stackable: true,
    maxStack: 20,
    value: 12
  },

  shepherds_crook: {
    id: "shepherds_crook",
    name: "Shepherd's Crook",
    type: "weapon",
    icon: "staff",
    description: "A sturdy walking staff. Not much of a weapon, but reliable.",
    rarity: "common",
    stackable: false,
    value: 25,
    stats: {
      attack: 3,
      stamina: 5
    }
  },

  training_sword: {
    id: "training_sword",
    name: "Training Sword",
    type: "weapon",
    icon: "sword",
    description: "A wooden practice sword. Tommen made it himself.",
    rarity: "common",
    stackable: false,
    value: 15,
    stats: {
      attack: 2
    }
  },

  family_heirloom_blade: {
    id: "family_heirloom_blade",
    name: "Heirloom Blade",
    type: "weapon",
    icon: "sword",
    description: "Tommen's father's old sword. Well-maintained despite its age.",
    rarity: "uncommon",
    stackable: false,
    value: 75,
    stats: {
      attack: 8,
      insight: 1
    }
  },

  fox_charm: {
    id: "fox_charm",
    name: "Fox Charm",
    type: "accessory",
    icon: "charm",
    description: "A small carved fox, made by the village children as thanks. Said to bring luck.",
    rarity: "uncommon",
    stackable: false,
    value: 30,
    stats: {
      luck: 2
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SIDE_QUESTS,
    SIDE_QUEST_NPCS,
    SIDE_QUEST_ITEMS
  };
}
