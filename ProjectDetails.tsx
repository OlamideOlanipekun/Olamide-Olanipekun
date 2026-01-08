import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from './utils/api';

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  image_url: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  year?: string;
  live_link?: string;
  repo_link?: string;
  images?: string[];
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects = await api.get('/projects');
        const found = projects.find((p: Project) => p.id === id || p.id === Number(id));
        setProject(found || null);
      } catch (error) {
        console.error('Failed to fetch project', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-zinc-400 text-xs font-black uppercase tracking-widest">Loading Case Study...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-50">
        <h1 className="text-4xl font-black mb-4 text-zinc-900">Project Not Found</h1>
        <Link to="/work" className="text-indigo-600 font-bold hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  const tags = project.tags || [];

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
                  {project.category || 'Web App'}
                </span>
                {project.year && (
                  <span className="text-zinc-400 text-[11px] font-bold tracking-widest uppercase">{project.year}</span>
                )}
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-10 text-zinc-900">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed max-w-lg">
                {project.longDescription || project.description || 'No description available.'}
              </p>
            </div>

            {tags.length > 0 && (
              <div className="pt-12 border-t border-zinc-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Stack & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {tags.map(tag => (
                    <span key={tag} className="px-5 py-3 bg-zinc-50 rounded-2xl text-[11px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-widest shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-zinc-900 text-white text-center font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10"
                >
                  Visit Deployment
                </a>
              )}
              {project.repo_link && (
                <a
                  href={project.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-zinc-900 text-center font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-zinc-50 transition-all border border-zinc-200 shadow-sm"
                >
                  View Repository
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-fade-up [animation-delay:200ms]">
              <div className="rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
                <img src={project.image_url} alt={project.title} className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Gallery Section */}
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 animate-fade-up [animation-delay:400ms]">
                {project.images.map((img, idx) => (
                  <div key={idx} className="rounded-[2rem] overflow-hidden border border-zinc-100 shadow-lg">
                    <img src={img} alt={`${project.title} gallery ${idx}`} className="w-full h-40 sm:h-56 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;