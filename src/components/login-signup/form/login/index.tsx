import { useForm, SubmitHandler } from 'react-hook-form'

import BasicButton from '@/src/components/common/button/basic'
import Input from '@/src/components/common/input'
import { InputFormValues } from '@/src/types/input'

import S from '../Form.module.scss'

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    console.log(data)
  }

  return (
    <form className={S.container}>
      <label className={S.label}>이메일</label>
      <Input
        inputType="email"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        register={register}
      />
      <label className={S.label}>비밀번호</label>
      <Input
        inputType="password"
        placeholder="비밀번호를 입력해 주세요"
        error={errors.password}
        register={register}
      />
      <BasicButton size="large" isDisabled={true}>
        <span className={S.buttonText}>로그인</span>
      </BasicButton>
    </form>
  )
}

export default LogInForm
