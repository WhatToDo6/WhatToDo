import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import BasicButton from '@/src/components/common/button/basic'
import Input from '@/src/components/common/input'
import { InputFormValues } from '@/src/types/input'

import S from '../Form.module.scss'

const LogInForm = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    if (data.email === '' || data.password === '') return

    AXIOS.post('/auth/login', {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken)
        router.push('/mydashboard')
      })
      .catch((err) => {
        setLoginError(err.response.data.message)
      })
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
      <label className={S.label}>비밀번호</label>
      <Input
        inputType="password"
        placeholder="비밀번호를 입력해 주세요"
        error={errors.password}
        register={register}
      />
      <span className={S.errorText}>* {loginError}</span>
      <BasicButton
        size="large"
        isDisabled={
          watch('email') === '' || watch('password') === '' ? true : false
        }
      >
        <span className={S.buttonText}>로그인</span>
      </BasicButton>
    </form>
  )
}

export default LogInForm
