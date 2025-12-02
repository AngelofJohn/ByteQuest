// ByteQuest Grammar Database
// Phase 1: Dawnmere - Core Grammar Foundations

const GRAMMAR = {
  
  // =====================================================
  // Subject Pronouns Reference
  // =====================================================
  pronouns: {
    singular: [
      { french: "je", english: "I", notes: "First person singular" },
      { french: "tu", english: "you (informal)", notes: "Second person singular, familiar" },
      { french: "il", english: "he/it", notes: "Third person singular masculine" },
      { french: "elle", english: "she/it", notes: "Third person singular feminine" },
      { french: "on", english: "one/we (informal)", notes: "Impersonal or informal 'we'" }
    ],
    plural: [
      { french: "nous", english: "we", notes: "First person plural" },
      { french: "vous", english: "you (formal/plural)", notes: "Second person plural or formal singular" },
      { french: "ils", english: "they (masc/mixed)", notes: "Third person plural masculine or mixed" },
      { french: "elles", english: "they (fem)", notes: "Third person plural feminine only" }
    ]
  },

  // =====================================================
  // Verb Conjugations
  // =====================================================
  verbs: {
    etre: {
      infinitive: "être",
      english: "to be",
      type: "irregular",
      hint: "The most important French verb - memorize it!",
      present: {
        je: "suis",
        tu: "es",
        il: "est",
        elle: "est",
        on: "est",
        nous: "sommes",
        vous: "êtes",
        ils: "sont",
        elles: "sont"
      }
    },
    avoir: {
      infinitive: "avoir",
      english: "to have",
      type: "irregular",
      hint: "Used for age, hunger, and many expressions",
      present: {
        je: "ai",
        tu: "as",
        il: "a",
        elle: "a",
        on: "a",
        nous: "avons",
        vous: "avez",
        ils: "ont",
        elles: "ont"
      }
    },
    aller: {
      infinitive: "aller",
      english: "to go",
      type: "irregular",
      hint: "Used for movement and future tense",
      present: {
        je: "vais",
        tu: "vas",
        il: "va",
        elle: "va",
        on: "va",
        nous: "allons",
        vous: "allez",
        ils: "vont",
        elles: "vont"
      }
    },
    faire: {
      infinitive: "faire",
      english: "to do/make",
      type: "irregular",
      hint: "Used for weather, activities, and making things",
      present: {
        je: "fais",
        tu: "fais",
        il: "fait",
        elle: "fait",
        on: "fait",
        nous: "faisons",
        vous: "faites",
        ils: "font",
        elles: "font"
      }
    },
    parler: {
      infinitive: "parler",
      english: "to speak",
      type: "regular-er",
      hint: "Regular -er verb pattern: remove -er, add endings",
      present: {
        je: "parle",
        tu: "parles",
        il: "parle",
        elle: "parle",
        on: "parle",
        nous: "parlons",
        vous: "parlez",
        ils: "parlent",
        elles: "parlent"
      }
    },
    manger: {
      infinitive: "manger",
      english: "to eat",
      type: "regular-er",
      hint: "Like parler, but 'nous' keeps the 'e' for pronunciation",
      present: {
        je: "mange",
        tu: "manges",
        il: "mange",
        elle: "mange",
        on: "mange",
        nous: "mangeons",
        vous: "mangez",
        ils: "mangent",
        elles: "mangent"
      }
    },
    habiter: {
      infinitive: "habiter",
      english: "to live (reside)",
      type: "regular-er",
      hint: "Regular -er verb for where you live",
      present: {
        je: "habite",
        tu: "habites",
        il: "habite",
        elle: "habite",
        on: "habite",
        nous: "habitons",
        vous: "habitez",
        ils: "habitent",
        elles: "habitent"
      }
    },
    finir: {
      infinitive: "finir",
      english: "to finish",
      type: "regular-ir",
      hint: "Regular -ir verb pattern: remove -ir, add -is, -is, -it, -issons, -issez, -issent",
      present: {
        je: "finis",
        tu: "finis",
        il: "finit",
        elle: "finit",
        on: "finit",
        nous: "finissons",
        vous: "finissez",
        ils: "finissent",
        elles: "finissent"
      }
    },
    choisir: {
      infinitive: "choisir",
      english: "to choose",
      type: "regular-ir",
      hint: "Regular -ir verb like finir",
      present: {
        je: "choisis",
        tu: "choisis",
        il: "choisit",
        elle: "choisit",
        on: "choisit",
        nous: "choisissons",
        vous: "choisissez",
        ils: "choisissent",
        elles: "choisissent"
      }
    },
    vendre: {
      infinitive: "vendre",
      english: "to sell",
      type: "regular-re",
      hint: "Regular -re verb pattern: remove -re, add -s, -s, -, -ons, -ez, -ent",
      present: {
        je: "vends",
        tu: "vends",
        il: "vend",
        elle: "vend",
        on: "vend",
        nous: "vendons",
        vous: "vendez",
        ils: "vendent",
        elles: "vendent"
      }
    }
  },

  // =====================================================
  // Gendered Nouns (for gender match questions)
  // =====================================================
  nouns: {
    masculine: [
      { french: "pain", english: "bread", hint: "Most words ending in consonants are masculine" },
      { french: "livre", english: "book", hint: "Words ending in -vre are usually masculine" },
      { french: "soleil", english: "sun", hint: "Le soleil brille" },
      { french: "chat", english: "cat", hint: "Male cat" },
      { french: "chien", english: "dog", hint: "Male dog" },
      { french: "garçon", english: "boy", hint: "Obviously masculine" },
      { french: "homme", english: "man", hint: "Obviously masculine" },
      { french: "père", english: "father", hint: "Obviously masculine" },
      { french: "frère", english: "brother", hint: "Obviously masculine" },
      { french: "village", english: "village", hint: "Words ending in -age are usually masculine" },
      { french: "fromage", english: "cheese", hint: "Words ending in -age are usually masculine" },
      { french: "voyage", english: "trip/journey", hint: "Words ending in -age are usually masculine" },
      { french: "marché", english: "market", hint: "Words ending in -é are usually masculine" },
      { french: "été", english: "summer", hint: "Words ending in -é are usually masculine" },
      { french: "problème", english: "problem", hint: "Words ending in -ème are masculine" },
      { french: "système", english: "system", hint: "Words ending in -ème are masculine" }
    ],
    feminine: [
      { french: "maison", english: "house", hint: "Words ending in -son are usually feminine" },
      { french: "famille", english: "family", hint: "Words ending in -ille are usually feminine" },
      { french: "table", english: "table", hint: "Words ending in -ble are often feminine" },
      { french: "chaise", english: "chair", hint: "Words ending in -aise are feminine" },
      { french: "fille", english: "girl/daughter", hint: "Obviously feminine" },
      { french: "femme", english: "woman/wife", hint: "Obviously feminine" },
      { french: "mère", english: "mother", hint: "Obviously feminine" },
      { french: "sœur", english: "sister", hint: "Obviously feminine" },
      { french: "lune", english: "moon", hint: "La lune brille" },
      { french: "fleur", english: "flower", hint: "Words ending in -eur (from Latin -or) are often feminine" },
      { french: "ville", english: "city", hint: "Words ending in -ille are usually feminine" },
      { french: "liberté", english: "freedom", hint: "Words ending in -té are usually feminine" },
      { french: "université", english: "university", hint: "Words ending in -té are usually feminine" },
      { french: "nation", english: "nation", hint: "Words ending in -tion are feminine" },
      { french: "situation", english: "situation", hint: "Words ending in -tion are feminine" },
      { french: "boulangerie", english: "bakery", hint: "Words ending in -erie are feminine" }
    ]
  },

  // =====================================================
  // Articles Reference
  // =====================================================
  articles: {
    definite: {
      masculine_singular: "le",
      feminine_singular: "la",
      before_vowel: "l'",
      plural: "les"
    },
    indefinite: {
      masculine_singular: "un",
      feminine_singular: "une",
      plural: "des"
    },
    partitive: {
      masculine_singular: "du",
      feminine_singular: "de la",
      before_vowel: "de l'",
      plural: "des"
    }
  },

  // =====================================================
  // Fill-in-the-Blank Sentences
  // Organized by grammar topic and difficulty
  // =====================================================
  fillInBlank: {
    etre_present: {
      topic: "être - Present Tense",
      spellbookRef: "etre",
      questions: [
        {
          sentence: "Je ___ français.",
          answer: "suis",
          options: ["suis", "es", "est", "sommes"],
          translation: "I am French.",
          hint: "First person singular of être"
        },
        {
          sentence: "Tu ___ mon ami.",
          answer: "es",
          options: ["suis", "es", "est", "êtes"],
          translation: "You are my friend.",
          hint: "Second person singular of être"
        },
        {
          sentence: "Elle ___ très belle.",
          answer: "est",
          options: ["suis", "es", "est", "sont"],
          translation: "She is very beautiful.",
          hint: "Third person singular of être"
        },
        {
          sentence: "Nous ___ contents.",
          answer: "sommes",
          options: ["sommes", "êtes", "sont", "suis"],
          translation: "We are happy.",
          hint: "First person plural of être"
        },
        {
          sentence: "Vous ___ le professeur?",
          answer: "êtes",
          options: ["sommes", "êtes", "sont", "es"],
          translation: "Are you the teacher?",
          hint: "Second person plural/formal of être"
        },
        {
          sentence: "Ils ___ à la maison.",
          answer: "sont",
          options: ["sommes", "êtes", "sont", "est"],
          translation: "They are at home.",
          hint: "Third person plural of être"
        },
        {
          sentence: "Marie ___ ma sœur.",
          answer: "est",
          options: ["suis", "es", "est", "sont"],
          translation: "Marie is my sister.",
          hint: "Marie = she (third person singular)"
        },
        {
          sentence: "Les enfants ___ fatigués.",
          answer: "sont",
          options: ["est", "sommes", "êtes", "sont"],
          translation: "The children are tired.",
          hint: "Les enfants = they (third person plural)"
        }
      ]
    },
    avoir_present: {
      topic: "avoir - Present Tense",
      spellbookRef: "avoir",
      questions: [
        {
          sentence: "J'___ faim.",
          answer: "ai",
          options: ["ai", "as", "a", "avons"],
          translation: "I am hungry. (I have hunger)",
          hint: "First person singular of avoir"
        },
        {
          sentence: "Tu ___ quel âge?",
          answer: "as",
          options: ["ai", "as", "a", "avez"],
          translation: "How old are you? (You have what age?)",
          hint: "Second person singular of avoir"
        },
        {
          sentence: "Il ___ un chien.",
          answer: "a",
          options: ["ai", "as", "a", "ont"],
          translation: "He has a dog.",
          hint: "Third person singular of avoir"
        },
        {
          sentence: "Nous ___ une grande maison.",
          answer: "avons",
          options: ["avons", "avez", "ont", "ai"],
          translation: "We have a big house.",
          hint: "First person plural of avoir"
        },
        {
          sentence: "Vous ___ raison.",
          answer: "avez",
          options: ["avons", "avez", "ont", "as"],
          translation: "You are right. (You have reason)",
          hint: "Second person plural/formal of avoir"
        },
        {
          sentence: "Elles ___ trois enfants.",
          answer: "ont",
          options: ["avons", "avez", "ont", "a"],
          translation: "They have three children.",
          hint: "Third person plural of avoir"
        },
        {
          sentence: "Mon frère ___ dix ans.",
          answer: "a",
          options: ["ai", "as", "a", "ont"],
          translation: "My brother is ten years old.",
          hint: "Mon frère = he (third person singular)"
        },
        {
          sentence: "Les filles ___ soif.",
          answer: "ont",
          options: ["a", "avons", "avez", "ont"],
          translation: "The girls are thirsty.",
          hint: "Les filles = they (third person plural)"
        }
      ]
    },
    aller_present: {
      topic: "aller - Present Tense",
      spellbookRef: "aller",
      questions: [
        {
          sentence: "Je ___ au marché.",
          answer: "vais",
          options: ["vais", "vas", "va", "allons"],
          translation: "I am going to the market.",
          hint: "First person singular of aller"
        },
        {
          sentence: "Tu ___ où?",
          answer: "vas",
          options: ["vais", "vas", "va", "allez"],
          translation: "Where are you going?",
          hint: "Second person singular of aller"
        },
        {
          sentence: "Elle ___ à l'école.",
          answer: "va",
          options: ["vais", "vas", "va", "vont"],
          translation: "She is going to school.",
          hint: "Third person singular of aller"
        },
        {
          sentence: "Nous ___ en France.",
          answer: "allons",
          options: ["allons", "allez", "vont", "vais"],
          translation: "We are going to France.",
          hint: "First person plural of aller"
        },
        {
          sentence: "Vous ___ bien?",
          answer: "allez",
          options: ["allons", "allez", "vont", "vas"],
          translation: "Are you doing well?",
          hint: "Second person plural/formal of aller"
        },
        {
          sentence: "Ils ___ au cinéma.",
          answer: "vont",
          options: ["allons", "allez", "vont", "va"],
          translation: "They are going to the cinema.",
          hint: "Third person plural of aller"
        }
      ]
    },
    regular_er: {
      topic: "Regular -er Verbs",
      spellbookRef: "parler",
      questions: [
        {
          sentence: "Je ___ français. (parler)",
          answer: "parle",
          options: ["parle", "parles", "parlons", "parlent"],
          translation: "I speak French.",
          hint: "Remove -er, add -e for je"
        },
        {
          sentence: "Tu ___ anglais? (parler)",
          answer: "parles",
          options: ["parle", "parles", "parlez", "parlent"],
          translation: "Do you speak English?",
          hint: "Remove -er, add -es for tu"
        },
        {
          sentence: "Elle ___ à Paris. (habiter)",
          answer: "habite",
          options: ["habite", "habites", "habitons", "habitent"],
          translation: "She lives in Paris.",
          hint: "Remove -er, add -e for elle"
        },
        {
          sentence: "Nous ___ ensemble. (manger)",
          answer: "mangeons",
          options: ["mangons", "mangeons", "mangez", "mangent"],
          translation: "We eat together.",
          hint: "Keep the 'e' before -ons for pronunciation"
        },
        {
          sentence: "Vous ___ bien. (chanter)",
          answer: "chantez",
          options: ["chantons", "chantez", "chantent", "chantes"],
          translation: "You sing well.",
          hint: "Remove -er, add -ez for vous"
        },
        {
          sentence: "Ils ___ la télévision. (regarder)",
          answer: "regardent",
          options: ["regarde", "regardons", "regardez", "regardent"],
          translation: "They watch television.",
          hint: "Remove -er, add -ent for ils"
        }
      ]
    },
    articles_definite: {
      topic: "Definite Articles (the)",
      spellbookRef: "articles",
      questions: [
        {
          sentence: "___ garçon est grand.",
          answer: "Le",
          options: ["Le", "La", "Les", "L'"],
          translation: "The boy is tall.",
          hint: "Garçon is masculine singular"
        },
        {
          sentence: "___ fille est petite.",
          answer: "La",
          options: ["Le", "La", "Les", "L'"],
          translation: "The girl is small.",
          hint: "Fille is feminine singular"
        },
        {
          sentence: "___ enfants jouent.",
          answer: "Les",
          options: ["Le", "La", "Les", "L'"],
          translation: "The children are playing.",
          hint: "Enfants is plural"
        },
        {
          sentence: "___ école est fermée.",
          answer: "L'",
          options: ["Le", "La", "Les", "L'"],
          translation: "The school is closed.",
          hint: "Before a vowel, use l'"
        },
        {
          sentence: "___ maison est belle.",
          answer: "La",
          options: ["Le", "La", "Les", "L'"],
          translation: "The house is beautiful.",
          hint: "Maison is feminine"
        },
        {
          sentence: "___ soleil brille.",
          answer: "Le",
          options: ["Le", "La", "Les", "L'"],
          translation: "The sun is shining.",
          hint: "Soleil is masculine"
        }
      ]
    },
    articles_indefinite: {
      topic: "Indefinite Articles (a/an/some)",
      spellbookRef: "articles",
      questions: [
        {
          sentence: "C'est ___ livre.",
          answer: "un",
          options: ["un", "une", "des", "le"],
          translation: "It's a book.",
          hint: "Livre is masculine singular"
        },
        {
          sentence: "J'ai ___ idée.",
          answer: "une",
          options: ["un", "une", "des", "la"],
          translation: "I have an idea.",
          hint: "Idée is feminine singular"
        },
        {
          sentence: "Il y a ___ pommes.",
          answer: "des",
          options: ["un", "une", "des", "les"],
          translation: "There are (some) apples.",
          hint: "Pommes is plural"
        },
        {
          sentence: "Elle a ___ chat.",
          answer: "un",
          options: ["un", "une", "des", "le"],
          translation: "She has a cat.",
          hint: "Chat is masculine singular"
        },
        {
          sentence: "C'est ___ bonne question.",
          answer: "une",
          options: ["un", "une", "des", "la"],
          translation: "It's a good question.",
          hint: "Question is feminine singular"
        },
        {
          sentence: "Je vois ___ oiseaux.",
          answer: "des",
          options: ["un", "une", "des", "les"],
          translation: "I see (some) birds.",
          hint: "Oiseaux is plural"
        }
      ]
    }
  },

  // =====================================================
  // Conjugation Questions
  // Show verb + pronoun, pick correct form
  // =====================================================
  conjugation: {
    etre: {
      verb: "être",
      english: "to be",
      questions: [
        { pronoun: "je", answer: "suis", options: ["suis", "es", "est", "sommes"] },
        { pronoun: "tu", answer: "es", options: ["suis", "es", "est", "êtes"] },
        { pronoun: "il", answer: "est", options: ["suis", "es", "est", "sont"] },
        { pronoun: "elle", answer: "est", options: ["suis", "es", "est", "sont"] },
        { pronoun: "on", answer: "est", options: ["suis", "es", "est", "sommes"] },
        { pronoun: "nous", answer: "sommes", options: ["sommes", "êtes", "sont", "suis"] },
        { pronoun: "vous", answer: "êtes", options: ["sommes", "êtes", "sont", "es"] },
        { pronoun: "ils", answer: "sont", options: ["sommes", "êtes", "sont", "est"] },
        { pronoun: "elles", answer: "sont", options: ["sommes", "êtes", "sont", "est"] }
      ]
    },
    avoir: {
      verb: "avoir",
      english: "to have",
      questions: [
        { pronoun: "je", answer: "ai", options: ["ai", "as", "a", "avons"] },
        { pronoun: "tu", answer: "as", options: ["ai", "as", "a", "avez"] },
        { pronoun: "il", answer: "a", options: ["ai", "as", "a", "ont"] },
        { pronoun: "elle", answer: "a", options: ["ai", "as", "a", "ont"] },
        { pronoun: "on", answer: "a", options: ["ai", "as", "a", "avons"] },
        { pronoun: "nous", answer: "avons", options: ["avons", "avez", "ont", "ai"] },
        { pronoun: "vous", answer: "avez", options: ["avons", "avez", "ont", "as"] },
        { pronoun: "ils", answer: "ont", options: ["avons", "avez", "ont", "a"] },
        { pronoun: "elles", answer: "ont", options: ["avons", "avez", "ont", "a"] }
      ]
    },
    aller: {
      verb: "aller",
      english: "to go",
      questions: [
        { pronoun: "je", answer: "vais", options: ["vais", "vas", "va", "allons"] },
        { pronoun: "tu", answer: "vas", options: ["vais", "vas", "va", "allez"] },
        { pronoun: "il", answer: "va", options: ["vais", "vas", "va", "vont"] },
        { pronoun: "elle", answer: "va", options: ["vais", "vas", "va", "vont"] },
        { pronoun: "on", answer: "va", options: ["vais", "vas", "va", "allons"] },
        { pronoun: "nous", answer: "allons", options: ["allons", "allez", "vont", "vais"] },
        { pronoun: "vous", answer: "allez", options: ["allons", "allez", "vont", "vas"] },
        { pronoun: "ils", answer: "vont", options: ["allons", "allez", "vont", "va"] },
        { pronoun: "elles", answer: "vont", options: ["allons", "allez", "vont", "va"] }
      ]
    },
    faire: {
      verb: "faire",
      english: "to do/make",
      questions: [
        { pronoun: "je", answer: "fais", options: ["fais", "fait", "faisons", "font"] },
        { pronoun: "tu", answer: "fais", options: ["fais", "fait", "faites", "font"] },
        { pronoun: "il", answer: "fait", options: ["fais", "fait", "faisons", "font"] },
        { pronoun: "elle", answer: "fait", options: ["fais", "fait", "faisons", "font"] },
        { pronoun: "on", answer: "fait", options: ["fais", "fait", "faisons", "font"] },
        { pronoun: "nous", answer: "faisons", options: ["faisons", "faites", "font", "fais"] },
        { pronoun: "vous", answer: "faites", options: ["faisons", "faites", "font", "fais"] },
        { pronoun: "ils", answer: "font", options: ["faisons", "faites", "font", "fait"] },
        { pronoun: "elles", answer: "font", options: ["faisons", "faites", "font", "fait"] }
      ]
    },
    parler: {
      verb: "parler",
      english: "to speak",
      questions: [
        { pronoun: "je", answer: "parle", options: ["parle", "parles", "parlons", "parlent"] },
        { pronoun: "tu", answer: "parles", options: ["parle", "parles", "parlez", "parlent"] },
        { pronoun: "il", answer: "parle", options: ["parle", "parles", "parlons", "parlent"] },
        { pronoun: "elle", answer: "parle", options: ["parle", "parles", "parlons", "parlent"] },
        { pronoun: "on", answer: "parle", options: ["parle", "parles", "parlons", "parlent"] },
        { pronoun: "nous", answer: "parlons", options: ["parlons", "parlez", "parlent", "parle"] },
        { pronoun: "vous", answer: "parlez", options: ["parlons", "parlez", "parlent", "parles"] },
        { pronoun: "ils", answer: "parlent", options: ["parlons", "parlez", "parlent", "parle"] },
        { pronoun: "elles", answer: "parlent", options: ["parlons", "parlez", "parlent", "parle"] }
      ]
    },
    finir: {
      verb: "finir",
      english: "to finish",
      questions: [
        { pronoun: "je", answer: "finis", options: ["finis", "finit", "finissons", "finissent"] },
        { pronoun: "tu", answer: "finis", options: ["finis", "finit", "finissez", "finissent"] },
        { pronoun: "il", answer: "finit", options: ["finis", "finit", "finissons", "finissent"] },
        { pronoun: "elle", answer: "finit", options: ["finis", "finit", "finissons", "finissent"] },
        { pronoun: "on", answer: "finit", options: ["finis", "finit", "finissons", "finissent"] },
        { pronoun: "nous", answer: "finissons", options: ["finissons", "finissez", "finissent", "finis"] },
        { pronoun: "vous", answer: "finissez", options: ["finissons", "finissez", "finissent", "finis"] },
        { pronoun: "ils", answer: "finissent", options: ["finissons", "finissez", "finissent", "finit"] },
        { pronoun: "elles", answer: "finissent", options: ["finissons", "finissez", "finissent", "finit"] }
      ]
    }
  },

  // =====================================================
  // Gender Match Questions
  // Pick the correct article for the noun
  // =====================================================
  genderMatch: {
    definite: {
      topic: "Definite Articles (le/la/les/l')",
      questions: [
        { noun: "maison", answer: "la", options: ["le", "la", "les", "l'"], english: "house", hint: "Feminine - ends in -son" },
        { noun: "livre", answer: "le", options: ["le", "la", "les", "l'"], english: "book", hint: "Masculine" },
        { noun: "école", answer: "l'", options: ["le", "la", "les", "l'"], english: "school", hint: "Starts with vowel" },
        { noun: "enfants", answer: "les", options: ["le", "la", "les", "l'"], english: "children", hint: "Plural" },
        { noun: "famille", answer: "la", options: ["le", "la", "les", "l'"], english: "family", hint: "Feminine - ends in -ille" },
        { noun: "père", answer: "le", options: ["le", "la", "les", "l'"], english: "father", hint: "Masculine - male person" },
        { noun: "mère", answer: "la", options: ["le", "la", "les", "l'"], english: "mother", hint: "Feminine - female person" },
        { noun: "chien", answer: "le", options: ["le", "la", "les", "l'"], english: "dog", hint: "Masculine" },
        { noun: "chat", answer: "le", options: ["le", "la", "les", "l'"], english: "cat", hint: "Masculine" },
        { noun: "fleur", answer: "la", options: ["le", "la", "les", "l'"], english: "flower", hint: "Feminine" },
        { noun: "arbre", answer: "l'", options: ["le", "la", "les", "l'"], english: "tree", hint: "Starts with vowel (masculine)" },
        { noun: "eau", answer: "l'", options: ["le", "la", "les", "l'"], english: "water", hint: "Starts with vowel (feminine)" },
        { noun: "soleil", answer: "le", options: ["le", "la", "les", "l'"], english: "sun", hint: "Masculine" },
        { noun: "lune", answer: "la", options: ["le", "la", "les", "l'"], english: "moon", hint: "Feminine" },
        { noun: "ville", answer: "la", options: ["le", "la", "les", "l'"], english: "city", hint: "Feminine - ends in -ille" },
        { noun: "village", answer: "le", options: ["le", "la", "les", "l'"], english: "village", hint: "Masculine - ends in -age" },
        { noun: "pays", answer: "le", options: ["le", "la", "les", "l'"], english: "country", hint: "Masculine" },
        { noun: "amis", answer: "les", options: ["le", "la", "les", "l'"], english: "friends", hint: "Plural" },
        { noun: "université", answer: "l'", options: ["le", "la", "les", "l'"], english: "university", hint: "Starts with vowel (feminine)" },
        { noun: "hôpital", answer: "l'", options: ["le", "la", "les", "l'"], english: "hospital", hint: "H is silent, starts with vowel sound (masculine)" }
      ]
    },
    indefinite: {
      topic: "Indefinite Articles (un/une/des)",
      questions: [
        { noun: "livre", answer: "un", options: ["un", "une", "des"], english: "book", hint: "Masculine singular" },
        { noun: "table", answer: "une", options: ["un", "une", "des"], english: "table", hint: "Feminine singular" },
        { noun: "pommes", answer: "des", options: ["un", "une", "des"], english: "apples", hint: "Plural" },
        { noun: "garçon", answer: "un", options: ["un", "une", "des"], english: "boy", hint: "Masculine singular" },
        { noun: "fille", answer: "une", options: ["un", "une", "des"], english: "girl", hint: "Feminine singular" },
        { noun: "idée", answer: "une", options: ["un", "une", "des"], english: "idea", hint: "Feminine singular" },
        { noun: "problème", answer: "un", options: ["un", "une", "des"], english: "problem", hint: "Masculine (despite -e ending)" },
        { noun: "questions", answer: "des", options: ["un", "une", "des"], english: "questions", hint: "Plural" },
        { noun: "homme", answer: "un", options: ["un", "une", "des"], english: "man", hint: "Masculine singular" },
        { noun: "femme", answer: "une", options: ["un", "une", "des"], english: "woman", hint: "Feminine singular" },
        { noun: "chaise", answer: "une", options: ["un", "une", "des"], english: "chair", hint: "Feminine singular" },
        { noun: "bureau", answer: "un", options: ["un", "une", "des"], english: "desk/office", hint: "Masculine singular" }
      ]
    }
  }
};

