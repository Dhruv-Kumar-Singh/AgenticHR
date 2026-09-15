import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip,
} from 'recharts';
import Background from '../components/Background';

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

function verdictColor(v) {
  if (v.includes('Strong')) return 'emerald';
  if (v === 'Hire') return 'blue';
  return 'neutral';
}

function RadarTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0];
  return (
    <div className="bg-black border border-white/10 rounded-xl px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-0.5">{d.payload.skill}</p>
      <p className="text-sm font-mono text-white font-semibold">{d.value}%</p>
    </div>
  );
}

function Card({ children, className = '', style }) {
  return (
    <div className={`rounded-[2rem] bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group ${className}`} style={style}>
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function AreaChart({ data, color = '#ffffff', label }) {
  const W = 260, H = 80;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / 100) * H]);
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
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity="0.8" />)}
      </svg>
    </div>
  );
}

function DualLineChart({ dataA, dataB }) {
  const W = 260, H = 80;
  const mkLine = (data, color) => {
    const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / 100) * H]);
    return <path d={pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')} fill="none" stroke={color} strokeWidth="1.5" />;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
      {mkLine(dataA, '#ffffff')}
      {mkLine(dataB, '#34d399')}
    </svg>
  );
}

function BarChartSVG({ data }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end justify-between gap-1 h-20 w-full">
      {data.map((v, i) => {
        const pct = (v / max) * 100;
        const isLow = v < 70;
        return <div key={i} className={`flex-1 rounded-sm ${isLow ? 'bg-red-500/60 border-t border-red-400' : 'bg-white/20 border-t border-white/40'}`} style={{ height: `${pct}%` }} title={`${v}%`} />;
      })}
    </div>
  );
}

