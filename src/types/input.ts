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
    | 'newDash'
    | 'title'
    | 'date'
    | 'tag'
    | 'textarea'
    | 'image'
    | 'manager'
    | 'progress'
  placeholder?: string
  error?: FieldError | undefined
  register: UseFormRegister<InputFormValues>
  password?: string // passwordCheck에서 password를 비교하기 위해 필요
  currentPassword?: string // password와 newPassword를 비교하기 위해 필요
  newPassword?: string // newPasswordCheck에서 newPassword를 비교하기 위해 필요
  size?: string
  disabled?: boolean // input을 비활성하기 위해 필요
  required?: boolean // required가 필요하지 않은 경우를 위해 필요
  control?: any // react-hook-form의 control 객체
  setValue?: any // react-hook-form의 setValue 함수
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
  newDash: string
  columnName: string
  title: string
  date: string
  tags: string
  textarea: string
  profileImageUrl: FileList
  manager: number // 담당자 userId
}

export interface InputProps {
  placeholder?: string
  error?: FieldError | undefined
  register: UseFormRegister<InputFormValues>
  control?: any
  setValue?: any
}
