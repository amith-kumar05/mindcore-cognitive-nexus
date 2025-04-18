
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const linkSections = [
    {
      title: "Products",
      links: [
        { name: "MindLLM", href: "#" },
        { name: "MindRAG", href: "#" },
        { name: "CoreAgents", href: "#" },
        { name: "NeuroWave", href: "#" },
        { name: "View All", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Academy", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Docs", href: "#" },
        { name: "Research", href: "#" },
        { name: "Community", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" }
      ]
    }
  ];
  
  const socialLinks = [
    { 
      name: "GitHub",
      href: "https://github.com",
      icon: <Github className="w-5 h-5" />
    },
    { 
      name: "Twitter",
      href: "https://twitter.com",
      icon: <Twitter className="w-5 h-5" />
    },
    { 
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5" />
    }
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-mindcore-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Logo and Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h2 className="font-orbitron text-2xl font-bold text-gradient">
                  MindCore Labs
                </h2>
                <p className="text-mindcore-text-muted mt-2 max-w-sm">
                  Transforming human cognition into machine-interpretable intelligence.
                </p>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-sm font-semibold mb-3">
                  Stay updated with our newsletter
                </h3>
                
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 terminal-input text-sm h-10"
                  />
                  <button className="flex items-center justify-center w-10 h-10 bg-mindcore-accent text-black rounded-md hover:bg-mindcore-accent/90 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Links */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-orbitron font-bold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-mindcore-text-muted hover:text-mindcore-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Glowing Divider */}
        <div className="relative h-px w-full mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow animate-background-pan" style={{ backgroundSize: '200%' }} />
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-mindcore-text-muted">
            &copy; {currentYear} MindCore Labs. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-orbitron text-sm mr-2">
              Join the Cognitive Movement
            </span>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="text-mindcore-text-muted hover:text-mindcore-accent transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-mindcore-accent/10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-mindcore-accent/30 to-transparent" />
    </footer>
  );
};

export default Footer;
