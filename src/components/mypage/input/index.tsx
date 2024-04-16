import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from 'react'

import S from './Input.module.scss'

interface InputProps {
  label?: string
  size: 'small' | 'large'
  type?: HTMLInputTypeAttribute
  placeholder?: string
  hasError?: boolean
  isDisabled?: boolean
  helperText?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const Input = ({
  label,
  size,
  type = 'text',
  placeholder,
  hasError,
  isDisabled,
  helperText,
  onChange,
  onBlur,
}: InputProps) => {
  const sizeClass = S[size]
  const errorClass = hasError ? S.error : ''

  return (
    <div className={S.container}>
      <label className={S.label}>{label}</label>
      <div className={S['input-container']}>
        <input
          className={`${S.input} ${sizeClass} ${errorClass}`}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        {hasError && helperText && <p className={S.helperText}>{helperText}</p>}
      </div>
    </div>
  )
}

export default Input
