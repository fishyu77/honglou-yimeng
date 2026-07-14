// components/common/GedRadar.tsx
"use client"

/* GED 能力雷达图（六维数据可视化占位） */
const AXES = [
  { label: "概念掌握", en: "Concepts", value: 0.75 },
  { label: "算理推导", en: "Derivation", value: 0.62 },
  { label: "模型应用", en: "Models", value: 0.55 },
  { label: "规范解读", en: "Regulations", value: 0.7 },
  { label: "模型应用", en: "Models", value: 0.5 },
  { label: "算理推导", en: "Derivation", value: 0.68 },
]

const SIZE = 120
const CENTER = SIZE / 2
const RADIUS = 42

function point(i: number, r: number) {
  const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  }
}

export default function GedRadar() {
  const dataPoints = AXES.map((a, i) => point(i, RADIUS * a.value))
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ")
  const gridLevels = [0.33, 0.66, 1]

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-[#0066cc]">GED雷达图</span>
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-20 w-20"
        role="img"
        aria-label="GED 能力雷达图"
      >
        {/* 网格 */}
        {gridLevels.map((lvl, li) => (
          <polygon
            key={li}
            points={AXES.map((_, i) => {
              const p = point(i, RADIUS * lvl)
              return `${p.x},${p.y}`
            }).join(" ")}
            className="fill-none stroke-slate-200"
            strokeWidth={0.5}
          />
        ))}
        {/* 轴线 */}
        {AXES.map((_, i) => {
          const p = point(i, RADIUS)
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              className="stroke-slate-200"
              strokeWidth={0.5}
            />
          )
        })}
        {/* 数据区 */}
        <polygon
          points={dataPath}
          className="fill-[#10b981]/20 stroke-[#10b981]"
          strokeWidth={1}
        />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.6} className="fill-[#10b981]" />
        ))}
      </svg>

      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-slate-900">2.3</span>
        <span className="text-[10px] text-slate-400">总分类</span>
      </div>
    </div>
  )
}
