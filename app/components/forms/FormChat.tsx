'use client'
import { Send, Paperclip, UserRound, Bot } from "lucide-react";
import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function FormChat() {
  const { messages, sendMessage } = useChat({
    onError: (error) => setError(error.toString())
  });

  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  // Auto-scroll effect: Triggered by messages changing OR loading state starting
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  async function handleChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      await sendMessage({ text: input });
      setInput('');
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form && input.trim()) form.requestSubmit();
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden w-full">

      {/* MAIN CHAT CONTAINER */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white w-full relative">

        {/* -------------------------------------------------- */}
        {/* VIEW 1: NO MESSAGES (CENTERED WELCOME & INPUT)     */}
        {/* -------------------------------------------------- */}
        {!hasMessages ? (
          <div className="flex flex-col flex-1 justify-center items-center px-4 w-full">
            <div className="max-w-md w-full mx-auto text-center mb-6">
              <h1 className="text-3xl font-bold">Hello, Guest!</h1>
              <p className="text-gray-700">
                Welcome to Study Buddy!{' '}
                <a className="underline" href="/Sign-up">Create your free account</a>{' '}
                and upload your notes to get instant AI-powered study help.
              </p>
            </div>

            <form 
              onSubmit={handleChat} 
              className="w-full max-w-xl flex flex-col items-center gap-3"
            >
              <div className="relative w-full">
                <textarea
                  name="message"
                  placeholder="What do you want to know?"
                  className="w-full pr-16 bg-white border rounded-2xl resize-none text-[16px] p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  style={{ minHeight: "3rem" }}
                  onInput={(e) => {
                    const el = e.target as HTMLTextAreaElement;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <label className="absolute bottom-3 right-12 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                  <Paperclip className="w-5 h-5 text-gray-800" />
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute bottom-3 right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                  ) : (
                    <Send className="w-4.5 h-4.5 text-white" />
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* -------------------------------------------------- */
          /* VIEW 2: HAS MESSAGES (FIXED WIDTHS)                */
          /* -------------------------------------------------- */
          <>
            {/* Messages Area - Added w-full to ensure it spans width */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 w-full">
              <div className="max-w-2xl mx-auto w-full pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[85%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="h-9 w-9 min-w-[2.25rem] rounded-full border flex items-center justify-center bg-gray-100">
                        {message.role === "user" ? <UserRound size={18} /> : <Bot size={18} />}
                      </div>

                      <div className="flex flex-col">
                        {message.parts.map((part, i) =>
                          part.type === "text" ? (
                            <div
                              key={i}
                              className={`p-3 rounded-2xl text-[15px] ${
                                message.role === "user"
                                  ? "bg-gray-800 text-white rounded-tr-none"
                                  : "bg-gray-100 text-black rounded-tl-none"
                              }`}
                            >
                              <ReactMarkdown>{part.text}</ReactMarkdown>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* --- THINKING INDICATOR --- */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                   <div className="flex w-full justify-start mb-4">
                    <div className="flex items-start gap-3 max-w-[85%]">
                      {/* Bot Icon */}
                      <div className="h-9 w-9 min-w-[2.25rem] rounded-full border flex items-center justify-center bg-gray-100">
                        <Bot size={18} />
                      </div>
                      
                      {/* Bubble with dots */}
                      <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 text-black">
                        <div className="flex space-x-1 h-3 items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Added w-full to the form tag */}
            <form
              onSubmit={handleChat}
              className="sticky bottom-0 bg-white py-4 border-t shadow-md flex justify-center w-full z-10"
            >
              <div className="relative max-w-2xl w-full px-4">
                <textarea
                  name="message"
                  placeholder="What do you want to know?"
                  className="w-full pr-16 bg-white border rounded-2xl resize-none text-[16px] p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  style={{ minHeight: "2.8rem", maxHeight: "7rem" }}
                  onInput={(e) => {
                    const el = e.target as HTMLTextAreaElement;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <label className="absolute bottom-3 right-12 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                  <Paperclip className="w-5 h-5 text-gray-800" />
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                </label>

                <button
                  type="submit"
                  disabled={isLoading} 
                  className="absolute bottom-3 right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                  ) : (
                    <Send className="w-4.5 h-4.5 text-white" />
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {error && <div className="p-2 text-red-600 absolute top-0 w-full text-center bg-red-100">{error}</div>}
    </div>
  );
}