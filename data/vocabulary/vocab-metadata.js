// ByteQuest Vocabulary Metadata
// Categories, difficulty levels, and quest mappings

const VOCAB_CATEGORIES = {
  // =====================================================
  // MAIN CATEGORIES
  // =====================================================

  family: {
    name: "Family",
    description: "Family members and relationships",
    subcategories: ["family_beginner", "family_intermediate", "family_phrases"]
  },
  farming: {
    name: "Farming",
    description: "Farm life, animals, and creatures",
    subcategories: ["farming_beginner", "farming_intermediate", "farming_creatures", "farming_phrases"]
  },
  basics: {
    name: "Basics",
    description: "Greetings and introductions",
    subcategories: ["greetings", "introductions"]
  },
  food: {
    name: "Food",
    description: "Food, cooking, and bakery",
    subcategories: ["food_beginner", "food_intermediate", "food_phrases"]
  },
  agriculture: {
    name: "Agriculture",
    description: "Crops, herbs, tools, and farming actions",
    subcategories: ["crops", "herbs", "tools", "agri_actions", "agri_phrases"]
  },
  nature: {
    name: "Nature",
    description: "Weather, landscape, wildlife, and plants",
    subcategories: ["weather", "landscape", "wildlife", "plants", "nature_phrases"]
  },
  travel: {
    name: "Travel",
    description: "Directions, journey, and movement",
    subcategories: ["directions", "journey", "travel_actions", "travel_phrases"]
  },
  commerce: {
    name: "Commerce",
    description: "Buying, selling, and trade",
    subcategories: ["buying", "selling", "commerce_phrases"]
  },
  time: {
    name: "Time",
    description: "Days, times, and temporal words",
    subcategories: ["time_basic"]
  },
  cognates: {
    name: "Cognates",
    description: "Words similar to English",
    subcategories: ["identical", "tion_pattern", "ment_pattern", "able_pattern", "near_cognates", "ique_pattern", "sound_alikes", "eur_pattern", "te_pattern", "eux_pattern"]
  },
  numbers: {
    name: "Numbers",
    description: "Counting and numerals",
    subcategories: ["numbers_0_10"]
  },
  colors: {
    name: "Colors",
    description: "Color words",
    subcategories: ["colors_basic"]
  },
  days: {
    name: "Days",
    description: "Days of the week",
    subcategories: ["days_week"]
  },
  verbs: {
    name: "Verbs",
    description: "Action words",
    subcategories: ["essential_verbs"]
  },
  body: {
    name: "Body",
    description: "Body parts",
    subcategories: ["body_parts"]
  }
};

// =====================================================
// SUBCATEGORY -> WORD ID MAPPINGS
// =====================================================

