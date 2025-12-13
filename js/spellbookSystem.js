// ByteQuest - Spellbook System
// Grammar reference UI with unlockable pages

// =====================================================
// Spellbook Page Definitions
// =====================================================

const SPELLBOOK_PAGES = {
  // Verbs
  etre: {
    id: "etre",
    title: "Être",
    subtitle: "to be",
    category: "verbs",
    icon: "✨",
    unlockHint: "Learn from Sage Aldric in Dawnmere",
    description: "The almighty Être—without it, you literally cannot exist in French. Every adventurer must master this spell before they can even claim to BE anything. It's the verbal equivalent of oxygen: completely essential, yet somehow people still mess it up.",
    examples: [
      { french: "Je suis français.", english: "I am French." },
      { french: "Elle est intelligente.", english: "She is intelligent." },
      { french: "Nous sommes à Paris.", english: "We are in Paris." }
    ],
    content: {
      type: "conjugation",
      verb: "etre"
    }
  },
  avoir: {
    id: "avoir",
    title: "Avoir",
    subtitle: "to have",
    category: "verbs",
    icon: "🤲",
    unlockHint: "Continue your studies with Sage Aldric",
    description: "Ah yes, the verb of acquisition. In French, you don't 'be' hungry—you HAVE hunger, like a dragon hoarding emotions. You don't 'be' 20 years old—you HAVE 20 years, like some kind of age collector. The French are possessive people. Deal with it.",
    examples: [
      { french: "J'ai un chien.", english: "I have a dog." },
      { french: "Tu as quel âge?", english: "How old are you? (lit: You have what age?)" },
      { french: "Ils ont faim.", english: "They are hungry. (lit: They have hunger)" }
    ],
    content: {
      type: "conjugation",
      verb: "avoir"
    }
  },
  aller: {
    id: "aller",
    title: "Aller",
    subtitle: "to go",
    category: "verbs",
    icon: "🚶",
    unlockHint: "Advance your training with Sage Aldric",
    description: "The adventurer's best friend! This verb literally gets you places. Also doubles as a time machine—stick any verb after it and BAM, instant future tense. 'Je vais mourir' means both 'I'm going to die' and 'this dungeon is too hard.'",
    examples: [
      { french: "Je vais au marché.", english: "I'm going to the market." },
      { french: "Comment allez-vous?", english: "How are you? (formal)" },
      { french: "Elle va manger.", english: "She is going to eat." }
    ],
    content: {
      type: "conjugation",
      verb: "aller"
    }
  },
  faire: {
    id: "faire",
    title: "Faire",
    subtitle: "to do/make",
    category: "verbs",
    icon: "🔨",
    unlockHint: "Master more verbs with Sage Aldric",
    description: "The Swiss Army knife of French verbs. Make dinner? Faire. Do homework? Faire. Describe the weather? Believe it or not, faire. The French decided one verb should do everything, presumably so they'd have more time for cheese.",
    examples: [
      { french: "Je fais mes devoirs.", english: "I'm doing my homework." },
      { french: "Il fait beau.", english: "The weather is nice. (lit: It makes beautiful)" },
      { french: "Nous faisons du sport.", english: "We play sports." }
    ],
    content: {
      type: "conjugation",
      verb: "faire"
    }
  },
  regular_er_pattern: {
    id: "regular_er_pattern",
    title: "Regular -ER Verbs",
    subtitle: "The most common verb pattern",
    category: "verbs",
    icon: "📝",
    unlockHint: "Complete the -ER verb lesson",
    description: "Congratulations, you've found the cheat code. 80% of French verbs follow this exact pattern. Learn these endings and you can conjugate thousands of verbs. It's like finding a legendary weapon in the tutorial zone.",
    examples: [
      { french: "parler → je parle", english: "to speak → I speak" },
      { french: "manger → nous mangeons", english: "to eat → we eat" },
      { french: "habiter → ils habitent", english: "to live → they live" }
    ],
    content: {
      type: "pattern",
      pattern: "er_verbs"
    }
  },
  regular_ir_pattern: {
    id: "regular_ir_pattern",
    title: "Regular -IR Verbs",
    subtitle: "The second verb group",
    category: "verbs",
    icon: "📗",
    unlockHint: "Advance your studies in Haari Fields",
    description: "The sequel nobody asked for but everyone needs. These verbs sneak an '-iss-' into plural forms because apparently regular endings weren't dramatic enough. Think of it as the verb casting a buff spell on itself: 'finir' becomes 'finissons.' Very theatrical.",
    examples: [
      { french: "finir → je finis", english: "to finish → I finish" },
      { french: "choisir → nous choisissons", english: "to choose → we choose" },
      { french: "réussir → ils réussissent", english: "to succeed → they succeed" }
    ],
    content: {
      type: "pattern",
      pattern: "ir_verbs"
    }
  },
  regular_re_pattern: {
    id: "regular_re_pattern",
    title: "Regular -RE Verbs",
    subtitle: "The third verb group",
    category: "verbs",
    icon: "📘",
    unlockHint: "Continue learning in Lurenium",
    description: "The minimalist cousin of verb families. These verbs are so laid back that in third person singular, they don't even bother with an ending. 'Il attend'—just hanging there, incomplete, like a sentence waiting for—",
    examples: [
      { french: "vendre → je vends", english: "to sell → I sell" },
      { french: "attendre → il attend", english: "to wait → he waits (no ending!)" },
      { french: "répondre → nous répondons", english: "to answer → we answer" }
    ],
    content: {
      type: "pattern",
      pattern: "re_verbs"
    }
  },

  // Grammar
  articles: {
    id: "articles",
    title: "Articles",
    subtitle: "le, la, les, un, une, des",
    category: "grammar",
    icon: "📰",
    unlockHint: "Learn about gender with Sage Aldric",
    description: "In French, you can't just say 'book'—you must declare allegiance. Is it THE book? A book? Which gender is the book? The French won't let you speak until you've properly introduced every noun like they're entering a royal ball.",
    examples: [
      { french: "le livre / la table", english: "the book / the table" },
      { french: "un ami / une amie", english: "a friend (m) / a friend (f)" },
      { french: "l'école", english: "the school (before vowel)" }
    ],
    content: {
      type: "articles"
    }
  },
  gender: {
    id: "gender",
    title: "Noun Gender",
    subtitle: "Masculine vs Feminine",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Learn about gender with Sage Aldric",
    description: "Welcome to the most arbitrary system in any language. A table is feminine. A desk is masculine. Logic? Never heard of it. Some patterns exist, but mostly you just memorize and pray. The French didn't choose this chaos—they were born into it.",
    examples: [
      { french: "le soleil (m) / la lune (f)", english: "the sun / the moon" },
      { french: "le problème (m)", english: "the problem (masculine despite -e ending!)" },
      { french: "la liberté (f)", english: "freedom (-té endings are feminine)" }
    ],
    content: {
      type: "gender"
    }
  },
  negation: {
    id: "negation",
    title: "Negation",
    subtitle: "ne...pas and beyond",
    category: "grammar",
    icon: "🚫",
    unlockHint: "Learn to say 'no' in Haari Fields",
    description: "The art of saying 'non' wasn't enough—French demands you sandwich your verb in negativity. 'Ne' before, 'pas' after, verb trapped in the middle like a hero surrounded by enemies. Spoken French often drops the 'ne' because even the French got tired of it.",
    examples: [
      { french: "Je ne parle pas.", english: "I don't speak." },
      { french: "Il n'a jamais vu Paris.", english: "He has never seen Paris." },
      { french: "Elle ne mange rien.", english: "She eats nothing." }
    ],
    content: {
      type: "negation"
    }
  },
  adjectives: {
    id: "adjectives",
    title: "Adjectives",
    subtitle: "Agreement and placement",
    category: "grammar",
    icon: "🎨",
    unlockHint: "Discover descriptions in Lurenium",
    description: "Plot twist: adjectives go AFTER the noun. A 'red apple' becomes 'apple red.' But wait—some special adjectives (remember BANGS: Beauty, Age, Number, Goodness, Size) go before. Also they must match gender and number because French adjectives have commitment issues with just one form.",
    examples: [
      { french: "une maison blanche", english: "a white house (adj after noun)" },
      { french: "un petit garçon", english: "a small boy (BANGS: before noun)" },
      { french: "des fleurs rouges", english: "red flowers (plural agreement)" }
    ],
    content: {
      type: "adjectives"
    }
  },
  possessives: {
    id: "possessives",
    title: "Possessive Adjectives",
    subtitle: "mon, ma, mes, ton, ta...",
    category: "grammar",
    icon: "👐",
    unlockHint: "Learn ownership in Haari Fields",
    description: "Here's where French gets weird(er): possessives agree with what you own, not who you are. A man's house is 'sa maison' (feminine). A woman's book is 'son livre' (masculine). It's not about you—it's about your stuff. How very French.",
    examples: [
      { french: "mon livre / ma maison / mes amis", english: "my book / my house / my friends" },
      { french: "ton père / ta mère / tes parents", english: "your father / your mother / your parents" },
      { french: "mon amie (f)", english: "my friend (f) - mon before vowel!" }
    ],
    content: {
      type: "possessives"
    }
  },
  questions: {
    id: "questions",
    title: "Asking Questions",
    subtitle: "Intonation, est-ce que, inversion",
    category: "grammar",
    icon: "❓",
    unlockHint: "Learn to inquire in Lurenium",
    description: "Why have one way to ask questions when you can have three? Raise your voice (peasant style), add 'est-ce que' (respectable), or flip subject and verb (aristocratic). All valid, all confusing, all French. Choose your difficulty level.",
    examples: [
      { french: "Tu parles français?", english: "You speak French? (intonation)" },
      { french: "Est-ce que tu parles français?", english: "Do you speak French? (est-ce que)" },
      { french: "Parles-tu français?", english: "Do you speak French? (inversion)" }
    ],
    content: {
      type: "questions"
    }
  },
  prepositions: {
    id: "prepositions",
    title: "Prepositions",
    subtitle: "à, de, en, dans, sur...",
    category: "grammar",
    icon: "📍",
    unlockHint: "Navigate the world in Haari Fields",
    description: "Tiny words, massive confusion. 'À' means to, at, or in. 'De' means of, from, or about. Context is everything. Think of prepositions as the mini-bosses of French—individually easy, but they ambush you when you least expect it.",
    examples: [
      { french: "Je vais à Paris.", english: "I'm going to Paris." },
      { french: "Le livre est sur la table.", english: "The book is on the table." },
      { french: "Elle vient de France.", english: "She comes from France." }
    ],
    content: {
      type: "prepositions"
    }
  },
  contractions: {
    id: "contractions",
    title: "Contractions",
    subtitle: "au, aux, du, des",
    category: "grammar",
    icon: "🔗",
    unlockHint: "Master combining words in Dawnmere",
    description: "Some word combinations are forbidden. 'À le'? Illegal. 'De les'? Arrest this person. French forces certain words to merge like reluctant allies: au, aux, du, des. No exceptions. The grammar police are always watching.",
    examples: [
      { french: "Je vais au marché.", english: "I'm going to the market. (à + le)" },
      { french: "Je parle aux enfants.", english: "I'm speaking to the children. (à + les)" },
      { french: "C'est le livre du professeur.", english: "It's the teacher's book. (de + le)" }
    ],
    content: {
      type: "contractions"
    }
  },
  adverbs: {
    id: "adverbs",
    title: "Adverbs",
    subtitle: "How, when, where, how much",
    category: "grammar",
    icon: "⚡",
    unlockHint: "Describe actions in Lurenium",
    description: "Want to describe HOW you're failing at something? Adverbs! Take an adjective, make it feminine, slap '-ment' on the end, and voilà—you're failing lentement (slowly), rapidement (quickly), or complètement (completely). Very flexible, very French.",
    examples: [
      { french: "Elle parle lentement.", english: "She speaks slowly. (lent → lente → lentement)" },
      { french: "Je mange souvent ici.", english: "I often eat here." },
      { french: "Il est très intelligent.", english: "He is very intelligent." }
    ],
    content: {
      type: "adverbs"
    }
  },
  comparatives: {
    id: "comparatives",
    title: "Comparisons",
    subtitle: "plus, moins, aussi...que",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Compare things in the markets",
    description: "Finally, the ability to judge things! 'Plus grand que' (taller than), 'moins cher que' (cheaper than), 'aussi stupide que' (as stupid as). Warning: never say 'plus bon'—it's 'meilleur.' French has irregular forms because of course it does.",
    examples: [
      { french: "Elle est plus grande que moi.", english: "She is taller than me." },
      { french: "C'est le meilleur restaurant.", english: "It's the best restaurant. (not 'plus bon')" },
      { french: "Il parle aussi bien que toi.", english: "He speaks as well as you." }
    ],
    content: {
      type: "comparatives"
    }
  },
  object_pronouns: {
    id: "object_pronouns",
    title: "Object Pronouns",
    subtitle: "le, la, lui, leur, me, te...",
    category: "grammar",
    icon: "👆",
    unlockHint: "Replace nouns efficiently in advanced studies",
    description: "Tired of repeating 'the sword' seventeen times? Replace it with 'le' and sound like a native. Direct objects, indirect objects, reflexive pronouns—they ALL go BEFORE the verb. English puts them after. French says no. Get used to it, adventurer.",
    examples: [
      { french: "Je le vois.", english: "I see him/it. (direct object)" },
      { french: "Je lui parle.", english: "I speak to him/her. (indirect object)" },
      { french: "Elle me donne le livre.", english: "She gives me the book." }
    ],
    content: {
      type: "object_pronouns"
    }
  },
  numbers: {
    id: "numbers",
    title: "Numbers",
    subtitle: "0-100 and beyond",
    category: "reference",
    icon: "🔢",
    unlockHint: "Count your gold in Dawnmere",
    description: "Counting is simple until you hit 70, when French mathematicians apparently got bored. 70 = sixty-ten. 80 = four-twenties. 99 = four-twenties-ten-nine. Who hurt these people? (Belgium and Switzerland use normal numbers because they have standards.)",
    examples: [
      { french: "vingt et un (21)", english: "twenty-one" },
      { french: "soixante-dix (70)", english: "seventy (lit: sixty-ten)" },
      { french: "quatre-vingt-dix-neuf (99)", english: "ninety-nine (lit: 4×20+10+9)" }
    ],
    content: {
      type: "numbers"
    }
  },

  // Advanced Conjugation
  passe_compose: {
    id: "passe_compose",
    title: "Passé Composé",
    subtitle: "Completed past actions",
    category: "verbs",
    icon: "⏮️",
    unlockHint: "Master past tense in Lurenium",
    description: "The past tense that requires a helper verb because French actions can't face their history alone. Avoir helps most verbs; être assists the fancy 'movement and change' verbs. Oh, and with être? The ending changes based on who did it. Because why make anything simple?",
    examples: [
      { french: "J'ai mangé une pomme.", english: "I ate an apple. (avoir + mangé)" },
      { french: "Elle est allée à Paris.", english: "She went to Paris. (être + allée, feminine agreement)" },
      { french: "Nous avons fini le travail.", english: "We finished the work." }
    ],
    content: {
      type: "passe_compose"
    }
  },
  imparfait: {
    id: "imparfait",
    title: "Imparfait",
    subtitle: "Ongoing past, habits, descriptions",
    category: "verbs",
    icon: "🔄",
    unlockHint: "Learn about the past in the capital",
    description: "The nostalgic past tense. For when you were doing something, used to do something, or want to wax poetic about 'the old days.' Take the nous form, chop off -ons, add endings. Almost every verb is regular here—être being the dramatic exception, as usual.",
    examples: [
      { french: "Quand j'étais jeune...", english: "When I was young... (description)" },
      { french: "Il pleuvait tous les jours.", english: "It rained every day. (habit)" },
      { french: "Je mangeais quand tu as appelé.", english: "I was eating when you called. (ongoing)" }
    ],
    content: {
      type: "imparfait"
    }
  },
  futur_proche: {
    id: "futur_proche",
    title: "Futur Proche",
    subtitle: "Going to (near future)",
    category: "verbs",
    icon: "⏭️",
    unlockHint: "Plan ahead in Haari Fields",
    description: "The lazy adventurer's future tense. Just conjugate aller + slap on any infinitive. 'Je vais manger' = I'm going to eat. Done. No special endings, no stem changes, no tears. This is the future tense for people who value their sanity.",
    examples: [
      { french: "Je vais manger.", english: "I'm going to eat." },
      { french: "Elle va partir demain.", english: "She's going to leave tomorrow." },
      { french: "Nous allons étudier ce soir.", english: "We're going to study tonight." }
    ],
    content: {
      type: "futur_proche"
    }
  },
  reflexive_verbs: {
    id: "reflexive_verbs",
    title: "Reflexive Verbs",
    subtitle: "se laver, se lever, s'appeler...",
    category: "verbs",
    icon: "🪞",
    unlockHint: "Discover self-actions in Lurenium",
    description: "For when you do things to yourself. Getting dressed? You dress yourself. Waking up? You wake yourself. Introducing yourself? 'Je m'appelle' literally means 'I call myself.' The French are very self-aware. Probably from all that mirror-gazing.",
    examples: [
      { french: "Je me lève à sept heures.", english: "I get up at seven. (lit: I raise myself)" },
      { french: "Comment vous appelez-vous?", english: "What's your name? (lit: How do you call yourself?)" },
      { french: "Elle s'est habillée.", english: "She got dressed. (passé composé with être)" }
    ],
    content: {
      type: "reflexive_verbs"
    }
  },
  avoir_expressions: {
    id: "avoir_expressions",
    title: "Avoir Expressions",
    subtitle: "Idiomatic uses of avoir",
    category: "verbs",
    icon: "💡",
    unlockHint: "Learn expressions from village elders",
    description: "Remember when I said French uses avoir for everything? I wasn't exaggerating. You HAVE hunger, HAVE thirst, HAVE fear, HAVE reason, HAVE years. It's like French treats emotions and states as collectibles. Gotta have 'em all!",
    examples: [
      { french: "J'ai faim / soif.", english: "I'm hungry / thirsty. (I have hunger/thirst)" },
      { french: "Elle a vingt ans.", english: "She is twenty. (She has twenty years)" },
      { french: "Nous avons raison / tort.", english: "We're right / wrong. (We have right/wrong)" }
    ],
    content: {
      type: "avoir_expressions"
    }
  },
  futur_simple: {
    id: "futur_simple",
    title: "Futur Simple",
    subtitle: "Simple future tense",
    category: "verbs",
    icon: "🔮",
    unlockHint: "See the future in the capital",
    description: "The formal, prophetic future. Use this when making grand declarations, solemn promises, or predicting someone's doom. Add endings to the infinitive—unless it's irregular, then memorize special stems. Very dramatic. Very French.",
    examples: [
      { french: "Je parlerai français.", english: "I will speak French." },
      { french: "Nous serons là demain.", english: "We will be there tomorrow. (être → ser-)" },
      { french: "Tu auras le temps.", english: "You will have time. (avoir → aur-)" }
    ],
    content: {
      type: "futur_simple"
    }
  },
  conditionnel: {
    id: "conditionnel",
    title: "Conditionnel",
    subtitle: "Would, could, should",
    category: "verbs",
    icon: "🤔",
    unlockHint: "Master hypotheticals in advanced studies",
    description: "The 'what if' tense. Useful for daydreaming, being polite, and explaining why you definitely WOULD save the kingdom IF the circumstances were different. Future stems + imparfait endings = the verbal equivalent of shrugging elegantly.",
    examples: [
      { french: "Je voudrais un café.", english: "I would like a coffee. (polite)" },
      { french: "Si j'avais le temps, je voyagerais.", english: "If I had time, I would travel." },
      { french: "Tu pourrais m'aider?", english: "Could you help me?" }
    ],
    content: {
      type: "conditionnel"
    }
  },
  subjonctif: {
    id: "subjonctif",
    title: "Subjonctif",
    subtitle: "Expressing doubt, emotion, necessity",
    category: "verbs",
    icon: "💭",
    unlockHint: "Unlock in the final chapter",
    description: "The final boss of French grammar. It's not a tense—it's a MOOD. Used when things are uncertain, emotional, or demanded. Most verbs look normal, but être and avoir decided to be completely unrecognizable. 'Je doute que tu sois prêt'—and honestly? Same.",
    examples: [
      { french: "Il faut que tu parles.", english: "You must speak. (necessity)" },
      { french: "Je veux que tu sois là.", english: "I want you to be there. (desire)" },
      { french: "Je doute qu'il vienne.", english: "I doubt he'll come. (doubt)" }
    ],
    content: {
      type: "subjonctif"
    }
  },

  // Reference
  pronouns: {
    id: "pronouns",
    title: "Subject Pronouns",
    subtitle: "je, tu, il, elle, nous...",
    category: "reference",
    icon: "👥",
    unlockHint: "Available from the start",
    alwaysUnlocked: true,
    description: "The cast of characters for every French sentence. 'Tu' for friends, 'vous' for strangers and kings. 'On' secretly means 'we' in casual speech. And 'ils' covers any group with at least one male—a billion women and one man? Ils. French is fun like that.",
    examples: [
      { french: "Tu es mon ami.", english: "You are my friend. (informal)" },
      { french: "Vous êtes très gentil.", english: "You are very kind. (formal)" },
      { french: "On va au cinéma.", english: "We're going to the movies. (informal 'we')" }
    ],
    content: {
      type: "pronouns"
    }
  },

  // Lore - Historical Timeline
  lore_ancients: {
    id: "lore_ancients",
    title: "The Ancients",
    subtitle: "1000+ years ago",
    category: "lore",
    icon: "🏛️",
    unlockHint: "Discover ancient ruins in Lurenium",
    description: "Before Verandum, before the kingdoms, before even the language you're learning—there were the Ancients. They built Lurenium not as a city, but as a seal. Against what? Nobody knows. Their civilization vanished, their language forgotten, their warnings unheeded. Sleep well!",
    examples: [
      { french: "Les anciens ont construit Lurenium.", english: "The Ancients built Lurenium." },
      { french: "Leur civilisation a disparu.", english: "Their civilization disappeared." },
      { french: "Ils parlaient une autre langue.", english: "They spoke another language." }
    ],
    content: {
      type: "lore",
      era: "ancients"
    }
  },
  lore_silence: {
    id: "lore_silence",
    title: "The Silence",
    subtitle: "1000-500 years ago",
    category: "lore",
    icon: "🌑",
    unlockHint: "Find records of the dark age",
    description: "Five hundred years of nothing. The Ancients fell, their cities crumbled, their knowledge scattered like seeds in a storm. Tribes wandered. Lurenium stood empty, its purpose forgotten. This is the gap in history that scholars argue about in taverns—usually right before a bar fight.",
    examples: [
      { french: "Le silence a duré cinq siècles.", english: "The silence lasted five centuries." },
      { french: "Les ruines étaient abandonnées.", english: "The ruins were abandoned." },
      { french: "Personne ne se souvenait.", english: "Nobody remembered." }
    ],
    content: {
      type: "lore",
      era: "silence"
    }
  },
  lore_founding: {
    id: "lore_founding",
    title: "The Founding",
    subtitle: "~500 years ago",
    category: "lore",
    icon: "👑",
    unlockHint: "Learn of Verandum's origins",
    description: "Out of the chaos, order emerged. The Kingdom of Verandum united the scattered tribes under one banner, one currency, and one language—French. Lurenium was rediscovered but not understood. The new rulers built their civilization atop the bones of the old. Nothing ominous about that at all.",
    examples: [
      { french: "Le royaume de Verandum est né.", english: "The Kingdom of Verandum was born." },
      { french: "Ils ont redécouvert Lurenium.", english: "They rediscovered Lurenium." },
      { french: "Une nouvelle ère a commencé.", english: "A new era began." }
    ],
    content: {
      type: "lore",
      era: "founding"
    }
  },
  lore_faith: {
    id: "lore_faith",
    title: "The Faith",
    subtitle: "~400 years ago",
    category: "lore",
    icon: "✝️",
    unlockHint: "Study with the Order of Dawn",
    description: "The Order of Dawn rose to prominence, building temples across the land. Their original teachings emphasized humility, service, and truth. Beautiful principles that lasted approximately until someone realized religion could be useful for controlling people. The Order's texts from this era are... different from the current versions.",
    examples: [
      { french: "L'Ordre de l'Aube a été fondé.", english: "The Order of Dawn was founded." },
      { french: "Ils enseignaient la vérité.", english: "They taught the truth." },
      { french: "Les temples ont été construits.", english: "The temples were built." }
    ],
    content: {
      type: "lore",
      era: "faith"
    }
  },
  lore_golden_age: {
    id: "lore_golden_age",
    title: "The Golden Age",
    subtitle: "400-100 years ago",
    category: "lore",
    icon: "⭐",
    unlockHint: "Visit the Royal Archives",
    description: "Three hundred years of prosperity! Trade flourished, scholars debated, harvests were abundant, and nobody was secretly plotting to use dark magic to overthrow their father. The good old days. The royal archives from this period paint a picture of a kingdom at peace. Cherish this chapter—it doesn't last.",
    examples: [
      { french: "C'était une époque de paix.", english: "It was an era of peace." },
      { french: "Le commerce a prospéré.", english: "Trade flourished." },
      { french: "Les récoltes étaient abondantes.", english: "The harvests were abundant." }
    ],
    content: {
      type: "lore",
      era: "golden_age"
    }
  },
  lore_king_dran: {
    id: "lore_king_dran",
    title: "King Dran's Reign",
    subtitle: "100-30 years ago",
    category: "lore",
    icon: "🏰",
    unlockHint: "Hear tales of the old king",
    description: "King Dran maintained stability through seventy years of rule. His two sons, Hermeau and Layne, were raised to share the burden of governance. As children, they were inseparable. As teenagers, cracks appeared. As adults... well, you'll find out. Some families argue over dinner. Others argue over kingdoms.",
    examples: [
      { french: "Le roi Dran a régné longtemps.", english: "King Dran reigned for a long time." },
      { french: "Ses deux fils ont grandi ensemble.", english: "His two sons grew up together." },
      { french: "Ils sont devenus différents.", english: "They became different." }
    ],
    content: {
      type: "lore",
      era: "king_dran"
    }
  },
  lore_the_war: {
    id: "lore_the_war",
    title: "The War",
    subtitle: "~20 years ago",
    category: "lore",
    icon: "⚔️",
    unlockHint: "Uncover what really happened",
    description: "The official story: evil forces attacked, the king was assassinated, Hermeau heroically saved the kingdom. The actual story: [REDACTED BY ORDER OF THE CROWN]. Just kidding—we'll get to that. But survivors who were there tell a different tale. The Corruption didn't come from outside. It was invited.",
    examples: [
      { french: "La guerre a tout changé.", english: "The war changed everything." },
      { french: "Le roi a été assassiné.", english: "The king was assassinated." },
      { french: "La Corruption a détruit les terres.", english: "The Corruption destroyed the lands." }
    ],
    content: {
      type: "lore",
      era: "the_war"
    }
  },
  lore_exile: {
    id: "lore_exile",
    title: "The Exile",
    subtitle: "20 years ago - Present",
    category: "lore",
    icon: "🚪",
    unlockHint: "Find Layne's hidden letters",
    description: "Hermeau took the throne. Layne was exiled—officially for 'weakness in the face of the enemy,' unofficially for knowing too much. History was rewritten, the Order of Dawn compromised, and propaganda became truth. But Layne didn't go quietly. He left breadcrumbs. Letters. Evidence. Somewhere out there, the truth waits to be found.",
    examples: [
      { french: "Layne a été exilé.", english: "Layne was exiled." },
      { french: "L'histoire a été réécrite.", english: "History was rewritten." },
      { french: "La vérité attend d'être découverte.", english: "The truth waits to be discovered." }
    ],
    content: {
      type: "lore",
      era: "exile"
    }
  }
};

