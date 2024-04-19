import { InputProps } from '@/src/types/input'

import S from './Text.module.scss'

interface InputTextProps extends InputProps {
  textType: 'nickname' | 'newNickname' | 'newColumn' | 'title' // 다른 input이 필요하면 추가
  size: string
  currentNickname?: string
  currentColumn?: string
}

const InputText = ({
  placeholder,
  error,
  register,
  textType,
  currentNickname,
  currentColumn,
  size,
}: InputTextProps) => {
  const VALIDATION_MAP = {
    nickname: {
      required: '닉네임을 입력해주세요.',
      validate: (value: string) => {
        return value.length <= 10 || '10자 이하로 작성해주세요.'
      },
    },
    newNickname: {
      validate: {
        validate: (value: string) =>
          value.length <= 10 || '10자 이하로 작성해주세요.',
        notSameAsOld: (value: string) =>
          value !== currentNickname || '기존 닉네임과 동일합니다.',
      },
    },
    newColumn: {
      validate: (value: string) => {
        return value !== currentColumn || '중복된 칼럼 이름입니다.'
      },
    },
    title: {
      // TODO: 제목 유효성 검사 로직
    },
  }

  return (
    <input
      className={`${S.container} ${error && S.error} ${S[size]}`}
      type="text"
      placeholder={placeholder}
      {...register(textType, VALIDATION_MAP[textType])}
    />
  )
}

export default InputText
