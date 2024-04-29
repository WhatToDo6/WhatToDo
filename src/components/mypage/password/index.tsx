import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import BorderButton from '@/src/components/common/button/border'
import Input from '@/src/components/common/input'
import Modal from '@/src/components/common/modal'
import ModalAlert from '@/src/components/common/modal/modal-alert'
import { useToast } from '@/src/context/toast'
import { InputFormValues } from '@/src/types/input'

import S from './Password.module.scss'

const Password = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<InputFormValues>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      AXIOS.put(
        '/auth/password',
        {
          password: data.password,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .then(() => {
          addToast('비밀번호가 성공적으로 업데이트 되었습니다.', 'success')
        })
        .catch(() => {
          setIsModalOpen(true)
        })
    }
    reset({
      password: '',
      newPassword: '',
      newPasswordCheck: '',
    })
  }

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalAlert content="현재 비밀번호가 틀렸습니다." buttonText="확인" />
        </Modal>
      )}
      <div className={S.container}>
        <h1 className={S.title}>비밀번호 변경</h1>
        <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={S.item}>
            <label className={S.label}>비밀번호</label>
            <Input
              inputType="password-login"
              placeholder="현재 비밀번호 입력"
              error={errors.password}
              register={register}
              size="large"
            />
          </div>
          <div className={S.item}>
            <label className={S.label}>새 비밀번호</label>
            <Input
              inputType="newPassword"
              placeholder="새 비밀번호 입력"
              error={errors.newPassword}
              register={register}
              currentPassword={watch('password')}
              size="large"
            />
          </div>
          <div className={S.item}>
            <label className={S.label}>새 비밀번호 확인</label>
            <Input
              inputType="newPasswordCheck"
              placeholder="새 비밀번호 입력"
              error={errors.newPasswordCheck}
              register={register}
              newPassword={watch('newPassword')}
              size="large"
            />
          </div>
          <div className={S.buttonContainer}>
            <BorderButton
              size="small"
              color="purple"
              isDisabled={
                watch('password') !== '' &&
                watch('newPassword') !== '' &&
                watch('newPasswordCheck') !== ''
                  ? false
                  : true
              }
            >
              변경
            </BorderButton>
          </div>
        </form>
      </div>
    </>
  )
}

export default Password
