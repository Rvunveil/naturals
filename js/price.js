/**
 * Naturals Bridal: Price Calculation Engine
 * Recomputes live with 18% GST and staged instalment schedule.
 */
window.NaturalsApp = window.NaturalsApp || {};

(function() {
  function computeBreakdown(plan) {
    const rc = window.NaturalsData.rateCard;
    const items = [];
    let subtotal = 0;

    const events = plan.events || {};
    const familyCounts = plan.familyCounts || {};

    Object.keys(rc.events).forEach(function(evtKey) {
      if (!events[evtKey]) return;

      const evtCfg = rc.events[evtKey];
      const count = familyCounts[evtKey] || 0;
      const totalPeople = 1 + count; // Bride + family

      // Bride styling
      items.push({
        event: evtCfg.name,
        category: "Bride Makeup & Hair",
        amount: evtCfg.brideBase,
        description: "HD airbrush base, hair styling & setting"
      });
      subtotal += evtCfg.brideBase;

      // Saree draping (Wedding only)
      if (evtKey === "wedding" && plan.sareeDraping) {
        items.push({
          event: evtCfg.name,
          category: "Saree Draping",
          amount: evtCfg.sareeDraping,
          description: "Traditional box-pleat & iron pinning"
        });
        subtotal += evtCfg.sareeDraping;
      }

      // Family member styling
      if (count > 0) {
        const famAmt = count * evtCfg.familyPerPerson;
        items.push({
          event: evtCfg.name,
          category: "Family Member Styling (" + count + " guest" + (count > 1 ? "s" : "") + ")",
          amount: famAmt,
          description: "₹" + evtCfg.familyPerPerson.toLocaleString("en-IN") + " per guest"
        });
        subtotal += famAmt;
      }

      // Assistant + touch-up kit
      if (totalPeople >= rc.assistantThreshold) {
        items.push({
          event: evtCfg.name,
          category: "Dedicated Assistant & Touch-up Kit",
          amount: evtCfg.assistantKit,
          description: "Auto-included for parties of 3+ to protect timeline"
        });
        subtotal += evtCfg.assistantKit;
      }
    });

    // Contingency Standby Backup
    items.push({
      event: "All Events",
      category: "Named Standby Backup Artist",
      amount: 0,
      description: "Guaranteed standby cover within 20 mins"
    });

    const taxAmount = Math.round(subtotal * rc.taxRate);
    const grandTotal = subtotal + taxAmount;

    // 3 Staged Instalments
    const instalments = [
      {
        label: "On Booking (20%)",
        amount: Math.round(grandTotal * 0.20),
        status: "Due on confirmation",
        note: "Locks date, assigned lead & named backup"
      },
      {
        label: "2 Weeks Before (60%)",
        amount: Math.round(grandTotal * 0.60),
        status: "Due 14 days before event",
        note: "Dispatches assistant team and preps styling kit"
      },
      {
        label: "After the Event (20%)",
        amount: Math.round(grandTotal * 0.20),
        status: "Due after Muhurat signoff",
        note: "Released only after satisfactory completion"
      }
    ];

    return {
      items: items,
      subtotal: subtotal,
      taxAmount: taxAmount,
      grandTotal: grandTotal,
      instalments: instalments
    };
  }

  // Count-up animation helper for numbers
  function animateValue(element, start, end, duration) {
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = "₹" + end.toLocaleString("en-IN");
      return;
    }
    const range = end - start;
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / (range || 1)));
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function run() {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - (remaining * range));
      element.textContent = "₹" + value.toLocaleString("en-IN");
      if (value !== end) {
        requestAnimationFrame(run);
      }
    }
    requestAnimationFrame(run);
  }

  window.NaturalsApp.price = {
    computeBreakdown: computeBreakdown,
    animateValue: animateValue
  };
})();
