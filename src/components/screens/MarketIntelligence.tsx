import React, { useState } from 'react';
import { MandiComparisonItem, WarehouseOption, ScreenTab } from '../../types';
import {
  MARKET_INTELLIGENCE_MANDIS,
  WAREHOUSE_OPTIONS,
  ASSETS
} from '../../data/mockData';
import { NetRealizationTable } from '../NetRealizationTable';
import { RecommendationExplanation } from '../RecommendationExplanation';
import {
  Sparkles,
  Bell,
  Check,
  TrendingUp,
  MapPin,
  Warehouse,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface MarketIntelligenceProps {
  onNavigate: (tab: ScreenTab) => void;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ onNavigate }) => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat (Sharbati)');
  const [alertSet, setAlertSet] = useState(false);
  const [bookedWarehouse, setBookedWarehouse] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            Market Intelligence &amp; Advisory
          </h1>
          <p className="text-sm text-[#42493e] mt-0.5">
            Optimize mandi selection, compute freight net realizations, and time your trades.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#c2c9bb]/40 shadow-2xs">
            <span className="text-xs text-slate-500 font-semibold">Commodity:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#0b1c30] focus:outline-none"
            >
              <option value="Wheat (Sharbati)">Wheat (Sharbati)</option>
              <option value="Rice (Basmati)">Rice (Basmati)</option>
              <option value="Cotton (Long Staple)">Cotton (Long Staple)</option>
              <option value="Soybean (Yellow)">Soybean (Yellow)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Big Green AI Advisor Card */}
      <div className="bg-[#154212] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a1d494]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bcf0ae]/20 text-[#bcf0ae] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Trade Recommendation
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#bcf0ae]">
              Hold Inventory for 7–10 Days
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Market arrivals are expected to dip by <strong>15% next week</strong> due to unseasonal
              rain in neighboring districts. Prices are projected to rise by{' '}
              <strong>₹150–200/Quintal</strong>.
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('price-prediction')}
              className="px-5 py-2.5 bg-white text-[#154212] hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md transition-colors text-center"
            >
              View Detailed Analysis
            </button>
            <button
              onClick={() => setAlertSet(!alertSet)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs border transition-colors flex items-center justify-center gap-2 ${
                alertSet
                  ? 'bg-[#bcf0ae] text-[#154212] border-[#bcf0ae]'
                  : 'bg-transparent text-white border-white/40 hover:bg-white/10'
              }`}
            >
              {alertSet ? (
                <>
                  <Check className="w-4 h-4" /> Alert Active (₹2,500/q)
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" /> Set Price Alert
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Price Forecast Section (Historical vs Predicted) */}
      <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-bold text-base text-[#0b1c30]">Price Forecast (30-Day Outlook)</h3>
            <p className="text-xs text-[#42493e]">
              Machine-learning composite model tracking Mandi arrivals, rainfall, and futures
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-[#0b1c30]">
              <span className="w-3 h-0.5 bg-[#154212]" /> Historical
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[#2d5a27]">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-[#2d5a27]" /> Predicted
            </div>
            <div className="flex items-center gap-1.5 font-medium text-emerald-800">
              <span className="w-3 h-3 bg-[#bcf0ae]/50 rounded-xs" /> 90% Confidence Band
            </div>
          </div>
        </div>

        {/* Detailed SVG Chart */}
        <div className="relative w-full h-64 bg-[#f8f9ff] rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between text-[11px] text-[#72796e] font-mono border-b border-slate-200 pb-1">
            <span>₹2,600</span>
            <span>Target: ₹2,550/q</span>
            <span>Peak Demand Wave</span>
          </div>

          <svg className="w-full h-40 overflow-visible" viewBox="0 0 600 160">
            {/* Horizontal grid lines */}
            <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="600" y1="40" y2="40" />
            <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="600" y1="80" y2="80" />
            <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="600" y1="120" y2="120" />

            {/* Confidence Area */}
            <polygon
              points="300,100 400,60 500,30 600,15 600,60 500,80 400,100 300,110"
              fill="#bcf0ae"
              fillOpacity="0.45"
            />

            {/* Vertical "Today" line */}
            <line stroke="#94a3b8" strokeDasharray="4 3" strokeWidth="1.5" x1="300" x2="300" y1="0" y2="160" />
            <text fill="#64748b" fontSize="10" fontWeight="bold" x="305" y="15">
              TODAY (₹2,450)
            </text>

            {/* Historical curve */}
            <path
              d="M0,135 Q75,120 150,130 T300,105"
              fill="none"
              stroke="#154212"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Predicted curve */}
            <path
              d="M300,105 Q450,65 600,28"
              fill="none"
              stroke="#2d5a27"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Points */}
            <circle cx="300" cy="105" fill="#154212" r="5" stroke="#fff" strokeWidth="2" />
            <circle cx="600" cy="28" fill="#2d5a27" r="5" stroke="#fff" strokeWidth="2" />
          </svg>

          <div className="flex justify-between text-[11px] text-[#72796e] font-mono border-t border-slate-200 pt-1">
            <span>-15 Days</span>
            <span>-7 Days</span>
            <span className="font-bold text-[#0b1c30]">Today</span>
            <span>+7 Days</span>
            <span className="font-bold text-[#154212]">+15 Days (Projected ₹2,580)</span>
          </div>
        </div>
      </div>

      {/* Mandi Comparison Table & Warehouses (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mandi Table (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#c2c9bb]/20 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0b1c30]">Mandi Comparison &amp; Freight</h3>
              <p className="text-xs text-[#42493e]">Net revenue calculated after all handling &amp; transport fees</p>
            </div>
            <span className="text-xs text-[#2d5a27] font-semibold bg-[#bcf0ae]/40 px-2.5 py-1 rounded-full">
              Live Mandi Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <NetRealizationTable mandis={MARKET_INTELLIGENCE_MANDIS} showStorage={false} />
          </div>

          <div className="mt-4">
            <RecommendationExplanation
              explanation={{
                text: 'Solapur Mandi offers the highest net realization after transport costs. Consider booking transport early to lock in current rates.',
                highlight: 'Net gain of ₹60/q over Nagpur APMC after freight deduction'
              }}
            />
          </div>
        </div>

        {/* Warehouses & Route Map (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Warehouse Options */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#0b1c30]">Warehouse Options</h3>
              <span className="text-xs text-[#2d5a27] font-semibold">Hold safely</span>
            </div>

            <div className="space-y-3">
              {WAREHOUSE_OPTIONS.map((wh) => (
                <div
                  key={wh.id}
                  className="p-3 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#0b1c30]">{wh.name}</div>
                    <div className="text-[11px] text-[#72796e]">
                      {wh.distanceKm} km • {wh.tag} (★ {wh.rating})
                    </div>
                    <div className="font-semibold text-[#154212] mt-0.5">
                      ₹{wh.costPerQtlMonth.toFixed(2)} / Qtl / Month
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setBookedWarehouse(bookedWarehouse === wh.id ? null : wh.id)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      bookedWarehouse === wh.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#2d5a27] text-white hover:bg-[#154212]'
                    }`}
                  >
                    {bookedWarehouse === wh.id ? 'Booked' : 'Book'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Route Map */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="relative h-40 w-full">
              <img
                src={ASSETS.satelliteSolapur}
                alt="Route to Solapur Mandi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Route to Solapur Mandi
                </div>
                <div className="text-[11px] text-slate-200">
                  Est. 45 mins • Light highway traffic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
