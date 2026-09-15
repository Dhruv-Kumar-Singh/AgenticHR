import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const clearRateData = [
  { session: 'S1', rate: 28 }, { session: 'S2', rate: 35 },
  { session: 'S3', rate: 33 }, { session: 'S4', rate: 42 },
  { session: 'S5', rate: 38 }, { session: 'S6', rate: 52 },
  { session: 'S7', rate: 46 }, { session: 'S8', rate: 55 },
  { session: 'S9', rate: 50 }, { session: 'S10', rate: 60 },
];

const interviewsPerMonth = [
  { month: 'Jan', count: 1 }, { month: 'Feb', count: 2 },
  { month: 'Mar', count: 2 }, { month: 'Apr', count: 3 },
  { month: 'May', count: 2 }, { month: 'Jun', count: 4 },
  { month: 'Jul', count: 3 }, { month: 'Aug', count: 5 },
  { month: 'Sep', count: 4 }, { month: 'Oct', count: 0 },
  { month: 'Nov', count: 0 }, { month: 'Dec', count: 0 },
];

const avgClear = Math.round(clearRateData.reduce((s, d) => s + d.rate, 0) / clearRateData.length);

const statCards = [
  { label: 'Interviews Created', value: '26', sub: 'All time', icon: 'solar:play-circle-linear' },
  { label: 'Total Candidates', value: '612', sub: 'Across all sessions', icon: 'solar:users-group-two-rounded-linear' },
  { label: 'Avg Clearing Rate', value: `${avgClear}%`, sub: 'Across all sessions', icon: 'solar:chart-2-linear' },
  { label: 'Subscription Renewals', value: '8', sub: 'Since joining', icon: 'solar:refresh-circle-linear' },
];

function DarkTooltip({ active, payload, label, dataKey, unit = '' }) {
  if (!active || !payload || !payload.length) return null;
  const val = payload.find((p) => p.dataKey === dataKey);
  return (
    <div className="bg-black border border-white/10 rounded-xl px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-mono text-white font-semibold">{val ? `${val.value}${unit}` : '—'}</p>
    </div>
  );
}

export default function ProfAnalysisView() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { root: null, rootMargin: '0px', threshold: 0.08 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-neutral-200 antialiased bg-black selection:bg-white/20 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.018] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 mb-4 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              Hiring Performance Telemetry
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">Platform Analysis</h1>
            <p className="text-base text-neutral-400 font-light leading-relaxed max-w-lg">
              Track your hiring metrics, candidate throughput, and session performance over time.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2 w-fit cursor-pointer shrink-0">
            <Icon icon="solar:export-linear" className="text-sm" />
            Export Report
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
          {statCards.map((card, i) => (
            <div key={i} className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-6 flex flex-col justify-between gap-4 group relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{card.label}</span>
                <Icon icon={card.icon} className="text-neutral-600 text-base group-hover:text-neutral-400 transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="text-3xl font-mono font-bold text-white tracking-tight mb-1">{card.value}</div>
                <div className="text-[10px] font-mono text-neutral-500">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="flex flex-col gap-3 fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Session Trends</h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            Candidate clearing rates per session and total interviews hosted per year.
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Chart 1 — Rate of candidates cleared per session */}
          <div className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-7 flex flex-col gap-5 fade-up relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">AVG CLEAR RATE</span>
                  <span className="text-base font-mono font-bold text-white leading-none">{avgClear}%</span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                  <Icon icon="solar:chart-square-linear" className="text-neutral-400 text-base" />
                  Candidates Cleared per Session
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                  Percentage of candidates meeting your criteria threshold across each hosted session.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                <span className="text-[9px] font-mono text-white uppercase tracking-widest">Live</span>
              </div>
            </div>
            <div className="relative z-10 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clearRateData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.05)" horizontal vertical={false} />
                  <XAxis dataKey="session" tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} axisLine={false} tickLine={false} tickCount={5} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={(props) => <DarkTooltip {...props} dataKey="rate" unit="%" />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="rate" stroke="#ffffff" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: '#ffffff', stroke: 'rgba(255,255,255,0.3)', strokeWidth: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 — Interviews hosted per year */}
          <div className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-7 flex flex-col gap-5 fade-up relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">TOTAL THIS YEAR</span>
                  <span className="text-base font-mono font-bold text-white leading-none">26</span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                  <Icon icon="solar:calendar-bold-duotone" className="text-neutral-400 text-base" />
                  Interviews Hosted per Month
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                  Number of interview sessions created and hosted each month in 2026.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                <span className="text-[9px] font-mono text-white uppercase tracking-widest">2026</span>
              </div>
            </div>
            <div className="relative z-10 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interviewsPerMonth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.05)" horizontal vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }} axisLine={false} tickLine={false} tickCount={4} allowDecimals={false} />
                  <Tooltip content={(props) => <DarkTooltip {...props} dataKey="count" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="count" fill="rgba(255,255,255,0.15)" radius={[4, 4, 0, 0]} activeBar={{ fill: 'rgba(255,255,255,0.35)' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom insight strip */}
        <div className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6 fade-up relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">AI INSIGHT</div>
            <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">Candidate quality is improving steadily</h3>
            <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Your clear rate has grown from 28% to 60% over the last 10 sessions — indicating stronger job description clarity and better candidate targeting.
            </p>
          </div>
          <button className="relative z-10 px-6 py-3 rounded-full text-xs font-semibold text-neutral-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all active:scale-95 flex items-center gap-2 cursor-pointer shrink-0">
            <Icon icon="solar:diploma-bold-duotone" className="text-base" />
            View All Sessions
          </button>
        </div>

      </div>
    </div>
  );
}
