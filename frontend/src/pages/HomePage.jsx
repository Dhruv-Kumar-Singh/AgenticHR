import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import Background from '../components/Background';

export default function HomePage({ userName = 'Alex', onViewReport }) {
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
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => observer.observe(el));

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

  // Sample placeholder interviews matching landing page cards
  const previousInterviews = [
    {
      id: 'int-1',
      title: 'Distributed Systems: Raft Consensus & WAN Latency',
      role: 'Staff Distributed Systems Engineer',
      company: 'Google',
      date: 'Yesterday',
      duration: '45 mins',
      badge: 'CONFIDENCE 92%',
      type: 'System Design',
      score: 92,
      verdict: 'Strong Hire',
      synopsis: 'Evaluated Raft leader election failure modes, split-brain scenarios, and cross-region replication latency trade-offs.',
      breakdown: [
        { label: 'Technical Problem Solving', score: 94 },
        { label: 'System Architecture', score: 92 },
        { label: 'Code Quality & Hygiene', score: 90 },
      ],
      strengths: [
        'Precise invariants during Paxos vs Raft leader transitions',
        'Clean calculation of cross-oceanic P99 network boundaries',
      ],
      improvements: [
        'Explore split-brain handling during WAN fiber cuts in greater depth',
      ],
      questions: [
        { title: 'Design Chubby: A distributed lock service with leases', score: 93, feedback: 'Strong lease duration and state replication strategy.' },
        { title: 'Mitigating cascading failures in cross-region RPCs', score: 91, feedback: 'Effective use of circuit breakers and jittered deadlines.' },
      ],
    },
    {
      id: 'int-2',
      title: 'Concurrent Token Bucket & Distributed Throttling',
      role: 'Senior Full Stack Engineer',
      company: 'Stripe',
      date: 'Sep 10, 2026',
      duration: '40 mins',
      badge: 'CONFIDENCE 88%',
      type: 'Technical',
      score: 88,
      verdict: 'Hire',
      synopsis: 'Thread-safe sliding window rate limiting implementation with Redis backplane and exponential backoff retry jitter.',
      breakdown: [
        { label: 'Concurrency Control', score: 90 },
        { label: 'Distributed State', score: 88 },
        { label: 'Edge-case Resilience', score: 86 },
      ],
      strengths: [
        'Avoided atomic race conditions using Lua scripts inside Redis',
        'Clean mathematical derivation of token refresh intervals',
      ],
      improvements: [
        'Mention memory footprint for millions of dynamic tenant keys',
      ],
      questions: [
        { title: 'Implement a concurrent rate limiter in TypeScript', score: 89, feedback: 'Clean atomics, correct unit test fixtures.' },
      ],
    },
    {
      id: 'int-3',
      title: 'Engineering Leadership & Cross-Functional Deadlocks',
      role: 'Engineering Manager & Tech Lead',
      company: 'Meta',
      date: 'Sep 06, 2026',
      duration: '35 mins',
      badge: 'CONFIDENCE 95%',
      type: 'Behavioral',
      score: 95,
      verdict: 'Strong Hire',
      synopsis: 'Structured STAR-method delivery on resolving high-stakes architectural disputes and coaching underperforming engineers.',
      breakdown: [
        { label: 'STAR Delivery', score: 96 },
        { label: 'Conflict Resolution', score: 94 },
        { label: 'Business Impact', score: 95 },
      ],
      strengths: [
        'Clear quantification of engineering velocity and uptime metrics',
        'High emotional intelligence and empathy demonstrated',
      ],
      improvements: [
        'Keep introductory background concise to focus on decision tradeoffs',
      ],
      questions: [
        { title: 'Resolving deadlocks between product managers and staff engineers', score: 95, feedback: 'Excellent diplomatic framework and outcome.' },
      ],
    },
    {
      id: 'int-4',
      title: 'Streaming Inference Gateway & Token Backpressure',
      role: 'Platform Scalability Engineer',
      company: 'OpenAI',
      date: 'Aug 28, 2026',
      duration: '50 mins',
      badge: 'CONFIDENCE 91%',
      type: 'System Design',
      score: 91,
      verdict: 'Strong Hire',
      synopsis: 'Architected multi-tenant isolation layer with gRPC multiplexing sustaining 1M+ req/sec during peak spikes.',
      breakdown: [
        { label: 'Gateway Architecture', score: 92 },
        { label: 'Backpressure Control', score: 90 },
        { label: 'SLA Reliability', score: 91 },
      ],
      strengths: [
        'Zero-downtime rolling upgrades and canary deployment strategies',
        'Throttling with fair-share deficit round robin',
      ],
      improvements: [
        'Review connection pooling limits when downstream pods scale rapidly',
      ],
      questions: [
        { title: 'Real-time WebSocket and HTTP/2 stream multiplexing', score: 91, feedback: 'Thorough flow-control mechanism.' },
      ],
    },
    {
      id: 'int-5',
      title: 'Low-Level GPU Memory Management & CUDA Kernels',
      role: 'AI Systems & Infra Engineer',
      company: 'Anthropic',
      date: 'Aug 22, 2026',
      duration: '48 mins',
      badge: 'CONFIDENCE 84%',
      type: 'Technical',
      score: 84,
      verdict: 'Lean Hire',
      synopsis: 'Paged KV-cache eviction policies and collective communication primitives (Ring All-Reduce) for multi-node LLM training.',
      breakdown: [
        { label: 'Low-Level Systems', score: 86 },
        { label: 'GPU Memory Mechanics', score: 82 },
        { label: 'Algorithmic Speed', score: 84 },
      ],
      strengths: [
        'Deep understanding of Megatron-LM tensor and pipeline parallelism',
      ],
      improvements: [
        'Optimize memory bandwidth calculations for newer Blackwell architecture',
      ],
      questions: [
        { title: 'Simulating Ring All-Reduce with non-blocking buffers', score: 85, feedback: 'Sound logic with minimal pipeline bubbles.' },
      ],
    },
    {
      id: 'int-6',
      title: 'Payment Idempotency & Two-Phase Transaction Bounds',
      role: 'Staff Infrastructure Engineer',
      company: 'Stripe',
      date: 'Aug 15, 2026',
      duration: '42 mins',
      badge: 'CONFIDENCE 94%',
      type: 'Technical',
      score: 94,
      verdict: 'Strong Hire',
      synopsis: 'Zero-data-loss charging pipelines, idempotency keys, and webhook replay survivability under distributed network partitions.',
      breakdown: [
        { label: 'Transactional Consistency', score: 95 },
        { label: 'Fault Tolerance', score: 93 },
        { label: 'Database Schema', score: 94 },
      ],
      strengths: [
        'Flawless transactional isolation levels and locking strategy',
      ],
      improvements: [
        'Address long-term cold-storage archiving for audit logs',
      ],
      questions: [
        { title: 'Design an idempotent payment processing endpoint', score: 95, feedback: 'Production-ready architecture.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-neutral-200 antialiased selection:bg-white/20 selection:text-white relative bg-black">
      {/* Background texture matching landing page */}
      <Background />

      {/* ============================================================ */}
      {/* 1. CENTERED HERO STATE (INITIAL VIEWPORT — 100VH) */}
      {/* ============================================================ */}
      <section className="h-screen min-h-[640px] flex flex-col items-center justify-center px-6 pt-24 pb-12 relative select-none">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Greeting: Hi, {userName} — large, font-medium, matching landing hero headline */}
          <h1
            ref={greetingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-3 opacity-0"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            Hi, {userName}
          </h1>

          {/* Short hookline beneath greeting in muted text-neutral-400 style */}
          <p
            ref={hooklineRef}
            className="text-base sm:text-lg text-neutral-400 font-light mb-8 max-w-xl leading-relaxed opacity-0"
          >
            What would you like to practice today?
          </p>

          {/* Prompt / Composer Bar: wide, pill or rounded-2xl glass-panel treatment */}
          <div
            ref={composerRef}
            className="w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 focus-within:border-white/25 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.12)] glass-panel opacity-0 text-left"
          >
            {/* Hidden file input */}
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

            {/* Textarea for typing topic or instructions */}
            <textarea
              rows={2}
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Enter a topic or upload your syllabus to start practicing..."
              className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm sm:text-base font-normal outline-none resize-none px-2 py-1 leading-relaxed"
            />

            {/* Composer bottom toolbar: '+' attach button + send action */}
            <div className="flex items-center justify-between pt-2 px-1 border-t border-white/[0.04]">
              {/* '+' button on the left for attaching documents */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-8 h-8 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  title="Attach syllabus, notes, or resume (PDF, DOC, Images)"
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  topicInput.trim() || attachedFiles.length > 0
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

        {/* Muted scroll indicator hinting at Previous Interviews below the fold */}
        <div
          ref={scrollCueRef}
          onClick={() => {
            document.getElementById('previous-interviews')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer group opacity-0"
          title="View previous interviews"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to previous interviews</span>
          <Icon icon="solar:alt-arrow-down-linear" className="text-xs group-hover:translate-y-1 transition-transform" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SCROLL-REVEALED SECTION — PREVIOUS INTERVIEWS */}
      {/* ============================================================ */}
      <section id="previous-interviews" className="relative z-10 py-24 md:py-32 bg-black border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header — matching 'Your Interview Dashboard' style */}
          <div className="flex flex-col items-start mb-16 fade-up">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
              Previous Interviews
            </h2>
            <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              Review your recorded performance, AI scores, and detailed competency breakdowns.
            </p>
          </div>

          {/* Responsive Card Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) */}
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

                  {/* Synopsis / takeaway */}
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3 relative z-10">
                    {item.synopsis}
                  </p>
                </div>

                {/* Bottom row: duration and view link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                  <span>{item.duration}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
