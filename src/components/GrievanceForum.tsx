import React, { useState, useEffect } from 'react';
import { Grievance, FacilityCategory } from '../types';
import { AlertCircle, ThumbsUp, Plus, ShieldAlert, CheckCircle2, RefreshCw, Filter, Search, User } from 'lucide-react';

const SEED_GRIEVANCES: Grievance[] = [
  {
    id: 'g-1',
    title: 'Exposed live wiring in primary block passage',
    description: 'High-voltage wires are hanging loosely from an open circuit board right at the eye-level of Class III and IV students. There is no caution sign or locked cabinet door.',
    category: 'safety',
    date: '2026-06-25',
    reporterType: 'Parent',
    upvotes: 148,
    isVerified: true,
    status: 'unresolved',
    responseFromAuthorities: null
  },
  {
    id: 'g-2',
    title: 'Complete water outage in Senior Girls washroom',
    description: 'There is zero running water in the main girls toilets during the entire afternoon session. This is an immense hygiene disaster, forcing girls to miss classes to walk back home.',
    category: 'sanitation',
    date: '2026-06-26',
    reporterType: 'Student',
    upvotes: 210,
    isVerified: true,
    status: 'unresolved',
    responseFromAuthorities: null
  },
  {
    id: 'g-3',
    title: 'Rusty water with red flakes coming from primary cooler',
    description: 'The drinking water cooler near the staff room has visible brown scaling in the nozzle. Several primary kids have reported nausea. We need immediate filter replacement!',
    category: 'drinking_water',
    date: '2026-06-20',
    reporterType: 'Parent',
    upvotes: 189,
    isVerified: true,
    status: 'under_review',
    responseFromAuthorities: 'We have dispatched a local plumber to inspect the storage tank. Filter replacements are pending due to budget allocations.'
  },
  {
    id: 'g-4',
    title: 'Termites eating through books in Class IX-C cabinet',
    description: 'The class cabinet is infested with termites. Important library textbooks issued to us are already half-destroyed. The school has refused to provide insecticide treatment.',
    category: 'classrooms',
    date: '2026-06-18',
    reporterType: 'Student',
    upvotes: 56,
    isVerified: false,
    status: 'unresolved',
    responseFromAuthorities: null
  }
];

