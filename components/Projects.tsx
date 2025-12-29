import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROJECTS } from '../constants.ts';

interface ProjectsProps {
  limit?: number;
}

const Categories = ['All', 'Web', 'Mobile', 'Design', 'AI'] as const;
type Category = typeof Categories[number];

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();
  const isWorkPage = location.pathname === '/work';

  const filteredProjects = useMemo(() => {
    let base = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
    return limit ? base.slice(0, limit) : base;
  }, [activeCategory, limit]);

  return (
    <section id="projects" className={`py-24 sm:py-32 bg-white relative overflow-hidden ${isWorkPage ? 'pt-0' : ''}`}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          {!isWorkPage && (
            <div className="max-w-2xl animate-fade-up">
              <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Case Studies</h2>
              <p className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] mb-2 text-zinc-900">
                Selected <span className="text-zinc-300">Work.</span>
              </p>
            </div>
          )}
          
          <div className={`flex overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 w-screen sm:w-auto ${isWorkPage ? 'w-full' : ''}`}>
            <div className="flex gap-2 p-1.5 bg-zinc-50 rounded-2xl border border-zinc-200">
              {Categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-white text-zinc-900 shadow-md' 
                      : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredProjects.map((project, idx) => (
            <Link 
              to={`/work/${project.id}`}
              key={project.id} 
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden hover:border-indigo-600/20 transition-all duration-500 flex flex-col h-full animate-fade-up shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] active:scale-[0.98]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-5 left-5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-zinc-200 shadow-sm">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-900 uppercase">{project.year}</span>
                </div>
                <div className={`absolute inset-0 bg-indigo-600/5 backdrop-blur-[1px] flex items-center justify-center transition-all duration-500 md:opacity-0 ${
                  hoveredId === project.id ? 'md:opacity-100' : ''
                } hidden md:flex`}>
                  <span className="px-6 py-3 bg-zinc-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl">
                    Full Case Study
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] font-bold px-3 py-1 rounded-full bg-zinc-50 text-zinc-500 uppercase tracking-widest border border-zinc-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors tracking-tight text-zinc-900 leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-zinc-100 mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                    View
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
          <div className="mt-20 text-center animate-fade-up">
            <Link 
              to="/work" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-5 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-900/10"
            >
              Browse Full Portfolio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;