
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 15 + Math.random() * 15,
    size: 10 + Math.random() * 40
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute bg-mindcore-accent/5 rounded-full backdrop-blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