// Category display order and labels
const SPELLBOOK_CATEGORIES = [
  { id: "verbs", label: "Verbs", icon: "⚡" },
  { id: "grammar", label: "Grammar", icon: "📚" },
  { id: "reference", label: "Reference", icon: "📋" },
  { id: "lore", label: "Lore", icon: "📜" },
  { id: "artifacts", label: "Artifacts", icon: "🏺" }
];

// Era display info for artifacts
const ARTIFACT_ERAS = [
  { id: "ancients", label: "The Ancients", icon: "🏛️", order: 1 },
  { id: "silence", label: "The Silence", icon: "🌑", order: 2 },
  { id: "founding", label: "The Founding", icon: "👑", order: 3 },
  { id: "faith", label: "The Faith", icon: "✝️", order: 4 },
  { id: "golden_age", label: "The Golden Age", icon: "⭐", order: 5 },
  { id: "king_dran", label: "King Dran's Reign", icon: "🏰", order: 6 },
  { id: "the_war", label: "The War", icon: "⚔️", order: 7 },
  { id: "exile", label: "The Exile", icon: "🚪", order: 8 }
];

// =====================================================
// Spellbook Manager Class
// =====================================================

class SpellbookManager {
  constructor(gameState) {
    this.state = gameState;
    this.currentPage = null;
    this.currentView = null; // 'page' or 'artifacts'

    // Initialize spellbook state if not present
    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"], // Pronouns always available
        unlockedArtifacts: [],       // Artifact IDs the player has found
        lastViewed: null
      };
    }

    // Ensure artifacts array exists for older saves
    if (!this.state.player.spellbook.unlockedArtifacts) {
      this.state.player.spellbook.unlockedArtifacts = [];
    }
  }

  // ===================================================
  // Page Management
  // ===================================================

  /**
   * Check if a page is unlocked
   */
  isPageUnlocked(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page) return false;
    if (page.alwaysUnlocked) return true;
    return this.state.player.spellbook.unlockedPages.includes(pageId);
  }

  /**
   * Unlock a spellbook page
   */
  unlockPage(pageId) {
    if (!SPELLBOOK_PAGES[pageId]) {
      console.warn(`Unknown spellbook page: ${pageId}`);
      return false;
    }
    
    if (!this.state.player.spellbook.unlockedPages.includes(pageId)) {
      this.state.player.spellbook.unlockedPages.push(pageId);
      return true;
    }
    return false;
  }

  /**
   * Unlock multiple pages (from quest rewards)
   */
  unlockPages(pageIds) {
    let newUnlocks = [];
    pageIds.forEach(id => {
      if (this.unlockPage(id)) {
        newUnlocks.push(id);
      }
    });
    return newUnlocks;
  }

  /**
   * Get all pages in a category
   */
  getPagesInCategory(categoryId) {
    return Object.values(SPELLBOOK_PAGES).filter(p => p.category === categoryId);
  }

  /**
   * Get count of unlocked pages
   */
  getUnlockedCount() {
    return this.state.player.spellbook.unlockedPages.length;
  }

  /**
   * Get total page count
   */
  getTotalCount() {
    return Object.keys(SPELLBOOK_PAGES).length;
  }

  // ===================================================
  // Artifact Management
  // ===================================================

  /**
   * Check if an artifact is unlocked
   */
  isArtifactUnlocked(artifactId) {
    return this.state.player.spellbook.unlockedArtifacts.includes(artifactId);
  }

  /**
   * Unlock an artifact
   */
  unlockArtifact(artifactId) {
    if (!GAME_DATA.artifacts || !GAME_DATA.artifacts[artifactId]) {
      console.warn(`Unknown artifact: ${artifactId}`);
      return false;
    }

    if (!this.state.player.spellbook.unlockedArtifacts.includes(artifactId)) {
      this.state.player.spellbook.unlockedArtifacts.push(artifactId);
      return true;
    }
    return false;
  }

  /**
   * Get all artifacts for a specific era
   */
  getArtifactsForEra(eraId) {
    if (!GAME_DATA.artifacts) return [];
    return Object.values(GAME_DATA.artifacts)
      .filter(a => a.era === eraId)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get unlocked artifacts for a specific era
   */
  getUnlockedArtifactsForEra(eraId) {
    return this.getArtifactsForEra(eraId)
      .filter(a => this.isArtifactUnlocked(a.id));
  }

  /**
   * Check if all artifacts for an era are collected
   */
  isEraComplete(eraId) {
    const total = this.getArtifactsForEra(eraId).length;
    const unlocked = this.getUnlockedArtifactsForEra(eraId).length;
    return total > 0 && unlocked >= total;
  }

  /**
   * Get total artifact count
   */
  getTotalArtifactCount() {
    if (!GAME_DATA.artifacts) return 0;
    return Object.keys(GAME_DATA.artifacts).length;
  }

  /**
   * Get unlocked artifact count
   */
  getUnlockedArtifactCount() {
    return this.state.player.spellbook.unlockedArtifacts.length;
  }

  // ===================================================
  // UI Rendering
  // ===================================================

  /**
   * Show the spellbook modal
   */
  show() {
    const modal = document.getElementById('spellbook-modal');
    if (!modal) return;

    // Ensure spellbook state exists
    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"],
        lastViewed: null
      };
    }

    this.renderTableOfContents();

    // Show last viewed page or welcome
    const lastViewed = this.state.player.spellbook.lastViewed;
    if (lastViewed && this.isPageUnlocked(lastViewed)) {
      this.showPage(lastViewed);
    } else {
      this.showWelcome();
    }

    modal.classList.add('active');
  }

  /**
   * Hide the spellbook modal
   */
  hide() {
    const modal = document.getElementById('spellbook-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  /**
   * Render the table of contents
   */
  renderTableOfContents() {
    const toc = document.querySelector('.spellbook-toc');
    if (!toc) return;

    let html = '';

    SPELLBOOK_CATEGORIES.forEach(category => {
      // Special handling for artifacts category
      if (category.id === 'artifacts') {
        html += `
          <div class="toc-section">
            <div class="toc-section-title">${category.icon} ${category.label}</div>
        `;

        // Show each era as a clickable item
        ARTIFACT_ERAS.forEach(era => {
          const eraArtifacts = this.getArtifactsForEra(era.id);
          const eraUnlocked = this.getUnlockedArtifactsForEra(era.id);
          const isComplete = this.isEraComplete(era.id);
          const hasAny = eraUnlocked.length > 0;
          const isActive = this.currentView === 'artifacts' && this.currentPage === era.id;

          html += `
            <div class="toc-item ${hasAny ? '' : 'locked'} ${isActive ? 'active' : ''}"
                 data-artifact-era="${era.id}">
              <span class="toc-item-icon">${hasAny ? era.icon : '🔒'}</span>
              <span class="toc-item-label">${hasAny ? era.label : '???'}</span>
              <span class="toc-item-status">${isComplete ? '✓' : `${eraUnlocked.length}/${eraArtifacts.length}`}</span>
            </div>
          `;
        });

        html += '</div>';
        return;
      }

      // Normal category handling
      const pages = this.getPagesInCategory(category.id);
      if (pages.length === 0) return;

      html += `
        <div class="toc-section">
          <div class="toc-section-title">${category.icon} ${category.label}</div>
      `;

      pages.forEach(page => {
        const isUnlocked = this.isPageUnlocked(page.id);
        const isActive = this.currentView === 'page' && this.currentPage === page.id;

        html += `
          <div class="toc-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}"
               data-page="${page.id}">
            <span class="toc-item-icon">${isUnlocked ? page.icon : '🔒'}</span>
            <span class="toc-item-label">${isUnlocked ? page.title : '???'}</span>
            <span class="toc-item-status">${isUnlocked ? '✓' : ''}</span>
          </div>
        `;
      });

      html += '</div>';
    });

    toc.innerHTML = html;

    // Add click handlers for regular pages
    toc.querySelectorAll('.toc-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        if (this.isPageUnlocked(pageId)) {
          this.showPage(pageId);
        } else {
          this.showLockedPage(pageId);
        }
      });
    });

    // Add click handlers for artifact eras
    toc.querySelectorAll('.toc-item[data-artifact-era]').forEach(item => {
      item.addEventListener('click', () => {
        const eraId = item.dataset.artifactEra;
        this.showArtifactEra(eraId);
      });
    });
  }

  /**
   * Show welcome/intro page
   */
  showWelcome() {
    const content = document.querySelector('.spellbook-content');
    if (!content) return;
    
    this.currentPage = null;
    this.updateTocActive();
    
    const unlocked = this.getUnlockedCount();
    const total = this.getTotalCount();
    
    content.innerHTML = `
      <div class="spellbook-welcome">
        <div class="welcome-icon">📖</div>
        <div class="page-title">Welcome to Your Spellbook</div>
        <div class="welcome-text">
          <p>This tome contains the grammar knowledge you've acquired on your journey.</p>
          <p style="margin-top: 16px;">Select a topic from the left to review what you've learned.</p>
          <p style="margin-top: 16px; color: var(--accent-gold);">
            Pages Unlocked: ${unlocked} / ${total}
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Show a specific page
   */
  showPage(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page || !this.isPageUnlocked(pageId)) return;

    this.currentView = 'page';
    this.currentPage = pageId;
    this.state.player.spellbook.lastViewed = pageId;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    let html = `
      <div class="spellbook-page active">
        <div class="page-title">${page.icon} ${page.title}</div>
        <div class="page-subtitle">${page.subtitle}</div>
    `;

    // Add description if available
    if (page.description) {
      html += `<div class="page-description">${page.description}</div>`;
    }

    // Add examples if available
    if (page.examples && page.examples.length > 0) {
      html += `<div class="page-examples">`;
      page.examples.forEach(ex => {
        html += `
          <div class="example-item">
            <span class="example-french">${ex.french}</span>
            <span class="example-english">${ex.english}</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Render content based on type
    html += this.renderPageContent(page);

    html += '</div>';
    content.innerHTML = html;
  }

  /**
   * Show locked page info
   */
  showLockedPage(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page) return;

    this.currentView = 'page';
    this.currentPage = null;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    content.innerHTML = `
      <div class="locked-page">
        <div class="locked-icon">🔒</div>
        <div class="locked-message">This page is locked</div>
        <div class="locked-hint">${page.unlockHint}</div>
      </div>
    `;
  }

  /**
   * Show artifacts for a specific era
   */
  showArtifactEra(eraId) {
    const era = ARTIFACT_ERAS.find(e => e.id === eraId);
    if (!era) return;

    this.currentView = 'artifacts';
    this.currentPage = eraId;
    this.updateTocActive();

    const content = document.querySelector('.spellbook-content');
    if (!content) return;

    const artifacts = this.getArtifactsForEra(eraId);
    const unlockedArtifacts = this.getUnlockedArtifactsForEra(eraId);
    const isComplete = this.isEraComplete(eraId);

    let html = `
      <div class="spellbook-page active artifact-page">
        <div class="page-title">${era.icon} ${era.label}</div>
        <div class="page-subtitle">Artifacts Collected: ${unlockedArtifacts.length} / ${artifacts.length}</div>
    `;

    // Show completion status
    if (isComplete) {
      html += `
        <div class="era-complete-banner">
          <span class="complete-icon">✨</span>
          <span class="complete-text">Era Complete - The truth has been revealed</span>
        </div>
      `;
    }

    // Show artifact grid
    html += `<div class="artifact-grid">`;

    artifacts.forEach(artifact => {
      const isUnlocked = this.isArtifactUnlocked(artifact.id);

      if (isUnlocked) {
        html += `
          <div class="artifact-card unlocked" data-artifact="${artifact.id}">
            <div class="artifact-icon">${artifact.icon}</div>
            <div class="artifact-name">${artifact.name}</div>
            <div class="artifact-category">${artifact.category.replace(/_/g, ' ')}</div>
          </div>
        `;
      } else {
        html += `
          <div class="artifact-card locked">
            <div class="artifact-icon">❓</div>
            <div class="artifact-name">???</div>
            <div class="artifact-hint">${artifact.hint}</div>
          </div>
        `;
      }
    });

    html += `</div>`;

    // Show selected artifact detail area
    html += `<div class="artifact-detail" id="artifact-detail"></div>`;

    html += '</div>';
    content.innerHTML = html;

    // Add click handlers for artifact cards
    content.querySelectorAll('.artifact-card.unlocked').forEach(card => {
      card.addEventListener('click', () => {
        const artifactId = card.dataset.artifact;
        this.showArtifactDetail(artifactId);
        // Update active state
        content.querySelectorAll('.artifact-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Auto-show first unlocked artifact if any
    if (unlockedArtifacts.length > 0) {
      this.showArtifactDetail(unlockedArtifacts[0].id);
      content.querySelector(`.artifact-card[data-artifact="${unlockedArtifacts[0].id}"]`)?.classList.add('selected');
    }
  }

  /**
   * Show detail for a specific artifact
   */
  showArtifactDetail(artifactId) {
    const artifact = GAME_DATA.artifacts?.[artifactId];
    if (!artifact || !this.isArtifactUnlocked(artifactId)) return;

    const detailDiv = document.getElementById('artifact-detail');
    if (!detailDiv) return;

    detailDiv.innerHTML = `
      <div class="artifact-detail-content">
        <div class="artifact-detail-header">
          <span class="artifact-detail-icon">${artifact.icon}</span>
          <div class="artifact-detail-info">
            <div class="artifact-detail-name">${artifact.name}</div>
            <div class="artifact-detail-desc">${artifact.description}</div>
          </div>
        </div>
        <div class="artifact-lore-text">
          <div class="lore-quote">"${artifact.loreText}"</div>
        </div>
      </div>
    `;
  }

  /**
   * Update TOC active state
   */
  updateTocActive() {
    document.querySelectorAll('.toc-item').forEach(item => {
      const isPageMatch = item.dataset.page === this.currentPage && this.currentView === 'page';
      const isEraMatch = item.dataset.artifactEra === this.currentPage && this.currentView === 'artifacts';
      item.classList.toggle('active', isPageMatch || isEraMatch);
    });
  }

  /**
   * Render page content based on type
   */
  renderPageContent(page) {
    switch (page.content.type) {
      case 'conjugation':
        return this.renderConjugation(page.content.verb);
      case 'pattern':
        return this.renderPattern(page.content.pattern);
      case 'articles':
        return this.renderArticles();
      case 'gender':
        return this.renderGender();
      case 'pronouns':
        return this.renderPronouns();
      case 'negation':
        return this.renderNegation();
      case 'adjectives':
        return this.renderAdjectives();
      case 'possessives':
        return this.renderPossessives();
      case 'questions':
        return this.renderQuestions();
      case 'numbers':
        return this.renderNumbers();
      case 'passe_compose':
        return this.renderPasseCompose();
      case 'imparfait':
        return this.renderImparfait();
      case 'futur_proche':
        return this.renderFuturProche();
      case 'reflexive_verbs':
        return this.renderReflexiveVerbs();
      case 'avoir_expressions':
        return this.renderAvoirExpressions();
      case 'futur_simple':
        return this.renderFuturSimple();
      case 'conditionnel':
        return this.renderConditionnel();
      case 'subjonctif':
        return this.renderSubjonctif();
      case 'prepositions':
        return this.renderPrepositions();
      case 'contractions':
        return this.renderContractions();
      case 'adverbs':
        return this.renderAdverbs();
      case 'comparatives':
        return this.renderComparatives();
      case 'object_pronouns':
        return this.renderObjectPronouns();
      case 'lore':
        return this.renderLore(page.content.era);
      default:
        return '<p>Content not available.</p>';
    }
  }

  /**
   * Render verb conjugation table
   */
  renderConjugation(verbId) {
    if (typeof GRAMMAR === 'undefined' || !GRAMMAR.verbs[verbId]) {
      return '<p>Verb data not found.</p>';
    }
    
    const verb = GRAMMAR.verbs[verbId];
    
    let html = `
      <div class="page-section">
        <div class="page-section-title">Present Tense</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    const pronounOrder = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
    const pronounDisplay = {
      'je': 'je',
      'tu': 'tu',
      'il': 'il / elle / on',
      'nous': 'nous',
      'vous': 'vous',
      'ils': 'ils / elles'
    };
    
    pronounOrder.forEach(pronoun => {
      if (verb.present[pronoun]) {
        html += `
          <tr>
            <td class="pronoun">${pronounDisplay[pronoun]}</td>
            <td class="form">${verb.present[pronoun]}</td>
          </tr>
        `;
      }
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
    
    // Add tip if available
    if (verb.hint) {
      html += `
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          ${verb.hint}
        </div>
      `;
    }
    
    return html;
  }

  /**
   * Render verb pattern (e.g., regular -ER verbs)
   */
  renderPattern(patternId) {
    if (patternId === 'er_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -ER Verbs</div>
          <p style="margin-bottom: 16px;">Most French verbs end in -ER and follow this pattern. Remove -ER and add:</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (parler)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-es</td><td>parles</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-ons</td><td>parlons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-ez</td><td>parlez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-ent</td><td>parlent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          The endings -e, -es, -e, and -ent are all silent! Only -ons and -ez are pronounced.
        </div>
      `;
    }

    if (patternId === 'ir_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -IR Verbs</div>
          <p style="margin-bottom: 16px;">Regular -IR verbs add <strong>-iss-</strong> before plural endings. Remove -IR and add:</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (finir)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-is</td><td>finis</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-is</td><td>finis</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">-it</td><td>finit</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-issons</td><td>finissons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-issez</td><td>finissez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-issent</td><td>finissent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="page-section">
          <div class="page-section-title">Common -IR Verbs</div>
          <p>finir (finish), choisir (choose), réussir (succeed), grandir (grow), rougir (blush)</p>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          Not all -ir verbs follow this pattern! Verbs like "partir" and "dormir" are irregular.
        </div>
      `;
    }

    if (patternId === 're_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -RE Verbs</div>
          <p style="margin-bottom: 16px;">Regular -RE verbs drop the -RE and add endings. Note: <strong>no ending</strong> for il/elle!</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (vendre)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-s</td><td>vends</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-s</td><td>vends</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">—</td><td>vend</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-ons</td><td>vendons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-ez</td><td>vendez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-ent</td><td>vendent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="page-section">
          <div class="page-section-title">Common -RE Verbs</div>
          <p>vendre (sell), attendre (wait), répondre (answer), perdre (lose), entendre (hear)</p>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          The third person singular has no ending - just the stem! "Il vend" (he sells), not "il vende."
        </div>
      `;
    }

    return '<p>Pattern not found.</p>';
  }

  /**
   * Render articles reference
   */
  renderArticles() {
    return `
      <div class="page-section">
        <div class="page-section-title">Definite Articles (the)</div>
        <div class="articles-grid">
          <div class="article-card">
            <div class="article-card-title">Masculine</div>
            <div class="article-card-content">le</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Feminine</div>
            <div class="article-card-content">la</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Plural</div>
            <div class="article-card-content">les</div>
          </div>
        </div>
        <p style="font-size: 14px; color: var(--text-muted);">
          Before a vowel, both le and la become <strong>l'</strong> (l'ami, l'école)
        </p>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Indefinite Articles (a, an, some)</div>
        <div class="articles-grid">
          <div class="article-card">
            <div class="article-card-title">Masculine</div>
            <div class="article-card-content">un</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Feminine</div>
            <div class="article-card-content">une</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Plural</div>
            <div class="article-card-content">des</div>
          </div>
        </div>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Every French noun has a gender. You must memorize the gender along with the word!
      </div>
    `;
  }

  /**
   * Render gender reference
   */
  renderGender() {
    let mascHtml = '';
    let femHtml = '';
    
    if (typeof GRAMMAR !== 'undefined' && GRAMMAR.nouns) {
      // Show first 8 examples of each
      GRAMMAR.nouns.masculine.slice(0, 8).forEach(noun => {
        mascHtml += `
          <div class="gender-item">
            <span class="gender-french">le ${noun.french}</span>
            <span class="gender-english">${noun.english}</span>
          </div>
        `;
      });
      
      GRAMMAR.nouns.feminine.slice(0, 8).forEach(noun => {
        femHtml += `
          <div class="gender-item">
            <span class="gender-french">la ${noun.french}</span>
            <span class="gender-english">${noun.english}</span>
          </div>
        `;
      });
    }
    
    return `
      <div class="page-section">
        <div class="page-section-title">Examples by Gender</div>
        <div class="gender-list">
          <div class="gender-column masculine">
            <div class="gender-column-title">MASCULINE (le)</div>
            ${mascHtml}
          </div>
          <div class="gender-column feminine">
            <div class="gender-column-title">FEMININE (la)</div>
            ${femHtml}
          </div>
        </div>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Helpful Patterns</div>
        <p style="margin-bottom: 8px;"><strong>Usually Masculine:</strong> -age, -ment, -eau, -isme, -é</p>
        <p><strong>Usually Feminine:</strong> -tion, -sion, -té, -ure, -ette, -ille</p>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        These are patterns, not rules! There are exceptions, so always learn the article with the noun.
      </div>
    `;
  }

  /**
   * Render pronouns reference
   */
  renderPronouns() {
    let singularHtml = '';
    let pluralHtml = '';
    
    if (typeof GRAMMAR !== 'undefined' && GRAMMAR.pronouns) {
      GRAMMAR.pronouns.singular.forEach(p => {
        singularHtml += `
          <tr>
            <td class="form">${p.french}</td>
            <td>${p.english}</td>
            <td class="pronoun">${p.notes}</td>
          </tr>
        `;
      });
      
      GRAMMAR.pronouns.plural.forEach(p => {
        pluralHtml += `
          <tr>
            <td class="form">${p.french}</td>
            <td>${p.english}</td>
            <td class="pronoun">${p.notes}</td>
          </tr>
        `;
      });
    }
    
    return `
      <div class="page-section">
        <div class="page-section-title">Singular Pronouns</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${singularHtml}
          </tbody>
        </table>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Plural Pronouns</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${pluralHtml}
          </tbody>
        </table>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Use "tu" for friends and family, "vous" for strangers, elders, or to show respect.
      </div>
    `;
  }

  /**
   * Render negation reference
   */
  renderNegation() {
    return `
      <div class="page-section">
        <div class="page-section-title">Basic Negation: ne...pas</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Positive</th>
              <th>Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Je parle</td><td>Je <strong>ne</strong> parle <strong>pas</strong></td></tr>
            <tr><td>Tu manges</td><td>Tu <strong>ne</strong> manges <strong>pas</strong></td></tr>
            <tr><td>Il est content</td><td>Il <strong>n'</strong>est <strong>pas</strong> content</td></tr>
            <tr><td>J'ai faim</td><td>Je <strong>n'</strong>ai <strong>pas</strong> faim</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Other Negative Expressions</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Expression</th>
              <th>Meaning</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ne...jamais</td><td>never</td><td>Je ne mange jamais</td></tr>
            <tr><td>ne...rien</td><td>nothing</td><td>Je ne vois rien</td></tr>
            <tr><td>ne...plus</td><td>no longer</td><td>Je ne fume plus</td></tr>
            <tr><td>ne...personne</td><td>no one</td><td>Je ne connais personne</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        In casual spoken French, the "ne" is often dropped: "Je sais pas" instead of "Je ne sais pas."
      </div>
    `;
  }

  /**
   * Render adjectives reference
   */
  renderAdjectives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Gender Agreement</div>
        <p style="margin-bottom: 12px;">Add -e for feminine (unless already ends in -e):</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Masculine</th>
              <th>Feminine</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>petit</td><td>petit<strong>e</strong></td><td>small</td></tr>
            <tr><td>grand</td><td>grand<strong>e</strong></td><td>big/tall</td></tr>
            <tr><td>intelligent</td><td>intelligent<strong>e</strong></td><td>intelligent</td></tr>
            <tr><td>rouge</td><td>rouge</td><td>red (no change)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">BANGS Adjectives (Before Noun)</div>
        <p style="margin-bottom: 8px;">These common adjectives come BEFORE the noun:</p>
        <p><strong>B</strong>eauty: beau, joli</p>
        <p><strong>A</strong>ge: jeune, vieux, nouveau</p>
        <p><strong>N</strong>umber: premier, dernier</p>
        <p><strong>G</strong>oodness: bon, mauvais</p>
        <p><strong>S</strong>ize: petit, grand, gros</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Most adjectives come AFTER the noun: "une voiture rouge" (a red car), not "une rouge voiture."
      </div>
    `;
  }

  /**
   * Render possessives reference
   */
  renderPossessives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Possessive Adjectives</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Masc. Sing.</th>
              <th>Fem. Sing.</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je (my)</td><td>mon</td><td>ma</td><td>mes</td></tr>
            <tr><td>tu (your)</td><td>ton</td><td>ta</td><td>tes</td></tr>
            <tr><td>il/elle (his/her)</td><td>son</td><td>sa</td><td>ses</td></tr>
            <tr><td>nous (our)</td><td>notre</td><td>notre</td><td>nos</td></tr>
            <tr><td>vous (your)</td><td>votre</td><td>votre</td><td>vos</td></tr>
            <tr><td>ils/elles (their)</td><td>leur</td><td>leur</td><td>leurs</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Before feminine nouns starting with a vowel, use mon/ton/son instead of ma/ta/sa: "mon amie" (my friend, f).
      </div>
    `;
  }

  /**
   * Render questions reference
   */
  renderQuestions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Three Ways to Ask Yes/No Questions</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Method</th>
              <th>Example</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Intonation</td><td>Tu parles français?</td><td>Informal</td></tr>
            <tr><td>Est-ce que</td><td>Est-ce que tu parles français?</td><td>Standard</td></tr>
            <tr><td>Inversion</td><td>Parles-tu français?</td><td>Formal</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Question Words</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>qui</td><td>who</td><td>Qui est-ce?</td></tr>
            <tr><td>que / quoi</td><td>what</td><td>Que fais-tu?</td></tr>
            <tr><td>où</td><td>where</td><td>Où habites-tu?</td></tr>
            <tr><td>quand</td><td>when</td><td>Quand arrives-tu?</td></tr>
            <tr><td>comment</td><td>how</td><td>Comment ça va?</td></tr>
            <tr><td>pourquoi</td><td>why</td><td>Pourquoi pas?</td></tr>
            <tr><td>combien</td><td>how much/many</td><td>Combien ça coûte?</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Est-ce que" literally means "is it that" and can be added to any statement to make it a question.
      </div>
    `;
  }

  /**
   * Render numbers reference
   */
  renderNumbers() {
    return `
      <div class="page-section">
        <div class="page-section-title">Numbers 0-20</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 14px;">
          <span>0 - zéro</span><span>7 - sept</span><span>14 - quatorze</span>
          <span>1 - un</span><span>8 - huit</span><span>15 - quinze</span>
          <span>2 - deux</span><span>9 - neuf</span><span>16 - seize</span>
          <span>3 - trois</span><span>10 - dix</span><span>17 - dix-sept</span>
          <span>4 - quatre</span><span>11 - onze</span><span>18 - dix-huit</span>
          <span>5 - cinq</span><span>12 - douze</span><span>19 - dix-neuf</span>
          <span>6 - six</span><span>13 - treize</span><span>20 - vingt</span>
        </div>
      </div>

      <div class="page-section">
        <div class="page-section-title">Tens</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 14px;">
          <span>20 - vingt</span><span>60 - soixante</span>
          <span>30 - trente</span><span>70 - soixante-dix (60+10)</span>
          <span>40 - quarante</span><span>80 - quatre-vingts (4×20)</span>
          <span>50 - cinquante</span><span>90 - quatre-vingt-dix (4×20+10)</span>
        </div>
      </div>

      <div class="page-section">
        <div class="page-section-title">Special Rules</div>
        <p style="margin-bottom: 8px;"><strong>21, 31, 41, 51, 61:</strong> Use "et un" → vingt et un</p>
        <p style="margin-bottom: 8px;"><strong>71-79:</strong> soixante + 11-19 → soixante-quinze (75)</p>
        <p><strong>91-99:</strong> quatre-vingt + 11-19 → quatre-vingt-quinze (95)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Belgian French uses "septante" (70) and "nonante" (90). Swiss French also uses "huitante" (80).
      </div>
    `;
  }

  /**
   * Render passé composé reference
   */
  renderPasseCompose() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation: avoir + Past Participle</div>
        <p style="margin-bottom: 12px;">Most verbs use <strong>avoir</strong> as the helper:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Avoir</th>
              <th>+ Participle</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>ai</td><td>parlé</td><td>j'ai parlé</td></tr>
            <tr><td>tu</td><td>as</td><td>fini</td><td>tu as fini</td></tr>
            <tr><td>il/elle</td><td>a</td><td>vendu</td><td>il a vendu</td></tr>
            <tr><td>nous</td><td>avons</td><td>mangé</td><td>nous avons mangé</td></tr>
            <tr><td>vous</td><td>avez</td><td>choisi</td><td>vous avez choisi</td></tr>
            <tr><td>ils/elles</td><td>ont</td><td>attendu</td><td>ils ont attendu</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Past Participle Formation</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Verb Type</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>-ER verbs</td><td>-er → -é</td><td>parler → parlé</td></tr>
            <tr><td>-IR verbs</td><td>-ir → -i</td><td>finir → fini</td></tr>
            <tr><td>-RE verbs</td><td>-re → -u</td><td>vendre → vendu</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">DR MRS VANDERTRAMP (Être Verbs)</div>
        <p style="margin-bottom: 8px;">These verbs use <strong>être</strong> instead of avoir:</p>
        <p style="font-size: 14px; line-height: 1.8;">
          <strong>D</strong>evenir, <strong>R</strong>evenir, <strong>M</strong>onter, <strong>R</strong>ester,
          <strong>S</strong>ortir, <strong>V</strong>enir, <strong>A</strong>ller, <strong>N</strong>aître,
          <strong>D</strong>escendre, <strong>E</strong>ntrer, <strong>R</strong>etourner,
          <strong>T</strong>omber, <strong>R</strong>entrer, <strong>A</strong>rriver, <strong>M</strong>ourir,
          <strong>P</strong>artir
        </p>
        <p style="margin-top: 12px; font-size: 14px;"><strong>+ All reflexive verbs!</strong></p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        With être, the past participle agrees with the subject: "Elle est allée" (she went) vs "Il est allé" (he went).
      </div>
    `;
  }

  /**
   * Render imparfait reference
   */
  renderImparfait() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;">Take the <strong>nous</strong> form of present tense, drop <strong>-ons</strong>, add imparfait endings:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Ending</th>
              <th>Parler (parl-)</th>
              <th>Finir (finiss-)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>-ais</td><td>parlais</td><td>finissais</td></tr>
            <tr><td>tu</td><td>-ais</td><td>parlais</td><td>finissais</td></tr>
            <tr><td>il/elle</td><td>-ait</td><td>parlait</td><td>finissait</td></tr>
            <tr><td>nous</td><td>-ions</td><td>parlions</td><td>finissions</td></tr>
            <tr><td>vous</td><td>-iez</td><td>parliez</td><td>finissiez</td></tr>
            <tr><td>ils/elles</td><td>-aient</td><td>parlaient</td><td>finissaient</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Être (Irregular Stem: ét-)</div>
        <p style="font-size: 14px;">j'étais, tu étais, il était, nous étions, vous étiez, ils étaient</p>
      </div>

      <div class="page-section">
        <div class="page-section-title">When to Use Imparfait</div>
        <p style="margin-bottom: 8px;"><strong>Descriptions:</strong> Il faisait beau. (The weather was nice.)</p>
        <p style="margin-bottom: 8px;"><strong>Habits:</strong> Je mangeais souvent là. (I often ate there.)</p>
        <p style="margin-bottom: 8px;"><strong>Ongoing actions:</strong> Elle dormait quand... (She was sleeping when...)</p>
        <p><strong>Age/Time:</strong> J'avais dix ans. (I was ten years old.)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Passé composé = completed action (what happened). Imparfait = background/ongoing (what was happening).
      </div>
    `;
  }

  /**
   * Render futur proche reference
   */
  renderFuturProche() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation: Aller + Infinitive</div>
        <p style="margin-bottom: 12px;">Conjugate <strong>aller</strong> in present tense + <strong>infinitive</strong> of main verb:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Aller</th>
              <th>+ Infinitive</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>vais</td><td>manger</td><td>I'm going to eat</td></tr>
            <tr><td>tu</td><td>vas</td><td>partir</td><td>you're going to leave</td></tr>
            <tr><td>il/elle</td><td>va</td><td>dormir</td><td>he/she is going to sleep</td></tr>
            <tr><td>nous</td><td>allons</td><td>étudier</td><td>we're going to study</td></tr>
            <tr><td>vous</td><td>allez</td><td>voir</td><td>you're going to see</td></tr>
            <tr><td>ils/elles</td><td>vont</td><td>arriver</td><td>they're going to arrive</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Negation</div>
        <p style="margin-bottom: 8px;">Put <strong>ne...pas</strong> around the conjugated aller:</p>
        <p style="font-size: 14px;">Je <strong>ne</strong> vais <strong>pas</strong> manger. (I'm not going to eat.)</p>
        <p style="font-size: 14px;">Elle <strong>ne</strong> va <strong>pas</strong> venir. (She's not going to come.)</p>
      </div>

      <div class="page-section">
        <div class="page-section-title">With Reflexive Verbs</div>
        <p style="margin-bottom: 8px;">The reflexive pronoun goes before the infinitive:</p>
        <p style="font-size: 14px;">Je vais <strong>me</strong> lever. (I'm going to get up.)</p>
        <p style="font-size: 14px;">Nous allons <strong>nous</strong> promener. (We're going to walk.)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Futur proche implies the action will happen soon or is planned. For distant/uncertain future, use futur simple.
      </div>
    `;
  }

  /**
   * Render reflexive verbs reference
   */
  renderReflexiveVerbs() {
    return `
      <div class="page-section">
        <div class="page-section-title">Reflexive Pronouns</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Reflexive</th>
              <th>Se laver (to wash oneself)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>me (m')</td><td>je me lave</td></tr>
            <tr><td>tu</td><td>te (t')</td><td>tu te laves</td></tr>
            <tr><td>il/elle/on</td><td>se (s')</td><td>il se lave</td></tr>
            <tr><td>nous</td><td>nous</td><td>nous nous lavons</td></tr>
            <tr><td>vous</td><td>vous</td><td>vous vous lavez</td></tr>
            <tr><td>ils/elles</td><td>se (s')</td><td>ils se lavent</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Reflexive Verbs</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
          <span>se lever - to get up</span>
          <span>se coucher - to go to bed</span>
          <span>se laver - to wash</span>
          <span>s'habiller - to get dressed</span>
          <span>se brosser - to brush</span>
          <span>se réveiller - to wake up</span>
          <span>se promener - to walk</span>
          <span>s'appeler - to be called</span>
          <span>se sentir - to feel</span>
          <span>se souvenir - to remember</span>
        </div>
      </div>

      <div class="page-section">
        <div class="page-section-title">Passé Composé with Reflexives</div>
        <p style="margin-bottom: 8px;">Always use <strong>être</strong> and agree the past participle:</p>
        <p style="font-size: 14px;">Elle <strong>s'est lavée</strong>. (She washed herself.) - feminine agreement</p>
        <p style="font-size: 14px;">Ils <strong>se sont levés</strong>. (They got up.) - plural agreement</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        In negative: Je <strong>ne</strong> me lave <strong>pas</strong>. The reflexive pronoun stays before the verb.
      </div>
    `;
  }

  /**
   * Render avoir expressions reference
   */
  renderAvoirExpressions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Physical Sensations</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>Literal</th>
              <th>English Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>avoir faim</td><td>to have hunger</td><td>to be hungry</td></tr>
            <tr><td>avoir soif</td><td>to have thirst</td><td>to be thirsty</td></tr>
            <tr><td>avoir chaud</td><td>to have heat</td><td>to be hot</td></tr>
            <tr><td>avoir froid</td><td>to have cold</td><td>to be cold</td></tr>
            <tr><td>avoir sommeil</td><td>to have sleepiness</td><td>to be sleepy</td></tr>
            <tr><td>avoir mal (à)</td><td>to have pain (in)</td><td>to hurt, ache</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">States and Emotions</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>Literal</th>
              <th>English Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>avoir peur (de)</td><td>to have fear</td><td>to be afraid (of)</td></tr>
            <tr><td>avoir honte (de)</td><td>to have shame</td><td>to be ashamed (of)</td></tr>
            <tr><td>avoir raison</td><td>to have reason</td><td>to be right</td></tr>
            <tr><td>avoir tort</td><td>to have wrong</td><td>to be wrong</td></tr>
            <tr><td>avoir de la chance</td><td>to have luck</td><td>to be lucky</td></tr>
            <tr><td>avoir besoin (de)</td><td>to have need</td><td>to need</td></tr>
            <tr><td>avoir envie (de)</td><td>to have desire</td><td>to want, feel like</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Age</div>
        <p style="font-size: 14px;"><strong>J'ai vingt ans.</strong> = I am twenty years old. (I have twenty years)</p>
        <p style="font-size: 14px;"><strong>Quel âge avez-vous?</strong> = How old are you? (What age have you?)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Never use "être" for these expressions! "Je suis faim" is wrong—always "J'ai faim."
      </div>
    `;
  }

  /**
   * Render futur simple reference
   */
  renderFuturSimple() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation: Infinitive + Endings</div>
        <p style="margin-bottom: 12px;">Add endings to the <strong>infinitive</strong> (drop -e from -re verbs):</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Ending</th>
              <th>Parler</th>
              <th>Finir</th>
              <th>Vendre</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>-ai</td><td>parlerai</td><td>finirai</td><td>vendrai</td></tr>
            <tr><td>tu</td><td>-as</td><td>parleras</td><td>finiras</td><td>vendras</td></tr>
            <tr><td>il/elle</td><td>-a</td><td>parlera</td><td>finira</td><td>vendra</td></tr>
            <tr><td>nous</td><td>-ons</td><td>parlerons</td><td>finirons</td><td>vendrons</td></tr>
            <tr><td>vous</td><td>-ez</td><td>parlerez</td><td>finirez</td><td>vendrez</td></tr>
            <tr><td>ils/elles</td><td>-ont</td><td>parleront</td><td>finiront</td><td>vendront</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Stems (Must Memorize)</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
          <span>être → ser- (je serai)</span>
          <span>avoir → aur- (j'aurai)</span>
          <span>aller → ir- (j'irai)</span>
          <span>faire → fer- (je ferai)</span>
          <span>venir → viendr- (je viendrai)</span>
          <span>voir → verr- (je verrai)</span>
          <span>pouvoir → pourr- (je pourrai)</span>
          <span>vouloir → voudr- (je voudrai)</span>
          <span>savoir → saur- (je saurai)</span>
          <span>devoir → devr- (je devrai)</span>
        </div>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Notice the endings are the same as avoir in present tense: ai, as, a, ons, ez, ont!
      </div>
    `;
  }

  /**
   * Render conditionnel reference
   */
  renderConditionnel() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation: Future Stem + Imparfait Endings</div>
        <p style="margin-bottom: 12px;">Use the <strong>future stem</strong> + <strong>imparfait endings</strong>:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Ending</th>
              <th>Parler</th>
              <th>Avoir (aur-)</th>
              <th>Être (ser-)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>je</td><td>-ais</td><td>parlerais</td><td>aurais</td><td>serais</td></tr>
            <tr><td>tu</td><td>-ais</td><td>parlerais</td><td>aurais</td><td>serais</td></tr>
            <tr><td>il/elle</td><td>-ait</td><td>parlerait</td><td>aurait</td><td>serait</td></tr>
            <tr><td>nous</td><td>-ions</td><td>parlerions</td><td>aurions</td><td>serions</td></tr>
            <tr><td>vous</td><td>-iez</td><td>parleriez</td><td>auriez</td><td>seriez</td></tr>
            <tr><td>ils/elles</td><td>-aient</td><td>parleraient</td><td>auraient</td><td>seraient</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">When to Use Conditionnel</div>
        <p style="margin-bottom: 8px;"><strong>Polite requests:</strong> Je voudrais... (I would like...)</p>
        <p style="margin-bottom: 8px;"><strong>Hypotheticals:</strong> Si j'avais..., je ferais... (If I had..., I would do...)</p>
        <p style="margin-bottom: 8px;"><strong>Suggestions:</strong> Tu pourrais essayer. (You could try.)</p>
        <p><strong>Reported speech:</strong> Il a dit qu'il viendrait. (He said he would come.)</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        The "si" clause uses imparfait, not conditionnel: "Si j'avais" (not "si j'aurais").
      </div>
    `;
  }

  /**
   * Render subjonctif reference
   */
  renderSubjonctif() {
    return `
      <div class="page-section">
        <div class="page-section-title">Formation</div>
        <p style="margin-bottom: 12px;">Take the <strong>ils</strong> form of present, drop <strong>-ent</strong>, add endings:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Ending</th>
              <th>Parler (parl-)</th>
              <th>Finir (finiss-)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>que je</td><td>-e</td><td>parle</td><td>finisse</td></tr>
            <tr><td>que tu</td><td>-es</td><td>parles</td><td>finisses</td></tr>
            <tr><td>qu'il/elle</td><td>-e</td><td>parle</td><td>finisse</td></tr>
            <tr><td>que nous</td><td>-ions</td><td>parlions</td><td>finissions</td></tr>
            <tr><td>que vous</td><td>-iez</td><td>parliez</td><td>finissiez</td></tr>
            <tr><td>qu'ils/elles</td><td>-ent</td><td>parlent</td><td>finissent</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Subjonctif (être & avoir)</div>
        <p style="font-size: 14px; margin-bottom: 8px;"><strong>Être:</strong> sois, sois, soit, soyons, soyez, soient</p>
        <p style="font-size: 14px;"><strong>Avoir:</strong> aie, aies, ait, ayons, ayez, aient</p>
      </div>

      <div class="page-section">
        <div class="page-section-title">Triggers (Expressions Requiring Subjonctif)</div>
        <p style="margin-bottom: 8px;"><strong>Necessity:</strong> il faut que, il est nécessaire que</p>
        <p style="margin-bottom: 8px;"><strong>Desire:</strong> je veux que, je souhaite que</p>
        <p style="margin-bottom: 8px;"><strong>Emotion:</strong> je suis content que, j'ai peur que</p>
        <p><strong>Doubt:</strong> je doute que, je ne pense pas que</p>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Subjonctif is always preceded by "que". If there's no "que", you don't need subjonctif!
      </div>
    `;
  }

  /**
   * Render prepositions reference
   */
  renderPrepositions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Location & Direction</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>à</td><td>to, at</td><td>Je vais à Paris.</td></tr>
            <tr><td>de</td><td>from, of</td><td>Je viens de Lyon.</td></tr>
            <tr><td>dans</td><td>in, inside</td><td>Le chat est dans la boîte.</td></tr>
            <tr><td>sur</td><td>on</td><td>Le livre est sur la table.</td></tr>
            <tr><td>sous</td><td>under</td><td>Le chien est sous le lit.</td></tr>
            <tr><td>devant</td><td>in front of</td><td>Il est devant la maison.</td></tr>
            <tr><td>derrière</td><td>behind</td><td>Le jardin est derrière.</td></tr>
            <tr><td>entre</td><td>between</td><td>Entre toi et moi.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Other Common Prepositions</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>avec</td><td>with</td><td>Je vais avec toi.</td></tr>
            <tr><td>sans</td><td>without</td><td>Café sans sucre.</td></tr>
            <tr><td>pour</td><td>for</td><td>C'est pour toi.</td></tr>
            <tr><td>par</td><td>by, through</td><td>Par la fenêtre.</td></tr>
            <tr><td>chez</td><td>at someone's place</td><td>Je suis chez Marie.</td></tr>
            <tr><td>pendant</td><td>during</td><td>Pendant les vacances.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        "Chez" is unique to French - it means "at the home/place of" and has no direct English equivalent.
      </div>
    `;
  }

  /**
   * Render contractions reference
   */
  renderContractions() {
    return `
      <div class="page-section">
        <div class="page-section-title">Mandatory Contractions</div>
        <p style="margin-bottom: 12px;">These contractions are <strong>required</strong>, not optional!</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Combination</th>
              <th>Contraction</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>à + le</td><td><strong>au</strong></td><td>Je vais au marché.</td></tr>
            <tr><td>à + les</td><td><strong>aux</strong></td><td>Je parle aux enfants.</td></tr>
            <tr><td>de + le</td><td><strong>du</strong></td><td>Le livre du professeur.</td></tr>
            <tr><td>de + les</td><td><strong>des</strong></td><td>La maison des voisins.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">No Contraction With la or l'</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Combination</th>
              <th>Result</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>à + la</td><td>à la</td><td>Je vais à la gare.</td></tr>
            <tr><td>à + l'</td><td>à l'</td><td>Je vais à l'école.</td></tr>
            <tr><td>de + la</td><td>de la</td><td>Le prix de la maison.</td></tr>
            <tr><td>de + l'</td><td>de l'</td><td>La fin de l'histoire.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Common error: "Je vais à le cinéma" ❌ → "Je vais au cinéma" ✓
      </div>
    `;
  }

  /**
   * Render adverbs reference
   */
  renderAdverbs() {
    return `
      <div class="page-section">
        <div class="page-section-title">Forming Adverbs from Adjectives</div>
        <p style="margin-bottom: 12px;">Take the <strong>feminine</strong> adjective, add <strong>-ment</strong>:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Masc. Adj</th>
              <th>Fem. Adj</th>
              <th>Adverb</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>lent</td><td>lente</td><td>lentement</td><td>slowly</td></tr>
            <tr><td>heureux</td><td>heureuse</td><td>heureusement</td><td>happily</td></tr>
            <tr><td>doux</td><td>douce</td><td>doucement</td><td>gently</td></tr>
            <tr><td>franc</td><td>franche</td><td>franchement</td><td>frankly</td></tr>
          </tbody>
        </table>
        <p style="font-size: 14px; margin-top: 8px;"><strong>Exception:</strong> Adjectives ending in vowel use masculine: vrai → vraiment</p>
      </div>

      <div class="page-section">
        <div class="page-section-title">Common Irregular Adverbs</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
          <span>bien - well</span>
          <span>mal - badly</span>
          <span>vite - quickly</span>
          <span>souvent - often</span>
          <span>toujours - always</span>
          <span>jamais - never</span>
          <span>déjà - already</span>
          <span>encore - still, again</span>
          <span>très - very</span>
          <span>trop - too much</span>
          <span>assez - enough</span>
          <span>beaucoup - a lot</span>
        </div>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Adverbs usually go after the verb: "Elle parle lentement." In passé composé, short adverbs go between avoir/être and participle: "J'ai bien mangé."
      </div>
    `;
  }

  /**
   * Render comparatives reference
   */
  renderComparatives() {
    return `
      <div class="page-section">
        <div class="page-section-title">Comparisons</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Type</th>
              <th>Structure</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>More than</td><td>plus + adj + que</td><td>Il est plus grand que moi.</td></tr>
            <tr><td>Less than</td><td>moins + adj + que</td><td>Elle est moins grande que lui.</td></tr>
            <tr><td>As...as</td><td>aussi + adj + que</td><td>Je suis aussi fort que toi.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Superlatives</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Type</th>
              <th>Structure</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>The most</td><td>le/la/les plus + adj</td><td>C'est la plus belle ville.</td></tr>
            <tr><td>The least</td><td>le/la/les moins + adj</td><td>C'est le moins cher.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Irregular Comparatives</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Adjective</th>
              <th>Comparative</th>
              <th>Superlative</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>bon (good)</td><td>meilleur (better)</td><td>le meilleur (the best)</td></tr>
            <tr><td>mauvais (bad)</td><td>pire (worse)</td><td>le pire (the worst)</td></tr>
            <tr><td>bien (well)</td><td>mieux (better)</td><td>le mieux (the best)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Never say "plus bon" or "plus bien"! Always use "meilleur" and "mieux".
      </div>
    `;
  }

  /**
   * Render object pronouns reference
   */
  renderObjectPronouns() {
    return `
      <div class="page-section">
        <div class="page-section-title">Direct Object Pronouns</div>
        <p style="margin-bottom: 12px;">Replace nouns receiving the action <strong>directly</strong>:</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Person</th>
              <th>Pronoun</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>me</td><td>me (m')</td><td>Il me voit. (He sees me.)</td></tr>
            <tr><td>you (informal)</td><td>te (t')</td><td>Je te connais. (I know you.)</td></tr>
            <tr><td>him/it (m)</td><td>le (l')</td><td>Je le mange. (I eat it.)</td></tr>
            <tr><td>her/it (f)</td><td>la (l')</td><td>Je la vois. (I see her.)</td></tr>
            <tr><td>us</td><td>nous</td><td>Il nous aide. (He helps us.)</td></tr>
            <tr><td>you (formal/pl)</td><td>vous</td><td>Je vous comprends. (I understand you.)</td></tr>
            <tr><td>them</td><td>les</td><td>Je les aime. (I love them.)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-section">
        <div class="page-section-title">Indirect Object Pronouns</div>
        <p style="margin-bottom: 12px;">Replace nouns receiving action <strong>indirectly</strong> (to whom):</p>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>Person</th>
              <th>Pronoun</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>to me</td><td>me (m')</td><td>Il me parle. (He speaks to me.)</td></tr>
            <tr><td>to you (inf)</td><td>te (t')</td><td>Je te donne... (I give to you...)</td></tr>
            <tr><td>to him/her</td><td>lui</td><td>Je lui parle. (I speak to him/her.)</td></tr>
            <tr><td>to us</td><td>nous</td><td>Elle nous écrit. (She writes to us.)</td></tr>
            <tr><td>to you (form)</td><td>vous</td><td>Je vous réponds. (I answer you.)</td></tr>
            <tr><td>to them</td><td>leur</td><td>Je leur parle. (I speak to them.)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Object pronouns go <strong>before</strong> the verb: "Je le vois" not "Je vois le". In passé composé, they go before avoir/être: "Je l'ai vu."
      </div>
    `;
  }

  /**
   * Render lore/history page
   */
  renderLore(era) {
    const loreDetails = {
      ancients: {
        sections: [
          {
            title: "What We Know",
            content: "The Ancients predated Verandum by over a thousand years. They constructed Lurenium using techniques that remain beyond modern understanding. Evidence suggests they built the city not as a dwelling place, but as a containment structure."
          },
          {
            title: "What Remains Unknown",
            content: "The purpose of Lurenium. The nature of what lies beneath it. The cause of the Ancients' disappearance. Their original language. These questions have no confirmed answers."
          },
          {
            title: "Remaining Evidence",
            content: "Stone tablets with partially legible inscriptions have been found across the land. The architecture of Lurenium shows construction methods that cannot be replicated today. The city itself has stood for over a millennium without decay."
          }
        ],
        tip: "Ancient relics are written in an archaic form of the language. Advanced grammar knowledge may be required to interpret them."
      },
      silence: {
        sections: [
          {
            title: "The Collapse",
            content: "The Ancient civilization ended within a single generation. Cities that had thrived for centuries were abandoned. No records explain what occurred. The transition from prosperity to emptiness was complete and absolute."
          },
          {
            title: "The Wandering Years",
            content: "For five hundred years, scattered tribes roamed the land without unity. Writing was lost. History became oral tradition, fading with each generation. Knowledge accumulated over centuries disappeared."
          },
          {
            title: "Historical Significance",
            content: "The Silence demonstrates that even advanced civilizations can fall completely. This period serves as a reminder that no kingdom, regardless of its power, is guaranteed permanence."
          }
        ],
        tip: "Scholars continue to debate the cause of the Silence. Evidence of what truly happened may still exist in unexplored ruins."
      },
      founding: {
        sections: [
          {
            title: "Unification",
            content: "Approximately five hundred years ago, tribal leaders formed a coalition that became the Kingdom of Verandum. They adopted a common language derived from fragments of Ancient texts, establishing French as the official tongue."
          },
          {
            title: "Rediscovery of Lurenium",
            content: "The founders discovered Lurenium still standing, preserved despite centuries of abandonment. They claimed the Ancient city as their capital and built their new civilization upon its foundations."
          },
          {
            title: "A Fateful Decision",
            content: "The founders chose to build over the Ancient structures rather than study them. Inscriptions were covered, chambers sealed, warnings ignored. The mysteries of the Ancients were set aside in favor of progress."
          }
        ],
        tip: "The founding documents are preserved in the Royal Archives at Ingregaard. Access has been restricted under the current administration."
      },
      faith: {
        sections: [
          {
            title: "The Order of Dawn",
            content: "One century after the founding, the Order of Dawn was established. Their founding principles emphasized service to the Light, commitment to truth, and protection of the vulnerable. Temples were built in every region."
          },
          {
            title: "Original Teachings",
            content: "The earliest Dawn Prayer Books contain passages emphasizing humility and moral accountability. One notable verse reads: 'Even kings must answer to truth.' This passage has been altered in current editions."
          },
          {
            title: "Changes Under Hermeau",
            content: "The modern Order of Dawn operates in service to the crown. Religious texts have been revised. Priests who preserved the original teachings have either gone into hiding or ceased speaking publicly."
          }
        ],
        tip: "Original Dawn Prayer Books still exist in hidden locations. Comparing them to current editions reveals significant alterations to core teachings."
      },
      golden_age: {
        sections: [
          {
            title: "Three Centuries of Prosperity",
            content: "From the establishment of the Order of Dawn until the rise of King Dran's lineage, Verandum experienced sustained prosperity. Trade routes connected all regions. Scholarly institutions flourished. Agricultural yields were consistently strong."
          },
          {
            title: "The Royal Archives",
            content: "This era produced the most comprehensive historical records in Verandum's history. Detailed accounts of governance, commerce, and scholarship document a kingdom at the height of its stability."
          },
          {
            title: "Early Warning Signs",
            content: "Even during this prosperous period, certain nobles pursued forbidden knowledge. Documents from this era reference secretive research and experimentation with forces outside the Light's domain."
          }
        ],
        tip: "Golden Age records provide the clearest picture of what Verandum once was. They also contain early references to the dark magic that would later threaten the kingdom."
      },
      king_dran: {
        sections: [
          {
            title: "The Reign of King Dran",
            content: "King Dran ruled for seventy years. Historical accounts describe him as fair, wise, and respected by his subjects. He maintained traditional governance, honored the royal family code, and preserved peace throughout his reign."
          },
          {
            title: "The Two Princes",
            content: "Hermeau, the elder son, was known for his ambition and charisma. Layne, the younger, was characterized by careful observation and thoughtful deliberation. The brothers were close as children but grew apart as they matured."
          },
          {
            title: "Final Years",
            content: "In the last decade of King Dran's reign, Prince Hermeau's activities drew concern. He spent increasing time in restricted areas of the castle and received visitors whose identities were not recorded."
          }
        ],
        tip: "Castle servants from this period have knowledge of events that occurred in the lower chambers. Most are unwilling to speak of what they witnessed."
      },
      the_war: {
        sections: [
          {
            title: "The Official Account",
            content: "According to royal records, external forces attacked Verandum. The Corruption spread from beyond the borders. King Dran fell defending his people. Prince Hermeau led the kingdom to victory. Prince Layne proved unable to contribute."
          },
          {
            title: "Contradicting Evidence",
            content: "Witness accounts suggest the Corruption originated within Verandum, not beyond its borders. King Dran's death occurred under circumstances inconsistent with battlefield combat. Prince Layne's exile followed his refusal to support certain actions."
          },
          {
            title: "Living Witnesses",
            content: "Farmers, soldiers, and servants who lived through the war possess firsthand knowledge of events. Many have chosen silence. Those who speak describe occurrences that contradict the official narrative."
          }
        ],
        tip: "War journals written by soldiers present during the conflict contain accounts that differ significantly from official histories. Some of these journals remain hidden."
      },
      exile: {
        sections: [
          {
            title: "Consolidation of Power",
            content: "Following his assumption of the throne, Hermeau acted decisively. Layne was exiled on charges of cowardice. Servants loyal to the old king disappeared. The Order of Dawn was restructured under royal authority."
          },
          {
            title: "Revision of History",
            content: "Within years, the official account became the only publicly accepted version of events. Educational materials were updated. Monuments were erected celebrating Hermeau's heroism. Alternative narratives were suppressed."
          },
          {
            title: "Preserved Evidence",
            content: "Before his exile, Layne concealed documents throughout the kingdom. Letters, witness statements, and official records that contradict the current narrative were hidden in locations known only to a few."
          }
        ],
        tip: "Layne's hidden letters are scattered across Verandum. Locating them may reveal information that has been deliberately suppressed."
      }
    };

    const details = loreDetails[era];
    if (!details) {
      return '<p>Lore details not available for this era.</p>';
    }

    let html = '';

    details.sections.forEach(section => {
      html += `
        <div class="page-section">
          <div class="page-section-title">${section.title}</div>
          <p style="line-height: 1.6;">${section.content}</p>
        </div>
      `;
    });

    html += `
      <div class="grammar-tip">
        <span class="grammar-tip-icon">📜</span>
        ${details.tip}
      </div>
    `;

    return html;
  }
}

