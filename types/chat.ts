export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: string
}

export interface ChatSession {
  id: string
  userId: string
  title: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

export interface ChatContextType {
  messages: ChatMessage[]
  isLoading: boolean
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => Promise<void>
  clearMessages: () => void
}
