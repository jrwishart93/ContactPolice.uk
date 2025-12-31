import React from 'react';

export const GlobalFooter: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] pointer-events-none flex justify-center pb-1">
      <p className="text-[8px] sm:text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center px-4 py-1 mix-blend-screen opacity-60">
        Independent website. Not an official or endorsed Police Scotland service.
      </p>
    </div>
  );
};