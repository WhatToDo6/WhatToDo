import Image from 'next/image'
import { useState } from 'react'

import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'

import S from './Manager.module.scss'

const mockData = [
  {
    id: 1,
    name: '박찬호',
  },
  {
    id: 2,
    name: '김도영',
  },
  {
    id: 3,
    name: '이우성',
  },
]

// TODO: 초대받은 인원 api 연결
const DropDownManager = () => {
  const [isOpen, setIsOpen] = useState(false)

  // TODO: 검색 로직
  return (
    <div className={S.container}>
      <div className={S.inputContainer}>
        <input type="text" className={S.input} />
        <Image
          src={ARROW_ICON}
          alt="열기"
          width={26}
          height={26}
          onClick={() => setIsOpen(!isOpen)}
          className={S.icon}
        />
      </div>
      {isOpen && (
        <div className={S.dropdown}>
          {mockData.map((elem, idx) => {
            return (
              //TODO: 담당자 공통 UI 컴포넌트로 교체
              <div key={elem.id} className={S.member}>
                <Image
                  src={CHECK_ICON}
                  alt="선택됨"
                  width={26}
                  height={26}
                  className={idx === 0 ? '' : S.hidden}
                />
                <p className={S.result}>{elem.name}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DropDownManager
