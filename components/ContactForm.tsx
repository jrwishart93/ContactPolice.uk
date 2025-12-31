import React, { useState, useEffect, useRef } from 'react';
import { OfficerDetails, EnquiryType, VehicleDetail, InjuredPerson } from '../types';

interface ContactFormProps {
  officer: OfficerDetails;
  onBack: () => void;
}

/**
 * STABLE HELPER COMPONENTS
 * Defined outside the main component to prevent re-mounting on state updates
 */

const Label = ({ text, required = false }: { text: string; required?: boolean }) => (
  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    style={{ colorScheme: 'dark', ...props.style }}
    className={`w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-700/30 ${props.type === 'date' || props.type === 'time' ? 'cursor-pointer' : ''}`}
  />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea 
    {...props}
    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-700/30 resize-none"
  />
);

// Custom modern dropdown component
const CustomDropdown: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}> = ({ label, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div 
      className={`relative transition-all duration-300 ${isOpen ? 'z-[100]' : 'z-10'}`} 
      ref={containerRef}
    >
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white/[0.05] border rounded-xl px-5 py-4 text-sm text-white transition-all duration-300 hover:bg-white/[0.08] ${
          isOpen ? 'border-blue-500/60 ring-4 ring-blue-500/10 scale-[1.01] bg-white/[0.08]' : 'border-white/10'
        }`}
      >
        <span className="font-semibold tracking-wide">{selectedOption?.label}</span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-500/20 rotate-180' : 'bg-white/5'}`}>
          <svg 
            className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-slate-500'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 right-0 mt-3 p-2 rounded-2xl bg-[#121212] border border-white/20 backdrop-blur-[80px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9)] animate-glass-enter origin-top"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 30px 60px -12px rgba(0,0,0,0.9)' }}
        >
          <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all group ${
                  value === option.value 
                    ? 'bg-blue-600/30 text-white font-bold' 
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="tracking-wide">{option.label}</span>
                {value === option.value && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ContactForm: React.FC<ContactFormProps> = ({ officer, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('General Enquiry');

  // Core Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    flatNumber: '',
    houseNumber: '',
    street: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    incidentDate: '',
    incidentTime: '',
    referenceNumber: '',
    incidentLocation: '',
    incidentType: 'Road Traffic Collision',
    message: '',
    numVehicles: '1',
    numInjured: '0',
    wasAnyoneInjured: 'No',
    finalDescription: ''
  });

  const [vehicles, setVehicles] = useState<VehicleDetail[]>([]);
  const [injuredPeople, setInjuredPeople] = useState<InjuredPerson[]>([]);

  useEffect(() => {
    const count = parseInt(formData.numVehicles);
    setVehicles(prev => {
      const next = [...prev];
      if (next.length < count) {
        for (let i = next.length; i < count; i++) {
          next.push({ registration: '', make: '', model: '', colour: '', damaged: 'No' });
        }
      } else {
        return next.slice(0, count);
      }
      return next;
    });
  }, [formData.numVehicles]);

  useEffect(() => {
    const count = parseInt(formData.numInjured);
    setInjuredPeople(prev => {
      const next = [...prev];
      if (next.length < count) {
        for (let i = next.length; i < count; i++) {
          next.push({ name: '', age: '', contact: '', description: '' });
        }
      } else {
        return next.slice(0, count);
      }
      return next;
    });
  }, [formData.numInjured]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (index: number, field: keyof VehicleDetail, value: any) => {
    setVehicles(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleInjuredChange = (index: number, field: keyof InjuredPerson, value: string) => {
    setInjuredPeople(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-glass-enter">
        <div className="max-w-md w-full p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Enquiry Sent</h2>
          <p className="text-slate-400 leading-relaxed">
            Your enquiry has been successfully formatted and delivered to {officer.rank} {officer.name}.
          </p>
          <div className="pt-6 border-t border-white/5 space-y-4">
             <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Guidance</p>
             <p className="text-xs text-slate-400">Please allow up to 72 hours for a response depending on the officer's shift pattern.</p>
             <button 
               onClick={onBack}
               className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform"
             >
               Return to Profile
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-48 px-6 max-w-3xl mx-auto animate-glass-enter">
      <header className="mb-12 space-y-4">
        <button 
          onClick={onBack}
          className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Back to Profile
        </button>
        <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">Contact {officer.rank} {officer.name}</h1>
        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-start gap-4">
          <div className="p-2 rounded-lg bg-red-500/20">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-red-200/90 leading-relaxed font-bold uppercase tracking-widest">
              THIS FORM IS NOT FOR REPORTING CRIME. <br/>FOR EMERGENCIES CALL 999.
            </p>
            <p className="text-[10px] text-red-300/60 font-medium">
              This is an independent website and not an official Police Scotland service.
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative z-[30]">
          <h2 className="text-lg font-bold text-white tracking-tight">1. Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label text="First Name" required />
              <Input name="firstName" value={formData.firstName} required onChange={handleInputChange} />
            </div>
            <div>
              <Label text="Last Name" required />
              <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} />
            </div>
            <div className="sm:col-span-2 grid grid-cols-3 gap-6">
              <div>
                <Label text="Flat No" />
                <Input name="flatNumber" value={formData.flatNumber} onChange={handleInputChange} />
              </div>
              <div className="col-span-2">
                <Label text="House No / Name" required />
                <Input name="houseNumber" value={formData.houseNumber} required onChange={handleInputChange} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label text="Street" required />
              <Input name="street" value={formData.street} required onChange={handleInputChange} />
            </div>
            <div>
              <Label text="City" required />
              <Input name="city" value={formData.city} required onChange={handleInputChange} />
            </div>
            <div>
              <Label text="Postcode" required />
              <Input name="postcode" value={formData.postcode} required onChange={handleInputChange} />
            </div>
            <div>
              <Label text="Telephone" required />
              <Input name="phone" value={formData.phone} type="tel" required onChange={handleInputChange} />
            </div>
            <div>
              <Label text="Email Address" required />
              <Input name="email" value={formData.email} type="email" required onChange={handleInputChange} />
            </div>
          </div>
        </section>

        <section className="space-y-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative z-[20]">
          <h2 className="text-lg font-bold text-white tracking-tight">2. Enquiry Type</h2>
          <CustomDropdown 
            label="Nature of Enquiry"
            required
            value={enquiryType}
            onChange={(val) => setEnquiryType(val as EnquiryType)}
            options={[
              { value: 'General Enquiry', label: 'General Enquiry' },
              { value: 'Request for Further Information', label: 'Request for Further Information' },
              { value: 'Provide Further Information', label: 'Provide Further Information' },
              { value: 'Other', label: 'Other' }
            ]}
          />
        </section>

        <section className="space-y-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative z-[10]">
          <h2 className="text-lg font-bold text-white tracking-tight">3. Enquiry Details</h2>
          
          {(enquiryType === 'General Enquiry' || enquiryType === 'Other') && (
            <div className="space-y-6">
              <div>
                <Label text="Reference Number (If known)" />
                <Input name="referenceNumber" value={formData.referenceNumber} onChange={handleInputChange} />
              </div>
              <div>
                <Label text="Message" required />
                <TextArea name="message" value={formData.message} rows={6} maxLength={800} placeholder="Type your message here..." required onChange={handleInputChange} />
                <div className="text-right text-[10px] font-mono text-slate-500 mt-2">{formData.message.length}/800</div>
              </div>
            </div>
          )}

          {enquiryType === 'Request for Further Information' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label text="Date of Incident" />
                  <Input name="incidentDate" type="date" value={formData.incidentDate} onChange={handleInputChange} />
                </div>
                <div>
                  <Label text="Approx Time" />
                  <Input name="incidentTime" type="time" value={formData.incidentTime} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label text="Location" />
                  <Input name="incidentLocation" value={formData.incidentLocation} placeholder="High Street Jct..." onChange={handleInputChange} />
                </div>
                <div>
                  <Label text="Type of Incident" />
                  <Input name="incidentType" value={formData.incidentType} placeholder="e.g. Traffic" onChange={handleInputChange} />
                </div>
              </div>
              <div>
                <Label text="What information are you requesting?" required />
                <TextArea name="message" value={formData.message} rows={6} maxLength={800} placeholder="Be as specific as possible..." required onChange={handleInputChange} />
                <div className="text-right text-[10px] font-mono text-slate-500 mt-2">{formData.message.length}/800</div>
              </div>
            </div>
          )}

          {enquiryType === 'Provide Further Information' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label text="Date" required />
                  <Input name="incidentDate" type="date" value={formData.incidentDate} required onChange={handleInputChange} />
                </div>
                <div>
                  <Label text="Time" required />
                  <Input name="incidentTime" type="time" value={formData.incidentTime} required onChange={handleInputChange} />
                </div>
                <div className="sm:col-span-2">
                  <Label text="Location" required />
                  <Input name="incidentLocation" value={formData.incidentLocation} placeholder="Street name / Landmarks" required onChange={handleInputChange} />
                </div>
                <div className="sm:col-span-2">
                  <CustomDropdown 
                    label="Incident Type"
                    required
                    value={formData.incidentType}
                    onChange={(val) => setFormData(prev => ({ ...prev, incidentType: val }))}
                    options={[
                      { value: 'Road Traffic Collision', label: 'Road Traffic Collision' },
                      { value: 'Other', label: 'Other' }
                    ]}
                  />
                </div>
              </div>

              {formData.incidentType === 'Road Traffic Collision' && (
                <div className="space-y-12 pt-8 border-t border-white/5">
                  <div className="relative z-50">
                    <CustomDropdown 
                      label="How many vehicles were involved?"
                      value={formData.numVehicles}
                      onChange={(val) => setFormData(prev => ({ ...prev, numVehicles: val }))}
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: 'More than 4' }
                      ]}
                    />
                  </div>

                  {vehicles.map((v, idx) => (
                    <div key={idx} className="space-y-6 p-7 rounded-3xl bg-white/[0.01] border border-white/5 relative" style={{ zIndex: 40 - idx }}>
                      <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">Vehicle {idx + 1}</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 sm:col-span-1">
                          <Label text="Registration" />
                          <Input value={v.registration} onChange={(e) => handleVehicleChange(idx, 'registration', e.target.value)} />
                        </div>
                        <div>
                          <Label text="Make" />
                          <Input value={v.make} onChange={(e) => handleVehicleChange(idx, 'make', e.target.value)} />
                        </div>
                        <div>
                          <Label text="Model" />
                          <Input value={v.model} onChange={(e) => handleVehicleChange(idx, 'model', e.target.value)} />
                        </div>
                        <div>
                          <Label text="Colour" />
                          <Input value={v.colour} onChange={(e) => handleVehicleChange(idx, 'colour', e.target.value)} />
                        </div>
                        <div className="col-span-2">
                          <Label text="Damaged?" />
                          <div className="flex gap-3">
                            {['Yes', 'No'].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleVehicleChange(idx, 'damaged', opt as any)}
                                className={`flex-1 py-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${v.damaged === opt ? 'bg-white text-black border-white shadow-xl' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/20'}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        {v.damaged === 'Yes' && (
                          <div className="col-span-2 animate-glass-enter">
                            <Label text="Description of Damage" />
                            <TextArea rows={2} value={v.damageDescription} onChange={(e) => handleVehicleChange(idx, 'damageDescription', e.target.value)} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-8 pt-8 border-t border-white/5 relative z-10">
                    <div>
                      <Label text="Was anyone injured?" />
                      <div className="flex gap-3">
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, wasAnyoneInjured: opt }))}
                            className={`flex-1 py-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.wasAnyoneInjured === opt ? 'bg-white text-black border-white shadow-xl' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/20'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.wasAnyoneInjured === 'Yes' && (
                      <div className="space-y-8 animate-glass-enter">
                        <CustomDropdown 
                          label="How many people were injured?"
                          value={formData.numInjured}
                          onChange={(val) => setFormData(prev => ({ ...prev, numInjured: val }))}
                          options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3 (Max)' }
                          ]}
                        />

                        {injuredPeople.map((p, idx) => (
                          <div key={idx} className="space-y-6 p-7 rounded-3xl bg-white/[0.01] border border-white/5">
                            <h3 className="text-xs font-bold text-red-400 uppercase tracking-[0.3em]">Injured Person {idx + 1}</h3>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="col-span-2">
                                <Label text="Full Name" />
                                <Input value={p.name} onChange={(e) => handleInjuredChange(idx, 'name', e.target.value)} />
                              </div>
                              <div>
                                <Label text="Approx Age" />
                                <Input value={p.age} onChange={(e) => handleInjuredChange(idx, 'age', e.target.value)} />
                              </div>
                              <div>
                                <Label text="Contact Details" />
                                <Input value={p.contact} onChange={(e) => handleInjuredChange(idx, 'contact', e.target.value)} />
                              </div>
                              <div className="col-span-2">
                                <Label text="Description of Injury" />
                                <TextArea rows={2} value={p.description} onChange={(e) => handleInjuredChange(idx, 'description', e.target.value)} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-white/5 relative z-0">
                <Label text="Please describe what happened" required />
                <TextArea name="finalDescription" value={formData.finalDescription} rows={6} maxLength={500} required onChange={handleInputChange} />
                <div className="text-right text-[10px] font-mono text-slate-500 mt-2">{formData.finalDescription.length}/500</div>
              </div>
            </div>
          )}
        </section>

        <div className="space-y-6 pt-4 relative z-0">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <p className="text-[10px] text-red-200/80 text-center font-bold uppercase tracking-wider leading-relaxed">
              This is an independent website and not an official Police Scotland service.<br/>
              Do not use this form to report crime or emergencies.
            </p>
          </div>
          
          <p className="text-[10px] text-slate-500 text-center uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto opacity-70">
            By sending this enquiry, you agree to our privacy policy. Your information is delivered directly to the officer and not stored on our platform.
          </p>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-[0.3em] text-[11px] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-2xl shadow-white/5"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Send Enquiry"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};