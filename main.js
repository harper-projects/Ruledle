let currentRule;
let guessCount = 0;
let winCount = 0;

const feedbackEl = document.getElementById("feedback");
const guessCountEl = document.getElementById("guessCount");
const winCountEl = document.getElementById("winCount");
const historyList = document.getElementById("historyList");
const playAgainBtn = document.getElementById("playAgainBtn");

function startNewGame() {
  currentRule = RULES[Math.floor(Math.random() * RULES.length)];
  historyList.innerHTML = "";
  feedbackEl.textContent = "";
  guessCount = 0;
  guessCountEl.textContent = "0";
  playAgainBtn.style.display = "none";
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

// Start game on load
startNewGame();
