import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockSessions = [
  { session: 'S1', confidence: 68, posture: 72, tone: 65 },
  { session: 'S2', confidence: 74, posture: 69, tone: 70 },
  { session: 'S3', confidence: 71, posture: 75, tone: 73 },
  { session: 'S4', confidence: 78, posture: 80, tone: 76 },
  { session: 'S5', confidence: 75, posture: 78, tone: 80 },
  { session: 'S6', confidence: 82, posture: 83, tone: 79 },
  { session: 'S7', confidence: 80, posture: 86, tone: 83 },
  { session: 'S8', confidence: 86, posture: 84, tone: 85 },
  { session: 'S9', confidence: 84, posture: 88, tone: 87 },
  { session: 'S10', confidence: 90, posture: 91, tone: 89 },
];

const avg = (key) =>
  Math.round(mockSessions.reduce((sum, s) => sum + s[key], 0) / mockSessions.length);

const trendCharts = [
  {
    key: 'confidence',
    label: 'Confidence',
    statLabel: 'AVG CONFIDENCE',
    statValue: `${avg('confidence')}%`,
    stroke: '#ffffff',
    icon: 'solar:microphone-3-linear',
    desc: 'Derived from speech tone analysis across sessions.',
  },
  {
    key: 'posture',
    label: 'Posture',
    statLabel: 'AVG POSTURE',
    statValue: `${avg('posture')}%`,
    stroke: 'rgba(255,255,255,0.65)',
    icon: 'solar:body-linear',
    desc: 'Derived from posture and gaze tracking data.',
  },
  {
    key: 'tone',
    label: 'Tone',
    statLabel: 'AVG TONE',
    statValue: `${avg('tone')}%`,
    stroke: 'rgba(255,255,255,0.40)',
    icon: 'solar:waveform-linear',
    desc: 'Speech tone and delivery consistency score.',
  },
];

const statCards = [
  { label: 'Overall Avg Score', value: '86%', sub: '+4.2% this month', icon: 'solar:graph-up-linear' },
  { label: 'Sessions Completed', value: '10', sub: 'All time', icon: 'solar:play-circle-linear' },
  { label: 'Best Session Score', value: '91%', sub: 'Session 10', icon: 'solar:medal-ribbons-star-linear' },
  { label: 'Trend Direction', value: '↑ Positive', sub: 'Consistent growth', icon: 'solar:chart-2-linear' },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function DarkTooltip({ active, payload, label, dataKey }) {
  if (!active || !payload || !payload.length) return null;
  const val = payload.find((p) => p.dataKey === dataKey);
  return (
    <div className="bg-black border border-white/10 rounded-xl px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-mono text-white font-semibold">{val ? `${val.value}%` : '—'}</p>
    </div>
  );
}

// ─── Single Chart Card ────────────────────────────────────────────────────────
function TrendCard({ chart }) {
  return (
    <div className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-7 flex flex-col gap-5 fade-up relative overflow-hidden group">
      {/* Subtle grid texture on hover */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />

      {/* Card header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          {/* Mono uppercase stat label + bold value */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {chart.statLabel}
            </span>
            <span className="text-base font-mono font-bold text-white leading-none">
              {chart.statValue}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <Icon icon={chart.icon} className="text-neutral-400 text-base" />
            {chart.label}
          </h3>
          <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">{chart.desc}</p>
        </div>
        {/* Live indicator */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
          <span className="text-[9px] font-mono text-white uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Recharts LineChart */}
      <div className="relative z-10 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockSessions} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid
              strokeDasharray="0"
              stroke="rgba(255,255,255,0.05)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="session"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[50, 100]}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              tickCount={4}
            />
            <Tooltip
              content={(props) => <DarkTooltip {...props} dataKey={chart.key} />}
              cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey={chart.key}
              stroke={chart.stroke}
              strokeWidth={1.5}
              dot={false}
              activeDot={{
                r: 3,
                fill: '#ffffff',
                stroke: 'rgba(255,255,255,0.3)',
                strokeWidth: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalysisView({ onStartPractice }) {
  // IntersectionObserver-driven fade-up reveal (same pattern as HomePage)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.08 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-neutral-200 antialiased bg-black selection:bg-white/20 selection:text-white">
      {/* Subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.018] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 flex flex-col gap-16">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 mb-4 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              Performance Telemetry
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
              Your Analysis
            </h1>
            <p className="text-base text-neutral-400 font-light leading-relaxed max-w-lg">
              Track how your confidence, posture, and tone have evolved across every session.
            </p>
          </div>
          <button
            onClick={onStartPractice}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2 w-fit cursor-pointer shrink-0"
          >
            <Icon icon="solar:rocket-bold-duotone" className="text-sm" />
            Practice Weak Points
          </button>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-6 flex flex-col justify-between gap-4 group relative overflow-hidden"
            >
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

        {/* ── Trend Chart Section Header ───────────────────────────────────── */}
        <div className="flex flex-col gap-3 fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Session Trends
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            Score progression for confidence, posture, and tone plotted across all recorded sessions.
          </p>
        </div>

        {/* ── Three Trend Line Charts ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {trendCharts.map((chart) => (
            <TrendCard key={chart.key} chart={chart} />
          ))}
        </div>

        {/* ── Bottom CTA strip ────────────────────────────────────────────── */}
        <div className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6 fade-up relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">AI RECOMMENDATION</div>
            <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">Ready to improve further?</h3>
            <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Your confidence trend is climbing steadily. Focus your next session on sustaining high-tone delivery under pressure.
            </p>
          </div>
          <button
            onClick={onStartPractice}
            className="relative z-10 px-6 py-3 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Icon icon="solar:play-circle-bold-duotone" className="text-base" />
            Start a Session
          </button>
        </div>

      </div>
    </div>
  );
}
