/**
 * Naturals Bridal: Presenter Panel & Guided Tour
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function renderPresenterPanel(state) {
    const curRole = state.role;
    const tourStepIdx = state.tour.activeStep - 1;
    const steps = window.NaturalsData.tourSteps;
    const currentTour = steps[tourStepIdx] || steps[0];

    return `
      <div class="presenter-header">
        <div class="presenter-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
          Presenter Mode
        </div>
        <button class="presenter-close-btn" onclick="window.NaturalsApp.togglePresenterPanel()">✕</button>
      </div>

      <!-- Role Switcher -->
      <div class="presenter-section">
        <div class="presenter-section-title">Select Active Role (Keys 1 - 4)</div>
        <div class="role-grid">
          <button class="role-btn ${curRole === 'bride' ? 'active' : ''}" onclick="window.NaturalsApp.setRole('bride')">
            <span>1. Bride App</span>
            <small>Mobile Experience</small>
          </button>
          <button class="role-btn ${curRole === 'artist' ? 'active' : ''}" onclick="window.NaturalsApp.setRole('artist')">
            <span>2. Artist OS</span>
            <small>Schedule & Capping</small>
          </button>
          <button class="role-btn ${curRole === 'hub' ? 'active' : ''}" onclick="window.NaturalsApp.setRole('hub')">
            <span>3. Hub Owner</span>
            <small>Chair Monetisation</small>
          </button>
          <button class="role-btn ${curRole === 'hq' ? 'active' : ''}" onclick="window.NaturalsApp.setRole('hq')">
            <span>4. Naturals HQ</span>
            <small>4 Go/Stop Gates</small>
          </button>
        </div>
      </div>

      <!-- Guided Tour Card -->
      <div class="presenter-section">
        <div class="presenter-section-title">Judges Guided Tour (8 Steps)</div>
        <div class="tour-card">
          <span class="tour-step-badge">STEP ${currentTour.step} OF ${steps.length}</span>
          <div class="tour-step-title">${currentTour.title}</div>
          <div class="tour-step-caption">${currentTour.caption}</div>

          <div class="tour-nav-row">
            <button class="tour-btn tour-btn-prev" onclick="window.NaturalsApp.prevTourStep()" ${currentTour.step === 1 ? 'disabled style="opacity:0.4;"' : ''}>
              ← Back (B)
            </button>
            <button class="tour-btn tour-btn-next" onclick="window.NaturalsApp.nextTourStep()">
              ${currentTour.step === steps.length ? 'Restart Tour' : 'Next Step (N) →'}
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Simulation Triggers -->
      <div class="presenter-section">
        <div class="presenter-section-title">Live Interactive Simulations</div>
        <div class="sim-actions-list">
          <button class="sim-btn sim-btn-danger" onclick="window.NaturalsApp.sim.simulateLateLeadIncident()">
            <span>⚠️ Simulate: Lead 30m Late</span>
            <span class="pill pill-stop" style="font-size: 9px;">FAILURE CASE</span>
          </button>
          <button class="sim-btn" onclick="window.NaturalsApp.sim.playTheDay()">
            <span>▶ Play Wedding Morning</span>
            <span class="pill pill-live" style="font-size: 9px;">1s / STEP</span>
          </button>
        </div>
      </div>

      <!-- Preset Scenarios -->
      <div class="presenter-section">
        <div class="presenter-section-title">Preset Scenarios</div>
        <select class="scenario-selector" onchange="window.NaturalsApp.store.loadPreset(this.value)">
          <option value="fresh">Fresh Bride (Step 1 Discover)</option>
          <option value="trial-done">Mid-Journey (Trial & Price Locked)</option>
          <option value="wedding-day">Wedding Morning (Live Timeline)</option>
        </select>
        <button class="btn btn-outline btn-block btn-sm" style="color: #EADCF0; border-color: rgba(234,220,240,0.2);" onclick="window.NaturalsApp.store.resetDemo()">
          Reset Demo (Key R)
        </button>
      </div>

      <!-- Keyboard Shortcuts Cheat Sheet -->
      <div class="presenter-section" style="margin-top: auto;">
        <div class="presenter-section-title">Keyboard Shortcuts</div>
        <div class="shortcuts-box">
          <div><kbd>P</kbd> Toggle Presenter Panel</div>
          <div><kbd>N</kbd> / <kbd>B</kbd> Next / Previous Tour Step</div>
          <div><kbd>1</kbd> - <kbd>4</kbd> Switch Roles</div>
          <div><kbd>R</kbd> Reset Demo</div>
        </div>
      </div>
    `;
  }

  function applyTourHighlight(targetSelector) {
    // Remove previous highlights
    document.querySelectorAll(".tour-highlight").forEach(function(el) {
      el.classList.remove("tour-highlight");
    });

    if (!targetSelector) return;

    // Small delay to ensure target DOM is rendered
    setTimeout(function() {
      const el = document.querySelector(targetSelector);
      if (el) {
        el.classList.add("tour-highlight");
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 120);
  }

  window.NaturalsApp.presenter = {
    render: renderPresenterPanel,
    applyTourHighlight: applyTourHighlight
  };
})();
