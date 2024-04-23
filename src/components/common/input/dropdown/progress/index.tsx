import Image from 'next/image'
import { useEffect, useState } from 'react'

import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'
import { InputProps } from '@/src/types/input'

import S from './Progress.module.scss'
import ProgressChip from '../../../chip/progress-chip'

const PROGRESS = [
  { id: 0, name: 'To Do' },
  { id: 1, name: 'On Progress' },
  { id: 2, name: 'Done' },
]

const DropdownProgress = ({ setValue }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStaus] = useState(0) //TODO: 현재 할 일의 상태 값으로 초기값 교체

  useEffect(() => {
    setValue('status', status)
  }, [status, setValue])

  return (
    <div className={S.container}>
      <div
        className={`${S.inputContainer} ${isOpen === true && S.focus}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ProgressChip progress={status} />
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
            <ProgressChip progress={status} />
          </div>
          {PROGRESS.filter((elem) => elem.id !== status).map((elem) => {
            return (
              <div
                key={elem.id}
                className={`${S.member} ${S.unselected}`}
                onClick={() => {
                  setIsOpen(false)
                  setStaus(elem.id)
                }}
              >
                <ProgressChip progress={elem.id} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DropdownProgress
