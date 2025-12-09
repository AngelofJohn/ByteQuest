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
  SENTENCE_REORDER: 'sentence_reorder' // Arrange scrambled words into correct order
};

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
  ]
};

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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCABULARY, QuestionTypes, REORDER_SENTENCES, generateQuestions, generateReorderQuestion };
}
