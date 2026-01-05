import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-indigo-600"></span>
              <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em]">The Manifesto</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] text-zinc-900 mb-8">
              Precision <br />
              Beyond <br />
              <span className="text-zinc-300">The Code.</span>
            </h2>
            
            <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 max-w-fit">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                alt="Olamide Olanipekun" 
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest leading-tight">Olamide Olanipekun</span>
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Founder & Technical Director</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-10 animate-fade-up [animation-delay:200ms]">
            <p className="text-xl sm:text-2xl text-zinc-500 leading-relaxed font-medium">
              Midtech Solutions represents the intersection of technical rigor and creative intuition. Founded by Olamide Olanipekun, we don't just ship products; we architect scalable ecosystems.
            </p>
            <p className="text-zinc-500 leading-relaxed max-w-xl">
              In an era of generic templates, we prioritize custom-engineered solutions. From high-stakes financial dashboards to AI-augmented interfaces, every pixel and logic gate is optimized for performance, security, and growth.
            </p>
            <div className="pt-6">
              <Link 
                to="/about" 
                className="group inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 hover:text-indigo-600 transition-colors"
              >
                Read our story
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;