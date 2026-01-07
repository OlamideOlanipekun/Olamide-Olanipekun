import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-900 pt-24 pb-12 overflow-hidden relative border-t border-white/5">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-900 font-black text-xs shadow-2xl">M</div>
                            <span className="text-xl font-black text-white tracking-tighter uppercase italic">Midtech<span className="text-indigo-500">.</span></span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-medium">
                            Architecting high-stakes digital experiences through precision code and strategic AI integration.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">System Status: Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Sitemap</h4>
                        <ul className="space-y-5">
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'Studio Portfolio', path: '/work' },
                                { label: 'Our Philosophy', path: '/about' },
                                { label: 'Brief Us', path: '/contact' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-zinc-500 hover:text-white transition-colors text-sm font-medium flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-indigo-500 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Connect</h4>
                        <ul className="space-y-5">
                            <li>
                                <a href={SOCIAL_LINKS.email} className="text-zinc-500 hover:text-white transition-colors text-sm font-medium block">
                                    olamideolanipekun75@gmail.com
                                </a>
                            </li>
                            <li>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {[
                                        { label: 'GH', url: SOCIAL_LINKS.github },
                                        { label: 'LI', url: SOCIAL_LINKS.linkedin },
                                        { label: 'TW', url: SOCIAL_LINKS.twitter },
                                        { label: 'WA', url: SOCIAL_LINKS.whatsapp }
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-black text-zinc-500 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all"
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="lg:pl-8">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Initiative</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">
                            Start your journey from generic to premium architecture today.
                        </p>
                        <Link
                            to="/contact"
                            className="flex items-center justify-between w-full px-6 py-4 bg-white hover:bg-indigo-600 hover:text-white text-zinc-900 rounded-xl transition-all group shadow-2xl shadow-indigo-600/10"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">Start Project</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        © {currentYear} Midtech Solutions. All rights reserved.
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                            Lagos <span className="text-zinc-800 mx-2">/</span> GMT+1
                        </div>
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                            Design by Core Unit
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
