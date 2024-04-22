import Image from 'next/image'
import { useEffect, useState } from 'react'

import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'
import { InputProps } from '@/src/types/input'
import { MemberProps } from '@/src/types/member'

import dummyData from './dummyData'
import S from './Manager.module.scss'

// TODO: 초대받은 인원 api 연결
const DropDownManager = ({ placeholder, setValue }: InputProps) => {
  const memberData: MemberProps[] = dummyData[0].members

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userId, setUserId] = useState(0)
  const [nickname, setNickname] = useState('')
  const [displayList, setDisplayList] = useState(memberData)

  const searchManager = (value: string) => {
    setInputValue(value)
    setDisplayList(
      memberData.filter((member) => {
        if (member.nickname.includes(value) && value !== '') {
          return member
        }
      }),
    )
  }

  useEffect(() => {
    displayList.length < memberData.length && setIsOpen(true)
    displayList.length === memberData.length && setIsOpen(false)
    displayList.length === 0 && setDisplayList(memberData)
  }, [displayList])

  useEffect(() => {
    setValue('manager', userId)
  }, [userId, setValue])

  return (
    <div className={S.container}>
      <div className={S.inputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          className={S.input}
          value={inputValue}
          onChange={(e) => searchManager(e.target.value)}
        />
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
          {userId !== 0 && (
            <div className={S.member}>
              <Image src={CHECK_ICON} alt="선택됨" width={20} height={20} />
              {/* TODO: 담당자 공통 UI 컴포넌트로 교체 */}
              <p className={S.name}>{nickname}</p>
            </div>
          )}
          {displayList
            .filter((elem) => elem.id !== userId)
            .map((elem) => {
              return (
                <div key={elem.id} className={`${S.member} ${S.unselected}`}>
                  {/* TODO: 담당자 공통 UI 컴포넌트로 교체 */}
                  <p
                    className={S.name}
                    onClick={() => {
                      setUserId(elem.userId)
                      setNickname(elem.nickname)
                      setInputValue(elem.nickname)
                      setIsOpen(false)
                    }}
                  >
                    {elem.nickname}
                  </p>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default DropDownManager
