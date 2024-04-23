import { MouseEventHandler, ReactNode } from 'react'

import S from './BorderButton.module.scss'

interface BorderButtonProps {
  children: ReactNode
  size: 'xsmall' | 'small' | 'medium' | 'large' | 'extra' | 'change'
  color: 'white' | 'purple'
  onClick?: MouseEventHandler<HTMLButtonElement>
  isDisabled?: boolean
}

const BorderButton = ({
  children,
  size,
  color,
  onClick,
  isDisabled,
}: BorderButtonProps) => {
  const sizeClass = S[size]
  const colorClass = S[color]

  return (
    <button
      className={`${S.button} ${sizeClass} ${colorClass}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default BorderButton
