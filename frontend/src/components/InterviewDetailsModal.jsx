import { Icon } from '@iconify/react';

export default function InterviewDetailsModal({ interview, isOpen, onClose, onReattempt }) {
  if (!isOpen || !interview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-[#0c0c10] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-y-auto scrollbar-hide flex flex-col gap-6 text-neutral-200"
        style={{
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Glow backdrop accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl font-bold font-mono shadow-inner">
              {interview.company[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h2 className="text-xl font-bold text-white tracking-tight">{interview.role}</h2>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                  {interview.company}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>{interview.date}</span>
                <span>•</span>
                <span>{interview.duration}</span>
                <span>•</span>
                <span className="text-neutral-300">{interview.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-white flex items-center gap-1 justify-end">
                {interview.score}
                <span className="text-sm font-normal text-neutral-500">/100</span>
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                  interview.verdict.includes('Strong')
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : interview.verdict.includes('Hire')
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {interview.verdict}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <Icon icon="solar:close-circle-linear" className="text-xl" />
            </button>
          </div>
        </div>

        {/* Competency Breakdown Cards */}
        <div>
          <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
            Competency Evaluation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {interview.breakdown?.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300 font-medium">{item.label}</span>
                  <span className="text-sm font-mono font-bold text-white">{item.score}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Key Feedback & Executive Summary */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-white font-medium text-sm">
            <Icon icon="solar:stars-minimalistic-bold-duotone" className="text-emerald-400 text-lg" />
            <span>Praxis AI Assessment Summary</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">{interview.fullFeedback}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                <Icon icon="solar:check-circle-bold" /> Strengths
              </span>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                {interview.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
                <Icon icon="solar:danger-triangle-bold" /> High-Impact Improvements
              </span>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                {interview.improvements?.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Questions Asked & Answers */}
        <div>
          <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
            Interview Questions & AI Evaluation
          </h4>
          <div className="space-y-2.5">
            {interview.questions?.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-white">{q.title}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{q.score}%</span>
                </div>
                <p className="text-xs text-neutral-400 pl-7">{q.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onReattempt(interview);
                onClose();
              }}
              className="px-5 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Icon icon="solar:restart-bold-duotone" className="text-sm" />
              Re-attempt This Mock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
