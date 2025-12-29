
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants.ts';

interface ProjectsProps {
  limit?: number;
}

const Categories = ['All', 'Web', 'Mobile', 'Design', 'AI'] as const;
type Category = typeof Categories[number];

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    let base = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
    return limit ? base.slice(0, limit) : base;
  }, [activeCategory, limit]);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl animate-fade-up">
            <h2 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Case Studies</h2>
            <p className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] mb-2">
              Recent <span className="text-zinc-800">Works.</span>
            </p>
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 w-screen sm:w-auto">
            <div className="flex gap-2 p-1.5 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50">
              {Categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <Link 
              to={`/work/${project.id}`}
              key={project.id} 
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full animate-fade-up active:scale-[0.98]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-md rounded-full border border-zinc-800">
                  <span className="text-[9px] font-black tracking-[0.1em] text-zinc-400">{project.year}</span>
                </div>
                <div className={`absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 md:opacity-0 ${
                  hoveredId === project.id ? 'md:opacity-100' : ''
                } hidden md:flex`}>
                  <span className="px-6 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    View Project
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-10 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[8px] font-black px-2 py-0.5 rounded-full bg-indigo-600/10 text-indigo-400 uppercase tracking-widest border border-indigo-600/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-indigo-400 transition-colors tracking-tight text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="pt-5 border-t border-zinc-800/50 mt-auto flex items-center justify-between">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                    Study
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {limit && (
          <div className="mt-16 text-center animate-fade-up">
            <Link 
              to="/work" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
            >
              Browse All Work
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
