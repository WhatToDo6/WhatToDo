import { TaskCardDataType } from './dashboard'
import { InputFormValues } from './input'
import { DashboardEditMakeParamType } from './mydashboard'

export interface ModalAlertProps {
  content: string
  buttonText: string
  moveTo?: string
}

export interface ModalConfirmProps {
  content: string
  leftButtonText: string
  rightButtonText: string
  onClick: () => void
}

export interface ModalTodoProps {
  columnId: number | undefined
  dashboardId: number
  onCreateTaskCard: (newTaskCard: TaskCardDataType) => void
}

export interface ModalDashBoardProps {
  columnId?: number | undefined
  title: string
  inputTitle: string
  inputType: 'newColumn' | 'columnName' | 'email'
  placeholder: string
  leftButtonText: string
  rightButtonText: string
  moveTo?: string
  currentColumn?: string
  showDeleteButton?: boolean
  onSubmit: (data: InputFormValues) => void
}

export interface ModalDeleteColumnProps {
  columnId: number | undefined
  content: string
  leftButtonText: string
  rightButtonText: string
  moveTo?: string
}

export interface ModalEdittodoProps {
  cardData: TaskCardDataType
  setCardData: React.Dispatch<React.SetStateAction<any>> //TODO: 타입 명시
}

export interface ModalNewDashProps {
  moveTo?: string
  onSubmit: (data: DashboardEditMakeParamType) => void
}

export interface ModalTaskProps {
  cardId: number
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
  columnId: number | undefined
  columnTitle: string
  cardData: TaskCardDataType
  setCardData: React.Dispatch<React.SetStateAction<TaskCardDataType>>
  setTaskCards: React.Dispatch<React.SetStateAction<TaskCardDataType[]>>
}
