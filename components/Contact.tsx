
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
    <section id="contact" className="py-24 sm:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <h2 className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">Contact Me</h2>
            <p className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-10 leading-[1.1]">
              Let's build your <br />
              <span className="text-zinc-700">next idea.</span>
            </p>
            
            <p className="text-lg sm:text-xl text-zinc-400 mb-12 leading-relaxed max-w-lg">
              I am available for new projects, remote collaborations, or full-time 
              opportunities in Lagos and globally.
            </p>

            <div className="space-y-8">
              <a href={SOCIAL_LINKS.email} className="flex items-center gap-6 group max-w-fit">
                <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all shadow-lg group-hover:shadow-indigo-600/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email</div>
                  <div className="text-xl font-bold group-hover:text-indigo-400 transition-colors">olamideolanipekun75@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-6 group max-w-fit">
                <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Phone</div>
                  <div className="text-xl font-bold">08065373055</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group max-w-fit">
                <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Location</div>
                  <div className="text-xl font-bold">Lagos, Nigeria</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-sm">
            {isSuccess && (
              <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-600/40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-2">Message Sent</h3>
                <p className="text-zinc-300">Thanks for reaching out! I'll be in touch soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-600 transition-all text-sm"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-600 transition-all resize-none text-sm"
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-indigo-600/30"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-500 text-xs font-medium tracking-wide">
            © 2024 Olamide Olanipekun. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest">GitHub</a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
