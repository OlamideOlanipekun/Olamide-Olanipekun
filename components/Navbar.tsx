import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants.ts';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-xl py-4 border-b border-zinc-200 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-3 group relative z-[110]">
          <span className="bg-zinc-900 text-white w-9 h-9 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-all shadow-lg shadow-zinc-900/10 text-sm font-black">M</span>
          <div className="flex flex-col">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 uppercase tracking-[0.2em] text-[11px] font-black leading-none mb-0.5 transition-colors ${isMenuOpen ? 'from-zinc-900 to-zinc-900' : ''}`}>Midtech</span>
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.href ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-600 transition-all shadow-lg shadow-zinc-900/5"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-zinc-100 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-5 h-0.5 bg-zinc-900 transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-zinc-900 transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out md:hidden flex flex-col h-[100dvh] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pt-20">
          <div className="mb-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2 block text-center">Navigation</span>
          </div>
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-5xl font-black tracking-tighter text-zinc-900 hover:text-indigo-600 transition-all duration-300 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            className={`mt-10 w-full max-w-xs transition-all duration-500 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `450ms` }}
          >
            <Link 
              to="/contact" 
              className="w-full py-5 bg-zinc-900 text-white text-center text-xs font-black uppercase tracking-[0.2em] rounded-2xl block shadow-2xl shadow-zinc-900/10"
            >
              Collaborate
            </Link>
          </div>
        </div>

        <div 
          className={`p-10 border-t border-zinc-100 bg-zinc-50 flex flex-col items-center gap-6 transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: `550ms` }}
        >
          <div className="flex gap-8">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors font-black text-[10px] uppercase tracking-widest">GitHub</a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors font-black text-[10px] uppercase tracking-widest">LinkedIn</a>
          </div>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em]">© 2024 Midtech Solutions</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;