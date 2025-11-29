// ByteQuest - French Vocabulary Database
// Organized by category and difficulty

const VOCABULARY = {
  greetings: {
    basic: [
      { french: "bonjour", english: "hello", hint: "Used during the day" },
      { french: "bonsoir", english: "good evening", hint: "Used after 6 PM" },
      { french: "salut", english: "hi", hint: "Informal greeting" },
      { french: "au revoir", english: "goodbye", hint: "Formal farewell" },
      { french: "merci", english: "thank you", hint: "Shows gratitude" },
      { french: "s'il vous plaît", english: "please", hint: "Polite request (formal)" },
      { french: "oui", english: "yes", hint: "Affirmative response" },
      { french: "non", english: "no", hint: "Negative response" }
    ]
  },

  numbers: {
    basic: [
      { french: "un", english: "one", hint: "First counting number" },
      { french: "deux", english: "two", hint: "Second counting number" },
      { french: "trois", english: "three", hint: "Third counting number" },
      { french: "quatre", english: "four", hint: "Fourth counting number" },
      { french: "cinq", english: "five", hint: "Fifth counting number" },
      { french: "six", english: "six", hint: "Sixth counting number" },
      { french: "sept", english: "seven", hint: "Seventh counting number" },
      { french: "huit", english: "eight", hint: "Eighth counting number" },
      { french: "neuf", english: "nine", hint: "Ninth counting number" },
      { french: "dix", english: "ten", hint: "Tenth counting number" }
    ]
  },

  colors: {
    basic: [
      { french: "rouge", english: "red", hint: "Color of roses" },
      { french: "bleu", english: "blue", hint: "Color of the sky" },
      { french: "vert", english: "green", hint: "Color of grass" },
      { french: "jaune", english: "yellow", hint: "Color of the sun" },
      { french: "noir", english: "black", hint: "Darkest color" },
      { french: "blanc", english: "white", hint: "Lightest color" },
      { french: "orange", english: "orange", hint: "Same as the fruit" },
      { french: "rose", english: "pink", hint: "Light red color" }
    ]
  },

  family: {
    basic: [
      { french: "mère", english: "mother", hint: "Female parent" },
      { french: "père", english: "father", hint: "Male parent" },
      { french: "frère", english: "brother", hint: "Male sibling" },
      { french: "sœur", english: "sister", hint: "Female sibling" },
      { french: "fils", english: "son", hint: "Male child" },
      { french: "fille", english: "daughter", hint: "Female child" },
      { french: "grand-mère", english: "grandmother", hint: "Mother's or father's mother" },
      { french: "grand-père", english: "grandfather", hint: "Mother's or father's father" }
    ]
  },

  food: {
    basic: [
      { french: "pain", english: "bread", hint: "Baked staple food" },
      { french: "eau", english: "water", hint: "Clear liquid to drink" },
      { french: "lait", english: "milk", hint: "White dairy beverage" },
      { french: "viande", english: "meat", hint: "Animal protein" },
      { french: "poisson", english: "fish", hint: "Seafood protein" },
      { french: "fromage", english: "cheese", hint: "France is famous for this" },
      { french: "pomme", english: "apple", hint: "Round red/green fruit" },
      { french: "vin", english: "wine", hint: "Alcoholic grape beverage" }
    ]
  },

  common_verbs: {
    basic: [
      { french: "être", english: "to be", hint: "Most fundamental verb" },
      { french: "avoir", english: "to have", hint: "Express possession" },
      { french: "aller", english: "to go", hint: "Movement verb" },
      { french: "faire", english: "to do/make", hint: "Action verb" },
      { french: "dire", english: "to say", hint: "Speaking verb" },
      { french: "pouvoir", english: "to be able", hint: "Express ability" },
      { french: "vouloir", english: "to want", hint: "Express desire" },
      { french: "venir", english: "to come", hint: "Opposite of go" }
    ]
  },

  time: {
    basic: [
      { french: "jour", english: "day", hint: "24 hours" },
      { french: "semaine", english: "week", hint: "7 days" },
      { french: "mois", english: "month", hint: "About 30 days" },
      { french: "année", english: "year", hint: "12 months" },
      { french: "heure", english: "hour", hint: "60 minutes" },
      { french: "minute", english: "minute", hint: "60 seconds" },
      { french: "aujourd'hui", english: "today", hint: "This current day" },
      { french: "demain", english: "tomorrow", hint: "The next day" }
    ]
  },

  places: {
    basic: [
      { french: "maison", english: "house", hint: "Where you live" },
      { french: "ville", english: "city", hint: "Urban area" },
      { french: "village", english: "village", hint: "Small town" },
      { french: "marché", english: "market", hint: "Place to buy goods" },
      { french: "église", english: "church", hint: "Religious building" },
      { french: "école", english: "school", hint: "Place of learning" },
      { french: "route", english: "road", hint: "Path for travel" },
      { french: "forêt", english: "forest", hint: "Area with many trees" }
    ]
  }
};
