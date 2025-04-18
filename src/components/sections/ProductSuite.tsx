
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Brain, MessageSquare, Database, Terminal, 
  Mic, Heart, Rocket, Shield, Code, Chrome
} from 'lucide-react';

type Product = {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
};

const products: Product[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "MindLLM",
    description: "Fine-tuned multilingual/local LLMs, starting with Kannada and expanding to other Indian languages.",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "MindRAG",
    description: "Modular RAG system with vector DB, file/URL ingestion, retrievers, and comprehensive UI.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "CoreAgents",
    description: "Framework for AI agents with memory, tools, planning (ReAct), CLI + web support.",
    color: "from-purple-500/20 to-indigo-500/20"
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "NeuroWave",
    description: "Emotion-aware speech SDK (MFCC, Whisper, diarization) for journaling and transcription.",
    color: "from-blue-500/20 to-violet-500/20"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "AnimaMind",
    description: "GenAI-based AI therapist for mood tracking, speech input, and mental health support.",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "CoreDeploy",
    description: "CLI and templates to deploy AI apps (FastAPI, Streamlit, Docker, GPU-ready).",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "MindShield",
    description: "DevSecOps for AI with prompt injection testing, jailbreak detection, audit logs.",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "CorePlayground",
    description: "HuggingFace-style UI to test LLMs, RAGs, and agent behavior.",
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    icon: <Chrome className="w-8 h-8" />,
    title: "MindScrape",
    description: "Browser automation and synthetic dataset generation using Playwright.",
    color: "from-teal-500/20 to-cyan-500/20"
  }
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="product-card group"
      style={{
        transform: isHovered ? 'translateZ(20px) rotateX(5deg)' : 'translateZ(0) rotateX(0)',
        transition: 'transform 0.4s ease-out'
      }}
    >
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${product.color} opacity-50`} />
      
      <div className="relative z-10">
        <motion.div 
          animate={isHovered ? { y: -5, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-3 rounded-full bg-mindcore-dark inline-block"
        >
          <div className="text-mindcore-accent">
            {product.icon}
          </div>
        </motion.div>
        
        <h3 className="text-xl font-orbitron font-bold mb-2 text-white group-hover:text-mindcore-accent transition-colors">
          {product.title}
        </h3>
        
        <p className="text-sm text-mindcore-text-muted mb-4">
          {product.description}
        </p>
      </div>
      
      <div className="relative z-10 mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-sm text-mindcore-accent hover:text-white transition-colors font-medium flex items-center gap-1">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Glowing corner dots */}
      <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-mindcore-accent opacity-0 group-hover:opacity-70 transition-opacity`} />
      <div className={`absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-mindcore-accent2 opacity-0 group-hover:opacity-70 transition-opacity`} />
    </motion.div>
  );
};

const ProductSuite = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="products" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-mindcore-accent/10 text-mindcore-accent text-sm font-medium mb-4">
            Our Solutions
          </span>
          
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            MindCore Product Suite
          </h2>
          
          <p className="max-w-3xl mx-auto text-mindcore-text-muted">
            Our comprehensive suite of AI tools and frameworks designed to advance cognitive computing capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-mindcore-accent/5 rounded-full filter blur-3xl" />
      <div className="absolute -right-1/4 bottom-1/4 w-1/2 h-1/2 bg-mindcore-accent2/5 rounded-full filter blur-3xl" />
    </section>
  );
};

export default ProductSuite;
