/**
 * Naturals Bridal: Main Controller & App Bootstrap
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  const store = window.NaturalsApp.store;

  // DOM Elements cache
  let phoneScreenEl = null;
  let phoneContainerEl = null;
  let dashboardContainerEl = null;
  let presenterPanelEl = null;
  let toastEl = null;
  let aboutModalEl = null;

  function init() {
    phoneScreenEl = document.getElementById("phone-screen-content");
    phoneContainerEl = document.getElementById("phone-container");
    dashboardContainerEl = document.getElementById("dashboard-container");
    presenterPanelEl = document.getElementById("presenter-panel");
    toastEl = document.getElementById("app-toast");
    aboutModalEl = document.getElementById("about-modal");

    // Subscribe to state changes
    store.subscribe(render);

    // Initial render
    render(store.getState());

    // Setup Keyboard Shortcuts
    setupKeyboardListeners();

    // Setup initial tour highlight if any
    const curState = store.getState();
    const curStep = window.NaturalsData.tourSteps[curState.tour.activeStep - 1];
    if (curStep) {
      window.NaturalsApp.presenter.applyTourHighlight(curStep.target);
    }
  }

  function render(state) {
    const role = state.role;

    // Render Presenter Panel
    if (presenterPanelEl) {
      presenterPanelEl.innerHTML = window.NaturalsApp.presenter.render(state);
    }

    // Role-dependent stage switching
    if (role === "bride") {
      phoneContainerEl.style.display = "flex";
      dashboardContainerEl.style.display = "none";
      phoneScreenEl.innerHTML = window.NaturalsApp.renderBride(state);
    } 
    else if (role === "artist") {
      phoneContainerEl.style.display = "flex";
      dashboardContainerEl.style.display = "none";
      phoneScreenEl.innerHTML = window.NaturalsApp.renderArtist(state);
    } 
    else if (role === "hub") {
      phoneContainerEl.style.display = "none";
      dashboardContainerEl.style.display = "block";
      dashboardContainerEl.innerHTML = window.NaturalsApp.renderHub(state);
    } 
    else if (role === "hq") {
      phoneContainerEl.style.display = "none";
      dashboardContainerEl.style.display = "block";
      dashboardContainerEl.innerHTML = window.NaturalsApp.renderHq(state);
    }
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toastEl.classList.remove("show");
    }, 2500);
  }

  // User Actions
  window.NaturalsApp.showToast = showToast;

  window.NaturalsApp.setRole = function(role) {
    store.setState({ role: role });
  };

  window.NaturalsApp.navigateTo = function(screen) {
    store.setState({ role: "bride", brideScreen: screen });
  };

  window.NaturalsApp.setCity = function(city) {
    const defaultHub = city === "chennai" ? "hub-chennai-1" : "hub-cbe-1";
    store.updatePlan({ city: city, chosenHubId: defaultHub });
  };

  window.NaturalsApp.setDate = function(date) {
    store.updatePlan({ weddingDate: date });
  };

  window.NaturalsApp.toggleEvent = function(evtKey, checked) {
    const currentEvents = Object.assign({}, store.getState().plan.events);
    currentEvents[evtKey] = checked;
    store.updatePlan({ events: currentEvents });
  };

  window.NaturalsApp.adjustFamily = function(evtKey, delta) {
    const currentCounts = Object.assign({}, store.getState().plan.familyCounts);
    const newCount = Math.max(0, (currentCounts[evtKey] || 0) + delta);
    currentCounts[evtKey] = newCount;
    store.updatePlan({ familyCounts: currentCounts });
  };

  window.NaturalsApp.togglePatchTest = function(checked) {
    store.updatePlan({ patchTest: checked });
  };

  window.NaturalsApp.setSkinTone = function(tone) {
    store.updatePlan({ skinTone: tone });
  };

  window.NaturalsApp.setSkinType = function(st) {
    store.updatePlan({ skinType: st });
  };

  window.NaturalsApp.setLookPreference = function(lp) {
    store.updatePlan({ lookPreference: lp });
  };

  window.NaturalsApp.togglePriceLock = function(locked) {
    store.updatePlan({ isPriceLocked: locked });
    showToast(locked ? "Price LOCKED! Guarantee issued in writing." : "Price unlocked to editable estimate.");
  };

  window.NaturalsApp.selectHub = function(hubId) {
    store.updatePlan({ chosenHubId: hubId });
    showToast("Certified Hub selected.");
  };

  window.NaturalsApp.setArtistTab = function(tab) {
    const cur = store.getState().artist;
    store.setState({ artist: Object.assign({}, cur, { activeTab: tab }) });
  };

  window.NaturalsApp.acceptArtistRequest = function() {
    const cur = store.getState().artist;
    store.setState({
      artist: Object.assign({}, cur, {
        bookingAccepted: true,
        capacityUsed: 2,
        activeTab: "confirmed"
      })
    });
    showToast("Booking accepted! Added to confirmed wedding schedule.");
  };

  window.NaturalsApp.declineArtistRequest = function() {
    showToast("Booking request declined.");
  };

  window.NaturalsApp.setPilotWeek = function(val) {
    const cur = store.getState().hq;
    store.setState({ hq: Object.assign({}, cur, { pilotWeek: parseInt(val, 10) }) });
  };

  window.NaturalsApp.setScenario = function(sc) {
    const cur = store.getState().hq;
    store.setState({ hq: Object.assign({}, cur, { scenario: sc }) });
  };

  // Tour Navigation
  window.NaturalsApp.nextTourStep = function() {
    const state = store.getState();
    const steps = window.NaturalsData.tourSteps;
    let nextStepNum = state.tour.activeStep + 1;
    if (nextStepNum > steps.length) {
      nextStepNum = 1;
    }
    goToTourStep(nextStepNum);
  };

  window.NaturalsApp.prevTourStep = function() {
    const state = store.getState();
    let prevStepNum = state.tour.activeStep - 1;
    if (prevStepNum < 1) prevStepNum = 1;
    goToTourStep(prevStepNum);
  };

  function goToTourStep(stepNum) {
    const steps = window.NaturalsData.tourSteps;
    const targetTour = steps[stepNum - 1];
    if (!targetTour) return;

    store.setState({
      role: targetTour.role,
      brideScreen: targetTour.screen,
      tour: {
        activeStep: stepNum,
        isPanelOpen: true
      }
    });

    window.NaturalsApp.presenter.applyTourHighlight(targetTour.target);
  }

  // Presenter Panel & Modals
  window.NaturalsApp.togglePresenterPanel = function() {
    if (presenterPanelEl) {
      presenterPanelEl.classList.toggle("open");
    }
  };

  window.NaturalsApp.showAboutModal = function() {
    if (aboutModalEl) aboutModalEl.classList.add("open");
  };

  window.NaturalsApp.closeAboutModal = function() {
    if (aboutModalEl) aboutModalEl.classList.remove("open");
  };

  // Keyboard Shortcuts Listener
  function setupKeyboardListeners() {
    window.addEventListener("keydown", function(e) {
      // Don't trigger if typing in an input or select
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (key === "P") {
        e.preventDefault();
        window.NaturalsApp.togglePresenterPanel();
      } else if (key === "N") {
        e.preventDefault();
        window.NaturalsApp.nextTourStep();
      } else if (key === "B") {
        e.preventDefault();
        window.NaturalsApp.prevTourStep();
      } else if (key === "R") {
        e.preventDefault();
        store.resetDemo();
      } else if (key === "1") {
        e.preventDefault();
        window.NaturalsApp.setRole("bride");
      } else if (key === "2") {
        e.preventDefault();
        window.NaturalsApp.setRole("artist");
      } else if (key === "3") {
        e.preventDefault();
        window.NaturalsApp.setRole("hub");
      } else if (key === "4") {
        e.preventDefault();
        window.NaturalsApp.setRole("hq");
      }
    });
  }

  // DOM ready hook
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
