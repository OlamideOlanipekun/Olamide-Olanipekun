import React, { useState } from 'react';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    const resumeText = `OLAMIDE OLANIPEKUN - CV CONTENT...`.trim(); 
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
    <section id="skills" className="py-24 sm:py-32 bg-zinc-50/50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Technical Stack</h2>
          <p className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-900">Expertise</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name} 
              className="p-6 sm:p-8 bg-white border border-zinc-100 rounded-[2rem] hover:border-indigo-600/20 transition-all group flex flex-col shadow-sm hover:shadow-md"
            >
              <div className="text-3xl sm:text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block filter grayscale group-hover:grayscale-0">{skill.icon}</div>
              <h3 className="text-sm sm:text-lg font-bold mb-1 text-zinc-900 truncate">{skill.name}</h3>
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-6">{skill.category}</div>
              
              <div className="mt-auto">
                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="mt-3 flex justify-between items-center text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 sm:p-12 rounded-[2.5rem] bg-white border border-zinc-200 flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm">
          <div className="flex gap-5 items-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl shrink-0">✨</div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg text-zinc-900 mb-1">Looking for a specific skill?</h4>
              <p className="text-zinc-500 text-sm">I am adaptable and quick to master new technical requirements.</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className="w-full md:w-auto px-10 py-4.5 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-zinc-900/10"
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;