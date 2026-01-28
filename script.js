const quotes = [
  "JavaScript is a powerful programming language used for web development.",
  "Practice typing every day to improve speed and accuracy.",
  "Learning by building projects is the best way to master coding.",
  "Consistency matters more than motivation in long term learning."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const errorEl = document.getElementById("errors");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let timeLeft = 60;
let timer = null;
let errors = 0;
let started = false;
let currentQuote = "";

// Load random quote
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
}

// Start timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      endTest();
    }
  }, 1000);
}

// End test
function endTest() {
  clearInterval(timer);
  inputEl.disabled = true;

  const typedText = inputEl.value;
  const totalChars = typedText.length;
  const correctChars = totalChars - errors;

  const timeTaken = 60 / 60; // 1 minute
  const wpm = Math.round((correctChars / 5) / timeTaken);
  const accuracy = totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);

  resultEl.innerHTML = `
    <p>⌨ WPM: ${wpm}</p>
    <p>🎯 Accuracy: ${accuracy}%</p>
  `;
}

// Typing logic
inputEl.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const typed = inputEl.value;
  errors = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== currentQuote[i]) {
      errors++;
    }
  }

  errorEl.textContent = errors;
});

// Restart
restartBtn.addEventListener("click", () => {
  timeLeft = 60;
  errors = 0;
  started = false;
  clearInterval(timer);

  timeEl.textContent = timeLeft;
  errorEl.textContent = errors;
  resultEl.innerHTML = "";
  inputEl.value = "";
  inputEl.disabled = false;

  loadQuote();
});

// Init
loadQuote();
inputEl.disabled = false;
