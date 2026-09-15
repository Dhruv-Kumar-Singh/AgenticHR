import { useEffect } from 'react';
import { Icon } from '@iconify/react';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const company = {
  name: 'TechCorp Solutions',
  initials: 'TC',
  industry: 'B2B SaaS · Engineering',
  location: 'Bangalore, India',
  email: 'hiring@techcorp.io',
  website: 'techcorp.io',
  bio: `TechCorp Solutions is a fast-growing B2B SaaS company building the next generation of developer tooling and cloud infrastructure products. Founded in 2018, we've grown to 350+ engineers across 4 global offices. We believe great hiring is the foundation of great products — which is why we use AI-powered interviews to surface the best talent objectively and efficiently.`,
};

const sessions = [
  { id: 's1', title: 'Senior Software Engineer — Backend Systems', dept: 'Engineering', date: 'Sep 12, 2026', candidates: 38, cleared: 14, status: 'Completed' },
  { id: 's2', title: 'Product Manager — Growth & Monetisation', dept: 'Product', date: 'Sep 08, 2026', candidates: 22, cleared: 8, status: 'Completed' },
  { id: 's3', title: 'UX Designer — Mobile & Web Platforms', dept: 'Design', date: 'Sep 03, 2026', candidates: 15, cleared: 5, status: 'Completed' },
  { id: 's4', title: 'Data Scientist — ML & Predictive Analytics', dept: 'Data', date: 'Oct 10, 2026', candidates: 0, cleared: 0, status: 'Upcoming' },
  { id: 's5', title: 'DevOps Engineer — Cloud & Infrastructure', dept: 'Infrastructure', date: 'Oct 05, 2026', candidates: 12, cleared: 0, status: 'Active' },
];

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function statusDot(s) {
  if (s === 'Active') return 'bg-blue-400 animate-pulse';
  if (s === 'Upcoming') return 'bg-amber-400';
  return 'bg-emerald-400';
}
function statusBadge(s) {
  if (s === 'Active') return 'bg-blue-500/10 border-blue-500/30 text-blue-300';
  if (s === 'Upcoming') return 'bg-amber-500/10 border-amber-500/30 text-amber-300';
  return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
}

export default function ProfProfileView() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { root: null, rootMargin: '0px', threshold: 0.08 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = sessions.filter((s) => s.status === 'Active' || s.status === 'Upcoming');
  const completed = sessions.filter((s) => s.status === 'Completed');

  return (
    <div className="min-h-screen text-neutral-200 antialiased bg-black selection:bg-white/20 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.018] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 flex flex-col gap-10">

        {/* 1. Company Profile */}
        <Card className="p-10 fade-up">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-28 h-28 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-3xl font-bold tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                  {company.initials}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">{company.name}</h1>
                  <p className="text-base text-neutral-300 font-medium mb-2">{company.industry}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:map-point-linear" className="text-xs" />
                      {company.location}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:letter-linear" className="text-xs" />
                      {company.email}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:global-linear" className="text-xs" />
                      {company.website}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2.5 rounded-full text-[11px] font-mono font-semibold text-neutral-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 uppercase tracking-wide">
                <Icon icon="solar:pen-2-linear" className="text-sm" />
                Edit Profile
              </button>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: 'Professional Plan', icon: 'solar:buildings-3-linear' },
                { label: 'Member since 2024', icon: 'solar:calendar-linear' },
                { label: '26 Sessions Hosted', icon: 'solar:play-circle-linear' },
                { label: '612 Candidates', icon: 'solar:users-group-two-rounded-linear' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-mono text-neutral-400 bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200 tracking-wide uppercase">
                  <Icon icon={item.icon} className="text-sm" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 2. About */}
        <Card className="p-10 fade-up">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-5">About</div>
          <p className="text-base text-neutral-300 font-light leading-relaxed">{company.bio}</p>
        </Card>

        {/* 3. Active & Upcoming Sessions */}
        <Card className="p-10 fade-up">
          <div className="flex items-center justify-between mb-7">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Active &amp; Upcoming Interviews</div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
              <span className="text-[10px] font-mono text-white uppercase tracking-widest">{active.length} Sessions</span>
            </div>
          </div>

          {active.length === 0 ? (
            <p className="text-sm text-neutral-500 font-mono py-4">No active or upcoming sessions.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {active.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusDot(s.status)}`} />
                    <div>
                      <div className="text-sm font-medium text-white">{s.title}</div>
                      <div className="text-[11px] font-mono text-neutral-500">{s.dept} · {s.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {s.candidates > 0 && <span className="text-[11px] font-mono text-neutral-400">{s.candidates} candidates</span>}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border uppercase tracking-widest ${statusBadge(s.status)}`}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-7" />
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Completed Sessions</div>
                <span className="text-[10px] font-mono text-neutral-600">{completed.length} sessions</span>
              </div>
              <div className="flex flex-col gap-3">
                {completed.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200 opacity-70 hover:opacity-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusDot(s.status)}`} />
                      <div>
                        <div className="text-sm font-medium text-white">{s.title}</div>
                        <div className="text-[11px] font-mono text-neutral-500">{s.dept} · {s.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] font-mono text-neutral-400">{s.cleared}/{s.candidates} cleared</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border uppercase tracking-widest ${statusBadge(s.status)}`}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

      </div>
    </div>
  );
}
