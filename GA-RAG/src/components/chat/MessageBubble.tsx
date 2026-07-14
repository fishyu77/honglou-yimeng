// components/chat/MessageBubble.tsx
"use client"

import { Bot, User, Waypoints } from "lucide-react"

export interface MessageBubbleProps {
  role: "user" | "assistant"
  name: string
  content: React.ReactNode
  /* 是否显示 “ThinkingIndicator” 思考态 */
  thinking?: boolean
  /* AI 回复气泡下方可嵌入结构化组件（如知识查看器） */
  children?: React.ReactNode
}

export default function MessageBubble({
  role,
  name,
  content,
  thinking,
  children,
}: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* 头像 */}
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-[#0066cc] text-white"
            : "bg-[#e6f7ff] text-[#0050b3] ring-1 ring-[#91d5ff]"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="size-5" /> : <Bot className="size-5" />}
      </div>

      {/* 内容区 */}
      <div className={`flex max-w-[85%] flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        <span className="text-xs font-medium text-slate-500">{name}</span>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-tr-sm bg-[#0066cc] text-white shadow-sm"
              : "rounded-tl-sm border border-slate-200 bg-[#f8fafc] text-slate-700 shadow-sm"
          }`}
        >
          {content}

          {thinking && (
            <div className="mt-3 flex items-center gap-2 text-[#0066cc]">
              <Waypoints className="size-4 animate-pulse" />
              <span className="text-sm font-medium tracking-wide">ThinkingIndicator</span>
            </div>
          )}
        </div>

        {/* 嵌入的结构化组件 */}
        {children && <div className="w-full">{children}</div>}
      </div>
    </div>
  )
}
