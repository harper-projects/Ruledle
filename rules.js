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
  }
];
