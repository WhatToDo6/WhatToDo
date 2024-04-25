export interface CommentsType {
  author: {
    id: number
    nickname: string
    profileImageUrl: string | null
  }
  cardId: number
  content: string
  id: number
  createdAt: string
  updatedAt: string
  onDelete?: (commentId: number) => void
}

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

export interface TaskCardTagType {
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  colorIndex: number
}

export type TaskCardDataType = {
  columnId: number
  createdAt: string
  dashboardId: number
  description: string
  dueDate: string
  id: number
  imageUrl: string
  tags: string[]
  teamId: number
  title: string
  updatedAt: string
}

export interface PaginationResponse<T> {
  data: T[]
  nextCursorId: number
  totalCount: number
}

export type GetTaskCards = PaginationResponse<TaskCardTagType>
