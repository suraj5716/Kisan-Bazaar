import React from 'react';
import { ShieldCheck, AlertTriangle, Minus } from 'lucide-react';

interface BuyerReliabilityBadgeProps {
  score: number;
  label: 'High Reliability' | 'Medium Reliability' | 'Low Reliability';
}

export const BuyerReliabilityBadge: React.FC<BuyerReliabilityBadgeProps> = ({ score, label }) => {
  const isHigh = label === 'High Reliability';
  const isLow = label === 'Low Reliability';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
        isHigh
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : isLow
          ? 'bg-red-50 text-red-800 border-red-200'
          : 'bg-amber-50 text-amber-800 border-amber-200'
      }`}
    >
      {isHigh ? (
        <ShieldCheck className="w-3 h-3" />
      ) : isLow ? (
        <AlertTriangle className="w-3 h-3" />
      ) : (
        <Minus className="w-3 h-3" />
      )}
      <span>{score}/100</span>
      <span className="hidden sm:inline">· {label}</span>
    </div>
  );
};
