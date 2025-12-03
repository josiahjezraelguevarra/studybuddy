'use client'
import { Send, Paperclip, UserRound, Bot, Sparkles } from "lucide-react";
import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSession } from "next-auth/react"

// 1. Import your custom components

import FormUploadFile from '@/app/components/forms/FormUploadFile'
import Modal from "./Modal";

export default function FormChat() {
  const { data: session } = useSession()
  
  // 2. Add Modal State
  const [showModal, setShowModal] = useState(false)

  const { messages, sendMessage } = useChat({
    onError: (error) => setError(error.toString())
  });

  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

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
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex flex-col flex-1 overflow-hidden bg-white">

        {!hasMessages ? (
          /* -------------------------------------------------- */
          /* VIEW 1: WELCOME SCREEN                             */
          /* -------------------------------------------------- */
          <div className="flex flex-col flex-1 justify-center items-center px-4">
            <div className="max-w-lg w-full mx-auto text-center mb-10 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Sparkles className="w-8 h-8 text-gray-800" />
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Hello, {session?.user?.name || "Guest"}!
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed text-balance">
                Welcome to <span className="font-semibold text-gray-900">Study Helper</span>.
                <br />
                {!session && (
                  <>
                    <a className="underline decoration-gray-400 underline-offset-4 hover:decoration-gray-900 hover:text-gray-900 transition-all font-medium" href="/Sign-up">
                      Create your free account
                    </a>{' '}
                    and upload your notes to get instant AI-powered study help.
                  </>
                )}
                {session && "Upload your notes to get instant AI-powered study help."}
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

                {/* 3. Updated Upload Trigger (Welcome View) */}
                {session && (
                  <button
                    type="button" 
                    onClick={() => setShowModal(true)}
                    className="absolute bottom-3 right-12 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
                    title="Upload File"
                  >
                    <Paperclip className="w-5 h-5 text-gray-800" />
                  </button>
                )}

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
          /* VIEW 2: CHAT SCREEN                                */
          /* -------------------------------------------------- */
          <>
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              <div className="max-w-2xl mx-auto">
                {messages.map((message) => (
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
                            <div key={i} className={`p-3 rounded-xl ${message.role === "user" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
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
              className="sticky bottom-0 bg-white pt-3 pb-5 border-t shadow-md flex justify-center"
            >
              <div className="relative max-w-2xl w-full">
                <textarea
                  name="message"
                  placeholder="What do you want to know?"
                  className="w-full bg-white border rounded-2xl resize-none text-[16px] p-3 pr-16"
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

                {/* 4. Updated Upload Trigger (Chat View) */}
                {session && (
                  <button
                    type="button" 
                    onClick={() => setShowModal(true)}
                    className="absolute bottom-3 right-12 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
                    title="Upload File"
                  >
                    <Paperclip className="w-5 h-5 text-gray-800" />
                  </button>
                )}

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

      {/* 5. MODAL LOGIC */}
      {showModal && (
        <Modal
          title={`Upload file`}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-5">
            <p className="text-sm text-gray-600">Accepts PDF file only.</p>
            {/* Pass setShowModal so the form can close the modal upon success */}
            <FormUploadFile setShowModal={setShowModal} />
          </div>
        </Modal>
      )}

    </div>
  );
}