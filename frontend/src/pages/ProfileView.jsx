import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { previousInterviews, prebuiltInterviewCards } from '../data/interviewData';

// ─── Mock Profile Data ────────────────────────────────────────────────────────
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
export default function ProfileView({
  userName: _userName = 'Alex',
  currentPlan = 'free',
  onViewReport,
  onOpenNewInterview: _onOpenNewInterview,
  onGoToPremium,
}) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simToastMessage, setSimToastMessage] = useState(null);

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
  }, [selectedDeck]);

  const handleSubscribeClick = () => {
    setShowSubscriptionModal(true);
  };

  const handleConfirmSubscription = () => {
    setShowSubscriptionModal(false);
    setSubscribedToast(true);
    setTimeout(() => {
      setSubscribedToast(false);
      if (onGoToPremium) onGoToPremium();
    }, 1500);
  };

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
    setSelectedScenario(deck.scenarios[0] || null);

    // Smooth scroll down to pre-built decks section
    setTimeout(() => {
      document.getElementById('prebuilt-decks-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleBackToAllDecks = () => {
    setSelectedDeck(null);
    setSelectedScenario(null);
  };

  const handleStartInterviewClick = (e) => {
    e.preventDefault();
    // Non-operational as instructed: "start interview button should not work now"
    setSimToastMessage(`Selected "${selectedScenario?.title}". Simulation primed — Session launch paused in preview.`);
    setTimeout(() => setSimToastMessage(null), 4000);
  };

  const isPremium = currentPlan === 'premium';

  return (
    <div className="min-h-screen text-neutral-200 antialiased bg-black selection:bg-white/20 selection:text-white">
      {/* Subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.018] rounded-full blur-[120px]" />
      </div>

      {/* Simulation Feedback Toast */}
      {simToastMessage && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-neutral-900/95 border border-white/20 text-white shadow-[0_0_35px_rgba(255,255,255,0.15)] backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Icon icon="solar:info-circle-bold" className="text-base" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white font-mono tracking-wide uppercase">Simulation Notice</p>
              <p className="text-xs text-neutral-300">{simToastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Toast Notification (for free plan users upgrading) */}
      {subscribedToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-neutral-900/95 border border-white/20 text-white shadow-[0_0_35px_rgba(255,255,255,0.15)] backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Icon icon="solar:check-circle-bold" className="text-base" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white font-mono tracking-wide uppercase">Praxis Pro Activated</p>
              <p className="text-xs text-neutral-300">All pre-built interview cards unlocked!</p>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal (only active if free plan user opens it) */}
      {showSubscriptionModal && !isPremium && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090909] border border-white/20 p-8 sm:p-10 shadow-[0_0_60px_rgba(255,255,255,0.1)] overflow-hidden">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Praxis Pass</span>
                </div>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Icon icon="solar:close-circle-linear" className="text-lg" />
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  Unlock Premium Interview Cards
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Gain unlimited access to 250+ role-tailored interview simulation cards, live AI cross-examination, and FAANG rubric benchmarks.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-white font-semibold uppercase tracking-wider">Praxis Pro Annual</div>
                  <div className="text-xs text-neutral-400">Billed annually • 7-day risk-free trial</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-white">$19</span>
                  <span className="text-xs text-neutral-400 font-mono">/mo</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmSubscription}
                  className="w-full py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icon icon="solar:shield-check-bold" className="text-sm" />
                  <span>Start 7-Day Free Trial</span>
                </button>
                <p className="text-[11px] text-center font-mono text-neutral-500">
                  Secured with 256-bit encryption. Cancel anytime with 1-click.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 flex flex-col gap-12">

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
                  <div className="w-28 h-28 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white text-3xl font-bold tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.06)] relative">
                    {profile.initials}
                    {/* Golden crown symbol on avatar if on Premium */}
                    {isPremium && (
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#181308] border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                        <Icon icon="solar:crown-star-bold" className="text-sm" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Premium Member Badge with Golden Crown Symbol */}
                  {isPremium && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      <Icon icon="solar:crown-star-bold" className="text-amber-400 text-xs" />
                      <span>Praxis Premium VIP</span>
                    </div>
                  )}

                  {/* Name */}
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2 flex items-center gap-2">
                    <span>{profile.name}</span>
                    {isPremium && (
                      <Icon icon="solar:crown-star-bold" className="text-amber-400 text-xl" title="Premium Subscriber" />
                    )}
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
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0 font-mono tracking-wide uppercase text-[11px]"
              >
                <Icon icon="solar:pen-2-linear" className="text-sm" />
                Edit Profile
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── Row 2: Resume pill + social links ── */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/25 transition-all duration-300">
                  <Icon icon="solar:document-text-bold-duotone" className="text-sm text-white" />
                </div>
                <span className="text-[11px] font-mono text-neutral-300 group-hover:text-white transition-colors tracking-wide uppercase">Resume</span>
              </button>

              <span className="w-1 h-1 rounded-full bg-white/10" />

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
          {/* About */}
          <Card className="lg:col-span-2 p-10 flex flex-col gap-6 fade-up">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">About</div>
            <p className="text-base text-neutral-300 font-light leading-relaxed">{profile.bio}</p>
          </Card>

          {/* Radar Chart */}
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
                  <PolarGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="0" />
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

        {/* ── 3. Previous Interviews on Profile Page (with Golden Crown Symbol for Premium) ── */}
        <div className="flex flex-col gap-6 fade-up">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Interview Records</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Previous Interviews
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              {previousInterviews.length} Completed Sessions
            </span>
          </div>

          {/* Grid of previous interviews with Golden Crown symbol on Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousInterviews.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewReport && onViewReport(item)}
                className="rounded-3xl border border-white/10 bg-[#050505] p-7 md:p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />

                <div>
                  {/* Top row: micro-label badge + Golden Crown Symbol if on Premium */}
                  <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                          {item.badge}
                        </span>
                      </div>

                      {/* Golden Crown Symbol on previous interviews for Premium users */}
                      {isPremium && (
                        <div
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300"
                          title="Verified Premium Simulation"
                        >
                          <Icon icon="solar:crown-star-bold" className="text-xs text-amber-400" />
                          <span className="text-[9px] font-mono font-semibold uppercase tracking-wider">VIP</span>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors mb-2 relative z-10">
                    {item.title}
                  </h3>

                  {/* Role & Company */}
                  <div className="text-xs font-mono text-neutral-400 mb-3 relative z-10">
                    {item.role} • {item.company}
                  </div>

                  {/* Synopsis */}
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3 relative z-10">
                    {item.synopsis}
                  </p>
                </div>

                {/* Bottom row: duration and view link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                  <span>{item.duration}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                    VIEW REPORT →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Pre-Built Interview Decks Section (Transferred into Profile!) ── */}
        <div id="prebuilt-decks-section" className="flex flex-col gap-8 pt-8 border-t border-white/[0.06] fade-up">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Interactive Deck Library</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Pre-Built Interview Decks
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl font-light leading-relaxed mt-1">
                Select any interview card to open its calibrated simulation scenarios, question rubrics, and examiner briefs.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500 shrink-0">
              Total Decks: <span className="text-white font-semibold">{prebuiltInterviewCards.length}</span>
            </div>
          </div>

          {/* ── Decks Grid (When no deck is selected) ── */}
          {!selectedDeck && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prebuiltInterviewCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleDeckClick(card)}
                  className="rounded-3xl border border-white/10 hover:border-white/20 bg-[#050505] p-7 md:p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.09] transition-opacity" />

                  <div>
                    {/* Top row: badge + company */}
                    <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                          {card.badge}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        {card.company}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors mb-2.5 relative z-10">
                      {card.title}
                    </h3>

                    {/* Role */}
                    <div className="text-xs font-mono text-neutral-400 mb-3 relative z-10">
                      {card.role}
                    </div>

                    {/* Synopsis */}
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3 relative z-10">
                      {card.synopsis}
                    </p>
                  </div>

                  {/* Bottom row: scenario count and action link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:folder-with-files-bold-duotone" className="text-sm text-neutral-400" />
                      {card.scenarios.length} Scenarios Included
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold text-white">
                      OPEN SCENARIOS →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Expanded Scenarios View (When a deck is selected) ── */}
          {selectedDeck && (
            <div className="flex flex-col gap-8">
              {/* Selected Deck Details Card */}
              <div className="p-8 rounded-3xl bg-[#050505] border border-white/10 relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between relative z-10 mb-6">
                  <button
                    onClick={handleBackToAllDecks}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                  >
                    <Icon icon="solar:arrow-left-linear" className="text-sm" />
                    <span>Back to All Decks</span>
                  </button>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>{selectedDeck.scenarios.length} Scenarios Ready</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="text-white font-semibold">{selectedDeck.company}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>{selectedDeck.role}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>{selectedDeck.duration}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    {selectedDeck.title}
                  </h2>
                  <p className="text-sm text-neutral-300 font-light max-w-3xl leading-relaxed">
                    {selectedDeck.synopsis}
                  </p>
                </div>
              </div>

              {/* Scenario Boxes Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:widget-2-bold-duotone" className="text-white text-base" />
                    <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-300 font-semibold">
                      Select a Scenario Box Below
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    Click any box to inspect & reveal simulation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {selectedDeck.scenarios.map((sc) => {
                    const isSelected = selectedScenario?.id === sc.id;
                    return (
                      <div
                        key={sc.id}
                        onClick={() => setSelectedScenario(sc)}
                        className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group ${isSelected
                            ? 'bg-[#0d0d0d] border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.08)] -translate-y-1'
                            : 'bg-[#060606] border border-white/10 hover:border-white/20 hover:bg-[#0a0a0a]'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                              {sc.index}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isSelected
                                ? 'bg-white/15 border-white/30 text-white font-semibold'
                                : 'bg-white/5 border-white/10 text-neutral-400'
                              }`}>
                              {sc.difficulty}
                            </span>
                          </div>

                          <h4 className={`text-sm sm:text-base font-semibold leading-snug mb-2.5 transition-colors ${isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                            }`}>
                            {sc.title}
                          </h4>

                          <p className="text-xs text-neutral-400 font-light line-clamp-3 mb-4 leading-relaxed">
                            {sc.challenge}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <span className="text-neutral-500 flex items-center gap-1">
                            <Icon icon="solar:clock-circle-linear" className="text-xs" />
                            {sc.duration}
                          </span>
                          <span className={`flex items-center gap-1 font-semibold ${isSelected ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                            }`}>
                            {isSelected ? 'SELECTED ✓' : 'SELECT →'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Focused Scenario Briefing & Non-Operational Start Interview Button */}
              {selectedScenario && (
                <div className="rounded-3xl p-8 sm:p-10 bg-[#050505] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  <div className="flex flex-col gap-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-widest">
                            Active Scenario Simulation
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span className="text-xs font-mono text-neutral-400">{selectedScenario.difficulty}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                          {selectedScenario.title}
                        </h3>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        <div className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center gap-1.5">
                          <Icon icon="solar:user-speak-bold-duotone" className="text-base text-white" />
                          <span>AI Examiner Calibrated</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        Challenge Prompt & Architectural Boundary
                      </div>
                      <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-neutral-200 text-sm sm:text-base leading-relaxed font-light">
                        {selectedScenario.challenge}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Icon icon="solar:user-id-bold-duotone" className="text-neutral-300 text-sm" />
                          Assigned Examiner Persona
                        </span>
                        <p className="text-sm font-semibold text-white">
                          {selectedScenario.interviewer}
                        </p>
                        <p className="text-xs text-neutral-400 font-light">
                          Adaptive counter-questioning enabled. Examiner will probe on boundary failures and scalability limits.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Icon icon="solar:checklist-minimalistic-bold-duotone" className="text-neutral-300 text-sm" />
                          Key Evaluation Rubrics
                        </span>
                        <ul className="flex flex-col gap-1.5 text-xs text-neutral-300 font-light">
                          {selectedScenario.rubric.map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-neutral-400 font-mono">▸</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span className="text-xs font-mono text-neutral-400">
                          Audio, Video & AI Examiner ready for{' '}
                          <span className="text-white font-medium">{selectedScenario.index}</span>
                        </span>
                      </div>

                      {/* Start Interview Button (Intentionally non-operational per user instructions) */}
                      <button
                        type="button"
                        onClick={handleStartInterviewClick}
                        className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer shrink-0"
                        title="Start Interview Simulation"
                      >
                        <Icon icon="solar:play-circle-bold" className="text-xl text-black" />
                        <span>Start Interview</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── 5. Golden Premium Upsell Section (FREE PLAN ONLY) ── */}
        {!isPremium && (
          <div
            className="relative rounded-3xl overflow-hidden fade-up"
            style={{
              background: 'linear-gradient(135deg, #0d0900 0%, #120c01 40%, #0a0700 100%)',
              border: '1px solid rgba(217,163,54,0.25)',
              boxShadow: '0 0 60px rgba(217,163,54,0.08), 0 4px 40px rgba(0,0,0,0.7)',
            }}
          >
            {/* Ambient golden radial glows */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(217,163,54,0.12) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-12 flex flex-col gap-10">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex flex-col gap-4 max-w-2xl">
                  {/* Golden badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
                    style={{ background: 'rgba(217,163,54,0.12)', border: '1px solid rgba(217,163,54,0.35)' }}>
                    <Icon icon="solar:crown-star-bold" className="text-xs" style={{ color: '#d9a336' }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold"
                      style={{ color: '#d9a336' }}>Praxis Premium · Exclusive Access</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
                    style={{ color: '#f5e6b8', textShadow: '0 0 40px rgba(217,163,54,0.3)' }}>
                    Unlock 250+ Pre-Built<br />
                    <span style={{ color: '#d9a336' }}>Elite Interview Decks</span>
                  </h2>

                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(245,220,150,0.65)' }}>
                    Gain exclusive access to role-calibrated simulation cards curated from real FAANG interview loops —
                    complete with AI cross-examination, live competency scoring, and examiner rubric breakdowns trusted
                    by engineers landing offers at Google, Meta, Stripe, and OpenAI.
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                  <div className="flex flex-col items-start md:items-end gap-0.5">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold font-mono" style={{ color: '#d9a336' }}>$19</span>
                      <span className="text-sm font-mono mb-1.5" style={{ color: 'rgba(217,163,54,0.6)' }}>/mo</span>
                    </div>
                    <span className="text-[11px] font-mono" style={{ color: 'rgba(245,220,150,0.45)' }}>
                      Billed annually · 7-day free trial
                    </span>
                  </div>

                  <button
                    onClick={handleSubscribeClick}
                    className="group relative px-8 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #d9a336 0%, #f5c842 50%, #d9a336 100%)',
                      color: '#0d0700',
                      boxShadow: '0 0 30px rgba(217,163,54,0.4), 0 4px 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon icon="solar:crown-star-bold" className="text-sm" />
                      Unlock Premium Access
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(135deg, #f5c842 0%, #ffd966 50%, #f5c842 100%)' }} />
                  </button>
                </div>
              </div>

              {/* Sample locked deck preview cards */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:lock-keyhole-bold-duotone" className="text-sm" style={{ color: '#d9a336' }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest font-semibold"
                    style={{ color: 'rgba(217,163,54,0.7)' }}>
                    Sample Premium Decks — Locked Until Subscribed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Staff Systems Design: Global CDN & Edge Cache Invalidation',
                      role: 'Staff Engineer · Google L7',
                      scenarios: 6,
                      badge: 'SYSTEM DESIGN',
                    },
                    {
                      title: 'Distributed Ledger & Financial Transaction Engine',
                      role: 'Senior Backend · Stripe',
                      scenarios: 5,
                      badge: 'TECHNICAL DEPTH',
                    },
                    {
                      title: 'Executive Behavioral & STAR Conflict Resolution Decks',
                      role: 'Engineering Lead · FAANG Director',
                      scenarios: 8,
                      badge: 'BEHAVIORAL',
                    },
                  ].map((deck) => (
                    <div
                      key={deck.title}
                      className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden select-none"
                      style={{
                        background: 'rgba(217,163,54,0.04)',
                        border: '1px solid rgba(217,163,54,0.15)',
                      }}
                    >
                      {/* Blurred overlay to indicate locked state */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
                        style={{ backdropFilter: 'blur(3px)', background: 'rgba(13,9,0,0.45)' }}>
                        <div className="flex flex-col items-center gap-1.5">
                          <Icon icon="solar:lock-keyhole-bold" className="text-xl" style={{ color: '#d9a336' }} />
                          <span className="text-[10px] font-mono uppercase tracking-widest"
                            style={{ color: 'rgba(217,163,54,0.7)' }}>Premium Only</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded w-fit"
                        style={{ background: 'rgba(217,163,54,0.1)', border: '1px solid rgba(217,163,54,0.2)' }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: '#d9a336' }} />
                        <span className="text-[9px] font-mono uppercase tracking-widest font-semibold"
                          style={{ color: '#d9a336' }}>{deck.badge}</span>
                      </div>

                      <p className="text-sm font-semibold leading-snug" style={{ color: '#f5e6b8' }}>
                        {deck.title}
                      </p>
                      <div className="text-[11px] font-mono" style={{ color: 'rgba(245,220,150,0.5)' }}>
                        {deck.role}
                      </div>
                      <div className="pt-2 border-t flex items-center gap-1.5 text-[11px] font-mono"
                        style={{ borderColor: 'rgba(217,163,54,0.1)', color: 'rgba(217,163,54,0.55)' }}>
                        <Icon icon="solar:folder-with-files-bold-duotone" className="text-xs" />
                        {deck.scenarios} Scenarios Included
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
                style={{ borderTop: '1px solid rgba(217,163,54,0.12)' }}>
                {[
                  { icon: 'solar:layers-bold-duotone', label: '250+ Role Decks', sub: 'FAANG-verified' },
                  { icon: 'solar:chart-square-bold-duotone', label: 'Live AI Scoring', sub: 'Real-time rubric' },
                  { icon: 'solar:user-speak-bold-duotone', label: 'Cross-Examination', sub: 'Dynamic follow-ups' },
                  { icon: 'solar:shield-check-bold-duotone', label: '7-Day Free Trial', sub: '100% risk-free' },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-start gap-1.5">
                    <Icon icon={b.icon} className="text-lg" style={{ color: '#d9a336' }} />
                    <span className="text-xs font-semibold" style={{ color: '#f5e6b8' }}>{b.label}</span>
                    <span className="text-[11px] font-mono" style={{ color: 'rgba(217,163,54,0.5)' }}>{b.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
