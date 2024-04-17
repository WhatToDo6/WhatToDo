import { FieldError, UseFormRegister } from 'react-hook-form'

export interface InputInterface {
  inputType:
    | 'email'
    | 'password'
    | 'passwordCheck'
    | 'nickname'
    | 'title'
    | 'date'
    | 'tag'
    | 'textarea'
  placeholder: string
  error: FieldError | undefined
  register: UseFormRegister<InputFormValues>
  password?: string // passwordCheck에서 password를 비교하기 위해 필요
}
export interface InputFormValues {
  email: string
  password: string
  passwordCheck: string
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
