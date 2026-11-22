/**
 * Naturals Bridal: Illustrative Rate Card
 * All rates are illustrative for the case competition pilot.
 */
window.NaturalsData = window.NaturalsData || {};

window.NaturalsData.rateCard = {
  events: {
    wedding: {
      name: "Muhurat Wedding",
      brideBase: 12000,
      sareeDraping: 1500,
      familyPerPerson: 4500,
      assistantKit: 3500
    },
    reception: {
      name: "Evening Reception",
      brideBase: 9000,
      sareeDraping: 0,
      familyPerPerson: 3500,
      assistantKit: 3500
    },
    mehendi: {
      name: "Mehendi Ceremony",
      brideBase: 4000,
      sareeDraping: 0,
      familyPerPerson: 2500,
      assistantKit: 3500
    },
    haldi: {
      name: "Haldi Ritual",
      brideBase: 3000,
      sareeDraping: 0,
      familyPerPerson: 2500,
      assistantKit: 3500
    }
  },
  taxRate: 0.18, // 18% GST (shown as included)
  trialFee: 1500, // Credited in full upon wedding booking
  backupCoverFee: 0, // Standby named backup included at ₹0
  assistantThreshold: 3 // Party of 3 or more triggers dedicated assistant + touch-up kit
};
