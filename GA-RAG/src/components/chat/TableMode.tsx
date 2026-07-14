import MarkdownRenderer from '@/components/common/MarkdownRenderer'
import type { TableData } from '@/types/api'

export default function TableMode({ data }: { data: TableData }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left text-xs">
        {data.caption && (
          <caption className="border-b border-slate-200 bg-slate-50 py-2 text-center text-sm font-medium text-slate-800">
            {data.caption}
          </caption>
        )}
        <thead>
          <tr className="bg-slate-50 text-slate-700">
            {data.headers.map((h, i) => (
              <th key={i} className="border-b border-slate-200 px-3 py-2 font-medium">
                <MarkdownRenderer content={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="align-middle text-slate-700 odd:bg-slate-50/60">
              {row.map((cell, ci) => (
                <td key={ci} className="border-b border-slate-100 px-3 py-2">
                  <MarkdownRenderer content={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
