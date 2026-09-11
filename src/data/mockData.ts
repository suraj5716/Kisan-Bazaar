import {
  CropLot,
  BuyerRequirement,
  SmartMatch,
  AvailableLot,
  MandiComparisonItem,
  NegotiationItem,
  WarehouseOption,
  RecentActivityItem,
  BuyerProfile
} from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3YQI2tZ5MDgyjmBad7tnReJTMgg7y8tgwJsFmVys9RVZ4y1hXhn8elgxdv0_KjirvRVqeyX6hHUVUA9GY5m6FkZTqIigdNOV1KNFg4LpbOdtAfeZptmQu2FqFw2F9EtZGLLtGw3om55xUEoCFiBa8GWWCp5fhSvSfUvwOn2iilRPgj1hMakVrJ7rt5gtZx1DCtKAXDwtnAUeQiUJrhJsJsaCsiOzfSPtRGeP5Cd547sTVnHJq842-aw',
  farmerHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA_VYhz67fPKG4fjCmA2AnelqvTQ-RjgOJ14oTDQirWv_kRWgqXmc8TOJDSzQ1xP-CervVdsCKB01rBLhQ5DYPkU1wHS7G8LyJOuxlSF9PJsvHwmtKQhwLARd2WeqKYT-O01zYO0HERGm2ds1K9sAHQYUWlB-Z5V5shGTSp68dIq_EoXdy4pNVxKiAtrhFg9-KhxPIFpPhb55POCCpQjsbWYK9WDAPwSyAuLM7Yd0QWuzlLzchpyrZEQ',
  tabletAnalytics: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwaWpSkWBbjfT6M9AR3J4IUDwvkj-j4cqPZYpJ2z1fUFFc-3SVQo1QVpp1t47QhHdfINdy67REoNW9XeSoc7oFQJVkPpCsuCjvH7CEphnVE3F_c84FFWNFYZAxTW-SJMsIzvROkBjP9T5ytqo8-J0UXUEo7bfqaCNTqzL8A70uIXmaKE9rHvlELZ_e70vjekMdIzwybKZU0PfwDt-6wzdNHbmAJrNoWijQco2YcQ71XkhYCyC5Uk67Xg',
  wheatHands: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWrJmr3WPZdHdYr8Mm638FLNwrjSqMmydwo6hJhQ5UMRhgCvYeqPwRUEksrTS1ES_EiYS5N7cDvu9_08UC6Nzt9flN3YeRs4Nef4ji3o-QOIXSZH6NS0PG_o9uEW_e8dzyx9Pl5FDw4TrVDbz0GqlhI54tLxWBrOYN1BSJhKy-u9p980I_ffBIfR3H6UHNcyFMpd4snQq58ru02lGmMh0V61aG-tWYhFZf8WQ4PCYpYfuf6XhGFCCl7w',
  soybeanSacks: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj_2M5qUuB1vK3WmVMRvpCmlPcg9xXSSS_l1AomYLNA9L3yBWYqb5SeaRClT0YMZY1bH7sq9gavqGXrMqfFJ3RIoC9BLtVsCJbZ9BSC_ayEhXjUUXJGj7kvg4YRBsLXoN5vQork56C-OvfxXlQtC-b6ahn-zxW4D0GWQNYZ_2fI3Vj5x-IwCNylDny3zFxcgLKE-_p0tQknTcBeIyXcEukK35FzE6RN7vWSLy6YneXvsDX-O4PJLe-cg',
  logisticsMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhkyEntJQCDqfVVaYbLtaD5-EjM-XiDV5tnfZSAg-pVSKrvZ0JEKlV08JyI28xFMKVHKmpGBGZrthIS8M1jik2szGvyQ14aGTXjCW_kmHPTuElI9Li8UWT491v50ujeCGJB4TYQ9Zy2OiG6D9HZhBiDZEW-tRjNkkBp5DcvdM1-7Ak1ie-ng7QBkdKNvf7I-DwLU6OB_-iZvR_HITdZMJOm4jCTfIQBbPRsgK5iA4i6Bnbq9SGvBbSpg',
  satelliteNashik: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARFb5CfLVybVMazbTugg6WAkLb-pxITIFHunMkUpmOS97Zg0PZXW2rDAHFJ_MCli1S-xHKMfj-w-l0aOzSqhWzcl7RWR07e2L4DAWnCT9fiv-eaGaFCZlJvsVAs7GwgqSl1ci7gg372PhWsSWYX94NYbYUaXow2SfybcMybrZ39h9h0fmV-dpFMRR0fA0tSdQgl7E6Hc3VdZIYSXyLF5zxFM0Y9tVMhfbDBppjL3aI3MLmdq3q5mv76w',
  satelliteSolapur: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB68MR3MFWvwjMxArawD7ApaW3h1MHhSqnH_0p-s4cXCNGnncqQck8rUWEOStSAAERqfXk1k1GKwacZyGIXnEbOxvM54lLLKqBSic05gkJwGwBdaDM_bBUqwwX67XHBXHJbuG3mNv46VdEph6rxYefZKJP5dq4AQ9Z_wEYEJuvdeltzDs3ewvUmbtqyyMqF52gWqYdjCJQnZfklZCjWRGc7_OyVBziHWGj6zlajObhh25lszyufeCrn0Q',
  heatmapMaharashtra: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5hCpzO904Sk1QEPj8Wb9eAK7IWHV0YbC2XZYycaffv9VFhp6w2anve983wj33QpyCyjtZoD8SH_xnBDQZIPxYEk6FFUI7XGnttm5SJ__MgPeKAFZuCsNGZ1edt8UoPddZjBpV3V0tYVDrjzWXuJWeVC11P-ks5pfIJToxa6yRzGFPElQqx5FxaHUpGVthiafhp8SUp95scfkIcHmPEeE1rLVJ3TOxoVCs8SwBDCpwW42_ufV1cU_gEA'
};

