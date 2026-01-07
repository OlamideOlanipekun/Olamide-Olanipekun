import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="w-full h-px bg-zinc-100 mb-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
                        © {currentYear} MIDTECH SOLUTIONS. LEAD BY OLAMIDE OLANIPEKUN.
                    </div>
                    <div className="flex gap-8">
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] md:text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]"
                        >
                            LINKEDIN
                        </a>
                        <a
                            href={SOCIAL_LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] md:text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]"
                        >
                            GITHUB
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
