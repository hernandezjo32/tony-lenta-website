"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "¡Qué lo que! 🔥 I'm Lenta Bot. Ask me anything about Tony Lenta!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].slice(-10) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error! Try again. 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Chat Window - Iska apna fixed area hai */}
      <div
        className={`fixed bottom-24 right-6 z-[100000] transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0a] rounded-2xl w-[85vw] md:w-96 flex flex-col overflow-hidden border border-gold-300/30 shadow-[0_20px_60px_rgba(0,0,0,1)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gold-300/10">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-gold-300" />
              <span className="text-gold-300 font-syne font-bold text-[10px] uppercase tracking-widest">Lenta Bot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 p-1"><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/40 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-gold-300 text-black font-medium' : 'bg-white/10 text-white border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="p-3 bg-black flex gap-2 border-t border-gold-300/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs outline-none"
            />
            <button type="submit" className="bg-gold-300 p-2 rounded-xl text-black"><Send size={16} /></button>
          </form>
        </div>
      </div>

      {/* 2. Floating Button - Ye bilkul separate fixed element hai */}
      <div className="fixed bottom-6 right-6 z-[100001] flex flex-col items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold-300 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
        </button>
        
        {!isOpen && (
          <div className="bg-black/80 border border-gold-300/20 px-3 py-1 rounded-full backdrop-blur-md">
            <span className="text-gold-300 text-[9px] font-syne font-bold uppercase tracking-widest">Lenta Bot</span>
          </div>
        )}
      </div>
    </>
  );
}