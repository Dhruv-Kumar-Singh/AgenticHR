import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const sceneRef = useRef(null);
  const tunnelRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = 'Walk into your next interview with total clarity.';

    // Build word spans
    title.innerHTML = text
      .split(' ')
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden pb-1"><span class="t-word inline-block translate-y-full opacity-0">${w}</span></span>`
      )
      .join(' ');

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to('.t-word', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' }).to(
      [subtitleRef.current, actionsRef.current],
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );

    // 3D tunnel engine
    const tunnel = tunnelRef.current;
    const scene = sceneRef.current;

    const generators = {
      chart: () =>
        `<div class="flex items-center justify-between mb-3"><span class="text-[10px] text-neutral-400">Confidence</span><iconify-icon icon="solar:chart-square-bold-duotone" class="text-blue-400"></iconify-icon></div><div class="flex items-end gap-1 h-12">${Array.from({ length: 6 })
          .map(() => `<div class="flex-1 bg-blue-500/20 rounded-t-sm" style="height:${Math.random() * 100}%"></div>`)
          .join('')}</div>`,
      stats: () =>
        `<div class="text-[10px] text-neutral-500 mb-1">Sessions Practiced</div><div class="text-2xl font-mono text-white">1,024</div><div class="mt-2 text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded w-fit">+12.5%</div>`,
      status: () =>
        `<div class="flex justify-between items-center mb-4"><span class="text-[10px] text-neutral-200">Feedback Sync</span><div class="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]"></div></div><div class="h-1 w-full bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-indigo-500 w-[85%]"></div></div>`,
    };

    const numPanels = window.innerWidth < 768 ? 12 : 30;
    const panels = [];
    const types = Object.keys(generators);

    for (let i = 0; i < numPanels; i++) {
      const el = document.createElement('div');
      el.className =
        'absolute top-1/2 left-1/2 w-48 p-4 rounded-xl backdrop-blur-xl border border-white/10 flex flex-col will-change-transform';
      el.style.background = 'rgba(10,10,10,0.8)';
      el.innerHTML = generators[types[Math.floor(Math.random() * types.length)]]();
      tunnel.appendChild(el);

      panels.push({
        el,
        x: (Math.random() - 0.5) * (window.innerWidth < 768 ? 400 : 800),
        y: (Math.random() - 0.5) * (window.innerWidth < 768 ? 400 : 600),
        z: -Math.random() * 3000,
      });
    }

    let rafId;
    function animate() {
      panels.forEach((p) => {
        p.z += 1.5;
        if (p.z > 200) p.z = -3000;
        const opacity =
          p.z > -200 ? (200 - p.z) / 400 : p.z < -2500 ? (p.z + 3000) / 500 : 1;
        const blur = p.z < -1500 ? Math.min(8, (Math.abs(p.z) - 1500) / 200) : 0;
        p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px)`;
        p.el.style.opacity = Math.max(0, opacity);
        p.el.style.filter = `blur(${blur}px)`;
      });
      rafId = requestAnimationFrame(animate);
    }
    animate();

    const onMouseMove = (e) => {
      const rect = viewportRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      gsap.to(scene, {
        perspectiveOrigin: `${45 + x * 10}% ${45 + y * 10}%`,
        duration: 2,
        ease: 'power2.out',
      });
    };

    viewportRef.current?.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      viewportRef.current?.removeEventListener('mousemove', onMouseMove);
      tl.kill();
    };
  }, []);

  return (
    <section
      className="overflow-hidden selection:bg-white/20 selection:text-white flex flex-col text-[#ededed] font-sans bg-[#0a0a0a] w-screen h-screen relative"
      id="nexus-engine-hero"
    >
      <div
        className="w-full max-w-[1400px] mx-auto min-h-[800px] flex flex-col relative border-x border-white/5 bg-[#030303] overflow-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.02) 0%, transparent 100%)',
        }}
      >
        {/* Corner Decorative Markers */}
        {['-top-1.5 -left-1.5', '-top-1.5 -right-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-3 h-3 text-white/20 z-50`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4v16m8-8H4" />
            </svg>
          </div>
        ))}

        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10">
          <div
            ref={viewportRef}
            id="telemetry-viewport"
            className="relative flex-1 w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center min-h-[650px]"
            style={{
              background:
                'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%) border-box',
              border: '1px solid transparent',
            }}
          >
            {/* Atmospheric Glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-[60vw] max-w-[600px] aspect-square bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen opacity-70" />
              <div className="absolute w-[30vw] max-w-[300px] aspect-square bg-indigo-500/10 rounded-full blur-[80px] mix-blend-screen opacity-50 translate-y-10" />
            </div>

            {/* 3D Tunnel Scene */}
            <div
              ref={sceneRef}
              className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-80"
              style={{ perspective: '900px' }}
            >
              <div ref={tunnelRef} className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }} />
            </div>

            {/* Content Overlay */}
            <main className="relative z-40 flex-1 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal text-gray-300 mb-8 hover:bg-white/[0.08] transition-all backdrop-blur-md"
                style={{
                  background:
                    'linear-gradient(#111, #111) padding-box, linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%) border-box',
                  border: '1px solid transparent',
                }}
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                AI Interview Engine v3.0 is live
                <Icon icon="solar:alt-arrow-right-bold-duotone" className="text-xs text-gray-400" />
              </a>

              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.05]"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
              />

              <p ref={subtitleRef} className="text-sm md:text-base text-neutral-400 mb-10 max-w-2xl leading-relaxed opacity-0">
                An AI-powered interview coach that reads your posture, tone, and answers in real time —
                turning every practice session into a clear path to your next offer.
              </p>

              <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto opacity-0">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2.5">
                  <Icon icon="solar:rocket-bold-duotone" className="text-lg" /> Start Mock Interview
                </button>
                <button
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-normal text-sm hover:bg-neutral-800 transition-all backdrop-blur-md flex items-center justify-center gap-2.5"
                  style={{
                    background:
                      'linear-gradient(rgba(20,20,20,0.4), rgba(20,20,20,0.4)) padding-box, linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%) border-box',
                    border: '1px solid transparent',
                  }}
                >
                  See How It Works
                </button>
              </div>
            </main>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
