import Image from 'next/image'
import { useEffect, useState } from 'react'

import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'
import DELETE_ICON from '@/public/icons/delete.svg'
import { InputProps } from '@/src/types/input'
import { MemberProps } from '@/src/types/member'

import dummyData from './dummyData'
import S from './Manager.module.scss'
import ManagerProfile from '../../../manager-profile'

// TODO: 초대받은 인원 api 연결
const DropDownManager = ({ placeholder, setValue }: InputProps) => {
  const memberData: MemberProps[] = dummyData[0].members

  const [isOpen, setIsOpen] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
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

  const undo = () => {
    setNickname(null)
    setUserId(null)
    setInputValue('')
  }

  useEffect(() => {
    displayList.length < memberData.length && setIsOpen(true)
    displayList.length === memberData.length && setIsOpen(false)
    displayList.length === 0 && setDisplayList(memberData)
  }, [displayList])

  const error = userId === null && inputValue !== ''
  useEffect(() => {
    setValue('manager', userId)
  }, [userId, setValue])

  return (
    <div className={S.container}>
      <div
        className={`${S.inputContainer} ${(isOpen === true || isFocus === true) && S.focus} ${error === true && S.error}`}
      >
        <div>
          {nickname ? (
            <div className={S.selected} onClick={undo}>
              <ManagerProfile
                profileImageUrl={null}
                nickname={nickname}
                type="dropdown"
                userId={userId}
              />
              <Image src={DELETE_ICON} alt="삭제" width={20} height={20} />
            </div>
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              className={S.input}
              value={inputValue}
              onChange={(e) => searchManager(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setIsFocus(false)
                setIsOpen(false)
              }}
            />
          )}
        </div>
        <Image
          src={ARROW_ICON}
          alt="열기"
          width={26}
          height={26}
          onClick={() => setIsOpen(!isOpen)}
          className={S.icon}
        />
      </div>
      {error && <div className={S.errorText}>존재하지 않는 유저입니다</div>}
      {isOpen && (
        <div className={S.dropdown}>
          {nickname && (
            <div
              className={S.member}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <Image src={CHECK_ICON} alt="선택됨" width={20} height={20} />
              <ManagerProfile
                profileImageUrl={null}
                nickname={nickname}
                type="dropdown"
                userId={userId}
              />
            </div>
          )}
          {displayList
            .filter((elem) => elem.id !== userId)
            .map((elem) => {
              return (
                <div
                  key={elem.id}
                  className={`${S.member} ${S.unselected}`}
                  onClick={() => {
                    setUserId(elem.userId)
                    setNickname(elem.nickname)
                    setInputValue(elem.nickname)
                    setIsOpen(false)
                    setIsFocus(false)
                  }}
                >
                  <ManagerProfile
                    profileImageUrl={null}
                    nickname={elem.nickname}
                    type="dropdown"
                    userId={userId}
                  />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default DropDownManager
