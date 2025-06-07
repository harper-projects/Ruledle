let currentRule;
let guessCount = 0;
let winCount = 0;

const feedbackEl = document.getElementById("feedback");
const guessCountEl = document.getElementById("guessCount");
const winCountEl = document.getElementById("winCount");
const historyList = document.getElementById("historyList");
const playAgainBtn = document.getElementById("playAgainBtn");
const difficultyLabel = document.getElementById("difficultyLabel");

function startNewGame() {
  currentRule = RULES[Math.floor(Math.random() * RULES.length)];
  historyList.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  guessCount = 0;
  guessCountEl.textContent = "0";
  difficultyLabel.textContent = currentRule.difficulty || "unknown";
  playAgainBtn.style.display = "none";
  document.getElementById("userInput").value = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("userInput").focus();
}

function checkText() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  const result = currentRule.check(input);
  const feedback = result ? "✅ Rule followed!" : "❌ Rule broken.";
  flashFeedback(feedback, result);

  const li = document.createElement("li");
  li.textContent = `"${input}" — ${feedback}`;
  li.className = result ? "followed" : "broken";
  historyList.prepend(li);

  document.getElementById("userInput").value = "";
  document.getElementById("userInput").focus();
}

function checkGuess() {
  const guess = document.getElementById("guessInput").value.trim().toLowerCase();
  if (!guess) return;

  guessCount++;
  guessCountEl.textContent = guessCount;

  const keywords = currentRule.keywords || [];
  const matched = keywords.some(keyword => guess.includes(keyword));

  if (matched) {
    feedbackEl.textContent = `🎉 Correct! The rule was: ${currentRule.description}`;
    feedbackEl.className = "flash-success";
    winCount++;
    winCountEl.textContent = winCount;
    playAgainBtn.style.display = "block";
  } else {
    flashFeedback("❌ Incorrect guess. Try again!", false);
  }

  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}


function flashFeedback(message, success) {
  feedbackEl.textContent = message;
  feedbackEl.className = success ? "flash-success" : "flash-error";

  setTimeout(() => {
    feedbackEl.classList.remove("flash-success", "flash-error");
  }, 1000);
}

function toggleExplanation() {
  const box = document.getElementById("explanationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

startNewGame();

