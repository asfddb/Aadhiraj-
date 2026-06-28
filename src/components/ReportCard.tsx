import React, { useState, useEffect } from 'react';
import { FacilityReport, FacilityCategory } from '../types';
import { facilitiesData, statistics } from '../data/facilitiesData';
import { ShieldAlert, Info, ChevronRight, MessageSquare, Compass, Eye, AlertTriangle, Plus, Trash2, X } from 'lucide-react';

export default function ReportCard() {
  const [facilities, setFacilities] = useState<FacilityReport[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<FacilityReport | null>(null);
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Form states for custom sector
  const [customName, setCustomName] = useState('');
  const [customGrade, setCustomGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('F');
  const [customStatus, setCustomStatus] = useState<'critical' | 'poor' | 'fair' | 'good'>('critical');
  const [customSummary, setCustomSummary] = useState('');
  const [customFinding1, setCustomFinding1] = useState('');
  const [customFinding2, setCustomFinding2] = useState('');
  const [customImpact, setCustomImpact] = useState('');
  const [customQuoteAuthor, setCustomQuoteAuthor] = useState('');
  const [customQuoteGrade, setCustomQuoteGrade] = useState('');
  const [customQuoteText, setCustomQuoteText] = useState('');

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem('kv_facilities');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as FacilityReport[];
        setFacilities(parsed);
        if (parsed.length > 0) {
          setSelectedFacility(parsed[0]);
        }
      } catch (e) {
        setFacilities([...facilitiesData]);
        setSelectedFacility(facilitiesData[0]);
      }
    } else {
      setFacilities([...facilitiesData]);
      setSelectedFacility(facilitiesData[0]);
    }
  }, []);

  const saveFacilities = (updated: FacilityReport[]) => {
    setFacilities(updated);
    localStorage.setItem('kv_facilities', JSON.stringify(updated));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customSummary.trim()) return;

    const newSector: FacilityReport = {
      id: 'custom-' + Date.now(),
      name: customName,
      category: 'safety', // standard safety union fallback
      grade: customGrade,
      status: customStatus,
      lastInspected: 'June 2026',
      summary: customSummary,
      detailedFindings: [
        customFinding1.trim() || 'No additional findings reported.',
        customFinding2.trim() || 'No secondary observations logged.'
      ].filter(Boolean),
      impactOnStudents: customImpact.trim() || 'Severe impact on student welfare and security.',
      studentQuotes: [
        {
          author: customQuoteAuthor.trim() || 'Anonymous Witness',
          grade: customQuoteGrade.trim() || 'Class XI',
          text: customQuoteText.trim() || 'This area is extremely neglected and unsafe.'
        }
      ]
    };

    const updated = [...facilities, newSector];
    saveFacilities(updated);
    setSelectedFacility(newSector);
    setIsAddingCustom(false);

    // reset fields
    setCustomName('');
    setCustomGrade('F');
    setCustomStatus('critical');
    setCustomSummary('');
    setCustomFinding1('');
    setCustomFinding2('');
    setCustomImpact('');
    setCustomQuoteAuthor('');
    setCustomQuoteGrade('');
    setCustomQuoteText('');
  };

  const handleDeleteSector = (id: string) => {
    const updated = facilities.filter(f => f.id !== id);
    saveFacilities(updated);
    if (selectedFacility?.id === id) {
      setSelectedFacility(updated.length > 0 ? updated[0] : null);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-600 text-white';
      case 'B': return 'bg-teal-600 text-white';
      case 'C': return 'bg-blue-600 text-white';
      case 'D': case 'D+': case 'D-': return 'bg-amber-500 text-black font-bold';
      case 'E': return 'bg-orange-500 text-white';
      case 'F': return 'bg-rose-600 text-white animate-pulse';
      default: return 'bg-slate-700 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-emerald-700 bg-emerald-50 border-emerald-300';
      case 'fair': return 'text-blue-700 bg-blue-50 border-blue-300';
      case 'poor': return 'text-amber-700 bg-amber-50 border-amber-300';
      case 'critical': return 'text-rose-700 bg-rose-50 border-rose-300 font-bold';
      default: return 'text-slate-700 bg-slate-50 border-slate-300';
    }
  };

  const getProgressPercentage = (grade: string) => {
    switch (grade) {
      case 'A': return 95;
      case 'B': return 80;
      case 'C': return 65;
      case 'D': case 'D+': case 'D-': return 45;
      case 'E': return 25;
      case 'F': return 10;
      default: return 50;
    }
  };

  const isCustomId = (id: string) => id.startsWith('custom-');

  return (
    <div className="space-y-6" id="report-card-main-container">
      {/* Overview stats panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="stats-summary-grid">
        <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">01 // Overall Audit Grade</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-serif font-black text-rose-600">{statistics.overallGrade}</span>
            <span className="text-xs text-slate-500 font-mono uppercase">(CRITICAL WARNING)</span>
          </div>
          <div className="h-2 w-full bg-[#f2f0e9] border border-black mt-4 overflow-hidden">
            <div className="h-full bg-rose-600" style={{ width: '15%' }}></div>
          </div>
        </div>

        <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">02 // Civil Safety Index</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-mono font-black text-[#1a1a1a]">{statistics.infrastructureScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100 max</span>
          </div>
          <p className="text-[11px] text-rose-600 font-mono font-bold mt-3 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            68% BELOW INDIAN CBSE MIDPOINT
          </p>
        </div>

        <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">03 // Urgent Safety Violations</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-mono font-black text-red-600">
              {statistics.totalUrgentDefects + facilities.filter(f => isCustomId(f.id) && f.status === 'critical').length}
            </span>
            <span className="text-xs text-slate-500 font-mono uppercase">Unresolved</span>
          </div>
          <span className="text-[10px] font-mono font-semibold text-rose-600 mt-4 block uppercase">
            * REQUIRES RE-STRUCTURING FUNDS
          </span>
        </div>

        <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">04 // Grievance Action Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-mono font-black text-slate-600">{statistics.authorityResponseRate}</span>
            <span className="text-xs text-slate-500 font-mono">RESOLVED</span>
          </div>
          <span className="text-[11px] text-amber-600 font-mono font-bold mt-4 block uppercase">
            92% SUBMISSIONS LEFT UNANSWERED
          </span>
        </div>
      </div>

      {/* Main interactive split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: List of audited facilities */}
        <div className="lg:col-span-5 space-y-3" id="facilities-list-column">
          <div className="border-b-2 border-black pb-2 flex justify-between items-baseline">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] uppercase tracking-tight">Verified Defect Registers</h3>
              <p className="text-slate-500 text-xs font-mono">Click a sector below to reveal physical inspection details.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {facilities.map((facility, index) => {
              const isSelected = !isAddingCustom && selectedFacility?.id === facility.id;
              
              // Nice numerical formatting for standard vs custom sectors
              const labelNum = index + 1;
              const formattedLabelNum = labelNum < 10 ? `0${labelNum}` : `${labelNum}`;

              return (
                <div key={facility.id} className="relative group">
                  <button
                    id={`facility-btn-${facility.id}`}
                    onClick={() => {
                      setSelectedFacility(facility);
                      setIsAddingCustom(false);
                    }}
                    className={`w-full text-left p-4 pr-12 transition-all flex items-center justify-between gap-3 cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-black text-[#f2f0e9] border-black scale-[1.01]'
                        : 'bg-white text-slate-800 hover:bg-[#f2f0e9]/50 border-black'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className={`text-[10px] font-mono font-bold block uppercase tracking-wider ${isSelected ? 'text-rose-400' : 'text-rose-600'}`}>
                        {formattedLabelNum} // {isCustomId(facility.id) ? 'CUSTOM SECTOR' : facility.category.toUpperCase()}
                      </span>
                      <p className={`text-sm font-bold font-serif truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {facility.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                        isSelected
                          ? 'bg-zinc-900 text-zinc-300 border-zinc-700'
                          : getStatusColor(facility.status)
                      }`}>
                        {facility.status.toUpperCase()}
                      </span>
                      <span className={`w-8 h-8 flex items-center justify-center font-mono font-extrabold text-xs border border-black ${getGradeColor(facility.grade)}`}>
                        {facility.grade}
                      </span>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-white rotate-90' : 'text-slate-400'}`} />
                    </div>
                  </button>

                  {/* Absolute delete button for custom sectors */}
                  {isCustomId(facility.id) && (
                    <button
                      title="Delete Custom Sector"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSector(facility.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white p-1 border border-black rounded-none transition-all cursor-pointer z-20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Form trigger button */}
            <button
              onClick={() => setIsAddingCustom(true)}
              className={`w-full py-3.5 font-mono font-bold text-xs border-2 border-black rounded-none transition-colors cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                isAddingCustom
                  ? 'bg-zinc-800 text-white border-black'
                  : 'bg-rose-600 hover:bg-rose-700 text-white border-black'
              }`}
            >
              <Plus className="w-4 h-4 shrink-0" />
              REGISTER NEW SECTOR DOSSIER
            </button>
          </div>
        </div>

        {/* Right column: Selected facility audit detail or adding form */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-6 sm:p-8 min-h-[500px]" id="facility-detail-card">
          {isAddingCustom ? (
            <form onSubmit={handleAddCustom} className="space-y-5 animate-fade-in">
              <div className="flex justify-between items-center border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h3 className="font-serif font-black text-xl text-slate-900 uppercase">ADD NEW AUDIT SECTOR</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="text-slate-500 hover:text-rose-600 text-xs font-mono uppercase font-bold flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> [CANCEL]
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    01 / Custom Sector Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Biology Lab & Specimens"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    02 / Grade
                  </label>
                  <select
                    value={customGrade}
                    onChange={(e) => setCustomGrade(e.target.value as any)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-mono font-bold"
                  >
                    <option value="F">F (Hazardous)</option>
                    <option value="E">E (Deplorable)</option>
                    <option value="D">D (Deficient)</option>
                    <option value="C">C (Passable)</option>
                    <option value="B">B (Adequate)</option>
                    <option value="A">A (Sufficient)</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    03 / Status
                  </label>
                  <select
                    value={customStatus}
                    onChange={(e) => setCustomStatus(e.target.value as any)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-mono font-bold"
                  >
                    <option value="critical">CRITICAL</option>
                    <option value="poor">POOR</option>
                    <option value="fair">FAIR</option>
                    <option value="good">GOOD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  04 / Inspection Summary Statement (Headline)
                </label>
                <textarea
                  required
                  placeholder="e.g., Extreme safety warning as chemical burners leak toxic propane. Specimen jars are decaying with mold."
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    05 / Forensic On-Site Observation 1
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Emergency eye-wash station has rusted solid"
                    value={customFinding1}
                    onChange={(e) => setCustomFinding1(e.target.value)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    06 / Forensic On-Site Observation 2
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Decayed wood countertops are collapsing"
                    value={customFinding2}
                    onChange={(e) => setCustomFinding2(e.target.value)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  07 / Direct Pedagogical & Student Impact
                </label>
                <input
                  type="text"
                  placeholder="e.g., Students refuse to participate in practical chemistry lessons out of fear of gas inhalation."
                  value={customImpact}
                  onChange={(e) => setCustomImpact(e.target.value)}
                  className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                />
              </div>

              <div className="border-t border-black/10 pt-4 space-y-3">
                <span className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  08 / Witness Testimony Attachment
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Author / Submitter
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Dr. S. Raman"
                      value={customQuoteAuthor}
                      onChange={(e) => setCustomQuoteAuthor(e.target.value)}
                      className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Stakeholder Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Alumnus (1998)"
                      value={customQuoteGrade}
                      onChange={(e) => setCustomQuoteGrade(e.target.value)}
                      className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                    Testimony statement
                  </label>
                  <textarea
                    placeholder="e.g., When we were students, this lab was the pride of South Andaman. Now, it has decayed to a point of pure civil negligence."
                    value={customQuoteText}
                    onChange={(e) => setCustomQuoteText(e.target.value)}
                    className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif h-16"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-[#f2f0e9] hover:bg-rose-600 hover:text-white border-2 border-black font-bold text-xs rounded-none transition-all cursor-pointer uppercase font-mono tracking-widest"
              >
                PUBLISH CUSTOM SECTOR DOSSIER
              </button>
            </form>
          ) : selectedFacility ? (
            <div className="space-y-6 animate-fade-in" key={selectedFacility.id}>
              {/* Detail Header */}
              <div className="border-b-2 border-black pb-4 space-y-3">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-widest block mb-1">
                      {isCustomId(selectedFacility.id) ? 'CUSTOM REGISTERED CLAIM EVIDENCE' : 'SECTION RECORD • VERIFIED EVIDENCE'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-extrabold leading-tight italic truncate">
                      {selectedFacility.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-12 h-12 border-2 border-black flex items-center justify-center font-mono font-black text-lg shadow-xs ${getGradeColor(selectedFacility.grade)}`}>
                      {selectedFacility.grade}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                  <span className={`px-2.5 py-0.5 border font-mono font-bold ${getStatusColor(selectedFacility.status)}`}>
                    STATUS: {selectedFacility.status.toUpperCase()}
                  </span>
                  <span className="font-mono text-slate-500 bg-[#f2f0e9]/80 px-2.5 py-0.5 border border-black/10">
                    PB-REF: {selectedFacility.id.toUpperCase()}
                  </span>
                  <span className="text-slate-400 font-mono ml-auto">Inspected: {selectedFacility.lastInspected}</span>
                </div>
              </div>

              {/* Maintenance Progress Index */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-600">
                  <span>FACILITY STABILITY INDEX</span>
                  <span className="text-rose-600">{getProgressPercentage(selectedFacility.grade)}% / 100% (STABLE)</span>
                </div>
                <div className="h-3 w-full bg-[#f2f0e9] border-2 border-black overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      selectedFacility.grade === 'F' ? 'bg-rose-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${getProgressPercentage(selectedFacility.grade)}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  * Note: Deficits below 50% imply hazard flags under Central School Safety guidelines.
                </span>
              </div>

              {/* Brief Summary */}
              <div className="bg-[#fffdf5] border-l-4 border-rose-600 p-4 border border-black/10 space-y-1">
                <h4 className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  Primary Inspection Statement
                </h4>
                <p className="text-slate-900 text-sm font-serif leading-relaxed">
                  {selectedFacility.summary}
                </p>
              </div>

              {/* Detailed Findings */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-700" />
                  Forensic On-Site Observations
                </h4>
                <ul className="space-y-3">
                  {selectedFacility.detailedFindings.map((finding, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slate-800 leading-relaxed font-serif">
                      <span className="text-rose-600 font-mono font-black shrink-0">[{idx + 1}]</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-slate-700" />
                  Direct Pedagogical & Physical Impact
                </h4>
                <p className="text-slate-800 text-sm leading-relaxed bg-[#f2f0e9]/50 p-4 border border-black/10 font-serif italic">
                  "{selectedFacility.impactOnStudents}"
                </p>
              </div>

              {/* Quotes Section */}
              <div className="space-y-4 border-t-2 border-black pt-5">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-700" />
                  Recorded Testimonies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFacility.studentQuotes && selectedFacility.studentQuotes.map((q, idx) => (
                    <div key={idx} className="bg-[#fcfbf9] border border-black p-4 flex flex-col justify-between space-y-3">
                      <p className="text-slate-800 text-xs font-serif italic leading-relaxed">
                        "{q.text}"
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-black/5">
                        <span className="font-bold">— {q.author}</span>
                        <span className="bg-[#f2f0e9] px-2 py-0.5 border border-black/10 font-bold">{q.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-20 animate-fade-in">
              <Compass className="w-12 h-12 text-slate-300 animate-pulse" />
              <p className="text-slate-500 font-bold font-serif">Select defective sector</p>
              <p className="text-slate-400 text-xs max-w-xs font-mono">Use the selector on the left rail to view documented case logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
