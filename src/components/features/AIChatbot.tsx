import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { clsx } from 'clsx';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Simple markdown parser component adapted for Tailwind CSS
const MarkdownMessage = ({ content }: { content: string }) => {
  const parseMarkdown = (text: string) => {
    // Split by code blocks first
    const parts = [];
    let lastIndex = 0;
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', language: match[1] || 'text', content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const renderText = (text: string) => {
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    text = text.replace(/_(.+?)_/g, '<em class="italic">$1</em>');
    text = text.replace(/`(.+?)`/g, '<code class="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline">$1</a>');
    text = text.replace(/\n/g, '<br/>');
    text = text.replace(/^[\-\*] (.+)$/gm, '<li class="ml-5 list-disc">$1</li>');
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal">$1</li>');
    text = text.replace(/^### (.+)$/gm, '<h3 class="font-bold mt-2 mb-1 text-sm">$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2 class="font-bold mt-2 mb-1 text-base">$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1 class="font-bold mt-2 mb-1 text-lg">$1</h1>');
    
    return text;
  };

  const parts = parseMarkdown(content);

  return (
    <div className="space-y-1">
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <pre
              key={index}
              className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2 mb-2 text-xs"
            >
              <code className="font-mono whitespace-pre">
                {part.content}
              </code>
            </pre>
          );
        } else {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: renderText(part.content as string) }}
              className="space-y-1"
            />
          );
        }
      })}
    </div>
  );
};

export function AIChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? "Hello! I'm Basel's AI assistant. I can answer questions about his experience, projects, and skills. How can I help you today?" 
        : "مرحباً! أنا المساعد الذكي لباسل. يمكنني الإجابة على أسئلتك حول خبرته ومشاريعه ومهاراته. كيف يمكنني مساعدتك اليوم؟",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const generateResponse = async (query: string, currentMessages: Message[]) => {
    setIsTyping(true);
    
    try {
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found. Please check your .env file.');
      }

      const chatHistory = currentMessages.slice(1).map(msg => ({
        role: msg.sender === 'bot' ? 'CHATBOT' : 'USER',
        message: msg.text
      }));

      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          message: query,
          model: 'command-r7b-12-2024',
          preamble: t.chatbot.prompt,
          temperature: 0.3,
          chat_history: chatHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.text || 'I received your message but couldn\'t generate a response. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);

    } catch (error: any) {
      console.error('Detailed chat error:', error);
      
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (error.message.includes('API key')) {
        errorMessage += 'API key configuration issue. Please check the setup.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else if (error.message.includes('401')) {
        errorMessage += 'Invalid API key. Please verify your Cohere API key.';
      } else if (error.message.includes('429')) {
        errorMessage += 'Rate limit exceeded. Please try again in a moment.';
      } else {
        errorMessage += `${error.message} Please try again or contact Basel directly.`;
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    
    const query = inputValue;
    setInputValue('');
    generateResponse(query, updatedMessages);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    generateResponse(suggestion, updatedMessages);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-transform hover:scale-110",
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
          isOpen ? "hidden" : "flex items-center gap-2"
        )}
      >
        <Sparkles size={24} />
        <span className="font-semibold hidden sm:inline">{t.chatbot.title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-[#161b22] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 font-sans"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">{t.chatbot.title}</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                    Online • Powered by Cohere
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0D1117]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === 'user' ? "ms-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.sender === 'user' ? "bg-gray-200 dark:bg-gray-700" : "bg-gradient-to-r from-blue-600 to-purple-600"
                  )}>
                    {msg.sender === 'user' ? <User size={16} className="text-gray-600 dark:text-gray-300" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={clsx(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none rtl:rounded-tl-none rtl:rounded-tr-2xl" 
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none rtl:rounded-tr-none rtl:rounded-tl-2xl border border-gray-100 dark:border-gray-700"
                  )}>
                    {msg.sender === 'user' ? msg.text : <MarkdownMessage content={msg.text} />}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                   <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 flex items-center gap-1">
                    <Loader2 size={16} className="animate-spin text-gray-400 mr-1" />
                    <span className="text-xs text-gray-400">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-700 shrink-0">
               {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                  {t.chatbot.suggestions.map((suggestion: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isTyping}
                      className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap border border-transparent hover:border-blue-200 dark:hover:border-blue-800 disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.chatbot.placeholder}
                  disabled={isTyping}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}