const VOCAB_SUBCATEGORIES = {
  // Family
  family_beginner: [
    "V_family_famille", "V_family_mere", "V_family_pere", "V_family_soeur",
    "V_family_frere", "V_family_fille", "V_family_fils", "V_family_grandmere",
    "V_family_grandpere", "V_family_oncle", "V_family_tante", "V_family_cousin",
    "V_family_cousine"
  ],
  family_intermediate: [
    "V_family_parents", "V_family_enfants", "V_family_mari", "V_family_femme",
    "V_family_neveu", "V_family_niece", "V_family_beaupere", "V_family_bellemere"
  ],
  family_phrases: [
    "V_family_ph_presente", "V_family_ph_voicifrere", "V_family_ph_cestsoeur",
    "V_family_ph_commentsappelle", "V_family_ph_ellesappelle"
  ],

  // Farming
  farming_beginner: [
    "V_farm_ferme", "V_farm_fermier", "V_farm_fermiere", "V_farm_champ",
    "V_farm_grange", "V_farm_ble", "V_farm_recolte", "V_farm_vache",
    "V_farm_cochon", "V_farm_poule", "V_farm_cheval", "V_farm_mouton"
  ],
  farming_intermediate: [
    "V_farm_semer", "V_farm_recolter", "V_farm_arroser", "V_farm_tracteur",
    "V_farm_charrue", "V_farm_foin", "V_farm_etable", "V_farm_verger"
  ],
  farming_creatures: [
    "V_farm_slime", "V_farm_monstre", "V_farm_creature", "V_farm_dangereux",
    "V_farm_attaquer", "V_farm_defendre"
  ],
  farming_phrases: [
    "V_farm_ph_slimesattaquent", "V_farm_ph_protegez", "V_farm_ph_fermedanger",
    "V_farm_ph_travaillechamps", "V_farm_ph_recoltebonne"
  ],

  // Basics
  greetings: [
    "V_greet_bonjour", "V_greet_bonsoir", "V_greet_salut", "V_greet_aurevoir",
    "V_greet_abientot", "V_greet_merci", "V_greet_svp", "V_greet_derien",
    "V_intro_enchante"
  ],
  introductions: [
    "V_intro_mappelle", "V_intro_commentappelezvous", "V_intro_jesuis",
    "V_intro_douvenezvous", "V_intro_jeviensde"
  ],

  // Food
  food_beginner: [
    "V_food_pain", "V_food_gateau", "V_food_farine", "V_food_beurre",
    "V_food_sucre", "V_food_sel", "V_food_oeuf", "V_food_lait",
    "V_food_eau", "V_food_fromage", "V_food_pomme", "V_food_croissant"
  ],
  food_intermediate: [
    "V_food_boulangerie", "V_food_boulanger", "V_food_boulangere",
    "V_food_four", "V_food_petrir", "V_food_cuire", "V_food_pate", "V_food_levure"
  ],
  food_phrases: [
    "V_food_ph_voudrais", "V_food_ph_delicieux", "V_food_ph_combien",
    "V_food_ph_baguette", "V_food_ph_frais"
  ],

  // Agriculture
  crops: [
    "V_farm_ble", "V_agri_mais", "V_agri_orge", "V_agri_avoine",
    "V_agri_seigle", "V_agri_riz", "V_agri_pommedeterre", "V_agri_carotte",
    "V_agri_oignon", "V_agri_tomate", "V_agri_haricot", "V_agri_pois"
  ],
  herbs: [
    "V_herb_basilic", "V_herb_persil", "V_herb_menthe", "V_herb_thym",
    "V_herb_romarin", "V_herb_sauge", "V_herb_lavande", "V_herb_ail",
    "V_herb_ciboulette", "V_herb_aneth"
  ],
  tools: [
    "V_tool_faux", "V_tool_houe", "V_tool_rateau", "V_tool_pelle",
    "V_tool_arrosoir", "V_tool_seau", "V_tool_brouette", "V_tool_gants"
  ],
  agri_actions: [
    "V_agri_planter", "V_agri_cultiver", "V_farm_arroser", "V_farm_recolter",
    "V_farm_semer", "V_agri_tailler", "V_agri_desherber", "V_agri_labourer"
  ],
  agri_phrases: [
    "V_farm_ph_recoltebonne", "V_agri_ph_arroser", "V_agri_ph_dores",
    "V_agri_ph_sentbon", "V_agri_ph_printemps"
  ],

  // Nature
  weather: [
    "V_weather_soleil", "V_weather_pluie", "V_weather_vent", "V_weather_nuage",
    "V_weather_orage", "V_weather_neige", "V_weather_brouillard", "V_weather_arcenciel",
    "V_weath_tempete", "V_weath_temperature"
  ],
  landscape: [
    "V_land_colline", "V_land_vallee", "V_land_riviere", "V_land_lac",
    "V_land_foret", "V_land_chemin", "V_land_pre", "V_land_prairie"
  ],
  wildlife: [
    "V_wild_oiseau", "V_wild_lapin", "V_wild_renard", "V_wild_cerf",
    "V_wild_sanglier", "V_wild_loup", "V_wild_abeille", "V_wild_papillon"
  ],
  plants: [
    "V_plant_arbre", "V_plant_fleur", "V_plant_herbe", "V_plant_feuille",
    "V_plant_racine", "V_plant_graine", "V_plant_champignon", "V_plant_mousse"
  ],
  nature_phrases: [
    "V_nature_ph_beau", "V_nature_ph_brille", "V_nature_ph_pleuvoir",
    "V_nature_ph_chantent", "V_nature_ph_belle"
  ],

  // Travel
  directions: [
    "V_dir_nord", "V_dir_sud", "V_dir_est", "V_dir_ouest",
    "V_dir_gauche", "V_dir_droite", "V_dir_toutdroit", "V_dir_presde",
    "V_dir_loinde", "V_dir_derriere"
  ],
  journey: [
    "V_travel_voyage", "V_travel_route", "V_land_chemin", "V_travel_carte",
    "V_travel_voyageur", "V_travel_bagage", "V_travel_destination",
    "V_travel_arrivee", "V_travel_depart", "V_travel_frontiere"
  ],
  travel_actions: [
    "V_travel_partir", "V_travel_arriver", "V_travel_marcher", "V_travel_courir",
    "V_travel_suivre", "V_travel_traverser", "V_travel_continuer", "V_travel_arreter"
  ],
  travel_phrases: [
    "V_travel_ph_ouallons", "V_travel_ph_parouest", "V_travel_ph_arrives",
    "V_travel_ph_longue", "V_travel_ph_suivezmoi"
  ],

  // Commerce
  buying: [
    "V_comm_acheter", "V_comm_prix", "V_comm_argent", "V_comm_piece",
    "V_comm_cher", "V_comm_bonmarche", "V_comm_client", "V_comm_monnaie"
  ],
  selling: [
    "V_comm_vendre", "V_comm_marchand", "V_comm_boutique", "V_comm_marche",
    "V_comm_marchandises", "V_comm_vente", "V_comm_offre", "V_comm_qualite"
  ],
  commerce_phrases: [
    "V_comm_ph_combien", "V_comm_ph_tropcher", "V_comm_ph_voudrais",
    "V_comm_ph_monnaie", "V_comm_ph_affaire"
  ],

  // Time
  time_basic: [
    "V_time_jour", "V_time_nuit", "V_time_matin", "V_time_apresmidi",
    "V_time_soir", "V_time_aujourdhui", "V_time_demain", "V_time_hier",
    "V_time_semaine", "V_time_mois"
  ],

  // Cognates
  identical: [
    "V_cog_table", "V_cog_animal", "V_cog_fruit", "V_cog_orange",
    "V_cog_train", "V_cog_taxi", "V_cog_hotel", "V_cog_restaurant",
    "V_cog_menu", "V_cog_rose", "V_cog_piano", "V_cog_radio"
  ],
  tion_pattern: [
    "V_tion_nation", "V_tion_situation", "V_tion_information", "V_tion_attention",
    "V_tion_question", "V_tion_solution", "V_tion_action", "V_tion_condition",
    "V_tion_position", "V_tion_tradition", "V_tion_conversation", "V_tion_destination"
  ],
  ment_pattern: [
    "V_ment_moment", "V_ment_appartement", "V_ment_gouvernement", "V_ment_document",
    "V_ment_monument", "V_ment_instrument", "V_ment_argument", "V_ment_sentiment",
    "V_ment_departement", "V_ment_compliment"
  ],
  able_pattern: [
    "V_able_possible", "V_able_impossible", "V_able_visible", "V_able_invisible",
    "V_able_capable", "V_able_probable", "V_able_terrible", "V_able_horrible",
    "V_able_adorable", "V_able_comfortable", "V_able_acceptable", "V_able_flexible"
  ],
  near_cognates: [
    "V_near_famille", "V_near_musique", "V_near_populaire", "V_near_different",
    "V_near_important", "V_near_intelligent", "V_near_president", "V_near_universite",
    "V_near_necessaire", "V_near_difficile", "V_near_exemple", "V_near_probleme"
  ],
  ique_pattern: [
    "V_ique_magique", "V_ique_fantastique", "V_ique_classique", "V_ique_electrique",
    "V_ique_automatique", "V_ique_romantique", "V_ique_publique", "V_ique_historique",
    "V_ique_pratique", "V_ique_economique", "V_ique_scientifique", "V_ique_politique"
  ],
  sound_alikes: [
    "V_sound_telephone", "V_sound_hopital", "V_sound_foret", "V_sound_ile",
    "V_sound_chateau", "V_sound_theatre", "V_sound_age", "V_sound_cote", "V_sound_role"
  ],
  eur_pattern: [
    "V_eur_acteur", "V_eur_docteur", "V_eur_directeur", "V_eur_professeur",
    "V_eur_auteur", "V_eur_empereur", "V_eur_visiteur", "V_eur_gouverneur",
    "V_eur_conducteur", "V_eur_inventeur"
  ],
  te_pattern: [
    "V_te_liberte", "V_te_qualite", "V_te_quantite", "V_te_societe",
    "V_te_cite", "V_te_beaute", "V_te_realite", "V_te_identite", "V_te_possibilite"
  ],
  eux_pattern: [
    "V_eux_dangereux", "V_eux_delicieux", "V_eux_furieux", "V_eux_curieux",
    "V_eux_serieux", "V_eux_mysterieux", "V_eux_precieux", "V_eux_ambitieux",
    "V_eux_nerveux", "V_eux_genereux"
  ],

  // Numbers, Colors, Days
  numbers_0_10: [
    "V_num_zero", "V_num_un", "V_num_deux", "V_num_trois", "V_num_quatre",
    "V_num_cinq", "V_num_six", "V_num_sept", "V_num_huit", "V_num_neuf", "V_num_dix"
  ],
  colors_basic: [
    "V_color_rouge", "V_color_bleu", "V_color_vert", "V_color_jaune",
    "V_color_orange", "V_color_violet", "V_color_rose", "V_color_noir",
    "V_color_blanc", "V_color_gris"
  ],
  days_week: [
    "V_day_lundi", "V_day_mardi", "V_day_mercredi", "V_day_jeudi",
    "V_day_vendredi", "V_day_samedi", "V_day_dimanche"
  ],

  // Verbs
  essential_verbs: [
    "V_verb_etre", "V_verb_avoir", "V_verb_faire", "V_verb_aller",
    "V_verb_voir", "V_travel_arriver", "V_travel_continuer",
    "V_verb_decider", "V_verb_preferer", "V_verb_changer"
  ],

  // Body Parts
  body_parts: [
    "V_body_tete", "V_body_bras", "V_body_main", "V_body_pied",
    "V_body_jambe", "V_body_coeur", "V_body_yeux", "V_body_nez",
    "V_body_bouche", "V_body_oreille"
  ],

  // Common Nouns
  common_nouns: [
    "V_common_livre", "V_common_maison", "V_weather_soleil", "V_common_lune",
    "V_common_chat", "V_common_porte", "V_common_jardin", "V_common_fenetre"
  ],

  // Food Cognates
  food_cognates: [
    "V_foodcog_cafe", "V_foodcog_chocolat", "V_foodcog_banane", "V_foodcog_salade",
    "V_foodcog_soupe", "V_foodcog_omelette", "V_foodcog_baguette",
    "V_food_croissant", "V_foodcog_crepe", "V_foodcog_dessert"
  ]
};

