import React, { useState } from 'react';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'preparing' | 'optimizing' | 'success'>('idle');

  const handleDownloadCV = () => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('preparing');
    
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
    <section id="skills" className="py-24 sm:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Background Cyber-grid Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-50 via-transparent to-zinc-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Capabilities</h2>
            <p className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-8">
              Modern Toolkit<span className="text-zinc-300">.</span>
            </p>
            <p className="text-zinc-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Architecting solutions with a stack that prioritizes performance, scalability, and seamless AI integration.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="px-5 py-3 bg-white border border-zinc-200 rounded-2xl shadow-sm flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Focus: AI Native Apps</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SKILLS.map((skill, idx) => (
            <div 
              key={skill.name} 
              className={`p-8 sm:p-10 bg-white border border-zinc-200/60 rounded-[2.5rem] hover:border-indigo-600/40 transition-all group flex flex-col shadow-sm hover:shadow-2xl hover:shadow-indigo-600/10 hover:-translate-y-2 relative overflow-hidden animate-fade-up`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-inner border border-zinc-100">
                {skill.icon}
              </div>
              
              <div className="mb-auto">
                <h3 className="text-xl font-black mb-1 text-zinc-900 tracking-tight">{skill.name}</h3>
                <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-8">{skill.category}</div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                  <span>Proficiency</span>
                  <span className="text-zinc-900 group-hover:text-indigo-600 transition-colors font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden p-[2px]">
                  <div 
                    className="h-full bg-gradient-to-r from-zinc-900 to-zinc-700 rounded-full group-hover:from-indigo-600 group-hover:to-purple-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(79,70,229,0)] group-hover:shadow-[0_0_12px_rgba(79,70,229,0.3)]"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-20 p-8 sm:p-16 rounded-[3rem] lg:rounded-[4rem] bg-zinc-900 text-white flex flex-col lg:flex-row items-center gap-12 justify-between shadow-3xl shadow-zinc-900/40 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center relative z-10 text-center sm:text-left">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-3xl shrink-0 shadow-2xl border border-white/10 group-hover:rotate-12 transition-all duration-500 group-hover:scale-110">
              ⚡
            </div>
            <div>
              <h4 className="font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-3 tracking-tighter">Technical Resume</h4>
              <p className="text-zinc-400 text-base max-w-sm leading-relaxed">Download a comprehensive deep-dive into my architecture patterns and professional history.</p>
            </div>
          </div>

          <button 
            onClick={handleDownloadCV}
            disabled={downloadStatus !== 'idle'}
            className={`relative z-10 w-full lg:w-auto px-16 py-6 font-black uppercase tracking-[0.25em] text-[12px] rounded-2xl transition-all duration-500 flex items-center justify-center gap-5 disabled:opacity-90 shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-[0.96] overflow-hidden ${
              downloadStatus === 'success' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-zinc-900 hover:bg-zinc-100 hover:shadow-white/10'
            }`}
          >
            {downloadStatus === 'idle' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </>
            )}
            
            {(downloadStatus === 'preparing' || downloadStatus === 'optimizing') && (
              <>
                <div className="w-5 h-5 border-[3px] border-zinc-900/20 border-t-zinc-900 rounded-full animate-spin"></div>
                <span className="animate-pulse">{downloadStatus === 'preparing' ? 'Compiling History...' : 'Optimizing CV...'}</span>
              </>
            )}

            {downloadStatus === 'success' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Success</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;