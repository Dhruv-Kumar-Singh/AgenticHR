import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import Background from '../components/Background';

function Badge({ children, color = 'neutral' }) {
  const map = {
    neutral: 'bg-white/5 border-white/10 text-white',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
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

function ScoreRing({ score, size = 64 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray={`${progress} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

export default function ProfInterviewSessionPage({ session, onBack, onViewCandidate }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { root: null, rootMargin: '0px', threshold: 0.08 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!session) return null;
  const passRate = Math.round((session.clearedCandidates / session.totalCandidates) * 100);
  const sorted = [...session.candidates].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rankStyle = [
    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', icon: 'solar:medal-ribbons-star-bold-duotone', iconColor: 'text-amber-400' },
    { bg: 'bg-white/5', border: 'border-white/15', text: 'text-neutral-300', icon: 'solar:medal-star-bold-duotone', iconColor: 'text-neutral-400' },
    { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300', icon: 'solar:star-bold-duotone', iconColor: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen text-neutral-200 antialiased relative bg-black">
      <Background />
      <div className="relative z-10 pt-28 pb-10 px-6 md:px-10 border-b border-white/[0.05]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors mb-8 group cursor-pointer">
          <Icon icon="solar:arrow-left-linear" className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest">Back to Sessions</span>
        </button>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge color="emerald">{session.status}</Badge>
          <Badge color="neutral">{session.department}</Badge>
          <Badge color="neutral">{session.date}</Badge>
          <Badge color="neutral">{session.duration}</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2 leading-tight">{session.title}</h1>
        <p className="text-sm text-neutral-400 font-light">{session.role} · Criteria ≥ {session.criteriaScore}%</p>
      </div>

      <section className="relative z-10 py-10 px-6 md:px-10 space-y-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
          {[
            { label: 'Total Candidates', value: session.totalCandidates, icon: 'solar:users-group-two-rounded-linear', sub: 'Participated' },
            { label: 'Cleared Criteria', value: session.clearedCandidates, icon: 'solar:check-circle-bold-duotone', sub: `≥ ${session.criteriaScore}% threshold` },
            { label: 'Pass Rate', value: `${passRate}%`, icon: 'solar:chart-2-linear', sub: 'Of total candidates' },
            { label: 'Top Score', value: `${session.topScore}/100`, icon: 'solar:medal-ribbons-star-linear', sub: 'Highest individual score' },
          ].map((c, i) => (
            <div key={i} className="rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 p-6 flex flex-col justify-between gap-4 group relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{c.label}</span>
                <Icon icon={c.icon} className="text-neutral-600 text-base group-hover:text-neutral-400 transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="text-3xl font-mono font-bold text-white tracking-tight mb-1">{c.value}</div>
                <div className="text-[10px] font-mono text-neutral-500">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Top Rankers</h2>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              <span className="text-[9px] font-mono text-white uppercase tracking-widest">AI Ranked</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {top3.map((c, i) => {
              const rs = rankStyle[i];
              return (
                <div key={c.id} onClick={() => onViewCandidate && onViewCandidate(c, session)} className={`rounded-[2rem] ${rs.bg} border ${rs.border} p-7 relative overflow-hidden group hover:border-opacity-60 transition-all duration-500 cursor-pointer hover:-translate-y-1`}>
                  <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none group-hover:opacity-[0.12] transition-opacity" />
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className={`text-xs font-mono font-bold uppercase tracking-widest ${rs.text}`}>Rank {i + 1}</div>
                    <Icon icon={rs.icon} className={`text-2xl ${rs.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white text-lg font-bold">{c.initials}</div>
                      <div className="absolute -bottom-1 -right-1"><ScoreRing score={c.score} size={22} /></div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white tracking-tight">{c.name}</div>
                      <div className="text-xs text-neutral-400 font-mono">{c.headline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="text-3xl font-mono font-bold text-white">{c.score}</div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">/100</span>
                      <Badge color={verdictColor(c.verdict)}>{c.verdict}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                    <span>{c.location}</span>
                    <span className="group-hover:translate-x-1 transition-transform">VIEW →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fade-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">All Cleared Candidates</h2>
              <p className="text-sm text-neutral-400 font-light mt-1">{session.clearedCandidates} candidates cleared the {session.criteriaScore}% threshold</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10">
              <Icon icon="solar:filter-linear" className="text-neutral-500 text-sm" />
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Sorted by Score</span>
            </div>
          </div>
          <div className="rounded-3xl bg-[#050505] border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              {[['col-span-1','Rank'],['col-span-4','Candidate'],['col-span-2','Score'],['col-span-2','Verdict'],['col-span-2 hidden lg:block','Location'],['col-span-1','']].map(([cls,h],i)=>(
                <div key={i} className={`text-[9px] font-mono text-neutral-500 uppercase tracking-widest ${cls} ${i===2?'text-right':''}`}>{h}</div>
              ))}
            </div>
            {sorted.map((c, idx) => (
              <div key={c.id} onClick={() => onViewCandidate && onViewCandidate(c, session)} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.025] transition-colors cursor-pointer group items-center">
                <div className="col-span-1">
                  <span className={`text-sm font-mono font-bold ${idx===0?'text-amber-300':idx===1?'text-neutral-300':idx===2?'text-orange-300':'text-neutral-500'}`}>#{idx+1}</span>
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{c.initials}</div>
                  <div>
                    <div className="text-sm font-medium text-white">{c.name}</div>
                    <div className="text-[11px] text-neutral-500 font-mono">{c.headline}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-lg font-mono font-bold text-white">{c.score}</div>
                  <div className="text-[9px] font-mono text-neutral-600">/100</div>
                </div>
                <div className="col-span-2"><Badge color={verdictColor(c.verdict)}>{c.verdict}</Badge></div>
                <div className="col-span-2 hidden lg:block"><span className="text-xs font-mono text-neutral-500">{c.location}</span></div>
                <div className="col-span-1 flex justify-end"><Icon icon="solar:arrow-right-linear" className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-16" />
      </section>
    </div>
  );
}