/**
 * Naturals Bridal: Hub Owner & HQ Dashboards Renderer
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function renderHubDashboard(state) {
    return `
      <div class="desktop-dashboard-view">
        <div class="dashboard-header">
          <div class="dashboard-title">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="brand-text">NATURALS FRANCHISE HUB</span>
              <span class="pill pill-done">ANNA NAGAR HUB #04</span>
            </div>
            <h2>Hub Operations & Chair Monetisation</h2>
            <p>Monetising off-peak salon chairs through certified bridal trials.</p>
          </div>
          <div style="text-align: right;">
            <span class="pill pill-locked">CERTIFIED HUB STATUS</span>
            <div style="font-size: 11px; color: var(--soft); margin-top: 4px;">4 Calibrated Daylight Chairs</div>
          </div>
        </div>

        <!-- Zero Fee Banner -->
        <div class="card" style="background: var(--lilac); border: none; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <strong style="color: var(--deep); font-size: 14px;">Franchisee Incentive Guarantee</strong>
            <div style="font-size: 12px; color: var(--soft);">Hub trial bookings carry zero platform deduction fee for franchise owners.</div>
          </div>
          <span class="pill pill-locked" style="background: #FFFFFF;">0% FRANCHISE TAX</span>
        </div>

        <!-- KPI Grid -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Hub Bridal Bookings</div>
            <div class="kpi-value">48</div>
            <div class="kpi-footnote">YTD Pilot Run • Chennai Hub</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">New-to-Brand Brides</div>
            <div class="kpi-value">64%</div>
            <div class="kpi-footnote">First time entering a Naturals salon</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Trial-to-Wedding Conversion</div>
            <div class="kpi-value">31.2%</div>
            <div class="kpi-footnote">Above 15% GO gate threshold</div>
          </div>
          <div class="kpi-card" style="border: 2px solid var(--purple);">
            <div class="kpi-label" style="color: var(--deep);">Annual Hub Contribution</div>
            <div class="kpi-value" style="color: var(--green-dark);">~₹4.5 Lakh</div>
            <div class="kpi-footnote">Base case illustrative model output</div>
          </div>
        </div>

        <!-- Upcoming Trials Table -->
        <div class="card" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 14px;">Upcoming Salon Chair Trials</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border); text-align: left; color: var(--soft);">
                  <th style="padding: 10px 8px;">Date & Time</th>
                  <th style="padding: 10px 8px;">Bride Name</th>
                  <th style="padding: 10px 8px;">Calibrated Chair</th>
                  <th style="padding: 10px 8px;">Assigned Artist</th>
                  <th style="padding: 10px 8px;">Logged Shade Code</th>
                  <th style="padding: 10px 8px;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border);">
                  <td style="padding: 10px 8px;">Tomorrow 10:30 AM</td>
                  <td style="padding: 10px 8px; font-weight: 600;">Kavya S.</td>
                  <td style="padding: 10px 8px;">Chair 2 (5000K daylight)</td>
                  <td style="padding: 10px 8px;">Ananya M.</td>
                  <td style="padding: 10px 8px;"><code style="background: var(--paper); padding: 2px 6px; border-radius: 4px;">NAT-O3 Warm</code></td>
                  <td style="padding: 10px 8px;"><span class="pill pill-locked">CONFIRMED</span></td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border);">
                  <td style="padding: 10px 8px;">Tomorrow 02:00 PM</td>
                  <td style="padding: 10px 8px; font-weight: 600;">Meera R.</td>
                  <td style="padding: 10px 8px;">Chair 1 (Flash testing)</td>
                  <td style="padding: 10px 8px;">Kavitha R.</td>
                  <td style="padding: 10px 8px;"><code style="background: var(--paper); padding: 2px 6px; border-radius: 4px;">NAT-M2 Olive</code></td>
                  <td style="padding: 10px 8px;"><span class="pill pill-done">READY</span></td>
                </tr>
                <tr>
                  <td style="padding: 10px 8px;">Saturday 11:00 AM</td>
                  <td style="padding: 10px 8px; font-weight: 600;">Pooja V.</td>
                  <td style="padding: 10px 8px;">Chair 4 (Daylight)</td>
                  <td style="padding: 10px 8px;">Deepa S.</td>
                  <td style="padding: 10px 8px;"><em>Pending Chair Test</em></td>
                  <td style="padding: 10px 8px;"><span class="pill pill-armed">SLOT RESERVED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function renderHqDashboard(state) {
    const hq = state.hq;
    const week = hq.pilotWeek;
    const gates = window.NaturalsData.gatesConfig;
    const scenarios = window.NaturalsData.ebitdaScenarios;
    const curScenario = scenarios[hq.scenario] || scenarios.plan;

    // Evaluate Gates status at current week
    let stoppedGateCount = 0;
    const evaluatedGates = gates.map(function(gate) {
      const val = gate.trajectory[week - 1];
      let status = "watch"; // 'go', 'watch', 'stop'

      if (gate.higherIsBetter) {
        if (val >= gate.goThreshold) status = "go";
        else if (val < gate.stopThreshold) {
          status = "stop";
          stoppedGateCount++;
        }
      } else {
        if (val <= gate.goThreshold) status = "go";
        else if (val > gate.stopThreshold) {
          status = "stop";
          stoppedGateCount++;
        }
      }

      return {
        id: gate.id,
        name: gate.name,
        desc: gate.description,
        currentVal: val,
        unit: gate.unit,
        goThresh: gate.goThreshold,
        stopThresh: gate.stopThreshold,
        status: status
      };
    });

    const isTrancheFrozen = stoppedGateCount > 0;

    return `
      <div class="desktop-dashboard-view">
        <div class="dashboard-header">
          <div class="dashboard-title">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="brand-text">NATURALS HQ</span>
              <span class="pill pill-done">EXECUTIVE CONTROL ROOM</span>
            </div>
            <h2>Pilot Governance & Tranche Control</h2>
            <p>Deploying ₹3.0 Cr capital across 40 hubs and 300 artists with hard Go/Stop gates.</p>
          </div>
          <div style="text-align: right;">
            ${isTrancheFrozen ? 
              '<span class="pill pill-stop">TRANCHE 2 FROZEN</span>' : 
              '<span class="pill pill-locked">TRANCHE 1 ON TRACK</span>'
            }
            <div style="font-size: 11px; color: var(--soft); margin-top: 4px;">Pilot Progression: Week ${week} of 12</div>
          </div>
        </div>

        <!-- Tranche Warning Banner if any gate is STOP -->
        ${isTrancheFrozen ? `
          <div class="card" style="background: var(--red-light); border: 2px solid var(--red); padding: 14px 20px; margin-bottom: 20px;">
            <strong style="color: var(--red); font-size: 14px;">⚠️ CAPITAL PRESERVATION ACTIVATED: Tranche 2 Frozen</strong>
            <div style="font-size: 12px; color: #73130F; margin-top: 2px;">
              One or more operational gates hit the STOP threshold. Naturals balance sheet is protected until metrics recover.
            </div>
          </div>
        ` : ''}

        <!-- Top KPIs -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Certified Hubs Live</div>
            <div class="kpi-value">40 / 40</div>
            <div class="kpi-footnote">Chennai & Coimbatore Hubs</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Certified Artists</div>
            <div class="kpi-value">300 / 300</div>
            <div class="kpi-footnote">Naturals Academy Trained</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Capital Committed</div>
            <div class="kpi-value">₹1.0 Cr / ₹3.0 Cr</div>
            <div class="kpi-footnote">${isTrancheFrozen ? 'Tranche 2 on hold' : 'Tranche 2 ready for release'}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Gates in GO Status</div>
            <div class="kpi-value" style="color: ${isTrancheFrozen ? 'var(--red)' : 'var(--green-dark)'};">
              ${evaluatedGates.filter(g => g.status === 'go').length} / 4
            </div>
            <div class="kpi-footnote">${stoppedGateCount > 0 ? stoppedGateCount + ' gate(s) hitting STOP' : 'All gates healthy'}</div>
          </div>
        </div>

        <!-- Pilot Week Progression Slider -->
        <div class="sim-slider-box">
          <div class="sim-slider-header">
            <h4>Simulate Pilot Progression: Week ${week} of 12</h4>
            <span class="pill pill-done">${week <= 4 ? 'EARLY ROLLOUT' : (week <= 8 ? 'MID PILOT' : 'MATURE SCALE')}</span>
          </div>
          <input type="range" class="sim-range-input" min="1" max="12" value="${week}" oninput="window.NaturalsApp.setPilotWeek(this.value)">
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--soft); margin-top: 6px;">
            <span>Week 1 (Launch)</span>
            <span>Week 6 (Mid-Checkpoint)</span>
            <span>Week 12 (Scale Evaluation)</span>
          </div>
        </div>

        <!-- Four Quantitative Go/Stop Gates -->
        <div class="gates-grid" id="tour-target-gates">
          ${evaluatedGates.map(gate => `
            <div class="gate-card gate-${gate.status}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="gate-name">${gate.name}</span>
                <span class="pill pill-${gate.status === 'go' ? 'locked' : (gate.status === 'watch' ? 'armed' : 'stop')}">${gate.status.toUpperCase()}</span>
              </div>
              <p style="font-size: 11px; color: var(--soft); margin-bottom: 10px;">${gate.desc}</p>
              
              <div class="gate-metric-row">
                <span class="gate-current-val">${gate.currentVal}${gate.unit}</span>
                <span style="font-size: 11px; color: var(--soft);">
                  Threshold: ${gate.status === 'go' ? '>= ' + gate.goThresh : '< ' + gate.stopThresh}${gate.unit}
                </span>
              </div>

              <div class="progress-bar-bg">
                <div class="progress-bar-fill fill-${gate.status === 'go' ? 'green' : (gate.status === 'watch' ? 'amber' : 'red')}" 
                  style="width: ${Math.min(100, Math.max(10, gate.currentVal))}%;"></div>
              </div>

              <div class="gate-thresholds">
                <span style="color: var(--green-dark);">GO: ${gate.goThresh}${gate.unit}</span>
                <span style="color: var(--red);">STOP: ${gate.stopThresh}${gate.unit}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Year-3 EBITDA Scenario Toggle -->
        <div class="scenario-box">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <h3 style="font-size: 16px; font-weight: 800; color: var(--ink);">Year-3 EBITDA Economic Model</h3>
              <p style="font-size: 12px; color: var(--soft);">Illustrative financial outputs across 40 hubs. The low case is shown transparently to judges.</p>
            </div>
            <span class="pill pill-sample">ILLUSTRATIVE</span>
          </div>

          <div class="scenario-pills">
            <button class="scenario-pill-btn ${hq.scenario === 'plan' ? 'active' : ''}" onclick="window.NaturalsApp.setScenario('plan')">Plan Case (+₹2.5 Cr)</button>
            <button class="scenario-pill-btn ${hq.scenario === 'base' ? 'active' : ''}" onclick="window.NaturalsApp.setScenario('base')">Base Case (-₹1.9 Cr)</button>
            <button class="scenario-pill-btn ${hq.scenario === 'low' ? 'active' : ''}" onclick="window.NaturalsApp.setScenario('low')">Low Case Stress (-₹22.2 Cr)</button>
          </div>

          <div class="scenario-bar-container">
            <div class="scenario-bar-col">
              <span class="bar-val-label" style="color: var(--green-dark);">+₹2.5 Cr</span>
              <div class="bar-rect positive" style="height: 80px; opacity: ${hq.scenario === 'plan' ? '1' : '0.4'};"></div>
              <span class="bar-title">Plan Case</span>
            </div>
            <div class="scenario-bar-col">
              <span class="bar-val-label" style="color: var(--red);">-₹1.9 Cr</span>
              <div class="bar-rect negative" style="height: 30px; opacity: ${hq.scenario === 'base' ? '1' : '0.4'};"></div>
              <span class="bar-title">Base Case</span>
            </div>
            <div class="scenario-bar-col">
              <span class="bar-val-label" style="color: var(--red);">-₹22.2 Cr</span>
              <div class="bar-rect negative" style="height: 100px; opacity: ${hq.scenario === 'low' ? '1' : '0.4'};"></div>
              <span class="bar-title">Low Stress Case</span>
            </div>
          </div>

          <div style="margin-top: 14px; font-size: 12px; color: var(--soft);">
            <strong>Selected Case:</strong> ${curScenario.notes}
          </div>
        </div>
      </div>
    `;
  }

  window.NaturalsApp.renderHub = renderHubDashboard;
  window.NaturalsApp.renderHq = renderHqDashboard;
})();
