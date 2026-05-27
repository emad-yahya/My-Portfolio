import { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import AdminPage from './pages/AdminPage';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

const Portfolio = () => (
  <main
    className="relative w-full"
    style={{ overflowX: 'clip', background: '#0C0C0C' }}
  >
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ContactSection />
  </main>
);

const App = () => {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <PortfolioProvider>
      {isAdmin ? <AdminPage /> : <Portfolio />}
    </PortfolioProvider>
  );
};

export default App;
