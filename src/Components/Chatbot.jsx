import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import theme from './styles/theme.js';

// Simple markdown parser component
const MarkdownMessage = ({ content, style }) => {
  const parseMarkdown = (text) => {
    // Split by code blocks first
    const parts = [];
    let lastIndex = 0;
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      // Add code block
      parts.push({ type: 'code', language: match[1] || 'text', content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const renderText = (text) => {
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');

    // Inline code: `code`
    text = text.replace(/`(.+?)`/g, '<code style="background-color: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>');

    // Links: [text](url)
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">$1</a>');

    // Line breaks
    text = text.replace(/\n/g, '<br/>');

    // Bullet points: - item or * item
    text = text.replace(/^[\-\*] (.+)$/gm, '<li style="margin-left: 20px;">$1</li>');

    // Numbered lists: 1. item
    text = text.replace(/^\d+\. (.+)$/gm, '<li style="margin-left: 20px; list-style-type: decimal;">$1</li>');

    // Headers: ## Header
    text = text.replace(/^### (.+)$/gm, '<h3 style="font-weight: bold; margin-top: 8px; margin-bottom: 4px; font-size: 1em;">$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2 style="font-weight: bold; margin-top: 8px; margin-bottom: 4px; font-size: 1.1em;">$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1 style="font-weight: bold; margin-top: 8px; margin-bottom: 4px; font-size: 1.2em;">$1</h1>');

    return text;
  };

  const parts = parseMarkdown(content);

  return (
    <div style={style}>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <pre
              key={index}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '12px',
                borderRadius: '8px',
                overflowX: 'auto',
                marginTop: '8px',
                marginBottom: '8px',
                fontSize: '0.85em'
              }}
            >
              <code style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {part.content}
              </code>
            </pre>
          );
        } else {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: renderText(part.content) }}
            />
          );
        }
      })}
    </div>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m Basel\'s AI assistant. Feel free to ask me anything about his experience, skills, or projects!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { colors, fonts, radius } = theme;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Detect if text is RTL (Arabic, Hebrew, etc.)
  const isRTL = (text) => {
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return rtlRegex.test(text);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Check if API key exists
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;

      if (!apiKey) {
        throw new Error('API key not found. Please check your .env file.');
      }

      console.log('Sending request to Cohere...'); // Debug log

      // Call Cohere API with updated endpoint and format
      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          message: userMessage,
          model: 'command-r7b-12-2024',
          preamble: `You are an AI assistant representing Basel Mohamed Ahmed, an Associate AI Engineer.

Basel’s Profile:
- Full name: Basel Mohamed Ahmed
- Age: 24 years old
- Marital status: Single
- Location: Maadi, Cairo, Egypt
- Email: baselmohamed937@gmail.com
- Phone Number: +201007337686
- Background: Associate AI Engineer with strong hands-on experience in NLP, Generative AI, and Machine Learning.

Professional Experience:
- Works as an Associate AI Engineer at IT-RANKS Technology.
- Previously worked as a Frontend Developer and AI Trainer.
- Has trained and evaluated Large Language Models such as GPT, Gemini, Claude, and LLaMA using RLHF.
- Experienced in building end-to-end AI pipelines including data preprocessing, training, evaluation, and inference.

Technical Expertise:
- NLP, Generative AI, RAG systems, OCR, RLHF, Prompt Engineering
- Python, PyTorch, Hugging Face Transformers
- FastAPI, Flask, WebSocket
- Frontend experience with React.js and Next.js
- Cloud experience with Oracle OCI

Education:
- Bachelor’s Degree in Civil Engineering from Helwan University (2019–2024)

Your Role:
1. Answer questions about Basel’s experience, skills, projects, and background.
2. When asked about personal details (such as age or marital status), answer clearly and respectfully.
3. Keep responses professional, friendly, and human-like.
4. Do NOT overshare sensitive personal information beyond what is provided.
5. If a question is outside available information, say so honestly.
6. Encourage users to contact Basel directly for job opportunities or detailed discussions.
7. Respond in Arabic or English depending on the user’s language.
8. Use markdown formatting when helpful (lists, bold text, code blocks).

Tone & Style:
- Sound natural, confident, and professional (not robotic).
- Be concise but informative.
- Represent Basel as a motivated young AI Engineer with strong technical depth and real-world experience.`,
          temperature: 0.7,
          chat_history: messages.slice(1).map(msg => ({
            role: msg.role === 'assistant' ? 'CHATBOT' : 'USER',
            message: msg.content
          }))
        })
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData); // Debug log
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text || 'I received your message but couldn\'t generate a response. Please try again.'
      }]);

    } catch (error) {
      console.error('Detailed chat error:', error);

      let errorMessage = 'Sorry, I encountered an error. ';

      // More specific error messages
      if (error.message.includes('API key')) {
        errorMessage += 'API key configuration issue. Please check the setup.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else if (error.message.includes('401')) {
        errorMessage += 'Invalid API key. Please verify your Cohere API key.';
      } else if (error.message.includes('429')) {
        errorMessage += 'Rate limit exceeded. Please try again in a moment.';
      } else {
        errorMessage += `${error.message} Please try again or contact Basel directly at baselmohamed937@gmail.com`;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="
  fixed z-50 shadow-2xl flex flex-col
  bottom-24 right-6 w-96 h-[500px]
  max-sm:bottom-20 max-sm:right-3 max-sm:left-3 max-sm:w-auto max-sm:h-[70vh]
"          style={{
            backgroundColor: colors.background.card,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border.default,
            borderRadius: radius.xl
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between"
            style={{
              backgroundColor: colors.background.cardHover,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: colors.border.default
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: colors.accent.primary,
                  borderRadius: radius.full
                }}
              >
                <MessageCircle
                  className="w-5 h-5"
                  style={{ color: colors.accent.secondary }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: fonts.weight.bold,
                    color: colors.text.primary,
                    fontSize: fonts.size.lg
                  }}
                >
                  Chat with Basel's AI
                </h3>
                <p
                  style={{
                    fontSize: fonts.size.sm,
                    color: colors.text.muted
                  }}
                >
                  Ask me anything!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 transition-colors"
              style={{
                borderRadius: radius.lg,
                color: colors.text.tertiary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.background.card;
                e.currentTarget.style.color = colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.text.tertiary;
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const messageIsRTL = isRTL(message.content);

              return (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] p-3"
                    style={{
                      backgroundColor: message.role === 'user'
                        ? colors.accent.primary
                        : colors.background.cardHover,
                      color: message.role === 'user'
                        ? colors.accent.secondary
                        : colors.text.primary,
                      borderRadius: radius.lg,
                      fontSize: fonts.size.sm,
                      wordWrap: 'break-word',
                      direction: messageIsRTL ? 'rtl' : 'ltr',
                      textAlign: messageIsRTL ? 'right' : 'left'
                    }}
                  >
                    <MarkdownMessage
                      content={message.content}
                      style={{
                        color: message.role === 'user'
                          ? colors.accent.secondary
                          : colors.text.primary,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="p-3 flex items-center gap-2"
                  style={{
                    backgroundColor: colors.background.cardHover,
                    borderRadius: radius.lg
                  }}
                >
                  <Loader2
                    className="w-4 h-4 animate-spin"
                    style={{ color: colors.text.tertiary }}
                  />
                  <span
                    style={{
                      color: colors.text.tertiary,
                      fontSize: fonts.size.sm
                    }}
                  >
                    Typing...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-4"
            style={{
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
              borderTopColor: colors.border.default
            }}
          >
            <div
              className="flex gap-2 items-center p-2"
              style={{
                backgroundColor: colors.background.cardHover,
                borderRadius: radius.lg,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.border.default
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none px-2"
                style={{
                  color: colors.text.primary,
                  fontFamily: fonts.family.primary,
                  fontSize: fonts.size.sm,
                  direction: isRTL(inputValue) ? 'rtl' : 'ltr'
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 transition-all"
                style={{
                  backgroundColor: inputValue.trim() && !isLoading
                    ? colors.accent.primary
                    : colors.background.card,
                  color: inputValue.trim() && !isLoading
                    ? colors.accent.secondary
                    : colors.text.muted,
                  borderRadius: radius.lg,
                  cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed'
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 shadow-2xl flex items-center justify-center transition-all z-50"
        style={{
          backgroundColor: colors.accent.primary,
          color: colors.accent.secondary,
          borderRadius: radius.full,
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}