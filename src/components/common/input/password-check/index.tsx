import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'
import { InputProps } from '@/src/types/input'

import S from '../password/Password.module.scss'

interface PasswordCheckProps extends InputProps {
  password: string
}

const InputPasswordCheck = ({
  placeholder,
  error,
  register,
  password,
}: PasswordCheckProps) => {
  const [isPwVisible, setIsPwVisible] = useState(false)

  return (
    <div className={S.pwContainer}>
      <input
        className={`${S.container} ${error && S.error}`}
        required
        type={isPwVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...register('passwordCheck', {
          required: '비밀번호를 한번 더 입력해 주세요',
          validate: (value) =>
            value === password || '비밀번호가 일치하지 않습니다.',
        })}
      />
      <div className={S.eyeContainer}>
        <Image
          className={S.eye}
          src={isPwVisible ? EYE_ON : EYE_OFF}
          alt="비밀번호 보기"
          objectFit="cover"
          fill
          onClick={() => setIsPwVisible(!isPwVisible)}
        />
      </div>
    </div>
  )
}

export default InputPasswordCheck
