/**
 * Naturals Bridal: Incident Simulation & Day Timeline Engine
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  let simTimer = null;
  let countdownTimer = null;

  function announceAria(msg) {
    const el = document.getElementById("aria-live-announcer");
    if (el) {
      el.textContent = msg;
    }
  }

  function simulateLateLeadIncident() {
    const store = window.NaturalsApp.store;
    
    // Switch to bride day screen if not there
    store.setState({
      role: "bride",
      brideScreen: "day"
    });

    // Step 1: Alert
    store.updateTimeline({
      incident: "late-alert",
      backupEta: 20
    });
    announceAria("Incident alert: Lead artist delayed by 30 minutes in traffic. Standby protocol initiated.");
    window.NaturalsApp.showToast("ALERT: Lead artist delayed 30 min in traffic");

    // Step 2: Auto-dispatch after 1.5 seconds
    if (simTimer) clearTimeout(simTimer);
    simTimer = setTimeout(function() {
      store.updateTimeline({
        incident: "backup-dispatched",
        backupEta: 18
      });
      announceAria("Central desk auto-dispatched standby artist Divya R. with pre-synced shade notes.");
      window.NaturalsApp.showToast("Central Desk dispatched standby artist Divya R.");

      // Step 3: Fast countdown to arrival
      let eta = 18;
      if (countdownTimer) clearInterval(countdownTimer);
      countdownTimer = setInterval(function() {
        eta -= 5;
        if (eta <= 0) {
          clearInterval(countdownTimer);
          store.updateTimeline({
            incident: "resolved",
            backupEta: 0
          });
          announceAria("Standby artist arrived at venue with trial notes. Muhurat look underway on schedule.");
          window.NaturalsApp.showToast("Backup arrived with trial notes! Status returned to GREEN.");
        } else {
          store.updateTimeline({ backupEta: eta });
        }
      }, 900);

    }, 1800);
  }

  function playTheDay() {
    const store = window.NaturalsApp.store;
    store.setState({
      role: "bride",
      brideScreen: "day"
    });

    let step = 1;
    store.updateTimeline({ currentStep: step, incident: "none" });

    const stepInterval = setInterval(function() {
      step++;
      if (step > 5) {
        clearInterval(stepInterval);
        announceAria("Muhurat Look Ready on schedule. Timeline complete.");
        window.NaturalsApp.showToast("Muhurat look ready on time! Wedding day timeline completed.");
      } else {
        store.updateTimeline({ currentStep: step });
        announceAria("Timeline advanced to step " + step);
      }
    }, 1000);
  }

  window.NaturalsApp.sim = {
    simulateLateLeadIncident: simulateLateLeadIncident,
    playTheDay: playTheDay,
    announceAria: announceAria
  };
})();
