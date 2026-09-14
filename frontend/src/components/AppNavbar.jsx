import { Icon } from '@iconify/react';

export default function AppNavbar({ activeTab, onTabChange, onViewLanding, hasUnread = true }) {
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Analysis', id: 'analysis' },
    { label: 'Profile', id: 'profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 h-24 z-50 border-b border-white/[0.05] bg-black/50 backdrop-blur-xl transition-all duration-300">
      {/* Top-left: Praxis wordmark & logo (exact landing page asset and sizing) */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onTabChange('home');
        }}
        className="flex items-center gap-2.5 group cursor-pointer"
        title="Praxis Home"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
          <Icon icon="solar:atom-bold-duotone" className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
          Praxis
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </span>
      </a>

      {/* Center nav links: Home, Analysis, Profile */}
      <div className="flex items-center gap-6 sm:gap-8 text-xs font-mono">
        {navItems.map(({ label, id }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 transition-colors duration-300 group cursor-pointer ${
                isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-110'
                    : 'bg-neutral-600 group-hover:bg-neutral-300'
                }`}
              />
              <span className="tracking-wider uppercase">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Right-aligned: system status + notification bell + optional landing toggle */}
      <div className="flex items-center gap-3">
        {/* Landing Page Preview toggle */}
        {onViewLanding && (
          <button
            onClick={onViewLanding}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all border border-transparent hover:border-white/10 font-mono text-[11px] cursor-pointer"
            title="Switch to Marketing Landing Page"
          >
            <Icon icon="solar:globus-bold-duotone" className="text-sm text-neutral-400" />
            <span>Landing</span>
          </button>
        )}

        <div className="hidden md:flex flex-col text-[9px] font-mono text-neutral-500 text-right uppercase">
          <span>System: Online</span>
          <span className="text-neutral-300">Sessions: Live</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Icon icon="solar:bell-linear" className="text-lg" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse" />
          )}
        </button>
      </div>
    </nav>
  );
}
