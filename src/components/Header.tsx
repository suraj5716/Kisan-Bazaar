import React, { useState } from 'react';
import { ScreenTab } from '../types';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  Check,
  X,
  User,
  Shield,
  Briefcase
} from 'lucide-react';

interface HeaderProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New counter-offer received',
      desc: 'Anil D. countered at ₹2,150/q for 8 Tons Maize.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Wheat price surge alert',
      desc: 'Nagpur Mandi base price jumped +4.2% today.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Payment processed',
      desc: '₹45,000 released to escrow for Lot #L-4090.',
      time: '3h ago',
      unread: false
    }
  ];

  const getRoleInfo = () => {
    switch (currentTab) {
      case 'buyer-dashboard':
        return { name: 'AgriCorp India', role: 'Verified Buyer', initial: 'A' };
      case 'admin-dashboard':
        return { name: 'S. Sharma', role: 'Platform Admin', initial: 'S' };
      case 'fpo-dashboard':
        return { name: 'Sahyadri FPO', role: 'Aggregator Hub', initial: 'S' };
      default:
        return { name: 'Jai Kumar', role: 'Farmer', initial: 'J' };
    }
  };

  const role = getRoleInfo();

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#c2c9bb]/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-4 sm:px-6">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 text-[#42493e] hover:text-[#154212] rounded-lg hover:bg-slate-200/50"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative flex items-center w-56 sm:w-80 md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 text-[#72796e] pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search crops, markets, buyers..."
              className="w-full bg-white border border-[#c2c9bb]/60 rounded-full py-1.5 pl-9 pr-4 text-xs sm:text-sm text-[#0b1c30] placeholder-[#72796e] focus:outline-none focus:ring-1.5 focus:ring-[#2d5a27] focus:border-[#2d5a27] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#42493e]">
          {/* Notifications button */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              className="p-2 hover:text-[#154212] hover:bg-white rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]" />
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#c2c9bb]/40 p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-sm text-[#0b1c30]">Notifications (2 Unread)</div>
                  <span className="text-xs text-[#2d5a27] font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-3 px-1 hover:bg-slate-50 transition-colors rounded-lg flex items-start gap-3 ${
                        n.unread ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#2d5a27] mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#0b1c30]">{n.title}</p>
                        <p className="text-[11px] text-[#42493e] mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-[#72796e] font-mono mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help button */}
          <div className="relative">
            <button
              id="help-btn"
              onClick={() => {
                setShowHelp(!showHelp);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              className="p-2 hover:text-[#154212] hover:bg-white rounded-full transition-colors"
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Help Popover */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#c2c9bb]/40 p-4 z-50">
                <h4 className="font-bold text-sm text-[#0b1c30] mb-2">Kisan Bazaar Support</h4>
                <p className="text-xs text-[#42493e] leading-relaxed mb-3">
                  Need help with listing lots, mandi price intelligence, or logistics?
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#154212] font-medium flex items-center justify-between">
                    <span>Toll-free Kisan Helpline</span>
                    <span className="font-bold">1800-180-1551</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-between">
                    <span>Mandi Sync Status</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Operational
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-[#c2c9bb]/50 mx-1 hidden sm:block" />

          {/* User profile dropdown */}
          <div className="relative">
            <button
              id="user-profile-btn"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowHelp(false);
              }}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-white transition-colors"
            >
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-semibold text-[#0b1c30] leading-tight">
                  {role.name}
                </span>
                <span className="text-[10px] text-[#72796e] font-medium">{role.role}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#154212] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {role.initial}
              </div>
            </button>

            {/* Role switch menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#c2c9bb]/40 p-3 z-50">
                <div className="px-3 py-2 border-b border-slate-100 mb-2">
                  <p className="text-xs font-bold text-[#0b1c30]">{role.name}</p>
                  <p className="text-[11px] text-[#72796e]">{role.role} View Active</p>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#72796e] font-bold px-3 py-1">
                  Switch Portal View
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onSelectTab('farmer-dashboard');
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                      currentTab === 'farmer-dashboard'
                        ? 'bg-[#2d5a27] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Farmer Portal
                    </span>
                    {currentTab === 'farmer-dashboard' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectTab('fpo-dashboard');
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                      currentTab === 'fpo-dashboard'
                        ? 'bg-[#2d5a27] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" /> FPO Hub
                    </span>
                    {currentTab === 'fpo-dashboard' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectTab('buyer-dashboard');
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                      currentTab === 'buyer-dashboard'
                        ? 'bg-[#2d5a27] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" /> Buyer Portal
                    </span>
                    {currentTab === 'buyer-dashboard' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectTab('admin-dashboard');
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                      currentTab === 'admin-dashboard'
                        ? 'bg-[#2d5a27] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" /> Admin Hub
                    </span>
                    {currentTab === 'admin-dashboard' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button
                    onClick={() => {
                      onSelectTab('landing');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 font-medium"
                  >
                    Log out to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