// =====================================================
// Grammar Question Generators
// =====================================================

const GrammarQuestionTypes = {
  FILL_IN_BLANK: 'fill_in_blank',
  CONJUGATION: 'conjugation',
  GENDER_MATCH: 'gender_match'
};

/**
 * Generate fill-in-the-blank questions
 * @param {string} topic - Topic key from GRAMMAR.fillInBlank
 * @param {number} count - Number of questions to generate
 * @returns {Array} Array of question objects
 */
function generateFillInBlankQuestions(topic, count = 8) {
  const topicData = GRAMMAR.fillInBlank[topic];
  if (!topicData) {
    console.error('Grammar topic not found:', topic);
    return [];
  }
  
  const questions = [];
  const shuffled = [...topicData.questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const q = shuffled[i];
    questions.push({
      type: GrammarQuestionTypes.FILL_IN_BLANK,
      prompt: 'Complete the sentence:',
      word: q.sentence,
      correctAnswer: q.answer,
      options: [...q.options].sort(() => Math.random() - 0.5),
      hint: q.hint,
      translation: q.translation,
      spellbookRef: topicData.spellbookRef
    });
  }
  
  return questions;
}

/**
 * Generate conjugation questions
 * @param {string} verb - Verb key from GRAMMAR.conjugation
 * @param {number} count - Number of questions to generate
 * @returns {Array} Array of question objects
 */
