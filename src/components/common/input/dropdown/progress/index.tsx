import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { ColumnContext } from '@/pages/dashboards/[id]'
import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'
import { InputProps } from '@/src/types/input'

import S from './Progress.module.scss'
import ProgressChip from '../../../chip/progress-chip'
import { CardContext } from '../../../modal/modal-edittodo'

const DropdownProgress = ({ setValue }: InputProps) => {
  const columnStatus = useContext(ColumnContext)
  const cardStatus = useContext(CardContext)
  const [isOpen, setIsOpen] = useState(false)
  const [columnId, setColumnId] = useState(cardStatus.columnId)

  useEffect(() => {
    setValue('status', columnId)
  }, [columnId, setValue])

  return (
    <div className={S.container}>
      <div
        className={`${S.inputContainer} ${isOpen === true && S.focus}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ProgressChip progress={columnStatus[columnId]} />
        <Image
          src={ARROW_ICON}
          alt="열기"
          width={26}
          height={26}
          className={S.icon}
        />
      </div>
      {isOpen && (
        <div className={S.dropdown}>
          <div className={S.member} onClick={() => setIsOpen(false)}>
            <Image src={CHECK_ICON} alt="선택됨" width={20} height={20} />
            <ProgressChip progress={columnStatus[columnId]} />
          </div>
          {Object.entries(columnStatus)
            .filter(([key, val]) => Number(key) !== columnId)
            .map((elem) => {
              const [id, title] = elem
              return (
                <div
                  key={id}
                  className={`${S.member} ${S.unselected}`}
                  onClick={() => {
                    setIsOpen(false)
                    id && setColumnId(Number(id))
                  }}
                >
                  <ProgressChip progress={title} />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default DropdownProgress
