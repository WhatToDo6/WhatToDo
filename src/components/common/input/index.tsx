import { postCardImage } from '@/pages/api/cardImage'
import { InputInterface } from '@/src/types/input'

import InputDate from './date'
import DropDownManager from './dropdown/manager'
import DropdownProgress from './dropdown/progress'
import InputEmail from './email'
import S from './Input.module.scss'
import InputNewPassword from './new-password'
import InputNewPasswordCheck from './new-password-check'
import InputPassword from './password'
import InputPasswordCheck from './password-check'
import InputProfileImage from './profile-image'
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
  control,
  setValue,
  columnId,
  setImageUrl,
}: InputInterface) => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      postCardImage(columnId, file)
        .then((newImageUrl) => {
          setImageUrl(newImageUrl)
        })
        .catch((error) => {
          console.error('Error during image upload:', error)
        })
    }
  }

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
        placeholder={placeholder || ''}
        error={error}
        register={register}
        textType="newColumn"
        currentColumn={currentColumn}
        size={size || ''}
      />
    ),
    columnName: (
      <InputText
        placeholder={placeholder || ''}
        error={error}
        register={register}
        textType="columnName"
        size={size || ''}
      />
    ),
    newDash: (
      <InputText
        placeholder={placeholder || ''}
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
    image: <InputProfileImage handleImageChange={handleImageChange} />,
    manager: (
      <DropDownManager
        placeholder={placeholder || ''}
        register={register}
        setValue={setValue}
        error={error}
      />
    ),
    progress: <DropdownProgress register={register} setValue={setValue} />,
  }

  return (
    <div className={S.container}>
      {INPUT_MAP[inputType]}
      <span className={S.errorText}>{error?.message}</span>
    </div>
  )
}

export default Input
