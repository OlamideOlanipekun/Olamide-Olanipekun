
import React, { useState } from 'react';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    const resumeText = `OLAMIDE OLANIPEKUN - CV CONTENT...`.trim(); // Simplified for length
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Olamide_Olanipekun_CV.txt');
    document.body.appendChild(link);
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 800);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Technical Stack</h2>
          <p className="text-4xl sm:text-5xl font-black tracking-tighter">My Arsenal</p>
        </div>

        {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name} 
              className="p-5 sm:p-8 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-indigo-500/50 transition-all group flex flex-col"
            >
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{skill.icon}</div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-white truncate">{skill.name}</h3>
              <div className="text-[8px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4 sm:mb-6">{skill.category}</div>
              
              <div className="mt-auto">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full group-hover:bg-indigo-400 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between items-center text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                  <span>Level</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 sm:p-10 rounded-[2rem] bg-indigo-600/5 border border-indigo-600/10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center text-xl shrink-0">✨</div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-base sm:text-lg mb-1">Custom Solutions?</h4>
              <p className="text-zinc-500 text-xs sm:text-sm">I'm always expanding my stack to tackle unique challenges.</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className="w-full md:w-auto px-10 py-4.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-indigo-600/20"
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Resume
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
