// components/common/ParameterPanel.tsx
"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface ParameterPanelProps {
  onToggle?: () => void
}

interface ParamConfig {
  key: string
  label: React.ReactNode
  unit?: string
  min: number
  max: number
  step: number
  value: number
}

const INITIAL_PARAMS: ParamConfig[] = [
  {
    key: "sigmaTheta",
    label: (
      <>
        切向应力 σ<sub>θ</sub>
      </>
    ),
    unit: "Mpa",
    min: 0,
    max: 150,
    step: 1,
    value: 95,
  },
  {
    key: "sigmaC",
    label: (
      <>
        抗压强度 σ<sub>c</sub>
      </>
    ),
    unit: "Mpa",
    min: 0,
    max: 200,
    step: 1,
    value: 120,
  },
  {
    key: "kappaS",
    label: (
      <>
        侧压系数 κ<sub>s</sub>
      </>
    ),
    min: 0,
    max: 2,
    step: 0.1,
    value: 1.0,
  },
  {
    key: "pWater",
    label: (
      <>
        水压 P<sub>water</sub>
      </>
    ),
    unit: "Mpa",
    min: 0,
    max: 10,
    step: 0.1,
    value: 4.5,
  },
  {
    key: "mEq",
    label: (
      <>
        等效岩重 M<sub>eq</sub>
      </>
    ),
    unit: "t/m³",
    min: 0,
    max: 40,
    step: 0.5,
    value: 25.0,
  },
]

function ParamSlider({
  param,
  onChange,
}: {
  param: ParamConfig
  onChange: (v: number) => void
}) {
  const pct = ((param.value - param.min) / (param.max - param.min)) * 100
  const displayValue = Number.isInteger(param.value) ? param.value.toFixed(1) : param.value

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-slate-700">
          {param.label}
          <span className="text-[#0066cc]">[{displayValue}]</span>
        </span>
        {param.unit && <span className="text-xs text-slate-400">{param.unit}</span>}
      </div>

      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={param.value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`调整 ${param.key}`}
        className="ga-slider h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right, #0066cc ${pct}%, #e2e8f0 ${pct}%)`,
        }}
      />
    </div>
  )
}

export default function ParameterPanel({ onToggle }: ParameterPanelProps) {
  const [params, setParams] = useState<ParamConfig[]>(INITIAL_PARAMS)

  const update = (key: string, v: number) =>
    setParams((prev) => prev.map((p) => (p.key === key ? { ...p, value: v } : p)))

  return (
    <aside className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">物理参数面板</h2>
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="收起物理参数面板"
            title="收起物理参数面板"
            className="flex size-7 items-center justify-center rounded-md text-[#0066cc] transition-colors hover:bg-slate-100 hover:text-[#0050b3]"
          >
            <ChevronRight className="size-4" />
          </button>
        )}
      </header>

      <div className="flex flex-1 flex-col gap-7 overflow-y-auto pr-1">
        {params.map((p) => (
          <ParamSlider key={p.key} param={p} onChange={(v) => update(p.key, v)} />
        ))}
      </div>

      {/* 自定义滑块拇指样式 */}
      {/* eslint-disable-next-line */}
<style>{`
        .ga-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #0066cc;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
          cursor: pointer;
        }
        .ga-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #0066cc;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
          cursor: pointer;
        }
      `}</style>
    </aside>
  )
}
