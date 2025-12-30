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
      auxiliary: "avoir",
      pastParticiple: "été",
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
      },
      imparfait: {
        je: "étais",
        tu: "étais",
        il: "était",
        elle: "était",
        on: "était",
        nous: "étions",
        vous: "étiez",
        ils: "étaient",
        elles: "étaient"
      },
      futurSimple: {
        je: "serai",
        tu: "seras",
        il: "sera",
        elle: "sera",
        on: "sera",
        nous: "serons",
        vous: "serez",
        ils: "seront",
        elles: "seront"
      },
      conditionnel: {
        je: "serais",
        tu: "serais",
        il: "serait",
        elle: "serait",
        on: "serait",
        nous: "serions",
        vous: "seriez",
        ils: "seraient",
        elles: "seraient"
      }
    },
    avoir: {
      infinitive: "avoir",
      english: "to have",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "eu",
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
      },
      imparfait: {
        je: "avais",
        tu: "avais",
        il: "avait",
        elle: "avait",
        on: "avait",
        nous: "avions",
        vous: "aviez",
        ils: "avaient",
        elles: "avaient"
      },
      futurSimple: {
        je: "aurai",
        tu: "auras",
        il: "aura",
        elle: "aura",
        on: "aura",
        nous: "aurons",
        vous: "aurez",
        ils: "auront",
        elles: "auront"
      },
      conditionnel: {
        je: "aurais",
        tu: "aurais",
        il: "aurait",
        elle: "aurait",
        on: "aurait",
        nous: "aurions",
        vous: "auriez",
        ils: "auraient",
        elles: "auraient"
      }
    },
    aller: {
      infinitive: "aller",
      english: "to go",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "allé",
      hint: "Used for movement and future tense. Uses être in passé composé",
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
      },
      imparfait: {
        je: "allais",
        tu: "allais",
        il: "allait",
        elle: "allait",
        on: "allait",
        nous: "allions",
        vous: "alliez",
        ils: "allaient",
        elles: "allaient"
      },
      futurSimple: {
        je: "irai",
        tu: "iras",
        il: "ira",
        elle: "ira",
        on: "ira",
        nous: "irons",
        vous: "irez",
        ils: "iront",
        elles: "iront"
      },
      conditionnel: {
        je: "irais",
        tu: "irais",
        il: "irait",
        elle: "irait",
        on: "irait",
        nous: "irions",
        vous: "iriez",
        ils: "iraient",
        elles: "iraient"
      }
    },
    faire: {
      infinitive: "faire",
      english: "to do/make",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "fait",
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
      },
      imparfait: {
        je: "faisais",
        tu: "faisais",
        il: "faisait",
        elle: "faisait",
        on: "faisait",
        nous: "faisions",
        vous: "faisiez",
        ils: "faisaient",
        elles: "faisaient"
      },
      futurSimple: {
        je: "ferai",
        tu: "feras",
        il: "fera",
        elle: "fera",
        on: "fera",
        nous: "ferons",
        vous: "ferez",
        ils: "feront",
        elles: "feront"
      },
      conditionnel: {
        je: "ferais",
        tu: "ferais",
        il: "ferait",
        elle: "ferait",
        on: "ferait",
        nous: "ferions",
        vous: "feriez",
        ils: "feraient",
        elles: "feraient"
      }
    },
    parler: {
      infinitive: "parler",
      english: "to speak",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "parlé",
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
      },
      imparfait: {
        je: "parlais",
        tu: "parlais",
        il: "parlait",
        elle: "parlait",
        on: "parlait",
        nous: "parlions",
        vous: "parliez",
        ils: "parlaient",
        elles: "parlaient"
      },
      futurSimple: {
        je: "parlerai",
        tu: "parleras",
        il: "parlera",
        elle: "parlera",
        on: "parlera",
        nous: "parlerons",
        vous: "parlerez",
        ils: "parleront",
        elles: "parleront"
      },
      conditionnel: {
        je: "parlerais",
        tu: "parlerais",
        il: "parlerait",
        elle: "parlerait",
        on: "parlerait",
        nous: "parlerions",
        vous: "parleriez",
        ils: "parleraient",
        elles: "parleraient"
      }
    },
    manger: {
      infinitive: "manger",
      english: "to eat",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "mangé",
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
      },
      imparfait: {
        je: "mangeais",
        tu: "mangeais",
        il: "mangeait",
        elle: "mangeait",
        on: "mangeait",
        nous: "mangions",
        vous: "mangiez",
        ils: "mangeaient",
        elles: "mangeaient"
      },
      futurSimple: {
        je: "mangerai",
        tu: "mangeras",
        il: "mangera",
        elle: "mangera",
        on: "mangera",
        nous: "mangerons",
        vous: "mangerez",
        ils: "mangeront",
        elles: "mangeront"
      },
      conditionnel: {
        je: "mangerais",
        tu: "mangerais",
        il: "mangerait",
        elle: "mangerait",
        on: "mangerait",
        nous: "mangerions",
        vous: "mangeriez",
        ils: "mangeraient",
        elles: "mangeraient"
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
    // Haari Fields agricultural verbs
    planter: {
      infinitive: "planter",
      english: "to plant",
      type: "regular-er",
      hint: "Regular -er verb for putting seeds in ground",
      present: {
        je: "plante",
        tu: "plantes",
        il: "plante",
        elle: "plante",
        on: "plante",
        nous: "plantons",
        vous: "plantez",
        ils: "plantent",
        elles: "plantent"
      }
    },
    cultiver: {
      infinitive: "cultiver",
      english: "to cultivate/grow",
      type: "regular-er",
      hint: "Regular -er verb for farming",
      present: {
        je: "cultive",
        tu: "cultives",
        il: "cultive",
        elle: "cultive",
        on: "cultive",
        nous: "cultivons",
        vous: "cultivez",
        ils: "cultivent",
        elles: "cultivent"
      }
    },
    arroser: {
      infinitive: "arroser",
      english: "to water",
      type: "regular-er",
      hint: "Regular -er verb for watering plants",
      present: {
        je: "arrose",
        tu: "arroses",
        il: "arrose",
        elle: "arrose",
        on: "arrose",
        nous: "arrosons",
        vous: "arrosez",
        ils: "arrosent",
        elles: "arrosent"
      }
    },
    recolter: {
      infinitive: "récolter",
      english: "to harvest",
      type: "regular-er",
      hint: "Regular -er verb for gathering crops",
      present: {
        je: "récolte",
        tu: "récoltes",
        il: "récolte",
        elle: "récolte",
        on: "récolte",
        nous: "récoltons",
        vous: "récoltez",
        ils: "récoltent",
        elles: "récoltent"
      }
    },
    travailler: {
      infinitive: "travailler",
      english: "to work",
      type: "regular-er",
      hint: "Regular -er verb for working",
      present: {
        je: "travaille",
        tu: "travailles",
        il: "travaille",
        elle: "travaille",
        on: "travaille",
        nous: "travaillons",
        vous: "travaillez",
        ils: "travaillent",
        elles: "travaillent"
      }
    },
    finir: {
      infinitive: "finir",
      english: "to finish",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "fini",
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
      },
      imparfait: {
        je: "finissais",
        tu: "finissais",
        il: "finissait",
        elle: "finissait",
        on: "finissait",
        nous: "finissions",
        vous: "finissiez",
        ils: "finissaient",
        elles: "finissaient"
      },
      futurSimple: {
        je: "finirai",
        tu: "finiras",
        il: "finira",
        elle: "finira",
        on: "finira",
        nous: "finirons",
        vous: "finirez",
        ils: "finiront",
        elles: "finiront"
      },
      conditionnel: {
        je: "finirais",
        tu: "finirais",
        il: "finirait",
        elle: "finirait",
        on: "finirait",
        nous: "finirions",
        vous: "finiriez",
        ils: "finiraient",
        elles: "finiraient"
      }
    },
    choisir: {
      infinitive: "choisir",
      english: "to choose",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "choisi",
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
      },
      imparfait: {
        je: "choisissais",
        tu: "choisissais",
        il: "choisissait",
        elle: "choisissait",
        on: "choisissait",
        nous: "choisissions",
        vous: "choisissiez",
        ils: "choisissaient",
        elles: "choisissaient"
      },
      futurSimple: {
        je: "choisirai",
        tu: "choisiras",
        il: "choisira",
        elle: "choisira",
        on: "choisira",
        nous: "choisirons",
        vous: "choisirez",
        ils: "choisiront",
        elles: "choisiront"
      },
      conditionnel: {
        je: "choisirais",
        tu: "choisirais",
        il: "choisirait",
        elle: "choisirait",
        on: "choisirait",
        nous: "choisirions",
        vous: "choisiriez",
        ils: "choisiraient",
        elles: "choisiraient"
      }
    },
    vendre: {
      infinitive: "vendre",
      english: "to sell",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "vendu",
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
      },
      imparfait: {
        je: "vendais",
        tu: "vendais",
        il: "vendait",
        elle: "vendait",
        on: "vendait",
        nous: "vendions",
        vous: "vendiez",
        ils: "vendaient",
        elles: "vendaient"
      },
      futurSimple: {
        je: "vendrai",
        tu: "vendras",
        il: "vendra",
        elle: "vendra",
        on: "vendra",
        nous: "vendrons",
        vous: "vendrez",
        ils: "vendront",
        elles: "vendront"
      },
      conditionnel: {
        je: "vendrais",
        tu: "vendrais",
        il: "vendrait",
        elle: "vendrait",
        on: "vendrait",
        nous: "vendrions",
        vous: "vendriez",
        ils: "vendraient",
        elles: "vendraient"
      }
    },
    // =====================================================
    // Additional Common Verbs
    // =====================================================
    mettre: {
      infinitive: "mettre",
      english: "to put/place",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "mis",
      hint: "Irregular -re verb. Also means 'to put on' (clothes)",
      present: {
        je: "mets",
        tu: "mets",
        il: "met",
        elle: "met",
        on: "met",
        nous: "mettons",
        vous: "mettez",
        ils: "mettent",
        elles: "mettent"
      },
      imparfait: {
        je: "mettais",
        tu: "mettais",
        il: "mettait",
        elle: "mettait",
        on: "mettait",
        nous: "mettions",
        vous: "mettiez",
        ils: "mettaient",
        elles: "mettaient"
      },
      futurSimple: {
        je: "mettrai",
        tu: "mettras",
        il: "mettra",
        elle: "mettra",
        on: "mettra",
        nous: "mettrons",
        vous: "mettrez",
        ils: "mettront",
        elles: "mettront"
      },
      conditionnel: {
        je: "mettrais",
        tu: "mettrais",
        il: "mettrait",
        elle: "mettrait",
        on: "mettrait",
        nous: "mettrions",
        vous: "mettriez",
        ils: "mettraient",
        elles: "mettraient"
      }
    },
    partir: {
      infinitive: "partir",
      english: "to leave/depart",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "parti",
      hint: "Irregular -ir verb. Uses être in passé composé",
      present: {
        je: "pars",
        tu: "pars",
        il: "part",
        elle: "part",
        on: "part",
        nous: "partons",
        vous: "partez",
        ils: "partent",
        elles: "partent"
      },
      imparfait: {
        je: "partais",
        tu: "partais",
        il: "partait",
        elle: "partait",
        on: "partait",
        nous: "partions",
        vous: "partiez",
        ils: "partaient",
        elles: "partaient"
      },
      futurSimple: {
        je: "partirai",
        tu: "partiras",
        il: "partira",
        elle: "partira",
        on: "partira",
        nous: "partirons",
        vous: "partirez",
        ils: "partiront",
        elles: "partiront"
      },
      conditionnel: {
        je: "partirais",
        tu: "partirais",
        il: "partirait",
        elle: "partirait",
        on: "partirait",
        nous: "partirions",
        vous: "partiriez",
        ils: "partiraient",
        elles: "partiraient"
      }
    },
    sortir: {
      infinitive: "sortir",
      english: "to go out/exit",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "sorti",
      hint: "Like partir. Uses être (intransitive) or avoir (transitive)",
      present: {
        je: "sors",
        tu: "sors",
        il: "sort",
        elle: "sort",
        on: "sort",
        nous: "sortons",
        vous: "sortez",
        ils: "sortent",
        elles: "sortent"
      },
      imparfait: {
        je: "sortais",
        tu: "sortais",
        il: "sortait",
        elle: "sortait",
        on: "sortait",
        nous: "sortions",
        vous: "sortiez",
        ils: "sortaient",
        elles: "sortaient"
      },
      futurSimple: {
        je: "sortirai",
        tu: "sortiras",
        il: "sortira",
        elle: "sortira",
        on: "sortira",
        nous: "sortirons",
        vous: "sortirez",
        ils: "sortiront",
        elles: "sortiront"
      },
      conditionnel: {
        je: "sortirais",
        tu: "sortirais",
        il: "sortirait",
        elle: "sortirait",
        on: "sortirait",
        nous: "sortirions",
        vous: "sortiriez",
        ils: "sortiraient",
        elles: "sortiraient"
      }
    },
    dormir: {
      infinitive: "dormir",
      english: "to sleep",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "dormi",
      hint: "Irregular -ir verb. Drops the 'm' in singular forms",
      present: {
        je: "dors",
        tu: "dors",
        il: "dort",
        elle: "dort",
        on: "dort",
        nous: "dormons",
        vous: "dormez",
        ils: "dorment",
        elles: "dorment"
      },
      imparfait: {
        je: "dormais",
        tu: "dormais",
        il: "dormait",
        elle: "dormait",
        on: "dormait",
        nous: "dormions",
        vous: "dormiez",
        ils: "dormaient",
        elles: "dormaient"
      },
      futurSimple: {
        je: "dormirai",
        tu: "dormiras",
        il: "dormira",
        elle: "dormira",
        on: "dormira",
        nous: "dormirons",
        vous: "dormirez",
        ils: "dormiront",
        elles: "dormiront"
      },
      conditionnel: {
        je: "dormirais",
        tu: "dormirais",
        il: "dormirait",
        elle: "dormirait",
        on: "dormirait",
        nous: "dormirions",
        vous: "dormiriez",
        ils: "dormiraient",
        elles: "dormiraient"
      }
    },
    lire: {
      infinitive: "lire",
      english: "to read",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "lu",
      hint: "Irregular -re verb with unique conjugation",
      present: {
        je: "lis",
        tu: "lis",
        il: "lit",
        elle: "lit",
        on: "lit",
        nous: "lisons",
        vous: "lisez",
        ils: "lisent",
        elles: "lisent"
      },
      imparfait: {
        je: "lisais",
        tu: "lisais",
        il: "lisait",
        elle: "lisait",
        on: "lisait",
        nous: "lisions",
        vous: "lisiez",
        ils: "lisaient",
        elles: "lisaient"
      },
      futurSimple: {
        je: "lirai",
        tu: "liras",
        il: "lira",
        elle: "lira",
        on: "lira",
        nous: "lirons",
        vous: "lirez",
        ils: "liront",
        elles: "liront"
      },
      conditionnel: {
        je: "lirais",
        tu: "lirais",
        il: "lirait",
        elle: "lirait",
        on: "lirait",
        nous: "lirions",
        vous: "liriez",
        ils: "liraient",
        elles: "liraient"
      }
    },
    ecrire: {
      infinitive: "écrire",
      english: "to write",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "écrit",
      hint: "Irregular -re verb. Note the 'v' in plural forms",
      present: {
        je: "écris",
        tu: "écris",
        il: "écrit",
        elle: "écrit",
        on: "écrit",
        nous: "écrivons",
        vous: "écrivez",
        ils: "écrivent",
        elles: "écrivent"
      },
      imparfait: {
        je: "écrivais",
        tu: "écrivais",
        il: "écrivait",
        elle: "écrivait",
        on: "écrivait",
        nous: "écrivions",
        vous: "écriviez",
        ils: "écrivaient",
        elles: "écrivaient"
      },
      futurSimple: {
        je: "écrirai",
        tu: "écriras",
        il: "écrira",
        elle: "écrira",
        on: "écrira",
        nous: "écrirons",
        vous: "écrirez",
        ils: "écriront",
        elles: "écriront"
      },
      conditionnel: {
        je: "écrirais",
        tu: "écrirais",
        il: "écrirait",
        elle: "écrirait",
        on: "écrirait",
        nous: "écririons",
        vous: "écririez",
        ils: "écriraient",
        elles: "écriraient"
      }
    },
    boire: {
      infinitive: "boire",
      english: "to drink",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "bu",
      hint: "Very irregular! Stem changes in plural forms",
      present: {
        je: "bois",
        tu: "bois",
        il: "boit",
        elle: "boit",
        on: "boit",
        nous: "buvons",
        vous: "buvez",
        ils: "boivent",
        elles: "boivent"
      },
      imparfait: {
        je: "buvais",
        tu: "buvais",
        il: "buvait",
        elle: "buvait",
        on: "buvait",
        nous: "buvions",
        vous: "buviez",
        ils: "buvaient",
        elles: "buvaient"
      },
      futurSimple: {
        je: "boirai",
        tu: "boiras",
        il: "boira",
        elle: "boira",
        on: "boira",
        nous: "boirons",
        vous: "boirez",
        ils: "boiront",
        elles: "boiront"
      },
      conditionnel: {
        je: "boirais",
        tu: "boirais",
        il: "boirait",
        elle: "boirait",
        on: "boirait",
        nous: "boirions",
        vous: "boiriez",
        ils: "boiraient",
        elles: "boiraient"
      }
    },
    acheter: {
      infinitive: "acheter",
      english: "to buy",
      type: "regular-er",
      hint: "Stem-changing -er verb. è in singular and 3rd plural",
      present: {
        je: "achète",
        tu: "achètes",
        il: "achète",
        elle: "achète",
        on: "achète",
        nous: "achetons",
        vous: "achetez",
        ils: "achètent",
        elles: "achètent"
      }
    },
    donner: {
      infinitive: "donner",
      english: "to give",
      type: "regular-er",
      hint: "Regular -er verb",
      present: {
        je: "donne",
        tu: "donnes",
        il: "donne",
        elle: "donne",
        on: "donne",
        nous: "donnons",
        vous: "donnez",
        ils: "donnent",
        elles: "donnent"
      }
    },
    recevoir: {
      infinitive: "recevoir",
      english: "to receive",
      type: "irregular",
      hint: "Irregular -oir verb. Stem changes: reç- / recev-",
      present: {
        je: "reçois",
        tu: "reçois",
        il: "reçoit",
        elle: "reçoit",
        on: "reçoit",
        nous: "recevons",
        vous: "recevez",
        ils: "reçoivent",
        elles: "reçoivent"
      }
    },
    ouvrir: {
      infinitive: "ouvrir",
      english: "to open",
      type: "irregular",
      hint: "Conjugates like -er verbs despite being -ir",
      present: {
        je: "ouvre",
        tu: "ouvres",
        il: "ouvre",
        elle: "ouvre",
        on: "ouvre",
        nous: "ouvrons",
        vous: "ouvrez",
        ils: "ouvrent",
        elles: "ouvrent"
      }
    },
    fermer: {
      infinitive: "fermer",
      english: "to close",
      type: "regular-er",
      hint: "Regular -er verb",
      present: {
        je: "ferme",
        tu: "fermes",
        il: "ferme",
        elle: "ferme",
        on: "ferme",
        nous: "fermons",
        vous: "fermez",
        ils: "ferment",
        elles: "ferment"
      }
    },
    croire: {
      infinitive: "croire",
      english: "to believe",
      type: "irregular",
      hint: "Irregular -re verb. Stem: croi- / croy-",
      present: {
        je: "crois",
        tu: "crois",
        il: "croit",
        elle: "croit",
        on: "croit",
        nous: "croyons",
        vous: "croyez",
        ils: "croient",
        elles: "croient"
      }
    },
    penser: {
      infinitive: "penser",
      english: "to think",
      type: "regular-er",
      hint: "Regular -er verb. Use 'penser à' (think about) or 'penser que' (think that)",
      present: {
        je: "pense",
        tu: "penses",
        il: "pense",
        elle: "pense",
        on: "pense",
        nous: "pensons",
        vous: "pensez",
        ils: "pensent",
        elles: "pensent"
      }
    },
    dire: {
      infinitive: "dire",
      english: "to say/tell",
      type: "irregular",
      hint: "Irregular. Note 'vous dites' (not 'disez')",
      present: {
        je: "dis",
        tu: "dis",
        il: "dit",
        elle: "dit",
        on: "dit",
        nous: "disons",
        vous: "dites",
        ils: "disent",
        elles: "disent"
      }
    },
    venir: {
      infinitive: "venir",
      english: "to come",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "venu",
      hint: "Irregular -ir. Uses être in passé composé. Stem: vien- / ven-",
      present: {
        je: "viens",
        tu: "viens",
        il: "vient",
        elle: "vient",
        on: "vient",
        nous: "venons",
        vous: "venez",
        ils: "viennent",
        elles: "viennent"
      },
      imparfait: {
        je: "venais",
        tu: "venais",
        il: "venait",
        elle: "venait",
        on: "venait",
        nous: "venions",
        vous: "veniez",
        ils: "venaient",
        elles: "venaient"
      },
      futurSimple: {
        je: "viendrai",
        tu: "viendras",
        il: "viendra",
        elle: "viendra",
        on: "viendra",
        nous: "viendrons",
        vous: "viendrez",
        ils: "viendront",
        elles: "viendront"
      },
      conditionnel: {
        je: "viendrais",
        tu: "viendrais",
        il: "viendrait",
        elle: "viendrait",
        on: "viendrait",
        nous: "viendrions",
        vous: "viendriez",
        ils: "viendraient",
        elles: "viendraient"
      }
    },
    prendre: {
      infinitive: "prendre",
      english: "to take",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "pris",
      hint: "Irregular -re verb. Stem: prend- / pren-",
      present: {
        je: "prends",
        tu: "prends",
        il: "prend",
        elle: "prend",
        on: "prend",
        nous: "prenons",
        vous: "prenez",
        ils: "prennent",
        elles: "prennent"
      },
      imparfait: {
        je: "prenais",
        tu: "prenais",
        il: "prenait",
        elle: "prenait",
        on: "prenait",
        nous: "prenions",
        vous: "preniez",
        ils: "prenaient",
        elles: "prenaient"
      },
      futurSimple: {
        je: "prendrai",
        tu: "prendras",
        il: "prendra",
        elle: "prendra",
        on: "prendra",
        nous: "prendrons",
        vous: "prendrez",
        ils: "prendront",
        elles: "prendront"
      },
      conditionnel: {
        je: "prendrais",
        tu: "prendrais",
        il: "prendrait",
        elle: "prendrait",
        on: "prendrait",
        nous: "prendrions",
        vous: "prendriez",
        ils: "prendraient",
        elles: "prendraient"
      }
    },
    voir: {
      infinitive: "voir",
      english: "to see",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "vu",
      hint: "Irregular -oir verb. Stem: voi- / voy-",
      present: {
        je: "vois",
        tu: "vois",
        il: "voit",
        elle: "voit",
        on: "voit",
        nous: "voyons",
        vous: "voyez",
        ils: "voient",
        elles: "voient"
      },
      imparfait: {
        je: "voyais",
        tu: "voyais",
        il: "voyait",
        elle: "voyait",
        on: "voyait",
        nous: "voyions",
        vous: "voyiez",
        ils: "voyaient",
        elles: "voyaient"
      },
      futurSimple: {
        je: "verrai",
        tu: "verras",
        il: "verra",
        elle: "verra",
        on: "verra",
        nous: "verrons",
        vous: "verrez",
        ils: "verront",
        elles: "verront"
      },
      conditionnel: {
        je: "verrais",
        tu: "verrais",
        il: "verrait",
        elle: "verrait",
        on: "verrait",
        nous: "verrions",
        vous: "verriez",
        ils: "verraient",
        elles: "verraient"
      }
    },
    pouvoir: {
      infinitive: "pouvoir",
      english: "can/to be able",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "pu",
      hint: "Very irregular modal verb. Stem: peu- / pouv- / puiss-",
      present: {
        je: "peux",
        tu: "peux",
        il: "peut",
        elle: "peut",
        on: "peut",
        nous: "pouvons",
        vous: "pouvez",
        ils: "peuvent",
        elles: "peuvent"
      },
      imparfait: {
        je: "pouvais",
        tu: "pouvais",
        il: "pouvait",
        elle: "pouvait",
        on: "pouvait",
        nous: "pouvions",
        vous: "pouviez",
        ils: "pouvaient",
        elles: "pouvaient"
      },
      futurSimple: {
        je: "pourrai",
        tu: "pourras",
        il: "pourra",
        elle: "pourra",
        on: "pourra",
        nous: "pourrons",
        vous: "pourrez",
        ils: "pourront",
        elles: "pourront"
      },
      conditionnel: {
        je: "pourrais",
        tu: "pourrais",
        il: "pourrait",
        elle: "pourrait",
        on: "pourrait",
        nous: "pourrions",
        vous: "pourriez",
        ils: "pourraient",
        elles: "pourraient"
      }
    },
    vouloir: {
      infinitive: "vouloir",
      english: "to want",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "voulu",
      hint: "Irregular modal verb. Stem: veu- / voul- / veuill-",
      present: {
        je: "veux",
        tu: "veux",
        il: "veut",
        elle: "veut",
        on: "veut",
        nous: "voulons",
        vous: "voulez",
        ils: "veulent",
        elles: "veulent"
      },
      imparfait: {
        je: "voulais",
        tu: "voulais",
        il: "voulait",
        elle: "voulait",
        on: "voulait",
        nous: "voulions",
        vous: "vouliez",
        ils: "voulaient",
        elles: "voulaient"
      },
      futurSimple: {
        je: "voudrai",
        tu: "voudras",
        il: "voudra",
        elle: "voudra",
        on: "voudra",
        nous: "voudrons",
        vous: "voudrez",
        ils: "voudront",
        elles: "voudront"
      },
      conditionnel: {
        je: "voudrais",
        tu: "voudrais",
        il: "voudrait",
        elle: "voudrait",
        on: "voudrait",
        nous: "voudrions",
        vous: "voudriez",
        ils: "voudraient",
        elles: "voudraient"
      }
    },
    devoir: {
      infinitive: "devoir",
      english: "must/to have to",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "dû",
      hint: "Irregular modal verb. Stem: doi- / dev-",
      present: {
        je: "dois",
        tu: "dois",
        il: "doit",
        elle: "doit",
        on: "doit",
        nous: "devons",
        vous: "devez",
        ils: "doivent",
        elles: "doivent"
      },
      imparfait: {
        je: "devais",
        tu: "devais",
        il: "devait",
        elle: "devait",
        on: "devait",
        nous: "devions",
        vous: "deviez",
        ils: "devaient",
        elles: "devaient"
      },
      futurSimple: {
        je: "devrai",
        tu: "devras",
        il: "devra",
        elle: "devra",
        on: "devra",
        nous: "devrons",
        vous: "devrez",
        ils: "devront",
        elles: "devront"
      },
      conditionnel: {
        je: "devrais",
        tu: "devrais",
        il: "devrait",
        elle: "devrait",
        on: "devrait",
        nous: "devrions",
        vous: "devriez",
        ils: "devraient",
        elles: "devraient"
      }
    },
    savoir: {
      infinitive: "savoir",
      english: "to know (facts)",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "su",
      hint: "Irregular. Know facts/how to. vs connaître (know people/places)",
      present: {
        je: "sais",
        tu: "sais",
        il: "sait",
        elle: "sait",
        on: "sait",
        nous: "savons",
        vous: "savez",
        ils: "savent",
        elles: "savent"
      },
      imparfait: {
        je: "savais",
        tu: "savais",
        il: "savait",
        elle: "savait",
        on: "savait",
        nous: "savions",
        vous: "saviez",
        ils: "savaient",
        elles: "savaient"
      },
      futurSimple: {
        je: "saurai",
        tu: "sauras",
        il: "saura",
        elle: "saura",
        on: "saura",
        nous: "saurons",
        vous: "saurez",
        ils: "sauront",
        elles: "sauront"
      },
      conditionnel: {
        je: "saurais",
        tu: "saurais",
        il: "saurait",
        elle: "saurait",
        on: "saurait",
        nous: "saurions",
        vous: "sauriez",
        ils: "sauraient",
        elles: "sauraient"
      }
    },
    connaitre: {
      infinitive: "connaître",
      english: "to know (people/places)",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "connu",
      hint: "Irregular. Know people/places. vs savoir (know facts)",
      present: {
        je: "connais",
        tu: "connais",
        il: "connaît",
        elle: "connaît",
        on: "connaît",
        nous: "connaissons",
        vous: "connaissez",
        ils: "connaissent",
        elles: "connaissent"
      },
      imparfait: {
        je: "connaissais",
        tu: "connaissais",
        il: "connaissait",
        elle: "connaissait",
        on: "connaissait",
        nous: "connaissions",
        vous: "connaissiez",
        ils: "connaissaient",
        elles: "connaissaient"
      },
      futurSimple: {
        je: "connaîtrai",
        tu: "connaîtras",
        il: "connaîtra",
        elle: "connaîtra",
        on: "connaîtra",
        nous: "connaîtrons",
        vous: "connaîtrez",
        ils: "connaîtront",
        elles: "connaîtront"
      },
      conditionnel: {
        je: "connaîtrais",
        tu: "connaîtrais",
        il: "connaîtrait",
        elle: "connaîtrait",
        on: "connaîtrait",
        nous: "connaîtrions",
        vous: "connaîtriez",
        ils: "connaîtraient",
        elles: "connaîtraient"
      }
    },
    attendre: {
      infinitive: "attendre",
      english: "to wait (for)",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "attendu",
      hint: "Regular -re verb. No preposition needed: 'J'attends le bus'",
      present: {
        je: "attends",
        tu: "attends",
        il: "attend",
        elle: "attend",
        on: "attend",
        nous: "attendons",
        vous: "attendez",
        ils: "attendent",
        elles: "attendent"
      }
    },
    // =====================================================
    // More Common Verbs
    // =====================================================
    aimer: {
      infinitive: "aimer",
      english: "to love/like",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "aimé",
      hint: "Regular -er verb. 'Aimer bien' = to like, 'aimer' alone often = to love",
      present: {
        je: "aime",
        tu: "aimes",
        il: "aime",
        elle: "aime",
        on: "aime",
        nous: "aimons",
        vous: "aimez",
        ils: "aiment",
        elles: "aiment"
      }
    },
    chercher: {
      infinitive: "chercher",
      english: "to look for/search",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "cherché",
      hint: "Regular -er verb. No preposition needed: 'Je cherche mes clés'",
      present: {
        je: "cherche",
        tu: "cherches",
        il: "cherche",
        elle: "cherche",
        on: "cherche",
        nous: "cherchons",
        vous: "cherchez",
        ils: "cherchent",
        elles: "cherchent"
      }
    },
    trouver: {
      infinitive: "trouver",
      english: "to find",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "trouvé",
      hint: "Regular -er verb. Also means 'to think/find' as in 'Je trouve ça intéressant'",
      present: {
        je: "trouve",
        tu: "trouves",
        il: "trouve",
        elle: "trouve",
        on: "trouve",
        nous: "trouvons",
        vous: "trouvez",
        ils: "trouvent",
        elles: "trouvent"
      }
    },
    demander: {
      infinitive: "demander",
      english: "to ask",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "demandé",
      hint: "Regular -er verb. 'Demander à quelqu'un' = to ask someone",
      present: {
        je: "demande",
        tu: "demandes",
        il: "demande",
        elle: "demande",
        on: "demande",
        nous: "demandons",
        vous: "demandez",
        ils: "demandent",
        elles: "demandent"
      }
    },
    montrer: {
      infinitive: "montrer",
      english: "to show",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "montré",
      hint: "Regular -er verb",
      present: {
        je: "montre",
        tu: "montres",
        il: "montre",
        elle: "montre",
        on: "montre",
        nous: "montrons",
        vous: "montrez",
        ils: "montrent",
        elles: "montrent"
      }
    },
    porter: {
      infinitive: "porter",
      english: "to carry/wear",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "porté",
      hint: "Regular -er verb. Means both 'to carry' and 'to wear (clothes)'",
      present: {
        je: "porte",
        tu: "portes",
        il: "porte",
        elle: "porte",
        on: "porte",
        nous: "portons",
        vous: "portez",
        ils: "portent",
        elles: "portent"
      }
    },
    jouer: {
      infinitive: "jouer",
      english: "to play",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "joué",
      hint: "Regular -er verb. 'Jouer à' = play a game/sport, 'jouer de' = play an instrument",
      present: {
        je: "joue",
        tu: "joues",
        il: "joue",
        elle: "joue",
        on: "joue",
        nous: "jouons",
        vous: "jouez",
        ils: "jouent",
        elles: "jouent"
      }
    },
    ecouter: {
      infinitive: "écouter",
      english: "to listen (to)",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "écouté",
      hint: "Regular -er verb. No preposition needed: 'J'écoute la musique'",
      present: {
        je: "écoute",
        tu: "écoutes",
        il: "écoute",
        elle: "écoute",
        on: "écoute",
        nous: "écoutons",
        vous: "écoutez",
        ils: "écoutent",
        elles: "écoutent"
      }
    },
    regarder: {
      infinitive: "regarder",
      english: "to watch/look at",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "regardé",
      hint: "Regular -er verb. No preposition needed: 'Je regarde la télé'",
      present: {
        je: "regarde",
        tu: "regardes",
        il: "regarde",
        elle: "regarde",
        on: "regarde",
        nous: "regardons",
        vous: "regardez",
        ils: "regardent",
        elles: "regardent"
      }
    },
    entrer: {
      infinitive: "entrer",
      english: "to enter",
      type: "regular-er",
      auxiliary: "être",
      pastParticiple: "entré",
      hint: "Regular -er verb. Uses être in passé composé",
      present: {
        je: "entre",
        tu: "entres",
        il: "entre",
        elle: "entre",
        on: "entre",
        nous: "entrons",
        vous: "entrez",
        ils: "entrent",
        elles: "entrent"
      }
    },
    rester: {
      infinitive: "rester",
      english: "to stay/remain",
      type: "regular-er",
      auxiliary: "être",
      pastParticiple: "resté",
      hint: "Regular -er verb. Uses être in passé composé",
      present: {
        je: "reste",
        tu: "restes",
        il: "reste",
        elle: "reste",
        on: "reste",
        nous: "restons",
        vous: "restez",
        ils: "restent",
        elles: "restent"
      }
    },
    tomber: {
      infinitive: "tomber",
      english: "to fall",
      type: "regular-er",
      auxiliary: "être",
      pastParticiple: "tombé",
      hint: "Regular -er verb. Uses être in passé composé",
      present: {
        je: "tombe",
        tu: "tombes",
        il: "tombe",
        elle: "tombe",
        on: "tombe",
        nous: "tombons",
        vous: "tombez",
        ils: "tombent",
        elles: "tombent"
      }
    },
    arriver: {
      infinitive: "arriver",
      english: "to arrive/happen",
      type: "regular-er",
      auxiliary: "être",
      pastParticiple: "arrivé",
      hint: "Regular -er verb. Uses être in passé composé. Also means 'to happen'",
      present: {
        je: "arrive",
        tu: "arrives",
        il: "arrive",
        elle: "arrive",
        on: "arrive",
        nous: "arrivons",
        vous: "arrivez",
        ils: "arrivent",
        elles: "arrivent"
      }
    },
    passer: {
      infinitive: "passer",
      english: "to pass/spend (time)",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "passé",
      hint: "Regular -er verb. Uses être (movement) or avoir (transitive)",
      present: {
        je: "passe",
        tu: "passes",
        il: "passe",
        elle: "passe",
        on: "passe",
        nous: "passons",
        vous: "passez",
        ils: "passent",
        elles: "passent"
      }
    },
    commencer: {
      infinitive: "commencer",
      english: "to begin/start",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "commencé",
      hint: "Spelling change: 'nous commençons' - ç before a/o",
      present: {
        je: "commence",
        tu: "commences",
        il: "commence",
        elle: "commence",
        on: "commence",
        nous: "commençons",
        vous: "commencez",
        ils: "commencent",
        elles: "commencent"
      }
    },
    appeler: {
      infinitive: "appeler",
      english: "to call",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "appelé",
      hint: "Spelling change: doubles 'l' in some forms. 'Je m'appelle' = My name is",
      present: {
        je: "appelle",
        tu: "appelles",
        il: "appelle",
        elle: "appelle",
        on: "appelle",
        nous: "appelons",
        vous: "appelez",
        ils: "appellent",
        elles: "appellent"
      }
    },
    jeter: {
      infinitive: "jeter",
      english: "to throw",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "jeté",
      hint: "Spelling change: doubles 't' in some forms",
      present: {
        je: "jette",
        tu: "jettes",
        il: "jette",
        elle: "jette",
        on: "jette",
        nous: "jetons",
        vous: "jetez",
        ils: "jettent",
        elles: "jettent"
      }
    },
    lever: {
      infinitive: "lever",
      english: "to raise/lift",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "levé",
      hint: "Stem-changing: e→è. 'Se lever' = to get up",
      present: {
        je: "lève",
        tu: "lèves",
        il: "lève",
        elle: "lève",
        on: "lève",
        nous: "levons",
        vous: "levez",
        ils: "lèvent",
        elles: "lèvent"
      }
    },
    preferer: {
      infinitive: "préférer",
      english: "to prefer",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "préféré",
      hint: "Stem-changing: é→è in stressed syllables",
      present: {
        je: "préfère",
        tu: "préfères",
        il: "préfère",
        elle: "préfère",
        on: "préfère",
        nous: "préférons",
        vous: "préférez",
        ils: "préfèrent",
        elles: "préfèrent"
      }
    },
    esperer: {
      infinitive: "espérer",
      english: "to hope",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "espéré",
      hint: "Stem-changing like préférer: é→è",
      present: {
        je: "espère",
        tu: "espères",
        il: "espère",
        elle: "espère",
        on: "espère",
        nous: "espérons",
        vous: "espérez",
        ils: "espèrent",
        elles: "espèrent"
      }
    },
    repeter: {
      infinitive: "répéter",
      english: "to repeat",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "répété",
      hint: "Stem-changing like préférer: é→è",
      present: {
        je: "répète",
        tu: "répètes",
        il: "répète",
        elle: "répète",
        on: "répète",
        nous: "répétons",
        vous: "répétez",
        ils: "répètent",
        elles: "répètent"
      }
    },
    envoyer: {
      infinitive: "envoyer",
      english: "to send",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "envoyé",
      hint: "Irregular: y→i in singular and 3rd plural. Irregular future: enverr-",
      present: {
        je: "envoie",
        tu: "envoies",
        il: "envoie",
        elle: "envoie",
        on: "envoie",
        nous: "envoyons",
        vous: "envoyez",
        ils: "envoient",
        elles: "envoient"
      }
    },
    payer: {
      infinitive: "payer",
      english: "to pay",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "payé",
      hint: "Can keep 'y' or change to 'i': je paie/paye",
      present: {
        je: "paie",
        tu: "paies",
        il: "paie",
        elle: "paie",
        on: "paie",
        nous: "payons",
        vous: "payez",
        ils: "paient",
        elles: "paient"
      }
    },
    essayer: {
      infinitive: "essayer",
      english: "to try",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "essayé",
      hint: "Like payer: can keep 'y' or change to 'i'",
      present: {
        je: "essaie",
        tu: "essaies",
        il: "essaie",
        elle: "essaie",
        on: "essaie",
        nous: "essayons",
        vous: "essayez",
        ils: "essaient",
        elles: "essaient"
      }
    },
    nettoyer: {
      infinitive: "nettoyer",
      english: "to clean",
      type: "regular-er",
      auxiliary: "avoir",
      pastParticiple: "nettoyé",
      hint: "y→i before silent e: je nettoie",
      present: {
        je: "nettoie",
        tu: "nettoies",
        il: "nettoie",
        elle: "nettoie",
        on: "nettoie",
        nous: "nettoyons",
        vous: "nettoyez",
        ils: "nettoient",
        elles: "nettoient"
      }
    },
    // More -ir verbs (regular pattern like finir)
    grandir: {
      infinitive: "grandir",
      english: "to grow (up)",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "grandi",
      hint: "Regular -ir verb like finir",
      present: {
        je: "grandis",
        tu: "grandis",
        il: "grandit",
        elle: "grandit",
        on: "grandit",
        nous: "grandissons",
        vous: "grandissez",
        ils: "grandissent",
        elles: "grandissent"
      }
    },
    reussir: {
      infinitive: "réussir",
      english: "to succeed",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "réussi",
      hint: "Regular -ir verb. 'Réussir à' + infinitive = to succeed in doing",
      present: {
        je: "réussis",
        tu: "réussis",
        il: "réussit",
        elle: "réussit",
        on: "réussit",
        nous: "réussissons",
        vous: "réussissez",
        ils: "réussissent",
        elles: "réussissent"
      }
    },
    remplir: {
      infinitive: "remplir",
      english: "to fill",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "rempli",
      hint: "Regular -ir verb like finir",
      present: {
        je: "remplis",
        tu: "remplis",
        il: "remplit",
        elle: "remplit",
        on: "remplit",
        nous: "remplissons",
        vous: "remplissez",
        ils: "remplissent",
        elles: "remplissent"
      }
    },
    reflechir: {
      infinitive: "réfléchir",
      english: "to think/reflect",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "réfléchi",
      hint: "Regular -ir verb. 'Réfléchir à' = to think about",
      present: {
        je: "réfléchis",
        tu: "réfléchis",
        il: "réfléchit",
        elle: "réfléchit",
        on: "réfléchit",
        nous: "réfléchissons",
        vous: "réfléchissez",
        ils: "réfléchissent",
        elles: "réfléchissent"
      }
    },
    obeir: {
      infinitive: "obéir",
      english: "to obey",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "obéi",
      hint: "Regular -ir verb. 'Obéir à' = to obey someone",
      present: {
        je: "obéis",
        tu: "obéis",
        il: "obéit",
        elle: "obéit",
        on: "obéit",
        nous: "obéissons",
        vous: "obéissez",
        ils: "obéissent",
        elles: "obéissent"
      }
    },
    punir: {
      infinitive: "punir",
      english: "to punish",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "puni",
      hint: "Regular -ir verb like finir",
      present: {
        je: "punis",
        tu: "punis",
        il: "punit",
        elle: "punit",
        on: "punit",
        nous: "punissons",
        vous: "punissez",
        ils: "punissent",
        elles: "punissent"
      }
    },
    guerir: {
      infinitive: "guérir",
      english: "to heal/cure",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "guéri",
      hint: "Regular -ir verb like finir",
      present: {
        je: "guéris",
        tu: "guéris",
        il: "guérit",
        elle: "guérit",
        on: "guérit",
        nous: "guérissons",
        vous: "guérissez",
        ils: "guérissent",
        elles: "guérissent"
      }
    },
    batir: {
      infinitive: "bâtir",
      english: "to build",
      type: "regular-ir",
      auxiliary: "avoir",
      pastParticiple: "bâti",
      hint: "Regular -ir verb like finir",
      present: {
        je: "bâtis",
        tu: "bâtis",
        il: "bâtit",
        elle: "bâtit",
        on: "bâtit",
        nous: "bâtissons",
        vous: "bâtissez",
        ils: "bâtissent",
        elles: "bâtissent"
      }
    },
    // More -re verbs
    perdre: {
      infinitive: "perdre",
      english: "to lose",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "perdu",
      hint: "Regular -re verb like vendre",
      present: {
        je: "perds",
        tu: "perds",
        il: "perd",
        elle: "perd",
        on: "perd",
        nous: "perdons",
        vous: "perdez",
        ils: "perdent",
        elles: "perdent"
      }
    },
    repondre: {
      infinitive: "répondre",
      english: "to answer/respond",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "répondu",
      hint: "Regular -re verb. 'Répondre à' = to answer someone/something",
      present: {
        je: "réponds",
        tu: "réponds",
        il: "répond",
        elle: "répond",
        on: "répond",
        nous: "répondons",
        vous: "répondez",
        ils: "répondent",
        elles: "répondent"
      }
    },
    entendre: {
      infinitive: "entendre",
      english: "to hear",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "entendu",
      hint: "Regular -re verb like vendre",
      present: {
        je: "entends",
        tu: "entends",
        il: "entend",
        elle: "entend",
        on: "entend",
        nous: "entendons",
        vous: "entendez",
        ils: "entendent",
        elles: "entendent"
      }
    },
    descendre: {
      infinitive: "descendre",
      english: "to go down/descend",
      type: "regular-re",
      auxiliary: "être",
      pastParticiple: "descendu",
      hint: "Regular -re verb. Uses être (intransitive) or avoir (transitive)",
      present: {
        je: "descends",
        tu: "descends",
        il: "descend",
        elle: "descend",
        on: "descend",
        nous: "descendons",
        vous: "descendez",
        ils: "descendent",
        elles: "descendent"
      }
    },
    rendre: {
      infinitive: "rendre",
      english: "to return/give back",
      type: "regular-re",
      auxiliary: "avoir",
      pastParticiple: "rendu",
      hint: "Regular -re verb. Also used in 'se rendre compte' = to realize",
      present: {
        je: "rends",
        tu: "rends",
        il: "rend",
        elle: "rend",
        on: "rend",
        nous: "rendons",
        vous: "rendez",
        ils: "rendent",
        elles: "rendent"
      }
    },
    // More irregular verbs
    mourir: {
      infinitive: "mourir",
      english: "to die",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "mort",
      hint: "Irregular -ir verb. Uses être in passé composé",
      present: {
        je: "meurs",
        tu: "meurs",
        il: "meurt",
        elle: "meurt",
        on: "meurt",
        nous: "mourons",
        vous: "mourez",
        ils: "meurent",
        elles: "meurent"
      }
    },
    naitre: {
      infinitive: "naître",
      english: "to be born",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "né",
      hint: "Irregular. Uses être in passé composé",
      present: {
        je: "nais",
        tu: "nais",
        il: "naît",
        elle: "naît",
        on: "naît",
        nous: "naissons",
        vous: "naissez",
        ils: "naissent",
        elles: "naissent"
      }
    },
    vivre: {
      infinitive: "vivre",
      english: "to live",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "vécu",
      hint: "Irregular -re verb",
      present: {
        je: "vis",
        tu: "vis",
        il: "vit",
        elle: "vit",
        on: "vit",
        nous: "vivons",
        vous: "vivez",
        ils: "vivent",
        elles: "vivent"
      }
    },
    suivre: {
      infinitive: "suivre",
      english: "to follow",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "suivi",
      hint: "Irregular -re verb",
      present: {
        je: "suis",
        tu: "suis",
        il: "suit",
        elle: "suit",
        on: "suit",
        nous: "suivons",
        vous: "suivez",
        ils: "suivent",
        elles: "suivent"
      }
    },
    courir: {
      infinitive: "courir",
      english: "to run",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "couru",
      hint: "Irregular -ir verb. Note: one 'r' in present, two in future",
      present: {
        je: "cours",
        tu: "cours",
        il: "court",
        elle: "court",
        on: "court",
        nous: "courons",
        vous: "courez",
        ils: "courent",
        elles: "courent"
      }
    },
    tenir: {
      infinitive: "tenir",
      english: "to hold",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "tenu",
      hint: "Irregular like venir. 'Tenir à' = to care about",
      present: {
        je: "tiens",
        tu: "tiens",
        il: "tient",
        elle: "tient",
        on: "tient",
        nous: "tenons",
        vous: "tenez",
        ils: "tiennent",
        elles: "tiennent"
      }
    },
    offrir: {
      infinitive: "offrir",
      english: "to offer/give (as gift)",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "offert",
      hint: "Conjugates like -er verbs despite being -ir",
      present: {
        je: "offre",
        tu: "offres",
        il: "offre",
        elle: "offre",
        on: "offre",
        nous: "offrons",
        vous: "offrez",
        ils: "offrent",
        elles: "offrent"
      }
    },
    souffrir: {
      infinitive: "souffrir",
      english: "to suffer",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "souffert",
      hint: "Conjugates like offrir (-er pattern)",
      present: {
        je: "souffre",
        tu: "souffres",
        il: "souffre",
        elle: "souffre",
        on: "souffre",
        nous: "souffrons",
        vous: "souffrez",
        ils: "souffrent",
        elles: "souffrent"
      }
    },
    couvrir: {
      infinitive: "couvrir",
      english: "to cover",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "couvert",
      hint: "Conjugates like ouvrir (-er pattern)",
      present: {
        je: "couvre",
        tu: "couvres",
        il: "couvre",
        elle: "couvre",
        on: "couvre",
        nous: "couvrons",
        vous: "couvrez",
        ils: "couvrent",
        elles: "couvrent"
      }
    },
    decouvrir: {
      infinitive: "découvrir",
      english: "to discover",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "découvert",
      hint: "Conjugates like ouvrir/couvrir",
      present: {
        je: "découvre",
        tu: "découvres",
        il: "découvre",
        elle: "découvre",
        on: "découvre",
        nous: "découvrons",
        vous: "découvrez",
        ils: "découvrent",
        elles: "découvrent"
      }
    },
    cueillir: {
      infinitive: "cueillir",
      english: "to pick/gather",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "cueilli",
      hint: "Conjugates like -er verbs. Used for flowers, fruit",
      present: {
        je: "cueille",
        tu: "cueilles",
        il: "cueille",
        elle: "cueille",
        on: "cueille",
        nous: "cueillons",
        vous: "cueillez",
        ils: "cueillent",
        elles: "cueillent"
      }
    },
    fuir: {
      infinitive: "fuir",
      english: "to flee",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "fui",
      hint: "Irregular -ir verb",
      present: {
        je: "fuis",
        tu: "fuis",
        il: "fuit",
        elle: "fuit",
        on: "fuit",
        nous: "fuyons",
        vous: "fuyez",
        ils: "fuient",
        elles: "fuient"
      }
    },
    conduire: {
      infinitive: "conduire",
      english: "to drive",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "conduit",
      hint: "Irregular -re verb. Stem: condui-/conduis-",
      present: {
        je: "conduis",
        tu: "conduis",
        il: "conduit",
        elle: "conduit",
        on: "conduit",
        nous: "conduisons",
        vous: "conduisez",
        ils: "conduisent",
        elles: "conduisent"
      }
    },
    produire: {
      infinitive: "produire",
      english: "to produce",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "produit",
      hint: "Like conduire",
      present: {
        je: "produis",
        tu: "produis",
        il: "produit",
        elle: "produit",
        on: "produit",
        nous: "produisons",
        vous: "produisez",
        ils: "produisent",
        elles: "produisent"
      }
    },
    traduire: {
      infinitive: "traduire",
      english: "to translate",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "traduit",
      hint: "Like conduire/produire",
      present: {
        je: "traduis",
        tu: "traduis",
        il: "traduit",
        elle: "traduit",
        on: "traduit",
        nous: "traduisons",
        vous: "traduisez",
        ils: "traduisent",
        elles: "traduisent"
      }
    },
    detruire: {
      infinitive: "détruire",
      english: "to destroy",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "détruit",
      hint: "Like conduire",
      present: {
        je: "détruis",
        tu: "détruis",
        il: "détruit",
        elle: "détruit",
        on: "détruit",
        nous: "détruisons",
        vous: "détruisez",
        ils: "détruisent",
        elles: "détruisent"
      }
    },
    construire: {
      infinitive: "construire",
      english: "to build/construct",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "construit",
      hint: "Like conduire",
      present: {
        je: "construis",
        tu: "construis",
        il: "construit",
        elle: "construit",
        on: "construit",
        nous: "construisons",
        vous: "construisez",
        ils: "construisent",
        elles: "construisent"
      }
    },
    plaire: {
      infinitive: "plaire",
      english: "to please",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "plu",
      hint: "Irregular. 'Ça me plaît' = I like it (lit: it pleases me)",
      present: {
        je: "plais",
        tu: "plais",
        il: "plaît",
        elle: "plaît",
        on: "plaît",
        nous: "plaisons",
        vous: "plaisez",
        ils: "plaisent",
        elles: "plaisent"
      }
    },
    taire: {
      infinitive: "se taire",
      english: "to be quiet",
      type: "irregular",
      auxiliary: "être",
      pastParticiple: "tu",
      hint: "Like plaire. Usually reflexive: 'Tais-toi!' = Be quiet!",
      present: {
        je: "tais",
        tu: "tais",
        il: "tait",
        elle: "tait",
        on: "tait",
        nous: "taisons",
        vous: "taisez",
        ils: "taisent",
        elles: "taisent"
      }
    },
    rire: {
      infinitive: "rire",
      english: "to laugh",
      type: "irregular",
      auxiliary: "avoir",
      pastParticiple: "ri",
      hint: "Irregular -re verb",
      present: {
        je: "ris",
        tu: "ris",
        il: "rit",
        elle: "rit",
        on: "rit",
        nous: "rions",
        vous: "riez",
        ils: "rient",
        elles: "rient"
      }
    },
    sourire: {
      infinitive: "sourire",
      english: "to smile",
      type: "irregular",
      hint: "Like rire",
      present: {
        je: "souris",
        tu: "souris",
        il: "sourit",
        elle: "sourit",
        on: "sourit",
        nous: "sourions",
        vous: "souriez",
        ils: "sourient",
        elles: "sourient"
      }
    },
    conclure: {
      infinitive: "conclure",
      english: "to conclude",
      type: "irregular",
      hint: "Irregular -re verb",
      present: {
        je: "conclus",
        tu: "conclus",
        il: "conclut",
        elle: "conclut",
        on: "conclut",
        nous: "concluons",
        vous: "concluez",
        ils: "concluent",
        elles: "concluent"
      }
    },
    resoudre: {
      infinitive: "résoudre",
      english: "to solve/resolve",
      type: "irregular",
      hint: "Irregular -re verb. Note the stem changes",
      present: {
        je: "résous",
        tu: "résous",
        il: "résout",
        elle: "résout",
        on: "résout",
        nous: "résolvons",
        vous: "résolvez",
        ils: "résolvent",
        elles: "résolvent"
      }
    },
    craindre: {
      infinitive: "craindre",
      english: "to fear",
      type: "irregular",
      hint: "Irregular -re verb. Stem: crain-/craign-",
      present: {
        je: "crains",
        tu: "crains",
        il: "craint",
        elle: "craint",
        on: "craint",
        nous: "craignons",
        vous: "craignez",
        ils: "craignent",
        elles: "craignent"
      }
    },
    peindre: {
      infinitive: "peindre",
      english: "to paint",
      type: "irregular",
      hint: "Like craindre",
      present: {
        je: "peins",
        tu: "peins",
        il: "peint",
        elle: "peint",
        on: "peint",
        nous: "peignons",
        vous: "peignez",
        ils: "peignent",
        elles: "peignent"
      }
    },
    joindre: {
      infinitive: "joindre",
      english: "to join",
      type: "irregular",
      hint: "Like craindre/peindre",
      present: {
        je: "joins",
        tu: "joins",
        il: "joint",
        elle: "joint",
        on: "joint",
        nous: "joignons",
        vous: "joignez",
        ils: "joignent",
        elles: "joignent"
      }
    },
    eteindre: {
      infinitive: "éteindre",
      english: "to turn off/extinguish",
      type: "irregular",
      hint: "Like peindre",
      present: {
        je: "éteins",
        tu: "éteins",
        il: "éteint",
        elle: "éteint",
        on: "éteint",
        nous: "éteignons",
        vous: "éteignez",
        ils: "éteignent",
        elles: "éteignent"
      }
    },
    atteindre: {
      infinitive: "atteindre",
      english: "to reach/attain",
      type: "irregular",
      hint: "Like peindre/éteindre",
      present: {
        je: "atteins",
        tu: "atteins",
        il: "atteint",
        elle: "atteint",
        on: "atteint",
        nous: "atteignons",
        vous: "atteignez",
        ils: "atteignent",
        elles: "atteignent"
      }
    },
    vaincre: {
      infinitive: "vaincre",
      english: "to defeat/conquer",
      type: "irregular",
      hint: "Irregular. Note: no 't' in 3rd person singular",
      present: {
        je: "vaincs",
        tu: "vaincs",
        il: "vainc",
        elle: "vainc",
        on: "vainc",
        nous: "vainquons",
        vous: "vainquez",
        ils: "vainquent",
        elles: "vainquent"
      }
    },
    convaincre: {
      infinitive: "convaincre",
      english: "to convince",
      type: "irregular",
      hint: "Like vaincre",
      present: {
        je: "convaincs",
        tu: "convaincs",
        il: "convainc",
        elle: "convainc",
        on: "convainc",
        nous: "convainquons",
        vous: "convainquez",
        ils: "convainquent",
        elles: "convainquent"
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
    },
    faire_present: {
      topic: "faire - Present Tense",
      spellbookRef: "faire",
      questions: [
        {
          sentence: "Je ___ mes devoirs.",
          answer: "fais",
          options: ["fais", "fait", "faisons", "font"],
          translation: "I do my homework.",
          hint: "First person singular of faire"
        },
        {
          sentence: "Qu'est-ce que tu ___?",
          answer: "fais",
          options: ["fais", "fait", "faites", "font"],
          translation: "What are you doing?",
          hint: "Second person singular of faire"
        },
        {
          sentence: "Il ___ beau aujourd'hui.",
          answer: "fait",
          options: ["fais", "fait", "faisons", "font"],
          translation: "The weather is nice today.",
          hint: "Third person singular - weather expressions"
        },
        {
          sentence: "Nous ___ du sport.",
          answer: "faisons",
          options: ["fais", "fait", "faisons", "faites"],
          translation: "We play sports.",
          hint: "First person plural of faire"
        },
        {
          sentence: "Vous ___ la cuisine?",
          answer: "faites",
          options: ["faisons", "faites", "font", "fais"],
          translation: "Are you cooking?",
          hint: "Second person plural/formal of faire"
        },
        {
          sentence: "Ils ___ du bruit.",
          answer: "font",
          options: ["fais", "fait", "faites", "font"],
          translation: "They are making noise.",
          hint: "Third person plural of faire"
        },
        {
          sentence: "Elle ___ un gâteau.",
          answer: "fait",
          options: ["fais", "fait", "faisons", "font"],
          translation: "She is making a cake.",
          hint: "Third person singular of faire"
        },
        {
          sentence: "Les enfants ___ leurs lits.",
          answer: "font",
          options: ["fait", "faisons", "faites", "font"],
          translation: "The children make their beds.",
          hint: "Les enfants = they (third person plural)"
        }
      ]
    },
    venir_present: {
      topic: "venir - Present Tense",
      spellbookRef: "venir",
      questions: [
        {
          sentence: "Je ___ de France.",
          answer: "viens",
          options: ["viens", "vient", "venons", "viennent"],
          translation: "I come from France.",
          hint: "First person singular of venir"
        },
        {
          sentence: "Tu ___ avec nous?",
          answer: "viens",
          options: ["viens", "vient", "venez", "viennent"],
          translation: "Are you coming with us?",
          hint: "Second person singular of venir"
        },
        {
          sentence: "Elle ___ de manger.",
          answer: "vient",
          options: ["viens", "vient", "venons", "viennent"],
          translation: "She just ate. (She comes from eating)",
          hint: "Third person singular - recent past"
        },
        {
          sentence: "Nous ___ vous voir.",
          answer: "venons",
          options: ["viens", "venons", "venez", "viennent"],
          translation: "We are coming to see you.",
          hint: "First person plural of venir"
        },
        {
          sentence: "D'où ___-vous?",
          answer: "venez",
          options: ["venons", "venez", "viennent", "viens"],
          translation: "Where do you come from?",
          hint: "Second person plural/formal of venir"
        },
        {
          sentence: "Ils ___ demain.",
          answer: "viennent",
          options: ["viens", "vient", "venez", "viennent"],
          translation: "They are coming tomorrow.",
          hint: "Third person plural of venir"
        }
      ]
    },
    prendre_present: {
      topic: "prendre - Present Tense",
      spellbookRef: "prendre",
      questions: [
        {
          sentence: "Je ___ le bus.",
          answer: "prends",
          options: ["prends", "prend", "prenons", "prennent"],
          translation: "I take the bus.",
          hint: "First person singular of prendre"
        },
        {
          sentence: "Tu ___ un café?",
          answer: "prends",
          options: ["prends", "prend", "prenez", "prennent"],
          translation: "Are you having a coffee?",
          hint: "Second person singular of prendre"
        },
        {
          sentence: "Il ___ son temps.",
          answer: "prend",
          options: ["prends", "prend", "prenons", "prennent"],
          translation: "He takes his time.",
          hint: "Third person singular of prendre"
        },
        {
          sentence: "Nous ___ le petit-déjeuner.",
          answer: "prenons",
          options: ["prends", "prenons", "prenez", "prennent"],
          translation: "We are having breakfast.",
          hint: "First person plural of prendre"
        },
        {
          sentence: "Vous ___ quelle direction?",
          answer: "prenez",
          options: ["prenons", "prenez", "prennent", "prends"],
          translation: "Which direction are you taking?",
          hint: "Second person plural/formal of prendre"
        },
        {
          sentence: "Elles ___ des photos.",
          answer: "prennent",
          options: ["prends", "prend", "prenez", "prennent"],
          translation: "They are taking photos.",
          hint: "Third person plural of prendre"
        }
      ]
    },
    vouloir_present: {
      topic: "vouloir - Present Tense",
      spellbookRef: "vouloir",
      questions: [
        {
          sentence: "Je ___ un croissant.",
          answer: "veux",
          options: ["veux", "veut", "voulons", "veulent"],
          translation: "I want a croissant.",
          hint: "First person singular of vouloir"
        },
        {
          sentence: "Tu ___ venir?",
          answer: "veux",
          options: ["veux", "veut", "voulez", "veulent"],
          translation: "Do you want to come?",
          hint: "Second person singular of vouloir"
        },
        {
          sentence: "Elle ___ partir.",
          answer: "veut",
          options: ["veux", "veut", "voulons", "veulent"],
          translation: "She wants to leave.",
          hint: "Third person singular of vouloir"
        },
        {
          sentence: "Nous ___ vous aider.",
          answer: "voulons",
          options: ["veux", "voulons", "voulez", "veulent"],
          translation: "We want to help you.",
          hint: "First person plural of vouloir"
        },
        {
          sentence: "___-vous du thé?",
          answer: "Voulez",
          options: ["Voulons", "Voulez", "Veulent", "Veux"],
          translation: "Do you want some tea?",
          hint: "Second person plural/formal of vouloir"
        },
        {
          sentence: "Ils ___ jouer.",
          answer: "veulent",
          options: ["veux", "veut", "voulez", "veulent"],
          translation: "They want to play.",
          hint: "Third person plural of vouloir"
        }
      ]
    },
    pouvoir_present: {
      topic: "pouvoir - Present Tense",
      spellbookRef: "pouvoir",
      questions: [
        {
          sentence: "Je ___ vous aider.",
          answer: "peux",
          options: ["peux", "peut", "pouvons", "peuvent"],
          translation: "I can help you.",
          hint: "First person singular of pouvoir"
        },
        {
          sentence: "Tu ___ répéter?",
          answer: "peux",
          options: ["peux", "peut", "pouvez", "peuvent"],
          translation: "Can you repeat?",
          hint: "Second person singular of pouvoir"
        },
        {
          sentence: "On ___ partir maintenant.",
          answer: "peut",
          options: ["peux", "peut", "pouvons", "peuvent"],
          translation: "We can leave now.",
          hint: "Third person singular of pouvoir (on)"
        },
        {
          sentence: "Nous ___ comprendre.",
          answer: "pouvons",
          options: ["peux", "pouvons", "pouvez", "peuvent"],
          translation: "We can understand.",
          hint: "First person plural of pouvoir"
        },
        {
          sentence: "___-vous m'expliquer?",
          answer: "Pouvez",
          options: ["Pouvons", "Pouvez", "Peuvent", "Peux"],
          translation: "Can you explain to me?",
          hint: "Second person plural/formal of pouvoir"
        },
        {
          sentence: "Ils ne ___ pas venir.",
          answer: "peuvent",
          options: ["peux", "peut", "pouvez", "peuvent"],
          translation: "They cannot come.",
          hint: "Third person plural of pouvoir"
        }
      ]
    },
    devoir_present: {
      topic: "devoir - Present Tense",
      spellbookRef: "devoir",
      questions: [
        {
          sentence: "Je ___ partir.",
          answer: "dois",
          options: ["dois", "doit", "devons", "doivent"],
          translation: "I must leave.",
          hint: "First person singular of devoir"
        },
        {
          sentence: "Tu ___ étudier.",
          answer: "dois",
          options: ["dois", "doit", "devez", "doivent"],
          translation: "You must study.",
          hint: "Second person singular of devoir"
        },
        {
          sentence: "Elle ___ travailler demain.",
          answer: "doit",
          options: ["dois", "doit", "devons", "doivent"],
          translation: "She has to work tomorrow.",
          hint: "Third person singular of devoir"
        },
        {
          sentence: "Nous ___ être patients.",
          answer: "devons",
          options: ["dois", "devons", "devez", "doivent"],
          translation: "We must be patient.",
          hint: "First person plural of devoir"
        },
        {
          sentence: "Vous ___ comprendre.",
          answer: "devez",
          options: ["devons", "devez", "doivent", "dois"],
          translation: "You must understand.",
          hint: "Second person plural/formal of devoir"
        },
        {
          sentence: "Ils ___ finir avant midi.",
          answer: "doivent",
          options: ["dois", "doit", "devez", "doivent"],
          translation: "They must finish before noon.",
          hint: "Third person plural of devoir"
        }
      ]
    },
    savoir_present: {
      topic: "savoir - Present Tense",
      spellbookRef: "savoir",
      questions: [
        {
          sentence: "Je ___ nager.",
          answer: "sais",
          options: ["sais", "sait", "savons", "savent"],
          translation: "I know how to swim.",
          hint: "First person singular of savoir"
        },
        {
          sentence: "Tu ___ la réponse?",
          answer: "sais",
          options: ["sais", "sait", "savez", "savent"],
          translation: "Do you know the answer?",
          hint: "Second person singular of savoir"
        },
        {
          sentence: "Il ___ parler français.",
          answer: "sait",
          options: ["sais", "sait", "savons", "savent"],
          translation: "He knows how to speak French.",
          hint: "Third person singular of savoir"
        },
        {
          sentence: "Nous ne ___ pas.",
          answer: "savons",
          options: ["sais", "savons", "savez", "savent"],
          translation: "We don't know.",
          hint: "First person plural of savoir"
        },
        {
          sentence: "___-vous où c'est?",
          answer: "Savez",
          options: ["Savons", "Savez", "Savent", "Sais"],
          translation: "Do you know where it is?",
          hint: "Second person plural/formal of savoir"
        },
        {
          sentence: "Elles ___ cuisiner.",
          answer: "savent",
          options: ["sais", "sait", "savez", "savent"],
          translation: "They know how to cook.",
          hint: "Third person plural of savoir"
        }
      ]
    },
    voir_present: {
      topic: "voir - Present Tense",
      spellbookRef: "voir",
      questions: [
        {
          sentence: "Je ___ la mer.",
          answer: "vois",
          options: ["vois", "voit", "voyons", "voient"],
          translation: "I see the sea.",
          hint: "First person singular of voir"
        },
        {
          sentence: "Tu ___ quelque chose?",
          answer: "vois",
          options: ["vois", "voit", "voyez", "voient"],
          translation: "Do you see something?",
          hint: "Second person singular of voir"
        },
        {
          sentence: "Elle ___ son ami.",
          answer: "voit",
          options: ["vois", "voit", "voyons", "voient"],
          translation: "She sees her friend.",
          hint: "Third person singular of voir"
        },
        {
          sentence: "Nous ___ les montagnes.",
          answer: "voyons",
          options: ["vois", "voyons", "voyez", "voient"],
          translation: "We see the mountains.",
          hint: "First person plural of voir"
        },
        {
          sentence: "Vous ___ ce que je veux dire?",
          answer: "voyez",
          options: ["voyons", "voyez", "voient", "vois"],
          translation: "Do you see what I mean?",
          hint: "Second person plural/formal of voir"
        },
        {
          sentence: "Ils ___ leurs parents.",
          answer: "voient",
          options: ["vois", "voit", "voyez", "voient"],
          translation: "They see their parents.",
          hint: "Third person plural of voir"
        }
      ]
    },
    mettre_present: {
      topic: "mettre - Present Tense",
      spellbookRef: "mettre",
      questions: [
        {
          sentence: "Je ___ mon manteau.",
          answer: "mets",
          options: ["mets", "met", "mettons", "mettent"],
          translation: "I put on my coat.",
          hint: "First person singular of mettre"
        },
        {
          sentence: "Tu ___ la table?",
          answer: "mets",
          options: ["mets", "met", "mettez", "mettent"],
          translation: "Are you setting the table?",
          hint: "Second person singular of mettre"
        },
        {
          sentence: "Elle ___ ses chaussures.",
          answer: "met",
          options: ["mets", "met", "mettons", "mettent"],
          translation: "She puts on her shoes.",
          hint: "Third person singular of mettre"
        },
        {
          sentence: "Nous ___ du temps à comprendre.",
          answer: "mettons",
          options: ["mets", "mettons", "mettez", "mettent"],
          translation: "We take time to understand.",
          hint: "First person plural of mettre"
        },
        {
          sentence: "Où ___-vous les clés?",
          answer: "mettez",
          options: ["mettons", "mettez", "mettent", "mets"],
          translation: "Where do you put the keys?",
          hint: "Second person plural/formal of mettre"
        },
        {
          sentence: "Ils ___ leurs livres ici.",
          answer: "mettent",
          options: ["mets", "met", "mettez", "mettent"],
          translation: "They put their books here.",
          hint: "Third person plural of mettre"
        }
      ]
    },
    regular_ir_verbs: {
      topic: "Regular -IR Verbs",
      spellbookRef: "regular_ir_pattern",
      questions: [
        {
          sentence: "Je ___ mon travail. (finir)",
          answer: "finis",
          options: ["finis", "finit", "finissons", "finissent"],
          translation: "I finish my work.",
          hint: "Remove -ir, add -is for je"
        },
        {
          sentence: "Tu ___ quel parfum? (choisir)",
          answer: "choisis",
          options: ["choisis", "choisit", "choisissez", "choisissent"],
          translation: "Which flavor are you choosing?",
          hint: "Remove -ir, add -is for tu"
        },
        {
          sentence: "L'enfant ___. (grandir)",
          answer: "grandit",
          options: ["grandis", "grandit", "grandissons", "grandissent"],
          translation: "The child is growing.",
          hint: "Remove -ir, add -it for il/elle"
        },
        {
          sentence: "Nous ___ nos devoirs. (finir)",
          answer: "finissons",
          options: ["finisons", "finissons", "finissez", "finissent"],
          translation: "We finish our homework.",
          hint: "Remove -ir, add -issons for nous"
        },
        {
          sentence: "Vous ___ à l'examen. (réussir)",
          answer: "réussissez",
          options: ["réussissons", "réussissez", "réussissent", "réussis"],
          translation: "You pass the exam.",
          hint: "Remove -ir, add -issez for vous"
        },
        {
          sentence: "Les fleurs ___. (fleurir)",
          answer: "fleurissent",
          options: ["fleuris", "fleurit", "fleurissons", "fleurissent"],
          translation: "The flowers are blooming.",
          hint: "Remove -ir, add -issent for ils/elles"
        },
        {
          sentence: "Je ___ à ce problème. (réfléchir)",
          answer: "réfléchis",
          options: ["réfléchis", "réfléchit", "réfléchissons", "réfléchissent"],
          translation: "I think about this problem.",
          hint: "First person singular of réfléchir"
        },
        {
          sentence: "Nous ___ le formulaire. (remplir)",
          answer: "remplissons",
          options: ["remplisons", "remplissons", "remplissez", "remplissent"],
          translation: "We fill out the form.",
          hint: "First person plural of remplir"
        }
      ]
    },
    regular_re_verbs: {
      topic: "Regular -RE Verbs",
      spellbookRef: "regular_re_pattern",
      questions: [
        {
          sentence: "Je ___ le bus. (attendre)",
          answer: "attends",
          options: ["attends", "attend", "attendons", "attendent"],
          translation: "I wait for the bus.",
          hint: "Remove -re, add -s for je"
        },
        {
          sentence: "Tu ___ ta maison? (vendre)",
          answer: "vends",
          options: ["vends", "vend", "vendez", "vendent"],
          translation: "Are you selling your house?",
          hint: "Remove -re, add -s for tu"
        },
        {
          sentence: "Il ___ à la question. (répondre)",
          answer: "répond",
          options: ["réponds", "répond", "répondons", "répondent"],
          translation: "He answers the question.",
          hint: "Remove -re, no ending for il/elle"
        },
        {
          sentence: "Nous ___ un bruit. (entendre)",
          answer: "entendons",
          options: ["entendons", "entendez", "entendent", "entends"],
          translation: "We hear a noise.",
          hint: "Remove -re, add -ons for nous"
        },
        {
          sentence: "Vous ___ les escaliers. (descendre)",
          answer: "descendez",
          options: ["descendons", "descendez", "descendent", "descends"],
          translation: "You go down the stairs.",
          hint: "Remove -re, add -ez for vous"
        },
        {
          sentence: "Ils ___ leur temps. (perdre)",
          answer: "perdent",
          options: ["perds", "perd", "perdez", "perdent"],
          translation: "They waste their time.",
          hint: "Remove -re, add -ent for ils/elles"
        },
        {
          sentence: "Elle ___ les livres. (rendre)",
          answer: "rend",
          options: ["rends", "rend", "rendons", "rendent"],
          translation: "She returns the books.",
          hint: "Third person singular of rendre"
        },
        {
          sentence: "Nous ___ la réponse. (attendre)",
          answer: "attendons",
          options: ["attendons", "attendez", "attendent", "attends"],
          translation: "We wait for the answer.",
          hint: "First person plural of attendre"
        }
      ]
    },
    aimer_present: {
      topic: "aimer - Present Tense",
      spellbookRef: "aimer",
      questions: [
        {
          sentence: "J'___ le chocolat.",
          answer: "aime",
          options: ["aime", "aimes", "aimons", "aiment"],
          translation: "I love chocolate.",
          hint: "First person singular of aimer"
        },
        {
          sentence: "Tu ___ la musique?",
          answer: "aimes",
          options: ["aime", "aimes", "aimez", "aiment"],
          translation: "Do you like music?",
          hint: "Second person singular of aimer"
        },
        {
          sentence: "Elle ___ danser.",
          answer: "aime",
          options: ["aime", "aimes", "aimons", "aiment"],
          translation: "She likes to dance.",
          hint: "Third person singular of aimer"
        },
        {
          sentence: "Nous ___ voyager.",
          answer: "aimons",
          options: ["aime", "aimons", "aimez", "aiment"],
          translation: "We like to travel.",
          hint: "First person plural of aimer"
        },
        {
          sentence: "Vous ___ la France?",
          answer: "aimez",
          options: ["aimons", "aimez", "aiment", "aimes"],
          translation: "Do you like France?",
          hint: "Second person plural/formal of aimer"
        },
        {
          sentence: "Ils ___ jouer au foot.",
          answer: "aiment",
          options: ["aime", "aimes", "aimez", "aiment"],
          translation: "They like to play soccer.",
          hint: "Third person plural of aimer"
        }
      ]
    },
    boire_manger: {
      topic: "Eating and Drinking",
      spellbookRef: "boire",
      questions: [
        {
          sentence: "Je ___ du café. (boire)",
          answer: "bois",
          options: ["bois", "boit", "buvons", "boivent"],
          translation: "I drink coffee.",
          hint: "First person singular of boire"
        },
        {
          sentence: "Tu ___ de l'eau? (boire)",
          answer: "bois",
          options: ["bois", "boit", "buvez", "boivent"],
          translation: "Do you drink water?",
          hint: "Second person singular of boire"
        },
        {
          sentence: "Elle ___ du vin. (boire)",
          answer: "boit",
          options: ["bois", "boit", "buvons", "boivent"],
          translation: "She drinks wine.",
          hint: "Third person singular of boire"
        },
        {
          sentence: "Nous ___ du thé. (boire)",
          answer: "buvons",
          options: ["bois", "buvons", "buvez", "boivent"],
          translation: "We drink tea.",
          hint: "First person plural of boire"
        },
        {
          sentence: "Je ___ une pizza. (manger)",
          answer: "mange",
          options: ["mange", "manges", "mangeons", "mangent"],
          translation: "I eat a pizza.",
          hint: "First person singular of manger"
        },
        {
          sentence: "Nous ___ ensemble. (manger)",
          answer: "mangeons",
          options: ["mangons", "mangeons", "mangez", "mangent"],
          translation: "We eat together.",
          hint: "Keep the 'e' before -ons"
        },
        {
          sentence: "Ils ___ au restaurant. (manger)",
          answer: "mangent",
          options: ["mange", "mangeons", "mangez", "mangent"],
          translation: "They eat at the restaurant.",
          hint: "Third person plural of manger"
        },
        {
          sentence: "Vous ___ bien? (manger)",
          answer: "mangez",
          options: ["mangeons", "mangez", "mangent", "manges"],
          translation: "Are you eating well?",
          hint: "Second person plural/formal of manger"
        }
      ]
    },
    movement_verbs: {
      topic: "Movement Verbs",
      spellbookRef: "partir",
      questions: [
        {
          sentence: "Je ___ demain. (partir)",
          answer: "pars",
          options: ["pars", "part", "partons", "partent"],
          translation: "I leave tomorrow.",
          hint: "First person singular of partir"
        },
        {
          sentence: "Tu ___ ce soir? (sortir)",
          answer: "sors",
          options: ["sors", "sort", "sortez", "sortent"],
          translation: "Are you going out tonight?",
          hint: "Second person singular of sortir"
        },
        {
          sentence: "Elle ___ à quelle heure? (arriver)",
          answer: "arrive",
          options: ["arrive", "arrives", "arrivons", "arrivent"],
          translation: "What time does she arrive?",
          hint: "Third person singular of arriver"
        },
        {
          sentence: "Nous ___ dans la maison. (entrer)",
          answer: "entrons",
          options: ["entre", "entrons", "entrez", "entrent"],
          translation: "We enter the house.",
          hint: "First person plural of entrer"
        },
        {
          sentence: "Vous ___ ici. (rester)",
          answer: "restez",
          options: ["restons", "restez", "restent", "restes"],
          translation: "You stay here.",
          hint: "Second person plural/formal of rester"
        },
        {
          sentence: "Ils ___ de l'escalier. (descendre)",
          answer: "descendent",
          options: ["descends", "descend", "descendez", "descendent"],
          translation: "They go down the stairs.",
          hint: "Third person plural of descendre"
        },
        {
          sentence: "Je ___ de l'école. (rentrer)",
          answer: "rentre",
          options: ["rentre", "rentres", "rentrons", "rentrent"],
          translation: "I come home from school.",
          hint: "First person singular of rentrer"
        },
        {
          sentence: "Le livre ___. (tomber)",
          answer: "tombe",
          options: ["tombe", "tombes", "tombons", "tombent"],
          translation: "The book falls.",
          hint: "Third person singular of tomber"
        }
      ]
    },
    daily_activities: {
      topic: "Daily Activities",
      spellbookRef: "regarder",
      questions: [
        {
          sentence: "Je ___ la télévision. (regarder)",
          answer: "regarde",
          options: ["regarde", "regardes", "regardons", "regardent"],
          translation: "I watch television.",
          hint: "First person singular of regarder"
        },
        {
          sentence: "Tu ___ de la musique? (écouter)",
          answer: "écoutes",
          options: ["écoute", "écoutes", "écoutez", "écoutent"],
          translation: "Do you listen to music?",
          hint: "Second person singular of écouter"
        },
        {
          sentence: "Il ___ au football. (jouer)",
          answer: "joue",
          options: ["joue", "joues", "jouons", "jouent"],
          translation: "He plays soccer.",
          hint: "Third person singular of jouer"
        },
        {
          sentence: "Nous ___ français. (parler)",
          answer: "parlons",
          options: ["parle", "parlons", "parlez", "parlent"],
          translation: "We speak French.",
          hint: "First person plural of parler"
        },
        {
          sentence: "Vous ___ où? (travailler)",
          answer: "travaillez",
          options: ["travaillons", "travaillez", "travaillent", "travailles"],
          translation: "Where do you work?",
          hint: "Second person plural/formal of travailler"
        },
        {
          sentence: "Elles ___ bien. (dormir)",
          answer: "dorment",
          options: ["dors", "dort", "dormez", "dorment"],
          translation: "They sleep well.",
          hint: "Third person plural of dormir"
        },
        {
          sentence: "Je ___ un livre. (lire)",
          answer: "lis",
          options: ["lis", "lit", "lisons", "lisent"],
          translation: "I read a book.",
          hint: "First person singular of lire"
        },
        {
          sentence: "Nous ___ des lettres. (écrire)",
          answer: "écrivons",
          options: ["écris", "écrivons", "écrivez", "écrivent"],
          translation: "We write letters.",
          hint: "First person plural of écrire"
        }
      ]
    },

    // =====================================================
    // Passé Composé Questions (with avoir)
    // =====================================================
    passe_compose_avoir: {
      topic: "Passé Composé with avoir",
      spellbookRef: "passe_compose",
      questions: [
        {
          sentence: "J'___ mangé une pomme.",
          answer: "ai",
          options: ["ai", "as", "a", "avons"],
          translation: "I ate an apple.",
          hint: "First person singular of avoir + past participle"
        },
        {
          sentence: "Tu ___ fini tes devoirs.",
          answer: "as",
          options: ["ai", "as", "a", "avez"],
          translation: "You finished your homework.",
          hint: "Second person singular of avoir"
        },
        {
          sentence: "Elle ___ parlé à son ami.",
          answer: "a",
          options: ["ai", "as", "a", "ont"],
          translation: "She spoke to her friend.",
          hint: "Third person singular of avoir"
        },
        {
          sentence: "Nous ___ regardé un film.",
          answer: "avons",
          options: ["ai", "avons", "avez", "ont"],
          translation: "We watched a movie.",
          hint: "First person plural of avoir"
        },
        {
          sentence: "Vous ___ compris la leçon?",
          answer: "avez",
          options: ["avons", "avez", "ont", "as"],
          translation: "Did you understand the lesson?",
          hint: "Second person plural/formal of avoir"
        },
        {
          sentence: "Ils ___ bu du café.",
          answer: "ont",
          options: ["a", "avons", "avez", "ont"],
          translation: "They drank coffee.",
          hint: "Third person plural of avoir"
        },
        {
          sentence: "J'ai ___ un livre. (lire)",
          answer: "lu",
          options: ["lire", "lu", "lit", "lis"],
          translation: "I read a book.",
          hint: "Past participle of lire"
        },
        {
          sentence: "Elle a ___ une lettre. (écrire)",
          answer: "écrit",
          options: ["écrit", "écrire", "écris", "écrivé"],
          translation: "She wrote a letter.",
          hint: "Past participle of écrire"
        },
        {
          sentence: "Nous avons ___ la porte. (ouvrir)",
          answer: "ouvert",
          options: ["ouvrir", "ouvri", "ouvert", "ouvre"],
          translation: "We opened the door.",
          hint: "Past participle of ouvrir is irregular: ouvert"
        },
        {
          sentence: "Tu as ___ le gâteau. (faire)",
          answer: "fait",
          options: ["fait", "faire", "fais", "faité"],
          translation: "You made the cake.",
          hint: "Past participle of faire"
        }
      ]
    },

    // =====================================================
    // Passé Composé Questions (with être)
    // =====================================================
    passe_compose_etre: {
      topic: "Passé Composé with être",
      spellbookRef: "passe_compose",
      questions: [
        {
          sentence: "Je ___ allé au marché. (masculine)",
          answer: "suis",
          options: ["suis", "ai", "es", "est"],
          translation: "I went to the market.",
          hint: "Aller uses être in passé composé"
        },
        {
          sentence: "Elle ___ arrivée hier.",
          answer: "est",
          options: ["a", "est", "es", "sont"],
          translation: "She arrived yesterday.",
          hint: "Arriver uses être, feminine agreement"
        },
        {
          sentence: "Nous ___ partis ce matin.",
          answer: "sommes",
          options: ["avons", "sommes", "êtes", "sont"],
          translation: "We left this morning.",
          hint: "Partir uses être"
        },
        {
          sentence: "Ils ___ venus à la fête.",
          answer: "sont",
          options: ["ont", "sont", "sommes", "êtes"],
          translation: "They came to the party.",
          hint: "Venir uses être"
        },
        {
          sentence: "Elle est ___ en France. (naître)",
          answer: "née",
          options: ["né", "née", "nés", "nées"],
          translation: "She was born in France.",
          hint: "Feminine singular agreement"
        },
        {
          sentence: "Les filles sont ___. (partir)",
          answer: "parties",
          options: ["parti", "partie", "partis", "parties"],
          translation: "The girls left.",
          hint: "Feminine plural agreement"
        },
        {
          sentence: "Il est ___ dans la rivière. (tomber)",
          answer: "tombé",
          options: ["tombé", "tombée", "tombés", "tombées"],
          translation: "He fell in the river.",
          hint: "Masculine singular agreement"
        },
        {
          sentence: "Vous êtes ___ à quelle heure? (rentrer)",
          answer: "rentrés",
          options: ["rentré", "rentrée", "rentrés", "rentrées"],
          translation: "What time did you come back?",
          hint: "Vous = plural, assume masculine/mixed"
        }
      ]
    },

    // =====================================================
    // Imparfait Questions
    // =====================================================
    imparfait_intro: {
      topic: "Imparfait - Introduction",
      spellbookRef: "imparfait",
      questions: [
        {
          sentence: "Quand j'___ petit... (être)",
          answer: "étais",
          options: ["étais", "était", "étions", "étaient"],
          translation: "When I was little...",
          hint: "First person singular of être in imparfait"
        },
        {
          sentence: "Tu ___ beaucoup quand tu étais jeune. (jouer)",
          answer: "jouais",
          options: ["jouais", "jouait", "jouions", "jouaient"],
          translation: "You used to play a lot when you were young.",
          hint: "Imparfait endings: -ais, -ais, -ait, -ions, -iez, -aient"
        },
        {
          sentence: "Il ___ froid hier. (faire)",
          answer: "faisait",
          options: ["faisais", "faisait", "faisions", "faisaient"],
          translation: "It was cold yesterday.",
          hint: "Third person singular of faire in imparfait"
        },
        {
          sentence: "Nous ___ à la campagne. (habiter)",
          answer: "habitions",
          options: ["habitais", "habitait", "habitions", "habitaient"],
          translation: "We used to live in the countryside.",
          hint: "First person plural of habiter in imparfait"
        },
        {
          sentence: "Vous ___ souvent au cinéma? (aller)",
          answer: "alliez",
          options: ["allais", "allait", "allions", "alliez"],
          translation: "Did you use to go to the movies often?",
          hint: "Second person plural of aller in imparfait"
        },
        {
          sentence: "Les enfants ___ dans le jardin. (jouer)",
          answer: "jouaient",
          options: ["jouais", "jouait", "jouions", "jouaient"],
          translation: "The children were playing in the garden.",
          hint: "Third person plural in imparfait"
        },
        {
          sentence: "Je ___ du pain tous les matins. (manger)",
          answer: "mangeais",
          options: ["mangeais", "mangeait", "mangions", "mangeaient"],
          translation: "I used to eat bread every morning.",
          hint: "Note the 'e' kept for pronunciation: mange-ais"
        },
        {
          sentence: "Elle ___ une grande maison. (avoir)",
          answer: "avait",
          options: ["avais", "avait", "avions", "avaient"],
          translation: "She had a big house.",
          hint: "Third person singular of avoir in imparfait"
        }
      ]
    },

    // =====================================================
    // Futur Simple Questions
    // =====================================================
    futur_simple_intro: {
      topic: "Futur Simple - Introduction",
      spellbookRef: "futur",
      questions: [
        {
          sentence: "Demain, je ___ au travail. (aller)",
          answer: "irai",
          options: ["irai", "iras", "ira", "irons"],
          translation: "Tomorrow, I will go to work.",
          hint: "Aller has irregular future stem: ir-"
        },
        {
          sentence: "Tu ___ la vérité un jour. (savoir)",
          answer: "sauras",
          options: ["saurai", "sauras", "saura", "sauront"],
          translation: "You will know the truth one day.",
          hint: "Savoir has irregular future stem: saur-"
        },
        {
          sentence: "Il ___ beau demain. (faire)",
          answer: "fera",
          options: ["ferai", "feras", "fera", "feront"],
          translation: "The weather will be nice tomorrow.",
          hint: "Faire has irregular future stem: fer-"
        },
        {
          sentence: "Nous ___ en vacances. (partir)",
          answer: "partirons",
          options: ["partirai", "partiras", "partirons", "partiront"],
          translation: "We will leave for vacation.",
          hint: "Regular future: infinitive + endings"
        },
        {
          sentence: "Vous ___ me voir? (venir)",
          answer: "viendrez",
          options: ["viendrai", "viendras", "viendrons", "viendrez"],
          translation: "Will you come to see me?",
          hint: "Venir has irregular future stem: viendr-"
        },
        {
          sentence: "Ils ___ le dîner. (préparer)",
          answer: "prépareront",
          options: ["préparerai", "prépareras", "préparerons", "prépareront"],
          translation: "They will prepare dinner.",
          hint: "Regular -er verb: infinitive + -ont"
        },
        {
          sentence: "J'___ beaucoup de choses. (apprendre)",
          answer: "apprendrai",
          options: ["apprendrai", "apprendras", "apprendra", "apprendront"],
          translation: "I will learn a lot of things.",
          hint: "Regular future: infinitive + -ai"
        },
        {
          sentence: "Elle ___ son examen. (réussir)",
          answer: "réussira",
          options: ["réussirai", "réussiras", "réussira", "réussiront"],
          translation: "She will pass her exam.",
          hint: "Regular -ir verb: infinitive + -a"
        }
      ]
    },

    // =====================================================
    // Conditionnel Questions
    // =====================================================
    conditionnel_intro: {
      topic: "Conditionnel - Introduction",
      spellbookRef: "conditionnel",
      questions: [
        {
          sentence: "Je ___ un café, s'il vous plaît. (vouloir)",
          answer: "voudrais",
          options: ["voudrais", "voudrait", "voudrions", "voudraient"],
          translation: "I would like a coffee, please.",
          hint: "Polite request with conditionnel"
        },
        {
          sentence: "Tu ___ m'aider? (pouvoir)",
          answer: "pourrais",
          options: ["pourrais", "pourrait", "pourrions", "pourraient"],
          translation: "Could you help me?",
          hint: "Polite question with conditionnel"
        },
        {
          sentence: "Il ___ venir demain. (devoir)",
          answer: "devrait",
          options: ["devrais", "devrait", "devrions", "devraient"],
          translation: "He should come tomorrow.",
          hint: "Expressing obligation/advice"
        },
        {
          sentence: "Nous ___ en France si possible. (aller)",
          answer: "irions",
          options: ["irais", "irait", "irions", "iraient"],
          translation: "We would go to France if possible.",
          hint: "Hypothetical situation"
        },
        {
          sentence: "Vous ___ parler moins fort. (devoir)",
          answer: "devriez",
          options: ["devrais", "devrait", "devrions", "devriez"],
          translation: "You should speak more quietly.",
          hint: "Giving advice with conditionnel"
        },
        {
          sentence: "Elles ___ très heureuses. (être)",
          answer: "seraient",
          options: ["serais", "serait", "serions", "seraient"],
          translation: "They would be very happy.",
          hint: "Être in conditionnel: ser- + endings"
        },
        {
          sentence: "J'___ une grande maison. (avoir)",
          answer: "aurais",
          options: ["aurais", "aurait", "aurions", "auraient"],
          translation: "I would have a big house.",
          hint: "Avoir in conditionnel: aur- + endings"
        },
        {
          sentence: "Si j'avais de l'argent, j'___ le monde. (voir)",
          answer: "verrais",
          options: ["verrais", "verrait", "verrions", "verraient"],
          translation: "If I had money, I would see the world.",
          hint: "Voir in conditionnel: verr- + endings"
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
    },
    venir: {
      verb: "venir",
      english: "to come",
      questions: [
        { pronoun: "je", answer: "viens", options: ["viens", "vient", "venons", "viennent"] },
        { pronoun: "tu", answer: "viens", options: ["viens", "vient", "venez", "viennent"] },
        { pronoun: "il", answer: "vient", options: ["viens", "vient", "venons", "viennent"] },
        { pronoun: "elle", answer: "vient", options: ["viens", "vient", "venons", "viennent"] },
        { pronoun: "on", answer: "vient", options: ["viens", "vient", "venons", "viennent"] },
        { pronoun: "nous", answer: "venons", options: ["venons", "venez", "viennent", "viens"] },
        { pronoun: "vous", answer: "venez", options: ["venons", "venez", "viennent", "viens"] },
        { pronoun: "ils", answer: "viennent", options: ["venons", "venez", "viennent", "vient"] },
        { pronoun: "elles", answer: "viennent", options: ["venons", "venez", "viennent", "vient"] }
      ]
    },
    prendre: {
      verb: "prendre",
      english: "to take",
      questions: [
        { pronoun: "je", answer: "prends", options: ["prends", "prend", "prenons", "prennent"] },
        { pronoun: "tu", answer: "prends", options: ["prends", "prend", "prenez", "prennent"] },
        { pronoun: "il", answer: "prend", options: ["prends", "prend", "prenons", "prennent"] },
        { pronoun: "elle", answer: "prend", options: ["prends", "prend", "prenons", "prennent"] },
        { pronoun: "on", answer: "prend", options: ["prends", "prend", "prenons", "prennent"] },
        { pronoun: "nous", answer: "prenons", options: ["prenons", "prenez", "prennent", "prends"] },
        { pronoun: "vous", answer: "prenez", options: ["prenons", "prenez", "prennent", "prends"] },
        { pronoun: "ils", answer: "prennent", options: ["prenons", "prenez", "prennent", "prend"] },
        { pronoun: "elles", answer: "prennent", options: ["prenons", "prenez", "prennent", "prend"] }
      ]
    },
    vouloir: {
      verb: "vouloir",
      english: "to want",
      questions: [
        { pronoun: "je", answer: "veux", options: ["veux", "veut", "voulons", "veulent"] },
        { pronoun: "tu", answer: "veux", options: ["veux", "veut", "voulez", "veulent"] },
        { pronoun: "il", answer: "veut", options: ["veux", "veut", "voulons", "veulent"] },
        { pronoun: "elle", answer: "veut", options: ["veux", "veut", "voulons", "veulent"] },
        { pronoun: "on", answer: "veut", options: ["veux", "veut", "voulons", "veulent"] },
        { pronoun: "nous", answer: "voulons", options: ["voulons", "voulez", "veulent", "veux"] },
        { pronoun: "vous", answer: "voulez", options: ["voulons", "voulez", "veulent", "veux"] },
        { pronoun: "ils", answer: "veulent", options: ["voulons", "voulez", "veulent", "veut"] },
        { pronoun: "elles", answer: "veulent", options: ["voulons", "voulez", "veulent", "veut"] }
      ]
    },
    pouvoir: {
      verb: "pouvoir",
      english: "can/to be able",
      questions: [
        { pronoun: "je", answer: "peux", options: ["peux", "peut", "pouvons", "peuvent"] },
        { pronoun: "tu", answer: "peux", options: ["peux", "peut", "pouvez", "peuvent"] },
        { pronoun: "il", answer: "peut", options: ["peux", "peut", "pouvons", "peuvent"] },
        { pronoun: "elle", answer: "peut", options: ["peux", "peut", "pouvons", "peuvent"] },
        { pronoun: "on", answer: "peut", options: ["peux", "peut", "pouvons", "peuvent"] },
        { pronoun: "nous", answer: "pouvons", options: ["pouvons", "pouvez", "peuvent", "peux"] },
        { pronoun: "vous", answer: "pouvez", options: ["pouvons", "pouvez", "peuvent", "peux"] },
        { pronoun: "ils", answer: "peuvent", options: ["pouvons", "pouvez", "peuvent", "peut"] },
        { pronoun: "elles", answer: "peuvent", options: ["pouvons", "pouvez", "peuvent", "peut"] }
      ]
    },
    devoir: {
      verb: "devoir",
      english: "must/to have to",
      questions: [
        { pronoun: "je", answer: "dois", options: ["dois", "doit", "devons", "doivent"] },
        { pronoun: "tu", answer: "dois", options: ["dois", "doit", "devez", "doivent"] },
        { pronoun: "il", answer: "doit", options: ["dois", "doit", "devons", "doivent"] },
        { pronoun: "elle", answer: "doit", options: ["dois", "doit", "devons", "doivent"] },
        { pronoun: "on", answer: "doit", options: ["dois", "doit", "devons", "doivent"] },
        { pronoun: "nous", answer: "devons", options: ["devons", "devez", "doivent", "dois"] },
        { pronoun: "vous", answer: "devez", options: ["devons", "devez", "doivent", "dois"] },
        { pronoun: "ils", answer: "doivent", options: ["devons", "devez", "doivent", "doit"] },
        { pronoun: "elles", answer: "doivent", options: ["devons", "devez", "doivent", "doit"] }
      ]
    },
    savoir: {
      verb: "savoir",
      english: "to know (facts)",
      questions: [
        { pronoun: "je", answer: "sais", options: ["sais", "sait", "savons", "savent"] },
        { pronoun: "tu", answer: "sais", options: ["sais", "sait", "savez", "savent"] },
        { pronoun: "il", answer: "sait", options: ["sais", "sait", "savons", "savent"] },
        { pronoun: "elle", answer: "sait", options: ["sais", "sait", "savons", "savent"] },
        { pronoun: "on", answer: "sait", options: ["sais", "sait", "savons", "savent"] },
        { pronoun: "nous", answer: "savons", options: ["savons", "savez", "savent", "sais"] },
        { pronoun: "vous", answer: "savez", options: ["savons", "savez", "savent", "sais"] },
        { pronoun: "ils", answer: "savent", options: ["savons", "savez", "savent", "sait"] },
        { pronoun: "elles", answer: "savent", options: ["savons", "savez", "savent", "sait"] }
      ]
    },
    voir: {
      verb: "voir",
      english: "to see",
      questions: [
        { pronoun: "je", answer: "vois", options: ["vois", "voit", "voyons", "voient"] },
        { pronoun: "tu", answer: "vois", options: ["vois", "voit", "voyez", "voient"] },
        { pronoun: "il", answer: "voit", options: ["vois", "voit", "voyons", "voient"] },
        { pronoun: "elle", answer: "voit", options: ["vois", "voit", "voyons", "voient"] },
        { pronoun: "on", answer: "voit", options: ["vois", "voit", "voyons", "voient"] },
        { pronoun: "nous", answer: "voyons", options: ["voyons", "voyez", "voient", "vois"] },
        { pronoun: "vous", answer: "voyez", options: ["voyons", "voyez", "voient", "vois"] },
        { pronoun: "ils", answer: "voient", options: ["voyons", "voyez", "voient", "voit"] },
        { pronoun: "elles", answer: "voient", options: ["voyons", "voyez", "voient", "voit"] }
      ]
    },
    mettre: {
      verb: "mettre",
      english: "to put",
      questions: [
        { pronoun: "je", answer: "mets", options: ["mets", "met", "mettons", "mettent"] },
        { pronoun: "tu", answer: "mets", options: ["mets", "met", "mettez", "mettent"] },
        { pronoun: "il", answer: "met", options: ["mets", "met", "mettons", "mettent"] },
        { pronoun: "elle", answer: "met", options: ["mets", "met", "mettons", "mettent"] },
        { pronoun: "on", answer: "met", options: ["mets", "met", "mettons", "mettent"] },
        { pronoun: "nous", answer: "mettons", options: ["mettons", "mettez", "mettent", "mets"] },
        { pronoun: "vous", answer: "mettez", options: ["mettons", "mettez", "mettent", "mets"] },
        { pronoun: "ils", answer: "mettent", options: ["mettons", "mettez", "mettent", "met"] },
        { pronoun: "elles", answer: "mettent", options: ["mettons", "mettez", "mettent", "met"] }
      ]
    },
    partir: {
      verb: "partir",
      english: "to leave",
      questions: [
        { pronoun: "je", answer: "pars", options: ["pars", "part", "partons", "partent"] },
        { pronoun: "tu", answer: "pars", options: ["pars", "part", "partez", "partent"] },
        { pronoun: "il", answer: "part", options: ["pars", "part", "partons", "partent"] },
        { pronoun: "elle", answer: "part", options: ["pars", "part", "partons", "partent"] },
        { pronoun: "on", answer: "part", options: ["pars", "part", "partons", "partent"] },
        { pronoun: "nous", answer: "partons", options: ["partons", "partez", "partent", "pars"] },
        { pronoun: "vous", answer: "partez", options: ["partons", "partez", "partent", "pars"] },
        { pronoun: "ils", answer: "partent", options: ["partons", "partez", "partent", "part"] },
        { pronoun: "elles", answer: "partent", options: ["partons", "partez", "partent", "part"] }
      ]
    },
    sortir: {
      verb: "sortir",
      english: "to go out",
      questions: [
        { pronoun: "je", answer: "sors", options: ["sors", "sort", "sortons", "sortent"] },
        { pronoun: "tu", answer: "sors", options: ["sors", "sort", "sortez", "sortent"] },
        { pronoun: "il", answer: "sort", options: ["sors", "sort", "sortons", "sortent"] },
        { pronoun: "elle", answer: "sort", options: ["sors", "sort", "sortons", "sortent"] },
        { pronoun: "on", answer: "sort", options: ["sors", "sort", "sortons", "sortent"] },
        { pronoun: "nous", answer: "sortons", options: ["sortons", "sortez", "sortent", "sors"] },
        { pronoun: "vous", answer: "sortez", options: ["sortons", "sortez", "sortent", "sors"] },
        { pronoun: "ils", answer: "sortent", options: ["sortons", "sortez", "sortent", "sort"] },
        { pronoun: "elles", answer: "sortent", options: ["sortons", "sortez", "sortent", "sort"] }
      ]
    },
    dormir: {
      verb: "dormir",
      english: "to sleep",
      questions: [
        { pronoun: "je", answer: "dors", options: ["dors", "dort", "dormons", "dorment"] },
        { pronoun: "tu", answer: "dors", options: ["dors", "dort", "dormez", "dorment"] },
        { pronoun: "il", answer: "dort", options: ["dors", "dort", "dormons", "dorment"] },
        { pronoun: "elle", answer: "dort", options: ["dors", "dort", "dormons", "dorment"] },
        { pronoun: "on", answer: "dort", options: ["dors", "dort", "dormons", "dorment"] },
        { pronoun: "nous", answer: "dormons", options: ["dormons", "dormez", "dorment", "dors"] },
        { pronoun: "vous", answer: "dormez", options: ["dormons", "dormez", "dorment", "dors"] },
        { pronoun: "ils", answer: "dorment", options: ["dormons", "dormez", "dorment", "dort"] },
        { pronoun: "elles", answer: "dorment", options: ["dormons", "dormez", "dorment", "dort"] }
      ]
    },
    lire: {
      verb: "lire",
      english: "to read",
      questions: [
        { pronoun: "je", answer: "lis", options: ["lis", "lit", "lisons", "lisent"] },
        { pronoun: "tu", answer: "lis", options: ["lis", "lit", "lisez", "lisent"] },
        { pronoun: "il", answer: "lit", options: ["lis", "lit", "lisons", "lisent"] },
        { pronoun: "elle", answer: "lit", options: ["lis", "lit", "lisons", "lisent"] },
        { pronoun: "on", answer: "lit", options: ["lis", "lit", "lisons", "lisent"] },
        { pronoun: "nous", answer: "lisons", options: ["lisons", "lisez", "lisent", "lis"] },
        { pronoun: "vous", answer: "lisez", options: ["lisons", "lisez", "lisent", "lis"] },
        { pronoun: "ils", answer: "lisent", options: ["lisons", "lisez", "lisent", "lit"] },
        { pronoun: "elles", answer: "lisent", options: ["lisons", "lisez", "lisent", "lit"] }
      ]
    },
    ecrire: {
      verb: "écrire",
      english: "to write",
      questions: [
        { pronoun: "je", answer: "écris", options: ["écris", "écrit", "écrivons", "écrivent"] },
        { pronoun: "tu", answer: "écris", options: ["écris", "écrit", "écrivez", "écrivent"] },
        { pronoun: "il", answer: "écrit", options: ["écris", "écrit", "écrivons", "écrivent"] },
        { pronoun: "elle", answer: "écrit", options: ["écris", "écrit", "écrivons", "écrivent"] },
        { pronoun: "on", answer: "écrit", options: ["écris", "écrit", "écrivons", "écrivent"] },
        { pronoun: "nous", answer: "écrivons", options: ["écrivons", "écrivez", "écrivent", "écris"] },
        { pronoun: "vous", answer: "écrivez", options: ["écrivons", "écrivez", "écrivent", "écris"] },
        { pronoun: "ils", answer: "écrivent", options: ["écrivons", "écrivez", "écrivent", "écrit"] },
        { pronoun: "elles", answer: "écrivent", options: ["écrivons", "écrivez", "écrivent", "écrit"] }
      ]
    },
    boire: {
      verb: "boire",
      english: "to drink",
      questions: [
        { pronoun: "je", answer: "bois", options: ["bois", "boit", "buvons", "boivent"] },
        { pronoun: "tu", answer: "bois", options: ["bois", "boit", "buvez", "boivent"] },
        { pronoun: "il", answer: "boit", options: ["bois", "boit", "buvons", "boivent"] },
        { pronoun: "elle", answer: "boit", options: ["bois", "boit", "buvons", "boivent"] },
        { pronoun: "on", answer: "boit", options: ["bois", "boit", "buvons", "boivent"] },
        { pronoun: "nous", answer: "buvons", options: ["buvons", "buvez", "boivent", "bois"] },
        { pronoun: "vous", answer: "buvez", options: ["buvons", "buvez", "boivent", "bois"] },
        { pronoun: "ils", answer: "boivent", options: ["buvons", "buvez", "boivent", "boit"] },
        { pronoun: "elles", answer: "boivent", options: ["buvons", "buvez", "boivent", "boit"] }
      ]
    },
    connaitre: {
      verb: "connaître",
      english: "to know (people/places)",
      questions: [
        { pronoun: "je", answer: "connais", options: ["connais", "connaît", "connaissons", "connaissent"] },
        { pronoun: "tu", answer: "connais", options: ["connais", "connaît", "connaissez", "connaissent"] },
        { pronoun: "il", answer: "connaît", options: ["connais", "connaît", "connaissons", "connaissent"] },
        { pronoun: "elle", answer: "connaît", options: ["connais", "connaît", "connaissons", "connaissent"] },
        { pronoun: "on", answer: "connaît", options: ["connais", "connaît", "connaissons", "connaissent"] },
        { pronoun: "nous", answer: "connaissons", options: ["connaissons", "connaissez", "connaissent", "connais"] },
        { pronoun: "vous", answer: "connaissez", options: ["connaissons", "connaissez", "connaissent", "connais"] },
        { pronoun: "ils", answer: "connaissent", options: ["connaissons", "connaissez", "connaissent", "connaît"] },
        { pronoun: "elles", answer: "connaissent", options: ["connaissons", "connaissez", "connaissent", "connaît"] }
      ]
    },
    dire: {
      verb: "dire",
      english: "to say/tell",
      questions: [
        { pronoun: "je", answer: "dis", options: ["dis", "dit", "disons", "disent"] },
        { pronoun: "tu", answer: "dis", options: ["dis", "dit", "dites", "disent"] },
        { pronoun: "il", answer: "dit", options: ["dis", "dit", "disons", "disent"] },
        { pronoun: "elle", answer: "dit", options: ["dis", "dit", "disons", "disent"] },
        { pronoun: "on", answer: "dit", options: ["dis", "dit", "disons", "disent"] },
        { pronoun: "nous", answer: "disons", options: ["disons", "dites", "disent", "dis"] },
        { pronoun: "vous", answer: "dites", options: ["disons", "dites", "disent", "dis"] },
        { pronoun: "ils", answer: "disent", options: ["disons", "dites", "disent", "dit"] },
        { pronoun: "elles", answer: "disent", options: ["disons", "dites", "disent", "dit"] }
      ]
    },
    croire: {
      verb: "croire",
      english: "to believe",
      questions: [
        { pronoun: "je", answer: "crois", options: ["crois", "croit", "croyons", "croient"] },
        { pronoun: "tu", answer: "crois", options: ["crois", "croit", "croyez", "croient"] },
        { pronoun: "il", answer: "croit", options: ["crois", "croit", "croyons", "croient"] },
        { pronoun: "elle", answer: "croit", options: ["crois", "croit", "croyons", "croient"] },
        { pronoun: "on", answer: "croit", options: ["crois", "croit", "croyons", "croient"] },
        { pronoun: "nous", answer: "croyons", options: ["croyons", "croyez", "croient", "crois"] },
        { pronoun: "vous", answer: "croyez", options: ["croyons", "croyez", "croient", "crois"] },
        { pronoun: "ils", answer: "croient", options: ["croyons", "croyez", "croient", "croit"] },
        { pronoun: "elles", answer: "croient", options: ["croyons", "croyez", "croient", "croit"] }
      ]
    },
    tenir: {
      verb: "tenir",
      english: "to hold",
      questions: [
        { pronoun: "je", answer: "tiens", options: ["tiens", "tient", "tenons", "tiennent"] },
        { pronoun: "tu", answer: "tiens", options: ["tiens", "tient", "tenez", "tiennent"] },
        { pronoun: "il", answer: "tient", options: ["tiens", "tient", "tenons", "tiennent"] },
        { pronoun: "elle", answer: "tient", options: ["tiens", "tient", "tenons", "tiennent"] },
        { pronoun: "on", answer: "tient", options: ["tiens", "tient", "tenons", "tiennent"] },
        { pronoun: "nous", answer: "tenons", options: ["tenons", "tenez", "tiennent", "tiens"] },
        { pronoun: "vous", answer: "tenez", options: ["tenons", "tenez", "tiennent", "tiens"] },
        { pronoun: "ils", answer: "tiennent", options: ["tenons", "tenez", "tiennent", "tient"] },
        { pronoun: "elles", answer: "tiennent", options: ["tenons", "tenez", "tiennent", "tient"] }
      ]
    },
    courir: {
      verb: "courir",
      english: "to run",
      questions: [
        { pronoun: "je", answer: "cours", options: ["cours", "court", "courons", "courent"] },
        { pronoun: "tu", answer: "cours", options: ["cours", "court", "courez", "courent"] },
        { pronoun: "il", answer: "court", options: ["cours", "court", "courons", "courent"] },
        { pronoun: "elle", answer: "court", options: ["cours", "court", "courons", "courent"] },
        { pronoun: "on", answer: "court", options: ["cours", "court", "courons", "courent"] },
        { pronoun: "nous", answer: "courons", options: ["courons", "courez", "courent", "cours"] },
        { pronoun: "vous", answer: "courez", options: ["courons", "courez", "courent", "cours"] },
        { pronoun: "ils", answer: "courent", options: ["courons", "courez", "courent", "court"] },
        { pronoun: "elles", answer: "courent", options: ["courons", "courez", "courent", "court"] }
      ]
    },
    vivre: {
      verb: "vivre",
      english: "to live",
      questions: [
        { pronoun: "je", answer: "vis", options: ["vis", "vit", "vivons", "vivent"] },
        { pronoun: "tu", answer: "vis", options: ["vis", "vit", "vivez", "vivent"] },
        { pronoun: "il", answer: "vit", options: ["vis", "vit", "vivons", "vivent"] },
        { pronoun: "elle", answer: "vit", options: ["vis", "vit", "vivons", "vivent"] },
        { pronoun: "on", answer: "vit", options: ["vis", "vit", "vivons", "vivent"] },
        { pronoun: "nous", answer: "vivons", options: ["vivons", "vivez", "vivent", "vis"] },
        { pronoun: "vous", answer: "vivez", options: ["vivons", "vivez", "vivent", "vis"] },
        { pronoun: "ils", answer: "vivent", options: ["vivons", "vivez", "vivent", "vit"] },
        { pronoun: "elles", answer: "vivent", options: ["vivons", "vivez", "vivent", "vit"] }
      ]
    },
    mourir: {
      verb: "mourir",
      english: "to die",
      questions: [
        { pronoun: "je", answer: "meurs", options: ["meurs", "meurt", "mourons", "meurent"] },
        { pronoun: "tu", answer: "meurs", options: ["meurs", "meurt", "mourez", "meurent"] },
        { pronoun: "il", answer: "meurt", options: ["meurs", "meurt", "mourons", "meurent"] },
        { pronoun: "elle", answer: "meurt", options: ["meurs", "meurt", "mourons", "meurent"] },
        { pronoun: "on", answer: "meurt", options: ["meurs", "meurt", "mourons", "meurent"] },
        { pronoun: "nous", answer: "mourons", options: ["mourons", "mourez", "meurent", "meurs"] },
        { pronoun: "vous", answer: "mourez", options: ["mourons", "mourez", "meurent", "meurs"] },
        { pronoun: "ils", answer: "meurent", options: ["mourons", "mourez", "meurent", "meurt"] },
        { pronoun: "elles", answer: "meurent", options: ["mourons", "mourez", "meurent", "meurt"] }
      ]
    },
    ouvrir: {
      verb: "ouvrir",
      english: "to open",
      questions: [
        { pronoun: "je", answer: "ouvre", options: ["ouvre", "ouvres", "ouvrons", "ouvrent"] },
        { pronoun: "tu", answer: "ouvres", options: ["ouvre", "ouvres", "ouvrez", "ouvrent"] },
        { pronoun: "il", answer: "ouvre", options: ["ouvre", "ouvres", "ouvrons", "ouvrent"] },
        { pronoun: "elle", answer: "ouvre", options: ["ouvre", "ouvres", "ouvrons", "ouvrent"] },
        { pronoun: "on", answer: "ouvre", options: ["ouvre", "ouvres", "ouvrons", "ouvrent"] },
        { pronoun: "nous", answer: "ouvrons", options: ["ouvrons", "ouvrez", "ouvrent", "ouvre"] },
        { pronoun: "vous", answer: "ouvrez", options: ["ouvrons", "ouvrez", "ouvrent", "ouvre"] },
        { pronoun: "ils", answer: "ouvrent", options: ["ouvrons", "ouvrez", "ouvrent", "ouvre"] },
        { pronoun: "elles", answer: "ouvrent", options: ["ouvrons", "ouvrez", "ouvrent", "ouvre"] }
      ]
    },
    offrir: {
      verb: "offrir",
      english: "to offer",
      questions: [
        { pronoun: "je", answer: "offre", options: ["offre", "offres", "offrons", "offrent"] },
        { pronoun: "tu", answer: "offres", options: ["offre", "offres", "offrez", "offrent"] },
        { pronoun: "il", answer: "offre", options: ["offre", "offres", "offrons", "offrent"] },
        { pronoun: "elle", answer: "offre", options: ["offre", "offres", "offrons", "offrent"] },
        { pronoun: "on", answer: "offre", options: ["offre", "offres", "offrons", "offrent"] },
        { pronoun: "nous", answer: "offrons", options: ["offrons", "offrez", "offrent", "offre"] },
        { pronoun: "vous", answer: "offrez", options: ["offrons", "offrez", "offrent", "offre"] },
        { pronoun: "ils", answer: "offrent", options: ["offrons", "offrez", "offrent", "offre"] },
        { pronoun: "elles", answer: "offrent", options: ["offrons", "offrez", "offrent", "offre"] }
      ]
    },
    conduire: {
      verb: "conduire",
      english: "to drive",
      questions: [
        { pronoun: "je", answer: "conduis", options: ["conduis", "conduit", "conduisons", "conduisent"] },
        { pronoun: "tu", answer: "conduis", options: ["conduis", "conduit", "conduisez", "conduisent"] },
        { pronoun: "il", answer: "conduit", options: ["conduis", "conduit", "conduisons", "conduisent"] },
        { pronoun: "elle", answer: "conduit", options: ["conduis", "conduit", "conduisons", "conduisent"] },
        { pronoun: "on", answer: "conduit", options: ["conduis", "conduit", "conduisons", "conduisent"] },
        { pronoun: "nous", answer: "conduisons", options: ["conduisons", "conduisez", "conduisent", "conduis"] },
        { pronoun: "vous", answer: "conduisez", options: ["conduisons", "conduisez", "conduisent", "conduis"] },
        { pronoun: "ils", answer: "conduisent", options: ["conduisons", "conduisez", "conduisent", "conduit"] },
        { pronoun: "elles", answer: "conduisent", options: ["conduisons", "conduisez", "conduisent", "conduit"] }
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
