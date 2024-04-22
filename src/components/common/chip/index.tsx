import Image from 'next/image'

import CHECK_IMG from '@/public/icons/check.svg'

import S from './ColorChip.module.scss'

const chipColor = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA']

interface ColorChipProps {
  showSelectedOnly?: boolean
  selectedColor?: string
  setSelectedColor?: any
}

/**
 * @param selectedColor - 상위에서 넘겨줄 colorChip state
 * @param setSelectedColor - colorChip setState 함수
 * @param selectedChipOnly - 선택된 chip만을 보여줄 때 사용
 * @returns
 */
const ColorChip = ({
  showSelectedOnly = false,
  selectedColor,
  setSelectedColor,
}: ColorChipProps) => {
  const handleSelectChip = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <div className={S.container}>
      {chipColor.map((color) => {
        if (showSelectedOnly && selectedColor !== color) {
          return null
        }
        return (
          <div
            key={color}
            className={S.selected}
            onClick={() => handleSelectChip(color)}
          >
            <div className={S.chipSize} style={{ backgroundColor: color }} />
            {selectedColor === color && (
              <Image
                className={S.check}
                src={CHECK_IMG}
                alt="선택"
                width={24}
                height={24}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ColorChip
