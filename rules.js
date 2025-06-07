const RULES = [
  {
    description: "Do not use the letter E",
    difficulty: "easy",
    check: (text) => !text.toLowerCase().includes("e"),
    keywords: ["no e", "no letter e", "avoid e", "no e allowed"]
  },
  {
    description: "Only questions are allowed",
    difficulty: "easy",
    check: (text) => text.trim().endsWith("?"),
    keywords: ["questions only", "must be question", "only questions"]
  },
  {
    description: "Start every sentence with the letter T",
    difficulty: "medium",
    check: (text) => text.trim().toLowerCase().startsWith("t"),
    keywords: ["starts with t", "start with t", "begin with t"]
  },
  {
    description: "Only use words with 4 or more letters",
    difficulty: "medium",
    check: (text) => text.split(" ").every(word => word.length >= 4),
    keywords: ["long words only", "4+ letters", "minimum 4 letters", "no short words"]
  },
  {
    description: "Only one word allowed",
    difficulty: "hard",
    check: (text) => text.trim().split(" ").length === 1,
    keywords: ["one word", "single word only", "only one word"]
  },
  // Add more rules as needed
];
