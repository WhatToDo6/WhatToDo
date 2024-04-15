import { ReactNode } from 'react'

import S from './BasicButton.module.scss'

interface ButtonProps {
  children: ReactNode
  size: 'small' | 'medium' | 'large'
  isDisabled?: boolean
  onClick?: () => void
}

const BasicButton = ({
  children,
  size,
  isDisabled = false,
  onClick,
}: ButtonProps) => {
  const sizeClass = S[size]

  return (
    <button
      className={`${S.button} ${sizeClass}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BasicButton
