// ByteQuest Vocabulary Database
// Phase 1: Dawnmere - Family & Farming Vocabulary

const VOCABULARY = {
  // Quest 1: Meeting the Family - Family vocabulary
  family: {
    beginner: [
      { french: "la famille", english: "the family", audio: null, hint: "Similar to English 'family'" },
      { french: "la mère", english: "the mother", audio: null, hint: "Think 'maternal'" },
      { french: "le père", english: "the father", audio: null, hint: "Think 'paternal'" },
      { french: "la sœur", english: "the sister", audio: null, hint: "Sounds like 'sir' with an 'uh'" },
      { french: "le frère", english: "the brother", audio: null, hint: "Rhymes with 'fair'" },
      { french: "la fille", english: "the daughter", audio: null, hint: "Don't pronounce the LL" },
      { french: "le fils", english: "the son", audio: null, hint: "The 's' is silent" },
      { french: "la grand-mère", english: "the grandmother", audio: null, hint: "Grand + mother" },
      { french: "le grand-père", english: "the grandfather", audio: null, hint: "Grand + father" },
      { french: "l'oncle", english: "the uncle", audio: null, hint: "Similar to English" },
      { french: "la tante", english: "the aunt", audio: null, hint: "Rhymes with 'font'" },
      { french: "le cousin", english: "the cousin (male)", audio: null, hint: "Same as English" },
      { french: "la cousine", english: "the cousin (female)", audio: null, hint: "Feminine form" }
    ],
    intermediate: [
      { french: "les parents", english: "the parents", audio: null, hint: "Also means 'relatives'" },
      { french: "les enfants", english: "the children", audio: null, hint: "Think 'infant'" },
      { french: "le mari", english: "the husband", audio: null, hint: "Related to 'marry'" },
      { french: "la femme", english: "the wife/woman", audio: null, hint: "Context determines meaning" },
      { french: "le neveu", english: "the nephew", audio: null, hint: "Think 'nephew'" },
      { french: "la nièce", english: "the niece", audio: null, hint: "Think 'niece'" },
      { french: "le beau-père", english: "the father-in-law", audio: null, hint: "Beautiful father" },
      { french: "la belle-mère", english: "the mother-in-law", audio: null, hint: "Beautiful mother" }
    ],
    phrases: [
      { french: "Je vous présente ma famille", english: "I introduce you to my family", audio: null },
      { french: "Voici mon frère", english: "Here is my brother", audio: null },
      { french: "C'est ma sœur", english: "This is my sister", audio: null },
      { french: "Comment s'appelle-t-il?", english: "What is his name?", audio: null },
      { french: "Elle s'appelle...", english: "Her name is...", audio: null }
    ]
  },

  // Quest 2: Slime Farming - Farm & Nature vocabulary
  farming: {
    beginner: [
      { french: "la ferme", english: "the farm", audio: null, hint: "Think 'firm' ground" },
      { french: "le fermier", english: "the farmer (male)", audio: null, hint: "One who works the farm" },
      { french: "la fermière", english: "the farmer (female)", audio: null, hint: "Feminine form" },
      { french: "le champ", english: "the field", audio: null, hint: "Think 'champion' of fields" },
      { french: "la grange", english: "the barn", audio: null, hint: "Think 'granary'" },
      { french: "le blé", english: "the wheat", audio: null, hint: "Makes bread" },
      { french: "la récolte", english: "the harvest", audio: null, hint: "Think 'collect'" },
      { french: "la vache", english: "the cow", audio: null, hint: "Says 'moo'" },
      { french: "le cochon", english: "the pig", audio: null, hint: "Pink animal" },
      { french: "la poule", english: "the hen", audio: null, hint: "Think 'poultry'" },
      { french: "le cheval", english: "the horse", audio: null, hint: "Think 'cavalry'" },
      { french: "le mouton", english: "the sheep", audio: null, hint: "Think 'mutton'" }
    ],
    intermediate: [
      { french: "semer", english: "to sow/plant", audio: null, hint: "Put seeds in ground" },
      { french: "récolter", english: "to harvest", audio: null, hint: "Gather the crops" },
      { french: "arroser", english: "to water", audio: null, hint: "Give water to plants" },
      { french: "le tracteur", english: "the tractor", audio: null, hint: "Same as English" },
      { french: "la charrue", english: "the plow", audio: null, hint: "Breaks up soil" },
      { french: "le foin", english: "the hay", audio: null, hint: "Dried grass" },
      { french: "l'étable", english: "the stable", audio: null, hint: "Where horses live" },
      { french: "le verger", english: "the orchard", audio: null, hint: "Fruit trees" }
    ],
    creatures: [
      { french: "le slime", english: "the slime", audio: null, hint: "A gooey creature" },
      { french: "le monstre", english: "the monster", audio: null, hint: "Same as English" },
      { french: "la créature", english: "the creature", audio: null, hint: "Same as English" },
      { french: "dangereux", english: "dangerous", audio: null, hint: "Think 'danger'" },
      { french: "attaquer", english: "to attack", audio: null, hint: "Same as English" },
      { french: "défendre", english: "to defend", audio: null, hint: "Same as English" }
    ],
    phrases: [
      { french: "Les slimes attaquent!", english: "The slimes are attacking!", audio: null },
      { french: "Protégez les cultures!", english: "Protect the crops!", audio: null },
      { french: "La ferme est en danger", english: "The farm is in danger", audio: null },
      { french: "Je travaille dans les champs", english: "I work in the fields", audio: null },
      { french: "La récolte est bonne", english: "The harvest is good", audio: null }
    ]
  },

  // Basic greetings and introductions for early game
  basics: {
    greetings: [
      { french: "Bonjour", english: "Hello/Good day", audio: null, hint: "Good + day" },
      { french: "Bonsoir", english: "Good evening", audio: null, hint: "Good + evening" },
      { french: "Salut", english: "Hi (informal)", audio: null, hint: "Casual greeting" },
      { french: "Au revoir", english: "Goodbye", audio: null, hint: "Until seeing again" },
      { french: "À bientôt", english: "See you soon", audio: null, hint: "Until soon" },
      { french: "Merci", english: "Thank you", audio: null, hint: "Thanks!" },
      { french: "S'il vous plaît", english: "Please (formal)", audio: null, hint: "If it pleases you" },
      { french: "De rien", english: "You're welcome", audio: null, hint: "It's nothing" }
    ],
    introductions: [
      { french: "Je m'appelle...", english: "My name is...", audio: null, hint: "I call myself..." },
      { french: "Comment vous appelez-vous?", english: "What is your name? (formal)", audio: null },
      { french: "Enchanté(e)", english: "Nice to meet you", audio: null, hint: "Enchanted" },
      { french: "Je suis...", english: "I am...", audio: null, hint: "Basic identity" },
      { french: "D'où venez-vous?", english: "Where are you from?", audio: null },
      { french: "Je viens de...", english: "I come from...", audio: null }
    ]
  },

  // Food vocabulary for baker's dozen and other food-related quests
  food: {
    beginner: [
      { french: "le pain", english: "the bread", audio: null, hint: "Staple food" },
      { french: "le gâteau", english: "the cake", audio: null, hint: "Sweet dessert" },
      { french: "la farine", english: "the flour", audio: null, hint: "Made from wheat" },
      { french: "le beurre", english: "the butter", audio: null, hint: "Dairy product" },
      { french: "le sucre", english: "the sugar", audio: null, hint: "Sweet crystals" },
      { french: "le sel", english: "the salt", audio: null, hint: "Salty seasoning" },
      { french: "l'œuf", english: "the egg", audio: null, hint: "From chickens" },
      { french: "le lait", english: "the milk", audio: null, hint: "White dairy drink" },
      { french: "l'eau", english: "the water", audio: null, hint: "Essential liquid" },
      { french: "le fromage", english: "the cheese", audio: null, hint: "France is famous for this" },
      { french: "la pomme", english: "the apple", audio: null, hint: "Red or green fruit" },
      { french: "le croissant", english: "the croissant", audio: null, hint: "Crescent-shaped pastry" }
    ],
    intermediate: [
      { french: "la boulangerie", english: "the bakery", audio: null, hint: "Where bread is made" },
      { french: "le boulanger", english: "the baker (male)", audio: null, hint: "One who bakes" },
      { french: "la boulangère", english: "the baker (female)", audio: null, hint: "Female baker" },
      { french: "le four", english: "the oven", audio: null, hint: "For baking" },
      { french: "pétrir", english: "to knead", audio: null, hint: "Work the dough" },
      { french: "cuire", english: "to bake/cook", audio: null, hint: "Apply heat to food" },
      { french: "la pâte", english: "the dough", audio: null, hint: "Before it's baked" },
      { french: "la levure", english: "the yeast", audio: null, hint: "Makes bread rise" }
    ],
    phrases: [
      { french: "Je voudrais du pain", english: "I would like some bread", audio: null },
      { french: "C'est délicieux!", english: "It's delicious!", audio: null },
      { french: "Combien ça coûte?", english: "How much does it cost?", audio: null },
      { french: "Une baguette, s'il vous plaît", english: "A baguette, please", audio: null },
      { french: "C'est frais", english: "It's fresh", audio: null }
    ]
  },

  // Agriculture vocabulary for Haari Fields (Level 5-10)
  agriculture: {
    crops: [
      { french: "le blé", english: "the wheat", audio: null, hint: "Golden grain" },
      { french: "le maïs", english: "the corn", audio: null, hint: "Yellow kernels" },
      { french: "l'orge", english: "the barley", audio: null, hint: "For beer and bread" },
      { french: "l'avoine", english: "the oats", audio: null, hint: "Horse food, porridge" },
      { french: "le seigle", english: "the rye", audio: null, hint: "Dark bread grain" },
      { french: "le riz", english: "the rice", audio: null, hint: "Asian staple" },
      { french: "la pomme de terre", english: "the potato", audio: null, hint: "Apple of the earth" },
      { french: "la carotte", english: "the carrot", audio: null, hint: "Orange root" },
      { french: "l'oignon", english: "the onion", audio: null, hint: "Makes you cry" },
      { french: "la tomate", english: "the tomato", audio: null, hint: "Red fruit-vegetable" },
      { french: "le haricot", english: "the bean", audio: null, hint: "Grows in pods" },
      { french: "le pois", english: "the pea", audio: null, hint: "Small green sphere" }
    ],
    herbs: [
      { french: "le basilic", english: "the basil", audio: null, hint: "Italian herb" },
      { french: "le persil", english: "the parsley", audio: null, hint: "Green garnish" },
      { french: "la menthe", english: "the mint", audio: null, hint: "Fresh, cool taste" },
      { french: "le thym", english: "the thyme", audio: null, hint: "Mediterranean herb" },
      { french: "le romarin", english: "the rosemary", audio: null, hint: "Pine-like smell" },
      { french: "la sauge", english: "the sage", audio: null, hint: "Wise herb" },
      { french: "la lavande", english: "the lavender", audio: null, hint: "Purple, fragrant" },
      { french: "l'ail", english: "the garlic", audio: null, hint: "Strong, pungent" },
      { french: "la ciboulette", english: "the chives", audio: null, hint: "Mild onion taste" },
      { french: "l'aneth", english: "the dill", audio: null, hint: "Feathery herb" }
    ],
    tools: [
      { french: "la faux", english: "the scythe", audio: null, hint: "For cutting grain" },
      { french: "la houe", english: "the hoe", audio: null, hint: "For digging" },
      { french: "le râteau", english: "the rake", audio: null, hint: "For gathering" },
      { french: "la pelle", english: "the shovel", audio: null, hint: "For moving earth" },
      { french: "l'arrosoir", english: "the watering can", audio: null, hint: "For watering" },
      { french: "le seau", english: "the bucket", audio: null, hint: "For carrying water" },
      { french: "la brouette", english: "the wheelbarrow", audio: null, hint: "One wheel cart" },
      { french: "les gants", english: "the gloves", audio: null, hint: "Hand protection" }
    ],
    actions: [
      { french: "planter", english: "to plant", audio: null, hint: "Put in ground" },
      { french: "cultiver", english: "to cultivate", audio: null, hint: "Care for crops" },
      { french: "arroser", english: "to water", audio: null, hint: "Give water" },
      { french: "récolter", english: "to harvest", audio: null, hint: "Gather crops" },
      { french: "semer", english: "to sow", audio: null, hint: "Scatter seeds" },
      { french: "tailler", english: "to prune", audio: null, hint: "Cut back plants" },
      { french: "désherber", english: "to weed", audio: null, hint: "Remove weeds" },
      { french: "labourer", english: "to plow", audio: null, hint: "Turn the soil" }
    ],
    phrases: [
      { french: "La récolte est bonne", english: "The harvest is good", audio: null },
      { french: "Il faut arroser les plantes", english: "We must water the plants", audio: null },
      { french: "Les champs sont dorés", english: "The fields are golden", audio: null },
      { french: "Cette herbe sent bon", english: "This herb smells good", audio: null },
      { french: "Plantez au printemps", english: "Plant in spring", audio: null }
    ]
  },

  // Nature vocabulary for Haari Fields (Level 5-10)
  nature: {
    weather: [
      { french: "le soleil", english: "the sun", audio: null, hint: "Bright star" },
      { french: "la pluie", english: "the rain", audio: null, hint: "Water from sky" },
      { french: "le vent", english: "the wind", audio: null, hint: "Moving air" },
      { french: "le nuage", english: "the cloud", audio: null, hint: "White and fluffy" },
      { french: "l'orage", english: "the storm", audio: null, hint: "Thunder and lightning" },
      { french: "la neige", english: "the snow", audio: null, hint: "White and cold" },
      { french: "le brouillard", english: "the fog", audio: null, hint: "Hard to see through" },
      { french: "l'arc-en-ciel", english: "the rainbow", audio: null, hint: "Colors in the sky" }
    ],
    landscape: [
      { french: "la colline", english: "the hill", audio: null, hint: "Small mountain" },
      { french: "la vallée", english: "the valley", audio: null, hint: "Between hills" },
      { french: "la rivière", english: "the river", audio: null, hint: "Flowing water" },
      { french: "le lac", english: "the lake", audio: null, hint: "Still water" },
      { french: "la forêt", english: "the forest", audio: null, hint: "Many trees" },
      { french: "le chemin", english: "the path", audio: null, hint: "Trail to walk" },
      { french: "le pré", english: "the meadow", audio: null, hint: "Grassy field" },
      { french: "la prairie", english: "the prairie", audio: null, hint: "Wide grassland" }
    ],
    wildlife: [
      { french: "l'oiseau", english: "the bird", audio: null, hint: "Has wings, flies" },
      { french: "le lapin", english: "the rabbit", audio: null, hint: "Long ears, hops" },
      { french: "le renard", english: "the fox", audio: null, hint: "Clever, red fur" },
      { french: "le cerf", english: "the deer", audio: null, hint: "Has antlers" },
      { french: "le sanglier", english: "the wild boar", audio: null, hint: "Wild pig" },
      { french: "le loup", english: "the wolf", audio: null, hint: "Howls at moon" },
      { french: "l'abeille", english: "the bee", audio: null, hint: "Makes honey" },
      { french: "le papillon", english: "the butterfly", audio: null, hint: "Colorful wings" }
    ],
    plants: [
      { french: "l'arbre", english: "the tree", audio: null, hint: "Tall, has leaves" },
      { french: "la fleur", english: "the flower", audio: null, hint: "Colorful bloom" },
      { french: "l'herbe", english: "the grass", audio: null, hint: "Green ground cover" },
      { french: "la feuille", english: "the leaf", audio: null, hint: "On branches" },
      { french: "la racine", english: "the root", audio: null, hint: "Underground part" },
      { french: "la graine", english: "the seed", audio: null, hint: "Grows into plant" },
      { french: "le champignon", english: "the mushroom", audio: null, hint: "Grows in shade" },
      { french: "la mousse", english: "the moss", audio: null, hint: "Soft, green carpet" }
    ],
    phrases: [
      { french: "Il fait beau aujourd'hui", english: "The weather is nice today", audio: null },
      { french: "Le soleil brille", english: "The sun is shining", audio: null },
      { french: "Il va pleuvoir", english: "It's going to rain", audio: null },
      { french: "Les oiseaux chantent", english: "The birds are singing", audio: null },
      { french: "La nature est belle", english: "Nature is beautiful", audio: null }
    ]
  },

  // Travel vocabulary for journey quests
  travel: {
    directions: [
      { french: "le nord", english: "the north", audio: null, hint: "Up on maps" },
      { french: "le sud", english: "the south", audio: null, hint: "Down on maps" },
      { french: "l'est", english: "the east", audio: null, hint: "Where sun rises" },
      { french: "l'ouest", english: "the west", audio: null, hint: "Where sun sets" },
      { french: "à gauche", english: "to the left", audio: null, hint: "Opposite of right" },
      { french: "à droite", english: "to the right", audio: null, hint: "Opposite of left" },
      { french: "tout droit", english: "straight ahead", audio: null, hint: "Keep going forward" },
      { french: "près de", english: "near", audio: null, hint: "Close to" },
      { french: "loin de", english: "far from", audio: null, hint: "Not close" },
      { french: "derrière", english: "behind", audio: null, hint: "At the back" }
    ],
    journey: [
      { french: "le voyage", english: "the journey", audio: null, hint: "Trip, travel" },
      { french: "la route", english: "the road", audio: null, hint: "Path for travel" },
      { french: "le chemin", english: "the path", audio: null, hint: "Trail to follow" },
      { french: "la carte", english: "the map", audio: null, hint: "Shows the way" },
      { french: "le voyageur", english: "the traveler", audio: null, hint: "One who travels" },
      { french: "le bagage", english: "the luggage", audio: null, hint: "Things you carry" },
      { french: "la destination", english: "the destination", audio: null, hint: "Where you're going" },
      { french: "l'arrivée", english: "the arrival", audio: null, hint: "Getting there" },
      { french: "le départ", english: "the departure", audio: null, hint: "Leaving" },
      { french: "la frontière", english: "the border", audio: null, hint: "Edge of territory" }
    ],
    actions: [
      { french: "partir", english: "to leave", audio: null, hint: "Start journey" },
      { french: "arriver", english: "to arrive", audio: null, hint: "Reach destination" },
      { french: "marcher", english: "to walk", audio: null, hint: "On foot" },
      { french: "courir", english: "to run", audio: null, hint: "Fast on foot" },
      { french: "suivre", english: "to follow", audio: null, hint: "Go behind" },
      { french: "traverser", english: "to cross", audio: null, hint: "Go through" },
      { french: "continuer", english: "to continue", audio: null, hint: "Keep going" },
      { french: "s'arrêter", english: "to stop", audio: null, hint: "Cease moving" }
    ],
    phrases: [
      { french: "Où allons-nous?", english: "Where are we going?", audio: null },
      { french: "Par où est-ce?", english: "Which way is it?", audio: null },
      { french: "Nous sommes arrivés", english: "We have arrived", audio: null },
      { french: "La route est longue", english: "The road is long", audio: null },
      { french: "Suivez-moi", english: "Follow me", audio: null }
    ]
  },

  // Commerce vocabulary for merchant quests
  commerce: {
    buying: [
      { french: "acheter", english: "to buy", audio: null, hint: "Get with money" },
      { french: "le prix", english: "the price", audio: null, hint: "How much it costs" },
      { french: "l'argent", english: "the money", audio: null, hint: "Currency" },
      { french: "la pièce", english: "the coin", audio: null, hint: "Metal money" },
      { french: "cher", english: "expensive", audio: null, hint: "Costs a lot" },
      { french: "bon marché", english: "cheap", audio: null, hint: "Low price" },
      { french: "le client", english: "the customer", audio: null, hint: "One who buys" },
      { french: "la monnaie", english: "the change", audio: null, hint: "Money returned" }
    ],
    selling: [
      { french: "vendre", english: "to sell", audio: null, hint: "Give for money" },
      { french: "le marchand", english: "the merchant", audio: null, hint: "One who sells" },
      { french: "la boutique", english: "the shop", audio: null, hint: "Small store" },
      { french: "le marché", english: "the market", audio: null, hint: "Place to trade" },
      { french: "les marchandises", english: "the goods", audio: null, hint: "Things to sell" },
      { french: "la vente", english: "the sale", audio: null, hint: "Selling event" },
      { french: "l'offre", english: "the offer", audio: null, hint: "Proposed deal" },
      { french: "la qualité", english: "the quality", audio: null, hint: "How good it is" }
    ],
    phrases: [
      { french: "Combien ça coûte?", english: "How much does it cost?", audio: null },
      { french: "C'est trop cher", english: "It's too expensive", audio: null },
      { french: "Je voudrais acheter", english: "I would like to buy", audio: null },
      { french: "Voici votre monnaie", english: "Here is your change", audio: null },
      { french: "Bonne affaire!", english: "Good deal!", audio: null }
    ]
  },

  // Time vocabulary
  time: {
    basic: [
      { french: "le jour", english: "the day", audio: null, hint: "24 hours" },
      { french: "la nuit", english: "the night", audio: null, hint: "Dark time" },
      { french: "le matin", english: "the morning", audio: null, hint: "Early day" },
      { french: "l'après-midi", english: "the afternoon", audio: null, hint: "After noon" },
      { french: "le soir", english: "the evening", audio: null, hint: "Late day" },
      { french: "aujourd'hui", english: "today", audio: null, hint: "This day" },
      { french: "demain", english: "tomorrow", audio: null, hint: "Next day" },
      { french: "hier", english: "yesterday", audio: null, hint: "Previous day" },
      { french: "la semaine", english: "the week", audio: null, hint: "7 days" },
      { french: "le mois", english: "the month", audio: null, hint: "About 30 days" }
    ]
  }
};

