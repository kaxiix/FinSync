"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

interface AIChatContextType {
  isOpen: boolean
  toggleChat: () => void
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  return <AIChatContext.Provider value={{ isOpen, toggleChat }}>{children}</AIChatContext.Provider>
}

export function useAIChat() {
  const context = useContext(AIChatContext)

  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider")
  }

  return context
}
