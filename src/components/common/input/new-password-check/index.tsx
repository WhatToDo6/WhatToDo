import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'
import { InputProps } from '@/src/types/input'

import S from '../new-password/NewPassword.module.scss'

interface NewPasswordCheckProps extends InputProps {
  newPassword: string
}

const InputNewPasswordCheck = ({
  placeholder,
  error,
  register,
  newPassword,
}: NewPasswordCheckProps) => {
  const [isNewPwVisible, setIsNewPwVisible] = useState(false)

  return (
    <div className={S.pwContainer}>
      <input
        className={`${S.container} ${error && S.error}`}
        required
        type={isNewPwVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...register('newPasswordCheck', {
          required: '새 비밀번호를 한번 더 입력해 주세요',
          validate: (value) =>
            value === newPassword || '비밀번호가 일치하지 않습니다.',
        })}
      />
      <div className={S.eyeContainer}>
        <Image
          className={S.eye}
          src={isNewPwVisible ? EYE_ON : EYE_OFF}
          alt="비밀번호 보기"
          objectFit="cover"
          fill
          onClick={() => setIsNewPwVisible(!isNewPwVisible)}
        />
      </div>
    </div>
  )
}

export default InputNewPasswordCheck
