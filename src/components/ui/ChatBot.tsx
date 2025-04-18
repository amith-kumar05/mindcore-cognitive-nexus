import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    text: string;
    isUser: boolean;
  }[]>([{
    text: "Hello! I'm MindCore Assistant. How can I help you today?",
    isUser: false
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);
  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      text: input,
      isUser: true
    }]);
    setInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm an AI assistant designed to help you understand MindCore's products and research. How can I assist you further?",
        isUser: false
      }]);
    }, 1000);
  };
  return <>
      {/* Chat button */}
      
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }} className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] z-50 rounded-xl overflow-hidden shadow-card">
            {/* Chat header */}
            <div className="bg-mindcore-dark p-4 border-b border-mindcore-accent/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-mindcore-accent/20">
                  <Bot size={20} className="text-mindcore-accent" />
                </div>
                <div>
                  <h3 className="font-orbitron text-white text-sm">MindCore Assistant</h3>
                  <span className="text-mindcore-text-muted text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-mindcore-text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="bg-mindcore-terminal/95 backdrop-blur-sm p-4 h-[400px] overflow-y-auto flex flex-col gap-4">
              {messages.map((message, index) => <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? 'bg-mindcore-accent text-black ml-auto' : 'bg-mindcore-secondary/40 backdrop-blur-sm text-mindcore-text'}`}>
                    <div className="flex items-start gap-2">
                      {!message.isUser && <Bot size={16} className="mt-1 min-w-4" />}
                      <p className="text-sm">{message.text}</p>
                      {message.isUser && <User size={16} className="mt-1 min-w-4" />}
                    </div>
                  </div>
                </div>)}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="bg-mindcore-dark p-3 border-t border-mindcore-accent/20">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 terminal-input text-sm h-10" />
                <button onClick={handleSendMessage} disabled={!input.trim()} className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${input.trim() ? 'bg-mindcore-accent text-black' : 'bg-mindcore-accent/30 text-mindcore-text-muted cursor-not-allowed'}`}>
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 text-xs text-mindcore-text-muted text-center">
                Powered by MindCore Cognitive AI
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default ChatBot;