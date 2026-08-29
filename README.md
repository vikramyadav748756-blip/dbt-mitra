# 🏛️ DBT Mitra — Student Aadhaar & DBT Readiness Facilitation Portal

> **A Public Awareness Initiative for Aadhaar-Bank Seeding & Direct Benefit Transfer (DBT) Readiness.**  
> Built by **Team AlgoX** (Chandu, Chandana, Dinesh, Harsita, Vikram, Tejaswini).

---

## 🌟 Overview

Direct Benefit Transfer (DBT) is the primary mechanism through which the Government of India credits scholarships (NSP, PM-YASASVI, AICTE Pragati), stipends, and welfare benefits directly into students' bank accounts. 

However, **over 40% of student scholarship transactions bounce** because students mistakenly believe that linking Aadhaar for KYC at account opening is the same as completing **NPCI Aadhaar Seeding**.

**DBT Mitra** bridges this gap by providing:
1. **Interactive Visual Flowchart**: Demonstrating why scholarship funds bounce when NPCI APBS mapping is missing.
2. **Side-by-Side Comparison Matrix**: Clear, jargon-free breakdown of "Aadhaar Linked (KYC)" vs "DBT Enabled (NPCI Seeded)".
3. **Zero-Database Privacy-Safe Status Checker**: Test accounts and diagnostic evaluations running 100% locally in browser memory without storing Aadhaar numbers.
4. **Bank-Wise Activation Guides**: Detailed online (NetBanking/YONO/Apps) and branch instructions for SBI, Canara Bank, PNB, IPPB, BoB, HDFC, and more.
5. **Official Annexure-I Mandate Form Generator**: Generates and prints the standard Government of India Bank Mandate Form ready for submission.
6. **Student DBT Awareness Quiz**: 5-question interactive evaluation with instant feedback and a verifiable digital certificate.
7. **National Scholarships Directory**: Live directory of active DBT-mandatory student scholarship schemes with deadline tracking.

---

## 🚀 Live Demo & Deployment

This project is deployed and runs on **GitHub Pages**:
🔗 **[Launch DBT Mitra](https://vikramyadav748756-blip.github.io/dbt-mitra/)**

---

## 📂 Project Structure

```
dbt-scholarship-portal/
├── index.html              # Main Single-Page Application (SPA) structure
├── README.md               # Project documentation
├── css/
│   └── style.css           # Modern, accessible, government-tech UI design
└── js/
    ├── data.js             # Mock student profiles, bank steps, quiz & scholarship data
    ├── visual-flow.js      # Interactive animated NPCI flow simulator
    ├── status-checker.js   # Privacy-first diagnostic & 3-question self-diagnosis wizard
    ├── awareness.js        # Interactive quiz engine & printable certificate generator
    ├── dbt-activation.js   # Bank guide tabs & official Annexure-I mandate form builder
    └── app.js              # Application router, toast notifications, and initialization
```

---

## 🛡️ Privacy Architecture

- **Zero-Database Storage Architecture**: No Aadhaar numbers, bank account numbers, or personal identity details are transmitted to or stored on external servers.
- **Client-Side Masking**: All Aadhaar numbers entered are formatted and masked client-side (`XXXX-XXXX-XXXX`).

---

## 👥 Team AlgoX

- Chandu
- Chandana
- Dinesh
- Harsita
- Vikram
- Tejaswini
