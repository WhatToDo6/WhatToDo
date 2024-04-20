export interface ColumnDataType {
  id?: number
  title: string
}

export interface TaskCardDataType {
  title: string
  description: string
  dueDate: string
  imageUrl: string
  tags?: string[]
}
