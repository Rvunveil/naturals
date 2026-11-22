/**
 * Naturals Bridal: Complete 12 Bride Screens Renderer
 * Faithfully implements all screens from Section 3.1 of the case specification.
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function renderBrideScreen(state) {
    const screen = state.brideScreen || "discover";
    const plan = state.plan;
    const priceData = window.NaturalsApp.price.computeBreakdown(plan);
    const reviews = state.proofWall && state.proofWall.length > 0 ? 
      state.proofWall.concat(window.NaturalsData.sampleReviews) : 
      window.NaturalsData.sampleReviews;

    let html = '';

    // ==========================================
    // SCREEN 1: DISCOVER ("The Anti-Directory")
    // ==========================================
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
          <div class="card" style="margin-top: auto; cursor: pointer;" onclick="window.NaturalsApp.navigateTo('proof')">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--soft); text-transform: uppercase;">From Finished Weddings</span>
              <span class="pill pill-sample">SAMPLE</span>
            </div>
            <p style="font-size: 12px; color: var(--ink); font-style: italic;">"Ananya matched the trial look to the exact pin. Having the written backup guarantee let my mother sleep calmly."</p>
            <span style="font-size: 11px; color: var(--purple); font-weight: 600; margin-top: 4px; display: block;">— Harini & Gautham • View all verified proofs →</span>
          </div>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 2: PLAN EVENTS ("Step 1 of 7")
    // ==========================================
    else if (screen === "plan") {
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 1 OF 7</span>
              <span style="color: var(--purple);">EVENT SCOPE</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 15%;"></div>
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

    // ==========================================
    // SCREEN 3: LOOKS AND SKIN
    // ==========================================
    else if (screen === "looks") {
      const tones = ["#F8D9C0", "#E8B896", "#CF9970", "#B2794D", "#7C4C2B"];
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 2 OF 7</span>
              <span style="color: var(--purple);">SKIN & REFERENCES</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 28%;"></div>
            </div>
            <h2 class="screen-title">Looks & Skin Profile</h2>
            <p class="screen-subtitle">Calibrated in salon chair to eliminate wedding morning allergies.</p>
          </div>

          <div class="card">
            <!-- Reference Photo Placeholders -->
            <label style="font-size: 12px; font-weight: 700; color: var(--ink);">REFERENCE LOOKS (UP TO 3)</label>
            <div class="ref-photos-grid">
              ${plan.refPhotos.map((title, i) => `
                <div class="photo-placeholder ${plan.refPhotosUploaded[i] ? 'uploaded' : ''}" onclick="window.NaturalsApp.toggleRefPhoto(${i})">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  <span style="margin-top: 4px;">${plan.refPhotosUploaded[i] ? '✓ ' + title : '+ Add Photo ' + (i+1)}</span>
                </div>
              `).join('')}
            </div>

            <!-- Skin Tone Swatches -->
            <div style="margin-top: 14px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink);">SKIN-TONE PALETTE</label>
              <div class="swatch-picker">
                ${tones.map((color, idx) => `
                  <button class="swatch-btn ${plan.skinTone === (idx+1) ? 'active' : ''}" 
                    style="background: ${color};" 
                    title="Tone ${idx+1}"
                    onclick="window.NaturalsApp.setSkinTone(${idx+1})"></button>
                `).join('')}
              </div>
              <span style="font-size: 11px; color: var(--soft);">Tone selection logs initial foundation range before physical chair test.</span>
            </div>

            <!-- Skin Type Chips -->
            <div style="margin-top: 14px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px; display: block;">SKIN TYPE</label>
              <div class="chip-group">
                ${['Normal', 'Oily', 'Dry', 'Sensitive'].map(st => `
                  <button class="chip ${plan.skinType === st ? 'active' : ''}" onclick="window.NaturalsApp.setSkinType('${st}')">${st}</button>
                `).join('')}
              </div>
            </div>

            <!-- Allergies Input -->
            <div style="margin-top: 14px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink); display: block;">KNOWN ALLERGIES / SENSITIVITIES</label>
              <input type="text" class="upi-input" style="font-family: inherit; font-size: 12px;" 
                placeholder="e.g. Synthetic fragrance, latex sponges, silicone..." 
                value="${plan.allergies}" 
                onchange="window.NaturalsApp.setAllergies(this.value)">
            </div>

            <!-- Look Preference Chips -->
            <div style="margin-top: 14px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px; display: block;">LOOK PREFERENCE</label>
              <div class="chip-group">
                ${['Natural', 'Glam', 'Traditional'].map(lp => `
                  <button class="chip ${plan.lookPreference === lp ? 'active' : ''}" onclick="window.NaturalsApp.setLookPreference('${lp}')">${lp}</button>
                `).join('')}
              </div>
            </div>

            <!-- Patch Test Toggle -->
            <div class="lock-toggle-box" style="margin-top: 16px;">
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

    // ==========================================
    // SCREEN 4: PRICE CARD (Hero Screen)
    // ==========================================
    else if (screen === "price") {
      const isLocked = plan.isPriceLocked;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 3 OF 7</span>
              <span style="color: var(--purple);">ITEMISED SCOPE</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 42%;"></div>
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

          <!-- Not Included Footnote -->
          <div style="font-size: 11px; color: var(--soft); line-height: 1.5; margin-bottom: 16px; padding: 0 4px;">
            <strong>* Not Included:</strong> Venue travel beyond 25 km radius from certified hub (billed at ₹18/km standard transit), pre-wedding chemical hair treatments, or additional unscheduled styling outside contracted headcount.
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('hub')">
            Find Certified Hub & Book Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 5: FIND A HUB (Interactive CSS Map)
    // ==========================================
    else if (screen === "hub") {
      const cityHubs = window.NaturalsData.hubs[plan.city] || window.NaturalsData.hubs.chennai;
      const hubFilter = state.hub && state.hub.filter ? state.hub.filter : "all";
      
      let filteredHubs = cityHubs;
      if (hubFilter === "slots") {
        filteredHubs = cityHubs.filter(h => h.openSlotsCount >= 5);
      } else if (hubFilter === "distance") {
        filteredHubs = cityHubs.slice().sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));
      }

      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 4 OF 7</span>
              <span style="color: var(--purple);">HUB SELECTOR</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 55%;"></div>
            </div>
            <h2 class="screen-title">Find a Certified Hub</h2>
            <p class="screen-subtitle">Trials happen only at certified hubs, ensuring standard daylighting.</p>
          </div>

          <!-- Interactive CSS Map Placeholder -->
          <div class="css-map-container" id="tour-target-trial">
            <div class="map-road" style="top: 40%; left: 0; right: 0; height: 8px;"></div>
            <div class="map-road" style="top: 0; bottom: 0; left: 50%; width: 8px;"></div>
            ${cityHubs.map((hub, i) => `
              <div class="map-pin ${plan.chosenHubId === hub.id ? 'active' : ''}" 
                style="left: ${hub.mapCoords.x}%; top: ${hub.mapCoords.y}%;"
                title="${hub.name}"
                onclick="window.NaturalsApp.selectHub('${hub.id}')">
                ${i+1}
              </div>
            `).join('')}
            <div style="position: absolute; bottom: 8px; left: 10px; font-size: 10px; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 4px; font-weight: 700; color: var(--deep);">
              ${plan.city.toUpperCase()} CERTIFIED HUB MAP
            </div>
          </div>

          <!-- Filters Bar -->
          <div class="hub-filter-bar">
            <button class="chip ${hubFilter === 'all' ? 'active' : ''}" onclick="window.NaturalsApp.setHubFilter('all')">All Hubs</button>
            <button class="chip ${hubFilter === 'slots' ? 'active' : ''}" onclick="window.NaturalsApp.setHubFilter('slots')">Trial slots open</button>
            <button class="chip ${hubFilter === 'distance' ? 'active' : ''}" onclick="window.NaturalsApp.setHubFilter('distance')">Distance</button>
          </div>

          <!-- Hub Cards List -->
          <div>
            ${filteredHubs.map((hub, idx) => `
              <div class="hub-card ${plan.chosenHubId === hub.id ? 'selected' : ''}" onclick="window.NaturalsApp.selectHub('${hub.id}')">
                <div class="hub-name-row">
                  <span>${idx+1}. ${hub.name}</span>
                  <span class="pill pill-locked" style="font-size: 9px;">${hub.distance}</span>
                </div>
                <div class="hub-sub">${hub.address}</div>
                <div style="font-size: 11px; color: var(--purple); margin-top: 6px; font-weight: 600;">
                  Lead: ${hub.leadColorist} • ${hub.chairs} calibrated chairs • ${hub.openSlotsCount} slots open
                </div>
              </div>
            `).join('')}
          </div>

          <button class="btn btn-primary btn-block" style="margin-top: auto;" onclick="window.NaturalsApp.navigateTo('book-trial')">
            Select Slot & Book Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 6: BOOK YOUR TRIAL (Slot & Mock UPI)
    // ==========================================
    else if (screen === "book-trial") {
      const cityHubs = window.NaturalsData.hubs[plan.city] || window.NaturalsData.hubs.chennai;
      const currentHub = cityHubs.find(h => h.id === plan.chosenHubId) || cityHubs[0];
      const slots = currentHub.certifiedSlots;

      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 5 OF 7</span>
              <span style="color: var(--purple);">TRIAL RESERVATION</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 68%;"></div>
            </div>
            <h2 class="screen-title">Book Your Salon Trial</h2>
            <p class="screen-subtitle">${currentHub.name}</p>
          </div>

          <!-- Cancel free banner -->
          <div class="card" style="background: var(--green-light); border: 1px solid var(--green); padding: 10px 14px; margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--green-dark);">✓ Free cancellation up to 24 hours prior</div>
            <div style="font-size: 11px; color: var(--soft); margin-top: 2px;">Trial fee is credited 100% in full when you book the day.</div>
          </div>

          <!-- Trial Artist Card -->
          <div class="team-member-card" style="margin-bottom: 14px;">
            <div class="member-avatar">AM</div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between;">
                <strong>Ananya M.</strong>
                <span class="pill pill-done">CERTIFIED</span>
              </div>
              <div style="font-size: 11px; color: var(--soft);">Naturals Academy Senior Master Artist</div>
              <div style="font-size: 11px; color: var(--purple); font-weight: 600;">Dedicated Trial Specialist</div>
            </div>
          </div>

          <!-- Slot Picker -->
          <div class="card">
            <label style="font-size: 12px; font-weight: 700; color: var(--ink);">AVAILABLE CALIBRATED SLOTS</label>
            <div class="slot-grid">
              ${slots.map(s => `
                <button class="slot-btn ${plan.chosenSlot === s ? 'selected' : ''}" onclick="window.NaturalsApp.selectSlot('${s}')">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Mock UPI Payment Sheet -->
          <div class="upi-sheet-box">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <strong style="font-size: 13px; color: var(--deep);">Trial Session Fee: ₹1,500</strong>
              <span class="pill pill-locked">100% CREDITED</span>
            </div>
            <span style="font-size: 11px; color: var(--soft); display: block; margin-bottom: 8px;">Credited against your final wedding invoice upon confirmation.</span>
            
            <label style="font-size: 11px; font-weight: 700; color: var(--ink);">ENTER UPI ID / CARD (MOCK)</label>
            <input type="text" class="upi-input" value="${plan.trialUpiId}" onchange="window.NaturalsApp.setTrialUpi(this.value)">
            
            <button class="btn btn-accent btn-block btn-sm" style="margin-top: 10px;" onclick="window.NaturalsApp.completeTrialBooking()">
              Confirm Slot & Pay ₹1,500
            </button>
          </div>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 7: TRIAL REPORT (Shade Match & Decision)
    // ==========================================
    else if (screen === "trial-report") {
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">CHAIR TEST COMPLETE</span>
            </div>
            <h2 class="screen-title">Salon Chair Trial Report</h2>
            <p class="screen-subtitle">Logged under calibrated 5000K daylight and strobe flash photography.</p>
          </div>

          <!-- Daylight & Flash Test Placeholders -->
          <div class="trial-photos-grid">
            <div class="photo-placeholder uploaded" style="min-height: 100px;">
              <span style="font-weight: 700; font-size: 12px; color: var(--deep);">5000K Daylight Check</span>
              <span style="font-size: 10px; color: var(--soft); margin-top: 4px;">Zero flashback • Skin match confirmed</span>
            </div>
            <div class="photo-placeholder uploaded" style="min-height: 100px;">
              <span style="font-weight: 700; font-size: 12px; color: var(--deep);">Flash Camera Test</span>
              <span style="font-size: 10px; color: var(--soft); margin-top: 4px;">HD Airbrush base • No white cast</span>
            </div>
          </div>

          <!-- Shade Match Logged Card -->
          <div class="card" style="border: 2px solid var(--purple);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--deep); text-transform: uppercase;">Shade Match Logged</span>
              <span class="pill pill-locked">SAVED TO CLOUD</span>
            </div>

            <div style="background: var(--paper); padding: 12px; border-radius: var(--radius-md); font-size: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span>Foundation Code:</span>
                <strong style="color: var(--purple); font-size: 14px;">${plan.trialShadeCode}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span>Skin Prep Protocol:</span>
                <strong>Hydration serum prep + silicone-free base</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Patch Test Status:</span>
                <strong style="color: var(--green-dark);">Clear (No reaction at 24h)</strong>
              </div>
            </div>

            ${plan.trialAdjustmentNote ? `
              <div style="margin-top: 10px; padding: 8px; background: #FFF9F0; border: 1px solid var(--amber); border-radius: var(--radius-sm); font-size: 11px; color: #8C4700;">
                <strong>Adjustment Requested:</strong> "${plan.trialAdjustmentNote}"
              </div>
            ` : ''}
          </div>

          <!-- Decision Row: Yes, lock it / Adjust / Redo trial -->
          <div class="decision-row">
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.NaturalsApp.redoTrial()">
              Redo trial
            </button>
            <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="window.NaturalsApp.promptAdjustTrial()">
              Adjust
            </button>
            <button class="btn btn-accent btn-sm" style="flex: 1.4;" onclick="window.NaturalsApp.lockTrialAndProceed()">
              Yes, lock it
            </button>
          </div>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 8: TEAM AND BACKUP (Squad & Chat)
    // ==========================================
    else if (screen === "team") {
      const team = window.NaturalsData.team;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 6 OF 7</span>
              <span style="color: var(--purple);">TEAM ASSIGNMENT</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 82%;"></div>
            </div>
            <h2 class="screen-title">Your Assigned Team</h2>
            <p class="screen-subtitle">One dedicated unit with an armed standby backup nearby.</p>
          </div>

          <div id="tour-target-backup">
            <!-- Coordinator Card with Chat Trigger -->
            <div class="team-member-card">
              <div class="member-avatar">${team.coordinator.avatar}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong>${team.coordinator.name}</strong>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 10px;" onclick="window.NaturalsApp.toggleChatDrawer(true)">
                    💬 Chat
                  </button>
                </div>
                <div style="font-size: 11px; color: var(--soft);">${team.coordinator.role}</div>
                <div style="font-size: 11px; color: var(--purple); margin-top: 2px;">Direct: ${team.coordinator.phone}</div>
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

            <!-- Written Contingency Rule -->
            <div class="written-rule-box">
              <strong>The Naturals Contingency Rule:</strong><br>
              "Late 30 min: backup moves in. Cancels: cover in 2 hours, or refund plus credit."
            </div>
          </div>

          <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('pay')">
            Review Contract & Staged Payment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 9: PAY AND CONTRACT
    // ==========================================
    else if (screen === "pay") {
      const isPaid = plan.contractPaid;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="progress-breadcrumb">
              <span>STEP 7 OF 7</span>
              <span style="color: var(--purple);">CONTRACT & PAYMENT</span>
            </div>
            <div class="progress-line-track">
              <div class="progress-line-fill" style="width: 100%;"></div>
            </div>
            <h2 class="screen-title">Contract & Staged Deposit</h2>
            <p class="screen-subtitle">Guaranteed written price card with milestone release.</p>
          </div>

          ${isPaid ? `
            <div class="card" style="background: #E8FBF2; border: 2px solid var(--green); text-align: center; padding: 24px 16px;">
              <span class="pill pill-locked" style="margin-bottom: 8px;">BOOKING CONFIRMED</span>
              <h3 style="font-size: 18px; color: var(--green-dark); margin-bottom: 4px;">Receipt: ${plan.receiptNumber}</h3>
              <p style="font-size: 12px; color: var(--soft); margin-bottom: 12px;">Lead artist Ananya M. and Standby Divya R. locked for Dec 14, 2026.</p>
              
              <button class="btn btn-primary btn-block" onclick="window.NaturalsApp.navigateTo('day')">
                Go to Wedding Day Live Tracker →
              </button>
            </div>
          ` : `
            <!-- Staged Instalments List -->
            <div class="card">
              <h4 style="font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 10px;">Three Staged Instalments</h4>
              ${priceData.instalments.map((inst, i) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border);">
                  <div>
                    <strong style="font-size: 13px; color: var(--ink);">${inst.label}</strong>
                    <div style="font-size: 11px; color: var(--soft);">${inst.note}</div>
                  </div>
                  <strong style="font-size: 14px; color: var(--deep);">₹${inst.amount.toLocaleString("en-IN")}</strong>
                </div>
              `).join('')}
            </div>

            <!-- Agreement Checklist -->
            <div class="card">
              <h4 style="font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 10px;">What You Are Agreeing To</h4>
              
              <label style="display: flex; gap: 8px; font-size: 12px; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" checked disabled>
                <span><strong>Written Scope:</strong> All services and guest headcounts locked as agreed.</span>
              </label>

              <label style="display: flex; gap: 8px; font-size: 12px; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" checked disabled>
                <span><strong>Late Rule:</strong> Late 30 min: standby artist moves in with pre-synced trial notes.</span>
              </label>

              <label style="display: flex; gap: 8px; font-size: 12px; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" checked disabled>
                <span><strong>Cancel Rule:</strong> Cancels: replacement covered in 2h, or full refund plus credit.</span>
              </label>

              <label style="display: flex; gap: 8px; font-size: 12px; cursor: pointer;">
                <input type="checkbox" checked disabled>
                <span><strong>Reschedule Rule:</strong> Reschedule free up to 14 days prior (to be set in pilot).</span>
              </label>
            </div>

            <button class="btn btn-accent btn-block" onclick="window.NaturalsApp.confirmContractAndPay()">
              Pay Deposit (₹${priceData.instalments[0].amount.toLocaleString("en-IN")}) & Issue Contract
            </button>
          `}
        </div>
      `;
    }

    // ==========================================
    // SCREEN 10: WEDDING DAY (Live Timeline)
    // ==========================================
    else if (screen === "day") {
      const tl = state.timeline;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-live">WEDDING MORNING</span>
            </div>
            <h2 class="screen-title">Live Wedding Operations</h2>
            <p class="screen-subtitle">Active desk tracking your Muhurat readiness in real time.</p>
          </div>

          <!-- Live Timeline Track -->
          <div class="timeline-track" id="tour-target-timeline">
            <div class="timeline-node ${tl.currentStep >= 1 ? 'done' : 'active'}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">03:30 AM</div>
              <div class="timeline-title">Central Bridal Desk Confirmed</div>
              <div class="timeline-desc">Artist kits verified, shade NAT-O3 packed.</div>
            </div>

            <div class="timeline-node ${tl.currentStep >= 2 ? 'done' : 'active'}">
              <div class="timeline-dot"></div>
              <div class="timeline-time">05:00 AM</div>
              <div class="timeline-title">Lead Artist Departs / Standby Check</div>
              <div class="timeline-desc">Lead team en route to venue with styling kit.</div>
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

          <!-- Quick Action Buttons -->
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.NaturalsApp.callDeskSimulation()">
              📞 Call Desk
            </button>
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.NaturalsApp.toggleChatDrawer(true)">
              💬 Message Desk
            </button>
          </div>

          <!-- Controls -->
          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="window.NaturalsApp.sim.playTheDay()">
              ▶ Play the Day (Accelerated)
            </button>
            <button class="btn btn-outline btn-sm" style="flex: 1; border-color: var(--amber); color: var(--amber);" onclick="window.NaturalsApp.sim.simulateLateLeadIncident()">
              Simulate: 30m Late
            </button>
          </div>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 11: BACKUP ACTIVATED (Failure Case)
    // ==========================================
    else if (screen === "backup-activated") {
      const tl = state.timeline;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS CONTINGENCY</span>
              <span class="pill ${tl.incident === 'resolved' ? 'pill-locked' : 'pill-stop'}">${tl.incident === 'resolved' ? 'RECOVERED' : 'STANDBY DISPATCHED'}</span>
            </div>
            <h2 class="screen-title">The Failure Case, Designed</h2>
            <p class="screen-subtitle">Lead delayed 30m. Central desk activates standby.</p>
          </div>

          <!-- Emergency Banner -->
          ${tl.incident === 'resolved' ? `
            <div class="incident-box-dispatched" style="background: #E8FBF2; border-color: var(--green);">
              <strong style="color: var(--green-dark); font-size: 13px;">✅ Standby Arrived with Your Trial Notes</strong>
              <span style="font-size: 11px; display: block; color: var(--green-dark); margin-top: 2px;">
                Divya R. arrived on site with foundation shade <code>NAT-O3 Fair Warm</code>. Muhurat timeline fully on schedule.
              </span>
            </div>
          ` : `
            <div class="incident-box-alert">
              <strong style="display: block; font-size: 13px;">⚠️ PROTOCOL TRIGGERED: Lead 30m Late</strong>
              <span style="font-size: 12px;">Lead artist stuck in unexpected arterial blockade. Standby protocol auto-initiated.</span>
            </div>

            <div class="incident-box-dispatched">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 13px;">🚗 Standby Divya R. En Route</strong>
                <span class="pill pill-armed">ETA: ${tl.backupEta} MINS</span>
              </div>
              <span style="font-size: 11px; display: block; margin-top: 4px;">Dispatched from 3.8 km away with your exact trial foundation code NAT-O3.</span>
            </div>
          `}

          <!-- Protection Card with Written Rule -->
          <div class="card" style="border: 2px solid var(--amber); background: #FFFDF9; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="font-size: 13px; color: #8C4700;">Naturals Contingency Guarantee</strong>
              <span class="pill pill-armed">CONTRACT CLAUSE</span>
            </div>
            <p style="font-size: 12px; color: #79430B; font-style: italic;">
              "Late 30 min: backup moves in. Cancels: cover in 2 hours, or refund plus credit."
            </p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.NaturalsApp.sim.simulateLateLeadIncident()">
              Re-run Simulation
            </button>
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.NaturalsApp.navigateTo('review')">
              Proceed to Review & Proof →
            </button>
          </div>
        </div>
      `;
    }

    // ==========================================
    // SCREEN 12: REVIEW AND PROOF (Audited Reviews)
    // ==========================================
    else if (screen === "review" || screen === "proof") {
      const rf = state.reviewForm;
      html = `
        <div class="screen-container">
          <div class="screen-header">
            <div class="brand-badge-top">
              <span class="brand-text">NATURALS BRIDAL</span>
              <span class="pill pill-done">UNVARNISHED PROOF</span>
            </div>
            <h2 class="screen-title">Verified Wedding Reviews</h2>
            <p class="screen-subtitle">Only completed, paid bookings can post. Nothing is deleted or filtered.</p>
          </div>

          <!-- Interactive Review Submission Box -->
          <div class="card" style="border: 2px solid var(--purple);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="font-size: 13px; color: var(--deep);">Post Your Verified Review</strong>
              <span class="pill pill-locked">AUDITED CONTRACT</span>
            </div>

            <div class="star-rating-row">
              <span>Looked like me</span>
              <div class="star-picker">
                ${[1,2,3,4,5].map(star => `
                  <button class="star-btn ${rf.lookedLikeMe >= star ? 'active' : ''}" onclick="window.NaturalsApp.setReviewRating('lookedLikeMe', ${star})">★</button>
                `).join('')}
              </div>
            </div>

            <div class="star-rating-row">
              <span>Team on time</span>
              <div class="star-picker">
                ${[1,2,3,4,5].map(star => `
                  <button class="star-btn ${rf.teamOnTime >= star ? 'active' : ''}" onclick="window.NaturalsApp.setReviewRating('teamOnTime', ${star})">★</button>
                `).join('')}
              </div>
            </div>

            <div class="star-rating-row">
              <span>Price matched the card</span>
              <div class="star-picker">
                ${[1,2,3,4,5].map(star => `
                  <button class="star-btn ${rf.priceMatched >= star ? 'active' : ''}" onclick="window.NaturalsApp.setReviewRating('priceMatched', ${star})">★</button>
                `).join('')}
              </div>
            </div>

            <textarea style="width: 100%; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 8px; font-size: 12px; margin-top: 10px; font-family: inherit;" rows="2" 
              placeholder="Share your experience..." 
              onchange="window.NaturalsApp.setReviewText(this.value)">${rf.text}</textarea>

            <button class="btn btn-accent btn-block btn-sm" style="margin-top: 10px;" onclick="window.NaturalsApp.postVerifiedReview()">
              Post Verified Review to Proof Wall
            </button>
          </div>

          <!-- The Proof Wall -->
          <div id="tour-target-reviews" style="margin-top: 10px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--soft); text-transform: uppercase; margin-bottom: 8px;">
              Audited Customer Reviews (${reviews.length})
            </div>

            ${reviews.map(rev => `
              <div class="review-card">
                <div class="review-header">
                  <strong>${rev.brideName}</strong>
                  <span class="pill pill-sample">${rev.tag || 'VERIFIED'}</span>
                </div>
                <div style="font-size: 11px; color: var(--soft); margin-bottom: 6px;">
                  Contract: <code>${rev.verifiedContract || 'CN-BR-LIVE'}</code> • ${rev.weddingDate}
                </div>
                <div class="rating-score-strip">
                  <span>Looked like me: <strong>${rev.ratings.lookedLikeMe}★</strong></span>
                  <span>On time: <strong>${rev.ratings.teamOnTime}★</strong></span>
                  <span>Price matched: <strong>${rev.ratings.priceMatchedCard || rev.ratings.priceMatched}★</strong></span>
                </div>
                <p style="font-size: 12px; color: var(--ink); margin-top: 8px;">"${rev.text}"</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // ==========================================
    // BOTTOM NAVIGATION BAR (Bride Flow)
    // ==========================================
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
        <button class="nav-tab-btn ${screen === 'hub' || screen === 'book-trial' || screen === 'trial-report' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('hub')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Trial
        </button>
        <button class="nav-tab-btn ${screen === 'team' || screen === 'pay' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('team')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Team
        </button>
        <button class="nav-tab-btn ${screen === 'day' || screen === 'backup-activated' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('day')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Day
        </button>
        <button class="nav-tab-btn ${screen === 'review' || screen === 'proof' ? 'active' : ''}" onclick="window.NaturalsApp.navigateTo('proof')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Proof
        </button>
      </nav>
    `;

    return html;
  }

  window.NaturalsApp.renderBride = renderBrideScreen;
})();
