import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden bg-zinc-50">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-zinc-200 mb-8 animate-fade-up shadow-sm">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Midtech Solutions</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Founded by Olamide Olanipekun</span>
          </div>

          <h1 className="text-[12vw] sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 flex flex-col">
            <span className="animate-fade-up [animation-delay:150ms] text-zinc-900">Midtech</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 animate-fade-up [animation-delay:300ms]">
              Solutions.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-12 leading-relaxed max-w-2xl animate-fade-up [animation-delay:450ms]">
            Architecting high-stakes digital experiences through precision code 
            and strategic AI integration. We build the future of the web, led by 
            founder Olamide Olanipekun.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 animate-fade-up [animation-delay:600ms]">
            <a 
              href="#projects" 
              className="px-10 py-5 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-zinc-900/10"
            >
              View Studio Work
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#contact" 
              className="px-10 py-5 bg-white hover:bg-zinc-50 border border-zinc-200 active:scale-95 text-zinc-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center shadow-sm"
            >
              Studio Inquiry
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-12 border-t border-zinc-200 animate-fade-up [animation-delay:800ms]">
          <div>
            <div className="text-4xl font-black mb-1 text-zinc-900">25+</div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-black">Platforms Launched</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-1 text-zinc-900">100%</div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-black">Founder Involvement</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-4xl font-black mb-1 text-zinc-900">50%</div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-black">Speed Optimization</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-4xl font-black mb-1 text-zinc-900">AI</div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-black">First Solutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;