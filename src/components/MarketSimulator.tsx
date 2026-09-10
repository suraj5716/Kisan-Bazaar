import React from 'react';
import { WhatIfScenario } from '../types';
import { Clock, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface MarketSimulatorProps {
  scenarios: WhatIfScenario[];
}

const riskConfig: Record<WhatIfScenario['riskLevel'], { color: string; bg: string }> = {
  Low: { color: 'text-emerald-800', bg: 'bg-emerald-100' },
  Medium: { color: 'text-amber-800', bg: 'bg-amber-100' },
  'Medium-High': { color: 'text-orange-800', bg: 'bg-orange-100' },
  High: { color: 'text-red-800', bg: 'bg-red-100' }
};

export const MarketSimulator: React.FC<MarketSimulatorProps> = ({ scenarios }) => {
  const bestIdx = scenarios.reduce(
    (best, s, i) => (s.netRealization > scenarios[best].netRealization ? i : best),
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {scenarios.map((scenario, idx) => {
          const risk = riskConfig[scenario.riskLevel];
          const isBest = idx === bestIdx;
          const gain = scenario.netRealization - scenarios[0].netRealization;

          return (
            <div
              key={scenario.id}
              className={`p-4 rounded-2xl border transition-all ${
                isBest
                  ? 'border-[#2d5a27] bg-[#eff4ff]/60 ring-1 ring-[#2d5a27]/30 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isBest ? 'bg-[#2d5a27] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {idx === 0 ? (
                      <Clock className="w-4 h-4" />
                    ) : idx < 4 ? (
                      <Clock className="w-4 h-4" />
                    ) : idx === 4 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0b1c30]">{scenario.label}</h4>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${risk.bg} ${risk.color}`}>
                      {scenario.riskLevel} Risk
                    </span>
                  </div>
                </div>
                {isBest && (
                  <span className="px-2 py-0.5 rounded bg-[#2d5a27] text-white text-[9px] font-black uppercase">
                    Best
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#72796e] mb-3 leading-relaxed">{scenario.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                  <span className="font-bold text-[#0b1c30]">₹{scenario.expectedPrice.toLocaleString('en-IN')}/q</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Transport</span>
                  <span className="font-bold text-red-600">-₹{scenario.transportCost}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Storage</span>
                  <span className="font-bold text-amber-600">-₹{scenario.storageCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Net /q</span>
                  <span className="font-bold text-[#154212]">₹{scenario.netRealization.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {gain !== 0 && (
                <div
                  className={`text-[11px] font-bold mb-2 ${
                    gain > 0 ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {gain > 0 ? '+' : ''}₹{gain.toLocaleString('en-IN')}/q vs. Sell Today
                </div>
              )}

              <div className="p-2 rounded-lg bg-[#eff4ff] border border-[#c2c9bb]/30 text-[11px] text-[#42493e]">
                {scenario.recommendation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
