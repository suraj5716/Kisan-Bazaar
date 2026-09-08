import React, { useState } from 'react';
import { CropLot, MandiComparisonItem, ScreenTab } from '../../types';
import { ASSETS, FARMER_MANDIS } from '../../data/mockData';
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
  Check
} from 'lucide-react';

interface FarmerDashboardProps {
  cropLots: CropLot[];
  onOpenAddLot: () => void;
  onViewLotDetails: (lot: CropLot) => void;
  onNavigate: (tab: ScreenTab) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  cropLots,
  onOpenAddLot,
  onViewLotDetails,
  onNavigate
}) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat (Lok-1)');
  const [forecastPeriod, setForecastPeriod] = useState('Next 15 Days');

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[#42493e] mt-0.5">
            Welcome back, Jai. Here is your farm&apos;s summary for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="add-crop-lot-btn"
            onClick={onOpenAddLot}
            className="px-4 py-2.5 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Crop Lot</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Total Lots
            </div>
            <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">
              {cropLots.length} <span className="text-xs font-normal text-[#72796e]">active</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#2d5a27] flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Active Offers
            </div>
            <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">
              5 <span className="text-xs font-normal text-[#72796e]">awaiting review</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ffdcc3] text-[#904d00] flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Pending Payments
            </div>
            <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">
              ₹45k <span className="text-xs font-normal text-[#72796e]">processing</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#31394e] flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Best Market Price
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-[#154212]">₹2,850</span>
              <span className="text-xs text-[#72796e]">/Qtl</span>
            </div>
            <span className="text-[11px] text-[#2d5a27] font-semibold block mt-0.5">
              Wheat - Azadpur Mandi
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#bcf0ae]/50 text-[#154212] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Market Intelligence (Net Realization) Card */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#c2c9bb]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#eff4ff]/50">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  Market Intelligence (Net Realization)
                </h3>
                <p className="text-xs text-[#42493e]">
                  Comparing net payout after transport costs for nearby APMC mandis
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="bg-white border border-[#c2c9bb]/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0b1c30] focus:ring-1.5 focus:ring-[#2d5a27] focus:outline-none shadow-2xs"
                >
                  <option value="Wheat (Lok-1)">Wheat (Lok-1)</option>
                  <option value="Soybean (Yellow)">Soybean (Yellow)</option>
                  <option value="Cotton (MCU-5)">Cotton (MCU-5)</option>
                  <option value="Basmati Rice">Basmati Rice</option>
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                    <th className="py-3 px-5 font-bold">Market Name</th>
                    <th className="py-3 px-4 font-bold">Base Price</th>
                    <th className="py-3 px-4 font-bold">Distance</th>
                    <th className="py-3 px-4 font-bold">Transport Cost</th>
                    <th className="py-3 px-5 font-bold text-right">Net Realization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/20">
                  {FARMER_MANDIS.map((mandi, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-[#0b1c30]">
                        {mandi.market}
                      </td>
                      <td className="py-3.5 px-4 text-[#42493e]">
                        ₹{mandi.basePrice.toLocaleString()} /q
                      </td>
                      <td className="py-3.5 px-4 text-[#72796e]">{mandi.distanceKm} km</td>
                      <td className="py-3.5 px-4 text-[#ba1a1a] font-medium">
                        {mandi.transportCost} /q
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-[#0b1c30]">
                        {mandi.market === 'Narela Mandi' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#bcf0ae]/50 text-[#154212] font-bold text-xs">
                            ₹{mandi.netRealization.toLocaleString()} /q
                          </span>
                        ) : (
                          <span>₹{mandi.netRealization.toLocaleString()} /q</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recommendation footer banner */}
            <div className="p-4 bg-[#eff4ff] border-t border-[#c2c9bb]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#2d5a27] font-medium">
                <Sparkles className="w-4 h-4 text-[#2d5a27] flex-shrink-0" />
                <span>
                  Despite a lower base price, <strong>Narela Mandi</strong> yields the highest Net
                  Realization due to proximity.
                </span>
              </div>
              <button
                onClick={() => onNavigate('market-intelligence')}
                className="text-[#154212] font-bold hover:underline flex items-center gap-1 flex-shrink-0"
              >
                Full Intel <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Crop Lots */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#c2c9bb]/20 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">Active Crop Lots</h3>
                <p className="text-xs text-[#42493e]">
                  Manage your listings and review incoming offers
                </p>
              </div>
              <span className="text-xs text-[#72796e] font-medium">
                Showing {cropLots.length} lots
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                    <th className="py-3 px-5 font-bold">Lot ID</th>
                    <th className="py-3 px-4 font-bold">Produce &amp; Grade</th>
                    <th className="py-3 px-4 font-bold">Volume</th>
                    <th className="py-3 px-4 font-bold">Best Offer</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/20">
                  {cropLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-xs font-bold text-[#154212]">
                        {lot.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#0b1c30]">{lot.crop}</div>
                        <div className="text-[11px] text-[#72796e]">{lot.grade}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#42493e] font-medium">{lot.quantity}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0b1c30]">{lot.bestOffer}</div>
                        {lot.bestOfferRate && (
                          <div className="text-[10px] text-[#72796e]">@{lot.bestOfferRate}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                            lot.status.includes('Negotiating')
                              ? 'bg-[#ffdcc3] text-[#904d00]'
                              : lot.status === 'Published'
                              ? 'bg-[#eff4ff] text-[#2d5a27]'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lot.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => onViewLotDetails(lot)}
                          className="px-3 py-1 bg-white border border-[#c2c9bb]/60 rounded-lg text-xs font-bold text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#154212] transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Price Forecast Card */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#bcf0ae]/50 text-[#154212] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#0b1c30]">AI Price Forecast</h3>
              </div>
              <select
                value={forecastPeriod}
                onChange={(e) => setForecastPeriod(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
              >
                <option value="Next 15 Days">Next 15 Days</option>
                <option value="Next 30 Days">Next 30 Days</option>
              </select>
            </div>

            {/* Forecast Chart */}
            <div className="relative h-44 w-full bg-[#f8f9ff] rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-[#72796e] font-semibold">
                <span>₹2,900</span>
                <span>Prediction Zone (Wheat)</span>
              </div>

              {/* SVG Curve */}
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80">
                {/* Confidence Interval band */}
                <polygon
                  points="90,45 140,25 200,10 200,35 140,50 90,50"
                  fill="#bcf0ae"
                  fillOpacity="0.4"
                />
                {/* Historical line (solid) */}
                <path
                  d="M0,60 Q45,55 90,45"
                  fill="none"
                  stroke="#154212"
                  strokeWidth="2.5"
                />
                {/* Forecast line (dashed) */}
                <path
                  d="M90,45 Q140,25 200,12"
                  fill="none"
                  stroke="#2d5a27"
                  strokeDasharray="4 3"
                  strokeWidth="2.5"
                />
                {/* Today point */}
                <circle cx="90" cy="45" fill="#154212" r="4" />
                {/* End forecast point */}
                <circle cx="200" cy="12" fill="#2d5a27" r="4" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-[#72796e]">
                <span>Today (₹2,740)</span>
                <span className="font-bold text-[#154212]">+15 Days (₹2,860)</span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#eef5ee] border border-[#c8dec6] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[#154212] uppercase tracking-wider text-[11px]">
                  WAIT / HOLD
                </span>
                <span className="text-[10px] font-bold text-[#2d5a27] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                  87% High Confidence
                </span>
              </div>
              <p className="text-[#2d5a27] leading-relaxed">
                Prices for Wheat are projected to rise by <strong>4.2%</strong> over the next 15
                days due to expected supply shortages.
              </p>
            </div>
          </div>

          {/* Farm Location & Weather Context */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="relative h-36 w-full">
              <img
                src={ASSETS.satelliteKarnal}
                alt="Karnal Farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Karnal, Haryana
                </div>
                <div className="text-[11px] text-slate-200">Farmland Plot #14 • 18.5 Acres</div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="font-bold text-[#0b1c30]">28°C Partly Cloudy</span>
                  <span className="block text-[11px] text-[#72796e]">Optimal harvesting window</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('market-intelligence')}
                className="text-xs font-bold text-[#154212] hover:underline"
              >
                Logistics &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
