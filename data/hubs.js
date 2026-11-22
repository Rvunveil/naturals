/**
 * Certified Hubs in Chennai & Coimbatore with Map Coordinate Data
 */
window.NaturalsData = window.NaturalsData || {};

window.NaturalsData.hubs = {
  chennai: [
    {
      id: "hub-chennai-1",
      name: "Naturals Signature Anna Nagar",
      distance: "2.1 km away",
      address: "2nd Avenue, Anna Nagar West, Chennai",
      certifiedSlots: ["10:30 AM Tomorrow", "02:00 PM Tomorrow", "11:00 AM Saturday", "04:30 PM Saturday"],
      chairs: 4,
      leadColorist: "Kavitha R.",
      openSlotsCount: 6,
      mapCoords: { x: 38, y: 32 } // Percentage for CSS map pin
    },
    {
      id: "hub-chennai-2",
      name: "Naturals Lounge T. Nagar",
      distance: "4.6 km away",
      address: "GN Chetty Road, T. Nagar, Chennai",
      certifiedSlots: ["01:00 PM Tomorrow", "04:30 PM Tomorrow", "10:00 AM Sunday", "03:00 PM Sunday"],
      chairs: 6,
      leadColorist: "Deepa S.",
      openSlotsCount: 8,
      mapCoords: { x: 55, y: 58 }
    },
    {
      id: "hub-chennai-3",
      name: "Naturals Premium Adyar",
      distance: "7.9 km away",
      address: "Gandhi Nagar, Adyar, Chennai",
      certifiedSlots: ["11:30 AM Tomorrow", "03:00 PM Friday", "05:00 PM Saturday"],
      chairs: 3,
      leadColorist: "Meena K.",
      openSlotsCount: 4,
      mapCoords: { x: 68, y: 82 }
    }
  ],
  coimbatore: [
    {
      id: "hub-cbe-1",
      name: "Naturals Signature RS Puram",
      distance: "1.8 km away",
      address: "DB Road, RS Puram, Coimbatore",
      certifiedSlots: ["11:00 AM Tomorrow", "03:30 PM Saturday", "10:00 AM Sunday"],
      chairs: 4,
      leadColorist: "Swathi M.",
      openSlotsCount: 5,
      mapCoords: { x: 42, y: 45 }
    },
    {
      id: "hub-cbe-2",
      name: "Naturals Lounge Peelamedu",
      distance: "5.2 km away",
      address: "Avinashi Road, Peelamedu, Coimbatore",
      certifiedSlots: ["02:00 PM Tomorrow", "10:30 AM Sunday", "04:00 PM Sunday"],
      chairs: 5,
      leadColorist: "Lakshmi V.",
      openSlotsCount: 7,
      mapCoords: { x: 70, y: 35 }
    },
    {
      id: "hub-cbe-3",
      name: "Naturals Premium Race Course",
      distance: "3.4 km away",
      address: "Race Course Road, Coimbatore",
      certifiedSlots: ["12:00 PM Tomorrow", "04:00 PM Friday", "02:30 PM Saturday"],
      chairs: 3,
      leadColorist: "Nandhini P.",
      openSlotsCount: 4,
      mapCoords: { x: 52, y: 65 }
    }
  ]
};

// Hub League Table for HQ
window.NaturalsData.hubLeague = [
  { rank: 1, name: "Anna Nagar Hub (Chennai)", bookings: 48, conversion: "34.2%", onTime: "99.1%", rating: "4.94★", status: "STAR HUB" },
  { rank: 2, name: "RS Puram Hub (Coimbatore)", bookings: 42, conversion: "31.8%", onTime: "98.5%", rating: "4.91★", status: "STAR HUB" },
  { rank: 3, name: "T. Nagar Lounge (Chennai)", bookings: 39, conversion: "29.4%", onTime: "97.8%", rating: "4.88★", status: "ON TRACK" },
  { rank: 4, name: "Peelamedu Hub (Coimbatore)", bookings: 34, conversion: "28.0%", onTime: "97.2%", rating: "4.85★", status: "ON TRACK" },
  { rank: 5, name: "Adyar Premium (Chennai)", bookings: 27, conversion: "26.5%", onTime: "96.9%", rating: "4.82★", status: "WATCH" }
];

// Canned Chat Messages with Desk Coordinator
window.NaturalsData.coordinatorChat = [
  { sender: "Sneha (Coordinator)", time: "Yesterday 04:30 PM", text: "Namaste! I'm Sneha, your Naturals Bridal Desk Coordinator. I have logged your booking for Dec 14." },
  { sender: "Sneha (Coordinator)", time: "Yesterday 04:31 PM", text: "Ananya M. has received your NAT-O3 shade code and sensitive skin notes. Standby artist Divya R. is also locked 3.8 km from your venue." },
  { sender: "Sneha (Coordinator)", time: "10:15 AM Today", text: "What time does your photographer arrive on Muhurat morning? We will ensure the bride look is ready 30 mins prior." }
];
