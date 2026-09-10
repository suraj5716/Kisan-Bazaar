import React from 'react';
import { SellDecision } from '../types';
import { RecommendationExplanation } from './RecommendationExplanation';
import { TrendingUp, MapPin, IndianRupee, BarChart2 } from 'lucide-react';

interface SellDecisionPanelProps {
  decision: SellDecision;
}

export const SellDecisionPanel: React.FC<SellDecisionPanelProps> = ({ decision }) => {
  return (
    <div className="space-y-4">
      <RecommendationExplanation
        explanation={{
          text: decision.explanation,
          highlight: `Expected net: ₹${decision.expectedNetRealization.toLocaleString('en-IN')}/q via ${decision.bestOption}`
        }}
      />

      <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#c2c9bb]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#2d5a27]" />
            <h4 className="font-bold text-sm text-[#0b1c30]">Channel Comparison</h4>
          </div>
          <span className="text-[10px] text-[#72796e] font-semibold uppercase">
            Net Realization Breakdown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c2c9bb]/20 text-[10px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                <th className="py-2.5 px-4 font-bold">Channel</th>
                <th className="py-2.5 px-3 font-bold">Selling Price</th>
                <th className="py-2.5 px-3 font-bold">Transport</th>
                <th className="py-2.5 px-3 font-bold">Storage</th>
                <th className="py-2.5 px-3 font-bold">Other</th>
                <th className="py-2.5 px-4 font-bold text-right">Net /q</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c9bb]/20">
              {decision.comparison.map((c, idx) => (
                <tr
                  key={idx}
                  className={c.isBest ? 'bg-emerald-50/50 font-medium' : 'hover:bg-slate-50'}
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0b1c30]">{c.label}</span>
                      {c.isBest && (
                        <span className="px-1.5 py-0.5 rounded bg-[#2d5a27] text-white text-[9px] font-black uppercase">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono">₹{c.sellingPrice.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-red-600">-₹{c.transportCost}</td>
                  <td className="py-2.5 px-3 text-amber-600">-₹{c.storageCost.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-slate-500">-₹{c.otherCosts}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-[#154212]">
                    ₹{c.netRealization.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
