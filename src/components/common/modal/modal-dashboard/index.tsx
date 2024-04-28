import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalColumn.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'

interface ModalDashBoardProps {
  columnId?: number | undefined
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
  setIsDeleteEditModalOpen?: (boolean: boolean) => void
}

/**
 * @param columnId - 컬럼id
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
  setIsDeleteEditModalOpen,
}: ModalDashBoardProps) => {
  const router = useRouter()
  const modalStatus = useContext(ModalContext)
  const [isDisabled, setIsDisabled] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const ButtonDisabledCond =
    watch('email') || watch('newColumn') || watch('columnName')

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleFormSubmit: SubmitHandler<InputFormValues> = (data) => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
    onSubmit(data)
  }

  const handleDeleteClick = () => {
    setIsDeleteEditModalOpen?.(true)
  }

  useEffect(() => {
    setIsDisabled(!ButtonDisabledCond)
  }, [ButtonDisabledCond])

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
          isDisabled={isDisabled}
        />
      </div>
    </form>
  )
}

export default ModalDashBoard
