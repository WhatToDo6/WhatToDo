import { ReactNode } from 'react'

import S from './BorderButton.module.scss'

interface BorderButtonProps {
  children: ReactNode
  size: 'xsmall' | 'small' | 'medium' | 'large'
  color: 'white' | 'purple'
  onClick?: () => void
}

const BorderButton = ({
  children,
  size,
  color,
  onClick,
}: BorderButtonProps) => {
  const sizeClass = S[size]
  const colorClass = S[color]

  return (
    <button
      className={`${S.button} ${sizeClass} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BorderButton
