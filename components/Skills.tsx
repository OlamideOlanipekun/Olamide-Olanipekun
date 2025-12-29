import React, { useState } from 'react';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'preparing' | 'optimizing' | 'success'>('idle');

  const handleDownloadCV = () => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('preparing');
    
    // Simulate a professional document generation process
    setTimeout(() => {
      setDownloadStatus('optimizing');
      
      setTimeout(() => {
        const resumeText = `OLAMIDE OLANIPEKUN - TECHNICAL PORTFOLIO 2024\nFull-Stack Developer & Technical Director\n\nExperience: Founder at Midtech Solutions\nEducation: B.Sc. Information Technology (NOUN)\nSkills: React, Next.js, AI Engineering, PHP, Node.js\n\nContact: olamideolanipekun75@gmail.com`.trim(); 
        const blob = new Blob([resumeText], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Olamide_Olanipekun_Portfolio.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setDownloadStatus('success');
        setTimeout(() => setDownloadStatus('idle'), 3000);
      }, 1000);
    }, 1200);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 bg-zinc-50/50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Technical Stack</h2>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 leading-none">
              Modern Toolkit<span className="text-zinc-300">.</span>
            </p>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
            Continuously evolving my stack to leverage the latest in AI-driven development and high-performance web architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name} 
              className="p-6 sm:p-8 bg-white/70 backdrop-blur-sm border border-zinc-200/50 rounded-[2rem] hover:border-indigo-600/30 transition-all group flex flex-col shadow-sm hover:shadow-xl hover:shadow-indigo-600/5 hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block filter grayscale group-hover:grayscale-0">{skill.icon}</div>
              <h3 className="text-sm sm:text-lg font-black mb-1 text-zinc-900 truncate tracking-tight">{skill.name}</h3>
              <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-6">{skill.category}</div>
              
              <div className="mt-auto">
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zinc-900 rounded-full group-hover:bg-indigo-600 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex justify-between items-center text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  <span>Proficiency</span>
                  <span className="text-zinc-900 group-hover:text-indigo-600 transition-colors">{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-16 p-8 sm:p-12 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-900 text-white flex flex-col md:flex-row items-center gap-10 justify-between shadow-2xl shadow-zinc-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
          
          <div className="flex gap-6 items-center relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner border border-white/10 group-hover:rotate-6 transition-transform">
              📄
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-black text-xl sm:text-2xl text-white mb-2 tracking-tight">Technical CV</h4>
              <p className="text-zinc-400 text-sm max-w-xs">Detailed overview of my professional experience and technical leadership.</p>
            </div>
          </div>

          <button 
            onClick={handleDownloadCV}
            disabled={downloadStatus !== 'idle'}
            className={`relative z-10 w-full md:w-auto px-12 py-5 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-90 shadow-2xl active:scale-[0.97] overflow-hidden ${
              downloadStatus === 'success' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {downloadStatus === 'idle' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </>
            )}
            
            {(downloadStatus === 'preparing' || downloadStatus === 'optimizing') && (
              <>
                <div className="w-4 h-4 border-2 border-zinc-900/20 border-t-zinc-900 rounded-full animate-spin"></div>
                <span>{downloadStatus === 'preparing' ? 'Preparing Portfolio...' : 'Optimizing Assets...'}</span>
              </>
            )}

            {downloadStatus === 'success' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Download Complete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;