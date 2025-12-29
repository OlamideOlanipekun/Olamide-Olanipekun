import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Experience from './components/Experience.tsx';
import Contact from './components/Contact.tsx';
import AiAssistant from './components/AiAssistant.tsx';
import BackToTop from './components/BackToTop.tsx';
import ProjectDetails from './ProjectDetails.tsx';
import WorkPage from './pages/WorkPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import Preloader from './components/Preloader.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => (
  <>
    <Hero />
    <Projects limit={3} />
    <Skills />
    <Experience />
    <Contact />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <BrowserRouter>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <ScrollToTop />
      <div className="relative min-h-screen bg-zinc-50">
        {/* Background Noise/Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <BackToTop />
        <WhatsAppButton />
        <AiAssistant />
        
        {/* Softer background accents */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/20 blur-[140px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;