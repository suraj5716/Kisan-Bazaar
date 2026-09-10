import React, { useState } from 'react';
import { ScreenTab } from '../../types';
import { ASSETS } from '../../data/mockData';
import {
  TrendingUp,
  ArrowRight,
  Tractor,
  Store,
  Truck,
  Users,
  CheckCircle,
  BarChart3,
  Handshake,
  Brain,
  MapPin,
  X,
  ShieldCheck,
  Building2,
  LogIn
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: ScreenTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handlePortalLogin = (tab: ScreenTab) => {
    setShowLoginModal(false);
    onNavigate(tab);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-[#c2c9bb]/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <img
              alt="Kisan Bazaar Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={ASSETS.logo}
            />
            <span className="font-bold text-xl text-[#154212] tracking-tight">Kisan Bazaar</span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm font-semibold text-[#0b1c30] hover:text-[#154212] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-semibold text-[#42493e] hover:text-[#0b1c30] transition-colors"
            >
              Login (Primary Hub)
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-bold bg-[#154212] hover:bg-[#2d5a27] text-white px-4 py-2 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              Access Portals
            </button>
          </nav>
        </div>
      </header>

      {/* Primary Hub Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-[#eff4ff] border-b border-[#c2c9bb]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#154212] text-white flex items-center justify-center shadow-xs">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0b1c30]">Primary Hub • Select Credentials</h3>
                  <p className="text-xs text-[#42493e]">Choose your portal access role to sign in</p>
                </div>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5">
              {/* Role 1: Farmer */}
              <div
                onClick={() => handlePortalLogin('farmer-dashboard')}
                className="p-4 rounded-2xl border-2 border-emerald-500/40 hover:border-[#154212] bg-[#eff4ff]/60 hover:bg-[#eff4ff] transition-all cursor-pointer flex items-center justify-between group shadow-xs hover:shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#2d5a27] text-white flex items-center justify-center shadow-xs">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0b1c30]">Farmer Portal</h4>
                      <span className="text-[10px] font-bold bg-[#bcf0ae]/80 text-[#154212] px-2 py-0.5 rounded-full">
                        Jai Kumar
                      </span>
                    </div>
                    <p className="text-xs text-[#42493e] mt-0.5">
                      Overview, My lots · 4, Net Realization, Price forecast, Sale timing, Buyer matches, Offers · 1, Logistics
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#2d5a27] group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>

              {/* Role 2: FPO */}
              <div
                onClick={() => handlePortalLogin('fpo-dashboard')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#485066] bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#485066] text-white flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0b1c30]">FPO &amp; Aggregators Portal</h4>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        Sahyadri FPO
                      </span>
                    </div>
                    <p className="text-xs text-[#42493e] mt-0.5">
                      Pool member harvest, negotiate bulk contracts, member payout ledgers
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>

              {/* Role 3: Buyer */}
              <div
                onClick={() => handlePortalLogin('buyer-dashboard')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#904d00] bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#fe932c] text-white flex items-center justify-center shadow-xs">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0b1c30]">Procurement Buyer Portal</h4>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        AgriCorp India
                      </span>
                    </div>
                    <p className="text-xs text-[#42493e] mt-0.5">
                      Post procurement requirements, browse available lots, automated bids
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>

              {/* Role 4: Admin Hub */}
              <div
                onClick={() => handlePortalLogin('admin-dashboard')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#154212] bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#154212] text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0b1c30]">Admin Hub &amp; Overview</h4>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        System Admin
                      </span>
                    </div>
                    <p className="text-xs text-[#42493e] mt-0.5">
                      Statewide price trends, mandi liquidity heatmap, telemetry &amp; distress alerts
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full pt-16 flex-1">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-[#eff4ff] pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#c2c9bb]/20">
          {/* Abstract SVG Background curves */}
          <div className="absolute inset-0 pointer-events-none opacity-25 hidden md:block">
            <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                className="text-[#2d5a27]/15"
                d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z"
                fill="currentColor"
              />
              <path
                className="text-[#154212]/10"
                d="M0,70 Q30,40 60,70 T100,70 L100,100 L0,100 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Hero Left Content */}
            <div className="flex-1 flex flex-col items-start gap-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dce9ff] rounded-full shadow-2xs text-[#154212] font-semibold text-xs">
                <TrendingUp className="w-4 h-4 text-[#154212]" />
                <span>Live Mandi Updates Active</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0b1c30] tracking-tight leading-[1.15]">
                Better Prices. <br />
                <span className="text-[#2d5a27] relative inline-block">
                  Better Buyers.
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#154212]"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                </span>
                <br />
                Better Decisions.
              </h1>

              <p className="text-base sm:text-lg text-[#42493e] max-w-xl leading-relaxed">
                The intelligence and transaction platform built for modern agriculture. Connect
                directly with verified buyers, track real-time price trends across markets, and
                secure the true value of your harvest.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2">
                <button
                  id="hero-get-started-btn"
                  onClick={() => onNavigate('farmer-dashboard')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-login-dashboard-btn"
                  onClick={() => onNavigate('farmer-dashboard')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#d3e4fe] hover:bg-[#dce9ff] text-[#0b1c30] rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Login to Dashboard
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#c2c9bb]/30 w-full md:max-w-md">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-[#d3e4fe] flex items-center justify-center shadow-xs z-30 border-2 border-white">
                    <Tractor className="w-4 h-4 text-[#154212]" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#ffdcc3] flex items-center justify-center shadow-xs z-20 border-2 border-white">
                    <Store className="w-4 h-4 text-[#904d00]" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#dce9ff] flex items-center justify-center shadow-xs z-10 border-2 border-white">
                    <Truck className="w-4 h-4 text-[#31394e]" />
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-[#42493e]">
                  Trusted by <span className="font-bold text-[#0b1c30]">50,000+</span> farmers &amp; FPOs
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="flex-1 w-full relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/60 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${ASSETS.farmerHero}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Overlay Data Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider">
                      Wheat (Lok-1) • Indore Mandi
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-2xl font-bold text-[#0b1c30]">₹2,450</span>
                      <span className="text-xs text-[#72796e]">/ Quintal</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#154212] bg-[#bcf0ae]/50 px-2.5 py-1 rounded-lg font-bold text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+4.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selection Section: A Network Built for Growth */}
        <section className="w-full bg-[#f8f9ff] py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
                A Network Built for Growth
              </h2>
              <p className="text-sm sm:text-base text-[#42493e]">
                Whether you are growing the crop, aggregating harvests, or procuring for enterprise,
                Kisan Bazaar provides the tools you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Farmers Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#c2c9bb]/30 transition-all flex flex-col h-full group relative overflow-hidden">
                <div className="w-12 h-12 bg-[#2d5a27] text-white rounded-xl flex items-center justify-center mb-4 shadow-xs">
                  <Tractor className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Farmers</h3>
                <p className="text-xs sm:text-sm text-[#42493e] mb-6 flex-grow leading-relaxed">
                  Access live mandi rates, connect with verified buyers without middlemen, and plan
                  your harvest based on AI-driven price predictions.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 text-xs sm:text-sm text-[#0b1c30]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#154212]" /> Direct Buyer Access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#154212]" /> Payment Security
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('farmer-dashboard')}
                  className="w-full py-2 text-[#154212] font-bold text-xs uppercase tracking-wider border-b border-[#2d5a27]/20 hover:border-[#2d5a27] transition-colors text-left flex justify-between items-center mt-auto"
                >
                  Join as Farmer <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* FPO Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#c2c9bb]/30 transition-all flex flex-col h-full group relative overflow-hidden">
                <div className="w-12 h-12 bg-[#485066] text-white rounded-xl flex items-center justify-center mb-4 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">FPOs &amp; Aggregators</h3>
                <p className="text-xs sm:text-sm text-[#42493e] mb-6 flex-grow leading-relaxed">
                  Manage large volumes efficiently. Pool member produce, negotiate bulk contracts,
                  and handle complex logistics from a single dashboard.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 text-xs sm:text-sm text-[#0b1c30]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#485066]" /> Bulk Contract Bidding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#485066]" /> Member Payout Mgt.
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('fpo-dashboard')}
                  className="w-full py-2 text-[#485066] font-bold text-xs uppercase tracking-wider border-b border-[#485066]/20 hover:border-[#485066] transition-colors text-left flex justify-between items-center mt-auto"
                >
                  Register FPO <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Buyer Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#c2c9bb]/30 transition-all flex flex-col h-full group relative overflow-hidden">
                <div className="w-12 h-12 bg-[#fe932c] text-white rounded-xl flex items-center justify-center mb-4 shadow-xs">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Procurement Buyers</h3>
                <p className="text-xs sm:text-sm text-[#42493e] mb-6 flex-grow leading-relaxed">
                  Source quality produce at scale. Discover verified crop lots, manage procurement
                  logs, and secure reliable logistics partners.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 text-xs sm:text-sm text-[#0b1c30]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#904d00]" /> Quality Assured Lots
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#904d00]" /> Automated Ledger
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('buyer-dashboard')}
                  className="w-full py-2 text-[#904d00] font-bold text-xs uppercase tracking-wider border-b border-[#fe932c]/30 hover:border-[#904d00] transition-colors text-left flex justify-between items-center mt-auto"
                >
                  Start Sourcing <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Platform Capabilities */}
        <section className="w-full bg-[#eff4ff] py-16 border-t border-[#c2c9bb]/20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-2">
                Platform Capabilities
              </h2>
              <p className="text-sm sm:text-base text-[#42493e]">
                Designed for high-utility agricultural commerce, providing the data depth required for
                expert decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Feature 1: Advanced Price Discovery (Span 8) */}
              <div className="md:col-span-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#c2c9bb]/30 flex flex-col md:flex-row">
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#bcf0ae]/50 text-[#154212] rounded-xl flex items-center justify-center mb-3">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0b1c30] mb-2">
                      Advanced Price Discovery
                    </h3>
                    <p className="text-xs sm:text-sm text-[#42493e] mb-4 leading-relaxed">
                      Access real-time commodity pricing across 500+ APMC mandis. Visualize historical
                      trends with interactive micro-charts to time your market entry perfectly.
                    </p>
                  </div>

                  {/* Mini Sparkline Visualization */}
                  <div className="mt-4 bg-[#f8f9ff] p-3 rounded-xl border border-slate-100 flex items-end gap-1.5 h-20">
                    <div className="w-full bg-[#2d5a27]/20 rounded-t-xs h-[40%]" />
                    <div className="w-full bg-[#2d5a27]/30 rounded-t-xs h-[55%]" />
                    <div className="w-full bg-[#2d5a27]/40 rounded-t-xs h-[45%]" />
                    <div className="w-full bg-[#2d5a27]/50 rounded-t-xs h-[70%]" />
                    <div className="w-full bg-[#2d5a27]/60 rounded-t-xs h-[60%]" />
                    <div className="w-full bg-[#2d5a27]/80 rounded-t-xs h-[85%]" />
                    <div className="w-full bg-[#154212] rounded-t-xs h-[100%]" />
                  </div>
                </div>

                <div className="w-full md:w-2/5 min-h-[220px] relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${ASSETS.tabletAnalytics}')` }}
                  />
                </div>
              </div>

              {/* Feature 2: Logistics Support (Span 4) */}
              <div className="md:col-span-4 bg-[#d3e4fe] rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-[#ffdcc3] text-[#904d00] rounded-xl flex items-center justify-center mb-3">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Logistics Support</h3>
                  <p className="text-xs sm:text-sm text-[#42493e] mb-4 leading-relaxed">
                    Seamlessly book verified transport partners. Track your shipments from farm-gate
                    to buyer warehouse in real-time.
                  </p>
                </div>

                <div className="h-32 rounded-xl overflow-hidden relative border border-white/60 shadow-inner bg-slate-100 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url('${ASSETS.logisticsMap}')` }}
                  />
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#154212] animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Feature 3: Intelligent Buyer Matching (Span 6) */}
              <div className="md:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-[#dae2fd] text-[#31394e] rounded-xl flex items-center justify-center">
                      <Handshake className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded font-mono text-[10px] uppercase font-bold">
                      Automated
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1c30] mb-2">
                    Intelligent Buyer Matching
                  </h3>
                  <p className="text-xs sm:text-sm text-[#42493e] mb-4 leading-relaxed">
                    List your &apos;Crop Lot&apos; with specific quality parameters. Our algorithm
                    instantly alerts relevant buyers looking for your exact specifications, reducing
                    time-to-sale.
                  </p>
                </div>

                {/* Match Mockup Card */}
                <div className="bg-[#f8f9ff] border border-[#c2c9bb]/40 rounded-xl p-3.5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#154212] font-bold text-xs">
                      ITC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0b1c30]">
                        ITC Agri Procurement
                      </div>
                      <div className="text-[11px] text-[#72796e]">Matched 2 mins ago</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => onNavigate('buyer-dashboard')}
                      className="flex-1 py-1.5 bg-[#2d5a27] text-white rounded-lg text-xs font-bold hover:bg-[#154212] transition-colors"
                    >
                      Accept Bid
                    </button>
                    <button
                      onClick={() => onNavigate('buyer-dashboard')}
                      className="flex-1 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature 4: AI Price Predictions (Span 6) */}
              <div className="md:col-span-6 bg-[#213145] rounded-2xl p-6 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#a1d494]/20 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="w-10 h-10 bg-[#a1d494]/20 text-[#a1d494] rounded-xl flex items-center justify-center mb-3">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Price Predictions</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                    Leverage machine learning models that analyze weather patterns, historical data,
                    and global market trends to forecast prices 30-90 days out.
                  </p>
                </div>

                <div className="flex items-end justify-between p-3.5 bg-white/10 border border-white/15 rounded-xl backdrop-blur-sm">
                  <div>
                    <div className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold mb-1">
                      30-Day Forecast
                    </div>
                    <div className="font-mono text-sm text-[#a1d494] font-bold">
                      Strong Buy Signal
                    </div>
                  </div>
                  <svg className="w-28 h-12 text-[#a1d494]" viewBox="0 0 100 50">
                    <path
                      d="M0,40 Q20,40 40,25 T80,15 L100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="100" cy="5" fill="currentColor" r="3.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#e5eeff] py-8 border-t border-[#c2c9bb]/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#72796e]">
          <span>© 2024 Kisan Bazaar. Better Prices, Better Decisions.</span>
          <div className="flex gap-6 font-medium">
            <span className="cursor-pointer hover:text-[#0b1c30]">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#0b1c30]">Terms of Service</span>
            <span className="cursor-pointer hover:text-[#0b1c30]">e-NAM Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
