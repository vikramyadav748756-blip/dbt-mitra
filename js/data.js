/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * Data Layer: Mock Student Records, Bank Guides, Quiz Questions, Scholarships
 */

const MOCK_USERS = {
  priya: {
    name: "Priya Sharma",
    aadhaarMasked: "XXXX-XXXX-3821",
    bankName: "Canara Bank",
    accountMasked: "XXXXXX8120",
    aadhaarLinked: true,
    dbtSeeded: false,
    statusLevel: "warning",
    statusBadge: "Needs Attention ⚠️",
    aadhaarStatus: "Aadhaar linked",
    aadhaarDesc: "Aadhaar is associated with your bank account for KYC identification.",
    dbtStatus: "DBT not confirmed",
    dbtDesc: "Not Seeded in NPCI Mapper",
    recommendation: "Your Aadhaar is linked to your bank account, but your DBT status needs attention. Contact your bank and ask them to verify Aadhaar seeding and NPCI mapping for DBT.",
    actionBank: "canara"
  },
  rohan: {
    name: "Rohan Kumar",
    aadhaarMasked: "XXXX-XXXX-4419",
    bankName: "State Bank of India",
    accountMasked: "XXXXXX7734",
    aadhaarLinked: true,
    dbtSeeded: true,
    statusLevel: "success",
    statusBadge: "All Green Ready ✅",
    aadhaarStatus: "Aadhaar linked",
    aadhaarDesc: "Aadhaar is verified and linked for full KYC compliance.",
    dbtStatus: "DBT Active & Seeded",
    dbtDesc: "Mapped in NPCI Mapper DB. Ready for scholarship credit.",
    recommendation: "Congratulations! Your account is 100% DBT-ready. All government scholarships released through PFMS will be directly credited without any delay.",
    actionBank: "sbi"
  },
  amit: {
    name: "Amit Verma",
    aadhaarMasked: "XXXX-XXXX-9931",
    bankName: "Punjab National Bank",
    accountMasked: "XXXXXX1154",
    aadhaarLinked: true,
    dbtSeeded: false,
    statusLevel: "warning",
    statusBadge: "Old Account Conflict ⚠️",
    aadhaarStatus: "Aadhaar linked",
    aadhaarDesc: "Linked to PNB account for branch KYC.",
    dbtStatus: "Mapped to Old Bank (Union Bank)",
    dbtDesc: "Active seeding remains locked with an old dormant account.",
    recommendation: "Your Aadhaar is linked with PNB, but central NPCI records show an old school account in Union Bank is still receiving DBT. Submit Annexure-I Mandate Form (Option 2) to switch seeding to PNB.",
    actionBank: "pnb"
  }
};

