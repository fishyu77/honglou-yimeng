// components/chat/InputPanel.tsx
"use client"

import { useState } from "react"
import { Paperclip, Link2, Mic, Send } from "lucide-react"

interface InputPanelProps {
  onSend?: (value: string) => void
  disabled?: boolean
}

export default function InputPanel({ onSend, disabled }: InputPanelProps) {
  const [value, setValue] = useState("")
  const [composing, setComposing] = useState(false)

  const submit = () => {
    const text = value.trim()
    if (!text) return
    onSend?.(text)
    setValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 兼容中文/日文/韩文输入法：合成中不提交
    if (e.key === "Enter" && !e.shiftKey && !composing && e.keyCode !== 229) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md focus-within:border-[#91d5ff]">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={() => setComposing(false)}
        rows={2}
        placeholder="输入你的问题与参数代入结果…"
        aria-label="消息输入框"
        disabled={disabled}
        className="w-full resize-none bg-transparent px-2 py-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
      />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="添加附件"
            className="flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Paperclip className="size-4" />
          </button>
          <button
            type="button"
            aria-label="插入链接"
            className="flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Link2 className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="语音输入"
            className="flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Mic className="size-4" />
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={disabled}
            className="flex items-center gap-1.5 rounded-lg bg-[#0066cc] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0050b3] disabled:opacity-50"
          >
            <Send className="size-4" />
            发送
          </button>
        </div>
      </div>
    </div>
  )
}
