let currentRule;
let guessCount = 0;
let winCount = 0;
let difficulty = 'easy';

const feedbackEl = document.getElementById("feedback");
const guessCountEl = document.getElementById("guessCount");
const winCountEl = document.getElementById("winCount");
const historyList = document.getElementById("historyList");
const playAgainBtn = document.getElementById("playAgainBtn");
const difficultyLabel = document.getElementById("difficultyLabel");

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

function startNewGame(selectedDifficulty) {
  // Set the difficulty
  difficulty = selectedDifficulty;
  difficultyLabel.textContent = difficulty;

  // Hide the difficulty buttons and show the game section
  document.getElementById("difficultySelect").style.display = "none";
  document.getElementById("gameSection").style.display = "block";

  // Choose rule based on difficulty
  let filteredRules;
  if (difficulty === 'easy') {
    filteredRules = RULES.filter(rule => rule.description.length < 30);
  } else if (difficulty === 'medium') {
    filteredRules = RULES.filter(rule => rule.description.length >= 30 && rule.description.length < 60);
  } else if (difficulty === 'hard') {
    filteredRules = RULES.filter(rule => rule.description.length >= 60);
  } else {
    filteredRules = RULES; // For mystery mode, just random rule
  }

  currentRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];

  // Reset guesses and feedback
  guessCount = 0;
  winCount = 0;
  guessCountEl.textContent = guessCount;
  winCountEl.textContent = winCount;
  feedbackEl.textContent = "";

  historyList.innerHTML = "";
  document.getElementById("userInput").focus();
  playAgainBtn.style.display = "none";
}

function checkText() {
  const input = document.getElementById("userInput").value.trim();
  const result = currentRule.check(input);
  const feedback = result ? "✅ Rule followed!" : "❌ Rule broken.";
  feedbackEl.textContent = feedback;

  const li = document.createElement("li");
  li.textContent = `"${input}" — ${feedback}`;
  li.className = result ? "followed" : "broken";
  historyList.appendChild(li);

  document.getElementById("userInput").value = "";
  document.getElementById("userInput").focus();
}

function checkGuess() {
  const guess = document.getElementById("guessInput").value.trim().toLowerCase();
  const actual = currentRule.description.toLowerCase();
  guessCount++;
  guessCountEl.textContent = guessCount;

  if (actual.includes(guess)) {
    feedbackEl.textContent = `🎉 Correct! The rule was: ${currentRule.description}`;
    winCount++;
    winCountEl.textContent = winCount;
    playAgainBtn.style.display = "block";
  } else {
    feedbackEl.textContent = "❌ Incorrect guess. Try again!";
  }

  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

function toggleExplanation() {
  const box = document.getElementById("explanationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// Start game on load by default showing difficulty buttons
startNewGame('easy');
