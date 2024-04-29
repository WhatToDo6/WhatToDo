import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { fetchPostLogin } from '@/pages/api/auth'
import BasicButton from '@/src/components/common/button/basic'
import Input from '@/src/components/common/input'
import Modal from '@/src/components/common/modal'
import ModalAlert from '@/src/components/common/modal/modal-alert'
import { InputFormValues } from '@/src/types/input'

import S from '../Form.module.scss'

const LogInForm = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    if (data.email === '' || data.password === '') return

    fetchPostLogin(data.email, data.password)
      .then((accessToken) => {
        localStorage.setItem('accessToken', accessToken)
        router.push('/mydashboard')
      })
      .catch(() => {
        setIsModalOpen(true)
      })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      router.push('/mydashboard')
    }
  }, [])

  useEffect(() => {
    const email = watch('email')
    const password = watch('password')

    if (
      email === '' ||
      password === '' ||
      email === undefined ||
      password === undefined
    ) {
      setIsCheck(false)
      return
    }

    setIsCheck(true)
  }, [watch('email'), watch('password')])

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalAlert
            content="비밀번호가 일치하지 않습니다."
            buttonText="확인"
          />
        </Modal>
      )}
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
          inputType="password-login"
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password}
          register={register}
        />
        <BasicButton size="large" isDisabled={!isCheck}>
          <span className={S.buttonText}>로그인</span>
        </BasicButton>
      </form>
    </>
  )
}

export default LogInForm
