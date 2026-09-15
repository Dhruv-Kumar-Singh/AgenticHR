import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import Background from '../components/Background';
import { previousInterviews } from '../data/interviewData';

export default function PremiumPlanPage({
  userName = 'Alex',
  onViewReport,
  onOpenNewInterview: _onOpenNewInterview,
  onSwitchToFree: _onSwitchToFree,
}) {
  const [topicInput, setTopicInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const greetingRef = useRef(null);
  const hooklineRef = useRef(null);
  const composerRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Soft entrance animation matching landing page hero
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      [greetingRef.current, hooklineRef.current, composerRef.current, scrollCueRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
    );
  }, []);

  // Global intersection observer for fade-up scroll reveal
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

  // Handle file picker selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
      }));
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (id) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen text-neutral-200 antialiased selection:bg-white/20 selection:text-white relative bg-black">
      <Background />

      {/* ============================================================ */}
      {/* 1. CENTERED HERO STATE (MATCHING FREE PLAN AESTHETIC) */}
      {/* ============================================================ */}
      <section className="h-screen min-h-[640px] flex flex-col items-center justify-center px-6 pt-24 pb-12 relative select-none">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">

          {/* Clean Plan Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Praxis Premium Workspace</span>
          </div>

          {/* Greeting: Hi, {userName} */}
          <h1
            ref={greetingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-3 opacity-0"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            Hi, {userName}
          </h1>

          {/* Short hookline */}
          <p
            ref={hooklineRef}
            className="text-base sm:text-lg text-neutral-400 font-light mb-8 max-w-xl leading-relaxed opacity-0"
          >
            What would you like to practice today?
          </p>

          {/* Prompt / Composer Bar */}
          <div
            ref={composerRef}
            className="w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 focus-within:border-white/25 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.12)] glass-panel opacity-0 text-left"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.md"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Attached file pills display */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 px-1">
                {attachedFiles.map((f) => (
                  <div
                    key={f.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-neutral-200"
                  >
                    <Icon icon="solar:document-text-bold-duotone" className="text-emerald-400 text-xs" />
                    <span className="font-mono text-[11px] max-w-[150px] truncate">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="text-neutral-500 hover:text-white transition-colors ml-1 cursor-pointer"
                    >
                      <Icon icon="solar:close-circle-bold" className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Textarea */}
            <textarea
              rows={2}
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Enter a topic or upload your syllabus to start practicing..."
              className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm sm:text-base font-normal outline-none resize-none px-2 py-1 leading-relaxed"
            />

            {/* Composer toolbar */}
            <div className="flex items-center justify-between pt-2 px-1 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-8 h-8 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  title="Attach syllabus or target rubric"
                >
                  <Icon icon="solar:add-linear" className="text-lg" />
                </button>
                <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                  {attachedFiles.length > 0 ? `${attachedFiles.length} file attached` : 'Attach syllabus or notes'}
                </span>
              </div>

              {/* Send / start session button */}
              <button
                type="button"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${topicInput.trim() || attachedFiles.length > 0
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-white/10 text-neutral-500 hover:text-neutral-400'
                  }`}
                title="Start session"
              >
                <Icon icon="solar:arrow-up-linear" className="text-base stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue indicator */}
        <div
          ref={scrollCueRef}
          onClick={() => {
            document.getElementById('previous-interviews-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer group opacity-0"
          title="View previous interviews"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to previous interviews</span>
          <Icon icon="solar:alt-arrow-down-linear" className="text-xs group-hover:translate-y-1 transition-transform" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PREVIOUS INTERVIEWS SECTION (ON HOME PREMIUM PAGE) */}
      {/* ============================================================ */}
      <section id="previous-interviews-section" className="relative z-10 py-24 md:py-32 bg-black border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section Header */}
          <div className="flex flex-col items-start mb-16 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Session History</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
              Previous Interviews
            </h2>
            <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              Review your recorded performance, AI scores, and detailed competency breakdowns.
            </p>
          </div>

          {/* Responsive Card Grid (matching Free Plan Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousInterviews.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewReport && onViewReport(item)}
                className="rounded-3xl border border-white/10 bg-[#050505] p-7 md:p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:-translate-y-1 fade-up shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between"
              >
                {/* Background grid accent on hover */}
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />

                <div>
                  {/* Top row: micro-label score badge + date */}
                  <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                        {item.badge}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>

                  {/* Interview title / topic */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors mb-2.5 relative z-10">
                    {item.title}
                  </h3>

                  {/* Role / company */}
                  <div className="text-xs font-mono text-neutral-400 mb-3 relative z-10">
                    {item.role} • {item.company}
                  </div>

                  {/* Synopsis / takeaway */}
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3 relative z-10">
                    {item.synopsis}
                  </p>
                </div>

                {/* Bottom row: duration and view link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                  <span>{item.duration}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                    VIEW DETAILS →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
