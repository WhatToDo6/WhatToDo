import { FieldError, UseFormRegister } from 'react-hook-form'

export interface InputInterface {
  inputType:
    | 'email'
    | 'password'
    | 'passwordCheck'
    | 'newPassword'
    | 'newPasswordCheck'
    | 'nickname'
    | 'newNickname'
    | 'newColumn'
    | 'columnName'
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
  currentNickname?: string // 기존 닉네임과 새 닉네임을 비교하기 위해 필요
  currentColumn?: string // 기존 컬럼 이름과 새로운 칼럼 이름을 비교하기 위해 필요
}
export interface InputFormValues {
  email: string
  password: string
  passwordCheck: string
  newPassword: string
  newPasswordCheck: string
  nickname: string
  newNickname: string
  newColumn: string
  columnName: string
  title: string
  date: string
  tag: string
  textarea: string
  profileImageUrl: FileList
}

export interface InputProps {
  placeholder: string
  error: FieldError | undefined
  register: UseFormRegister<InputFormValues>
}