// =====================================================
// DIFFICULTY LEVELS (1-4)
// =====================================================

const VOCAB_DIFFICULTY = {
  // Tier 1: Beginner (cognates, common words)
  1: [
    // Identical cognates
    "V_cog_table", "V_cog_animal", "V_cog_fruit", "V_cog_orange",
    "V_cog_train", "V_cog_taxi", "V_cog_hotel", "V_cog_restaurant",
    "V_cog_menu", "V_cog_rose", "V_cog_piano", "V_cog_radio",
    // -tion pattern
    "V_tion_nation", "V_tion_situation", "V_tion_information", "V_tion_attention",
    "V_tion_question", "V_tion_solution", "V_tion_action",
    // Greetings
    "V_greet_bonjour", "V_greet_merci", "V_greet_salut", "V_greet_aurevoir",
    // Numbers
    "V_num_zero", "V_num_un", "V_num_deux", "V_num_trois", "V_num_quatre",
    "V_num_cinq", "V_num_six", "V_num_sept", "V_num_huit", "V_num_neuf", "V_num_dix",
    // Colors
    "V_color_rouge", "V_color_bleu", "V_color_vert", "V_color_jaune", "V_color_orange",
    // Common nouns
    "V_common_chat", "V_common_maison", "V_food_pain", "V_food_eau"
  ],

  // Tier 2: Elementary (near-cognates, basic vocabulary)
  2: [
    // -ment, -able patterns
    "V_ment_moment", "V_ment_appartement", "V_ment_document",
    "V_able_possible", "V_able_impossible", "V_able_terrible",
    // -ique pattern
    "V_ique_magique", "V_ique_fantastique", "V_ique_classique",
    // Near cognates
    "V_near_famille", "V_near_musique", "V_near_different", "V_near_important",
    // Family
    "V_family_mere", "V_family_pere", "V_family_frere", "V_family_soeur",
    // Farming basics
    "V_farm_ferme", "V_farm_vache", "V_farm_cheval", "V_farm_mouton",
    // Food
    "V_food_fromage", "V_food_lait", "V_food_pomme",
    // Days
    "V_day_lundi", "V_day_mardi", "V_day_mercredi", "V_day_dimanche"
  ],

  // Tier 3: Intermediate (less common, more abstract)
  3: [
    // -eur pattern
    "V_eur_acteur", "V_eur_docteur", "V_eur_directeur", "V_eur_professeur",
    // -té pattern
    "V_te_liberte", "V_te_qualite", "V_te_societe",
    // -eux pattern
    "V_eux_dangereux", "V_eux_delicieux", "V_eux_mysterieux",
    // Family intermediate
    "V_family_neveu", "V_family_niece", "V_family_beaupere",
    // Agriculture
    "V_agri_labourer", "V_agri_desherber", "V_herb_romarin", "V_herb_lavande",
    // Nature
    "V_wild_sanglier", "V_wild_renard", "V_land_prairie",
    // Commerce
    "V_comm_marchandises", "V_comm_qualite"
  ],

  // Tier 4: Advanced (abstract, literary, expressions)
  4: [
    // Government/abstract
    "V_ment_gouvernement", "V_ment_sentiment", "V_ment_argument",
    "V_te_identite", "V_te_possibilite", "V_te_realite",
    // Abstract adjectives
    "V_eux_ambitieux", "V_eux_precieux", "V_near_necessaire",
    // Complex vocabulary
    "V_eur_empereur", "V_eur_gouverneur"
  ]
};

