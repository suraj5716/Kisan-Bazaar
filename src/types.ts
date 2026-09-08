export type ScreenTab =
  | 'landing'
  | 'farmer-dashboard'
  | 'fpo-dashboard'
  | 'buyer-dashboard'
  | 'admin-dashboard';

export type FarmerSubTab =
  | 'overview'
  | 'my-lots'
  | 'market-intelligence'
  | 'price-forecast'
  | 'sale-timing'
  | 'buyer-matches'
  | 'offers'
  | 'logistics';

export interface CropLot {
  id: string;
  crop: string;
  grade: string;
  quantity: string;
  quantityVal: number;
  bestOffer: string;
  bestOfferRate?: string;
  status: 'Published' | 'Negotiating (2)' | 'Negotiating (1)' | 'Under Review' | 'Sold';
  farmerName?: string;
  location?: string;
  harvestDate?: string;
  moisture?: string;
}

export interface BuyerRequirement {
  id: string;
  title: string;
  crop: string;
  quantity: string;
  dueDate: string;
  deliveryLocation: string;
  iconType: 'wheat' | 'soybean' | 'corn' | 'rice';
}

export interface SmartMatch {
  id: string;
  matchScore: number;
  title: string;
  crop: string;
  seller: string;
  location: string;
  distanceKm: number;
  pricePerQuintal: number;
  imageUrl: string;
  quantity: string;
}

export interface AvailableLot {
  id: string;
  crop: string;
  quality: string;
  seller: string;
  location: string;
  volume: string;
  estPrice: string;
  status?: string;
}

export interface MandiComparisonItem {
  market: string;
  basePrice: number;
  distanceKm: number;
  transportCost: number;
  netRealization: number;
  demand?: 'HIGH' | 'MED' | 'LOW';
  lastUpdated?: string;
  isDirect?: boolean;
  isBestChoice?: boolean;
  subtext?: string;
}

export interface NegotiationItem {
  id: string;
  cropAndVolume: string;
  statusType: 'Counter-Offer' | 'Pending' | 'Accepted' | 'Declined';
  partyType: 'Farmer' | 'FPO';
  partyName: string;
  bidPrice: string;
}

export interface WarehouseOption {
  id: string;
  name: string;
  distanceKm: number;
  rating: number;
  tag: string;
  costPerQtlMonth: number;
}

export interface RecentActivityItem {
  id: string;
  icon: 'verified' | 'payments' | 'trending_down' | 'local_shipping';
  title: string;
  meta: string;
  colorType: 'primary' | 'secondary' | 'error' | 'blue';
}
