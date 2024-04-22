import { InputInterface } from '@/src/types/input'

import InputDate from './date'
import InputEmail from './email'
import InputImageUpload from './image-upload'
import S from './Input.module.scss'
import InputNewPassword from './new-password'
import InputNewPasswordCheck from './new-password-check'
import InputPassword from './password'
import InputPasswordCheck from './password-check'
import InputTag from './tag'
import InputText from './text'
import TextArea from './textarea'

/**
 *
 * @param inputType - input 타입 (email | password | passwordCheck | newPassword | newPasswordCheck | nickname | title | date | tag | textarea)
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 * @param password - (optional) passwordCheck에서 password를 비교하기 위해 필요
 * @param currentPassword - (optional) password와 newPassword를 비교하기 위해 필요
 * @param newPassword - (optional) newPasswordCheck에서 newPassword를 비교하기 위해 필요
 * @param size - (optional) input 사이즈 (small | medium | large)
 * @param disabled - (optional) input 비활성화 여부
 * @param required - (optional) required가 필요하지 않은 경우를 위해 필요
 * @param control - (optional) react-hook-form의 control 객체 (외부 라이브러리 연동 시 필요)
 * @param setValue - (optional) react-hook-form의 setValue 함수 (직접 값 제어 시 필요)
 */
const Input = ({
  inputType,
  placeholder,
  error,
  register,
  password,
  newPassword,
  currentPassword,
  currentNickname,
  currentColumn,
  size,
  disabled,
  required = true,
  control,
  setValue,
}: InputInterface) => {
  const INPUT_MAP = {
    email: (
      <InputEmail
        placeholder={placeholder || ''}
        error={error}
        register={register}
        size={size || ''}
      />
    ),
    password: (
      <InputPassword
        placeholder={placeholder || ''}
        error={error}
        register={register}
        size={size || ''}
      />
    ),
    passwordCheck: (
      <InputPasswordCheck
        placeholder={placeholder || ''}
        error={error}
        register={register}
        password={password || ''}
      />
    ),
    newPassword: (
      <InputNewPassword
        placeholder={placeholder || ''}
        error={error}
        register={register}
        currentPassword={currentPassword || ''}
        size={size || ''}
      />
    ),
    newPasswordCheck: (
      <InputNewPasswordCheck
        placeholder={placeholder || ''}
        error={error}
        register={register}
        newPassword={newPassword || ''}
        size={size || ''}
      />
    ),
    nickname: (
      <InputText
        placeholder={placeholder || ''}
        error={error}
        register={register}
        textType="nickname"
        size={size || ''}
      />
    ),
    newNickname: (
      <InputText
        placeholder={placeholder || ''}
        error={error}
        register={register}
        textType="newNickname"
        currentNickname={currentNickname}
        size={size || ''}
      />
    ),
    newColumn: (
      <InputText
        placeholder={placeholder}
        error={error}
        register={register}
        textType="newColumn"
        currentColumn={currentColumn}
        size={size || ''}
      />
    ),
    columnName: (
      <InputText
        placeholder={placeholder}
        error={error}
        register={register}
        textType="columnName"
        size={size || ''}
      />
    ),
    newDash: (
      <InputText
        placeholder={placeholder}
        error={error}
        register={register}
        textType="newDash"
        size={size || ''}
      />
    ),
    title: (
      <InputText
        placeholder={placeholder || ''}
        error={error}
        register={register}
        textType="title"
        size={size || ''}
      />
    ),
    date: (
      <InputDate
        placeholder={placeholder || ''}
        error={error}
        register={register}
        control={control}
      />
    ),
    tag: (
      <InputTag
        placeholder={placeholder || ''}
        error={error}
        register={register}
        setValue={setValue}
      />
    ),
    textarea: (
      <TextArea
        placeholder={placeholder || ''}
        error={error}
        register={register}
      />
    ),
    image: <InputImageUpload handleImageChange={() => console.log('임시')} />, //TODO: handleImageChange 함수 연결
  }

  return (
    <div className={S.container}>
      {INPUT_MAP[inputType]}
      <span className={S.errorText}>{error?.message}</span>
    </div>
  )
}

export default Input
