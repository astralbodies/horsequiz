/**
 * quiz.js — Quiz setup, "Find the Part" mode, "Name the Part" mode, results.
 */

(function () {
  "use strict";

  // ===== STATE =====
  var quizMode = "find";    // "find" or "name"
  var questionCount = 10;
  var questions = [];        // shuffled subset of HORSE_PARTS
  var currentIndex = 0;
  var score = 0;
  var results = [];          // { part, correct: bool }
  var answered = false;

  // ===== DOM REFS =====
  var startBtn = document.getElementById("start-quiz");
  var progressEl = document.getElementById("quiz-progress");
  var scoreLiveEl = document.getElementById("quiz-score-live");
  var promptEl = document.getElementById("quiz-prompt");
  var choicesEl = document.getElementById("quiz-choices");
  var feedbackEl = document.getElementById("quiz-feedback");
  var feedbackText = document.getElementById("feedback-text");
  var tryAgainBtn = document.getElementById("btn-try-again");

  // ===== QUIZ SETUP =====
  window.initQuizSetup = function () {
    // Nothing special to initialize — form is static HTML
  };

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      // Read form values
      var modeRadio = document.querySelector('input[name="quiz-mode"]:checked');
      var countRadio = document.querySelector('input[name="quiz-count"]:checked');
      quizMode = modeRadio ? modeRadio.value : "find";
      questionCount = countRadio ? parseInt(countRadio.value, 10) : 10;

      // Build question set
      questions = shuffleArray(HORSE_PARTS).slice(0, questionCount);
      currentIndex = 0;
      score = 0;
      results = [];

      navigateTo("quiz-play");
      showQuestion();
    });
  }

  // ===== TRY AGAIN =====
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", function () {
      navigateTo("quiz");
    });
  }

  // ===== SHOW QUESTION =====
  function showQuestion() {
    answered = false;
    var part = questions[currentIndex];

    // Update HUD
    progressEl.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
    scoreLiveEl.textContent = "Score: " + score;

    // Hide feedback
    feedbackEl.hidden = true;
    feedbackEl.className = "quiz-feedback";

    if (quizMode === "find") {
      showFindMode(part);
    } else {
      showNameMode(part);
    }
  }

  // ===== FIND THE PART =====
  function showFindMode(targetPart) {
    promptEl.textContent = 'Click on the "' + targetPart.name + '"';
    choicesEl.hidden = true;

    renderHotspots("hotspots-quiz", HORSE_PARTS, {
      showLabels: false,
      onClick: function (clickedPart, group) {
        if (answered) return;
        answered = true;

        var isCorrect = clickedPart.id === targetPart.id;

        if (isCorrect) {
          group.classList.add("hotspot-correct");
          showFeedback(true, targetPart.funFact);
        } else {
          group.classList.add("hotspot-wrong");
          // Highlight the correct one
          var correctGroup = document.querySelector(
            '#hotspots-quiz .hotspot-group[data-id="' + targetPart.id + '"]'
          );
          if (correctGroup) {
            correctGroup.classList.add("hotspot-correct");
          }
          showFeedback(false, "That was the " + clickedPart.name + ". The correct answer is " + targetPart.name + ".");
        }

        results.push({ part: targetPart, correct: isCorrect });
        if (isCorrect) score++;

        setTimeout(advance, 1800);
      }
    });
  }

  // ===== NAME THE PART =====
  function showNameMode(targetPart) {
    promptEl.textContent = "What part is highlighted?";
    choicesEl.hidden = false;
    choicesEl.innerHTML = "";

    // Render hotspots — highlight only the target
    renderHotspots("hotspots-quiz", HORSE_PARTS, {
      showLabels: false,
      onClick: function () {} // no click action in name mode
    });

    // Highlight the target dot, dim the rest
    var allGroups = document.querySelectorAll("#hotspots-quiz .hotspot-group");
    allGroups.forEach(function (g) {
      if (g.getAttribute("data-id") === targetPart.id) {
        g.classList.add("hotspot-highlight");
      } else {
        g.classList.add("hotspot-dimmed");
      }
    });

    // Build 4 choices: 1 correct + 3 distractors (prefer different regions)
    var distractors = getDistractors(targetPart, 3);
    var choices = shuffleArray([targetPart].concat(distractors));

    choices.forEach(function (choice) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.name;

      btn.addEventListener("click", function () {
        if (answered) return;
        answered = true;

        var isCorrect = choice.id === targetPart.id;

        // Disable all buttons and show correct/wrong
        var allBtns = choicesEl.querySelectorAll(".choice-btn");
        allBtns.forEach(function (b) {
          b.disabled = true;
          if (b.textContent === targetPart.name) {
            b.classList.add("correct");
          }
        });

        if (isCorrect) {
          showFeedback(true, targetPart.funFact);
        } else {
          btn.classList.add("wrong");
          showFeedback(false, "The correct answer is " + targetPart.name + ".");
        }

        results.push({ part: targetPart, correct: isCorrect });
        if (isCorrect) score++;

        setTimeout(advance, 1800);
      });

      choicesEl.appendChild(btn);
    });
  }

  // ===== DISTRACTORS =====
  function getDistractors(targetPart, count) {
    // Prefer parts from different regions
    var otherRegions = HORSE_PARTS.filter(function (p) {
      return p.id !== targetPart.id && p.region !== targetPart.region;
    });
    var sameRegion = HORSE_PARTS.filter(function (p) {
      return p.id !== targetPart.id && p.region === targetPart.region;
    });

    var pool = shuffleArray(otherRegions);
    // Add some same-region for difficulty
    if (sameRegion.length > 0) {
      pool.splice(1, 0, shuffleArray(sameRegion)[0]);
    }

    return pool.slice(0, count);
  }

  // ===== FEEDBACK =====
  function showFeedback(correct, message) {
    feedbackEl.hidden = false;
    feedbackEl.className = "quiz-feedback " + (correct ? "correct" : "wrong");
    feedbackText.textContent = (correct ? "\u2705 Correct! " : "\u274C Incorrect. ") + message;
  }

  // ===== ADVANCE =====
  function advance() {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }

  // ===== RESULTS =====
  function showResults() {
    navigateTo("results");

    var scoreEl = document.getElementById("results-score");
    var messageEl = document.getElementById("results-message");
    var detailEl = document.getElementById("results-detail");

    var pct = Math.round((score / questions.length) * 100);

    scoreEl.innerHTML = score + " / " + questions.length +
      ' <span class="pct">(' + pct + "%)</span>";

    messageEl.textContent = getEncouragement(pct);

    // Per-question detail
    detailEl.innerHTML = "";
    results.forEach(function (r) {
      var div = document.createElement("div");
      div.className = "result-item " + (r.correct ? "correct" : "wrong");
      div.innerHTML =
        '<span class="result-icon">' + (r.correct ? "\u2705" : "\u274C") + "</span>" +
        "<span>" + r.part.name + "</span>";
      detailEl.appendChild(div);
    });
  }

  function getEncouragement(pct) {
    if (pct === 100) return "Perfect score! You really know your horse anatomy!";
    if (pct >= 80) return "Great job! You know most of the horse parts — keep it up!";
    if (pct >= 60) return "Good effort! A little more practice and you'll be an expert.";
    if (pct >= 40) return "Nice try! Head back to Learn Mode to review, then try again.";
    return "Keep learning! Every expert was once a beginner. Try Learn Mode first!";
  }
})();
