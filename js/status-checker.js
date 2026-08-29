/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * Status Checker Engine: Privacy-First Client-Side Diagnostic & Self-Diagnosis Wizard
 */

let currentSelectedUser = 'priya';

function initStatusChecker() {
  const presetPriya = document.getElementById('presetPriya');
  const presetRohan = document.getElementById('presetRohan');
  const presetAmit = document.getElementById('presetAmit');
  const manualAadhaarInput = document.getElementById('manualAadhaarInput');
  const manualBankSelect = document.getElementById('manualBankSelect');
  const btnDiagnose = document.getElementById('btnDiagnose');
  const resultCardContainer = document.getElementById('resultCardContainer');

  if (!presetPriya || !resultCardContainer) return;

  // Masking format for Aadhaar input: XXXX XXXX XXXX
  if (manualAadhaarInput) {
    manualAadhaarInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '').substring(0, 12);
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
      }
      e.target.value = formatted;
    });
  }

  function displayUserDiagnosis(userKey, customData = null) {
    let data;
    if (customData) {
      data = customData;
    } else {
      data = MOCK_USERS[userKey] || MOCK_USERS['priya'];
      currentSelectedUser = userKey;
      [presetPriya, presetRohan, presetAmit].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });
      if (userKey === 'priya' && presetPriya) presetPriya.classList.add('active');
      if (userKey === 'rohan' && presetRohan) presetRohan.classList.add('active');
      if (userKey === 'amit' && presetAmit) presetAmit.classList.add('active');
    }

    const isReady = data.dbtSeeded;
    resultCardContainer.className = `result-card-container ${isReady ? 'ready-state' : ''}`;

    resultCardContainer.innerHTML = `
      <div class="result-header-bar">
        <div class="user-profile-info">
          <div class="user-avatar-circle">👤</div>
          <div>
            <h4>${data.name}</h4>
            <p>Aadhaar: ${data.aadhaarMasked} • Bank: <strong>${data.bankName}</strong> (Acc: ${data.accountMasked})</p>
          </div>
        </div>
        <span class="status-verdict-pill ${data.statusLevel}">${data.statusBadge}</span>
      </div>

      <div class="dual-status-grid">
        <div class="status-box ${data.aadhaarLinked ? 'success' : 'error'}">
          <div class="status-box-tag">YOUR AADHAAR STATUS</div>
          <div class="status-indicator-title ${data.aadhaarLinked ? 'green' : 'red'}">
            <span>${data.aadhaarLinked ? '🟢' : '🔴'}</span> ${data.aadhaarStatus}
          </div>
          <p>${data.aadhaarDesc}</p>
        </div>

        <div class="status-box ${data.dbtSeeded ? 'success' : 'error'}">
          <div class="status-box-tag">YOUR DBT STATUS</div>
          <div class="status-indicator-title ${data.dbtSeeded ? 'green' : 'red'}">
            <span>${data.dbtSeeded ? '🟢' : '🔴'}</span> ${data.dbtStatus}
          </div>
          <p>${data.dbtDesc}</p>
        </div>
      </div>

      <div class="recommendation-banner">
        <span style="font-size: 1.4rem;">⚠️</span>
        <div>
          <strong>Recommendation</strong>
          <p>"${data.recommendation}"</p>
        </div>
      </div>

      <div class="result-actions-row">
        ${!data.dbtSeeded ? `
          <button class="btn-danger-pill" onclick="jumpToFixWithBank('${data.actionBank || 'canara'}')">
            🆘 Fix My DBT Issue Now (Get Bank Mandate Form) ➔
          </button>
        ` : `
          <button class="btn-primary-green" onclick="window.location.hash='#scholarships'">
            🎓 Explore Eligible Scholarships ➔
          </button>
        `}
        <button class="btn-outline-pill" onclick="openWizardModal()">
          📋 Run 3-Question Self-Diagnosis Wizard
        </button>
      </div>
    `;
  }

  presetPriya.addEventListener('click', () => displayUserDiagnosis('priya'));
  presetRohan.addEventListener('click', () => displayUserDiagnosis('rohan'));
  presetAmit.addEventListener('click', () => displayUserDiagnosis('amit'));

  if (btnDiagnose) {
    btnDiagnose.addEventListener('click', () => {
      const val = (manualAadhaarInput ? manualAadhaarInput.value.replace(/\s/g, '') : '');
      const bank = manualBankSelect ? manualBankSelect.value : 'State Bank of India';

      if (val.length < 12) {
        showToast("Please enter a valid 12-digit Aadhaar number for diagnosis.", "error");
        return;
      }

      // Check last digit for mock evaluation
      const lastDigit = parseInt(val.slice(-1));
      let diagnosed;
      if (lastDigit % 2 === 0) {
        // Even digit -> Seeded
        diagnosed = {
          name: "Student Account (" + bank + ")",
          aadhaarMasked: "XXXX-XXXX-" + val.slice(-4),
          bankName: bank,
          accountMasked: "XXXXXX" + Math.floor(1000 + Math.random() * 9000),
          aadhaarLinked: true,
          dbtSeeded: true,
          statusLevel: "success",
          statusBadge: "All Green Ready ✅",
          aadhaarStatus: "Aadhaar linked",
          aadhaarDesc: "Aadhaar is linked with " + bank + " for identity verification.",
          dbtStatus: "DBT Active & Seeded",
          dbtDesc: "Account verified in NPCI APBS mapper.",
          recommendation: "Your account is verified and ready for government scholarship credits.",
          actionBank: "sbi"
        };
      } else {
        // Odd digit -> Not Seeded
        diagnosed = {
          name: "Student Account (" + bank + ")",
          aadhaarMasked: "XXXX-XXXX-" + val.slice(-4),
          bankName: bank,
          accountMasked: "XXXXXX" + Math.floor(1000 + Math.random() * 9000),
          aadhaarLinked: true,
          dbtSeeded: false,
          statusLevel: "warning",
          statusBadge: "Needs Attention ⚠️",
          aadhaarStatus: "Aadhaar linked",
          aadhaarDesc: "Aadhaar is on record for KYC, but NOT enabled for APBS routing.",
          dbtStatus: "DBT not confirmed",
          dbtDesc: "No active entry found on NPCI central mapper.",
          recommendation: "Your bank has not enabled NPCI Aadhaar seeding for DBT payments. Submit Annexure-I Mandate Form.",
          actionBank: "canara"
        };
      }

      displayUserDiagnosis(null, diagnosed);
      showToast("Privacy-Safe Diagnostic Complete!", "success");
    });
  }

  // Initial display
  displayUserDiagnosis('priya');
}

