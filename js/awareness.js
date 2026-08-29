/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * Awareness Quiz Engine: Interactive 5-Question Quiz & Certified Digital Badge
 */

let currentQuizIndex = 0;
let quizScore = 0;
let answeredCurrent = false;

function initAwarenessQuiz() {
  const container = document.getElementById('quizQuestionsContainer');
  if (!container) return;

  loadQuizQuestion(0);
}

function loadQuizQuestion(index) {
  const container = document.getElementById('quizQuestionsContainer');
  const certWrapper = document.getElementById('quizCertificateWrapper');
  const stepTag = document.getElementById('quizStepTag');
  const scoreBadge = document.getElementById('quizScoreBadge');

  if (!container) return;

  if (index >= QUIZ_QUESTIONS.length) {
    // Show certificate
    container.style.display = 'none';
    if (certWrapper) certWrapper.classList.add('active');
    renderCertificate();
    return;
  }

  container.style.display = 'block';
  if (certWrapper) certWrapper.classList.remove('active');

  currentQuizIndex = index;
  answeredCurrent = false;
  const q = QUIZ_QUESTIONS[index];

  if (stepTag) stepTag.innerText = `QUESTION ${index + 1} OF ${QUIZ_QUESTIONS.length}`;
  if (scoreBadge) scoreBadge.innerText = `Current Score: ${quizScore} / ${index}`;

  const letters = ['A', 'B', 'C', 'D'];

  container.innerHTML = `
    <h3 class="quiz-question-title">${q.question}</h3>
    
    <div class="quiz-options-list" id="quizOptionsList">
      ${q.options.map((opt, i) => `
        <button class="quiz-opt-btn" onclick="selectQuizAnswer(${i})">
          <span class="quiz-opt-letter">${letters[i]}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>

    <div class="quiz-feedback-box" id="quizFeedbackBox"></div>

    <div class="quiz-actions-row">
      <button class="btn-next-quiz" id="btnNextQuiz" onclick="nextQuizQuestion()">
        ${index === QUIZ_QUESTIONS.length - 1 ? 'View Certified Badge 🏅' : 'Next Question ➔'}
      </button>
    </div>
  `;
}

function selectQuizAnswer(selectedIndex) {
  if (answeredCurrent) return;
  answeredCurrent = true;

  const q = QUIZ_QUESTIONS[currentQuizIndex];
  const buttons = document.querySelectorAll('.quiz-opt-btn');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('btnNextQuiz');
  const scoreBadge = document.getElementById('quizScoreBadge');

  const chosen = q.options[selectedIndex];
  const isCorrect = chosen.isCorrect;

  if (isCorrect) {
    quizScore++;
    buttons[selectedIndex].classList.add('correct');
    feedbackBox.innerHTML = `
      <strong style="color: #059669; display: block; margin-bottom: 4px;">✓ Correct!</strong>
      <p>${q.explanation}</p>
    `;
    showToast("Correct answer! +1 Point", "success");
  } else {
    buttons[selectedIndex].classList.add('wrong');
    // Highlight correct
    q.options.forEach((opt, idx) => {
      if (opt.isCorrect) buttons[idx].classList.add('correct');
    });
    feedbackBox.innerHTML = `
      <strong style="color: #dc2626; display: block; margin-bottom: 4px;">✕ Incorrect</strong>
      <p>${q.explanation}</p>
    `;
  }

  feedbackBox.classList.add('show');
  if (nextBtn) nextBtn.classList.add('show');
  if (scoreBadge) scoreBadge.innerText = `Current Score: ${quizScore} / ${currentQuizIndex + 1}`;
}

function nextQuizQuestion() {
  loadQuizQuestion(currentQuizIndex + 1);
}

function renderCertificate() {
  const certWrapper = document.getElementById('quizCertificateWrapper');
  if (!certWrapper) return;

  const percentage = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
  const studentName = MOCK_USERS[currentSelectedUser] ? MOCK_USERS[currentSelectedUser].name : "Student Scholar";
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  certWrapper.innerHTML = `
    <div class="certificate-card">
      <div class="certificate-icon">🎓</div>
      <h3>Certificate of Student DBT Literacy</h3>
      <p>This digital awareness badge is awarded to</p>
      <div class="cert-student-name">${studentName}</div>
      <p>for successfully completing the <strong>Aadhaar Linking vs. DBT Seeding Awareness Curriculum</strong> with a score of <strong>${quizScore}/${QUIZ_QUESTIONS.length} (${percentage}%)</strong>.</p>
      
      <div class="cert-badge-tag">
        🏛️ Verified DBT Literate • NPCI & PFMS Standards
      </div>

      <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 20px;">
        Issue Date: ${today} • Verified by DBT Mitra Platform
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-primary-green" onclick="window.print()">
          🖨️ Print / Save Badge PDF
        </button>
        <button class="btn-outline-pill" onclick="restartQuiz()">
          ↺ Retake Quiz
        </button>
      </div>
    </div>
  `;
}

function restartQuiz() {
  quizScore = 0;
  loadQuizQuestion(0);
}
