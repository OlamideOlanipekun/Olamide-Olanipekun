
import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">Professional Journey</h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight mb-20">Career Path</p>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-12 md:pl-0">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 md:left-1/2"></div>
              
              <div className={`md:flex items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[45%]"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-[-6px] top-0 w-3 h-3 bg-indigo-600 rounded-full border-4 border-zinc-950 md:left-1/2 md:ml-[-6px]"></div>
                
                <div className="md:w-[45%] p-8 bg-zinc-900 border border-zinc-800 rounded-3xl hover:bg-zinc-900/80 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-indigo-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-zinc-800 rounded-full text-zinc-500 uppercase tracking-widest">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0"></span>
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
