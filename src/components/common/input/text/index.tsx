import { InputProps } from '@/src/types/input'

import S from './Text.module.scss'

interface InputTextProps extends InputProps {
  textType: 'nickname' | 'title' // 다른 input이 필요하면 추가
}

const InputText = ({
  placeholder,
  error,
  register,
  textType,
}: InputTextProps) => {
  const VALIDATION_MAP = {
    nickname: {
      required: '닉네임을 입력해주세요.',
      validate: (value: string) => {
        return value.length < 10 || '10자 이하로 작성해주세요.'
      },
    },
    title: {
      required: '제목을 입력해주세요.',
      // TODO: 제목 유효성 검사 로직
    },
  }

  return (
    <input
      className={`${S.container} ${error && S.error}`}
      type="text"
      placeholder={placeholder}
      {...register(textType, VALIDATION_MAP[textType])}
    />
  )
}

export default InputText
