import { Icon } from '@iconify/react';

const cards = [
  {
    id: 'MOD_01',
    icon: 'solar:box-minimalistic-linear',
    title: 'Posture & Gaze Tracking',
    description:
      'Reads eye contact, head placement, and posture in real time, turning body language into a clear percentage score.',
    footer: { label: 'Active' },
    footerType: 'line',
    delay: '0ms',
    mt: '',
    depth2: { label: 'Gaze Accuracy' },
    depth1: { label: 'Calibration', value: 'OPTIMIZED', valueClass: '' },
  },
  {
    id: 'MOD_02',
    icon: 'solar:cpu-bolt-linear',
    title: 'Voice & Confidence Analysis',
    description:
      'Listens for pace, tone, and filler words, then scores your confidence and flags exactly what to work on.',
    footer: { label: 'Processing' },
    footerType: 'bars',
    delay: '100ms',
    mt: 'md:mt-12',
    depth2: { label: 'Speech Signal' },
    depth1: { label: 'Scoring Model', value: 'SYNCED', valueClass: 'text-emerald-400' },
  },
  {
    id: 'MOD_03',
    icon: 'solar:code-scan-linear',
    title: 'Custom Question Engine',
    description:
      "Enter a topic or upload a doc and get a tailored mock interview, built around the role you're actually going for.",
    footer: null,
    footerType: 'code',
    delay: '200ms',
    mt: 'md:mt-24',
    depth2: { label: 'Question Bank' },
    depth1: { label: 'Match Score', value: '94%', valueClass: 'text-emerald-400' },
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="bg-[#000] z-10 pt-32 pr-6 pb-32 pl-6 relative" id="capabilities">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
        <div className="flex items-center gap-6 mb-20 fade-up">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">Core Capabilities</h2>
          <div className="h-px bg-white/20 flex-1" />
          <span className="text-[10px] font-mono text-neutral-500">SYS_CAPABILITIES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative group fade-up h-full ${card.mt}`}
              style={{ perspective: '1200px', transitionDelay: card.delay }}
            >
              <div
                className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Depth Layer 2 */}
                <div className="absolute inset-0 rounded-3xl bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    {card.depth2.label}
                  </div>
                </div>

                {/* Depth Layer 1 */}
                <div className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />
                  <div className="font-mono text-[9px] text-neutral-400 uppercase">{card.depth1.label}</div>
                  <div className={`font-mono text-[10px] mt-1 ${card.depth1.valueClass || 'text-white'}`}>
                    {card.depth1.value}
                  </div>
                </div>

                {/* Main Card */}
                <div className="relative p-10 rounded-3xl bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors" />
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      <Icon icon={card.icon} className="text-2xl text-neutral-300 group-hover:text-white" />
                    </div>
                    <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                      {card.id}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1">{card.description}</p>

                  {card.footerType === 'line' && (
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-[shimmerLine_2s_linear_infinite]" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Active</span>
                    </div>
                  )}

                  {card.footerType === 'bars' && (
                    <div className="flex items-center gap-1 mt-auto relative z-10">
                      {['anim-bar-1', 'anim-bar-2', 'anim-bar-3', 'anim-bar-4', 'anim-bar-5'].map((cls, i) => (
                        <div key={i} className={`h-3 w-1 bg-white/20 group-hover:bg-white ${cls}`} />
                      ))}
                      <span className="text-[10px] font-mono text-neutral-500 uppercase ml-2">Processing</span>
                    </div>
                  )}

                  {card.footerType === 'code' && (
                    <div className="font-mono text-[10px] text-neutral-500 flex flex-col gap-1 relative z-10 mt-auto">
                      <span className="group-hover:text-white transition-colors">&gt; parse_uploaded_doc()</span>
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity delay-75">&gt; generate_questions()</span>
                      <span className="opacity-25 group-hover:opacity-100 transition-opacity delay-150">&gt; OK</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
