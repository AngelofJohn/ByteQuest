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
  }
};

// Question generator utilities
const QuestionTypes = {
  TRANSLATE_TO_ENGLISH: 'translate_to_english',
  TRANSLATE_TO_FRENCH: 'translate_to_french',
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  LISTENING: 'listening' // For future audio implementation
};

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
  module.exports = { VOCABULARY, QuestionTypes, generateQuestions };
}
