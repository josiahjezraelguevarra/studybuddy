'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef } from 'react'
import { UserRound, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function FormChat() {
  // AI SDK
  const { messages, sendMessage } = useChat({
    onError: (error) => {
      console.log('error: ', error)
      setError(error.toString())
    },
  })

  // States
  const [error, setError] = useState('')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Functions
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      // trigger
      const form = e.currentTarget.form
      if (form && input.trim()) {
        form.requestSubmit()
      }
    }
  }

  // Handle chat
  async function handleChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!input) return

    try {
      setIsLoading(true)
      await sendMessage({ text: input })
      setInput('')
    } catch (error: any) {
      console.log('error: ', error)
      setError(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto">
      {/* Message Display Area */}
      {messages && messages.length > 0 && (
        <div className="flex-1 flex flex-col gap-1">
          {messages.map((message) => (
            <div
              data-loading={isLoading}
              key={message.id}
              className="flex gap-3  p-2"
            >
              {message.role === 'user' ? (
                <div className="h-10 w-10 aspect-square rounded-full border flex items-center justify-center bg-gray-300">
                  <UserRound />
                </div>
              ) : (
                <div className="h-10 w-10 aspect-square rounded-full border flex items-center justify-center bg-gray-300">
                  <Bot />
                </div>
              )}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="bg-gray-200 flex flex-col items-center p-3 rounded-md"
                      >
                        <div className="[&>p]:mb-3 [&>p]:last:mb-0 [&>ul]:mb-4 [&>ul>li]:list-disc [&>ul>li]:ml-5 [&>ol>li]:list-decimal [&>ol>li]:ml-5">
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      </div>
                    )
                }
              })}
            </div>
          ))}
          {/** Mark end of chat */}
          <div ref={messagesEndRef} />
        </div>
      )}
      <form
        data-loading={isLoading}
        onSubmit={(e) => handleChat(e)}
        className="max-w-md w-full mx-auto flex-1 sticky bottom-10 flex flex-col gap-2 bg-white"
      >
        <div className="form-control">
          <textarea
            name="message"
            placeholder="What do you want to know?"
            className="w-full p-2 border rounded resize-none"
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => {
              console.log(e.currentTarget.value)
              setInput(e.currentTarget.value)
            }}
          ></textarea>
        </div>

        {error && <div className="alert alert--error">{error}</div>}

        <div className="flex justify-center mt-2">
          <button type="submit" className="absolute bottom-7.5 right-2 bg-blue-600 px-4 py-1 rounded text-white hover:bg-blue-700 transition">
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}