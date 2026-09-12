import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const navItems = [
  { label: 'Features', id: 'dashboard' },
  { label: 'Plan', id: 'plans' },
  { label: 'Analysis', id: 'analysis' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 h-24 z-50 border-b border-white/[0.05] bg-black/50 backdrop-blur-xl transition-all duration-300">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-2.5 group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
          <Icon icon="solar:atom-bold-duotone" className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
          Praxis
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-xs font-mono">
        {navItems.map(({ label, id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleScrollTo(id)}
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
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col text-[9px] font-mono text-neutral-500 text-right uppercase">
          <span>System: Online</span>
          <span className="text-neutral-300">Sessions: Live</span>
        </div>
        <button
          onClick={() => handleScrollTo('plans')}
          className="px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white border border-white rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer"
        >
          Start Practicing
          <Icon icon="solar:arrow-right-linear" />
        </button>
      </div>
    </nav>
  );
}
