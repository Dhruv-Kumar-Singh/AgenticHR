import { useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function BentoSection() {
  useEffect(() => {
    // Counter jitter animation
    const counters = document.querySelectorAll('.counter');
    const intervals = [];
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      let current = target - 0.5;
      const id = setInterval(() => {
        const jitter = (Math.random() - 0.5) * 0.02;
        let val = current + jitter;
        if (val > target) val = target;
        if (val < target - 0.1) val = target - 0.1;
        current = val;
        counter.innerHTML = `${current.toFixed(2)}<span class="text-lg text-neutral-500">%</span>`;
      }, 150);
      intervals.push(id);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="z-10 py-32 relative bg-[#000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16 fade-up">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">Your Interview Dashboard</h2>
          <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            Every session, scored and broken down the moment you finish speaking. No waiting, no guessing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] fade-up">
          {/* Main Graph Box */}
          <div className="col-span-1 md:col-span-2 row-span-2 p-8 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none group-hover:opacity-[0.15] transition-opacity" />
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">Live Session</span>
                </div>
                <Icon icon="solar:chart-square-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              </div>

              {/* Animated chart bars */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[250px] h-32 flex items-end justify-between gap-1">
                {[['anim-bar-1'], ['anim-bar-2'], ['anim-bar-3', 'bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'], ['anim-bar-4'], ['anim-bar-5'], ['anim-bar-1'], ['anim-bar-2']].map(
                  ([cls, extra = 'bg-white/5 border-white/10'], i) => (
                    <div key={i} className={`w-full border relative overflow-hidden ${cls} ${extra}`}>
                      {!extra.includes('bg-white border') && (
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]" />
                      )}
                    </div>
                  )
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 tracking-tight text-white group-hover:translate-x-1 transition-transform">
                  Session Analytics
                </h3>
                <div className="flex gap-8 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono mb-1">SESSIONS ANALYZED</div>
                    <div className="text-sm font-mono text-white">12,400+</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono mb-1">FEEDBACK TIME</div>
                    <div className="text-sm font-mono text-white">2.1 s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scoring Layers Box */}
          <div className="col-span-1 md:col-span-1 row-span-2 p-8 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:layers-minimalistic-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              <div className="text-[10px] font-mono text-neutral-500">SCORING</div>
            </div>
            <div className="relative w-full h-40 flex flex-col items-center justify-center my-auto">
              {['layer-float-1', 'layer-float-2', 'layer-float-3'].map((cls, i) => (
                <div
                  key={i}
                  className={`w-24 h-24 border bg-black/80 backdrop-blur-md absolute ${cls} flex items-center justify-center text-[10px] font-mono`}
                  style={{
                    borderColor: i === 0 ? 'rgba(255,255,255,0.2)' : i === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    backgroundColor: i === 0 ? 'rgba(0,0,0,0.8)' : i === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                    color: i === 0 ? 'rgba(255,255,255,0.5)' : i === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    marginTop: `${i * 32}px`,
                  }}
                >
                  L{3 - i}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-white">Scoring Layers</h3>
              <div className="space-y-1.5 pt-4 border-t border-white/10">
                {['VISION_LAYER', 'SPEECH_LAYER'].map((l) => (
                  <div key={l} className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>{l}</span>
                    <span className="text-white">OK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scoring Accuracy */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:shield-check-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_#fff]" />
            </div>
            <div>
              <div className="text-3xl font-semibold text-white tracking-tighter mb-1 font-mono counter" data-target="99.99">
                99.99<span className="text-lg">%</span>
              </div>
              <h3 className="text-xs font-mono text-neutral-500 uppercase">Scoring Accuracy</h3>
            </div>
          </div>

          {/* Signal Noise */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:radar-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
            </div>
            <div className="relative w-full h-12 border-b border-white/10 mb-2 overflow-hidden">
              <svg className="absolute bottom-0 w-[200%] h-full path-line" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0,10 Q5,20 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>
            </div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase">Signal Noise</h3>
          </div>

          {/* Global Infrastructure */}
          <div className="col-span-1 md:col-span-4 row-span-1 p-8 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors" />
            <div className="relative z-10 max-w-lg">
              <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Global Infrastructure</h3>
              <p className="text-sm text-neutral-400 font-light">
                Distributed state synchronization ensuring sub-millisecond data availability across all active nodes.
              </p>
            </div>
            <div className="flex gap-12 relative z-10 w-full md:w-auto justify-between md:justify-end">
              <div>
                <div className="text-3xl font-semibold text-white tracking-tighter font-mono">24</div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase mt-1">Regions</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white tracking-tighter font-mono">
                  400<span className="text-lg text-neutral-500">ms</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase mt-1">Replication</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
