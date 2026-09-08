import React, { useState } from 'react';
import { ScreenTab } from '../../types';
import { RECENT_ACTIVITIES, ASSETS } from '../../data/mockData';
import {
  Users,
  Coins,
  Scale,
  AlertTriangle,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Flame,
  ArrowUpRight,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface AdminHubProps {
  onNavigate: (tab: ScreenTab) => void;
}

interface RealizationMatrixRow {
  region: string;
  crop: string;
  supply: string;
  demand: string;
  mandiPrice: string;
  directBuyerPrice: string;
  farmerPremium: string;
}

const REGIONAL_MATRIX_DATA: RealizationMatrixRow[] = [
  {
    region: 'Punjab - Ludhiana',
    crop: 'Wheat',
    supply: '1850 T',
    demand: '2400 T',
    mandiPrice: '₹2450/q',
    directBuyerPrice: '₹2580/q',
    farmerPremium: '+₹130/q (5%)'
  },
  {
    region: 'Punjab - Tarn Taran',
    crop: 'Paddy',
    supply: '2200 T',
    demand: '3100 T',
    mandiPrice: '₹3820/q',
    directBuyerPrice: '₹3950/q',
    farmerPremium: '+₹130/q (3%)'
  },
  {
    region: 'Haryana - Karnal',
    crop: 'Wheat',
    supply: '1400 T',
    demand: '2800 T',
    mandiPrice: '₹2600/q',
    directBuyerPrice: '₹2680/q',
    farmerPremium: '+₹80/q (3%)'
  },
  {
    region: 'MP - Indore',
    crop: 'Soybean',
    supply: '3500 T',
    demand: '4200 T',
    mandiPrice: '₹4720/q',
    directBuyerPrice: '₹4890/q',
    farmerPremium: '+₹170/q (4%)'
  },
  {
    region: 'Maharashtra - Nashik',
    crop: 'Onion',
    supply: '4800 T',
    demand: '5000 T',
    mandiPrice: '₹2650/q',
    directBuyerPrice: '₹2780/q',
    farmerPremium: '+₹130/q (5%)'
  }
];

export const AdminHub: React.FC<AdminHubProps> = ({ onNavigate }) => {
  const [regionFilter, setRegionFilter] = useState<'state' | 'district'>('state');
  const [heatFilter, setHeatFilter] = useState<'supply' | 'demand'>('supply');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCSV = () => {
    const headers = [
      'REGION / DISTRICT',
      'CROP',
      'SUPPLY (TONS)',
      'DEMAND (TONS)',
      'MANDI PRICE',
      'DIRECT BUYER PRICE',
      'FARMER PREMIUM'
    ];

    const rows = REGIONAL_MATRIX_DATA.map((r) => [
      `"${r.region}"`,
      `"${r.crop}"`,
      `"${r.supply}"`,
      `"${r.demand}"`,
      `"${r.mandiPrice}"`,
      `"${r.directBuyerPrice}"`,
      `"${r.farmerPremium}"`
    ]);

    const csvString = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Regional_Price_Realization_Matrix_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            Ecosystem Overview (Admin)
          </h1>
          <p className="text-sm text-[#42493e] mt-0.5">
            Real-time multi-mandi platform liquidity, transaction flows, and risk alerts.
          </p>
        </div>

        {/* State / District Toggle */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#c2c9bb]/40 shadow-2xs">
          <button
            onClick={() => setRegionFilter('state')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              regionFilter === 'state'
                ? 'bg-[#2d5a27] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State-wise
          </button>
          <button
            onClick={() => setRegionFilter('district')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              regionFilter === 'district'
                ? 'bg-[#2d5a27] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            District-wise
          </button>
        </div>
      </div>

      {/* 4 Big KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Total Users
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +12%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">142.5k</div>
          <div className="flex items-center gap-3 text-[11px] text-[#72796e] mt-2 font-medium">
            <span>F: 98k</span>
            <span>•</span>
            <span>B: 42k</span>
            <span>•</span>
            <span>FPO: 2.5k</span>
          </div>
        </div>

        {/* KPI 2: Transaction Volume */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Transaction Vol
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +8.4%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">₹4.2B</div>
          {/* Sparkline */}
          <div className="flex items-end gap-1 h-4 mt-2">
            <div className="w-1/6 bg-[#2d5a27]/30 h-[40%] rounded-xs" />
            <div className="w-1/6 bg-[#2d5a27]/40 h-[60%] rounded-xs" />
            <div className="w-1/6 bg-[#2d5a27]/50 h-[50%] rounded-xs" />
            <div className="w-1/6 bg-[#2d5a27]/70 h-[80%] rounded-xs" />
            <div className="w-1/6 bg-[#2d5a27]/80 h-[70%] rounded-xs" />
            <div className="w-1/6 bg-[#154212] h-[100%] rounded-xs" />
          </div>
        </div>

        {/* KPI 3: Produce Volume */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Produce Volume
            </span>
            <span className="text-xs text-[#72796e] font-semibold">Q3 Target</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1">845k Tons</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-[#2d5a27] h-full rounded-full" style={{ width: '75%' }} />
          </div>
          <div className="text-[10px] text-[#72796e] mt-1">75% of quarterly target met</div>
        </div>

        {/* KPI 4: Active Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-[#c2c9bb]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#72796e] uppercase tracking-wider">
              Active Alerts
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-[#ba1a1a] mt-1">24</div>
          <div className="text-[11px] text-[#42493e] mt-2 space-y-0.5">
            <div className="truncate text-red-600 font-medium">• Price Drop (Tomato) Nashik</div>
            <div className="truncate text-amber-600 font-medium">• Supply Spike (Wheat) Pune</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Market Heatmap & Activity */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#c2c9bb]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  Maharashtra Market Liquidity &amp; Heatmap
                </h3>
                <p className="text-xs text-[#42493e]">
                  Geographic concentration of commodities in transit
                </p>
              </div>

              {/* Supply / Demand Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setHeatFilter('supply')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    heatFilter === 'supply'
                      ? 'bg-white text-[#154212] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Supply Concentration
                </button>
                <button
                  onClick={() => setHeatFilter('demand')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    heatFilter === 'demand'
                      ? 'bg-white text-[#904d00] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Buyer Demand
                </button>
              </div>
            </div>

            <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
              <img
                src={ASSETS.heatmapMaharashtra}
                alt="Maharashtra Heatmap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Overlay Interactive Pins */}
              <div className="absolute top-1/4 left-1/3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-md border border-emerald-400 text-xs font-bold text-[#154212] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Nashik Hub (₹85M)
              </div>

              <div className="absolute bottom-1/3 right-1/4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-md border border-emerald-400 text-xs font-bold text-[#154212] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Pune Agro-Corridor (₹120M)
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                <span>Total Active Regional Clusters: 18</span>
                <span className="font-semibold text-emerald-300">Live Telemetry Connected</span>
              </div>
            </div>
          </div>

          {/* Regional Supply, Demand & Mandi vs Direct Buyer Price Realization Matrix */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#0b1c30] tracking-tight">
                  Regional Supply, Demand &amp; Mandi vs Direct Buyer Price Realization Matrix
                </h3>
                <p className="text-xs text-[#42493e] mt-0.5">
                  District-level volume liquidity balance and direct procurement price spread
                </p>
              </div>

              <div className="flex items-center gap-2">
                {downloadSuccess && (
                  <span className="text-[11px] font-bold text-[#154212] flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    CSV Exported!
                  </span>
                )}
                <button
                  id="download-matrix-btn"
                  onClick={handleDownloadCSV}
                  className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#2d5a27] text-[#154212] hover:text-white rounded-xl text-xs font-bold transition-all border border-[#c2c9bb]/40 shadow-2xs flex items-center gap-2 cursor-pointer"
                  title="Download Regional Realization Matrix as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Matrix CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/70">
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Region / District</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Crop</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Supply (Tons)</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Demand (Tons)</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Mandi Price</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap">Direct Buyer Price</th>
                    <th className="py-3 px-4 font-bold whitespace-nowrap text-right">Farmer Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/15">
                  {REGIONAL_MATRIX_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0b1c30] whitespace-nowrap">
                        {row.region}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                        {row.crop}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#059669] whitespace-nowrap">
                        {row.supply}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#4f46e5] whitespace-nowrap">
                        {row.demand}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 font-mono whitespace-nowrap">
                        {row.mandiPrice}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#059669] font-mono whitespace-nowrap">
                        {row.directBuyerPrice}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#059669] font-mono whitespace-nowrap text-right">
                        {row.farmerPremium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#0b1c30]">Recent Platform Activity</h3>
              <span className="text-xs text-[#2d5a27] font-semibold">Live Feed</span>
            </div>

            <div className="space-y-3.5">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      act.colorType === 'primary'
                        ? 'bg-[#eff4ff] text-[#154212]'
                        : act.colorType === 'secondary'
                        ? 'bg-[#ffdcc3] text-[#904d00]'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#0b1c30] leading-snug">{act.title}</div>
                    <div className="text-[11px] text-[#72796e] mt-0.5">{act.meta}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              View All System Logs
            </button>
          </div>

          {/* Supply vs Demand (Major Crops) */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#0b1c30]">Supply vs Demand Ratio</h3>
              <span className="text-[11px] text-[#72796e]">Major Crops</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-[#0b1c30] mb-1">
                  <span>Soybean</span>
                  <span className="text-emerald-700 font-bold">1.2x Equilibrium</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 flex">
                  <div className="bg-[#2d5a27] h-full rounded-l-full w-3/5" />
                  <div className="bg-[#fe932c] h-full rounded-r-full w-2/5" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-[#0b1c30] mb-1">
                  <span>Wheat</span>
                  <span className="text-amber-700 font-bold">0.85x High Demand</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 flex">
                  <div className="bg-[#2d5a27] h-full rounded-l-full w-2/5" />
                  <div className="bg-[#fe932c] h-full rounded-r-full w-3/5" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-[#0b1c30] mb-1">
                  <span>Onions</span>
                  <span className="text-red-600 font-bold">2.1x Surplus Gluts</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 flex">
                  <div className="bg-[#2d5a27] h-full rounded-l-full w-4/5" />
                  <div className="bg-[#fe932c] h-full rounded-r-full w-1/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
