import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function NewInterviewModal({ isOpen, onClose, initialData, onStartSession }) {
  const [company, setCompany] = useState(initialData?.company || 'Stripe');
  const [role, setRole] = useState(initialData?.role || 'Senior Full Stack Engineer');
  const [track, setTrack] = useState(initialData?.type || 'Technical');
  const [duration, setDuration] = useState('45 mins');
  const [seniority, setSeniority] = useState('Senior (L5 / IC5)');
  const [isStarting, setIsStarting] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      onStartSession?.({ company, role, track, duration, seniority });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0e0e13] border border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-neutral-200 overflow-hidden"
        style={{
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(52, 211, 153, 0.06)',
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
              <Icon icon="solar:rocket-bold-duotone" className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Configure New Mock Interview</h3>
              <p className="text-xs text-neutral-400">Praxis AI will calibrate questions to real company rubrics.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" className="text-lg" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Company & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-neutral-400 block mb-1.5">Target Company</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-white/30"
              >
                {['Stripe', 'Google', 'Meta', 'OpenAI', 'Anthropic', 'Apple', 'Amazon', 'Netflix', 'Airbnb'].map((c) => (
                  <option key={c} value={c} className="bg-neutral-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-neutral-400 block mb-1.5">Seniority Level</label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-white/30"
              >
                {['Mid-Level (L4 / IC4)', 'Senior (L5 / IC5)', 'Staff (L6 / IC6)', 'Principal (L7+)', 'Engineering Manager'].map((s) => (
                  <option key={s} value={s} className="bg-neutral-900 text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-neutral-400 block mb-1.5">Role Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Interview Track */}
          <div>
            <label className="font-mono text-neutral-400 block mb-1.5">Interview Track</label>
            <div className="grid grid-cols-3 gap-2">
              {['Technical', 'System Design', 'Behavioral'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  className={`py-2 px-3 rounded-xl font-medium border text-center transition-all cursor-pointer ${
                    track === t
                      ? 'bg-white text-black font-semibold border-white shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:bg-white/[0.05]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <div>
            <label className="font-mono text-neutral-400 block mb-1.5">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {['30 mins (Rapid)', '45 mins (Standard)', '60 mins (Deep Dive)'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-2 px-2.5 rounded-xl font-medium border text-center transition-all cursor-pointer ${
                    duration === d
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLaunch}
            disabled={isStarting}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {isStarting ? (
              <>
                <Icon icon="solar:restart-bold" className="animate-spin text-sm" />
                Initializing AI Session...
              </>
            ) : (
              <>
                <Icon icon="solar:play-circle-bold-duotone" className="text-base" />
                Start Mock Interview
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
