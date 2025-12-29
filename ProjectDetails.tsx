import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from './constants.ts';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/work" className="text-indigo-400 font-bold hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-xs"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Work
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10 animate-fade-up">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-500/20">
                  {project.category}
                </span>
                <span className="text-zinc-500 text-xs font-bold">{project.year}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-8">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="pt-10 border-t border-zinc-900">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Core Technologies</h4>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-5 py-3 bg-zinc-900 rounded-2xl text-sm font-bold text-zinc-300 border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.link !== '#' && (
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-black text-center font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
                >
                  Visit Live Site
                </a>
              )}
              <a 
                href={project.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-zinc-900 text-white text-center font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-zinc-800 transition-all border border-zinc-800"
              >
                View Source Code
              </a>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <div className="rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl">
              <img src={project.imageUrl} alt={project.title} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;