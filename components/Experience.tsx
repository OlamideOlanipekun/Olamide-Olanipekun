import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 md:py-40 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-100 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 sm:mb-32">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6 animate-fade-up shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Career Architecture</span>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-8 animate-fade-up [animation-delay:100ms]">
            Professional <br />
            <span className="text-zinc-300">Journey.</span>
          </h2>
          <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl leading-relaxed animate-fade-up [animation-delay:200ms]">
            A chronicle of technical leadership, digital transformation, and the relentless pursuit of high-performance software architecture.
          </p>
        </div>

        <div className="relative">
          {/* Central Digital Spine (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-100 -translate-x-1/2 hidden md:block">
            <div className="sticky top-1/2 w-full h-24 bg-gradient-to-b from-transparent via-indigo-600 to-transparent blur-sm"></div>
          </div>

          <div className="space-y-20 sm:space-y-32">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="group relative">
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-20">
                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white border-4 border-zinc-200 group-hover:border-indigo-600 transition-all duration-500 group-hover:scale-125 shadow-xl"></div>
                    <div className="absolute -inset-4 bg-indigo-600/0 group-hover:bg-indigo-600/10 rounded-full transition-all duration-700 blur-xl"></div>
                  </div>
                </div>

                <div className={`flex flex-col md:flex-row items-start gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Card */}
                  <div className="w-full md:w-[46%] pl-10 md:pl-0">
                    <div className="p-8 sm:p-12 bg-zinc-50 border border-zinc-100 rounded-[3rem] group-hover:bg-white group-hover:border-indigo-600/20 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden">
                      {/* Sub-decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100/50 transition-colors"></div>
                      
                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
                          <div>
                            <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-3">{exp.period}</div>
                            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tighter mb-1">{exp.role}</h3>
                            <p className="text-zinc-500 font-bold text-sm tracking-tight">{exp.company}</p>
                          </div>
                          <div className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm text-lg">
                            {idx === 0 ? '🚀' : idx === 1 ? '💎' : '🎓'}
                          </div>
                        </div>

                        <div className="space-y-6 mb-10">
                          <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Key Impact</h4>
                          <ul className="grid grid-cols-1 gap-4">
                            {exp.description.map((item, i) => (
                              <li key={i} className="flex items-start gap-4 text-[14px] text-zinc-600 leading-relaxed">
                                <span className="mt-2 w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.4)]"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-8 border-t border-zinc-100 flex flex-wrap gap-2">
                           <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-zinc-100 text-zinc-500 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            Technical Leadership
                           </span>
                           <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-zinc-100 text-zinc-500 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            Full-Stack Architecture
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Spacing Placeholder */}
                  <div className="hidden md:block w-[46%] pt-16">
                    <div className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'} opacity-20 group-hover:opacity-100 transition-opacity duration-700`}>
                      <div className="text-[80px] font-black text-zinc-100 select-none leading-none group-hover:text-indigo-100/50 transition-colors">
                        0{idx + 1}
                      </div>
                      <div className="w-12 h-[2px] bg-zinc-100 group-hover:bg-indigo-600 group-hover:w-24 transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center animate-fade-up">
          <p className="text-zinc-400 text-sm font-medium mb-8">Looking for the detailed technical breakdown?</p>
          <a 
            href="#skills" 
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white border border-zinc-200 rounded-2xl text-zinc-900 font-black uppercase tracking-[0.2em] text-[11px] hover:border-zinc-900 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Explore Tech Stack
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;