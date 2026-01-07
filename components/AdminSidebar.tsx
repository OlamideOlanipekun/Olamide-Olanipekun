import React, { useState } from 'react';

interface SidebarLink {
    id: string;
    label: string;
    icon: string;
}

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    handleLogout: () => void;
    links: SidebarLink[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, handleLogout, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-6 left-6 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 bg-zinc-900 text-white rounded-xl shadow-xl flex items-center justify-center hover:scale-105 transition-all"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar Content */}
            <aside className={`
        fixed lg:sticky top-0 h-screen bg-white border-r border-zinc-200 z-50 flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0 w-72 md:w-80' : '-translate-x-full lg:translate-x-0 w-64'}
      `}>
                <div className="p-8 border-b border-zinc-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-zinc-900/10">M</div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Midtech</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Control Center</div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActiveTab(link.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all group ${activeTab === link.id
                                    ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10 scale-[1.02]'
                                    : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50'
                                }`}
                        >
                            <span className={`text-lg transition-transform group-hover:scale-125 ${activeTab === link.id ? 'scale-110' : ''}`}>
                                {link.icon}
                            </span>
                            {link.label}
                            {activeTab === link.id && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-zinc-100 flex flex-col gap-5">
                    <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-sm">
                            OO
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-[10px] font-black text-zinc-900 truncate">Olamide O.</div>
                            <div className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Master Admin
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 group shadow-sm hover:shadow-red-500/5"
                    >
                        <span className="text-base group-hover:rotate-12 transition-transform">🚪</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
