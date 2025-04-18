
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Inside NeuroParse: Building Cognitive Parse Trees",
    excerpt: "How we're structuring language understanding for more robust AI reasoning systems.",
    date: "February 14, 2025",
    readTime: "8 min read",
    category: "Research",
    categoryColor: "bg-mindcore-accent/20 text-mindcore-accent"
  },
  {
    title: "Building AI Agents with Memory: Beyond the Prompt Window",
    excerpt: "Creating persistent reasoning agents that maintain context across multiple sessions.",
    date: "February 5, 2025",
    readTime: "12 min read",
    category: "Development",
    categoryColor: "bg-mindcore-accent2/20 text-mindcore-accent2"
  },
  {
    title: "Launching MindCore OS: An Open Framework for Cognitive Computing",
    excerpt: "Our vision for a common platform to build, deploy, and share cognitive applications.",
    date: "January 28, 2025",
    readTime: "10 min read",
    category: "Announcement",
    categoryColor: "bg-green-500/20 text-green-500"
  },
  {
    title: "Emotion-Aware Speech: The Next Frontier in Human-AI Interaction",
    excerpt: "How prosodic features and emotional markers can enhance AI understanding of human communication.",
    date: "January 15, 2025",
    readTime: "15 min read",
    category: "Research",
    categoryColor: "bg-mindcore-accent/20 text-mindcore-accent"
  },
  {
    title: "Structured Knowledge Graphs for LLM Context Windows",
    excerpt: "Maximizing context utilization through graph-based information organization.",
    date: "January 7, 2025",
    readTime: "11 min read",
    category: "Technical",
    categoryColor: "bg-blue-500/20 text-blue-500"
  },
  {
    title: "The MindCore Approach to Neuro-Symbolic Reasoning",
    excerpt: "Combining neural networks with symbolic logic for more robust and explainable AI.",
    date: "December 21, 2024",
    readTime: "14 min read",
    category: "Philosophy",
    categoryColor: "bg-purple-500/20 text-purple-500"
  }
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="blog-card"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${post.categoryColor}`}>
            {post.category}
          </span>
          <div className="flex items-center text-xs text-mindcore-text-muted">
            <Calendar size={12} className="mr-1" />
            {post.date}
          </div>
        </div>
        
        <h3 className="text-lg font-orbitron font-bold mb-2 group-hover:text-mindcore-accent transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-mindcore-text-muted mb-6">
          {post.excerpt}
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-mindcore-accent/10">
        <div className="flex items-center text-xs text-mindcore-text-muted">
          <Clock size={12} className="mr-1" />
          {post.readTime}
        </div>
        
        <button className="text-xs text-mindcore-accent hover:text-white transition-colors font-medium flex items-center gap-1">
          Read more
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const AutoscrollingHeadlines = () => {
  const headlinesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headlinesRef.current) return;
    
    const headlines = headlinesRef.current.querySelectorAll('.headline');
    
    gsap.to(headlines, {
      yPercent: -100 * (headlines.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: headlinesRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
  }, []);
  
  const headlines = [
    "Advancing Cognitive AI Research",
    "Transforming Language Understanding",
    "Building Emotion-Aware Systems",
    "Creating Neuro-Symbolic Frameworks",
    "Developing Multilingual AI"
  ];
  
  return (
    <div ref={headlinesRef} className="h-96 overflow-hidden">
      {headlines.map((headline, i) => (
        <div key={i} className="headline h-full flex items-center px-4">
          <h3 className="text-6xl font-orbitron font-bold text-mindcore-accent/10">
            {headline}
          </h3>
        </div>
      ))}
    </div>
  );
};

const Research = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="research" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-mindcore-accent/10 text-mindcore-accent text-sm font-medium mb-4">
            Latest Insights
          </span>
          
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Research & Blog
          </h2>
          
          <p className="max-w-3xl mx-auto text-mindcore-text-muted">
            Explore our latest research papers, technical insights, and development updates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button className="neon-button">
            View All Articles
          </button>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 h-48 w-48 bg-mindcore-accent/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-64 w-64 bg-mindcore-accent2/5 rounded-full filter blur-3xl" />
    </section>
  );
};

export default Research;
