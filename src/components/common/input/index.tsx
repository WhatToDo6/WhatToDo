import { InputInterface } from '@/src/types/input'

import InputEmail from './email'
import S from './Input.module.scss'
import InputNewPassword from './new-password'
import InputNewPasswordCheck from './new-password-check'
import InputPassword from './password'
import InputPasswordCheck from './password-check'
import InputText from './text'

const Input = ({
  inputType,
  placeholder,
  error,
  register,
  password,
  newPassword,
  currentPassword,
  size,
  disabled,
  required = true,
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
        size={size || ''}
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
    newPassword: (
      <InputNewPassword
        placeholder={placeholder}
        error={error}
        register={register}
        currentPassword={currentPassword || ''}
        size={size || ''}
      />
    ),
    newPasswordCheck: (
      <InputNewPasswordCheck
        placeholder={placeholder}
        error={error}
        register={register}
        newPassword={newPassword || ''}
        size={size || ''}
      />
    ),
    nickname: (
      <InputText
        placeholder={placeholder}
        error={error}
        register={register}
        textType="nickname"
        size={size || ''}
        disabled={disabled || false}
        required={required || false}
      />
    ),
    title: (
      <InputText
        placeholder={placeholder}
        error={error}
        register={register}
        textType="title"
        size={size || ''}
        disabled={disabled || false}
        required={required || false}
      />
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
