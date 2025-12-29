import React, { useState, useEffect } from 'react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1200);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Icon */}
        <div className="mb-12 relative">
          <div className="w-16 h-16 bg-white text-zinc-950 rounded-2xl flex items-center justify-center text-2xl font-black shadow-[0_0_40px_rgba(255,255,255,0.1)] animate-pulse">
            M
          </div>
          <div className="absolute -inset-4 border border-white/5 rounded-[2rem] animate-spin [animation-duration:10s]"></div>
        </div>

        {/* Brand Text */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="text-white text-[10px] font-black uppercase tracking-[0.6em] mb-2 translate-y-0 animate-fade-up">
            Midtech Solutions
          </h2>
          <div className="text-zinc-500 text-[8px] font-bold uppercase tracking-[0.3em] opacity-60">
            Digital Excellence Studio
          </div>
        </div>

        {/* Progress Section */}
        <div className="w-48">
          <div className="flex justify-between items-end mb-3">
            <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">System Boot</span>
            <span className="text-indigo-500 text-[11px] font-black mono">{Math.floor(progress)}%</span>
          </div>
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-10 text-white/5 text-[10px] font-black uppercase tracking-widest pointer-events-none">
        Architecting the future
      </div>
      <div className="absolute bottom-10 right-10 text-white/5 text-[10px] font-black uppercase tracking-widest pointer-events-none">
        © {new Date().getFullYear()} Midtech Solutions
      </div>
    </div>
  );
};

export default Preloader;