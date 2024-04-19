import { InputProps } from '@/src/types/input'

import S from './Text.module.scss'

interface InputTextProps extends InputProps {
  textType: 'nickname' | 'title' // 다른 input이 필요하면 추가
  size: string
  disabled: boolean
  required: boolean
}

/**
 *
 * @description text 타입의 input 컴포넌트
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 * @param textType - 'nickname' | 'title'
 * @param size - 'small' | 'medium' | 'large'
 * @param disabled - (optional) input 비활성화 여부
 * @returns
 */
const InputText = ({
  placeholder,
  error,
  register,
  textType,
  size,
  disabled,
  required,
}: InputTextProps) => {
  const VALIDATION_MAP = {
    nickname: {
      required: required ? '닉네임을 입력해주세요.' : undefined,
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
      className={`${S.container} ${error && S.error} ${S[size]}`}
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      {...register(textType, VALIDATION_MAP[textType])}
    />
  )
}

export default InputText
