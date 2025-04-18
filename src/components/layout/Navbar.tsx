
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#', hasDropdown: false },
  { 
    name: 'Products', 
    href: '#products', 
    hasDropdown: true,
    dropdown: [
      { name: 'MindLLM', href: '#' },
      { name: 'MindRAG', href: '#' },
      { name: 'CoreAgents', href: '#' },
      { name: 'View All', href: '#products' }
    ]
  },
  { name: 'Academy', href: '#academy', hasDropdown: false },
  { name: 'Research', href: '#research', hasDropdown: false },
  { name: 'About', href: '#about', hasDropdown: false }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2 bg-mindcore-darker/80 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 font-orbitron font-bold text-xl text-white"
          >
            <div className="p-1.5 bg-mindcore-accent/10 rounded-md">
              <Brain className="h-5 w-5 text-mindcore-accent" />
            </div>
            <span>MindCore</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a 
                  href={link.href}
                  className="text-mindcore-text-muted hover:text-mindcore-text transition-colors text-sm font-medium flex items-center gap-1"
                  onClick={(e) => {
                    if (link.hasDropdown) {
                      e.preventDefault();
                      toggleDropdown(link.name);
                    }
                  }}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </a>
                
                {/* Desktop Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-40 py-2 px-3 rounded-md shadow-lg bg-mindcore-dark border border-mindcore-accent/20 backdrop-blur-md"
                      >
                        {link.dropdown?.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block py-1.5 text-sm text-mindcore-text-muted hover:text-mindcore-accent transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="neon-button py-2 px-4 text-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-mindcore-dark/95 backdrop-blur-md border-b border-mindcore-accent/10"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a 
                      href={link.href}
                      className="text-mindcore-text font-medium py-2 block"
                      onClick={(e) => {
                        if (link.hasDropdown) {
                          e.preventDefault();
                          toggleDropdown(link.name);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        {link.hasDropdown && (
                          <ChevronDown size={18} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </a>
                    
                    {/* Mobile Dropdown */}
                    {link.hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-1 border-l border-mindcore-accent/20"
                          >
                            {link.dropdown?.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-sm text-mindcore-text-muted"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>
              
              <div className="mt-6">
                <button 
                  className="w-full neon-button py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
