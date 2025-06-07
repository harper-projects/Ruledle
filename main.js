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

// Start game with difficulty setting
function startNewGame(selectedDifficulty) {
  console.log('Starting a new game with difficulty:', selectedDifficulty);

  // Set the difficulty if not provided
  if (!selectedDifficulty) selectedDifficulty = 'easy';

  // Set the difficulty
  difficulty = selectedDifficulty;
  difficultyLabel.textContent = difficulty;

  // Hide difficulty options and show game section
  document.getElementById("difficultySelect").style.display = "none";
  document.getElementById("gameSection").style.display = "block";

  // Filter rules based on difficulty
  let filteredRules;
  if (difficulty === 'easy') {
    filteredRules = RULES.filter(rule => rule.description.length < 30);
  } else if (difficulty === 'medium') {
    filteredRules = RULES.filter(rule => rule.description.length >= 30 && rule.description.length < 60);
  } else if (difficulty === 'hard') {
    filteredRules = RULES.filter(rule => rule.description.length >= 60);
  } else {
    filteredRules = RULES; // Mystery mode
  }

  currentRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];

  // Reset game state
  guessCount = 0;
  winCount = 0;
  guessCountEl.textContent = guessCount;
  winCountEl.textContent = winCount;
  feedbackEl.textContent = "";

  historyList.innerHTML = "";
  document.getElementById("userInput").focus();
  playAgainBtn.style.display = "none";
}

// Check the entered text
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

// Check the guess for the rule
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

// Add event listeners to difficulty buttons
document.querySelectorAll('.difficulty-btn').forEach(button => {
  button.addEventListener('click', () => {
    const selectedDifficulty = button.getAttribute('data-difficulty');
    startNewGame(selectedDifficulty);
  });
});

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Keyboard shortcuts
document.addEventListener("keydown", e => {
  if (e.key === "/") {
    e.preventDefault();
    document.getElementById("userInput").focus();
  } else if (e.key === "Enter") {
    const active = document.activeElement;
    if (active.id === "userInput") checkText();
    else if (active.id === "guessInput") checkGuess();
  }
});
