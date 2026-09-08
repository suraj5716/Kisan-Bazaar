import React, { useState } from 'react';
import { X, Check, MapPin, Award, Truck, ShieldCheck, IndianRupee } from 'lucide-react';

interface LotDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotData: {
    title: string;
    crop: string;
    seller: string;
    location: string;
    distanceKm?: number;
    pricePerQuintal: number | string;
    quantity: string;
    imageUrl?: string;
    matchScore?: number;
    quality?: string;
  } | null;
  onPlaceOffer?: (lotTitle: string, offerRate: number) => void;
}

export const LotDetailsModal: React.FC<LotDetailsModalProps> = ({
  isOpen,
  onClose,
  lotData,
  onPlaceOffer
}) => {
  const [offerRate, setOfferRate] = useState<number>(2800);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !lotData) return null;

  const handleOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPlaceOffer) {
      onPlaceOffer(lotData.title, offerRate);
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Visual Header */}
        {lotData.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-900">
            <img
              src={lotData.imageUrl}
              alt={lotData.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              {lotData.matchScore && (
                <span className="inline-block px-2 py-0.5 rounded bg-[#2d5a27] text-white text-[11px] font-bold mb-1">
                  {lotData.matchScore}% Match
                </span>
              )}
              <h3 className="text-lg font-bold leading-tight">{lotData.title}</h3>
            </div>
          </div>
        )}

        {!lotData.imageUrl && (
          <div className="p-5 bg-[#eff4ff] border-b border-[#c2c9bb]/30 flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0b1c30]">{lotData.title}</h3>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Metadata chips */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Seller</span>
              <span className="font-bold text-[#0b1c30] truncate block">{lotData.seller}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-bold text-[#0b1c30] truncate block">{lotData.location}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Quantity</span>
              <span className="font-bold text-[#0b1c30] truncate block">{lotData.quantity}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#c2c9bb]/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                Base Listed Rate
              </span>
              <div className="text-xl font-bold text-[#154212]">
                ₹{typeof lotData.pricePerQuintal === 'number' ? lotData.pricePerQuintal.toLocaleString() : lotData.pricePerQuintal}
                <span className="text-xs text-slate-500 font-normal"> /quintal</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#2d5a27] font-semibold bg-white/80 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#2d5a27]" /> Quality Verified
            </div>
          </div>

          {/* Offer input form */}
          {isSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 font-semibold text-sm flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              Counter-offer of ₹{offerRate}/q submitted to {lotData.seller}!
            </div>
          ) : (
            <form onSubmit={handleOffer} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Submit Your Offer / Bid (₹/Quintal)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1000"
                  max="50000"
                  value={offerRate}
                  onChange={(e) => setOfferRate(Number(e.target.value))}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none font-bold"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2d5a27] text-white font-bold text-xs hover:bg-[#1e3e1a] shadow-xs"
                >
                  Send Bid
                </button>
              </div>
            </form>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
