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
 * @param size - 'small' | 'medium' | 'large'
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
      // TODO: 제목 유효성 검사 로직
    },
  }

  return (
    <div className={`${S.container}  ${S[textType]}`}>
      <input
        className={`${error && S.error} ${S[size]}`}
        type="text"
        placeholder={placeholder}
        {...register(textType, VALIDATION_MAP[textType])}
      />
    </div>
  )
}

export default InputText
