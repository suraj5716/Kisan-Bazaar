import React, { useState } from 'react';
import {
  BuyerRequirement,
  SmartMatch,
  AvailableLot,
  NegotiationItem,
  ScreenTab
} from '../../types';
import { ASSETS } from '../../data/mockData';
import {
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Star,
  Clock,
  Sparkles,
  Truck,
  ArrowRight,
  Wheat,
  CircleDot,
  Check,
  X,
  MapPin,
  Trash2
} from 'lucide-react';

interface BuyerPortalProps {
  requirements: BuyerRequirement[];
  smartMatches: SmartMatch[];
  availableLots: AvailableLot[];
  negotiations: NegotiationItem[];
  onOpenPostRequirement: () => void;
  onViewLotDetails: (data: any) => void;
  onNavigate: (tab: ScreenTab) => void;
  onDeleteRequirement?: (id: string) => void;
  onUpdateNegotiation?: (id: string, newStatus: NegotiationItem['statusType']) => void;
}

export const BuyerPortal: React.FC<BuyerPortalProps> = ({
  requirements,
  smartMatches,
  availableLots,
  negotiations,
  onOpenPostRequirement,
  onViewLotDetails,
  onNavigate,
  onDeleteRequirement,
  onUpdateNegotiation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredLots = availableLots.filter((lot) => {
    const matchesSearch =
      lot.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
            Buyer Procurement Portal
          </h1>
          <p className="text-sm text-[#42493e] mt-0.5">
            Discover verified farm lots, manage active requirements, and automate contracts.
          </p>
        </div>

        <button
          id="post-requirement-btn"
          onClick={onOpenPostRequirement}
          className="px-4 py-2.5 bg-[#2d5a27] hover:bg-[#154212] text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Requirement</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Requirements Section */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">Active Requirements</h3>
                <p className="text-xs text-[#42493e]">Your published demand open for farm bids</p>
              </div>
              <span className="text-xs font-semibold text-[#72796e]">
                {requirements.length} Open
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {requirements.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/40 hover:border-[#2d5a27] transition-all relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#154212] flex items-center justify-center font-bold">
                          <Wheat className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[#0b1c30]">{req.title}</h4>
                      </div>

                      {onDeleteRequirement && (
                        <button
                          onClick={() => onDeleteRequirement(req.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition-opacity"
                          title="Delete requirement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-[#42493e]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#72796e]" />
                        <span>Due: {req.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#72796e]" />
                        <span>Delivery: {req.deliveryLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#c2c9bb]/30 flex items-center justify-between text-xs">
                    <span className="text-[#2d5a27] font-semibold text-[11px]">
                      Accepting farmer lots
                    </span>
                    <span className="font-mono text-[10px] text-[#72796e]">{req.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Matches (AI Suggested) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#bcf0ae]/60 text-[#154212] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  Smart Matches <span className="text-xs text-[#72796e] font-normal">(AI Suggested)</span>
                </h3>
              </div>
              <span className="text-xs text-[#2d5a27] font-semibold">Matched to your specs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {smartMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-all"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={match.imageUrl}
                      alt={match.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#154212] text-white text-[11px] font-bold shadow-xs">
                      {match.matchScore}% Match
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0b1c30] leading-snug">
                        {match.title}
                      </h4>
                      <p className="text-xs text-[#72796e] mt-1">
                        {match.seller} • {match.location} ({match.distanceKm}km)
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#154212]">
                          ₹{match.pricePerQuintal.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#72796e]"> /quintal</span>
                      </div>
                      <button
                        onClick={() => onViewLotDetails(match)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#2d5a27] hover:text-white text-[#154212] font-bold text-xs transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Lots Explorer */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#c2c9bb]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">Available Lots Explorer</h3>
                <p className="text-xs text-[#42493e]">Direct listings from verified farmers &amp; FPOs</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter crops..."
                    className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2d5a27]"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#c2c9bb]/20 text-[11px] uppercase tracking-wider text-[#72796e] bg-slate-50/50">
                    <th className="py-3 px-5 font-bold">Crop &amp; Quality</th>
                    <th className="py-3 px-4 font-bold">Seller &amp; Mandi</th>
                    <th className="py-3 px-4 font-bold">Volume</th>
                    <th className="py-3 px-4 font-bold">Est. Price</th>
                    <th className="py-3 px-5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c9bb]/20">
                  {filteredLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-[#0b1c30]">{lot.crop}</div>
                        <div className="text-[11px] text-[#72796e]">{lot.quality}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#0b1c30] font-medium">{lot.seller}</div>
                        <div className="text-[11px] text-[#72796e]">{lot.location}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#0b1c30]">{lot.volume}</td>
                      <td className="py-3.5 px-4 font-bold text-[#154212]">{lot.estPrice}</td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() =>
                            onViewLotDetails({
                              title: `${lot.volume} ${lot.crop}`,
                              crop: lot.crop,
                              seller: lot.seller,
                              location: lot.location,
                              pricePerQuintal: lot.estPrice,
                              quantity: lot.volume,
                              quality: lot.quality
                            })
                          }
                          className="px-3 py-1 bg-white border border-[#c2c9bb]/60 rounded-lg text-xs font-bold text-[#0b1c30] hover:bg-[#2d5a27] hover:text-white transition-colors"
                        >
                          Make Offer
                        </button>
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
          {/* AgriCorp India Buyer Profile Card */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#154212] flex items-center justify-center font-extrabold text-lg shadow-xs">
                  AC
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0b1c30]">AgriCorp India</h3>
                  <div className="flex items-center gap-1 text-xs text-[#2d5a27] font-semibold mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Deals Closed
                </span>
                <span className="text-lg font-bold text-[#0b1c30]">142</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Rating</span>
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-[#0b1c30]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Negotiations */}
          <div className="bg-white rounded-2xl border border-[#c2c9bb]/30 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#0b1c30]">Active Negotiations</h3>
              <span className="text-xs text-[#72796e] font-semibold">
                {negotiations.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {negotiations.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#eff4ff]/60 border border-[#c2c9bb]/30 flex flex-col gap-2 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-[#0b1c30] block">{item.cropAndVolume}</span>
                      <span className="text-[11px] text-[#72796e]">
                        {item.partyType}: {item.partyName} • Bid: {item.bidPrice}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.statusType === 'Counter-Offer'
                          ? 'bg-[#ffdcc3] text-[#904d00]'
                          : item.statusType === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.statusType === 'Declined'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.statusType}
                    </span>
                  </div>

                  {item.statusType === 'Counter-Offer' && (
                    <div className="flex gap-2 mt-1 pt-1 border-t border-[#c2c9bb]/20">
                      <button
                        onClick={() =>
                          onUpdateNegotiation && onUpdateNegotiation(item.id, 'Accepted')
                        }
                        className="flex-1 py-1.5 bg-[#2d5a27] text-white rounded-lg text-xs font-bold hover:bg-[#154212] transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button
                        onClick={() =>
                          onUpdateNegotiation && onUpdateNegotiation(item.id, 'Declined')
                        }
                        className="flex-1 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  )}

                  {item.statusType === 'Pending' && (
                    <div className="mt-1 pt-1 border-t border-[#c2c9bb]/20">
                      <button
                        onClick={() =>
                          onUpdateNegotiation && onUpdateNegotiation(item.id, 'Declined')
                        }
                        className="w-full py-1.5 text-[11px] text-slate-600 hover:text-red-600 font-semibold"
                      >
                        Withdraw Offer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Transport */}
          <div className="bg-[#eff4ff] rounded-2xl border border-[#c2c9bb]/30 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffdcc3] text-[#904d00] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0b1c30]">Logistics &amp; Transport</h4>
                <p className="text-xs text-[#72796e]">Fleet tracking &amp; freight quotes</p>
              </div>
            </div>

            <p className="text-xs text-[#42493e] mb-4 leading-relaxed">
              Book trucks for your upcoming deliveries at negotiated rates. Multi-axle carriers
              available.
            </p>

            <button
              onClick={() => onNavigate('market-intelligence')}
              className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#0b1c30] rounded-xl font-bold text-xs border border-[#c2c9bb]/40 shadow-2xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Routes &amp; Warehouses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
