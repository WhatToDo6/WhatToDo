import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import ColorChip from '@/src/components/common/chip/color-chip'
import { InputFormValues } from '@/src/types/input'
import { ModalNewDashProps } from '@/src/types/modal'

import S from './ModalNewDash.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'

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
  const [isDisabled, setIsDisabled] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const handleLeftClick = () => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
  }

  const handleFormSubmit: SubmitHandler<InputFormValues> = (data) => {
    modalStatus.setIsOpen.call(null, false)
    moveTo && router.push(moveTo)
    const { newDash: title } = data
    const newData = { title: title, color: selectedColor }
    onSubmit(newData)
  }

  useEffect(() => {
    setIsDisabled(!watch('newDash'))
  }, [watch('newDash')])

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
          isDisabled={isDisabled}
          onLeftClick={handleLeftClick}
        />
      </div>
    </form>
  )
}

export default ModalNewDash