export const INITIAL_CROP_LOTS: CropLot[] = [
  {
    id: '#L-4092',
    crop: 'Wheat',
    grade: 'Grade A (Lok-1)',
    quantity: '150 Quintals',
    quantityVal: 150,
    bestOffer: 'â‚¹4,11,000',
    bestOfferRate: 'â‚¹2,740/q',
    status: 'Negotiating (2)',
    farmerName: 'Jai Kumar',
    location: 'Nashik, MH',
    harvestDate: 'Oct 2024',
    moisture: '10.5%'
  },
  {
    id: '#L-4088',
    crop: 'Soybean',
    grade: 'Standard Yellow',
    quantity: '85 Quintals',
    quantityVal: 85,
    bestOffer: 'No offers yet',
    status: 'Published',
    farmerName: 'Jai Kumar',
    location: 'Nashik, MH',
    harvestDate: 'Nov 2024',
    moisture: '9.2%'
  },
  {
    id: '#L-4075',
    crop: 'Basmati Rice',
    grade: 'Pusa 1121 Export',
    quantity: '200 Quintals',
    quantityVal: 200,
    bestOffer: 'â‚¹7,60,000',
    bestOfferRate: 'â‚¹3,800/q',
    status: 'Negotiating (1)',
    farmerName: 'Jai Kumar',
    location: 'Nashik, MH',
    harvestDate: 'Sep 2024',
    moisture: '11.0%'
  },
  {
    id: '#L-4060',
    crop: 'Mustard',
    grade: 'Pusa Bold (>42% Oil)',
    quantity: '60 Quintals',
    quantityVal: 60,
    bestOffer: 'â‚¹3,42,000',
    bestOfferRate: 'â‚¹5,700/q',
    status: 'Published',
    farmerName: 'Jai Kumar',
    location: 'Nashik, MH',
    harvestDate: 'Oct 2024',
    moisture: '8.5%'
  }
];

export interface FarmerIncomingOffer {
  id: string;
  buyerName: string;
  crop: string;
  lotId: string;
  quantity: string;
  offeredRate: number;
  askingRate: number;
  totalValuation: string;
  deliveryLocation: string;
  paymentTerms: string;
  expiresIn: string;
  status: 'Pending Review' | 'Accepted' | 'Declined' | 'Countered';
}

export const INITIAL_FARMER_OFFERS: FarmerIncomingOffer[] = [
  {
    id: 'OFF-1',
    buyerName: 'ITC Agri Procurement',
    crop: 'Wheat Grade A (Lok-1)',
    lotId: '#L-4092',
    quantity: '150 Quintals',
    offeredRate: 2740,
    askingRate: 2750,
    totalValuation: 'â‚¹4,11,000',
    deliveryLocation: 'Nashik APMC Warehouse',
    paymentTerms: '100% Escrow on dock weighment',
    expiresIn: '14 hrs',
    status: 'Pending Review'
  }
];