// =====================================================
// LESSON MAPPINGS
// =====================================================

const VOCAB_LESSONS = {
  lesson_1: ["V_cog_table", "V_cog_animal", "V_cog_fruit", "V_cog_orange",
             "V_cog_train", "V_cog_taxi", "V_cog_hotel", "V_cog_restaurant",
             "V_cog_menu", "V_cog_rose", "V_cog_piano", "V_cog_radio"],

  lesson_2: ["V_tion_nation", "V_tion_situation", "V_tion_information", "V_tion_attention",
             "V_tion_question", "V_tion_solution", "V_tion_action", "V_tion_condition",
             "V_tion_position", "V_tion_tradition", "V_tion_conversation", "V_tion_destination"],

  lesson_3: ["V_ment_moment", "V_ment_appartement", "V_ment_gouvernement", "V_ment_document",
             "V_ment_monument", "V_ment_instrument", "V_ment_argument", "V_ment_sentiment",
             "V_ment_departement", "V_ment_compliment"],

  lesson_4: ["V_able_possible", "V_able_impossible", "V_able_visible", "V_able_invisible",
             "V_able_capable", "V_able_probable", "V_able_terrible", "V_able_horrible",
             "V_able_adorable", "V_able_comfortable", "V_able_acceptable", "V_able_flexible"],

  lesson_5: ["V_near_famille", "V_near_musique", "V_near_populaire", "V_near_different",
             "V_near_important", "V_near_intelligent", "V_near_president", "V_near_universite",
             "V_near_necessaire", "V_near_difficile", "V_near_exemple", "V_near_probleme"],

  lesson_6: ["V_ique_magique", "V_ique_fantastique", "V_ique_classique", "V_ique_electrique",
             "V_ique_automatique", "V_ique_romantique", "V_ique_publique", "V_ique_historique",
             "V_ique_pratique", "V_ique_economique", "V_ique_scientifique", "V_ique_politique"],

  lesson_7: ["V_sound_telephone", "V_sound_hopital", "V_sound_foret", "V_sound_ile",
             "V_sound_chateau", "V_sound_theatre", "V_sound_age", "V_sound_cote", "V_sound_role"],

  lesson_8: ["V_greet_bonjour", "V_greet_bonsoir", "V_greet_salut", "V_greet_aurevoir",
             "V_greet_merci", "V_greet_svp", "V_greet_derien", "V_intro_enchante"],

  lesson_9: ["V_common_livre", "V_common_maison", "V_food_pain", "V_food_pomme",
             "V_weather_soleil", "V_common_lune", "V_common_chat", "V_common_porte",
             "V_common_jardin", "V_common_fenetre"],

  lesson_10: ["V_family_mere", "V_family_pere", "V_family_soeur", "V_family_frere",
              "V_family_fille", "V_family_fils", "V_family_grandmere", "V_family_grandpere",
              "V_family_parents", "V_family_enfants"],

  lesson_11: ["V_eur_acteur", "V_eur_docteur", "V_eur_directeur", "V_eur_professeur",
              "V_eur_auteur", "V_eur_empereur", "V_eur_visiteur", "V_eur_gouverneur",
              "V_eur_conducteur", "V_eur_inventeur"],

  lesson_12: ["V_te_liberte", "V_te_qualite", "V_te_quantite", "V_te_societe",
              "V_te_cite", "V_te_beaute", "V_te_realite", "V_te_identite", "V_te_possibilite"],

  lesson_13: ["V_eux_dangereux", "V_eux_delicieux", "V_eux_furieux", "V_eux_curieux",
              "V_eux_serieux", "V_eux_mysterieux", "V_eux_precieux", "V_eux_ambitieux",
              "V_eux_nerveux", "V_eux_genereux"],

  lesson_14: ["V_num_zero", "V_num_un", "V_num_deux", "V_num_trois", "V_num_quatre",
              "V_num_cinq", "V_num_six", "V_num_sept", "V_num_huit", "V_num_neuf", "V_num_dix"],

  lesson_15: ["V_color_rouge", "V_color_bleu", "V_color_vert", "V_color_jaune",
              "V_color_orange", "V_color_violet", "V_color_rose", "V_color_noir",
              "V_color_blanc", "V_color_gris"],

  lesson_16: ["V_day_lundi", "V_day_mardi", "V_day_mercredi", "V_day_jeudi",
              "V_day_vendredi", "V_day_samedi", "V_day_dimanche"],

  lesson_17: ["V_verb_etre", "V_verb_avoir", "V_verb_faire", "V_verb_aller",
              "V_verb_voir", "V_travel_arriver", "V_travel_continuer",
              "V_verb_decider", "V_verb_preferer", "V_verb_changer"],

  lesson_18: ["V_foodcog_cafe", "V_foodcog_chocolat", "V_foodcog_banane", "V_foodcog_salade",
              "V_foodcog_soupe", "V_foodcog_omelette", "V_foodcog_baguette",
              "V_food_croissant", "V_foodcog_crepe", "V_foodcog_dessert"],

  lesson_19: ["V_body_tete", "V_body_bras", "V_body_main", "V_body_pied",
              "V_body_jambe", "V_body_coeur", "V_body_yeux", "V_body_nez",
              "V_body_bouche", "V_body_oreille"],

  lesson_20: ["V_weather_soleil", "V_weather_pluie", "V_weather_vent", "V_weather_neige",
              "V_weather_nuage", "V_weath_tempete", "V_weather_brouillard",
              "V_weath_temperature", "V_weath_chaud", "V_weath_froid"]
};

