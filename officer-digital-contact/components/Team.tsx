import React from 'react';
import { TEAM_DATA } from '../data';

interface TeamProps {
  onNavigate: (path: string) => void;
}

export const Team: React.FC<TeamProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-4xl mx-auto animate-glass-enter">
      <header className="mb-12 space-y-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Directory</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Our Team</h1>
        <p className="text-slate-400 font-light text-lg">Select an officer to access their digital contact card and direct information.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TEAM_DATA).map((officer) => (
          <button
            key={officer.shoulderNumber}
            onClick={() => onNavigate(`/${officer.shoulderNumber}`)}
            className="group relative flex flex-col p-8 text-left rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-lg active:scale-95"
          >
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-3 group-hover:text-slate-300 transition-colors">
              {officer.shoulderNumber}
            </span>
            <h2 className="text-2xl font-semibold mb-1 text-white">{officer.rank} {officer.name}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-6">{officer.department}</p>
            
            <div className="mt-auto pt-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-all">
              <span>Access Card</span>
              <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-white transition-all"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};