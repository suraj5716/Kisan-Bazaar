import React from 'react';
import { FarmerSubTab } from '../types';
import {
  BarChart2,
  PackageSearch,
  TrendingUp,
  Bot,
  Clock,
  Handshake,
  Tag,
  Truck
} from 'lucide-react';

interface FarmerNavBarProps {
  activeTab: FarmerSubTab;
  onSelectTab: (tab: FarmerSubTab) => void;
  lotsCount: number;
  offersCount: number;
}

export const FarmerNavBar: React.FC<FarmerNavBarProps> = ({
  activeTab,
  onSelectTab,
  lotsCount,
  offersCount
}) => {
  const tabs: {
    id: FarmerSubTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    isButton?: boolean;
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      id: 'my-lots',
      label: `My lots · ${lotsCount}`,
      icon: <PackageSearch className="w-4 h-4" />
    },
    {
      id: 'market-intelligence',
      label: 'Market intelligence',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 'price-forecast',
      label: 'Price forecast',
      icon: <Bot className="w-4 h-4" />
    },
    {
      id: 'sale-timing',
      label: 'Sale timing',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 'buyer-matches',
      label: 'Buyer matches',
      icon: <Handshake className="w-4 h-4" />
    },
    {
      id: 'offers',
      label: `Offers · ${offersCount}`,
      icon: <Tag className="w-4 h-4" />
    },
    {
      id: 'logistics',
      label: 'Logistics',
      icon: <Truck className="w-4 h-4" />,
      isButton: true
    }
  ];

  return (
    <div className="w-full overflow-x-auto pb-1 mb-6">
      <nav
        aria-label="Farmer Portal Navigation"
        className="bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-[#c2c9bb]/30 shadow-xs inline-flex items-center gap-1 min-w-max"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          if (tab.isButton) {
            return (
              <button
                key={tab.id}
                id={`farmer-tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`ml-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#154212] text-white ring-2 ring-[#2d5a27]/40 scale-102'
                    : 'bg-[#0f6b40] hover:bg-[#154212] text-white hover:shadow-md'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              id={`farmer-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#eff4ff] text-[#154212] font-bold shadow-2xs'
                  : 'text-[#42493e] hover:text-[#0b1c30] hover:bg-slate-50'
              }`}
            >
              <span className={isActive ? 'text-[#154212]' : 'text-[#72796e]'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
