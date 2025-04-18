import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import ProductSuite from '../components/sections/ProductSuite';
import Academy from '../components/sections/Academy';
import Research from '../components/sections/Research';
import Footer from '../components/sections/Footer';
import ChatBot from '../components/ui/ChatBot';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const Index = () => {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-mindcore-darker text-mindcore-text">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProductSuite />
        <Academy />
        <Research />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
