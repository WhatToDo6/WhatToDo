import S from './OptionButton.module.scss'
import BorderButton from '../border'

interface OptionButtonProps {
  size: 'xsmall' | 'small' | 'medium' | 'large'
  leftColor: 'white' | 'purple'
  rightColor: 'white' | 'purple'
  leftText: string
  rightText: string
  onLeftClick?: () => void
  onRightClick?: () => void
}
const OptionButton = ({
  size,
  leftColor,
  rightColor,
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
}: OptionButtonProps) => {
  return (
    <div className={S.container}>
      <BorderButton size={size} color={leftColor} onClick={onLeftClick}>
        {leftText}
      </BorderButton>
      <BorderButton size={size} color={rightColor} onClick={onRightClick}>
        {rightText}
      </BorderButton>
    </div>
  )
}

export default OptionButton
