import { Icon } from '@iconify/react';

export default function AnalysisView({ onStartPractice }) {
  const metrics = [
    { label: 'Overall Readiness', value: '90%', change: '+6.2%', status: 'positive' },
    { label: 'Total Mock Hours', value: '14.5 hrs', change: '+3.5 hrs', status: 'positive' },
    { label: 'Avg Feedback Score', value: '90.2 / 100', change: '+4.1 pts', status: 'positive' },
    { label: 'Offer Probability', value: '88%', change: 'High Tier', status: 'neutral' },
  ];

  const skillBreakdown = [
    { name: 'System Architecture & Scalability', score: 92, level: 'Staff Level', color: 'from-emerald-500 to-teal-400' },
    { name: 'Data Structures & Algorithms', score: 88, level: 'Senior L5', color: 'from-blue-500 to-indigo-400' },
    { name: 'Behavioral & STAR Leadership', score: 95, level: 'Exceptional', color: 'from-purple-500 to-pink-400' },
    { name: 'Concurrency & Distributed State', score: 86, level: 'Senior L5', color: 'from-amber-500 to-orange-400' },
    { name: 'Code Hygiene & Testing Discipline', score: 91, level: 'Staff Level', color: 'from-emerald-400 to-cyan-400' },
  ];

  const targetCompanies = [
    { name: 'Stripe', role: 'Staff Full Stack', fit: 94, status: 'Ready to interview' },
    { name: 'Meta', role: 'Engineering Manager (E6)', fit: 96, status: 'Ready to interview' },
    { name: 'Google', role: 'Staff Distributed Systems (L6)', fit: 89, status: 'Brush up WAN failover' },
    { name: 'OpenAI', role: 'Platform Engineer', fit: 91, status: 'Review high-load streaming' },
  ];

  return (
    <div className="min-h-screen text-neutral-200 antialiased pb-24 pt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 mb-3">
            <Icon icon="solar:chart-2-bold-duotone" />
            Performance Telemetry
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Interview Skill Analysis</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Deep-dive evaluation computed by Praxis AI across all completed mock sessions.
          </p>
        </div>

        <button
          onClick={onStartPractice}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md active:scale-95 flex items-center gap-2 w-fit cursor-pointer"
        >
          <Icon icon="solar:rocket-bold-duotone" className="text-sm" />
          Practice Weak Points
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-2">
            <span className="text-xs font-mono text-neutral-400">{m.label}</span>
            <div className="text-2xl font-mono font-bold text-white">{m.value}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <Icon icon="solar:graph-up-bold-duotone" />
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Skills Breakdown & Company Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Competency Matrix */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0e0e13]/80 border border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Icon icon="solar:layers-bold-duotone" className="text-emerald-400" />
              Core Competency Scores
            </h3>
            <span className="text-xs font-mono text-neutral-400">Benchmark: Staff SWE</span>
          </div>

          <div className="space-y-4">
            {skillBreakdown.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-200 font-medium">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 font-mono text-[11px]">{s.level}</span>
                    <span className="text-white font-mono font-bold">{s.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommendation Alert */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
            <Icon icon="solar:stars-minimalistic-bold-duotone" className="text-emerald-400 text-xl shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white mb-1">Praxis AI Targeted Recommendation</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your System Architecture and STAR Behavioral answers are consistently rated in the top 5th percentile.
                To secure Staff L6 offers at Google, spend 2 additional drills on WAN latency partitions and Raft split-brain resilience.
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Target Company Fit */}
        <div className="p-6 rounded-2xl bg-[#0e0e13]/80 border border-white/10 flex flex-col gap-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Icon icon="solar:buildings-bold-duotone" className="text-blue-400" />
            Target Company Readiness
          </h3>

          <div className="space-y-3">
            {targetCompanies.map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{c.name}</h4>
                    <span className="text-[11px] text-neutral-400 font-mono">{c.role}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-400">{c.fit}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
