import TableMode from '@/components/chat/TableMode'
import type { StructData } from '@/types/api'

export default function StructViewer({ data }: { data: StructData }) {
  switch (data.struct_type) {
    case 'table':
      return data.table_data ? <TableMode data={data.table_data} /> : null
    case 'graph':
      // TODO: GraphMode（任务 2）
      return null
    case 'algorithm':
      // TODO: AlgorithmMode（任务 3）
      return null
    default:
      return null
  }
}