export const INITIAL_BUYER_REQUIREMENTS: BuyerRequirement[] = [
  {
    id: 'REQ-101',
    title: '10 Tons Grade A Wheat',
    crop: 'Wheat',
    quantity: '10 Tons',
    dueDate: '24 Oct',
    deliveryLocation: 'Mumbai Hub',
    iconType: 'wheat'
  },
  {
    id: 'REQ-102',
    title: '5 Tons Organic Soybeans',
    crop: 'Soybeans',
    quantity: '5 Tons',
    dueDate: '30 Oct',
    deliveryLocation: 'Pune Depot',
    iconType: 'soybean'
  },
  {
    id: 'REQ-103',
    title: '25 Tons Basmati Rice',
    crop: 'Basmati Rice',
    quantity: '25 Tons',
    dueDate: '15 Nov',
    deliveryLocation: 'JNPT Port (Navi Mumbai)',
    iconType: 'rice'
  }
];

export const SMART_MATCHES: SmartMatch[] = [
  {
    id: 'SM-1',
    matchScore: 94,
    title: '12 Tons Premium Sharbati Wheat',
    crop: 'Wheat (Sharbati)',
    seller: 'Ramesh Patil',
    location: 'Nashik, MH',
    distanceKm: 120,
    pricePerQuintal: 2850,
    imageUrl: ASSETS.wheatHands,
    quantity: '120 Quintals'
  },
  {
    id: 'SM-2',
    matchScore: 88,
    title: '6 Tons Non-GMO Soybeans',
    crop: 'Soybean (Non-GMO)',
    seller: 'Sahyadri FPO',
    location: 'Satara, MH',
    distanceKm: 85,
    pricePerQuintal: 4200,
    imageUrl: ASSETS.soybeanSacks,
    quantity: '60 Quintals'
  }
];

export const AVAILABLE_LOTS: AvailableLot[] = [
  {
    id: 'LOT-301',
    crop: 'Basmati Rice (Pusa 1121)',
    quality: 'Moisture <12%',
seller: 'Nashik Farmers Co-op',
    location: 'Nashik, MH',
    volume: '50 MT',
    estPrice: 'â‚¹8,100/q',
    status: 'Verified'
  },
  {
    id: 'LOT-302',
    crop: 'Onions (Red Nashik)',
    quality: 'Grade A, Sorted',
    seller: 'Suresh K.',
    location: 'Lasalgaon, MH',
    volume: '15 MT',
    estPrice: 'â‚¹2,200/q',
    status: 'Ready to Dispatch'
  },
  {
    id: 'LOT-303',
    crop: 'Cotton (MCU-5)',
    quality: 'Staple 30mm+',
    seller: 'Vidarbha Agri FPO',
    location: 'Yavatmal, MH',
    volume: '100 Bales',
    estPrice: 'â‚¹7,400/q',
    status: 'Organic Certified'
  },
  {
    id: 'LOT-304',
    crop: 'Mustard (High Oil)',
    quality: 'Oil content >42%',
    seller: 'Nandurbar Agro',
    location: 'Nandurbar, MH',
    volume: '30 MT',
    estPrice: 'â‚¹5,650/q',
    status: 'Verified'
  }
];

export const FARMER_MANDIS: MandiComparisonItem[] = [
  {
    market: 'Pune APMC Mandi',
    basePrice: 2850,
    distanceKm: 45,
    transportCost: -120,
    netRealization: 2730
  },
  {
    market: 'Nashik APMC Mandi',
    basePrice: 2780,
    distanceKm: 12,
    transportCost: -40,
    netRealization: 2740
  },
  {
    market: 'Lasalgaon APMC Mandi',
    basePrice: 2700,
    distanceKm: 8,
    transportCost: -25,
    netRealization: 2675
  }
];

export const MARKET_INTELLIGENCE_MANDIS: MandiComparisonItem[] = [
  {
    market: 'Nagpur APMC',
    subtext: 'Last updated: 10 mins ago',
    basePrice: 2450,
    distanceKm: 45,
    transportCost: 180,
    demand: 'HIGH',
    netRealization: 2270
  },
  {
    market: 'Solapur Mandi',
    subtext: 'Last updated: 1 hr ago',
    basePrice: 2380,
    distanceKm: 12,
    transportCost: 50,
    demand: 'MED',
    netRealization: 2330
  },
  {
    market: 'Aurangabad Hub (Direct)',
    subtext: 'ITC Choupal',
    basePrice: 2500,
    distanceKm: 60,
    transportCost: 240,
    demand: 'HIGH',
    netRealization: 2260,
    isDirect: true
  }
];

export const INITIAL_NEGOTIATIONS: NegotiationItem[] = [
  {
    id: 'NEG-1',
    cropAndVolume: '8 Tons Maize',
    statusType: 'Counter-Offer',
    partyType: 'Farmer',
    partyName: 'Anil D.',
    bidPrice: 'â‚¹2,150/q'
  },
  {
    id: 'NEG-2',
    cropAndVolume: '20 MT Sugarcane',
    statusType: 'Pending',
    partyType: 'FPO',
    partyName: 'Kisan Mitra',
    bidPrice: 'â‚¹3,100/t'
  }
];

