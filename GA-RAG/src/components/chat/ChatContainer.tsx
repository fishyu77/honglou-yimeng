// components/chat/ChatContainer.tsx
import { useEffect, useRef } from 'react'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import MessageBubble from './MessageBubble'
import StructViewer from '@/components/common/StructViewer'
import type { StructData } from '@/types/api'

const MOCK_STRUCT_DATA: StructData = {
  struct_type: 'table',
  table_data: {
    caption: '岩爆分级标准（Russenes 判据）',
    headers: ['岩爆等级', '$I_b$ 范围', '破坏特征'],
    rows: [
      ['A', '$< 0.2$', '轻微破坏，局部掉块'],
      ['B', '$0.2 - 0.45$', '中等破坏，片帮剥落'],
      ['C', '$0.45 - 0.8$', '强烈破坏，岩块弹射'],
      ['D', '$> 0.8$', '极强烈破坏，岩体崩解'],
    ],
  },
}
import InputPanel from './InputPanel'
import { useActiveSession } from '@/store/sessionStore'
import { useChat } from '@/hooks/useChat'

export default function ChatContainer() {
  const activeSession = useActiveSession()
  const { messages, sendMessage, isLoading } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  const sessionTitle = activeSession?.title ?? '新对话'

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
      <header className="border-b border-slate-200 px-6 py-4">
        <p className="text-sm text-slate-500">
          当前会话 · <span className="font-semibold text-slate-900">{sessionTitle}</span>
        </p>
      </header>

      <div ref={scrollRef} className="dark-scrollbar flex-1 space-y-6 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold text-slate-800">开始新的对话</p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              输入你的问题，GA-RAG 将结合参考公式与物理参数为你解答
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble
              key={m.id}
              role={m.role}
              name={m.name}
              content={<MarkdownRenderer content={m.content} />}
              thinking={m.thinking}
            >
              {m.viewer && <StructViewer data={MOCK_STRUCT_DATA} />}
            </MessageBubble>
          ))
        )}
      </div>

      <div className="border-t border-slate-200 p-5">
        <InputPanel onSend={sendMessage} disabled={isLoading} />
      </div>
    </section>
  )
}
