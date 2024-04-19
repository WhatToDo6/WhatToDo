import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalTodo.module.scss'
import OptionButton from '../../button/option'
import Input from '../../input'

const ModalTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    // TODO: 할 일 생성 로직
    console.log(data)
  }

  return (
    <div className={S.container}>
      <h1 className={S.title}>할 일 생성</h1>
      <label className={S.label} htmlFor="keeper">
        담당자
      </label>
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
      <label className={S.label} htmlFor="tag">
        태그
      </label>
      <label className={S.label} htmlFor="image">
        이미지
      </label>
      <OptionButton
        size="large"
        leftColor="white"
        rightColor="purple"
        leftText="취소"
        rightText="생성"
        onRightClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}

export default ModalTodo
