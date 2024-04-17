import { InputProps } from '@/src/types/input'

import S from './Text.module.scss'

const InputText = ({ placeholder, error, register }: InputProps) => {
  return (
    <input
      className={`${S.container} ${error && S.error}`}
      type="text"
      placeholder={placeholder}
      {...register('text', {
        required: '닉네임을 입력해주세요.',
      })}
    />
  )
}

export default InputText
