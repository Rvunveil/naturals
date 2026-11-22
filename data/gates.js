/**
 * Naturals HQ: Four Quantitative Go/Stop Gates & Economic Scenarios
 */
window.NaturalsData = window.NaturalsData || {};

window.NaturalsData.gatesConfig = [
  {
    id: "gate-1",
    name: "Gate 1: Trial Conversion",
    description: "Brides pay for a trial (lead to paid wedding booking)",
    unit: "%",
    higherIsBetter: true,
    goThreshold: 15,
    stopThreshold: 8,
    // Trajectory week 1 to 12
    trajectory: [7, 8, 9, 11, 13, 14, 16, 17, 18, 19, 21, 22]
  },
  {
    id: "gate-2",
    name: "Gate 2: Platform Retention",
    description: "Artist leakage to off-platform bypass",
    unit: "%",
    higherIsBetter: false,
    goThreshold: 30,
    stopThreshold: 50,
    trajectory: [54, 51, 48, 44, 38, 34, 29, 27, 25, 23, 21, 19]
  },
  {
    id: "gate-3",
    name: "Gate 3: Peak-Date Contingency",
    description: "Muhurat day on-time fulfillment rate",
    unit: "%",
    higherIsBetter: true,
    goThreshold: 90,
    stopThreshold: 80,
    trajectory: [78, 81, 84, 87, 89, 92, 94, 95, 96, 97, 98, 98]
  },
  {
    id: "gate-4",
    name: "Gate 4: Hub New Bride Share",
    description: "Share of salon bridal bookings from new-to-brand clients",
    unit: "%",
    higherIsBetter: true,
    goThreshold: 60,
    stopThreshold: 40,
    trajectory: [38, 42, 47, 52, 56, 61, 63, 65, 67, 68, 70, 72]
  }
];

window.NaturalsData.ebitdaScenarios = {
  plan: {
    label: "Plan Case",
    y3Ebitda: "+₹2.5 Cr",
    barHeight: 85,
    isPositive: true,
    notes: "Aggressive adoption across 40 certified hubs; high trial conversion."
  },
  base: {
    label: "Base Case",
    y3Ebitda: "-₹1.9 Cr",
    barHeight: 25,
    isPositive: false,
    notes: "Prudent rollout, steady unit economics, pilot ramp-up buffer."
  },
  low: {
    label: "Low Case (Stress)",
    y3Ebitda: "-₹22.2 Cr",
    barHeight: 95,
    isPositive: false,
    notes: "Displayed transparently to judges: high artist leakage & stop gates triggered."
  }
};
