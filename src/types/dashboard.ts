export interface AuthorType {
  id: number
  nickname: string
  profileImageUrl: string | null
}

export interface CommentsType {
  author: AuthorType
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
  columnId: number | undefined
  totalCount: number
}

export interface TaskCardDateProps {
  dueDate: string
}

export interface TaskCardAssigneeType {
  profileImageUrl: string
  nickname: string
  id: number
}

export interface TaskCardDataType {
  assignee: TaskCardAssigneeType
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

export interface PostTaskCardDataType {
  assigneeUserId: number
  cardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[] | undefined
  imageUrl: string | undefined
}

export interface PutTaskCardDataType {
  assigneeUserId: number
  columnId: number | undefined
  dashboardId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string | undefined
}

export interface PaginationResponse<T> {
  data: T[]
  nextCursorId: number | null
  totalCount: number
}

export type TaskCardsPromise = PaginationResponse<TaskCardDataType>
