import { InputProps } from '@/src/types/input'
import { validateEmail } from '@/src/utils/validation'

import S from './Email.module.scss'

const InputEmail = ({ placeholder, error, register }: InputProps) => {
  return (
    <input
      className={`${S.container} ${error && S.error}`}
      type="email"
      placeholder={placeholder}
      {...register('email', {
        required: '이메일을 입력해주세요.',
        validate: {
          format: (value) =>
            validateEmail(value) || '이메일 형식으로 작성해 주세요.',
        },
      })}
    />
  )
}

export default InputEmail
