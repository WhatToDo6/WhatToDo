import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalTodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'

const ModalTodo = () => {
  const modalStaus = useContext(ModalContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    // TODO: 할 일 생성 로직
    console.log(data)
  }

  return (
    <div className={S.modal}>
      <div className={S.container}>
        <h1 className={S.title}>할 일 생성</h1>
        <label className={S.label} htmlFor="keeper">
          담당자
        </label>
        <Input
          inputType="manager"
          placeholder="이름을 입력해주세요"
          register={register}
          setValue={setValue}
        />
        <label className={S.label} htmlFor="title">
          제목<span className={S.required}>*</span>
        </label>
        <Input
          inputType="title"
          placeholder="제목을 입력해주세요"
          error={errors.title}
          register={register}
        />
        <label className={S.label} htmlFor="description">
          설명<span className={S.required}>*</span>
        </label>
        <Input
          inputType="textarea"
          placeholder="설명을 입력해주세요"
          error={errors.textarea}
          register={register}
        />
        <label className={S.label} htmlFor="due">
          마감일
        </label>
        <Input
          inputType="date"
          placeholder="날짜를 입력해주세요"
          error={errors.date}
          register={register}
          control={control}
        />
        <label className={S.label} htmlFor="tag">
          태그
        </label>
        <Input
          inputType="tag"
          placeholder="입력 후 Enter"
          register={register}
          setValue={setValue}
        />
        <label className={S.label} htmlFor="image">
          이미지
        </label>
        <Input inputType="image" register={register} setValue={setValue} />
      </div>
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText="취소"
          rightText="생성"
          onLeftClick={() => modalStaus.setIsOpen.call(null, false)}
          onRightClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}

export default ModalTodo
