import React, { useState } from 'react';
import {
  ScreenTab,
  FarmerSubTab,
  CropLot,
  BuyerRequirement,
  SmartMatch,
  AvailableLot,
  NegotiationItem
} from './types';
import {
  INITIAL_CROP_LOTS,
  INITIAL_BUYER_REQUIREMENTS,
  SMART_MATCHES,
  AVAILABLE_LOTS,
  INITIAL_NEGOTIATIONS
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/screens/LandingPage';
import { FarmerDashboard } from './components/screens/FarmerDashboard';
import { BuyerPortal } from './components/screens/BuyerPortal';
import { MarketIntelligence } from './components/screens/MarketIntelligence';
import { AdminHub } from './components/screens/AdminHub';
import { FpoPortal } from './components/screens/FpoPortal';
import { PricePredictionView } from './components/screens/PricePredictionView';
import { AddCropLotModal } from './components/modals/AddCropLotModal';
import { PostRequirementModal } from './components/modals/PostRequirementModal';
import { LotDetailsModal } from './components/modals/LotDetailsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('farmer-dashboard');
  const [farmerSubTab, setFarmerSubTab] = useState<FarmerSubTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Modals state
  const [isAddLotOpen, setIsAddLotOpen] = useState(false);
  const [isPostReqOpen, setIsPostReqOpen] = useState(false);
  const [selectedLotForModal, setSelectedLotForModal] = useState<any | null>(null);

  // Core interactive data collections
  const [cropLots, setCropLots] = useState<CropLot[]>(INITIAL_CROP_LOTS);
  const [requirements, setRequirements] = useState<BuyerRequirement[]>(
    INITIAL_BUYER_REQUIREMENTS
  );
  const [smartMatches, setSmartMatches] = useState<SmartMatch[]>(SMART_MATCHES);
  const [availableLots, setAvailableLots] = useState<AvailableLot[]>(AVAILABLE_LOTS);
  const [negotiations, setNegotiations] = useState<NegotiationItem[]>(
    INITIAL_NEGOTIATIONS
  );

  // Handlers
  const handleAddLot = (newLot: CropLot) => {
    setCropLots([newLot, ...cropLots]);
  };

  const handleAddRequirement = (newReq: BuyerRequirement) => {
    setRequirements([newReq, ...requirements]);
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  const handleUpdateNegotiation = (
    id: string,
    newStatus: NegotiationItem['statusType']
  ) => {
    setNegotiations(
      negotiations.map((neg) => (neg.id === id ? { ...neg, statusType: newStatus } : neg))
    );
  };

  const handlePlaceOffer = (lotTitle: string, offerRate: number) => {
    const newNeg: NegotiationItem = {
      id: `NEG-${Date.now().toString().slice(-4)}`,
      cropAndVolume: lotTitle,
      statusType: 'Counter-Offer',
      partyType: 'Farmer',
      partyName: 'You (Buyer)',
      bidPrice: `₹${offerRate}/q`
    };
    setNegotiations([newNeg, ...negotiations]);
  };

  // If user is on the Landing Page screen, show clean full-page experience
  if (currentTab === 'landing') {
    return <LandingPage onNavigate={(tab) => setCurrentTab(tab)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        farmerSubTab={farmerSubTab}
        onSelectFarmerSubTab={(sub) => setFarmerSubTab(sub)}
        lotsCount={cropLots.length}
        offersCount={1}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={globalSearchQuery}
          onSearchChange={setGlobalSearchQuery}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] w-full mx-auto">
          {currentTab === 'farmer-dashboard' && (
            <FarmerDashboard
              cropLots={cropLots}
              subTab={farmerSubTab}
              onSelectSubTab={setFarmerSubTab}
              onOpenAddLot={() => setIsAddLotOpen(true)}
              onViewLotDetails={(lot) =>
                setSelectedLotForModal({
                  title: `${lot.crop} (${lot.grade})`,
                  crop: lot.crop,
                  seller: lot.farmerName || 'Jai Kumar',
                  location: lot.location || 'Nashik, MH',
                  pricePerQuintal: lot.bestOfferRate || '₹2,740/q',
                  quantity: lot.quantity,
                  quality: `Moisture: ${lot.moisture || '10%'}`
                })
              }
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'buyer-dashboard' && (
            <BuyerPortal
              requirements={requirements}
              smartMatches={smartMatches}
              availableLots={availableLots}
              negotiations={negotiations}
              onOpenPostRequirement={() => setIsPostReqOpen(true)}
              onViewLotDetails={(data) => setSelectedLotForModal(data)}
              onNavigate={(tab) => setCurrentTab(tab)}
              onDeleteRequirement={handleDeleteRequirement}
              onUpdateNegotiation={handleUpdateNegotiation}
            />
          )}

          {currentTab === 'admin-dashboard' && (
            <AdminHub onNavigate={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'fpo-dashboard' && (
            <FpoPortal onNavigate={(tab) => setCurrentTab(tab)} />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <AddCropLotModal
        isOpen={isAddLotOpen}
        onClose={() => setIsAddLotOpen(false)}
        onAddLot={handleAddLot}
      />

      <PostRequirementModal
        isOpen={isPostReqOpen}
        onClose={() => setIsPostReqOpen(false)}
        onAddRequirement={handleAddRequirement}
      />

      <LotDetailsModal
        isOpen={!!selectedLotForModal}
        onClose={() => setSelectedLotForModal(null)}
        lotData={selectedLotForModal}
        onPlaceOffer={handlePlaceOffer}
      />
    </div>
  );
}