export default function GrievanceForum() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FacilityCategory>('sanitation');
  const [reporterType, setReporterType] = useState<Grievance['reporterType']>('Student');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FacilityCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [votedIds, setVotedIds] = useState<string[]>([]);

  // Load grievances from local storage, or seed them if empty
  useEffect(() => {
    const stored = localStorage.getItem('kv_grievances');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Grievance[];
        const filtered = parsed.filter((g) => g.id !== 'g-5');
        setGrievances(filtered);
        localStorage.setItem('kv_grievances', JSON.stringify(filtered));
      } catch (e) {
        const filteredSeed = SEED_GRIEVANCES.filter((g) => g.id !== 'g-5');
        setGrievances(filteredSeed);
      }
    } else {
      const filteredSeed = SEED_GRIEVANCES.filter((g) => g.id !== 'g-5');
      setGrievances(filteredSeed);
      localStorage.setItem('kv_grievances', JSON.stringify(filteredSeed));
    }

    const storedVotes = localStorage.getItem('kv_voted_grievances');
    if (storedVotes) {
      try {
        setVotedIds(JSON.parse(storedVotes));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveGrievances = (updated: Grievance[]) => {
    setGrievances(updated);
    localStorage.setItem('kv_grievances', JSON.stringify(updated));
  };

  const handleUpvote = (id: string) => {
    if (votedIds.includes(id)) return;
    const updated = grievances.map((g) => {
      if (g.id === id) {
        return { ...g, upvotes: g.upvotes + 1 };
      }
      return g;
    });
    saveGrievances(updated);
    const newVotes = [...votedIds, id];
    setVotedIds(newVotes);
    localStorage.setItem('kv_voted_grievances', JSON.stringify(newVotes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newGrievance: Grievance = {
      id: `g-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      reporterType,
      upvotes: 1,
      isVerified: false,
      status: 'unresolved',
      responseFromAuthorities: null
    };

    const updated = [newGrievance, ...grievances];
    saveGrievances(updated);

    // Reset Form
    setTitle('');
    setDescription('');
    setCategory('sanitation');
    setReporterType('Student');
    setIsFormOpen(false);

    setSuccessMsg('Grievance registered successfully! Your submission is pending community verification.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const filteredGrievances = grievances
    .filter((g) => {
      const matchesSearch =
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeFilter === 'all' || g.category === activeFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'unresolved' && g.status !== 'resolved') ||
        (statusFilter === 'resolved' && g.status === 'resolved');

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => b.upvotes - a.upvotes); // Sorted by upvote count (criticality)

  const getStatusColor = (status: Grievance['status']) => {
    switch (status) {
      case 'unresolved':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'under_review':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'temporary_patch':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    }
  };

  const getStatusLabel = (status: Grievance['status']) => {
    switch (status) {
      case 'unresolved':
        return 'Unresolved / Critical';
      case 'under_review':
        return 'Under Review by Admin';
      case 'temporary_patch':
        return 'Temporary Fix (Budget Pending)';
      case 'resolved':
        return 'Resolved';
    }
  };

  const getCategoryLabel = (cat: FacilityCategory) => {
    switch (cat) {
      case 'sanitation':
        return 'Washrooms';
      case 'drinking_water':
        return 'Drinking Water';
      case 'classrooms':
        return 'Classrooms';
      case 'labs':
        return 'Labs & Tech';
      case 'playground':
        return 'Playground & PE';
      case 'library':
        return 'Library';
      case 'safety':
        return 'Corridor Safety';
    }
  };

  return (
    <div className="space-y-6" id="grievance-forum-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-5">
        <div>
          <h2 className="text-2xl font-serif text-[#1a1a1a] font-extrabold uppercase tracking-tight">
            COMMUNITY GRIEVANCE COALITION
          </h2>
          <p className="text-slate-600 text-xs font-mono uppercase mt-1">
            AN OPEN AND UNCENSORED REGISTRY FILLED BY STUDENTS, ALUMNI & PARENTS OF SOUTH ANDAMAN.
          </p>
        </div>
        <button
          id="btn-open-grievance-form"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm border-2 border-black rounded-none transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 shrink-0" />
          FILE HAZARD COMPLAINT
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-600 text-emerald-900 text-sm font-serif rounded-none flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Report Form */}
      {isFormOpen && (
        <form
          id="grievance-submission-form"
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black p-6 space-y-4 rounded-none shadow-md"
        >
          <div className="flex justify-between items-center border-b-2 border-black pb-3">
            <h3 className="font-bold font-serif text-slate-900 text-lg">REGISTER NEW DEFECT</h3>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-slate-400 hover:text-rose-600 text-xs font-mono uppercase font-bold"
            >
              [CLOSE]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reporter-type-select" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                01 / Submitter Identity
              </label>
              <select
                id="reporter-type-select"
                value={reporterType}
                onChange={(e) => setReporterType(e.target.value as Grievance['reporterType'])}
                className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
              >
                <option value="Student">Student (KV No. 1 PB)</option>
                <option value="Parent">Parent / Guardian</option>
                <option value="Alumni">Alumni</option>
                <option value="Staff">Staff Member</option>
              </select>
            </div>

            <div>
              <label htmlFor="category-select" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                02 / Sector of Failure
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as FacilityCategory)}
                className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
              >
                <option value="sanitation">Washrooms & Toilets</option>
                <option value="drinking_water">Drinking Water</option>
                <option value="classrooms">Classrooms & Furniture</option>
                <option value="labs">Science & Computer Labs</option>
                <option value="playground">Playground & PE Grounds</option>
                <option value="library">Library Resources</option>
                <option value="safety">Exposed Wiring & Fire Safety</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="grievance-title-input" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              03 / Defect Label (Clear, Brief)
            </label>
            <input
              type="text"
              id="grievance-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Broken locks in Girls first-floor washroom"
              required
              className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
            />
          </div>

          <div>
            <label htmlFor="grievance-desc-input" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              04 / Detailed Forensic Witness Description
            </label>
            <textarea
              id="grievance-desc-input"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide specific details. For example: In classroom VIII-A, the corner fan makes a dangerous grinding noise and is sparking. Children sit in fear."
              required
              className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-[#f2f0e9] font-bold text-sm border-2 border-black hover:bg-zinc-800 hover:text-white rounded-none transition-all cursor-pointer"
          >
            PUBLISH VERIFIABLE COMPLAINT
          </button>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 border-2 border-black rounded-none flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search verified docket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f2f0e9]/40 border-2 border-black pl-9 pr-4 py-2 text-sm text-slate-950 focus:outline-none focus:bg-white placeholder-slate-400 font-serif"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-mono font-bold bg-[#f2f0e9] border border-black/25 px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>SORT:</span>
          </div>

          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as any)}
            className="bg-white border-2 border-black text-xs font-mono font-bold px-2.5 py-1.5 text-slate-800 focus:outline-none"
          >
            <option value="all">All Sectors</option>
            <option value="sanitation">Washrooms</option>
            <option value="drinking_water">Drinking Water</option>
            <option value="classrooms">Classrooms</option>
            <option value="labs">Labs</option>
            <option value="playground">Playground</option>
            <option value="library">Library</option>
            <option value="safety">Safety</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border-2 border-black text-xs font-mono font-bold px-2.5 py-1.5 text-slate-800 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
              setStatusFilter('all');
            }}
            className="text-xs text-rose-600 font-mono font-bold hover:underline px-2 py-1.5"
          >
            RESET ALL
          </button>
        </div>
      </div>

      {/* Grievance Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredGrievances.length > 0 ? (
          filteredGrievances.map((g) => (
            <div
              key={g.id}
              className="bg-white border-2 border-black rounded-none p-5 sm:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6 hover:shadow-md transition-shadow"
              id={`grievance-item-${g.id}`}
            >
              <div className="space-y-3.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-800 bg-[#f2f0e9] px-2 py-0.5 border border-black/20">
                    {getCategoryLabel(g.category).toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${getStatusColor(g.status)}`}>
                    {getStatusLabel(g.status).toUpperCase()}
                  </span>
                  {g.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-300 px-2 py-0.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      VERIFIED RECOGNITION
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-serif font-black text-slate-900 leading-tight">
                    {g.title}
                  </h4>
                  <p className="text-slate-800 text-sm font-serif mt-2 leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-black/5">
                  <span className="flex items-center gap-1.5 text-slate-500 font-bold">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    REPORTER: {g.reporterType.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span>RECORDED: {g.date}</span>
                </div>

                {g.responseFromAuthorities && (
                  <div className="bg-[#fffdf5] border-2 border-black/80 p-4 text-xs text-slate-800 font-serif">
                    <p className="font-mono font-bold text-rose-600 mb-1 flex items-center gap-1.5 uppercase">
                      <RefreshCw className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      STUDENT WITNESS CORRESPONDENCE:
                    </p>
                    <p className="italic leading-relaxed">"{g.responseFromAuthorities}"</p>
                  </div>
                )}
              </div>

              {/* Vote panel on side/bottom */}
              <div className="flex md:flex-col items-center justify-between w-full md:w-auto md:self-stretch border-t-2 md:border-t-0 md:border-l-2 border-black pt-4 md:pt-0 md:pl-6 shrink-0 gap-4">
                <div className="text-center md:py-2">
                  <span className="block text-4xl font-mono font-black text-slate-950 leading-none">
                    {g.upvotes}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono font-bold tracking-widest uppercase">
                    URGENCY CO-SIGNS
                  </span>
                </div>
                <button
                  id={`btn-upvote-${g.id}`}
                  onClick={() => handleUpvote(g.id)}
                  disabled={votedIds.includes(g.id)}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold text-xs rounded-none transition-all border-2 border-black ${
                    votedIds.includes(g.id)
                      ? 'bg-[#e2dfd5] text-slate-500 cursor-not-allowed'
                      : 'bg-[#fcfbf9] hover:bg-rose-50 text-slate-800 hover:text-rose-600 cursor-pointer shadow-xs active:translate-y-[1px]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 shrink-0 ${votedIds.includes(g.id) ? 'text-slate-400' : ''}`} />
                  {votedIds.includes(g.id) ? 'CO-SIGNED' : 'CO-SIGN REPORT'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#f2f0e9]/50 border-2 border-black space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-slate-900 font-serif font-bold text-lg">NO ALLEGATIONS MATCH FILTER</h4>
            <p className="text-slate-500 text-xs font-mono">DOCKET EMPTY FOR SELECTED PARAMETERS</p>
          </div>
        )}
      </div>
    </div>
  );
}

