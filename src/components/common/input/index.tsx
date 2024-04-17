import { InputInterface } from '@/src/types/input'

import InputEmail from './email'
import S from './Input.module.scss'
import InputPassword from './password'
import InputPasswordCheck from './password-check'
import InputText from './text'

const Input = ({
  inputType,
  placeholder,
  error,
  register,
  password,
}: InputInterface) => {
  const INPUT_MAP = {
    email: (
      <InputEmail placeholder={placeholder} error={error} register={register} />
    ),
    password: (
      <InputPassword
        placeholder={placeholder}
        error={error}
        register={register}
      />
    ),
    passwordCheck: (
      <InputPasswordCheck
        placeholder={placeholder}
        error={error}
        register={register}
        password={password || ''}
      />
    ),
    text: (
      <InputText placeholder={placeholder} error={error} register={register} />
    ),
    date: <input type="date" />, // TODO: date input
    tag: <input type="tag" />, // TODO: tag input
    textarea: <textarea />, // TODO: textarea input
  }

  return (
    <>
      {INPUT_MAP[inputType]}
      <span className={S.errorText}>{error?.message}</span>
    </>
  )
}

export default Input
