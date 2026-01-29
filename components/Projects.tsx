import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../utils/api';

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  image_url: string;
  repo_link?: string;
  live_link?: string;
  tags?: string[];
  description?: string;
  year?: string;
  imageUrl?: string;
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isWorkPage = location.pathname === '/work';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.get('/projects');
        const sanitizedData = data.map((p: any) => {
          let category = p.category || 'Web';
          // Normalize categories
          if (category === 'Web App') category = 'Web';
          if (category === 'Mobile App') category = 'Mobile';

          return {
            ...p,
            category,
            tags: p.tags || [],
            imageUrl: p.image_url
          };
        });
        setProjects(sanitizedData);
      } catch (error) {
        console.error('Failed to load projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach(p => {
      const cat = p.category || 'Web'; // Default to Web if missing
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let base = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);
    return limit ? base.slice(0, limit) : base;
  }, [activeCategory, limit, projects]);

  if (loading) return <div className="py-32 text-center text-zinc-400 text-xs font-black uppercase tracking-widest">Loading Works...</div>;

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

          <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 flex justify-start md:justify-end animate-fade-up [animation-delay:200ms] sticky top-20 z-20 py-2 md:py-0 md:static bg-white/80 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none border-b border-zinc-100 md:border-none -mt-2 md:mt-0">
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-zinc-50 border border-zinc-200 rounded-xl sm:rounded-2xl shadow-sm">
              {Categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative flex items-center gap-1.5 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest rounded-lg sm:rounded-xl transition-all duration-500 whitespace-nowrap overflow-hidden ${isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-900 hover:bg-white'
                      }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    <span className={`relative z-10 flex items-center justify-center min-w-[1.2rem] sm:min-w-[1.6rem] h-[1.2rem] sm:h-[1.6rem] text-[8px] sm:text-[9px] rounded-full font-bold transition-all duration-500 ${isActive
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
                    src={project.imageUrl || project.image_url}
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

                  <div className={`absolute inset-0 bg-zinc-900/60 backdrop-blur-[4px] flex items-center justify-center transition-all duration-500 md:opacity-0 ${hoveredId === project.id ? 'md:opacity-100' : ''
                    } hidden md:flex`}>
                    <div className="flex gap-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          Visit Live
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}

                      <div className="px-6 py-3 bg-zinc-900/90 backdrop-blur-md text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-2">
                        View Details
                      </div>
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
                    <div className="flex gap-3">
                      {project.repo_link && (
                        <a
                          href={project.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
                          title="View Code"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                        <svg className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
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