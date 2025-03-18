import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ImageCarousel from './components/ImageCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getActiveSection } from './utils/scrollUtils';

const App = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle theme changes
  useEffect(() => {
    // Check user preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getActiveSection([
        'home', 'about', 'experience', 'projects', 'contact'
      ]);
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <ImageCarousel />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