// Question generator utilities
const QuestionTypes = {
  TRANSLATE_TO_ENGLISH: 'translate_to_english',
  TRANSLATE_TO_FRENCH: 'translate_to_french',
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  LISTENING: 'listening', // For future audio implementation
  SENTENCE_REORDER: 'sentence_reorder', // Arrange scrambled words into correct order
  SYLLABLE_REORDER: 'syllable_reorder' // Arrange scrambled syllables into correct word
};

// =====================================================
// SYLLABLE REORDER DATA
// Words with their syllable breakdowns for reordering practice
// =====================================================

const SYLLABLE_WORDS = {
  // Tier 1: 2-3 syllables, common words
  beginner: [
    { french: "bonjour", english: "hello", syllables: ["bon", "jour"] },
    { french: "merci", english: "thank you", syllables: ["mer", "ci"] },
    { french: "maison", english: "house", syllables: ["mai", "son"] },
    { french: "jardin", english: "garden", syllables: ["jar", "din"] },
    { french: "village", english: "village", syllables: ["vil", "lage"] },
    { french: "rivière", english: "river", syllables: ["ri", "vière"] },
    { french: "montagne", english: "mountain", syllables: ["mon", "tagne"] },
    { french: "château", english: "castle", syllables: ["châ", "teau"] },
    { french: "forêt", english: "forest", syllables: ["fo", "rêt"] },
    { french: "marché", english: "market", syllables: ["mar", "ché"] },
    { french: "famille", english: "family", syllables: ["fa", "mille"] },
    { french: "voyage", english: "journey", syllables: ["voy", "age"] },
    { french: "chanson", english: "song", syllables: ["chan", "son"] },
    { french: "parler", english: "to speak", syllables: ["par", "ler"] },
    { french: "manger", english: "to eat", syllables: ["man", "ger"] },
    { french: "danser", english: "to dance", syllables: ["dan", "ser"] }
  ],

  // Tier 2: 3 syllables, moderate difficulty
  intermediate: [
    { french: "chocolat", english: "chocolate", syllables: ["cho", "co", "lat"] },
    { french: "restaurant", english: "restaurant", syllables: ["res", "tau", "rant"] },
    { french: "éléphant", english: "elephant", syllables: ["é", "lé", "phant"] },
    { french: "important", english: "important", syllables: ["im", "por", "tant"] },
    { french: "différent", english: "different", syllables: ["dif", "fé", "rent"] },
    { french: "aventure", english: "adventure", syllables: ["a", "ven", "ture"] },
    { french: "commander", english: "to order", syllables: ["com", "man", "der"] },
    { french: "découvrir", english: "to discover", syllables: ["dé", "cou", "vrir"] },
    { french: "comprendre", english: "to understand", syllables: ["com", "pren", "dre"] },
    { french: "appartement", english: "apartment", syllables: ["a", "par", "te", "ment"] },
    { french: "magnifique", english: "magnificent", syllables: ["ma", "gni", "fique"] },
    { french: "bibliothèque", english: "library", syllables: ["bi", "blio", "thèque"] },
    { french: "pharmacie", english: "pharmacy", syllables: ["phar", "ma", "cie"] },
    { french: "boulangerie", english: "bakery", syllables: ["bou", "lan", "ge", "rie"] },
    { french: "vocabulaire", english: "vocabulary", syllables: ["vo", "ca", "bu", "laire"] },
    { french: "grammaire", english: "grammar", syllables: ["gram", "maire"] }
  ],

  // Tier 3: 4+ syllables, advanced words
  advanced: [
    { french: "université", english: "university", syllables: ["u", "ni", "ver", "si", "té"] },
    { french: "information", english: "information", syllables: ["in", "for", "ma", "tion"] },
    { french: "communication", english: "communication", syllables: ["com", "mu", "ni", "ca", "tion"] },
    { french: "extraordinaire", english: "extraordinary", syllables: ["ex", "tra", "or", "di", "naire"] },
    { french: "internationale", english: "international", syllables: ["in", "ter", "na", "tio", "nale"] },
    { french: "malheureusement", english: "unfortunately", syllables: ["mal", "heu", "reu", "se", "ment"] },
    { french: "environnement", english: "environment", syllables: ["en", "vi", "ron", "ne", "ment"] },
    { french: "développement", english: "development", syllables: ["dé", "ve", "lop", "pe", "ment"] },
    { french: "gouvernement", english: "government", syllables: ["gou", "ver", "ne", "ment"] },
    { french: "responsabilité", english: "responsibility", syllables: ["res", "pon", "sa", "bi", "li", "té"] }
  ],

  // Themed: Travel/Journey words (for escort quest integration)
  travel: [
    { french: "direction", english: "direction", syllables: ["di", "rec", "tion"] },
    { french: "voyageur", english: "traveler", syllables: ["voy", "a", "geur"] },
    { french: "destination", english: "destination", syllables: ["des", "ti", "na", "tion"] },
    { french: "chemin", english: "path", syllables: ["che", "min"] },
    { french: "carrefour", english: "crossroads", syllables: ["car", "re", "four"] },
    { french: "passage", english: "passage", syllables: ["pas", "sage"] },
    { french: "auberge", english: "inn", syllables: ["au", "berge"] },
    { french: "frontière", english: "border", syllables: ["fron", "tière"] }
  ],

  // Themed: Magic/RPG words
  magic: [
    { french: "magicien", english: "magician", syllables: ["ma", "gi", "cien"] },
    { french: "sorcière", english: "witch", syllables: ["sor", "cière"] },
    { french: "enchantement", english: "enchantment", syllables: ["en", "chan", "te", "ment"] },
    { french: "mystérieux", english: "mysterious", syllables: ["mys", "té", "rieux"] },
    { french: "sortilège", english: "spell", syllables: ["sor", "ti", "lège"] },
    { french: "potion", english: "potion", syllables: ["po", "tion"] },
    { french: "grimoire", english: "spellbook", syllables: ["gri", "moire"] },
    { french: "alchimie", english: "alchemy", syllables: ["al", "chi", "mie"] }
  ],

  // =====================================================
  // LESSON-SPECIFIC SYLLABLE SETS
  // Match the cognate patterns being taught in each lesson
  // =====================================================

  // Lesson 1: Identical cognates (simple 2-3 syllable words)
  lesson_1: [
    { french: "animal", english: "animal", syllables: ["a", "ni", "mal"] },
    { french: "orange", english: "orange", syllables: ["o", "range"] },
    { french: "restaurant", english: "restaurant", syllables: ["res", "tau", "rant"] },
    { french: "piano", english: "piano", syllables: ["pi", "a", "no"] },
    { french: "radio", english: "radio", syllables: ["ra", "di", "o"] },
    { french: "hotel", english: "hotel", syllables: ["hô", "tel"] }
  ],

  // Lesson 2: -tion pattern words
  lesson_2: [
    { french: "nation", english: "nation", syllables: ["na", "tion"] },
    { french: "attention", english: "attention", syllables: ["at", "ten", "tion"] },
    { french: "question", english: "question", syllables: ["ques", "tion"] },
    { french: "solution", english: "solution", syllables: ["so", "lu", "tion"] },
    { french: "situation", english: "situation", syllables: ["si", "tu", "a", "tion"] },
    { french: "information", english: "information", syllables: ["in", "for", "ma", "tion"] },
    { french: "destination", english: "destination", syllables: ["des", "ti", "na", "tion"] },
    { french: "conversation", english: "conversation", syllables: ["con", "ver", "sa", "tion"] }
  ],

  // Lesson 3: -ment pattern words
  lesson_3: [
    { french: "moment", english: "moment", syllables: ["mo", "ment"] },
    { french: "document", english: "document", syllables: ["do", "cu", "ment"] },
    { french: "monument", english: "monument", syllables: ["mo", "nu", "ment"] },
    { french: "appartement", english: "apartment", syllables: ["a", "par", "te", "ment"] },
    { french: "gouvernement", english: "government", syllables: ["gou", "ver", "ne", "ment"] },
    { french: "instrument", english: "instrument", syllables: ["ins", "tru", "ment"] },
    { french: "département", english: "department", syllables: ["dé", "par", "te", "ment"] }
  ],

  // Lesson 4: -able/-ible pattern words
  lesson_4: [
    { french: "possible", english: "possible", syllables: ["pos", "si", "ble"] },
    { french: "terrible", english: "terrible", syllables: ["ter", "ri", "ble"] },
    { french: "horrible", english: "horrible", syllables: ["hor", "ri", "ble"] },
    { french: "adorable", english: "adorable", syllables: ["a", "do", "ra", "ble"] },
    { french: "capable", english: "capable", syllables: ["ca", "pa", "ble"] },
    { french: "probable", english: "probable", syllables: ["pro", "ba", "ble"] },
    { french: "invisible", english: "invisible", syllables: ["in", "vi", "si", "ble"] },
    { french: "acceptable", english: "acceptable", syllables: ["ac", "cep", "ta", "ble"] }
  ],

  // Lesson 5: Near cognates
  lesson_5: [
    { french: "famille", english: "family", syllables: ["fa", "mille"] },
    { french: "musique", english: "music", syllables: ["mu", "si", "que"] },
    { french: "différent", english: "different", syllables: ["dif", "fé", "rent"] },
    { french: "important", english: "important", syllables: ["im", "por", "tant"] },
    { french: "université", english: "university", syllables: ["u", "ni", "ver", "si", "té"] },
    { french: "président", english: "president", syllables: ["pré", "si", "dent"] },
    { french: "populaire", english: "popular", syllables: ["po", "pu", "laire"] },
    { french: "nécessaire", english: "necessary", syllables: ["né", "ces", "saire"] }
  ],

  // Lesson 6: -ique pattern words
  lesson_6: [
    { french: "magique", english: "magic", syllables: ["ma", "gi", "que"] },
    { french: "classique", english: "classic", syllables: ["clas", "si", "que"] },
    { french: "fantastique", english: "fantastic", syllables: ["fan", "tas", "ti", "que"] },
    { french: "électrique", english: "electric", syllables: ["é", "lec", "tri", "que"] },
    { french: "romantique", english: "romantic", syllables: ["ro", "man", "ti", "que"] },
    { french: "automatique", english: "automatic", syllables: ["au", "to", "ma", "ti", "que"] },
    { french: "historique", english: "historic", syllables: ["his", "to", "ri", "que"] },
    { french: "scientifique", english: "scientific", syllables: ["sci", "en", "ti", "fi", "que"] }
  ]
};

