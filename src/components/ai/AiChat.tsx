'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMessageSquare, FiUser, FiCopy, FiCheck, FiBell, FiEdit3, FiMoreHorizontal, FiRefreshCw } from 'react-icons/fi';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type AiChatProps = {
  onRecommendationsReceived?: (recommendations: any) => void;
  initialMessage?: string;
};

export default function AiChat({ onRecommendationsReceived, initialMessage }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showRefineTips, setShowRefineTips] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Add welcome message when component mounts
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: initialMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [initialMessage, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Format messages for the API
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call the API
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      // Add the assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Call the callback with recommendations if provided
      if (onRecommendationsReceived && data.recommendations) {
        onRecommendationsReceived(data.recommendations);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focus the input after sending a message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize the textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  // Function to clear the chat
  const clearChat = () => {
    if (initialMessage) {
      setMessages([
        {
          role: 'assistant',
          content: initialMessage,
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages([]);
    }
  };

  // Add components for refining search tips
  const RefineTipsButton = () => (
    <button 
      onClick={() => setShowRefineTips(prev => !prev)}
      className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md transition-colors mt-2 border border-blue-200"
    >
      <FiEdit3 className="h-3 w-3" />
      Refine Your Request
    </button>
  );

  const RefineTips = () => (
    <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm mt-2 text-xs border border-blue-100 transition-all animate-in slide-in-from-bottom-3">
      <div className="font-medium mb-1.5 text-gray-700 dark:text-gray-300">Tips for better scraping results:</div>
      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
        <li>Specify your target audience (e.g., "tech enthusiasts", "new parents")</li>
        <li>Include relevant topics or industries</li>
        <li>Mention specific questions or pain points</li>
        <li>Add preferred timeframes if relevant</li>
      </ul>
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <span className="text-gray-500">Example:</span> <span className="italic">"Find discussions from software developers asking about React performance issues in enterprise apps"</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <FiMessageSquare className="h-5 w-5" />
          </div>
          <span className="font-medium">AI Lead Generation Assistant</span>
          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Online</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            onClick={clearChat}
            title="Clear chat"
          >
            <FiRefreshCw className="h-4 w-4" />
          </button>
          <button className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
            <FiMoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FiMessageSquare className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-sm max-w-md mx-auto">
              I'm your AI assistant for lead generation. Ask me about finding potential leads, optimizing your scraping parameters, or analyzing Reddit communities!
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] group ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 ml-2' 
                    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 mr-2'
                }`}>
                  {message.role === 'assistant' ? (
                    <FiMessageSquare className="h-4 w-4" />
                  ) : (
                    <FiUser className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl py-3 px-4 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm break-words">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70 flex justify-between items-center">
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => handleCopyText(message.content)}
                        className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                          copied === message.content ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                        title="Copy text"
                      >
                        {copied === message.content ? (
                          <FiCheck className="h-3.5 w-3.5" />
                        ) : (
                          <FiCopy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex rounded-lg shadow-sm relative bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about lead generation..."
            className="block w-full rounded-lg border-0 py-3 pl-4 pr-10 text-gray-900 dark:text-white bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 sm:text-sm resize-none min-h-[48px] max-h-[150px] overflow-auto"
            disabled={isLoading}
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`relative inline-flex items-center justify-center rounded-full w-8 h-8 text-white ${
                !inputValue.trim() || isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors`}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <FiSend className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
          <span>Press Enter to send, Shift+Enter for a new line</span>
          {inputValue.length > 0 && (
            <span>{inputValue.length} characters</span>
          )}
        </div>
        {showRefineTips ? <RefineTips /> : <RefineTipsButton />}
      </form>
    </div>
  );
}
