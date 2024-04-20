import Image from 'next/image'
import { useState } from 'react'

import CHECK_IMG from '@/public/icons/check.svg'

import S from './ColorChip.module.scss'

const chipColor = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA']

/**
 *
 * @param selectedChipColor - 선택된 chip의 색상을 전달
 * @param selectedChipOnly - 선택된 chip만을 보여줄 때 사용
 * @returns
 */
const ColorChip = ({
  selectedChipColor = '#7AC555',
  showSelectedOnly = false,
}) => {
  const [selectedChip, setSelectedChip] = useState(selectedChipColor)

  const handleSelectChip = (color: string) => {
    setSelectedChip(color)
  }

  return (
    <div className={S.container}>
      {chipColor.map((color) => {
        if (showSelectedOnly && selectedChip !== color) {
          return null
        }
        return (
          <div
            key={color}
            className={S.selected}
            onClick={() => handleSelectChip(color)}
          >
            <div className={S.chipSize} style={{ backgroundColor: color }} />
            {selectedChip === color && (
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
