import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { fetchPostUser } from '@/pages/api/users'
import CHECK_ICON from '@/public/icons/check.svg'
import BasicButton from '@/src/components/common/button/basic'
import Input from '@/src/components/common/input'
import Modal from '@/src/components/common/modal'
import ModalAlert from '@/src/components/common/modal/modal-alert'
import { InputFormValues } from '@/src/types/input'

import S from '../Form.module.scss'

const SignUpForm = () => {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    if (!isChecked || Object.keys(errors).length > 0) return

    fetchPostUser(data.email, data.nickname, data.password)
      .then(() => {
        setIsSuccessModalOpen(true)
      })
      .catch(() => {
        setIsErrorModalOpen(true)
      })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      router.push('/mydashboard')
    }
  }, [])

  return (
    <>
      {isSuccessModalOpen && (
        <Modal setIsOpen={setIsSuccessModalOpen}>
          <ModalAlert
            content="가입이 완료되었습니다!"
            buttonText="확인"
            moveTo="/login"
          />
        </Modal>
      )}
      {isErrorModalOpen && (
        <Modal setIsOpen={setIsErrorModalOpen}>
          <ModalAlert
            content="이미 사용 중인 이메일입니다."
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
        <label className={S.label}>닉네임</label>
        <Input
          inputType="nickname"
          placeholder="닉네임을 입력해 주세요"
          error={errors.nickname}
          register={register}
          size="large"
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
          <Image
            className={S.check}
            src={CHECK_ICON}
            alt="check"
            width={18}
            height={18}
          />
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
            watch('nickname') === '' ||
            watch('password') === '' ||
            watch('passwordCheck') === '' ||
            watch('password') !== watch('passwordCheck') ||
            isChecked === false
              ? true
              : false
          }
        >
          <span className={S.buttonText}>가입하기</span>
        </BasicButton>
      </form>
    </>
  )
}

export default SignUpForm
