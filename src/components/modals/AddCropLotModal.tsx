import React, { useState } from 'react';
import { CropLot } from '../../types';
import { X, Check, Sprout, Scale, IndianRupee, Calendar } from 'lucide-react';

interface AddCropLotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLot: (lot: CropLot) => void;
}

export const AddCropLotModal: React.FC<AddCropLotModalProps> = ({
  isOpen,
  onClose,
  onAddLot
}) => {
  const [crop, setCrop] = useState('Wheat');
  const [grade, setGrade] = useState('Grade A (Lok-1)');
  const [quantityVal, setQuantityVal] = useState<number>(120);
  const [targetPrice, setTargetPrice] = useState<number>(2750);
  const [moisture, setMoisture] = useState('11.0%');
  const [location, setLocation] = useState('Nashik, MH');

  if (!isOpen) return null;

  const totalValue = quantityVal * targetPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLot: CropLot = {
      id: `#L-${Math.floor(4000 + Math.random() * 900)}`,
      crop,
      grade,
      quantity: `${quantityVal} Quintals`,
      quantityVal,
      bestOffer: 'No offers yet',
      status: 'Published',
      farmerName: 'Jai Kumar',
      location,
      harvestDate: 'Oct 2024',
      moisture
    };
    onAddLot(newLot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#eff4ff] border-b border-[#c2c9bb]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2d5a27] text-white flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0b1c30]">Add New Crop Lot</h3>
              <p className="text-xs text-[#42493e]">Publish verified produce to 50,000+ active buyers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Crop Type
              </label>
              <select
                value={crop}
                onChange={(e) => {
                  setCrop(e.target.value);
                  if (e.target.value === 'Wheat') setGrade('Grade A (Lok-1)');
                  else if (e.target.value === 'Soybean') setGrade('Standard Yellow');
                  else if (e.target.value === 'Basmati Rice') setGrade('Pusa 1121');
                  else setGrade('Standard Grade');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              >
                <option value="Wheat">Wheat</option>
                <option value="Soybean">Soybean</option>
                <option value="Basmati Rice">Basmati Rice</option>
                <option value="Cotton">Cotton</option>
                <option value="Maize">Maize</option>
                <option value="Mustard">Mustard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Grade / Variety
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Quantity (Quintals)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={quantityVal}
                  onChange={(e) => setQuantityVal(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Qtl</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Target Price (₹/Qtl)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  max="50000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">₹/q</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Moisture %
              </label>
              <input
                type="text"
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Farm / Mandi Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>
          </div>

          {/* Valuation Summary Card */}
          <div className="p-3.5 rounded-xl bg-[#eef5ee] border border-[#c8dec6] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#2d5a27] uppercase tracking-wider">
                Estimated Lot Gross Value
              </span>
              <div className="text-xl font-extrabold text-[#154212]">
                ₹{totalValue.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="text-right text-xs text-[#2d5a27]">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" /> Direct Escrow Ready
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#2d5a27] hover:bg-[#1e3e1a] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Publish Crop Lot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
