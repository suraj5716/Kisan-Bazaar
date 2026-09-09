import React, { useState } from 'react';
import { CropLot, MandiComparisonItem, ScreenTab, FarmerSubTab } from '../../types';
import { ASSETS, FARMER_MANDIS, INITIAL_FARMER_OFFERS, FarmerIncomingOffer } from '../../data/mockData';
import { FarmerNavBar } from '../FarmerNavBar';
import {
  Plus,
  Wheat,
  Layers,
  Inbox,
  CreditCard,
  TrendingUp,
  CloudSun,
  MapPin,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Info,
  Check,
  BarChart2,
  PackageSearch,
  Bot,
  Clock,
  Handshake,
  Tag,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  ShieldCheck,
  Filter,
  DollarSign,
  Calendar,
  Warehouse
} from 'lucide-react';

interface FarmerDashboardProps {
  cropLots: CropLot[];
  subTab: FarmerSubTab;
  onSelectSubTab: (tab: FarmerSubTab) => void;
  onOpenAddLot: () => void;
  onViewLotDetails: (lot: CropLot) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  cropLots,
  subTab,
  onSelectSubTab,
  onOpenAddLot,
  onViewLotDetails,
  onNavigate
}) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat (Lok-1)');
  const [forecastPeriod, setForecastPeriod] = useState<'15' | '30' | '90'>('15');
  const [lotFilter, setLotFilter] = useState<'all' | 'negotiating' | 'published'>('all');

  // Offers state
  const [offers, setOffers] = useState<FarmerIncomingOffer[]>(INITIAL_FARMER_OFFERS);
  const [offerActionFeedback, setOfferActionFeedback] = useState<string | null>(null);

  // Logistics state
  const [vehicleType, setVehicleType] = useState('Tata 407 (4 Tons)');
  const [destinationMandi, setDestinationMandi] = useState('Narela Mandi (42 km)');
  const [logisticsBooked, setLogisticsBooked] = useState(false);
  const [warehouseBooked, setWarehouseBooked] = useState<string | null>(null);

  // Sale timing state
  const [alertEnabled, setAlertEnabled] = useState(false);

  const handleOfferAction = (id: string, action: 'Accepted' | 'Declined' | 'Countered') => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, status: action } : off))
    );
    if (action === 'Accepted') {
      setOfferActionFeedback('Offer accepted! Escrow payment has been locked for Lot #L-4092.');
    } else if (action === 'Countered') {
      setOfferActionFeedback('Counter-offer sent to ITC Agri Procurement at ₹2,760/q.');
    } else {
      setOfferActionFeedback('Offer declined.');
    }
    setTimeout(() => setOfferActionFeedback(null), 4000);
  };

  const filteredLots = cropLots.filter((lot) => {
    if (lotFilter === 'negotiating') return lot.status.toLowerCase().includes('negotiat');
    if (lotFilter === 'published') return lot.status === 'Published';
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
              Farmer Workspace
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#154212] font-bold text-xs border border-[#c2c9bb]/40">
              Jai Kumar • Karnal, HR
            </span>
          </div>
          <p className="text-sm text-[#42493e] mt-0.5">
            Manage your crop lots, intelligent buyer matches, sale timing recommendations, and transport.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="add-crop-lot-btn"
            onClick={onOpenAddLot}
            className="px-4 py-2.5 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Crop Lot</span>
          </button>
        </div>
      </div>

      {/* Horizontal Nav Bar matching user screenshot */}
      <FarmerNavBar
        activeTab={subTab}
        onSelectTab={onSelectSubTab}
        lotsCount={cropLots.length}
        offersCount={offers.filter((o) => o.status === 'Pending Review').length}
      />

      {/* Action Banner if offer accepted */}
      {offerActionFeedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-[#154212] flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{offerActionFeedback}</span>
          </div>
          <button
            onClick={() => setOfferActionFeedback(null)}
            className="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 1: OVERVIEW */}
      {/* ========================================================= */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div
              onClick={() => onSelectSubTab('my-lots')}
              className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs hover:border-[#2d5a27]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
                  Total Lots
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#154212] group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">{cropLots.length}</div>
              <span className="text-[11px] text-[#2d5a27] font-semibold block mt-1">
                {cropLots.filter((l) => l.status.includes('Negotiat')).length} with active bids
              </span>
            </div>

            {/* KPI 2 */}
            <div
              onClick={() => onSelectSubTab('offers')}
              className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs hover:border-[#2d5a27]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
                  Active Offers
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#154212] group-hover:scale-105 transition-transform">
                  <Inbox className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">
                {offers.filter((o) => o.status === 'Pending Review').length}
              </div>
              <span className="text-[11px] text-[#ba1a1a] font-semibold block mt-1">
                Awaiting your response
              </span>
            </div>

            {/* KPI 3 */}
            <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
                  Pending Payments
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#154212]">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">₹45,000</div>
              <span className="text-[11px] text-[#72796e] font-medium block mt-1">
                In Bank Escrow • 24h release
              </span>
            </div>

            {/* KPI 4 */}
            <div
              onClick={() => onSelectSubTab('market-intelligence')}
              className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs hover:border-[#2d5a27]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
                  Best Market Price
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#ffdcc3] flex items-center justify-center text-[#904d00]">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#154212] mt-1">₹2,850 <span className="text-xs text-[#72796e] font-normal">/Qtl</span></div>
              <span className="text-[11px] text-[#72796e] font-medium block mt-1">
                Wheat • Azadpur Mandi
              </span>
            </div>
          </div>

          {/* Dual Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main (Span 8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Quick Lots Glance */}
              <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-base text-[#0b1c30]">Your Active Produce Lots</h3>
                    <p className="text-xs text-[#42493e]">Direct listings currently visible to verified institutional buyers</p>
                  </div>
                  <button
                    onClick={() => onSelectSubTab('my-lots')}
                    className="text-xs font-bold text-[#2d5a27] hover:underline flex items-center gap-1"
                  >
                    View All Lots ({cropLots.length}) &gt;
                  </button>
                </div>

                <div className="space-y-3">
                  {cropLots.slice(0, 3).map((lot) => (
                    <div
                      key={lot.id}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#154212] font-bold text-xs">
                          <Wheat className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#0b1c30]">{lot.crop}</span>
                            <span className="text-xs text-slate-500 font-mono">{lot.id}</span>
                          </div>
                          <p className="text-xs text-slate-500">{lot.grade} • {lot.quantity}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs font-bold text-[#154212]">{lot.bestOffer}</div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              lot.status.includes('Negotiat')
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {lot.status}
                          </span>
                        </div>
                        <button
                          onClick={() => onViewLotDetails(lot)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-white"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Net Realization Preview */}
              <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base text-[#0b1c30]">Mandi Net Realization (After Transport)</h3>
                    <p className="text-xs text-[#42493e]">Net profit comparison across local mandis for Lok-1 Wheat</p>
                  </div>
                  <button
                    onClick={() => onSelectSubTab('market-intelligence')}
                    className="text-xs font-bold text-[#2d5a27] hover:underline"
                  >
                    Open Intelligence Engine &gt;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FARMER_MANDIS.slice(0, 3).map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border ${
                        m.isBestChoice
                          ? 'border-[#2d5a27] bg-[#eff4ff]/60 ring-1 ring-[#2d5a27]/30'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0b1c30] truncate">{m.market}</span>
                        {m.isBestChoice && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#2d5a27] text-white">
                            Highest Net
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-extrabold text-[#154212] mt-1.5">
                        ₹{m.netRealization} <span className="text-xs text-slate-500 font-normal">/q</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                        <span>Rate: ₹{m.basePrice}</span>
                        <span>Freight: -₹{m.transportCost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Sale Timing Advisor Snippet */}
              <div
                onClick={() => onSelectSubTab('sale-timing')}
                className="bg-gradient-to-br from-[#154212] to-[#2d5a27] rounded-2xl p-5 text-white shadow-md cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    AI Trade Advisory
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
                <h4 className="text-base font-bold mt-2.5">Hold Inventory for 7–10 Days</h4>
                <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                  Arrivals expected to dip 15% due to late harvest rains. Projected gain of +₹140/q.
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                  <span>View Timing Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Farm Satellite Location & Weather */}
              <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
                <div className="relative h-40 w-full bg-slate-100">
                  <img
                    src={ASSETS.satelliteKarnal}
                    alt="Farm Satellite View"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Karnal Agricultural Zone (Plot #12)
                    </div>
                    <span className="text-[10px] text-slate-200">Soil Moisture: 22% • Optimal</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CloudSun className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="font-bold text-[#0b1c30]">28°C Partly Cloudy</span>
                      <span className="text-[10px] text-slate-500 block">No rain expected in next 5 days</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectSubTab('logistics')}
                    className="text-xs font-bold text-[#2d5a27] hover:underline"
                  >
                    Book Transport &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: MY LOTS · 4 */}
      {/* ========================================================= */}
      {subTab === 'my-lots' && (
        <div className="space-y-6">
          {/* Summary & Filters Bar */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-[#0b1c30]">My Produce Inventory</h3>
              <p className="text-xs text-[#42493e]">
                {cropLots.length} Active Lots • Total Volume ~495 Quintals • Estimated Value ₹18.2L
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLotFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lotFilter === 'all'
                    ? 'bg-[#2d5a27] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Lots ({cropLots.length})
              </button>
              <button
                onClick={() => setLotFilter('negotiating')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lotFilter === 'negotiating'
                    ? 'bg-[#2d5a27] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Negotiating ({cropLots.filter((l) => l.status.includes('Negotiat')).length})
              </button>
              <button
                onClick={() => setLotFilter('published')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lotFilter === 'published'
                    ? 'bg-[#2d5a27] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Published ({cropLots.filter((l) => l.status === 'Published').length})
              </button>
            </div>
          </div>

          {/* Detailed Lots Table */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                    <th className="py-3 px-5 font-bold">Lot ID</th>
                    <th className="py-3 px-4 font-bold">Produce &amp; Grade</th>
                    <th className="py-3 px-4 font-bold">Volume</th>
                    <th className="py-3 px-4 font-bold">Quality Specs</th>
                    <th className="py-3 px-4 font-bold">Best Offer</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/20">
                  {filteredLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-mono font-bold text-[#154212]">{lot.id}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#0b1c30]">{lot.crop}</div>
                        <div className="text-[11px] text-[#72796e]">{lot.grade}</div>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#0b1c30]">{lot.quantity}</td>
                      <td className="py-4 px-4 text-xs text-[#42493e]">
                        <div>Moisture: {lot.moisture || '10%'}</div>
                        <div className="text-[11px] text-[#72796e]">Harvest: {lot.harvestDate || 'Oct 2024'}</div>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#154212]">
                        {lot.bestOffer}
                        {lot.bestOfferRate && (
                          <span className="block text-[11px] text-[#72796e] font-normal">
                            Rate: {lot.bestOfferRate}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                            lot.status.includes('Negotiat')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {lot.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          onClick={() => onViewLotDetails(lot)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-[#2d5a27] hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                        {lot.status.includes('Negotiat') && (
                          <button
                            onClick={() => onSelectSubTab('offers')}
                            className="px-3 py-1.5 rounded-lg bg-[#2d5a27] text-white text-xs font-bold hover:bg-[#154212] transition-colors"
                          >
                            Review Bids
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: MARKET INTELLIGENCE */}
      {/* ========================================================= */}
      {subTab === 'market-intelligence' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-bold text-lg text-[#0b1c30]">Mandi Net Realization Comparison</h3>
                <p className="text-xs text-[#42493e]">
                  Calculates your real take-home payout after deducting transport freight and local cess.
                </p>
              </div>

              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0b1c30]"
              >
                <option value="Wheat (Lok-1)">Wheat (Lok-1)</option>
                <option value="Soybean (Yellow)">Soybean (Yellow)</option>
                <option value="Basmati Rice (1121)">Basmati Rice (1121)</option>
                <option value="Mustard (Pusa Bold)">Mustard (Pusa Bold)</option>
              </select>
            </div>

            {/* Mandi Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50">
                    <th className="py-3 px-4 font-bold">Mandi / Terminal Hub</th>
                    <th className="py-3 px-4 font-bold">Base Quoted Price</th>
                    <th className="py-3 px-4 font-bold">Transit Distance</th>
                    <th className="py-3 px-4 font-bold">Transport Freight</th>
                    <th className="py-3 px-4 font-bold">Net Realization</th>
                    <th className="py-3 px-4 font-bold">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/20">
                  {FARMER_MANDIS.map((m, idx) => (
                    <tr
                      key={idx}
                      className={m.isBestChoice ? 'bg-emerald-50/50 font-medium' : 'hover:bg-slate-50'}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#0b1c30]">{m.market}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold">₹{m.basePrice} /q</td>
                      <td className="py-3.5 px-4 text-[#72796e]">{m.distanceKm} km</td>
                      <td className="py-3.5 px-4 text-red-600 font-medium">-₹{m.transportCost} /q</td>
                      <td className="py-3.5 px-4 font-bold text-base text-[#154212]">
                        ₹{m.netRealization} /q
                      </td>
                      <td className="py-3.5 px-4">
                        {m.isBestChoice ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#2d5a27] text-white font-bold text-xs shadow-xs">
                            Recommended (+₹60/q more)
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">Secondary</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: PRICE FORECAST */}
      {/* ========================================================= */}
      {subTab === 'price-forecast' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#2d5a27]" />
                  <h3 className="font-bold text-lg text-[#0b1c30]">AI Price Forecast Engine</h3>
                </div>
                <p className="text-xs text-[#42493e] mt-0.5">
                  Algorithm backtested on 5 years of seasonal mandi arrivals, rainfall patterns, and national buffer stocks.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {(['15', '30', '90'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setForecastPeriod(period)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      forecastPeriod === period
                        ? 'bg-[#2d5a27] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Next {period} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Forecast SVG Chart */}
            <div className="w-full h-72 bg-[#f8f9ff] rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Current Spot: ₹2,450/q</span>
                <span className="text-emerald-700 font-bold">
                  Projected Target ({forecastPeriod}d): ₹{forecastPeriod === '15' ? '2,620' : forecastPeriod === '30' ? '2,780' : '2,920'}/q
                </span>
                <span>Confidence: 89.4%</span>
              </div>

              <svg className="w-full h-44 overflow-visible" viewBox="0 0 600 160">
                {/* Confidence Area */}
                <polygon
                  points="260,95 380,60 500,40 600,25 600,85 500,105 380,120 260,115"
                  fill="#bcf0ae"
                  fillOpacity="0.4"
                />
                {/* Delimiter */}
                <line stroke="#94a3b8" strokeDasharray="4 4" x1="260" x2="260" y1="0" y2="160" />
                <text fill="#475569" fontSize="10" fontWeight="bold" x="265" y="20">
                  Today (₹2,450)
                </text>

                {/* Past Curve */}
                <path
                  d="M0,130 Q130,120 260,105"
                  fill="none"
                  stroke="#154212"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                {/* Predicted Curve */}
                <path
                  d="M260,105 Q420,70 600,35"
                  fill="none"
                  stroke="#2d5a27"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                <circle cx="260" cy="105" fill="#154212" r="5" stroke="#fff" strokeWidth="2" />
                <circle cx="600" cy="35" fill="#2d5a27" r="5" stroke="#fff" strokeWidth="2" />
              </svg>

              <div className="flex justify-between text-xs text-slate-500 font-mono border-t border-slate-200 pt-2">
                <span>Past 30 Days</span>
                <span className="font-bold text-[#0b1c30]">Today</span>
                <span className="font-bold text-[#154212]">+{forecastPeriod} Days Outlook</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 5: SALE TIMING */}
      {/* ========================================================= */}
      {subTab === 'sale-timing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6 space-y-6">
            {/* Main Decision Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#154212] to-[#2d5a27] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    Strong Recommendation
                  </span>
                  <h3 className="text-xl font-extrabold mt-1">HOLD INVENTORY FOR 7–10 DAYS</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Avoid selling at current spot prices. Anticipated market price jump: <strong>+₹140 to ₹180 /q</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAlertEnabled(!alertEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  alertEnabled
                    ? 'bg-emerald-300 text-[#154212]'
                    : 'bg-white text-[#154212] hover:bg-emerald-50'
                }`}
              >
                {alertEnabled ? '✓ Price Alert Active (₹2,650/q)' : 'Set Price Alert Trigger'}
              </button>
            </div>

            {/* Why Hold? Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Mandi Arrivals Deficit</span>
                <div className="text-xl font-extrabold text-[#ba1a1a] mt-1">-18% Drop</div>
                <p className="text-xs text-slate-600 mt-1">
                  Heavy showers delayed harvesting in Western UP and MP, creating temporary supply scarcity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Govt MSP Safety Net</span>
                <div className="text-xl font-extrabold text-[#154212] mt-1">₹2,275 /q Floor</div>
                <p className="text-xs text-slate-600 mt-1">
                  Downside risk is zero because open procurement mandis are actively buying at official MSP floor.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Net Realization Gain</span>
                <div className="text-xl font-extrabold text-[#2d5a27] mt-1">+₹21,000 Total</div>
                <p className="text-xs text-slate-600 mt-1">
                  Net gain on your 150 quintals lot after factoring warehouse holding fee (₹45/month).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 6: BUYER MATCHES */}
      {/* ========================================================= */}
      {subTab === 'buyer-matches' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#0b1c30]">Direct Corporate Buyer Matches</h3>
                <p className="text-xs text-[#42493e]">
                  Institutional procurement companies with active purchase orders matching your harvest
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                4 High-Match Buyers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  buyer: 'ITC Agri Procurement',
                  cropMatch: 'Wheat Grade A (Lok-1)',
                  matchScore: '96% Match',
                  buyingRate: '₹2,750 /q',
                  escrowGuarantee: '100% Escrow Protected',
                  deliveryLocation: 'Narela Mandi Warehouse (42 km)'
                },
                {
                  buyer: 'Reliance Retail Agro',
                  cropMatch: 'Basmati Rice (1121 Export)',
                  matchScore: '92% Match',
                  buyingRate: '₹3,850 /q',
                  escrowGuarantee: 'Direct Mill Delivery Payout',
                  deliveryLocation: 'Panipat Depot (28 km)'
                },
                {
                  buyer: 'Adani Wilmar Agro',
                  cropMatch: 'Mustard (Pusa Bold)',
                  matchScore: '89% Match',
                  buyingRate: '₹5,750 /q',
                  escrowGuarantee: 'Immediate Weighbridge Transfer',
                  deliveryLocation: 'Karnal Processing Center (8 km)'
                },
                {
                  buyer: 'Sahyadri Farmers Hub',
                  cropMatch: 'Soybean (Standard Yellow)',
                  matchScore: '85% Match',
                  buyingRate: '₹4,300 /q',
                  escrowGuarantee: 'FPO Aggregation Contract',
                  deliveryLocation: 'Ambala Aggregation Hub (35 km)'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-[#2d5a27] bg-white hover:bg-slate-50/60 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0b1c30]">{item.buyer}</h4>
                      <span className="text-xs text-slate-500">{item.cropMatch}</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#154212]">
                      {item.matchScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Purchase Offer:</span>
                    <span className="font-extrabold text-[#154212] text-sm">{item.buyingRate}</span>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    <div>✓ {item.escrowGuarantee}</div>
                    <div>✓ Delivery: {item.deliveryLocation}</div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onSelectSubTab('offers')}
                      className="flex-1 py-2 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      Connect &amp; Review Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 7: OFFERS · 1 */}
      {/* ========================================================= */}
      {subTab === 'offers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#0b1c30]">Incoming Bids &amp; Counter-Offers</h3>
                <p className="text-xs text-[#42493e]">
                  Active buyer bids placed directly on your listed crop lots
                </p>
              </div>
              <span className="text-xs font-semibold text-[#904d00] bg-[#ffdcc3] px-3 py-1 rounded-full">
                {offers.length} Bid Recorded
              </span>
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-5 rounded-2xl border-2 border-slate-200 hover:border-[#2d5a27] bg-white transition-all space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#154212] flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#0b1c30]">{offer.buyerName}</h4>
                          <span className="text-xs text-slate-400 font-mono">({offer.id})</span>
                        </div>
                        <p className="text-xs text-[#42493e]">
                          Crop Lot: <strong>{offer.lotId}</strong> • {offer.crop} ({offer.quantity})
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                        offer.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : offer.status === 'Declined'
                          ? 'bg-red-100 text-red-800'
                          : offer.status === 'Countered'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </div>

                  {/* Financial Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Offered Rate</span>
                      <span className="font-bold text-sm text-[#154212]">₹{offer.offeredRate} /q</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Asking Rate</span>
                      <span className="font-bold text-sm text-slate-700">₹{offer.askingRate} /q</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Total Valuation</span>
                      <span className="font-bold text-sm text-[#0b1c30]">{offer.totalValuation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Expires In</span>
                      <span className="font-bold text-sm text-amber-600">{offer.expiresIn}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Delivery Location:</strong> {offer.deliveryLocation}</div>
                    <div><strong>Payment Security:</strong> {offer.paymentTerms}</div>
                  </div>

                  {/* Actions */}
                  {offer.status === 'Pending Review' && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleOfferAction(offer.id, 'Accepted')}
                        className="px-4 py-2 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Accept Offer
                      </button>
                      <button
                        onClick={() => handleOfferAction(offer.id, 'Countered')}
                        className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Counter at ₹2,760/q
                      </button>
                      <button
                        onClick={() => handleOfferAction(offer.id, 'Declined')}
                        className="px-4 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 8: LOGISTICS */}
      {/* ========================================================= */}
      {subTab === 'logistics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#0f6b40]" />
                <h3 className="font-bold text-lg text-[#0b1c30]">Logistics &amp; Transport Booking</h3>
              </div>
              <p className="text-xs text-[#42493e] mt-0.5">
                Book verified freight trucks with GPS tracking or reserve nearby WDRA licensed cold storage.
              </p>
            </div>

            {/* Transport Booking Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-[#0b1c30]">Book Farm-to-Mandi Freight</h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Truck Size</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  >
                    <option value="Tata Ace (1.5 Tons)">Tata Ace (1.5 Tons) - ₹1,400</option>
                    <option value="Tata 407 (4 Tons)">Tata 407 (4 Tons) - ₹2,800</option>
                    <option value="6-Wheeler Eicher (9 Tons)">6-Wheeler Eicher (9 Tons) - ₹5,400</option>
                    <option value="10-Wheeler Truck (16 Tons)">10-Wheeler Truck (16 Tons) - ₹8,900</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
                  <select
                    value={destinationMandi}
                    onChange={(e) => setDestinationMandi(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  >
                    <option value="Narela Mandi (42 km)">Narela Mandi (42 km)</option>
                    <option value="Azadpur APMC (65 km)">Azadpur APMC (65 km)</option>
                    <option value="Indore Hub (Direct Sourcing)">Indore Hub (Direct Sourcing)</option>
                  </select>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between font-bold text-[#0b1c30]">
                    <span>Estimated Freight Fee:</span>
                    <span className="text-[#154212] text-sm">₹2,800</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Includes loading assistance &amp; transit insurance</span>
                </div>

                <button
                  onClick={() => {
                    setLogisticsBooked(true);
                    setTimeout(() => setLogisticsBooked(false), 5000);
                  }}
                  className="w-full py-2.5 bg-[#0f6b40] hover:bg-[#154212] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {logisticsBooked ? '✓ Truck Dispatched (Driver Arriving in 45 mins)' : 'Confirm Truck Booking'}
                </button>
              </div>

              {/* Warehousing Options */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#0b1c30]">Nearby WDRA Warehouses &amp; Cold Storage</h4>

                {[
                  {
                    id: 'WH-1',
                    name: 'Kisan Cold Storage & Silos',
                    dist: '14 km away',
                    rate: '₹45 /qtl /month',
                    capacity: '850 MT Available'
                  },
                  {
                    id: 'WH-2',
                    name: 'AgriHub Central Logistics Depot',
                    dist: '22 km away',
                    rate: '₹38 /qtl /month',
                    capacity: '1,400 MT Available'
                  }
                ].map((wh) => (
                  <div key={wh.id} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-[#0b1c30]">{wh.name}</h5>
                      <span className="text-[11px] text-slate-500 block">{wh.dist} • {wh.capacity}</span>
                      <span className="text-xs font-bold text-[#154212] mt-0.5 block">{wh.rate}</span>
                    </div>
                    <button
                      onClick={() => {
                        setWarehouseBooked(wh.id);
                        setTimeout(() => setWarehouseBooked(null), 4000);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        warehouseBooked === wh.id
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {warehouseBooked === wh.id ? 'Reserved' : 'Reserve Space'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
