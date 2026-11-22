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
  let chatDrawerEl = null;
  let deskCallModalEl = null;

  function init() {
    phoneScreenEl = document.getElementById("phone-screen-content");
    phoneContainerEl = document.getElementById("phone-container");
    dashboardContainerEl = document.getElementById("dashboard-container");
    presenterPanelEl = document.getElementById("presenter-panel");
    toastEl = document.getElementById("app-toast");
    aboutModalEl = document.getElementById("about-modal");
    chatDrawerEl = document.getElementById("chat-drawer");
    deskCallModalEl = document.getElementById("desk-call-modal");

    // Initialize sample chat messages
    const curChat = store.getState().chat;
    if (!curChat.messages || curChat.messages.length === 0) {
      store.setState({
        chat: {
          isOpen: false,
          messages: window.NaturalsData.coordinatorChat.slice()
        }
      });
    }

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

    // Render Chat Messages inside Drawer if present
    renderChatMessages(state);
  }

  function renderChatMessages(state) {
    const chatMsgList = document.getElementById("chat-messages-list");
    if (!chatMsgList) return;
    const msgs = state.chat.messages || [];
    chatMsgList.innerHTML = msgs.map(m => `
      <div class="chat-bubble ${m.sender.startsWith('Sneha') ? 'coordinator' : 'bride'}">
        <div style="font-size: 10px; color: ${m.sender.startsWith('Sneha') ? 'var(--purple)' : '#EADCF0'}; font-weight: 700; margin-bottom: 2px;">
          ${m.sender} • ${m.time}
        </div>
        <div>${m.text}</div>
      </div>
    `).join('');
    chatMsgList.scrollTop = chatMsgList.scrollHeight;
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

  window.NaturalsApp.showToast = showToast;

  // Navigation & Role Switching
  window.NaturalsApp.setRole = function(role) {
    store.setState({ role: role });
  };

  window.NaturalsApp.navigateTo = function(screen) {
    store.setState({ role: "bride", brideScreen: screen });
  };

  // Plan Updates
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

  window.NaturalsApp.toggleRefPhoto = function(index) {
    const uploads = (store.getState().plan.refPhotosUploaded || [false, false, false]).slice();
    uploads[index] = !uploads[index];
    store.updatePlan({ refPhotosUploaded: uploads });
    showToast(uploads[index] ? "Reference photo uploaded" : "Photo removed");
  };

  window.NaturalsApp.setAllergies = function(val) {
    store.updatePlan({ allergies: val });
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

  // Hub & Trial
  window.NaturalsApp.selectHub = function(hubId) {
    store.updatePlan({ chosenHubId: hubId });
    showToast("Certified Hub selected.");
  };

  window.NaturalsApp.setHubFilter = function(f) {
    store.setState({ hub: { filter: f } });
  };

  window.NaturalsApp.selectSlot = function(s) {
    store.updatePlan({ chosenSlot: s });
  };

  window.NaturalsApp.setTrialUpi = function(upi) {
    store.updatePlan({ trialUpiId: upi });
  };

  window.NaturalsApp.completeTrialBooking = function() {
    store.updatePlan({ trialPaymentDone: true, trialStatus: "logged" });
    showToast("Trial slot confirmed! ₹1,500 credited to final wedding scope.");
    setTimeout(function() {
      store.setState({ role: "bride", brideScreen: "trial-report" });
    }, 600);
  };

  window.NaturalsApp.redoTrial = function() {
    showToast("Returning to slot selection...");
    store.setState({ role: "bride", brideScreen: "book-trial" });
  };

  window.NaturalsApp.promptAdjustTrial = function() {
    const note = prompt("Enter adjustment for wedding day look (e.g. 'slightly more dewy finish'):", "Slightly warmer foundation undertone for evening muhurat lighting");
    if (note) {
      store.updatePlan({ trialAdjustmentNote: note });
      showToast("Adjustments logged to cloud trial record.");
    }
  };

  window.NaturalsApp.lockTrialAndProceed = function() {
    store.updatePlan({ isPriceLocked: true });
    showToast("Trial look & foundation shade LOCKED!");
    store.setState({ role: "bride", brideScreen: "team" });
  };

  // Contract & Staged Payment (Cross-Role sync to Artist & HQ!)
  window.NaturalsApp.confirmContractAndPay = function() {
    store.updatePlan({ contractPaid: true });
    
    // Cross-role effect: Artist OS gets booking into Confirmed
    const curArtist = store.getState().artist;
    store.setState({
      artist: Object.assign({}, curArtist, {
        bookingAccepted: true,
        capacityUsed: 2
      })
    });

    showToast("Deposit received! Contract issued and team dispatched.");
  };

  // Communication & Chat
  window.NaturalsApp.toggleChatDrawer = function(open) {
    if (chatDrawerEl) {
      chatDrawerEl.classList.toggle("open", open);
    }
  };

  window.NaturalsApp.sendChatMessage = function() {
    const input = document.getElementById("chat-user-input");
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = "";

    const msgs = (store.getState().chat.messages || []).slice();
    msgs.push({
      sender: "You (Bride)",
      time: "Just now",
      text: text
    });
    store.setState({
      chat: {
        isOpen: true,
        messages: msgs
      }
    });

    // Auto coordinator reply simulation
    setTimeout(function() {
      const updatedMsgs = (store.getState().chat.messages || []).slice();
      updatedMsgs.push({
        sender: "Sneha (Coordinator)",
        time: "Just now",
        text: "Noted! I've flagged this in Ananya's Muhurat checklist. We're fully on track."
      });
      store.setState({
        chat: {
          isOpen: true,
          messages: updatedMsgs
        }
      });
    }, 1200);
  };

  window.NaturalsApp.callDeskSimulation = function() {
    if (deskCallModalEl) {
      deskCallModalEl.classList.add("open");
    }
  };

  window.NaturalsApp.closeDeskCall = function() {
    if (deskCallModalEl) {
      deskCallModalEl.classList.remove("open");
    }
  };

  // Review & Proof Submission
  window.NaturalsApp.setReviewRating = function(key, val) {
    const updates = {};
    updates[key] = val;
    store.updateReviewForm(updates);
  };

  window.NaturalsApp.setReviewText = function(val) {
    store.updateReviewForm({ text: val });
  };

  window.NaturalsApp.postVerifiedReview = function() {
    const rf = store.getState().reviewForm;
    const plan = store.getState().plan;

    const newRev = {
      id: "rev-user-" + Date.now(),
      brideName: "You (Verified Bride)",
      weddingDate: "Dec 2026 • " + plan.city.toUpperCase(),
      verifiedContract: plan.receiptNumber,
      ratings: {
        lookedLikeMe: rf.lookedLikeMe,
        teamOnTime: rf.teamOnTime,
        priceMatchedCard: rf.priceMatched
      },
      text: rf.text,
      tag: "VERIFIED",
      photosCount: 2
    };

    const curProof = (store.getState().proofWall || []).slice();
    curProof.unshift(newRev);

    store.setState({
      proofWall: curProof,
      reviewForm: Object.assign({}, rf, { posted: true })
    });

    showToast("Verified review posted to Proof Wall!");
  };

  // Artist OS Actions
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

  window.NaturalsApp.openDeclineModal = function() {
    const cur = store.getState().artist;
    store.setState({ artist: Object.assign({}, cur, { declineModal: true }) });
  };

  window.NaturalsApp.selectDeclineReason = function(r) {
    const cur = store.getState().artist;
    store.setState({ artist: Object.assign({}, cur, { declineReason: r }) });
  };

  window.NaturalsApp.confirmDeclineRequest = function() {
    const cur = store.getState().artist;
    store.setState({
      artist: Object.assign({}, cur, {
        declineModal: false,
        bookingAccepted: false,
        activeTab: "new"
      })
    });
    showToast("Request declined with stated reason.");
  };

  // HQ Dashboard Actions
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
