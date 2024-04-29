import {
  Control,
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

export type InputType =
  | 'email'
  | 'password'
  | 'password-login'
  | 'passwordCheck'
  | 'newPassword'
  | 'newPasswordCheck'
  | 'nickname'
  | 'newNickname'
  | 'newColumn'
  | 'columnName'
  | 'newDash'
  | 'title'
  | 'date'
  | 'tag'
  | 'textarea'
  | 'image'
  | 'manager'
  | 'status'

export interface InputFormValues {
  email: string
  password: string
  passwordCheck: string
  newPassword: string
  newPasswordCheck: string
  nickname: string
  newNickname: string
  newColumn: string
  newDash: string
  columnName: string
  title: string
  date: Date | string | object | null | undefined
  tags: string[]
  textarea: string
  profileImageUrl: FileList
  manager: number | null
  status: number
}

export interface InputProps {
  placeholder?: string
  error?: FieldError | undefined
  register: UseFormRegister<InputFormValues>
  control?: Control<InputFormValues> | undefined
  setValue?: UseFormSetValue<InputFormValues> | undefined
}

export interface InputInterface extends InputProps {
  inputType: InputType
  password?: string
  currentPassword?: string
  newPassword?: string
  size?: string
  disabled?: boolean
  required?: boolean
  currentNickname?: string
  currentColumn?: string
  columnId?: number | undefined
  setImageUrl?: (url: string) => void
}