const BANK_DATA = {
  sbi: {
    name: "State Bank of India (SBI)",
    turnaround: "24 - 48 Hours",
    onlineAvailable: true,
    methodA: {
      title: "Method A: Online Mobile Banking / NetBanking",
      steps: [
        "Login to SBI YONO App or SBI Online NetBanking portal.",
        "Navigate to 'Service Requests' -> 'Aadhaar / Pan / Voter ID'.",
        "Select 'Aadhaar Seeding / NPCI Mapper Enablement'.",
        "Enter your 12-digit Aadhaar number and choose your primary savings account.",
        "Tick the consent box for 'Direct Benefit Transfer (DBT) credit enablement'.",
        "Authenticate using Aadhaar OTP sent to your registered mobile number."
      ]
    },
    methodB: {
      title: "Method B: Branch Visit with NPCI Mandate Form",
      steps: [
        "Visit your SBI Home Branch with a printed copy of the NPCI Mandate Form.",
        "Carry original Aadhaar Card and Passbook photocopy.",
        "Ask the officer to tick Option-1 ('Enable DBT in this SBI Account').",
        "Obtain a stamped acknowledgment slip from the counter."
      ]
    }
  },
  canara: {
    name: "Canara Bank",
    turnaround: "24 - 48 Hours",
    onlineAvailable: true,
    methodA: {
      title: "Method A: Canara ai1 Mobile Banking",
      steps: [
        "Open Canara ai1 App and authenticate with PIN or Biometrics.",
        "Go to 'Services' -> 'Accounts' -> 'Aadhaar Services'.",
        "Click 'Aadhaar Seeding for DBT (NPCI Mapper)'.",
        "Verify your Aadhaar number and accept the terms of consent.",
        "Submit the Aadhaar OTP to complete instant digital seeding."
      ]
    },
    methodB: {
      title: "Method B: Canara Branch Submission",
      steps: [
        "Print the official Annexure-I Mandate Form generated on this portal.",
        "Attach a self-attested copy of your Aadhaar Card.",
        "Submit at your Canara Bank branch service desk.",
        "Verify status on UIDAI portal after 48 hours."
      ]
    }
  },
  pnb: {
    name: "Punjab National Bank (PNB)",
    turnaround: "24 - 48 Hours",
    onlineAvailable: true,
    methodA: {
      title: "Method A: PNB ONE Mobile Application",
      steps: [
        "Open PNB ONE App and login with your credentials.",
        "Select 'Services' -> 'Aadhaar' -> 'Aadhaar OTP Seeding'.",
        "Select your active PNB Savings Account.",
        "Check 'Consent for APBS / DBT benefits credit'.",
        "Submit OTP received from UIDAI to confirm."
      ]
    },
    methodB: {
      title: "Method B: PNB Branch Visit",
      steps: [
        "Take printed Annexure-I Mandate form to your nearest PNB branch.",
        "Provide your biometric or signature verification to the bank executive.",
        "Collect the acknowledged mandate receipt."
      ]
    }
  },
  ippb: {
    name: "India Post Payments Bank (IPPB)",
    turnaround: "Instant / 24 Hours (Fastest)",
    onlineAvailable: true,
    methodA: {
      title: "Method A: Doorstep Banking via Postman / Dak Sevak",
      steps: [
        "Ask your local Postman or Gramin Dak Sevak (GDS) with Micro-ATM.",
        "Request 'Aadhaar Seeding / DBT Enablement for IPPB Account'.",
        "Provide fingerprint biometric on the Micro-ATM device.",
        "Seeding is processed immediately on the central postal server."
      ]
    },
    methodB: {
      title: "Method B: IPPB Mobile Banking App",
      steps: [
        "Login to IPPB Mobile App -> 'Accounts' -> 'DBT Mapping'.",
        "Select 'Receive DBT in IPPB Account'.",
        "Confirm with mPIN and Aadhaar OTP."
      ]
    }
  },
  bob: {
    name: "Bank of Baroda (BoB)",
    turnaround: "48 Hours",
    onlineAvailable: true,
    methodA: {
      title: "Method A: bob World App / Portal",
      steps: [
        "Login to bob World Mobile App.",
        "Select 'More' -> 'Customer Service' -> 'Aadhaar Seeding'.",
        "Choose option: 'Seed for Direct Benefit Transfer (DBT)'.",
        "Authenticate using Aadhaar OTP."
      ]
    },
    methodB: {
      title: "Method B: Bank of Baroda Branch Visit",
      steps: [
        "Visit your BoB branch with Passbook and Aadhaar copy.",
        "Submit the official Annexure-I Mandate form.",
        "Request entry into the bank's CBS APBS mapper."
      ]
    }
  },
  hdfc: {
    name: "HDFC Bank",
    turnaround: "48 Hours",
    onlineAvailable: true,
    methodA: {
      title: "Method A: HDFC NetBanking Portal",
      steps: [
        "Login to HDFC NetBanking -> Click on 'Accounts' tab.",
        "Navigate to 'Request' section on the left sidebar.",
        "Click on 'Aadhaar Seeding for DBT Benefits'.",
        "Select your account and authorize via OTP."
      ]
    },
    methodB: {
      title: "Method B: HDFC Branch Desk",
      steps: [
        "Submit physical Annexure-I form at any HDFC Bank branch.",
        "Ensure the representative marks 'Aadhaar APBS Seeding'."
      ]
    }
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "If Aadhaar is linked with my bank account, does that always mean DBT is enabled?",
    options: [
      { text: "Yes", isCorrect: false },
      { text: "No", isCorrect: true },
      { text: "Only for students", isCorrect: false },
      { text: "Don't know", isCorrect: false }
    ],
    explanation: "Linking Aadhaar only satisfies KYC identification with that bank. For government benefits, scholarships, and DBT to reach you, the account must be explicitly seeded in the central NPCI mapper!"
  },
  {
    id: 2,
    question: "How many bank accounts can be actively seeded with NPCI for DBT at any given time across all banks in India?",
    options: [
      { text: "As many as you want", isCorrect: false },
      { text: "Up to 3 bank accounts", isCorrect: false },
      { text: "Only ONE bank account", isCorrect: true },
      { text: "Two accounts (one savings, one college)", isCorrect: false }
    ],
    explanation: "The central NPCI Aadhaar Payment Bridge System (APBS) enforces the 'Only ONE' rule. Your Aadhaar can point to exactly ONE active bank account at a time for DBT credits."
  },
  {
    id: 3,
    question: "You opened a brand new college bank account. Does your DBT scholarship automatically move to the new account?",
    options: [
      { text: "Yes, government automatically switches it", isCorrect: false },
      { text: "No, you must submit a mandate form to switch seeding", isCorrect: true },
      { text: "Only if you provided Aadhaar as ID proof during opening", isCorrect: false },
      { text: "Yes, after 30 days", isCorrect: false }
    ],
    explanation: "DBT never switches automatically. Opening a new account with Aadhaar only KYC-links it. You must explicitly submit an Annexure-I Mandate form (Option 2) at the new bank to shift DBT seeding!"
  },
  {
    id: 4,
    question: "What official offline USSD code can you dial on your phone without internet to check your active seeded bank?",
    options: [
      { text: "*123#", isCorrect: false },
      { text: "*99*99*1#", isCorrect: true },
      { text: "*1947#", isCorrect: false },
      { text: "*100*1#", isCorrect: false }
    ],
    explanation: "Dialing *99*99*1# from your Aadhaar-registered SIM card sends a direct USSD query to NPCI and immediately shows your currently seeded bank on your mobile screen!"
  },
  {
    id: 5,
    question: "Which official Government of India document is required by banks to activate or switch Aadhaar DBT seeding?",
    options: [
      { text: "Form 16 Tax Statement", isCorrect: false },
      { text: "Annexure-I NPCI Aadhaar Seeding Mandate Form", isCorrect: true },
      { text: "Voter ID Card photocopy", isCorrect: false },
      { text: "Standard KYC Re-KYC declaration", isCorrect: false }
    ],
    explanation: "The NPCI Annexure-I Mandate Form ('Application for Linking/Seeding Aadhaar and Receiving DBT Benefits') is the legally recognized standard form accepted across all public and private banks in India."
  }
];

