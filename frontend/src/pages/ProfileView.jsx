import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const profile = {
  name: 'Alex Morgan',
  initials: 'AM',
  headline: 'Final-year CSE Student & Aspiring Software Engineer',
  location: 'Bangalore, India',
  email: 'alex.morgan@example.com',
  bio: `I'm a final-year Computer Science student with a deep passion for distributed systems and backend engineering. I've spent the last two years working on open-source projects, competitive programming, and building production-grade side projects. Currently preparing for product engineering roles at top-tier tech companies, with a focus on systems design and high-performance APIs.`,
};

const competencies = [
  { skill: 'Communication', score: 85 },
  { skill: 'Technical Depth', score: 78 },
  { skill: 'Problem Solving', score: 90 },
  { skill: 'Confidence', score: 82 },
  { skill: 'Clarity', score: 88 },
];

const links = [
  { label: 'LinkedIn', icon: 'solar:linkedin-bold-duotone', href: '#' },
  { label: 'GitHub', icon: 'solar:code-square-bold-duotone', href: '#' },
  { label: 'Portfolio', icon: 'solar:global-bold-duotone', href: '#' },
];

// ─── Custom RadarChart Tooltip ────────────────────────────────────────────────
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

// ─── Section Card wrapper ─────────────────────────────────────────────────────
function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-[#050505] border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfileView({ onOpenNewInterview }) {
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 flex flex-col gap-10">

        {/* ── 1. Profile Header ────────────────────────────────────────────── */}
        <Card className="p-10 fade-up">
          {/* Decorative glow accent top-right */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-6 relative z-10">
            {/* ── Row 1: Avatar / Info + CTA ── */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Avatar + Info */}
              <div className="flex items-center gap-5">
                {/* Circular avatar */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-3xl font-bold tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                    {profile.initials}
                  </div>
                </div>

                <div>
                  {/* Name — matching Hi, {userName} weight/tracking */}
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                    {profile.name}
                  </h1>
                  <p className="text-base text-neutral-300 font-medium mb-2">{profile.headline}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:map-point-linear" className="text-xs" />
                      {profile.location}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:letter-linear" className="text-xs" />
                      {profile.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 shadow-[0_0_0px_rgba(255,255,255,0)] hover:shadow-[0_0_18px_rgba(255,255,255,0.06)] active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 font-mono tracking-wide uppercase text-[11px]"
              >
                <Icon icon="solar:pen-2-linear" className="text-sm" />
                Edit Profile
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── Row 2: Resume pill + social links ── */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Premium Resume pill */}
              <button className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 shadow-[0_0_0px_rgba(255,255,255,0)] hover:shadow-[0_0_18px_rgba(255,255,255,0.08)] cursor-pointer">
                {/* Icon badge */}
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/25 transition-all duration-300">
                  <Icon icon="solar:document-text-bold-duotone" className="text-sm text-white" />
                </div>
                <span className="text-[11px] font-mono text-neutral-300 group-hover:text-white transition-colors tracking-wide uppercase">Resume</span>
              </button>

              {/* Thin separator dot */}
              <span className="w-1 h-1 rounded-full bg-white/10" />

              {/* Social link chips */}
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-mono text-neutral-400 bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200 cursor-pointer tracking-wide uppercase"
                >
                  <Icon icon={link.icon} className="text-sm" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Card>

        {/* ── 2. About + Core Competency (side-by-side on lg) ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* About — 2 cols */}
          <Card className="lg:col-span-2 p-10 flex flex-col gap-6 fade-up">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">About</div>
            <p className="text-base text-neutral-300 font-light leading-relaxed">{profile.bio}</p>
          </Card>

          {/* Radar Chart — 3 cols */}
          <Card className="lg:col-span-3 p-10 flex flex-col gap-6 fade-up">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Core Competency</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">AI Scored</span>
              </div>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competencies} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="0"
                  />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{
                      fill: 'rgba(255,255,255,0.55)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 13,
                    }}
                  />
                  <Tooltip content={<RadarTooltip />} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    fill="rgba(255,255,255,0.08)"
                    dot={false}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06]">
              {competencies.map((c) => (
                <div key={c.skill} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wide">{c.skill}</span>
                  <span className="text-xs font-mono text-white font-semibold">{c.score}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>



      </div>
    </div>
  );
}
