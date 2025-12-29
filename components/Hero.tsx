
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[9px] sm:text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Website Developer | AI Proficiency</span>
          </div>

          <h1 className="text-[12vw] sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 flex flex-col">
            <span className="animate-fade-up [animation-delay:150ms] text-zinc-100">Olamide</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-fade-up [animation-delay:300ms]">
              Olanipekun
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl animate-fade-up [animation-delay:450ms]">
            I build high-performance software that bridges the gap between clean 
            architecture and exceptional user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:600ms]">
            <a 
              href="#projects" 
              className="px-8 py-4.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/20"
            >
              Explore Work
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4.5 sm:py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 active:scale-95 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Mobile-Optimized Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-20 pt-12 border-t border-zinc-900/50 animate-fade-up [animation-delay:800ms]">
          <div>
            <div className="text-3xl font-black mb-1 text-white">25+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Success Stories</div>
          </div>
          <div>
            <div className="text-3xl font-black mb-1 text-white">9+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Tech Mastery</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-3xl font-black mb-1 text-white">50%</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Performance Boost</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-3xl font-black mb-1 text-white">AI</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Native Dev</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
