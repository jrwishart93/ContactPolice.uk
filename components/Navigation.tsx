import React from 'react';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-4 pt-2 px-6 pointer-events-none">
      <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl pointer-events-auto">
        <NavButton active={currentPath === '/'} label="Home" onClick={() => onNavigate('/')} />
        <NavButton active={currentPath === '/team'} label="Team" onClick={() => onNavigate('/team')} />
        <NavButton active={currentPath === '/info'} label="Info" onClick={() => onNavigate('/info')} />
        <NavButton active={currentPath === '/privacy'} label="Privacy" onClick={() => onNavigate('/privacy')} />
      </div>
    </nav>
  );
};

const NavButton: React.FC<{ label: string; onClick: () => void; active: boolean }> = ({ label, onClick, active }) => (
  <button 
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] transition-all rounded-full ${
      active 
        ? 'bg-white text-black shadow-lg scale-105' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {label}
  </button>
);