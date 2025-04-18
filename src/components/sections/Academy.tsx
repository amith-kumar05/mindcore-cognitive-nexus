
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Lightbulb, GraduationCap } from 'lucide-react';

const Academy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  const benefits = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      text: "Hands-on learning with real-world AI applications"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      text: "Comprehensive curriculum from beginner to advanced"
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Learn from industry experts and researchers"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      text: "Certificate upon course completion"
    }
  ];

  return (
    <section id="academy" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-mindcore-accent/10 text-mindcore-accent text-sm font-medium mb-4">
                Education
              </span>
              
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
                MindCore Academy
              </h2>
              
              <p className="text-mindcore-text-muted mb-6">
                Gain practical skills in AI development with our industry-leading courses. From LLM fine-tuning to agent development, our curriculum covers the latest advances in cognitive computing.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-full bg-mindcore-accent/10 text-mindcore-accent">
                      {benefit.icon}
                    </div>
                    <span className="text-mindcore-text mt-1">
                      {benefit.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="neon-button"
              >
                Start Learning with MindCore
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-card">
                <div className="absolute inset-0 bg-gradient-to-br from-mindcore-dark/90 to-mindcore-secondary/90" />
                
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
                    <div className="ml-2 text-xs text-mindcore-text-muted">
                      MindCore Academy - Course Preview
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4 font-mono text-sm">
                    <div className="flex">
                      <span className="text-mindcore-accent mr-2">$</span>
                      <span className="text-mindcore-text-muted">import mindcore</span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-mindcore-accent mr-2">$</span>
                      <span className="text-mindcore-text-muted">from mindcore.llm import MindLLM</span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-mindcore-accent mr-2">$</span>
                      <span className="text-mindcore-text-muted">
                        model = MindLLM.from_pretrained("mindcore/kannada-7b")
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-mindcore-accent mr-2">$</span>
                      <span className="text-mindcore-text-muted">
                        response = model.generate("ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?")
                      </span>
                    </div>
                    
                    <div className="mt-4 p-3 rounded bg-mindcore-dark/30 text-mindcore-text">
                      <span className="text-mindcore-accent">Output:</span> "ನಮಸ್ಕಾರ! ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
                    </div>
                  </div>
                  
                  <div className="mt-auto text-xs text-mindcore-text-muted">
                    Course: Building Multilingual LLMs - Module 3: Fine-tuning for Kannada
                  </div>
                </div>
                
                {/* Terminal-style scan line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-full h-px bg-mindcore-accent/10 animate-scan-line" />
                </div>
                
                {/* Glowing dots */}
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-mindcore-accent animate-glow-pulse" />
              </div>
              
              <div className="absolute -z-10 bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-72 h-72 rounded-full bg-mindcore-accent/10 filter blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academy;
