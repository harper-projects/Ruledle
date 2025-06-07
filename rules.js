const RULES = [
  {
    description: "Do not use the letter E",
    check: (text) => !text.toLowerCase().includes("e"),
    difficulty: "easy"
  },
  {
    description: "Only questions are allowed",
    check: (text) => text.trim().endsWith("?"),
    difficulty: "medium"
  },
  {
    description: "Start every sentence with the letter T",
    check: (text) => text.trim().toLowerCase().startsWith("t"),
    difficulty: "medium"
  },
  {
    description: "Only use words with 4 or more letters",
    check: (text) => text.split(" ").every(word => word.length >= 4),
    difficulty: "hard"
  },
  {
    description: "Only one word allowed",
    check: (text) => text.trim().split(" ").length === 1,
    difficulty: "easy"
  }
];

