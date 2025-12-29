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
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-zinc-200 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 group relative z-[75]">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 text-sm">O</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 uppercase tracking-widest text-sm hidden sm:block">Olamide</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.href ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[75] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[70] transition-all duration-500 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 pt-20">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-5xl font-black tracking-tighter text-zinc-900 hover:text-indigo-600 transition-all duration-300 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + idx * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            className={`mt-8 w-full max-w-xs transition-all duration-500 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `400ms` }}
          >
            <Link 
              to="/contact" 
              className="w-full py-5 bg-indigo-600 text-white text-center text-sm font-black uppercase tracking-widest rounded-2xl block shadow-2xl shadow-indigo-600/20"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div 
          className={`p-10 border-t border-zinc-100 flex justify-center gap-8 transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: `500ms` }}
        >
          <a href={SOCIAL_LINKS.github} className="text-zinc-400 hover:text-zinc-900 transition-colors font-bold text-xs">GH</a>
          <a href={SOCIAL_LINKS.linkedin} className="text-zinc-400 hover:text-zinc-900 transition-colors font-bold text-xs">LI</a>
          <a href={SOCIAL_LINKS.twitter} className="text-zinc-400 hover:text-zinc-900 transition-colors font-bold text-xs">TW</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;