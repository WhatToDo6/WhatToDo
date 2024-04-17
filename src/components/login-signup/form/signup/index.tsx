import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import BasicButton from '@/src/components/common/button/basic'
import Input from '@/src/components/common/input'
import { InputFormValues } from '@/src/types/input'

import S from '../Form.module.scss'

const SignUpForm = () => {
  const [isChecked, setIsChecked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    if (!isChecked || Object.keys(errors).length > 0) return
  }

  return (
    <form className={S.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={S.label}>이메일</label>
      <Input
        inputType="email"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        register={register}
      />
      <label className={S.label}>닉네임</label>
      <Input
        inputType="nickname"
        placeholder="닉네임을 입력해 주세요"
        error={errors.nickname}
        register={register}
      />
      <label className={S.label}>비밀번호</label>
      <Input
        inputType="password"
        placeholder="8자 이상 입력해 주세요"
        error={errors.password}
        register={register}
      />
      <label className={S.label}>비밀번호 확인</label>
      <Input
        inputType="passwordCheck"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        error={errors.passwordCheck}
        register={register}
        password={watch('password')}
      />
      <div className={S.agreeBox}>
        <input
          className={S.agreeCheck}
          type="checkbox"
          id="agree"
          name="agree"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label className={S.agreeText} htmlFor="agree">
          약관에 동의합니다.
        </label>
      </div>
      <BasicButton
        size="large"
        isDisabled={
          watch('email') === '' ||
          watch('password') === '' ||
          watch('passwordCheck') === '' ||
          isChecked === false
            ? true
            : false
        }
      >
        <span className={S.buttonText}>가입하기</span>
      </BasicButton>
    </form>
  )
}

export default SignUpForm