export const WAREHOUSE_OPTIONS: WarehouseOption[] = [
  {
    id: 'WH-1',
    name: 'Kisan Cold Storage',
    distanceKm: 8,
    rating: 4.8,
    tag: 'WDRA Approved',
    costPerQtlMonth: 45.0
  },
  {
    id: 'WH-2',
    name: 'AgriHub Logistics',
    distanceKm: 15,
    rating: 4.2,
    tag: 'Basic Silo',
    costPerQtlMonth: 38.0
  },
  {
    id: 'WH-3',
    name: 'Central Warehouse Corp',
    distanceKm: 22,
    rating: 4.6,
    tag: 'Govt. Bonded',
    costPerQtlMonth: 42.5
  }
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'ACT-1',
    icon: 'verified',
    title: 'Sahyadri Farms FPO registered.',
    meta: 'Dist: Nashik â€¢ 10 mins ago',
    colorType: 'primary'
  },
  {
    id: 'ACT-2',
    icon: 'payments',
    title: 'Large Tx: â‚¹1.2M (Soybean)',
    meta: 'Buyer: Reliance Retail â€¢ 45 mins ago',
    colorType: 'secondary'
  },
  {
    id: 'ACT-3',
    icon: 'trending_down',
    title: 'Alert: Onion prices dropped 15%',
    meta: 'Market: Lasalgaon â€¢ 1 hr ago',
    colorType: 'error'
  },
  {
    id: 'ACT-4',
    icon: 'verified',
    title: 'Ramesh Patil (Farmer) verified.',
    meta: 'Dist: Pune â€¢ 2 hrs ago',
    colorType: 'primary'
  }
];

export const BUYER_PROFILES: BuyerProfile[] = [
  {
    id: 'BP-1',
    name: 'ITC Agri Procurement',
    verified: true,
    transactionCount: 342,
    paymentCompletionRate: 98,
    paymentDelays: 2,
    disputes: 0,
    rating: 4.9
  },
  {
    id: 'BP-2',
    name: 'Reliance Retail Agro',
    verified: true,
    transactionCount: 215,
    paymentCompletionRate: 96,
    paymentDelays: 4,
    disputes: 1,
    rating: 4.7
  },
  {
    id: 'BP-3',
    name: 'Adani Wilmar Agro',
    verified: true,
    transactionCount: 180,
    paymentCompletionRate: 94,
    paymentDelays: 3,
    disputes: 2,
    rating: 4.5
  },
  {
    id: 'BP-4',
    name: 'Sahyadri Farmers Hub',
    verified: true,
    transactionCount: 89,
    paymentCompletionRate: 97,
    paymentDelays: 1,
    disputes: 0,
    rating: 4.8
  }
];

export const FPO_FARMER_LOTS = [
  { farmerName: 'Ramesh Patil', crop: 'Wheat', quantity: 80, quality: 'Grade A', location: 'Nashik, MH' },
  { farmerName: 'Sunil Jadhav', crop: 'Wheat', quantity: 65, quality: 'Grade A', location: 'Nashik, MH' },
  { farmerName: 'Prakash Deshmukh', crop: 'Wheat', quantity: 55, quality: 'Grade A', location: 'Nashik, MH' },
  { farmerName: 'Anil More', crop: 'Wheat', quantity: 90, quality: 'Grade A', location: 'Nashik, MH' },
  { farmerName: 'Vijay Khot', crop: 'Soybean', quantity: 70, quality: 'Standard Yellow', location: 'Satara, MH' },
  { farmerName: 'Mahesh Shinde', crop: 'Soybean', quantity: 50, quality: 'Standard Yellow', location: 'Satara, MH' },
  { farmerName: 'Rajesh Patil', crop: 'Soybean', quantity: 45, quality: 'Standard Yellow', location: 'Satara, MH' },
  { farmerName: 'Sanjay Jadhav', crop: 'Cotton', quantity: 60, quality: 'MCU-5', location: 'Yavatmal, MH' },
  { farmerName: 'Dinesh Barot', crop: 'Cotton', quantity: 40, quality: 'MCU-5', location: 'Yavatmal, MH' },
  { farmerName: 'Kiran Patel', crop: 'Cotton', quantity: 35, quality: 'MCU-5', location: 'Yavatmal, MH' }
];

export const STORAGE_COST_PER_QTL_DAY = 1.5;
export const MANDI_CESS_RATE = 0.01;
export const LOADING_CHARGE_PER_QTL = 15;
