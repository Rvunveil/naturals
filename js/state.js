/**
 * Naturals Bridal: Complete Central State Store
 * Offline-safe with wrapped localStorage try/catch.
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  const STORAGE_KEY = "naturals_bridal_demo_state_v2";

  const defaultState = {
    role: "bride", // 'bride' | 'artist' | 'hub' | 'hq'
    brideScreen: "discover", // 12 screens: 'discover', 'plan', 'looks', 'price', 'hub', 'book-trial', 'trial-report', 'team', 'pay', 'day', 'backup-activated', 'review'
    
    // Bride Planner Configuration
    plan: {
      city: "chennai",
      weddingDate: "2026-12-14",
      events: {
        wedding: true,
        reception: true,
        mehendi: false,
        haldi: false
      },
      familyCounts: {
        wedding: 2,
        reception: 2,
        mehendi: 0,
        haldi: 0
      },
      sareeDraping: true,
      patchTest: true,
      skinTone: 2, // 1 to 5
      skinType: "Sensitive",
      allergies: "Slight sensitivity to synthetic fragrances",
      lookPreference: "Natural",
      refPhotos: ["Traditional Muhurat Look", "Kanjeevaram Pleat", "Pastel Floral Bun"],
      refPhotosUploaded: [true, true, false],
      isPriceLocked: false,
      lockedTotal: 0,
      chosenHubId: "hub-chennai-1",
      chosenSlot: "10:30 AM Tomorrow",
      trialUpiId: "bride@okhdfcbank",
      trialPaymentDone: false,
      trialShadeCode: "NAT-O3 Fair Warm",
      trialStatus: "logged", // 'none', 'booked', 'logged', 'adjusted'
      trialAdjustmentNote: "",
      contractAgreement: {
        writtenScope: true,
        lateRule: true,
        cancelRule: true,
        reschedulePilot: true
      },
      contractPaid: false,
      receiptNumber: "NAT-2026-CN-8821"
    },

    // Wedding Day Live Timeline
    timeline: {
      currentStep: 2,
      incident: "none", // 'none' | 'late-alert' | 'backup-dispatched' | 'resolved'
      backupEta: 20,
      isAutoPlaying: false,
      deskCallActive: false
    },

    // Communication / Chat Drawer
    chat: {
      isOpen: false,
      messages: []
    },

    // Review & Proof Submission
    reviewForm: {
      lookedLikeMe: 5,
      teamOnTime: 5,
      priceMatched: 5,
      text: "Ananya matched the trial look to the exact pin. Zero price creep on morning-of.",
      unfilteredPhotos: ["Ceremony Close-up", "Stage Flash Check"],
      posted: false
    },

    // User-submitted and Sample Proof Wall
    proofWall: [],

    // Artist OS
    artist: {
      activeTab: "new",
      capacityUsed: 1,
      capacityTotal: 2,
      bookingAccepted: false,
      declineModal: false,
      declineReason: ""
    },

    // Hub Owner Portal
    hub: {
      filter: "all" // 'all' | 'slots' | 'distance'
    },

    // HQ Control Room
    hq: {
      pilotWeek: 7,
      scenario: "plan" // 'plan' | 'base' | 'low'
    },

    // Tour & Presenter
    tour: {
      activeStep: 1,
      isPanelOpen: true
    }
  };

  let currentState = loadState();
  const listeners = [];

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.assign({}, defaultState, parsed, {
          plan: Object.assign({}, defaultState.plan, parsed.plan || {}),
          timeline: Object.assign({}, defaultState.timeline, parsed.timeline || {}),
          artist: Object.assign({}, defaultState.artist, parsed.artist || {}),
          hq: Object.assign({}, defaultState.hq, parsed.hq || {}),
          tour: Object.assign({}, defaultState.tour, parsed.tour || {})
        });
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using in-memory state:", e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
  }

  window.NaturalsApp.store = {
    getState: function() {
      return currentState;
    },

    setState: function(updates) {
      currentState = Object.assign({}, currentState, updates);
      saveState();
      listeners.forEach(function(fn) { fn(currentState); });
    },

    updatePlan: function(planUpdates) {
      currentState.plan = Object.assign({}, currentState.plan, planUpdates);
      saveState();
      listeners.forEach(function(fn) { fn(currentState); });
    },

    updateTimeline: function(timelineUpdates) {
      currentState.timeline = Object.assign({}, currentState.timeline, timelineUpdates);
      saveState();
      listeners.forEach(function(fn) { fn(currentState); });
    },

    updateReviewForm: function(reviewUpdates) {
      currentState.reviewForm = Object.assign({}, currentState.reviewForm, reviewUpdates);
      saveState();
      listeners.forEach(function(fn) { fn(currentState); });
    },

    subscribe: function(fn) {
      listeners.push(fn);
      return function() {
        const idx = listeners.indexOf(fn);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    },

    resetDemo: function() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      currentState = JSON.parse(JSON.stringify(defaultState));
      saveState();
      listeners.forEach(function(fn) { fn(currentState); });
      window.NaturalsApp.showToast("Demo reset to clean initial state");
    },

    loadPreset: function(name) {
      if (name === "fresh") {
        this.resetDemo();
      } else if (name === "trial-done") {
        this.setState({
          role: "bride",
          brideScreen: "trial-report",
          plan: Object.assign({}, currentState.plan, {
            isPriceLocked: true,
            trialStatus: "logged",
            trialPaymentDone: true
          })
        });
        window.NaturalsApp.showToast("Scenario loaded: Mid-journey (Trial Done)");
      } else if (name === "wedding-day") {
        this.setState({
          role: "bride",
          brideScreen: "day",
          timeline: {
            currentStep: 2,
            incident: "none",
            backupEta: 20,
            isAutoPlaying: false,
            deskCallActive: false
          }
        });
        window.NaturalsApp.showToast("Scenario loaded: Wedding Day Live");
      }
    }
  };
})();
