import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './ModalEdittodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'
import InputProfileImage from '../../input/profile-image'

// TODO: API 연결 필요
const ModalEdittodo = () => {
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
        <h1 className={S.title}>할 일 수정</h1>
        <div className={S.row}>
          <div className={S.box}>
            <label className={S.label} htmlFor="status">
              상태
            </label>
            <Input
              inputType="progress"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className={S.box}>
            <label className={S.label} htmlFor="keeper">
              담당자
            </label>
            <Input
              inputType="manager"
              placeholder="이름을 입력해주세요"
              register={register}
              setValue={setValue}
            />
          </div>
        </div>
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
        <div className={S.imageContainer}>
          <InputProfileImage
            handleImageChange={() => console.log('로직 연결 필요')}
          />
        </div>
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

export default ModalEdittodo
