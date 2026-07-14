import { create } from 'zustand'

export interface Message {
  id: string
  role: 'student' | 'system'
  content: string
  timestamp: number
}

interface ChatState {
  sessionId: string
  messages: Message[]
  isThinking: boolean

  addMessage: (msg: Message) => void
  setThinking: (v: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: `stu_${Date.now()}`,
  messages: [],
  isThinking: false,

  addMessage: (msg) =>
    set((s) => ({ messages: [...s.messages, msg] })),
  setThinking: (v) => set({ isThinking: v }),
}))