// =====================================================
// QUEST MAPPINGS
// =====================================================

const VOCAB_QUESTS = {
  // Main story quests
  meeting_family: ["V_family_mere", "V_family_pere", "V_family_frere", "V_family_soeur",
                   "V_family_famille", "V_greet_bonjour", "V_intro_mappelle"],

  slime_farming: ["V_farm_ferme", "V_farm_fermier", "V_farm_champ", "V_farm_vache",
                  "V_farm_slime", "V_farm_attaquer", "V_farm_defendre"],

  bakers_dozen: ["V_food_pain", "V_food_farine", "V_food_beurre", "V_food_oeuf",
                 "V_food_boulangerie", "V_food_four", "V_food_croissant"],

  // Grammar quests
  grammar_etre_intro: ["V_verb_etre", "V_family_famille"],
  grammar_avoir_intro: ["V_verb_avoir"],
  grammar_gender_intro: ["V_common_livre", "V_common_maison", "V_weather_soleil", "V_common_lune"],
  grammar_aller_intro: ["V_verb_aller", "V_travel_voyage", "V_travel_destination"],
  grammar_regular_er: ["V_farm_semer", "V_farm_arroser", "V_agri_planter"]
};

// =====================================================
// ZONE MAPPINGS
// =====================================================

const VOCAB_ZONES = {
  dawnmere: {
    categories: ["family", "basics", "food"],
    subcategories: ["greetings", "introductions", "family_beginner", "food_beginner"]
  },
  haari_fields: {
    categories: ["farming", "agriculture", "nature"],
    subcategories: ["farming_beginner", "farming_intermediate", "crops", "herbs", "weather", "plants"]
  },
  miners_deep: {
    categories: ["tools", "commerce"],
    subcategories: ["tools", "buying", "selling"]
  },
  northern_forest: {
    categories: ["nature"],
    subcategories: ["wildlife", "landscape", "plants"]
  },
  the_moorings: {
    categories: ["commerce", "food", "travel"],
    subcategories: ["buying", "selling", "commerce_phrases", "food_intermediate", "journey"]
  },
  the_weald: {
    categories: ["cognates"],
    subcategories: ["near_cognates", "eux_pattern", "te_pattern"]
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VOCAB_CATEGORIES,
    VOCAB_SUBCATEGORIES,
    VOCAB_DIFFICULTY,
    VOCAB_LESSONS,
    VOCAB_QUESTS,
    VOCAB_ZONES
  };
}
