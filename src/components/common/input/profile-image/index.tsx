import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

import ADD_IMG from '@/public/icons/add-img.svg'
import EDIT_IMG from '@/public/icons/edit-img.svg'
import { InputFormValues } from '@/src/types/input'

import S from './ProfileImage.module.scss'

interface InputProfileImageProps {
  profileImageUrl?: string
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 *
 * @param profileImageUrl - (optional) 유저의 profileImageUrl
 * @param handleImageChange - 이미지 POST 요청을 보내는 함수
 * @returns
 */
const InputProfileImage = ({
  profileImageUrl,
  handleImageChange,
}: InputProfileImageProps) => {
  const { register } = useForm<InputFormValues>()

  return profileImageUrl ? (
    <div
      className={S.editContainer}
      style={{ backgroundImage: `url(${profileImageUrl})` }}
    >
      <label htmlFor="profileEdit" className={S.icon}>
        <Image src={EDIT_IMG} alt="수정" fill />
      </label>
      <input
        id="profileEdit"
        type="file"
        {...register('profileImageUrl')}
        onChange={handleImageChange}
        className={S.input}
      />
    </div>
  ) : (
    <div className={S.addContainer}>
      <label htmlFor="profileAdd" className={S.icon}>
        <Image src={ADD_IMG} alt="추가" fill />
      </label>
      <input
        id="profileAdd"
        type="file"
        {...register('profileImageUrl')}
        onChange={handleImageChange}
        className={S.input}
      />
    </div>
  )
}

export default InputProfileImage
