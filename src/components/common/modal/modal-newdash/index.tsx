import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalNewDash.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import ColorChip from '../../chip/color-chip'
import Input from '../../input'

interface ModalNewDashProps {
  moveTo?: string
  onSubmit: () => void
}

/**
 *
 * @param moveTo - (optional) 버튼 클릭 시 이동할 페이지 경로
 * @param onSubmit - 오른쪽 버튼 클릭 시 수행해야할 함수
 * @returns
 */
const ModalNewDash = ({ moveTo, onSubmit }: ModalNewDashProps) => {
  const router = useRouter()
  const modalStatus = useContext(ModalContext)
  const [selectedColor, setSelectedColor] = useState('#7AC555')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleFormSubmit: SubmitHandler<InputFormValues> = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
    onSubmit()
  }

  return (
    <form className={S.container} onSubmit={handleSubmit(handleFormSubmit)}>
      <span className={S.title}>새로운 대시보드</span>
      <label className={S.inputTitle}>대시보드 이름</label>
      <Input
        inputType="newDash"
        placeholder="뉴프로젝트"
        register={register}
        error={errors.newDash}
        size="large"
      />
      <div className={S.colorChip}>
        <ColorChip
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText="취소"
          rightText="생성"
          onLeftClick={handleLeftClick}
        />
      </div>
    </form>
  )
}

export default ModalNewDash
