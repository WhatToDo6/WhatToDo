import Image from 'next/image'
import { useState } from 'react'

import EYE_OFF from '@/public/icons/eye-off.svg'
import EYE_ON from '@/public/icons/eye-on.svg'

import S from '../Input.module.scss'

interface InputProps {
  inputType: 'email' | 'nickname' | 'password' | 'passwordCheck'
  error: boolean
}

const SignUpInput = ({ inputType, error }: InputProps) => {
  const [isPwVisible, setIsPwVisible] = useState(false)
  const [isPwCheckVisible, setIsPwCheckVisible] = useState(false)

  const INPUT_MAP = {
    email: (
      <>
        <input
          className={`${S.input} ${error && S.error}`}
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
        />
        {/* <span className={S.errorText}>{errors?.email?.message}</span> */}
      </>
    ),
    nickname: (
      <>
        <input
          className={`${S.input} ${error && S.error}`}
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
        />
        {/* <span className={S.errorText}>{errors?.email?.message}</span> */}
      </>
    ),
    password: (
      <>
        <div className={S.pwContainer}>
          <input
            className={`${S.input} ${error && S.error}`}
            required
            type={isPwVisible ? 'text' : 'password'}
            placeholder="8자 이상 입력해 주세요"
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
        {/* <span className={S.errorText}>{errors?.password?.message}</span> */}
      </>
    ),
    passwordCheck: (
      <>
        <div className={S.pwContainer}>
          <input
            className={`${S.input} ${error && S.error}`}
            required
            type={isPwVisible ? 'text' : 'password'}
            placeholder="비밀번호를 한번 더 입력해 주세요"
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
        {/* <span className={S.errorText}>{errors?.passwordCheck?.message}</span> */}
      </>
    ),
  }

  return INPUT_MAP[inputType]
}

export default SignUpInput
