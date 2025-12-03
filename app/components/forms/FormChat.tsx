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

  // Auto-scroll effect (Recommended addition to keep chat usable)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div className="flex flex-col h-full overflow-hidden">

      {/* MAIN CHAT CONTAINER */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">

        {/* -------------------------------------------------- */}
        {/* VIEW 1: NO MESSAGES (CENTERED WELCOME & INPUT)     */}
        {/* -------------------------------------------------- */}
        {!hasMessages ? (
          <div className="flex flex-col flex-1 justify-center items-center px-4">
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
                  className="w-full pr-16 bg-white border rounded-2xl resize-none text-[16px] p-3"
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
                  className="absolute bottom-3 right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition"
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
          /* VIEW 2: HAS MESSAGES (YOUR ORIGINAL LAYOUT)        */
          /* -------------------------------------------------- */
          <>
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              <div className="max-w-2xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start m-2 gap-3 max-w-[75%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full border flex items-center justify-center bg-gray-300">
                        {message.role === "user" ? <UserRound /> : <Bot />}
                      </div>

                      <div className="flex flex-col">
                        {message.parts.map((part, i) =>
                          part.type === "text" ? (
                            <div
                              key={i}
                              className={`p-3 rounded-xl ${
                                message.role === "user"
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-200 text-black"
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

                <div ref={messagesEndRef} />
              </div>
            </div>

            <form
              onSubmit={handleChat}
              className="sticky bottom-0 bg-white py-4 border-t shadow-md flex justify-center"
            >
              <div className="relative max-w-2xl w-full">
                <textarea
                  name="message"
                  placeholder="What do you want to know?"
                  className="w-full pr-16 bg-white border rounded-2xl resize-none text-[16px] p-3"
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
                  className="absolute bottom-3 right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition"
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

      {error && <div className="p-2 text-red-600">{error}</div>}
    </div>
  );
}