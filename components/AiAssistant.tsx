import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Welcome to Midtech Solutions. I'm the studio's AI concierge. How can I help you explore Olamide's work or our studio's capabilities today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Auto-close if we scroll back to top
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await geminiService.chat(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our technical team is currently updating my interface. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-zinc-900 text-white rounded-2xl shadow-2xl transition-all duration-500 hover:bg-indigo-600 hover:scale-105 active:scale-95 group flex items-center gap-3 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
        }`}
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
          </span>
        </div>
        <span className="hidden sm:inline font-black text-[10px] uppercase tracking-[0.2em]">{isOpen ? 'Close' : 'Studio Assistant'}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[70vh] bg-white border border-zinc-200 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="p-6 border-b border-zinc-100 bg-white flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg">M</div>
            <div>
              <div className="text-sm font-black text-zinc-900 tracking-tight">Studio Concierge</div>
              <div className="text-[9px] text-indigo-600 uppercase tracking-[0.2em] font-black">AI Powered</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-zinc-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-5 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-zinc-900 text-white rounded-tr-none' 
                      : 'bg-white text-zinc-700 rounded-tl-none border border-zinc-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none flex gap-1.5 border border-zinc-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-zinc-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about our process..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-[13px] focus:outline-none focus:border-zinc-900 transition-all pr-14 text-zinc-900 placeholder:text-zinc-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2.5 top-2.5 p-2 bg-zinc-900 text-white rounded-xl hover:bg-black disabled:opacity-30 transition-all shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;