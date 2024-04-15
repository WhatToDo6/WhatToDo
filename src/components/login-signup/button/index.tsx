import { ButtonHTMLAttributes } from 'react'

import S from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

// TODO: 비활성화 버튼 스타일링
const Button = ({ children }: ButtonProps) => {
  return <button className={S.button}>{children}</button>
}

export default Button
