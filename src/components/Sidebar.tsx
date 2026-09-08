import React from 'react';
import { ScreenTab } from '../types';
import { ASSETS } from '../data/mockData';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ShieldCheck,
  TrendingUp,
  Brain,
  Home,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const handleNav = (tab: ScreenTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = (isActive: boolean) =>
    `flex items-center px-4 py-3 transition-all gap-3 text-sm font-medium rounded-xl cursor-pointer select-none ${
      isActive
        ? 'bg-[#2d5a27] text-white font-bold shadow-sm'
        : 'text-[#42493e] hover:bg-[#dce9ff]/60 hover:text-[#0b1c30]'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#eff4ff] border-r border-[#c2c9bb]/40 shadow-[1px_0_8px_rgba(0,0,0,0.02)] z-50 flex flex-col pt-6 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div
          className="px-6 mb-8 flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav('landing')}
        >
          <img
            src={ASSETS.logo}
            alt="Kisan Market"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-[#154212] tracking-tight leading-none">
              Kisan Market
            </span>
            <span className="text-[10px] text-[#72796e] uppercase tracking-wider font-semibold mt-0.5">
              Agri Commerce Hub
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {/* Primary Hub Section */}
          <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-[#72796e] font-bold">
            Primary Hub
          </div>

          <button
            id="nav-farmer-portal"
            onClick={() => handleNav('farmer-dashboard')}
            className={`w-full text-left ${navItemClass(currentTab === 'farmer-dashboard')}`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            <span>Farmer Portal</span>
          </button>

          <button
            id="nav-fpo-portal"
            onClick={() => handleNav('fpo-dashboard')}
            className={`w-full text-left ${navItemClass(currentTab === 'fpo-dashboard')}`}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <span>FPO Portal</span>
          </button>

          <button
            id="nav-buyer-portal"
            onClick={() => handleNav('buyer-dashboard')}
            className={`w-full text-left ${navItemClass(currentTab === 'buyer-dashboard')}`}
          >
            <ShoppingBag className="w-5 h-5 flex-shrink-0" />
            <span>Buyer Portal</span>
          </button>

          <button
            id="nav-admin-hub"
            onClick={() => handleNav('admin-dashboard')}
            className={`w-full text-left ${navItemClass(currentTab === 'admin-dashboard')}`}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span>Admin Hub</span>
          </button>

          <div className="h-px bg-[#c2c9bb]/40 my-4 mx-2" />

          {/* Market Tools Section */}
          <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-[#72796e] font-bold">
            Market Tools
          </div>

          <button
            id="nav-market-intel"
            onClick={() => handleNav('market-intelligence')}
            className={`w-full text-left ${navItemClass(currentTab === 'market-intelligence')}`}
          >
            <TrendingUp className="w-5 h-5 flex-shrink-0" />
            <span>Market Intelligence</span>
          </button>

          <button
            id="nav-price-prediction"
            onClick={() => handleNav('price-prediction')}
            className={`w-full text-left ${navItemClass(currentTab === 'price-prediction')}`}
          >
            <Brain className="w-5 h-5 flex-shrink-0" />
            <span>Price Prediction</span>
          </button>

          <div className="h-px bg-[#c2c9bb]/40 my-4 mx-2" />

          {/* Quick link to Landing Home */}
          <button
            id="nav-landing"
            onClick={() => handleNav('landing')}
            className={`w-full text-left ${navItemClass(currentTab === 'landing')}`}
          >
            <Home className="w-5 h-5 flex-shrink-0 text-[#72796e]" />
            <span>Website Home</span>
          </button>
        </nav>

        {/* Live sync indicator footer */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-white/70 border border-[#c2c9bb]/40 text-xs">
          <div className="flex items-center gap-1.5 text-[#154212] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            500+ Mandis Live
          </div>
          <p className="text-[11px] text-[#72796e] mt-1 leading-snug">
            Real-time APMC e-NAM rates synced 2m ago.
          </p>
        </div>
      </aside>
    </>
  );
};
