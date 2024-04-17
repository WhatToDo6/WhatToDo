import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'
import { InputProps } from '@/src/types/input'
import { validatePassword } from '@/src/utils/validation'

import S from './Password.module.scss'

const InputPassword = ({ placeholder, error, register }: InputProps) => {
  const [isPwVisible, setIsPwVisible] = useState(false)

  return (
    <div className={S.pwContainer}>
      <input
        className={`${S.container} ${error ? S.error : ''} `}
        required
        type={isPwVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          validate: (value) =>
            validatePassword(value) || '8자 이상 입력해 주세요.',
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

export default InputPassword
