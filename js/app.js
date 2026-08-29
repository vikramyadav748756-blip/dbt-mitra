/**
 * DBT Mitra - Student Aadhaar & DBT Readiness Facilitation Portal
 * Main Application Orchestrator & Router
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  renderScholarships();
  
  if (typeof initVisualFlow === 'function') initVisualFlow();
  if (typeof initStatusChecker === 'function') initStatusChecker();
  if (typeof initAwarenessQuiz === 'function') initAwarenessQuiz();
  if (typeof initDbtActivation === 'function') initDbtActivation();
});

// Toast notification helper
function showToast(message, type = 'info') {
  const toast = document.getElementById('appToast');
  if (!toast) return;

  const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.className = 'toast-notification show';

  setTimeout(() => {
    toast.className = 'toast-notification';
  }, 3500);
}

// Single Page Application Hash Router
function initRouter() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.view-section');

  function updateView() {
    let hash = window.location.hash || '#home';
    const targetId = 'view-' + hash.replace('#', '');
    let matched = false;

    sections.forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.add('active');
        matched = true;
      } else {
        sec.classList.remove('active');
      }
    });

    if (!matched) {
      const defaultSec = document.getElementById('view-home');
      if (defaultSec) defaultSec.classList.add('active');
      hash = '#home';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', updateView);
  updateView();
}

// Render Government Scholarships Directory
function renderScholarships() {
  const grid = document.getElementById('scholarshipsGrid');
  if (!grid || typeof SCHOLARSHIPS_DATA === 'undefined') return;

  grid.innerHTML = SCHOLARSHIPS_DATA.map(item => `
    <div class="scholarship-card">
      <div>
        <span class="scholarship-ministry-tag">${item.ministry}</span>
        <h3>${item.title}</h3>
        <p class="scholarship-desc">${item.description}</p>
        
        <div class="scholarship-meta-box">
          <div class="meta-row">
            <span>💰</span>
            <span><strong>Amount:</strong> ${item.amount}</span>
          </div>
          <div class="meta-row">
            <span>📅</span>
            <span><strong>Deadline:</strong> ${item.deadline}</span>
          </div>
          <span class="dbt-mandatory-pill">DBT Mandatory</span>
        </div>
      </div>

      <button class="btn-verify-scheme" onclick="window.location.hash='#checker'">
        Verify DBT Readiness for this Scheme ➔
      </button>
    </div>
  `).join('');
}
