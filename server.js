import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';

const app = express();

if (!globalThis.__DATA__) {
  globalThis.__DATA__ = {
    cropLots: [],
    buyerRequirements: [],
    smartMatches: [],
    availableLots: [],
    negotiations: [],
    mandiComparisons: [],
    warehouseOptions: [],
    recentActivities: [],
  };
}

// Initialize with mock data if empty
if (globalThis.__DATA__.cropLots.length === 0) {
  globalThis.__DATA__.cropLots = [
    { id: '#L-4092', crop: 'Wheat', grade: 'Grade A (Lok-1)', quantity: '150 Quintals', quantityVal: 150, bestOffer: '₹4,11,000', bestOfferRate: '₹2,740/q', status: 'Negotiating (2)', farmerName: 'Jai Kumar', location: 'Nashik, MH', harvestDate: 'Oct 2024', moisture: '10.5%' },
    { id: '#L-4088', crop: 'Soybean', grade: 'Standard Yellow', quantity: '85 Quintals', quantityVal: 85, bestOffer: 'No offers yet', status: 'Published', farmerName: 'Jai Kumar', location: 'Nashik, MH', harvestDate: 'Nov 2024', moisture: '9.2%' },
    { id: '#L-4075', crop: 'Basmati Rice', grade: 'Pusa 1121 Export', quantity: '200 Quintals', quantityVal: 200, bestOffer: '₹7,60,000', bestOfferRate: '₹3,800/q', status: 'Negotiating (1)', farmerName: 'Jai Kumar', location: 'Nashik, MH', harvestDate: 'Sep 2024', moisture: '11.0%' },
    { id: '#L-4060', crop: 'Mustard', grade: 'Pusa Bold (>42% Oil)', quantity: '60 Quintals', quantityVal: 60, bestOffer: '₹3,42,000', bestOfferRate: '₹5,700/q', status: 'Published', farmerName: 'Jai Kumar', location: 'Nashik, MH', harvestDate: 'Oct 2024', moisture: '8.5%' }
  ];
  globalThis.__DATA__.buyerRequirements = [
    { id: 'REQ-101', title: '10 Tons Grade A Wheat', crop: 'Wheat', quantity: '10 Tons', dueDate: '24 Oct', deliveryLocation: 'Mumbai Hub', iconType: 'wheat' },
    { id: 'REQ-102', title: '5 Tons Organic Soybeans', crop: 'Soybeans', quantity: '5 Tons', dueDate: '30 Oct', deliveryLocation: 'Pune Depot', iconType: 'soybean' },
    { id: 'REQ-103', title: '25 Tons Basmati Rice', crop: 'Basmati Rice', quantity: '25 Tons', dueDate: '15 Nov', deliveryLocation: 'JNPT Port (Navi Mumbai)', iconType: 'rice' }
  ];
  globalThis.__DATA__.smartMatches = [
    { id: 'SM-1', matchScore: 94, title: '12 Tons Premium Sharbati Wheat', crop: 'Wheat (Sharbati)', seller: 'Ramesh Patil', location: 'Nashik, MH', distanceKm: 120, pricePerQuintal: 2850, imageUrl: '', quantity: '120 Quintals' },
    { id: 'SM-2', matchScore: 88, title: '6 Tons Non-GMO Soybeans', crop: 'Soybean (Non-GMO)', seller: 'Sahyadri FPO', location: 'Satara, MH', distanceKm: 85, pricePerQuintal: 4200, imageUrl: '', quantity: '60 Quintals' }
  ];
  globalThis.__DATA__.availableLots = [
    { id: 'LOT-301', crop: 'Basmati Rice (Pusa 1121)', quality: 'Moisture <12%', seller: 'Nashik Farmers Co-op', location: 'Nashik, MH', volume: '50 MT', estPrice: '₹8,100/q', status: 'Verified' },
    { id: 'LOT-302', crop: 'Onions (Red Nashik)', quality: 'Grade A, Sorted', seller: 'Suresh K.', location: 'Lasalgaon, MH', volume: '15 MT', estPrice: '₹2,200/q', status: 'Ready to Dispatch' },
    { id: 'LOT-303', crop: 'Cotton (MCU-5)', quality: 'Staple 30mm+', seller: 'Vidarbha Agri FPO', location: 'Yavatmal, MH', volume: '100 Bales', estPrice: '₹7,400/q', status: 'Organic Certified' },
    { id: 'LOT-304', crop: 'Mustard (High Oil)', quality: 'Oil content >42%', seller: 'Nandurbar Agro', location: 'Nandurbar, MH', volume: '30 MT', estPrice: '₹5,650/q', status: 'Verified' }
  ];
  globalThis.__DATA__.negotiations = [
    { id: 'NEG-1', cropAndVolume: '8 Tons Maize', statusType: 'Counter-Offer', partyType: 'Farmer', partyName: 'Anil D.', bidPrice: '₹2,150/q' },
    { id: 'NEG-2', cropAndVolume: '20 MT Sugarcane', statusType: 'Pending', partyType: 'FPO', partyName: 'Kisan Mitra', bidPrice: '₹3,100/t' }
  ];
  globalThis.__DATA__.mandiComparisons = [
    { market: 'Pune APMC Mandi', basePrice: 2850, distanceKm: 45, transportCost: -120, netRealization: 2730 },
    { market: 'Nashik APMC Mandi', basePrice: 2780, distanceKm: 12, transportCost: -40, netRealization: 2740 },
    { market: 'Lasalgaon APMC Mandi', basePrice: 2700, distanceKm: 8, transportCost: -25, netRealization: 2675 }
  ];
  globalThis.__DATA__.warehouseOptions = [
    { id: 'WH-1', name: 'Kisan Cold Storage', distanceKm: 8, rating: 4.8, tag: 'WDRA Approved', costPerQtlMonth: 45.0 },
    { id: 'WH-2', name: 'AgriHub Logistics', distanceKm: 15, rating: 4.2, tag: 'Basic Silo', costPerQtlMonth: 38.0 },
    { id: 'WH-3', name: 'Central Warehouse Corp', distanceKm: 22, rating: 4.6, tag: 'Govt. Bonded', costPerQtlMonth: 42.5 }
  ];
  globalThis.__DATA__.recentActivities = [
    { id: 'ACT-1', icon: 'verified', title: 'Sahyadri Farms FPO registered.', meta: 'Dist: Nashik • 10 mins ago', colorType: 'primary' },
    { id: 'ACT-2', icon: 'payments', title: 'Large Tx: ₹1.2M (Soybean)', meta: 'Buyer: Reliance Retail • 45 mins ago', colorType: 'secondary' },
    { id: 'ACT-3', icon: 'trending_down', title: 'Alert: Onion prices dropped 15%', meta: 'Market: Lasalgaon • 1 hr ago', colorType: 'error' },
    { id: 'ACT-4', icon: 'verified', title: 'Ramesh Patil (Farmer) verified.', meta: 'Dist: Pune • 2 hrs ago', colorType: 'primary' }
  ];
}

