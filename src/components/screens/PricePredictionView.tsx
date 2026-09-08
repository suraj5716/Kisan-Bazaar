import React, { useState } from 'react';
import { ScreenTab } from '../../types';
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertCircle,
  BarChart2,
  Sliders,
  CheckCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface PricePredictionViewProps {
  onNavigate: (tab: ScreenTab) => void;
}

export const PricePredictionView: React.FC<PricePredictionViewProps> = ({ onNavigate }) => {
  const [commodity, setCommodity] = useState('Wheat (Lok-1)');
  const [horizon, setHorizon] = useState<'30' | '60' | '90'>('30');
  const [rainShock, setRainShock] = useState(15); // +15% rainfall
  const [exportDemand, setExportDemand] = useState('high');

  // Computed projections based on interactive sliders
  const baseRate = 2450;
  const simulatedIncrease = Math.round(baseRate * (0.04 + (rainShock / 500) + (exportDemand === 'high' ? 0.03 : 0)));
  const targetPrice = baseRate + simulatedIncrease;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2d5a27] text-white flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
              AI Price Forecast &amp; Simulation Engine
            </h1>
          </div>
          <p className="text-sm text-[#42493e] mt-1">
            Simulate market arrivals, monsoon anomaly shocks, and global commodity export arbitrage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="bg-white border border-[#c2c9bb]/60 rounded-xl px-3 py-2 text-xs font-bold text-[#0b1c30] shadow-2xs focus:ring-2 focus:ring-[#2d5a27]"
          >
            <option value="Wheat (Lok-1)">Wheat (Lok-1)</option>
            <option value="Soybean (Yellow)">Soybean (Yellow)</option>
            <option value="Basmati Rice (1121)">Basmati Rice (1121)</option>
            <option value="Cotton (MCU-5)">Cotton (MCU-5)</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Simulation Panel (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2d5a27]" />
                <h3 className="font-bold text-sm text-[#0b1c30]">Scenario Parameters</h3>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Interactive</span>
            </div>

            {/* Forecast Horizon */}
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-2">
                Forecast Horizon
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['30', '60', '90'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setHorizon(h)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      horizon === h
                        ? 'bg-[#2d5a27] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {h} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Monsoon Anomaly Shock */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-[#42493e]">Unseasonal Rain Anomaly</span>
                <span className="text-[#154212]">+{rainShock}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={rainShock}
                onChange={(e) => setRainShock(Number(e.target.value))}
                className="w-full accent-[#2d5a27] cursor-pointer"
              />
              <span className="text-[10px] text-[#72796e] block mt-0.5">
                Reduces short-term mandi arrivals by ~{Math.round(rainShock * 0.8)}%
              </span>
            </div>

            {/* Export Demand */}
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Global Export Demand
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportDemand('moderate')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    exportDemand === 'moderate'
                      ? 'bg-[#2d5a27] text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Moderate
                </button>
                <button
                  onClick={() => setExportDemand('high')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    exportDemand === 'high'
                      ? 'bg-[#2d5a27] text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  High Surge (+3%)
                </button>
              </div>
            </div>

            {/* Signal Result */}
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/40 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#72796e] uppercase tracking-wider text-[10px]">
                  Model Algorithmic Signal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2d5a27] text-white font-bold text-[10px]">
                  STRONG BUY / HOLD
                </span>
              </div>
              <div className="text-xl font-black text-[#154212]">
                Target: ₹{targetPrice.toLocaleString()} /q
              </div>
              <p className="text-[11px] text-[#42493e]">
                Projected gain of <strong>+₹{simulatedIncrease}/q</strong> over the next {horizon} days.
              </p>
            </div>
          </div>
        </div>

        {/* Right Dynamic Forecast Curve & Analysis (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  Projected Trajectory: {commodity}
                </h3>
                <p className="text-xs text-[#42493e]">
                  Confidence score: <strong className="text-emerald-700">89.4%</strong> • Backtested against 5 years of mandi cycles
                </p>
              </div>
              <button
                onClick={() => onNavigate('market-intelligence')}
                className="text-xs font-bold text-[#154212] flex items-center gap-1 hover:underline self-start sm:self-auto"
              >
                Mandi Freight Net &gt;
              </button>
            </div>

            {/* SVG Interactive Chart */}
            <div className="w-full h-72 bg-[#f8f9ff] rounded-xl p-4 border border-slate-100 flex flex-col justify-between relative">
              <div className="flex justify-between text-xs text-[#72796e] font-mono">
                <span>₹2,800/q</span>
                <span className="text-emerald-700 font-bold">Simulated Peak: ₹{targetPrice}/q</span>
                <span>Upper Bound: ₹{targetPrice + 120}/q</span>
              </div>

              <svg className="w-full h-48 overflow-visible" viewBox="0 0 600 180">
                {/* Confidence Area */}
                <polygon
                  points="250,110 350,70 480,40 600,20 600,80 480,100 350,120 250,130"
                  fill="#bcf0ae"
                  fillOpacity="0.45"
                />

                {/* Vertical delimiter for Today */}
                <line stroke="#94a3b8" strokeDasharray="4 4" x1="250" x2="250" y1="0" y2="180" />
                <text fill="#475569" fontSize="11" fontWeight="bold" x="255" y="20">
                  Current (₹{baseRate})
                </text>

                {/* Past line */}
                <path
                  d="M0,150 Q120,130 250,115"
                  fill="none"
                  stroke="#154212"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                {/* Forecast curve dynamically lifting with rainShock */}
                <path
                  d={`M250,115 Q400,${80 - rainShock} 600,${35 - Math.round(rainShock * 0.4)}`}
                  fill="none"
                  stroke="#2d5a27"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                <circle cx="250" cy="115" fill="#154212" r="5" stroke="#fff" strokeWidth="2" />
                <circle
                  cx="600"
                  cy={35 - Math.round(rainShock * 0.4)}
                  fill="#2d5a27"
                  r="5"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </svg>

              <div className="flex justify-between text-xs text-[#72796e] font-mono border-t border-slate-200 pt-2">
                <span>Past 30 Days</span>
                <span className="font-bold text-[#0b1c30]">Today</span>
                <span>+{Math.round(Number(horizon) / 2)} Days</span>
                <span className="font-bold text-[#154212]">+{horizon} Days</span>
              </div>
            </div>

            {/* Key Insights List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">
                  Arrival Deficit
                </span>
                <span className="font-bold text-[#0b1c30] text-sm mt-0.5 block">-18,400 MT</span>
                <span className="text-[11px] text-slate-500">Below 3-year running average</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">
                  Govt MSP Floor
                </span>
                <span className="font-bold text-[#0b1c30] text-sm mt-0.5 block">₹2,275 /q</span>
                <span className="text-[11px] text-emerald-700">Safety barrier intact</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">
                  Stock Holding Advice
                </span>
                <span className="font-bold text-[#154212] text-sm mt-0.5 block">10 to 14 Days</span>
                <span className="text-[11px] text-slate-500">Avoid distress selling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
