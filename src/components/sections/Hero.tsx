
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Terminal, Brain, AlertCircle } from 'lucide-react';
import { NeuralNetwork, DataStream } from '../3d/NeuralScene';

const Hero = () => {
  const [isCursorActive, setIsCursorActive] = useState(false);
  const terminalRef = useRef<HTMLInputElement>(null);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorActive((prev) => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background elements */}
      <div className="grid-bg" />
      <DataStream count={20} />
      
      {/* Main content */}
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient text-shadow-lg">
            MindCore Labs
          </h1>
          <p className="text-xl md:text-2xl font-light text-mindcore-text-muted max-w-2xl mx-auto">
            Where Thought Meets Computation
          </p>
        </motion.div>

        {/* 3D Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] mb-8"
        >
          <Canvas>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <NeuralNetwork />
          </Canvas>
        </motion.div>

        {/* Terminal Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto relative"
        >
          <div className="relative glowing-border rounded-md overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-8 bg-mindcore-dark/30 backdrop-blur-sm flex items-center px-3">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-xs text-mindcore-text-muted">
                <Terminal size={12} />
                <span>mindcore_terminal.exe</span>
              </div>
            </div>
            
            <div className="pt-8 pb-3 px-4 bg-mindcore-terminal/80 backdrop-blur-md">
              <div className="flex items-center">
                <span className="text-mindcore-accent font-mono mr-2">$</span>
                <div className="flex-1 relative">
                  <input
                    ref={terminalRef}
                    type="text"
                    placeholder="Ask the MindCore..."
                    className="w-full bg-transparent border-none outline-none text-mindcore-text font-mono placeholder:text-mindcore-text-muted"
                  />
                  <span 
                    className={`absolute right-0 top-0 h-full w-3 bg-mindcore-accent opacity-70 ${isCursorActive ? 'opacity-70' : 'opacity-0'}`}
                    style={{transition: 'opacity 0.1s'}}
                  />
                </div>
              </div>
              
              <div className="mt-2 flex items-start gap-2 text-mindcore-text-muted text-sm font-mono">
                <AlertCircle size={16} className="mt-0.5 text-mindcore-accent" />
                <p>
                  Welcome to MindCore Labs. Type your question to interface with our cognitive systems.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="neon-button flex items-center gap-2">
            <Brain size={18} />
            <span>Explore Our AI Suite</span>
          </button>
          
          <a href="#about" className="text-mindcore-accent hover:text-mindcore-accent2 transition-colors text-sm underline underline-offset-4">
            Learn about our mission
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-mindcore-text-muted">Scroll to explore</span>
          <div className="w-6 h-10 border border-mindcore-accent/30 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-mindcore-accent rounded-full animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
