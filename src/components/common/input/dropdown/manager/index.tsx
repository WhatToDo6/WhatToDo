import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import ARROW_ICON from '@/public/icons/arrow-dropdown.svg'
import CHECK_ICON from '@/public/icons/check-gray.svg'
import DELETE_ICON from '@/public/icons/delete.svg'
import { MembersContext } from '@/src/context/members'
import { InputProps } from '@/src/types/input'

import S from './Manager.module.scss'
import ManagerProfile from '../../../manager-profile'
import { CardContext } from '../../../modal/modal-edittodo'

const DropDownManager = ({ placeholder, setValue }: InputProps) => {
  const cardStatus = useContext(CardContext)
  const { headerMembers } = useContext(MembersContext)
  const memberData = headerMembers

  const [isOpen, setIsOpen] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [prevUserId, setPrevUserId] = useState<number | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [displayList, setDisplayList] = useState(memberData)
  const [imgUrl, setImgUrl] = useState<string | null>('')

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
    setImgUrl(null)
  }

  useEffect(() => {
    displayList.length < memberData.length && setIsOpen(true)
    displayList.length === memberData.length && setIsOpen(false)
    displayList.length === 0 && setDisplayList(memberData)
  }, [displayList])

  useEffect(() => {
    if (cardStatus?.assignee?.id) {
      setPrevUserId(cardStatus.assignee.id)
      setUserId(cardStatus.assignee.id)
      setNickname(cardStatus.assignee.nickname)
      setImgUrl(cardStatus.assignee.profileImageUrl)
    }
  }, [])

  const error = userId === null && inputValue !== ''
  useEffect(() => {
    setValue && setValue('manager', userId || prevUserId)
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
                profileImageUrl={imgUrl}
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
                profileImageUrl={imgUrl}
                nickname={nickname}
                type="dropdown"
                userId={userId}
              />
            </div>
          )}
          {displayList
            .filter((elem) => elem.userId !== userId)
            .map((elem) => {
              return (
                <div
                  key={elem.id}
                  className={`${S.member} ${S.unselected}`}
                  onClick={() => {
                    setUserId(elem.userId)
                    setNickname(elem.nickname)
                    setInputValue(elem.nickname)
                    setImgUrl(elem.profileImageUrl)
                    setIsOpen(false)
                    setIsFocus(false)
                  }}
                >
                  <ManagerProfile
                    profileImageUrl={elem.profileImageUrl}
                    nickname={elem.nickname}
                    type="dropdown"
                    userId={elem.userId}
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
