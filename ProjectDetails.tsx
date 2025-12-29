import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from './constants.ts';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-50">
        <h1 className="text-4xl font-black mb-4 text-zinc-900">Project Not Found</h1>
        <Link to="/work" className="text-indigo-600 font-bold hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors mb-16 font-bold uppercase tracking-widest text-[10px]"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12 animate-fade-up">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                  {project.category}
                </span>
                <span className="text-zinc-400 text-[11px] font-bold tracking-widest uppercase">{project.year}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-10 text-zinc-900">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed max-w-lg">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="pt-12 border-t border-zinc-100">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Stack & Tools</h4>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-5 py-3 bg-zinc-50 rounded-2xl text-[11px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-widest shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              {project.link !== '#' && (
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-zinc-900 text-white text-center font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10"
                >
                  Visit Deployment
                </a>
              )}
              <a 
                href={project.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-zinc-900 text-center font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-zinc-50 transition-all border border-zinc-200 shadow-sm"
              >
                View Repository
              </a>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <div className="rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
              <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;