// API: Crop Lots
app.get('/api/crop-lots', (req, res) => {
  const { status, crop, page = 1, limit = 20 } = req.query;
  let results = globalThis.__DATA__.cropLots;

  if (status) {
    results = results.filter((lot) => lot.status === String(status));
  }
  if (crop) {
    results = results.filter((lot) => lot.crop.toLowerCase().includes(String(crop).toLowerCase()));
  }

  const start = (Number(page) - 1) * Number(limit);
  const paginated = results.slice(start, start + Number(limit));

  res.json({
    success: true,
    data: paginated,
    total: results.length,
    page: Number(page),
    totalPages: Math.ceil(results.length / Number(limit)),
  });
});

app.get('/api/crop-lots/:id', (req, res) => {
  const lot = globalThis.__DATA__.cropLots.find((l) => l.id === req.params.id);
  if (lot) {
    res.json({ success: true, data: lot });
  } else {
    res.status(404).json({ success: false, message: 'Lot not found' });
  }
});

app.post('/api/crop-lots', (req, res) => {
  const lot = req.body;
  lot.id = '#L-' + Date.now().toString().slice(-4);
  lot.quantityVal = Number(lot.quantity);
  lot.bestOfferRate = lot.bestOfferRate || '₹0/q';
  lot.status = 'Published';
  globalThis.__DATA__.cropLots.push(lot);
  res.json({ success: true, data: lot });
});

