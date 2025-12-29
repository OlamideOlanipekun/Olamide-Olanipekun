import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl py-4 border-b border-zinc-800' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 group">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">O</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 uppercase tracking-widest">Olamide</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.href ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[70] p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-2xl z-[65] transition-all duration-500 flex flex-col items-center justify-center gap-8 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link, idx) => (
          <Link 
            key={link.name} 
            to={link.href} 
            className="text-4xl font-bold tracking-tight text-white hover:text-indigo-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/contact" 
          className="mt-4 px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          Work with me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;