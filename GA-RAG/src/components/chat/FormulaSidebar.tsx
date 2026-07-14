// components/chat/FormulaSidebar.tsx
import { ChevronLeft } from 'lucide-react'
import katex from 'katex'

interface FormulaSidebarProps {
  onToggle?: () => void
}

function KatexFormula({ latex }: { latex: string }) {
  const html = katex.renderToString(latex, { throwOnError: false })
  return (
    <div
      className="flex items-center justify-center py-2 text-lg text-slate-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function FormulaItem({
  title,
  latex,
  description,
}: {
  title: string
  latex: string
  description?: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">{title}</p>
      <KatexFormula latex={latex} />
      {description && (
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{description}</p>
      )}
    </div>
  )
}

export default function FormulaSidebar({ onToggle }: FormulaSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_12px_rgba(160,175,192,0.12)] backdrop-blur-md">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">参考公式</h2>
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="收起参考公式"
            title="收起参考公式"
            className="flex size-7 items-center justify-center rounded-md text-[#0066cc] transition-colors hover:bg-slate-100 hover:text-[#0050b3]"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </header>

      <div className="dark-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto pr-1">
        <FormulaItem
          title="Russenes 判据"
          latex="I_b = \frac{\sigma_\theta}{\sigma_c} \times \kappa_s"
          description="当 I_b \gt 0.45 时为强烈岩爆区"
        />

        <FormulaItem
          title="突水系数"
          latex="T_s = \frac{P_{water}}{M_{equivalent} - C_p - h_d + S_c}"
          description="当 T_s \gt 0.06 \text{ MPa/m} 时超警戒线"
        />

        <FormulaItem
          title="围岩压力"
          latex="P_s = \gamma H"
          description="\gamma：岩体容重，H：埋深"
        />
      </div>
    </aside>
  )
}
