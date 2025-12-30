// ByteQuest Normalized Vocabulary Core
// Compact word entries: id -> [french, article, english[], partOfSpeech]
// Article: 'le', 'la', 'l\'', 'les', null (for verbs, adjectives, phrases)

const VOCAB = {
  // =====================================================
  // FAMILY
  // =====================================================

  // Family - Beginner
  V_family_famille: ["famille", "la", ["the family", "family"], "noun"],
  V_family_mere: ["mère", "la", ["the mother", "mother"], "noun"],
  V_family_pere: ["père", "le", ["the father", "father"], "noun"],
  V_family_soeur: ["sœur", "la", ["the sister", "sister"], "noun"],
  V_family_frere: ["frère", "le", ["the brother", "brother"], "noun"],
  V_family_fille: ["fille", "la", ["the daughter", "daughter", "girl"], "noun"],
  V_family_fils: ["fils", "le", ["the son", "son"], "noun"],
  V_family_grandmere: ["grand-mère", "la", ["the grandmother", "grandmother"], "noun"],
  V_family_grandpere: ["grand-père", "le", ["the grandfather", "grandfather"], "noun"],
  V_family_oncle: ["oncle", "l'", ["the uncle", "uncle"], "noun"],
  V_family_tante: ["tante", "la", ["the aunt", "aunt"], "noun"],
  V_family_cousin: ["cousin", "le", ["the cousin (male)", "cousin"], "noun"],
  V_family_cousine: ["cousine", "la", ["the cousin (female)", "cousin"], "noun"],

  // Family - Intermediate
  V_family_parents: ["parents", "les", ["the parents", "parents", "relatives"], "noun"],
  V_family_enfants: ["enfants", "les", ["the children", "children"], "noun"],
  V_family_mari: ["mari", "le", ["the husband", "husband"], "noun"],
  V_family_femme: ["femme", "la", ["the wife", "woman", "wife"], "noun"],
  V_family_neveu: ["neveu", "le", ["the nephew", "nephew"], "noun"],
  V_family_niece: ["nièce", "la", ["the niece", "niece"], "noun"],
  V_family_beaupere: ["beau-père", "le", ["the father-in-law", "father-in-law"], "noun"],
  V_family_bellemere: ["belle-mère", "la", ["the mother-in-law", "mother-in-law"], "noun"],

  // Family - Phrases
  V_family_ph_presente: ["Je vous présente ma famille", null, ["I introduce you to my family"], "phrase"],
  V_family_ph_voicifrere: ["Voici mon frère", null, ["Here is my brother"], "phrase"],
  V_family_ph_cestsoeur: ["C'est ma sœur", null, ["This is my sister"], "phrase"],
  V_family_ph_commentsappelle: ["Comment s'appelle-t-il?", null, ["What is his name?"], "phrase"],
  V_family_ph_ellesappelle: ["Elle s'appelle...", null, ["Her name is..."], "phrase"],

  // =====================================================
  // FARMING
  // =====================================================

  // Farming - Beginner
  V_farm_ferme: ["ferme", "la", ["the farm", "farm"], "noun"],
  V_farm_fermier: ["fermier", "le", ["the farmer (male)", "farmer"], "noun"],
  V_farm_fermiere: ["fermière", "la", ["the farmer (female)", "farmer"], "noun"],
  V_farm_champ: ["champ", "le", ["the field", "field"], "noun"],
  V_farm_grange: ["grange", "la", ["the barn", "barn"], "noun"],
  V_farm_ble: ["blé", "le", ["the wheat", "wheat"], "noun"],
  V_farm_recolte: ["récolte", "la", ["the harvest", "harvest"], "noun"],
  V_farm_vache: ["vache", "la", ["the cow", "cow"], "noun"],
  V_farm_cochon: ["cochon", "le", ["the pig", "pig"], "noun"],
  V_farm_poule: ["poule", "la", ["the hen", "hen", "chicken"], "noun"],
  V_farm_cheval: ["cheval", "le", ["the horse", "horse"], "noun"],
  V_farm_mouton: ["mouton", "le", ["the sheep", "sheep"], "noun"],

  // Farming - Intermediate
  V_farm_semer: ["semer", null, ["to sow", "to plant"], "verb"],
  V_farm_recolter: ["récolter", null, ["to harvest"], "verb"],
  V_farm_arroser: ["arroser", null, ["to water"], "verb"],
  V_farm_tracteur: ["tracteur", "le", ["the tractor", "tractor"], "noun"],
  V_farm_charrue: ["charrue", "la", ["the plow", "plow"], "noun"],
  V_farm_foin: ["foin", "le", ["the hay", "hay"], "noun"],
  V_farm_etable: ["étable", "l'", ["the stable", "stable"], "noun"],
  V_farm_verger: ["verger", "le", ["the orchard", "orchard"], "noun"],

  // Farming - Creatures
  V_farm_slime: ["slime", "le", ["the slime", "slime"], "noun"],
  V_farm_monstre: ["monstre", "le", ["the monster", "monster"], "noun"],
  V_farm_creature: ["créature", "la", ["the creature", "creature"], "noun"],
  V_farm_dangereux: ["dangereux", null, ["dangerous"], "adjective"],
  V_farm_attaquer: ["attaquer", null, ["to attack"], "verb"],
  V_farm_defendre: ["défendre", null, ["to defend"], "verb"],

  // Farming - Phrases
  V_farm_ph_slimesattaquent: ["Les slimes attaquent!", null, ["The slimes are attacking!"], "phrase"],
  V_farm_ph_protegez: ["Protégez les cultures!", null, ["Protect the crops!"], "phrase"],
  V_farm_ph_fermedanger: ["La ferme est en danger", null, ["The farm is in danger"], "phrase"],
  V_farm_ph_travaillechamps: ["Je travaille dans les champs", null, ["I work in the fields"], "phrase"],
  V_farm_ph_recoltebonne: ["La récolte est bonne", null, ["The harvest is good"], "phrase"],

  // =====================================================
  // BASICS - GREETINGS
  // =====================================================

  V_greet_bonjour: ["Bonjour", null, ["Hello", "Good day"], "greeting"],
  V_greet_bonsoir: ["Bonsoir", null, ["Good evening"], "greeting"],
  V_greet_salut: ["Salut", null, ["Hi", "Hey"], "greeting"],
  V_greet_aurevoir: ["Au revoir", null, ["Goodbye"], "greeting"],
  V_greet_abientot: ["À bientôt", null, ["See you soon"], "greeting"],
  V_greet_merci: ["Merci", null, ["Thank you", "Thanks"], "greeting"],
  V_greet_svp: ["S'il vous plaît", null, ["Please"], "greeting"],
  V_greet_derien: ["De rien", null, ["You're welcome", "It's nothing"], "greeting"],

  // Basics - Introductions
  V_intro_mappelle: ["Je m'appelle...", null, ["My name is..."], "phrase"],
  V_intro_commentappelezvous: ["Comment vous appelez-vous?", null, ["What is your name?"], "phrase"],
  V_intro_enchante: ["Enchanté(e)", null, ["Nice to meet you", "Pleased to meet you"], "greeting"],
  V_intro_jesuis: ["Je suis...", null, ["I am..."], "phrase"],
  V_intro_douvenezvous: ["D'où venez-vous?", null, ["Where are you from?"], "phrase"],
  V_intro_jeviensde: ["Je viens de...", null, ["I come from..."], "phrase"],

  // =====================================================
  // FOOD
  // =====================================================

  // Food - Beginner
  V_food_pain: ["pain", "le", ["the bread", "bread"], "noun"],
  V_food_gateau: ["gâteau", "le", ["the cake", "cake"], "noun"],
  V_food_farine: ["farine", "la", ["the flour", "flour"], "noun"],
  V_food_beurre: ["beurre", "le", ["the butter", "butter"], "noun"],
  V_food_sucre: ["sucre", "le", ["the sugar", "sugar"], "noun"],
  V_food_sel: ["sel", "le", ["the salt", "salt"], "noun"],
  V_food_oeuf: ["œuf", "l'", ["the egg", "egg"], "noun"],
  V_food_lait: ["lait", "le", ["the milk", "milk"], "noun"],
  V_food_eau: ["eau", "l'", ["the water", "water"], "noun"],
  V_food_fromage: ["fromage", "le", ["the cheese", "cheese"], "noun"],
  V_food_pomme: ["pomme", "la", ["the apple", "apple"], "noun"],
  V_food_croissant: ["croissant", "le", ["the croissant", "croissant"], "noun"],

  // Food - Intermediate
  V_food_boulangerie: ["boulangerie", "la", ["the bakery", "bakery"], "noun"],
  V_food_boulanger: ["boulanger", "le", ["the baker (male)", "baker"], "noun"],
  V_food_boulangere: ["boulangère", "la", ["the baker (female)", "baker"], "noun"],
  V_food_four: ["four", "le", ["the oven", "oven"], "noun"],
  V_food_petrir: ["pétrir", null, ["to knead"], "verb"],
  V_food_cuire: ["cuire", null, ["to bake", "to cook"], "verb"],
  V_food_pate: ["pâte", "la", ["the dough", "dough"], "noun"],
  V_food_levure: ["levure", "la", ["the yeast", "yeast"], "noun"],

  // Food - Phrases
  V_food_ph_voudrais: ["Je voudrais du pain", null, ["I would like some bread"], "phrase"],
  V_food_ph_delicieux: ["C'est délicieux!", null, ["It's delicious!"], "phrase"],
  V_food_ph_combien: ["Combien ça coûte?", null, ["How much does it cost?"], "phrase"],
  V_food_ph_baguette: ["Une baguette, s'il vous plaît", null, ["A baguette, please"], "phrase"],
  V_food_ph_frais: ["C'est frais", null, ["It's fresh"], "phrase"],

  // =====================================================
  // AGRICULTURE
  // =====================================================

  // Crops
  V_agri_mais: ["maïs", "le", ["the corn", "corn"], "noun"],
  V_agri_orge: ["orge", "l'", ["the barley", "barley"], "noun"],
  V_agri_avoine: ["avoine", "l'", ["the oats", "oats"], "noun"],
  V_agri_seigle: ["seigle", "le", ["the rye", "rye"], "noun"],
  V_agri_riz: ["riz", "le", ["the rice", "rice"], "noun"],
  V_agri_pommedeterre: ["pomme de terre", "la", ["the potato", "potato"], "noun"],
  V_agri_carotte: ["carotte", "la", ["the carrot", "carrot"], "noun"],
  V_agri_oignon: ["oignon", "l'", ["the onion", "onion"], "noun"],
  V_agri_tomate: ["tomate", "la", ["the tomato", "tomato"], "noun"],
  V_agri_haricot: ["haricot", "le", ["the bean", "bean"], "noun"],
  V_agri_pois: ["pois", "le", ["the pea", "pea"], "noun"],

  // Herbs
  V_herb_basilic: ["basilic", "le", ["the basil", "basil"], "noun"],
  V_herb_persil: ["persil", "le", ["the parsley", "parsley"], "noun"],
  V_herb_menthe: ["menthe", "la", ["the mint", "mint"], "noun"],
  V_herb_thym: ["thym", "le", ["the thyme", "thyme"], "noun"],
  V_herb_romarin: ["romarin", "le", ["the rosemary", "rosemary"], "noun"],
  V_herb_sauge: ["sauge", "la", ["the sage", "sage"], "noun"],
  V_herb_lavande: ["lavande", "la", ["the lavender", "lavender"], "noun"],
  V_herb_ail: ["ail", "l'", ["the garlic", "garlic"], "noun"],
  V_herb_ciboulette: ["ciboulette", "la", ["the chives", "chives"], "noun"],
  V_herb_aneth: ["aneth", "l'", ["the dill", "dill"], "noun"],

  // Tools
  V_tool_faux: ["faux", "la", ["the scythe", "scythe"], "noun"],
  V_tool_houe: ["houe", "la", ["the hoe", "hoe"], "noun"],
  V_tool_rateau: ["râteau", "le", ["the rake", "rake"], "noun"],
  V_tool_pelle: ["pelle", "la", ["the shovel", "shovel"], "noun"],
  V_tool_arrosoir: ["arrosoir", "l'", ["the watering can", "watering can"], "noun"],
  V_tool_seau: ["seau", "le", ["the bucket", "bucket"], "noun"],
  V_tool_brouette: ["brouette", "la", ["the wheelbarrow", "wheelbarrow"], "noun"],
  V_tool_gants: ["gants", "les", ["the gloves", "gloves"], "noun"],

  // Agriculture Actions
  V_agri_planter: ["planter", null, ["to plant"], "verb"],
  V_agri_cultiver: ["cultiver", null, ["to cultivate"], "verb"],
  V_agri_tailler: ["tailler", null, ["to prune"], "verb"],
  V_agri_desherber: ["désherber", null, ["to weed"], "verb"],
  V_agri_labourer: ["labourer", null, ["to plow"], "verb"],

  // Agriculture Phrases
  V_agri_ph_arroser: ["Il faut arroser les plantes", null, ["We must water the plants"], "phrase"],
  V_agri_ph_dores: ["Les champs sont dorés", null, ["The fields are golden"], "phrase"],
  V_agri_ph_sentbon: ["Cette herbe sent bon", null, ["This herb smells good"], "phrase"],
  V_agri_ph_printemps: ["Plantez au printemps", null, ["Plant in spring"], "phrase"],

  // =====================================================
  // NATURE
  // =====================================================

  // Weather
  V_weather_soleil: ["soleil", "le", ["the sun", "sun"], "noun"],
  V_weather_pluie: ["pluie", "la", ["the rain", "rain"], "noun"],
  V_weather_vent: ["vent", "le", ["the wind", "wind"], "noun"],
  V_weather_nuage: ["nuage", "le", ["the cloud", "cloud"], "noun"],
  V_weather_orage: ["orage", "l'", ["the storm", "storm"], "noun"],
  V_weather_neige: ["neige", "la", ["the snow", "snow"], "noun"],
  V_weather_brouillard: ["brouillard", "le", ["the fog", "fog"], "noun"],
  V_weather_arcenciel: ["arc-en-ciel", "l'", ["the rainbow", "rainbow"], "noun"],

  // Landscape
  V_land_colline: ["colline", "la", ["the hill", "hill"], "noun"],
  V_land_vallee: ["vallée", "la", ["the valley", "valley"], "noun"],
  V_land_riviere: ["rivière", "la", ["the river", "river"], "noun"],
  V_land_lac: ["lac", "le", ["the lake", "lake"], "noun"],
  V_land_foret: ["forêt", "la", ["the forest", "forest"], "noun"],
  V_land_chemin: ["chemin", "le", ["the path", "path"], "noun"],
  V_land_pre: ["pré", "le", ["the meadow", "meadow"], "noun"],
  V_land_prairie: ["prairie", "la", ["the prairie", "prairie"], "noun"],

  // Wildlife
  V_wild_oiseau: ["oiseau", "l'", ["the bird", "bird"], "noun"],
  V_wild_lapin: ["lapin", "le", ["the rabbit", "rabbit"], "noun"],
  V_wild_renard: ["renard", "le", ["the fox", "fox"], "noun"],
  V_wild_cerf: ["cerf", "le", ["the deer", "deer"], "noun"],
  V_wild_sanglier: ["sanglier", "le", ["the wild boar", "wild boar"], "noun"],
  V_wild_loup: ["loup", "le", ["the wolf", "wolf"], "noun"],
  V_wild_abeille: ["abeille", "l'", ["the bee", "bee"], "noun"],
  V_wild_papillon: ["papillon", "le", ["the butterfly", "butterfly"], "noun"],

  // Plants
  V_plant_arbre: ["arbre", "l'", ["the tree", "tree"], "noun"],
  V_plant_fleur: ["fleur", "la", ["the flower", "flower"], "noun"],
  V_plant_herbe: ["herbe", "l'", ["the grass", "grass"], "noun"],
  V_plant_feuille: ["feuille", "la", ["the leaf", "leaf"], "noun"],
  V_plant_racine: ["racine", "la", ["the root", "root"], "noun"],
  V_plant_graine: ["graine", "la", ["the seed", "seed"], "noun"],
  V_plant_champignon: ["champignon", "le", ["the mushroom", "mushroom"], "noun"],
  V_plant_mousse: ["mousse", "la", ["the moss", "moss"], "noun"],

  // Nature Phrases
  V_nature_ph_beau: ["Il fait beau aujourd'hui", null, ["The weather is nice today"], "phrase"],
  V_nature_ph_brille: ["Le soleil brille", null, ["The sun is shining"], "phrase"],
  V_nature_ph_pleuvoir: ["Il va pleuvoir", null, ["It's going to rain"], "phrase"],
  V_nature_ph_chantent: ["Les oiseaux chantent", null, ["The birds are singing"], "phrase"],
  V_nature_ph_belle: ["La nature est belle", null, ["Nature is beautiful"], "phrase"],

  // =====================================================
  // TRAVEL
  // =====================================================

  // Directions
  V_dir_nord: ["nord", "le", ["the north", "north"], "noun"],
  V_dir_sud: ["sud", "le", ["the south", "south"], "noun"],
  V_dir_est: ["est", "l'", ["the east", "east"], "noun"],
  V_dir_ouest: ["ouest", "l'", ["the west", "west"], "noun"],
  V_dir_gauche: ["à gauche", null, ["to the left", "left"], "adverb"],
  V_dir_droite: ["à droite", null, ["to the right", "right"], "adverb"],
  V_dir_toutdroit: ["tout droit", null, ["straight ahead"], "adverb"],
  V_dir_presde: ["près de", null, ["near", "close to"], "preposition"],
  V_dir_loinde: ["loin de", null, ["far from"], "preposition"],
  V_dir_derriere: ["derrière", null, ["behind"], "preposition"],

  // Journey
  V_travel_voyage: ["voyage", "le", ["the journey", "journey", "trip"], "noun"],
  V_travel_route: ["route", "la", ["the road", "road"], "noun"],
  V_travel_carte: ["carte", "la", ["the map", "map"], "noun"],
  V_travel_voyageur: ["voyageur", "le", ["the traveler", "traveler"], "noun"],
  V_travel_bagage: ["bagage", "le", ["the luggage", "luggage"], "noun"],
  V_travel_destination: ["destination", "la", ["the destination", "destination"], "noun"],
  V_travel_arrivee: ["arrivée", "l'", ["the arrival", "arrival"], "noun"],
  V_travel_depart: ["départ", "le", ["the departure", "departure"], "noun"],
  V_travel_frontiere: ["frontière", "la", ["the border", "border"], "noun"],

  // Travel Actions
  V_travel_partir: ["partir", null, ["to leave", "to depart"], "verb"],
  V_travel_arriver: ["arriver", null, ["to arrive"], "verb"],
  V_travel_marcher: ["marcher", null, ["to walk"], "verb"],
  V_travel_courir: ["courir", null, ["to run"], "verb"],
  V_travel_suivre: ["suivre", null, ["to follow"], "verb"],
  V_travel_traverser: ["traverser", null, ["to cross"], "verb"],
  V_travel_continuer: ["continuer", null, ["to continue"], "verb"],
  V_travel_arreter: ["s'arrêter", null, ["to stop"], "verb"],

  // Travel Phrases
  V_travel_ph_ouallons: ["Où allons-nous?", null, ["Where are we going?"], "phrase"],
  V_travel_ph_parouest: ["Par où est-ce?", null, ["Which way is it?"], "phrase"],
  V_travel_ph_arrives: ["Nous sommes arrivés", null, ["We have arrived"], "phrase"],
  V_travel_ph_longue: ["La route est longue", null, ["The road is long"], "phrase"],
  V_travel_ph_suivezmoi: ["Suivez-moi", null, ["Follow me"], "phrase"],

  // =====================================================
  // COMMERCE
  // =====================================================

  // Buying
  V_comm_acheter: ["acheter", null, ["to buy"], "verb"],
  V_comm_prix: ["prix", "le", ["the price", "price"], "noun"],
  V_comm_argent: ["argent", "l'", ["the money", "money"], "noun"],
  V_comm_piece: ["pièce", "la", ["the coin", "coin"], "noun"],
  V_comm_cher: ["cher", null, ["expensive"], "adjective"],
  V_comm_bonmarche: ["bon marché", null, ["cheap", "inexpensive"], "adjective"],
  V_comm_client: ["client", "le", ["the customer", "customer"], "noun"],
  V_comm_monnaie: ["monnaie", "la", ["the change", "change"], "noun"],

  // Selling
  V_comm_vendre: ["vendre", null, ["to sell"], "verb"],
  V_comm_marchand: ["marchand", "le", ["the merchant", "merchant"], "noun"],
  V_comm_boutique: ["boutique", "la", ["the shop", "shop"], "noun"],
  V_comm_marche: ["marché", "le", ["the market", "market"], "noun"],
  V_comm_marchandises: ["marchandises", "les", ["the goods", "goods"], "noun"],
  V_comm_vente: ["vente", "la", ["the sale", "sale"], "noun"],
  V_comm_offre: ["offre", "l'", ["the offer", "offer"], "noun"],
  V_comm_qualite: ["qualité", "la", ["the quality", "quality"], "noun"],

  // Commerce Phrases
  V_comm_ph_combien: ["Combien ça coûte?", null, ["How much does it cost?"], "phrase"],
  V_comm_ph_tropcher: ["C'est trop cher", null, ["It's too expensive"], "phrase"],
  V_comm_ph_voudrais: ["Je voudrais acheter", null, ["I would like to buy"], "phrase"],
  V_comm_ph_monnaie: ["Voici votre monnaie", null, ["Here is your change"], "phrase"],
  V_comm_ph_affaire: ["Bonne affaire!", null, ["Good deal!"], "phrase"],

  // =====================================================
  // TIME
  // =====================================================

  V_time_jour: ["jour", "le", ["the day", "day"], "noun"],
  V_time_nuit: ["nuit", "la", ["the night", "night"], "noun"],
  V_time_matin: ["matin", "le", ["the morning", "morning"], "noun"],
  V_time_apresmidi: ["après-midi", "l'", ["the afternoon", "afternoon"], "noun"],
  V_time_soir: ["soir", "le", ["the evening", "evening"], "noun"],
  V_time_aujourdhui: ["aujourd'hui", null, ["today"], "adverb"],
  V_time_demain: ["demain", null, ["tomorrow"], "adverb"],
  V_time_hier: ["hier", null, ["yesterday"], "adverb"],
  V_time_semaine: ["semaine", "la", ["the week", "week"], "noun"],
  V_time_mois: ["mois", "le", ["the month", "month"], "noun"],

  // =====================================================
  // LESSONS - COGNATES
  // =====================================================

  // Lesson 1: Identical Cognates
  V_cog_table: ["table", "la", ["table"], "noun"],
  V_cog_animal: ["animal", "l'", ["animal"], "noun"],
  V_cog_fruit: ["fruit", "le", ["fruit"], "noun"],
  V_cog_orange: ["orange", "l'", ["orange"], "noun"],
  V_cog_train: ["train", "le", ["train"], "noun"],
  V_cog_taxi: ["taxi", "le", ["taxi"], "noun"],
  V_cog_hotel: ["hotel", "l'", ["hotel"], "noun"],
  V_cog_restaurant: ["restaurant", "le", ["restaurant"], "noun"],
  V_cog_menu: ["menu", "le", ["menu"], "noun"],
  V_cog_rose: ["rose", "la", ["rose"], "noun"],
  V_cog_piano: ["piano", "le", ["piano"], "noun"],
  V_cog_radio: ["radio", "la", ["radio"], "noun"],

  // Lesson 2: -tion Pattern
  V_tion_nation: ["nation", "la", ["nation"], "noun"],
  V_tion_situation: ["situation", "la", ["situation"], "noun"],
  V_tion_information: ["information", "l'", ["information"], "noun"],
  V_tion_attention: ["attention", "l'", ["attention"], "noun"],
  V_tion_question: ["question", "la", ["question"], "noun"],
  V_tion_solution: ["solution", "la", ["solution"], "noun"],
  V_tion_action: ["action", "l'", ["action"], "noun"],
  V_tion_condition: ["condition", "la", ["condition"], "noun"],
  V_tion_position: ["position", "la", ["position"], "noun"],
  V_tion_tradition: ["tradition", "la", ["tradition"], "noun"],
  V_tion_conversation: ["conversation", "la", ["conversation"], "noun"],
  V_tion_destination: ["destination", "la", ["destination"], "noun"],

  // Lesson 3: -ment Pattern
  V_ment_moment: ["moment", "le", ["moment"], "noun"],
  V_ment_appartement: ["appartement", "l'", ["apartment"], "noun"],
  V_ment_gouvernement: ["gouvernement", "le", ["government"], "noun"],
  V_ment_document: ["document", "le", ["document"], "noun"],
  V_ment_monument: ["monument", "le", ["monument"], "noun"],
  V_ment_instrument: ["instrument", "l'", ["instrument"], "noun"],
  V_ment_argument: ["argument", "l'", ["argument"], "noun"],
  V_ment_sentiment: ["sentiment", "le", ["sentiment", "feeling"], "noun"],
  V_ment_departement: ["département", "le", ["department"], "noun"],
  V_ment_compliment: ["compliment", "le", ["compliment"], "noun"],

  // Lesson 4: -able/-ible Pattern
  V_able_possible: ["possible", null, ["possible"], "adjective"],
  V_able_impossible: ["impossible", null, ["impossible"], "adjective"],
  V_able_visible: ["visible", null, ["visible"], "adjective"],
  V_able_invisible: ["invisible", null, ["invisible"], "adjective"],
  V_able_capable: ["capable", null, ["capable"], "adjective"],
  V_able_probable: ["probable", null, ["probable"], "adjective"],
  V_able_terrible: ["terrible", null, ["terrible"], "adjective"],
  V_able_horrible: ["horrible", null, ["horrible"], "adjective"],
  V_able_adorable: ["adorable", null, ["adorable"], "adjective"],
  V_able_comfortable: ["comfortable", null, ["comfortable"], "adjective"],
  V_able_acceptable: ["acceptable", null, ["acceptable"], "adjective"],
  V_able_flexible: ["flexible", null, ["flexible"], "adjective"],

  // Lesson 5: Near Cognates
  V_near_famille: ["famille", "la", ["family"], "noun"],
  V_near_musique: ["musique", "la", ["music"], "noun"],
  V_near_populaire: ["populaire", null, ["popular"], "adjective"],
  V_near_different: ["différent", null, ["different"], "adjective"],
  V_near_important: ["important", null, ["important"], "adjective"],
  V_near_intelligent: ["intelligent", null, ["intelligent"], "adjective"],
  V_near_president: ["président", "le", ["president"], "noun"],
  V_near_universite: ["université", "l'", ["university"], "noun"],
  V_near_necessaire: ["nécessaire", null, ["necessary"], "adjective"],
  V_near_difficile: ["difficile", null, ["difficult"], "adjective"],
  V_near_exemple: ["exemple", "l'", ["example"], "noun"],
  V_near_probleme: ["problème", "le", ["problem"], "noun"],

  // Lesson 6: -ique Pattern
  V_ique_magique: ["magique", null, ["magic", "magical"], "adjective"],
  V_ique_fantastique: ["fantastique", null, ["fantastic"], "adjective"],
  V_ique_classique: ["classique", null, ["classic", "classical"], "adjective"],
  V_ique_electrique: ["électrique", null, ["electric"], "adjective"],
  V_ique_automatique: ["automatique", null, ["automatic"], "adjective"],
  V_ique_romantique: ["romantique", null, ["romantic"], "adjective"],
  V_ique_publique: ["publique", null, ["public"], "adjective"],
  V_ique_historique: ["historique", null, ["historic"], "adjective"],
  V_ique_pratique: ["pratique", null, ["practical"], "adjective"],
  V_ique_economique: ["économique", null, ["economic"], "adjective"],
  V_ique_scientifique: ["scientifique", null, ["scientific"], "adjective"],
  V_ique_politique: ["politique", null, ["political"], "adjective"],

  // Lesson 7: Sound-Alikes
  V_sound_telephone: ["téléphone", "le", ["telephone"], "noun"],
  V_sound_hopital: ["hôpital", "l'", ["hospital"], "noun"],
  V_sound_foret: ["forêt", "la", ["forest"], "noun"],
  V_sound_ile: ["île", "l'", ["isle", "island"], "noun"],
  V_sound_chateau: ["château", "le", ["castle"], "noun"],
  V_sound_theatre: ["théâtre", "le", ["theater"], "noun"],
  V_sound_age: ["âge", "l'", ["age"], "noun"],
  V_sound_cote: ["côte", "la", ["coast"], "noun"],
  V_sound_role: ["rôle", "le", ["role"], "noun"],

  // Lesson 11: -eur Pattern
  V_eur_acteur: ["acteur", "l'", ["actor"], "noun"],
  V_eur_docteur: ["docteur", "le", ["doctor"], "noun"],
  V_eur_directeur: ["directeur", "le", ["director"], "noun"],
  V_eur_professeur: ["professeur", "le", ["professor"], "noun"],
  V_eur_auteur: ["auteur", "l'", ["author"], "noun"],
  V_eur_empereur: ["empereur", "l'", ["emperor"], "noun"],
  V_eur_visiteur: ["visiteur", "le", ["visitor"], "noun"],
  V_eur_gouverneur: ["gouverneur", "le", ["governor"], "noun"],
  V_eur_conducteur: ["conducteur", "le", ["conductor"], "noun"],
  V_eur_inventeur: ["inventeur", "l'", ["inventor"], "noun"],

  // Lesson 12: -té Pattern
  V_te_liberte: ["liberté", "la", ["liberty"], "noun"],
  V_te_qualite: ["qualité", "la", ["quality"], "noun"],
  V_te_quantite: ["quantité", "la", ["quantity"], "noun"],
  V_te_societe: ["société", "la", ["society"], "noun"],
  V_te_cite: ["cité", "la", ["city"], "noun"],
  V_te_beaute: ["beauté", "la", ["beauty"], "noun"],
  V_te_realite: ["réalité", "la", ["reality"], "noun"],
  V_te_identite: ["identité", "l'", ["identity"], "noun"],
  V_te_possibilite: ["possibilité", "la", ["possibility"], "noun"],

  // Lesson 13: -eux Pattern
  V_eux_dangereux: ["dangereux", null, ["dangerous"], "adjective"],
  V_eux_delicieux: ["délicieux", null, ["delicious"], "adjective"],
  V_eux_furieux: ["furieux", null, ["furious"], "adjective"],
  V_eux_curieux: ["curieux", null, ["curious"], "adjective"],
  V_eux_serieux: ["sérieux", null, ["serious"], "adjective"],
  V_eux_mysterieux: ["mystérieux", null, ["mysterious"], "adjective"],
  V_eux_precieux: ["précieux", null, ["precious"], "adjective"],
  V_eux_ambitieux: ["ambitieux", null, ["ambitious"], "adjective"],
  V_eux_nerveux: ["nerveux", null, ["nervous"], "adjective"],
  V_eux_genereux: ["généreux", null, ["generous"], "adjective"],

  // Lesson 14: Numbers
  V_num_zero: ["zéro", null, ["zero"], "number"],
  V_num_un: ["un", null, ["one"], "number"],
  V_num_deux: ["deux", null, ["two"], "number"],
  V_num_trois: ["trois", null, ["three"], "number"],
  V_num_quatre: ["quatre", null, ["four"], "number"],
  V_num_cinq: ["cinq", null, ["five"], "number"],
  V_num_six: ["six", null, ["six"], "number"],
  V_num_sept: ["sept", null, ["seven"], "number"],
  V_num_huit: ["huit", null, ["eight"], "number"],
  V_num_neuf: ["neuf", null, ["nine"], "number"],
  V_num_dix: ["dix", null, ["ten"], "number"],

  // Lesson 15: Colors
  V_color_rouge: ["rouge", null, ["red"], "adjective"],
  V_color_bleu: ["bleu", null, ["blue"], "adjective"],
  V_color_vert: ["vert", null, ["green"], "adjective"],
  V_color_jaune: ["jaune", null, ["yellow"], "adjective"],
  V_color_orange: ["orange", null, ["orange"], "adjective"],
  V_color_violet: ["violet", null, ["purple", "violet"], "adjective"],
  V_color_rose: ["rose", null, ["pink"], "adjective"],
  V_color_noir: ["noir", null, ["black"], "adjective"],
  V_color_blanc: ["blanc", null, ["white"], "adjective"],
  V_color_gris: ["gris", null, ["gray"], "adjective"],

  // Lesson 16: Days
  V_day_lundi: ["lundi", null, ["Monday"], "noun"],
  V_day_mardi: ["mardi", null, ["Tuesday"], "noun"],
  V_day_mercredi: ["mercredi", null, ["Wednesday"], "noun"],
  V_day_jeudi: ["jeudi", null, ["Thursday"], "noun"],
  V_day_vendredi: ["vendredi", null, ["Friday"], "noun"],
  V_day_samedi: ["samedi", null, ["Saturday"], "noun"],
  V_day_dimanche: ["dimanche", null, ["Sunday"], "noun"],

  // Lesson 17: Essential Verbs
  V_verb_etre: ["être", null, ["to be"], "verb"],
  V_verb_avoir: ["avoir", null, ["to have"], "verb"],
  V_verb_faire: ["faire", null, ["to do", "to make"], "verb"],
  V_verb_aller: ["aller", null, ["to go"], "verb"],
  V_verb_voir: ["voir", null, ["to see"], "verb"],
  V_verb_decider: ["décider", null, ["to decide"], "verb"],
  V_verb_preferer: ["préférer", null, ["to prefer"], "verb"],
  V_verb_changer: ["changer", null, ["to change"], "verb"],

  // Lesson 18: Food Cognates
  V_foodcog_cafe: ["café", "le", ["coffee"], "noun"],
  V_foodcog_chocolat: ["chocolat", "le", ["chocolate"], "noun"],
  V_foodcog_banane: ["banane", "la", ["banana"], "noun"],
  V_foodcog_salade: ["salade", "la", ["salad"], "noun"],
  V_foodcog_soupe: ["soupe", "la", ["soup"], "noun"],
  V_foodcog_omelette: ["omelette", "l'", ["omelette"], "noun"],
  V_foodcog_baguette: ["baguette", "la", ["baguette"], "noun"],
  V_foodcog_crepe: ["crêpe", "la", ["crepe"], "noun"],
  V_foodcog_dessert: ["dessert", "le", ["dessert"], "noun"],

  // Lesson 19: Body Parts
  V_body_tete: ["tête", "la", ["the head", "head"], "noun"],
  V_body_bras: ["bras", "le", ["the arm", "arm"], "noun"],
  V_body_main: ["main", "la", ["the hand", "hand"], "noun"],
  V_body_pied: ["pied", "le", ["the foot", "foot"], "noun"],
  V_body_jambe: ["jambe", "la", ["the leg", "leg"], "noun"],
  V_body_coeur: ["cœur", "le", ["the heart", "heart"], "noun"],
  V_body_yeux: ["yeux", "les", ["the eyes", "eyes"], "noun"],
  V_body_nez: ["nez", "le", ["the nose", "nose"], "noun"],
  V_body_bouche: ["bouche", "la", ["the mouth", "mouth"], "noun"],
  V_body_oreille: ["oreille", "l'", ["the ear", "ear"], "noun"],

  // Lesson 20: Weather
  V_weath_tempete: ["tempête", "la", ["the storm", "storm"], "noun"],
  V_weath_temperature: ["température", "la", ["the temperature", "temperature"], "noun"],
  V_weath_chaud: ["il fait chaud", null, ["it's hot"], "phrase"],
  V_weath_froid: ["il fait froid", null, ["it's cold"], "phrase"],

  // Common nouns from Lesson 9
  V_common_livre: ["livre", "le", ["the book", "book"], "noun"],
  V_common_maison: ["maison", "la", ["the house", "house"], "noun"],
  V_common_lune: ["lune", "la", ["the moon", "moon"], "noun"],
  V_common_chat: ["chat", "le", ["the cat", "cat"], "noun"],
  V_common_porte: ["porte", "la", ["the door", "door"], "noun"],
  V_common_jardin: ["jardin", "le", ["the garden", "garden"], "noun"],
  V_common_fenetre: ["fenêtre", "la", ["the window", "window"], "noun"]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCAB };
}
