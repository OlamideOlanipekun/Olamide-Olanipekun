import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROJECTS } from '../constants.ts';

interface ProjectsProps {
  limit?: number;
}

const Categories = ['All', 'Web', 'Mobile', 'Design', 'AI'] as const;
type Category = typeof Categories[number];

const CategoryMeta: Record<Category, string> = {
  'All': 'Complete studio portfolio across all technical domains.',
  'Web': 'High-performance web architecture and ecosystems.',
  'Mobile': 'Native and cross-platform mobile experiences.',
  'Design': 'Strategic branding and interface design systems.',
  'AI': 'LLM-integrated platforms and automated agents.'
};

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();
  const isWorkPage = location.pathname === '/work';

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    let base = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
    return limit ? base.slice(0, limit) : base;
  }, [activeCategory, limit]);

  return (
    <section id="projects" className={`py-24 sm:py-32 bg-white relative overflow-hidden ${isWorkPage ? 'pt-0' : ''}`}>
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-50/50 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
          <div className="max-w-2xl animate-fade-up">
            {!isWorkPage && (
              <>
                <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Case Studies</h2>
                <p className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] mb-6 text-zinc-900">
                  Selected <span className="text-zinc-300">Work.</span>
                </p>
              </>
            )}
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed hidden md:block">
              {CategoryMeta[activeCategory]}
            </p>
          </div>
          
          <div className={`w-full md:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 flex justify-start md:justify-end animate-fade-up [animation-delay:200ms]`}>
            <div className="flex items-center gap-1.5 p-1.5 bg-zinc-50 border border-zinc-200 rounded-2xl shadow-sm">
              {Categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 whitespace-nowrap overflow-hidden ${
                      isActive 
                        ? 'text-white' 
                        : 'text-zinc-400 hover:text-zinc-900 hover:bg-white'
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    <span className={`relative z-10 flex items-center justify-center min-w-[1.6rem] h-[1.6rem] text-[9px] rounded-full font-bold transition-all duration-500 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-zinc-200/50 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-600'
                    }`}>
                      {categoryCounts[cat] || 0}
                    </span>
                    {isActive && (
                      <span className="absolute inset-0 bg-zinc-900 animate-in fade-in zoom-in-95 duration-300"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Grid with stagger entrance */}
        <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <Link 
                to={`/work/${project.id}`}
                key={project.id} 
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden hover:border-indigo-600/20 transition-all duration-700 flex flex-col h-full animate-fade-up shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] active:scale-[0.98]"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute bottom-5 left-5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-zinc-200 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[8px] font-black tracking-[0.2em] text-zinc-900 uppercase">{project.category} Architecture</span>
                  </div>

                  <div className="absolute top-5 left-5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-zinc-200 shadow-sm">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-900 uppercase">{project.year}</span>
                  </div>
                  
                  <div className={`absolute inset-0 bg-zinc-900/60 backdrop-blur-[4px] flex items-center justify-center transition-all duration-500 md:opacity-0 ${
                    hoveredId === project.id ? 'md:opacity-100' : ''
                  } hidden md:flex`}>
                    <div className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-3">
                      Case Study
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[8px] font-black px-3 py-1.5 rounded-lg bg-zinc-50 text-zinc-400 uppercase tracking-widest border border-zinc-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-indigo-600 transition-colors tracking-tighter text-zinc-900 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="pt-6 border-t border-zinc-100 mt-auto flex items-center justify-between">
                    <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">
                      Project Type: {project.category}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-zinc-100 group-hover:bg-indigo-600 transition-colors shadow-sm"></div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-32 text-center animate-fade-up bg-zinc-50 border border-dashed border-zinc-200 rounded-[3rem]">
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-3xl text-zinc-300 shadow-sm border border-zinc-100">
                ⚡
              </div>
              <h3 className="text-3xl font-black text-zinc-900 mb-3 tracking-tighter">Architecture under development</h3>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">We are currently curating more case studies for the <span className="text-indigo-600 font-bold">{activeCategory}</span> sector.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="mt-10 px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-zinc-900/10"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {limit && (
          <div className="mt-20 text-center animate-fade-up [animation-delay:400ms]">
            <Link 
              to="/work" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-6 px-14 py-6 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-zinc-900/10 hover:-translate-y-1"
            >
              Full studio index
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;