function generateConjugationQuestions(verb, count = 8) {
  const verbData = GRAMMAR.conjugation[verb];
  if (!verbData) {
    console.error('Verb not found:', verb);
    return [];
  }
  
  const questions = [];
  const shuffled = [...verbData.questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const q = shuffled[i];
    questions.push({
      type: GrammarQuestionTypes.CONJUGATION,
      prompt: `Conjugate "${verbData.verb}" (${verbData.english}):`,
      word: q.pronoun,
      correctAnswer: q.answer,
      options: [...q.options].sort(() => Math.random() - 0.5),
      hint: `${q.pronoun} + ${verbData.verb}`,
      verb: verbData.verb,
      spellbookRef: verb
    });
  }
  
  return questions;
}

/**
 * Generate gender match questions
 * @param {string} articleType - 'definite' or 'indefinite'
 * @param {number} count - Number of questions to generate
 * @returns {Array} Array of question objects
 */
function generateGenderMatchQuestions(articleType = 'definite', count = 8) {
  const typeData = GRAMMAR.genderMatch[articleType];
  if (!typeData) {
    console.error('Article type not found:', articleType);
    return [];
  }
  
  const questions = [];
  const shuffled = [...typeData.questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const q = shuffled[i];
    questions.push({
      type: GrammarQuestionTypes.GENDER_MATCH,
      prompt: 'Choose the correct article:',
      word: `___ ${q.noun}`,
      correctAnswer: q.answer,
      options: [...q.options].sort(() => Math.random() - 0.5),
      hint: q.hint,
      english: q.english,
      noun: q.noun,
      spellbookRef: 'articles'
    });
  }
  
  return questions;
}

/**
 * Generate mixed grammar questions for a quest
 * @param {Array} topics - Array of topic configs [{type, topic, count}]
 * @returns {Array} Array of question objects
 */
function generateGrammarQuestions(topics) {
  let allQuestions = [];
  
  topics.forEach(config => {
    let questions = [];
    
    switch (config.type) {
      case 'fill_in_blank':
        questions = generateFillInBlankQuestions(config.topic, config.count || 4);
        break;
      case 'conjugation':
        questions = generateConjugationQuestions(config.topic, config.count || 4);
        break;
      case 'gender_match':
        questions = generateGenderMatchQuestions(config.topic, config.count || 4);
        break;
    }
    
    allQuestions = allQuestions.concat(questions);
  });
  
  // Shuffle all questions together
  return allQuestions.sort(() => Math.random() - 0.5);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    GRAMMAR, 
    GrammarQuestionTypes,
    generateFillInBlankQuestions,
    generateConjugationQuestions,
    generateGenderMatchQuestions,
    generateGrammarQuestions
  };
}
