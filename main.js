let currentRule = RULES[Math.floor(Math.random() * RULES.length)];
let feedbackEl = document.getElementById("feedback");

function checkInput() {
  const input = document.getElementById("userInput").value.trim();

  if (input.toLowerCase().startsWith("guess:")) {
    const guess = input.slice(6).trim().toLowerCase();
    if (currentRule.description.toLowerCase().includes(guess)) {
      feedbackEl.textContent = `🎉 Correct! The rule was: ${currentRule.description}`;
    } else {
      feedbackEl.textContent = "❌ Incorrect guess. Try again!";
    }
    return;
  }

  if (currentRule.check(input)) {
    feedbackEl.textContent = "✅ Rule followed!";
  } else {
    feedbackEl.textContent = "❌ Rule broken.";
  }
}