const SCHOLARSHIPS_DATA = [
  {
    id: "csss",
    ministry: "Ministry of Education",
    title: "Central Sector Scheme of Scholarships (CSSS)",
    description: "Financial assistance of ₹12,000 to ₹20,000 per annum for meritorious college students pursuing regular graduate courses.",
    amount: "₹20,000/yr",
    deadline: "31 Oct 2026",
    mandatoryDbt: true,
    portalUrl: "https://scholarships.gov.in"
  },
  {
    id: "yasasvi",
    ministry: "Ministry of Social Justice",
    title: "PM-YASASVI Post-Matric Scholarship",
    description: "Full tuition fees and monthly maintenance allowance for OBC, EBC & DNT students studying in Top Class schools and colleges.",
    amount: "Full Tuition + ₹5,000/mo",
    deadline: "15 Nov 2026",
    mandatoryDbt: true,
    portalUrl: "https://scholarships.gov.in"
  },
  {
    id: "pragati",
    ministry: "AICTE Govt of India",
    title: "AICTE Pragati Scholarship for Girls",
    description: "₹50,000 per annum for young women pursuing technical engineering and diploma degrees in AICTE-approved institutions.",
    amount: "₹50,000/yr",
    deadline: "31 Dec 2026",
    mandatoryDbt: true,
    portalUrl: "https://www.aicte-india.org"
  },
  {
    id: "postmatric-st",
    ministry: "Ministry of Tribal Affairs",
    title: "National Post-Matric Scholarship for ST Students",
    description: "Centrally sponsored scholarship scheme providing 100% tuition coverage and book allowance for Scheduled Tribe students.",
    amount: "₹35,000/yr + Maintenance",
    deadline: "30 Nov 2026",
    mandatoryDbt: true,
    portalUrl: "https://scholarships.gov.in"
  },
  {
    id: "nmms",
    ministry: "Department of School Education",
    title: "National Means-cum-Merit Scholarship (NMMS)",
    description: "Awarded to meritorious students of economically weaker sections to arrest drop-out at class VIII and encourage study till secondary stage.",
    amount: "₹12,000/yr",
    deadline: "15 Oct 2026",
    mandatoryDbt: true,
    portalUrl: "https://scholarships.gov.in"
  },
  {
    id: "ishan-uday",
    ministry: "University Grants Commission (UGC)",
    title: "Ishan Uday Special Scholarship for NER",
    description: "Special UGC scholarship scheme for students belonging to the North Eastern Region pursuing general or technical degree courses.",
    amount: "Up to ₹7,800/mo",
    deadline: "31 Dec 2026",
    mandatoryDbt: true,
    portalUrl: "https://scholarships.gov.in"
  }
];
