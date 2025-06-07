const RULES = [
  {
    description: "Do not use the letter E",
    check: (text) => !text.toLowerCase().includes("e"),
    difficulty: "easy",
    keywords: ["no e", "without e", "avoid e", "do not use e", "exclude e"]
  },
  {
    description: "Only questions are allowed",
    check: (text) => text.trim().endsWith("?"),
    difficulty: "medium",
    keywords: ["question", "ask", "interrogative", "ends with ?", "only questions"]
  },
  {
    description: "Start every sentence with the letter T",
    check: (text) => text.trim().toLowerCase().startsWith("t"),
    difficulty: "medium",
    keywords: ["starts with t", "t at the start", "begin with t", "letter t"]
  },
  {
    description: "Only use words with 4 or more letters",
    check: (text) => text.split(" ").every(word => word.length >= 4),
    difficulty: "hard",
    keywords: ["four letters", "words of four or more letters", "no short words", "at least four letters"]
  },
  {
    description: "Only one word allowed",
    check: (text) => text.trim().split(" ").length === 1,
    difficulty: "easy",
    keywords: ["one word", "single word", "no spaces", "only one word"]
  }
];


