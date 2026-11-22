/**
 * Naturals Bridal: Artist OS View Renderer
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function renderArtistScreen(state) {
    const artist = state.artist;
    const tab = artist.activeTab || "new";

    let html = `
      <div class="artist-screen">
        <div class="screen-header">
          <div class="brand-badge-top">
            <span class="brand-text">ARTIST OS</span>
            <span class="pill pill-done">ANANYA M.</span>
          </div>
          <h2 class="screen-title">Bridal Schedule & Capacity</h2>
          <p class="screen-subtitle">Naturals Academy Certified Master Artist</p>
        </div>

        <!-- Peak-Date Capacity Bar -->
        <div class="capacity-meter-box">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <strong style="font-size: 13px; color: var(--ink);">Peak-Date Capacity</strong>
            <span class="pill pill-armed">${artist.capacityUsed} of ${artist.capacityTotal} BOOKINGS USED</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill fill-amber" style="width: ${(artist.capacityUsed / artist.capacityTotal) * 100}%;"></div>
          </div>
          <span style="font-size: 11px; color: var(--soft);">Capped strictly at 2 bookings per auspicious Muhurat date so standby cover holds.</span>
        </div>

        <!-- Tab Pills -->
        <div class="tab-nav-pills">
          <button class="tab-nav-btn ${tab === 'new' ? 'active' : ''}" onclick="window.NaturalsApp.setArtistTab('new')">
            New Requests (1)
          </button>
          <button class="tab-nav-btn ${tab === 'confirmed' ? 'active' : ''}" onclick="window.NaturalsApp.setArtistTab('confirmed')">
            Confirmed (${artist.bookingAccepted ? '2' : '1'})
          </button>
          <button class="tab-nav-btn ${tab === 'earnings' ? 'active' : ''}" onclick="window.NaturalsApp.setArtistTab('earnings')">
            Earnings & Ratings
          </button>
        </div>

        <!-- Tab Content -->
        <div style="flex: 1; overflow-y: auto;">
          ${tab === 'new' ? `
            ${artist.bookingAccepted ? `
              <div class="card" style="text-align: center; padding: 30px 16px;">
                <span class="pill pill-done" style="margin-bottom: 10px;">ALL CAUGHT UP</span>
                <p style="font-size: 13px; color: var(--soft);">No pending new booking requests right now.</p>
              </div>
            ` : `
              <div class="request-card" style="border: 2px solid var(--purple);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span class="request-scope-tag">MUHURAT + RECEPTION</span>
                  <span class="pill pill-stop">PEAK DATE</span>
                </div>
                <h4 style="font-size: 15px; font-weight: 800; color: var(--ink);">Kavya & Siddharth</h4>
                <div style="font-size: 12px; color: var(--soft); margin-bottom: 10px;">Dec 14, 2026 • MRC Nagar, Chennai</div>

                <!-- Scope Details -->
                <div style="background: var(--paper); padding: 10px; border-radius: var(--radius-sm); font-size: 12px; margin-bottom: 12px;">
                  <div>• Bride HD Airbrush Makeup + Floral Pinning</div>
                  <div>• 2 Family Guest Stylings Assigned to Assistant Priya</div>
                  <div>• Trial Foundation Shade: <strong style="color: var(--purple);">NAT-O3 Fair Warm</strong></div>
                  <div>• Patch Test: <strong>Clean (Zero sensitivity)</strong></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: var(--deep); margin-bottom: 12px;">
                  <span>Artist Fee: ₹21,000</span>
                  <span style="color: var(--green-dark);">Deposit: ₹4,200</span>
                </div>

                <div style="font-size: 11px; color: var(--soft); margin-bottom: 12px; font-style: italic;">
                  No pay-to-play fees. Ranking comes directly from verified on-time ratings.
                </div>

                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.NaturalsApp.declineArtistRequest()">Decline</button>
                  <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.NaturalsApp.acceptArtistRequest()">Accept Booking</button>
                </div>
              </div>
            `}
          ` : ''}

          ${tab === 'confirmed' ? `
            <div class="request-card">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span class="pill pill-locked">CONFIRMED</span>
                <span style="font-size: 11px; color: var(--soft);">Dec 08, 2026</span>
              </div>
              <strong style="font-size: 14px; color: var(--ink);">Sneha & Rahul</strong>
              <div style="font-size: 12px; color: var(--soft);">Reception Styling • Leela Palace, Chennai</div>
              <div style="font-size: 12px; color: var(--deep); font-weight: 600; margin-top: 6px;">Payout: ₹14,500 (Deposit received)</div>
            </div>

            ${artist.bookingAccepted ? `
              <div class="request-card" style="border: 2px solid var(--green);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span class="pill pill-locked">CONFIRMED JUST NOW</span>
                  <span style="font-size: 11px; color: var(--soft);">Dec 14, 2026</span>
                </div>
                <strong style="font-size: 14px; color: var(--ink);">Kavya & Siddharth</strong>
                <div style="font-size: 12px; color: var(--soft);">Muhurat + Reception • MRC Nagar</div>
                <div style="font-size: 12px; color: var(--green-dark); font-weight: 600; margin-top: 6px;">Payout: ₹21,000 (Added to schedule)</div>
              </div>
            ` : ''}
          ` : ''}

          ${tab === 'earnings' ? `
            <div class="kpi-card" style="margin-bottom: 12px;">
              <div class="kpi-label">This Month Earnings</div>
              <div class="kpi-value">₹84,200</div>
              <div class="kpi-footnote">Upcoming confirmed payouts: ₹35,500</div>
            </div>

            <div class="card">
              <h4 style="font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Quality & Credibility Score</h4>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
                <span>Muhurat On-Time Rate:</span>
                <strong style="color: var(--green-dark);">98.5%</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
                <span>"Looked Like Me" Score:</span>
                <strong style="color: var(--purple);">4.9 / 5.0</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span>Paid Salon Trial Credits:</span>
                <strong>12 trials logged</strong>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    return html;
  }

  window.NaturalsApp.renderArtist = renderArtistScreen;
})();
