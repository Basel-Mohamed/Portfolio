import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuSend, LuX, LuBot, LuMessageCircle, LuLoaderCircle } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';
import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../../types/portfolio';
import { useUI } from '../../lib/ui-strings';
import { OPEN_CHAT_EVENT } from '../../lib/site';

const MarkdownComponents: Record<string, React.FC<any>> = {
  h1: ({ ...props }: any) => <h1 className="font-bold mt-2 mb-1 text-lg" {...props} />,
  h2: ({ ...props }: any) => <h2 className="font-bold mt-2 mb-1 text-base" {...props} />,
  h3: ({ ...props }: any) => <h3 className="font-bold mt-2 mb-1 text-sm" {...props} />,
  p: ({ ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({ ...props }: any) => <ul className="list-disc ms-5 space-y-1 my-2" {...props} />,
  ol: ({ ...props }: any) => <ol className="list-decimal ms-5 space-y-1 my-2" {...props} />,
  a: ({ ...props }: any) => (
    <a
      className="font-medium text-coral-ink underline decoration-coral underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: any) => {
    if (!className) {
      return (
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre dir="ltr" className="my-2 overflow-x-auto rounded-lg bg-navy p-3 text-xs text-cream">
        <code className="font-mono whitespace-pre" {...props}>{children}</code>
      </pre>
    );
  }
};

export function AIChatbot() {
  const { t, language } = useLanguage();
  const ui = useUI();
  const [isOpen, setIsOpen] = useState(false);

  // Let other parts of the page (e.g. the Contact page) open the assistant.
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);
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
      // Same-origin serverless function (api/chat.ts) — on Vercel and in `npm run dev`.
      const response = await fetch('/api/chat', {
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

      const contentType = response.headers.get('content-type') || '';

      // Guard: an HTML page here means the request hit the SPA fallback, not the API.
      if (contentType.includes('text/html')) {
        throw new Error('Chat API endpoint not found (received HTML instead of a stream).');
      }

      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let botText = '';
        let buffer = '';

        let streamDone = false;
        while (!streamDone) {
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
              if (dataStr === '[DONE]') {
                streamDone = true;
                break;
              }

              let parsed: { token?: string; text?: string; delta?: string; error?: string } | null = null;
              try {
                parsed = JSON.parse(dataStr);
              } catch {
                parsed = null;
              }

              if (parsed?.error) throw new Error(parsed.error);
              const token = parsed ? parsed.token || parsed.text || parsed.delta || '' : dataStr;
              if (token) {
                botText += token;
                setMessages(prev =>
                  prev.map(m => (m.id === botMsgId ? { ...m, text: botText } : m))
                );
              }
            }
          }
        }
        if (streamDone) reader.cancel().catch(() => {});

        if (!botText.trim()) {
          throw new Error('The assistant returned an empty response.');
        }

        // Finalize streaming state
        setMessages(prev =>
          prev.map(m => (m.id === botMsgId ? { ...m, text: botText, isStreaming: false } : m))
        );
      } else {
        // Fallback for non-streaming JSON response
        const data = await response.json();
        const text: string = data.text || data.response || data.message?.content?.[0]?.text || '';
        if (!text.trim()) {
          throw new Error('The assistant returned an empty response.');
        }
        setMessages(prev =>
          prev.map(m => (m.id === botMsgId ? { ...m, text, isStreaming: false } : m))
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
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={clsx(
          'fixed end-4 bottom-4 z-40 h-13 items-center gap-2.5 rounded-full bg-ink ps-4 pe-5 text-bg shadow-xl shadow-navy/20 transition-transform duration-200 hover:-translate-y-0.5 sm:end-6 sm:bottom-6',
          isOpen ? 'hidden' : 'inline-flex'
        )}
        aria-label={ui.chat.open}
        aria-haspopup="dialog"
      >
        <span className="relative flex">
          <LuMessageCircle size={22} aria-hidden="true" />
          <span className="absolute -end-0.5 -top-0.5 size-2.5 rounded-full border-2 border-ink bg-coral" />
        </span>
        <span className="hidden text-sm font-medium sm:inline">{t.chatbot.title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={t.chatbot.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(620px,85dvh)] flex-col overflow-hidden rounded-3xl border border-line bg-bg text-ink shadow-2xl shadow-navy/25 sm:inset-x-auto sm:end-6 sm:bottom-6 sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between bg-inverse px-5 py-4 text-on-inverse">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-coral text-on-coral">
                  <LuBot size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold sm:text-base">{t.chatbot.title}</h2>
                  <p className="text-xs text-on-inverse-muted">{ui.chat.status}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-cream/10"
                aria-label={ui.chat.close}
              >
                <LuX size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-surface-2/50 p-4" dir="ltr" aria-live="polite">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx('flex max-w-[88%] gap-2.5', msg.sender === 'user' ? 'ms-auto flex-row-reverse' : '')}
                >
                  {msg.sender === 'bot' && (
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral">
                      <LuBot size={15} aria-hidden="true" />
                    </span>
                  )}
                  <div
                    dir="auto"
                    className={clsx(
                      'px-4 py-3 text-sm leading-relaxed',
                      msg.sender === 'user'
                        ? 'rounded-2xl rounded-se-md bg-ink text-bg'
                        : 'rounded-2xl rounded-ss-md border border-line bg-bg'
                    )}
                  >
                    {msg.sender === 'user' ? (
                      msg.text
                    ) : msg.text ? (
                      <div>
                        <ReactMarkdown components={MarkdownComponents}>{msg.text}</ReactMarkdown>
                        {msg.isStreaming && (
                          <span aria-hidden="true" className="ms-1 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-coral align-middle" />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 py-0.5 text-xs text-ink-muted">
                        <LuLoaderCircle size={14} className="animate-spin text-coral-ink" aria-hidden="true" />
                        <span>{ui.chat.thinking}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input + suggestions */}
            <div className="shrink-0 border-t border-line bg-bg p-4">
              {messages.length < 3 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {t.chatbot.suggestions.map((suggestion: string, idx: number) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isTyping}
                      className="rounded-full border border-line-strong px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <label htmlFor="chat-input" className="sr-only">
                  {t.chatbot.placeholder}
                </label>
                <input
                  id="chat-input"
                  ref={inputRef}
                  type="text"
                  autoComplete="off"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.chatbot.placeholder}
                  disabled={isTyping}
                  className="h-12 min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none disabled:opacity-60 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral transition-colors hover:bg-ink hover:text-bg disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={ui.chat.send}
                >
                  <LuSend size={18} aria-hidden="true" className="rtl:-scale-x-100" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
