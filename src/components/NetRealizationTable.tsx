import React from 'react';
import { MandiComparisonItem } from '../types';
import { TrendingUp } from 'lucide-react';

interface NetRealizationTableProps {
  mandis: MandiComparisonItem[];
  showStorage?: boolean;
  storageCostPerQtl?: number;
}

export const NetRealizationTable: React.FC<NetRealizationTableProps> = ({
  mandis,
  showStorage = false,
  storageCostPerQtl = 0
}) => {
  let bestIdx = 0;
  mandis.forEach((m, i) => {
    if (m.netRealization > mandis[bestIdx].netRealization) bestIdx = i;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
            <th className="py-3 px-4 font-bold">Mandi / Buyer</th>
            <th className="py-3 px-4 font-bold">Price/Qtl</th>
            <th className="py-3 px-4 font-bold">Dist (km)</th>
            <th className="py-3 px-4 font-bold">Transport</th>
            {showStorage && <th className="py-3 px-4 font-bold">Storage</th>}
            <th className="py-3 px-4 font-bold">Demand</th>
            <th className="py-3 px-4 font-bold text-right">Net Realization</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c2c9bb]/20">
          {mandis.map((mandi, idx) => (
            <tr
              key={idx}
              className={idx === bestIdx ? 'bg-emerald-50/50 font-medium' : 'hover:bg-slate-50/80 transition-colors'}
            >
              <td className="py-3.5 px-4">
                <div className="font-semibold text-[#0b1c30]">{mandi.market}</div>
                {mandi.subtext && (
                  <div className="text-[10px] text-[#72796e]">{mandi.subtext}</div>
                )}
                {mandi.isDirect && (
                  <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                    Direct Buyer
                  </span>
                )}
              </td>
              <td className="py-3.5 px-4 font-mono font-semibold">₹{mandi.basePrice.toLocaleString('en-IN')}</td>
              <td className="py-3.5 px-4 text-[#72796e]">{mandi.distanceKm} km</td>
              <td className="py-3.5 px-4 text-red-600 font-medium">-₹{mandi.transportCost}</td>
              {showStorage && (
                <td className="py-3.5 px-4 text-amber-600 font-medium">
                  {storageCostPerQtl > 0 ? `-₹${storageCostPerQtl}` : '—'}
                </td>
              )}
              <td className="py-3.5 px-4">
                {mandi.demand && (
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      mandi.demand === 'HIGH'
                        ? 'bg-emerald-100 text-emerald-800'
                        : mandi.demand === 'MED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {mandi.demand}
                  </span>
                )}
              </td>
              <td className="py-3.5 px-4 text-right">
                {idx === bestIdx ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#bcf0ae]/60 text-[#154212] font-extrabold text-xs">
                    <TrendingUp className="w-3 h-3" />
                    ₹{mandi.netRealization.toLocaleString('en-IN')} /q
                  </span>
                ) : (
                  <span className="font-bold text-[#0b1c30]">
                    ₹{mandi.netRealization.toLocaleString('en-IN')} /q
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
