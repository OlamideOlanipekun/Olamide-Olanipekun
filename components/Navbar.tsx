
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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock scroll when menu is open
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
        isScrolled || isMenuOpen ? 'bg-zinc-950/90 backdrop-blur-xl py-4 border-b border-zinc-800' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 group relative z-[75]">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 text-sm">O</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 uppercase tracking-widest text-sm hidden sm:block">Olamide</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-xs font-black uppercase tracking-widest transition-colors ${
                location.pathname === link.href ? 'text-indigo-400' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
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
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-950 z-[70] transition-all duration-500 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 pt-20">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-5xl font-black tracking-tighter text-white hover:text-indigo-500 transition-all duration-300 transform ${
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

        {/* Mobile Menu Footer */}
        <div 
          className={`p-10 border-t border-zinc-900 flex justify-center gap-8 transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: `500ms` }}
        >
          <a href={SOCIAL_LINKS.github} className="text-zinc-500 hover:text-white transition-colors">GitHub</a>
          <a href={SOCIAL_LINKS.linkedin} className="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
          <a href={SOCIAL_LINKS.twitter} className="text-zinc-500 hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
