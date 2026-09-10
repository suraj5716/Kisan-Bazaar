import React from 'react';
import { FpoAggregationOpportunity } from '../types';
import { Users, TrendingUp, IndianRupee, ArrowRight, Package } from 'lucide-react';

interface FpoAggregationPanelProps {
  opportunities: FpoAggregationOpportunity[];
}

export const FpoAggregationPanel: React.FC<FpoAggregationPanelProps> = ({ opportunities }) => {
  if (opportunities.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-[#c2c9bb]/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#bcf0ae]/60 text-[#154212] flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-base text-[#0b1c30]">AI Aggregation Opportunities</h3>
          </div>
          <p className="text-xs text-[#42493e] mt-0.5">
            Combining produce from multiple farmers to meet buyer minimum quantity requirements
          </p>
        </div>
        <span className="text-xs text-[#2d5a27] font-semibold bg-[#eff4ff] px-3 py-1 rounded-full">
          {opportunities.length} Opportunities
        </span>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-4 rounded-2xl border border-slate-200 hover:border-[#2d5a27] bg-white hover:bg-slate-50/60 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#0b1c30]">{opp.crop} Aggregation</h4>
                <span className="text-[10px] text-[#72796e]">{opp.location}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#154212] text-[10px] font-bold">
                {opp.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Farmers</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#2d5a27]" />
                  <span className="font-bold text-[#0b1c30]">{opp.farmerCount}</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Qty</span>
                <span className="font-bold text-[#0b1c30]">{opp.totalQuantity} qtl</span>
              </div>
            </div>

            <div className="text-[11px] text-[#42493e]">
              <div>Potential Buyer: <span className="font-bold text-[#0b1c30]">{opp.potentialBuyer}</span></div>
              <div>Min Required: {opp.buyerMinQuantity} qtl</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/40">
              <div className="flex justify-between text-xs">
                <span className="text-[#72796e]">Individual Rate</span>
                <span className="font-semibold text-slate-700">₹{opp.individualPricePerQtl}/q</span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-[#72796e]">Bulk Rate</span>
                <span className="font-bold text-[#154212]">₹{opp.bulkPricePerQtl}/q</span>
              </div>
              <div className="flex justify-between text-xs mt-1 pt-1 border-t border-[#c2c9bb]/30">
                <span className="text-[#2d5a27] font-bold">Price Advantage</span>
                <span className="font-black text-[#154212]">+₹{opp.priceAdvantage}/q</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Est. Additional Net</span>
                <span className="text-lg font-black text-[#154212]">
                  +₹{opp.estimatedAdditionalNetRealization.toLocaleString('en-IN')}
                </span>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="text-[10px] text-[#72796e]">
              Farmers: {opp.farmers.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