// =====================================================
// Global Functions
// =====================================================

let spellbookManager = null;

function initSpellbook(gameState) {
  spellbookManager = new SpellbookManager(gameState);
}

function showSpellbook() {
  if (spellbookManager) {
    spellbookManager.show();
  }
}

function hideSpellbook() {
  if (spellbookManager) {
    spellbookManager.hide();
  }
}

function unlockSpellbookPages(pageIds) {
  if (spellbookManager) {
    const newPages = spellbookManager.unlockPages(pageIds);
    if (newPages.length > 0) {
      const pageNames = newPages.map(id => SPELLBOOK_PAGES[id]?.title || id).join(', ');
      if (typeof showNotification === 'function') {
        showNotification(`📖 Spellbook Updated: ${pageNames}`, 'success');
      }
    }
    return newPages;
  }
  return [];
}

function unlockArtifact(artifactId) {
  if (spellbookManager) {
    const unlocked = spellbookManager.unlockArtifact(artifactId);
    if (unlocked) {
      const artifact = GAME_DATA.artifacts?.[artifactId];
      if (artifact && typeof showNotification === 'function') {
        showNotification(`🏺 Artifact Found: ${artifact.name}`, 'success');
      }

      // Check if era is now complete
      if (artifact) {
        const era = ARTIFACT_ERAS.find(e => e.id === artifact.era);
        if (era && spellbookManager.isEraComplete(artifact.era)) {
          if (typeof showNotification === 'function') {
            showNotification(`✨ Era Complete: ${era.label}`, 'success');
          }
        }
      }

      // Check for artifact-related achievements
      if (typeof checkAchievements === 'function') {
        checkAchievements();
      }
    }
    return unlocked;
  }
  return false;
}

function isArtifactUnlocked(artifactId) {
  if (spellbookManager) {
    return spellbookManager.isArtifactUnlocked(artifactId);
  }
  return false;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SPELLBOOK_PAGES,
    SPELLBOOK_CATEGORIES,
    ARTIFACT_ERAS,
    SpellbookManager,
    initSpellbook,
    showSpellbook,
    hideSpellbook,
    unlockSpellbookPages,
    unlockArtifact,
    isArtifactUnlocked
  };
}
