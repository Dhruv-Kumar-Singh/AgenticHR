export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-[#000]">
      {/* CTA Section */}
      <div className="overflow-hidden w-full border-white/10 border-t pt-32 pb-32 relative">
        <div
          className="absolute inset-0 bg-grid opacity-10 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] font-mono uppercase tracking-widest mb-6 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Kernel Ready</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-6 font-mono typewriter-text">
            &gt; init_workspace()
          </h2>

          <p className="text-neutral-400 max-w-lg font-light leading-relaxed mb-10">
            Instantiate a new spatial computing node. Connect to the global mesh network with deterministic state synchronization.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-black bg-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 flex items-center gap-2">
                Deploy Node
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              <span className="relative z-10 flex items-center gap-2 text-neutral-300 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
                </svg>
                API Reference
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="overflow-hidden bg-[#050505] w-full border-white/5 border-t pt-16 pb-12 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col w-full">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 pb-16 border-b border-white/10 w-full">
            <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col items-start gap-4">
              <div
                className="flex gap-3 bg-center text-white bg-cover pt-6 pr-12 pb-6 pl-12 gap-x-3 gap-y-3 items-center"
                style={{ backgroundImage: 'url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/53e40404-d9d0-4f28-9e82-7f2f45062936_1600w.png)' }}
              />
              <p className="text-sm text-neutral-500 max-w-sm font-light leading-relaxed mt-2">
                A purely deterministic ecosystem designed for scale. Construct, monitor, and deploy with tactile precision across the global mesh network.
              </p>
              <div className="flex flex-col gap-2">
                {['Engine', 'Studio', 'Research', 'Network Map'].map((l) => (
                  <a key={l} href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">{l}</a>
                ))}
              </div>
            </div>

            {[
              { title: 'Resources', links: ['Documentation', 'API Reference', 'Changelog', 'System Status'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-4">
                <h4 className="text-[10px] font-mono font-medium text-white uppercase tracking-widest mb-2">{title}</h4>
                {links.map((l) => (
                  <a key={l} href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">{l}</a>
                ))}
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest">All systems nominal</span>
              </div>
              <div className="flex gap-6 text-xs font-mono text-neutral-500 uppercase">
                {[
                  { label: 'Twitter', icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /> },
                  { label: 'GitHub', icon: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></> },
                ].map(({ label, icon }) => (
                  <a key={label} href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
              <span>© 2024 Praxis.</span>
              <span className="px-2 py-0.5 border border-white/10 rounded">v4.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
