import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-2xl mx-auto animate-glass-enter">
      <div className="space-y-12">
        <header className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Transparency</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Privacy & Transparency</h1>
        </header>
        
        <div className="space-y-10 text-slate-400 leading-relaxed font-light">
          
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Our Approach to Privacy</h2>
            <p>ContactPolice.uk has been designed to make it easier for members of the public to contact officers following an interaction, while keeping data handling to an absolute minimum.</p>
            <p>This platform is independent and is not operated, managed, or endorsed by Police Scotland. It exists solely to facilitate communication and does not form part of Police Scotland systems or infrastructure.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Information You May Provide</h2>
            <p>This website includes a contact form that allows users to submit information in a clear and structured way to assist an officer in responding.</p>
            <p>Any information you choose to provide is supplied voluntarily and at your own discretion. Users are encouraged to share <strong className="text-slate-200 font-medium">only what is necessary</strong> to allow the officer to understand and respond to the enquiry.</p>
            <p>You should <strong className="text-slate-200 font-medium">not submit sensitive, confidential, or highly personal information</strong> unless you are comfortable doing so. If you are in any doubt, you are encouraged to contact the officer directly using official Police Scotland contact methods.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Data Handling & Storage</h2>
            <p>Only the minimum amount of information required to process and forward your message to the selected officer is handled.</p>
            <p>Information submitted through the contact form is used solely for the purpose of delivering your message. It is not used for marketing, profiling, analytics, or any secondary purpose.</p>
            <p>Data is not retained longer than necessary to complete this process and is not shared with third-party organisations or services beyond what is required to deliver the message.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Security & Risk Acknowledgement</h2>
            <p>Reasonable technical and organisational measures are in place to protect information submitted through this website.</p>
            <p>However, no online service can ever be guaranteed to be completely secure. Risks may arise from factors outside the control of this website, including vulnerabilities in networks, email systems, devices, or third-party service providers.</p>
            <p>By choosing to submit information through this website, you acknowledge and accept that electronic communication carries inherent risks.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Limitation of Responsibility</h2>
            <p>ContactPolice.uk accepts no liability for any loss, unauthorised access, disclosure, interception, or misuse of information that may occur as a result of online transmission, system vulnerabilities, or circumstances beyond the reasonable control of the website operator.</p>
            <p>Users remain responsible for the information they choose to share and do so at their own risk.</p>
            <p>If a matter is urgent, sensitive, or confidential, users should contact the officer directly or use official Police Scotland communication channels.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Tracking & Cookies</h2>
            <p>This website does not use advertising cookies, tracking pixels, or third-party analytics. Any technical cookies used are limited to essential functionality only.</p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-sm italic opacity-70">By using this website, you confirm that you understand and accept the terms outlined in this Privacy Notice.</p>
          </section>

        </div>
      </div>
    </div>
  );
};