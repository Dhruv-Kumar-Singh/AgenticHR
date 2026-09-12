const elements = [
  { tx: '-240px', ty: '-240px', rot: '15deg', delay: '0.2s', content: 'bars' },
  { tx: '260px', ty: '-180px', rot: '-20deg', delay: '0.6s', content: 'db' },
  { tx: '-180px', ty: '260px', rot: '30deg', delay: '1.0s', content: 'toggle' },
  { tx: '220px', ty: '220px', rot: '-10deg', delay: '1.4s', content: 'metric' },
  { tx: '-320px', ty: '20px', rot: '25deg', delay: '1.8s', content: 'chart' },
  { tx: '300px', ty: '60px', rot: '-25deg', delay: '2.2s', content: 'settings' },
  { tx: '-80px', ty: '-300px', rot: '40deg', delay: '2.6s', content: 'user' },
  { tx: '100px', ty: '-280px', rot: '-15deg', delay: '3.0s', content: 'shield' },
  { tx: '-120px', ty: '320px', rot: '20deg', delay: '3.4s', content: 'slider' },
  { tx: '160px', ty: '300px', rot: '-35deg', delay: '3.8s', content: 'cpu' },
  { tx: '-340px', ty: '-120px', rot: '10deg', delay: '4.2s', content: 'graph' },
  { tx: '340px', ty: '-80px', rot: '-5deg', delay: '4.6s', content: 'code2' },
];

function ElementContent({ type }) {
  switch (type) {
    case 'bars':
      return (
        <div className="flex flex-col gap-1.5 w-32">
          <div className="h-1.5 w-1/2 bg-white/20 rounded" />
          <div className="h-1.5 w-3/4 bg-white/40 rounded" />
          <div className="h-1.5 w-2/3 bg-white/20 rounded" />
        </div>
      );
    case 'db':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
          <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      );
    case 'toggle':
      return (
        <div className="w-8 h-4 bg-white/20 rounded-full relative">
          <div className="absolute right-1 top-[2px] w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      );
    case 'metric':
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          <span className="text-xs font-mono text-white">99.9%</span>
        </div>
      );
    case 'chart':
      return (
        <div className="flex items-end gap-1.5 h-8 w-12">
          <div className="w-2 bg-white/20 rounded-t h-1/3" />
          <div className="w-2 bg-white/40 rounded-t h-2/3" />
          <div className="w-2 bg-white/60 rounded-t h-1/2" />
          <div className="w-2 bg-white/80 rounded-t h-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </div>
      );
    case 'settings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'user':
      return (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-white/20 to-white/5 border border-white/20" />
          <div className="h-1.5 w-8 bg-white/20 rounded" />
        </div>
      );
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 8-2 2 0 6 1 8 2a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'slider':
      return (
        <div className="w-full h-1 bg-white/10 rounded-full relative w-16">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </div>
      );
    case 'cpu':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
          <rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
          <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
        </svg>
      );
    case 'graph':
      return (
        <svg viewBox="0 0 100 20" className="w-14 h-4 overflow-visible">
          <path d="M0,10 Q15,20 25,10 T50,10 T75,5 T100,10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        </svg>
      );
    case 'code2':
      return (
        <div className="flex flex-col gap-1.5 w-20">
          <div className="h-1.5 w-full bg-emerald-400/40 rounded" />
          <div className="h-1.5 w-2/3 bg-white/20 rounded" />
        </div>
      );
    default:
      return null;
  }
}

export default function OrbitalSection() {
  return (
    <section className="overflow-hidden flex flex-col min-h-screen select-none text-white bg-[#000] border-white/10 border-t pt-32 pb-32 relative items-center justify-center">
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_42%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.04)]">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/90">Unified System</span>
        </div>
        <h2 className="md:text-5xl text-4xl font-semibold text-white tracking-tight mb-4">Data Convergence</h2>
        <p className="max-w-md mx-auto text-sm text-neutral-400 font-light leading-relaxed">
          Multiple scattered elements, fragmented workflows, and disparate interfaces are pulled into a singular cognitive core.
          Complexity compressed into absolute control.
        </p>
      </div>

      {/* Orbital System */}
      <div className="relative z-10 w-[640px] h-[640px] max-w-[94vw] max-h-[94vw] flex items-center justify-center scale-[0.72] md:scale-100">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.04] blur-[60px] opacity-80 pointer-events-none" />

        {/* Radar rings */}
        {[0, 1.33, 2.66].map((delay) => (
          <div
            key={delay}
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/20 rounded-full pointer-events-none"
            style={{ animation: `radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite`, animationDelay: `${delay}s` }}
          />
        ))}

        {/* Central core */}
        <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none" style={{ animation: 'core-pulse-anim 2s ease-in-out infinite' }}>
          <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.9),inset_0_0_20px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:-inset-4 before:border before:border-dashed before:border-white/40 before:rounded-full before:animate-[spin_6s_linear_infinite]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>

        {/* Floating elements */}
        {elements.map(({ tx, ty, rot, delay, content }) => (
          <div
            key={content}
            className="absolute top-1/2 left-1/2 p-3 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20"
            style={{
              '--tx': tx,
              '--ty': ty,
              '--rot': rot,
              animation: `gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both`,
              animationDelay: delay,
            }}
          >
            <ElementContent type={content} />
          </div>
        ))}
      </div>
    </section>
  );
}
