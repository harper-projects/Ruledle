const RULES = [
  {
    description: "Do not use the letter E",
    check: (text) => !text.toLowerCase().includes("e"),
  },
  {
    description: "Only questions are allowed",
    check: (text) => text.trim().endsWith("?"),
  },
  {
    description: "Only one word allowed",
    check: (text) => text.trim().split(" ").length === 1,
  }
];
