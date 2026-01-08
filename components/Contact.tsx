import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { api } from '../utils/api';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Submit email via Web3Forms (Client-side)
      const formData = new FormData();
      formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('subject', `New Inquiry from ${formState.name} | Midtech Portfolio`);

      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const web3Result = await web3Response.json();
      if (!web3Result.success) throw new Error(web3Result.message);

      // 2. Save data to Backend DB (Ignore errors here so user still gets success message)
      try {
        await api.post('/inquiries', {
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Inquiry from ${formState.name} | Midtech Portfolio`
        });
      } catch (dbError) {
        console.error("Backend DB save failed (non-critical):", dbError);
      }

      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-zinc-50 border border-zinc-200 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-zinc-900 focus:bg-white focus:-translate-y-1 focus:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 text-sm text-zinc-900 placeholder:text-zinc-400";

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="animate-fade-up">
            <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Inquiry</h2>
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 sm:mb-10 leading-[1.05] text-zinc-900">
              Launch your <br />
              <span className="text-zinc-300">vision here.</span>
            </p>

            <p className="text-base sm:text-lg text-zinc-600 mb-10 sm:mb-14 leading-relaxed max-w-md">
              Midtech Solutions is currently accepting high-impact project partnerships for 2025 and beyond. We specialize in digital transformation.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <a href={SOCIAL_LINKS.email} className="flex items-center gap-4 sm:gap-6 group max-w-full sm:max-w-fit">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all shadow-sm flex-shrink-0">
                  <svg className="text-zinc-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Direct Channel</div>
                  <div className="text-base sm:text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors truncate">olamideolanipekun75@gmail.com</div>
                </div>
              </a>

              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 group max-w-full sm:max-w-fit">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] transition-all shadow-sm flex-shrink-0">
                  <svg className="text-zinc-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.046c0 2.121.54 4.19 1.57 6.05L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.632 0 12.042-5.411 12.047-12.05a11.755 11.755 0 00-3.517-8.422z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Instant Chat</div>
                  <div className="text-base sm:text-lg font-black text-zinc-900 group-hover:text-[#25D366] transition-colors truncate">+234 912 999 7137</div>
                </div>
              </a>

              <div className="flex items-center gap-4 sm:gap-6 group max-w-full sm:max-w-fit">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg className="text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Founder Direct</div>
                  <div className="text-base sm:text-lg font-black text-zinc-900">08065373055</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-zinc-200/50 animate-fade-up [animation-delay:200ms]">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6 sm:p-8 animate-in fade-in duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-zinc-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-2">Inquiry Logged</h3>
                <p className="text-zinc-500 text-sm">Your message has been sent. We will review your brief and respond within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2 group/field">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 group-focus-within/field:text-zinc-900 transition-colors duration-300">Company / Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className={inputClasses}
                    placeholder="Enter details"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 group/field">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 group-focus-within/field:text-zinc-900 transition-colors duration-300">Corporate Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className={inputClasses}
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2 group/field">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 group-focus-within/field:text-zinc-900 transition-colors duration-300">Project Brief</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className={inputClasses + " resize-none"}
                  placeholder="Tell us about your technical requirements..."
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                ></textarea>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold uppercase tracking-wider animate-shake">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 bg-zinc-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 shadow-xl shadow-zinc-900/10 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-[10px] sm:text-[11px]">Submit Inquiry</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;