// API: Buyer Requirements
app.get('/api/buyer-requirements', (req, res) => {
  const { crop, page = 1, limit = 20 } = req.query;
  let results = globalThis.__DATA__.buyerRequirements;

  if (crop) {
    results = results.filter((req) => req.crop.toLowerCase().includes(String(crop).toLowerCase()));
  }

  const start = (Number(page) - 1) * Number(limit);
  const paginated = results.slice(start, start + Number(limit));

  res.json({
    success: true,
    data: paginated,
    total: results.length,
    page: Number(page),
    totalPages: Math.ceil(results.length / Number(limit)),
  });
});

app.post('/api/buyer-requirements', (req, res) => {
  const reqData = req.body;
  reqData.id = 'REQ-' + Date.now().toString().slice(-4);
  globalThis.__DATA__.buyerRequirements.push(reqData);
  res.json({ success: true, data: reqData });
});

// API: Smart Matches
app.get('/api/smart-matches', (req, res) => {
  const { crop, minScore = 0, page = 1, limit = 20 } = req.query;
  let results = globalThis.__DATA__.smartMatches;

  if (crop) {
    results = results.filter((match) => match.crop.toLowerCase().includes(String(crop).toLowerCase()));
  }
  results = results.filter((match) => match.matchScore >= Number(minScore));

  const start = (Number(page) - 1) * Number(limit);
  const paginated = results.slice(start, start + Number(limit));

  res.json({
    success: true,
    data: paginated,
    total: results.length,
    page: Number(page),
    totalPages: Math.ceil(results.length / Number(limit)),
  });
});

// API: Available Lots
app.get('/api/available-lots', (req, res) => {
  const { crop, status, page = 1, limit = 20 } = req.query;
  let results = globalThis.__DATA__.availableLots;

  if (crop) {
    results = results.filter((lot) => lot.crop.toLowerCase().includes(String(crop).toLowerCase()));
  }
  if (status) {
    results = results.filter((lot) => lot.status === String(status));
  }

  const start = (Number(page) - 1) * Number(limit);
  const paginated = results.slice(start, start + Number(limit));

  res.json({
    success: true,
    data: paginated,
    total: results.length,
    page: Number(page),
    totalPages: Math.ceil(results.length / Number(limit)),
  });
});

// API: Negotiations
app.get('/api/negotiations', (req, res) => {
  res.json({
    success: true,
    data: globalThis.__DATA__.negotiations,
  });
});

app.post('/api/negotiations', (req, res) => {
  const negotiation = req.body;
  negotiation.id = 'NEG-' + Date.now().toString().slice(-4);
  globalThis.__DATA__.negotiations.push(negotiation);
  res.json({ success: true, data: negotiation });
});

// API: Mandi Comparisons
app.get('/api/mandi-comparisons', (req, res) => {
  res.json({
    success: true,
    data: globalThis.__DATA__.mandiComparisons,
  });
});

// API: Warehouse Options
app.get('/api/warehouse-options', (req, res) => {
  res.json({
    success: true,
    data: globalThis.__DATA__.warehouseOptions,
  });
});

// API: Recent Activities
app.get('/api/recent-activities', (req, res) => {
  res.json({
    success: true,
    data: globalThis.__DATA__.recentActivities,
  });
});

const server = createServer(app);

server.listen(3001, () => {
  console.log('Kisan Bazaar API running at http://localhost:3001');
});