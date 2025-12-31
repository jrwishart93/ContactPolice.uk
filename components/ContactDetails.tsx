import React from 'react';
import { OfficerDetails } from '../types';

interface ContactDetailsProps {
  data: OfficerDetails;
  visible: boolean;
  onNavigate?: (path: string) => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ data, visible, onNavigate }) => {
  
  const handleEmail = () => {
    window.location.href = `mailto:${data.email}`;
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.rank} ${data.name}
ORG:Police Scotland;${data.team}
TEL;TYPE=WORK,VOICE:${data.telephone}
ADR;TYPE=WORK:;;${data.hqName}, ${data.addressLine1};${data.city};;${data.postcode}
EMAIL:${data.email}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.shoulderNumber}_contact.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!visible) return null;

  return (
    <div 
      className="absolute inset-0 z-20 flex items-center justify-center p-6 overflow-y-auto"
    >
      <div className="w-full max-w-sm mx-auto animate-glass-enter my-auto pt-10 pb-32">
        <div 
          className="relative rounded-2xl overflow-hidden transition-transform duration-500"
          style={{
            background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)', 
            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.7)' 
          }}
        >
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
            
            <div className="relative p-7 flex flex-col gap-6">
                
                <div className="relative border-b border-white/10 pb-6 min-h-[115px] flex flex-col justify-center">
                    <div className="space-y-1.5 pr-20 z-10">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">
                            Police Scotland
                        </p>
                        <div className="space-y-0.5">
                            <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight whitespace-nowrap">
                                {data.rank} {data.name}
                            </h1>
                            <p className="text-[12px] font-medium text-slate-400 tracking-wider uppercase opacity-80 whitespace-nowrap">
                                {data.department}
                            </p>
                        </div>
                    </div>
                    
                    <div className="absolute -top-8 -right-12 w-64 pointer-events-none opacity-100 brightness-110 flex justify-end items-start">
                        <img 
                          src="https://i.ibb.co/bM6YsBJ7/police-scotland-logo-removebg-preview.png" 
                          alt="Police Scotland Logo" 
                          className="w-full h-auto object-contain drop-shadow-2xl translate-x-8 -translate-y-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-6">
                    <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.2em]">SHOULDER No.</span>
                         <span className="text-base text-slate-200 font-medium tracking-wide font-mono">{data.shoulderNumber}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Team</span>
                         <span className="text-base text-slate-200 font-medium">{data.team}</span>
                    </div>

                    <div className="col-span-2 flex flex-col gap-1.5 pt-2 border-t border-white/5">
                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Station</span>
                        <address className="not-italic text-[14px] text-slate-400 leading-relaxed font-light tracking-wide">
                            <span className="font-semibold text-slate-200">{data.hqName}</span><br />
                            {data.addressLine1}, {data.city}, {data.postcode}
                        </address>
                    </div>

                    <div className="col-span-2 relative pt-2 border-t border-white/5">
                         <div className="flex flex-col gap-5 pr-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Telephone</span>
                                <span className="text-[14px] text-slate-200 font-medium">{data.telephone}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Email Address</span>
                                <a 
                                    href={`mailto:${data.email}`} 
                                    className="text-[14px] text-slate-200 font-medium truncate hover:text-white transition-colors underline decoration-slate-700 underline-offset-4"
                                >
                                    {data.email}
                                </a>
                            </div>
                         </div>

                         <div className="absolute bottom-0 -right-4 w-36 pointer-events-none translate-y-1 opacity-100">
                            <img 
                              src="https://i.ibb.co/zVNY0p80/police-audi.png" 
                              alt="Police Audi" 
                              className="w-full h-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)]"
                            />
                            <div className="absolute -bottom-1 left-[15%] right-[15%] h-2 bg-black/60 blur-lg rounded-[100%]"></div>
                         </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <button 
                        onClick={() => onNavigate?.(`/contact/${data.shoulderNumber}`)}
                        className="group relative flex items-center justify-center px-4 py-4 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 active:scale-[0.97] transition-all duration-200 overflow-hidden"
                    >
                        <span className="relative text-[11px] font-bold text-blue-200 tracking-widest uppercase z-10">Send Enquiry</span>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={handleEmail}
                            className="group relative flex items-center justify-center px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] active:scale-[0.97] transition-all duration-200 overflow-hidden"
                        >
                            <span className="relative text-[11px] font-bold text-white tracking-widest uppercase z-10">Direct Email</span>
                        </button>
                        
                        <button 
                            onClick={handleSaveContact}
                            className="group relative flex items-center justify-center px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] active:scale-[0.97] transition-all duration-200 overflow-hidden"
                        >
                            <span className="relative text-[11px] font-bold text-white tracking-widest uppercase z-10">Save Info</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 text-center px-8 space-y-2">
            <p className="text-[10px] text-slate-600 leading-relaxed font-bold tracking-widest uppercase opacity-70">
              Emergency 999 • Non-Emergency 101
            </p>
            <p className="text-[8px] text-slate-700 leading-relaxed font-medium uppercase tracking-wider opacity-60">
              Independent website • Not official Police Scotland
            </p>
        </div>
      </div>
    </div>
  );
};