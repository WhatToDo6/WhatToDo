import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'

import S from '../Input.module.scss'

interface InputProps {
  inputType: 'email' | 'password'
  error: boolean
}

const SignInInput = ({ inputType, error }: InputProps) => {
  const [isPwVisible, setIsPwVisible] = useState(false)

  const INPUT_MAP = {
    email: (
      <input
        className={`${S.input} ${error && S.error}`}
        type="email"
        placeholder="이메일을 입력해주세요."
      />
    ),
    password: (
      <div className={S.pwContainer}>
        <input
          className={`${S.input} ${error && S.error}`}
          required
          type={isPwVisible ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요."
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
    ),
  }

  return INPUT_MAP[inputType]
}

export default SignInInput
