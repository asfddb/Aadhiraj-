import React, { useState } from 'react';
import ReportCard from './components/ReportCard';
import GrievanceForum from './components/GrievanceForum';
import AdvocacyCenter from './components/AdvocacyCenter';
import { AlertTriangle, ShieldAlert, BookOpen, MessageSquare, HeartHandshake, Map, ArrowRight, HelpCircle, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'audit' | 'grievances' | 'advocacy'>('audit');
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);

  // Quick link helper to scroll and select
  const handleMapClick = (facilityId: string) => {
    setActiveTab('audit');
    // We let the selectedFacility change by finding the button and simulating a click, or scrolling down.
    setTimeout(() => {
      const btn = document.getElementById(`facility-btn-${facilityId}`);
      if (btn) {
        btn.click();
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f2f0e9] text-[#1a1a1a] font-sans antialiased selection:bg-rose-600 selection:text-white border-[12px] md:border-[16px] border-white" id="main-app-root">
      {/* Top Banner Alert */}
      <div className="bg-[#dc2626] text-white py-3 px-4 text-center text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 border-b-2 border-black" id="safety-alert-banner">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span className="uppercase">INVESTIGATION WARNING: KV NO. 1 PORT BLAIR STATUS: CRITICAL SAFETY DEFICITS</span>
        <button 
          onClick={() => setActiveTab('advocacy')} 
          className="underline decoration-1 underline-offset-4 hover:text-[#f2f0e9] font-bold ml-2 inline-flex items-center gap-0.5"
        >
          TAKE ACTION <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header Branding (Broadsheet Newspaper Masthead) */}
        <header className="border-b-2 border-black pb-8 space-y-4" id="app-branding-header">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-black/10 pb-3 gap-2">
            <div className="text-xs font-bold tracking-[0.22em] uppercase text-rose-600 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              Public Exposure Docket — Issue 01
            </div>
            <div className="text-xs font-mono text-slate-500 tracking-wide uppercase">
              COORDINATES: 11.6234° N, 92.7265° E • PORT BLAIR, A&N ISLANDS
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black italic tracking-tighter text-[#1a1a1a] leading-[0.95]">
                The Forgotten <br />Pinnacle.
              </h1>
              <p className="text-lg sm:text-xl font-serif text-slate-800 leading-relaxed max-w-3xl">
                An active public dossier on the severe architectural decay, hazardous sanitary standards, and systemic neglect at <span className="underline decoration-1 underline-offset-4 font-bold decoration-rose-600">Kendriya Vidyalaya No. 1, Port Blair</span>. Compiled by concerned parents and alumni to demand immediate budgetary allocation.
              </p>
            </div>

            {/* Quick status stamp */}
            <div className="bg-black text-white p-5 border border-black rounded-xs flex flex-col justify-between shrink-0 shadow-sm w-full md:w-auto md:min-w-[240px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-rose-500">MONITOR ACTIVE</span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-serif italic leading-none font-bold">Grade E+ Overall</p>
                <p className="text-[10px] font-mono text-slate-400">AUDIT DOCKED: JUNE 2026</p>
              </div>
            </div>
          </div>
        </header>

        {/* Interactive Schematic Layout of School Neglect */}
        <section className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-sm" id="interactive-blueprint-section">
          <div className="space-y-1 border-b border-black/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1a1a1a] flex items-center gap-2">
              <Map className="w-5 h-5 text-rose-600" />
              Interactive Campus Blueprint & Hazard Spots
            </h2>
            <p className="text-slate-500 text-xs font-mono uppercase">
              Select any school zone below to jump directly into verified safety complaints & forensic inspection details.
            </p>
          </div>

          {/* Visual Schematic Diagram using beautiful grid of blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3" id="schematic-blueprint-grid">
            
            <button
              id="hotspot-btn-sanitation"
              onClick={() => handleMapClick('sanitation')}
              onMouseEnter={() => setHighlightedBlock('sanitation')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'sanitation'
                  ? 'bg-rose-50 border-rose-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-rose-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-rose-600 block mb-1">SEC A — GROUND FL</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Washrooms & Sanitation</h4>
              <p className="text-xs font-mono font-bold text-rose-600 mt-3 border-t border-rose-100 pt-2">Grade F • Still Cooked</p>
            </button>

            <button
              id="hotspot-btn-water"
              onClick={() => handleMapClick('drinking_water')}
              onMouseEnter={() => setHighlightedBlock('drinking_water')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'drinking_water'
                  ? 'bg-rose-50 border-rose-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-rose-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-rose-600 block mb-1">SEC B — OUTDOOR</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Water Coolers</h4>
              <p className="text-xs font-mono font-bold text-rose-600 mt-3 border-t border-rose-100 pt-2">Grade F • Rusty Water</p>
            </button>

            <button
              id="hotspot-btn-classrooms"
              onClick={() => handleMapClick('classrooms')}
              onMouseEnter={() => setHighlightedBlock('classrooms')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'classrooms'
                  ? 'bg-amber-50 border-amber-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-amber-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-amber-600 block mb-1">SEC C — MAIN</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Classroom Desks</h4>
              <p className="text-xs font-mono font-bold text-amber-600 mt-3 border-t border-amber-100 pt-2">Grade D- • Damp walls</p>
            </button>

            <button
              id="hotspot-btn-labs"
              onClick={() => handleMapClick('labs')}
              onMouseEnter={() => setHighlightedBlock('labs')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'labs'
                  ? 'bg-rose-50 border-rose-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-rose-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-rose-600 block mb-1">SEC D — 1ST FL</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Labs & Computers</h4>
              <p className="text-xs font-mono font-bold text-rose-600 mt-3 border-t border-rose-100 pt-2">Grade F • Outdated</p>
            </button>

            <button
              id="hotspot-btn-playground"
              onClick={() => handleMapClick('playground')}
              onMouseEnter={() => setHighlightedBlock('playground')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'playground'
                  ? 'bg-amber-50 border-amber-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-amber-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-amber-600 block mb-1">SEC E — FIELD</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Sports Ground</h4>
              <p className="text-xs font-mono font-bold text-amber-600 mt-3 border-t border-amber-100 pt-2">Grade D • Muddy Swamp</p>
            </button>

            <button
              id="hotspot-btn-library"
              onClick={() => handleMapClick('library')}
              onMouseEnter={() => setHighlightedBlock('library')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'library'
                  ? 'bg-amber-50 border-amber-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-amber-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-amber-600 block mb-1">SEC F — 2ND FL</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Library Catalog</h4>
              <p className="text-xs font-mono font-bold text-amber-600 mt-3 border-t border-amber-100 pt-2">Grade D+ • Damp books</p>
            </button>

            <button
              id="hotspot-btn-safety"
              onClick={() => handleMapClick('safety')}
              onMouseEnter={() => setHighlightedBlock('safety')}
              onMouseLeave={() => setHighlightedBlock(null)}
              className={`p-4 text-left transition-all cursor-pointer border-2 ${
                highlightedBlock === 'safety'
                  ? 'bg-rose-50 border-rose-600 scale-[1.02] shadow-sm'
                  : 'bg-[#fcfbf9] hover:bg-rose-50/30 border-black'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-rose-600 block mb-1">ALL CORRIDORS</span>
              <h4 className="font-bold font-serif text-sm text-[#1a1a1a]">Electrical safety</h4>
              <p className="text-xs font-mono font-bold text-rose-600 mt-3 border-t border-rose-100 pt-2">Grade E • Exposed Wires</p>
            </button>

          </div>
        </section>

        {/* Tab Selection Navigation (Printed Border Layout) */}
        <div className="flex flex-wrap border-b-2 border-black" id="tabs-navigation-panel">
          <button
            id="tab-btn-audit"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 py-4 px-6 font-serif font-bold text-base transition-all cursor-pointer border-t-2 border-l-2 border-r-2 ${
              activeTab === 'audit'
                ? 'bg-white text-black border-black -mb-[2px] border-b-2 border-b-white z-10'
                : 'bg-[#f2f0e9]/40 text-slate-500 hover:text-black border-transparent hover:bg-white/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-600" />
            1. Auditing Findings
          </button>

          <button
            id="tab-btn-grievances"
            onClick={() => setActiveTab('grievances')}
            className={`flex items-center gap-2 py-4 px-6 font-serif font-bold text-base transition-all cursor-pointer border-t-2 border-l-2 border-r-2 ${
              activeTab === 'grievances'
                ? 'bg-white text-black border-black -mb-[2px] border-b-2 border-b-white z-10'
                : 'bg-[#f2f0e9]/40 text-slate-500 hover:text-black border-transparent hover:bg-white/40'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-rose-600" />
            2. Public Grievances
            <span className="bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-none font-mono">
              HOT
            </span>
          </button>

          <button
            id="tab-btn-advocacy"
            onClick={() => setActiveTab('advocacy')}
            className={`flex items-center gap-2 py-4 px-6 font-serif font-bold text-base transition-all cursor-pointer border-t-2 border-l-2 border-r-2 ${
              activeTab === 'advocacy'
                ? 'bg-white text-black border-black -mb-[2px] border-b-2 border-b-white z-10'
                : 'bg-[#f2f0e9]/40 text-slate-500 hover:text-black border-transparent hover:bg-white/40'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            3. Legal & Lobby Desk
          </button>
        </div>

        {/* Active Tab Panel */}
        <main className="min-h-[500px]" id="active-tab-panel">
          {activeTab === 'audit' && <ReportCard />}
          {activeTab === 'grievances' && <GrievanceForum />}
          {activeTab === 'advocacy' && <AdvocacyCenter />}
        </main>

        {/* Interactive FAQ / Context section matching newspaper columns */}
        <section className="bg-black text-[#f2f0e9] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-4 border-white shadow-md" id="faq-section">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-rose-500 uppercase">COLUMN • OPINION</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold italic text-white leading-tight">
              "How did Kendriya Vidyalaya No. 1 slip through the cracks of the system?"
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-serif">
              Despite continuous federal budgets allocated via the Kendriya Vidyalaya Sangathan, the school's remote geography on the South Andaman coast has historically isolated it from immediate executive surveillance. 
              <br /><br />
              With the regional headquarters over 1,200 km away in Kolkata, maintenance audits are rarely enforced in person. Monsoon dampness and highly corrosive coastal humidity do the rest—rotting steel desks, causing electrical corrosion, and leaking untreated water onto school floors while parents have to wait indefinitely for simple sanction files to move.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Activity className="w-5 h-5 text-rose-500 shrink-0" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-rose-500">
                AUDITED IN ACCORDANCE WITH KVS CIVIL MANUAL STANDARDS
              </span>
            </div>
          </div>

          <div className="space-y-6 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-12 text-xs">
            <h4 className="font-mono font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              Investigation Information FAQ
            </h4>
            
            <div className="space-y-4 font-serif">
              <div className="space-y-1">
                <p className="font-bold text-white text-sm">1. Who authorizes this dataset?</p>
                <p className="text-slate-300 leading-relaxed text-xs">This data is a community-sourced physical audit managed by a local coalition of engineering alumni, local safety technicians, and parent associations of South Andaman. Every issue has been physically documented.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white text-sm">2. How is the 32/100 score computed?</p>
                <p className="text-slate-300 leading-relaxed text-xs">Based on critical parameters: structural water leakage, toilet functional ratio, tap chemical contamination, computer-to-student ratio, live wire insulation, and play field injury risks.</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white text-sm">3. Can administrators delete submissions?</p>
                <p className="text-slate-300 leading-relaxed text-xs">No, this is an independent portal. Only verified repairs signed off with photographic evidence by student delegates will result in status changes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Humble and legal foot margin */}
        <footer className="text-center py-8 text-slate-500 text-xs border-t border-black/10 space-y-1 font-mono" id="app-footer">
          <p>CONCERNED PARENTS & ALUMNI COALITION • ESTD. 2026</p>
          <p className="text-[10px] text-slate-400">REF: PUBLIC-EXPOSURE-DOSSIER-PB-KV1-MONITOR</p>
        </footer>

      </div>
    </div>
  );
}

