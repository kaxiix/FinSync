"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Loader2, Bot } from "lucide-react"
import { useAIChat } from "@/contexts/ai-chat-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedLogo } from "./animated-logo"
import ReactMarkdown from "react-markdown"

export function AIChat() {
  const { isOpen, closeChat, messages, sendMessage, isLoading } = useAIChat()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput("")
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="relative flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <AnimatedLogo size="sm" />
              <div>
                <h3 className="font-medium">FinX Assistant</h3>
                <p className="text-xs text-zinc-400">Your personal financial advisor</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeChat} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bot className="mb-4 h-12 w-12 text-zinc-500" />
                  <h3 className="mb-2 text-lg font-medium">How can I help you today?</h3>
                  <p className="max-w-xs text-sm text-zinc-400">
                    Ask me anything about your finances, budgeting, savings goals, or financial advice.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                        message.role === "user" ? "bg-cyan-500/10 text-white" : "bg-zinc-800/50 text-white"
                      }`}
                    >
                      {message.role !== "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-cyan-500/20 text-cyan-500">FX</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-1">
                        <div className="text-sm">
                          {message.role === "user" ? (
                            message.content
                          ) : (
                            <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                              {message.content}
                            </ReactMarkdown>
                          )}
                        </div>
                        <div className="text-right text-xs text-zinc-400">
                          {message.role === "user" ? "You" : "FinX Assistant"}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-zinc-700">You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-zinc-800 bg-zinc-900/50 p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your finances..."
                className="flex-1 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-full bg-cyan-500 text-white hover:bg-cyan-600"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
