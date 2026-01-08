import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { supabase } from '../utils/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import { SKILLS } from '../constants';

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  image_url: string;
  repo_link?: string;
  live_link?: string;
  year?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'inquiries' | 'skills' | 'settings' | 'reviews' | 'newsletter'>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  // Form State
  const [newProject, setNewProject] = useState({ title: '', description: '', category: 'Web App', status: 'Live', image_url: '', repo_link: '', live_link: '', tags: '', year: new Date().getFullYear().toString() });
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', icon: '⚡', level: 80, description: '', tags: '' });
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Founder Image State
  const [founderImageUrl, setFounderImageUrl] = useState<string>('/assets/founder.jpg');
  const [founderImageFile, setFounderImageFile] = useState<File | null>(null);
  const [founderImagePreview, setFounderImagePreview] = useState<string | null>(null);

  // Newsletter State
  const [newsletter, setNewsletter] = useState({ subject: '', message: '' });
  const [sendingNewsletter, setSendingNewsletter] = useState(false);

  const handleSendNewsletter = async (testMode = false) => {
    if (!newsletter.subject || !newsletter.message) return alert('Subject and message required');
    if (!testMode && !window.confirm('Are you sure you want to email ALL contacts?')) return;

    setSendingNewsletter(true);
    try {
      const res = await api.post('/newsletter/broadcast', { ...newsletter, testMode });
      alert(testMode ? 'Test email sent!' : `Sent to ${res.sent} contacts!`);
      if (!testMode) setNewsletter({ subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send newsletter', error);
      alert('Failed to send newsletter');
    } finally {
      setSendingNewsletter(false);
    }
  };
  const [uploadingFounderImage, setUploadingFounderImage] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const data = await api.get('/inquiries');
      setInquiries(data);
    } catch (error) {
      console.error('Failed to fetch inquiries', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const data = await api.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error('Failed to fetch skills', error);
    }
  };

  // Reviews state
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const data = await api.get('/reviews/all');
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  const refreshAllData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchProjects(),
        fetchInquiries(),
        fetchSkills(),
        fetchReviews()
      ]);
    } catch (error) {
      console.error('Refresh failed', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchInquiries();
    fetchSkills();
    fetchReviews();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = newProject.image_url;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      // Convert comma-separated tags to array
      const tagsArray = newProject.tags
        ? newProject.tags.split(',').map(t => t.trim()).filter(t => t)
        : [];

      await api.post('/projects', {
        ...newProject,
        image_url: finalImageUrl,
        tags: tagsArray
      });

      // Reset Form
      setShowAddModal(false);
      setNewProject({ title: '', description: '', category: 'Web App', status: 'Live', image_url: '', repo_link: '', live_link: '', tags: '', year: new Date().getFullYear().toString() });
      setImageFile(null);
      setImagePreview(null);

      fetchProjects(); // Refresh list
    } catch (error: any) {
      console.error('Failed to add project', error);
      alert(`Failed to add project: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project', error);
      alert('Failed to delete project');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.delete(`/inquiries/${id}`);
      fetchInquiries();
    } catch (error) {
      console.error('Failed to delete inquiry', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // Assuming patch for marking as read, implemented in route as PATCH /:id/read
      // But api utility doesn't have patch. I need to add it or use fetch directly.
      // Or I can update api utility. For now I'll use fetch with auth headers manually or add patch to api utility.
      // Wait, let's check api utility again. It doesn't have patch. I'll stick to fetch or add patch.
      // Let's add patch. No wait, I can just use a POST request if I modify the route, or adding PATCH is cleaner.
      // Since I can't easily modify api.ts without another tool call, I will use fetch here for simplicity.

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/inquiries/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      fetchInquiries();
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const skillsTags = newSkill.tags ? newSkill.tags.split(',').map(t => t.trim()).filter(t => t) : [];
      await api.post('/skills', { ...newSkill, tags: skillsTags });
      setShowAddSkillModal(false);
      setNewSkill({ name: '', category: 'Frontend', icon: '⚡', level: 80, description: '', tags: '' });
      fetchSkills();
    } catch (error: any) {
      console.error('Failed to add skill', error);
      alert('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: '🚀', trend: 'Live' },
    { label: 'Active Inquiries', value: inquiries.filter(i => !i.read).length, icon: '📩', trend: `${inquiries.length} total` },
    { label: 'Global Reach', value: '1.2k', icon: '🌐', trend: '+18%' },
    { label: 'Stack Health', value: '99.9%', icon: '⚡', trend: 'Stable' },
  ];

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'inquiries', label: 'Inquiries', icon: '✉️' },
    { id: 'skills', label: 'Capabilities', icon: '🛠️' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'newsletter', label: 'Newsletter', icon: '📢' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleApproveReview = async (id: number, approved: boolean) => {
    try {
      await api.patch(`/reviews/${id}`, { approved });
      fetchReviews();
    } catch (error) {
      console.error('Failed to update review', error);
    }
  };

  const handleFeatureReview = async (id: number, featured: boolean) => {
    try {
      await api.patch(`/reviews/${id}`, { featured });
      fetchReviews();
    } catch (error) {
      console.error('Failed to feature review', error);
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const handleFounderImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFounderImageFile(file);
      setFounderImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFounderImageUpload = async () => {
    if (!founderImageFile) return;
    setUploadingFounderImage(true);
    try {
      const fileExt = founderImageFile.name.split('.').pop();
      const fileName = `founder.${fileExt}`;

      // Delete old file if exists
      await supabase.storage.from('assets').remove([fileName]);

      // Upload new file
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, founderImageFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('assets').getPublicUrl(fileName);
      setFounderImageUrl(data.publicUrl + '?t=' + Date.now()); // Cache bust
      setFounderImageFile(null);
      setFounderImagePreview(null);
      alert('Founder image updated successfully!');
    } catch (error: any) {
      console.error('Failed to upload founder image', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploadingFounderImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        links={sidebarLinks}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">
              {activeTab} <span className="text-zinc-300">Hub.</span>
            </h1>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">System operational • {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={refreshAllData}
              disabled={isRefreshing}
              className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-zinc-900 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              {isRefreshing ? 'Syncing...' : 'Refresh'}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
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

            {/* Projects Table */}
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Recent Projects</h3>
                <button onClick={() => setActiveTab('projects')} className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">No projects found. Create one!</div>
                ) : (
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
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              {project.image_url && <img src={project.image_url} className="w-10 h-10 rounded-xl object-cover" alt="" />}
                              <div className="text-xs font-bold text-zinc-900">{project.title}</div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{project.category || 'Web App'}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              <span className="text-[10px] font-bold text-zinc-600">{project.status || 'Live'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex gap-2">
                              <button onClick={() => handleDeleteProject(project.id)} className="p-2 hover:bg-zinc-200 rounded-lg transition-colors text-red-500">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-widest mb-6">Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input
                  type="text" required placeholder="Project Title"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                  value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                />
                <input
                  type="text" placeholder="Category (e.g. Web App)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                  value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                />
                <textarea
                  placeholder="Project Description - Describe what this project does..."
                  rows={3}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all resize-none"
                  value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                />
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Tech Stack</label>
                  <input
                    type="text" placeholder="React, Node.js, Supabase..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                  />
                  <p className="text-[9px] text-zinc-400 ml-1">Separate technologies with commas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Live Project URL (Optional)"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newProject.live_link} onChange={e => setNewProject({ ...newProject, live_link: e.target.value })}
                  />
                  <input
                    type="text" placeholder="GitHub Repo URL (Optional)"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newProject.repo_link} onChange={e => setNewProject({ ...newProject, repo_link: e.target.value })}
                  />
                  <input
                    type="text" placeholder="Year (e.g. 2024)"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newProject.year} onChange={e => setNewProject({ ...newProject, year: e.target.value })}
                  />
                  <select
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all text-zinc-600"
                    value={newProject.status} onChange={e => setNewProject({ ...newProject, status: e.target.value })}
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Project Image</label>

                  {/* File Drop Area */}
                  <div className="border-2 border-dashed border-zinc-200 rounded-xl p-4 text-center hover:bg-zinc-50 transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-xs font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity">Change Image</div>
                      </div>
                    ) : (
                      <div className="py-4">
                        <span className="text-2xl block mb-2">🖼️</span>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Click to Upload Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-px bg-zinc-100 flex-1"></div>
                    <span className="text-[9px] font-black text-zinc-300 uppercase">OR</span>
                    <div className="h-px bg-zinc-100 flex-1"></div>
                  </div>

                  <input
                    type="text" placeholder="Paste Image URL directly"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newProject.image_url} onChange={e => setNewProject({ ...newProject, image_url: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-xs font-bold uppercase border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">Cancel</button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 py-3 bg-zinc-900 text-white text-xs font-bold uppercase rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      'Add Project'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Tab - Full List */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">All Projects</h3>
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{projects.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">No projects found. Create one!</div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50">
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Project</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Category</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Tech Stack</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              {project.image_url && <img src={project.image_url} className="w-12 h-12 rounded-xl object-cover" alt="" />}
                              <div>
                                <div className="text-sm font-bold text-zinc-900">{project.title}</div>
                                <div className="text-[10px] text-zinc-400 mt-0.5 truncate max-w-[200px]">{project.live_link || 'No link'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{project.category || 'Web App'}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                              <span className="text-[10px] font-bold text-zinc-600">{project.status || 'Live'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {(project.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="text-[8px] font-bold px-2 py-1 bg-zinc-100 rounded-md text-zinc-500">{tag}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex gap-2">
                              <button onClick={() => handleDeleteProject(project.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 text-sm">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Client Inquiries</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">Messages from contact form submissions</p>
                </div>
                <button onClick={fetchInquiries} className="px-4 py-2 bg-zinc-50 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-colors">
                  Refresh List
                </button>
              </div>
              <div className="overflow-x-auto">
                {inquiries.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">No inquiries yet.</div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50">
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Client</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Message</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className={`hover:bg-zinc-50/50 transition-colors ${!inquiry.read ? 'bg-indigo-50/10' : ''}`}>
                          <td className="px-8 py-5">
                            <div>
                              <div className="text-xs font-bold text-zinc-900">{inquiry.name}</div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">{inquiry.email}</div>
                              {!inquiry.read && <span className="inline-block mt-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[8px] font-black uppercase tracking-widest">New</span>}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="max-w-xs">
                              <p className="text-xs font-bold text-zinc-700 truncate">{inquiry.subject || 'No Subject'}</p>
                              <p className="text-[10px] text-zinc-500 line-clamp-2 mt-1">{inquiry.message}</p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-[10px] font-bold text-zinc-400">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex gap-2">
                              {!inquiry.read && (
                                <button onClick={() => handleMarkAsRead(inquiry.id)} className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-500 text-[10px] font-bold uppercase tracking-wide" title="Mark as Read">
                                  Mark Read
                                </button>
                              )}
                              <a href={`mailto:${inquiry.email}`} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-600" title="Reply">↩️</a>
                              <button onClick={() => handleDeleteInquiry(inquiry.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500" title="Delete">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Skills/Capabilities Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Capabilities</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">Skills and technologies you offer</p>
                </div>
                <button
                  onClick={() => setShowAddSkillModal(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                >
                  <span>+</span> New Skill
                </button>
              </div>
              <div className="p-8">
                {skills.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-zinc-400 text-sm mb-4">No skills found.</p>
                    <button onClick={() => setShowAddSkillModal(true)} className="text-indigo-600 text-xs font-bold uppercase hover:underline">Add your first skill</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill: any) => (
                      <div key={skill.id} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-indigo-200 transition-all group relative">
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                        >
                          🗑️
                        </button>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:bg-indigo-50 transition-all">
                            {skill.icon || '⚡'}
                          </div>
                          <span className="text-[8px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg uppercase">{skill.category}</span>
                        </div>
                        <h4 className="text-sm font-black text-zinc-900 mb-1">{skill.name}</h4>
                        <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-3 mb-2 overflow-hidden">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed truncate">{skill.description || 'No description'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Skill Modal */}
        {showAddSkillModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-fade-up">
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-widest mb-6">Add Skill</h2>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <input
                  type="text" required placeholder="Skill Name (e.g. React)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                  value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                />
                <select
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all text-zinc-600"
                  value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools">Tools</option>
                  <option value="Design">Design</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Icon (e.g. ⚛️)"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newSkill.icon} onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })}
                  />
                  <input
                    type="number" min="1" max="100" placeholder="Level %"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newSkill.level} onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                  />
                </div>
                <textarea
                  placeholder="Short description..."
                  rows={2}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all resize-none"
                  value={newSkill.description} onChange={e => setNewSkill({ ...newSkill, description: e.target.value })}
                />

                <div className="space-y-1">
                  <input
                    type="text" placeholder="Tags (comma separated)..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                    value={newSkill.tags} onChange={e => setNewSkill({ ...newSkill, tags: e.target.value })}
                  />
                  <p className="text-[9px] text-zinc-400 ml-1">Example: Vite, Hooks, Context</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setShowAddSkillModal(false)} className="flex-1 py-3 text-xs font-bold uppercase border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-indigo-700 transition-colors">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Client Reviews</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">Moderate and feature reviews</p>
                </div>
                <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
                  <span className="text-emerald-600">{reviews.filter(r => r.approved).length} Approved</span>
                  <span className="text-amber-600">{reviews.filter(r => !r.approved).length} Pending</span>
                </div>
              </div>

              <div className="divide-y divide-zinc-100">
                {reviews.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-sm">No reviews yet</div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className={`p-6 flex gap-6 items-start ${!review.approved ? 'bg-amber-50/50' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-lg shrink-0">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-black text-zinc-900 text-sm">{review.name}</span>
                          {review.company && <span className="text-[9px] text-zinc-400 font-bold uppercase">{review.company}</span>}
                          <div className="flex gap-0.5 text-amber-400 text-xs">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                        </div>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-3 line-clamp-2">"{review.message}"</p>
                        <div className="flex gap-2 flex-wrap">
                          {!review.approved ? (
                            <button
                              onClick={() => handleApproveReview(review.id, true)}
                              className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              ✓ Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApproveReview(review.id, false)}
                              className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-[9px] font-black uppercase rounded-lg hover:bg-zinc-200 transition-colors"
                            >
                              Unapprove
                            </button>
                          )}
                          <button
                            onClick={() => handleFeatureReview(review.id, !review.featured)}
                            className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-colors ${review.featured
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                              : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                              }`}
                          >
                            {review.featured ? '★ Featured' : '☆ Feature'}
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-[9px] font-black uppercase rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-[9px] text-zinc-400 font-mono shrink-0">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-black text-zinc-900 mb-2">Broadcast Email</h3>
              <p className="text-zinc-500 text-sm mb-6">Send updates to all {inquiries.length + ((reviews || []).length)} unique contacts.</p>

              <div className="space-y-4 max-w-2xl">
                <input
                  type="text"
                  placeholder="Email Subject"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all font-bold"
                  value={newsletter.subject}
                  onChange={(e) => setNewsletter({ ...newsletter, subject: e.target.value })}
                />
                <textarea
                  rows={8}
                  placeholder="Write your update here... (HTML supported)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all resize-none font-mono"
                  value={newsletter.message}
                  onChange={(e) => setNewsletter({ ...newsletter, message: e.target.value })}
                />

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => handleSendNewsletter(true)}
                    disabled={sendingNewsletter}
                    className="px-6 py-3 bg-zinc-100 text-zinc-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                    Send Test (To Me)
                  </button>
                  <button
                    onClick={() => handleSendNewsletter(false)}
                    disabled={sendingNewsletter}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors disabled:opacity-50 flex-1"
                  >
                    {sendingNewsletter ? 'Sending...' : 'Send Broadcast'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-zinc-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">Site Settings</h3>
                <p className="text-[10px] text-zinc-400 mt-1">Manage your portfolio branding and assets</p>
              </div>

              <div className="p-8">
                {/* Founder Image Section */}
                <div className="mb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Founder Image</h4>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Current Image Preview */}
                    <div className="relative group">
                      <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-zinc-100 shadow-xl">
                        <img
                          src={founderImagePreview || founderImageUrl}
                          alt="Founder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {founderImagePreview && (
                        <div className="absolute inset-0 bg-indigo-600/20 rounded-[2rem] flex items-center justify-center">
                          <span className="text-[9px] font-black text-white bg-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">New</span>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        This image appears on the About page and throughout the site. Use a high-quality, professional photo.
                      </p>

                      <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:bg-zinc-50 transition-colors relative cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFounderImageSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-2xl block mb-2">📸</span>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                          {founderImageFile ? founderImageFile.name : 'Click to select new image'}
                        </span>
                      </div>

                      {founderImageFile && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => { setFounderImageFile(null); setFounderImagePreview(null); }}
                            className="flex-1 py-3 text-xs font-bold uppercase border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleFounderImageUpload}
                            disabled={uploadingFounderImage}
                            className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {uploadingFounderImage ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Uploading...
                              </>
                            ) : (
                              'Save New Image'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-100 my-10"></div>

                {/* Additional Settings Placeholder */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">More Settings</h4>
                  <p className="text-sm text-zinc-400">Additional settings coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;