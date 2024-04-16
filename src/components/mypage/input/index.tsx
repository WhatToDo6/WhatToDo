import S from './Input.module.scss'

interface InputProps {
  size: 'small' | 'large'
  placeholder?: string
  isDisabled?: boolean
}

const Input = ({ size, placeholder, isDisabled }: InputProps) => {
  const sizeClass = S[size]

  return (
    <input
      className={`${S.input} ${sizeClass}`}
      type="text"
      placeholder={placeholder}
      disabled={isDisabled}
    />
  )
}

export default Input
