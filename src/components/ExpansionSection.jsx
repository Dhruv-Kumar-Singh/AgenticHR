import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

export default function ExpansionSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Masked reveal: handled globally in App via useEffect
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .to('#hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.mask-word-inner', { y: '0%', duration: 1.2, stagger: 0.04, ease: 'power4.out' }, '-=0.4')
      .to('#hero-desc', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6');

    const container = containerRef.current;
    const expandTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });

    expandTl
      .to('.seq-node:nth-of-type(1)', { opacity: 1, y: 0, duration: 1 })
      .to('.seq-line:nth-of-type(1)', { scaleY: 1, duration: 1.5, ease: 'none' })
      .to('.seq-line-h:nth-of-type(1)', { scaleX: 1, duration: 1, ease: 'power1.inOut' }, '-=0.5')
      .to('.seq-node:nth-of-type(2), .seq-node:nth-of-type(3)', { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, '-=0.2')
      .to('.seq-line:nth-of-type(2), .seq-line:nth-of-type(3)', { scaleY: 1, duration: 1.5, ease: 'none', stagger: 0.1 })
      .to('.seq-line-h:nth-of-type(2)', { scaleX: 1, duration: 1, ease: 'power1.inOut' }, '-=0.5')
      .to('.seq-node:nth-of-type(4), .seq-node:nth-of-type(5), .seq-node:nth-of-type(6)', {
        opacity: 1, y: 0, duration: 1, stagger: 0.15,
      }, '-=0.2');

    return () => {
      heroTl.kill();
      expandTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="antialiased selection:bg-neutral-800 selection:text-white flex flex-col min-h-screen w-full items-center">
      {/* Progressive blur overlay */}
      <div className="gradient-blur">
        <div /><div /><div /><div /><div /><div />
      </div>

      <main className="w-full max-w-6xl mx-auto border-x border-neutral-900 relative min-h-screen flex flex-col">
        {/* Corner markers */}
        {['-top-[12px] -left-[12px]', '-top-[12px] -right-[12px]'].map((pos) => (
          <svg key={pos} className={`absolute ${pos} w-6 h-6 text-neutral-800`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" />
          </svg>
        ))}

        {/* Hero */}
        <header className="pt-40 pb-24 px-6 md:px-12 relative z-10 flex flex-col items-center text-center w-full overflow-hidden">
          <div id="hero-badge" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/30 text-xs font-normal text-neutral-400 mb-8 opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            System initialization complete
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white w-full max-w-[1100px] leading-[1.06] masked-reveal-target break-words whitespace-normal">
            <span className="mask-word">
              <span className="mask-word-inner">Architecture that scales organically with your complexity.</span>
            </span>
          </h1>

          <p id="hero-desc" className="mt-8 text-base md:text-lg text-neutral-400 max-w-2xl font-normal opacity-0">
            Begin with a single core. As data flows increase, the system progressively reveals deeper layers, connections,
            and autonomous sub-routines. Scroll to initiate expansion.
          </p>
        </header>

        {/* Expansion Container */}
        <div ref={containerRef} id="expansion-container" className="mx-4 md:mx-10 mb-32 p-6 md:p-16 border border-neutral-800/60 rounded-3xl bg-neutral-950/40 relative z-10 overflow-hidden">
          {/* Inner corner markers */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
            <svg key={pos} className={`absolute ${pos} w-4 h-4 text-neutral-700`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
            </svg>
          ))}

          <div className="relative flex flex-col items-center w-full min-h-[1200px] py-10">
            {/* Level 1 */}
            <div className="w-full max-w-sm z-20 seq-node opacity-0" style={{ transform: 'translateY(20px)' }}>
              <div className="p-[1px] rounded-2xl bg-gradient-to-b from-neutral-600/60 via-neutral-800/30 to-transparent w-full">
                <div className="bg-neutral-900 h-full w-full rounded-[15px] p-6 flex flex-col items-center text-center shadow-2xl shadow-black/50">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/50 border border-neutral-700 flex items-center justify-center mb-4">
                    <Icon icon="solar:cpu-bolt-bold-duotone" className="text-2xl text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-neutral-100">Primary Core</h3>
                  <p className="mt-2 text-sm text-neutral-500 font-normal">
                    Single point of origin. Awaiting data saturation to expand network topography.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[1px] h-32 bg-gradient-to-b from-neutral-700 to-neutral-800 z-10 seq-line" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }} />

            {/* Level 2 */}
            <div className="w-full relative z-20 mt-[-1px]">
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-neutral-800 seq-line-h" style={{ transformOrigin: 'center', transform: 'scaleX(0)' }} />
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-32 pt-8">
                {[
                  { icon: 'solar:database-bold-duotone', title: 'Data Persistence', desc: 'State is separated from execution. Local cache clusters begin forming to handle increased read throughput.', dir: 'br' },
                  { icon: 'solar:network-bold-duotone', title: 'Load Distribution', desc: 'Traffic is dynamically routed. Edge nodes are deployed to minimize latency for incoming external requests.', dir: 'bl' },
                ].map(({ icon, title, desc, dir }) => (
                  <div key={title} className="w-full max-w-sm seq-node opacity-0" style={{ transform: 'translateY(20px)' }}>
                    <div className={`p-[1px] rounded-2xl bg-gradient-to-${dir} from-neutral-700/50 via-neutral-800/20 to-transparent w-full`}>
                      <div className="bg-neutral-900/90 backdrop-blur-sm h-full w-full rounded-[15px] p-6 text-left border border-white/5">
                        <Icon icon={icon} className="text-xl text-neutral-400 mb-3" />
                        <h3 className="text-base font-medium tracking-tight text-neutral-200">{title}</h3>
                        <p className="mt-1 text-xs text-neutral-500 font-normal leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector lines L2 -> L3 */}
            <div className="w-full flex justify-center gap-8 md:gap-32 relative z-10 mt-[-1px]">
              <div className="w-[1px] h-32 bg-gradient-to-b from-neutral-800 to-neutral-800/50 seq-line" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }} />
              <div className="w-[1px] h-32 bg-gradient-to-b from-neutral-800 to-neutral-800/50 seq-line hidden md:block" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }} />
            </div>

            {/* Level 3 */}
            <div className="w-full relative z-20 mt-[-1px]">
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-neutral-800/50 seq-line-h" style={{ transformOrigin: 'center', transform: 'scaleX(0)' }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 w-full max-w-5xl mx-auto px-4 md:px-0">
                {[
                  {
                    icon: 'solar:shield-keyhole-bold-duotone', title: 'Security Layers', desc: 'Automated threat mitigation.',
                    badge: 'Active', badgeClass: '', metric: { label: 'Integrity', value: '99.9%', barW: 'w-[99%]' }, type: 'bar',
                  },
                  {
                    icon: 'solar:widget-add-bold-duotone', title: 'Micro-services', desc: 'Spinning up isolated containers.',
                    badge: 'Syncing', badgeClass: 'flex items-center gap-1', metricType: 'barchart', type: 'barchart',
                  },
                  {
                    icon: 'solar:chart-square-bold-duotone', title: 'Telemetry', desc: 'Aggregating system logs & traces.',
                    badge: 'Live', badgeClass: '', metric: { label: 'Latency', value: '12', unit: 'ms' }, type: 'stat',
                  },
                ].map((node) => (
                  <div key={node.title} className="w-full seq-node opacity-0" style={{ transform: 'translateY(20px)' }}>
                    <div className="p-[1px] rounded-xl bg-gradient-to-b from-neutral-700/30 to-transparent w-full h-full">
                      <div className="bg-neutral-950/80 h-full w-full rounded-[11px] p-5 text-left border border-neutral-800/50 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <Icon icon={node.icon} className="text-lg text-neutral-400" />
                            <span className={`text-[10px] font-medium tracking-wide text-neutral-500 uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 ${node.badgeClass}`}>
                              {node.type === 'barchart' && <span className="w-1 h-1 rounded-full bg-blue-500" />}
                              {node.badge}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium tracking-tight text-neutral-200">{node.title}</h3>
                          <p className="mt-1 text-xs text-neutral-600 font-normal">{node.desc}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-neutral-800/50">
                          {node.type === 'bar' && (
                            <>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-neutral-500">{node.metric.label}</span>
                                <span className="text-neutral-300 font-medium">{node.metric.value}</span>
                              </div>
                              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                                <div className={`h-full bg-neutral-500 ${node.metric.barW}`} />
                              </div>
                            </>
                          )}
                          {node.type === 'barchart' && (
                            <div className="flex gap-1">
                              {[40, 70, 90, 60, 85].map((h, i) => (
                                <div key={i} className="flex-1 h-6 bg-neutral-800/30 rounded flex items-end p-[1px]">
                                  <div className="w-full bg-neutral-600 rounded-[2px]" style={{ height: `${h}%` }} />
                                </div>
                              ))}
                            </div>
                          )}
                          {node.type === 'stat' && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-neutral-500">{node.metric.label}</span>
                              <span className="text-sm font-medium text-neutral-200">
                                {node.metric.value}<span className="text-xs text-neutral-600 ml-0.5">{node.metric.unit}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none z-30" />
          </div>
        </div>
      </main>
    </section>
  );
}
