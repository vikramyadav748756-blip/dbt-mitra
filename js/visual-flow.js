/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * Visual Flow Engine: Interactive Aadhaar vs NPCI Mapper Simulator
 */

function initVisualFlow() {
  const btnScenario1 = document.getElementById('btnScenario1');
  const btnScenario2 = document.getElementById('btnScenario2');
  const flowContainer = document.getElementById('flowDiagramWrapper');
  const scenarioTitle = document.getElementById('scenarioTitleText');
  const scenarioDesc = document.getElementById('scenarioDescText');
  const flowTrack = document.getElementById('flowNodesTrack');
  const explainerTitle = document.getElementById('flowExplainerTitle');
  const explainerText = document.getElementById('flowExplainerText');
  const explainerBtn = document.getElementById('flowExplainerBtn');

  if (!btnScenario1 || !btnScenario2 || !flowContainer) return;

  function renderScenario(isSeeded) {
    if (isSeeded) {
      // Scenario 1: Seeded (DBT Ready)
      btnScenario1.className = 'sim-toggle-btn active success';
      btnScenario2.className = 'sim-toggle-btn';
      flowContainer.classList.remove('failure-state');

      scenarioTitle.innerHTML = '✅ Scenario 1: Aadhaar Linked + NPCI DBT Seeded (Ready!)';
      scenarioDesc.innerHTML = 'Aadhaar is linked and properly mapped to NPCI APBS for direct scholarship routing.';

      flowTrack.innerHTML = `
        <div class="flow-node-box">
          <div class="flow-node-icon">🏛️</div>
          <div class="flow-node-title">Govt Ministry</div>
          <div class="flow-node-sub">Releases ₹20,000 Scholarship via PFMS</div>
          <span class="flow-node-badge green">Funds Released ✓</span>
        </div>

        <div class="flow-arrow-connector">
          <div class="rupee-coin">₹</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box">
          <div class="flow-node-icon">📡</div>
          <div class="flow-node-title">NPCI Mapper</div>
          <div class="flow-node-sub">Resolves Aadhaar to Primary Bank Account instantly</div>
          <span class="flow-node-badge green">Active Seeded ✓</span>
        </div>

        <div class="flow-arrow-connector">
          <div class="rupee-coin">₹</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box">
          <div class="flow-node-icon">🏦</div>
          <div class="flow-node-title">Bank Account</div>
          <div class="flow-node-sub">Core Banking records credit via APBS</div>
          <span class="flow-node-badge green">Direct Credit ✓</span>
        </div>

        <div class="flow-arrow-connector">
          <div class="rupee-coin">₹</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box">
          <div class="flow-node-icon">🎓</div>
          <div class="flow-node-title">Student</div>
          <div class="flow-node-sub">SMS: ₹20,000 Credited via DBT DBT-NSP</div>
          <span class="flow-node-badge green">Payment Received! 🎉</span>
        </div>
      `;

      explainerTitle.innerText = 'Why does this work flawlessly?';
      explainerText.innerText = 'The complete pipeline is established: Aadhaar ➔ NPCI Mapper ➔ Bank Account ➔ Direct Credit. The government sends funds to your Aadhaar number, NPCI instantly identifies your mapped account, and the scholarship is credited directly without delay.';
      explainerBtn.innerText = 'Check Your Status Now 🔍';
      explainerBtn.onclick = () => window.location.hash = '#checker';
      explainerBtn.className = 'btn-primary-green';
    } else {
      // Scenario 2: Only Linked (Payment Bounces)
      btnScenario1.className = 'sim-toggle-btn';
      btnScenario2.className = 'sim-toggle-btn active error';
      flowContainer.classList.add('failure-state');

      scenarioTitle.innerHTML = '❌ Scenario 2: Only Aadhaar Linked (Payment Bounces!)';
      scenarioDesc.innerHTML = 'Aadhaar is linked for KYC identification only, but absent from the NPCI APBS database.';

      flowTrack.innerHTML = `
        <div class="flow-node-box">
          <div class="flow-node-icon">🏛️</div>
          <div class="flow-node-title">Govt Ministry</div>
          <div class="flow-node-sub">Releases ₹20,000 Scholarship via PFMS</div>
          <span class="flow-node-badge green">Funds Released ✓</span>
        </div>

        <div class="flow-arrow-connector blocked-arrow">
          <div class="rupee-coin">✕</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box blocked">
          <div class="flow-node-icon">⚠️</div>
          <div class="flow-node-title">NPCI Mapper</div>
          <div class="flow-node-sub">Aadhaar not mapped! No active receiving bank</div>
          <span class="flow-node-badge red">Unmapped / Rejected ✕</span>
        </div>

        <div class="flow-arrow-connector blocked-arrow">
          <div class="rupee-coin">✕</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box blocked">
          <div class="flow-node-icon">🏦</div>
          <div class="flow-node-title">Bank Account</div>
          <div class="flow-node-sub">Account never receives routing instruction</div>
          <span class="flow-node-badge red">No Inward Credit ✕</span>
        </div>

        <div class="flow-arrow-connector blocked-arrow">
          <div class="rupee-coin">✕</div>
          <span>➔</span>
        </div>

        <div class="flow-node-box blocked">
          <div class="flow-node-icon">😔</div>
          <div class="flow-node-title">Student</div>
          <div class="flow-node-sub">Payment Bounced! PFMS error: 'Aadhaar Not Seeded'</div>
          <span class="flow-node-badge red">Scholarship Missed ✕</span>
        </div>
      `;

      explainerTitle.innerText = 'Why did the scholarship payment bounce?';
      explainerText.innerText = 'The bank accepted Aadhaar for KYC identification, but never forwarded the NPCI Aadhaar Seeding Mandate to the central payment bridge. Because NPCI could not find an active seeded bank, the transaction was returned to the ministry as failed!';
      explainerBtn.innerText = 'Fix My DBT Issue Now 🆘';
      explainerBtn.onclick = () => window.location.hash = '#fix';
      explainerBtn.className = 'btn-danger-pill';
    }
  }

  btnScenario1.addEventListener('click', () => renderScenario(true));
  btnScenario2.addEventListener('click', () => renderScenario(false));

  // Initialize with Scenario 1
  renderScenario(true);
}
