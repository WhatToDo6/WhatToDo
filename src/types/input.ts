import { FieldError, UseFormRegister } from 'react-hook-form'

export interface InputInterface {
  inputType:
    | 'email'
    | 'password'
    | 'passwordCheck'
    | 'newPassword'
    | 'newPasswordCheck'
    | 'nickname'
    | 'title'
    | 'date'
    | 'tag'
    | 'textarea'
  placeholder: string
  error: FieldError | undefined
  register: UseFormRegister<InputFormValues>
  password?: string // passwordCheck에서 password를 비교하기 위해 필요
  currentPassword?: string // password와 newPassword를 비교하기 위해 필요
  newPassword?: string // newPasswordCheck에서 newPassword를 비교하기 위해 필요
  size?: string
}
export interface InputFormValues {
  email: string
  password: string
  passwordCheck: string
  newPassword: string
  newPasswordCheck: string
  nickname: string
  title: string
  date: string
  tag: string
  textarea: string
}

export interface InputProps {
  placeholder: string
  error: FieldError | undefined
  register: UseFormRegister<InputFormValues>
}
