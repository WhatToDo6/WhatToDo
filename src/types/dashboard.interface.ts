export interface ColumnTitleType {
  columnName?: string
  newColumn?: string
}

export interface ColumnDataType {
  id?: number
  title: string
  dashboardId: number
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
  tags: string[]
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
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
