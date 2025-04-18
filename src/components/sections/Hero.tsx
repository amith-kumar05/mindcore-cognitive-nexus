import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import FloatingElements from '../ui/FloatingElements';
const Hero = () => {
  return <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20">
      <FloatingElements />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="mb-8">
          <motion.div className="p-8 rounded-full bg-mindcore-accent/10 backdrop-blur-sm" animate={{
          y: [0, -15, 0],
          boxShadow: ["0 0 20px rgba(0, 209, 255, 0.2)", "0 0 40px rgba(0, 209, 255, 0.4)", "0 0 20px rgba(0, 209, 255, 0.2)"]
        }} transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}>
            <Brain className="w-20 h-20 text-mindcore-accent" />
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="text-center mb-8">
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-mindcore-accent via-mindcore-accent2 to-mindcore-accent3 bg-clip-text text-transparent font-bold">
            MindCore Labs
          </h1>
          <p className="text-xl text-mindcore-text/80 max-w-2xl mx-auto md:text-2xl font-normal">
            Where Thought Meets Computation
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="neon-button group flex items-center gap-2">
            <span className="relative z-10">Explore Our AI Suite</span>
          </button>
          
          <a href="#about" className="text-mindcore-accent hover:text-mindcore-accent2 transition-all duration-300">
            Learn about our mission
          </a>
        </motion.div>
      </div>
    </section>;
};
export default Hero;