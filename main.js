let currentRule;
let guessCount = 0;
let winCount = 0;
let currentDifficulty = "easy";
let isMysteryMode = false;

const feedbackEl = document.getElementById("feedback");
const guessCountEl = document.getElementById("guessCount");
const winCountEl = document.getElementById("winCount");
const historyList = document.getElementById("historyList");
const playAgainBtn = document.getElementById("playAgainBtn");
const difficultyDisplay = document.getElementById("difficultyDisplay");

function startNewGame(difficulty) {
  currentDifficulty = difficulty;
  isMysteryMode = difficulty === "mystery";

  const filtered = RULES.filter(rule => rule.difficulty === difficulty || difficulty === 'mystery');
  currentRule = filtered[Math.floor(Math.random() * filtered.length)];

  historyList.innerHTML = "";
  feedbackEl.textContent = "";
  guessCount = 0;
  guessCountEl.textContent = "0";
  playAgainBtn.style.display = "none";
  document.getElementById("userInput").value = "";
  document.getElementById("guessInput").value = "";

  if (!isMysteryMode) {
    difficultyDisplay.textContent = `Difficulty: ${currentRule.difficulty.toUpperCase()}`;
  } else {
    difficultyDisplay.textContent = "Difficulty: ???";
  }
  document.getElementById("userInput").focus();
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
  if (!guess) return;

  guessCount++;
  guessCountEl.textContent = guessCount;

  const keywords = currentRule.keywords || [];
  const fuse = new Fuse(keywords, {
    includeScore: true,
    threshold: 0.4
  });

  const result = fuse.search(guess);

  if (result.length > 0) {
    feedbackEl.textContent = `🎉 Correct! The rule was: ${currentRule.description}`;
    feedbackEl.className = "flash-success";
    winCount++;
    winCountEl.textContent = winCount;
    playAgainBtn.style.display = "block";

    if (isMysteryMode) {
      difficultyDisplay.textContent = `Difficulty: ${currentRule.difficulty.toUpperCase()}`;
    }
  } else {
    flashFeedback("❌ Incorrect guess. Try again!", false);
  }

  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

function flashFeedback(text, success = true) {
  feedbackEl.textContent = text;
  feedbackEl.className = success ? "flash-success" : "flash-fail";
  setTimeout(() => feedbackEl.className = "", 300);
}

function toggleExplanation() {
  const box = document.getElementById("explanationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function resetGame() {
  startNewGame(currentDifficulty);
}

// Automatically start in easy mode
startNewGame("easy");
