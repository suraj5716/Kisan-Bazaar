import React from 'react';
import { SellDecision } from '../types';
import { Sparkles, ArrowRight, CheckCircle, Clock, Truck, ShoppingBag } from 'lucide-react';

interface DecisionBannerProps {
  decision: SellDecision;
}

const actionConfig: Record<
  SellDecision['action'],
  { icon: React.ReactNode; color: string; bg: string }
> = {
  'SELL NOW': {
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-[#bcf0ae]',
    bg: 'bg-[#bcf0ae]/20'
  },
  WAIT: {
    icon: <Clock className="w-6 h-6" />,
    color: 'text-amber-300',
    bg: 'bg-amber-300/20'
  },
  'MOVE TO ANOTHER MARKET': {
    icon: <Truck className="w-6 h-6" />,
    color: 'text-blue-300',
    bg: 'bg-blue-300/20'
  },
  'SELL TO DIRECT BUYER': {
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'text-emerald-300',
    bg: 'bg-emerald-300/20'
  }
};

export const DecisionBanner: React.FC<DecisionBannerProps> = ({ decision }) => {
  const config = actionConfig[decision.action];

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#154212] to-[#2d5a27] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center ${config.color}`}>
          {config.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              AI Sell Decision
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          </div>
          <h3 className="text-xl font-extrabold mt-1">{decision.action}</h3>
          <p className="text-xs text-emerald-100 mt-0.5 max-w-lg">{decision.reason}</p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
          Expected Net
        </div>
        <div className="text-2xl font-black text-white">
          ₹{decision.expectedNetRealization.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-emerald-200"> /q</span>
        </div>
        <div className="text-[10px] text-emerald-200 mt-0.5">
          Best: {decision.bestOption}
        </div>
      </div>
    </div>
  );
};
