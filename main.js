let currentRule = RULES[Math.floor(Math.random() * RULES.length)];
let feedbackEl = document.getElementById("feedback");
let historyList = document.getElementById("historyList");

function checkText() {
  const input = document.getElementById("userInput").value.trim();
  const result = currentRule.check(input);

  const feedback = result ? "✅ Rule followed!" : "❌ Rule broken.";
  feedbackEl.textContent = feedback;

  const li = document.createElement("li");
  li.textContent = `"${input}" — ${feedback}`;
  historyList.appendChild(li);

  document.getElementById("userInput").value = "";
}

function checkGuess() {
  const guess = document.getElementById("guessInput").value.trim().toLowerCase();
  const actual = currentRule.description.toLowerCase();

  if (actual.includes(guess)) {
    feedbackEl.textContent = `🎉 Correct! The rule was: ${currentRule.description}`;
    currentRule = RULES[Math.floor(Math.random() * RULES.length)];
    historyList.innerHTML = ""; // clear history
  } else {
    feedbackEl.textContent = "❌ Incorrect guess. Try again!";
  }

  document.getElementById("guessInput").value = "";
}

function toggleExplanation() {
  const box = document.getElementById("explanationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

