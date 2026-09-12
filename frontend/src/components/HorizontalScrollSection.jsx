import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const schemaCards = [
  {
    num: '01',
    bg: 'bg-grid opacity-[0.07]',
    title: 'Deterministic Rendering',
    desc: 'Frame-perfect fidelity mapped directly to execution cycles. Every pixel shift is calculated and predictable.',
    stat: { label: 'Shader Config', value: 'STRICT_MODE' },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
    schema: 'cross',
  },
  {
    num: '02',
    bg: 'dot-grid opacity-[0.12]',
    title: 'Input Arbitration',
    desc: 'Coalescing multi-modal inputs into a single authoritative event stream with zero-delay processing.',
    stat: { label: 'Polling Rate', value: '1000 HZ' },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M14 4.1 12 6" /><path d="m5.1 8-2.9-.8" /><path d="m6 12-1.9 2" />
        <path d="M7.2 2.2 8 5.1" />
        <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
      </svg>
    ),
    schema: 'lines',
  },
  {
    num: '03',
    bg: null,
    title: 'Mesh Synchronization',
    desc: 'CRDT-based state reconciliation ensuring all connected endpoints reflect truth instantaneously.',
    stat: { label: 'Topology', value: 'PEER_2_PEER' },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />
      </svg>
    ),
    schema: 'dual-ring',
  },
  {
    num: '04',
    bg: 'bg-grid opacity-[0.07]',
    title: 'Industry Templates',
    desc: 'Pre-built question sets modeled on real interviews at top companies, sorted by role and difficulty.',
    stat: { label: 'Templates', value: '200+' },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
    schema: 'grid',
  },
  {
    num: '05',
    bg: null,
    title: 'Global Propagation',
    desc: 'Instantaneous state broadcast to edge nodes worldwide using hyper-optimized binary protocols.',
    stat: { label: 'Target Latency', value: '~12 MS' },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    schema: 'concentric',
  },
];

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#000] relative" id="analysis">
      <div className="flex overflow-hidden h-screen items-center bg-[#000] relative">
        <div className="absolute top-12 left-6 md:left-12 z-20 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/20" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">Engine Mechanics</span>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 z-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-white w-0" id="h-scroll-progress" style={{ transition: 'none' }} />
        </div>

        <div
          ref={trackRef}
          id="h-scroll-track"
          className="flex will-change-transform pr-[20vw] pl-[10vw] gap-x-8 items-center"
          style={{ width: 'max-content' }}
        >
          {schemaCards.map((card) => (
            <div
              key={card.num}
              className="schema-card schema-card-enhanced w-[85vw] md:w-[450px] aspect-square rounded-[2rem] p-10 flex flex-col relative overflow-hidden flex-shrink-0 group transition-all duration-500 shadow-2xl"
            >
              {card.bg && <div className={`absolute inset-0 ${card.bg} pointer-events-none`} />}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

              {/* Schema decorations */}
              <SchemaDecoration type={card.schema} />

              <span className="text-6xl font-light text-white/[0.05] absolute top-6 right-8 tracking-tighter font-mono group-hover:text-white/[0.08] transition-colors">
                {card.num}
              </span>

              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-auto mt-2 relative z-10">
                {card.icon}
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{card.title}</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">{card.desc}</p>
                <div className="p-4 bg-black border border-white/[0.08] rounded-lg flex justify-between items-center group-hover:border-white/15 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{card.stat.label}</span>
                  <span className="text-[10px] font-mono text-white">{card.stat.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchemaDecoration({ type }) {
  if (type === 'cross') return (
    <div className="schema-layer opacity-90">
      <div className="schema-vignette" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full border border-white/[0.08] schema-ring-spin" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] rounded-2xl border border-white/[0.14] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center schema-box-spin">
        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.75)] schema-pulse-dot" />
      </div>
      <div className="absolute top-1/2 left-[22%] w-[28%] h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 schema-line-h-center" />
      <div className="absolute top-1/2 right-[22%] w-[28%] h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 schema-line-h-center" style={{ animationDelay: '1s' }} />
      <div className="absolute left-1/2 top-[22%] h-[28%] w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0 schema-line-v-center" style={{ animationDelay: '2s' }} />
      <div className="absolute left-1/2 bottom-[22%] h-[28%] w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0 schema-line-v-center" style={{ animationDelay: '3s' }} />
      {[{ top: '50%', left: '22%' }, { top: '50%', left: '78%', animationDelay: '0.5s' }, { top: '22%', left: '50%', animationDelay: '1s' }, { top: '78%', left: '50%', animationDelay: '1.5s' }].map((s, i) => (
        <div key={i} className="schema-node-clean" style={s} />
      ))}
    </div>
  );

  if (type === 'lines') return (
    <div className="schema-layer opacity-90">
      <div className="schema-vignette" />
      {['28%', '50%', '72%'].map((top, i) => (
        <div key={i} className="absolute h-px bg-gradient-to-r from-white/0 via-white/22 to-white/0 schema-line-h-center" style={{ top, left: '20%', right: '20%', animationDelay: `${i * 1.5}s` }} />
      ))}
      <div className="absolute top-1/2 left-[64%] -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full border border-white/[0.12] flex items-center justify-center schema-ring-spin">
        <div className="w-[28px] h-[28px] rounded-full border border-white/[0.18] bg-white/[0.03] flex items-center justify-center schema-ring-spin-reverse">
          <div className="w-1.5 h-1.5 rounded-full bg-white schema-pulse-dot" />
        </div>
      </div>
    </div>
  );

  if (type === 'dual-ring') return (
    <div className="schema-layer opacity-95">
      <div className="schema-vignette" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-white/[0.08] schema-ring-spin" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-white/[0.08] schema-ring-spin-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white schema-pulse-dot-pos" />
    </div>
  );

  if (type === 'grid') return (
    <div className="schema-layer opacity-90">
      <div className="schema-vignette" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-3 p-5 border border-white/[0.10] rounded-xl bg-black/45 backdrop-blur-sm">
          {['schema-flash', 'schema-flash-1', 'schema-flash-2', 'schema-flash-3',
            'schema-flash-2', 'schema-flash-1', 'schema-flash-3', 'schema-flash',
            'schema-flash-3', 'schema-flash', 'schema-flash-2', 'schema-flash-1',
            'schema-flash-2', 'schema-flash-3', 'schema-flash', 'schema-flash-1'].map((cls, i) => (
              <div key={i} className={`w-6 h-6 rounded border border-white/[0.18] bg-white/[0.04] ${cls}`} />
            ))}
        </div>
      </div>
    </div>
  );

  if (type === 'concentric') return (
    <div className="schema-layer opacity-95">
      <div className="schema-vignette" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[240px] h-[240px]">
          {['inset-[36px]', 'inset-[72px]', 'inset-[108px]'].map((c, i) => (
            <div key={i} className={`absolute ${c} rounded-full border border-white/[0.08] ${i % 2 === 0 ? 'schema-ring-spin-inset' : 'schema-ring-spin-inset-reverse'}`} />
          ))}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white schema-pulse-dot-pos" />
        </div>
      </div>
    </div>
  );

  return null;
}
