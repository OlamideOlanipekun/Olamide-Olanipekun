import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-6 sm:mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest">Website Developer | AI Proficiency</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[1] mb-8 flex flex-col">
            <span className="animate-fade-up [animation-delay:150ms]">Olamide</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-fade-up [animation-delay:300ms]">
              Olanipekun
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl animate-fade-up [animation-delay:450ms]">
            I build high-quality, responsive software applications that combine clean, 
            maintainable code with user-centred design — delivering measurable value 
            to clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:600ms]">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20"
            >
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Stats - Based on Experience */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 sm:mt-24 pt-12 border-t border-zinc-900 animate-fade-up [animation-delay:800ms]">
          <div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">25+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-medium">Projects Launched</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">9+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-medium">Tech Tools</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">50%</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-medium">Speed Optimization</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">AI</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-medium">Proficiency</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;