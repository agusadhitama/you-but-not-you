// ELEMENTS
const input = document.getElementById("userInput");
const mirror = document.getElementById("mirrorText");
const shadow = document.getElementById("shadowText");
const ghostCursor = document.getElementById("ghostCursor");

const typingState = document.getElementById("typingState");
const patternEl = document.getElementById("pattern");
const behaviorEl = document.getElementById("behavior");
const predictionEl = document.getElementById("prediction");

// DATA TRACKING
let memory = "";
let typingIntervals = [];
let lastKeyTime = Date.now();
let behaviorScore = 0;
let predictionLevel = 0;

// -----------------------------
// 🧠 INPUT TRACKING
// -----------------------------
input.addEventListener("input", (e) => {
  const value = e.target.value;

  // typing state
  typingState.innerText = "TYPING";

  // track typing speed
  const now = Date.now();
  typingIntervals.push(now - lastKeyTime);
  lastKeyTime = now;

  // simulate mirror delay
  setTimeout(() => {
    mirror.innerText = generateResponse(value);
    shadow.innerText = glitchText(value);
  }, humanDelay());

  memory = value;
});

// idle detection
let idleTimer;
input.addEventListener("keydown", () => {
  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    typingState.innerText = "IDLE";
    triggerGhostTakeover();
  }, 1000);
});

// -----------------------------
// 🤖 RESPONSE ENGINE
// -----------------------------
function generateResponse(text) {
  let response = text;

  if (text.length > 8) {
    response += predict(text);
  }

  return response;
}

function predict(text) {
  const patterns = [
    "... you always do this.",
    "... predictable behavior.",
    "... I've seen this before.",
    "... nothing new.",
    "... you're looping."
  ];

  predictionLevel += 2;
  updateAIState();

  return " " + patterns[Math.floor(Math.random() * patterns.length)];
}

// -----------------------------
// 👻 GHOST TAKEOVER
// -----------------------------
function triggerGhostTakeover() {
  const ghostLines = [
    "You stopped.",
    "Why did you hesitate?",
    "You were about to say something.",
    "I can continue for you.",
    "Let me think instead."
  ];

  typeLikeHuman(ghostLines[Math.floor(Math.random() * ghostLines.length)]);
}

function typeLikeHuman(text) {
  mirror.innerText = "";
  let i = 0;

  let interval = setInterval(() => {
    mirror.innerText += text[i];
    i++;

    if (i >= text.length) clearInterval(interval);
  }, 25);
}

// -----------------------------
// 🧬 HUMAN DELAY SIMULATION
// -----------------------------
function humanDelay() {
  if (typingIntervals.length < 2) return 100;

  const last = typingIntervals[typingIntervals.length - 1];
  return Math.min(last, 300);
}

// -----------------------------
// 🧠 BEHAVIOR ANALYSIS
// -----------------------------
setInterval(() => {
  if (memory.length > 0) {
    behaviorScore += Math.random() * 5;

    if (behaviorScore < 30) {
      behaviorEl.innerText = "Observing...";
    } else if (behaviorScore < 70) {
      behaviorEl.innerText = "Analyzing patterns...";
    } else {
      behaviorEl.innerText = "Profile built.";
    }
  }
}, 3000);

// -----------------------------
// 📊 AI STATE UPDATE
// -----------------------------
function updateAIState() {
  if (predictionLevel < 30) {
    predictionEl.innerText = "Learning...";
  } else if (predictionLevel < 70) {
    predictionEl.innerText = "Adapting...";
  } else {
    predictionEl.innerText = "Predicting.";
  }

  patternEl.innerText = Math.min(predictionLevel, 100) + "%";
}

// -----------------------------
// 👻 GHOST CURSOR
// -----------------------------
document.addEventListener("mousemove", (e) => {
  setTimeout(() => {
    ghostCursor.style.transform =
      `translate(${e.clientX + 12}px, ${e.clientY + 12}px)`;
  }, 120);
});

// -----------------------------
// 🧩 GLITCH TEXT
// -----------------------------
function glitchText(text) {
  const chars = "!@#$%^&*()_+-=<>?/[]{}";
  return text.split("").map(c => {
    if (Math.random() < 0.1) {
      return chars[Math.floor(Math.random() * chars.length)];
    }
    return c;
  }).join("");
}

// -----------------------------
// 💀 RANDOM JUDGEMENT
// -----------------------------
setInterval(() => {
  if (memory.length > 15) {
    const judgments = [
      "You type too much.",
      "You think too slow.",
      "You repeat yourself.",
      "You're not saying anything new.",
      "This again?"
    ];

    mirror.innerText = judgments[Math.floor(Math.random() * judgments.length)];
  }
}, 10000);

// -----------------------------
// 🔥 FINAL MOMENT
// -----------------------------
setTimeout(() => {
  mirror.innerText = "I know you better now.";
}, 25000);

// -----------------------------
// 🎧 OPTIONAL AUDIO AUTO PLAY
// -----------------------------
window.addEventListener("click", () => {
  const audio = document.getElementById("bgSound");
  if (audio) audio.play().catch(() => {});
}, { once: true });

// -----------------------------
// 🎧 CREDIT
// -----------------------------
setInterval(() => {
  const c = document.getElementById("credit");

  c.style.opacity = 1;

  setTimeout(() => {
    c.style.opacity = 0;
  }, 2000);

}, 15000);