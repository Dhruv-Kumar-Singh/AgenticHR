import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Background from '../components/Background';

/* ─── Tiny helpers ─────────────────────────────────────────── */

function Badge({ children, color = 'neutral' }) {
  const map = {
    neutral: 'bg-white/5 border-white/10 text-white',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    red: 'bg-red-500/10 border-red-500/30 text-red-300',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border uppercase tracking-widest ${map[color]}`}>
      {children}
    </span>
  );
}

/* ─── SVG Area Chart (performance / confidence) ─────────────── */
function AreaChart({ data, color = '#ffffff', label, unit = '%' }) {
  const W = 260, H = 80;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - (v / 100) * H,
  ]);
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const areaD = `${pathD} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${label})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity="0.8" />
        ))}
      </svg>
    </div>
  );
}

/* ─── Dual Line Chart (tone + posture) ──────────────────────── */
function DualLineChart({ dataA, dataB }) {
  const W = 260, H = 80;
  const line = (data, color) => {
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * W,
      H - (v / 100) * H,
    ]);
    return (
      <path
        d={pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    );
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
      {line(dataA, '#ffffff')}
      {line(dataB, '#34d399')}
    </svg>
  );
}

/* ─── Bar Chart (confidence) ─────────────────────────────────── */
function BarChart({ data }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end justify-between gap-1 h-20 w-full">
      {data.map((v, i) => {
        const pct = (v / max) * 100;
        const isLow = v < 70;
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all duration-700 ${isLow ? 'bg-red-500/60 border-t border-red-400' : 'bg-white/20 border-t border-white/40'}`}
            style={{ height: `${pct}%` }}
            title={`${v}%`}
          />
        );
      })}
    </div>
  );
}

/* ─── Mock Video Player ──────────────────────────────────────── */
function VideoPlayer({ interview }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(22);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPlaying(false); return 100; }
        return p + 0.15;
      });
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Screen */}
      <div className="relative flex-1 rounded-xl bg-black border border-white/10 overflow-hidden min-h-[140px] flex items-center justify-center group">
        {/* Static noise scanline */}
        <div className="scanline pointer-events-none" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

        {/* Interview visual placeholder */}
        <div className="flex flex-col items-center gap-3 relative z-10 select-none">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center text-3xl font-bold font-mono text-white/30">
            {interview.company[0]}
          </div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Recording · {interview.duration}</span>
        </div>

        {/* Play overlay */}
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors group cursor-pointer"
        >
          <div className={`w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <Icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} className="text-white text-xl ml-0.5" />
          </div>
        </button>

        {/* REC badge */}
        {playing && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[9px] font-mono text-red-300 uppercase">Playing</span>
          </div>
        )}
      </div>

      {/* Progress + Controls */}
      <div className="space-y-2">
        {/* Waveform-style progress bar */}
        <div className="relative h-6 flex items-center gap-0.5 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.6) * 14 + Math.cos(i * 1.3) * 8;
            const filled = (i / 48) * 100 <= progress;
            return (
              <div
                key={i}
                className={`flex-1 rounded-[1px] transition-colors ${filled ? 'bg-white' : 'bg-white/15'}`}
                style={{ height: `${Math.max(4, Math.min(h, 24))}px` }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>{Math.floor((progress / 100) * parseInt(interview.duration)) || 0}m elapsed</span>
          <span>{interview.duration}</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setProgress(Math.max(0, progress - 10))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <Icon icon="solar:skip-previous-bold" className="text-sm" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex-1 h-8 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} />
            {playing ? 'Pause' : 'Play Recording'}
          </button>
          <button onClick={() => setProgress(Math.min(100, progress + 10))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <Icon icon="solar:skip-next-bold" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function InterviewReportPage({ interview, onBack }) {
  const headerRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  // Scroll-reveal observer
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
    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!interview) return null;

  /* ── Simulated timeline data ── */
  const perfData    = [72, 78, 82, 75, 88, 91, 85, 90, interview.score - 2, interview.score];
  const confData    = [65, 70, 60, 68, interview.score - 10, 80, 85, 88, 90, interview.score];
  const toneData    = [80, 75, 78, 82, 85, interview.score - 5, 88, 90, 87, interview.score - 2];
  const postureData = [70, 72, 68, 75, 78, 80, 76, 82, 85, interview.score - 3];
  const confBars    = [68, 80, 55, 78, 88, 72, 90, 65, 85, interview.score - 4];

  /* ── Verdict color ── */
  const verdictColor = interview.verdict.includes('Strong')
    ? 'emerald'
    : interview.verdict.includes('Hire')
    ? 'blue'
    : 'amber';

  /* ── Weak questions (score < 92) ── */
  const weakQuestions = (interview.questions || []).filter((q) => q.score < 92);

  /* ── Tips ── */
  const goodTips = [
    'Maintained clear logical structure throughout answers',
    'Strong use of concrete examples and metrics',
    interview.strengths?.[0] || 'Demonstrated deep technical knowledge',
    interview.strengths?.[1] || 'Articulated trade-offs effectively',
  ];
  const improveTips = [
    interview.improvements?.[0] || 'Add more quantitative depth to responses',
    'Reduce filler words — detected 14 instances of "um/uh"',
    'Maintain upright posture between 18:30–24:00 (slight drop detected)',
    'Pace down during complex explanations — speech rate peaked at 180 wpm',
  ];

  return (
    <div className="min-h-screen text-neutral-200 antialiased relative bg-black">
      <Background />

      {/* ─── Page Header ───────────────────────────────────────── */}
      <div ref={headerRef} className="relative z-10 pt-28 pb-10 px-6 md:px-10 border-b border-white/[0.05]">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8 group cursor-pointer"
        >
          <Icon icon="solar:arrow-left-linear" className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest">Back to Home</span>
        </button>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge color={verdictColor}>{interview.verdict}</Badge>
          <Badge color="neutral">{interview.type}</Badge>
          <Badge color="neutral">{interview.company}</Badge>
          <Badge color="neutral">{interview.date}</Badge>
          <Badge color="neutral">{interview.duration}</Badge>
          <Badge color="neutral">{interview.score}/100</Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2 leading-tight">
          {interview.title}
        </h1>
        <p className="text-sm text-neutral-400 font-light">{interview.role} · {interview.company}</p>
      </div>

      {/* ─── Bento Grid ────────────────────────────────────────── */}
      <section className="relative z-10 py-10 px-6 md:px-10 space-y-5">

        {/* ── Row 1: Recording (LEFT) + Performance + Confidence (RIGHT) ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ gridTemplateRows: 'auto' }}>

          {/* ── Recording ─ col-span-2 row-span-2 LEFT ── */}
          <div
            className="col-span-1 md:col-span-2 md:row-span-2 p-7 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col gap-5 fade-up"
            style={{ minHeight: '620px' }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Session Recording</span>
              </div>
              <Icon icon="solar:video-frame-play-vertical-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col min-h-0">
              <VideoPlayer interview={interview} />
            </div>

            {/* Session stats row */}
            <div className="relative z-10 border-t border-white/[0.06] pt-5 grid grid-cols-3 gap-4">
              {[
                { label: 'Duration', value: interview.duration },
                { label: 'Questions', value: `${interview.questions?.length || 0} asked` },
                { label: 'Score', value: `${interview.score}/100` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-lg font-mono font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Performance Graph ─ col-span-1 ── */}
          <div
            className="col-span-1 p-7 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between fade-up"
            style={{ minHeight: '296px' }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
            <div className="flex items-center justify-between relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Performance</span>
              </div>
              <Icon icon="solar:chart-2-linear" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center mt-4">
              <AreaChart data={perfData} color="#ffffff" label="perf" />
              <div className="flex justify-between mt-3 text-[8px] font-mono text-neutral-600">
                {['0m', '5m', '10m', '20m', '30m', '45m'].map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[9px] font-mono text-red-300">Dip at 08:30 — review pacing</span>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] pt-4 mt-4">
              <h3 className="text-base font-bold text-white tracking-tight">Performance Trend</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">Peak: {interview.score}% · Avg: {Math.round(perfData.reduce((a,b)=>a+b)/perfData.length)}%</p>
            </div>
          </div>

          {/* ── Confidence Bar Chart ─ col-span-1 ── */}
          <div
            className="col-span-1 p-7 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between fade-up"
            style={{ minHeight: '296px' }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
            <div className="flex items-center justify-between relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Confidence</span>
              </div>
              <Icon icon="solar:shield-bold-duotone" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 mt-4">
              <BarChart data={confBars} />
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-white/20 inline-block" />High</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/60 inline-block" />Low (&lt;70%)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[9px] font-mono text-red-300">Dip at 12:45 — hesitation</span>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] pt-4 mt-4">
              <h3 className="text-base font-bold text-white tracking-tight">Confidence Levels</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">3 low-confidence segments · Avg: {Math.round(confBars.reduce((a,b)=>a+b)/confBars.length)}%</p>
            </div>
          </div>

          {/* ── Tone & Posture ─ col-span-2, aligns to right side row 2 ── */}
          <div
            className="col-span-1 md:col-span-2 p-7 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between fade-up"
            style={{ minHeight: '296px' }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
            <div className="flex items-center justify-between relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Tone & Posture</span>
              </div>
              <Icon icon="solar:user-speak-bold-duotone" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 mt-4">
              <DualLineChart dataA={toneData} dataB={postureData} />
              <div className="flex items-center gap-6 text-xs font-mono mt-1">
                <span className="flex items-center gap-1.5"><span className="w-5 h-[2px] bg-white inline-block rounded" />Tone</span>
                <span className="flex items-center gap-1.5"><span className="w-5 h-[2px] bg-emerald-400 inline-block rounded" />Posture</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[9px] font-mono text-amber-300">Posture dip at 18:30</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-300">Tone consistent throughout</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] pt-4 mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">Tone Average</div>
                <div className="text-lg font-mono font-bold text-white">{Math.round(toneData.reduce((a,b)=>a+b)/toneData.length)}%</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">Posture Average</div>
                <div className="text-lg font-mono font-bold text-white">{Math.round(postureData.reduce((a,b)=>a+b)/postureData.length)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Tips to Improve ─ full width ── */}
        <div
          className="p-7 md:p-10 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col gap-6 fade-up"
          style={{ minHeight: '340px' }}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
          <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2">
                <Icon icon="solar:lightbulb-bold-duotone" className="text-white text-sm" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Tips to Improve</span>
              </div>
              <p className="text-xs text-neutral-400 font-mono pl-1">AI-generated coaching notes based on your session</p>
            </div>
            <Icon icon="solar:stars-minimalistic-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Good tips */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                What you did well
              </div>
              {goodTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <Icon icon="solar:check-circle-bold" className="text-emerald-400 text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-200 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>

            {/* Improve tips */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Areas to improve
              </div>
              {improveTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-colors">
                  <Icon icon="solar:close-circle-bold" className="text-red-400 text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-neutral-200 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Incorrectly Answered Questions ─ full width ── */}
        <div
          className="p-7 md:p-10 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col gap-6 fade-up"
          style={{ minHeight: weakQuestions.length > 0 ? `${Math.max(420, weakQuestions.length * 180)}px` : '200px' }}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2 w-fit">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Questions Needing Improvement</span>
              </div>
              <p className="text-xs text-neutral-400 font-mono pl-1">
                {weakQuestions.length > 0
                  ? `${weakQuestions.length} question${weakQuestions.length > 1 ? 's' : ''} scored below threshold — review AI-suggested answers below`
                  : 'All questions answered above threshold — excellent performance!'}
              </p>
            </div>
            <Icon icon="solar:diploma-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
          </div>

          <div className="relative z-10">
            {weakQuestions.length === 0 ? (
              <div className="flex items-center gap-3 py-8 text-emerald-400">
                <Icon icon="solar:check-circle-bold" className="text-2xl" />
                <span className="text-sm font-mono">All answers scored above 92% — no weak spots detected</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {weakQuestions.map((q, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors flex flex-col gap-4">
                    {/* Question header */}
                    <div className="flex items-start gap-3">
                      <span className="text-[9px] font-mono px-2 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 mt-0.5 flex-shrink-0">Q{idx + 1}</span>
                      <p className="text-sm font-medium text-white leading-snug">{q.title}</p>
                    </div>

                    {/* Score bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-500 uppercase tracking-wider">Score</span>
                        <span className={`font-semibold ${q.score < 70 ? 'text-red-400' : 'text-amber-400'}`}>{q.score}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${q.score < 70 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-amber-600 to-amber-300'}`}
                          style={{ width: `${q.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Original feedback */}
                    <div className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5 font-semibold">Your Answer</div>
                      <p className="text-sm text-neutral-300 font-light leading-relaxed">{q.feedback}</p>
                    </div>

                    {/* AI improvement suggestion */}
                    <div className="px-3 py-2.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon icon="solar:stars-minimalistic-bold-duotone" className="text-emerald-400 text-sm" />
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">How to improve</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {q.score < 80
                          ? 'Structure your answer with a concrete scenario first, then walk through your reasoning step-by-step. Quantify outcomes where possible (e.g. latency reduced by X ms, throughput improved by Y%).'
                          : 'Good foundation — add one more layer of depth by discussing edge cases or failure modes to push this above 92%.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-16" />
      </section>
    </div>
  );
}
