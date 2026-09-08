import React, { useState } from 'react';
import { BuyerRequirement } from '../../types';
import { X, Check, ShoppingBag } from 'lucide-react';

interface PostRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequirement: (req: BuyerRequirement) => void;
}

export const PostRequirementModal: React.FC<PostRequirementModalProps> = ({
  isOpen,
  onClose,
  onAddRequirement
}) => {
  const [title, setTitle] = useState('15 Tons Grade A Wheat');
  const [crop, setCrop] = useState('Wheat');
  const [quantity, setQuantity] = useState('15 Tons');
  const [dueDate, setDueDate] = useState('12 Nov');
  const [deliveryLocation, setDeliveryLocation] = useState('Mumbai Central Hub');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: BuyerRequirement = {
      id: `REQ-${Math.floor(200 + Math.random() * 800)}`,
      title,
      crop,
      quantity,
      dueDate,
      deliveryLocation,
      iconType: crop.toLowerCase().includes('soy') ? 'soybean' : 'wheat'
    };
    onAddRequirement(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 bg-[#eff4ff] border-b border-[#c2c9bb]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#904d00] text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0b1c30]">Post Procurement Requirement</h3>
              <p className="text-xs text-[#42493e]">Match with verified farmers &amp; FPOs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
              Requirement Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              >
                <option value="Wheat">Wheat</option>
                <option value="Soybeans">Soybeans</option>
                <option value="Basmati Rice">Basmati Rice</option>
                <option value="Maize">Maize</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Quantity Required
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Target Due Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. 15 Nov"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#42493e] uppercase tracking-wider mb-1">
                Delivery Hub
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#2d5a27] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
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
              <Check className="w-4 h-4" /> Post Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
