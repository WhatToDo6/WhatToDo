import Image from 'next/image'
import { useState } from 'react'

import CHECK_IMG from '@/public/icons/check.svg'

import S from './ColorChip.module.scss'
import { chipsData } from './constants'

/**
 *
 * @param selectedChipColor - 선택된 chip의 색상을 전달
 * @param selectedChipOnly - 선택된 chip만을 보여줄 때 사용
 * @returns
 */
const ColorChip = ({
  selectedChipColor = 'green',
  showSelectedOnly = false,
}) => {
  const [selectedChip, setSelectedChip] = useState(selectedChipColor)

  const handleSelectChip = (color: string) => {
    setSelectedChip(color)
  }

  return (
    <div className={S.container}>
      {chipsData.map((chip) => {
        if (showSelectedOnly && selectedChip !== chip.color) {
          return null
        }
        return (
          <div
            key={chip.color}
            className={S.selected}
            onClick={() => handleSelectChip(chip.color)}
          >
            <Image
              className={S.chipSize}
              src={chip.image}
              alt={`${chip.color} chip`}
              width={30}
              height={30}
            />
            {selectedChip === chip.color && (
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