// Generate a syllable reorder question
function generateSyllableQuestion(tier = 'beginner') {
  const wordList = SYLLABLE_WORDS[tier] || SYLLABLE_WORDS.beginner;
  const wordData = wordList[Math.floor(Math.random() * wordList.length)];

  // Shuffle the syllables
  const shuffledSyllables = [...wordData.syllables].sort(() => Math.random() - 0.5);

  // Ensure shuffled order is different from correct order
  if (shuffledSyllables.join('') === wordData.syllables.join('') && wordData.syllables.length > 2) {
    // Swap first two elements if same order
    [shuffledSyllables[0], shuffledSyllables[1]] = [shuffledSyllables[1], shuffledSyllables[0]];
  }

  return {
    type: QuestionTypes.SYLLABLE_REORDER,
    prompt: 'Arrange the syllables to form the French word:',
    word: wordData.english, // Show English meaning as reference
    shuffledSyllables: shuffledSyllables,
    correctOrder: wordData.syllables,
    correctAnswer: wordData.french, // The complete French word
    hint: `Starts with "${wordData.syllables[0]}"`
  };
}

// Sentence reorder phrases - short sentences for word ordering practice
const REORDER_SENTENCES = {
  family: [
    { french: "Je suis content", english: "I am happy", words: ["Je", "suis", "content"] },
    { french: "C'est ma sœur", english: "This is my sister", words: ["C'est", "ma", "sœur"] },
    { french: "Voici mon frère", english: "Here is my brother", words: ["Voici", "mon", "frère"] },
    { french: "Elle est gentille", english: "She is nice", words: ["Elle", "est", "gentille"] },
    { french: "Il a deux fils", english: "He has two sons", words: ["Il", "a", "deux", "fils"] },
    { french: "Ma mère est belle", english: "My mother is beautiful", words: ["Ma", "mère", "est", "belle"] },
    { french: "Mon père travaille", english: "My father works", words: ["Mon", "père", "travaille"] },
    { french: "Nous sommes amis", english: "We are friends", words: ["Nous", "sommes", "amis"] }
  ],
  farming: [
    { french: "La vache mange", english: "The cow eats", words: ["La", "vache", "mange"] },
    { french: "Le fermier travaille", english: "The farmer works", words: ["Le", "fermier", "travaille"] },
    { french: "Il fait beau", english: "The weather is nice", words: ["Il", "fait", "beau"] },
    { french: "La ferme est grande", english: "The farm is big", words: ["La", "ferme", "est", "grande"] },
    { french: "Je récolte le blé", english: "I harvest the wheat", words: ["Je", "récolte", "le", "blé"] },
    { french: "Les poules sont ici", english: "The hens are here", words: ["Les", "poules", "sont", "ici"] },
    { french: "Le cheval court vite", english: "The horse runs fast", words: ["Le", "cheval", "court", "vite"] },
    { french: "Il y a un cochon", english: "There is a pig", words: ["Il", "y", "a", "un", "cochon"] }
  ],
  greetings: [
    { french: "Bonjour mon ami", english: "Hello my friend", words: ["Bonjour", "mon", "ami"] },
    { french: "Comment allez-vous", english: "How are you", words: ["Comment", "allez", "vous"] },
    { french: "Je vais bien", english: "I am well", words: ["Je", "vais", "bien"] },
    { french: "À bientôt", english: "See you soon", words: ["À", "bientôt"] },
    { french: "Bonne nuit", english: "Good night", words: ["Bonne", "nuit"] },
    { french: "Merci beaucoup", english: "Thank you very much", words: ["Merci", "beaucoup"] },
    { french: "Je suis enchanté", english: "I am pleased to meet you", words: ["Je", "suis", "enchanté"] },
    { french: "Comment tu t'appelles", english: "What is your name", words: ["Comment", "tu", "t'appelles"] }
  ],
  food: [
    { french: "J'ai faim", english: "I am hungry", words: ["J'ai", "faim"] },
    { french: "J'ai soif", english: "I am thirsty", words: ["J'ai", "soif"] },
    { french: "Le pain est bon", english: "The bread is good", words: ["Le", "pain", "est", "bon"] },
    { french: "Je mange du fromage", english: "I eat cheese", words: ["Je", "mange", "du", "fromage"] },
    { french: "L'eau est froide", english: "The water is cold", words: ["L'eau", "est", "froide"] },
    { french: "Elle boit du lait", english: "She drinks milk", words: ["Elle", "boit", "du", "lait"] },
    { french: "C'est délicieux", english: "It's delicious", words: ["C'est", "délicieux"] },
    { french: "Je voudrais du pain", english: "I would like some bread", words: ["Je", "voudrais", "du", "pain"] }
  ],
  agriculture: [
    { french: "Je plante des légumes", english: "I plant vegetables", words: ["Je", "plante", "des", "légumes"] },
    { french: "La récolte est bonne", english: "The harvest is good", words: ["La", "récolte", "est", "bonne"] },
    { french: "Il faut arroser", english: "We must water", words: ["Il", "faut", "arroser"] },
    { french: "Les champs sont dorés", english: "The fields are golden", words: ["Les", "champs", "sont", "dorés"] },
    { french: "Cette herbe sent bon", english: "This herb smells good", words: ["Cette", "herbe", "sent", "bon"] },
    { french: "Je cultive des tomates", english: "I grow tomatoes", words: ["Je", "cultive", "des", "tomates"] },
    { french: "Le blé pousse bien", english: "The wheat grows well", words: ["Le", "blé", "pousse", "bien"] },
    { french: "Nous récoltons demain", english: "We harvest tomorrow", words: ["Nous", "récoltons", "demain"] }
  ],
  nature: [
    { french: "Il fait beau", english: "The weather is nice", words: ["Il", "fait", "beau"] },
    { french: "Le soleil brille", english: "The sun shines", words: ["Le", "soleil", "brille"] },
    { french: "Il va pleuvoir", english: "It's going to rain", words: ["Il", "va", "pleuvoir"] },
    { french: "Les oiseaux chantent", english: "The birds sing", words: ["Les", "oiseaux", "chantent"] },
    { french: "La forêt est belle", english: "The forest is beautiful", words: ["La", "forêt", "est", "belle"] },
    { french: "Je vois un lapin", english: "I see a rabbit", words: ["Je", "vois", "un", "lapin"] },
    { french: "Le vent souffle fort", english: "The wind blows hard", words: ["Le", "vent", "souffle", "fort"] },
    { french: "La rivière coule", english: "The river flows", words: ["La", "rivière", "coule"] }
  ],
  travel: [
    { french: "Nous partons demain", english: "We leave tomorrow", words: ["Nous", "partons", "demain"] },
    { french: "La route est longue", english: "The road is long", words: ["La", "route", "est", "longue"] },
    { french: "Tournez à gauche", english: "Turn left", words: ["Tournez", "à", "gauche"] },
    { french: "Allez tout droit", english: "Go straight ahead", words: ["Allez", "tout", "droit"] },
    { french: "Nous sommes arrivés", english: "We have arrived", words: ["Nous", "sommes", "arrivés"] },
    { french: "Suivez le chemin", english: "Follow the path", words: ["Suivez", "le", "chemin"] },
    { french: "C'est vers le nord", english: "It's toward the north", words: ["C'est", "vers", "le", "nord"] },
    { french: "Le voyage est fini", english: "The journey is finished", words: ["Le", "voyage", "est", "fini"] }
  ],
  commerce: [
    { french: "Combien ça coûte", english: "How much does it cost", words: ["Combien", "ça", "coûte"] },
    { french: "C'est trop cher", english: "It's too expensive", words: ["C'est", "trop", "cher"] },
    { french: "Je voudrais acheter", english: "I would like to buy", words: ["Je", "voudrais", "acheter"] },
    { french: "Le prix est bon", english: "The price is good", words: ["Le", "prix", "est", "bon"] },
    { french: "Voici votre monnaie", english: "Here is your change", words: ["Voici", "votre", "monnaie"] },
    { french: "Le marchand est gentil", english: "The merchant is nice", words: ["Le", "marchand", "est", "gentil"] },
    { french: "J'achète du pain", english: "I buy some bread", words: ["J'achète", "du", "pain"] },
    { french: "Bonne affaire aujourd'hui", english: "Good deal today", words: ["Bonne", "affaire", "aujourd'hui"] }
  ]
};