// Jump helper from Status Checker to Fix Tab
function jumpToFixWithBank(bankKey) {
  window.location.hash = '#fix';
  setTimeout(() => {
    if (typeof selectBankTab === 'function') {
      selectBankTab(bankKey);
    }
  }, 100);
}

// 3-Question Self-Diagnosis Wizard Modal
let wizardAnswers = {};

function openWizardModal() {
  const modal = document.getElementById('wizardModal');
  if (!modal) return;
  wizardAnswers = {};
  showWizardStep(1);
  modal.classList.add('active');
}

function closeWizardModal() {
  const modal = document.getElementById('wizardModal');
  if (modal) modal.classList.remove('active');
}

function showWizardStep(stepNum) {
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById('wizardStep' + i);
    if (stepEl) stepEl.style.display = (i === stepNum) ? 'block' : 'none';
  }
  const resultEl = document.getElementById('wizardResult');
  if (resultEl) resultEl.style.display = 'none';
}

function answerWizard(stepNum, answer) {
  wizardAnswers[stepNum] = answer;
  if (stepNum < 3) {
    showWizardStep(stepNum + 1);
  } else {
    evaluateWizard();
  }
}

function evaluateWizard() {
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById('wizardStep' + i);
    if (stepEl) stepEl.style.display = 'none';
  }
  const resultEl = document.getElementById('wizardResult');
  if (!resultEl) return;
  resultEl.style.display = 'block';

  const q2 = wizardAnswers[2];
  const q3 = wizardAnswers[3];

  let badge = '';
  let text = '';

  if (q2 === 'yes' && q3 === 'yes') {
    badge = '<span class="status-verdict-pill success">● High Probability: DBT-Seeded & Ready</span>';
    text = "You have submitted a specific DBT mandate form and already received direct benefit payments in this exact account. Your account is likely seeded properly. Still check UIDAI or dial *99*99*1# if you recently opened another bank account.";
  } else if (q2 === 'no' || q2 === 'unsure') {
    badge = '<span class="status-verdict-pill warning">⚠️ High Risk: Aadhaar Linked Only (Payment At Risk)</span>';
    text = "You only performed regular KYC or never submitted the explicit NPCI mandate form. In over 80% of such cases, government scholarship transfers bounce because the bank only keeps Aadhaar for identity verification. Please visit your branch or use mobile banking to submit Annexure-I.";
  } else {
    badge = '<span class="status-verdict-pill warning">❓ Uncertain Status — Action Advised</span>';
    text = "Your bank seeding status is unconfirmed. Normal passbooks only write 'Aadhaar Linked' and do not confirm NPCI APBS routing. We strongly recommend generating the official Annexure-I form or verifying via *99*99*1#.";
  }

  resultEl.innerHTML = `
    <div style="margin-bottom: 16px;">${badge}</div>
    <p style="font-size: 0.95rem; color: #334155; line-height: 1.6; margin-bottom: 20px;">${text}</p>
    <div style="display: flex; gap: 10px;">
      <button class="btn-danger-pill" onclick="closeWizardModal(); window.location.hash='#fix';">
        Get Bank Mandate Form (Annexure-I) ➔
      </button>
      <button class="btn-outline-pill" onclick="showWizardStep(1)">
        ↺ Restart Wizard
      </button>
    </div>
  `;
}
