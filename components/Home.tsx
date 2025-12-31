import React from 'react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center animate-glass-enter pb-32">
      <div className="max-w-xl space-y-12">
        <header className="space-y-6">
          <div className="flex justify-center mb-8 opacity-40">
            <img src="https://i.ibb.co/bM6YsBJ7/police-scotland-logo-removebg-preview.png" alt="Crest" className="w-24 grayscale brightness-200" />
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.5em]">Direct Access Platform</p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white leading-[1.1]">Police Officer Contact Information</h1>
          <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed px-4">
            An easier way to get back in touch with officers following an interaction or incident.
          </p>
        </header>

        <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10 space-y-8">
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              This independent platform provides professional contact cards for serving officers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('/team')}
                className="group relative px-10 py-5 rounded-2xl bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 overflow-hidden shadow-xl"
              >
                <span className="relative z-10">View Team Directory</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-red-500/80 uppercase tracking-widest">Emergency Services</span>
            <p className="text-2xl font-bold tracking-tight">Dial 999</p>
          </div>
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Non-Emergency</span>
            <p className="text-2xl font-bold tracking-tight">Dial 101</p>
          </div>
        </div>

        <div className="pt-12 pb-6 px-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Independent Website Notice</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This website is an independent platform that provides contact details for verified Police Scotland officers.
              It is <strong className="text-slate-400">not an official Police Scotland website</strong> and is <strong className="text-slate-400">not created, operated, or endorsed by Police Scotland</strong>.
              While all officer details displayed relate to serving Police Scotland officers, this website operates independently from Police Scotland systems and infrastructure.
            </p>
            <button onClick={() => onNavigate('/info')} className="text-[10px] text-blue-400 font-bold uppercase tracking-wider hover:text-blue-300 transition-colors">
              Read Full Disclaimer &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};