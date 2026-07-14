import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoredMessage {
  id: number
  role: 'user' | 'assistant'
  name: string
  content: string
  thinking?: boolean
  viewer?: boolean
  
}

export interface ChatSession {
  id: string
  title: string
  messages: StoredMessage[]
  createdAt: number
  updatedAt: number
}

const DEFAULT_ASSISTANT_REPLY: StoredMessage = {
  id: 2,
  role: 'assistant',
  name: 'GA-RAG Agent',
  thinking: true,
  viewer: true,
  content:
    '同学，你好！请先查阅左侧的 Russenes 判据公式，并尝试代入你设定的 σθ（切向应力）与 σc（单轴抗压强度）计算 Ib 值。然后再看看可能产生的影响。',
}

function createSeedSessions(): ChatSession[] {
  const now = Date.now()
  return [
    {
      id: 'session_1',
      title: '2101班李明',
      createdAt: now - 86400000 * 2,
      updatedAt: now - 3600000,
      messages: [
        {
          id: 1,
          role: 'user',
          name: '2101班李明',
          content: '2400m 埋深花岗岩，会发生什么破坏？',
        },
        DEFAULT_ASSISTANT_REPLY,
      ],
    },
    {
      id: 'session_2',
      title: '关于突水系数的讨论',
      createdAt: now - 86400000,
      updatedAt: now - 7200000,
      messages: [
        {
          id: 1,
          role: 'user',
          name: '2203班王芳',
          content: '突水系数 Ts 的分母中，∑Mi 和 Cp 分别代表什么？',
        },
        {
          id: 2,
          role: 'assistant',
          name: 'GA-RAG Agent',
          content:
            '∑Mi 表示煤层上方各岩层厚度的加权总和，Cp 为安全隔水层厚度。当 Ts 超过临界值时，突水风险显著上升。你可以参考左侧突水系数公式进行代入计算。',
        },
      ],
    },
    {
      id: 'session_3',
      title: '围岩压力计算',
      createdAt: now - 43200000,
      updatedAt: now - 1800000,
      messages: [
        {
          id: 1,
          role: 'user',
          name: '2105班张伟',
          content: '埋深 1800m、容重 26kN/m³ 时，围岩压力 Ps 大约是多少？',
        },
        {
          id: 2,
          role: 'assistant',
          name: 'GA-RAG Agent',
          content:
            '根据 Ps = γH，代入 γ = 26 kN/m³、H = 1800 m，可得 Ps ≈ 46.8 MPa。请结合右侧参数面板调整具体数值。',
        },
      ],
    },
  ]
}

function generateSessionId() {
  return `session_${Date.now()}`
}

function generateTitleFromMessage(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return '新对话'
  return trimmed.length > 20 ? `${trimmed.slice(0, 20)}…` : trimmed
}

interface SessionState {
  updateLastMessage: (content: string) => void

  sessions: ChatSession[]
  activeSessionId: string

  createSession: () => void
  switchSession: (id: string) => void
  addMessage: (content: string, role?: 'user' | 'assistant', name?: string) => void
  renameSession: (id: string, title: string) => void
  deleteSession: (id: string) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: createSeedSessions(),
      activeSessionId: 'session_1',

      createSession: () => {
        const id = generateSessionId()
        const session: ChatSession = {
          id,
          title: '新对话',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((s) => ({
          sessions: [session, ...s.sessions],
          activeSessionId: id,
        }))
      },

      switchSession: (id) => {
        const exists = get().sessions.some((s) => s.id === id)
        if (exists) set({ activeSessionId: id })
      },

      addMessage: (content, role, name) => {
        const { activeSessionId, sessions } = get()
        const session = sessions.find((s) => s.id === activeSessionId)
        if (!session) return

        const isUser = role !== 'assistant'
        const msg: StoredMessage = {
          id: Date.now(),
          role: isUser ? 'user' : 'assistant',
          name:
            name ||
            (isUser
              ? session.title === '新对话'
                ? '学生'
                : session.title
              : 'GA-RAG Agent'),
          content,
        }

        const isFirstMessage = session.messages.length === 0
        const updatedSession: ChatSession = {
          ...session,
          title:
            isFirstMessage && isUser
              ? generateTitleFromMessage(content)
              : session.title,
          messages: [...session.messages, msg],
          updatedAt: Date.now(),
        }

        set({
          sessions: sessions.map((s) =>
            s.id === activeSessionId ? updatedSession : s,
          ),
        })
      },

      renameSession: (id, title) => {
        const trimmed = title.trim()
        if (!trimmed) return

        set((s) => ({
          sessions: s.sessions.map((session) =>
            session.id === id
              ? { ...session, title: trimmed, updatedAt: Date.now() }
              : session,
          ),
        }))
      },

      deleteSession: (id) => {
        const { sessions, activeSessionId } = get()
        const remaining = sessions.filter((s) => s.id !== id)

        if (remaining.length === 0) {
          const newId = generateSessionId()
          const newSession: ChatSession = {
            id: newId,
            title: '新对话',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }
          set({
            sessions: [newSession],
            activeSessionId: newId,
          })
          return
        }

        const nextActiveId =
          activeSessionId === id
            ? [...remaining].sort((a, b) => b.updatedAt - a.updatedAt)[0].id
            : activeSessionId

        set({
          sessions: remaining,
          activeSessionId: nextActiveId,
        })
      },

      updateLastMessage: (content) =>
        set((s) => {
          const sessions = s.sessions.map((session) => {
            if (session.id !== s.activeSessionId) return session
            const messages = [...session.messages]
            if (messages.length > 0) {
              messages[messages.length - 1] = {
                ...messages[messages.length - 1],
                content,
              }
            }
            return { ...session, messages }
          })
          return { sessions }
        }),

    }),
    {
      name: 'ga-rag-sessions',
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
      }),
    }
  )
)

export function useActiveSession() {
  return useSessionStore((s) => s.sessions.find((sess) => sess.id === s.activeSessionId))
}
