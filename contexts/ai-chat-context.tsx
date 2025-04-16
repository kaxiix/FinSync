"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

type AIChatContextType = {
  isOpen: boolean
  messages: Message[]
  isLoading: boolean
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => void
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const sendMessage = useCallback(
    async (message: string) => {
      setIsLoading(true)

      // Add user message to chat
      const userMessage: Message = { role: "user", content: message }
      setMessages((prev) => [...prev, userMessage])

      try {
        // Send message to API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response")
        }

        const data = await response.json()

        // Add assistant response to chat
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
      } catch (error) {
        console.error("Error in chat:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error. Please try again later.",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [messages],
  )

  return (
    <AIChatContext.Provider value={{ isOpen, messages, isLoading, openChat, closeChat, sendMessage }}>
      {children}
    </AIChatContext.Provider>
  )
}

export const useAIChat = () => {
  const context = useContext(AIChatContext)
  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider")
  }
  return context
}
