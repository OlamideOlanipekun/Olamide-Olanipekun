import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProjectDetails from './ProjectDetails';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Preloader from './components/Preloader';
import WhatsAppButton from './components/WhatsAppButton';

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
    <AboutSection />
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

        {/* Conditionally render navbar so it doesn't appear on Admin Pages */}
        <Routes>
          <Route path="/admin" element={null} />
          <Route path="/admin/login" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Public Admin Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>

        <Routes>
          <Route path="/admin" element={null} />
          <Route path="/admin/login" element={null} />
          <Route path="*" element={
            <>
              <Footer />
              <BackToTop />
              <WhatsAppButton />
            </>
          } />
        </Routes>

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