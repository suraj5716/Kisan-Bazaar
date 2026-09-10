import React from 'react';
import { RecommendationExplanation as ExplanationType } from '../types';
import { Info } from 'lucide-react';

interface RecommendationExplanationProps {
  explanation: ExplanationType;
}

export const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({
  explanation
}) => {
  return (
    <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/40 flex items-start gap-2.5">
      <Info className="w-4 h-4 text-[#2d5a27] mt-0.5 flex-shrink-0" />
      <div className="text-xs text-[#42493e] leading-relaxed">
        <span>{explanation.text}</span>
        {explanation.highlight && (
          <span className="font-bold text-[#154212]"> {explanation.highlight}</span>
        )}
      </div>
    </div>
  );
};