// =====================================================
// FILL-IN-THE-BLANK SENTENCES
// Contextual sentences with missing words
// =====================================================

const FILL_BLANK_SENTENCES = {
  // Lesson 8: Greetings
  greetings: [
    {
      sentence: "___, comment allez-vous?",
      english: "Hello, how are you?",
      answer: "Bonjour",
      distractors: ["Merci", "Au revoir", "Non"]
    },
    {
      sentence: "Merci beaucoup! — De ___.",
      english: "Thank you very much! — You're welcome.",
      answer: "rien",
      distractors: ["bonjour", "oui", "non"]
    },
    {
      sentence: "___, je voudrais un café.",
      english: "Please, I would like a coffee.",
      answer: "S'il vous plaît",
      distractors: ["Merci", "Bonjour", "Au revoir"]
    },
    {
      sentence: "À demain! — ___ !",
      english: "See you tomorrow! — Goodbye!",
      answer: "Au revoir",
      distractors: ["Bonjour", "Merci", "Oui"]
    }
  ],

  // Lesson 9: Articles (le/la)
  articles: [
    {
      sentence: "___ chat dort sur le lit.",
      english: "The cat sleeps on the bed.",
      answer: "Le",
      distractors: ["La", "Les", "Un"]
    },
    {
      sentence: "___ maison est grande.",
      english: "The house is big.",
      answer: "La",
      distractors: ["Le", "Les", "Une"]
    },
    {
      sentence: "Je lis ___ livre.",
      english: "I read the book.",
      answer: "le",
      distractors: ["la", "les", "un"]
    },
    {
      sentence: "___ soleil brille.",
      english: "The sun shines.",
      answer: "Le",
      distractors: ["La", "Les", "Un"]
    },
    {
      sentence: "Fermez ___ porte.",
      english: "Close the door.",
      answer: "la",
      distractors: ["le", "les", "une"]
    }
  ],

  // Lesson 10: Family
  family: [
    {
      sentence: "Ma ___ s'appelle Marie.",
      english: "My mother is named Marie.",
      answer: "mère",
      distractors: ["père", "frère", "sœur"]
    },
    {
      sentence: "Mon ___ travaille à Paris.",
      english: "My father works in Paris.",
      answer: "père",
      distractors: ["mère", "sœur", "fille"]
    },
    {
      sentence: "J'ai deux ___ et une sœur.",
      english: "I have two brothers and one sister.",
      answer: "frères",
      distractors: ["sœurs", "filles", "fils"]
    },
    {
      sentence: "Voici ma ___. Elle a dix ans.",
      english: "Here is my daughter. She is ten years old.",
      answer: "fille",
      distractors: ["fils", "mère", "sœur"]
    }
  ],

  // Lesson 14: Numbers
  numbers: [
    {
      sentence: "J'ai ___ chats à la maison.",
      english: "I have three cats at home.",
      answer: "trois",
      distractors: ["deux", "quatre", "cinq"]
    },
    {
      sentence: "Il y a ___ personnes dans la salle.",
      english: "There are seven people in the room.",
      answer: "sept",
      distractors: ["six", "huit", "neuf"]
    },
    {
      sentence: "Le train part à ___ heures.",
      english: "The train leaves at five o'clock.",
      answer: "cinq",
      distractors: ["quatre", "six", "sept"]
    },
    {
      sentence: "Elle a ___ ans aujourd'hui.",
      english: "She is ten years old today.",
      answer: "dix",
      distractors: ["neuf", "huit", "sept"]
    }
  ],

  // Lesson 15: Colors
  colors: [
    {
      sentence: "Le ciel est ___.",
      english: "The sky is blue.",
      answer: "bleu",
      distractors: ["vert", "rouge", "noir"]
    },
    {
      sentence: "La pomme est ___.",
      english: "The apple is red.",
      answer: "rouge",
      distractors: ["vert", "jaune", "bleu"]
    },
    {
      sentence: "L'herbe est ___.",
      english: "The grass is green.",
      answer: "verte",
      distractors: ["bleue", "rouge", "jaune"]
    },
    {
      sentence: "La nuit, tout est ___.",
      english: "At night, everything is black.",
      answer: "noir",
      distractors: ["blanc", "gris", "bleu"]
    },
    {
      sentence: "La neige est ___.",
      english: "The snow is white.",
      answer: "blanche",
      distractors: ["noire", "grise", "bleue"]
    }
  ],

  // Lesson 16: Days
  days: [
    {
      sentence: "Aujourd'hui, c'est ___.",
      english: "Today is Monday.",
      answer: "lundi",
      distractors: ["mardi", "mercredi", "dimanche"]
    },
    {
      sentence: "Le week-end commence ___.",
      english: "The weekend starts Saturday.",
      answer: "samedi",
      distractors: ["vendredi", "dimanche", "lundi"]
    },
    {
      sentence: "___ est le premier jour de la semaine.",
      english: "Monday is the first day of the week.",
      answer: "Lundi",
      distractors: ["Mardi", "Dimanche", "Samedi"]
    }
  ],

  // Lesson 17: Verbs
  verbs: [
    {
      sentence: "Je veux ___ un livre.",
      english: "I want to see a book.",
      answer: "voir",
      distractors: ["avoir", "être", "faire"]
    },
    {
      sentence: "Nous allons ___ au restaurant.",
      english: "We are going to go to the restaurant.",
      answer: "aller",
      distractors: ["avoir", "être", "voir"]
    },
    {
      sentence: "Il faut ___ attention.",
      english: "You must pay attention. (lit: to have attention)",
      answer: "faire",
      distractors: ["avoir", "être", "voir"]
    }
  ],

  // Lesson 18: Food
  food: [
    {
      sentence: "Je voudrais un ___, s'il vous plaît.",
      english: "I would like a coffee, please.",
      answer: "café",
      distractors: ["chocolat", "salade", "dessert"]
    },
    {
      sentence: "Le ___ est délicieux.",
      english: "The chocolate is delicious.",
      answer: "chocolat",
      distractors: ["café", "salade", "soupe"]
    },
    {
      sentence: "Je mange une ___ pour le petit-déjeuner.",
      english: "I eat a banana for breakfast.",
      answer: "banane",
      distractors: ["salade", "soupe", "omelette"]
    },
    {
      sentence: "La ___ est chaude.",
      english: "The soup is hot.",
      answer: "soupe",
      distractors: ["salade", "banane", "crêpe"]
    }
  ],

  // Lesson 19: Body Parts
  body: [
    {
      sentence: "J'ai mal à la ___.",
      english: "My head hurts.",
      answer: "tête",
      distractors: ["main", "jambe", "bouche"]
    },
    {
      sentence: "Il lève la ___.",
      english: "He raises his hand.",
      answer: "main",
      distractors: ["tête", "jambe", "bras"]
    },
    {
      sentence: "Elle a de beaux ___.",
      english: "She has beautiful eyes.",
      answer: "yeux",
      distractors: ["bras", "pieds", "mains"]
    }
  ],

  // Lesson 20: Weather
  weather: [
    {
      sentence: "Le ___ brille aujourd'hui.",
      english: "The sun shines today.",
      answer: "soleil",
      distractors: ["vent", "nuage", "brouillard"]
    },
    {
      sentence: "Il y a beaucoup de ___.",
      english: "There is a lot of wind.",
      answer: "vent",
      distractors: ["soleil", "pluie", "neige"]
    },
    {
      sentence: "La ___ tombe depuis ce matin.",
      english: "The rain has been falling since this morning.",
      answer: "pluie",
      distractors: ["neige", "tempête", "vent"]
    },
    {
      sentence: "Attention! Une ___ arrive.",
      english: "Attention! A storm is coming.",
      answer: "tempête",
      distractors: ["pluie", "neige", "soleil"]
    }
  ],

  // Cognate patterns (mixed lessons 1-7, 11-13)
  cognates: [
    {
      sentence: "C'est une situation ___.",
      english: "It's a dangerous situation.",
      answer: "dangereuse",
      distractors: ["délicieuse", "curieuse", "sérieuse"]
    },
    {
      sentence: "L'___ visite le château.",
      english: "The actor visits the castle.",
      answer: "acteur",
      distractors: ["auteur", "docteur", "directeur"]
    },
    {
      sentence: "La ___ de ce produit est excellente.",
      english: "The quality of this product is excellent.",
      answer: "qualité",
      distractors: ["quantité", "liberté", "beauté"]
    },
    {
      sentence: "C'est ___!",
      english: "It's impossible!",
      answer: "impossible",
      distractors: ["possible", "terrible", "horrible"]
    },
    {
      sentence: "Le spectacle était ___.",
      english: "The show was fantastic.",
      answer: "fantastique",
      distractors: ["magique", "classique", "romantique"]
    }
  ]
};

