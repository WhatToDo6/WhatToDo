import { InputProps } from '@/src/types/input'

import S from './Textarea.module.scss'

/**
 *
 * @description textarea 타입의 input 컴포넌트
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 */
const TextArea = ({ placeholder, error, register }: InputProps) => {
  return (
    <div className={S.container}>
      <textarea
        className={`${S.textarea} ${error && S.error}`}
        placeholder={placeholder}
        {...register('textarea', {
          required: '내용을 입력해주세요.',
        })}
      />
    </div>
  )
}

export default TextArea
