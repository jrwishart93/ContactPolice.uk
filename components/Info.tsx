import React from 'react';

export const Info: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-2xl mx-auto animate-glass-enter">
      <div className="space-y-12">
        <header className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Overview</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Information</h1>
        </header>
        
        <div className="space-y-10 text-slate-400 leading-relaxed font-light">
          
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">About This Website</h2>
            <p>ContactPolice.uk was created to make it easier for members of the public to contact police officers following an interaction.</p>
            <p>In many situations, officers provide contact details so that people can follow up with questions, provide additional information, or continue a conversation at a later time. This website exists as a simple, accessible alternative to physical business cards, allowing those details to be shared digitally in a consistent and convenient way.</p>
            <p>The platform is intended to support everyday communication only. It is not designed for reporting crimes, requesting urgent assistance, or contacting emergency services. In an emergency, you should always contact Police Scotland using official channels such as 999 or 101.</p>
          </section>

          <section className="space-y-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/10">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-4">Independent Platform Notice</h2>
            <div className="space-y-4">
              <p className="text-slate-300 font-medium">This website is an independent platform.</p>
              <p className="text-slate-300">
                It is <span className="text-white">not an official Police Scotland website</span> and is <span className="text-white">not created, operated, managed, or endorsed by Police Scotland</span>. While the officers listed are serving members of the Police Service of Scotland, this website operates separately from Police Scotland systems, infrastructure, and communication networks.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Using the Website & Sharing Information</h2>
            <p>This website allows users to contact officers using their own device and email services, and in some cases through a structured contact form designed to make communication clearer and easier for both parties.</p>
            <p>While care has been taken to make the website safe and secure, all online communication carries some level of risk. Once you choose to submit information electronically, the security of that information may also depend on factors outside the control of this website, such as your email provider, device, or network.</p>
            <p>Users are encouraged to share only the information they are comfortable sending electronically and to avoid submitting sensitive, confidential, or highly personal details unless they are satisfied with the security of their own systems.</p>
            <p>If you are unsure, or if the matter is sensitive, you may prefer to contact the officer directly using official Police Scotland contact methods.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Further Information</h2>
            <p>More detailed information about how data is handled, stored, and protected, along with limitations of responsibility, is available on the Privacy page.</p>
            <p>Users are encouraged to review the Privacy Notice before submitting any information through this website.</p>
          </section>

        </div>
      </div>
    </div>
  );
};