/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * DBT Activation Engine: Bank-Wise Guides & Official Annexure-I Mandate Generator
 */

let activeBankKey = 'sbi';

function initDbtActivation() {
  renderBankTabs();
  selectBankTab('sbi');
  setupMandateGenerator();
}

function renderBankTabs() {
  const tabsRow = document.getElementById('bankTabsRow');
  if (!tabsRow) return;

  const banks = Object.keys(BANK_DATA);
  tabsRow.innerHTML = banks.map(key => {
    const bank = BANK_DATA[key];
    return `
      <button class="bank-pill-btn ${key === activeBankKey ? 'active' : ''}" onclick="selectBankTab('${key}')">
        <span>🏦</span> ${bank.name}
      </button>
    `;
  }).join('');
}

function selectBankTab(key) {
  activeBankKey = key;
  const bank = BANK_DATA[key];
  if (!bank) return;

  // Update pills
  const tabsRow = document.getElementById('bankTabsRow');
  if (tabsRow) {
    const buttons = tabsRow.querySelectorAll('.bank-pill-btn');
    const banks = Object.keys(BANK_DATA);
    buttons.forEach((btn, idx) => {
      btn.classList.toggle('active', banks[idx] === key);
    });
  }

  // Update details box
  const detailsBox = document.getElementById('bankDetailsBox');
  if (!detailsBox) return;

  detailsBox.innerHTML = `
    <div class="bank-header-row">
      <h4>${bank.name}</h4>
      <div class="bank-meta-tags">
        <span class="meta-tag blue">Turnaround: ${bank.turnaround}</span>
        <span class="meta-tag green">${bank.onlineAvailable ? '🟢 Online Seeding Available' : 'Branch Submission'}</span>
      </div>
    </div>

    <div class="methods-grid">
      <div class="method-column">
        <h5>📱 ${bank.methodA.title}</h5>
        <ol class="method-steps-list">
          ${bank.methodA.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>

      <div class="method-column">
        <h5>🏛️ ${bank.methodB.title}</h5>
        <ol class="method-steps-list">
          ${bank.methodB.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        <button class="btn-fill-mandate" onclick="prefillMandateForBank('${bank.name}')">
          📄 Fill & Print Mandate Form for ${bank.name} ➔
        </button>
      </div>
    </div>
  `;
}

function prefillMandateForBank(bankName) {
  const bankInput = document.getElementById('mandateBankName');
  if (bankInput) bankInput.value = bankName;
  
  // Smooth scroll to form
  const generatorCard = document.getElementById('mandateGeneratorCard');
  if (generatorCard) generatorCard.scrollIntoView({ behavior: 'smooth' });
}

function setupMandateGenerator() {
  const btnGenerate = document.getElementById('btnGenerateMandate');
  if (!btnGenerate) return;

  btnGenerate.addEventListener('click', () => {
    const name = document.getElementById('mandateFullName').value.trim() || "Student Scholar";
    const bank = document.getElementById('mandateBankName').value.trim() || "Canara Bank";
    const branch = document.getElementById('mandateBranch').value.trim() || "Main Branch";
    const acc = document.getElementById('mandateAccount').value.trim() || "110023458120";
    const aadhaar = document.getElementById('mandateAadhaar').value.trim() || "6472 9104 3821";
    const purposeOption = document.querySelector('input[name="mandatePurpose"]:checked')?.value || "1";

    const modal = document.getElementById('mandateModal');
    const previewContainer = document.getElementById('mandatePrintPreview');
    if (!modal || !previewContainer) return;

    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    previewContainer.innerHTML = `
      <div class="annexure-print-doc">
        <div class="annexure-header">
          <h2>ANNEXURE - I</h2>
          <p><strong>APPLICATION FOR LINKING / SEEDING AADHAAR NUMBER AND RECEIVING DBT BENEFITS INTO BANK ACCOUNT</strong></p>
          <p style="font-size: 0.82rem; margin-top: 4px;">(Mandate form approved by Ministry of Finance & National Payments Corporation of India)</p>
        </div>

        <p style="text-align: right; font-size: 0.88rem;"><strong>Date:</strong> ${today}</p>
        
        <p style="margin-top: 10px;">
          To,<br>
          The Branch Manager,<br>
          <strong>${bank}</strong><br>
          Branch: <strong>${branch}</strong>
        </p>

        <p style="margin-top: 14px; font-size: 0.92rem;">
          <strong>Subject:</strong> Linking / Seeding of Aadhaar Number and receiving Direct Benefit Transfer (DBT) into Account No: <strong>${acc}</strong>
        </p>

        <p style="margin-top: 10px; font-size: 0.88rem; text-align: justify;">
          Dear Sir/Madam,<br>
          I am maintaining a Savings Bank Account No: <strong>${acc}</strong> with your branch. I submit my 12-digit Aadhaar Number <strong>${aadhaar}</strong> issued by UIDAI and request you to validate and seed it on the central NPCI Aadhaar Payment Bridge (APBS) mapper.
        </p>

        <div style="margin: 16px 0; padding: 12px; border: 1px solid #000; font-size: 0.86rem;">
          <p><strong>Option Selected by Account Holder (Tick as applicable):</strong></p>
          <div style="margin-top: 8px;">
            <p><strong>${purposeOption === '1' ? '☑ [SELECTED]' : '☐'} Option 1: First-Time Seeding</strong> — I wish to seed my account with NPCI mapper to receive DBT benefits (including government scholarships, stipends, PM-KISAN, LPG subsidy) directly in this account.</p>
            <p style="margin-top: 8px;"><strong>${purposeOption === '2' ? '☑ [SELECTED]' : '☐'} Option 2: Change / Switch of Seeded Bank</strong> — I already have an account with another bank seeded on NPCI. I hereby instruct NPCI to switch and shift my DBT seeding to this account with ${bank}.</p>
          </div>
        </div>

        <p style="font-size: 0.84rem; line-height: 1.4;">
          <strong>Consent Declaration:</strong> I hereby give my voluntary consent to use my Aadhaar details for authenticating my identity and receiving DBT benefits into the bank account mentioned above.
        </p>

        <table style="width: 100%; margin-top: 30px; font-size: 0.9rem;">
          <tr>
            <td style="width: 50%;">
              <strong>Applicant Name:</strong> ${name}<br>
              <strong>Mobile No:</strong> Registered with Aadhaar<br>
              <strong>Enclosure:</strong> Self-attested copy of Aadhaar Card
            </td>
            <td style="width: 50%; text-align: right; vertical-align: bottom;">
              <br><br>
              ________________________________<br>
              <strong>Signature / Thumb Impression of Customer</strong>
            </td>
          </tr>
        </table>

        <div style="margin-top: 24px; border-top: 1px dashed #000; padding-top: 10px; font-size: 0.82rem;">
          <p style="text-align: center;"><strong>FOR BANK OFFICE USE ONLY (ACKNOWLEDGMENT SLIP)</strong></p>
          <p>Received application from Sh./Smt./Kum. <strong>${name}</strong> for Aadhaar Seeding on NPCI mapper in Account No: <strong>${acc}</strong> on date: <strong>${today}</strong>.</p>
          <br>
          <div style="display: flex; justify-content: space-between;">
            <span>Bank Stamp: _____________________</span>
            <span>Signature of Bank Official: _____________________</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    showToast("Official Annexure-I Form Generated!", "success");
  });
}

function closeMandateModal() {
  const modal = document.getElementById('mandateModal');
  if (modal) modal.classList.remove('active');
}
