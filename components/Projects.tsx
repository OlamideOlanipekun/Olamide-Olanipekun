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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
          <div className="max-w-2xl animate-fade-up">
            <h2 className="text-zinc-500 text-sm font-black uppercase tracking-[0.3em] mb-4">Portfolio</h2>
            <p className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
              A selection of my <br /> 
              <span className="text-zinc-800">finest digital works.</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800">
            {Categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Link 
              to={`/work/${project.id}`}
              key={project.id} 
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-zinc-950/80 backdrop-blur-md rounded-full border border-zinc-800">
                  <span className="text-[10px] font-black tracking-widest text-zinc-400">{project.year}</span>
                </div>
                <div className={`absolute inset-0 bg-indigo-600/10 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    View Case Study
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[9px] font-black px-2.5 py-1 rounded-full bg-zinc-800/50 text-zinc-500 uppercase tracking-widest border border-zinc-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-zinc-800/50 mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:text-white transition-colors">
                    READ MORE
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
              className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-800 hover:border-zinc-700 transition-all"
            >
              Explore All Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;