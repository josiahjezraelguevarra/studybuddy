'use client'
import { Send, Paperclip, UserRound, Bot } from "lucide-react";
import { useChat } from '@ai-sdk/react'
import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

export default function FormChat() {
  const { messages, sendMessage } = useChat({
    onError: (error) => setError(error.toString())
  });

  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col h-screen overflow-hidden bg-white">

      {/* CHAT MESSAGES (Scrolls internally) */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="max-w-2xl mx-auto">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start m-2 gap-3 max-w-[75%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
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

      {/* TEXT INPUT BAR (STAYS FIXED AT BOTTOM) */}
      <form
        onSubmit={handleChat}
        className="sticky bottom-0 bg-white py-4 px-4 border-t shadow-md flex justify-center"
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
          ></textarea>

          {/* Attachment */}
          <label className="absolute bottom-3 right-12 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
            <Paperclip className="w-5 h-5 text-gray-800" />
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
          </label>

          {/* Send */}
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

      {error && <div className="p-2 text-red-600">{error}</div>}
    </div>
  );
}
