import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'
import { InputProps } from '@/src/types/input'
import { validatePassword } from '@/src/utils/validation'

import S from './NewPassword.module.scss'

interface InputNewPasswordProps extends InputProps {
  currentPassword: string
}

const InputNewPassword = ({
  placeholder,
  error,
  register,
  currentPassword,
}: InputNewPasswordProps) => {
  const [isNewPwVisible, setIsNewPwVisible] = useState(false)

  return (
    <div className={S.pwContainer}>
      <input
        className={`${S.container} ${error ? S.error : ''}`}
        type={isNewPwVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...register('newPassword', {
          required: '새 비밀번호를 입력해주세요.',
          validate: {
            validPassword: (value) =>
              validatePassword(value) || '새 비밀번호는 8자 이상 입력해주세요.',
            notSameAsOld: (value) =>
              value !== currentPassword || '기존 비밀번호와 동일합니다.',
          },
        })}
      />
      <div
        className={S.eyeContainer}
        onClick={() => setIsNewPwVisible(!isNewPwVisible)}
      >
        <Image
          className={S.eye}
          src={isNewPwVisible ? EYE_ON : EYE_OFF}
          alt="비밀번호 보기"
          objectFit="cover"
          fill
        />
      </div>
    </div>
  )
}

export default InputNewPassword
