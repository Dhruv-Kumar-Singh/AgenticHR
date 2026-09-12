import { Icon } from '@iconify/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 h-24 z-50 border-b border-white/[0.05] bg-black/50 backdrop-blur-xl transition-all duration-300">
      <div
        className="flex gap-3 bg-center text-white bg-cover pt-6 pr-12 pb-6 pl-12 gap-x-3 gap-y-3 items-center"
        style={{ backgroundImage: 'url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/53e40404-d9d0-4f28-9e82-7f2f45062936_1600w.png)' }}
      />
      <div className="hidden md:flex items-center gap-8 text-xs font-mono text-neutral-400">
        {['PRACTICE', 'TEMPLATES', 'FOR HR TEAMS'].map((link) => (
          <a key={link} href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-1.5 group">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white transition-colors" />
            {link}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col text-[9px] font-mono text-neutral-500 text-right uppercase">
          <span>System: Online</span>
          <span className="text-neutral-300">Sessions: Live</span>
        </div>
        <button className="px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white border border-white rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
          Start Practicing
          <Icon icon="solar:arrow-right-linear" />
        </button>
      </div>
    </nav>
  );
}
