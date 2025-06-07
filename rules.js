const RULES = [
  {
    description: "Do not use the letter E",
    check: (text) => !text.toLowerCase().includes("e")
  },
  {
    description: "Only questions are allowed",
    check: (text) => text.trim().endsWith("?")
  },
  {
    description: "Start every sentence with the letter T",
    check: (text) => text.trim().toLowerCase().startsWith("t")
  },
  {
    description: "Only use words with 4 or more letters",
    check: (text) => text.split(" ").every(word => word.length >= 4)
  },
  {
    description: "Only one word allowed",
    check: (text) => text.trim().split(" ").length === 1
  }
];
