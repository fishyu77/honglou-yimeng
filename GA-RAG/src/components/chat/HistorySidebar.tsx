"use client"

import { useEffect, useRef, useState } from "react"
import { MoreHorizontal, Pencil, Plus, MessageSquare, Trash2 } from "lucide-react"
import { useSessionStore, type ChatSession } from "@/store/sessionStore"

function RenameDialog({
  session,
  onClose,
  onConfirm,
}: {
  session: ChatSession
  onClose: () => void
  onConfirm: (title: string) => void
}) {
  const [title, setTitle] = useState(session.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const submit = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onConfirm(trimmed)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-labelledby="rename-dialog-title"
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(160,175,192,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="rename-dialog-title" className="text-base font-semibold text-slate-900">
          重命名会话
        </h3>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit()
            if (e.key === "Escape") onClose()
          }}
          placeholder="输入会话名称"
          className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#91d5ff] focus:outline-none"
        />
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            取消
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!title.trim()}
            className="rounded-lg bg-[#0066cc] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0050b3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteConfirmDialog({
  sessionTitle,
  onClose,
  onConfirm,
}: {
  sessionTitle: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(160,175,192,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="delete-dialog-title" className="text-base font-semibold text-slate-900">
          确定要删除吗？
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          会话「{sessionTitle}」将被永久删除，此操作无法撤销。
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  )
}

function SessionMenu({
  sessionId,
  isOpen,
  onToggle,
  onRename,
  onDelete,
}: {
  sessionId: string
  isOpen: boolean
  onToggle: () => void
  onRename: () => void
  onDelete: () => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onToggle()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onToggle])

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="更多操作"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className={`flex size-7 items-center justify-center rounded-md transition-colors ${
          isOpen
            ? "bg-[#e6f7ff] text-[#0050b3]"
            : "text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-700 group-focus-within:opacity-100"
        }`}
      >
        <MoreHorizontal className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-lg border border-slate-200 bg-white py-1 shadow-[0_4px_12px_rgba(160,175,192,0.12)]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRename()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Pencil className="size-3.5 text-slate-500" />
            重命名
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-3.5" />
            删除会话
          </button>
        </div>
      )}
    </div>
  )
}

export default function HistorySidebar() {
  const sessions = useSessionStore((s) => s.sessions)
  const activeSessionId = useSessionStore((s) => s.activeSessionId)
  const createSession = useSessionStore((s) => s.createSession)
  const switchSession = useSessionStore((s) => s.switchSession)
  const renameSession = useSessionStore((s) => s.renameSession)
  const deleteSession = useSessionStore((s) => s.deleteSession)

  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [renamingSession, setRenamingSession] = useState<ChatSession | null>(null)
  const [deletingSession, setDeletingSession] = useState<ChatSession | null>(null)

  const sortedSessions = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt)

  const closeMenu = () => setOpenMenuId(null)

  return (
    <>
      <aside className="flex h-full w-[250px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
        <div className="border-b border-slate-200 p-4">
          <button
            type="button"
            onClick={createSession}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0066cc] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0050b3]"
          >
            <Plus className="size-4" />
            新建会话
          </button>
        </div>

        <div className="dark-scrollbar flex-1 overflow-y-auto p-3">
          <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-slate-400">
            历史记录
          </p>
          <ul className="space-y-0.5" role="listbox" aria-label="历史会话列表">
            {sortedSessions.map((session) => {
              const isActive = session.id === activeSessionId
              const isMenuOpen = openMenuId === session.id

              return (
                <li key={session.id}>
                  <div
                    className={`group flex items-center gap-1 rounded-lg pr-1 transition-colors ${
                      isActive
                        ? "bg-[#e6f7ff] ring-1 ring-[#91d5ff]"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        closeMenu()
                        switchSession(session.id)
                      }}
                      className={`flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "text-[#0050b3]" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <MessageSquare
                        className={`size-4 shrink-0 ${
                          isActive ? "text-[#0066cc]" : "text-slate-400 group-hover:text-slate-500"
                        }`}
                      />
                      <span className="min-w-0 flex-1 truncate">{session.title}</span>
                    </button>

                    <SessionMenu
                      sessionId={session.id}
                      isOpen={isMenuOpen}
                      onToggle={() => setOpenMenuId(isMenuOpen ? null : session.id)}
                      onRename={() => {
                        closeMenu()
                        setRenamingSession(session)
                      }}
                      onDelete={() => {
                        closeMenu()
                        setDeletingSession(session)
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      {renamingSession && (
        <RenameDialog
          session={renamingSession}
          onClose={() => setRenamingSession(null)}
          onConfirm={(title) => renameSession(renamingSession.id, title)}
        />
      )}

      {deletingSession && (
        <DeleteConfirmDialog
          sessionTitle={deletingSession.title}
          onClose={() => setDeletingSession(null)}
          onConfirm={() => deleteSession(deletingSession.id)}
        />
      )}
    </>
  )
}
