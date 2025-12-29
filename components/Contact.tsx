import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Inquiry</h2>
            <p className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[1.05] text-zinc-900">
              Launch your <br />
              <span className="text-zinc-300">vision here.</span>
            </p>
            
            <p className="text-lg text-zinc-600 mb-14 leading-relaxed max-w-md">
              Midtech Solutions is currently accepting high-impact project partnerships for Q4 2024 and beyond.
            </p>

            <div className="space-y-10">
              <a href={SOCIAL_LINKS.email} className="flex items-center gap-6 group max-w-fit">
                <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all shadow-sm">
                  <svg className="text-zinc-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Direct Channel</div>
                  <div className="text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors">olamideolanipekun75@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-6 group max-w-fit">
                <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Founder Direct</div>
                  <div className="text-lg font-black text-zinc-900">08065373055</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-8 sm:p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-zinc-200/50">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-zinc-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-2">Inquiry Logged</h3>
                <p className="text-zinc-500 text-sm">Our studio will review your brief and respond within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Company / Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all text-sm text-zinc-900"
                    placeholder="Enter details"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Corporate Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all text-sm text-zinc-900"
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Project Brief</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all resize-none text-sm text-zinc-900"
                  placeholder="Tell us about your technical requirements..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-zinc-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-zinc-900/10"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Submit Inquiry
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-400 text-[10px] font-black tracking-[0.3em] uppercase">
            © 2024 Midtech Solutions. Lead by Olamide Olanipekun.
          </div>
          <div className="flex gap-10">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-widest">LinkedIn</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-black uppercase tracking-widest">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;