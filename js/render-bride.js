/**
 * Naturals Bridal: Bride Screens Renderer
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function renderBrideScreen(state) {
    const screen = state.brideScreen || "discover";
    const plan = state.plan;
    const priceData = window.NaturalsApp.price.computeBreakdown(plan);

    let html = '';

    // Screen 1: Discover
    if (screen === "discover") {
      html = `
        <div class="screen-container" id="tour-target-promises">
          <div class="discover-hero">
            <div class="brand-badge-top">
              <span class="brand-text" style="color: var(--green);">NATURALS BRIDAL</span>
              <span class="pill pill-live">2026 PILOT</span>
            </div>
            <h1>Book certainty.</h1>
            <p class="hero-tagline">Brides don't need another directory of makeup artists. They need certainty.</p>

            <div class="promise-list">
              <div class="promise-item">
                <div class="promise-num">1</div>
                <div>
                  <div class="promise-title">Price shown by scope</div>
                  <div class="promise-desc">Exact rate card itemized before booking. Taxes included. Same price on the day in writing.</div>
                </div>
              </div>

              <div class="promise-item">
                <div class="promise-num">2</div>
                <div>
                  <div class="promise-title">A trial in a Naturals chair</div>
                  <div class="promise-desc">Standardized 5000K salon lighting. Foundation shade code logged in our system.</div>
                </div>
              </div>

              <div class="promise-item">
                <div class="promise-num">3</div>
                <div>
                  <div class="promise-title">One coordinated team</div>
                  <div class="promise-desc">One lead artist, hair stylist, draping specialist, and a dedicated desk coordinator.</div>
                </div>
              </div>

              <div class="promise-item">
                <div class="promise-num">4</div>
                <div>
                  <div class="promise-title">A named backup within 20 mins</div>
                  <div class="promise-desc">Late 30 min: backup moves in. Cancels: cover in 2 hours, or refund plus credit.</div>
                </div>
              </div>

              <div class="promise-item">
                <div class="promise-num">5</div>
                <div>
                  <div class="promise-title">Proof from real finished weddings</div>
                  <div class="promise-desc">Only completed, paid bookings can review. Zero filtered or deleted feedback.</div>
                </div>
              </div>
            </div>

            <button class="btn btn-accent btn-block" onclick="window.NaturalsApp.navigateTo('plan')">
              Plan my wedding
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <p style="text-align: center; font-size: 11px; color: var(--lilac); margin-top: 8px;">No payment or login required to see your price.</p>
          </div>

          <!-- Proof teaser strip -->
          <div class="card" style="margin-top: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--soft); text-transform: uppercase;">Finished Weddings Proof</span>
              <span class="pill pill-sample">SAMPLE</span>
            </div>
            <p style="font-size: 12px; color: var(--ink); font-style: italic;">"Ananya matched the trial look to the exact pin. Zero price creep on morning-of."</p>
            <span style="font-size: 11px; color: var(--soft); margin-top: 4px; display: block;">— Harini & Gautham • Chennai (Oct 2026)</span>
          </div>
        </div>
      `;
    }

    // Screen 2: Plan Events
    else if (screen === "plan") {
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">STEP 1 OF 5</span>
            </div>
            <h2 class="screen-title">Plan your wedding scope</h2>
            <p class="screen-subtitle">Select dates, events and guest styling needs.</p>
          </div>

          <div class="card" id="tour-target-events">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
              <div>
                <label style="font-size: 11px; font-weight: 700; color: var(--soft);">CITY</label>
                <select class="scenario-selector" style="margin-top: 4px;" onchange="window.NaturalsApp.setCity(this.value)">
                  <option value="chennai" ${plan.city === 'chennai' ? 'selected' : ''}>Chennai</option>
                  <option value="coimbatore" ${plan.city === 'coimbatore' ? 'selected' : ''}>Coimbatore</option>
                </select>
              </div>
              <div>
                <label style="font-size: 11px; font-weight: 700; color: var(--soft);">WEDDING DATE</label>
                <input type="date" value="${plan.weddingDate}" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--border); font-size: 12px; margin-top: 4px;" onchange="window.NaturalsApp.setDate(this.value)">
              </div>
            </div>

            <!-- Event Toggles -->
            <div class="event-row">
              <div class="event-info">
                <h4>Muhurat Wedding</h4>
                <span>HD Airbrush Base, Hair & Saree Pinning</span>
              </div>
              <div class="event-controls">
                <div class="stepper">
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('wedding', -1)">-</button>
                  <span class="stepper-val">${plan.familyCounts.wedding}</span>
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('wedding', 1)">+</button>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${plan.events.wedding ? 'checked' : ''} onchange="window.NaturalsApp.toggleEvent('wedding', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="event-row">
              <div class="event-info">
                <h4>Evening Reception</h4>
                <span>Glamour Styling & Setting</span>
              </div>
              <div class="event-controls">
                <div class="stepper">
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('reception', -1)">-</button>
                  <span class="stepper-val">${plan.familyCounts.reception}</span>
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('reception', 1)">+</button>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${plan.events.reception ? 'checked' : ''} onchange="window.NaturalsApp.toggleEvent('reception', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="event-row">
              <div class="event-info">
                <h4>Mehendi Ceremony</h4>
                <span>Lightweight Radiant Look</span>
              </div>
              <div class="event-controls">
                <div class="stepper">
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('mehendi', -1)">-</button>
                  <span class="stepper-val">${plan.familyCounts.mehendi}</span>
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('mehendi', 1)">+</button>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${plan.events.mehendi ? 'checked' : ''} onchange="window.NaturalsApp.toggleEvent('mehendi', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="event-row">
              <div class="event-info">
                <h4>Haldi Ritual</h4>
                <span>Minimal Glow & Moisture Fix</span>
              </div>
              <div class="event-controls">
                <div class="stepper">
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('haldi', -1)">-</button>
                  <span class="stepper-val">${plan.familyCounts.haldi}</span>
                  <button class="stepper-btn" onclick="window.NaturalsApp.adjustFamily('haldi', 1)">+</button>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${plan.events.haldi ? 'checked' : ''} onchange="window.NaturalsApp.toggleEvent('haldi', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('looks')">
            Continue to Looks & Skin
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // Screen 3: Looks & Skin
    else if (screen === "looks") {
      const tones = ["#F8D9C0", "#E8B896", "#CF9970", "#B2794D", "#7C4C2B"];
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">STEP 2 OF 5</span>
            </div>
            <h2 class="screen-title">Skin & Look Preferences</h2>
            <p class="screen-subtitle">Calibrated in salon chair to eliminate wedding morning allergies.</p>
          </div>

          <div class="card">
            <label style="font-size: 12px; font-weight: 700; color: var(--ink);">SKIN-TONE PALETTE</label>
            <div class="swatch-picker">
              ${tones.map((color, idx) => `
                <button class="swatch-btn ${plan.skinTone === (idx+1) ? 'active' : ''}" 
                  style="background: ${color};" 
                  onclick="window.NaturalsApp.setSkinTone(${idx+1})"></button>
              `).join('')}
            </div>
            <span style="font-size: 11px; color: var(--soft);">Tone selection logs initial foundation range before physical chair test.</span>

            <div style="margin-top: 16px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 8px; display: block;">SKIN TYPE</label>
              <div class="chip-group">
                ${['Normal', 'Oily', 'Dry', 'Sensitive'].map(st => `
                  <button class="chip ${plan.skinType === st ? 'active' : ''}" onclick="window.NaturalsApp.setSkinType('${st}')">${st}</button>
                `).join('')}
              </div>
            </div>

            <div style="margin-top: 16px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 8px; display: block;">LOOK PREFERENCE</label>
              <div class="chip-group">
                ${['Natural', 'Glam', 'Traditional'].map(lp => `
                  <button class="chip ${plan.lookPreference === lp ? 'active' : ''}" onclick="window.NaturalsApp.setLookPreference('${lp}')">${lp}</button>
                `).join('')}
              </div>
            </div>

            <div class="lock-toggle-box" style="margin-top: 18px;">
              <div>
                <strong style="font-size: 12px; color: var(--ink); display: block;">Patch test before any skin treatment</strong>
                <span style="font-size: 11px; color: var(--soft);">Standard protocol, not an upsell</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${plan.patchTest ? 'checked' : ''} onchange="window.NaturalsApp.togglePatchTest(this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('price')">
            Generate Itemised Price Card
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // Screen 4: Price Card (Hero Screen)
    else if (screen === "price") {
      const isLocked = plan.isPriceLocked;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill ${isLocked ? 'pill-locked' : 'pill-done'}">${isLocked ? 'PRICE LOCKED' : 'STEP 3 OF 5'}</span>
            </div>
            <h2 class="screen-title">Scope-Based Price Card</h2>
            <p class="screen-subtitle">Illustrative rates. Guaranteed in writing when locked.</p>
          </div>

          <!-- Print Header for PDF download -->
          <div class="print-header">
            <h1>NATURALS BRIDAL — WRITTEN SCOPE CONTRACT</h1>
            <p>Date: ${plan.weddingDate} • City: ${plan.city.toUpperCase()} • Status: LOCKED PRICE</p>
          </div>

          <div class="price-hero-card ${isLocked ? 'locked' : ''}" id="tour-target-lock">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; font-weight: 700; color: var(--soft); text-transform: uppercase;">All-in Total (Incl. 18% Taxes)</span>
              ${isLocked ? '<span class="pill pill-locked">LOCKED</span>' : '<span class="pill pill-armed">ESTIMATE</span>'}
            </div>

            <div class="price-total-row">
              <span class="price-total-number" id="price-total-display">₹${priceData.grandTotal.toLocaleString("en-IN")}</span>
              <span style="font-size: 12px; color: var(--soft);">Subtotal: ₹${priceData.subtotal.toLocaleString("en-IN")}</span>
            </div>

            <table class="price-scope-table">
              <tbody>
                ${priceData.items.map(it => `
                  <tr>
                    <td>
                      <div style="font-weight: 600; color: var(--ink);">${it.category}</div>
                      <div style="font-size: 11px; color: var(--soft);">${it.description}</div>
                    </td>
                    <td>${it.amount === 0 ? '<span style="color: var(--green-dark); font-weight: 700;">INCLUDED</span>' : '₹' + it.amount.toLocaleString("en-IN")}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td><strong>GST (18% itemised)</strong></td>
                  <td>₹${priceData.taxAmount.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>

            <div class="lock-toggle-box">
              <div>
                <strong style="font-size: 13px; color: var(--deep); display: block;">Lock this price</strong>
                <span style="font-size: 11px; color: var(--soft);">Same price on the day, in writing. Zero creep.</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${isLocked ? 'checked' : ''} onchange="window.NaturalsApp.togglePriceLock(this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>

            ${isLocked ? `
              <div class="written-guarantee-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Guaranteed: No morning-of renegotiations or hidden travel surcharges.
              </div>
            ` : ''}

            <!-- Download Scope PDF Button -->
            <button class="btn btn-outline btn-block btn-sm" style="margin-top: 12px;" onclick="window.print()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Download scope as PDF (window.print)
            </button>
          </div>

          <!-- Staged Instalments Box -->
          <div class="card">
            <h4 style="font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Staged Payment Schedule</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${priceData.instalments.map(inst => `
                <div style="display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border);">
                  <div>
                    <strong>${inst.label}</strong>
                    <div style="font-size: 10px; color: var(--soft);">${inst.note}</div>
                  </div>
                  <strong style="color: var(--deep);">₹${inst.amount.toLocaleString("en-IN")}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Print footer signoff -->
          <div class="print-footer-signoff">
            <p><strong>Naturals Bridal Guarantee:</strong> Late 30 min: backup moves in. Cancels: cover in 2 hours, or refund plus credit.</p>
            <div style="display: flex; justify-content: space-between; margin-top: 30px;">
              <span>Bride Signature: _______________________</span>
              <span>Naturals Hub Representative: _______________________</span>
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('hub')">
            Book Certified Salon Chair Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // Screen 5: Hub & Trial
    else if (screen === "hub" || screen === "trial") {
      const cityHubs = window.NaturalsData.hubs[plan.city] || window.NaturalsData.hubs.chennai;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">STEP 4 OF 5</span>
            </div>
            <h2 class="screen-title">Certified Hub & Trial</h2>
            <p class="screen-subtitle">Trials happen only at certified hubs, ensuring standard lighting & shade logging.</p>
          </div>

          <div class="card" id="tour-target-trial">
            <label style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 8px; display: block;">SELECT CERTIFIED HUB (${plan.city.toUpperCase()})</label>
            ${cityHubs.map(hub => `
              <div class="hub-card ${plan.chosenHubId === hub.id ? 'selected' : ''}" onclick="window.NaturalsApp.selectHub('${hub.id}')">
                <div class="hub-name-row">
                  <span>${hub.name}</span>
                  <span class="pill pill-locked" style="font-size: 9px;">${hub.distance}</span>
                </div>
                <div class="hub-sub">${hub.address}</div>
                <div style="font-size: 11px; color: var(--purple); margin-top: 6px; font-weight: 600;">
                  Lead Artist: ${hub.leadColorist} • ${hub.chairs} calibrated chairs
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Trial Shade Match Log Card -->
          <div class="card" style="border: 2px solid var(--purple);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--deep); text-transform: uppercase;">Trial Record Logged</span>
              <span class="pill pill-locked">SAVED IN CHAIR</span>
            </div>
            <div style="background: var(--paper); padding: 12px; border-radius: var(--radius-md); font-size: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>Logged Foundation Shade:</span>
                <strong style="color: var(--purple);">${plan.trialShadeCode}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>Skin Prep Notes:</span>
                <strong>Sensitive skin, patch test clear</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Trial Fee (₹1,500):</span>
                <strong style="color: var(--green-dark);">Credited 100% on booking</strong>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('team')">
            View Assigned Team & Named Backup
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // Screen 6: Team & Backup
    else if (screen === "team") {
      const team = window.NaturalsData.team;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">COORDINATED UNIT</span>
            </div>
            <h2 class="screen-title">Your Wedding Squad</h2>
            <p class="screen-subtitle">One dedicated unit with an armed standby backup nearby.</p>
          </div>

          <div id="tour-target-backup">
            <!-- Coordinator -->
            <div class="team-member-card">
              <div class="member-avatar">${team.coordinator.avatar}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <strong>${team.coordinator.name}</strong>
                  <span class="pill pill-done">DESK LEAD</span>
                </div>
                <div style="font-size: 11px; color: var(--soft);">${team.coordinator.role}</div>
                <div style="font-size: 11px; color: var(--purple); margin-top: 2px;">Direct Phone: ${team.coordinator.phone}</div>
              </div>
            </div>

            <!-- Lead Artist -->
            <div class="team-member-card">
              <div class="member-avatar">${team.lead.avatar}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <strong>${team.lead.name}</strong>
                  <span class="pill pill-locked">LEAD ARTIST</span>
                </div>
                <div style="font-size: 11px; color: var(--soft);">${team.lead.academy}</div>
                <div style="font-size: 11px; color: var(--green-dark); margin-top: 2px;">On-time: ${team.lead.onTimeRate} • Looked like me: ${team.lead.lookedLikeMeScore}</div>
              </div>
            </div>

            <!-- Assistants -->
            ${team.assistants.map(asst => `
              <div class="team-member-card">
                <div class="member-avatar">${asst.avatar}</div>
                <div style="flex: 1;">
                  <strong>${asst.name}</strong>
                  <div style="font-size: 11px; color: var(--soft);">${asst.role}</div>
                </div>
              </div>
            `).join('')}

            <!-- Named Standby Backup Card -->
            <div class="team-member-card backup-card">
              <div class="member-avatar" style="background: #FFE8CC; color: #C8731A;">${team.backup.avatar}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: #8C4700;">${team.backup.name}</strong>
                  <span class="pill pill-armed">ARMED STANDBY</span>
                </div>
                <div style="font-size: 11px; color: var(--soft);">${team.backup.role} • ${team.backup.distance}</div>
                <div style="font-size: 11px; color: var(--amber); margin-top: 2px; font-weight: 600;">
                  Trial Shade Synced: ${team.backup.syncedNotes}
                </div>
              </div>
            </div>

            <!-- Written Failure Guarantee Rule -->
            <div class="written-rule-box">
              <strong>The Naturals Contingency Rule:</strong><br>
              "Late 30 min: backup moves in. Cancels: cover in 2 hours, or refund plus credit."
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('day')">
            Open Wedding Day Live Timeline
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // Screen 7: Wedding Day & Live Timeline
    else if (screen === "day") {
      const tl = state.timeline;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-live">LIVE DAY</span>
            </div>
            <h2 class="screen-title">Wedding Morning Live</h2>
            <p class="screen-subtitle">Active coordination desk tracking muhurat schedule.</p>
          </div>

          <!-- Incident State Visuals -->
          ${tl.incident === 'late-alert' ? `
            <div class="incident-box-alert">
              <strong style="display: block; font-size: 13px;">⚠️ PROTOCOL TRIGGERED: Lead 30m Late</strong>
              <span style="font-size: 12px;">Lead artist Ananya delayed in traffic. Bridal desk alerted. Standby protocol activating...</span>
            </div>
          ` : ''}

          ${tl.incident === 'backup-dispatched' ? `
            <div class="incident-box-dispatched">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 13px;">🚗 Standby Divya R. Dispatched</strong>
                <span class="pill pill-armed">ETA: ${tl.backupEta} MINS</span>
              </div>
              <span style="font-size: 11px; display: block; margin-top: 4px;">En route to venue with your logged trial notes (NAT-O3 Fair Warm).</span>
            </div>
          ` : ''}

          ${tl.incident === 'resolved' ? `
            <div class="incident-box-dispatched" style="background: #E8FBF2; border-color: var(--green);">
              <strong style="color: var(--green-dark);">✅ Standby Arrived On-Site</strong>
              <span style="font-size: 11px; display: block; color: var(--green-dark);">Divya is prepping Muhurat makeup with logged shade code. Schedule fully recovered.</span>
            </div>
          ` : ''}

          <!-- Live Timeline Track -->
          <div class="timeline-track" id="tour-target-timeline">
            <div class="timeline-node ${tl.currentStep >= 1 ? 'done' : 'active'}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">03:30 AM</div>
              <div class="timeline-title">Central Bridal Desk Confirmed</div>
              <div class="timeline-desc">Artist kits verified, shade NAT-O3 packed.</div>
            </div>

            <div class="timeline-node ${tl.incident === 'late-alert' ? 'alert' : (tl.currentStep >= 2 ? 'done' : 'active')}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">05:00 AM</div>
              <div class="timeline-title">Lead Artist Departs / Standby Check</div>
              <div class="timeline-desc">${tl.incident === 'late-alert' ? 'DELAY DETECTED in arterial traffic' : 'Lead team en route to venue.'}</div>
            </div>

            <div class="timeline-node ${tl.currentStep >= 3 ? 'done' : ''}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">06:30 AM</div>
              <div class="timeline-title">Bride Styling & Hair Underway</div>
              <div class="timeline-desc">Skin hydration prep and airbrush base.</div>
            </div>

            <div class="timeline-node ${tl.currentStep >= 4 ? 'done' : ''}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">07:30 AM</div>
              <div class="timeline-title">Family Member Styling</div>
              <div class="timeline-desc">Assistant team styles mothers and bridesmaids.</div>
            </div>

            <div class="timeline-node ${tl.currentStep >= 5 ? 'done' : ''}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">09:15 AM</div>
              <div class="timeline-title">Muhurat Look Ready</div>
              <div class="timeline-desc">Final veil pinning & touch-up kit handed to bride.</div>
            </div>
          </div>

          <!-- Simulation Quick Controls -->
          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="window.NaturalsApp.sim.playTheDay()">
              ▶ Play Day (Accelerated)
            </button>
            <button class="btn btn-outline btn-sm" style="flex: 1; border-color: var(--amber); color: var(--amber);" onclick="window.NaturalsApp.sim.simulateLateLeadIncident()">
              Simulate 30m Late
            </button>
          </div>
        </div>
      `;
    }

    // Screen 8: Proof Wall
    else if (screen === "proof") {
      const reviews = window.NaturalsData.sampleReviews;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">AUDITED PROOF</span>
            </div>
            <h2 class="screen-title">Verified Proof Wall</h2>
            <p class="screen-subtitle">Only completed, paid bookings can post. Nothing is deleted or filtered.</p>
          </div>

          <div id="tour-target-reviews">
            ${reviews.map(rev => `
              <div class="review-card">
                <div class="review-header">
                  <strong>${rev.brideName}</strong>
                  <span class="pill pill-sample">${rev.tag}</span>
                </div>
                <div style="font-size: 11px; color: var(--soft); margin-bottom: 6px;">
                  Contract: <code>${rev.verifiedContract}</code> • ${rev.weddingDate}
                </div>
                <div class="rating-score-strip">
                  <span>Looked like me: <strong>${rev.ratings.lookedLikeMe}★</strong></span>
                  <span>On time: <strong>${rev.ratings.teamOnTime}★</strong></span>
                  <span>Price matched: <strong>${rev.ratings.priceMatchedCard}★</strong></span>
                </div>
                <p style="font-size: 12px; color: var(--ink); margin-top: 8px;">"${rev.text}"</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Add Bottom Navigation Bar for Bride Flow
    html += `
      <nav class="bottom-nav">
        <button class="nav-tab-btn ${screen === 'plan' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('plan')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Plan
        </button>
        <button class="nav-tab-btn ${screen === 'price' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('price')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
          Price
        </button>
        <button class="nav-tab-btn ${screen === 'hub' || screen === 'trial' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('hub')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Trial
        </button>
        <button class="nav-tab-btn ${screen === 'team' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('team')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Team
        </button>
        <button class="nav-tab-btn ${screen === 'day' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('day')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Day
        </button>
        <button class="nav-tab-btn ${screen === 'proof' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('proof')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Proof
        </button>
      </nav>
    `;

    return html;
  }

  window.NaturalsApp.renderBride = renderBrideScreen;
})();
