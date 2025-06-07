let currentRule = null;
let guessCount = 0;
let winCount = 0;

document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("submitText").addEventListener("click", () => {
  const input = document.getElementById("userInput").value.trim();
  if (!currentRule) return;
  const result = currentRule.check(input);
  const feedback = result ? "✅ Rule followed!" : "❌ Rule broken.";
  document.getElementById("feedback").textContent = feedback;

  const li = document.createElement("li");
  li.textContent = `"${input}" — ${feedback}`;
  li.className = result ? "followed" : "broken";
  document.getElementById("historyList").appendChild(li);
  document.getElementById("userInput").value = "";
});

document.getElementById("submitGuess").addEventListener("click", () => {
  const guess = document.getElementById("guessInput").value.toLowerCase().trim();
  guessCount++;
  document.getElementById("guessCount").textContent = guessCount;
  if (currentRule && currentRule.description.toLowerCase().includes(guess)) {
    winCount++;
    document.getElementById("winCount").textContent = winCount;
    document.getElementById("feedback").textContent = `🎉 Correct! Rule: ${currentRule.description}`;
    document.getElementById("playAgainBtn").style.display = "block";
  } else {
    document.getElementById("feedback").textContent = "❌ Incorrect guess.";
  }
  document.getElementById("guessInput").value = "";
});

document.getElementById("playAgainBtn").addEventListener("click", () => {
  startNewGame();
});

document.getElementById("explanationBtn").addEventListener("click", () => {
  const box = document.getElementById("explanationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
});

document.querySelectorAll('.difficulty-btn').forEach(btn => {
  btn.addEventListener("click", () => {
    const difficulty = btn.dataset.difficulty;
    startNewGame(difficulty);
  });
});

function startNewGame(difficulty = 'easy') {
  currentRule = RULES[Math.floor(Math.random() * RULES.length)];
  document.getElementById("difficultyLabel").textContent = difficulty;
  document.getElementById("guessCount").textContent = guessCount = 0;
  document.getElementById("feedback").textContent = "";
  document.getElementById("historyList").innerHTML = "";
  document.getElementById("difficultySelect").style.display = "none";
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("playAgainBtn").style.display = "none";
}
