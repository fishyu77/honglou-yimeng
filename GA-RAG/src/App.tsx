import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Settings, User, Network, ChevronRight, ChevronLeft } from 'lucide-react'
import GedRadar from '@/components/common/GedRadar'
import HistorySidebar from '@/components/chat/HistorySidebar'
import FormulaSidebar from '@/components/chat/FormulaSidebar'
import ChatContainer from '@/components/chat/ChatContainer'
import ParameterPanel from '@/components/common/ParameterPanel'
import KnowledgePage from '@/pages/KnowledgePage'
import GraphPage from '@/pages/Graphpage'
import ProfilePage from '@/pages/ProfilePage'

const TABS = [
  { key: '/', label: '智能问答' },
  { key: '/knowledge', label: '知识库' },
  { key: '/graph', label: '知识图谱' },
  { key: '/profile', label: '认知画像' },
]

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = TABS.find((t) => t.key === location.pathname)?.key || '/'
  const [formulaCollapsed, setFormulaCollapsed] = useState(false)
  const [paramCollapsed, setParamCollapsed] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-[#f4f6f9] text-slate-700">
      {/* ===== 顶部导航 ===== */}
      <header className="shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#e6f7ff] text-[#0050b3] ring-1 ring-[#91d5ff]">
              <Network className="size-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              GA-RAG <span className="text-slate-600">深地工程教学智能体</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <GedRadar />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="用户中心"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#91d5ff] hover:text-[#0050b3]"
            >
              <User className="size-5" />
            </button>
            <button
              type="button"
              aria-label="设置"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#91d5ff] hover:text-[#0050b3]"
            >
              <Settings className="size-5" />
            </button>
          </div>
        </div>
        <nav className="flex gap-6 px-6" aria-label="主导航">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => navigate(tab.key)}
              className={`relative py-3 text-sm font-medium transition-colors ${
                currentTab === tab.key
                  ? 'text-[#0066cc]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {currentTab === tab.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#0066cc]" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* ===== 页面内容 ===== */}
      <main className="flex flex-1 overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-1 gap-5 overflow-hidden bg-[#f4f6f9] p-5">
                {/* 第一栏：历史会话 */}
                <div className="hidden shrink-0 md:block">
                  <HistorySidebar />
                </div>
                {/* 第二栏：参考公式（可收起） */}
                <div className="relative hidden shrink-0 lg:block">
                  {formulaCollapsed ? (
                    <button
                      type="button"
                      onClick={() => setFormulaCollapsed(false)}
                      aria-label="展开参考公式"
                      className="flex h-full w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0066cc] shadow-sm transition-colors hover:border-[#91d5ff] hover:bg-slate-50"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  ) : (
                    <div className="h-full w-72 transition-all">
                      <FormulaSidebar onToggle={() => setFormulaCollapsed(true)} />
                    </div>
                  )}
                </div>
                {/* 中栏：对话区 */}
                <div className="min-w-0 flex-1">
                  <ChatContainer />
                </div>
                {/* 右栏：物理参数面板（可收起） */}
                <div className="relative hidden shrink-0 xl:block">
                  {paramCollapsed ? (
                    <button
                      type="button"
                      onClick={() => setParamCollapsed(false)}
                      aria-label="展开物理参数面板"
                      className="flex h-full w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0066cc] shadow-sm transition-colors hover:border-[#91d5ff] hover:bg-slate-50"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                  ) : (
                    <div className="h-full w-80 transition-all">
                      <ParameterPanel onToggle={() => setParamCollapsed(true)} />
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <NavBar />
    </Router>
  )
}
