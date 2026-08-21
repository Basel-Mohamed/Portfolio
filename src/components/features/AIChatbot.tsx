import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaPaperPlane, FaXmark, FaRobot, FaCommentDots, FaUser, FaSpinner } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext';
import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../../types/portfolio';

const MarkdownComponents: Record<string, React.FC<any>> = {
  h1: ({ ...props }: any) => <h1 className="font-bold mt-2 mb-1 text-lg" {...props} />,
  h2: ({ ...props }: any) => <h2 className="font-bold mt-2 mb-1 text-base" {...props} />,
  h3: ({ ...props }: any) => <h3 className="font-bold mt-2 mb-1 text-sm" {...props} />,
  p: ({ ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({ ...props }: any) => <ul className="list-disc ms-5 space-y-1 my-2" {...props} />,
  ol: ({ ...props }: any) => <ol className="list-decimal ms-5 space-y-1 my-2" {...props} />,
  a: ({ ...props }: any) => (
    <a
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: any) => {
    if (!className) {
      return (
        <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre dir="ltr" className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mt-2 mb-2 text-xs">
        <code className="font-mono whitespace-pre" {...props}>{children}</code>
      </pre>
    );
  }
};

export function AIChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: language === 'en'
        ? "Hello! I'm Basel's AI assistant. I can answer questions about his experience, projects, skills, and research. How can I help you today?"
        : "مرحباً! أنا المساعد الذكي لباسل. يمكنني الإجابة على أسئلتك حول خبرته ومشاريعه ومهاراته وأبحاثه. كيف يمكنني مساعدتك اليوم؟",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && !isTyping) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isTyping]);

  const generateResponse = async (query: string, currentMessages: ChatMessage[]) => {
    setIsTyping(true);

    // Sliding window of the last 6 message turns (excluding initial greeting)
    const chatHistory = currentMessages
      .slice(1)
      .slice(-6)
      .map(msg => ({
        role: msg.sender === 'bot' ? 'CHATBOT' : 'USER',
        message: msg.text
      }));

    const API_URL = import.meta.env.VITE_API_URL || '';
    const botMsgId = Date.now().toString();

    // Optimistically insert empty bot message for token streaming
    setMessages(prev => [
      ...prev,
      {
        id: botMsgId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true
      }
    ]);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: query,
          chat_history: chatHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        throw new Error(errorData.detail || errorData.message || `API error ${response.status}`);
      }

      // Check if response is streamable
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let botText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(':')) continue;

            if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.slice(6).trim();
              if (dataStr === '[DONE]') break;

              try {
                const parsed = JSON.parse(dataStr);
                const token = parsed.token || parsed.text || parsed.delta || '';
                if (token) {
                  botText += token;
                  setMessages(prev =>
                    prev.map(m => (m.id === botMsgId ? { ...m, text: botText } : m))
                  );
                }
              } catch {
                // If raw string token was returned in data: payload
                botText += dataStr;
                setMessages(prev =>
                  prev.map(m => (m.id === botMsgId ? { ...m, text: botText } : m))
                );
              }
            }
          }
        }

        // Finalize streaming state
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? { ...m, text: botText || 'Response received.', isStreaming: false }
              : m
          )
        );
      } else {
        // Fallback for non-streaming response
        const data = await response.json();
        setMessages(prev =>
          prev.map(m =>
            m.id === botMsgId
              ? { ...m, text: data.text || data.response || '', isStreaming: false }
              : m
          )
        );
      }
    } catch (error: any) {
      console.error('Chat error:', error);

      let errorMessage = 'Sorry, I encountered an error. ';
      if (error.message.includes('API key')) {
        errorMessage += 'API key configuration issue. Please check the backend setup.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Backend service is unavailable. Please ensure the API is running.';
      } else if (error.message.includes('401')) {
        errorMessage += 'Invalid authentication credentials.';
      } else if (error.message.includes('429')) {
        errorMessage += 'Rate limit exceeded. Please try again in a moment.';
      } else {
        errorMessage += `${error.message}`;
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === botMsgId ? { ...m, text: errorMessage, isStreaming: false } : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: ChatMessage = {
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

    const userMsg: ChatMessage = {
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
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-transform hover:scale-110',
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
          isOpen ? 'hidden' : 'flex items-center gap-2 shadow-blue-500/25'
        )}
        aria-label="Open AI Assistant"
      >
        <FaCommentDots size={24} />
        <span className="font-semibold hidden sm:inline">{t.chatbot.title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[82vh] bg-white dark:bg-[#161b22] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-between text-white shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
                  <FaRobot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">{t.chatbot.title}</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online • Real-Time Stream
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <FaXmark size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0D1117]" dir="ltr">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    'flex gap-3 max-w-[88%]',
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                      msg.sender === 'user'
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    )}
                  >
                    {msg.sender === 'user' ? (
                      <FaUser size={14} className="text-gray-600 dark:text-gray-300" />
                    ) : (
                      <FaRobot size={14} className="text-white" />
                    )}
                  </div>

                  <div
                    dir="auto"
                    className={clsx(
                      'p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm flex-grow',
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-[#161b22] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-800'
                    )}
                  >
                    {msg.sender === 'user' ? (
                      msg.text
                    ) : msg.text ? (
                      <div>
                        <ReactMarkdown components={MarkdownComponents}>{msg.text}</ReactMarkdown>
                        {msg.isStreaming && (
                          <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ms-1 align-middle" />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-gray-400 py-1">
                        <FaSpinner size={14} className="animate-spin text-blue-500" />
                        <span>Generating response...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Suggestions Area */}
            <div className="p-4 bg-white dark:bg-[#161b22] border-t border-gray-100 dark:border-gray-800 shrink-0">
              {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
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
                  ref={inputRef}
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
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}