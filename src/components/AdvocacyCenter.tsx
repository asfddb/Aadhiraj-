import React, { useState, useEffect } from 'react';
import { Send, Copy, Check, Users, Mail, Phone, MapPin, Award } from 'lucide-react';

const CONTACTS = [
  {
    role: 'The Commissioner',
    org: 'Kendriya Vidyalaya Sangathan (HQ)',
    address: '18, Institutional Area, Shaheed Jeet Singh Marg, New Delhi - 110016',
    email: 'commissioner-kvs@gov.in',
    phone: '+91-11-26858570'
  },
  {
    role: 'The Deputy Commissioner',
    org: 'KVS Regional Office Kolkata (Under which Port Blair falls)',
    address: 'EB Block, Sector III, Salt Lake, Kolkata - 700106',
    email: 'dckolro@kvs.gov.in',
    phone: '+91-33-23351981'
  },
  {
    role: 'The Chairman, VMC',
    org: 'KV No. 1 Port Blair (Deputy Commissioner, South Andaman)',
    address: 'Office of the Deputy Commissioner, South Andaman District, Port Blair - 744101',
    email: 'dcandaman@nic.in',
    phone: '+91-3192-233089'
  }
];

const PETITION_GOAL = 1000;

export default function AdvocacyCenter() {
  const [copied, setCopied] = useState(false);
  const [signatures, setSignatures] = useState(642);
  const [hasSigned, setHasSigned] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Parent');

  useEffect(() => {
    const storedSignatures = localStorage.getItem('kv_petition_signatures');
    const signedState = localStorage.getItem('kv_petition_signed_state');

    if (storedSignatures) {
      setSignatures(parseInt(storedSignatures));
    } else {
      localStorage.setItem('kv_petition_signatures', '642');
    }

    if (signedState === 'true') {
      setHasSigned(true);
    }
  }, []);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    const newSigs = signatures + 1;
    setSignatures(newSigs);
    setHasSigned(true);
    localStorage.setItem('kv_petition_signatures', newSigs.toString());
    localStorage.setItem('kv_petition_signed_state', 'true');
    localStorage.setItem('kv_signer_name', userName.trim());
  };

  const petitionProgressPercentage = Math.min((signatures / PETITION_GOAL) * 100, 100);

  const emailSubject = 'URGENT: Demanding Infrastructure Overhaul and Maintenance at KV No. 1 Port Blair';
  const emailBody = `Respected Sir/Madam,

I am writing this email to draw your urgent attention to the deplorable physical condition of Kendriya Vidyalaya No. 1, Port Blair (Andaman & Nicobar Islands). 

As one of the oldest and most prestigious central schools in the union territory, it is heartbreaking and hazardous to witness the current state of neglect:
1. Washrooms and Toilets are severely clogged, lack running water, and many doors are broken or missing.
2. The drinking water coolers are rusting and filters have not been audited or replaced for months, resulting in stomach illnesses.
3. Classrooms suffer from deep structural dampness and black mold due to seeping monsoon rains, and many student desks are broken with exposed metal nails.
4. Computer labs and science labs house dead systems and lack basic practical apparatus.
5. Live electrical wires hang loose in secondary corridors, exposing small children to high-voltage hazards.

Under the RTE Act and basic health norms, our children deserve a safe, clean, and inspiring environment to study. 

We urgently request the KVS authorities to:
- Conduct an immediate structural and sanitary audit.
- Allocate separate, emergency civil works budgets to restore toilets and drinking coolers.
- Sanction replacement computer equipment and lab reagents.

We look forward to your prompt response and corrective action on this critical matter.

Yours faithfully,
[Your Name]
[Concerned Parent/Alumni/Citizen]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerEmail = (emailAddress: string) => {
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="advocacy-center-container">
      {/* Left panel: Petition sign */}
      <div className="lg:col-span-5 bg-white border-2 border-black p-6 rounded-none shadow-xs space-y-6" id="petition-box">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-white bg-rose-600 border border-black px-2.5 py-1 uppercase tracking-wider inline-block">
            DEMAND FORM 04A // CITIZEN CO-SIGN
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 leading-tight">
            Urgent Improvement Petition
          </h3>
          <p className="text-slate-600 text-xs font-serif leading-relaxed">
            We are collecting physical and digital signatures to formally present this maintenance audit report directly to the KVS Commissioner in New Delhi.
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-3 bg-[#f2f0e9]/50 p-4 border-2 border-black rounded-none">
          <div className="flex justify-between items-baseline">
            <div className="flex items-center gap-1.5 text-slate-950 font-serif">
              <Users className="w-4 h-4 text-rose-600" />
              <span className="font-mono font-black text-2xl">{signatures}</span>
              <span className="text-xs text-slate-500 font-mono uppercase font-bold">CO-SIGNATURES</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold font-mono">GOAL: {PETITION_GOAL}</span>
          </div>

          <div className="h-4 w-full bg-[#f2f0e9] border border-black overflow-hidden">
            <div
              className="h-full bg-rose-600 transition-all duration-700"
              style={{ width: `${petitionProgressPercentage}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-bold block text-right uppercase">
            {Math.round(petitionProgressPercentage)}% of safety quorum met
          </span>
        </div>

        {/* Form to Sign */}
        {!hasSigned ? (
          <form onSubmit={handleSign} className="space-y-3" id="petition-form">
            <div>
              <label htmlFor="petition-name-input" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                id="petition-name-input"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g., Rajesh Kumar"
                className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
              />
            </div>

            <div>
              <label htmlFor="petition-role-select" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Stakeholder Relationship
              </label>
              <select
                id="petition-role-select"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full bg-[#f2f0e9]/50 border-2 border-black rounded-none px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:bg-white font-serif"
              >
                <option value="Parent">Parent / Guardian</option>
                <option value="Alumni">Alumni / Former Student</option>
                <option value="Student">Current Student</option>
                <option value="Staff">Concerned Citizen</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm border-2 border-black rounded-none transition-colors cursor-pointer text-center"
            >
              COMMIT MY SIGNATURE
            </button>
          </form>
        ) : (
          <div className="p-5 bg-emerald-50 border-2 border-emerald-600 rounded-none space-y-2 text-center" id="signed-confirmation">
            <Award className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-emerald-800 font-serif font-extrabold text-sm uppercase">VERIFIED SIGNATURE COMMITTED</h4>
            <p className="text-slate-600 text-xs font-serif leading-relaxed">
              Your endorsement has been added to Docket #PV-1. Share this platform with other KV parents to help us breach the 1,000 signatory quorum!
            </p>
          </div>
        )}
      </div>

      {/* Right panel: Lobby authorities */}
      <div className="lg:col-span-7 bg-white border-2 border-black p-6 rounded-none shadow-xs space-y-6" id="lobbying-box">
        <div className="space-y-1 border-b-2 border-black pb-4">
          <h3 className="text-xl font-serif font-black text-slate-900 leading-tight uppercase flex items-center gap-2">
            <Mail className="w-5 h-5 text-rose-600" />
            Lobby KV Administration
          </h3>
          <p className="text-slate-600 text-xs font-mono uppercase">
            Send a registered public claim letter directly to key educational decision-makers.
          </p>
        </div>

        {/* Email template box */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span>REGISTERED COMPLAINT TEMPLATE</span>
            <button
              id="btn-copy-template"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 cursor-pointer font-bold lowercase first-letter:uppercase"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-mono">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-mono">COPY LETTER</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#f2f0e9]/50 border-2 border-black p-4 max-h-[180px] overflow-y-auto text-xs text-slate-800 font-mono leading-relaxed select-all whitespace-pre-line">
            {emailBody}
          </div>
        </div>

        {/* Administrative Contacts & email triggers */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            DIRECT ADMINISTRATIVE DELEGATES:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CONTACTS.map((contact, idx) => (
              <div key={idx} className="bg-white border-2 border-black p-4 rounded-none flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow">
                <div className="space-y-1">
                  <h5 className="font-bold font-serif text-slate-900 text-sm leading-tight">
                    {contact.role}
                  </h5>
                  <p className="text-[10px] text-rose-600 font-mono font-bold uppercase leading-tight">
                    {contact.org}
                  </p>
                  <p className="text-[10px] text-slate-600 font-serif leading-relaxed mt-2 flex items-start gap-1 pt-2 border-t border-black/5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-black/10">
                  <p className="text-[10px] text-slate-600 font-mono flex items-center gap-1 font-bold">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{contact.phone}</span>
                  </p>
                  <button
                    id={`btn-email-${idx}`}
                    onClick={() => triggerEmail(contact.email)}
                    className="w-full py-2 bg-black text-[#f2f0e9] hover:bg-rose-600 hover:text-white text-[11px] font-mono font-bold rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-black"
                  >
                    <Send className="w-3 h-3" />
                    SEND EMAIL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

