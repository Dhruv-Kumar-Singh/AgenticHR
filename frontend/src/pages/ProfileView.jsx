import { useState } from 'react';
import { Icon } from '@iconify/react';
import DocumentUploadModal from '../components/DocumentUploadModal';

export default function ProfileView({ onOpenNewInterview }) {
  const [isUploading, setIsUploading] = useState(false);
  const [candidate, setCandidate] = useState({
    name: 'Alex Morgan',
    title: 'Senior / Staff Full Stack Engineer',
    location: 'San Francisco, CA (Open to Remote)',
    experience: '7+ Years of Industry Experience',
    targetRoles: ['Staff Software Engineer', 'Engineering Manager', 'Distributed Systems Lead'],
    targetCompensation: '$260,000 - $340,000 Base + Equity',
  });

  const [documents, setDocuments] = useState([
    { id: '1', name: 'Alex_Morgan_Staff_Resume_2026.pdf', type: 'Resume / CV', size: '240 KB', updated: 'Yesterday' },
    { id: '2', name: 'Stripe_Staff_FullStack_JD.pdf', type: 'Job Spec', size: '180 KB', updated: '3 days ago' },
    { id: '3', name: 'Distributed_Systems_SystemDesign_Notes.md', type: 'Prep Notes', size: '64 KB', updated: 'Sep 05, 2026' },
  ]);

  const [aiPersona, setAiPersona] = useState('bar_raiser');

  const personas = [
    { id: 'bar_raiser', title: 'FAANG Bar Raiser', desc: 'Demanding, presses hard on edge cases, latency boundaries, and scale invariants.', icon: 'solar:shield-warning-bold-duotone' },
    { id: 'collaborative', title: 'Collaborative Tech Lead', desc: 'Engaging, co-design oriented, prompts hints when stuck, friendly atmosphere.', icon: 'solar:users-group-two-rounded-bold-duotone' },
    { id: 'executive', title: 'Director / VP Behavioral', desc: 'Focuses on strategic decisions, executive storytelling, business revenue metrics.', icon: 'solar:crown-bold-duotone' },
  ];

  const handleAddDoc = (doc) => {
    setDocuments((prev) => [
      { id: doc.id, name: doc.name, type: 'Uploaded Doc', size: doc.size, updated: 'Just now' },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen text-neutral-200 antialiased pb-24 pt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e13]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20 shadow-xl">
              AM
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0e0e13]" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{candidate.name}</h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                Verified Candidate
              </span>
            </div>
            <p className="text-sm text-neutral-300 font-medium">{candidate.title}</p>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">{candidate.location} • {candidate.experience}</p>
          </div>
        </div>

        <button
          onClick={onOpenNewInterview}
          className="px-6 py-3 rounded-xl text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="solar:play-circle-bold-duotone" className="text-base" />
          Launch Mock Session
        </button>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents & Context Library */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0e0e13]/80 border border-white/10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Icon icon="solar:folder-with-files-bold-duotone" className="text-emerald-400" />
                Resume & Knowledge Base
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Documents parsed by Praxis Copilot during mock sessions.</p>
            </div>
            <button
              onClick={() => setIsUploading(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Icon icon="solar:add-circle-bold-duotone" className="text-emerald-400 text-sm" />
              + Add Document
            </button>
          </div>

          <div className="space-y-2.5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon icon="solar:document-text-bold-duotone" className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-white">{doc.name}</h4>
                    <span className="text-[10px] font-mono text-neutral-500">{doc.type} • {doc.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <span>{doc.updated}</span>
                  <button
                    onClick={() => setDocuments((prev) => prev.filter((d) => d.id !== doc.id))}
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Interviewer Persona Preferences */}
        <div className="p-6 rounded-2xl bg-[#0e0e13]/80 border border-white/10 flex flex-col gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Icon icon="solar:tuning-bold-duotone" className="text-purple-400" />
            AI Persona Setting
          </h3>
          <p className="text-xs text-neutral-400">Choose how strict Praxis AI evaluates your mock answers.</p>

          <div className="space-y-2.5">
            {personas.map((p) => {
              const isSelected = aiPersona === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setAiPersona(p.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.08)]'
                      : 'bg-white/[0.01] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Icon icon={p.icon} className={isSelected ? 'text-emerald-400' : 'text-neutral-400'} />
                      {p.title}
                    </span>
                    {isSelected && <Icon icon="solar:check-circle-bold" className="text-xs text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DocumentUploadModal
        isOpen={isUploading}
        onClose={() => setIsUploading(false)}
        onAttachDocument={handleAddDoc}
      />
    </div>
  );
}
