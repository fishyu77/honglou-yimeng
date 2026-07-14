// components/chat/StructuredKnowledgeViewer.tsx
"use client"

import { useState } from "react"
import { LineChart, LayoutGrid, List } from "lucide-react"

type ViewMode = "chart" | "grid" | "list"

interface RockburstRow {
  level: string
  image?: string
  range: string
  feature: string
}

const ROCKBURST_ROWS: RockburstRow[] = [
  {
    level: "A",
    range: "Ib < 0.0",
    feature: "岩爆分级级别，破坏、破坏结构性，破坏分级断裂破坏特征",
  },
  {
    level: "B",
    image: "/rockburst/level-b.png",
    range: "0.2 - 0.5",
    feature: "岩爆分级级根，岩爆性、破坏破坏特征，全新韬芜破坏性能力",
  },
  {
    level: "C",
    image: "/rockburst/level-c.png",
    range: "0.5 - 0.8",
    feature: "岩爆分级级根，岩爆性、破坏、破坏抗压而潜韬，破坏柱历破韬破坏特征",
  },
  {
    level: "D",
    image: "/rockburst/level-d.png",
    range: "0.8 - 1.0",
    feature: "岩爆分级级根，岩爆性、破坏、破坏抗压而潜柱，破坏柱质破韬破坏特征",
  },
]

const TABS: { key: ViewMode; icon: typeof LineChart; label: string }[] = [
  { key: "chart", icon: LineChart, label: "图表视图" },
  { key: "grid", icon: LayoutGrid, label: "卡片视图" },
  { key: "list", icon: List, label: "列表视图" },
]

/* 右侧的知识图谱节点占位（数据可视化，非装饰性 SVG） */
function KnowledgeGraph() {
  const nodes = [
    { cx: 20, cy: 22, c: "fill-sky-400" },
    { cx: 55, cy: 14, c: "fill-emerald-400" },
    { cx: 84, cy: 26, c: "fill-orange-400" },
    { cx: 34, cy: 50, c: "fill-rose-400" },
    { cx: 68, cy: 48, c: "fill-sky-300" },
    { cx: 18, cy: 74, c: "fill-emerald-300" },
    { cx: 50, cy: 80, c: "fill-orange-300" },
    { cx: 82, cy: 72, c: "fill-rose-300" },
  ]
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [3, 5],
    [4, 6],
    [4, 7],
    [6, 7],
  ]
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="知识图谱示意">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          className="stroke-white/15"
          strokeWidth={0.6}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={3.4} className={n.c} />
      ))}
    </svg>
  )
}

/* 算法步骤流程占位 */
function AlgorithmSteps() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-500">
        算法步骤
      </span>
      <span className="h-2 w-px bg-slate-200" />
      <span className="rounded-md border border-[#91d5ff] bg-[#e6f7ff] px-3 py-1 text-[11px] text-[#0050b3]">
        步法
      </span>
      <span className="h-2 w-px bg-slate-200" />
      <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-500">
        输出
      </span>
    </div>
  )
}

export default function StructuredKnowledgeViewer() {
  const [mode, setMode] = useState<ViewMode>("chart")

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
      {/* 头部：标题 + 视图切换 */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">结构化知识查看器</h3>
        <div className="flex items-center gap-1">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              aria-label={label}
              aria-pressed={mode === key}
              className={`flex size-7 items-center justify-center rounded-md transition-colors ${
                mode === key
                  ? "bg-[#e6f7ff] text-[#0050b3]"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {/* 主体：表格 + 右侧图谱 */}
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_130px]">
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <caption className="border-b border-slate-200 bg-slate-50 py-2 text-center text-sm font-medium text-slate-800">
              岩爆分级标准
            </caption>
            <thead>
              <tr className="bg-slate-50 text-slate-700">
                <th className="border-b border-slate-200 px-3 py-2 font-medium">岩爆等级</th>
                <th className="border-b border-slate-200 px-3 py-2 font-medium">
                  I<sub>b</sub> 范围
                </th>
                <th className="border-b border-slate-200 px-3 py-2 font-medium">破坏特征</th>
              </tr>
            </thead>
            <tbody>
              {ROCKBURST_ROWS.map((row) => (
                <tr key={row.level} className="align-middle text-slate-700 odd:bg-slate-50/60">
                  <td className="border-b border-slate-100 px-3 py-2">
                    {row.image ? (
                      <img
                        src={row.image || "/placeholder.svg"}
                        alt={`岩爆等级 ${row.level} 岩样破坏形态`}
                        className="size-11 rounded-md object-cover ring-1 ring-slate-200"
                      />
                    ) : (
                      <span className="font-semibold text-slate-900">{row.level}</span>
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 font-mono text-[#0066cc]">
                    {row.range}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 leading-relaxed text-pretty text-slate-600">
                    {row.feature}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右侧辅助可视化 */}
        <div className="flex flex-col gap-3">
          <div className="h-24 rounded-lg border border-slate-200 bg-slate-50 p-2">
            <KnowledgeGraph />
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2">
            <AlgorithmSteps />
          </div>
        </div>
      </div>
    </div>
  )
}
