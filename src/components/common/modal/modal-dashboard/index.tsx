import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalColumn.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'

interface ModalDashBoardProps {
  title: string
  inputTitle: string
  inputType: 'newColumn' | 'columnName' | 'email'
  placeholder: string
  leftButtonText: string
  rightButtonText: string
  moveTo?: string
  currentColumn?: string
  showDeleteButton?: boolean
  onSubmit: (data: InputFormValues) => void
}

/**
 *
 * @param title - 모달 제목
 * @param inputTitle - input 제목
 * @param inputType - input type
 * @param placeholder - input placeholder
 * @param leftButtonText - 왼쪽 버튼 텍스트
 * @param rightButtonText - 오른쪽 버튼 텍스트
 * @param moveTo - (optional) 버튼 클릭 시 이동할 페이지 경로
 * @param currentColumn - (optional) 새 컬럼 생성 시 유효성 검사할 때 필요한 항목
 * @param showDeleteButton - (optional) 컬럼 관리 시 삭제하기 버튼 생성
 * @param onSubmit - 오른쪽 버튼 클릭 시 수행해야할 함수
 * @returns
 */
const ModalDashBoard = ({
  title,
  inputTitle,
  inputType,
  placeholder,
  leftButtonText,
  rightButtonText,
  moveTo,
  currentColumn,
  showDeleteButton,
  onSubmit,
}: ModalDashBoardProps) => {
  const router = useRouter()
  const modalStatus = useContext(ModalContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleFormSubmit: SubmitHandler<InputFormValues> = (data) => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
    console.log('Received columnName:', data)
    onSubmit(data)
  }

  const handleDeleteClick = () => {
    modalStatus.setIsOpen.call(null, false)
    // TODO 칼럼 삭제하기 기능 추가 해야 합니다 !
  }
  return (
    <form
      className={`${S.container} ${errors[inputType] ? S.error : ''} ${showDeleteButton && S.delete}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <span className={S.title}>{title}</span>
      <label className={S.inputTitle}>{inputTitle}</label>
      <Input
        inputType={inputType}
        placeholder={placeholder}
        register={register}
        error={errors[inputType]}
        currentColumn={currentColumn}
        size="large"
      />
      {showDeleteButton && (
        <div className={S.deleteButton} onClick={handleDeleteClick}>
          삭제하기
        </div>
      )}
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText={leftButtonText}
          rightText={rightButtonText}
          onLeftClick={handleLeftClick}
        />
      </div>
    </form>
  )
}

export default ModalDashBoard