// Generate a fill-in-the-blank question
function generateFillBlankQuestion(category) {
  const sentences = FILL_BLANK_SENTENCES[category] || FILL_BLANK_SENTENCES.greetings;
  const item = sentences[Math.floor(Math.random() * sentences.length)];

  // Combine answer with distractors and shuffle
  const allOptions = [item.answer, ...item.distractors].sort(() => Math.random() - 0.5);

  return {
    type: QuestionTypes.FILL_BLANK,
    prompt: item.sentence,
    english: item.english,
    correctAnswer: item.answer,
    options: allOptions,
    hint: `The English is: "${item.english}"`
  };
}

// Generate a sentence reorder question
function generateReorderQuestion(category) {
  const sentences = REORDER_SENTENCES[category] || REORDER_SENTENCES.greetings;
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];

  // Shuffle the words
  const shuffledWords = [...sentence.words].sort(() => Math.random() - 0.5);

  // Ensure shuffled order is different from correct order
  if (shuffledWords.join(' ') === sentence.words.join(' ') && sentence.words.length > 2) {
    // Swap first two elements if same order
    [shuffledWords[0], shuffledWords[1]] = [shuffledWords[1], shuffledWords[0]];
  }

  return {
    type: QuestionTypes.SENTENCE_REORDER,
    prompt: 'Arrange the words in the correct order:',
    word: sentence.english, // Show English meaning as reference
    shuffledWords: shuffledWords,
    correctOrder: sentence.words,
    correctAnswer: sentence.french, // The complete French sentence
    hint: `Start with "${sentence.words[0]}"`
  };
}

