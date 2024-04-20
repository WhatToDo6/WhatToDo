export interface ColumnDataType {
  id?: number
  title: string
}

export interface TaskCardDataType {
  id: number
  title: string
  description: string
  dueDate: string
  imageUrl: string
  tags?: string[]
}

export type TaskCardDateType = {
  dueDate: string
}
