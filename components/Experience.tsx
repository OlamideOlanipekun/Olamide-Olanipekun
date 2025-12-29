import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Professional Journey</h2>
          <p className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">Experience</p>
        </div>

        <div className="space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-12 md:pl-0">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-100 md:left-1/2"></div>
              
              <div className={`md:flex items-start justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[42%]"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-[-6px] top-0 w-3 h-3 bg-white border-2 border-indigo-600 rounded-full md:left-1/2 md:ml-[-6px] z-10 shadow-sm"></div>
                
                <div className="md:w-[45%] p-8 sm:p-10 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] hover:bg-white transition-all shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-1">{exp.role}</h3>
                      <p className="text-indigo-600 font-bold text-sm">{exp.company}</p>
                    </div>
                    <span className="text-[9px] font-bold px-4 py-1.5 bg-white border border-zinc-200 rounded-full text-zinc-500 uppercase tracking-widest shadow-sm">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-zinc-600 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 bg-indigo-600/30 rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;