// Generate questions from vocabulary
function generateQuestions(category, subcategory, count = 5, difficulty = 'beginner') {
  const vocab = VOCABULARY[category]?.[subcategory] || VOCABULARY[category]?.beginner || [];
  const questions = [];
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const word = shuffled[i];
    const questionType = Math.random() > 0.5 ? 
      QuestionTypes.TRANSLATE_TO_ENGLISH : 
      QuestionTypes.TRANSLATE_TO_FRENCH;
    
    // Generate wrong answers from same category
    const wrongAnswers = vocab
      .filter(w => w.french !== word.french)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ? w.english : w.french);
    
    const correctAnswer = questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ? 
      word.english : word.french;
    
    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    questions.push({
      type: questionType,
      prompt: questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ? 
        `What does "${word.french}" mean?` :
        `How do you say "${word.english}" in French?`,
      correctAnswer: correctAnswer,
      options: allAnswers,
      hint: word.hint,
      category: category,
      difficulty: difficulty
    });
  }
  
  return questions;
}

// =====================================================
// COGNATE-FIRST LESSON STRUCTURE
// Lessons organized by difficulty, starting with cognates
// =====================================================

const LESSONS = {
  // Lesson 1: Perfect Cognates - Identical words
  // "You already know French!"
  lesson_1: {
    id: "lesson_1",
    title: "You Already Know French",
    description: "These French words are identical to English!",
    pattern: "identical",
    patternExplanation: "Many French and English words are exactly the same. You already know hundreds of French words!",
    words: [
      { french: "table", english: "table", audio: null },
      { french: "animal", english: "animal", audio: null },
      { french: "fruit", english: "fruit", audio: null },
      { french: "orange", english: "orange", audio: null },
      { french: "train", english: "train", audio: null },
      { french: "taxi", english: "taxi", audio: null },
      { french: "hotel", english: "hotel", audio: null },
      { french: "restaurant", english: "restaurant", audio: null },
      { french: "menu", english: "menu", audio: null },
      { french: "rose", english: "rose", audio: null },
      { french: "piano", english: "piano", audio: null },
      { french: "radio", english: "radio", audio: null }
    ]
  },

  // Lesson 2: -tion Pattern
  // All -tion words are the same!
  lesson_2: {
    id: "lesson_2",
    title: "The -tion Rule",
    description: "Every English '-tion' word is the same in French!",
    pattern: "-tion → -tion",
    patternExplanation: "Words ending in '-tion' are identical in French and English. This one pattern gives you thousands of words!",
    words: [
      { french: "nation", english: "nation", audio: null },
      { french: "situation", english: "situation", audio: null },
      { french: "information", english: "information", audio: null },
      { french: "attention", english: "attention", audio: null },
      { french: "question", english: "question", audio: null },
      { french: "solution", english: "solution", audio: null },
      { french: "action", english: "action", audio: null },
      { french: "condition", english: "condition", audio: null },
      { french: "position", english: "position", audio: null },
      { french: "tradition", english: "tradition", audio: null },
      { french: "conversation", english: "conversation", audio: null },
      { french: "destination", english: "destination", audio: null }
    ]
  },

  // Lesson 3: -ment Pattern
  lesson_3: {
    id: "lesson_3",
    title: "The -ment Rule",
    description: "French '-ment' often matches English '-ment' or '-ly'",
    pattern: "-ment → -ment",
    patternExplanation: "Many '-ment' words work the same way in both languages.",
    words: [
      { french: "moment", english: "moment", audio: null },
      { french: "appartement", english: "apartment", audio: null },
      { french: "gouvernement", english: "government", audio: null },
      { french: "document", english: "document", audio: null },
      { french: "monument", english: "monument", audio: null },
      { french: "instrument", english: "instrument", audio: null },
      { french: "argument", english: "argument", audio: null },
      { french: "sentiment", english: "sentiment", audio: null },
      { french: "département", english: "department", audio: null },
      { french: "compliment", english: "compliment", audio: null }
    ]
  },

  // Lesson 4: -able/-ible Pattern
  lesson_4: {
    id: "lesson_4",
    title: "The -able/-ible Rule",
    description: "These endings work the same in French!",
    pattern: "-able/-ible → -able/-ible",
    patternExplanation: "Words ending in '-able' or '-ible' are nearly identical in both languages.",
    words: [
      { french: "possible", english: "possible", audio: null },
      { french: "impossible", english: "impossible", audio: null },
      { french: "visible", english: "visible", audio: null },
      { french: "invisible", english: "invisible", audio: null },
      { french: "capable", english: "capable", audio: null },
      { french: "probable", english: "probable", audio: null },
      { french: "terrible", english: "terrible", audio: null },
      { french: "horrible", english: "horrible", audio: null },
      { french: "adorable", english: "adorable", audio: null },
      { french: "comfortable", english: "comfortable", audio: null },
      { french: "acceptable", english: "acceptable", audio: null },
      { french: "flexible", english: "flexible", audio: null }
    ]
  },

  // Lesson 5: Near Cognates - Close but not identical
  lesson_5: {
    id: "lesson_5",
    title: "Close Cousins",
    description: "These words look almost the same with small differences",
    pattern: "near-cognate",
    patternExplanation: "Some French words are very close to English with minor spelling changes. You can usually guess them!",
    words: [
      { french: "famille", english: "family", audio: null },
      { french: "musique", english: "music", audio: null },
      { french: "populaire", english: "popular", audio: null },
      { french: "différent", english: "different", audio: null },
      { french: "important", english: "important", audio: null },
      { french: "intelligent", english: "intelligent", audio: null },
      { french: "président", english: "president", audio: null },
      { french: "université", english: "university", audio: null },
      { french: "nécessaire", english: "necessary", audio: null },
      { french: "difficile", english: "difficult", audio: null },
      { french: "exemple", english: "example", audio: null },
      { french: "problème", english: "problem", audio: null }
    ]
  },

  // Lesson 6: -ique → -ic Pattern
  lesson_6: {
    id: "lesson_6",
    title: "The -ique Rule",
    description: "French '-ique' = English '-ic'",
    pattern: "-ique → -ic",
    patternExplanation: "When you see '-ique' in French, it's usually '-ic' in English.",
    words: [
      { french: "magique", english: "magic", audio: null },
      { french: "fantastique", english: "fantastic", audio: null },
      { french: "classique", english: "classic", audio: null },
      { french: "électrique", english: "electric", audio: null },
      { french: "automatique", english: "automatic", audio: null },
      { french: "romantique", english: "romantic", audio: null },
      { french: "publique", english: "public", audio: null },
      { french: "historique", english: "historic", audio: null },
      { french: "pratique", english: "practical", audio: null },
      { french: "économique", english: "economic", audio: null },
      { french: "scientifique", english: "scientific", audio: null },
      { french: "politique", english: "political", audio: null }
    ]
  },

  // Lesson 7: Sound-Alikes
  lesson_7: {
    id: "lesson_7",
    title: "Sound-Alikes",
    description: "These look different but sound similar",
    pattern: "sound-alike",
    patternExplanation: "French spelling can look strange, but say these out loud - they sound like English!",
    words: [
      { french: "téléphone", english: "telephone", audio: null },
      { french: "hôpital", english: "hospital", audio: null },
      { french: "forêt", english: "forest", audio: null },
      { french: "île", english: "isle/island", audio: null },
      { french: "château", english: "castle", audio: null },
      { french: "théâtre", english: "theater", audio: null },
      { french: "hôtel", english: "hotel", audio: null },
      { french: "âge", english: "age", audio: null },
      { french: "côte", english: "coast", audio: null },
      { french: "rôle", english: "role", audio: null }
    ]
  },

  // Lesson 8: Basic Greetings (First non-cognates, but high frequency)
  lesson_8: {
    id: "lesson_8",
    title: "Essential Greetings",
    description: "The most important words to know",
    pattern: "none",
    patternExplanation: "These aren't cognates, but they're so common you'll learn them quickly through repetition.",
    words: [
      { french: "bonjour", english: "hello/good day", audio: null, hint: "bon (good) + jour (day)" },
      { french: "bonsoir", english: "good evening", audio: null, hint: "bon (good) + soir (evening)" },
      { french: "salut", english: "hi (casual)", audio: null, hint: "Like 'salute' but casual" },
      { french: "au revoir", english: "goodbye", audio: null, hint: "Until seeing again" },
      { french: "merci", english: "thank you", audio: null, hint: "Related to 'mercy'" },
      { french: "oui", english: "yes", audio: null, hint: "Sounds like 'we'" },
      { french: "non", english: "no", audio: null, hint: "Same as English 'non-'" },
      { french: "s'il vous plaît", english: "please", audio: null, hint: "If it pleases you" },
      { french: "de rien", english: "you're welcome", audio: null, hint: "Of nothing (it's nothing)" },
      { french: "excusez-moi", english: "excuse me", audio: null, hint: "Excuse me (formal)" }
    ]
  },

  // Lesson 9: Common Nouns with Articles
  lesson_9: {
    id: "lesson_9",
    title: "Le and La",
    description: "French nouns have gender - le (masculine) and la (feminine)",
    pattern: "articles",
    patternExplanation: "Every French noun is either masculine (le) or feminine (la). Don't worry about memorizing - you'll get a feel for it!",
    words: [
      { french: "le livre", english: "the book", audio: null, hint: "Think 'library'" },
      { french: "la maison", english: "the house", audio: null, hint: "Think 'mansion'" },
      { french: "le pain", english: "the bread", audio: null, hint: "Staple food" },
      { french: "la pomme", english: "the apple", audio: null, hint: "Red or green fruit" },
      { french: "le soleil", english: "the sun", audio: null, hint: "Think 'solar'" },
      { french: "la lune", english: "the moon", audio: null, hint: "Think 'lunar'" },
      { french: "le chat", english: "the cat", audio: null, hint: "Says 'meow'" },
      { french: "la porte", english: "the door", audio: null, hint: "Think 'portal'" },
      { french: "le jardin", english: "the garden", audio: null, hint: "Where plants grow" },
      { french: "la fenêtre", english: "the window", audio: null, hint: "Glass opening in wall" }
    ]
  },

  // Lesson 10: Family (Non-cognates introduced after foundation)
  lesson_10: {
    id: "lesson_10",
    title: "Family",
    description: "Words for family members",
    pattern: "none",
    patternExplanation: "Now that you know the patterns, these family words will stick better.",
    words: [
      { french: "la mère", english: "the mother", audio: null, hint: "Think 'maternal'" },
      { french: "le père", english: "the father", audio: null, hint: "Think 'paternal'" },
      { french: "la sœur", english: "the sister", audio: null, hint: "Think 'sorority'" },
      { french: "le frère", english: "the brother", audio: null, hint: "Think 'fraternal'" },
      { french: "la fille", english: "the daughter", audio: null, hint: "Also means 'girl'" },
      { french: "le fils", english: "the son", audio: null, hint: "The 's' is silent" },
      { french: "la grand-mère", english: "the grandmother", audio: null, hint: "grand + mother" },
      { french: "le grand-père", english: "the grandfather", audio: null, hint: "grand + father" },
      { french: "les parents", english: "the parents", audio: null, hint: "Think 'parental'" },
      { french: "les enfants", english: "the children", audio: null, hint: "Think 'infant'" }
    ]
  },

  // Lesson 11: -eur → -or Pattern
  lesson_11: {
    id: "lesson_11",
    title: "The -eur Rule",
    description: "French '-eur' = English '-or'",
    pattern: "-eur → -or",
    patternExplanation: "Words ending in '-eur' in French often end in '-or' in English.",
    words: [
      { french: "acteur", english: "actor", audio: null },
      { french: "docteur", english: "doctor", audio: null },
      { french: "directeur", english: "director", audio: null },
      { french: "professeur", english: "professor", audio: null },
      { french: "auteur", english: "author", audio: null },
      { french: "empereur", english: "emperor", audio: null },
      { french: "visiteur", english: "visitor", audio: null },
      { french: "gouverneur", english: "governor", audio: null },
      { french: "conducteur", english: "conductor", audio: null },
      { french: "inventeur", english: "inventor", audio: null }
    ]
  },

  // Lesson 12: -té → -ty Pattern
  lesson_12: {
    id: "lesson_12",
    title: "The -té Rule",
    description: "French '-té' = English '-ty'",
    pattern: "-té → -ty",
    patternExplanation: "Words ending in '-té' in French end in '-ty' in English.",
    words: [
      { french: "liberté", english: "liberty", audio: null },
      { french: "qualité", english: "quality", audio: null },
      { french: "quantité", english: "quantity", audio: null },
      { french: "société", english: "society", audio: null },
      { french: "université", english: "university", audio: null },
      { french: "cité", english: "city", audio: null },
      { french: "beauté", english: "beauty", audio: null },
      { french: "réalité", english: "reality", audio: null },
      { french: "identité", english: "identity", audio: null },
      { french: "possibilité", english: "possibility", audio: null }
    ]
  },

  // Lesson 13: -eux/-euse → -ous Pattern
  lesson_13: {
    id: "lesson_13",
    title: "The -eux Rule",
    description: "French '-eux' often = English '-ous'",
    pattern: "-eux → -ous",
    patternExplanation: "Adjectives ending in '-eux' (masculine) or '-euse' (feminine) often match '-ous' in English.",
    words: [
      { french: "dangereux", english: "dangerous", audio: null },
      { french: "délicieux", english: "delicious", audio: null },
      { french: "furieux", english: "furious", audio: null },
      { french: "curieux", english: "curious", audio: null },
      { french: "sérieux", english: "serious", audio: null },
      { french: "mystérieux", english: "mysterious", audio: null },
      { french: "précieux", english: "precious", audio: null },
      { french: "ambitieux", english: "ambitious", audio: null },
      { french: "nerveux", english: "nervous", audio: null },
      { french: "généreux", english: "generous", audio: null }
    ]
  },

  // Lesson 14: Numbers 0-10
  lesson_14: {
    id: "lesson_14",
    title: "Numbers 0-10",
    description: "Count from zero to ten",
    pattern: "none",
    patternExplanation: "Numbers are essential! These are used constantly in daily life.",
    words: [
      { french: "zéro", english: "zero", audio: null, hint: "Same as English" },
      { french: "un", english: "one", audio: null, hint: "Think 'uni-' (one)" },
      { french: "deux", english: "two", audio: null, hint: "Think 'duo' or 'dual'" },
      { french: "trois", english: "three", audio: null, hint: "Think 'trio'" },
      { french: "quatre", english: "four", audio: null, hint: "Think 'quarter' (4 parts)" },
      { french: "cinq", english: "five", audio: null, hint: "Silent 'q'" },
      { french: "six", english: "six", audio: null, hint: "Same as English" },
      { french: "sept", english: "seven", audio: null, hint: "Think 'September' (was 7th month)" },
      { french: "huit", english: "eight", audio: null, hint: "Think 'octo-' became 'huit'" },
      { french: "neuf", english: "nine", audio: null, hint: "Think 'novem-' (nine)" },
      { french: "dix", english: "ten", audio: null, hint: "Think 'decimal' (base 10)" }
    ]
  },

  // Lesson 15: Colors
  lesson_15: {
    id: "lesson_15",
    title: "Colors",
    description: "The colors of the rainbow",
    pattern: "mixed",
    patternExplanation: "Some colors are cognates, others you'll need to memorize.",
    words: [
      { french: "rouge", english: "red", audio: null, hint: "Think 'rouge' makeup" },
      { french: "bleu", english: "blue", audio: null, hint: "Sounds similar to 'blue'" },
      { french: "vert", english: "green", audio: null, hint: "Think 'verdant'" },
      { french: "jaune", english: "yellow", audio: null, hint: "Sounds like 'jawn'" },
      { french: "orange", english: "orange", audio: null, hint: "Same as English!" },
      { french: "violet", english: "purple/violet", audio: null, hint: "Same as English violet" },
      { french: "rose", english: "pink", audio: null, hint: "Color of roses" },
      { french: "noir", english: "black", audio: null, hint: "Think 'film noir'" },
      { french: "blanc", english: "white", audio: null, hint: "Think 'blank' (white space)" },
      { french: "gris", english: "gray", audio: null, hint: "Think 'grizzled'" }
    ]
  },

  // Lesson 16: Days of the Week
  lesson_16: {
    id: "lesson_16",
    title: "Days of the Week",
    description: "From Monday to Sunday",
    pattern: "none",
    patternExplanation: "French days come from Roman gods and planets, just like English!",
    words: [
      { french: "lundi", english: "Monday", audio: null, hint: "Moon day (lunar)" },
      { french: "mardi", english: "Tuesday", audio: null, hint: "Mars day" },
      { french: "mercredi", english: "Wednesday", audio: null, hint: "Mercury day" },
      { french: "jeudi", english: "Thursday", audio: null, hint: "Jupiter day (Jove)" },
      { french: "vendredi", english: "Friday", audio: null, hint: "Venus day" },
      { french: "samedi", english: "Saturday", audio: null, hint: "Saturn day (Sabbath)" },
      { french: "dimanche", english: "Sunday", audio: null, hint: "Lord's day (dies dominica)" }
    ]
  },

  // Lesson 17: Common Verbs (Infinitives)
  lesson_17: {
    id: "lesson_17",
    title: "Essential Verbs",
    description: "The most common action words",
    pattern: "mixed",
    patternExplanation: "Many French verbs are cognates! Look for familiar roots.",
    words: [
      { french: "être", english: "to be", audio: null, hint: "Essential verb" },
      { french: "avoir", english: "to have", audio: null, hint: "Essential verb" },
      { french: "faire", english: "to do/make", audio: null, hint: "Think 'affair'" },
      { french: "aller", english: "to go", audio: null, hint: "Think 'alley'" },
      { french: "voir", english: "to see", audio: null, hint: "Think 'vision'" },
      { french: "arriver", english: "to arrive", audio: null, hint: "Same as English" },
      { french: "continuer", english: "to continue", audio: null, hint: "Same as English" },
      { french: "décider", english: "to decide", audio: null, hint: "Same as English" },
      { french: "préférer", english: "to prefer", audio: null, hint: "Same as English" },
      { french: "changer", english: "to change", audio: null, hint: "Same as English" }
    ]
  },

  // Lesson 18: Food (Cognates)
  lesson_18: {
    id: "lesson_18",
    title: "Food Words",
    description: "Delicious cognates from the kitchen",
    pattern: "mixed",
    patternExplanation: "French cuisine gave English many food words!",
    words: [
      { french: "café", english: "coffee", audio: null, hint: "Same word!" },
      { french: "chocolat", english: "chocolate", audio: null, hint: "Almost identical" },
      { french: "banane", english: "banana", audio: null, hint: "Almost identical" },
      { french: "salade", english: "salad", audio: null, hint: "Almost identical" },
      { french: "soupe", english: "soup", audio: null, hint: "Almost identical" },
      { french: "omelette", english: "omelette", audio: null, hint: "Same word!" },
      { french: "baguette", english: "baguette", audio: null, hint: "French bread!" },
      { french: "croissant", english: "croissant", audio: null, hint: "Crescent-shaped" },
      { french: "crêpe", english: "crepe", audio: null, hint: "Thin pancake" },
      { french: "dessert", english: "dessert", audio: null, hint: "Same word!" }
    ]
  },

  // Lesson 19: Body Parts
  lesson_19: {
    id: "lesson_19",
    title: "Body Parts",
    description: "Parts of the human body",
    pattern: "mixed",
    patternExplanation: "Many body parts have Latin roots shared with English medical terms.",
    words: [
      { french: "la tête", english: "the head", audio: null, hint: "Think 'tête-à-tête'" },
      { french: "le bras", english: "the arm", audio: null, hint: "Think 'brace'" },
      { french: "la main", english: "the hand", audio: null, hint: "Think 'manual'" },
      { french: "le pied", english: "the foot", audio: null, hint: "Think 'pedestrian'" },
      { french: "la jambe", english: "the leg", audio: null, hint: "Think 'jamb' (door leg)" },
      { french: "le cœur", english: "the heart", audio: null, hint: "Think 'courage' (heart)" },
      { french: "les yeux", english: "the eyes", audio: null, hint: "Think 'ocular'" },
      { french: "le nez", english: "the nose", audio: null, hint: "Think 'nasal'" },
      { french: "la bouche", english: "the mouth", audio: null, hint: "Where food goes" },
      { french: "l'oreille", english: "the ear", audio: null, hint: "Think 'aural'" }
    ]
  },

  // Lesson 20: Weather
  lesson_20: {
    id: "lesson_20",
    title: "Weather",
    description: "Talking about the weather",
    pattern: "mixed",
    patternExplanation: "Weather is a common conversation topic. Many terms are near-cognates.",
    words: [
      { french: "le soleil", english: "the sun", audio: null, hint: "Think 'solar'" },
      { french: "la pluie", english: "the rain", audio: null, hint: "Think 'pluvial'" },
      { french: "le vent", english: "the wind", audio: null, hint: "Think 'vent', 'ventilate'" },
      { french: "la neige", english: "the snow", audio: null, hint: "White and cold" },
      { french: "le nuage", english: "the cloud", audio: null, hint: "In the sky" },
      { french: "la tempête", english: "the storm", audio: null, hint: "Think 'tempest'" },
      { french: "le brouillard", english: "the fog", audio: null, hint: "Hard to see through" },
      { french: "la température", english: "the temperature", audio: null, hint: "Same as English" },
      { french: "il fait chaud", english: "it's hot", audio: null, hint: "'Chaud' sounds like hot" },
      { french: "il fait froid", english: "it's cold", audio: null, hint: "Think 'frigid'" }
    ]
  }
};

