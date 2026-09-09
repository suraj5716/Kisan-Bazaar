import React from 'react';
import { ScreenTab, FarmerSubTab } from '../types';
import { ASSETS } from '../data/mockData';
import {
  BarChart2,
  PackageSearch,
  TrendingUp,
  Bot,
  Clock,
  Handshake,
  Tag,
  Truck,
  LogIn,
  Home,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Building2,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  farmerSubTab: FarmerSubTab;
  onSelectFarmerSubTab: (subTab: FarmerSubTab) => void;
  lotsCount: number;
  offersCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  farmerSubTab,
  onSelectFarmerSubTab,
  lotsCount,
  offersCount,
  isOpenMobile,
  onCloseMobile
}) => {
  const handleNav = (tab: ScreenTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const handleFarmerSubNav = (subTab: FarmerSubTab) => {
    onSelectTab('farmer-dashboard');
    onSelectFarmerSubTab(subTab);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = (isActive: boolean) =>
    `flex items-center px-4 py-2.5 transition-all gap-3 text-xs sm:text-sm font-medium rounded-xl cursor-pointer select-none ${
      isActive
        ? 'bg-[#2d5a27] text-white font-bold shadow-sm'
        : 'text-[#42493e] hover:bg-[#dce9ff]/60 hover:text-[#0b1c30]'
    }`;

  const isFarmerActive = currentTab === 'farmer-dashboard';

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
          className="px-6 mb-6 flex items-center gap-3 cursor-pointer group"
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
          {/* User credentials banner */}
          <div className="mx-1 mb-4 p-3 rounded-xl bg-white/80 border border-[#c2c9bb]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#154212] text-white flex items-center justify-center font-bold text-xs">
                {currentTab === 'farmer-dashboard'
                  ? 'J'
                  : currentTab === 'buyer-dashboard'
                  ? 'A'
                  : currentTab === 'fpo-dashboard'
                  ? 'S'
                  : 'AD'}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] truncate block">
                  {currentTab === 'farmer-dashboard'
                    ? 'Jai Kumar (Farmer)'
                    : currentTab === 'buyer-dashboard'
                    ? 'AgriCorp India (Buyer)'
                    : currentTab === 'fpo-dashboard'
                    ? 'Sahyadri FPO (Aggregator)'
                    : 'System Admin'}
                </span>
                <span className="text-[10px] text-[#2d5a27] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Credentials
                </span>
              </div>
            </div>
          </div>

          {/* If logged in as Farmer: Show the 8 Farmer Credential sections in place of Primary Hub */}
          {isFarmerActive && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#72796e] font-bold">
                Farmer Workspace
              </div>

              <button
                id="farmer-side-overview"
                onClick={() => handleFarmerSubNav('overview')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'overview')}`}
              >
                <BarChart2 className="w-4 h-4 flex-shrink-0" />
                <span>Overview</span>
              </button>

              <button
                id="farmer-side-my-lots"
                onClick={() => handleFarmerSubNav('my-lots')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'my-lots')}`}
              >
                <PackageSearch className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 flex items-center justify-between">
                  <span>My lots</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      farmerSubTab === 'my-lots'
                        ? 'bg-white/30 text-white'
                        : 'bg-[#dce9ff] text-[#154212] font-bold'
                    }`}
                  >
                    {lotsCount}
                  </span>
                </div>
              </button>

              <button
                id="farmer-side-market-intel"
                onClick={() => handleFarmerSubNav('market-intelligence')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'market-intelligence')}`}
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                <span>Market intelligence</span>
              </button>

              <button
                id="farmer-side-price-forecast"
                onClick={() => handleFarmerSubNav('price-forecast')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'price-forecast')}`}
              >
                <Bot className="w-4 h-4 flex-shrink-0" />
                <span>Price forecast</span>
              </button>

              <button
                id="farmer-side-sale-timing"
                onClick={() => handleFarmerSubNav('sale-timing')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'sale-timing')}`}
              >
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Sale timing</span>
              </button>

              <button
                id="farmer-side-buyer-matches"
                onClick={() => handleFarmerSubNav('buyer-matches')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'buyer-matches')}`}
              >
                <Handshake className="w-4 h-4 flex-shrink-0" />
                <span>Buyer matches</span>
              </button>

              <button
                id="farmer-side-offers"
                onClick={() => handleFarmerSubNav('offers')}
                className={`w-full text-left ${navItemClass(farmerSubTab === 'offers')}`}
              >
                <Tag className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 flex items-center justify-between">
                  <span>Offers</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      farmerSubTab === 'offers'
                        ? 'bg-white/30 text-white'
                        : 'bg-[#fe932c]/30 text-[#904d00] font-bold'
                    }`}
                  >
                    {offersCount}
                  </span>
                </div>
              </button>

              <button
                id="farmer-side-logistics"
                onClick={() => handleFarmerSubNav('logistics')}
                className={`w-full text-left flex items-center px-4 py-2.5 transition-all gap-3 text-xs sm:text-sm font-bold rounded-xl cursor-pointer shadow-xs ${
                  farmerSubTab === 'logistics'
                    ? 'bg-[#154212] text-white ring-2 ring-[#2d5a27]/30'
                    : 'bg-[#0f6b40] hover:bg-[#154212] text-white'
                }`}
              >
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span>Logistics</span>
              </button>
            </div>
          )}

          {/* If in other portals, provide easy back link to login page to change credentials */}
          {!isFarmerActive && (
            <div className="space-y-2">
              <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#72796e] font-bold">
                Active Portal View
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-[#0b1c30] block">
                  {currentTab === 'buyer-dashboard'
                    ? 'Buyer Procurement Portal'
                    : currentTab === 'fpo-dashboard'
                    ? 'FPO & Aggregators Hub'
                    : 'Admin Ecosystem Hub'}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  To switch roles or access Farmer credentials, visit the Primary Hub on the Login Page.
                </p>
                <button
                  onClick={() => handleNav('landing')}
                  className="mt-2.5 w-full py-2 bg-[#2d5a27] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#154212]"
                >
                  <LogIn className="w-3.5 h-3.5" /> Go to Login Page
                </button>
              </div>
            </div>
          )}

          <div className="h-px bg-[#c2c9bb]/40 my-4 mx-2" />

          {/* Quick exit / Link to Website Home & Login */}
          <button
            id="nav-landing"
            onClick={() => handleNav('landing')}
            className={`w-full text-left ${navItemClass(currentTab === 'landing')}`}
          >
            <Home className="w-4 h-4 flex-shrink-0 text-[#72796e]" />
            <span>Website Home</span>
          </button>

          <button
            id="nav-switch-portal"
            onClick={() => handleNav('landing')}
            className="w-full text-left flex items-center px-4 py-2.5 transition-all gap-3 text-xs font-semibold rounded-xl text-red-700 hover:bg-red-50 hover:text-red-900 cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Switch Portal / Log Out</span>
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
