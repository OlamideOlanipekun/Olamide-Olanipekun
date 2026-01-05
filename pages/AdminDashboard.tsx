import React, { useState } from 'react';
import { PROJECTS, SKILLS } from '../constants.ts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'inquiries' | 'skills'>('overview');

  const stats = [
    { label: 'Total Projects', value: PROJECTS.length, icon: '🚀', trend: '+12%' },
    { label: 'Active Inquiries', value: '8', icon: '📩', trend: '+3 today' },
    { label: 'Global Reach', value: '1.2k', icon: '🌐', trend: '+18%' },
    { label: 'Stack Health', value: '99.9%', icon: '⚡', trend: 'Stable' },
  ];

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'inquiries', label: 'Inquiries', icon: '✉️' },
    { id: 'skills', label: 'Capabilities', icon: '🛠️' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-zinc-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-black text-xs">M</div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Midtech</div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Control Center</div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                activeTab === link.id 
                ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-zinc-100">
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
            <img src="image/founder.png" className="w-8 h-8 rounded-lg object-cover" alt="Admin" />
            <div className="overflow-hidden">
              <div className="text-[9px] font-black text-zinc-900 truncate">Olamide O.</div>
              <div className="text-[7px] font-bold text-emerald-500 uppercase tracking-widest">Master Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">
              {activeTab} <span className="text-zinc-300">Hub.</span>
            </h1>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">System operational • Dec 2024</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-zinc-900 transition-all flex items-center gap-2">
              <span>🔄</span> Refresh
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
              <span>+</span> New Project
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-up">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-zinc-900 group-hover:text-white transition-all">
                      {stat.icon}
                    </div>
                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                  </div>
                  <div className="text-3xl font-black text-zinc-900 tracking-tighter mb-1">{stat.value}</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Recent Projects</h3>
                  <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50">
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Project</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Category</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {PROJECTS.slice(0, 5).map((project) => (
                        <tr key={project.id} className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={project.imageUrl} className="w-10 h-10 rounded-xl object-cover" alt="" />
                              <div className="text-xs font-bold text-zinc-900">{project.title}</div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{project.category}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              <span className="text-[10px] font-bold text-zinc-600">Live</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors">⚙️</button>
                              <button className="p-2 hover:bg-zinc-200 rounded-lg transition-colors text-red-500">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-zinc-200 p-8 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-8">System Stack</h3>
                <div className="space-y-6">
                  {SKILLS.slice(0, 5).map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-end mb-2">
                        <div className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">{skill.name}</div>
                        <div className="text-[10px] font-black text-indigo-600 mono">{skill.level}%</div>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-zinc-900 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-zinc-100 text-center">
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-4">Architecture optimized for Gemini 2.5</p>
                  <button className="w-full py-4 border border-zinc-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">Audit Stack</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="flex flex-col items-center justify-center py-32 bg-white border border-dashed border-zinc-200 rounded-[3rem] animate-fade-up">
            <div className="text-4xl mb-6">🛠️</div>
            <h3 className="text-xl font-black text-zinc-900 uppercase tracking-widest">Section Under Construction</h3>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-2">Module activation scheduled for Q1 2025</p>
            <button 
              onClick={() => setActiveTab('overview')}
              className="mt-8 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] hover:underline"
            >
              Back to Overview
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;