
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Zap, Database, Code } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-mindcore-accent" />,
      title: "LLM Integration",
      description: "Leveraging state-of-the-art large language models to understand and reason about complex data."
    },
    {
      icon: <Zap className="w-8 h-8 text-mindcore-accent2" />,
      title: "Neuro-Symbolic Reasoning",
      description: "Combining neural networks with symbolic logic for more robust and explainable AI systems."
    },
    {
      icon: <Database className="w-8 h-8 text-mindcore-accent3" />,
      title: "Structured Pipelines",
      description: "Building modular, maintainable workflows for converting human thought into machine intelligence."
    },
    {
      icon: <Code className="w-8 h-8 text-mindcore-accent" />,
      title: "Open Research",
      description: "Advancing the field through transparent, collaborative development and shared knowledge."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={titleRef}
          style={{ opacity, y }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-mindcore-accent/10 text-mindcore-accent text-sm font-medium mb-4"
          >
            Our Mission
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-orbitron font-bold mb-6"
          >
            Transforming Human Cognition
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto text-mindcore-text-muted"
          >
            At MindCore Labs, we're on a mission to transform human cognition into machine-interpretable intelligence. We're building the next generation of AI systems that can understand, reason, and learn like humans.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass-panel rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="mb-4 p-3 rounded-lg bg-mindcore-dark/30 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-mindcore-text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative glowing-border inline-block px-6 py-4 rounded-lg backdrop-blur-md bg-mindcore-secondary/20">
            <p className="font-orbitron text-xl text-mindcore-text">
              "We build systems that think with humans, not just for them."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Visual elements */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-mindcore-accent/10 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-mindcore-accent2/10 rounded-full filter blur-3xl opacity-20" />
    </section>
  );
};

export default About;