function VideoPlayer({ candidate }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(22);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => { if (p >= 100) { setPlaying(false); return 100; } return p + 0.15; }), 100);
    return () => clearInterval(id);
  }, [playing]);
  const duration = '45 mins';
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="relative flex-1 rounded-xl bg-black border border-white/10 overflow-hidden min-h-[140px] flex items-center justify-center group">
        <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
        <div className="flex flex-col items-center gap-3 relative z-10 select-none">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center text-3xl font-bold font-mono text-white/30">{candidate.initials}</div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Recording · {duration}</span>
        </div>
        <button onClick={() => setPlaying((p) => !p)} className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors cursor-pointer">
          <div className={`w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all ${playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <Icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} className="text-white text-xl ml-0.5" />
          </div>
        </button>
        {playing && <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/40"><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /><span className="text-[9px] font-mono text-red-300 uppercase">Playing</span></div>}
      </div>
      <div className="space-y-2">
        <div className="relative h-6 flex items-center gap-0.5 cursor-pointer" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - r.left) / r.width) * 100); }}>
          {Array.from({ length: 48 }).map((_, i) => { const h = 20 + Math.sin(i * 0.6) * 14 + Math.cos(i * 1.3) * 8; const filled = (i / 48) * 100 <= progress; return <div key={i} className={`flex-1 rounded-[1px] transition-colors ${filled ? 'bg-white' : 'bg-white/15'}`} style={{ height: `${Math.max(4, Math.min(h, 24))}px` }} />; })}
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>{Math.floor((progress / 100) * 45) || 0}m elapsed</span><span>{duration}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setProgress(Math.max(0, progress - 10))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"><Icon icon="solar:skip-previous-bold" className="text-sm" /></button>
          <button onClick={() => setPlaying((p) => !p)} className="flex-1 h-8 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"><Icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} />{playing ? 'Pause' : 'Play Recording'}</button>
          <button onClick={() => setProgress(Math.min(100, progress + 10))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"><Icon icon="solar:skip-next-bold" className="text-sm" /></button>
        </div>
      </div>
    </div>
  );
}

function getWeakQuestions(score) {
  const all = [
    { title: 'Design a distributed key-value store with strong consistency guarantees', score: 68, feedback: 'Mentioned Raft but did not elaborate on log compaction or lease-based reads.' },
    { title: 'Explain your approach to database indexing for high-write workloads', score: 74, feedback: 'Covered B-trees but missed LSM-tree trade-offs relevant to write amplification.' },
    { title: 'How would you handle cascading failures in a microservices architecture?', score: 71, feedback: 'Mentioned circuit breakers but did not discuss bulkhead isolation or retry storms.' },
    { title: 'Walk through your STAR response on resolving a high-stakes conflict', score: 80, feedback: 'Situation and Task were clear; Action and Result sections lacked quantified outcomes.' },
    { title: 'Implement a thread-safe rate limiter with token bucket algorithm', score: 76, feedback: 'Logic was sound but race conditions under high concurrency were not addressed.' },
  ];
  if (score >= 90) return all.slice(0, 1);
  if (score >= 85) return all.slice(0, 2);
  return all.slice(0, 3);
}

export default function ProfCandidateDetailPage({ candidate, session, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (!candidate) return null;

  const perfData    = [72, 78, 82, 75, 88, 91, 85, 90, candidate.score - 2, candidate.score];
  const confBars    = [68, 80, 55, 78, 88, 72, 90, 65, 85, candidate.score - 4];
  const toneData    = [80, 75, 78, 82, 85, candidate.score - 5, 88, 90, 87, candidate.score - 2];
  const postureData = [70, 72, 68, 75, 78, 80, 76, 82, 85, candidate.score - 3];
  const weakQ       = getWeakQuestions(candidate.score);

  const scoreColor = (s) =>
    s >= 90 ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
    : s >= 80 ? 'text-white border-white/15 bg-white/5'
    : 'text-amber-300 border-amber-500/30 bg-amber-500/10';

  const avg = (arr) => Math.round(arr.reduce((a, b) => a + b) / arr.length);

  return (
    <div className="min-h-screen text-neutral-200 antialiased relative bg-black">
      <Background />
      <div className="relative z-10 pt-28 pb-10 px-6 md:px-10 border-b border-white/[0.05]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8 group cursor-pointer">
          <Icon icon="solar:arrow-left-linear" className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest">Back to Session</span>
        </button>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge color={verdictColor(candidate.verdict)}>{candidate.verdict}</Badge>
          {session && <Badge color="neutral">{session.title}</Badge>}
          <Badge color="neutral">{candidate.score}/100</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2 leading-tight">{candidate.name}</h1>
        <p className="text-sm text-neutral-400 font-light">{candidate.headline} · {candidate.location}</p>
      </div>

      <section className="relative z-10 py-10 px-6 md:px-10 space-y-5">

        {/* 1. Competency number cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 fade-up">
          {candidate.competencies.map((c) => (
            <div key={c.skill} className={`rounded-2xl border p-5 flex flex-col gap-2 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 ${scoreColor(c.score)}`}>
              <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />
              <div className="text-[9px] font-mono uppercase tracking-widest opacity-60 relative z-10">{c.skill}</div>
              <div className="text-4xl font-mono font-bold relative z-10 leading-none">{c.score}</div>
              <div className="text-[10px] font-mono opacity-50 relative z-10">/100</div>
            </div>
          ))}
        </div>

        {/* 2. Bento: Recording + Performance + Confidence + Tone */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 fade-up">
          <Card className="col-span-1 md:col-span-2 md:row-span-2 p-7 flex flex-col gap-5" style={{ minHeight: '620px' }}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Session Recording</span>
              </div>
              <Icon icon="solar:video-frame-play-vertical-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 flex flex-col min-h-0"><VideoPlayer candidate={candidate} /></div>
            <div className="border-t border-white/[0.06] pt-5 grid grid-cols-3 gap-4">
              {[{ label: 'Duration', value: '45 mins' }, { label: 'Score', value: `${candidate.score}/100` }, { label: 'Verdict', value: candidate.verdict }].map(({ label, value }) => (
                <div key={label}><div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">{label}</div><div className="text-base font-mono font-semibold text-white leading-tight">{value}</div></div>
              ))}
            </div>
          </Card>

          <Card className="col-span-1 p-7 flex flex-col justify-between" style={{ minHeight: '296px' }}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10"><div className="w-2 h-2 rounded-full bg-white animate-pulse" /><span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Performance</span></div>
              <Icon icon="solar:chart-2-linear" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 flex flex-col justify-center mt-4">
              <AreaChart data={perfData} color="#ffffff" label={`perf-${candidate.id}`} />
              <div className="flex justify-between mt-3 text-[8px] font-mono text-neutral-600">{['0m','5m','10m','20m','30m','45m'].map((t) => <span key={t}>{t}</span>)}</div>
              <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /><span className="text-[9px] font-mono text-red-300">Dip at 08:30 — review pacing</span></div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 mt-4"><h3 className="text-base font-bold text-white tracking-tight">Performance Trend</h3><p className="text-xs text-neutral-400 font-mono mt-1">Peak: {candidate.score}% · Avg: {avg(perfData)}%</p></div>
          </Card>

          <Card className="col-span-1 p-7 flex flex-col justify-between" style={{ minHeight: '296px' }}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10"><div className="w-2 h-2 rounded-full bg-white animate-pulse" /><span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Confidence</span></div>
              <Icon icon="solar:shield-bold-duotone" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3 mt-4">
              <BarChartSVG data={confBars} />
              <div className="flex items-center gap-4 text-xs font-mono"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-white/20 inline-block" />High</span><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/60 inline-block" />Low (&lt;70%)</span></div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /><span className="text-[9px] font-mono text-red-300">Dip at 12:45 — hesitation</span></div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 mt-4"><h3 className="text-base font-bold text-white tracking-tight">Confidence Levels</h3><p className="text-xs text-neutral-400 font-mono mt-1">3 low-confidence segments · Avg: {avg(confBars)}%</p></div>
          </Card>

          <Card className="col-span-1 md:col-span-2 p-7 flex flex-col justify-between" style={{ minHeight: '296px' }}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10"><div className="w-2 h-2 rounded-full bg-white animate-pulse" /><span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Tone &amp; Posture</span></div>
              <Icon icon="solar:user-speak-bold-duotone" className="text-neutral-400 text-2xl group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3 mt-4">
              <DualLineChart dataA={toneData} dataB={postureData} />
              <div className="flex items-center gap-6 text-xs font-mono mt-1"><span className="flex items-center gap-1.5"><span className="w-5 h-[2px] bg-white inline-block rounded" />Tone</span><span className="flex items-center gap-1.5"><span className="w-5 h-[2px] bg-emerald-400 inline-block rounded" />Posture</span></div>
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-[9px] font-mono text-amber-300">Posture dip at 18:30</span></div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span className="text-[9px] font-mono text-emerald-300">Tone consistent throughout</span></div>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-4 mt-4 grid grid-cols-2 gap-4">
              <div><div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">Tone Average</div><div className="text-lg font-mono font-bold text-white">{avg(toneData)}%</div></div>
              <div><div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">Posture Average</div><div className="text-lg font-mono font-bold text-white">{avg(postureData)}%</div></div>
            </div>
          </Card>
        </div>

        {/* 3. Interview Assessment */}
        <Card className="p-7 md:p-10 fade-up" style={{ minHeight: '340px' }}>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"><Icon icon="solar:lightbulb-bold-duotone" className="text-white text-sm" /><span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Interview Assessment</span></div>
              <p className="text-xs text-neutral-400 font-mono pl-1">AI-generated coaching notes based on the session</p>
            </div>
            <Icon icon="solar:stars-minimalistic-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold"><span className="w-2 h-2 rounded-full bg-emerald-400" />What they did well</div>
              {candidate.pros.map((p, i) => (<div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"><Icon icon="solar:check-circle-bold" className="text-emerald-400 text-sm mt-0.5 flex-shrink-0" /><span className="text-xs text-neutral-200 leading-relaxed">{p}</span></div>))}
            </div>
            <div className="space-y-2">
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold"><span className="w-2 h-2 rounded-full bg-red-400" />Areas of concern</div>
              {candidate.cons.map((c, i) => (<div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-colors"><Icon icon="solar:close-circle-bold" className="text-red-400 text-sm mt-0.5 flex-shrink-0" /><span className="text-xs text-neutral-200 leading-relaxed">{c}</span></div>))}
            </div>
          </div>
        </Card>

        {/* 4. Candidate Profile */}
        <Card className="p-10 fade-up">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-2xl font-bold tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.06)]">{candidate.initials}</div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-1">{candidate.name}</h2>
                  <p className="text-base text-neutral-300 font-medium mb-2">{candidate.headline}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-neutral-500">
                    <span className="flex items-center gap-1"><Icon icon="solar:map-point-linear" className="text-xs" />{candidate.location}</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-1"><Icon icon="solar:letter-linear" className="text-xs" />{candidate.email}</span>
                  </div>
                </div>
              </div>
              <Badge color={verdictColor(candidate.verdict)}>{candidate.verdict}</Badge>
            </div>
          </div>
        </Card>

        {/* 5. About + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 fade-up">
          <Card className="lg:col-span-2 p-10 flex flex-col gap-6">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">About</div>
            <p className="text-base text-neutral-300 font-light leading-relaxed">{candidate.bio}</p>
          </Card>
          <Card className="lg:col-span-3 p-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Core Competency</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10"><span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" /><span className="text-[10px] font-mono text-white uppercase tracking-widest">AI Scored</span></div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={candidate.competencies} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.55)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }} />
                  <Tooltip content={<RadarTooltip />} />
                  <Radar name="Score" dataKey="score" stroke="#ffffff" strokeWidth={1.5} fill="rgba(255,255,255,0.08)" dot={false} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06]">
              {candidate.competencies.map((c) => (<div key={c.skill} className="flex items-center gap-2"><span className="text-xs font-mono text-neutral-500 uppercase tracking-wide">{c.skill}</span><span className="text-xs font-mono text-white font-semibold">{c.score}%</span></div>))}
            </div>
          </Card>
        </div>

        {/* 6. Questions Needing Improvement */}
        <Card className="p-7 md:p-10 fade-up" style={{ minHeight: weakQ.length > 0 ? `${Math.max(420, weakQ.length * 180)}px` : '200px' }}>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2 w-fit"><div className="w-2 h-2 rounded-full bg-red-400" /><span className="text-xs font-mono text-white uppercase tracking-widest font-semibold">Questions Needing Improvement</span></div>
              <p className="text-xs text-neutral-400 font-mono pl-1">{weakQ.length > 0 ? `${weakQ.length} question${weakQ.length > 1 ? 's' : ''} scored below threshold` : 'All questions answered above threshold!'}</p>
            </div>
            <Icon icon="solar:diploma-bold-duotone" className="text-neutral-400 text-3xl group-hover:text-white transition-colors" />
          </div>
          {weakQ.length === 0 ? (
            <div className="flex items-center gap-3 py-8 text-emerald-400"><Icon icon="solar:check-circle-bold" className="text-2xl" /><span className="text-sm font-mono">All answers scored above 92% — no weak spots detected</span></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {weakQ.map((q, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors flex flex-col gap-4">
                  <div className="flex items-start gap-3"><span className="text-[9px] font-mono px-2 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 mt-0.5 flex-shrink-0">Q{idx + 1}</span><p className="text-sm font-medium text-white leading-snug">{q.title}</p></div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono"><span className="text-neutral-500 uppercase tracking-wider">Score</span><span className={`font-semibold ${q.score < 70 ? 'text-red-400' : 'text-amber-400'}`}>{q.score}%</span></div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${q.score < 70 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-amber-600 to-amber-300'}`} style={{ width: `${q.score}%` }} /></div>
                  </div>
                  <div className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"><div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5 font-semibold">Their Answer</div><p className="text-sm text-neutral-300 font-light leading-relaxed">{q.feedback}</p></div>
                  <div className="px-3 py-2.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20">
                    <div className="flex items-center gap-1.5 mb-1.5"><Icon icon="solar:stars-minimalistic-bold-duotone" className="text-emerald-400 text-sm" /><span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">How to improve</span></div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{q.score < 80 ? 'Structure the answer with a concrete scenario first, then walk through reasoning step-by-step. Quantify outcomes where possible (e.g. latency reduced by X ms).' : 'Good foundation — add one more layer of depth by discussing edge cases or failure modes to push this above 92%.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="h-16" />
      </section>
    </div>
  );
}
