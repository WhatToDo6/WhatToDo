import { InputProps } from '@/src/types/input'

import S from './Text.module.scss'

interface InputTextProps extends InputProps {
  textType:
    | 'nickname'
    | 'newNickname'
    | 'newColumn'
    | 'columnName'
    | 'newDash'
    | 'title' // 다른 input이 필요하면 추가
  size: string
  currentNickname?: string
  currentColumn?: string
}

/**
 *
 * @description text 타입의 input 컴포넌트
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 * @param textType - 'nickname' | 'title'
 * @param size - 'small' | 'medium' | 'large' | 'full'
 * @param disabled - (optional) input 비활성화 여부
 * @returns
 */
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
    columnName: {
      // TODO : 유효성 검사 로직
    },
    newDash: {
      // TODO : 유효성 검사 로직
    },
    title: {
      required: '제목을 입력해주세요.',
    },
  }

  if (register) {
    return (
      <input
        className={`${S.container}  ${error && S.error} ${S[size]} ${S[textType]}`}
        type="text"
        placeholder={placeholder}
        {...register(textType, VALIDATION_MAP[textType])}
      />
    )
  }
}

export default InputText
