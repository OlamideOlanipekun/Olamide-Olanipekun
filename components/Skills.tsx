
import React, { useState } from 'react';
import { SKILLS } from '../constants.ts';

const Skills: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    // Resume content extracted and formatted from provided OCR/Screenshots
    const resumeText = `
OLAMIDE OLANIPEKUN
Website Developer | Code Craftsman | AI proficiency
Lagos, Nigeria · 08065373055 · olamideolanipekun75@gmail.com

CAREER OBJECTIVE
To build high-quality, responsive software applications that combine clean, maintainable 
code with user-centred design — delivering measurable value to clients and continuously 
improving through learning and collaboration.

CORE SKILLS, KNOWLEDGE & ABILITIES
- Front-end: HTML5, CSS3, JavaScript, Bootstrap, Tailwind, React, Typescript, Next.js
- Back-end: PHP, Node.js, MySQL
- Responsive & mobile-first design
- Version control: Git
- Performance tuning & basic SEO
- Rapid prototyping & debugging
- Client communication & project handover
- Mentoring junior developers

WORK EXPERIENCE
Morthtech Solutions, Lagos — Front-End and Back-End Developer
Oct 2024 – Present
- Developed and launched 25+ responsive websites using HTML5, CSS3, JavaScript and PHP.
- Improved site performance (load times) and cross-device compatibility.
- Trained junior developers and introduced modern coding standards and workflows.
- Managed deployments and basic hosting/domain configuration.

Technova (Remote) — Web Developer
Jan 2024 – Present
- Managed client projects from concept to deployment with a mobile-first approach.
- Performed website audits and fixed bugs; improved load times by up to 50%.
- Provided post-launch support and client training.

FEATURED PROJECTS
WaveCrest Financial — Investment & Financial Services Website
Tech: HTML, CSS, JavaScript, Bootstrap, PHP 
Live: https://wavecrestfinancial.net/

Quantum FTX Chain — Crypto & Blockchain Platform
Tech: HTML, CSS, JavaScript, PHP 
Live: https://quantumftxchain.com/

Rocket English — Online Education & Language Learning Platform
Tech: HTML, CSS, JavaScript
Live: https://rocketenglish.ru/

CERTIFICATIONS
- HTML Essentials – CISCO
- CSS Essentials – CISCO
- How to Get into Web Development – University of Leeds
- Simple Coding – The Open University, London
- Introduction to Software Development – The Open University, London
- Create a Social Media Marketing Campaign – University of Leeds
- Data Analysis and Data Science – HP Life
- Safeguarding for Activity Staff – British Council

EDUCATION
National Open University of Nigeria — B.Sc. Information Technology (In view), 2025

TECH TOOLBOX (AI)
- AI Skills: Prompt engineering, AI automation, AI model integration
- AI Tools: OpenAI APIs, Google AI Studio, Gemini, HuggingFace, LangChain

LANGUAGES
English — Fluent | Yoruba — Native
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Olamide_Olanipekun_CV.txt');
    document.body.appendChild(link);
    
    // Simulate a brief delay for professional feel
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 800);
  };

  return (
    <section id="skills" className="py-32 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">Core Competencies</h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight">Technical Arsenal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name} 
              className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-indigo-500/50 transition-all group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{skill.icon}</div>
              <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6">{skill.category}</div>
              
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full group-hover:bg-indigo-400 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="mt-3 flex justify-between items-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-indigo-600/10 border border-indigo-600/20 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
            <div>
              <h4 className="font-bold text-lg">Looking for something specific?</h4>
              <p className="text-zinc-400 text-sm">I'm always learning and expanding my stack to solve complex problems.</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-3 active:scale-95 disabled:opacity-70"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full CV
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