// Get lesson by ID
function getLesson(lessonId) {
  return LESSONS[lessonId] || null;
}

// Get all lessons in order
function getAllLessons() {
  return Object.values(LESSONS).sort((a, b) => {
    const numA = parseInt(a.id.split('_')[1]);
    const numB = parseInt(b.id.split('_')[1]);
    return numA - numB;
  });
}

// Generate questions from a lesson
function generateLessonQuestions(lessonId, count = 5) {
  const lesson = getLesson(lessonId);
  if (!lesson) return [];

  const questions = [];
  const shuffled = [...lesson.words].sort(() => Math.random() - 0.5);

  // Check if this lesson has specific syllable words
  const lessonSyllables = SYLLABLE_WORDS[lessonId];
  const hasSyllables = lessonSyllables && lessonSyllables.length > 0;

  // Reserve 1 slot for syllable question if available (20% of questions)
  const syllableCount = hasSyllables ? Math.max(1, Math.floor(count * 0.2)) : 0;
  const vocabCount = count - syllableCount;

  // Generate vocabulary translation questions
  for (let i = 0; i < Math.min(vocabCount, shuffled.length); i++) {
    const word = shuffled[i];
    const questionType = Math.random() > 0.5 ?
      QuestionTypes.TRANSLATE_TO_ENGLISH :
      QuestionTypes.TRANSLATE_TO_FRENCH;

    // Generate wrong answers from same lesson
    const wrongAnswers = lesson.words
      .filter(w => w.french !== word.french)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ? w.english : w.french);

    const correctAnswer = questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ?
      word.english : word.french;

    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    questions.push({
      type: questionType,
      prompt: questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ?
        'What does this mean?' :
        'How do you say this in French?',
      word: questionType === QuestionTypes.TRANSLATE_TO_ENGLISH ? word.french : word.english,
      correctAnswer: correctAnswer,
      options: allAnswers,
      hint: word.hint || null,
      lessonId: lessonId,
      pattern: lesson.pattern,
      isNewWord: true // Flag for first encounter
    });
  }

  // Add syllable questions if lesson has specific syllable words
  if (hasSyllables) {
    for (let i = 0; i < syllableCount; i++) {
      const syllableQ = generateSyllableQuestion(lessonId);
      syllableQ.lessonId = lessonId;
      syllableQ.pattern = lesson.pattern;
      questions.push(syllableQ);
    }
  }

  // Shuffle all questions so syllable questions are mixed in
  return questions.sort(() => Math.random() - 0.5);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VOCABULARY,
    LESSONS,
    QuestionTypes,
    REORDER_SENTENCES,
    FILL_BLANK_SENTENCES,
    SYLLABLE_WORDS,
    generateQuestions,
    generateReorderQuestion,
    generateFillBlankQuestion,
    generateSyllableQuestion,
    getLesson,
    getAllLessons,
    generateLessonQuestions
  };
}
