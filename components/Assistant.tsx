import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { getGeminiRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Schillerplus. ¿Buscas unos lentes para tu tipo de rostro o un perfume para una ocasión especial? Estoy aquí para ayudarte.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await getGeminiRecommendation(inputValue);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-assistant" className="scroll-mt-24 py-20 bg-brand-light">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block p-3 rounded-full bg-brand-red/10 text-brand-red mb-4">
            <Sparkles size={32} />
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Asistente Virtual Schiller</h2>
          <p className="text-brand-grey">Descubre tu estilo ideal con nuestra Inteligencia Artificial</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-[500px] flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-red ml-2' : 'bg-brand-grey mr-2'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div 
                    className={`p-3 rounded-lg text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-red text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-lg rounded-tl-none border border-gray-200 text-sm text-gray-500 italic flex items-center">
                    <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce mr-1"></div>
                    <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce mr-1 delay-75"></div>
                    <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce delay-150"></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ej: Tengo cara redonda, ¿qué lentes me recomiendas?"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50 text-gray-700"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-brand-red text-white p-2 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};