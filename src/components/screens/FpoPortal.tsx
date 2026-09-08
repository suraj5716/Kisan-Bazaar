import React, { useState } from 'react';
import { ScreenTab } from '../../types';
import {
  Users,
  Building2,
  TrendingUp,
  Truck,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FpoPortalProps {
  onNavigate: (tab: ScreenTab) => void;
}

export const FpoPortal: React.FC<FpoPortalProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pools' | 'contracts' | 'payouts'>('pools');

  const memberPools = [
    {
      id: 'POOL-401',
      commodity: 'Sharbati Wheat (Grade A)',
      totalQuantity: '450 MT',
      memberFarmers: 38,
      avgMoisture: '10.2%',
      aggregatedMandi: 'Nashik Aggregation Center',
      currentBid: '₹2,820 /q (ITC Agri)',
      status: 'Open for Bids'
    },
    {
      id: 'POOL-402',
      commodity: 'Non-GMO Yellow Soybeans',
      totalQuantity: '280 MT',
      memberFarmers: 24,
      avgMoisture: '9.4%',
      aggregatedMandi: 'Satara Warehouse Hub',
      currentBid: '₹4,350 /q (Godrej Agrovet)',
      status: 'Contract Signed'
    },
    {
      id: 'POOL-403',
      commodity: 'Organic Cotton (MCU-5)',
      totalQuantity: '160 MT',
      memberFarmers: 19,
      avgMoisture: '7.8%',
      aggregatedMandi: 'Rajkot Depo',
      currentBid: '₹7,650 /q (Vardhman Textiles)',
      status: 'Dispatching'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            FPO &amp; Aggregator Operations
          </h1>
          <p className="text-sm text-[#42493e] mt-0.5">
            Sahyadri Farmers Producer Company • 1,240 Registered Member Farmers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('market-intelligence')}
            className="px-4 py-2 bg-white border border-[#c2c9bb]/60 hover:bg-slate-50 text-[#0b1c30] rounded-xl text-xs font-bold shadow-2xs transition-all"
          >
            Market Realization
          </button>
          <button
            onClick={() => alert('New farmer aggregation pool initialized.')}
            className="px-4 py-2 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Produce Pool</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
            Aggregated Volume
          </span>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">890 MT</div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            +18% from last harvest
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
            Active Bulk Contracts
          </span>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">₹38.4M</div>
          <span className="text-[11px] text-[#72796e] font-medium block mt-1">
            Across 4 enterprise buyers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
            Pending Member Payouts
          </span>
          <div className="text-2xl font-extrabold text-[#904d00] mt-1">₹4.2M</div>
          <span className="text-[11px] text-[#72796e] font-medium block mt-1">
            Releasing upon dock delivery
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
            Dispatched Fleets
          </span>
          <div className="text-2xl font-extrabold text-[#154212] mt-1">12 Trucks</div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            All routes GPS tracked
          </span>
        </div>
      </div>

      {/* Pools Table */}
      <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#c2c9bb]/20 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#0b1c30]">Member Harvest Aggregation Pools</h3>
            <p className="text-xs text-[#42493e]">
              Pooled lots ready for institutional buyer bidding
            </p>
          </div>
          <span className="text-xs text-[#2d5a27] font-semibold bg-[#eff4ff] px-3 py-1 rounded-full">
            3 Active Pools
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                <th className="py-3 px-5 font-bold">Pool ID</th>
                <th className="py-3 px-4 font-bold">Commodity</th>
                <th className="py-3 px-4 font-bold">Total Volume</th>
                <th className="py-3 px-4 font-bold">Farmers</th>
                <th className="py-3 px-4 font-bold">Best Enterprise Bid</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c9bb]/20">
              {memberPools.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#154212]">{p.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#0b1c30]">{p.commodity}</div>
                    <div className="text-[11px] text-[#72796e]">Moisture: {p.avgMoisture}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0b1c30]">{p.totalQuantity}</td>
                  <td className="py-3.5 px-4 text-[#42493e]">{p.memberFarmers} farmers</td>
                  <td className="py-3.5 px-4 font-bold text-[#154212]">{p.currentBid}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === 'Open for Bids'
                          ? 'bg-[#eff4ff] text-[#2d5a27]'
                          : p.status === 'Contract Signed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => onNavigate('buyer-dashboard')}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-[#2d5a27] hover:text-white transition-colors"
                    >
                      Manage
                    </button>
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
