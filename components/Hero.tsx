import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden bg-zinc-950 text-white">
      {/* Dynamic Architectural Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Dots */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
          }}
        ></div>
        
        {/* Large Geometric Accents */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] border border-white/[0.03] rounded-full"
          style={{ transform: `translate(${mousePos.x * 40}px, ${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute top-[20%] -left-[5%] w-[40%] h-[40%] border border-indigo-500/[0.05] rotate-45"
          style={{ transform: `translate(${mousePos.x * -30}px, ${scrollY * -0.05}px)` }}
        ></div>

        {/* Ambient Glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full animate-blob"
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full animate-blob animation-delay-2000"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-up backdrop-blur-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse [animation-delay:200ms]"></span>
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Midtech Operating System v2.5</span>
            </div>

            <h1 className="text-[14vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
              <span className="block animate-fade-up [animation-delay:100ms] text-white">Engineering</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-white to-purple-400 animate-fade-up [animation-delay:200ms] py-2">
                Excellence.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 mb-14 leading-relaxed max-w-2xl animate-fade-up [animation-delay:300ms]">
              Architecting high-stakes digital experiences through <span className="text-white font-medium">precision code</span> and <span className="text-white font-medium">strategic AI integration</span>. Led by founder Olamide Olanipekun, we bridge the gap between complex logic and elite design.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-fade-up [animation-delay:400ms]">
              <a 
                href="#projects" 
                className="group relative px-12 py-6 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] transition-all flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-indigo-500/40 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Deploy Projects</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {/* Button Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </a>
              <a 
                href="#contact" 
                className="px-12 py-6 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] transition-all flex items-center justify-center hover:border-white/20"
              >
                Studio Brief
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block animate-fade-up [animation-delay:500ms]">
            <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl relative group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl shadow-xl shadow-indigo-600/20 group-hover:rotate-12 transition-transform">
                ⚡
              </div>
              <div className="space-y-8">
                <div className="pb-8 border-b border-white/10">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Lead Developer</div>
                  <div className="text-xl font-bold">Olamide Olanipekun</div>
                </div>
                <div className="pb-8 border-b border-white/10">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Architecture</div>
                  <div className="text-zinc-300 text-sm leading-relaxed">Full-Stack Scalable systems with native AI integration layers.</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Current Status: Accepting Q1 Partner
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Board */}
        <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 animate-fade-up [animation-delay:600ms]">
          {[
            { label: 'Deployed Solutions', value: '25+' },
            { label: 'Technical Accuracy', value: '100%' },
            { label: 'System Efficiency', value: '50ms' },
            { label: 'AI Native Code', value: 'Enabled' }
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <div className="text-4xl md:text-5xl font-black mb-3 text-white group-hover:text-indigo-400 transition-colors tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-black leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;