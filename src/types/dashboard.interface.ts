export interface ColumnTitleType {
  title: string
}

export interface ColumnDataType {
  id?: number
  title: string
}

export interface ColumnHeaderType {
  title: string
  taskCount: number | undefined
  columnId: number | undefined
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

export interface PaginationResponse<T> {
  data: T[]
  nextCursorId: number
  totalCount: number
}

export type GetTaskCards = PaginationResponse<TaskCardDataType>
