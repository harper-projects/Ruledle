document.addEventListener("DOMContentLoaded", () => {
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

  function startNewGame(selectedDifficulty) {
    console.log('Starting a new game with difficulty:', selectedDifficulty);

    if (!selectedDifficulty) selectedDifficulty = 'easy';
    difficulty = selectedDifficulty;
    difficultyLabel.textContent = difficulty;

    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("gameSection").style.display = "block";

    let filteredRules;
    if (difficulty === 'easy') {
      filteredRules = RULES.filter(rule => rule.description.length < 30);
    } else if (difficulty === 'medium') {
      filteredRules = RULES.filter(rule => rule.description.length >= 30 && rule.description.length < 60);
    } else if (difficulty === 'hard') {
      filteredRules = RULES.filter(rule => rule.description.length >= 60);
    } else {
      filteredRules = RULES;
    }

    // Fallback in case no rules match the difficulty filter
    if (filteredRules.length === 0) {
      filteredRules = RULES;
    }

    currentRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];

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

  document.querySelectorAll('.difficulty-btn').forEach(button => {
    button.addEventListener('click', () => {
      const selectedDifficulty = button.getAttribute('data-difficulty');
      startNewGame(selectedDifficulty);
    });
  });

  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

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

  document.getElementById("explanationBtn").addEventListener("click", () => {
    const box = document.getElementById("explanationBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
  });

  window.startNewGame = startNewGame;
  window.checkText = checkText;
  window.checkGuess = checkGuess;
});
