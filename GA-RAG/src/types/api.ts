export type StructType = 'table' | 'graph' | 'algorithm'

// 表格数据
export interface TableData {
  caption?: string
  headers: string[]
  rows: string[][]
}

// 图谱数据（占位，后面补）
export interface GraphData {
  nodes: { id: string; label: string; group?: string }[]
  edges: { source: string; target: string; relation?: string }[]
}

// 算法步骤（占位，后面补）
export interface AlgorithmStep {
  step: number
  title: string
  content: string
  result?: string
}

// 结构数据
export interface StructData {
  struct_type: StructType
  table_data?: TableData
  graph_data?: GraphData
  algorithm_steps?: AlgorithmStep[]
}
